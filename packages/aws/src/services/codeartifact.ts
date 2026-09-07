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
  sdkId: "codeartifact",
  serviceShapeName: "CodeArtifactControlPlaneService",
});
const auth = T.AwsAuthSigv4({ name: "codeartifact" });
const ver = T.ServiceVersion("2018-09-22");
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
              `https://codeartifact-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codeartifact-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codeartifact.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resourceId: S.optional(S.String),
      resourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainName = string;
export type AccountId = string;
export type RepositoryName = string;
export type ExternalConnectionName = string;
export interface AssociateExternalConnectionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  externalConnection: string;
}
export const AssociateExternalConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    externalConnection: S.String.pipe(T.HttpQuery("external-connection")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/repository/external-connection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateExternalConnectionRequest",
}) as any as S.Schema<AssociateExternalConnectionRequest>;
export type Arn = string;
export type Description = string;
export interface UpstreamRepositoryInfo {
  repositoryName?: string;
}
export const UpstreamRepositoryInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.optional(S.String) }),
).annotate({
  identifier: "UpstreamRepositoryInfo",
}) as any as S.Schema<UpstreamRepositoryInfo>;
export type UpstreamRepositoryInfoList = UpstreamRepositoryInfo[];
export const UpstreamRepositoryInfoList = /*@__PURE__*/ S.Array(
  UpstreamRepositoryInfo,
);
export type PackageFormat =
  | "npm"
  | "pypi"
  | "maven"
  | "nuget"
  | "generic"
  | "ruby"
  | "swift"
  | "cargo"
  | (string & {});
export const PackageFormat = S.String;

export type ExternalConnectionStatus = "Available" | (string & {});
export const ExternalConnectionStatus = S.String;

export interface RepositoryExternalConnectionInfo {
  externalConnectionName?: string;
  packageFormat?: PackageFormat;
  status?: ExternalConnectionStatus;
}
export const RepositoryExternalConnectionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    externalConnectionName: S.optional(S.String),
    packageFormat: S.optional(PackageFormat),
    status: S.optional(ExternalConnectionStatus),
  }),
).annotate({
  identifier: "RepositoryExternalConnectionInfo",
}) as any as S.Schema<RepositoryExternalConnectionInfo>;
export type RepositoryExternalConnectionInfoList =
  RepositoryExternalConnectionInfo[];
export const RepositoryExternalConnectionInfoList = /*@__PURE__*/ S.Array(
  RepositoryExternalConnectionInfo,
);
export interface RepositoryDescription {
  name?: string;
  administratorAccount?: string;
  domainName?: string;
  domainOwner?: string;
  arn?: string;
  description?: string;
  upstreams?: UpstreamRepositoryInfo[];
  externalConnections?: RepositoryExternalConnectionInfo[];
  createdTime?: Date;
}
export const RepositoryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    administratorAccount: S.optional(S.String),
    domainName: S.optional(S.String),
    domainOwner: S.optional(S.String),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    upstreams: S.optional(UpstreamRepositoryInfoList),
    externalConnections: S.optional(RepositoryExternalConnectionInfoList),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "RepositoryDescription",
}) as any as S.Schema<RepositoryDescription>;
export interface AssociateExternalConnectionResult {
  repository?: RepositoryDescription;
}
export const AssociateExternalConnectionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "AssociateExternalConnectionResult",
}) as any as S.Schema<AssociateExternalConnectionResult>;
export type PackageNamespace = string;
export type PackageName = string;
export type PackageVersion = string;
export type PackageVersionList = string[];
export const PackageVersionList = /*@__PURE__*/ S.Array(S.String);
export type PackageVersionRevision = string;
export type PackageVersionRevisionMap = { [key: string]: string | undefined };
export const PackageVersionRevisionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CopyPackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  sourceRepository: string;
  destinationRepository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions?: string[];
  versionRevisions?: { [key: string]: string | undefined };
  allowOverwrite?: boolean;
  includeFromUpstream?: boolean;
}
export const CopyPackageVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    sourceRepository: S.String.pipe(T.HttpQuery("source-repository")),
    destinationRepository: S.String.pipe(T.HttpQuery("destination-repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    versions: S.optional(PackageVersionList),
    versionRevisions: S.optional(PackageVersionRevisionMap),
    allowOverwrite: S.optional(S.Boolean),
    includeFromUpstream: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/versions/copy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CopyPackageVersionsRequest",
}) as any as S.Schema<CopyPackageVersionsRequest>;
export type PackageVersionStatus =
  | "Published"
  | "Unfinished"
  | "Unlisted"
  | "Archived"
  | "Disposed"
  | "Deleted"
  | (string & {});
export const PackageVersionStatus = S.String;

export interface SuccessfulPackageVersionInfo {
  revision?: string;
  status?: PackageVersionStatus;
}
export const SuccessfulPackageVersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revision: S.optional(S.String),
    status: S.optional(PackageVersionStatus),
  }),
).annotate({
  identifier: "SuccessfulPackageVersionInfo",
}) as any as S.Schema<SuccessfulPackageVersionInfo>;
export type SuccessfulPackageVersionInfoMap = {
  [key: string]: SuccessfulPackageVersionInfo | undefined;
};
export const SuccessfulPackageVersionInfoMap = /*@__PURE__*/ S.Record(
  S.String,
  SuccessfulPackageVersionInfo.pipe(S.optional),
);
export type PackageVersionErrorCode =
  | "ALREADY_EXISTS"
  | "MISMATCHED_REVISION"
  | "MISMATCHED_STATUS"
  | "NOT_ALLOWED"
  | "NOT_FOUND"
  | "SKIPPED"
  | (string & {});
export const PackageVersionErrorCode = S.String;

export type ErrorMessage = string;
export interface PackageVersionError {
  errorCode?: PackageVersionErrorCode;
  errorMessage?: string;
}
export const PackageVersionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.optional(PackageVersionErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "PackageVersionError",
}) as any as S.Schema<PackageVersionError>;
export type PackageVersionErrorMap = {
  [key: string]: PackageVersionError | undefined;
};
export const PackageVersionErrorMap = /*@__PURE__*/ S.Record(
  S.String,
  PackageVersionError.pipe(S.optional),
);
export interface CopyPackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export const CopyPackageVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulVersions: S.optional(SuccessfulPackageVersionInfoMap),
    failedVersions: S.optional(PackageVersionErrorMap),
  }),
).annotate({
  identifier: "CopyPackageVersionsResult",
}) as any as S.Schema<CopyPackageVersionsResult>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateDomainRequest {
  domain: string;
  encryptionKey?: string;
  tags?: Tag[];
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    encryptionKey: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/domain" }),
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
export type DomainStatus = "Active" | "Deleted" | (string & {});
export const DomainStatus = S.String;

export interface DomainDescription {
  name?: string;
  owner?: string;
  arn?: string;
  status?: DomainStatus;
  createdTime?: Date;
  encryptionKey?: string;
  repositoryCount?: number;
  assetSizeBytes?: number;
  s3BucketArn?: string;
}
export const DomainDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    owner: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(DomainStatus),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    encryptionKey: S.optional(S.String),
    repositoryCount: S.optional(S.Number),
    assetSizeBytes: S.optional(S.Number),
    s3BucketArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainDescription",
}) as any as S.Schema<DomainDescription>;
export interface CreateDomainResult {
  domain?: DomainDescription;
}
export const CreateDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.optional(DomainDescription) }),
).annotate({
  identifier: "CreateDomainResult",
}) as any as S.Schema<CreateDomainResult>;
export type PackageGroupPattern = string;
export type PackageGroupContactInfo = string;
export interface CreatePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  contactInfo?: string;
  description?: string;
  tags?: Tag[];
}
export const CreatePackageGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String,
    contactInfo: S.optional(S.String),
    description: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageGroupRequest",
}) as any as S.Schema<CreatePackageGroupRequest>;
export type PackageGroupOriginRestrictionType =
  | "EXTERNAL_UPSTREAM"
  | "INTERNAL_UPSTREAM"
  | "PUBLISH"
  | (string & {});
export const PackageGroupOriginRestrictionType = S.String;

export type PackageGroupOriginRestrictionMode =
  | "ALLOW"
  | "ALLOW_SPECIFIC_REPOSITORIES"
  | "BLOCK"
  | "INHERIT"
  | (string & {});
export const PackageGroupOriginRestrictionMode = S.String;

export interface PackageGroupReference {
  arn?: string;
  pattern?: string;
}
export const PackageGroupReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), pattern: S.optional(S.String) }),
).annotate({
  identifier: "PackageGroupReference",
}) as any as S.Schema<PackageGroupReference>;
export interface PackageGroupOriginRestriction {
  mode?: PackageGroupOriginRestrictionMode;
  effectiveMode?: PackageGroupOriginRestrictionMode;
  inheritedFrom?: PackageGroupReference;
  repositoriesCount?: number;
}
export const PackageGroupOriginRestriction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mode: S.optional(PackageGroupOriginRestrictionMode),
    effectiveMode: S.optional(PackageGroupOriginRestrictionMode),
    inheritedFrom: S.optional(PackageGroupReference),
    repositoriesCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "PackageGroupOriginRestriction",
}) as any as S.Schema<PackageGroupOriginRestriction>;
export type PackageGroupOriginRestrictions = {
  [key in PackageGroupOriginRestrictionType]?: PackageGroupOriginRestriction;
};
export const PackageGroupOriginRestrictions = /*@__PURE__*/ S.Record(
  PackageGroupOriginRestrictionType,
  PackageGroupOriginRestriction.pipe(S.optional),
);
export interface PackageGroupOriginConfiguration {
  restrictions?: { [key: string]: PackageGroupOriginRestriction | undefined };
}
export const PackageGroupOriginConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ restrictions: S.optional(PackageGroupOriginRestrictions) }),
).annotate({
  identifier: "PackageGroupOriginConfiguration",
}) as any as S.Schema<PackageGroupOriginConfiguration>;
export interface PackageGroupDescription {
  arn?: string;
  pattern?: string;
  domainName?: string;
  domainOwner?: string;
  createdTime?: Date;
  contactInfo?: string;
  description?: string;
  originConfiguration?: PackageGroupOriginConfiguration;
  parent?: PackageGroupReference;
}
export const PackageGroupDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    pattern: S.optional(S.String),
    domainName: S.optional(S.String),
    domainOwner: S.optional(S.String),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    contactInfo: S.optional(S.String),
    description: S.optional(S.String),
    originConfiguration: S.optional(PackageGroupOriginConfiguration),
    parent: S.optional(PackageGroupReference),
  }),
).annotate({
  identifier: "PackageGroupDescription",
}) as any as S.Schema<PackageGroupDescription>;
export interface CreatePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export const CreatePackageGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageGroup: S.optional(PackageGroupDescription) }),
).annotate({
  identifier: "CreatePackageGroupResult",
}) as any as S.Schema<CreatePackageGroupResult>;
export interface UpstreamRepository {
  repositoryName: string;
}
export const UpstreamRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String }),
).annotate({
  identifier: "UpstreamRepository",
}) as any as S.Schema<UpstreamRepository>;
export type UpstreamRepositoryList = UpstreamRepository[];
export const UpstreamRepositoryList = /*@__PURE__*/ S.Array(UpstreamRepository);
export interface CreateRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  description?: string;
  upstreams?: UpstreamRepository[];
  tags?: Tag[];
}
export const CreateRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    description: S.optional(S.String),
    upstreams: S.optional(UpstreamRepositoryList),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/repository" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRepositoryRequest",
}) as any as S.Schema<CreateRepositoryRequest>;
export interface CreateRepositoryResult {
  repository?: RepositoryDescription;
}
export const CreateRepositoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "CreateRepositoryResult",
}) as any as S.Schema<CreateRepositoryResult>;
export interface DeleteDomainRequest {
  domain: string;
  domainOwner?: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/domain" }),
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
export interface DeleteDomainResult {
  domain?: DomainDescription;
}
export const DeleteDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.optional(DomainDescription) }),
).annotate({
  identifier: "DeleteDomainResult",
}) as any as S.Schema<DeleteDomainResult>;
export type PolicyRevision = string;
export interface DeleteDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  policyRevision?: string;
}
export const DeleteDomainPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      policyRevision: S.optional(S.String).pipe(T.HttpQuery("policy-revision")),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/v1/domain/permissions/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteDomainPermissionsPolicyRequest",
}) as any as S.Schema<DeleteDomainPermissionsPolicyRequest>;
export type PolicyDocument = string;
export interface ResourcePolicy {
  resourceArn?: string;
  revision?: string;
  document?: string;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    revision: S.optional(S.String),
    document: S.optional(S.String),
  }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export interface DeleteDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const DeleteDomainPermissionsPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "DeleteDomainPermissionsPolicyResult",
}) as any as S.Schema<DeleteDomainPermissionsPolicyResult>;
export interface DeletePackageRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export const DeletePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/package" }),
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
export type AllowPublish = "ALLOW" | "BLOCK" | (string & {});
export const AllowPublish = S.String;

export type AllowUpstream = "ALLOW" | "BLOCK" | (string & {});
export const AllowUpstream = S.String;

export interface PackageOriginRestrictions {
  publish: AllowPublish;
  upstream: AllowUpstream;
}
export const PackageOriginRestrictions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ publish: AllowPublish, upstream: AllowUpstream }),
).annotate({
  identifier: "PackageOriginRestrictions",
}) as any as S.Schema<PackageOriginRestrictions>;
export interface PackageOriginConfiguration {
  restrictions?: PackageOriginRestrictions;
}
export const PackageOriginConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ restrictions: S.optional(PackageOriginRestrictions) }),
).annotate({
  identifier: "PackageOriginConfiguration",
}) as any as S.Schema<PackageOriginConfiguration>;
export interface PackageSummary {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  originConfiguration?: PackageOriginConfiguration;
}
export const PackageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    originConfiguration: S.optional(PackageOriginConfiguration),
  }),
).annotate({ identifier: "PackageSummary" }) as any as S.Schema<PackageSummary>;
export interface DeletePackageResult {
  deletedPackage?: PackageSummary;
}
export const DeletePackageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deletedPackage: S.optional(PackageSummary) }),
).annotate({
  identifier: "DeletePackageResult",
}) as any as S.Schema<DeletePackageResult>;
export interface DeletePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
}
export const DeletePackageGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String.pipe(T.HttpQuery("package-group")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/package-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageGroupRequest",
}) as any as S.Schema<DeletePackageGroupRequest>;
export interface DeletePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export const DeletePackageGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageGroup: S.optional(PackageGroupDescription) }),
).annotate({
  identifier: "DeletePackageGroupResult",
}) as any as S.Schema<DeletePackageGroupResult>;
export interface DeletePackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  expectedStatus?: PackageVersionStatus;
}
export const DeletePackageVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    versions: PackageVersionList,
    expectedStatus: S.optional(PackageVersionStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/versions/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageVersionsRequest",
}) as any as S.Schema<DeletePackageVersionsRequest>;
export interface DeletePackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export const DeletePackageVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulVersions: S.optional(SuccessfulPackageVersionInfoMap),
    failedVersions: S.optional(PackageVersionErrorMap),
  }),
).annotate({
  identifier: "DeletePackageVersionsResult",
}) as any as S.Schema<DeletePackageVersionsResult>;
export interface DeleteRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export const DeleteRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/repository" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRepositoryRequest",
}) as any as S.Schema<DeleteRepositoryRequest>;
export interface DeleteRepositoryResult {
  repository?: RepositoryDescription;
}
export const DeleteRepositoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "DeleteRepositoryResult",
}) as any as S.Schema<DeleteRepositoryResult>;
export interface DeleteRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  policyRevision?: string;
}
export const DeleteRepositoryPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
      policyRevision: S.optional(S.String).pipe(T.HttpQuery("policy-revision")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v1/repository/permissions/policies",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteRepositoryPermissionsPolicyRequest",
}) as any as S.Schema<DeleteRepositoryPermissionsPolicyRequest>;
export interface DeleteRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const DeleteRepositoryPermissionsPolicyResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "DeleteRepositoryPermissionsPolicyResult",
}) as any as S.Schema<DeleteRepositoryPermissionsPolicyResult>;
export interface DescribeDomainRequest {
  domain: string;
  domainOwner?: string;
}
export const DescribeDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/domain" }),
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
export interface DescribeDomainResult {
  domain?: DomainDescription;
}
export const DescribeDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domain: S.optional(DomainDescription) }),
).annotate({
  identifier: "DescribeDomainResult",
}) as any as S.Schema<DescribeDomainResult>;
export interface DescribePackageRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export const DescribePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/package" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageRequest",
}) as any as S.Schema<DescribePackageRequest>;
export interface PackageDescription {
  format?: PackageFormat;
  namespace?: string;
  name?: string;
  originConfiguration?: PackageOriginConfiguration;
}
export const PackageDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    name: S.optional(S.String),
    originConfiguration: S.optional(PackageOriginConfiguration),
  }),
).annotate({
  identifier: "PackageDescription",
}) as any as S.Schema<PackageDescription>;
export interface DescribePackageResult {
  package: PackageDescription;
}
export const DescribePackageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ package: PackageDescription }),
).annotate({
  identifier: "DescribePackageResult",
}) as any as S.Schema<DescribePackageResult>;
export interface DescribePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
}
export const DescribePackageGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String.pipe(T.HttpQuery("package-group")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/package-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageGroupRequest",
}) as any as S.Schema<DescribePackageGroupRequest>;
export interface DescribePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export const DescribePackageGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageGroup: S.optional(PackageGroupDescription) }),
).annotate({
  identifier: "DescribePackageGroupResult",
}) as any as S.Schema<DescribePackageGroupResult>;
export interface DescribePackageVersionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
}
export const DescribePackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    packageVersion: S.String.pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/package/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageVersionRequest",
}) as any as S.Schema<DescribePackageVersionRequest>;
export type String255 = string;
export interface LicenseInfo {
  name?: string;
  url?: string;
}
export const LicenseInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), url: S.optional(S.String) }),
).annotate({ identifier: "LicenseInfo" }) as any as S.Schema<LicenseInfo>;
export type LicenseInfoList = LicenseInfo[];
export const LicenseInfoList = /*@__PURE__*/ S.Array(LicenseInfo);
export interface DomainEntryPoint {
  repositoryName?: string;
  externalConnectionName?: string;
}
export const DomainEntryPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    externalConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "DomainEntryPoint",
}) as any as S.Schema<DomainEntryPoint>;
export type PackageVersionOriginType =
  | "INTERNAL"
  | "EXTERNAL"
  | "UNKNOWN"
  | (string & {});
export const PackageVersionOriginType = S.String;

export interface PackageVersionOrigin {
  domainEntryPoint?: DomainEntryPoint;
  originType?: PackageVersionOriginType;
}
export const PackageVersionOrigin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainEntryPoint: S.optional(DomainEntryPoint),
    originType: S.optional(PackageVersionOriginType),
  }),
).annotate({
  identifier: "PackageVersionOrigin",
}) as any as S.Schema<PackageVersionOrigin>;
export interface PackageVersionDescription {
  format?: PackageFormat;
  namespace?: string;
  packageName?: string;
  displayName?: string;
  version?: string;
  summary?: string;
  homePage?: string;
  sourceCodeRepository?: string;
  publishedTime?: Date;
  licenses?: LicenseInfo[];
  revision?: string;
  status?: PackageVersionStatus;
  origin?: PackageVersionOrigin;
}
export const PackageVersionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    packageName: S.optional(S.String),
    displayName: S.optional(S.String),
    version: S.optional(S.String),
    summary: S.optional(S.String),
    homePage: S.optional(S.String),
    sourceCodeRepository: S.optional(S.String),
    publishedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    licenses: S.optional(LicenseInfoList),
    revision: S.optional(S.String),
    status: S.optional(PackageVersionStatus),
    origin: S.optional(PackageVersionOrigin),
  }),
).annotate({
  identifier: "PackageVersionDescription",
}) as any as S.Schema<PackageVersionDescription>;
export interface DescribePackageVersionResult {
  packageVersion: PackageVersionDescription;
}
export const DescribePackageVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageVersion: PackageVersionDescription }),
).annotate({
  identifier: "DescribePackageVersionResult",
}) as any as S.Schema<DescribePackageVersionResult>;
export interface DescribeRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export const DescribeRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/repository" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRepositoryRequest",
}) as any as S.Schema<DescribeRepositoryRequest>;
export interface DescribeRepositoryResult {
  repository?: RepositoryDescription;
}
export const DescribeRepositoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "DescribeRepositoryResult",
}) as any as S.Schema<DescribeRepositoryResult>;
export interface DisassociateExternalConnectionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  externalConnection: string;
}
export const DisassociateExternalConnectionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
      externalConnection: S.String.pipe(T.HttpQuery("external-connection")),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/v1/repository/external-connection" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateExternalConnectionRequest",
}) as any as S.Schema<DisassociateExternalConnectionRequest>;
export interface DisassociateExternalConnectionResult {
  repository?: RepositoryDescription;
}
export const DisassociateExternalConnectionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "DisassociateExternalConnectionResult",
}) as any as S.Schema<DisassociateExternalConnectionResult>;
export interface DisposePackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  versionRevisions?: { [key: string]: string | undefined };
  expectedStatus?: PackageVersionStatus;
}
export const DisposePackageVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    versions: PackageVersionList,
    versionRevisions: S.optional(PackageVersionRevisionMap),
    expectedStatus: S.optional(PackageVersionStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/versions/dispose" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisposePackageVersionsRequest",
}) as any as S.Schema<DisposePackageVersionsRequest>;
export interface DisposePackageVersionsResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export const DisposePackageVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulVersions: S.optional(SuccessfulPackageVersionInfoMap),
    failedVersions: S.optional(PackageVersionErrorMap),
  }),
).annotate({
  identifier: "DisposePackageVersionsResult",
}) as any as S.Schema<DisposePackageVersionsResult>;
export interface GetAssociatedPackageGroupRequest {
  domain: string;
  domainOwner?: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
}
export const GetAssociatedPackageGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/get-associated-package-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssociatedPackageGroupRequest",
}) as any as S.Schema<GetAssociatedPackageGroupRequest>;
export type PackageGroupAssociationType = "STRONG" | "WEAK" | (string & {});
export const PackageGroupAssociationType = S.String;

export interface GetAssociatedPackageGroupResult {
  packageGroup?: PackageGroupDescription;
  associationType?: PackageGroupAssociationType;
}
export const GetAssociatedPackageGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageGroup: S.optional(PackageGroupDescription),
    associationType: S.optional(PackageGroupAssociationType),
  }),
).annotate({
  identifier: "GetAssociatedPackageGroupResult",
}) as any as S.Schema<GetAssociatedPackageGroupResult>;
export type AuthorizationTokenDurationSeconds = number;
export interface GetAuthorizationTokenRequest {
  domain: string;
  domainOwner?: string;
  durationSeconds?: number;
}
export const GetAuthorizationTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    durationSeconds: S.optional(S.Number).pipe(T.HttpQuery("duration")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/authorization-token" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizationTokenRequest",
}) as any as S.Schema<GetAuthorizationTokenRequest>;
export interface GetAuthorizationTokenResult {
  authorizationToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export const GetAuthorizationTokenResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationToken: S.optional(SensitiveString),
    expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetAuthorizationTokenResult",
}) as any as S.Schema<GetAuthorizationTokenResult>;
export interface GetDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
}
export const GetDomainPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/domain/permissions/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainPermissionsPolicyRequest",
}) as any as S.Schema<GetDomainPermissionsPolicyRequest>;
export interface GetDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const GetDomainPermissionsPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "GetDomainPermissionsPolicyResult",
}) as any as S.Schema<GetDomainPermissionsPolicyResult>;
export type AssetName = string;
export interface GetPackageVersionAssetRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  asset: string;
  packageVersionRevision?: string;
}
export const GetPackageVersionAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    packageVersion: S.String.pipe(T.HttpQuery("version")),
    asset: S.String.pipe(T.HttpQuery("asset")),
    packageVersionRevision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/package/version/asset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageVersionAssetRequest",
}) as any as S.Schema<GetPackageVersionAssetRequest>;
export interface GetPackageVersionAssetResult {
  asset?: T.StreamingOutputBody;
  assetName?: string;
  packageVersion?: string;
  packageVersionRevision?: string;
}
export const GetPackageVersionAssetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    asset: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    assetName: S.optional(S.String).pipe(T.HttpHeader("X-AssetName")),
    packageVersion: S.optional(S.String).pipe(T.HttpHeader("X-PackageVersion")),
    packageVersionRevision: S.optional(S.String).pipe(
      T.HttpHeader("X-PackageVersionRevision"),
    ),
  }),
).annotate({
  identifier: "GetPackageVersionAssetResult",
}) as any as S.Schema<GetPackageVersionAssetResult>;
export interface GetPackageVersionReadmeRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
}
export const GetPackageVersionReadmeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    packageVersion: S.String.pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/package/version/readme" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageVersionReadmeRequest",
}) as any as S.Schema<GetPackageVersionReadmeRequest>;
export interface GetPackageVersionReadmeResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  readme?: string;
}
export const GetPackageVersionReadmeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    version: S.optional(S.String),
    versionRevision: S.optional(S.String),
    readme: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPackageVersionReadmeResult",
}) as any as S.Schema<GetPackageVersionReadmeResult>;
export type EndpointType = "dualstack" | "ipv4" | (string & {});
export const EndpointType = S.String;

export interface GetRepositoryEndpointRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  endpointType?: EndpointType;
}
export const GetRepositoryEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    endpointType: S.optional(EndpointType).pipe(T.HttpQuery("endpointType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/repository/endpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRepositoryEndpointRequest",
}) as any as S.Schema<GetRepositoryEndpointRequest>;
export interface GetRepositoryEndpointResult {
  repositoryEndpoint?: string;
}
export const GetRepositoryEndpointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryEndpoint: S.optional(S.String) }),
).annotate({
  identifier: "GetRepositoryEndpointResult",
}) as any as S.Schema<GetRepositoryEndpointResult>;
export interface GetRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
}
export const GetRepositoryPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/repository/permissions/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRepositoryPermissionsPolicyRequest",
}) as any as S.Schema<GetRepositoryPermissionsPolicyRequest>;
export interface GetRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const GetRepositoryPermissionsPolicyResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "GetRepositoryPermissionsPolicyResult",
}) as any as S.Schema<GetRepositoryPermissionsPolicyResult>;
export type ListAllowedRepositoriesForGroupMaxResults = number;
export type PaginationToken = string;
export interface ListAllowedRepositoriesForGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  originRestrictionType: PackageGroupOriginRestrictionType;
  maxResults?: number;
  nextToken?: string;
}
export const ListAllowedRepositoriesForGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      packageGroup: S.String.pipe(T.HttpQuery("package-group")),
      originRestrictionType: PackageGroupOriginRestrictionType.pipe(
        T.HttpQuery("originRestrictionType"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/package-group-allowed-repositories",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAllowedRepositoriesForGroupRequest",
}) as any as S.Schema<ListAllowedRepositoriesForGroupRequest>;
export type RepositoryNameList = string[];
export const RepositoryNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListAllowedRepositoriesForGroupResult {
  allowedRepositories?: string[];
  nextToken?: string;
}
export const ListAllowedRepositoriesForGroupResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      allowedRepositories: S.optional(RepositoryNameList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAllowedRepositoriesForGroupResult",
}) as any as S.Schema<ListAllowedRepositoriesForGroupResult>;
export type ListPackagesMaxResults = number;
export interface ListAssociatedPackagesRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  maxResults?: number;
  nextToken?: string;
  preview?: boolean;
}
export const ListAssociatedPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String.pipe(T.HttpQuery("package-group")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    preview: S.optional(S.Boolean).pipe(T.HttpQuery("preview")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/list-associated-packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedPackagesRequest",
}) as any as S.Schema<ListAssociatedPackagesRequest>;
export interface AssociatedPackage {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  associationType?: PackageGroupAssociationType;
}
export const AssociatedPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    associationType: S.optional(PackageGroupAssociationType),
  }),
).annotate({
  identifier: "AssociatedPackage",
}) as any as S.Schema<AssociatedPackage>;
export type AssociatedPackageList = AssociatedPackage[];
export const AssociatedPackageList = /*@__PURE__*/ S.Array(AssociatedPackage);
export interface ListAssociatedPackagesResult {
  packages?: AssociatedPackage[];
  nextToken?: string;
}
export const ListAssociatedPackagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packages: S.optional(AssociatedPackageList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedPackagesResult",
}) as any as S.Schema<ListAssociatedPackagesResult>;
export type ListDomainsMaxResults = number;
export interface ListDomainsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsRequest",
}) as any as S.Schema<ListDomainsRequest>;
export interface DomainSummary {
  name?: string;
  owner?: string;
  arn?: string;
  status?: DomainStatus;
  createdTime?: Date;
  encryptionKey?: string;
}
export const DomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    owner: S.optional(S.String),
    arn: S.optional(S.String),
    status: S.optional(DomainStatus),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    encryptionKey: S.optional(S.String),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaryList = DomainSummary[];
export const DomainSummaryList = /*@__PURE__*/ S.Array(DomainSummary);
export interface ListDomainsResult {
  domains?: DomainSummary[];
  nextToken?: string;
}
export const ListDomainsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domains: S.optional(DomainSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDomainsResult",
}) as any as S.Schema<ListDomainsResult>;
export type ListPackageGroupsMaxResults = number;
export type PackageGroupPatternPrefix = string;
export interface ListPackageGroupsRequest {
  domain: string;
  domainOwner?: string;
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export const ListPackageGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackageGroupsRequest",
}) as any as S.Schema<ListPackageGroupsRequest>;
export interface PackageGroupSummary {
  arn?: string;
  pattern?: string;
  domainName?: string;
  domainOwner?: string;
  createdTime?: Date;
  contactInfo?: string;
  description?: string;
  originConfiguration?: PackageGroupOriginConfiguration;
  parent?: PackageGroupReference;
}
export const PackageGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    pattern: S.optional(S.String),
    domainName: S.optional(S.String),
    domainOwner: S.optional(S.String),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    contactInfo: S.optional(S.String),
    description: S.optional(S.String),
    originConfiguration: S.optional(PackageGroupOriginConfiguration),
    parent: S.optional(PackageGroupReference),
  }),
).annotate({
  identifier: "PackageGroupSummary",
}) as any as S.Schema<PackageGroupSummary>;
export type PackageGroupSummaryList = PackageGroupSummary[];
export const PackageGroupSummaryList =
  /*@__PURE__*/ S.Array(PackageGroupSummary);
export interface ListPackageGroupsResult {
  packageGroups?: PackageGroupSummary[];
  nextToken?: string;
}
export const ListPackageGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageGroups: S.optional(PackageGroupSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackageGroupsResult",
}) as any as S.Schema<ListPackageGroupsResult>;
export interface ListPackagesRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format?: PackageFormat;
  namespace?: string;
  packagePrefix?: string;
  maxResults?: number;
  nextToken?: string;
  publish?: AllowPublish;
  upstream?: AllowUpstream;
}
export const ListPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: S.optional(PackageFormat).pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    packagePrefix: S.optional(S.String).pipe(T.HttpQuery("package-prefix")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    publish: S.optional(AllowPublish).pipe(T.HttpQuery("publish")),
    upstream: S.optional(AllowUpstream).pipe(T.HttpQuery("upstream")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagesRequest",
}) as any as S.Schema<ListPackagesRequest>;
export type PackageSummaryList = PackageSummary[];
export const PackageSummaryList = /*@__PURE__*/ S.Array(PackageSummary);
export interface ListPackagesResult {
  packages?: PackageSummary[];
  nextToken?: string;
}
export const ListPackagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packages: S.optional(PackageSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackagesResult",
}) as any as S.Schema<ListPackagesResult>;
export type ListPackageVersionAssetsMaxResults = number;
export interface ListPackageVersionAssetsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPackageVersionAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    packageVersion: S.String.pipe(T.HttpQuery("version")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/version/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackageVersionAssetsRequest",
}) as any as S.Schema<ListPackageVersionAssetsRequest>;
export type HashAlgorithm =
  | "MD5"
  | "SHA-1"
  | "SHA-256"
  | "SHA-512"
  | (string & {});
export const HashAlgorithm = S.String;

export type HashValue = string;
export type AssetHashes = { [key in HashAlgorithm]?: string };
export const AssetHashes = /*@__PURE__*/ S.Record(
  HashAlgorithm,
  S.String.pipe(S.optional),
);
export interface AssetSummary {
  name: string;
  size?: number;
  hashes?: { [key: string]: string | undefined };
}
export const AssetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    size: S.optional(S.Number),
    hashes: S.optional(AssetHashes),
  }),
).annotate({ identifier: "AssetSummary" }) as any as S.Schema<AssetSummary>;
export type AssetSummaryList = AssetSummary[];
export const AssetSummaryList = /*@__PURE__*/ S.Array(AssetSummary);
export interface ListPackageVersionAssetsResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  nextToken?: string;
  assets?: AssetSummary[];
}
export const ListPackageVersionAssetsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    version: S.optional(S.String),
    versionRevision: S.optional(S.String),
    nextToken: S.optional(S.String),
    assets: S.optional(AssetSummaryList),
  }),
).annotate({
  identifier: "ListPackageVersionAssetsResult",
}) as any as S.Schema<ListPackageVersionAssetsResult>;
export interface ListPackageVersionDependenciesRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  nextToken?: string;
}
export const ListPackageVersionDependenciesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
      format: PackageFormat.pipe(T.HttpQuery("format")),
      namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
      package: S.String.pipe(T.HttpQuery("package")),
      packageVersion: S.String.pipe(T.HttpQuery("version")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/package/version/dependencies" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPackageVersionDependenciesRequest",
}) as any as S.Schema<ListPackageVersionDependenciesRequest>;
export interface PackageDependency {
  namespace?: string;
  package?: string;
  dependencyType?: string;
  versionRequirement?: string;
}
export const PackageDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    dependencyType: S.optional(S.String),
    versionRequirement: S.optional(S.String),
  }),
).annotate({
  identifier: "PackageDependency",
}) as any as S.Schema<PackageDependency>;
export type PackageDependencyList = PackageDependency[];
export const PackageDependencyList = /*@__PURE__*/ S.Array(PackageDependency);
export interface ListPackageVersionDependenciesResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  nextToken?: string;
  dependencies?: PackageDependency[];
}
export const ListPackageVersionDependenciesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      format: S.optional(PackageFormat),
      namespace: S.optional(S.String),
      package: S.optional(S.String),
      version: S.optional(S.String),
      versionRevision: S.optional(S.String),
      nextToken: S.optional(S.String),
      dependencies: S.optional(PackageDependencyList),
    }),
).annotate({
  identifier: "ListPackageVersionDependenciesResult",
}) as any as S.Schema<ListPackageVersionDependenciesResult>;
export type PackageVersionSortType = "PUBLISHED_TIME" | (string & {});
export const PackageVersionSortType = S.String;

export type ListPackageVersionsMaxResults = number;
export interface ListPackageVersionsRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  status?: PackageVersionStatus;
  sortBy?: PackageVersionSortType;
  maxResults?: number;
  nextToken?: string;
  originType?: PackageVersionOriginType;
}
export const ListPackageVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    status: S.optional(PackageVersionStatus).pipe(T.HttpQuery("status")),
    sortBy: S.optional(PackageVersionSortType).pipe(T.HttpQuery("sortBy")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    originType: S.optional(PackageVersionOriginType).pipe(
      T.HttpQuery("originType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackageVersionsRequest",
}) as any as S.Schema<ListPackageVersionsRequest>;
export interface PackageVersionSummary {
  version: string;
  revision?: string;
  status: PackageVersionStatus;
  origin?: PackageVersionOrigin;
}
export const PackageVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    revision: S.optional(S.String),
    status: PackageVersionStatus,
    origin: S.optional(PackageVersionOrigin),
  }),
).annotate({
  identifier: "PackageVersionSummary",
}) as any as S.Schema<PackageVersionSummary>;
export type PackageVersionSummaryList = PackageVersionSummary[];
export const PackageVersionSummaryList = /*@__PURE__*/ S.Array(
  PackageVersionSummary,
);
export interface ListPackageVersionsResult {
  defaultDisplayVersion?: string;
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  versions?: PackageVersionSummary[];
  nextToken?: string;
}
export const ListPackageVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultDisplayVersion: S.optional(S.String),
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    versions: S.optional(PackageVersionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackageVersionsResult",
}) as any as S.Schema<ListPackageVersionsResult>;
export type ListRepositoriesMaxResults = number;
export interface ListRepositoriesRequest {
  repositoryPrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRepositoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryPrefix: S.optional(S.String).pipe(
      T.HttpQuery("repository-prefix"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/repositories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRepositoriesRequest",
}) as any as S.Schema<ListRepositoriesRequest>;
export interface RepositorySummary {
  name?: string;
  administratorAccount?: string;
  domainName?: string;
  domainOwner?: string;
  arn?: string;
  description?: string;
  createdTime?: Date;
}
export const RepositorySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    administratorAccount: S.optional(S.String),
    domainName: S.optional(S.String),
    domainOwner: S.optional(S.String),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    createdTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "RepositorySummary",
}) as any as S.Schema<RepositorySummary>;
export type RepositorySummaryList = RepositorySummary[];
export const RepositorySummaryList = /*@__PURE__*/ S.Array(RepositorySummary);
export interface ListRepositoriesResult {
  repositories?: RepositorySummary[];
  nextToken?: string;
}
export const ListRepositoriesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositorySummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRepositoriesResult",
}) as any as S.Schema<ListRepositoriesResult>;
export type ListRepositoriesInDomainMaxResults = number;
export interface ListRepositoriesInDomainRequest {
  domain: string;
  domainOwner?: string;
  administratorAccount?: string;
  repositoryPrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRepositoriesInDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    administratorAccount: S.optional(S.String).pipe(
      T.HttpQuery("administrator-account"),
    ),
    repositoryPrefix: S.optional(S.String).pipe(
      T.HttpQuery("repository-prefix"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/domain/repositories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRepositoriesInDomainRequest",
}) as any as S.Schema<ListRepositoriesInDomainRequest>;
export interface ListRepositoriesInDomainResult {
  repositories?: RepositorySummary[];
  nextToken?: string;
}
export const ListRepositoriesInDomainResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositorySummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRepositoriesInDomainResult",
}) as any as S.Schema<ListRepositoriesInDomainResult>;
export interface ListSubPackageGroupsRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubPackageGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String.pipe(T.HttpQuery("package-group")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package-groups/sub-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubPackageGroupsRequest",
}) as any as S.Schema<ListSubPackageGroupsRequest>;
export interface ListSubPackageGroupsResult {
  packageGroups?: PackageGroupSummary[];
  nextToken?: string;
}
export const ListSubPackageGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageGroups: S.optional(PackageGroupSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubPackageGroupsResult",
}) as any as S.Schema<ListSubPackageGroupsResult>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags" }),
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
export interface ListTagsForResourceResult {
  tags?: Tag[];
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export type SHA256 = string;
export interface PublishPackageVersionRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  packageVersion: string;
  assetContent: T.StreamingInputBody;
  assetName: string;
  assetSHA256: string;
  unfinished?: boolean;
}
export const PublishPackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    packageVersion: S.String.pipe(T.HttpQuery("version")),
    assetContent: T.StreamingInput.pipe(T.HttpPayload()),
    assetName: S.String.pipe(T.HttpQuery("asset")),
    assetSHA256: S.String.pipe(T.HttpHeader("x-amz-content-sha256")),
    unfinished: S.optional(S.Boolean).pipe(T.HttpQuery("unfinished")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/version/publish" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishPackageVersionRequest",
}) as any as S.Schema<PublishPackageVersionRequest>;
export interface PublishPackageVersionResult {
  format?: PackageFormat;
  namespace?: string;
  package?: string;
  version?: string;
  versionRevision?: string;
  status?: PackageVersionStatus;
  asset?: AssetSummary;
}
export const PublishPackageVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(PackageFormat),
    namespace: S.optional(S.String),
    package: S.optional(S.String),
    version: S.optional(S.String),
    versionRevision: S.optional(S.String),
    status: S.optional(PackageVersionStatus),
    asset: S.optional(AssetSummary),
  }),
).annotate({
  identifier: "PublishPackageVersionResult",
}) as any as S.Schema<PublishPackageVersionResult>;
export interface PutDomainPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  policyRevision?: string;
  policyDocument: string;
}
export const PutDomainPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String,
    domainOwner: S.optional(S.String),
    policyRevision: S.optional(S.String),
    policyDocument: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/domain/permissions/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDomainPermissionsPolicyRequest",
}) as any as S.Schema<PutDomainPermissionsPolicyRequest>;
export interface PutDomainPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const PutDomainPermissionsPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "PutDomainPermissionsPolicyResult",
}) as any as S.Schema<PutDomainPermissionsPolicyResult>;
export interface PutPackageOriginConfigurationRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  restrictions: PackageOriginRestrictions;
}
export const PutPackageOriginConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
      format: PackageFormat.pipe(T.HttpQuery("format")),
      namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
      package: S.String.pipe(T.HttpQuery("package")),
      restrictions: PackageOriginRestrictions,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/package" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutPackageOriginConfigurationRequest",
}) as any as S.Schema<PutPackageOriginConfigurationRequest>;
export interface PutPackageOriginConfigurationResult {
  originConfiguration?: PackageOriginConfiguration;
}
export const PutPackageOriginConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ originConfiguration: S.optional(PackageOriginConfiguration) }),
).annotate({
  identifier: "PutPackageOriginConfigurationResult",
}) as any as S.Schema<PutPackageOriginConfigurationResult>;
export interface PutRepositoryPermissionsPolicyRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  policyRevision?: string;
  policyDocument: string;
}
export const PutRepositoryPermissionsPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      repository: S.String.pipe(T.HttpQuery("repository")),
      policyRevision: S.optional(S.String),
      policyDocument: S.String,
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/repository/permissions/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutRepositoryPermissionsPolicyRequest",
}) as any as S.Schema<PutRepositoryPermissionsPolicyRequest>;
export interface PutRepositoryPermissionsPolicyResult {
  policy?: ResourcePolicy;
}
export const PutRepositoryPermissionsPolicyResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ policy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "PutRepositoryPermissionsPolicyResult",
}) as any as S.Schema<PutRepositoryPermissionsPolicyResult>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tag" }),
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
export interface TagResourceResult {}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tagKeys: TagKeyList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/untag" }),
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
export interface UntagResourceResult {}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdatePackageGroupRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  contactInfo?: string;
  description?: string;
}
export const UpdatePackageGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    packageGroup: S.String,
    contactInfo: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/package-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageGroupRequest",
}) as any as S.Schema<UpdatePackageGroupRequest>;
export interface UpdatePackageGroupResult {
  packageGroup?: PackageGroupDescription;
}
export const UpdatePackageGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageGroup: S.optional(PackageGroupDescription) }),
).annotate({
  identifier: "UpdatePackageGroupResult",
}) as any as S.Schema<UpdatePackageGroupResult>;
export type OriginRestrictions = {
  [
    key in PackageGroupOriginRestrictionType
  ]?: PackageGroupOriginRestrictionMode;
};
export const OriginRestrictions = /*@__PURE__*/ S.Record(
  PackageGroupOriginRestrictionType,
  PackageGroupOriginRestrictionMode.pipe(S.optional),
);
export interface PackageGroupAllowedRepository {
  repositoryName?: string;
  originRestrictionType?: PackageGroupOriginRestrictionType;
}
export const PackageGroupAllowedRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    originRestrictionType: S.optional(PackageGroupOriginRestrictionType),
  }),
).annotate({
  identifier: "PackageGroupAllowedRepository",
}) as any as S.Schema<PackageGroupAllowedRepository>;
export type PackageGroupAllowedRepositoryList = PackageGroupAllowedRepository[];
export const PackageGroupAllowedRepositoryList = /*@__PURE__*/ S.Array(
  PackageGroupAllowedRepository,
);
export interface UpdatePackageGroupOriginConfigurationRequest {
  domain: string;
  domainOwner?: string;
  packageGroup: string;
  restrictions?: {
    [key: string]: PackageGroupOriginRestrictionMode | undefined;
  };
  addAllowedRepositories?: PackageGroupAllowedRepository[];
  removeAllowedRepositories?: PackageGroupAllowedRepository[];
}
export const UpdatePackageGroupOriginConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domain: S.String.pipe(T.HttpQuery("domain")),
      domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
      packageGroup: S.String.pipe(T.HttpQuery("package-group")),
      restrictions: S.optional(OriginRestrictions),
      addAllowedRepositories: S.optional(PackageGroupAllowedRepositoryList),
      removeAllowedRepositories: S.optional(PackageGroupAllowedRepositoryList),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/package-group-origin-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdatePackageGroupOriginConfigurationRequest",
  }) as any as S.Schema<UpdatePackageGroupOriginConfigurationRequest>;
export type PackageGroupAllowedRepositoryUpdateType =
  | "ADDED"
  | "REMOVED"
  | (string & {});
export const PackageGroupAllowedRepositoryUpdateType = S.String;

export type PackageGroupAllowedRepositoryUpdate = {
  [key in PackageGroupAllowedRepositoryUpdateType]?: string[];
};
export const PackageGroupAllowedRepositoryUpdate = /*@__PURE__*/ S.Record(
  PackageGroupAllowedRepositoryUpdateType,
  RepositoryNameList.pipe(S.optional),
);
export type PackageGroupAllowedRepositoryUpdates = {
  [key in PackageGroupOriginRestrictionType]?: {
    [key: string]: string[] | undefined;
  };
};
export const PackageGroupAllowedRepositoryUpdates = /*@__PURE__*/ S.Record(
  PackageGroupOriginRestrictionType,
  PackageGroupAllowedRepositoryUpdate.pipe(S.optional),
);
export interface UpdatePackageGroupOriginConfigurationResult {
  packageGroup?: PackageGroupDescription;
  allowedRepositoryUpdates?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const UpdatePackageGroupOriginConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      packageGroup: S.optional(PackageGroupDescription),
      allowedRepositoryUpdates: S.optional(
        PackageGroupAllowedRepositoryUpdates,
      ),
    }),
  ).annotate({
    identifier: "UpdatePackageGroupOriginConfigurationResult",
  }) as any as S.Schema<UpdatePackageGroupOriginConfigurationResult>;
export interface UpdatePackageVersionsStatusRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  format: PackageFormat;
  namespace?: string;
  package: string;
  versions: string[];
  versionRevisions?: { [key: string]: string | undefined };
  expectedStatus?: PackageVersionStatus;
  targetStatus: PackageVersionStatus;
}
export const UpdatePackageVersionsStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    format: PackageFormat.pipe(T.HttpQuery("format")),
    namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
    package: S.String.pipe(T.HttpQuery("package")),
    versions: PackageVersionList,
    versionRevisions: S.optional(PackageVersionRevisionMap),
    expectedStatus: S.optional(PackageVersionStatus),
    targetStatus: PackageVersionStatus,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/package/versions/update_status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageVersionsStatusRequest",
}) as any as S.Schema<UpdatePackageVersionsStatusRequest>;
export interface UpdatePackageVersionsStatusResult {
  successfulVersions?: {
    [key: string]: SuccessfulPackageVersionInfo | undefined;
  };
  failedVersions?: { [key: string]: PackageVersionError | undefined };
}
export const UpdatePackageVersionsStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulVersions: S.optional(SuccessfulPackageVersionInfoMap),
    failedVersions: S.optional(PackageVersionErrorMap),
  }),
).annotate({
  identifier: "UpdatePackageVersionsStatusResult",
}) as any as S.Schema<UpdatePackageVersionsStatusResult>;
export interface UpdateRepositoryRequest {
  domain: string;
  domainOwner?: string;
  repository: string;
  description?: string;
  upstreams?: UpstreamRepository[];
}
export const UpdateRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: S.String.pipe(T.HttpQuery("domain")),
    domainOwner: S.optional(S.String).pipe(T.HttpQuery("domain-owner")),
    repository: S.String.pipe(T.HttpQuery("repository")),
    description: S.optional(S.String),
    upstreams: S.optional(UpstreamRepositoryList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/repository" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRepositoryRequest",
}) as any as S.Schema<UpdateRepositoryRequest>;
export interface UpdateRepositoryResult {
  repository?: RepositoryDescription;
}
export const UpdateRepositoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(RepositoryDescription) }),
).annotate({
  identifier: "UpdateRepositoryResult",
}) as any as S.Schema<UpdateRepositoryResult>;
export type ResourceType =
  | "domain"
  | "repository"
  | "package"
  | "package-version"
  | "asset"
  | (string & {});
export const ResourceType = S.String;

export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "CANNOT_PARSE"
  | "ENCRYPTION_KEY_ERROR"
  | "FIELD_VALIDATION_FAILED"
  | "UNKNOWN_OPERATION"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type AssociateExternalConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds an existing external connection to a repository. One external connection is allowed
 * per repository.
 *
 * A repository can have one or more upstream repositories, or an external connection.
 */
export const associateExternalConnection: API.OperationMethod<
  AssociateExternalConnectionRequest,
  AssociateExternalConnectionResult,
  AssociateExternalConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateExternalConnectionRequest,
  output: AssociateExternalConnectionResult,
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
  operationName: "AssociateExternalConnection",
}));

export type CopyPackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Copies package versions from one repository to another repository in the same domain.
 *
 * You must specify `versions` or `versionRevisions`. You cannot specify both.
 */
export const copyPackageVersions: API.OperationMethod<
  CopyPackageVersionsRequest,
  CopyPackageVersionsResult,
  CopyPackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyPackageVersionsRequest,
  output: CopyPackageVersionsResult,
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
  operationName: "CopyPackageVersions",
}));

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain. CodeArtifact *domains* make it easier to manage multiple repositories across an
 * organization. You can use a domain to apply permissions across many
 * repositories owned by different Amazon Web Services accounts. An asset is stored only once
 * in a domain, even if it's in multiple repositories.
 *
 * Although you can have multiple domains, we recommend a single production domain that contains all
 * published artifacts so that your development teams can find and share packages. You can use a second
 * pre-production domain to test changes to the production domain configuration.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResult,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResult,
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
  operationName: "CreateDomain",
}));

export type CreatePackageGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a package group. For more information about creating package groups, including example CLI commands, see Create a package group in the *CodeArtifact User Guide*.
 */
export const createPackageGroup: API.OperationMethod<
  CreatePackageGroupRequest,
  CreatePackageGroupResult,
  CreatePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageGroupRequest,
  output: CreatePackageGroupResult,
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
  operationName: "CreatePackageGroup",
}));

export type CreateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a repository.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryRequest,
  CreateRepositoryResult,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRepositoryRequest,
  output: CreateRepositoryResult,
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
  operationName: "CreateRepository",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain. You cannot delete a domain that contains repositories. If you want to delete a domain
 * with repositories, first delete its repositories.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResult,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteDomainPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy set on a domain.
 */
export const deleteDomainPermissionsPolicy: API.OperationMethod<
  DeleteDomainPermissionsPolicyRequest,
  DeleteDomainPermissionsPolicyResult,
  DeleteDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainPermissionsPolicyRequest,
  output: DeleteDomainPermissionsPolicyResult,
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
  operationName: "DeleteDomainPermissionsPolicy",
}));

export type DeletePackageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a package and all associated package versions. A deleted package cannot be restored. To delete one or more package versions, use the
 * DeletePackageVersions API.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResult,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageRequest,
  output: DeletePackageResult,
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
  operationName: "DeletePackage",
}));

export type DeletePackageGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a package group.
 * Deleting a package group does not delete packages or package versions associated with the package group.
 * When a package group is deleted, the direct child package groups will become children of the package
 * group's direct parent package group. Therefore, if any of the child groups are inheriting any settings
 * from the parent, those settings could change.
 */
export const deletePackageGroup: API.OperationMethod<
  DeletePackageGroupRequest,
  DeletePackageGroupResult,
  DeletePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageGroupRequest,
  output: DeletePackageGroupResult,
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
  operationName: "DeletePackageGroup",
}));

export type DeletePackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more versions of a package. A deleted package version cannot be restored
 * in your repository. If you want to remove a package version from your repository and be able
 * to restore it later, set its status to `Archived`. Archived packages cannot be
 * downloaded from a repository and don't show up with list package APIs (for example,
 * ListPackageVersions), but you can restore them using UpdatePackageVersionsStatus.
 */
export const deletePackageVersions: API.OperationMethod<
  DeletePackageVersionsRequest,
  DeletePackageVersionsResult,
  DeletePackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageVersionsRequest,
  output: DeletePackageVersionsResult,
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
  operationName: "DeletePackageVersions",
}));

export type DeleteRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryRequest,
  DeleteRepositoryResult,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryRequest,
  output: DeleteRepositoryResult,
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
  operationName: "DeleteRepository",
}));

export type DeleteRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource policy that is set on a repository. After a resource policy is deleted, the
 * permissions allowed and denied by the deleted policy are removed. The effect of deleting a resource policy might not be immediate.
 *
 * Use `DeleteRepositoryPermissionsPolicy` with caution. After a policy is deleted, Amazon Web Services users, roles, and accounts lose permissions to perform
 * the repository actions granted by the deleted policy.
 */
export const deleteRepositoryPermissionsPolicy: API.OperationMethod<
  DeleteRepositoryPermissionsPolicyRequest,
  DeleteRepositoryPermissionsPolicyResult,
  DeleteRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryPermissionsPolicyRequest,
  output: DeleteRepositoryPermissionsPolicyResult,
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
  operationName: "DeleteRepositoryPermissionsPolicy",
}));

export type DescribeDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * DomainDescription
 * object that contains information about the requested domain.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResult,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainRequest,
  output: DescribeDomainResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
}));

export type DescribePackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * PackageDescription
 * object that contains information about the requested package.
 */
export const describePackage: API.OperationMethod<
  DescribePackageRequest,
  DescribePackageResult,
  DescribePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageRequest,
  output: DescribePackageResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackage",
}));

export type DescribePackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a PackageGroupDescription object that
 * contains information about the requested package group.
 */
export const describePackageGroup: API.OperationMethod<
  DescribePackageGroupRequest,
  DescribePackageGroupResult,
  DescribePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageGroupRequest,
  output: DescribePackageGroupResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackageGroup",
}));

export type DescribePackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a
 * PackageVersionDescription
 * object that contains information about the requested package version.
 */
export const describePackageVersion: API.OperationMethod<
  DescribePackageVersionRequest,
  DescribePackageVersionResult,
  DescribePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageVersionRequest,
  output: DescribePackageVersionResult,
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
  operationName: "DescribePackageVersion",
}));

export type DescribeRepositoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a `RepositoryDescription` object that contains detailed information
 * about the requested repository.
 */
export const describeRepository: API.OperationMethod<
  DescribeRepositoryRequest,
  DescribeRepositoryResult,
  DescribeRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRepositoryRequest,
  output: DescribeRepositoryResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRepository",
}));

export type DisassociateExternalConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an existing external connection from a repository.
 */
export const disassociateExternalConnection: API.OperationMethod<
  DisassociateExternalConnectionRequest,
  DisassociateExternalConnectionResult,
  DisassociateExternalConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateExternalConnectionRequest,
  output: DisassociateExternalConnectionResult,
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
  operationName: "DisassociateExternalConnection",
}));

export type DisposePackageVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the assets in package versions and sets the package versions' status to `Disposed`.
 * A disposed package version cannot be restored in your repository because its assets are deleted.
 *
 * To view all disposed package versions in a repository, use ListPackageVersions and set the
 * status parameter
 * to `Disposed`.
 *
 * To view information about a disposed package version, use DescribePackageVersion.
 */
export const disposePackageVersions: API.OperationMethod<
  DisposePackageVersionsRequest,
  DisposePackageVersionsResult,
  DisposePackageVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisposePackageVersionsRequest,
  output: DisposePackageVersionsResult,
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
  operationName: "DisposePackageVersions",
}));

export type GetAssociatedPackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the most closely associated package group to the specified package. This API does not require that the package exist
 * in any repository in the domain. As such, `GetAssociatedPackageGroup` can be used to see which package group's origin configuration
 * applies to a package before that package is in a repository. This can be helpful to check if public packages are blocked without ingesting them.
 *
 * For information package group association and matching, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const getAssociatedPackageGroup: API.OperationMethod<
  GetAssociatedPackageGroupRequest,
  GetAssociatedPackageGroupResult,
  GetAssociatedPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssociatedPackageGroupRequest,
  output: GetAssociatedPackageGroupResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedPackageGroup",
}));

export type GetAuthorizationTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a temporary authorization token for accessing repositories in the domain.
 * This API requires the `codeartifact:GetAuthorizationToken` and `sts:GetServiceBearerToken` permissions.
 * For more information about authorization tokens, see
 * CodeArtifact authentication and tokens.
 *
 * CodeArtifact authorization tokens are valid for a period of 12 hours when created with the `login` command.
 * You can call `login` periodically to refresh the token. When
 * you create an authorization token with the `GetAuthorizationToken` API, you can set a custom authorization period,
 * up to a maximum of 12 hours, with the `durationSeconds` parameter.
 *
 * The authorization period begins after `login`
 * or `GetAuthorizationToken` is called. If `login` or `GetAuthorizationToken` is called while
 * assuming a role, the token lifetime is independent of the maximum session duration
 * of the role. For example, if you call `sts assume-role` and specify a session duration of 15 minutes, then
 * generate a CodeArtifact authorization token, the token will be valid for the full authorization period
 * even though this is longer than the 15-minute session duration.
 *
 * See
 * Using IAM Roles
 * for more information on controlling session duration.
 */
export const getAuthorizationToken: API.OperationMethod<
  GetAuthorizationTokenRequest,
  GetAuthorizationTokenResult,
  GetAuthorizationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizationTokenRequest,
  output: GetAuthorizationTokenResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizationToken",
}));

export type GetDomainPermissionsPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource policy attached to the specified domain.
 *
 * The policy is a resource-based policy, not an identity-based policy. For more information, see
 * Identity-based policies
 * and resource-based policies in the *IAM User Guide*.
 */
export const getDomainPermissionsPolicy: API.OperationMethod<
  GetDomainPermissionsPolicyRequest,
  GetDomainPermissionsPolicyResult,
  GetDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainPermissionsPolicyRequest,
  output: GetDomainPermissionsPolicyResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainPermissionsPolicy",
}));

export type GetPackageVersionAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an asset (or file) that is in a package. For example, for a Maven package version, use
 * `GetPackageVersionAsset` to download a `JAR` file, a `POM` file,
 * or any other assets in the package version.
 */
export const getPackageVersionAsset: API.OperationMethod<
  GetPackageVersionAssetRequest,
  GetPackageVersionAssetResult,
  GetPackageVersionAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPackageVersionAssetRequest,
  output: GetPackageVersionAssetResult,
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
  operationName: "GetPackageVersionAsset",
}));

export type GetPackageVersionReadmeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the readme file or descriptive text for a package version.
 *
 * The returned text might contain formatting. For example, it might contain formatting for Markdown or reStructuredText.
 */
export const getPackageVersionReadme: API.OperationMethod<
  GetPackageVersionReadmeRequest,
  GetPackageVersionReadmeResult,
  GetPackageVersionReadmeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPackageVersionReadmeRequest,
  output: GetPackageVersionReadmeResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersionReadme",
}));

export type GetRepositoryEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the endpoint of a repository for a specific package format. A repository has one endpoint for each
 * package format:
 *
 * - `cargo`
 *
 * - `generic`
 *
 * - `maven`
 *
 * - `npm`
 *
 * - `nuget`
 *
 * - `pypi`
 *
 * - `ruby`
 *
 * - `swift`
 */
export const getRepositoryEndpoint: API.OperationMethod<
  GetRepositoryEndpointRequest,
  GetRepositoryEndpointResult,
  GetRepositoryEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryEndpointRequest,
  output: GetRepositoryEndpointResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryEndpoint",
}));

export type GetRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource policy that is set on a repository.
 */
export const getRepositoryPermissionsPolicy: API.OperationMethod<
  GetRepositoryPermissionsPolicyRequest,
  GetRepositoryPermissionsPolicyResult,
  GetRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryPermissionsPolicyRequest,
  output: GetRepositoryPermissionsPolicyResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryPermissionsPolicy",
}));

export type ListAllowedRepositoriesForGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the repositories in the added repositories list of the specified restriction type for a package group. For more information about restriction types
 * and added repository lists, see Package group origin controls in the *CodeArtifact User Guide*.
 */
export const listAllowedRepositoriesForGroup: API.PaginatedOperationMethod<
  ListAllowedRepositoriesForGroupRequest,
  ListAllowedRepositoriesForGroupResult,
  ListAllowedRepositoriesForGroupError,
  Credentials | HttpClient.HttpClient,
  RepositoryName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAllowedRepositoriesForGroupRequest,
  output: ListAllowedRepositoriesForGroupResult,
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
  operationName: "ListAllowedRepositoriesForGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "allowedRepositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of packages associated with the requested package group. For information package group association and matching, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const listAssociatedPackages: API.PaginatedOperationMethod<
  ListAssociatedPackagesRequest,
  ListAssociatedPackagesResult,
  ListAssociatedPackagesError,
  Credentials | HttpClient.HttpClient,
  AssociatedPackage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedPackagesRequest,
  output: ListAssociatedPackagesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of DomainSummary objects for all domains owned by the Amazon Web Services account that makes
 * this call. Each returned `DomainSummary` object contains information about a
 * domain.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResult,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of package groups in the requested domain.
 */
export const listPackageGroups: API.PaginatedOperationMethod<
  ListPackageGroupsRequest,
  ListPackageGroupsResult,
  ListPackageGroupsError,
  Credentials | HttpClient.HttpClient,
  PackageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackageGroupsRequest,
  output: ListPackageGroupsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * PackageSummary
 * objects for packages in a repository that match the request parameters.
 */
export const listPackages: API.PaginatedOperationMethod<
  ListPackagesRequest,
  ListPackagesResult,
  ListPackagesError,
  Credentials | HttpClient.HttpClient,
  PackageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagesRequest,
  output: ListPackagesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * AssetSummary
 * objects for assets in a package version.
 */
export const listPackageVersionAssets: API.PaginatedOperationMethod<
  ListPackageVersionAssetsRequest,
  ListPackageVersionAssetsResult,
  ListPackageVersionAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackageVersionAssetsRequest,
  output: ListPackageVersionAssetsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageVersionAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the direct dependencies for a package version. The dependencies are returned as
 * PackageDependency
 * objects. CodeArtifact extracts the dependencies for a package version from the metadata file for the package
 * format (for example, the `package.json` file for npm packages and the `pom.xml` file
 * for Maven). Any package version dependencies that are not listed in the configuration file are not returned.
 */
export const listPackageVersionDependencies: API.OperationMethod<
  ListPackageVersionDependenciesRequest,
  ListPackageVersionDependenciesResult,
  ListPackageVersionDependenciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPackageVersionDependenciesRequest,
  output: ListPackageVersionDependenciesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageVersionDependencies",
}));

export type ListPackageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * PackageVersionSummary
 * objects for package versions in a repository that match the request parameters. Package versions of all statuses will be returned by default when calling `list-package-versions` with no `--status` parameter.
 */
export const listPackageVersions: API.PaginatedOperationMethod<
  ListPackageVersionsRequest,
  ListPackageVersionsResult,
  ListPackageVersionsError,
  Credentials | HttpClient.HttpClient,
  PackageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackageVersionsRequest,
  output: ListPackageVersionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * RepositorySummary
 * objects. Each `RepositorySummary` contains information about a repository in the specified Amazon Web Services account and that matches the input
 * parameters.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesRequest,
  ListRepositoriesResult,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesRequest,
  output: ListRepositoriesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesInDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of
 * RepositorySummary
 * objects. Each `RepositorySummary` contains information about a repository in the specified domain and that matches the input
 * parameters.
 */
export const listRepositoriesInDomain: API.PaginatedOperationMethod<
  ListRepositoriesInDomainRequest,
  ListRepositoriesInDomainResult,
  ListRepositoriesInDomainError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesInDomainRequest,
  output: ListRepositoriesInDomainResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoriesInDomain",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubPackageGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of direct children of the specified package group.
 *
 * For information package group hierarchy, see
 * Package group
 * definition syntax and matching behavior in the *CodeArtifact User Guide*.
 */
export const listSubPackageGroups: API.PaginatedOperationMethod<
  ListSubPackageGroupsRequest,
  ListSubPackageGroupsResult,
  ListSubPackageGroupsError,
  Credentials | HttpClient.HttpClient,
  PackageGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubPackageGroupsRequest,
  output: ListSubPackageGroupsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubPackageGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about Amazon Web Services tags for a specified Amazon Resource Name (ARN) in CodeArtifact.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PublishPackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new package version containing one or more assets (or files).
 *
 * The `unfinished` flag can be used to keep the package version in the
 * `Unfinished` state until all of its assets have been uploaded (see Package version status in the *CodeArtifact user guide*). To set
 * the package version’s status to `Published`, omit the `unfinished` flag
 * when uploading the final asset, or set the status using UpdatePackageVersionStatus. Once a package version’s status is set to
 * `Published`, it cannot change back to `Unfinished`.
 *
 * Only generic packages can be published using this API. For more information, see Using generic
 * packages in the *CodeArtifact User Guide*.
 */
export const publishPackageVersion: API.OperationMethod<
  PublishPackageVersionRequest,
  PublishPackageVersionResult,
  PublishPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishPackageVersionRequest,
  output: PublishPackageVersionResult,
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
  operationName: "PublishPackageVersion",
}));

export type PutDomainPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets a resource policy on a domain that specifies permissions to access it.
 *
 * When you call `PutDomainPermissionsPolicy`, the resource policy on the domain is ignored when evaluting permissions.
 * This ensures that the owner of a domain cannot lock themselves out of the domain, which would prevent them from being
 * able to update the resource policy.
 */
export const putDomainPermissionsPolicy: API.OperationMethod<
  PutDomainPermissionsPolicyRequest,
  PutDomainPermissionsPolicyResult,
  PutDomainPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDomainPermissionsPolicyRequest,
  output: PutDomainPermissionsPolicyResult,
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
  operationName: "PutDomainPermissionsPolicy",
}));

export type PutPackageOriginConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the package origin configuration for a package.
 *
 * The package origin configuration determines how new versions of a package can be added to a repository. You can allow or block direct
 * publishing of new package versions, or ingestion and retaining of new package versions from an external connection or upstream source.
 * For more information about package origin controls and configuration, see Editing package origin controls in the *CodeArtifact User Guide*.
 *
 * `PutPackageOriginConfiguration` can be called on a package that doesn't yet exist in the repository. When called
 * on a package that does not exist, a package is created in the repository with no versions and the requested restrictions are set on the package.
 * This can be used to preemptively block ingesting or retaining any versions from external connections or upstream repositories, or to block
 * publishing any versions of the package into the repository before connecting any package managers or publishers to the repository.
 */
export const putPackageOriginConfiguration: API.OperationMethod<
  PutPackageOriginConfigurationRequest,
  PutPackageOriginConfigurationResult,
  PutPackageOriginConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPackageOriginConfigurationRequest,
  output: PutPackageOriginConfigurationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPackageOriginConfiguration",
}));

export type PutRepositoryPermissionsPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the resource policy on a repository that specifies permissions to access it.
 *
 * When you call `PutRepositoryPermissionsPolicy`, the resource policy on the repository is ignored when evaluting permissions.
 * This ensures that the owner of a repository cannot lock themselves out of the repository, which would prevent them from being
 * able to update the resource policy.
 */
export const putRepositoryPermissionsPolicy: API.OperationMethod<
  PutRepositoryPermissionsPolicyRequest,
  PutRepositoryPermissionsPolicyResult,
  PutRepositoryPermissionsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRepositoryPermissionsPolicyRequest,
  output: PutRepositoryPermissionsPolicyResult,
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
  operationName: "PutRepositoryPermissionsPolicy",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a resource in CodeArtifact.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [
    AccessDeniedException,
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
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource in CodeArtifact.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePackageGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a package group. This API cannot be used to update a package group's origin configuration or pattern. To update a
 * package group's origin configuration, use UpdatePackageGroupOriginConfiguration.
 */
export const updatePackageGroup: API.OperationMethod<
  UpdatePackageGroupRequest,
  UpdatePackageGroupResult,
  UpdatePackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageGroupRequest,
  output: UpdatePackageGroupResult,
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
  operationName: "UpdatePackageGroup",
}));

export type UpdatePackageGroupOriginConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the package origin configuration for a package group.
 *
 * The package origin configuration determines how new versions of a package can be added to a repository. You can allow or block direct
 * publishing of new package versions, or ingestion and retaining of new package versions from an external connection or upstream source.
 * For more information about package group origin controls and configuration, see
 * Package group origin controls
 * in the *CodeArtifact User Guide*.
 */
export const updatePackageGroupOriginConfiguration: API.OperationMethod<
  UpdatePackageGroupOriginConfigurationRequest,
  UpdatePackageGroupOriginConfigurationResult,
  UpdatePackageGroupOriginConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageGroupOriginConfigurationRequest,
  output: UpdatePackageGroupOriginConfigurationResult,
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
  operationName: "UpdatePackageGroupOriginConfiguration",
}));

export type UpdatePackageVersionsStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of one or more versions of a package. Using `UpdatePackageVersionsStatus`,
 * you can update the status of package versions to `Archived`, `Published`, or `Unlisted`.
 * To set the status of a package version to `Disposed`, use
 * DisposePackageVersions.
 */
export const updatePackageVersionsStatus: API.OperationMethod<
  UpdatePackageVersionsStatusRequest,
  UpdatePackageVersionsStatusResult,
  UpdatePackageVersionsStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageVersionsStatusRequest,
  output: UpdatePackageVersionsStatusResult,
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
  operationName: "UpdatePackageVersionsStatus",
}));

export type UpdateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the properties of a repository.
 */
export const updateRepository: API.OperationMethod<
  UpdateRepositoryRequest,
  UpdateRepositoryResult,
  UpdateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRepositoryRequest,
  output: UpdateRepositoryResult,
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
  operationName: "UpdateRepository",
}));
