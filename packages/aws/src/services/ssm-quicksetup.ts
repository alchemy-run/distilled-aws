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
  sdkId: "SSM QuickSetup",
  serviceShapeName: "QuickSetup",
});
const auth = T.AwsAuthSigv4({ name: "ssm-quicksetup" });
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
              `https://ssm-quicksetup-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-quicksetup-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm-quicksetup.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ConfigurationParametersMap = { [key: string]: string | undefined };
export const ConfigurationParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type IAMRoleArn = string;
export interface ConfigurationDefinitionInput {
  Type: string;
  Parameters: { [key: string]: string | undefined };
  TypeVersion?: string;
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
}
export const ConfigurationDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.String,
    Parameters: ConfigurationParametersMap,
    TypeVersion: S.optional(S.String),
    LocalDeploymentExecutionRoleName: S.optional(S.String),
    LocalDeploymentAdministrationRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationDefinitionInput",
}) as any as S.Schema<ConfigurationDefinitionInput>;
export type ConfigurationDefinitionsInputList = ConfigurationDefinitionInput[];
export const ConfigurationDefinitionsInputList = /*@__PURE__*/ S.Array(
  ConfigurationDefinitionInput,
);
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateConfigurationManagerInput {
  Name?: string;
  Description?: string;
  ConfigurationDefinitions: ConfigurationDefinitionInput[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateConfigurationManagerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ConfigurationDefinitions: ConfigurationDefinitionsInputList,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configurationManager" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationManagerInput",
}) as any as S.Schema<CreateConfigurationManagerInput>;
export interface CreateConfigurationManagerOutput {
  ManagerArn: string;
}
export const CreateConfigurationManagerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagerArn: S.String }),
).annotate({
  identifier: "CreateConfigurationManagerOutput",
}) as any as S.Schema<CreateConfigurationManagerOutput>;
export interface DeleteConfigurationManagerInput {
  ManagerArn: string;
}
export const DeleteConfigurationManagerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/configurationManager/{ManagerArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationManagerInput",
}) as any as S.Schema<DeleteConfigurationManagerInput>;
export interface DeleteConfigurationManagerResponse {}
export const DeleteConfigurationManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationManagerResponse",
}) as any as S.Schema<DeleteConfigurationManagerResponse>;
export interface GetConfigurationInput {
  ConfigurationId: string;
}
export const GetConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/getConfiguration/{ConfigurationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationInput",
}) as any as S.Schema<GetConfigurationInput>;
export type StatusType = "Deployment" | "AsyncExecutions" | (string & {});
export const StatusType = S.String;

export type Status =
  | "INITIALIZING"
  | "DEPLOYING"
  | "SUCCEEDED"
  | "DELETING"
  | "STOPPING"
  | "FAILED"
  | "STOPPED"
  | "DELETE_FAILED"
  | "STOP_FAILED"
  | "NONE"
  | (string & {});
export const Status = S.String;

export type StatusDetails = { [key: string]: string | undefined };
export const StatusDetails = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StatusSummary {
  StatusType: StatusType;
  Status?: Status;
  StatusMessage?: string;
  LastUpdatedAt: Date;
  StatusDetails?: { [key: string]: string | undefined };
}
export const StatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusType: StatusType,
    Status: S.optional(Status),
    StatusMessage: S.optional(S.String),
    LastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    StatusDetails: S.optional(StatusDetails),
  }),
).annotate({ identifier: "StatusSummary" }) as any as S.Schema<StatusSummary>;
export type StatusSummariesList = StatusSummary[];
export const StatusSummariesList = /*@__PURE__*/ S.Array(StatusSummary);
export interface GetConfigurationOutput {
  Id?: string;
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
  Type?: string;
  TypeVersion?: string;
  Account?: string;
  Region?: string;
  CreatedAt?: Date;
  LastModifiedAt?: Date;
  StatusSummaries?: StatusSummary[];
  Parameters?: { [key: string]: string | undefined };
}
export const GetConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ManagerArn: S.optional(S.String),
    ConfigurationDefinitionId: S.optional(S.String),
    Type: S.optional(S.String),
    TypeVersion: S.optional(S.String),
    Account: S.optional(S.String),
    Region: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusSummaries: S.optional(StatusSummariesList),
    Parameters: S.optional(ConfigurationParametersMap),
  }),
).annotate({
  identifier: "GetConfigurationOutput",
}) as any as S.Schema<GetConfigurationOutput>;
export interface GetConfigurationManagerInput {
  ManagerArn: string;
}
export const GetConfigurationManagerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configurationManager/{ManagerArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationManagerInput",
}) as any as S.Schema<GetConfigurationManagerInput>;
export interface ConfigurationDefinition {
  Type: string;
  Parameters: { [key: string]: string | undefined };
  TypeVersion?: string;
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
  Id?: string;
}
export const ConfigurationDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.String,
    Parameters: ConfigurationParametersMap,
    TypeVersion: S.optional(S.String),
    LocalDeploymentExecutionRoleName: S.optional(S.String),
    LocalDeploymentAdministrationRoleArn: S.optional(S.String),
    Id: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationDefinition",
}) as any as S.Schema<ConfigurationDefinition>;
export type ConfigurationDefinitionsList = ConfigurationDefinition[];
export const ConfigurationDefinitionsList = /*@__PURE__*/ S.Array(
  ConfigurationDefinition,
);
export interface GetConfigurationManagerOutput {
  ManagerArn: string;
  Description?: string;
  Name?: string;
  CreatedAt?: Date;
  LastModifiedAt?: Date;
  StatusSummaries?: StatusSummary[];
  ConfigurationDefinitions?: ConfigurationDefinition[];
  Tags?: { [key: string]: string | undefined };
}
export const GetConfigurationManagerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagerArn: S.String,
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusSummaries: S.optional(StatusSummariesList),
    ConfigurationDefinitions: S.optional(ConfigurationDefinitionsList),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetConfigurationManagerOutput",
}) as any as S.Schema<GetConfigurationManagerOutput>;
export interface GetServiceSettingsRequest {}
export const GetServiceSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/serviceSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceSettingsRequest",
}) as any as S.Schema<GetServiceSettingsRequest>;
export interface ServiceSettings {
  ExplorerEnablingRoleArn?: string;
}
export const ServiceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplorerEnablingRoleArn: S.optional(S.String) }),
).annotate({
  identifier: "ServiceSettings",
}) as any as S.Schema<ServiceSettings>;
export interface GetServiceSettingsOutput {
  ServiceSettings?: ServiceSettings;
}
export const GetServiceSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceSettings: S.optional(ServiceSettings) }),
).annotate({
  identifier: "GetServiceSettingsOutput",
}) as any as S.Schema<GetServiceSettingsOutput>;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Key: string;
  Values: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Values: FilterValues }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FiltersList = Filter[];
export const FiltersList = /*@__PURE__*/ S.Array(Filter);
export interface ListConfigurationManagersInput {
  StartingToken?: string;
  MaxItems?: number;
  Filters?: Filter[];
}
export const ListConfigurationManagersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartingToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    Filters: S.optional(FiltersList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listConfigurationManagers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationManagersInput",
}) as any as S.Schema<ListConfigurationManagersInput>;
export interface ConfigurationDefinitionSummary {
  Id?: string;
  Type?: string;
  TypeVersion?: string;
  FirstClassParameters?: { [key: string]: string | undefined };
}
export const ConfigurationDefinitionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(S.String),
    TypeVersion: S.optional(S.String),
    FirstClassParameters: S.optional(ConfigurationParametersMap),
  }),
).annotate({
  identifier: "ConfigurationDefinitionSummary",
}) as any as S.Schema<ConfigurationDefinitionSummary>;
export type ConfigurationDefinitionSummariesList =
  ConfigurationDefinitionSummary[];
export const ConfigurationDefinitionSummariesList = /*@__PURE__*/ S.Array(
  ConfigurationDefinitionSummary,
);
export interface ConfigurationManagerSummary {
  ManagerArn: string;
  Description?: string;
  Name?: string;
  StatusSummaries?: StatusSummary[];
  ConfigurationDefinitionSummaries?: ConfigurationDefinitionSummary[];
}
export const ConfigurationManagerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagerArn: S.String,
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    StatusSummaries: S.optional(StatusSummariesList),
    ConfigurationDefinitionSummaries: S.optional(
      ConfigurationDefinitionSummariesList,
    ),
  }),
).annotate({
  identifier: "ConfigurationManagerSummary",
}) as any as S.Schema<ConfigurationManagerSummary>;
export type ConfigurationManagerList = ConfigurationManagerSummary[];
export const ConfigurationManagerList = /*@__PURE__*/ S.Array(
  ConfigurationManagerSummary,
);
export interface ListConfigurationManagersOutput {
  ConfigurationManagersList?: ConfigurationManagerSummary[];
  NextToken?: string;
}
export const ListConfigurationManagersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationManagersList: S.optional(ConfigurationManagerList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationManagersOutput",
}) as any as S.Schema<ListConfigurationManagersOutput>;
export interface ListConfigurationsInput {
  StartingToken?: string;
  MaxItems?: number;
  Filters?: Filter[];
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
}
export const ListConfigurationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartingToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    Filters: S.optional(FiltersList),
    ManagerArn: S.optional(S.String),
    ConfigurationDefinitionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationsInput",
}) as any as S.Schema<ListConfigurationsInput>;
export interface ConfigurationSummary {
  Id?: string;
  ManagerArn?: string;
  ConfigurationDefinitionId?: string;
  Type?: string;
  TypeVersion?: string;
  Region?: string;
  Account?: string;
  CreatedAt?: Date;
  FirstClassParameters?: { [key: string]: string | undefined };
  StatusSummaries?: StatusSummary[];
}
export const ConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ManagerArn: S.optional(S.String),
    ConfigurationDefinitionId: S.optional(S.String),
    Type: S.optional(S.String),
    TypeVersion: S.optional(S.String),
    Region: S.optional(S.String),
    Account: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FirstClassParameters: S.optional(ConfigurationParametersMap),
    StatusSummaries: S.optional(StatusSummariesList),
  }),
).annotate({
  identifier: "ConfigurationSummary",
}) as any as S.Schema<ConfigurationSummary>;
export type ConfigurationsList = ConfigurationSummary[];
export const ConfigurationsList = /*@__PURE__*/ S.Array(ConfigurationSummary);
export interface ListConfigurationsOutput {
  ConfigurationsList?: ConfigurationSummary[];
  NextToken?: string;
}
export const ListConfigurationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationsList: S.optional(ConfigurationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationsOutput",
}) as any as S.Schema<ListConfigurationsOutput>;
export interface ListQuickSetupTypesRequest {}
export const ListQuickSetupTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/listQuickSetupTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQuickSetupTypesRequest",
}) as any as S.Schema<ListQuickSetupTypesRequest>;
export interface QuickSetupTypeOutput {
  Type?: string;
  LatestVersion?: string;
}
export const QuickSetupTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), LatestVersion: S.optional(S.String) }),
).annotate({
  identifier: "QuickSetupTypeOutput",
}) as any as S.Schema<QuickSetupTypeOutput>;
export type QuickSetupTypeList = QuickSetupTypeOutput[];
export const QuickSetupTypeList = /*@__PURE__*/ S.Array(QuickSetupTypeOutput);
export interface ListQuickSetupTypesOutput {
  QuickSetupTypeList?: QuickSetupTypeOutput[];
}
export const ListQuickSetupTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QuickSetupTypeList: S.optional(QuickSetupTypeList) }),
).annotate({
  identifier: "ListQuickSetupTypesOutput",
}) as any as S.Schema<ListQuickSetupTypesOutput>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
export interface TagEntry {
  Key?: string;
  Value?: string;
}
export const TagEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "TagEntry" }) as any as S.Schema<TagEntry>;
export type Tags = TagEntry[];
export const Tags = /*@__PURE__*/ S.Array(TagEntry);
export interface ListTagsForResourceResponse {
  Tags?: TagEntry[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagsMap,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateConfigurationDefinitionInput {
  ManagerArn: string;
  Id: string;
  TypeVersion?: string;
  Parameters?: { [key: string]: string | undefined };
  LocalDeploymentExecutionRoleName?: string;
  LocalDeploymentAdministrationRoleArn?: string;
}
export const UpdateConfigurationDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")),
    Id: S.String.pipe(T.HttpLabel("Id")),
    TypeVersion: S.optional(S.String),
    Parameters: S.optional(ConfigurationParametersMap),
    LocalDeploymentExecutionRoleName: S.optional(S.String),
    LocalDeploymentAdministrationRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/configurationDefinition/{ManagerArn}/{Id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationDefinitionInput",
}) as any as S.Schema<UpdateConfigurationDefinitionInput>;
export interface UpdateConfigurationDefinitionResponse {}
export const UpdateConfigurationDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateConfigurationDefinitionResponse",
}) as any as S.Schema<UpdateConfigurationDefinitionResponse>;
export interface UpdateConfigurationManagerInput {
  ManagerArn: string;
  Name?: string;
  Description?: string;
}
export const UpdateConfigurationManagerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagerArn: S.String.pipe(T.HttpLabel("ManagerArn")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/configurationManager/{ManagerArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationManagerInput",
}) as any as S.Schema<UpdateConfigurationManagerInput>;
export interface UpdateConfigurationManagerResponse {}
export const UpdateConfigurationManagerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConfigurationManagerResponse",
}) as any as S.Schema<UpdateConfigurationManagerResponse>;
export interface UpdateServiceSettingsInput {
  ExplorerEnablingRoleArn?: string;
}
export const UpdateServiceSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplorerEnablingRoleArn: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/serviceSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceSettingsInput",
}) as any as S.Schema<UpdateServiceSettingsInput>;
export interface UpdateServiceSettingsResponse {}
export const UpdateServiceSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateServiceSettingsResponse",
}) as any as S.Schema<UpdateServiceSettingsResponse>;
export type CreateConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Quick Setup configuration manager resource. This object is a collection
 * of desired state configurations for multiple configuration definitions and
 * summaries describing the deployments of those definitions.
 */
export const createConfigurationManager: API.OperationMethod<
  CreateConfigurationManagerInput,
  CreateConfigurationManagerOutput,
  CreateConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationManagerInput,
  output: CreateConfigurationManagerOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationManager",
}));

export type DeleteConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configuration manager.
 */
export const deleteConfigurationManager: API.OperationMethod<
  DeleteConfigurationManagerInput,
  DeleteConfigurationManagerResponse,
  DeleteConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationManagerInput,
  output: DeleteConfigurationManagerResponse,
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
  operationName: "DeleteConfigurationManager",
}));

export type GetConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about the specified configuration.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationInput,
  GetConfigurationOutput,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationInput,
  output: GetConfigurationOutput,
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
  operationName: "GetConfiguration",
}));

export type GetConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a configuration manager.
 */
export const getConfigurationManager: API.OperationMethod<
  GetConfigurationManagerInput,
  GetConfigurationManagerOutput,
  GetConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationManagerInput,
  output: GetConfigurationManagerOutput,
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
  operationName: "GetConfigurationManager",
}));

export type GetServiceSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns settings configured for Quick Setup in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsOutput,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSettingsRequest,
  output: GetServiceSettingsOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

export type ListConfigurationManagersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Quick Setup configuration managers.
 */
export const listConfigurationManagers: API.PaginatedOperationMethod<
  ListConfigurationManagersInput,
  ListConfigurationManagersOutput,
  ListConfigurationManagersError,
  Credentials | HttpClient.HttpClient,
  ConfigurationManagerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationManagersInput,
  output: ListConfigurationManagersOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationManagers",
  pagination: {
    inputToken: "StartingToken",
    outputToken: "NextToken",
    items: "ConfigurationManagersList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns configurations deployed by Quick Setup in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsInput,
  ListConfigurationsOutput,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationsInput,
  output: ListConfigurationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  pagination: {
    inputToken: "StartingToken",
    outputToken: "NextToken",
    items: "ConfigurationsList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListQuickSetupTypesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the available Quick Setup types.
 */
export const listQuickSetupTypes: API.OperationMethod<
  ListQuickSetupTypesRequest,
  ListQuickSetupTypesOutput,
  ListQuickSetupTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListQuickSetupTypesRequest,
  output: ListQuickSetupTypesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickSetupTypes",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns tags assigned to the resource.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns key-value pairs of metadata to Amazon Web Services resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
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
  operationName: "UntagResource",
}));

export type UpdateConfigurationDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Quick Setup configuration definition.
 */
export const updateConfigurationDefinition: API.OperationMethod<
  UpdateConfigurationDefinitionInput,
  UpdateConfigurationDefinitionResponse,
  UpdateConfigurationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationDefinitionInput,
  output: UpdateConfigurationDefinitionResponse,
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
  operationName: "UpdateConfigurationDefinition",
}));

export type UpdateConfigurationManagerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Quick Setup configuration manager.
 */
export const updateConfigurationManager: API.OperationMethod<
  UpdateConfigurationManagerInput,
  UpdateConfigurationManagerResponse,
  UpdateConfigurationManagerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationManagerInput,
  output: UpdateConfigurationManagerResponse,
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
  operationName: "UpdateConfigurationManager",
}));

export type UpdateServiceSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates settings configured for Quick Setup.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsInput,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSettingsInput,
  output: UpdateServiceSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
}));
