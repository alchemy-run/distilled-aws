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
  sdkId: "ControlCatalog",
  serviceShapeName: "ControlCatalog",
});
const auth = T.AwsAuthSigv4({ name: "controlcatalog" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://controlcatalog-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://controlcatalog-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ControlArn = string;
export interface GetControlRequest {
  ControlArn: string;
}
export const GetControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ControlArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetControlRequest",
}) as any as S.Schema<GetControlRequest>;
export type ControlAlias = string;
export type ControlAliases = string[];
export const ControlAliases = /*@__PURE__*/ S.Array(S.String);
export type ControlBehavior =
  | "PREVENTIVE"
  | "PROACTIVE"
  | "DETECTIVE"
  | (string & {});
export const ControlBehavior = S.String;

export type ControlSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const ControlSeverity = S.String;

export type ControlScope = "GLOBAL" | "REGIONAL" | (string & {});
export const ControlScope = S.String;

export type RegionCode = string;
export type DeployableRegions = string[];
export const DeployableRegions = /*@__PURE__*/ S.Array(S.String);
export interface RegionConfiguration {
  Scope: ControlScope;
  DeployableRegions?: string[];
}
export const RegionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Scope: ControlScope,
    DeployableRegions: S.optional(DeployableRegions),
  }),
).annotate({
  identifier: "RegionConfiguration",
}) as any as S.Schema<RegionConfiguration>;
export type ImplementationType = string;
export type ImplementationIdentifier = string;
export interface ImplementationDetails {
  Type: string;
  Identifier?: string;
}
export const ImplementationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Identifier: S.optional(S.String) }),
).annotate({
  identifier: "ImplementationDetails",
}) as any as S.Schema<ImplementationDetails>;
export type ParameterRequirementSummary =
  | "REQUIRED"
  | "OPTIONAL"
  | "NONE"
  | (string & {});
export const ParameterRequirementSummary = S.String;

export type ControlParameterRequirement =
  | "REQUIRED"
  | "OPTIONAL"
  | (string & {});
export const ControlParameterRequirement = S.String;

export interface ControlParameter {
  Name: string;
  Requirement?: ControlParameterRequirement;
}
export const ControlParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Requirement: S.optional(ControlParameterRequirement),
  }),
).annotate({
  identifier: "ControlParameter",
}) as any as S.Schema<ControlParameter>;
export type ControlParameters = ControlParameter[];
export const ControlParameters = /*@__PURE__*/ S.Array(ControlParameter);
export type GovernedResource = string;
export type GovernedResources = string[];
export const GovernedResources = /*@__PURE__*/ S.Array(S.String);
export type GovernedProvider = string;
export type GovernedProviders = string[];
export const GovernedProviders = /*@__PURE__*/ S.Array(S.String);
export interface GetControlResponse {
  Arn: string;
  Aliases?: string[];
  Name: string;
  Description: string;
  Behavior: ControlBehavior;
  Severity?: ControlSeverity;
  RegionConfiguration: RegionConfiguration;
  Implementation?: ImplementationDetails;
  ParameterRequirementSummary?: ParameterRequirementSummary;
  Parameters?: ControlParameter[];
  CreateTime?: Date;
  GovernedResources?: string[];
  GovernedProviders?: string[];
}
export const GetControlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Aliases: S.optional(ControlAliases),
    Name: S.String,
    Description: S.String,
    Behavior: ControlBehavior,
    Severity: S.optional(ControlSeverity),
    RegionConfiguration: RegionConfiguration,
    Implementation: S.optional(ImplementationDetails),
    ParameterRequirementSummary: S.optional(ParameterRequirementSummary),
    Parameters: S.optional(ControlParameters),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    GovernedResources: S.optional(GovernedResources),
    GovernedProviders: S.optional(GovernedProviders),
  }),
).annotate({
  identifier: "GetControlResponse",
}) as any as S.Schema<GetControlResponse>;
export type MaxListCommonControlsResults = number;
export type PaginationToken = string;
export type ObjectiveArn = string;
export interface ObjectiveResourceFilter {
  Arn?: string;
}
export const ObjectiveResourceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "ObjectiveResourceFilter",
}) as any as S.Schema<ObjectiveResourceFilter>;
export type ObjectiveResourceFilterList = ObjectiveResourceFilter[];
export const ObjectiveResourceFilterList = /*@__PURE__*/ S.Array(
  ObjectiveResourceFilter,
);
export interface CommonControlFilter {
  Objectives?: ObjectiveResourceFilter[];
}
export const CommonControlFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Objectives: S.optional(ObjectiveResourceFilterList) }),
).annotate({
  identifier: "CommonControlFilter",
}) as any as S.Schema<CommonControlFilter>;
export interface ListCommonControlsRequest {
  MaxResults?: number;
  NextToken?: string;
  CommonControlFilter?: CommonControlFilter;
}
export const ListCommonControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    CommonControlFilter: S.optional(CommonControlFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/common-controls" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCommonControlsRequest",
}) as any as S.Schema<ListCommonControlsRequest>;
export type CommonControlArn = string;
export type DomainArn = string;
export interface AssociatedDomainSummary {
  Arn?: string;
  Name?: string;
}
export const AssociatedDomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "AssociatedDomainSummary",
}) as any as S.Schema<AssociatedDomainSummary>;
export interface AssociatedObjectiveSummary {
  Arn?: string;
  Name?: string;
}
export const AssociatedObjectiveSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "AssociatedObjectiveSummary",
}) as any as S.Schema<AssociatedObjectiveSummary>;
export interface CommonControlSummary {
  Arn: string;
  Name: string;
  Description: string;
  Domain: AssociatedDomainSummary;
  Objective: AssociatedObjectiveSummary;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export const CommonControlSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Description: S.String,
    Domain: AssociatedDomainSummary,
    Objective: AssociatedObjectiveSummary,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CommonControlSummary",
}) as any as S.Schema<CommonControlSummary>;
export type CommonControlSummaryList = CommonControlSummary[];
export const CommonControlSummaryList =
  /*@__PURE__*/ S.Array(CommonControlSummary);
export interface ListCommonControlsResponse {
  CommonControls: CommonControlSummary[];
  NextToken?: string;
}
export const ListCommonControlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommonControls: CommonControlSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCommonControlsResponse",
}) as any as S.Schema<ListCommonControlsResponse>;
export type MaxListControlMappingsResults = number;
export type ControlArnFilterList = string[];
export const ControlArnFilterList = /*@__PURE__*/ S.Array(S.String);
export type CommonControlArnFilterList = string[];
export const CommonControlArnFilterList = /*@__PURE__*/ S.Array(S.String);
export type MappingType =
  | "FRAMEWORK"
  | "COMMON_CONTROL"
  | "RELATED_CONTROL"
  | (string & {});
export const MappingType = S.String;

export type MappingTypeFilterList = MappingType[];
export const MappingTypeFilterList = /*@__PURE__*/ S.Array(MappingType);
export interface ControlMappingFilter {
  ControlArns?: string[];
  CommonControlArns?: string[];
  MappingTypes?: MappingType[];
}
export const ControlMappingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlArns: S.optional(ControlArnFilterList),
    CommonControlArns: S.optional(CommonControlArnFilterList),
    MappingTypes: S.optional(MappingTypeFilterList),
  }),
).annotate({
  identifier: "ControlMappingFilter",
}) as any as S.Schema<ControlMappingFilter>;
export interface ListControlMappingsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: ControlMappingFilter;
}
export const ListControlMappingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    Filter: S.optional(ControlMappingFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-control-mappings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListControlMappingsRequest",
}) as any as S.Schema<ListControlMappingsRequest>;
export type FrameworkName = string;
export type FrameworkItem = string;
export interface FrameworkMappingDetails {
  Name: string;
  Item: string;
}
export const FrameworkMappingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Item: S.String }),
).annotate({
  identifier: "FrameworkMappingDetails",
}) as any as S.Schema<FrameworkMappingDetails>;
export interface CommonControlMappingDetails {
  CommonControlArn: string;
}
export const CommonControlMappingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CommonControlArn: S.String }),
).annotate({
  identifier: "CommonControlMappingDetails",
}) as any as S.Schema<CommonControlMappingDetails>;
export type ControlRelationType =
  | "COMPLEMENTARY"
  | "ALTERNATIVE"
  | "MUTUALLY_EXCLUSIVE"
  | (string & {});
export const ControlRelationType = S.String;

export interface RelatedControlMappingDetails {
  ControlArn?: string;
  RelationType: ControlRelationType;
}
export const RelatedControlMappingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlArn: S.optional(S.String),
    RelationType: ControlRelationType,
  }),
).annotate({
  identifier: "RelatedControlMappingDetails",
}) as any as S.Schema<RelatedControlMappingDetails>;
export type Mapping =
  | {
      Framework: FrameworkMappingDetails;
      CommonControl?: never;
      RelatedControl?: never;
    }
  | {
      Framework?: never;
      CommonControl: CommonControlMappingDetails;
      RelatedControl?: never;
    }
  | {
      Framework?: never;
      CommonControl?: never;
      RelatedControl: RelatedControlMappingDetails;
    };
export const Mapping = /*@__PURE__*/ S.Union([
  S.Struct({ Framework: FrameworkMappingDetails }),
  S.Struct({ CommonControl: CommonControlMappingDetails }),
  S.Struct({ RelatedControl: RelatedControlMappingDetails }),
]);
export interface ControlMapping {
  ControlArn: string;
  MappingType: MappingType;
  Mapping: Mapping;
}
export const ControlMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlArn: S.String,
    MappingType: MappingType,
    Mapping: Mapping,
  }),
).annotate({ identifier: "ControlMapping" }) as any as S.Schema<ControlMapping>;
export type ControlMappings = ControlMapping[];
export const ControlMappings = /*@__PURE__*/ S.Array(ControlMapping);
export interface ListControlMappingsResponse {
  ControlMappings: ControlMapping[];
  NextToken?: string;
}
export const ListControlMappingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlMappings: ControlMappings,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListControlMappingsResponse",
}) as any as S.Schema<ListControlMappingsResponse>;
export type MaxListControlsResults = number;
export type ImplementationTypeFilterList = string[];
export const ImplementationTypeFilterList = /*@__PURE__*/ S.Array(S.String);
export type ImplementationIdentifierFilterList = string[];
export const ImplementationIdentifierFilterList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ImplementationFilter {
  Types?: string[];
  Identifiers?: string[];
}
export const ImplementationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Types: S.optional(ImplementationTypeFilterList),
    Identifiers: S.optional(ImplementationIdentifierFilterList),
  }),
).annotate({
  identifier: "ImplementationFilter",
}) as any as S.Schema<ImplementationFilter>;
export type GovernedProviderFilterList = string[];
export const GovernedProviderFilterList = /*@__PURE__*/ S.Array(S.String);
export interface ControlFilter {
  Implementations?: ImplementationFilter;
  GovernedProviders?: string[];
}
export const ControlFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Implementations: S.optional(ImplementationFilter),
    GovernedProviders: S.optional(GovernedProviderFilterList),
  }),
).annotate({ identifier: "ControlFilter" }) as any as S.Schema<ControlFilter>;
export interface ListControlsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: ControlFilter;
}
export const ListControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    Filter: S.optional(ControlFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-controls" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListControlsRequest",
}) as any as S.Schema<ListControlsRequest>;
export interface ImplementationSummary {
  Type: string;
  Identifier?: string;
}
export const ImplementationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Identifier: S.optional(S.String) }),
).annotate({
  identifier: "ImplementationSummary",
}) as any as S.Schema<ImplementationSummary>;
export interface ControlSummary {
  Arn: string;
  Aliases?: string[];
  Name: string;
  Description: string;
  Behavior?: ControlBehavior;
  Severity?: ControlSeverity;
  ParameterRequirementSummary?: ParameterRequirementSummary;
  Implementation?: ImplementationSummary;
  CreateTime?: Date;
  GovernedResources?: string[];
  GovernedProviders?: string[];
}
export const ControlSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Aliases: S.optional(ControlAliases),
    Name: S.String,
    Description: S.String,
    Behavior: S.optional(ControlBehavior),
    Severity: S.optional(ControlSeverity),
    ParameterRequirementSummary: S.optional(ParameterRequirementSummary),
    Implementation: S.optional(ImplementationSummary),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    GovernedResources: S.optional(GovernedResources),
    GovernedProviders: S.optional(GovernedProviders),
  }),
).annotate({ identifier: "ControlSummary" }) as any as S.Schema<ControlSummary>;
export type Controls = ControlSummary[];
export const Controls = /*@__PURE__*/ S.Array(ControlSummary);
export interface ListControlsResponse {
  Controls: ControlSummary[];
  NextToken?: string;
}
export const ListControlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Controls: Controls, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListControlsResponse",
}) as any as S.Schema<ListControlsResponse>;
export type MaxListDomainsResults = number;
export interface ListDomainsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/domains" }),
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
  Arn: string;
  Name: string;
  Description: string;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export const DomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Description: S.String,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaryList = DomainSummary[];
export const DomainSummaryList = /*@__PURE__*/ S.Array(DomainSummary);
export interface ListDomainsResponse {
  Domains: DomainSummary[];
  NextToken?: string;
}
export const ListDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domains: DomainSummaryList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDomainsResponse",
}) as any as S.Schema<ListDomainsResponse>;
export type MaxListObjectivesResults = number;
export interface DomainResourceFilter {
  Arn?: string;
}
export const DomainResourceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DomainResourceFilter",
}) as any as S.Schema<DomainResourceFilter>;
export type DomainResourceFilterList = DomainResourceFilter[];
export const DomainResourceFilterList =
  /*@__PURE__*/ S.Array(DomainResourceFilter);
export interface ObjectiveFilter {
  Domains?: DomainResourceFilter[];
}
export const ObjectiveFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domains: S.optional(DomainResourceFilterList) }),
).annotate({
  identifier: "ObjectiveFilter",
}) as any as S.Schema<ObjectiveFilter>;
export interface ListObjectivesRequest {
  MaxResults?: number;
  NextToken?: string;
  ObjectiveFilter?: ObjectiveFilter;
}
export const ListObjectivesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ObjectiveFilter: S.optional(ObjectiveFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/objectives" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListObjectivesRequest",
}) as any as S.Schema<ListObjectivesRequest>;
export interface ObjectiveSummary {
  Arn: string;
  Name: string;
  Description: string;
  Domain: AssociatedDomainSummary;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export const ObjectiveSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Description: S.String,
    Domain: AssociatedDomainSummary,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ObjectiveSummary",
}) as any as S.Schema<ObjectiveSummary>;
export type ObjectiveSummaryList = ObjectiveSummary[];
export const ObjectiveSummaryList = /*@__PURE__*/ S.Array(ObjectiveSummary);
export interface ListObjectivesResponse {
  Objectives: ObjectiveSummary[];
  NextToken?: string;
}
export const ListObjectivesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Objectives: ObjectiveSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListObjectivesResponse",
}) as any as S.Schema<ListObjectivesResponse>;
export type GetControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific control, most notably a list of Amazon Web Services Regions where this control is supported. Input a value for the *ControlArn* parameter, in ARN form. `GetControl` accepts *controltower* or *controlcatalog* control ARNs as input. Returns a *controlcatalog* ARN format.
 *
 * In the API response, controls that have the value `GLOBAL` in the `Scope` field do not show the `DeployableRegions` field, because it does not apply. Controls that have the value `REGIONAL` in the `Scope` field return a value for the `DeployableRegions` field, as shown in the example.
 */
export const getControl: API.OperationMethod<
  GetControlRequest,
  GetControlResponse,
  GetControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetControlRequest,
  output: GetControlResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetControl",
}));

export type ListCommonControlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of common controls from the Amazon Web Services Control Catalog.
 *
 * You can apply an optional filter to see common controls that have a specific objective. If you don’t provide a filter, the operation returns all common controls.
 */
export const listCommonControls: API.PaginatedOperationMethod<
  ListCommonControlsRequest,
  ListCommonControlsResponse,
  ListCommonControlsError,
  Credentials | HttpClient.HttpClient,
  CommonControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommonControlsRequest,
  output: ListCommonControlsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommonControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CommonControls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListControlMappingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of control mappings from the Control Catalog. Control mappings show relationships between controls and other entities, such as common controls or compliance frameworks.
 */
export const listControlMappings: API.PaginatedOperationMethod<
  ListControlMappingsRequest,
  ListControlMappingsResponse,
  ListControlMappingsError,
  Credentials | HttpClient.HttpClient,
  ControlMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListControlMappingsRequest,
  output: ListControlMappingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControlMappings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ControlMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListControlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all available controls in the Control Catalog library. Allows you to discover available controls. The list of controls is given as structures of type *controlSummary*. The ARN is returned in the global *controlcatalog* format, as shown in the examples.
 */
export const listControls: API.PaginatedOperationMethod<
  ListControlsRequest,
  ListControlsResponse,
  ListControlsError,
  Credentials | HttpClient.HttpClient,
  ControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListControlsRequest,
  output: ListControlsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Controls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of domains from the Control Catalog.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
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
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Domains",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectivesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of objectives from the Control Catalog.
 *
 * You can apply an optional filter to see the objectives that belong to a specific domain. If you don’t provide a filter, the operation returns all objectives.
 */
export const listObjectives: API.PaginatedOperationMethod<
  ListObjectivesRequest,
  ListObjectivesResponse,
  ListObjectivesError,
  Credentials | HttpClient.HttpClient,
  ObjectiveSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListObjectivesRequest,
  output: ListObjectivesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Objectives",
    pageSize: "MaxResults",
  } as const,
})) as any;
