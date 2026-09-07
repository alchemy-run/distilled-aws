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
  sdkId: "ManagedBlockchain",
  serviceShapeName: "TaigaWebService",
});
const auth = T.AwsAuthSigv4({ name: "managedblockchain" });
const ver = T.ServiceVersion("2018-09-24");
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
              `https://managedblockchain-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://managedblockchain-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://managedblockchain.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://managedblockchain.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class IllegalActionException
  extends /*@__PURE__*/ S.TaggedError<IllegalActionException>()(
    "IllegalActionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientRequestTokenString = string;
export type AccessorType = "BILLING_TOKEN" | (string & {});
export const AccessorType = S.String;

export type TagKey = string;
export type TagValue = string;
export type InputTagMap = { [key: string]: string | undefined };
export const InputTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AccessorNetworkType =
  | "ETHEREUM_GOERLI"
  | "ETHEREUM_MAINNET"
  | "ETHEREUM_MAINNET_AND_GOERLI"
  | "POLYGON_MAINNET"
  | "POLYGON_MUMBAI"
  | (string & {});
export const AccessorNetworkType = S.String;

export interface CreateAccessorInput {
  ClientRequestToken: string;
  AccessorType: AccessorType;
  Tags?: { [key: string]: string | undefined };
  NetworkType?: AccessorNetworkType;
}
export const CreateAccessorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    AccessorType: AccessorType,
    Tags: S.optional(InputTagMap),
    NetworkType: S.optional(AccessorNetworkType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/accessors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessorInput",
}) as any as S.Schema<CreateAccessorInput>;
export type ResourceIdString = string;
export type AccessorBillingTokenString = string;
export interface CreateAccessorOutput {
  AccessorId?: string;
  BillingToken?: string;
  NetworkType?: AccessorNetworkType;
}
export const CreateAccessorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessorId: S.optional(S.String),
    BillingToken: S.optional(S.String),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({
  identifier: "CreateAccessorOutput",
}) as any as S.Schema<CreateAccessorOutput>;
export type NetworkMemberNameString = string;
export type DescriptionString = string;
export type UsernameString = string;
export type PasswordString = string | redacted.Redacted<string>;
export interface MemberFabricConfiguration {
  AdminUsername: string;
  AdminPassword: string | redacted.Redacted<string>;
}
export const MemberFabricConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdminUsername: S.String, AdminPassword: SensitiveString }),
).annotate({
  identifier: "MemberFabricConfiguration",
}) as any as S.Schema<MemberFabricConfiguration>;
export interface MemberFrameworkConfiguration {
  Fabric?: MemberFabricConfiguration;
}
export const MemberFrameworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricConfiguration) }),
).annotate({
  identifier: "MemberFrameworkConfiguration",
}) as any as S.Schema<MemberFrameworkConfiguration>;
export type Enabled = boolean;
export interface LogConfiguration {
  Enabled?: boolean;
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export interface LogConfigurations {
  Cloudwatch?: LogConfiguration;
}
export const LogConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cloudwatch: S.optional(LogConfiguration) }),
).annotate({
  identifier: "LogConfigurations",
}) as any as S.Schema<LogConfigurations>;
export interface MemberFabricLogPublishingConfiguration {
  CaLogs?: LogConfigurations;
}
export const MemberFabricLogPublishingConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CaLogs: S.optional(LogConfigurations) }),
).annotate({
  identifier: "MemberFabricLogPublishingConfiguration",
}) as any as S.Schema<MemberFabricLogPublishingConfiguration>;
export interface MemberLogPublishingConfiguration {
  Fabric?: MemberFabricLogPublishingConfiguration;
}
export const MemberLogPublishingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricLogPublishingConfiguration) }),
).annotate({
  identifier: "MemberLogPublishingConfiguration",
}) as any as S.Schema<MemberLogPublishingConfiguration>;
export type ArnString = string;
export interface MemberConfiguration {
  Name: string;
  Description?: string;
  FrameworkConfiguration: MemberFrameworkConfiguration;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
  Tags?: { [key: string]: string | undefined };
  KmsKeyArn?: string;
}
export const MemberConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    FrameworkConfiguration: MemberFrameworkConfiguration,
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
    Tags: S.optional(InputTagMap),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberConfiguration",
}) as any as S.Schema<MemberConfiguration>;
export interface CreateMemberInput {
  ClientRequestToken: string;
  InvitationId: string;
  NetworkId: string;
  MemberConfiguration: MemberConfiguration;
}
export const CreateMemberInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    InvitationId: S.String,
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberConfiguration: MemberConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMemberInput",
}) as any as S.Schema<CreateMemberInput>;
export interface CreateMemberOutput {
  MemberId?: string;
}
export const CreateMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MemberId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMemberOutput",
}) as any as S.Schema<CreateMemberOutput>;
export type NameString = string;
export type Framework = "HYPERLEDGER_FABRIC" | "ETHEREUM" | (string & {});
export const Framework = S.String;

export type FrameworkVersionString = string;
export type Edition = "STARTER" | "STANDARD" | (string & {});
export const Edition = S.String;

export interface NetworkFabricConfiguration {
  Edition: Edition;
}
export const NetworkFabricConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Edition: Edition }),
).annotate({
  identifier: "NetworkFabricConfiguration",
}) as any as S.Schema<NetworkFabricConfiguration>;
export interface NetworkFrameworkConfiguration {
  Fabric?: NetworkFabricConfiguration;
}
export const NetworkFrameworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fabric: S.optional(NetworkFabricConfiguration) }),
).annotate({
  identifier: "NetworkFrameworkConfiguration",
}) as any as S.Schema<NetworkFrameworkConfiguration>;
export type ThresholdPercentageInt = number;
export type ProposalDurationInt = number;
export type ThresholdComparator =
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL_TO"
  | (string & {});
export const ThresholdComparator = S.String;

export interface ApprovalThresholdPolicy {
  ThresholdPercentage?: number;
  ProposalDurationInHours?: number;
  ThresholdComparator?: ThresholdComparator;
}
export const ApprovalThresholdPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThresholdPercentage: S.optional(S.Number),
    ProposalDurationInHours: S.optional(S.Number),
    ThresholdComparator: S.optional(ThresholdComparator),
  }),
).annotate({
  identifier: "ApprovalThresholdPolicy",
}) as any as S.Schema<ApprovalThresholdPolicy>;
export interface VotingPolicy {
  ApprovalThresholdPolicy?: ApprovalThresholdPolicy;
}
export const VotingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApprovalThresholdPolicy: S.optional(ApprovalThresholdPolicy) }),
).annotate({ identifier: "VotingPolicy" }) as any as S.Schema<VotingPolicy>;
export interface CreateNetworkInput {
  ClientRequestToken: string;
  Name: string;
  Description?: string;
  Framework: Framework;
  FrameworkVersion: string;
  FrameworkConfiguration?: NetworkFrameworkConfiguration;
  VotingPolicy: VotingPolicy;
  MemberConfiguration: MemberConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    Name: S.String,
    Description: S.optional(S.String),
    Framework: Framework,
    FrameworkVersion: S.String,
    FrameworkConfiguration: S.optional(NetworkFrameworkConfiguration),
    VotingPolicy: VotingPolicy,
    MemberConfiguration: MemberConfiguration,
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNetworkInput",
}) as any as S.Schema<CreateNetworkInput>;
export interface CreateNetworkOutput {
  NetworkId?: string;
  MemberId?: string;
}
export const CreateNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkId: S.optional(S.String), MemberId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNetworkOutput",
}) as any as S.Schema<CreateNetworkOutput>;
export type InstanceTypeString = string;
export type AvailabilityZoneString = string;
export interface NodeFabricLogPublishingConfiguration {
  ChaincodeLogs?: LogConfigurations;
  PeerLogs?: LogConfigurations;
}
export const NodeFabricLogPublishingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChaincodeLogs: S.optional(LogConfigurations),
      PeerLogs: S.optional(LogConfigurations),
    }),
).annotate({
  identifier: "NodeFabricLogPublishingConfiguration",
}) as any as S.Schema<NodeFabricLogPublishingConfiguration>;
export interface NodeLogPublishingConfiguration {
  Fabric?: NodeFabricLogPublishingConfiguration;
}
export const NodeLogPublishingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fabric: S.optional(NodeFabricLogPublishingConfiguration) }),
).annotate({
  identifier: "NodeLogPublishingConfiguration",
}) as any as S.Schema<NodeLogPublishingConfiguration>;
export type StateDBType = "LevelDB" | "CouchDB" | (string & {});
export const StateDBType = S.String;

export interface NodeConfiguration {
  InstanceType: string;
  AvailabilityZone?: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
  StateDB?: StateDBType;
}
export const NodeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.String,
    AvailabilityZone: S.optional(S.String),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
    StateDB: S.optional(StateDBType),
  }),
).annotate({
  identifier: "NodeConfiguration",
}) as any as S.Schema<NodeConfiguration>;
export interface CreateNodeInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId?: string;
  NodeConfiguration: NodeConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String),
    NodeConfiguration: NodeConfiguration,
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNodeInput",
}) as any as S.Schema<CreateNodeInput>;
export interface CreateNodeOutput {
  NodeId?: string;
}
export const CreateNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NodeId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNodeOutput",
}) as any as S.Schema<CreateNodeOutput>;
export type PrincipalString = string;
export interface InviteAction {
  Principal: string;
}
export const InviteAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Principal: S.String }),
).annotate({ identifier: "InviteAction" }) as any as S.Schema<InviteAction>;
export type InviteActionList = InviteAction[];
export const InviteActionList = /*@__PURE__*/ S.Array(InviteAction);
export interface RemoveAction {
  MemberId: string;
}
export const RemoveAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MemberId: S.String }),
).annotate({ identifier: "RemoveAction" }) as any as S.Schema<RemoveAction>;
export type RemoveActionList = RemoveAction[];
export const RemoveActionList = /*@__PURE__*/ S.Array(RemoveAction);
export interface ProposalActions {
  Invitations?: InviteAction[];
  Removals?: RemoveAction[];
}
export const ProposalActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Invitations: S.optional(InviteActionList),
    Removals: S.optional(RemoveActionList),
  }),
).annotate({
  identifier: "ProposalActions",
}) as any as S.Schema<ProposalActions>;
export interface CreateProposalInput {
  ClientRequestToken: string;
  NetworkId: string;
  MemberId: string;
  Actions: ProposalActions;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProposalInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String,
    Actions: ProposalActions,
    Description: S.optional(S.String),
    Tags: S.optional(InputTagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networks/{NetworkId}/proposals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProposalInput",
}) as any as S.Schema<CreateProposalInput>;
export interface CreateProposalOutput {
  ProposalId?: string;
}
export const CreateProposalOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProposalId: S.optional(S.String) }),
).annotate({
  identifier: "CreateProposalOutput",
}) as any as S.Schema<CreateProposalOutput>;
export interface DeleteAccessorInput {
  AccessorId: string;
}
export const DeleteAccessorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessorId: S.String.pipe(T.HttpLabel("AccessorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/accessors/{AccessorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessorInput",
}) as any as S.Schema<DeleteAccessorInput>;
export interface DeleteAccessorOutput {}
export const DeleteAccessorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessorOutput",
}) as any as S.Schema<DeleteAccessorOutput>;
export interface DeleteMemberInput {
  NetworkId: string;
  MemberId: string;
}
export const DeleteMemberInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMemberInput",
}) as any as S.Schema<DeleteMemberInput>;
export interface DeleteMemberOutput {}
export const DeleteMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMemberOutput",
}) as any as S.Schema<DeleteMemberOutput>;
export interface DeleteNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export const DeleteNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNodeInput",
}) as any as S.Schema<DeleteNodeInput>;
export interface DeleteNodeOutput {}
export const DeleteNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNodeOutput",
}) as any as S.Schema<DeleteNodeOutput>;
export interface GetAccessorInput {
  AccessorId: string;
}
export const GetAccessorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessorId: S.String.pipe(T.HttpLabel("AccessorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accessors/{AccessorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessorInput",
}) as any as S.Schema<GetAccessorInput>;
export type AccessorStatus =
  | "AVAILABLE"
  | "PENDING_DELETION"
  | "DELETED"
  | (string & {});
export const AccessorStatus = S.String;

export type OutputTagMap = { [key: string]: string | undefined };
export const OutputTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Accessor {
  Id?: string;
  Type?: AccessorType;
  BillingToken?: string;
  Status?: AccessorStatus;
  CreationDate?: Date;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  NetworkType?: AccessorNetworkType;
}
export const Accessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(AccessorType),
    BillingToken: S.optional(S.String),
    Status: S.optional(AccessorStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
    Tags: S.optional(OutputTagMap),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({ identifier: "Accessor" }) as any as S.Schema<Accessor>;
export interface GetAccessorOutput {
  Accessor?: Accessor;
}
export const GetAccessorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Accessor: S.optional(Accessor) }),
).annotate({
  identifier: "GetAccessorOutput",
}) as any as S.Schema<GetAccessorOutput>;
export interface GetMemberInput {
  NetworkId: string;
  MemberId: string;
}
export const GetMemberInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetMemberInput" }) as any as S.Schema<GetMemberInput>;
export interface MemberFabricAttributes {
  AdminUsername?: string;
  CaEndpoint?: string;
}
export const MemberFabricAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminUsername: S.optional(S.String),
    CaEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberFabricAttributes",
}) as any as S.Schema<MemberFabricAttributes>;
export interface MemberFrameworkAttributes {
  Fabric?: MemberFabricAttributes;
}
export const MemberFrameworkAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fabric: S.optional(MemberFabricAttributes) }),
).annotate({
  identifier: "MemberFrameworkAttributes",
}) as any as S.Schema<MemberFrameworkAttributes>;
export type MemberStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "INACCESSIBLE_ENCRYPTION_KEY"
  | (string & {});
export const MemberStatus = S.String;

export interface Member {
  NetworkId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  FrameworkAttributes?: MemberFrameworkAttributes;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
  Status?: MemberStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
  KmsKeyArn?: string;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    FrameworkAttributes: S.optional(MemberFrameworkAttributes),
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
    Status: S.optional(MemberStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export interface GetMemberOutput {
  Member?: Member;
}
export const GetMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Member: S.optional(Member) }),
).annotate({
  identifier: "GetMemberOutput",
}) as any as S.Schema<GetMemberOutput>;
export interface GetNetworkInput {
  NetworkId: string;
}
export const GetNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkInput",
}) as any as S.Schema<GetNetworkInput>;
export interface NetworkFabricAttributes {
  OrderingServiceEndpoint?: string;
  Edition?: Edition;
}
export const NetworkFabricAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrderingServiceEndpoint: S.optional(S.String),
    Edition: S.optional(Edition),
  }),
).annotate({
  identifier: "NetworkFabricAttributes",
}) as any as S.Schema<NetworkFabricAttributes>;
export interface NetworkEthereumAttributes {
  ChainId?: string;
}
export const NetworkEthereumAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChainId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkEthereumAttributes",
}) as any as S.Schema<NetworkEthereumAttributes>;
export interface NetworkFrameworkAttributes {
  Fabric?: NetworkFabricAttributes;
  Ethereum?: NetworkEthereumAttributes;
}
export const NetworkFrameworkAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fabric: S.optional(NetworkFabricAttributes),
    Ethereum: S.optional(NetworkEthereumAttributes),
  }),
).annotate({
  identifier: "NetworkFrameworkAttributes",
}) as any as S.Schema<NetworkFrameworkAttributes>;
export type NetworkStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const NetworkStatus = S.String;

export interface Network {
  Id?: string;
  Name?: string;
  Description?: string;
  Framework?: Framework;
  FrameworkVersion?: string;
  FrameworkAttributes?: NetworkFrameworkAttributes;
  VpcEndpointServiceName?: string;
  VotingPolicy?: VotingPolicy;
  Status?: NetworkStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const Network = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Framework: S.optional(Framework),
    FrameworkVersion: S.optional(S.String),
    FrameworkAttributes: S.optional(NetworkFrameworkAttributes),
    VpcEndpointServiceName: S.optional(S.String),
    VotingPolicy: S.optional(VotingPolicy),
    Status: S.optional(NetworkStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Network" }) as any as S.Schema<Network>;
export interface GetNetworkOutput {
  Network?: Network;
}
export const GetNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Network: S.optional(Network) }),
).annotate({
  identifier: "GetNetworkOutput",
}) as any as S.Schema<GetNetworkOutput>;
export interface GetNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
}
export const GetNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetNodeInput" }) as any as S.Schema<GetNodeInput>;
export interface NodeFabricAttributes {
  PeerEndpoint?: string;
  PeerEventEndpoint?: string;
}
export const NodeFabricAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PeerEndpoint: S.optional(S.String),
    PeerEventEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeFabricAttributes",
}) as any as S.Schema<NodeFabricAttributes>;
export interface NodeEthereumAttributes {
  HttpEndpoint?: string;
  WebSocketEndpoint?: string;
}
export const NodeEthereumAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpEndpoint: S.optional(S.String),
    WebSocketEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeEthereumAttributes",
}) as any as S.Schema<NodeEthereumAttributes>;
export interface NodeFrameworkAttributes {
  Fabric?: NodeFabricAttributes;
  Ethereum?: NodeEthereumAttributes;
}
export const NodeFrameworkAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fabric: S.optional(NodeFabricAttributes),
    Ethereum: S.optional(NodeEthereumAttributes),
  }),
).annotate({
  identifier: "NodeFrameworkAttributes",
}) as any as S.Schema<NodeFrameworkAttributes>;
export type NodeStatus =
  | "CREATING"
  | "AVAILABLE"
  | "UNHEALTHY"
  | "CREATE_FAILED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "INACCESSIBLE_ENCRYPTION_KEY"
  | (string & {});
export const NodeStatus = S.String;

export interface Node {
  NetworkId?: string;
  MemberId?: string;
  Id?: string;
  InstanceType?: string;
  AvailabilityZone?: string;
  FrameworkAttributes?: NodeFrameworkAttributes;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
  StateDB?: StateDBType;
  Status?: NodeStatus;
  CreationDate?: Date;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
  KmsKeyArn?: string;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.String),
    MemberId: S.optional(S.String),
    Id: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    FrameworkAttributes: S.optional(NodeFrameworkAttributes),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
    StateDB: S.optional(StateDBType),
    Status: S.optional(NodeStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export interface GetNodeOutput {
  Node?: Node;
}
export const GetNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Node: S.optional(Node) }),
).annotate({ identifier: "GetNodeOutput" }) as any as S.Schema<GetNodeOutput>;
export interface GetProposalInput {
  NetworkId: string;
  ProposalId: string;
}
export const GetProposalInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProposalInput",
}) as any as S.Schema<GetProposalInput>;
export type ProposalStatus =
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "ACTION_FAILED"
  | (string & {});
export const ProposalStatus = S.String;

export type VoteCount = number;
export interface Proposal {
  ProposalId?: string;
  NetworkId?: string;
  Description?: string;
  Actions?: ProposalActions;
  ProposedByMemberId?: string;
  ProposedByMemberName?: string;
  Status?: ProposalStatus;
  CreationDate?: Date;
  ExpirationDate?: Date;
  YesVoteCount?: number;
  NoVoteCount?: number;
  OutstandingVoteCount?: number;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const Proposal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProposalId: S.optional(S.String),
    NetworkId: S.optional(S.String),
    Description: S.optional(S.String),
    Actions: S.optional(ProposalActions),
    ProposedByMemberId: S.optional(S.String),
    ProposedByMemberName: S.optional(S.String),
    Status: S.optional(ProposalStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    YesVoteCount: S.optional(S.Number),
    NoVoteCount: S.optional(S.Number),
    OutstandingVoteCount: S.optional(S.Number),
    Tags: S.optional(OutputTagMap),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Proposal" }) as any as S.Schema<Proposal>;
export interface GetProposalOutput {
  Proposal?: Proposal;
}
export const GetProposalOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Proposal: S.optional(Proposal) }),
).annotate({
  identifier: "GetProposalOutput",
}) as any as S.Schema<GetProposalOutput>;
export type AccessorListMaxResults = number;
export type PaginationToken = string;
export interface ListAccessorsInput {
  MaxResults?: number;
  NextToken?: string;
  NetworkType?: AccessorNetworkType;
}
export const ListAccessorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    NetworkType: S.optional(AccessorNetworkType).pipe(
      T.HttpQuery("networkType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/accessors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessorsInput",
}) as any as S.Schema<ListAccessorsInput>;
export interface AccessorSummary {
  Id?: string;
  Type?: AccessorType;
  Status?: AccessorStatus;
  CreationDate?: Date;
  Arn?: string;
  NetworkType?: AccessorNetworkType;
}
export const AccessorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(AccessorType),
    Status: S.optional(AccessorStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
    NetworkType: S.optional(AccessorNetworkType),
  }),
).annotate({
  identifier: "AccessorSummary",
}) as any as S.Schema<AccessorSummary>;
export type AccessorSummaryList = AccessorSummary[];
export const AccessorSummaryList = /*@__PURE__*/ S.Array(AccessorSummary);
export interface ListAccessorsOutput {
  Accessors?: AccessorSummary[];
  NextToken?: string;
}
export const ListAccessorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accessors: S.optional(AccessorSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessorsOutput",
}) as any as S.Schema<ListAccessorsOutput>;
export type ProposalListMaxResults = number;
export interface ListInvitationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInvitationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvitationsInput",
}) as any as S.Schema<ListInvitationsInput>;
export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "ACCEPTING"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export const InvitationStatus = S.String;

export interface NetworkSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  Framework?: Framework;
  FrameworkVersion?: string;
  Status?: NetworkStatus;
  CreationDate?: Date;
  Arn?: string;
}
export const NetworkSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Framework: S.optional(Framework),
    FrameworkVersion: S.optional(S.String),
    Status: S.optional(NetworkStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "NetworkSummary" }) as any as S.Schema<NetworkSummary>;
export interface Invitation {
  InvitationId?: string;
  CreationDate?: Date;
  ExpirationDate?: Date;
  Status?: InvitationStatus;
  NetworkSummary?: NetworkSummary;
  Arn?: string;
}
export const Invitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvitationId: S.optional(S.String),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(InvitationStatus),
    NetworkSummary: S.optional(NetworkSummary),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export type InvitationList = Invitation[];
export const InvitationList = /*@__PURE__*/ S.Array(Invitation);
export interface ListInvitationsOutput {
  Invitations?: Invitation[];
  NextToken?: string;
}
export const ListInvitationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Invitations: S.optional(InvitationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvitationsOutput",
}) as any as S.Schema<ListInvitationsOutput>;
export type IsOwned = boolean;
export type MemberListMaxResults = number;
export interface ListMembersInput {
  NetworkId: string;
  Name?: string;
  Status?: MemberStatus;
  IsOwned?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListMembersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
    Status: S.optional(MemberStatus).pipe(T.HttpQuery("status")),
    IsOwned: S.optional(S.Boolean).pipe(T.HttpQuery("isOwned")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/members" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersInput",
}) as any as S.Schema<ListMembersInput>;
export interface MemberSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  Status?: MemberStatus;
  CreationDate?: Date;
  IsOwned?: boolean;
  Arn?: string;
}
export const MemberSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(MemberStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    IsOwned: S.optional(S.Boolean),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "MemberSummary" }) as any as S.Schema<MemberSummary>;
export type MemberSummaryList = MemberSummary[];
export const MemberSummaryList = /*@__PURE__*/ S.Array(MemberSummary);
export interface ListMembersOutput {
  Members?: MemberSummary[];
  NextToken?: string;
}
export const ListMembersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Members: S.optional(MemberSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersOutput",
}) as any as S.Schema<ListMembersOutput>;
export type NetworkListMaxResults = number;
export interface ListNetworksInput {
  Name?: string;
  Framework?: Framework;
  Status?: NetworkStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNetworksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
    Framework: S.optional(Framework).pipe(T.HttpQuery("framework")),
    Status: S.optional(NetworkStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworksInput",
}) as any as S.Schema<ListNetworksInput>;
export type NetworkSummaryList = NetworkSummary[];
export const NetworkSummaryList = /*@__PURE__*/ S.Array(NetworkSummary);
export interface ListNetworksOutput {
  Networks?: NetworkSummary[];
  NextToken?: string;
}
export const ListNetworksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Networks: S.optional(NetworkSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNetworksOutput",
}) as any as S.Schema<ListNetworksOutput>;
export type NodeListMaxResults = number;
export interface ListNodesInput {
  NetworkId: string;
  MemberId?: string;
  Status?: NodeStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNodesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String).pipe(T.HttpQuery("memberId")),
    Status: S.optional(NodeStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListNodesInput" }) as any as S.Schema<ListNodesInput>;
export interface NodeSummary {
  Id?: string;
  Status?: NodeStatus;
  CreationDate?: Date;
  AvailabilityZone?: string;
  InstanceType?: string;
  Arn?: string;
}
export const NodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Status: S.optional(NodeStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AvailabilityZone: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Arn: S.optional(S.String),
  }),
).annotate({ identifier: "NodeSummary" }) as any as S.Schema<NodeSummary>;
export type NodeSummaryList = NodeSummary[];
export const NodeSummaryList = /*@__PURE__*/ S.Array(NodeSummary);
export interface ListNodesOutput {
  Nodes?: NodeSummary[];
  NextToken?: string;
}
export const ListNodesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Nodes: S.optional(NodeSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNodesOutput",
}) as any as S.Schema<ListNodesOutput>;
export interface ListProposalsInput {
  NetworkId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProposalsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networks/{NetworkId}/proposals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProposalsInput",
}) as any as S.Schema<ListProposalsInput>;
export interface ProposalSummary {
  ProposalId?: string;
  Description?: string;
  ProposedByMemberId?: string;
  ProposedByMemberName?: string;
  Status?: ProposalStatus;
  CreationDate?: Date;
  ExpirationDate?: Date;
  Arn?: string;
}
export const ProposalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProposalId: S.optional(S.String),
    Description: S.optional(S.String),
    ProposedByMemberId: S.optional(S.String),
    ProposedByMemberName: S.optional(S.String),
    Status: S.optional(ProposalStatus),
    CreationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Arn: S.optional(S.String),
  }),
).annotate({
  identifier: "ProposalSummary",
}) as any as S.Schema<ProposalSummary>;
export type ProposalSummaryList = ProposalSummary[];
export const ProposalSummaryList = /*@__PURE__*/ S.Array(ProposalSummary);
export interface ListProposalsOutput {
  Proposals?: ProposalSummary[];
  NextToken?: string;
}
export const ListProposalsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Proposals: S.optional(ProposalSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProposalsOutput",
}) as any as S.Schema<ListProposalsOutput>;
export interface ListProposalVotesInput {
  NetworkId: string;
  ProposalId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProposalVotesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}/votes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProposalVotesInput",
}) as any as S.Schema<ListProposalVotesInput>;
export type VoteValue = "YES" | "NO" | (string & {});
export const VoteValue = S.String;

export interface VoteSummary {
  Vote?: VoteValue;
  MemberName?: string;
  MemberId?: string;
}
export const VoteSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Vote: S.optional(VoteValue),
    MemberName: S.optional(S.String),
    MemberId: S.optional(S.String),
  }),
).annotate({ identifier: "VoteSummary" }) as any as S.Schema<VoteSummary>;
export type ProposalVoteList = VoteSummary[];
export const ProposalVoteList = /*@__PURE__*/ S.Array(VoteSummary);
export interface ListProposalVotesOutput {
  ProposalVotes?: VoteSummary[];
  NextToken?: string;
}
export const ListProposalVotesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProposalVotes: S.optional(ProposalVoteList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProposalVotesOutput",
}) as any as S.Schema<ListProposalVotesOutput>;
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
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(OutputTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RejectInvitationInput {
  InvitationId: string;
}
export const RejectInvitationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvitationId: S.String.pipe(T.HttpLabel("InvitationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/invitations/{InvitationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectInvitationInput",
}) as any as S.Schema<RejectInvitationInput>;
export interface RejectInvitationOutput {}
export const RejectInvitationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectInvitationOutput",
}) as any as S.Schema<RejectInvitationOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: InputTagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateMemberInput {
  NetworkId: string;
  MemberId: string;
  LogPublishingConfiguration?: MemberLogPublishingConfiguration;
}
export const UpdateMemberInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.String.pipe(T.HttpLabel("MemberId")),
    LogPublishingConfiguration: S.optional(MemberLogPublishingConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networks/{NetworkId}/members/{MemberId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMemberInput",
}) as any as S.Schema<UpdateMemberInput>;
export interface UpdateMemberOutput {}
export const UpdateMemberOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMemberOutput",
}) as any as S.Schema<UpdateMemberOutput>;
export interface UpdateNodeInput {
  NetworkId: string;
  MemberId?: string;
  NodeId: string;
  LogPublishingConfiguration?: NodeLogPublishingConfiguration;
}
export const UpdateNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    MemberId: S.optional(S.String),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
    LogPublishingConfiguration: S.optional(NodeLogPublishingConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/networks/{NetworkId}/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNodeInput",
}) as any as S.Schema<UpdateNodeInput>;
export interface UpdateNodeOutput {}
export const UpdateNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateNodeOutput",
}) as any as S.Schema<UpdateNodeOutput>;
export interface VoteOnProposalInput {
  NetworkId: string;
  ProposalId: string;
  VoterMemberId: string;
  Vote: VoteValue;
}
export const VoteOnProposalInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    ProposalId: S.String.pipe(T.HttpLabel("ProposalId")),
    VoterMemberId: S.String,
    Vote: VoteValue,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/networks/{NetworkId}/proposals/{ProposalId}/votes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VoteOnProposalInput",
}) as any as S.Schema<VoteOnProposalInput>;
export interface VoteOnProposalOutput {}
export const VoteOnProposalOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "VoteOnProposalOutput",
}) as any as S.Schema<VoteOnProposalOutput>;
export type ExceptionMessage = string;
export type CreateAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new accessor for use with Amazon Managed Blockchain service that supports token based access.
 * The accessor contains information required for token based access.
 */
export const createAccessor: API.OperationMethod<
  CreateAccessorInput,
  CreateAccessorOutput,
  CreateAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessorInput,
  output: CreateAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessor",
}));

export type CreateMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a member within a Managed Blockchain network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createMember: API.OperationMethod<
  CreateMemberInput,
  CreateMemberOutput,
  CreateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMemberInput,
  output: CreateMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMember",
}));

export type CreateNetworkError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new blockchain network using Amazon Managed Blockchain.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkInput,
  CreateNetworkOutput,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkInput,
  output: CreateNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
}));

export type CreateNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a node on the specified blockchain network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const createNode: API.OperationMethod<
  CreateNodeInput,
  CreateNodeOutput,
  CreateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNodeInput,
  output: CreateNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNode",
}));

export type CreateProposalError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a proposal for a change to the network that other members of the network can vote on, for example, a proposal to add a new member to the network. Any member can create a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const createProposal: API.OperationMethod<
  CreateProposalInput,
  CreateProposalOutput,
  CreateProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProposalInput,
  output: CreateProposalOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProposal",
}));

export type DeleteAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an accessor that your Amazon Web Services account owns. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes including, the
 * `BILLING_TOKEN`. After an accessor is deleted, the status of the accessor changes
 * from `AVAILABLE` to `PENDING_DELETION`. An accessor in the
 * `PENDING_DELETION` state can’t be used for new WebSocket requests or
 * HTTP requests. However, WebSocket connections that were initiated while the accessor was in the
 * `AVAILABLE` state remain open until they expire (up to 2 hours).
 */
export const deleteAccessor: API.OperationMethod<
  DeleteAccessorInput,
  DeleteAccessorOutput,
  DeleteAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessorInput,
  output: DeleteAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessor",
}));

export type DeleteMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a member. Deleting a member removes the member and all associated resources from the network. `DeleteMember` can only be called for a specified `MemberId` if the principal performing the action is associated with the Amazon Web Services account that owns the member. In all other cases, the `DeleteMember` action is carried out as the result of an approved proposal to remove a member. If `MemberId` is the last member in a network specified by the last Amazon Web Services account, the network is deleted also.
 *
 * Applies only to Hyperledger Fabric.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberInput,
  DeleteMemberOutput,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMemberInput,
  output: DeleteMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMember",
}));

export type DeleteNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a node that your Amazon Web Services account owns. All data on the node is lost and cannot be recovered.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const deleteNode: API.OperationMethod<
  DeleteNodeInput,
  DeleteNodeOutput,
  DeleteNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNodeInput,
  output: DeleteNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNode",
}));

export type GetAccessorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about an accessor. An accessor object is a container that has the
 * information required for token based access to your Ethereum nodes.
 */
export const getAccessor: API.OperationMethod<
  GetAccessorInput,
  GetAccessorOutput,
  GetAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessorInput,
  output: GetAccessorOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessor",
}));

export type GetMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a member.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getMember: API.OperationMethod<
  GetMemberInput,
  GetMemberOutput,
  GetMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemberInput,
  output: GetMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMember",
}));

export type GetNetworkError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNetwork: API.OperationMethod<
  GetNetworkInput,
  GetNetworkOutput,
  GetNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkInput,
  output: GetNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetwork",
}));

export type GetNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a node.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const getNode: API.OperationMethod<
  GetNodeInput,
  GetNodeOutput,
  GetNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNodeInput,
  output: GetNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNode",
}));

export type GetProposalError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information about a proposal.
 *
 * Applies only to Hyperledger Fabric.
 */
export const getProposal: API.OperationMethod<
  GetProposalInput,
  GetProposalOutput,
  GetProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProposalInput,
  output: GetProposalOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProposal",
}));

export type ListAccessorsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the accessors and their properties. Accessor objects are containers that have the
 * information required for token based access to your Ethereum nodes.
 */
export const listAccessors: API.PaginatedOperationMethod<
  ListAccessorsInput,
  ListAccessorsOutput,
  ListAccessorsError,
  Credentials | HttpClient.HttpClient,
  AccessorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessorsInput,
  output: ListAccessorsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accessors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all invitations for the current Amazon Web Services account.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsInput,
  ListInvitationsOutput,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsInput,
  output: ListInvitationsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the members in a network and properties of their configurations.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersInput,
  ListMembersOutput,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembersInput,
  output: ListMembersOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the networks in which the current Amazon Web Services account participates.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksInput,
  ListNetworksOutput,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworksInput,
  output: ListNetworksOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the nodes within a network.
 *
 * Applies to Hyperledger Fabric and Ethereum.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesInput,
  ListNodesOutput,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodesInput,
  output: ListNodesOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProposalsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of proposals for the network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposals: API.PaginatedOperationMethod<
  ListProposalsInput,
  ListProposalsOutput,
  ListProposalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProposalsInput,
  output: ListProposalsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProposals",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProposalVotesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the list of votes for a specified proposal, including the value of each vote and the unique identifier of the member that cast the vote.
 *
 * Applies only to Hyperledger Fabric.
 */
export const listProposalVotes: API.PaginatedOperationMethod<
  ListProposalVotesInput,
  ListProposalVotesOutput,
  ListProposalVotesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProposalVotesInput,
  output: ListProposalVotesOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProposalVotes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Returns a list of tags for the specified resource. Each tag consists of a key and optional value.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
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
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RejectInvitationError =
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Rejects an invitation to join a network. This action can be called by a principal in an Amazon Web Services account that has received an invitation to create a member and join a network.
 *
 * Applies only to Hyperledger Fabric.
 */
export const rejectInvitation: API.OperationMethod<
  RejectInvitationInput,
  RejectInvitationOutput,
  RejectInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectInvitationInput,
  output: RejectInvitationOutput,
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInvitation",
}));

export type TagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds or overwrites the specified tags for the specified Amazon Managed Blockchain resource. Each tag consists of a key and optional value.
 *
 * When you specify a tag key that already exists, the tag value is overwritten with the new value. Use `UntagResource` to remove tag keys.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a resource, your request fails and returns an error.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
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
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Removes the specified tags from the Amazon Managed Blockchain resource.
 *
 * For more information about tags, see Tagging Resources in the *Amazon Managed Blockchain Ethereum Developer Guide*, or Tagging Resources in the *Amazon Managed Blockchain Hyperledger Fabric Developer Guide*.
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
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMemberError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a member configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateMember: API.OperationMethod<
  UpdateMemberInput,
  UpdateMemberOutput,
  UpdateMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMemberInput,
  output: UpdateMemberOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMember",
}));

export type UpdateNodeError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a node configuration with new parameters.
 *
 * Applies only to Hyperledger Fabric.
 */
export const updateNode: API.OperationMethod<
  UpdateNodeInput,
  UpdateNodeOutput,
  UpdateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNodeInput,
  output: UpdateNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNode",
}));

export type VoteOnProposalError =
  | AccessDeniedException
  | IllegalActionException
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Casts a vote for a specified `ProposalId` on behalf of a member. The member to vote as, specified by `VoterMemberId`, must be in the same Amazon Web Services account as the principal that calls the action.
 *
 * Applies only to Hyperledger Fabric.
 */
export const voteOnProposal: API.OperationMethod<
  VoteOnProposalInput,
  VoteOnProposalOutput,
  VoteOnProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VoteOnProposalInput,
  output: VoteOnProposalOutput,
  errors: [
    AccessDeniedException,
    IllegalActionException,
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VoteOnProposal",
}));
