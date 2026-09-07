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
  sdkId: "DataZone",
  serviceShapeName: "DataZone",
});
const auth = T.AwsAuthSigv4({ name: "datazone" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseFIPS = false, Endpoint } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://datazone-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://datazone.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://datazone-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        return e(
          `https://datazone.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type AssetIdentifier = string;
export type Revision = string;
export type AcceptRuleBehavior = "ALL" | "NONE" | (string & {});
export const AcceptRuleBehavior = /*@__PURE__*/ S.String;

export interface AcceptRule {
  rule?: AcceptRuleBehavior;
  threshold?: number;
}
export const AcceptRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rule: S.optional(AcceptRuleBehavior),
    threshold: S.optional(S.Number),
  }),
).annotate({ identifier: "AcceptRule" }) as any as S.Schema<AcceptRule>;
export type EditedValue = string | redacted.Redacted<string>;
export interface AcceptChoice {
  predictionTarget?: string;
  predictionChoice?: number;
  editedValue?: string | redacted.Redacted<string>;
}
export const AcceptChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    predictionTarget: S.optional(S.String),
    predictionChoice: S.optional(S.Number),
    editedValue: S.optional(SensitiveString),
  }),
).annotate({ identifier: "AcceptChoice" }) as any as S.Schema<AcceptChoice>;
export type AcceptChoices = AcceptChoice[];
export const AcceptChoices = /*@__PURE__*/ S.Array(AcceptChoice);
export type ClientToken = string;
export interface AcceptPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
  acceptRule?: AcceptRule;
  acceptChoices?: AcceptChoice[];
  clientToken?: string;
}
export const AcceptPredictionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
    acceptRule: S.optional(AcceptRule),
    acceptChoices: S.optional(AcceptChoices),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/accept-predictions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptPredictionsInput",
}) as any as S.Schema<AcceptPredictionsInput>;
export type AssetId = string;
export interface AcceptPredictionsOutput {
  domainId: string;
  assetId: string;
  revision: string;
}
export const AcceptPredictionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String, assetId: S.String, revision: S.String }),
).annotate({
  identifier: "AcceptPredictionsOutput",
}) as any as S.Schema<AcceptPredictionsOutput>;
export type SubscriptionRequestId = string;
export type DecisionComment = string | redacted.Redacted<string>;
export type FilterId = string;
export type FilterIds = string[];
export const FilterIds = /*@__PURE__*/ S.Array(S.String);
export interface AcceptedAssetScope {
  assetId: string;
  filterIds: string[];
}
export const AcceptedAssetScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, filterIds: FilterIds }),
).annotate({
  identifier: "AcceptedAssetScope",
}) as any as S.Schema<AcceptedAssetScope>;
export type AcceptedAssetScopes = AcceptedAssetScope[];
export const AcceptedAssetScopes = /*@__PURE__*/ S.Array(AcceptedAssetScope);
export type S3Permission = "READ" | "WRITE" | (string & {});
export const S3Permission = /*@__PURE__*/ S.String;

export type S3Permissions = S3Permission[];
export const S3Permissions = /*@__PURE__*/ S.Array(S3Permission);
export type Permissions = { s3: S3Permission[] };
export const Permissions = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Permissions }),
]);
export interface AssetPermission {
  assetId: string;
  permissions: Permissions;
}
export const AssetPermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, permissions: Permissions }),
).annotate({
  identifier: "AssetPermission",
}) as any as S.Schema<AssetPermission>;
export type AssetPermissions = AssetPermission[];
export const AssetPermissions = /*@__PURE__*/ S.Array(AssetPermission);
export interface AcceptSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  decisionComment?: string | redacted.Redacted<string>;
  assetScopes?: AcceptedAssetScope[];
  assetPermissions?: AssetPermission[];
}
export const AcceptSubscriptionRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    decisionComment: S.optional(SensitiveString),
    assetScopes: S.optional(AcceptedAssetScopes),
    assetPermissions: S.optional(AssetPermissions),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}/accept",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptSubscriptionRequestInput",
}) as any as S.Schema<AcceptSubscriptionRequestInput>;
export type CreatedBy = string;
export type UpdatedBy = string;
export type SubscriptionRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | (string & {});
export const SubscriptionRequestStatus = /*@__PURE__*/ S.String;

export type CreatedAt = Date;
export type UpdatedAt = Date;
export type RequestReason = string | redacted.Redacted<string>;
export type ProjectId = string;
export type ProjectName = string | redacted.Redacted<string>;
export interface SubscribedProject {
  id?: string;
  name?: string | redacted.Redacted<string>;
}
export const SubscribedProject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(SensitiveString) }),
).annotate({
  identifier: "SubscribedProject",
}) as any as S.Schema<SubscribedProject>;
export type UserProfileId = string;
export interface IamUserProfileDetails {
  arn?: string;
  principalId?: string;
  sessionName?: string;
  groupProfileId?: string;
}
export const IamUserProfileDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    principalId: S.optional(S.String),
    sessionName: S.optional(S.String),
    groupProfileId: S.optional(S.String),
  }),
).annotate({
  identifier: "IamUserProfileDetails",
}) as any as S.Schema<IamUserProfileDetails>;
export type UserProfileName = string | redacted.Redacted<string>;
export type FirstName = string | redacted.Redacted<string>;
export type LastName = string | redacted.Redacted<string>;
export interface SsoUserProfileDetails {
  username?: string | redacted.Redacted<string>;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
}
export const SsoUserProfileDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    username: S.optional(SensitiveString),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "SsoUserProfileDetails",
}) as any as S.Schema<SsoUserProfileDetails>;
export type UserProfileDetails =
  | { iam: IamUserProfileDetails; sso?: never }
  | { iam?: never; sso: SsoUserProfileDetails };
export const UserProfileDetails = /*@__PURE__*/ S.Union([
  S.Struct({ iam: IamUserProfileDetails }),
  S.Struct({ sso: SsoUserProfileDetails }),
]);
export interface SubscribedUser {
  id?: string;
  details?: UserProfileDetails;
}
export const SubscribedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    details: S.optional(UserProfileDetails),
  }),
).annotate({ identifier: "SubscribedUser" }) as any as S.Schema<SubscribedUser>;
export type GroupProfileId = string;
export type GroupProfileName = string | redacted.Redacted<string>;
export interface SubscribedGroup {
  id?: string;
  name?: string | redacted.Redacted<string>;
}
export const SubscribedGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(SensitiveString) }),
).annotate({
  identifier: "SubscribedGroup",
}) as any as S.Schema<SubscribedGroup>;
export type IamPrincipalArn = string;
export interface SubscribedIamPrincipal {
  principalArn?: string;
}
export const SubscribedIamPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ principalArn: S.optional(S.String) }),
).annotate({
  identifier: "SubscribedIamPrincipal",
}) as any as S.Schema<SubscribedIamPrincipal>;
export type SubscribedPrincipal =
  | { project: SubscribedProject; user?: never; group?: never; iam?: never }
  | { project?: never; user: SubscribedUser; group?: never; iam?: never }
  | { project?: never; user?: never; group: SubscribedGroup; iam?: never }
  | {
      project?: never;
      user?: never;
      group?: never;
      iam: SubscribedIamPrincipal;
    };
export const SubscribedPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ project: SubscribedProject }),
  S.Struct({ user: SubscribedUser }),
  S.Struct({ group: SubscribedGroup }),
  S.Struct({ iam: SubscribedIamPrincipal }),
]);
export type SubscribedPrincipals = SubscribedPrincipal[];
export const SubscribedPrincipals = /*@__PURE__*/ S.Array(SubscribedPrincipal);
export type ListingId = string;
export type ListingName = string;
export type Description = string | redacted.Redacted<string>;
export type TypeName = string;
export type Forms = string;
export type GlossaryTermName = string | redacted.Redacted<string>;
export type ShortDescription = string | redacted.Redacted<string>;
export interface DetailedGlossaryTerm {
  name?: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
}
export const DetailedGlossaryTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SensitiveString),
    shortDescription: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DetailedGlossaryTerm",
}) as any as S.Schema<DetailedGlossaryTerm>;
export type DetailedGlossaryTerms = DetailedGlossaryTerm[];
export const DetailedGlossaryTerms =
  /*@__PURE__*/ S.Array(DetailedGlossaryTerm);
export interface AssetScope {
  assetId: string;
  filterIds: string[];
  status: string;
  errorMessage?: string;
}
export const AssetScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String,
    filterIds: FilterIds,
    status: S.String,
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "AssetScope" }) as any as S.Schema<AssetScope>;
export interface SubscribedAssetListing {
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
  forms?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  assetScope?: AssetScope;
  permissions?: Permissions;
}
export const SubscribedAssetListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.optional(S.String),
    entityRevision: S.optional(S.String),
    entityType: S.optional(S.String),
    forms: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    assetScope: S.optional(AssetScope),
    permissions: S.optional(Permissions),
  }),
).annotate({
  identifier: "SubscribedAssetListing",
}) as any as S.Schema<SubscribedAssetListing>;
export interface AssetInDataProductListingItem {
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
}
export const AssetInDataProductListingItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.optional(S.String),
    entityRevision: S.optional(S.String),
    entityType: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetInDataProductListingItem",
}) as any as S.Schema<AssetInDataProductListingItem>;
export type AssetInDataProductListingItems = AssetInDataProductListingItem[];
export const AssetInDataProductListingItems = /*@__PURE__*/ S.Array(
  AssetInDataProductListingItem,
);
export interface SubscribedProductListing {
  entityId?: string;
  entityRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  name?: string;
  description?: string;
  assetListings?: AssetInDataProductListingItem[];
}
export const SubscribedProductListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.optional(S.String),
    entityRevision: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    name: S.optional(S.String),
    description: S.optional(S.String),
    assetListings: S.optional(AssetInDataProductListingItems),
  }),
).annotate({
  identifier: "SubscribedProductListing",
}) as any as S.Schema<SubscribedProductListing>;
export type SubscribedListingItem =
  | { assetListing: SubscribedAssetListing; productListing?: never }
  | { assetListing?: never; productListing: SubscribedProductListing };
export const SubscribedListingItem = /*@__PURE__*/ S.Union([
  S.Struct({ assetListing: SubscribedAssetListing }),
  S.Struct({ productListing: SubscribedProductListing }),
]);
export interface SubscribedListing {
  id: string;
  revision?: string;
  name: string;
  description: string | redacted.Redacted<string>;
  item: SubscribedListingItem;
  ownerProjectId: string;
  ownerProjectName?: string;
}
export const SubscribedListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    revision: S.optional(S.String),
    name: S.String,
    description: SensitiveString,
    item: SubscribedListingItem,
    ownerProjectId: S.String,
    ownerProjectName: S.optional(S.String),
  }),
).annotate({
  identifier: "SubscribedListing",
}) as any as S.Schema<SubscribedListing>;
export type SubscribedListings = SubscribedListing[];
export const SubscribedListings = /*@__PURE__*/ S.Array(SubscribedListing);
export type SubscriptionId = string;
export type FormName = string;
export type FormTypeName = string | redacted.Redacted<string>;
export interface FormOutput {
  formName: string;
  typeName?: string | redacted.Redacted<string>;
  typeRevision?: string;
  content?: string;
}
export const FormOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formName: S.String,
    typeName: S.optional(SensitiveString),
    typeRevision: S.optional(S.String),
    content: S.optional(S.String),
  }),
).annotate({ identifier: "FormOutput" }) as any as S.Schema<FormOutput>;
export type MetadataForms = FormOutput[];
export const MetadataForms = /*@__PURE__*/ S.Array(FormOutput);
export interface AcceptSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export const AcceptSubscriptionRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataForms: S.optional(MetadataForms),
  }),
).annotate({
  identifier: "AcceptSubscriptionRequestOutput",
}) as any as S.Schema<AcceptSubscriptionRequestOutput>;
export type DataZoneEntityType = "DOMAIN_UNIT" | (string & {});
export const DataZoneEntityType = /*@__PURE__*/ S.String;

export type UserIdentifier = string;
export interface OwnerUserProperties {
  userIdentifier: string;
}
export const OwnerUserProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userIdentifier: S.String }),
).annotate({
  identifier: "OwnerUserProperties",
}) as any as S.Schema<OwnerUserProperties>;
export type GroupIdentifier = string;
export interface OwnerGroupProperties {
  groupIdentifier: string;
}
export const OwnerGroupProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupIdentifier: S.String }),
).annotate({
  identifier: "OwnerGroupProperties",
}) as any as S.Schema<OwnerGroupProperties>;
export type OwnerProperties =
  | { user: OwnerUserProperties; group?: never }
  | { user?: never; group: OwnerGroupProperties };
export const OwnerProperties = /*@__PURE__*/ S.Union([
  S.Struct({ user: OwnerUserProperties }),
  S.Struct({ group: OwnerGroupProperties }),
]);
export interface AddEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string;
}
export const AddEntityOwnerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: DataZoneEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    owner: OwnerProperties,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/addOwner",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddEntityOwnerInput",
}) as any as S.Schema<AddEntityOwnerInput>;
export interface AddEntityOwnerOutput {}
export const AddEntityOwnerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AddEntityOwnerOutput",
}) as any as S.Schema<AddEntityOwnerOutput>;
export type TargetEntityType =
  | "DOMAIN_UNIT"
  | "ENVIRONMENT_BLUEPRINT_CONFIGURATION"
  | "ENVIRONMENT_PROFILE"
  | "ASSET_TYPE"
  | (string & {});
export const TargetEntityType = /*@__PURE__*/ S.String;

export type ManagedPolicyType =
  | "CREATE_DOMAIN_UNIT"
  | "OVERRIDE_DOMAIN_UNIT_OWNERS"
  | "ADD_TO_PROJECT_MEMBER_POOL"
  | "OVERRIDE_PROJECT_OWNERS"
  | "CREATE_GLOSSARY"
  | "CREATE_FORM_TYPE"
  | "CREATE_ASSET_TYPE"
  | "CREATE_PROJECT"
  | "CREATE_ENVIRONMENT_PROFILE"
  | "DELEGATE_CREATE_ENVIRONMENT_PROFILE"
  | "CREATE_ENVIRONMENT"
  | "CREATE_ENVIRONMENT_FROM_BLUEPRINT"
  | "CREATE_PROJECT_FROM_PROJECT_PROFILE"
  | "USE_ASSET_TYPE"
  | (string & {});
export const ManagedPolicyType = /*@__PURE__*/ S.String;

export interface AllUsersGrantFilter {}
export const AllUsersGrantFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AllUsersGrantFilter",
}) as any as S.Schema<AllUsersGrantFilter>;
export type UserPolicyGrantPrincipal =
  | { userIdentifier: string; allUsersGrantFilter?: never }
  | { userIdentifier?: never; allUsersGrantFilter: AllUsersGrantFilter };
export const UserPolicyGrantPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ userIdentifier: S.String }),
  S.Struct({ allUsersGrantFilter: AllUsersGrantFilter }),
]);
export type GroupPolicyGrantPrincipal = { groupIdentifier: string };
export const GroupPolicyGrantPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ groupIdentifier: S.String }),
]);
export type ProjectDesignation =
  | "OWNER"
  | "CONTRIBUTOR"
  | "PROJECT_CATALOG_STEWARD"
  | (string & {});
export const ProjectDesignation = /*@__PURE__*/ S.String;

export type DomainUnitId = string;
export interface DomainUnitFilterForProject {
  domainUnit: string;
  includeChildDomainUnits?: boolean;
}
export const DomainUnitFilterForProject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainUnit: S.String,
    includeChildDomainUnits: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DomainUnitFilterForProject",
}) as any as S.Schema<DomainUnitFilterForProject>;
export type ProjectGrantFilter = {
  domainUnitFilter: DomainUnitFilterForProject;
};
export const ProjectGrantFilter = /*@__PURE__*/ S.Union([
  S.Struct({ domainUnitFilter: DomainUnitFilterForProject }),
]);
export interface ProjectPolicyGrantPrincipal {
  projectDesignation: ProjectDesignation;
  projectIdentifier?: string;
  projectGrantFilter?: ProjectGrantFilter;
}
export const ProjectPolicyGrantPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectDesignation: ProjectDesignation,
    projectIdentifier: S.optional(S.String),
    projectGrantFilter: S.optional(ProjectGrantFilter),
  }),
).annotate({
  identifier: "ProjectPolicyGrantPrincipal",
}) as any as S.Schema<ProjectPolicyGrantPrincipal>;
export type DomainUnitDesignation = "OWNER" | (string & {});
export const DomainUnitDesignation = /*@__PURE__*/ S.String;

export interface AllDomainUnitsGrantFilter {}
export const AllDomainUnitsGrantFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AllDomainUnitsGrantFilter",
}) as any as S.Schema<AllDomainUnitsGrantFilter>;
export type DomainUnitGrantFilter = {
  allDomainUnitsGrantFilter: AllDomainUnitsGrantFilter;
};
export const DomainUnitGrantFilter = /*@__PURE__*/ S.Union([
  S.Struct({ allDomainUnitsGrantFilter: AllDomainUnitsGrantFilter }),
]);
export interface DomainUnitPolicyGrantPrincipal {
  domainUnitDesignation: DomainUnitDesignation;
  domainUnitIdentifier?: string;
  domainUnitGrantFilter?: DomainUnitGrantFilter;
}
export const DomainUnitPolicyGrantPrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainUnitDesignation: DomainUnitDesignation,
    domainUnitIdentifier: S.optional(S.String),
    domainUnitGrantFilter: S.optional(DomainUnitGrantFilter),
  }),
).annotate({
  identifier: "DomainUnitPolicyGrantPrincipal",
}) as any as S.Schema<DomainUnitPolicyGrantPrincipal>;
export type PolicyGrantPrincipal =
  | {
      user: UserPolicyGrantPrincipal;
      group?: never;
      project?: never;
      domainUnit?: never;
    }
  | {
      user?: never;
      group: GroupPolicyGrantPrincipal;
      project?: never;
      domainUnit?: never;
    }
  | {
      user?: never;
      group?: never;
      project: ProjectPolicyGrantPrincipal;
      domainUnit?: never;
    }
  | {
      user?: never;
      group?: never;
      project?: never;
      domainUnit: DomainUnitPolicyGrantPrincipal;
    };
export const PolicyGrantPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ user: UserPolicyGrantPrincipal }),
  S.Struct({ group: GroupPolicyGrantPrincipal }),
  S.Struct({ project: ProjectPolicyGrantPrincipal }),
  S.Struct({ domainUnit: DomainUnitPolicyGrantPrincipal }),
]);
export interface CreateDomainUnitPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const CreateDomainUnitPolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateDomainUnitPolicyGrantDetail",
}) as any as S.Schema<CreateDomainUnitPolicyGrantDetail>;
export interface OverrideDomainUnitOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const OverrideDomainUnitOwnersPolicyGrantDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
  ).annotate({
    identifier: "OverrideDomainUnitOwnersPolicyGrantDetail",
  }) as any as S.Schema<OverrideDomainUnitOwnersPolicyGrantDetail>;
export interface AddToProjectMemberPoolPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const AddToProjectMemberPoolPolicyGrantDetail = /*@__PURE__*/ S.suspend(
  () => S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "AddToProjectMemberPoolPolicyGrantDetail",
}) as any as S.Schema<AddToProjectMemberPoolPolicyGrantDetail>;
export interface OverrideProjectOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const OverrideProjectOwnersPolicyGrantDetail = /*@__PURE__*/ S.suspend(
  () => S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "OverrideProjectOwnersPolicyGrantDetail",
}) as any as S.Schema<OverrideProjectOwnersPolicyGrantDetail>;
export interface CreateGlossaryPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const CreateGlossaryPolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateGlossaryPolicyGrantDetail",
}) as any as S.Schema<CreateGlossaryPolicyGrantDetail>;
export interface CreateFormTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const CreateFormTypePolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateFormTypePolicyGrantDetail",
}) as any as S.Schema<CreateFormTypePolicyGrantDetail>;
export interface CreateAssetTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const CreateAssetTypePolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateAssetTypePolicyGrantDetail",
}) as any as S.Schema<CreateAssetTypePolicyGrantDetail>;
export interface CreateProjectPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export const CreateProjectPolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateProjectPolicyGrantDetail",
}) as any as S.Schema<CreateProjectPolicyGrantDetail>;
export interface CreateEnvironmentProfilePolicyGrantDetail {
  domainUnitId?: string;
}
export const CreateEnvironmentProfilePolicyGrantDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ domainUnitId: S.optional(S.String) }),
  ).annotate({
    identifier: "CreateEnvironmentProfilePolicyGrantDetail",
  }) as any as S.Schema<CreateEnvironmentProfilePolicyGrantDetail>;
export interface Unit {}
export const Unit = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "Unit",
}) as any as S.Schema<Unit>;
export type ProjectProfileList = string[];
export const ProjectProfileList = /*@__PURE__*/ S.Array(S.String);
export interface CreateProjectFromProjectProfilePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
  projectProfiles?: string[];
}
export const CreateProjectFromProjectProfilePolicyGrantDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      includeChildDomainUnits: S.optional(S.Boolean),
      projectProfiles: S.optional(ProjectProfileList),
    }),
  ).annotate({
    identifier: "CreateProjectFromProjectProfilePolicyGrantDetail",
  }) as any as S.Schema<CreateProjectFromProjectProfilePolicyGrantDetail>;
export interface UseAssetTypePolicyGrantDetail {
  domainUnitId?: string;
}
export const UseAssetTypePolicyGrantDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainUnitId: S.optional(S.String) }),
).annotate({
  identifier: "UseAssetTypePolicyGrantDetail",
}) as any as S.Schema<UseAssetTypePolicyGrantDetail>;
export type PolicyGrantDetail =
  | {
      createDomainUnit: CreateDomainUnitPolicyGrantDetail;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners: OverrideDomainUnitOwnersPolicyGrantDetail;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool: AddToProjectMemberPoolPolicyGrantDetail;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners: OverrideProjectOwnersPolicyGrantDetail;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary: CreateGlossaryPolicyGrantDetail;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType: CreateFormTypePolicyGrantDetail;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType: CreateAssetTypePolicyGrantDetail;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject: CreateProjectPolicyGrantDetail;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile: CreateEnvironmentProfilePolicyGrantDetail;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile: Unit;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment: Unit;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint: Unit;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile: CreateProjectFromProjectProfilePolicyGrantDetail;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType: UseAssetTypePolicyGrantDetail;
    };
export const PolicyGrantDetail = /*@__PURE__*/ S.Union([
  S.Struct({ createDomainUnit: CreateDomainUnitPolicyGrantDetail }),
  S.Struct({
    overrideDomainUnitOwners: OverrideDomainUnitOwnersPolicyGrantDetail,
  }),
  S.Struct({ addToProjectMemberPool: AddToProjectMemberPoolPolicyGrantDetail }),
  S.Struct({ overrideProjectOwners: OverrideProjectOwnersPolicyGrantDetail }),
  S.Struct({ createGlossary: CreateGlossaryPolicyGrantDetail }),
  S.Struct({ createFormType: CreateFormTypePolicyGrantDetail }),
  S.Struct({ createAssetType: CreateAssetTypePolicyGrantDetail }),
  S.Struct({ createProject: CreateProjectPolicyGrantDetail }),
  S.Struct({
    createEnvironmentProfile: CreateEnvironmentProfilePolicyGrantDetail,
  }),
  S.Struct({ delegateCreateEnvironmentProfile: Unit }),
  S.Struct({ createEnvironment: Unit }),
  S.Struct({ createEnvironmentFromBlueprint: Unit }),
  S.Struct({
    createProjectFromProjectProfile:
      CreateProjectFromProjectProfilePolicyGrantDetail,
  }),
  S.Struct({ useAssetType: UseAssetTypePolicyGrantDetail }),
]);
export interface AddPolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  detail: PolicyGrantDetail;
  clientToken?: string;
}
export const AddPolicyGrantInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: TargetEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    policyType: ManagedPolicyType,
    principal: PolicyGrantPrincipal,
    detail: PolicyGrantDetail,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/addGrant",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddPolicyGrantInput",
}) as any as S.Schema<AddPolicyGrantInput>;
export type GrantIdentifier = string;
export interface AddPolicyGrantOutput {
  grantId?: string;
}
export const AddPolicyGrantOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ grantId: S.optional(S.String) }),
).annotate({
  identifier: "AddPolicyGrantOutput",
}) as any as S.Schema<AddPolicyGrantOutput>;
export type EnvironmentId = string;
export interface AssociateEnvironmentRoleInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  environmentRoleArn: string;
}
export const AssociateEnvironmentRoleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    environmentRoleArn: S.String.pipe(T.HttpLabel("environmentRoleArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateEnvironmentRoleInput",
}) as any as S.Schema<AssociateEnvironmentRoleInput>;
export interface AssociateEnvironmentRoleOutput {}
export const AssociateEnvironmentRoleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateEnvironmentRoleOutput",
}) as any as S.Schema<AssociateEnvironmentRoleOutput>;
export type EntityIdentifier = string;
export type GovernedEntityType = "ASSET" | (string & {});
export const GovernedEntityType = /*@__PURE__*/ S.String;

export type GlossaryTermId = string;
export type GovernedGlossaryTerms = string[];
export const GovernedGlossaryTerms = /*@__PURE__*/ S.Array(S.String);
export interface AssociateGovernedTermsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: GovernedEntityType;
  governedGlossaryTerms: string[];
}
export const AssociateGovernedTermsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: GovernedEntityType.pipe(T.HttpLabel("entityType")),
    governedGlossaryTerms: GovernedGlossaryTerms,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/associate-governed-terms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateGovernedTermsInput",
}) as any as S.Schema<AssociateGovernedTermsInput>;
export interface AssociateGovernedTermsOutput {}
export const AssociateGovernedTermsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateGovernedTermsOutput",
}) as any as S.Schema<AssociateGovernedTermsOutput>;
export type AttributeEntityType = "ASSET" | "LISTING" | (string & {});
export const AttributeEntityType = /*@__PURE__*/ S.String;

export type EntityId = string;
export type AttributeIdentifier = string;
export type AttributesList = string[];
export const AttributesList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetAttributesMetadataInput {
  domainIdentifier: string;
  entityType: AttributeEntityType;
  entityIdentifier: string;
  entityRevision?: string;
  attributeIdentifiers: string[];
}
export const BatchGetAttributesMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: AttributeEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityRevision: S.optional(S.String).pipe(T.HttpQuery("entityRevision")),
    attributeIdentifiers: AttributesList.pipe(
      T.HttpQuery("attributeIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetAttributesMetadataInput",
}) as any as S.Schema<BatchGetAttributesMetadataInput>;
export type FormOutputList = FormOutput[];
export const FormOutputList = /*@__PURE__*/ S.Array(FormOutput);
export interface BatchGetAttributeOutput {
  attributeIdentifier: string;
  forms?: FormOutput[];
}
export const BatchGetAttributeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeIdentifier: S.String,
    forms: S.optional(FormOutputList),
  }),
).annotate({
  identifier: "BatchGetAttributeOutput",
}) as any as S.Schema<BatchGetAttributeOutput>;
export type BatchGetAttributeItems = BatchGetAttributeOutput[];
export const BatchGetAttributeItems = /*@__PURE__*/ S.Array(
  BatchGetAttributeOutput,
);
export interface AttributeError {
  attributeIdentifier: string;
  code: string;
  message: string;
}
export const AttributeError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeIdentifier: S.String,
    code: S.String,
    message: S.String,
  }),
).annotate({ identifier: "AttributeError" }) as any as S.Schema<AttributeError>;
export type AttributesErrors = AttributeError[];
export const AttributesErrors = /*@__PURE__*/ S.Array(AttributeError);
export interface BatchGetAttributesMetadataOutput {
  attributes?: BatchGetAttributeOutput[];
  errors: AttributeError[];
}
export const BatchGetAttributesMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: S.optional(BatchGetAttributeItems),
    errors: AttributesErrors,
  }),
).annotate({
  identifier: "BatchGetAttributesMetadataOutput",
}) as any as S.Schema<BatchGetAttributesMetadataOutput>;
export type FormTypeIdentifier = string;
export type RevisionInput = string;
export interface FormInput {
  formName: string;
  typeIdentifier?: string;
  typeRevision?: string;
  content?: string;
}
export const FormInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formName: S.String,
    typeIdentifier: S.optional(S.String),
    typeRevision: S.optional(S.String),
    content: S.optional(S.String),
  }),
).annotate({ identifier: "FormInput" }) as any as S.Schema<FormInput>;
export type FormInputList = FormInput[];
export const FormInputList = /*@__PURE__*/ S.Array(FormInput);
export interface AttributeInput {
  attributeIdentifier: string;
  forms: FormInput[];
}
export const AttributeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributeIdentifier: S.String, forms: FormInputList }),
).annotate({ identifier: "AttributeInput" }) as any as S.Schema<AttributeInput>;
export type Attributes = AttributeInput[];
export const Attributes = /*@__PURE__*/ S.Array(AttributeInput);
export interface BatchPutAttributesMetadataInput {
  domainIdentifier: string;
  entityType: AttributeEntityType;
  entityIdentifier: string;
  clientToken?: string;
  attributes: AttributeInput[];
}
export const BatchPutAttributesMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: AttributeEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    attributes: Attributes,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutAttributesMetadataInput",
}) as any as S.Schema<BatchPutAttributesMetadataInput>;
export interface BatchPutAttributeOutput {
  attributeIdentifier: string;
}
export const BatchPutAttributeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributeIdentifier: S.String }),
).annotate({
  identifier: "BatchPutAttributeOutput",
}) as any as S.Schema<BatchPutAttributeOutput>;
export type BatchPutAttributeItems = BatchPutAttributeOutput[];
export const BatchPutAttributeItems = /*@__PURE__*/ S.Array(
  BatchPutAttributeOutput,
);
export interface BatchPutAttributesMetadataOutput {
  errors?: AttributeError[];
  attributes?: BatchPutAttributeOutput[];
}
export const BatchPutAttributesMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errors: S.optional(AttributesErrors),
    attributes: S.optional(BatchPutAttributeItems),
  }),
).annotate({
  identifier: "BatchPutAttributesMetadataOutput",
}) as any as S.Schema<BatchPutAttributesMetadataOutput>;
export type MetadataGenerationRunIdentifier = string;
export interface CancelMetadataGenerationRunInput {
  domainIdentifier: string;
  identifier: string;
}
export const CancelMetadataGenerationRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMetadataGenerationRunInput",
}) as any as S.Schema<CancelMetadataGenerationRunInput>;
export interface CancelMetadataGenerationRunOutput {}
export const CancelMetadataGenerationRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelMetadataGenerationRunOutput",
}) as any as S.Schema<CancelMetadataGenerationRunOutput>;
export interface CancelSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
}
export const CancelSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSubscriptionInput",
}) as any as S.Schema<CancelSubscriptionInput>;
export type SubscriptionStatus =
  | "APPROVED"
  | "REVOKED"
  | "CANCELLED"
  | (string & {});
export const SubscriptionStatus = /*@__PURE__*/ S.String;

export interface CancelSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export const CancelSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    subscribedPrincipal: SubscribedPrincipal,
    subscribedListing: SubscribedListing,
    subscriptionRequestId: S.optional(S.String),
    retainPermissions: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CancelSubscriptionOutput",
}) as any as S.Schema<CancelSubscriptionOutput>;
export type AccountPoolName = string | redacted.Redacted<string>;
export type ResolutionStrategy = "MANUAL" | (string & {});
export const ResolutionStrategy = /*@__PURE__*/ S.String;

export type AwsAccountId = string;
export type AwsRegion = string;
export type AwsRegionList = string[];
export const AwsRegionList = /*@__PURE__*/ S.Array(S.String);
export type AwsAccountName = string | redacted.Redacted<string>;
export interface AccountInfo {
  awsAccountId: string;
  supportedRegions: string[];
  awsAccountName?: string | redacted.Redacted<string>;
}
export const AccountInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsAccountId: S.String,
    supportedRegions: AwsRegionList,
    awsAccountName: S.optional(SensitiveString),
  }),
).annotate({ identifier: "AccountInfo" }) as any as S.Schema<AccountInfo>;
export type AccountInfoList = AccountInfo[];
export const AccountInfoList = /*@__PURE__*/ S.Array(AccountInfo);
export type LambdaFunctionArn = string;
export type LambdaExecutionRoleArn = string;
export interface CustomAccountPoolHandler {
  lambdaFunctionArn: string;
  lambdaExecutionRoleArn?: string;
}
export const CustomAccountPoolHandler = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lambdaFunctionArn: S.String,
    lambdaExecutionRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomAccountPoolHandler",
}) as any as S.Schema<CustomAccountPoolHandler>;
export type AccountSource =
  | { accounts: AccountInfo[]; customAccountPoolHandler?: never }
  | { accounts?: never; customAccountPoolHandler: CustomAccountPoolHandler };
export const AccountSource = /*@__PURE__*/ S.Union([
  S.Struct({ accounts: AccountInfoList }),
  S.Struct({ customAccountPoolHandler: CustomAccountPoolHandler }),
]);
export interface CreateAccountPoolInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy: ResolutionStrategy;
  accountSource: AccountSource;
}
export const CreateAccountPoolInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    resolutionStrategy: ResolutionStrategy,
    accountSource: AccountSource,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/account-pools",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccountPoolInput",
}) as any as S.Schema<CreateAccountPoolInput>;
export type AccountPoolId = string;
export interface CreateAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export const CreateAccountPoolOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    name: S.optional(SensitiveString),
    id: S.optional(S.String),
    description: S.optional(SensitiveString),
    resolutionStrategy: S.optional(ResolutionStrategy),
    accountSource: AccountSource,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAccountPoolOutput",
}) as any as S.Schema<CreateAccountPoolOutput>;
export type AssetName = string | redacted.Redacted<string>;
export type ExternalIdentifier = string;
export type AssetTypeIdentifier = string;
export type GlossaryTerms = string[];
export const GlossaryTerms = /*@__PURE__*/ S.Array(S.String);
export interface BusinessNameGenerationConfiguration {
  enabled?: boolean;
}
export const BusinessNameGenerationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "BusinessNameGenerationConfiguration",
}) as any as S.Schema<BusinessNameGenerationConfiguration>;
export interface PredictionConfiguration {
  businessNameGeneration?: BusinessNameGenerationConfiguration;
}
export const PredictionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    businessNameGeneration: S.optional(BusinessNameGenerationConfiguration),
  }),
).annotate({
  identifier: "PredictionConfiguration",
}) as any as S.Schema<PredictionConfiguration>;
export interface CreateAssetInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  externalIdentifier?: string;
  typeIdentifier: string;
  typeRevision?: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  owningProjectIdentifier: string;
  predictionConfiguration?: PredictionConfiguration;
  clientToken?: string;
}
export const CreateAssetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    externalIdentifier: S.optional(S.String),
    typeIdentifier: S.String,
    typeRevision: S.optional(S.String),
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    formsInput: S.optional(FormInputList),
    owningProjectIdentifier: S.String,
    predictionConfiguration: S.optional(PredictionConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetInput",
}) as any as S.Schema<CreateAssetInput>;
export type ListingStatus = "CREATING" | "ACTIVE" | "INACTIVE" | (string & {});
export const ListingStatus = /*@__PURE__*/ S.String;

export interface AssetListingDetails {
  listingId: string;
  listingStatus: ListingStatus;
}
export const AssetListingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ listingId: S.String, listingStatus: ListingStatus }),
).annotate({
  identifier: "AssetListingDetails",
}) as any as S.Schema<AssetListingDetails>;
export type TimeSeriesFormName = string;
export type DataPointIdentifier = string;
export interface TimeSeriesDataPointSummaryFormOutput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  contentSummary?: string;
  id?: string;
}
export const TimeSeriesDataPointSummaryFormOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      formName: S.String,
      typeIdentifier: S.String,
      typeRevision: S.optional(S.String),
      timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      contentSummary: S.optional(S.String),
      id: S.optional(S.String),
    }),
).annotate({
  identifier: "TimeSeriesDataPointSummaryFormOutput",
}) as any as S.Schema<TimeSeriesDataPointSummaryFormOutput>;
export type TimeSeriesDataPointSummaryFormOutputList =
  TimeSeriesDataPointSummaryFormOutput[];
export const TimeSeriesDataPointSummaryFormOutputList = /*@__PURE__*/ S.Array(
  TimeSeriesDataPointSummaryFormOutput,
);
export interface CreateAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  predictionConfiguration?: PredictionConfiguration;
}
export const CreateAssetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    typeIdentifier: S.String,
    typeRevision: S.String,
    externalIdentifier: S.optional(S.String),
    revision: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
    glossaryTerms: S.optional(GlossaryTerms),
    governedGlossaryTerms: S.optional(GovernedGlossaryTerms),
    owningProjectId: S.String,
    domainId: S.String,
    listing: S.optional(AssetListingDetails),
    formsOutput: FormOutputList,
    readOnlyFormsOutput: S.optional(FormOutputList),
    latestTimeSeriesDataPointFormsOutput: S.optional(
      TimeSeriesDataPointSummaryFormOutputList,
    ),
    predictionConfiguration: S.optional(PredictionConfiguration),
  }),
).annotate({
  identifier: "CreateAssetOutput",
}) as any as S.Schema<CreateAssetOutput>;
export type FilterName = string | redacted.Redacted<string>;
export type ColumnNameList = string[];
export const ColumnNameList = /*@__PURE__*/ S.Array(S.String);
export interface ColumnFilterConfiguration {
  includedColumnNames?: string[];
}
export const ColumnFilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includedColumnNames: S.optional(ColumnNameList) }),
).annotate({
  identifier: "ColumnFilterConfiguration",
}) as any as S.Schema<ColumnFilterConfiguration>;
export interface EqualToExpression {
  columnName: string;
  value: string;
}
export const EqualToExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "EqualToExpression",
}) as any as S.Schema<EqualToExpression>;
export interface NotEqualToExpression {
  columnName: string;
  value: string;
}
export const NotEqualToExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "NotEqualToExpression",
}) as any as S.Schema<NotEqualToExpression>;
export interface GreaterThanExpression {
  columnName: string;
  value: string;
}
export const GreaterThanExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "GreaterThanExpression",
}) as any as S.Schema<GreaterThanExpression>;
export interface LessThanExpression {
  columnName: string;
  value: string;
}
export const LessThanExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "LessThanExpression",
}) as any as S.Schema<LessThanExpression>;
export interface GreaterThanOrEqualToExpression {
  columnName: string;
  value: string;
}
export const GreaterThanOrEqualToExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "GreaterThanOrEqualToExpression",
}) as any as S.Schema<GreaterThanOrEqualToExpression>;
export interface LessThanOrEqualToExpression {
  columnName: string;
  value: string;
}
export const LessThanOrEqualToExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "LessThanOrEqualToExpression",
}) as any as S.Schema<LessThanOrEqualToExpression>;
export interface IsNullExpression {
  columnName: string;
}
export const IsNullExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String }),
).annotate({
  identifier: "IsNullExpression",
}) as any as S.Schema<IsNullExpression>;
export interface IsNotNullExpression {
  columnName: string;
}
export const IsNotNullExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String }),
).annotate({
  identifier: "IsNotNullExpression",
}) as any as S.Schema<IsNotNullExpression>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface InExpression {
  columnName: string;
  values: string[];
}
export const InExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, values: StringList }),
).annotate({ identifier: "InExpression" }) as any as S.Schema<InExpression>;
export interface NotInExpression {
  columnName: string;
  values: string[];
}
export const NotInExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, values: StringList }),
).annotate({
  identifier: "NotInExpression",
}) as any as S.Schema<NotInExpression>;
export interface LikeExpression {
  columnName: string;
  value: string;
}
export const LikeExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({ identifier: "LikeExpression" }) as any as S.Schema<LikeExpression>;
export interface NotLikeExpression {
  columnName: string;
  value: string;
}
export const NotLikeExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnName: S.String, value: S.String }),
).annotate({
  identifier: "NotLikeExpression",
}) as any as S.Schema<NotLikeExpression>;
export type RowFilterExpression =
  | {
      equalTo: EqualToExpression;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo: NotEqualToExpression;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan: GreaterThanExpression;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan: LessThanExpression;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo: GreaterThanOrEqualToExpression;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo: LessThanOrEqualToExpression;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull: IsNullExpression;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull: IsNotNullExpression;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in: InExpression;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn: NotInExpression;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like: LikeExpression;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike: NotLikeExpression;
    };
export const RowFilterExpression = /*@__PURE__*/ S.Union([
  S.Struct({ equalTo: EqualToExpression }),
  S.Struct({ notEqualTo: NotEqualToExpression }),
  S.Struct({ greaterThan: GreaterThanExpression }),
  S.Struct({ lessThan: LessThanExpression }),
  S.Struct({ greaterThanOrEqualTo: GreaterThanOrEqualToExpression }),
  S.Struct({ lessThanOrEqualTo: LessThanOrEqualToExpression }),
  S.Struct({ isNull: IsNullExpression }),
  S.Struct({ isNotNull: IsNotNullExpression }),
  S.Struct({ in: InExpression }),
  S.Struct({ notIn: NotInExpression }),
  S.Struct({ like: LikeExpression }),
  S.Struct({ notLike: NotLikeExpression }),
]);
export type RowFilterList = RowFilter[];
export const RowFilterList = /*@__PURE__*/ S.Array(
  S.suspend(() => RowFilter).annotate({ identifier: "RowFilter" }),
) as any as S.Schema<RowFilterList>;
export type RowFilter =
  | { expression: RowFilterExpression; and?: never; or?: never }
  | { expression?: never; and: RowFilter[]; or?: never }
  | { expression?: never; and?: never; or: RowFilter[] };
export const RowFilter = /*@__PURE__*/ S.Union([
  S.Struct({ expression: RowFilterExpression }),
  S.Struct({
    and: S.suspend(() => RowFilterList).annotate({
      identifier: "RowFilterList",
    }),
  }),
  S.Struct({
    or: S.suspend(() => RowFilterList).annotate({
      identifier: "RowFilterList",
    }),
  }),
]) as any as S.Schema<RowFilter>;
export interface RowFilterConfiguration {
  rowFilter: RowFilter;
  sensitive?: boolean;
}
export const RowFilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rowFilter: RowFilter, sensitive: S.optional(S.Boolean) }),
).annotate({
  identifier: "RowFilterConfiguration",
}) as any as S.Schema<RowFilterConfiguration>;
export type AssetFilterConfiguration =
  | { columnConfiguration: ColumnFilterConfiguration; rowConfiguration?: never }
  | { columnConfiguration?: never; rowConfiguration: RowFilterConfiguration };
export const AssetFilterConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ columnConfiguration: ColumnFilterConfiguration }),
  S.Struct({ rowConfiguration: RowFilterConfiguration }),
]);
export interface CreateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  configuration: AssetFilterConfiguration;
  clientToken?: string;
}
export const CreateAssetFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    configuration: AssetFilterConfiguration,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetFilterInput",
}) as any as S.Schema<CreateAssetFilterInput>;
export type FilterStatus = "VALID" | "INVALID" | (string & {});
export const FilterStatus = /*@__PURE__*/ S.String;

export interface CreateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export const CreateAssetFilterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    assetId: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(FilterStatus),
    configuration: AssetFilterConfiguration,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorMessage: S.optional(S.String),
    effectiveColumnNames: S.optional(ColumnNameList),
    effectiveRowFilter: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAssetFilterOutput",
}) as any as S.Schema<CreateAssetFilterOutput>;
export interface CreateAssetRevisionInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  identifier: string;
  typeRevision?: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  predictionConfiguration?: PredictionConfiguration;
  clientToken?: string;
}
export const CreateAssetRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    typeRevision: S.optional(S.String),
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    formsInput: S.optional(FormInputList),
    predictionConfiguration: S.optional(PredictionConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetRevisionInput",
}) as any as S.Schema<CreateAssetRevisionInput>;
export interface CreateAssetRevisionOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  predictionConfiguration?: PredictionConfiguration;
}
export const CreateAssetRevisionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    typeIdentifier: S.String,
    typeRevision: S.String,
    externalIdentifier: S.optional(S.String),
    revision: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
    glossaryTerms: S.optional(GlossaryTerms),
    governedGlossaryTerms: S.optional(GovernedGlossaryTerms),
    owningProjectId: S.String,
    domainId: S.String,
    listing: S.optional(AssetListingDetails),
    formsOutput: FormOutputList,
    readOnlyFormsOutput: S.optional(FormOutputList),
    latestTimeSeriesDataPointFormsOutput: S.optional(
      TimeSeriesDataPointSummaryFormOutputList,
    ),
    predictionConfiguration: S.optional(PredictionConfiguration),
  }),
).annotate({
  identifier: "CreateAssetRevisionOutput",
}) as any as S.Schema<CreateAssetRevisionOutput>;
export interface FormEntryInput {
  typeIdentifier: string;
  typeRevision: string;
  required?: boolean;
}
export const FormEntryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeIdentifier: S.String,
    typeRevision: S.String,
    required: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FormEntryInput" }) as any as S.Schema<FormEntryInput>;
export type FormsInputMap = { [key: string]: FormEntryInput | undefined };
export const FormsInputMap = /*@__PURE__*/ S.Record(
  S.String,
  FormEntryInput.pipe(S.optional),
);
export interface CreateAssetTypeInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  formsInput: { [key: string]: FormEntryInput | undefined };
  owningProjectIdentifier: string;
}
export const CreateAssetTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: S.String,
    description: S.optional(SensitiveString),
    formsInput: FormsInputMap,
    owningProjectIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/asset-types",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetTypeInput",
}) as any as S.Schema<CreateAssetTypeInput>;
export interface FormEntryOutput {
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
  required?: boolean;
}
export const FormEntryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typeName: SensitiveString,
    typeRevision: S.String,
    required: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FormEntryOutput",
}) as any as S.Schema<FormEntryOutput>;
export type FormsOutputMap = { [key: string]: FormEntryOutput | undefined };
export const FormsOutputMap = /*@__PURE__*/ S.Record(
  S.String,
  FormEntryOutput.pipe(S.optional),
);
export interface CreateAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const CreateAssetTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.String,
    revision: S.String,
    description: S.optional(SensitiveString),
    formsOutput: FormsOutputMap,
    owningProjectId: S.optional(S.String),
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAssetTypeOutput",
}) as any as S.Schema<CreateAssetTypeOutput>;
export type ConnectionId = string;
export interface AwsLocation {
  accessRole?: string;
  awsAccountId?: string;
  awsRegion?: string;
  iamConnectionId?: string;
}
export const AwsLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessRole: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    awsRegion: S.optional(S.String),
    iamConnectionId: S.optional(S.String),
  }),
).annotate({ identifier: "AwsLocation" }) as any as S.Schema<AwsLocation>;
export type PropertyMap = { [key: string]: string | undefined };
export const PropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Configuration {
  classification?: string;
  properties?: { [key: string]: string | undefined };
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    classification: S.optional(S.String),
    properties: S.optional(PropertyMap),
  }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type Configurations = Configuration[];
export const Configurations = /*@__PURE__*/ S.Array(Configuration);
export type ConnectionName = string;
export interface AthenaPropertiesInput {
  workgroupName?: string;
}
export const AthenaPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.optional(S.String) }),
).annotate({
  identifier: "AthenaPropertiesInput",
}) as any as S.Schema<AthenaPropertiesInput>;
export type ConnectionProperties = { [key: string]: string | undefined };
export const ConnectionProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface PhysicalConnectionRequirements {
  subnetId?: string;
  subnetIdList?: string[];
  securityGroupIdList?: string[];
  availabilityZone?: string;
}
export const PhysicalConnectionRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetId: S.optional(S.String),
    subnetIdList: S.optional(SubnetIdList),
    securityGroupIdList: S.optional(SecurityGroupIdList),
    availabilityZone: S.optional(S.String),
  }),
).annotate({
  identifier: "PhysicalConnectionRequirements",
}) as any as S.Schema<PhysicalConnectionRequirements>;
export type GlueConnectionType =
  | "SNOWFLAKE"
  | "BIGQUERY"
  | "DOCUMENTDB"
  | "DYNAMODB"
  | "MYSQL"
  | "OPENSEARCH"
  | "ORACLE"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "SAPHANA"
  | "SQLSERVER"
  | "TERADATA"
  | "VERTICA"
  | (string & {});
export const GlueConnectionType = /*@__PURE__*/ S.String;

export type ComputeEnvironments = "SPARK" | "ATHENA" | "PYTHON" | (string & {});
export const ComputeEnvironments = /*@__PURE__*/ S.String;

export type ComputeEnvironmentsList = ComputeEnvironments[];
export const ComputeEnvironmentsList =
  /*@__PURE__*/ S.Array(ComputeEnvironments);
export type AuthenticationType = "BASIC" | "OAUTH2" | "CUSTOM" | (string & {});
export const AuthenticationType = /*@__PURE__*/ S.String;

export type OAuth2GrantType =
  | "AUTHORIZATION_CODE"
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | (string & {});
export const OAuth2GrantType = /*@__PURE__*/ S.String;

export interface OAuth2ClientApplication {
  userManagedClientApplicationClientId?: string;
  aWSManagedClientApplicationReference?: string;
}
export const OAuth2ClientApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userManagedClientApplicationClientId: S.optional(S.String),
    aWSManagedClientApplicationReference: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuth2ClientApplication",
}) as any as S.Schema<OAuth2ClientApplication>;
export type TokenUrlParametersMap = { [key: string]: string | undefined };
export const TokenUrlParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuthorizationCodeProperties {
  authorizationCode?: string;
  redirectUri?: string;
}
export const AuthorizationCodeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationCode: S.optional(S.String),
    redirectUri: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthorizationCodeProperties",
}) as any as S.Schema<AuthorizationCodeProperties>;
export interface GlueOAuth2Credentials {
  userManagedClientApplicationClientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  jwtToken?: string;
}
export const GlueOAuth2Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userManagedClientApplicationClientSecret: S.optional(S.String),
    accessToken: S.optional(S.String),
    refreshToken: S.optional(S.String),
    jwtToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GlueOAuth2Credentials",
}) as any as S.Schema<GlueOAuth2Credentials>;
export interface OAuth2Properties {
  oAuth2GrantType?: OAuth2GrantType;
  oAuth2ClientApplication?: OAuth2ClientApplication;
  tokenUrl?: string;
  tokenUrlParametersMap?: { [key: string]: string | undefined };
  authorizationCodeProperties?: AuthorizationCodeProperties;
  oAuth2Credentials?: GlueOAuth2Credentials;
}
export const OAuth2Properties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oAuth2GrantType: S.optional(OAuth2GrantType),
    oAuth2ClientApplication: S.optional(OAuth2ClientApplication),
    tokenUrl: S.optional(S.String),
    tokenUrlParametersMap: S.optional(TokenUrlParametersMap),
    authorizationCodeProperties: S.optional(AuthorizationCodeProperties),
    oAuth2Credentials: S.optional(GlueOAuth2Credentials),
  }),
).annotate({
  identifier: "OAuth2Properties",
}) as any as S.Schema<OAuth2Properties>;
export interface BasicAuthenticationCredentials {
  userName?: string;
  password?: string;
}
export const BasicAuthenticationCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userName: S.optional(S.String), password: S.optional(S.String) }),
).annotate({
  identifier: "BasicAuthenticationCredentials",
}) as any as S.Schema<BasicAuthenticationCredentials>;
export type CredentialMap = { [key: string]: string | undefined };
export const CredentialMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuthenticationConfigurationInput {
  authenticationType?: AuthenticationType;
  oAuth2Properties?: OAuth2Properties;
  secretArn?: string;
  kmsKeyArn?: string;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials;
  customAuthenticationCredentials?: { [key: string]: string | undefined };
}
export const AuthenticationConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authenticationType: S.optional(AuthenticationType),
    oAuth2Properties: S.optional(OAuth2Properties),
    secretArn: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    basicAuthenticationCredentials: S.optional(BasicAuthenticationCredentials),
    customAuthenticationCredentials: S.optional(CredentialMap),
  }),
).annotate({
  identifier: "AuthenticationConfigurationInput",
}) as any as S.Schema<AuthenticationConfigurationInput>;
export interface GlueConnectionInput {
  connectionProperties?: { [key: string]: string | undefined };
  physicalConnectionRequirements?: PhysicalConnectionRequirements;
  name?: string;
  description?: string;
  connectionType?: GlueConnectionType;
  matchCriteria?: string;
  validateCredentials?: boolean;
  validateForComputeEnvironments?: ComputeEnvironments[];
  sparkProperties?: { [key: string]: string | undefined };
  athenaProperties?: { [key: string]: string | undefined };
  pythonProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationInput;
}
export const GlueConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionProperties: S.optional(ConnectionProperties),
    physicalConnectionRequirements: S.optional(PhysicalConnectionRequirements),
    name: S.optional(S.String),
    description: S.optional(S.String),
    connectionType: S.optional(GlueConnectionType),
    matchCriteria: S.optional(S.String),
    validateCredentials: S.optional(S.Boolean),
    validateForComputeEnvironments: S.optional(ComputeEnvironmentsList),
    sparkProperties: S.optional(PropertyMap),
    athenaProperties: S.optional(PropertyMap),
    pythonProperties: S.optional(PropertyMap),
    authenticationConfiguration: S.optional(AuthenticationConfigurationInput),
  }),
).annotate({
  identifier: "GlueConnectionInput",
}) as any as S.Schema<GlueConnectionInput>;
export interface GluePropertiesInput {
  glueConnectionInput?: GlueConnectionInput;
}
export const GluePropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueConnectionInput: S.optional(GlueConnectionInput) }),
).annotate({
  identifier: "GluePropertiesInput",
}) as any as S.Schema<GluePropertiesInput>;
export interface HyperPodPropertiesInput {
  clusterName: string;
}
export const HyperPodPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterName: S.String }),
).annotate({
  identifier: "HyperPodPropertiesInput",
}) as any as S.Schema<HyperPodPropertiesInput>;
export interface IamPropertiesInput {
  glueLineageSyncEnabled?: boolean;
}
export const IamPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "IamPropertiesInput",
}) as any as S.Schema<IamPropertiesInput>;
export type RedshiftStorageProperties =
  | { clusterName: string; workgroupName?: never }
  | { clusterName?: never; workgroupName: string };
export const RedshiftStorageProperties = /*@__PURE__*/ S.Union([
  S.Struct({ clusterName: S.String }),
  S.Struct({ workgroupName: S.String }),
]);
export type Password = string | redacted.Redacted<string>;
export type Username = string;
export interface UsernamePassword {
  password: string | redacted.Redacted<string>;
  username: string;
}
export const UsernamePassword = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ password: SensitiveString, username: S.String }),
).annotate({
  identifier: "UsernamePassword",
}) as any as S.Schema<UsernamePassword>;
export type RedshiftCredentials =
  | { secretArn: string; usernamePassword?: never }
  | { secretArn?: never; usernamePassword: UsernamePassword };
export const RedshiftCredentials = /*@__PURE__*/ S.Union([
  S.Struct({ secretArn: S.String }),
  S.Struct({ usernamePassword: UsernamePassword }),
]);
export interface LineageSyncSchedule {
  schedule?: string;
}
export const LineageSyncSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schedule: S.optional(S.String) }),
).annotate({
  identifier: "LineageSyncSchedule",
}) as any as S.Schema<LineageSyncSchedule>;
export interface RedshiftLineageSyncConfigurationInput {
  enabled?: boolean;
  schedule?: LineageSyncSchedule;
}
export const RedshiftLineageSyncConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      enabled: S.optional(S.Boolean),
      schedule: S.optional(LineageSyncSchedule),
    }),
).annotate({
  identifier: "RedshiftLineageSyncConfigurationInput",
}) as any as S.Schema<RedshiftLineageSyncConfigurationInput>;
export interface RedshiftPropertiesInput {
  storage?: RedshiftStorageProperties;
  databaseName?: string;
  host?: string;
  port?: number;
  credentials?: RedshiftCredentials;
  lineageSync?: RedshiftLineageSyncConfigurationInput;
}
export const RedshiftPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storage: S.optional(RedshiftStorageProperties),
    databaseName: S.optional(S.String),
    host: S.optional(S.String),
    port: S.optional(S.Number),
    credentials: S.optional(RedshiftCredentials),
    lineageSync: S.optional(RedshiftLineageSyncConfigurationInput),
  }),
).annotate({
  identifier: "RedshiftPropertiesInput",
}) as any as S.Schema<RedshiftPropertiesInput>;
export interface SparkEmrPropertiesInput {
  computeArn?: string;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  managedEndpointArn?: string;
}
export const SparkEmrPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeArn: S.optional(S.String),
    instanceProfileArn: S.optional(S.String),
    javaVirtualEnv: S.optional(S.String),
    logUri: S.optional(S.String),
    pythonVirtualEnv: S.optional(S.String),
    runtimeRole: S.optional(S.String),
    trustedCertificatesS3Uri: S.optional(S.String),
    managedEndpointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SparkEmrPropertiesInput",
}) as any as S.Schema<SparkEmrPropertiesInput>;
export interface SparkGlueArgs {
  connection?: string;
}
export const SparkGlueArgs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connection: S.optional(S.String) }),
).annotate({ identifier: "SparkGlueArgs" }) as any as S.Schema<SparkGlueArgs>;
export type GlueConnectionName = string;
export type GlueConnectionNames = string[];
export const GlueConnectionNames = /*@__PURE__*/ S.Array(S.String);
export interface SparkGluePropertiesInput {
  additionalArgs?: SparkGlueArgs;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueVersion?: string;
  idleTimeout?: number;
  javaVirtualEnv?: string;
  numberOfWorkers?: number;
  pythonVirtualEnv?: string;
  workerType?: string;
}
export const SparkGluePropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    additionalArgs: S.optional(SparkGlueArgs),
    glueConnectionName: S.optional(S.String),
    glueConnectionNames: S.optional(GlueConnectionNames),
    glueVersion: S.optional(S.String),
    idleTimeout: S.optional(S.Number),
    javaVirtualEnv: S.optional(S.String),
    numberOfWorkers: S.optional(S.Number),
    pythonVirtualEnv: S.optional(S.String),
    workerType: S.optional(S.String),
  }),
).annotate({
  identifier: "SparkGluePropertiesInput",
}) as any as S.Schema<SparkGluePropertiesInput>;
export type S3Uri = string;
export type S3AccessGrantLocationId = string;
export interface S3PropertiesInput {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
}
export const S3PropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    s3AccessGrantLocationId: S.optional(S.String),
    registerS3AccessGrantLocation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "S3PropertiesInput",
}) as any as S.Schema<S3PropertiesInput>;
export interface AmazonQPropertiesInput {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export const AmazonQPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isEnabled: S.Boolean,
    profileArn: S.optional(S.String),
    authMode: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonQPropertiesInput",
}) as any as S.Schema<AmazonQPropertiesInput>;
export interface MlflowPropertiesInput {
  trackingServerArn?: string;
}
export const MlflowPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trackingServerArn: S.optional(S.String) }),
).annotate({
  identifier: "MlflowPropertiesInput",
}) as any as S.Schema<MlflowPropertiesInput>;
export interface WorkflowsMwaaPropertiesInput {
  mwaaEnvironmentName?: string;
}
export const WorkflowsMwaaPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mwaaEnvironmentName: S.optional(S.String) }),
).annotate({
  identifier: "WorkflowsMwaaPropertiesInput",
}) as any as S.Schema<WorkflowsMwaaPropertiesInput>;
export interface WorkflowsServerlessPropertiesInput {}
export const WorkflowsServerlessPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "WorkflowsServerlessPropertiesInput",
}) as any as S.Schema<WorkflowsServerlessPropertiesInput>;
export interface LakehousePropertiesInput {
  glueLineageSyncEnabled?: boolean;
}
export const LakehousePropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "LakehousePropertiesInput",
}) as any as S.Schema<LakehousePropertiesInput>;
export type VpcId = string;
export type VpcConnectionSubnetIdList = string[];
export const VpcConnectionSubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export interface VpcPropertiesInput {
  vpcId: string;
  subnetIds: string[];
  securityGroupId?: string;
}
export const VpcPropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: VpcConnectionSubnetIdList,
    securityGroupId: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcPropertiesInput",
}) as any as S.Schema<VpcPropertiesInput>;
export type ConnectionPropertiesInput =
  | {
      athenaProperties: AthenaPropertiesInput;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesInput;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties: HyperPodPropertiesInput;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties: IamPropertiesInput;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesInput;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesInput;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties: SparkGluePropertiesInput;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties: S3PropertiesInput;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties: AmazonQPropertiesInput;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesInput;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesInput;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesInput;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties: LakehousePropertiesInput;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesInput;
    };
export const ConnectionPropertiesInput = /*@__PURE__*/ S.Union([
  S.Struct({ athenaProperties: AthenaPropertiesInput }),
  S.Struct({ glueProperties: GluePropertiesInput }),
  S.Struct({ hyperPodProperties: HyperPodPropertiesInput }),
  S.Struct({ iamProperties: IamPropertiesInput }),
  S.Struct({ redshiftProperties: RedshiftPropertiesInput }),
  S.Struct({ sparkEmrProperties: SparkEmrPropertiesInput }),
  S.Struct({ sparkGlueProperties: SparkGluePropertiesInput }),
  S.Struct({ s3Properties: S3PropertiesInput }),
  S.Struct({ amazonQProperties: AmazonQPropertiesInput }),
  S.Struct({ mlflowProperties: MlflowPropertiesInput }),
  S.Struct({ workflowsMwaaProperties: WorkflowsMwaaPropertiesInput }),
  S.Struct({
    workflowsServerlessProperties: WorkflowsServerlessPropertiesInput,
  }),
  S.Struct({ lakehouseProperties: LakehousePropertiesInput }),
  S.Struct({ vpcProperties: VpcPropertiesInput }),
]);
export type ConnectionScope = "DOMAIN" | "PROJECT" | (string & {});
export const ConnectionScope = /*@__PURE__*/ S.String;

export interface CreateConnectionInput {
  awsLocation?: AwsLocation;
  clientToken?: string;
  configurations?: Configuration[];
  description?: string | redacted.Redacted<string>;
  domainIdentifier: string;
  environmentIdentifier?: string;
  name: string;
  props?: ConnectionPropertiesInput;
  enableTrustedIdentityPropagation?: boolean;
  scope?: ConnectionScope;
}
export const CreateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsLocation: S.optional(AwsLocation),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    configurations: S.optional(Configurations),
    description: S.optional(SensitiveString),
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.optional(S.String),
    name: S.String,
    props: S.optional(ConnectionPropertiesInput),
    enableTrustedIdentityPropagation: S.optional(S.Boolean),
    scope: S.optional(ConnectionScope),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/connections",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectionInput",
}) as any as S.Schema<CreateConnectionInput>;
export type ConnectionType =
  | "ATHENA"
  | "BIGQUERY"
  | "DATABRICKS"
  | "DOCUMENTDB"
  | "DYNAMODB"
  | "HYPERPOD"
  | "IAM"
  | "MYSQL"
  | "OPENSEARCH"
  | "ORACLE"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "S3"
  | "SAPHANA"
  | "SNOWFLAKE"
  | "SPARK"
  | "SQLSERVER"
  | "TERADATA"
  | "VERTICA"
  | "WORKFLOWS_MWAA"
  | "AMAZON_Q"
  | "MLFLOW"
  | "VPC"
  | (string & {});
export const ConnectionType = /*@__PURE__*/ S.String;

export type MatchCriteria = string[];
export const MatchCriteria = /*@__PURE__*/ S.Array(S.String);
export type ConnectionStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "READY"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETED"
  | (string & {});
export const ConnectionStatus = /*@__PURE__*/ S.String;

export interface AuthenticationConfiguration {
  authenticationType?: AuthenticationType;
  secretArn?: string;
  oAuth2Properties?: OAuth2Properties;
}
export const AuthenticationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authenticationType: S.optional(AuthenticationType),
    secretArn: S.optional(S.String),
    oAuth2Properties: S.optional(OAuth2Properties),
  }),
).annotate({
  identifier: "AuthenticationConfiguration",
}) as any as S.Schema<AuthenticationConfiguration>;
export interface GlueConnection {
  name?: string;
  description?: string;
  connectionType?: ConnectionType;
  matchCriteria?: string[];
  connectionProperties?: { [key: string]: string | undefined };
  sparkProperties?: { [key: string]: string | undefined };
  athenaProperties?: { [key: string]: string | undefined };
  pythonProperties?: { [key: string]: string | undefined };
  physicalConnectionRequirements?: PhysicalConnectionRequirements;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastUpdatedBy?: string;
  status?: ConnectionStatus;
  statusReason?: string;
  lastConnectionValidationTime?: Date;
  authenticationConfiguration?: AuthenticationConfiguration;
  connectionSchemaVersion?: number;
  compatibleComputeEnvironments?: ComputeEnvironments[];
}
export const GlueConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    connectionType: S.optional(ConnectionType),
    matchCriteria: S.optional(MatchCriteria),
    connectionProperties: S.optional(ConnectionProperties),
    sparkProperties: S.optional(PropertyMap),
    athenaProperties: S.optional(PropertyMap),
    pythonProperties: S.optional(PropertyMap),
    physicalConnectionRequirements: S.optional(PhysicalConnectionRequirements),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedBy: S.optional(S.String),
    status: S.optional(ConnectionStatus),
    statusReason: S.optional(S.String),
    lastConnectionValidationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    authenticationConfiguration: S.optional(AuthenticationConfiguration),
    connectionSchemaVersion: S.optional(S.Number),
    compatibleComputeEnvironments: S.optional(ComputeEnvironmentsList),
  }),
).annotate({ identifier: "GlueConnection" }) as any as S.Schema<GlueConnection>;
export type Protocol =
  | "ATHENA"
  | "GLUE_INTERACTIVE_SESSION"
  | "HTTPS"
  | "JDBC"
  | "LIVY"
  | "ODBC"
  | "PRISM"
  | (string & {});
export const Protocol = /*@__PURE__*/ S.String;

export interface PhysicalEndpoint {
  awsLocation?: AwsLocation;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueConnection?: GlueConnection;
  enableTrustedIdentityPropagation?: boolean;
  host?: string;
  port?: number;
  protocol?: Protocol;
  stage?: string;
}
export const PhysicalEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsLocation: S.optional(AwsLocation),
    glueConnectionName: S.optional(S.String),
    glueConnectionNames: S.optional(GlueConnectionNames),
    glueConnection: S.optional(GlueConnection),
    enableTrustedIdentityPropagation: S.optional(S.Boolean),
    host: S.optional(S.String),
    port: S.optional(S.Number),
    protocol: S.optional(Protocol),
    stage: S.optional(S.String),
  }),
).annotate({
  identifier: "PhysicalEndpoint",
}) as any as S.Schema<PhysicalEndpoint>;
export type PhysicalEndpoints = PhysicalEndpoint[];
export const PhysicalEndpoints = /*@__PURE__*/ S.Array(PhysicalEndpoint);
export interface AthenaPropertiesOutput {
  workgroupName?: string;
}
export const AthenaPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.optional(S.String) }),
).annotate({
  identifier: "AthenaPropertiesOutput",
}) as any as S.Schema<AthenaPropertiesOutput>;
export interface GluePropertiesOutput {
  status?: ConnectionStatus;
  errorMessage?: string;
}
export const GluePropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ConnectionStatus),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GluePropertiesOutput",
}) as any as S.Schema<GluePropertiesOutput>;
export type HyperPodOrchestrator = "EKS" | "SLURM" | (string & {});
export const HyperPodOrchestrator = /*@__PURE__*/ S.String;

export interface HyperPodPropertiesOutput {
  clusterName: string;
  clusterArn?: string;
  orchestrator?: HyperPodOrchestrator;
}
export const HyperPodPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String,
    clusterArn: S.optional(S.String),
    orchestrator: S.optional(HyperPodOrchestrator),
  }),
).annotate({
  identifier: "HyperPodPropertiesOutput",
}) as any as S.Schema<HyperPodPropertiesOutput>;
export interface IamPropertiesOutput {
  environmentId?: string;
  glueLineageSyncEnabled?: boolean;
}
export const IamPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    glueLineageSyncEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IamPropertiesOutput",
}) as any as S.Schema<IamPropertiesOutput>;
export interface RedshiftLineageSyncConfigurationOutput {
  lineageJobId?: string;
  enabled?: boolean;
  schedule?: LineageSyncSchedule;
}
export const RedshiftLineageSyncConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      lineageJobId: S.optional(S.String),
      enabled: S.optional(S.Boolean),
      schedule: S.optional(LineageSyncSchedule),
    }),
).annotate({
  identifier: "RedshiftLineageSyncConfigurationOutput",
}) as any as S.Schema<RedshiftLineageSyncConfigurationOutput>;
export interface RedshiftPropertiesOutput {
  storage?: RedshiftStorageProperties;
  credentials?: RedshiftCredentials;
  isProvisionedSecret?: boolean;
  jdbcIamUrl?: string;
  jdbcUrl?: string;
  redshiftTempDir?: string;
  lineageSync?: RedshiftLineageSyncConfigurationOutput;
  status?: ConnectionStatus;
  databaseName?: string;
}
export const RedshiftPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storage: S.optional(RedshiftStorageProperties),
    credentials: S.optional(RedshiftCredentials),
    isProvisionedSecret: S.optional(S.Boolean),
    jdbcIamUrl: S.optional(S.String),
    jdbcUrl: S.optional(S.String),
    redshiftTempDir: S.optional(S.String),
    lineageSync: S.optional(RedshiftLineageSyncConfigurationOutput),
    status: S.optional(ConnectionStatus),
    databaseName: S.optional(S.String),
  }),
).annotate({
  identifier: "RedshiftPropertiesOutput",
}) as any as S.Schema<RedshiftPropertiesOutput>;
export type GovernanceType = "AWS_MANAGED" | "USER_MANAGED" | (string & {});
export const GovernanceType = /*@__PURE__*/ S.String;

export interface ManagedEndpointCredentials {
  id?: string;
  token?: string;
}
export const ManagedEndpointCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), token: S.optional(S.String) }),
).annotate({
  identifier: "ManagedEndpointCredentials",
}) as any as S.Schema<ManagedEndpointCredentials>;
export interface SparkEmrPropertiesOutput {
  computeArn?: string;
  credentials?: UsernamePassword;
  credentialsExpiration?: Date;
  governanceType?: GovernanceType;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  livyEndpoint?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  certificateData?: string;
  managedEndpointArn?: string;
  managedEndpointCredentials?: ManagedEndpointCredentials;
}
export const SparkEmrPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeArn: S.optional(S.String),
    credentials: S.optional(UsernamePassword),
    credentialsExpiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    governanceType: S.optional(GovernanceType),
    instanceProfileArn: S.optional(S.String),
    javaVirtualEnv: S.optional(S.String),
    livyEndpoint: S.optional(S.String),
    logUri: S.optional(S.String),
    pythonVirtualEnv: S.optional(S.String),
    runtimeRole: S.optional(S.String),
    trustedCertificatesS3Uri: S.optional(S.String),
    certificateData: S.optional(S.String),
    managedEndpointArn: S.optional(S.String),
    managedEndpointCredentials: S.optional(ManagedEndpointCredentials),
  }),
).annotate({
  identifier: "SparkEmrPropertiesOutput",
}) as any as S.Schema<SparkEmrPropertiesOutput>;
export interface SparkGluePropertiesOutput {
  additionalArgs?: SparkGlueArgs;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueVersion?: string;
  idleTimeout?: number;
  javaVirtualEnv?: string;
  numberOfWorkers?: number;
  pythonVirtualEnv?: string;
  workerType?: string;
}
export const SparkGluePropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    additionalArgs: S.optional(SparkGlueArgs),
    glueConnectionName: S.optional(S.String),
    glueConnectionNames: S.optional(GlueConnectionNames),
    glueVersion: S.optional(S.String),
    idleTimeout: S.optional(S.Number),
    javaVirtualEnv: S.optional(S.String),
    numberOfWorkers: S.optional(S.Number),
    pythonVirtualEnv: S.optional(S.String),
    workerType: S.optional(S.String),
  }),
).annotate({
  identifier: "SparkGluePropertiesOutput",
}) as any as S.Schema<SparkGluePropertiesOutput>;
export interface S3PropertiesOutput {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
  status?: ConnectionStatus;
  errorMessage?: string;
}
export const S3PropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    s3AccessGrantLocationId: S.optional(S.String),
    registerS3AccessGrantLocation: S.optional(S.Boolean),
    status: S.optional(ConnectionStatus),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "S3PropertiesOutput",
}) as any as S.Schema<S3PropertiesOutput>;
export interface AmazonQPropertiesOutput {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export const AmazonQPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isEnabled: S.Boolean,
    profileArn: S.optional(S.String),
    authMode: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonQPropertiesOutput",
}) as any as S.Schema<AmazonQPropertiesOutput>;
export interface MlflowPropertiesOutput {
  trackingServerArn?: string;
}
export const MlflowPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trackingServerArn: S.optional(S.String) }),
).annotate({
  identifier: "MlflowPropertiesOutput",
}) as any as S.Schema<MlflowPropertiesOutput>;
export interface WorkflowsMwaaPropertiesOutput {
  mwaaEnvironmentName?: string;
}
export const WorkflowsMwaaPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mwaaEnvironmentName: S.optional(S.String) }),
).annotate({
  identifier: "WorkflowsMwaaPropertiesOutput",
}) as any as S.Schema<WorkflowsMwaaPropertiesOutput>;
export interface WorkflowsServerlessPropertiesOutput {}
export const WorkflowsServerlessPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "WorkflowsServerlessPropertiesOutput",
}) as any as S.Schema<WorkflowsServerlessPropertiesOutput>;
export interface LakehousePropertiesOutput {
  glueLineageSyncEnabled?: boolean;
}
export const LakehousePropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "LakehousePropertiesOutput",
}) as any as S.Schema<LakehousePropertiesOutput>;
export interface VpcPropertiesOutput {
  vpcId: string;
  subnetIds: string[];
  status: ConnectionStatus;
  securityGroupId?: string;
  glueConnectionNames?: string[];
}
export const VpcPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: VpcConnectionSubnetIdList,
    status: ConnectionStatus,
    securityGroupId: S.optional(S.String),
    glueConnectionNames: S.optional(GlueConnectionNames),
  }),
).annotate({
  identifier: "VpcPropertiesOutput",
}) as any as S.Schema<VpcPropertiesOutput>;
export type ConnectionPropertiesOutput =
  | {
      athenaProperties: AthenaPropertiesOutput;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesOutput;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties: HyperPodPropertiesOutput;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties: IamPropertiesOutput;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesOutput;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesOutput;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties: SparkGluePropertiesOutput;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties: S3PropertiesOutput;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties: AmazonQPropertiesOutput;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesOutput;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesOutput;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesOutput;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties: LakehousePropertiesOutput;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesOutput;
    };
export const ConnectionPropertiesOutput = /*@__PURE__*/ S.Union([
  S.Struct({ athenaProperties: AthenaPropertiesOutput }),
  S.Struct({ glueProperties: GluePropertiesOutput }),
  S.Struct({ hyperPodProperties: HyperPodPropertiesOutput }),
  S.Struct({ iamProperties: IamPropertiesOutput }),
  S.Struct({ redshiftProperties: RedshiftPropertiesOutput }),
  S.Struct({ sparkEmrProperties: SparkEmrPropertiesOutput }),
  S.Struct({ sparkGlueProperties: SparkGluePropertiesOutput }),
  S.Struct({ s3Properties: S3PropertiesOutput }),
  S.Struct({ amazonQProperties: AmazonQPropertiesOutput }),
  S.Struct({ mlflowProperties: MlflowPropertiesOutput }),
  S.Struct({ workflowsMwaaProperties: WorkflowsMwaaPropertiesOutput }),
  S.Struct({
    workflowsServerlessProperties: WorkflowsServerlessPropertiesOutput,
  }),
  S.Struct({ lakehouseProperties: LakehousePropertiesOutput }),
  S.Struct({ vpcProperties: VpcPropertiesOutput }),
]);
export interface CreateConnectionOutput {
  connectionId: string;
  configurations?: Configuration[];
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export const CreateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionId: S.String,
    configurations: S.optional(Configurations),
    description: S.optional(SensitiveString),
    domainId: S.String,
    domainUnitId: S.String,
    environmentId: S.optional(S.String),
    name: S.String,
    physicalEndpoints: PhysicalEndpoints,
    projectId: S.optional(S.String),
    props: S.optional(ConnectionPropertiesOutput),
    type: ConnectionType,
    scope: S.optional(ConnectionScope),
  }),
).annotate({
  identifier: "CreateConnectionOutput",
}) as any as S.Schema<CreateConnectionOutput>;
export type DataProductName = string | redacted.Redacted<string>;
export type DataProductDescription = string | redacted.Redacted<string>;
export type DataProductItemType = "ASSET" | (string & {});
export const DataProductItemType = /*@__PURE__*/ S.String;

export type ItemGlossaryTerms = string[];
export const ItemGlossaryTerms = /*@__PURE__*/ S.Array(S.String);
export interface DataProductItem {
  itemType: DataProductItemType;
  identifier: string;
  revision?: string;
  glossaryTerms?: string[];
}
export const DataProductItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemType: DataProductItemType,
    identifier: S.String,
    revision: S.optional(S.String),
    glossaryTerms: S.optional(ItemGlossaryTerms),
  }),
).annotate({
  identifier: "DataProductItem",
}) as any as S.Schema<DataProductItem>;
export type DataProductItems = DataProductItem[];
export const DataProductItems = /*@__PURE__*/ S.Array(DataProductItem);
export interface CreateDataProductInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  owningProjectIdentifier: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  items?: DataProductItem[];
  clientToken?: string;
}
export const CreateDataProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    owningProjectIdentifier: S.String,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    formsInput: S.optional(FormInputList),
    items: S.optional(DataProductItems),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/data-products",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataProductInput",
}) as any as S.Schema<CreateDataProductInput>;
export type DataProductId = string;
export type DataProductStatus =
  | "CREATED"
  | "CREATING"
  | "CREATE_FAILED"
  | (string & {});
export const DataProductStatus = /*@__PURE__*/ S.String;

export interface CreateDataProductOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export const CreateDataProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    revision: S.String,
    owningProjectId: S.String,
    name: SensitiveString,
    status: DataProductStatus,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    items: S.optional(DataProductItems),
    formsOutput: S.optional(FormOutputList),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDataProductOutput",
}) as any as S.Schema<CreateDataProductOutput>;
export interface CreateDataProductRevisionInput {
  domainIdentifier: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsInput?: FormInput[];
  clientToken?: string;
}
export const CreateDataProductRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    items: S.optional(DataProductItems),
    formsInput: S.optional(FormInputList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataProductRevisionInput",
}) as any as S.Schema<CreateDataProductRevisionInput>;
export interface CreateDataProductRevisionOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export const CreateDataProductRevisionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    revision: S.String,
    owningProjectId: S.String,
    name: SensitiveString,
    status: DataProductStatus,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    items: S.optional(DataProductItems),
    formsOutput: S.optional(FormOutputList),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDataProductRevisionOutput",
}) as any as S.Schema<CreateDataProductRevisionOutput>;
export type Name = string | redacted.Redacted<string>;
export type DataSourceType = string;
export type FilterExpressionType = "INCLUDE" | "EXCLUDE" | (string & {});
export const FilterExpressionType = /*@__PURE__*/ S.String;

export interface FilterExpression {
  type: FilterExpressionType;
  expression: string;
}
export const FilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: FilterExpressionType, expression: S.String }),
).annotate({
  identifier: "FilterExpression",
}) as any as S.Schema<FilterExpression>;
export type FilterExpressions = FilterExpression[];
export const FilterExpressions = /*@__PURE__*/ S.Array(FilterExpression);
export interface RelationalFilterConfiguration {
  databaseName: string;
  schemaName?: string;
  filterExpressions?: FilterExpression[];
}
export const RelationalFilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    databaseName: S.String,
    schemaName: S.optional(S.String),
    filterExpressions: S.optional(FilterExpressions),
  }),
).annotate({
  identifier: "RelationalFilterConfiguration",
}) as any as S.Schema<RelationalFilterConfiguration>;
export type RelationalFilterConfigurations = RelationalFilterConfiguration[];
export const RelationalFilterConfigurations = /*@__PURE__*/ S.Array(
  RelationalFilterConfiguration,
);
export interface GlueRunConfigurationInput {
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean;
  catalogName?: string;
}
export const GlueRunConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataAccessRole: S.optional(S.String),
    relationalFilterConfigurations: RelationalFilterConfigurations,
    autoImportDataQualityResult: S.optional(S.Boolean),
    catalogName: S.optional(S.String),
  }),
).annotate({
  identifier: "GlueRunConfigurationInput",
}) as any as S.Schema<GlueRunConfigurationInput>;
export interface RedshiftCredentialConfiguration {
  secretManagerArn: string;
}
export const RedshiftCredentialConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretManagerArn: S.String }),
).annotate({
  identifier: "RedshiftCredentialConfiguration",
}) as any as S.Schema<RedshiftCredentialConfiguration>;
export interface RedshiftClusterStorage {
  clusterName: string;
}
export const RedshiftClusterStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterName: S.String }),
).annotate({
  identifier: "RedshiftClusterStorage",
}) as any as S.Schema<RedshiftClusterStorage>;
export interface RedshiftServerlessStorage {
  workgroupName: string;
}
export const RedshiftServerlessStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.String }),
).annotate({
  identifier: "RedshiftServerlessStorage",
}) as any as S.Schema<RedshiftServerlessStorage>;
export type RedshiftStorage =
  | {
      redshiftClusterSource: RedshiftClusterStorage;
      redshiftServerlessSource?: never;
    }
  | {
      redshiftClusterSource?: never;
      redshiftServerlessSource: RedshiftServerlessStorage;
    };
export const RedshiftStorage = /*@__PURE__*/ S.Union([
  S.Struct({ redshiftClusterSource: RedshiftClusterStorage }),
  S.Struct({ redshiftServerlessSource: RedshiftServerlessStorage }),
]);
export interface RedshiftRunConfigurationInput {
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration;
  redshiftStorage?: RedshiftStorage;
}
export const RedshiftRunConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataAccessRole: S.optional(S.String),
    relationalFilterConfigurations: RelationalFilterConfigurations,
    redshiftCredentialConfiguration: S.optional(
      RedshiftCredentialConfiguration,
    ),
    redshiftStorage: S.optional(RedshiftStorage),
  }),
).annotate({
  identifier: "RedshiftRunConfigurationInput",
}) as any as S.Schema<RedshiftRunConfigurationInput>;
export type SageMakerAssetType = string;
export type SageMakerResourceArn = string;
export type TrackingAssetArns = string[];
export const TrackingAssetArns = /*@__PURE__*/ S.Array(S.String);
export type TrackingAssets = { [key: string]: string[] | undefined };
export const TrackingAssets = /*@__PURE__*/ S.Record(
  S.String,
  TrackingAssetArns.pipe(S.optional),
);
export interface SageMakerRunConfigurationInput {
  trackingAssets: { [key: string]: string[] | undefined };
}
export const SageMakerRunConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trackingAssets: TrackingAssets }),
).annotate({
  identifier: "SageMakerRunConfigurationInput",
}) as any as S.Schema<SageMakerRunConfigurationInput>;
export type DataSourceConfigurationInput =
  | {
      glueRunConfiguration: GlueRunConfigurationInput;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration: RedshiftRunConfigurationInput;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration: SageMakerRunConfigurationInput;
    };
export const DataSourceConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({ glueRunConfiguration: GlueRunConfigurationInput }),
  S.Struct({ redshiftRunConfiguration: RedshiftRunConfigurationInput }),
  S.Struct({ sageMakerRunConfiguration: SageMakerRunConfigurationInput }),
]);
export interface RecommendationConfiguration {
  enableBusinessNameGeneration?: boolean;
}
export const RecommendationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enableBusinessNameGeneration: S.optional(S.Boolean) }),
).annotate({
  identifier: "RecommendationConfiguration",
}) as any as S.Schema<RecommendationConfiguration>;
export type EnableSetting = "ENABLED" | "DISABLED" | (string & {});
export const EnableSetting = /*@__PURE__*/ S.String;

export type Timezone =
  | "UTC"
  | "AFRICA_JOHANNESBURG"
  | "AMERICA_MONTREAL"
  | "AMERICA_SAO_PAULO"
  | "ASIA_BAHRAIN"
  | "ASIA_BANGKOK"
  | "ASIA_CALCUTTA"
  | "ASIA_DUBAI"
  | "ASIA_HONG_KONG"
  | "ASIA_JAKARTA"
  | "ASIA_KUALA_LUMPUR"
  | "ASIA_SEOUL"
  | "ASIA_SHANGHAI"
  | "ASIA_SINGAPORE"
  | "ASIA_TAIPEI"
  | "ASIA_TOKYO"
  | "AUSTRALIA_MELBOURNE"
  | "AUSTRALIA_SYDNEY"
  | "CANADA_CENTRAL"
  | "CET"
  | "CST6CDT"
  | "ETC_GMT"
  | "ETC_GMT0"
  | "ETC_GMT_ADD_0"
  | "ETC_GMT_ADD_1"
  | "ETC_GMT_ADD_10"
  | "ETC_GMT_ADD_11"
  | "ETC_GMT_ADD_12"
  | "ETC_GMT_ADD_2"
  | "ETC_GMT_ADD_3"
  | "ETC_GMT_ADD_4"
  | "ETC_GMT_ADD_5"
  | "ETC_GMT_ADD_6"
  | "ETC_GMT_ADD_7"
  | "ETC_GMT_ADD_8"
  | "ETC_GMT_ADD_9"
  | "ETC_GMT_NEG_0"
  | "ETC_GMT_NEG_1"
  | "ETC_GMT_NEG_10"
  | "ETC_GMT_NEG_11"
  | "ETC_GMT_NEG_12"
  | "ETC_GMT_NEG_13"
  | "ETC_GMT_NEG_14"
  | "ETC_GMT_NEG_2"
  | "ETC_GMT_NEG_3"
  | "ETC_GMT_NEG_4"
  | "ETC_GMT_NEG_5"
  | "ETC_GMT_NEG_6"
  | "ETC_GMT_NEG_7"
  | "ETC_GMT_NEG_8"
  | "ETC_GMT_NEG_9"
  | "EUROPE_DUBLIN"
  | "EUROPE_LONDON"
  | "EUROPE_PARIS"
  | "EUROPE_STOCKHOLM"
  | "EUROPE_ZURICH"
  | "ISRAEL"
  | "MEXICO_GENERAL"
  | "MST7MDT"
  | "PACIFIC_AUCKLAND"
  | "US_CENTRAL"
  | "US_EASTERN"
  | "US_MOUNTAIN"
  | "US_PACIFIC"
  | (string & {});
export const Timezone = /*@__PURE__*/ S.String;

export type CronString = string;
export interface ScheduleConfiguration {
  timezone?: Timezone;
  schedule?: string;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timezone: S.optional(Timezone), schedule: S.optional(S.String) }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export interface CreateDataSourceInput {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string;
  connectionIdentifier?: string;
  type: string;
  configuration?: DataSourceConfigurationInput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  schedule?: ScheduleConfiguration;
  publishOnImport?: boolean;
  assetFormsInput?: FormInput[];
  clientToken?: string;
}
export const CreateDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    projectIdentifier: S.String,
    environmentIdentifier: S.optional(S.String),
    connectionIdentifier: S.optional(S.String),
    type: S.String,
    configuration: S.optional(DataSourceConfigurationInput),
    recommendation: S.optional(RecommendationConfiguration),
    enableSetting: S.optional(EnableSetting),
    schedule: S.optional(ScheduleConfiguration),
    publishOnImport: S.optional(S.Boolean),
    assetFormsInput: S.optional(FormInputList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/data-sources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSourceInput",
}) as any as S.Schema<CreateDataSourceInput>;
export type DataSourceId = string;
export type DataSourceStatus =
  | "CREATING"
  | "FAILED_CREATION"
  | "READY"
  | "UPDATING"
  | "FAILED_UPDATE"
  | "RUNNING"
  | "DELETING"
  | "FAILED_DELETION"
  | (string & {});
export const DataSourceStatus = /*@__PURE__*/ S.String;

export interface GlueRunConfigurationOutput {
  accountId?: string;
  region?: string;
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean;
  catalogName?: string;
}
export const GlueRunConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    dataAccessRole: S.optional(S.String),
    relationalFilterConfigurations: RelationalFilterConfigurations,
    autoImportDataQualityResult: S.optional(S.Boolean),
    catalogName: S.optional(S.String),
  }),
).annotate({
  identifier: "GlueRunConfigurationOutput",
}) as any as S.Schema<GlueRunConfigurationOutput>;
export interface RedshiftRunConfigurationOutput {
  accountId?: string;
  region?: string;
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration;
  redshiftStorage: RedshiftStorage;
}
export const RedshiftRunConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    dataAccessRole: S.optional(S.String),
    relationalFilterConfigurations: RelationalFilterConfigurations,
    redshiftCredentialConfiguration: S.optional(
      RedshiftCredentialConfiguration,
    ),
    redshiftStorage: RedshiftStorage,
  }),
).annotate({
  identifier: "RedshiftRunConfigurationOutput",
}) as any as S.Schema<RedshiftRunConfigurationOutput>;
export interface SageMakerRunConfigurationOutput {
  accountId?: string;
  region?: string;
  trackingAssets: { [key: string]: string[] | undefined };
}
export const SageMakerRunConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    trackingAssets: TrackingAssets,
  }),
).annotate({
  identifier: "SageMakerRunConfigurationOutput",
}) as any as S.Schema<SageMakerRunConfigurationOutput>;
export type DataSourceConfigurationOutput =
  | {
      glueRunConfiguration: GlueRunConfigurationOutput;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration: RedshiftRunConfigurationOutput;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration: SageMakerRunConfigurationOutput;
    };
export const DataSourceConfigurationOutput = /*@__PURE__*/ S.Union([
  S.Struct({ glueRunConfiguration: GlueRunConfigurationOutput }),
  S.Struct({ redshiftRunConfiguration: RedshiftRunConfigurationOutput }),
  S.Struct({ sageMakerRunConfiguration: SageMakerRunConfigurationOutput }),
]);
export type DataSourceRunStatus =
  | "REQUESTED"
  | "RUNNING"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | "SUCCESS"
  | (string & {});
export const DataSourceRunStatus = /*@__PURE__*/ S.String;

export type DataSourceErrorType =
  | "ACCESS_DENIED_EXCEPTION"
  | "CONFLICT_EXCEPTION"
  | "INTERNAL_SERVER_EXCEPTION"
  | "RESOURCE_NOT_FOUND_EXCEPTION"
  | "SERVICE_QUOTA_EXCEEDED_EXCEPTION"
  | "THROTTLING_EXCEPTION"
  | "VALIDATION_EXCEPTION"
  | (string & {});
export const DataSourceErrorType = /*@__PURE__*/ S.String;

export interface DataSourceErrorMessage {
  errorType: DataSourceErrorType;
  errorDetail?: string;
}
export const DataSourceErrorMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorType: DataSourceErrorType,
    errorDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSourceErrorMessage",
}) as any as S.Schema<DataSourceErrorMessage>;
export interface CreateDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CreateDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.optional(DataSourceStatus),
    type: S.optional(S.String),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    domainId: S.String,
    projectId: S.String,
    environmentId: S.optional(S.String),
    connectionId: S.optional(S.String),
    configuration: S.optional(DataSourceConfigurationOutput),
    recommendation: S.optional(RecommendationConfiguration),
    enableSetting: S.optional(EnableSetting),
    publishOnImport: S.optional(S.Boolean),
    assetFormsOutput: S.optional(FormOutputList),
    schedule: S.optional(ScheduleConfiguration),
    lastRunStatus: S.optional(DataSourceRunStatus),
    lastRunAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastRunErrorMessage: S.optional(DataSourceErrorMessage),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateDataSourceOutput",
}) as any as S.Schema<CreateDataSourceOutput>;
export type AuthType = "IAM_IDC" | "DISABLED" | (string & {});
export const AuthType = /*@__PURE__*/ S.String;

export type UserAssignment = "AUTOMATIC" | "MANUAL" | (string & {});
export const UserAssignment = /*@__PURE__*/ S.String;

export interface SingleSignOn {
  type?: AuthType;
  userAssignment?: UserAssignment;
  idcInstanceArn?: string;
}
export const SingleSignOn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(AuthType),
    userAssignment: S.optional(UserAssignment),
    idcInstanceArn: S.optional(S.String),
  }),
).annotate({ identifier: "SingleSignOn" }) as any as S.Schema<SingleSignOn>;
export type RoleArn = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type DomainVersion = "V1" | "V2" | (string & {});
export const DomainVersion = /*@__PURE__*/ S.String;

export interface CreateDomainInput {
  name: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  kmsKeyIdentifier?: string;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
  clientToken?: string;
}
export const CreateDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    singleSignOn: S.optional(SingleSignOn),
    domainExecutionRole: S.optional(S.String),
    kmsKeyIdentifier: S.optional(S.String),
    tags: S.optional(Tags),
    domainVersion: S.optional(DomainVersion),
    serviceRole: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainInput",
}) as any as S.Schema<CreateDomainInput>;
export type DomainStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATION_FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETION_FAILED"
  | (string & {});
export const DomainStatus = /*@__PURE__*/ S.String;

export interface CreateDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  name?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  arn?: string;
  kmsKeyIdentifier?: string;
  status?: DomainStatus;
  portalUrl?: string;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
}
export const CreateDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    rootDomainUnitId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    singleSignOn: S.optional(SingleSignOn),
    domainExecutionRole: S.optional(S.String),
    arn: S.optional(S.String),
    kmsKeyIdentifier: S.optional(S.String),
    status: S.optional(DomainStatus),
    portalUrl: S.optional(S.String),
    tags: S.optional(Tags),
    domainVersion: S.optional(DomainVersion),
    serviceRole: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDomainOutput",
}) as any as S.Schema<CreateDomainOutput>;
export type DomainUnitName = string | redacted.Redacted<string>;
export type DomainUnitDescription = string | redacted.Redacted<string>;
export interface CreateDomainUnitInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitIdentifier: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const CreateDomainUnitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    parentDomainUnitIdentifier: S.String,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/domain-units",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainUnitInput",
}) as any as S.Schema<CreateDomainUnitInput>;
export interface DomainUnitUserProperties {
  userId?: string;
}
export const DomainUnitUserProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "DomainUnitUserProperties",
}) as any as S.Schema<DomainUnitUserProperties>;
export interface DomainUnitGroupProperties {
  groupId?: string;
}
export const DomainUnitGroupProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupId: S.optional(S.String) }),
).annotate({
  identifier: "DomainUnitGroupProperties",
}) as any as S.Schema<DomainUnitGroupProperties>;
export type DomainUnitOwnerProperties =
  | { user: DomainUnitUserProperties; group?: never }
  | { user?: never; group: DomainUnitGroupProperties };
export const DomainUnitOwnerProperties = /*@__PURE__*/ S.Union([
  S.Struct({ user: DomainUnitUserProperties }),
  S.Struct({ group: DomainUnitGroupProperties }),
]);
export type DomainUnitOwners = DomainUnitOwnerProperties[];
export const DomainUnitOwners = /*@__PURE__*/ S.Array(
  DomainUnitOwnerProperties,
);
export type DomainUnitIds = string[];
export const DomainUnitIds = /*@__PURE__*/ S.Array(S.String);
export interface CreateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  description?: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  ancestorDomainUnitIds: string[];
  createdAt?: Date;
  createdBy?: string;
}
export const CreateDomainUnitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    name: SensitiveString,
    parentDomainUnitId: S.optional(S.String),
    description: S.optional(SensitiveString),
    owners: DomainUnitOwners,
    ancestorDomainUnitIds: DomainUnitIds,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDomainUnitOutput",
}) as any as S.Schema<CreateDomainUnitOutput>;
export type EnvironmentProfileId = string;
export interface EnvironmentParameter {
  name?: string;
  value?: string;
}
export const EnvironmentParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "EnvironmentParameter",
}) as any as S.Schema<EnvironmentParameter>;
export type EnvironmentParametersList = EnvironmentParameter[];
export const EnvironmentParametersList =
  /*@__PURE__*/ S.Array(EnvironmentParameter);
export type EnvironmentConfigurationName = string | redacted.Redacted<string>;
export interface CreateEnvironmentInput {
  projectIdentifier: string;
  domainIdentifier: string;
  description?: string;
  name: string;
  environmentProfileIdentifier?: string;
  userParameters?: EnvironmentParameter[];
  glossaryTerms?: string[];
  environmentAccountIdentifier?: string;
  environmentAccountRegion?: string;
  environmentBlueprintIdentifier?: string;
  deploymentOrder?: number;
  environmentConfigurationId?: string;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const CreateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectIdentifier: S.String,
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    description: S.optional(S.String),
    name: S.String,
    environmentProfileIdentifier: S.optional(S.String),
    userParameters: S.optional(EnvironmentParametersList),
    glossaryTerms: S.optional(GlossaryTerms),
    environmentAccountIdentifier: S.optional(S.String),
    environmentAccountRegion: S.optional(S.String),
    environmentBlueprintIdentifier: S.optional(S.String),
    deploymentOrder: S.optional(S.Number),
    environmentConfigurationId: S.optional(S.String),
    environmentConfigurationName: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentInput",
}) as any as S.Schema<CreateEnvironmentInput>;
export type EnvironmentName = string | redacted.Redacted<string>;
export interface Resource {
  provider?: string;
  name?: string;
  value: string;
  type: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: S.optional(S.String),
    name: S.optional(S.String),
    value: S.String,
    type: S.String,
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export type EnvironmentStatus =
  | "ACTIVE"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | "VALIDATION_FAILED"
  | "SUSPENDED"
  | "DISABLED"
  | "EXPIRED"
  | "DELETED"
  | "INACCESSIBLE"
  | (string & {});
export const EnvironmentStatus = /*@__PURE__*/ S.String;

export type ConfigurableActionTypeAuthorization =
  | "IAM"
  | "HTTPS"
  | (string & {});
export const ConfigurableActionTypeAuthorization = /*@__PURE__*/ S.String;

export interface ConfigurableActionParameter {
  key?: string;
  value?: string;
}
export const ConfigurableActionParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "ConfigurableActionParameter",
}) as any as S.Schema<ConfigurableActionParameter>;
export type ConfigurableActionParameterList = ConfigurableActionParameter[];
export const ConfigurableActionParameterList = /*@__PURE__*/ S.Array(
  ConfigurableActionParameter,
);
export interface ConfigurableEnvironmentAction {
  type: string;
  auth?: ConfigurableActionTypeAuthorization;
  parameters: ConfigurableActionParameter[];
}
export const ConfigurableEnvironmentAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    auth: S.optional(ConfigurableActionTypeAuthorization),
    parameters: ConfigurableActionParameterList,
  }),
).annotate({
  identifier: "ConfigurableEnvironmentAction",
}) as any as S.Schema<ConfigurableEnvironmentAction>;
export type EnvironmentActionList = ConfigurableEnvironmentAction[];
export const EnvironmentActionList = /*@__PURE__*/ S.Array(
  ConfigurableEnvironmentAction,
);
export interface CustomParameter {
  keyName: string;
  description?: string | redacted.Redacted<string>;
  fieldType: string;
  defaultValue?: string;
  isEditable?: boolean;
  isOptional?: boolean;
  isUpdateSupported?: boolean;
}
export const CustomParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyName: S.String,
    description: S.optional(SensitiveString),
    fieldType: S.String,
    defaultValue: S.optional(S.String),
    isEditable: S.optional(S.Boolean),
    isOptional: S.optional(S.Boolean),
    isUpdateSupported: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CustomParameter",
}) as any as S.Schema<CustomParameter>;
export type CustomParameterList = CustomParameter[];
export const CustomParameterList = /*@__PURE__*/ S.Array(CustomParameter);
export type DeploymentType = "CREATE" | "UPDATE" | "DELETE" | (string & {});
export const DeploymentType = /*@__PURE__*/ S.String;

export type DeploymentStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "PENDING_DEPLOYMENT"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

export interface EnvironmentError {
  code?: string;
  message: string;
}
export const EnvironmentError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.String }),
).annotate({
  identifier: "EnvironmentError",
}) as any as S.Schema<EnvironmentError>;
export type DeploymentMessage = string;
export type DeploymentMessagesList = string[];
export const DeploymentMessagesList = /*@__PURE__*/ S.Array(S.String);
export interface Deployment {
  deploymentId?: string;
  deploymentType?: DeploymentType;
  deploymentStatus?: DeploymentStatus;
  failureReason?: EnvironmentError;
  messages?: string[];
  isDeploymentComplete?: boolean;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    deploymentType: S.optional(DeploymentType),
    deploymentStatus: S.optional(DeploymentStatus),
    failureReason: S.optional(EnvironmentError),
    messages: S.optional(DeploymentMessagesList),
    isDeploymentComplete: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export interface CloudFormationProperties {
  templateUrl: string;
}
export const CloudFormationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateUrl: S.String }),
).annotate({
  identifier: "CloudFormationProperties",
}) as any as S.Schema<CloudFormationProperties>;
export type ProvisioningProperties =
  | { cloudFormation: CloudFormationProperties; manual?: never }
  | { cloudFormation?: never; manual: Record<string, never> };
export const ProvisioningProperties = /*@__PURE__*/ S.Union([
  S.Struct({ cloudFormation: CloudFormationProperties }),
  S.Struct({ manual: S.Struct({}) }),
]);
export interface DeploymentProperties {
  startTimeoutMinutes?: number;
  endTimeoutMinutes?: number;
}
export const DeploymentProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTimeoutMinutes: S.optional(S.Number),
    endTimeoutMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeploymentProperties",
}) as any as S.Schema<DeploymentProperties>;
export type EnvironmentBlueprintId = string;
export type EnvironmentConfigurationId = string | redacted.Redacted<string>;
export interface CreateEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const CreateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    id: S.optional(S.String),
    domainId: S.String,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentProfileId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    provider: S.String,
    provisionedResources: S.optional(ResourceList),
    status: S.optional(EnvironmentStatus),
    environmentActions: S.optional(EnvironmentActionList),
    glossaryTerms: S.optional(GlossaryTerms),
    userParameters: S.optional(CustomParameterList),
    lastDeployment: S.optional(Deployment),
    provisioningProperties: S.optional(ProvisioningProperties),
    deploymentProperties: S.optional(DeploymentProperties),
    environmentBlueprintId: S.optional(S.String),
    environmentConfigurationId: S.optional(SensitiveString),
    environmentConfigurationName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CreateEnvironmentOutput",
}) as any as S.Schema<CreateEnvironmentOutput>;
export interface AwsConsoleLinkParameters {
  uri?: string;
}
export const AwsConsoleLinkParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(S.String) }),
).annotate({
  identifier: "AwsConsoleLinkParameters",
}) as any as S.Schema<AwsConsoleLinkParameters>;
export type ActionParameters = { awsConsoleLink: AwsConsoleLinkParameters };
export const ActionParameters = /*@__PURE__*/ S.Union([
  S.Struct({ awsConsoleLink: AwsConsoleLinkParameters }),
]);
export interface CreateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export const CreateEnvironmentActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    name: S.String,
    parameters: ActionParameters,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentActionInput",
}) as any as S.Schema<CreateEnvironmentActionInput>;
export type EnvironmentActionId = string;
export interface CreateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export const CreateEnvironmentActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    environmentId: S.String,
    id: S.String,
    name: S.String,
    parameters: ActionParameters,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateEnvironmentActionOutput",
}) as any as S.Schema<CreateEnvironmentActionOutput>;
export type EnvironmentBlueprintName = string;
export interface CreateEnvironmentBlueprintInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provisioningProperties: ProvisioningProperties;
  userParameters?: CustomParameter[];
}
export const CreateEnvironmentBlueprintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: S.String,
    description: S.optional(SensitiveString),
    provisioningProperties: ProvisioningProperties,
    userParameters: S.optional(CustomParameterList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/environment-blueprints",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentBlueprintInput",
}) as any as S.Schema<CreateEnvironmentBlueprintInput>;
export interface CreateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const CreateEnvironmentBlueprintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    provider: S.String,
    provisioningProperties: ProvisioningProperties,
    deploymentProperties: S.optional(DeploymentProperties),
    userParameters: S.optional(CustomParameterList),
    glossaryTerms: S.optional(GlossaryTerms),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateEnvironmentBlueprintOutput",
}) as any as S.Schema<CreateEnvironmentBlueprintOutput>;
export type EnvironmentProfileName = string | redacted.Redacted<string>;
export interface CreateEnvironmentProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintIdentifier: string;
  projectIdentifier: string;
  userParameters?: EnvironmentParameter[];
  awsAccountId?: string;
  awsAccountRegion?: string;
}
export const CreateEnvironmentProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentBlueprintIdentifier: S.String,
    projectIdentifier: S.String,
    userParameters: S.optional(EnvironmentParametersList),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/environment-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentProfileInput",
}) as any as S.Schema<CreateEnvironmentProfileInput>;
export interface CreateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export const CreateEnvironmentProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentBlueprintId: S.String,
    projectId: S.optional(S.String),
    userParameters: S.optional(CustomParameterList),
  }),
).annotate({
  identifier: "CreateEnvironmentProfileOutput",
}) as any as S.Schema<CreateEnvironmentProfileOutput>;
export type Smithy = string;
export type Model = { smithy: string };
export const Model = /*@__PURE__*/ S.Union([S.Struct({ smithy: S.String })]);
export type FormTypeStatus = "ENABLED" | "DISABLED" | (string & {});
export const FormTypeStatus = /*@__PURE__*/ S.String;

export interface CreateFormTypeInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  model: Model;
  owningProjectIdentifier: string;
  status?: FormTypeStatus;
  description?: string | redacted.Redacted<string>;
}
export const CreateFormTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    model: Model,
    owningProjectIdentifier: S.String,
    status: S.optional(FormTypeStatus),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/form-types",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFormTypeInput",
}) as any as S.Schema<CreateFormTypeInput>;
export interface CreateFormTypeOutput {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  description?: string | redacted.Redacted<string>;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
}
export const CreateFormTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: SensitiveString,
    revision: S.String,
    description: S.optional(SensitiveString),
    owningProjectId: S.optional(S.String),
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFormTypeOutput",
}) as any as S.Schema<CreateFormTypeOutput>;
export type GlossaryName = string | redacted.Redacted<string>;
export type GlossaryDescription = string | redacted.Redacted<string>;
export type GlossaryStatus = "DISABLED" | "ENABLED" | (string & {});
export const GlossaryStatus = /*@__PURE__*/ S.String;

export type GlossaryUsageRestriction = "ASSET_GOVERNED_TERMS" | (string & {});
export const GlossaryUsageRestriction = /*@__PURE__*/ S.String;

export type GlossaryUsageRestrictions = GlossaryUsageRestriction[];
export const GlossaryUsageRestrictions = /*@__PURE__*/ S.Array(
  GlossaryUsageRestriction,
);
export interface CreateGlossaryInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  owningProjectIdentifier: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
  clientToken?: string;
}
export const CreateGlossaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    owningProjectIdentifier: S.String,
    description: S.optional(SensitiveString),
    status: S.optional(GlossaryStatus),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/glossaries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlossaryInput",
}) as any as S.Schema<CreateGlossaryInput>;
export type GlossaryId = string;
export interface CreateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const CreateGlossaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    description: S.optional(SensitiveString),
    status: S.optional(GlossaryStatus),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "CreateGlossaryOutput",
}) as any as S.Schema<CreateGlossaryOutput>;
export type GlossaryTermStatus = "ENABLED" | "DISABLED" | (string & {});
export const GlossaryTermStatus = /*@__PURE__*/ S.String;

export type LongDescription = string | redacted.Redacted<string>;
export interface TermRelations {
  isA?: string[];
  classifies?: string[];
}
export const TermRelations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isA: S.optional(GlossaryTerms),
    classifies: S.optional(GlossaryTerms),
  }),
).annotate({ identifier: "TermRelations" }) as any as S.Schema<TermRelations>;
export interface CreateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier: string;
  name: string | redacted.Redacted<string>;
  status?: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  clientToken?: string;
}
export const CreateGlossaryTermInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    glossaryIdentifier: S.String,
    name: SensitiveString,
    status: S.optional(GlossaryTermStatus),
    shortDescription: S.optional(SensitiveString),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/glossary-terms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlossaryTermInput",
}) as any as S.Schema<CreateGlossaryTermInput>;
export interface CreateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const CreateGlossaryTermOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    glossaryId: S.String,
    name: SensitiveString,
    status: GlossaryTermStatus,
    shortDescription: S.optional(SensitiveString),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "CreateGlossaryTermOutput",
}) as any as S.Schema<CreateGlossaryTermOutput>;
export interface CreateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier?: string;
  rolePrincipalArn?: string;
  clientToken?: string;
}
export const CreateGroupProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    groupIdentifier: S.optional(S.String),
    rolePrincipalArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/group-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupProfileInput",
}) as any as S.Schema<CreateGroupProfileInput>;
export type GroupProfileStatus = "ASSIGNED" | "NOT_ASSIGNED" | (string & {});
export const GroupProfileStatus = /*@__PURE__*/ S.String;

export interface CreateGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export const CreateGroupProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(GroupProfileStatus),
    groupName: S.optional(SensitiveString),
    rolePrincipalArn: S.optional(S.String),
    rolePrincipalId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGroupProfileOutput",
}) as any as S.Schema<CreateGroupProfileOutput>;
export type EntityType = "ASSET" | "DATA_PRODUCT" | (string & {});
export const EntityType = /*@__PURE__*/ S.String;

export type ChangeAction = "PUBLISH" | "UNPUBLISH" | (string & {});
export const ChangeAction = /*@__PURE__*/ S.String;

export interface CreateListingChangeSetInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: EntityType;
  entityRevision?: string;
  action: ChangeAction;
  clientToken?: string;
}
export const CreateListingChangeSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String,
    entityType: EntityType,
    entityRevision: S.optional(S.String),
    action: ChangeAction,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/listings/change-set",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateListingChangeSetInput",
}) as any as S.Schema<CreateListingChangeSetInput>;
export interface CreateListingChangeSetOutput {
  listingId: string;
  listingRevision: string;
  status: ListingStatus;
}
export const CreateListingChangeSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.String,
    listingRevision: S.String,
    status: ListingStatus,
  }),
).annotate({
  identifier: "CreateListingChangeSetOutput",
}) as any as S.Schema<CreateListingChangeSetOutput>;
export type NotebookName = string | redacted.Redacted<string>;
export type MetadataKey = string;
export type MetadataValue = string | redacted.Redacted<string>;
export type Metadata = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const Metadata = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type ParameterKey = string;
export type ParameterValue = string;
export type Parameters = { [key: string]: string | undefined };
export const Parameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateNotebookInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/notebooks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNotebookInput",
}) as any as S.Schema<CreateNotebookInput>;
export type NotebookId = string;
export interface CellInformation {}
export const CellInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CellInformation",
}) as any as S.Schema<CellInformation>;
export type CellOrder = CellInformation[];
export const CellOrder = /*@__PURE__*/ S.Array(CellInformation);
export type NotebookStatus = "ACTIVE" | "ARCHIVED" | (string & {});
export const NotebookStatus = /*@__PURE__*/ S.String;

export type ComputeId = string;
export type PackageManager = "UV" | (string & {});
export const PackageManager = /*@__PURE__*/ S.String;

export interface PackageConfig {
  packageManager: PackageManager;
  packageSpecification?: string;
}
export const PackageConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageManager: PackageManager,
    packageSpecification: S.optional(S.String),
  }),
).annotate({ identifier: "PackageConfig" }) as any as S.Schema<PackageConfig>;
export interface EnvironmentConfig {
  imageVersion?: string;
  packageConfig?: PackageConfig;
}
export const EnvironmentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageVersion: S.optional(S.String),
    packageConfig: S.optional(PackageConfig),
  }),
).annotate({
  identifier: "EnvironmentConfig",
}) as any as S.Schema<EnvironmentConfig>;
export interface NotebookError {
  message: string;
}
export const NotebookError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({ identifier: "NotebookError" }) as any as S.Schema<NotebookError>;
export interface CreateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
}
export const CreateNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    domainId: S.String,
    cellOrder: CellOrder,
    status: NotebookStatus,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    lockedBy: S.optional(S.String),
    lockedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lockExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    computeId: S.optional(S.String),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    environmentConfiguration: S.optional(EnvironmentConfig),
    error: S.optional(NotebookError),
  }),
).annotate({
  identifier: "CreateNotebookOutput",
}) as any as S.Schema<CreateNotebookOutput>;
export type ProjectProfileId = string;
export interface EnvironmentResolvedAccount {
  awsAccountId: string;
  regionName: string;
  sourceAccountPoolId?: string;
}
export const EnvironmentResolvedAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsAccountId: S.String,
    regionName: S.String,
    sourceAccountPoolId: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentResolvedAccount",
}) as any as S.Schema<EnvironmentResolvedAccount>;
export interface EnvironmentConfigurationUserParameter {
  environmentId?: string;
  environmentResolvedAccount?: EnvironmentResolvedAccount;
  environmentConfigurationName?: string | redacted.Redacted<string>;
  environmentParameters?: EnvironmentParameter[];
}
export const EnvironmentConfigurationUserParameter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      environmentId: S.optional(S.String),
      environmentResolvedAccount: S.optional(EnvironmentResolvedAccount),
      environmentConfigurationName: S.optional(SensitiveString),
      environmentParameters: S.optional(EnvironmentParametersList),
    }),
).annotate({
  identifier: "EnvironmentConfigurationUserParameter",
}) as any as S.Schema<EnvironmentConfigurationUserParameter>;
export type EnvironmentConfigurationUserParametersList =
  EnvironmentConfigurationUserParameter[];
export const EnvironmentConfigurationUserParametersList = /*@__PURE__*/ S.Array(
  EnvironmentConfigurationUserParameter,
);
export type Member =
  | { userIdentifier: string; groupIdentifier?: never }
  | { userIdentifier?: never; groupIdentifier: string };
export const Member = /*@__PURE__*/ S.Union([
  S.Struct({ userIdentifier: S.String }),
  S.Struct({ groupIdentifier: S.String }),
]);
export type UserDesignation =
  | "PROJECT_OWNER"
  | "PROJECT_CONTRIBUTOR"
  | "PROJECT_CATALOG_VIEWER"
  | "PROJECT_CATALOG_CONSUMER"
  | "PROJECT_CATALOG_STEWARD"
  | (string & {});
export const UserDesignation = /*@__PURE__*/ S.String;

export interface ProjectMembershipAssignment {
  member: Member;
  designation: UserDesignation;
}
export const ProjectMembershipAssignment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ member: Member, designation: UserDesignation }),
).annotate({
  identifier: "ProjectMembershipAssignment",
}) as any as S.Schema<ProjectMembershipAssignment>;
export type ProjectMembershipAssignments = ProjectMembershipAssignment[];
export const ProjectMembershipAssignments = /*@__PURE__*/ S.Array(
  ProjectMembershipAssignment,
);
export interface CreateProjectInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resourceTags?: { [key: string]: string | undefined };
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  projectCategory?: string;
  projectExecutionRole?: string;
  membershipAssignments?: ProjectMembershipAssignment[];
}
export const CreateProjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    resourceTags: S.optional(Tags),
    glossaryTerms: S.optional(GlossaryTerms),
    domainUnitId: S.optional(S.String),
    projectProfileId: S.optional(S.String),
    userParameters: S.optional(EnvironmentConfigurationUserParametersList),
    projectCategory: S.optional(S.String),
    projectExecutionRole: S.optional(S.String),
    membershipAssignments: S.optional(ProjectMembershipAssignments),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/projects",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectInput",
}) as any as S.Schema<CreateProjectInput>;
export type ProjectStatus =
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "MOVING"
  | (string & {});
export const ProjectStatus = /*@__PURE__*/ S.String;

export interface ProjectDeletionError {
  code?: string;
  message?: string;
}
export const ProjectDeletionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({
  identifier: "ProjectDeletionError",
}) as any as S.Schema<ProjectDeletionError>;
export type FailureReasons = ProjectDeletionError[];
export const FailureReasons = /*@__PURE__*/ S.Array(ProjectDeletionError);
export type ResourceTagSource = "PROJECT" | "PROJECT_PROFILE" | (string & {});
export const ResourceTagSource = /*@__PURE__*/ S.String;

export interface ResourceTag {
  key: string;
  value: string;
  source: ResourceTagSource;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String, source: ResourceTagSource }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTags = ResourceTag[];
export const ResourceTags = /*@__PURE__*/ S.Array(ResourceTag);
export type OverallDeploymentStatus =
  | "PENDING_DEPLOYMENT"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED_VALIDATION"
  | "FAILED_DEPLOYMENT"
  | (string & {});
export const OverallDeploymentStatus = /*@__PURE__*/ S.String;

export type EnvironmentFailureReasonsList = EnvironmentError[];
export const EnvironmentFailureReasonsList =
  /*@__PURE__*/ S.Array(EnvironmentError);
export type EnvironmentFailureReasons = {
  [key: string]: EnvironmentError[] | undefined;
};
export const EnvironmentFailureReasons = /*@__PURE__*/ S.Record(
  S.String,
  EnvironmentFailureReasonsList.pipe(S.optional),
);
export interface EnvironmentDeploymentDetails {
  overallDeploymentStatus?: OverallDeploymentStatus;
  environmentFailureReasons?: { [key: string]: EnvironmentError[] | undefined };
}
export const EnvironmentDeploymentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    overallDeploymentStatus: S.optional(OverallDeploymentStatus),
    environmentFailureReasons: S.optional(EnvironmentFailureReasons),
  }),
).annotate({
  identifier: "EnvironmentDeploymentDetails",
}) as any as S.Schema<EnvironmentDeploymentDetails>;
export interface CreateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export const CreateProjectOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    projectStatus: S.optional(ProjectStatus),
    failureReasons: S.optional(FailureReasons),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    resourceTags: S.optional(ResourceTags),
    glossaryTerms: S.optional(GlossaryTerms),
    domainUnitId: S.optional(S.String),
    projectProfileId: S.optional(S.String),
    userParameters: S.optional(EnvironmentConfigurationUserParametersList),
    environmentDeploymentDetails: S.optional(EnvironmentDeploymentDetails),
    projectCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProjectOutput",
}) as any as S.Schema<CreateProjectOutput>;
export interface CreateProjectMembershipInput {
  domainIdentifier: string;
  projectIdentifier: string;
  member: Member;
  designation: UserDesignation;
}
export const CreateProjectMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
    member: Member,
    designation: UserDesignation,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/createMembership",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectMembershipInput",
}) as any as S.Schema<CreateProjectMembershipInput>;
export interface CreateProjectMembershipOutput {}
export const CreateProjectMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateProjectMembershipOutput",
}) as any as S.Schema<CreateProjectMembershipOutput>;
export type ProjectProfileName = string | redacted.Redacted<string>;
export type Status = "ENABLED" | "DISABLED" | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface ResourceTagParameter {
  key: string;
  value: string;
  isValueEditable: boolean;
}
export const ResourceTagParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String, isValueEditable: S.Boolean }),
).annotate({
  identifier: "ResourceTagParameter",
}) as any as S.Schema<ResourceTagParameter>;
export type ProjectResourceTagParameters = ResourceTagParameter[];
export const ProjectResourceTagParameters =
  /*@__PURE__*/ S.Array(ResourceTagParameter);
export type DeploymentMode = "ON_CREATE" | "ON_DEMAND" | (string & {});
export const DeploymentMode = /*@__PURE__*/ S.String;

export type ParameterStorePath = string;
export type EnvironmentConfigurationParameterName = string;
export interface EnvironmentConfigurationParameter {
  name?: string;
  value?: string;
  isEditable?: boolean;
}
export const EnvironmentConfigurationParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    value: S.optional(S.String),
    isEditable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EnvironmentConfigurationParameter",
}) as any as S.Schema<EnvironmentConfigurationParameter>;
export type EnvironmentConfigurationParametersList =
  EnvironmentConfigurationParameter[];
export const EnvironmentConfigurationParametersList = /*@__PURE__*/ S.Array(
  EnvironmentConfigurationParameter,
);
export interface EnvironmentConfigurationParametersDetails {
  ssmPath?: string;
  parameterOverrides?: EnvironmentConfigurationParameter[];
  resolvedParameters?: EnvironmentConfigurationParameter[];
}
export const EnvironmentConfigurationParametersDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ssmPath: S.optional(S.String),
      parameterOverrides: S.optional(EnvironmentConfigurationParametersList),
      resolvedParameters: S.optional(EnvironmentConfigurationParametersList),
    }),
  ).annotate({
    identifier: "EnvironmentConfigurationParametersDetails",
  }) as any as S.Schema<EnvironmentConfigurationParametersDetails>;
export type AwsAccount =
  | { awsAccountId: string; awsAccountIdPath?: never }
  | { awsAccountId?: never; awsAccountIdPath: string };
export const AwsAccount = /*@__PURE__*/ S.Union([
  S.Struct({ awsAccountId: S.String }),
  S.Struct({ awsAccountIdPath: S.String }),
]);
export type AccountPoolList = string[];
export const AccountPoolList = /*@__PURE__*/ S.Array(S.String);
export type RegionName = string;
export type Region =
  | { regionName: string; regionNamePath?: never }
  | { regionName?: never; regionNamePath: string };
export const Region = /*@__PURE__*/ S.Union([
  S.Struct({ regionName: S.String }),
  S.Struct({ regionNamePath: S.String }),
]);
export type DeploymentOrder = number;
export interface EnvironmentConfiguration {
  name: string | redacted.Redacted<string>;
  id?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  description?: string | redacted.Redacted<string>;
  deploymentMode?: DeploymentMode;
  configurationParameters?: EnvironmentConfigurationParametersDetails;
  awsAccount?: AwsAccount;
  accountPools?: string[];
  awsRegion?: Region;
  deploymentOrder?: number;
}
export const EnvironmentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    id: S.optional(SensitiveString),
    environmentBlueprintId: S.String,
    description: S.optional(SensitiveString),
    deploymentMode: S.optional(DeploymentMode),
    configurationParameters: S.optional(
      EnvironmentConfigurationParametersDetails,
    ),
    awsAccount: S.optional(AwsAccount),
    accountPools: S.optional(AccountPoolList),
    awsRegion: S.optional(Region),
    deploymentOrder: S.optional(S.Number),
  }),
).annotate({
  identifier: "EnvironmentConfiguration",
}) as any as S.Schema<EnvironmentConfiguration>;
export type EnvironmentConfigurationsList = EnvironmentConfiguration[];
export const EnvironmentConfigurationsList = /*@__PURE__*/ S.Array(
  EnvironmentConfiguration,
);
export interface CreateProjectProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  domainUnitIdentifier?: string;
}
export const CreateProjectProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    projectResourceTags: S.optional(ProjectResourceTagParameters),
    allowCustomProjectResourceTags: S.optional(S.Boolean),
    projectResourceTagsDescription: S.optional(SensitiveString),
    environmentConfigurations: S.optional(EnvironmentConfigurationsList),
    domainUnitIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/project-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectProfileInput",
}) as any as S.Schema<CreateProjectProfileInput>;
export interface CreateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export const CreateProjectProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    projectResourceTags: S.optional(ProjectResourceTagParameters),
    allowCustomProjectResourceTags: S.optional(S.Boolean),
    projectResourceTagsDescription: S.optional(SensitiveString),
    environmentConfigurations: S.optional(EnvironmentConfigurationsList),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProjectProfileOutput",
}) as any as S.Schema<CreateProjectProfileOutput>;
export type RuleName = string | redacted.Redacted<string>;
export interface DomainUnitTarget {
  domainUnitId: string;
  includeChildDomainUnits?: boolean;
}
export const DomainUnitTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainUnitId: S.String,
    includeChildDomainUnits: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DomainUnitTarget",
}) as any as S.Schema<DomainUnitTarget>;
export type RuleTarget = { domainUnitTarget: DomainUnitTarget };
export const RuleTarget = /*@__PURE__*/ S.Union([
  S.Struct({ domainUnitTarget: DomainUnitTarget }),
]);
export type RuleAction =
  | "CREATE_LISTING_CHANGE_SET"
  | "CREATE_SUBSCRIPTION_REQUEST"
  | (string & {});
export const RuleAction = /*@__PURE__*/ S.String;

export type RuleScopeSelectionMode = "ALL" | "SPECIFIC" | (string & {});
export const RuleScopeSelectionMode = /*@__PURE__*/ S.String;

export type RuleAssetTypeList = string[];
export const RuleAssetTypeList = /*@__PURE__*/ S.Array(S.String);
export interface AssetTypesForRule {
  selectionMode: RuleScopeSelectionMode;
  specificAssetTypes?: string[];
}
export const AssetTypesForRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selectionMode: RuleScopeSelectionMode,
    specificAssetTypes: S.optional(RuleAssetTypeList),
  }),
).annotate({
  identifier: "AssetTypesForRule",
}) as any as S.Schema<AssetTypesForRule>;
export type RuleProjectIdentifierList = string[];
export const RuleProjectIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface ProjectsForRule {
  selectionMode: RuleScopeSelectionMode;
  specificProjects?: string[];
}
export const ProjectsForRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selectionMode: RuleScopeSelectionMode,
    specificProjects: S.optional(RuleProjectIdentifierList),
  }),
).annotate({
  identifier: "ProjectsForRule",
}) as any as S.Schema<ProjectsForRule>;
export interface RuleScope {
  assetType?: AssetTypesForRule;
  dataProduct?: boolean;
  project?: ProjectsForRule;
}
export const RuleScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetType: S.optional(AssetTypesForRule),
    dataProduct: S.optional(S.Boolean),
    project: S.optional(ProjectsForRule),
  }),
).annotate({ identifier: "RuleScope" }) as any as S.Schema<RuleScope>;
export interface MetadataFormReference {
  typeIdentifier: string;
  typeRevision: string;
}
export const MetadataFormReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ typeIdentifier: S.String, typeRevision: S.String }),
).annotate({
  identifier: "MetadataFormReference",
}) as any as S.Schema<MetadataFormReference>;
export type RequiredMetadataFormList = MetadataFormReference[];
export const RequiredMetadataFormList = /*@__PURE__*/ S.Array(
  MetadataFormReference,
);
export interface MetadataFormEnforcementDetail {
  requiredMetadataForms?: MetadataFormReference[];
}
export const MetadataFormEnforcementDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requiredMetadataForms: S.optional(RequiredMetadataFormList) }),
).annotate({
  identifier: "MetadataFormEnforcementDetail",
}) as any as S.Schema<MetadataFormEnforcementDetail>;
export type GlossaryTermIdentifiers = string[];
export const GlossaryTermIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface GlossaryTermEnforcementDetail {
  requiredGlossaryTermIds?: string[];
}
export const GlossaryTermEnforcementDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requiredGlossaryTermIds: S.optional(GlossaryTermIdentifiers) }),
).annotate({
  identifier: "GlossaryTermEnforcementDetail",
}) as any as S.Schema<GlossaryTermEnforcementDetail>;
export type RuleDetail =
  | {
      metadataFormEnforcementDetail: MetadataFormEnforcementDetail;
      glossaryTermEnforcementDetail?: never;
    }
  | {
      metadataFormEnforcementDetail?: never;
      glossaryTermEnforcementDetail: GlossaryTermEnforcementDetail;
    };
export const RuleDetail = /*@__PURE__*/ S.Union([
  S.Struct({ metadataFormEnforcementDetail: MetadataFormEnforcementDetail }),
  S.Struct({ glossaryTermEnforcementDetail: GlossaryTermEnforcementDetail }),
]);
export interface CreateRuleInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const CreateRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: SensitiveString,
    target: RuleTarget,
    action: RuleAction,
    scope: RuleScope,
    detail: RuleDetail,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRuleInput",
}) as any as S.Schema<CreateRuleInput>;
export type RuleId = string;
export type RuleType =
  | "METADATA_FORM_ENFORCEMENT"
  | "GLOSSARY_TERM_ENFORCEMENT"
  | (string & {});
export const RuleType = /*@__PURE__*/ S.String;

export type RuleTargetType = "DOMAIN_UNIT" | (string & {});
export const RuleTargetType = /*@__PURE__*/ S.String;

export interface CreateRuleOutput {
  identifier: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  targetType?: RuleTargetType;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  createdBy: string;
}
export const CreateRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    name: SensitiveString,
    ruleType: RuleType,
    target: RuleTarget,
    action: RuleAction,
    scope: RuleScope,
    detail: RuleDetail,
    targetType: S.optional(RuleTargetType),
    description: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdBy: S.String,
  }),
).annotate({
  identifier: "CreateRuleOutput",
}) as any as S.Schema<CreateRuleOutput>;
export type SubscriptionTargetId = string;
export interface ListingRevisionInput {
  identifier: string;
  revision: string;
}
export const ListingRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String, revision: S.String }),
).annotate({
  identifier: "ListingRevisionInput",
}) as any as S.Schema<ListingRevisionInput>;
export type GrantedEntityInput = { listing: ListingRevisionInput };
export const GrantedEntityInput = /*@__PURE__*/ S.Union([
  S.Struct({ listing: ListingRevisionInput }),
]);
export interface AssetTargetNameMap {
  assetId: string;
  targetName: string;
}
export const AssetTargetNameMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, targetName: S.String }),
).annotate({
  identifier: "AssetTargetNameMap",
}) as any as S.Schema<AssetTargetNameMap>;
export type AssetTargetNames = AssetTargetNameMap[];
export const AssetTargetNames = /*@__PURE__*/ S.Array(AssetTargetNameMap);
export interface CreateSubscriptionGrantInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  subscriptionTargetIdentifier?: string;
  grantedEntity: GrantedEntityInput;
  assetTargetNames?: AssetTargetNameMap[];
  clientToken?: string;
}
export const CreateSubscriptionGrantInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String,
    subscriptionTargetIdentifier: S.optional(S.String),
    grantedEntity: GrantedEntityInput,
    assetTargetNames: S.optional(AssetTargetNames),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/subscription-grants",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionGrantInput",
}) as any as S.Schema<CreateSubscriptionGrantInput>;
export type SubscriptionGrantId = string;
export interface ListingRevision {
  id: string;
  revision: string;
}
export const ListingRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, revision: S.String }),
).annotate({
  identifier: "ListingRevision",
}) as any as S.Schema<ListingRevision>;
export type GrantedEntity = { listing: ListingRevision };
export const GrantedEntity = /*@__PURE__*/ S.Union([
  S.Struct({ listing: ListingRevision }),
]);
export type SubscriptionGrantOverallStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | "GRANT_AND_REVOKE_FAILED"
  | "COMPLETED"
  | "INACCESSIBLE"
  | (string & {});
export const SubscriptionGrantOverallStatus = /*@__PURE__*/ S.String;

export type SubscriptionGrantStatus =
  | "GRANT_PENDING"
  | "REVOKE_PENDING"
  | "GRANT_IN_PROGRESS"
  | "REVOKE_IN_PROGRESS"
  | "GRANTED"
  | "REVOKED"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | (string & {});
export const SubscriptionGrantStatus = /*@__PURE__*/ S.String;

export interface FailureCause {
  message?: string;
}
export const FailureCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({ identifier: "FailureCause" }) as any as S.Schema<FailureCause>;
export interface SubscribedAsset {
  assetId: string;
  assetRevision: string;
  status: SubscriptionGrantStatus;
  targetName?: string;
  failureCause?: FailureCause;
  grantedTimestamp?: Date;
  failureTimestamp?: Date;
  assetScope?: AssetScope;
  permissions?: Permissions;
}
export const SubscribedAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String,
    assetRevision: S.String,
    status: SubscriptionGrantStatus,
    targetName: S.optional(S.String),
    failureCause: S.optional(FailureCause),
    grantedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    assetScope: S.optional(AssetScope),
    permissions: S.optional(Permissions),
  }),
).annotate({
  identifier: "SubscribedAsset",
}) as any as S.Schema<SubscribedAsset>;
export type SubscribedAssets = SubscribedAsset[];
export const SubscribedAssets = /*@__PURE__*/ S.Array(SubscribedAsset);
export interface CreateSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export const CreateSubscriptionGrantOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    subscriptionTargetId: S.String,
    grantedEntity: GrantedEntity,
    status: SubscriptionGrantOverallStatus,
    assets: S.optional(SubscribedAssets),
    subscriptionId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSubscriptionGrantOutput",
}) as any as S.Schema<CreateSubscriptionGrantOutput>;
export interface SubscribedProjectInput {
  identifier?: string;
}
export const SubscribedProjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.optional(S.String) }),
).annotate({
  identifier: "SubscribedProjectInput",
}) as any as S.Schema<SubscribedProjectInput>;
export interface SubscribedUserInput {
  identifier?: string;
}
export const SubscribedUserInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.optional(S.String) }),
).annotate({
  identifier: "SubscribedUserInput",
}) as any as S.Schema<SubscribedUserInput>;
export interface SubscribedGroupInput {
  identifier?: string;
}
export const SubscribedGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.optional(S.String) }),
).annotate({
  identifier: "SubscribedGroupInput",
}) as any as S.Schema<SubscribedGroupInput>;
export interface SubscribedIamPrincipalInput {
  identifier?: string;
}
export const SubscribedIamPrincipalInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.optional(S.String) }),
).annotate({
  identifier: "SubscribedIamPrincipalInput",
}) as any as S.Schema<SubscribedIamPrincipalInput>;
export type SubscribedPrincipalInput =
  | {
      project: SubscribedProjectInput;
      user?: never;
      group?: never;
      iam?: never;
    }
  | { project?: never; user: SubscribedUserInput; group?: never; iam?: never }
  | { project?: never; user?: never; group: SubscribedGroupInput; iam?: never }
  | {
      project?: never;
      user?: never;
      group?: never;
      iam: SubscribedIamPrincipalInput;
    };
export const SubscribedPrincipalInput = /*@__PURE__*/ S.Union([
  S.Struct({ project: SubscribedProjectInput }),
  S.Struct({ user: SubscribedUserInput }),
  S.Struct({ group: SubscribedGroupInput }),
  S.Struct({ iam: SubscribedIamPrincipalInput }),
]);
export type SubscribedPrincipalInputs = SubscribedPrincipalInput[];
export const SubscribedPrincipalInputs = /*@__PURE__*/ S.Array(
  SubscribedPrincipalInput,
);
export interface SubscribedListingInput {
  identifier: string;
}
export const SubscribedListingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String }),
).annotate({
  identifier: "SubscribedListingInput",
}) as any as S.Schema<SubscribedListingInput>;
export type SubscribedListingInputs = SubscribedListingInput[];
export const SubscribedListingInputs = /*@__PURE__*/ S.Array(
  SubscribedListingInput,
);
export type MetadataFormInputs = FormInput[];
export const MetadataFormInputs = /*@__PURE__*/ S.Array(FormInput);
export interface CreateSubscriptionRequestInput {
  domainIdentifier: string;
  subscribedPrincipals: SubscribedPrincipalInput[];
  subscribedListings: SubscribedListingInput[];
  requestReason: string | redacted.Redacted<string>;
  clientToken?: string;
  metadataForms?: FormInput[];
  assetPermissions?: AssetPermission[];
  assetScopes?: AcceptedAssetScope[];
}
export const CreateSubscriptionRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    subscribedPrincipals: SubscribedPrincipalInputs,
    subscribedListings: SubscribedListingInputs,
    requestReason: SensitiveString,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    metadataForms: S.optional(MetadataFormInputs),
    assetPermissions: S.optional(AssetPermissions),
    assetScopes: S.optional(AcceptedAssetScopes),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionRequestInput",
}) as any as S.Schema<CreateSubscriptionRequestInput>;
export interface CreateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export const CreateSubscriptionRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataForms: S.optional(MetadataForms),
  }),
).annotate({
  identifier: "CreateSubscriptionRequestOutput",
}) as any as S.Schema<CreateSubscriptionRequestOutput>;
export type SubscriptionTargetName = string | redacted.Redacted<string>;
export interface SubscriptionTargetForm {
  formName: string;
  content: string;
}
export const SubscriptionTargetForm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ formName: S.String, content: S.String }),
).annotate({
  identifier: "SubscriptionTargetForm",
}) as any as S.Schema<SubscriptionTargetForm>;
export type SubscriptionTargetForms = SubscriptionTargetForm[];
export const SubscriptionTargetForms = /*@__PURE__*/ S.Array(
  SubscriptionTargetForm,
);
export type AuthorizedPrincipalIdentifier = string;
export type AuthorizedPrincipalIdentifiers = string[];
export const AuthorizedPrincipalIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type IamRoleArn = string;
export type ApplicableAssetTypes = string[];
export const ApplicableAssetTypes = /*@__PURE__*/ S.Array(S.String);
export type SubscriptionGrantCreationMode =
  | "AUTOMATIC"
  | "MANUAL"
  | (string & {});
export const SubscriptionGrantCreationMode = /*@__PURE__*/ S.String;

export interface CreateSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  name: string | redacted.Redacted<string>;
  type: string;
  subscriptionTargetConfig: SubscriptionTargetForm[];
  authorizedPrincipals: string[];
  manageAccessRole: string;
  applicableAssetTypes: string[];
  provider?: string;
  clientToken?: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const CreateSubscriptionTargetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    name: SensitiveString,
    type: S.String,
    subscriptionTargetConfig: SubscriptionTargetForms,
    authorizedPrincipals: AuthorizedPrincipalIdentifiers,
    manageAccessRole: S.String,
    applicableAssetTypes: ApplicableAssetTypes,
    provider: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionTargetInput",
}) as any as S.Schema<CreateSubscriptionTargetInput>;
export interface CreateSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const CreateSubscriptionTargetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    authorizedPrincipals: AuthorizedPrincipalIdentifiers,
    domainId: S.String,
    projectId: S.String,
    environmentId: S.String,
    name: SensitiveString,
    type: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    manageAccessRole: S.optional(S.String),
    applicableAssetTypes: ApplicableAssetTypes,
    subscriptionTargetConfig: SubscriptionTargetForms,
    provider: S.String,
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }),
).annotate({
  identifier: "CreateSubscriptionTargetOutput",
}) as any as S.Schema<CreateSubscriptionTargetOutput>;
export type UserType =
  | "IAM_USER"
  | "IAM_ROLE"
  | "SSO_USER"
  | "IAM_ROLE_SESSION"
  | (string & {});
export const UserType = /*@__PURE__*/ S.String;

export interface CreateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  userType?: UserType;
  sessionName?: string;
  clientToken?: string;
}
export const CreateUserProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    userIdentifier: S.String,
    userType: S.optional(UserType),
    sessionName: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/user-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserProfileInput",
}) as any as S.Schema<CreateUserProfileInput>;
export type UserProfileType = "IAM" | "SSO" | (string & {});
export const UserProfileType = /*@__PURE__*/ S.String;

export type UserProfileStatus =
  | "ASSIGNED"
  | "NOT_ASSIGNED"
  | "ACTIVATED"
  | "DEACTIVATED"
  | (string & {});
export const UserProfileStatus = /*@__PURE__*/ S.String;

export interface CreateUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export const CreateUserProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    type: S.optional(UserProfileType),
    status: S.optional(UserProfileStatus),
    details: S.optional(UserProfileDetails),
  }),
).annotate({
  identifier: "CreateUserProfileOutput",
}) as any as S.Schema<CreateUserProfileOutput>;
export interface DeleteAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteAccountPoolInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountPoolInput",
}) as any as S.Schema<DeleteAccountPoolInput>;
export interface DeleteAccountPoolOutput {}
export const DeleteAccountPoolOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccountPoolOutput",
}) as any as S.Schema<DeleteAccountPoolOutput>;
export interface DeleteAssetInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteAssetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetInput",
}) as any as S.Schema<DeleteAssetInput>;
export interface DeleteAssetOutput {}
export const DeleteAssetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetOutput",
}) as any as S.Schema<DeleteAssetOutput>;
export interface DeleteAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
}
export const DeleteAssetFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetFilterInput",
}) as any as S.Schema<DeleteAssetFilterInput>;
export interface DeleteAssetFilterResponse {}
export const DeleteAssetFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetFilterResponse",
}) as any as S.Schema<DeleteAssetFilterResponse>;
export interface DeleteAssetTypeInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteAssetTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/asset-types/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetTypeInput",
}) as any as S.Schema<DeleteAssetTypeInput>;
export interface DeleteAssetTypeOutput {}
export const DeleteAssetTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetTypeOutput",
}) as any as S.Schema<DeleteAssetTypeOutput>;
export interface DeleteConnectionInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionInput",
}) as any as S.Schema<DeleteConnectionInput>;
export interface DeleteConnectionOutput {
  status?: string;
}
export const DeleteConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({
  identifier: "DeleteConnectionOutput",
}) as any as S.Schema<DeleteConnectionOutput>;
export interface DeleteDataExportConfigurationInput {
  domainIdentifier: string;
}
export const DeleteDataExportConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataExportConfigurationInput",
}) as any as S.Schema<DeleteDataExportConfigurationInput>;
export interface DeleteDataExportConfigurationOutput {}
export const DeleteDataExportConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataExportConfigurationOutput",
}) as any as S.Schema<DeleteDataExportConfigurationOutput>;
export interface DeleteDataProductInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteDataProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataProductInput",
}) as any as S.Schema<DeleteDataProductInput>;
export interface DeleteDataProductOutput {}
export const DeleteDataProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataProductOutput",
}) as any as S.Schema<DeleteDataProductOutput>;
export interface DeleteDataSourceInput {
  domainIdentifier: string;
  identifier: string;
  clientToken?: string;
  retainPermissionsOnRevokeFailure?: boolean;
}
export const DeleteDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    retainPermissionsOnRevokeFailure: S.optional(S.Boolean).pipe(
      T.HttpQuery("retainPermissionsOnRevokeFailure"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataSourceInput",
}) as any as S.Schema<DeleteDataSourceInput>;
export type SelfGrantStatus =
  | "GRANT_PENDING"
  | "REVOKE_PENDING"
  | "GRANT_IN_PROGRESS"
  | "REVOKE_IN_PROGRESS"
  | "GRANTED"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | (string & {});
export const SelfGrantStatus = /*@__PURE__*/ S.String;

export interface SelfGrantStatusDetail {
  databaseName: string;
  schemaName?: string;
  status: SelfGrantStatus;
  failureCause?: string;
}
export const SelfGrantStatusDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    databaseName: S.String,
    schemaName: S.optional(S.String),
    status: SelfGrantStatus,
    failureCause: S.optional(S.String),
  }),
).annotate({
  identifier: "SelfGrantStatusDetail",
}) as any as S.Schema<SelfGrantStatusDetail>;
export type SelfGrantStatusDetails = SelfGrantStatusDetail[];
export const SelfGrantStatusDetails = /*@__PURE__*/ S.Array(
  SelfGrantStatusDetail,
);
export interface GlueSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export const GlueSelfGrantStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ selfGrantStatusDetails: SelfGrantStatusDetails }),
).annotate({
  identifier: "GlueSelfGrantStatusOutput",
}) as any as S.Schema<GlueSelfGrantStatusOutput>;
export interface RedshiftSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export const RedshiftSelfGrantStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ selfGrantStatusDetails: SelfGrantStatusDetails }),
).annotate({
  identifier: "RedshiftSelfGrantStatusOutput",
}) as any as S.Schema<RedshiftSelfGrantStatusOutput>;
export type SelfGrantStatusOutput =
  | {
      glueSelfGrantStatus: GlueSelfGrantStatusOutput;
      redshiftSelfGrantStatus?: never;
    }
  | {
      glueSelfGrantStatus?: never;
      redshiftSelfGrantStatus: RedshiftSelfGrantStatusOutput;
    };
export const SelfGrantStatusOutput = /*@__PURE__*/ S.Union([
  S.Struct({ glueSelfGrantStatus: GlueSelfGrantStatusOutput }),
  S.Struct({ redshiftSelfGrantStatus: RedshiftSelfGrantStatusOutput }),
]);
export interface DeleteDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
  retainPermissionsOnRevokeFailure?: boolean;
}
export const DeleteDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.optional(DataSourceStatus),
    type: S.optional(S.String),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    domainId: S.String,
    projectId: S.String,
    environmentId: S.optional(S.String),
    connectionId: S.optional(S.String),
    configuration: S.optional(DataSourceConfigurationOutput),
    enableSetting: S.optional(EnableSetting),
    publishOnImport: S.optional(S.Boolean),
    assetFormsOutput: S.optional(FormOutputList),
    schedule: S.optional(ScheduleConfiguration),
    lastRunStatus: S.optional(DataSourceRunStatus),
    lastRunAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastRunErrorMessage: S.optional(DataSourceErrorMessage),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    selfGrantStatus: S.optional(SelfGrantStatusOutput),
    retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeleteDataSourceOutput",
}) as any as S.Schema<DeleteDataSourceOutput>;
export interface DeleteDomainInput {
  identifier: string;
  clientToken?: string;
  skipDeletionCheck?: boolean;
}
export const DeleteDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    skipDeletionCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipDeletionCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/domains/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainInput",
}) as any as S.Schema<DeleteDomainInput>;
export interface DeleteDomainOutput {
  status: DomainStatus;
}
export const DeleteDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: DomainStatus }),
).annotate({
  identifier: "DeleteDomainOutput",
}) as any as S.Schema<DeleteDomainOutput>;
export interface DeleteDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteDomainUnitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainUnitInput",
}) as any as S.Schema<DeleteDomainUnitInput>;
export interface DeleteDomainUnitOutput {}
export const DeleteDomainUnitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainUnitOutput",
}) as any as S.Schema<DeleteDomainUnitOutput>;
export interface DeleteEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentInput",
}) as any as S.Schema<DeleteEnvironmentInput>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export interface DeleteEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export const DeleteEnvironmentActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentActionInput",
}) as any as S.Schema<DeleteEnvironmentActionInput>;
export interface DeleteEnvironmentActionResponse {}
export const DeleteEnvironmentActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentActionResponse",
}) as any as S.Schema<DeleteEnvironmentActionResponse>;
export interface DeleteEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteEnvironmentBlueprintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentBlueprintInput",
}) as any as S.Schema<DeleteEnvironmentBlueprintInput>;
export interface DeleteEnvironmentBlueprintResponse {}
export const DeleteEnvironmentBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentBlueprintResponse",
}) as any as S.Schema<DeleteEnvironmentBlueprintResponse>;
export interface DeleteEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
}
export const DeleteEnvironmentBlueprintConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
      environmentBlueprintIdentifier: S.String.pipe(
        T.HttpLabel("environmentBlueprintIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteEnvironmentBlueprintConfigurationInput",
  }) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationInput>;
export interface DeleteEnvironmentBlueprintConfigurationOutput {}
export const DeleteEnvironmentBlueprintConfigurationOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteEnvironmentBlueprintConfigurationOutput",
  }) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationOutput>;
export interface DeleteEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteEnvironmentProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentProfileInput",
}) as any as S.Schema<DeleteEnvironmentProfileInput>;
export interface DeleteEnvironmentProfileResponse {}
export const DeleteEnvironmentProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentProfileResponse",
}) as any as S.Schema<DeleteEnvironmentProfileResponse>;
export interface DeleteFormTypeInput {
  domainIdentifier: string;
  formTypeIdentifier: string;
}
export const DeleteFormTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    formTypeIdentifier: S.String.pipe(T.HttpLabel("formTypeIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFormTypeInput",
}) as any as S.Schema<DeleteFormTypeInput>;
export interface DeleteFormTypeOutput {}
export const DeleteFormTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFormTypeOutput",
}) as any as S.Schema<DeleteFormTypeOutput>;
export interface DeleteGlossaryInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteGlossaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlossaryInput",
}) as any as S.Schema<DeleteGlossaryInput>;
export interface DeleteGlossaryOutput {}
export const DeleteGlossaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGlossaryOutput",
}) as any as S.Schema<DeleteGlossaryOutput>;
export interface DeleteGlossaryTermInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteGlossaryTermInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlossaryTermInput",
}) as any as S.Schema<DeleteGlossaryTermInput>;
export interface DeleteGlossaryTermOutput {}
export const DeleteGlossaryTermOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGlossaryTermOutput",
}) as any as S.Schema<DeleteGlossaryTermOutput>;
export type LineageEventIdentifier = string;
export interface DeleteLineageEventInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteLineageEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/lineage/events/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLineageEventInput",
}) as any as S.Schema<DeleteLineageEventInput>;
export type LineageEventProcessingStatus =
  | "REQUESTED"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const LineageEventProcessingStatus = /*@__PURE__*/ S.String;

export interface DeleteLineageEventOutput {
  id?: string;
  domainId?: string;
  processingStatus?: LineageEventProcessingStatus;
}
export const DeleteLineageEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    domainId: S.optional(S.String),
    processingStatus: S.optional(LineageEventProcessingStatus),
  }),
).annotate({
  identifier: "DeleteLineageEventOutput",
}) as any as S.Schema<DeleteLineageEventOutput>;
export interface DeleteListingInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteListingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/listings/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteListingInput",
}) as any as S.Schema<DeleteListingInput>;
export interface DeleteListingOutput {}
export const DeleteListingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteListingOutput",
}) as any as S.Schema<DeleteListingOutput>;
export interface DeleteNotebookInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNotebookInput",
}) as any as S.Schema<DeleteNotebookInput>;
export interface DeleteNotebookOutput {}
export const DeleteNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNotebookOutput",
}) as any as S.Schema<DeleteNotebookOutput>;
export interface DeleteProjectInput {
  domainIdentifier: string;
  identifier: string;
  skipDeletionCheck?: boolean;
}
export const DeleteProjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    skipDeletionCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipDeletionCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/projects/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectInput",
}) as any as S.Schema<DeleteProjectInput>;
export interface DeleteProjectOutput {}
export const DeleteProjectOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProjectOutput",
}) as any as S.Schema<DeleteProjectOutput>;
export interface DeleteProjectMembershipInput {
  domainIdentifier: string;
  projectIdentifier: string;
  member: Member;
}
export const DeleteProjectMembershipInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
    member: Member,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/deleteMembership",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectMembershipInput",
}) as any as S.Schema<DeleteProjectMembershipInput>;
export interface DeleteProjectMembershipOutput {}
export const DeleteProjectMembershipOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProjectMembershipOutput",
}) as any as S.Schema<DeleteProjectMembershipOutput>;
export interface DeleteProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteProjectProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectProfileInput",
}) as any as S.Schema<DeleteProjectProfileInput>;
export interface DeleteProjectProfileOutput {}
export const DeleteProjectProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProjectProfileOutput",
}) as any as S.Schema<DeleteProjectProfileOutput>;
export interface DeleteRuleInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/rules/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRuleInput",
}) as any as S.Schema<DeleteRuleInput>;
export interface DeleteRuleOutput {}
export const DeleteRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRuleOutput",
}) as any as S.Schema<DeleteRuleOutput>;
export interface DeleteSubscriptionGrantInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteSubscriptionGrantInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriptionGrantInput",
}) as any as S.Schema<DeleteSubscriptionGrantInput>;
export interface DeleteSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export const DeleteSubscriptionGrantOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    subscriptionTargetId: S.String,
    grantedEntity: GrantedEntity,
    status: SubscriptionGrantOverallStatus,
    assets: S.optional(SubscribedAssets),
    subscriptionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteSubscriptionGrantOutput",
}) as any as S.Schema<DeleteSubscriptionGrantOutput>;
export interface DeleteSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
}
export const DeleteSubscriptionRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriptionRequestInput",
}) as any as S.Schema<DeleteSubscriptionRequestInput>;
export interface DeleteSubscriptionRequestResponse {}
export const DeleteSubscriptionRequestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSubscriptionRequestResponse",
}) as any as S.Schema<DeleteSubscriptionRequestResponse>;
export interface DeleteSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export const DeleteSubscriptionTargetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriptionTargetInput",
}) as any as S.Schema<DeleteSubscriptionTargetInput>;
export interface DeleteSubscriptionTargetResponse {}
export const DeleteSubscriptionTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSubscriptionTargetResponse",
}) as any as S.Schema<DeleteSubscriptionTargetResponse>;
export type TimeSeriesEntityType = "ASSET" | "LISTING" | (string & {});
export const TimeSeriesEntityType = /*@__PURE__*/ S.String;

export interface DeleteTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  formName: string;
  clientToken?: string;
}
export const DeleteTimeSeriesDataPointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: TimeSeriesEntityType.pipe(T.HttpLabel("entityType")),
    formName: S.String.pipe(T.HttpQuery("formName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTimeSeriesDataPointsInput",
}) as any as S.Schema<DeleteTimeSeriesDataPointsInput>;
export interface DeleteTimeSeriesDataPointsOutput {}
export const DeleteTimeSeriesDataPointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTimeSeriesDataPointsOutput",
}) as any as S.Schema<DeleteTimeSeriesDataPointsOutput>;
export interface DisassociateEnvironmentRoleInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  environmentRoleArn: string;
}
export const DisassociateEnvironmentRoleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    environmentRoleArn: S.String.pipe(T.HttpLabel("environmentRoleArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateEnvironmentRoleInput",
}) as any as S.Schema<DisassociateEnvironmentRoleInput>;
export interface DisassociateEnvironmentRoleOutput {}
export const DisassociateEnvironmentRoleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateEnvironmentRoleOutput",
}) as any as S.Schema<DisassociateEnvironmentRoleOutput>;
export interface DisassociateGovernedTermsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: GovernedEntityType;
  governedGlossaryTerms: string[];
}
export const DisassociateGovernedTermsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: GovernedEntityType.pipe(T.HttpLabel("entityType")),
    governedGlossaryTerms: GovernedGlossaryTerms,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/disassociate-governed-terms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateGovernedTermsInput",
}) as any as S.Schema<DisassociateGovernedTermsInput>;
export interface DisassociateGovernedTermsOutput {}
export const DisassociateGovernedTermsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateGovernedTermsOutput",
}) as any as S.Schema<DisassociateGovernedTermsOutput>;
export interface GetAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetAccountPoolInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountPoolInput",
}) as any as S.Schema<GetAccountPoolInput>;
export interface GetAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export const GetAccountPoolOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    name: S.optional(SensitiveString),
    id: S.optional(S.String),
    description: S.optional(SensitiveString),
    resolutionStrategy: S.optional(ResolutionStrategy),
    accountSource: AccountSource,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAccountPoolOutput",
}) as any as S.Schema<GetAccountPoolOutput>;
export interface GetAssetInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export const GetAssetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAssetInput" }) as any as S.Schema<GetAssetInput>;
export interface GetAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
}
export const GetAssetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    typeIdentifier: S.String,
    typeRevision: S.String,
    externalIdentifier: S.optional(S.String),
    revision: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
    glossaryTerms: S.optional(GlossaryTerms),
    governedGlossaryTerms: S.optional(GovernedGlossaryTerms),
    owningProjectId: S.String,
    domainId: S.String,
    listing: S.optional(AssetListingDetails),
    formsOutput: FormOutputList,
    readOnlyFormsOutput: S.optional(FormOutputList),
    latestTimeSeriesDataPointFormsOutput: S.optional(
      TimeSeriesDataPointSummaryFormOutputList,
    ),
  }),
).annotate({ identifier: "GetAssetOutput" }) as any as S.Schema<GetAssetOutput>;
export interface GetAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
}
export const GetAssetFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetFilterInput",
}) as any as S.Schema<GetAssetFilterInput>;
export interface GetAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export const GetAssetFilterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    assetId: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(FilterStatus),
    configuration: AssetFilterConfiguration,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorMessage: S.optional(S.String),
    effectiveColumnNames: S.optional(ColumnNameList),
    effectiveRowFilter: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAssetFilterOutput",
}) as any as S.Schema<GetAssetFilterOutput>;
export interface GetAssetTypeInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export const GetAssetTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/asset-types/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetTypeInput",
}) as any as S.Schema<GetAssetTypeInput>;
export interface GetAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const GetAssetTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.String,
    revision: S.String,
    description: S.optional(SensitiveString),
    formsOutput: FormsOutputMap,
    owningProjectId: S.String,
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAssetTypeOutput",
}) as any as S.Schema<GetAssetTypeOutput>;
export interface GetConnectionInput {
  domainIdentifier: string;
  identifier: string;
  withSecret?: boolean;
}
export const GetConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    withSecret: S.optional(S.Boolean).pipe(T.HttpQuery("withSecret")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectionInput",
}) as any as S.Schema<GetConnectionInput>;
export interface ConnectionCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export const ConnectionCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    secretAccessKey: S.optional(SensitiveString),
    sessionToken: S.optional(SensitiveString),
    expiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ConnectionCredentials",
}) as any as S.Schema<ConnectionCredentials>;
export interface GetConnectionOutput {
  connectionCredentials?: ConnectionCredentials;
  configurations?: Configuration[];
  connectionId: string;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  environmentUserRole?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export const GetConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectionCredentials: S.optional(ConnectionCredentials),
    configurations: S.optional(Configurations),
    connectionId: S.String,
    description: S.optional(SensitiveString),
    domainId: S.String,
    domainUnitId: S.String,
    environmentId: S.optional(S.String),
    environmentUserRole: S.optional(S.String),
    name: S.String,
    physicalEndpoints: PhysicalEndpoints,
    projectId: S.optional(S.String),
    props: S.optional(ConnectionPropertiesOutput),
    type: ConnectionType,
    scope: S.optional(ConnectionScope),
  }),
).annotate({
  identifier: "GetConnectionOutput",
}) as any as S.Schema<GetConnectionOutput>;
export interface GetDataExportConfigurationInput {
  domainIdentifier: string;
}
export const GetDataExportConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataExportConfigurationInput",
}) as any as S.Schema<GetDataExportConfigurationInput>;
export type ConfigurationStatus = "COMPLETED" | "FAILED" | (string & {});
export const ConfigurationStatus = /*@__PURE__*/ S.String;

export interface EncryptionConfiguration {
  kmsKeyArn?: string;
  sseAlgorithm?: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyArn: S.optional(S.String),
    sseAlgorithm: S.optional(S.String),
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface GetDataExportConfigurationOutput {
  isExportEnabled?: boolean;
  status?: ConfigurationStatus;
  encryptionConfiguration?: EncryptionConfiguration;
  s3TableBucketArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetDataExportConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isExportEnabled: S.optional(S.Boolean),
    status: S.optional(ConfigurationStatus),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    s3TableBucketArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetDataExportConfigurationOutput",
}) as any as S.Schema<GetDataExportConfigurationOutput>;
export interface GetDataProductInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export const GetDataProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataProductInput",
}) as any as S.Schema<GetDataProductInput>;
export interface GetDataProductOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export const GetDataProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    revision: S.String,
    owningProjectId: S.String,
    name: SensitiveString,
    status: DataProductStatus,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    items: S.optional(DataProductItems),
    formsOutput: S.optional(FormOutputList),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDataProductOutput",
}) as any as S.Schema<GetDataProductOutput>;
export interface GetDataSourceInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSourceInput",
}) as any as S.Schema<GetDataSourceInput>;
export interface GetDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  lastRunAssetCount?: number;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
}
export const GetDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.optional(DataSourceStatus),
    type: S.optional(S.String),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    domainId: S.String,
    projectId: S.String,
    environmentId: S.optional(S.String),
    connectionId: S.optional(S.String),
    configuration: S.optional(DataSourceConfigurationOutput),
    recommendation: S.optional(RecommendationConfiguration),
    enableSetting: S.optional(EnableSetting),
    publishOnImport: S.optional(S.Boolean),
    assetFormsOutput: S.optional(FormOutputList),
    schedule: S.optional(ScheduleConfiguration),
    lastRunStatus: S.optional(DataSourceRunStatus),
    lastRunAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastRunErrorMessage: S.optional(DataSourceErrorMessage),
    lastRunAssetCount: S.optional(S.Number),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    selfGrantStatus: S.optional(SelfGrantStatusOutput),
  }),
).annotate({
  identifier: "GetDataSourceOutput",
}) as any as S.Schema<GetDataSourceOutput>;
export type DataSourceRunId = string;
export interface GetDataSourceRunInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetDataSourceRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-source-runs/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSourceRunInput",
}) as any as S.Schema<GetDataSourceRunInput>;
export type DataSourceRunType = "PRIORITIZED" | "SCHEDULED" | (string & {});
export const DataSourceRunType = /*@__PURE__*/ S.String;

export interface RunStatisticsForAssets {
  added?: number;
  updated?: number;
  unchanged?: number;
  skipped?: number;
  failed?: number;
}
export const RunStatisticsForAssets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    added: S.optional(S.Number),
    updated: S.optional(S.Number),
    unchanged: S.optional(S.Number),
    skipped: S.optional(S.Number),
    failed: S.optional(S.Number),
  }),
).annotate({
  identifier: "RunStatisticsForAssets",
}) as any as S.Schema<RunStatisticsForAssets>;
export type LineageImportStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | (string & {});
export const LineageImportStatus = /*@__PURE__*/ S.String;

export interface DataSourceRunLineageSummary {
  importStatus?: LineageImportStatus;
}
export const DataSourceRunLineageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importStatus: S.optional(LineageImportStatus) }),
).annotate({
  identifier: "DataSourceRunLineageSummary",
}) as any as S.Schema<DataSourceRunLineageSummary>;
export interface GetDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  lineageSummary?: DataSourceRunLineageSummary;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
}
export const GetDataSourceRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    dataSourceId: S.String,
    id: S.String,
    projectId: S.String,
    status: DataSourceRunStatus,
    type: DataSourceRunType,
    dataSourceConfigurationSnapshot: S.optional(S.String),
    runStatisticsForAssets: S.optional(RunStatisticsForAssets),
    lineageSummary: S.optional(DataSourceRunLineageSummary),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stoppedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetDataSourceRunOutput",
}) as any as S.Schema<GetDataSourceRunOutput>;
export interface GetDomainInput {
  identifier: string;
}
export const GetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domains/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetDomainInput" }) as any as S.Schema<GetDomainInput>;
export interface GetDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  name?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole: string;
  arn?: string;
  kmsKeyIdentifier?: string;
  status: DomainStatus;
  portalUrl?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
}
export const GetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    rootDomainUnitId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    singleSignOn: S.optional(SingleSignOn),
    domainExecutionRole: S.String,
    arn: S.optional(S.String),
    kmsKeyIdentifier: S.optional(S.String),
    status: DomainStatus,
    portalUrl: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(Tags),
    domainVersion: S.optional(DomainVersion),
    serviceRole: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDomainOutput",
}) as any as S.Schema<GetDomainOutput>;
export interface GetDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetDomainUnitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainUnitInput",
}) as any as S.Schema<GetDomainUnitInput>;
export interface GetDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  description?: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
}
export const GetDomainUnitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    name: SensitiveString,
    parentDomainUnitId: S.optional(S.String),
    description: S.optional(SensitiveString),
    owners: DomainUnitOwners,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDomainUnitOutput",
}) as any as S.Schema<GetDomainUnitOutput>;
export interface GetEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentInput",
}) as any as S.Schema<GetEnvironmentInput>;
export interface GetEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const GetEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    id: S.optional(S.String),
    domainId: S.String,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentProfileId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    provider: S.String,
    provisionedResources: S.optional(ResourceList),
    status: S.optional(EnvironmentStatus),
    environmentActions: S.optional(EnvironmentActionList),
    glossaryTerms: S.optional(GlossaryTerms),
    userParameters: S.optional(CustomParameterList),
    lastDeployment: S.optional(Deployment),
    provisioningProperties: S.optional(ProvisioningProperties),
    deploymentProperties: S.optional(DeploymentProperties),
    environmentBlueprintId: S.optional(S.String),
    environmentConfigurationId: S.optional(SensitiveString),
    environmentConfigurationName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GetEnvironmentOutput",
}) as any as S.Schema<GetEnvironmentOutput>;
export interface GetEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export const GetEnvironmentActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentActionInput",
}) as any as S.Schema<GetEnvironmentActionInput>;
export interface GetEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export const GetEnvironmentActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    environmentId: S.String,
    id: S.String,
    name: S.String,
    parameters: ActionParameters,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEnvironmentActionOutput",
}) as any as S.Schema<GetEnvironmentActionOutput>;
export interface GetEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetEnvironmentBlueprintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentBlueprintInput",
}) as any as S.Schema<GetEnvironmentBlueprintInput>;
export interface GetEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetEnvironmentBlueprintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    provider: S.String,
    provisioningProperties: ProvisioningProperties,
    deploymentProperties: S.optional(DeploymentProperties),
    userParameters: S.optional(CustomParameterList),
    glossaryTerms: S.optional(GlossaryTerms),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetEnvironmentBlueprintOutput",
}) as any as S.Schema<GetEnvironmentBlueprintOutput>;
export interface GetEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
}
export const GetEnvironmentBlueprintConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
      environmentBlueprintIdentifier: S.String.pipe(
        T.HttpLabel("environmentBlueprintIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetEnvironmentBlueprintConfigurationInput",
  }) as any as S.Schema<GetEnvironmentBlueprintConfigurationInput>;
export type PolicyArn = string;
export type EnabledRegionList = string[];
export const EnabledRegionList = /*@__PURE__*/ S.Array(S.String);
export type RegionalParameter = { [key: string]: string | undefined };
export const RegionalParameter = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RegionalParameterMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const RegionalParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  RegionalParameter.pipe(S.optional),
);
export type ResourceConfigurationParameterMap = {
  [key: string]: string | undefined;
};
export const ResourceConfigurationParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ResourceConfiguration {
  identifier: string;
  name: string;
  description?: string;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export const ResourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    name: S.String,
    description: S.optional(S.String),
    region: S.String,
    parameters: ResourceConfigurationParameterMap,
  }),
).annotate({
  identifier: "ResourceConfiguration",
}) as any as S.Schema<ResourceConfiguration>;
export type ResourceConfigurations = ResourceConfiguration[];
export const ResourceConfigurations = /*@__PURE__*/ S.Array(
  ResourceConfiguration,
);
export type S3Location = string;
export type S3LocationList = string[];
export const S3LocationList = /*@__PURE__*/ S.Array(S.String);
export interface LakeFormationConfiguration {
  locationRegistrationRole?: string;
  locationRegistrationExcludeS3Locations?: string[];
}
export const LakeFormationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    locationRegistrationRole: S.optional(S.String),
    locationRegistrationExcludeS3Locations: S.optional(S3LocationList),
  }),
).annotate({
  identifier: "LakeFormationConfiguration",
}) as any as S.Schema<LakeFormationConfiguration>;
export type ProvisioningConfiguration = {
  lakeFormationConfiguration: LakeFormationConfiguration;
};
export const ProvisioningConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ lakeFormationConfiguration: LakeFormationConfiguration }),
]);
export type ProvisioningConfigurationList = ProvisioningConfiguration[];
export const ProvisioningConfigurationList = /*@__PURE__*/ S.Array(
  ProvisioningConfiguration,
);
export interface GetEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export const GetEnvironmentBlueprintConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainId: S.String,
      environmentBlueprintId: S.String,
      provisioningRoleArn: S.optional(S.String),
      environmentRolePermissionBoundary: S.optional(S.String),
      manageAccessRoleArn: S.optional(S.String),
      enabledRegions: S.optional(EnabledRegionList),
      regionalParameters: S.optional(RegionalParameterMap),
      allowUserProvidedConfigurations: S.optional(S.Boolean),
      createdAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      updatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      resourceConfigurations: S.optional(ResourceConfigurations),
      provisioningConfigurations: S.optional(ProvisioningConfigurationList),
    }),
  ).annotate({
    identifier: "GetEnvironmentBlueprintConfigurationOutput",
  }) as any as S.Schema<GetEnvironmentBlueprintConfigurationOutput>;
export interface GetEnvironmentCredentialsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
}
export const GetEnvironmentCredentialsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/credentials",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentCredentialsInput",
}) as any as S.Schema<GetEnvironmentCredentialsInput>;
export interface GetEnvironmentCredentialsOutput {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export const GetEnvironmentCredentialsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    secretAccessKey: S.optional(SensitiveString),
    sessionToken: S.optional(SensitiveString),
    expiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetEnvironmentCredentialsOutput",
}) as any as S.Schema<GetEnvironmentCredentialsOutput>;
export interface GetEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetEnvironmentProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentProfileInput",
}) as any as S.Schema<GetEnvironmentProfileInput>;
export interface GetEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export const GetEnvironmentProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentBlueprintId: S.String,
    projectId: S.optional(S.String),
    userParameters: S.optional(CustomParameterList),
  }),
).annotate({
  identifier: "GetEnvironmentProfileOutput",
}) as any as S.Schema<GetEnvironmentProfileOutput>;
export interface GetFormTypeInput {
  domainIdentifier: string;
  formTypeIdentifier: string;
  revision?: string;
}
export const GetFormTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    formTypeIdentifier: S.String.pipe(T.HttpLabel("formTypeIdentifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFormTypeInput",
}) as any as S.Schema<GetFormTypeInput>;
export interface Import {
  name: string | redacted.Redacted<string>;
  revision: string;
}
export const Import = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: SensitiveString, revision: S.String }),
).annotate({ identifier: "Import" }) as any as S.Schema<Import>;
export type ImportList = Import[];
export const ImportList = /*@__PURE__*/ S.Array(Import);
export interface GetFormTypeOutput {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  model: Model;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  status?: FormTypeStatus;
  createdAt?: Date;
  createdBy?: string;
  description?: string | redacted.Redacted<string>;
  imports?: Import[];
}
export const GetFormTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: SensitiveString,
    revision: S.String,
    model: Model,
    owningProjectId: S.optional(S.String),
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
    status: S.optional(FormTypeStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    description: S.optional(SensitiveString),
    imports: S.optional(ImportList),
  }),
).annotate({
  identifier: "GetFormTypeOutput",
}) as any as S.Schema<GetFormTypeOutput>;
export interface GetGlossaryInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetGlossaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlossaryInput",
}) as any as S.Schema<GetGlossaryInput>;
export interface GetGlossaryOutput {
  domainId: string;
  id: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status: GlossaryStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const GetGlossaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    owningProjectId: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: GlossaryStatus,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "GetGlossaryOutput",
}) as any as S.Schema<GetGlossaryOutput>;
export interface GetGlossaryTermInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetGlossaryTermInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlossaryTermInput",
}) as any as S.Schema<GetGlossaryTermInput>;
export interface GetGlossaryTermOutput {
  domainId: string;
  glossaryId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status: GlossaryTermStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const GetGlossaryTermOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    glossaryId: S.String,
    id: S.String,
    name: SensitiveString,
    shortDescription: S.optional(SensitiveString),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    status: GlossaryTermStatus,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "GetGlossaryTermOutput",
}) as any as S.Schema<GetGlossaryTermOutput>;
export interface GetGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
}
export const GetGroupProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    groupIdentifier: S.String.pipe(T.HttpLabel("groupIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupProfileInput",
}) as any as S.Schema<GetGroupProfileInput>;
export interface GetGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export const GetGroupProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(GroupProfileStatus),
    groupName: S.optional(SensitiveString),
    rolePrincipalArn: S.optional(S.String),
    rolePrincipalId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGroupProfileOutput",
}) as any as S.Schema<GetGroupProfileOutput>;
export interface GetIamPortalLoginUrlInput {
  domainIdentifier: string;
}
export const GetIamPortalLoginUrlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/get-portal-login-url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIamPortalLoginUrlInput",
}) as any as S.Schema<GetIamPortalLoginUrlInput>;
export interface GetIamPortalLoginUrlOutput {
  authCodeUrl?: string;
  userProfileId: string;
}
export const GetIamPortalLoginUrlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authCodeUrl: S.optional(S.String), userProfileId: S.String }),
).annotate({
  identifier: "GetIamPortalLoginUrlOutput",
}) as any as S.Schema<GetIamPortalLoginUrlOutput>;
export type RunIdentifier = string;
export interface GetJobRunInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetJobRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/jobRuns/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRunInput" }) as any as S.Schema<GetJobRunInput>;
export type JobType = "LINEAGE" | (string & {});
export const JobType = /*@__PURE__*/ S.String;

export type JobRunMode = "SCHEDULED" | "ON_DEMAND" | (string & {});
export const JobRunMode = /*@__PURE__*/ S.String;

export type FailedQueryProcessingErrorMessages = string[];
export const FailedQueryProcessingErrorMessages = /*@__PURE__*/ S.Array(
  S.String,
);
export interface LineageSqlQueryRunDetails {
  queryStartTime?: Date;
  queryEndTime?: Date;
  totalQueriesProcessed?: number;
  numQueriesFailed?: number;
  errorMessages?: string[];
}
export const LineageSqlQueryRunDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    queryEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    totalQueriesProcessed: S.optional(S.Number),
    numQueriesFailed: S.optional(S.Number),
    errorMessages: S.optional(FailedQueryProcessingErrorMessages),
  }),
).annotate({
  identifier: "LineageSqlQueryRunDetails",
}) as any as S.Schema<LineageSqlQueryRunDetails>;
export interface LineageRunDetails {
  sqlQueryRunDetails?: LineageSqlQueryRunDetails;
}
export const LineageRunDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sqlQueryRunDetails: S.optional(LineageSqlQueryRunDetails) }),
).annotate({
  identifier: "LineageRunDetails",
}) as any as S.Schema<LineageRunDetails>;
export type JobRunDetails = { lineageRunDetails: LineageRunDetails };
export const JobRunDetails = /*@__PURE__*/ S.Union([
  S.Struct({ lineageRunDetails: LineageRunDetails }),
]);
export type JobRunStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "PARTIALLY_SUCCEEDED"
  | "FAILED"
  | "ABORTED"
  | "TIMED_OUT"
  | "CANCELED"
  | (string & {});
export const JobRunStatus = /*@__PURE__*/ S.String;

export interface JobRunError {
  message: string;
}
export const JobRunError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({ identifier: "JobRunError" }) as any as S.Schema<JobRunError>;
export interface GetJobRunOutput {
  domainId?: string;
  id?: string;
  jobId?: string;
  jobType?: JobType;
  runMode?: JobRunMode;
  details?: JobRunDetails;
  status?: JobRunStatus;
  error?: JobRunError;
  createdBy?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;
}
export const GetJobRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    jobId: S.optional(S.String),
    jobType: S.optional(JobType),
    runMode: S.optional(JobRunMode),
    details: S.optional(JobRunDetails),
    status: S.optional(JobRunStatus),
    error: S.optional(JobRunError),
    createdBy: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetJobRunOutput",
}) as any as S.Schema<GetJobRunOutput>;
export interface GetLineageEventInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetLineageEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/lineage/events/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLineageEventInput",
}) as any as S.Schema<GetLineageEventInput>;
export interface GetLineageEventOutput {
  domainId?: string;
  id?: string;
  event?: T.StreamingOutputBody;
  createdBy?: string;
  processingStatus?: LineageEventProcessingStatus;
  eventTime?: Date;
  createdAt?: Date;
}
export const GetLineageEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String).pipe(T.HttpHeader("Domain-Id")),
    id: S.optional(S.String).pipe(T.HttpHeader("Id")),
    event: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    createdBy: S.optional(S.String).pipe(T.HttpHeader("Created-By")),
    processingStatus: S.optional(LineageEventProcessingStatus).pipe(
      T.HttpHeader("Processing-Status"),
    ),
    eventTime: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
      T.HttpHeader("Event-Time"),
    ),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
      T.HttpHeader("Created-At"),
    ),
  }),
).annotate({
  identifier: "GetLineageEventOutput",
}) as any as S.Schema<GetLineageEventOutput>;
export type LineageNodeIdentifier = string;
export interface GetLineageNodeInput {
  domainIdentifier: string;
  identifier: string;
  eventTimestamp?: Date;
}
export const GetLineageNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    eventTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("timestamp")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/lineage/nodes/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLineageNodeInput",
}) as any as S.Schema<GetLineageNodeInput>;
export type LineageNodeId = string;
export interface LineageNodeReference {
  id?: string;
  eventTimestamp?: Date;
}
export const LineageNodeReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LineageNodeReference",
}) as any as S.Schema<LineageNodeReference>;
export type LineageNodeReferenceList = LineageNodeReference[];
export const LineageNodeReferenceList =
  /*@__PURE__*/ S.Array(LineageNodeReference);
export interface GetLineageNodeOutput {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
  formsOutput?: FormOutput[];
  upstreamNodes?: LineageNodeReference[];
  downstreamNodes?: LineageNodeReference[];
}
export const GetLineageNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    id: S.String,
    typeName: S.String,
    typeRevision: S.optional(S.String),
    sourceIdentifier: S.optional(S.String),
    eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    formsOutput: S.optional(FormOutputList),
    upstreamNodes: S.optional(LineageNodeReferenceList),
    downstreamNodes: S.optional(LineageNodeReferenceList),
  }),
).annotate({
  identifier: "GetLineageNodeOutput",
}) as any as S.Schema<GetLineageNodeOutput>;
export interface GetListingInput {
  domainIdentifier: string;
  identifier: string;
  listingRevision?: string;
}
export const GetListingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    listingRevision: S.optional(S.String).pipe(T.HttpQuery("listingRevision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/listings/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetListingInput",
}) as any as S.Schema<GetListingInput>;
export interface AssetListing {
  assetId?: string;
  assetRevision?: string;
  assetType?: string;
  createdAt?: Date;
  forms?: string;
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[];
  glossaryTerms?: DetailedGlossaryTerm[];
  governedGlossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
}
export const AssetListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    assetRevision: S.optional(S.String),
    assetType: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    forms: S.optional(S.String),
    latestTimeSeriesDataPointForms: S.optional(
      TimeSeriesDataPointSummaryFormOutputList,
    ),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    governedGlossaryTerms: S.optional(DetailedGlossaryTerms),
    owningProjectId: S.optional(S.String),
  }),
).annotate({ identifier: "AssetListing" }) as any as S.Schema<AssetListing>;
export interface ListingSummary {
  listingId?: string;
  listingRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
}
export const ListingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.optional(S.String),
    listingRevision: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
  }),
).annotate({ identifier: "ListingSummary" }) as any as S.Schema<ListingSummary>;
export type ListingSummaries = ListingSummary[];
export const ListingSummaries = /*@__PURE__*/ S.Array(ListingSummary);
export interface DataProductListing {
  dataProductId?: string;
  dataProductRevision?: string;
  createdAt?: Date;
  forms?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  items?: ListingSummary[];
}
export const DataProductListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProductId: S.optional(S.String),
    dataProductRevision: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    forms: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    owningProjectId: S.optional(S.String),
    items: S.optional(ListingSummaries),
  }),
).annotate({
  identifier: "DataProductListing",
}) as any as S.Schema<DataProductListing>;
export type ListingItem =
  | { assetListing: AssetListing; dataProductListing?: never }
  | { assetListing?: never; dataProductListing: DataProductListing };
export const ListingItem = /*@__PURE__*/ S.Union([
  S.Struct({ assetListing: AssetListing }),
  S.Struct({ dataProductListing: DataProductListing }),
]);
export interface GetListingOutput {
  domainId: string;
  id: string;
  listingRevision: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  item?: ListingItem;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status?: ListingStatus;
}
export const GetListingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    listingRevision: S.String,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedBy: S.optional(S.String),
    item: S.optional(ListingItem),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    status: S.optional(ListingStatus),
  }),
).annotate({
  identifier: "GetListingOutput",
}) as any as S.Schema<GetListingOutput>;
export type MetadataGenerationRunType =
  | "BUSINESS_DESCRIPTIONS"
  | "BUSINESS_NAMES"
  | "BUSINESS_GLOSSARY_ASSOCIATIONS"
  | (string & {});
export const MetadataGenerationRunType = /*@__PURE__*/ S.String;

export interface GetMetadataGenerationRunInput {
  domainIdentifier: string;
  identifier: string;
  type?: MetadataGenerationRunType;
}
export const GetMetadataGenerationRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    type: S.optional(MetadataGenerationRunType).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMetadataGenerationRunInput",
}) as any as S.Schema<GetMetadataGenerationRunInput>;
export type MetadataGenerationTargetType = "ASSET" | (string & {});
export const MetadataGenerationTargetType = /*@__PURE__*/ S.String;

export interface MetadataGenerationRunTarget {
  type: MetadataGenerationTargetType;
  identifier: string;
  revision?: string;
}
export const MetadataGenerationRunTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: MetadataGenerationTargetType,
    identifier: S.String,
    revision: S.optional(S.String),
  }),
).annotate({
  identifier: "MetadataGenerationRunTarget",
}) as any as S.Schema<MetadataGenerationRunTarget>;
export type MetadataGenerationRunStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "CANCELED"
  | "SUCCEEDED"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | (string & {});
export const MetadataGenerationRunStatus = /*@__PURE__*/ S.String;

export type MetadataGenerationRunTypes = MetadataGenerationRunType[];
export const MetadataGenerationRunTypes = /*@__PURE__*/ S.Array(
  MetadataGenerationRunType,
);
export interface MetadataGenerationRunTypeStat {
  type: MetadataGenerationRunType;
  status: MetadataGenerationRunStatus;
  errorMessage?: string;
}
export const MetadataGenerationRunTypeStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: MetadataGenerationRunType,
    status: MetadataGenerationRunStatus,
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "MetadataGenerationRunTypeStat",
}) as any as S.Schema<MetadataGenerationRunTypeStat>;
export type MetadataGenerationRunTypeStats = MetadataGenerationRunTypeStat[];
export const MetadataGenerationRunTypeStats = /*@__PURE__*/ S.Array(
  MetadataGenerationRunTypeStat,
);
export interface GetMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId: string;
  typeStats?: MetadataGenerationRunTypeStat[];
}
export const GetMetadataGenerationRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    target: S.optional(MetadataGenerationRunTarget),
    status: S.optional(MetadataGenerationRunStatus),
    type: S.optional(MetadataGenerationRunType),
    types: S.optional(MetadataGenerationRunTypes),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    owningProjectId: S.String,
    typeStats: S.optional(MetadataGenerationRunTypeStats),
  }),
).annotate({
  identifier: "GetMetadataGenerationRunOutput",
}) as any as S.Schema<GetMetadataGenerationRunOutput>;
export interface GetNotebookInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotebookInput",
}) as any as S.Schema<GetNotebookInput>;
export interface GetNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
}
export const GetNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    domainId: S.String,
    cellOrder: CellOrder,
    status: NotebookStatus,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    lockedBy: S.optional(S.String),
    lockedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lockExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    computeId: S.optional(S.String),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    environmentConfiguration: S.optional(EnvironmentConfig),
    error: S.optional(NotebookError),
  }),
).annotate({
  identifier: "GetNotebookOutput",
}) as any as S.Schema<GetNotebookOutput>;
export type ExportId = string;
export interface GetNotebookExportInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetNotebookExportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notebook-exports/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotebookExportInput",
}) as any as S.Schema<GetNotebookExportInput>;
export type FileFormat = "PDF" | "IPYNB" | (string & {});
export const FileFormat = /*@__PURE__*/ S.String;

export type NotebookExportStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const NotebookExportStatus = /*@__PURE__*/ S.String;

export type NotebookS3Uri = string | redacted.Redacted<string>;
export interface S3Destination {
  uri?: string | redacted.Redacted<string>;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(SensitiveString) }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export type OutputLocation = { s3: S3Destination };
export const OutputLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3Destination }),
]);
export interface NotebookExportError {
  message: string;
}
export const NotebookExportError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "NotebookExportError",
}) as any as S.Schema<NotebookExportError>;
export type CompletedAt = Date;
export interface GetNotebookExportOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  fileFormat: FileFormat;
  status: NotebookExportStatus;
  outputLocation?: OutputLocation;
  error?: NotebookExportError;
  completedAt?: Date;
  createdAt?: Date;
  createdBy?: string;
}
export const GetNotebookExportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    notebookId: S.String,
    fileFormat: FileFormat,
    status: NotebookExportStatus,
    outputLocation: S.optional(OutputLocation),
    error: S.optional(NotebookExportError),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetNotebookExportOutput",
}) as any as S.Schema<GetNotebookExportOutput>;
export type NotebookRunId = string;
export interface GetNotebookRunInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetNotebookRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notebook-runs/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotebookRunInput",
}) as any as S.Schema<GetNotebookRunInput>;
export type ScheduleId = string;
export type NotebookRunStatus =
  | "QUEUED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const NotebookRunStatus = /*@__PURE__*/ S.String;

export type InstanceType = string;
export interface ComputeConfig {
  instanceType?: string;
  environmentVersion?: string;
}
export const ComputeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceType: S.optional(S.String),
    environmentVersion: S.optional(S.String),
  }),
).annotate({ identifier: "ComputeConfig" }) as any as S.Schema<ComputeConfig>;
export type NetworkAccessType =
  | "PUBLIC_INTERNET_ONLY"
  | "VPC_ONLY"
  | (string & {});
export const NetworkAccessType = /*@__PURE__*/ S.String;

export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface NetworkConfig {
  networkAccessType: NetworkAccessType;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export const NetworkConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkAccessType: NetworkAccessType,
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetIds),
    securityGroupIds: S.optional(SecurityGroupIds),
  }),
).annotate({ identifier: "NetworkConfig" }) as any as S.Schema<NetworkConfig>;
export interface TimeoutConfig {
  runTimeoutInMinutes?: number;
}
export const TimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runTimeoutInMinutes: S.optional(S.Number) }),
).annotate({ identifier: "TimeoutConfig" }) as any as S.Schema<TimeoutConfig>;
export type S3Path = string;
export interface StorageConfig {
  projectS3Path?: string;
  kmsKeyArn?: string;
}
export const StorageConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectS3Path: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "StorageConfig" }) as any as S.Schema<StorageConfig>;
export type TriggerSourceType =
  | "MANUAL"
  | "SCHEDULED"
  | "WORKFLOW"
  | (string & {});
export const TriggerSourceType = /*@__PURE__*/ S.String;

export interface TriggerSource {
  type?: TriggerSourceType;
  name?: string;
}
export const TriggerSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(TriggerSourceType), name: S.optional(S.String) }),
).annotate({ identifier: "TriggerSource" }) as any as S.Schema<TriggerSource>;
export interface NotebookRunError {
  message: string;
}
export const NotebookRunError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({
  identifier: "NotebookRunError",
}) as any as S.Schema<NotebookRunError>;
export interface GetNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  environmentConfiguration?: EnvironmentConfig;
  storageConfiguration?: StorageConfig;
  triggerSource?: TriggerSource;
  error?: NotebookRunError;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export const GetNotebookRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    notebookId: S.String,
    scheduleId: S.optional(S.String),
    status: NotebookRunStatus,
    cellOrder: S.optional(CellOrder),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    computeConfiguration: S.optional(ComputeConfig),
    networkConfiguration: S.optional(NetworkConfig),
    timeoutConfiguration: S.optional(TimeoutConfig),
    environmentConfiguration: S.optional(EnvironmentConfig),
    storageConfiguration: S.optional(StorageConfig),
    triggerSource: S.optional(TriggerSource),
    error: S.optional(NotebookRunError),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetNotebookRunOutput",
}) as any as S.Schema<GetNotebookRunOutput>;
export interface GetProjectInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetProjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/projects/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProjectInput",
}) as any as S.Schema<GetProjectInput>;
export interface GetProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export const GetProjectOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    projectStatus: S.optional(ProjectStatus),
    failureReasons: S.optional(FailureReasons),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    resourceTags: S.optional(ResourceTags),
    glossaryTerms: S.optional(GlossaryTerms),
    domainUnitId: S.optional(S.String),
    projectProfileId: S.optional(S.String),
    userParameters: S.optional(EnvironmentConfigurationUserParametersList),
    environmentDeploymentDetails: S.optional(EnvironmentDeploymentDetails),
    projectCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProjectOutput",
}) as any as S.Schema<GetProjectOutput>;
export interface GetProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetProjectProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProjectProfileInput",
}) as any as S.Schema<GetProjectProfileInput>;
export interface GetProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export const GetProjectProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    projectResourceTags: S.optional(ProjectResourceTagParameters),
    allowCustomProjectResourceTags: S.optional(S.Boolean),
    projectResourceTagsDescription: S.optional(SensitiveString),
    environmentConfigurations: S.optional(EnvironmentConfigurationsList),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProjectProfileOutput",
}) as any as S.Schema<GetProjectProfileOutput>;
export interface GetRuleInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export const GetRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/rules/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetRuleInput" }) as any as S.Schema<GetRuleInput>;
export interface GetRuleOutput {
  identifier: string;
  revision: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  targetType?: RuleTargetType;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
}
export const GetRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    revision: S.String,
    name: SensitiveString,
    ruleType: RuleType,
    target: RuleTarget,
    action: RuleAction,
    scope: RuleScope,
    detail: RuleDetail,
    targetType: S.optional(RuleTargetType),
    description: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdBy: S.String,
    lastUpdatedBy: S.String,
  }),
).annotate({ identifier: "GetRuleOutput" }) as any as S.Schema<GetRuleOutput>;
export interface GetSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionInput",
}) as any as S.Schema<GetSubscriptionInput>;
export interface GetSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export const GetSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    subscribedPrincipal: SubscribedPrincipal,
    subscribedListing: SubscribedListing,
    subscriptionRequestId: S.optional(S.String),
    retainPermissions: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetSubscriptionOutput",
}) as any as S.Schema<GetSubscriptionOutput>;
export interface GetSubscriptionGrantInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetSubscriptionGrantInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionGrantInput",
}) as any as S.Schema<GetSubscriptionGrantInput>;
export interface GetSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export const GetSubscriptionGrantOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    subscriptionTargetId: S.String,
    grantedEntity: GrantedEntity,
    status: SubscriptionGrantOverallStatus,
    assets: S.optional(SubscribedAssets),
    subscriptionId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSubscriptionGrantOutput",
}) as any as S.Schema<GetSubscriptionGrantOutput>;
export interface GetSubscriptionRequestDetailsInput {
  domainIdentifier: string;
  identifier: string;
}
export const GetSubscriptionRequestDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionRequestDetailsInput",
}) as any as S.Schema<GetSubscriptionRequestDetailsInput>;
export interface GetSubscriptionRequestDetailsOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export const GetSubscriptionRequestDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataForms: S.optional(MetadataForms),
  }),
).annotate({
  identifier: "GetSubscriptionRequestDetailsOutput",
}) as any as S.Schema<GetSubscriptionRequestDetailsOutput>;
export interface GetSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export const GetSubscriptionTargetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionTargetInput",
}) as any as S.Schema<GetSubscriptionTargetInput>;
export interface GetSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const GetSubscriptionTargetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    authorizedPrincipals: AuthorizedPrincipalIdentifiers,
    domainId: S.String,
    projectId: S.String,
    environmentId: S.String,
    name: SensitiveString,
    type: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    manageAccessRole: S.optional(S.String),
    applicableAssetTypes: ApplicableAssetTypes,
    subscriptionTargetConfig: SubscriptionTargetForms,
    provider: S.String,
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }),
).annotate({
  identifier: "GetSubscriptionTargetOutput",
}) as any as S.Schema<GetSubscriptionTargetOutput>;
export type TimeSeriesDataPointIdentifier = string;
export interface GetTimeSeriesDataPointInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  identifier: string;
  formName: string;
}
export const GetTimeSeriesDataPointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: TimeSeriesEntityType.pipe(T.HttpLabel("entityType")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    formName: S.String.pipe(T.HttpQuery("formName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTimeSeriesDataPointInput",
}) as any as S.Schema<GetTimeSeriesDataPointInput>;
export interface TimeSeriesDataPointFormOutput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  content?: string;
  id?: string;
}
export const TimeSeriesDataPointFormOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formName: S.String,
    typeIdentifier: S.String,
    typeRevision: S.optional(S.String),
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    content: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "TimeSeriesDataPointFormOutput",
}) as any as S.Schema<TimeSeriesDataPointFormOutput>;
export interface GetTimeSeriesDataPointOutput {
  domainId?: string;
  entityId?: string;
  entityType?: TimeSeriesEntityType;
  formName?: string;
  form?: TimeSeriesDataPointFormOutput;
}
export const GetTimeSeriesDataPointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    entityId: S.optional(S.String),
    entityType: S.optional(TimeSeriesEntityType),
    formName: S.optional(S.String),
    form: S.optional(TimeSeriesDataPointFormOutput),
  }),
).annotate({
  identifier: "GetTimeSeriesDataPointOutput",
}) as any as S.Schema<GetTimeSeriesDataPointOutput>;
export interface GetUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType;
  sessionName?: string;
}
export const GetUserProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    userIdentifier: S.String.pipe(T.HttpLabel("userIdentifier")),
    type: S.optional(UserProfileType).pipe(T.HttpQuery("type")),
    sessionName: S.optional(S.String).pipe(T.HttpQuery("sessionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserProfileInput",
}) as any as S.Schema<GetUserProfileInput>;
export interface GetUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export const GetUserProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    type: S.optional(UserProfileType),
    status: S.optional(UserProfileStatus),
    details: S.optional(UserProfileDetails),
  }),
).annotate({
  identifier: "GetUserProfileOutput",
}) as any as S.Schema<GetUserProfileOutput>;
export type SortFieldAccountPool = "NAME" | (string & {});
export const SortFieldAccountPool = /*@__PURE__*/ S.String;

export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export type PaginationToken = string;
export type MaxResults = number;
export interface ListAccountPoolsInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string>;
  sortBy?: SortFieldAccountPool;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListAccountPoolsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
    sortBy: S.optional(SortFieldAccountPool).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/account-pools",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountPoolsInput",
}) as any as S.Schema<ListAccountPoolsInput>;
export interface AccountPoolSummary {
  domainId?: string;
  id?: string;
  name?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  domainUnitId?: string;
  createdBy?: string;
  updatedBy?: string;
}
export const AccountPoolSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    name: S.optional(SensitiveString),
    resolutionStrategy: S.optional(ResolutionStrategy),
    domainUnitId: S.optional(S.String),
    createdBy: S.optional(S.String),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountPoolSummary",
}) as any as S.Schema<AccountPoolSummary>;
export type AccountPoolSummaries = AccountPoolSummary[];
export const AccountPoolSummaries = /*@__PURE__*/ S.Array(AccountPoolSummary);
export interface ListAccountPoolsOutput {
  items?: AccountPoolSummary[];
  nextToken?: string;
}
export const ListAccountPoolsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AccountPoolSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountPoolsOutput",
}) as any as S.Schema<ListAccountPoolsOutput>;
export interface ListAccountsInAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAccountsInAccountPoolInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}/accounts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountsInAccountPoolInput",
}) as any as S.Schema<ListAccountsInAccountPoolInput>;
export interface ListAccountsInAccountPoolOutput {
  items?: AccountInfo[];
  nextToken?: string;
}
export const ListAccountsInAccountPoolOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AccountInfoList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountsInAccountPoolOutput",
}) as any as S.Schema<ListAccountsInAccountPoolOutput>;
export interface ListAssetFiltersInput {
  domainIdentifier: string;
  assetIdentifier: string;
  status?: FilterStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssetFiltersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    status: S.optional(FilterStatus).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetFiltersInput",
}) as any as S.Schema<ListAssetFiltersInput>;
export interface AssetFilterSummary {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
  createdAt?: Date;
  errorMessage?: string;
}
export const AssetFilterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    assetId: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(FilterStatus),
    effectiveColumnNames: S.optional(ColumnNameList),
    effectiveRowFilter: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetFilterSummary",
}) as any as S.Schema<AssetFilterSummary>;
export type AssetFilters = AssetFilterSummary[];
export const AssetFilters = /*@__PURE__*/ S.Array(AssetFilterSummary);
export interface ListAssetFiltersOutput {
  items: AssetFilterSummary[];
  nextToken?: string;
}
export const ListAssetFiltersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: AssetFilters, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssetFiltersOutput",
}) as any as S.Schema<ListAssetFiltersOutput>;
export interface ListAssetRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssetRevisionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetRevisionsInput",
}) as any as S.Schema<ListAssetRevisionsInput>;
export interface AssetRevision {
  domainId?: string;
  id?: string;
  revision?: string;
  createdBy?: string;
  createdAt?: Date;
}
export const AssetRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    revision: S.optional(S.String),
    createdBy: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "AssetRevision" }) as any as S.Schema<AssetRevision>;
export type AssetRevisions = AssetRevision[];
export const AssetRevisions = /*@__PURE__*/ S.Array(AssetRevision);
export interface ListAssetRevisionsOutput {
  items?: AssetRevision[];
  nextToken?: string;
}
export const ListAssetRevisionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AssetRevisions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetRevisionsOutput",
}) as any as S.Schema<ListAssetRevisionsOutput>;
export type SortFieldConnection = "NAME" | (string & {});
export const SortFieldConnection = /*@__PURE__*/ S.String;

export interface ListConnectionsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortFieldConnection;
  sortOrder?: SortOrder;
  name?: string;
  environmentIdentifier?: string;
  projectIdentifier?: string;
  type?: ConnectionType;
  scope?: ConnectionScope;
}
export const ListConnectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortFieldConnection).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    environmentIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environmentIdentifier"),
    ),
    projectIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("projectIdentifier"),
    ),
    type: S.optional(ConnectionType).pipe(T.HttpQuery("type")),
    scope: S.optional(ConnectionScope).pipe(T.HttpQuery("scope")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/connections",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectionsInput",
}) as any as S.Schema<ListConnectionsInput>;
export interface ConnectionSummary {
  configurations?: Configuration[];
  connectionId: string;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export const ConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: S.optional(Configurations),
    connectionId: S.String,
    domainId: S.String,
    domainUnitId: S.String,
    environmentId: S.optional(S.String),
    name: S.String,
    physicalEndpoints: PhysicalEndpoints,
    projectId: S.optional(S.String),
    props: S.optional(ConnectionPropertiesOutput),
    type: ConnectionType,
    scope: S.optional(ConnectionScope),
  }),
).annotate({
  identifier: "ConnectionSummary",
}) as any as S.Schema<ConnectionSummary>;
export type ConnectionSummaries = ConnectionSummary[];
export const ConnectionSummaries = /*@__PURE__*/ S.Array(ConnectionSummary);
export interface ListConnectionsOutput {
  items: ConnectionSummary[];
  nextToken?: string;
}
export const ListConnectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: ConnectionSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListConnectionsOutput",
}) as any as S.Schema<ListConnectionsOutput>;
export interface ListDataProductRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDataProductRevisionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataProductRevisionsInput",
}) as any as S.Schema<ListDataProductRevisionsInput>;
export interface DataProductRevision {
  domainId?: string;
  id?: string;
  revision?: string;
  createdAt?: Date;
  createdBy?: string;
}
export const DataProductRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    revision: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "DataProductRevision",
}) as any as S.Schema<DataProductRevision>;
export type DataProductRevisions = DataProductRevision[];
export const DataProductRevisions = /*@__PURE__*/ S.Array(DataProductRevision);
export interface ListDataProductRevisionsOutput {
  items: DataProductRevision[];
  nextToken?: string;
}
export const ListDataProductRevisionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DataProductRevisions, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDataProductRevisionsOutput",
}) as any as S.Schema<ListDataProductRevisionsOutput>;
export type DataAssetActivityStatus =
  | "FAILED"
  | "PUBLISHING_FAILED"
  | "SUCCEEDED_CREATED"
  | "SUCCEEDED_UPDATED"
  | "SKIPPED_ALREADY_IMPORTED"
  | "SKIPPED_ARCHIVED"
  | "SKIPPED_NO_ACCESS"
  | "UNCHANGED"
  | (string & {});
export const DataAssetActivityStatus = /*@__PURE__*/ S.String;

export interface ListDataSourceRunActivitiesInput {
  domainIdentifier: string;
  identifier: string;
  status?: DataAssetActivityStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourceRunActivitiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    status: S.optional(DataAssetActivityStatus).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-source-runs/{identifier}/activities",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourceRunActivitiesInput",
}) as any as S.Schema<ListDataSourceRunActivitiesInput>;
export type LineageEventErrorMessage = string;
export interface LineageInfo {
  eventId?: string;
  eventStatus?: LineageEventProcessingStatus;
  errorMessage?: string;
}
export const LineageInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventStatus: S.optional(LineageEventProcessingStatus),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "LineageInfo" }) as any as S.Schema<LineageInfo>;
export interface DataSourceRunActivity {
  database: string | redacted.Redacted<string>;
  dataSourceRunId: string;
  technicalName: string | redacted.Redacted<string>;
  dataAssetStatus: DataAssetActivityStatus;
  projectId: string;
  dataAssetId?: string;
  technicalDescription?: string | redacted.Redacted<string>;
  errorMessage?: DataSourceErrorMessage;
  lineageSummary?: LineageInfo;
  createdAt: Date;
  updatedAt: Date;
}
export const DataSourceRunActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    database: SensitiveString,
    dataSourceRunId: S.String,
    technicalName: SensitiveString,
    dataAssetStatus: DataAssetActivityStatus,
    projectId: S.String,
    dataAssetId: S.optional(S.String),
    technicalDescription: S.optional(SensitiveString),
    errorMessage: S.optional(DataSourceErrorMessage),
    lineageSummary: S.optional(LineageInfo),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DataSourceRunActivity",
}) as any as S.Schema<DataSourceRunActivity>;
export type DataSourceRunActivities = DataSourceRunActivity[];
export const DataSourceRunActivities = /*@__PURE__*/ S.Array(
  DataSourceRunActivity,
);
export interface ListDataSourceRunActivitiesOutput {
  items: DataSourceRunActivity[];
  nextToken?: string;
}
export const ListDataSourceRunActivitiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DataSourceRunActivities, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDataSourceRunActivitiesOutput",
}) as any as S.Schema<ListDataSourceRunActivitiesOutput>;
export interface ListDataSourceRunsInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  status?: DataSourceRunStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourceRunsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    dataSourceIdentifier: S.String.pipe(T.HttpLabel("dataSourceIdentifier")),
    status: S.optional(DataSourceRunStatus).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourceRunsInput",
}) as any as S.Schema<ListDataSourceRunsInput>;
export interface DataSourceRunSummary {
  id: string;
  dataSourceId: string;
  type: DataSourceRunType;
  status: DataSourceRunStatus;
  projectId: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  lineageSummary?: DataSourceRunLineageSummary;
}
export const DataSourceRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    dataSourceId: S.String,
    type: DataSourceRunType,
    status: DataSourceRunStatus,
    projectId: S.String,
    runStatisticsForAssets: S.optional(RunStatisticsForAssets),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stoppedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lineageSummary: S.optional(DataSourceRunLineageSummary),
  }),
).annotate({
  identifier: "DataSourceRunSummary",
}) as any as S.Schema<DataSourceRunSummary>;
export type DataSourceRunSummaries = DataSourceRunSummary[];
export const DataSourceRunSummaries =
  /*@__PURE__*/ S.Array(DataSourceRunSummary);
export interface ListDataSourceRunsOutput {
  items: DataSourceRunSummary[];
  nextToken?: string;
}
export const ListDataSourceRunsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DataSourceRunSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDataSourceRunsOutput",
}) as any as S.Schema<ListDataSourceRunsOutput>;
export interface ListDataSourcesInput {
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string;
  connectionIdentifier?: string;
  type?: string;
  status?: DataSourceStatus;
  name?: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    projectIdentifier: S.String.pipe(T.HttpQuery("projectIdentifier")),
    environmentIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environmentIdentifier"),
    ),
    connectionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("connectionIdentifier"),
    ),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    status: S.optional(DataSourceStatus).pipe(T.HttpQuery("status")),
    name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/data-sources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourcesInput",
}) as any as S.Schema<ListDataSourcesInput>;
export interface DataSourceSummary {
  domainId: string;
  environmentId?: string;
  connectionId?: string;
  dataSourceId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  status: DataSourceStatus;
  enableSetting?: EnableSetting;
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  lastRunAssetCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
}
export const DataSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    environmentId: S.optional(S.String),
    connectionId: S.optional(S.String),
    dataSourceId: S.String,
    name: SensitiveString,
    type: S.String,
    status: DataSourceStatus,
    enableSetting: S.optional(EnableSetting),
    schedule: S.optional(ScheduleConfiguration),
    lastRunStatus: S.optional(DataSourceRunStatus),
    lastRunAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastRunErrorMessage: S.optional(DataSourceErrorMessage),
    lastRunAssetCount: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DataSourceSummary",
}) as any as S.Schema<DataSourceSummary>;
export type DataSourceSummaries = DataSourceSummary[];
export const DataSourceSummaries = /*@__PURE__*/ S.Array(DataSourceSummary);
export interface ListDataSourcesOutput {
  items: DataSourceSummary[];
  nextToken?: string;
}
export const ListDataSourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DataSourceSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDataSourcesOutput",
}) as any as S.Schema<ListDataSourcesOutput>;
export type MaxResultsForListDomains = number;
export interface ListDomainsInput {
  status?: DomainStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(DomainStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsInput",
}) as any as S.Schema<ListDomainsInput>;
export type DomainName = string | redacted.Redacted<string>;
export type DomainDescription = string | redacted.Redacted<string>;
export interface DomainSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  managedAccountId: string;
  status: DomainStatus;
  portalUrl?: string;
  createdAt: Date;
  lastUpdatedAt?: Date;
  domainVersion?: DomainVersion;
}
export const DomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    arn: S.String,
    managedAccountId: S.String,
    status: DomainStatus,
    portalUrl: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    domainVersion: S.optional(DomainVersion),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaries = DomainSummary[];
export const DomainSummaries = /*@__PURE__*/ S.Array(DomainSummary);
export interface ListDomainsOutput {
  items: DomainSummary[];
  nextToken?: string;
}
export const ListDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DomainSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDomainsOutput",
}) as any as S.Schema<ListDomainsOutput>;
export interface ListDomainUnitsForParentInput {
  domainIdentifier: string;
  parentDomainUnitIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDomainUnitsForParentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    parentDomainUnitIdentifier: S.String.pipe(
      T.HttpQuery("parentDomainUnitIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/domain-units",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainUnitsForParentInput",
}) as any as S.Schema<ListDomainUnitsForParentInput>;
export interface DomainUnitSummary {
  name: string;
  id: string;
}
export const DomainUnitSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, id: S.String }),
).annotate({
  identifier: "DomainUnitSummary",
}) as any as S.Schema<DomainUnitSummary>;
export type DomainUnitSummaries = DomainUnitSummary[];
export const DomainUnitSummaries = /*@__PURE__*/ S.Array(DomainUnitSummary);
export interface ListDomainUnitsForParentOutput {
  items: DomainUnitSummary[];
  nextToken?: string;
}
export const ListDomainUnitsForParentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: DomainUnitSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDomainUnitsForParentOutput",
}) as any as S.Schema<ListDomainUnitsForParentOutput>;
export interface ListEntityOwnersInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEntityOwnersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: DataZoneEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/owners",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntityOwnersInput",
}) as any as S.Schema<ListEntityOwnersInput>;
export interface OwnerUserPropertiesOutput {
  userId?: string;
}
export const OwnerUserPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "OwnerUserPropertiesOutput",
}) as any as S.Schema<OwnerUserPropertiesOutput>;
export interface OwnerGroupPropertiesOutput {
  groupId?: string;
}
export const OwnerGroupPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupId: S.optional(S.String) }),
).annotate({
  identifier: "OwnerGroupPropertiesOutput",
}) as any as S.Schema<OwnerGroupPropertiesOutput>;
export type OwnerPropertiesOutput =
  | { user: OwnerUserPropertiesOutput; group?: never }
  | { user?: never; group: OwnerGroupPropertiesOutput };
export const OwnerPropertiesOutput = /*@__PURE__*/ S.Union([
  S.Struct({ user: OwnerUserPropertiesOutput }),
  S.Struct({ group: OwnerGroupPropertiesOutput }),
]);
export type EntityOwners = OwnerPropertiesOutput[];
export const EntityOwners = /*@__PURE__*/ S.Array(OwnerPropertiesOutput);
export interface ListEntityOwnersOutput {
  owners: OwnerPropertiesOutput[];
  nextToken?: string;
}
export const ListEntityOwnersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ owners: EntityOwners, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEntityOwnersOutput",
}) as any as S.Schema<ListEntityOwnersOutput>;
export interface ListEnvironmentActionsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentActionsInput",
}) as any as S.Schema<ListEnvironmentActionsInput>;
export interface EnvironmentActionSummary {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export const EnvironmentActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    environmentId: S.String,
    id: S.String,
    name: S.String,
    parameters: ActionParameters,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentActionSummary",
}) as any as S.Schema<EnvironmentActionSummary>;
export type ListEnvironmentActionSummaries = EnvironmentActionSummary[];
export const ListEnvironmentActionSummaries = /*@__PURE__*/ S.Array(
  EnvironmentActionSummary,
);
export interface ListEnvironmentActionsOutput {
  items?: EnvironmentActionSummary[];
  nextToken?: string;
}
export const ListEnvironmentActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListEnvironmentActionSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnvironmentActionsOutput",
}) as any as S.Schema<ListEnvironmentActionsOutput>;
export interface ListEnvironmentBlueprintConfigurationsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEnvironmentBlueprintConfigurationsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListEnvironmentBlueprintConfigurationsInput",
  }) as any as S.Schema<ListEnvironmentBlueprintConfigurationsInput>;
export interface EnvironmentBlueprintConfigurationItem {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export const EnvironmentBlueprintConfigurationItem = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      domainId: S.String,
      environmentBlueprintId: S.String,
      provisioningRoleArn: S.optional(S.String),
      environmentRolePermissionBoundary: S.optional(S.String),
      manageAccessRoleArn: S.optional(S.String),
      enabledRegions: S.optional(EnabledRegionList),
      regionalParameters: S.optional(RegionalParameterMap),
      allowUserProvidedConfigurations: S.optional(S.Boolean),
      createdAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      updatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      resourceConfigurations: S.optional(ResourceConfigurations),
      provisioningConfigurations: S.optional(ProvisioningConfigurationList),
    }),
).annotate({
  identifier: "EnvironmentBlueprintConfigurationItem",
}) as any as S.Schema<EnvironmentBlueprintConfigurationItem>;
export type EnvironmentBlueprintConfigurations =
  EnvironmentBlueprintConfigurationItem[];
export const EnvironmentBlueprintConfigurations = /*@__PURE__*/ S.Array(
  EnvironmentBlueprintConfigurationItem,
);
export interface ListEnvironmentBlueprintConfigurationsOutput {
  items?: EnvironmentBlueprintConfigurationItem[];
  nextToken?: string;
}
export const ListEnvironmentBlueprintConfigurationsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: S.optional(EnvironmentBlueprintConfigurations),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEnvironmentBlueprintConfigurationsOutput",
  }) as any as S.Schema<ListEnvironmentBlueprintConfigurationsOutput>;
export interface ListEnvironmentBlueprintsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
  managed?: boolean;
}
export const ListEnvironmentBlueprintsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    managed: S.optional(S.Boolean).pipe(T.HttpQuery("managed")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environment-blueprints",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentBlueprintsInput",
}) as any as S.Schema<ListEnvironmentBlueprintsInput>;
export interface EnvironmentBlueprintSummary {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  createdAt?: Date;
  updatedAt?: Date;
}
export const EnvironmentBlueprintSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    provider: S.String,
    provisioningProperties: ProvisioningProperties,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "EnvironmentBlueprintSummary",
}) as any as S.Schema<EnvironmentBlueprintSummary>;
export type EnvironmentBlueprintSummaries = EnvironmentBlueprintSummary[];
export const EnvironmentBlueprintSummaries = /*@__PURE__*/ S.Array(
  EnvironmentBlueprintSummary,
);
export interface ListEnvironmentBlueprintsOutput {
  items: EnvironmentBlueprintSummary[];
  nextToken?: string;
}
export const ListEnvironmentBlueprintsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: EnvironmentBlueprintSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnvironmentBlueprintsOutput",
}) as any as S.Schema<ListEnvironmentBlueprintsOutput>;
export interface ListEnvironmentProfilesInput {
  domainIdentifier: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  environmentBlueprintIdentifier?: string;
  projectIdentifier?: string;
  name?: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    awsAccountId: S.optional(S.String).pipe(T.HttpQuery("awsAccountId")),
    awsAccountRegion: S.optional(S.String).pipe(
      T.HttpQuery("awsAccountRegion"),
    ),
    environmentBlueprintIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environmentBlueprintIdentifier"),
    ),
    projectIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("projectIdentifier"),
    ),
    name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environment-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentProfilesInput",
}) as any as S.Schema<ListEnvironmentProfilesInput>;
export interface EnvironmentProfileSummary {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
}
export const EnvironmentProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentBlueprintId: S.String,
    projectId: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentProfileSummary",
}) as any as S.Schema<EnvironmentProfileSummary>;
export type EnvironmentProfileSummaries = EnvironmentProfileSummary[];
export const EnvironmentProfileSummaries = /*@__PURE__*/ S.Array(
  EnvironmentProfileSummary,
);
export interface ListEnvironmentProfilesOutput {
  items: EnvironmentProfileSummary[];
  nextToken?: string;
}
export const ListEnvironmentProfilesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: EnvironmentProfileSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnvironmentProfilesOutput",
}) as any as S.Schema<ListEnvironmentProfilesOutput>;
export interface ListEnvironmentsInput {
  domainIdentifier: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  awsAccountRegion?: string;
  projectIdentifier: string;
  environmentProfileIdentifier?: string;
  environmentBlueprintIdentifier?: string;
  provider?: string;
  name?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEnvironmentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    awsAccountId: S.optional(S.String).pipe(T.HttpQuery("awsAccountId")),
    status: S.optional(EnvironmentStatus).pipe(T.HttpQuery("status")),
    awsAccountRegion: S.optional(S.String).pipe(
      T.HttpQuery("awsAccountRegion"),
    ),
    projectIdentifier: S.String.pipe(T.HttpQuery("projectIdentifier")),
    environmentProfileIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environmentProfileIdentifier"),
    ),
    environmentBlueprintIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environmentBlueprintIdentifier"),
    ),
    provider: S.optional(S.String).pipe(T.HttpQuery("provider")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsInput",
}) as any as S.Schema<ListEnvironmentsInput>;
export interface EnvironmentSummary {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  status?: EnvironmentStatus;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const EnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    id: S.optional(S.String),
    domainId: S.String,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentProfileId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    provider: S.String,
    status: S.optional(EnvironmentStatus),
    environmentConfigurationId: S.optional(SensitiveString),
    environmentConfigurationName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export type EnvironmentSummaries = EnvironmentSummary[];
export const EnvironmentSummaries = /*@__PURE__*/ S.Array(EnvironmentSummary);
export interface ListEnvironmentsOutput {
  items: EnvironmentSummary[];
  nextToken?: string;
}
export const ListEnvironmentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: EnvironmentSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListEnvironmentsOutput",
}) as any as S.Schema<ListEnvironmentsOutput>;
export interface ListJobRunsInput {
  domainIdentifier: string;
  jobIdentifier: string;
  status?: JobRunStatus;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListJobRunsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")),
    status: S.optional(JobRunStatus).pipe(T.HttpQuery("status")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/jobs/{jobIdentifier}/runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobRunsInput",
}) as any as S.Schema<ListJobRunsInput>;
export interface JobRunSummary {
  domainId?: string;
  jobId?: string;
  jobType?: JobType;
  runId?: string;
  runMode?: JobRunMode;
  status?: JobRunStatus;
  error?: JobRunError;
  createdBy?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;
}
export const JobRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    jobId: S.optional(S.String),
    jobType: S.optional(JobType),
    runId: S.optional(S.String),
    runMode: S.optional(JobRunMode),
    status: S.optional(JobRunStatus),
    error: S.optional(JobRunError),
    createdBy: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "JobRunSummary" }) as any as S.Schema<JobRunSummary>;
export type JobRunSummaries = JobRunSummary[];
export const JobRunSummaries = /*@__PURE__*/ S.Array(JobRunSummary);
export interface ListJobRunsOutput {
  items?: JobRunSummary[];
  nextToken?: string;
}
export const ListJobRunsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(JobRunSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobRunsOutput",
}) as any as S.Schema<ListJobRunsOutput>;
export interface ListLineageEventsInput {
  domainIdentifier: string;
  maxResults?: number;
  timestampAfter?: Date;
  timestampBefore?: Date;
  processingStatus?: LineageEventProcessingStatus;
  sortOrder?: SortOrder;
  nextToken?: string;
}
export const ListLineageEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    timestampAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("timestampAfter")),
    timestampBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("timestampBefore")),
    processingStatus: S.optional(LineageEventProcessingStatus).pipe(
      T.HttpQuery("processingStatus"),
    ),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/lineage/events",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLineageEventsInput",
}) as any as S.Schema<ListLineageEventsInput>;
export type OpenLineageRunState =
  | "START"
  | "RUNNING"
  | "COMPLETE"
  | "ABORT"
  | "FAIL"
  | "OTHER"
  | (string & {});
export const OpenLineageRunState = /*@__PURE__*/ S.String;

export interface NameIdentifier {
  name?: string;
  namespace?: string;
}
export const NameIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), namespace: S.optional(S.String) }),
).annotate({ identifier: "NameIdentifier" }) as any as S.Schema<NameIdentifier>;
export type NameIdentifiers = NameIdentifier[];
export const NameIdentifiers = /*@__PURE__*/ S.Array(NameIdentifier);
export interface OpenLineageRunEventSummary {
  eventType?: OpenLineageRunState;
  runId?: string;
  job?: NameIdentifier;
  inputs?: NameIdentifier[];
  outputs?: NameIdentifier[];
}
export const OpenLineageRunEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventType: S.optional(OpenLineageRunState),
    runId: S.optional(S.String),
    job: S.optional(NameIdentifier),
    inputs: S.optional(NameIdentifiers),
    outputs: S.optional(NameIdentifiers),
  }),
).annotate({
  identifier: "OpenLineageRunEventSummary",
}) as any as S.Schema<OpenLineageRunEventSummary>;
export type EventSummary = {
  openLineageRunEventSummary: OpenLineageRunEventSummary;
};
export const EventSummary = /*@__PURE__*/ S.Union([
  S.Struct({ openLineageRunEventSummary: OpenLineageRunEventSummary }),
]);
export interface LineageEventSummary {
  id?: string;
  domainId?: string;
  processingStatus?: LineageEventProcessingStatus;
  eventTime?: Date;
  eventSummary?: EventSummary;
  createdBy?: string;
  createdAt?: Date;
}
export const LineageEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    domainId: S.optional(S.String),
    processingStatus: S.optional(LineageEventProcessingStatus),
    eventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    eventSummary: S.optional(EventSummary),
    createdBy: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LineageEventSummary",
}) as any as S.Schema<LineageEventSummary>;
export type LineageEventSummaries = LineageEventSummary[];
export const LineageEventSummaries = /*@__PURE__*/ S.Array(LineageEventSummary);
export interface ListLineageEventsOutput {
  items?: LineageEventSummary[];
  nextToken?: string;
}
export const ListLineageEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(LineageEventSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLineageEventsOutput",
}) as any as S.Schema<ListLineageEventsOutput>;
export type EdgeDirection = "UPSTREAM" | "DOWNSTREAM" | (string & {});
export const EdgeDirection = /*@__PURE__*/ S.String;

export interface ListLineageNodeHistoryInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  identifier: string;
  direction?: EdgeDirection;
  eventTimestampGTE?: Date;
  eventTimestampLTE?: Date;
  sortOrder?: SortOrder;
}
export const ListLineageNodeHistoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    direction: S.optional(EdgeDirection).pipe(T.HttpQuery("direction")),
    eventTimestampGTE: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("timestampGTE")),
    eventTimestampLTE: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("timestampLTE")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/lineage/nodes/{identifier}/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLineageNodeHistoryInput",
}) as any as S.Schema<ListLineageNodeHistoryInput>;
export interface LineageNodeSummary {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
}
export const LineageNodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    id: S.String,
    typeName: S.String,
    typeRevision: S.optional(S.String),
    sourceIdentifier: S.optional(S.String),
    eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LineageNodeSummary",
}) as any as S.Schema<LineageNodeSummary>;
export type LineageNodeSummaries = LineageNodeSummary[];
export const LineageNodeSummaries = /*@__PURE__*/ S.Array(LineageNodeSummary);
export interface ListLineageNodeHistoryOutput {
  nodes?: LineageNodeSummary[];
  nextToken?: string;
}
export const ListLineageNodeHistoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodes: S.optional(LineageNodeSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLineageNodeHistoryOutput",
}) as any as S.Schema<ListLineageNodeHistoryOutput>;
export interface ListMetadataGenerationRunsInput {
  domainIdentifier: string;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  nextToken?: string;
  maxResults?: number;
  targetIdentifier?: string;
}
export const ListMetadataGenerationRunsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    status: S.optional(MetadataGenerationRunStatus).pipe(T.HttpQuery("status")),
    type: S.optional(MetadataGenerationRunType).pipe(T.HttpQuery("type")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    targetIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("targetIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMetadataGenerationRunsInput",
}) as any as S.Schema<ListMetadataGenerationRunsInput>;
export interface MetadataGenerationRunItem {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId: string;
}
export const MetadataGenerationRunItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    target: S.optional(MetadataGenerationRunTarget),
    status: S.optional(MetadataGenerationRunStatus),
    type: S.optional(MetadataGenerationRunType),
    types: S.optional(MetadataGenerationRunTypes),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    owningProjectId: S.String,
  }),
).annotate({
  identifier: "MetadataGenerationRunItem",
}) as any as S.Schema<MetadataGenerationRunItem>;
export type MetadataGenerationRuns = MetadataGenerationRunItem[];
export const MetadataGenerationRuns = /*@__PURE__*/ S.Array(
  MetadataGenerationRunItem,
);
export interface ListMetadataGenerationRunsOutput {
  items?: MetadataGenerationRunItem[];
  nextToken?: string;
}
export const ListMetadataGenerationRunsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(MetadataGenerationRuns),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMetadataGenerationRunsOutput",
}) as any as S.Schema<ListMetadataGenerationRunsOutput>;
export interface ListNotebookRunsInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier?: string;
  status?: NotebookRunStatus;
  scheduleIdentifier?: string;
  maxResults?: number;
  sortOrder?: SortOrder;
  nextToken?: string;
}
export const ListNotebookRunsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.String.pipe(
      T.HttpQuery("owningProjectIdentifier"),
    ),
    notebookIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("notebookIdentifier"),
    ),
    status: S.optional(NotebookRunStatus).pipe(T.HttpQuery("status")),
    scheduleIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("scheduleIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notebook-runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotebookRunsInput",
}) as any as S.Schema<ListNotebookRunsInput>;
export interface NotebookRunSummary {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  triggerSource?: TriggerSource;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export const NotebookRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    notebookId: S.String,
    scheduleId: S.optional(S.String),
    status: NotebookRunStatus,
    triggerSource: S.optional(TriggerSource),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "NotebookRunSummary",
}) as any as S.Schema<NotebookRunSummary>;
export type NotebookRunSummaryList = NotebookRunSummary[];
export const NotebookRunSummaryList = /*@__PURE__*/ S.Array(NotebookRunSummary);
export interface ListNotebookRunsOutput {
  items?: NotebookRunSummary[];
  nextToken?: string;
}
export const ListNotebookRunsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(NotebookRunSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotebookRunsOutput",
}) as any as S.Schema<ListNotebookRunsOutput>;
export type SortKey = "CREATED_AT" | "UPDATED_AT" | (string & {});
export const SortKey = /*@__PURE__*/ S.String;

export interface ListNotebooksInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  maxResults?: number;
  sortOrder?: SortOrder;
  sortBy?: SortKey;
  status?: NotebookStatus;
  nextToken?: string;
}
export const ListNotebooksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.String.pipe(
      T.HttpQuery("owningProjectIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    sortBy: S.optional(SortKey).pipe(T.HttpQuery("sortBy")),
    status: S.optional(NotebookStatus).pipe(T.HttpQuery("status")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notebooks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotebooksInput",
}) as any as S.Schema<ListNotebooksInput>;
export interface NotebookSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const NotebookSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    domainId: S.String,
    status: NotebookStatus,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "NotebookSummary",
}) as any as S.Schema<NotebookSummary>;
export type NotebookSummaryList = NotebookSummary[];
export const NotebookSummaryList = /*@__PURE__*/ S.Array(NotebookSummary);
export interface ListNotebooksOutput {
  items?: NotebookSummary[];
  nextToken?: string;
}
export const ListNotebooksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(NotebookSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotebooksOutput",
}) as any as S.Schema<ListNotebooksOutput>;
export type NotificationType = "TASK" | "EVENT" | (string & {});
export const NotificationType = /*@__PURE__*/ S.String;

export type NotificationSubjects = string[];
export const NotificationSubjects = /*@__PURE__*/ S.Array(S.String);
export type TaskStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const TaskStatus = /*@__PURE__*/ S.String;

export interface ListNotificationsInput {
  domainIdentifier: string;
  type: NotificationType;
  afterTimestamp?: Date;
  beforeTimestamp?: Date;
  subjects?: string[];
  taskStatus?: TaskStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListNotificationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    type: NotificationType.pipe(T.HttpQuery("type")),
    afterTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("afterTimestamp")),
    beforeTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("beforeTimestamp")),
    subjects: S.optional(NotificationSubjects).pipe(T.HttpQuery("subjects")),
    taskStatus: S.optional(TaskStatus).pipe(T.HttpQuery("taskStatus")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/notifications",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotificationsInput",
}) as any as S.Schema<ListNotificationsInput>;
export type TaskId = string;
export type NotificationResourceType = "PROJECT" | (string & {});
export const NotificationResourceType = /*@__PURE__*/ S.String;

export interface NotificationResource {
  type: NotificationResourceType;
  id: string;
  name?: string;
}
export const NotificationResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: NotificationResourceType,
    id: S.String,
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationResource",
}) as any as S.Schema<NotificationResource>;
export type NotificationRole =
  | "PROJECT_OWNER"
  | "PROJECT_CONTRIBUTOR"
  | "PROJECT_VIEWER"
  | "DOMAIN_OWNER"
  | "PROJECT_SUBSCRIBER"
  | (string & {});
export const NotificationRole = /*@__PURE__*/ S.String;

export interface Topic {
  subject: string;
  resource: NotificationResource;
  role: NotificationRole;
}
export const Topic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subject: S.String,
    resource: NotificationResource,
    role: NotificationRole,
  }),
).annotate({ identifier: "Topic" }) as any as S.Schema<Topic>;
export type Title = string | redacted.Redacted<string>;
export type Message = string | redacted.Redacted<string>;
export type ActionLink = string | redacted.Redacted<string>;
export type MetadataMap = { [key: string]: string | undefined };
export const MetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface NotificationOutput {
  identifier: string;
  domainIdentifier: string;
  type: NotificationType;
  topic: Topic;
  title: string | redacted.Redacted<string>;
  message: string | redacted.Redacted<string>;
  status?: TaskStatus;
  actionLink: string | redacted.Redacted<string>;
  creationTimestamp: Date;
  lastUpdatedTimestamp: Date;
  metadata?: { [key: string]: string | undefined };
}
export const NotificationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    domainIdentifier: S.String,
    type: NotificationType,
    topic: Topic,
    title: SensitiveString,
    message: SensitiveString,
    status: S.optional(TaskStatus),
    actionLink: SensitiveString,
    creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metadata: S.optional(MetadataMap),
  }),
).annotate({
  identifier: "NotificationOutput",
}) as any as S.Schema<NotificationOutput>;
export type NotificationsList = NotificationOutput[];
export const NotificationsList = /*@__PURE__*/ S.Array(NotificationOutput);
export interface ListNotificationsOutput {
  notifications?: NotificationOutput[];
  nextToken?: string;
}
export const ListNotificationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    notifications: S.optional(NotificationsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotificationsOutput",
}) as any as S.Schema<ListNotificationsOutput>;
export interface ListPolicyGrantsInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  maxResults?: number;
  nextToken?: string;
}
export const ListPolicyGrantsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: TargetEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    policyType: ManagedPolicyType.pipe(T.HttpQuery("policyType")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/grants",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyGrantsInput",
}) as any as S.Schema<ListPolicyGrantsInput>;
export interface PolicyGrantMember {
  principal?: PolicyGrantPrincipal;
  detail?: PolicyGrantDetail;
  createdAt?: Date;
  createdBy?: string;
  grantId?: string;
}
export const PolicyGrantMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(PolicyGrantPrincipal),
    detail: S.optional(PolicyGrantDetail),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    grantId: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyGrantMember",
}) as any as S.Schema<PolicyGrantMember>;
export type PolicyGrantList = PolicyGrantMember[];
export const PolicyGrantList = /*@__PURE__*/ S.Array(PolicyGrantMember);
export interface ListPolicyGrantsOutput {
  grantList: PolicyGrantMember[];
  nextToken?: string;
}
export const ListPolicyGrantsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ grantList: PolicyGrantList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPolicyGrantsOutput",
}) as any as S.Schema<ListPolicyGrantsOutput>;
export type SortFieldProject = "NAME" | (string & {});
export const SortFieldProject = /*@__PURE__*/ S.String;

export interface ListProjectMembershipsInput {
  domainIdentifier: string;
  projectIdentifier: string;
  sortBy?: SortFieldProject;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListProjectMembershipsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
    sortBy: S.optional(SortFieldProject).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/memberships",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectMembershipsInput",
}) as any as S.Schema<ListProjectMembershipsInput>;
export interface UserDetails {
  userId: string;
}
export const UserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String }),
).annotate({ identifier: "UserDetails" }) as any as S.Schema<UserDetails>;
export interface GroupDetails {
  groupId: string;
}
export const GroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupId: S.String }),
).annotate({ identifier: "GroupDetails" }) as any as S.Schema<GroupDetails>;
export type MemberDetails =
  | { user: UserDetails; group?: never }
  | { user?: never; group: GroupDetails };
export const MemberDetails = /*@__PURE__*/ S.Union([
  S.Struct({ user: UserDetails }),
  S.Struct({ group: GroupDetails }),
]);
export interface ProjectMember {
  memberDetails: MemberDetails;
  designation: UserDesignation;
}
export const ProjectMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memberDetails: MemberDetails, designation: UserDesignation }),
).annotate({ identifier: "ProjectMember" }) as any as S.Schema<ProjectMember>;
export type ProjectMembers = ProjectMember[];
export const ProjectMembers = /*@__PURE__*/ S.Array(ProjectMember);
export interface ListProjectMembershipsOutput {
  members: ProjectMember[];
  nextToken?: string;
}
export const ListProjectMembershipsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ members: ProjectMembers, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListProjectMembershipsOutput",
}) as any as S.Schema<ListProjectMembershipsOutput>;
export interface ListProjectProfilesInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string>;
  sortBy?: SortFieldProject;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListProjectProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
    sortBy: S.optional(SortFieldProject).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/project-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectProfilesInput",
}) as any as S.Schema<ListProjectProfilesInput>;
export interface ProjectProfileSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export const ProjectProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "ProjectProfileSummary",
}) as any as S.Schema<ProjectProfileSummary>;
export type ProjectProfileSummaries = ProjectProfileSummary[];
export const ProjectProfileSummaries = /*@__PURE__*/ S.Array(
  ProjectProfileSummary,
);
export interface ListProjectProfilesOutput {
  items?: ProjectProfileSummary[];
  nextToken?: string;
}
export const ListProjectProfilesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ProjectProfileSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProjectProfilesOutput",
}) as any as S.Schema<ListProjectProfilesOutput>;
export interface ListProjectsInput {
  domainIdentifier: string;
  userIdentifier?: string;
  groupIdentifier?: string;
  name?: string | redacted.Redacted<string>;
  projectCategory?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListProjectsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    userIdentifier: S.optional(S.String).pipe(T.HttpQuery("userIdentifier")),
    groupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
    name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
    projectCategory: S.optional(S.String).pipe(T.HttpQuery("projectCategory")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectsInput",
}) as any as S.Schema<ListProjectsInput>;
export interface ProjectSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  domainUnitId?: string;
  projectCategory?: string;
}
export const ProjectSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    projectStatus: S.optional(ProjectStatus),
    failureReasons: S.optional(FailureReasons),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainUnitId: S.optional(S.String),
    projectCategory: S.optional(S.String),
  }),
).annotate({ identifier: "ProjectSummary" }) as any as S.Schema<ProjectSummary>;
export type ProjectSummaries = ProjectSummary[];
export const ProjectSummaries = /*@__PURE__*/ S.Array(ProjectSummary);
export interface ListProjectsOutput {
  items?: ProjectSummary[];
  nextToken?: string;
}
export const ListProjectsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ProjectSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProjectsOutput",
}) as any as S.Schema<ListProjectsOutput>;
export type ProjectIds = string[];
export const ProjectIds = /*@__PURE__*/ S.Array(S.String);
export type AssetTypeIdentifiers = string[];
export const AssetTypeIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface ListRulesInput {
  domainIdentifier: string;
  targetType: RuleTargetType;
  targetIdentifier: string;
  ruleType?: RuleType;
  action?: RuleAction;
  projectIds?: string[];
  assetTypes?: string[];
  dataProduct?: boolean;
  includeCascaded?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    targetType: RuleTargetType.pipe(T.HttpLabel("targetType")),
    targetIdentifier: S.String.pipe(T.HttpLabel("targetIdentifier")),
    ruleType: S.optional(RuleType).pipe(T.HttpQuery("ruleType")),
    action: S.optional(RuleAction).pipe(T.HttpQuery("ruleAction")),
    projectIds: S.optional(ProjectIds).pipe(T.HttpQuery("projectIds")),
    assetTypes: S.optional(AssetTypeIdentifiers).pipe(
      T.HttpQuery("assetTypes"),
    ),
    dataProduct: S.optional(S.Boolean).pipe(T.HttpQuery("dataProduct")),
    includeCascaded: S.optional(S.Boolean).pipe(T.HttpQuery("includeCascaded")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/list-rules/{targetType}/{targetIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListRulesInput" }) as any as S.Schema<ListRulesInput>;
export interface RuleSummary {
  identifier?: string;
  revision?: string;
  ruleType?: RuleType;
  name?: string | redacted.Redacted<string>;
  targetType?: RuleTargetType;
  target?: RuleTarget;
  action?: RuleAction;
  scope?: RuleScope;
  updatedAt?: Date;
  lastUpdatedBy?: string;
}
export const RuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    revision: S.optional(S.String),
    ruleType: S.optional(RuleType),
    name: S.optional(SensitiveString),
    targetType: S.optional(RuleTargetType),
    target: S.optional(RuleTarget),
    action: S.optional(RuleAction),
    scope: S.optional(RuleScope),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaries = RuleSummary[];
export const RuleSummaries = /*@__PURE__*/ S.Array(RuleSummary);
export interface ListRulesOutput {
  items: RuleSummary[];
  nextToken?: string;
}
export const ListRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: RuleSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRulesOutput",
}) as any as S.Schema<ListRulesOutput>;
export interface ListSubscriptionGrantsInput {
  domainIdentifier: string;
  environmentId?: string;
  subscriptionTargetId?: string;
  subscribedListingId?: string;
  subscriptionId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  owningUserId?: string;
  owningGroupId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubscriptionGrantsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentId: S.optional(S.String).pipe(T.HttpQuery("environmentId")),
    subscriptionTargetId: S.optional(S.String).pipe(
      T.HttpQuery("subscriptionTargetId"),
    ),
    subscribedListingId: S.optional(S.String).pipe(
      T.HttpQuery("subscribedListingId"),
    ),
    subscriptionId: S.optional(S.String).pipe(T.HttpQuery("subscriptionId")),
    owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
    owningIamPrincipalArn: S.optional(S.String).pipe(
      T.HttpQuery("owningIamPrincipalArn"),
    ),
    owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
    owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
    sortBy: S.optional(SortKey).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscription-grants",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionGrantsInput",
}) as any as S.Schema<ListSubscriptionGrantsInput>;
export interface SubscriptionGrantSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export const SubscriptionGrantSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    subscriptionTargetId: S.String,
    grantedEntity: GrantedEntity,
    status: SubscriptionGrantOverallStatus,
    assets: S.optional(SubscribedAssets),
    subscriptionId: S.optional(S.String),
  }),
).annotate({
  identifier: "SubscriptionGrantSummary",
}) as any as S.Schema<SubscriptionGrantSummary>;
export type SubscriptionGrants = SubscriptionGrantSummary[];
export const SubscriptionGrants = /*@__PURE__*/ S.Array(
  SubscriptionGrantSummary,
);
export interface ListSubscriptionGrantsOutput {
  items: SubscriptionGrantSummary[];
  nextToken?: string;
}
export const ListSubscriptionGrantsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: SubscriptionGrants, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSubscriptionGrantsOutput",
}) as any as S.Schema<ListSubscriptionGrantsOutput>;
export interface ListSubscriptionRequestsInput {
  domainIdentifier: string;
  status?: SubscriptionRequestStatus;
  subscribedListingId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  approverProjectId?: string;
  owningUserId?: string;
  owningGroupId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubscriptionRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    status: S.optional(SubscriptionRequestStatus).pipe(T.HttpQuery("status")),
    subscribedListingId: S.optional(S.String).pipe(
      T.HttpQuery("subscribedListingId"),
    ),
    owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
    owningIamPrincipalArn: S.optional(S.String).pipe(
      T.HttpQuery("owningIamPrincipalArn"),
    ),
    approverProjectId: S.optional(S.String).pipe(
      T.HttpQuery("approverProjectId"),
    ),
    owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
    owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
    sortBy: S.optional(SortKey).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionRequestsInput",
}) as any as S.Schema<ListSubscriptionRequestsInput>;
export interface MetadataFormSummary {
  formName?: string;
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
}
export const MetadataFormSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formName: S.optional(S.String),
    typeName: SensitiveString,
    typeRevision: S.String,
  }),
).annotate({
  identifier: "MetadataFormSummary",
}) as any as S.Schema<MetadataFormSummary>;
export type MetadataFormsSummary = MetadataFormSummary[];
export const MetadataFormsSummary = /*@__PURE__*/ S.Array(MetadataFormSummary);
export interface SubscriptionRequestSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataFormsSummary?: MetadataFormSummary[];
}
export const SubscriptionRequestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataFormsSummary: S.optional(MetadataFormsSummary),
  }),
).annotate({
  identifier: "SubscriptionRequestSummary",
}) as any as S.Schema<SubscriptionRequestSummary>;
export type SubscriptionRequests = SubscriptionRequestSummary[];
export const SubscriptionRequests = /*@__PURE__*/ S.Array(
  SubscriptionRequestSummary,
);
export interface ListSubscriptionRequestsOutput {
  items: SubscriptionRequestSummary[];
  nextToken?: string;
}
export const ListSubscriptionRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: SubscriptionRequests, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSubscriptionRequestsOutput",
}) as any as S.Schema<ListSubscriptionRequestsOutput>;
export interface ListSubscriptionsInput {
  domainIdentifier: string;
  subscriptionRequestIdentifier?: string;
  status?: SubscriptionStatus;
  subscribedListingId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  owningUserId?: string;
  owningGroupId?: string;
  approverProjectId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubscriptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    subscriptionRequestIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("subscriptionRequestIdentifier"),
    ),
    status: S.optional(SubscriptionStatus).pipe(T.HttpQuery("status")),
    subscribedListingId: S.optional(S.String).pipe(
      T.HttpQuery("subscribedListingId"),
    ),
    owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
    owningIamPrincipalArn: S.optional(S.String).pipe(
      T.HttpQuery("owningIamPrincipalArn"),
    ),
    owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
    owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
    approverProjectId: S.optional(S.String).pipe(
      T.HttpQuery("approverProjectId"),
    ),
    sortBy: S.optional(SortKey).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/subscriptions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionsInput",
}) as any as S.Schema<ListSubscriptionsInput>;
export interface SubscriptionSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export const SubscriptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    subscribedPrincipal: SubscribedPrincipal,
    subscribedListing: SubscribedListing,
    subscriptionRequestId: S.optional(S.String),
    retainPermissions: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SubscriptionSummary",
}) as any as S.Schema<SubscriptionSummary>;
export type Subscriptions = SubscriptionSummary[];
export const Subscriptions = /*@__PURE__*/ S.Array(SubscriptionSummary);
export interface ListSubscriptionsOutput {
  items: SubscriptionSummary[];
  nextToken?: string;
}
export const ListSubscriptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: Subscriptions, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSubscriptionsOutput",
}) as any as S.Schema<ListSubscriptionsOutput>;
export interface ListSubscriptionTargetsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubscriptionTargetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    sortBy: S.optional(SortKey).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionTargetsInput",
}) as any as S.Schema<ListSubscriptionTargetsInput>;
export interface SubscriptionTargetSummary {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const SubscriptionTargetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    authorizedPrincipals: AuthorizedPrincipalIdentifiers,
    domainId: S.String,
    projectId: S.String,
    environmentId: S.String,
    name: SensitiveString,
    type: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    manageAccessRole: S.optional(S.String),
    applicableAssetTypes: ApplicableAssetTypes,
    subscriptionTargetConfig: SubscriptionTargetForms,
    provider: S.String,
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }),
).annotate({
  identifier: "SubscriptionTargetSummary",
}) as any as S.Schema<SubscriptionTargetSummary>;
export type SubscriptionTargets = SubscriptionTargetSummary[];
export const SubscriptionTargets = /*@__PURE__*/ S.Array(
  SubscriptionTargetSummary,
);
export interface ListSubscriptionTargetsOutput {
  items: SubscriptionTargetSummary[];
  nextToken?: string;
}
export const ListSubscriptionTargetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: SubscriptionTargets, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSubscriptionTargetsOutput",
}) as any as S.Schema<ListSubscriptionTargetsOutput>;
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  formName: string;
  startedAt?: Date;
  endedAt?: Date;
  nextToken?: string;
  maxResults?: number;
}
export const ListTimeSeriesDataPointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: TimeSeriesEntityType.pipe(T.HttpLabel("entityType")),
    formName: S.String.pipe(T.HttpQuery("formName")),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startedAt"),
    ),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endedAt"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTimeSeriesDataPointsInput",
}) as any as S.Schema<ListTimeSeriesDataPointsInput>;
export interface ListTimeSeriesDataPointsOutput {
  items?: TimeSeriesDataPointSummaryFormOutput[];
  nextToken?: string;
}
export const ListTimeSeriesDataPointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(TimeSeriesDataPointSummaryFormOutputList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTimeSeriesDataPointsOutput",
}) as any as S.Schema<ListTimeSeriesDataPointsOutput>;
export interface PostLineageEventInput {
  domainIdentifier: string;
  event: T.StreamingInputBody;
  clientToken?: string;
}
export const PostLineageEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    event: T.StreamingInput.pipe(T.HttpPayload()),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("Client-Token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/lineage/events",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PostLineageEventInput",
}) as any as S.Schema<PostLineageEventInput>;
export interface PostLineageEventOutput {
  id?: string;
  domainId?: string;
}
export const PostLineageEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), domainId: S.optional(S.String) }),
).annotate({
  identifier: "PostLineageEventOutput",
}) as any as S.Schema<PostLineageEventOutput>;
export interface TimeSeriesDataPointFormInput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  content?: string;
}
export const TimeSeriesDataPointFormInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formName: S.String,
    typeIdentifier: S.String,
    typeRevision: S.optional(S.String),
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    content: S.optional(S.String),
  }),
).annotate({
  identifier: "TimeSeriesDataPointFormInput",
}) as any as S.Schema<TimeSeriesDataPointFormInput>;
export type TimeSeriesDataPointFormInputList = TimeSeriesDataPointFormInput[];
export const TimeSeriesDataPointFormInputList = /*@__PURE__*/ S.Array(
  TimeSeriesDataPointFormInput,
);
export interface PostTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  forms: TimeSeriesDataPointFormInput[];
  clientToken?: string;
}
export const PostTimeSeriesDataPointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    entityType: TimeSeriesEntityType.pipe(T.HttpLabel("entityType")),
    forms: TimeSeriesDataPointFormInputList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PostTimeSeriesDataPointsInput",
}) as any as S.Schema<PostTimeSeriesDataPointsInput>;
export type TimeSeriesDataPointFormOutputList = TimeSeriesDataPointFormOutput[];
export const TimeSeriesDataPointFormOutputList = /*@__PURE__*/ S.Array(
  TimeSeriesDataPointFormOutput,
);
export interface PostTimeSeriesDataPointsOutput {
  domainId?: string;
  entityId?: string;
  entityType?: TimeSeriesEntityType;
  forms?: TimeSeriesDataPointFormOutput[];
}
export const PostTimeSeriesDataPointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    entityId: S.optional(S.String),
    entityType: S.optional(TimeSeriesEntityType),
    forms: S.optional(TimeSeriesDataPointFormOutputList),
  }),
).annotate({
  identifier: "PostTimeSeriesDataPointsOutput",
}) as any as S.Schema<PostTimeSeriesDataPointsOutput>;
export interface PutDataExportConfigurationInput {
  domainIdentifier: string;
  enableExport: boolean;
  encryptionConfiguration?: EncryptionConfiguration;
  clientToken?: string;
}
export const PutDataExportConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    enableExport: S.Boolean,
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDataExportConfigurationInput",
}) as any as S.Schema<PutDataExportConfigurationInput>;
export interface PutDataExportConfigurationOutput {}
export const PutDataExportConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutDataExportConfigurationOutput",
}) as any as S.Schema<PutDataExportConfigurationOutput>;
export interface PutResourceConfiguration {
  name: string;
  description?: string;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export const PutResourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    region: S.String,
    parameters: ResourceConfigurationParameterMap,
  }),
).annotate({
  identifier: "PutResourceConfiguration",
}) as any as S.Schema<PutResourceConfiguration>;
export type PutResourceConfigurations = PutResourceConfiguration[];
export const PutResourceConfigurations = /*@__PURE__*/ S.Array(
  PutResourceConfiguration,
);
export type GlobalParameterMap = { [key: string]: string | undefined };
export const GlobalParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PutEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
  provisioningRoleArn?: string;
  manageAccessRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  enabledRegions: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  resourceConfigurations?: PutResourceConfiguration[];
  allowUserProvidedConfigurations?: boolean;
  globalParameters?: { [key: string]: string | undefined };
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export const PutEnvironmentBlueprintConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
      environmentBlueprintIdentifier: S.String.pipe(
        T.HttpLabel("environmentBlueprintIdentifier"),
      ),
      provisioningRoleArn: S.optional(S.String),
      manageAccessRoleArn: S.optional(S.String),
      environmentRolePermissionBoundary: S.optional(S.String),
      enabledRegions: EnabledRegionList,
      regionalParameters: S.optional(RegionalParameterMap),
      resourceConfigurations: S.optional(PutResourceConfigurations),
      allowUserProvidedConfigurations: S.optional(S.Boolean),
      globalParameters: S.optional(GlobalParameterMap),
      provisioningConfigurations: S.optional(ProvisioningConfigurationList),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEnvironmentBlueprintConfigurationInput",
  }) as any as S.Schema<PutEnvironmentBlueprintConfigurationInput>;
export interface PutEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export const PutEnvironmentBlueprintConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      domainId: S.String,
      environmentBlueprintId: S.String,
      provisioningRoleArn: S.optional(S.String),
      environmentRolePermissionBoundary: S.optional(S.String),
      manageAccessRoleArn: S.optional(S.String),
      enabledRegions: S.optional(EnabledRegionList),
      regionalParameters: S.optional(RegionalParameterMap),
      allowUserProvidedConfigurations: S.optional(S.Boolean),
      createdAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      updatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      resourceConfigurations: S.optional(ResourceConfigurations),
      provisioningConfigurations: S.optional(ProvisioningConfigurationList),
    }),
  ).annotate({
    identifier: "PutEnvironmentBlueprintConfigurationOutput",
  }) as any as S.Schema<PutEnvironmentBlueprintConfigurationOutput>;
export type RelationType = "LINEAGE" | (string & {});
export const RelationType = /*@__PURE__*/ S.String;

export type RelationDirection = "IN" | "OUT" | (string & {});
export const RelationDirection = /*@__PURE__*/ S.String;

export interface RelationPattern {
  relationType: RelationType;
  relationDirection: RelationDirection;
  maxPathLength?: number;
}
export const RelationPattern = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relationType: RelationType,
    relationDirection: RelationDirection,
    maxPathLength: S.optional(S.Number),
  }),
).annotate({
  identifier: "RelationPattern",
}) as any as S.Schema<RelationPattern>;
export type GraphEntityType = "LINEAGE_NODE" | (string & {});
export const GraphEntityType = /*@__PURE__*/ S.String;

export type Attribute = string;
export type FilterOperator =
  | "EQ"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "TEXT_SEARCH"
  | (string & {});
export const FilterOperator = /*@__PURE__*/ S.String;

export interface Filter {
  attribute: string;
  value?: string;
  intValue?: number;
  operator?: FilterOperator;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: S.String,
    value: S.optional(S.String),
    intValue: S.optional(S.Number),
    operator: S.optional(FilterOperator),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = FilterClause[];
export const FilterList = /*@__PURE__*/ S.Array(
  S.suspend(() => FilterClause).annotate({ identifier: "FilterClause" }),
) as any as S.Schema<FilterList>;
export type FilterClause =
  | { filter: Filter; and?: never; or?: never }
  | { filter?: never; and: FilterClause[]; or?: never }
  | { filter?: never; and?: never; or: FilterClause[] };
export const FilterClause = /*@__PURE__*/ S.Union([
  S.Struct({ filter: Filter }),
  S.Struct({
    and: S.suspend(() => FilterList).annotate({ identifier: "FilterList" }),
  }),
  S.Struct({
    or: S.suspend(() => FilterList).annotate({ identifier: "FilterList" }),
  }),
]) as any as S.Schema<FilterClause>;
export interface EntityPattern {
  entityType: GraphEntityType;
  identifier: string;
  filters?: FilterClause;
}
export const EntityPattern = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityType: GraphEntityType,
    identifier: S.String,
    filters: S.optional(FilterClause),
  }),
).annotate({ identifier: "EntityPattern" }) as any as S.Schema<EntityPattern>;
export type MatchClause =
  | { relationPattern: RelationPattern; entityPattern?: never }
  | { relationPattern?: never; entityPattern: EntityPattern };
export const MatchClause = /*@__PURE__*/ S.Union([
  S.Struct({ relationPattern: RelationPattern }),
  S.Struct({ entityPattern: EntityPattern }),
]);
export type MatchClauses = MatchClause[];
export const MatchClauses = /*@__PURE__*/ S.Array(MatchClause);
export type FormNameList = string[];
export const FormNameList = /*@__PURE__*/ S.Array(S.String);
export interface AdditionalAttributes {
  formNames?: string[];
}
export const AdditionalAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ formNames: S.optional(FormNameList) }),
).annotate({
  identifier: "AdditionalAttributes",
}) as any as S.Schema<AdditionalAttributes>;
export interface QueryGraphInput {
  domainIdentifier: string;
  match: MatchClause[];
  maxResults?: number;
  nextToken?: string;
  additionalAttributes?: AdditionalAttributes;
}
export const QueryGraphInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    match: MatchClauses,
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    additionalAttributes: S.optional(AdditionalAttributes),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/graph/query",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "QueryGraphInput",
}) as any as S.Schema<QueryGraphInput>;
export type LineageNodeIds = string[];
export const LineageNodeIds = /*@__PURE__*/ S.Array(S.String);
export interface LineageNodeItem {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
  formsOutput?: FormOutput[];
  upstreamLineageNodeIds?: string[];
  downstreamLineageNodeIds?: string[];
}
export const LineageNodeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    id: S.String,
    typeName: S.String,
    typeRevision: S.optional(S.String),
    sourceIdentifier: S.optional(S.String),
    eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    formsOutput: S.optional(FormOutputList),
    upstreamLineageNodeIds: S.optional(LineageNodeIds),
    downstreamLineageNodeIds: S.optional(LineageNodeIds),
  }),
).annotate({
  identifier: "LineageNodeItem",
}) as any as S.Schema<LineageNodeItem>;
export type ResultItem = { lineageNode: LineageNodeItem };
export const ResultItem = /*@__PURE__*/ S.Union([
  S.Struct({ lineageNode: LineageNodeItem }),
]);
export type ResultItemList = ResultItem[];
export const ResultItemList = /*@__PURE__*/ S.Array(ResultItem);
export interface QueryGraphOutput {
  items?: ResultItem[];
  nextToken?: string;
}
export const QueryGraphOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ResultItemList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "QueryGraphOutput",
}) as any as S.Schema<QueryGraphOutput>;
export type RejectRuleBehavior = "ALL" | "NONE" | (string & {});
export const RejectRuleBehavior = /*@__PURE__*/ S.String;

export interface RejectRule {
  rule?: RejectRuleBehavior;
  threshold?: number;
}
export const RejectRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rule: S.optional(RejectRuleBehavior),
    threshold: S.optional(S.Number),
  }),
).annotate({ identifier: "RejectRule" }) as any as S.Schema<RejectRule>;
export type PredictionChoices = number[];
export const PredictionChoices = /*@__PURE__*/ S.Array(S.Number);
export interface RejectChoice {
  predictionTarget?: string;
  predictionChoices?: number[];
}
export const RejectChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    predictionTarget: S.optional(S.String),
    predictionChoices: S.optional(PredictionChoices),
  }),
).annotate({ identifier: "RejectChoice" }) as any as S.Schema<RejectChoice>;
export type RejectChoices = RejectChoice[];
export const RejectChoices = /*@__PURE__*/ S.Array(RejectChoice);
export interface RejectPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
  rejectRule?: RejectRule;
  rejectChoices?: RejectChoice[];
  clientToken?: string;
}
export const RejectPredictionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
    rejectRule: S.optional(RejectRule),
    rejectChoices: S.optional(RejectChoices),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/reject-predictions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectPredictionsInput",
}) as any as S.Schema<RejectPredictionsInput>;
export interface RejectPredictionsOutput {
  domainId: string;
  assetId: string;
  assetRevision: string;
}
export const RejectPredictionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String, assetId: S.String, assetRevision: S.String }),
).annotate({
  identifier: "RejectPredictionsOutput",
}) as any as S.Schema<RejectPredictionsOutput>;
export interface RejectSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  decisionComment?: string | redacted.Redacted<string>;
}
export const RejectSubscriptionRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    decisionComment: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}/reject",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectSubscriptionRequestInput",
}) as any as S.Schema<RejectSubscriptionRequestInput>;
export interface RejectSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export const RejectSubscriptionRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataForms: S.optional(MetadataForms),
  }),
).annotate({
  identifier: "RejectSubscriptionRequestOutput",
}) as any as S.Schema<RejectSubscriptionRequestOutput>;
export interface RemoveEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string;
}
export const RemoveEntityOwnerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: DataZoneEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    owner: OwnerProperties,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/removeOwner",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveEntityOwnerInput",
}) as any as S.Schema<RemoveEntityOwnerInput>;
export interface RemoveEntityOwnerOutput {}
export const RemoveEntityOwnerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveEntityOwnerOutput",
}) as any as S.Schema<RemoveEntityOwnerOutput>;
export interface RemovePolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  grantIdentifier?: string;
  clientToken?: string;
}
export const RemovePolicyGrantInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    entityType: TargetEntityType.pipe(T.HttpLabel("entityType")),
    entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
    policyType: ManagedPolicyType,
    principal: PolicyGrantPrincipal,
    grantIdentifier: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/removeGrant",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemovePolicyGrantInput",
}) as any as S.Schema<RemovePolicyGrantInput>;
export interface RemovePolicyGrantOutput {}
export const RemovePolicyGrantOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemovePolicyGrantOutput",
}) as any as S.Schema<RemovePolicyGrantOutput>;
export interface RevokeSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
  retainPermissions?: boolean;
}
export const RevokeSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    retainPermissions: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}/revoke",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeSubscriptionInput",
}) as any as S.Schema<RevokeSubscriptionInput>;
export interface RevokeSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export const RevokeSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    subscribedPrincipal: SubscribedPrincipal,
    subscribedListing: SubscribedListing,
    subscriptionRequestId: S.optional(S.String),
    retainPermissions: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RevokeSubscriptionOutput",
}) as any as S.Schema<RevokeSubscriptionOutput>;
export type InventorySearchScope =
  | "ASSET"
  | "GLOSSARY"
  | "GLOSSARY_TERM"
  | "DATA_PRODUCT"
  | (string & {});
export const InventorySearchScope = /*@__PURE__*/ S.String;

export type SearchText = string;
export interface SearchInItem {
  attribute: string;
}
export const SearchInItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: S.String }),
).annotate({ identifier: "SearchInItem" }) as any as S.Schema<SearchInItem>;
export type SearchInList = SearchInItem[];
export const SearchInList = /*@__PURE__*/ S.Array(SearchInItem);
export interface SearchSort {
  attribute: string;
  order?: SortOrder;
}
export const SearchSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: S.String, order: S.optional(SortOrder) }),
).annotate({ identifier: "SearchSort" }) as any as S.Schema<SearchSort>;
export type SearchOutputAdditionalAttribute =
  | "FORMS"
  | "TIME_SERIES_DATA_POINT_FORMS"
  | "TEXT_MATCH_RATIONALE"
  | (string & {});
export const SearchOutputAdditionalAttribute = /*@__PURE__*/ S.String;

export type SearchOutputAdditionalAttributes =
  SearchOutputAdditionalAttribute[];
export const SearchOutputAdditionalAttributes = /*@__PURE__*/ S.Array(
  SearchOutputAdditionalAttribute,
);
export interface SearchInput {
  domainIdentifier: string;
  owningProjectIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
  searchScope: InventorySearchScope;
  searchText?: string;
  searchIn?: SearchInItem[];
  filters?: FilterClause;
  sort?: SearchSort;
  additionalAttributes?: SearchOutputAdditionalAttribute[];
}
export const SearchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    searchScope: InventorySearchScope,
    searchText: S.optional(S.String),
    searchIn: S.optional(SearchInList),
    filters: S.optional(FilterClause),
    sort: S.optional(SearchSort),
    additionalAttributes: S.optional(SearchOutputAdditionalAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SearchInput" }) as any as S.Schema<SearchInput>;
export interface MatchOffset {
  startOffset?: number;
  endOffset?: number;
}
export const MatchOffset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startOffset: S.optional(S.Number),
    endOffset: S.optional(S.Number),
  }),
).annotate({ identifier: "MatchOffset" }) as any as S.Schema<MatchOffset>;
export type MatchOffsets = MatchOffset[];
export const MatchOffsets = /*@__PURE__*/ S.Array(MatchOffset);
export interface TextMatchItem {
  attribute?: string;
  text?: string;
  matchOffsets?: MatchOffset[];
}
export const TextMatchItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: S.optional(S.String),
    text: S.optional(S.String),
    matchOffsets: S.optional(MatchOffsets),
  }),
).annotate({ identifier: "TextMatchItem" }) as any as S.Schema<TextMatchItem>;
export type TextMatches = TextMatchItem[];
export const TextMatches = /*@__PURE__*/ S.Array(TextMatchItem);
export type MatchRationaleItem = { textMatches: TextMatchItem[] };
export const MatchRationaleItem = /*@__PURE__*/ S.Union([
  S.Struct({ textMatches: TextMatches }),
]);
export type MatchRationale = MatchRationaleItem[];
export const MatchRationale = /*@__PURE__*/ S.Array(MatchRationaleItem);
export interface GlossaryItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export const GlossaryItemAdditionalAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchRationale: S.optional(MatchRationale) }),
).annotate({
  identifier: "GlossaryItemAdditionalAttributes",
}) as any as S.Schema<GlossaryItemAdditionalAttributes>;
export interface GlossaryItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  additionalAttributes?: GlossaryItemAdditionalAttributes;
}
export const GlossaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    description: S.optional(SensitiveString),
    status: GlossaryStatus,
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    additionalAttributes: S.optional(GlossaryItemAdditionalAttributes),
  }),
).annotate({ identifier: "GlossaryItem" }) as any as S.Schema<GlossaryItem>;
export interface GlossaryTermItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export const GlossaryTermItemAdditionalAttributes = /*@__PURE__*/ S.suspend(
  () => S.Struct({ matchRationale: S.optional(MatchRationale) }),
).annotate({
  identifier: "GlossaryTermItemAdditionalAttributes",
}) as any as S.Schema<GlossaryTermItemAdditionalAttributes>;
export interface GlossaryTermItem {
  domainId: string;
  glossaryId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  usageRestrictions?: GlossaryUsageRestriction[];
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status: GlossaryTermStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  additionalAttributes?: GlossaryTermItemAdditionalAttributes;
}
export const GlossaryTermItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    glossaryId: S.String,
    id: S.String,
    name: SensitiveString,
    shortDescription: S.optional(SensitiveString),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    status: GlossaryTermStatus,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    additionalAttributes: S.optional(GlossaryTermItemAdditionalAttributes),
  }),
).annotate({
  identifier: "GlossaryTermItem",
}) as any as S.Schema<GlossaryTermItem>;
export interface AssetItemAdditionalAttributes {
  formsOutput?: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  matchRationale?: MatchRationaleItem[];
}
export const AssetItemAdditionalAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    formsOutput: S.optional(FormOutputList),
    readOnlyFormsOutput: S.optional(FormOutputList),
    latestTimeSeriesDataPointFormsOutput: S.optional(
      TimeSeriesDataPointSummaryFormOutputList,
    ),
    matchRationale: S.optional(MatchRationale),
  }),
).annotate({
  identifier: "AssetItemAdditionalAttributes",
}) as any as S.Schema<AssetItemAdditionalAttributes>;
export interface AssetItem {
  domainId: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  owningProjectId: string;
  additionalAttributes?: AssetItemAdditionalAttributes;
  governedGlossaryTerms?: string[];
}
export const AssetItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    identifier: S.String,
    name: SensitiveString,
    typeIdentifier: S.String,
    typeRevision: S.String,
    externalIdentifier: S.optional(S.String),
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
    glossaryTerms: S.optional(GlossaryTerms),
    owningProjectId: S.String,
    additionalAttributes: S.optional(AssetItemAdditionalAttributes),
    governedGlossaryTerms: S.optional(GovernedGlossaryTerms),
  }),
).annotate({ identifier: "AssetItem" }) as any as S.Schema<AssetItem>;
export interface DataProductItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export const DataProductItemAdditionalAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ matchRationale: S.optional(MatchRationale) }),
).annotate({
  identifier: "DataProductItemAdditionalAttributes",
}) as any as S.Schema<DataProductItemAdditionalAttributes>;
export interface DataProductResultItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  additionalAttributes?: DataProductItemAdditionalAttributes;
}
export const DataProductResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    description: S.optional(SensitiveString),
    glossaryTerms: S.optional(GlossaryTerms),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    firstRevisionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    firstRevisionCreatedBy: S.optional(S.String),
    additionalAttributes: S.optional(DataProductItemAdditionalAttributes),
  }),
).annotate({
  identifier: "DataProductResultItem",
}) as any as S.Schema<DataProductResultItem>;
export type SearchInventoryResultItem =
  | {
      glossaryItem: GlossaryItem;
      glossaryTermItem?: never;
      assetItem?: never;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem: GlossaryTermItem;
      assetItem?: never;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem?: never;
      assetItem: AssetItem;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem?: never;
      assetItem?: never;
      dataProductItem: DataProductResultItem;
    };
export const SearchInventoryResultItem = /*@__PURE__*/ S.Union([
  S.Struct({ glossaryItem: GlossaryItem }),
  S.Struct({ glossaryTermItem: GlossaryTermItem }),
  S.Struct({ assetItem: AssetItem }),
  S.Struct({ dataProductItem: DataProductResultItem }),
]);
export type SearchInventoryResultItems = SearchInventoryResultItem[];
export const SearchInventoryResultItems = /*@__PURE__*/ S.Array(
  SearchInventoryResultItem,
);
export interface SearchOutput {
  items?: SearchInventoryResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
}
export const SearchOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SearchInventoryResultItems),
    nextToken: S.optional(S.String),
    totalMatchCount: S.optional(S.Number),
  }),
).annotate({ identifier: "SearchOutput" }) as any as S.Schema<SearchOutput>;
export type GroupSearchType =
  | "SSO_GROUP"
  | "DATAZONE_SSO_GROUP"
  | "IAM_ROLE_SESSION_GROUP"
  | (string & {});
export const GroupSearchType = /*@__PURE__*/ S.String;

export type GroupSearchText = string | redacted.Redacted<string>;
export interface SearchGroupProfilesInput {
  domainIdentifier: string;
  groupType: GroupSearchType;
  searchText?: string | redacted.Redacted<string>;
  maxResults?: number;
  nextToken?: string;
}
export const SearchGroupProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    groupType: GroupSearchType,
    searchText: S.optional(SensitiveString),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/search-group-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchGroupProfilesInput",
}) as any as S.Schema<SearchGroupProfilesInput>;
export interface GroupProfileSummary {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export const GroupProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(GroupProfileStatus),
    groupName: S.optional(SensitiveString),
    rolePrincipalArn: S.optional(S.String),
    rolePrincipalId: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupProfileSummary",
}) as any as S.Schema<GroupProfileSummary>;
export type GroupProfileSummaries = GroupProfileSummary[];
export const GroupProfileSummaries = /*@__PURE__*/ S.Array(GroupProfileSummary);
export interface SearchGroupProfilesOutput {
  items?: GroupProfileSummary[];
  nextToken?: string;
}
export const SearchGroupProfilesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(GroupProfileSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchGroupProfilesOutput",
}) as any as S.Schema<SearchGroupProfilesOutput>;
export type AggregationDisplayValue = string;
export interface AggregationListItem {
  attribute: string;
  displayValue?: string;
}
export const AggregationListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: S.String, displayValue: S.optional(S.String) }),
).annotate({
  identifier: "AggregationListItem",
}) as any as S.Schema<AggregationListItem>;
export type AggregationList = AggregationListItem[];
export const AggregationList = /*@__PURE__*/ S.Array(AggregationListItem);
export interface SearchListingsInput {
  domainIdentifier: string;
  searchText?: string;
  searchIn?: SearchInItem[];
  maxResults?: number;
  nextToken?: string;
  filters?: FilterClause;
  aggregations?: AggregationListItem[];
  sort?: SearchSort;
  additionalAttributes?: SearchOutputAdditionalAttribute[];
}
export const SearchListingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    searchText: S.optional(S.String),
    searchIn: S.optional(SearchInList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(FilterClause),
    aggregations: S.optional(AggregationList),
    sort: S.optional(SearchSort),
    additionalAttributes: S.optional(SearchOutputAdditionalAttributes),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/listings/search",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchListingsInput",
}) as any as S.Schema<SearchListingsInput>;
export interface AssetListingItemAdditionalAttributes {
  forms?: string;
  matchRationale?: MatchRationaleItem[];
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[];
}
export const AssetListingItemAdditionalAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      forms: S.optional(S.String),
      matchRationale: S.optional(MatchRationale),
      latestTimeSeriesDataPointForms: S.optional(
        TimeSeriesDataPointSummaryFormOutputList,
      ),
    }),
).annotate({
  identifier: "AssetListingItemAdditionalAttributes",
}) as any as S.Schema<AssetListingItemAdditionalAttributes>;
export interface AssetListingItem {
  listingId?: string;
  listingRevision?: string;
  name?: string | redacted.Redacted<string>;
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  listingCreatedBy?: string;
  listingUpdatedBy?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  governedGlossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  additionalAttributes?: AssetListingItemAdditionalAttributes;
}
export const AssetListingItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.optional(S.String),
    listingRevision: S.optional(S.String),
    name: S.optional(SensitiveString),
    entityId: S.optional(S.String),
    entityRevision: S.optional(S.String),
    entityType: S.optional(S.String),
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    listingCreatedBy: S.optional(S.String),
    listingUpdatedBy: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    governedGlossaryTerms: S.optional(DetailedGlossaryTerms),
    owningProjectId: S.optional(S.String),
    additionalAttributes: S.optional(AssetListingItemAdditionalAttributes),
  }),
).annotate({
  identifier: "AssetListingItem",
}) as any as S.Schema<AssetListingItem>;
export interface DataProductListingItemAdditionalAttributes {
  forms?: string;
  matchRationale?: MatchRationaleItem[];
}
export const DataProductListingItemAdditionalAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      forms: S.optional(S.String),
      matchRationale: S.optional(MatchRationale),
    }),
  ).annotate({
    identifier: "DataProductListingItemAdditionalAttributes",
  }) as any as S.Schema<DataProductListingItemAdditionalAttributes>;
export interface ListingSummaryItem {
  listingId?: string;
  listingRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
}
export const ListingSummaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.optional(S.String),
    listingRevision: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
  }),
).annotate({
  identifier: "ListingSummaryItem",
}) as any as S.Schema<ListingSummaryItem>;
export type ListingSummaryItems = ListingSummaryItem[];
export const ListingSummaryItems = /*@__PURE__*/ S.Array(ListingSummaryItem);
export interface DataProductListingItem {
  listingId?: string;
  listingRevision?: string;
  name?: string | redacted.Redacted<string>;
  entityId?: string;
  entityRevision?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  listingCreatedBy?: string;
  listingUpdatedBy?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  additionalAttributes?: DataProductListingItemAdditionalAttributes;
  items?: ListingSummaryItem[];
}
export const DataProductListingItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.optional(S.String),
    listingRevision: S.optional(S.String),
    name: S.optional(SensitiveString),
    entityId: S.optional(S.String),
    entityRevision: S.optional(S.String),
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    listingCreatedBy: S.optional(S.String),
    listingUpdatedBy: S.optional(S.String),
    glossaryTerms: S.optional(DetailedGlossaryTerms),
    owningProjectId: S.optional(S.String),
    additionalAttributes: S.optional(
      DataProductListingItemAdditionalAttributes,
    ),
    items: S.optional(ListingSummaryItems),
  }),
).annotate({
  identifier: "DataProductListingItem",
}) as any as S.Schema<DataProductListingItem>;
export type SearchResultItem =
  | { assetListing: AssetListingItem; dataProductListing?: never }
  | { assetListing?: never; dataProductListing: DataProductListingItem };
export const SearchResultItem = /*@__PURE__*/ S.Union([
  S.Struct({ assetListing: AssetListingItem }),
  S.Struct({ dataProductListing: DataProductListingItem }),
]);
export type SearchResultItems = SearchResultItem[];
export const SearchResultItems = /*@__PURE__*/ S.Array(SearchResultItem);
export type AggregationAttributeValue = string;
export type AggregationAttributeDisplayValue = string;
export interface AggregationOutputItem {
  value?: string;
  count?: number;
  displayValue?: string;
}
export const AggregationOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    count: S.optional(S.Number),
    displayValue: S.optional(S.String),
  }),
).annotate({
  identifier: "AggregationOutputItem",
}) as any as S.Schema<AggregationOutputItem>;
export type AggregationOutputItems = AggregationOutputItem[];
export const AggregationOutputItems = /*@__PURE__*/ S.Array(
  AggregationOutputItem,
);
export interface AggregationOutput {
  attribute?: string;
  displayValue?: string;
  items?: AggregationOutputItem[];
}
export const AggregationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: S.optional(S.String),
    displayValue: S.optional(S.String),
    items: S.optional(AggregationOutputItems),
  }),
).annotate({
  identifier: "AggregationOutput",
}) as any as S.Schema<AggregationOutput>;
export type AggregationOutputList = AggregationOutput[];
export const AggregationOutputList = /*@__PURE__*/ S.Array(AggregationOutput);
export interface SearchListingsOutput {
  items?: SearchResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
  aggregates?: AggregationOutput[];
}
export const SearchListingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SearchResultItems),
    nextToken: S.optional(S.String),
    totalMatchCount: S.optional(S.Number),
    aggregates: S.optional(AggregationOutputList),
  }),
).annotate({
  identifier: "SearchListingsOutput",
}) as any as S.Schema<SearchListingsOutput>;
export type TypesSearchScope =
  | "ASSET_TYPE"
  | "FORM_TYPE"
  | "LINEAGE_NODE_TYPE"
  | (string & {});
export const TypesSearchScope = /*@__PURE__*/ S.String;

export interface SearchTypesInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  searchScope: TypesSearchScope;
  searchText?: string;
  searchIn?: SearchInItem[];
  filters?: FilterClause;
  sort?: SearchSort;
  managed: boolean;
}
export const SearchTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    searchScope: TypesSearchScope,
    searchText: S.optional(S.String),
    searchIn: S.optional(SearchInList),
    filters: S.optional(FilterClause),
    sort: S.optional(SearchSort),
    managed: S.Boolean,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/types-search",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchTypesInput",
}) as any as S.Schema<SearchTypesInput>;
export interface AssetTypeItem {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export const AssetTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.String,
    revision: S.String,
    description: S.optional(SensitiveString),
    formsOutput: FormsOutputMap,
    owningProjectId: S.String,
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
  }),
).annotate({ identifier: "AssetTypeItem" }) as any as S.Schema<AssetTypeItem>;
export interface FormTypeData {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  model?: Model;
  status?: FormTypeStatus;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  description?: string | redacted.Redacted<string>;
  imports?: Import[];
}
export const FormTypeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: SensitiveString,
    revision: S.String,
    model: S.optional(Model),
    status: S.optional(FormTypeStatus),
    owningProjectId: S.optional(S.String),
    originDomainId: S.optional(S.String),
    originProjectId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    description: S.optional(SensitiveString),
    imports: S.optional(ImportList),
  }),
).annotate({ identifier: "FormTypeData" }) as any as S.Schema<FormTypeData>;
export interface LineageNodeTypeItem {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  revision: string;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
}
export const LineageNodeTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    revision: S.String,
    formsOutput: FormsOutputMap,
  }),
).annotate({
  identifier: "LineageNodeTypeItem",
}) as any as S.Schema<LineageNodeTypeItem>;
export type SearchTypesResultItem =
  | {
      assetTypeItem: AssetTypeItem;
      formTypeItem?: never;
      lineageNodeTypeItem?: never;
    }
  | {
      assetTypeItem?: never;
      formTypeItem: FormTypeData;
      lineageNodeTypeItem?: never;
    }
  | {
      assetTypeItem?: never;
      formTypeItem?: never;
      lineageNodeTypeItem: LineageNodeTypeItem;
    };
export const SearchTypesResultItem = /*@__PURE__*/ S.Union([
  S.Struct({ assetTypeItem: AssetTypeItem }),
  S.Struct({ formTypeItem: FormTypeData }),
  S.Struct({ lineageNodeTypeItem: LineageNodeTypeItem }),
]);
export type SearchTypesResultItems = SearchTypesResultItem[];
export const SearchTypesResultItems = /*@__PURE__*/ S.Array(
  SearchTypesResultItem,
);
export interface SearchTypesOutput {
  items?: SearchTypesResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
}
export const SearchTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(SearchTypesResultItems),
    nextToken: S.optional(S.String),
    totalMatchCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SearchTypesOutput",
}) as any as S.Schema<SearchTypesOutput>;
export type UserSearchType =
  | "SSO_USER"
  | "DATAZONE_USER"
  | "DATAZONE_SSO_USER"
  | "DATAZONE_IAM_USER"
  | (string & {});
export const UserSearchType = /*@__PURE__*/ S.String;

export type UserSearchText = string | redacted.Redacted<string>;
export interface SearchUserProfilesInput {
  domainIdentifier: string;
  userType: UserSearchType;
  searchText?: string | redacted.Redacted<string>;
  maxResults?: number;
  nextToken?: string;
}
export const SearchUserProfilesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    userType: UserSearchType,
    searchText: S.optional(SensitiveString),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/search-user-profiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchUserProfilesInput",
}) as any as S.Schema<SearchUserProfilesInput>;
export interface UserProfileSummary {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export const UserProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    type: S.optional(UserProfileType),
    status: S.optional(UserProfileStatus),
    details: S.optional(UserProfileDetails),
  }),
).annotate({
  identifier: "UserProfileSummary",
}) as any as S.Schema<UserProfileSummary>;
export type UserProfileSummaries = UserProfileSummary[];
export const UserProfileSummaries = /*@__PURE__*/ S.Array(UserProfileSummary);
export interface SearchUserProfilesOutput {
  items?: UserProfileSummary[];
  nextToken?: string;
}
export const SearchUserProfilesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(UserProfileSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchUserProfilesOutput",
}) as any as S.Schema<SearchUserProfilesOutput>;
export interface StartDataSourceRunInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  clientToken?: string;
}
export const StartDataSourceRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    dataSourceIdentifier: S.String.pipe(T.HttpLabel("dataSourceIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDataSourceRunInput",
}) as any as S.Schema<StartDataSourceRunInput>;
export interface StartDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
}
export const StartDataSourceRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    dataSourceId: S.String,
    id: S.String,
    projectId: S.String,
    status: DataSourceRunStatus,
    type: DataSourceRunType,
    dataSourceConfigurationSnapshot: S.optional(S.String),
    runStatisticsForAssets: S.optional(RunStatisticsForAssets),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    startedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    stoppedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StartDataSourceRunOutput",
}) as any as S.Schema<StartDataSourceRunOutput>;
export interface StartMetadataGenerationRunInput {
  domainIdentifier: string;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  target: MetadataGenerationRunTarget;
  clientToken?: string;
  owningProjectIdentifier: string;
}
export const StartMetadataGenerationRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    type: S.optional(MetadataGenerationRunType),
    types: S.optional(MetadataGenerationRunTypes),
    target: MetadataGenerationRunTarget,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    owningProjectIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMetadataGenerationRunInput",
}) as any as S.Schema<StartMetadataGenerationRunInput>;
export interface StartMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId?: string;
}
export const StartMetadataGenerationRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    status: S.optional(MetadataGenerationRunStatus),
    type: S.optional(MetadataGenerationRunType),
    types: S.optional(MetadataGenerationRunTypes),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    owningProjectId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartMetadataGenerationRunOutput",
}) as any as S.Schema<StartMetadataGenerationRunOutput>;
export interface StartNotebookExportInput {
  domainIdentifier: string;
  notebookIdentifier: string;
  owningProjectIdentifier: string;
  fileFormat: FileFormat;
  clientToken?: string;
}
export const StartNotebookExportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    notebookIdentifier: S.String,
    owningProjectIdentifier: S.String,
    fileFormat: FileFormat,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/notebook-exports",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartNotebookExportInput",
}) as any as S.Schema<StartNotebookExportInput>;
export interface StartNotebookExportOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  fileFormat: FileFormat;
  status: NotebookExportStatus;
  createdAt?: Date;
  createdBy?: string;
}
export const StartNotebookExportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    notebookId: S.String,
    fileFormat: FileFormat,
    status: NotebookExportStatus,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "StartNotebookExportOutput",
}) as any as S.Schema<StartNotebookExportOutput>;
export type S3SourceLocation = string | redacted.Redacted<string>;
export type SourceLocation = { s3: string | redacted.Redacted<string> };
export const SourceLocation = /*@__PURE__*/ S.Union([
  S.Struct({ s3: SensitiveString }),
]);
export interface StartNotebookImportInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  sourceLocation: SourceLocation;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const StartNotebookImportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.String,
    sourceLocation: SourceLocation,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/notebook-imports",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartNotebookImportInput",
}) as any as S.Schema<StartNotebookImportInput>;
export interface StartNotebookImportOutput {
  notebookId?: string;
  status?: NotebookStatus;
  domainId?: string;
  owningProjectId?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  sourceLocation?: SourceLocation;
  createdAt?: Date;
  createdBy?: string;
}
export const StartNotebookImportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    notebookId: S.optional(S.String),
    status: S.optional(NotebookStatus),
    domainId: S.optional(S.String),
    owningProjectId: S.optional(S.String),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    sourceLocation: S.optional(SourceLocation),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "StartNotebookImportOutput",
}) as any as S.Schema<StartNotebookImportOutput>;
export interface StartNotebookRunInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier: string;
  scheduleIdentifier?: string;
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  triggerSource?: TriggerSource;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const StartNotebookRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    owningProjectIdentifier: S.String,
    notebookIdentifier: S.String,
    scheduleIdentifier: S.optional(S.String),
    computeConfiguration: S.optional(ComputeConfig),
    networkConfiguration: S.optional(NetworkConfig),
    timeoutConfiguration: S.optional(TimeoutConfig),
    triggerSource: S.optional(TriggerSource),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/domains/{domainIdentifier}/notebook-runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartNotebookRunInput",
}) as any as S.Schema<StartNotebookRunInput>;
export interface StartNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  environmentConfiguration?: EnvironmentConfig;
  storageConfiguration?: StorageConfig;
  triggerSource?: TriggerSource;
  error?: NotebookRunError;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export const StartNotebookRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    notebookId: S.String,
    scheduleId: S.optional(S.String),
    status: NotebookRunStatus,
    cellOrder: S.optional(CellOrder),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    computeConfiguration: S.optional(ComputeConfig),
    networkConfiguration: S.optional(NetworkConfig),
    timeoutConfiguration: S.optional(TimeoutConfig),
    environmentConfiguration: S.optional(EnvironmentConfig),
    storageConfiguration: S.optional(StorageConfig),
    triggerSource: S.optional(TriggerSource),
    error: S.optional(NotebookRunError),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "StartNotebookRunOutput",
}) as any as S.Schema<StartNotebookRunOutput>;
export interface StopNotebookRunInput {
  domainIdentifier: string;
  identifier: string;
  clientToken?: string;
}
export const StopNotebookRunInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/notebook-runs/{identifier}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopNotebookRunInput",
}) as any as S.Schema<StopNotebookRunInput>;
export interface StopNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  status: NotebookRunStatus;
}
export const StopNotebookRunOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    owningProjectId: S.String,
    status: NotebookRunStatus,
  }),
).annotate({
  identifier: "StopNotebookRunOutput",
}) as any as S.Schema<StopNotebookRunOutput>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
export interface UpdateAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource?: AccountSource;
}
export const UpdateAccountPoolInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    resolutionStrategy: S.optional(ResolutionStrategy),
    accountSource: S.optional(AccountSource),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountPoolInput",
}) as any as S.Schema<UpdateAccountPoolInput>;
export interface UpdateAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export const UpdateAccountPoolOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    name: S.optional(SensitiveString),
    id: S.optional(S.String),
    description: S.optional(SensitiveString),
    resolutionStrategy: S.optional(ResolutionStrategy),
    accountSource: AccountSource,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAccountPoolOutput",
}) as any as S.Schema<UpdateAccountPoolOutput>;
export interface UpdateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  configuration?: AssetFilterConfiguration;
}
export const UpdateAssetFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    configuration: S.optional(AssetFilterConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetFilterInput",
}) as any as S.Schema<UpdateAssetFilterInput>;
export interface UpdateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export const UpdateAssetFilterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    assetId: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(FilterStatus),
    configuration: AssetFilterConfiguration,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorMessage: S.optional(S.String),
    effectiveColumnNames: S.optional(ColumnNameList),
    effectiveRowFilter: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAssetFilterOutput",
}) as any as S.Schema<UpdateAssetFilterOutput>;
export interface AthenaPropertiesPatch {
  workgroupName?: string;
}
export const AthenaPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.optional(S.String) }),
).annotate({
  identifier: "AthenaPropertiesPatch",
}) as any as S.Schema<AthenaPropertiesPatch>;
export interface AuthenticationConfigurationPatch {
  secretArn?: string;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials;
}
export const AuthenticationConfigurationPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secretArn: S.optional(S.String),
    basicAuthenticationCredentials: S.optional(BasicAuthenticationCredentials),
  }),
).annotate({
  identifier: "AuthenticationConfigurationPatch",
}) as any as S.Schema<AuthenticationConfigurationPatch>;
export interface GlueConnectionPatch {
  description?: string;
  connectionProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationPatch;
}
export const GlueConnectionPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    connectionProperties: S.optional(ConnectionProperties),
    authenticationConfiguration: S.optional(AuthenticationConfigurationPatch),
  }),
).annotate({
  identifier: "GlueConnectionPatch",
}) as any as S.Schema<GlueConnectionPatch>;
export interface GluePropertiesPatch {
  glueConnectionInput?: GlueConnectionPatch;
}
export const GluePropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueConnectionInput: S.optional(GlueConnectionPatch) }),
).annotate({
  identifier: "GluePropertiesPatch",
}) as any as S.Schema<GluePropertiesPatch>;
export interface IamPropertiesPatch {
  glueLineageSyncEnabled?: boolean;
}
export const IamPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "IamPropertiesPatch",
}) as any as S.Schema<IamPropertiesPatch>;
export interface RedshiftPropertiesPatch {
  storage?: RedshiftStorageProperties;
  databaseName?: string;
  host?: string;
  port?: number;
  credentials?: RedshiftCredentials;
  lineageSync?: RedshiftLineageSyncConfigurationInput;
}
export const RedshiftPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storage: S.optional(RedshiftStorageProperties),
    databaseName: S.optional(S.String),
    host: S.optional(S.String),
    port: S.optional(S.Number),
    credentials: S.optional(RedshiftCredentials),
    lineageSync: S.optional(RedshiftLineageSyncConfigurationInput),
  }),
).annotate({
  identifier: "RedshiftPropertiesPatch",
}) as any as S.Schema<RedshiftPropertiesPatch>;
export interface SparkEmrPropertiesPatch {
  computeArn?: string;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  managedEndpointArn?: string;
}
export const SparkEmrPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeArn: S.optional(S.String),
    instanceProfileArn: S.optional(S.String),
    javaVirtualEnv: S.optional(S.String),
    logUri: S.optional(S.String),
    pythonVirtualEnv: S.optional(S.String),
    runtimeRole: S.optional(S.String),
    trustedCertificatesS3Uri: S.optional(S.String),
    managedEndpointArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SparkEmrPropertiesPatch",
}) as any as S.Schema<SparkEmrPropertiesPatch>;
export interface S3PropertiesPatch {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
}
export const S3PropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    s3AccessGrantLocationId: S.optional(S.String),
    registerS3AccessGrantLocation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "S3PropertiesPatch",
}) as any as S.Schema<S3PropertiesPatch>;
export interface AmazonQPropertiesPatch {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export const AmazonQPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isEnabled: S.Boolean,
    profileArn: S.optional(S.String),
    authMode: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonQPropertiesPatch",
}) as any as S.Schema<AmazonQPropertiesPatch>;
export interface MlflowPropertiesPatch {
  trackingServerArn?: string;
}
export const MlflowPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trackingServerArn: S.optional(S.String) }),
).annotate({
  identifier: "MlflowPropertiesPatch",
}) as any as S.Schema<MlflowPropertiesPatch>;
export interface LakehousePropertiesPatch {
  glueLineageSyncEnabled?: boolean;
}
export const LakehousePropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "LakehousePropertiesPatch",
}) as any as S.Schema<LakehousePropertiesPatch>;
export interface VpcPropertiesPatch {
  vpcId?: string;
  subnetIds?: string[];
  securityGroupId?: string;
}
export const VpcPropertiesPatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.optional(S.String),
    subnetIds: S.optional(VpcConnectionSubnetIdList),
    securityGroupId: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcPropertiesPatch",
}) as any as S.Schema<VpcPropertiesPatch>;
export type ConnectionPropertiesPatch =
  | {
      athenaProperties: AthenaPropertiesPatch;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesPatch;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties: IamPropertiesPatch;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesPatch;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesPatch;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties: S3PropertiesPatch;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties: AmazonQPropertiesPatch;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesPatch;
      lakehouseProperties?: never;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties: LakehousePropertiesPatch;
      vpcProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesPatch;
    };
export const ConnectionPropertiesPatch = /*@__PURE__*/ S.Union([
  S.Struct({ athenaProperties: AthenaPropertiesPatch }),
  S.Struct({ glueProperties: GluePropertiesPatch }),
  S.Struct({ iamProperties: IamPropertiesPatch }),
  S.Struct({ redshiftProperties: RedshiftPropertiesPatch }),
  S.Struct({ sparkEmrProperties: SparkEmrPropertiesPatch }),
  S.Struct({ s3Properties: S3PropertiesPatch }),
  S.Struct({ amazonQProperties: AmazonQPropertiesPatch }),
  S.Struct({ mlflowProperties: MlflowPropertiesPatch }),
  S.Struct({ lakehouseProperties: LakehousePropertiesPatch }),
  S.Struct({ vpcProperties: VpcPropertiesPatch }),
]);
export interface UpdateConnectionInput {
  configurations?: Configuration[];
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  awsLocation?: AwsLocation;
  props?: ConnectionPropertiesPatch;
}
export const UpdateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: S.optional(Configurations),
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(SensitiveString),
    awsLocation: S.optional(AwsLocation),
    props: S.optional(ConnectionPropertiesPatch),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectionInput",
}) as any as S.Schema<UpdateConnectionInput>;
export interface UpdateConnectionOutput {
  configurations?: Configuration[];
  connectionId: string;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export const UpdateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: S.optional(Configurations),
    connectionId: S.String,
    description: S.optional(SensitiveString),
    domainId: S.String,
    domainUnitId: S.String,
    environmentId: S.optional(S.String),
    name: S.String,
    physicalEndpoints: PhysicalEndpoints,
    projectId: S.optional(S.String),
    props: S.optional(ConnectionPropertiesOutput),
    type: ConnectionType,
    scope: S.optional(ConnectionScope),
  }),
).annotate({
  identifier: "UpdateConnectionOutput",
}) as any as S.Schema<UpdateConnectionOutput>;
export interface UpdateDataSourceInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsInput?: FormInput[];
  schedule?: ScheduleConfiguration;
  configuration?: DataSourceConfigurationInput;
  recommendation?: RecommendationConfiguration;
  retainPermissionsOnRevokeFailure?: boolean;
}
export const UpdateDataSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    enableSetting: S.optional(EnableSetting),
    publishOnImport: S.optional(S.Boolean),
    assetFormsInput: S.optional(FormInputList),
    schedule: S.optional(ScheduleConfiguration),
    configuration: S.optional(DataSourceConfigurationInput),
    recommendation: S.optional(RecommendationConfiguration),
    retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataSourceInput",
}) as any as S.Schema<UpdateDataSourceInput>;
export interface UpdateDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
  retainPermissionsOnRevokeFailure?: boolean;
}
export const UpdateDataSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: S.optional(DataSourceStatus),
    type: S.optional(S.String),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    domainId: S.String,
    projectId: S.String,
    environmentId: S.optional(S.String),
    connectionId: S.optional(S.String),
    configuration: S.optional(DataSourceConfigurationOutput),
    recommendation: S.optional(RecommendationConfiguration),
    enableSetting: S.optional(EnableSetting),
    publishOnImport: S.optional(S.Boolean),
    assetFormsOutput: S.optional(FormOutputList),
    schedule: S.optional(ScheduleConfiguration),
    lastRunStatus: S.optional(DataSourceRunStatus),
    lastRunAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastRunErrorMessage: S.optional(DataSourceErrorMessage),
    errorMessage: S.optional(DataSourceErrorMessage),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    selfGrantStatus: S.optional(SelfGrantStatusOutput),
    retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateDataSourceOutput",
}) as any as S.Schema<UpdateDataSourceOutput>;
export interface UpdateDomainInput {
  identifier: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  serviceRole?: string;
  name?: string;
  clientToken?: string;
}
export const UpdateDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(S.String),
    singleSignOn: S.optional(SingleSignOn),
    domainExecutionRole: S.optional(S.String),
    serviceRole: S.optional(S.String),
    name: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/domains/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainInput",
}) as any as S.Schema<UpdateDomainInput>;
export interface UpdateDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  serviceRole?: string;
  name?: string;
  lastUpdatedAt?: Date;
}
export const UpdateDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    rootDomainUnitId: S.optional(S.String),
    description: S.optional(S.String),
    singleSignOn: S.optional(SingleSignOn),
    domainExecutionRole: S.optional(S.String),
    serviceRole: S.optional(S.String),
    name: S.optional(S.String),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateDomainOutput",
}) as any as S.Schema<UpdateDomainOutput>;
export interface UpdateDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
}
export const UpdateDomainUnitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(SensitiveString),
    name: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainUnitInput",
}) as any as S.Schema<UpdateDomainUnitInput>;
export interface UpdateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  description?: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
}
export const UpdateDomainUnitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    name: SensitiveString,
    owners: DomainUnitOwners,
    description: S.optional(SensitiveString),
    parentDomainUnitId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDomainUnitOutput",
}) as any as S.Schema<UpdateDomainUnitOutput>;
export interface UpdateEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
  name?: string;
  description?: string;
  glossaryTerms?: string[];
  blueprintVersion?: string;
  userParameters?: EnvironmentParameter[];
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const UpdateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    glossaryTerms: S.optional(GlossaryTerms),
    blueprintVersion: S.optional(S.String),
    userParameters: S.optional(EnvironmentParametersList),
    environmentConfigurationName: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentInput",
}) as any as S.Schema<UpdateEnvironmentInput>;
export interface UpdateEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export const UpdateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    id: S.optional(S.String),
    domainId: S.String,
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentProfileId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    provider: S.String,
    provisionedResources: S.optional(ResourceList),
    status: S.optional(EnvironmentStatus),
    environmentActions: S.optional(EnvironmentActionList),
    glossaryTerms: S.optional(GlossaryTerms),
    userParameters: S.optional(CustomParameterList),
    lastDeployment: S.optional(Deployment),
    provisioningProperties: S.optional(ProvisioningProperties),
    deploymentProperties: S.optional(DeploymentProperties),
    environmentBlueprintId: S.optional(S.String),
    environmentConfigurationId: S.optional(SensitiveString),
    environmentConfigurationName: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "UpdateEnvironmentOutput",
}) as any as S.Schema<UpdateEnvironmentOutput>;
export interface UpdateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  parameters?: ActionParameters;
  name?: string;
  description?: string;
}
export const UpdateEnvironmentActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    parameters: S.optional(ActionParameters),
    name: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentActionInput",
}) as any as S.Schema<UpdateEnvironmentActionInput>;
export interface UpdateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export const UpdateEnvironmentActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    environmentId: S.String,
    id: S.String,
    name: S.String,
    parameters: ActionParameters,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateEnvironmentActionOutput",
}) as any as S.Schema<UpdateEnvironmentActionOutput>;
export interface UpdateEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
  description?: string;
  provisioningProperties?: ProvisioningProperties;
  userParameters?: CustomParameter[];
}
export const UpdateEnvironmentBlueprintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(S.String),
    provisioningProperties: S.optional(ProvisioningProperties),
    userParameters: S.optional(CustomParameterList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentBlueprintInput",
}) as any as S.Schema<UpdateEnvironmentBlueprintInput>;
export interface UpdateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const UpdateEnvironmentBlueprintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(SensitiveString),
    provider: S.String,
    provisioningProperties: ProvisioningProperties,
    deploymentProperties: S.optional(DeploymentProperties),
    userParameters: S.optional(CustomParameterList),
    glossaryTerms: S.optional(GlossaryTerms),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateEnvironmentBlueprintOutput",
}) as any as S.Schema<UpdateEnvironmentBlueprintOutput>;
export interface UpdateEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string;
  userParameters?: EnvironmentParameter[];
  awsAccountId?: string;
  awsAccountRegion?: string;
}
export const UpdateEnvironmentProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(S.String),
    userParameters: S.optional(EnvironmentParametersList),
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentProfileInput",
}) as any as S.Schema<UpdateEnvironmentProfileInput>;
export interface UpdateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export const UpdateEnvironmentProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    awsAccountId: S.optional(S.String),
    awsAccountRegion: S.optional(S.String),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: SensitiveString,
    description: S.optional(SensitiveString),
    environmentBlueprintId: S.String,
    projectId: S.optional(S.String),
    userParameters: S.optional(CustomParameterList),
  }),
).annotate({
  identifier: "UpdateEnvironmentProfileOutput",
}) as any as S.Schema<UpdateEnvironmentProfileOutput>;
export interface UpdateGlossaryInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  clientToken?: string;
}
export const UpdateGlossaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    status: S.optional(GlossaryStatus),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlossaryInput",
}) as any as S.Schema<UpdateGlossaryInput>;
export interface UpdateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const UpdateGlossaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    description: S.optional(SensitiveString),
    status: S.optional(GlossaryStatus),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "UpdateGlossaryOutput",
}) as any as S.Schema<UpdateGlossaryOutput>;
export interface UpdateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier?: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status?: GlossaryTermStatus;
}
export const UpdateGlossaryTermInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    glossaryIdentifier: S.optional(S.String),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    shortDescription: S.optional(SensitiveString),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    status: S.optional(GlossaryTermStatus),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlossaryTermInput",
}) as any as S.Schema<UpdateGlossaryTermInput>;
export interface UpdateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export const UpdateGlossaryTermOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    domainId: S.String,
    glossaryId: S.String,
    name: SensitiveString,
    status: GlossaryTermStatus,
    shortDescription: S.optional(SensitiveString),
    longDescription: S.optional(SensitiveString),
    termRelations: S.optional(TermRelations),
    usageRestrictions: S.optional(GlossaryUsageRestrictions),
  }),
).annotate({
  identifier: "UpdateGlossaryTermOutput",
}) as any as S.Schema<UpdateGlossaryTermOutput>;
export interface UpdateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
  status: GroupProfileStatus;
}
export const UpdateGroupProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    groupIdentifier: S.String.pipe(T.HttpLabel("groupIdentifier")),
    status: GroupProfileStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGroupProfileInput",
}) as any as S.Schema<UpdateGroupProfileInput>;
export interface UpdateGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export const UpdateGroupProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    status: S.optional(GroupProfileStatus),
    groupName: S.optional(SensitiveString),
    rolePrincipalArn: S.optional(S.String),
    rolePrincipalId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateGroupProfileOutput",
}) as any as S.Schema<UpdateGroupProfileOutput>;
export interface UpdateNotebookInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  status?: NotebookStatus;
  name?: string | redacted.Redacted<string>;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  clientToken?: string;
}
export const UpdateNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(SensitiveString),
    status: S.optional(NotebookStatus),
    name: S.optional(SensitiveString),
    cellOrder: S.optional(CellOrder),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    environmentConfiguration: S.optional(EnvironmentConfig),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNotebookInput",
}) as any as S.Schema<UpdateNotebookInput>;
export interface UpdateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
}
export const UpdateNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: SensitiveString,
    owningProjectId: S.String,
    domainId: S.String,
    cellOrder: CellOrder,
    status: NotebookStatus,
    description: S.optional(SensitiveString),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBy: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    lockedBy: S.optional(S.String),
    lockedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lockExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    computeId: S.optional(S.String),
    metadata: S.optional(Metadata),
    parameters: S.optional(Parameters),
    environmentConfiguration: S.optional(EnvironmentConfig),
    error: S.optional(NotebookError),
  }),
).annotate({
  identifier: "UpdateNotebookOutput",
}) as any as S.Schema<UpdateNotebookOutput>;
export interface UpdateProjectInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resourceTags?: { [key: string]: string | undefined };
  glossaryTerms?: string[];
  domainUnitId?: string;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  userParameters?: EnvironmentConfigurationUserParameter[];
  projectProfileVersion?: string;
}
export const UpdateProjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    resourceTags: S.optional(Tags),
    glossaryTerms: S.optional(GlossaryTerms),
    domainUnitId: S.optional(S.String),
    environmentDeploymentDetails: S.optional(EnvironmentDeploymentDetails),
    userParameters: S.optional(EnvironmentConfigurationUserParametersList),
    projectProfileVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/projects/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProjectInput",
}) as any as S.Schema<UpdateProjectInput>;
export interface UpdateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export const UpdateProjectOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    projectStatus: S.optional(ProjectStatus),
    failureReasons: S.optional(FailureReasons),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    resourceTags: S.optional(ResourceTags),
    glossaryTerms: S.optional(GlossaryTerms),
    domainUnitId: S.optional(S.String),
    projectProfileId: S.optional(S.String),
    userParameters: S.optional(EnvironmentConfigurationUserParametersList),
    environmentDeploymentDetails: S.optional(EnvironmentDeploymentDetails),
    projectCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProjectOutput",
}) as any as S.Schema<UpdateProjectOutput>;
export interface UpdateProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  domainUnitIdentifier?: string;
}
export const UpdateProjectProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    projectResourceTags: S.optional(ProjectResourceTagParameters),
    allowCustomProjectResourceTags: S.optional(S.Boolean),
    projectResourceTagsDescription: S.optional(SensitiveString),
    environmentConfigurations: S.optional(EnvironmentConfigurationsList),
    domainUnitIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProjectProfileInput",
}) as any as S.Schema<UpdateProjectProfileInput>;
export interface UpdateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export const UpdateProjectProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    id: S.String,
    name: SensitiveString,
    description: S.optional(SensitiveString),
    status: S.optional(Status),
    projectResourceTags: S.optional(ProjectResourceTagParameters),
    allowCustomProjectResourceTags: S.optional(S.Boolean),
    projectResourceTagsDescription: S.optional(SensitiveString),
    environmentConfigurations: S.optional(EnvironmentConfigurationsList),
    createdBy: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    domainUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProjectProfileOutput",
}) as any as S.Schema<UpdateProjectProfileOutput>;
export interface UpdateRootDomainUnitOwnerInput {
  domainIdentifier: string;
  currentOwner: string;
  newOwner: string;
  clientToken?: string;
}
export const UpdateRootDomainUnitOwnerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    currentOwner: S.String,
    newOwner: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/root-domain-unit-owner",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRootDomainUnitOwnerInput",
}) as any as S.Schema<UpdateRootDomainUnitOwnerInput>;
export interface UpdateRootDomainUnitOwnerOutput {}
export const UpdateRootDomainUnitOwnerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRootDomainUnitOwnerOutput",
}) as any as S.Schema<UpdateRootDomainUnitOwnerOutput>;
export interface UpdateRuleInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  scope?: RuleScope;
  detail?: RuleDetail;
  includeChildDomainUnits?: boolean;
}
export const UpdateRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    scope: S.optional(RuleScope),
    detail: S.optional(RuleDetail),
    includeChildDomainUnits: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/rules/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRuleInput",
}) as any as S.Schema<UpdateRuleInput>;
export interface UpdateRuleOutput {
  identifier: string;
  revision: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
}
export const UpdateRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    revision: S.String,
    name: SensitiveString,
    ruleType: RuleType,
    target: RuleTarget,
    action: RuleAction,
    scope: RuleScope,
    detail: RuleDetail,
    description: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    createdBy: S.String,
    lastUpdatedBy: S.String,
  }),
).annotate({
  identifier: "UpdateRuleOutput",
}) as any as S.Schema<UpdateRuleOutput>;
export interface UpdateSubscriptionGrantStatusInput {
  domainIdentifier: string;
  identifier: string;
  assetIdentifier: string;
  status: SubscriptionGrantStatus;
  failureCause?: FailureCause;
  targetName?: string;
}
export const UpdateSubscriptionGrantStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
    status: SubscriptionGrantStatus,
    failureCause: S.optional(FailureCause),
    targetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}/status/{assetIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionGrantStatusInput",
}) as any as S.Schema<UpdateSubscriptionGrantStatusInput>;
export interface UpdateSubscriptionGrantStatusOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export const UpdateSubscriptionGrantStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentId: S.optional(S.String),
    subscriptionTargetId: S.String,
    grantedEntity: GrantedEntity,
    status: SubscriptionGrantOverallStatus,
    assets: S.optional(SubscribedAssets),
    subscriptionId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSubscriptionGrantStatusOutput",
}) as any as S.Schema<UpdateSubscriptionGrantStatusOutput>;
export interface UpdateSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  requestReason: string | redacted.Redacted<string>;
}
export const UpdateSubscriptionRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    requestReason: SensitiveString,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionRequestInput",
}) as any as S.Schema<UpdateSubscriptionRequestInput>;
export interface UpdateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export const UpdateSubscriptionRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    domainId: S.String,
    status: SubscriptionRequestStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    requestReason: SensitiveString,
    subscribedPrincipals: SubscribedPrincipals,
    subscribedListings: SubscribedListings,
    reviewerId: S.optional(S.String),
    decisionComment: S.optional(SensitiveString),
    existingSubscriptionId: S.optional(S.String),
    metadataForms: S.optional(MetadataForms),
  }),
).annotate({
  identifier: "UpdateSubscriptionRequestOutput",
}) as any as S.Schema<UpdateSubscriptionRequestOutput>;
export interface UpdateSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  authorizedPrincipals?: string[];
  applicableAssetTypes?: string[];
  subscriptionTargetConfig?: SubscriptionTargetForm[];
  manageAccessRole?: string;
  provider?: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const UpdateSubscriptionTargetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    name: S.optional(SensitiveString),
    authorizedPrincipals: S.optional(AuthorizedPrincipalIdentifiers),
    applicableAssetTypes: S.optional(ApplicableAssetTypes),
    subscriptionTargetConfig: S.optional(SubscriptionTargetForms),
    manageAccessRole: S.optional(S.String),
    provider: S.optional(S.String),
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionTargetInput",
}) as any as S.Schema<UpdateSubscriptionTargetInput>;
export interface UpdateSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export const UpdateSubscriptionTargetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    authorizedPrincipals: AuthorizedPrincipalIdentifiers,
    domainId: S.String,
    projectId: S.String,
    environmentId: S.String,
    name: SensitiveString,
    type: S.String,
    createdBy: S.String,
    updatedBy: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    manageAccessRole: S.optional(S.String),
    applicableAssetTypes: ApplicableAssetTypes,
    subscriptionTargetConfig: SubscriptionTargetForms,
    provider: S.String,
    subscriptionGrantCreationMode: S.optional(SubscriptionGrantCreationMode),
  }),
).annotate({
  identifier: "UpdateSubscriptionTargetOutput",
}) as any as S.Schema<UpdateSubscriptionTargetOutput>;
export interface UpdateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType;
  status: UserProfileStatus;
  sessionName?: string;
}
export const UpdateUserProfileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
    userIdentifier: S.String.pipe(T.HttpLabel("userIdentifier")),
    type: S.optional(UserProfileType),
    status: UserProfileStatus,
    sessionName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserProfileInput",
}) as any as S.Schema<UpdateUserProfileInput>;
export interface UpdateUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export const UpdateUserProfileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.optional(S.String),
    id: S.optional(S.String),
    type: S.optional(UserProfileType),
    status: S.optional(UserProfileStatus),
    details: S.optional(UserProfileDetails),
  }),
).annotate({
  identifier: "UpdateUserProfileOutput",
}) as any as S.Schema<UpdateUserProfileOutput>;
export type ErrorMessage = string;
export type AcceptPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const acceptPredictions: API.OperationMethod<
  AcceptPredictionsInput,
  AcceptPredictionsOutput,
  AcceptPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptPredictionsInput,
  output: AcceptPredictionsOutput,
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
  operationName: "AcceptPredictions",
}));

export type AcceptSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a subscription request to a specific asset.
 */
export const acceptSubscriptionRequest: API.OperationMethod<
  AcceptSubscriptionRequestInput,
  AcceptSubscriptionRequestOutput,
  AcceptSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptSubscriptionRequestInput,
  output: AcceptSubscriptionRequestOutput,
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
  operationName: "AcceptSubscriptionRequest",
}));

export type AddEntityOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the owner of an entity (a domain unit).
 */
export const addEntityOwner: API.OperationMethod<
  AddEntityOwnerInput,
  AddEntityOwnerOutput,
  AddEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddEntityOwnerInput,
  output: AddEntityOwnerOutput,
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
  operationName: "AddEntityOwner",
}));

export type AddPolicyGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a policy grant (an authorization policy) to a specified entity, including domain units, environment blueprint configurations, or environment profiles.
 */
export const addPolicyGrant: API.OperationMethod<
  AddPolicyGrantInput,
  AddPolicyGrantOutput,
  AddPolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddPolicyGrantInput,
  output: AddPolicyGrantOutput,
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
  operationName: "AddPolicyGrant",
}));

export type AssociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the environment role in Amazon DataZone.
 */
export const associateEnvironmentRole: API.OperationMethod<
  AssociateEnvironmentRoleInput,
  AssociateEnvironmentRoleOutput,
  AssociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateEnvironmentRoleInput,
  output: AssociateEnvironmentRoleOutput,
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
  operationName: "AssociateEnvironmentRole",
}));

export type AssociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates governed terms with an asset.
 */
export const associateGovernedTerms: API.OperationMethod<
  AssociateGovernedTermsInput,
  AssociateGovernedTermsOutput,
  AssociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateGovernedTermsInput,
  output: AssociateGovernedTermsOutput,
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
  operationName: "AssociateGovernedTerms",
}));

export type BatchGetAttributesMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the attribute metadata.
 */
export const batchGetAttributesMetadata: API.OperationMethod<
  BatchGetAttributesMetadataInput,
  BatchGetAttributesMetadataOutput,
  BatchGetAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetAttributesMetadataInput,
  output: BatchGetAttributesMetadataOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAttributesMetadata",
}));

export type BatchPutAttributesMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Writes the attribute metadata.
 */
export const batchPutAttributesMetadata: API.OperationMethod<
  BatchPutAttributesMetadataInput,
  BatchPutAttributesMetadataOutput,
  BatchPutAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutAttributesMetadataInput,
  output: BatchPutAttributesMetadataOutput,
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
  operationName: "BatchPutAttributesMetadata",
}));

export type CancelMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the metadata generation run.
 *
 * Prerequisites:
 *
 * - The run must exist and be in a cancelable status (e.g., SUBMITTED, IN_PROGRESS).
 *
 * - Runs in SUCCEEDED status cannot be cancelled.
 *
 * - User must have access to the run and cancel permissions.
 */
export const cancelMetadataGenerationRun: API.OperationMethod<
  CancelMetadataGenerationRunInput,
  CancelMetadataGenerationRunOutput,
  CancelMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMetadataGenerationRunInput,
  output: CancelMetadataGenerationRunOutput,
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
  operationName: "CancelMetadataGenerationRun",
}));

export type CancelSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the subscription to the specified asset.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionInput,
  CancelSubscriptionOutput,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSubscriptionInput,
  output: CancelSubscriptionOutput,
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
  operationName: "CancelSubscription",
}));

export type CreateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an account pool.
 */
export const createAccountPool: API.OperationMethod<
  CreateAccountPoolInput,
  CreateAccountPoolOutput,
  CreateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccountPoolInput,
  output: CreateAccountPoolOutput,
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
  operationName: "CreateAccountPool",
}));

export type CreateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an asset in Amazon DataZone catalog.
 *
 * Before creating assets, make sure that the following requirements are met:
 *
 * - `--domain-identifier` must refer to an existing domain.
 *
 * - `--owning-project-identifier` must be a valid project within the domain.
 *
 * - Asset type must be created beforehand using `create-asset-type`, or be a supported system-defined type. For more information, see create-asset-type.
 *
 * - `--type-revision` (if used) must match a valid revision of the asset type.
 *
 * - `formsInput` is required when it is associated as required in the `asset-type`. For more information, see create-form-type.
 *
 * - Form content must include all required fields as per the form schema (e.g., `bucketArn`).
 *
 * You must invoke the following pre-requisite commands before invoking this API:
 *
 * - CreateFormType
 *
 * - CreateAssetType
 */
export const createAsset: API.OperationMethod<
  CreateAssetInput,
  CreateAssetOutput,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetInput,
  output: CreateAssetOutput,
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
  operationName: "CreateAsset",
}));

export type CreateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data asset filter.
 *
 * Asset filters provide a sophisticated way to create controlled views of data assets by selecting specific columns or applying row-level filters. This capability is crucial for organizations that need to share data while maintaining security and privacy controls. For example, your database might be filtered to show only non-PII fields to certain users, or sales data might be filtered by region for different regional teams. Asset filters enable fine-grained access control while maintaining a single source of truth.
 *
 * Prerequisites:
 *
 * - A valid domain (`--domain-identifier`) must exist.
 *
 * - A data asset (`--asset-identifier`) must already be created under that domain.
 *
 * - The asset must have the referenced columns available in its schema for column-based filtering.
 *
 * - You cannot specify both (`columnConfiguration`, `rowConfiguration`)at the same time.
 */
export const createAssetFilter: API.OperationMethod<
  CreateAssetFilterInput,
  CreateAssetFilterOutput,
  CreateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetFilterInput,
  output: CreateAssetFilterOutput,
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
  operationName: "CreateAssetFilter",
}));

export type CreateAssetRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a revision of the asset.
 *
 * Asset revisions represent new versions of existing assets, capturing changes to either the underlying data or its metadata. They maintain a historical record of how assets evolve over time, who made changes, and when those changes occurred. This versioning capability is crucial for governance and compliance, allowing organizations to track changes, understand their impact, and roll back if necessary.
 *
 * Prerequisites:
 *
 * - Asset must already exist in the domain with identifier.
 *
 * - `formsInput` is required when asset has the form type. `typeRevision` should be the latest version of form type.
 *
 * - The form content must include all required fields (e.g., `bucketArn` for `S3ObjectCollectionForm`).
 *
 * - The owning project of the original asset must still exist and be active.
 *
 * - User must have write access to the project and domain.
 */
export const createAssetRevision: API.OperationMethod<
  CreateAssetRevisionInput,
  CreateAssetRevisionOutput,
  CreateAssetRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetRevisionInput,
  output: CreateAssetRevisionOutput,
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
  operationName: "CreateAssetRevision",
}));

export type CreateAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom asset type.
 *
 * Prerequisites:
 *
 * - The `formsInput` field is required, however, can be passed as empty (e.g. `-forms-input {})`.
 *
 * - You must have `CreateAssetType` permissions.
 *
 * - The domain-identifier and owning-project-identifier must be valid and active.
 *
 * - The name of the asset type must be unique within the domain — duplicate names will cause failure.
 *
 * - JSON input must be valid — incorrect formatting causes Invalid JSON errors.
 */
export const createAssetType: API.OperationMethod<
  CreateAssetTypeInput,
  CreateAssetTypeOutput,
  CreateAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetTypeInput,
  output: CreateAssetTypeOutput,
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
  operationName: "CreateAssetType",
}));

export type CreateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionInput,
  CreateConnectionOutput,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionInput,
  output: CreateConnectionOutput,
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
  operationName: "CreateConnection",
}));

export type CreateDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data product.
 *
 * A data product is a comprehensive package that combines data assets with their associated metadata, documentation, and access controls. It's designed to serve specific business needs or use cases, making it easier for users to find and consume data appropriately. Data products include important information about data quality, freshness, and usage guidelines, effectively bridging the gap between data producers and consumers while ensuring proper governance.
 *
 * Prerequisites:
 *
 * - The domain must exist and be accessible.
 *
 * - The owning project must be valid and active.
 *
 * - The name must be unique within the domain (no existing data product with the same name).
 *
 * - User must have create permissions for data products in the project.
 */
export const createDataProduct: API.OperationMethod<
  CreateDataProductInput,
  CreateDataProductOutput,
  CreateDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataProductInput,
  output: CreateDataProductOutput,
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
  operationName: "CreateDataProduct",
}));

export type CreateDataProductRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data product revision.
 *
 * Prerequisites:
 *
 * - The original data product must exist in the given domain.
 *
 * - User must have permissions on the data product.
 *
 * - The domain must be valid and accessible.
 *
 * - The new revision name must comply with naming constraints (if required).
 */
export const createDataProductRevision: API.OperationMethod<
  CreateDataProductRevisionInput,
  CreateDataProductRevisionOutput,
  CreateDataProductRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataProductRevisionInput,
  output: CreateDataProductRevisionOutput,
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
  operationName: "CreateDataProductRevision",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone data source.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceInput,
  CreateDataSourceOutput,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceInput,
  output: CreateDataSourceOutput,
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
  operationName: "CreateDataSource",
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
 * Creates an Amazon DataZone domain.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainInput,
  output: CreateDomainOutput,
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

export type CreateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain unit in Amazon DataZone.
 */
export const createDomainUnit: API.OperationMethod<
  CreateDomainUnitInput,
  CreateDomainUnitOutput,
  CreateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainUnitInput,
  output: CreateDomainUnitOutput,
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
  operationName: "CreateDomainUnit",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Amazon DataZone environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentInput,
  output: CreateEnvironmentOutput,
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
  operationName: "CreateEnvironment",
}));

export type CreateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an action for the environment, for example, creates a console link for an analytics tool that is available in this environment.
 */
export const createEnvironmentAction: API.OperationMethod<
  CreateEnvironmentActionInput,
  CreateEnvironmentActionOutput,
  CreateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentActionInput,
  output: CreateEnvironmentActionOutput,
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
  operationName: "CreateEnvironmentAction",
}));

export type CreateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Amazon DataZone blueprint.
 */
export const createEnvironmentBlueprint: API.OperationMethod<
  CreateEnvironmentBlueprintInput,
  CreateEnvironmentBlueprintOutput,
  CreateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentBlueprintInput,
  output: CreateEnvironmentBlueprintOutput,
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
  operationName: "CreateEnvironmentBlueprint",
}));

export type CreateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone environment profile.
 */
export const createEnvironmentProfile: API.OperationMethod<
  CreateEnvironmentProfileInput,
  CreateEnvironmentProfileOutput,
  CreateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentProfileInput,
  output: CreateEnvironmentProfileOutput,
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
  operationName: "CreateEnvironmentProfile",
}));

export type CreateFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a metadata form type.
 *
 * Prerequisites:
 *
 * - The domain must exist and be in an `ENABLED` state.
 *
 * - The owning project must exist and be accessible.
 *
 * - The name must be unique within the domain.
 *
 * For custom form types, to indicate that a field should be searchable, annotate it with `@amazon.datazone#searchable`. By default, searchable fields are indexed for semantic search, where related query terms will match the attribute value even if they are not stemmed or keyword matches. To indicate that a field should be indexed for lexical search (which disables semantic search but supports stemmed and partial matches), annotate it with `@amazon.datazone#searchable(modes:["LEXICAL"])`. To indicate that a field should be indexed for technical identifier search (for more information on technical identifier search, see: https://aws.amazon.com/blogs/big-data/streamline-data-discovery-with-precise-technical-identifier-search-in-amazon-sagemaker-unified-studio/), annotate it with `@amazon.datazone#searchable(modes:["TECHNICAL"])`.
 *
 * To denote that a field will store glossary term ids (which are filterable via the Search/SearchListings APIs), annotate it with `@amazon.datazone#glossaryterm("${GLOSSARY_ID}")`, where `${GLOSSARY_ID}` is the id of the glossary that the glossary terms stored in the field belong to.
 */
export const createFormType: API.OperationMethod<
  CreateFormTypeInput,
  CreateFormTypeOutput,
  CreateFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFormTypeInput,
  output: CreateFormTypeOutput,
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
  operationName: "CreateFormType",
}));

export type CreateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone business glossary.
 *
 * Specifies that this is a create glossary policy.
 *
 * A glossary serves as the central repository for business terminology and definitions within an organization. It helps establish and maintain a common language across different departments and teams, reducing miscommunication and ensuring consistent interpretation of business concepts. Glossaries can include hierarchical relationships between terms, cross-references, and links to actual data assets, making them invaluable for both business users and technical teams trying to understand and use data correctly.
 *
 * Prerequisites:
 *
 * - Domain must exist and be in an active state.
 *
 * - Owning project must exist and be accessible by the caller.
 *
 * - The glossary name must be unique within the domain.
 */
export const createGlossary: API.OperationMethod<
  CreateGlossaryInput,
  CreateGlossaryOutput,
  CreateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlossaryInput,
  output: CreateGlossaryOutput,
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
  operationName: "CreateGlossary",
}));

export type CreateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a business glossary term.
 *
 * A glossary term represents an individual entry within the Amazon DataZone glossary, serving as a standardized definition for a specific business concept or data element. Each term can include rich metadata such as detailed definitions, synonyms, related terms, and usage examples. Glossary terms can be linked directly to data assets, providing business context to technical data elements. This linking capability helps users understand the business meaning of data fields and ensures consistent interpretation across different systems and teams. Terms can also have relationships with other terms, creating a semantic network that reflects the complexity of business concepts.
 *
 * Prerequisites:
 *
 * - Domain must exist.
 *
 * - Glossary must exist.
 *
 * - The term name must be unique within the glossary.
 *
 * - Ensure term does not conflict with existing terms in hierarchy.
 */
export const createGlossaryTerm: API.OperationMethod<
  CreateGlossaryTermInput,
  CreateGlossaryTermOutput,
  CreateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlossaryTermInput,
  output: CreateGlossaryTermOutput,
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
  operationName: "CreateGlossaryTerm",
}));

export type CreateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group profile in Amazon DataZone.
 */
export const createGroupProfile: API.OperationMethod<
  CreateGroupProfileInput,
  CreateGroupProfileOutput,
  CreateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupProfileInput,
  output: CreateGroupProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupProfile",
}));

export type CreateListingChangeSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Publishes a listing (a record of an asset at a given time) or removes a listing from the catalog.
 */
export const createListingChangeSet: API.OperationMethod<
  CreateListingChangeSetInput,
  CreateListingChangeSetOutput,
  CreateListingChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateListingChangeSetInput,
  output: CreateListingChangeSetOutput,
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
  operationName: "CreateListingChangeSet",
}));

export type CreateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notebook in Amazon SageMaker Unified Studio. A notebook is a collaborative document within a project that contains code cells for interactive computing.
 */
export const createNotebook: API.OperationMethod<
  CreateNotebookInput,
  CreateNotebookOutput,
  CreateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotebookInput,
  output: CreateNotebookOutput,
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
  operationName: "CreateNotebook",
}));

export type CreateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone project.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectInput,
  output: CreateProjectOutput,
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
  operationName: "CreateProject",
}));

export type CreateProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project membership in Amazon DataZone.
 */
export const createProjectMembership: API.OperationMethod<
  CreateProjectMembershipInput,
  CreateProjectMembershipOutput,
  CreateProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectMembershipInput,
  output: CreateProjectMembershipOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectMembership",
}));

export type CreateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project profile.
 */
export const createProjectProfile: API.OperationMethod<
  CreateProjectProfileInput,
  CreateProjectProfileOutput,
  CreateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectProfileInput,
  output: CreateProjectProfileOutput,
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
  operationName: "CreateProjectProfile",
}));

export type CreateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleInput,
  output: CreateRuleOutput,
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
  operationName: "CreateRule",
}));

export type CreateSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subsscription grant in Amazon DataZone.
 */
export const createSubscriptionGrant: API.OperationMethod<
  CreateSubscriptionGrantInput,
  CreateSubscriptionGrantOutput,
  CreateSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionGrantInput,
  output: CreateSubscriptionGrantOutput,
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
  operationName: "CreateSubscriptionGrant",
}));

export type CreateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription request in Amazon DataZone.
 */
export const createSubscriptionRequest: API.OperationMethod<
  CreateSubscriptionRequestInput,
  CreateSubscriptionRequestOutput,
  CreateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionRequestInput,
  output: CreateSubscriptionRequestOutput,
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
  operationName: "CreateSubscriptionRequest",
}));

export type CreateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription target in Amazon DataZone.
 */
export const createSubscriptionTarget: API.OperationMethod<
  CreateSubscriptionTargetInput,
  CreateSubscriptionTargetOutput,
  CreateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionTargetInput,
  output: CreateSubscriptionTargetOutput,
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
  operationName: "CreateSubscriptionTarget",
}));

export type CreateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user profile in Amazon DataZone.
 */
export const createUserProfile: API.OperationMethod<
  CreateUserProfileInput,
  CreateUserProfileOutput,
  CreateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserProfileInput,
  output: CreateUserProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserProfile",
}));

export type DeleteAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account pool.
 */
export const deleteAccountPool: API.OperationMethod<
  DeleteAccountPoolInput,
  DeleteAccountPoolOutput,
  DeleteAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountPoolInput,
  output: DeleteAccountPoolOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountPool",
}));

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset in Amazon DataZone.
 *
 * - --domain-identifier must refer to a valid and existing domain.
 *
 * - --identifier must refer to an existing asset in the specified domain.
 *
 * - Asset must not be referenced in any existing asset filters.
 *
 * - Asset must not be linked to any draft or published data product.
 *
 * - User must have delete permissions for the domain and project.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetInput,
  DeleteAssetOutput,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetInput,
  output: DeleteAssetOutput,
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
  operationName: "DeleteAsset",
}));

export type DeleteAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset filter.
 *
 * Prerequisites:
 *
 * - The asset filter must exist.
 *
 * - The domain and asset must not have been deleted.
 *
 * - Ensure the --identifier refers to a valid filter ID.
 */
export const deleteAssetFilter: API.OperationMethod<
  DeleteAssetFilterInput,
  DeleteAssetFilterResponse,
  DeleteAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetFilterInput,
  output: DeleteAssetFilterResponse,
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
  operationName: "DeleteAssetFilter",
}));

export type DeleteAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset type in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The asset type must exist in the domain.
 *
 * - You must have DeleteAssetType permission.
 *
 * - The asset type must not be in use (e.g., assigned to any asset). If used, deletion will fail.
 *
 * - You should retrieve the asset type using get-asset-type to confirm its presence before deletion.
 */
export const deleteAssetType: API.OperationMethod<
  DeleteAssetTypeInput,
  DeleteAssetTypeOutput,
  DeleteAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetTypeInput,
  output: DeleteAssetTypeOutput,
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
  operationName: "DeleteAssetType",
}));

export type DeleteConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionInput,
  DeleteConnectionOutput,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionInput,
  output: DeleteConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes data export configuration for a domain.
 *
 * This operation does not delete the S3 table created by the PutDataExportConfiguration operation.
 *
 * To temporarily disable export without deleting the configuration, use the PutDataExportConfiguration operation with the `--no-enable-export` flag instead. This allows you to re-enable export for the same domain using the `--enable-export` flag without deleting S3 table.
 */
export const deleteDataExportConfiguration: API.OperationMethod<
  DeleteDataExportConfigurationInput,
  DeleteDataExportConfigurationOutput,
  DeleteDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataExportConfigurationInput,
  output: DeleteDataExportConfigurationOutput,
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
  operationName: "DeleteDataExportConfiguration",
}));

export type DeleteDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data product in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The data product must exist and not be deleted or archived.
 *
 * - The user must have delete permissions for the data product.
 *
 * - Domain and project must be active.
 */
export const deleteDataProduct: API.OperationMethod<
  DeleteDataProductInput,
  DeleteDataProductOutput,
  DeleteDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataProductInput,
  output: DeleteDataProductOutput,
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
  operationName: "DeleteDataProduct",
}));

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data source in Amazon DataZone.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceInput,
  DeleteDataSourceOutput,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataSourceInput,
  output: DeleteDataSourceOutput,
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
  operationName: "DeleteDataSource",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Amazon DataZone domain.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainInput,
  output: DeleteDomainOutput,
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
  operationName: "DeleteDomain",
}));

export type DeleteDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain unit.
 */
export const deleteDomainUnit: API.OperationMethod<
  DeleteDomainUnitInput,
  DeleteDomainUnitOutput,
  DeleteDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainUnitInput,
  output: DeleteDomainUnitOutput,
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
  operationName: "DeleteDomainUnit",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment in Amazon DataZone.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentInput,
  output: DeleteEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type DeleteEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an action for the environment, for example, deletes a console link for an analytics tool that is available in this environment.
 */
export const deleteEnvironmentAction: API.OperationMethod<
  DeleteEnvironmentActionInput,
  DeleteEnvironmentActionResponse,
  DeleteEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentActionInput,
  output: DeleteEnvironmentActionResponse,
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
  operationName: "DeleteEnvironmentAction",
}));

export type DeleteEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a blueprint in Amazon DataZone.
 */
export const deleteEnvironmentBlueprint: API.OperationMethod<
  DeleteEnvironmentBlueprintInput,
  DeleteEnvironmentBlueprintResponse,
  DeleteEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentBlueprintInput,
  output: DeleteEnvironmentBlueprintResponse,
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
  operationName: "DeleteEnvironmentBlueprint",
}));

export type DeleteEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the blueprint configuration in Amazon DataZone.
 */
export const deleteEnvironmentBlueprintConfiguration: API.OperationMethod<
  DeleteEnvironmentBlueprintConfigurationInput,
  DeleteEnvironmentBlueprintConfigurationOutput,
  DeleteEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentBlueprintConfigurationInput,
  output: DeleteEnvironmentBlueprintConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentBlueprintConfiguration",
}));

export type DeleteEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment profile in Amazon DataZone.
 */
export const deleteEnvironmentProfile: API.OperationMethod<
  DeleteEnvironmentProfileInput,
  DeleteEnvironmentProfileResponse,
  DeleteEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentProfileInput,
  output: DeleteEnvironmentProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentProfile",
}));

export type DeleteFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and metadata form type in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The form type must exist in the domain.
 *
 * - The form type must not be in use by any asset types or assets.
 *
 * - The domain must be valid and accessible.
 *
 * - User must have delete permissions on the form type.
 *
 * - Any dependencies (such as linked asset types) must be removed first.
 */
export const deleteFormType: API.OperationMethod<
  DeleteFormTypeInput,
  DeleteFormTypeOutput,
  DeleteFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFormTypeInput,
  output: DeleteFormTypeOutput,
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
  operationName: "DeleteFormType",
}));

export type DeleteGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The glossary must be in DISABLED state.
 *
 * - The glossary must not have any glossary terms associated with it.
 *
 * - The glossary must exist in the specified domain.
 *
 * - The caller must have the `datazone:DeleteGlossary` permission in the domain and glossary.
 *
 * - Glossary should not be linked to any active metadata forms.
 */
export const deleteGlossary: API.OperationMethod<
  DeleteGlossaryInput,
  DeleteGlossaryOutput,
  DeleteGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlossaryInput,
  output: DeleteGlossaryOutput,
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
  operationName: "DeleteGlossary",
}));

export type DeleteGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term must exist and be active.
 *
 * - The term must not be linked to other assets or child terms.
 *
 * - Caller must have delete permissions in the domain/glossary.
 *
 * - Ensure all associations (such as to assets or parent terms) are removed before deletion.
 */
export const deleteGlossaryTerm: API.OperationMethod<
  DeleteGlossaryTermInput,
  DeleteGlossaryTermOutput,
  DeleteGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlossaryTermInput,
  output: DeleteGlossaryTermOutput,
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
  operationName: "DeleteGlossaryTerm",
}));

export type DeleteLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified lineage event.
 */
export const deleteLineageEvent: API.OperationMethod<
  DeleteLineageEventInput,
  DeleteLineageEventOutput,
  DeleteLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLineageEventInput,
  output: DeleteLineageEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLineageEvent",
}));

export type DeleteListingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a listing (a record of an asset at a given time).
 */
export const deleteListing: API.OperationMethod<
  DeleteListingInput,
  DeleteListingOutput,
  DeleteListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteListingInput,
  output: DeleteListingOutput,
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
  operationName: "DeleteListing",
}));

export type DeleteNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notebook in Amazon SageMaker Unified Studio.
 */
export const deleteNotebook: API.OperationMethod<
  DeleteNotebookInput,
  DeleteNotebookOutput,
  DeleteNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotebookInput,
  output: DeleteNotebookOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebook",
}));

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project in Amazon DataZone.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput,
  DeleteProjectOutput,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectInput,
  output: DeleteProjectOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes project membership in Amazon DataZone.
 */
export const deleteProjectMembership: API.OperationMethod<
  DeleteProjectMembershipInput,
  DeleteProjectMembershipOutput,
  DeleteProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectMembershipInput,
  output: DeleteProjectMembershipOutput,
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
  operationName: "DeleteProjectMembership",
}));

export type DeleteProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project profile.
 */
export const deleteProjectProfile: API.OperationMethod<
  DeleteProjectProfileInput,
  DeleteProjectProfileOutput,
  DeleteProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectProfileInput,
  output: DeleteProjectProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectProfile",
}));

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput,
  DeleteRuleOutput,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleInput,
  output: DeleteRuleOutput,
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
  operationName: "DeleteRule",
}));

export type DeleteSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and subscription grant in Amazon DataZone.
 */
export const deleteSubscriptionGrant: API.OperationMethod<
  DeleteSubscriptionGrantInput,
  DeleteSubscriptionGrantOutput,
  DeleteSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionGrantInput,
  output: DeleteSubscriptionGrantOutput,
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
  operationName: "DeleteSubscriptionGrant",
}));

export type DeleteSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a subscription request in Amazon DataZone.
 */
export const deleteSubscriptionRequest: API.OperationMethod<
  DeleteSubscriptionRequestInput,
  DeleteSubscriptionRequestResponse,
  DeleteSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionRequestInput,
  output: DeleteSubscriptionRequestResponse,
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
  operationName: "DeleteSubscriptionRequest",
}));

export type DeleteSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a subscription target in Amazon DataZone.
 */
export const deleteSubscriptionTarget: API.OperationMethod<
  DeleteSubscriptionTargetInput,
  DeleteSubscriptionTargetResponse,
  DeleteSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionTargetInput,
  output: DeleteSubscriptionTargetResponse,
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
  operationName: "DeleteSubscriptionTarget",
}));

export type DeleteTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified time series form for the specified asset.
 */
export const deleteTimeSeriesDataPoints: API.OperationMethod<
  DeleteTimeSeriesDataPointsInput,
  DeleteTimeSeriesDataPointsOutput,
  DeleteTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTimeSeriesDataPointsInput,
  output: DeleteTimeSeriesDataPointsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimeSeriesDataPoints",
}));

export type DisassociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the environment role in Amazon DataZone.
 */
export const disassociateEnvironmentRole: API.OperationMethod<
  DisassociateEnvironmentRoleInput,
  DisassociateEnvironmentRoleOutput,
  DisassociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateEnvironmentRoleInput,
  output: DisassociateEnvironmentRoleOutput,
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
  operationName: "DisassociateEnvironmentRole",
}));

export type DisassociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates restricted terms from an asset.
 */
export const disassociateGovernedTerms: API.OperationMethod<
  DisassociateGovernedTermsInput,
  DisassociateGovernedTermsOutput,
  DisassociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateGovernedTermsInput,
  output: DisassociateGovernedTermsOutput,
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
  operationName: "DisassociateGovernedTerms",
}));

export type GetAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the account pool.
 */
export const getAccountPool: API.OperationMethod<
  GetAccountPoolInput,
  GetAccountPoolOutput,
  GetAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountPoolInput,
  output: GetAccountPoolOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPool",
}));

export type GetAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone asset.
 *
 * An asset is the fundamental building block in Amazon DataZone, representing any data resource that needs to be cataloged and managed. It can take many forms, from Amazon S3 buckets and database tables to dashboards and machine learning models. Each asset contains comprehensive metadata about the resource, including its location, schema, ownership, and lineage information. Assets are essential for organizing and managing data resources across an organization, making them discoverable and usable while maintaining proper governance.
 *
 * Before using the Amazon DataZone GetAsset command, ensure the following prerequisites are met:
 *
 * - Domain identifier must exist and be valid
 *
 * - Asset identifier must exist
 *
 * - User must have the required permissions to perform the action
 */
export const getAsset: API.OperationMethod<
  GetAssetInput,
  GetAssetOutput,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetInput,
  output: GetAssetOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
}));

export type GetAssetFilterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an asset filter.
 *
 * Prerequisites:
 *
 * - Domain (`--domain-identifier`), asset (`--asset-identifier`), and filter (`--identifier`) must all exist.
 *
 * - The asset filter should not have been deleted.
 *
 * - The asset must still exist (since the filter is linked to it).
 */
export const getAssetFilter: API.OperationMethod<
  GetAssetFilterInput,
  GetAssetFilterOutput,
  GetAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetFilterInput,
  output: GetAssetFilterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetFilter",
}));

export type GetAssetTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone asset type.
 *
 * Asset types define the categories and characteristics of different kinds of data assets within Amazon DataZone.. They determine what metadata fields are required, what operations are possible, and how the asset integrates with other Amazon Web Services services. Asset types can range from built-in types like Amazon S3 buckets and Amazon Web Services Glue tables to custom types defined for specific organizational needs. Understanding asset types is crucial for properly organizing and managing different kinds of data resources.
 *
 * Prerequisites:
 *
 * - The asset type with identifier must exist in the domain. ResourceNotFoundException.
 *
 * - You must have the GetAssetType permission.
 *
 * - Ensure the domain-identifier value is correct and accessible.
 */
export const getAssetType: API.OperationMethod<
  GetAssetTypeInput,
  GetAssetTypeOutput,
  GetAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetTypeInput,
  output: GetAssetTypeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetType",
}));

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const getConnection: API.OperationMethod<
  GetConnectionInput,
  GetConnectionOutput,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionInput,
  output: GetConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetDataExportConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets data export configuration details.
 */
export const getDataExportConfiguration: API.OperationMethod<
  GetDataExportConfigurationInput,
  GetDataExportConfigurationOutput,
  GetDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataExportConfigurationInput,
  output: GetDataExportConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataExportConfiguration",
}));

export type GetDataProductError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data product.
 *
 * Prerequisites:
 *
 * - The data product ID must exist.
 *
 * - The domain must be valid and accessible.
 *
 * - User must have read or discovery permissions for the data product.
 */
export const getDataProduct: API.OperationMethod<
  GetDataProductInput,
  GetDataProductOutput,
  GetDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataProductInput,
  output: GetDataProductOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProduct",
}));

export type GetDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceInput,
  GetDataSourceOutput,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceInput,
  output: GetDataSourceOutput,
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
  operationName: "GetDataSource",
}));

export type GetDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source run.
 */
export const getDataSourceRun: API.OperationMethod<
  GetDataSourceRunInput,
  GetDataSourceRunOutput,
  GetDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceRunInput,
  output: GetDataSourceRunOutput,
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
  operationName: "GetDataSourceRun",
}));

export type GetDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainInput,
  output: GetDomainOutput,
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
  operationName: "GetDomain",
}));

export type GetDomainUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified domain unit.
 */
export const getDomainUnit: API.OperationMethod<
  GetDomainUnitInput,
  GetDomainUnitOutput,
  GetDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainUnitInput,
  output: GetDomainUnitOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainUnit",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentInput,
  output: GetEnvironmentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetEnvironmentActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the specified environment action.
 */
export const getEnvironmentAction: API.OperationMethod<
  GetEnvironmentActionInput,
  GetEnvironmentActionOutput,
  GetEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentActionInput,
  output: GetEnvironmentActionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentAction",
}));

export type GetEnvironmentBlueprintError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone blueprint.
 */
export const getEnvironmentBlueprint: API.OperationMethod<
  GetEnvironmentBlueprintInput,
  GetEnvironmentBlueprintOutput,
  GetEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentBlueprintInput,
  output: GetEnvironmentBlueprintOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprint",
}));

export type GetEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the blueprint configuration in Amazon DataZone.
 */
export const getEnvironmentBlueprintConfiguration: API.OperationMethod<
  GetEnvironmentBlueprintConfigurationInput,
  GetEnvironmentBlueprintConfigurationOutput,
  GetEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentBlueprintConfigurationInput,
  output: GetEnvironmentBlueprintConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprintConfiguration",
}));

export type GetEnvironmentCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the credentials of an environment in Amazon DataZone.
 */
export const getEnvironmentCredentials: API.OperationMethod<
  GetEnvironmentCredentialsInput,
  GetEnvironmentCredentialsOutput,
  GetEnvironmentCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentCredentialsInput,
  output: GetEnvironmentCredentialsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentCredentials",
}));

export type GetEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an evinronment profile in Amazon DataZone.
 */
export const getEnvironmentProfile: API.OperationMethod<
  GetEnvironmentProfileInput,
  GetEnvironmentProfileOutput,
  GetEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentProfileInput,
  output: GetEnvironmentProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentProfile",
}));

export type GetFormTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a metadata form type in Amazon DataZone.
 *
 * Form types define the structure and validation rules for collecting metadata about assets in Amazon DataZone. They act as templates that ensure consistent metadata capture across similar types of assets, while allowing for customization to meet specific organizational needs. Form types can include required fields, validation rules, and dependencies, helping maintain high-quality metadata that makes data assets more discoverable and usable.
 *
 * - The form type with the specified identifier must exist in the given domain.
 *
 * - The domain must be valid and active.
 *
 * - User must have permission on the form type.
 *
 * - The form type should not be deleted or in an invalid state.
 *
 * One use case for this API is to determine whether a form field is indexed for search.
 *
 * A searchable field will be annotated with `@amazon.datazone#searchable`. By default, searchable fields are indexed for semantic search, where related query terms will match the attribute value even if they are not stemmed or keyword matches. If a field is indexed technical identifier search, it will be annotated with `@amazon.datazone#searchable(modes:["TECHNICAL"])`. If a field is indexed for lexical search (supports stemmed and prefix matches but not semantic matches), it will be annotated with `@amazon.datazone#searchable(modes:["LEXICAL"])`.
 *
 * A field storing glossary term IDs (which is filterable) will be annotated with `@amazon.datazone#glossaryterm("${glossaryId}")`.
 */
export const getFormType: API.OperationMethod<
  GetFormTypeInput,
  GetFormTypeOutput,
  GetFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFormTypeInput,
  output: GetFormTypeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFormType",
}));

export type GetGlossaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The specified glossary ID must exist and be associated with the given domain.
 *
 * - The caller must have the `datazone:GetGlossary` permission on the domain.
 */
export const getGlossary: API.OperationMethod<
  GetGlossaryInput,
  GetGlossaryOutput,
  GetGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlossaryInput,
  output: GetGlossaryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossary",
}));

export type GetGlossaryTermError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term with identifier must exist in the domain.
 *
 * - User must have permission on the glossary term.
 *
 * - Domain must be accessible and active.
 */
export const getGlossaryTerm: API.OperationMethod<
  GetGlossaryTermInput,
  GetGlossaryTermOutput,
  GetGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlossaryTermInput,
  output: GetGlossaryTermOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossaryTerm",
}));

export type GetGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a group profile in Amazon DataZone.
 */
export const getGroupProfile: API.OperationMethod<
  GetGroupProfileInput,
  GetGroupProfileOutput,
  GetGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupProfileInput,
  output: GetGroupProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupProfile",
}));

export type GetIamPortalLoginUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data portal URL for the specified Amazon DataZone domain.
 */
export const getIamPortalLoginUrl: API.OperationMethod<
  GetIamPortalLoginUrlInput,
  GetIamPortalLoginUrlOutput,
  GetIamPortalLoginUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIamPortalLoginUrlInput,
  output: GetIamPortalLoginUrlOutput,
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
  operationName: "GetIamPortalLoginUrl",
}));

export type GetJobRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The details of the job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunInput,
  GetJobRunOutput,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRunInput,
  output: GetJobRunOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
}));

export type GetLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the lineage event.
 */
export const getLineageEvent: API.OperationMethod<
  GetLineageEventInput,
  GetLineageEventOutput,
  GetLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLineageEventInput,
  output: GetLineageEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLineageEvent",
}));

export type GetLineageNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data lineage node.
 */
export const getLineageNode: API.OperationMethod<
  GetLineageNodeInput,
  GetLineageNodeOutput,
  GetLineageNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLineageNodeInput,
  output: GetLineageNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLineageNode",
}));

export type GetListingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a listing (a record of an asset at a given time). If you specify a listing version, only details that are specific to that version are returned.
 */
export const getListing: API.OperationMethod<
  GetListingInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetListingInput,
  output: GetListingOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListing",
}));

export type GetMetadataGenerationRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a metadata generation run in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Valid domain and run identifier.
 *
 * - The metadata generation run must exist.
 *
 * - User must have read access to the metadata run.
 */
export const getMetadataGenerationRun: API.OperationMethod<
  GetMetadataGenerationRunInput,
  GetMetadataGenerationRunOutput,
  GetMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetadataGenerationRunInput,
  output: GetMetadataGenerationRunOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetadataGenerationRun",
}));

export type GetNotebookError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook in Amazon SageMaker Unified Studio.
 */
export const getNotebook: API.OperationMethod<
  GetNotebookInput,
  GetNotebookOutput,
  GetNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotebookInput,
  output: GetNotebookOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebook",
}));

export type GetNotebookExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook export in Amazon SageMaker Unified Studio.
 */
export const getNotebookExport: API.OperationMethod<
  GetNotebookExportInput,
  GetNotebookExportOutput,
  GetNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotebookExportInput,
  output: GetNotebookExportOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookExport",
}));

export type GetNotebookRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook run in Amazon SageMaker Unified Studio.
 */
export const getNotebookRun: API.OperationMethod<
  GetNotebookRunInput,
  GetNotebookRunOutput,
  GetNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotebookRunInput,
  output: GetNotebookRunOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookRun",
}));

export type GetProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a project in Amazon DataZone.
 */
export const getProject: API.OperationMethod<
  GetProjectInput,
  GetProjectOutput,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProjectInput,
  output: GetProjectOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
}));

export type GetProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The details of the project profile.
 */
export const getProjectProfile: API.OperationMethod<
  GetProjectProfileInput,
  GetProjectProfileOutput,
  GetProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProjectProfileInput,
  output: GetProjectProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProjectProfile",
}));

export type GetRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const getRule: API.OperationMethod<
  GetRuleInput,
  GetRuleOutput,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuleInput,
  output: GetRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a subscription in Amazon DataZone.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionInput,
  output: GetSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type GetSubscriptionGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the subscription grant in Amazon DataZone.
 */
export const getSubscriptionGrant: API.OperationMethod<
  GetSubscriptionGrantInput,
  GetSubscriptionGrantOutput,
  GetSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionGrantInput,
  output: GetSubscriptionGrantOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionGrant",
}));

export type GetSubscriptionRequestDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified subscription request.
 */
export const getSubscriptionRequestDetails: API.OperationMethod<
  GetSubscriptionRequestDetailsInput,
  GetSubscriptionRequestDetailsOutput,
  GetSubscriptionRequestDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionRequestDetailsInput,
  output: GetSubscriptionRequestDetailsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionRequestDetails",
}));

export type GetSubscriptionTargetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the subscription target in Amazon DataZone.
 */
export const getSubscriptionTarget: API.OperationMethod<
  GetSubscriptionTargetInput,
  GetSubscriptionTargetOutput,
  GetSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionTargetInput,
  output: GetSubscriptionTargetOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionTarget",
}));

export type GetTimeSeriesDataPointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the existing data point for the asset.
 */
export const getTimeSeriesDataPoint: API.OperationMethod<
  GetTimeSeriesDataPointInput,
  GetTimeSeriesDataPointOutput,
  GetTimeSeriesDataPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTimeSeriesDataPointInput,
  output: GetTimeSeriesDataPointOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimeSeriesDataPoint",
}));

export type GetUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a user profile in Amazon DataZone.
 */
export const getUserProfile: API.OperationMethod<
  GetUserProfileInput,
  GetUserProfileOutput,
  GetUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserProfileInput,
  output: GetUserProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserProfile",
}));

export type ListAccountPoolsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing account pools.
 */
export const listAccountPools: API.PaginatedOperationMethod<
  ListAccountPoolsInput,
  ListAccountPoolsOutput,
  ListAccountPoolsError,
  Credentials | HttpClient.HttpClient,
  AccountPoolSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountPoolsInput,
  output: ListAccountPoolsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountPools",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccountsInAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the accounts in the specified account pool.
 */
export const listAccountsInAccountPool: API.PaginatedOperationMethod<
  ListAccountsInAccountPoolInput,
  ListAccountsInAccountPoolOutput,
  ListAccountsInAccountPoolError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsInAccountPoolInput,
  output: ListAccountsInAccountPoolOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsInAccountPool",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetFiltersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists asset filters.
 *
 * Prerequisites:
 *
 * - A valid domain and asset must exist.
 *
 * - The asset must have at least one filter created to return results.
 */
export const listAssetFilters: API.PaginatedOperationMethod<
  ListAssetFiltersInput,
  ListAssetFiltersOutput,
  ListAssetFiltersError,
  Credentials | HttpClient.HttpClient,
  AssetFilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetFiltersInput,
  output: ListAssetFiltersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the revisions for the asset.
 *
 * Prerequisites:
 *
 * - The asset must exist in the domain.
 *
 * - There must be at least one revision of the asset (which happens automatically after creation).
 *
 * - The domain must be valid and active.
 *
 * - User must have permissions on the asset and domain.
 */
export const listAssetRevisions: API.PaginatedOperationMethod<
  ListAssetRevisionsInput,
  ListAssetRevisionsOutput,
  ListAssetRevisionsError,
  Credentials | HttpClient.HttpClient,
  AssetRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetRevisionsInput,
  output: ListAssetRevisionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists connections. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsInput,
  ListConnectionsOutput,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionsInput,
  output: ListConnectionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataProductRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data product revisions.
 *
 * Prerequisites:
 *
 * - The data product ID must exist within the domain.
 *
 * - User must have view permissions on the data product.
 *
 * - The domain must be in a valid and accessible state.
 */
export const listDataProductRevisions: API.PaginatedOperationMethod<
  ListDataProductRevisionsInput,
  ListDataProductRevisionsOutput,
  ListDataProductRevisionsError,
  Credentials | HttpClient.HttpClient,
  DataProductRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataProductRevisionsInput,
  output: ListDataProductRevisionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataProductRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceRunActivitiesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data source run activities.
 */
export const listDataSourceRunActivities: API.PaginatedOperationMethod<
  ListDataSourceRunActivitiesInput,
  ListDataSourceRunActivitiesOutput,
  ListDataSourceRunActivitiesError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunActivity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourceRunActivitiesInput,
  output: ListDataSourceRunActivitiesOutput,
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
  operationName: "ListDataSourceRunActivities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data source runs in Amazon DataZone.
 */
export const listDataSourceRuns: API.PaginatedOperationMethod<
  ListDataSourceRunsInput,
  ListDataSourceRunsOutput,
  ListDataSourceRunsError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourceRunsInput,
  output: ListDataSourceRunsOutput,
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
  operationName: "ListDataSourceRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data sources in Amazon DataZone.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesInput,
  ListDataSourcesOutput,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourcesInput,
  output: ListDataSourcesOutput,
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
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone domains.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsInput,
  output: ListDomainsOutput,
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
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainUnitsForParentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists child domain units for the specified parent domain unit.
 */
export const listDomainUnitsForParent: API.PaginatedOperationMethod<
  ListDomainUnitsForParentInput,
  ListDomainUnitsForParentOutput,
  ListDomainUnitsForParentError,
  Credentials | HttpClient.HttpClient,
  DomainUnitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainUnitsForParentInput,
  output: ListDomainUnitsForParentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainUnitsForParent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEntityOwnersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the entity (domain units) owners.
 */
export const listEntityOwners: API.PaginatedOperationMethod<
  ListEntityOwnersInput,
  ListEntityOwnersOutput,
  ListEntityOwnersError,
  Credentials | HttpClient.HttpClient,
  OwnerPropertiesOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntityOwnersInput,
  output: ListEntityOwnersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityOwners",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "owners",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing environment actions.
 */
export const listEnvironmentActions: API.PaginatedOperationMethod<
  ListEnvironmentActionsInput,
  ListEnvironmentActionsOutput,
  ListEnvironmentActionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentActionsInput,
  output: ListEnvironmentActionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentBlueprintConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists blueprint configurations for a Amazon DataZone environment.
 */
export const listEnvironmentBlueprintConfigurations: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintConfigurationsInput,
  ListEnvironmentBlueprintConfigurationsOutput,
  ListEnvironmentBlueprintConfigurationsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintConfigurationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentBlueprintConfigurationsInput,
  output: ListEnvironmentBlueprintConfigurationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentBlueprintConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentBlueprintsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists blueprints in an Amazon DataZone environment.
 */
export const listEnvironmentBlueprints: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintsInput,
  ListEnvironmentBlueprintsOutput,
  ListEnvironmentBlueprintsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentBlueprintsInput,
  output: ListEnvironmentBlueprintsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentBlueprints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone environment profiles.
 */
export const listEnvironmentProfiles: API.PaginatedOperationMethod<
  ListEnvironmentProfilesInput,
  ListEnvironmentProfilesOutput,
  ListEnvironmentProfilesError,
  Credentials | HttpClient.HttpClient,
  EnvironmentProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentProfilesInput,
  output: ListEnvironmentProfilesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists Amazon DataZone environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsInput,
  output: ListEnvironmentsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists job runs.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsInput,
  ListJobRunsOutput,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobRunsInput,
  output: ListJobRunsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLineageEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists lineage events.
 */
export const listLineageEvents: API.PaginatedOperationMethod<
  ListLineageEventsInput,
  ListLineageEventsOutput,
  ListLineageEventsError,
  Credentials | HttpClient.HttpClient,
  LineageEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLineageEventsInput,
  output: ListLineageEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLineageEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLineageNodeHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the history of the specified data lineage node.
 */
export const listLineageNodeHistory: API.PaginatedOperationMethod<
  ListLineageNodeHistoryInput,
  ListLineageNodeHistoryOutput,
  ListLineageNodeHistoryError,
  Credentials | HttpClient.HttpClient,
  LineageNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLineageNodeHistoryInput,
  output: ListLineageNodeHistoryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLineageNodeHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetadataGenerationRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all metadata generation runs.
 *
 * Metadata generation runs represent automated processes that leverage AI/ML capabilities to create or enhance asset metadata at scale. This feature helps organizations maintain comprehensive and consistent metadata across large numbers of assets without manual intervention. It can automatically generate business descriptions, tags, and other metadata elements, significantly reducing the time and effort required for metadata management while improving consistency and completeness.
 *
 * Prerequisites:
 *
 * - Valid domain identifier.
 *
 * - User must have access to metadata generation runs in the domain.
 */
export const listMetadataGenerationRuns: API.PaginatedOperationMethod<
  ListMetadataGenerationRunsInput,
  ListMetadataGenerationRunsOutput,
  ListMetadataGenerationRunsError,
  Credentials | HttpClient.HttpClient,
  MetadataGenerationRunItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetadataGenerationRunsInput,
  output: ListMetadataGenerationRunsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetadataGenerationRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotebookRunsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists notebook runs in Amazon SageMaker Unified Studio.
 */
export const listNotebookRuns: API.PaginatedOperationMethod<
  ListNotebookRunsInput,
  ListNotebookRunsOutput,
  ListNotebookRunsError,
  Credentials | HttpClient.HttpClient,
  NotebookRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotebookRunsInput,
  output: ListNotebookRunsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotebooksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists notebooks in Amazon SageMaker Unified Studio.
 */
export const listNotebooks: API.PaginatedOperationMethod<
  ListNotebooksInput,
  ListNotebooksOutput,
  ListNotebooksError,
  Credentials | HttpClient.HttpClient,
  NotebookSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotebooksInput,
  output: ListNotebooksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebooks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon DataZone notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsInput,
  ListNotificationsOutput,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  NotificationOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationsInput,
  output: ListNotificationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notifications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists policy grants.
 */
export const listPolicyGrants: API.PaginatedOperationMethod<
  ListPolicyGrantsInput,
  ListPolicyGrantsOutput,
  ListPolicyGrantsError,
  Credentials | HttpClient.HttpClient,
  PolicyGrantMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyGrantsInput,
  output: ListPolicyGrantsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyGrants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "grantList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectMembershipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all members of the specified project.
 */
export const listProjectMemberships: API.PaginatedOperationMethod<
  ListProjectMembershipsInput,
  ListProjectMembershipsOutput,
  ListProjectMembershipsError,
  Credentials | HttpClient.HttpClient,
  ProjectMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectMembershipsInput,
  output: ListProjectMembershipsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists project profiles.
 */
export const listProjectProfiles: API.PaginatedOperationMethod<
  ListProjectProfilesInput,
  ListProjectProfilesOutput,
  ListProjectProfilesError,
  Credentials | HttpClient.HttpClient,
  ProjectProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectProfilesInput,
  output: ListProjectProfilesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists Amazon DataZone projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsInput,
  output: ListProjectsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing rules. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesInput,
  ListRulesOutput,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRulesInput,
  output: ListRulesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscription grants.
 */
export const listSubscriptionGrants: API.PaginatedOperationMethod<
  ListSubscriptionGrantsInput,
  ListSubscriptionGrantsOutput,
  ListSubscriptionGrantsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionGrantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionGrantsInput,
  output: ListSubscriptionGrantsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionGrants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone subscription requests.
 */
export const listSubscriptionRequests: API.PaginatedOperationMethod<
  ListSubscriptionRequestsInput,
  ListSubscriptionRequestsOutput,
  ListSubscriptionRequestsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionRequestsInput,
  output: ListSubscriptionRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscriptions in Amazon DataZone.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsInput,
  output: ListSubscriptionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscription targets in Amazon DataZone.
 */
export const listSubscriptionTargets: API.PaginatedOperationMethod<
  ListSubscriptionTargetsInput,
  ListSubscriptionTargetsOutput,
  ListSubscriptionTargetsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionTargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionTargetsInput,
  output: ListSubscriptionTargetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for the specified resource in Amazon DataZone.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists time series data points.
 */
export const listTimeSeriesDataPoints: API.PaginatedOperationMethod<
  ListTimeSeriesDataPointsInput,
  ListTimeSeriesDataPointsOutput,
  ListTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesDataPointSummaryFormOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTimeSeriesDataPointsInput,
  output: ListTimeSeriesDataPointsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTimeSeriesDataPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PostLineageEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Posts a data lineage event.
 */
export const postLineageEvent: API.OperationMethod<
  PostLineageEventInput,
  PostLineageEventOutput,
  PostLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostLineageEventInput,
  output: PostLineageEventOutput,
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
  operationName: "PostLineageEvent",
}));

export type PostTimeSeriesDataPointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Posts time series data points to Amazon DataZone for the specified asset.
 */
export const postTimeSeriesDataPoints: API.OperationMethod<
  PostTimeSeriesDataPointsInput,
  PostTimeSeriesDataPointsOutput,
  PostTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostTimeSeriesDataPointsInput,
  output: PostTimeSeriesDataPointsOutput,
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
  operationName: "PostTimeSeriesDataPoints",
}));

export type PutDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates data export configuration details.
 *
 * If you want to temporarily disable export and later re-enable it for the same domain, use the `--no-enable-export` flag to disable and the `--enable-export` flag to re-enable. This preserves the configuration and allows you to re-enable export without deleting S3 table.
 *
 * You can enable asset metadata export for only one domain per account per Region. To enable export for a different domain, complete the following steps:
 *
 * - Delete the export configuration for the currently enabled domain using the DeleteDataExportConfiguration operation.
 *
 * - Delete the asset S3 table under the aws-sagemaker-catalog S3 table bucket. We recommend backing up the S3 table before deletion.
 *
 * - Call the PutDataExportConfiguration API to enable export for the new domain.
 */
export const putDataExportConfiguration: API.OperationMethod<
  PutDataExportConfigurationInput,
  PutDataExportConfigurationOutput,
  PutDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDataExportConfigurationInput,
  output: PutDataExportConfigurationOutput,
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
  operationName: "PutDataExportConfiguration",
}));

export type PutEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Writes the configuration for the specified environment blueprint in Amazon DataZone.
 */
export const putEnvironmentBlueprintConfiguration: API.OperationMethod<
  PutEnvironmentBlueprintConfigurationInput,
  PutEnvironmentBlueprintConfigurationOutput,
  PutEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEnvironmentBlueprintConfigurationInput,
  output: PutEnvironmentBlueprintConfigurationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEnvironmentBlueprintConfiguration",
}));

export type QueryGraphError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries entities in the graph store.
 */
export const queryGraph: API.PaginatedOperationMethod<
  QueryGraphInput,
  QueryGraphOutput,
  QueryGraphError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: QueryGraphInput,
  output: QueryGraphOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryGraph",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RejectPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const rejectPredictions: API.OperationMethod<
  RejectPredictionsInput,
  RejectPredictionsOutput,
  RejectPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectPredictionsInput,
  output: RejectPredictionsOutput,
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
  operationName: "RejectPredictions",
}));

export type RejectSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the specified subscription request.
 */
export const rejectSubscriptionRequest: API.OperationMethod<
  RejectSubscriptionRequestInput,
  RejectSubscriptionRequestOutput,
  RejectSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectSubscriptionRequestInput,
  output: RejectSubscriptionRequestOutput,
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
  operationName: "RejectSubscriptionRequest",
}));

export type RemoveEntityOwnerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an owner from an entity.
 */
export const removeEntityOwner: API.OperationMethod<
  RemoveEntityOwnerInput,
  RemoveEntityOwnerOutput,
  RemoveEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveEntityOwnerInput,
  output: RemoveEntityOwnerOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveEntityOwner",
}));

export type RemovePolicyGrantError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a policy grant.
 */
export const removePolicyGrant: API.OperationMethod<
  RemovePolicyGrantInput,
  RemovePolicyGrantOutput,
  RemovePolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemovePolicyGrantInput,
  output: RemovePolicyGrantOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePolicyGrant",
}));

export type RevokeSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes a specified subscription in Amazon DataZone.
 */
export const revokeSubscription: API.OperationMethod<
  RevokeSubscriptionInput,
  RevokeSubscriptionOutput,
  RevokeSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeSubscriptionInput,
  output: RevokeSubscriptionOutput,
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
  operationName: "RevokeSubscription",
}));

export type SearchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for assets in Amazon DataZone.
 *
 * Search in Amazon DataZone is a powerful capability that enables users to discover and explore data assets, glossary terms, and data products across their organization. It provides both basic and advanced search functionality, allowing users to find resources based on names, descriptions, metadata, and other attributes. Search can be scoped to specific types of resources (like assets, glossary terms, or data products) and can be filtered using various criteria such as creation date, owner, or status. The search functionality is essential for making the wealth of data resources in an organization discoverable and usable, helping users find the right data for their needs quickly and efficiently.
 *
 * Many search commands in Amazon DataZone are paginated, including `search` and `search-types`. When the result set is large, Amazon DataZone returns a `nextToken` in the response. This token can be used to retrieve the next page of results.
 *
 * Prerequisites:
 *
 * - The --domain-identifier must refer to an existing Amazon DataZone domain.
 *
 * - --search-scope must be one of: ASSET, GLOSSARY_TERM, DATA_PRODUCT, or GLOSSARY.
 *
 * - The user must have search permissions in the specified domain.
 *
 * - If using --filters, ensure that the JSON is well-formed and that each filter includes valid attribute and value keys.
 *
 * - For paginated results, be prepared to use --next-token to fetch additional pages.
 *
 * To run a standard free-text search, the `searchText` parameter must be supplied. By default, all searchable fields are indexed for semantic search and will return semantic matches for SearchListings queries. To prevent semantic search indexing for a custom form attribute, see the CreateFormType API documentation. To run a lexical search query, enclose the query with double quotes (""). This will disable semantic search even for fields that have semantic search enabled and will only return results that contain the keywords wrapped by double quotes (order of tokens in the query is not enforced). Free-text search is supported for all attributes annotated with @amazon.datazone#searchable.
 *
 * To run a filtered search, provide filter clause using the `filters` parameter. To filter on glossary terms, use the special attribute `__DataZoneGlossaryTerms`. To filter on an indexed numeric attribute (i.e., a numeric attribute annotated with `@amazon.datazone#sortable`), provide a filter using the `intValue` parameter. The filters parameter can also be used to run more advanced free-text searches that target specific attributes (attributes must be annotated with `@amazon.datazone#searchable` for free-text search). Create/update timestamp filtering is supported using the special `creationTime`/`lastUpdatedTime` attributes. Filter types can be mixed and matched to power complex queries.
 *
 * To find out whether an attribute has been annotated and indexed for a given search type, use the GetFormType API to retrieve the form containing the attribute.
 */
export const search: API.PaginatedOperationMethod<
  SearchInput,
  SearchOutput,
  SearchError,
  Credentials | HttpClient.HttpClient,
  SearchInventoryResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchInput,
  output: SearchOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchGroupProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches group profiles in Amazon DataZone.
 */
export const searchGroupProfiles: API.PaginatedOperationMethod<
  SearchGroupProfilesInput,
  SearchGroupProfilesOutput,
  SearchGroupProfilesError,
  Credentials | HttpClient.HttpClient,
  GroupProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchGroupProfilesInput,
  output: SearchGroupProfilesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGroupProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchListingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches listings in Amazon DataZone.
 *
 * SearchListings is a powerful capability that enables users to discover and explore published assets and data products across their organization. It provides both basic and advanced search functionality, allowing users to find resources based on names, descriptions, metadata, and other attributes. SearchListings also supports filtering using various criteria such as creation date, owner, or status. This API is essential for making the wealth of data resources in an organization discoverable and usable, helping users find the right data for their needs quickly and efficiently.
 *
 * SearchListings returns results in a paginated format. When the result set is large, the response will include a nextToken, which can be used to retrieve the next page of results.
 *
 * The SearchListings API gives users flexibility in specifying what kind of search is run.
 *
 * To run a standard free-text search, the `searchText` parameter must be supplied. By default, all searchable fields are indexed for semantic search and will return semantic matches for SearchListings queries. To prevent semantic search indexing for a custom form attribute, see the CreateFormType API documentation. To run a lexical search query, enclose the query with double quotes (""). This will disable semantic search even for fields that have semantic search enabled and will only return results that contain the keywords wrapped by double quotes (order of tokens in the query is not enforced). Free-text search is supported for all attributes annotated with @amazon.datazone#searchable.
 *
 * To run a filtered search, provide filter clause using the `filters` parameter. To filter on glossary terms, use the special attribute `__DataZoneGlossaryTerms`. To filter on an indexed numeric attribute (i.e., a numeric attribute annotated with `@amazon.datazone#sortable`), provide a filter using the `intValue` parameter. The filters parameter can also be used to run more advanced free-text searches that target specific attributes (attributes must be annotated with `@amazon.datazone#searchable` for free-text search). Create/update timestamp filtering is supported using the special `creationTime`/`lastUpdatedTime` attributes. Filter types can be mixed and matched to power complex queries.
 *
 * To find out whether an attribute has been annotated and indexed for a given search type, use the GetFormType API to retrieve the form containing the attribute.
 */
export const searchListings: API.PaginatedOperationMethod<
  SearchListingsInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  SearchResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchListingsInput,
  output: SearchListingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchListings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for types in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The --domain-identifier must refer to an existing Amazon DataZone domain.
 *
 * - --search-scope must be one of the valid values including: ASSET_TYPE, GLOSSARY_TERM_TYPE, DATA_PRODUCT_TYPE.
 *
 * - The --managed flag must be present without a value.
 *
 * - The user must have permissions for form or asset types in the domain.
 *
 * - If using --filters, ensure that the JSON is valid.
 *
 * - Filters contain correct structure (attribute, value, operator).
 */
export const searchTypes: API.PaginatedOperationMethod<
  SearchTypesInput,
  SearchTypesOutput,
  SearchTypesError,
  Credentials | HttpClient.HttpClient,
  SearchTypesResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchTypesInput,
  output: SearchTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchUserProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches user profiles in Amazon DataZone.
 */
export const searchUserProfiles: API.PaginatedOperationMethod<
  SearchUserProfilesInput,
  SearchUserProfilesOutput,
  SearchUserProfilesError,
  Credentials | HttpClient.HttpClient,
  UserProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchUserProfilesInput,
  output: SearchUserProfilesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUserProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start the run of the specified data source in Amazon DataZone.
 */
export const startDataSourceRun: API.OperationMethod<
  StartDataSourceRunInput,
  StartDataSourceRunOutput,
  StartDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataSourceRunInput,
  output: StartDataSourceRunOutput,
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
  operationName: "StartDataSourceRun",
}));

export type StartMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the metadata generation run.
 *
 * Prerequisites:
 *
 * - Asset must be created and belong to the specified domain and project.
 *
 * - Asset type must be supported for metadata generation (e.g., Amazon Web Services Glue table).
 *
 * - Asset must have a structured schema with valid rows and columns.
 *
 * - Valid values for --type: BUSINESS_DESCRIPTIONS, BUSINESS_NAMES, BUSINESS_GLOSSARY_ASSOCIATIONS.
 *
 * - The user must have permission to run metadata generation in the domain/project.
 */
export const startMetadataGenerationRun: API.OperationMethod<
  StartMetadataGenerationRunInput,
  StartMetadataGenerationRunOutput,
  StartMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataGenerationRunInput,
  output: StartMetadataGenerationRunOutput,
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
  operationName: "StartMetadataGenerationRun",
}));

export type StartNotebookExportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook export in Amazon SageMaker Unified Studio. This operation exports a notebook to a specified file format and stores the output in Amazon Simple Storage Service.
 */
export const startNotebookExport: API.OperationMethod<
  StartNotebookExportInput,
  StartNotebookExportOutput,
  StartNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNotebookExportInput,
  output: StartNotebookExportOutput,
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
  operationName: "StartNotebookExport",
}));

export type StartNotebookImportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook import in Amazon SageMaker Unified Studio. This operation imports a notebook from an Amazon Simple Storage Service location into a project.
 */
export const startNotebookImport: API.OperationMethod<
  StartNotebookImportInput,
  StartNotebookImportOutput,
  StartNotebookImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNotebookImportInput,
  output: StartNotebookImportOutput,
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
  operationName: "StartNotebookImport",
}));

export type StartNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook run in Amazon SageMaker Unified Studio. A notebook run represents the execution of an Amazon SageMaker notebook within a project. You can configure compute, network, timeout, and environment settings for the run.
 */
export const startNotebookRun: API.OperationMethod<
  StartNotebookRunInput,
  StartNotebookRunOutput,
  StartNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartNotebookRunInput,
  output: StartNotebookRunOutput,
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
  operationName: "StartNotebookRun",
}));

export type StopNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running notebook run in Amazon SageMaker Unified Studio.
 */
export const stopNotebookRun: API.OperationMethod<
  StopNotebookRunInput,
  StopNotebookRunOutput,
  StopNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopNotebookRunInput,
  output: StopNotebookRunOutput,
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
  operationName: "StopNotebookRun",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource in Amazon DataZone.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Untags a resource in Amazon DataZone.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account pool.
 */
export const updateAccountPool: API.OperationMethod<
  UpdateAccountPoolInput,
  UpdateAccountPoolOutput,
  UpdateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountPoolInput,
  output: UpdateAccountPoolOutput,
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
  operationName: "UpdateAccountPool",
}));

export type UpdateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an asset filter.
 *
 * Prerequisites:
 *
 * - The domain, asset, and asset filter identifier must all exist.
 *
 * - The asset must contain the columns being referenced in the update.
 *
 * - If applying a row filter, ensure the column referenced in the expression exists in the asset schema.
 */
export const updateAssetFilter: API.OperationMethod<
  UpdateAssetFilterInput,
  UpdateAssetFilterOutput,
  UpdateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetFilterInput,
  output: UpdateAssetFilterOutput,
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
  operationName: "UpdateAssetFilter",
}));

export type UpdateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionInput,
  UpdateConnectionOutput,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionInput,
  output: UpdateConnectionOutput,
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
  operationName: "UpdateConnection",
}));

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified data source in Amazon DataZone.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceInput,
  UpdateDataSourceOutput,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataSourceInput,
  output: UpdateDataSourceOutput,
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
  operationName: "UpdateDataSource",
}));

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Amazon DataZone domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainInput,
  UpdateDomainOutput,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainInput,
  output: UpdateDomainOutput,
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
  operationName: "UpdateDomain",
}));

export type UpdateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the domain unit.
 */
export const updateDomainUnit: API.OperationMethod<
  UpdateDomainUnitInput,
  UpdateDomainUnitOutput,
  UpdateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainUnitInput,
  output: UpdateDomainUnitOutput,
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
  operationName: "UpdateDomainUnit",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified environment in Amazon DataZone.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentInput,
  output: UpdateEnvironmentOutput,
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
  operationName: "UpdateEnvironment",
}));

export type UpdateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment action.
 */
export const updateEnvironmentAction: API.OperationMethod<
  UpdateEnvironmentActionInput,
  UpdateEnvironmentActionOutput,
  UpdateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentActionInput,
  output: UpdateEnvironmentActionOutput,
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
  operationName: "UpdateEnvironmentAction",
}));

export type UpdateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment blueprint in Amazon DataZone.
 */
export const updateEnvironmentBlueprint: API.OperationMethod<
  UpdateEnvironmentBlueprintInput,
  UpdateEnvironmentBlueprintOutput,
  UpdateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentBlueprintInput,
  output: UpdateEnvironmentBlueprintOutput,
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
  operationName: "UpdateEnvironmentBlueprint",
}));

export type UpdateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified environment profile in Amazon DataZone.
 */
export const updateEnvironmentProfile: API.OperationMethod<
  UpdateEnvironmentProfileInput,
  UpdateEnvironmentProfileOutput,
  UpdateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentProfileInput,
  output: UpdateEnvironmentProfileOutput,
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
  operationName: "UpdateEnvironmentProfile",
}));

export type UpdateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The glossary must exist in the given domain.
 *
 * - The caller must have the `datazone:UpdateGlossary` permission to update it.
 *
 * - When updating the name, the new name must be unique within the domain.
 *
 * - The glossary must not be deleted or in a terminal state.
 */
export const updateGlossary: API.OperationMethod<
  UpdateGlossaryInput,
  UpdateGlossaryOutput,
  UpdateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlossaryInput,
  output: UpdateGlossaryOutput,
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
  operationName: "UpdateGlossary",
}));

export type UpdateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term must exist in the specified domain.
 *
 * - New name must not conflict with existing terms in the same glossary.
 *
 * - User must have permissions on the term.
 *
 * - The term must not be in DELETED status.
 */
export const updateGlossaryTerm: API.OperationMethod<
  UpdateGlossaryTermInput,
  UpdateGlossaryTermOutput,
  UpdateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlossaryTermInput,
  output: UpdateGlossaryTermOutput,
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
  operationName: "UpdateGlossaryTerm",
}));

export type UpdateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified group profile in Amazon DataZone.
 */
export const updateGroupProfile: API.OperationMethod<
  UpdateGroupProfileInput,
  UpdateGroupProfileOutput,
  UpdateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupProfileInput,
  output: UpdateGroupProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupProfile",
}));

export type UpdateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a notebook in Amazon SageMaker Unified Studio.
 */
export const updateNotebook: API.OperationMethod<
  UpdateNotebookInput,
  UpdateNotebookOutput,
  UpdateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotebookInput,
  output: UpdateNotebookOutput,
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
  operationName: "UpdateNotebook",
}));

export type UpdateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified project in Amazon DataZone.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectInput,
  output: UpdateProjectOutput,
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
  operationName: "UpdateProject",
}));

export type UpdateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a project profile.
 */
export const updateProjectProfile: API.OperationMethod<
  UpdateProjectProfileInput,
  UpdateProjectProfileOutput,
  UpdateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectProfileInput,
  output: UpdateProjectProfileOutput,
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
  operationName: "UpdateProjectProfile",
}));

export type UpdateRootDomainUnitOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the owner of the root domain unit.
 */
export const updateRootDomainUnitOwner: API.OperationMethod<
  UpdateRootDomainUnitOwnerInput,
  UpdateRootDomainUnitOwnerOutput,
  UpdateRootDomainUnitOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRootDomainUnitOwnerInput,
  output: UpdateRootDomainUnitOwnerOutput,
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
  operationName: "UpdateRootDomainUnitOwner",
}));

export type UpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleInput,
  UpdateRuleOutput,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleInput,
  output: UpdateRuleOutput,
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
  operationName: "UpdateRule",
}));

export type UpdateSubscriptionGrantStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of the specified subscription grant status in Amazon DataZone.
 */
export const updateSubscriptionGrantStatus: API.OperationMethod<
  UpdateSubscriptionGrantStatusInput,
  UpdateSubscriptionGrantStatusOutput,
  UpdateSubscriptionGrantStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionGrantStatusInput,
  output: UpdateSubscriptionGrantStatusOutput,
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
  operationName: "UpdateSubscriptionGrantStatus",
}));

export type UpdateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified subscription request in Amazon DataZone.
 */
export const updateSubscriptionRequest: API.OperationMethod<
  UpdateSubscriptionRequestInput,
  UpdateSubscriptionRequestOutput,
  UpdateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionRequestInput,
  output: UpdateSubscriptionRequestOutput,
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
  operationName: "UpdateSubscriptionRequest",
}));

export type UpdateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified subscription target in Amazon DataZone.
 */
export const updateSubscriptionTarget: API.OperationMethod<
  UpdateSubscriptionTargetInput,
  UpdateSubscriptionTargetOutput,
  UpdateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionTargetInput,
  output: UpdateSubscriptionTargetOutput,
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
  operationName: "UpdateSubscriptionTarget",
}));

export type UpdateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified user profile in Amazon DataZone.
 */
export const updateUserProfile: API.OperationMethod<
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
  UpdateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserProfileInput,
  output: UpdateUserProfileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProfile",
}));
