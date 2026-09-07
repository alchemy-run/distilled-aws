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
  sdkId: "Service Catalog AppRegistry",
  serviceShapeName: "AWS242AppRegistry",
});
const auth = T.AwsAuthSigv4({ name: "servicecatalog" });
const ver = T.ServiceVersion("2020-06-24");
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
              `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(
                `https://servicecatalog-appregistry.${Region}.amazonaws.com`,
              );
            }
            return e(
              `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationSpecifier = string;
export type AttributeGroupSpecifier = string;
export interface AssociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export const AssociateAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{application}/attribute-groups/{attributeGroup}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAttributeGroupRequest",
}) as any as S.Schema<AssociateAttributeGroupRequest>;
export type ApplicationArn = string;
export type AttributeGroupArn = string;
export interface AssociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export const AssociateAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    attributeGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateAttributeGroupResponse",
}) as any as S.Schema<AssociateAttributeGroupResponse>;
export type ResourceType = "CFN_STACK" | "RESOURCE_TAG_VALUE" | (string & {});
export const ResourceType = S.String;

export type ResourceSpecifier = string;
export type AssociationOption =
  | "APPLY_APPLICATION_TAG"
  | "SKIP_APPLICATION_TAG"
  | (string & {});
export const AssociationOption = S.String;

export type Options = AssociationOption[];
export const Options = /*@__PURE__*/ S.Array(AssociationOption);
export interface AssociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  options?: AssociationOption[];
}
export const AssociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
    options: S.optional(Options),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateResourceRequest",
}) as any as S.Schema<AssociateResourceRequest>;
export type Arn = string;
export interface AssociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  options?: AssociationOption[];
}
export const AssociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    options: S.optional(Options),
  }),
).annotate({
  identifier: "AssociateResourceResponse",
}) as any as S.Schema<AssociateResourceResponse>;
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type ClientToken = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
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
export type ApplicationId = string;
export type ApplicationTagDefinition = { [key: string]: string | undefined };
export const ApplicationTagDefinition = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Application {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  applicationTag?: { [key: string]: string | undefined };
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    applicationTag: S.optional(ApplicationTagDefinition),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface CreateApplicationResponse {
  application?: Application;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.optional(Application) }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type Attributes = string;
export interface CreateAttributeGroupRequest {
  name: string;
  description?: string;
  attributes: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export const CreateAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    attributes: S.String,
    tags: S.optional(Tags),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/attribute-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAttributeGroupRequest",
}) as any as S.Schema<CreateAttributeGroupRequest>;
export type AttributeGroupId = string;
export interface AttributeGroup {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const AttributeGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "AttributeGroup" }) as any as S.Schema<AttributeGroup>;
export interface CreateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export const CreateAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroup) }),
).annotate({
  identifier: "CreateAttributeGroupResponse",
}) as any as S.Schema<CreateAttributeGroupResponse>;
export interface DeleteApplicationRequest {
  application: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{application}" }),
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
export interface ApplicationSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export interface DeleteApplicationResponse {
  application?: ApplicationSummary;
}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.optional(ApplicationSummary) }),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteAttributeGroupRequest {
  attributeGroup: string;
}
export const DeleteAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttributeGroupRequest",
}) as any as S.Schema<DeleteAttributeGroupRequest>;
export type CreatedBy = string;
export interface AttributeGroupSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  createdBy?: string;
}
export const AttributeGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AttributeGroupSummary",
}) as any as S.Schema<AttributeGroupSummary>;
export interface DeleteAttributeGroupResponse {
  attributeGroup?: AttributeGroupSummary;
}
export const DeleteAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroupSummary) }),
).annotate({
  identifier: "DeleteAttributeGroupResponse",
}) as any as S.Schema<DeleteAttributeGroupResponse>;
export interface DisassociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export const DisassociateAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{application}/attribute-groups/{attributeGroup}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAttributeGroupRequest",
}) as any as S.Schema<DisassociateAttributeGroupRequest>;
export interface DisassociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export const DisassociateAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    attributeGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateAttributeGroupResponse",
}) as any as S.Schema<DisassociateAttributeGroupResponse>;
export interface DisassociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
}
export const DisassociateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateResourceRequest",
}) as any as S.Schema<DisassociateResourceRequest>;
export interface DisassociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
}
export const DisassociateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateResourceResponse",
}) as any as S.Schema<DisassociateResourceResponse>;
export interface GetApplicationRequest {
  application: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{application}" }),
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
export type AssociationCount = number;
export type ResourceGroupState =
  | "CREATING"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export const ResourceGroupState = S.String;

export interface ResourceGroup {
  state?: ResourceGroupState;
  arn?: string;
  errorMessage?: string;
}
export const ResourceGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    state: S.optional(ResourceGroupState),
    arn: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceGroup" }) as any as S.Schema<ResourceGroup>;
export interface Integrations {
  resourceGroup?: ResourceGroup;
  applicationTagResourceGroup?: ResourceGroup;
}
export const Integrations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceGroup: S.optional(ResourceGroup),
    applicationTagResourceGroup: S.optional(ResourceGroup),
  }),
).annotate({ identifier: "Integrations" }) as any as S.Schema<Integrations>;
export interface GetApplicationResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  associatedResourceCount?: number;
  tags?: { [key: string]: string | undefined };
  integrations?: Integrations;
  applicationTag?: { [key: string]: string | undefined };
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    associatedResourceCount: S.optional(S.Number),
    tags: S.optional(Tags),
    integrations: S.optional(Integrations),
    applicationTag: S.optional(ApplicationTagDefinition),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export type NextToken = string;
export type ResourceItemStatus =
  | "SUCCESS"
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | (string & {});
export const ResourceItemStatus = S.String;

export type GetAssociatedResourceFilter = ResourceItemStatus[];
export const GetAssociatedResourceFilter =
  /*@__PURE__*/ S.Array(ResourceItemStatus);
export type MaxResults = number;
export interface GetAssociatedResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  nextToken?: string;
  resourceTagStatus?: ResourceItemStatus[];
  maxResults?: number;
}
export const GetAssociatedResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    resourceTagStatus: S.optional(GetAssociatedResourceFilter).pipe(
      T.HttpQuery("resourceTagStatus"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssociatedResourceRequest",
}) as any as S.Schema<GetAssociatedResourceRequest>;
export interface ResourceIntegrations {
  resourceGroup?: ResourceGroup;
}
export const ResourceIntegrations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceGroup: S.optional(ResourceGroup) }),
).annotate({
  identifier: "ResourceIntegrations",
}) as any as S.Schema<ResourceIntegrations>;
export interface Resource {
  name?: string;
  arn?: string;
  associationTime?: Date;
  integrations?: ResourceIntegrations;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    associationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    integrations: S.optional(ResourceIntegrations),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ApplicationTagStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILURE"
  | (string & {});
export const ApplicationTagStatus = S.String;

export type ResourcesListItemErrorMessage = string;
export type ResourceItemType = string;
export interface ResourcesListItem {
  resourceArn?: string;
  errorMessage?: string;
  status?: string;
  resourceType?: string;
}
export const ResourcesListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    errorMessage: S.optional(S.String),
    status: S.optional(S.String),
    resourceType: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourcesListItem",
}) as any as S.Schema<ResourcesListItem>;
export type ResourcesList = ResourcesListItem[];
export const ResourcesList = /*@__PURE__*/ S.Array(ResourcesListItem);
export interface ApplicationTagResult {
  applicationTagStatus?: ApplicationTagStatus;
  errorMessage?: string;
  resources?: ResourcesListItem[];
  nextToken?: string;
}
export const ApplicationTagResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationTagStatus: S.optional(ApplicationTagStatus),
    errorMessage: S.optional(S.String),
    resources: S.optional(ResourcesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationTagResult",
}) as any as S.Schema<ApplicationTagResult>;
export interface GetAssociatedResourceResponse {
  resource?: Resource;
  options?: AssociationOption[];
  applicationTagResult?: ApplicationTagResult;
}
export const GetAssociatedResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.optional(Resource),
    options: S.optional(Options),
    applicationTagResult: S.optional(ApplicationTagResult),
  }),
).annotate({
  identifier: "GetAssociatedResourceResponse",
}) as any as S.Schema<GetAssociatedResourceResponse>;
export interface GetAttributeGroupRequest {
  attributeGroup: string;
}
export const GetAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAttributeGroupRequest",
}) as any as S.Schema<GetAttributeGroupRequest>;
export interface GetAttributeGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  attributes?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  createdBy?: string;
}
export const GetAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    attributes: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAttributeGroupResponse",
}) as any as S.Schema<GetAttributeGroupResponse>;
export interface GetConfigurationRequest {}
export const GetConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export type TagKeyConfig = string;
export interface TagQueryConfiguration {
  tagKey?: string;
}
export const TagQueryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tagKey: S.optional(S.String) }),
).annotate({
  identifier: "TagQueryConfiguration",
}) as any as S.Schema<TagQueryConfiguration>;
export interface AppRegistryConfiguration {
  tagQueryConfiguration?: TagQueryConfiguration;
}
export const AppRegistryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tagQueryConfiguration: S.optional(TagQueryConfiguration) }),
).annotate({
  identifier: "AppRegistryConfiguration",
}) as any as S.Schema<AppRegistryConfiguration>;
export interface GetConfigurationResponse {
  configuration?: AppRegistryConfiguration;
}
export const GetConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: S.optional(AppRegistryConfiguration) }),
).annotate({
  identifier: "GetConfigurationResponse",
}) as any as S.Schema<GetConfigurationResponse>;
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
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
export type ApplicationSummaries = ApplicationSummary[];
export const ApplicationSummaries = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applications?: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applications: S.optional(ApplicationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListAssociatedAttributeGroupsRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedAttributeGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      application: S.String.pipe(T.HttpLabel("application")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/applications/{application}/attribute-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAssociatedAttributeGroupsRequest",
}) as any as S.Schema<ListAssociatedAttributeGroupsRequest>;
export type AttributeGroupIds = string[];
export const AttributeGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface ListAssociatedAttributeGroupsResponse {
  attributeGroups?: string[];
  nextToken?: string;
}
export const ListAssociatedAttributeGroupsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      attributeGroups: S.optional(AttributeGroupIds),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAssociatedAttributeGroupsResponse",
}) as any as S.Schema<ListAssociatedAttributeGroupsResponse>;
export interface ListAssociatedResourcesRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{application}/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedResourcesRequest",
}) as any as S.Schema<ListAssociatedResourcesRequest>;
export interface ResourceDetails {
  tagValue?: string;
}
export const ResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tagValue: S.optional(S.String) }),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export interface ResourceInfo {
  name?: string;
  arn?: string;
  resourceType?: ResourceType;
  resourceDetails?: ResourceDetails;
  options?: AssociationOption[];
}
export const ResourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    resourceDetails: S.optional(ResourceDetails),
    options: S.optional(Options),
  }),
).annotate({ identifier: "ResourceInfo" }) as any as S.Schema<ResourceInfo>;
export type Resources = ResourceInfo[];
export const Resources = /*@__PURE__*/ S.Array(ResourceInfo);
export interface ListAssociatedResourcesResponse {
  resources?: ResourceInfo[];
  nextToken?: string;
}
export const ListAssociatedResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resources: S.optional(Resources),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedResourcesResponse",
}) as any as S.Schema<ListAssociatedResourcesResponse>;
export interface ListAttributeGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAttributeGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/attribute-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttributeGroupsRequest",
}) as any as S.Schema<ListAttributeGroupsRequest>;
export type AttributeGroupSummaries = AttributeGroupSummary[];
export const AttributeGroupSummaries = /*@__PURE__*/ S.Array(
  AttributeGroupSummary,
);
export interface ListAttributeGroupsResponse {
  attributeGroups?: AttributeGroupSummary[];
  nextToken?: string;
}
export const ListAttributeGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeGroups: S.optional(AttributeGroupSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttributeGroupsResponse",
}) as any as S.Schema<ListAttributeGroupsResponse>;
export interface ListAttributeGroupsForApplicationRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAttributeGroupsForApplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      application: S.String.pipe(T.HttpLabel("application")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/applications/{application}/attribute-group-details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAttributeGroupsForApplicationRequest",
}) as any as S.Schema<ListAttributeGroupsForApplicationRequest>;
export interface AttributeGroupDetails {
  id?: string;
  arn?: string;
  name?: string;
  createdBy?: string;
}
export const AttributeGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AttributeGroupDetails",
}) as any as S.Schema<AttributeGroupDetails>;
export type AttributeGroupDetailsList = AttributeGroupDetails[];
export const AttributeGroupDetailsList = /*@__PURE__*/ S.Array(
  AttributeGroupDetails,
);
export interface ListAttributeGroupsForApplicationResponse {
  attributeGroupsDetails?: AttributeGroupDetails[];
  nextToken?: string;
}
export const ListAttributeGroupsForApplicationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      attributeGroupsDetails: S.optional(AttributeGroupDetailsList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAttributeGroupsForApplicationResponse",
  }) as any as S.Schema<ListAttributeGroupsForApplicationResponse>;
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
export interface PutConfigurationRequest {
  configuration: AppRegistryConfiguration;
}
export const PutConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: AppRegistryConfiguration }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutConfigurationRequest",
}) as any as S.Schema<PutConfigurationRequest>;
export interface PutConfigurationResponse {}
export const PutConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutConfigurationResponse",
}) as any as S.Schema<PutConfigurationResponse>;
export interface SyncResourceRequest {
  resourceType: ResourceType;
  resource: string;
}
export const SyncResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sync/{resourceType}/{resource}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SyncResourceRequest",
}) as any as S.Schema<SyncResourceRequest>;
export type SyncAction = "START_SYNC" | "NO_ACTION" | (string & {});
export const SyncAction = S.String;

export interface SyncResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  actionTaken?: SyncAction;
}
export const SyncResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    actionTaken: S.optional(SyncAction),
  }),
).annotate({
  identifier: "SyncResourceResponse",
}) as any as S.Schema<SyncResourceResponse>;
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateApplicationRequest {
  application: string;
  name?: string;
  description?: string;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    name: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{application}" }),
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
  application?: Application;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.optional(Application) }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateAttributeGroupRequest {
  attributeGroup: string;
  name?: string;
  description?: string;
  attributes?: string;
}
export const UpdateAttributeGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    attributes: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAttributeGroupRequest",
}) as any as S.Schema<UpdateAttributeGroupRequest>;
export interface UpdateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export const UpdateAttributeGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroup) }),
).annotate({
  identifier: "UpdateAttributeGroupResponse",
}) as any as S.Schema<UpdateAttributeGroupResponse>;
export type AssociateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an attribute group with an application to augment the application's metadata
 * with the group's attributes. This feature enables applications to be described with
 * user-defined details that are machine-readable, such as third-party integrations.
 */
export const associateAttributeGroup: API.OperationMethod<
  AssociateAttributeGroupRequest,
  AssociateAttributeGroupResponse,
  AssociateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAttributeGroupRequest,
  output: AssociateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAttributeGroup",
}));

export type AssociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource with an application.
 * The resource can be specified by its ARN or name.
 * The application can be specified by ARN, ID, or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to associate a resource using the `OPTIONS` parameter set to `APPLY_APPLICATION_TAG`.
 *
 * - `tag:GetResources`
 *
 * - `tag:TagResources`
 *
 * You must also have these additional permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:AssociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see TagResources in the *Resource Groups Tagging API Reference*.
 */
export const associateResource: API.OperationMethod<
  AssociateResourceRequest,
  AssociateResourceResponse,
  AssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourceRequest,
  output: AssociateResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResource",
}));

export type CreateApplicationError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application that is the top-level node in a hierarchy of related cloud resource abstractions.
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
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new attribute group as a container for user-defined attributes. This feature
 * enables users to have full control over their cloud application's metadata in a rich
 * machine-readable format to facilitate integration with automated workflows and third-party
 * tools.
 */
export const createAttributeGroup: API.OperationMethod<
  CreateAttributeGroupRequest,
  CreateAttributeGroupResponse,
  CreateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAttributeGroupRequest,
  output: CreateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAttributeGroup",
}));

export type DeleteApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application that is specified either by its application ID, name, or ARN. All associated attribute groups and resources must be disassociated from it before deleting an application.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attribute group, specified either by its attribute group ID, name, or ARN.
 */
export const deleteAttributeGroup: API.OperationMethod<
  DeleteAttributeGroupRequest,
  DeleteAttributeGroupResponse,
  DeleteAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttributeGroupRequest,
  output: DeleteAttributeGroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeGroup",
}));

export type DisassociateAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an attribute group from an application to remove the extra attributes contained in the attribute group from the application's metadata. This operation reverts `AssociateAttributeGroup`.
 */
export const disassociateAttributeGroup: API.OperationMethod<
  DisassociateAttributeGroupRequest,
  DisassociateAttributeGroupResponse,
  DisassociateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAttributeGroupRequest,
  output: DisassociateAttributeGroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAttributeGroup",
}));

export type DisassociateResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a resource from application.
 * Both the resource and the application can be specified either by ID or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to remove a resource that's been associated with an application using the `APPLY_APPLICATION_TAG` option for AssociateResource.
 *
 * - `tag:GetResources`
 *
 * - `tag:UntagResources`
 *
 * You must also have the following permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:DisassociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see UntagResources in the *Resource Groups Tagging API Reference*.
 */
export const disassociateResource: API.OperationMethod<
  DisassociateResourceRequest,
  DisassociateResourceResponse,
  DisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourceRequest,
  output: DisassociateResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResource",
}));

export type GetApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata information
 * about one
 * of your applications.
 * The application can be specified
 * by its ARN, ID, or name
 * (which is unique
 * within one account
 * in one region
 * at a given point
 * in time).
 * Specify
 * by ARN or ID
 * in automated workflows
 * if you want
 * to make sure
 * that the exact same application is returned or a `ResourceNotFoundException` is thrown,
 * avoiding the ABA addressing problem.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetAssociatedResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource associated with the application.
 */
export const getAssociatedResource: API.OperationMethod<
  GetAssociatedResourceRequest,
  GetAssociatedResourceResponse,
  GetAssociatedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssociatedResourceRequest,
  output: GetAssociatedResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedResource",
}));

export type GetAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an attribute group
 * by its ARN, ID, or name.
 * The attribute group can be specified
 * by its ARN, ID, or name.
 */
export const getAttributeGroup: API.OperationMethod<
  GetAttributeGroupRequest,
  GetAttributeGroupResponse,
  GetAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAttributeGroupRequest,
  output: GetAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributeGroup",
}));

export type GetConfigurationError = InternalServerException | CommonErrors;
/**
 * Retrieves a `TagKey` configuration
 * from an account.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
}));

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all of your applications. Results are paginated.
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
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAttributeGroupsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups that are associated with specified application. Results are paginated.
 */
export const listAssociatedAttributeGroups: API.PaginatedOperationMethod<
  ListAssociatedAttributeGroupsRequest,
  ListAssociatedAttributeGroupsResponse,
  ListAssociatedAttributeGroupsError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedAttributeGroupsRequest,
  output: ListAssociatedAttributeGroupsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAttributeGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all
 * of the resources
 * that are associated
 * with the specified application.
 * Results are paginated.
 *
 * If you share an application,
 * and a consumer account associates a tag query
 * to the application,
 * all of the users
 * who can access the application
 * can also view the tag values
 * in all accounts
 * that are associated
 * with it
 * using this API.
 */
export const listAssociatedResources: API.PaginatedOperationMethod<
  ListAssociatedResourcesRequest,
  ListAssociatedResourcesResponse,
  ListAssociatedResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedResourcesRequest,
  output: ListAssociatedResourcesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributeGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups which you have access to. Results are paginated.
 */
export const listAttributeGroups: API.PaginatedOperationMethod<
  ListAttributeGroupsRequest,
  ListAttributeGroupsResponse,
  ListAttributeGroupsError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttributeGroupsRequest,
  output: ListAttributeGroupsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributeGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributeGroupsForApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the details of all attribute groups associated with a specific application. The results display in pages.
 */
export const listAttributeGroupsForApplication: API.PaginatedOperationMethod<
  ListAttributeGroupsForApplicationRequest,
  ListAttributeGroupsForApplicationResponse,
  ListAttributeGroupsForApplicationError,
  Credentials | HttpClient.HttpClient,
  AttributeGroupDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttributeGroupsForApplicationRequest,
  output: ListAttributeGroupsForApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributeGroupsForApplication",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroupsDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags on the resource.
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

export type PutConfigurationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Associates a `TagKey` configuration
 * to an account.
 */
export const putConfiguration: API.OperationMethod<
  PutConfigurationRequest,
  PutConfigurationResponse,
  PutConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationRequest,
  output: PutConfigurationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfiguration",
}));

export type SyncResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Syncs the resource with current AppRegistry records.
 *
 * Specifically, the resource’s AppRegistry system tags sync with its associated application. We remove the resource's AppRegistry system tags if it does not associate with the application. The caller must have permissions to read and update the resource.
 */
export const syncResource: API.OperationMethod<
  SyncResourceRequest,
  SyncResourceResponse,
  SyncResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SyncResourceRequest,
  output: SyncResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SyncResource",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated with the resource, this action updates its value.
 *
 * This operation returns an empty response if the call was successful.
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
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
 *
 * This operation returns an empty response if the call was successful.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing application with new attributes.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing attribute group with new details.
 */
export const updateAttributeGroup: API.OperationMethod<
  UpdateAttributeGroupRequest,
  UpdateAttributeGroupResponse,
  UpdateAttributeGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAttributeGroupRequest,
  output: UpdateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAttributeGroup",
}));
