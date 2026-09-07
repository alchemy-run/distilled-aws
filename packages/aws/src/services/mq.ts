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
const svc = T.AwsApiService({ sdkId: "mq", serviceShapeName: "mq" });
const auth = T.AwsAuthSigv4({ name: "mq" });
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
              `https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mq.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mq.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    {
      ErrorAttribute: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceShareErrors: S.optional(
        S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type AuthenticationStrategy =
  | "SIMPLE"
  | "LDAP"
  | "CONFIG_MANAGED"
  | (string & {});
export const AuthenticationStrategy = S.String;

export interface ConfigurationId {
  Id?: string;
  Revision?: number;
}
export const ConfigurationId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Revision: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Id: "id", Revision: "revision" }),
  ),
).annotate({
  identifier: "ConfigurationId",
}) as any as S.Schema<ConfigurationId>;
export type DeploymentMode =
  | "SINGLE_INSTANCE"
  | "ACTIVE_STANDBY_MULTI_AZ"
  | "CLUSTER_MULTI_AZ"
  | (string & {});
export const DeploymentMode = S.String;

export interface EncryptionOptions {
  KmsKeyId?: string;
  UseAwsOwnedKey?: boolean;
}
export const EncryptionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsKeyId: S.optional(S.String),
    UseAwsOwnedKey: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({ KmsKeyId: "kmsKeyId", UseAwsOwnedKey: "useAwsOwnedKey" }),
  ),
).annotate({
  identifier: "EncryptionOptions",
}) as any as S.Schema<EncryptionOptions>;
export type EngineType = "ACTIVEMQ" | "RABBITMQ" | (string & {});
export const EngineType = S.String;

export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface LdapServerMetadataInput {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountPassword?: string | redacted.Redacted<string>;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export const LdapServerMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Hosts: S.optional(__listOf__string),
    RoleBase: S.optional(S.String),
    RoleName: S.optional(S.String),
    RoleSearchMatching: S.optional(S.String),
    RoleSearchSubtree: S.optional(S.Boolean),
    ServiceAccountPassword: S.optional(SensitiveString),
    ServiceAccountUsername: S.optional(S.String),
    UserBase: S.optional(S.String),
    UserRoleName: S.optional(S.String),
    UserSearchMatching: S.optional(S.String),
    UserSearchSubtree: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Hosts: "hosts",
      RoleBase: "roleBase",
      RoleName: "roleName",
      RoleSearchMatching: "roleSearchMatching",
      RoleSearchSubtree: "roleSearchSubtree",
      ServiceAccountPassword: "serviceAccountPassword",
      ServiceAccountUsername: "serviceAccountUsername",
      UserBase: "userBase",
      UserRoleName: "userRoleName",
      UserSearchMatching: "userSearchMatching",
      UserSearchSubtree: "userSearchSubtree",
    }),
  ),
).annotate({
  identifier: "LdapServerMetadataInput",
}) as any as S.Schema<LdapServerMetadataInput>;
export interface Logs {
  Audit?: boolean;
  General?: boolean;
}
export const Logs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audit: S.optional(S.Boolean),
    General: S.optional(S.Boolean),
  }).pipe(S.encodeKeys({ Audit: "audit", General: "general" })),
).annotate({ identifier: "Logs" }) as any as S.Schema<Logs>;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const DayOfWeek = S.String;

export interface WeeklyStartTime {
  DayOfWeek?: DayOfWeek;
  TimeOfDay?: string;
  TimeZone?: string;
}
export const WeeklyStartTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DayOfWeek: S.optional(DayOfWeek),
    TimeOfDay: S.optional(S.String),
    TimeZone: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DayOfWeek: "dayOfWeek",
      TimeOfDay: "timeOfDay",
      TimeZone: "timeZone",
    }),
  ),
).annotate({
  identifier: "WeeklyStartTime",
}) as any as S.Schema<WeeklyStartTime>;
export type BrokerStorageType = "EBS" | "EFS" | (string & {});
export const BrokerStorageType = S.String;

export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface User {
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username?: string;
  ReplicationUser?: boolean;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsoleAccess: S.optional(S.Boolean),
    Groups: S.optional(__listOf__string),
    Password: S.optional(SensitiveString),
    Username: S.optional(S.String),
    ReplicationUser: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      ConsoleAccess: "consoleAccess",
      Groups: "groups",
      Password: "password",
      Username: "username",
      ReplicationUser: "replicationUser",
    }),
  ),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type __listOfUser = User[];
export const __listOfUser = /*@__PURE__*/ S.Array(User);
export type DataReplicationMode = "NONE" | "CRDR" | (string & {});
export const DataReplicationMode = S.String;

export interface CreateBrokerRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerName?: string;
  Configuration?: ConfigurationId;
  CreatorRequestId?: string;
  DeploymentMode?: DeploymentMode;
  EncryptionOptions?: EncryptionOptions;
  EngineType?: EngineType;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataInput;
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageSize?: number;
  StorageType?: BrokerStorageType;
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  Users?: User[];
  DataReplicationMode?: DataReplicationMode;
  DataReplicationPrimaryBrokerArn?: string;
}
export const CreateBrokerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    BrokerName: S.optional(S.String),
    Configuration: S.optional(ConfigurationId),
    CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    DeploymentMode: S.optional(DeploymentMode),
    EncryptionOptions: S.optional(EncryptionOptions),
    EngineType: S.optional(EngineType),
    EngineVersion: S.optional(S.String),
    HostInstanceType: S.optional(S.String),
    LdapServerMetadata: S.optional(LdapServerMetadataInput),
    Logs: S.optional(Logs),
    MaintenanceWindowStartTime: S.optional(WeeklyStartTime),
    PubliclyAccessible: S.optional(S.Boolean),
    SecurityGroups: S.optional(__listOf__string),
    StorageSize: S.optional(S.Number),
    StorageType: S.optional(BrokerStorageType),
    SubnetIds: S.optional(__listOf__string),
    Tags: S.optional(__mapOf__string),
    Users: S.optional(__listOfUser),
    DataReplicationMode: S.optional(DataReplicationMode),
    DataReplicationPrimaryBrokerArn: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        AuthenticationStrategy: "authenticationStrategy",
        AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
        BrokerName: "brokerName",
        Configuration: "configuration",
        CreatorRequestId: "creatorRequestId",
        DeploymentMode: "deploymentMode",
        EncryptionOptions: "encryptionOptions",
        EngineType: "engineType",
        EngineVersion: "engineVersion",
        HostInstanceType: "hostInstanceType",
        LdapServerMetadata: "ldapServerMetadata",
        Logs: "logs",
        MaintenanceWindowStartTime: "maintenanceWindowStartTime",
        PubliclyAccessible: "publiclyAccessible",
        SecurityGroups: "securityGroups",
        StorageSize: "storageSize",
        StorageType: "storageType",
        SubnetIds: "subnetIds",
        Tags: "tags",
        Users: "users",
        DataReplicationMode: "dataReplicationMode",
        DataReplicationPrimaryBrokerArn: "dataReplicationPrimaryBrokerArn",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/brokers" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateBrokerRequest",
}) as any as S.Schema<CreateBrokerRequest>;
export interface CreateBrokerResponse {
  BrokerArn?: string;
  BrokerId?: string;
}
export const CreateBrokerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerArn: S.optional(S.String),
    BrokerId: S.optional(S.String),
  }).pipe(S.encodeKeys({ BrokerArn: "brokerArn", BrokerId: "brokerId" })),
).annotate({
  identifier: "CreateBrokerResponse",
}) as any as S.Schema<CreateBrokerResponse>;
export interface CreateConfigurationRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  EngineType?: EngineType;
  EngineVersion?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    EngineType: S.optional(EngineType),
    EngineVersion: S.optional(S.String),
    Name: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        AuthenticationStrategy: "authenticationStrategy",
        EngineType: "engineType",
        EngineVersion: "engineVersion",
        Name: "name",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConfigurationRequest",
}) as any as S.Schema<CreateConfigurationRequest>;
export type __timestampIso8601 = Date;
export interface ConfigurationRevision {
  Created?: Date;
  Description?: string;
  Revision?: number;
}
export const ConfigurationRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Description: S.optional(S.String),
    Revision: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Created: "created",
      Description: "description",
      Revision: "revision",
    }),
  ),
).annotate({
  identifier: "ConfigurationRevision",
}) as any as S.Schema<ConfigurationRevision>;
export interface CreateConfigurationResponse {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Id?: string;
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
  Name?: string;
}
export const CreateConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Id: S.optional(S.String),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AuthenticationStrategy: "authenticationStrategy",
      Created: "created",
      Id: "id",
      LatestRevision: "latestRevision",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "CreateConfigurationResponse",
}) as any as S.Schema<CreateConfigurationResponse>;
export interface CreateTagsRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/tags/{ResourceArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResponse {}
export const CreateTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTagsResponse",
}) as any as S.Schema<CreateTagsResponse>;
export interface CreateUserRequest {
  BrokerId: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username: string;
  ReplicationUser?: boolean;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    ConsoleAccess: S.optional(S.Boolean),
    Groups: S.optional(__listOf__string),
    Password: S.optional(SensitiveString),
    Username: S.String.pipe(T.HttpLabel("Username")),
    ReplicationUser: S.optional(S.Boolean),
  })
    .pipe(
      S.encodeKeys({
        ConsoleAccess: "consoleAccess",
        Groups: "groups",
        Password: "password",
        ReplicationUser: "replicationUser",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/brokers/{BrokerId}/users/{Username}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResponse {}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteBrokerRequest {
  BrokerId: string;
}
export const DeleteBrokerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/brokers/{BrokerId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBrokerRequest",
}) as any as S.Schema<DeleteBrokerRequest>;
export interface DeleteBrokerResponse {
  BrokerId?: string;
}
export const DeleteBrokerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrokerId: S.optional(S.String) }).pipe(
    S.encodeKeys({ BrokerId: "brokerId" }),
  ),
).annotate({
  identifier: "DeleteBrokerResponse",
}) as any as S.Schema<DeleteBrokerResponse>;
export interface DeleteConfigurationRequest {
  ConfigurationId: string;
}
export const DeleteConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/configurations/{ConfigurationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationRequest",
}) as any as S.Schema<DeleteConfigurationRequest>;
export interface DeleteConfigurationResponse {
  ConfigurationId?: string;
}
export const DeleteConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationId: S.optional(S.String) }).pipe(
    S.encodeKeys({ ConfigurationId: "configurationId" }),
  ),
).annotate({
  identifier: "DeleteConfigurationResponse",
}) as any as S.Schema<DeleteConfigurationResponse>;
export interface DeleteTagsRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const DeleteTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResponse {}
export const DeleteTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTagsResponse",
}) as any as S.Schema<DeleteTagsResponse>;
export interface DeleteUserRequest {
  BrokerId: string;
  Username: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    Username: S.String.pipe(T.HttpLabel("Username")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/brokers/{BrokerId}/users/{Username}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DescribeBrokerRequest {
  BrokerId: string;
}
export const DescribeBrokerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBrokerRequest",
}) as any as S.Schema<DescribeBrokerRequest>;
export interface ActionRequired {
  ActionRequiredCode?: string;
  ActionRequiredInfo?: string;
}
export const ActionRequired = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionRequiredCode: S.optional(S.String),
    ActionRequiredInfo: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ActionRequiredCode: "actionRequiredCode",
      ActionRequiredInfo: "actionRequiredInfo",
    }),
  ),
).annotate({ identifier: "ActionRequired" }) as any as S.Schema<ActionRequired>;
export type __listOfActionRequired = ActionRequired[];
export const __listOfActionRequired = /*@__PURE__*/ S.Array(ActionRequired);
export interface BrokerInstance {
  ConsoleURL?: string;
  Endpoints?: string[];
  IpAddress?: string;
}
export const BrokerInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsoleURL: S.optional(S.String),
    Endpoints: S.optional(__listOf__string),
    IpAddress: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ConsoleURL: "consoleURL",
      Endpoints: "endpoints",
      IpAddress: "ipAddress",
    }),
  ),
).annotate({ identifier: "BrokerInstance" }) as any as S.Schema<BrokerInstance>;
export type __listOfBrokerInstance = BrokerInstance[];
export const __listOfBrokerInstance = /*@__PURE__*/ S.Array(BrokerInstance);
export type BrokerState =
  | "CREATION_IN_PROGRESS"
  | "CREATION_FAILED"
  | "DELETION_IN_PROGRESS"
  | "RUNNING"
  | "REBOOT_IN_PROGRESS"
  | "CRITICAL_ACTION_REQUIRED"
  | "REPLICA"
  | (string & {});
export const BrokerState = S.String;

export type __listOfConfigurationId = ConfigurationId[];
export const __listOfConfigurationId = /*@__PURE__*/ S.Array(ConfigurationId);
export interface Configurations {
  Current?: ConfigurationId;
  History?: ConfigurationId[];
  Pending?: ConfigurationId;
}
export const Configurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Current: S.optional(ConfigurationId),
    History: S.optional(__listOfConfigurationId),
    Pending: S.optional(ConfigurationId),
  }).pipe(
    S.encodeKeys({
      Current: "current",
      History: "history",
      Pending: "pending",
    }),
  ),
).annotate({ identifier: "Configurations" }) as any as S.Schema<Configurations>;
export interface LdapServerMetadataOutput {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export const LdapServerMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Hosts: S.optional(__listOf__string),
    RoleBase: S.optional(S.String),
    RoleName: S.optional(S.String),
    RoleSearchMatching: S.optional(S.String),
    RoleSearchSubtree: S.optional(S.Boolean),
    ServiceAccountUsername: S.optional(S.String),
    UserBase: S.optional(S.String),
    UserRoleName: S.optional(S.String),
    UserSearchMatching: S.optional(S.String),
    UserSearchSubtree: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Hosts: "hosts",
      RoleBase: "roleBase",
      RoleName: "roleName",
      RoleSearchMatching: "roleSearchMatching",
      RoleSearchSubtree: "roleSearchSubtree",
      ServiceAccountUsername: "serviceAccountUsername",
      UserBase: "userBase",
      UserRoleName: "userRoleName",
      UserSearchMatching: "userSearchMatching",
      UserSearchSubtree: "userSearchSubtree",
    }),
  ),
).annotate({
  identifier: "LdapServerMetadataOutput",
}) as any as S.Schema<LdapServerMetadataOutput>;
export interface PendingLogs {
  Audit?: boolean;
  General?: boolean;
}
export const PendingLogs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audit: S.optional(S.Boolean),
    General: S.optional(S.Boolean),
  }).pipe(S.encodeKeys({ Audit: "audit", General: "general" })),
).annotate({ identifier: "PendingLogs" }) as any as S.Schema<PendingLogs>;
export interface LogsSummary {
  Audit?: boolean;
  AuditLogGroup?: string;
  General?: boolean;
  GeneralLogGroup?: string;
  Pending?: PendingLogs;
}
export const LogsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audit: S.optional(S.Boolean),
    AuditLogGroup: S.optional(S.String),
    General: S.optional(S.Boolean),
    GeneralLogGroup: S.optional(S.String),
    Pending: S.optional(PendingLogs),
  }).pipe(
    S.encodeKeys({
      Audit: "audit",
      AuditLogGroup: "auditLogGroup",
      General: "general",
      GeneralLogGroup: "generalLogGroup",
      Pending: "pending",
    }),
  ),
).annotate({ identifier: "LogsSummary" }) as any as S.Schema<LogsSummary>;
export type ChangeType = "CREATE" | "UPDATE" | "DELETE" | (string & {});
export const ChangeType = S.String;

export interface UserSummary {
  PendingChange?: ChangeType;
  Username?: string;
}
export const UserSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PendingChange: S.optional(ChangeType),
    Username: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ PendingChange: "pendingChange", Username: "username" }),
  ),
).annotate({ identifier: "UserSummary" }) as any as S.Schema<UserSummary>;
export type __listOfUserSummary = UserSummary[];
export const __listOfUserSummary = /*@__PURE__*/ S.Array(UserSummary);
export interface DataReplicationCounterpart {
  BrokerId?: string;
  Region?: string;
}
export const DataReplicationCounterpart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.optional(S.String),
    Region: S.optional(S.String),
  }).pipe(S.encodeKeys({ BrokerId: "brokerId", Region: "region" })),
).annotate({
  identifier: "DataReplicationCounterpart",
}) as any as S.Schema<DataReplicationCounterpart>;
export interface DataReplicationMetadataOutput {
  DataReplicationCounterpart?: DataReplicationCounterpart;
  DataReplicationRole?: string;
}
export const DataReplicationMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataReplicationCounterpart: S.optional(DataReplicationCounterpart),
    DataReplicationRole: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DataReplicationCounterpart: "dataReplicationCounterpart",
      DataReplicationRole: "dataReplicationRole",
    }),
  ),
).annotate({
  identifier: "DataReplicationMetadataOutput",
}) as any as S.Schema<DataReplicationMetadataOutput>;
export interface DescribeBrokerResponse {
  ActionsRequired?: ActionRequired[];
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerArn?: string;
  BrokerId?: string;
  BrokerInstances?: BrokerInstance[];
  BrokerName?: string;
  BrokerState?: BrokerState;
  Configurations?: Configurations & {
    Current: ConfigurationId & { Id: string };
    History: (ConfigurationId & { Id: string })[];
    Pending: ConfigurationId & { Id: string };
  };
  Created?: Date;
  DeploymentMode?: DeploymentMode;
  EncryptionOptions?: EncryptionOptions & { UseAwsOwnedKey: boolean };
  EngineType?: EngineType;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  Logs?: LogsSummary & { General: boolean; GeneralLogGroup: string };
  MaintenanceWindowStartTime?: WeeklyStartTime & {
    DayOfWeek: DayOfWeek;
    TimeOfDay: string;
  };
  PendingAuthenticationStrategy?: AuthenticationStrategy;
  PendingEngineVersion?: string;
  PendingHostInstanceType?: string;
  PendingLdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  PendingSecurityGroups?: string[];
  PendingStorageSize?: number;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageSize?: number;
  StorageType?: BrokerStorageType;
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  Users?: (UserSummary & { Username: string })[];
  DataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  PendingDataReplicationMode?: DataReplicationMode;
}
export const DescribeBrokerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionsRequired: S.optional(__listOfActionRequired),
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    BrokerArn: S.optional(S.String),
    BrokerId: S.optional(S.String),
    BrokerInstances: S.optional(__listOfBrokerInstance),
    BrokerName: S.optional(S.String),
    BrokerState: S.optional(BrokerState),
    Configurations: S.optional(Configurations),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    DeploymentMode: S.optional(DeploymentMode),
    EncryptionOptions: S.optional(EncryptionOptions),
    EngineType: S.optional(EngineType),
    EngineVersion: S.optional(S.String),
    HostInstanceType: S.optional(S.String),
    LdapServerMetadata: S.optional(LdapServerMetadataOutput),
    Logs: S.optional(LogsSummary),
    MaintenanceWindowStartTime: S.optional(WeeklyStartTime),
    PendingAuthenticationStrategy: S.optional(AuthenticationStrategy),
    PendingEngineVersion: S.optional(S.String),
    PendingHostInstanceType: S.optional(S.String),
    PendingLdapServerMetadata: S.optional(LdapServerMetadataOutput),
    PendingSecurityGroups: S.optional(__listOf__string),
    PendingStorageSize: S.optional(S.Number),
    PubliclyAccessible: S.optional(S.Boolean),
    SecurityGroups: S.optional(__listOf__string),
    StorageSize: S.optional(S.Number),
    StorageType: S.optional(BrokerStorageType),
    SubnetIds: S.optional(__listOf__string),
    Tags: S.optional(__mapOf__string),
    Users: S.optional(__listOfUserSummary),
    DataReplicationMetadata: S.optional(DataReplicationMetadataOutput),
    DataReplicationMode: S.optional(DataReplicationMode),
    PendingDataReplicationMetadata: S.optional(DataReplicationMetadataOutput),
    PendingDataReplicationMode: S.optional(DataReplicationMode),
  }).pipe(
    S.encodeKeys({
      ActionsRequired: "actionsRequired",
      AuthenticationStrategy: "authenticationStrategy",
      AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
      BrokerArn: "brokerArn",
      BrokerId: "brokerId",
      BrokerInstances: "brokerInstances",
      BrokerName: "brokerName",
      BrokerState: "brokerState",
      Configurations: "configurations",
      Created: "created",
      DeploymentMode: "deploymentMode",
      EncryptionOptions: "encryptionOptions",
      EngineType: "engineType",
      EngineVersion: "engineVersion",
      HostInstanceType: "hostInstanceType",
      LdapServerMetadata: "ldapServerMetadata",
      Logs: "logs",
      MaintenanceWindowStartTime: "maintenanceWindowStartTime",
      PendingAuthenticationStrategy: "pendingAuthenticationStrategy",
      PendingEngineVersion: "pendingEngineVersion",
      PendingHostInstanceType: "pendingHostInstanceType",
      PendingLdapServerMetadata: "pendingLdapServerMetadata",
      PendingSecurityGroups: "pendingSecurityGroups",
      PendingStorageSize: "pendingStorageSize",
      PubliclyAccessible: "publiclyAccessible",
      SecurityGroups: "securityGroups",
      StorageSize: "storageSize",
      StorageType: "storageType",
      SubnetIds: "subnetIds",
      Tags: "tags",
      Users: "users",
      DataReplicationMetadata: "dataReplicationMetadata",
      DataReplicationMode: "dataReplicationMode",
      PendingDataReplicationMetadata: "pendingDataReplicationMetadata",
      PendingDataReplicationMode: "pendingDataReplicationMode",
    }),
  ),
).annotate({
  identifier: "DescribeBrokerResponse",
}) as any as S.Schema<DescribeBrokerResponse>;
export type MaxResults = number;
export interface DescribeBrokerEngineTypesRequest {
  EngineType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBrokerEngineTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/broker-engine-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBrokerEngineTypesRequest",
}) as any as S.Schema<DescribeBrokerEngineTypesRequest>;
export interface EngineVersion {
  Name?: string;
}
export const EngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({ identifier: "EngineVersion" }) as any as S.Schema<EngineVersion>;
export type __listOfEngineVersion = EngineVersion[];
export const __listOfEngineVersion = /*@__PURE__*/ S.Array(EngineVersion);
export interface BrokerEngineType {
  EngineType?: EngineType;
  EngineVersions?: EngineVersion[];
}
export const BrokerEngineType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineType: S.optional(EngineType),
    EngineVersions: S.optional(__listOfEngineVersion),
  }).pipe(
    S.encodeKeys({
      EngineType: "engineType",
      EngineVersions: "engineVersions",
    }),
  ),
).annotate({
  identifier: "BrokerEngineType",
}) as any as S.Schema<BrokerEngineType>;
export type __listOfBrokerEngineType = BrokerEngineType[];
export const __listOfBrokerEngineType = /*@__PURE__*/ S.Array(BrokerEngineType);
export type __integerMin5Max100 = number;
export interface DescribeBrokerEngineTypesResponse {
  BrokerEngineTypes?: BrokerEngineType[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBrokerEngineTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerEngineTypes: S.optional(__listOfBrokerEngineType),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BrokerEngineTypes: "brokerEngineTypes",
      MaxResults: "maxResults",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "DescribeBrokerEngineTypesResponse",
}) as any as S.Schema<DescribeBrokerEngineTypesResponse>;
export interface DescribeBrokerInstanceOptionsRequest {
  EngineType?: string;
  HostInstanceType?: string;
  MaxResults?: number;
  NextToken?: string;
  StorageType?: string;
}
export const DescribeBrokerInstanceOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EngineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
      HostInstanceType: S.optional(S.String).pipe(
        T.HttpQuery("hostInstanceType"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      StorageType: S.optional(S.String).pipe(T.HttpQuery("storageType")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/broker-instance-options" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeBrokerInstanceOptionsRequest",
}) as any as S.Schema<DescribeBrokerInstanceOptionsRequest>;
export interface AvailabilityZone {
  Name?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export type __listOfAvailabilityZone = AvailabilityZone[];
export const __listOfAvailabilityZone = /*@__PURE__*/ S.Array(AvailabilityZone);
export type __listOfDeploymentMode = DeploymentMode[];
export const __listOfDeploymentMode = /*@__PURE__*/ S.Array(DeploymentMode);
export interface BrokerInstanceOption {
  AvailabilityZones?: AvailabilityZone[];
  EngineType?: EngineType;
  HostInstanceType?: string;
  StorageType?: BrokerStorageType;
  SupportedDeploymentModes?: DeploymentMode[];
  SupportedEngineVersions?: string[];
}
export const BrokerInstanceOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(__listOfAvailabilityZone),
    EngineType: S.optional(EngineType),
    HostInstanceType: S.optional(S.String),
    StorageType: S.optional(BrokerStorageType),
    SupportedDeploymentModes: S.optional(__listOfDeploymentMode),
    SupportedEngineVersions: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      AvailabilityZones: "availabilityZones",
      EngineType: "engineType",
      HostInstanceType: "hostInstanceType",
      StorageType: "storageType",
      SupportedDeploymentModes: "supportedDeploymentModes",
      SupportedEngineVersions: "supportedEngineVersions",
    }),
  ),
).annotate({
  identifier: "BrokerInstanceOption",
}) as any as S.Schema<BrokerInstanceOption>;
export type __listOfBrokerInstanceOption = BrokerInstanceOption[];
export const __listOfBrokerInstanceOption =
  /*@__PURE__*/ S.Array(BrokerInstanceOption);
export interface DescribeBrokerInstanceOptionsResponse {
  BrokerInstanceOptions?: BrokerInstanceOption[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBrokerInstanceOptionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BrokerInstanceOptions: S.optional(__listOfBrokerInstanceOption),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        BrokerInstanceOptions: "brokerInstanceOptions",
        MaxResults: "maxResults",
        NextToken: "nextToken",
      }),
    ),
).annotate({
  identifier: "DescribeBrokerInstanceOptionsResponse",
}) as any as S.Schema<DescribeBrokerInstanceOptionsResponse>;
export interface DescribeConfigurationRequest {
  ConfigurationId: string;
}
export const DescribeConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/configurations/{ConfigurationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConfigurationRequest",
}) as any as S.Schema<DescribeConfigurationRequest>;
export interface DescribeConfigurationResponse {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Description?: string;
  EngineType?: EngineType;
  EngineVersion?: string;
  Id?: string;
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Description: S.optional(S.String),
    EngineType: S.optional(EngineType),
    EngineVersion: S.optional(S.String),
    Id: S.optional(S.String),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AuthenticationStrategy: "authenticationStrategy",
      Created: "created",
      Description: "description",
      EngineType: "engineType",
      EngineVersion: "engineVersion",
      Id: "id",
      LatestRevision: "latestRevision",
      Name: "name",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribeConfigurationResponse",
}) as any as S.Schema<DescribeConfigurationResponse>;
export interface DescribeConfigurationRevisionRequest {
  ConfigurationId: string;
  ConfigurationRevision: string;
}
export const DescribeConfigurationRevisionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
      ConfigurationRevision: S.String.pipe(
        T.HttpLabel("ConfigurationRevision"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/configurations/{ConfigurationId}/revisions/{ConfigurationRevision}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeConfigurationRevisionRequest",
}) as any as S.Schema<DescribeConfigurationRevisionRequest>;
export interface DescribeConfigurationRevisionResponse {
  ConfigurationId?: string;
  Created?: Date;
  Data?: string;
  Description?: string;
}
export const DescribeConfigurationRevisionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationId: S.optional(S.String),
      Created: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Data: S.optional(S.String),
      Description: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        ConfigurationId: "configurationId",
        Created: "created",
        Data: "data",
        Description: "description",
      }),
    ),
).annotate({
  identifier: "DescribeConfigurationRevisionResponse",
}) as any as S.Schema<DescribeConfigurationRevisionResponse>;
export interface DescribeSharedResourcesRequest {
  BrokerId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSharedResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/shared-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSharedResourcesRequest",
}) as any as S.Schema<DescribeSharedResourcesRequest>;
export type SharedResourceErrorCode =
  | "QUOTA_EXCEEDED"
  | "SHARE_NOT_FOUND"
  | "INVITE_FAILED"
  | "SETUP_INCOMPLETE"
  | "INTERNAL_ERROR"
  | "AZ_MISMATCH"
  | "RESOURCE_CONFIGURATION_NOT_FOUND"
  | (string & {});
export const SharedResourceErrorCode = S.String;

export interface SharedResourceError {
  Code?: SharedResourceErrorCode;
  Message?: string;
}
export const SharedResourceError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(SharedResourceErrorCode),
    Message: S.optional(S.String),
  }).pipe(S.encodeKeys({ Code: "code", Message: "message" })),
).annotate({
  identifier: "SharedResourceError",
}) as any as S.Schema<SharedResourceError>;
export type SharedResourceStatus =
  | "AVAILABLE"
  | "SETUP_IN_PROGRESS"
  | "DELETION_IN_PROGRESS"
  | "PENDING_CREATE"
  | "PENDING_DELETE"
  | "ERROR"
  | (string & {});
export const SharedResourceStatus = S.String;

export type SharedResourceType = "RESOURCE_SHARE" | "RESOURCE" | (string & {});
export const SharedResourceType = S.String;

export interface SharedResource {
  DnsNames?: string[];
  Error?: SharedResourceError;
  ResourceArn?: string;
  ResourceShareArns?: string[];
  Status?: SharedResourceStatus;
  Type?: SharedResourceType;
}
export const SharedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DnsNames: S.optional(__listOf__string),
    Error: S.optional(SharedResourceError),
    ResourceArn: S.optional(S.String),
    ResourceShareArns: S.optional(__listOf__string),
    Status: S.optional(SharedResourceStatus),
    Type: S.optional(SharedResourceType),
  }).pipe(
    S.encodeKeys({
      DnsNames: "dnsNames",
      Error: "error",
      ResourceArn: "resourceArn",
      ResourceShareArns: "resourceShareArns",
      Status: "status",
      Type: "type",
    }),
  ),
).annotate({ identifier: "SharedResource" }) as any as S.Schema<SharedResource>;
export type __listOfSharedResource = SharedResource[];
export const __listOfSharedResource = /*@__PURE__*/ S.Array(SharedResource);
export interface DescribeSharedResourcesResponse {
  NextToken?: string;
  SharedResources?: (SharedResource & {
    ResourceArn: string;
    Status: SharedResourceStatus;
    Type: SharedResourceType;
    Error: SharedResourceError & {
      Code: SharedResourceErrorCode;
      Message: string;
    };
  })[];
}
export const DescribeSharedResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SharedResources: S.optional(__listOfSharedResource),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      SharedResources: "sharedResources",
    }),
  ),
).annotate({
  identifier: "DescribeSharedResourcesResponse",
}) as any as S.Schema<DescribeSharedResourcesResponse>;
export interface DescribeUserRequest {
  BrokerId: string;
  Username: string;
}
export const DescribeUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    Username: S.String.pipe(T.HttpLabel("Username")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/users/{Username}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export interface UserPendingChanges {
  ConsoleAccess?: boolean;
  Groups?: string[];
  PendingChange?: ChangeType;
}
export const UserPendingChanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsoleAccess: S.optional(S.Boolean),
    Groups: S.optional(__listOf__string),
    PendingChange: S.optional(ChangeType),
  }).pipe(
    S.encodeKeys({
      ConsoleAccess: "consoleAccess",
      Groups: "groups",
      PendingChange: "pendingChange",
    }),
  ),
).annotate({
  identifier: "UserPendingChanges",
}) as any as S.Schema<UserPendingChanges>;
export interface DescribeUserResponse {
  BrokerId?: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Pending?: UserPendingChanges & { PendingChange: ChangeType };
  Username?: string;
  ReplicationUser?: boolean;
}
export const DescribeUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.optional(S.String),
    ConsoleAccess: S.optional(S.Boolean),
    Groups: S.optional(__listOf__string),
    Pending: S.optional(UserPendingChanges),
    Username: S.optional(S.String),
    ReplicationUser: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      BrokerId: "brokerId",
      ConsoleAccess: "consoleAccess",
      Groups: "groups",
      Pending: "pending",
      Username: "username",
      ReplicationUser: "replicationUser",
    }),
  ),
).annotate({
  identifier: "DescribeUserResponse",
}) as any as S.Schema<DescribeUserResponse>;
export interface ListBrokersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListBrokersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/brokers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBrokersRequest",
}) as any as S.Schema<ListBrokersRequest>;
export interface BrokerSummary {
  BrokerArn?: string;
  BrokerId?: string;
  BrokerName?: string;
  BrokerState?: BrokerState;
  Created?: Date;
  DeploymentMode?: DeploymentMode;
  EngineType?: EngineType;
  HostInstanceType?: string;
}
export const BrokerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerArn: S.optional(S.String),
    BrokerId: S.optional(S.String),
    BrokerName: S.optional(S.String),
    BrokerState: S.optional(BrokerState),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    DeploymentMode: S.optional(DeploymentMode),
    EngineType: S.optional(EngineType),
    HostInstanceType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BrokerArn: "brokerArn",
      BrokerId: "brokerId",
      BrokerName: "brokerName",
      BrokerState: "brokerState",
      Created: "created",
      DeploymentMode: "deploymentMode",
      EngineType: "engineType",
      HostInstanceType: "hostInstanceType",
    }),
  ),
).annotate({ identifier: "BrokerSummary" }) as any as S.Schema<BrokerSummary>;
export type __listOfBrokerSummary = BrokerSummary[];
export const __listOfBrokerSummary = /*@__PURE__*/ S.Array(BrokerSummary);
export interface ListBrokersResponse {
  BrokerSummaries?: (BrokerSummary & {
    DeploymentMode: DeploymentMode;
    EngineType: EngineType;
  })[];
  NextToken?: string;
}
export const ListBrokersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerSummaries: S.optional(__listOfBrokerSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BrokerSummaries: "brokerSummaries",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListBrokersResponse",
}) as any as S.Schema<ListBrokersResponse>;
export interface ListConfigurationRevisionsRequest {
  ConfigurationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationRevisionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/configurations/{ConfigurationId}/revisions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationRevisionsRequest",
}) as any as S.Schema<ListConfigurationRevisionsRequest>;
export type __listOfConfigurationRevision = ConfigurationRevision[];
export const __listOfConfigurationRevision = /*@__PURE__*/ S.Array(
  ConfigurationRevision,
);
export interface ListConfigurationRevisionsResponse {
  ConfigurationId?: string;
  MaxResults?: number;
  NextToken?: string;
  Revisions?: (ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  })[];
}
export const ListConfigurationRevisionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Revisions: S.optional(__listOfConfigurationRevision),
  }).pipe(
    S.encodeKeys({
      ConfigurationId: "configurationId",
      MaxResults: "maxResults",
      NextToken: "nextToken",
      Revisions: "revisions",
    }),
  ),
).annotate({
  identifier: "ListConfigurationRevisionsResponse",
}) as any as S.Schema<ListConfigurationRevisionsResponse>;
export interface ListConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationsRequest",
}) as any as S.Schema<ListConfigurationsRequest>;
export interface Configuration {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Description?: string;
  EngineType?: EngineType;
  EngineVersion?: string;
  Id?: string;
  LatestRevision?: ConfigurationRevision;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Description: S.optional(S.String),
    EngineType: S.optional(EngineType),
    EngineVersion: S.optional(S.String),
    Id: S.optional(S.String),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AuthenticationStrategy: "authenticationStrategy",
      Created: "created",
      Description: "description",
      EngineType: "engineType",
      EngineVersion: "engineVersion",
      Id: "id",
      LatestRevision: "latestRevision",
      Name: "name",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type __listOfConfiguration = Configuration[];
export const __listOfConfiguration = /*@__PURE__*/ S.Array(Configuration);
export interface ListConfigurationsResponse {
  Configurations?: (Configuration & {
    Arn: string;
    AuthenticationStrategy: AuthenticationStrategy;
    Created: __timestampIso8601;
    Description: string;
    EngineType: EngineType;
    EngineVersion: string;
    Id: string;
    LatestRevision: ConfigurationRevision & {
      Created: __timestampIso8601;
      Revision: number;
    };
    Name: string;
  })[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Configurations: S.optional(__listOfConfiguration),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Configurations: "configurations",
      MaxResults: "maxResults",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListConfigurationsResponse",
}) as any as S.Schema<ListConfigurationsResponse>;
export interface ListTagsRequest {
  ResourceArn: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ListUsersRequest {
  BrokerId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface ListUsersResponse {
  BrokerId?: string;
  MaxResults?: number;
  NextToken?: string;
  Users?: (UserSummary & { Username: string })[];
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Users: S.optional(__listOfUserSummary),
  }).pipe(
    S.encodeKeys({
      BrokerId: "brokerId",
      MaxResults: "maxResults",
      NextToken: "nextToken",
      Users: "users",
    }),
  ),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export type PromoteMode = "SWITCHOVER" | "FAILOVER" | (string & {});
export const PromoteMode = S.String;

export interface PromoteRequest {
  BrokerId: string;
  Mode?: PromoteMode;
}
export const PromoteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    Mode: S.optional(PromoteMode),
  })
    .pipe(S.encodeKeys({ Mode: "mode" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/brokers/{BrokerId}/promote" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({ identifier: "PromoteRequest" }) as any as S.Schema<PromoteRequest>;
export interface PromoteResponse {
  BrokerId?: string;
}
export const PromoteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrokerId: S.optional(S.String) }).pipe(
    S.encodeKeys({ BrokerId: "brokerId" }),
  ),
).annotate({
  identifier: "PromoteResponse",
}) as any as S.Schema<PromoteResponse>;
export interface RebootBrokerRequest {
  BrokerId: string;
}
export const RebootBrokerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/brokers/{BrokerId}/reboot" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootBrokerRequest",
}) as any as S.Schema<RebootBrokerRequest>;
export interface RebootBrokerResponse {}
export const RebootBrokerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RebootBrokerResponse",
}) as any as S.Schema<RebootBrokerResponse>;
export interface UpdateBrokerRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerId: string;
  Configuration?: ConfigurationId;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataInput;
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime;
  ResourceShareArns?: string[];
  SecurityGroups?: string[];
  StorageSize?: number;
  DataReplicationMode?: DataReplicationMode;
}
export const UpdateBrokerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    Configuration: S.optional(ConfigurationId),
    EngineVersion: S.optional(S.String),
    HostInstanceType: S.optional(S.String),
    LdapServerMetadata: S.optional(LdapServerMetadataInput),
    Logs: S.optional(Logs),
    MaintenanceWindowStartTime: S.optional(WeeklyStartTime),
    ResourceShareArns: S.optional(__listOf__string),
    SecurityGroups: S.optional(__listOf__string),
    StorageSize: S.optional(S.Number),
    DataReplicationMode: S.optional(DataReplicationMode),
  })
    .pipe(
      S.encodeKeys({
        AuthenticationStrategy: "authenticationStrategy",
        AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
        Configuration: "configuration",
        EngineVersion: "engineVersion",
        HostInstanceType: "hostInstanceType",
        LdapServerMetadata: "ldapServerMetadata",
        Logs: "logs",
        MaintenanceWindowStartTime: "maintenanceWindowStartTime",
        ResourceShareArns: "resourceShareArns",
        SecurityGroups: "securityGroups",
        StorageSize: "storageSize",
        DataReplicationMode: "dataReplicationMode",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/brokers/{BrokerId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateBrokerRequest",
}) as any as S.Schema<UpdateBrokerRequest>;
export interface UpdateBrokerResponse {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerId?: string;
  Configuration?: ConfigurationId & { Id: string };
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime & {
    DayOfWeek: DayOfWeek;
    TimeOfDay: string;
  };
  ResourceShareArns?: string[];
  SecurityGroups?: string[];
  DataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  PendingDataReplicationMode?: DataReplicationMode;
  StorageSize?: number;
}
export const UpdateBrokerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationStrategy: S.optional(AuthenticationStrategy),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    BrokerId: S.optional(S.String),
    Configuration: S.optional(ConfigurationId),
    EngineVersion: S.optional(S.String),
    HostInstanceType: S.optional(S.String),
    LdapServerMetadata: S.optional(LdapServerMetadataOutput),
    Logs: S.optional(Logs),
    MaintenanceWindowStartTime: S.optional(WeeklyStartTime),
    ResourceShareArns: S.optional(__listOf__string),
    SecurityGroups: S.optional(__listOf__string),
    DataReplicationMetadata: S.optional(DataReplicationMetadataOutput),
    DataReplicationMode: S.optional(DataReplicationMode),
    PendingDataReplicationMetadata: S.optional(DataReplicationMetadataOutput),
    PendingDataReplicationMode: S.optional(DataReplicationMode),
    StorageSize: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AuthenticationStrategy: "authenticationStrategy",
      AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
      BrokerId: "brokerId",
      Configuration: "configuration",
      EngineVersion: "engineVersion",
      HostInstanceType: "hostInstanceType",
      LdapServerMetadata: "ldapServerMetadata",
      Logs: "logs",
      MaintenanceWindowStartTime: "maintenanceWindowStartTime",
      ResourceShareArns: "resourceShareArns",
      SecurityGroups: "securityGroups",
      DataReplicationMetadata: "dataReplicationMetadata",
      DataReplicationMode: "dataReplicationMode",
      PendingDataReplicationMetadata: "pendingDataReplicationMetadata",
      PendingDataReplicationMode: "pendingDataReplicationMode",
      StorageSize: "storageSize",
    }),
  ),
).annotate({
  identifier: "UpdateBrokerResponse",
}) as any as S.Schema<UpdateBrokerResponse>;
export interface UpdateConfigurationRequest {
  ConfigurationId: string;
  Data?: string;
  Description?: string;
}
export const UpdateConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
    Data: S.optional(S.String),
    Description: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ Data: "data", Description: "description" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/configurations/{ConfigurationId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConfigurationRequest",
}) as any as S.Schema<UpdateConfigurationRequest>;
export type SanitizationWarningReason =
  | "DISALLOWED_ELEMENT_REMOVED"
  | "DISALLOWED_ATTRIBUTE_REMOVED"
  | "INVALID_ATTRIBUTE_VALUE_REMOVED"
  | (string & {});
export const SanitizationWarningReason = S.String;

export interface SanitizationWarning {
  AttributeName?: string;
  ElementName?: string;
  Reason?: SanitizationWarningReason;
}
export const SanitizationWarning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    ElementName: S.optional(S.String),
    Reason: S.optional(SanitizationWarningReason),
  }).pipe(
    S.encodeKeys({
      AttributeName: "attributeName",
      ElementName: "elementName",
      Reason: "reason",
    }),
  ),
).annotate({
  identifier: "SanitizationWarning",
}) as any as S.Schema<SanitizationWarning>;
export type __listOfSanitizationWarning = SanitizationWarning[];
export const __listOfSanitizationWarning =
  /*@__PURE__*/ S.Array(SanitizationWarning);
export interface UpdateConfigurationResponse {
  Arn?: string;
  Created?: Date;
  Id?: string;
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
  Name?: string;
  Warnings?: (SanitizationWarning & { Reason: SanitizationWarningReason })[];
}
export const UpdateConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Id: S.optional(S.String),
    LatestRevision: S.optional(ConfigurationRevision),
    Name: S.optional(S.String),
    Warnings: S.optional(__listOfSanitizationWarning),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Created: "created",
      Id: "id",
      LatestRevision: "latestRevision",
      Name: "name",
      Warnings: "warnings",
    }),
  ),
).annotate({
  identifier: "UpdateConfigurationResponse",
}) as any as S.Schema<UpdateConfigurationResponse>;
export interface UpdateUserRequest {
  BrokerId: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username: string;
  ReplicationUser?: boolean;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
    ConsoleAccess: S.optional(S.Boolean),
    Groups: S.optional(__listOf__string),
    Password: S.optional(SensitiveString),
    Username: S.String.pipe(T.HttpLabel("Username")),
    ReplicationUser: S.optional(S.Boolean),
  })
    .pipe(
      S.encodeKeys({
        ConsoleAccess: "consoleAccess",
        Groups: "groups",
        Password: "password",
        ReplicationUser: "replicationUser",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/brokers/{BrokerId}/users/{Username}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResponse {}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export interface ResourceShareError {
  ErrorCode?: string;
  ResourceShareArn?: string;
  Status?: string;
}
export const ResourceShareError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ResourceShareArn: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ErrorCode: "errorCode",
      ResourceShareArn: "resourceShareArn",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "ResourceShareError",
}) as any as S.Schema<ResourceShareError>;
export type __listOfResourceShareError = ResourceShareError[];
export const __listOfResourceShareError =
  /*@__PURE__*/ S.Array(ResourceShareError);
export type CreateBrokerError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a broker. Note: This API is asynchronous.
 *
 * To create a broker, you must either use the AmazonMQFullAccess IAM policy or include the following EC2 permissions in your IAM policy.
 *
 * - ec2:CreateNetworkInterface
 *
 * This permission is required to allow Amazon MQ to create an elastic network interface (ENI) on behalf of your account.
 *
 * - ec2:CreateNetworkInterfacePermission
 *
 * This permission is required to attach the ENI to the broker instance.
 *
 * - ec2:DeleteNetworkInterface
 *
 * - ec2:DeleteNetworkInterfacePermission
 *
 * - ec2:DetachNetworkInterface
 *
 * - ec2:DescribeInternetGateways
 *
 * - ec2:DescribeNetworkInterfaces
 *
 * - ec2:DescribeNetworkInterfacePermissions
 *
 * - ec2:DescribeRouteTables
 *
 * - ec2:DescribeSecurityGroups
 *
 * - ec2:DescribeSubnets
 *
 * - ec2:DescribeVpcs
 *
 * For more information, see Create an IAM User and Get Your Amazon Web Services Credentials and Never Modify or Delete the Amazon MQ Elastic Network Interface in the *Amazon MQ Developer Guide*.
 */
export const createBroker: API.OperationMethod<
  CreateBrokerRequest,
  CreateBrokerResponse,
  CreateBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBrokerRequest,
  output: CreateBrokerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBroker",
}));

export type CreateConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new configuration for the specified configuration name. Amazon MQ uses the default configuration (the engine type and version).
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationRequest,
  output: CreateConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
}));

export type CreateTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Add a tag to a resource.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type CreateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Creates an ActiveMQ user.
 *
 * Do not add personally identifiable information (PII) or other confidential or sensitive information in broker usernames. Broker usernames are accessible to other Amazon Web Services services, including CloudWatch Logs. Broker usernames are not intended to be used for private or sensitive data.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a broker. Note: This API is asynchronous.
 */
export const deleteBroker: API.OperationMethod<
  DeleteBrokerRequest,
  DeleteBrokerResponse,
  DeleteBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBrokerRequest,
  output: DeleteBrokerResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBroker",
}));

export type DeleteConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the specified configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationRequest,
  output: DeleteConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
}));

export type DeleteTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DeleteUserError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes an ActiveMQ user.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the specified broker.
 */
export const describeBroker: API.OperationMethod<
  DescribeBrokerRequest,
  DescribeBrokerResponse,
  DescribeBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBrokerRequest,
  output: DescribeBrokerResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBroker",
}));

export type DescribeBrokerEngineTypesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describe available engine types and versions.
 */
export const describeBrokerEngineTypes: API.OperationMethod<
  DescribeBrokerEngineTypesRequest,
  DescribeBrokerEngineTypesResponse,
  DescribeBrokerEngineTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBrokerEngineTypesRequest,
  output: DescribeBrokerEngineTypesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerEngineTypes",
}));

export type DescribeBrokerInstanceOptionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describe available broker instance options.
 */
export const describeBrokerInstanceOptions: API.OperationMethod<
  DescribeBrokerInstanceOptionsRequest,
  DescribeBrokerInstanceOptionsResponse,
  DescribeBrokerInstanceOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBrokerInstanceOptionsRequest,
  output: DescribeBrokerInstanceOptionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerInstanceOptions",
}));

export type DescribeConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the specified configuration.
 */
export const describeConfiguration: API.OperationMethod<
  DescribeConfigurationRequest,
  DescribeConfigurationResponse,
  DescribeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationRequest,
  output: DescribeConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfiguration",
}));

export type DescribeConfigurationRevisionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the specified configuration revision for the specified configuration.
 */
export const describeConfigurationRevision: API.OperationMethod<
  DescribeConfigurationRevisionRequest,
  DescribeConfigurationRevisionResponse,
  DescribeConfigurationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationRevisionRequest,
  output: DescribeConfigurationRevisionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRevision",
}));

export type DescribeSharedResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the resources shared to a broker.
 */
export const describeSharedResources: API.PaginatedOperationMethod<
  DescribeSharedResourcesRequest,
  DescribeSharedResourcesResponse,
  DescribeSharedResourcesError,
  Credentials | HttpClient.HttpClient,
  SharedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSharedResourcesRequest,
  output: DescribeSharedResourcesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SharedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeUserError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an ActiveMQ user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type ListBrokersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of all brokers.
 */
export const listBrokers: API.PaginatedOperationMethod<
  ListBrokersRequest,
  ListBrokersResponse,
  ListBrokersError,
  Credentials | HttpClient.HttpClient,
  BrokerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBrokersRequest,
  output: ListBrokersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrokers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BrokerSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationRevisionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of all revisions for the specified configuration.
 */
export const listConfigurationRevisions: API.OperationMethod<
  ListConfigurationRevisionsRequest,
  ListConfigurationRevisionsResponse,
  ListConfigurationRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConfigurationRevisionsRequest,
  output: ListConfigurationRevisionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationRevisions",
}));

export type ListConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of all configurations.
 */
export const listConfigurations: API.OperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConfigurationsRequest,
  output: ListConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
}));

export type ListTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Lists tags for a resource.
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
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListUsersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of all ActiveMQ users.
 */
export const listUsers: API.OperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
}));

export type PromoteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Promotes a data replication replica broker to the primary broker role.
 */
export const promote: API.OperationMethod<
  PromoteRequest,
  PromoteResponse,
  PromoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PromoteRequest,
  output: PromoteResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Promote",
}));

export type RebootBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Reboots a broker. Note: This API is asynchronous.
 */
export const rebootBroker: API.OperationMethod<
  RebootBrokerRequest,
  RebootBrokerResponse,
  RebootBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootBrokerRequest,
  output: RebootBrokerResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootBroker",
}));

export type UpdateBrokerError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds a pending configuration change to a broker.
 */
export const updateBroker: API.OperationMethod<
  UpdateBrokerRequest,
  UpdateBrokerResponse,
  UpdateBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBrokerRequest,
  output: UpdateBrokerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBroker",
}));

export type UpdateConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the specified configuration.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  UpdateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationRequest,
  output: UpdateConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguration",
}));

export type UpdateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the information for an ActiveMQ user.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));
