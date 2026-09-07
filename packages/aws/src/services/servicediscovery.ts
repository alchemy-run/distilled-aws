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
  sdkId: "ServiceDiscovery",
  serviceShapeName: "Route53AutoNaming_v20170314",
});
const auth = T.AwsAuthSigv4({ name: "servicediscovery" });
const ver = T.ServiceVersion("2017-03-14");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
              `https://servicediscovery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://servicediscovery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://servicediscovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CustomHealthNotFound
  extends /*@__PURE__*/ S.TaggedError<CustomHealthNotFound>()(
    "CustomHealthNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DuplicateRequest
  extends /*@__PURE__*/ S.TaggedError<DuplicateRequest>()(
    "DuplicateRequest",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      DuplicateOperationId: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InstanceNotFound
  extends /*@__PURE__*/ S.TaggedError<InstanceNotFound>()(
    "InstanceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InvalidInput
  extends /*@__PURE__*/ S.TaggedError<InvalidInput>()(
    "InvalidInput",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NamespaceAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<NamespaceAlreadyExists>()(
    "NamespaceAlreadyExists",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      CreatorRequestId: S.optional(S.String),
      NamespaceId: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class NamespaceNotFound
  extends /*@__PURE__*/ S.TaggedError<NamespaceNotFound>()(
    "NamespaceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OperationNotFound
  extends /*@__PURE__*/ S.TaggedError<OperationNotFound>()(
    "OperationNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()(
    "RequestLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceInUse
  extends /*@__PURE__*/ S.TaggedError<ResourceInUse>()(
    "ResourceInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withDependencyViolationError) {}
export class ResourceLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceeded>()(
    "ResourceLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ServiceAlreadyExists>()(
    "ServiceAlreadyExists",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      CreatorRequestId: S.optional(S.String),
      ServiceId: S.optional(S.String),
      ServiceArn: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServiceAttributesLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceAttributesLimitExceededException>()(
    "ServiceAttributesLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceNotFound
  extends /*@__PURE__*/ S.TaggedError<ServiceNotFound>()(
    "ServiceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NamespaceNameHttp = string;
export type ResourceId = string;
export type ResourceDescription = string;
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
export interface CreateHttpNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateHttpNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateHttpNamespaceRequest",
}) as any as S.Schema<CreateHttpNamespaceRequest>;
export type OperationId = string;
export interface CreateHttpNamespaceResponse {
  OperationId?: string;
}
export const CreateHttpNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "CreateHttpNamespaceResponse",
}) as any as S.Schema<CreateHttpNamespaceResponse>;
export type NamespaceNamePrivate = string;
export type RecordTTL = number;
export interface SOA {
  TTL?: number;
}
export const SOA = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TTL: S.optional(S.Number) }),
).annotate({ identifier: "SOA" }) as any as S.Schema<SOA>;
export interface PrivateDnsPropertiesMutable {
  SOA: SOA;
}
export const PrivateDnsPropertiesMutable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SOA: SOA }),
).annotate({
  identifier: "PrivateDnsPropertiesMutable",
}) as any as S.Schema<PrivateDnsPropertiesMutable>;
export interface PrivateDnsNamespaceProperties {
  DnsProperties: PrivateDnsPropertiesMutable;
}
export const PrivateDnsNamespaceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DnsProperties: PrivateDnsPropertiesMutable }),
).annotate({
  identifier: "PrivateDnsNamespaceProperties",
}) as any as S.Schema<PrivateDnsNamespaceProperties>;
export interface CreatePrivateDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Vpc: string;
  Tags?: Tag[];
  Properties?: PrivateDnsNamespaceProperties;
}
export const CreatePrivateDnsNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    Vpc: S.String,
    Tags: S.optional(TagList),
    Properties: S.optional(PrivateDnsNamespaceProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePrivateDnsNamespaceRequest",
}) as any as S.Schema<CreatePrivateDnsNamespaceRequest>;
export interface CreatePrivateDnsNamespaceResponse {
  OperationId?: string;
}
export const CreatePrivateDnsNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "CreatePrivateDnsNamespaceResponse",
}) as any as S.Schema<CreatePrivateDnsNamespaceResponse>;
export type NamespaceNamePublic = string;
export interface PublicDnsPropertiesMutable {
  SOA: SOA;
}
export const PublicDnsPropertiesMutable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SOA: SOA }),
).annotate({
  identifier: "PublicDnsPropertiesMutable",
}) as any as S.Schema<PublicDnsPropertiesMutable>;
export interface PublicDnsNamespaceProperties {
  DnsProperties: PublicDnsPropertiesMutable;
}
export const PublicDnsNamespaceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DnsProperties: PublicDnsPropertiesMutable }),
).annotate({
  identifier: "PublicDnsNamespaceProperties",
}) as any as S.Schema<PublicDnsNamespaceProperties>;
export interface CreatePublicDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string;
  Description?: string;
  Tags?: Tag[];
  Properties?: PublicDnsNamespaceProperties;
}
export const CreatePublicDnsNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    Properties: S.optional(PublicDnsNamespaceProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePublicDnsNamespaceRequest",
}) as any as S.Schema<CreatePublicDnsNamespaceRequest>;
export interface CreatePublicDnsNamespaceResponse {
  OperationId?: string;
}
export const CreatePublicDnsNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "CreatePublicDnsNamespaceResponse",
}) as any as S.Schema<CreatePublicDnsNamespaceResponse>;
export type ServiceName = string;
export type Arn = string;
export type RoutingPolicy = "MULTIVALUE" | "WEIGHTED" | (string & {});
export const RoutingPolicy = S.String;

export type RecordType = "SRV" | "A" | "AAAA" | "CNAME" | (string & {});
export const RecordType = S.String;

export interface DnsRecord {
  Type: RecordType;
  TTL: number;
}
export const DnsRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: RecordType, TTL: S.Number }),
).annotate({ identifier: "DnsRecord" }) as any as S.Schema<DnsRecord>;
export type DnsRecordList = DnsRecord[];
export const DnsRecordList = /*@__PURE__*/ S.Array(DnsRecord);
export interface DnsConfig {
  NamespaceId?: string;
  RoutingPolicy?: RoutingPolicy;
  DnsRecords?: DnsRecord[];
}
export const DnsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceId: S.optional(S.String),
    RoutingPolicy: S.optional(RoutingPolicy),
    DnsRecords: S.optional(DnsRecordList),
  }),
).annotate({ identifier: "DnsConfig" }) as any as S.Schema<DnsConfig>;
export type HealthCheckType = "HTTP" | "HTTPS" | "TCP" | (string & {});
export const HealthCheckType = S.String;

export type ResourcePath = string;
export type FailureThreshold = number;
export interface HealthCheckConfig {
  Type: HealthCheckType;
  ResourcePath?: string;
  FailureThreshold?: number;
}
export const HealthCheckConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: HealthCheckType,
    ResourcePath: S.optional(S.String),
    FailureThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "HealthCheckConfig",
}) as any as S.Schema<HealthCheckConfig>;
export interface HealthCheckCustomConfig {
  FailureThreshold?: number;
}
export const HealthCheckCustomConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailureThreshold: S.optional(S.Number) }),
).annotate({
  identifier: "HealthCheckCustomConfig",
}) as any as S.Schema<HealthCheckCustomConfig>;
export type ServiceTypeOption = "HTTP" | (string & {});
export const ServiceTypeOption = S.String;

export interface CreateServiceRequest {
  Name: string;
  NamespaceId?: string;
  CreatorRequestId?: string;
  Description?: string;
  DnsConfig?: DnsConfig;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  Tags?: Tag[];
  Type?: ServiceTypeOption;
}
export const CreateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    NamespaceId: S.optional(S.String),
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    DnsConfig: S.optional(DnsConfig),
    HealthCheckConfig: S.optional(HealthCheckConfig),
    HealthCheckCustomConfig: S.optional(HealthCheckCustomConfig),
    Tags: S.optional(TagList),
    Type: S.optional(ServiceTypeOption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceRequest",
}) as any as S.Schema<CreateServiceRequest>;
export type AWSAccountId = string;
export type ResourceCount = number;
export type ServiceType = "HTTP" | "DNS_HTTP" | "DNS" | (string & {});
export const ServiceType = S.String;

export interface Service {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  NamespaceId?: string;
  Description?: string;
  InstanceCount?: number;
  DnsConfig?: DnsConfig;
  Type?: ServiceType;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  CreateDate?: Date;
  CreatorRequestId?: string;
  CreatedByAccount?: string;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    Name: S.optional(S.String),
    NamespaceId: S.optional(S.String),
    Description: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    DnsConfig: S.optional(DnsConfig),
    Type: S.optional(ServiceType),
    HealthCheckConfig: S.optional(HealthCheckConfig),
    HealthCheckCustomConfig: S.optional(HealthCheckCustomConfig),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatorRequestId: S.optional(S.String),
    CreatedByAccount: S.optional(S.String),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface CreateServiceResponse {
  Service?: Service;
}
export const CreateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: S.optional(Service) }),
).annotate({
  identifier: "CreateServiceResponse",
}) as any as S.Schema<CreateServiceResponse>;
export interface DeleteNamespaceRequest {
  Id: string;
}
export const DeleteNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNamespaceRequest",
}) as any as S.Schema<DeleteNamespaceRequest>;
export interface DeleteNamespaceResponse {
  OperationId?: string;
}
export const DeleteNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteNamespaceResponse",
}) as any as S.Schema<DeleteNamespaceResponse>;
export interface DeleteServiceRequest {
  Id: string;
}
export const DeleteServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceRequest",
}) as any as S.Schema<DeleteServiceRequest>;
export interface DeleteServiceResponse {}
export const DeleteServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceResponse",
}) as any as S.Schema<DeleteServiceResponse>;
export type ServiceAttributeKey = string;
export type ServiceAttributeKeyList = string[];
export const ServiceAttributeKeyList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteServiceAttributesRequest {
  ServiceId: string;
  Attributes: string[];
}
export const DeleteServiceAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.String, Attributes: ServiceAttributeKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceAttributesRequest",
}) as any as S.Schema<DeleteServiceAttributesRequest>;
export interface DeleteServiceAttributesResponse {}
export const DeleteServiceAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceAttributesResponse",
}) as any as S.Schema<DeleteServiceAttributesResponse>;
export interface DeregisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}
export const DeregisterInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.String, InstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeregisterInstanceRequest",
}) as any as S.Schema<DeregisterInstanceRequest>;
export interface DeregisterInstanceResponse {
  OperationId?: string;
}
export const DeregisterInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "DeregisterInstanceResponse",
}) as any as S.Schema<DeregisterInstanceResponse>;
export type NamespaceName = string;
export type DiscoverMaxResults = number;
export type AttrKey = string;
export type AttrValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type HealthStatusFilter =
  | "HEALTHY"
  | "UNHEALTHY"
  | "ALL"
  | "HEALTHY_OR_ELSE_ALL"
  | (string & {});
export const HealthStatusFilter = S.String;

export interface DiscoverInstancesRequest {
  NamespaceName: string;
  ServiceName: string;
  MaxResults?: number;
  QueryParameters?: { [key: string]: string | undefined };
  OptionalParameters?: { [key: string]: string | undefined };
  HealthStatus?: HealthStatusFilter;
  OwnerAccount?: string;
}
export const DiscoverInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceName: S.String,
    ServiceName: S.String,
    MaxResults: S.optional(S.Number),
    QueryParameters: S.optional(Attributes),
    OptionalParameters: S.optional(Attributes),
    HealthStatus: S.optional(HealthStatusFilter),
    OwnerAccount: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DiscoverInstancesRequest",
}) as any as S.Schema<DiscoverInstancesRequest>;
export type HealthStatus = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export const HealthStatus = S.String;

export interface HttpInstanceSummary {
  InstanceId?: string;
  NamespaceName?: string;
  ServiceName?: string;
  HealthStatus?: HealthStatus;
  Attributes?: { [key: string]: string | undefined };
}
export const HttpInstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    NamespaceName: S.optional(S.String),
    ServiceName: S.optional(S.String),
    HealthStatus: S.optional(HealthStatus),
    Attributes: S.optional(Attributes),
  }),
).annotate({
  identifier: "HttpInstanceSummary",
}) as any as S.Schema<HttpInstanceSummary>;
export type HttpInstanceSummaryList = HttpInstanceSummary[];
export const HttpInstanceSummaryList =
  /*@__PURE__*/ S.Array(HttpInstanceSummary);
export type Revision = number;
export interface DiscoverInstancesResponse {
  Instances?: HttpInstanceSummary[];
  InstancesRevision?: number;
}
export const DiscoverInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(HttpInstanceSummaryList),
    InstancesRevision: S.optional(S.Number),
  }),
).annotate({
  identifier: "DiscoverInstancesResponse",
}) as any as S.Schema<DiscoverInstancesResponse>;
export interface DiscoverInstancesRevisionRequest {
  NamespaceName: string;
  ServiceName: string;
  OwnerAccount?: string;
}
export const DiscoverInstancesRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceName: S.String,
    ServiceName: S.String,
    OwnerAccount: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DiscoverInstancesRevisionRequest",
}) as any as S.Schema<DiscoverInstancesRevisionRequest>;
export interface DiscoverInstancesRevisionResponse {
  InstancesRevision?: number;
}
export const DiscoverInstancesRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstancesRevision: S.optional(S.Number) }),
).annotate({
  identifier: "DiscoverInstancesRevisionResponse",
}) as any as S.Schema<DiscoverInstancesRevisionResponse>;
export interface GetInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}
export const GetInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.String, InstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetInstanceRequest",
}) as any as S.Schema<GetInstanceRequest>;
export interface Instance {
  Id: string;
  CreatorRequestId?: string;
  Attributes?: { [key: string]: string | undefined };
  CreatedByAccount?: string;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    CreatorRequestId: S.optional(S.String),
    Attributes: S.optional(Attributes),
    CreatedByAccount: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export interface GetInstanceResponse {
  ResourceOwner?: string;
  Instance?: Instance;
}
export const GetInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceOwner: S.optional(S.String),
    Instance: S.optional(Instance),
  }),
).annotate({
  identifier: "GetInstanceResponse",
}) as any as S.Schema<GetInstanceResponse>;
export type InstanceIdList = string[];
export const InstanceIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("InstanceId")),
);
export type MaxResults = number;
export type NextToken = string;
export interface GetInstancesHealthStatusRequest {
  ServiceId: string;
  Instances?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const GetInstancesHealthStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceId: S.String,
    Instances: S.optional(InstanceIdList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetInstancesHealthStatusRequest",
}) as any as S.Schema<GetInstancesHealthStatusRequest>;
export type InstanceHealthStatusMap = {
  [key: string]: HealthStatus | undefined;
};
export const InstanceHealthStatusMap = /*@__PURE__*/ S.Record(
  S.String,
  HealthStatus.pipe(S.optional),
);
export interface GetInstancesHealthStatusResponse {
  Status?: { [key: string]: HealthStatus | undefined };
  NextToken?: string;
}
export const GetInstancesHealthStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(InstanceHealthStatusMap),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInstancesHealthStatusResponse",
}) as any as S.Schema<GetInstancesHealthStatusResponse>;
export interface GetNamespaceRequest {
  Id: string;
}
export const GetNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetNamespaceRequest",
}) as any as S.Schema<GetNamespaceRequest>;
export type NamespaceType =
  | "DNS_PUBLIC"
  | "DNS_PRIVATE"
  | "HTTP"
  | (string & {});
export const NamespaceType = S.String;

export interface DnsProperties {
  HostedZoneId?: string;
  SOA?: SOA;
}
export const DnsProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HostedZoneId: S.optional(S.String), SOA: S.optional(SOA) }),
).annotate({ identifier: "DnsProperties" }) as any as S.Schema<DnsProperties>;
export interface HttpProperties {
  HttpName?: string;
}
export const HttpProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HttpName: S.optional(S.String) }),
).annotate({ identifier: "HttpProperties" }) as any as S.Schema<HttpProperties>;
export interface NamespaceProperties {
  DnsProperties?: DnsProperties;
  HttpProperties?: HttpProperties;
}
export const NamespaceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DnsProperties: S.optional(DnsProperties),
    HttpProperties: S.optional(HttpProperties),
  }),
).annotate({
  identifier: "NamespaceProperties",
}) as any as S.Schema<NamespaceProperties>;
export interface Namespace {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: NamespaceType;
  Description?: string;
  ServiceCount?: number;
  Properties?: NamespaceProperties;
  CreateDate?: Date;
  CreatorRequestId?: string;
}
export const Namespace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(NamespaceType),
    Description: S.optional(S.String),
    ServiceCount: S.optional(S.Number),
    Properties: S.optional(NamespaceProperties),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatorRequestId: S.optional(S.String),
  }),
).annotate({ identifier: "Namespace" }) as any as S.Schema<Namespace>;
export interface GetNamespaceResponse {
  Namespace?: Namespace;
}
export const GetNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Namespace: S.optional(Namespace) }),
).annotate({
  identifier: "GetNamespaceResponse",
}) as any as S.Schema<GetNamespaceResponse>;
export interface GetOperationRequest {
  OperationId: string;
  OwnerAccount?: string;
}
export const GetOperationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.String, OwnerAccount: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetOperationRequest",
}) as any as S.Schema<GetOperationRequest>;
export type OperationType =
  | "CREATE_NAMESPACE"
  | "DELETE_NAMESPACE"
  | "UPDATE_NAMESPACE"
  | "UPDATE_SERVICE"
  | "REGISTER_INSTANCE"
  | "DEREGISTER_INSTANCE"
  | (string & {});
export const OperationType = S.String;

export type OperationStatus =
  | "SUBMITTED"
  | "PENDING"
  | "SUCCESS"
  | "FAIL"
  | (string & {});
export const OperationStatus = S.String;

export type Message = string;
export type Code = string;
export type OperationTargetType =
  | "NAMESPACE"
  | "SERVICE"
  | "INSTANCE"
  | (string & {});
export const OperationTargetType = S.String;

export type OperationTargetsMap = { [key in OperationTargetType]?: string };
export const OperationTargetsMap = /*@__PURE__*/ S.Record(
  OperationTargetType,
  S.String.pipe(S.optional),
);
export interface Operation {
  Id?: string;
  OwnerAccount?: string;
  Type?: OperationType;
  Status?: OperationStatus;
  ErrorMessage?: string;
  ErrorCode?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
  Targets?: { [key: string]: string | undefined };
}
export const Operation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    OwnerAccount: S.optional(S.String),
    Type: S.optional(OperationType),
    Status: S.optional(OperationStatus),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Targets: S.optional(OperationTargetsMap),
  }),
).annotate({ identifier: "Operation" }) as any as S.Schema<Operation>;
export interface GetOperationResponse {
  Operation?: Operation;
}
export const GetOperationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operation: S.optional(Operation) }),
).annotate({
  identifier: "GetOperationResponse",
}) as any as S.Schema<GetOperationResponse>;
export interface GetServiceRequest {
  Id: string;
}
export const GetServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceRequest",
}) as any as S.Schema<GetServiceRequest>;
export interface GetServiceResponse {
  Service?: Service;
}
export const GetServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: S.optional(Service) }),
).annotate({
  identifier: "GetServiceResponse",
}) as any as S.Schema<GetServiceResponse>;
export interface GetServiceAttributesRequest {
  ServiceId: string;
}
export const GetServiceAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceAttributesRequest",
}) as any as S.Schema<GetServiceAttributesRequest>;
export type ServiceAttributeValue = string;
export type ServiceAttributesMap = { [key: string]: string | undefined };
export const ServiceAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ServiceAttributes {
  ServiceArn?: string;
  ResourceOwner?: string;
  Attributes?: { [key: string]: string | undefined };
}
export const ServiceAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    Attributes: S.optional(ServiceAttributesMap),
  }),
).annotate({
  identifier: "ServiceAttributes",
}) as any as S.Schema<ServiceAttributes>;
export interface GetServiceAttributesResponse {
  ServiceAttributes?: ServiceAttributes;
}
export const GetServiceAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceAttributes: S.optional(ServiceAttributes) }),
).annotate({
  identifier: "GetServiceAttributesResponse",
}) as any as S.Schema<GetServiceAttributesResponse>;
export interface ListInstancesRequest {
  ServiceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInstancesRequest",
}) as any as S.Schema<ListInstancesRequest>;
export interface InstanceSummary {
  Id?: string;
  Attributes?: { [key: string]: string | undefined };
  CreatedByAccount?: string;
}
export const InstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Attributes: S.optional(Attributes),
    CreatedByAccount: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceSummary",
}) as any as S.Schema<InstanceSummary>;
export type InstanceSummaryList = InstanceSummary[];
export const InstanceSummaryList = /*@__PURE__*/ S.Array(
  InstanceSummary.pipe(T.XmlName("InstanceSummary")).annotate({
    identifier: "InstanceSummary",
  }),
);
export interface ListInstancesResponse {
  ResourceOwner?: string;
  Instances?: InstanceSummary[];
  NextToken?: string;
}
export const ListInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceOwner: S.optional(S.String),
    Instances: S.optional(InstanceSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInstancesResponse",
}) as any as S.Schema<ListInstancesResponse>;
export type NamespaceFilterName =
  | "TYPE"
  | "NAME"
  | "HTTP_NAME"
  | "RESOURCE_OWNER"
  | (string & {});
export const NamespaceFilterName = S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type FilterCondition =
  | "EQ"
  | "IN"
  | "BETWEEN"
  | "BEGINS_WITH"
  | (string & {});
export const FilterCondition = S.String;

export interface NamespaceFilter {
  Name: NamespaceFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export const NamespaceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: NamespaceFilterName,
    Values: FilterValues,
    Condition: S.optional(FilterCondition),
  }),
).annotate({
  identifier: "NamespaceFilter",
}) as any as S.Schema<NamespaceFilter>;
export type NamespaceFilters = NamespaceFilter[];
export const NamespaceFilters = /*@__PURE__*/ S.Array(
  NamespaceFilter.pipe(T.XmlName("item")).annotate({
    identifier: "NamespaceFilter",
  }),
);
export interface ListNamespacesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: NamespaceFilter[];
}
export const ListNamespacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(NamespaceFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNamespacesRequest",
}) as any as S.Schema<ListNamespacesRequest>;
export interface NamespaceSummary {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: NamespaceType;
  Description?: string;
  ServiceCount?: number;
  Properties?: NamespaceProperties;
  CreateDate?: Date;
}
export const NamespaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(NamespaceType),
    Description: S.optional(S.String),
    ServiceCount: S.optional(S.Number),
    Properties: S.optional(NamespaceProperties),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "NamespaceSummary",
}) as any as S.Schema<NamespaceSummary>;
export type NamespaceSummariesList = NamespaceSummary[];
export const NamespaceSummariesList = /*@__PURE__*/ S.Array(NamespaceSummary);
export interface ListNamespacesResponse {
  Namespaces?: NamespaceSummary[];
  NextToken?: string;
}
export const ListNamespacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespaces: S.optional(NamespaceSummariesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNamespacesResponse",
}) as any as S.Schema<ListNamespacesResponse>;
export type OperationFilterName =
  | "NAMESPACE_ID"
  | "SERVICE_ID"
  | "STATUS"
  | "TYPE"
  | "UPDATE_DATE"
  | (string & {});
export const OperationFilterName = S.String;

export interface OperationFilter {
  Name: OperationFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export const OperationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: OperationFilterName,
    Values: FilterValues,
    Condition: S.optional(FilterCondition),
  }),
).annotate({
  identifier: "OperationFilter",
}) as any as S.Schema<OperationFilter>;
export type OperationFilters = OperationFilter[];
export const OperationFilters = /*@__PURE__*/ S.Array(
  OperationFilter.pipe(T.XmlName("item")).annotate({
    identifier: "OperationFilter",
  }),
);
export interface ListOperationsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: OperationFilter[];
}
export const ListOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(OperationFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListOperationsRequest",
}) as any as S.Schema<ListOperationsRequest>;
export interface OperationSummary {
  Id?: string;
  Status?: OperationStatus;
}
export const OperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Status: S.optional(OperationStatus) }),
).annotate({
  identifier: "OperationSummary",
}) as any as S.Schema<OperationSummary>;
export type OperationSummaryList = OperationSummary[];
export const OperationSummaryList = /*@__PURE__*/ S.Array(
  OperationSummary.pipe(T.XmlName("OperationSummary")).annotate({
    identifier: "OperationSummary",
  }),
);
export interface ListOperationsResponse {
  Operations?: OperationSummary[];
  NextToken?: string;
}
export const ListOperationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operations: S.optional(OperationSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOperationsResponse",
}) as any as S.Schema<ListOperationsResponse>;
export type ServiceFilterName =
  | "NAMESPACE_ID"
  | "RESOURCE_OWNER"
  | (string & {});
export const ServiceFilterName = S.String;

export interface ServiceFilter {
  Name: ServiceFilterName;
  Values: string[];
  Condition?: FilterCondition;
}
export const ServiceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: ServiceFilterName,
    Values: FilterValues,
    Condition: S.optional(FilterCondition),
  }),
).annotate({ identifier: "ServiceFilter" }) as any as S.Schema<ServiceFilter>;
export type ServiceFilters = ServiceFilter[];
export const ServiceFilters = /*@__PURE__*/ S.Array(
  ServiceFilter.pipe(T.XmlName("item")).annotate({
    identifier: "ServiceFilter",
  }),
);
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: ServiceFilter[];
}
export const ListServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(ServiceFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServicesRequest",
}) as any as S.Schema<ListServicesRequest>;
export interface ServiceSummary {
  Id?: string;
  Arn?: string;
  ResourceOwner?: string;
  Name?: string;
  Type?: ServiceType;
  Description?: string;
  InstanceCount?: number;
  DnsConfig?: DnsConfig;
  HealthCheckConfig?: HealthCheckConfig;
  HealthCheckCustomConfig?: HealthCheckCustomConfig;
  CreateDate?: Date;
  CreatedByAccount?: string;
}
export const ServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(ServiceType),
    Description: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    DnsConfig: S.optional(DnsConfig),
    HealthCheckConfig: S.optional(HealthCheckConfig),
    HealthCheckCustomConfig: S.optional(HealthCheckCustomConfig),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedByAccount: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummariesList = ServiceSummary[];
export const ServiceSummariesList = /*@__PURE__*/ S.Array(ServiceSummary);
export interface ListServicesResponse {
  Services?: ServiceSummary[];
  NextToken?: string;
}
export const ListServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ServiceSummariesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type InstanceId = string;
export interface RegisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
  CreatorRequestId?: string;
  Attributes: { [key: string]: string | undefined };
}
export const RegisterInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceId: S.String,
    InstanceId: S.String,
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Attributes: Attributes,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterInstanceRequest",
}) as any as S.Schema<RegisterInstanceRequest>;
export interface RegisterInstanceResponse {
  OperationId?: string;
}
export const RegisterInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "RegisterInstanceResponse",
}) as any as S.Schema<RegisterInstanceResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
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
export interface HttpNamespaceChange {
  Description: string;
}
export const HttpNamespaceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.String }),
).annotate({
  identifier: "HttpNamespaceChange",
}) as any as S.Schema<HttpNamespaceChange>;
export interface UpdateHttpNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: HttpNamespaceChange;
}
export const UpdateHttpNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Namespace: HttpNamespaceChange,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateHttpNamespaceRequest",
}) as any as S.Schema<UpdateHttpNamespaceRequest>;
export interface UpdateHttpNamespaceResponse {
  OperationId?: string;
}
export const UpdateHttpNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateHttpNamespaceResponse",
}) as any as S.Schema<UpdateHttpNamespaceResponse>;
export type CustomHealthStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export const CustomHealthStatus = S.String;

export interface UpdateInstanceCustomHealthStatusRequest {
  ServiceId: string;
  InstanceId: string;
  Status: CustomHealthStatus;
}
export const UpdateInstanceCustomHealthStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceId: S.String,
      InstanceId: S.String,
      Status: CustomHealthStatus,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateInstanceCustomHealthStatusRequest",
}) as any as S.Schema<UpdateInstanceCustomHealthStatusRequest>;
export interface UpdateInstanceCustomHealthStatusResponse {}
export const UpdateInstanceCustomHealthStatusResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateInstanceCustomHealthStatusResponse",
}) as any as S.Schema<UpdateInstanceCustomHealthStatusResponse>;
export interface SOAChange {
  TTL: number;
}
export const SOAChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TTL: S.Number }),
).annotate({ identifier: "SOAChange" }) as any as S.Schema<SOAChange>;
export interface PrivateDnsPropertiesMutableChange {
  SOA: SOAChange;
}
export const PrivateDnsPropertiesMutableChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SOA: SOAChange }),
).annotate({
  identifier: "PrivateDnsPropertiesMutableChange",
}) as any as S.Schema<PrivateDnsPropertiesMutableChange>;
export interface PrivateDnsNamespacePropertiesChange {
  DnsProperties: PrivateDnsPropertiesMutableChange;
}
export const PrivateDnsNamespacePropertiesChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DnsProperties: PrivateDnsPropertiesMutableChange }),
).annotate({
  identifier: "PrivateDnsNamespacePropertiesChange",
}) as any as S.Schema<PrivateDnsNamespacePropertiesChange>;
export interface PrivateDnsNamespaceChange {
  Description?: string;
  Properties?: PrivateDnsNamespacePropertiesChange;
}
export const PrivateDnsNamespaceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Properties: S.optional(PrivateDnsNamespacePropertiesChange),
  }),
).annotate({
  identifier: "PrivateDnsNamespaceChange",
}) as any as S.Schema<PrivateDnsNamespaceChange>;
export interface UpdatePrivateDnsNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: PrivateDnsNamespaceChange;
}
export const UpdatePrivateDnsNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Namespace: PrivateDnsNamespaceChange,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePrivateDnsNamespaceRequest",
}) as any as S.Schema<UpdatePrivateDnsNamespaceRequest>;
export interface UpdatePrivateDnsNamespaceResponse {
  OperationId?: string;
}
export const UpdatePrivateDnsNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "UpdatePrivateDnsNamespaceResponse",
}) as any as S.Schema<UpdatePrivateDnsNamespaceResponse>;
export interface PublicDnsPropertiesMutableChange {
  SOA: SOAChange;
}
export const PublicDnsPropertiesMutableChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SOA: SOAChange }),
).annotate({
  identifier: "PublicDnsPropertiesMutableChange",
}) as any as S.Schema<PublicDnsPropertiesMutableChange>;
export interface PublicDnsNamespacePropertiesChange {
  DnsProperties: PublicDnsPropertiesMutableChange;
}
export const PublicDnsNamespacePropertiesChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DnsProperties: PublicDnsPropertiesMutableChange }),
).annotate({
  identifier: "PublicDnsNamespacePropertiesChange",
}) as any as S.Schema<PublicDnsNamespacePropertiesChange>;
export interface PublicDnsNamespaceChange {
  Description?: string;
  Properties?: PublicDnsNamespacePropertiesChange;
}
export const PublicDnsNamespaceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Properties: S.optional(PublicDnsNamespacePropertiesChange),
  }),
).annotate({
  identifier: "PublicDnsNamespaceChange",
}) as any as S.Schema<PublicDnsNamespaceChange>;
export interface UpdatePublicDnsNamespaceRequest {
  Id: string;
  UpdaterRequestId?: string;
  Namespace: PublicDnsNamespaceChange;
}
export const UpdatePublicDnsNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    UpdaterRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Namespace: PublicDnsNamespaceChange,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePublicDnsNamespaceRequest",
}) as any as S.Schema<UpdatePublicDnsNamespaceRequest>;
export interface UpdatePublicDnsNamespaceResponse {
  OperationId?: string;
}
export const UpdatePublicDnsNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "UpdatePublicDnsNamespaceResponse",
}) as any as S.Schema<UpdatePublicDnsNamespaceResponse>;
export interface DnsConfigChange {
  DnsRecords: DnsRecord[];
}
export const DnsConfigChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DnsRecords: DnsRecordList }),
).annotate({
  identifier: "DnsConfigChange",
}) as any as S.Schema<DnsConfigChange>;
export interface ServiceChange {
  Description?: string;
  DnsConfig?: DnsConfigChange;
  HealthCheckConfig?: HealthCheckConfig;
}
export const ServiceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DnsConfig: S.optional(DnsConfigChange),
    HealthCheckConfig: S.optional(HealthCheckConfig),
  }),
).annotate({ identifier: "ServiceChange" }) as any as S.Schema<ServiceChange>;
export interface UpdateServiceRequest {
  Id: string;
  Service: ServiceChange;
}
export const UpdateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Service: ServiceChange }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceRequest",
}) as any as S.Schema<UpdateServiceRequest>;
export interface UpdateServiceResponse {
  OperationId?: string;
}
export const UpdateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateServiceResponse",
}) as any as S.Schema<UpdateServiceResponse>;
export interface UpdateServiceAttributesRequest {
  ServiceId: string;
  Attributes: { [key: string]: string | undefined };
}
export const UpdateServiceAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.String, Attributes: ServiceAttributesMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceAttributesRequest",
}) as any as S.Schema<UpdateServiceAttributesRequest>;
export interface UpdateServiceAttributesResponse {}
export const UpdateServiceAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateServiceAttributesResponse",
}) as any as S.Schema<UpdateServiceAttributesResponse>;
export type ErrorMessage = string;
export type CreateHttpNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an HTTP namespace. Service instances registered using an HTTP namespace can be
 * discovered using a `DiscoverInstances` request but can't be discovered using
 * DNS.
 *
 * For the current quota on the number of namespaces that you can create using the same Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const createHttpNamespace: API.OperationMethod<
  CreateHttpNamespaceRequest,
  CreateHttpNamespaceResponse,
  CreateHttpNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHttpNamespaceRequest,
  output: CreateHttpNamespaceResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHttpNamespace",
}));

export type CreatePrivateDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a private namespace based on DNS, which is visible only inside a specified Amazon
 * VPC. The namespace defines your service naming scheme. For example, if you name your namespace
 * `example.com` and name your service `backend`, the resulting DNS name for
 * the service is `backend.example.com`. Service instances that are registered using a
 * private DNS namespace can be discovered using either a `DiscoverInstances` request or
 * using DNS. For the current quota on the number of namespaces that you can create using the same
 * Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const createPrivateDnsNamespace: API.OperationMethod<
  CreatePrivateDnsNamespaceRequest,
  CreatePrivateDnsNamespaceResponse,
  CreatePrivateDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrivateDnsNamespaceRequest,
  output: CreatePrivateDnsNamespaceResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateDnsNamespace",
}));

export type CreatePublicDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceAlreadyExists
  | ResourceLimitExceeded
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a public namespace based on DNS, which is visible on the internet. The namespace
 * defines your service naming scheme. For example, if you name your namespace
 * `example.com` and name your service `backend`, the resulting DNS name for
 * the service is `backend.example.com`. You can discover instances that were registered
 * with a public DNS namespace by using either a `DiscoverInstances` request or using
 * DNS. For the current quota on the number of namespaces that you can create using the same Amazon Web Services account, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 *
 * The `CreatePublicDnsNamespace` API operation is not supported in the Amazon Web Services GovCloud (US) Regions.
 */
export const createPublicDnsNamespace: API.OperationMethod<
  CreatePublicDnsNamespaceRequest,
  CreatePublicDnsNamespaceResponse,
  CreatePublicDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePublicDnsNamespaceRequest,
  output: CreatePublicDnsNamespaceResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    NamespaceAlreadyExists,
    ResourceLimitExceeded,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublicDnsNamespace",
}));

export type CreateServiceError =
  | InvalidInput
  | NamespaceNotFound
  | ResourceLimitExceeded
  | ServiceAlreadyExists
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a service. This action defines the configuration for the following entities:
 *
 * - For public and private DNS namespaces, one of the following combinations of DNS records in
 * Amazon Route 53:
 *
 * - `A`
 *
 * - `AAAA`
 *
 * - `A` and `AAAA`
 *
 * - `SRV`
 *
 * - `CNAME`
 *
 * - Optionally, a health check
 *
 * After you create the service, you can submit a RegisterInstance request, and
 * Cloud Map uses the values in the configuration to create the specified entities.
 *
 * For the current quota on the number of instances that you can register using the same
 * namespace and using the same service, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceRequest,
  output: CreateServiceResponse,
  errors: [
    InvalidInput,
    NamespaceNotFound,
    ResourceLimitExceeded,
    ServiceAlreadyExists,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type DeleteNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Deletes a namespace from the current account. If the namespace still contains one or more
 * services, the request fails.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNamespaceRequest,
  output: DeleteNamespaceResponse,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
}));

export type DeleteServiceError =
  | InvalidInput
  | ResourceInUse
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes a specified service and all associated service attributes. If the service still
 * contains one or more registered instances, the request fails.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceRequest,
  output: DeleteServiceResponse,
  errors: [InvalidInput, ResourceInUse, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteServiceAttributesError =
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes specific attributes associated with a service.
 */
export const deleteServiceAttributes: API.OperationMethod<
  DeleteServiceAttributesRequest,
  DeleteServiceAttributesResponse,
  DeleteServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceAttributesRequest,
  output: DeleteServiceAttributesResponse,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAttributes",
}));

export type DeregisterInstanceError =
  | DuplicateRequest
  | InstanceNotFound
  | InvalidInput
  | ResourceInUse
  | ServiceNotFound
  | CommonErrors;
/**
 * Deletes the Amazon Route 53 DNS records and health check, if any, that Cloud Map created for the
 * specified instance.
 */
export const deregisterInstance: API.OperationMethod<
  DeregisterInstanceRequest,
  DeregisterInstanceResponse,
  DeregisterInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterInstanceRequest,
  output: DeregisterInstanceResponse,
  errors: [
    DuplicateRequest,
    InstanceNotFound,
    InvalidInput,
    ResourceInUse,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterInstance",
}));

export type DiscoverInstancesError =
  | InvalidInput
  | NamespaceNotFound
  | RequestLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Discovers registered instances for a specified namespace and service. You can use
 * `DiscoverInstances` to discover instances for any type of namespace.
 * `DiscoverInstances` returns a randomized list of instances allowing customers to
 * distribute traffic evenly across instances. For public and private DNS namespaces, you can also
 * use DNS queries to discover instances.
 */
export const discoverInstances: API.OperationMethod<
  DiscoverInstancesRequest,
  DiscoverInstancesResponse,
  DiscoverInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DiscoverInstancesRequest,
  output: DiscoverInstancesResponse,
  errors: [
    InvalidInput,
    NamespaceNotFound,
    RequestLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstances",
  endpointHostPrefix: "data-",
}));

export type DiscoverInstancesRevisionError =
  | InvalidInput
  | NamespaceNotFound
  | RequestLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Discovers the increasing revision associated with an instance.
 */
export const discoverInstancesRevision: API.OperationMethod<
  DiscoverInstancesRevisionRequest,
  DiscoverInstancesRevisionResponse,
  DiscoverInstancesRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DiscoverInstancesRevisionRequest,
  output: DiscoverInstancesRevisionResponse,
  errors: [
    InvalidInput,
    NamespaceNotFound,
    RequestLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInstancesRevision",
  endpointHostPrefix: "data-",
}));

export type GetInstanceError =
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Gets information about a specified instance.
 */
export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceRequest,
  output: GetInstanceResponse,
  errors: [InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstance",
}));

export type GetInstancesHealthStatusError =
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Gets the current health status (`Healthy`, `Unhealthy`, or
 * `Unknown`) of one or more instances that are associated with a specified
 * service.
 *
 * There's a brief delay between when you register an instance and when the health status for
 * the instance is available.
 */
export const getInstancesHealthStatus: API.PaginatedOperationMethod<
  GetInstancesHealthStatusRequest,
  GetInstancesHealthStatusResponse,
  GetInstancesHealthStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInstancesHealthStatusRequest,
  output: GetInstancesHealthStatusResponse,
  errors: [InstanceNotFound, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstancesHealthStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetNamespaceError = InvalidInput | NamespaceNotFound | CommonErrors;
/**
 * Gets information about a namespace.
 */
export const getNamespace: API.OperationMethod<
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNamespaceRequest,
  output: GetNamespaceResponse,
  errors: [InvalidInput, NamespaceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
}));

export type GetOperationError = InvalidInput | OperationNotFound | CommonErrors;
/**
 * Gets information about any operation that returns an operation ID in the response, such as a
 * `CreateHttpNamespace` request.
 *
 * To get a list of operations that match specified criteria, see ListOperations.
 */
export const getOperation: API.OperationMethod<
  GetOperationRequest,
  GetOperationResponse,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOperationRequest,
  output: GetOperationResponse,
  errors: [InvalidInput, OperationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
}));

export type GetServiceError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Gets the settings for a specified service.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceRequest,
  output: GetServiceResponse,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetServiceAttributesError =
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Returns the attributes associated with a specified service.
 */
export const getServiceAttributes: API.OperationMethod<
  GetServiceAttributesRequest,
  GetServiceAttributesResponse,
  GetServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceAttributesRequest,
  output: GetServiceAttributesResponse,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceAttributes",
}));

export type ListInstancesError = InvalidInput | ServiceNotFound | CommonErrors;
/**
 * Lists summary information about the instances that you registered by using a specified
 * service.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNamespacesError = InvalidInput | CommonErrors;
/**
 * Lists summary information about the namespaces that were created by the current Amazon Web Services account and shared with the current Amazon Web Services account.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationsError = InvalidInput | CommonErrors;
/**
 * Lists operations that match the criteria that you specify.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError = InvalidInput | CommonErrors;
/**
 * Lists summary information for all the services that are associated with one or more
 * namespaces.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [InvalidInput],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterInstanceError =
  | DuplicateRequest
  | InvalidInput
  | ResourceInUse
  | ResourceLimitExceeded
  | ServiceNotFound
  | CommonErrors;
/**
 * Creates or updates one or more records and, optionally, creates a health check based on the
 * settings in a specified service. When you submit a `RegisterInstance` request, the
 * following occurs:
 *
 * - For each DNS record that you define in the service that's specified by
 * `ServiceId`, a record is created or updated in the hosted zone that's associated
 * with the corresponding namespace.
 *
 * - If the service includes `HealthCheckConfig`, a health check is created based on
 * the settings in the health check configuration.
 *
 * - The health check, if any, is associated with each of the new or updated records.
 *
 * One `RegisterInstance` request must complete before you can submit another
 * request and specify the same service ID and instance ID.
 *
 * For more information, see CreateService.
 *
 * When Cloud Map receives a DNS query for the specified DNS name, it returns the applicable
 * value:
 *
 * - **If the health check is healthy**: returns all the
 * records
 *
 * - **If the health check is unhealthy**: returns the applicable
 * value for the last healthy instance
 *
 * - **If you didn't specify a health check configuration**:
 * returns all the records
 *
 * For the current quota on the number of instances that you can register using the same
 * namespace and using the same service, see Cloud Map quotas in the
 * *Cloud Map Developer Guide*.
 */
export const registerInstance: API.OperationMethod<
  RegisterInstanceRequest,
  RegisterInstanceResponse,
  RegisterInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterInstanceRequest,
  output: RegisterInstanceResponse,
  errors: [
    DuplicateRequest,
    InvalidInput,
    ResourceInUse,
    ResourceLimitExceeded,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterInstance",
}));

export type TagResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InvalidInput, ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidInput
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InvalidInput, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateHttpNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates an HTTP
 * namespace.
 */
export const updateHttpNamespace: API.OperationMethod<
  UpdateHttpNamespaceRequest,
  UpdateHttpNamespaceResponse,
  UpdateHttpNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHttpNamespaceRequest,
  output: UpdateHttpNamespaceResponse,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHttpNamespace",
}));

export type UpdateInstanceCustomHealthStatusError =
  | CustomHealthNotFound
  | InstanceNotFound
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to change the health status of a custom health check to healthy or
 * unhealthy.
 *
 * You can use `UpdateInstanceCustomHealthStatus` to change the status only for
 * custom health checks, which you define using `HealthCheckCustomConfig` when you create
 * a service. You can't use it to change the status for Route 53 health checks, which you define using
 * `HealthCheckConfig`.
 *
 * For more information, see HealthCheckCustomConfig.
 */
export const updateInstanceCustomHealthStatus: API.OperationMethod<
  UpdateInstanceCustomHealthStatusRequest,
  UpdateInstanceCustomHealthStatusResponse,
  UpdateInstanceCustomHealthStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInstanceCustomHealthStatusRequest,
  output: UpdateInstanceCustomHealthStatusResponse,
  errors: [
    CustomHealthNotFound,
    InstanceNotFound,
    InvalidInput,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceCustomHealthStatus",
}));

export type UpdatePrivateDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates a private DNS
 * namespace.
 */
export const updatePrivateDnsNamespace: API.OperationMethod<
  UpdatePrivateDnsNamespaceRequest,
  UpdatePrivateDnsNamespaceResponse,
  UpdatePrivateDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePrivateDnsNamespaceRequest,
  output: UpdatePrivateDnsNamespaceResponse,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrivateDnsNamespace",
}));

export type UpdatePublicDnsNamespaceError =
  | DuplicateRequest
  | InvalidInput
  | NamespaceNotFound
  | ResourceInUse
  | CommonErrors;
/**
 * Updates a public DNS namespace.
 */
export const updatePublicDnsNamespace: API.OperationMethod<
  UpdatePublicDnsNamespaceRequest,
  UpdatePublicDnsNamespaceResponse,
  UpdatePublicDnsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePublicDnsNamespaceRequest,
  output: UpdatePublicDnsNamespaceResponse,
  errors: [DuplicateRequest, InvalidInput, NamespaceNotFound, ResourceInUse],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublicDnsNamespace",
}));

export type UpdateServiceError =
  | DuplicateRequest
  | InvalidInput
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to perform the following operations:
 *
 * - Update the TTL setting for existing `DnsRecords` configurations
 *
 * - Add, update, or delete `HealthCheckConfig` for a specified service
 *
 * You can't add, update, or delete a `HealthCheckCustomConfig`
 * configuration.
 *
 * For public and private DNS namespaces, note the following:
 *
 * - If you omit any existing `DnsRecords` or `HealthCheckConfig`
 * configurations from an `UpdateService` request, the configurations are deleted from
 * the service.
 *
 * - If you omit an existing `HealthCheckCustomConfig` configuration from an
 * `UpdateService` request, the configuration isn't deleted from the service.
 *
 * You can't call `UpdateService` and update settings in the following
 * scenarios:
 *
 * - When the service is associated with an HTTP namespace
 *
 * - When the service is associated with a shared namespace and contains instances that were
 * registered by Amazon Web Services accounts other than the account making the `UpdateService`
 * call
 *
 * When you update settings for a service, Cloud Map also updates the corresponding settings
 * in all the records and health checks that were created by using the specified service.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceRequest,
  output: UpdateServiceResponse,
  errors: [DuplicateRequest, InvalidInput, ServiceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateServiceAttributesError =
  | InvalidInput
  | ServiceAttributesLimitExceededException
  | ServiceNotFound
  | CommonErrors;
/**
 * Submits a request to update a specified service to add service-level attributes.
 */
export const updateServiceAttributes: API.OperationMethod<
  UpdateServiceAttributesRequest,
  UpdateServiceAttributesResponse,
  UpdateServiceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceAttributesRequest,
  output: UpdateServiceAttributesResponse,
  errors: [
    InvalidInput,
    ServiceAttributesLimitExceededException,
    ServiceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAttributes",
}));
