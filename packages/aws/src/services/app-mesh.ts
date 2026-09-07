import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "App Mesh", serviceShapeName: "AppMesh" });
const auth = T.AwsAuthSigv4({ name: "appmesh" });
const ver = T.ServiceVersion("2019-01-25");
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
              `https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appmesh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://appmesh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(503), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type GatewayRoutePriority = number;
export type HttpPathExact = string;
export type HttpPathRegex = string;
export interface HttpPathMatch {
  exact?: string;
  regex?: string;
}
export const HttpPathMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exact: S.optional(S.String), regex: S.optional(S.String) }),
).annotate({ identifier: "HttpPathMatch" }) as any as S.Schema<HttpPathMatch>;
export type QueryParameterName = string;
export interface QueryParameterMatch {
  exact?: string;
}
export const QueryParameterMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exact: S.optional(S.String) }),
).annotate({
  identifier: "QueryParameterMatch",
}) as any as S.Schema<QueryParameterMatch>;
export interface HttpQueryParameter {
  name: string;
  match?: QueryParameterMatch;
}
export const HttpQueryParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, match: S.optional(QueryParameterMatch) }),
).annotate({
  identifier: "HttpQueryParameter",
}) as any as S.Schema<HttpQueryParameter>;
export type HttpQueryParameters = HttpQueryParameter[];
export const HttpQueryParameters = /*@__PURE__*/ S.Array(HttpQueryParameter);
export type HttpMethod = string;
export type ExactHostName = string;
export type SuffixHostname = string;
export interface GatewayRouteHostnameMatch {
  exact?: string;
  suffix?: string;
}
export const GatewayRouteHostnameMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exact: S.optional(S.String), suffix: S.optional(S.String) }),
).annotate({
  identifier: "GatewayRouteHostnameMatch",
}) as any as S.Schema<GatewayRouteHostnameMatch>;
export type HeaderName = string;
export type HeaderMatch = string;
export interface MatchRange {
  start: number;
  end: number;
}
export const MatchRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ start: S.Number, end: S.Number }),
).annotate({ identifier: "MatchRange" }) as any as S.Schema<MatchRange>;
export type HeaderMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export const HeaderMatchMethod = /*@__PURE__*/ S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface HttpGatewayRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export const HttpGatewayRouteHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(HeaderMatchMethod),
  }),
).annotate({
  identifier: "HttpGatewayRouteHeader",
}) as any as S.Schema<HttpGatewayRouteHeader>;
export type HttpGatewayRouteHeaders = HttpGatewayRouteHeader[];
export const HttpGatewayRouteHeaders = /*@__PURE__*/ S.Array(
  HttpGatewayRouteHeader,
);
export type ListenerPort = number;
export interface HttpGatewayRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  hostname?: GatewayRouteHostnameMatch;
  headers?: HttpGatewayRouteHeader[];
  port?: number;
}
export const HttpGatewayRouteMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prefix: S.optional(S.String),
    path: S.optional(HttpPathMatch),
    queryParameters: S.optional(HttpQueryParameters),
    method: S.optional(S.String),
    hostname: S.optional(GatewayRouteHostnameMatch),
    headers: S.optional(HttpGatewayRouteHeaders),
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "HttpGatewayRouteMatch",
}) as any as S.Schema<HttpGatewayRouteMatch>;
export interface GatewayRouteVirtualService {
  virtualServiceName: string;
}
export const GatewayRouteVirtualService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualServiceName: S.String }),
).annotate({
  identifier: "GatewayRouteVirtualService",
}) as any as S.Schema<GatewayRouteVirtualService>;
export interface GatewayRouteTarget {
  virtualService: GatewayRouteVirtualService;
  port?: number;
}
export const GatewayRouteTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualService: GatewayRouteVirtualService,
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "GatewayRouteTarget",
}) as any as S.Schema<GatewayRouteTarget>;
export type DefaultGatewayRouteRewrite = string;
export type HttpGatewayRoutePrefix = string;
export interface HttpGatewayRoutePrefixRewrite {
  defaultPrefix?: string;
  value?: string;
}
export const HttpGatewayRoutePrefixRewrite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultPrefix: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "HttpGatewayRoutePrefixRewrite",
}) as any as S.Schema<HttpGatewayRoutePrefixRewrite>;
export interface HttpGatewayRoutePathRewrite {
  exact?: string;
}
export const HttpGatewayRoutePathRewrite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exact: S.optional(S.String) }),
).annotate({
  identifier: "HttpGatewayRoutePathRewrite",
}) as any as S.Schema<HttpGatewayRoutePathRewrite>;
export interface GatewayRouteHostnameRewrite {
  defaultTargetHostname?: string;
}
export const GatewayRouteHostnameRewrite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ defaultTargetHostname: S.optional(S.String) }),
).annotate({
  identifier: "GatewayRouteHostnameRewrite",
}) as any as S.Schema<GatewayRouteHostnameRewrite>;
export interface HttpGatewayRouteRewrite {
  prefix?: HttpGatewayRoutePrefixRewrite;
  path?: HttpGatewayRoutePathRewrite;
  hostname?: GatewayRouteHostnameRewrite;
}
export const HttpGatewayRouteRewrite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prefix: S.optional(HttpGatewayRoutePrefixRewrite),
    path: S.optional(HttpGatewayRoutePathRewrite),
    hostname: S.optional(GatewayRouteHostnameRewrite),
  }),
).annotate({
  identifier: "HttpGatewayRouteRewrite",
}) as any as S.Schema<HttpGatewayRouteRewrite>;
export interface HttpGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: HttpGatewayRouteRewrite;
}
export const HttpGatewayRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    target: GatewayRouteTarget,
    rewrite: S.optional(HttpGatewayRouteRewrite),
  }),
).annotate({
  identifier: "HttpGatewayRouteAction",
}) as any as S.Schema<HttpGatewayRouteAction>;
export interface HttpGatewayRoute {
  match: HttpGatewayRouteMatch;
  action: HttpGatewayRouteAction;
}
export const HttpGatewayRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ match: HttpGatewayRouteMatch, action: HttpGatewayRouteAction }),
).annotate({
  identifier: "HttpGatewayRoute",
}) as any as S.Schema<HttpGatewayRoute>;
export type ServiceName = string;
export type GrpcMetadataMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export const GrpcMetadataMatchMethod = /*@__PURE__*/ S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface GrpcGatewayRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcMetadataMatchMethod;
}
export const GrpcGatewayRouteMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(GrpcMetadataMatchMethod),
  }),
).annotate({
  identifier: "GrpcGatewayRouteMetadata",
}) as any as S.Schema<GrpcGatewayRouteMetadata>;
export type GrpcGatewayRouteMetadataList = GrpcGatewayRouteMetadata[];
export const GrpcGatewayRouteMetadataList = /*@__PURE__*/ S.Array(
  GrpcGatewayRouteMetadata,
);
export interface GrpcGatewayRouteMatch {
  serviceName?: string;
  hostname?: GatewayRouteHostnameMatch;
  metadata?: GrpcGatewayRouteMetadata[];
  port?: number;
}
export const GrpcGatewayRouteMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    hostname: S.optional(GatewayRouteHostnameMatch),
    metadata: S.optional(GrpcGatewayRouteMetadataList),
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "GrpcGatewayRouteMatch",
}) as any as S.Schema<GrpcGatewayRouteMatch>;
export interface GrpcGatewayRouteRewrite {
  hostname?: GatewayRouteHostnameRewrite;
}
export const GrpcGatewayRouteRewrite = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ hostname: S.optional(GatewayRouteHostnameRewrite) }),
).annotate({
  identifier: "GrpcGatewayRouteRewrite",
}) as any as S.Schema<GrpcGatewayRouteRewrite>;
export interface GrpcGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: GrpcGatewayRouteRewrite;
}
export const GrpcGatewayRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    target: GatewayRouteTarget,
    rewrite: S.optional(GrpcGatewayRouteRewrite),
  }),
).annotate({
  identifier: "GrpcGatewayRouteAction",
}) as any as S.Schema<GrpcGatewayRouteAction>;
export interface GrpcGatewayRoute {
  match: GrpcGatewayRouteMatch;
  action: GrpcGatewayRouteAction;
}
export const GrpcGatewayRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ match: GrpcGatewayRouteMatch, action: GrpcGatewayRouteAction }),
).annotate({
  identifier: "GrpcGatewayRoute",
}) as any as S.Schema<GrpcGatewayRoute>;
export interface GatewayRouteSpec {
  priority?: number;
  httpRoute?: HttpGatewayRoute;
  http2Route?: HttpGatewayRoute;
  grpcRoute?: GrpcGatewayRoute;
}
export const GatewayRouteSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    priority: S.optional(S.Number),
    httpRoute: S.optional(HttpGatewayRoute),
    http2Route: S.optional(HttpGatewayRoute),
    grpcRoute: S.optional(GrpcGatewayRoute),
  }),
).annotate({
  identifier: "GatewayRouteSpec",
}) as any as S.Schema<GatewayRouteSpec>;
export type TagKey = string;
export type TagValue = string;
export interface TagRef {
  key: string;
  value: string;
}
export const TagRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "TagRef" }) as any as S.Schema<TagRef>;
export type TagList = TagRef[];
export const TagList = /*@__PURE__*/ S.Array(TagRef);
export type AccountId = string;
export interface CreateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateGatewayRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    spec: GatewayRouteSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayRouteInput",
}) as any as S.Schema<CreateGatewayRouteInput>;
export type Arn = string;
export interface ResourceMetadata {
  arn: string;
  version: number;
  uid: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  meshOwner: string;
  resourceOwner: string;
}
export const ResourceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    version: S.Number,
    uid: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    meshOwner: S.String,
    resourceOwner: S.String,
  }),
).annotate({
  identifier: "ResourceMetadata",
}) as any as S.Schema<ResourceMetadata>;
export type GatewayRouteStatusCode = string;
export interface GatewayRouteStatus {
  status: string;
}
export const GatewayRouteStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "GatewayRouteStatus",
}) as any as S.Schema<GatewayRouteStatus>;
export interface GatewayRouteData {
  meshName: string;
  gatewayRouteName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  metadata: ResourceMetadata;
  status: GatewayRouteStatus;
}
export const GatewayRouteData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    gatewayRouteName: S.String,
    virtualGatewayName: S.String,
    spec: GatewayRouteSpec,
    metadata: ResourceMetadata,
    status: GatewayRouteStatus,
  }),
).annotate({
  identifier: "GatewayRouteData",
}) as any as S.Schema<GatewayRouteData>;
export interface CreateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const CreateGatewayRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "CreateGatewayRouteOutput",
}) as any as S.Schema<CreateGatewayRouteOutput>;
export type EgressFilterType = string;
export interface EgressFilter {
  type: string;
}
export const EgressFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String }),
).annotate({ identifier: "EgressFilter" }) as any as S.Schema<EgressFilter>;
export type IpPreference = string;
export interface MeshServiceDiscovery {
  ipPreference?: string;
}
export const MeshServiceDiscovery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipPreference: S.optional(S.String) }),
).annotate({
  identifier: "MeshServiceDiscovery",
}) as any as S.Schema<MeshServiceDiscovery>;
export interface MeshSpec {
  egressFilter?: EgressFilter;
  serviceDiscovery?: MeshServiceDiscovery;
}
export const MeshSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    egressFilter: S.optional(EgressFilter),
    serviceDiscovery: S.optional(MeshServiceDiscovery),
  }),
).annotate({ identifier: "MeshSpec" }) as any as S.Schema<MeshSpec>;
export interface CreateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  tags?: TagRef[];
  clientToken?: string;
}
export const CreateMeshInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    spec: S.optional(MeshSpec),
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/meshes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMeshInput",
}) as any as S.Schema<CreateMeshInput>;
export type MeshStatusCode = string;
export interface MeshStatus {
  status?: string;
}
export const MeshStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({ identifier: "MeshStatus" }) as any as S.Schema<MeshStatus>;
export interface MeshData {
  meshName: string;
  spec: MeshSpec;
  metadata: ResourceMetadata;
  status: MeshStatus;
}
export const MeshData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    spec: MeshSpec,
    metadata: ResourceMetadata,
    status: MeshStatus,
  }),
).annotate({ identifier: "MeshData" }) as any as S.Schema<MeshData>;
export interface CreateMeshOutput {
  mesh: MeshData;
}
export const CreateMeshOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "CreateMeshOutput",
}) as any as S.Schema<CreateMeshOutput>;
export type RoutePriority = number;
export type HttpScheme = string;
export interface HttpRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export const HttpRouteHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(HeaderMatchMethod),
  }),
).annotate({
  identifier: "HttpRouteHeader",
}) as any as S.Schema<HttpRouteHeader>;
export type HttpRouteHeaders = HttpRouteHeader[];
export const HttpRouteHeaders = /*@__PURE__*/ S.Array(HttpRouteHeader);
export interface HttpRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  scheme?: string;
  headers?: HttpRouteHeader[];
  port?: number;
}
export const HttpRouteMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prefix: S.optional(S.String),
    path: S.optional(HttpPathMatch),
    queryParameters: S.optional(HttpQueryParameters),
    method: S.optional(S.String),
    scheme: S.optional(S.String),
    headers: S.optional(HttpRouteHeaders),
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "HttpRouteMatch" }) as any as S.Schema<HttpRouteMatch>;
export type PercentInt = number;
export interface WeightedTarget {
  virtualNode: string;
  weight: number;
  port?: number;
}
export const WeightedTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNode: S.String,
    weight: S.Number,
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "WeightedTarget" }) as any as S.Schema<WeightedTarget>;
export type WeightedTargets = WeightedTarget[];
export const WeightedTargets = /*@__PURE__*/ S.Array(WeightedTarget);
export interface HttpRouteAction {
  weightedTargets: WeightedTarget[];
}
export const HttpRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({
  identifier: "HttpRouteAction",
}) as any as S.Schema<HttpRouteAction>;
export type DurationValue = number;
export type DurationUnit = string;
export interface Duration {
  value?: number;
  unit?: string;
}
export const Duration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.Number), unit: S.optional(S.String) }),
).annotate({ identifier: "Duration" }) as any as S.Schema<Duration>;
export type MaxRetries = number;
export type HttpRetryPolicyEvent = string;
export type HttpRetryPolicyEvents = string[];
export const HttpRetryPolicyEvents = /*@__PURE__*/ S.Array(S.String);
export type TcpRetryPolicyEvent = string;
export type TcpRetryPolicyEvents = string[];
export const TcpRetryPolicyEvents = /*@__PURE__*/ S.Array(S.String);
export interface HttpRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
}
export const HttpRetryPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    perRetryTimeout: Duration,
    maxRetries: S.Number,
    httpRetryEvents: S.optional(HttpRetryPolicyEvents),
    tcpRetryEvents: S.optional(TcpRetryPolicyEvents),
  }),
).annotate({
  identifier: "HttpRetryPolicy",
}) as any as S.Schema<HttpRetryPolicy>;
export interface HttpTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export const HttpTimeout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ perRequest: S.optional(Duration), idle: S.optional(Duration) }),
).annotate({ identifier: "HttpTimeout" }) as any as S.Schema<HttpTimeout>;
export interface HttpRoute {
  match: HttpRouteMatch;
  action: HttpRouteAction;
  retryPolicy?: HttpRetryPolicy;
  timeout?: HttpTimeout;
}
export const HttpRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: HttpRouteMatch,
    action: HttpRouteAction,
    retryPolicy: S.optional(HttpRetryPolicy),
    timeout: S.optional(HttpTimeout),
  }),
).annotate({ identifier: "HttpRoute" }) as any as S.Schema<HttpRoute>;
export interface TcpRouteAction {
  weightedTargets: WeightedTarget[];
}
export const TcpRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({ identifier: "TcpRouteAction" }) as any as S.Schema<TcpRouteAction>;
export interface TcpTimeout {
  idle?: Duration;
}
export const TcpTimeout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idle: S.optional(Duration) }),
).annotate({ identifier: "TcpTimeout" }) as any as S.Schema<TcpTimeout>;
export interface TcpRouteMatch {
  port?: number;
}
export const TcpRouteMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ port: S.optional(S.Number) }),
).annotate({ identifier: "TcpRouteMatch" }) as any as S.Schema<TcpRouteMatch>;
export interface TcpRoute {
  action: TcpRouteAction;
  timeout?: TcpTimeout;
  match?: TcpRouteMatch;
}
export const TcpRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: TcpRouteAction,
    timeout: S.optional(TcpTimeout),
    match: S.optional(TcpRouteMatch),
  }),
).annotate({ identifier: "TcpRoute" }) as any as S.Schema<TcpRoute>;
export interface GrpcRouteAction {
  weightedTargets: WeightedTarget[];
}
export const GrpcRouteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({
  identifier: "GrpcRouteAction",
}) as any as S.Schema<GrpcRouteAction>;
export type MethodName = string;
export type GrpcRouteMetadataMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export const GrpcRouteMetadataMatchMethod = /*@__PURE__*/ S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface GrpcRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcRouteMetadataMatchMethod;
}
export const GrpcRouteMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(GrpcRouteMetadataMatchMethod),
  }),
).annotate({
  identifier: "GrpcRouteMetadata",
}) as any as S.Schema<GrpcRouteMetadata>;
export type GrpcRouteMetadataList = GrpcRouteMetadata[];
export const GrpcRouteMetadataList = /*@__PURE__*/ S.Array(GrpcRouteMetadata);
export interface GrpcRouteMatch {
  serviceName?: string;
  methodName?: string;
  metadata?: GrpcRouteMetadata[];
  port?: number;
}
export const GrpcRouteMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    methodName: S.optional(S.String),
    metadata: S.optional(GrpcRouteMetadataList),
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "GrpcRouteMatch" }) as any as S.Schema<GrpcRouteMatch>;
export type GrpcRetryPolicyEvent = string;
export type GrpcRetryPolicyEvents = string[];
export const GrpcRetryPolicyEvents = /*@__PURE__*/ S.Array(S.String);
export interface GrpcRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
  grpcRetryEvents?: string[];
}
export const GrpcRetryPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    perRetryTimeout: Duration,
    maxRetries: S.Number,
    httpRetryEvents: S.optional(HttpRetryPolicyEvents),
    tcpRetryEvents: S.optional(TcpRetryPolicyEvents),
    grpcRetryEvents: S.optional(GrpcRetryPolicyEvents),
  }),
).annotate({
  identifier: "GrpcRetryPolicy",
}) as any as S.Schema<GrpcRetryPolicy>;
export interface GrpcTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export const GrpcTimeout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ perRequest: S.optional(Duration), idle: S.optional(Duration) }),
).annotate({ identifier: "GrpcTimeout" }) as any as S.Schema<GrpcTimeout>;
export interface GrpcRoute {
  action: GrpcRouteAction;
  match: GrpcRouteMatch;
  retryPolicy?: GrpcRetryPolicy;
  timeout?: GrpcTimeout;
}
export const GrpcRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: GrpcRouteAction,
    match: GrpcRouteMatch,
    retryPolicy: S.optional(GrpcRetryPolicy),
    timeout: S.optional(GrpcTimeout),
  }),
).annotate({ identifier: "GrpcRoute" }) as any as S.Schema<GrpcRoute>;
export interface RouteSpec {
  priority?: number;
  httpRoute?: HttpRoute;
  tcpRoute?: TcpRoute;
  http2Route?: HttpRoute;
  grpcRoute?: GrpcRoute;
}
export const RouteSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    priority: S.optional(S.Number),
    httpRoute: S.optional(HttpRoute),
    tcpRoute: S.optional(TcpRoute),
    http2Route: S.optional(HttpRoute),
    grpcRoute: S.optional(GrpcRoute),
  }),
).annotate({ identifier: "RouteSpec" }) as any as S.Schema<RouteSpec>;
export interface CreateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    routeName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    spec: RouteSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRouteInput",
}) as any as S.Schema<CreateRouteInput>;
export type RouteStatusCode = string;
export interface RouteStatus {
  status: string;
}
export const RouteStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({ identifier: "RouteStatus" }) as any as S.Schema<RouteStatus>;
export interface RouteData {
  meshName: string;
  virtualRouterName: string;
  routeName: string;
  spec: RouteSpec;
  metadata: ResourceMetadata;
  status: RouteStatus;
}
export const RouteData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    routeName: S.String,
    spec: RouteSpec,
    metadata: ResourceMetadata,
    status: RouteStatus,
  }),
).annotate({ identifier: "RouteData" }) as any as S.Schema<RouteData>;
export interface CreateRouteOutput {
  route: RouteData;
}
export const CreateRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "CreateRouteOutput",
}) as any as S.Schema<CreateRouteOutput>;
export type PortNumber = number;
export type PortSet = number[];
export const PortSet = /*@__PURE__*/ S.Array(S.Number);
export type FilePath = string;
export interface VirtualGatewayListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export const VirtualGatewayListenerTlsFileCertificate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ certificateChain: S.String, privateKey: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsFileCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsFileCertificate>;
export type VirtualGatewaySdsSecretName = string;
export interface VirtualGatewayListenerTlsSdsCertificate {
  secretName: string;
}
export const VirtualGatewayListenerTlsSdsCertificate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ secretName: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsSdsCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsSdsCertificate>;
export type VirtualGatewayClientTlsCertificate =
  | { file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export const VirtualGatewayClientTlsCertificate = /*@__PURE__*/ S.Union([
  S.Struct({ file: VirtualGatewayListenerTlsFileCertificate }),
  S.Struct({ sds: VirtualGatewayListenerTlsSdsCertificate }),
]);
export type VirtualGatewayCertificateAuthorityArns = string[];
export const VirtualGatewayCertificateAuthorityArns = /*@__PURE__*/ S.Array(
  S.String,
);
export interface VirtualGatewayTlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export const VirtualGatewayTlsValidationContextAcmTrust =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      certificateAuthorityArns: VirtualGatewayCertificateAuthorityArns,
    }),
  ).annotate({
    identifier: "VirtualGatewayTlsValidationContextAcmTrust",
  }) as any as S.Schema<VirtualGatewayTlsValidationContextAcmTrust>;
export interface VirtualGatewayTlsValidationContextFileTrust {
  certificateChain: string;
}
export const VirtualGatewayTlsValidationContextFileTrust =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ certificateChain: S.String }),
  ).annotate({
    identifier: "VirtualGatewayTlsValidationContextFileTrust",
  }) as any as S.Schema<VirtualGatewayTlsValidationContextFileTrust>;
export interface VirtualGatewayTlsValidationContextSdsTrust {
  secretName: string;
}
export const VirtualGatewayTlsValidationContextSdsTrust =
  /*@__PURE__*/ S.suspend(() => S.Struct({ secretName: S.String })).annotate({
    identifier: "VirtualGatewayTlsValidationContextSdsTrust",
  }) as any as S.Schema<VirtualGatewayTlsValidationContextSdsTrust>;
export type VirtualGatewayTlsValidationContextTrust =
  | {
      acm: VirtualGatewayTlsValidationContextAcmTrust;
      file?: never;
      sds?: never;
    }
  | {
      acm?: never;
      file: VirtualGatewayTlsValidationContextFileTrust;
      sds?: never;
    }
  | {
      acm?: never;
      file?: never;
      sds: VirtualGatewayTlsValidationContextSdsTrust;
    };
export const VirtualGatewayTlsValidationContextTrust = /*@__PURE__*/ S.Union([
  S.Struct({ acm: VirtualGatewayTlsValidationContextAcmTrust }),
  S.Struct({ file: VirtualGatewayTlsValidationContextFileTrust }),
  S.Struct({ sds: VirtualGatewayTlsValidationContextSdsTrust }),
]);
export type SubjectAlternativeName = string;
export type SubjectAlternativeNameList = string[];
export const SubjectAlternativeNameList = /*@__PURE__*/ S.Array(S.String);
export interface SubjectAlternativeNameMatchers {
  exact: string[];
}
export const SubjectAlternativeNameMatchers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exact: SubjectAlternativeNameList }),
).annotate({
  identifier: "SubjectAlternativeNameMatchers",
}) as any as S.Schema<SubjectAlternativeNameMatchers>;
export interface SubjectAlternativeNames {
  match: SubjectAlternativeNameMatchers;
}
export const SubjectAlternativeNames = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ match: SubjectAlternativeNameMatchers }),
).annotate({
  identifier: "SubjectAlternativeNames",
}) as any as S.Schema<SubjectAlternativeNames>;
export interface VirtualGatewayTlsValidationContext {
  trust: VirtualGatewayTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const VirtualGatewayTlsValidationContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trust: VirtualGatewayTlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "VirtualGatewayTlsValidationContext",
}) as any as S.Schema<VirtualGatewayTlsValidationContext>;
export interface VirtualGatewayClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: VirtualGatewayClientTlsCertificate;
  validation: VirtualGatewayTlsValidationContext;
}
export const VirtualGatewayClientPolicyTls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enforce: S.optional(S.Boolean),
    ports: S.optional(PortSet),
    certificate: S.optional(VirtualGatewayClientTlsCertificate),
    validation: VirtualGatewayTlsValidationContext,
  }),
).annotate({
  identifier: "VirtualGatewayClientPolicyTls",
}) as any as S.Schema<VirtualGatewayClientPolicyTls>;
export interface VirtualGatewayClientPolicy {
  tls?: VirtualGatewayClientPolicyTls;
}
export const VirtualGatewayClientPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tls: S.optional(VirtualGatewayClientPolicyTls) }),
).annotate({
  identifier: "VirtualGatewayClientPolicy",
}) as any as S.Schema<VirtualGatewayClientPolicy>;
export interface VirtualGatewayBackendDefaults {
  clientPolicy?: VirtualGatewayClientPolicy;
}
export const VirtualGatewayBackendDefaults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientPolicy: S.optional(VirtualGatewayClientPolicy) }),
).annotate({
  identifier: "VirtualGatewayBackendDefaults",
}) as any as S.Schema<VirtualGatewayBackendDefaults>;
export type VirtualGatewayHealthCheckTimeoutMillis = number;
export type VirtualGatewayHealthCheckIntervalMillis = number;
export type VirtualGatewayPortProtocol = string;
export type VirtualGatewayHealthCheckThreshold = number;
export interface VirtualGatewayHealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export const VirtualGatewayHealthCheckPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMillis: S.Number,
    intervalMillis: S.Number,
    protocol: S.String,
    port: S.optional(S.Number),
    path: S.optional(S.String),
    healthyThreshold: S.Number,
    unhealthyThreshold: S.Number,
  }),
).annotate({
  identifier: "VirtualGatewayHealthCheckPolicy",
}) as any as S.Schema<VirtualGatewayHealthCheckPolicy>;
export interface VirtualGatewayPortMapping {
  port: number;
  protocol: string;
}
export const VirtualGatewayPortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ port: S.Number, protocol: S.String }),
).annotate({
  identifier: "VirtualGatewayPortMapping",
}) as any as S.Schema<VirtualGatewayPortMapping>;
export type VirtualGatewayListenerTlsMode = string;
export type VirtualGatewayListenerTlsValidationContextTrust =
  | { file: VirtualGatewayTlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: VirtualGatewayTlsValidationContextSdsTrust };
export const VirtualGatewayListenerTlsValidationContextTrust =
  /*@__PURE__*/ S.Union([
    S.Struct({ file: VirtualGatewayTlsValidationContextFileTrust }),
    S.Struct({ sds: VirtualGatewayTlsValidationContextSdsTrust }),
  ]);
export interface VirtualGatewayListenerTlsValidationContext {
  trust: VirtualGatewayListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const VirtualGatewayListenerTlsValidationContext =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      trust: VirtualGatewayListenerTlsValidationContextTrust,
      subjectAlternativeNames: S.optional(SubjectAlternativeNames),
    }),
  ).annotate({
    identifier: "VirtualGatewayListenerTlsValidationContext",
  }) as any as S.Schema<VirtualGatewayListenerTlsValidationContext>;
export interface VirtualGatewayListenerTlsAcmCertificate {
  certificateArn: string;
}
export const VirtualGatewayListenerTlsAcmCertificate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ certificateArn: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsAcmCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsAcmCertificate>;
export type VirtualGatewayListenerTlsCertificate =
  | { acm: VirtualGatewayListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export const VirtualGatewayListenerTlsCertificate = /*@__PURE__*/ S.Union([
  S.Struct({ acm: VirtualGatewayListenerTlsAcmCertificate }),
  S.Struct({ file: VirtualGatewayListenerTlsFileCertificate }),
  S.Struct({ sds: VirtualGatewayListenerTlsSdsCertificate }),
]);
export interface VirtualGatewayListenerTls {
  mode: string;
  validation?: VirtualGatewayListenerTlsValidationContext;
  certificate: VirtualGatewayListenerTlsCertificate;
}
export const VirtualGatewayListenerTls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: S.String,
    validation: S.optional(VirtualGatewayListenerTlsValidationContext),
    certificate: VirtualGatewayListenerTlsCertificate,
  }),
).annotate({
  identifier: "VirtualGatewayListenerTls",
}) as any as S.Schema<VirtualGatewayListenerTls>;
export type MaxConnections = number;
export type MaxPendingRequests = number;
export interface VirtualGatewayHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export const VirtualGatewayHttpConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxConnections: S.Number,
    maxPendingRequests: S.optional(S.Number),
  }),
).annotate({
  identifier: "VirtualGatewayHttpConnectionPool",
}) as any as S.Schema<VirtualGatewayHttpConnectionPool>;
export type MaxRequests = number;
export interface VirtualGatewayHttp2ConnectionPool {
  maxRequests: number;
}
export const VirtualGatewayHttp2ConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualGatewayHttp2ConnectionPool",
}) as any as S.Schema<VirtualGatewayHttp2ConnectionPool>;
export interface VirtualGatewayGrpcConnectionPool {
  maxRequests: number;
}
export const VirtualGatewayGrpcConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualGatewayGrpcConnectionPool",
}) as any as S.Schema<VirtualGatewayGrpcConnectionPool>;
export type VirtualGatewayConnectionPool =
  | { http: VirtualGatewayHttpConnectionPool; http2?: never; grpc?: never }
  | { http?: never; http2: VirtualGatewayHttp2ConnectionPool; grpc?: never }
  | { http?: never; http2?: never; grpc: VirtualGatewayGrpcConnectionPool };
export const VirtualGatewayConnectionPool = /*@__PURE__*/ S.Union([
  S.Struct({ http: VirtualGatewayHttpConnectionPool }),
  S.Struct({ http2: VirtualGatewayHttp2ConnectionPool }),
  S.Struct({ grpc: VirtualGatewayGrpcConnectionPool }),
]);
export interface VirtualGatewayListener {
  healthCheck?: VirtualGatewayHealthCheckPolicy;
  portMapping: VirtualGatewayPortMapping;
  tls?: VirtualGatewayListenerTls;
  connectionPool?: VirtualGatewayConnectionPool;
}
export const VirtualGatewayListener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    healthCheck: S.optional(VirtualGatewayHealthCheckPolicy),
    portMapping: VirtualGatewayPortMapping,
    tls: S.optional(VirtualGatewayListenerTls),
    connectionPool: S.optional(VirtualGatewayConnectionPool),
  }),
).annotate({
  identifier: "VirtualGatewayListener",
}) as any as S.Schema<VirtualGatewayListener>;
export type VirtualGatewayListeners = VirtualGatewayListener[];
export const VirtualGatewayListeners = /*@__PURE__*/ S.Array(
  VirtualGatewayListener,
);
export type TextFormat = string;
export type JsonKey = string;
export type JsonValue = string;
export interface JsonFormatRef {
  key: string;
  value: string;
}
export const JsonFormatRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "JsonFormatRef" }) as any as S.Schema<JsonFormatRef>;
export type JsonFormat = JsonFormatRef[];
export const JsonFormat = /*@__PURE__*/ S.Array(JsonFormatRef);
export type LoggingFormat =
  | { text: string; json?: never }
  | { text?: never; json: JsonFormatRef[] };
export const LoggingFormat = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ json: JsonFormat }),
]);
export interface VirtualGatewayFileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export const VirtualGatewayFileAccessLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, format: S.optional(LoggingFormat) }),
).annotate({
  identifier: "VirtualGatewayFileAccessLog",
}) as any as S.Schema<VirtualGatewayFileAccessLog>;
export type VirtualGatewayAccessLog = { file: VirtualGatewayFileAccessLog };
export const VirtualGatewayAccessLog = /*@__PURE__*/ S.Union([
  S.Struct({ file: VirtualGatewayFileAccessLog }),
]);
export interface VirtualGatewayLogging {
  accessLog?: VirtualGatewayAccessLog;
}
export const VirtualGatewayLogging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessLog: S.optional(VirtualGatewayAccessLog) }),
).annotate({
  identifier: "VirtualGatewayLogging",
}) as any as S.Schema<VirtualGatewayLogging>;
export interface VirtualGatewaySpec {
  backendDefaults?: VirtualGatewayBackendDefaults;
  listeners: VirtualGatewayListener[];
  logging?: VirtualGatewayLogging;
}
export const VirtualGatewaySpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    backendDefaults: S.optional(VirtualGatewayBackendDefaults),
    listeners: VirtualGatewayListeners,
    logging: S.optional(VirtualGatewayLogging),
  }),
).annotate({
  identifier: "VirtualGatewaySpec",
}) as any as S.Schema<VirtualGatewaySpec>;
export interface CreateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualGatewaySpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualGateways",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualGatewayInput",
}) as any as S.Schema<CreateVirtualGatewayInput>;
export type VirtualGatewayStatusCode = string;
export interface VirtualGatewayStatus {
  status: string;
}
export const VirtualGatewayStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualGatewayStatus",
}) as any as S.Schema<VirtualGatewayStatus>;
export interface VirtualGatewayData {
  meshName: string;
  virtualGatewayName: string;
  spec: VirtualGatewaySpec;
  metadata: ResourceMetadata;
  status: VirtualGatewayStatus;
}
export const VirtualGatewayData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualGatewayName: S.String,
    spec: VirtualGatewaySpec,
    metadata: ResourceMetadata,
    status: VirtualGatewayStatus,
  }),
).annotate({
  identifier: "VirtualGatewayData",
}) as any as S.Schema<VirtualGatewayData>;
export interface CreateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const CreateVirtualGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualGatewayOutput",
}) as any as S.Schema<CreateVirtualGatewayOutput>;
export type Hostname = string;
export type DnsResponseType = string;
export interface DnsServiceDiscovery {
  hostname: string;
  responseType?: string;
  ipPreference?: string;
}
export const DnsServiceDiscovery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostname: S.String,
    responseType: S.optional(S.String),
    ipPreference: S.optional(S.String),
  }),
).annotate({
  identifier: "DnsServiceDiscovery",
}) as any as S.Schema<DnsServiceDiscovery>;
export type AwsCloudMapName = string;
export type AwsCloudMapInstanceAttributeKey = string;
export type AwsCloudMapInstanceAttributeValue = string;
export interface AwsCloudMapInstanceAttribute {
  key: string;
  value: string;
}
export const AwsCloudMapInstanceAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "AwsCloudMapInstanceAttribute",
}) as any as S.Schema<AwsCloudMapInstanceAttribute>;
export type AwsCloudMapInstanceAttributes = AwsCloudMapInstanceAttribute[];
export const AwsCloudMapInstanceAttributes = /*@__PURE__*/ S.Array(
  AwsCloudMapInstanceAttribute,
);
export interface AwsCloudMapServiceDiscovery {
  namespaceName: string;
  serviceName: string;
  attributes?: AwsCloudMapInstanceAttribute[];
  ipPreference?: string;
}
export const AwsCloudMapServiceDiscovery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    serviceName: S.String,
    attributes: S.optional(AwsCloudMapInstanceAttributes),
    ipPreference: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudMapServiceDiscovery",
}) as any as S.Schema<AwsCloudMapServiceDiscovery>;
export type ServiceDiscovery =
  | { dns: DnsServiceDiscovery; awsCloudMap?: never }
  | { dns?: never; awsCloudMap: AwsCloudMapServiceDiscovery };
export const ServiceDiscovery = /*@__PURE__*/ S.Union([
  S.Struct({ dns: DnsServiceDiscovery }),
  S.Struct({ awsCloudMap: AwsCloudMapServiceDiscovery }),
]);
export type PortProtocol = string;
export interface PortMapping {
  port: number;
  protocol: string;
}
export const PortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ port: S.Number, protocol: S.String }),
).annotate({ identifier: "PortMapping" }) as any as S.Schema<PortMapping>;
export type ListenerTlsMode = string;
export interface ListenerTlsAcmCertificate {
  certificateArn: string;
}
export const ListenerTlsAcmCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateArn: S.String }),
).annotate({
  identifier: "ListenerTlsAcmCertificate",
}) as any as S.Schema<ListenerTlsAcmCertificate>;
export interface ListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export const ListenerTlsFileCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateChain: S.String, privateKey: S.String }),
).annotate({
  identifier: "ListenerTlsFileCertificate",
}) as any as S.Schema<ListenerTlsFileCertificate>;
export type SdsSecretName = string;
export interface ListenerTlsSdsCertificate {
  secretName: string;
}
export const ListenerTlsSdsCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "ListenerTlsSdsCertificate",
}) as any as S.Schema<ListenerTlsSdsCertificate>;
export type ListenerTlsCertificate =
  | { acm: ListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: ListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: ListenerTlsSdsCertificate };
export const ListenerTlsCertificate = /*@__PURE__*/ S.Union([
  S.Struct({ acm: ListenerTlsAcmCertificate }),
  S.Struct({ file: ListenerTlsFileCertificate }),
  S.Struct({ sds: ListenerTlsSdsCertificate }),
]);
export interface TlsValidationContextFileTrust {
  certificateChain: string;
}
export const TlsValidationContextFileTrust = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateChain: S.String }),
).annotate({
  identifier: "TlsValidationContextFileTrust",
}) as any as S.Schema<TlsValidationContextFileTrust>;
export interface TlsValidationContextSdsTrust {
  secretName: string;
}
export const TlsValidationContextSdsTrust = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "TlsValidationContextSdsTrust",
}) as any as S.Schema<TlsValidationContextSdsTrust>;
export type ListenerTlsValidationContextTrust =
  | { file: TlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: TlsValidationContextSdsTrust };
export const ListenerTlsValidationContextTrust = /*@__PURE__*/ S.Union([
  S.Struct({ file: TlsValidationContextFileTrust }),
  S.Struct({ sds: TlsValidationContextSdsTrust }),
]);
export interface ListenerTlsValidationContext {
  trust: ListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const ListenerTlsValidationContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trust: ListenerTlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "ListenerTlsValidationContext",
}) as any as S.Schema<ListenerTlsValidationContext>;
export interface ListenerTls {
  mode: string;
  certificate: ListenerTlsCertificate;
  validation?: ListenerTlsValidationContext;
}
export const ListenerTls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: S.String,
    certificate: ListenerTlsCertificate,
    validation: S.optional(ListenerTlsValidationContext),
  }),
).annotate({ identifier: "ListenerTls" }) as any as S.Schema<ListenerTls>;
export type HealthCheckTimeoutMillis = number;
export type HealthCheckIntervalMillis = number;
export type HealthCheckThreshold = number;
export interface HealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export const HealthCheckPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutMillis: S.Number,
    intervalMillis: S.Number,
    protocol: S.String,
    port: S.optional(S.Number),
    path: S.optional(S.String),
    healthyThreshold: S.Number,
    unhealthyThreshold: S.Number,
  }),
).annotate({
  identifier: "HealthCheckPolicy",
}) as any as S.Schema<HealthCheckPolicy>;
export type ListenerTimeout =
  | { tcp: TcpTimeout; http?: never; http2?: never; grpc?: never }
  | { tcp?: never; http: HttpTimeout; http2?: never; grpc?: never }
  | { tcp?: never; http?: never; http2: HttpTimeout; grpc?: never }
  | { tcp?: never; http?: never; http2?: never; grpc: GrpcTimeout };
export const ListenerTimeout = /*@__PURE__*/ S.Union([
  S.Struct({ tcp: TcpTimeout }),
  S.Struct({ http: HttpTimeout }),
  S.Struct({ http2: HttpTimeout }),
  S.Struct({ grpc: GrpcTimeout }),
]);
export type OutlierDetectionMaxServerErrors = number;
export type OutlierDetectionMaxEjectionPercent = number;
export interface OutlierDetection {
  maxServerErrors: number;
  interval: Duration;
  baseEjectionDuration: Duration;
  maxEjectionPercent: number;
}
export const OutlierDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxServerErrors: S.Number,
    interval: Duration,
    baseEjectionDuration: Duration,
    maxEjectionPercent: S.Number,
  }),
).annotate({
  identifier: "OutlierDetection",
}) as any as S.Schema<OutlierDetection>;
export interface VirtualNodeTcpConnectionPool {
  maxConnections: number;
}
export const VirtualNodeTcpConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxConnections: S.Number }),
).annotate({
  identifier: "VirtualNodeTcpConnectionPool",
}) as any as S.Schema<VirtualNodeTcpConnectionPool>;
export interface VirtualNodeHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export const VirtualNodeHttpConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxConnections: S.Number,
    maxPendingRequests: S.optional(S.Number),
  }),
).annotate({
  identifier: "VirtualNodeHttpConnectionPool",
}) as any as S.Schema<VirtualNodeHttpConnectionPool>;
export interface VirtualNodeHttp2ConnectionPool {
  maxRequests: number;
}
export const VirtualNodeHttp2ConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualNodeHttp2ConnectionPool",
}) as any as S.Schema<VirtualNodeHttp2ConnectionPool>;
export interface VirtualNodeGrpcConnectionPool {
  maxRequests: number;
}
export const VirtualNodeGrpcConnectionPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualNodeGrpcConnectionPool",
}) as any as S.Schema<VirtualNodeGrpcConnectionPool>;
export type VirtualNodeConnectionPool =
  | {
      tcp: VirtualNodeTcpConnectionPool;
      http?: never;
      http2?: never;
      grpc?: never;
    }
  | {
      tcp?: never;
      http: VirtualNodeHttpConnectionPool;
      http2?: never;
      grpc?: never;
    }
  | {
      tcp?: never;
      http?: never;
      http2: VirtualNodeHttp2ConnectionPool;
      grpc?: never;
    }
  | {
      tcp?: never;
      http?: never;
      http2?: never;
      grpc: VirtualNodeGrpcConnectionPool;
    };
export const VirtualNodeConnectionPool = /*@__PURE__*/ S.Union([
  S.Struct({ tcp: VirtualNodeTcpConnectionPool }),
  S.Struct({ http: VirtualNodeHttpConnectionPool }),
  S.Struct({ http2: VirtualNodeHttp2ConnectionPool }),
  S.Struct({ grpc: VirtualNodeGrpcConnectionPool }),
]);
export interface Listener {
  portMapping: PortMapping;
  tls?: ListenerTls;
  healthCheck?: HealthCheckPolicy;
  timeout?: ListenerTimeout;
  outlierDetection?: OutlierDetection;
  connectionPool?: VirtualNodeConnectionPool;
}
export const Listener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portMapping: PortMapping,
    tls: S.optional(ListenerTls),
    healthCheck: S.optional(HealthCheckPolicy),
    timeout: S.optional(ListenerTimeout),
    outlierDetection: S.optional(OutlierDetection),
    connectionPool: S.optional(VirtualNodeConnectionPool),
  }),
).annotate({ identifier: "Listener" }) as any as S.Schema<Listener>;
export type Listeners = Listener[];
export const Listeners = /*@__PURE__*/ S.Array(Listener);
export type ClientTlsCertificate =
  | { file: ListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: ListenerTlsSdsCertificate };
export const ClientTlsCertificate = /*@__PURE__*/ S.Union([
  S.Struct({ file: ListenerTlsFileCertificate }),
  S.Struct({ sds: ListenerTlsSdsCertificate }),
]);
export type CertificateAuthorityArns = string[];
export const CertificateAuthorityArns = /*@__PURE__*/ S.Array(S.String);
export interface TlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export const TlsValidationContextAcmTrust = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateAuthorityArns: CertificateAuthorityArns }),
).annotate({
  identifier: "TlsValidationContextAcmTrust",
}) as any as S.Schema<TlsValidationContextAcmTrust>;
export type TlsValidationContextTrust =
  | { acm: TlsValidationContextAcmTrust; file?: never; sds?: never }
  | { acm?: never; file: TlsValidationContextFileTrust; sds?: never }
  | { acm?: never; file?: never; sds: TlsValidationContextSdsTrust };
export const TlsValidationContextTrust = /*@__PURE__*/ S.Union([
  S.Struct({ acm: TlsValidationContextAcmTrust }),
  S.Struct({ file: TlsValidationContextFileTrust }),
  S.Struct({ sds: TlsValidationContextSdsTrust }),
]);
export interface TlsValidationContext {
  trust: TlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const TlsValidationContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trust: TlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "TlsValidationContext",
}) as any as S.Schema<TlsValidationContext>;
export interface ClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: ClientTlsCertificate;
  validation: TlsValidationContext;
}
export const ClientPolicyTls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enforce: S.optional(S.Boolean),
    ports: S.optional(PortSet),
    certificate: S.optional(ClientTlsCertificate),
    validation: TlsValidationContext,
  }),
).annotate({
  identifier: "ClientPolicyTls",
}) as any as S.Schema<ClientPolicyTls>;
export interface ClientPolicy {
  tls?: ClientPolicyTls;
}
export const ClientPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tls: S.optional(ClientPolicyTls) }),
).annotate({ identifier: "ClientPolicy" }) as any as S.Schema<ClientPolicy>;
export interface VirtualServiceBackend {
  virtualServiceName: string;
  clientPolicy?: ClientPolicy;
}
export const VirtualServiceBackend = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String,
    clientPolicy: S.optional(ClientPolicy),
  }),
).annotate({
  identifier: "VirtualServiceBackend",
}) as any as S.Schema<VirtualServiceBackend>;
export type Backend = { virtualService: VirtualServiceBackend };
export const Backend = /*@__PURE__*/ S.Union([
  S.Struct({ virtualService: VirtualServiceBackend }),
]);
export type Backends = Backend[];
export const Backends = /*@__PURE__*/ S.Array(Backend);
export interface BackendDefaults {
  clientPolicy?: ClientPolicy;
}
export const BackendDefaults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientPolicy: S.optional(ClientPolicy) }),
).annotate({
  identifier: "BackendDefaults",
}) as any as S.Schema<BackendDefaults>;
export interface FileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export const FileAccessLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, format: S.optional(LoggingFormat) }),
).annotate({ identifier: "FileAccessLog" }) as any as S.Schema<FileAccessLog>;
export type AccessLog = { file: FileAccessLog };
export const AccessLog = /*@__PURE__*/ S.Union([
  S.Struct({ file: FileAccessLog }),
]);
export interface Logging {
  accessLog?: AccessLog;
}
export const Logging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessLog: S.optional(AccessLog) }),
).annotate({ identifier: "Logging" }) as any as S.Schema<Logging>;
export interface VirtualNodeSpec {
  serviceDiscovery?: ServiceDiscovery;
  listeners?: Listener[];
  backends?: Backend[];
  backendDefaults?: BackendDefaults;
  logging?: Logging;
}
export const VirtualNodeSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceDiscovery: S.optional(ServiceDiscovery),
    listeners: S.optional(Listeners),
    backends: S.optional(Backends),
    backendDefaults: S.optional(BackendDefaults),
    logging: S.optional(Logging),
  }),
).annotate({
  identifier: "VirtualNodeSpec",
}) as any as S.Schema<VirtualNodeSpec>;
export interface CreateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualNodeSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualNodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualNodeInput",
}) as any as S.Schema<CreateVirtualNodeInput>;
export type VirtualNodeStatusCode = string;
export interface VirtualNodeStatus {
  status: string;
}
export const VirtualNodeStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualNodeStatus",
}) as any as S.Schema<VirtualNodeStatus>;
export interface VirtualNodeData {
  meshName: string;
  virtualNodeName: string;
  spec: VirtualNodeSpec;
  metadata: ResourceMetadata;
  status: VirtualNodeStatus;
}
export const VirtualNodeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualNodeName: S.String,
    spec: VirtualNodeSpec,
    metadata: ResourceMetadata,
    status: VirtualNodeStatus,
  }),
).annotate({
  identifier: "VirtualNodeData",
}) as any as S.Schema<VirtualNodeData>;
export interface CreateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const CreateVirtualNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualNodeOutput",
}) as any as S.Schema<CreateVirtualNodeOutput>;
export interface VirtualRouterListener {
  portMapping: PortMapping;
}
export const VirtualRouterListener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portMapping: PortMapping }),
).annotate({
  identifier: "VirtualRouterListener",
}) as any as S.Schema<VirtualRouterListener>;
export type VirtualRouterListeners = VirtualRouterListener[];
export const VirtualRouterListeners = /*@__PURE__*/ S.Array(
  VirtualRouterListener,
);
export interface VirtualRouterSpec {
  listeners?: VirtualRouterListener[];
}
export const VirtualRouterSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ listeners: S.optional(VirtualRouterListeners) }),
).annotate({
  identifier: "VirtualRouterSpec",
}) as any as S.Schema<VirtualRouterSpec>;
export interface CreateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualRouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualRouterSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualRouters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualRouterInput",
}) as any as S.Schema<CreateVirtualRouterInput>;
export type VirtualRouterStatusCode = string;
export interface VirtualRouterStatus {
  status: string;
}
export const VirtualRouterStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualRouterStatus",
}) as any as S.Schema<VirtualRouterStatus>;
export interface VirtualRouterData {
  meshName: string;
  virtualRouterName: string;
  spec: VirtualRouterSpec;
  metadata: ResourceMetadata;
  status: VirtualRouterStatus;
}
export const VirtualRouterData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    spec: VirtualRouterSpec,
    metadata: ResourceMetadata,
    status: VirtualRouterStatus,
  }),
).annotate({
  identifier: "VirtualRouterData",
}) as any as S.Schema<VirtualRouterData>;
export interface CreateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const CreateVirtualRouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualRouterOutput",
}) as any as S.Schema<CreateVirtualRouterOutput>;
export interface VirtualNodeServiceProvider {
  virtualNodeName: string;
}
export const VirtualNodeServiceProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualNodeName: S.String }),
).annotate({
  identifier: "VirtualNodeServiceProvider",
}) as any as S.Schema<VirtualNodeServiceProvider>;
export interface VirtualRouterServiceProvider {
  virtualRouterName: string;
}
export const VirtualRouterServiceProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualRouterName: S.String }),
).annotate({
  identifier: "VirtualRouterServiceProvider",
}) as any as S.Schema<VirtualRouterServiceProvider>;
export type VirtualServiceProvider =
  | { virtualNode: VirtualNodeServiceProvider; virtualRouter?: never }
  | { virtualNode?: never; virtualRouter: VirtualRouterServiceProvider };
export const VirtualServiceProvider = /*@__PURE__*/ S.Union([
  S.Struct({ virtualNode: VirtualNodeServiceProvider }),
  S.Struct({ virtualRouter: VirtualRouterServiceProvider }),
]);
export interface VirtualServiceSpec {
  provider?: VirtualServiceProvider;
}
export const VirtualServiceSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ provider: S.optional(VirtualServiceProvider) }),
).annotate({
  identifier: "VirtualServiceSpec",
}) as any as S.Schema<VirtualServiceSpec>;
export interface CreateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualServiceSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualServices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualServiceInput",
}) as any as S.Schema<CreateVirtualServiceInput>;
export type VirtualServiceStatusCode = string;
export interface VirtualServiceStatus {
  status: string;
}
export const VirtualServiceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualServiceStatus",
}) as any as S.Schema<VirtualServiceStatus>;
export interface VirtualServiceData {
  meshName: string;
  virtualServiceName: string;
  spec: VirtualServiceSpec;
  metadata: ResourceMetadata;
  status: VirtualServiceStatus;
}
export const VirtualServiceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualServiceName: S.String,
    spec: VirtualServiceSpec,
    metadata: ResourceMetadata,
    status: VirtualServiceStatus,
  }),
).annotate({
  identifier: "VirtualServiceData",
}) as any as S.Schema<VirtualServiceData>;
export interface CreateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const CreateVirtualServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualServiceOutput",
}) as any as S.Schema<CreateVirtualServiceOutput>;
export interface DeleteGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export const DeleteGatewayRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRouteInput",
}) as any as S.Schema<DeleteGatewayRouteInput>;
export interface DeleteGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const DeleteGatewayRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "DeleteGatewayRouteOutput",
}) as any as S.Schema<DeleteGatewayRouteOutput>;
export interface DeleteMeshInput {
  meshName: string;
}
export const DeleteMeshInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ meshName: S.String.pipe(T.HttpLabel("meshName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v20190125/meshes/{meshName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMeshInput",
}) as any as S.Schema<DeleteMeshInput>;
export interface DeleteMeshOutput {
  mesh: MeshData;
}
export const DeleteMeshOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "DeleteMeshOutput",
}) as any as S.Schema<DeleteMeshOutput>;
export interface DeleteRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  meshOwner?: string;
}
export const DeleteRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    routeName: S.String.pipe(T.HttpLabel("routeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteInput",
}) as any as S.Schema<DeleteRouteInput>;
export interface DeleteRouteOutput {
  route: RouteData;
}
export const DeleteRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "DeleteRouteOutput",
}) as any as S.Schema<DeleteRouteOutput>;
export interface DeleteVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVirtualGatewayInput",
}) as any as S.Schema<DeleteVirtualGatewayInput>;
export interface DeleteVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const DeleteVirtualGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualGatewayOutput",
}) as any as S.Schema<DeleteVirtualGatewayOutput>;
export interface DeleteVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVirtualNodeInput",
}) as any as S.Schema<DeleteVirtualNodeInput>;
export interface DeleteVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const DeleteVirtualNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualNodeOutput",
}) as any as S.Schema<DeleteVirtualNodeOutput>;
export interface DeleteVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualRouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVirtualRouterInput",
}) as any as S.Schema<DeleteVirtualRouterInput>;
export interface DeleteVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const DeleteVirtualRouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualRouterOutput",
}) as any as S.Schema<DeleteVirtualRouterOutput>;
export interface DeleteVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVirtualServiceInput",
}) as any as S.Schema<DeleteVirtualServiceInput>;
export interface DeleteVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const DeleteVirtualServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualServiceOutput",
}) as any as S.Schema<DeleteVirtualServiceOutput>;
export interface DescribeGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export const DescribeGatewayRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGatewayRouteInput",
}) as any as S.Schema<DescribeGatewayRouteInput>;
export interface DescribeGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const DescribeGatewayRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "DescribeGatewayRouteOutput",
}) as any as S.Schema<DescribeGatewayRouteOutput>;
export interface DescribeMeshInput {
  meshName: string;
  meshOwner?: string;
}
export const DescribeMeshInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMeshInput",
}) as any as S.Schema<DescribeMeshInput>;
export interface DescribeMeshOutput {
  mesh: MeshData;
}
export const DescribeMeshOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "DescribeMeshOutput",
}) as any as S.Schema<DescribeMeshOutput>;
export interface DescribeRouteInput {
  routeName: string;
  meshName: string;
  meshOwner?: string;
  virtualRouterName: string;
}
export const DescribeRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    routeName: S.String.pipe(T.HttpLabel("routeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRouteInput",
}) as any as S.Schema<DescribeRouteInput>;
export interface DescribeRouteOutput {
  route: RouteData;
}
export const DescribeRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "DescribeRouteOutput",
}) as any as S.Schema<DescribeRouteOutput>;
export interface DescribeVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualGatewayInput",
}) as any as S.Schema<DescribeVirtualGatewayInput>;
export interface DescribeVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const DescribeVirtualGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualGatewayOutput",
}) as any as S.Schema<DescribeVirtualGatewayOutput>;
export interface DescribeVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualNodeInput",
}) as any as S.Schema<DescribeVirtualNodeInput>;
export interface DescribeVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const DescribeVirtualNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualNodeOutput",
}) as any as S.Schema<DescribeVirtualNodeOutput>;
export interface DescribeVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualRouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualRouterInput",
}) as any as S.Schema<DescribeVirtualRouterInput>;
export interface DescribeVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const DescribeVirtualRouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualRouterOutput",
}) as any as S.Schema<DescribeVirtualRouterOutput>;
export interface DescribeVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVirtualServiceInput",
}) as any as S.Schema<DescribeVirtualServiceInput>;
export interface DescribeVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const DescribeVirtualServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualServiceOutput",
}) as any as S.Schema<DescribeVirtualServiceOutput>;
export type ListGatewayRoutesLimit = number;
export interface ListGatewayRoutesInput {
  meshName: string;
  virtualGatewayName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListGatewayRoutesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewayRoutesInput",
}) as any as S.Schema<ListGatewayRoutesInput>;
export interface GatewayRouteRef {
  meshName: string;
  gatewayRouteName: string;
  virtualGatewayName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const GatewayRouteRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    gatewayRouteName: S.String,
    virtualGatewayName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GatewayRouteRef",
}) as any as S.Schema<GatewayRouteRef>;
export type GatewayRouteList = GatewayRouteRef[];
export const GatewayRouteList = /*@__PURE__*/ S.Array(GatewayRouteRef);
export interface ListGatewayRoutesOutput {
  gatewayRoutes: GatewayRouteRef[];
  nextToken?: string;
}
export const ListGatewayRoutesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRoutes: GatewayRouteList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGatewayRoutesOutput",
}) as any as S.Schema<ListGatewayRoutesOutput>;
export type ListMeshesLimit = number;
export interface ListMeshesInput {
  nextToken?: string;
  limit?: number;
}
export const ListMeshesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20190125/meshes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMeshesInput",
}) as any as S.Schema<ListMeshesInput>;
export interface MeshRef {
  meshName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const MeshRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "MeshRef" }) as any as S.Schema<MeshRef>;
export type MeshList = MeshRef[];
export const MeshList = /*@__PURE__*/ S.Array(MeshRef);
export interface ListMeshesOutput {
  meshes: MeshRef[];
  nextToken?: string;
}
export const ListMeshesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ meshes: MeshList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMeshesOutput",
}) as any as S.Schema<ListMeshesOutput>;
export type ListRoutesLimit = number;
export interface ListRoutesInput {
  meshName: string;
  virtualRouterName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListRoutesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoutesInput",
}) as any as S.Schema<ListRoutesInput>;
export interface RouteRef {
  meshName: string;
  virtualRouterName: string;
  routeName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const RouteRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    routeName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "RouteRef" }) as any as S.Schema<RouteRef>;
export type RouteList = RouteRef[];
export const RouteList = /*@__PURE__*/ S.Array(RouteRef);
export interface ListRoutesOutput {
  routes: RouteRef[];
  nextToken?: string;
}
export const ListRoutesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ routes: RouteList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRoutesOutput",
}) as any as S.Schema<ListRoutesOutput>;
export type TagsLimit = number;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  limit?: number;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20190125/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: TagRef[];
  nextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ListVirtualGatewaysLimit = number;
export interface ListVirtualGatewaysInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualGatewaysInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualGateways",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualGatewaysInput",
}) as any as S.Schema<ListVirtualGatewaysInput>;
export interface VirtualGatewayRef {
  meshName: string;
  virtualGatewayName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const VirtualGatewayRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualGatewayName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "VirtualGatewayRef",
}) as any as S.Schema<VirtualGatewayRef>;
export type VirtualGatewayList = VirtualGatewayRef[];
export const VirtualGatewayList = /*@__PURE__*/ S.Array(VirtualGatewayRef);
export interface ListVirtualGatewaysOutput {
  virtualGateways: VirtualGatewayRef[];
  nextToken?: string;
}
export const ListVirtualGatewaysOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGateways: VirtualGatewayList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualGatewaysOutput",
}) as any as S.Schema<ListVirtualGatewaysOutput>;
export type ListVirtualNodesLimit = number;
export interface ListVirtualNodesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualNodesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualNodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualNodesInput",
}) as any as S.Schema<ListVirtualNodesInput>;
export interface VirtualNodeRef {
  meshName: string;
  virtualNodeName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const VirtualNodeRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualNodeName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "VirtualNodeRef" }) as any as S.Schema<VirtualNodeRef>;
export type VirtualNodeList = VirtualNodeRef[];
export const VirtualNodeList = /*@__PURE__*/ S.Array(VirtualNodeRef);
export interface ListVirtualNodesOutput {
  virtualNodes: VirtualNodeRef[];
  nextToken?: string;
}
export const ListVirtualNodesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ virtualNodes: VirtualNodeList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListVirtualNodesOutput",
}) as any as S.Schema<ListVirtualNodesOutput>;
export type ListVirtualRoutersLimit = number;
export interface ListVirtualRoutersInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualRoutersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualRouters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualRoutersInput",
}) as any as S.Schema<ListVirtualRoutersInput>;
export interface VirtualRouterRef {
  meshName: string;
  virtualRouterName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const VirtualRouterRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "VirtualRouterRef",
}) as any as S.Schema<VirtualRouterRef>;
export type VirtualRouterList = VirtualRouterRef[];
export const VirtualRouterList = /*@__PURE__*/ S.Array(VirtualRouterRef);
export interface ListVirtualRoutersOutput {
  virtualRouters: VirtualRouterRef[];
  nextToken?: string;
}
export const ListVirtualRoutersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouters: VirtualRouterList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualRoutersOutput",
}) as any as S.Schema<ListVirtualRoutersOutput>;
export type ListVirtualServicesLimit = number;
export interface ListVirtualServicesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualServices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualServicesInput",
}) as any as S.Schema<ListVirtualServicesInput>;
export interface VirtualServiceRef {
  meshName: string;
  virtualServiceName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const VirtualServiceRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualServiceName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "VirtualServiceRef",
}) as any as S.Schema<VirtualServiceRef>;
export type VirtualServiceList = VirtualServiceRef[];
export const VirtualServiceList = /*@__PURE__*/ S.Array(VirtualServiceRef);
export interface ListVirtualServicesOutput {
  virtualServices: VirtualServiceRef[];
  nextToken?: string;
}
export const ListVirtualServicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServices: VirtualServiceList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualServicesOutput",
}) as any as S.Schema<ListVirtualServicesOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: TagRef[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/tag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tagKeys: TagKeyList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/untag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateGatewayRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    spec: GatewayRouteSpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayRouteInput",
}) as any as S.Schema<UpdateGatewayRouteInput>;
export interface UpdateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const UpdateGatewayRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "UpdateGatewayRouteOutput",
}) as any as S.Schema<UpdateGatewayRouteOutput>;
export interface UpdateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  clientToken?: string;
}
export const UpdateMeshInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: S.optional(MeshSpec),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMeshInput",
}) as any as S.Schema<UpdateMeshInput>;
export interface UpdateMeshOutput {
  mesh: MeshData;
}
export const UpdateMeshOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "UpdateMeshOutput",
}) as any as S.Schema<UpdateMeshOutput>;
export interface UpdateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateRouteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    routeName: S.String.pipe(T.HttpLabel("routeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    spec: RouteSpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRouteInput",
}) as any as S.Schema<UpdateRouteInput>;
export interface UpdateRouteOutput {
  route: RouteData;
}
export const UpdateRouteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "UpdateRouteOutput",
}) as any as S.Schema<UpdateRouteOutput>;
export interface UpdateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualGatewayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualGatewaySpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVirtualGatewayInput",
}) as any as S.Schema<UpdateVirtualGatewayInput>;
export interface UpdateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const UpdateVirtualGatewayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualGatewayOutput",
}) as any as S.Schema<UpdateVirtualGatewayOutput>;
export interface UpdateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualNodeSpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVirtualNodeInput",
}) as any as S.Schema<UpdateVirtualNodeInput>;
export interface UpdateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const UpdateVirtualNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualNodeOutput",
}) as any as S.Schema<UpdateVirtualNodeOutput>;
export interface UpdateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualRouterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualRouterSpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVirtualRouterInput",
}) as any as S.Schema<UpdateVirtualRouterInput>;
export interface UpdateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const UpdateVirtualRouterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualRouterOutput",
}) as any as S.Schema<UpdateVirtualRouterOutput>;
export interface UpdateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualServiceSpec,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVirtualServiceInput",
}) as any as S.Schema<UpdateVirtualServiceInput>;
export interface UpdateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const UpdateVirtualServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualServiceOutput",
}) as any as S.Schema<UpdateVirtualServiceOutput>;
export type CreateGatewayRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a gateway route.
 *
 * A gateway route is attached to a virtual gateway and routes traffic to an existing
 * virtual service. If a route matches a request, it can distribute traffic to a target
 * virtual service.
 *
 * For more information about gateway routes, see Gateway routes.
 */
export const createGatewayRoute: API.OperationMethod<
  CreateGatewayRouteInput,
  CreateGatewayRouteOutput,
  CreateGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRouteInput,
  output: CreateGatewayRouteOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGatewayRoute",
}));

export type CreateMeshError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a service mesh.
 *
 * A service mesh is a logical boundary for network traffic between services that are
 * represented by resources within the mesh. After you create your service mesh, you can
 * create virtual services, virtual nodes, virtual routers, and routes to distribute traffic
 * between the applications in your mesh.
 *
 * For more information about service meshes, see Service meshes.
 */
export const createMesh: API.OperationMethod<
  CreateMeshInput,
  CreateMeshOutput,
  CreateMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMeshInput,
  output: CreateMeshOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMesh",
}));

export type CreateRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a route that is associated with a virtual router.
 *
 * You can route several different protocols and define a retry policy for a route.
 * Traffic can be routed to one or more virtual nodes.
 *
 * For more information about routes, see Routes.
 */
export const createRoute: API.OperationMethod<
  CreateRouteInput,
  CreateRouteOutput,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouteInput,
  output: CreateRouteOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoute",
}));

export type CreateVirtualGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual gateway.
 *
 * A virtual gateway allows resources outside your mesh to communicate to resources that
 * are inside your mesh. The virtual gateway represents an Envoy proxy running in an Amazon ECS task, in a Kubernetes service, or on an Amazon EC2 instance. Unlike a
 * virtual node, which represents an Envoy running with an application, a virtual gateway
 * represents Envoy deployed by itself.
 *
 * For more information about virtual gateways, see Virtual gateways.
 */
export const createVirtualGateway: API.OperationMethod<
  CreateVirtualGatewayInput,
  CreateVirtualGatewayOutput,
  CreateVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVirtualGatewayInput,
  output: CreateVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualGateway",
}));

export type CreateVirtualNodeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual node within a service mesh.
 *
 * A virtual node acts as a logical pointer to a particular task group, such as an Amazon ECS service or a Kubernetes deployment. When you create a virtual node, you can
 * specify the service discovery information for your task group, and whether the proxy
 * running in a task group will communicate with other proxies using Transport Layer Security
 * (TLS).
 *
 * You define a `listener` for any inbound traffic that your virtual node
 * expects. Any virtual service that your virtual node expects to communicate to is specified
 * as a `backend`.
 *
 * The response metadata for your new virtual node contains the `arn` that is
 * associated with the virtual node. Set this value to the full ARN; for example,
 * `arn:aws:appmesh:us-west-2:123456789012:myMesh/default/virtualNode/myApp`)
 * as the `APPMESH_RESOURCE_ARN` environment variable for your task group's Envoy
 * proxy container in your task definition or pod spec. This is then mapped to the
 * `node.id` and `node.cluster` Envoy parameters.
 *
 * By default, App Mesh uses the name of the resource you specified in
 * `APPMESH_RESOURCE_ARN` when Envoy is referring to itself in metrics and
 * traces. You can override this behavior by setting the
 * `APPMESH_RESOURCE_CLUSTER` environment variable with your own name.
 *
 * For more information about virtual nodes, see Virtual nodes. You must be using `1.15.0` or later of the Envoy image when
 * setting these variables. For more information aboutApp Mesh Envoy variables, see
 * Envoy
 * image in the App Mesh User Guide.
 */
export const createVirtualNode: API.OperationMethod<
  CreateVirtualNodeInput,
  CreateVirtualNodeOutput,
  CreateVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVirtualNodeInput,
  output: CreateVirtualNodeOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualNode",
}));

export type CreateVirtualRouterError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual router within a service mesh.
 *
 * Specify a `listener` for any inbound traffic that your virtual router
 * receives. Create a virtual router for each protocol and port that you need to route.
 * Virtual routers handle traffic for one or more virtual services within your mesh. After you
 * create your virtual router, create and associate routes for your virtual router that direct
 * incoming requests to different virtual nodes.
 *
 * For more information about virtual routers, see Virtual routers.
 */
export const createVirtualRouter: API.OperationMethod<
  CreateVirtualRouterInput,
  CreateVirtualRouterOutput,
  CreateVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVirtualRouterInput,
  output: CreateVirtualRouterOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualRouter",
}));

export type CreateVirtualServiceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual service within a service mesh.
 *
 * A virtual service is an abstraction of a real service that is provided by a virtual node
 * directly or indirectly by means of a virtual router. Dependent services call your virtual
 * service by its `virtualServiceName`, and those requests are routed to the
 * virtual node or virtual router that is specified as the provider for the virtual
 * service.
 *
 * For more information about virtual services, see Virtual services.
 */
export const createVirtualService: API.OperationMethod<
  CreateVirtualServiceInput,
  CreateVirtualServiceOutput,
  CreateVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVirtualServiceInput,
  output: CreateVirtualServiceOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualService",
}));

export type DeleteGatewayRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing gateway route.
 */
export const deleteGatewayRoute: API.OperationMethod<
  DeleteGatewayRouteInput,
  DeleteGatewayRouteOutput,
  DeleteGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRouteInput,
  output: DeleteGatewayRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGatewayRoute",
}));

export type DeleteMeshError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing service mesh.
 *
 * You must delete all resources (virtual services, routes, virtual routers, and virtual
 * nodes) in the service mesh before you can delete the mesh itself.
 */
export const deleteMesh: API.OperationMethod<
  DeleteMeshInput,
  DeleteMeshOutput,
  DeleteMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMeshInput,
  output: DeleteMeshOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMesh",
}));

export type DeleteRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteInput,
  DeleteRouteOutput,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteInput,
  output: DeleteRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoute",
}));

export type DeleteVirtualGatewayError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual gateway. You cannot delete a virtual gateway if any gateway
 * routes are associated to it.
 */
export const deleteVirtualGateway: API.OperationMethod<
  DeleteVirtualGatewayInput,
  DeleteVirtualGatewayOutput,
  DeleteVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVirtualGatewayInput,
  output: DeleteVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualGateway",
}));

export type DeleteVirtualNodeError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual node.
 *
 * You must delete any virtual services that list a virtual node as a service provider
 * before you can delete the virtual node itself.
 */
export const deleteVirtualNode: API.OperationMethod<
  DeleteVirtualNodeInput,
  DeleteVirtualNodeOutput,
  DeleteVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVirtualNodeInput,
  output: DeleteVirtualNodeOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualNode",
}));

export type DeleteVirtualRouterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual router.
 *
 * You must delete any routes associated with the virtual router before you can delete the
 * router itself.
 */
export const deleteVirtualRouter: API.OperationMethod<
  DeleteVirtualRouterInput,
  DeleteVirtualRouterOutput,
  DeleteVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVirtualRouterInput,
  output: DeleteVirtualRouterOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualRouter",
}));

export type DeleteVirtualServiceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual service.
 */
export const deleteVirtualService: API.OperationMethod<
  DeleteVirtualServiceInput,
  DeleteVirtualServiceOutput,
  DeleteVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVirtualServiceInput,
  output: DeleteVirtualServiceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualService",
}));

export type DescribeGatewayRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing gateway route.
 */
export const describeGatewayRoute: API.OperationMethod<
  DescribeGatewayRouteInput,
  DescribeGatewayRouteOutput,
  DescribeGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGatewayRouteInput,
  output: DescribeGatewayRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayRoute",
}));

export type DescribeMeshError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing service mesh.
 */
export const describeMesh: API.OperationMethod<
  DescribeMeshInput,
  DescribeMeshOutput,
  DescribeMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMeshInput,
  output: DescribeMeshOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMesh",
}));

export type DescribeRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing route.
 */
export const describeRoute: API.OperationMethod<
  DescribeRouteInput,
  DescribeRouteOutput,
  DescribeRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRouteInput,
  output: DescribeRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoute",
}));

export type DescribeVirtualGatewayError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual gateway.
 */
export const describeVirtualGateway: API.OperationMethod<
  DescribeVirtualGatewayInput,
  DescribeVirtualGatewayOutput,
  DescribeVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualGatewayInput,
  output: DescribeVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualGateway",
}));

export type DescribeVirtualNodeError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual node.
 */
export const describeVirtualNode: API.OperationMethod<
  DescribeVirtualNodeInput,
  DescribeVirtualNodeOutput,
  DescribeVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualNodeInput,
  output: DescribeVirtualNodeOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualNode",
}));

export type DescribeVirtualRouterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual router.
 */
export const describeVirtualRouter: API.OperationMethod<
  DescribeVirtualRouterInput,
  DescribeVirtualRouterOutput,
  DescribeVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualRouterInput,
  output: DescribeVirtualRouterOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualRouter",
}));

export type DescribeVirtualServiceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual service.
 */
export const describeVirtualService: API.OperationMethod<
  DescribeVirtualServiceInput,
  DescribeVirtualServiceOutput,
  DescribeVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVirtualServiceInput,
  output: DescribeVirtualServiceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualService",
}));

export type ListGatewayRoutesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing gateway routes that are associated to a virtual
 * gateway.
 */
export const listGatewayRoutes: API.PaginatedOperationMethod<
  ListGatewayRoutesInput,
  ListGatewayRoutesOutput,
  ListGatewayRoutesError,
  Credentials | HttpClient.HttpClient,
  GatewayRouteRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayRoutesInput,
  output: ListGatewayRoutesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayRoutes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayRoutes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListMeshesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing service meshes.
 */
export const listMeshes: API.PaginatedOperationMethod<
  ListMeshesInput,
  ListMeshesOutput,
  ListMeshesError,
  Credentials | HttpClient.HttpClient,
  MeshRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMeshesInput,
  output: ListMeshesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMeshes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meshes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListRoutesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing routes in a service mesh.
 */
export const listRoutes: API.PaginatedOperationMethod<
  ListRoutesInput,
  ListRoutesOutput,
  ListRoutesError,
  Credentials | HttpClient.HttpClient,
  RouteRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoutesInput,
  output: ListRoutesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "routes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the tags for an App Mesh resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  TagRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualGatewaysError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual gateways in a service mesh.
 */
export const listVirtualGateways: API.PaginatedOperationMethod<
  ListVirtualGatewaysInput,
  ListVirtualGatewaysOutput,
  ListVirtualGatewaysError,
  Credentials | HttpClient.HttpClient,
  VirtualGatewayRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualGatewaysInput,
  output: ListVirtualGatewaysOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualGateways",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualNodesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual nodes.
 */
export const listVirtualNodes: API.PaginatedOperationMethod<
  ListVirtualNodesInput,
  ListVirtualNodesOutput,
  ListVirtualNodesError,
  Credentials | HttpClient.HttpClient,
  VirtualNodeRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualNodesInput,
  output: ListVirtualNodesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualNodes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualRoutersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual routers in a service mesh.
 */
export const listVirtualRouters: API.PaginatedOperationMethod<
  ListVirtualRoutersInput,
  ListVirtualRoutersOutput,
  ListVirtualRoutersError,
  Credentials | HttpClient.HttpClient,
  VirtualRouterRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualRoutersInput,
  output: ListVirtualRoutersOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualRouters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualRouters",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualServicesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual services in a service mesh.
 */
export const listVirtualServices: API.PaginatedOperationMethod<
  ListVirtualServicesInput,
  ListVirtualServicesOutput,
  ListVirtualServicesError,
  Credentials | HttpClient.HttpClient,
  VirtualServiceRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualServicesInput,
  output: ListVirtualServicesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualServices",
    pageSize: "limit",
  } as const,
})) as any;

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateGatewayRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing gateway route that is associated to a specified virtual gateway in a
 * service mesh.
 */
export const updateGatewayRoute: API.OperationMethod<
  UpdateGatewayRouteInput,
  UpdateGatewayRouteOutput,
  UpdateGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayRouteInput,
  output: UpdateGatewayRouteOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayRoute",
}));

export type UpdateMeshError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing service mesh.
 */
export const updateMesh: API.OperationMethod<
  UpdateMeshInput,
  UpdateMeshOutput,
  UpdateMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMeshInput,
  output: UpdateMeshOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMesh",
}));

export type UpdateRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing route for a specified service mesh and virtual router.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteInput,
  UpdateRouteOutput,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouteInput,
  output: UpdateRouteOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
}));

export type UpdateVirtualGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual gateway in a specified service mesh.
 */
export const updateVirtualGateway: API.OperationMethod<
  UpdateVirtualGatewayInput,
  UpdateVirtualGatewayOutput,
  UpdateVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVirtualGatewayInput,
  output: UpdateVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualGateway",
}));

export type UpdateVirtualNodeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual node in a specified service mesh.
 */
export const updateVirtualNode: API.OperationMethod<
  UpdateVirtualNodeInput,
  UpdateVirtualNodeOutput,
  UpdateVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVirtualNodeInput,
  output: UpdateVirtualNodeOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualNode",
}));

export type UpdateVirtualRouterError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual router in a specified service mesh.
 */
export const updateVirtualRouter: API.OperationMethod<
  UpdateVirtualRouterInput,
  UpdateVirtualRouterOutput,
  UpdateVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVirtualRouterInput,
  output: UpdateVirtualRouterOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualRouter",
}));

export type UpdateVirtualServiceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual service in a specified service mesh.
 */
export const updateVirtualService: API.OperationMethod<
  UpdateVirtualServiceInput,
  UpdateVirtualServiceOutput,
  UpdateVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVirtualServiceInput,
  output: UpdateVirtualServiceOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualService",
}));
