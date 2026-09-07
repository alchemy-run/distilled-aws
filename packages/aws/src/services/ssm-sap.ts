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
const svc = T.AwsApiService({ sdkId: "Ssm Sap", serviceShapeName: "SsmSap" });
const auth = T.AwsAuthSigv4({ name: "ssm-sap" });
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
              `https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-sap-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm-sap.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type PermissionActionType = "RESTORE" | (string & {});
export const PermissionActionType = S.String;

export type Arn = string;
export interface DeleteResourcePermissionInput {
  ActionType?: PermissionActionType;
  SourceResourceArn?: string;
  ResourceArn: string;
}
export const DeleteResourcePermissionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: S.optional(PermissionActionType),
    SourceResourceArn: S.optional(S.String),
    ResourceArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-resource-permission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePermissionInput",
}) as any as S.Schema<DeleteResourcePermissionInput>;
export interface DeleteResourcePermissionOutput {
  Policy?: string;
}
export const DeleteResourcePermissionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "DeleteResourcePermissionOutput",
}) as any as S.Schema<DeleteResourcePermissionOutput>;
export type ApplicationId = string;
export interface DeregisterApplicationInput {
  ApplicationId: string;
}
export const DeregisterApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deregister-application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterApplicationInput",
}) as any as S.Schema<DeregisterApplicationInput>;
export interface DeregisterApplicationOutput {}
export const DeregisterApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterApplicationOutput",
}) as any as S.Schema<DeregisterApplicationOutput>;
export type SsmSapArn = string;
export type AppRegistryArn = string;
export interface GetApplicationInput {
  ApplicationId?: string;
  ApplicationArn?: string;
  AppRegistryArn?: string;
}
export const GetApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
    AppRegistryArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationInput",
}) as any as S.Schema<GetApplicationInput>;
export type ApplicationType = "HANA" | "SAP_ABAP" | (string & {});
export const ApplicationType = S.String;

export type ApplicationStatus =
  | "ACTIVATED"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "FAILED"
  | "REGISTERING"
  | "DELETING"
  | "UNKNOWN"
  | (string & {});
export const ApplicationStatus = S.String;

export type ApplicationDiscoveryStatus =
  | "SUCCESS"
  | "REGISTRATION_FAILED"
  | "REFRESH_FAILED"
  | "REGISTERING"
  | "DELETING"
  | (string & {});
export const ApplicationDiscoveryStatus = S.String;

export type ComponentId = string;
export type ComponentIdList = string[];
export const ComponentIdList = /*@__PURE__*/ S.Array(S.String);
export type ApplicationArnList = string[];
export const ApplicationArnList = /*@__PURE__*/ S.Array(S.String);
export interface Application {
  Id?: string;
  Type?: ApplicationType;
  Arn?: string;
  AppRegistryArn?: string;
  Status?: ApplicationStatus;
  DiscoveryStatus?: ApplicationDiscoveryStatus;
  Components?: string[];
  LastUpdated?: Date;
  StatusMessage?: string;
  AssociatedApplicationArns?: string[];
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(ApplicationType),
    Arn: S.optional(S.String),
    AppRegistryArn: S.optional(S.String),
    Status: S.optional(ApplicationStatus),
    DiscoveryStatus: S.optional(ApplicationDiscoveryStatus),
    Components: S.optional(ComponentIdList),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StatusMessage: S.optional(S.String),
    AssociatedApplicationArns: S.optional(ApplicationArnList),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetApplicationOutput {
  Application?: Application;
  Tags?: { [key: string]: string | undefined };
}
export const GetApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Application: S.optional(Application), Tags: S.optional(TagMap) }),
).annotate({
  identifier: "GetApplicationOutput",
}) as any as S.Schema<GetApplicationOutput>;
export interface GetComponentInput {
  ApplicationId: string;
  ComponentId: string;
}
export const GetComponentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String, ComponentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-component" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentInput",
}) as any as S.Schema<GetComponentInput>;
export type SID = string;
export type SAPInstanceNumber = string;
export type ComponentType =
  | "HANA"
  | "HANA_NODE"
  | "ABAP"
  | "ASCS"
  | "DIALOG"
  | "WEBDISP"
  | "WD"
  | "ERS"
  | (string & {});
export const ComponentType = S.String;

export type ComponentStatus =
  | "ACTIVATED"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "RUNNING"
  | "RUNNING_WITH_ERROR"
  | "UNDEFINED"
  | (string & {});
export const ComponentStatus = S.String;

export type ReplicationMode =
  | "PRIMARY"
  | "NONE"
  | "SYNC"
  | "SYNCMEM"
  | "ASYNC"
  | (string & {});
export const ReplicationMode = S.String;

export type OperationMode =
  | "PRIMARY"
  | "LOGREPLAY"
  | "DELTA_DATASHIPPING"
  | "LOGREPLAY_READACCESS"
  | "NONE"
  | (string & {});
export const OperationMode = S.String;

export type ClusterStatus =
  | "ONLINE"
  | "STANDBY"
  | "MAINTENANCE"
  | "OFFLINE"
  | "NONE"
  | (string & {});
export const ClusterStatus = S.String;

export interface Resilience {
  HsrTier?: string;
  HsrReplicationMode?: ReplicationMode;
  HsrOperationMode?: OperationMode;
  ClusterStatus?: ClusterStatus;
  EnqueueReplication?: boolean;
}
export const Resilience = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsrTier: S.optional(S.String),
    HsrReplicationMode: S.optional(ReplicationMode),
    HsrOperationMode: S.optional(OperationMode),
    ClusterStatus: S.optional(ClusterStatus),
    EnqueueReplication: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Resilience" }) as any as S.Schema<Resilience>;
export type AllocationType =
  | "VPC_SUBNET"
  | "ELASTIC_IP"
  | "OVERLAY"
  | "UNKNOWN"
  | (string & {});
export const AllocationType = S.String;

export interface IpAddressMember {
  IpAddress?: string;
  Primary?: boolean;
  AllocationType?: AllocationType;
}
export const IpAddressMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    Primary: S.optional(S.Boolean),
    AllocationType: S.optional(AllocationType),
  }),
).annotate({
  identifier: "IpAddressMember",
}) as any as S.Schema<IpAddressMember>;
export type IpAddressList = IpAddressMember[];
export const IpAddressList = /*@__PURE__*/ S.Array(IpAddressMember);
export interface AssociatedHost {
  Hostname?: string;
  Ec2InstanceId?: string;
  IpAddresses?: IpAddressMember[];
  OsVersion?: string;
}
export const AssociatedHost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Hostname: S.optional(S.String),
    Ec2InstanceId: S.optional(S.String),
    IpAddresses: S.optional(IpAddressList),
    OsVersion: S.optional(S.String),
  }),
).annotate({ identifier: "AssociatedHost" }) as any as S.Schema<AssociatedHost>;
export type DatabaseId = string;
export type DatabaseIdList = string[];
export const DatabaseIdList = /*@__PURE__*/ S.Array(S.String);
export type HostRole =
  | "LEADER"
  | "WORKER"
  | "STANDBY"
  | "UNKNOWN"
  | (string & {});
export const HostRole = S.String;

export interface Host {
  HostName?: string;
  HostIp?: string;
  EC2InstanceId?: string;
  InstanceId?: string;
  HostRole?: HostRole;
  OsVersion?: string;
}
export const Host = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostName: S.optional(S.String),
    HostIp: S.optional(S.String),
    EC2InstanceId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    HostRole: S.optional(HostRole),
    OsVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Host" }) as any as S.Schema<Host>;
export type HostList = Host[];
export const HostList = /*@__PURE__*/ S.Array(Host);
export type DatabaseConnectionMethod = "DIRECT" | "OVERLAY" | (string & {});
export const DatabaseConnectionMethod = S.String;

export interface DatabaseConnection {
  DatabaseConnectionMethod?: DatabaseConnectionMethod;
  DatabaseArn?: string;
  ConnectionIp?: string;
}
export const DatabaseConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseConnectionMethod: S.optional(DatabaseConnectionMethod),
    DatabaseArn: S.optional(S.String),
    ConnectionIp: S.optional(S.String),
  }),
).annotate({
  identifier: "DatabaseConnection",
}) as any as S.Schema<DatabaseConnection>;
export interface Component {
  ComponentId?: string;
  Sid?: string;
  SystemNumber?: string;
  ParentComponent?: string;
  ChildComponents?: string[];
  ApplicationId?: string;
  ComponentType?: ComponentType;
  Status?: ComponentStatus;
  SapHostname?: string;
  SapFeature?: string;
  SapKernelVersion?: string;
  HdbVersion?: string;
  Resilience?: Resilience;
  AssociatedHost?: AssociatedHost;
  Databases?: string[];
  Hosts?: Host[];
  PrimaryHost?: string;
  DatabaseConnection?: DatabaseConnection;
  LastUpdated?: Date;
  Arn?: string;
}
export const Component = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    Sid: S.optional(S.String),
    SystemNumber: S.optional(S.String),
    ParentComponent: S.optional(S.String),
    ChildComponents: S.optional(ComponentIdList),
    ApplicationId: S.optional(S.String),
    ComponentType: S.optional(ComponentType),
    Status: S.optional(ComponentStatus),
    SapHostname: S.optional(S.String),
    SapFeature: S.optional(S.String),
    SapKernelVersion: S.optional(S.String),
    HdbVersion: S.optional(S.String),
    Resilience: S.optional(Resilience),
    AssociatedHost: S.optional(AssociatedHost),
    Databases: S.optional(DatabaseIdList),
    Hosts: S.optional(HostList),
    PrimaryHost: S.optional(S.String),
    DatabaseConnection: S.optional(DatabaseConnection),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Component" }) as any as S.Schema<Component>;
export interface GetComponentOutput {
  Component?: Component;
  Tags?: { [key: string]: string | undefined };
}
export const GetComponentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Component: S.optional(Component), Tags: S.optional(TagMap) }),
).annotate({
  identifier: "GetComponentOutput",
}) as any as S.Schema<GetComponentOutput>;
export type OperationId = string;
export interface GetConfigurationCheckOperationInput {
  OperationId: string;
}
export const GetConfigurationCheckOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-configuration-check-operation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationCheckOperationInput",
}) as any as S.Schema<GetConfigurationCheckOperationInput>;
export type OperationStatus =
  | "INPROGRESS"
  | "SUCCESS"
  | "ERROR"
  | (string & {});
export const OperationStatus = S.String;

export type ConfigurationCheckType =
  | "SAP_CHECK_01"
  | "SAP_CHECK_02"
  | "SAP_CHECK_03"
  | (string & {});
export const ConfigurationCheckType = S.String;

export interface RuleStatusCounts {
  Failed?: number;
  Warning?: number;
  Info?: number;
  Passed?: number;
  Unknown?: number;
}
export const RuleStatusCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Failed: S.optional(S.Number),
    Warning: S.optional(S.Number),
    Info: S.optional(S.Number),
    Passed: S.optional(S.Number),
    Unknown: S.optional(S.Number),
  }),
).annotate({
  identifier: "RuleStatusCounts",
}) as any as S.Schema<RuleStatusCounts>;
export interface ConfigurationCheckOperation {
  Id?: string;
  ApplicationId?: string;
  Status?: OperationStatus;
  StatusMessage?: string;
  ConfigurationCheckId?: ConfigurationCheckType;
  ConfigurationCheckName?: string;
  ConfigurationCheckDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  RuleStatusCounts?: RuleStatusCounts;
}
export const ConfigurationCheckOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ApplicationId: S.optional(S.String),
    Status: S.optional(OperationStatus),
    StatusMessage: S.optional(S.String),
    ConfigurationCheckId: S.optional(ConfigurationCheckType),
    ConfigurationCheckName: S.optional(S.String),
    ConfigurationCheckDescription: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RuleStatusCounts: S.optional(RuleStatusCounts),
  }),
).annotate({
  identifier: "ConfigurationCheckOperation",
}) as any as S.Schema<ConfigurationCheckOperation>;
export interface GetConfigurationCheckOperationOutput {
  ConfigurationCheckOperation?: ConfigurationCheckOperation;
}
export const GetConfigurationCheckOperationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationCheckOperation: S.optional(ConfigurationCheckOperation),
    }),
).annotate({
  identifier: "GetConfigurationCheckOperationOutput",
}) as any as S.Schema<GetConfigurationCheckOperationOutput>;
export interface GetDatabaseInput {
  ApplicationId?: string;
  ComponentId?: string;
  DatabaseId?: string;
  DatabaseArn?: string;
}
export const GetDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ComponentId: S.optional(S.String),
    DatabaseId: S.optional(S.String),
    DatabaseArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-database" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDatabaseInput",
}) as any as S.Schema<GetDatabaseInput>;
export type DatabaseName = string;
export type CredentialType = "ADMIN" | (string & {});
export const CredentialType = S.String;

export type SecretId = string | redacted.Redacted<string>;
export interface ApplicationCredential {
  DatabaseName: string;
  CredentialType: CredentialType;
  SecretId: string | redacted.Redacted<string>;
}
export const ApplicationCredential = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    CredentialType: CredentialType,
    SecretId: SensitiveString,
  }),
).annotate({
  identifier: "ApplicationCredential",
}) as any as S.Schema<ApplicationCredential>;
export type ApplicationCredentialList = ApplicationCredential[];
export const ApplicationCredentialList = /*@__PURE__*/ S.Array(
  ApplicationCredential,
);
export type DatabaseType = "SYSTEM" | "TENANT" | (string & {});
export const DatabaseType = S.String;

export type DatabaseStatus =
  | "RUNNING"
  | "STARTING"
  | "STOPPED"
  | "WARNING"
  | "UNKNOWN"
  | "ERROR"
  | "STOPPING"
  | (string & {});
export const DatabaseStatus = S.String;

export type ComponentArnList = string[];
export const ComponentArnList = /*@__PURE__*/ S.Array(S.String);
export interface Database {
  ApplicationId?: string;
  ComponentId?: string;
  Credentials?: ApplicationCredential[];
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseType?: DatabaseType;
  Arn?: string;
  Status?: DatabaseStatus;
  PrimaryHost?: string;
  SQLPort?: number;
  LastUpdated?: Date;
  ConnectedComponentArns?: string[];
}
export const Database = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ComponentId: S.optional(S.String),
    Credentials: S.optional(ApplicationCredentialList),
    DatabaseId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    DatabaseType: S.optional(DatabaseType),
    Arn: S.optional(S.String),
    Status: S.optional(DatabaseStatus),
    PrimaryHost: S.optional(S.String),
    SQLPort: S.optional(S.Number),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ConnectedComponentArns: S.optional(ComponentArnList),
  }),
).annotate({ identifier: "Database" }) as any as S.Schema<Database>;
export interface GetDatabaseOutput {
  Database?: Database;
  Tags?: { [key: string]: string | undefined };
}
export const GetDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Database: S.optional(Database), Tags: S.optional(TagMap) }),
).annotate({
  identifier: "GetDatabaseOutput",
}) as any as S.Schema<GetDatabaseOutput>;
export interface GetOperationInput {
  OperationId: string;
}
export const GetOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-operation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOperationInput",
}) as any as S.Schema<GetOperationInput>;
export type OperationType = string;
export type OperationProperties = { [key: string]: string | undefined };
export const OperationProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
).pipe(T.Sparse());
export type ResourceType = string;
export type ResourceId = string;
export interface Operation {
  Id?: string;
  Type?: string;
  Status?: OperationStatus;
  StatusMessage?: string;
  Properties?: { [key: string]: string | undefined };
  ResourceType?: string;
  ResourceId?: string;
  ResourceArn?: string;
  StartTime?: Date;
  EndTime?: Date;
  LastUpdatedTime?: Date;
}
export const Operation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(S.String),
    Status: S.optional(OperationStatus),
    StatusMessage: S.optional(S.String),
    Properties: S.optional(OperationProperties),
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Operation" }) as any as S.Schema<Operation>;
export interface GetOperationOutput {
  Operation?: Operation;
}
export const GetOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operation: S.optional(Operation) }),
).annotate({
  identifier: "GetOperationOutput",
}) as any as S.Schema<GetOperationOutput>;
export interface GetResourcePermissionInput {
  ActionType?: PermissionActionType;
  ResourceArn: string;
}
export const GetResourcePermissionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: S.optional(PermissionActionType),
    ResourceArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-resource-permission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePermissionInput",
}) as any as S.Schema<GetResourcePermissionInput>;
export interface GetResourcePermissionOutput {
  Policy?: string;
}
export const GetResourcePermissionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePermissionOutput",
}) as any as S.Schema<GetResourcePermissionOutput>;
export type NextToken = string;
export type MaxResults = number;
export type FilterName = string;
export type FilterValue = string;
export type FilterOperator =
  | "Equals"
  | "GreaterThanOrEquals"
  | "LessThanOrEquals"
  | (string & {});
export const FilterOperator = S.String;

export interface Filter {
  Name: string;
  Value: string;
  Operator: FilterOperator;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String, Operator: FilterOperator }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface ListApplicationsInput {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListApplicationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsInput",
}) as any as S.Schema<ListApplicationsInput>;
export interface ApplicationSummary {
  Id?: string;
  DiscoveryStatus?: ApplicationDiscoveryStatus;
  Type?: ApplicationType;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    DiscoveryStatus: S.optional(ApplicationDiscoveryStatus),
    Type: S.optional(ApplicationType),
    Arn: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationSummaryList = ApplicationSummary[];
export const ApplicationSummaryList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsOutput {
  Applications?: ApplicationSummary[];
  NextToken?: string;
}
export const ListApplicationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Applications: S.optional(ApplicationSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsOutput",
}) as any as S.Schema<ListApplicationsOutput>;
export interface ListComponentsInput {
  ApplicationId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListComponentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-components" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentsInput",
}) as any as S.Schema<ListComponentsInput>;
export interface ComponentSummary {
  ApplicationId?: string;
  ComponentId?: string;
  ComponentType?: ComponentType;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const ComponentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ComponentId: S.optional(S.String),
    ComponentType: S.optional(ComponentType),
    Tags: S.optional(TagMap),
    Arn: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type ComponentSummaryList = ComponentSummary[];
export const ComponentSummaryList = /*@__PURE__*/ S.Array(ComponentSummary);
export interface ListComponentsOutput {
  Components?: ComponentSummary[];
  NextToken?: string;
}
export const ListComponentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Components: S.optional(ComponentSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsOutput",
}) as any as S.Schema<ListComponentsOutput>;
export interface ListConfigurationCheckDefinitionsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationCheckDefinitionsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/list-configuration-check-definitions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConfigurationCheckDefinitionsInput",
}) as any as S.Schema<ListConfigurationCheckDefinitionsInput>;
export type ApplicationTypeList = ApplicationType[];
export const ApplicationTypeList = /*@__PURE__*/ S.Array(ApplicationType);
export interface ConfigurationCheckDefinition {
  Id?: ConfigurationCheckType;
  Name?: string;
  Description?: string;
  ApplicableApplicationTypes?: ApplicationType[];
}
export const ConfigurationCheckDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(ConfigurationCheckType),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ApplicableApplicationTypes: S.optional(ApplicationTypeList),
  }),
).annotate({
  identifier: "ConfigurationCheckDefinition",
}) as any as S.Schema<ConfigurationCheckDefinition>;
export type ConfigurationCheckDefinitionList = ConfigurationCheckDefinition[];
export const ConfigurationCheckDefinitionList = /*@__PURE__*/ S.Array(
  ConfigurationCheckDefinition,
);
export interface ListConfigurationCheckDefinitionsOutput {
  ConfigurationChecks?: ConfigurationCheckDefinition[];
  NextToken?: string;
}
export const ListConfigurationCheckDefinitionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationChecks: S.optional(ConfigurationCheckDefinitionList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListConfigurationCheckDefinitionsOutput",
}) as any as S.Schema<ListConfigurationCheckDefinitionsOutput>;
export type ConfigurationCheckOperationListingMode =
  | "ALL_OPERATIONS"
  | "LATEST_PER_CHECK"
  | (string & {});
export const ConfigurationCheckOperationListingMode = S.String;

export interface ListConfigurationCheckOperationsInput {
  ApplicationId: string;
  ListMode?: ConfigurationCheckOperationListingMode;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListConfigurationCheckOperationsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String,
      ListMode: S.optional(ConfigurationCheckOperationListingMode),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Filters: S.optional(FilterList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/list-configuration-check-operations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConfigurationCheckOperationsInput",
}) as any as S.Schema<ListConfigurationCheckOperationsInput>;
export type ConfigurationCheckOperationList = ConfigurationCheckOperation[];
export const ConfigurationCheckOperationList = /*@__PURE__*/ S.Array(
  ConfigurationCheckOperation,
);
export interface ListConfigurationCheckOperationsOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[];
  NextToken?: string;
}
export const ListConfigurationCheckOperationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationCheckOperations: S.optional(ConfigurationCheckOperationList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListConfigurationCheckOperationsOutput",
}) as any as S.Schema<ListConfigurationCheckOperationsOutput>;
export interface ListDatabasesInput {
  ApplicationId?: string;
  ComponentId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatabasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ComponentId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-databases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatabasesInput",
}) as any as S.Schema<ListDatabasesInput>;
export interface DatabaseSummary {
  ApplicationId?: string;
  ComponentId?: string;
  DatabaseId?: string;
  DatabaseType?: DatabaseType;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DatabaseSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ComponentId: S.optional(S.String),
    DatabaseId: S.optional(S.String),
    DatabaseType: S.optional(DatabaseType),
    Arn: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DatabaseSummary",
}) as any as S.Schema<DatabaseSummary>;
export type DatabaseSummaryList = DatabaseSummary[];
export const DatabaseSummaryList = /*@__PURE__*/ S.Array(DatabaseSummary);
export interface ListDatabasesOutput {
  Databases?: DatabaseSummary[];
  NextToken?: string;
}
export const ListDatabasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Databases: S.optional(DatabaseSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatabasesOutput",
}) as any as S.Schema<ListDatabasesOutput>;
export interface ListOperationEventsInput {
  OperationId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListOperationEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-operation-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOperationEventsInput",
}) as any as S.Schema<ListOperationEventsInput>;
export type OperationEventResourceType = string;
export interface Resource {
  ResourceArn?: string;
  ResourceType?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type OperationEventStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const OperationEventStatus = S.String;

export interface OperationEvent {
  Description?: string;
  Resource?: Resource;
  Status?: OperationEventStatus;
  StatusMessage?: string;
  Timestamp?: Date;
}
export const OperationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Resource: S.optional(Resource),
    Status: S.optional(OperationEventStatus),
    StatusMessage: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "OperationEvent" }) as any as S.Schema<OperationEvent>;
export type OperationEventList = OperationEvent[];
export const OperationEventList = /*@__PURE__*/ S.Array(OperationEvent);
export interface ListOperationEventsOutput {
  OperationEvents?: OperationEvent[];
  NextToken?: string;
}
export const ListOperationEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationEvents: S.optional(OperationEventList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOperationEventsOutput",
}) as any as S.Schema<ListOperationEventsOutput>;
export interface ListOperationsInput {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOperationsInput",
}) as any as S.Schema<ListOperationsInput>;
export type OperationList = Operation[];
export const OperationList = /*@__PURE__*/ S.Array(Operation);
export interface ListOperationsOutput {
  Operations?: Operation[];
  NextToken?: string;
}
export const ListOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operations: S.optional(OperationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOperationsOutput",
}) as any as S.Schema<ListOperationsOutput>;
export interface ListSubCheckResultsInput {
  OperationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSubCheckResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-sub-check-results" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubCheckResultsInput",
}) as any as S.Schema<ListSubCheckResultsInput>;
export type SubCheckResultId = string;
export type SubCheckReferencesList = string[];
export const SubCheckReferencesList = /*@__PURE__*/ S.Array(S.String);
export interface SubCheckResult {
  Id?: string;
  Name?: string;
  Description?: string;
  References?: string[];
}
export const SubCheckResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    References: S.optional(SubCheckReferencesList),
  }),
).annotate({ identifier: "SubCheckResult" }) as any as S.Schema<SubCheckResult>;
export type SubCheckResultList = SubCheckResult[];
export const SubCheckResultList = /*@__PURE__*/ S.Array(SubCheckResult);
export interface ListSubCheckResultsOutput {
  SubCheckResults?: SubCheckResult[];
  NextToken?: string;
}
export const ListSubCheckResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubCheckResults: S.optional(SubCheckResultList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubCheckResultsOutput",
}) as any as S.Schema<ListSubCheckResultsOutput>;
export interface ListSubCheckRuleResultsInput {
  SubCheckResultId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSubCheckRuleResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubCheckResultId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-sub-check-rule-results" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubCheckRuleResultsInput",
}) as any as S.Schema<ListSubCheckRuleResultsInput>;
export type RuleResultId = string;
export type RuleResultStatus =
  | "PASSED"
  | "FAILED"
  | "WARNING"
  | "INFO"
  | "UNKNOWN"
  | (string & {});
export const RuleResultStatus = S.String;

export type RuleResultMetadataKey = string;
export type RuleResultMetadataValue = string;
export type RuleResultMetadata = { [key: string]: string | undefined };
export const RuleResultMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RuleResult {
  Id?: string;
  Description?: string;
  Status?: RuleResultStatus;
  Message?: string;
  Metadata?: { [key: string]: string | undefined };
}
export const RuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(RuleResultStatus),
    Message: S.optional(S.String),
    Metadata: S.optional(RuleResultMetadata),
  }),
).annotate({ identifier: "RuleResult" }) as any as S.Schema<RuleResult>;
export type RuleResultList = RuleResult[];
export const RuleResultList = /*@__PURE__*/ S.Array(RuleResult);
export interface ListSubCheckRuleResultsOutput {
  RuleResults?: RuleResult[];
  NextToken?: string;
}
export const ListSubCheckRuleResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleResults: S.optional(RuleResultList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubCheckRuleResultsOutput",
}) as any as S.Schema<ListSubCheckRuleResultsOutput>;
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
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutResourcePermissionInput {
  ActionType: PermissionActionType;
  SourceResourceArn: string;
  ResourceArn: string;
}
export const PutResourcePermissionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: PermissionActionType,
    SourceResourceArn: S.String,
    ResourceArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/put-resource-permission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePermissionInput",
}) as any as S.Schema<PutResourcePermissionInput>;
export interface PutResourcePermissionOutput {
  Policy?: string;
}
export const PutResourcePermissionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePermissionOutput",
}) as any as S.Schema<PutResourcePermissionOutput>;
export type InstanceId = string;
export type InstanceList = string[];
export const InstanceList = /*@__PURE__*/ S.Array(S.String);
export interface ComponentInfo {
  ComponentType: ComponentType;
  Sid: string;
  Ec2InstanceId: string;
}
export const ComponentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentType: ComponentType,
    Sid: S.String,
    Ec2InstanceId: S.String,
  }),
).annotate({ identifier: "ComponentInfo" }) as any as S.Schema<ComponentInfo>;
export type ComponentInfoList = ComponentInfo[];
export const ComponentInfoList = /*@__PURE__*/ S.Array(ComponentInfo);
export interface RegisterApplicationInput {
  ApplicationId: string;
  ApplicationType: ApplicationType;
  Instances: string[];
  SapInstanceNumber?: string;
  Sid?: string;
  Tags?: { [key: string]: string | undefined };
  Credentials?: ApplicationCredential[];
  DatabaseArn?: string;
  ComponentsInfo?: ComponentInfo[];
}
export const RegisterApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    ApplicationType: ApplicationType,
    Instances: InstanceList,
    SapInstanceNumber: S.optional(S.String),
    Sid: S.optional(S.String),
    Tags: S.optional(TagMap),
    Credentials: S.optional(ApplicationCredentialList),
    DatabaseArn: S.optional(S.String),
    ComponentsInfo: S.optional(ComponentInfoList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/register-application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterApplicationInput",
}) as any as S.Schema<RegisterApplicationInput>;
export interface RegisterApplicationOutput {
  Application?: Application;
  OperationId?: string;
}
export const RegisterApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Application: S.optional(Application),
    OperationId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterApplicationOutput",
}) as any as S.Schema<RegisterApplicationOutput>;
export interface StartApplicationInput {
  ApplicationId: string;
}
export const StartApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApplicationInput",
}) as any as S.Schema<StartApplicationInput>;
export interface StartApplicationOutput {
  OperationId?: string;
}
export const StartApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "StartApplicationOutput",
}) as any as S.Schema<StartApplicationOutput>;
export interface StartApplicationRefreshInput {
  ApplicationId: string;
}
export const StartApplicationRefreshInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-application-refresh" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApplicationRefreshInput",
}) as any as S.Schema<StartApplicationRefreshInput>;
export interface StartApplicationRefreshOutput {
  OperationId?: string;
}
export const StartApplicationRefreshOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "StartApplicationRefreshOutput",
}) as any as S.Schema<StartApplicationRefreshOutput>;
export type ConfigurationCheckTypeList = ConfigurationCheckType[];
export const ConfigurationCheckTypeList = /*@__PURE__*/ S.Array(
  ConfigurationCheckType,
);
export interface StartConfigurationChecksInput {
  ApplicationId: string;
  ConfigurationCheckIds?: ConfigurationCheckType[];
}
export const StartConfigurationChecksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    ConfigurationCheckIds: S.optional(ConfigurationCheckTypeList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-configuration-checks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartConfigurationChecksInput",
}) as any as S.Schema<StartConfigurationChecksInput>;
export interface StartConfigurationChecksOutput {
  ConfigurationCheckOperations?: ConfigurationCheckOperation[];
}
export const StartConfigurationChecksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationCheckOperations: S.optional(ConfigurationCheckOperationList),
  }),
).annotate({
  identifier: "StartConfigurationChecksOutput",
}) as any as S.Schema<StartConfigurationChecksOutput>;
export type ConnectedEntityType = "DBMS" | (string & {});
export const ConnectedEntityType = S.String;

export interface StopApplicationInput {
  ApplicationId: string;
  StopConnectedEntity?: ConnectedEntityType;
  IncludeEc2InstanceShutdown?: boolean;
}
export const StopApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    StopConnectedEntity: S.optional(ConnectedEntityType),
    IncludeEc2InstanceShutdown: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stop-application" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopApplicationInput",
}) as any as S.Schema<StopApplicationInput>;
export interface StopApplicationOutput {
  OperationId?: string;
}
export const StopApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }),
).annotate({
  identifier: "StopApplicationOutput",
}) as any as S.Schema<StopApplicationOutput>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export type BackintMode = "AWSBackup" | (string & {});
export const BackintMode = S.String;

export interface BackintConfig {
  BackintMode: BackintMode;
  EnsureNoBackupInProcess: boolean;
}
export const BackintConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackintMode: BackintMode, EnsureNoBackupInProcess: S.Boolean }),
).annotate({ identifier: "BackintConfig" }) as any as S.Schema<BackintConfig>;
export interface UpdateApplicationSettingsInput {
  ApplicationId: string;
  CredentialsToAddOrUpdate?: ApplicationCredential[];
  CredentialsToRemove?: ApplicationCredential[];
  Backint?: BackintConfig;
  DatabaseArn?: string;
}
export const UpdateApplicationSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String,
    CredentialsToAddOrUpdate: S.optional(ApplicationCredentialList),
    CredentialsToRemove: S.optional(ApplicationCredentialList),
    Backint: S.optional(BackintConfig),
    DatabaseArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-application-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationSettingsInput",
}) as any as S.Schema<UpdateApplicationSettingsInput>;
export type OperationIdList = string[];
export const OperationIdList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateApplicationSettingsOutput {
  Message?: string;
  OperationIds?: string[];
}
export const UpdateApplicationSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    OperationIds: S.optional(OperationIdList),
  }),
).annotate({
  identifier: "UpdateApplicationSettingsOutput",
}) as any as S.Schema<UpdateApplicationSettingsOutput>;
export type DeleteResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes permissions associated with the target database.
 */
export const deleteResourcePermission: API.OperationMethod<
  DeleteResourcePermissionInput,
  DeleteResourcePermissionOutput,
  DeleteResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePermissionInput,
  output: DeleteResourcePermissionOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePermission",
}));

export type DeregisterApplicationError =
  | InternalServerException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deregister an SAP application with AWS Systems Manager for SAP. This action does not aﬀect the existing setup of your SAP workloads on Amazon EC2.
 */
export const deregisterApplication: API.OperationMethod<
  DeregisterApplicationInput,
  DeregisterApplicationOutput,
  DeregisterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterApplicationInput,
  output: DeregisterApplicationOutput,
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterApplication",
}));

export type GetApplicationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets an application registered with AWS Systems Manager for SAP. It also returns the components of the application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationInput,
  output: GetApplicationOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetComponentError =
  | InternalServerException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Gets the component of an application registered with AWS Systems Manager for SAP.
 */
export const getComponent: API.OperationMethod<
  GetComponentInput,
  GetComponentOutput,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentInput,
  output: GetComponentOutput,
  errors: [InternalServerException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
}));

export type GetConfigurationCheckOperationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a configuration check operation by specifying the operation ID.
 */
export const getConfigurationCheckOperation: API.OperationMethod<
  GetConfigurationCheckOperationInput,
  GetConfigurationCheckOperationOutput,
  GetConfigurationCheckOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationCheckOperationInput,
  output: GetConfigurationCheckOperationOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationCheckOperation",
}));

export type GetDatabaseError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the SAP HANA database of an application registered with AWS Systems Manager for SAP.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput,
  GetDatabaseOutput,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatabaseInput,
  output: GetDatabaseOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
}));

export type GetOperationError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of an operation by specifying the operation ID.
 */
export const getOperation: API.OperationMethod<
  GetOperationInput,
  GetOperationOutput,
  GetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOperationInput,
  output: GetOperationOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperation",
}));

export type GetResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets permissions associated with the target database.
 */
export const getResourcePermission: API.OperationMethod<
  GetResourcePermissionInput,
  GetResourcePermissionOutput,
  GetResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePermissionInput,
  output: GetResourcePermissionOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePermission",
}));

export type ListApplicationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the applications registered with AWS Systems Manager for SAP.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsInput,
  ListApplicationsOutput,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsInput,
  output: ListApplicationsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the components registered with AWS Systems Manager for SAP.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsInput,
  ListComponentsOutput,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsInput,
  output: ListComponentsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Components",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationCheckDefinitionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all configuration check types supported by AWS Systems Manager for SAP.
 */
export const listConfigurationCheckDefinitions: API.PaginatedOperationMethod<
  ListConfigurationCheckDefinitionsInput,
  ListConfigurationCheckDefinitionsOutput,
  ListConfigurationCheckDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationCheckDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationCheckDefinitionsInput,
  output: ListConfigurationCheckDefinitionsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationCheckDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationCheckOperationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the configuration check operations performed by AWS Systems Manager for SAP.
 */
export const listConfigurationCheckOperations: API.PaginatedOperationMethod<
  ListConfigurationCheckOperationsInput,
  ListConfigurationCheckOperationsOutput,
  ListConfigurationCheckOperationsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationCheckOperation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationCheckOperationsInput,
  output: ListConfigurationCheckOperationsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationCheckOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationCheckOperations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatabasesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the SAP HANA databases of an application registered with AWS Systems Manager for SAP.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesInput,
  ListDatabasesOutput,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  DatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatabasesInput,
  output: ListDatabasesOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Databases",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationEventsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of operations events.
 *
 * Available parameters include `OperationID`, as well as optional parameters `MaxResults`, `NextToken`, and `Filters`.
 */
export const listOperationEvents: API.PaginatedOperationMethod<
  ListOperationEventsInput,
  ListOperationEventsOutput,
  ListOperationEventsError,
  Credentials | HttpClient.HttpClient,
  OperationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOperationEventsInput,
  output: ListOperationEventsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperationEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OperationEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the operations performed by AWS Systems Manager for SAP.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsInput,
  ListOperationsOutput,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  Operation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsInput,
  output: ListOperationsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Operations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSubCheckResultsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the sub-check results of a specified configuration check operation.
 */
export const listSubCheckResults: API.PaginatedOperationMethod<
  ListSubCheckResultsInput,
  ListSubCheckResultsOutput,
  ListSubCheckResultsError,
  Credentials | HttpClient.HttpClient,
  SubCheckResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubCheckResultsInput,
  output: ListSubCheckResultsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubCheckResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubCheckResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSubCheckRuleResultsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules of a specified sub-check belonging to a configuration check operation.
 */
export const listSubCheckRuleResults: API.PaginatedOperationMethod<
  ListSubCheckRuleResultsInput,
  ListSubCheckRuleResultsOutput,
  ListSubCheckRuleResultsError,
  Credentials | HttpClient.HttpClient,
  RuleResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubCheckRuleResultsInput,
  output: ListSubCheckRuleResultsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubCheckRuleResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on an SAP HANA application and/or database registered with AWS Systems Manager for SAP.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutResourcePermissionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds permissions to the target database.
 */
export const putResourcePermission: API.OperationMethod<
  PutResourcePermissionInput,
  PutResourcePermissionOutput,
  PutResourcePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePermissionInput,
  output: PutResourcePermissionOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePermission",
}));

export type RegisterApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Register an SAP application with AWS Systems Manager for SAP. You must meet the following requirements before registering.
 *
 * The SAP application you want to register with AWS Systems Manager for SAP is running on Amazon EC2.
 *
 * AWS Systems Manager Agent must be setup on an Amazon EC2 instance along with the required IAM permissions.
 *
 * Amazon EC2 instance(s) must have access to the secrets created in AWS Secrets Manager to manage SAP applications and components.
 */
export const registerApplication: API.OperationMethod<
  RegisterApplicationInput,
  RegisterApplicationOutput,
  RegisterApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterApplicationInput,
  output: RegisterApplicationOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterApplication",
}));

export type StartApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Request is an operation which starts an application.
 *
 * Parameter `ApplicationId` is required.
 */
export const startApplication: API.OperationMethod<
  StartApplicationInput,
  StartApplicationOutput,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApplicationInput,
  output: StartApplicationOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
}));

export type StartApplicationRefreshError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Refreshes a registered application.
 */
export const startApplicationRefresh: API.OperationMethod<
  StartApplicationRefreshInput,
  StartApplicationRefreshOutput,
  StartApplicationRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApplicationRefreshInput,
  output: StartApplicationRefreshOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplicationRefresh",
}));

export type StartConfigurationChecksError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Initiates configuration check operations against a specified application.
 */
export const startConfigurationChecks: API.OperationMethod<
  StartConfigurationChecksInput,
  StartConfigurationChecksOutput,
  StartConfigurationChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartConfigurationChecksInput,
  output: StartConfigurationChecksOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationChecks",
}));

export type StopApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Request is an operation to stop an application.
 *
 * Parameter `ApplicationId` is required. Parameters `StopConnectedEntity` and `IncludeEc2InstanceShutdown` are optional.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationInput,
  StopApplicationOutput,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopApplicationInput,
  output: StopApplicationOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
}));

export type TagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates tag for a resource by specifying the ARN.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the tags for a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationSettingsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings of an application registered with AWS Systems Manager for SAP.
 */
export const updateApplicationSettings: API.OperationMethod<
  UpdateApplicationSettingsInput,
  UpdateApplicationSettingsOutput,
  UpdateApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationSettingsInput,
  output: UpdateApplicationSettingsOutput,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationSettings",
}));
