import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Service Catalog",
  serviceShapeName: "AWS242ServiceCatalogService",
});
const auth = T.AwsAuthSigv4({ name: "servicecatalog" });
const ver = T.ServiceVersion("2015-12-10");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://servicecatalog-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://servicecatalog-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DuplicateResourceException
  extends /*@__PURE__*/ S.TaggedError<DuplicateResourceException>()(
    "DuplicateResourceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidParametersException>()(
    "InvalidParametersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ProvisionedProductNotFound
  extends /*@__PURE__*/ S.TaggedError<ProvisionedProductNotFound>()(
    "ProvisionedProductNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Provisioned product not found" },
    }),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagOptionNotMigratedException
  extends /*@__PURE__*/ S.TaggedError<TagOptionNotMigratedException>()(
    "TagOptionNotMigratedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type AcceptLanguage = string;
export type Id = string;
export type PortfolioShareType =
  | "IMPORTED"
  | "AWS_SERVICECATALOG"
  | "AWS_ORGANIZATIONS"
  | (string & {});
export const PortfolioShareType = /*@__PURE__*/ S.String;

export interface AcceptPortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PortfolioShareType?: PortfolioShareType;
}
export const AcceptPortfolioShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    PortfolioShareType: S.optional(PortfolioShareType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptPortfolioShareInput",
}) as any as S.Schema<AcceptPortfolioShareInput>;
export interface AcceptPortfolioShareOutput {}
export const AcceptPortfolioShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptPortfolioShareOutput",
}) as any as S.Schema<AcceptPortfolioShareOutput>;
export type BudgetName = string;
export interface AssociateBudgetWithResourceInput {
  BudgetName: string;
  ResourceId: string;
}
export const AssociateBudgetWithResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BudgetName: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateBudgetWithResourceInput",
}) as any as S.Schema<AssociateBudgetWithResourceInput>;
export interface AssociateBudgetWithResourceOutput {}
export const AssociateBudgetWithResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateBudgetWithResourceOutput",
}) as any as S.Schema<AssociateBudgetWithResourceOutput>;
export type PrincipalARN = string;
export type PrincipalType = "IAM" | "IAM_PATTERN" | (string & {});
export const PrincipalType = /*@__PURE__*/ S.String;

export interface AssociatePrincipalWithPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PrincipalARN: string;
  PrincipalType: PrincipalType;
}
export const AssociatePrincipalWithPortfolioInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      PortfolioId: S.String,
      PrincipalARN: S.String,
      PrincipalType: PrincipalType,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociatePrincipalWithPortfolioInput",
}) as any as S.Schema<AssociatePrincipalWithPortfolioInput>;
export interface AssociatePrincipalWithPortfolioOutput {}
export const AssociatePrincipalWithPortfolioOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociatePrincipalWithPortfolioOutput",
}) as any as S.Schema<AssociatePrincipalWithPortfolioOutput>;
export interface AssociateProductWithPortfolioInput {
  AcceptLanguage?: string;
  ProductId: string;
  PortfolioId: string;
  SourcePortfolioId?: string;
}
export const AssociateProductWithPortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    PortfolioId: S.String,
    SourcePortfolioId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateProductWithPortfolioInput",
}) as any as S.Schema<AssociateProductWithPortfolioInput>;
export interface AssociateProductWithPortfolioOutput {}
export const AssociateProductWithPortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateProductWithPortfolioOutput",
}) as any as S.Schema<AssociateProductWithPortfolioOutput>;
export type IdempotencyToken = string;
export interface AssociateServiceActionWithProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export const AssociateServiceActionWithProvisioningArtifactInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProductId: S.String,
      ProvisioningArtifactId: S.String,
      ServiceActionId: S.String,
      AcceptLanguage: S.optional(S.String),
      IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AssociateServiceActionWithProvisioningArtifactInput",
  }) as any as S.Schema<AssociateServiceActionWithProvisioningArtifactInput>;
export interface AssociateServiceActionWithProvisioningArtifactOutput {}
export const AssociateServiceActionWithProvisioningArtifactOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "AssociateServiceActionWithProvisioningArtifactOutput",
  }) as any as S.Schema<AssociateServiceActionWithProvisioningArtifactOutput>;
export type ResourceId = string;
export type TagOptionId = string;
export interface AssociateTagOptionWithResourceInput {
  ResourceId: string;
  TagOptionId: string;
}
export const AssociateTagOptionWithResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagOptionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateTagOptionWithResourceInput",
}) as any as S.Schema<AssociateTagOptionWithResourceInput>;
export interface AssociateTagOptionWithResourceOutput {}
export const AssociateTagOptionWithResourceOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateTagOptionWithResourceOutput",
}) as any as S.Schema<AssociateTagOptionWithResourceOutput>;
export interface ServiceActionAssociation {
  ServiceActionId: string;
  ProductId: string;
  ProvisioningArtifactId: string;
}
export const ServiceActionAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceActionId: S.String,
    ProductId: S.String,
    ProvisioningArtifactId: S.String,
  }),
).annotate({
  identifier: "ServiceActionAssociation",
}) as any as S.Schema<ServiceActionAssociation>;
export type ServiceActionAssociations = ServiceActionAssociation[];
export const ServiceActionAssociations = /*@__PURE__*/ S.Array(
  ServiceActionAssociation,
);
export interface BatchAssociateServiceActionWithProvisioningArtifactInput {
  ServiceActionAssociations: ServiceActionAssociation[];
  AcceptLanguage?: string;
}
export const BatchAssociateServiceActionWithProvisioningArtifactInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceActionAssociations: ServiceActionAssociations,
      AcceptLanguage: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "BatchAssociateServiceActionWithProvisioningArtifactInput",
  }) as any as S.Schema<BatchAssociateServiceActionWithProvisioningArtifactInput>;
export type ServiceActionAssociationErrorCode =
  | "DUPLICATE_RESOURCE"
  | "INTERNAL_FAILURE"
  | "LIMIT_EXCEEDED"
  | "RESOURCE_NOT_FOUND"
  | "THROTTLING"
  | "INVALID_PARAMETER"
  | (string & {});
export const ServiceActionAssociationErrorCode = /*@__PURE__*/ S.String;

export type ServiceActionAssociationErrorMessage = string;
export interface FailedServiceActionAssociation {
  ServiceActionId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  ErrorCode?: ServiceActionAssociationErrorCode;
  ErrorMessage?: string;
}
export const FailedServiceActionAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceActionId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ErrorCode: S.optional(ServiceActionAssociationErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedServiceActionAssociation",
}) as any as S.Schema<FailedServiceActionAssociation>;
export type FailedServiceActionAssociations = FailedServiceActionAssociation[];
export const FailedServiceActionAssociations = /*@__PURE__*/ S.Array(
  FailedServiceActionAssociation,
);
export interface BatchAssociateServiceActionWithProvisioningArtifactOutput {
  FailedServiceActionAssociations?: FailedServiceActionAssociation[];
}
export const BatchAssociateServiceActionWithProvisioningArtifactOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FailedServiceActionAssociations: S.optional(
        FailedServiceActionAssociations,
      ),
    }),
  ).annotate({
    identifier: "BatchAssociateServiceActionWithProvisioningArtifactOutput",
  }) as any as S.Schema<BatchAssociateServiceActionWithProvisioningArtifactOutput>;
export interface BatchDisassociateServiceActionFromProvisioningArtifactInput {
  ServiceActionAssociations: ServiceActionAssociation[];
  AcceptLanguage?: string;
}
export const BatchDisassociateServiceActionFromProvisioningArtifactInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceActionAssociations: ServiceActionAssociations,
      AcceptLanguage: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "BatchDisassociateServiceActionFromProvisioningArtifactInput",
  }) as any as S.Schema<BatchDisassociateServiceActionFromProvisioningArtifactInput>;
export interface BatchDisassociateServiceActionFromProvisioningArtifactOutput {
  FailedServiceActionAssociations?: FailedServiceActionAssociation[];
}
export const BatchDisassociateServiceActionFromProvisioningArtifactOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FailedServiceActionAssociations: S.optional(
        FailedServiceActionAssociations,
      ),
    }),
  ).annotate({
    identifier: "BatchDisassociateServiceActionFromProvisioningArtifactOutput",
  }) as any as S.Schema<BatchDisassociateServiceActionFromProvisioningArtifactOutput>;
export type ProductArn = string;
export type ProductViewName = string;
export type ProvisioningArtifactPropertyName = "Id" | (string & {});
export const ProvisioningArtifactPropertyName = /*@__PURE__*/ S.String;

export type ProvisioningArtifactPropertyValue = string;
export type SourceProvisioningArtifactPropertiesMap = {
  [key in ProvisioningArtifactPropertyName]?: string;
};
export const SourceProvisioningArtifactPropertiesMap = /*@__PURE__*/ S.Record(
  ProvisioningArtifactPropertyName,
  S.String.pipe(S.optional),
);
export type SourceProvisioningArtifactProperties = {
  [key: string]: string | undefined;
}[];
export const SourceProvisioningArtifactProperties = /*@__PURE__*/ S.Array(
  SourceProvisioningArtifactPropertiesMap,
);
export type CopyOption = "CopyTags" | (string & {});
export const CopyOption = /*@__PURE__*/ S.String;

export type CopyOptions = CopyOption[];
export const CopyOptions = /*@__PURE__*/ S.Array(CopyOption);
export interface CopyProductInput {
  AcceptLanguage?: string;
  SourceProductArn: string;
  TargetProductId?: string;
  TargetProductName?: string;
  SourceProvisioningArtifactIdentifiers?: {
    [key: string]: string | undefined;
  }[];
  CopyOptions?: CopyOption[];
  IdempotencyToken: string;
}
export const CopyProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    SourceProductArn: S.String,
    TargetProductId: S.optional(S.String),
    TargetProductName: S.optional(S.String),
    SourceProvisioningArtifactIdentifiers: S.optional(
      SourceProvisioningArtifactProperties,
    ),
    CopyOptions: S.optional(CopyOptions),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopyProductInput",
}) as any as S.Schema<CopyProductInput>;
export interface CopyProductOutput {
  CopyProductToken?: string;
}
export const CopyProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CopyProductToken: S.optional(S.String) }),
).annotate({
  identifier: "CopyProductOutput",
}) as any as S.Schema<CopyProductOutput>;
export type ConstraintParameters = string;
export type ConstraintType = string;
export type ConstraintDescription = string;
export interface CreateConstraintInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  ProductId: string;
  Parameters: string;
  Type: string;
  Description?: string;
  IdempotencyToken: string;
}
export const CreateConstraintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    ProductId: S.String,
    Parameters: S.String,
    Type: S.String,
    Description: S.optional(S.String),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConstraintInput",
}) as any as S.Schema<CreateConstraintInput>;
export type AccountId = string;
export interface ConstraintDetail {
  ConstraintId?: string;
  Type?: string;
  Description?: string;
  Owner?: string;
  ProductId?: string;
  PortfolioId?: string;
}
export const ConstraintDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstraintId: S.optional(S.String),
    Type: S.optional(S.String),
    Description: S.optional(S.String),
    Owner: S.optional(S.String),
    ProductId: S.optional(S.String),
    PortfolioId: S.optional(S.String),
  }),
).annotate({
  identifier: "ConstraintDetail",
}) as any as S.Schema<ConstraintDetail>;
export type Status = "AVAILABLE" | "CREATING" | "FAILED" | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface CreateConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export const CreateConstraintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstraintDetail: S.optional(ConstraintDetail),
    ConstraintParameters: S.optional(S.String),
    Status: S.optional(Status),
  }),
).annotate({
  identifier: "CreateConstraintOutput",
}) as any as S.Schema<CreateConstraintOutput>;
export type PortfolioDisplayName = string;
export type PortfolioDescription = string;
export type ProviderName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type AddTags = Tag[];
export const AddTags = /*@__PURE__*/ S.Array(Tag);
export interface CreatePortfolioInput {
  AcceptLanguage?: string;
  DisplayName: string;
  Description?: string;
  ProviderName: string;
  Tags?: Tag[];
  IdempotencyToken: string;
}
export const CreatePortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    DisplayName: S.String,
    Description: S.optional(S.String),
    ProviderName: S.String,
    Tags: S.optional(AddTags),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePortfolioInput",
}) as any as S.Schema<CreatePortfolioInput>;
export type ResourceARN = string;
export type CreationTime = Date;
export interface PortfolioDetail {
  Id?: string;
  ARN?: string;
  DisplayName?: string;
  Description?: string;
  CreatedTime?: Date;
  ProviderName?: string;
}
export const PortfolioDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ARN: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProviderName: S.optional(S.String),
  }),
).annotate({
  identifier: "PortfolioDetail",
}) as any as S.Schema<PortfolioDetail>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreatePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
}
export const CreatePortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetail: S.optional(PortfolioDetail),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreatePortfolioOutput",
}) as any as S.Schema<CreatePortfolioOutput>;
export type OrganizationNodeType =
  | "ORGANIZATION"
  | "ORGANIZATIONAL_UNIT"
  | "ACCOUNT"
  | (string & {});
export const OrganizationNodeType = /*@__PURE__*/ S.String;

export type OrganizationNodeValue = string;
export interface OrganizationNode {
  Type?: OrganizationNodeType;
  Value?: string;
}
export const OrganizationNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(OrganizationNodeType),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "OrganizationNode",
}) as any as S.Schema<OrganizationNode>;
export interface CreatePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export const CreatePortfolioShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    AccountId: S.optional(S.String),
    OrganizationNode: S.optional(OrganizationNode),
    ShareTagOptions: S.optional(S.Boolean),
    SharePrincipals: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePortfolioShareInput",
}) as any as S.Schema<CreatePortfolioShareInput>;
export interface CreatePortfolioShareOutput {
  PortfolioShareToken?: string;
}
export const CreatePortfolioShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortfolioShareToken: S.optional(S.String) }),
).annotate({
  identifier: "CreatePortfolioShareOutput",
}) as any as S.Schema<CreatePortfolioShareOutput>;
export type ProductViewOwner = string;
export type ProductViewShortDescription = string;
export type SupportDescription = string;
export type SupportEmail = string;
export type SupportUrl = string;
export type ProductType =
  | "CLOUD_FORMATION_TEMPLATE"
  | "MARKETPLACE"
  | "TERRAFORM_OPEN_SOURCE"
  | "TERRAFORM_CLOUD"
  | "EXTERNAL"
  | (string & {});
export const ProductType = /*@__PURE__*/ S.String;

export type ProvisioningArtifactName = string;
export type ProvisioningArtifactDescription = string;
export type ProvisioningArtifactInfoKey = string;
export type ProvisioningArtifactInfoValue = string;
export type ProvisioningArtifactInfo = { [key: string]: string | undefined };
export const ProvisioningArtifactInfo = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ProvisioningArtifactType =
  | "CLOUD_FORMATION_TEMPLATE"
  | "MARKETPLACE_AMI"
  | "MARKETPLACE_CAR"
  | "TERRAFORM_OPEN_SOURCE"
  | "TERRAFORM_CLOUD"
  | "EXTERNAL"
  | (string & {});
export const ProvisioningArtifactType = /*@__PURE__*/ S.String;

export type DisableTemplateValidation = boolean;
export interface ProvisioningArtifactProperties {
  Name?: string;
  Description?: string;
  Info?: { [key: string]: string | undefined };
  Type?: ProvisioningArtifactType;
  DisableTemplateValidation?: boolean;
}
export const ProvisioningArtifactProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Info: S.optional(ProvisioningArtifactInfo),
    Type: S.optional(ProvisioningArtifactType),
    DisableTemplateValidation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ProvisioningArtifactProperties",
}) as any as S.Schema<ProvisioningArtifactProperties>;
export type SourceType = "CODESTAR" | (string & {});
export const SourceType = /*@__PURE__*/ S.String;

export type CodeStarConnectionArn = string;
export type Repository = string;
export type RepositoryBranch = string;
export type RepositoryArtifactPath = string;
export interface CodeStarParameters {
  ConnectionArn: string;
  Repository: string;
  Branch: string;
  ArtifactPath: string;
}
export const CodeStarParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionArn: S.String,
    Repository: S.String,
    Branch: S.String,
    ArtifactPath: S.String,
  }),
).annotate({
  identifier: "CodeStarParameters",
}) as any as S.Schema<CodeStarParameters>;
export interface SourceConnectionParameters {
  CodeStar?: CodeStarParameters;
}
export const SourceConnectionParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeStar: S.optional(CodeStarParameters) }),
).annotate({
  identifier: "SourceConnectionParameters",
}) as any as S.Schema<SourceConnectionParameters>;
export interface SourceConnection {
  Type?: SourceType;
  ConnectionParameters: SourceConnectionParameters;
}
export const SourceConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(SourceType),
    ConnectionParameters: SourceConnectionParameters,
  }),
).annotate({
  identifier: "SourceConnection",
}) as any as S.Schema<SourceConnection>;
export interface CreateProductInput {
  AcceptLanguage?: string;
  Name: string;
  Owner: string;
  Description?: string;
  Distributor?: string;
  SupportDescription?: string;
  SupportEmail?: string;
  SupportUrl?: string;
  ProductType: ProductType;
  Tags?: Tag[];
  ProvisioningArtifactParameters?: ProvisioningArtifactProperties;
  IdempotencyToken: string;
  SourceConnection?: SourceConnection;
}
export const CreateProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Name: S.String,
    Owner: S.String,
    Description: S.optional(S.String),
    Distributor: S.optional(S.String),
    SupportDescription: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportUrl: S.optional(S.String),
    ProductType: ProductType,
    Tags: S.optional(AddTags),
    ProvisioningArtifactParameters: S.optional(ProvisioningArtifactProperties),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    SourceConnection: S.optional(SourceConnection),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProductInput",
}) as any as S.Schema<CreateProductInput>;
export type ProductViewDistributor = string;
export type HasDefaultPath = boolean;
export interface ProductViewSummary {
  Id?: string;
  ProductId?: string;
  Name?: string;
  Owner?: string;
  ShortDescription?: string;
  Type?: ProductType;
  Distributor?: string;
  HasDefaultPath?: boolean;
  SupportEmail?: string;
  SupportDescription?: string;
  SupportUrl?: string;
}
export const ProductViewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ProductId: S.optional(S.String),
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    ShortDescription: S.optional(S.String),
    Type: S.optional(ProductType),
    Distributor: S.optional(S.String),
    HasDefaultPath: S.optional(S.Boolean),
    SupportEmail: S.optional(S.String),
    SupportDescription: S.optional(S.String),
    SupportUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ProductViewSummary",
}) as any as S.Schema<ProductViewSummary>;
export type CreatedTime = Date;
export type LastSyncTime = Date;
export type LastSyncStatus = "SUCCEEDED" | "FAILED" | (string & {});
export const LastSyncStatus = /*@__PURE__*/ S.String;

export type LastSyncStatusMessage = string;
export type LastSuccessfulSyncTime = Date;
export interface LastSync {
  LastSyncTime?: Date;
  LastSyncStatus?: LastSyncStatus;
  LastSyncStatusMessage?: string;
  LastSuccessfulSyncTime?: Date;
  LastSuccessfulSyncProvisioningArtifactId?: string;
}
export const LastSync = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastSyncStatus: S.optional(LastSyncStatus),
    LastSyncStatusMessage: S.optional(S.String),
    LastSuccessfulSyncTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessfulSyncProvisioningArtifactId: S.optional(S.String),
  }),
).annotate({ identifier: "LastSync" }) as any as S.Schema<LastSync>;
export interface SourceConnectionDetail {
  Type?: SourceType;
  ConnectionParameters?: SourceConnectionParameters;
  LastSync?: LastSync;
}
export const SourceConnectionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(SourceType),
    ConnectionParameters: S.optional(SourceConnectionParameters),
    LastSync: S.optional(LastSync),
  }),
).annotate({
  identifier: "SourceConnectionDetail",
}) as any as S.Schema<SourceConnectionDetail>;
export interface ProductViewDetail {
  ProductViewSummary?: ProductViewSummary;
  Status?: Status;
  ProductARN?: string;
  CreatedTime?: Date;
  SourceConnection?: SourceConnectionDetail;
}
export const ProductViewDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewSummary: S.optional(ProductViewSummary),
    Status: S.optional(Status),
    ProductARN: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SourceConnection: S.optional(SourceConnectionDetail),
  }),
).annotate({
  identifier: "ProductViewDetail",
}) as any as S.Schema<ProductViewDetail>;
export type ProvisioningArtifactActive = boolean;
export type ProvisioningArtifactGuidance =
  | "DEFAULT"
  | "DEPRECATED"
  | (string & {});
export const ProvisioningArtifactGuidance = /*@__PURE__*/ S.String;

export type SourceRevision = string;
export interface ProvisioningArtifactDetail {
  Id?: string;
  Name?: string;
  Description?: string;
  Type?: ProvisioningArtifactType;
  CreatedTime?: Date;
  Active?: boolean;
  Guidance?: ProvisioningArtifactGuidance;
  SourceRevision?: string;
}
export const ProvisioningArtifactDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(ProvisioningArtifactType),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Active: S.optional(S.Boolean),
    Guidance: S.optional(ProvisioningArtifactGuidance),
    SourceRevision: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisioningArtifactDetail",
}) as any as S.Schema<ProvisioningArtifactDetail>;
export interface CreateProductOutput {
  ProductViewDetail?: ProductViewDetail;
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Tags?: Tag[];
}
export const CreateProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewDetail: S.optional(ProductViewDetail),
    ProvisioningArtifactDetail: S.optional(ProvisioningArtifactDetail),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreateProductOutput",
}) as any as S.Schema<CreateProductOutput>;
export type ProvisionedProductPlanName = string;
export type ProvisionedProductPlanType = "CLOUDFORMATION" | (string & {});
export const ProvisionedProductPlanType = /*@__PURE__*/ S.String;

export type NotificationArn = string;
export type NotificationArns = string[];
export const NotificationArns = /*@__PURE__*/ S.Array(S.String);
export type ProvisionedProductName = string;
export type ParameterKey = string;
export type ParameterValue = string;
export type UsePreviousValue = boolean;
export interface UpdateProvisioningParameter {
  Key?: string;
  Value?: string;
  UsePreviousValue?: boolean;
}
export const UpdateProvisioningParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    UsePreviousValue: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateProvisioningParameter",
}) as any as S.Schema<UpdateProvisioningParameter>;
export type UpdateProvisioningParameters = UpdateProvisioningParameter[];
export const UpdateProvisioningParameters = /*@__PURE__*/ S.Array(
  UpdateProvisioningParameter,
);
export interface CreateProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanName: string;
  PlanType: ProvisionedProductPlanType;
  NotificationArns?: string[];
  PathId?: string;
  ProductId: string;
  ProvisionedProductName: string;
  ProvisioningArtifactId: string;
  ProvisioningParameters?: UpdateProvisioningParameter[];
  IdempotencyToken: string;
  Tags?: Tag[];
}
export const CreateProvisionedProductPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PlanName: S.String,
    PlanType: ProvisionedProductPlanType,
    NotificationArns: S.optional(NotificationArns),
    PathId: S.optional(S.String),
    ProductId: S.String,
    ProvisionedProductName: S.String,
    ProvisioningArtifactId: S.String,
    ProvisioningParameters: S.optional(UpdateProvisioningParameters),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProvisionedProductPlanInput",
}) as any as S.Schema<CreateProvisionedProductPlanInput>;
export interface CreateProvisionedProductPlanOutput {
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionedProductName?: string;
  ProvisioningArtifactId?: string;
}
export const CreateProvisionedProductPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlanName: S.optional(S.String),
    PlanId: S.optional(S.String),
    ProvisionProductId: S.optional(S.String),
    ProvisionedProductName: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProvisionedProductPlanOutput",
}) as any as S.Schema<CreateProvisionedProductPlanOutput>;
export interface CreateProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  Parameters: ProvisioningArtifactProperties;
  IdempotencyToken: string;
}
export const CreateProvisioningArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    Parameters: ProvisioningArtifactProperties,
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProvisioningArtifactInput",
}) as any as S.Schema<CreateProvisioningArtifactInput>;
export interface CreateProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
}
export const CreateProvisioningArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningArtifactDetail: S.optional(ProvisioningArtifactDetail),
    Info: S.optional(ProvisioningArtifactInfo),
    Status: S.optional(Status),
  }),
).annotate({
  identifier: "CreateProvisioningArtifactOutput",
}) as any as S.Schema<CreateProvisioningArtifactOutput>;
export type ServiceActionName = string;
export type ServiceActionDefinitionType = "SSM_AUTOMATION" | (string & {});
export const ServiceActionDefinitionType = /*@__PURE__*/ S.String;

export type ServiceActionDefinitionKey =
  | "Name"
  | "Version"
  | "AssumeRole"
  | "Parameters"
  | (string & {});
export const ServiceActionDefinitionKey = /*@__PURE__*/ S.String;

export type ServiceActionDefinitionValue = string;
export type ServiceActionDefinitionMap = {
  [key in ServiceActionDefinitionKey]?: string;
};
export const ServiceActionDefinitionMap = /*@__PURE__*/ S.Record(
  ServiceActionDefinitionKey,
  S.String.pipe(S.optional),
);
export type ServiceActionDescription = string;
export interface CreateServiceActionInput {
  Name: string;
  DefinitionType: ServiceActionDefinitionType;
  Definition: { [key: string]: string | undefined };
  Description?: string;
  AcceptLanguage?: string;
  IdempotencyToken: string;
}
export const CreateServiceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DefinitionType: ServiceActionDefinitionType,
    Definition: ServiceActionDefinitionMap,
    Description: S.optional(S.String),
    AcceptLanguage: S.optional(S.String),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceActionInput",
}) as any as S.Schema<CreateServiceActionInput>;
export interface ServiceActionSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  DefinitionType?: ServiceActionDefinitionType;
}
export const ServiceActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DefinitionType: S.optional(ServiceActionDefinitionType),
  }),
).annotate({
  identifier: "ServiceActionSummary",
}) as any as S.Schema<ServiceActionSummary>;
export interface ServiceActionDetail {
  ServiceActionSummary?: ServiceActionSummary;
  Definition?: { [key: string]: string | undefined };
}
export const ServiceActionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceActionSummary: S.optional(ServiceActionSummary),
    Definition: S.optional(ServiceActionDefinitionMap),
  }),
).annotate({
  identifier: "ServiceActionDetail",
}) as any as S.Schema<ServiceActionDetail>;
export interface CreateServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export const CreateServiceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceActionDetail: S.optional(ServiceActionDetail) }),
).annotate({
  identifier: "CreateServiceActionOutput",
}) as any as S.Schema<CreateServiceActionOutput>;
export type TagOptionKey = string;
export type TagOptionValue = string;
export interface CreateTagOptionInput {
  Key: string;
  Value: string;
}
export const CreateTagOptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTagOptionInput",
}) as any as S.Schema<CreateTagOptionInput>;
export type TagOptionActive = boolean;
export type Owner = string;
export interface TagOptionDetail {
  Key?: string;
  Value?: string;
  Active?: boolean;
  Id?: string;
  Owner?: string;
}
export const TagOptionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Active: S.optional(S.Boolean),
    Id: S.optional(S.String),
    Owner: S.optional(S.String),
  }),
).annotate({
  identifier: "TagOptionDetail",
}) as any as S.Schema<TagOptionDetail>;
export interface CreateTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export const CreateTagOptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagOptionDetail: S.optional(TagOptionDetail) }),
).annotate({
  identifier: "CreateTagOptionOutput",
}) as any as S.Schema<CreateTagOptionOutput>;
export interface DeleteConstraintInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DeleteConstraintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConstraintInput",
}) as any as S.Schema<DeleteConstraintInput>;
export interface DeleteConstraintOutput {}
export const DeleteConstraintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConstraintOutput",
}) as any as S.Schema<DeleteConstraintOutput>;
export interface DeletePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DeletePortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePortfolioInput",
}) as any as S.Schema<DeletePortfolioInput>;
export interface DeletePortfolioOutput {}
export const DeletePortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortfolioOutput",
}) as any as S.Schema<DeletePortfolioOutput>;
export interface DeletePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
}
export const DeletePortfolioShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    AccountId: S.optional(S.String),
    OrganizationNode: S.optional(OrganizationNode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePortfolioShareInput",
}) as any as S.Schema<DeletePortfolioShareInput>;
export interface DeletePortfolioShareOutput {
  PortfolioShareToken?: string;
}
export const DeletePortfolioShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortfolioShareToken: S.optional(S.String) }),
).annotate({
  identifier: "DeletePortfolioShareOutput",
}) as any as S.Schema<DeletePortfolioShareOutput>;
export interface DeleteProductInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DeleteProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProductInput",
}) as any as S.Schema<DeleteProductInput>;
export interface DeleteProductOutput {}
export const DeleteProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProductOutput",
}) as any as S.Schema<DeleteProductOutput>;
export type IgnoreErrors = boolean;
export interface DeleteProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  IgnoreErrors?: boolean;
}
export const DeleteProvisionedProductPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PlanId: S.String,
    IgnoreErrors: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProvisionedProductPlanInput",
}) as any as S.Schema<DeleteProvisionedProductPlanInput>;
export interface DeleteProvisionedProductPlanOutput {}
export const DeleteProvisionedProductPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProvisionedProductPlanOutput",
}) as any as S.Schema<DeleteProvisionedProductPlanOutput>;
export interface DeleteProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
}
export const DeleteProvisioningArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    ProvisioningArtifactId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProvisioningArtifactInput",
}) as any as S.Schema<DeleteProvisioningArtifactInput>;
export interface DeleteProvisioningArtifactOutput {}
export const DeleteProvisioningArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProvisioningArtifactOutput",
}) as any as S.Schema<DeleteProvisioningArtifactOutput>;
export interface DeleteServiceActionInput {
  Id: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export const DeleteServiceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    AcceptLanguage: S.optional(S.String),
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceActionInput",
}) as any as S.Schema<DeleteServiceActionInput>;
export interface DeleteServiceActionOutput {}
export const DeleteServiceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceActionOutput",
}) as any as S.Schema<DeleteServiceActionOutput>;
export interface DeleteTagOptionInput {
  Id: string;
}
export const DeleteTagOptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpQuery("id")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTagOptionInput",
}) as any as S.Schema<DeleteTagOptionInput>;
export interface DeleteTagOptionOutput {}
export const DeleteTagOptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTagOptionOutput",
}) as any as S.Schema<DeleteTagOptionOutput>;
export interface DescribeConstraintInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DescribeConstraintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeConstraintInput",
}) as any as S.Schema<DescribeConstraintInput>;
export interface DescribeConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export const DescribeConstraintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstraintDetail: S.optional(ConstraintDetail),
    ConstraintParameters: S.optional(S.String),
    Status: S.optional(Status),
  }),
).annotate({
  identifier: "DescribeConstraintOutput",
}) as any as S.Schema<DescribeConstraintOutput>;
export interface DescribeCopyProductStatusInput {
  AcceptLanguage?: string;
  CopyProductToken: string;
}
export const DescribeCopyProductStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    CopyProductToken: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeCopyProductStatusInput",
}) as any as S.Schema<DescribeCopyProductStatusInput>;
export type CopyProductStatus =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export const CopyProductStatus = /*@__PURE__*/ S.String;

export type StatusDetail = string;
export interface DescribeCopyProductStatusOutput {
  CopyProductStatus?: CopyProductStatus;
  TargetProductId?: string;
  StatusDetail?: string;
}
export const DescribeCopyProductStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CopyProductStatus: S.optional(CopyProductStatus),
    TargetProductId: S.optional(S.String),
    StatusDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeCopyProductStatusOutput",
}) as any as S.Schema<DescribeCopyProductStatusOutput>;
export interface DescribePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DescribePortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePortfolioInput",
}) as any as S.Schema<DescribePortfolioInput>;
export type TagOptionDetails = TagOptionDetail[];
export const TagOptionDetails = /*@__PURE__*/ S.Array(TagOptionDetail);
export interface BudgetDetail {
  BudgetName?: string;
}
export const BudgetDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BudgetName: S.optional(S.String) }),
).annotate({ identifier: "BudgetDetail" }) as any as S.Schema<BudgetDetail>;
export type Budgets = BudgetDetail[];
export const Budgets = /*@__PURE__*/ S.Array(BudgetDetail);
export interface DescribePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
  TagOptions?: TagOptionDetail[];
  Budgets?: BudgetDetail[];
}
export const DescribePortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetail: S.optional(PortfolioDetail),
    Tags: S.optional(Tags),
    TagOptions: S.optional(TagOptionDetails),
    Budgets: S.optional(Budgets),
  }),
).annotate({
  identifier: "DescribePortfolioOutput",
}) as any as S.Schema<DescribePortfolioOutput>;
export type DescribePortfolioShareType =
  | "ACCOUNT"
  | "ORGANIZATION"
  | "ORGANIZATIONAL_UNIT"
  | "ORGANIZATION_MEMBER_ACCOUNT"
  | (string & {});
export const DescribePortfolioShareType = /*@__PURE__*/ S.String;

export type PageToken = string;
export type PageSizeMax100 = number;
export interface DescribePortfolioSharesInput {
  PortfolioId: string;
  Type: DescribePortfolioShareType;
  PageToken?: string;
  PageSize?: number;
}
export const DescribePortfolioSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioId: S.String,
    Type: DescribePortfolioShareType,
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePortfolioSharesInput",
}) as any as S.Schema<DescribePortfolioSharesInput>;
export interface PortfolioShareDetail {
  PrincipalId?: string;
  Type?: DescribePortfolioShareType;
  Accepted?: boolean;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export const PortfolioShareDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalId: S.optional(S.String),
    Type: S.optional(DescribePortfolioShareType),
    Accepted: S.optional(S.Boolean),
    ShareTagOptions: S.optional(S.Boolean),
    SharePrincipals: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PortfolioShareDetail",
}) as any as S.Schema<PortfolioShareDetail>;
export type PortfolioShareDetails = PortfolioShareDetail[];
export const PortfolioShareDetails =
  /*@__PURE__*/ S.Array(PortfolioShareDetail);
export interface DescribePortfolioSharesOutput {
  NextPageToken?: string;
  PortfolioShareDetails?: PortfolioShareDetail[];
}
export const DescribePortfolioSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextPageToken: S.optional(S.String),
    PortfolioShareDetails: S.optional(PortfolioShareDetails),
  }),
).annotate({
  identifier: "DescribePortfolioSharesOutput",
}) as any as S.Schema<DescribePortfolioSharesOutput>;
export interface DescribePortfolioShareStatusInput {
  PortfolioShareToken: string;
}
export const DescribePortfolioShareStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortfolioShareToken: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePortfolioShareStatusInput",
}) as any as S.Schema<DescribePortfolioShareStatusInput>;
export type ShareStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "ERROR"
  | (string & {});
export const ShareStatus = /*@__PURE__*/ S.String;

export type SuccessfulShares = string[];
export const SuccessfulShares = /*@__PURE__*/ S.Array(S.String);
export type Namespaces = string[];
export const Namespaces = /*@__PURE__*/ S.Array(S.String);
export type Message = string;
export interface ShareError {
  Accounts?: string[];
  Message?: string;
  Error?: string;
}
export const ShareError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(Namespaces),
    Message: S.optional(S.String),
    Error: S.optional(S.String),
  }),
).annotate({ identifier: "ShareError" }) as any as S.Schema<ShareError>;
export type ShareErrors = ShareError[];
export const ShareErrors = /*@__PURE__*/ S.Array(ShareError);
export interface ShareDetails {
  SuccessfulShares?: string[];
  ShareErrors?: ShareError[];
}
export const ShareDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuccessfulShares: S.optional(SuccessfulShares),
    ShareErrors: S.optional(ShareErrors),
  }),
).annotate({ identifier: "ShareDetails" }) as any as S.Schema<ShareDetails>;
export interface DescribePortfolioShareStatusOutput {
  PortfolioShareToken?: string;
  PortfolioId?: string;
  OrganizationNodeValue?: string;
  Status?: ShareStatus;
  ShareDetails?: ShareDetails;
}
export const DescribePortfolioShareStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioShareToken: S.optional(S.String),
    PortfolioId: S.optional(S.String),
    OrganizationNodeValue: S.optional(S.String),
    Status: S.optional(ShareStatus),
    ShareDetails: S.optional(ShareDetails),
  }),
).annotate({
  identifier: "DescribePortfolioShareStatusOutput",
}) as any as S.Schema<DescribePortfolioShareStatusOutput>;
export interface DescribeProductInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
}
export const DescribeProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProductInput",
}) as any as S.Schema<DescribeProductInput>;
export type ProvisioningArtifactCreatedTime = Date;
export interface ProvisioningArtifact {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
  Guidance?: ProvisioningArtifactGuidance;
}
export const ProvisioningArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Guidance: S.optional(ProvisioningArtifactGuidance),
  }),
).annotate({
  identifier: "ProvisioningArtifact",
}) as any as S.Schema<ProvisioningArtifact>;
export type ProvisioningArtifacts = ProvisioningArtifact[];
export const ProvisioningArtifacts =
  /*@__PURE__*/ S.Array(ProvisioningArtifact);
export type PortfolioName = string;
export interface LaunchPath {
  Id?: string;
  Name?: string;
}
export const LaunchPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "LaunchPath" }) as any as S.Schema<LaunchPath>;
export type LaunchPaths = LaunchPath[];
export const LaunchPaths = /*@__PURE__*/ S.Array(LaunchPath);
export interface DescribeProductOutput {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifacts?: ProvisioningArtifact[];
  Budgets?: BudgetDetail[];
  LaunchPaths?: LaunchPath[];
}
export const DescribeProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewSummary: S.optional(ProductViewSummary),
    ProvisioningArtifacts: S.optional(ProvisioningArtifacts),
    Budgets: S.optional(Budgets),
    LaunchPaths: S.optional(LaunchPaths),
  }),
).annotate({
  identifier: "DescribeProductOutput",
}) as any as S.Schema<DescribeProductOutput>;
export interface DescribeProductAsAdminInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
  SourcePortfolioId?: string;
}
export const DescribeProductAsAdminInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    SourcePortfolioId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProductAsAdminInput",
}) as any as S.Schema<DescribeProductAsAdminInput>;
export interface ProvisioningArtifactSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
  ProvisioningArtifactMetadata?: { [key: string]: string | undefined };
}
export const ProvisioningArtifactSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProvisioningArtifactMetadata: S.optional(ProvisioningArtifactInfo),
  }),
).annotate({
  identifier: "ProvisioningArtifactSummary",
}) as any as S.Schema<ProvisioningArtifactSummary>;
export type ProvisioningArtifactSummaries = ProvisioningArtifactSummary[];
export const ProvisioningArtifactSummaries = /*@__PURE__*/ S.Array(
  ProvisioningArtifactSummary,
);
export interface DescribeProductAsAdminOutput {
  ProductViewDetail?: ProductViewDetail;
  ProvisioningArtifactSummaries?: ProvisioningArtifactSummary[];
  Tags?: Tag[];
  TagOptions?: TagOptionDetail[];
  Budgets?: BudgetDetail[];
}
export const DescribeProductAsAdminOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewDetail: S.optional(ProductViewDetail),
    ProvisioningArtifactSummaries: S.optional(ProvisioningArtifactSummaries),
    Tags: S.optional(Tags),
    TagOptions: S.optional(TagOptionDetails),
    Budgets: S.optional(Budgets),
  }),
).annotate({
  identifier: "DescribeProductAsAdminOutput",
}) as any as S.Schema<DescribeProductAsAdminOutput>;
export interface DescribeProductViewInput {
  AcceptLanguage?: string;
  Id: string;
}
export const DescribeProductViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProductViewInput",
}) as any as S.Schema<DescribeProductViewInput>;
export interface DescribeProductViewOutput {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifacts?: ProvisioningArtifact[];
}
export const DescribeProductViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewSummary: S.optional(ProductViewSummary),
    ProvisioningArtifacts: S.optional(ProvisioningArtifacts),
  }),
).annotate({
  identifier: "DescribeProductViewOutput",
}) as any as S.Schema<DescribeProductViewOutput>;
export interface DescribeProvisionedProductInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
}
export const DescribeProvisionedProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProvisionedProductInput",
}) as any as S.Schema<DescribeProvisionedProductInput>;
export type ProvisionedProductNameOrArn = string;
export type ProvisionedProductType = string;
export type ProvisionedProductId = string;
export type ProvisionedProductStatus =
  | "AVAILABLE"
  | "UNDER_CHANGE"
  | "TAINTED"
  | "ERROR"
  | "PLAN_IN_PROGRESS"
  | (string & {});
export const ProvisionedProductStatus = /*@__PURE__*/ S.String;

export type ProvisionedProductStatusMessage = string;
export type LastRequestId = string;
export type RoleArn = string;
export interface ProvisionedProductDetail {
  Name?: string;
  Arn?: string;
  Type?: string;
  Id?: string;
  Status?: ProvisionedProductStatus;
  StatusMessage?: string;
  CreatedTime?: Date;
  IdempotencyToken?: string;
  LastRecordId?: string;
  LastProvisioningRecordId?: string;
  LastSuccessfulProvisioningRecordId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  LaunchRoleArn?: string;
}
export const ProvisionedProductDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    Id: S.optional(S.String),
    Status: S.optional(ProvisionedProductStatus),
    StatusMessage: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdempotencyToken: S.optional(S.String),
    LastRecordId: S.optional(S.String),
    LastProvisioningRecordId: S.optional(S.String),
    LastSuccessfulProvisioningRecordId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    LaunchRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedProductDetail",
}) as any as S.Schema<ProvisionedProductDetail>;
export type CloudWatchDashboardName = string;
export interface CloudWatchDashboard {
  Name?: string;
}
export const CloudWatchDashboard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchDashboard",
}) as any as S.Schema<CloudWatchDashboard>;
export type CloudWatchDashboards = CloudWatchDashboard[];
export const CloudWatchDashboards = /*@__PURE__*/ S.Array(CloudWatchDashboard);
export interface DescribeProvisionedProductOutput {
  ProvisionedProductDetail?: ProvisionedProductDetail;
  CloudWatchDashboards?: CloudWatchDashboard[];
}
export const DescribeProvisionedProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionedProductDetail: S.optional(ProvisionedProductDetail),
    CloudWatchDashboards: S.optional(CloudWatchDashboards),
  }),
).annotate({
  identifier: "DescribeProvisionedProductOutput",
}) as any as S.Schema<DescribeProvisionedProductOutput>;
export type PageSize = number;
export interface DescribeProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  PageSize?: number;
  PageToken?: string;
}
export const DescribeProvisionedProductPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PlanId: S.String,
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProvisionedProductPlanInput",
}) as any as S.Schema<DescribeProvisionedProductPlanInput>;
export type ProvisionedProductPlanStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_SUCCESS"
  | "CREATE_FAILED"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_SUCCESS"
  | "EXECUTE_FAILED"
  | (string & {});
export const ProvisionedProductPlanStatus = /*@__PURE__*/ S.String;

export type UpdatedTime = Date;
export type StatusMessage = string;
export interface ProvisionedProductPlanDetails {
  CreatedTime?: Date;
  PathId?: string;
  ProductId?: string;
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionProductName?: string;
  PlanType?: ProvisionedProductPlanType;
  ProvisioningArtifactId?: string;
  Status?: ProvisionedProductPlanStatus;
  UpdatedTime?: Date;
  NotificationArns?: string[];
  ProvisioningParameters?: UpdateProvisioningParameter[];
  Tags?: Tag[];
  StatusMessage?: string;
}
export const ProvisionedProductPlanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PathId: S.optional(S.String),
    ProductId: S.optional(S.String),
    PlanName: S.optional(S.String),
    PlanId: S.optional(S.String),
    ProvisionProductId: S.optional(S.String),
    ProvisionProductName: S.optional(S.String),
    PlanType: S.optional(ProvisionedProductPlanType),
    ProvisioningArtifactId: S.optional(S.String),
    Status: S.optional(ProvisionedProductPlanStatus),
    UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotificationArns: S.optional(NotificationArns),
    ProvisioningParameters: S.optional(UpdateProvisioningParameters),
    Tags: S.optional(Tags),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedProductPlanDetails",
}) as any as S.Schema<ProvisionedProductPlanDetails>;
export type ChangeAction = "ADD" | "MODIFY" | "REMOVE" | (string & {});
export const ChangeAction = /*@__PURE__*/ S.String;

export type LogicalResourceId = string;
export type PhysicalResourceId = string;
export type PlanResourceType = string;
export type Replacement = "TRUE" | "FALSE" | "CONDITIONAL" | (string & {});
export const Replacement = /*@__PURE__*/ S.String;

export type ResourceAttribute =
  | "PROPERTIES"
  | "METADATA"
  | "CREATIONPOLICY"
  | "UPDATEPOLICY"
  | "DELETIONPOLICY"
  | "TAGS"
  | (string & {});
export const ResourceAttribute = /*@__PURE__*/ S.String;

export type Scope = ResourceAttribute[];
export const Scope = /*@__PURE__*/ S.Array(ResourceAttribute);
export type PropertyName = string;
export type RequiresRecreation =
  | "NEVER"
  | "CONDITIONALLY"
  | "ALWAYS"
  | (string & {});
export const RequiresRecreation = /*@__PURE__*/ S.String;

export interface ResourceTargetDefinition {
  Attribute?: ResourceAttribute;
  Name?: string;
  RequiresRecreation?: RequiresRecreation;
}
export const ResourceTargetDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.optional(ResourceAttribute),
    Name: S.optional(S.String),
    RequiresRecreation: S.optional(RequiresRecreation),
  }),
).annotate({
  identifier: "ResourceTargetDefinition",
}) as any as S.Schema<ResourceTargetDefinition>;
export type EvaluationType = "STATIC" | "DYNAMIC" | (string & {});
export const EvaluationType = /*@__PURE__*/ S.String;

export type CausingEntity = string;
export interface ResourceChangeDetail {
  Target?: ResourceTargetDefinition;
  Evaluation?: EvaluationType;
  CausingEntity?: string;
}
export const ResourceChangeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: S.optional(ResourceTargetDefinition),
    Evaluation: S.optional(EvaluationType),
    CausingEntity: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceChangeDetail",
}) as any as S.Schema<ResourceChangeDetail>;
export type ResourceChangeDetails = ResourceChangeDetail[];
export const ResourceChangeDetails =
  /*@__PURE__*/ S.Array(ResourceChangeDetail);
export interface ResourceChange {
  Action?: ChangeAction;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Replacement?: Replacement;
  Scope?: ResourceAttribute[];
  Details?: ResourceChangeDetail[];
}
export const ResourceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(ChangeAction),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Replacement: S.optional(Replacement),
    Scope: S.optional(Scope),
    Details: S.optional(ResourceChangeDetails),
  }),
).annotate({ identifier: "ResourceChange" }) as any as S.Schema<ResourceChange>;
export type ResourceChanges = ResourceChange[];
export const ResourceChanges = /*@__PURE__*/ S.Array(ResourceChange);
export interface DescribeProvisionedProductPlanOutput {
  ProvisionedProductPlanDetails?: ProvisionedProductPlanDetails;
  ResourceChanges?: ResourceChange[];
  NextPageToken?: string;
}
export const DescribeProvisionedProductPlanOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProvisionedProductPlanDetails: S.optional(ProvisionedProductPlanDetails),
      ResourceChanges: S.optional(ResourceChanges),
      NextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeProvisionedProductPlanOutput",
}) as any as S.Schema<DescribeProvisionedProductPlanOutput>;
export type Verbose = boolean;
export interface DescribeProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProvisioningArtifactId?: string;
  ProductId?: string;
  ProvisioningArtifactName?: string;
  ProductName?: string;
  Verbose?: boolean;
  IncludeProvisioningArtifactParameters?: boolean;
}
export const DescribeProvisioningArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProvisioningArtifactName: S.optional(S.String),
    ProductName: S.optional(S.String),
    Verbose: S.optional(S.Boolean),
    IncludeProvisioningArtifactParameters: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProvisioningArtifactInput",
}) as any as S.Schema<DescribeProvisioningArtifactInput>;
export type DefaultValue = string;
export type ParameterType = string;
export type NoEcho = boolean;
export type Description = string;
export type AllowedValues = string[];
export const AllowedValues = /*@__PURE__*/ S.Array(S.String);
export interface ParameterConstraints {
  AllowedValues?: string[];
  AllowedPattern?: string;
  ConstraintDescription?: string;
  MaxLength?: string;
  MinLength?: string;
  MaxValue?: string;
  MinValue?: string;
}
export const ParameterConstraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedValues: S.optional(AllowedValues),
    AllowedPattern: S.optional(S.String),
    ConstraintDescription: S.optional(S.String),
    MaxLength: S.optional(S.String),
    MinLength: S.optional(S.String),
    MaxValue: S.optional(S.String),
    MinValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterConstraints",
}) as any as S.Schema<ParameterConstraints>;
export interface ProvisioningArtifactParameter {
  ParameterKey?: string;
  DefaultValue?: string;
  ParameterType?: string;
  IsNoEcho?: boolean;
  Description?: string;
  ParameterConstraints?: ParameterConstraints;
}
export const ProvisioningArtifactParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterKey: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    ParameterType: S.optional(S.String),
    IsNoEcho: S.optional(S.Boolean),
    Description: S.optional(S.String),
    ParameterConstraints: S.optional(ParameterConstraints),
  }),
).annotate({
  identifier: "ProvisioningArtifactParameter",
}) as any as S.Schema<ProvisioningArtifactParameter>;
export type ProvisioningArtifactParameters = ProvisioningArtifactParameter[];
export const ProvisioningArtifactParameters = /*@__PURE__*/ S.Array(
  ProvisioningArtifactParameter,
);
export interface DescribeProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
  ProvisioningArtifactParameters?: ProvisioningArtifactParameter[];
}
export const DescribeProvisioningArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningArtifactDetail: S.optional(ProvisioningArtifactDetail),
    Info: S.optional(ProvisioningArtifactInfo),
    Status: S.optional(Status),
    ProvisioningArtifactParameters: S.optional(ProvisioningArtifactParameters),
  }),
).annotate({
  identifier: "DescribeProvisioningArtifactOutput",
}) as any as S.Schema<DescribeProvisioningArtifactOutput>;
export interface DescribeProvisioningParametersInput {
  AcceptLanguage?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
}
export const DescribeProvisioningParametersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ProvisioningArtifactName: S.optional(S.String),
    PathId: S.optional(S.String),
    PathName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProvisioningParametersInput",
}) as any as S.Schema<DescribeProvisioningParametersInput>;
export interface ConstraintSummary {
  Type?: string;
  Description?: string;
}
export const ConstraintSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), Description: S.optional(S.String) }),
).annotate({
  identifier: "ConstraintSummary",
}) as any as S.Schema<ConstraintSummary>;
export type ConstraintSummaries = ConstraintSummary[];
export const ConstraintSummaries = /*@__PURE__*/ S.Array(ConstraintSummary);
export type InstructionType = string;
export type InstructionValue = string;
export interface UsageInstruction {
  Type?: string;
  Value?: string;
}
export const UsageInstruction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "UsageInstruction",
}) as any as S.Schema<UsageInstruction>;
export type UsageInstructions = UsageInstruction[];
export const UsageInstructions = /*@__PURE__*/ S.Array(UsageInstruction);
export type TagOptionValues = string[];
export const TagOptionValues = /*@__PURE__*/ S.Array(S.String);
export interface TagOptionSummary {
  Key?: string;
  Values?: string[];
}
export const TagOptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Values: S.optional(TagOptionValues) }),
).annotate({
  identifier: "TagOptionSummary",
}) as any as S.Schema<TagOptionSummary>;
export type TagOptionSummaries = TagOptionSummary[];
export const TagOptionSummaries = /*@__PURE__*/ S.Array(TagOptionSummary);
export type StackSetAccounts = string[];
export const StackSetAccounts = /*@__PURE__*/ S.Array(S.String);
export type Region = string;
export type StackSetRegions = string[];
export const StackSetRegions = /*@__PURE__*/ S.Array(S.String);
export interface ProvisioningArtifactPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
}
export const ProvisioningArtifactPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetAccounts: S.optional(StackSetAccounts),
    StackSetRegions: S.optional(StackSetRegions),
  }),
).annotate({
  identifier: "ProvisioningArtifactPreferences",
}) as any as S.Schema<ProvisioningArtifactPreferences>;
export type ProvisioningArtifactOutputKey = string;
export type OutputDescription = string;
export interface ProvisioningArtifactOutput {
  Key?: string;
  Description?: string;
}
export const ProvisioningArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Description: S.optional(S.String) }),
).annotate({
  identifier: "ProvisioningArtifactOutput",
}) as any as S.Schema<ProvisioningArtifactOutput>;
export type ProvisioningArtifactOutputs = ProvisioningArtifactOutput[];
export const ProvisioningArtifactOutputs = /*@__PURE__*/ S.Array(
  ProvisioningArtifactOutput,
);
export interface DescribeProvisioningParametersOutput {
  ProvisioningArtifactParameters?: ProvisioningArtifactParameter[];
  ConstraintSummaries?: ConstraintSummary[];
  UsageInstructions?: UsageInstruction[];
  TagOptions?: TagOptionSummary[];
  ProvisioningArtifactPreferences?: ProvisioningArtifactPreferences;
  ProvisioningArtifactOutputs?: ProvisioningArtifactOutput[];
  ProvisioningArtifactOutputKeys?: ProvisioningArtifactOutput[];
}
export const DescribeProvisioningParametersOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProvisioningArtifactParameters: S.optional(
        ProvisioningArtifactParameters,
      ),
      ConstraintSummaries: S.optional(ConstraintSummaries),
      UsageInstructions: S.optional(UsageInstructions),
      TagOptions: S.optional(TagOptionSummaries),
      ProvisioningArtifactPreferences: S.optional(
        ProvisioningArtifactPreferences,
      ),
      ProvisioningArtifactOutputs: S.optional(ProvisioningArtifactOutputs),
      ProvisioningArtifactOutputKeys: S.optional(ProvisioningArtifactOutputs),
    }),
).annotate({
  identifier: "DescribeProvisioningParametersOutput",
}) as any as S.Schema<DescribeProvisioningParametersOutput>;
export interface DescribeRecordInput {
  AcceptLanguage?: string;
  Id: string;
  PageToken?: string;
  PageSize?: number;
}
export const DescribeRecordInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.String,
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRecordInput",
}) as any as S.Schema<DescribeRecordInput>;
export type RecordStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "IN_PROGRESS_IN_ERROR"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const RecordStatus = /*@__PURE__*/ S.String;

export type RecordType = string;
export type ErrorCode = string;
export type ErrorDescription = string;
export interface RecordError {
  Code?: string;
  Description?: string;
}
export const RecordError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Description: S.optional(S.String) }),
).annotate({ identifier: "RecordError" }) as any as S.Schema<RecordError>;
export type RecordErrors = RecordError[];
export const RecordErrors = /*@__PURE__*/ S.Array(RecordError);
export type RecordTagKey = string;
export type RecordTagValue = string;
export interface RecordTag {
  Key?: string;
  Value?: string;
}
export const RecordTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "RecordTag" }) as any as S.Schema<RecordTag>;
export type RecordTags = RecordTag[];
export const RecordTags = /*@__PURE__*/ S.Array(RecordTag);
export interface RecordDetail {
  RecordId?: string;
  ProvisionedProductName?: string;
  Status?: RecordStatus;
  CreatedTime?: Date;
  UpdatedTime?: Date;
  ProvisionedProductType?: string;
  RecordType?: string;
  ProvisionedProductId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  PathId?: string;
  RecordErrors?: RecordError[];
  RecordTags?: RecordTag[];
  LaunchRoleArn?: string;
}
export const RecordDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordId: S.optional(S.String),
    ProvisionedProductName: S.optional(S.String),
    Status: S.optional(RecordStatus),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProvisionedProductType: S.optional(S.String),
    RecordType: S.optional(S.String),
    ProvisionedProductId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    PathId: S.optional(S.String),
    RecordErrors: S.optional(RecordErrors),
    RecordTags: S.optional(RecordTags),
    LaunchRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "RecordDetail" }) as any as S.Schema<RecordDetail>;
export type OutputKey = string;
export type OutputValue = string;
export interface RecordOutput {
  OutputKey?: string;
  OutputValue?: string;
  Description?: string;
}
export const RecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputKey: S.optional(S.String),
    OutputValue: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "RecordOutput" }) as any as S.Schema<RecordOutput>;
export type RecordOutputs = RecordOutput[];
export const RecordOutputs = /*@__PURE__*/ S.Array(RecordOutput);
export interface DescribeRecordOutput {
  RecordDetail?: RecordDetail;
  RecordOutputs?: RecordOutput[];
  NextPageToken?: string;
}
export const DescribeRecordOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordDetail: S.optional(RecordDetail),
    RecordOutputs: S.optional(RecordOutputs),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRecordOutput",
}) as any as S.Schema<DescribeRecordOutput>;
export interface DescribeServiceActionInput {
  Id: string;
  AcceptLanguage?: string;
}
export const DescribeServiceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, AcceptLanguage: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeServiceActionInput",
}) as any as S.Schema<DescribeServiceActionInput>;
export interface DescribeServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export const DescribeServiceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceActionDetail: S.optional(ServiceActionDetail) }),
).annotate({
  identifier: "DescribeServiceActionOutput",
}) as any as S.Schema<DescribeServiceActionOutput>;
export interface DescribeServiceActionExecutionParametersInput {
  ProvisionedProductId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
}
export const DescribeServiceActionExecutionParametersInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProvisionedProductId: S.String,
      ServiceActionId: S.String,
      AcceptLanguage: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeServiceActionExecutionParametersInput",
  }) as any as S.Schema<DescribeServiceActionExecutionParametersInput>;
export type ExecutionParameterKey = string;
export type ExecutionParameterType = string;
export type ExecutionParameterValue = string;
export type ExecutionParameterValueList = string[];
export const ExecutionParameterValueList = /*@__PURE__*/ S.Array(S.String);
export interface ExecutionParameter {
  Name?: string;
  Type?: string;
  DefaultValues?: string[];
}
export const ExecutionParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    DefaultValues: S.optional(ExecutionParameterValueList),
  }),
).annotate({
  identifier: "ExecutionParameter",
}) as any as S.Schema<ExecutionParameter>;
export type ExecutionParameters = ExecutionParameter[];
export const ExecutionParameters = /*@__PURE__*/ S.Array(ExecutionParameter);
export interface DescribeServiceActionExecutionParametersOutput {
  ServiceActionParameters?: ExecutionParameter[];
}
export const DescribeServiceActionExecutionParametersOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ServiceActionParameters: S.optional(ExecutionParameters) }),
  ).annotate({
    identifier: "DescribeServiceActionExecutionParametersOutput",
  }) as any as S.Schema<DescribeServiceActionExecutionParametersOutput>;
export interface DescribeTagOptionInput {
  Id: string;
}
export const DescribeTagOptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpQuery("id")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTagOptionInput",
}) as any as S.Schema<DescribeTagOptionInput>;
export interface DescribeTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export const DescribeTagOptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagOptionDetail: S.optional(TagOptionDetail) }),
).annotate({
  identifier: "DescribeTagOptionOutput",
}) as any as S.Schema<DescribeTagOptionOutput>;
export interface DisableAWSOrganizationsAccessInput {}
export const DisableAWSOrganizationsAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisableAWSOrganizationsAccessInput",
}) as any as S.Schema<DisableAWSOrganizationsAccessInput>;
export interface DisableAWSOrganizationsAccessOutput {}
export const DisableAWSOrganizationsAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableAWSOrganizationsAccessOutput",
}) as any as S.Schema<DisableAWSOrganizationsAccessOutput>;
export interface DisassociateBudgetFromResourceInput {
  BudgetName: string;
  ResourceId: string;
}
export const DisassociateBudgetFromResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BudgetName: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateBudgetFromResourceInput",
}) as any as S.Schema<DisassociateBudgetFromResourceInput>;
export interface DisassociateBudgetFromResourceOutput {}
export const DisassociateBudgetFromResourceOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateBudgetFromResourceOutput",
}) as any as S.Schema<DisassociateBudgetFromResourceOutput>;
export interface DisassociatePrincipalFromPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PrincipalARN: string;
  PrincipalType?: PrincipalType;
}
export const DisassociatePrincipalFromPortfolioInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      PortfolioId: S.String,
      PrincipalARN: S.String,
      PrincipalType: S.optional(PrincipalType),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociatePrincipalFromPortfolioInput",
}) as any as S.Schema<DisassociatePrincipalFromPortfolioInput>;
export interface DisassociatePrincipalFromPortfolioOutput {}
export const DisassociatePrincipalFromPortfolioOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociatePrincipalFromPortfolioOutput",
}) as any as S.Schema<DisassociatePrincipalFromPortfolioOutput>;
export interface DisassociateProductFromPortfolioInput {
  AcceptLanguage?: string;
  ProductId: string;
  PortfolioId: string;
}
export const DisassociateProductFromPortfolioInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      ProductId: S.String,
      PortfolioId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateProductFromPortfolioInput",
}) as any as S.Schema<DisassociateProductFromPortfolioInput>;
export interface DisassociateProductFromPortfolioOutput {}
export const DisassociateProductFromPortfolioOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateProductFromPortfolioOutput",
}) as any as S.Schema<DisassociateProductFromPortfolioOutput>;
export interface DisassociateServiceActionFromProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export const DisassociateServiceActionFromProvisioningArtifactInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProductId: S.String,
      ProvisioningArtifactId: S.String,
      ServiceActionId: S.String,
      AcceptLanguage: S.optional(S.String),
      IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateServiceActionFromProvisioningArtifactInput",
  }) as any as S.Schema<DisassociateServiceActionFromProvisioningArtifactInput>;
export interface DisassociateServiceActionFromProvisioningArtifactOutput {}
export const DisassociateServiceActionFromProvisioningArtifactOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateServiceActionFromProvisioningArtifactOutput",
  }) as any as S.Schema<DisassociateServiceActionFromProvisioningArtifactOutput>;
export interface DisassociateTagOptionFromResourceInput {
  ResourceId: string;
  TagOptionId: string;
}
export const DisassociateTagOptionFromResourceInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceId: S.String.pipe(T.HttpQuery("resourceId")),
      TagOptionId: S.String.pipe(T.HttpQuery("tagOptionId")),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateTagOptionFromResourceInput",
}) as any as S.Schema<DisassociateTagOptionFromResourceInput>;
export interface DisassociateTagOptionFromResourceOutput {}
export const DisassociateTagOptionFromResourceOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateTagOptionFromResourceOutput",
}) as any as S.Schema<DisassociateTagOptionFromResourceOutput>;
export interface EnableAWSOrganizationsAccessInput {}
export const EnableAWSOrganizationsAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "EnableAWSOrganizationsAccessInput",
}) as any as S.Schema<EnableAWSOrganizationsAccessInput>;
export interface EnableAWSOrganizationsAccessOutput {}
export const EnableAWSOrganizationsAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableAWSOrganizationsAccessOutput",
}) as any as S.Schema<EnableAWSOrganizationsAccessOutput>;
export interface ExecuteProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  IdempotencyToken: string;
}
export const ExecuteProvisionedProductPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PlanId: S.String,
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExecuteProvisionedProductPlanInput",
}) as any as S.Schema<ExecuteProvisionedProductPlanInput>;
export interface ExecuteProvisionedProductPlanOutput {
  RecordDetail?: RecordDetail;
}
export const ExecuteProvisionedProductPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordDetail: S.optional(RecordDetail) }),
).annotate({
  identifier: "ExecuteProvisionedProductPlanOutput",
}) as any as S.Schema<ExecuteProvisionedProductPlanOutput>;
export type ExecutionParameterMap = { [key: string]: string[] | undefined };
export const ExecutionParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  ExecutionParameterValueList.pipe(S.optional),
);
export interface ExecuteProvisionedProductServiceActionInput {
  ProvisionedProductId: string;
  ServiceActionId: string;
  ExecuteToken: string;
  AcceptLanguage?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export const ExecuteProvisionedProductServiceActionInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProvisionedProductId: S.String,
      ServiceActionId: S.String,
      ExecuteToken: S.String.pipe(T.IdempotencyToken()),
      AcceptLanguage: S.optional(S.String),
      Parameters: S.optional(ExecutionParameterMap),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ExecuteProvisionedProductServiceActionInput",
  }) as any as S.Schema<ExecuteProvisionedProductServiceActionInput>;
export interface ExecuteProvisionedProductServiceActionOutput {
  RecordDetail?: RecordDetail;
}
export const ExecuteProvisionedProductServiceActionOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RecordDetail: S.optional(RecordDetail) }),
  ).annotate({
    identifier: "ExecuteProvisionedProductServiceActionOutput",
  }) as any as S.Schema<ExecuteProvisionedProductServiceActionOutput>;
export interface GetAWSOrganizationsAccessStatusInput {}
export const GetAWSOrganizationsAccessStatusInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetAWSOrganizationsAccessStatusInput",
}) as any as S.Schema<GetAWSOrganizationsAccessStatusInput>;
export type AccessStatus =
  | "ENABLED"
  | "UNDER_CHANGE"
  | "DISABLED"
  | (string & {});
export const AccessStatus = /*@__PURE__*/ S.String;

export interface GetAWSOrganizationsAccessStatusOutput {
  AccessStatus?: AccessStatus;
}
export const GetAWSOrganizationsAccessStatusOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AccessStatus: S.optional(AccessStatus) }),
).annotate({
  identifier: "GetAWSOrganizationsAccessStatusOutput",
}) as any as S.Schema<GetAWSOrganizationsAccessStatusOutput>;
export type OutputKeys = string[];
export const OutputKeys = /*@__PURE__*/ S.Array(S.String);
export interface GetProvisionedProductOutputsInput {
  AcceptLanguage?: string;
  ProvisionedProductId?: string;
  ProvisionedProductName?: string;
  OutputKeys?: string[];
  PageSize?: number;
  PageToken?: string;
}
export const GetProvisionedProductOutputsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProvisionedProductId: S.optional(S.String),
    ProvisionedProductName: S.optional(S.String),
    OutputKeys: S.optional(OutputKeys),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProvisionedProductOutputsInput",
}) as any as S.Schema<GetProvisionedProductOutputsInput>;
export interface GetProvisionedProductOutputsOutput {
  Outputs?: RecordOutput[];
  NextPageToken?: string;
}
export const GetProvisionedProductOutputsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Outputs: S.optional(RecordOutputs),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProvisionedProductOutputsOutput",
}) as any as S.Schema<GetProvisionedProductOutputsOutput>;
export type PhysicalId = string;
export interface ImportAsProvisionedProductInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
  ProvisionedProductName: string;
  PhysicalId: string;
  IdempotencyToken: string;
}
export const ImportAsProvisionedProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    ProvisioningArtifactId: S.String,
    ProvisionedProductName: S.String,
    PhysicalId: S.String,
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportAsProvisionedProductInput",
}) as any as S.Schema<ImportAsProvisionedProductInput>;
export interface ImportAsProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export const ImportAsProvisionedProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordDetail: S.optional(RecordDetail) }),
).annotate({
  identifier: "ImportAsProvisionedProductOutput",
}) as any as S.Schema<ImportAsProvisionedProductOutput>;
export interface ListAcceptedPortfolioSharesInput {
  AcceptLanguage?: string;
  PageToken?: string;
  PageSize?: number;
  PortfolioShareType?: PortfolioShareType;
}
export const ListAcceptedPortfolioSharesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
    PortfolioShareType: S.optional(PortfolioShareType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAcceptedPortfolioSharesInput",
}) as any as S.Schema<ListAcceptedPortfolioSharesInput>;
export type PortfolioDetails = PortfolioDetail[];
export const PortfolioDetails = /*@__PURE__*/ S.Array(PortfolioDetail);
export interface ListAcceptedPortfolioSharesOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export const ListAcceptedPortfolioSharesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetails: S.optional(PortfolioDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAcceptedPortfolioSharesOutput",
}) as any as S.Schema<ListAcceptedPortfolioSharesOutput>;
export interface ListBudgetsForResourceInput {
  AcceptLanguage?: string;
  ResourceId: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListBudgetsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ResourceId: S.String,
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBudgetsForResourceInput",
}) as any as S.Schema<ListBudgetsForResourceInput>;
export interface ListBudgetsForResourceOutput {
  Budgets?: BudgetDetail[];
  NextPageToken?: string;
}
export const ListBudgetsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Budgets: S.optional(Budgets),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBudgetsForResourceOutput",
}) as any as S.Schema<ListBudgetsForResourceOutput>;
export interface ListConstraintsForPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  ProductId?: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListConstraintsForPortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    ProductId: S.optional(S.String),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConstraintsForPortfolioInput",
}) as any as S.Schema<ListConstraintsForPortfolioInput>;
export type ConstraintDetails = ConstraintDetail[];
export const ConstraintDetails = /*@__PURE__*/ S.Array(ConstraintDetail);
export interface ListConstraintsForPortfolioOutput {
  ConstraintDetails?: ConstraintDetail[];
  NextPageToken?: string;
}
export const ListConstraintsForPortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstraintDetails: S.optional(ConstraintDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConstraintsForPortfolioOutput",
}) as any as S.Schema<ListConstraintsForPortfolioOutput>;
export interface ListLaunchPathsInput {
  AcceptLanguage?: string;
  ProductId: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListLaunchPathsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLaunchPathsInput",
}) as any as S.Schema<ListLaunchPathsInput>;
export interface LaunchPathSummary {
  Id?: string;
  ConstraintSummaries?: ConstraintSummary[];
  Tags?: Tag[];
  Name?: string;
}
export const LaunchPathSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ConstraintSummaries: S.optional(ConstraintSummaries),
    Tags: S.optional(Tags),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchPathSummary",
}) as any as S.Schema<LaunchPathSummary>;
export type LaunchPathSummaries = LaunchPathSummary[];
export const LaunchPathSummaries = /*@__PURE__*/ S.Array(LaunchPathSummary);
export interface ListLaunchPathsOutput {
  LaunchPathSummaries?: LaunchPathSummary[];
  NextPageToken?: string;
}
export const ListLaunchPathsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LaunchPathSummaries: S.optional(LaunchPathSummaries),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLaunchPathsOutput",
}) as any as S.Schema<ListLaunchPathsOutput>;
export interface ListOrganizationPortfolioAccessInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  OrganizationNodeType: OrganizationNodeType;
  PageToken?: string;
  PageSize?: number;
}
export const ListOrganizationPortfolioAccessInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      PortfolioId: S.String,
      OrganizationNodeType: OrganizationNodeType,
      PageToken: S.optional(S.String),
      PageSize: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListOrganizationPortfolioAccessInput",
}) as any as S.Schema<ListOrganizationPortfolioAccessInput>;
export type OrganizationNodes = OrganizationNode[];
export const OrganizationNodes = /*@__PURE__*/ S.Array(OrganizationNode);
export interface ListOrganizationPortfolioAccessOutput {
  OrganizationNodes?: OrganizationNode[];
  NextPageToken?: string;
}
export const ListOrganizationPortfolioAccessOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationNodes: S.optional(OrganizationNodes),
      NextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListOrganizationPortfolioAccessOutput",
}) as any as S.Schema<ListOrganizationPortfolioAccessOutput>;
export interface ListPortfolioAccessInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  OrganizationParentId?: string;
  PageToken?: string;
  PageSize?: number;
}
export const ListPortfolioAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    OrganizationParentId: S.optional(S.String),
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPortfolioAccessInput",
}) as any as S.Schema<ListPortfolioAccessInput>;
export type AccountIds = string[];
export const AccountIds = /*@__PURE__*/ S.Array(S.String);
export interface ListPortfolioAccessOutput {
  AccountIds?: string[];
  NextPageToken?: string;
}
export const ListPortfolioAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountIds: S.optional(AccountIds),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPortfolioAccessOutput",
}) as any as S.Schema<ListPortfolioAccessOutput>;
export interface ListPortfoliosInput {
  AcceptLanguage?: string;
  PageToken?: string;
  PageSize?: number;
}
export const ListPortfoliosInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPortfoliosInput",
}) as any as S.Schema<ListPortfoliosInput>;
export interface ListPortfoliosOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export const ListPortfoliosOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetails: S.optional(PortfolioDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPortfoliosOutput",
}) as any as S.Schema<ListPortfoliosOutput>;
export interface ListPortfoliosForProductInput {
  AcceptLanguage?: string;
  ProductId: string;
  PageToken?: string;
  PageSize?: number;
}
export const ListPortfoliosForProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPortfoliosForProductInput",
}) as any as S.Schema<ListPortfoliosForProductInput>;
export interface ListPortfoliosForProductOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export const ListPortfoliosForProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetails: S.optional(PortfolioDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPortfoliosForProductOutput",
}) as any as S.Schema<ListPortfoliosForProductOutput>;
export interface ListPrincipalsForPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListPrincipalsForPortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPrincipalsForPortfolioInput",
}) as any as S.Schema<ListPrincipalsForPortfolioInput>;
export interface Principal {
  PrincipalARN?: string;
  PrincipalType?: PrincipalType;
}
export const Principal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalARN: S.optional(S.String),
    PrincipalType: S.optional(PrincipalType),
  }),
).annotate({ identifier: "Principal" }) as any as S.Schema<Principal>;
export type Principals = Principal[];
export const Principals = /*@__PURE__*/ S.Array(Principal);
export interface ListPrincipalsForPortfolioOutput {
  Principals?: Principal[];
  NextPageToken?: string;
}
export const ListPrincipalsForPortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principals: S.optional(Principals),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrincipalsForPortfolioOutput",
}) as any as S.Schema<ListPrincipalsForPortfolioOutput>;
export type AccessLevelFilterKey = "Account" | "Role" | "User" | (string & {});
export const AccessLevelFilterKey = /*@__PURE__*/ S.String;

export type AccessLevelFilterValue = string;
export interface AccessLevelFilter {
  Key?: AccessLevelFilterKey;
  Value?: string;
}
export const AccessLevelFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(AccessLevelFilterKey),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "AccessLevelFilter",
}) as any as S.Schema<AccessLevelFilter>;
export interface ListProvisionedProductPlansInput {
  AcceptLanguage?: string;
  ProvisionProductId?: string;
  PageSize?: number;
  PageToken?: string;
  AccessLevelFilter?: AccessLevelFilter;
}
export const ListProvisionedProductPlansInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProvisionProductId: S.optional(S.String),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
    AccessLevelFilter: S.optional(AccessLevelFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProvisionedProductPlansInput",
}) as any as S.Schema<ListProvisionedProductPlansInput>;
export interface ProvisionedProductPlanSummary {
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionProductName?: string;
  PlanType?: ProvisionedProductPlanType;
  ProvisioningArtifactId?: string;
}
export const ProvisionedProductPlanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlanName: S.optional(S.String),
    PlanId: S.optional(S.String),
    ProvisionProductId: S.optional(S.String),
    ProvisionProductName: S.optional(S.String),
    PlanType: S.optional(ProvisionedProductPlanType),
    ProvisioningArtifactId: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedProductPlanSummary",
}) as any as S.Schema<ProvisionedProductPlanSummary>;
export type ProvisionedProductPlans = ProvisionedProductPlanSummary[];
export const ProvisionedProductPlans = /*@__PURE__*/ S.Array(
  ProvisionedProductPlanSummary,
);
export interface ListProvisionedProductPlansOutput {
  ProvisionedProductPlans?: ProvisionedProductPlanSummary[];
  NextPageToken?: string;
}
export const ListProvisionedProductPlansOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionedProductPlans: S.optional(ProvisionedProductPlans),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProvisionedProductPlansOutput",
}) as any as S.Schema<ListProvisionedProductPlansOutput>;
export interface ListProvisioningArtifactsInput {
  AcceptLanguage?: string;
  ProductId: string;
}
export const ListProvisioningArtifactsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptLanguage: S.optional(S.String), ProductId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProvisioningArtifactsInput",
}) as any as S.Schema<ListProvisioningArtifactsInput>;
export type ProvisioningArtifactDetails = ProvisioningArtifactDetail[];
export const ProvisioningArtifactDetails = /*@__PURE__*/ S.Array(
  ProvisioningArtifactDetail,
);
export interface ListProvisioningArtifactsOutput {
  ProvisioningArtifactDetails?: ProvisioningArtifactDetail[];
  NextPageToken?: string;
}
export const ListProvisioningArtifactsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningArtifactDetails: S.optional(ProvisioningArtifactDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProvisioningArtifactsOutput",
}) as any as S.Schema<ListProvisioningArtifactsOutput>;
export interface ListProvisioningArtifactsForServiceActionInput {
  ServiceActionId: string;
  PageSize?: number;
  PageToken?: string;
  AcceptLanguage?: string;
}
export const ListProvisioningArtifactsForServiceActionInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceActionId: S.String,
      PageSize: S.optional(S.Number),
      PageToken: S.optional(S.String),
      AcceptLanguage: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListProvisioningArtifactsForServiceActionInput",
  }) as any as S.Schema<ListProvisioningArtifactsForServiceActionInput>;
export interface ProvisioningArtifactView {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifact?: ProvisioningArtifact;
}
export const ProvisioningArtifactView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewSummary: S.optional(ProductViewSummary),
    ProvisioningArtifact: S.optional(ProvisioningArtifact),
  }),
).annotate({
  identifier: "ProvisioningArtifactView",
}) as any as S.Schema<ProvisioningArtifactView>;
export type ProvisioningArtifactViews = ProvisioningArtifactView[];
export const ProvisioningArtifactViews = /*@__PURE__*/ S.Array(
  ProvisioningArtifactView,
);
export interface ListProvisioningArtifactsForServiceActionOutput {
  ProvisioningArtifactViews?: ProvisioningArtifactView[];
  NextPageToken?: string;
}
export const ListProvisioningArtifactsForServiceActionOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProvisioningArtifactViews: S.optional(ProvisioningArtifactViews),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListProvisioningArtifactsForServiceActionOutput",
  }) as any as S.Schema<ListProvisioningArtifactsForServiceActionOutput>;
export type SearchFilterKey = string;
export type SearchFilterValue = string;
export interface ListRecordHistorySearchFilter {
  Key?: string;
  Value?: string;
}
export const ListRecordHistorySearchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "ListRecordHistorySearchFilter",
}) as any as S.Schema<ListRecordHistorySearchFilter>;
export interface ListRecordHistoryInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  SearchFilter?: ListRecordHistorySearchFilter;
  PageSize?: number;
  PageToken?: string;
}
export const ListRecordHistoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    AccessLevelFilter: S.optional(AccessLevelFilter),
    SearchFilter: S.optional(ListRecordHistorySearchFilter),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecordHistoryInput",
}) as any as S.Schema<ListRecordHistoryInput>;
export type RecordDetails = RecordDetail[];
export const RecordDetails = /*@__PURE__*/ S.Array(RecordDetail);
export interface ListRecordHistoryOutput {
  RecordDetails?: RecordDetail[];
  NextPageToken?: string;
}
export const ListRecordHistoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordDetails: S.optional(RecordDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecordHistoryOutput",
}) as any as S.Schema<ListRecordHistoryOutput>;
export type ResourceType = string;
export interface ListResourcesForTagOptionInput {
  TagOptionId: string;
  ResourceType?: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListResourcesForTagOptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagOptionId: S.String.pipe(T.HttpQuery("tagOptionId")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    PageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourcesForTagOptionInput",
}) as any as S.Schema<ListResourcesForTagOptionInput>;
export type ResourceDetailId = string;
export type ResourceDetailARN = string;
export type ResourceDetailName = string;
export type ResourceDetailDescription = string;
export type ResourceDetailCreatedTime = Date;
export interface ResourceDetail {
  Id?: string;
  ARN?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
}
export const ResourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ResourceDetail" }) as any as S.Schema<ResourceDetail>;
export type ResourceDetails = ResourceDetail[];
export const ResourceDetails = /*@__PURE__*/ S.Array(ResourceDetail);
export interface ListResourcesForTagOptionOutput {
  ResourceDetails?: ResourceDetail[];
  PageToken?: string;
}
export const ListResourcesForTagOptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceDetails: S.optional(ResourceDetails),
    PageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesForTagOptionOutput",
}) as any as S.Schema<ListResourcesForTagOptionOutput>;
export interface ListServiceActionsInput {
  AcceptLanguage?: string;
  PageSize?: number;
  PageToken?: string;
}
export const ListServiceActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceActionsInput",
}) as any as S.Schema<ListServiceActionsInput>;
export type ServiceActionSummaries = ServiceActionSummary[];
export const ServiceActionSummaries =
  /*@__PURE__*/ S.Array(ServiceActionSummary);
export interface ListServiceActionsOutput {
  ServiceActionSummaries?: ServiceActionSummary[];
  NextPageToken?: string;
}
export const ListServiceActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceActionSummaries: S.optional(ServiceActionSummaries),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceActionsOutput",
}) as any as S.Schema<ListServiceActionsOutput>;
export interface ListServiceActionsForProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  PageSize?: number;
  PageToken?: string;
  AcceptLanguage?: string;
}
export const ListServiceActionsForProvisioningArtifactInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProductId: S.String,
      ProvisioningArtifactId: S.String,
      PageSize: S.optional(S.Number),
      PageToken: S.optional(S.String),
      AcceptLanguage: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListServiceActionsForProvisioningArtifactInput",
  }) as any as S.Schema<ListServiceActionsForProvisioningArtifactInput>;
export interface ListServiceActionsForProvisioningArtifactOutput {
  ServiceActionSummaries?: ServiceActionSummary[];
  NextPageToken?: string;
}
export const ListServiceActionsForProvisioningArtifactOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceActionSummaries: S.optional(ServiceActionSummaries),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListServiceActionsForProvisioningArtifactOutput",
  }) as any as S.Schema<ListServiceActionsForProvisioningArtifactOutput>;
export interface ListStackInstancesForProvisionedProductInput {
  AcceptLanguage?: string;
  ProvisionedProductId: string;
  PageToken?: string;
  PageSize?: number;
}
export const ListStackInstancesForProvisionedProductInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      ProvisionedProductId: S.String,
      PageToken: S.optional(S.String),
      PageSize: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListStackInstancesForProvisionedProductInput",
  }) as any as S.Schema<ListStackInstancesForProvisionedProductInput>;
export type StackInstanceStatus =
  | "CURRENT"
  | "OUTDATED"
  | "INOPERABLE"
  | (string & {});
export const StackInstanceStatus = /*@__PURE__*/ S.String;

export interface StackInstance {
  Account?: string;
  Region?: string;
  StackInstanceStatus?: StackInstanceStatus;
}
export const StackInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Account: S.optional(S.String),
    Region: S.optional(S.String),
    StackInstanceStatus: S.optional(StackInstanceStatus),
  }),
).annotate({ identifier: "StackInstance" }) as any as S.Schema<StackInstance>;
export type StackInstances = StackInstance[];
export const StackInstances = /*@__PURE__*/ S.Array(StackInstance);
export interface ListStackInstancesForProvisionedProductOutput {
  StackInstances?: StackInstance[];
  NextPageToken?: string;
}
export const ListStackInstancesForProvisionedProductOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StackInstances: S.optional(StackInstances),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListStackInstancesForProvisionedProductOutput",
  }) as any as S.Schema<ListStackInstancesForProvisionedProductOutput>;
export interface ListTagOptionsFilters {
  Key?: string;
  Value?: string;
  Active?: boolean;
}
export const ListTagOptionsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Active: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ListTagOptionsFilters",
}) as any as S.Schema<ListTagOptionsFilters>;
export interface ListTagOptionsInput {
  Filters?: ListTagOptionsFilters;
  PageSize?: number;
  PageToken?: string;
}
export const ListTagOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ListTagOptionsFilters),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagOptionsInput",
}) as any as S.Schema<ListTagOptionsInput>;
export interface ListTagOptionsOutput {
  TagOptionDetails?: TagOptionDetail[];
  PageToken?: string;
}
export const ListTagOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagOptionDetails: S.optional(TagOptionDetails),
    PageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTagOptionsOutput",
}) as any as S.Schema<ListTagOptionsOutput>;
export type EngineWorkflowToken = string;
export type EngineWorkflowStatus = "SUCCEEDED" | "FAILED" | (string & {});
export const EngineWorkflowStatus = /*@__PURE__*/ S.String;

export type EngineWorkflowFailureReason = string;
export type UniqueTagKey = string;
export type UniqueTagValue = string;
export interface UniqueTagResourceIdentifier {
  Key?: string;
  Value?: string;
}
export const UniqueTagResourceIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "UniqueTagResourceIdentifier",
}) as any as S.Schema<UniqueTagResourceIdentifier>;
export interface EngineWorkflowResourceIdentifier {
  UniqueTag?: UniqueTagResourceIdentifier;
}
export const EngineWorkflowResourceIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UniqueTag: S.optional(UniqueTagResourceIdentifier) }),
).annotate({
  identifier: "EngineWorkflowResourceIdentifier",
}) as any as S.Schema<EngineWorkflowResourceIdentifier>;
export interface NotifyProvisionProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  ResourceIdentifier?: EngineWorkflowResourceIdentifier;
  Outputs?: RecordOutput[];
  IdempotencyToken: string;
}
export const NotifyProvisionProductEngineWorkflowResultInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WorkflowToken: S.String,
      RecordId: S.String,
      Status: EngineWorkflowStatus,
      FailureReason: S.optional(S.String),
      ResourceIdentifier: S.optional(EngineWorkflowResourceIdentifier),
      Outputs: S.optional(RecordOutputs),
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "NotifyProvisionProductEngineWorkflowResultInput",
  }) as any as S.Schema<NotifyProvisionProductEngineWorkflowResultInput>;
export interface NotifyProvisionProductEngineWorkflowResultOutput {}
export const NotifyProvisionProductEngineWorkflowResultOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "NotifyProvisionProductEngineWorkflowResultOutput",
  }) as any as S.Schema<NotifyProvisionProductEngineWorkflowResultOutput>;
export interface NotifyTerminateProvisionedProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  IdempotencyToken: string;
}
export const NotifyTerminateProvisionedProductEngineWorkflowResultInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WorkflowToken: S.String,
      RecordId: S.String,
      Status: EngineWorkflowStatus,
      FailureReason: S.optional(S.String),
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "NotifyTerminateProvisionedProductEngineWorkflowResultInput",
  }) as any as S.Schema<NotifyTerminateProvisionedProductEngineWorkflowResultInput>;
export interface NotifyTerminateProvisionedProductEngineWorkflowResultOutput {}
export const NotifyTerminateProvisionedProductEngineWorkflowResultOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "NotifyTerminateProvisionedProductEngineWorkflowResultOutput",
  }) as any as S.Schema<NotifyTerminateProvisionedProductEngineWorkflowResultOutput>;
export interface NotifyUpdateProvisionedProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  Outputs?: RecordOutput[];
  IdempotencyToken: string;
}
export const NotifyUpdateProvisionedProductEngineWorkflowResultInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WorkflowToken: S.String,
      RecordId: S.String,
      Status: EngineWorkflowStatus,
      FailureReason: S.optional(S.String),
      Outputs: S.optional(RecordOutputs),
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "NotifyUpdateProvisionedProductEngineWorkflowResultInput",
  }) as any as S.Schema<NotifyUpdateProvisionedProductEngineWorkflowResultInput>;
export interface NotifyUpdateProvisionedProductEngineWorkflowResultOutput {}
export const NotifyUpdateProvisionedProductEngineWorkflowResultOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "NotifyUpdateProvisionedProductEngineWorkflowResultOutput",
  }) as any as S.Schema<NotifyUpdateProvisionedProductEngineWorkflowResultOutput>;
export interface ProvisioningParameter {
  Key?: string;
  Value?: string;
}
export const ProvisioningParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "ProvisioningParameter",
}) as any as S.Schema<ProvisioningParameter>;
export type ProvisioningParameters = ProvisioningParameter[];
export const ProvisioningParameters = /*@__PURE__*/ S.Array(
  ProvisioningParameter,
);
export type StackSetFailureToleranceCount = number;
export type StackSetFailureTolerancePercentage = number;
export type StackSetMaxConcurrencyCount = number;
export type StackSetMaxConcurrencyPercentage = number;
export interface ProvisioningPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
  StackSetFailureToleranceCount?: number;
  StackSetFailureTolerancePercentage?: number;
  StackSetMaxConcurrencyCount?: number;
  StackSetMaxConcurrencyPercentage?: number;
}
export const ProvisioningPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetAccounts: S.optional(StackSetAccounts),
    StackSetRegions: S.optional(StackSetRegions),
    StackSetFailureToleranceCount: S.optional(S.Number),
    StackSetFailureTolerancePercentage: S.optional(S.Number),
    StackSetMaxConcurrencyCount: S.optional(S.Number),
    StackSetMaxConcurrencyPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProvisioningPreferences",
}) as any as S.Schema<ProvisioningPreferences>;
export interface ProvisionProductInput {
  AcceptLanguage?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
  ProvisionedProductName: string;
  ProvisioningParameters?: ProvisioningParameter[];
  ProvisioningPreferences?: ProvisioningPreferences;
  Tags?: Tag[];
  NotificationArns?: string[];
  ProvisionToken: string;
}
export const ProvisionProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ProvisioningArtifactName: S.optional(S.String),
    PathId: S.optional(S.String),
    PathName: S.optional(S.String),
    ProvisionedProductName: S.String,
    ProvisioningParameters: S.optional(ProvisioningParameters),
    ProvisioningPreferences: S.optional(ProvisioningPreferences),
    Tags: S.optional(Tags),
    NotificationArns: S.optional(NotificationArns),
    ProvisionToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ProvisionProductInput",
}) as any as S.Schema<ProvisionProductInput>;
export interface ProvisionProductOutput {
  RecordDetail?: RecordDetail;
}
export const ProvisionProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordDetail: S.optional(RecordDetail) }),
).annotate({
  identifier: "ProvisionProductOutput",
}) as any as S.Schema<ProvisionProductOutput>;
export interface RejectPortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PortfolioShareType?: PortfolioShareType;
}
export const RejectPortfolioShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    PortfolioShareType: S.optional(PortfolioShareType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RejectPortfolioShareInput",
}) as any as S.Schema<RejectPortfolioShareInput>;
export interface RejectPortfolioShareOutput {}
export const RejectPortfolioShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectPortfolioShareOutput",
}) as any as S.Schema<RejectPortfolioShareOutput>;
export interface ScanProvisionedProductsInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  PageSize?: number;
  PageToken?: string;
}
export const ScanProvisionedProductsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    AccessLevelFilter: S.optional(AccessLevelFilter),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ScanProvisionedProductsInput",
}) as any as S.Schema<ScanProvisionedProductsInput>;
export type ProvisionedProductDetails = ProvisionedProductDetail[];
export const ProvisionedProductDetails = /*@__PURE__*/ S.Array(
  ProvisionedProductDetail,
);
export interface ScanProvisionedProductsOutput {
  ProvisionedProducts?: ProvisionedProductDetail[];
  NextPageToken?: string;
}
export const ScanProvisionedProductsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionedProducts: S.optional(ProvisionedProductDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ScanProvisionedProductsOutput",
}) as any as S.Schema<ScanProvisionedProductsOutput>;
export type ProductViewFilterBy =
  | "FullTextSearch"
  | "Owner"
  | "ProductType"
  | "SourceProductId"
  | (string & {});
export const ProductViewFilterBy = /*@__PURE__*/ S.String;

export type ProductViewFilterValue = string;
export type ProductViewFilterValues = string[];
export const ProductViewFilterValues = /*@__PURE__*/ S.Array(S.String);
export type ProductViewFilters = { [key in ProductViewFilterBy]?: string[] };
export const ProductViewFilters = /*@__PURE__*/ S.Record(
  ProductViewFilterBy,
  ProductViewFilterValues.pipe(S.optional),
);
export type ProductViewSortBy =
  | "Title"
  | "VersionCount"
  | "CreationDate"
  | (string & {});
export const ProductViewSortBy = /*@__PURE__*/ S.String;

export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export interface SearchProductsInput {
  AcceptLanguage?: string;
  Filters?: { [key: string]: string[] | undefined };
  PageSize?: number;
  SortBy?: ProductViewSortBy;
  SortOrder?: SortOrder;
  PageToken?: string;
}
export const SearchProductsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Filters: S.optional(ProductViewFilters),
    PageSize: S.optional(S.Number),
    SortBy: S.optional(ProductViewSortBy),
    SortOrder: S.optional(SortOrder),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchProductsInput",
}) as any as S.Schema<SearchProductsInput>;
export type ProductViewSummaries = ProductViewSummary[];
export const ProductViewSummaries = /*@__PURE__*/ S.Array(ProductViewSummary);
export type ProductViewAggregationType = string;
export type AttributeValue = string;
export type ApproximateCount = number;
export interface ProductViewAggregationValue {
  Value?: string;
  ApproximateCount?: number;
}
export const ProductViewAggregationValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    ApproximateCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProductViewAggregationValue",
}) as any as S.Schema<ProductViewAggregationValue>;
export type ProductViewAggregationValues = ProductViewAggregationValue[];
export const ProductViewAggregationValues = /*@__PURE__*/ S.Array(
  ProductViewAggregationValue,
);
export type ProductViewAggregations = {
  [key: string]: ProductViewAggregationValue[] | undefined;
};
export const ProductViewAggregations = /*@__PURE__*/ S.Record(
  S.String,
  ProductViewAggregationValues.pipe(S.optional),
);
export interface SearchProductsOutput {
  ProductViewSummaries?: ProductViewSummary[];
  ProductViewAggregations?: {
    [key: string]: ProductViewAggregationValue[] | undefined;
  };
  NextPageToken?: string;
}
export const SearchProductsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewSummaries: S.optional(ProductViewSummaries),
    ProductViewAggregations: S.optional(ProductViewAggregations),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchProductsOutput",
}) as any as S.Schema<SearchProductsOutput>;
export type ProductSource = "ACCOUNT" | (string & {});
export const ProductSource = /*@__PURE__*/ S.String;

export interface SearchProductsAsAdminInput {
  AcceptLanguage?: string;
  PortfolioId?: string;
  Filters?: { [key: string]: string[] | undefined };
  SortBy?: ProductViewSortBy;
  SortOrder?: SortOrder;
  PageToken?: string;
  PageSize?: number;
  ProductSource?: ProductSource;
}
export const SearchProductsAsAdminInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.optional(S.String),
    Filters: S.optional(ProductViewFilters),
    SortBy: S.optional(ProductViewSortBy),
    SortOrder: S.optional(SortOrder),
    PageToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
    ProductSource: S.optional(ProductSource),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchProductsAsAdminInput",
}) as any as S.Schema<SearchProductsAsAdminInput>;
export type ProductViewDetails = ProductViewDetail[];
export const ProductViewDetails = /*@__PURE__*/ S.Array(ProductViewDetail);
export interface SearchProductsAsAdminOutput {
  ProductViewDetails?: ProductViewDetail[];
  NextPageToken?: string;
}
export const SearchProductsAsAdminOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewDetails: S.optional(ProductViewDetails),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchProductsAsAdminOutput",
}) as any as S.Schema<SearchProductsAsAdminOutput>;
export type ProvisionedProductViewFilterBy = "SearchQuery" | (string & {});
export const ProvisionedProductViewFilterBy = /*@__PURE__*/ S.String;

export type ProvisionedProductViewFilterValue = string;
export type ProvisionedProductViewFilterValues = string[];
export const ProvisionedProductViewFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export type ProvisionedProductFilters = {
  [key in ProvisionedProductViewFilterBy]?: string[];
};
export const ProvisionedProductFilters = /*@__PURE__*/ S.Record(
  ProvisionedProductViewFilterBy,
  ProvisionedProductViewFilterValues.pipe(S.optional),
);
export type SortField = string;
export type SearchProvisionedProductsPageSize = number;
export interface SearchProvisionedProductsInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  Filters?: { [key: string]: string[] | undefined };
  SortBy?: string;
  SortOrder?: SortOrder;
  PageSize?: number;
  PageToken?: string;
}
export const SearchProvisionedProductsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    AccessLevelFilter: S.optional(AccessLevelFilter),
    Filters: S.optional(ProvisionedProductFilters),
    SortBy: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    PageSize: S.optional(S.Number),
    PageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchProvisionedProductsInput",
}) as any as S.Schema<SearchProvisionedProductsInput>;
export type UserArn = string;
export type UserArnSession = string;
export interface ProvisionedProductAttribute {
  Name?: string;
  Arn?: string;
  Type?: string;
  Id?: string;
  Status?: ProvisionedProductStatus;
  StatusMessage?: string;
  CreatedTime?: Date;
  IdempotencyToken?: string;
  LastRecordId?: string;
  LastProvisioningRecordId?: string;
  LastSuccessfulProvisioningRecordId?: string;
  Tags?: Tag[];
  PhysicalId?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  UserArn?: string;
  UserArnSession?: string;
}
export const ProvisionedProductAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    Id: S.optional(S.String),
    Status: S.optional(ProvisionedProductStatus),
    StatusMessage: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdempotencyToken: S.optional(S.String),
    LastRecordId: S.optional(S.String),
    LastProvisioningRecordId: S.optional(S.String),
    LastSuccessfulProvisioningRecordId: S.optional(S.String),
    Tags: S.optional(Tags),
    PhysicalId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ProvisioningArtifactName: S.optional(S.String),
    UserArn: S.optional(S.String),
    UserArnSession: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedProductAttribute",
}) as any as S.Schema<ProvisionedProductAttribute>;
export type ProvisionedProductAttributes = ProvisionedProductAttribute[];
export const ProvisionedProductAttributes = /*@__PURE__*/ S.Array(
  ProvisionedProductAttribute,
);
export type TotalResultsCount = number;
export interface SearchProvisionedProductsOutput {
  ProvisionedProducts?: ProvisionedProductAttribute[];
  TotalResultsCount?: number;
  NextPageToken?: string;
}
export const SearchProvisionedProductsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionedProducts: S.optional(ProvisionedProductAttributes),
    TotalResultsCount: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchProvisionedProductsOutput",
}) as any as S.Schema<SearchProvisionedProductsOutput>;
export type RetainPhysicalResources = boolean;
export interface TerminateProvisionedProductInput {
  ProvisionedProductName?: string;
  ProvisionedProductId?: string;
  TerminateToken: string;
  IgnoreErrors?: boolean;
  AcceptLanguage?: string;
  RetainPhysicalResources?: boolean;
}
export const TerminateProvisionedProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionedProductName: S.optional(S.String),
    ProvisionedProductId: S.optional(S.String),
    TerminateToken: S.String.pipe(T.IdempotencyToken()),
    IgnoreErrors: S.optional(S.Boolean),
    AcceptLanguage: S.optional(S.String),
    RetainPhysicalResources: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TerminateProvisionedProductInput",
}) as any as S.Schema<TerminateProvisionedProductInput>;
export interface TerminateProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export const TerminateProvisionedProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordDetail: S.optional(RecordDetail) }),
).annotate({
  identifier: "TerminateProvisionedProductOutput",
}) as any as S.Schema<TerminateProvisionedProductOutput>;
export interface UpdateConstraintInput {
  AcceptLanguage?: string;
  Id: string;
  Description?: string;
  Parameters?: string;
}
export const UpdateConstraintInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.String,
    Description: S.optional(S.String),
    Parameters: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateConstraintInput",
}) as any as S.Schema<UpdateConstraintInput>;
export interface UpdateConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export const UpdateConstraintOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstraintDetail: S.optional(ConstraintDetail),
    ConstraintParameters: S.optional(S.String),
    Status: S.optional(Status),
  }),
).annotate({
  identifier: "UpdateConstraintOutput",
}) as any as S.Schema<UpdateConstraintOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UpdatePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
  DisplayName?: string;
  Description?: string;
  ProviderName?: string;
  AddTags?: Tag[];
  RemoveTags?: string[];
}
export const UpdatePortfolioInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.String,
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    ProviderName: S.optional(S.String),
    AddTags: S.optional(AddTags),
    RemoveTags: S.optional(TagKeys),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePortfolioInput",
}) as any as S.Schema<UpdatePortfolioInput>;
export interface UpdatePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
}
export const UpdatePortfolioOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioDetail: S.optional(PortfolioDetail),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "UpdatePortfolioOutput",
}) as any as S.Schema<UpdatePortfolioOutput>;
export interface UpdatePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export const UpdatePortfolioShareInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    PortfolioId: S.String,
    AccountId: S.optional(S.String),
    OrganizationNode: S.optional(OrganizationNode),
    ShareTagOptions: S.optional(S.Boolean),
    SharePrincipals: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePortfolioShareInput",
}) as any as S.Schema<UpdatePortfolioShareInput>;
export interface UpdatePortfolioShareOutput {
  PortfolioShareToken?: string;
  Status?: ShareStatus;
}
export const UpdatePortfolioShareOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortfolioShareToken: S.optional(S.String),
    Status: S.optional(ShareStatus),
  }),
).annotate({
  identifier: "UpdatePortfolioShareOutput",
}) as any as S.Schema<UpdatePortfolioShareOutput>;
export interface UpdateProductInput {
  AcceptLanguage?: string;
  Id: string;
  Name?: string;
  Owner?: string;
  Description?: string;
  Distributor?: string;
  SupportDescription?: string;
  SupportEmail?: string;
  SupportUrl?: string;
  AddTags?: Tag[];
  RemoveTags?: string[];
  SourceConnection?: SourceConnection;
}
export const UpdateProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    Id: S.String,
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    Description: S.optional(S.String),
    Distributor: S.optional(S.String),
    SupportDescription: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportUrl: S.optional(S.String),
    AddTags: S.optional(AddTags),
    RemoveTags: S.optional(TagKeys),
    SourceConnection: S.optional(SourceConnection),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProductInput",
}) as any as S.Schema<UpdateProductInput>;
export interface UpdateProductOutput {
  ProductViewDetail?: ProductViewDetail;
  Tags?: Tag[];
}
export const UpdateProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductViewDetail: S.optional(ProductViewDetail),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "UpdateProductOutput",
}) as any as S.Schema<UpdateProductOutput>;
export type StackSetOperationType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | (string & {});
export const StackSetOperationType = /*@__PURE__*/ S.String;

export interface UpdateProvisioningPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
  StackSetFailureToleranceCount?: number;
  StackSetFailureTolerancePercentage?: number;
  StackSetMaxConcurrencyCount?: number;
  StackSetMaxConcurrencyPercentage?: number;
  StackSetOperationType?: StackSetOperationType;
}
export const UpdateProvisioningPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetAccounts: S.optional(StackSetAccounts),
    StackSetRegions: S.optional(StackSetRegions),
    StackSetFailureToleranceCount: S.optional(S.Number),
    StackSetFailureTolerancePercentage: S.optional(S.Number),
    StackSetMaxConcurrencyCount: S.optional(S.Number),
    StackSetMaxConcurrencyPercentage: S.optional(S.Number),
    StackSetOperationType: S.optional(StackSetOperationType),
  }),
).annotate({
  identifier: "UpdateProvisioningPreferences",
}) as any as S.Schema<UpdateProvisioningPreferences>;
export interface UpdateProvisionedProductInput {
  AcceptLanguage?: string;
  ProvisionedProductName?: string;
  ProvisionedProductId?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
  ProvisioningParameters?: UpdateProvisioningParameter[];
  ProvisioningPreferences?: UpdateProvisioningPreferences;
  Tags?: Tag[];
  UpdateToken: string;
}
export const UpdateProvisionedProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProvisionedProductName: S.optional(S.String),
    ProvisionedProductId: S.optional(S.String),
    ProductId: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProvisioningArtifactId: S.optional(S.String),
    ProvisioningArtifactName: S.optional(S.String),
    PathId: S.optional(S.String),
    PathName: S.optional(S.String),
    ProvisioningParameters: S.optional(UpdateProvisioningParameters),
    ProvisioningPreferences: S.optional(UpdateProvisioningPreferences),
    Tags: S.optional(Tags),
    UpdateToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProvisionedProductInput",
}) as any as S.Schema<UpdateProvisionedProductInput>;
export interface UpdateProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export const UpdateProvisionedProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordDetail: S.optional(RecordDetail) }),
).annotate({
  identifier: "UpdateProvisionedProductOutput",
}) as any as S.Schema<UpdateProvisionedProductOutput>;
export type PropertyKey = "OWNER" | "LAUNCH_ROLE" | (string & {});
export const PropertyKey = /*@__PURE__*/ S.String;

export type PropertyValue = string;
export type ProvisionedProductProperties = { [key in PropertyKey]?: string };
export const ProvisionedProductProperties = /*@__PURE__*/ S.Record(
  PropertyKey,
  S.String.pipe(S.optional),
);
export interface UpdateProvisionedProductPropertiesInput {
  AcceptLanguage?: string;
  ProvisionedProductId: string;
  ProvisionedProductProperties: { [key: string]: string | undefined };
  IdempotencyToken: string;
}
export const UpdateProvisionedProductPropertiesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceptLanguage: S.optional(S.String),
      ProvisionedProductId: S.String,
      ProvisionedProductProperties: ProvisionedProductProperties,
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateProvisionedProductPropertiesInput",
}) as any as S.Schema<UpdateProvisionedProductPropertiesInput>;
export interface UpdateProvisionedProductPropertiesOutput {
  ProvisionedProductId?: string;
  ProvisionedProductProperties?: { [key: string]: string | undefined };
  RecordId?: string;
  Status?: RecordStatus;
}
export const UpdateProvisionedProductPropertiesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProvisionedProductId: S.optional(S.String),
      ProvisionedProductProperties: S.optional(ProvisionedProductProperties),
      RecordId: S.optional(S.String),
      Status: S.optional(RecordStatus),
    }),
).annotate({
  identifier: "UpdateProvisionedProductPropertiesOutput",
}) as any as S.Schema<UpdateProvisionedProductPropertiesOutput>;
export interface UpdateProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
  Name?: string;
  Description?: string;
  Active?: boolean;
  Guidance?: ProvisioningArtifactGuidance;
}
export const UpdateProvisioningArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptLanguage: S.optional(S.String),
    ProductId: S.String,
    ProvisioningArtifactId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Active: S.optional(S.Boolean),
    Guidance: S.optional(ProvisioningArtifactGuidance),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProvisioningArtifactInput",
}) as any as S.Schema<UpdateProvisioningArtifactInput>;
export interface UpdateProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
}
export const UpdateProvisioningArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningArtifactDetail: S.optional(ProvisioningArtifactDetail),
    Info: S.optional(ProvisioningArtifactInfo),
    Status: S.optional(Status),
  }),
).annotate({
  identifier: "UpdateProvisioningArtifactOutput",
}) as any as S.Schema<UpdateProvisioningArtifactOutput>;
export interface UpdateServiceActionInput {
  Id: string;
  Name?: string;
  Definition?: { [key: string]: string | undefined };
  Description?: string;
  AcceptLanguage?: string;
}
export const UpdateServiceActionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.optional(S.String),
    Definition: S.optional(ServiceActionDefinitionMap),
    Description: S.optional(S.String),
    AcceptLanguage: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceActionInput",
}) as any as S.Schema<UpdateServiceActionInput>;
export interface UpdateServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export const UpdateServiceActionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceActionDetail: S.optional(ServiceActionDetail) }),
).annotate({
  identifier: "UpdateServiceActionOutput",
}) as any as S.Schema<UpdateServiceActionOutput>;
export interface UpdateTagOptionInput {
  Id: string;
  Value?: string;
  Active?: boolean;
}
export const UpdateTagOptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Value: S.optional(S.String),
    Active: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTagOptionInput",
}) as any as S.Schema<UpdateTagOptionInput>;
export interface UpdateTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export const UpdateTagOptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagOptionDetail: S.optional(TagOptionDetail) }),
).annotate({
  identifier: "UpdateTagOptionOutput",
}) as any as S.Schema<UpdateTagOptionOutput>;
export type ErrorMessage = string;
export type AcceptPortfolioShareError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Accepts an offer to share the specified portfolio.
 */
export const acceptPortfolioShare: API.OperationMethod<
  AcceptPortfolioShareInput,
  AcceptPortfolioShareOutput,
  AcceptPortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptPortfolioShareInput,
  output: AcceptPortfolioShareOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPortfolioShare",
}));

export type AssociateBudgetWithResourceError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified budget with the specified resource.
 */
export const associateBudgetWithResource: API.OperationMethod<
  AssociateBudgetWithResourceInput,
  AssociateBudgetWithResourceOutput,
  AssociateBudgetWithResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateBudgetWithResourceInput,
  output: AssociateBudgetWithResourceOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBudgetWithResource",
}));

export type AssociatePrincipalWithPortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified principal ARN with the specified portfolio.
 *
 * If you share the portfolio with principal name sharing enabled, the `PrincipalARN` association is
 * included in the share.
 *
 * The `PortfolioID`, `PrincipalARN`, and `PrincipalType` parameters are
 * required.
 *
 * You can associate a maximum of 10 Principals with a portfolio using `PrincipalType` as `IAM_PATTERN`.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const associatePrincipalWithPortfolio: API.OperationMethod<
  AssociatePrincipalWithPortfolioInput,
  AssociatePrincipalWithPortfolioOutput,
  AssociatePrincipalWithPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePrincipalWithPortfolioInput,
  output: AssociatePrincipalWithPortfolioOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePrincipalWithPortfolio",
}));

export type AssociateProductWithPortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified product with the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const associateProductWithPortfolio: API.OperationMethod<
  AssociateProductWithPortfolioInput,
  AssociateProductWithPortfolioOutput,
  AssociateProductWithPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateProductWithPortfolioInput,
  output: AssociateProductWithPortfolioOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProductWithPortfolio",
}));

export type AssociateServiceActionWithProvisioningArtifactError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a self-service action with a provisioning artifact.
 */
export const associateServiceActionWithProvisioningArtifact: API.OperationMethod<
  AssociateServiceActionWithProvisioningArtifactInput,
  AssociateServiceActionWithProvisioningArtifactOutput,
  AssociateServiceActionWithProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateServiceActionWithProvisioningArtifactInput,
  output: AssociateServiceActionWithProvisioningArtifactOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceActionWithProvisioningArtifact",
}));

export type AssociateTagOptionWithResourceError =
  | DuplicateResourceException
  | InvalidParametersException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Associate the specified TagOption with the specified portfolio or product.
 */
export const associateTagOptionWithResource: API.OperationMethod<
  AssociateTagOptionWithResourceInput,
  AssociateTagOptionWithResourceOutput,
  AssociateTagOptionWithResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateTagOptionWithResourceInput,
  output: AssociateTagOptionWithResourceOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTagOptionWithResource",
}));

export type BatchAssociateServiceActionWithProvisioningArtifactError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Associates multiple self-service actions with provisioning artifacts.
 */
export const batchAssociateServiceActionWithProvisioningArtifact: API.OperationMethod<
  BatchAssociateServiceActionWithProvisioningArtifactInput,
  BatchAssociateServiceActionWithProvisioningArtifactOutput,
  BatchAssociateServiceActionWithProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateServiceActionWithProvisioningArtifactInput,
  output: BatchAssociateServiceActionWithProvisioningArtifactOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateServiceActionWithProvisioningArtifact",
}));

export type BatchDisassociateServiceActionFromProvisioningArtifactError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Disassociates a batch of self-service actions from the specified provisioning artifact.
 */
export const batchDisassociateServiceActionFromProvisioningArtifact: API.OperationMethod<
  BatchDisassociateServiceActionFromProvisioningArtifactInput,
  BatchDisassociateServiceActionFromProvisioningArtifactOutput,
  BatchDisassociateServiceActionFromProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateServiceActionFromProvisioningArtifactInput,
  output: BatchDisassociateServiceActionFromProvisioningArtifactOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateServiceActionFromProvisioningArtifact",
}));

export type CopyProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Copies the specified source product to the specified target product or a new
 * product.
 *
 * You can copy a product to the same account or another account. You can copy a product
 * to the same Region or another Region. If you copy a product to another account, you must
 * first share the product in a portfolio using CreatePortfolioShare.
 *
 * This operation is performed asynchronously. To track the progress of the
 * operation, use DescribeCopyProductStatus.
 */
export const copyProduct: API.OperationMethod<
  CopyProductInput,
  CopyProductOutput,
  CopyProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyProductInput,
  output: CopyProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyProduct",
}));

export type CreateConstraintError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a constraint.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const createConstraint: API.OperationMethod<
  CreateConstraintInput,
  CreateConstraintOutput,
  CreateConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConstraintInput,
  output: CreateConstraintOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConstraint",
}));

export type CreatePortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const createPortfolio: API.OperationMethod<
  CreatePortfolioInput,
  CreatePortfolioOutput,
  CreatePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortfolioInput,
  output: CreatePortfolioOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortfolio",
}));

export type CreatePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | LimitExceededException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Shares the specified portfolio with the specified account or organization node.
 * Shares to an organization node can only be created by the management account of an
 * organization or by a delegated administrator. You can share portfolios to an organization,
 * an organizational unit, or a specific account.
 *
 * Note that if a delegated admin is de-registered, they can no longer create portfolio shares.
 *
 * `AWSOrganizationsAccess` must be enabled in order to create a portfolio share to an organization node.
 *
 * You can't share a shared resource, including portfolios that contain a shared product.
 *
 * If the portfolio share with the specified account or organization node already exists, this action will have no effect
 * and will not return an error. To update an existing share, you must use the ` UpdatePortfolioShare` API instead.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const createPortfolioShare: API.OperationMethod<
  CreatePortfolioShareInput,
  CreatePortfolioShareOutput,
  CreatePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortfolioShareInput,
  output: CreatePortfolioShareOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    LimitExceededException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortfolioShare",
}));

export type CreateProductError =
  | InvalidParametersException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a product.
 *
 * A delegated admin is authorized to invoke this command.
 *
 * The user or role that performs this operation must have the
 * `cloudformation:GetTemplate` IAM policy permission. This policy permission is
 * required when using the `ImportFromPhysicalId` template source in the
 * information data section.
 */
export const createProduct: API.OperationMethod<
  CreateProductInput,
  CreateProductOutput,
  CreateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProductInput,
  output: CreateProductOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProduct",
}));

export type CreateProvisionedProductPlanError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a plan.
 *
 * A plan includes the list of resources to be
 * created (when provisioning a new product) or modified (when updating a provisioned product)
 * when the plan is executed.
 *
 * You can create one plan for each provisioned product. To create a plan for an existing
 * provisioned product, the product status must be AVAILABLE or TAINTED.
 *
 * To view the resource changes in the change set, use DescribeProvisionedProductPlan.
 * To create or modify the provisioned product, use ExecuteProvisionedProductPlan.
 */
export const createProvisionedProductPlan: API.OperationMethod<
  CreateProvisionedProductPlanInput,
  CreateProvisionedProductPlanOutput,
  CreateProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisionedProductPlanInput,
  output: CreateProvisionedProductPlanOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisionedProductPlan",
}));

export type CreateProvisioningArtifactError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot create a provisioning artifact for a product that was shared with you.
 *
 * The user or role that performs this operation must have the `cloudformation:GetTemplate`
 * IAM policy permission. This policy permission is required when using the
 * `ImportFromPhysicalId` template source in the information data section.
 */
export const createProvisioningArtifact: API.OperationMethod<
  CreateProvisioningArtifactInput,
  CreateProvisioningArtifactOutput,
  CreateProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisioningArtifactInput,
  output: CreateProvisioningArtifactOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningArtifact",
}));

export type CreateServiceActionError =
  | InvalidParametersException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a self-service action.
 */
export const createServiceAction: API.OperationMethod<
  CreateServiceActionInput,
  CreateServiceActionOutput,
  CreateServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceActionInput,
  output: CreateServiceActionOutput,
  errors: [InvalidParametersException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceAction",
}));

export type CreateTagOptionError =
  | DuplicateResourceException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a TagOption.
 */
export const createTagOption: API.OperationMethod<
  CreateTagOptionInput,
  CreateTagOptionOutput,
  CreateTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagOptionInput,
  output: CreateTagOptionOutput,
  errors: [
    DuplicateResourceException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTagOption",
}));

export type DeleteConstraintError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified constraint.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deleteConstraint: API.OperationMethod<
  DeleteConstraintInput,
  DeleteConstraintOutput,
  DeleteConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConstraintInput,
  output: DeleteConstraintOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConstraint",
}));

export type DeletePortfolioError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified portfolio.
 *
 * You cannot delete a portfolio if it was shared with you or if it has associated
 * products, users, constraints, or shared accounts.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deletePortfolio: API.OperationMethod<
  DeletePortfolioInput,
  DeletePortfolioOutput,
  DeletePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortfolioInput,
  output: DeletePortfolioOutput,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolio",
}));

export type DeletePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops sharing the specified portfolio with the specified account or organization
 * node. Shares to an organization node can only be deleted by the management account of an
 * organization or by a delegated administrator.
 *
 * Note that if a delegated admin is de-registered, portfolio shares created from that account are removed.
 */
export const deletePortfolioShare: API.OperationMethod<
  DeletePortfolioShareInput,
  DeletePortfolioShareOutput,
  DeletePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortfolioShareInput,
  output: DeletePortfolioShareOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolioShare",
}));

export type DeleteProductError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified product.
 *
 * You cannot delete a product if it was shared with you or is associated with a portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deleteProduct: API.OperationMethod<
  DeleteProductInput,
  DeleteProductOutput,
  DeleteProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProductInput,
  output: DeleteProductOutput,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProduct",
}));

export type DeleteProvisionedProductPlanError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified plan.
 */
export const deleteProvisionedProductPlan: API.OperationMethod<
  DeleteProvisionedProductPlanInput,
  DeleteProvisionedProductPlanOutput,
  DeleteProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisionedProductPlanInput,
  output: DeleteProvisionedProductPlanOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedProductPlan",
}));

export type DeleteProvisioningArtifactError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot delete a provisioning artifact associated with a product that was shared with you.
 * You cannot delete the last provisioning artifact for a product, because a product must have at
 * least one provisioning artifact.
 */
export const deleteProvisioningArtifact: API.OperationMethod<
  DeleteProvisioningArtifactInput,
  DeleteProvisioningArtifactOutput,
  DeleteProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisioningArtifactInput,
  output: DeleteProvisioningArtifactOutput,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningArtifact",
}));

export type DeleteServiceActionError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a self-service action.
 */
export const deleteServiceAction: API.OperationMethod<
  DeleteServiceActionInput,
  DeleteServiceActionOutput,
  DeleteServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceActionInput,
  output: DeleteServiceActionOutput,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAction",
}));

export type DeleteTagOptionError =
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified TagOption.
 *
 * You cannot delete a TagOption if it is associated with a product or portfolio.
 */
export const deleteTagOption: API.OperationMethod<
  DeleteTagOptionInput,
  DeleteTagOptionOutput,
  DeleteTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagOptionInput,
  output: DeleteTagOptionOutput,
  errors: [
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTagOption",
}));

export type DescribeConstraintError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified constraint.
 */
export const describeConstraint: API.OperationMethod<
  DescribeConstraintInput,
  DescribeConstraintOutput,
  DescribeConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConstraintInput,
  output: DescribeConstraintOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConstraint",
}));

export type DescribeCopyProductStatusError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of the specified copy product operation.
 */
export const describeCopyProductStatus: API.OperationMethod<
  DescribeCopyProductStatusInput,
  DescribeCopyProductStatusOutput,
  DescribeCopyProductStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCopyProductStatusInput,
  output: DescribeCopyProductStatusOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCopyProductStatus",
}));

export type DescribePortfolioError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const describePortfolio: API.OperationMethod<
  DescribePortfolioInput,
  DescribePortfolioOutput,
  DescribePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePortfolioInput,
  output: DescribePortfolioOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolio",
}));

export type DescribePortfolioSharesError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a summary of each of the portfolio shares that were created for the specified portfolio.
 *
 * You can use this API to determine which accounts or organizational nodes this
 * portfolio have been shared, whether the recipient entity has imported the share, and
 * whether TagOptions are included with the share.
 *
 * The `PortfolioId` and `Type` parameters are both required.
 */
export const describePortfolioShares: API.PaginatedOperationMethod<
  DescribePortfolioSharesInput,
  DescribePortfolioSharesOutput,
  DescribePortfolioSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePortfolioSharesInput,
  output: DescribePortfolioSharesOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolioShares",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribePortfolioShareStatusError =
  | InvalidParametersException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of the specified portfolio share operation. This API can only be called
 * by the management account in the organization or by a delegated admin.
 */
export const describePortfolioShareStatus: API.OperationMethod<
  DescribePortfolioShareStatusInput,
  DescribePortfolioShareStatusOutput,
  DescribePortfolioShareStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePortfolioShareStatusInput,
  output: DescribePortfolioShareStatusOutput,
  errors: [
    InvalidParametersException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolioShareStatus",
}));

export type DescribeProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product.
 *
 * Running this operation
 * with administrator access
 * results
 * in a failure.
 * DescribeProductAsAdmin should be used instead.
 */
export const describeProduct: API.OperationMethod<
  DescribeProductInput,
  DescribeProductOutput,
  DescribeProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProductInput,
  output: DescribeProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProduct",
}));

export type DescribeProductAsAdminError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product. This operation is run with administrator access.
 */
export const describeProductAsAdmin: API.OperationMethod<
  DescribeProductAsAdminInput,
  DescribeProductAsAdminOutput,
  DescribeProductAsAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProductAsAdminInput,
  output: DescribeProductAsAdminOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductAsAdmin",
}));

export type DescribeProductViewError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product.
 */
export const describeProductView: API.OperationMethod<
  DescribeProductViewInput,
  DescribeProductViewOutput,
  DescribeProductViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProductViewInput,
  output: DescribeProductViewOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductView",
}));

export type DescribeProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified provisioned product.
 */
export const describeProvisionedProduct: API.OperationMethod<
  DescribeProvisionedProductInput,
  DescribeProvisionedProductOutput,
  DescribeProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisionedProductInput,
  output: DescribeProvisionedProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProduct",
}));

export type DescribeProvisionedProductPlanError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the resource changes for the specified plan.
 */
export const describeProvisionedProductPlan: API.OperationMethod<
  DescribeProvisionedProductPlanInput,
  DescribeProvisionedProductPlanOutput,
  DescribeProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisionedProductPlanInput,
  output: DescribeProvisionedProductPlanOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProductPlan",
}));

export type DescribeProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified provisioning artifact (also known as a version) for the specified product.
 */
export const describeProvisioningArtifact: API.OperationMethod<
  DescribeProvisioningArtifactInput,
  DescribeProvisioningArtifactOutput,
  DescribeProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisioningArtifactInput,
  output: DescribeProvisioningArtifactOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningArtifact",
}));

export type DescribeProvisioningParametersError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the configuration required to provision the specified product using
 * the specified provisioning artifact.
 *
 * If the output contains a TagOption key with an empty list of values, there is a
 * TagOption conflict for that key. The end user cannot take action to fix the conflict, and
 * launch is not blocked. In subsequent calls to ProvisionProduct,
 * do not include conflicted TagOption keys as tags, or this causes the error
 * "Parameter validation failed: Missing required parameter in Tags[*N*]:*Value*".
 * Tag the provisioned product with the value `sc-tagoption-conflict-portfolioId-productId`.
 */
export const describeProvisioningParameters: API.OperationMethod<
  DescribeProvisioningParametersInput,
  DescribeProvisioningParametersOutput,
  DescribeProvisioningParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisioningParametersInput,
  output: DescribeProvisioningParametersOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningParameters",
}));

export type DescribeRecordError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified request operation.
 *
 * Use this operation after calling a request operation (for example, ProvisionProduct,
 * TerminateProvisionedProduct, or UpdateProvisionedProduct).
 *
 * If a provisioned product was transferred to a new owner using UpdateProvisionedProductProperties, the new owner
 * will be able to describe all past records for that product. The previous owner will no longer be able to describe the records, but will be able to
 * use ListRecordHistory to see the product's history from when he was the owner.
 */
export const describeRecord: API.OperationMethod<
  DescribeRecordInput,
  DescribeRecordOutput,
  DescribeRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRecordInput,
  output: DescribeRecordOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecord",
}));

export type DescribeServiceActionError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a self-service action.
 */
export const describeServiceAction: API.OperationMethod<
  DescribeServiceActionInput,
  DescribeServiceActionOutput,
  DescribeServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceActionInput,
  output: DescribeServiceActionOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceAction",
}));

export type DescribeServiceActionExecutionParametersError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Finds the default parameters for a specific self-service action on a specific provisioned product and returns a map of the results to the user.
 */
export const describeServiceActionExecutionParameters: API.OperationMethod<
  DescribeServiceActionExecutionParametersInput,
  DescribeServiceActionExecutionParametersOutput,
  DescribeServiceActionExecutionParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceActionExecutionParametersInput,
  output: DescribeServiceActionExecutionParametersOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceActionExecutionParameters",
}));

export type DescribeTagOptionError =
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Gets information about the specified TagOption.
 */
export const describeTagOption: API.OperationMethod<
  DescribeTagOptionInput,
  DescribeTagOptionOutput,
  DescribeTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTagOptionInput,
  output: DescribeTagOptionOutput,
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTagOption",
}));

export type DisableAWSOrganizationsAccessError =
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disable portfolio sharing through the Organizations service. This command will not
 * delete your current shares, but prevents you from creating new shares throughout your
 * organization. Current shares are not kept in sync with your organization structure if the structure
 * changes after calling this API. Only the management account in the organization can call this API.
 *
 * You cannot call this API if there are active delegated administrators in the organization.
 *
 * Note that a delegated administrator is not authorized to invoke `DisableAWSOrganizationsAccess`.
 *
 * If you share an Service Catalog portfolio in an organization within
 * Organizations, and then disable Organizations access for Service Catalog,
 * the portfolio access permissions will not sync with the latest changes to the organization
 * structure. Specifically, accounts that you removed from the organization after
 * disabling Service Catalog access will retain access to the previously shared portfolio.
 */
export const disableAWSOrganizationsAccess: API.OperationMethod<
  DisableAWSOrganizationsAccessInput,
  DisableAWSOrganizationsAccessOutput,
  DisableAWSOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableAWSOrganizationsAccessInput,
  output: DisableAWSOrganizationsAccessOutput,
  errors: [
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAWSOrganizationsAccess",
}));

export type DisassociateBudgetFromResourceError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified budget from the specified resource.
 */
export const disassociateBudgetFromResource: API.OperationMethod<
  DisassociateBudgetFromResourceInput,
  DisassociateBudgetFromResourceOutput,
  DisassociateBudgetFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateBudgetFromResourceInput,
  output: DisassociateBudgetFromResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBudgetFromResource",
}));

export type DisassociatePrincipalFromPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a previously associated principal ARN from a specified
 * portfolio.
 *
 * The `PrincipalType` and `PrincipalARN` must match the
 * `AssociatePrincipalWithPortfolio` call request details. For example,
 * to disassociate an association created with a `PrincipalARN` of `PrincipalType`
 * IAM you must use the `PrincipalType` IAM when calling `DisassociatePrincipalFromPortfolio`.
 *
 * For portfolios that have been shared with principal name sharing enabled: after disassociating a principal,
 * share recipient accounts will no longer be able to provision products in this portfolio using a role matching the name
 * of the associated principal.
 *
 * For more information, review associate-principal-with-portfolio
 * in the Amazon Web Services CLI Command Reference.
 *
 * If you disassociate a principal from a portfolio, with PrincipalType as `IAM`, the same principal will
 * still have access to the portfolio if it matches one of the associated principals of type `IAM_PATTERN`.
 * To fully remove access for a principal, verify all the associated Principals of type `IAM_PATTERN`,
 * and then ensure you disassociate any `IAM_PATTERN` principals that match the principal
 * whose access you are removing.
 */
export const disassociatePrincipalFromPortfolio: API.OperationMethod<
  DisassociatePrincipalFromPortfolioInput,
  DisassociatePrincipalFromPortfolioOutput,
  DisassociatePrincipalFromPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociatePrincipalFromPortfolioInput,
  output: DisassociatePrincipalFromPortfolioOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePrincipalFromPortfolio",
}));

export type DisassociateProductFromPortfolioError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified product from the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const disassociateProductFromPortfolio: API.OperationMethod<
  DisassociateProductFromPortfolioInput,
  DisassociateProductFromPortfolioOutput,
  DisassociateProductFromPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateProductFromPortfolioInput,
  output: DisassociateProductFromPortfolioOutput,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateProductFromPortfolio",
}));

export type DisassociateServiceActionFromProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified self-service action association from the specified provisioning artifact.
 */
export const disassociateServiceActionFromProvisioningArtifact: API.OperationMethod<
  DisassociateServiceActionFromProvisioningArtifactInput,
  DisassociateServiceActionFromProvisioningArtifactOutput,
  DisassociateServiceActionFromProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateServiceActionFromProvisioningArtifactInput,
  output: DisassociateServiceActionFromProvisioningArtifactOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceActionFromProvisioningArtifact",
}));

export type DisassociateTagOptionFromResourceError =
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Disassociates the specified TagOption from the specified resource.
 */
export const disassociateTagOptionFromResource: API.OperationMethod<
  DisassociateTagOptionFromResourceInput,
  DisassociateTagOptionFromResourceOutput,
  DisassociateTagOptionFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateTagOptionFromResourceInput,
  output: DisassociateTagOptionFromResourceOutput,
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTagOptionFromResource",
}));

export type EnableAWSOrganizationsAccessError =
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enable portfolio sharing feature through Organizations. This API will allow Service Catalog to receive updates on your organization in order to sync your shares with the
 * current structure. This API can only be called by the management account in the organization.
 *
 * When you call this API, Service Catalog calls `organizations:EnableAWSServiceAccess` on your behalf so that your shares stay in sync with any changes in your Organizations structure.
 *
 * Note that a delegated administrator is not authorized to invoke `EnableAWSOrganizationsAccess`.
 *
 * If you have previously disabled Organizations access for Service Catalog, and then
 * enable access again, the portfolio access permissions might not sync with the latest changes to
 * the organization structure. Specifically, accounts that you removed from the organization after
 * disabling Service Catalog access, and before you enabled access again, can retain access to the
 * previously shared portfolio. As a result, an account that has been removed from the organization
 * might still be able to create or manage Amazon Web Services resources when it is no longer
 * authorized to do so. Amazon Web Services is working to resolve this issue.
 */
export const enableAWSOrganizationsAccess: API.OperationMethod<
  EnableAWSOrganizationsAccessInput,
  EnableAWSOrganizationsAccessOutput,
  EnableAWSOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableAWSOrganizationsAccessInput,
  output: EnableAWSOrganizationsAccessOutput,
  errors: [
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAWSOrganizationsAccess",
}));

export type ExecuteProvisionedProductPlanError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provisions or modifies a product based on the resource changes for the specified plan.
 */
export const executeProvisionedProductPlan: API.OperationMethod<
  ExecuteProvisionedProductPlanInput,
  ExecuteProvisionedProductPlanOutput,
  ExecuteProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteProvisionedProductPlanInput,
  output: ExecuteProvisionedProductPlanOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductPlan",
}));

export type ExecuteProvisionedProductServiceActionError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | ProvisionedProductNotFound
  | CommonErrors;
/**
 * Executes a self-service action against a provisioned product.
 */
export const executeProvisionedProductServiceAction: API.OperationMethod<
  ExecuteProvisionedProductServiceActionInput,
  ExecuteProvisionedProductServiceActionOutput,
  ExecuteProvisionedProductServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteProvisionedProductServiceActionInput,
  output: ExecuteProvisionedProductServiceActionOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
    ProvisionedProductNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductServiceAction",
}));

export type GetAWSOrganizationsAccessStatusError =
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get the Access Status for Organizations portfolio share feature. This API can only be
 * called by the management account in the organization or by a delegated admin.
 */
export const getAWSOrganizationsAccessStatus: API.OperationMethod<
  GetAWSOrganizationsAccessStatusInput,
  GetAWSOrganizationsAccessStatusOutput,
  GetAWSOrganizationsAccessStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAWSOrganizationsAccessStatusInput,
  output: GetAWSOrganizationsAccessStatusOutput,
  errors: [OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAWSOrganizationsAccessStatus",
}));

export type GetProvisionedProductOutputsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API takes either a `ProvisonedProductId` or a `ProvisionedProductName`, along with a list of one or more output keys, and responds with the key/value pairs of those outputs.
 */
export const getProvisionedProductOutputs: API.PaginatedOperationMethod<
  GetProvisionedProductOutputsInput,
  GetProvisionedProductOutputsOutput,
  GetProvisionedProductOutputsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetProvisionedProductOutputsInput,
  output: GetProvisionedProductOutputsOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedProductOutputs",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ImportAsProvisionedProductError =
  | DuplicateResourceException
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests the import of a resource as an Service Catalog provisioned product
 * that is associated to an Service Catalog product and provisioning artifact.
 * Once imported, all supported governance actions are supported on the provisioned product.
 *
 * Resource import only supports CloudFormation stack ARNs. CloudFormation StackSets,
 * and non-root nested stacks, are not supported.
 *
 * The CloudFormation stack must have one
 * of the following statuses
 * to be imported: `CREATE_COMPLETE`, `UPDATE_COMPLETE`,
 * `UPDATE_ROLLBACK_COMPLETE`, `IMPORT_COMPLETE`, and
 * `IMPORT_ROLLBACK_COMPLETE`.
 *
 * Import of the resource requires that the CloudFormation stack template matches
 * the associated Service Catalog product provisioning artifact.
 *
 * When you import an existing CloudFormation stack
 * into a portfolio, Service Catalog does not apply the product's associated constraints
 * during the import process. Service Catalog applies the constraints
 * after you call `UpdateProvisionedProduct` for the provisioned product.
 *
 * The user or role that performs this operation must have the `cloudformation:GetTemplate`
 * and `cloudformation:DescribeStacks` IAM policy permissions.
 *
 * You can only import one provisioned product at a time. The product's CloudFormation stack must have the
 * `IMPORT_COMPLETE` status before you import another.
 */
export const importAsProvisionedProduct: API.OperationMethod<
  ImportAsProvisionedProductInput,
  ImportAsProvisionedProductOutput,
  ImportAsProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportAsProvisionedProductInput,
  output: ImportAsProvisionedProductOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportAsProvisionedProduct",
}));

export type ListAcceptedPortfolioSharesError =
  | InvalidParametersException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Lists all imported portfolios for which account-to-account shares were accepted by
 * this account. By specifying the `PortfolioShareType`, you can list portfolios for which
 * organizational shares were accepted by this account.
 */
export const listAcceptedPortfolioShares: API.PaginatedOperationMethod<
  ListAcceptedPortfolioSharesInput,
  ListAcceptedPortfolioSharesOutput,
  ListAcceptedPortfolioSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcceptedPortfolioSharesInput,
  output: ListAcceptedPortfolioSharesOutput,
  errors: [InvalidParametersException, OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcceptedPortfolioShares",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListBudgetsForResourceError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all the budgets associated to the specified resource.
 */
export const listBudgetsForResource: API.PaginatedOperationMethod<
  ListBudgetsForResourceInput,
  ListBudgetsForResourceOutput,
  ListBudgetsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBudgetsForResourceInput,
  output: ListBudgetsForResourceOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBudgetsForResource",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListConstraintsForPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the constraints for the specified portfolio and product.
 */
export const listConstraintsForPortfolio: API.PaginatedOperationMethod<
  ListConstraintsForPortfolioInput,
  ListConstraintsForPortfolioOutput,
  ListConstraintsForPortfolioError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConstraintsForPortfolioInput,
  output: ListConstraintsForPortfolioOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConstraintsForPortfolio",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListLaunchPathsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the paths
 * to the specified product.
 * A path describes
 * how the user
 * gets access
 * to a specified product
 * and is necessary
 * when provisioning a product.
 * A path also determines the constraints
 * that are put on a product.
 * A path is dependent
 * on a specific product, porfolio, and principal.
 *
 * When provisioning a product
 * that's been added
 * to a portfolio,
 * you must grant your user, group, or role access
 * to the portfolio.
 * For more information,
 * see Granting users access
 * in the *Service Catalog User Guide*.
 */
export const listLaunchPaths: API.PaginatedOperationMethod<
  ListLaunchPathsInput,
  ListLaunchPathsOutput,
  ListLaunchPathsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLaunchPathsInput,
  output: ListLaunchPathsOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLaunchPaths",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListOrganizationPortfolioAccessError =
  | InvalidParametersException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the organization nodes that have access to the specified portfolio. This API can
 * only be called by the management account in the organization or by a delegated
 * admin.
 *
 * If a delegated admin is de-registered, they can no longer perform this operation.
 */
export const listOrganizationPortfolioAccess: API.PaginatedOperationMethod<
  ListOrganizationPortfolioAccessInput,
  ListOrganizationPortfolioAccessOutput,
  ListOrganizationPortfolioAccessError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationPortfolioAccessInput,
  output: ListOrganizationPortfolioAccessOutput,
  errors: [
    InvalidParametersException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationPortfolioAccess",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfolioAccessError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the account IDs that have access to the specified portfolio.
 *
 * A delegated admin can list the accounts that have access to the shared portfolio. Note that if a delegated admin is de-registered, they can no longer perform this operation.
 */
export const listPortfolioAccess: API.PaginatedOperationMethod<
  ListPortfolioAccessInput,
  ListPortfolioAccessOutput,
  ListPortfolioAccessError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPortfolioAccessInput,
  output: ListPortfolioAccessOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfolioAccess",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfoliosError = InvalidParametersException | CommonErrors;
/**
 * Lists all portfolios in the catalog.
 */
export const listPortfolios: API.PaginatedOperationMethod<
  ListPortfoliosInput,
  ListPortfoliosOutput,
  ListPortfoliosError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPortfoliosInput,
  output: ListPortfoliosOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfolios",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfoliosForProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all portfolios that the specified product is associated with.
 */
export const listPortfoliosForProduct: API.PaginatedOperationMethod<
  ListPortfoliosForProductInput,
  ListPortfoliosForProductOutput,
  ListPortfoliosForProductError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPortfoliosForProductInput,
  output: ListPortfoliosForProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfoliosForProduct",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPrincipalsForPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all `PrincipalARN`s and corresponding `PrincipalType`s associated with the specified portfolio.
 */
export const listPrincipalsForPortfolio: API.PaginatedOperationMethod<
  ListPrincipalsForPortfolioInput,
  ListPrincipalsForPortfolioOutput,
  ListPrincipalsForPortfolioError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrincipalsForPortfolioInput,
  output: ListPrincipalsForPortfolioOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalsForPortfolio",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListProvisionedProductPlansError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the plans for the specified provisioned product or all plans to which the user has access.
 */
export const listProvisionedProductPlans: API.OperationMethod<
  ListProvisionedProductPlansInput,
  ListProvisionedProductPlansOutput,
  ListProvisionedProductPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListProvisionedProductPlansInput,
  output: ListProvisionedProductPlansOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedProductPlans",
}));

export type ListProvisioningArtifactsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all provisioning artifacts (also known as versions) for the specified product.
 */
export const listProvisioningArtifacts: API.OperationMethod<
  ListProvisioningArtifactsInput,
  ListProvisioningArtifactsOutput,
  ListProvisioningArtifactsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListProvisioningArtifactsInput,
  output: ListProvisioningArtifactsOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningArtifacts",
}));

export type ListProvisioningArtifactsForServiceActionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all provisioning artifacts (also known as versions) for the specified self-service action.
 */
export const listProvisioningArtifactsForServiceAction: API.PaginatedOperationMethod<
  ListProvisioningArtifactsForServiceActionInput,
  ListProvisioningArtifactsForServiceActionOutput,
  ListProvisioningArtifactsForServiceActionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisioningArtifactsForServiceActionInput,
  output: ListProvisioningArtifactsForServiceActionOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningArtifactsForServiceAction",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRecordHistoryError = InvalidParametersException | CommonErrors;
/**
 * Lists the specified requests or all performed requests.
 */
export const listRecordHistory: API.OperationMethod<
  ListRecordHistoryInput,
  ListRecordHistoryOutput,
  ListRecordHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRecordHistoryInput,
  output: ListRecordHistoryOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecordHistory",
}));

export type ListResourcesForTagOptionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Lists the resources associated with the specified TagOption.
 */
export const listResourcesForTagOption: API.PaginatedOperationMethod<
  ListResourcesForTagOptionInput,
  ListResourcesForTagOptionOutput,
  ListResourcesForTagOptionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesForTagOptionInput,
  output: ListResourcesForTagOptionOutput,
  errors: [
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesForTagOption",
  pagination: {
    inputToken: "PageToken",
    outputToken: "PageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListServiceActionsError = InvalidParametersException | CommonErrors;
/**
 * Lists all self-service actions.
 */
export const listServiceActions: API.PaginatedOperationMethod<
  ListServiceActionsInput,
  ListServiceActionsOutput,
  ListServiceActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceActionsInput,
  output: ListServiceActionsOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceActions",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListServiceActionsForProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a paginated list of self-service actions associated with the specified Product ID and Provisioning Artifact ID.
 */
export const listServiceActionsForProvisioningArtifact: API.PaginatedOperationMethod<
  ListServiceActionsForProvisioningArtifactInput,
  ListServiceActionsForProvisioningArtifactOutput,
  ListServiceActionsForProvisioningArtifactError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceActionsForProvisioningArtifactInput,
  output: ListServiceActionsForProvisioningArtifactOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceActionsForProvisioningArtifact",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListStackInstancesForProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns summary information about stack instances that are associated with the specified `CFN_STACKSET` type provisioned product. You can filter for stack instances that are associated with a specific Amazon Web Services account name or Region.
 */
export const listStackInstancesForProvisionedProduct: API.OperationMethod<
  ListStackInstancesForProvisionedProductInput,
  ListStackInstancesForProvisionedProductOutput,
  ListStackInstancesForProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStackInstancesForProvisionedProductInput,
  output: ListStackInstancesForProvisionedProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstancesForProvisionedProduct",
}));

export type ListTagOptionsError =
  | InvalidParametersException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Lists the specified TagOptions or all TagOptions.
 */
export const listTagOptions: API.PaginatedOperationMethod<
  ListTagOptionsInput,
  ListTagOptionsOutput,
  ListTagOptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagOptionsInput,
  output: ListTagOptionsOutput,
  errors: [InvalidParametersException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagOptions",
  pagination: {
    inputToken: "PageToken",
    outputToken: "PageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type NotifyProvisionProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the provisioning engine execution.
 */
export const notifyProvisionProductEngineWorkflowResult: API.OperationMethod<
  NotifyProvisionProductEngineWorkflowResultInput,
  NotifyProvisionProductEngineWorkflowResultOutput,
  NotifyProvisionProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyProvisionProductEngineWorkflowResultInput,
  output: NotifyProvisionProductEngineWorkflowResultOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyProvisionProductEngineWorkflowResult",
}));

export type NotifyTerminateProvisionedProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the terminate engine execution.
 */
export const notifyTerminateProvisionedProductEngineWorkflowResult: API.OperationMethod<
  NotifyTerminateProvisionedProductEngineWorkflowResultInput,
  NotifyTerminateProvisionedProductEngineWorkflowResultOutput,
  NotifyTerminateProvisionedProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyTerminateProvisionedProductEngineWorkflowResultInput,
  output: NotifyTerminateProvisionedProductEngineWorkflowResultOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyTerminateProvisionedProductEngineWorkflowResult",
}));

export type NotifyUpdateProvisionedProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the update engine execution.
 */
export const notifyUpdateProvisionedProductEngineWorkflowResult: API.OperationMethod<
  NotifyUpdateProvisionedProductEngineWorkflowResultInput,
  NotifyUpdateProvisionedProductEngineWorkflowResultOutput,
  NotifyUpdateProvisionedProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyUpdateProvisionedProductEngineWorkflowResultInput,
  output: NotifyUpdateProvisionedProductEngineWorkflowResultOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyUpdateProvisionedProductEngineWorkflowResult",
}));

export type ProvisionProductError =
  | DuplicateResourceException
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provisions the specified product.
 *
 * A provisioned product is a resourced instance
 * of a product.
 * For example,
 * provisioning a product
 * that's based
 * on an CloudFormation template
 * launches an CloudFormation stack and its underlying resources.
 * You can check the status
 * of this request
 * using DescribeRecord.
 *
 * If the request contains a tag key
 * with an empty list
 * of values,
 * there's a tag conflict
 * for that key.
 * Don't include conflicted keys
 * as tags,
 * or this will cause the error "Parameter validation failed: Missing required parameter in Tags[*N*]:*Value*".
 *
 * When provisioning a product
 * that's been added
 * to a portfolio,
 * you must grant your user, group, or role access
 * to the portfolio.
 * For more information,
 * see Granting users access
 * in the *Service Catalog User Guide*.
 */
export const provisionProduct: API.OperationMethod<
  ProvisionProductInput,
  ProvisionProductOutput,
  ProvisionProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProvisionProductInput,
  output: ProvisionProductOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionProduct",
}));

export type RejectPortfolioShareError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Rejects an offer to share the specified portfolio.
 */
export const rejectPortfolioShare: API.OperationMethod<
  RejectPortfolioShareInput,
  RejectPortfolioShareOutput,
  RejectPortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectPortfolioShareInput,
  output: RejectPortfolioShareOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectPortfolioShare",
}));

export type ScanProvisionedProductsError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Lists the provisioned products that are available (not terminated).
 *
 * To use additional filtering, see SearchProvisionedProducts.
 */
export const scanProvisionedProducts: API.OperationMethod<
  ScanProvisionedProductsInput,
  ScanProvisionedProductsOutput,
  ScanProvisionedProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScanProvisionedProductsInput,
  output: ScanProvisionedProductsOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ScanProvisionedProducts",
}));

export type SearchProductsError = InvalidParametersException | CommonErrors;
/**
 * Gets information about the products to which the caller has access.
 */
export const searchProducts: API.PaginatedOperationMethod<
  SearchProductsInput,
  SearchProductsOutput,
  SearchProductsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchProductsInput,
  output: SearchProductsOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProducts",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type SearchProductsAsAdminError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the products for the specified portfolio or all products.
 */
export const searchProductsAsAdmin: API.PaginatedOperationMethod<
  SearchProductsAsAdminInput,
  SearchProductsAsAdminOutput,
  SearchProductsAsAdminError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchProductsAsAdminInput,
  output: SearchProductsAsAdminOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProductsAsAdmin",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type SearchProvisionedProductsError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Gets information about the provisioned products that meet the specified criteria.
 */
export const searchProvisionedProducts: API.PaginatedOperationMethod<
  SearchProvisionedProductsInput,
  SearchProvisionedProductsOutput,
  SearchProvisionedProductsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchProvisionedProductsInput,
  output: SearchProvisionedProductsOutput,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProvisionedProducts",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type TerminateProvisionedProductError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Terminates the specified provisioned product.
 *
 * This operation does not delete any records associated with the provisioned product.
 *
 * You can check the status of this request using DescribeRecord.
 */
export const terminateProvisionedProduct: API.OperationMethod<
  TerminateProvisionedProductInput,
  TerminateProvisionedProductOutput,
  TerminateProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateProvisionedProductInput,
  output: TerminateProvisionedProductOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateProvisionedProduct",
}));

export type UpdateConstraintError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified constraint.
 */
export const updateConstraint: API.OperationMethod<
  UpdateConstraintInput,
  UpdateConstraintOutput,
  UpdateConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConstraintInput,
  output: UpdateConstraintOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConstraint",
}));

export type UpdatePortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified portfolio.
 *
 * You cannot update a product that was shared with you.
 */
export const updatePortfolio: API.OperationMethod<
  UpdatePortfolioInput,
  UpdatePortfolioOutput,
  UpdatePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortfolioInput,
  output: UpdatePortfolioOutput,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolio",
}));

export type UpdatePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified portfolio share. You can use this API to enable or disable `TagOptions` sharing
 * or Principal sharing for an existing portfolio share.
 *
 * The portfolio share cannot be updated if the `CreatePortfolioShare` operation is `IN_PROGRESS`, as the share is not available to recipient entities.
 * In this case, you must wait for the portfolio share to be completed.
 *
 * You must provide the `accountId` or organization node in the input, but not both.
 *
 * If the portfolio is shared to both an external account and an organization node, and both shares need to be updated, you must invoke `UpdatePortfolioShare` separately for each share type.
 *
 * This API cannot be used for removing the portfolio share. You must use `DeletePortfolioShare` API for that action.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const updatePortfolioShare: API.OperationMethod<
  UpdatePortfolioShareInput,
  UpdatePortfolioShareOutput,
  UpdatePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortfolioShareInput,
  output: UpdatePortfolioShareOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolioShare",
}));

export type UpdateProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified product.
 */
export const updateProduct: API.OperationMethod<
  UpdateProductInput,
  UpdateProductOutput,
  UpdateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProductInput,
  output: UpdateProductOutput,
  errors: [
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProduct",
}));

export type UpdateProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests updates to the configuration of the specified provisioned product.
 *
 * If there are tags associated with the object, they cannot be updated or added.
 * Depending on the specific updates requested, this operation can update with no
 * interruption, with some interruption, or replace the provisioned product entirely.
 *
 * You can check the status of this request using DescribeRecord.
 */
export const updateProvisionedProduct: API.OperationMethod<
  UpdateProvisionedProductInput,
  UpdateProvisionedProductOutput,
  UpdateProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProvisionedProductInput,
  output: UpdateProvisionedProductOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProduct",
}));

export type UpdateProvisionedProductPropertiesError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests updates to the properties of the specified provisioned product.
 */
export const updateProvisionedProductProperties: API.OperationMethod<
  UpdateProvisionedProductPropertiesInput,
  UpdateProvisionedProductPropertiesOutput,
  UpdateProvisionedProductPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProvisionedProductPropertiesInput,
  output: UpdateProvisionedProductPropertiesOutput,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProductProperties",
}));

export type UpdateProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot update a provisioning artifact for a product that was shared with you.
 */
export const updateProvisioningArtifact: API.OperationMethod<
  UpdateProvisioningArtifactInput,
  UpdateProvisioningArtifactOutput,
  UpdateProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProvisioningArtifactInput,
  output: UpdateProvisioningArtifactOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisioningArtifact",
}));

export type UpdateServiceActionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a self-service action.
 */
export const updateServiceAction: API.OperationMethod<
  UpdateServiceActionInput,
  UpdateServiceActionOutput,
  UpdateServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceActionInput,
  output: UpdateServiceActionOutput,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAction",
}));

export type UpdateTagOptionError =
  | DuplicateResourceException
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified TagOption.
 */
export const updateTagOption: API.OperationMethod<
  UpdateTagOptionInput,
  UpdateTagOptionOutput,
  UpdateTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTagOptionInput,
  output: UpdateTagOptionOutput,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagOption",
}));
