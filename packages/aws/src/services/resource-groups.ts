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
  sdkId: "Resource Groups",
  serviceShapeName: "Ardi",
});
const auth = T.AwsAuthSigv4({ name: "resource-groups" });
const ver = T.ServiceVersion("2017-11-27");
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
              `https://resource-groups-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://resource-groups.${Region}.amazonaws.com`);
            }
            return e(
              `https://resource-groups-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GroupAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<GroupAlreadyExists>()(
    "GroupAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "BadRequestException",
      message: { includes: "group already exists" },
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type TagSyncTaskArn = string;
export interface CancelTagSyncTaskInput {
  TaskArn: string;
}
export const CancelTagSyncTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cancel-tag-sync-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTagSyncTaskInput",
}) as any as S.Schema<CancelTagSyncTaskInput>;
export interface CancelTagSyncTaskResponse {}
export const CancelTagSyncTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelTagSyncTaskResponse",
}) as any as S.Schema<CancelTagSyncTaskResponse>;
export type CreateGroupName = string;
export type Description = string;
export type QueryType =
  | "TAG_FILTERS_1_0"
  | "CLOUDFORMATION_STACK_1_0"
  | (string & {});
export const QueryType = /*@__PURE__*/ S.String;

export type Query = string;
export interface ResourceQuery {
  Type: QueryType;
  Query: string;
}
export const ResourceQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: QueryType, Query: S.String }),
).annotate({ identifier: "ResourceQuery" }) as any as S.Schema<ResourceQuery>;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type GroupConfigurationType = string;
export type GroupConfigurationParameterName = string;
export type GroupConfigurationParameterValue = string;
export type GroupConfigurationParameterValueList = string[];
export const GroupConfigurationParameterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface GroupConfigurationParameter {
  Name: string;
  Values?: string[];
}
export const GroupConfigurationParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Values: S.optional(GroupConfigurationParameterValueList),
  }),
).annotate({
  identifier: "GroupConfigurationParameter",
}) as any as S.Schema<GroupConfigurationParameter>;
export type GroupParameterList = GroupConfigurationParameter[];
export const GroupParameterList = /*@__PURE__*/ S.Array(
  GroupConfigurationParameter,
);
export interface GroupConfigurationItem {
  Type: string;
  Parameters?: GroupConfigurationParameter[];
}
export const GroupConfigurationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Parameters: S.optional(GroupParameterList) }),
).annotate({
  identifier: "GroupConfigurationItem",
}) as any as S.Schema<GroupConfigurationItem>;
export type GroupConfigurationList = GroupConfigurationItem[];
export const GroupConfigurationList = /*@__PURE__*/ S.Array(
  GroupConfigurationItem,
);
export type Criticality = number;
export type Owner = string;
export type DisplayName = string;
export interface CreateGroupInput {
  Name: string;
  Description?: string;
  ResourceQuery?: ResourceQuery;
  Tags?: { [key: string]: string | undefined };
  Configuration?: GroupConfigurationItem[];
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export const CreateGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ResourceQuery: S.optional(ResourceQuery),
    Tags: S.optional(Tags),
    Configuration: S.optional(GroupConfigurationList),
    Criticality: S.optional(S.Number),
    Owner: S.optional(S.String),
    DisplayName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupInput",
}) as any as S.Schema<CreateGroupInput>;
export type GroupArnV2 = string;
export type GroupName = string;
export type ApplicationTagKey = string;
export type ApplicationArn = string;
export type ApplicationTag = { [key: string]: string | undefined };
export const ApplicationTag = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Group {
  GroupArn: string;
  Name: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
  ApplicationTag?: { [key: string]: string | undefined };
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupArn: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    Criticality: S.optional(S.Number),
    Owner: S.optional(S.String),
    DisplayName: S.optional(S.String),
    ApplicationTag: S.optional(ApplicationTag),
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type GroupConfigurationStatus =
  | "UPDATING"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export const GroupConfigurationStatus = /*@__PURE__*/ S.String;

export type GroupConfigurationFailureReason = string;
export interface GroupConfiguration {
  Configuration?: GroupConfigurationItem[];
  ProposedConfiguration?: GroupConfigurationItem[];
  Status?: GroupConfigurationStatus;
  FailureReason?: string;
}
export const GroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Configuration: S.optional(GroupConfigurationList),
    ProposedConfiguration: S.optional(GroupConfigurationList),
    Status: S.optional(GroupConfigurationStatus),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupConfiguration",
}) as any as S.Schema<GroupConfiguration>;
export interface CreateGroupOutput {
  Group: Group;
  ResourceQuery?: ResourceQuery;
  Tags?: { [key: string]: string | undefined };
  GroupConfiguration?: GroupConfiguration;
}
export const CreateGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: Group,
    ResourceQuery: S.optional(ResourceQuery),
    Tags: S.optional(Tags),
    GroupConfiguration: S.optional(GroupConfiguration),
  }),
).annotate({
  identifier: "CreateGroupOutput",
}) as any as S.Schema<CreateGroupOutput>;
export type GroupStringV2 = string;
export interface DeleteGroupInput {
  GroupName?: string;
  Group?: string;
}
export const DeleteGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupInput",
}) as any as S.Schema<DeleteGroupInput>;
export interface DeleteGroupOutput {
  Group?: Group;
}
export const DeleteGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "DeleteGroupOutput",
}) as any as S.Schema<DeleteGroupOutput>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-account-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export type GroupLifecycleEventsDesiredStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const GroupLifecycleEventsDesiredStatus = /*@__PURE__*/ S.String;

export type GroupLifecycleEventsStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "IN_PROGRESS"
  | "ERROR"
  | (string & {});
export const GroupLifecycleEventsStatus = /*@__PURE__*/ S.String;

export type GroupLifecycleEventsStatusMessage = string;
export interface AccountSettings {
  GroupLifecycleEventsDesiredStatus?: GroupLifecycleEventsDesiredStatus;
  GroupLifecycleEventsStatus?: GroupLifecycleEventsStatus;
  GroupLifecycleEventsStatusMessage?: string;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupLifecycleEventsDesiredStatus: S.optional(
      GroupLifecycleEventsDesiredStatus,
    ),
    GroupLifecycleEventsStatus: S.optional(GroupLifecycleEventsStatus),
    GroupLifecycleEventsStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetAccountSettingsOutput {
  AccountSettings?: AccountSettings;
}
export const GetAccountSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "GetAccountSettingsOutput",
}) as any as S.Schema<GetAccountSettingsOutput>;
export interface GetGroupInput {
  GroupName?: string;
  Group?: string;
}
export const GetGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetGroupInput" }) as any as S.Schema<GetGroupInput>;
export interface GetGroupOutput {
  Group: Group;
}
export const GetGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: Group }),
).annotate({ identifier: "GetGroupOutput" }) as any as S.Schema<GetGroupOutput>;
export type GroupString = string;
export interface GetGroupConfigurationInput {
  Group?: string;
}
export const GetGroupConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-group-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupConfigurationInput",
}) as any as S.Schema<GetGroupConfigurationInput>;
export interface GetGroupConfigurationOutput {
  GroupConfiguration?: GroupConfiguration;
}
export const GetGroupConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupConfiguration: S.optional(GroupConfiguration) }),
).annotate({
  identifier: "GetGroupConfigurationOutput",
}) as any as S.Schema<GetGroupConfigurationOutput>;
export interface GetGroupQueryInput {
  GroupName?: string;
  Group?: string;
}
export const GetGroupQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-group-query" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupQueryInput",
}) as any as S.Schema<GetGroupQueryInput>;
export interface GroupQuery {
  GroupName: string;
  ResourceQuery: ResourceQuery;
}
export const GroupQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupName: S.String, ResourceQuery: ResourceQuery }),
).annotate({ identifier: "GroupQuery" }) as any as S.Schema<GroupQuery>;
export interface GetGroupQueryOutput {
  GroupQuery?: GroupQuery;
}
export const GetGroupQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupQuery: S.optional(GroupQuery) }),
).annotate({
  identifier: "GetGroupQueryOutput",
}) as any as S.Schema<GetGroupQueryOutput>;
export interface GetTagsInput {
  Arn: string;
}
export const GetTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resources/{Arn}/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTagsInput" }) as any as S.Schema<GetTagsInput>;
export interface GetTagsOutput {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Tags: S.optional(Tags) }),
).annotate({ identifier: "GetTagsOutput" }) as any as S.Schema<GetTagsOutput>;
export interface GetTagSyncTaskInput {
  TaskArn: string;
}
export const GetTagSyncTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-tag-sync-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTagSyncTaskInput",
}) as any as S.Schema<GetTagSyncTaskInput>;
export type RoleArn = string;
export type TagSyncTaskStatus = "ACTIVE" | "ERROR" | (string & {});
export const TagSyncTaskStatus = /*@__PURE__*/ S.String;

export type ErrorMessage = string;
export interface GetTagSyncTaskOutput {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
  Status?: TagSyncTaskStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
}
export const GetTagSyncTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupArn: S.optional(S.String),
    GroupName: S.optional(S.String),
    TaskArn: S.optional(S.String),
    TagKey: S.optional(S.String),
    TagValue: S.optional(S.String),
    ResourceQuery: S.optional(ResourceQuery),
    RoleArn: S.optional(S.String),
    Status: S.optional(TagSyncTaskStatus),
    ErrorMessage: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetTagSyncTaskOutput",
}) as any as S.Schema<GetTagSyncTaskOutput>;
export type ResourceArn = string;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface GroupResourcesInput {
  Group: string;
  ResourceArns: string[];
}
export const GroupResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.String, ResourceArns: ResourceArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/group-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GroupResourcesInput",
}) as any as S.Schema<GroupResourcesInput>;
export type ErrorCode = string;
export interface FailedResource {
  ResourceArn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
}
export const FailedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
  }),
).annotate({ identifier: "FailedResource" }) as any as S.Schema<FailedResource>;
export type FailedResourceList = FailedResource[];
export const FailedResourceList = /*@__PURE__*/ S.Array(FailedResource);
export interface PendingResource {
  ResourceArn?: string;
}
export const PendingResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }),
).annotate({
  identifier: "PendingResource",
}) as any as S.Schema<PendingResource>;
export type PendingResourceList = PendingResource[];
export const PendingResourceList = /*@__PURE__*/ S.Array(PendingResource);
export interface GroupResourcesOutput {
  Succeeded?: string[];
  Failed?: FailedResource[];
  Pending?: PendingResource[];
}
export const GroupResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Succeeded: S.optional(ResourceArnList),
    Failed: S.optional(FailedResourceList),
    Pending: S.optional(PendingResourceList),
  }),
).annotate({
  identifier: "GroupResourcesOutput",
}) as any as S.Schema<GroupResourcesOutput>;
export type MaxResults = number;
export type ListGroupingStatusesFilterName =
  | "status"
  | "resource-arn"
  | (string & {});
export const ListGroupingStatusesFilterName = /*@__PURE__*/ S.String;

export type ListGroupingStatusesFilterValue = string;
export type ListGroupingStatusesFilterValues = string[];
export const ListGroupingStatusesFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface ListGroupingStatusesFilter {
  Name: ListGroupingStatusesFilterName;
  Values: string[];
}
export const ListGroupingStatusesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: ListGroupingStatusesFilterName,
    Values: ListGroupingStatusesFilterValues,
  }),
).annotate({
  identifier: "ListGroupingStatusesFilter",
}) as any as S.Schema<ListGroupingStatusesFilter>;
export type ListGroupingStatusesFilterList = ListGroupingStatusesFilter[];
export const ListGroupingStatusesFilterList = /*@__PURE__*/ S.Array(
  ListGroupingStatusesFilter,
);
export type NextToken = string;
export interface ListGroupingStatusesInput {
  Group: string;
  MaxResults?: number;
  Filters?: ListGroupingStatusesFilter[];
  NextToken?: string;
}
export const ListGroupingStatusesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.String,
    MaxResults: S.optional(S.Number),
    Filters: S.optional(ListGroupingStatusesFilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-grouping-statuses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupingStatusesInput",
}) as any as S.Schema<ListGroupingStatusesInput>;
export type GroupingType = "GROUP" | "UNGROUP" | (string & {});
export const GroupingType = /*@__PURE__*/ S.String;

export type GroupingStatus =
  | "SUCCESS"
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | (string & {});
export const GroupingStatus = /*@__PURE__*/ S.String;

export interface GroupingStatusesItem {
  ResourceArn?: string;
  Action?: GroupingType;
  Status?: GroupingStatus;
  ErrorMessage?: string;
  ErrorCode?: string;
  UpdatedAt?: Date;
}
export const GroupingStatusesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Action: S.optional(GroupingType),
    Status: S.optional(GroupingStatus),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GroupingStatusesItem",
}) as any as S.Schema<GroupingStatusesItem>;
export type GroupingStatusesList = GroupingStatusesItem[];
export const GroupingStatusesList = /*@__PURE__*/ S.Array(GroupingStatusesItem);
export interface ListGroupingStatusesOutput {
  Group?: string;
  GroupingStatuses?: GroupingStatusesItem[];
  NextToken?: string;
}
export const ListGroupingStatusesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.optional(S.String),
    GroupingStatuses: S.optional(GroupingStatusesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupingStatusesOutput",
}) as any as S.Schema<ListGroupingStatusesOutput>;
export type ResourceFilterName = "resource-type" | (string & {});
export const ResourceFilterName = /*@__PURE__*/ S.String;

export type ResourceFilterValue = string;
export type ResourceFilterValues = string[];
export const ResourceFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface ResourceFilter {
  Name: ResourceFilterName;
  Values: string[];
}
export const ResourceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: ResourceFilterName, Values: ResourceFilterValues }),
).annotate({ identifier: "ResourceFilter" }) as any as S.Schema<ResourceFilter>;
export type ResourceFilterList = ResourceFilter[];
export const ResourceFilterList = /*@__PURE__*/ S.Array(ResourceFilter);
export interface ListGroupResourcesInput {
  GroupName?: string;
  Group?: string;
  Filters?: ResourceFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
    Filters: S.optional(ResourceFilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-group-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupResourcesInput",
}) as any as S.Schema<ListGroupResourcesInput>;
export type ResourceType = string;
export interface ResourceIdentifier {
  ResourceArn?: string;
  ResourceType?: string;
}
export const ResourceIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceIdentifier",
}) as any as S.Schema<ResourceIdentifier>;
export type ResourceStatusValue = "PENDING" | (string & {});
export const ResourceStatusValue = /*@__PURE__*/ S.String;

export interface ResourceStatus {
  Name?: ResourceStatusValue;
}
export const ResourceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(ResourceStatusValue) }),
).annotate({ identifier: "ResourceStatus" }) as any as S.Schema<ResourceStatus>;
export interface ListGroupResourcesItem {
  Identifier?: ResourceIdentifier;
  Status?: ResourceStatus;
}
export const ListGroupResourcesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(ResourceIdentifier),
    Status: S.optional(ResourceStatus),
  }),
).annotate({
  identifier: "ListGroupResourcesItem",
}) as any as S.Schema<ListGroupResourcesItem>;
export type ListGroupResourcesItemList = ListGroupResourcesItem[];
export const ListGroupResourcesItemList = /*@__PURE__*/ S.Array(
  ListGroupResourcesItem,
);
export type ResourceIdentifierList = ResourceIdentifier[];
export const ResourceIdentifierList = /*@__PURE__*/ S.Array(ResourceIdentifier);
export type QueryErrorCode =
  | "CLOUDFORMATION_STACK_INACTIVE"
  | "CLOUDFORMATION_STACK_NOT_EXISTING"
  | "CLOUDFORMATION_STACK_UNASSUMABLE_ROLE"
  | "RESOURCE_TYPE_NOT_SUPPORTED"
  | (string & {});
export const QueryErrorCode = /*@__PURE__*/ S.String;

export type QueryErrorMessage = string;
export interface QueryError {
  ErrorCode?: QueryErrorCode;
  Message?: string;
}
export const QueryError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(QueryErrorCode),
    Message: S.optional(S.String),
  }),
).annotate({ identifier: "QueryError" }) as any as S.Schema<QueryError>;
export type QueryErrorList = QueryError[];
export const QueryErrorList = /*@__PURE__*/ S.Array(QueryError);
export interface ListGroupResourcesOutput {
  Resources?: ListGroupResourcesItem[];
  ResourceIdentifiers?: ResourceIdentifier[];
  NextToken?: string;
  QueryErrors?: QueryError[];
}
export const ListGroupResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(ListGroupResourcesItemList),
    ResourceIdentifiers: S.optional(ResourceIdentifierList),
    NextToken: S.optional(S.String),
    QueryErrors: S.optional(QueryErrorList),
  }),
).annotate({
  identifier: "ListGroupResourcesOutput",
}) as any as S.Schema<ListGroupResourcesOutput>;
export type GroupFilterName =
  | "resource-type"
  | "configuration-type"
  | "owner"
  | "display-name"
  | "criticality"
  | (string & {});
export const GroupFilterName = /*@__PURE__*/ S.String;

export type GroupFilterValue = string;
export type GroupFilterValues = string[];
export const GroupFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface GroupFilter {
  Name: GroupFilterName;
  Values: string[];
}
export const GroupFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: GroupFilterName, Values: GroupFilterValues }),
).annotate({ identifier: "GroupFilter" }) as any as S.Schema<GroupFilter>;
export type GroupFilterList = GroupFilter[];
export const GroupFilterList = /*@__PURE__*/ S.Array(GroupFilter);
export interface ListGroupsInput {
  Filters?: GroupFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(GroupFilterList),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/groups-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupsInput",
}) as any as S.Schema<ListGroupsInput>;
export type GroupArn = string;
export interface GroupIdentifier {
  GroupName?: string;
  GroupArn?: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export const GroupIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupArn: S.optional(S.String),
    Description: S.optional(S.String),
    Criticality: S.optional(S.Number),
    Owner: S.optional(S.String),
    DisplayName: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupIdentifier",
}) as any as S.Schema<GroupIdentifier>;
export type GroupIdentifierList = GroupIdentifier[];
export const GroupIdentifierList = /*@__PURE__*/ S.Array(GroupIdentifier);
export type GroupList = Group[];
export const GroupList = /*@__PURE__*/ S.Array(Group);
export interface ListGroupsOutput {
  GroupIdentifiers?: GroupIdentifier[];
  Groups?: Group[];
  NextToken?: string;
}
export const ListGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifiers: S.optional(GroupIdentifierList),
    Groups: S.optional(GroupList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupsOutput",
}) as any as S.Schema<ListGroupsOutput>;
export interface ListTagSyncTasksFilter {
  GroupArn?: string;
  GroupName?: string;
}
export const ListTagSyncTasksFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupArn: S.optional(S.String), GroupName: S.optional(S.String) }),
).annotate({
  identifier: "ListTagSyncTasksFilter",
}) as any as S.Schema<ListTagSyncTasksFilter>;
export type ListTagSyncTasksFilterList = ListTagSyncTasksFilter[];
export const ListTagSyncTasksFilterList = /*@__PURE__*/ S.Array(
  ListTagSyncTasksFilter,
);
export interface ListTagSyncTasksInput {
  Filters?: ListTagSyncTasksFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagSyncTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ListTagSyncTasksFilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-tag-sync-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagSyncTasksInput",
}) as any as S.Schema<ListTagSyncTasksInput>;
export interface TagSyncTaskItem {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
  Status?: TagSyncTaskStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
}
export const TagSyncTaskItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupArn: S.optional(S.String),
    GroupName: S.optional(S.String),
    TaskArn: S.optional(S.String),
    TagKey: S.optional(S.String),
    TagValue: S.optional(S.String),
    ResourceQuery: S.optional(ResourceQuery),
    RoleArn: S.optional(S.String),
    Status: S.optional(TagSyncTaskStatus),
    ErrorMessage: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TagSyncTaskItem",
}) as any as S.Schema<TagSyncTaskItem>;
export type TagSyncTaskList = TagSyncTaskItem[];
export const TagSyncTaskList = /*@__PURE__*/ S.Array(TagSyncTaskItem);
export interface ListTagSyncTasksOutput {
  TagSyncTasks?: TagSyncTaskItem[];
  NextToken?: string;
}
export const ListTagSyncTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagSyncTasks: S.optional(TagSyncTaskList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTagSyncTasksOutput",
}) as any as S.Schema<ListTagSyncTasksOutput>;
export interface PutGroupConfigurationInput {
  Group?: string;
  Configuration?: GroupConfigurationItem[];
}
export const PutGroupConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.optional(S.String),
    Configuration: S.optional(GroupConfigurationList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/put-group-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGroupConfigurationInput",
}) as any as S.Schema<PutGroupConfigurationInput>;
export interface PutGroupConfigurationOutput {}
export const PutGroupConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutGroupConfigurationOutput",
}) as any as S.Schema<PutGroupConfigurationOutput>;
export interface SearchResourcesInput {
  ResourceQuery: ResourceQuery;
  MaxResults?: number;
  NextToken?: string;
}
export const SearchResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceQuery: ResourceQuery,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/resources/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchResourcesInput",
}) as any as S.Schema<SearchResourcesInput>;
export interface SearchResourcesOutput {
  ResourceIdentifiers?: ResourceIdentifier[];
  NextToken?: string;
  QueryErrors?: QueryError[];
}
export const SearchResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdentifiers: S.optional(ResourceIdentifierList),
    NextToken: S.optional(S.String),
    QueryErrors: S.optional(QueryErrorList),
  }),
).annotate({
  identifier: "SearchResourcesOutput",
}) as any as S.Schema<SearchResourcesOutput>;
export interface StartTagSyncTaskInput {
  Group: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn: string;
}
export const StartTagSyncTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.String,
    TagKey: S.optional(S.String),
    TagValue: S.optional(S.String),
    ResourceQuery: S.optional(ResourceQuery),
    RoleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-tag-sync-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTagSyncTaskInput",
}) as any as S.Schema<StartTagSyncTaskInput>;
export interface StartTagSyncTaskOutput {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
}
export const StartTagSyncTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupArn: S.optional(S.String),
    GroupName: S.optional(S.String),
    TaskArn: S.optional(S.String),
    TagKey: S.optional(S.String),
    TagValue: S.optional(S.String),
    ResourceQuery: S.optional(ResourceQuery),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartTagSyncTaskOutput",
}) as any as S.Schema<StartTagSyncTaskOutput>;
export interface TagInput {
  Arn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")), Tags: Tags }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/resources/{Arn}/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "TagInput" }) as any as S.Schema<TagInput>;
export interface TagOutput {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Tags: S.optional(Tags) }),
).annotate({ identifier: "TagOutput" }) as any as S.Schema<TagOutput>;
export interface UngroupResourcesInput {
  Group: string;
  ResourceArns: string[];
}
export const UngroupResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.String, ResourceArns: ResourceArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ungroup-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UngroupResourcesInput",
}) as any as S.Schema<UngroupResourcesInput>;
export interface UngroupResourcesOutput {
  Succeeded?: string[];
  Failed?: FailedResource[];
  Pending?: PendingResource[];
}
export const UngroupResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Succeeded: S.optional(ResourceArnList),
    Failed: S.optional(FailedResourceList),
    Pending: S.optional(PendingResourceList),
  }),
).annotate({
  identifier: "UngroupResourcesOutput",
}) as any as S.Schema<UngroupResourcesOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagInput {
  Arn: string;
  Keys: string[];
}
export const UntagInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")), Keys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/resources/{Arn}/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "UntagInput" }) as any as S.Schema<UntagInput>;
export interface UntagOutput {
  Arn?: string;
  Keys?: string[];
}
export const UntagOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Keys: S.optional(TagKeyList) }),
).annotate({ identifier: "UntagOutput" }) as any as S.Schema<UntagOutput>;
export interface UpdateAccountSettingsInput {
  GroupLifecycleEventsDesiredStatus?: GroupLifecycleEventsDesiredStatus;
}
export const UpdateAccountSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupLifecycleEventsDesiredStatus: S.optional(
      GroupLifecycleEventsDesiredStatus,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-account-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountSettingsInput",
}) as any as S.Schema<UpdateAccountSettingsInput>;
export interface UpdateAccountSettingsOutput {
  AccountSettings?: AccountSettings;
}
export const UpdateAccountSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "UpdateAccountSettingsOutput",
}) as any as S.Schema<UpdateAccountSettingsOutput>;
export interface UpdateGroupInput {
  GroupName?: string;
  Group?: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export const UpdateGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
    Description: S.optional(S.String),
    Criticality: S.optional(S.Number),
    Owner: S.optional(S.String),
    DisplayName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGroupInput",
}) as any as S.Schema<UpdateGroupInput>;
export interface UpdateGroupOutput {
  Group?: Group;
}
export const UpdateGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "UpdateGroupOutput",
}) as any as S.Schema<UpdateGroupOutput>;
export interface UpdateGroupQueryInput {
  GroupName?: string;
  Group?: string;
  ResourceQuery: ResourceQuery;
}
export const UpdateGroupQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    Group: S.optional(S.String),
    ResourceQuery: ResourceQuery,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-group-query" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGroupQueryInput",
}) as any as S.Schema<UpdateGroupQueryInput>;
export interface UpdateGroupQueryOutput {
  GroupQuery?: GroupQuery;
}
export const UpdateGroupQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupQuery: S.optional(GroupQuery) }),
).annotate({
  identifier: "UpdateGroupQueryOutput",
}) as any as S.Schema<UpdateGroupQueryOutput>;
export type CancelTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels the specified tag-sync task.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:CancelTagSyncTask` on the application group
 *
 * - `resource-groups:DeleteGroup`
 */
export const cancelTagSyncTask: API.OperationMethod<
  CancelTagSyncTaskInput,
  CancelTagSyncTaskResponse,
  CancelTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTagSyncTaskInput,
  output: CancelTagSyncTaskResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTagSyncTask",
}));

export type CreateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | GroupAlreadyExists
  | CommonErrors;
/**
 * Creates a resource group with the specified name and description. You can optionally
 * include either a resource query or a service configuration. For more information about
 * constructing a resource query, see Build queries and groups in
 * Resource Groups in the *Resource Groups User Guide*. For more information
 * about service-linked groups and service configurations, see Service configurations for Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:CreateGroup`
 */
export const createGroup: API.OperationMethod<
  CreateGroupInput,
  CreateGroupOutput,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupInput,
  output: CreateGroupOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    GroupAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type DeleteGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified resource group. Deleting a resource group does not delete any
 * resources that are members of the group; it only deletes the group structure.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:DeleteGroup`
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupInput,
  DeleteGroupOutput,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupInput,
  output: DeleteGroupOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type GetAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current status of optional features in Resource Groups.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsOutput,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: GetAccountSettingsOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specified resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroup`
 */
export const getGroup: API.OperationMethod<
  GetGroupInput,
  GetGroupOutput,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupInput,
  output: GetGroupOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the service configuration associated with the specified resource group. For
 * details about the service configuration syntax, see Service configurations for Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroupConfiguration`
 */
export const getGroupConfiguration: API.OperationMethod<
  GetGroupConfigurationInput,
  GetGroupConfigurationOutput,
  GetGroupConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupConfigurationInput,
  output: GetGroupConfigurationOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupConfiguration",
}));

export type GetGroupQueryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the resource query associated with the specified resource group. For more
 * information about resource queries, see Create
 * a tag-based group in Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroupQuery`
 */
export const getGroupQuery: API.OperationMethod<
  GetGroupQueryInput,
  GetGroupQueryOutput,
  GetGroupQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupQueryInput,
  output: GetGroupQueryOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupQuery",
}));

export type GetTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of tags that are associated with a resource group, specified by an
 * Amazon resource name (ARN).
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetTags`
 */
export const getTags: API.OperationMethod<
  GetTagsInput,
  GetTagsOutput,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagsInput,
  output: GetTagsOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a specified tag-sync task.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetTagSyncTask` on the application group
 */
export const getTagSyncTask: API.OperationMethod<
  GetTagSyncTaskInput,
  GetTagSyncTaskOutput,
  GetTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagSyncTaskInput,
  output: GetTagSyncTaskOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTagSyncTask",
}));

export type GroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds the specified resources to the specified group.
 *
 * You can only use this operation with the following groups:
 *
 * - `AWS::EC2::HostManagement`
 *
 * - `AWS::EC2::CapacityReservationPool`
 *
 * - `AWS::ResourceGroups::ApplicationGroup`
 *
 * Other resource group types and resource types are not currently supported by this
 * operation.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GroupResources`
 */
export const groupResources: API.OperationMethod<
  GroupResourcesInput,
  GroupResourcesOutput,
  GroupResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GroupResourcesInput,
  output: GroupResourcesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GroupResources",
}));

export type ListGroupingStatusesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the status of the last grouping or ungrouping action for
 * each resource in the specified application group.
 */
export const listGroupingStatuses: API.PaginatedOperationMethod<
  ListGroupingStatusesInput,
  ListGroupingStatusesOutput,
  ListGroupingStatusesError,
  Credentials | HttpClient.HttpClient,
  GroupingStatusesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupingStatusesInput,
  output: ListGroupingStatusesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupingStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupingStatuses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of Amazon resource names (ARNs) of the resources that are members of a specified resource
 * group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListGroupResources`
 *
 * - `cloudformation:DescribeStacks`
 *
 * - `cloudformation:ListStackResources`
 *
 * - `tag:GetResources`
 */
export const listGroupResources: API.PaginatedOperationMethod<
  ListGroupResourcesInput,
  ListGroupResourcesOutput,
  ListGroupResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupResourcesInput,
  output: ListGroupResourcesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing Resource Groups in your account.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListGroups`
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsInput,
  ListGroupsOutput,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsInput,
  output: ListGroupsOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagSyncTasksError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of tag-sync tasks.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListTagSyncTasks` with the group passed in the filters as the resource
 * or * if using no filters
 */
export const listTagSyncTasks: API.PaginatedOperationMethod<
  ListTagSyncTasksInput,
  ListTagSyncTasksOutput,
  ListTagSyncTasksError,
  Credentials | HttpClient.HttpClient,
  TagSyncTaskItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagSyncTasksInput,
  output: ListTagSyncTasksOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagSyncTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TagSyncTasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutGroupConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Attaches a service configuration to the specified group. This occurs asynchronously,
 * and can take time to complete. You can use GetGroupConfiguration to
 * check the status of the update.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:PutGroupConfiguration`
 */
export const putGroupConfiguration: API.OperationMethod<
  PutGroupConfigurationInput,
  PutGroupConfigurationOutput,
  PutGroupConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGroupConfigurationInput,
  output: PutGroupConfigurationOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGroupConfiguration",
}));

export type SearchResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of Amazon Web Services resource identifiers that matches the specified query. The
 * query uses the same format as a resource query in a CreateGroup or
 * UpdateGroupQuery operation.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:SearchResources`
 *
 * - `cloudformation:DescribeStacks`
 *
 * - `cloudformation:ListStackResources`
 *
 * - `tag:GetResources`
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesInput,
  SearchResourcesOutput,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchResourcesInput,
  output: SearchResourcesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new tag-sync task to onboard and sync resources tagged with a specific tag key-value pair to an
 * application. To start a tag-sync task, you need a resource tagging role.
 * The resource tagging role grants permissions to tag and untag applications resources and must include a
 * trust policy that allows Resource Groups to assume the role and perform resource tagging tasks on your behalf.
 *
 * For instructions on creating a tag-sync task, see Create a tag-sync
 * using the Resource Groups API in the *Amazon Web Services Service Catalog AppRegistry Administrator Guide*.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:StartTagSyncTask` on the application group
 *
 * - `resource-groups:CreateGroup`
 *
 * - `iam:PassRole` on the role provided in the request
 */
export const startTagSyncTask: API.OperationMethod<
  StartTagSyncTaskInput,
  StartTagSyncTaskOutput,
  StartTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTagSyncTaskInput,
  output: StartTagSyncTaskOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTagSyncTask",
}));

export type TagError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds tags to a resource group with the specified Amazon resource name (ARN). Existing tags on a resource
 * group are not changed if they are not specified in the request parameters.
 *
 * Do not store personally identifiable information (PII) or other confidential or
 * sensitive information in tags. We use tags to provide you with billing and
 * administration services. Tags are not intended to be used for private or sensitive
 * data.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:Tag`
 */
export const tag: API.OperationMethod<
  TagInput,
  TagOutput,
  TagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagInput,
  output: TagOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Tag",
}));

export type UngroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified resources from the specified group. This operation works only
 * with static groups that you populated using the GroupResources
 * operation. It doesn't work with any resource groups that are automatically populated by
 * tag-based or CloudFormation stack-based queries.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UngroupResources`
 */
export const ungroupResources: API.OperationMethod<
  UngroupResourcesInput,
  UngroupResourcesOutput,
  UngroupResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UngroupResourcesInput,
  output: UngroupResourcesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UngroupResources",
}));

export type UntagError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes tags from a specified resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:Untag`
 */
export const untag: API.OperationMethod<
  UntagInput,
  UntagOutput,
  UntagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagInput,
  output: UntagOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Untag",
}));

export type UpdateAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Turns on or turns off optional features in Resource Groups.
 *
 * The preceding example shows that the request to turn on group lifecycle events is
 * `IN_PROGRESS`. You can call the GetAccountSettings
 * operation to check for completion by looking for `GroupLifecycleEventsStatus`
 * to change to `ACTIVE`.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsInput,
  UpdateAccountSettingsOutput,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountSettingsInput,
  output: UpdateAccountSettingsOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description for an existing group. You cannot update the name of a
 * resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UpdateGroup`
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupInput,
  UpdateGroupOutput,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupInput,
  output: UpdateGroupOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateGroupQueryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the resource query of a group. For more information about resource queries,
 * see Create a tag-based group in Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UpdateGroupQuery`
 */
export const updateGroupQuery: API.OperationMethod<
  UpdateGroupQueryInput,
  UpdateGroupQueryOutput,
  UpdateGroupQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupQueryInput,
  output: UpdateGroupQueryOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupQuery",
}));
