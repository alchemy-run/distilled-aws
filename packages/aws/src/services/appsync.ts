import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://appsync.amazonaws.com");
const svc = T.AwsApiService({
  sdkId: "AppSync",
  serviceShapeName: "AWSDeepdishControlPlaneService",
});
const auth = T.AwsAuthSigv4({ name: "appsync" });
const ver = T.ServiceVersion("2017-07-25");
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
              `https://appsync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://appsync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appsync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://appsync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ApiKeyLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ApiKeyLimitExceededException>()(
    "ApiKeyLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ApiKeyValidityOutOfBoundsException
  extends /*@__PURE__*/ S.TaggedError<ApiKeyValidityOutOfBoundsException>()(
    "ApiKeyValidityOutOfBoundsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ApiLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ApiLimitExceededException>()(
    "ApiLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => BadRequestReason).annotate({
          identifier: "BadRequestReason",
        }),
      ),
      detail: S.optional(
        S.suspend(() => BadRequestDetail).annotate({
          identifier: "BadRequestDetail",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class GraphQLSchemaException
  extends /*@__PURE__*/ S.TaggedError<GraphQLSchemaException>()(
    "GraphQLSchemaException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type DomainName = string;
export interface AssociateApiRequest {
  domainName: string;
  apiId: string;
}
export const AssociateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    apiId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/domainnames/{domainName}/apiassociation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateApiRequest",
}) as any as S.Schema<AssociateApiRequest>;
export type AssociationStatus =
  | "PROCESSING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const AssociationStatus = /*@__PURE__*/ S.String;

export interface ApiAssociation {
  domainName?: string;
  apiId?: string;
  associationStatus?: AssociationStatus;
  deploymentDetail?: string;
}
export const ApiAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    apiId: S.optional(S.String),
    associationStatus: S.optional(AssociationStatus),
    deploymentDetail: S.optional(S.String),
  }),
).annotate({ identifier: "ApiAssociation" }) as any as S.Schema<ApiAssociation>;
export interface AssociateApiResponse {
  apiAssociation?: ApiAssociation;
}
export const AssociateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiAssociation: S.optional(ApiAssociation) }).pipe(ns),
).annotate({
  identifier: "AssociateApiResponse",
}) as any as S.Schema<AssociateApiResponse>;
export type MergeType = "MANUAL_MERGE" | "AUTO_MERGE" | (string & {});
export const MergeType = /*@__PURE__*/ S.String;

export interface SourceApiAssociationConfig {
  mergeType?: MergeType;
}
export const SourceApiAssociationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mergeType: S.optional(MergeType) }),
).annotate({
  identifier: "SourceApiAssociationConfig",
}) as any as S.Schema<SourceApiAssociationConfig>;
export interface AssociateMergedGraphqlApiRequest {
  sourceApiIdentifier: string;
  mergedApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export const AssociateMergedGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceApiIdentifier: S.String.pipe(T.HttpLabel("sourceApiIdentifier")),
    mergedApiIdentifier: S.String,
    description: S.optional(S.String),
    sourceApiAssociationConfig: S.optional(SourceApiAssociationConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/sourceApis/{sourceApiIdentifier}/mergedApiAssociations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateMergedGraphqlApiRequest",
}) as any as S.Schema<AssociateMergedGraphqlApiRequest>;
export type SourceApiAssociationStatus =
  | "MERGE_SCHEDULED"
  | "MERGE_FAILED"
  | "MERGE_SUCCESS"
  | "MERGE_IN_PROGRESS"
  | "AUTO_MERGE_SCHEDULE_FAILED"
  | "DELETION_SCHEDULED"
  | "DELETION_IN_PROGRESS"
  | "DELETION_FAILED"
  | (string & {});
export const SourceApiAssociationStatus = /*@__PURE__*/ S.String;

export interface SourceApiAssociation {
  associationId?: string;
  associationArn?: string;
  sourceApiId?: string;
  sourceApiArn?: string;
  mergedApiArn?: string;
  mergedApiId?: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
  sourceApiAssociationStatusDetail?: string;
  lastSuccessfulMergeDate?: Date;
}
export const SourceApiAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationId: S.optional(S.String),
    associationArn: S.optional(S.String),
    sourceApiId: S.optional(S.String),
    sourceApiArn: S.optional(S.String),
    mergedApiArn: S.optional(S.String),
    mergedApiId: S.optional(S.String),
    description: S.optional(S.String),
    sourceApiAssociationConfig: S.optional(SourceApiAssociationConfig),
    sourceApiAssociationStatus: S.optional(SourceApiAssociationStatus),
    sourceApiAssociationStatusDetail: S.optional(S.String),
    lastSuccessfulMergeDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SourceApiAssociation",
}) as any as S.Schema<SourceApiAssociation>;
export interface AssociateMergedGraphqlApiResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export const AssociateMergedGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceApiAssociation: S.optional(SourceApiAssociation) }).pipe(ns),
).annotate({
  identifier: "AssociateMergedGraphqlApiResponse",
}) as any as S.Schema<AssociateMergedGraphqlApiResponse>;
export interface AssociateSourceGraphqlApiRequest {
  mergedApiIdentifier: string;
  sourceApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export const AssociateSourceGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
    sourceApiIdentifier: S.String,
    description: S.optional(S.String),
    sourceApiAssociationConfig: S.optional(SourceApiAssociationConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateSourceGraphqlApiRequest",
}) as any as S.Schema<AssociateSourceGraphqlApiRequest>;
export interface AssociateSourceGraphqlApiResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export const AssociateSourceGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceApiAssociation: S.optional(SourceApiAssociation) }).pipe(ns),
).annotate({
  identifier: "AssociateSourceGraphqlApiResponse",
}) as any as S.Schema<AssociateSourceGraphqlApiResponse>;
export type ApiName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AuthenticationType =
  | "API_KEY"
  | "AWS_IAM"
  | "AMAZON_COGNITO_USER_POOLS"
  | "OPENID_CONNECT"
  | "AWS_LAMBDA"
  | (string & {});
export const AuthenticationType = /*@__PURE__*/ S.String;

export interface CognitoConfig {
  userPoolId: string;
  awsRegion: string;
  appIdClientRegex?: string;
}
export const CognitoConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolId: S.String,
    awsRegion: S.String,
    appIdClientRegex: S.optional(S.String),
  }),
).annotate({ identifier: "CognitoConfig" }) as any as S.Schema<CognitoConfig>;
export interface OpenIDConnectConfig {
  issuer: string;
  clientId?: string;
  iatTTL?: number;
  authTTL?: number;
}
export const OpenIDConnectConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    clientId: S.optional(S.String),
    iatTTL: S.optional(S.Number),
    authTTL: S.optional(S.Number),
  }),
).annotate({
  identifier: "OpenIDConnectConfig",
}) as any as S.Schema<OpenIDConnectConfig>;
export type TTL = number;
export interface LambdaAuthorizerConfig {
  authorizerResultTtlInSeconds?: number;
  authorizerUri: string;
  identityValidationExpression?: string;
}
export const LambdaAuthorizerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerResultTtlInSeconds: S.optional(S.Number),
    authorizerUri: S.String,
    identityValidationExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaAuthorizerConfig",
}) as any as S.Schema<LambdaAuthorizerConfig>;
export interface AuthProvider {
  authType: AuthenticationType;
  cognitoConfig?: CognitoConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
}
export const AuthProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authType: AuthenticationType,
    cognitoConfig: S.optional(CognitoConfig),
    openIDConnectConfig: S.optional(OpenIDConnectConfig),
    lambdaAuthorizerConfig: S.optional(LambdaAuthorizerConfig),
  }),
).annotate({ identifier: "AuthProvider" }) as any as S.Schema<AuthProvider>;
export type AuthProviders = AuthProvider[];
export const AuthProviders = /*@__PURE__*/ S.Array(AuthProvider);
export interface AuthMode {
  authType: AuthenticationType;
}
export const AuthMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authType: AuthenticationType }),
).annotate({ identifier: "AuthMode" }) as any as S.Schema<AuthMode>;
export type AuthModes = AuthMode[];
export const AuthModes = /*@__PURE__*/ S.Array(AuthMode);
export type EventLogLevel =
  | "NONE"
  | "ERROR"
  | "ALL"
  | "INFO"
  | "DEBUG"
  | (string & {});
export const EventLogLevel = /*@__PURE__*/ S.String;

export interface EventLogConfig {
  logLevel: EventLogLevel;
  cloudWatchLogsRoleArn: string;
}
export const EventLogConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logLevel: EventLogLevel, cloudWatchLogsRoleArn: S.String }),
).annotate({ identifier: "EventLogConfig" }) as any as S.Schema<EventLogConfig>;
export interface EventConfig {
  authProviders: AuthProvider[];
  connectionAuthModes: AuthMode[];
  defaultPublishAuthModes: AuthMode[];
  defaultSubscribeAuthModes: AuthMode[];
  logConfig?: EventLogConfig;
}
export const EventConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authProviders: AuthProviders,
    connectionAuthModes: AuthModes,
    defaultPublishAuthModes: AuthModes,
    defaultSubscribeAuthModes: AuthModes,
    logConfig: S.optional(EventLogConfig),
  }),
).annotate({ identifier: "EventConfig" }) as any as S.Schema<EventConfig>;
export interface CreateApiRequest {
  name: string;
  ownerContact?: string;
  tags?: { [key: string]: string | undefined };
  eventConfig: EventConfig;
}
export const CreateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    ownerContact: S.optional(S.String),
    tags: S.optional(TagMap),
    eventConfig: EventConfig,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v2/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApiRequest",
}) as any as S.Schema<CreateApiRequest>;
export type OwnerContact = string;
export type MapOfStringToString = { [key: string]: string | undefined };
export const MapOfStringToString = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Api {
  apiId?: string;
  name?: string;
  ownerContact?: string;
  tags?: { [key: string]: string | undefined };
  dns?: { [key: string]: string | undefined };
  apiArn?: string;
  created?: Date;
  xrayEnabled?: boolean;
  wafWebAclArn?: string;
  eventConfig?: EventConfig;
}
export const Api = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.optional(S.String),
    name: S.optional(S.String),
    ownerContact: S.optional(S.String),
    tags: S.optional(TagMap),
    dns: S.optional(MapOfStringToString),
    apiArn: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    xrayEnabled: S.optional(S.Boolean),
    wafWebAclArn: S.optional(S.String),
    eventConfig: S.optional(EventConfig),
  }),
).annotate({ identifier: "Api" }) as any as S.Schema<Api>;
export interface CreateApiResponse {
  api?: Api;
}
export const CreateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ api: S.optional(Api) }).pipe(ns),
).annotate({
  identifier: "CreateApiResponse",
}) as any as S.Schema<CreateApiResponse>;
export type ApiCachingBehavior =
  | "FULL_REQUEST_CACHING"
  | "PER_RESOLVER_CACHING"
  | "OPERATION_LEVEL_CACHING"
  | (string & {});
export const ApiCachingBehavior = /*@__PURE__*/ S.String;

export type ApiCacheType =
  | "T2_SMALL"
  | "T2_MEDIUM"
  | "R4_LARGE"
  | "R4_XLARGE"
  | "R4_2XLARGE"
  | "R4_4XLARGE"
  | "R4_8XLARGE"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "XLARGE"
  | "LARGE_2X"
  | "LARGE_4X"
  | "LARGE_8X"
  | "LARGE_12X"
  | (string & {});
export const ApiCacheType = /*@__PURE__*/ S.String;

export type CacheHealthMetricsConfig = "ENABLED" | "DISABLED" | (string & {});
export const CacheHealthMetricsConfig = /*@__PURE__*/ S.String;

export interface CreateApiCacheRequest {
  apiId: string;
  ttl: number;
  transitEncryptionEnabled?: boolean;
  atRestEncryptionEnabled?: boolean;
  apiCachingBehavior: ApiCachingBehavior;
  type: ApiCacheType;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export const CreateApiCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    ttl: S.Number,
    transitEncryptionEnabled: S.optional(S.Boolean),
    atRestEncryptionEnabled: S.optional(S.Boolean),
    apiCachingBehavior: ApiCachingBehavior,
    type: ApiCacheType,
    healthMetricsConfig: S.optional(CacheHealthMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/ApiCaches" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApiCacheRequest",
}) as any as S.Schema<CreateApiCacheRequest>;
export type ApiCacheStatus =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "MODIFYING"
  | "FAILED"
  | (string & {});
export const ApiCacheStatus = /*@__PURE__*/ S.String;

export interface ApiCache {
  ttl?: number;
  apiCachingBehavior?: ApiCachingBehavior;
  transitEncryptionEnabled?: boolean;
  atRestEncryptionEnabled?: boolean;
  type?: ApiCacheType;
  status?: ApiCacheStatus;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export const ApiCache = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ttl: S.optional(S.Number),
    apiCachingBehavior: S.optional(ApiCachingBehavior),
    transitEncryptionEnabled: S.optional(S.Boolean),
    atRestEncryptionEnabled: S.optional(S.Boolean),
    type: S.optional(ApiCacheType),
    status: S.optional(ApiCacheStatus),
    healthMetricsConfig: S.optional(CacheHealthMetricsConfig),
  }),
).annotate({ identifier: "ApiCache" }) as any as S.Schema<ApiCache>;
export interface CreateApiCacheResponse {
  apiCache?: ApiCache;
}
export const CreateApiCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCache: S.optional(ApiCache) }).pipe(ns),
).annotate({
  identifier: "CreateApiCacheResponse",
}) as any as S.Schema<CreateApiCacheResponse>;
export interface CreateApiKeyRequest {
  apiId: string;
  description?: string;
  expires?: number;
}
export const CreateApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    description: S.optional(S.String),
    expires: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/apikeys" }),
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
export interface ApiKey {
  id?: string;
  description?: string;
  expires?: number;
  deletes?: number;
}
export const ApiKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    description: S.optional(S.String),
    expires: S.optional(S.Number),
    deletes: S.optional(S.Number),
  }),
).annotate({ identifier: "ApiKey" }) as any as S.Schema<ApiKey>;
export interface CreateApiKeyResponse {
  apiKey?: ApiKey;
}
export const CreateApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiKey: S.optional(ApiKey) }).pipe(ns),
).annotate({
  identifier: "CreateApiKeyResponse",
}) as any as S.Schema<CreateApiKeyResponse>;
export type Namespace = string;
export type Code = string;
export type HandlerBehavior = "CODE" | "DIRECT" | (string & {});
export const HandlerBehavior = /*@__PURE__*/ S.String;

export type InvokeType = "REQUEST_RESPONSE" | "EVENT" | (string & {});
export const InvokeType = /*@__PURE__*/ S.String;

export interface LambdaConfig {
  invokeType?: InvokeType;
}
export const LambdaConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invokeType: S.optional(InvokeType) }),
).annotate({ identifier: "LambdaConfig" }) as any as S.Schema<LambdaConfig>;
export interface Integration {
  dataSourceName: string;
  lambdaConfig?: LambdaConfig;
}
export const Integration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceName: S.String,
    lambdaConfig: S.optional(LambdaConfig),
  }),
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export interface HandlerConfig {
  behavior: HandlerBehavior;
  integration: Integration;
}
export const HandlerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ behavior: HandlerBehavior, integration: Integration }),
).annotate({ identifier: "HandlerConfig" }) as any as S.Schema<HandlerConfig>;
export interface HandlerConfigs {
  onPublish?: HandlerConfig;
  onSubscribe?: HandlerConfig;
}
export const HandlerConfigs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    onPublish: S.optional(HandlerConfig),
    onSubscribe: S.optional(HandlerConfig),
  }),
).annotate({ identifier: "HandlerConfigs" }) as any as S.Schema<HandlerConfigs>;
export interface CreateChannelNamespaceRequest {
  apiId: string;
  name: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  tags?: { [key: string]: string | undefined };
  handlerConfigs?: HandlerConfigs;
}
export const CreateChannelNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    subscribeAuthModes: S.optional(AuthModes),
    publishAuthModes: S.optional(AuthModes),
    codeHandlers: S.optional(S.String),
    tags: S.optional(TagMap),
    handlerConfigs: S.optional(HandlerConfigs),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v2/apis/{apiId}/channelNamespaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChannelNamespaceRequest",
}) as any as S.Schema<CreateChannelNamespaceRequest>;
export interface ChannelNamespace {
  apiId?: string;
  name?: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  tags?: { [key: string]: string | undefined };
  channelNamespaceArn?: string;
  created?: Date;
  lastModified?: Date;
  handlerConfigs?: HandlerConfigs;
}
export const ChannelNamespace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.optional(S.String),
    name: S.optional(S.String),
    subscribeAuthModes: S.optional(AuthModes),
    publishAuthModes: S.optional(AuthModes),
    codeHandlers: S.optional(S.String),
    tags: S.optional(TagMap),
    channelNamespaceArn: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    handlerConfigs: S.optional(HandlerConfigs),
  }),
).annotate({
  identifier: "ChannelNamespace",
}) as any as S.Schema<ChannelNamespace>;
export interface CreateChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export const CreateChannelNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ channelNamespace: S.optional(ChannelNamespace) }).pipe(ns),
).annotate({
  identifier: "CreateChannelNamespaceResponse",
}) as any as S.Schema<CreateChannelNamespaceResponse>;
export type ResourceName = string;
export type DataSourceType =
  | "AWS_LAMBDA"
  | "AMAZON_DYNAMODB"
  | "AMAZON_ELASTICSEARCH"
  | "NONE"
  | "HTTP"
  | "RELATIONAL_DATABASE"
  | "AMAZON_OPENSEARCH_SERVICE"
  | "AMAZON_EVENTBRIDGE"
  | "AMAZON_BEDROCK_RUNTIME"
  | (string & {});
export const DataSourceType = /*@__PURE__*/ S.String;

export interface DeltaSyncConfig {
  baseTableTTL?: number;
  deltaSyncTableName?: string;
  deltaSyncTableTTL?: number;
}
export const DeltaSyncConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseTableTTL: S.optional(S.Number),
    deltaSyncTableName: S.optional(S.String),
    deltaSyncTableTTL: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeltaSyncConfig",
}) as any as S.Schema<DeltaSyncConfig>;
export interface DynamodbDataSourceConfig {
  tableName: string;
  awsRegion: string;
  useCallerCredentials?: boolean;
  deltaSyncConfig?: DeltaSyncConfig;
  versioned?: boolean;
}
export const DynamodbDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tableName: S.String,
    awsRegion: S.String,
    useCallerCredentials: S.optional(S.Boolean),
    deltaSyncConfig: S.optional(DeltaSyncConfig),
    versioned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DynamodbDataSourceConfig",
}) as any as S.Schema<DynamodbDataSourceConfig>;
export interface LambdaDataSourceConfig {
  lambdaFunctionArn: string;
}
export const LambdaDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaFunctionArn: S.String }),
).annotate({
  identifier: "LambdaDataSourceConfig",
}) as any as S.Schema<LambdaDataSourceConfig>;
export interface ElasticsearchDataSourceConfig {
  endpoint: string;
  awsRegion: string;
}
export const ElasticsearchDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.String, awsRegion: S.String }),
).annotate({
  identifier: "ElasticsearchDataSourceConfig",
}) as any as S.Schema<ElasticsearchDataSourceConfig>;
export interface OpenSearchServiceDataSourceConfig {
  endpoint: string;
  awsRegion: string;
}
export const OpenSearchServiceDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.String, awsRegion: S.String }),
).annotate({
  identifier: "OpenSearchServiceDataSourceConfig",
}) as any as S.Schema<OpenSearchServiceDataSourceConfig>;
export type AuthorizationType = "AWS_IAM" | (string & {});
export const AuthorizationType = /*@__PURE__*/ S.String;

export interface AwsIamConfig {
  signingRegion?: string;
  signingServiceName?: string;
}
export const AwsIamConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signingRegion: S.optional(S.String),
    signingServiceName: S.optional(S.String),
  }),
).annotate({ identifier: "AwsIamConfig" }) as any as S.Schema<AwsIamConfig>;
export interface AuthorizationConfig {
  authorizationType: AuthorizationType;
  awsIamConfig?: AwsIamConfig;
}
export const AuthorizationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationType: AuthorizationType,
    awsIamConfig: S.optional(AwsIamConfig),
  }),
).annotate({
  identifier: "AuthorizationConfig",
}) as any as S.Schema<AuthorizationConfig>;
export interface HttpDataSourceConfig {
  endpoint?: string;
  authorizationConfig?: AuthorizationConfig;
}
export const HttpDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.optional(S.String),
    authorizationConfig: S.optional(AuthorizationConfig),
  }),
).annotate({
  identifier: "HttpDataSourceConfig",
}) as any as S.Schema<HttpDataSourceConfig>;
export type RelationalDatabaseSourceType = "RDS_HTTP_ENDPOINT" | (string & {});
export const RelationalDatabaseSourceType = /*@__PURE__*/ S.String;

export interface RdsHttpEndpointConfig {
  awsRegion?: string;
  dbClusterIdentifier?: string;
  databaseName?: string;
  schema?: string;
  awsSecretStoreArn?: string;
}
export const RdsHttpEndpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsRegion: S.optional(S.String),
    dbClusterIdentifier: S.optional(S.String),
    databaseName: S.optional(S.String),
    schema: S.optional(S.String),
    awsSecretStoreArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RdsHttpEndpointConfig",
}) as any as S.Schema<RdsHttpEndpointConfig>;
export interface RelationalDatabaseDataSourceConfig {
  relationalDatabaseSourceType?: RelationalDatabaseSourceType;
  rdsHttpEndpointConfig?: RdsHttpEndpointConfig;
}
export const RelationalDatabaseDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationalDatabaseSourceType: S.optional(RelationalDatabaseSourceType),
    rdsHttpEndpointConfig: S.optional(RdsHttpEndpointConfig),
  }),
).annotate({
  identifier: "RelationalDatabaseDataSourceConfig",
}) as any as S.Schema<RelationalDatabaseDataSourceConfig>;
export interface EventBridgeDataSourceConfig {
  eventBusArn: string;
}
export const EventBridgeDataSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventBusArn: S.String }),
).annotate({
  identifier: "EventBridgeDataSourceConfig",
}) as any as S.Schema<EventBridgeDataSourceConfig>;
export type DataSourceLevelMetricsConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DataSourceLevelMetricsConfig = /*@__PURE__*/ S.String;

export interface CreateDataSourceRequest {
  apiId: string;
  name: string;
  description?: string;
  type: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export const CreateDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    description: S.optional(S.String),
    type: DataSourceType,
    serviceRoleArn: S.optional(S.String),
    dynamodbConfig: S.optional(DynamodbDataSourceConfig),
    lambdaConfig: S.optional(LambdaDataSourceConfig),
    elasticsearchConfig: S.optional(ElasticsearchDataSourceConfig),
    openSearchServiceConfig: S.optional(OpenSearchServiceDataSourceConfig),
    httpConfig: S.optional(HttpDataSourceConfig),
    relationalDatabaseConfig: S.optional(RelationalDatabaseDataSourceConfig),
    eventBridgeConfig: S.optional(EventBridgeDataSourceConfig),
    metricsConfig: S.optional(DataSourceLevelMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/datasources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSourceRequest",
}) as any as S.Schema<CreateDataSourceRequest>;
export interface DataSource {
  dataSourceArn?: string;
  name?: string;
  description?: string;
  type?: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    type: S.optional(DataSourceType),
    serviceRoleArn: S.optional(S.String),
    dynamodbConfig: S.optional(DynamodbDataSourceConfig),
    lambdaConfig: S.optional(LambdaDataSourceConfig),
    elasticsearchConfig: S.optional(ElasticsearchDataSourceConfig),
    openSearchServiceConfig: S.optional(OpenSearchServiceDataSourceConfig),
    httpConfig: S.optional(HttpDataSourceConfig),
    relationalDatabaseConfig: S.optional(RelationalDatabaseDataSourceConfig),
    eventBridgeConfig: S.optional(EventBridgeDataSourceConfig),
    metricsConfig: S.optional(DataSourceLevelMetricsConfig),
  }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export interface CreateDataSourceResponse {
  dataSource?: DataSource;
}
export const CreateDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSource: S.optional(DataSource) }).pipe(ns),
).annotate({
  identifier: "CreateDataSourceResponse",
}) as any as S.Schema<CreateDataSourceResponse>;
export type CertificateArn = string;
export type Description = string;
export interface CreateDomainNameRequest {
  domainName: string;
  certificateArn: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String,
    certificateArn: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/domainnames" }),
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
export interface DomainNameConfig {
  domainName?: string;
  description?: string;
  certificateArn?: string;
  appsyncDomainName?: string;
  hostedZoneId?: string;
  tags?: { [key: string]: string | undefined };
  domainNameArn?: string;
}
export const DomainNameConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    description: S.optional(S.String),
    certificateArn: S.optional(S.String),
    appsyncDomainName: S.optional(S.String),
    hostedZoneId: S.optional(S.String),
    tags: S.optional(TagMap),
    domainNameArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainNameConfig",
}) as any as S.Schema<DomainNameConfig>;
export interface CreateDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export const CreateDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainNameConfig: S.optional(DomainNameConfig) }).pipe(ns),
).annotate({
  identifier: "CreateDomainNameResponse",
}) as any as S.Schema<CreateDomainNameResponse>;
export type MappingTemplate = string;
export type ConflictHandlerType =
  | "OPTIMISTIC_CONCURRENCY"
  | "LAMBDA"
  | "AUTOMERGE"
  | "NONE"
  | (string & {});
export const ConflictHandlerType = /*@__PURE__*/ S.String;

export type ConflictDetectionType = "VERSION" | "NONE" | (string & {});
export const ConflictDetectionType = /*@__PURE__*/ S.String;

export interface LambdaConflictHandlerConfig {
  lambdaConflictHandlerArn?: string;
}
export const LambdaConflictHandlerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaConflictHandlerArn: S.optional(S.String) }),
).annotate({
  identifier: "LambdaConflictHandlerConfig",
}) as any as S.Schema<LambdaConflictHandlerConfig>;
export interface SyncConfig {
  conflictHandler?: ConflictHandlerType;
  conflictDetection?: ConflictDetectionType;
  lambdaConflictHandlerConfig?: LambdaConflictHandlerConfig;
}
export const SyncConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conflictHandler: S.optional(ConflictHandlerType),
    conflictDetection: S.optional(ConflictDetectionType),
    lambdaConflictHandlerConfig: S.optional(LambdaConflictHandlerConfig),
  }),
).annotate({ identifier: "SyncConfig" }) as any as S.Schema<SyncConfig>;
export type MaxBatchSize = number;
export type RuntimeName = "APPSYNC_JS" | (string & {});
export const RuntimeName = /*@__PURE__*/ S.String;

export interface AppSyncRuntime {
  name: RuntimeName;
  runtimeVersion: string;
}
export const AppSyncRuntime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: RuntimeName, runtimeVersion: S.String }),
).annotate({ identifier: "AppSyncRuntime" }) as any as S.Schema<AppSyncRuntime>;
export interface CreateFunctionRequest {
  apiId: string;
  name: string;
  description?: string;
  dataSourceName: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export const CreateFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    description: S.optional(S.String),
    dataSourceName: S.String,
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    functionVersion: S.optional(S.String),
    syncConfig: S.optional(SyncConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFunctionRequest",
}) as any as S.Schema<CreateFunctionRequest>;
export interface FunctionConfiguration {
  functionId?: string;
  functionArn?: string;
  name?: string;
  description?: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export const FunctionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionId: S.optional(S.String),
    functionArn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    dataSourceName: S.optional(S.String),
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    functionVersion: S.optional(S.String),
    syncConfig: S.optional(SyncConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
  }),
).annotate({
  identifier: "FunctionConfiguration",
}) as any as S.Schema<FunctionConfiguration>;
export interface CreateFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export const CreateFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionConfiguration: S.optional(FunctionConfiguration) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateFunctionResponse",
}) as any as S.Schema<CreateFunctionResponse>;
export type FieldLogLevel =
  | "NONE"
  | "ERROR"
  | "ALL"
  | "INFO"
  | "DEBUG"
  | (string & {});
export const FieldLogLevel = /*@__PURE__*/ S.String;

export interface LogConfig {
  fieldLogLevel: FieldLogLevel;
  cloudWatchLogsRoleArn: string;
  excludeVerboseContent?: boolean;
}
export const LogConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fieldLogLevel: FieldLogLevel,
    cloudWatchLogsRoleArn: S.String,
    excludeVerboseContent: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LogConfig" }) as any as S.Schema<LogConfig>;
export type DefaultAction = "ALLOW" | "DENY" | (string & {});
export const DefaultAction = /*@__PURE__*/ S.String;

export interface UserPoolConfig {
  userPoolId: string;
  awsRegion: string;
  defaultAction: DefaultAction;
  appIdClientRegex?: string;
}
export const UserPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolId: S.String,
    awsRegion: S.String,
    defaultAction: DefaultAction,
    appIdClientRegex: S.optional(S.String),
  }),
).annotate({ identifier: "UserPoolConfig" }) as any as S.Schema<UserPoolConfig>;
export interface CognitoUserPoolConfig {
  userPoolId: string;
  awsRegion: string;
  appIdClientRegex?: string;
}
export const CognitoUserPoolConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolId: S.String,
    awsRegion: S.String,
    appIdClientRegex: S.optional(S.String),
  }),
).annotate({
  identifier: "CognitoUserPoolConfig",
}) as any as S.Schema<CognitoUserPoolConfig>;
export interface AdditionalAuthenticationProvider {
  authenticationType?: AuthenticationType;
  openIDConnectConfig?: OpenIDConnectConfig;
  userPoolConfig?: CognitoUserPoolConfig;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
}
export const AdditionalAuthenticationProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authenticationType: S.optional(AuthenticationType),
    openIDConnectConfig: S.optional(OpenIDConnectConfig),
    userPoolConfig: S.optional(CognitoUserPoolConfig),
    lambdaAuthorizerConfig: S.optional(LambdaAuthorizerConfig),
  }),
).annotate({
  identifier: "AdditionalAuthenticationProvider",
}) as any as S.Schema<AdditionalAuthenticationProvider>;
export type AdditionalAuthenticationProviders =
  AdditionalAuthenticationProvider[];
export const AdditionalAuthenticationProviders = /*@__PURE__*/ S.Array(
  AdditionalAuthenticationProvider,
);
export type GraphQLApiType = "GRAPHQL" | "MERGED" | (string & {});
export const GraphQLApiType = /*@__PURE__*/ S.String;

export type GraphQLApiVisibility = "GLOBAL" | "PRIVATE" | (string & {});
export const GraphQLApiVisibility = /*@__PURE__*/ S.String;

export type GraphQLApiIntrospectionConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const GraphQLApiIntrospectionConfig = /*@__PURE__*/ S.String;

export type QueryDepthLimit = number;
export type ResolverCountLimit = number;
export type ResolverLevelMetricsBehavior =
  | "FULL_REQUEST_RESOLVER_METRICS"
  | "PER_RESOLVER_METRICS"
  | (string & {});
export const ResolverLevelMetricsBehavior = /*@__PURE__*/ S.String;

export type DataSourceLevelMetricsBehavior =
  | "FULL_REQUEST_DATA_SOURCE_METRICS"
  | "PER_DATA_SOURCE_METRICS"
  | (string & {});
export const DataSourceLevelMetricsBehavior = /*@__PURE__*/ S.String;

export type OperationLevelMetricsConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const OperationLevelMetricsConfig = /*@__PURE__*/ S.String;

export interface EnhancedMetricsConfig {
  resolverLevelMetricsBehavior: ResolverLevelMetricsBehavior;
  dataSourceLevelMetricsBehavior: DataSourceLevelMetricsBehavior;
  operationLevelMetricsConfig: OperationLevelMetricsConfig;
}
export const EnhancedMetricsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolverLevelMetricsBehavior: ResolverLevelMetricsBehavior,
    dataSourceLevelMetricsBehavior: DataSourceLevelMetricsBehavior,
    operationLevelMetricsConfig: OperationLevelMetricsConfig,
  }),
).annotate({
  identifier: "EnhancedMetricsConfig",
}) as any as S.Schema<EnhancedMetricsConfig>;
export interface CreateGraphqlApiRequest {
  name: string;
  logConfig?: LogConfig;
  authenticationType: AuthenticationType;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  tags?: { [key: string]: string | undefined };
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  apiType?: GraphQLApiType;
  mergedApiExecutionRoleArn?: string;
  visibility?: GraphQLApiVisibility;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export const CreateGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    logConfig: S.optional(LogConfig),
    authenticationType: AuthenticationType,
    userPoolConfig: S.optional(UserPoolConfig),
    openIDConnectConfig: S.optional(OpenIDConnectConfig),
    tags: S.optional(TagMap),
    additionalAuthenticationProviders: S.optional(
      AdditionalAuthenticationProviders,
    ),
    xrayEnabled: S.optional(S.Boolean),
    lambdaAuthorizerConfig: S.optional(LambdaAuthorizerConfig),
    apiType: S.optional(GraphQLApiType),
    mergedApiExecutionRoleArn: S.optional(S.String),
    visibility: S.optional(GraphQLApiVisibility),
    ownerContact: S.optional(S.String),
    introspectionConfig: S.optional(GraphQLApiIntrospectionConfig),
    queryDepthLimit: S.optional(S.Number),
    resolverCountLimit: S.optional(S.Number),
    enhancedMetricsConfig: S.optional(EnhancedMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGraphqlApiRequest",
}) as any as S.Schema<CreateGraphqlApiRequest>;
export interface GraphqlApi {
  name?: string;
  apiId?: string;
  authenticationType?: AuthenticationType;
  logConfig?: LogConfig;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  arn?: string;
  uris?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  wafWebAclArn?: string;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  dns?: { [key: string]: string | undefined };
  visibility?: GraphQLApiVisibility;
  apiType?: GraphQLApiType;
  mergedApiExecutionRoleArn?: string;
  owner?: string;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export const GraphqlApi = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    apiId: S.optional(S.String),
    authenticationType: S.optional(AuthenticationType),
    logConfig: S.optional(LogConfig),
    userPoolConfig: S.optional(UserPoolConfig),
    openIDConnectConfig: S.optional(OpenIDConnectConfig),
    arn: S.optional(S.String),
    uris: S.optional(MapOfStringToString),
    tags: S.optional(TagMap),
    additionalAuthenticationProviders: S.optional(
      AdditionalAuthenticationProviders,
    ),
    xrayEnabled: S.optional(S.Boolean),
    wafWebAclArn: S.optional(S.String),
    lambdaAuthorizerConfig: S.optional(LambdaAuthorizerConfig),
    dns: S.optional(MapOfStringToString),
    visibility: S.optional(GraphQLApiVisibility),
    apiType: S.optional(GraphQLApiType),
    mergedApiExecutionRoleArn: S.optional(S.String),
    owner: S.optional(S.String),
    ownerContact: S.optional(S.String),
    introspectionConfig: S.optional(GraphQLApiIntrospectionConfig),
    queryDepthLimit: S.optional(S.Number),
    resolverCountLimit: S.optional(S.Number),
    enhancedMetricsConfig: S.optional(EnhancedMetricsConfig),
  }),
).annotate({ identifier: "GraphqlApi" }) as any as S.Schema<GraphqlApi>;
export interface CreateGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export const CreateGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ graphqlApi: S.optional(GraphqlApi) }).pipe(ns),
).annotate({
  identifier: "CreateGraphqlApiResponse",
}) as any as S.Schema<CreateGraphqlApiResponse>;
export type ResolverKind = "UNIT" | "PIPELINE" | (string & {});
export const ResolverKind = /*@__PURE__*/ S.String;

export type FunctionsIds = string[];
export const FunctionsIds = /*@__PURE__*/ S.Array(S.String);
export interface PipelineConfig {
  functions?: string[];
}
export const PipelineConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functions: S.optional(FunctionsIds) }),
).annotate({ identifier: "PipelineConfig" }) as any as S.Schema<PipelineConfig>;
export type CachingKeys = string[];
export const CachingKeys = /*@__PURE__*/ S.Array(S.String);
export interface CachingConfig {
  ttl: number;
  cachingKeys?: string[];
}
export const CachingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ttl: S.Number, cachingKeys: S.optional(CachingKeys) }),
).annotate({ identifier: "CachingConfig" }) as any as S.Schema<CachingConfig>;
export type ResolverLevelMetricsConfig = "ENABLED" | "DISABLED" | (string & {});
export const ResolverLevelMetricsConfig = /*@__PURE__*/ S.String;

export interface CreateResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export const CreateResolverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    fieldName: S.String,
    dataSourceName: S.optional(S.String),
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    kind: S.optional(ResolverKind),
    pipelineConfig: S.optional(PipelineConfig),
    syncConfig: S.optional(SyncConfig),
    cachingConfig: S.optional(CachingConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
    metricsConfig: S.optional(ResolverLevelMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/apis/{apiId}/types/{typeName}/resolvers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResolverRequest",
}) as any as S.Schema<CreateResolverRequest>;
export interface Resolver {
  typeName?: string;
  fieldName?: string;
  dataSourceName?: string;
  resolverArn?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export const Resolver = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeName: S.optional(S.String),
    fieldName: S.optional(S.String),
    dataSourceName: S.optional(S.String),
    resolverArn: S.optional(S.String),
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    kind: S.optional(ResolverKind),
    pipelineConfig: S.optional(PipelineConfig),
    syncConfig: S.optional(SyncConfig),
    cachingConfig: S.optional(CachingConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
    metricsConfig: S.optional(ResolverLevelMetricsConfig),
  }),
).annotate({ identifier: "Resolver" }) as any as S.Schema<Resolver>;
export interface CreateResolverResponse {
  resolver?: Resolver;
}
export const CreateResolverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resolver: S.optional(Resolver) }).pipe(ns),
).annotate({
  identifier: "CreateResolverResponse",
}) as any as S.Schema<CreateResolverResponse>;
export type TypeDefinitionFormat = "SDL" | "JSON" | (string & {});
export const TypeDefinitionFormat = /*@__PURE__*/ S.String;

export interface CreateTypeRequest {
  apiId: string;
  definition: string;
  format: TypeDefinitionFormat;
}
export const CreateTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    definition: S.String,
    format: TypeDefinitionFormat,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTypeRequest",
}) as any as S.Schema<CreateTypeRequest>;
export interface Type {
  name?: string;
  description?: string;
  arn?: string;
  definition?: string;
  format?: TypeDefinitionFormat;
}
export const Type = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    arn: S.optional(S.String),
    definition: S.optional(S.String),
    format: S.optional(TypeDefinitionFormat),
  }),
).annotate({ identifier: "Type" }) as any as S.Schema<Type>;
export interface CreateTypeResponse {
  type?: Type;
}
export const CreateTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(Type) }).pipe(ns),
).annotate({
  identifier: "CreateTypeResponse",
}) as any as S.Schema<CreateTypeResponse>;
export interface DeleteApiRequest {
  apiId: string;
}
export const DeleteApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v2/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApiRequest",
}) as any as S.Schema<DeleteApiRequest>;
export interface DeleteApiResponse {}
export const DeleteApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApiResponse",
}) as any as S.Schema<DeleteApiResponse>;
export interface DeleteApiCacheRequest {
  apiId: string;
}
export const DeleteApiCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}/ApiCaches" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApiCacheRequest",
}) as any as S.Schema<DeleteApiCacheRequest>;
export interface DeleteApiCacheResponse {}
export const DeleteApiCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApiCacheResponse",
}) as any as S.Schema<DeleteApiCacheResponse>;
export interface DeleteApiKeyRequest {
  apiId: string;
  id: string;
}
export const DeleteApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}/apikeys/{id}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApiKeyResponse",
}) as any as S.Schema<DeleteApiKeyResponse>;
export interface DeleteChannelNamespaceRequest {
  apiId: string;
  name: string;
}
export const DeleteChannelNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{apiId}/channelNamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelNamespaceRequest",
}) as any as S.Schema<DeleteChannelNamespaceRequest>;
export interface DeleteChannelNamespaceResponse {}
export const DeleteChannelNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteChannelNamespaceResponse",
}) as any as S.Schema<DeleteChannelNamespaceResponse>;
export interface DeleteDataSourceRequest {
  apiId: string;
  name: string;
}
export const DeleteDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}/datasources/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataSourceRequest",
}) as any as S.Schema<DeleteDataSourceRequest>;
export interface DeleteDataSourceResponse {}
export const DeleteDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDataSourceResponse",
}) as any as S.Schema<DeleteDataSourceResponse>;
export interface DeleteDomainNameRequest {
  domainName: string;
}
export const DeleteDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String.pipe(T.HttpLabel("domainName")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/domainnames/{domainName}" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDomainNameResponse",
}) as any as S.Schema<DeleteDomainNameResponse>;
export interface DeleteFunctionRequest {
  apiId: string;
  functionId: string;
}
export const DeleteFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    functionId: S.String.pipe(T.HttpLabel("functionId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v1/apis/{apiId}/functions/{functionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionRequest",
}) as any as S.Schema<DeleteFunctionRequest>;
export interface DeleteFunctionResponse {}
export const DeleteFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFunctionResponse",
}) as any as S.Schema<DeleteFunctionResponse>;
export interface DeleteGraphqlApiRequest {
  apiId: string;
}
export const DeleteGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGraphqlApiRequest",
}) as any as S.Schema<DeleteGraphqlApiRequest>;
export interface DeleteGraphqlApiResponse {}
export const DeleteGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteGraphqlApiResponse",
}) as any as S.Schema<DeleteGraphqlApiResponse>;
export interface DeleteResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
}
export const DeleteResolverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    fieldName: S.String.pipe(T.HttpLabel("fieldName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResolverRequest",
}) as any as S.Schema<DeleteResolverRequest>;
export interface DeleteResolverResponse {}
export const DeleteResolverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResolverResponse",
}) as any as S.Schema<DeleteResolverResponse>;
export interface DeleteTypeRequest {
  apiId: string;
  typeName: string;
}
export const DeleteTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}/types/{typeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTypeRequest",
}) as any as S.Schema<DeleteTypeRequest>;
export interface DeleteTypeResponse {}
export const DeleteTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTypeResponse",
}) as any as S.Schema<DeleteTypeResponse>;
export interface DisassociateApiRequest {
  domainName: string;
}
export const DisassociateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String.pipe(T.HttpLabel("domainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v1/domainnames/{domainName}/apiassociation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateApiRequest",
}) as any as S.Schema<DisassociateApiRequest>;
export interface DisassociateApiResponse {}
export const DisassociateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateApiResponse",
}) as any as S.Schema<DisassociateApiResponse>;
export interface DisassociateMergedGraphqlApiRequest {
  sourceApiIdentifier: string;
  associationId: string;
}
export const DisassociateMergedGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceApiIdentifier: S.String.pipe(T.HttpLabel("sourceApiIdentifier")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v1/sourceApis/{sourceApiIdentifier}/mergedApiAssociations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateMergedGraphqlApiRequest",
}) as any as S.Schema<DisassociateMergedGraphqlApiRequest>;
export interface DisassociateMergedGraphqlApiResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export const DisassociateMergedGraphqlApiResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceApiAssociationStatus: S.optional(SourceApiAssociationStatus),
    }).pipe(ns),
).annotate({
  identifier: "DisassociateMergedGraphqlApiResponse",
}) as any as S.Schema<DisassociateMergedGraphqlApiResponse>;
export interface DisassociateSourceGraphqlApiRequest {
  mergedApiIdentifier: string;
  associationId: string;
}
export const DisassociateSourceGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateSourceGraphqlApiRequest",
}) as any as S.Schema<DisassociateSourceGraphqlApiRequest>;
export interface DisassociateSourceGraphqlApiResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export const DisassociateSourceGraphqlApiResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceApiAssociationStatus: S.optional(SourceApiAssociationStatus),
    }).pipe(ns),
).annotate({
  identifier: "DisassociateSourceGraphqlApiResponse",
}) as any as S.Schema<DisassociateSourceGraphqlApiResponse>;
export type Context = string;
export interface EvaluateCodeRequest {
  runtime: AppSyncRuntime;
  code: string;
  context: string;
  function?: string;
}
export const EvaluateCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtime: AppSyncRuntime,
    code: S.String,
    context: S.String,
    function: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/dataplane-evaluatecode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EvaluateCodeRequest",
}) as any as S.Schema<EvaluateCodeRequest>;
export type EvaluationResult = string;
export type ErrorMessage = string;
export type CodeErrorLine = number;
export type CodeErrorColumn = number;
export type CodeErrorSpan = number;
export interface CodeErrorLocation {
  line?: number;
  column?: number;
  span?: number;
}
export const CodeErrorLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    line: S.optional(S.Number),
    column: S.optional(S.Number),
    span: S.optional(S.Number),
  }),
).annotate({
  identifier: "CodeErrorLocation",
}) as any as S.Schema<CodeErrorLocation>;
export interface CodeError {
  errorType?: string;
  value?: string;
  location?: CodeErrorLocation;
}
export const CodeError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorType: S.optional(S.String),
    value: S.optional(S.String),
    location: S.optional(CodeErrorLocation),
  }),
).annotate({ identifier: "CodeError" }) as any as S.Schema<CodeError>;
export type CodeErrors = CodeError[];
export const CodeErrors = /*@__PURE__*/ S.Array(CodeError);
export interface EvaluateCodeErrorDetail {
  message?: string;
  codeErrors?: CodeError[];
}
export const EvaluateCodeErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    message: S.optional(S.String),
    codeErrors: S.optional(CodeErrors),
  }),
).annotate({
  identifier: "EvaluateCodeErrorDetail",
}) as any as S.Schema<EvaluateCodeErrorDetail>;
export type Logs = string[];
export const Logs = /*@__PURE__*/ S.Array(S.String);
export type Stash = string;
export type OutErrors = string;
export interface EvaluateCodeResponse {
  evaluationResult?: string;
  error?: EvaluateCodeErrorDetail;
  logs?: string[];
  stash?: string;
  outErrors?: string;
}
export const EvaluateCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluationResult: S.optional(S.String),
    error: S.optional(EvaluateCodeErrorDetail),
    logs: S.optional(Logs),
    stash: S.optional(S.String),
    outErrors: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EvaluateCodeResponse",
}) as any as S.Schema<EvaluateCodeResponse>;
export type Template = string;
export interface EvaluateMappingTemplateRequest {
  template: string;
  context: string;
}
export const EvaluateMappingTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ template: S.String, context: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/dataplane-evaluatetemplate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EvaluateMappingTemplateRequest",
}) as any as S.Schema<EvaluateMappingTemplateRequest>;
export interface ErrorDetail {
  message?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export interface EvaluateMappingTemplateResponse {
  evaluationResult?: string;
  error?: ErrorDetail;
  logs?: string[];
  stash?: string;
  outErrors?: string;
}
export const EvaluateMappingTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    evaluationResult: S.optional(S.String),
    error: S.optional(ErrorDetail),
    logs: S.optional(Logs),
    stash: S.optional(S.String),
    outErrors: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EvaluateMappingTemplateResponse",
}) as any as S.Schema<EvaluateMappingTemplateResponse>;
export interface FlushApiCacheRequest {
  apiId: string;
}
export const FlushApiCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/apis/{apiId}/FlushCache" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "FlushApiCacheRequest",
}) as any as S.Schema<FlushApiCacheRequest>;
export interface FlushApiCacheResponse {}
export const FlushApiCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "FlushApiCacheResponse",
}) as any as S.Schema<FlushApiCacheResponse>;
export interface GetApiRequest {
  apiId: string;
}
export const GetApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v2/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetApiRequest" }) as any as S.Schema<GetApiRequest>;
export interface GetApiResponse {
  api?: Api;
}
export const GetApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ api: S.optional(Api) }).pipe(ns),
).annotate({ identifier: "GetApiResponse" }) as any as S.Schema<GetApiResponse>;
export interface GetApiAssociationRequest {
  domainName: string;
}
export const GetApiAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String.pipe(T.HttpLabel("domainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/domainnames/{domainName}/apiassociation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiAssociationRequest",
}) as any as S.Schema<GetApiAssociationRequest>;
export interface GetApiAssociationResponse {
  apiAssociation?: ApiAssociation;
}
export const GetApiAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiAssociation: S.optional(ApiAssociation) }).pipe(ns),
).annotate({
  identifier: "GetApiAssociationResponse",
}) as any as S.Schema<GetApiAssociationResponse>;
export interface GetApiCacheRequest {
  apiId: string;
}
export const GetApiCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/ApiCaches" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiCacheRequest",
}) as any as S.Schema<GetApiCacheRequest>;
export interface GetApiCacheResponse {
  apiCache?: ApiCache;
}
export const GetApiCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCache: S.optional(ApiCache) }).pipe(ns),
).annotate({
  identifier: "GetApiCacheResponse",
}) as any as S.Schema<GetApiCacheResponse>;
export interface GetChannelNamespaceRequest {
  apiId: string;
  name: string;
}
export const GetChannelNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v2/apis/{apiId}/channelNamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelNamespaceRequest",
}) as any as S.Schema<GetChannelNamespaceRequest>;
export interface GetChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export const GetChannelNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ channelNamespace: S.optional(ChannelNamespace) }).pipe(ns),
).annotate({
  identifier: "GetChannelNamespaceResponse",
}) as any as S.Schema<GetChannelNamespaceResponse>;
export interface GetDataSourceRequest {
  apiId: string;
  name: string;
}
export const GetDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/datasources/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSourceRequest",
}) as any as S.Schema<GetDataSourceRequest>;
export interface GetDataSourceResponse {
  dataSource?: DataSource;
}
export const GetDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSource: S.optional(DataSource) }).pipe(ns),
).annotate({
  identifier: "GetDataSourceResponse",
}) as any as S.Schema<GetDataSourceResponse>;
export type PaginationToken = string;
export type MaxResults = number;
export interface GetDataSourceIntrospectionRequest {
  introspectionId: string;
  includeModelsSDL?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export const GetDataSourceIntrospectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    introspectionId: S.String.pipe(T.HttpLabel("introspectionId")),
    includeModelsSDL: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeModelsSDL"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/datasources/introspections/{introspectionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSourceIntrospectionRequest",
}) as any as S.Schema<GetDataSourceIntrospectionRequest>;
export type DataSourceIntrospectionStatus =
  | "PROCESSING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const DataSourceIntrospectionStatus = /*@__PURE__*/ S.String;

export type DataSourceIntrospectionModelFieldTypeValues = string[];
export const DataSourceIntrospectionModelFieldTypeValues =
  /*@__PURE__*/ S.Array(S.String);
export interface DataSourceIntrospectionModelFieldType {
  kind?: string;
  name?: string;
  type?: DataSourceIntrospectionModelFieldType;
  values?: string[];
}
export const DataSourceIntrospectionModelFieldType = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      kind: S.optional(S.String),
      name: S.optional(S.String),
      type: S.optional(
        S.suspend(
          (): S.Schema<DataSourceIntrospectionModelFieldType> =>
            DataSourceIntrospectionModelFieldType,
        ).annotate({ identifier: "DataSourceIntrospectionModelFieldType" }),
      ),
      values: S.optional(DataSourceIntrospectionModelFieldTypeValues),
    }),
).annotate({
  identifier: "DataSourceIntrospectionModelFieldType",
}) as any as S.Schema<DataSourceIntrospectionModelFieldType>;
export interface DataSourceIntrospectionModelField {
  name?: string;
  type?: DataSourceIntrospectionModelFieldType;
  length?: number;
}
export const DataSourceIntrospectionModelField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(DataSourceIntrospectionModelFieldType),
    length: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataSourceIntrospectionModelField",
}) as any as S.Schema<DataSourceIntrospectionModelField>;
export type DataSourceIntrospectionModelFields =
  DataSourceIntrospectionModelField[];
export const DataSourceIntrospectionModelFields = /*@__PURE__*/ S.Array(
  DataSourceIntrospectionModelField,
);
export type DataSourceIntrospectionModelIndexFields = string[];
export const DataSourceIntrospectionModelIndexFields = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DataSourceIntrospectionModelIndex {
  name?: string;
  fields?: string[];
}
export const DataSourceIntrospectionModelIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    fields: S.optional(DataSourceIntrospectionModelIndexFields),
  }),
).annotate({
  identifier: "DataSourceIntrospectionModelIndex",
}) as any as S.Schema<DataSourceIntrospectionModelIndex>;
export type DataSourceIntrospectionModelIndexes =
  DataSourceIntrospectionModelIndex[];
export const DataSourceIntrospectionModelIndexes = /*@__PURE__*/ S.Array(
  DataSourceIntrospectionModelIndex,
);
export interface DataSourceIntrospectionModel {
  name?: string;
  fields?: DataSourceIntrospectionModelField[];
  primaryKey?: DataSourceIntrospectionModelIndex;
  indexes?: DataSourceIntrospectionModelIndex[];
  sdl?: string;
}
export const DataSourceIntrospectionModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    fields: S.optional(DataSourceIntrospectionModelFields),
    primaryKey: S.optional(DataSourceIntrospectionModelIndex),
    indexes: S.optional(DataSourceIntrospectionModelIndexes),
    sdl: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSourceIntrospectionModel",
}) as any as S.Schema<DataSourceIntrospectionModel>;
export type DataSourceIntrospectionModels = DataSourceIntrospectionModel[];
export const DataSourceIntrospectionModels = /*@__PURE__*/ S.Array(
  DataSourceIntrospectionModel,
);
export interface DataSourceIntrospectionResult {
  models?: DataSourceIntrospectionModel[];
  nextToken?: string;
}
export const DataSourceIntrospectionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    models: S.optional(DataSourceIntrospectionModels),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSourceIntrospectionResult",
}) as any as S.Schema<DataSourceIntrospectionResult>;
export interface GetDataSourceIntrospectionResponse {
  introspectionId?: string;
  introspectionStatus?: DataSourceIntrospectionStatus;
  introspectionStatusDetail?: string;
  introspectionResult?: DataSourceIntrospectionResult;
}
export const GetDataSourceIntrospectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    introspectionId: S.optional(S.String),
    introspectionStatus: S.optional(DataSourceIntrospectionStatus),
    introspectionStatusDetail: S.optional(S.String),
    introspectionResult: S.optional(DataSourceIntrospectionResult),
  }).pipe(ns),
).annotate({
  identifier: "GetDataSourceIntrospectionResponse",
}) as any as S.Schema<GetDataSourceIntrospectionResponse>;
export interface GetDomainNameRequest {
  domainName: string;
}
export const GetDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainName: S.String.pipe(T.HttpLabel("domainName")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/domainnames/{domainName}" }),
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
export interface GetDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export const GetDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainNameConfig: S.optional(DomainNameConfig) }).pipe(ns),
).annotate({
  identifier: "GetDomainNameResponse",
}) as any as S.Schema<GetDomainNameResponse>;
export interface GetFunctionRequest {
  apiId: string;
  functionId: string;
}
export const GetFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    functionId: S.String.pipe(T.HttpLabel("functionId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/functions/{functionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionRequest",
}) as any as S.Schema<GetFunctionRequest>;
export interface GetFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export const GetFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionConfiguration: S.optional(FunctionConfiguration) }).pipe(
    ns,
  ),
).annotate({
  identifier: "GetFunctionResponse",
}) as any as S.Schema<GetFunctionResponse>;
export interface GetGraphqlApiRequest {
  apiId: string;
}
export const GetGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGraphqlApiRequest",
}) as any as S.Schema<GetGraphqlApiRequest>;
export interface GetGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export const GetGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ graphqlApi: S.optional(GraphqlApi) }).pipe(ns),
).annotate({
  identifier: "GetGraphqlApiResponse",
}) as any as S.Schema<GetGraphqlApiResponse>;
export interface GetGraphqlApiEnvironmentVariablesRequest {
  apiId: string;
}
export const GetGraphqlApiEnvironmentVariablesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/v1/apis/{apiId}/environmentVariables" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetGraphqlApiEnvironmentVariablesRequest",
}) as any as S.Schema<GetGraphqlApiEnvironmentVariablesRequest>;
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariableMap = { [key: string]: string | undefined };
export const EnvironmentVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetGraphqlApiEnvironmentVariablesResponse {
  environmentVariables?: { [key: string]: string | undefined };
}
export const GetGraphqlApiEnvironmentVariablesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ environmentVariables: S.optional(EnvironmentVariableMap) }).pipe(
      ns,
    ),
  ).annotate({
    identifier: "GetGraphqlApiEnvironmentVariablesResponse",
  }) as any as S.Schema<GetGraphqlApiEnvironmentVariablesResponse>;
export type OutputType = "SDL" | "JSON" | (string & {});
export const OutputType = /*@__PURE__*/ S.String;

export interface GetIntrospectionSchemaRequest {
  apiId: string;
  format: OutputType;
  includeDirectives?: boolean;
}
export const GetIntrospectionSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    format: OutputType.pipe(T.HttpQuery("format")),
    includeDirectives: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeDirectives"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/schema" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntrospectionSchemaRequest",
}) as any as S.Schema<GetIntrospectionSchemaRequest>;
export interface GetIntrospectionSchemaResponse {
  schema?: T.StreamingOutputBody;
}
export const GetIntrospectionSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schema: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }).pipe(ns),
).annotate({
  identifier: "GetIntrospectionSchemaResponse",
}) as any as S.Schema<GetIntrospectionSchemaResponse>;
export interface GetResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
}
export const GetResolverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    fieldName: S.String.pipe(T.HttpLabel("fieldName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResolverRequest",
}) as any as S.Schema<GetResolverRequest>;
export interface GetResolverResponse {
  resolver?: Resolver;
}
export const GetResolverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resolver: S.optional(Resolver) }).pipe(ns),
).annotate({
  identifier: "GetResolverResponse",
}) as any as S.Schema<GetResolverResponse>;
export interface GetSchemaCreationStatusRequest {
  apiId: string;
}
export const GetSchemaCreationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiId: S.String.pipe(T.HttpLabel("apiId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/schemacreation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSchemaCreationStatusRequest",
}) as any as S.Schema<GetSchemaCreationStatusRequest>;
export type SchemaStatus =
  | "PROCESSING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "SUCCESS"
  | "NOT_APPLICABLE"
  | (string & {});
export const SchemaStatus = /*@__PURE__*/ S.String;

export interface GetSchemaCreationStatusResponse {
  status?: SchemaStatus;
  details?: string;
}
export const GetSchemaCreationStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(SchemaStatus),
    details: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetSchemaCreationStatusResponse",
}) as any as S.Schema<GetSchemaCreationStatusResponse>;
export interface GetSourceApiAssociationRequest {
  mergedApiIdentifier: string;
  associationId: string;
}
export const GetSourceApiAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSourceApiAssociationRequest",
}) as any as S.Schema<GetSourceApiAssociationRequest>;
export interface GetSourceApiAssociationResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export const GetSourceApiAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceApiAssociation: S.optional(SourceApiAssociation) }).pipe(ns),
).annotate({
  identifier: "GetSourceApiAssociationResponse",
}) as any as S.Schema<GetSourceApiAssociationResponse>;
export interface GetTypeRequest {
  apiId: string;
  typeName: string;
  format: TypeDefinitionFormat;
}
export const GetTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    format: TypeDefinitionFormat.pipe(T.HttpQuery("format")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/types/{typeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTypeRequest" }) as any as S.Schema<GetTypeRequest>;
export interface GetTypeResponse {
  type?: Type;
}
export const GetTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(Type) }).pipe(ns),
).annotate({
  identifier: "GetTypeResponse",
}) as any as S.Schema<GetTypeResponse>;
export interface ListApiKeysRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListApiKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/apikeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApiKeysRequest",
}) as any as S.Schema<ListApiKeysRequest>;
export type ApiKeys = ApiKey[];
export const ApiKeys = /*@__PURE__*/ S.Array(ApiKey);
export interface ListApiKeysResponse {
  apiKeys?: ApiKey[];
  nextToken?: string;
}
export const ListApiKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiKeys: S.optional(ApiKeys),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApiKeysResponse",
}) as any as S.Schema<ListApiKeysResponse>;
export interface ListApisRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v2/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApisRequest",
}) as any as S.Schema<ListApisRequest>;
export type Apis = Api[];
export const Apis = /*@__PURE__*/ S.Array(Api);
export interface ListApisResponse {
  apis?: Api[];
  nextToken?: string;
}
export const ListApisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apis: S.optional(Apis), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListApisResponse",
}) as any as S.Schema<ListApisResponse>;
export interface ListChannelNamespacesRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListChannelNamespacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v2/apis/{apiId}/channelNamespaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelNamespacesRequest",
}) as any as S.Schema<ListChannelNamespacesRequest>;
export type ChannelNamespaces = ChannelNamespace[];
export const ChannelNamespaces = /*@__PURE__*/ S.Array(ChannelNamespace);
export interface ListChannelNamespacesResponse {
  channelNamespaces?: ChannelNamespace[];
  nextToken?: string;
}
export const ListChannelNamespacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelNamespaces: S.optional(ChannelNamespaces),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListChannelNamespacesResponse",
}) as any as S.Schema<ListChannelNamespacesResponse>;
export interface ListDataSourcesRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/datasources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourcesRequest",
}) as any as S.Schema<ListDataSourcesRequest>;
export type DataSources = DataSource[];
export const DataSources = /*@__PURE__*/ S.Array(DataSource);
export interface ListDataSourcesResponse {
  dataSources?: DataSource[];
  nextToken?: string;
}
export const ListDataSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSources: S.optional(DataSources),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDataSourcesResponse",
}) as any as S.Schema<ListDataSourcesResponse>;
export interface ListDomainNamesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/domainnames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainNamesRequest",
}) as any as S.Schema<ListDomainNamesRequest>;
export type DomainNameConfigs = DomainNameConfig[];
export const DomainNameConfigs = /*@__PURE__*/ S.Array(DomainNameConfig);
export interface ListDomainNamesResponse {
  domainNameConfigs?: DomainNameConfig[];
  nextToken?: string;
}
export const ListDomainNamesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainNameConfigs: S.optional(DomainNameConfigs),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainNamesResponse",
}) as any as S.Schema<ListDomainNamesResponse>;
export interface ListFunctionsRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFunctionsRequest",
}) as any as S.Schema<ListFunctionsRequest>;
export type Functions = FunctionConfiguration[];
export const Functions = /*@__PURE__*/ S.Array(FunctionConfiguration);
export interface ListFunctionsResponse {
  functions?: FunctionConfiguration[];
  nextToken?: string;
}
export const ListFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functions: S.optional(Functions),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListFunctionsResponse",
}) as any as S.Schema<ListFunctionsResponse>;
export type Ownership = "CURRENT_ACCOUNT" | "OTHER_ACCOUNTS" | (string & {});
export const Ownership = /*@__PURE__*/ S.String;

export interface ListGraphqlApisRequest {
  nextToken?: string;
  maxResults?: number;
  apiType?: GraphQLApiType;
  owner?: Ownership;
}
export const ListGraphqlApisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    apiType: S.optional(GraphQLApiType).pipe(T.HttpQuery("apiType")),
    owner: S.optional(Ownership).pipe(T.HttpQuery("owner")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGraphqlApisRequest",
}) as any as S.Schema<ListGraphqlApisRequest>;
export type GraphqlApis = GraphqlApi[];
export const GraphqlApis = /*@__PURE__*/ S.Array(GraphqlApi);
export interface ListGraphqlApisResponse {
  graphqlApis?: GraphqlApi[];
  nextToken?: string;
}
export const ListGraphqlApisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    graphqlApis: S.optional(GraphqlApis),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGraphqlApisResponse",
}) as any as S.Schema<ListGraphqlApisResponse>;
export interface ListResolversRequest {
  apiId: string;
  typeName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListResolversRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/apis/{apiId}/types/{typeName}/resolvers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResolversRequest",
}) as any as S.Schema<ListResolversRequest>;
export type Resolvers = Resolver[];
export const Resolvers = /*@__PURE__*/ S.Array(Resolver);
export interface ListResolversResponse {
  resolvers?: Resolver[];
  nextToken?: string;
}
export const ListResolversResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolvers: S.optional(Resolvers),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResolversResponse",
}) as any as S.Schema<ListResolversResponse>;
export interface ListResolversByFunctionRequest {
  apiId: string;
  functionId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListResolversByFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    functionId: S.String.pipe(T.HttpLabel("functionId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/apis/{apiId}/functions/{functionId}/resolvers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResolversByFunctionRequest",
}) as any as S.Schema<ListResolversByFunctionRequest>;
export interface ListResolversByFunctionResponse {
  resolvers?: Resolver[];
  nextToken?: string;
}
export const ListResolversByFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolvers: S.optional(Resolvers),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResolversByFunctionResponse",
}) as any as S.Schema<ListResolversByFunctionResponse>;
export interface ListSourceApiAssociationsRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSourceApiAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/sourceApiAssociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceApiAssociationsRequest",
}) as any as S.Schema<ListSourceApiAssociationsRequest>;
export interface SourceApiAssociationSummary {
  associationId?: string;
  associationArn?: string;
  sourceApiId?: string;
  sourceApiArn?: string;
  mergedApiId?: string;
  mergedApiArn?: string;
  description?: string;
}
export const SourceApiAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationId: S.optional(S.String),
    associationArn: S.optional(S.String),
    sourceApiId: S.optional(S.String),
    sourceApiArn: S.optional(S.String),
    mergedApiId: S.optional(S.String),
    mergedApiArn: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceApiAssociationSummary",
}) as any as S.Schema<SourceApiAssociationSummary>;
export type SourceApiAssociationSummaryList = SourceApiAssociationSummary[];
export const SourceApiAssociationSummaryList = /*@__PURE__*/ S.Array(
  SourceApiAssociationSummary,
);
export interface ListSourceApiAssociationsResponse {
  sourceApiAssociationSummaries?: SourceApiAssociationSummary[];
  nextToken?: string;
}
export const ListSourceApiAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceApiAssociationSummaries: S.optional(SourceApiAssociationSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSourceApiAssociationsResponse",
}) as any as S.Schema<ListSourceApiAssociationsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
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
  S.Struct({ tags: S.optional(TagMap) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTypesRequest {
  apiId: string;
  format: TypeDefinitionFormat;
  nextToken?: string;
  maxResults?: number;
}
export const ListTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    format: TypeDefinitionFormat.pipe(T.HttpQuery("format")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/apis/{apiId}/types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTypesRequest",
}) as any as S.Schema<ListTypesRequest>;
export type TypeList = Type[];
export const TypeList = /*@__PURE__*/ S.Array(Type);
export interface ListTypesResponse {
  types?: Type[];
  nextToken?: string;
}
export const ListTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    types: S.optional(TypeList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTypesResponse",
}) as any as S.Schema<ListTypesResponse>;
export interface ListTypesByAssociationRequest {
  mergedApiIdentifier: string;
  associationId: string;
  format: TypeDefinitionFormat;
  nextToken?: string;
  maxResults?: number;
}
export const ListTypesByAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
    associationId: S.String.pipe(T.HttpLabel("associationId")),
    format: TypeDefinitionFormat.pipe(T.HttpQuery("format")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}/types",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTypesByAssociationRequest",
}) as any as S.Schema<ListTypesByAssociationRequest>;
export interface ListTypesByAssociationResponse {
  types?: Type[];
  nextToken?: string;
}
export const ListTypesByAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    types: S.optional(TypeList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTypesByAssociationResponse",
}) as any as S.Schema<ListTypesByAssociationResponse>;
export interface PutGraphqlApiEnvironmentVariablesRequest {
  apiId: string;
  environmentVariables: { [key: string]: string | undefined };
}
export const PutGraphqlApiEnvironmentVariablesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      apiId: S.String.pipe(T.HttpLabel("apiId")),
      environmentVariables: EnvironmentVariableMap,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "PUT", uri: "/v1/apis/{apiId}/environmentVariables" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutGraphqlApiEnvironmentVariablesRequest",
}) as any as S.Schema<PutGraphqlApiEnvironmentVariablesRequest>;
export interface PutGraphqlApiEnvironmentVariablesResponse {
  environmentVariables?: { [key: string]: string | undefined };
}
export const PutGraphqlApiEnvironmentVariablesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ environmentVariables: S.optional(EnvironmentVariableMap) }).pipe(
      ns,
    ),
  ).annotate({
    identifier: "PutGraphqlApiEnvironmentVariablesResponse",
  }) as any as S.Schema<PutGraphqlApiEnvironmentVariablesResponse>;
export type RdsDataApiConfigResourceArn = string;
export type RdsDataApiConfigSecretArn = string;
export type RdsDataApiConfigDatabaseName = string;
export interface RdsDataApiConfig {
  resourceArn: string;
  secretArn: string;
  databaseName: string;
}
export const RdsDataApiConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    databaseName: S.String,
  }),
).annotate({
  identifier: "RdsDataApiConfig",
}) as any as S.Schema<RdsDataApiConfig>;
export interface StartDataSourceIntrospectionRequest {
  rdsDataApiConfig?: RdsDataApiConfig;
}
export const StartDataSourceIntrospectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rdsDataApiConfig: S.optional(RdsDataApiConfig) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/datasources/introspections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDataSourceIntrospectionRequest",
}) as any as S.Schema<StartDataSourceIntrospectionRequest>;
export interface StartDataSourceIntrospectionResponse {
  introspectionId?: string;
  introspectionStatus?: DataSourceIntrospectionStatus;
  introspectionStatusDetail?: string;
}
export const StartDataSourceIntrospectionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      introspectionId: S.optional(S.String),
      introspectionStatus: S.optional(DataSourceIntrospectionStatus),
      introspectionStatusDetail: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "StartDataSourceIntrospectionResponse",
}) as any as S.Schema<StartDataSourceIntrospectionResponse>;
export interface StartSchemaCreationRequest {
  apiId: string;
  definition: Uint8Array;
}
export const StartSchemaCreationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    definition: T.Blob,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/schemacreation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSchemaCreationRequest",
}) as any as S.Schema<StartSchemaCreationRequest>;
export interface StartSchemaCreationResponse {
  status?: SchemaStatus;
}
export const StartSchemaCreationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(SchemaStatus) }).pipe(ns),
).annotate({
  identifier: "StartSchemaCreationResponse",
}) as any as S.Schema<StartSchemaCreationResponse>;
export interface StartSchemaMergeRequest {
  associationId: string;
  mergedApiIdentifier: string;
}
export const StartSchemaMergeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationId: S.String.pipe(T.HttpLabel("associationId")),
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}/merge",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSchemaMergeRequest",
}) as any as S.Schema<StartSchemaMergeRequest>;
export interface StartSchemaMergeResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export const StartSchemaMergeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceApiAssociationStatus: S.optional(SourceApiAssociationStatus),
  }).pipe(ns),
).annotate({
  identifier: "StartSchemaMergeResponse",
}) as any as S.Schema<StartSchemaMergeResponse>;
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
      ns,
      T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
export interface UpdateApiRequest {
  apiId: string;
  name: string;
  ownerContact?: string;
  eventConfig: EventConfig;
}
export const UpdateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    ownerContact: S.optional(S.String),
    eventConfig: EventConfig,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v2/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApiRequest",
}) as any as S.Schema<UpdateApiRequest>;
export interface UpdateApiResponse {
  api?: Api;
}
export const UpdateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ api: S.optional(Api) }).pipe(ns),
).annotate({
  identifier: "UpdateApiResponse",
}) as any as S.Schema<UpdateApiResponse>;
export interface UpdateApiCacheRequest {
  apiId: string;
  ttl: number;
  apiCachingBehavior: ApiCachingBehavior;
  type: ApiCacheType;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export const UpdateApiCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    ttl: S.Number,
    apiCachingBehavior: ApiCachingBehavior,
    type: ApiCacheType,
    healthMetricsConfig: S.optional(CacheHealthMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/ApiCaches/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApiCacheRequest",
}) as any as S.Schema<UpdateApiCacheRequest>;
export interface UpdateApiCacheResponse {
  apiCache?: ApiCache;
}
export const UpdateApiCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiCache: S.optional(ApiCache) }).pipe(ns),
).annotate({
  identifier: "UpdateApiCacheResponse",
}) as any as S.Schema<UpdateApiCacheResponse>;
export interface UpdateApiKeyRequest {
  apiId: string;
  id: string;
  description?: string;
  expires?: number;
}
export const UpdateApiKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    id: S.String.pipe(T.HttpLabel("id")),
    description: S.optional(S.String),
    expires: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/apikeys/{id}" }),
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
export interface UpdateApiKeyResponse {
  apiKey?: ApiKey;
}
export const UpdateApiKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiKey: S.optional(ApiKey) }).pipe(ns),
).annotate({
  identifier: "UpdateApiKeyResponse",
}) as any as S.Schema<UpdateApiKeyResponse>;
export interface UpdateChannelNamespaceRequest {
  apiId: string;
  name: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  handlerConfigs?: HandlerConfigs;
}
export const UpdateChannelNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
    subscribeAuthModes: S.optional(AuthModes),
    publishAuthModes: S.optional(AuthModes),
    codeHandlers: S.optional(S.String),
    handlerConfigs: S.optional(HandlerConfigs),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v2/apis/{apiId}/channelNamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChannelNamespaceRequest",
}) as any as S.Schema<UpdateChannelNamespaceRequest>;
export interface UpdateChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export const UpdateChannelNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ channelNamespace: S.optional(ChannelNamespace) }).pipe(ns),
).annotate({
  identifier: "UpdateChannelNamespaceResponse",
}) as any as S.Schema<UpdateChannelNamespaceResponse>;
export interface UpdateDataSourceRequest {
  apiId: string;
  name: string;
  description?: string;
  type: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export const UpdateDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    type: DataSourceType,
    serviceRoleArn: S.optional(S.String),
    dynamodbConfig: S.optional(DynamodbDataSourceConfig),
    lambdaConfig: S.optional(LambdaDataSourceConfig),
    elasticsearchConfig: S.optional(ElasticsearchDataSourceConfig),
    openSearchServiceConfig: S.optional(OpenSearchServiceDataSourceConfig),
    httpConfig: S.optional(HttpDataSourceConfig),
    relationalDatabaseConfig: S.optional(RelationalDatabaseDataSourceConfig),
    eventBridgeConfig: S.optional(EventBridgeDataSourceConfig),
    metricsConfig: S.optional(DataSourceLevelMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/datasources/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataSourceRequest",
}) as any as S.Schema<UpdateDataSourceRequest>;
export interface UpdateDataSourceResponse {
  dataSource?: DataSource;
}
export const UpdateDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSource: S.optional(DataSource) }).pipe(ns),
).annotate({
  identifier: "UpdateDataSourceResponse",
}) as any as S.Schema<UpdateDataSourceResponse>;
export interface UpdateDomainNameRequest {
  domainName: string;
  description?: string;
}
export const UpdateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/domainnames/{domainName}" }),
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
export interface UpdateDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export const UpdateDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainNameConfig: S.optional(DomainNameConfig) }).pipe(ns),
).annotate({
  identifier: "UpdateDomainNameResponse",
}) as any as S.Schema<UpdateDomainNameResponse>;
export interface UpdateFunctionRequest {
  apiId: string;
  name: string;
  description?: string;
  functionId: string;
  dataSourceName: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export const UpdateFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    description: S.optional(S.String),
    functionId: S.String.pipe(T.HttpLabel("functionId")),
    dataSourceName: S.String,
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    functionVersion: S.optional(S.String),
    syncConfig: S.optional(SyncConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/apis/{apiId}/functions/{functionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFunctionRequest",
}) as any as S.Schema<UpdateFunctionRequest>;
export interface UpdateFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export const UpdateFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionConfiguration: S.optional(FunctionConfiguration) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateFunctionResponse",
}) as any as S.Schema<UpdateFunctionResponse>;
export interface UpdateGraphqlApiRequest {
  apiId: string;
  name: string;
  logConfig?: LogConfig;
  authenticationType: AuthenticationType;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  mergedApiExecutionRoleArn?: string;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export const UpdateGraphqlApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    name: S.String,
    logConfig: S.optional(LogConfig),
    authenticationType: AuthenticationType,
    userPoolConfig: S.optional(UserPoolConfig),
    openIDConnectConfig: S.optional(OpenIDConnectConfig),
    additionalAuthenticationProviders: S.optional(
      AdditionalAuthenticationProviders,
    ),
    xrayEnabled: S.optional(S.Boolean),
    lambdaAuthorizerConfig: S.optional(LambdaAuthorizerConfig),
    mergedApiExecutionRoleArn: S.optional(S.String),
    ownerContact: S.optional(S.String),
    introspectionConfig: S.optional(GraphQLApiIntrospectionConfig),
    queryDepthLimit: S.optional(S.Number),
    resolverCountLimit: S.optional(S.Number),
    enhancedMetricsConfig: S.optional(EnhancedMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGraphqlApiRequest",
}) as any as S.Schema<UpdateGraphqlApiRequest>;
export interface UpdateGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export const UpdateGraphqlApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ graphqlApi: S.optional(GraphqlApi) }).pipe(ns),
).annotate({
  identifier: "UpdateGraphqlApiResponse",
}) as any as S.Schema<UpdateGraphqlApiResponse>;
export interface UpdateResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export const UpdateResolverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    fieldName: S.String.pipe(T.HttpLabel("fieldName")),
    dataSourceName: S.optional(S.String),
    requestMappingTemplate: S.optional(S.String),
    responseMappingTemplate: S.optional(S.String),
    kind: S.optional(ResolverKind),
    pipelineConfig: S.optional(PipelineConfig),
    syncConfig: S.optional(SyncConfig),
    cachingConfig: S.optional(CachingConfig),
    maxBatchSize: S.optional(S.Number),
    runtime: S.optional(AppSyncRuntime),
    code: S.optional(S.String),
    metricsConfig: S.optional(ResolverLevelMetricsConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResolverRequest",
}) as any as S.Schema<UpdateResolverRequest>;
export interface UpdateResolverResponse {
  resolver?: Resolver;
}
export const UpdateResolverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resolver: S.optional(Resolver) }).pipe(ns),
).annotate({
  identifier: "UpdateResolverResponse",
}) as any as S.Schema<UpdateResolverResponse>;
export interface UpdateSourceApiAssociationRequest {
  associationId: string;
  mergedApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export const UpdateSourceApiAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationId: S.String.pipe(T.HttpLabel("associationId")),
    mergedApiIdentifier: S.String.pipe(T.HttpLabel("mergedApiIdentifier")),
    description: S.optional(S.String),
    sourceApiAssociationConfig: S.optional(SourceApiAssociationConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSourceApiAssociationRequest",
}) as any as S.Schema<UpdateSourceApiAssociationRequest>;
export interface UpdateSourceApiAssociationResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export const UpdateSourceApiAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceApiAssociation: S.optional(SourceApiAssociation) }).pipe(ns),
).annotate({
  identifier: "UpdateSourceApiAssociationResponse",
}) as any as S.Schema<UpdateSourceApiAssociationResponse>;
export interface UpdateTypeRequest {
  apiId: string;
  typeName: string;
  definition?: string;
  format: TypeDefinitionFormat;
}
export const UpdateTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apiId: S.String.pipe(T.HttpLabel("apiId")),
    typeName: S.String.pipe(T.HttpLabel("typeName")),
    definition: S.optional(S.String),
    format: TypeDefinitionFormat,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/apis/{apiId}/types/{typeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTypeRequest",
}) as any as S.Schema<UpdateTypeRequest>;
export interface UpdateTypeResponse {
  type?: Type;
}
export const UpdateTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(Type) }).pipe(ns),
).annotate({
  identifier: "UpdateTypeResponse",
}) as any as S.Schema<UpdateTypeResponse>;
export type BadRequestReason = "CODE_ERROR" | (string & {});
export const BadRequestReason = /*@__PURE__*/ S.String;

export interface BadRequestDetail {
  codeErrors?: CodeError[];
}
export const BadRequestDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ codeErrors: S.optional(CodeErrors) }),
).annotate({
  identifier: "BadRequestDetail",
}) as any as S.Schema<BadRequestDetail>;
export type AssociateApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Maps an endpoint to your custom domain.
 */
export const associateApi: API.OperationMethod<
  AssociateApiRequest,
  AssociateApiResponse,
  AssociateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateApiRequest,
  output: AssociateApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApi",
}));

export type AssociateMergedGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an association between a Merged API and source API using the source API's
 * identifier.
 */
export const associateMergedGraphqlApi: API.OperationMethod<
  AssociateMergedGraphqlApiRequest,
  AssociateMergedGraphqlApiResponse,
  AssociateMergedGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateMergedGraphqlApiRequest,
  output: AssociateMergedGraphqlApiResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMergedGraphqlApi",
}));

export type AssociateSourceGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an association between a Merged API and source API using the Merged API's
 * identifier.
 */
export const associateSourceGraphqlApi: API.OperationMethod<
  AssociateSourceGraphqlApiRequest,
  AssociateSourceGraphqlApiResponse,
  AssociateSourceGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSourceGraphqlApiRequest,
  output: AssociateSourceGraphqlApiResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceGraphqlApi",
}));

export type CreateApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an `Api` object. Use this operation to create an AppSync
 * API with your preferred configuration, such as an Event API that provides real-time message
 * publishing and message subscriptions over WebSockets.
 */
export const createApi: API.OperationMethod<
  CreateApiRequest,
  CreateApiResponse,
  CreateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiRequest,
  output: CreateApiResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    ServiceQuotaExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApi",
}));

export type CreateApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a cache for the GraphQL API.
 */
export const createApiCache: API.OperationMethod<
  CreateApiCacheRequest,
  CreateApiCacheResponse,
  CreateApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiCacheRequest,
  output: CreateApiCacheResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiCache",
}));

export type CreateApiKeyError =
  | ApiKeyLimitExceededException
  | ApiKeyValidityOutOfBoundsException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a unique key that you can distribute to clients who invoke your API.
 */
export const createApiKey: API.OperationMethod<
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  CreateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiKeyRequest,
  output: CreateApiKeyResponse,
  errors: [
    ApiKeyLimitExceededException,
    ApiKeyValidityOutOfBoundsException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKey",
}));

export type CreateChannelNamespaceError =
  | BadRequestException
  | ConcurrentModificationException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `ChannelNamespace` for an `Api`.
 */
export const createChannelNamespace: API.OperationMethod<
  CreateChannelNamespaceRequest,
  CreateChannelNamespaceResponse,
  CreateChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelNamespaceRequest,
  output: CreateChannelNamespaceResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    ServiceQuotaExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelNamespace",
}));

export type CreateDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `DataSource` object.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceRequest,
  output: CreateDataSourceResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
}));

export type CreateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Creates a custom `DomainName` object.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  CreateDomainNameResponse,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainNameRequest,
  output: CreateDomainNameResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
}));

export type CreateFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Function` object.
 *
 * A function is a reusable entity. You can use multiple functions to compose the resolver
 * logic.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  CreateFunctionResponse,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFunctionRequest,
  output: CreateFunctionResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
}));

export type CreateGraphqlApiError =
  | ApiLimitExceededException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `GraphqlApi` object.
 */
export const createGraphqlApi: API.OperationMethod<
  CreateGraphqlApiRequest,
  CreateGraphqlApiResponse,
  CreateGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGraphqlApiRequest,
  output: CreateGraphqlApiResponse,
  errors: [
    ApiLimitExceededException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphqlApi",
}));

export type CreateResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Resolver` object.
 *
 * A resolver converts incoming requests into a format that a data source can understand,
 * and converts the data source's responses into GraphQL.
 */
export const createResolver: API.OperationMethod<
  CreateResolverRequest,
  CreateResolverResponse,
  CreateResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResolverRequest,
  output: CreateResolverResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResolver",
}));

export type CreateTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Type` object.
 */
export const createType: API.OperationMethod<
  CreateTypeRequest,
  CreateTypeResponse,
  CreateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTypeRequest,
  output: CreateTypeResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateType",
}));

export type DeleteApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an `Api` object
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  DeleteApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiRequest,
  output: DeleteApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApi",
}));

export type DeleteApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an `ApiCache` object.
 */
export const deleteApiCache: API.OperationMethod<
  DeleteApiCacheRequest,
  DeleteApiCacheResponse,
  DeleteApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiCacheRequest,
  output: DeleteApiCacheResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiCache",
}));

export type DeleteApiKeyError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an API key.
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
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKey",
}));

export type DeleteChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `ChannelNamespace`.
 */
export const deleteChannelNamespace: API.OperationMethod<
  DeleteChannelNamespaceRequest,
  DeleteChannelNamespaceResponse,
  DeleteChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelNamespaceRequest,
  output: DeleteChannelNamespaceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelNamespace",
}));

export type DeleteDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `DataSource` object.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataSourceRequest,
  output: DeleteDataSourceResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
}));

export type DeleteDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom `DomainName` object.
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
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
}));

export type DeleteFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Function`.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionRequest,
  output: DeleteFunctionResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
}));

export type DeleteGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `GraphqlApi` object.
 */
export const deleteGraphqlApi: API.OperationMethod<
  DeleteGraphqlApiRequest,
  DeleteGraphqlApiResponse,
  DeleteGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGraphqlApiRequest,
  output: DeleteGraphqlApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraphqlApi",
}));

export type DeleteResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Resolver` object.
 */
export const deleteResolver: API.OperationMethod<
  DeleteResolverRequest,
  DeleteResolverResponse,
  DeleteResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResolverRequest,
  output: DeleteResolverResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResolver",
}));

export type DeleteTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Type` object.
 */
export const deleteType: API.OperationMethod<
  DeleteTypeRequest,
  DeleteTypeResponse,
  DeleteTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTypeRequest,
  output: DeleteTypeResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteType",
}));

export type DisassociateApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Removes an `ApiAssociation` object from a custom domain.
 */
export const disassociateApi: API.OperationMethod<
  DisassociateApiRequest,
  DisassociateApiResponse,
  DisassociateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateApiRequest,
  output: DisassociateApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApi",
}));

export type DisassociateMergedGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an association between a Merged API and source API using the source API's
 * identifier and the association ID.
 */
export const disassociateMergedGraphqlApi: API.OperationMethod<
  DisassociateMergedGraphqlApiRequest,
  DisassociateMergedGraphqlApiResponse,
  DisassociateMergedGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMergedGraphqlApiRequest,
  output: DisassociateMergedGraphqlApiResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMergedGraphqlApi",
}));

export type DisassociateSourceGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an association between a Merged API and source API using the Merged API's
 * identifier and the association ID.
 */
export const disassociateSourceGraphqlApi: API.OperationMethod<
  DisassociateSourceGraphqlApiRequest,
  DisassociateSourceGraphqlApiResponse,
  DisassociateSourceGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSourceGraphqlApiRequest,
  output: DisassociateSourceGraphqlApiResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceGraphqlApi",
}));

export type EvaluateCodeError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Evaluates the given code and returns the response. The code definition requirements
 * depend on the specified runtime. For `APPSYNC_JS` runtimes, the code defines the
 * request and response functions. The request function takes the incoming request after a
 * GraphQL operation is parsed and converts it into a request configuration for the selected
 * data source operation. The response function interprets responses from the data source and
 * maps it to the shape of the GraphQL field output type.
 */
export const evaluateCode: API.OperationMethod<
  EvaluateCodeRequest,
  EvaluateCodeResponse,
  EvaluateCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EvaluateCodeRequest,
  output: EvaluateCodeResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateCode",
}));

export type EvaluateMappingTemplateError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Evaluates a given template and returns the response. The mapping template can be a
 * request or response template.
 *
 * Request templates take the incoming request after a GraphQL operation is parsed and
 * convert it into a request configuration for the selected data source operation. Response
 * templates interpret responses from the data source and map it to the shape of the GraphQL
 * field output type.
 *
 * Mapping templates are written in the Apache Velocity Template Language (VTL).
 */
export const evaluateMappingTemplate: API.OperationMethod<
  EvaluateMappingTemplateRequest,
  EvaluateMappingTemplateResponse,
  EvaluateMappingTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EvaluateMappingTemplateRequest,
  output: EvaluateMappingTemplateResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateMappingTemplate",
}));

export type FlushApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes an `ApiCache` object.
 */
export const flushApiCache: API.OperationMethod<
  FlushApiCacheRequest,
  FlushApiCacheResponse,
  FlushApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FlushApiCacheRequest,
  output: FlushApiCacheResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushApiCache",
}));

export type GetApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves an `Api` object.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  GetApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiRequest,
  output: GetApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApi",
}));

export type GetApiAssociationError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves an `ApiAssociation` object.
 */
export const getApiAssociation: API.OperationMethod<
  GetApiAssociationRequest,
  GetApiAssociationResponse,
  GetApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiAssociationRequest,
  output: GetApiAssociationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiAssociation",
}));

export type GetApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves an `ApiCache` object.
 */
export const getApiCache: API.OperationMethod<
  GetApiCacheRequest,
  GetApiCacheResponse,
  GetApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiCacheRequest,
  output: GetApiCacheResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiCache",
}));

export type GetChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the channel namespace for a specified `Api`.
 */
export const getChannelNamespace: API.OperationMethod<
  GetChannelNamespaceRequest,
  GetChannelNamespaceResponse,
  GetChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelNamespaceRequest,
  output: GetChannelNamespaceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelNamespace",
}));

export type GetDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `DataSource` object.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceRequest,
  output: GetDataSourceResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetDataSourceIntrospectionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves the record of an existing introspection. If the retrieval is successful, the
 * result of the instrospection will also be returned. If the retrieval fails the operation,
 * an error message will be returned instead.
 */
export const getDataSourceIntrospection: API.OperationMethod<
  GetDataSourceIntrospectionRequest,
  GetDataSourceIntrospectionResponse,
  GetDataSourceIntrospectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceIntrospectionRequest,
  output: GetDataSourceIntrospectionResponse,
  errors: [BadRequestException, InternalFailureException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSourceIntrospection",
}));

export type GetDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a custom `DomainName` object.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainNameRequest,
  output: GetDomainNameResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
}));

export type GetFunctionError =
  | ConcurrentModificationException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get a `Function`.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionRequest,
  output: GetFunctionResponse,
  errors: [
    ConcurrentModificationException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

export type GetGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `GraphqlApi` object.
 */
export const getGraphqlApi: API.OperationMethod<
  GetGraphqlApiRequest,
  GetGraphqlApiResponse,
  GetGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGraphqlApiRequest,
  output: GetGraphqlApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphqlApi",
}));

export type GetGraphqlApiEnvironmentVariablesError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the list of environmental variable key-value pairs associated with an API by
 * its ID value.
 */
export const getGraphqlApiEnvironmentVariables: API.OperationMethod<
  GetGraphqlApiEnvironmentVariablesRequest,
  GetGraphqlApiEnvironmentVariablesResponse,
  GetGraphqlApiEnvironmentVariablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGraphqlApiEnvironmentVariablesRequest,
  output: GetGraphqlApiEnvironmentVariablesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphqlApiEnvironmentVariables",
}));

export type GetIntrospectionSchemaError =
  | GraphQLSchemaException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the introspection schema for a GraphQL API.
 */
export const getIntrospectionSchema: API.OperationMethod<
  GetIntrospectionSchemaRequest,
  GetIntrospectionSchemaResponse,
  GetIntrospectionSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntrospectionSchemaRequest,
  output: GetIntrospectionSchemaResponse,
  errors: [
    GraphQLSchemaException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntrospectionSchema",
}));

export type GetResolverError =
  | ConcurrentModificationException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `Resolver` object.
 */
export const getResolver: API.OperationMethod<
  GetResolverRequest,
  GetResolverResponse,
  GetResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResolverRequest,
  output: GetResolverResponse,
  errors: [
    ConcurrentModificationException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolver",
}));

export type GetSchemaCreationStatusError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the current status of a schema creation operation.
 */
export const getSchemaCreationStatus: API.OperationMethod<
  GetSchemaCreationStatusRequest,
  GetSchemaCreationStatusResponse,
  GetSchemaCreationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaCreationStatusRequest,
  output: GetSchemaCreationStatusResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaCreationStatus",
}));

export type GetSourceApiAssociationError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `SourceApiAssociation` object.
 */
export const getSourceApiAssociation: API.OperationMethod<
  GetSourceApiAssociationRequest,
  GetSourceApiAssociationResponse,
  GetSourceApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSourceApiAssociationRequest,
  output: GetSourceApiAssociationResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceApiAssociation",
}));

export type GetTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `Type` object.
 */
export const getType: API.OperationMethod<
  GetTypeRequest,
  GetTypeResponse,
  GetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTypeRequest,
  output: GetTypeResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetType",
}));

export type ListApiKeysError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the API keys for a given API.
 *
 * API keys are deleted automatically 60 days after they expire. However, they may still
 * be included in the response until they have actually been deleted. You can safely call
 * `DeleteApiKey` to manually delete a key before it's automatically
 * deleted.
 */
export const listApiKeys: API.PaginatedOperationMethod<
  ListApiKeysRequest,
  ListApiKeysResponse,
  ListApiKeysError,
  Credentials | HttpClient.HttpClient,
  ApiKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApiKeysRequest,
  output: ListApiKeysResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiKeys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apiKeys",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApisError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the APIs in your AppSync account.
 *
 * `ListApis` returns only the high level API details. For more detailed
 * information about an API, use `GetApi`.
 */
export const listApis: API.PaginatedOperationMethod<
  ListApisRequest,
  ListApisResponse,
  ListApisError,
  Credentials | HttpClient.HttpClient,
  Api
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApisRequest,
  output: ListApisResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApis",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apis",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListChannelNamespacesError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the channel namespaces for a specified `Api`.
 *
 * `ListChannelNamespaces` returns only high level details for the channel
 * namespace. To retrieve code handlers, use `GetChannelNamespace`.
 */
export const listChannelNamespaces: API.PaginatedOperationMethod<
  ListChannelNamespacesRequest,
  ListChannelNamespacesResponse,
  ListChannelNamespacesError,
  Credentials | HttpClient.HttpClient,
  ChannelNamespace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelNamespacesRequest,
  output: ListChannelNamespacesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channelNamespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the data sources for a given API.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourcesRequest,
  output: ListDataSourcesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainNamesError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Lists multiple custom domain names.
 */
export const listDomainNames: API.PaginatedOperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient,
  DomainNameConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainNamesRequest,
  output: ListDomainNamesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domainNameConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFunctionsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * List multiple functions.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionsRequest,
  output: ListFunctionsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphqlApisError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your GraphQL APIs.
 */
export const listGraphqlApis: API.PaginatedOperationMethod<
  ListGraphqlApisRequest,
  ListGraphqlApisResponse,
  ListGraphqlApisError,
  Credentials | HttpClient.HttpClient,
  GraphqlApi
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGraphqlApisRequest,
  output: ListGraphqlApisResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphqlApis",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphqlApis",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolversError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the resolvers for a given API and type.
 */
export const listResolvers: API.PaginatedOperationMethod<
  ListResolversRequest,
  ListResolversResponse,
  ListResolversError,
  Credentials | HttpClient.HttpClient,
  Resolver
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResolversRequest,
  output: ListResolversResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolvers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolversByFunctionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the resolvers that are associated with a specific function.
 */
export const listResolversByFunction: API.PaginatedOperationMethod<
  ListResolversByFunctionRequest,
  ListResolversByFunctionResponse,
  ListResolversByFunctionError,
  Credentials | HttpClient.HttpClient,
  Resolver
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResolversByFunctionRequest,
  output: ListResolversByFunctionResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolversByFunction",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceApiAssociationsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the `SourceApiAssociationSummary` data.
 */
export const listSourceApiAssociations: API.PaginatedOperationMethod<
  ListSourceApiAssociationsRequest,
  ListSourceApiAssociationsResponse,
  ListSourceApiAssociationsError,
  Credentials | HttpClient.HttpClient,
  SourceApiAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceApiAssociationsRequest,
  output: ListSourceApiAssociationsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceApiAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceApiAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the tags for a resource.
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
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTypesError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the types for a given API.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesRequest,
  ListTypesResponse,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  Type
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypesRequest,
  output: ListTypesResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTypesByAssociationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists `Type` objects by the source API association ID.
 */
export const listTypesByAssociation: API.PaginatedOperationMethod<
  ListTypesByAssociationRequest,
  ListTypesByAssociationResponse,
  ListTypesByAssociationError,
  Credentials | HttpClient.HttpClient,
  Type
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypesByAssociationRequest,
  output: ListTypesByAssociationResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypesByAssociation",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutGraphqlApiEnvironmentVariablesError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a list of environmental variables in an API by its ID value.
 *
 * When creating an environmental variable, it must follow the constraints below:
 *
 * - Both JavaScript and VTL templates support environmental variables.
 *
 * - Environmental variables are not evaluated before function invocation.
 *
 * - Environmental variables only support string values.
 *
 * - Any defined value in an environmental variable is considered a string literal
 * and not expanded.
 *
 * - Variable evaluations should ideally be performed in the function
 * code.
 *
 * When creating an environmental variable key-value pair, it must follow the additional
 * constraints below:
 *
 * - Keys must begin with a letter.
 *
 * - Keys must be at least two characters long.
 *
 * - Keys can only contain letters, numbers, and the underscore character
 * (_).
 *
 * - Values can be up to 512 characters long.
 *
 * - You can configure up to 50 key-value pairs in a GraphQL API.
 *
 * You can create a list of environmental variables by adding it to the
 * `environmentVariables` payload as a list in the format
 * `{"key1":"value1","key2":"value2", …}`. Note that each call of the
 * `PutGraphqlApiEnvironmentVariables` action will result in the overwriting of
 * the existing environmental variable list of that API. This means the existing environmental
 * variables will be lost. To avoid this, you must include all existing and new environmental
 * variables in the list each time you call this action.
 */
export const putGraphqlApiEnvironmentVariables: API.OperationMethod<
  PutGraphqlApiEnvironmentVariablesRequest,
  PutGraphqlApiEnvironmentVariablesResponse,
  PutGraphqlApiEnvironmentVariablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGraphqlApiEnvironmentVariablesRequest,
  output: PutGraphqlApiEnvironmentVariablesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGraphqlApiEnvironmentVariables",
}));

export type StartDataSourceIntrospectionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new introspection. Returns the `introspectionId` of the new
 * introspection after its creation.
 */
export const startDataSourceIntrospection: API.OperationMethod<
  StartDataSourceIntrospectionRequest,
  StartDataSourceIntrospectionResponse,
  StartDataSourceIntrospectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataSourceIntrospectionRequest,
  output: StartDataSourceIntrospectionResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataSourceIntrospection",
}));

export type StartSchemaCreationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new schema to your GraphQL API.
 *
 * This operation is asynchronous. Use to
 * determine when it has completed.
 */
export const startSchemaCreation: API.OperationMethod<
  StartSchemaCreationRequest,
  StartSchemaCreationResponse,
  StartSchemaCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSchemaCreationRequest,
  output: StartSchemaCreationResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSchemaCreation",
}));

export type StartSchemaMergeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Initiates a merge operation. Returns a status that shows the result of the merge
 * operation.
 */
export const startSchemaMerge: API.OperationMethod<
  StartSchemaMergeRequest,
  StartSchemaMergeResponse,
  StartSchemaMergeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSchemaMergeRequest,
  output: StartSchemaMergeResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSchemaMerge",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tags a resource with user-supplied tags.
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
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Untags a resource.
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
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an `Api`.
 */
export const updateApi: API.OperationMethod<
  UpdateApiRequest,
  UpdateApiResponse,
  UpdateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiRequest,
  output: UpdateApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApi",
}));

export type UpdateApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the cache for the GraphQL API.
 */
export const updateApiCache: API.OperationMethod<
  UpdateApiCacheRequest,
  UpdateApiCacheResponse,
  UpdateApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiCacheRequest,
  output: UpdateApiCacheResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiCache",
}));

export type UpdateApiKeyError =
  | ApiKeyValidityOutOfBoundsException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an API key. You can update the key as long as it's not deleted.
 */
export const updateApiKey: API.OperationMethod<
  UpdateApiKeyRequest,
  UpdateApiKeyResponse,
  UpdateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiKeyRequest,
  output: UpdateApiKeyResponse,
  errors: [
    ApiKeyValidityOutOfBoundsException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKey",
}));

export type UpdateChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `ChannelNamespace` associated with an `Api`.
 */
export const updateChannelNamespace: API.OperationMethod<
  UpdateChannelNamespaceRequest,
  UpdateChannelNamespaceResponse,
  UpdateChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelNamespaceRequest,
  output: UpdateChannelNamespaceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelNamespace",
}));

export type UpdateDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `DataSource` object.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataSourceRequest,
  output: UpdateDataSourceResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
}));

export type UpdateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Updates a custom `DomainName` object.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  UpdateDomainNameResponse,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainNameRequest,
  output: UpdateDomainNameResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
}));

export type UpdateFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Function` object.
 */
export const updateFunction: API.OperationMethod<
  UpdateFunctionRequest,
  UpdateFunctionResponse,
  UpdateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionRequest,
  output: UpdateFunctionResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunction",
}));

export type UpdateGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `GraphqlApi` object.
 */
export const updateGraphqlApi: API.OperationMethod<
  UpdateGraphqlApiRequest,
  UpdateGraphqlApiResponse,
  UpdateGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGraphqlApiRequest,
  output: UpdateGraphqlApiResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGraphqlApi",
}));

export type UpdateResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Resolver` object.
 */
export const updateResolver: API.OperationMethod<
  UpdateResolverRequest,
  UpdateResolverResponse,
  UpdateResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResolverRequest,
  output: UpdateResolverResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolver",
}));

export type UpdateSourceApiAssociationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates some of the configuration choices of a particular source API association.
 */
export const updateSourceApiAssociation: API.OperationMethod<
  UpdateSourceApiAssociationRequest,
  UpdateSourceApiAssociationResponse,
  UpdateSourceApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSourceApiAssociationRequest,
  output: UpdateSourceApiAssociationResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceApiAssociation",
}));

export type UpdateTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Type` object.
 */
export const updateType: API.OperationMethod<
  UpdateTypeRequest,
  UpdateTypeResponse,
  UpdateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTypeRequest,
  output: UpdateTypeResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateType",
}));
