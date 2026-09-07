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
const ns = T.XmlNamespace("http://gamelift.amazonaws.com/doc/");
const svc = T.AwsApiService({
  sdkId: "GameLift",
  serviceShapeName: "GameLift",
});
const auth = T.AwsAuthSigv4({ name: "gamelift" });
const ver = T.ServiceVersion("2015-10-01");
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
              `https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://gamelift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://gamelift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ) {}
export class FleetCapacityExceededException
  extends /*@__PURE__*/ S.TaggedError<FleetCapacityExceededException>()(
    "FleetCapacityExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GameSessionFullException
  extends /*@__PURE__*/ S.TaggedError<GameSessionFullException>()(
    "GameSessionFullException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidFleetStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidFleetStatusException>()(
    "InvalidFleetStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidGameSessionStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidGameSessionStatusException>()(
    "InvalidGameSessionStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotReadyException
  extends /*@__PURE__*/ S.TaggedError<NotReadyException>()(
    "NotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OutOfCapacityException
  extends /*@__PURE__*/ S.TaggedError<OutOfCapacityException>()(
    "OutOfCapacityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TaggingFailedException
  extends /*@__PURE__*/ S.TaggedError<TaggingFailedException>()(
    "TaggingFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TerminalRoutingStrategyException
  extends /*@__PURE__*/ S.TaggedError<TerminalRoutingStrategyException>()(
    "TerminalRoutingStrategyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class UnsupportedRegionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedRegionException>()(
    "UnsupportedRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type MatchmakingIdStringModel = string;
export type PlayerId = string | redacted.Redacted<string>;
export type PlayerIdsForAcceptMatch = (string | redacted.Redacted<string>)[];
export const PlayerIdsForAcceptMatch = /*@__PURE__*/ S.Array(SensitiveString);
export type AcceptanceType = "ACCEPT" | "REJECT" | (string & {});
export const AcceptanceType = S.String;

export interface AcceptMatchInput {
  TicketId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
  AcceptanceType?: AcceptanceType;
}
export const AcceptMatchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TicketId: S.optional(S.String),
    PlayerIds: S.optional(PlayerIdsForAcceptMatch),
    AcceptanceType: S.optional(AcceptanceType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptMatchInput",
}) as any as S.Schema<AcceptMatchInput>;
export interface AcceptMatchOutput {}
export const AcceptMatchOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AcceptMatchOutput",
}) as any as S.Schema<AcceptMatchOutput>;
export type GameServerGroupNameOrArn = string;
export type GameServerId = string;
export type GameServerData = string | redacted.Redacted<string>;
export type FilterInstanceStatus = "ACTIVE" | "DRAINING" | (string & {});
export const FilterInstanceStatus = S.String;

export type FilterInstanceStatuses = FilterInstanceStatus[];
export const FilterInstanceStatuses =
  /*@__PURE__*/ S.Array(FilterInstanceStatus);
export interface ClaimFilterOption {
  InstanceStatuses?: FilterInstanceStatus[];
}
export const ClaimFilterOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceStatuses: S.optional(FilterInstanceStatuses) }),
).annotate({
  identifier: "ClaimFilterOption",
}) as any as S.Schema<ClaimFilterOption>;
export interface ClaimGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  GameServerData?: string | redacted.Redacted<string>;
  FilterOption?: ClaimFilterOption;
}
export const ClaimGameServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerId: S.optional(S.String),
    GameServerData: S.optional(SensitiveString),
    FilterOption: S.optional(ClaimFilterOption),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ClaimGameServerInput",
}) as any as S.Schema<ClaimGameServerInput>;
export type GameServerGroupName = string;
export type GameServerGroupArn = string;
export type GameServerInstanceId = string;
export type GameServerConnectionInfo = string;
export type GameServerClaimStatus = "CLAIMED" | (string & {});
export const GameServerClaimStatus = S.String;

export type GameServerUtilizationStatus =
  | "AVAILABLE"
  | "UTILIZED"
  | (string & {});
export const GameServerUtilizationStatus = S.String;

export interface GameServer {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  GameServerId?: string;
  InstanceId?: string;
  ConnectionInfo?: string;
  GameServerData?: string | redacted.Redacted<string>;
  ClaimStatus?: GameServerClaimStatus;
  UtilizationStatus?: GameServerUtilizationStatus;
  RegistrationTime?: Date;
  LastClaimTime?: Date;
  LastHealthCheckTime?: Date;
}
export const GameServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerGroupArn: S.optional(S.String),
    GameServerId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    ConnectionInfo: S.optional(S.String),
    GameServerData: S.optional(SensitiveString),
    ClaimStatus: S.optional(GameServerClaimStatus),
    UtilizationStatus: S.optional(GameServerUtilizationStatus),
    RegistrationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastClaimTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastHealthCheckTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "GameServer" }) as any as S.Schema<GameServer>;
export interface ClaimGameServerOutput {
  GameServer?: GameServer;
}
export const ClaimGameServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServer: S.optional(GameServer) }).pipe(ns),
).annotate({
  identifier: "ClaimGameServerOutput",
}) as any as S.Schema<ClaimGameServerOutput>;
export type NonBlankAndLengthConstraintString = string;
export type NonZeroAndMaxString = string;
export type RoutingStrategyType = "SIMPLE" | "TERMINAL" | (string & {});
export const RoutingStrategyType = S.String;

export type FleetId = string;
export type FreeText = string;
export interface RoutingStrategy {
  Type?: RoutingStrategyType;
  FleetId?: string;
  Message?: string;
}
export const RoutingStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RoutingStrategyType),
    FleetId: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "RoutingStrategy",
}) as any as S.Schema<RoutingStrategy>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateAliasInput {
  Name?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
  Tags?: Tag[];
}
export const CreateAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    RoutingStrategy: S.optional(RoutingStrategy),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAliasInput",
}) as any as S.Schema<CreateAliasInput>;
export type AliasId = string;
export type AliasArn = string;
export interface Alias {
  AliasId?: string;
  Name?: string;
  AliasArn?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export const Alias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AliasId: S.optional(S.String),
    Name: S.optional(S.String),
    AliasArn: S.optional(S.String),
    Description: S.optional(S.String),
    RoutingStrategy: S.optional(RoutingStrategy),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Alias" }) as any as S.Schema<Alias>;
export interface CreateAliasOutput {
  Alias?: Alias;
}
export const CreateAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Alias: S.optional(Alias) }).pipe(ns),
).annotate({
  identifier: "CreateAliasOutput",
}) as any as S.Schema<CreateAliasOutput>;
export type NonEmptyString = string;
export interface S3Location {
  Bucket?: string;
  Key?: string;
  RoleArn?: string;
  ObjectVersion?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Key: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ObjectVersion: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type OperatingSystem =
  | "WINDOWS_2012"
  | "AMAZON_LINUX"
  | "AMAZON_LINUX_2"
  | "WINDOWS_2016"
  | "AMAZON_LINUX_2023"
  | "WINDOWS_2022"
  | (string & {});
export const OperatingSystem = S.String;

export type ServerSdkVersion = string;
export interface CreateBuildInput {
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  OperatingSystem?: OperatingSystem;
  Tags?: Tag[];
  ServerSdkVersion?: string;
}
export const CreateBuildInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    StorageLocation: S.optional(S3Location),
    OperatingSystem: S.optional(OperatingSystem),
    Tags: S.optional(TagList),
    ServerSdkVersion: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBuildInput",
}) as any as S.Schema<CreateBuildInput>;
export type BuildId = string;
export type BuildArn = string;
export type BuildStatus = "INITIALIZED" | "READY" | "FAILED" | (string & {});
export const BuildStatus = S.String;

export type WholeNumberLong = number;
export interface Build {
  BuildId?: string;
  BuildArn?: string;
  Name?: string;
  Version?: string;
  Status?: BuildStatus;
  SizeOnDisk?: number;
  OperatingSystem?: OperatingSystem;
  CreationTime?: Date;
  ServerSdkVersion?: string;
}
export const Build = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BuildId: S.optional(S.String),
    BuildArn: S.optional(S.String),
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    Status: S.optional(BuildStatus),
    SizeOnDisk: S.optional(S.Number),
    OperatingSystem: S.optional(OperatingSystem),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServerSdkVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Build" }) as any as S.Schema<Build>;
export interface AwsCredentials {
  AccessKeyId?: string;
  SecretAccessKey?: string;
  SessionToken?: string;
}
export const AwsCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.optional(S.String),
    SecretAccessKey: S.optional(S.String),
    SessionToken: S.optional(S.String),
  }),
).annotate({ identifier: "AwsCredentials" }) as any as S.Schema<AwsCredentials>;
export interface CreateBuildOutput {
  Build?: Build;
  UploadCredentials?: AwsCredentials;
  StorageLocation?: S3Location;
}
export const CreateBuildOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Build: S.optional(Build),
    UploadCredentials: S.optional(AwsCredentials),
    StorageLocation: S.optional(S3Location),
  }).pipe(ns),
).annotate({
  identifier: "CreateBuildOutput",
}) as any as S.Schema<CreateBuildOutput>;
export type IamRoleArn = string;
export type ContainerGroupDefinitionNameOrArn = string;
export type PortNumber = number;
export interface ConnectionPortRange {
  FromPort?: number;
  ToPort?: number;
}
export const ConnectionPortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
).annotate({
  identifier: "ConnectionPortRange",
}) as any as S.Schema<ConnectionPortRange>;
export type IpRange = string | redacted.Redacted<string>;
export type IpProtocol = "TCP" | "UDP" | (string & {});
export const IpProtocol = S.String;

export interface IpPermission {
  FromPort?: number;
  ToPort?: number;
  IpRange?: string | redacted.Redacted<string>;
  Protocol?: IpProtocol;
}
export const IpPermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromPort: S.optional(S.Number),
    ToPort: S.optional(S.Number),
    IpRange: S.optional(SensitiveString),
    Protocol: S.optional(IpProtocol),
  }),
).annotate({ identifier: "IpPermission" }) as any as S.Schema<IpPermission>;
export type IpPermissionsList = IpPermission[];
export const IpPermissionsList = /*@__PURE__*/ S.Array(IpPermission);
export type GameServerContainerGroupsPerInstance = number;
export type ContainerFleetBillingType = "ON_DEMAND" | "SPOT" | (string & {});
export const ContainerFleetBillingType = S.String;

export type LocationStringModel = string;
export interface LocationConfiguration {
  Location?: string;
}
export const LocationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Location: S.optional(S.String) }),
).annotate({
  identifier: "LocationConfiguration",
}) as any as S.Schema<LocationConfiguration>;
export type LocationConfigurationList = LocationConfiguration[];
export const LocationConfigurationList = /*@__PURE__*/ S.Array(
  LocationConfiguration,
);
export type MetricGroup = string;
export type MetricGroupList = string[];
export const MetricGroupList = /*@__PURE__*/ S.Array(S.String);
export type ProtectionPolicy =
  | "NoProtection"
  | "FullProtection"
  | (string & {});
export const ProtectionPolicy = S.String;

export type WholeNumber = number;
export interface GameSessionCreationLimitPolicy {
  NewGameSessionsPerCreator?: number;
  PolicyPeriodInMinutes?: number;
}
export const GameSessionCreationLimitPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NewGameSessionsPerCreator: S.optional(S.Number),
    PolicyPeriodInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "GameSessionCreationLimitPolicy",
}) as any as S.Schema<GameSessionCreationLimitPolicy>;
export type LogDestination = "NONE" | "CLOUDWATCH" | "S3" | (string & {});
export const LogDestination = S.String;

export type LogGroupArnStringModel = string;
export interface LogConfiguration {
  LogDestination?: LogDestination;
  S3BucketName?: string;
  LogGroupArn?: string;
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogDestination: S.optional(LogDestination),
    S3BucketName: S.optional(S.String),
    LogGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export type PlayerGatewayMode =
  | "DISABLED"
  | "ENABLED"
  | "REQUIRED"
  | (string & {});
export const PlayerGatewayMode = S.String;

export interface CreateContainerFleetInput {
  FleetRoleArn?: string;
  Description?: string;
  GameServerContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissions?: IpPermission[];
  GameServerContainerGroupsPerInstance?: number;
  InstanceType?: string;
  BillingType?: ContainerFleetBillingType;
  Locations?: LocationConfiguration[];
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  LogConfiguration?: LogConfiguration;
  Tags?: Tag[];
  PlayerGatewayMode?: PlayerGatewayMode;
}
export const CreateContainerFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetRoleArn: S.optional(S.String),
    Description: S.optional(S.String),
    GameServerContainerGroupDefinitionName: S.optional(S.String),
    PerInstanceContainerGroupDefinitionName: S.optional(S.String),
    InstanceConnectionPortRange: S.optional(ConnectionPortRange),
    InstanceInboundPermissions: S.optional(IpPermissionsList),
    GameServerContainerGroupsPerInstance: S.optional(S.Number),
    InstanceType: S.optional(S.String),
    BillingType: S.optional(ContainerFleetBillingType),
    Locations: S.optional(LocationConfigurationList),
    MetricGroups: S.optional(MetricGroupList),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    GameSessionCreationLimitPolicy: S.optional(GameSessionCreationLimitPolicy),
    LogConfiguration: S.optional(LogConfiguration),
    Tags: S.optional(TagList),
    PlayerGatewayMode: S.optional(PlayerGatewayMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContainerFleetInput",
}) as any as S.Schema<CreateContainerFleetInput>;
export type FleetArn = string;
export type ContainerGroupDefinitionName = string;
export type ContainerGroupDefinitionArn = string;
export type MaximumGameServerContainerGroupsPerInstance = number;
export type ContainerFleetStatus =
  | "PENDING"
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "EXPIRED"
  | (string & {});
export const ContainerFleetStatus = S.String;

export type DeploymentId = string;
export interface DeploymentDetails {
  LatestDeploymentId?: string;
}
export const DeploymentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LatestDeploymentId: S.optional(S.String) }),
).annotate({
  identifier: "DeploymentDetails",
}) as any as S.Schema<DeploymentDetails>;
export type ContainerFleetLocationStatus =
  | "PENDING"
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "EXPIRED"
  | (string & {});
export const ContainerFleetLocationStatus = S.String;

export type PlayerGatewayStatus = "DISABLED" | "ENABLED" | (string & {});
export const PlayerGatewayStatus = S.String;

export interface ContainerFleetLocationAttributes {
  Location?: string;
  Status?: ContainerFleetLocationStatus;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export const ContainerFleetLocationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    Status: S.optional(ContainerFleetLocationStatus),
    PlayerGatewayStatus: S.optional(PlayerGatewayStatus),
  }),
).annotate({
  identifier: "ContainerFleetLocationAttributes",
}) as any as S.Schema<ContainerFleetLocationAttributes>;
export type ContainerFleetLocationAttributesList =
  ContainerFleetLocationAttributes[];
export const ContainerFleetLocationAttributesList = /*@__PURE__*/ S.Array(
  ContainerFleetLocationAttributes,
);
export interface ContainerFleet {
  FleetId?: string;
  FleetArn?: string;
  FleetRoleArn?: string;
  GameServerContainerGroupDefinitionName?: string;
  GameServerContainerGroupDefinitionArn?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionArn?: string;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissions?: IpPermission[];
  GameServerContainerGroupsPerInstance?: number;
  MaximumGameServerContainerGroupsPerInstance?: number;
  InstanceType?: string;
  BillingType?: ContainerFleetBillingType;
  Description?: string;
  CreationTime?: Date;
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  Status?: ContainerFleetStatus;
  DeploymentDetails?: DeploymentDetails;
  LogConfiguration?: LogConfiguration;
  LocationAttributes?: ContainerFleetLocationAttributes[];
  PlayerGatewayMode?: PlayerGatewayMode;
}
export const ContainerFleet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    FleetRoleArn: S.optional(S.String),
    GameServerContainerGroupDefinitionName: S.optional(S.String),
    GameServerContainerGroupDefinitionArn: S.optional(S.String),
    PerInstanceContainerGroupDefinitionName: S.optional(S.String),
    PerInstanceContainerGroupDefinitionArn: S.optional(S.String),
    InstanceConnectionPortRange: S.optional(ConnectionPortRange),
    InstanceInboundPermissions: S.optional(IpPermissionsList),
    GameServerContainerGroupsPerInstance: S.optional(S.Number),
    MaximumGameServerContainerGroupsPerInstance: S.optional(S.Number),
    InstanceType: S.optional(S.String),
    BillingType: S.optional(ContainerFleetBillingType),
    Description: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MetricGroups: S.optional(MetricGroupList),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    GameSessionCreationLimitPolicy: S.optional(GameSessionCreationLimitPolicy),
    Status: S.optional(ContainerFleetStatus),
    DeploymentDetails: S.optional(DeploymentDetails),
    LogConfiguration: S.optional(LogConfiguration),
    LocationAttributes: S.optional(ContainerFleetLocationAttributesList),
    PlayerGatewayMode: S.optional(PlayerGatewayMode),
  }),
).annotate({ identifier: "ContainerFleet" }) as any as S.Schema<ContainerFleet>;
export interface CreateContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export const CreateContainerFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerFleet: S.optional(ContainerFleet) }).pipe(ns),
).annotate({
  identifier: "CreateContainerFleetOutput",
}) as any as S.Schema<CreateContainerFleetOutput>;
export type ContainerGroupType = "GAME_SERVER" | "PER_INSTANCE" | (string & {});
export const ContainerGroupType = S.String;

export type ContainerTotalMemoryLimit = number;
export type ContainerTotalVcpuLimit = number;
export type NonZeroAnd128MaxAsciiString = string;
export type ContainerDependencyCondition =
  | "START"
  | "COMPLETE"
  | "SUCCESS"
  | "HEALTHY"
  | (string & {});
export const ContainerDependencyCondition = S.String;

export interface ContainerDependency {
  ContainerName?: string;
  Condition?: ContainerDependencyCondition;
}
export const ContainerDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    Condition: S.optional(ContainerDependencyCondition),
  }),
).annotate({
  identifier: "ContainerDependency",
}) as any as S.Schema<ContainerDependency>;
export type ContainerDependencyList = ContainerDependency[];
export const ContainerDependencyList =
  /*@__PURE__*/ S.Array(ContainerDependency);
export type InstancePathString = string;
export type ContainerPathString = string;
export type ContainerMountPointAccessLevel =
  | "READ_ONLY"
  | "READ_AND_WRITE"
  | (string & {});
export const ContainerMountPointAccessLevel = S.String;

export interface ContainerMountPoint {
  InstancePath?: string;
  ContainerPath?: string;
  AccessLevel?: ContainerMountPointAccessLevel;
}
export const ContainerMountPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstancePath: S.optional(S.String),
    ContainerPath: S.optional(S.String),
    AccessLevel: S.optional(ContainerMountPointAccessLevel),
  }),
).annotate({
  identifier: "ContainerMountPoint",
}) as any as S.Schema<ContainerMountPoint>;
export type ContainerMountPointList = ContainerMountPoint[];
export const ContainerMountPointList =
  /*@__PURE__*/ S.Array(ContainerMountPoint);
export type NonZeroAnd255MaxString = string;
export interface ContainerEnvironment {
  Name?: string;
  Value?: string;
}
export const ContainerEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "ContainerEnvironment",
}) as any as S.Schema<ContainerEnvironment>;
export type ContainerEnvironmentList = ContainerEnvironment[];
export const ContainerEnvironmentList =
  /*@__PURE__*/ S.Array(ContainerEnvironment);
export type ImageUriString = string;
export interface ContainerPortRange {
  FromPort?: number;
  ToPort?: number;
  Protocol?: IpProtocol;
}
export const ContainerPortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromPort: S.optional(S.Number),
    ToPort: S.optional(S.Number),
    Protocol: S.optional(IpProtocol),
  }),
).annotate({
  identifier: "ContainerPortRange",
}) as any as S.Schema<ContainerPortRange>;
export type ContainerPortRangeList = ContainerPortRange[];
export const ContainerPortRangeList = /*@__PURE__*/ S.Array(ContainerPortRange);
export interface ContainerPortConfiguration {
  ContainerPortRanges?: ContainerPortRange[];
}
export const ContainerPortConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerPortRanges: S.optional(ContainerPortRangeList) }),
).annotate({
  identifier: "ContainerPortConfiguration",
}) as any as S.Schema<ContainerPortConfiguration>;
export type LinuxCapability =
  | "AUDIT_CONTROL"
  | "AUDIT_WRITE"
  | "BLOCK_SUSPEND"
  | "CHOWN"
  | "DAC_OVERRIDE"
  | "DAC_READ_SEARCH"
  | "FOWNER"
  | "FSETID"
  | "IPC_LOCK"
  | "IPC_OWNER"
  | "KILL"
  | "LEASE"
  | "LINUX_IMMUTABLE"
  | "MAC_ADMIN"
  | "MAC_OVERRIDE"
  | "MKNOD"
  | "NET_ADMIN"
  | "NET_BIND_SERVICE"
  | "NET_BROADCAST"
  | "NET_RAW"
  | "SETFCAP"
  | "SETGID"
  | "SETPCAP"
  | "SETUID"
  | "SYS_ADMIN"
  | "SYS_BOOT"
  | "SYS_CHROOT"
  | "SYS_MODULE"
  | "SYS_NICE"
  | "SYS_PACCT"
  | "SYS_PTRACE"
  | "SYS_RAWIO"
  | "SYS_RESOURCE"
  | "SYS_TIME"
  | "SYS_TTY_CONFIG"
  | "SYSLOG"
  | "WAKE_ALARM"
  | (string & {});
export const LinuxCapability = S.String;

export type LinuxCapabilityList = LinuxCapability[];
export const LinuxCapabilityList = /*@__PURE__*/ S.Array(LinuxCapability);
export interface LinuxCapabilities {
  Include?: LinuxCapability[];
}
export const LinuxCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Include: S.optional(LinuxCapabilityList) }),
).annotate({
  identifier: "LinuxCapabilities",
}) as any as S.Schema<LinuxCapabilities>;
export interface GameServerContainerDefinitionInput {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  ImageUri?: string;
  PortConfiguration?: ContainerPortConfiguration;
  ServerSdkVersion?: string;
  LinuxCapabilities?: LinuxCapabilities;
}
export const GameServerContainerDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    DependsOn: S.optional(ContainerDependencyList),
    MountPoints: S.optional(ContainerMountPointList),
    EnvironmentOverride: S.optional(ContainerEnvironmentList),
    ImageUri: S.optional(S.String),
    PortConfiguration: S.optional(ContainerPortConfiguration),
    ServerSdkVersion: S.optional(S.String),
    LinuxCapabilities: S.optional(LinuxCapabilities),
  }),
).annotate({
  identifier: "GameServerContainerDefinitionInput",
}) as any as S.Schema<GameServerContainerDefinitionInput>;
export type BooleanModel = boolean;
export type ContainerCommandStringList = string[];
export const ContainerCommandStringList = /*@__PURE__*/ S.Array(S.String);
export type ContainerHealthCheckInterval = number;
export type ContainerHealthCheckRetries = number;
export type ContainerHealthCheckStartPeriod = number;
export type ContainerHealthCheckTimeout = number;
export interface ContainerHealthCheck {
  Command?: string[];
  Interval?: number;
  Retries?: number;
  StartPeriod?: number;
  Timeout?: number;
}
export const ContainerHealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Command: S.optional(ContainerCommandStringList),
    Interval: S.optional(S.Number),
    Retries: S.optional(S.Number),
    StartPeriod: S.optional(S.Number),
    Timeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContainerHealthCheck",
}) as any as S.Schema<ContainerHealthCheck>;
export type ContainerMemoryLimit = number;
export type ContainerVcpu = number;
export interface SupportContainerDefinitionInput {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  Essential?: boolean;
  HealthCheck?: ContainerHealthCheck;
  ImageUri?: string;
  MemoryHardLimitMebibytes?: number;
  PortConfiguration?: ContainerPortConfiguration;
  Vcpu?: number;
  LinuxCapabilities?: LinuxCapabilities;
}
export const SupportContainerDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    DependsOn: S.optional(ContainerDependencyList),
    MountPoints: S.optional(ContainerMountPointList),
    EnvironmentOverride: S.optional(ContainerEnvironmentList),
    Essential: S.optional(S.Boolean),
    HealthCheck: S.optional(ContainerHealthCheck),
    ImageUri: S.optional(S.String),
    MemoryHardLimitMebibytes: S.optional(S.Number),
    PortConfiguration: S.optional(ContainerPortConfiguration),
    Vcpu: S.optional(S.Number),
    LinuxCapabilities: S.optional(LinuxCapabilities),
  }),
).annotate({
  identifier: "SupportContainerDefinitionInput",
}) as any as S.Schema<SupportContainerDefinitionInput>;
export type SupportContainerDefinitionInputList =
  SupportContainerDefinitionInput[];
export const SupportContainerDefinitionInputList = /*@__PURE__*/ S.Array(
  SupportContainerDefinitionInput,
);
export type ContainerOperatingSystem = "AMAZON_LINUX_2023" | (string & {});
export const ContainerOperatingSystem = S.String;

export interface CreateContainerGroupDefinitionInput {
  Name?: string;
  ContainerGroupType?: ContainerGroupType;
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  GameServerContainerDefinition?: GameServerContainerDefinitionInput;
  SupportContainerDefinitions?: SupportContainerDefinitionInput[];
  OperatingSystem?: ContainerOperatingSystem;
  VersionDescription?: string;
  Tags?: Tag[];
}
export const CreateContainerGroupDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ContainerGroupType: S.optional(ContainerGroupType),
    TotalMemoryLimitMebibytes: S.optional(S.Number),
    TotalVcpuLimit: S.optional(S.Number),
    GameServerContainerDefinition: S.optional(
      GameServerContainerDefinitionInput,
    ),
    SupportContainerDefinitions: S.optional(
      SupportContainerDefinitionInputList,
    ),
    OperatingSystem: S.optional(ContainerOperatingSystem),
    VersionDescription: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContainerGroupDefinitionInput",
}) as any as S.Schema<CreateContainerGroupDefinitionInput>;
export type Sha256 = string;
export interface GameServerContainerDefinition {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  ImageUri?: string;
  PortConfiguration?: ContainerPortConfiguration;
  ResolvedImageDigest?: string;
  ServerSdkVersion?: string;
  LinuxCapabilities?: LinuxCapabilities;
}
export const GameServerContainerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    DependsOn: S.optional(ContainerDependencyList),
    MountPoints: S.optional(ContainerMountPointList),
    EnvironmentOverride: S.optional(ContainerEnvironmentList),
    ImageUri: S.optional(S.String),
    PortConfiguration: S.optional(ContainerPortConfiguration),
    ResolvedImageDigest: S.optional(S.String),
    ServerSdkVersion: S.optional(S.String),
    LinuxCapabilities: S.optional(LinuxCapabilities),
  }),
).annotate({
  identifier: "GameServerContainerDefinition",
}) as any as S.Schema<GameServerContainerDefinition>;
export interface SupportContainerDefinition {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  Essential?: boolean;
  HealthCheck?: ContainerHealthCheck;
  ImageUri?: string;
  MemoryHardLimitMebibytes?: number;
  PortConfiguration?: ContainerPortConfiguration;
  ResolvedImageDigest?: string;
  Vcpu?: number;
  LinuxCapabilities?: LinuxCapabilities;
}
export const SupportContainerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    DependsOn: S.optional(ContainerDependencyList),
    MountPoints: S.optional(ContainerMountPointList),
    EnvironmentOverride: S.optional(ContainerEnvironmentList),
    Essential: S.optional(S.Boolean),
    HealthCheck: S.optional(ContainerHealthCheck),
    ImageUri: S.optional(S.String),
    MemoryHardLimitMebibytes: S.optional(S.Number),
    PortConfiguration: S.optional(ContainerPortConfiguration),
    ResolvedImageDigest: S.optional(S.String),
    Vcpu: S.optional(S.Number),
    LinuxCapabilities: S.optional(LinuxCapabilities),
  }),
).annotate({
  identifier: "SupportContainerDefinition",
}) as any as S.Schema<SupportContainerDefinition>;
export type SupportContainerDefinitionList = SupportContainerDefinition[];
export const SupportContainerDefinitionList = /*@__PURE__*/ S.Array(
  SupportContainerDefinition,
);
export type PositiveInteger = number;
export type ContainerGroupDefinitionStatus =
  | "READY"
  | "COPYING"
  | "FAILED"
  | (string & {});
export const ContainerGroupDefinitionStatus = S.String;

export interface ContainerGroupDefinition {
  ContainerGroupDefinitionArn?: string;
  CreationTime?: Date;
  OperatingSystem?: ContainerOperatingSystem;
  Name?: string;
  ContainerGroupType?: ContainerGroupType;
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  GameServerContainerDefinition?: GameServerContainerDefinition;
  SupportContainerDefinitions?: SupportContainerDefinition[];
  VersionNumber?: number;
  VersionDescription?: string;
  Status?: ContainerGroupDefinitionStatus;
  StatusReason?: string;
}
export const ContainerGroupDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerGroupDefinitionArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OperatingSystem: S.optional(ContainerOperatingSystem),
    Name: S.optional(S.String),
    ContainerGroupType: S.optional(ContainerGroupType),
    TotalMemoryLimitMebibytes: S.optional(S.Number),
    TotalVcpuLimit: S.optional(S.Number),
    GameServerContainerDefinition: S.optional(GameServerContainerDefinition),
    SupportContainerDefinitions: S.optional(SupportContainerDefinitionList),
    VersionNumber: S.optional(S.Number),
    VersionDescription: S.optional(S.String),
    Status: S.optional(ContainerGroupDefinitionStatus),
    StatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerGroupDefinition",
}) as any as S.Schema<ContainerGroupDefinition>;
export interface CreateContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export const CreateContainerGroupDefinitionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContainerGroupDefinition: S.optional(ContainerGroupDefinition),
    }).pipe(ns),
).annotate({
  identifier: "CreateContainerGroupDefinitionOutput",
}) as any as S.Schema<CreateContainerGroupDefinitionOutput>;
export type BuildIdOrArn = string;
export type ScriptIdOrArn = string;
export type LaunchPathStringModel = string;
export type LaunchParametersStringModel = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type EC2InstanceType =
  | "t2.micro"
  | "t2.small"
  | "t2.medium"
  | "t2.large"
  | "c3.large"
  | "c3.xlarge"
  | "c3.2xlarge"
  | "c3.4xlarge"
  | "c3.8xlarge"
  | "c4.large"
  | "c4.xlarge"
  | "c4.2xlarge"
  | "c4.4xlarge"
  | "c4.8xlarge"
  | "c5.large"
  | "c5.xlarge"
  | "c5.2xlarge"
  | "c5.4xlarge"
  | "c5.9xlarge"
  | "c5.12xlarge"
  | "c5.18xlarge"
  | "c5.24xlarge"
  | "c5a.large"
  | "c5a.xlarge"
  | "c5a.2xlarge"
  | "c5a.4xlarge"
  | "c5a.8xlarge"
  | "c5a.12xlarge"
  | "c5a.16xlarge"
  | "c5a.24xlarge"
  | "r3.large"
  | "r3.xlarge"
  | "r3.2xlarge"
  | "r3.4xlarge"
  | "r3.8xlarge"
  | "r4.large"
  | "r4.xlarge"
  | "r4.2xlarge"
  | "r4.4xlarge"
  | "r4.8xlarge"
  | "r4.16xlarge"
  | "r5.large"
  | "r5.xlarge"
  | "r5.2xlarge"
  | "r5.4xlarge"
  | "r5.8xlarge"
  | "r5.12xlarge"
  | "r5.16xlarge"
  | "r5.24xlarge"
  | "r5a.large"
  | "r5a.xlarge"
  | "r5a.2xlarge"
  | "r5a.4xlarge"
  | "r5a.8xlarge"
  | "r5a.12xlarge"
  | "r5a.16xlarge"
  | "r5a.24xlarge"
  | "m3.medium"
  | "m3.large"
  | "m3.xlarge"
  | "m3.2xlarge"
  | "m4.large"
  | "m4.xlarge"
  | "m4.2xlarge"
  | "m4.4xlarge"
  | "m4.10xlarge"
  | "m5.large"
  | "m5.xlarge"
  | "m5.2xlarge"
  | "m5.4xlarge"
  | "m5.8xlarge"
  | "m5.12xlarge"
  | "m5.16xlarge"
  | "m5.24xlarge"
  | "m5a.large"
  | "m5a.xlarge"
  | "m5a.2xlarge"
  | "m5a.4xlarge"
  | "m5a.8xlarge"
  | "m5a.12xlarge"
  | "m5a.16xlarge"
  | "m5a.24xlarge"
  | "c5d.large"
  | "c5d.xlarge"
  | "c5d.2xlarge"
  | "c5d.4xlarge"
  | "c5d.9xlarge"
  | "c5d.12xlarge"
  | "c5d.18xlarge"
  | "c5d.24xlarge"
  | "c6a.large"
  | "c6a.xlarge"
  | "c6a.2xlarge"
  | "c6a.4xlarge"
  | "c6a.8xlarge"
  | "c6a.12xlarge"
  | "c6a.16xlarge"
  | "c6a.24xlarge"
  | "c6i.large"
  | "c6i.xlarge"
  | "c6i.2xlarge"
  | "c6i.4xlarge"
  | "c6i.8xlarge"
  | "c6i.12xlarge"
  | "c6i.16xlarge"
  | "c6i.24xlarge"
  | "r5d.large"
  | "r5d.xlarge"
  | "r5d.2xlarge"
  | "r5d.4xlarge"
  | "r5d.8xlarge"
  | "r5d.12xlarge"
  | "r5d.16xlarge"
  | "r5d.24xlarge"
  | "m6g.medium"
  | "m6g.large"
  | "m6g.xlarge"
  | "m6g.2xlarge"
  | "m6g.4xlarge"
  | "m6g.8xlarge"
  | "m6g.12xlarge"
  | "m6g.16xlarge"
  | "c6g.medium"
  | "c6g.large"
  | "c6g.xlarge"
  | "c6g.2xlarge"
  | "c6g.4xlarge"
  | "c6g.8xlarge"
  | "c6g.12xlarge"
  | "c6g.16xlarge"
  | "r6g.medium"
  | "r6g.large"
  | "r6g.xlarge"
  | "r6g.2xlarge"
  | "r6g.4xlarge"
  | "r6g.8xlarge"
  | "r6g.12xlarge"
  | "r6g.16xlarge"
  | "c6gn.medium"
  | "c6gn.large"
  | "c6gn.xlarge"
  | "c6gn.2xlarge"
  | "c6gn.4xlarge"
  | "c6gn.8xlarge"
  | "c6gn.12xlarge"
  | "c6gn.16xlarge"
  | "c7g.medium"
  | "c7g.large"
  | "c7g.xlarge"
  | "c7g.2xlarge"
  | "c7g.4xlarge"
  | "c7g.8xlarge"
  | "c7g.12xlarge"
  | "c7g.16xlarge"
  | "r7g.medium"
  | "r7g.large"
  | "r7g.xlarge"
  | "r7g.2xlarge"
  | "r7g.4xlarge"
  | "r7g.8xlarge"
  | "r7g.12xlarge"
  | "r7g.16xlarge"
  | "m7g.medium"
  | "m7g.large"
  | "m7g.xlarge"
  | "m7g.2xlarge"
  | "m7g.4xlarge"
  | "m7g.8xlarge"
  | "m7g.12xlarge"
  | "m7g.16xlarge"
  | "g5g.xlarge"
  | "g5g.2xlarge"
  | "g5g.4xlarge"
  | "g5g.8xlarge"
  | "g5g.16xlarge"
  | "r6i.large"
  | "r6i.xlarge"
  | "r6i.2xlarge"
  | "r6i.4xlarge"
  | "r6i.8xlarge"
  | "r6i.12xlarge"
  | "r6i.16xlarge"
  | "c6gd.medium"
  | "c6gd.large"
  | "c6gd.xlarge"
  | "c6gd.2xlarge"
  | "c6gd.4xlarge"
  | "c6gd.8xlarge"
  | "c6gd.12xlarge"
  | "c6gd.16xlarge"
  | "c6in.large"
  | "c6in.xlarge"
  | "c6in.2xlarge"
  | "c6in.4xlarge"
  | "c6in.8xlarge"
  | "c6in.12xlarge"
  | "c6in.16xlarge"
  | "c7a.medium"
  | "c7a.large"
  | "c7a.xlarge"
  | "c7a.2xlarge"
  | "c7a.4xlarge"
  | "c7a.8xlarge"
  | "c7a.12xlarge"
  | "c7a.16xlarge"
  | "c7gd.medium"
  | "c7gd.large"
  | "c7gd.xlarge"
  | "c7gd.2xlarge"
  | "c7gd.4xlarge"
  | "c7gd.8xlarge"
  | "c7gd.12xlarge"
  | "c7gd.16xlarge"
  | "c7gn.medium"
  | "c7gn.large"
  | "c7gn.xlarge"
  | "c7gn.2xlarge"
  | "c7gn.4xlarge"
  | "c7gn.8xlarge"
  | "c7gn.12xlarge"
  | "c7gn.16xlarge"
  | "c7i.large"
  | "c7i.xlarge"
  | "c7i.2xlarge"
  | "c7i.4xlarge"
  | "c7i.8xlarge"
  | "c7i.12xlarge"
  | "c7i.16xlarge"
  | "m6a.large"
  | "m6a.xlarge"
  | "m6a.2xlarge"
  | "m6a.4xlarge"
  | "m6a.8xlarge"
  | "m6a.12xlarge"
  | "m6a.16xlarge"
  | "m6gd.medium"
  | "m6gd.large"
  | "m6gd.xlarge"
  | "m6gd.2xlarge"
  | "m6gd.4xlarge"
  | "m6gd.8xlarge"
  | "m6gd.12xlarge"
  | "m6gd.16xlarge"
  | "m6i.large"
  | "m6i.xlarge"
  | "m6i.2xlarge"
  | "m6i.4xlarge"
  | "m6i.8xlarge"
  | "m6i.12xlarge"
  | "m6i.16xlarge"
  | "m7a.medium"
  | "m7a.large"
  | "m7a.xlarge"
  | "m7a.2xlarge"
  | "m7a.4xlarge"
  | "m7a.8xlarge"
  | "m7a.12xlarge"
  | "m7a.16xlarge"
  | "m7gd.medium"
  | "m7gd.large"
  | "m7gd.xlarge"
  | "m7gd.2xlarge"
  | "m7gd.4xlarge"
  | "m7gd.8xlarge"
  | "m7gd.12xlarge"
  | "m7gd.16xlarge"
  | "m7i.large"
  | "m7i.xlarge"
  | "m7i.2xlarge"
  | "m7i.4xlarge"
  | "m7i.8xlarge"
  | "m7i.12xlarge"
  | "m7i.16xlarge"
  | "r6gd.medium"
  | "r6gd.large"
  | "r6gd.xlarge"
  | "r6gd.2xlarge"
  | "r6gd.4xlarge"
  | "r6gd.8xlarge"
  | "r6gd.12xlarge"
  | "r6gd.16xlarge"
  | "r7a.medium"
  | "r7a.large"
  | "r7a.xlarge"
  | "r7a.2xlarge"
  | "r7a.4xlarge"
  | "r7a.8xlarge"
  | "r7a.12xlarge"
  | "r7a.16xlarge"
  | "r7gd.medium"
  | "r7gd.large"
  | "r7gd.xlarge"
  | "r7gd.2xlarge"
  | "r7gd.4xlarge"
  | "r7gd.8xlarge"
  | "r7gd.12xlarge"
  | "r7gd.16xlarge"
  | "r7i.large"
  | "r7i.xlarge"
  | "r7i.2xlarge"
  | "r7i.4xlarge"
  | "r7i.8xlarge"
  | "r7i.12xlarge"
  | "r7i.16xlarge"
  | "r7i.24xlarge"
  | "r7i.48xlarge"
  | "c5ad.large"
  | "c5ad.xlarge"
  | "c5ad.2xlarge"
  | "c5ad.4xlarge"
  | "c5ad.8xlarge"
  | "c5ad.12xlarge"
  | "c5ad.16xlarge"
  | "c5ad.24xlarge"
  | "c5n.large"
  | "c5n.xlarge"
  | "c5n.2xlarge"
  | "c5n.4xlarge"
  | "c5n.9xlarge"
  | "c5n.18xlarge"
  | "r5ad.large"
  | "r5ad.xlarge"
  | "r5ad.2xlarge"
  | "r5ad.4xlarge"
  | "r5ad.8xlarge"
  | "r5ad.12xlarge"
  | "r5ad.16xlarge"
  | "r5ad.24xlarge"
  | "c6id.large"
  | "c6id.xlarge"
  | "c6id.2xlarge"
  | "c6id.4xlarge"
  | "c6id.8xlarge"
  | "c6id.12xlarge"
  | "c6id.16xlarge"
  | "c6id.24xlarge"
  | "c6id.32xlarge"
  | "c8g.medium"
  | "c8g.large"
  | "c8g.xlarge"
  | "c8g.2xlarge"
  | "c8g.4xlarge"
  | "c8g.8xlarge"
  | "c8g.12xlarge"
  | "c8g.16xlarge"
  | "c8g.24xlarge"
  | "c8g.48xlarge"
  | "m5ad.large"
  | "m5ad.xlarge"
  | "m5ad.2xlarge"
  | "m5ad.4xlarge"
  | "m5ad.8xlarge"
  | "m5ad.12xlarge"
  | "m5ad.16xlarge"
  | "m5ad.24xlarge"
  | "m5d.large"
  | "m5d.xlarge"
  | "m5d.2xlarge"
  | "m5d.4xlarge"
  | "m5d.8xlarge"
  | "m5d.12xlarge"
  | "m5d.16xlarge"
  | "m5d.24xlarge"
  | "m5dn.large"
  | "m5dn.xlarge"
  | "m5dn.2xlarge"
  | "m5dn.4xlarge"
  | "m5dn.8xlarge"
  | "m5dn.12xlarge"
  | "m5dn.16xlarge"
  | "m5dn.24xlarge"
  | "m5n.large"
  | "m5n.xlarge"
  | "m5n.2xlarge"
  | "m5n.4xlarge"
  | "m5n.8xlarge"
  | "m5n.12xlarge"
  | "m5n.16xlarge"
  | "m5n.24xlarge"
  | "m6id.large"
  | "m6id.xlarge"
  | "m6id.2xlarge"
  | "m6id.4xlarge"
  | "m6id.8xlarge"
  | "m6id.12xlarge"
  | "m6id.16xlarge"
  | "m6id.24xlarge"
  | "m6id.32xlarge"
  | "m6idn.large"
  | "m6idn.xlarge"
  | "m6idn.2xlarge"
  | "m6idn.4xlarge"
  | "m6idn.8xlarge"
  | "m6idn.12xlarge"
  | "m6idn.16xlarge"
  | "m6idn.24xlarge"
  | "m6idn.32xlarge"
  | "m6in.large"
  | "m6in.xlarge"
  | "m6in.2xlarge"
  | "m6in.4xlarge"
  | "m6in.8xlarge"
  | "m6in.12xlarge"
  | "m6in.16xlarge"
  | "m6in.24xlarge"
  | "m6in.32xlarge"
  | "m8g.medium"
  | "m8g.large"
  | "m8g.xlarge"
  | "m8g.2xlarge"
  | "m8g.4xlarge"
  | "m8g.8xlarge"
  | "m8g.12xlarge"
  | "m8g.16xlarge"
  | "m8g.24xlarge"
  | "m8g.48xlarge"
  | "r5dn.large"
  | "r5dn.xlarge"
  | "r5dn.2xlarge"
  | "r5dn.4xlarge"
  | "r5dn.8xlarge"
  | "r5dn.12xlarge"
  | "r5dn.16xlarge"
  | "r5dn.24xlarge"
  | "r5n.large"
  | "r5n.xlarge"
  | "r5n.2xlarge"
  | "r5n.4xlarge"
  | "r5n.8xlarge"
  | "r5n.12xlarge"
  | "r5n.16xlarge"
  | "r5n.24xlarge"
  | "r6a.large"
  | "r6a.xlarge"
  | "r6a.2xlarge"
  | "r6a.4xlarge"
  | "r6a.8xlarge"
  | "r6a.12xlarge"
  | "r6a.16xlarge"
  | "r6a.24xlarge"
  | "r6a.32xlarge"
  | "r6a.48xlarge"
  | "r6id.large"
  | "r6id.xlarge"
  | "r6id.2xlarge"
  | "r6id.4xlarge"
  | "r6id.8xlarge"
  | "r6id.12xlarge"
  | "r6id.16xlarge"
  | "r6id.24xlarge"
  | "r6id.32xlarge"
  | "r6idn.large"
  | "r6idn.xlarge"
  | "r6idn.2xlarge"
  | "r6idn.4xlarge"
  | "r6idn.8xlarge"
  | "r6idn.12xlarge"
  | "r6idn.16xlarge"
  | "r6idn.24xlarge"
  | "r6idn.32xlarge"
  | "r6in.large"
  | "r6in.xlarge"
  | "r6in.2xlarge"
  | "r6in.4xlarge"
  | "r6in.8xlarge"
  | "r6in.12xlarge"
  | "r6in.16xlarge"
  | "r6in.24xlarge"
  | "r6in.32xlarge"
  | "r8g.medium"
  | "r8g.large"
  | "r8g.xlarge"
  | "r8g.2xlarge"
  | "r8g.4xlarge"
  | "r8g.8xlarge"
  | "r8g.12xlarge"
  | "r8g.16xlarge"
  | "r8g.24xlarge"
  | "r8g.48xlarge"
  | "m4.16xlarge"
  | "c6a.32xlarge"
  | "c6a.48xlarge"
  | "c6i.32xlarge"
  | "r6i.24xlarge"
  | "r6i.32xlarge"
  | "c6in.24xlarge"
  | "c6in.32xlarge"
  | "c7a.24xlarge"
  | "c7a.32xlarge"
  | "c7a.48xlarge"
  | "c7i.24xlarge"
  | "c7i.48xlarge"
  | "m6a.24xlarge"
  | "m6a.32xlarge"
  | "m6a.48xlarge"
  | "m6i.24xlarge"
  | "m6i.32xlarge"
  | "m7a.24xlarge"
  | "m7a.32xlarge"
  | "m7a.48xlarge"
  | "m7i.24xlarge"
  | "m7i.48xlarge"
  | "r7a.24xlarge"
  | "r7a.32xlarge"
  | "r7a.48xlarge"
  | "c8a.medium"
  | "c8a.large"
  | "c8a.xlarge"
  | "c8a.2xlarge"
  | "c8i.large"
  | "c8i.xlarge"
  | "c8i.2xlarge"
  | "c9g.medium"
  | "c9g.large"
  | "c9g.xlarge"
  | "c9g.2xlarge"
  | "m8a.medium"
  | "m8a.large"
  | "m8a.xlarge"
  | "m8a.2xlarge"
  | "m8i.large"
  | "m8i.xlarge"
  | "m8i.2xlarge"
  | "m9g.large"
  | "m9g.xlarge"
  | "m9g.2xlarge"
  | (string & {});
export const EC2InstanceType = S.String;

export interface ServerProcess {
  LaunchPath?: string;
  Parameters?: string;
  ConcurrentExecutions?: number;
}
export const ServerProcess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LaunchPath: S.optional(S.String),
    Parameters: S.optional(S.String),
    ConcurrentExecutions: S.optional(S.Number),
  }),
).annotate({ identifier: "ServerProcess" }) as any as S.Schema<ServerProcess>;
export type ServerProcessList = ServerProcess[];
export const ServerProcessList = /*@__PURE__*/ S.Array(ServerProcess);
export type MaxConcurrentGameSessionActivations = number;
export type GameSessionActivationTimeoutSeconds = number;
export interface RuntimeConfiguration {
  ServerProcesses?: ServerProcess[];
  MaxConcurrentGameSessionActivations?: number;
  GameSessionActivationTimeoutSeconds?: number;
}
export const RuntimeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerProcesses: S.optional(ServerProcessList),
    MaxConcurrentGameSessionActivations: S.optional(S.Number),
    GameSessionActivationTimeoutSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "RuntimeConfiguration",
}) as any as S.Schema<RuntimeConfiguration>;
export interface ResourceCreationLimitPolicy {
  NewGameSessionsPerCreator?: number;
  PolicyPeriodInMinutes?: number;
}
export const ResourceCreationLimitPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NewGameSessionsPerCreator: S.optional(S.Number),
    PolicyPeriodInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceCreationLimitPolicy",
}) as any as S.Schema<ResourceCreationLimitPolicy>;
export type FleetType = "ON_DEMAND" | "SPOT" | (string & {});
export const FleetType = S.String;

export type CertificateType = "DISABLED" | "GENERATED" | (string & {});
export const CertificateType = S.String;

export interface CertificateConfiguration {
  CertificateType?: CertificateType;
}
export const CertificateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateType: S.optional(CertificateType) }),
).annotate({
  identifier: "CertificateConfiguration",
}) as any as S.Schema<CertificateConfiguration>;
export type ComputeType = "EC2" | "ANYWHERE" | (string & {});
export const ComputeType = S.String;

export type NonNegativeLimitedLengthDouble = string;
export interface AnywhereConfiguration {
  Cost?: string;
}
export const AnywhereConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cost: S.optional(S.String) }),
).annotate({
  identifier: "AnywhereConfiguration",
}) as any as S.Schema<AnywhereConfiguration>;
export type InstanceRoleCredentialsProvider =
  | "SHARED_CREDENTIAL_FILE"
  | (string & {});
export const InstanceRoleCredentialsProvider = S.String;

export type GameServerIpProtocolSupported =
  | "IPv4"
  | "DUAL_STACK"
  | (string & {});
export const GameServerIpProtocolSupported = S.String;

export interface PlayerGatewayConfiguration {
  GameServerIpProtocolSupported?: GameServerIpProtocolSupported;
}
export const PlayerGatewayConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerIpProtocolSupported: S.optional(GameServerIpProtocolSupported),
  }),
).annotate({
  identifier: "PlayerGatewayConfiguration",
}) as any as S.Schema<PlayerGatewayConfiguration>;
export interface CreateFleetInput {
  Name?: string;
  Description?: string;
  BuildId?: string;
  ScriptId?: string;
  ServerLaunchPath?: string;
  ServerLaunchParameters?: string;
  LogPaths?: string[];
  EC2InstanceType?: EC2InstanceType;
  EC2InboundPermissions?: IpPermission[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  RuntimeConfiguration?: RuntimeConfiguration;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
  FleetType?: FleetType;
  InstanceRoleArn?: string;
  CertificateConfiguration?: CertificateConfiguration;
  Locations?: LocationConfiguration[];
  Tags?: Tag[];
  ComputeType?: ComputeType;
  AnywhereConfiguration?: AnywhereConfiguration;
  InstanceRoleCredentialsProvider?: InstanceRoleCredentialsProvider;
  PlayerGatewayMode?: PlayerGatewayMode;
  PlayerGatewayConfiguration?: PlayerGatewayConfiguration;
}
export const CreateFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    BuildId: S.optional(S.String),
    ScriptId: S.optional(S.String),
    ServerLaunchPath: S.optional(S.String),
    ServerLaunchParameters: S.optional(S.String),
    LogPaths: S.optional(StringList),
    EC2InstanceType: S.optional(EC2InstanceType),
    EC2InboundPermissions: S.optional(IpPermissionsList),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    RuntimeConfiguration: S.optional(RuntimeConfiguration),
    ResourceCreationLimitPolicy: S.optional(ResourceCreationLimitPolicy),
    MetricGroups: S.optional(MetricGroupList),
    PeerVpcAwsAccountId: S.optional(S.String),
    PeerVpcId: S.optional(S.String),
    FleetType: S.optional(FleetType),
    InstanceRoleArn: S.optional(S.String),
    CertificateConfiguration: S.optional(CertificateConfiguration),
    Locations: S.optional(LocationConfigurationList),
    Tags: S.optional(TagList),
    ComputeType: S.optional(ComputeType),
    AnywhereConfiguration: S.optional(AnywhereConfiguration),
    InstanceRoleCredentialsProvider: S.optional(
      InstanceRoleCredentialsProvider,
    ),
    PlayerGatewayMode: S.optional(PlayerGatewayMode),
    PlayerGatewayConfiguration: S.optional(PlayerGatewayConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetInput",
}) as any as S.Schema<CreateFleetInput>;
export type FleetStatus =
  | "NEW"
  | "DOWNLOADING"
  | "VALIDATING"
  | "BUILDING"
  | "ACTIVATING"
  | "ACTIVE"
  | "DELETING"
  | "ERROR"
  | "TERMINATED"
  | "NOT_FOUND"
  | "EXPIRED"
  | (string & {});
export const FleetStatus = S.String;

export type ScriptId = string;
export type ScriptArn = string;
export type FleetAction = "AUTO_SCALING" | (string & {});
export const FleetAction = S.String;

export type FleetActionList = FleetAction[];
export const FleetActionList = /*@__PURE__*/ S.Array(FleetAction);
export interface FleetAttributes {
  FleetId?: string;
  FleetArn?: string;
  FleetType?: FleetType;
  InstanceType?: EC2InstanceType;
  Description?: string;
  Name?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  Status?: FleetStatus;
  BuildId?: string;
  BuildArn?: string;
  ScriptId?: string;
  ScriptArn?: string;
  ServerLaunchPath?: string;
  ServerLaunchParameters?: string;
  LogPaths?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  OperatingSystem?: OperatingSystem;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  StoppedActions?: FleetAction[];
  InstanceRoleArn?: string;
  CertificateConfiguration?: CertificateConfiguration;
  ComputeType?: ComputeType;
  AnywhereConfiguration?: AnywhereConfiguration;
  InstanceRoleCredentialsProvider?: InstanceRoleCredentialsProvider;
  PlayerGatewayMode?: PlayerGatewayMode;
  PlayerGatewayConfiguration?: PlayerGatewayConfiguration;
}
export const FleetAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    FleetType: S.optional(FleetType),
    InstanceType: S.optional(EC2InstanceType),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TerminationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(FleetStatus),
    BuildId: S.optional(S.String),
    BuildArn: S.optional(S.String),
    ScriptId: S.optional(S.String),
    ScriptArn: S.optional(S.String),
    ServerLaunchPath: S.optional(S.String),
    ServerLaunchParameters: S.optional(S.String),
    LogPaths: S.optional(StringList),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    OperatingSystem: S.optional(OperatingSystem),
    ResourceCreationLimitPolicy: S.optional(ResourceCreationLimitPolicy),
    MetricGroups: S.optional(MetricGroupList),
    StoppedActions: S.optional(FleetActionList),
    InstanceRoleArn: S.optional(S.String),
    CertificateConfiguration: S.optional(CertificateConfiguration),
    ComputeType: S.optional(ComputeType),
    AnywhereConfiguration: S.optional(AnywhereConfiguration),
    InstanceRoleCredentialsProvider: S.optional(
      InstanceRoleCredentialsProvider,
    ),
    PlayerGatewayMode: S.optional(PlayerGatewayMode),
    PlayerGatewayConfiguration: S.optional(PlayerGatewayConfiguration),
  }),
).annotate({
  identifier: "FleetAttributes",
}) as any as S.Schema<FleetAttributes>;
export interface LocationState {
  Location?: string;
  Status?: FleetStatus;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export const LocationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    Status: S.optional(FleetStatus),
    PlayerGatewayStatus: S.optional(PlayerGatewayStatus),
  }),
).annotate({ identifier: "LocationState" }) as any as S.Schema<LocationState>;
export type LocationStateList = LocationState[];
export const LocationStateList = /*@__PURE__*/ S.Array(LocationState);
export interface CreateFleetOutput {
  FleetAttributes?: FleetAttributes & {
    CertificateConfiguration: CertificateConfiguration & {
      CertificateType: CertificateType;
    };
    AnywhereConfiguration: AnywhereConfiguration & {
      Cost: NonNegativeLimitedLengthDouble;
    };
  };
  LocationStates?: LocationState[];
}
export const CreateFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetAttributes: S.optional(FleetAttributes),
    LocationStates: S.optional(LocationStateList),
  }).pipe(ns),
).annotate({
  identifier: "CreateFleetOutput",
}) as any as S.Schema<CreateFleetOutput>;
export type FleetIdOrArn = string;
export interface CreateFleetLocationsInput {
  FleetId?: string;
  Locations?: LocationConfiguration[];
}
export const CreateFleetLocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Locations: S.optional(LocationConfigurationList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetLocationsInput",
}) as any as S.Schema<CreateFleetLocationsInput>;
export interface CreateFleetLocationsOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationStates?: LocationState[];
}
export const CreateFleetLocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    LocationStates: S.optional(LocationStateList),
  }).pipe(ns),
).annotate({
  identifier: "CreateFleetLocationsOutput",
}) as any as S.Schema<CreateFleetLocationsOutput>;
export type LaunchTemplateId = string;
export type LaunchTemplateName = string;
export type LaunchTemplateVersion = string;
export interface LaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export const LaunchTemplateSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LaunchTemplateId: S.optional(S.String),
    LaunchTemplateName: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "LaunchTemplateSpecification",
}) as any as S.Schema<LaunchTemplateSpecification>;
export type GameServerGroupInstanceType =
  | "c4.large"
  | "c4.xlarge"
  | "c4.2xlarge"
  | "c4.4xlarge"
  | "c4.8xlarge"
  | "c5.large"
  | "c5.xlarge"
  | "c5.2xlarge"
  | "c5.4xlarge"
  | "c5.9xlarge"
  | "c5.12xlarge"
  | "c5.18xlarge"
  | "c5.24xlarge"
  | "c5a.large"
  | "c5a.xlarge"
  | "c5a.2xlarge"
  | "c5a.4xlarge"
  | "c5a.8xlarge"
  | "c5a.12xlarge"
  | "c5a.16xlarge"
  | "c5a.24xlarge"
  | "c6g.medium"
  | "c6g.large"
  | "c6g.xlarge"
  | "c6g.2xlarge"
  | "c6g.4xlarge"
  | "c6g.8xlarge"
  | "c6g.12xlarge"
  | "c6g.16xlarge"
  | "r4.large"
  | "r4.xlarge"
  | "r4.2xlarge"
  | "r4.4xlarge"
  | "r4.8xlarge"
  | "r4.16xlarge"
  | "r5.large"
  | "r5.xlarge"
  | "r5.2xlarge"
  | "r5.4xlarge"
  | "r5.8xlarge"
  | "r5.12xlarge"
  | "r5.16xlarge"
  | "r5.24xlarge"
  | "r5a.large"
  | "r5a.xlarge"
  | "r5a.2xlarge"
  | "r5a.4xlarge"
  | "r5a.8xlarge"
  | "r5a.12xlarge"
  | "r5a.16xlarge"
  | "r5a.24xlarge"
  | "r6g.medium"
  | "r6g.large"
  | "r6g.xlarge"
  | "r6g.2xlarge"
  | "r6g.4xlarge"
  | "r6g.8xlarge"
  | "r6g.12xlarge"
  | "r6g.16xlarge"
  | "m4.large"
  | "m4.xlarge"
  | "m4.2xlarge"
  | "m4.4xlarge"
  | "m4.10xlarge"
  | "m5.large"
  | "m5.xlarge"
  | "m5.2xlarge"
  | "m5.4xlarge"
  | "m5.8xlarge"
  | "m5.12xlarge"
  | "m5.16xlarge"
  | "m5.24xlarge"
  | "m5a.large"
  | "m5a.xlarge"
  | "m5a.2xlarge"
  | "m5a.4xlarge"
  | "m5a.8xlarge"
  | "m5a.12xlarge"
  | "m5a.16xlarge"
  | "m5a.24xlarge"
  | "m6g.medium"
  | "m6g.large"
  | "m6g.xlarge"
  | "m6g.2xlarge"
  | "m6g.4xlarge"
  | "m6g.8xlarge"
  | "m6g.12xlarge"
  | "m6g.16xlarge"
  | (string & {});
export const GameServerGroupInstanceType = S.String;

export type WeightedCapacity = string;
export interface InstanceDefinition {
  InstanceType?: GameServerGroupInstanceType;
  WeightedCapacity?: string;
}
export const InstanceDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(GameServerGroupInstanceType),
    WeightedCapacity: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceDefinition",
}) as any as S.Schema<InstanceDefinition>;
export type InstanceDefinitions = InstanceDefinition[];
export const InstanceDefinitions = /*@__PURE__*/ S.Array(InstanceDefinition);
export type NonNegativeDouble = number;
export interface TargetTrackingConfiguration {
  TargetValue?: number;
}
export const TargetTrackingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetValue: S.optional(S.Number) }),
).annotate({
  identifier: "TargetTrackingConfiguration",
}) as any as S.Schema<TargetTrackingConfiguration>;
export interface GameServerGroupAutoScalingPolicy {
  EstimatedInstanceWarmup?: number;
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
}
export const GameServerGroupAutoScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EstimatedInstanceWarmup: S.optional(S.Number),
    TargetTrackingConfiguration: S.optional(TargetTrackingConfiguration),
  }),
).annotate({
  identifier: "GameServerGroupAutoScalingPolicy",
}) as any as S.Schema<GameServerGroupAutoScalingPolicy>;
export type BalancingStrategy =
  | "SPOT_ONLY"
  | "SPOT_PREFERRED"
  | "ON_DEMAND_ONLY"
  | (string & {});
export const BalancingStrategy = S.String;

export type GameServerProtectionPolicy =
  | "NO_PROTECTION"
  | "FULL_PROTECTION"
  | (string & {});
export const GameServerProtectionPolicy = S.String;

export type VpcSubnet = string;
export type VpcSubnets = string[];
export const VpcSubnets = /*@__PURE__*/ S.Array(S.String);
export interface CreateGameServerGroupInput {
  GameServerGroupName?: string;
  RoleArn?: string;
  MinSize?: number;
  MaxSize?: number;
  LaunchTemplate?: LaunchTemplateSpecification;
  InstanceDefinitions?: InstanceDefinition[];
  AutoScalingPolicy?: GameServerGroupAutoScalingPolicy;
  BalancingStrategy?: BalancingStrategy;
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  VpcSubnets?: string[];
  Tags?: Tag[];
}
export const CreateGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    RoleArn: S.optional(S.String),
    MinSize: S.optional(S.Number),
    MaxSize: S.optional(S.Number),
    LaunchTemplate: S.optional(LaunchTemplateSpecification),
    InstanceDefinitions: S.optional(InstanceDefinitions),
    AutoScalingPolicy: S.optional(GameServerGroupAutoScalingPolicy),
    BalancingStrategy: S.optional(BalancingStrategy),
    GameServerProtectionPolicy: S.optional(GameServerProtectionPolicy),
    VpcSubnets: S.optional(VpcSubnets),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGameServerGroupInput",
}) as any as S.Schema<CreateGameServerGroupInput>;
export type AutoScalingGroupArn = string;
export type GameServerGroupStatus =
  | "NEW"
  | "ACTIVATING"
  | "ACTIVE"
  | "DELETE_SCHEDULED"
  | "DELETING"
  | "DELETED"
  | "ERROR"
  | (string & {});
export const GameServerGroupStatus = S.String;

export type GameServerGroupAction = "REPLACE_INSTANCE_TYPES" | (string & {});
export const GameServerGroupAction = S.String;

export type GameServerGroupActions = GameServerGroupAction[];
export const GameServerGroupActions = /*@__PURE__*/ S.Array(
  GameServerGroupAction,
);
export interface GameServerGroup {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  RoleArn?: string;
  InstanceDefinitions?: InstanceDefinition[];
  BalancingStrategy?: BalancingStrategy;
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  AutoScalingGroupArn?: string;
  Status?: GameServerGroupStatus;
  StatusReason?: string;
  SuspendedActions?: GameServerGroupAction[];
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export const GameServerGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerGroupArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    InstanceDefinitions: S.optional(InstanceDefinitions),
    BalancingStrategy: S.optional(BalancingStrategy),
    GameServerProtectionPolicy: S.optional(GameServerProtectionPolicy),
    AutoScalingGroupArn: S.optional(S.String),
    Status: S.optional(GameServerGroupStatus),
    StatusReason: S.optional(S.String),
    SuspendedActions: S.optional(GameServerGroupActions),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GameServerGroup",
}) as any as S.Schema<GameServerGroup>;
export interface CreateGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const CreateGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "CreateGameServerGroupOutput",
}) as any as S.Schema<CreateGameServerGroupOutput>;
export type AliasIdOrArn = string;
export type GamePropertyKey = string;
export type GamePropertyValue = string | redacted.Redacted<string>;
export interface GameProperty {
  Key?: string;
  Value?: string | redacted.Redacted<string>;
}
export const GameProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(SensitiveString) }),
).annotate({ identifier: "GameProperty" }) as any as S.Schema<GameProperty>;
export type GamePropertyList = GameProperty[];
export const GamePropertyList = /*@__PURE__*/ S.Array(GameProperty);
export type IdStringModel = string;
export type LargeGameSessionData = string | redacted.Redacted<string>;
export interface CreateGameSessionInput {
  FleetId?: string;
  AliasId?: string;
  MaximumPlayerSessionCount?: number;
  Name?: string;
  GameProperties?: GameProperty[];
  CreatorId?: string;
  GameSessionId?: string;
  IdempotencyToken?: string;
  GameSessionData?: string | redacted.Redacted<string>;
  Location?: string;
}
export const CreateGameSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    AliasId: S.optional(S.String),
    MaximumPlayerSessionCount: S.optional(S.Number),
    Name: S.optional(S.String),
    GameProperties: S.optional(GamePropertyList),
    CreatorId: S.optional(S.String),
    GameSessionId: S.optional(S.String),
    IdempotencyToken: S.optional(S.String),
    GameSessionData: S.optional(SensitiveString),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGameSessionInput",
}) as any as S.Schema<CreateGameSessionInput>;
export type GameSessionStatus =
  | "ACTIVE"
  | "ACTIVATING"
  | "TERMINATED"
  | "TERMINATING"
  | "ERROR"
  | (string & {});
export const GameSessionStatus = S.String;

export type GameSessionStatusReason =
  | "INTERRUPTED"
  | "TRIGGERED_ON_PROCESS_TERMINATE"
  | "FORCE_TERMINATED"
  | (string & {});
export const GameSessionStatusReason = S.String;

export type IpAddress = string | redacted.Redacted<string>;
export type DnsName = string;
export type PlayerSessionCreationPolicy =
  | "ACCEPT_ALL"
  | "DENY_ALL"
  | (string & {});
export const PlayerSessionCreationPolicy = S.String;

export type MatchmakerData = string | redacted.Redacted<string>;
export type ComputeName = string;
export interface GameSession {
  GameSessionId?: string;
  Name?: string;
  FleetId?: string;
  FleetArn?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  CurrentPlayerSessionCount?: number;
  MaximumPlayerSessionCount?: number;
  Status?: GameSessionStatus;
  StatusReason?: GameSessionStatusReason;
  GameProperties?: GameProperty[];
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlayerSessionCreationPolicy?: PlayerSessionCreationPolicy;
  CreatorId?: string;
  GameSessionData?: string | redacted.Redacted<string>;
  MatchmakerData?: string | redacted.Redacted<string>;
  Location?: string;
  ComputeName?: string;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export const GameSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    Name: S.optional(S.String),
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TerminationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CurrentPlayerSessionCount: S.optional(S.Number),
    MaximumPlayerSessionCount: S.optional(S.Number),
    Status: S.optional(GameSessionStatus),
    StatusReason: S.optional(GameSessionStatusReason),
    GameProperties: S.optional(GamePropertyList),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    Port: S.optional(S.Number),
    PlayerSessionCreationPolicy: S.optional(PlayerSessionCreationPolicy),
    CreatorId: S.optional(S.String),
    GameSessionData: S.optional(SensitiveString),
    MatchmakerData: S.optional(SensitiveString),
    Location: S.optional(S.String),
    ComputeName: S.optional(S.String),
    PlayerGatewayStatus: S.optional(PlayerGatewayStatus),
  }),
).annotate({ identifier: "GameSession" }) as any as S.Schema<GameSession>;
export interface CreateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  };
}
export const CreateGameSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSession: S.optional(GameSession) }).pipe(ns),
).annotate({
  identifier: "CreateGameSessionOutput",
}) as any as S.Schema<CreateGameSessionOutput>;
export type GameSessionQueueName = string;
export interface PlayerLatencyPolicy {
  MaximumIndividualPlayerLatencyMilliseconds?: number;
  PolicyDurationSeconds?: number;
}
export const PlayerLatencyPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumIndividualPlayerLatencyMilliseconds: S.optional(S.Number),
    PolicyDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlayerLatencyPolicy",
}) as any as S.Schema<PlayerLatencyPolicy>;
export type PlayerLatencyPolicyList = PlayerLatencyPolicy[];
export const PlayerLatencyPolicyList =
  /*@__PURE__*/ S.Array(PlayerLatencyPolicy);
export type ArnStringModel = string;
export interface GameSessionQueueDestination {
  DestinationArn?: string;
}
export const GameSessionQueueDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationArn: S.optional(S.String) }),
).annotate({
  identifier: "GameSessionQueueDestination",
}) as any as S.Schema<GameSessionQueueDestination>;
export type GameSessionQueueDestinationList = GameSessionQueueDestination[];
export const GameSessionQueueDestinationList = /*@__PURE__*/ S.Array(
  GameSessionQueueDestination,
);
export type LocationList = string[];
export const LocationList = /*@__PURE__*/ S.Array(S.String);
export interface FilterConfiguration {
  AllowedLocations?: string[];
}
export const FilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllowedLocations: S.optional(LocationList) }),
).annotate({
  identifier: "FilterConfiguration",
}) as any as S.Schema<FilterConfiguration>;
export type PriorityType =
  | "LATENCY"
  | "COST"
  | "DESTINATION"
  | "LOCATION"
  | (string & {});
export const PriorityType = S.String;

export type PriorityTypeList = PriorityType[];
export const PriorityTypeList = /*@__PURE__*/ S.Array(PriorityType);
export interface PriorityConfiguration {
  PriorityOrder?: PriorityType[];
  LocationOrder?: string[];
}
export const PriorityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PriorityOrder: S.optional(PriorityTypeList),
    LocationOrder: S.optional(LocationList),
  }),
).annotate({
  identifier: "PriorityConfiguration",
}) as any as S.Schema<PriorityConfiguration>;
export type QueueCustomEventData = string | redacted.Redacted<string>;
export type QueueSnsArnStringModel = string;
export interface CreateGameSessionQueueInput {
  Name?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
  Tags?: Tag[];
}
export const CreateGameSessionQueueInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    TimeoutInSeconds: S.optional(S.Number),
    PlayerLatencyPolicies: S.optional(PlayerLatencyPolicyList),
    Destinations: S.optional(GameSessionQueueDestinationList),
    FilterConfiguration: S.optional(FilterConfiguration),
    PriorityConfiguration: S.optional(PriorityConfiguration),
    CustomEventData: S.optional(SensitiveString),
    NotificationTarget: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGameSessionQueueInput",
}) as any as S.Schema<CreateGameSessionQueueInput>;
export type GameSessionQueueArn = string;
export interface GameSessionQueue {
  Name?: string;
  GameSessionQueueArn?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
}
export const GameSessionQueue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    GameSessionQueueArn: S.optional(S.String),
    TimeoutInSeconds: S.optional(S.Number),
    PlayerLatencyPolicies: S.optional(PlayerLatencyPolicyList),
    Destinations: S.optional(GameSessionQueueDestinationList),
    FilterConfiguration: S.optional(FilterConfiguration),
    PriorityConfiguration: S.optional(PriorityConfiguration),
    CustomEventData: S.optional(SensitiveString),
    NotificationTarget: S.optional(S.String),
  }),
).annotate({
  identifier: "GameSessionQueue",
}) as any as S.Schema<GameSessionQueue>;
export interface CreateGameSessionQueueOutput {
  GameSessionQueue?: GameSessionQueue;
}
export const CreateGameSessionQueueOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionQueue: S.optional(GameSessionQueue) }).pipe(ns),
).annotate({
  identifier: "CreateGameSessionQueueOutput",
}) as any as S.Schema<CreateGameSessionQueueOutput>;
export type CustomInputLocationStringModel = string;
export interface CreateLocationInput {
  LocationName?: string;
  Tags?: Tag[];
}
export const CreateLocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationName: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLocationInput",
}) as any as S.Schema<CreateLocationInput>;
export type LocationArnModel = string;
export interface UDPEndpoint {
  Domain?: string;
  Port?: number;
}
export const UDPEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({ identifier: "UDPEndpoint" }) as any as S.Schema<UDPEndpoint>;
export interface PingBeacon {
  UDPEndpoint?: UDPEndpoint;
}
export const PingBeacon = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UDPEndpoint: S.optional(UDPEndpoint) }),
).annotate({ identifier: "PingBeacon" }) as any as S.Schema<PingBeacon>;
export interface LocationModel {
  LocationName?: string;
  LocationArn?: string;
  PingBeacon?: PingBeacon;
}
export const LocationModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationName: S.optional(S.String),
    LocationArn: S.optional(S.String),
    PingBeacon: S.optional(PingBeacon),
  }),
).annotate({ identifier: "LocationModel" }) as any as S.Schema<LocationModel>;
export interface CreateLocationOutput {
  Location?: LocationModel;
}
export const CreateLocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Location: S.optional(LocationModel) }).pipe(ns),
).annotate({
  identifier: "CreateLocationOutput",
}) as any as S.Schema<CreateLocationOutput>;
export type QueueArnsList = string[];
export const QueueArnsList = /*@__PURE__*/ S.Array(S.String);
export type MatchmakingRequestTimeoutInteger = number;
export type MatchmakingAcceptanceTimeoutInteger = number;
export type MatchmakingRuleSetName = string;
export type SnsArnStringModel = string;
export type CustomEventData = string | redacted.Redacted<string>;
export type GameSessionData = string | redacted.Redacted<string>;
export type BackfillMode = "AUTOMATIC" | "MANUAL" | (string & {});
export const BackfillMode = S.String;

export type FlexMatchMode = "STANDALONE" | "WITH_QUEUE" | (string & {});
export const FlexMatchMode = S.String;

export interface CreateMatchmakingConfigurationInput {
  Name?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
  Tags?: Tag[];
}
export const CreateMatchmakingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    GameSessionQueueArns: S.optional(QueueArnsList),
    RequestTimeoutSeconds: S.optional(S.Number),
    AcceptanceTimeoutSeconds: S.optional(S.Number),
    AcceptanceRequired: S.optional(S.Boolean),
    RuleSetName: S.optional(S.String),
    NotificationTarget: S.optional(S.String),
    AdditionalPlayerCount: S.optional(S.Number),
    CustomEventData: S.optional(SensitiveString),
    GameProperties: S.optional(GamePropertyList),
    GameSessionData: S.optional(SensitiveString),
    BackfillMode: S.optional(BackfillMode),
    FlexMatchMode: S.optional(FlexMatchMode),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMatchmakingConfigurationInput",
}) as any as S.Schema<CreateMatchmakingConfigurationInput>;
export type MatchmakingConfigurationArn = string;
export type MatchmakingRuleSetArn = string;
export interface MatchmakingConfiguration {
  Name?: string;
  ConfigurationArn?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  RuleSetArn?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  CreationTime?: Date;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
}
export const MatchmakingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ConfigurationArn: S.optional(S.String),
    Description: S.optional(S.String),
    GameSessionQueueArns: S.optional(QueueArnsList),
    RequestTimeoutSeconds: S.optional(S.Number),
    AcceptanceTimeoutSeconds: S.optional(S.Number),
    AcceptanceRequired: S.optional(S.Boolean),
    RuleSetName: S.optional(S.String),
    RuleSetArn: S.optional(S.String),
    NotificationTarget: S.optional(S.String),
    AdditionalPlayerCount: S.optional(S.Number),
    CustomEventData: S.optional(SensitiveString),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    GameProperties: S.optional(GamePropertyList),
    GameSessionData: S.optional(SensitiveString),
    BackfillMode: S.optional(BackfillMode),
    FlexMatchMode: S.optional(FlexMatchMode),
  }),
).annotate({
  identifier: "MatchmakingConfiguration",
}) as any as S.Schema<MatchmakingConfiguration>;
export interface CreateMatchmakingConfigurationOutput {
  Configuration?: MatchmakingConfiguration & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  };
}
export const CreateMatchmakingConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Configuration: S.optional(MatchmakingConfiguration) }).pipe(ns),
).annotate({
  identifier: "CreateMatchmakingConfigurationOutput",
}) as any as S.Schema<CreateMatchmakingConfigurationOutput>;
export type RuleSetBody = string;
export interface CreateMatchmakingRuleSetInput {
  Name?: string;
  RuleSetBody?: string;
  Tags?: Tag[];
}
export const CreateMatchmakingRuleSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    RuleSetBody: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMatchmakingRuleSetInput",
}) as any as S.Schema<CreateMatchmakingRuleSetInput>;
export interface MatchmakingRuleSet {
  RuleSetName?: string;
  RuleSetArn?: string;
  RuleSetBody?: string;
  CreationTime?: Date;
}
export const MatchmakingRuleSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetName: S.optional(S.String),
    RuleSetArn: S.optional(S.String),
    RuleSetBody: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MatchmakingRuleSet",
}) as any as S.Schema<MatchmakingRuleSet>;
export interface CreateMatchmakingRuleSetOutput {
  RuleSet: MatchmakingRuleSet & { RuleSetBody: RuleSetBody };
}
export const CreateMatchmakingRuleSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSet: S.optional(MatchmakingRuleSet) }).pipe(ns),
).annotate({
  identifier: "CreateMatchmakingRuleSetOutput",
}) as any as S.Schema<CreateMatchmakingRuleSetOutput>;
export type PlayerData = string | redacted.Redacted<string>;
export interface CreatePlayerSessionInput {
  GameSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  PlayerData?: string | redacted.Redacted<string>;
}
export const CreatePlayerSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    PlayerId: S.optional(SensitiveString),
    PlayerData: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePlayerSessionInput",
}) as any as S.Schema<CreatePlayerSessionInput>;
export type PlayerSessionId = string;
export type PlayerSessionStatus =
  | "RESERVED"
  | "ACTIVE"
  | "COMPLETED"
  | "TIMEDOUT"
  | (string & {});
export const PlayerSessionStatus = S.String;

export interface PlayerSession {
  PlayerSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  GameSessionId?: string;
  FleetId?: string;
  FleetArn?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  Status?: PlayerSessionStatus;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlayerData?: string | redacted.Redacted<string>;
}
export const PlayerSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerSessionId: S.optional(S.String),
    PlayerId: S.optional(SensitiveString),
    GameSessionId: S.optional(S.String),
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TerminationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(PlayerSessionStatus),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    Port: S.optional(S.Number),
    PlayerData: S.optional(SensitiveString),
  }),
).annotate({ identifier: "PlayerSession" }) as any as S.Schema<PlayerSession>;
export interface CreatePlayerSessionOutput {
  PlayerSession?: PlayerSession;
}
export const CreatePlayerSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlayerSession: S.optional(PlayerSession) }).pipe(ns),
).annotate({
  identifier: "CreatePlayerSessionOutput",
}) as any as S.Schema<CreatePlayerSessionOutput>;
export type PlayerIdList = (string | redacted.Redacted<string>)[];
export const PlayerIdList = /*@__PURE__*/ S.Array(SensitiveString);
export type PlayerDataMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const PlayerDataMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface CreatePlayerSessionsInput {
  GameSessionId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
  PlayerDataMap?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const CreatePlayerSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    PlayerIds: S.optional(PlayerIdList),
    PlayerDataMap: S.optional(PlayerDataMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePlayerSessionsInput",
}) as any as S.Schema<CreatePlayerSessionsInput>;
export type PlayerSessionList = PlayerSession[];
export const PlayerSessionList = /*@__PURE__*/ S.Array(PlayerSession);
export interface CreatePlayerSessionsOutput {
  PlayerSessions?: PlayerSession[];
}
export const CreatePlayerSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlayerSessions: S.optional(PlayerSessionList) }).pipe(ns),
).annotate({
  identifier: "CreatePlayerSessionsOutput",
}) as any as S.Schema<CreatePlayerSessionsOutput>;
export type ZipBlob = Uint8Array;
export type NodeJsVersion = string;
export interface CreateScriptInput {
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  ZipFile?: Uint8Array;
  Tags?: Tag[];
  NodeJsVersion?: string;
}
export const CreateScriptInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    StorageLocation: S.optional(S3Location),
    ZipFile: S.optional(T.Blob),
    Tags: S.optional(TagList),
    NodeJsVersion: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateScriptInput",
}) as any as S.Schema<CreateScriptInput>;
export interface Script {
  ScriptId?: string;
  ScriptArn?: string;
  Name?: string;
  Version?: string;
  SizeOnDisk?: number;
  CreationTime?: Date;
  StorageLocation?: S3Location;
  NodeJsVersion?: string;
}
export const Script = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScriptId: S.optional(S.String),
    ScriptArn: S.optional(S.String),
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    SizeOnDisk: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StorageLocation: S.optional(S3Location),
    NodeJsVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Script" }) as any as S.Schema<Script>;
export interface CreateScriptOutput {
  Script?: Script;
}
export const CreateScriptOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Script: S.optional(Script) }).pipe(ns),
).annotate({
  identifier: "CreateScriptOutput",
}) as any as S.Schema<CreateScriptOutput>;
export interface CreateVpcPeeringAuthorizationInput {
  GameLiftAwsAccountId?: string;
  PeerVpcId?: string;
}
export const CreateVpcPeeringAuthorizationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameLiftAwsAccountId: S.optional(S.String),
    PeerVpcId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVpcPeeringAuthorizationInput",
}) as any as S.Schema<CreateVpcPeeringAuthorizationInput>;
export interface VpcPeeringAuthorization {
  GameLiftAwsAccountId?: string;
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
  CreationTime?: Date;
  ExpirationTime?: Date;
}
export const VpcPeeringAuthorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameLiftAwsAccountId: S.optional(S.String),
    PeerVpcAwsAccountId: S.optional(S.String),
    PeerVpcId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "VpcPeeringAuthorization",
}) as any as S.Schema<VpcPeeringAuthorization>;
export interface CreateVpcPeeringAuthorizationOutput {
  VpcPeeringAuthorization?: VpcPeeringAuthorization;
}
export const CreateVpcPeeringAuthorizationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcPeeringAuthorization: S.optional(VpcPeeringAuthorization),
  }).pipe(ns),
).annotate({
  identifier: "CreateVpcPeeringAuthorizationOutput",
}) as any as S.Schema<CreateVpcPeeringAuthorizationOutput>;
export interface CreateVpcPeeringConnectionInput {
  FleetId?: string;
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
}
export const CreateVpcPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    PeerVpcAwsAccountId: S.optional(S.String),
    PeerVpcId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVpcPeeringConnectionInput",
}) as any as S.Schema<CreateVpcPeeringConnectionInput>;
export interface CreateVpcPeeringConnectionOutput {}
export const CreateVpcPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateVpcPeeringConnectionOutput",
}) as any as S.Schema<CreateVpcPeeringConnectionOutput>;
export interface DeleteAliasInput {
  AliasId?: string;
}
export const DeleteAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAliasInput",
}) as any as S.Schema<DeleteAliasInput>;
export interface DeleteAliasResponse {}
export const DeleteAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAliasResponse",
}) as any as S.Schema<DeleteAliasResponse>;
export interface DeleteBuildInput {
  BuildId?: string;
}
export const DeleteBuildInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BuildId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBuildInput",
}) as any as S.Schema<DeleteBuildInput>;
export interface DeleteBuildResponse {}
export const DeleteBuildResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBuildResponse",
}) as any as S.Schema<DeleteBuildResponse>;
export interface DeleteContainerFleetInput {
  FleetId?: string;
}
export const DeleteContainerFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContainerFleetInput",
}) as any as S.Schema<DeleteContainerFleetInput>;
export interface DeleteContainerFleetOutput {}
export const DeleteContainerFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteContainerFleetOutput",
}) as any as S.Schema<DeleteContainerFleetOutput>;
export interface DeleteContainerGroupDefinitionInput {
  Name?: string;
  VersionNumber?: number;
  VersionCountToRetain?: number;
}
export const DeleteContainerGroupDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    VersionCountToRetain: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContainerGroupDefinitionInput",
}) as any as S.Schema<DeleteContainerGroupDefinitionInput>;
export interface DeleteContainerGroupDefinitionOutput {}
export const DeleteContainerGroupDefinitionOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteContainerGroupDefinitionOutput",
}) as any as S.Schema<DeleteContainerGroupDefinitionOutput>;
export interface DeleteFleetInput {
  FleetId?: string;
}
export const DeleteFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetInput",
}) as any as S.Schema<DeleteFleetInput>;
export interface DeleteFleetResponse {}
export const DeleteFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFleetResponse",
}) as any as S.Schema<DeleteFleetResponse>;
export interface DeleteFleetLocationsInput {
  FleetId?: string;
  Locations?: string[];
}
export const DeleteFleetLocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Locations: S.optional(LocationList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetLocationsInput",
}) as any as S.Schema<DeleteFleetLocationsInput>;
export interface DeleteFleetLocationsOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationStates?: LocationState[];
}
export const DeleteFleetLocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    LocationStates: S.optional(LocationStateList),
  }).pipe(ns),
).annotate({
  identifier: "DeleteFleetLocationsOutput",
}) as any as S.Schema<DeleteFleetLocationsOutput>;
export type GameServerGroupDeleteOption =
  | "SAFE_DELETE"
  | "FORCE_DELETE"
  | "RETAIN"
  | (string & {});
export const GameServerGroupDeleteOption = S.String;

export interface DeleteGameServerGroupInput {
  GameServerGroupName?: string;
  DeleteOption?: GameServerGroupDeleteOption;
}
export const DeleteGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    DeleteOption: S.optional(GameServerGroupDeleteOption),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGameServerGroupInput",
}) as any as S.Schema<DeleteGameServerGroupInput>;
export interface DeleteGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const DeleteGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "DeleteGameServerGroupOutput",
}) as any as S.Schema<DeleteGameServerGroupOutput>;
export type GameSessionQueueNameOrArn = string;
export interface DeleteGameSessionQueueInput {
  Name?: string;
}
export const DeleteGameSessionQueueInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGameSessionQueueInput",
}) as any as S.Schema<DeleteGameSessionQueueInput>;
export interface DeleteGameSessionQueueOutput {}
export const DeleteGameSessionQueueOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteGameSessionQueueOutput",
}) as any as S.Schema<DeleteGameSessionQueueOutput>;
export type CustomLocationNameOrArnModel = string;
export interface DeleteLocationInput {
  LocationName?: string;
}
export const DeleteLocationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLocationInput",
}) as any as S.Schema<DeleteLocationInput>;
export interface DeleteLocationOutput {}
export const DeleteLocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLocationOutput",
}) as any as S.Schema<DeleteLocationOutput>;
export type MatchmakingConfigurationName = string;
export interface DeleteMatchmakingConfigurationInput {
  Name?: string;
}
export const DeleteMatchmakingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMatchmakingConfigurationInput",
}) as any as S.Schema<DeleteMatchmakingConfigurationInput>;
export interface DeleteMatchmakingConfigurationOutput {}
export const DeleteMatchmakingConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMatchmakingConfigurationOutput",
}) as any as S.Schema<DeleteMatchmakingConfigurationOutput>;
export interface DeleteMatchmakingRuleSetInput {
  Name?: string;
}
export const DeleteMatchmakingRuleSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMatchmakingRuleSetInput",
}) as any as S.Schema<DeleteMatchmakingRuleSetInput>;
export interface DeleteMatchmakingRuleSetOutput {}
export const DeleteMatchmakingRuleSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMatchmakingRuleSetOutput",
}) as any as S.Schema<DeleteMatchmakingRuleSetOutput>;
export interface DeleteScalingPolicyInput {
  Name?: string;
  FleetId?: string;
}
export const DeleteScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScalingPolicyInput",
}) as any as S.Schema<DeleteScalingPolicyInput>;
export interface DeleteScalingPolicyResponse {}
export const DeleteScalingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteScalingPolicyResponse",
}) as any as S.Schema<DeleteScalingPolicyResponse>;
export interface DeleteScriptInput {
  ScriptId?: string;
}
export const DeleteScriptInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScriptId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScriptInput",
}) as any as S.Schema<DeleteScriptInput>;
export interface DeleteScriptResponse {}
export const DeleteScriptResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteScriptResponse",
}) as any as S.Schema<DeleteScriptResponse>;
export interface DeleteVpcPeeringAuthorizationInput {
  GameLiftAwsAccountId?: string;
  PeerVpcId?: string;
}
export const DeleteVpcPeeringAuthorizationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameLiftAwsAccountId: S.optional(S.String),
    PeerVpcId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcPeeringAuthorizationInput",
}) as any as S.Schema<DeleteVpcPeeringAuthorizationInput>;
export interface DeleteVpcPeeringAuthorizationOutput {}
export const DeleteVpcPeeringAuthorizationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteVpcPeeringAuthorizationOutput",
}) as any as S.Schema<DeleteVpcPeeringAuthorizationOutput>;
export interface DeleteVpcPeeringConnectionInput {
  FleetId?: string;
  VpcPeeringConnectionId?: string;
}
export const DeleteVpcPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    VpcPeeringConnectionId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcPeeringConnectionInput",
}) as any as S.Schema<DeleteVpcPeeringConnectionInput>;
export interface DeleteVpcPeeringConnectionOutput {}
export const DeleteVpcPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteVpcPeeringConnectionOutput",
}) as any as S.Schema<DeleteVpcPeeringConnectionOutput>;
export type ComputeNameOrArn = string;
export interface DeregisterComputeInput {
  FleetId?: string;
  ComputeName?: string;
}
export const DeregisterComputeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    ComputeName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterComputeInput",
}) as any as S.Schema<DeregisterComputeInput>;
export interface DeregisterComputeOutput {}
export const DeregisterComputeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterComputeOutput",
}) as any as S.Schema<DeregisterComputeOutput>;
export interface DeregisterGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
}
export const DeregisterGameServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterGameServerInput",
}) as any as S.Schema<DeregisterGameServerInput>;
export interface DeregisterGameServerResponse {}
export const DeregisterGameServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterGameServerResponse",
}) as any as S.Schema<DeregisterGameServerResponse>;
export interface DescribeAliasInput {
  AliasId?: string;
}
export const DescribeAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAliasInput",
}) as any as S.Schema<DescribeAliasInput>;
export interface DescribeAliasOutput {
  Alias?: Alias;
}
export const DescribeAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Alias: S.optional(Alias) }).pipe(ns),
).annotate({
  identifier: "DescribeAliasOutput",
}) as any as S.Schema<DescribeAliasOutput>;
export interface DescribeBuildInput {
  BuildId?: string;
}
export const DescribeBuildInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BuildId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBuildInput",
}) as any as S.Schema<DescribeBuildInput>;
export interface DescribeBuildOutput {
  Build?: Build;
}
export const DescribeBuildOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Build: S.optional(Build) }).pipe(ns),
).annotate({
  identifier: "DescribeBuildOutput",
}) as any as S.Schema<DescribeBuildOutput>;
export interface DescribeComputeInput {
  FleetId?: string;
  ComputeName?: string;
}
export const DescribeComputeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    ComputeName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeComputeInput",
}) as any as S.Schema<DescribeComputeInput>;
export type ComputeArn = string;
export type ComputeStatus =
  | "PENDING"
  | "ACTIVE"
  | "TERMINATING"
  | "IMPAIRED"
  | (string & {});
export const ComputeStatus = S.String;

export type GameLiftServiceSdkEndpointOutput = string;
export type GameLiftAgentEndpointOutput = string;
export type InstanceId = string;
export interface ContainerAttribute {
  ContainerName?: string;
  ContainerRuntimeId?: string;
}
export const ContainerAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    ContainerRuntimeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerAttribute",
}) as any as S.Schema<ContainerAttribute>;
export type ContainerAttributes = ContainerAttribute[];
export const ContainerAttributes = /*@__PURE__*/ S.Array(ContainerAttribute);
export interface Compute {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  ComputeStatus?: ComputeStatus;
  Location?: string;
  CreationTime?: Date;
  OperatingSystem?: OperatingSystem;
  Type?: EC2InstanceType;
  GameLiftServiceSdkEndpoint?: string;
  GameLiftAgentEndpoint?: string;
  InstanceId?: string;
  ContainerAttributes?: ContainerAttribute[];
  GameServerContainerGroupDefinitionArn?: string;
}
export const Compute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    ComputeName: S.optional(S.String),
    ComputeArn: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    ComputeStatus: S.optional(ComputeStatus),
    Location: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OperatingSystem: S.optional(OperatingSystem),
    Type: S.optional(EC2InstanceType),
    GameLiftServiceSdkEndpoint: S.optional(S.String),
    GameLiftAgentEndpoint: S.optional(S.String),
    InstanceId: S.optional(S.String),
    ContainerAttributes: S.optional(ContainerAttributes),
    GameServerContainerGroupDefinitionArn: S.optional(S.String),
  }),
).annotate({ identifier: "Compute" }) as any as S.Schema<Compute>;
export interface DescribeComputeOutput {
  Compute?: Compute;
}
export const DescribeComputeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Compute: S.optional(Compute) }).pipe(ns),
).annotate({
  identifier: "DescribeComputeOutput",
}) as any as S.Schema<DescribeComputeOutput>;
export interface DescribeContainerFleetInput {
  FleetId?: string;
}
export const DescribeContainerFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContainerFleetInput",
}) as any as S.Schema<DescribeContainerFleetInput>;
export interface DescribeContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export const DescribeContainerFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerFleet: S.optional(ContainerFleet) }).pipe(ns),
).annotate({
  identifier: "DescribeContainerFleetOutput",
}) as any as S.Schema<DescribeContainerFleetOutput>;
export interface DescribeContainerGroupDefinitionInput {
  Name?: string;
  VersionNumber?: number;
}
export const DescribeContainerGroupDefinitionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(S.String),
      VersionNumber: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeContainerGroupDefinitionInput",
}) as any as S.Schema<DescribeContainerGroupDefinitionInput>;
export interface DescribeContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export const DescribeContainerGroupDefinitionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContainerGroupDefinition: S.optional(ContainerGroupDefinition),
    }).pipe(ns),
).annotate({
  identifier: "DescribeContainerGroupDefinitionOutput",
}) as any as S.Schema<DescribeContainerGroupDefinitionOutput>;
export type ContainerNameQueryFilter = string;
export interface DescribeContainerGroupPortMappingsInput {
  FleetId?: string;
  ContainerGroupType?: ContainerGroupType;
  ComputeName?: string;
  InstanceId?: string;
  ContainerName?: string;
}
export const DescribeContainerGroupPortMappingsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FleetId: S.optional(S.String),
      ContainerGroupType: S.optional(ContainerGroupType),
      ComputeName: S.optional(S.String),
      InstanceId: S.optional(S.String),
      ContainerName: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeContainerGroupPortMappingsInput",
}) as any as S.Schema<DescribeContainerGroupPortMappingsInput>;
export interface ContainerPortMapping {
  ContainerPort?: number;
  ConnectionPort?: number;
  Protocol?: IpProtocol;
}
export const ContainerPortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerPort: S.optional(S.Number),
    ConnectionPort: S.optional(S.Number),
    Protocol: S.optional(IpProtocol),
  }),
).annotate({
  identifier: "ContainerPortMapping",
}) as any as S.Schema<ContainerPortMapping>;
export type ContainerPortMappingList = ContainerPortMapping[];
export const ContainerPortMappingList =
  /*@__PURE__*/ S.Array(ContainerPortMapping);
export interface ContainerGroupPortMapping {
  ContainerName?: string;
  ContainerRuntimeId?: string;
  ContainerPortMappings?: ContainerPortMapping[];
}
export const ContainerGroupPortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    ContainerRuntimeId: S.optional(S.String),
    ContainerPortMappings: S.optional(ContainerPortMappingList),
  }),
).annotate({
  identifier: "ContainerGroupPortMapping",
}) as any as S.Schema<ContainerGroupPortMapping>;
export type ContainerGroupPortMappingList = ContainerGroupPortMapping[];
export const ContainerGroupPortMappingList = /*@__PURE__*/ S.Array(
  ContainerGroupPortMapping,
);
export interface DescribeContainerGroupPortMappingsOutput {
  FleetId?: string;
  FleetArn?: string;
  Location?: string;
  ContainerGroupDefinitionArn?: string;
  ContainerGroupType?: ContainerGroupType;
  ComputeName?: string;
  InstanceId?: string;
  ContainerGroupPortMappings?: ContainerGroupPortMapping[];
}
export const DescribeContainerGroupPortMappingsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FleetId: S.optional(S.String),
      FleetArn: S.optional(S.String),
      Location: S.optional(S.String),
      ContainerGroupDefinitionArn: S.optional(S.String),
      ContainerGroupType: S.optional(ContainerGroupType),
      ComputeName: S.optional(S.String),
      InstanceId: S.optional(S.String),
      ContainerGroupPortMappings: S.optional(ContainerGroupPortMappingList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeContainerGroupPortMappingsOutput",
}) as any as S.Schema<DescribeContainerGroupPortMappingsOutput>;
export interface DescribeEC2InstanceLimitsInput {
  EC2InstanceType?: EC2InstanceType;
  Location?: string;
}
export const DescribeEC2InstanceLimitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EC2InstanceType: S.optional(EC2InstanceType),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEC2InstanceLimitsInput",
}) as any as S.Schema<DescribeEC2InstanceLimitsInput>;
export interface EC2InstanceLimit {
  EC2InstanceType?: EC2InstanceType;
  CurrentInstances?: number;
  InstanceLimit?: number;
  Location?: string;
}
export const EC2InstanceLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EC2InstanceType: S.optional(EC2InstanceType),
    CurrentInstances: S.optional(S.Number),
    InstanceLimit: S.optional(S.Number),
    Location: S.optional(S.String),
  }),
).annotate({
  identifier: "EC2InstanceLimit",
}) as any as S.Schema<EC2InstanceLimit>;
export type EC2InstanceLimitList = EC2InstanceLimit[];
export const EC2InstanceLimitList = /*@__PURE__*/ S.Array(EC2InstanceLimit);
export interface DescribeEC2InstanceLimitsOutput {
  EC2InstanceLimits?: EC2InstanceLimit[];
}
export const DescribeEC2InstanceLimitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EC2InstanceLimits: S.optional(EC2InstanceLimitList) }).pipe(ns),
).annotate({
  identifier: "DescribeEC2InstanceLimitsOutput",
}) as any as S.Schema<DescribeEC2InstanceLimitsOutput>;
export type FleetIdOrArnList = string[];
export const FleetIdOrArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeFleetAttributesInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeFleetAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetIds: S.optional(FleetIdOrArnList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetAttributesInput",
}) as any as S.Schema<DescribeFleetAttributesInput>;
export type FleetAttributesList = FleetAttributes[];
export const FleetAttributesList = /*@__PURE__*/ S.Array(FleetAttributes);
export interface DescribeFleetAttributesOutput {
  FleetAttributes?: (FleetAttributes & {
    CertificateConfiguration: CertificateConfiguration & {
      CertificateType: CertificateType;
    };
    AnywhereConfiguration: AnywhereConfiguration & {
      Cost: NonNegativeLimitedLengthDouble;
    };
  })[];
  NextToken?: string;
}
export const DescribeFleetAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetAttributes: S.optional(FleetAttributesList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetAttributesOutput",
}) as any as S.Schema<DescribeFleetAttributesOutput>;
export interface DescribeFleetCapacityInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeFleetCapacityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetIds: S.optional(FleetIdOrArnList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetCapacityInput",
}) as any as S.Schema<DescribeFleetCapacityInput>;
export interface EC2InstanceCounts {
  DESIRED?: number;
  MINIMUM?: number;
  MAXIMUM?: number;
  PENDING?: number;
  ACTIVE?: number;
  IDLE?: number;
  TERMINATING?: number;
}
export const EC2InstanceCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DESIRED: S.optional(S.Number),
    MINIMUM: S.optional(S.Number),
    MAXIMUM: S.optional(S.Number),
    PENDING: S.optional(S.Number),
    ACTIVE: S.optional(S.Number),
    IDLE: S.optional(S.Number),
    TERMINATING: S.optional(S.Number),
  }),
).annotate({
  identifier: "EC2InstanceCounts",
}) as any as S.Schema<EC2InstanceCounts>;
export interface GameServerContainerGroupCounts {
  PENDING?: number;
  ACTIVE?: number;
  IDLE?: number;
  TERMINATING?: number;
}
export const GameServerContainerGroupCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PENDING: S.optional(S.Number),
    ACTIVE: S.optional(S.Number),
    IDLE: S.optional(S.Number),
    TERMINATING: S.optional(S.Number),
  }),
).annotate({
  identifier: "GameServerContainerGroupCounts",
}) as any as S.Schema<GameServerContainerGroupCounts>;
export type ZeroCapacityStrategy =
  | "MANUAL"
  | "SCALE_TO_AND_FROM_ZERO"
  | (string & {});
export const ZeroCapacityStrategy = S.String;

export type ScaleInAfterInactivityMinutes = number;
export interface ManagedCapacityConfiguration {
  ZeroCapacityStrategy?: ZeroCapacityStrategy;
  ScaleInAfterInactivityMinutes?: number;
}
export const ManagedCapacityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ZeroCapacityStrategy: S.optional(ZeroCapacityStrategy),
    ScaleInAfterInactivityMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "ManagedCapacityConfiguration",
}) as any as S.Schema<ManagedCapacityConfiguration>;
export interface FleetCapacity {
  FleetId?: string;
  FleetArn?: string;
  InstanceType?: EC2InstanceType;
  InstanceCounts?: EC2InstanceCounts;
  Location?: string;
  GameServerContainerGroupCounts?: GameServerContainerGroupCounts;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export const FleetCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    InstanceType: S.optional(EC2InstanceType),
    InstanceCounts: S.optional(EC2InstanceCounts),
    Location: S.optional(S.String),
    GameServerContainerGroupCounts: S.optional(GameServerContainerGroupCounts),
    ManagedCapacityConfiguration: S.optional(ManagedCapacityConfiguration),
  }),
).annotate({ identifier: "FleetCapacity" }) as any as S.Schema<FleetCapacity>;
export type FleetCapacityList = FleetCapacity[];
export const FleetCapacityList = /*@__PURE__*/ S.Array(FleetCapacity);
export interface DescribeFleetCapacityOutput {
  FleetCapacity?: FleetCapacity[];
  NextToken?: string;
}
export const DescribeFleetCapacityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetCapacity: S.optional(FleetCapacityList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetCapacityOutput",
}) as any as S.Schema<DescribeFleetCapacityOutput>;
export interface DescribeFleetDeploymentInput {
  FleetId?: string;
  DeploymentId?: string;
}
export const DescribeFleetDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    DeploymentId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetDeploymentInput",
}) as any as S.Schema<DescribeFleetDeploymentInput>;
export type FleetBinaryArn = string;
export type DeploymentStatus =
  | "IN_PROGRESS"
  | "IMPAIRED"
  | "COMPLETE"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "CANCELLED"
  | "PENDING"
  | (string & {});
export const DeploymentStatus = S.String;

export type DeploymentProtectionStrategy =
  | "WITH_PROTECTION"
  | "IGNORE_PROTECTION"
  | (string & {});
export const DeploymentProtectionStrategy = S.String;

export type MinimumHealthyPercentage = number;
export type DeploymentImpairmentStrategy =
  | "MAINTAIN"
  | "ROLLBACK"
  | (string & {});
export const DeploymentImpairmentStrategy = S.String;

export interface DeploymentConfiguration {
  ProtectionStrategy?: DeploymentProtectionStrategy;
  MinimumHealthyPercentage?: number;
  ImpairmentStrategy?: DeploymentImpairmentStrategy;
}
export const DeploymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectionStrategy: S.optional(DeploymentProtectionStrategy),
    MinimumHealthyPercentage: S.optional(S.Number),
    ImpairmentStrategy: S.optional(DeploymentImpairmentStrategy),
  }),
).annotate({
  identifier: "DeploymentConfiguration",
}) as any as S.Schema<DeploymentConfiguration>;
export interface FleetDeployment {
  DeploymentId?: string;
  FleetId?: string;
  GameServerBinaryArn?: string;
  RollbackGameServerBinaryArn?: string;
  PerInstanceBinaryArn?: string;
  RollbackPerInstanceBinaryArn?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentConfiguration?: DeploymentConfiguration;
  CreationTime?: Date;
}
export const FleetDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentId: S.optional(S.String),
    FleetId: S.optional(S.String),
    GameServerBinaryArn: S.optional(S.String),
    RollbackGameServerBinaryArn: S.optional(S.String),
    PerInstanceBinaryArn: S.optional(S.String),
    RollbackPerInstanceBinaryArn: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
    DeploymentConfiguration: S.optional(DeploymentConfiguration),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "FleetDeployment",
}) as any as S.Schema<FleetDeployment>;
export interface LocationalDeployment {
  DeploymentStatus?: DeploymentStatus;
}
export const LocationalDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeploymentStatus: S.optional(DeploymentStatus) }),
).annotate({
  identifier: "LocationalDeployment",
}) as any as S.Schema<LocationalDeployment>;
export type LocationalDeployments = {
  [key: string]: LocationalDeployment | undefined;
};
export const LocationalDeployments = /*@__PURE__*/ S.Record(
  S.String,
  LocationalDeployment.pipe(S.optional),
);
export interface DescribeFleetDeploymentOutput {
  FleetDeployment?: FleetDeployment;
  LocationalDeployments?: { [key: string]: LocationalDeployment | undefined };
}
export const DescribeFleetDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetDeployment: S.optional(FleetDeployment),
    LocationalDeployments: S.optional(LocationalDeployments),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetDeploymentOutput",
}) as any as S.Schema<DescribeFleetDeploymentOutput>;
export interface DescribeFleetEventsInput {
  FleetId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Limit?: number;
  NextToken?: string;
}
export const DescribeFleetEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetEventsInput",
}) as any as S.Schema<DescribeFleetEventsInput>;
export type EventCode =
  | "GENERIC_EVENT"
  | "FLEET_CREATED"
  | "FLEET_DELETED"
  | "FLEET_EXPIRED"
  | "FLEET_SCALING_EVENT"
  | "FLEET_STATE_DOWNLOADING"
  | "FLEET_STATE_VALIDATING"
  | "FLEET_STATE_BUILDING"
  | "FLEET_STATE_ACTIVATING"
  | "FLEET_STATE_ACTIVE"
  | "FLEET_STATE_ERROR"
  | "FLEET_STATE_PENDING"
  | "FLEET_STATE_CREATING"
  | "FLEET_STATE_CREATED"
  | "FLEET_STATE_UPDATING"
  | "FLEET_INITIALIZATION_FAILED"
  | "FLEET_BINARY_DOWNLOAD_FAILED"
  | "FLEET_VALIDATION_LAUNCH_PATH_NOT_FOUND"
  | "FLEET_VALIDATION_EXECUTABLE_RUNTIME_FAILURE"
  | "FLEET_VALIDATION_TIMED_OUT"
  | "FLEET_ACTIVATION_FAILED"
  | "FLEET_ACTIVATION_FAILED_NO_INSTANCES"
  | "FLEET_NEW_GAME_SESSION_PROTECTION_POLICY_UPDATED"
  | "SERVER_PROCESS_INVALID_PATH"
  | "SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT"
  | "SERVER_PROCESS_PROCESS_READY_TIMEOUT"
  | "SERVER_PROCESS_CRASHED"
  | "SERVER_PROCESS_TERMINATED_UNHEALTHY"
  | "SERVER_PROCESS_FORCE_TERMINATED"
  | "SERVER_PROCESS_PROCESS_EXIT_TIMEOUT"
  | "SERVER_PROCESS_SDK_INITIALIZATION_FAILED"
  | "SERVER_PROCESS_MISCONFIGURED_CONTAINER_PORT"
  | "GAME_SESSION_ACTIVATION_TIMEOUT"
  | "FLEET_CREATION_EXTRACTING_BUILD"
  | "FLEET_CREATION_RUNNING_INSTALLER"
  | "FLEET_CREATION_VALIDATING_RUNTIME_CONFIG"
  | "FLEET_VPC_PEERING_SUCCEEDED"
  | "FLEET_VPC_PEERING_FAILED"
  | "FLEET_VPC_PEERING_DELETED"
  | "INSTANCE_INTERRUPTED"
  | "INSTANCE_RECYCLED"
  | "INSTANCE_REPLACED_UNHEALTHY"
  | "FLEET_CREATION_COMPLETED_INSTALLER"
  | "FLEET_CREATION_FAILED_INSTALLER"
  | "COMPUTE_LOG_UPLOAD_FAILED"
  | "GAME_SERVER_CONTAINER_GROUP_CRASHED"
  | "PER_INSTANCE_CONTAINER_GROUP_CRASHED"
  | "GAME_SERVER_CONTAINER_GROUP_REPLACED_UNHEALTHY"
  | "LOCATION_STATE_PENDING"
  | "LOCATION_STATE_CREATING"
  | "LOCATION_STATE_CREATED"
  | "LOCATION_STATE_ACTIVATING"
  | "LOCATION_STATE_ACTIVE"
  | "LOCATION_STATE_UPDATING"
  | "LOCATION_STATE_ERROR"
  | "LOCATION_STATE_DELETING"
  | "LOCATION_STATE_DELETED"
  | (string & {});
export const EventCode = S.String;

export type EventCount = number;
export interface Event {
  EventId?: string;
  ResourceId?: string;
  EventCode?: EventCode;
  Message?: string;
  EventTime?: Date;
  PreSignedLogUrl?: string;
  Count?: number;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    EventCode: S.optional(EventCode),
    Message: S.optional(S.String),
    EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PreSignedLogUrl: S.optional(S.String),
    Count: S.optional(S.Number),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(Event);
export interface DescribeFleetEventsOutput {
  Events?: Event[];
  NextToken?: string;
}
export const DescribeFleetEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Events: S.optional(EventList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetEventsOutput",
}) as any as S.Schema<DescribeFleetEventsOutput>;
export interface DescribeFleetLocationAttributesInput {
  FleetId?: string;
  Locations?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeFleetLocationAttributesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FleetId: S.optional(S.String),
      Locations: S.optional(LocationList),
      Limit: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeFleetLocationAttributesInput",
}) as any as S.Schema<DescribeFleetLocationAttributesInput>;
export type LocationUpdateStatus = "PENDING_UPDATE" | (string & {});
export const LocationUpdateStatus = S.String;

export interface LocationAttributes {
  LocationState?: LocationState;
  StoppedActions?: FleetAction[];
  UpdateStatus?: LocationUpdateStatus;
}
export const LocationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocationState: S.optional(LocationState),
    StoppedActions: S.optional(FleetActionList),
    UpdateStatus: S.optional(LocationUpdateStatus),
  }),
).annotate({
  identifier: "LocationAttributes",
}) as any as S.Schema<LocationAttributes>;
export type LocationAttributesList = LocationAttributes[];
export const LocationAttributesList = /*@__PURE__*/ S.Array(LocationAttributes);
export interface DescribeFleetLocationAttributesOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationAttributes?: LocationAttributes[];
  NextToken?: string;
}
export const DescribeFleetLocationAttributesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FleetId: S.optional(S.String),
      FleetArn: S.optional(S.String),
      LocationAttributes: S.optional(LocationAttributesList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeFleetLocationAttributesOutput",
}) as any as S.Schema<DescribeFleetLocationAttributesOutput>;
export interface DescribeFleetLocationCapacityInput {
  FleetId?: string;
  Location?: string;
}
export const DescribeFleetLocationCapacityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetLocationCapacityInput",
}) as any as S.Schema<DescribeFleetLocationCapacityInput>;
export interface DescribeFleetLocationCapacityOutput {
  FleetCapacity?: FleetCapacity;
}
export const DescribeFleetLocationCapacityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetCapacity: S.optional(FleetCapacity) }).pipe(ns),
).annotate({
  identifier: "DescribeFleetLocationCapacityOutput",
}) as any as S.Schema<DescribeFleetLocationCapacityOutput>;
export interface DescribeFleetLocationUtilizationInput {
  FleetId?: string;
  Location?: string;
}
export const DescribeFleetLocationUtilizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FleetId: S.optional(S.String),
      Location: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeFleetLocationUtilizationInput",
}) as any as S.Schema<DescribeFleetLocationUtilizationInput>;
export interface FleetUtilization {
  FleetId?: string;
  FleetArn?: string;
  ActiveServerProcessCount?: number;
  ActiveGameSessionCount?: number;
  CurrentPlayerSessionCount?: number;
  MaximumPlayerSessionCount?: number;
  Location?: string;
}
export const FleetUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    ActiveServerProcessCount: S.optional(S.Number),
    ActiveGameSessionCount: S.optional(S.Number),
    CurrentPlayerSessionCount: S.optional(S.Number),
    MaximumPlayerSessionCount: S.optional(S.Number),
    Location: S.optional(S.String),
  }),
).annotate({
  identifier: "FleetUtilization",
}) as any as S.Schema<FleetUtilization>;
export interface DescribeFleetLocationUtilizationOutput {
  FleetUtilization?: FleetUtilization;
}
export const DescribeFleetLocationUtilizationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ FleetUtilization: S.optional(FleetUtilization) }).pipe(ns),
).annotate({
  identifier: "DescribeFleetLocationUtilizationOutput",
}) as any as S.Schema<DescribeFleetLocationUtilizationOutput>;
export interface DescribeFleetPortSettingsInput {
  FleetId?: string;
  Location?: string;
}
export const DescribeFleetPortSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetPortSettingsInput",
}) as any as S.Schema<DescribeFleetPortSettingsInput>;
export interface DescribeFleetPortSettingsOutput {
  FleetId?: string;
  FleetArn?: string;
  InboundPermissions?: (IpPermission & {
    FromPort: PortNumber;
    ToPort: PortNumber;
    IpRange: IpRange;
    Protocol: IpProtocol;
  })[];
  UpdateStatus?: LocationUpdateStatus;
  Location?: string;
}
export const DescribeFleetPortSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    InboundPermissions: S.optional(IpPermissionsList),
    UpdateStatus: S.optional(LocationUpdateStatus),
    Location: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetPortSettingsOutput",
}) as any as S.Schema<DescribeFleetPortSettingsOutput>;
export interface DescribeFleetUtilizationInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeFleetUtilizationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetIds: S.optional(FleetIdOrArnList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetUtilizationInput",
}) as any as S.Schema<DescribeFleetUtilizationInput>;
export type FleetUtilizationList = FleetUtilization[];
export const FleetUtilizationList = /*@__PURE__*/ S.Array(FleetUtilization);
export interface DescribeFleetUtilizationOutput {
  FleetUtilization?: FleetUtilization[];
  NextToken?: string;
}
export const DescribeFleetUtilizationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetUtilization: S.optional(FleetUtilizationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetUtilizationOutput",
}) as any as S.Schema<DescribeFleetUtilizationOutput>;
export interface DescribeGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
}
export const DescribeGameServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameServerInput",
}) as any as S.Schema<DescribeGameServerInput>;
export interface DescribeGameServerOutput {
  GameServer?: GameServer;
}
export const DescribeGameServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServer: S.optional(GameServer) }).pipe(ns),
).annotate({
  identifier: "DescribeGameServerOutput",
}) as any as S.Schema<DescribeGameServerOutput>;
export interface DescribeGameServerGroupInput {
  GameServerGroupName?: string;
}
export const DescribeGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroupName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameServerGroupInput",
}) as any as S.Schema<DescribeGameServerGroupInput>;
export interface DescribeGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const DescribeGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "DescribeGameServerGroupOutput",
}) as any as S.Schema<DescribeGameServerGroupOutput>;
export type GameServerInstanceIds = string[];
export const GameServerInstanceIds = /*@__PURE__*/ S.Array(S.String);
export interface DescribeGameServerInstancesInput {
  GameServerGroupName?: string;
  InstanceIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeGameServerInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    InstanceIds: S.optional(GameServerInstanceIds),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameServerInstancesInput",
}) as any as S.Schema<DescribeGameServerInstancesInput>;
export type GameServerInstanceStatus =
  | "ACTIVE"
  | "DRAINING"
  | "SPOT_TERMINATING"
  | (string & {});
export const GameServerInstanceStatus = S.String;

export interface GameServerInstance {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  InstanceId?: string;
  InstanceStatus?: GameServerInstanceStatus;
}
export const GameServerInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerGroupArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceStatus: S.optional(GameServerInstanceStatus),
  }),
).annotate({
  identifier: "GameServerInstance",
}) as any as S.Schema<GameServerInstance>;
export type GameServerInstances = GameServerInstance[];
export const GameServerInstances = /*@__PURE__*/ S.Array(GameServerInstance);
export interface DescribeGameServerInstancesOutput {
  GameServerInstances?: GameServerInstance[];
  NextToken?: string;
}
export const DescribeGameServerInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerInstances: S.optional(GameServerInstances),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGameServerInstancesOutput",
}) as any as S.Schema<DescribeGameServerInstancesOutput>;
export interface DescribeGameSessionDetailsInput {
  FleetId?: string;
  GameSessionId?: string;
  AliasId?: string;
  Location?: string;
  StatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeGameSessionDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    GameSessionId: S.optional(S.String),
    AliasId: S.optional(S.String),
    Location: S.optional(S.String),
    StatusFilter: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameSessionDetailsInput",
}) as any as S.Schema<DescribeGameSessionDetailsInput>;
export interface GameSessionDetail {
  GameSession?: GameSession;
  ProtectionPolicy?: ProtectionPolicy;
}
export const GameSessionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSession: S.optional(GameSession),
    ProtectionPolicy: S.optional(ProtectionPolicy),
  }),
).annotate({
  identifier: "GameSessionDetail",
}) as any as S.Schema<GameSessionDetail>;
export type GameSessionDetailList = GameSessionDetail[];
export const GameSessionDetailList = /*@__PURE__*/ S.Array(GameSessionDetail);
export interface DescribeGameSessionDetailsOutput {
  GameSessionDetails?: (GameSessionDetail & {
    GameSession: GameSession & {
      GameProperties: (GameProperty & {
        Key: GamePropertyKey;
        Value: GamePropertyValue;
      })[];
    };
  })[];
  NextToken?: string;
}
export const DescribeGameSessionDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionDetails: S.optional(GameSessionDetailList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGameSessionDetailsOutput",
}) as any as S.Schema<DescribeGameSessionDetailsOutput>;
export interface DescribeGameSessionPlacementInput {
  PlacementId?: string;
}
export const DescribeGameSessionPlacementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlacementId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameSessionPlacementInput",
}) as any as S.Schema<DescribeGameSessionPlacementInput>;
export type GameSessionPlacementState =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "TIMED_OUT"
  | "FAILED"
  | (string & {});
export const GameSessionPlacementState = S.String;

export interface PlayerLatency {
  PlayerId?: string | redacted.Redacted<string>;
  RegionIdentifier?: string;
  LatencyInMilliseconds?: number;
}
export const PlayerLatency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    RegionIdentifier: S.optional(S.String),
    LatencyInMilliseconds: S.optional(S.Number),
  }),
).annotate({ identifier: "PlayerLatency" }) as any as S.Schema<PlayerLatency>;
export type PlayerLatencyList = PlayerLatency[];
export const PlayerLatencyList = /*@__PURE__*/ S.Array(PlayerLatency);
export interface PlacedPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
}
export const PlacedPlayerSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    PlayerSessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "PlacedPlayerSession",
}) as any as S.Schema<PlacedPlayerSession>;
export type PlacedPlayerSessionList = PlacedPlayerSession[];
export const PlacedPlayerSessionList =
  /*@__PURE__*/ S.Array(PlacedPlayerSession);
export type PlacementFallbackStrategy =
  | "DEFAULT_AFTER_SINGLE_PASS"
  | "NONE"
  | (string & {});
export const PlacementFallbackStrategy = S.String;

export type LocationOrderOverrideList = string[];
export const LocationOrderOverrideList = /*@__PURE__*/ S.Array(S.String);
export interface PriorityConfigurationOverride {
  PlacementFallbackStrategy?: PlacementFallbackStrategy;
  LocationOrder?: string[];
}
export const PriorityConfigurationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlacementFallbackStrategy: S.optional(PlacementFallbackStrategy),
    LocationOrder: S.optional(LocationOrderOverrideList),
  }),
).annotate({
  identifier: "PriorityConfigurationOverride",
}) as any as S.Schema<PriorityConfigurationOverride>;
export interface GameSessionPlacement {
  PlacementId?: string;
  GameSessionQueueName?: string;
  Status?: GameSessionPlacementState;
  GameProperties?: GameProperty[];
  MaximumPlayerSessionCount?: number;
  GameSessionName?: string;
  GameSessionId?: string;
  GameSessionArn?: string;
  GameSessionRegion?: string;
  PlayerLatencies?: PlayerLatency[];
  StartTime?: Date;
  EndTime?: Date;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlacedPlayerSessions?: PlacedPlayerSession[];
  GameSessionData?: string | redacted.Redacted<string>;
  MatchmakerData?: string | redacted.Redacted<string>;
  PriorityConfigurationOverride?: PriorityConfigurationOverride;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export const GameSessionPlacement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlacementId: S.optional(S.String),
    GameSessionQueueName: S.optional(S.String),
    Status: S.optional(GameSessionPlacementState),
    GameProperties: S.optional(GamePropertyList),
    MaximumPlayerSessionCount: S.optional(S.Number),
    GameSessionName: S.optional(S.String),
    GameSessionId: S.optional(S.String),
    GameSessionArn: S.optional(S.String),
    GameSessionRegion: S.optional(S.String),
    PlayerLatencies: S.optional(PlayerLatencyList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    Port: S.optional(S.Number),
    PlacedPlayerSessions: S.optional(PlacedPlayerSessionList),
    GameSessionData: S.optional(SensitiveString),
    MatchmakerData: S.optional(SensitiveString),
    PriorityConfigurationOverride: S.optional(PriorityConfigurationOverride),
    PlayerGatewayStatus: S.optional(PlayerGatewayStatus),
  }),
).annotate({
  identifier: "GameSessionPlacement",
}) as any as S.Schema<GameSessionPlacement>;
export interface DescribeGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export const DescribeGameSessionPlacementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionPlacement: S.optional(GameSessionPlacement) }).pipe(ns),
).annotate({
  identifier: "DescribeGameSessionPlacementOutput",
}) as any as S.Schema<DescribeGameSessionPlacementOutput>;
export type GameSessionQueueNameOrArnList = string[];
export const GameSessionQueueNameOrArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeGameSessionQueuesInput {
  Names?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeGameSessionQueuesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(GameSessionQueueNameOrArnList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameSessionQueuesInput",
}) as any as S.Schema<DescribeGameSessionQueuesInput>;
export type GameSessionQueueList = GameSessionQueue[];
export const GameSessionQueueList = /*@__PURE__*/ S.Array(GameSessionQueue);
export interface DescribeGameSessionQueuesOutput {
  GameSessionQueues?: GameSessionQueue[];
  NextToken?: string;
}
export const DescribeGameSessionQueuesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionQueues: S.optional(GameSessionQueueList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGameSessionQueuesOutput",
}) as any as S.Schema<DescribeGameSessionQueuesOutput>;
export interface DescribeGameSessionsInput {
  FleetId?: string;
  GameSessionId?: string;
  AliasId?: string;
  Location?: string;
  StatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeGameSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    GameSessionId: S.optional(S.String),
    AliasId: S.optional(S.String),
    Location: S.optional(S.String),
    StatusFilter: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGameSessionsInput",
}) as any as S.Schema<DescribeGameSessionsInput>;
export type GameSessionList = GameSession[];
export const GameSessionList = /*@__PURE__*/ S.Array(GameSession);
export interface DescribeGameSessionsOutput {
  GameSessions?: (GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  })[];
  NextToken?: string;
}
export const DescribeGameSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessions: S.optional(GameSessionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGameSessionsOutput",
}) as any as S.Schema<DescribeGameSessionsOutput>;
export interface DescribeInstancesInput {
  FleetId?: string;
  InstanceId?: string;
  Limit?: number;
  NextToken?: string;
  Location?: string;
}
export const DescribeInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInstancesInput",
}) as any as S.Schema<DescribeInstancesInput>;
export type InstanceStatus =
  | "PENDING"
  | "ACTIVE"
  | "TERMINATING"
  | (string & {});
export const InstanceStatus = S.String;

export interface Instance {
  FleetId?: string;
  FleetArn?: string;
  InstanceId?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  OperatingSystem?: OperatingSystem;
  Type?: EC2InstanceType;
  Status?: InstanceStatus;
  CreationTime?: Date;
  Location?: string;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    InstanceId: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    Type: S.optional(EC2InstanceType),
    Status: S.optional(InstanceStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Location: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type InstanceList = Instance[];
export const InstanceList = /*@__PURE__*/ S.Array(Instance);
export interface DescribeInstancesOutput {
  Instances?: Instance[];
  NextToken?: string;
}
export const DescribeInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstancesOutput",
}) as any as S.Schema<DescribeInstancesOutput>;
export type MatchmakingIdList = string[];
export const MatchmakingIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeMatchmakingInput {
  TicketIds?: string[];
}
export const DescribeMatchmakingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TicketIds: S.optional(MatchmakingIdList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMatchmakingInput",
}) as any as S.Schema<DescribeMatchmakingInput>;
export type MatchmakingConfigurationStatus =
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | "PLACING"
  | "QUEUED"
  | "REQUIRES_ACCEPTANCE"
  | "SEARCHING"
  | "TIMED_OUT"
  | (string & {});
export const MatchmakingConfigurationStatus = S.String;

export type StringModel = string;
export type PlayerAttributeString = string;
export type DoubleObject = number;
export type PlayerAttributeStringList = string[];
export const PlayerAttributeStringList = /*@__PURE__*/ S.Array(S.String);
export type PlayerAttributeStringDoubleMap = {
  [key: string]: number | undefined;
};
export const PlayerAttributeStringDoubleMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface AttributeValue {
  S?: string;
  N?: number;
  SL?: string[];
  SDM?: { [key: string]: number | undefined };
}
export const AttributeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S: S.optional(S.String),
    N: S.optional(S.Number),
    SL: S.optional(PlayerAttributeStringList),
    SDM: S.optional(PlayerAttributeStringDoubleMap),
  }),
).annotate({ identifier: "AttributeValue" }) as any as S.Schema<AttributeValue>;
export type PlayerAttributeMap = { [key: string]: AttributeValue | undefined };
export const PlayerAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  AttributeValue.pipe(S.optional),
);
export type LatencyMap = { [key: string]: number | undefined };
export const LatencyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface Player {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerAttributes?: { [key: string]: AttributeValue | undefined };
  Team?: string;
  LatencyInMs?: { [key: string]: number | undefined };
}
export const Player = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    PlayerAttributes: S.optional(PlayerAttributeMap),
    Team: S.optional(S.String),
    LatencyInMs: S.optional(LatencyMap),
  }),
).annotate({ identifier: "Player" }) as any as S.Schema<Player>;
export type PlayerList = Player[];
export const PlayerList = /*@__PURE__*/ S.Array(Player);
export interface MatchedPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
}
export const MatchedPlayerSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    PlayerSessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "MatchedPlayerSession",
}) as any as S.Schema<MatchedPlayerSession>;
export type MatchedPlayerSessionList = MatchedPlayerSession[];
export const MatchedPlayerSessionList =
  /*@__PURE__*/ S.Array(MatchedPlayerSession);
export interface GameSessionConnectionInfo {
  GameSessionArn?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  MatchedPlayerSessions?: MatchedPlayerSession[];
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export const GameSessionConnectionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionArn: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    DnsName: S.optional(S.String),
    Port: S.optional(S.Number),
    MatchedPlayerSessions: S.optional(MatchedPlayerSessionList),
    PlayerGatewayStatus: S.optional(PlayerGatewayStatus),
  }),
).annotate({
  identifier: "GameSessionConnectionInfo",
}) as any as S.Schema<GameSessionConnectionInfo>;
export interface MatchmakingTicket {
  TicketId?: string;
  ConfigurationName?: string;
  ConfigurationArn?: string;
  Status?: MatchmakingConfigurationStatus;
  StatusReason?: string;
  StatusMessage?: string;
  StartTime?: Date;
  EndTime?: Date;
  Players?: Player[];
  GameSessionConnectionInfo?: GameSessionConnectionInfo;
  EstimatedWaitTime?: number;
}
export const MatchmakingTicket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TicketId: S.optional(S.String),
    ConfigurationName: S.optional(S.String),
    ConfigurationArn: S.optional(S.String),
    Status: S.optional(MatchmakingConfigurationStatus),
    StatusReason: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Players: S.optional(PlayerList),
    GameSessionConnectionInfo: S.optional(GameSessionConnectionInfo),
    EstimatedWaitTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "MatchmakingTicket",
}) as any as S.Schema<MatchmakingTicket>;
export type MatchmakingTicketList = MatchmakingTicket[];
export const MatchmakingTicketList = /*@__PURE__*/ S.Array(MatchmakingTicket);
export interface DescribeMatchmakingOutput {
  TicketList?: MatchmakingTicket[];
}
export const DescribeMatchmakingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TicketList: S.optional(MatchmakingTicketList) }).pipe(ns),
).annotate({
  identifier: "DescribeMatchmakingOutput",
}) as any as S.Schema<DescribeMatchmakingOutput>;
export type MatchmakingConfigurationNameList = string[];
export const MatchmakingConfigurationNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeMatchmakingConfigurationsInput {
  Names?: string[];
  RuleSetName?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeMatchmakingConfigurationsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Names: S.optional(MatchmakingConfigurationNameList),
      RuleSetName: S.optional(S.String),
      Limit: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMatchmakingConfigurationsInput",
}) as any as S.Schema<DescribeMatchmakingConfigurationsInput>;
export type MatchmakingConfigurationList = MatchmakingConfiguration[];
export const MatchmakingConfigurationList = /*@__PURE__*/ S.Array(
  MatchmakingConfiguration,
);
export interface DescribeMatchmakingConfigurationsOutput {
  Configurations?: (MatchmakingConfiguration & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  })[];
  NextToken?: string;
}
export const DescribeMatchmakingConfigurationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Configurations: S.optional(MatchmakingConfigurationList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMatchmakingConfigurationsOutput",
}) as any as S.Schema<DescribeMatchmakingConfigurationsOutput>;
export type MatchmakingRuleSetNameList = string[];
export const MatchmakingRuleSetNameList = /*@__PURE__*/ S.Array(S.String);
export type RuleSetLimit = number;
export interface DescribeMatchmakingRuleSetsInput {
  Names?: string[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeMatchmakingRuleSetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(MatchmakingRuleSetNameList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMatchmakingRuleSetsInput",
}) as any as S.Schema<DescribeMatchmakingRuleSetsInput>;
export type MatchmakingRuleSetList = MatchmakingRuleSet[];
export const MatchmakingRuleSetList = /*@__PURE__*/ S.Array(MatchmakingRuleSet);
export interface DescribeMatchmakingRuleSetsOutput {
  RuleSets: (MatchmakingRuleSet & { RuleSetBody: RuleSetBody })[];
  NextToken?: string;
}
export const DescribeMatchmakingRuleSetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSets: S.optional(MatchmakingRuleSetList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMatchmakingRuleSetsOutput",
}) as any as S.Schema<DescribeMatchmakingRuleSetsOutput>;
export interface DescribePlayerSessionsInput {
  GameSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
  PlayerSessionStatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribePlayerSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    PlayerId: S.optional(SensitiveString),
    PlayerSessionId: S.optional(S.String),
    PlayerSessionStatusFilter: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePlayerSessionsInput",
}) as any as S.Schema<DescribePlayerSessionsInput>;
export interface DescribePlayerSessionsOutput {
  PlayerSessions?: PlayerSession[];
  NextToken?: string;
}
export const DescribePlayerSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerSessions: S.optional(PlayerSessionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePlayerSessionsOutput",
}) as any as S.Schema<DescribePlayerSessionsOutput>;
export interface DescribeRuntimeConfigurationInput {
  FleetId?: string;
}
export const DescribeRuntimeConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRuntimeConfigurationInput",
}) as any as S.Schema<DescribeRuntimeConfigurationInput>;
export interface DescribeRuntimeConfigurationOutput {
  RuntimeConfiguration?: RuntimeConfiguration & {
    ServerProcesses: (ServerProcess & {
      LaunchPath: LaunchPathStringModel;
      ConcurrentExecutions: PositiveInteger;
    })[];
  };
}
export const DescribeRuntimeConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuntimeConfiguration: S.optional(RuntimeConfiguration) }).pipe(ns),
).annotate({
  identifier: "DescribeRuntimeConfigurationOutput",
}) as any as S.Schema<DescribeRuntimeConfigurationOutput>;
export type ScalingStatusType =
  | "ACTIVE"
  | "UPDATE_REQUESTED"
  | "UPDATING"
  | "DELETE_REQUESTED"
  | "DELETING"
  | "DELETED"
  | "ERROR"
  | (string & {});
export const ScalingStatusType = S.String;

export interface DescribeScalingPoliciesInput {
  FleetId?: string;
  StatusFilter?: ScalingStatusType;
  Limit?: number;
  NextToken?: string;
  Location?: string;
}
export const DescribeScalingPoliciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    StatusFilter: S.optional(ScalingStatusType),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScalingPoliciesInput",
}) as any as S.Schema<DescribeScalingPoliciesInput>;
export type ScalingAdjustmentType =
  | "ChangeInCapacity"
  | "ExactCapacity"
  | "PercentChangeInCapacity"
  | (string & {});
export const ScalingAdjustmentType = S.String;

export type ComparisonOperatorType =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export const ComparisonOperatorType = S.String;

export type MetricName =
  | "ActivatingGameSessions"
  | "ActiveGameSessions"
  | "ActiveInstances"
  | "AvailableGameSessions"
  | "AvailablePlayerSessions"
  | "CurrentPlayerSessions"
  | "IdleInstances"
  | "PercentAvailableGameSessions"
  | "PercentIdleInstances"
  | "QueueDepth"
  | "WaitTime"
  | "ConcurrentActivatableGameSessions"
  | (string & {});
export const MetricName = S.String;

export type PolicyType = "RuleBased" | "TargetBased" | (string & {});
export const PolicyType = S.String;

export interface TargetConfiguration {
  TargetValue?: number;
}
export const TargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetValue: S.optional(S.Number) }),
).annotate({
  identifier: "TargetConfiguration",
}) as any as S.Schema<TargetConfiguration>;
export interface ScalingPolicy {
  FleetId?: string;
  FleetArn?: string;
  Name?: string;
  Status?: ScalingStatusType;
  ScalingAdjustment?: number;
  ScalingAdjustmentType?: ScalingAdjustmentType;
  ComparisonOperator?: ComparisonOperatorType;
  Threshold?: number;
  EvaluationPeriods?: number;
  MetricName?: MetricName;
  PolicyType?: PolicyType;
  TargetConfiguration?: TargetConfiguration;
  UpdateStatus?: LocationUpdateStatus;
  Location?: string;
}
export const ScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(ScalingStatusType),
    ScalingAdjustment: S.optional(S.Number),
    ScalingAdjustmentType: S.optional(ScalingAdjustmentType),
    ComparisonOperator: S.optional(ComparisonOperatorType),
    Threshold: S.optional(S.Number),
    EvaluationPeriods: S.optional(S.Number),
    MetricName: S.optional(MetricName),
    PolicyType: S.optional(PolicyType),
    TargetConfiguration: S.optional(TargetConfiguration),
    UpdateStatus: S.optional(LocationUpdateStatus),
    Location: S.optional(S.String),
  }),
).annotate({ identifier: "ScalingPolicy" }) as any as S.Schema<ScalingPolicy>;
export type ScalingPolicyList = ScalingPolicy[];
export const ScalingPolicyList = /*@__PURE__*/ S.Array(ScalingPolicy);
export interface DescribeScalingPoliciesOutput {
  ScalingPolicies?: (ScalingPolicy & {
    TargetConfiguration: TargetConfiguration & { TargetValue: number };
  })[];
  NextToken?: string;
}
export const DescribeScalingPoliciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPolicies: S.optional(ScalingPolicyList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeScalingPoliciesOutput",
}) as any as S.Schema<DescribeScalingPoliciesOutput>;
export interface DescribeScriptInput {
  ScriptId?: string;
}
export const DescribeScriptInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScriptId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScriptInput",
}) as any as S.Schema<DescribeScriptInput>;
export interface DescribeScriptOutput {
  Script?: Script;
}
export const DescribeScriptOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Script: S.optional(Script) }).pipe(ns),
).annotate({
  identifier: "DescribeScriptOutput",
}) as any as S.Schema<DescribeScriptOutput>;
export interface DescribeVpcPeeringAuthorizationsInput {}
export const DescribeVpcPeeringAuthorizationsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeVpcPeeringAuthorizationsInput",
}) as any as S.Schema<DescribeVpcPeeringAuthorizationsInput>;
export type VpcPeeringAuthorizationList = VpcPeeringAuthorization[];
export const VpcPeeringAuthorizationList = /*@__PURE__*/ S.Array(
  VpcPeeringAuthorization,
);
export interface DescribeVpcPeeringAuthorizationsOutput {
  VpcPeeringAuthorizations?: VpcPeeringAuthorization[];
}
export const DescribeVpcPeeringAuthorizationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VpcPeeringAuthorizations: S.optional(VpcPeeringAuthorizationList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeVpcPeeringAuthorizationsOutput",
}) as any as S.Schema<DescribeVpcPeeringAuthorizationsOutput>;
export interface DescribeVpcPeeringConnectionsInput {
  FleetId?: string;
}
export const DescribeVpcPeeringConnectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FleetId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVpcPeeringConnectionsInput",
}) as any as S.Schema<DescribeVpcPeeringConnectionsInput>;
export interface VpcPeeringConnectionStatus {
  Code?: string;
  Message?: string;
}
export const VpcPeeringConnectionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "VpcPeeringConnectionStatus",
}) as any as S.Schema<VpcPeeringConnectionStatus>;
export interface VpcPeeringConnection {
  FleetId?: string;
  FleetArn?: string;
  IpV4CidrBlock?: string;
  VpcPeeringConnectionId?: string;
  Status?: VpcPeeringConnectionStatus;
  PeerVpcId?: string;
  GameLiftVpcId?: string;
}
export const VpcPeeringConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    IpV4CidrBlock: S.optional(S.String),
    VpcPeeringConnectionId: S.optional(S.String),
    Status: S.optional(VpcPeeringConnectionStatus),
    PeerVpcId: S.optional(S.String),
    GameLiftVpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcPeeringConnection",
}) as any as S.Schema<VpcPeeringConnection>;
export type VpcPeeringConnectionList = VpcPeeringConnection[];
export const VpcPeeringConnectionList =
  /*@__PURE__*/ S.Array(VpcPeeringConnection);
export interface DescribeVpcPeeringConnectionsOutput {
  VpcPeeringConnections?: VpcPeeringConnection[];
}
export const DescribeVpcPeeringConnectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcPeeringConnections: S.optional(VpcPeeringConnectionList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeVpcPeeringConnectionsOutput",
}) as any as S.Schema<DescribeVpcPeeringConnectionsOutput>;
export interface GetComputeAccessInput {
  FleetId?: string;
  ComputeName?: string;
}
export const GetComputeAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    ComputeName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComputeAccessInput",
}) as any as S.Schema<GetComputeAccessInput>;
export type SessionTarget = string;
export interface ContainerIdentifier {
  ContainerName?: string;
  ContainerRuntimeId?: string;
}
export const ContainerIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerName: S.optional(S.String),
    ContainerRuntimeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerIdentifier",
}) as any as S.Schema<ContainerIdentifier>;
export type ContainerIdentifierList = ContainerIdentifier[];
export const ContainerIdentifierList =
  /*@__PURE__*/ S.Array(ContainerIdentifier);
export interface GetComputeAccessOutput {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  Credentials?: AwsCredentials;
  Target?: string;
  ContainerIdentifiers?: ContainerIdentifier[];
}
export const GetComputeAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    ComputeName: S.optional(S.String),
    ComputeArn: S.optional(S.String),
    Credentials: S.optional(AwsCredentials),
    Target: S.optional(S.String),
    ContainerIdentifiers: S.optional(ContainerIdentifierList),
  }).pipe(ns),
).annotate({
  identifier: "GetComputeAccessOutput",
}) as any as S.Schema<GetComputeAccessOutput>;
export interface GetComputeAuthTokenInput {
  FleetId?: string;
  ComputeName?: string;
}
export const GetComputeAuthTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    ComputeName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComputeAuthTokenInput",
}) as any as S.Schema<GetComputeAuthTokenInput>;
export type ComputeAuthToken = string;
export interface GetComputeAuthTokenOutput {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  AuthToken?: string;
  ExpirationTimestamp?: Date;
}
export const GetComputeAuthTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    ComputeName: S.optional(S.String),
    ComputeArn: S.optional(S.String),
    AuthToken: S.optional(S.String),
    ExpirationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "GetComputeAuthTokenOutput",
}) as any as S.Schema<GetComputeAuthTokenOutput>;
export interface GetGameSessionLogUrlInput {
  GameSessionId?: string;
}
export const GetGameSessionLogUrlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGameSessionLogUrlInput",
}) as any as S.Schema<GetGameSessionLogUrlInput>;
export interface GetGameSessionLogUrlOutput {
  PreSignedUrl?: string;
}
export const GetGameSessionLogUrlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PreSignedUrl: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetGameSessionLogUrlOutput",
}) as any as S.Schema<GetGameSessionLogUrlOutput>;
export interface GetInstanceAccessInput {
  FleetId?: string;
  InstanceId?: string;
}
export const GetInstanceAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    InstanceId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInstanceAccessInput",
}) as any as S.Schema<GetInstanceAccessInput>;
export interface InstanceCredentials {
  UserName?: string;
  Secret?: string;
}
export const InstanceCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserName: S.optional(S.String), Secret: S.optional(S.String) }),
).annotate({
  identifier: "InstanceCredentials",
}) as any as S.Schema<InstanceCredentials>;
export interface InstanceAccess {
  FleetId?: string;
  InstanceId?: string;
  IpAddress?: string | redacted.Redacted<string>;
  OperatingSystem?: OperatingSystem;
  Credentials?: InstanceCredentials;
}
export const InstanceAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    OperatingSystem: S.optional(OperatingSystem),
    Credentials: S.optional(InstanceCredentials),
  }),
).annotate({ identifier: "InstanceAccess" }) as any as S.Schema<InstanceAccess>;
export interface GetInstanceAccessOutput {
  InstanceAccess?: InstanceAccess;
}
export const GetInstanceAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceAccess: S.optional(InstanceAccess) }).pipe(ns),
).annotate({
  identifier: "GetInstanceAccessOutput",
}) as any as S.Schema<GetInstanceAccessOutput>;
export interface GetPlayerConnectionDetailsInput {
  GameSessionId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
}
export const GetPlayerConnectionDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    PlayerIds: S.optional(PlayerIdList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlayerConnectionDetailsInput",
}) as any as S.Schema<GetPlayerConnectionDetailsInput>;
export interface PlayerConnectionEndpoint {
  IpAddress?: string | redacted.Redacted<string>;
  Port?: number;
}
export const PlayerConnectionEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(SensitiveString),
    Port: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlayerConnectionEndpoint",
}) as any as S.Schema<PlayerConnectionEndpoint>;
export type PlayerConnectionEndpointList = PlayerConnectionEndpoint[];
export const PlayerConnectionEndpointList = /*@__PURE__*/ S.Array(
  PlayerConnectionEndpoint,
);
export type MaxString = string;
export interface PlayerConnectionDetail {
  PlayerId?: string | redacted.Redacted<string>;
  Endpoints?: PlayerConnectionEndpoint[];
  PlayerGatewayToken?: string;
  Expiration?: Date;
}
export const PlayerConnectionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    Endpoints: S.optional(PlayerConnectionEndpointList),
    PlayerGatewayToken: S.optional(S.String),
    Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PlayerConnectionDetail",
}) as any as S.Schema<PlayerConnectionDetail>;
export type PlayerConnectionDetailList = PlayerConnectionDetail[];
export const PlayerConnectionDetailList = /*@__PURE__*/ S.Array(
  PlayerConnectionDetail,
);
export interface GetPlayerConnectionDetailsOutput {
  GameSessionId?: string;
  PlayerConnectionDetails?: PlayerConnectionDetail[];
}
export const GetPlayerConnectionDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    PlayerConnectionDetails: S.optional(PlayerConnectionDetailList),
  }).pipe(ns),
).annotate({
  identifier: "GetPlayerConnectionDetailsOutput",
}) as any as S.Schema<GetPlayerConnectionDetailsOutput>;
export interface ListAliasesInput {
  RoutingStrategyType?: RoutingStrategyType;
  Name?: string;
  Limit?: number;
  NextToken?: string;
}
export const ListAliasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoutingStrategyType: S.optional(RoutingStrategyType),
    Name: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAliasesInput",
}) as any as S.Schema<ListAliasesInput>;
export type AliasList = Alias[];
export const AliasList = /*@__PURE__*/ S.Array(Alias);
export interface ListAliasesOutput {
  Aliases?: Alias[];
  NextToken?: string;
}
export const ListAliasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Aliases: S.optional(AliasList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAliasesOutput",
}) as any as S.Schema<ListAliasesOutput>;
export interface ListBuildsInput {
  Status?: BuildStatus;
  Limit?: number;
  NextToken?: string;
}
export const ListBuildsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(BuildStatus),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBuildsInput",
}) as any as S.Schema<ListBuildsInput>;
export type BuildList = Build[];
export const BuildList = /*@__PURE__*/ S.Array(Build);
export interface ListBuildsOutput {
  Builds?: Build[];
  NextToken?: string;
}
export const ListBuildsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Builds: S.optional(BuildList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBuildsOutput",
}) as any as S.Schema<ListBuildsOutput>;
export type ListComputeInputStatus = "ACTIVE" | "IMPAIRED" | (string & {});
export const ListComputeInputStatus = S.String;

export interface ListComputeInput {
  FleetId?: string;
  Location?: string;
  ContainerGroupDefinitionName?: string;
  ComputeStatus?: ListComputeInputStatus;
  Limit?: number;
  NextToken?: string;
}
export const ListComputeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Location: S.optional(S.String),
    ContainerGroupDefinitionName: S.optional(S.String),
    ComputeStatus: S.optional(ListComputeInputStatus),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComputeInput",
}) as any as S.Schema<ListComputeInput>;
export type ComputeList = Compute[];
export const ComputeList = /*@__PURE__*/ S.Array(Compute);
export interface ListComputeOutput {
  ComputeList?: Compute[];
  NextToken?: string;
}
export const ListComputeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComputeList: S.optional(ComputeList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListComputeOutput",
}) as any as S.Schema<ListComputeOutput>;
export interface ListContainerFleetsInput {
  ContainerGroupDefinitionName?: string;
  Limit?: number;
  NextToken?: string;
}
export const ListContainerFleetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerGroupDefinitionName: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContainerFleetsInput",
}) as any as S.Schema<ListContainerFleetsInput>;
export type ContainerFleetList = ContainerFleet[];
export const ContainerFleetList = /*@__PURE__*/ S.Array(ContainerFleet);
export interface ListContainerFleetsOutput {
  ContainerFleets?: (ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  })[];
  NextToken?: string;
}
export const ListContainerFleetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerFleets: S.optional(ContainerFleetList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListContainerFleetsOutput",
}) as any as S.Schema<ListContainerFleetsOutput>;
export type ListContainerGroupDefinitionsLimit = number;
export interface ListContainerGroupDefinitionsInput {
  ContainerGroupType?: ContainerGroupType;
  Limit?: number;
  NextToken?: string;
}
export const ListContainerGroupDefinitionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerGroupType: S.optional(ContainerGroupType),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContainerGroupDefinitionsInput",
}) as any as S.Schema<ListContainerGroupDefinitionsInput>;
export type ContainerGroupDefinitionList = ContainerGroupDefinition[];
export const ContainerGroupDefinitionList = /*@__PURE__*/ S.Array(
  ContainerGroupDefinition,
);
export interface ListContainerGroupDefinitionsOutput {
  ContainerGroupDefinitions?: (ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export const ListContainerGroupDefinitionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerGroupDefinitions: S.optional(ContainerGroupDefinitionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListContainerGroupDefinitionsOutput",
}) as any as S.Schema<ListContainerGroupDefinitionsOutput>;
export type ListContainerGroupDefinitionVersionsLimit = number;
export interface ListContainerGroupDefinitionVersionsInput {
  Name?: string;
  Limit?: number;
  NextToken?: string;
}
export const ListContainerGroupDefinitionVersionsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(S.String),
      Limit: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListContainerGroupDefinitionVersionsInput",
  }) as any as S.Schema<ListContainerGroupDefinitionVersionsInput>;
export interface ListContainerGroupDefinitionVersionsOutput {
  ContainerGroupDefinitions?: (ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export const ListContainerGroupDefinitionVersionsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ContainerGroupDefinitions: S.optional(ContainerGroupDefinitionList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListContainerGroupDefinitionVersionsOutput",
  }) as any as S.Schema<ListContainerGroupDefinitionVersionsOutput>;
export interface ListFleetDeploymentsInput {
  FleetId?: string;
  Limit?: number;
  NextToken?: string;
}
export const ListFleetDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetDeploymentsInput",
}) as any as S.Schema<ListFleetDeploymentsInput>;
export type FleetDeployments = FleetDeployment[];
export const FleetDeployments = /*@__PURE__*/ S.Array(FleetDeployment);
export interface ListFleetDeploymentsOutput {
  FleetDeployments?: FleetDeployment[];
  NextToken?: string;
}
export const ListFleetDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetDeployments: S.optional(FleetDeployments),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListFleetDeploymentsOutput",
}) as any as S.Schema<ListFleetDeploymentsOutput>;
export interface ListFleetsInput {
  BuildId?: string;
  ScriptId?: string;
  Limit?: number;
  NextToken?: string;
}
export const ListFleetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BuildId: S.optional(S.String),
    ScriptId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetsInput",
}) as any as S.Schema<ListFleetsInput>;
export type FleetIdList = string[];
export const FleetIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListFleetsOutput {
  FleetIds?: string[];
  NextToken?: string;
}
export const ListFleetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetIds: S.optional(FleetIdList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListFleetsOutput",
}) as any as S.Schema<ListFleetsOutput>;
export interface ListGameServerGroupsInput {
  Limit?: number;
  NextToken?: string;
}
export const ListGameServerGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGameServerGroupsInput",
}) as any as S.Schema<ListGameServerGroupsInput>;
export type GameServerGroups = GameServerGroup[];
export const GameServerGroups = /*@__PURE__*/ S.Array(GameServerGroup);
export interface ListGameServerGroupsOutput {
  GameServerGroups?: (GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  })[];
  NextToken?: string;
}
export const ListGameServerGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroups: S.optional(GameServerGroups),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGameServerGroupsOutput",
}) as any as S.Schema<ListGameServerGroupsOutput>;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface ListGameServersInput {
  GameServerGroupName?: string;
  SortOrder?: SortOrder;
  Limit?: number;
  NextToken?: string;
}
export const ListGameServersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGameServersInput",
}) as any as S.Schema<ListGameServersInput>;
export type GameServers = GameServer[];
export const GameServers = /*@__PURE__*/ S.Array(GameServer);
export interface ListGameServersOutput {
  GameServers?: GameServer[];
  NextToken?: string;
}
export const ListGameServersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServers: S.optional(GameServers),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGameServersOutput",
}) as any as S.Schema<ListGameServersOutput>;
export type LocationFilter = "AWS" | "CUSTOM" | (string & {});
export const LocationFilter = S.String;

export type LocationFilterList = LocationFilter[];
export const LocationFilterList = /*@__PURE__*/ S.Array(LocationFilter);
export type ListLocationsLimit = number;
export interface ListLocationsInput {
  Filters?: LocationFilter[];
  Limit?: number;
  NextToken?: string;
}
export const ListLocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(LocationFilterList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLocationsInput",
}) as any as S.Schema<ListLocationsInput>;
export type LocationModelList = LocationModel[];
export const LocationModelList = /*@__PURE__*/ S.Array(LocationModel);
export interface ListLocationsOutput {
  Locations?: LocationModel[];
  NextToken?: string;
}
export const ListLocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Locations: S.optional(LocationModelList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLocationsOutput",
}) as any as S.Schema<ListLocationsOutput>;
export interface ListScriptsInput {
  Limit?: number;
  NextToken?: string;
}
export const ListScriptsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScriptsInput",
}) as any as S.Schema<ListScriptsInput>;
export type ScriptList = Script[];
export const ScriptList = /*@__PURE__*/ S.Array(Script);
export interface ListScriptsOutput {
  Scripts?: Script[];
  NextToken?: string;
}
export const ListScriptsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Scripts: S.optional(ScriptList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListScriptsOutput",
}) as any as S.Schema<ListScriptsOutput>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutScalingPolicyInput {
  Name?: string;
  FleetId?: string;
  ScalingAdjustment?: number;
  ScalingAdjustmentType?: ScalingAdjustmentType;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperatorType;
  EvaluationPeriods?: number;
  MetricName?: MetricName;
  PolicyType?: PolicyType;
  TargetConfiguration?: TargetConfiguration;
}
export const PutScalingPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    FleetId: S.optional(S.String),
    ScalingAdjustment: S.optional(S.Number),
    ScalingAdjustmentType: S.optional(ScalingAdjustmentType),
    Threshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ComparisonOperatorType),
    EvaluationPeriods: S.optional(S.Number),
    MetricName: S.optional(MetricName),
    PolicyType: S.optional(PolicyType),
    TargetConfiguration: S.optional(TargetConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutScalingPolicyInput",
}) as any as S.Schema<PutScalingPolicyInput>;
export interface PutScalingPolicyOutput {
  Name?: string;
}
export const PutScalingPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutScalingPolicyOutput",
}) as any as S.Schema<PutScalingPolicyOutput>;
export type DnsNameInput = string;
export interface RegisterComputeInput {
  FleetId?: string;
  ComputeName?: string;
  CertificatePath?: string;
  DnsName?: string;
  IpAddress?: string | redacted.Redacted<string>;
  Location?: string;
}
export const RegisterComputeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    ComputeName: S.optional(S.String),
    CertificatePath: S.optional(S.String),
    DnsName: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterComputeInput",
}) as any as S.Schema<RegisterComputeInput>;
export interface RegisterComputeOutput {
  Compute?: Compute;
}
export const RegisterComputeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Compute: S.optional(Compute) }).pipe(ns),
).annotate({
  identifier: "RegisterComputeOutput",
}) as any as S.Schema<RegisterComputeOutput>;
export interface RegisterGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  InstanceId?: string;
  ConnectionInfo?: string;
  GameServerData?: string | redacted.Redacted<string>;
}
export const RegisterGameServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    ConnectionInfo: S.optional(S.String),
    GameServerData: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterGameServerInput",
}) as any as S.Schema<RegisterGameServerInput>;
export interface RegisterGameServerOutput {
  GameServer?: GameServer;
}
export const RegisterGameServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServer: S.optional(GameServer) }).pipe(ns),
).annotate({
  identifier: "RegisterGameServerOutput",
}) as any as S.Schema<RegisterGameServerOutput>;
export interface RequestUploadCredentialsInput {
  BuildId?: string;
}
export const RequestUploadCredentialsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BuildId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RequestUploadCredentialsInput",
}) as any as S.Schema<RequestUploadCredentialsInput>;
export interface RequestUploadCredentialsOutput {
  UploadCredentials?: AwsCredentials;
  StorageLocation?: S3Location;
}
export const RequestUploadCredentialsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UploadCredentials: S.optional(AwsCredentials),
    StorageLocation: S.optional(S3Location),
  }).pipe(ns),
).annotate({
  identifier: "RequestUploadCredentialsOutput",
}) as any as S.Schema<RequestUploadCredentialsOutput>;
export interface ResolveAliasInput {
  AliasId?: string;
}
export const ResolveAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResolveAliasInput",
}) as any as S.Schema<ResolveAliasInput>;
export interface ResolveAliasOutput {
  FleetId?: string;
  FleetArn?: string;
}
export const ResolveAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ResolveAliasOutput",
}) as any as S.Schema<ResolveAliasOutput>;
export interface ResumeGameServerGroupInput {
  GameServerGroupName?: string;
  ResumeActions?: GameServerGroupAction[];
}
export const ResumeGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    ResumeActions: S.optional(GameServerGroupActions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResumeGameServerGroupInput",
}) as any as S.Schema<ResumeGameServerGroupInput>;
export interface ResumeGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const ResumeGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "ResumeGameServerGroupOutput",
}) as any as S.Schema<ResumeGameServerGroupOutput>;
export interface SearchGameSessionsInput {
  FleetId?: string;
  AliasId?: string;
  Location?: string;
  FilterExpression?: string;
  SortExpression?: string;
  Limit?: number;
  NextToken?: string;
}
export const SearchGameSessionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    AliasId: S.optional(S.String),
    Location: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    SortExpression: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchGameSessionsInput",
}) as any as S.Schema<SearchGameSessionsInput>;
export interface SearchGameSessionsOutput {
  GameSessions?: (GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  })[];
  NextToken?: string;
}
export const SearchGameSessionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessions: S.optional(GameSessionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SearchGameSessionsOutput",
}) as any as S.Schema<SearchGameSessionsOutput>;
export interface StartFleetActionsInput {
  FleetId?: string;
  Actions?: FleetAction[];
  Location?: string;
}
export const StartFleetActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Actions: S.optional(FleetActionList),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartFleetActionsInput",
}) as any as S.Schema<StartFleetActionsInput>;
export interface StartFleetActionsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export const StartFleetActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "StartFleetActionsOutput",
}) as any as S.Schema<StartFleetActionsOutput>;
export interface DesiredPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerData?: string | redacted.Redacted<string>;
}
export const DesiredPlayerSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlayerId: S.optional(SensitiveString),
    PlayerData: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DesiredPlayerSession",
}) as any as S.Schema<DesiredPlayerSession>;
export type DesiredPlayerSessionList = DesiredPlayerSession[];
export const DesiredPlayerSessionList =
  /*@__PURE__*/ S.Array(DesiredPlayerSession);
export interface StartGameSessionPlacementInput {
  PlacementId?: string;
  GameSessionQueueName?: string;
  GameProperties?: GameProperty[];
  MaximumPlayerSessionCount?: number;
  GameSessionName?: string;
  PlayerLatencies?: PlayerLatency[];
  DesiredPlayerSessions?: DesiredPlayerSession[];
  GameSessionData?: string | redacted.Redacted<string>;
  PriorityConfigurationOverride?: PriorityConfigurationOverride;
}
export const StartGameSessionPlacementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlacementId: S.optional(S.String),
    GameSessionQueueName: S.optional(S.String),
    GameProperties: S.optional(GamePropertyList),
    MaximumPlayerSessionCount: S.optional(S.Number),
    GameSessionName: S.optional(S.String),
    PlayerLatencies: S.optional(PlayerLatencyList),
    DesiredPlayerSessions: S.optional(DesiredPlayerSessionList),
    GameSessionData: S.optional(SensitiveString),
    PriorityConfigurationOverride: S.optional(PriorityConfigurationOverride),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartGameSessionPlacementInput",
}) as any as S.Schema<StartGameSessionPlacementInput>;
export interface StartGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export const StartGameSessionPlacementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionPlacement: S.optional(GameSessionPlacement) }).pipe(ns),
).annotate({
  identifier: "StartGameSessionPlacementOutput",
}) as any as S.Schema<StartGameSessionPlacementOutput>;
export interface StartMatchBackfillInput {
  TicketId?: string;
  ConfigurationName?: string;
  GameSessionArn?: string;
  Players?: Player[];
}
export const StartMatchBackfillInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TicketId: S.optional(S.String),
    ConfigurationName: S.optional(S.String),
    GameSessionArn: S.optional(S.String),
    Players: S.optional(PlayerList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMatchBackfillInput",
}) as any as S.Schema<StartMatchBackfillInput>;
export interface StartMatchBackfillOutput {
  MatchmakingTicket?: MatchmakingTicket;
}
export const StartMatchBackfillOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MatchmakingTicket: S.optional(MatchmakingTicket) }).pipe(ns),
).annotate({
  identifier: "StartMatchBackfillOutput",
}) as any as S.Schema<StartMatchBackfillOutput>;
export interface StartMatchmakingInput {
  TicketId?: string;
  ConfigurationName?: string;
  Players?: Player[];
}
export const StartMatchmakingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TicketId: S.optional(S.String),
    ConfigurationName: S.optional(S.String),
    Players: S.optional(PlayerList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMatchmakingInput",
}) as any as S.Schema<StartMatchmakingInput>;
export interface StartMatchmakingOutput {
  MatchmakingTicket?: MatchmakingTicket;
}
export const StartMatchmakingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MatchmakingTicket: S.optional(MatchmakingTicket) }).pipe(ns),
).annotate({
  identifier: "StartMatchmakingOutput",
}) as any as S.Schema<StartMatchmakingOutput>;
export interface StopFleetActionsInput {
  FleetId?: string;
  Actions?: FleetAction[];
  Location?: string;
}
export const StopFleetActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Actions: S.optional(FleetActionList),
    Location: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopFleetActionsInput",
}) as any as S.Schema<StopFleetActionsInput>;
export interface StopFleetActionsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export const StopFleetActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "StopFleetActionsOutput",
}) as any as S.Schema<StopFleetActionsOutput>;
export interface StopGameSessionPlacementInput {
  PlacementId?: string;
}
export const StopGameSessionPlacementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlacementId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopGameSessionPlacementInput",
}) as any as S.Schema<StopGameSessionPlacementInput>;
export interface StopGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export const StopGameSessionPlacementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionPlacement: S.optional(GameSessionPlacement) }).pipe(ns),
).annotate({
  identifier: "StopGameSessionPlacementOutput",
}) as any as S.Schema<StopGameSessionPlacementOutput>;
export interface StopMatchmakingInput {
  TicketId?: string;
}
export const StopMatchmakingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TicketId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopMatchmakingInput",
}) as any as S.Schema<StopMatchmakingInput>;
export interface StopMatchmakingOutput {}
export const StopMatchmakingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopMatchmakingOutput",
}) as any as S.Schema<StopMatchmakingOutput>;
export interface SuspendGameServerGroupInput {
  GameServerGroupName?: string;
  SuspendActions?: GameServerGroupAction[];
}
export const SuspendGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    SuspendActions: S.optional(GameServerGroupActions),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SuspendGameServerGroupInput",
}) as any as S.Schema<SuspendGameServerGroupInput>;
export interface SuspendGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const SuspendGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "SuspendGameServerGroupOutput",
}) as any as S.Schema<SuspendGameServerGroupOutput>;
export interface TagResourceRequest {
  ResourceARN?: string;
  Tags?: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TerminationMode =
  | "TRIGGER_ON_PROCESS_TERMINATE"
  | "FORCE_TERMINATE"
  | (string & {});
export const TerminationMode = S.String;

export interface TerminateGameSessionInput {
  GameSessionId?: string;
  TerminationMode?: TerminationMode;
}
export const TerminateGameSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    TerminationMode: S.optional(TerminationMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateGameSessionInput",
}) as any as S.Schema<TerminateGameSessionInput>;
export interface TerminateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  };
}
export const TerminateGameSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSession: S.optional(GameSession) }).pipe(ns),
).annotate({
  identifier: "TerminateGameSessionOutput",
}) as any as S.Schema<TerminateGameSessionOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN?: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAliasInput {
  AliasId?: string;
  Name?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
}
export const UpdateAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AliasId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    RoutingStrategy: S.optional(RoutingStrategy),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAliasInput",
}) as any as S.Schema<UpdateAliasInput>;
export interface UpdateAliasOutput {
  Alias?: Alias;
}
export const UpdateAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Alias: S.optional(Alias) }).pipe(ns),
).annotate({
  identifier: "UpdateAliasOutput",
}) as any as S.Schema<UpdateAliasOutput>;
export interface UpdateBuildInput {
  BuildId?: string;
  Name?: string;
  Version?: string;
}
export const UpdateBuildInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BuildId: S.optional(S.String),
    Name: S.optional(S.String),
    Version: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBuildInput",
}) as any as S.Schema<UpdateBuildInput>;
export interface UpdateBuildOutput {
  Build?: Build;
}
export const UpdateBuildOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Build: S.optional(Build) }).pipe(ns),
).annotate({
  identifier: "UpdateBuildOutput",
}) as any as S.Schema<UpdateBuildOutput>;
export type ContainerFleetRemoveAttribute =
  | "PER_INSTANCE_CONTAINER_GROUP_DEFINITION"
  | (string & {});
export const ContainerFleetRemoveAttribute = S.String;

export type ContainerFleetRemoveAttributeList = ContainerFleetRemoveAttribute[];
export const ContainerFleetRemoveAttributeList = /*@__PURE__*/ S.Array(
  ContainerFleetRemoveAttribute,
);
export interface UpdateContainerFleetInput {
  FleetId?: string;
  GameServerContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  GameServerContainerGroupsPerInstance?: number;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissionAuthorizations?: IpPermission[];
  InstanceInboundPermissionRevocations?: IpPermission[];
  DeploymentConfiguration?: DeploymentConfiguration;
  Description?: string;
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  LogConfiguration?: LogConfiguration;
  RemoveAttributes?: ContainerFleetRemoveAttribute[];
}
export const UpdateContainerFleetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    GameServerContainerGroupDefinitionName: S.optional(S.String),
    PerInstanceContainerGroupDefinitionName: S.optional(S.String),
    GameServerContainerGroupsPerInstance: S.optional(S.Number),
    InstanceConnectionPortRange: S.optional(ConnectionPortRange),
    InstanceInboundPermissionAuthorizations: S.optional(IpPermissionsList),
    InstanceInboundPermissionRevocations: S.optional(IpPermissionsList),
    DeploymentConfiguration: S.optional(DeploymentConfiguration),
    Description: S.optional(S.String),
    MetricGroups: S.optional(MetricGroupList),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    GameSessionCreationLimitPolicy: S.optional(GameSessionCreationLimitPolicy),
    LogConfiguration: S.optional(LogConfiguration),
    RemoveAttributes: S.optional(ContainerFleetRemoveAttributeList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContainerFleetInput",
}) as any as S.Schema<UpdateContainerFleetInput>;
export interface UpdateContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export const UpdateContainerFleetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerFleet: S.optional(ContainerFleet) }).pipe(ns),
).annotate({
  identifier: "UpdateContainerFleetOutput",
}) as any as S.Schema<UpdateContainerFleetOutput>;
export interface UpdateContainerGroupDefinitionInput {
  Name?: string;
  GameServerContainerDefinition?: GameServerContainerDefinitionInput;
  SupportContainerDefinitions?: SupportContainerDefinitionInput[];
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  VersionDescription?: string;
  SourceVersionNumber?: number;
  OperatingSystem?: ContainerOperatingSystem;
}
export const UpdateContainerGroupDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    GameServerContainerDefinition: S.optional(
      GameServerContainerDefinitionInput,
    ),
    SupportContainerDefinitions: S.optional(
      SupportContainerDefinitionInputList,
    ),
    TotalMemoryLimitMebibytes: S.optional(S.Number),
    TotalVcpuLimit: S.optional(S.Number),
    VersionDescription: S.optional(S.String),
    SourceVersionNumber: S.optional(S.Number),
    OperatingSystem: S.optional(ContainerOperatingSystem),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContainerGroupDefinitionInput",
}) as any as S.Schema<UpdateContainerGroupDefinitionInput>;
export interface UpdateContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export const UpdateContainerGroupDefinitionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ContainerGroupDefinition: S.optional(ContainerGroupDefinition),
    }).pipe(ns),
).annotate({
  identifier: "UpdateContainerGroupDefinitionOutput",
}) as any as S.Schema<UpdateContainerGroupDefinitionOutput>;
export interface UpdateFleetAttributesInput {
  FleetId?: string;
  Name?: string;
  Description?: string;
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  AnywhereConfiguration?: AnywhereConfiguration;
}
export const UpdateFleetAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    NewGameSessionProtectionPolicy: S.optional(ProtectionPolicy),
    ResourceCreationLimitPolicy: S.optional(ResourceCreationLimitPolicy),
    MetricGroups: S.optional(MetricGroupList),
    AnywhereConfiguration: S.optional(AnywhereConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetAttributesInput",
}) as any as S.Schema<UpdateFleetAttributesInput>;
export interface UpdateFleetAttributesOutput {
  FleetId?: string;
  FleetArn?: string;
}
export const UpdateFleetAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateFleetAttributesOutput",
}) as any as S.Schema<UpdateFleetAttributesOutput>;
export interface UpdateFleetCapacityInput {
  FleetId?: string;
  DesiredInstances?: number;
  MinSize?: number;
  MaxSize?: number;
  Location?: string;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export const UpdateFleetCapacityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    DesiredInstances: S.optional(S.Number),
    MinSize: S.optional(S.Number),
    MaxSize: S.optional(S.Number),
    Location: S.optional(S.String),
    ManagedCapacityConfiguration: S.optional(ManagedCapacityConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetCapacityInput",
}) as any as S.Schema<UpdateFleetCapacityInput>;
export interface UpdateFleetCapacityOutput {
  FleetId?: string;
  FleetArn?: string;
  Location?: string;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export const UpdateFleetCapacityOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
    Location: S.optional(S.String),
    ManagedCapacityConfiguration: S.optional(ManagedCapacityConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "UpdateFleetCapacityOutput",
}) as any as S.Schema<UpdateFleetCapacityOutput>;
export interface UpdateFleetPortSettingsInput {
  FleetId?: string;
  InboundPermissionAuthorizations?: IpPermission[];
  InboundPermissionRevocations?: IpPermission[];
}
export const UpdateFleetPortSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    InboundPermissionAuthorizations: S.optional(IpPermissionsList),
    InboundPermissionRevocations: S.optional(IpPermissionsList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetPortSettingsInput",
}) as any as S.Schema<UpdateFleetPortSettingsInput>;
export interface UpdateFleetPortSettingsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export const UpdateFleetPortSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    FleetArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateFleetPortSettingsOutput",
}) as any as S.Schema<UpdateFleetPortSettingsOutput>;
export type GameServerHealthCheck = "HEALTHY" | (string & {});
export const GameServerHealthCheck = S.String;

export interface UpdateGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  GameServerData?: string | redacted.Redacted<string>;
  UtilizationStatus?: GameServerUtilizationStatus;
  HealthCheck?: GameServerHealthCheck;
}
export const UpdateGameServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    GameServerId: S.optional(S.String),
    GameServerData: S.optional(SensitiveString),
    UtilizationStatus: S.optional(GameServerUtilizationStatus),
    HealthCheck: S.optional(GameServerHealthCheck),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGameServerInput",
}) as any as S.Schema<UpdateGameServerInput>;
export interface UpdateGameServerOutput {
  GameServer?: GameServer;
}
export const UpdateGameServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServer: S.optional(GameServer) }).pipe(ns),
).annotate({
  identifier: "UpdateGameServerOutput",
}) as any as S.Schema<UpdateGameServerOutput>;
export interface UpdateGameServerGroupInput {
  GameServerGroupName?: string;
  RoleArn?: string;
  InstanceDefinitions?: InstanceDefinition[];
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  BalancingStrategy?: BalancingStrategy;
}
export const UpdateGameServerGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameServerGroupName: S.optional(S.String),
    RoleArn: S.optional(S.String),
    InstanceDefinitions: S.optional(InstanceDefinitions),
    GameServerProtectionPolicy: S.optional(GameServerProtectionPolicy),
    BalancingStrategy: S.optional(BalancingStrategy),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGameServerGroupInput",
}) as any as S.Schema<UpdateGameServerGroupInput>;
export interface UpdateGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export const UpdateGameServerGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameServerGroup: S.optional(GameServerGroup) }).pipe(ns),
).annotate({
  identifier: "UpdateGameServerGroupOutput",
}) as any as S.Schema<UpdateGameServerGroupOutput>;
export interface UpdateGameSessionInput {
  GameSessionId?: string;
  MaximumPlayerSessionCount?: number;
  Name?: string;
  PlayerSessionCreationPolicy?: PlayerSessionCreationPolicy;
  ProtectionPolicy?: ProtectionPolicy;
  GameProperties?: GameProperty[];
}
export const UpdateGameSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GameSessionId: S.optional(S.String),
    MaximumPlayerSessionCount: S.optional(S.Number),
    Name: S.optional(S.String),
    PlayerSessionCreationPolicy: S.optional(PlayerSessionCreationPolicy),
    ProtectionPolicy: S.optional(ProtectionPolicy),
    GameProperties: S.optional(GamePropertyList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGameSessionInput",
}) as any as S.Schema<UpdateGameSessionInput>;
export interface UpdateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  };
}
export const UpdateGameSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSession: S.optional(GameSession) }).pipe(ns),
).annotate({
  identifier: "UpdateGameSessionOutput",
}) as any as S.Schema<UpdateGameSessionOutput>;
export interface UpdateGameSessionQueueInput {
  Name?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
}
export const UpdateGameSessionQueueInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    TimeoutInSeconds: S.optional(S.Number),
    PlayerLatencyPolicies: S.optional(PlayerLatencyPolicyList),
    Destinations: S.optional(GameSessionQueueDestinationList),
    FilterConfiguration: S.optional(FilterConfiguration),
    PriorityConfiguration: S.optional(PriorityConfiguration),
    CustomEventData: S.optional(SensitiveString),
    NotificationTarget: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGameSessionQueueInput",
}) as any as S.Schema<UpdateGameSessionQueueInput>;
export interface UpdateGameSessionQueueOutput {
  GameSessionQueue?: GameSessionQueue;
}
export const UpdateGameSessionQueueOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GameSessionQueue: S.optional(GameSessionQueue) }).pipe(ns),
).annotate({
  identifier: "UpdateGameSessionQueueOutput",
}) as any as S.Schema<UpdateGameSessionQueueOutput>;
export interface UpdateMatchmakingConfigurationInput {
  Name?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
}
export const UpdateMatchmakingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    GameSessionQueueArns: S.optional(QueueArnsList),
    RequestTimeoutSeconds: S.optional(S.Number),
    AcceptanceTimeoutSeconds: S.optional(S.Number),
    AcceptanceRequired: S.optional(S.Boolean),
    RuleSetName: S.optional(S.String),
    NotificationTarget: S.optional(S.String),
    AdditionalPlayerCount: S.optional(S.Number),
    CustomEventData: S.optional(SensitiveString),
    GameProperties: S.optional(GamePropertyList),
    GameSessionData: S.optional(SensitiveString),
    BackfillMode: S.optional(BackfillMode),
    FlexMatchMode: S.optional(FlexMatchMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMatchmakingConfigurationInput",
}) as any as S.Schema<UpdateMatchmakingConfigurationInput>;
export interface UpdateMatchmakingConfigurationOutput {
  Configuration?: MatchmakingConfiguration & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
  };
}
export const UpdateMatchmakingConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Configuration: S.optional(MatchmakingConfiguration) }).pipe(ns),
).annotate({
  identifier: "UpdateMatchmakingConfigurationOutput",
}) as any as S.Schema<UpdateMatchmakingConfigurationOutput>;
export interface UpdateRuntimeConfigurationInput {
  FleetId?: string;
  RuntimeConfiguration?: RuntimeConfiguration;
}
export const UpdateRuntimeConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetId: S.optional(S.String),
    RuntimeConfiguration: S.optional(RuntimeConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRuntimeConfigurationInput",
}) as any as S.Schema<UpdateRuntimeConfigurationInput>;
export interface UpdateRuntimeConfigurationOutput {
  RuntimeConfiguration?: RuntimeConfiguration & {
    ServerProcesses: (ServerProcess & {
      LaunchPath: LaunchPathStringModel;
      ConcurrentExecutions: PositiveInteger;
    })[];
  };
}
export const UpdateRuntimeConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuntimeConfiguration: S.optional(RuntimeConfiguration) }).pipe(ns),
).annotate({
  identifier: "UpdateRuntimeConfigurationOutput",
}) as any as S.Schema<UpdateRuntimeConfigurationOutput>;
export interface UpdateScriptInput {
  ScriptId?: string;
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  ZipFile?: Uint8Array;
}
export const UpdateScriptInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScriptId: S.optional(S.String),
    Name: S.optional(S.String),
    Version: S.optional(S.String),
    StorageLocation: S.optional(S3Location),
    ZipFile: S.optional(T.Blob),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScriptInput",
}) as any as S.Schema<UpdateScriptInput>;
export interface UpdateScriptOutput {
  Script?: Script;
}
export const UpdateScriptOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Script: S.optional(Script) }).pipe(ns),
).annotate({
  identifier: "UpdateScriptOutput",
}) as any as S.Schema<UpdateScriptOutput>;
export interface ValidateMatchmakingRuleSetInput {
  RuleSetBody?: string;
}
export const ValidateMatchmakingRuleSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetBody: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidateMatchmakingRuleSetInput",
}) as any as S.Schema<ValidateMatchmakingRuleSetInput>;
export interface ValidateMatchmakingRuleSetOutput {
  Valid?: boolean;
}
export const ValidateMatchmakingRuleSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Valid: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "ValidateMatchmakingRuleSetOutput",
}) as any as S.Schema<ValidateMatchmakingRuleSetOutput>;
export type AcceptMatchError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Registers a player's acceptance or rejection of a proposed FlexMatch match. A
 * matchmaking configuration may require player acceptance; if so, then matches built with
 * that configuration cannot be completed unless all players accept the proposed match
 * within a specified time limit.
 *
 * When FlexMatch builds a match, all the matchmaking tickets involved in the proposed
 * match are placed into status `REQUIRES_ACCEPTANCE`. This is a trigger for
 * your game to get acceptance from all players in each ticket. Calls to this action are only valid
 * for tickets that are in this status; calls for tickets not in this status result in an
 * error.
 *
 * To register acceptance, specify the ticket ID, one or more players, and an acceptance response.
 * When all players have accepted, Amazon GameLift Servers advances the matchmaking tickets to status
 * `PLACING`, and attempts to create a new game session for the match.
 *
 * If any player rejects the match, or if acceptances are not received before a specified
 * timeout, the proposed match is dropped. Each matchmaking ticket in the failed match is handled as follows:
 *
 * - If the ticket has one or more players who rejected the match or failed to
 * respond, the ticket status is set `CANCELLED` and processing is
 * terminated.
 *
 * - If all players in the ticket accepted the match, the ticket
 * status is returned to `SEARCHING` to find a new match.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * FlexMatch events (reference)
 */
export const acceptMatch: API.OperationMethod<
  AcceptMatchInput,
  AcceptMatchOutput,
  AcceptMatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptMatchInput,
  output: AcceptMatchOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptMatch",
}));

export type ClaimGameServerError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | OutOfCapacityException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Locates an available game server and
 * temporarily reserves it to host gameplay and players. This operation is called from a
 * game client or client service (such as a matchmaker) to request hosting resources for a
 * new game session. In response, Amazon GameLift Servers FleetIQ locates an available game server, places it in
 * `CLAIMED` status for 60 seconds, and returns connection information that
 * players can use to connect to the game server.
 *
 * To claim a game server, identify a game server group. You can also specify a game
 * server ID, although this approach bypasses Amazon GameLift Servers FleetIQ placement optimization. Optionally,
 * include game data to pass to the game server at the start of a game session, such as a
 * game map or player information. Add filter options to further restrict how a
 * game server is chosen, such as only allowing game servers on `ACTIVE` instances
 * to be claimed.
 *
 * When a game server is successfully claimed, connection information is returned. A
 * claimed game server's utilization status remains `AVAILABLE` while the claim
 * status is set to `CLAIMED` for up to 60 seconds. This time period gives the
 * game server time to update its status to `UTILIZED` after players join. If
 * the game server's status is not updated within 60 seconds, the game server reverts to
 * unclaimed status and is available to be claimed by another request. The claim time
 * period is a fixed value and is not configurable.
 *
 * If you try to claim a specific game server, this request will fail in the following
 * cases:
 *
 * - If the game server utilization status is `UTILIZED`.
 *
 * - If the game server claim status is `CLAIMED`.
 *
 * - If the game server is running on an instance in `DRAINING` status and
 * the provided filter option does not allow placing on `DRAINING` instances.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const claimGameServer: API.OperationMethod<
  ClaimGameServerInput,
  ClaimGameServerOutput,
  ClaimGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ClaimGameServerInput,
  output: ClaimGameServerOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    OutOfCapacityException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClaimGameServer",
}));

export type CreateAliasError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates an alias for a fleet. In most situations, you can use an alias ID in place of
 * a fleet ID. An alias provides a level of abstraction for a fleet that is useful when
 * redirecting player traffic from one fleet to another, such as when updating your game
 * build.
 *
 * Amazon GameLift Servers supports two types of routing strategies for aliases: simple and terminal. A
 * simple alias points to an active fleet. A terminal alias is used to display messaging or
 * link to a URL instead of routing players to an active fleet. For example, you might use
 * a terminal alias when a game version is no longer supported and you want to direct
 * players to an upgrade site.
 *
 * To create a fleet alias, specify an alias name, routing strategy, and optional
 * description. Each simple alias can point to only one fleet, but a fleet can have
 * multiple aliases. If successful, a new alias record is returned, including an alias ID
 * and an ARN. You can reassign an alias to another fleet by calling
 * `UpdateAlias`.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createAlias: API.OperationMethod<
  CreateAliasInput,
  CreateAliasOutput,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAliasInput,
  output: CreateAliasOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
}));

export type CreateBuildError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Creates a new Amazon GameLift Servers build resource for your game server binary files. Combine game
 * server binaries into a zip file for use with Amazon GameLift Servers.
 *
 * When setting up a new game build for Amazon GameLift Servers, we recommend using the CLI command
 * upload-build
 * . This helper command combines two tasks: (1) it
 * uploads your build files from a file directory to an Amazon GameLift Servers Amazon S3 location, and (2)
 * it creates a new build resource.
 *
 * You can use the `CreateBuild` operation in the following scenarios:
 *
 * - Create a new game build with build files that are in an Amazon S3 location under an
 * Amazon Web Services account that you control. To use this option, you give Amazon GameLift Servers access to
 * the Amazon S3 bucket. With permissions in place, specify a build name, operating
 * system, and the Amazon S3 storage location of your game build.
 *
 * - Upload your build files to a Amazon GameLift Servers Amazon S3 location. To use this option,
 * specify a build name and operating system. This operation creates a new build
 * resource and also returns an Amazon S3 location with temporary access credentials.
 * Use the credentials to manually upload your build files to the specified Amazon S3
 * location. For more information, see Uploading Objects in
 * the *Amazon S3 Developer Guide*. After you upload build files to
 * the Amazon GameLift Servers Amazon S3 location, you can't update them.
 *
 * If successful, this operation creates a new build resource with a unique build ID and
 * places it in `INITIALIZED` status. A build must be in `READY`
 * status before you can create fleets with it.
 *
 * **Learn more**
 *
 * Uploading Your
 * Game
 *
 * Create a Build with Files in Amazon S3
 *
 * All APIs by task
 */
export const createBuild: API.OperationMethod<
  CreateBuildInput,
  CreateBuildOutput,
  CreateBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBuildInput,
  output: CreateBuildOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBuild",
}));

export type CreateContainerFleetError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Creates a managed fleet of Amazon Elastic Compute Cloud (Amazon EC2) instances to host your containerized game
 * servers. Use this operation to define how to deploy a container architecture onto each
 * fleet instance and configure fleet settings. You can create a container fleet in any
 * Amazon Web Services Regions that Amazon GameLift Servers supports for multi-location fleets. A container fleet can be
 * deployed to a single location or multiple locations. Container fleets are deployed with
 * Amazon Linux 2023 as the instance operating system.
 *
 * Define the fleet's container architecture using container group definitions. Each
 * fleet can have one of the following container group types:
 *
 * - The game server container group runs your game server build and dependent software. Amazon GameLift Servers
 * deploys one or more replicas of this container group to each fleet instance. The
 * number of replicas depends on the computing capabilities of the fleet instance
 * in use.
 *
 * - An optional per-instance container group might be used to run other software that only needs
 * to run once per instance, such as background services, logging, or test
 * processes. One per-instance container group is deployed to each fleet instance.
 *
 * Each container group can include the definition for one or more containers. A
 * container definition specifies a container image that is stored in an Amazon Elastic Container Registry (Amazon ECR)
 * public or private repository.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests. Most fleet settings have
 * default values, so you can create a working fleet with a minimal configuration and
 * default values, which you can customize later.
 *
 * - Create a fleet with no container groups. You can configure a container fleet and then add
 * container group definitions later. In this scenario, no fleet instances are
 * deployed, and the fleet can't host game sessions until you add a game server
 * container group definition. Provide the following required parameter
 * values:
 *
 * - `FleetRoleArn`
 *
 * - Create a fleet with a game server container group. Provide the following required parameter
 * values:
 *
 * - `FleetRoleArn`
 *
 * - `GameServerContainerGroupDefinitionName`
 *
 * - Create a fleet with a game server container group and a per-instance container group. Provide
 * the following required parameter values:
 *
 * - `FleetRoleArn`
 *
 * - `GameServerContainerGroupDefinitionName`
 *
 * - `PerInstanceContainerGroupDefinitionName`
 *
 * **Results**
 *
 * If successful, this operation creates a new container fleet resource, places it in
 * `PENDING` status, and initiates the fleet creation workflow. For fleets with container groups, this workflow
 * starts a fleet deployment and transitions the status to `ACTIVE`. Fleets
 * without a container group are placed in `CREATED` status.
 *
 * You can update most of the properties of a fleet, including container group
 * definitions, and deploy the update across all fleet instances. Use
 * UpdateContainerFleet
 * to deploy a new game server version update across the container fleet.
 *
 * A managed fleet's runtime environment depends on the Amazon Machine Image (AMI)
 * version it uses. When a new fleet is created, Amazon GameLift Servers assigns the
 * latest available AMI version to the fleet, and all compute instances in that fleet
 * are deployed with that version. To update the AMI version, you must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 */
export const createContainerFleet: API.OperationMethod<
  CreateContainerFleetInput,
  CreateContainerFleetOutput,
  CreateContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerFleetInput,
  output: CreateContainerFleetOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerFleet",
}));

export type CreateContainerGroupDefinitionError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Creates a `ContainerGroupDefinition` that describes a set of containers for
 * hosting your game server with Amazon GameLift Servers managed containers hosting. An Amazon GameLift Servers container group
 * is similar to a container task or pod. Use container group definitions when you create a
 * container fleet with CreateContainerFleet.
 *
 * A container group definition determines how Amazon GameLift Servers deploys your containers to each
 * instance in a container fleet. You can maintain multiple versions of a container group
 * definition.
 *
 * There are two types of container groups:
 *
 * - A **game server container group** has the containers that run
 * your game server application and supporting software. A game server container group can
 * have these container types:
 *
 * - Game server container. This container runs your game server. You can define one
 * game server container in a game server container group.
 *
 * - Support container. This container runs software in parallel with your game server.
 * You can define up to 8 support containers in a game server group.
 *
 * When building a game server container group definition, you can choose to bundle your
 * game server executable and all dependent software into a single game server container.
 * Alternatively, you can separate the software into one game server container and one or
 * more support containers.
 *
 * On a container fleet instance, a game server container group can be deployed multiple
 * times (depending on the compute resources of the instance). This means that all containers
 * in the container group are replicated together.
 *
 * - A **per-instance container group** has containers for processes
 * that aren't replicated on a container fleet instance. This might include background
 * services, logging, test processes, or processes that need to persist independently of the
 * game server container group. When building a per-instance container group, you can define
 * up to 10 support containers.
 *
 * This operation requires Identity and Access Management (IAM) permissions to access container images in
 * Amazon ECR repositories. See IAM permissions
 * for Amazon GameLift Servers for help setting the appropriate permissions.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests. You can specify values for the
 * minimum required parameters and customize optional values later.
 *
 * - Create a game server container group definition. Provide the following required parameter values:
 *
 * - `Name`
 *
 * - `ContainerGroupType` (`GAME_SERVER`)
 *
 * - `OperatingSystem`
 *
 * - `TotalMemoryLimitMebibytes`
 *
 * - `TotalVcpuLimit`
 *
 * - At least one `GameServerContainerDefinition`
 *
 * - `ContainerName`
 *
 * - `ImageUrl`
 *
 * - `PortConfiguration`
 *
 * - `ServerSdkVersion`
 *
 * - Create a per-instance container group definition. Provide the following required parameter
 * values:
 *
 * - `Name`
 *
 * - `ContainerGroupType` (`PER_INSTANCE`)
 *
 * - `OperatingSystem`
 *
 * - `TotalMemoryLimitMebibytes`
 *
 * - `TotalVcpuLimit`
 *
 * - At least one `SupportContainerDefinition`
 *
 * - `ContainerName`
 *
 * - `ImageUrl`
 *
 * **Results**
 *
 * If successful, this request creates a `ContainerGroupDefinition` resource and
 * assigns a unique ARN value. You can update most properties of a container group definition by
 * calling UpdateContainerGroupDefinition, and optionally save the update as a new version.
 */
export const createContainerGroupDefinition: API.OperationMethod<
  CreateContainerGroupDefinitionInput,
  CreateContainerGroupDefinitionOutput,
  CreateContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerGroupDefinitionInput,
  output: CreateContainerGroupDefinitionOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerGroupDefinition",
}));

export type CreateFleetError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a fleet of compute resources to host your game servers. Use this operation to
 * set up a fleet for the following compute types:
 *
 * **Managed EC2 fleet**
 *
 * An EC2 fleet is a set of Amazon Elastic Compute Cloud (Amazon EC2) instances. Your game server build is
 * deployed to each fleet instance. Amazon GameLift Servers manages the fleet's instances and controls the
 * lifecycle of game server processes, which host game sessions for players. EC2 fleets can
 * have instances in multiple locations. Each instance in the fleet is designated a
 * `Compute`.
 *
 * To create an EC2 fleet, provide these required parameters:
 *
 * - Either `BuildId` or `ScriptId`
 *
 * - `ComputeType` set to `EC2` (the default value)
 *
 * - `EC2InboundPermissions`
 *
 * - `EC2InstanceType`
 *
 * - `FleetType`
 *
 * - `Name`
 *
 * - `RuntimeConfiguration` with at least one `ServerProcesses`
 * configuration
 *
 * If successful, this operation creates a new fleet resource and places it in
 * `NEW` status while Amazon GameLift Servers initiates the fleet creation workflow. To debug your fleet, fetch logs, view performance
 * metrics or other actions on the fleet, create a development fleet with port 22/3389
 * open. As a best practice, we recommend opening ports for remote access only when you
 * need them and closing them when you're finished.
 *
 * When the fleet status is ACTIVE, you can adjust capacity settings and turn autoscaling
 * on/off for each location.
 *
 * A managed fleet's runtime environment depends on the Amazon Machine Image (AMI)
 * version it uses. When a new fleet is created, Amazon GameLift Servers assigns the
 * latest available AMI version to the fleet, and all compute instances in that fleet
 * are deployed with that version. To update the AMI version, you must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Anywhere fleet**
 *
 * An Anywhere fleet represents compute resources that are not owned or managed by
 * Amazon GameLift Servers. You might create an Anywhere fleet with your local machine for testing, or use
 * one to host game servers with on-premises hardware or other game hosting solutions.
 *
 * To create an Anywhere fleet, provide these required parameters:
 *
 * - `ComputeType` set to `ANYWHERE`
 *
 * - `Locations` specifying a custom location
 *
 * - `Name`
 *
 * If successful, this operation creates a new fleet resource and places it in
 * `ACTIVE` status. You can register computes with a fleet in
 * `ACTIVE` status.
 *
 * **Learn more**
 *
 * Setting up
 * fleets
 *
 * Debug fleet creation issues
 *
 * Multi-location fleets
 */
export const createFleet: API.OperationMethod<
  CreateFleetInput,
  CreateFleetOutput,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetInput,
  output: CreateFleetOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
}));

export type CreateFleetLocationsError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Adds remote locations to an EC2 and begins populating the new locations with
 * instances. The new instances conform to the fleet's instance type, auto-scaling, and
 * other configuration settings.
 *
 * You can't add remote locations to a fleet that resides in an Amazon Web Services Region that
 * doesn't support multiple locations. Fleets created prior to March 2021 can't support
 * multiple locations.
 *
 * To add fleet locations, specify the fleet to be updated and provide a list of one or
 * more locations.
 *
 * If successful, this operation returns the list of added locations with their status
 * set to `NEW`. Amazon GameLift Servers initiates the process of starting an instance in each
 * added location. You can track the status of each new location by monitoring location
 * creation events using DescribeFleetEvents.
 *
 * **Learn more**
 *
 * Setting up
 * fleets
 *
 * Update fleet locations
 *
 * Amazon GameLift Servers service locations for managed hosting.
 */
export const createFleetLocations: API.OperationMethod<
  CreateFleetLocationsInput,
  CreateFleetLocationsOutput,
  CreateFleetLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetLocationsInput,
  output: CreateFleetLocationsOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetLocations",
}));

export type CreateGameServerGroupError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Creates a Amazon GameLift Servers FleetIQ game server
 * group for managing game hosting on a collection of Amazon Elastic Compute Cloud instances for game hosting.
 * This operation creates the game server group, creates an Auto Scaling group in your
 * Amazon Web Services account, and establishes a link between the two groups. You can view the status of
 * your game server groups in the Amazon GameLift Servers console. Game server group metrics and events are
 * emitted to Amazon CloudWatch.
 *
 * Before creating a new game server group, you must have the following:
 *
 * - An Amazon Elastic Compute Cloud launch template that specifies how to launch Amazon Elastic Compute Cloud instances
 * with your game server build. For more information, see Launching an Instance from a Launch Template in the
 * *Amazon Elastic Compute Cloud User Guide*.
 *
 * - An IAM role that extends limited access to your Amazon Web Services account to allow Amazon GameLift Servers FleetIQ
 * to create and interact with the Auto Scaling group. For more information, see
 * Create IAM
 * roles for cross-service interaction in the Amazon GameLift Servers FleetIQ Developer
 * Guide.
 *
 * To create a new game server group, specify a unique group name, IAM role and Amazon Elastic Compute Cloud
 * launch template, and provide a list of instance types that can be used in the group. You
 * must also set initial maximum and minimum limits on the group's instance count. You can
 * optionally set an Auto Scaling policy with target tracking based on a Amazon GameLift Servers FleetIQ
 * metric.
 *
 * Once the game server group and corresponding Auto Scaling group are created, you have
 * full access to change the Auto Scaling group's configuration as needed. Several
 * properties that are set when creating a game server group, including maximum/minimum
 * size and auto-scaling policy settings, must be updated directly in the Auto Scaling
 * group. Keep in mind that some Auto Scaling group properties are periodically updated by
 * Amazon GameLift Servers FleetIQ as part of its balancing activities to optimize for availability and cost.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const createGameServerGroup: API.OperationMethod<
  CreateGameServerGroupInput,
  CreateGameServerGroupOutput,
  CreateGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGameServerGroupInput,
  output: CreateGameServerGroupOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameServerGroup",
}));

export type CreateGameSessionError =
  | ConflictException
  | FleetCapacityExceededException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a multiplayer game session for players in a specific fleet location. This
 * operation prompts an available server process to start a game session and retrieves
 * connection information for the new game session. As an alternative, consider using the
 * Amazon GameLift Servers game session placement feature with StartGameSessionPlacement, which uses the FleetIQ algorithm and queues to
 * optimize the placement process.
 *
 * When creating a game session, you specify exactly where you want to place it and
 * provide a set of game session configuration settings. The target fleet must be in
 * `ACTIVE` status.
 *
 * You can use this operation in the following ways:
 *
 * - To create a game session on an instance in a fleet's home Region, provide a
 * fleet or alias ID along with your game session configuration.
 *
 * - To create a game session on an instance in a fleet's remote location, provide
 * a fleet or alias ID and a location name, along with your game session
 * configuration.
 *
 * - To create a game session on an instance in an Anywhere fleet, specify the
 * fleet's custom location.
 *
 * If successful, Amazon GameLift Servers initiates a workflow to start a new game session and returns a
 * `GameSession` object containing the game session configuration and
 * status. When the game session status is `ACTIVE`, it is updated with
 * connection information and you can create player sessions for the game session. By
 * default, newly created game sessions are open to new players. You can restrict new
 * player access by using UpdateGameSession to change the game session's player session creation
 * policy.
 *
 * Amazon GameLift Servers retains logs for active for 14 days. To access the logs, call GetGameSessionLogUrl to download the log files.
 *
 * *Available in Amazon GameLift Servers Local.*
 *
 * **Learn more**
 *
 * Start a game session
 *
 * All APIs by task
 */
export const createGameSession: API.OperationMethod<
  CreateGameSessionInput,
  CreateGameSessionOutput,
  CreateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGameSessionInput,
  output: CreateGameSessionOutput,
  errors: [
    ConflictException,
    FleetCapacityExceededException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameSession",
}));

export type CreateGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a placement queue that processes requests for new game sessions. A queue uses
 * FleetIQ algorithms to locate the best available placement locations for a new game
 * session, and then prompts the game server process to start a new game session.
 *
 * A game session queue is configured with a set of destinations (Amazon GameLift Servers fleets or
 * aliases) that determine where the queue can place new game sessions. These destinations
 * can span multiple Amazon Web Services Regions, can use different instance types, and can include both
 * Spot and On-Demand fleets. If the queue includes multi-location fleets, the queue can
 * place game sessions in any of a fleet's remote locations.
 *
 * You can configure a queue to determine how it selects the best available placement for
 * a new game session. Queues can prioritize placement decisions based on a combination of
 * location, hosting cost, and player latency. You can set up the queue to use the default
 * prioritization or provide alternate instructions using
 * `PriorityConfiguration`.
 *
 * **Request options**
 *
 * Use this operation to make these common types of requests.
 *
 * - Create a queue with the minimum required parameters.
 *
 * - `Name`
 *
 * - `Destinations` (This parameter isn't required, but a queue
 * can't make placements without at least one destination.)
 *
 * - Create a queue with placement notification. Queues that have high placement
 * activity must use a notification system, such as with Amazon Simple Notification Service (Amazon SNS) or Amazon CloudWatch.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `NotificationTarget`
 *
 * - Create a queue with custom prioritization settings. These custom settings
 * replace the default prioritization configuration for a queue.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `PriorityConfiguration`
 *
 * - Create a queue with special rules for processing player latency data.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `PlayerLatencyPolicies`
 *
 * **Results**
 *
 * If successful, this operation returns a new `GameSessionQueue` object with
 * an assigned queue ARN. Use the queue's name or ARN when submitting new game session
 * requests with StartGameSessionPlacement or StartMatchmaking.
 *
 * **Learn more**
 *
 * Design a game session queue
 *
 * Create a game session queue
 *
 * **Related actions**
 *
 * CreateGameSessionQueue
 * |
 * DescribeGameSessionQueues
 * |
 * UpdateGameSessionQueue
 * |
 * DeleteGameSessionQueue
 * |
 * All APIs by task
 */
export const createGameSessionQueue: API.OperationMethod<
  CreateGameSessionQueueInput,
  CreateGameSessionQueueOutput,
  CreateGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGameSessionQueueInput,
  output: CreateGameSessionQueueOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameSessionQueue",
}));

export type CreateLocationError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Creates a custom location for use in an Anywhere fleet.
 */
export const createLocation: API.OperationMethod<
  CreateLocationInput,
  CreateLocationOutput,
  CreateLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLocationInput,
  output: CreateLocationOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocation",
}));

export type CreateMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Defines a new matchmaking configuration for use with FlexMatch. Whether your are using
 * FlexMatch with Amazon GameLift Servers hosting or as a standalone matchmaking service, the matchmaking
 * configuration sets out rules for matching players and forming teams. If you're also
 * using Amazon GameLift Servers hosting, it defines how to start game sessions for each match. Your
 * matchmaking system can use multiple configurations to handle different game scenarios.
 * All matchmaking requests identify the matchmaking configuration to use and provide
 * player attributes consistent with that configuration.
 *
 * To create a matchmaking configuration, you must provide the following: configuration
 * name and FlexMatch mode (with or without Amazon GameLift Servers hosting); a rule set that specifies how
 * to evaluate players and find acceptable matches; whether player acceptance is required;
 * and the maximum time allowed for a matchmaking attempt. When using FlexMatch with Amazon GameLift Servers
 * hosting, you also need to identify the game session queue to use when starting a game
 * session for the match.
 *
 * In addition, you must set up an Amazon Simple Notification Service topic to receive matchmaking notifications.
 * Provide the topic ARN in the matchmaking configuration.
 *
 * **Learn more**
 *
 * Design a FlexMatch
 * matchmaker
 *
 * Set up FlexMatch event
 * notification
 */
export const createMatchmakingConfiguration: API.OperationMethod<
  CreateMatchmakingConfigurationInput,
  CreateMatchmakingConfigurationOutput,
  CreateMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMatchmakingConfigurationInput,
  output: CreateMatchmakingConfigurationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchmakingConfiguration",
}));

export type CreateMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a new rule set for FlexMatch matchmaking. A rule set describes the type of match
 * to create, such as the number and size of teams. It also sets the parameters for
 * acceptable player matches, such as minimum skill level or character type.
 *
 * To create a matchmaking rule set, provide unique rule set name and the rule set body
 * in JSON format. Rule sets must be defined in the same Region as the matchmaking
 * configuration they are used with.
 *
 * Since matchmaking rule sets cannot be edited, it is a good idea to check the rule set
 * syntax using ValidateMatchmakingRuleSet before creating a new rule set.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 *
 * - Design a
 * matchmaker
 *
 * - Matchmaking with
 * FlexMatch
 */
export const createMatchmakingRuleSet: API.OperationMethod<
  CreateMatchmakingRuleSetInput,
  CreateMatchmakingRuleSetOutput,
  CreateMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMatchmakingRuleSetInput,
  output: CreateMatchmakingRuleSetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchmakingRuleSet",
}));

export type CreatePlayerSessionError =
  | GameSessionFullException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Reserves an open player slot in a game session for a player. New player sessions can
 * be created in any game session with an open slot that is in `ACTIVE` status
 * and has a player creation policy of `ACCEPT_ALL`. You can add a group of
 * players to a game session with CreatePlayerSessions .
 *
 * To create a player session, specify a game session ID, player ID, and optionally a set
 * of player data.
 *
 * If successful, a slot is reserved in the game session for the player and a new
 * `PlayerSessions` object is returned with a player session ID. The player
 * references the player session ID when sending a connection request to the game session,
 * and the game server can use it to validate the player reservation with the Amazon GameLift Servers
 * service. Player sessions cannot be updated.
 *
 * The maximum number of players per game session is 200. It is not adjustable.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createPlayerSession: API.OperationMethod<
  CreatePlayerSessionInput,
  CreatePlayerSessionOutput,
  CreatePlayerSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePlayerSessionInput,
  output: CreatePlayerSessionOutput,
  errors: [
    GameSessionFullException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlayerSession",
}));

export type CreatePlayerSessionsError =
  | GameSessionFullException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Reserves open slots in a game session for a group of players. New player sessions can
 * be created in any game session with an open slot that is in `ACTIVE` status
 * and has a player creation policy of `ACCEPT_ALL`. To add a single player to a
 * game session, use CreatePlayerSession
 *
 * To create player sessions, specify a game session ID and a list of player IDs.
 * Optionally, provide a set of player data for each player ID.
 *
 * If successful, a slot is reserved in the game session for each player, and new
 * `PlayerSession` objects are returned with player session IDs. Each player
 * references their player session ID when sending a connection request to the game
 * session, and the game server can use it to validate the player reservation with the
 * Amazon GameLift Servers service. Player sessions cannot be updated.
 *
 * The maximum number of players per game session is 200. It is not adjustable.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createPlayerSessions: API.OperationMethod<
  CreatePlayerSessionsInput,
  CreatePlayerSessionsOutput,
  CreatePlayerSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePlayerSessionsInput,
  output: CreatePlayerSessionsOutput,
  errors: [
    GameSessionFullException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlayerSessions",
}));

export type CreateScriptError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Creates a new script record for your Amazon GameLift Servers Realtime script. Realtime scripts are JavaScript that
 * provide configuration settings and optional custom game logic for your game. The script
 * is deployed when you create a Amazon GameLift Servers Realtime fleet to host your game sessions. Script logic is
 * executed during an active game session.
 *
 * To create a new script record, specify a script name and provide the script file(s).
 * The script files and all dependencies must be zipped into a single file. You can pull
 * the zip file from either of these locations:
 *
 * - A locally available directory. Use the *ZipFile* parameter
 * for this option.
 *
 * - An Amazon Simple Storage Service (Amazon S3) bucket under your Amazon Web Services account. Use the
 * *StorageLocation* parameter for this option. You'll need
 * to have an Identity Access Management (IAM) role that allows the Amazon GameLift Servers service
 * to access your S3 bucket.
 *
 * If the call is successful, a new script record is created with a unique script ID. If
 * the script file is provided as a local file, the file is uploaded to an Amazon GameLift Servers-owned S3
 * bucket and the script record's storage location reflects this location. If the script
 * file is provided as an S3 bucket, Amazon GameLift Servers accesses the file at this storage location as
 * needed for deployment.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * Set Up a Role for Amazon GameLift Servers Access
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createScript: API.OperationMethod<
  CreateScriptInput,
  CreateScriptOutput,
  CreateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScriptInput,
  output: CreateScriptOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScript",
}));

export type CreateVpcPeeringAuthorizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Requests authorization to create or delete a peer connection between the VPC for your
 * Amazon GameLift Servers fleet and a virtual private cloud (VPC) in your Amazon Web Services account. VPC peering enables the game servers on
 * your fleet to communicate directly with other Amazon Web Services resources. After you've received
 * authorization, use CreateVpcPeeringConnection to establish the peering connection. For more
 * information, see VPC Peering with Amazon GameLift Servers
 * Fleets.
 *
 * You can peer with VPCs that are owned by any Amazon Web Services account you have access to,
 * including the account that you use to manage your Amazon GameLift Servers fleets. You cannot peer with
 * VPCs that are in different Regions.
 *
 * To request authorization to create a connection, call this operation from the Amazon Web Services
 * account with the VPC that you want to peer to your Amazon GameLift Servers fleet. For example, to enable
 * your game servers to retrieve data from a DynamoDB table, use the account that manages
 * that DynamoDB resource. Identify the following values: (1) The ID of the VPC that you
 * want to peer with, and (2) the ID of the Amazon Web Services account that you use to manage Amazon GameLift Servers. If
 * successful, VPC peering is authorized for the specified VPC.
 *
 * To request authorization to delete a connection, call this operation from the Amazon Web Services
 * account with the VPC that is peered with your Amazon GameLift Servers fleet. Identify the following
 * values: (1) VPC ID that you want to delete the peering connection for, and (2) ID of the
 * Amazon Web Services account that you use to manage Amazon GameLift Servers.
 *
 * The authorization remains valid for 24 hours unless it is canceled. You must create or
 * delete the peering connection while the authorization is valid.
 *
 * Amazon GameLift Servers uses the caller's credentials to update peer-VPC resources. The IAM user
 * that calls this operation must have the following Amazon EC2 permissions enabled:
 *
 * - `ec2:AcceptVpcPeeringConnection`
 *
 * - `ec2:AuthorizeSecurityGroupEgress`
 *
 * - `ec2:AuthorizeSecurityGroupIngress`
 *
 * - `ec2:CreateRoute`
 *
 * - `ec2:DescribeRouteTables`
 *
 * - `ec2:DescribeSecurityGroups`
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createVpcPeeringAuthorization: API.OperationMethod<
  CreateVpcPeeringAuthorizationInput,
  CreateVpcPeeringAuthorizationOutput,
  CreateVpcPeeringAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcPeeringAuthorizationInput,
  output: CreateVpcPeeringAuthorizationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringAuthorization",
}));

export type CreateVpcPeeringConnectionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Establishes a VPC peering connection between a virtual private cloud (VPC) in an Amazon Web Services account with the VPC
 * for your Amazon GameLift Servers fleet. VPC peering enables the game servers on your fleet to communicate
 * directly with other Amazon Web Services resources. You can peer with VPCs in any Amazon Web Services account that
 * you have access to, including the account that you use to manage your Amazon GameLift Servers fleets. You
 * cannot peer with VPCs that are in different Regions. For more information, see VPC
 * Peering with Amazon GameLift Servers Fleets.
 *
 * Before calling this operation to establish the peering connection, you first need to
 * use CreateVpcPeeringAuthorization and identify the VPC you want to peer with.
 * Once the authorization for the specified VPC is issued, you have 24 hours to establish
 * the connection. These two operations handle all tasks necessary to peer the two VPCs,
 * including acceptance, updating routing tables, etc.
 *
 * To establish the connection, call this operation from the Amazon Web Services account that is used
 * to manage the Amazon GameLift Servers fleets. Identify the following values: (1) The ID of the fleet you
 * want to be enable a VPC peering connection for; (2) The Amazon Web Services account with the VPC that
 * you want to peer with; and (3) The ID of the VPC you want to peer with. This operation
 * is asynchronous. If successful, a connection request is created. You can use continuous
 * polling to track the request's status using DescribeVpcPeeringConnections , or by monitoring fleet events for success
 * or failure using DescribeFleetEvents .
 *
 * Amazon GameLift Servers uses the caller's credentials to update peer-VPC resources. The IAM user
 * that calls this operation must have the following Amazon EC2 permissions enabled:
 *
 * - `ec2:AcceptVpcPeeringConnection`
 *
 * - `ec2:AuthorizeSecurityGroupEgress`
 *
 * - `ec2:AuthorizeSecurityGroupIngress`
 *
 * - `ec2:CreateRoute`
 *
 * - `ec2:DescribeRouteTables`
 *
 * - `ec2:DescribeSecurityGroups`
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createVpcPeeringConnection: API.OperationMethod<
  CreateVpcPeeringConnectionInput,
  CreateVpcPeeringConnectionOutput,
  CreateVpcPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcPeeringConnectionInput,
  output: CreateVpcPeeringConnectionOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringConnection",
}));

export type DeleteAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes an alias. This operation removes all record of the alias. Game clients
 * attempting to access a server process using the deleted alias receive an error. To
 * delete an alias, specify the alias ID to be deleted.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasInput,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAliasInput,
  output: DeleteAliasResponse,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
}));

export type DeleteBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Deletes a build. This operation permanently deletes the build resource and any
 * uploaded build files. Deleting a build does not affect the status of any active fleets
 * using the build, but you can no longer create new fleets with the deleted build.
 *
 * To delete a build, specify the build ID.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const deleteBuild: API.OperationMethod<
  DeleteBuildInput,
  DeleteBuildResponse,
  DeleteBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBuildInput,
  output: DeleteBuildResponse,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBuild",
}));

export type DeleteContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Deletes all resources and information related to a container fleet and shuts down
 * currently running fleet instances, including those in remote locations. The container
 * fleet must be in `ACTIVE` status to be deleted.
 *
 * To delete a fleet, specify the fleet ID to be terminated. During the deletion process,
 * the fleet status is changed to `DELETING`.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const deleteContainerFleet: API.OperationMethod<
  DeleteContainerFleetInput,
  DeleteContainerFleetOutput,
  DeleteContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerFleetInput,
  output: DeleteContainerFleetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerFleet",
}));

export type DeleteContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * **Request options:**
 *
 * Deletes a container group definition.
 *
 * - Delete an entire container group definition, including all versions. Specify the
 * container group definition name, or use an ARN value without the version number.
 *
 * - Delete a particular version. Specify the container group definition name and a version
 * number, or use an ARN value that includes the version number.
 *
 * - Keep the newest versions and delete all older versions. Specify the container group
 * definition name and the number of versions to retain. For example, set
 * `VersionCountToRetain` to 5 to delete all but the five most recent
 * versions.
 *
 * **Result**
 *
 * If successful, Amazon GameLift Servers removes the container group definition versions that you request deletion for.
 * This request will fail for any requested versions if the following is true:
 *
 * - If the version is being used in an active fleet
 *
 * - If the version is being deployed to a fleet in a deployment that's currently in progress.
 *
 * - If the version is designated as a rollback definition in a fleet deployment that's currently in progress.
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const deleteContainerGroupDefinition: API.OperationMethod<
  DeleteContainerGroupDefinitionInput,
  DeleteContainerGroupDefinitionOutput,
  DeleteContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerGroupDefinitionInput,
  output: DeleteContainerGroupDefinitionOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerGroupDefinition",
}));

export type DeleteFleetError =
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Deletes all resources and information related to a fleet and shuts down any currently
 * running fleet instances, including those in remote locations.
 *
 * If the fleet being deleted has a VPC peering connection, you first need to get a
 * valid authorization (good for 24 hours) by calling CreateVpcPeeringAuthorization. You don't need to explicitly delete the
 * VPC peering connection.
 *
 * To delete a fleet, specify the fleet ID to be terminated. During the deletion process,
 * the fleet status is changed to `DELETING`. When completed, the status
 * switches to `TERMINATED` and the fleet event `FLEET_DELETED` is
 * emitted.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetInput,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetInput,
  output: DeleteFleetResponse,
  errors: [
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

export type DeleteFleetLocationsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Removes locations from a multi-location fleet. When deleting a location, all game
 * server process and all instances that are still active in the location are shut down.
 *
 * To delete fleet locations, identify the fleet ID and provide a list of the locations
 * to be deleted.
 *
 * If successful, GameLift sets the location status to `DELETING`, and begins
 * to shut down existing server processes and terminate instances in each location being
 * deleted. When completed, the location status changes to `TERMINATED`.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const deleteFleetLocations: API.OperationMethod<
  DeleteFleetLocationsInput,
  DeleteFleetLocationsOutput,
  DeleteFleetLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetLocationsInput,
  output: DeleteFleetLocationsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetLocations",
}));

export type DeleteGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Terminates a game server group
 * and permanently deletes the game server group record. You have several options for how
 * these resources are impacted when deleting the game server group. Depending on the type
 * of delete operation selected, this operation might affect these resources:
 *
 * - The game server group
 *
 * - The corresponding Auto Scaling group
 *
 * - All game servers that are currently running in the group
 *
 * To delete a game server group, identify the game server group to delete and specify
 * the type of delete operation to initiate. Game server groups can only be deleted if they
 * are in `ACTIVE` or `ERROR` status.
 *
 * If the delete request is successful, a series of operations are kicked off. The game
 * server group status is changed to `DELETE_SCHEDULED`, which prevents new game
 * servers from being registered and stops automatic scaling activity. Once all game
 * servers in the game server group are deregistered, Amazon GameLift Servers FleetIQ can begin deleting resources.
 * If any of the delete operations fail, the game server group is placed in
 * `ERROR` status.
 *
 * Amazon GameLift Servers FleetIQ emits delete events to Amazon CloudWatch.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const deleteGameServerGroup: API.OperationMethod<
  DeleteGameServerGroupInput,
  DeleteGameServerGroupOutput,
  DeleteGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGameServerGroupInput,
  output: DeleteGameServerGroupOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGameServerGroup",
}));

export type DeleteGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes a game session queue. Once a queue is successfully deleted, unfulfilled StartGameSessionPlacement requests that reference the queue will fail. To
 * delete a queue, specify the queue name.
 */
export const deleteGameSessionQueue: API.OperationMethod<
  DeleteGameSessionQueueInput,
  DeleteGameSessionQueueOutput,
  DeleteGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGameSessionQueueInput,
  output: DeleteGameSessionQueueOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGameSessionQueue",
}));

export type DeleteLocationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Deletes a custom location.
 *
 * Before deleting a custom location, review any fleets currently using the custom
 * location and deregister the location if it is in use. For more information, see DeregisterCompute.
 */
export const deleteLocation: API.OperationMethod<
  DeleteLocationInput,
  DeleteLocationOutput,
  DeleteLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLocationInput,
  output: DeleteLocationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLocation",
}));

export type DeleteMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Permanently removes a FlexMatch matchmaking configuration. To delete, specify the
 * configuration name. A matchmaking configuration cannot be deleted if it is being used in
 * any active matchmaking tickets.
 */
export const deleteMatchmakingConfiguration: API.OperationMethod<
  DeleteMatchmakingConfigurationInput,
  DeleteMatchmakingConfigurationOutput,
  DeleteMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMatchmakingConfigurationInput,
  output: DeleteMatchmakingConfigurationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMatchmakingConfiguration",
}));

export type DeleteMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes an existing matchmaking rule set. To delete the rule set, provide the rule set
 * name. Rule sets cannot be deleted if they are currently being used by a matchmaking
 * configuration.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const deleteMatchmakingRuleSet: API.OperationMethod<
  DeleteMatchmakingRuleSetInput,
  DeleteMatchmakingRuleSetOutput,
  DeleteMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMatchmakingRuleSetInput,
  output: DeleteMatchmakingRuleSetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMatchmakingRuleSet",
}));

export type DeleteScalingPolicyError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Deletes a fleet scaling policy. Once deleted, the policy is no longer in force and
 * Amazon GameLift Servers removes all record of it. To delete a scaling policy, specify both the scaling
 * policy name and the fleet ID it is associated with.
 *
 * To temporarily suspend scaling policies, use StopFleetActions. This operation suspends all policies for the
 * fleet.
 */
export const deleteScalingPolicy: API.OperationMethod<
  DeleteScalingPolicyInput,
  DeleteScalingPolicyResponse,
  DeleteScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScalingPolicyInput,
  output: DeleteScalingPolicyResponse,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPolicy",
}));

export type DeleteScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Deletes a Realtime script. This operation permanently deletes the script record. If
 * script files were uploaded, they are also deleted (files stored in an S3 bucket are not
 * deleted).
 *
 * To delete a script, specify the script ID. Before deleting a script, be sure to
 * terminate all fleets that are deployed with the script being deleted. Fleet instances
 * periodically check for script updates, and if the script record no longer exists, the
 * instance will go into an error state and be unable to host game sessions.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteScript: API.OperationMethod<
  DeleteScriptInput,
  DeleteScriptResponse,
  DeleteScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScriptInput,
  output: DeleteScriptResponse,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScript",
}));

export type DeleteVpcPeeringAuthorizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Cancels a pending VPC peering authorization for the specified VPC. If you need to
 * delete an existing VPC peering connection, use DeleteVpcPeeringConnection.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteVpcPeeringAuthorization: API.OperationMethod<
  DeleteVpcPeeringAuthorizationInput,
  DeleteVpcPeeringAuthorizationOutput,
  DeleteVpcPeeringAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcPeeringAuthorizationInput,
  output: DeleteVpcPeeringAuthorizationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringAuthorization",
}));

export type DeleteVpcPeeringConnectionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Removes a VPC peering connection. To delete the connection, you must have a valid
 * authorization for the VPC peering connection that you want to delete..
 *
 * Once a valid authorization exists, call this operation from the Amazon Web Services account that is
 * used to manage the Amazon GameLift Servers fleets. Identify the connection to delete by the connection ID
 * and fleet ID. If successful, the connection is removed.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteVpcPeeringConnection: API.OperationMethod<
  DeleteVpcPeeringConnectionInput,
  DeleteVpcPeeringConnectionOutput,
  DeleteVpcPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcPeeringConnectionInput,
  output: DeleteVpcPeeringConnectionOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringConnection",
}));

export type DeregisterComputeError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Removes a compute resource from an Anywhere fleet. Deregistered computes can no longer
 * host game sessions through Amazon GameLift Servers. Use this operation with an Anywhere fleet that
 * doesn't use the Amazon GameLift Servers Agent For Anywhere fleets with the Agent, the Agent handles all
 * compute registry tasks for you.
 *
 * To deregister a compute, call this operation from the compute that's being
 * deregistered and specify the compute name and the fleet ID.
 */
export const deregisterCompute: API.OperationMethod<
  DeregisterComputeInput,
  DeregisterComputeOutput,
  DeregisterComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterComputeInput,
  output: DeregisterComputeOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCompute",
}));

export type DeregisterGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Removes the game server from a
 * game server group. As a result of this operation, the deregistered game server can no
 * longer be claimed and will not be returned in a list of active game servers.
 *
 * To deregister a game server, specify the game server group and game server ID. If
 * successful, this operation emits a CloudWatch event with termination timestamp and
 * reason.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const deregisterGameServer: API.OperationMethod<
  DeregisterGameServerInput,
  DeregisterGameServerResponse,
  DeregisterGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterGameServerInput,
  output: DeregisterGameServerResponse,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterGameServer",
}));

export type DescribeAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for an alias. This operation returns all alias metadata and
 * settings. To get an alias's target fleet ID only, use `ResolveAlias`.
 *
 * To get alias properties, specify the alias ID. If successful, the requested alias
 * record is returned.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeAlias: API.OperationMethod<
  DescribeAliasInput,
  DescribeAliasOutput,
  DescribeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAliasInput,
  output: DescribeAliasOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlias",
}));

export type DescribeBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves properties for a custom game build. To request a build resource, specify a
 * build ID. If successful, an object containing the build properties is returned.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const describeBuild: API.OperationMethod<
  DescribeBuildInput,
  DescribeBuildOutput,
  DescribeBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBuildInput,
  output: DescribeBuildOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBuild",
}));

export type DescribeComputeError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for a specific compute resource in an Amazon GameLift Servers fleet. You can list
 * all computes in a fleet by calling ListCompute.
 *
 * **Request options**
 *
 * Provide the fleet ID and compute name. The compute name varies depending on the type
 * of fleet.
 *
 * - For a compute in a managed EC2 fleet, provide an instance ID. Each instance in
 * the fleet is a compute.
 *
 * - For a compute in a managed container fleet, provide a compute name. In a
 * container fleet, each game server container group on a fleet instance is
 * assigned a compute name.
 *
 * - For a compute in an Anywhere fleet, provide a registered compute name.
 * Anywhere fleet computes are created when you register a hosting resource with
 * the fleet.
 *
 * **Results**
 *
 * If successful, this operation returns details for the requested compute resource.
 * Depending on the fleet's compute type, the result includes the following information:
 *
 * - For a managed EC2 fleet, this operation returns information about the EC2
 * instance.
 *
 * - For an Anywhere fleet, this operation returns information about the registered
 * compute.
 */
export const describeCompute: API.OperationMethod<
  DescribeComputeInput,
  DescribeComputeOutput,
  DescribeComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComputeInput,
  output: DescribeComputeOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCompute",
}));

export type DescribeContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the properties for a container fleet. When requesting attributes for
 * multiple fleets, use the pagination parameters to retrieve results as a set of
 * sequential pages.
 *
 * **Request options**
 *
 * - Get container fleet properties for a single fleet. Provide either the fleet ID or ARN value.
 *
 * **Results**
 *
 * If successful, a `ContainerFleet` object is returned. This object includes
 * the fleet properties, including information about the most recent deployment.
 *
 * Some API operations limit the number of fleet IDs that allowed in one request. If
 * a request exceeds this limit, the request fails and the error message contains the
 * maximum allowed number.
 */
export const describeContainerFleet: API.OperationMethod<
  DescribeContainerFleetInput,
  DescribeContainerFleetOutput,
  DescribeContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerFleetInput,
  output: DescribeContainerFleetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerFleet",
}));

export type DescribeContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the properties of a container group definition, including all container
 * definitions in the group.
 *
 * **Request options:**
 *
 * - Retrieve the latest version of a container group definition. Specify the container
 * group definition name only, or use an ARN value without a version number.
 *
 * - Retrieve a particular version. Specify the container group definition name and a
 * version number, or use an ARN value that includes the version number.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a container group
 * definition version.
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const describeContainerGroupDefinition: API.OperationMethod<
  DescribeContainerGroupDefinitionInput,
  DescribeContainerGroupDefinitionOutput,
  DescribeContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerGroupDefinitionInput,
  output: DescribeContainerGroupDefinitionOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerGroupDefinition",
}));

export type DescribeContainerGroupPortMappingsError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the port mappings for a container group running on a container fleet. Port
 * mappings show how container ports are mapped to connection ports on the fleet instance.
 * Use this operation to find the connection port for a specific container on a fleet
 * instance.
 *
 * **Request options**
 *
 * - Get port mappings for a game server container group. Provide the fleet ID,
 * set `ContainerGroupType` to `GAME_SERVER`, and specify the
 * `ComputeName` for the game server container group.
 *
 * - Get port mappings for a per-instance container group. Provide the fleet ID,
 * set `ContainerGroupType` to `PER_INSTANCE`, and specify the
 * `InstanceId` for the instance.
 *
 * - Optionally filter results to a single container by providing a
 * `ContainerName`.
 *
 * **Results**
 *
 * This operation returns the fleet ID, fleet ARN, location, container group definition
 * ARN, container group type, compute name (for game server container groups), instance ID,
 * and a list of `ContainerGroupPortMapping` objects. Each object contains the
 * container name, runtime ID, and a list of port mappings that show how container ports map
 * to connection ports on the instance.
 *
 * **Learn more**
 *
 * Connect to
 * containers
 *
 * Create a
 * container group definition
 */
export const describeContainerGroupPortMappings: API.OperationMethod<
  DescribeContainerGroupPortMappingsInput,
  DescribeContainerGroupPortMappingsOutput,
  DescribeContainerGroupPortMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerGroupPortMappingsInput,
  output: DescribeContainerGroupPortMappingsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerGroupPortMappings",
}));

export type DescribeEC2InstanceLimitsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves the instance limits and current utilization for an Amazon Web Services Region or location.
 * Instance limits control the number of instances, per instance type, per location, that
 * your Amazon Web Services account can use. Learn more at Amazon EC2 Instance Types. The information
 * returned includes the maximum number of instances allowed and your account's current
 * usage across all fleets. This information can affect your ability to scale your Amazon GameLift Servers
 * fleets. You can request a limit increase for your account by using the **Service limits** page in the Amazon GameLift Servers console.
 *
 * Instance limits differ based on whether the instances are deployed in a fleet's home
 * Region or in a remote location. For remote locations, limits also differ based on the
 * combination of home Region and remote location. All requests must specify an Amazon Web Services
 * Region (either explicitly or as your default settings). To get the limit for a remote
 * location, you must also specify the location. To learn more about how Amazon GameLift Servers handles
 * locations, see Amazon GameLift Servers service
 * locations. For example, the following requests all
 * return different results:
 *
 * - Request specifies the Region `ap-northeast-1` with no location. The
 * result is limits and usage data on all of the fleets that reside in
 * `ap-northeast-1`, for all instance types that are deployed in
 * `ap-northeast-1`.
 *
 * - Request specifies the Region `ap-northeast-1` with location
 * `us-west-2`. The result is limits and usage data on all of the
 * fleets that reside in `ap-northeast-1`, for all instance types
 * that are deployed in `us-west-2`.
 *
 * - Request specifies the Region `us-east-1` with location
 * `ap-northeast-1`. The result is limits and usage data on all of
 * the fleets that reside in `us-east-1`, for all instance types
 * that are deployed in `ap-northeast-1`. These limits do not affect
 * fleets in any other Regions that deploy instances to
 * `ap-northeast-1`.
 *
 * This operation can be used in the following ways:
 *
 * - To get limit and usage data for all instance types that are deployed in an
 * Amazon Web Services Region by fleets that reside in the same Region: Specify the Region only.
 * Optionally, specify a single instance type to retrieve information for.
 *
 * - To get limit and usage data for all instance types that are deployed to a
 * remote location by fleets that reside in different Amazon Web Services Region: Provide both
 * the Amazon Web Services Region and the remote location. Optionally, specify a single instance
 * type to retrieve information for.
 *
 * If successful, an `EC2InstanceLimits` object is returned with limits and
 * usage data for each requested instance type.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers fleets
 */
export const describeEC2InstanceLimits: API.OperationMethod<
  DescribeEC2InstanceLimitsInput,
  DescribeEC2InstanceLimitsOutput,
  DescribeEC2InstanceLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEC2InstanceLimitsInput,
  output: DescribeEC2InstanceLimitsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEC2InstanceLimits",
}));

export type DescribeFleetAttributesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Retrieves core fleet-wide properties for fleets in an Amazon Web Services Region. Properties include the computing
 * hardware and deployment configuration for instances in the fleet.
 *
 * You can use this operation in the following ways:
 *
 * - To get attributes for specific fleets, provide a list of fleet IDs or fleet ARNs.
 *
 * - To get attributes for all fleets, do not provide a fleet identifier.
 *
 * When requesting attributes for multiple fleets, use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a `FleetAttributes` object is returned for each fleet
 * requested, unless the fleet identifier is not found.
 *
 * Some API operations limit the number of fleet IDs that allowed in one request. If
 * a request exceeds this limit, the request fails and the error message contains the
 * maximum allowed number.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetAttributes: API.PaginatedOperationMethod<
  DescribeFleetAttributesInput,
  DescribeFleetAttributesOutput,
  DescribeFleetAttributesError,
  Credentials | HttpClient.HttpClient,
  FleetAttributes
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAttributesInput,
  output: DescribeFleetAttributesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetAttributes",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetCapacityError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Retrieves the resource capacity settings for one or more fleets. For a container
 * fleet, this operation also returns counts for game server container groups.
 *
 * With multi-location fleets, this operation retrieves data for the fleet's home Region
 * only. To retrieve capacity for remote locations, see
 * https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetLocationCapacity.html.
 *
 * This operation can be used in the following ways:
 *
 * - To get capacity data for one or more specific fleets, provide a list of fleet
 * IDs or fleet ARNs.
 *
 * - To get capacity data for all fleets, do not provide a fleet identifier.
 *
 * When requesting multiple fleets, use the pagination parameters to retrieve results as
 * a set of sequential pages.
 *
 * If successful, a `FleetCapacity` object is returned for each requested
 * fleet ID. Each `FleetCapacity` object includes a `Location`
 * property, which is set to the fleet's home Region. Capacity values are returned only for
 * fleets that currently exist.
 *
 * Some API operations may limit the number of fleet IDs that are allowed in one
 * request. If a request exceeds this limit, the request fails and the error message
 * includes the maximum allowed.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * GameLift metrics for fleets
 */
export const describeFleetCapacity: API.PaginatedOperationMethod<
  DescribeFleetCapacityInput,
  DescribeFleetCapacityOutput,
  DescribeFleetCapacityError,
  Credentials | HttpClient.HttpClient,
  FleetCapacity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetCapacityInput,
  output: DescribeFleetCapacityOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetCapacity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetCapacity",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetDeploymentError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves information about a managed container fleet deployment.
 *
 * **Request options**
 *
 * - Get information about the latest deployment for a specific fleet. Provide the
 * fleet ID or ARN.
 *
 * - Get information about a specific deployment. Provide the fleet ID or ARN and
 * the deployment ID.
 *
 * **Results**
 *
 * If successful, a `FleetDeployment` object is returned.
 */
export const describeFleetDeployment: API.OperationMethod<
  DescribeFleetDeploymentInput,
  DescribeFleetDeploymentOutput,
  DescribeFleetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetDeploymentInput,
  output: DescribeFleetDeploymentOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetDeployment",
}));

export type DescribeFleetEventsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves entries from a fleet's event log. Fleet events are initiated by changes in
 * status, such as during fleet creation and termination, changes in capacity, etc. If a
 * fleet has multiple locations, events are also initiated by changes to status and capacity in remote locations.
 *
 * You can specify a time range to limit the result set. Use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a collection of event log entries matching the request are
 * returned.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetEvents: API.PaginatedOperationMethod<
  DescribeFleetEventsInput,
  DescribeFleetEventsOutput,
  DescribeFleetEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetEventsInput,
  output: DescribeFleetEventsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetLocationAttributesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information on a fleet's remote locations, including life-cycle status and
 * any suspended fleet activity.
 *
 * This operation can be used in the following ways:
 *
 * - To get data for specific locations, provide a fleet identifier and a list of
 * locations. Location data is returned in the order that it is requested.
 *
 * - To get data for all locations, provide a fleet identifier only. Location data
 * is returned in no particular order.
 *
 * When requesting attributes for multiple locations, use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a `LocationAttributes` object is returned for each requested
 * location. If the fleet does not have a requested location, no information is returned.
 *
 * **Learn more**
 *
 * Setting
 * up Amazon GameLift Servers fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 */
export const describeFleetLocationAttributes: API.PaginatedOperationMethod<
  DescribeFleetLocationAttributesInput,
  DescribeFleetLocationAttributesOutput,
  DescribeFleetLocationAttributesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetLocationAttributesInput,
  output: DescribeFleetLocationAttributesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetLocationCapacityError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the resource capacity settings for a fleet location. The data returned
 * includes the current capacity (number of EC2 instances) and some scaling settings for
 * the requested fleet location. For a managed container fleet, this operation also returns counts
 * for game server container groups.
 *
 * Use this operation to retrieve capacity information for a fleet's remote location or
 * home Region (you can also retrieve home Region capacity by calling
 * `DescribeFleetCapacity`).
 *
 * To retrieve capacity data, identify a fleet and location.
 *
 * If successful, a `FleetCapacity` object is returned for the requested fleet
 * location.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 *
 * GameLift metrics for fleets
 */
export const describeFleetLocationCapacity: API.OperationMethod<
  DescribeFleetLocationCapacityInput,
  DescribeFleetLocationCapacityOutput,
  DescribeFleetLocationCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetLocationCapacityInput,
  output: DescribeFleetLocationCapacityOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationCapacity",
}));

export type DescribeFleetLocationUtilizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Retrieves current usage data for a fleet location. Utilization data provides a
 * snapshot of current game hosting activity at the requested location. Use this operation
 * to retrieve utilization information for a fleet's remote location or home Region (you
 * can also retrieve home Region utilization by calling
 * `DescribeFleetUtilization`).
 *
 * To retrieve utilization data, identify a fleet and location.
 *
 * If successful, a `FleetUtilization` object is returned for the requested
 * fleet location.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 *
 * GameLift metrics for fleets
 */
export const describeFleetLocationUtilization: API.OperationMethod<
  DescribeFleetLocationUtilizationInput,
  DescribeFleetLocationUtilizationOutput,
  DescribeFleetLocationUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetLocationUtilizationInput,
  output: DescribeFleetLocationUtilizationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationUtilization",
}));

export type DescribeFleetPortSettingsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fleet's inbound connection permissions. Connection permissions specify IP
 * addresses and port settings that incoming traffic can use to access server processes in
 * the fleet. Game server processes that are running in the fleet must use a port that
 * falls within this range.
 *
 * Use this operation in the following ways:
 *
 * - To retrieve the port settings for a fleet, identify the fleet's unique
 * identifier.
 *
 * - To check the status of recent updates to a fleet remote location, specify the
 * fleet ID and a location. Port setting updates can take time to propagate across
 * all locations.
 *
 * If successful, a set of `IpPermission` objects is returned for the
 * requested fleet ID. When specifying a location, this operation returns a pending status.
 * If the requested fleet has been deleted, the result set is empty.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetPortSettings: API.OperationMethod<
  DescribeFleetPortSettingsInput,
  DescribeFleetPortSettingsOutput,
  DescribeFleetPortSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetPortSettingsInput,
  output: DescribeFleetPortSettingsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetPortSettings",
}));

export type DescribeFleetUtilizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves utilization statistics for one or more fleets. Utilization data provides a
 * snapshot of how the fleet's hosting resources are currently being used. For fleets with
 * remote locations, this operation retrieves data for the fleet's home Region only. See
 * DescribeFleetLocationUtilization to get utilization statistics for a
 * fleet's remote locations.
 *
 * This operation can be used in the following ways:
 *
 * - To get utilization data for one or more specific fleets, provide a list of
 * fleet IDs or fleet ARNs.
 *
 * - To get utilization data for all fleets, do not provide a fleet identifier.
 *
 * When requesting multiple fleets, use the pagination parameters to retrieve results as
 * a set of sequential pages.
 *
 * If successful, a FleetUtilization object is returned for each requested fleet ID, unless the
 * fleet identifier is not found. Each fleet utilization object includes a
 * `Location` property, which is set to the fleet's home Region.
 *
 * Some API operations may limit the number of fleet IDs allowed in one request. If a
 * request exceeds this limit, the request fails and the error message includes the
 * maximum allowed.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 *
 * GameLift Metrics for Fleets
 */
export const describeFleetUtilization: API.PaginatedOperationMethod<
  DescribeFleetUtilizationInput,
  DescribeFleetUtilizationOutput,
  DescribeFleetUtilizationError,
  Credentials | HttpClient.HttpClient,
  FleetUtilization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetUtilizationInput,
  output: DescribeFleetUtilizationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetUtilization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetUtilization",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information for a
 * registered game server. Information includes game server status, health check info, and
 * the instance that the game server is running on.
 *
 * To retrieve game server information, specify the game server ID. If successful, the
 * requested game server object is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServer: API.OperationMethod<
  DescribeGameServerInput,
  DescribeGameServerOutput,
  DescribeGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGameServerInput,
  output: DescribeGameServerOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServer",
}));

export type DescribeGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information on a
 * game server group. This operation returns only properties related to Amazon GameLift Servers FleetIQ. To view or
 * update properties for the corresponding Auto Scaling group, such as launch template,
 * auto scaling policies, and maximum/minimum group size, access the Auto Scaling group
 * directly.
 *
 * To get attributes for a game server group, provide a group name or ARN value. If
 * successful, a `GameServerGroup` object is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServerGroup: API.OperationMethod<
  DescribeGameServerGroupInput,
  DescribeGameServerGroupOutput,
  DescribeGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGameServerGroupInput,
  output: DescribeGameServerGroupOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServerGroup",
}));

export type DescribeGameServerInstancesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves status
 * information about the Amazon EC2 instances associated with a Amazon GameLift Servers FleetIQ game server group.
 * Use this operation to detect when instances are active or not available to host new game
 * servers.
 *
 * To request status for all instances in the game server group, provide a game server
 * group ID only. To request status for specific instances, provide the game server group
 * ID and one or more instance IDs. Use the pagination parameters to retrieve results in
 * sequential segments. If successful, a collection of `GameServerInstance`
 * objects is returned.
 *
 * This operation is not designed to be called with every game server claim request; this
 * practice can cause you to exceed your API limit, which results in errors. Instead, as a
 * best practice, cache the results and refresh your cache no more than once every 10
 * seconds.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServerInstances: API.PaginatedOperationMethod<
  DescribeGameServerInstancesInput,
  DescribeGameServerInstancesOutput,
  DescribeGameServerInstancesError,
  Credentials | HttpClient.HttpClient,
  GameServerInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGameServerInstancesInput,
  output: DescribeGameServerInstancesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServerInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServerInstances",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionDetailsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves additional game session properties, including the game session protection
 * policy in force, a set of one or more game sessions in a specific fleet location. You
 * can optionally filter the results by current game session status.
 *
 * This operation can be used in the following ways:
 *
 * - To retrieve details for all game sessions that are currently running on all
 * locations in a fleet, provide a fleet or alias ID, with an optional status
 * filter. This approach returns details from the fleet's home Region and all
 * remote locations.
 *
 * - To retrieve details for all game sessions that are currently running on a
 * specific fleet location, provide a fleet or alias ID and a location name, with
 * optional status filter. The location can be the fleet's home Region or any
 * remote location.
 *
 * - To retrieve details for a specific game session, provide the game session ID.
 * This approach looks for the game session ID in all fleets that reside in the
 * Amazon Web Services Region defined in the request.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSessionDetail` object is returned for each game
 * session that matches the request.
 *
 * **Learn more**
 *
 * Find a game session
 *
 * All APIs by task
 */
export const describeGameSessionDetails: API.PaginatedOperationMethod<
  DescribeGameSessionDetailsInput,
  DescribeGameSessionDetailsOutput,
  DescribeGameSessionDetailsError,
  Credentials | HttpClient.HttpClient,
  GameSessionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGameSessionDetailsInput,
  output: DescribeGameSessionDetailsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessionDetails",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information, including current status, about a game session placement
 * request.
 *
 * To get game session placement details, specify the placement ID.
 *
 * This operation is not designed to be continually called to track game session status.
 * This practice can cause you to exceed your API limit, which results in errors. Instead,
 * you must configure an Amazon Simple Notification Service (SNS) topic to receive notifications from FlexMatch or
 * queues. Continuously polling with `DescribeGameSessionPlacement` should only
 * be used for games in development with low game session usage. For a reference
 * implementation of event-based game session placement tracking, see
 * Event-based game session placement guidance in the Amazon GameLift Toolkit.
 */
export const describeGameSessionPlacement: API.OperationMethod<
  DescribeGameSessionPlacementInput,
  DescribeGameSessionPlacementOutput,
  DescribeGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGameSessionPlacementInput,
  output: DescribeGameSessionPlacementOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionPlacement",
}));

export type DescribeGameSessionQueuesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the properties for one or more game session queues. When requesting multiple
 * queues, use the pagination parameters to retrieve results as a set of sequential pages.
 * When specifying a list of queues, objects are returned only for queues that currently
 * exist in the Region.
 *
 * **Learn more**
 *
 * View Your Queues
 */
export const describeGameSessionQueues: API.PaginatedOperationMethod<
  DescribeGameSessionQueuesInput,
  DescribeGameSessionQueuesOutput,
  DescribeGameSessionQueuesError,
  Credentials | HttpClient.HttpClient,
  GameSessionQueue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGameSessionQueuesInput,
  output: DescribeGameSessionQueuesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessionQueues",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves a set of one or more game sessions in a specific fleet location. You can
 * optionally filter the results by current game session status.
 *
 * This operation can be used in the following ways:
 *
 * - To retrieve all game sessions that are currently running on all locations in a
 * fleet, provide a fleet or alias ID, with an optional status filter. This
 * approach returns all game sessions in the fleet's home Region and all remote
 * locations.
 *
 * - To retrieve all game sessions that are currently running on a specific fleet
 * location, provide a fleet or alias ID and a location name, with optional status
 * filter. The location can be the fleet's home Region or any remote
 * location.
 *
 * - To retrieve a specific game session, provide the game session ID. This
 * approach looks for the game session ID in all fleets that reside in the Amazon Web Services
 * Region defined in the request.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSession` object is returned for each game session
 * that matches the request.
 *
 * This operation is not designed to be continually called to track game session status.
 * This practice can cause you to exceed your API limit, which results in errors. Instead,
 * you must configure an Amazon Simple Notification Service (SNS) topic to receive notifications from FlexMatch or
 * queues. Continuously polling with `DescribeGameSessions` should only be used
 * for games in development with low game session usage.
 *
 * *Available in Amazon GameLift Servers Local.*
 *
 * **Learn more**
 *
 * Find a game session
 *
 * All APIs by task
 */
export const describeGameSessions: API.PaginatedOperationMethod<
  DescribeGameSessionsInput,
  DescribeGameSessionsOutput,
  DescribeGameSessionsError,
  Credentials | HttpClient.HttpClient,
  GameSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGameSessionsInput,
  output: DescribeGameSessionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeInstancesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:**EC2, Container
 *
 * Retrieves information about the EC2 instances in an Amazon GameLift Servers managed fleet, including
 * instance ID, connection data, and status. You can use this operation with a
 * multi-location fleet to get location-specific instance information. As an alternative,
 * use the operations https://docs.aws.amazon.com/gamelift/latest/apireference/API_ListCompute and https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeCompute
 * to retrieve information for compute resources, including EC2 and Anywhere fleets.
 *
 * You can call this operation in the following ways:
 *
 * - To get information on all instances in a fleet's home Region, specify the
 * fleet ID.
 *
 * - To get information on all instances in a fleet's remote location, specify the
 * fleet ID and location name.
 *
 * - To get information on a specific instance in a fleet, specify the fleet ID and
 * instance ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns `Instance` objects for each requested
 * instance, listed in no particular order. If you call this operation for an Anywhere
 * fleet, you receive an InvalidRequestException.
 *
 * **Learn more**
 *
 * Remotely connect to
 * fleet instances
 *
 * Debug fleet
 * issues
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeInstances: API.PaginatedOperationMethod<
  DescribeInstancesInput,
  DescribeInstancesOutput,
  DescribeInstancesError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstancesInput,
  output: DescribeInstancesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves one or more matchmaking tickets. Use this operation to retrieve ticket
 * information, including--after a successful match is made--connection information for the
 * resulting new game session.
 *
 * To request matchmaking tickets, provide a list of up to 10 ticket IDs. If the request
 * is successful, a ticket object is returned for each requested ID that currently
 * exists.
 *
 * This operation is not designed to be continually called to track matchmaking ticket
 * status. This practice can cause you to exceed your API limit, which results in errors.
 * Instead, as a best practice, set up an Amazon Simple Notification Service to receive notifications, and provide
 * the topic ARN in the matchmaking configuration.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * Set Up FlexMatch event
 * notification
 */
export const describeMatchmaking: API.OperationMethod<
  DescribeMatchmakingInput,
  DescribeMatchmakingOutput,
  DescribeMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMatchmakingInput,
  output: DescribeMatchmakingOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmaking",
}));

export type DescribeMatchmakingConfigurationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the details of FlexMatch matchmaking configurations.
 *
 * This operation offers the following options: (1) retrieve all matchmaking
 * configurations, (2) retrieve configurations for a specified list, or (3) retrieve all
 * configurations that use a specified rule set name. When requesting multiple items, use
 * the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a configuration is returned for each requested name. When specifying a
 * list of names, only configurations that currently exist are returned.
 *
 * **Learn more**
 *
 * Setting up FlexMatch matchmakers
 */
export const describeMatchmakingConfigurations: API.PaginatedOperationMethod<
  DescribeMatchmakingConfigurationsInput,
  DescribeMatchmakingConfigurationsOutput,
  DescribeMatchmakingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  MatchmakingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMatchmakingConfigurationsInput,
  output: DescribeMatchmakingConfigurationsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmakingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Configurations",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMatchmakingRuleSetsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the details for FlexMatch matchmaking rule sets. You can request all existing
 * rule sets for the Region, or provide a list of one or more rule set names. When
 * requesting multiple items, use the pagination parameters to retrieve results as a set of
 * sequential pages. If successful, a rule set is returned for each requested name.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const describeMatchmakingRuleSets: API.PaginatedOperationMethod<
  DescribeMatchmakingRuleSetsInput,
  DescribeMatchmakingRuleSetsOutput,
  DescribeMatchmakingRuleSetsError,
  Credentials | HttpClient.HttpClient,
  MatchmakingRuleSet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMatchmakingRuleSetsInput,
  output: DescribeMatchmakingRuleSetsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmakingRuleSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSets",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribePlayerSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for one or more player sessions.
 *
 * This action can be used in the following ways:
 *
 * - To retrieve a specific player session, provide the player session ID
 * only.
 *
 * - To retrieve all player sessions in a game session, provide the game session ID
 * only.
 *
 * - To retrieve all player sessions for a specific player, provide a player ID
 * only.
 *
 * To request player sessions, specify either a player session ID, game session ID, or
 * player ID. You can filter this request by player session status. If you provide
 * a specific `PlayerSessionId` or `PlayerId`, Amazon GameLift Servers ignores the filter criteria.
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `PlayerSession` object is returned for each session that
 * matches the request.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describePlayerSessions: API.PaginatedOperationMethod<
  DescribePlayerSessionsInput,
  DescribePlayerSessionsOutput,
  DescribePlayerSessionsError,
  Credentials | HttpClient.HttpClient,
  PlayerSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePlayerSessionsInput,
  output: DescribePlayerSessionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePlayerSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PlayerSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRuntimeConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fleet's runtime configuration settings. The runtime configuration
 * determines which server processes run, and how, on computes in the fleet. For managed
 * EC2 fleets, the runtime configuration describes server processes that run on each fleet
 * instance. You can update a fleet's runtime configuration at any time using
 * UpdateRuntimeConfiguration.
 *
 * To get the current runtime configuration for a fleet, provide the fleet ID.
 *
 * If successful, a `RuntimeConfiguration` object is returned for the
 * requested fleet. If the requested fleet has been deleted, the result set is
 * empty.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Running multiple
 * processes on a fleet
 */
export const describeRuntimeConfiguration: API.OperationMethod<
  DescribeRuntimeConfigurationInput,
  DescribeRuntimeConfigurationOutput,
  DescribeRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRuntimeConfigurationInput,
  output: DescribeRuntimeConfigurationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuntimeConfiguration",
}));

export type DescribeScalingPoliciesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Retrieves all scaling policies applied to a fleet.
 *
 * To get a fleet's scaling policies, specify the fleet ID. You can filter this request
 * by policy status, such as to retrieve only active scaling policies. Use the pagination
 * parameters to retrieve results as a set of sequential pages. If successful, set of
 * `ScalingPolicy` objects is returned for the fleet.
 *
 * A fleet may have all of its scaling policies suspended. This operation does not affect
 * the status of the scaling policies, which remains ACTIVE.
 */
export const describeScalingPolicies: API.PaginatedOperationMethod<
  DescribeScalingPoliciesInput,
  DescribeScalingPoliciesOutput,
  DescribeScalingPoliciesError,
  Credentials | HttpClient.HttpClient,
  ScalingPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScalingPoliciesInput,
  output: DescribeScalingPoliciesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingPolicies",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves properties for a Realtime script.
 *
 * To request a script record, specify the script ID. If successful, an object containing
 * the script properties is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeScript: API.OperationMethod<
  DescribeScriptInput,
  DescribeScriptOutput,
  DescribeScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScriptInput,
  output: DescribeScriptOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScript",
}));

export type DescribeVpcPeeringAuthorizationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves valid VPC peering authorizations that are pending for the Amazon Web Services account.
 * This operation returns all VPC peering authorizations and requests for peering. This
 * includes those initiated and received by this account.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeVpcPeeringAuthorizations: API.OperationMethod<
  DescribeVpcPeeringAuthorizationsInput,
  DescribeVpcPeeringAuthorizationsOutput,
  DescribeVpcPeeringAuthorizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcPeeringAuthorizationsInput,
  output: DescribeVpcPeeringAuthorizationsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringAuthorizations",
}));

export type DescribeVpcPeeringConnectionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves information on VPC peering connections. Use this operation to get peering
 * information for all fleets or for one specific fleet ID.
 *
 * To retrieve connection information, call this operation from the Amazon Web Services account that is
 * used to manage the Amazon GameLift Servers fleets. Specify a fleet ID or leave the parameter empty to
 * retrieve all connection records. If successful, the retrieved information includes both
 * active and pending connections. Active connections identify the IpV4 CIDR block that the
 * VPC uses to connect.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeVpcPeeringConnections: API.OperationMethod<
  DescribeVpcPeeringConnectionsInput,
  DescribeVpcPeeringConnectionsOutput,
  DescribeVpcPeeringConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcPeeringConnectionsInput,
  output: DescribeVpcPeeringConnectionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringConnections",
}));

export type GetComputeAccessError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Requests authorization to remotely connect to a hosting resource in a Amazon GameLift Servers managed
 * fleet. This operation is not used with Amazon GameLift Servers Anywhere fleets.
 *
 * **Request options**
 *
 * Provide the fleet ID and compute name. The compute name varies depending on the type
 * of fleet.
 *
 * - For a compute in a managed EC2 fleet, provide an instance ID. Each instance in
 * the fleet is a compute.
 *
 * - For a compute in a managed container fleet, provide a compute name. In a
 * container fleet, each game server container group on a fleet instance is
 * assigned a compute name.
 *
 * **Results**
 *
 * If successful, this operation returns a set of temporary Amazon Web Services credentials, including
 * a two-part access key and a session token.
 *
 * - With a managed EC2 fleet (where compute type is `EC2`), use these
 * credentials with Amazon EC2 Systems Manager (SSM) to start a session with the compute. For more
 * details, see Starting a session (CLI) in the Amazon EC2 Systems Manager User
 * Guide.
 */
export const getComputeAccess: API.OperationMethod<
  GetComputeAccessInput,
  GetComputeAccessOutput,
  GetComputeAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComputeAccessInput,
  output: GetComputeAccessOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComputeAccess",
}));

export type GetComputeAuthTokenError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Requests an authentication token from Amazon GameLift Servers for a compute resource in an Amazon GameLift Servers
 * fleet. Game servers that are running on the compute use this token to communicate
 * with the Amazon GameLift Servers service, such as when calling the Amazon GameLift Servers server SDK action
 * `InitSDK()`. Authentication tokens are valid for a limited time span, so
 * you need to request a fresh token before the current token expires.
 *
 * **Request options**
 *
 * - For managed EC2 fleets (compute type `EC2`), auth token retrieval
 * and refresh is handled automatically. All game servers that are running on all
 * fleet instances have access to a valid auth token.
 *
 * - For Anywhere fleets (compute type `ANYWHERE`), if you're using the
 * Amazon GameLift Servers Agent, auth token retrieval and refresh is handled automatically for any
 * compute where the Agent is running. If you're not using
 * the Agent, create a mechanism to retrieve and refresh auth tokens for computes
 * that are running game server processes.
 *
 * **Learn more**
 *
 * - Create an
 * Anywhere fleet
 *
 * - Test your
 * integration
 *
 * - Server SDK
 * reference guides (for version 5.x)
 */
export const getComputeAuthToken: API.OperationMethod<
  GetComputeAuthTokenInput,
  GetComputeAuthTokenOutput,
  GetComputeAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComputeAuthTokenInput,
  output: GetComputeAuthTokenOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComputeAuthToken",
}));

export type GetGameSessionLogUrlError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves the location of stored game session logs for a specified game session on
 * Amazon GameLift Servers managed fleets. When a game session is terminated, Amazon GameLift Servers automatically stores
 * the logs in Amazon S3 and retains them for 14 days. Use this URL to download the logs.
 *
 * See the Amazon Web Services Service
 * Limits page for maximum log file sizes. Log files that exceed this limit
 * are not saved.
 *
 * All APIs by task
 */
export const getGameSessionLogUrl: API.OperationMethod<
  GetGameSessionLogUrlInput,
  GetGameSessionLogUrlOutput,
  GetGameSessionLogUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGameSessionLogUrlInput,
  output: GetGameSessionLogUrlOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGameSessionLogUrl",
}));

export type GetInstanceAccessError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Requests authorization to remotely connect to an instance in an Amazon GameLift Servers managed fleet.
 * Use this operation to connect to instances with game servers that use Amazon GameLift Servers server SDK
 * 4.x or earlier. To connect to instances with game servers that use server SDK 5.x or
 * later, call https://docs.aws.amazon.com/gamelift/latest/apireference/API_GetComputeAccess.
 *
 * To request access to an instance, specify IDs for the instance and the fleet it
 * belongs to. You can retrieve instance IDs for a fleet by calling DescribeInstances with the fleet ID.
 *
 * If successful, this operation returns an IP address and credentials. The returned
 * credentials match the operating system of the instance, as follows:
 *
 * - For a Windows instance: returns a user name and secret (password) for use with
 * a Windows Remote Desktop client.
 *
 * - For a Linux instance: returns a user name and secret (RSA private key) for use
 * with an SSH client. You must save the secret to a `.pem` file. If
 * you're using the CLI, see the example Get credentials for a Linux instance for tips on automatically
 * saving the secret to a `.pem` file.
 *
 * **Learn more**
 *
 * Remotely connect to
 * fleet instances
 *
 * Debug fleet
 * issues
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const getInstanceAccess: API.OperationMethod<
  GetInstanceAccessInput,
  GetInstanceAccessOutput,
  GetInstanceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceAccessInput,
  output: GetInstanceAccessOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceAccess",
}));

export type GetPlayerConnectionDetailsError =
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (server SDK 5.x or later), Container
 *
 * Retrieves connection details for game clients to connect to game sessions.
 *
 * **Player gateway benefits:** DDoS protection with negligible impact to latency.
 *
 * To enable player gateway on your fleet, set `PlayerGatewayMode` to `ENABLED` or `REQUIRED` when calling
 * CreateFleet or
 * CreateContainerFleet.
 *
 * **How to use:** After creating a game session and adding players, call this operation with the game session ID and player IDs. When player gateway is enabled, the response includes connection endpoints and player gateway tokens that your game clients can use to connect to the game session through player gateway. To learn more about player gateway integration, see DDoS protection with Amazon GameLift Servers player gateway.
 *
 * When player gateway is disabled or in locations where player gateway is not supported, this operation returns game server connection information without player gateway tokens, so that your game clients directly connect to the game server endpoint.
 */
export const getPlayerConnectionDetails: API.OperationMethod<
  GetPlayerConnectionDetailsInput,
  GetPlayerConnectionDetailsOutput,
  GetPlayerConnectionDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlayerConnectionDetailsInput,
  output: GetPlayerConnectionDetailsOutput,
  errors: [
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlayerConnectionDetails",
}));

export type ListAliasesError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all aliases for this Amazon Web Services account. You can filter the result set by alias
 * name and/or routing strategy type. Use the pagination parameters to retrieve results in
 * sequential pages.
 *
 * Returned aliases are not listed in any particular order.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesInput,
  ListAliasesOutput,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  Alias
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAliasesInput,
  output: ListAliasesOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Aliases",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListBuildsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves build resources for all builds associated with the Amazon Web Services account in use. You
 * can limit results to builds that are in a specific status by using the
 * `Status` parameter. Use the pagination parameters to retrieve results in
 *
 * Build resources are not listed in any particular order.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const listBuilds: API.PaginatedOperationMethod<
  ListBuildsInput,
  ListBuildsOutput,
  ListBuildsError,
  Credentials | HttpClient.HttpClient,
  Build
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBuildsInput,
  output: ListBuildsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuilds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Builds",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListComputeError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information on the compute resources in an Amazon GameLift Servers fleet. Use the pagination
 * parameters to retrieve results in a set of sequential pages.
 *
 * **Request options**
 *
 * - Retrieve a list of all computes in a fleet. Specify a fleet ID.
 *
 * - Retrieve a list of all computes in a specific fleet location. Specify a fleet
 * ID and location.
 *
 * **Results**
 *
 * If successful, this operation returns information on a set of computes. Depending on
 * the type of fleet, the result includes the following information:
 *
 * - For a managed EC2 fleet (compute type `EC2`), this operation
 * returns information about the EC2 instance. Compute names are EC2 instance
 * IDs.
 *
 * - For an Anywhere fleet (compute type `ANYWHERE`), this operation
 * returns compute names and details from when the compute was registered with
 * `RegisterCompute`. This includes
 * `GameLiftServiceSdkEndpoint` or
 * `GameLiftAgentEndpoint`.
 */
export const listCompute: API.PaginatedOperationMethod<
  ListComputeInput,
  ListComputeOutput,
  ListComputeError,
  Credentials | HttpClient.HttpClient,
  Compute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComputeInput,
  output: ListComputeOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompute",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComputeList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerFleetsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves a collection of container fleet resources in an Amazon Web Services Region. For fleets
 * that have multiple locations, this operation retrieves fleets based on their home Region
 * only.
 *
 * **Request options**
 *
 * - Get a list of all fleets. Call this operation without specifying a container
 * group definition.
 *
 * - Get a list of fleets filtered by container group definition. Provide the
 * container group definition name or ARN value.
 *
 * - To get a list of all Amazon GameLift Servers Realtime fleets with a specific configuration script,
 * provide the script ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns a collection of container fleets that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Fleet IDs are returned in no particular order.
 */
export const listContainerFleets: API.PaginatedOperationMethod<
  ListContainerFleetsInput,
  ListContainerFleetsOutput,
  ListContainerFleetsError,
  Credentials | HttpClient.HttpClient,
  ContainerFleet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainerFleetsInput,
  output: ListContainerFleetsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerFleets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerFleets",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerGroupDefinitionsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves container group definitions for the Amazon Web Services account and Amazon Web Services Region. Use the pagination parameters to retrieve results in a set of sequential
 * pages.
 *
 * This operation returns only the latest version of each definition. To retrieve all
 * versions of a container group definition, use ListContainerGroupDefinitionVersions.
 *
 * **Request options:**
 *
 * - Retrieve the most recent versions of all container group definitions.
 *
 * - Retrieve the most recent versions of all container group definitions, filtered by
 * type. Specify the container group type to filter on.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a set of container group
 * definition versions that match the request.
 *
 * This operation returns the list of container group definitions in no particular order.
 */
export const listContainerGroupDefinitions: API.PaginatedOperationMethod<
  ListContainerGroupDefinitionsInput,
  ListContainerGroupDefinitionsOutput,
  ListContainerGroupDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ContainerGroupDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainerGroupDefinitionsInput,
  output: ListContainerGroupDefinitionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerGroupDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerGroupDefinitions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerGroupDefinitionVersionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves all versions of a container group definition. Use the pagination parameters to
 * retrieve results in a set of sequential pages.
 *
 * **Request options:**
 *
 * - Get all versions of a specified container group definition. Specify the container
 * group definition name or ARN value. (If the ARN value has a version number, it's
 * ignored.)
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a set of container group
 * definition versions that match the request.
 *
 * This operation returns the list of container group definitions in descending version
 * order (latest first).
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const listContainerGroupDefinitionVersions: API.PaginatedOperationMethod<
  ListContainerGroupDefinitionVersionsInput,
  ListContainerGroupDefinitionVersionsOutput,
  ListContainerGroupDefinitionVersionsError,
  Credentials | HttpClient.HttpClient,
  ContainerGroupDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainerGroupDefinitionVersionsInput,
  output: ListContainerGroupDefinitionVersionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerGroupDefinitionVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerGroupDefinitions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListFleetDeploymentsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves a collection of container fleet deployments in an Amazon Web Services Region. Use the
 * pagination parameters to retrieve results as a set of sequential pages.
 *
 * **Request options**
 *
 * - Get a list of all deployments. Call this operation without specifying a fleet ID.
 *
 * - Get a list of all deployments for a fleet. Specify the container fleet ID or ARN value.
 *
 * **Results**
 *
 * If successful, this operation returns a list of deployments that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Deployments are returned starting with the latest.
 */
export const listFleetDeployments: API.PaginatedOperationMethod<
  ListFleetDeploymentsInput,
  ListFleetDeploymentsOutput,
  ListFleetDeploymentsError,
  Credentials | HttpClient.HttpClient,
  FleetDeployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetDeploymentsInput,
  output: ListFleetDeploymentsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetDeployments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetDeployments",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListFleetsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves a collection of fleet resources in an Amazon Web Services Region. You can filter the
 * result set to find only those fleets that are deployed with a specific build or script.
 * For fleets that have multiple locations, this operation retrieves fleets based on their
 * home Region only.
 *
 * You can use operation in the following ways:
 *
 * - To get a list of all fleets in a Region, don't provide a build or script
 * identifier.
 *
 * - To get a list of all fleets where a specific game build is deployed, provide
 * the build ID.
 *
 * - To get a list of all Amazon GameLift Servers Realtime fleets with a specific configuration script,
 * provide the script ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns a list of fleet IDs that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Fleet IDs are returned in no particular order.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsInput,
  ListFleetsOutput,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetsInput,
  output: ListFleetsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetIds",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListGameServerGroupsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Lists a game server groups.
 */
export const listGameServerGroups: API.PaginatedOperationMethod<
  ListGameServerGroupsInput,
  ListGameServerGroupsOutput,
  ListGameServerGroupsError,
  Credentials | HttpClient.HttpClient,
  GameServerGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGameServerGroupsInput,
  output: ListGameServerGroupsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGameServerGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServerGroups",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListGameServersError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information on all game
 * servers that are currently active in a specified game server group. You can opt to sort
 * the list by game server age. Use the pagination parameters to retrieve results in a set
 * of sequential segments.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const listGameServers: API.PaginatedOperationMethod<
  ListGameServersInput,
  ListGameServersOutput,
  ListGameServersError,
  Credentials | HttpClient.HttpClient,
  GameServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGameServersInput,
  output: ListGameServersOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGameServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServers",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListLocationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Lists all custom and Amazon Web Services locations where Amazon GameLift Servers can host game servers.
 * This operation also returns UDP ping beacon information for
 * locations, which you can use to measure network latency between player devices
 * and potential hosting locations.
 *
 * **Learn more**
 *
 * Service locations
 */
export const listLocations: API.PaginatedOperationMethod<
  ListLocationsInput,
  ListLocationsOutput,
  ListLocationsError,
  Credentials | HttpClient.HttpClient,
  LocationModel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLocationsInput,
  output: ListLocationsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Locations",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListScriptsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves script records for all Realtime scripts that are associated with the Amazon Web Services
 * account in use.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const listScripts: API.PaginatedOperationMethod<
  ListScriptsInput,
  ListScriptsOutput,
  ListScriptsError,
  Credentials | HttpClient.HttpClient,
  Script
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScriptsInput,
  output: ListScriptsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScripts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scripts",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all tags assigned to a Amazon GameLift Servers resource. Use resource tags to organize Amazon Web Services
 * resources for a range of purposes. This operation handles the permissions necessary to
 * manage tags for Amazon GameLift Servers resources that support tagging.
 *
 * To list tags for a resource, specify the unique ARN value for the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
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
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutScalingPolicyError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Creates or updates a scaling policy for a fleet. Scaling policies are used to
 * automatically scale a fleet's hosting capacity to meet player demand. An active scaling
 * policy instructs Amazon GameLift Servers to track a fleet metric and automatically change the fleet's
 * capacity when a certain threshold is reached. There are two types of scaling policies:
 * target-based and rule-based. Use a target-based policy to quickly and efficiently manage
 * fleet scaling; this option is the most commonly used. Use rule-based policies when you
 * need to exert fine-grained control over auto-scaling.
 *
 * Fleets can have multiple scaling policies of each type in force at the same time; you
 * can have one target-based policy, one or multiple rule-based scaling policies, or both.
 * We recommend caution, however, because multiple auto-scaling policies can have
 * unintended consequences.
 *
 * Learn more about how to work with auto-scaling in Set Up Fleet Automatic
 * Scaling.
 *
 * **Target-based policy**
 *
 * A target-based policy tracks a single metric: PercentAvailableGameSessions. This
 * metric tells us how much of a fleet's hosting capacity is ready to host game sessions
 * but is not currently in use. This is the fleet's buffer; it measures the additional
 * player demand that the fleet could handle at current capacity. With a target-based
 * policy, you set your ideal buffer size and leave it to Amazon GameLift Servers to take whatever action is
 * needed to maintain that target.
 *
 * For example, you might choose to maintain a 10% buffer for a fleet that has the
 * capacity to host 100 simultaneous game sessions. This policy tells Amazon GameLift Servers to take action
 * whenever the fleet's available capacity falls below or rises above 10 game sessions.
 * Amazon GameLift Servers will start new instances or stop unused instances in order to return to the 10%
 * buffer.
 *
 * To create or update a target-based policy, specify a fleet ID and name, and set the
 * policy type to "TargetBased". Specify the metric to track (PercentAvailableGameSessions)
 * and reference a `TargetConfiguration` object with your desired buffer value.
 * Exclude all other parameters. On a successful request, the policy name is returned. The
 * scaling policy is automatically in force as soon as it's successfully created. If the
 * fleet's auto-scaling actions are temporarily suspended, the new policy will be in force
 * once the fleet actions are restarted.
 *
 * **Rule-based policy**
 *
 * A rule-based policy tracks specified fleet metric, sets a threshold value, and
 * specifies the type of action to initiate when triggered. With a rule-based policy, you
 * can select from several available fleet metrics. Each policy specifies whether to scale
 * up or scale down (and by how much), so you need one policy for each type of action.
 *
 * For example, a policy may make the following statement: "If the percentage of idle
 * instances is greater than 20% for more than 15 minutes, then reduce the fleet capacity
 * by 10%."
 *
 * A policy's rule statement has the following structure:
 *
 * If `[MetricName]` is `[ComparisonOperator]`
 * `[Threshold]` for `[EvaluationPeriods]` minutes, then
 * `[ScalingAdjustmentType]` to/by `[ScalingAdjustment]`.
 *
 * To implement the example, the rule statement would look like this:
 *
 * If `[PercentIdleInstances]` is `[GreaterThanThreshold]`
 * `[20]` for `[15]` minutes, then
 * `[PercentChangeInCapacity]` to/by `[10]`.
 *
 * To create or update a scaling policy, specify a unique combination of name and fleet
 * ID, and set the policy type to "RuleBased". Specify the parameter values for a policy
 * rule statement. On a successful request, the policy name is returned. Scaling policies
 * are automatically in force as soon as they're successfully created. If the fleet's
 * auto-scaling actions are temporarily suspended, the new policy will be in force once the
 * fleet actions are restarted.
 */
export const putScalingPolicy: API.OperationMethod<
  PutScalingPolicyInput,
  PutScalingPolicyOutput,
  PutScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutScalingPolicyInput,
  output: PutScalingPolicyOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
}));

export type RegisterComputeError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Registers a compute resource in an Amazon GameLift Servers Anywhere fleet.
 *
 * For an Anywhere fleet that's running the Amazon GameLift Servers Agent, the Agent
 * handles all compute registry tasks for you. For an Anywhere fleet that doesn't use the
 * Agent, call this operation to register fleet computes.
 *
 * To register a compute, give the compute a name (must be unique within the
 * fleet) and specify the compute resource's DNS name or IP address. Provide a
 * fleet ID and a fleet location to associate with the compute being registered. You can
 * optionally include the path to a TLS certificate on the compute resource.
 *
 * If successful, this operation returns compute details, including an Amazon GameLift Servers SDK
 * endpoint or Agent endpoint. Game server processes running on the compute can use this
 * endpoint to communicate with the Amazon GameLift Servers service. Each server process includes the SDK
 * endpoint in its call to the Amazon GameLift Servers server SDK action `InitSDK()`.
 *
 * To view compute details, call DescribeCompute with the compute name.
 *
 * **Learn more**
 *
 * - Create an
 * Anywhere fleet
 *
 * - Test your
 * integration
 *
 * - Server SDK
 * reference guides (for version 5.x)
 */
export const registerCompute: API.OperationMethod<
  RegisterComputeInput,
  RegisterComputeOutput,
  RegisterComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterComputeInput,
  output: RegisterComputeOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCompute",
}));

export type RegisterGameServerError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Creates a new game server
 * resource and notifies Amazon GameLift Servers FleetIQ that the game server is ready to host gameplay and players.
 * This operation is called by a game server process that is running on an instance in a
 * game server group. Registering game servers enables Amazon GameLift Servers FleetIQ to track available game
 * servers and enables game clients and services to claim a game server for a new game
 * session.
 *
 * To register a game server, identify the game server group and instance where the game
 * server is running, and provide a unique identifier for the game server. You can also
 * include connection and game server data.
 *
 * Once a game server is successfully registered, it is put in status
 * `AVAILABLE`. A request to register a game server may fail if the instance
 * it is running on is in the process of shutting down as part of instance balancing or
 * scale-down activity.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const registerGameServer: API.OperationMethod<
  RegisterGameServerInput,
  RegisterGameServerOutput,
  RegisterGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterGameServerInput,
  output: RegisterGameServerOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterGameServer",
}));

export type RequestUploadCredentialsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fresh set of credentials for use when uploading a new set of game build
 * files to Amazon GameLift Servers's Amazon S3. This is done as part of the build creation process; see
 * CreateBuild.
 *
 * To request new credentials, specify the build ID as returned with an initial
 * `CreateBuild` request. If successful, a new set of credentials are
 * returned, along with the S3 storage location associated with the build ID.
 *
 * **Learn more**
 *
 * Create a Build with Files in S3
 *
 * All APIs by task
 */
export const requestUploadCredentials: API.OperationMethod<
  RequestUploadCredentialsInput,
  RequestUploadCredentialsOutput,
  RequestUploadCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestUploadCredentialsInput,
  output: RequestUploadCredentialsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestUploadCredentials",
}));

export type ResolveAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Attempts to retrieve a fleet ID that is associated with an alias. Specify a unique
 * alias identifier.
 *
 * If the alias has a `SIMPLE` routing strategy, Amazon GameLift Servers returns a fleet ID.
 * If the alias has a `TERMINAL` routing strategy, the result is a
 * `TerminalRoutingStrategyException`.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const resolveAlias: API.OperationMethod<
  ResolveAliasInput,
  ResolveAliasOutput,
  ResolveAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResolveAliasInput,
  output: ResolveAliasOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveAlias",
}));

export type ResumeGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Reinstates activity on a game
 * server group after it has been suspended. A game server group might be suspended by the
 * SuspendGameServerGroup operation, or it might be suspended involuntarily
 * due to a configuration problem. In the second case, you can manually resume activity on
 * the group once the configuration problem has been resolved. Refer to the game server
 * group status and status reason for more information on why group activity is
 * suspended.
 *
 * To resume activity, specify a game server group ARN and the type of activity to be
 * resumed. If successful, a `GameServerGroup` object is returned showing that
 * the resumed activity is no longer listed in `SuspendedActions`.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const resumeGameServerGroup: API.OperationMethod<
  ResumeGameServerGroupInput,
  ResumeGameServerGroupOutput,
  ResumeGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeGameServerGroupInput,
  output: ResumeGameServerGroupOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeGameServerGroup",
}));

export type SearchGameSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all active game sessions that match a set of search criteria and sorts them
 * into a specified order.
 *
 * This operation is not designed to continually track game session status because that practice can cause you to exceed your API limit and generate errors. Instead, configure an Amazon Simple Notification Service (Amazon SNS) topic to receive notifications from a matchmaker or a game session placement queue.
 *
 * When searching for game sessions, you specify exactly where you want to search and
 * provide a search filter expression, a sort expression, or both. A search request can
 * search only one fleet, but it can search all of a fleet's locations.
 *
 * This operation can be used in the following ways:
 *
 * - To search all game sessions that are currently running on all locations in a
 * fleet, provide a fleet or alias ID. This approach returns game sessions in the
 * fleet's home Region and all remote locations that fit the search
 * criteria.
 *
 * - To search all game sessions that are currently running on a specific fleet
 * location, provide a fleet or alias ID and a location name. For location, you can
 * specify a fleet's home Region or any remote location.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSession` object is returned for each game session
 * that matches the request. Search finds game sessions that are in `ACTIVE`
 * status only. To retrieve information on game sessions in other statuses, use DescribeGameSessions.
 *
 * To set search and sort criteria, create a filter expression using the following game session attributes. For game session search examples, see the Examples section of this topic.
 *
 * - **gameSessionId** -- An identifier for the game session that is unique across all regions. You must use the
 * full ARN value.
 *
 * - **gameSessionName** -- Name assigned to a game
 * session. Game session names do not need to be unique to a game session.
 *
 * - **gameSessionProperties** -- A set of key-value pairs that can store custom data in a game session.
 * For example: `{"Key": "difficulty", "Value": "novice"}`.
 * The filter expression must specify the https://docs.aws.amazon.com/gamelift/latest/apireference/API_GameProperty -- a `Key` and a string `Value` to search for the game sessions.
 *
 * For example, to search for the above key-value pair, specify the following search filter: `gameSessionProperties.difficulty = "novice"`.
 * All game property values are searched as strings.
 *
 * For examples of searching game sessions, see the ones below, and also see Search game sessions by game property.
 *
 * - Avoid using periods (".") in property keys if you plan to search for game sessions by properties. Property keys containing periods cannot be searched and will be filtered out from search results due to search index limitations.
 *
 * - If you use SearchGameSessions API, there is a limit of 500 game property keys across all game sessions and all fleets per region. If the limit is exceeded, there will potentially be game session entries missing from SearchGameSessions API results.
 *
 * - **maximumSessions** -- Maximum number of player
 * sessions allowed for a game session.
 *
 * - **creationTimeMillis** -- Value indicating when a
 * game session was created. It is expressed in Unix time as milliseconds.
 *
 * - **playerSessionCount** -- Number of players
 * currently connected to a game session. This value changes rapidly as players
 * join the session or drop out.
 *
 * - **hasAvailablePlayerSessions** -- Boolean value
 * indicating whether a game session has reached its maximum number of players. It
 * is highly recommended that all search requests include this filter attribute to
 * optimize search performance and return only sessions that players can join.
 *
 * Returned values for `playerSessionCount` and
 * `hasAvailablePlayerSessions` change quickly as players join sessions
 * and others drop out. Results should be considered a snapshot in time. Be sure to
 * refresh search results often, and handle sessions that fill up before a player can
 * join.
 *
 * All APIs by task
 */
export const searchGameSessions: API.PaginatedOperationMethod<
  SearchGameSessionsInput,
  SearchGameSessionsOutput,
  SearchGameSessionsError,
  Credentials | HttpClient.HttpClient,
  GameSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchGameSessionsInput,
  output: SearchGameSessionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGameSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type StartFleetActionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Resumes certain types of activity on fleet instances that were suspended with StopFleetActions. For multi-location fleets, fleet actions are managed
 * separately for each location. Currently, this operation is used to restart a fleet's
 * auto-scaling activity.
 *
 * This operation can be used in the following ways:
 *
 * - To restart actions on instances in the fleet's home Region, provide a fleet ID
 * and the type of actions to resume.
 *
 * - To restart actions on instances in one of the fleet's remote locations,
 * provide a fleet ID, a location name, and the type of actions to resume.
 *
 * If successful, Amazon GameLift Servers once again initiates scaling events as triggered by the fleet's
 * scaling policies. If actions on the fleet location were never stopped, this operation
 * will have no effect.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const startFleetActions: API.OperationMethod<
  StartFleetActionsInput,
  StartFleetActionsOutput,
  StartFleetActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFleetActionsInput,
  output: StartFleetActionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFleetActions",
}));

export type StartGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Makes a request to start a new game session using a game session queue. When
 * processing a placement request, Amazon GameLift Servers looks for the best possible available resource to
 * host the game session, based on how the queue is configured to prioritize factors such
 * as resource cost, latency, and location. After selecting an available resource, Amazon GameLift Servers
 * prompts the resource to start a game session. A placement request can include a list of
 * players to create a set of player sessions. The request can also include information to
 * pass to the new game session, such as to specify a game map or other options.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests.
 *
 * - Request a placement using the queue's default prioritization process (see the
 * default prioritization described in PriorityConfiguration). Include these required parameters:
 *
 * - `GameSessionQueueName`
 *
 * - `MaximumPlayerSessionCount`
 *
 * - `PlacementID`
 *
 * - Request a placement and prioritize based on latency. Include these
 * parameters:
 *
 * - Required parameters `GameSessionQueueName`,
 * `MaximumPlayerSessionCount`,
 * `PlacementID`.
 *
 * - `PlayerLatencies`. Include a set of latency values for
 * destinations in the queue. When a request includes latency data, Amazon GameLift Servers
 * automatically reorder the queue's locations priority list based on
 * lowest available latency values. If a request includes latency data for
 * multiple players, Amazon GameLift Servers calculates each location's average latency for
 * all players and reorders to find the lowest latency across all players.
 *
 * - Don't include `PriorityConfigurationOverride`.
 *
 * - Prioritize based on a custom list of locations. If you're using a
 * queue that's configured to prioritize location first (see PriorityConfiguration for game session queues), you can
 * optionally use the *PriorityConfigurationOverride*
 * parameter to substitute a different location priority list for this
 * placement request. Amazon GameLift Servers searches each location on the priority
 * override list to find an available hosting resource for the new game
 * session. Specify a fallback strategy to use in the event that Amazon GameLift Servers
 * fails to place the game session in any of the locations on the override
 * list.
 *
 * - Request a placement and prioritized based on a custom list of locations.
 *
 * - You can request new player sessions for a group of players. Include the
 * *DesiredPlayerSessions* parameter and include at minimum
 * a unique player ID for each. You can also include player-specific data to pass
 * to the new game session.
 *
 * **Result**
 *
 * If successful, this operation generates a new game session placement request and adds
 * it to the game session queue for processing. You can track the status of individual
 * placement requests by calling DescribeGameSessionPlacement or by monitoring queue notifications. When the
 * request status is `FULFILLED`, a new game session has started and the
 * placement request is updated with connection information for the game session (IP
 * address and port). If the request included player session data, Amazon GameLift Servers creates a player
 * session for each player ID in the request.
 *
 * The request results in a `InvalidRequestException` in the following
 * situations:
 *
 * - If the request includes both *PlayerLatencies* and
 * *PriorityConfigurationOverride* parameters.
 *
 * - If the request includes the *PriorityConfigurationOverride*
 * parameter and specifies a queue that doesn't prioritize locations.
 *
 * Amazon GameLift Servers continues to retry each placement request until it reaches the queue's timeout
 * setting. If a request times out, you can resubmit the request to the same queue or try a
 * different queue.
 */
export const startGameSessionPlacement: API.OperationMethod<
  StartGameSessionPlacementInput,
  StartGameSessionPlacementOutput,
  StartGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartGameSessionPlacementInput,
  output: StartGameSessionPlacementOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGameSessionPlacement",
}));

export type StartMatchBackfillError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Finds new players to fill open slots in currently running game sessions. The backfill
 * match process is essentially identical to the process of forming new matches. Backfill
 * requests use the same matchmaker that was used to make the original match, and they
 * provide matchmaking data for all players currently in the game session. FlexMatch uses
 * this information to select new players so that backfilled match continues to meet the
 * original match requirements.
 *
 * When using FlexMatch with Amazon GameLift Servers managed hosting, you can request a backfill match from
 * a client service by calling this operation with a `GameSessions` ID. You also
 * have the option of making backfill requests directly from your game server. In response
 * to a request, FlexMatch creates player sessions for the new players, updates the
 * `GameSession` resource, and sends updated matchmaking data to the game
 * server. You can request a backfill match at any point after a game session is started.
 * Each game session can have only one active backfill request at a time; a subsequent
 * request automatically replaces the earlier request.
 *
 * When using FlexMatch as a standalone component, request a backfill match by calling this
 * operation without a game session identifier. As with newly formed matches, matchmaking
 * results are returned in a matchmaking event so that your game can update the game
 * session that is being backfilled.
 *
 * To request a backfill match, specify a unique ticket ID, the original matchmaking
 * configuration, and matchmaking data for all current players in the game session being
 * backfilled. Optionally, specify the `GameSession` ARN. If successful, a match
 * backfill ticket is created and returned with status set to QUEUED. Track the status of
 * backfill tickets using the same method for tracking tickets for new matches.
 *
 * Only game sessions created by FlexMatch are supported for match backfill.
 *
 * **Learn more**
 *
 * Backfill existing games with FlexMatch
 *
 * Matchmaking events (reference)
 *
 * How Amazon GameLift Servers FlexMatch works
 */
export const startMatchBackfill: API.OperationMethod<
  StartMatchBackfillInput,
  StartMatchBackfillOutput,
  StartMatchBackfillError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMatchBackfillInput,
  output: StartMatchBackfillOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchBackfill",
}));

export type StartMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Uses FlexMatch to create a game match for a group of players based on custom matchmaking
 * rules. With games that use Amazon GameLift Servers managed hosting, this operation also triggers Amazon GameLift Servers
 * to find hosting resources and start a new game session for the new match. Each
 * matchmaking request includes information on one or more players and specifies the
 * FlexMatch matchmaker to use. When a request is for multiple players, FlexMatch attempts to
 * build a match that includes all players in the request, placing them in the same team
 * and finding additional players as needed to fill the match.
 *
 * To start matchmaking, provide a unique ticket ID, specify a matchmaking configuration,
 * and include the players to be matched. You must also include any player attributes that
 * are required by the matchmaking configuration's rule set. If successful, a matchmaking
 * ticket is returned with status set to `QUEUED`.
 *
 * Track matchmaking events to respond as needed and acquire game session connection
 * information for successfully completed matches. Ticket status updates are tracked using
 * event notification through Amazon Simple Notification Service, which is defined in the matchmaking
 * configuration.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * Set Up FlexMatch event
 * notification
 *
 * How Amazon GameLift Servers FlexMatch works
 */
export const startMatchmaking: API.OperationMethod<
  StartMatchmakingInput,
  StartMatchmakingOutput,
  StartMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMatchmakingInput,
  output: StartMatchmakingOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchmaking",
}));

export type StopFleetActionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Suspends certain types of activity in a fleet location. Currently, this operation is
 * used to stop auto-scaling activity. For multi-location fleets, fleet actions are managed
 * separately for each location.
 *
 * Stopping fleet actions has several potential purposes. It allows you to temporarily
 * stop auto-scaling activity but retain your scaling policies for use in the future. For
 * multi-location fleets, you can set up fleet-wide auto-scaling, and then opt out of it
 * for certain locations.
 *
 * This operation can be used in the following ways:
 *
 * - To stop actions on instances in the fleet's home Region, provide a fleet ID
 * and the type of actions to suspend.
 *
 * - To stop actions on instances in one of the fleet's remote locations, provide a
 * fleet ID, a location name, and the type of actions to suspend.
 *
 * If successful, Amazon GameLift Servers no longer initiates scaling events except in response to manual
 * changes using UpdateFleetCapacity. To restart fleet actions again, call
 * StartFleetActions.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const stopFleetActions: API.OperationMethod<
  StopFleetActionsInput,
  StopFleetActionsOutput,
  StopFleetActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopFleetActionsInput,
  output: StopFleetActionsOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFleetActions",
}));

export type StopGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Cancels a game session placement that's in `PENDING` status. To stop a
 * placement, provide the placement ID value.
 *
 * Results
 *
 * If successful, this operation removes the placement request from the queue and moves
 * the `GameSessionPlacement` to `CANCELLED` status.
 *
 * This operation results in an `InvalidRequestExecption` (400) error if a
 * game session has already been created for this placement. You can clean up an unneeded
 * game session by calling TerminateGameSession.
 */
export const stopGameSessionPlacement: API.OperationMethod<
  StopGameSessionPlacementInput,
  StopGameSessionPlacementOutput,
  StopGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopGameSessionPlacementInput,
  output: StopGameSessionPlacementOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGameSessionPlacement",
}));

export type StopMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Cancels a matchmaking ticket or match backfill ticket that is currently being
 * processed. To stop the matchmaking operation, specify the ticket ID. If successful, work
 * on the ticket is stopped, and the ticket status is changed to
 * `CANCELLED`.
 *
 * This call is also used to turn off automatic backfill for an individual game session.
 * This is for game sessions that are created with a matchmaking configuration that has
 * automatic backfill enabled. The ticket ID is included in the `MatchmakerData`
 * of an updated game session object, which is provided to the game server.
 *
 * If the operation is successful, the service sends back an empty JSON struct with
 * the HTTP 200 response (not an empty HTTP body).
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 */
export const stopMatchmaking: API.OperationMethod<
  StopMatchmakingInput,
  StopMatchmakingOutput,
  StopMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopMatchmakingInput,
  output: StopMatchmakingOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMatchmaking",
}));

export type SuspendGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Temporarily stops activity on
 * a game server group without terminating instances or the game server group. You can
 * restart activity by calling ResumeGameServerGroup. You can suspend the following activity:
 *
 * - **Instance type replacement** - This activity
 * evaluates the current game hosting viability of all Spot instance types that are
 * defined for the game server group. It updates the Auto Scaling group to remove
 * nonviable Spot Instance types, which have a higher chance of game server
 * interruptions. It then balances capacity across the remaining viable Spot
 * Instance types. When this activity is suspended, the Auto Scaling group
 * continues with its current balance, regardless of viability. Instance
 * protection, utilization metrics, and capacity scaling activities continue to be
 * active.
 *
 * To suspend activity, specify a game server group ARN and the type of activity to be
 * suspended. If successful, a `GameServerGroup` object is returned showing that
 * the activity is listed in `SuspendedActions`.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const suspendGameServerGroup: API.OperationMethod<
  SuspendGameServerGroupInput,
  SuspendGameServerGroupOutput,
  SuspendGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SuspendGameServerGroupInput,
  output: SuspendGameServerGroupOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendGameServerGroup",
}));

export type TagResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Assigns a tag to an Amazon GameLift Servers resource. You can use tags to organize resources, create
 * IAM permissions policies to manage access to groups of resources, customize Amazon Web Services cost
 * breakdowns, and more. This operation handles the permissions necessary to manage tags
 * for Amazon GameLift Servers resources that support tagging.
 *
 * To add a tag to a resource, specify the unique ARN value for the resource and provide
 * a tag list containing one or more tags. The operation succeeds even if the list includes
 * tags that are already assigned to the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
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
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateGameSessionError =
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Ends a game session that's currently in progress. Use this action to terminate any
 * game session that isn't in `ERROR` status. Terminating a game session is the
 * most efficient way to free up a server process when it's hosting a game session that's
 * in a bad state or not ending properly. You can use this action to terminate a game
 * session that's being hosted on any type of Amazon GameLift Servers fleet compute, including computes for
 * managed EC2, managed container, and Anywhere fleets. The game server must be integrated
 * with Amazon GameLift Servers server SDK 5.x or greater.
 *
 * **Request options**
 *
 * Request termination for a single game session. Provide the game session ID and the
 * termination mode. There are two potential methods for terminating a game session:
 *
 * - Initiate a graceful termination using the normal game session shutdown
 * sequence. With this mode, the Amazon GameLift Servers service prompts the server process that's
 * hosting the game session by calling the server SDK callback method
 * `OnProcessTerminate()`. The callback implementation is part of
 * the custom game server code. It might involve a variety of actions to gracefully
 * end a game session, such as notifying players, before stopping the server
 * process.
 *
 * - Force an immediate game session termination. With this mode, the Amazon GameLift Servers
 * service takes action to stop the server process, which ends the game session
 * without the normal game session shutdown sequence.
 *
 * **Results**
 *
 * If successful, game session termination is initiated. During this activity, the game
 * session status is changed to `TERMINATING`. When completed, the server
 * process that was hosting the game session has been stopped and replaced with a new
 * server process that's ready to host a new game session. The old game session's status is
 * changed to `TERMINATED` with a status reason that indicates the termination
 * method used.
 *
 * **Learn more**
 *
 * Add Amazon GameLift Servers to your game server
 *
 * Amazon GameLift Servers server SDK 5 reference guide for `OnProcessTerminate()`
 * (C++)
 * (C#)
 * (Unreal)
 * (Go)
 */
export const terminateGameSession: API.OperationMethod<
  TerminateGameSessionInput,
  TerminateGameSessionOutput,
  TerminateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateGameSessionInput,
  output: TerminateGameSessionOutput,
  errors: [
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateGameSession",
}));

export type UntagResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Removes a tag assigned to a Amazon GameLift Servers resource. You can use resource tags to organize
 * Amazon Web Services resources for a range of purposes. This operation handles the permissions
 * necessary to manage tags for Amazon GameLift Servers resources that support tagging.
 *
 * To remove a tag from a resource, specify the unique ARN value for the resource and
 * provide a string list containing one or more tags to remove. This operation succeeds
 * even if the list includes tags that aren't assigned to the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
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
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates properties for an alias. Specify the unique identifier of the alias to be
 * updated and the new property values.
 *
 * When reassigning an alias to a new fleet, provide
 * an updated routing strategy. If successful, the updated alias record is returned.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const updateAlias: API.OperationMethod<
  UpdateAliasInput,
  UpdateAliasOutput,
  UpdateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAliasInput,
  output: UpdateAliasOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
}));

export type UpdateBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates metadata in a build resource, including the build name and version. To update
 * the metadata, specify the build ID to update and provide the new values. If successful,
 * a build object containing the updated metadata is returned.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const updateBuild: API.OperationMethod<
  UpdateBuildInput,
  UpdateBuildOutput,
  UpdateBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBuildInput,
  output: UpdateBuildOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBuild",
}));

export type UpdateContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Updates the properties of a managed container fleet. Depending on the properties being
 * updated, this operation might initiate a fleet deployment. You can track deployments for
 * a fleet using https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetDeployment.html.
 *
 * A managed fleet's runtime environment, which depends on the fleet's
 * Amazon Machine Image {AMI} version, can't be updated. You must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Request options**
 *
 * As with CreateContainerFleet, many fleet properties use common defaults or are
 * calculated based on the fleet's container group definitions.
 *
 * - Update fleet properties that result in a fleet deployment. Include only those
 * properties that you want to change. Specify deployment configuration
 * settings.
 *
 * - Update fleet properties that don't result in a fleet deployment. Include only
 * those properties that you want to change.
 *
 * Changes to the following properties initiate a fleet deployment:
 *
 * - `GameServerContainerGroupDefinition`
 *
 * - `PerInstanceContainerGroupDefinition`
 *
 * - `GameServerContainerGroupsPerInstance`
 *
 * - `InstanceInboundPermissions`
 *
 * - `InstanceConnectionPortRange`
 *
 * - `LogConfiguration`
 *
 * **Results**
 *
 * If successful, this operation updates the container fleet resource, and might initiate
 * a new deployment of fleet resources using the deployment configuration provided. A
 * deployment replaces existing fleet instances with new instances that are deployed with
 * the updated fleet properties. The fleet is placed in `UPDATING` status until
 * the deployment is complete, then return to `ACTIVE`.
 *
 * You can have only one update deployment active at a time for a fleet. If a second
 * update request initiates a deployment while another deployment is in progress, the first
 * deployment is cancelled.
 */
export const updateContainerFleet: API.OperationMethod<
  UpdateContainerFleetInput,
  UpdateContainerFleetOutput,
  UpdateContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerFleetInput,
  output: UpdateContainerFleetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerFleet",
}));

export type UpdateContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Updates properties in an existing container group definition. This operation doesn't
 * replace the definition. Instead, it creates a new version of the definition and saves it
 * separately. You can access all versions that you choose to retain.
 *
 * The only property you can't update is the container group type.
 *
 * **Request options:**
 *
 * - Update based on the latest version of the container group definition. Specify the
 * container group definition name only, or use an ARN value without a version number.
 * Provide updated values for the properties that you want to change only. All other values
 * remain the same as the latest version.
 *
 * - Update based on a specific version of the container group definition. Specify the
 * container group definition name and a source version number, or use an ARN value with a
 * version number. Provide updated values for the properties that you want to change only.
 * All other values remain the same as the source version.
 *
 * - Change a game server container definition. Provide a complete set of container
 * definitions, including the updated definition.
 *
 * - Add or change a support container definition. Provide a complete set of container
 * definitions, including the updated definition.
 *
 * - Remove a support container definition. Provide a complete set of container
 * definitions, excluding the definition to remove. If the container group has only one
 * support container definition, provide an empty set.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of the new container group
 * definition version.
 *
 * If the container group definition version is used in an active fleets, the update
 * automatically initiates a new fleet deployment of the new version. You can track a fleet's
 * deployments using ListFleetDeployments.
 */
export const updateContainerGroupDefinition: API.OperationMethod<
  UpdateContainerGroupDefinitionInput,
  UpdateContainerGroupDefinitionOutput,
  UpdateContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContainerGroupDefinitionInput,
  output: UpdateContainerGroupDefinitionOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerGroupDefinition",
}));

export type UpdateFleetAttributesError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Updates a fleet's mutable attributes, such as game session protection and resource
 * creation limits.
 *
 * To update fleet attributes, specify the fleet ID and the property values that you want
 * to change. If successful, Amazon GameLift Servers returns the identifiers for the updated fleet.
 *
 * A managed fleet's runtime environment, which depends on the fleet's
 * Amazon Machine Image {AMI} version, can't be updated. You must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateFleetAttributes: API.OperationMethod<
  UpdateFleetAttributesInput,
  UpdateFleetAttributesOutput,
  UpdateFleetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetAttributesInput,
  output: UpdateFleetAttributesOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetAttributes",
}));

export type UpdateFleetCapacityError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Updates capacity settings for a managed EC2 fleet or managed container fleet. For these
 * fleets, you adjust capacity by changing the number of instances in the fleet. Fleet
 * capacity determines the number of game sessions and players that the fleet can host
 * based on its configuration. For fleets with multiple locations, use this operation to
 * manage capacity settings in each location individually.
 *
 * - Minimum/maximum size: Set hard limits on the number of Amazon EC2 instances allowed. If Amazon GameLift Servers receives a
 * request--either through manual update or automatic scaling--it won't change the capacity
 * to a value outside of this range.
 *
 * - Desired capacity: As an alternative to automatic scaling, manually set the number of Amazon EC2
 * instances to be maintained.
 * Before changing a fleet's desired capacity, check the maximum capacity of the
 * fleet's Amazon EC2 instance type by calling DescribeEC2InstanceLimits.
 *
 * To update capacity for a fleet's home Region, or if the fleet has no remote
 * locations, omit the `Location` parameter. The fleet must be in
 * `ACTIVE` status.
 *
 * To update capacity for a fleet's remote location, set the
 * `Location` parameter to the location to update. The location must be in
 * `ACTIVE` status.
 *
 * If successful, Amazon GameLift Servers updates the capacity settings and returns the identifiers for
 * the updated fleet and/or location. If a requested change to desired capacity exceeds the
 * instance type's limit, the `LimitExceeded` exception occurs.
 *
 * Updates often prompt an immediate change in fleet capacity, such as when current
 * capacity is different than the new desired capacity or outside the new limits. In this
 * scenario, Amazon GameLift Servers automatically initiates steps to add or remove instances in the fleet
 * location. You can track a fleet's current capacity by calling DescribeFleetCapacity or DescribeFleetLocationCapacity.
 *
 * Use ManagedCapacityConfiguration with the "SCALE_TO_AND_FROM_ZERO" ZeroCapacityStrategy to enable Amazon
 * GameLift Servers to fully manage the MinSize value, switching between 0 and 1 based on game session
 * activity. This is ideal for eliminating compute costs during periods of no game activity.
 * It is particularly beneficial during development when you're away from your desk, iterating on builds
 * for extended periods, in production environments serving low-traffic locations, or for games with long,
 * predictable downtime windows. By automatically managing capacity between 0 and 1 instances, you avoid paying
 * for idle instances while maintaining the ability to serve game sessions when demand arrives. Note that while
 * scale-out is triggered immediately upon receiving a game session request, actual game session availability
 * depends on your server process startup time, so this approach works best with multi-location Fleets where
 * cold-start latency is tolerable. With a "MANUAL" ZeroCapacityStrategy Amazon GameLift Servers will not
 * modify Fleet MinSize values automatically and will not scale out from zero instances in response to game
 * sessions. This is configurable per-location.
 *
 * **Learn more**
 *
 * Scaling fleet
 * capacity
 */
export const updateFleetCapacity: API.OperationMethod<
  UpdateFleetCapacityInput,
  UpdateFleetCapacityOutput,
  UpdateFleetCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetCapacityInput,
  output: UpdateFleetCapacityOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetCapacity",
}));

export type UpdateFleetPortSettingsError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates permissions that allow inbound traffic to connect to game sessions in the
 * fleet.
 *
 * To update settings, specify the fleet ID to be updated and specify the changes to be
 * made. List the permissions you want to add in
 * `InboundPermissionAuthorizations`, and permissions you want to remove in
 * `InboundPermissionRevocations`. Permissions to be removed must match
 * existing fleet permissions.
 *
 * If successful, the fleet identifiers for the updated fleet are returned. For fleets with remote
 * locations, port setting updates can take time to propagate across all locations. You can
 * check the status of updates in each location by calling
 * `DescribeFleetPortSettings` with a location name.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateFleetPortSettings: API.OperationMethod<
  UpdateFleetPortSettingsInput,
  UpdateFleetPortSettingsOutput,
  UpdateFleetPortSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetPortSettingsInput,
  output: UpdateFleetPortSettingsOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetPortSettings",
}));

export type UpdateGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Updates information about a registered game server to help Amazon GameLift Servers FleetIQ track game server
 * availability. This operation is called by a game server process that is running on an
 * instance in a game server group.
 *
 * Use this operation to update the following types of game server information. You can
 * make all three types of updates in the same request:
 *
 * - To update the game server's utilization status from `AVAILABLE`
 * (when the game server is available to be claimed) to `UTILIZED` (when
 * the game server is currently hosting games). Identify the game server and game
 * server group and specify the new utilization status. You can't change the status
 * from to `UTILIZED` to `AVAILABLE` .
 *
 * - To report health status, identify the game server and game server group and
 * set health check to `HEALTHY`. If a game server does not report
 * health status for a certain length of time, the game server is no longer
 * considered healthy. As a result, it will be eventually deregistered from the
 * game server group to avoid affecting utilization metrics. The best practice is
 * to report health every 60 seconds.
 *
 * - To change game server metadata, provide updated game server data.
 *
 * Once a game server is successfully updated, the relevant statuses and timestamps are
 * updated.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const updateGameServer: API.OperationMethod<
  UpdateGameServerInput,
  UpdateGameServerOutput,
  UpdateGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGameServerInput,
  output: UpdateGameServerOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServer",
}));

export type UpdateGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Updates Amazon GameLift Servers FleetIQ-specific
 * properties for a game server group. Many Auto Scaling group properties are updated on
 * the Auto Scaling group directly, including the launch template, Auto Scaling policies,
 * and maximum/minimum/desired instance counts.
 *
 * To update the game server group, specify the game server group ID and provide the
 * updated values. Before applying the updates, the new values are validated to ensure that
 * Amazon GameLift Servers FleetIQ can continue to perform instance balancing activity. If successful, a
 * `GameServerGroup` object is returned.
 *
 * Target tracking Auto Scaling policies on the Auto Scaling group cannot be
 * updated through the Amazon Web Services Management Console. Instead, use the Amazon Elastic Compute Cloud Auto Scaling
 *
 * `PutScalingPolicy`
 * API action to update these policies.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const updateGameServerGroup: API.OperationMethod<
  UpdateGameServerGroupInput,
  UpdateGameServerGroupOutput,
  UpdateGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGameServerGroupInput,
  output: UpdateGameServerGroupOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServerGroup",
}));

export type UpdateGameSessionError =
  | ConflictException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates the mutable properties of a game session.
 *
 * To update a game session, specify the game session ID and the values you want to
 * change.
 *
 * If successful, the updated `GameSession` object is returned.
 *
 * All APIs by task
 */
export const updateGameSession: API.OperationMethod<
  UpdateGameSessionInput,
  UpdateGameSessionOutput,
  UpdateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGameSessionInput,
  output: UpdateGameSessionOutput,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameSession",
}));

export type UpdateGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates the configuration of a game session queue, which determines how the queue
 * processes new game session requests. To update settings, specify the queue name to be
 * updated and provide the new settings. When updating destinations, provide a complete
 * list of destinations.
 *
 * **Learn more**
 *
 * Using Multi-Region Queues
 */
export const updateGameSessionQueue: API.OperationMethod<
  UpdateGameSessionQueueInput,
  UpdateGameSessionQueueOutput,
  UpdateGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGameSessionQueueInput,
  output: UpdateGameSessionQueueOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameSessionQueue",
}));

export type UpdateMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates settings for a FlexMatch matchmaking configuration. These changes affect all
 * matches and game sessions that are created after the update. To update settings, specify
 * the configuration name to be updated and provide the new settings.
 *
 * **Learn more**
 *
 * Design a FlexMatch
 * matchmaker
 */
export const updateMatchmakingConfiguration: API.OperationMethod<
  UpdateMatchmakingConfigurationInput,
  UpdateMatchmakingConfigurationOutput,
  UpdateMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMatchmakingConfigurationInput,
  output: UpdateMatchmakingConfigurationOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMatchmakingConfiguration",
}));

export type UpdateRuntimeConfigurationError =
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates the runtime configuration for the specified fleet. The runtime configuration
 * tells Amazon GameLift Servers how to launch server processes on computes in managed EC2 and Anywhere fleets. You
 * can update a fleet's runtime configuration at any time after the fleet is created; it
 * does not need to be in `ACTIVE` status.
 *
 * To update runtime configuration, specify the fleet ID and provide a
 * `RuntimeConfiguration` with an updated set of server process
 * configurations.
 *
 * If successful, the fleet's runtime configuration settings are updated. Fleet computes
 * that run game server processes regularly check for and receive updated runtime
 * configurations. The computes immediately take action to comply with the new
 * configuration by launching new server processes or by not replacing existing processes
 * when they shut down. Updating a fleet's runtime configuration never affects existing
 * server processes.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateRuntimeConfiguration: API.OperationMethod<
  UpdateRuntimeConfigurationInput,
  UpdateRuntimeConfigurationOutput,
  UpdateRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuntimeConfigurationInput,
  output: UpdateRuntimeConfigurationOutput,
  errors: [
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuntimeConfiguration",
}));

export type UpdateScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates Realtime script metadata and content.
 *
 * To update script metadata, specify the script ID and provide updated name and/or
 * version values.
 *
 * To update script content, provide an updated zip file by pointing to either a local
 * file or an Amazon S3 bucket location. You can use either method regardless of how the
 * original script was uploaded. Use the *Version* parameter to track
 * updates to the script.
 *
 * If the call is successful, the updated metadata is stored in the script record and a
 * revised script is uploaded to the Amazon GameLift Servers service. Once the script is updated and
 * acquired by a fleet instance, the new version is used for all new game sessions.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const updateScript: API.OperationMethod<
  UpdateScriptInput,
  UpdateScriptOutput,
  UpdateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScriptInput,
  output: UpdateScriptOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScript",
}));

export type ValidateMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Validates the syntax of a matchmaking rule or rule set. This operation checks that the
 * rule set is using syntactically correct JSON and that it conforms to allowed property
 * expressions. To validate syntax, provide a rule set JSON string.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const validateMatchmakingRuleSet: API.OperationMethod<
  ValidateMatchmakingRuleSetInput,
  ValidateMatchmakingRuleSetOutput,
  ValidateMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateMatchmakingRuleSetInput,
  output: ValidateMatchmakingRuleSetOutput,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateMatchmakingRuleSet",
}));
