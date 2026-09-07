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
const ns = T.XmlNamespace("http://es.amazonaws.com/doc/2021-01-01/");
const svc = T.AwsApiService({
  sdkId: "OpenSearch",
  serviceShapeName: "AmazonOpenSearchService",
});
const auth = T.AwsAuthSigv4({ name: "es" });
const ver = T.ServiceVersion("2021-01-01");
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
export class DependencyFailureException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailureException>()(
    "DependencyFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SlotNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<SlotNotAvailableException>()(
    "SlotNotAvailableException",
    {
      SlotSuggestions: S.optional(
        S.suspend(() => SlotList).annotate({ identifier: "SlotList" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ConnectionId = string;
export interface AcceptInboundConnectionRequest {
  ConnectionId: string;
}
export const AcceptInboundConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}/accept",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptInboundConnectionRequest",
}) as any as S.Schema<AcceptInboundConnectionRequest>;
export type OwnerId = string;
export type DomainName = string;
export type Region = string;
export interface AWSDomainInformation {
  OwnerId?: string;
  DomainName: string;
  Region?: string;
}
export const AWSDomainInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    DomainName: S.String,
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "AWSDomainInformation",
}) as any as S.Schema<AWSDomainInformation>;
export interface DomainInformationContainer {
  AWSDomainInformation?: AWSDomainInformation;
}
export const DomainInformationContainer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AWSDomainInformation: S.optional(AWSDomainInformation) }),
).annotate({
  identifier: "DomainInformationContainer",
}) as any as S.Schema<DomainInformationContainer>;
export type InboundConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const InboundConnectionStatusCode = /*@__PURE__*/ S.String;

export type ConnectionStatusMessage = string;
export interface InboundConnectionStatus {
  StatusCode?: InboundConnectionStatusCode;
  Message?: string;
}
export const InboundConnectionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(InboundConnectionStatusCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "InboundConnectionStatus",
}) as any as S.Schema<InboundConnectionStatus>;
export type ConnectionMode = "DIRECT" | "VPC_ENDPOINT" | (string & {});
export const ConnectionMode = /*@__PURE__*/ S.String;

export interface InboundConnection {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionId?: string;
  ConnectionStatus?: InboundConnectionStatus;
  ConnectionMode?: ConnectionMode;
}
export const InboundConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalDomainInfo: S.optional(DomainInformationContainer),
    RemoteDomainInfo: S.optional(DomainInformationContainer),
    ConnectionId: S.optional(S.String),
    ConnectionStatus: S.optional(InboundConnectionStatus),
    ConnectionMode: S.optional(ConnectionMode),
  }),
).annotate({
  identifier: "InboundConnection",
}) as any as S.Schema<InboundConnection>;
export interface AcceptInboundConnectionResponse {
  Connection?: InboundConnection;
}
export const AcceptInboundConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(InboundConnection) }).pipe(ns),
).annotate({
  identifier: "AcceptInboundConnectionResponse",
}) as any as S.Schema<AcceptInboundConnectionResponse>;
export type DataSourceName = string;
export type RoleArn = string;
export interface S3GlueDataCatalog {
  RoleArn?: string;
}
export const S3GlueDataCatalog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.optional(S.String) }),
).annotate({
  identifier: "S3GlueDataCatalog",
}) as any as S.Schema<S3GlueDataCatalog>;
export type DataSourceType = { S3GlueDataCatalog: S3GlueDataCatalog };
export const DataSourceType = /*@__PURE__*/ S.Union([
  S.Struct({ S3GlueDataCatalog: S3GlueDataCatalog }),
]);
export type DataSourceDescription = string;
export interface AddDataSourceRequest {
  DomainName: string;
  Name: string;
  DataSourceType: DataSourceType;
  Description?: string;
}
export const AddDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Name: S.String,
    DataSourceType: DataSourceType,
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dataSource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddDataSourceRequest",
}) as any as S.Schema<AddDataSourceRequest>;
export interface AddDataSourceResponse {
  Message?: string;
}
export const AddDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AddDataSourceResponse",
}) as any as S.Schema<AddDataSourceResponse>;
export type DirectQueryDataSourceName = string;
export type DirectQueryDataSourceRoleArn = string;
export interface CloudWatchDirectQueryDataSource {
  RoleArn: string;
}
export const CloudWatchDirectQueryDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.String }),
).annotate({
  identifier: "CloudWatchDirectQueryDataSource",
}) as any as S.Schema<CloudWatchDirectQueryDataSource>;
export interface SecurityLakeDirectQueryDataSource {
  RoleArn: string;
}
export const SecurityLakeDirectQueryDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.String }),
).annotate({
  identifier: "SecurityLakeDirectQueryDataSource",
}) as any as S.Schema<SecurityLakeDirectQueryDataSource>;
export type AMPWorkspaceArn = string;
export interface PrometheusDirectQueryDataSource {
  RoleArn: string;
  WorkspaceArn: string;
}
export const PrometheusDirectQueryDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.String, WorkspaceArn: S.String }),
).annotate({
  identifier: "PrometheusDirectQueryDataSource",
}) as any as S.Schema<PrometheusDirectQueryDataSource>;
export type DirectQueryDataSourceType =
  | {
      CloudWatchLog: CloudWatchDirectQueryDataSource;
      SecurityLake?: never;
      Prometheus?: never;
    }
  | {
      CloudWatchLog?: never;
      SecurityLake: SecurityLakeDirectQueryDataSource;
      Prometheus?: never;
    }
  | {
      CloudWatchLog?: never;
      SecurityLake?: never;
      Prometheus: PrometheusDirectQueryDataSource;
    };
export const DirectQueryDataSourceType = /*@__PURE__*/ S.Union([
  S.Struct({ CloudWatchLog: CloudWatchDirectQueryDataSource }),
  S.Struct({ SecurityLake: SecurityLakeDirectQueryDataSource }),
  S.Struct({ Prometheus: PrometheusDirectQueryDataSource }),
]);
export type DirectQueryDataSourceDescription = string;
export type ARN = string;
export type DirectQueryOpenSearchARNList = string[];
export const DirectQueryOpenSearchARNList = /*@__PURE__*/ S.Array(S.String);
export type PolicyDocument = string;
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
export interface AddDirectQueryDataSourceRequest {
  DataSourceName: string;
  DataSourceType: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
  TagList?: Tag[];
}
export const AddDirectQueryDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.String,
    DataSourceType: DirectQueryDataSourceType,
    Description: S.optional(S.String),
    OpenSearchArns: S.optional(DirectQueryOpenSearchARNList),
    DataSourceAccessPolicy: S.optional(S.String),
    TagList: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/directQueryDataSource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddDirectQueryDataSourceRequest",
}) as any as S.Schema<AddDirectQueryDataSourceRequest>;
export interface AddDirectQueryDataSourceResponse {
  DataSourceArn?: string;
}
export const AddDirectQueryDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AddDirectQueryDataSourceResponse",
}) as any as S.Schema<AddDirectQueryDataSourceResponse>;
export interface AddTagsRequest {
  ARN: string;
  TagList: Tag[];
}
export const AddTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String, TagList: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/tags" }),
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
export type PackageIDList = string[];
export const PackageIDList = /*@__PURE__*/ S.Array(S.String);
export interface KeyStoreAccessOption {
  KeyAccessRoleArn?: string;
  KeyStoreAccessEnabled: boolean;
}
export const KeyStoreAccessOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAccessRoleArn: S.optional(S.String),
    KeyStoreAccessEnabled: S.Boolean,
  }),
).annotate({
  identifier: "KeyStoreAccessOption",
}) as any as S.Schema<KeyStoreAccessOption>;
export interface PackageAssociationConfiguration {
  KeyStoreAccessOption?: KeyStoreAccessOption;
}
export const PackageAssociationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyStoreAccessOption: S.optional(KeyStoreAccessOption) }),
).annotate({
  identifier: "PackageAssociationConfiguration",
}) as any as S.Schema<PackageAssociationConfiguration>;
export interface AssociatePackageRequest {
  PackageID: string;
  DomainName: string;
  PrerequisitePackageIDList?: string[];
  AssociationConfiguration?: PackageAssociationConfiguration;
}
export const AssociatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String.pipe(T.HttpLabel("PackageID")),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    PrerequisitePackageIDList: S.optional(PackageIDList),
    AssociationConfiguration: S.optional(PackageAssociationConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/packages/associate/{PackageID}/{DomainName}",
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
export type PackageType =
  | "TXT-DICTIONARY"
  | "ZIP-PLUGIN"
  | "PACKAGE-LICENSE"
  | "PACKAGE-CONFIG"
  | (string & {});
export const PackageType = /*@__PURE__*/ S.String;

export type LastUpdated = Date;
export type DomainPackageStatus =
  | "ASSOCIATING"
  | "ASSOCIATION_FAILED"
  | "ACTIVE"
  | "DISSOCIATING"
  | "DISSOCIATION_FAILED"
  | (string & {});
export const DomainPackageStatus = /*@__PURE__*/ S.String;

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
  PrerequisitePackageIDList?: string[];
  ReferencePath?: string;
  ErrorDetails?: ErrorDetails;
  AssociationConfiguration?: PackageAssociationConfiguration;
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
    PrerequisitePackageIDList: S.optional(PackageIDList),
    ReferencePath: S.optional(S.String),
    ErrorDetails: S.optional(ErrorDetails),
    AssociationConfiguration: S.optional(PackageAssociationConfiguration),
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
export interface PackageDetailsForAssociation {
  PackageID: string;
  PrerequisitePackageIDList?: string[];
  AssociationConfiguration?: PackageAssociationConfiguration;
}
export const PackageDetailsForAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String,
    PrerequisitePackageIDList: S.optional(PackageIDList),
    AssociationConfiguration: S.optional(PackageAssociationConfiguration),
  }),
).annotate({
  identifier: "PackageDetailsForAssociation",
}) as any as S.Schema<PackageDetailsForAssociation>;
export type PackageDetailsForAssociationList = PackageDetailsForAssociation[];
export const PackageDetailsForAssociationList = /*@__PURE__*/ S.Array(
  PackageDetailsForAssociation,
);
export interface AssociatePackagesRequest {
  PackageList: PackageDetailsForAssociation[];
  DomainName: string;
}
export const AssociatePackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageList: PackageDetailsForAssociationList,
    DomainName: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/packages/associateMultiple" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePackagesRequest",
}) as any as S.Schema<AssociatePackagesRequest>;
export type DomainPackageDetailsList = DomainPackageDetails[];
export const DomainPackageDetailsList =
  /*@__PURE__*/ S.Array(DomainPackageDetails);
export interface AssociatePackagesResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
}
export const AssociatePackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPackageDetailsList: S.optional(DomainPackageDetailsList),
  }).pipe(ns),
).annotate({
  identifier: "AssociatePackagesResponse",
}) as any as S.Schema<AssociatePackagesResponse>;
export type Id = string;
export interface WorkspaceConfigurationInput {
  name: string;
  workspaceType: string;
}
export const WorkspaceConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, workspaceType: S.String }),
).annotate({
  identifier: "WorkspaceConfigurationInput",
}) as any as S.Schema<WorkspaceConfigurationInput>;
export type ClientToken = string;
export interface AttachDataSourceRequest {
  id: string;
  dataSourceArn: string;
  workspaceId?: string;
  workspaceConfiguration?: WorkspaceConfigurationInput;
  clientToken?: string;
}
export const AttachDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dataSourceArn: S.String,
    workspaceId: S.optional(S.String),
    workspaceConfiguration: S.optional(WorkspaceConfigurationInput),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/application/{id}/attachDataSource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachDataSourceRequest",
}) as any as S.Schema<AttachDataSourceRequest>;
export type DataSourceAttachmentStatus =
  | "PENDING"
  | "ATTACHED"
  | "FAILED"
  | (string & {});
export const DataSourceAttachmentStatus = /*@__PURE__*/ S.String;

export interface AttachDataSourceResponse {
  attachmentId?: string;
  id?: string;
  arn?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export const AttachDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    id: S.optional(S.String),
    arn: S.optional(S.String),
    dataSourceArn: S.optional(S.String),
    status: S.optional(DataSourceAttachmentStatus),
  }).pipe(ns),
).annotate({
  identifier: "AttachDataSourceResponse",
}) as any as S.Schema<AttachDataSourceResponse>;
export type AWSAccount = string;
export type AWSServicePrincipal =
  | "application.opensearchservice.amazonaws.com"
  | (string & {});
export const AWSServicePrincipal = /*@__PURE__*/ S.String;

export type RegionsList = string[];
export const RegionsList = /*@__PURE__*/ S.Array(S.String);
export interface ServiceOptions {
  SupportedRegions?: string[];
}
export const ServiceOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SupportedRegions: S.optional(RegionsList) }),
).annotate({ identifier: "ServiceOptions" }) as any as S.Schema<ServiceOptions>;
export interface AuthorizeVpcEndpointAccessRequest {
  DomainName: string;
  Account?: string;
  Service?: AWSServicePrincipal;
  ServiceOptions?: ServiceOptions;
}
export const AuthorizeVpcEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Account: S.optional(S.String),
    Service: S.optional(AWSServicePrincipal),
    ServiceOptions: S.optional(ServiceOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/authorizeVpcEndpointAccess",
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
export const PrincipalType = /*@__PURE__*/ S.String;

export interface AuthorizedPrincipal {
  PrincipalType?: PrincipalType;
  Principal?: string;
  ServiceOptions?: ServiceOptions;
}
export const AuthorizedPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalType: S.optional(PrincipalType),
    Principal: S.optional(S.String),
    ServiceOptions: S.optional(ServiceOptions),
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
        uri: "/2021-01-01/opensearch/domain/{DomainName}/config/cancel",
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
  CancelledChangeIds?: string[];
  CancelledChangeProperties?: CancelledChangeProperty[];
  DryRun?: boolean;
}
export const CancelDomainConfigChangeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CancelledChangeIds: S.optional(GUIDList),
    CancelledChangeProperties: S.optional(CancelledChangePropertyList),
    DryRun: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "CancelDomainConfigChangeResponse",
}) as any as S.Schema<CancelDomainConfigChangeResponse>;
export interface CancelServiceSoftwareUpdateRequest {
  DomainName: string;
}
export const CancelServiceSoftwareUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/serviceSoftwareUpdate/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelServiceSoftwareUpdateRequest",
}) as any as S.Schema<CancelServiceSoftwareUpdateRequest>;
export type DeploymentStatus =
  | "PENDING_UPDATE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

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
export interface CancelServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export const CancelServiceSoftwareUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceSoftwareOptions: S.optional(ServiceSoftwareOptions) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CancelServiceSoftwareUpdateResponse",
}) as any as S.Schema<CancelServiceSoftwareUpdateResponse>;
export type ApplicationName = string;
export interface DataSource {
  dataSourceArn?: string;
  dataSourceDescription?: string;
  iamRoleForDataSourceArn?: string;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceArn: S.optional(S.String),
    dataSourceDescription: S.optional(S.String),
    iamRoleForDataSourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type DataSources = DataSource[];
export const DataSources = /*@__PURE__*/ S.Array(DataSource);
export interface IamIdentityCenterOptionsInput {
  enabled?: boolean;
  iamIdentityCenterInstanceArn?: string;
  iamRoleForIdentityCenterApplicationArn?: string;
}
export const IamIdentityCenterOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    iamIdentityCenterInstanceArn: S.optional(S.String),
    iamRoleForIdentityCenterApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IamIdentityCenterOptionsInput",
}) as any as S.Schema<IamIdentityCenterOptionsInput>;
export type AppConfigType =
  | "opensearchDashboards.dashboardAdmin.users"
  | "opensearchDashboards.dashboardAdmin.groups"
  | (string & {});
export const AppConfigType = /*@__PURE__*/ S.String;

export type AppConfigValue = string;
export interface AppConfig {
  key?: AppConfigType;
  value?: string;
}
export const AppConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(AppConfigType), value: S.optional(S.String) }),
).annotate({ identifier: "AppConfig" }) as any as S.Schema<AppConfig>;
export type AppConfigs = AppConfig[];
export const AppConfigs = /*@__PURE__*/ S.Array(AppConfig);
export type KmsKeyArn = string;
export interface CreateApplicationRequest {
  clientToken?: string;
  name: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptionsInput;
  appConfigs?: AppConfig[];
  tagList?: Tag[];
  kmsKeyArn?: string;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    dataSources: S.optional(DataSources),
    iamIdentityCenterOptions: S.optional(IamIdentityCenterOptionsInput),
    appConfigs: S.optional(AppConfigs),
    tagList: S.optional(TagList),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface IamIdentityCenterOptions {
  enabled?: boolean;
  iamIdentityCenterInstanceArn?: string;
  iamRoleForIdentityCenterApplicationArn?: string;
  iamIdentityCenterApplicationArn?: string;
}
export const IamIdentityCenterOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    iamIdentityCenterInstanceArn: S.optional(S.String),
    iamRoleForIdentityCenterApplicationArn: S.optional(S.String),
    iamIdentityCenterApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IamIdentityCenterOptions",
}) as any as S.Schema<IamIdentityCenterOptions>;
export interface CreateApplicationResponse {
  id?: string;
  name?: string;
  arn?: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  appConfigs?: AppConfig[];
  tagList?: Tag[];
  createdAt?: Date;
  kmsKeyArn?: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    dataSources: S.optional(DataSources),
    iamIdentityCenterOptions: S.optional(IamIdentityCenterOptions),
    appConfigs: S.optional(AppConfigs),
    tagList: S.optional(TagList),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    kmsKeyArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type VersionString = string;
export type OpenSearchPartitionInstanceType =
  | "m3.medium.search"
  | "m3.large.search"
  | "m3.xlarge.search"
  | "m3.2xlarge.search"
  | "m4.large.search"
  | "m4.xlarge.search"
  | "m4.2xlarge.search"
  | "m4.4xlarge.search"
  | "m4.10xlarge.search"
  | "m5.large.search"
  | "m5.xlarge.search"
  | "m5.2xlarge.search"
  | "m5.4xlarge.search"
  | "m5.12xlarge.search"
  | "m5.24xlarge.search"
  | "r5.large.search"
  | "r5.xlarge.search"
  | "r5.2xlarge.search"
  | "r5.4xlarge.search"
  | "r5.12xlarge.search"
  | "r5.24xlarge.search"
  | "c5.large.search"
  | "c5.xlarge.search"
  | "c5.2xlarge.search"
  | "c5.4xlarge.search"
  | "c5.9xlarge.search"
  | "c5.18xlarge.search"
  | "t3.nano.search"
  | "t3.micro.search"
  | "t3.small.search"
  | "t3.medium.search"
  | "t3.large.search"
  | "t3.xlarge.search"
  | "t3.2xlarge.search"
  | "or1.medium.search"
  | "or1.large.search"
  | "or1.xlarge.search"
  | "or1.2xlarge.search"
  | "or1.4xlarge.search"
  | "or1.8xlarge.search"
  | "or1.12xlarge.search"
  | "or1.16xlarge.search"
  | "ultrawarm1.medium.search"
  | "ultrawarm1.large.search"
  | "ultrawarm1.xlarge.search"
  | "t2.micro.search"
  | "t2.small.search"
  | "t2.medium.search"
  | "r3.large.search"
  | "r3.xlarge.search"
  | "r3.2xlarge.search"
  | "r3.4xlarge.search"
  | "r3.8xlarge.search"
  | "i2.xlarge.search"
  | "i2.2xlarge.search"
  | "d2.xlarge.search"
  | "d2.2xlarge.search"
  | "d2.4xlarge.search"
  | "d2.8xlarge.search"
  | "c4.large.search"
  | "c4.xlarge.search"
  | "c4.2xlarge.search"
  | "c4.4xlarge.search"
  | "c4.8xlarge.search"
  | "r4.large.search"
  | "r4.xlarge.search"
  | "r4.2xlarge.search"
  | "r4.4xlarge.search"
  | "r4.8xlarge.search"
  | "r4.16xlarge.search"
  | "i3.large.search"
  | "i3.xlarge.search"
  | "i3.2xlarge.search"
  | "i3.4xlarge.search"
  | "i3.8xlarge.search"
  | "i3.16xlarge.search"
  | "r6g.large.search"
  | "r6g.xlarge.search"
  | "r6g.2xlarge.search"
  | "r6g.4xlarge.search"
  | "r6g.8xlarge.search"
  | "r6g.12xlarge.search"
  | "m6g.large.search"
  | "m6g.xlarge.search"
  | "m6g.2xlarge.search"
  | "m6g.4xlarge.search"
  | "m6g.8xlarge.search"
  | "m6g.12xlarge.search"
  | "c6g.large.search"
  | "c6g.xlarge.search"
  | "c6g.2xlarge.search"
  | "c6g.4xlarge.search"
  | "c6g.8xlarge.search"
  | "c6g.12xlarge.search"
  | "r6gd.large.search"
  | "r6gd.xlarge.search"
  | "r6gd.2xlarge.search"
  | "r6gd.4xlarge.search"
  | "r6gd.8xlarge.search"
  | "r6gd.12xlarge.search"
  | "r6gd.16xlarge.search"
  | "t4g.small.search"
  | "t4g.medium.search"
  | (string & {});
export const OpenSearchPartitionInstanceType = /*@__PURE__*/ S.String;

export type IntegerClass = number;
export interface ZoneAwarenessConfig {
  AvailabilityZoneCount?: number;
}
export const ZoneAwarenessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityZoneCount: S.optional(S.Number) }),
).annotate({
  identifier: "ZoneAwarenessConfig",
}) as any as S.Schema<ZoneAwarenessConfig>;
export type OpenSearchWarmPartitionInstanceType =
  | "ultrawarm1.medium.search"
  | "ultrawarm1.large.search"
  | "ultrawarm1.xlarge.search"
  | (string & {});
export const OpenSearchWarmPartitionInstanceType = /*@__PURE__*/ S.String;

export interface ColdStorageOptions {
  Enabled: boolean;
}
export const ColdStorageOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean }),
).annotate({
  identifier: "ColdStorageOptions",
}) as any as S.Schema<ColdStorageOptions>;
export type NodeOptionsNodeType = "coordinator" | (string & {});
export const NodeOptionsNodeType = /*@__PURE__*/ S.String;

export interface NodeConfig {
  Enabled?: boolean;
  Type?: OpenSearchPartitionInstanceType;
  Count?: number;
}
export const NodeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    Type: S.optional(OpenSearchPartitionInstanceType),
    Count: S.optional(S.Number),
  }),
).annotate({ identifier: "NodeConfig" }) as any as S.Schema<NodeConfig>;
export interface NodeOption {
  NodeType?: NodeOptionsNodeType;
  NodeConfig?: NodeConfig;
}
export const NodeOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeType: S.optional(NodeOptionsNodeType),
    NodeConfig: S.optional(NodeConfig),
  }),
).annotate({ identifier: "NodeOption" }) as any as S.Schema<NodeOption>;
export type NodeOptionsList = NodeOption[];
export const NodeOptionsList = /*@__PURE__*/ S.Array(NodeOption);
export interface ClusterConfig {
  InstanceType?: OpenSearchPartitionInstanceType;
  InstanceCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessEnabled?: boolean;
  ZoneAwarenessConfig?: ZoneAwarenessConfig;
  DedicatedMasterType?: OpenSearchPartitionInstanceType;
  DedicatedMasterCount?: number;
  WarmEnabled?: boolean;
  WarmType?: OpenSearchWarmPartitionInstanceType;
  WarmCount?: number;
  ColdStorageOptions?: ColdStorageOptions;
  MultiAZWithStandbyEnabled?: boolean;
  NodeOptions?: NodeOption[];
}
export const ClusterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(OpenSearchPartitionInstanceType),
    InstanceCount: S.optional(S.Number),
    DedicatedMasterEnabled: S.optional(S.Boolean),
    ZoneAwarenessEnabled: S.optional(S.Boolean),
    ZoneAwarenessConfig: S.optional(ZoneAwarenessConfig),
    DedicatedMasterType: S.optional(OpenSearchPartitionInstanceType),
    DedicatedMasterCount: S.optional(S.Number),
    WarmEnabled: S.optional(S.Boolean),
    WarmType: S.optional(OpenSearchWarmPartitionInstanceType),
    WarmCount: S.optional(S.Number),
    ColdStorageOptions: S.optional(ColdStorageOptions),
    MultiAZWithStandbyEnabled: S.optional(S.Boolean),
    NodeOptions: S.optional(NodeOptionsList),
  }),
).annotate({ identifier: "ClusterConfig" }) as any as S.Schema<ClusterConfig>;
export type VolumeType = "standard" | "gp2" | "io1" | "gp3" | (string & {});
export const VolumeType = /*@__PURE__*/ S.String;

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
export type IPAddressType = "ipv4" | "dualstack" | (string & {});
export const IPAddressType = /*@__PURE__*/ S.String;

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
  EgressEnabled?: boolean;
}
export const VPCOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(StringList),
    SecurityGroupIds: S.optional(StringList),
    EgressEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VPCOptions" }) as any as S.Schema<VPCOptions>;
export type UserPoolId = string;
export type IdentityPoolId = string;
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
export const LogType = /*@__PURE__*/ S.String;

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
export const TLSSecurityPolicy = /*@__PURE__*/ S.String;

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
export type SubjectKey = string;
export type RolesKey = string;
export type JwksUrl = string;
export interface JWTOptionsInput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
  JwksUrl?: string;
  PublicKey?: string;
}
export const JWTOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
    JwksUrl: S.optional(S.String),
    PublicKey: S.optional(S.String),
  }),
).annotate({
  identifier: "JWTOptionsInput",
}) as any as S.Schema<JWTOptionsInput>;
export type IAMFederationSubjectKey = string;
export type IAMFederationRolesKey = string;
export interface IAMFederationOptionsInput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
}
export const IAMFederationOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
  }),
).annotate({
  identifier: "IAMFederationOptionsInput",
}) as any as S.Schema<IAMFederationOptionsInput>;
export interface AdvancedSecurityOptionsInput {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: MasterUserOptions;
  SAMLOptions?: SAMLOptionsInput;
  JWTOptions?: JWTOptionsInput;
  IAMFederationOptions?: IAMFederationOptionsInput;
  AnonymousAuthEnabled?: boolean;
}
export const AdvancedSecurityOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    InternalUserDatabaseEnabled: S.optional(S.Boolean),
    MasterUserOptions: S.optional(MasterUserOptions),
    SAMLOptions: S.optional(SAMLOptionsInput),
    JWTOptions: S.optional(JWTOptionsInput),
    IAMFederationOptions: S.optional(IAMFederationOptionsInput),
    AnonymousAuthEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AdvancedSecurityOptionsInput",
}) as any as S.Schema<AdvancedSecurityOptionsInput>;
export type IdentityCenterInstanceARN = string;
export type SubjectKeyIdCOption =
  | "UserName"
  | "UserId"
  | "Email"
  | (string & {});
export const SubjectKeyIdCOption = /*@__PURE__*/ S.String;

export type RolesKeyIdCOption = "GroupName" | "GroupId" | (string & {});
export const RolesKeyIdCOption = /*@__PURE__*/ S.String;

export interface IdentityCenterOptionsInput {
  EnabledAPIAccess?: boolean;
  IdentityCenterInstanceARN?: string;
  IdentityCenterInstanceRegion?: string;
  SubjectKey?: SubjectKeyIdCOption;
  RolesKey?: RolesKeyIdCOption;
}
export const IdentityCenterOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnabledAPIAccess: S.optional(S.Boolean),
    IdentityCenterInstanceARN: S.optional(S.String),
    IdentityCenterInstanceRegion: S.optional(S.String),
    SubjectKey: S.optional(SubjectKeyIdCOption),
    RolesKey: S.optional(RolesKeyIdCOption),
  }),
).annotate({
  identifier: "IdentityCenterOptionsInput",
}) as any as S.Schema<IdentityCenterOptionsInput>;
export type AutoTuneDesiredState = "ENABLED" | "DISABLED" | (string & {});
export const AutoTuneDesiredState = /*@__PURE__*/ S.String;

export type StartAt = Date;
export type DurationValue = number;
export type TimeUnit = "HOURS" | (string & {});
export const TimeUnit = /*@__PURE__*/ S.String;

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
  UseOffPeakWindow?: boolean;
}
export const AutoTuneOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.optional(AutoTuneDesiredState),
    MaintenanceSchedules: S.optional(AutoTuneMaintenanceScheduleList),
    UseOffPeakWindow: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AutoTuneOptionsInput",
}) as any as S.Schema<AutoTuneOptionsInput>;
export type StartTimeHours = number;
export type StartTimeMinutes = number;
export interface WindowStartTime {
  Hours: number;
  Minutes: number;
}
export const WindowStartTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hours: S.Number, Minutes: S.Number }),
).annotate({
  identifier: "WindowStartTime",
}) as any as S.Schema<WindowStartTime>;
export interface OffPeakWindow {
  WindowStartTime?: WindowStartTime;
}
export const OffPeakWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowStartTime: S.optional(WindowStartTime) }),
).annotate({ identifier: "OffPeakWindow" }) as any as S.Schema<OffPeakWindow>;
export interface OffPeakWindowOptions {
  Enabled?: boolean;
  OffPeakWindow?: OffPeakWindow;
}
export const OffPeakWindowOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    OffPeakWindow: S.optional(OffPeakWindow),
  }),
).annotate({
  identifier: "OffPeakWindowOptions",
}) as any as S.Schema<OffPeakWindowOptions>;
export interface SoftwareUpdateOptions {
  AutoSoftwareUpdateEnabled?: boolean;
  UseLatestServiceSoftwareForBlueGreen?: boolean;
}
export const SoftwareUpdateOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoSoftwareUpdateEnabled: S.optional(S.Boolean),
    UseLatestServiceSoftwareForBlueGreen: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SoftwareUpdateOptions",
}) as any as S.Schema<SoftwareUpdateOptions>;
export type NaturalLanguageQueryGenerationDesiredState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const NaturalLanguageQueryGenerationDesiredState =
  /*@__PURE__*/ S.String;

export interface NaturalLanguageQueryGenerationOptionsInput {
  DesiredState?: NaturalLanguageQueryGenerationDesiredState;
}
export const NaturalLanguageQueryGenerationOptionsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DesiredState: S.optional(NaturalLanguageQueryGenerationDesiredState),
    }),
  ).annotate({
    identifier: "NaturalLanguageQueryGenerationOptionsInput",
  }) as any as S.Schema<NaturalLanguageQueryGenerationOptionsInput>;
export interface S3VectorsEngine {
  Enabled?: boolean;
}
export const S3VectorsEngine = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "S3VectorsEngine",
}) as any as S.Schema<S3VectorsEngine>;
export interface ServerlessVectorAcceleration {
  Enabled?: boolean;
}
export const ServerlessVectorAcceleration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "ServerlessVectorAcceleration",
}) as any as S.Schema<ServerlessVectorAcceleration>;
export interface AIMLOptionsInput {
  NaturalLanguageQueryGenerationOptions?: NaturalLanguageQueryGenerationOptionsInput;
  S3VectorsEngine?: S3VectorsEngine;
  ServerlessVectorAcceleration?: ServerlessVectorAcceleration;
}
export const AIMLOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NaturalLanguageQueryGenerationOptions: S.optional(
      NaturalLanguageQueryGenerationOptionsInput,
    ),
    S3VectorsEngine: S.optional(S3VectorsEngine),
    ServerlessVectorAcceleration: S.optional(ServerlessVectorAcceleration),
  }),
).annotate({
  identifier: "AIMLOptionsInput",
}) as any as S.Schema<AIMLOptionsInput>;
export type DeploymentStrategy =
  | "Default"
  | "CapacityOptimized"
  | (string & {});
export const DeploymentStrategy = /*@__PURE__*/ S.String;

export interface DeploymentStrategyOptions {
  DeploymentStrategy: DeploymentStrategy;
}
export const DeploymentStrategyOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeploymentStrategy: DeploymentStrategy }),
).annotate({
  identifier: "DeploymentStrategyOptions",
}) as any as S.Schema<DeploymentStrategyOptions>;
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
export interface CreateDomainRequest {
  DomainName: string;
  EngineVersion?: string;
  ClusterConfig?: ClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  TagList?: Tag[];
  AutoTuneOptions?: AutoTuneOptionsInput;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  AIMLOptions?: AIMLOptionsInput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    EngineVersion: S.optional(S.String),
    ClusterConfig: S.optional(ClusterConfig),
    EBSOptions: S.optional(EBSOptions),
    AccessPolicies: S.optional(S.String),
    IPAddressType: S.optional(IPAddressType),
    SnapshotOptions: S.optional(SnapshotOptions),
    VPCOptions: S.optional(VPCOptions),
    CognitoOptions: S.optional(CognitoOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptions),
    AdvancedOptions: S.optional(AdvancedOptions),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    DomainEndpointOptions: S.optional(DomainEndpointOptions),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsInput),
    IdentityCenterOptions: S.optional(IdentityCenterOptionsInput),
    TagList: S.optional(TagList),
    AutoTuneOptions: S.optional(AutoTuneOptionsInput),
    OffPeakWindowOptions: S.optional(OffPeakWindowOptions),
    SoftwareUpdateOptions: S.optional(SoftwareUpdateOptions),
    AIMLOptions: S.optional(AIMLOptionsInput),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
    AutomatedSnapshotPauseOptions: S.optional(
      AutomatedSnapshotPauseRequestOptions,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/domain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export type DomainId = string;
export type ServiceUrl = string;
export type EndpointsMap = { [key: string]: string | undefined };
export const EndpointsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type HostedZoneId = string;
export interface VPCDerivedInfo {
  VPCId?: string;
  SubnetIds?: string[];
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
  EgressEnabled?: boolean;
}
export const VPCDerivedInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VPCId: S.optional(S.String),
    SubnetIds: S.optional(StringList),
    AvailabilityZones: S.optional(StringList),
    SecurityGroupIds: S.optional(StringList),
    EgressEnabled: S.optional(S.Boolean),
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
export interface JWTOptionsOutput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
  JwksUrl?: string;
  PublicKey?: string;
}
export const JWTOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
    JwksUrl: S.optional(S.String),
    PublicKey: S.optional(S.String),
  }),
).annotate({
  identifier: "JWTOptionsOutput",
}) as any as S.Schema<JWTOptionsOutput>;
export interface IAMFederationOptionsOutput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
}
export const IAMFederationOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SubjectKey: S.optional(S.String),
    RolesKey: S.optional(S.String),
  }),
).annotate({
  identifier: "IAMFederationOptionsOutput",
}) as any as S.Schema<IAMFederationOptionsOutput>;
export type DisableTimestamp = Date;
export interface AdvancedSecurityOptions {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  SAMLOptions?: SAMLOptionsOutput;
  JWTOptions?: JWTOptionsOutput;
  IAMFederationOptions?: IAMFederationOptionsOutput;
  AnonymousAuthDisableDate?: Date;
  AnonymousAuthEnabled?: boolean;
}
export const AdvancedSecurityOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    InternalUserDatabaseEnabled: S.optional(S.Boolean),
    SAMLOptions: S.optional(SAMLOptionsOutput),
    JWTOptions: S.optional(JWTOptionsOutput),
    IAMFederationOptions: S.optional(IAMFederationOptionsOutput),
    AnonymousAuthDisableDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AnonymousAuthEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AdvancedSecurityOptions",
}) as any as S.Schema<AdvancedSecurityOptions>;
export type IdentityCenterApplicationARN = string;
export type IdentityStoreId = string;
export interface IdentityCenterOptions {
  EnabledAPIAccess?: boolean;
  IdentityCenterInstanceARN?: string;
  IdentityCenterInstanceRegion?: string;
  SubjectKey?: SubjectKeyIdCOption;
  RolesKey?: RolesKeyIdCOption;
  IdentityCenterApplicationARN?: string;
  IdentityStoreId?: string;
}
export const IdentityCenterOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnabledAPIAccess: S.optional(S.Boolean),
    IdentityCenterInstanceARN: S.optional(S.String),
    IdentityCenterInstanceRegion: S.optional(S.String),
    SubjectKey: S.optional(SubjectKeyIdCOption),
    RolesKey: S.optional(RolesKeyIdCOption),
    IdentityCenterApplicationARN: S.optional(S.String),
    IdentityStoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityCenterOptions",
}) as any as S.Schema<IdentityCenterOptions>;
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
export const AutoTuneState = /*@__PURE__*/ S.String;

export interface AutoTuneOptionsOutput {
  State?: AutoTuneState;
  ErrorMessage?: string;
  UseOffPeakWindow?: boolean;
}
export const AutoTuneOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(AutoTuneState),
    ErrorMessage: S.optional(S.String),
    UseOffPeakWindow: S.optional(S.Boolean),
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
export const ConfigChangeStatus = /*@__PURE__*/ S.String;

export type InitiatedBy = "CUSTOMER" | "SERVICE" | (string & {});
export const InitiatedBy = /*@__PURE__*/ S.String;

export type UpdateTimestamp = Date;
export interface ChangeProgressDetails {
  ChangeId?: string;
  Message?: string;
  ConfigChangeStatus?: ConfigChangeStatus;
  InitiatedBy?: InitiatedBy;
  StartTime?: Date;
  LastUpdatedTime?: Date;
}
export const ChangeProgressDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeId: S.optional(S.String),
    Message: S.optional(S.String),
    ConfigChangeStatus: S.optional(ConfigChangeStatus),
    InitiatedBy: S.optional(InitiatedBy),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
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
export const DomainProcessingStatusType = /*@__PURE__*/ S.String;

export type PropertyValueType =
  | "PLAIN_TEXT"
  | "STRINGIFIED_JSON"
  | (string & {});
export const PropertyValueType = /*@__PURE__*/ S.String;

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
export type NaturalLanguageQueryGenerationCurrentState =
  | "NOT_ENABLED"
  | "ENABLE_COMPLETE"
  | "ENABLE_IN_PROGRESS"
  | "ENABLE_FAILED"
  | "DISABLE_COMPLETE"
  | "DISABLE_IN_PROGRESS"
  | "DISABLE_FAILED"
  | (string & {});
export const NaturalLanguageQueryGenerationCurrentState =
  /*@__PURE__*/ S.String;

export interface NaturalLanguageQueryGenerationOptionsOutput {
  DesiredState?: NaturalLanguageQueryGenerationDesiredState;
  CurrentState?: NaturalLanguageQueryGenerationCurrentState;
}
export const NaturalLanguageQueryGenerationOptionsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DesiredState: S.optional(NaturalLanguageQueryGenerationDesiredState),
      CurrentState: S.optional(NaturalLanguageQueryGenerationCurrentState),
    }),
  ).annotate({
    identifier: "NaturalLanguageQueryGenerationOptionsOutput",
  }) as any as S.Schema<NaturalLanguageQueryGenerationOptionsOutput>;
export interface AIMLOptionsOutput {
  NaturalLanguageQueryGenerationOptions?: NaturalLanguageQueryGenerationOptionsOutput;
  S3VectorsEngine?: S3VectorsEngine;
  ServerlessVectorAcceleration?: ServerlessVectorAcceleration;
}
export const AIMLOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NaturalLanguageQueryGenerationOptions: S.optional(
      NaturalLanguageQueryGenerationOptionsOutput,
    ),
    S3VectorsEngine: S.optional(S3VectorsEngine),
    ServerlessVectorAcceleration: S.optional(ServerlessVectorAcceleration),
  }),
).annotate({
  identifier: "AIMLOptionsOutput",
}) as any as S.Schema<AIMLOptionsOutput>;
export type PauseState =
  | "Active"
  | "Completed"
  | "Scheduled"
  | "Disabled"
  | (string & {});
export const PauseState = /*@__PURE__*/ S.String;

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
export interface DomainStatus {
  DomainId: string;
  DomainName: string;
  ARN: string;
  Created?: boolean;
  Deleted?: boolean;
  Endpoint?: string;
  EndpointV2?: string;
  Endpoints?: { [key: string]: string | undefined };
  DomainEndpointV2HostedZoneId?: string;
  Processing?: boolean;
  UpgradeProcessing?: boolean;
  EngineVersion?: string;
  ClusterConfig: ClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
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
  IdentityCenterOptions?: IdentityCenterOptions;
  AutoTuneOptions?: AutoTuneOptionsOutput;
  ChangeProgressDetails?: ChangeProgressDetails;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  DomainProcessingStatus?: DomainProcessingStatusType;
  ModifyingProperties?: ModifyingProperties[];
  AIMLOptions?: AIMLOptionsOutput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptions;
}
export const DomainStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    DomainName: S.String,
    ARN: S.String,
    Created: S.optional(S.Boolean),
    Deleted: S.optional(S.Boolean),
    Endpoint: S.optional(S.String),
    EndpointV2: S.optional(S.String),
    Endpoints: S.optional(EndpointsMap),
    DomainEndpointV2HostedZoneId: S.optional(S.String),
    Processing: S.optional(S.Boolean),
    UpgradeProcessing: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    ClusterConfig: ClusterConfig,
    EBSOptions: S.optional(EBSOptions),
    AccessPolicies: S.optional(S.String),
    IPAddressType: S.optional(IPAddressType),
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
    IdentityCenterOptions: S.optional(IdentityCenterOptions),
    AutoTuneOptions: S.optional(AutoTuneOptionsOutput),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
    OffPeakWindowOptions: S.optional(OffPeakWindowOptions),
    SoftwareUpdateOptions: S.optional(SoftwareUpdateOptions),
    DomainProcessingStatus: S.optional(DomainProcessingStatusType),
    ModifyingProperties: S.optional(ModifyingPropertiesList),
    AIMLOptions: S.optional(AIMLOptionsOutput),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
    AutomatedSnapshotPauseOptions: S.optional(AutomatedSnapshotPauseOptions),
  }),
).annotate({ identifier: "DomainStatus" }) as any as S.Schema<DomainStatus>;
export interface CreateDomainResponse {
  DomainStatus?: DomainStatus;
}
export const CreateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "CreateDomainResponse",
}) as any as S.Schema<CreateDomainResponse>;
export type IndexName = string;
export type IndexSchema = unknown;
export interface CreateIndexRequest {
  DomainName: string;
  IndexName: string;
  IndexSchema: any;
}
export const CreateIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    IndexName: S.String,
    IndexSchema: S.Any,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/index",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIndexRequest",
}) as any as S.Schema<CreateIndexRequest>;
export type IndexStatus = "CREATED" | "UPDATED" | "DELETED" | (string & {});
export const IndexStatus = /*@__PURE__*/ S.String;

export interface CreateIndexResponse {
  Status: IndexStatus;
}
export const CreateIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: IndexStatus }).pipe(ns),
).annotate({
  identifier: "CreateIndexResponse",
}) as any as S.Schema<CreateIndexResponse>;
export type ConnectionAlias = string;
export type Endpoint = string;
export type SkipUnavailableStatus = "ENABLED" | "DISABLED" | (string & {});
export const SkipUnavailableStatus = /*@__PURE__*/ S.String;

export interface CrossClusterSearchConnectionProperties {
  SkipUnavailable?: SkipUnavailableStatus;
}
export const CrossClusterSearchConnectionProperties = /*@__PURE__*/ S.suspend(
  () => S.Struct({ SkipUnavailable: S.optional(SkipUnavailableStatus) }),
).annotate({
  identifier: "CrossClusterSearchConnectionProperties",
}) as any as S.Schema<CrossClusterSearchConnectionProperties>;
export interface ConnectionProperties {
  Endpoint?: string;
  CrossClusterSearch?: CrossClusterSearchConnectionProperties;
}
export const ConnectionProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoint: S.optional(S.String),
    CrossClusterSearch: S.optional(CrossClusterSearchConnectionProperties),
  }),
).annotate({
  identifier: "ConnectionProperties",
}) as any as S.Schema<ConnectionProperties>;
export interface CreateOutboundConnectionRequest {
  LocalDomainInfo: DomainInformationContainer;
  RemoteDomainInfo: DomainInformationContainer;
  ConnectionAlias: string;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export const CreateOutboundConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalDomainInfo: DomainInformationContainer,
    RemoteDomainInfo: DomainInformationContainer,
    ConnectionAlias: S.String,
    ConnectionMode: S.optional(ConnectionMode),
    ConnectionProperties: S.optional(ConnectionProperties),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/cc/outboundConnection",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOutboundConnectionRequest",
}) as any as S.Schema<CreateOutboundConnectionRequest>;
export type OutboundConnectionStatusCode =
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const OutboundConnectionStatusCode = /*@__PURE__*/ S.String;

export interface OutboundConnectionStatus {
  StatusCode?: OutboundConnectionStatusCode;
  Message?: string;
}
export const OutboundConnectionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(OutboundConnectionStatusCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "OutboundConnectionStatus",
}) as any as S.Schema<OutboundConnectionStatus>;
export interface CreateOutboundConnectionResponse {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundConnectionStatus;
  ConnectionId?: string;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export const CreateOutboundConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalDomainInfo: S.optional(DomainInformationContainer),
    RemoteDomainInfo: S.optional(DomainInformationContainer),
    ConnectionAlias: S.optional(S.String),
    ConnectionStatus: S.optional(OutboundConnectionStatus),
    ConnectionId: S.optional(S.String),
    ConnectionMode: S.optional(ConnectionMode),
    ConnectionProperties: S.optional(ConnectionProperties),
  }).pipe(ns),
).annotate({
  identifier: "CreateOutboundConnectionResponse",
}) as any as S.Schema<CreateOutboundConnectionResponse>;
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
export type RequirementLevel = "REQUIRED" | "OPTIONAL" | "NONE" | (string & {});
export const RequirementLevel = /*@__PURE__*/ S.String;

export type LicenseFilepath = string;
export interface PackageConfiguration {
  LicenseRequirement: RequirementLevel;
  LicenseFilepath?: string;
  ConfigurationRequirement: RequirementLevel;
  RequiresRestartForConfigurationUpdate?: boolean;
}
export const PackageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseRequirement: RequirementLevel,
    LicenseFilepath: S.optional(S.String),
    ConfigurationRequirement: RequirementLevel,
    RequiresRestartForConfigurationUpdate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PackageConfiguration",
}) as any as S.Schema<PackageConfiguration>;
export type EngineVersion = string;
export interface PackageVendingOptions {
  VendingEnabled: boolean;
}
export const PackageVendingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VendingEnabled: S.Boolean }),
).annotate({
  identifier: "PackageVendingOptions",
}) as any as S.Schema<PackageVendingOptions>;
export interface PackageEncryptionOptions {
  KmsKeyIdentifier?: string;
  EncryptionEnabled: boolean;
}
export const PackageEncryptionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsKeyIdentifier: S.optional(S.String),
    EncryptionEnabled: S.Boolean,
  }),
).annotate({
  identifier: "PackageEncryptionOptions",
}) as any as S.Schema<PackageEncryptionOptions>;
export interface CreatePackageRequest {
  PackageName: string;
  PackageType: PackageType;
  PackageDescription?: string;
  PackageSource: PackageSource;
  PackageConfiguration?: PackageConfiguration;
  EngineVersion?: string;
  PackageVendingOptions?: PackageVendingOptions;
  PackageEncryptionOptions?: PackageEncryptionOptions;
}
export const CreatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageName: S.String,
    PackageType: PackageType,
    PackageDescription: S.optional(S.String),
    PackageSource: PackageSource,
    PackageConfiguration: S.optional(PackageConfiguration),
    EngineVersion: S.optional(S.String),
    PackageVendingOptions: S.optional(PackageVendingOptions),
    PackageEncryptionOptions: S.optional(PackageEncryptionOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/packages" }),
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
export const PackageStatus = /*@__PURE__*/ S.String;

export type CreatedAt = Date;
export type PluginName = string;
export type PluginDescription = string;
export type PluginVersion = string;
export type PluginClassName = string;
export type UncompressedPluginSizeInBytes = number;
export interface PluginProperties {
  Name?: string;
  Description?: string;
  Version?: string;
  ClassName?: string;
  UncompressedSizeInBytes?: number;
}
export const PluginProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Version: S.optional(S.String),
    ClassName: S.optional(S.String),
    UncompressedSizeInBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "PluginProperties",
}) as any as S.Schema<PluginProperties>;
export type PackageUser = string;
export type PackageUserList = string[];
export const PackageUserList = /*@__PURE__*/ S.Array(S.String);
export type PackageOwner = string;
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
  EngineVersion?: string;
  AvailablePluginProperties?: PluginProperties;
  AvailablePackageConfiguration?: PackageConfiguration;
  AllowListedUserList?: string[];
  PackageOwner?: string;
  PackageVendingOptions?: PackageVendingOptions;
  PackageEncryptionOptions?: PackageEncryptionOptions;
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
    EngineVersion: S.optional(S.String),
    AvailablePluginProperties: S.optional(PluginProperties),
    AvailablePackageConfiguration: S.optional(PackageConfiguration),
    AllowListedUserList: S.optional(PackageUserList),
    PackageOwner: S.optional(S.String),
    PackageVendingOptions: S.optional(PackageVendingOptions),
    PackageEncryptionOptions: S.optional(PackageEncryptionOptions),
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
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/vpcEndpoints" }),
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
export const VpcEndpointStatus = /*@__PURE__*/ S.String;

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
export interface DeleteApplicationRequest {
  id: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/application/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteDataSourceRequest {
  DomainName: string;
  Name: string;
}
export const DeleteDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
      }),
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
export interface DeleteDataSourceResponse {
  Message?: string;
}
export const DeleteDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteDataSourceResponse",
}) as any as S.Schema<DeleteDataSourceResponse>;
export interface DeleteDirectQueryDataSourceRequest {
  DataSourceName: string;
}
export const DeleteDirectQueryDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.String.pipe(T.HttpLabel("DataSourceName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDirectQueryDataSourceRequest",
}) as any as S.Schema<DeleteDirectQueryDataSourceRequest>;
export interface DeleteDirectQueryDataSourceResponse {}
export const DeleteDirectQueryDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDirectQueryDataSourceResponse",
}) as any as S.Schema<DeleteDirectQueryDataSourceResponse>;
export interface DeleteDomainRequest {
  DomainName: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/domain/{DomainName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {
  DomainStatus?: DomainStatus;
}
export const DeleteDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export interface DeleteInboundConnectionRequest {
  ConnectionId: string;
}
export const DeleteInboundConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInboundConnectionRequest",
}) as any as S.Schema<DeleteInboundConnectionRequest>;
export interface DeleteInboundConnectionResponse {
  Connection?: InboundConnection;
}
export const DeleteInboundConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(InboundConnection) }).pipe(ns),
).annotate({
  identifier: "DeleteInboundConnectionResponse",
}) as any as S.Schema<DeleteInboundConnectionResponse>;
export interface DeleteIndexRequest {
  DomainName: string;
  IndexName: string;
}
export const DeleteIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexRequest",
}) as any as S.Schema<DeleteIndexRequest>;
export interface DeleteIndexResponse {
  Status: IndexStatus;
}
export const DeleteIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: IndexStatus }).pipe(ns),
).annotate({
  identifier: "DeleteIndexResponse",
}) as any as S.Schema<DeleteIndexResponse>;
export interface DeleteOutboundConnectionRequest {
  ConnectionId: string;
}
export const DeleteOutboundConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/cc/outboundConnection/{ConnectionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOutboundConnectionRequest",
}) as any as S.Schema<DeleteOutboundConnectionRequest>;
export interface OutboundConnection {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionId?: string;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundConnectionStatus;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export const OutboundConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalDomainInfo: S.optional(DomainInformationContainer),
    RemoteDomainInfo: S.optional(DomainInformationContainer),
    ConnectionId: S.optional(S.String),
    ConnectionAlias: S.optional(S.String),
    ConnectionStatus: S.optional(OutboundConnectionStatus),
    ConnectionMode: S.optional(ConnectionMode),
    ConnectionProperties: S.optional(ConnectionProperties),
  }),
).annotate({
  identifier: "OutboundConnection",
}) as any as S.Schema<OutboundConnection>;
export interface DeleteOutboundConnectionResponse {
  Connection?: OutboundConnection;
}
export const DeleteOutboundConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(OutboundConnection) }).pipe(ns),
).annotate({
  identifier: "DeleteOutboundConnectionResponse",
}) as any as S.Schema<DeleteOutboundConnectionResponse>;
export interface DeletePackageRequest {
  PackageID: string;
}
export const DeletePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageID: S.String.pipe(T.HttpLabel("PackageID")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/2021-01-01/packages/{PackageID}" }),
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
        uri: "/2021-01-01/opensearch/vpcEndpoints/{VpcEndpointId}",
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
export type ApplicationId = string;
export type CapabilityName = string;
export interface DeregisterCapabilityRequest {
  applicationId: string;
  capabilityName: string;
}
export const DeregisterCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2021-01-01/opensearch/application/{applicationId}/capability/deregister/{capabilityName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterCapabilityRequest",
}) as any as S.Schema<DeregisterCapabilityRequest>;
export type CapabilityStatus =
  | "creating"
  | "create_failed"
  | "active"
  | "updating"
  | "update_failed"
  | "deleting"
  | "delete_failed"
  | (string & {});
export const CapabilityStatus = /*@__PURE__*/ S.String;

export interface DeregisterCapabilityResponse {
  status?: CapabilityStatus;
}
export const DeregisterCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(CapabilityStatus) }).pipe(ns),
).annotate({
  identifier: "DeregisterCapabilityResponse",
}) as any as S.Schema<DeregisterCapabilityResponse>;
export interface DescribeDataSourceAttachmentRequest {
  id: string;
  dataSourceArn: string;
}
export const DescribeDataSourceAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dataSourceArn: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/application/{id}/describeDataSourceAttachment",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDataSourceAttachmentRequest",
}) as any as S.Schema<DescribeDataSourceAttachmentRequest>;
export interface DescribeDataSourceAttachmentResponse {
  attachmentId?: string;
  id?: string;
  arn?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export const DescribeDataSourceAttachmentResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      attachmentId: S.optional(S.String),
      id: S.optional(S.String),
      arn: S.optional(S.String),
      dataSourceArn: S.optional(S.String),
      status: S.optional(DataSourceAttachmentStatus),
    }).pipe(ns),
).annotate({
  identifier: "DescribeDataSourceAttachmentResponse",
}) as any as S.Schema<DescribeDataSourceAttachmentResponse>;
export interface DescribeDomainRequest {
  DomainName: string;
}
export const DescribeDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainRequest",
}) as any as S.Schema<DescribeDomainRequest>;
export interface DescribeDomainResponse {
  DomainStatus: DomainStatus;
}
export const DescribeDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: DomainStatus }).pipe(ns),
).annotate({
  identifier: "DescribeDomainResponse",
}) as any as S.Schema<DescribeDomainResponse>;
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
        uri: "/2021-01-01/opensearch/domain/{DomainName}/autoTunes",
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
export const AutoTuneType = /*@__PURE__*/ S.String;

export type AutoTuneDate = Date;
export type ScheduledAutoTuneActionType =
  | "JVM_HEAP_SIZE_TUNING"
  | "JVM_YOUNG_GEN_TUNING"
  | (string & {});
export const ScheduledAutoTuneActionType = /*@__PURE__*/ S.String;

export type ScheduledAutoTuneDescription = string;
export type ScheduledAutoTuneSeverityType =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const ScheduledAutoTuneSeverityType = /*@__PURE__*/ S.String;

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
        uri: "/2021-01-01/opensearch/domain/{DomainName}/progress",
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
export const OverallChangeStatus = /*@__PURE__*/ S.String;

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
  LastUpdatedTime?: Date;
  ConfigChangeStatus?: ConfigChangeStatus;
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
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ConfigChangeStatus: S.optional(ConfigChangeStatus),
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
export interface DescribeDomainConfigRequest {
  DomainName: string;
}
export const DescribeDomainConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainConfigRequest",
}) as any as S.Schema<DescribeDomainConfigRequest>;
export type UIntValue = number;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | (string & {});
export const OptionState = /*@__PURE__*/ S.String;

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
export interface VersionStatus {
  Options: string;
  Status: OptionStatus;
}
export const VersionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.String, Status: OptionStatus }),
).annotate({ identifier: "VersionStatus" }) as any as S.Schema<VersionStatus>;
export interface ClusterConfigStatus {
  Options: ClusterConfig;
  Status: OptionStatus;
}
export const ClusterConfigStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: ClusterConfig, Status: OptionStatus }),
).annotate({
  identifier: "ClusterConfigStatus",
}) as any as S.Schema<ClusterConfigStatus>;
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
export interface IPAddressTypeStatus {
  Options: IPAddressType;
  Status: OptionStatus;
}
export const IPAddressTypeStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: IPAddressType, Status: OptionStatus }),
).annotate({
  identifier: "IPAddressTypeStatus",
}) as any as S.Schema<IPAddressTypeStatus>;
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
export interface IdentityCenterOptionsStatus {
  Options: IdentityCenterOptions;
  Status: OptionStatus;
}
export const IdentityCenterOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: IdentityCenterOptions, Status: OptionStatus }),
).annotate({
  identifier: "IdentityCenterOptionsStatus",
}) as any as S.Schema<IdentityCenterOptionsStatus>;
export type RollbackOnDisable =
  | "NO_ROLLBACK"
  | "DEFAULT_ROLLBACK"
  | (string & {});
export const RollbackOnDisable = /*@__PURE__*/ S.String;

export interface AutoTuneOptions {
  DesiredState?: AutoTuneDesiredState;
  RollbackOnDisable?: RollbackOnDisable;
  MaintenanceSchedules?: AutoTuneMaintenanceSchedule[];
  UseOffPeakWindow?: boolean;
}
export const AutoTuneOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.optional(AutoTuneDesiredState),
    RollbackOnDisable: S.optional(RollbackOnDisable),
    MaintenanceSchedules: S.optional(AutoTuneMaintenanceScheduleList),
    UseOffPeakWindow: S.optional(S.Boolean),
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
export interface OffPeakWindowOptionsStatus {
  Options?: OffPeakWindowOptions;
  Status?: OptionStatus;
}
export const OffPeakWindowOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(OffPeakWindowOptions),
    Status: S.optional(OptionStatus),
  }),
).annotate({
  identifier: "OffPeakWindowOptionsStatus",
}) as any as S.Schema<OffPeakWindowOptionsStatus>;
export interface SoftwareUpdateOptionsStatus {
  Options?: SoftwareUpdateOptions;
  Status?: OptionStatus;
}
export const SoftwareUpdateOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(SoftwareUpdateOptions),
    Status: S.optional(OptionStatus),
  }),
).annotate({
  identifier: "SoftwareUpdateOptionsStatus",
}) as any as S.Schema<SoftwareUpdateOptionsStatus>;
export interface AIMLOptionsStatus {
  Options?: AIMLOptionsOutput;
  Status?: OptionStatus;
}
export const AIMLOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Options: S.optional(AIMLOptionsOutput),
    Status: S.optional(OptionStatus),
  }),
).annotate({
  identifier: "AIMLOptionsStatus",
}) as any as S.Schema<AIMLOptionsStatus>;
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
export interface DomainConfig {
  EngineVersion?: VersionStatus;
  ClusterConfig?: ClusterConfigStatus;
  EBSOptions?: EBSOptionsStatus;
  AccessPolicies?: AccessPoliciesStatus;
  IPAddressType?: IPAddressTypeStatus;
  SnapshotOptions?: SnapshotOptionsStatus;
  VPCOptions?: VPCDerivedInfoStatus;
  CognitoOptions?: CognitoOptionsStatus;
  EncryptionAtRestOptions?: EncryptionAtRestOptionsStatus;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptionsStatus;
  AdvancedOptions?: AdvancedOptionsStatus;
  LogPublishingOptions?: LogPublishingOptionsStatus;
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsStatus;
  IdentityCenterOptions?: IdentityCenterOptionsStatus;
  AutoTuneOptions?: AutoTuneOptionsStatus;
  ChangeProgressDetails?: ChangeProgressDetails;
  OffPeakWindowOptions?: OffPeakWindowOptionsStatus;
  SoftwareUpdateOptions?: SoftwareUpdateOptionsStatus;
  ModifyingProperties?: ModifyingProperties[];
  AIMLOptions?: AIMLOptionsStatus;
  DeploymentStrategyOptions?: DeploymentStrategyOptionsStatus;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptionsStatus;
}
export const DomainConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineVersion: S.optional(VersionStatus),
    ClusterConfig: S.optional(ClusterConfigStatus),
    EBSOptions: S.optional(EBSOptionsStatus),
    AccessPolicies: S.optional(AccessPoliciesStatus),
    IPAddressType: S.optional(IPAddressTypeStatus),
    SnapshotOptions: S.optional(SnapshotOptionsStatus),
    VPCOptions: S.optional(VPCDerivedInfoStatus),
    CognitoOptions: S.optional(CognitoOptionsStatus),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptionsStatus),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptionsStatus),
    AdvancedOptions: S.optional(AdvancedOptionsStatus),
    LogPublishingOptions: S.optional(LogPublishingOptionsStatus),
    DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsStatus),
    IdentityCenterOptions: S.optional(IdentityCenterOptionsStatus),
    AutoTuneOptions: S.optional(AutoTuneOptionsStatus),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
    OffPeakWindowOptions: S.optional(OffPeakWindowOptionsStatus),
    SoftwareUpdateOptions: S.optional(SoftwareUpdateOptionsStatus),
    ModifyingProperties: S.optional(ModifyingPropertiesList),
    AIMLOptions: S.optional(AIMLOptionsStatus),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptionsStatus),
    AutomatedSnapshotPauseOptions: S.optional(
      AutomatedSnapshotPauseOptionsStatus,
    ),
  }),
).annotate({ identifier: "DomainConfig" }) as any as S.Schema<DomainConfig>;
export interface DescribeDomainConfigResponse {
  DomainConfig: DomainConfig;
}
export const DescribeDomainConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainConfig: DomainConfig }).pipe(ns),
).annotate({
  identifier: "DescribeDomainConfigResponse",
}) as any as S.Schema<DescribeDomainConfigResponse>;
export interface DescribeDomainHealthRequest {
  DomainName: string;
}
export const DescribeDomainHealthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/health",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainHealthRequest",
}) as any as S.Schema<DescribeDomainHealthRequest>;
export type DomainState =
  | "Active"
  | "Processing"
  | "NotAvailable"
  | (string & {});
export const DomainState = /*@__PURE__*/ S.String;

export type NumberOfAZs = string;
export type NumberOfNodes = string;
export type MasterNodeStatus = "Available" | "UnAvailable" | (string & {});
export const MasterNodeStatus = /*@__PURE__*/ S.String;

export type DomainHealth =
  | "Red"
  | "Yellow"
  | "Green"
  | "NotAvailable"
  | (string & {});
export const DomainHealth = /*@__PURE__*/ S.String;

export type NumberOfShards = string;
export type AvailabilityZone = string;
export type ZoneStatus = "Active" | "StandBy" | "NotAvailable" | (string & {});
export const ZoneStatus = /*@__PURE__*/ S.String;

export interface AvailabilityZoneInfo {
  AvailabilityZoneName?: string;
  ZoneStatus?: ZoneStatus;
  ConfiguredDataNodeCount?: string;
  AvailableDataNodeCount?: string;
  TotalShards?: string;
  TotalUnAssignedShards?: string;
}
export const AvailabilityZoneInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZoneName: S.optional(S.String),
    ZoneStatus: S.optional(ZoneStatus),
    ConfiguredDataNodeCount: S.optional(S.String),
    AvailableDataNodeCount: S.optional(S.String),
    TotalShards: S.optional(S.String),
    TotalUnAssignedShards: S.optional(S.String),
  }),
).annotate({
  identifier: "AvailabilityZoneInfo",
}) as any as S.Schema<AvailabilityZoneInfo>;
export type AvailabilityZoneInfoList = AvailabilityZoneInfo[];
export const AvailabilityZoneInfoList =
  /*@__PURE__*/ S.Array(AvailabilityZoneInfo);
export interface EnvironmentInfo {
  AvailabilityZoneInformation?: AvailabilityZoneInfo[];
}
export const EnvironmentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZoneInformation: S.optional(AvailabilityZoneInfoList),
  }),
).annotate({
  identifier: "EnvironmentInfo",
}) as any as S.Schema<EnvironmentInfo>;
export type EnvironmentInfoList = EnvironmentInfo[];
export const EnvironmentInfoList = /*@__PURE__*/ S.Array(EnvironmentInfo);
export interface DescribeDomainHealthResponse {
  DomainState?: DomainState;
  AvailabilityZoneCount?: string;
  ActiveAvailabilityZoneCount?: string;
  StandByAvailabilityZoneCount?: string;
  DataNodeCount?: string;
  DedicatedMaster?: boolean;
  MasterEligibleNodeCount?: string;
  WarmNodeCount?: string;
  MasterNode?: MasterNodeStatus;
  ClusterHealth?: DomainHealth;
  TotalShards?: string;
  TotalUnAssignedShards?: string;
  EnvironmentInformation?: EnvironmentInfo[];
}
export const DescribeDomainHealthResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainState: S.optional(DomainState),
    AvailabilityZoneCount: S.optional(S.String),
    ActiveAvailabilityZoneCount: S.optional(S.String),
    StandByAvailabilityZoneCount: S.optional(S.String),
    DataNodeCount: S.optional(S.String),
    DedicatedMaster: S.optional(S.Boolean),
    MasterEligibleNodeCount: S.optional(S.String),
    WarmNodeCount: S.optional(S.String),
    MasterNode: S.optional(MasterNodeStatus),
    ClusterHealth: S.optional(DomainHealth),
    TotalShards: S.optional(S.String),
    TotalUnAssignedShards: S.optional(S.String),
    EnvironmentInformation: S.optional(EnvironmentInfoList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDomainHealthResponse",
}) as any as S.Schema<DescribeDomainHealthResponse>;
export interface DescribeDomainNodesRequest {
  DomainName: string;
}
export const DescribeDomainNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/nodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainNodesRequest",
}) as any as S.Schema<DescribeDomainNodesRequest>;
export type NodeId = string;
export type NodeType = "Data" | "Ultrawarm" | "Master" | "Warm" | (string & {});
export const NodeType = /*@__PURE__*/ S.String;

export type NodeStatus = "Active" | "StandBy" | "NotAvailable" | (string & {});
export const NodeStatus = /*@__PURE__*/ S.String;

export type StorageTypeName = string;
export type VolumeSize = string;
export interface DomainNodesStatus {
  NodeId?: string;
  NodeType?: NodeType;
  AvailabilityZone?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  NodeStatus?: NodeStatus;
  StorageType?: string;
  StorageVolumeType?: VolumeType;
  StorageSize?: string;
}
export const DomainNodesStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeId: S.optional(S.String),
    NodeType: S.optional(NodeType),
    AvailabilityZone: S.optional(S.String),
    InstanceType: S.optional(OpenSearchPartitionInstanceType),
    NodeStatus: S.optional(NodeStatus),
    StorageType: S.optional(S.String),
    StorageVolumeType: S.optional(VolumeType),
    StorageSize: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainNodesStatus",
}) as any as S.Schema<DomainNodesStatus>;
export type DomainNodesStatusList = DomainNodesStatus[];
export const DomainNodesStatusList = /*@__PURE__*/ S.Array(DomainNodesStatus);
export interface DescribeDomainNodesResponse {
  DomainNodesStatusList?: DomainNodesStatus[];
}
export const DescribeDomainNodesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNodesStatusList: S.optional(DomainNodesStatusList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeDomainNodesResponse",
}) as any as S.Schema<DescribeDomainNodesResponse>;
export type DomainNameList = string[];
export const DomainNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeDomainsRequest {
  DomainNames: string[];
}
export const DescribeDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNames: DomainNameList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/domain-info" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainsRequest",
}) as any as S.Schema<DescribeDomainsRequest>;
export type DomainStatusList = DomainStatus[];
export const DomainStatusList = /*@__PURE__*/ S.Array(DomainStatus);
export interface DescribeDomainsResponse {
  DomainStatusList: DomainStatus[];
}
export const DescribeDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatusList: DomainStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeDomainsResponse",
}) as any as S.Schema<DescribeDomainsResponse>;
export interface DescribeDryRunProgressRequest {
  DomainName: string;
  DryRunId?: string;
  LoadDryRunConfig?: boolean;
}
export const DescribeDryRunProgressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DryRunId: S.optional(S.String).pipe(T.HttpQuery("dryRunId")),
    LoadDryRunConfig: S.optional(S.Boolean).pipe(
      T.HttpQuery("loadDryRunConfig"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dryRun",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDryRunProgressRequest",
}) as any as S.Schema<DescribeDryRunProgressRequest>;
export interface ValidationFailure {
  Code?: string;
  Message?: string;
}
export const ValidationFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "ValidationFailure",
}) as any as S.Schema<ValidationFailure>;
export type ValidationFailures = ValidationFailure[];
export const ValidationFailures = /*@__PURE__*/ S.Array(ValidationFailure);
export interface DryRunProgressStatus {
  DryRunId: string;
  DryRunStatus: string;
  CreationDate: string;
  UpdateDate: string;
  ValidationFailures?: ValidationFailure[];
}
export const DryRunProgressStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DryRunId: S.String,
    DryRunStatus: S.String,
    CreationDate: S.String,
    UpdateDate: S.String,
    ValidationFailures: S.optional(ValidationFailures),
  }),
).annotate({
  identifier: "DryRunProgressStatus",
}) as any as S.Schema<DryRunProgressStatus>;
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
export interface DescribeDryRunProgressResponse {
  DryRunProgressStatus?: DryRunProgressStatus;
  DryRunConfig?: DomainStatus;
  DryRunResults?: DryRunResults;
}
export const DescribeDryRunProgressResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DryRunProgressStatus: S.optional(DryRunProgressStatus),
    DryRunConfig: S.optional(DomainStatus),
    DryRunResults: S.optional(DryRunResults),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDryRunProgressResponse",
}) as any as S.Schema<DescribeDryRunProgressResponse>;
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
export interface DescribeInboundConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeInboundConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/cc/inboundConnection/search",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInboundConnectionsRequest",
}) as any as S.Schema<DescribeInboundConnectionsRequest>;
export type InboundConnections = InboundConnection[];
export const InboundConnections = /*@__PURE__*/ S.Array(InboundConnection);
export interface DescribeInboundConnectionsResponse {
  Connections?: InboundConnection[];
  NextToken?: string;
}
export const DescribeInboundConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Connections: S.optional(InboundConnections),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInboundConnectionsResponse",
}) as any as S.Schema<DescribeInboundConnectionsResponse>;
export type InsightEntityType = "Account" | "DomainName" | (string & {});
export const InsightEntityType = /*@__PURE__*/ S.String;

export type InsightEntityValue = string;
export interface InsightEntity {
  Type: InsightEntityType;
  Value?: string;
}
export const InsightEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: InsightEntityType, Value: S.optional(S.String) }),
).annotate({ identifier: "InsightEntity" }) as any as S.Schema<InsightEntity>;
export interface DescribeInsightDetailsRequest {
  Entity: InsightEntity;
  InsightId: string;
  ShowHtmlContent?: boolean;
}
export const DescribeInsightDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entity: InsightEntity,
    InsightId: S.String,
    ShowHtmlContent: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/insight-details" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInsightDetailsRequest",
}) as any as S.Schema<DescribeInsightDetailsRequest>;
export type InsightFieldType = "text" | "metric" | (string & {});
export const InsightFieldType = /*@__PURE__*/ S.String;

export interface InsightField {
  Name: string;
  Type: InsightFieldType;
  Value: string;
}
export const InsightField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Type: InsightFieldType, Value: S.String }),
).annotate({ identifier: "InsightField" }) as any as S.Schema<InsightField>;
export type InsightFieldList = InsightField[];
export const InsightFieldList = /*@__PURE__*/ S.Array(InsightField);
export interface DescribeInsightDetailsResponse {
  Fields: InsightField[];
}
export const DescribeInsightDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fields: InsightFieldList }).pipe(ns),
).annotate({
  identifier: "DescribeInsightDetailsResponse",
}) as any as S.Schema<DescribeInsightDetailsResponse>;
export interface DescribeInstanceTypeLimitsRequest {
  DomainName?: string;
  InstanceType: OpenSearchPartitionInstanceType;
  EngineVersion: string;
}
export const DescribeInstanceTypeLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
    InstanceType: OpenSearchPartitionInstanceType.pipe(
      T.HttpLabel("InstanceType"),
    ),
    EngineVersion: S.String.pipe(T.HttpLabel("EngineVersion")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/instanceTypeLimits/{EngineVersion}/{InstanceType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInstanceTypeLimitsRequest",
}) as any as S.Schema<DescribeInstanceTypeLimitsRequest>;
export type InstanceRole = string;
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
export interface DescribeInstanceTypeLimitsResponse {
  LimitsByRole?: { [key: string]: Limits | undefined };
}
export const DescribeInstanceTypeLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LimitsByRole: S.optional(LimitsByRole) }).pipe(ns),
).annotate({
  identifier: "DescribeInstanceTypeLimitsResponse",
}) as any as S.Schema<DescribeInstanceTypeLimitsResponse>;
export interface DescribeOutboundConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeOutboundConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/cc/outboundConnection/search",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeOutboundConnectionsRequest",
}) as any as S.Schema<DescribeOutboundConnectionsRequest>;
export type OutboundConnections = OutboundConnection[];
export const OutboundConnections = /*@__PURE__*/ S.Array(OutboundConnection);
export interface DescribeOutboundConnectionsResponse {
  Connections?: OutboundConnection[];
  NextToken?: string;
}
export const DescribeOutboundConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Connections: S.optional(OutboundConnections),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeOutboundConnectionsResponse",
}) as any as S.Schema<DescribeOutboundConnectionsResponse>;
export type DescribePackagesFilterName =
  | "PackageID"
  | "PackageName"
  | "PackageStatus"
  | "PackageType"
  | "EngineVersion"
  | "PackageOwner"
  | (string & {});
export const DescribePackagesFilterName = /*@__PURE__*/ S.String;

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
      T.Http({ method: "POST", uri: "/2021-01-01/packages/describe" }),
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
export interface DescribeReservedInstanceOfferingsRequest {
  ReservedInstanceOfferingId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedInstanceOfferingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedInstanceOfferingId: S.optional(S.String).pipe(
        T.HttpQuery("offeringId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2021-01-01/opensearch/reservedInstanceOfferings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeReservedInstanceOfferingsRequest",
}) as any as S.Schema<DescribeReservedInstanceOfferingsRequest>;
export type ReservedInstancePaymentOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export const ReservedInstancePaymentOption = /*@__PURE__*/ S.String;

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
export interface ReservedInstanceOffering {
  ReservedInstanceOfferingId?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  PaymentOption?: ReservedInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedInstanceOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedInstanceOfferingId: S.optional(S.String),
    InstanceType: S.optional(OpenSearchPartitionInstanceType),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    PaymentOption: S.optional(ReservedInstancePaymentOption),
    RecurringCharges: S.optional(RecurringChargeList),
  }),
).annotate({
  identifier: "ReservedInstanceOffering",
}) as any as S.Schema<ReservedInstanceOffering>;
export type ReservedInstanceOfferingList = ReservedInstanceOffering[];
export const ReservedInstanceOfferingList = /*@__PURE__*/ S.Array(
  ReservedInstanceOffering.pipe(T.XmlName("ReservedInstanceOffering")).annotate(
    { identifier: "ReservedInstanceOffering" },
  ),
);
export interface DescribeReservedInstanceOfferingsResponse {
  NextToken?: string;
  ReservedInstanceOfferings?: ReservedInstanceOffering[];
}
export const DescribeReservedInstanceOfferingsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      ReservedInstanceOfferings: S.optional(ReservedInstanceOfferingList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReservedInstanceOfferingsResponse",
  }) as any as S.Schema<DescribeReservedInstanceOfferingsResponse>;
export interface DescribeReservedInstancesRequest {
  ReservedInstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeReservedInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedInstanceId: S.optional(S.String).pipe(T.HttpQuery("reservationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/reservedInstances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReservedInstancesRequest",
}) as any as S.Schema<DescribeReservedInstancesRequest>;
export type ReservationToken = string;
export interface ReservedInstance {
  ReservationName?: string;
  ReservedInstanceId?: string;
  BillingSubscriptionId?: number;
  ReservedInstanceOfferingId?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  InstanceCount?: number;
  State?: string;
  PaymentOption?: ReservedInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservationName: S.optional(S.String),
    ReservedInstanceId: S.optional(S.String),
    BillingSubscriptionId: S.optional(S.Number),
    ReservedInstanceOfferingId: S.optional(S.String),
    InstanceType: S.optional(OpenSearchPartitionInstanceType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    State: S.optional(S.String),
    PaymentOption: S.optional(ReservedInstancePaymentOption),
    RecurringCharges: S.optional(RecurringChargeList),
  }),
).annotate({
  identifier: "ReservedInstance",
}) as any as S.Schema<ReservedInstance>;
export type ReservedInstanceList = ReservedInstance[];
export const ReservedInstanceList = /*@__PURE__*/ S.Array(ReservedInstance);
export interface DescribeReservedInstancesResponse {
  NextToken?: string;
  ReservedInstances?: ReservedInstance[];
}
export const DescribeReservedInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ReservedInstances: S.optional(ReservedInstanceList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReservedInstancesResponse",
}) as any as S.Schema<DescribeReservedInstancesResponse>;
export type VpcEndpointIdList = string[];
export const VpcEndpointIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeVpcEndpointsRequest {
  VpcEndpointIds: string[];
}
export const DescribeVpcEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointIds: VpcEndpointIdList }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/vpcEndpoints/describe",
      }),
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
export const VpcEndpointErrorCode = /*@__PURE__*/ S.String;

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
export interface DetachDataSourceRequest {
  id: string;
  dataSourceArn: string;
}
export const DetachDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dataSourceArn: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/application/{id}/detachDataSource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachDataSourceRequest",
}) as any as S.Schema<DetachDataSourceRequest>;
export interface DetachDataSourceResponse {
  id?: string;
  arn?: string;
  dataSourceArn?: string;
}
export const DetachDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    dataSourceArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DetachDataSourceResponse",
}) as any as S.Schema<DetachDataSourceResponse>;
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
        uri: "/2021-01-01/packages/dissociate/{PackageID}/{DomainName}",
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
export interface DissociatePackagesRequest {
  PackageList: string[];
  DomainName: string;
}
export const DissociatePackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageList: PackageIDList, DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/packages/dissociateMultiple",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DissociatePackagesRequest",
}) as any as S.Schema<DissociatePackagesRequest>;
export interface DissociatePackagesResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
}
export const DissociatePackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainPackageDetailsList: S.optional(DomainPackageDetailsList),
  }).pipe(ns),
).annotate({
  identifier: "DissociatePackagesResponse",
}) as any as S.Schema<DissociatePackagesResponse>;
export interface GetApplicationRequest {
  id: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2021-01-01/opensearch/application/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export type ApplicationStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export const ApplicationStatus = /*@__PURE__*/ S.String;

export interface GetApplicationResponse {
  id?: string;
  arn?: string;
  name?: string;
  endpoint?: string;
  status?: ApplicationStatus;
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  dataSources?: DataSource[];
  appConfigs?: AppConfig[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  kmsKeyArn?: string;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    endpoint: S.optional(S.String),
    status: S.optional(ApplicationStatus),
    iamIdentityCenterOptions: S.optional(IamIdentityCenterOptions),
    dataSources: S.optional(DataSources),
    appConfigs: S.optional(AppConfigs),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    kmsKeyArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetCapabilityRequest {
  applicationId: string;
  capabilityName: string;
}
export const GetCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    capabilityName: S.String.pipe(T.HttpLabel("capabilityName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/application/{applicationId}/capability/{capabilityName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCapabilityRequest",
}) as any as S.Schema<GetCapabilityRequest>;
export interface AIConfig {}
export const AIConfig = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "AIConfig",
}) as any as S.Schema<AIConfig>;
export type CapabilityExtendedResponseConfig = { aiConfig: AIConfig };
export const CapabilityExtendedResponseConfig = /*@__PURE__*/ S.Union([
  S.Struct({ aiConfig: AIConfig }),
]);
export type CapabilityFailureReason =
  | "KMS_KEY_INSUFFICIENT_PERMISSION"
  | (string & {});
export const CapabilityFailureReason = /*@__PURE__*/ S.String;

export type CapabilityFailureDetails = string;
export interface CapabilityFailure {
  reason?: CapabilityFailureReason;
  details?: string;
}
export const CapabilityFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(CapabilityFailureReason),
    details: S.optional(S.String),
  }),
).annotate({
  identifier: "CapabilityFailure",
}) as any as S.Schema<CapabilityFailure>;
export type CapabilityFailures = CapabilityFailure[];
export const CapabilityFailures = /*@__PURE__*/ S.Array(CapabilityFailure);
export interface GetCapabilityResponse {
  capabilityName?: string;
  applicationId?: string;
  status?: CapabilityStatus;
  capabilityConfig?: CapabilityExtendedResponseConfig;
  failures?: CapabilityFailure[];
}
export const GetCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityName: S.optional(S.String),
    applicationId: S.optional(S.String),
    status: S.optional(CapabilityStatus),
    capabilityConfig: S.optional(CapabilityExtendedResponseConfig),
    failures: S.optional(CapabilityFailures),
  }).pipe(ns),
).annotate({
  identifier: "GetCapabilityResponse",
}) as any as S.Schema<GetCapabilityResponse>;
export interface GetCompatibleVersionsRequest {
  DomainName?: string;
}
export const GetCompatibleVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/compatibleVersions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCompatibleVersionsRequest",
}) as any as S.Schema<GetCompatibleVersionsRequest>;
export type VersionList = string[];
export const VersionList = /*@__PURE__*/ S.Array(S.String);
export interface CompatibleVersionsMap {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export const CompatibleVersionsMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceVersion: S.optional(S.String),
    TargetVersions: S.optional(VersionList),
  }),
).annotate({
  identifier: "CompatibleVersionsMap",
}) as any as S.Schema<CompatibleVersionsMap>;
export type CompatibleVersionsList = CompatibleVersionsMap[];
export const CompatibleVersionsList = /*@__PURE__*/ S.Array(
  CompatibleVersionsMap,
);
export interface GetCompatibleVersionsResponse {
  CompatibleVersions?: CompatibleVersionsMap[];
}
export const GetCompatibleVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CompatibleVersions: S.optional(CompatibleVersionsList) }).pipe(ns),
).annotate({
  identifier: "GetCompatibleVersionsResponse",
}) as any as S.Schema<GetCompatibleVersionsResponse>;
export interface GetDataSourceRequest {
  DomainName: string;
  Name: string;
}
export const GetDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
      }),
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
export type DataSourceStatus = "ACTIVE" | "DISABLED" | (string & {});
export const DataSourceStatus = /*@__PURE__*/ S.String;

export interface GetDataSourceResponse {
  DataSourceType?: DataSourceType;
  Name?: string;
  Description?: string;
  Status?: DataSourceStatus;
}
export const GetDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceType: S.optional(DataSourceType),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(DataSourceStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetDataSourceResponse",
}) as any as S.Schema<GetDataSourceResponse>;
export interface GetDefaultApplicationSettingRequest {}
export const GetDefaultApplicationSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/defaultApplicationSetting",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDefaultApplicationSettingRequest",
}) as any as S.Schema<GetDefaultApplicationSettingRequest>;
export interface GetDefaultApplicationSettingResponse {
  applicationArn?: string;
}
export const GetDefaultApplicationSettingResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ applicationArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetDefaultApplicationSettingResponse",
}) as any as S.Schema<GetDefaultApplicationSettingResponse>;
export interface GetDirectQueryDataSourceRequest {
  DataSourceName: string;
}
export const GetDirectQueryDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.String.pipe(T.HttpLabel("DataSourceName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDirectQueryDataSourceRequest",
}) as any as S.Schema<GetDirectQueryDataSourceRequest>;
export interface GetDirectQueryDataSourceResponse {
  DataSourceName?: string;
  DataSourceType?: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
  DataSourceArn?: string;
}
export const GetDirectQueryDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.optional(S.String),
    DataSourceType: S.optional(DirectQueryDataSourceType),
    Description: S.optional(S.String),
    OpenSearchArns: S.optional(DirectQueryOpenSearchARNList),
    DataSourceAccessPolicy: S.optional(S.String),
    DataSourceArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDirectQueryDataSourceResponse",
}) as any as S.Schema<GetDirectQueryDataSourceResponse>;
export type RequestId = string;
export interface GetDomainMaintenanceStatusRequest {
  DomainName: string;
  MaintenanceId: string;
}
export const GetDomainMaintenanceStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaintenanceId: S.String.pipe(T.HttpQuery("maintenanceId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/domainMaintenance",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainMaintenanceStatusRequest",
}) as any as S.Schema<GetDomainMaintenanceStatusRequest>;
export type MaintenanceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const MaintenanceStatus = /*@__PURE__*/ S.String;

export type MaintenanceStatusMessage = string;
export type MaintenanceType =
  | "REBOOT_NODE"
  | "RESTART_SEARCH_PROCESS"
  | "RESTART_DASHBOARD"
  | (string & {});
export const MaintenanceType = /*@__PURE__*/ S.String;

export interface GetDomainMaintenanceStatusResponse {
  Status?: MaintenanceStatus;
  StatusMessage?: string;
  NodeId?: string;
  Action?: MaintenanceType;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const GetDomainMaintenanceStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(MaintenanceStatus),
    StatusMessage: S.optional(S.String),
    NodeId: S.optional(S.String),
    Action: S.optional(MaintenanceType),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetDomainMaintenanceStatusResponse",
}) as any as S.Schema<GetDomainMaintenanceStatusResponse>;
export interface GetIndexRequest {
  DomainName: string;
  IndexName: string;
}
export const GetIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIndexRequest",
}) as any as S.Schema<GetIndexRequest>;
export interface GetIndexResponse {
  IndexSchema: any;
}
export const GetIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexSchema: S.Any }).pipe(ns),
).annotate({
  identifier: "GetIndexResponse",
}) as any as S.Schema<GetIndexResponse>;
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
        uri: "/2021-01-01/packages/{PackageID}/history",
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
  PluginProperties?: PluginProperties;
  PackageConfiguration?: PackageConfiguration;
}
export const PackageVersionHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageVersion: S.optional(S.String),
    CommitMessage: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PluginProperties: S.optional(PluginProperties),
    PackageConfiguration: S.optional(PackageConfiguration),
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
        uri: "/2021-01-01/opensearch/upgradeDomain/{DomainName}/history",
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
export const UpgradeStatus = /*@__PURE__*/ S.String;

export type UpgradeStep =
  | "PRE_UPGRADE_CHECK"
  | "SNAPSHOT"
  | "UPGRADE"
  | (string & {});
export const UpgradeStep = /*@__PURE__*/ S.String;

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
        uri: "/2021-01-01/opensearch/upgradeDomain/{DomainName}/status",
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
export type ApplicationStatuses = ApplicationStatus[];
export const ApplicationStatuses = /*@__PURE__*/ S.Array(ApplicationStatus);
export interface ListApplicationsRequest {
  nextToken?: string;
  statuses?: ApplicationStatus[];
  maxResults?: number;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    statuses: S.optional(ApplicationStatuses).pipe(T.HttpQuery("statuses")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/list-applications",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface ApplicationSummary {
  id?: string;
  arn?: string;
  name?: string;
  endpoint?: string;
  status?: ApplicationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    endpoint: S.optional(S.String),
    status: S.optional(ApplicationStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationSummaries = ApplicationSummary[];
export const ApplicationSummaries = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  ApplicationSummaries?: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationSummaries: S.optional(ApplicationSummaries),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListDataSourceAttachmentsRequest {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourceAttachmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/application/{id}/listDataSourceAttachments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourceAttachmentsRequest",
}) as any as S.Schema<ListDataSourceAttachmentsRequest>;
export interface DataSourceAttachmentSummary {
  attachmentId?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export const DataSourceAttachmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    dataSourceArn: S.optional(S.String),
    status: S.optional(DataSourceAttachmentStatus),
  }),
).annotate({
  identifier: "DataSourceAttachmentSummary",
}) as any as S.Schema<DataSourceAttachmentSummary>;
export type DataSourceAttachmentSummaryList = DataSourceAttachmentSummary[];
export const DataSourceAttachmentSummaryList = /*@__PURE__*/ S.Array(
  DataSourceAttachmentSummary,
);
export interface ListDataSourceAttachmentsResponse {
  attachments?: DataSourceAttachmentSummary[];
  nextToken?: string;
}
export const ListDataSourceAttachmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachments: S.optional(DataSourceAttachmentSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDataSourceAttachmentsResponse",
}) as any as S.Schema<ListDataSourceAttachmentsResponse>;
export interface ListDataSourcesRequest {
  DomainName: string;
}
export const ListDataSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dataSource",
      }),
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
export interface DataSourceDetails {
  DataSourceType?: DataSourceType;
  Name?: string;
  Description?: string;
  Status?: DataSourceStatus;
}
export const DataSourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceType: S.optional(DataSourceType),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(DataSourceStatus),
  }),
).annotate({
  identifier: "DataSourceDetails",
}) as any as S.Schema<DataSourceDetails>;
export type DataSourceList = DataSourceDetails[];
export const DataSourceList = /*@__PURE__*/ S.Array(DataSourceDetails);
export interface ListDataSourcesResponse {
  DataSources?: DataSourceDetails[];
}
export const ListDataSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSources: S.optional(DataSourceList) }).pipe(ns),
).annotate({
  identifier: "ListDataSourcesResponse",
}) as any as S.Schema<ListDataSourcesResponse>;
export interface ListDirectQueryDataSourcesRequest {
  NextToken?: string;
}
export const ListDirectQueryDataSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nexttoken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/directQueryDataSource",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDirectQueryDataSourcesRequest",
}) as any as S.Schema<ListDirectQueryDataSourcesRequest>;
export interface DirectQueryDataSource {
  DataSourceName?: string;
  DataSourceType?: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceArn?: string;
  TagList?: Tag[];
}
export const DirectQueryDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.optional(S.String),
    DataSourceType: S.optional(DirectQueryDataSourceType),
    Description: S.optional(S.String),
    OpenSearchArns: S.optional(DirectQueryOpenSearchARNList),
    DataSourceArn: S.optional(S.String),
    TagList: S.optional(TagList),
  }),
).annotate({
  identifier: "DirectQueryDataSource",
}) as any as S.Schema<DirectQueryDataSource>;
export type DirectQueryDataSourceList = DirectQueryDataSource[];
export const DirectQueryDataSourceList = /*@__PURE__*/ S.Array(
  DirectQueryDataSource,
);
export interface ListDirectQueryDataSourcesResponse {
  NextToken?: string;
  DirectQueryDataSources?: DirectQueryDataSource[];
}
export const ListDirectQueryDataSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DirectQueryDataSources: S.optional(DirectQueryDataSourceList),
  }).pipe(ns),
).annotate({
  identifier: "ListDirectQueryDataSourcesResponse",
}) as any as S.Schema<ListDirectQueryDataSourcesResponse>;
export interface ListDomainMaintenancesRequest {
  DomainName: string;
  Action?: MaintenanceType;
  Status?: MaintenanceStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDomainMaintenancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Action: S.optional(MaintenanceType).pipe(T.HttpQuery("action")),
    Status: S.optional(MaintenanceStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/domainMaintenances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainMaintenancesRequest",
}) as any as S.Schema<ListDomainMaintenancesRequest>;
export interface DomainMaintenanceDetails {
  MaintenanceId?: string;
  DomainName?: string;
  Action?: MaintenanceType;
  NodeId?: string;
  Status?: MaintenanceStatus;
  StatusMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const DomainMaintenanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceId: S.optional(S.String),
    DomainName: S.optional(S.String),
    Action: S.optional(MaintenanceType),
    NodeId: S.optional(S.String),
    Status: S.optional(MaintenanceStatus),
    StatusMessage: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DomainMaintenanceDetails",
}) as any as S.Schema<DomainMaintenanceDetails>;
export type DomainMaintenanceList = DomainMaintenanceDetails[];
export const DomainMaintenanceList = /*@__PURE__*/ S.Array(
  DomainMaintenanceDetails,
);
export interface ListDomainMaintenancesResponse {
  DomainMaintenances?: DomainMaintenanceDetails[];
  NextToken?: string;
}
export const ListDomainMaintenancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainMaintenances: S.optional(DomainMaintenanceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainMaintenancesResponse",
}) as any as S.Schema<ListDomainMaintenancesResponse>;
export type EngineType = "OpenSearch" | "Elasticsearch" | (string & {});
export const EngineType = /*@__PURE__*/ S.String;

export interface ListDomainNamesRequest {
  EngineType?: EngineType;
}
export const ListDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(EngineType).pipe(T.HttpQuery("engineType")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2021-01-01/domain" }),
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
        uri: "/2021-01-01/packages/{PackageID}/domains",
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
export interface InsightTimeRange {
  From: number;
  To: number;
}
export const InsightTimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ From: S.Number, To: S.Number }),
).annotate({
  identifier: "InsightTimeRange",
}) as any as S.Schema<InsightTimeRange>;
export type InsightSortOrder = "ASC" | "DESC" | (string & {});
export const InsightSortOrder = /*@__PURE__*/ S.String;

export type InsightPageSize = number;
export interface ListInsightsRequest {
  Entity: InsightEntity;
  TimeRange?: InsightTimeRange;
  SortOrder?: InsightSortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export const ListInsightsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entity: InsightEntity,
    TimeRange: S.optional(InsightTimeRange),
    SortOrder: S.optional(InsightSortOrder),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/insights" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInsightsRequest",
}) as any as S.Schema<ListInsightsRequest>;
export type InsightType = "EVENT" | "RECOMMENDATION" | (string & {});
export const InsightType = /*@__PURE__*/ S.String;

export type InsightPriorityLevel =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | (string & {});
export const InsightPriorityLevel = /*@__PURE__*/ S.String;

export type InsightStatus = "ACTIVE" | "RESOLVED" | "DISMISSED" | (string & {});
export const InsightStatus = /*@__PURE__*/ S.String;

export interface Insight {
  InsightId?: string;
  DisplayName?: string;
  Type?: InsightType;
  Priority?: InsightPriorityLevel;
  Status?: InsightStatus;
  CreationTime?: Date;
  UpdateTime?: Date;
  IsExperimental?: boolean;
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Type: S.optional(InsightType),
    Priority: S.optional(InsightPriorityLevel),
    Status: S.optional(InsightStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsExperimental: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(Insight);
export interface ListInsightsResponse {
  Insights?: Insight[];
  NextToken?: string;
}
export const ListInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Insights: S.optional(InsightList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInsightsResponse",
}) as any as S.Schema<ListInsightsResponse>;
export type InstanceTypeString = string;
export interface ListInstanceTypeDetailsRequest {
  EngineVersion: string;
  DomainName?: string;
  MaxResults?: number;
  NextToken?: string;
  RetrieveAZs?: boolean;
  InstanceType?: string;
}
export const ListInstanceTypeDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineVersion: S.String.pipe(T.HttpLabel("EngineVersion")),
    DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RetrieveAZs: S.optional(S.Boolean).pipe(T.HttpQuery("retrieveAZs")),
    InstanceType: S.optional(S.String).pipe(T.HttpQuery("instanceType")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/instanceTypeDetails/{EngineVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInstanceTypeDetailsRequest",
}) as any as S.Schema<ListInstanceTypeDetailsRequest>;
export type InstanceRoleList = string[];
export const InstanceRoleList = /*@__PURE__*/ S.Array(S.String);
export type AvailabilityZoneList = string[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(S.String);
export interface InstanceTypeDetails {
  InstanceType?: OpenSearchPartitionInstanceType;
  EncryptionEnabled?: boolean;
  CognitoEnabled?: boolean;
  AppLogsEnabled?: boolean;
  AdvancedSecurityEnabled?: boolean;
  WarmEnabled?: boolean;
  InstanceRole?: string[];
  AvailabilityZones?: string[];
}
export const InstanceTypeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(OpenSearchPartitionInstanceType),
    EncryptionEnabled: S.optional(S.Boolean),
    CognitoEnabled: S.optional(S.Boolean),
    AppLogsEnabled: S.optional(S.Boolean),
    AdvancedSecurityEnabled: S.optional(S.Boolean),
    WarmEnabled: S.optional(S.Boolean),
    InstanceRole: S.optional(InstanceRoleList),
    AvailabilityZones: S.optional(AvailabilityZoneList),
  }),
).annotate({
  identifier: "InstanceTypeDetails",
}) as any as S.Schema<InstanceTypeDetails>;
export type InstanceTypeDetailsList = InstanceTypeDetails[];
export const InstanceTypeDetailsList =
  /*@__PURE__*/ S.Array(InstanceTypeDetails);
export interface ListInstanceTypeDetailsResponse {
  InstanceTypeDetails?: InstanceTypeDetails[];
  NextToken?: string;
}
export const ListInstanceTypeDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceTypeDetails: S.optional(InstanceTypeDetailsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInstanceTypeDetailsResponse",
}) as any as S.Schema<ListInstanceTypeDetailsResponse>;
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
        uri: "/2021-01-01/domain/{DomainName}/packages",
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
export interface ListScheduledActionsRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListScheduledActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/scheduledActions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScheduledActionsRequest",
}) as any as S.Schema<ListScheduledActionsRequest>;
export type ActionType =
  | "SERVICE_SOFTWARE_UPDATE"
  | "JVM_HEAP_SIZE_TUNING"
  | "JVM_YOUNG_GEN_TUNING"
  | (string & {});
export const ActionType = /*@__PURE__*/ S.String;

export type ActionSeverity = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export const ActionSeverity = /*@__PURE__*/ S.String;

export type ScheduledBy = "CUSTOMER" | "SYSTEM" | (string & {});
export const ScheduledBy = /*@__PURE__*/ S.String;

export type ActionStatus =
  | "PENDING_UPDATE"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | (string & {});
export const ActionStatus = /*@__PURE__*/ S.String;

export interface ScheduledAction {
  Id: string;
  Type: ActionType;
  Severity: ActionSeverity;
  ScheduledTime: number;
  Description?: string;
  ScheduledBy?: ScheduledBy;
  Status?: ActionStatus;
  Mandatory?: boolean;
  Cancellable?: boolean;
}
export const ScheduledAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Type: ActionType,
    Severity: ActionSeverity,
    ScheduledTime: S.Number,
    Description: S.optional(S.String),
    ScheduledBy: S.optional(ScheduledBy),
    Status: S.optional(ActionStatus),
    Mandatory: S.optional(S.Boolean),
    Cancellable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ScheduledAction",
}) as any as S.Schema<ScheduledAction>;
export type ScheduledActionsList = ScheduledAction[];
export const ScheduledActionsList = /*@__PURE__*/ S.Array(ScheduledAction);
export interface ListScheduledActionsResponse {
  ScheduledActions?: ScheduledAction[];
  NextToken?: string;
}
export const ListScheduledActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActions: S.optional(ScheduledActionsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListScheduledActionsResponse",
}) as any as S.Schema<ListScheduledActionsResponse>;
export interface ListTagsRequest {
  ARN: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2021-01-01/tags" }),
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
export interface ListVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2021-01-01/opensearch/versions" }),
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
export interface ListVersionsResponse {
  Versions?: string[];
  NextToken?: string;
}
export const ListVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Versions: S.optional(VersionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListVersionsResponse",
}) as any as S.Schema<ListVersionsResponse>;
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
        uri: "/2021-01-01/opensearch/domain/{DomainName}/listVpcEndpointAccess",
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
      T.Http({ method: "GET", uri: "/2021-01-01/opensearch/vpcEndpoints" }),
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
        uri: "/2021-01-01/opensearch/domain/{DomainName}/vpcEndpoints",
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
export interface PurchaseReservedInstanceOfferingRequest {
  ReservedInstanceOfferingId: string;
  ReservationName: string;
  InstanceCount?: number;
}
export const PurchaseReservedInstanceOfferingRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedInstanceOfferingId: S.String,
      ReservationName: S.String,
      InstanceCount: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2021-01-01/opensearch/purchaseReservedInstanceOffering",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PurchaseReservedInstanceOfferingRequest",
}) as any as S.Schema<PurchaseReservedInstanceOfferingRequest>;
export interface PurchaseReservedInstanceOfferingResponse {
  ReservedInstanceId?: string;
  ReservationName?: string;
}
export const PurchaseReservedInstanceOfferingResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedInstanceId: S.optional(S.String),
      ReservationName: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "PurchaseReservedInstanceOfferingResponse",
}) as any as S.Schema<PurchaseReservedInstanceOfferingResponse>;
export interface PutDefaultApplicationSettingRequest {
  applicationArn: string;
  setAsDefault: boolean;
}
export const PutDefaultApplicationSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationArn: S.String, setAsDefault: S.Boolean }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/defaultApplicationSetting",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDefaultApplicationSettingRequest",
}) as any as S.Schema<PutDefaultApplicationSettingRequest>;
export interface PutDefaultApplicationSettingResponse {
  applicationArn?: string;
}
export const PutDefaultApplicationSettingResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ applicationArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutDefaultApplicationSettingResponse",
}) as any as S.Schema<PutDefaultApplicationSettingResponse>;
export type CapabilityBaseRequestConfig = { aiConfig: AIConfig };
export const CapabilityBaseRequestConfig = /*@__PURE__*/ S.Union([
  S.Struct({ aiConfig: AIConfig }),
]);
export interface RegisterCapabilityRequest {
  applicationId: string;
  capabilityName: string;
  capabilityConfig: CapabilityBaseRequestConfig;
}
export const RegisterCapabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    capabilityName: S.String,
    capabilityConfig: CapabilityBaseRequestConfig,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/application/{applicationId}/capability/register",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterCapabilityRequest",
}) as any as S.Schema<RegisterCapabilityRequest>;
export type CapabilityBaseResponseConfig = { aiConfig: AIConfig };
export const CapabilityBaseResponseConfig = /*@__PURE__*/ S.Union([
  S.Struct({ aiConfig: AIConfig }),
]);
export interface RegisterCapabilityResponse {
  capabilityName?: string;
  applicationId?: string;
  status?: CapabilityStatus;
  capabilityConfig?: CapabilityBaseResponseConfig;
}
export const RegisterCapabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityName: S.optional(S.String),
    applicationId: S.optional(S.String),
    status: S.optional(CapabilityStatus),
    capabilityConfig: S.optional(CapabilityBaseResponseConfig),
  }).pipe(ns),
).annotate({
  identifier: "RegisterCapabilityResponse",
}) as any as S.Schema<RegisterCapabilityResponse>;
export interface RejectInboundConnectionRequest {
  ConnectionId: string;
}
export const RejectInboundConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}/reject",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectInboundConnectionRequest",
}) as any as S.Schema<RejectInboundConnectionRequest>;
export interface RejectInboundConnectionResponse {
  Connection?: InboundConnection;
}
export const RejectInboundConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(InboundConnection) }).pipe(ns),
).annotate({
  identifier: "RejectInboundConnectionResponse",
}) as any as S.Schema<RejectInboundConnectionResponse>;
export interface RemoveTagsRequest {
  ARN: string;
  TagKeys: string[];
}
export const RemoveTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.String, TagKeys: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/tags-removal" }),
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
  Account?: string;
  Service?: AWSServicePrincipal;
  ServiceOptions?: ServiceOptions;
}
export const RevokeVpcEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Account: S.optional(S.String),
    Service: S.optional(AWSServicePrincipal),
    ServiceOptions: S.optional(ServiceOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/revokeVpcEndpointAccess",
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
export interface RollbackServiceSoftwareUpdateRequest {
  DomainName: string;
}
export const RollbackServiceSoftwareUpdateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainName: S.String }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2021-01-01/opensearch/serviceSoftwareUpdate/rollback",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RollbackServiceSoftwareUpdateRequest",
}) as any as S.Schema<RollbackServiceSoftwareUpdateRequest>;
export interface RollbackServiceSoftwareOptions {
  CurrentVersion?: string;
  NewVersion?: string;
  RollbackAvailable?: boolean;
  Description?: string;
}
export const RollbackServiceSoftwareOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentVersion: S.optional(S.String),
    NewVersion: S.optional(S.String),
    RollbackAvailable: S.optional(S.Boolean),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "RollbackServiceSoftwareOptions",
}) as any as S.Schema<RollbackServiceSoftwareOptions>;
export interface RollbackServiceSoftwareUpdateResponse {
  RollbackServiceSoftwareOptions?: RollbackServiceSoftwareOptions;
}
export const RollbackServiceSoftwareUpdateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RollbackServiceSoftwareOptions: S.optional(
        RollbackServiceSoftwareOptions,
      ),
    }).pipe(ns),
).annotate({
  identifier: "RollbackServiceSoftwareUpdateResponse",
}) as any as S.Schema<RollbackServiceSoftwareUpdateResponse>;
export interface StartDomainMaintenanceRequest {
  DomainName: string;
  Action: MaintenanceType;
  NodeId?: string;
}
export const StartDomainMaintenanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Action: MaintenanceType,
    NodeId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/domainMaintenance",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDomainMaintenanceRequest",
}) as any as S.Schema<StartDomainMaintenanceRequest>;
export interface StartDomainMaintenanceResponse {
  MaintenanceId?: string;
}
export const StartDomainMaintenanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaintenanceId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartDomainMaintenanceResponse",
}) as any as S.Schema<StartDomainMaintenanceResponse>;
export type ScheduleAt =
  | "NOW"
  | "TIMESTAMP"
  | "OFF_PEAK_WINDOW"
  | (string & {});
export const ScheduleAt = /*@__PURE__*/ S.String;

export interface StartServiceSoftwareUpdateRequest {
  DomainName: string;
  ScheduleAt?: ScheduleAt;
  DesiredStartTime?: number;
}
export const StartServiceSoftwareUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ScheduleAt: S.optional(ScheduleAt),
    DesiredStartTime: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/serviceSoftwareUpdate/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartServiceSoftwareUpdateRequest",
}) as any as S.Schema<StartServiceSoftwareUpdateRequest>;
export interface StartServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export const StartServiceSoftwareUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceSoftwareOptions: S.optional(ServiceSoftwareOptions) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StartServiceSoftwareUpdateResponse",
}) as any as S.Schema<StartServiceSoftwareUpdateResponse>;
export interface UpdateApplicationRequest {
  id: string;
  dataSources?: DataSource[];
  appConfigs?: AppConfig[];
  iamIdentityCenterOptions?: IamIdentityCenterOptionsInput;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dataSources: S.optional(DataSources),
    appConfigs: S.optional(AppConfigs),
    iamIdentityCenterOptions: S.optional(IamIdentityCenterOptionsInput),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/2021-01-01/opensearch/application/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {
  id?: string;
  name?: string;
  arn?: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  appConfigs?: AppConfig[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    arn: S.optional(S.String),
    dataSources: S.optional(DataSources),
    iamIdentityCenterOptions: S.optional(IamIdentityCenterOptions),
    appConfigs: S.optional(AppConfigs),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateDataSourceRequest {
  DomainName: string;
  Name: string;
  DataSourceType: DataSourceType;
  Description?: string;
  Status?: DataSourceStatus;
}
export const UpdateDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
    DataSourceType: DataSourceType,
    Description: S.optional(S.String),
    Status: S.optional(DataSourceStatus),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
      }),
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
  Message?: string;
}
export const UpdateDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDataSourceResponse",
}) as any as S.Schema<UpdateDataSourceResponse>;
export interface UpdateDirectQueryDataSourceRequest {
  DataSourceName: string;
  DataSourceType: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
}
export const UpdateDirectQueryDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSourceName: S.String.pipe(T.HttpLabel("DataSourceName")),
    DataSourceType: DirectQueryDataSourceType,
    Description: S.optional(S.String),
    OpenSearchArns: S.optional(DirectQueryOpenSearchARNList),
    DataSourceAccessPolicy: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDirectQueryDataSourceRequest",
}) as any as S.Schema<UpdateDirectQueryDataSourceRequest>;
export interface UpdateDirectQueryDataSourceResponse {
  DataSourceArn?: string;
}
export const UpdateDirectQueryDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSourceArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateDirectQueryDataSourceResponse",
}) as any as S.Schema<UpdateDirectQueryDataSourceResponse>;
export type DryRunMode = "Basic" | "Verbose" | (string & {});
export const DryRunMode = /*@__PURE__*/ S.String;

export interface UpdateDomainConfigRequest {
  DomainName: string;
  ClusterConfig?: ClusterConfig;
  EBSOptions?: EBSOptions;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  DomainEndpointOptions?: DomainEndpointOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  AutoTuneOptions?: AutoTuneOptions;
  DryRun?: boolean;
  DryRunMode?: DryRunMode;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  AIMLOptions?: AIMLOptionsInput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
}
export const UpdateDomainConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    ClusterConfig: S.optional(ClusterConfig),
    EBSOptions: S.optional(EBSOptions),
    SnapshotOptions: S.optional(SnapshotOptions),
    VPCOptions: S.optional(VPCOptions),
    CognitoOptions: S.optional(CognitoOptions),
    AdvancedOptions: S.optional(AdvancedOptions),
    AccessPolicies: S.optional(S.String),
    IPAddressType: S.optional(IPAddressType),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    DomainEndpointOptions: S.optional(DomainEndpointOptions),
    NodeToNodeEncryptionOptions: S.optional(NodeToNodeEncryptionOptions),
    AdvancedSecurityOptions: S.optional(AdvancedSecurityOptionsInput),
    IdentityCenterOptions: S.optional(IdentityCenterOptionsInput),
    AutoTuneOptions: S.optional(AutoTuneOptions),
    DryRun: S.optional(S.Boolean),
    DryRunMode: S.optional(DryRunMode),
    OffPeakWindowOptions: S.optional(OffPeakWindowOptions),
    SoftwareUpdateOptions: S.optional(SoftwareUpdateOptions),
    AIMLOptions: S.optional(AIMLOptionsInput),
    DeploymentStrategyOptions: S.optional(DeploymentStrategyOptions),
    AutomatedSnapshotPauseOptions: S.optional(
      AutomatedSnapshotPauseRequestOptions,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainConfigRequest",
}) as any as S.Schema<UpdateDomainConfigRequest>;
export interface UpdateDomainConfigResponse {
  DomainConfig: DomainConfig;
  DryRunResults?: DryRunResults;
  DryRunProgressStatus?: DryRunProgressStatus;
}
export const UpdateDomainConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainConfig: DomainConfig,
    DryRunResults: S.optional(DryRunResults),
    DryRunProgressStatus: S.optional(DryRunProgressStatus),
  }).pipe(ns),
).annotate({
  identifier: "UpdateDomainConfigResponse",
}) as any as S.Schema<UpdateDomainConfigResponse>;
export interface UpdateIndexRequest {
  DomainName: string;
  IndexName: string;
  IndexSchema: any;
}
export const UpdateIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
    IndexSchema: S.Any,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIndexRequest",
}) as any as S.Schema<UpdateIndexRequest>;
export interface UpdateIndexResponse {
  Status: IndexStatus;
}
export const UpdateIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: IndexStatus }).pipe(ns),
).annotate({
  identifier: "UpdateIndexResponse",
}) as any as S.Schema<UpdateIndexResponse>;
export interface UpdatePackageRequest {
  PackageID: string;
  PackageSource: PackageSource;
  PackageDescription?: string;
  CommitMessage?: string;
  PackageConfiguration?: PackageConfiguration;
  PackageEncryptionOptions?: PackageEncryptionOptions;
}
export const UpdatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String,
    PackageSource: PackageSource,
    PackageDescription: S.optional(S.String),
    CommitMessage: S.optional(S.String),
    PackageConfiguration: S.optional(PackageConfiguration),
    PackageEncryptionOptions: S.optional(PackageEncryptionOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/packages/update" }),
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
export type PackageScopeOperationEnum =
  | "ADD"
  | "OVERRIDE"
  | "REMOVE"
  | (string & {});
export const PackageScopeOperationEnum = /*@__PURE__*/ S.String;

export interface UpdatePackageScopeRequest {
  PackageID: string;
  Operation: PackageScopeOperationEnum;
  PackageUserList: string[];
}
export const UpdatePackageScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.String,
    Operation: PackageScopeOperationEnum,
    PackageUserList: PackageUserList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/packages/updateScope" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageScopeRequest",
}) as any as S.Schema<UpdatePackageScopeRequest>;
export interface UpdatePackageScopeResponse {
  PackageID?: string;
  Operation?: PackageScopeOperationEnum;
  PackageUserList?: string[];
}
export const UpdatePackageScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageID: S.optional(S.String),
    Operation: S.optional(PackageScopeOperationEnum),
    PackageUserList: S.optional(PackageUserList),
  }).pipe(ns),
).annotate({
  identifier: "UpdatePackageScopeResponse",
}) as any as S.Schema<UpdatePackageScopeResponse>;
export interface UpdateScheduledActionRequest {
  DomainName: string;
  ActionID: string;
  ActionType: ActionType;
  ScheduleAt: ScheduleAt;
  DesiredStartTime?: number;
}
export const UpdateScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    ActionID: S.String,
    ActionType: ActionType,
    ScheduleAt: ScheduleAt,
    DesiredStartTime: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2021-01-01/opensearch/domain/{DomainName}/scheduledAction/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScheduledActionRequest",
}) as any as S.Schema<UpdateScheduledActionRequest>;
export interface UpdateScheduledActionResponse {
  ScheduledAction?: ScheduledAction;
}
export const UpdateScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledAction: S.optional(ScheduledAction) }).pipe(ns),
).annotate({
  identifier: "UpdateScheduledActionResponse",
}) as any as S.Schema<UpdateScheduledActionResponse>;
export interface UpdateVpcEndpointRequest {
  VpcEndpointId: string;
  VpcOptions: VPCOptions;
}
export const UpdateVpcEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointId: S.String, VpcOptions: VPCOptions }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2021-01-01/opensearch/vpcEndpoints/update",
      }),
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
export interface UpgradeDomainRequest {
  DomainName: string;
  TargetVersion: string;
  PerformCheckOnly?: boolean;
  AdvancedOptions?: { [key: string]: string | undefined };
}
export const UpgradeDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    TargetVersion: S.String,
    PerformCheckOnly: S.optional(S.Boolean),
    AdvancedOptions: S.optional(AdvancedOptions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2021-01-01/opensearch/upgradeDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpgradeDomainRequest",
}) as any as S.Schema<UpgradeDomainRequest>;
export interface UpgradeDomainResponse {
  UpgradeId?: string;
  DomainName?: string;
  TargetVersion?: string;
  PerformCheckOnly?: boolean;
  AdvancedOptions?: { [key: string]: string | undefined };
  ChangeProgressDetails?: ChangeProgressDetails;
}
export const UpgradeDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpgradeId: S.optional(S.String),
    DomainName: S.optional(S.String),
    TargetVersion: S.optional(S.String),
    PerformCheckOnly: S.optional(S.Boolean),
    AdvancedOptions: S.optional(AdvancedOptions),
    ChangeProgressDetails: S.optional(ChangeProgressDetails),
  }).pipe(ns),
).annotate({
  identifier: "UpgradeDomainResponse",
}) as any as S.Schema<UpgradeDomainResponse>;
export type SlotList = number[];
export const SlotList = /*@__PURE__*/ S.Array(S.Number);
export type AcceptInboundConnectionError =
  | DisabledOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination Amazon OpenSearch Service domain owner to accept an inbound
 * cross-cluster search connection request. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const acceptInboundConnection: API.OperationMethod<
  AcceptInboundConnectionRequest,
  AcceptInboundConnectionResponse,
  AcceptInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptInboundConnectionRequest,
  output: AcceptInboundConnectionResponse,
  errors: [
    DisabledOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInboundConnection",
}));

export type AddDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new direct-query data source to the specified domain. For more information,
 * see Creating Amazon OpenSearch Service data source integrations with Amazon
 * S3.
 */
export const addDataSource: API.OperationMethod<
  AddDataSourceRequest,
  AddDataSourceResponse,
  AddDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddDataSourceRequest,
  output: AddDataSourceResponse,
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddDataSource",
}));

export type AddDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new data source in Amazon OpenSearch Service so that you can perform direct
 * queries on external data.
 */
export const addDirectQueryDataSource: API.OperationMethod<
  AddDirectQueryDataSourceRequest,
  AddDirectQueryDataSourceResponse,
  AddDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddDirectQueryDataSourceRequest,
  output: AddDirectQueryDataSourceResponse,
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
  operationName: "AddDirectQueryDataSource",
}));

export type AddTagsError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to an existing Amazon OpenSearch Service domain, data source, or
 * application.
 *
 * Tags are a set of case-sensitive key-value pairs. A domain, data source, or
 * application can have up to 10 tags. For more information, see Tagging Amazon OpenSearch Service resources.
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
 * Associates a package with an Amazon OpenSearch Service domain. For more information,
 * see Custom packages
 * for Amazon OpenSearch Service.
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

export type AssociatePackagesError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Operation in the Amazon OpenSearch Service API for associating multiple packages with
 * a domain simultaneously.
 */
export const associatePackages: API.OperationMethod<
  AssociatePackagesRequest,
  AssociatePackagesResponse,
  AssociatePackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePackagesRequest,
  output: AssociatePackagesResponse,
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
  operationName: "AssociatePackages",
}));

export type AttachDataSourceError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a data source to an OpenSearch application. The data source can be an Amazon OpenSearch Service domain or an Amazon OpenSearch Serverless collection. If both the application and data source are in the `ACTIVE` state, the attachment completes immediately and returns a status of `ATTACHED`. If either resource is not yet active, the operation stores the request and returns a status of `PENDING`. A background process then completes the attachment when both resources become active. Pending attachments that are not completed within 24 hours are marked as `FAILED`. This operation is idempotent. If a data source is already attached or pending for the same application, the existing attachment is returned.
 */
export const attachDataSource: API.OperationMethod<
  AttachDataSourceRequest,
  AttachDataSourceResponse,
  AttachDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachDataSourceRequest,
  output: AttachDataSourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachDataSource",
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
 * Provides access to an Amazon OpenSearch Service domain through the use of an interface
 * VPC endpoint.
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

export type CancelServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a scheduled service software update for an Amazon OpenSearch Service domain.
 * You can only perform this operation before the `AutomatedUpdateDate` and when
 * the domain's `UpdateStatus` is `PENDING_UPDATE`. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const cancelServiceSoftwareUpdate: API.OperationMethod<
  CancelServiceSoftwareUpdateRequest,
  CancelServiceSoftwareUpdateResponse,
  CancelServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelServiceSoftwareUpdateRequest,
  output: CancelServiceSoftwareUpdateResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelServiceSoftwareUpdate",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch UI application. For more information, see Using the OpenSearch user interface in Amazon OpenSearch Service.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon OpenSearch Service domain. For more information, see Creating and
 * managing Amazon OpenSearch Service domains.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResponse,
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
  operationName: "CreateDomain",
}));

export type CreateIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch index with optional automatic semantic enrichment for specified text fields. Automatic semantic enrichment enables semantic search capabilities without requiring machine learning expertise, improving search relevance by up to 20% by understanding search intent and contextual meaning beyond keyword matching. The semantic enrichment process has zero impact on search latency as sparse encodings are stored directly within the index during indexing. For more information, see Automatic semantic enrichment.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIndexRequest,
  output: CreateIndexResponse,
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
}));

export type CreateOutboundConnectionError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new cross-cluster search connection from a source Amazon OpenSearch Service domain
 * to a destination domain. For more information, see Cross-cluster search
 * for Amazon OpenSearch Service.
 */
export const createOutboundConnection: API.OperationMethod<
  CreateOutboundConnectionRequest,
  CreateOutboundConnectionResponse,
  CreateOutboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOutboundConnectionRequest,
  output: CreateOutboundConnectionResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutboundConnection",
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
 * Creates a package for use with Amazon OpenSearch Service domains. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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

export type DeleteApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified OpenSearch application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a direct-query data source. For more information, see Deleting
 * an Amazon OpenSearch Service data source with Amazon S3.
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
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
}));

export type DeleteDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously configured direct query data source from Amazon OpenSearch
 * Service.
 */
export const deleteDirectQueryDataSource: API.OperationMethod<
  DeleteDirectQueryDataSourceRequest,
  DeleteDirectQueryDataSourceResponse,
  DeleteDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDirectQueryDataSourceRequest,
  output: DeleteDirectQueryDataSourceResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectQueryDataSource",
}));

export type DeleteDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon OpenSearch Service domain and all of its data. You can't recover a
 * domain after you delete it.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteInboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination Amazon OpenSearch Service domain owner to delete an existing
 * inbound cross-cluster search connection. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const deleteInboundConnection: API.OperationMethod<
  DeleteInboundConnectionRequest,
  DeleteInboundConnectionResponse,
  DeleteInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInboundConnectionRequest,
  output: DeleteInboundConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundConnection",
}));

export type DeleteIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch index. This operation permanently removes the index and cannot be undone.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIndexRequest,
  output: DeleteIndexResponse,
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
}));

export type DeleteOutboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the source Amazon OpenSearch Service domain owner to delete an existing
 * outbound cross-cluster search connection. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const deleteOutboundConnection: API.OperationMethod<
  DeleteOutboundConnectionRequest,
  DeleteOutboundConnectionResponse,
  DeleteOutboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOutboundConnectionRequest,
  output: DeleteOutboundConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundConnection",
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
 * Deletes an Amazon OpenSearch Service package. For more information, see Custom packages
 * for Amazon OpenSearch Service.
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

export type DeregisterCapabilityError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a capability from an OpenSearch UI application. This operation removes the capability and its associated configuration.
 */
export const deregisterCapability: API.OperationMethod<
  DeregisterCapabilityRequest,
  DeregisterCapabilityResponse,
  DeregisterCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterCapabilityRequest,
  output: DeregisterCapabilityResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCapability",
}));

export type DescribeDataSourceAttachmentError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status and details of a specific data source attachment for an OpenSearch application. Throws a `ResourceNotFoundException` if no attachment record exists for the specified application and data source combination.
 */
export const describeDataSourceAttachment: API.OperationMethod<
  DescribeDataSourceAttachmentRequest,
  DescribeDataSourceAttachmentResponse,
  DescribeDataSourceAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDataSourceAttachmentRequest,
  output: DescribeDataSourceAttachmentResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSourceAttachment",
}));

export type DescribeDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the domain configuration for the specified Amazon OpenSearch Service domain,
 * including the domain ID, domain service endpoint, and domain ARN.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResponse,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainRequest,
  output: DescribeDomainResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
}));

export type DescribeDomainAutoTunesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of optimizations that Auto-Tune has made to an Amazon OpenSearch
 * Service domain. For more information, see Auto-Tune for Amazon
 * OpenSearch Service.
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
 * Returns information about the current blue/green deployment happening on an Amazon
 * OpenSearch Service domain. For more information, see Making configuration changes in Amazon OpenSearch Service.
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

export type DescribeDomainConfigError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the configuration of an Amazon OpenSearch Service domain.
 */
export const describeDomainConfig: API.OperationMethod<
  DescribeDomainConfigRequest,
  DescribeDomainConfigResponse,
  DescribeDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainConfigRequest,
  output: DescribeDomainConfigResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainConfig",
}));

export type DescribeDomainHealthError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about domain and node health, the standby Availability Zone,
 * number of nodes per Availability Zone, and shard count per node.
 */
export const describeDomainHealth: API.OperationMethod<
  DescribeDomainHealthRequest,
  DescribeDomainHealthResponse,
  DescribeDomainHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainHealthRequest,
  output: DescribeDomainHealthResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainHealth",
}));

export type DescribeDomainNodesError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about domain and nodes, including data nodes, master nodes,
 * ultrawarm nodes, Availability Zone(s), standby nodes, node configurations, and node
 * states.
 */
export const describeDomainNodes: API.OperationMethod<
  DescribeDomainNodesRequest,
  DescribeDomainNodesResponse,
  DescribeDomainNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainNodesRequest,
  output: DescribeDomainNodesResponse,
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainNodes",
}));

export type DescribeDomainsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Amazon OpenSearch Service
 * domains.
 */
export const describeDomains: API.OperationMethod<
  DescribeDomainsRequest,
  DescribeDomainsResponse,
  DescribeDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainsRequest,
  output: DescribeDomainsResponse,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomains",
}));

export type DescribeDryRunProgressError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the progress of a pre-update dry run analysis on an Amazon OpenSearch
 * Service domain. For more information, see Determining whether a change will cause a blue/green deployment.
 */
export const describeDryRunProgress: API.OperationMethod<
  DescribeDryRunProgressRequest,
  DescribeDryRunProgressResponse,
  DescribeDryRunProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDryRunProgressRequest,
  output: DescribeDryRunProgressResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDryRunProgress",
}));

export type DescribeInboundConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the inbound cross-cluster search connections for a destination (remote)
 * Amazon OpenSearch Service domain. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const describeInboundConnections: API.PaginatedOperationMethod<
  DescribeInboundConnectionsRequest,
  DescribeInboundConnectionsResponse,
  DescribeInboundConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInboundConnectionsRequest,
  output: DescribeInboundConnectionsResponse,
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInsightDetailsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details of an existing insight for an Amazon OpenSearch Service domain.
 * Returns detailed fields associated with the specified insight, such as text descriptions
 * and metric data.
 */
export const describeInsightDetails: API.OperationMethod<
  DescribeInsightDetailsRequest,
  DescribeInsightDetailsResponse,
  DescribeInsightDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInsightDetailsRequest,
  output: DescribeInsightDetailsResponse,
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
  operationName: "DescribeInsightDetails",
}));

export type DescribeInstanceTypeLimitsError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the instance count, storage, and master node limits for a given OpenSearch
 * or Elasticsearch version and instance type.
 */
export const describeInstanceTypeLimits: API.OperationMethod<
  DescribeInstanceTypeLimitsRequest,
  DescribeInstanceTypeLimitsResponse,
  DescribeInstanceTypeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInstanceTypeLimitsRequest,
  output: DescribeInstanceTypeLimitsResponse,
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
  operationName: "DescribeInstanceTypeLimits",
}));

export type DescribeOutboundConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the outbound cross-cluster connections for a local (source) Amazon
 * OpenSearch Service domain. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const describeOutboundConnections: API.PaginatedOperationMethod<
  DescribeOutboundConnectionsRequest,
  DescribeOutboundConnectionsResponse,
  DescribeOutboundConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOutboundConnectionsRequest,
  output: DescribeOutboundConnectionsResponse,
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOutboundConnections",
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
 * Describes all packages available to OpenSearch Service. For more information, see
 * Custom packages
 * for Amazon OpenSearch Service.
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

export type DescribeReservedInstanceOfferingsError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the available Amazon OpenSearch Service Reserved Instance offerings for a
 * given Region. For more information, see Reserved Instances in Amazon
 * OpenSearch Service.
 */
export const describeReservedInstanceOfferings: API.PaginatedOperationMethod<
  DescribeReservedInstanceOfferingsRequest,
  DescribeReservedInstanceOfferingsResponse,
  DescribeReservedInstanceOfferingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedInstanceOfferingsRequest,
  output: DescribeReservedInstanceOfferingsResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedInstanceOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedInstancesError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Amazon OpenSearch Service instances that you have reserved in a given
 * Region. For more information, see Reserved Instances in Amazon
 * OpenSearch Service.
 */
export const describeReservedInstances: API.PaginatedOperationMethod<
  DescribeReservedInstancesRequest,
  DescribeReservedInstancesResponse,
  DescribeReservedInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedInstancesRequest,
  output: DescribeReservedInstancesResponse,
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedInstances",
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

export type DetachDataSourceError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a data source from an OpenSearch application. The application must be in the `ACTIVE` state. This operation removes the data source saved object from the application and deletes the attachment record. Throws a `ConflictException` if the specified data source has a `PENDING` attachment, and a `ResourceNotFoundException` if the data source is not currently attached to the application.
 */
export const detachDataSource: API.OperationMethod<
  DetachDataSourceRequest,
  DetachDataSourceResponse,
  DetachDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachDataSourceRequest,
  output: DetachDataSourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachDataSource",
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
 * Removes a package from the specified Amazon OpenSearch Service domain. The package
 * can't be in use with any OpenSearch index for the dissociation to succeed. The package
 * is still available in OpenSearch Service for association later. For more information,
 * see Custom packages
 * for Amazon OpenSearch Service.
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

export type DissociatePackagesError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates multiple packages from a domain simultaneously.
 */
export const dissociatePackages: API.OperationMethod<
  DissociatePackagesRequest,
  DissociatePackagesResponse,
  DissociatePackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DissociatePackagesRequest,
  output: DissociatePackagesResponse,
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
  operationName: "DissociatePackages",
}));

export type GetApplicationError =
  | AccessDeniedException
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration and status of an existing OpenSearch application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetCapabilityError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a registered capability for an OpenSearch UI application, including its configuration and current status.
 */
export const getCapability: API.OperationMethod<
  GetCapabilityRequest,
  GetCapabilityResponse,
  GetCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapabilityRequest,
  output: GetCapabilityResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapability",
}));

export type GetCompatibleVersionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a map of OpenSearch or Elasticsearch versions and the versions you can upgrade
 * them to.
 */
export const getCompatibleVersions: API.OperationMethod<
  GetCompatibleVersionsRequest,
  GetCompatibleVersionsResponse,
  GetCompatibleVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCompatibleVersionsRequest,
  output: GetCompatibleVersionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCompatibleVersions",
}));

export type GetDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a direct query data source.
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
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetDefaultApplicationSettingError =
  | AccessDeniedException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the ARN of the current default application.
 *
 * If the default application isn't set, the operation returns a resource not found
 * error.
 */
export const getDefaultApplicationSetting: API.OperationMethod<
  GetDefaultApplicationSettingRequest,
  GetDefaultApplicationSettingResponse,
  GetDefaultApplicationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDefaultApplicationSettingRequest,
  output: GetDefaultApplicationSettingResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultApplicationSetting",
}));

export type GetDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed configuration information for a specific direct query data source in
 * Amazon OpenSearch Service.
 */
export const getDirectQueryDataSource: API.OperationMethod<
  GetDirectQueryDataSourceRequest,
  GetDirectQueryDataSourceResponse,
  GetDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDirectQueryDataSourceRequest,
  output: GetDirectQueryDataSourceResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDirectQueryDataSource",
}));

export type GetDomainMaintenanceStatusError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The status of the maintenance action.
 */
export const getDomainMaintenanceStatus: API.OperationMethod<
  GetDomainMaintenanceStatusRequest,
  GetDomainMaintenanceStatusResponse,
  GetDomainMaintenanceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainMaintenanceStatusRequest,
  output: GetDomainMaintenanceStatusResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainMaintenanceStatus",
}));

export type GetIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OpenSearch index including its schema and semantic enrichment configuration. Use this operation to view the current index structure and semantic search settings.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexRequest,
  output: GetIndexResponse,
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetPackageVersionHistoryError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Amazon OpenSearch Service package versions, along with their creation
 * time, commit message, and plugin properties (if the package is a zip plugin package). For more
 * information, see Custom packages for Amazon
 * OpenSearch Service.
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
 * Retrieves the complete history of the last 10 upgrades performed on an Amazon OpenSearch
 * Service domain.
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
 * Returns the most recent status of the last upgrade or upgrade eligibility check performed on
 * an Amazon OpenSearch Service domain.
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

export type ListApplicationsError =
  | AccessDeniedException
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OpenSearch applications under your account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ApplicationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceAttachmentsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all data source attachments for an OpenSearch application, including attachments in all states (`PENDING`, `ATTACHED`, and `FAILED`).
 */
export const listDataSourceAttachments: API.OperationMethod<
  ListDataSourceAttachmentsRequest,
  ListDataSourceAttachmentsResponse,
  ListDataSourceAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataSourceAttachmentsRequest,
  output: ListDataSourceAttachmentsResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSourceAttachments",
}));

export type ListDataSourcesError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists direct-query data sources for a specific domain. For more information, see For
 * more information, see Working with
 * Amazon OpenSearch Service direct queries with Amazon S3.
 */
export const listDataSources: API.OperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataSourcesRequest,
  output: ListDataSourcesResponse,
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
}));

export type ListDirectQueryDataSourcesError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists an inventory of all the direct query data sources that you have configured
 * within Amazon OpenSearch Service.
 */
export const listDirectQueryDataSources: API.OperationMethod<
  ListDirectQueryDataSourcesRequest,
  ListDirectQueryDataSourcesResponse,
  ListDirectQueryDataSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDirectQueryDataSourcesRequest,
  output: ListDirectQueryDataSourcesResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDirectQueryDataSources",
}));

export type ListDomainMaintenancesError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of maintenance actions for the domain.
 */
export const listDomainMaintenances: API.PaginatedOperationMethod<
  ListDomainMaintenancesRequest,
  ListDomainMaintenancesResponse,
  ListDomainMaintenancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainMaintenancesRequest,
  output: ListDomainMaintenancesResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainMaintenances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainNamesError =
  | BaseException
  | ValidationException
  | CommonErrors;
/**
 * Returns the names of all Amazon OpenSearch Service domains owned by the current user
 * in the active Region.
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
 * Lists all Amazon OpenSearch Service domains associated with a given package. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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

export type ListInsightsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists insights for an Amazon OpenSearch Service domain or Amazon Web Services account.
 * Returns a paginated list of insights based on the specified entity, filters, time range,
 * and sort order.
 */
export const listInsights: API.OperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListInsightsRequest,
  output: ListInsightsResponse,
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
  operationName: "ListInsights",
}));

export type ListInstanceTypeDetailsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all instance types and available features for a given OpenSearch or
 * Elasticsearch version.
 */
export const listInstanceTypeDetails: API.PaginatedOperationMethod<
  ListInstanceTypeDetailsRequest,
  ListInstanceTypeDetailsResponse,
  ListInstanceTypeDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceTypeDetailsRequest,
  output: ListInstanceTypeDetailsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceTypeDetails",
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
 * Lists all packages associated with an Amazon OpenSearch Service domain. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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

export type ListScheduledActionsError =
  | BaseException
  | InternalException
  | InvalidPaginationTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of configuration changes that are scheduled for a domain. These
 * changes can be service
 * software updates or blue/green Auto-Tune enhancements.
 */
export const listScheduledActions: API.PaginatedOperationMethod<
  ListScheduledActionsRequest,
  ListScheduledActionsResponse,
  ListScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScheduledActionsRequest,
  output: ListScheduledActionsResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidPaginationTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledActions",
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
 * Returns all resource tags for an Amazon OpenSearch Service domain, data source, or
 * application. For more information, see Tagging Amazon OpenSearch Service resources.
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

export type ListVersionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of OpenSearch and Elasticsearch that Amazon OpenSearch Service
 * supports.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about each Amazon Web Services principal that is allowed to
 * access a given Amazon OpenSearch Service domain through the use of an interface VPC
 * endpoint.
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
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints in the current Amazon Web Services account and Region.
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
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints associated with a
 * particular domain.
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

export type PurchaseReservedInstanceOfferingError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to purchase Amazon OpenSearch Service Reserved Instances.
 */
export const purchaseReservedInstanceOffering: API.OperationMethod<
  PurchaseReservedInstanceOfferingRequest,
  PurchaseReservedInstanceOfferingResponse,
  PurchaseReservedInstanceOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseReservedInstanceOfferingRequest,
  output: PurchaseReservedInstanceOfferingResponse,
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
  operationName: "PurchaseReservedInstanceOffering",
}));

export type PutDefaultApplicationSettingError =
  | AccessDeniedException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default application to the application with the specified ARN.
 *
 * To remove the default application, use the `GetDefaultApplicationSetting`
 * operation to get the current default and then call the
 * `PutDefaultApplicationSetting` with the current applications ARN and the
 * `setAsDefault` parameter set to `false`.
 */
export const putDefaultApplicationSetting: API.OperationMethod<
  PutDefaultApplicationSettingRequest,
  PutDefaultApplicationSettingResponse,
  PutDefaultApplicationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDefaultApplicationSettingRequest,
  output: PutDefaultApplicationSettingResponse,
  errors: [
    AccessDeniedException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultApplicationSetting",
}));

export type RegisterCapabilityError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers a capability for an OpenSearch UI application. Use this operation to enable specific capabilities, such as AI features, for a given application. The capability configuration defines the type and settings of the capability to register. For more information about the AI features, see Agentic AI for OpenSearch UI.
 */
export const registerCapability: API.OperationMethod<
  RegisterCapabilityRequest,
  RegisterCapabilityResponse,
  RegisterCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCapabilityRequest,
  output: RegisterCapabilityResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCapability",
}));

export type RejectInboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the remote Amazon OpenSearch Service domain owner to reject an inbound
 * cross-cluster connection request.
 */
export const rejectInboundConnection: API.OperationMethod<
  RejectInboundConnectionRequest,
  RejectInboundConnectionResponse,
  RejectInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectInboundConnectionRequest,
  output: RejectInboundConnectionResponse,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInboundConnection",
}));

export type RemoveTagsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified set of tags from an Amazon OpenSearch Service domain, data
 * source, or application. For more information, see Tagging Amazon OpenSearch Service resources.
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
 * Revokes access to an Amazon OpenSearch Service domain that was provided through an
 * interface VPC endpoint.
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

export type RollbackServiceSoftwareUpdateError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Rolls back a service software update for a domain to the previous version. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const rollbackServiceSoftwareUpdate: API.OperationMethod<
  RollbackServiceSoftwareUpdateRequest,
  RollbackServiceSoftwareUpdateResponse,
  RollbackServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackServiceSoftwareUpdateRequest,
  output: RollbackServiceSoftwareUpdateResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackServiceSoftwareUpdate",
}));

export type StartDomainMaintenanceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the node maintenance process on the data node. These processes can include a
 * node reboot, an Opensearch or Elasticsearch process restart, or a Dashboard or Kibana
 * restart.
 */
export const startDomainMaintenance: API.OperationMethod<
  StartDomainMaintenanceRequest,
  StartDomainMaintenanceResponse,
  StartDomainMaintenanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDomainMaintenanceRequest,
  output: StartDomainMaintenanceResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDomainMaintenance",
}));

export type StartServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Schedules a service software update for an Amazon OpenSearch Service domain. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const startServiceSoftwareUpdate: API.OperationMethod<
  StartServiceSoftwareUpdateRequest,
  StartServiceSoftwareUpdateResponse,
  StartServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartServiceSoftwareUpdateRequest,
  output: StartServiceSoftwareUpdateResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartServiceSoftwareUpdate",
}));

export type UpdateApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration and settings of an existing OpenSearch application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a direct-query data source. For more information, see Working
 * with Amazon OpenSearch Service data source integrations with Amazon
 * S3.
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
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
}));

export type UpdateDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration or properties of an existing direct query data source in
 * Amazon OpenSearch Service.
 */
export const updateDirectQueryDataSource: API.OperationMethod<
  UpdateDirectQueryDataSourceRequest,
  UpdateDirectQueryDataSourceResponse,
  UpdateDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDirectQueryDataSourceRequest,
  output: UpdateDirectQueryDataSourceResponse,
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
  operationName: "UpdateDirectQueryDataSource",
}));

export type UpdateDomainConfigError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the cluster configuration of the specified Amazon OpenSearch Service
 * domain.
 */
export const updateDomainConfig: API.OperationMethod<
  UpdateDomainConfigRequest,
  UpdateDomainConfigResponse,
  UpdateDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainConfigRequest,
  output: UpdateDomainConfigResponse,
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
  operationName: "UpdateDomainConfig",
}));

export type UpdateIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing OpenSearch index schema and semantic enrichment configuration. This operation allows modification of field mappings and semantic search settings for text fields. Changes to semantic enrichment configuration will apply to newly ingested documents.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIndexRequest,
  output: UpdateIndexResponse,
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndex",
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
 * Updates a package for use with Amazon OpenSearch Service domains. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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

export type UpdatePackageScopeError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the scope of a package. Scope of the package defines users who can view and
 * associate a package.
 */
export const updatePackageScope: API.OperationMethod<
  UpdatePackageScopeRequest,
  UpdatePackageScopeResponse,
  UpdatePackageScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageScopeRequest,
  output: UpdatePackageScopeResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageScope",
}));

export type UpdateScheduledActionError =
  | BaseException
  | ConflictException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | SlotNotAvailableException
  | ValidationException
  | CommonErrors;
/**
 * Reschedules a planned domain configuration change for a later time. This change can be
 * a scheduled service
 * software update or a blue/green Auto-Tune enhancement.
 */
export const updateScheduledAction: API.OperationMethod<
  UpdateScheduledActionRequest,
  UpdateScheduledActionResponse,
  UpdateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScheduledActionRequest,
  output: UpdateScheduledActionResponse,
  errors: [
    BaseException,
    ConflictException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    SlotNotAvailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAction",
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

export type UpgradeDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to either upgrade your Amazon OpenSearch Service domain or perform an
 * upgrade eligibility check to a compatible version of OpenSearch or Elasticsearch.
 */
export const upgradeDomain: API.OperationMethod<
  UpgradeDomainRequest,
  UpgradeDomainResponse,
  UpgradeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpgradeDomainRequest,
  output: UpgradeDomainResponse,
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
  operationName: "UpgradeDomain",
}));
