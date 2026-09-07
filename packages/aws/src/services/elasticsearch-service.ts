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
const ns = T.XmlNamespace("http://es.amazonaws.com/doc/2015-01-01/");
const svc = T.AwsApiService({
  sdkId: "Elasticsearch Service",
  serviceShapeName: "AmazonElasticsearchService2015",
});
const auth = T.AwsAuthSigv4({ name: "es" });
const ver = T.ServiceVersion("2015-01-01");
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
              `https://es-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://es-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://aos.${Region}.api.aws`);
            }
            if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
              return e(`https://aos.${Region}.api.amazonwebservices.com.cn`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://aos.${Region}.api.aws`);
            }
            return e(
              `https://es.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://es.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BaseException
  extends /*@__PURE__*/ S.TaggedError<BaseException>()("BaseException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DisabledOperationException
  extends /*@__PURE__*/ S.TaggedError<DisabledOperationException>()(
    "DisabledOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeException>()(
    "InvalidTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CrossClusterSearchConnectionId = string;
export interface AcceptInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export const AcceptInboundCrossClusterSearchConnectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnectionId: S.String.pipe(
        T.HttpLabel("CrossClusterSearchConnectionId"),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/accept",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AcceptInboundCrossClusterSearchConnectionRequest",
  }) as any as S.Schema<AcceptInboundCrossClusterSearchConnectionRequest>;
export type OwnerId = string;
export type DomainName = string;
export type Region = string;
export interface DomainInformation {
  OwnerId?: string;
  DomainName: string;
  Region?: string;
}
export const DomainInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    DomainName: S.String,
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainInformation",
}) as any as S.Schema<DomainInformation>;
export type InboundCrossClusterSearchConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const InboundCrossClusterSearchConnectionStatusCode = S.String;

export type CrossClusterSearchConnectionStatusMessage = string;
export interface InboundCrossClusterSearchConnectionStatus {
  StatusCode?: InboundCrossClusterSearchConnectionStatusCode;
  Message?: string;
}
export const InboundCrossClusterSearchConnectionStatus =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StatusCode: S.optional(InboundCrossClusterSearchConnectionStatusCode),
      Message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "InboundCrossClusterSearchConnectionStatus",
  }) as any as S.Schema<InboundCrossClusterSearchConnectionStatus>;
export interface InboundCrossClusterSearchConnection {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  CrossClusterSearchConnectionId?: string;
  ConnectionStatus?: InboundCrossClusterSearchConnectionStatus;
}
export const InboundCrossClusterSearchConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceDomainInfo: S.optional(DomainInformation),
    DestinationDomainInfo: S.optional(DomainInformation),
    CrossClusterSearchConnectionId: S.optional(S.String),
    ConnectionStatus: S.optional(InboundCrossClusterSearchConnectionStatus),
  }),
).annotate({
  identifier: "InboundCrossClusterSearchConnection",
}) as any as S.Schema<InboundCrossClusterSearchConnection>;
export interface AcceptInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export const AcceptInboundCrossClusterSearchConnectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnection: S.optional(
        InboundCrossClusterSearchConnection,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "AcceptInboundCrossClusterSearchConnectionResponse",
  }) as any as S.Schema<AcceptInboundCrossClusterSearchConnectionResponse>;
export type ARN = string;
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
export interface AddTagsRequest {
  ARN: string;
  TagList: Tag[];
}
export const AddTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String, TagList: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "AddTagsRequest" }) as any as S.Schema<AddTagsRequest>;
export interface AddTagsResponse {}
export const AddTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsResponse",
}) as any as S.Schema<AddTagsResponse>;
export type PackageID = string;
export interface AssociatePackageRequest {
  PackageID: string;
  DomainName: string;
}
export const AssociatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String.pipe(T.HttpLabel("PackageID")),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2015-01-01/packages/associate/{PackageID}/{DomainName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePackageRequest",
}) as any as S.Schema<AssociatePackageRequest>;
export type PackageName = string;
export type PackageType = "TXT-DICTIONARY" | (string & {});
export const PackageType = S.String;

export type LastUpdated = Date;
export type DomainPackageStatus =
  | "ASSOCIATING"
  | "ASSOCIATION_FAILED"
  | "ACTIVE"
  | "DISSOCIATING"
  | "DISSOCIATION_FAILED"
  | (string & {});
export const DomainPackageStatus = S.String;

export type PackageVersion = string;
export type ReferencePath = string;
export type ErrorType = string;
export type ErrorMessage = string;
export interface ErrorDetails {
  ErrorType?: string;
  ErrorMessage?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorType: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface DomainPackageDetails {
  PackageID?: string;
  PackageName?: string;
  PackageType?: PackageType;
  LastUpdated?: Date;
  DomainName?: string;
  DomainPackageStatus?: DomainPackageStatus;
  PackageVersion?: string;
  ReferencePath?: string;
  ErrorDetails?: ErrorDetails;
}
export const DomainPackageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.optional(S.String),
    PackageName: S.optional(S.String),
    PackageType: S.optional(PackageType),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DomainName: S.optional(S.String),
    DomainPackageStatus: S.optional(DomainPackageStatus),
    PackageVersion: S.optional(S.String),
    ReferencePath: S.optional(S.String),
    ErrorDetails: S.optional(ErrorDetails),
  }),
).annotate({
  identifier: "DomainPackageDetails",
}) as any as S.Schema<DomainPackageDetails>;
export interface AssociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export const AssociatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainPackageDetails: S.optional(DomainPackageDetails) }).pipe(ns),
).annotate({
  identifier: "AssociatePackageResponse",
}) as any as S.Schema<AssociatePackageResponse>;
export type AWSAccount = string;
export interface AuthorizeVpcEndpointAccessRequest {
  DomainName: string;
  Account: string;
}
export const AuthorizeVpcEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Account: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2015-01-01/es/domain/{DomainName}/authorizeVpcEndpointAccess",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AuthorizeVpcEndpointAccessRequest",
}) as any as S.Schema<AuthorizeVpcEndpointAccessRequest>;
export type PrincipalType = "AWS_ACCOUNT" | "AWS_SERVICE" | (string & {});
export const PrincipalType = S.String;

export interface AuthorizedPrincipal {
  PrincipalType?: PrincipalType;
  Principal?: string;
}
export const AuthorizedPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalType: S.optional(PrincipalType),
    Principal: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthorizedPrincipal",
}) as any as S.Schema<AuthorizedPrincipal>;
export interface AuthorizeVpcEndpointAccessResponse {
  AuthorizedPrincipal: AuthorizedPrincipal;
}
export const AuthorizeVpcEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthorizedPrincipal: AuthorizedPrincipal }).pipe(ns),
).annotate({
  identifier: "AuthorizeVpcEndpointAccessResponse",
}) as any as S.Schema<AuthorizeVpcEndpointAccessResponse>;
export type DryRun = boolean;
export interface CancelDomainConfigChangeRequest {
  DomainName: string;
  DryRun?: boolean;
}
export const CancelDomainConfigChangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2015-01-01/es/domain/{DomainName}/config/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelDomainConfigChangeRequest",
}) as any as S.Schema<CancelDomainConfigChangeRequest>;
export type GUID = string;
export type GUIDList = string[];
export const GUIDList = /*@__PURE__*/ S.Array(S.String);
export interface CancelledChangeProperty {
  PropertyName?: string;
  CancelledValue?: string;
  ActiveValue?: string;
}
export const CancelledChangeProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PropertyName: S.optional(S.String),
    CancelledValue: S.optional(S.String),
    ActiveValue: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelledChangeProperty",
}) as any as S.Schema<CancelledChangeProperty>;
export type CancelledChangePropertyList = CancelledChangeProperty[];
export const CancelledChangePropertyList = /*@__PURE__*/ S.Array(
  CancelledChangeProperty,
);
export interface CancelDomainConfigChangeResponse {
  DryRun?: boolean;
  CancelledChangeIds?: string[];
  CancelledChangeProperties?: CancelledChangeProperty[];
}
export const CancelDomainConfigChangeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DryRun: S.optional(S.Boolean),
    CancelledChangeIds: S.optional(GUIDList),
    CancelledChangeProperties: S.optional(CancelledChangePropertyList),
  }).pipe(ns),
).annotate({
  identifier: "CancelDomainConfigChangeResponse",
}) as any as S.Schema<CancelDomainConfigChangeResponse>;
export interface CancelElasticsearchServiceSoftwareUpdateRequest {
  DomainName: string;
}
export const CancelElasticsearchServiceSoftwareUpdateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DomainName: S.String }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/serviceSoftwareUpdate/cancel",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CancelElasticsearchServiceSoftwareUpdateRequest",
  }) as any as S.Schema<CancelElasticsearchServiceSoftwareUpdateRequest>;
export type DeploymentStatus =
  | "PENDING_UPDATE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | (string & {});
export const DeploymentStatus = S.String;

export type DeploymentCloseDateTimeStamp = Date;
export interface ServiceSoftwareOptions {
  CurrentVersion?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  Cancellable?: boolean;
  UpdateStatus?: DeploymentStatus;
  Description?: string;
  AutomatedUpdateDate?: Date;
  OptionalDeployment?: boolean;
}
export const ServiceSoftwareOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentVersion: S.optional(S.String),
    NewVersion: S.optional(S.String),
    UpdateAvailable: S.optional(S.Boolean),
    Cancellable: S.optional(S.Boolean),
    UpdateStatus: S.optional(DeploymentStatus),
    Description: S.optional(S.String),
    AutomatedUpdateDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OptionalDeployment: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ServiceSoftwareOptions",
}) as any as S.Schema<ServiceSoftwareOptions>;
export interface CancelElasticsearchServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export const CancelElasticsearchServiceSoftwareUpdateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceSoftwareOptions: S.optional(ServiceSoftwareOptions),
    }).pipe(ns),
  ).annotate({
    identifier: "CancelElasticsearchServiceSoftwareUpdateResponse",
  }) as any as S.Schema<CancelElasticsearchServiceSoftwareUpdateResponse>;
export type ElasticsearchVersionString = string;
export type ESPartitionInstanceType =
  | "m3.medium.elasticsearch"
  | "m3.large.elasticsearch"
  | "m3.xlarge.elasticsearch"
  | "m3.2xlarge.elasticsearch"
  | "m4.large.elasticsearch"
  | "m4.xlarge.elasticsearch"
  | "m4.2xlarge.elasticsearch"
  | "m4.4xlarge.elasticsearch"
  | "m4.10xlarge.elasticsearch"
  | "m5.large.elasticsearch"
  | "m5.xlarge.elasticsearch"
  | "m5.2xlarge.elasticsearch"
  | "m5.4xlarge.elasticsearch"
  | "m5.12xlarge.elasticsearch"
  | "r5.large.elasticsearch"
  | "r5.xlarge.elasticsearch"
  | "r5.2xlarge.elasticsearch"
  | "r5.4xlarge.elasticsearch"
  | "r5.12xlarge.elasticsearch"
  | "c5.large.elasticsearch"
  | "c5.xlarge.elasticsearch"
  | "c5.2xlarge.elasticsearch"
  | "c5.4xlarge.elasticsearch"
  | "c5.9xlarge.elasticsearch"
  | "c5.18xlarge.elasticsearch"
  | "ultrawarm1.medium.elasticsearch"
  | "ultrawarm1.large.elasticsearch"
  | "t2.micro.elasticsearch"
  | "t2.small.elasticsearch"
  | "t2.medium.elasticsearch"
  | "r3.large.elasticsearch"
  | "r3.xlarge.elasticsearch"
  | "r3.2xlarge.elasticsearch"
  | "r3.4xlarge.elasticsearch"
  | "r3.8xlarge.elasticsearch"
  | "i2.xlarge.elasticsearch"
  | "i2.2xlarge.elasticsearch"
  | "d2.xlarge.elasticsearch"
  | "d2.2xlarge.elasticsearch"
  | "d2.4xlarge.elasticsearch"
  | "d2.8xlarge.elasticsearch"
  | "c4.large.elasticsearch"
  | "c4.xlarge.elasticsearch"
  | "c4.2xlarge.elasticsearch"
  | "c4.4xlarge.elasticsearch"
  | "c4.8xlarge.elasticsearch"
  | "r4.large.elasticsearch"
  | "r4.xlarge.elasticsearch"
  | "r4.2xlarge.elasticsearch"
  | "r4.4xlarge.elasticsearch"
  | "r4.8xlarge.elasticsearch"
  | "r4.16xlarge.elasticsearch"
  | "i3.large.elasticsearch"
  | "i3.xlarge.elasticsearch"
  | "i3.2xlarge.elasticsearch"
  | "i3.4xlarge.elasticsearch"
  | "i3.8xlarge.elasticsearch"
  | "i3.16xlarge.elasticsearch"
  | (string & {});
export const ESPartitionInstanceType = S.String;

export type IntegerClass = number;
export interface ZoneAwarenessConfig {
  AvailabilityZoneCount?: number;
}
export const ZoneAwarenessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityZoneCount: S.optional(S.Number) }),
).annotate({
  identifier: "ZoneAwarenessConfig",
}) as any as S.Schema<ZoneAwarenessConfig>;
export type ESWarmPartitionInstanceType =
  | "ultrawarm1.medium.elasticsearch"
  | "ultrawarm1.large.elasticsearch"
  | (string & {});
export const ESWarmPartitionInstanceType = S.String;

export interface ColdStorageOptions {
  Enabled: boolean;
}
export const ColdStorageOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean }),
).annotate({
  identifier: "ColdStorageOptions",
}) as any as S.Schema<ColdStorageOptions>;
export interface ElasticsearchClusterConfig {
  InstanceType?: ESPartitionInstanceType;
  InstanceCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessEnabled?: boolean;
  ZoneAwarenessConfig?: ZoneAwarenessConfig;
  DedicatedMasterType?: ESPartitionInstanceType;
  DedicatedMasterCount?: number;
  WarmEnabled?: boolean;
  WarmType?: ESWarmPartitionInstanceType;
  WarmCount?: number;
  ColdStorageOptions?: ColdStorageOptions;
}
export const ElasticsearchClusterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(ESPartitionInstanceType),
    InstanceCount: S.optional(S.Number),
    DedicatedMasterEnabled: S.optional(S.Boolean),
    ZoneAwarenessEnabled: S.optional(S.Boolean),
    ZoneAwarenessConfig: S.optional(ZoneAwarenessConfig),
    DedicatedMasterType: S.optional(ESPartitionInstanceType),
    DedicatedMasterCount: S.optional(S.Number),
    WarmEnabled: S.optional(S.Boolean),
    WarmType: S.optional(ESWarmPartitionInstanceType),
    WarmCount: S.optional(S.Number),
    ColdStorageOptions: S.optional(ColdStorageOptions),
  }),
).annotate({
  identifier: "ElasticsearchClusterConfig",
}) as any as S.Schema<ElasticsearchClusterConfig>;
export type VolumeType = "standard" | "gp2" | "io1" | "gp3" | (string & {});
export const VolumeType = S.String;

export interface EBSOptions {
  EBSEnabled?: boolean;
  VolumeType?: VolumeType;
  VolumeSize?: number;
  Iops?: number;
  Throughput?: number;
}
export const EBSOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EBSEnabled: S.optional(S.Boolean),
    VolumeType: S.optional(VolumeType),
    VolumeSize: S.optional(S.Number),
    Iops: S.optional(S.Number),
    Throughput: S.optional(S.Number),
  }),
).annotate({ identifier: "EBSOptions" }) as any as S.Schema<EBSOptions>;
export type PolicyDocument = string;
export interface SnapshotOptions {
  AutomatedSnapshotStartHour?: number;
}
export const SnapshotOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomatedSnapshotStartHour: S.optional(S.Number) }),
).annotate({
  identifier: "SnapshotOptions",
}) as any as S.Schema<SnapshotOptions>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface VPCOptions {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export const VPCOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(StringList),
    SecurityGroupIds: S.optional(StringList),
  }),
).annotate({ identifier: "VPCOptions" }) as any as S.Schema<VPCOptions>;
export type UserPoolId = string;
export type IdentityPoolId = string;
export type RoleArn = string;
export interface CognitoOptions {
  Enabled?: boolean;
  UserPoolId?: string;
  IdentityPoolId?: string;
  RoleArn?: string;
}
export const CognitoOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    UserPoolId: S.optional(S.String),
    IdentityPoolId: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "CognitoOptions" }) as any as S.Schema<CognitoOptions>;
export type KmsKeyId = string;
export interface EncryptionAtRestOptions {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export const EncryptionAtRestOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean), KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionAtRestOptions",
}) as any as S.Schema<EncryptionAtRestOptions>;
export interface NodeToNodeEncryptionOptions {
  Enabled?: boolean;
}
export const NodeToNodeEncryptionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "NodeToNodeEncryptionOptions",
}) as any as S.Schema<NodeToNodeEncryptionOptions>;
export type AdvancedOptions = { [key: string]: string | undefined };
export const AdvancedOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type LogType =
  | "INDEX_SLOW_LOGS"
  | "SEARCH_SLOW_LOGS"
  | "ES_APPLICATION_LOGS"
  | "AUDIT_LOGS"
  | (string & {});
export const LogType = S.String;

export type CloudWatchLogsLogGroupArn = string;
export interface LogPublishingOption {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export const LogPublishingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LogPublishingOption",
}) as any as S.Schema<LogPublishingOption>;
export type LogPublishingOptions = { [key in LogType]?: LogPublishingOption };
export const LogPublishingOptions = /*@__PURE__*/ S.Record(
  LogType,
  LogPublishingOption.pipe(S.optional),
);
export type TLSSecurityPolicy =
  | "Policy-Min-TLS-1-0-2019-07"
  | "Policy-Min-TLS-1-2-2019-07"
  | "Policy-Min-TLS-1-2-PFS-2023-10"
  | "Policy-Min-TLS-1-2-RFC9151-FIPS-2024-08"
  | (string & {});
export const TLSSecurityPolicy = S.String;

export type DomainNameFqdn = string;
export interface DomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: TLSSecurityPolicy;
  CustomEndpointEnabled?: boolean;
  CustomEndpoint?: string;
  CustomEndpointCertificateArn?: string;
}
export const DomainEndpointOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnforceHTTPS: S.optional(S.Boolean),
    TLSSecurityPolicy: S.optional(TLSSecurityPolicy),
    CustomEndpointEnabled: S.optional(S.Boolean),
    CustomEndpoint: S.optional(S.String),
    CustomEndpointCertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainEndpointOptions",
}) as any as S.Schema<DomainEndpointOptions>;
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export interface MasterUserOptions {
  MasterUserARN?: string;
  MasterUserName?: string | redacted.Redacted<string>;
  MasterUserPassword?: string | redacted.Redacted<string>;
}
export const MasterUserOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterUserARN: S.optional(S.String),
    MasterUserName: S.optional(SensitiveString),
    MasterUserPassword: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MasterUserOptions",
}) as any as S.Schema<MasterUserOptions>;
export type SAMLMetadata = string;
export type SAMLEntityId = string;
export interface SAMLIdp {
  MetadataContent: string;
  EntityId: string;
}
export const SAMLIdp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetadataContent: S.String, EntityId: S.String }),
).annotate({ identifier: "SAMLIdp" }) as any as S.Schema<SAMLIdp>;
export type BackendRole = string;
export interface SAMLOptionsInput {
  Enabled?: boolean;
  Idp?: SAMLIdp;
  MasterUserName?: string | redacted.Redacted<string>;
  MasterBackendRole?: string;
  SubjectKey?: string;
  RolesKey?: string;
  SessionTimeoutMinutes?: number;
}
export const SAMLOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    Idp: S.optional(SAMLIdp),
    MasterUserName: S.optional(SensitiveString),
    MasterBackendRole: S.optional(S.String),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
    SessionTimeoutMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "SAMLOptionsInput",
}) as any as S.Schema<SAMLOptionsInput>;
export interface AdvancedSecurityOptionsInput {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: MasterUserOptions;
  SAMLOptions?: SAMLOptionsInput;
  AnonymousAuthEnabled?: boolean;
}
export const AdvancedSecurityOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    InternalUserDatabaseEnabled: S.optional(S.Boolean),
    MasterUserOptions: S.optional(MasterUserOptions),
    SAMLOptions: S.optional(SAMLOptionsInput),
    AnonymousAuthEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AdvancedSecurityOptionsInput",
}) as any as S.Schema<AdvancedSecurityOptionsInput>;
export type AutoTuneDesiredState = "ENABLED" | "DISABLED" | (string & {});
export const AutoTuneDesiredState = S.String;

export type StartAt = Date;
export type DurationValue = number;
export type TimeUnit = "HOURS" | (string & {});
export const TimeUnit = S.String;

export interface Duration {
  Value?: number;
  Unit?: TimeUnit;
}
export const Duration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Number), Unit: S.optional(TimeUnit) }),
).annotate({ identifier: "Duration" }) as any as S.Schema<Duration>;
export interface AutoTuneMaintenanceSchedule {
  StartAt?: Date;
  Duration?: Duration;
  CronExpressionForRecurrence?: string;
}
export const AutoTuneMaintenanceSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(Duration),
    CronExpressionForRecurrence: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoTuneMaintenanceSchedule",
}) as any as S.Schema<AutoTuneMaintenanceSchedule>;
export type AutoTuneMaintenanceScheduleList = AutoTuneMaintenanceSchedule[];
export const AutoTuneMaintenanceScheduleList = /*@__PURE__*/ S.Array(
  AutoTuneMaintenanceSchedule,
);
export interface AutoTuneOptionsInput {
  DesiredState?: AutoTuneDesiredState;
  MaintenanceSchedules?: AutoTuneMaintenanceSchedule[];
}
export const AutoTuneOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.optional(AutoTuneDesiredState),
    MaintenanceSchedules: S.optional(AutoTuneMaintenanceScheduleList),
  }),
).annotate({
  identifier: "AutoTuneOptionsInput",
}) as any as S.Schema<AutoTuneOptionsInput>;
export type DeploymentStrategy =
  | "Default"
  | "CapacityOptimized"
  | (string & {});
export const DeploymentStrategy = S.String;

export interface DeploymentStrategyOptions {
  DeploymentStrategy: DeploymentStrategy;
}
export const DeploymentStrategyOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeploymentStrategy: DeploymentStrategy }),
).annotate({
  identifier: "DeploymentStrategyOptions",
}) as any as S.Schema<DeploymentStrategyOptions>;
export type UpdateTimestamp = Date;
export interface AutomatedSnapshotPauseRequestOptions {
  Enabled: boolean;
  StartTime?: Date;
  EndTime?: Date;
}
export const AutomatedSnapshotPauseRequestOptions = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Enabled: S.Boolean,
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "AutomatedSnapshotPauseRequestOptions",
}) as any as S.Schema<AutomatedSnapshotPauseRequestOptions>;
export type DomainUseCase =
  | "SEARCH"
  | "VECTOR"
  | "OBSERVABILITY"
  | "MIXED"
  | (string & {});
export const DomainUseCase = S.String;

export type DomainEngineMode = "GENERAL" | "OPTIMIZED" | (string & {});
export const DomainEngineMode = S.String;

export interface CreateElasticsearchDomainRequest {
  DomainName: string;
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  AutoTuneOptions?: AutoTuneOptionsInput;
  TagList?: Tag[];
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export const CreateElasticsearchDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ElasticsearchVersion: S.optional(S.String),
    ElasticsearchClusterConfig: S.optional(ElasticsearchClusterConfig),
    EBSOptions: S.optional(EBSOptions),
    AccessPolicies: S.optional(S.String),
    SnapshotOptions: S.optional(SnapshotOptions),
    VPCOptions: S.optional(VPCOptions),
    CognitoOptions: S.optional(CognitoOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptions),
    AdvancedOptions: S.optional(AdvancedOptions),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    DomainEndpointOptions: S.optional(DomainEndpointOptions),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsInput),
    AutoTuneOptions: S.optional(AutoTuneOptionsInput),
    TagList: S.optional(TagList),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
    AutomatedSnapshotPauseOptions: S.optional(
      AutomatedSnapshotPauseRequestOptions,
    ),
    UseCase: S.optional(DomainUseCase),
    EngineMode: S.optional(DomainEngineMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/domain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateElasticsearchDomainRequest",
}) as any as S.Schema<CreateElasticsearchDomainRequest>;
export type DomainId = string;
export type ServiceUrl = string;
export type EndpointsMap = { [key: string]: string | undefined };
export const EndpointsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface VPCDerivedInfo {
  VPCId?: string;
  SubnetIds?: string[];
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
}
export const VPCDerivedInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VPCId: S.optional(S.String),
    SubnetIds: S.optional(StringList),
    AvailabilityZones: S.optional(StringList),
    SecurityGroupIds: S.optional(StringList),
  }),
).annotate({ identifier: "VPCDerivedInfo" }) as any as S.Schema<VPCDerivedInfo>;
export interface SAMLOptionsOutput {
  Enabled?: boolean;
  Idp?: SAMLIdp;
  SubjectKey?: string;
  RolesKey?: string;
  SessionTimeoutMinutes?: number;
}
export const SAMLOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    Idp: S.optional(SAMLIdp),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
    SessionTimeoutMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "SAMLOptionsOutput",
}) as any as S.Schema<SAMLOptionsOutput>;
export type DisableTimestamp = Date;
export interface AdvancedSecurityOptions {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  SAMLOptions?: SAMLOptionsOutput;
  AnonymousAuthDisableDate?: Date;
  AnonymousAuthEnabled?: boolean;
}
export const AdvancedSecurityOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    InternalUserDatabaseEnabled: S.optional(S.Boolean),
    SAMLOptions: S.optional(SAMLOptionsOutput),
    AnonymousAuthDisableDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AnonymousAuthEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AdvancedSecurityOptions",
}) as any as S.Schema<AdvancedSecurityOptions>;
export type AutoTuneState =
  | "ENABLED"
  | "DISABLED"
  | "ENABLE_IN_PROGRESS"
  | "DISABLE_IN_PROGRESS"
  | "DISABLED_AND_ROLLBACK_SCHEDULED"
  | "DISABLED_AND_ROLLBACK_IN_PROGRESS"
  | "DISABLED_AND_ROLLBACK_COMPLETE"
  | "DISABLED_AND_ROLLBACK_ERROR"
  | "ERROR"
  | (string & {});
export const AutoTuneState = S.String;

export interface AutoTuneOptionsOutput {
  State?: AutoTuneState;
  ErrorMessage?: string;
}
export const AutoTuneOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(AutoTuneState),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoTuneOptionsOutput",
}) as any as S.Schema<AutoTuneOptionsOutput>;
export type Message = string;
export type ConfigChangeStatus =
  | "Pending"
  | "Initializing"
  | "Validating"
  | "ValidationFailed"
  | "ApplyingChanges"
  | "Completed"
  | "PendingUserInput"
  | "Cancelled"
  | (string & {});
export const ConfigChangeStatus = S.String;

export type InitiatedBy = "CUSTOMER" | "SERVICE" | (string & {});
export const InitiatedBy = S.String;

export interface ChangeProgressDetails {
  ChangeId?: string;
  Message?: string;
  ConfigChangeStatus?: ConfigChangeStatus;
  StartTime?: Date;
  LastUpdatedTime?: Date;
  InitiatedBy?: InitiatedBy;
}
export const ChangeProgressDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeId: S.optional(S.String),
    Message: S.optional(S.String),
    ConfigChangeStatus: S.optional(ConfigChangeStatus),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InitiatedBy: S.optional(InitiatedBy),
  }),
).annotate({
  identifier: "ChangeProgressDetails",
}) as any as S.Schema<ChangeProgressDetails>;
export type DomainProcessingStatusType =
  | "Creating"
  | "Active"
  | "Modifying"
  | "UpgradingEngineVersion"
  | "UpdatingServiceSoftware"
  | "Isolated"
  | "Deleting"
  | (string & {});
export const DomainProcessingStatusType = S.String;

export type PropertyValueType =
  | "PLAIN_TEXT"
  | "STRINGIFIED_JSON"
  | (string & {});
export const PropertyValueType = S.String;

export interface ModifyingProperties {
  Name?: string;
  ActiveValue?: string;
  PendingValue?: string;
  ValueType?: PropertyValueType;
}
export const ModifyingProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ActiveValue: S.optional(S.String),
    PendingValue: S.optional(S.String),
    ValueType: S.optional(PropertyValueType),
  }),
).annotate({
  identifier: "ModifyingProperties",
}) as any as S.Schema<ModifyingProperties>;
export type ModifyingPropertiesList = ModifyingProperties[];
export const ModifyingPropertiesList =
  /*@__PURE__*/ S.Array(ModifyingProperties);
export type PauseState =
  | "Active"
  | "Completed"
  | "Scheduled"
  | "Disabled"
  | (string & {});
export const PauseState = S.String;

export interface AutomatedSnapshotPauseOptions {
  Enabled: boolean;
  StartTime?: Date;
  EndTime?: Date;
  State?: PauseState;
}
export const AutomatedSnapshotPauseOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(PauseState),
  }),
).annotate({
  identifier: "AutomatedSnapshotPauseOptions",
}) as any as S.Schema<AutomatedSnapshotPauseOptions>;
export interface ElasticsearchDomainStatus {
  DomainId: string;
  DomainName: string;
  ARN: string;
  Created?: boolean;
  Deleted?: boolean;
  Endpoint?: string;
  Endpoints?: { [key: string]: string | undefined };
  Processing?: boolean;
  UpgradeProcessing?: boolean;
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCDerivedInfo;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptions;
  AutoTuneOptions?: AutoTuneOptionsOutput;
  ChangeProgressDetails?: ChangeProgressDetails;
  DomainProcessingStatus?: DomainProcessingStatusType;
  ModifyingProperties?: ModifyingProperties[];
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export const ElasticsearchDomainStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    DomainName: S.String,
    ARN: S.String,
    Created: S.optional(S.Boolean),
    Deleted: S.optional(S.Boolean),
    Endpoint: S.optional(S.String),
    Endpoints: S.optional(EndpointsMap),
    Processing: S.optional(S.Boolean),
    UpgradeProcessing: S.optional(S.Boolean),
    ElasticsearchVersion: S.optional(S.String),
    ElasticsearchClusterConfig: ElasticsearchClusterConfig,
    EBSOptions: S.optional(EBSOptions),
    AccessPolicies: S.optional(S.String),
    SnapshotOptions: S.optional(SnapshotOptions),
    VPCOptions: S.optional(VPCDerivedInfo),
    CognitoOptions: S.optional(CognitoOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptions),
    AdvancedOptions: S.optional(AdvancedOptions),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    ServiceSoftwareOptions: S.optional(ServiceSoftwareOptions),
    DomainEndpointOptions: S.optional(DomainEndpointOptions),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptions),
    AutoTuneOptions: S.optional(AutoTuneOptionsOutput),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
    DomainProcessingStatus: S.optional(DomainProcessingStatusType),
    ModifyingProperties: S.optional(ModifyingPropertiesList),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
    AutomatedSnapshotPauseOptions: S.optional(AutomatedSnapshotPauseOptions),
    UseCase: S.optional(DomainUseCase),
    EngineMode: S.optional(DomainEngineMode),
  }),
).annotate({
  identifier: "ElasticsearchDomainStatus",
}) as any as S.Schema<ElasticsearchDomainStatus>;
export interface CreateElasticsearchDomainResponse {
  DomainStatus?: ElasticsearchDomainStatus;
}
export const CreateElasticsearchDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(ElasticsearchDomainStatus) }).pipe(ns),
).annotate({
  identifier: "CreateElasticsearchDomainResponse",
}) as any as S.Schema<CreateElasticsearchDomainResponse>;
export type ConnectionAlias = string;
export interface CreateOutboundCrossClusterSearchConnectionRequest {
  SourceDomainInfo: DomainInformation;
  DestinationDomainInfo: DomainInformation;
  ConnectionAlias: string;
}
export const CreateOutboundCrossClusterSearchConnectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SourceDomainInfo: DomainInformation,
      DestinationDomainInfo: DomainInformation,
      ConnectionAlias: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/ccs/outboundConnection",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateOutboundCrossClusterSearchConnectionRequest",
  }) as any as S.Schema<CreateOutboundCrossClusterSearchConnectionRequest>;
export type OutboundCrossClusterSearchConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const OutboundCrossClusterSearchConnectionStatusCode = S.String;

export interface OutboundCrossClusterSearchConnectionStatus {
  StatusCode?: OutboundCrossClusterSearchConnectionStatusCode;
  Message?: string;
}
export const OutboundCrossClusterSearchConnectionStatus =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StatusCode: S.optional(OutboundCrossClusterSearchConnectionStatusCode),
      Message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "OutboundCrossClusterSearchConnectionStatus",
  }) as any as S.Schema<OutboundCrossClusterSearchConnectionStatus>;
export interface CreateOutboundCrossClusterSearchConnectionResponse {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundCrossClusterSearchConnectionStatus;
  CrossClusterSearchConnectionId?: string;
}
export const CreateOutboundCrossClusterSearchConnectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SourceDomainInfo: S.optional(DomainInformation),
      DestinationDomainInfo: S.optional(DomainInformation),
      ConnectionAlias: S.optional(S.String),
      ConnectionStatus: S.optional(OutboundCrossClusterSearchConnectionStatus),
      CrossClusterSearchConnectionId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "CreateOutboundCrossClusterSearchConnectionResponse",
  }) as any as S.Schema<CreateOutboundCrossClusterSearchConnectionResponse>;
export type PackageDescription = string;
export type S3BucketName = string;
export type S3Key = string;
export interface PackageSource {
  S3BucketName?: string;
  S3Key?: string;
}
export const PackageSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3BucketName: S.optional(S.String), S3Key: S.optional(S.String) }),
).annotate({ identifier: "PackageSource" }) as any as S.Schema<PackageSource>;
export interface CreatePackageRequest {
  PackageName: string;
  PackageType: PackageType;
  PackageDescription?: string;
  PackageSource: PackageSource;
}
export const CreatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageName: S.String,
    PackageType: PackageType,
    PackageDescription: S.optional(S.String),
    PackageSource: PackageSource,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageRequest",
}) as any as S.Schema<CreatePackageRequest>;
export type PackageStatus =
  | "COPYING"
  | "COPY_FAILED"
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export const PackageStatus = S.String;

export type CreatedAt = Date;
export interface PackageDetails {
  PackageID?: string;
  PackageName?: string;
  PackageType?: PackageType;
  PackageDescription?: string;
  PackageStatus?: PackageStatus;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  AvailablePackageVersion?: string;
  ErrorDetails?: ErrorDetails;
}
export const PackageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.optional(S.String),
    PackageName: S.optional(S.String),
    PackageType: S.optional(PackageType),
    PackageDescription: S.optional(S.String),
    PackageStatus: S.optional(PackageStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AvailablePackageVersion: S.optional(S.String),
    ErrorDetails: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "PackageDetails" }) as any as S.Schema<PackageDetails>;
export interface CreatePackageResponse {
  PackageDetails?: PackageDetails;
}
export const CreatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageDetails: S.optional(PackageDetails) }).pipe(ns),
).annotate({
  identifier: "CreatePackageResponse",
}) as any as S.Schema<CreatePackageResponse>;
export type DomainArn = string;
export type ClientToken = string;
export interface CreateVpcEndpointRequest {
  DomainArn: string;
  VpcOptions: VPCOptions;
  ClientToken?: string;
}
export const CreateVpcEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainArn: S.String,
    VpcOptions: VPCOptions,
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVpcEndpointRequest",
}) as any as S.Schema<CreateVpcEndpointRequest>;
export type VpcEndpointId = string;
export type VpcEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export const VpcEndpointStatus = S.String;

export type Endpoint = string;
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcEndpointOwner?: string;
  DomainArn?: string;
  VpcOptions?: VPCDerivedInfo;
  Status?: VpcEndpointStatus;
  Endpoint?: string;
}
export const VpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    VpcEndpointOwner: S.optional(S.String),
    DomainArn: S.optional(S.String),
    VpcOptions: S.optional(VPCDerivedInfo),
    Status: S.optional(VpcEndpointStatus),
    Endpoint: S.optional(S.String),
  }),
).annotate({ identifier: "VpcEndpoint" }) as any as S.Schema<VpcEndpoint>;
export interface CreateVpcEndpointResponse {
  VpcEndpoint: VpcEndpoint;
}
export const CreateVpcEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpoint: VpcEndpoint }).pipe(ns),
).annotate({
  identifier: "CreateVpcEndpointResponse",
}) as any as S.Schema<CreateVpcEndpointResponse>;
export interface DeleteElasticsearchDomainRequest {
  DomainName: string;
}
export const DeleteElasticsearchDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/2015-01-01/es/domain/{DomainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteElasticsearchDomainRequest",
}) as any as S.Schema<DeleteElasticsearchDomainRequest>;
export interface DeleteElasticsearchDomainResponse {
  DomainStatus?: ElasticsearchDomainStatus;
}
export const DeleteElasticsearchDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(ElasticsearchDomainStatus) }).pipe(ns),
).annotate({
  identifier: "DeleteElasticsearchDomainResponse",
}) as any as S.Schema<DeleteElasticsearchDomainResponse>;
export interface DeleteElasticsearchServiceRoleRequest {}
export const DeleteElasticsearchServiceRoleRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        ns,
        T.Http({ method: "DELETE", uri: "/2015-01-01/es/role" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteElasticsearchServiceRoleRequest",
}) as any as S.Schema<DeleteElasticsearchServiceRoleRequest>;
export interface DeleteElasticsearchServiceRoleResponse {}
export const DeleteElasticsearchServiceRoleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteElasticsearchServiceRoleResponse",
}) as any as S.Schema<DeleteElasticsearchServiceRoleResponse>;
export interface DeleteInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export const DeleteInboundCrossClusterSearchConnectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnectionId: S.String.pipe(
        T.HttpLabel("CrossClusterSearchConnectionId"),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteInboundCrossClusterSearchConnectionRequest",
  }) as any as S.Schema<DeleteInboundCrossClusterSearchConnectionRequest>;
export interface DeleteInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export const DeleteInboundCrossClusterSearchConnectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnection: S.optional(
        InboundCrossClusterSearchConnection,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteInboundCrossClusterSearchConnectionResponse",
  }) as any as S.Schema<DeleteInboundCrossClusterSearchConnectionResponse>;
export interface DeleteOutboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export const DeleteOutboundCrossClusterSearchConnectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnectionId: S.String.pipe(
        T.HttpLabel("CrossClusterSearchConnectionId"),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/2015-01-01/es/ccs/outboundConnection/{CrossClusterSearchConnectionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteOutboundCrossClusterSearchConnectionRequest",
  }) as any as S.Schema<DeleteOutboundCrossClusterSearchConnectionRequest>;
export interface OutboundCrossClusterSearchConnection {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  CrossClusterSearchConnectionId?: string;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundCrossClusterSearchConnectionStatus;
}
export const OutboundCrossClusterSearchConnection = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceDomainInfo: S.optional(DomainInformation),
      DestinationDomainInfo: S.optional(DomainInformation),
      CrossClusterSearchConnectionId: S.optional(S.String),
      ConnectionAlias: S.optional(S.String),
      ConnectionStatus: S.optional(OutboundCrossClusterSearchConnectionStatus),
    }),
).annotate({
  identifier: "OutboundCrossClusterSearchConnection",
}) as any as S.Schema<OutboundCrossClusterSearchConnection>;
export interface DeleteOutboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: OutboundCrossClusterSearchConnection;
}
export const DeleteOutboundCrossClusterSearchConnectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnection: S.optional(
        OutboundCrossClusterSearchConnection,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteOutboundCrossClusterSearchConnectionResponse",
  }) as any as S.Schema<DeleteOutboundCrossClusterSearchConnectionResponse>;
export interface DeletePackageRequest {
  PackageID: string;
}
export const DeletePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageID: S.String.pipe(T.HttpLabel("PackageID")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/2015-01-01/packages/{PackageID}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageRequest",
}) as any as S.Schema<DeletePackageRequest>;
export interface DeletePackageResponse {
  PackageDetails?: PackageDetails;
}
export const DeletePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageDetails: S.optional(PackageDetails) }).pipe(ns),
).annotate({
  identifier: "DeletePackageResponse",
}) as any as S.Schema<DeletePackageResponse>;
export interface DeleteVpcEndpointRequest {
  VpcEndpointId: string;
}
export const DeleteVpcEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointId: S.String.pipe(T.HttpLabel("VpcEndpointId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2015-01-01/es/vpcEndpoints/{VpcEndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcEndpointRequest",
}) as any as S.Schema<DeleteVpcEndpointRequest>;
export interface VpcEndpointSummary {
  VpcEndpointId?: string;
  VpcEndpointOwner?: string;
  DomainArn?: string;
  Status?: VpcEndpointStatus;
}
export const VpcEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    VpcEndpointOwner: S.optional(S.String),
    DomainArn: S.optional(S.String),
    Status: S.optional(VpcEndpointStatus),
  }),
).annotate({
  identifier: "VpcEndpointSummary",
}) as any as S.Schema<VpcEndpointSummary>;
export interface DeleteVpcEndpointResponse {
  VpcEndpointSummary: VpcEndpointSummary;
}
export const DeleteVpcEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointSummary: VpcEndpointSummary }).pipe(ns),
).annotate({
  identifier: "DeleteVpcEndpointResponse",
}) as any as S.Schema<DeleteVpcEndpointResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface DescribeDomainAutoTunesRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDomainAutoTunesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/domain/{DomainName}/autoTunes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainAutoTunesRequest",
}) as any as S.Schema<DescribeDomainAutoTunesRequest>;
export type AutoTuneType = "SCHEDULED_ACTION" | (string & {});
export const AutoTuneType = S.String;

export type AutoTuneDate = Date;
export type ScheduledAutoTuneActionType =
  | "JVM_HEAP_SIZE_TUNING"
  | "JVM_YOUNG_GEN_TUNING"
  | (string & {});
export const ScheduledAutoTuneActionType = S.String;

export type ScheduledAutoTuneDescription = string;
export type ScheduledAutoTuneSeverityType =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const ScheduledAutoTuneSeverityType = S.String;

export interface ScheduledAutoTuneDetails {
  Date?: Date;
  ActionType?: ScheduledAutoTuneActionType;
  Action?: string;
  Severity?: ScheduledAutoTuneSeverityType;
}
export const ScheduledAutoTuneDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ActionType: S.optional(ScheduledAutoTuneActionType),
    Action: S.optional(S.String),
    Severity: S.optional(ScheduledAutoTuneSeverityType),
  }),
).annotate({
  identifier: "ScheduledAutoTuneDetails",
}) as any as S.Schema<ScheduledAutoTuneDetails>;
export interface AutoTuneDetails {
  ScheduledAutoTuneDetails?: ScheduledAutoTuneDetails;
}
export const AutoTuneDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledAutoTuneDetails: S.optional(ScheduledAutoTuneDetails) }),
).annotate({
  identifier: "AutoTuneDetails",
}) as any as S.Schema<AutoTuneDetails>;
export interface AutoTune {
  AutoTuneType?: AutoTuneType;
  AutoTuneDetails?: AutoTuneDetails;
}
export const AutoTune = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoTuneType: S.optional(AutoTuneType),
    AutoTuneDetails: S.optional(AutoTuneDetails),
  }),
).annotate({ identifier: "AutoTune" }) as any as S.Schema<AutoTune>;
export type AutoTuneList = AutoTune[];
export const AutoTuneList = /*@__PURE__*/ S.Array(AutoTune);
export interface DescribeDomainAutoTunesResponse {
  AutoTunes?: AutoTune[];
  NextToken?: string;
}
export const DescribeDomainAutoTunesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoTunes: S.optional(AutoTuneList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDomainAutoTunesResponse",
}) as any as S.Schema<DescribeDomainAutoTunesResponse>;
export interface DescribeDomainChangeProgressRequest {
  DomainName: string;
  ChangeId?: string;
}
export const DescribeDomainChangeProgressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    ChangeId: S.optional(S.String).pipe(T.HttpQuery("changeid")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/domain/{DomainName}/progress",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainChangeProgressRequest",
}) as any as S.Schema<DescribeDomainChangeProgressRequest>;
export type OverallChangeStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const OverallChangeStatus = S.String;

export type TotalNumberOfStages = number;
export type ChangeProgressStageName = string;
export type ChangeProgressStageStatus = string;
export type Description = string;
export interface ChangeProgressStage {
  Name?: string;
  Status?: string;
  Description?: string;
  LastUpdated?: Date;
}
export const ChangeProgressStage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(S.String),
    Description: S.optional(S.String),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChangeProgressStage",
}) as any as S.Schema<ChangeProgressStage>;
export type ChangeProgressStageList = ChangeProgressStage[];
export const ChangeProgressStageList =
  /*@__PURE__*/ S.Array(ChangeProgressStage);
export interface ChangeProgressStatusDetails {
  ChangeId?: string;
  StartTime?: Date;
  Status?: OverallChangeStatus;
  PendingProperties?: string[];
  CompletedProperties?: string[];
  TotalNumberOfStages?: number;
  ChangeProgressStages?: ChangeProgressStage[];
  ConfigChangeStatus?: ConfigChangeStatus;
  LastUpdatedTime?: Date;
  InitiatedBy?: InitiatedBy;
}
export const ChangeProgressStatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(OverallChangeStatus),
    PendingProperties: S.optional(StringList),
    CompletedProperties: S.optional(StringList),
    TotalNumberOfStages: S.optional(S.Number),
    ChangeProgressStages: S.optional(ChangeProgressStageList),
    ConfigChangeStatus: S.optional(ConfigChangeStatus),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InitiatedBy: S.optional(InitiatedBy),
  }),
).annotate({
  identifier: "ChangeProgressStatusDetails",
}) as any as S.Schema<ChangeProgressStatusDetails>;
export interface DescribeDomainChangeProgressResponse {
  ChangeProgressStatus?: ChangeProgressStatusDetails;
}
export const DescribeDomainChangeProgressResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChangeProgressStatus: S.optional(ChangeProgressStatusDetails),
    }).pipe(ns),
).annotate({
  identifier: "DescribeDomainChangeProgressResponse",
}) as any as S.Schema<DescribeDomainChangeProgressResponse>;
export interface DescribeElasticsearchDomainRequest {
  DomainName: string;
}
export const DescribeElasticsearchDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeElasticsearchDomainRequest",
}) as any as S.Schema<DescribeElasticsearchDomainRequest>;
export interface DescribeElasticsearchDomainResponse {
  DomainStatus: ElasticsearchDomainStatus;
}
export const DescribeElasticsearchDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: ElasticsearchDomainStatus }).pipe(ns),
).annotate({
  identifier: "DescribeElasticsearchDomainResponse",
}) as any as S.Schema<DescribeElasticsearchDomainResponse>;
export interface DescribeElasticsearchDomainConfigRequest {
  DomainName: string;
}
export const DescribeElasticsearchDomainConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2015-01-01/es/domain/{DomainName}/config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeElasticsearchDomainConfigRequest",
}) as any as S.Schema<DescribeElasticsearchDomainConfigRequest>;
export type UIntValue = number;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | (string & {});
export const OptionState = S.String;

export interface OptionStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: OptionState;
  PendingDeletion?: boolean;
}
export const OptionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UpdateVersion: S.optional(S.Number),
    State: OptionState,
    PendingDeletion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "OptionStatus" }) as any as S.Schema<OptionStatus>;
export interface ElasticsearchVersionStatus {
  Options: string;
  Status: OptionStatus;
}
export const ElasticsearchVersionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.String, Status: OptionStatus }),
).annotate({
  identifier: "ElasticsearchVersionStatus",
}) as any as S.Schema<ElasticsearchVersionStatus>;
export interface ElasticsearchClusterConfigStatus {
  Options: ElasticsearchClusterConfig;
  Status: OptionStatus;
}
export const ElasticsearchClusterConfigStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: ElasticsearchClusterConfig, Status: OptionStatus }),
).annotate({
  identifier: "ElasticsearchClusterConfigStatus",
}) as any as S.Schema<ElasticsearchClusterConfigStatus>;
export interface EBSOptionsStatus {
  Options: EBSOptions;
  Status: OptionStatus;
}
export const EBSOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: EBSOptions, Status: OptionStatus }),
).annotate({
  identifier: "EBSOptionsStatus",
}) as any as S.Schema<EBSOptionsStatus>;
export interface AccessPoliciesStatus {
  Options: string;
  Status: OptionStatus;
}
export const AccessPoliciesStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.String, Status: OptionStatus }),
).annotate({
  identifier: "AccessPoliciesStatus",
}) as any as S.Schema<AccessPoliciesStatus>;
export interface SnapshotOptionsStatus {
  Options: SnapshotOptions;
  Status: OptionStatus;
}
export const SnapshotOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: SnapshotOptions, Status: OptionStatus }),
).annotate({
  identifier: "SnapshotOptionsStatus",
}) as any as S.Schema<SnapshotOptionsStatus>;
export interface VPCDerivedInfoStatus {
  Options: VPCDerivedInfo;
  Status: OptionStatus;
}
export const VPCDerivedInfoStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: VPCDerivedInfo, Status: OptionStatus }),
).annotate({
  identifier: "VPCDerivedInfoStatus",
}) as any as S.Schema<VPCDerivedInfoStatus>;
export interface CognitoOptionsStatus {
  Options: CognitoOptions;
  Status: OptionStatus;
}
export const CognitoOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: CognitoOptions, Status: OptionStatus }),
).annotate({
  identifier: "CognitoOptionsStatus",
}) as any as S.Schema<CognitoOptionsStatus>;
export interface EncryptionAtRestOptionsStatus {
  Options: EncryptionAtRestOptions;
  Status: OptionStatus;
}
export const EncryptionAtRestOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: EncryptionAtRestOptions, Status: OptionStatus }),
).annotate({
  identifier: "EncryptionAtRestOptionsStatus",
}) as any as S.Schema<EncryptionAtRestOptionsStatus>;
export interface NodeToNodeEncryptionOptionsStatus {
  Options: NodeToNodeEncryptionOptions;
  Status: OptionStatus;
}
export const NodeToNodeEncryptionOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: NodeToNodeEncryptionOptions, Status: OptionStatus }),
).annotate({
  identifier: "NodeToNodeEncryptionOptionsStatus",
}) as any as S.Schema<NodeToNodeEncryptionOptionsStatus>;
export interface AdvancedOptionsStatus {
  Options: { [key: string]: string | undefined };
  Status: OptionStatus;
}
export const AdvancedOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: AdvancedOptions, Status: OptionStatus }),
).annotate({
  identifier: "AdvancedOptionsStatus",
}) as any as S.Schema<AdvancedOptionsStatus>;
export interface LogPublishingOptionsStatus {
  Options?: { [key: string]: LogPublishingOption | undefined };
  Status?: OptionStatus;
}
export const LogPublishingOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(LogPublishingOptions),
    Status: S.optional(OptionStatus),
  }),
).annotate({
  identifier: "LogPublishingOptionsStatus",
}) as any as S.Schema<LogPublishingOptionsStatus>;
export interface DomainEndpointOptionsStatus {
  Options: DomainEndpointOptions;
  Status: OptionStatus;
}
export const DomainEndpointOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: DomainEndpointOptions, Status: OptionStatus }),
).annotate({
  identifier: "DomainEndpointOptionsStatus",
}) as any as S.Schema<DomainEndpointOptionsStatus>;
export interface AdvancedSecurityOptionsStatus {
  Options: AdvancedSecurityOptions;
  Status: OptionStatus;
}
export const AdvancedSecurityOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: AdvancedSecurityOptions, Status: OptionStatus }),
).annotate({
  identifier: "AdvancedSecurityOptionsStatus",
}) as any as S.Schema<AdvancedSecurityOptionsStatus>;
export type RollbackOnDisable =
  | "NO_ROLLBACK"
  | "DEFAULT_ROLLBACK"
  | (string & {});
export const RollbackOnDisable = S.String;

export interface AutoTuneOptions {
  DesiredState?: AutoTuneDesiredState;
  RollbackOnDisable?: RollbackOnDisable;
  MaintenanceSchedules?: AutoTuneMaintenanceSchedule[];
}
export const AutoTuneOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.optional(AutoTuneDesiredState),
    RollbackOnDisable: S.optional(RollbackOnDisable),
    MaintenanceSchedules: S.optional(AutoTuneMaintenanceScheduleList),
  }),
).annotate({
  identifier: "AutoTuneOptions",
}) as any as S.Schema<AutoTuneOptions>;
export interface AutoTuneStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: AutoTuneState;
  ErrorMessage?: string;
  PendingDeletion?: boolean;
}
export const AutoTuneStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UpdateVersion: S.optional(S.Number),
    State: AutoTuneState,
    ErrorMessage: S.optional(S.String),
    PendingDeletion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AutoTuneStatus" }) as any as S.Schema<AutoTuneStatus>;
export interface AutoTuneOptionsStatus {
  Options?: AutoTuneOptions;
  Status?: AutoTuneStatus;
}
export const AutoTuneOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(AutoTuneOptions),
    Status: S.optional(AutoTuneStatus),
  }),
).annotate({
  identifier: "AutoTuneOptionsStatus",
}) as any as S.Schema<AutoTuneOptionsStatus>;
export interface DeploymentStrategyOptionsStatus {
  Options: DeploymentStrategyOptions;
  Status: OptionStatus;
}
export const DeploymentStrategyOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: DeploymentStrategyOptions, Status: OptionStatus }),
).annotate({
  identifier: "DeploymentStrategyOptionsStatus",
}) as any as S.Schema<DeploymentStrategyOptionsStatus>;
export interface AutomatedSnapshotPauseOptionsStatus {
  Options: AutomatedSnapshotPauseOptions;
  Status: OptionStatus;
}
export const AutomatedSnapshotPauseOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: AutomatedSnapshotPauseOptions, Status: OptionStatus }),
).annotate({
  identifier: "AutomatedSnapshotPauseOptionsStatus",
}) as any as S.Schema<AutomatedSnapshotPauseOptionsStatus>;
export interface UseCaseStatus {
  Options: DomainUseCase;
  Status: OptionStatus;
}
export const UseCaseStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: DomainUseCase, Status: OptionStatus }),
).annotate({ identifier: "UseCaseStatus" }) as any as S.Schema<UseCaseStatus>;
export interface EngineModeStatus {
  Options: DomainEngineMode;
  Status: OptionStatus;
}
export const EngineModeStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: DomainEngineMode, Status: OptionStatus }),
).annotate({
  identifier: "EngineModeStatus",
}) as any as S.Schema<EngineModeStatus>;
export interface ElasticsearchDomainConfig {
  ElasticsearchVersion?: ElasticsearchVersionStatus;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfigStatus;
  EBSOptions?: EBSOptionsStatus;
  AccessPolicies?: AccessPoliciesStatus;
  SnapshotOptions?: SnapshotOptionsStatus;
  VPCOptions?: VPCDerivedInfoStatus;
  CognitoOptions?: CognitoOptionsStatus;
  EncryptionAtRestOptions?: EncryptionAtRestOptionsStatus;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptionsStatus;
  AdvancedOptions?: AdvancedOptionsStatus;
  LogPublishingOptions?: LogPublishingOptionsStatus;
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsStatus;
  AutoTuneOptions?: AutoTuneOptionsStatus;
  ChangeProgressDetails?: ChangeProgressDetails;
  ModifyingProperties?: ModifyingProperties[];
  DeploymentStrategyOptions?: DeploymentStrategyOptionsStatus;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptionsStatus;
  UseCase?: UseCaseStatus;
  EngineMode?: EngineModeStatus;
}
export const ElasticsearchDomainConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ElasticsearchVersion: S.optional(ElasticsearchVersionStatus),
    ElasticsearchClusterConfig: S.optional(ElasticsearchClusterConfigStatus),
    EBSOptions: S.optional(EBSOptionsStatus),
    AccessPolicies: S.optional(AccessPoliciesStatus),
    SnapshotOptions: S.optional(SnapshotOptionsStatus),
    VPCOptions: S.optional(VPCDerivedInfoStatus),
    CognitoOptions: S.optional(CognitoOptionsStatus),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptionsStatus),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptionsStatus),
    AdvancedOptions: S.optional(AdvancedOptionsStatus),
    LogPublishingOptions: S.optional(LogPublishingOptionsStatus),
    DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsStatus),
    AutoTuneOptions: S.optional(AutoTuneOptionsStatus),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
    ModifyingProperties: S.optional(ModifyingPropertiesList),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptionsStatus),
    AutomatedSnapshotPauseOptions: S.optional(
      AutomatedSnapshotPauseOptionsStatus,
    ),
    UseCase: S.optional(UseCaseStatus),
    EngineMode: S.optional(EngineModeStatus),
  }),
).annotate({
  identifier: "ElasticsearchDomainConfig",
}) as any as S.Schema<ElasticsearchDomainConfig>;
export interface DescribeElasticsearchDomainConfigResponse {
  DomainConfig: ElasticsearchDomainConfig;
}
export const DescribeElasticsearchDomainConfigResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DomainConfig: ElasticsearchDomainConfig }).pipe(ns),
  ).annotate({
    identifier: "DescribeElasticsearchDomainConfigResponse",
  }) as any as S.Schema<DescribeElasticsearchDomainConfigResponse>;
export type DomainNameList = string[];
export const DomainNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeElasticsearchDomainsRequest {
  DomainNames: string[];
}
export const DescribeElasticsearchDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNames: DomainNameList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/domain-info" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeElasticsearchDomainsRequest",
}) as any as S.Schema<DescribeElasticsearchDomainsRequest>;
export type ElasticsearchDomainStatusList = ElasticsearchDomainStatus[];
export const ElasticsearchDomainStatusList = /*@__PURE__*/ S.Array(
  ElasticsearchDomainStatus,
);
export interface DescribeElasticsearchDomainsResponse {
  DomainStatusList: ElasticsearchDomainStatus[];
}
export const DescribeElasticsearchDomainsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ DomainStatusList: ElasticsearchDomainStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeElasticsearchDomainsResponse",
}) as any as S.Schema<DescribeElasticsearchDomainsResponse>;
export interface DescribeElasticsearchInstanceTypeLimitsRequest {
  DomainName?: string;
  InstanceType: ESPartitionInstanceType;
  ElasticsearchVersion: string;
}
export const DescribeElasticsearchInstanceTypeLimitsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
      InstanceType: ESPartitionInstanceType.pipe(T.HttpLabel("InstanceType")),
      ElasticsearchVersion: S.String.pipe(T.HttpLabel("ElasticsearchVersion")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2015-01-01/es/instanceTypeLimits/{ElasticsearchVersion}/{InstanceType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeElasticsearchInstanceTypeLimitsRequest",
  }) as any as S.Schema<DescribeElasticsearchInstanceTypeLimitsRequest>;
export type InstanceRole = string;
export type StorageTypeName = string;
export type StorageSubTypeName = string;
export type LimitName = string;
export type LimitValue = string;
export type LimitValueList = string[];
export const LimitValueList = /*@__PURE__*/ S.Array(S.String);
export interface StorageTypeLimit {
  LimitName?: string;
  LimitValues?: string[];
}
export const StorageTypeLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LimitName: S.optional(S.String),
    LimitValues: S.optional(LimitValueList),
  }),
).annotate({
  identifier: "StorageTypeLimit",
}) as any as S.Schema<StorageTypeLimit>;
export type StorageTypeLimitList = StorageTypeLimit[];
export const StorageTypeLimitList = /*@__PURE__*/ S.Array(StorageTypeLimit);
export interface StorageType {
  StorageTypeName?: string;
  StorageSubTypeName?: string;
  StorageTypeLimits?: StorageTypeLimit[];
}
export const StorageType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageTypeName: S.optional(S.String),
    StorageSubTypeName: S.optional(S.String),
    StorageTypeLimits: S.optional(StorageTypeLimitList),
  }),
).annotate({ identifier: "StorageType" }) as any as S.Schema<StorageType>;
export type StorageTypeList = StorageType[];
export const StorageTypeList = /*@__PURE__*/ S.Array(StorageType);
export type MinimumInstanceCount = number;
export type MaximumInstanceCount = number;
export interface InstanceCountLimits {
  MinimumInstanceCount?: number;
  MaximumInstanceCount?: number;
}
export const InstanceCountLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumInstanceCount: S.optional(S.Number),
    MaximumInstanceCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceCountLimits",
}) as any as S.Schema<InstanceCountLimits>;
export interface InstanceLimits {
  InstanceCountLimits?: InstanceCountLimits;
}
export const InstanceLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceCountLimits: S.optional(InstanceCountLimits) }),
).annotate({ identifier: "InstanceLimits" }) as any as S.Schema<InstanceLimits>;
export interface AdditionalLimit {
  LimitName?: string;
  LimitValues?: string[];
}
export const AdditionalLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LimitName: S.optional(S.String),
    LimitValues: S.optional(LimitValueList),
  }),
).annotate({
  identifier: "AdditionalLimit",
}) as any as S.Schema<AdditionalLimit>;
export type AdditionalLimitList = AdditionalLimit[];
export const AdditionalLimitList = /*@__PURE__*/ S.Array(AdditionalLimit);
export interface Limits {
  StorageTypes?: StorageType[];
  InstanceLimits?: InstanceLimits;
  AdditionalLimits?: AdditionalLimit[];
}
export const Limits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageTypes: S.optional(StorageTypeList),
    InstanceLimits: S.optional(InstanceLimits),
    AdditionalLimits: S.optional(AdditionalLimitList),
  }),
).annotate({ identifier: "Limits" }) as any as S.Schema<Limits>;
export type LimitsByRole = { [key: string]: Limits | undefined };
export const LimitsByRole = /*@__PURE__*/ S.Record(
  S.String,
  Limits.pipe(S.optional),
);
export interface DescribeElasticsearchInstanceTypeLimitsResponse {
  LimitsByRole?: { [key: string]: Limits | undefined };
}
export const DescribeElasticsearchInstanceTypeLimitsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LimitsByRole: S.optional(LimitsByRole) }).pipe(ns),
  ).annotate({
    identifier: "DescribeElasticsearchInstanceTypeLimitsResponse",
  }) as any as S.Schema<DescribeElasticsearchInstanceTypeLimitsResponse>;
export type NonEmptyString = string;
export type ValueStringList = string[];
export const ValueStringList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(ValueStringList) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface DescribeInboundCrossClusterSearchConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeInboundCrossClusterSearchConnectionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/ccs/inboundConnection/search",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeInboundCrossClusterSearchConnectionsRequest",
  }) as any as S.Schema<DescribeInboundCrossClusterSearchConnectionsRequest>;
export type InboundCrossClusterSearchConnections =
  InboundCrossClusterSearchConnection[];
export const InboundCrossClusterSearchConnections = /*@__PURE__*/ S.Array(
  InboundCrossClusterSearchConnection,
);
export interface DescribeInboundCrossClusterSearchConnectionsResponse {
  CrossClusterSearchConnections?: InboundCrossClusterSearchConnection[];
  NextToken?: string;
}
export const DescribeInboundCrossClusterSearchConnectionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnections: S.optional(
        InboundCrossClusterSearchConnections,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeInboundCrossClusterSearchConnectionsResponse",
  }) as any as S.Schema<DescribeInboundCrossClusterSearchConnectionsResponse>;
export interface DescribeOutboundCrossClusterSearchConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeOutboundCrossClusterSearchConnectionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/ccs/outboundConnection/search",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeOutboundCrossClusterSearchConnectionsRequest",
  }) as any as S.Schema<DescribeOutboundCrossClusterSearchConnectionsRequest>;
export type OutboundCrossClusterSearchConnections =
  OutboundCrossClusterSearchConnection[];
export const OutboundCrossClusterSearchConnections = /*@__PURE__*/ S.Array(
  OutboundCrossClusterSearchConnection,
);
export interface DescribeOutboundCrossClusterSearchConnectionsResponse {
  CrossClusterSearchConnections?: OutboundCrossClusterSearchConnection[];
  NextToken?: string;
}
export const DescribeOutboundCrossClusterSearchConnectionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnections: S.optional(
        OutboundCrossClusterSearchConnections,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeOutboundCrossClusterSearchConnectionsResponse",
  }) as any as S.Schema<DescribeOutboundCrossClusterSearchConnectionsResponse>;
export type DescribePackagesFilterName =
  | "PackageID"
  | "PackageName"
  | "PackageStatus"
  | (string & {});
export const DescribePackagesFilterName = S.String;

export type DescribePackagesFilterValue = string;
export type DescribePackagesFilterValues = string[];
export const DescribePackagesFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface DescribePackagesFilter {
  Name?: DescribePackagesFilterName;
  Value?: string[];
}
export const DescribePackagesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(DescribePackagesFilterName),
    Value: S.optional(DescribePackagesFilterValues),
  }),
).annotate({
  identifier: "DescribePackagesFilter",
}) as any as S.Schema<DescribePackagesFilter>;
export type DescribePackagesFilterList = DescribePackagesFilter[];
export const DescribePackagesFilterList = /*@__PURE__*/ S.Array(
  DescribePackagesFilter,
);
export interface DescribePackagesRequest {
  Filters?: DescribePackagesFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribePackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(DescribePackagesFilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/packages/describe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackagesRequest",
}) as any as S.Schema<DescribePackagesRequest>;
export type PackageDetailsList = PackageDetails[];
export const PackageDetailsList = /*@__PURE__*/ S.Array(PackageDetails);
export interface DescribePackagesResponse {
  PackageDetailsList?: PackageDetails[];
  NextToken?: string;
}
export const DescribePackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageDetailsList: S.optional(PackageDetailsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePackagesResponse",
}) as any as S.Schema<DescribePackagesResponse>;
export interface DescribeReservedElasticsearchInstanceOfferingsRequest {
  ReservedElasticsearchInstanceOfferingId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedElasticsearchInstanceOfferingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedElasticsearchInstanceOfferingId: S.optional(S.String).pipe(
        T.HttpQuery("offeringId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2015-01-01/es/reservedInstanceOfferings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReservedElasticsearchInstanceOfferingsRequest",
  }) as any as S.Schema<DescribeReservedElasticsearchInstanceOfferingsRequest>;
export type ReservedElasticsearchInstancePaymentOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export const ReservedElasticsearchInstancePaymentOption = S.String;

export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export const RecurringCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecurringChargeAmount: S.optional(S.Number),
    RecurringChargeFrequency: S.optional(S.String),
  }),
).annotate({
  identifier: "RecurringCharge",
}) as any as S.Schema<RecurringCharge>;
export type RecurringChargeList = RecurringCharge[];
export const RecurringChargeList = /*@__PURE__*/ S.Array(
  RecurringCharge.pipe(T.XmlName("RecurringCharge")).annotate({
    identifier: "RecurringCharge",
  }),
);
export interface ReservedElasticsearchInstanceOffering {
  ReservedElasticsearchInstanceOfferingId?: string;
  ElasticsearchInstanceType?: ESPartitionInstanceType;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  PaymentOption?: ReservedElasticsearchInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedElasticsearchInstanceOffering = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedElasticsearchInstanceOfferingId: S.optional(S.String),
      ElasticsearchInstanceType: S.optional(ESPartitionInstanceType),
      Duration: S.optional(S.Number),
      FixedPrice: S.optional(S.Number),
      UsagePrice: S.optional(S.Number),
      CurrencyCode: S.optional(S.String),
      PaymentOption: S.optional(ReservedElasticsearchInstancePaymentOption),
      RecurringCharges: S.optional(RecurringChargeList),
    }),
).annotate({
  identifier: "ReservedElasticsearchInstanceOffering",
}) as any as S.Schema<ReservedElasticsearchInstanceOffering>;
export type ReservedElasticsearchInstanceOfferingList =
  ReservedElasticsearchInstanceOffering[];
export const ReservedElasticsearchInstanceOfferingList = /*@__PURE__*/ S.Array(
  ReservedElasticsearchInstanceOffering.pipe(
    T.XmlName("ReservedElasticsearchInstanceOffering"),
  ).annotate({ identifier: "ReservedElasticsearchInstanceOffering" }),
);
export interface DescribeReservedElasticsearchInstanceOfferingsResponse {
  NextToken?: string;
  ReservedElasticsearchInstanceOfferings?: ReservedElasticsearchInstanceOffering[];
}
export const DescribeReservedElasticsearchInstanceOfferingsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      ReservedElasticsearchInstanceOfferings: S.optional(
        ReservedElasticsearchInstanceOfferingList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReservedElasticsearchInstanceOfferingsResponse",
  }) as any as S.Schema<DescribeReservedElasticsearchInstanceOfferingsResponse>;
export interface DescribeReservedElasticsearchInstancesRequest {
  ReservedElasticsearchInstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedElasticsearchInstancesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedElasticsearchInstanceId: S.optional(S.String).pipe(
        T.HttpQuery("reservationId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/2015-01-01/es/reservedInstances" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReservedElasticsearchInstancesRequest",
  }) as any as S.Schema<DescribeReservedElasticsearchInstancesRequest>;
export type ReservationToken = string;
export interface ReservedElasticsearchInstance {
  ReservationName?: string;
  ReservedElasticsearchInstanceId?: string;
  ReservedElasticsearchInstanceOfferingId?: string;
  ElasticsearchInstanceType?: ESPartitionInstanceType;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  ElasticsearchInstanceCount?: number;
  State?: string;
  PaymentOption?: ReservedElasticsearchInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedElasticsearchInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservationName: S.optional(S.String),
    ReservedElasticsearchInstanceId: S.optional(S.String),
    ReservedElasticsearchInstanceOfferingId: S.optional(S.String),
    ElasticsearchInstanceType: S.optional(ESPartitionInstanceType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    ElasticsearchInstanceCount: S.optional(S.Number),
    State: S.optional(S.String),
    PaymentOption: S.optional(ReservedElasticsearchInstancePaymentOption),
    RecurringCharges: S.optional(RecurringChargeList),
  }),
).annotate({
  identifier: "ReservedElasticsearchInstance",
}) as any as S.Schema<ReservedElasticsearchInstance>;
export type ReservedElasticsearchInstanceList = ReservedElasticsearchInstance[];
export const ReservedElasticsearchInstanceList = /*@__PURE__*/ S.Array(
  ReservedElasticsearchInstance,
);
export interface DescribeReservedElasticsearchInstancesResponse {
  NextToken?: string;
  ReservedElasticsearchInstances?: ReservedElasticsearchInstance[];
}
export const DescribeReservedElasticsearchInstancesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      ReservedElasticsearchInstances: S.optional(
        ReservedElasticsearchInstanceList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReservedElasticsearchInstancesResponse",
  }) as any as S.Schema<DescribeReservedElasticsearchInstancesResponse>;
export type VpcEndpointIdList = string[];
export const VpcEndpointIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeVpcEndpointsRequest {
  VpcEndpointIds: string[];
}
export const DescribeVpcEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointIds: VpcEndpointIdList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints/describe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVpcEndpointsRequest",
}) as any as S.Schema<DescribeVpcEndpointsRequest>;
export type VpcEndpoints = VpcEndpoint[];
export const VpcEndpoints = /*@__PURE__*/ S.Array(VpcEndpoint);
export type VpcEndpointErrorCode =
  | "ENDPOINT_NOT_FOUND"
  | "SERVER_ERROR"
  | (string & {});
export const VpcEndpointErrorCode = S.String;

export interface VpcEndpointError {
  VpcEndpointId?: string;
  ErrorCode?: VpcEndpointErrorCode;
  ErrorMessage?: string;
}
export const VpcEndpointError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    ErrorCode: S.optional(VpcEndpointErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcEndpointError",
}) as any as S.Schema<VpcEndpointError>;
export type VpcEndpointErrorList = VpcEndpointError[];
export const VpcEndpointErrorList = /*@__PURE__*/ S.Array(VpcEndpointError);
export interface DescribeVpcEndpointsResponse {
  VpcEndpoints: VpcEndpoint[];
  VpcEndpointErrors: VpcEndpointError[];
}
export const DescribeVpcEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpoints: VpcEndpoints,
    VpcEndpointErrors: VpcEndpointErrorList,
  }).pipe(ns),
).annotate({
  identifier: "DescribeVpcEndpointsResponse",
}) as any as S.Schema<DescribeVpcEndpointsResponse>;
export interface DissociatePackageRequest {
  PackageID: string;
  DomainName: string;
}
export const DissociatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String.pipe(T.HttpLabel("PackageID")),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2015-01-01/packages/dissociate/{PackageID}/{DomainName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DissociatePackageRequest",
}) as any as S.Schema<DissociatePackageRequest>;
export interface DissociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export const DissociatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainPackageDetails: S.optional(DomainPackageDetails) }).pipe(ns),
).annotate({
  identifier: "DissociatePackageResponse",
}) as any as S.Schema<DissociatePackageResponse>;
export interface GetCompatibleElasticsearchVersionsRequest {
  DomainName?: string;
}
export const GetCompatibleElasticsearchVersionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/2015-01-01/es/compatibleVersions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCompatibleElasticsearchVersionsRequest",
  }) as any as S.Schema<GetCompatibleElasticsearchVersionsRequest>;
export type ElasticsearchVersionList = string[];
export const ElasticsearchVersionList = /*@__PURE__*/ S.Array(S.String);
export interface CompatibleVersionsMap {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export const CompatibleVersionsMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceVersion: S.optional(S.String),
    TargetVersions: S.optional(ElasticsearchVersionList),
  }),
).annotate({
  identifier: "CompatibleVersionsMap",
}) as any as S.Schema<CompatibleVersionsMap>;
export type CompatibleElasticsearchVersionsList = CompatibleVersionsMap[];
export const CompatibleElasticsearchVersionsList = /*@__PURE__*/ S.Array(
  CompatibleVersionsMap,
);
export interface GetCompatibleElasticsearchVersionsResponse {
  CompatibleElasticsearchVersions?: CompatibleVersionsMap[];
}
export const GetCompatibleElasticsearchVersionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CompatibleElasticsearchVersions: S.optional(
        CompatibleElasticsearchVersionsList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "GetCompatibleElasticsearchVersionsResponse",
  }) as any as S.Schema<GetCompatibleElasticsearchVersionsResponse>;
export interface GetPackageVersionHistoryRequest {
  PackageID: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetPackageVersionHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String.pipe(T.HttpLabel("PackageID")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/packages/{PackageID}/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageVersionHistoryRequest",
}) as any as S.Schema<GetPackageVersionHistoryRequest>;
export type CommitMessage = string;
export interface PackageVersionHistory {
  PackageVersion?: string;
  CommitMessage?: string;
  CreatedAt?: Date;
}
export const PackageVersionHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageVersion: S.optional(S.String),
    CommitMessage: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PackageVersionHistory",
}) as any as S.Schema<PackageVersionHistory>;
export type PackageVersionHistoryList = PackageVersionHistory[];
export const PackageVersionHistoryList = /*@__PURE__*/ S.Array(
  PackageVersionHistory,
);
export interface GetPackageVersionHistoryResponse {
  PackageID?: string;
  PackageVersionHistoryList?: PackageVersionHistory[];
  NextToken?: string;
}
export const GetPackageVersionHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.optional(S.String),
    PackageVersionHistoryList: S.optional(PackageVersionHistoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetPackageVersionHistoryResponse",
}) as any as S.Schema<GetPackageVersionHistoryResponse>;
export interface GetUpgradeHistoryRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetUpgradeHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/upgradeDomain/{DomainName}/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUpgradeHistoryRequest",
}) as any as S.Schema<GetUpgradeHistoryRequest>;
export type UpgradeName = string;
export type StartTimestamp = Date;
export type UpgradeStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "SUCCEEDED_WITH_ISSUES"
  | "FAILED"
  | (string & {});
export const UpgradeStatus = S.String;

export type UpgradeStep =
  | "PRE_UPGRADE_CHECK"
  | "SNAPSHOT"
  | "UPGRADE"
  | (string & {});
export const UpgradeStep = S.String;

export type Issue = string;
export type Issues = string[];
export const Issues = /*@__PURE__*/ S.Array(S.String);
export interface UpgradeStepItem {
  UpgradeStep?: UpgradeStep;
  UpgradeStepStatus?: UpgradeStatus;
  Issues?: string[];
  ProgressPercent?: number;
}
export const UpgradeStepItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpgradeStep: S.optional(UpgradeStep),
    UpgradeStepStatus: S.optional(UpgradeStatus),
    Issues: S.optional(Issues),
    ProgressPercent: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpgradeStepItem",
}) as any as S.Schema<UpgradeStepItem>;
export type UpgradeStepsList = UpgradeStepItem[];
export const UpgradeStepsList = /*@__PURE__*/ S.Array(UpgradeStepItem);
export interface UpgradeHistory {
  UpgradeName?: string;
  StartTimestamp?: Date;
  UpgradeStatus?: UpgradeStatus;
  StepsList?: UpgradeStepItem[];
}
export const UpgradeHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpgradeName: S.optional(S.String),
    StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpgradeStatus: S.optional(UpgradeStatus),
    StepsList: S.optional(UpgradeStepsList),
  }),
).annotate({ identifier: "UpgradeHistory" }) as any as S.Schema<UpgradeHistory>;
export type UpgradeHistoryList = UpgradeHistory[];
export const UpgradeHistoryList = /*@__PURE__*/ S.Array(UpgradeHistory);
export interface GetUpgradeHistoryResponse {
  UpgradeHistories?: UpgradeHistory[];
  NextToken?: string;
}
export const GetUpgradeHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpgradeHistories: S.optional(UpgradeHistoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetUpgradeHistoryResponse",
}) as any as S.Schema<GetUpgradeHistoryResponse>;
export interface GetUpgradeStatusRequest {
  DomainName: string;
}
export const GetUpgradeStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/upgradeDomain/{DomainName}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUpgradeStatusRequest",
}) as any as S.Schema<GetUpgradeStatusRequest>;
export interface GetUpgradeStatusResponse {
  UpgradeStep?: UpgradeStep;
  StepStatus?: UpgradeStatus;
  UpgradeName?: string;
}
export const GetUpgradeStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpgradeStep: S.optional(UpgradeStep),
    StepStatus: S.optional(UpgradeStatus),
    UpgradeName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetUpgradeStatusResponse",
}) as any as S.Schema<GetUpgradeStatusResponse>;
export type EngineType = "OpenSearch" | "Elasticsearch" | (string & {});
export const EngineType = S.String;

export interface ListDomainNamesRequest {
  EngineType?: EngineType;
}
export const ListDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(EngineType).pipe(T.HttpQuery("engineType")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2015-01-01/domain" }),
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
export interface DomainInfo {
  DomainName?: string;
  EngineType?: EngineType;
}
export const DomainInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    EngineType: S.optional(EngineType),
  }),
).annotate({ identifier: "DomainInfo" }) as any as S.Schema<DomainInfo>;
export type DomainInfoList = DomainInfo[];
export const DomainInfoList = /*@__PURE__*/ S.Array(DomainInfo);
export interface ListDomainNamesResponse {
  DomainNames?: DomainInfo[];
}
export const ListDomainNamesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNames: S.optional(DomainInfoList) }).pipe(ns),
).annotate({
  identifier: "ListDomainNamesResponse",
}) as any as S.Schema<ListDomainNamesResponse>;
export interface ListDomainsForPackageRequest {
  PackageID: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDomainsForPackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String.pipe(T.HttpLabel("PackageID")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/packages/{PackageID}/domains",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsForPackageRequest",
}) as any as S.Schema<ListDomainsForPackageRequest>;
export type DomainPackageDetailsList = DomainPackageDetails[];
export const DomainPackageDetailsList =
  /*@__PURE__*/ S.Array(DomainPackageDetails);
export interface ListDomainsForPackageResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
  NextToken?: string;
}
export const ListDomainsForPackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPackageDetailsList: S.optional(DomainPackageDetailsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainsForPackageResponse",
}) as any as S.Schema<ListDomainsForPackageResponse>;
export interface ListElasticsearchInstanceTypesRequest {
  ElasticsearchVersion: string;
  DomainName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListElasticsearchInstanceTypesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ElasticsearchVersion: S.String.pipe(T.HttpLabel("ElasticsearchVersion")),
      DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2015-01-01/es/instanceTypes/{ElasticsearchVersion}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListElasticsearchInstanceTypesRequest",
}) as any as S.Schema<ListElasticsearchInstanceTypesRequest>;
export type ElasticsearchInstanceTypeList = ESPartitionInstanceType[];
export const ElasticsearchInstanceTypeList = /*@__PURE__*/ S.Array(
  ESPartitionInstanceType,
);
export interface ListElasticsearchInstanceTypesResponse {
  ElasticsearchInstanceTypes?: ESPartitionInstanceType[];
  NextToken?: string;
}
export const ListElasticsearchInstanceTypesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ElasticsearchInstanceTypes: S.optional(ElasticsearchInstanceTypeList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListElasticsearchInstanceTypesResponse",
}) as any as S.Schema<ListElasticsearchInstanceTypesResponse>;
export interface ListElasticsearchVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListElasticsearchVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2015-01-01/es/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListElasticsearchVersionsRequest",
}) as any as S.Schema<ListElasticsearchVersionsRequest>;
export interface ListElasticsearchVersionsResponse {
  ElasticsearchVersions?: string[];
  NextToken?: string;
}
export const ListElasticsearchVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ElasticsearchVersions: S.optional(ElasticsearchVersionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListElasticsearchVersionsResponse",
}) as any as S.Schema<ListElasticsearchVersionsResponse>;
export interface ListPackagesForDomainRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPackagesForDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/domain/{DomainName}/packages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagesForDomainRequest",
}) as any as S.Schema<ListPackagesForDomainRequest>;
export interface ListPackagesForDomainResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
  NextToken?: string;
}
export const ListPackagesForDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPackageDetailsList: S.optional(DomainPackageDetailsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPackagesForDomainResponse",
}) as any as S.Schema<ListPackagesForDomainResponse>;
export interface ListTagsRequest {
  ARN: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2015-01-01/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsRequest",
}) as any as S.Schema<ListTagsRequest>;
export interface ListTagsResponse {
  TagList?: Tag[];
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ListVpcEndpointAccessRequest {
  DomainName: string;
  NextToken?: string;
}
export const ListVpcEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/domain/{DomainName}/listVpcEndpointAccess",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVpcEndpointAccessRequest",
}) as any as S.Schema<ListVpcEndpointAccessRequest>;
export type AuthorizedPrincipalList = AuthorizedPrincipal[];
export const AuthorizedPrincipalList =
  /*@__PURE__*/ S.Array(AuthorizedPrincipal);
export interface ListVpcEndpointAccessResponse {
  AuthorizedPrincipalList: AuthorizedPrincipal[];
  NextToken: string;
}
export const ListVpcEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizedPrincipalList: AuthorizedPrincipalList,
    NextToken: S.String,
  }).pipe(ns),
).annotate({
  identifier: "ListVpcEndpointAccessResponse",
}) as any as S.Schema<ListVpcEndpointAccessResponse>;
export interface ListVpcEndpointsRequest {
  NextToken?: string;
}
export const ListVpcEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2015-01-01/es/vpcEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVpcEndpointsRequest",
}) as any as S.Schema<ListVpcEndpointsRequest>;
export type VpcEndpointSummaryList = VpcEndpointSummary[];
export const VpcEndpointSummaryList = /*@__PURE__*/ S.Array(VpcEndpointSummary);
export interface ListVpcEndpointsResponse {
  VpcEndpointSummaryList: VpcEndpointSummary[];
  NextToken: string;
}
export const ListVpcEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointSummaryList: VpcEndpointSummaryList,
    NextToken: S.String,
  }).pipe(ns),
).annotate({
  identifier: "ListVpcEndpointsResponse",
}) as any as S.Schema<ListVpcEndpointsResponse>;
export interface ListVpcEndpointsForDomainRequest {
  DomainName: string;
  NextToken?: string;
}
export const ListVpcEndpointsForDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2015-01-01/es/domain/{DomainName}/vpcEndpoints",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVpcEndpointsForDomainRequest",
}) as any as S.Schema<ListVpcEndpointsForDomainRequest>;
export interface ListVpcEndpointsForDomainResponse {
  VpcEndpointSummaryList: VpcEndpointSummary[];
  NextToken: string;
}
export const ListVpcEndpointsForDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointSummaryList: VpcEndpointSummaryList,
    NextToken: S.String,
  }).pipe(ns),
).annotate({
  identifier: "ListVpcEndpointsForDomainResponse",
}) as any as S.Schema<ListVpcEndpointsForDomainResponse>;
export type InstanceCount = number;
export interface PurchaseReservedElasticsearchInstanceOfferingRequest {
  ReservedElasticsearchInstanceOfferingId: string;
  ReservationName: string;
  InstanceCount?: number;
}
export const PurchaseReservedElasticsearchInstanceOfferingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedElasticsearchInstanceOfferingId: S.String,
      ReservationName: S.String,
      InstanceCount: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/purchaseReservedInstanceOffering",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PurchaseReservedElasticsearchInstanceOfferingRequest",
  }) as any as S.Schema<PurchaseReservedElasticsearchInstanceOfferingRequest>;
export interface PurchaseReservedElasticsearchInstanceOfferingResponse {
  ReservedElasticsearchInstanceId?: string;
  ReservationName?: string;
}
export const PurchaseReservedElasticsearchInstanceOfferingResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedElasticsearchInstanceId: S.optional(S.String),
      ReservationName: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "PurchaseReservedElasticsearchInstanceOfferingResponse",
  }) as any as S.Schema<PurchaseReservedElasticsearchInstanceOfferingResponse>;
export interface RejectInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export const RejectInboundCrossClusterSearchConnectionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnectionId: S.String.pipe(
        T.HttpLabel("CrossClusterSearchConnectionId"),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/reject",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "RejectInboundCrossClusterSearchConnectionRequest",
  }) as any as S.Schema<RejectInboundCrossClusterSearchConnectionRequest>;
export interface RejectInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export const RejectInboundCrossClusterSearchConnectionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CrossClusterSearchConnection: S.optional(
        InboundCrossClusterSearchConnection,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "RejectInboundCrossClusterSearchConnectionResponse",
  }) as any as S.Schema<RejectInboundCrossClusterSearchConnectionResponse>;
export interface RemoveTagsRequest {
  ARN: string;
  TagKeys: string[];
}
export const RemoveTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String, TagKeys: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/tags-removal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveTagsRequest",
}) as any as S.Schema<RemoveTagsRequest>;
export interface RemoveTagsResponse {}
export const RemoveTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsResponse",
}) as any as S.Schema<RemoveTagsResponse>;
export interface RevokeVpcEndpointAccessRequest {
  DomainName: string;
  Account: string;
}
export const RevokeVpcEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Account: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2015-01-01/es/domain/{DomainName}/revokeVpcEndpointAccess",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeVpcEndpointAccessRequest",
}) as any as S.Schema<RevokeVpcEndpointAccessRequest>;
export interface RevokeVpcEndpointAccessResponse {}
export const RevokeVpcEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RevokeVpcEndpointAccessResponse",
}) as any as S.Schema<RevokeVpcEndpointAccessResponse>;
export interface StartElasticsearchServiceSoftwareUpdateRequest {
  DomainName: string;
}
export const StartElasticsearchServiceSoftwareUpdateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DomainName: S.String }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/serviceSoftwareUpdate/start",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartElasticsearchServiceSoftwareUpdateRequest",
  }) as any as S.Schema<StartElasticsearchServiceSoftwareUpdateRequest>;
export interface StartElasticsearchServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export const StartElasticsearchServiceSoftwareUpdateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceSoftwareOptions: S.optional(ServiceSoftwareOptions),
    }).pipe(ns),
  ).annotate({
    identifier: "StartElasticsearchServiceSoftwareUpdateResponse",
  }) as any as S.Schema<StartElasticsearchServiceSoftwareUpdateResponse>;
export interface UpdateElasticsearchDomainConfigRequest {
  DomainName: string;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  AccessPolicies?: string;
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  AutoTuneOptions?: AutoTuneOptions;
  DryRun?: boolean;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export const UpdateElasticsearchDomainConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainName: S.String.pipe(T.HttpLabel("DomainName")),
      ElasticsearchClusterConfig: S.optional(ElasticsearchClusterConfig),
      EBSOptions: S.optional(EBSOptions),
      SnapshotOptions: S.optional(SnapshotOptions),
      VPCOptions: S.optional(VPCOptions),
      CognitoOptions: S.optional(CognitoOptions),
      AdvancedOptions: S.optional(AdvancedOptions),
      AccessPolicies: S.optional(S.String),
      LogPublishingOptions: S.optional(LogPublishingOptions),
      DomainEndpointOptions: S.optional(DomainEndpointOptions),
      AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsInput),
      NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptions),
      EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
      AutoTuneOptions: S.optional(AutoTuneOptions),
      DryRun: S.optional(S.Boolean),
      DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
      AutomatedSnapshotPauseOptions: S.optional(
        AutomatedSnapshotPauseRequestOptions,
      ),
      UseCase: S.optional(DomainUseCase),
      EngineMode: S.optional(DomainEngineMode),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2015-01-01/es/domain/{DomainName}/config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateElasticsearchDomainConfigRequest",
}) as any as S.Schema<UpdateElasticsearchDomainConfigRequest>;
export type DeploymentType = string;
export interface DryRunResults {
  DeploymentType?: string;
  Message?: string;
}
export const DryRunResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentType: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({ identifier: "DryRunResults" }) as any as S.Schema<DryRunResults>;
export interface UpdateElasticsearchDomainConfigResponse {
  DomainConfig: ElasticsearchDomainConfig;
  DryRunResults?: DryRunResults;
}
export const UpdateElasticsearchDomainConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainConfig: ElasticsearchDomainConfig,
      DryRunResults: S.optional(DryRunResults),
    }).pipe(ns),
).annotate({
  identifier: "UpdateElasticsearchDomainConfigResponse",
}) as any as S.Schema<UpdateElasticsearchDomainConfigResponse>;
export interface UpdatePackageRequest {
  PackageID: string;
  PackageSource: PackageSource;
  PackageDescription?: string;
  CommitMessage?: string;
}
export const UpdatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String,
    PackageSource: PackageSource,
    PackageDescription: S.optional(S.String),
    CommitMessage: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/packages/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageRequest",
}) as any as S.Schema<UpdatePackageRequest>;
export interface UpdatePackageResponse {
  PackageDetails?: PackageDetails;
}
export const UpdatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageDetails: S.optional(PackageDetails) }).pipe(ns),
).annotate({
  identifier: "UpdatePackageResponse",
}) as any as S.Schema<UpdatePackageResponse>;
export interface UpdateVpcEndpointRequest {
  VpcEndpointId: string;
  VpcOptions: VPCOptions;
}
export const UpdateVpcEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointId: S.String, VpcOptions: VPCOptions }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVpcEndpointRequest",
}) as any as S.Schema<UpdateVpcEndpointRequest>;
export interface UpdateVpcEndpointResponse {
  VpcEndpoint: VpcEndpoint;
}
export const UpdateVpcEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpoint: VpcEndpoint }).pipe(ns),
).annotate({
  identifier: "UpdateVpcEndpointResponse",
}) as any as S.Schema<UpdateVpcEndpointResponse>;
export interface UpgradeElasticsearchDomainRequest {
  DomainName: string;
  TargetVersion: string;
  PerformCheckOnly?: boolean;
}
export const UpgradeElasticsearchDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    TargetVersion: S.String,
    PerformCheckOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2015-01-01/es/upgradeDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradeElasticsearchDomainRequest",
}) as any as S.Schema<UpgradeElasticsearchDomainRequest>;
export interface UpgradeElasticsearchDomainResponse {
  DomainName?: string;
  TargetVersion?: string;
  PerformCheckOnly?: boolean;
  ChangeProgressDetails?: ChangeProgressDetails;
}
export const UpgradeElasticsearchDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    TargetVersion: S.optional(S.String),
    PerformCheckOnly: S.optional(S.Boolean),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
  }).pipe(ns),
).annotate({
  identifier: "UpgradeElasticsearchDomainResponse",
}) as any as S.Schema<UpgradeElasticsearchDomainResponse>;
export type AcceptInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to accept an inbound cross-cluster search connection request.
 */
export const acceptInboundCrossClusterSearchConnection: API.OperationMethod<
  AcceptInboundCrossClusterSearchConnectionRequest,
  AcceptInboundCrossClusterSearchConnectionResponse,
  AcceptInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptInboundCrossClusterSearchConnectionRequest,
  output: AcceptInboundCrossClusterSearchConnectionResponse,
  errors: [
    DisabledOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInboundCrossClusterSearchConnection",
}));

export type AddTagsError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to an existing Elasticsearch domain. Tags are a set of case-sensitive key value pairs. An Elasticsearch domain may have up to 10 tags. See
 * Tagging Amazon Elasticsearch Service Domains for more information.
 */
export const addTags: API.OperationMethod<
  AddTagsRequest,
  AddTagsResponse,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsRequest,
  output: AddTagsResponse,
  errors: [
    BaseException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type AssociatePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a package with an Amazon ES domain.
 */
export const associatePackage: API.OperationMethod<
  AssociatePackageRequest,
  AssociatePackageResponse,
  AssociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePackageRequest,
  output: AssociatePackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePackage",
}));

export type AuthorizeVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides access to an Amazon OpenSearch Service domain through the use of an interface VPC endpoint.
 */
export const authorizeVpcEndpointAccess: API.OperationMethod<
  AuthorizeVpcEndpointAccessRequest,
  AuthorizeVpcEndpointAccessResponse,
  AuthorizeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeVpcEndpointAccessRequest,
  output: AuthorizeVpcEndpointAccessResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeVpcEndpointAccess",
}));

export type CancelDomainConfigChangeError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending configuration change on an Amazon OpenSearch Service domain.
 */
export const cancelDomainConfigChange: API.OperationMethod<
  CancelDomainConfigChangeRequest,
  CancelDomainConfigChangeResponse,
  CancelDomainConfigChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDomainConfigChangeRequest,
  output: CancelDomainConfigChangeResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDomainConfigChange",
}));

export type CancelElasticsearchServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a scheduled service software update for an Amazon ES domain. You can only perform this operation before the `AutomatedUpdateDate` and when the `UpdateStatus` is in the `PENDING_UPDATE` state.
 */
export const cancelElasticsearchServiceSoftwareUpdate: API.OperationMethod<
  CancelElasticsearchServiceSoftwareUpdateRequest,
  CancelElasticsearchServiceSoftwareUpdateResponse,
  CancelElasticsearchServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelElasticsearchServiceSoftwareUpdateRequest,
  output: CancelElasticsearchServiceSoftwareUpdateResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelElasticsearchServiceSoftwareUpdate",
}));

export type CreateElasticsearchDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Elasticsearch domain. For more information,
 * see Creating Elasticsearch Domains in the *Amazon Elasticsearch Service Developer Guide*.
 */
export const createElasticsearchDomain: API.OperationMethod<
  CreateElasticsearchDomainRequest,
  CreateElasticsearchDomainResponse,
  CreateElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateElasticsearchDomainRequest,
  output: CreateElasticsearchDomainResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateElasticsearchDomain",
}));

export type CreateOutboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new cross-cluster search connection from a source domain to a destination domain.
 */
export const createOutboundCrossClusterSearchConnection: API.OperationMethod<
  CreateOutboundCrossClusterSearchConnectionRequest,
  CreateOutboundCrossClusterSearchConnectionResponse,
  CreateOutboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOutboundCrossClusterSearchConnectionRequest,
  output: CreateOutboundCrossClusterSearchConnectionResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutboundCrossClusterSearchConnection",
}));

export type CreatePackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Create a package for use with Amazon ES domains.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageRequest,
  output: CreatePackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackage",
}));

export type CreateVpcEndpointError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon OpenSearch Service-managed VPC endpoint.
 */
export const createVpcEndpoint: API.OperationMethod<
  CreateVpcEndpointRequest,
  CreateVpcEndpointResponse,
  CreateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcEndpointRequest,
  output: CreateVpcEndpointResponse,
  errors: [
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcEndpoint",
}));

export type DeleteElasticsearchDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the specified Elasticsearch domain and all of its data. Once a domain is deleted, it cannot be recovered.
 */
export const deleteElasticsearchDomain: API.OperationMethod<
  DeleteElasticsearchDomainRequest,
  DeleteElasticsearchDomainResponse,
  DeleteElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteElasticsearchDomainRequest,
  output: DeleteElasticsearchDomainResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchDomain",
}));

export type DeleteElasticsearchServiceRoleError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the service-linked role that Elasticsearch Service uses to manage and maintain VPC domains. Role deletion will fail if any existing VPC domains use the role. You must delete any such Elasticsearch domains before deleting the role. See Deleting Elasticsearch Service Role in *VPC Endpoints for Amazon Elasticsearch Service Domains*.
 */
export const deleteElasticsearchServiceRole: API.OperationMethod<
  DeleteElasticsearchServiceRoleRequest,
  DeleteElasticsearchServiceRoleResponse,
  DeleteElasticsearchServiceRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteElasticsearchServiceRoleRequest,
  output: DeleteElasticsearchServiceRoleResponse,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchServiceRole",
}));

export type DeleteInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to delete an existing inbound cross-cluster search connection.
 */
export const deleteInboundCrossClusterSearchConnection: API.OperationMethod<
  DeleteInboundCrossClusterSearchConnectionRequest,
  DeleteInboundCrossClusterSearchConnectionResponse,
  DeleteInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInboundCrossClusterSearchConnectionRequest,
  output: DeleteInboundCrossClusterSearchConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundCrossClusterSearchConnection",
}));

export type DeleteOutboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the source domain owner to delete an existing outbound cross-cluster search connection.
 */
export const deleteOutboundCrossClusterSearchConnection: API.OperationMethod<
  DeleteOutboundCrossClusterSearchConnectionRequest,
  DeleteOutboundCrossClusterSearchConnectionResponse,
  DeleteOutboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOutboundCrossClusterSearchConnectionRequest,
  output: DeleteOutboundCrossClusterSearchConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundCrossClusterSearchConnection",
}));

export type DeletePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the package.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageRequest,
  output: DeletePackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
}));

export type DeleteVpcEndpointError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon OpenSearch Service-managed interface VPC endpoint.
 */
export const deleteVpcEndpoint: API.OperationMethod<
  DeleteVpcEndpointRequest,
  DeleteVpcEndpointResponse,
  DeleteVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcEndpointRequest,
  output: DeleteVpcEndpointResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpoint",
}));

export type DescribeDomainAutoTunesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides scheduled Auto-Tune action details for the Elasticsearch domain, such as Auto-Tune action type, description, severity, and scheduled date.
 */
export const describeDomainAutoTunes: API.PaginatedOperationMethod<
  DescribeDomainAutoTunesRequest,
  DescribeDomainAutoTunesResponse,
  DescribeDomainAutoTunesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDomainAutoTunesRequest,
  output: DescribeDomainAutoTunesResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainAutoTunes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDomainChangeProgressError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the current blue/green deployment happening on a domain, including
 * a change ID, status, and progress stages.
 */
export const describeDomainChangeProgress: API.OperationMethod<
  DescribeDomainChangeProgressRequest,
  DescribeDomainChangeProgressResponse,
  DescribeDomainChangeProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainChangeProgressRequest,
  output: DescribeDomainChangeProgressResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainChangeProgress",
}));

export type DescribeElasticsearchDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Elasticsearch domain, including the domain ID, domain endpoint, and domain ARN.
 */
export const describeElasticsearchDomain: API.OperationMethod<
  DescribeElasticsearchDomainRequest,
  DescribeElasticsearchDomainResponse,
  DescribeElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeElasticsearchDomainRequest,
  output: DescribeElasticsearchDomainResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomain",
}));

export type DescribeElasticsearchDomainConfigError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides cluster configuration information about the specified Elasticsearch domain, such as the state, creation date, update version, and update date for cluster options.
 */
export const describeElasticsearchDomainConfig: API.OperationMethod<
  DescribeElasticsearchDomainConfigRequest,
  DescribeElasticsearchDomainConfigResponse,
  DescribeElasticsearchDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeElasticsearchDomainConfigRequest,
  output: DescribeElasticsearchDomainConfigResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomainConfig",
}));

export type DescribeElasticsearchDomainsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Elasticsearch domains, including the domain ID, domain endpoint, and domain ARN.
 */
export const describeElasticsearchDomains: API.OperationMethod<
  DescribeElasticsearchDomainsRequest,
  DescribeElasticsearchDomainsResponse,
  DescribeElasticsearchDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeElasticsearchDomainsRequest,
  output: DescribeElasticsearchDomainsResponse,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomains",
}));

export type DescribeElasticsearchInstanceTypeLimitsError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describe Elasticsearch Limits for a given InstanceType and ElasticsearchVersion.
 * When modifying existing Domain, specify the
 *
 * DomainName
 *
 * to know what Limits are supported for modifying.
 */
export const describeElasticsearchInstanceTypeLimits: API.OperationMethod<
  DescribeElasticsearchInstanceTypeLimitsRequest,
  DescribeElasticsearchInstanceTypeLimitsResponse,
  DescribeElasticsearchInstanceTypeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeElasticsearchInstanceTypeLimitsRequest,
  output: DescribeElasticsearchInstanceTypeLimitsResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchInstanceTypeLimits",
}));

export type DescribeInboundCrossClusterSearchConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the inbound cross-cluster search connections for a destination domain.
 */
export const describeInboundCrossClusterSearchConnections: API.PaginatedOperationMethod<
  DescribeInboundCrossClusterSearchConnectionsRequest,
  DescribeInboundCrossClusterSearchConnectionsResponse,
  DescribeInboundCrossClusterSearchConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInboundCrossClusterSearchConnectionsRequest,
  output: DescribeInboundCrossClusterSearchConnectionsResponse,
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundCrossClusterSearchConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOutboundCrossClusterSearchConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the outbound cross-cluster search connections for a source domain.
 */
export const describeOutboundCrossClusterSearchConnections: API.PaginatedOperationMethod<
  DescribeOutboundCrossClusterSearchConnectionsRequest,
  DescribeOutboundCrossClusterSearchConnectionsResponse,
  DescribeOutboundCrossClusterSearchConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOutboundCrossClusterSearchConnectionsRequest,
  output: DescribeOutboundCrossClusterSearchConnectionsResponse,
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOutboundCrossClusterSearchConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePackagesError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes all packages available to Amazon ES. Includes options for filtering, limiting the number of results, and pagination.
 */
export const describePackages: API.PaginatedOperationMethod<
  DescribePackagesRequest,
  DescribePackagesResponse,
  DescribePackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePackagesRequest,
  output: DescribePackagesResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedElasticsearchInstanceOfferingsError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists available reserved Elasticsearch instance offerings.
 */
export const describeReservedElasticsearchInstanceOfferings: API.PaginatedOperationMethod<
  DescribeReservedElasticsearchInstanceOfferingsRequest,
  DescribeReservedElasticsearchInstanceOfferingsResponse,
  DescribeReservedElasticsearchInstanceOfferingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedElasticsearchInstanceOfferingsRequest,
  output: DescribeReservedElasticsearchInstanceOfferingsResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedElasticsearchInstanceOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedElasticsearchInstancesError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about reserved Elasticsearch instances for this account.
 */
export const describeReservedElasticsearchInstances: API.PaginatedOperationMethod<
  DescribeReservedElasticsearchInstancesRequest,
  DescribeReservedElasticsearchInstancesResponse,
  DescribeReservedElasticsearchInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedElasticsearchInstancesRequest,
  output: DescribeReservedElasticsearchInstancesResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedElasticsearchInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVpcEndpointsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Describes one or more Amazon OpenSearch Service-managed VPC endpoints.
 */
export const describeVpcEndpoints: API.OperationMethod<
  DescribeVpcEndpointsRequest,
  DescribeVpcEndpointsResponse,
  DescribeVpcEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcEndpointsRequest,
  output: DescribeVpcEndpointsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpoints",
}));

export type DissociatePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates a package from the Amazon ES domain.
 */
export const dissociatePackage: API.OperationMethod<
  DissociatePackageRequest,
  DissociatePackageResponse,
  DissociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DissociatePackageRequest,
  output: DissociatePackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociatePackage",
}));

export type GetCompatibleElasticsearchVersionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of upgrade compatible Elastisearch versions.
 * You can optionally pass a
 *
 * DomainName
 *
 * to get all upgrade compatible Elasticsearch versions for that specific domain.
 */
export const getCompatibleElasticsearchVersions: API.OperationMethod<
  GetCompatibleElasticsearchVersionsRequest,
  GetCompatibleElasticsearchVersionsResponse,
  GetCompatibleElasticsearchVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCompatibleElasticsearchVersionsRequest,
  output: GetCompatibleElasticsearchVersionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCompatibleElasticsearchVersions",
}));

export type GetPackageVersionHistoryError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of versions of the package, along with their creation time and commit message.
 */
export const getPackageVersionHistory: API.PaginatedOperationMethod<
  GetPackageVersionHistoryRequest,
  GetPackageVersionHistoryResponse,
  GetPackageVersionHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPackageVersionHistoryRequest,
  output: GetPackageVersionHistoryResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersionHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUpgradeHistoryError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the complete history of the last 10 upgrades that were performed on the domain.
 */
export const getUpgradeHistory: API.PaginatedOperationMethod<
  GetUpgradeHistoryRequest,
  GetUpgradeHistoryResponse,
  GetUpgradeHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUpgradeHistoryRequest,
  output: GetUpgradeHistoryResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpgradeHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUpgradeStatusError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the latest status of the last upgrade or upgrade eligibility check that was performed on the domain.
 */
export const getUpgradeStatus: API.OperationMethod<
  GetUpgradeStatusRequest,
  GetUpgradeStatusResponse,
  GetUpgradeStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUpgradeStatusRequest,
  output: GetUpgradeStatusResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpgradeStatus",
}));

export type ListDomainNamesError =
  | BaseException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of all Elasticsearch domains owned by the current user's account.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDomainNamesRequest,
  output: ListDomainNamesResponse,
  errors: [BaseException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
}));

export type ListDomainsForPackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon ES domains associated with the package.
 */
export const listDomainsForPackage: API.PaginatedOperationMethod<
  ListDomainsForPackageRequest,
  ListDomainsForPackageResponse,
  ListDomainsForPackageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsForPackageRequest,
  output: ListDomainsForPackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainsForPackage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListElasticsearchInstanceTypesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List all Elasticsearch instance types that are supported for given ElasticsearchVersion
 */
export const listElasticsearchInstanceTypes: API.PaginatedOperationMethod<
  ListElasticsearchInstanceTypesRequest,
  ListElasticsearchInstanceTypesResponse,
  ListElasticsearchInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListElasticsearchInstanceTypesRequest,
  output: ListElasticsearchInstanceTypesResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListElasticsearchInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListElasticsearchVersionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List all supported Elasticsearch versions
 */
export const listElasticsearchVersions: API.PaginatedOperationMethod<
  ListElasticsearchVersionsRequest,
  ListElasticsearchVersionsResponse,
  ListElasticsearchVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListElasticsearchVersionsRequest,
  output: ListElasticsearchVersionsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListElasticsearchVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagesForDomainError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all packages associated with the Amazon ES domain.
 */
export const listPackagesForDomain: API.PaginatedOperationMethod<
  ListPackagesForDomainRequest,
  ListPackagesForDomainResponse,
  ListPackagesForDomainError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagesForDomainRequest,
  output: ListPackagesForDomainResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackagesForDomain",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns all tags for the given Elasticsearch domain.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about each principal that is allowed to access a
 * given Amazon OpenSearch Service domain through the use of an interface VPC endpoint.
 */
export const listVpcEndpointAccess: API.OperationMethod<
  ListVpcEndpointAccessRequest,
  ListVpcEndpointAccessResponse,
  ListVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVpcEndpointAccessRequest,
  output: ListVpcEndpointAccessResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointAccess",
}));

export type ListVpcEndpointsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | CommonErrors;
/**
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints in the current account and Region.
 */
export const listVpcEndpoints: API.OperationMethod<
  ListVpcEndpointsRequest,
  ListVpcEndpointsResponse,
  ListVpcEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVpcEndpointsRequest,
  output: ListVpcEndpointsResponse,
  errors: [BaseException, DisabledOperationException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpoints",
}));

export type ListVpcEndpointsForDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints associated with a particular domain.
 */
export const listVpcEndpointsForDomain: API.OperationMethod<
  ListVpcEndpointsForDomainRequest,
  ListVpcEndpointsForDomainResponse,
  ListVpcEndpointsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVpcEndpointsForDomainRequest,
  output: ListVpcEndpointsForDomainResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointsForDomain",
}));

export type PurchaseReservedElasticsearchInstanceOfferingError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to purchase reserved Elasticsearch instances.
 */
export const purchaseReservedElasticsearchInstanceOffering: API.OperationMethod<
  PurchaseReservedElasticsearchInstanceOfferingRequest,
  PurchaseReservedElasticsearchInstanceOfferingResponse,
  PurchaseReservedElasticsearchInstanceOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseReservedElasticsearchInstanceOfferingRequest,
  output: PurchaseReservedElasticsearchInstanceOfferingResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedElasticsearchInstanceOffering",
}));

export type RejectInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to reject an inbound cross-cluster search connection request.
 */
export const rejectInboundCrossClusterSearchConnection: API.OperationMethod<
  RejectInboundCrossClusterSearchConnectionRequest,
  RejectInboundCrossClusterSearchConnectionResponse,
  RejectInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectInboundCrossClusterSearchConnectionRequest,
  output: RejectInboundCrossClusterSearchConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInboundCrossClusterSearchConnection",
}));

export type RemoveTagsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified set of tags from the specified Elasticsearch domain.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsRequest,
  RemoveTagsResponse,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsRequest,
  output: RemoveTagsResponse,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type RevokeVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Revokes access to an Amazon OpenSearch Service domain that was provided through an interface
 * VPC endpoint.
 */
export const revokeVpcEndpointAccess: API.OperationMethod<
  RevokeVpcEndpointAccessRequest,
  RevokeVpcEndpointAccessResponse,
  RevokeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeVpcEndpointAccessRequest,
  output: RevokeVpcEndpointAccessResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeVpcEndpointAccess",
}));

export type StartElasticsearchServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Schedules a service software update for an Amazon ES domain.
 */
export const startElasticsearchServiceSoftwareUpdate: API.OperationMethod<
  StartElasticsearchServiceSoftwareUpdateRequest,
  StartElasticsearchServiceSoftwareUpdateResponse,
  StartElasticsearchServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartElasticsearchServiceSoftwareUpdateRequest,
  output: StartElasticsearchServiceSoftwareUpdateResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartElasticsearchServiceSoftwareUpdate",
}));

export type UpdateElasticsearchDomainConfigError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the cluster configuration of the specified Elasticsearch domain, setting as setting the instance type and the number of instances.
 */
export const updateElasticsearchDomainConfig: API.OperationMethod<
  UpdateElasticsearchDomainConfigRequest,
  UpdateElasticsearchDomainConfigResponse,
  UpdateElasticsearchDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateElasticsearchDomainConfigRequest,
  output: UpdateElasticsearchDomainConfigResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateElasticsearchDomainConfig",
}));

export type UpdatePackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a package for use with Amazon ES domains.
 */
export const updatePackage: API.OperationMethod<
  UpdatePackageRequest,
  UpdatePackageResponse,
  UpdatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageRequest,
  output: UpdatePackageResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackage",
}));

export type UpdateVpcEndpointError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an Amazon OpenSearch Service-managed interface VPC endpoint.
 */
export const updateVpcEndpoint: API.OperationMethod<
  UpdateVpcEndpointRequest,
  UpdateVpcEndpointResponse,
  UpdateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVpcEndpointRequest,
  output: UpdateVpcEndpointResponse,
  errors: [
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcEndpoint",
}));

export type UpgradeElasticsearchDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to either upgrade your domain or perform an Upgrade eligibility check to a compatible Elasticsearch version.
 */
export const upgradeElasticsearchDomain: API.OperationMethod<
  UpgradeElasticsearchDomainRequest,
  UpgradeElasticsearchDomainResponse,
  UpgradeElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpgradeElasticsearchDomainRequest,
  output: UpgradeElasticsearchDomainResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpgradeElasticsearchDomain",
}));
