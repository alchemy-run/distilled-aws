import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://workspaces.amazonaws.com/api/v1");
const svc = T.AwsApiService({
  sdkId: "WorkSpaces",
  serviceShapeName: "WorkspacesService",
});
const auth = T.AwsAuthSigv4({ name: "workspaces" });
const ver = T.ServiceVersion("2015-04-08");
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
              `https://workspaces-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workspaces-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workspaces.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://workspaces.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class ApplicationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ApplicationNotSupportedException>()(
    "ApplicationNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ComputeNotCompatibleException
  extends /*@__PURE__*/ S.TaggedError<ComputeNotCompatibleException>()(
    "ComputeNotCompatibleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IncompatibleApplicationsException
  extends /*@__PURE__*/ S.TaggedError<IncompatibleApplicationsException>()(
    "IncompatibleApplicationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterValuesException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValuesException>()(
    "InvalidParameterValuesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperatingSystemNotCompatibleException
  extends /*@__PURE__*/ S.TaggedError<OperatingSystemNotCompatibleException>()(
    "OperatingSystemNotCompatibleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationInProgressException
  extends /*@__PURE__*/ S.TaggedError<OperationInProgressException>()(
    "OperationInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
  ) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceAssociatedException
  extends /*@__PURE__*/ S.TaggedError<ResourceAssociatedException>()(
    "ResourceAssociatedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceCreationFailedException
  extends /*@__PURE__*/ S.TaggedError<ResourceCreationFailedException>()(
    "ResourceCreationFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
  ) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
  ) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
  ) {}
export class UnsupportedNetworkConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedNetworkConfigurationException>()(
    "UnsupportedNetworkConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnsupportedWorkspaceConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedWorkspaceConfigurationException>()(
    "UnsupportedWorkspaceConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WorkspacesDefaultRoleNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WorkspacesDefaultRoleNotFoundException>()(
    "WorkspacesDefaultRoleNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type LinkId = string;
export type ClientToken = string;
export interface AcceptAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const AcceptAccountLinkInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
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
  identifier: "AcceptAccountLinkInvitationRequest",
}) as any as S.Schema<AcceptAccountLinkInvitationRequest>;
export type AccountLinkStatusEnum =
  | "LINKED"
  | "LINKING_FAILED"
  | "LINK_NOT_FOUND"
  | "PENDING_ACCEPTANCE_BY_TARGET_ACCOUNT"
  | "REJECTED"
  | (string & {});
export const AccountLinkStatusEnum = S.String;

export type AwsAccount = string;
export interface AccountLink {
  AccountLinkId?: string;
  AccountLinkStatus?: AccountLinkStatusEnum;
  SourceAccountId?: string;
  TargetAccountId?: string;
}
export const AccountLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountLinkId: S.optional(S.String),
    AccountLinkStatus: S.optional(AccountLinkStatusEnum),
    SourceAccountId: S.optional(S.String),
    TargetAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "AccountLink" }) as any as S.Schema<AccountLink>;
export interface AcceptAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const AcceptAccountLinkInvitationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "AcceptAccountLinkInvitationResult",
}) as any as S.Schema<AcceptAccountLinkInvitationResult>;
export type ConnectionAliasId = string;
export type NonEmptyString = string;
export interface AssociateConnectionAliasRequest {
  AliasId: string;
  ResourceId: string;
}
export const AssociateConnectionAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.String, ResourceId: S.String }).pipe(
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
  identifier: "AssociateConnectionAliasRequest",
}) as any as S.Schema<AssociateConnectionAliasRequest>;
export type ConnectionIdentifier = string;
export interface AssociateConnectionAliasResult {
  ConnectionIdentifier?: string;
}
export const AssociateConnectionAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AssociateConnectionAliasResult",
}) as any as S.Schema<AssociateConnectionAliasResult>;
export type DirectoryId = string;
export type IpGroupId = string;
export type IpGroupIdList = string[];
export const IpGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export const AssociateIpGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryId: S.String, GroupIds: IpGroupIdList }).pipe(
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
  identifier: "AssociateIpGroupsRequest",
}) as any as S.Schema<AssociateIpGroupsRequest>;
export interface AssociateIpGroupsResult {}
export const AssociateIpGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateIpGroupsResult",
}) as any as S.Schema<AssociateIpGroupsResult>;
export type WorkspaceId = string;
export type WorkSpaceApplicationId = string;
export interface AssociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export const AssociateWorkspaceApplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ WorkspaceId: S.String, ApplicationId: S.String }).pipe(
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
  identifier: "AssociateWorkspaceApplicationRequest",
}) as any as S.Schema<AssociateWorkspaceApplicationRequest>;
export type WorkSpaceAssociatedResourceType = "APPLICATION" | (string & {});
export const WorkSpaceAssociatedResourceType = S.String;

export type AssociationState =
  | "PENDING_INSTALL"
  | "PENDING_INSTALL_DEPLOYMENT"
  | "PENDING_UNINSTALL"
  | "PENDING_UNINSTALL_DEPLOYMENT"
  | "INSTALLING"
  | "UNINSTALLING"
  | "ERROR"
  | "COMPLETED"
  | "REMOVED"
  | (string & {});
export const AssociationState = S.String;

export type AssociationErrorCode =
  | "ValidationError.InsufficientDiskSpace"
  | "ValidationError.InsufficientMemory"
  | "ValidationError.UnsupportedOperatingSystem"
  | "DeploymentError.InternalServerError"
  | "DeploymentError.WorkspaceUnreachable"
  | "ValidationError.ApplicationOldVersionExists"
  | (string & {});
export const AssociationErrorCode = S.String;

export type String2048 = string;
export interface AssociationStateReason {
  ErrorCode?: AssociationErrorCode;
  ErrorMessage?: string;
}
export const AssociationStateReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(AssociationErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationStateReason",
}) as any as S.Schema<AssociationStateReason>;
export interface WorkspaceResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: WorkSpaceAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
  WorkspaceId?: string;
}
export const WorkspaceResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(WorkSpaceAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
    WorkspaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceResourceAssociation",
}) as any as S.Schema<WorkspaceResourceAssociation>;
export interface AssociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export const AssociateWorkspaceApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Association: S.optional(WorkspaceResourceAssociation) }).pipe(ns),
).annotate({
  identifier: "AssociateWorkspaceApplicationResult",
}) as any as S.Schema<AssociateWorkspaceApplicationResult>;
export type IpRule = string;
export type IpRuleDesc = string;
export interface IpRuleItem {
  ipRule?: string;
  ruleDesc?: string;
}
export const IpRuleItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipRule: S.optional(S.String), ruleDesc: S.optional(S.String) }),
).annotate({ identifier: "IpRuleItem" }) as any as S.Schema<IpRuleItem>;
export type IpRuleList = IpRuleItem[];
export const IpRuleList = /*@__PURE__*/ S.Array(IpRuleItem);
export interface AuthorizeIpRulesRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export const AuthorizeIpRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRuleList }).pipe(
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
  identifier: "AuthorizeIpRulesRequest",
}) as any as S.Schema<AuthorizeIpRulesRequest>;
export interface AuthorizeIpRulesResult {}
export const AuthorizeIpRulesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AuthorizeIpRulesResult",
}) as any as S.Schema<AuthorizeIpRulesResult>;
export type WorkspaceImageName = string;
export type WorkspaceImageDescription = string;
export type WorkspaceImageId = string;
export type Region = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CopyWorkspaceImageRequest {
  Name: string;
  Description?: string;
  SourceImageId: string;
  SourceRegion: string;
  Tags?: Tag[];
}
export const CopyWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SourceImageId: S.String,
    SourceRegion: S.String,
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
  identifier: "CopyWorkspaceImageRequest",
}) as any as S.Schema<CopyWorkspaceImageRequest>;
export interface CopyWorkspaceImageResult {
  ImageId?: string;
}
export const CopyWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CopyWorkspaceImageResult",
}) as any as S.Schema<CopyWorkspaceImageResult>;
export interface CreateAccountLinkInvitationRequest {
  TargetAccountId: string;
  ClientToken?: string;
}
export const CreateAccountLinkInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetAccountId: S.String,
    ClientToken: S.optional(S.String),
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
  identifier: "CreateAccountLinkInvitationRequest",
}) as any as S.Schema<CreateAccountLinkInvitationRequest>;
export interface CreateAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const CreateAccountLinkInvitationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "CreateAccountLinkInvitationResult",
}) as any as S.Schema<CreateAccountLinkInvitationResult>;
export type AddInName = string;
export type AddInUrl = string;
export interface CreateConnectClientAddInRequest {
  ResourceId: string;
  Name: string;
  URL: string;
}
export const CreateConnectClientAddInRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, Name: S.String, URL: S.String }).pipe(
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
  identifier: "CreateConnectClientAddInRequest",
}) as any as S.Schema<CreateConnectClientAddInRequest>;
export type AmazonUuid = string;
export interface CreateConnectClientAddInResult {
  AddInId?: string;
}
export const CreateConnectClientAddInResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddInId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateConnectClientAddInResult",
}) as any as S.Schema<CreateConnectClientAddInResult>;
export type ConnectionString = string;
export interface CreateConnectionAliasRequest {
  ConnectionString: string;
  Tags?: Tag[];
}
export const CreateConnectionAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionString: S.String, Tags: S.optional(TagList) }).pipe(
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
  identifier: "CreateConnectionAliasRequest",
}) as any as S.Schema<CreateConnectionAliasRequest>;
export interface CreateConnectionAliasResult {
  AliasId?: string;
}
export const CreateConnectionAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateConnectionAliasResult",
}) as any as S.Schema<CreateConnectionAliasResult>;
export type IpGroupName = string;
export type IpGroupDesc = string;
export interface CreateIpGroupRequest {
  GroupName: string;
  GroupDesc?: string;
  UserRules?: IpRuleItem[];
  Tags?: Tag[];
}
export const CreateIpGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    GroupDesc: S.optional(S.String),
    UserRules: S.optional(IpRuleList),
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
  identifier: "CreateIpGroupRequest",
}) as any as S.Schema<CreateIpGroupRequest>;
export interface CreateIpGroupResult {
  GroupId?: string;
}
export const CreateIpGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateIpGroupResult",
}) as any as S.Schema<CreateIpGroupResult>;
export type VolumeEncryptionKey = string;
export type DataReplication =
  | "NO_REPLICATION"
  | "PRIMARY_AS_SOURCE"
  | (string & {});
export const DataReplication = S.String;

export interface StandbyWorkspace {
  PrimaryWorkspaceId: string;
  VolumeEncryptionKey?: string;
  DirectoryId: string;
  Tags?: Tag[];
  DataReplication?: DataReplication;
}
export const StandbyWorkspace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrimaryWorkspaceId: S.String,
    VolumeEncryptionKey: S.optional(S.String),
    DirectoryId: S.String,
    Tags: S.optional(TagList),
    DataReplication: S.optional(DataReplication),
  }),
).annotate({
  identifier: "StandbyWorkspace",
}) as any as S.Schema<StandbyWorkspace>;
export type StandbyWorkspacesList = StandbyWorkspace[];
export const StandbyWorkspacesList = /*@__PURE__*/ S.Array(StandbyWorkspace);
export interface CreateStandbyWorkspacesRequest {
  PrimaryRegion: string;
  StandbyWorkspaces: StandbyWorkspace[];
}
export const CreateStandbyWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrimaryRegion: S.String,
    StandbyWorkspaces: StandbyWorkspacesList,
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
  identifier: "CreateStandbyWorkspacesRequest",
}) as any as S.Schema<CreateStandbyWorkspacesRequest>;
export type WorkspaceErrorCode = string;
export type Description = string;
export interface FailedCreateStandbyWorkspacesRequest {
  StandbyWorkspaceRequest?: StandbyWorkspace;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedCreateStandbyWorkspacesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StandbyWorkspaceRequest: S.optional(StandbyWorkspace),
      ErrorCode: S.optional(S.String),
      ErrorMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "FailedCreateStandbyWorkspacesRequest",
}) as any as S.Schema<FailedCreateStandbyWorkspacesRequest>;
export type FailedCreateStandbyWorkspacesRequestList =
  FailedCreateStandbyWorkspacesRequest[];
export const FailedCreateStandbyWorkspacesRequestList = /*@__PURE__*/ S.Array(
  FailedCreateStandbyWorkspacesRequest,
);
export type UserName = string;
export type WorkspaceState =
  | "PENDING"
  | "AVAILABLE"
  | "IMPAIRED"
  | "UNHEALTHY"
  | "REBOOTING"
  | "STARTING"
  | "REBUILDING"
  | "RESTORING"
  | "MAINTENANCE"
  | "ADMIN_MAINTENANCE"
  | "TERMINATING"
  | "TERMINATED"
  | "SUSPENDED"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export const WorkspaceState = S.String;

export interface PendingCreateStandbyWorkspacesRequest {
  UserName?: string;
  DirectoryId?: string;
  State?: WorkspaceState;
  WorkspaceId?: string;
}
export const PendingCreateStandbyWorkspacesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UserName: S.optional(S.String),
      DirectoryId: S.optional(S.String),
      State: S.optional(WorkspaceState),
      WorkspaceId: S.optional(S.String),
    }),
).annotate({
  identifier: "PendingCreateStandbyWorkspacesRequest",
}) as any as S.Schema<PendingCreateStandbyWorkspacesRequest>;
export type PendingCreateStandbyWorkspacesRequestList =
  PendingCreateStandbyWorkspacesRequest[];
export const PendingCreateStandbyWorkspacesRequestList = /*@__PURE__*/ S.Array(
  PendingCreateStandbyWorkspacesRequest,
);
export interface CreateStandbyWorkspacesResult {
  FailedStandbyRequests?: FailedCreateStandbyWorkspacesRequest[];
  PendingStandbyRequests?: PendingCreateStandbyWorkspacesRequest[];
}
export const CreateStandbyWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailedStandbyRequests: S.optional(FailedCreateStandbyWorkspacesRequestList),
    PendingStandbyRequests: S.optional(
      PendingCreateStandbyWorkspacesRequestList,
    ),
  }).pipe(ns),
).annotate({
  identifier: "CreateStandbyWorkspacesResult",
}) as any as S.Schema<CreateStandbyWorkspacesResult>;
export interface CreateTagsRequest {
  ResourceId: string;
  Tags: Tag[];
}
export const CreateTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, Tags: TagList }).pipe(
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
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResult {}
export const CreateTagsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateTagsResult",
}) as any as S.Schema<CreateTagsResult>;
export interface CreateUpdatedWorkspaceImageRequest {
  Name: string;
  Description: string;
  SourceImageId: string;
  Tags?: Tag[];
}
export const CreateUpdatedWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    SourceImageId: S.String,
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
  identifier: "CreateUpdatedWorkspaceImageRequest",
}) as any as S.Schema<CreateUpdatedWorkspaceImageRequest>;
export interface CreateUpdatedWorkspaceImageResult {
  ImageId?: string;
}
export const CreateUpdatedWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateUpdatedWorkspaceImageResult",
}) as any as S.Schema<CreateUpdatedWorkspaceImageResult>;
export type WorkspaceBundleName = string;
export type WorkspaceBundleDescription = string;
export type Compute =
  | "VALUE"
  | "STANDARD"
  | "PERFORMANCE"
  | "POWER"
  | "GRAPHICS"
  | "POWERPRO"
  | "GENERALPURPOSE_4XLARGE"
  | "GENERALPURPOSE_8XLARGE"
  | "GRAPHICSPRO"
  | "GRAPHICS_G4DN"
  | "GRAPHICSPRO_G4DN"
  | "GRAPHICS_G6_XLARGE"
  | "GRAPHICS_G6_2XLARGE"
  | "GRAPHICS_G6_4XLARGE"
  | "GRAPHICS_G6_8XLARGE"
  | "GRAPHICS_G6_16XLARGE"
  | "GRAPHICS_GR6_4XLARGE"
  | "GRAPHICS_GR6_8XLARGE"
  | "GRAPHICS_G6F_LARGE"
  | "GRAPHICS_G6F_XLARGE"
  | "GRAPHICS_G6F_2XLARGE"
  | "GRAPHICS_G6F_4XLARGE"
  | "GRAPHICS_GR6F_4XLARGE"
  | (string & {});
export const Compute = S.String;

export interface ComputeType {
  Name?: Compute;
}
export const ComputeType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(Compute) }),
).annotate({ identifier: "ComputeType" }) as any as S.Schema<ComputeType>;
export interface UserStorage {
  Capacity: string;
}
export const UserStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Capacity: S.String }),
).annotate({ identifier: "UserStorage" }) as any as S.Schema<UserStorage>;
export interface RootStorage {
  Capacity: string;
}
export const RootStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Capacity: S.String }),
).annotate({ identifier: "RootStorage" }) as any as S.Schema<RootStorage>;
export interface CreateWorkspaceBundleRequest {
  BundleName: string;
  BundleDescription: string;
  ImageId: string;
  ComputeType: ComputeType;
  UserStorage: UserStorage;
  RootStorage?: RootStorage;
  Tags?: Tag[];
}
export const CreateWorkspaceBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleName: S.String,
    BundleDescription: S.String,
    ImageId: S.String,
    ComputeType: ComputeType,
    UserStorage: UserStorage,
    RootStorage: S.optional(RootStorage),
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
  identifier: "CreateWorkspaceBundleRequest",
}) as any as S.Schema<CreateWorkspaceBundleRequest>;
export type BundleId = string;
export type BundleOwner = string;
export type WorkspaceBundleState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export const WorkspaceBundleState = S.String;

export type BundleType = "REGULAR" | "STANDBY" | (string & {});
export const BundleType = S.String;

export interface WorkspaceBundle {
  BundleId?: string;
  Name?: string;
  Owner?: string;
  Description?: string;
  ImageId?: string;
  RootStorage?: RootStorage;
  UserStorage?: UserStorage;
  ComputeType?: ComputeType;
  LastUpdatedTime?: Date;
  CreationTime?: Date;
  State?: WorkspaceBundleState;
  BundleType?: BundleType;
}
export const WorkspaceBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    Description: S.optional(S.String),
    ImageId: S.optional(S.String),
    RootStorage: S.optional(RootStorage),
    UserStorage: S.optional(UserStorage),
    ComputeType: S.optional(ComputeType),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(WorkspaceBundleState),
    BundleType: S.optional(BundleType),
  }),
).annotate({
  identifier: "WorkspaceBundle",
}) as any as S.Schema<WorkspaceBundle>;
export interface CreateWorkspaceBundleResult {
  WorkspaceBundle?: WorkspaceBundle;
}
export const CreateWorkspaceBundleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceBundle: S.optional(WorkspaceBundle) }).pipe(ns),
).annotate({
  identifier: "CreateWorkspaceBundleResult",
}) as any as S.Schema<CreateWorkspaceBundleResult>;
export interface CreateWorkspaceImageRequest {
  Name: string;
  Description: string;
  WorkspaceId: string;
  Tags?: Tag[];
}
export const CreateWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    WorkspaceId: S.String,
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
  identifier: "CreateWorkspaceImageRequest",
}) as any as S.Schema<CreateWorkspaceImageRequest>;
export type OperatingSystemType = "WINDOWS" | "LINUX" | (string & {});
export const OperatingSystemType = S.String;

export interface OperatingSystem {
  Type?: OperatingSystemType;
}
export const OperatingSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(OperatingSystemType) }),
).annotate({
  identifier: "OperatingSystem",
}) as any as S.Schema<OperatingSystem>;
export type WorkspaceImageState =
  | "AVAILABLE"
  | "PENDING"
  | "ERROR"
  | (string & {});
export const WorkspaceImageState = S.String;

export type WorkspaceImageRequiredTenancy =
  | "DEFAULT"
  | "DEDICATED"
  | (string & {});
export const WorkspaceImageRequiredTenancy = S.String;

export interface CreateWorkspaceImageResult {
  ImageId?: string;
  Name?: string;
  Description?: string;
  OperatingSystem?: OperatingSystem;
  State?: WorkspaceImageState;
  RequiredTenancy?: WorkspaceImageRequiredTenancy;
  Created?: Date;
  OwnerAccountId?: string;
}
export const CreateWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    State: S.optional(WorkspaceImageState),
    RequiredTenancy: S.optional(WorkspaceImageRequiredTenancy),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateWorkspaceImageResult",
}) as any as S.Schema<CreateWorkspaceImageResult>;
export type RunningMode = "AUTO_STOP" | "ALWAYS_ON" | "MANUAL" | (string & {});
export const RunningMode = S.String;

export type RunningModeAutoStopTimeoutInMinutes = number;
export type RootVolumeSizeGib = number;
export type UserVolumeSizeGib = number;
export type Protocol = "PCOIP" | "WSP" | (string & {});
export const Protocol = S.String;

export type ProtocolList = Protocol[];
export const ProtocolList = /*@__PURE__*/ S.Array(Protocol);
export type OperatingSystemName =
  | "AMAZON_LINUX_2"
  | "UBUNTU_18_04"
  | "UBUNTU_20_04"
  | "UBUNTU_22_04"
  | "UNKNOWN"
  | "WINDOWS_10"
  | "WINDOWS_11"
  | "WINDOWS_7"
  | "WINDOWS_SERVER_2016"
  | "WINDOWS_SERVER_2019"
  | "WINDOWS_SERVER_2022"
  | "WINDOWS_SERVER_2025"
  | "RHEL_8"
  | "ROCKY_8"
  | (string & {});
export const OperatingSystemName = S.String;

export type AGAModeForWorkSpaceEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | "INHERITED"
  | (string & {});
export const AGAModeForWorkSpaceEnum = S.String;

export type AGAPreferredProtocolForWorkSpace =
  | "TCP"
  | "NONE"
  | "INHERITED"
  | (string & {});
export const AGAPreferredProtocolForWorkSpace = S.String;

export interface GlobalAcceleratorForWorkSpace {
  Mode: AGAModeForWorkSpaceEnum;
  PreferredProtocol?: AGAPreferredProtocolForWorkSpace;
}
export const GlobalAcceleratorForWorkSpace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: AGAModeForWorkSpaceEnum,
    PreferredProtocol: S.optional(AGAPreferredProtocolForWorkSpace),
  }),
).annotate({
  identifier: "GlobalAcceleratorForWorkSpace",
}) as any as S.Schema<GlobalAcceleratorForWorkSpace>;
export interface WorkspaceProperties {
  RunningMode?: RunningMode;
  RunningModeAutoStopTimeoutInMinutes?: number;
  RootVolumeSizeGib?: number;
  UserVolumeSizeGib?: number;
  ComputeTypeName?: Compute;
  Protocols?: Protocol[];
  OperatingSystemName?: OperatingSystemName;
  GlobalAccelerator?: GlobalAcceleratorForWorkSpace;
  NestedVirtualizationEnabled?: boolean;
}
export const WorkspaceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RunningMode: S.optional(RunningMode),
    RunningModeAutoStopTimeoutInMinutes: S.optional(S.Number),
    RootVolumeSizeGib: S.optional(S.Number),
    UserVolumeSizeGib: S.optional(S.Number),
    ComputeTypeName: S.optional(Compute),
    Protocols: S.optional(ProtocolList),
    OperatingSystemName: S.optional(OperatingSystemName),
    GlobalAccelerator: S.optional(GlobalAcceleratorForWorkSpace),
    NestedVirtualizationEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WorkspaceProperties",
}) as any as S.Schema<WorkspaceProperties>;
export type WorkspaceName = string;
export type Ipv6Address = string;
export interface WorkspaceRequest {
  DirectoryId: string;
  UserName: string;
  BundleId: string;
  VolumeEncryptionKey?: string;
  UserVolumeEncryptionEnabled?: boolean;
  RootVolumeEncryptionEnabled?: boolean;
  WorkspaceProperties?: WorkspaceProperties;
  Tags?: Tag[];
  WorkspaceName?: string;
  Ipv6Address?: string;
}
export const WorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String,
    UserName: S.String,
    BundleId: S.String,
    VolumeEncryptionKey: S.optional(S.String),
    UserVolumeEncryptionEnabled: S.optional(S.Boolean),
    RootVolumeEncryptionEnabled: S.optional(S.Boolean),
    WorkspaceProperties: S.optional(WorkspaceProperties),
    Tags: S.optional(TagList),
    WorkspaceName: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceRequest",
}) as any as S.Schema<WorkspaceRequest>;
export type WorkspaceRequestList = WorkspaceRequest[];
export const WorkspaceRequestList = /*@__PURE__*/ S.Array(WorkspaceRequest);
export interface CreateWorkspacesRequest {
  Workspaces: WorkspaceRequest[];
}
export const CreateWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Workspaces: WorkspaceRequestList }).pipe(
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
  identifier: "CreateWorkspacesRequest",
}) as any as S.Schema<CreateWorkspacesRequest>;
export type ErrorType = string;
export interface FailedCreateWorkspaceRequest {
  WorkspaceRequest?: WorkspaceRequest;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedCreateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceRequest: S.optional(WorkspaceRequest),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedCreateWorkspaceRequest",
}) as any as S.Schema<FailedCreateWorkspaceRequest>;
export type FailedCreateWorkspaceRequests = FailedCreateWorkspaceRequest[];
export const FailedCreateWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedCreateWorkspaceRequest,
);
export type IpAddress = string;
export type SubnetId = string;
export type ComputerName = string;
export type ModificationResourceEnum =
  | "ROOT_VOLUME"
  | "USER_VOLUME"
  | "COMPUTE_TYPE"
  | "PROTOCOL"
  | "NESTED_VIRTUALIZATION"
  | (string & {});
export const ModificationResourceEnum = S.String;

export type ModificationStateEnum =
  | "UPDATE_INITIATED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export const ModificationStateEnum = S.String;

export interface ModificationState {
  Resource?: ModificationResourceEnum;
  State?: ModificationStateEnum;
}
export const ModificationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.optional(ModificationResourceEnum),
    State: S.optional(ModificationStateEnum),
  }),
).annotate({
  identifier: "ModificationState",
}) as any as S.Schema<ModificationState>;
export type ModificationStateList = ModificationState[];
export const ModificationStateList = /*@__PURE__*/ S.Array(ModificationState);
export type StandbyWorkspaceRelationshipType =
  | "PRIMARY"
  | "STANDBY"
  | (string & {});
export const StandbyWorkspaceRelationshipType = S.String;

export interface RelatedWorkspaceProperties {
  WorkspaceId?: string;
  Region?: string;
  State?: WorkspaceState;
  Type?: StandbyWorkspaceRelationshipType;
}
export const RelatedWorkspaceProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    Region: S.optional(S.String),
    State: S.optional(WorkspaceState),
    Type: S.optional(StandbyWorkspaceRelationshipType),
  }),
).annotate({
  identifier: "RelatedWorkspaceProperties",
}) as any as S.Schema<RelatedWorkspaceProperties>;
export type RelatedWorkspaces = RelatedWorkspaceProperties[];
export const RelatedWorkspaces = /*@__PURE__*/ S.Array(
  RelatedWorkspaceProperties,
);
export interface DataReplicationSettings {
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export const DataReplicationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataReplication: S.optional(DataReplication),
    RecoverySnapshotTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DataReplicationSettings",
}) as any as S.Schema<DataReplicationSettings>;
export interface StandbyWorkspacesProperties {
  StandbyWorkspaceId?: string;
  DataReplication?: DataReplication;
  RecoverySnapshotTime?: Date;
}
export const StandbyWorkspacesProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StandbyWorkspaceId: S.optional(S.String),
    DataReplication: S.optional(DataReplication),
    RecoverySnapshotTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StandbyWorkspacesProperties",
}) as any as S.Schema<StandbyWorkspacesProperties>;
export type StandbyWorkspacesPropertiesList = StandbyWorkspacesProperties[];
export const StandbyWorkspacesPropertiesList = /*@__PURE__*/ S.Array(
  StandbyWorkspacesProperties,
);
export interface Workspace {
  WorkspaceId?: string;
  DirectoryId?: string;
  UserName?: string;
  IpAddress?: string;
  Ipv6Address?: string;
  State?: WorkspaceState;
  BundleId?: string;
  SubnetId?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
  ComputerName?: string;
  VolumeEncryptionKey?: string;
  UserVolumeEncryptionEnabled?: boolean;
  RootVolumeEncryptionEnabled?: boolean;
  WorkspaceName?: string;
  WorkspaceProperties?: WorkspaceProperties;
  ModificationStates?: ModificationState[];
  RelatedWorkspaces?: RelatedWorkspaceProperties[];
  DataReplicationSettings?: DataReplicationSettings;
  StandbyWorkspacesProperties?: StandbyWorkspacesProperties[];
}
export const Workspace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    UserName: S.optional(S.String),
    IpAddress: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
    State: S.optional(WorkspaceState),
    BundleId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ComputerName: S.optional(S.String),
    VolumeEncryptionKey: S.optional(S.String),
    UserVolumeEncryptionEnabled: S.optional(S.Boolean),
    RootVolumeEncryptionEnabled: S.optional(S.Boolean),
    WorkspaceName: S.optional(S.String),
    WorkspaceProperties: S.optional(WorkspaceProperties),
    ModificationStates: S.optional(ModificationStateList),
    RelatedWorkspaces: S.optional(RelatedWorkspaces),
    DataReplicationSettings: S.optional(DataReplicationSettings),
    StandbyWorkspacesProperties: S.optional(StandbyWorkspacesPropertiesList),
  }),
).annotate({ identifier: "Workspace" }) as any as S.Schema<Workspace>;
export type WorkspaceList = Workspace[];
export const WorkspaceList = /*@__PURE__*/ S.Array(Workspace);
export interface CreateWorkspacesResult {
  FailedRequests?: FailedCreateWorkspaceRequest[];
  PendingRequests?: Workspace[];
}
export const CreateWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailedRequests: S.optional(FailedCreateWorkspaceRequests),
    PendingRequests: S.optional(WorkspaceList),
  }).pipe(ns),
).annotate({
  identifier: "CreateWorkspacesResult",
}) as any as S.Schema<CreateWorkspacesResult>;
export type WorkspacesPoolName = string;
export type UpdateDescription = string;
export type DesiredUserSessions = number;
export interface Capacity {
  DesiredUserSessions: number;
}
export const Capacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DesiredUserSessions: S.Number }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type ApplicationSettingsStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const ApplicationSettingsStatusEnum = S.String;

export type SettingsGroup = string;
export interface ApplicationSettingsRequest {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
}
export const ApplicationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: ApplicationSettingsStatusEnum,
    SettingsGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettingsRequest",
}) as any as S.Schema<ApplicationSettingsRequest>;
export type DisconnectTimeoutInSeconds = number;
export type IdleDisconnectTimeoutInSeconds = number;
export type MaxUserDurationInSeconds = number;
export interface TimeoutSettings {
  DisconnectTimeoutInSeconds?: number;
  IdleDisconnectTimeoutInSeconds?: number;
  MaxUserDurationInSeconds?: number;
}
export const TimeoutSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisconnectTimeoutInSeconds: S.optional(S.Number),
    IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
    MaxUserDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeoutSettings",
}) as any as S.Schema<TimeoutSettings>;
export type PoolsRunningMode = "AUTO_STOP" | "ALWAYS_ON" | (string & {});
export const PoolsRunningMode = S.String;

export interface CreateWorkspacesPoolRequest {
  PoolName: string;
  Description: string;
  BundleId: string;
  DirectoryId: string;
  Capacity: Capacity;
  Tags?: Tag[];
  ApplicationSettings?: ApplicationSettingsRequest;
  TimeoutSettings?: TimeoutSettings;
  RunningMode?: PoolsRunningMode;
}
export const CreateWorkspacesPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.String,
    Description: S.String,
    BundleId: S.String,
    DirectoryId: S.String,
    Capacity: Capacity,
    Tags: S.optional(TagList),
    ApplicationSettings: S.optional(ApplicationSettingsRequest),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: S.optional(PoolsRunningMode),
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
  identifier: "CreateWorkspacesPoolRequest",
}) as any as S.Schema<CreateWorkspacesPoolRequest>;
export type WorkspacesPoolId = string;
export type ARN = string;
export type AvailableUserSessions = number;
export type ActualUserSessions = number;
export type ActiveUserSessions = number;
export interface CapacityStatus {
  AvailableUserSessions: number;
  DesiredUserSessions: number;
  ActualUserSessions: number;
  ActiveUserSessions: number;
}
export const CapacityStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailableUserSessions: S.Number,
    DesiredUserSessions: S.Number,
    ActualUserSessions: S.Number,
    ActiveUserSessions: S.Number,
  }),
).annotate({ identifier: "CapacityStatus" }) as any as S.Schema<CapacityStatus>;
export type WorkspacesPoolState =
  | "CREATING"
  | "DELETING"
  | "RUNNING"
  | "STARTING"
  | "STOPPED"
  | "STOPPING"
  | "UPDATING"
  | (string & {});
export const WorkspacesPoolState = S.String;

export type WorkspacesPoolErrorCode =
  | "IAM_SERVICE_ROLE_IS_MISSING"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DESCRIBE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_CREATE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DELETE_ACTION"
  | "NETWORK_INTERFACE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVICE_ERROR"
  | "MACHINE_ROLE_IS_MISSING"
  | "STS_DISABLED_IN_REGION"
  | "SUBNET_HAS_INSUFFICIENT_IP_ADDRESSES"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SUBNET_ACTION"
  | "SUBNET_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | "INVALID_SUBNET_CONFIGURATION"
  | "SECURITY_GROUPS_NOT_FOUND"
  | "IGW_NOT_ATTACHED"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SECURITY_GROUPS_ACTION"
  | "WORKSPACES_POOL_STOPPED"
  | "WORKSPACES_POOL_INSTANCE_PROVISIONING_FAILURE"
  | "DOMAIN_JOIN_ERROR_FILE_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_ACCESS_DENIED"
  | "DOMAIN_JOIN_ERROR_LOGON_FAILURE"
  | "DOMAIN_JOIN_ERROR_INVALID_PARAMETER"
  | "DOMAIN_JOIN_ERROR_MORE_DATA"
  | "DOMAIN_JOIN_ERROR_NO_SUCH_DOMAIN"
  | "DOMAIN_JOIN_ERROR_NOT_SUPPORTED"
  | "DOMAIN_JOIN_NERR_INVALID_WORKGROUP_NAME"
  | "DOMAIN_JOIN_NERR_WORKSTATION_NOT_STARTED"
  | "DOMAIN_JOIN_ERROR_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  | "DOMAIN_JOIN_NERR_PASSWORD_EXPIRED"
  | "DOMAIN_JOIN_INTERNAL_SERVICE_ERROR"
  | "DOMAIN_JOIN_ERROR_SECRET_ACTION_PERMISSION_IS_MISSING"
  | "DOMAIN_JOIN_ERROR_SECRET_DECRYPTION_FAILURE"
  | "DOMAIN_JOIN_ERROR_SECRET_STATE_INVALID"
  | "DOMAIN_JOIN_ERROR_SECRET_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_SECRET_VALUE_KEY_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_SECRET_INVALID"
  | "BUNDLE_NOT_FOUND"
  | "DIRECTORY_NOT_FOUND"
  | "INSUFFICIENT_PERMISSIONS_ERROR"
  | "DEFAULT_OU_IS_MISSING"
  | (string & {});
export const WorkspacesPoolErrorCode = S.String;

export type ErrorMessage = string;
export interface WorkspacesPoolError {
  ErrorCode?: WorkspacesPoolErrorCode;
  ErrorMessage?: string;
}
export const WorkspacesPoolError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(WorkspacesPoolErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspacesPoolError",
}) as any as S.Schema<WorkspacesPoolError>;
export type WorkspacesPoolErrors = WorkspacesPoolError[];
export const WorkspacesPoolErrors = /*@__PURE__*/ S.Array(WorkspacesPoolError);
export type S3BucketName = string;
export interface ApplicationSettingsResponse {
  Status: ApplicationSettingsStatusEnum;
  SettingsGroup?: string;
  S3BucketName?: string;
}
export const ApplicationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: ApplicationSettingsStatusEnum,
    SettingsGroup: S.optional(S.String),
    S3BucketName: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettingsResponse",
}) as any as S.Schema<ApplicationSettingsResponse>;
export interface WorkspacesPool {
  PoolId: string;
  PoolArn: string;
  CapacityStatus: CapacityStatus;
  PoolName: string;
  Description?: string;
  State: WorkspacesPoolState;
  CreatedAt: Date;
  BundleId: string;
  DirectoryId: string;
  Errors?: WorkspacesPoolError[];
  ApplicationSettings?: ApplicationSettingsResponse;
  TimeoutSettings?: TimeoutSettings;
  RunningMode: PoolsRunningMode;
}
export const WorkspacesPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    PoolArn: S.String,
    CapacityStatus: CapacityStatus,
    PoolName: S.String,
    Description: S.optional(S.String),
    State: WorkspacesPoolState,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    BundleId: S.String,
    DirectoryId: S.String,
    Errors: S.optional(WorkspacesPoolErrors),
    ApplicationSettings: S.optional(ApplicationSettingsResponse),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: PoolsRunningMode,
  }),
).annotate({ identifier: "WorkspacesPool" }) as any as S.Schema<WorkspacesPool>;
export interface CreateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export const CreateWorkspacesPoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspacesPool: S.optional(WorkspacesPool) }).pipe(ns),
).annotate({
  identifier: "CreateWorkspacesPoolResult",
}) as any as S.Schema<CreateWorkspacesPoolResult>;
export interface DeleteAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const DeleteAccountLinkInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
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
  identifier: "DeleteAccountLinkInvitationRequest",
}) as any as S.Schema<DeleteAccountLinkInvitationRequest>;
export interface DeleteAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const DeleteAccountLinkInvitationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "DeleteAccountLinkInvitationResult",
}) as any as S.Schema<DeleteAccountLinkInvitationResult>;
export type ClientDeviceType =
  | "DeviceTypeWindows"
  | "DeviceTypeOsx"
  | "DeviceTypeAndroid"
  | "DeviceTypeIos"
  | "DeviceTypeLinux"
  | "DeviceTypeWeb"
  | (string & {});
export const ClientDeviceType = S.String;

export type ClientDeviceTypeList = ClientDeviceType[];
export const ClientDeviceTypeList = /*@__PURE__*/ S.Array(ClientDeviceType);
export interface DeleteClientBrandingRequest {
  ResourceId: string;
  Platforms: ClientDeviceType[];
}
export const DeleteClientBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, Platforms: ClientDeviceTypeList }).pipe(
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
  identifier: "DeleteClientBrandingRequest",
}) as any as S.Schema<DeleteClientBrandingRequest>;
export interface DeleteClientBrandingResult {}
export const DeleteClientBrandingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteClientBrandingResult",
}) as any as S.Schema<DeleteClientBrandingResult>;
export interface DeleteConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
}
export const DeleteConnectClientAddInRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddInId: S.String, ResourceId: S.String }).pipe(
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
  identifier: "DeleteConnectClientAddInRequest",
}) as any as S.Schema<DeleteConnectClientAddInRequest>;
export interface DeleteConnectClientAddInResult {}
export const DeleteConnectClientAddInResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConnectClientAddInResult",
}) as any as S.Schema<DeleteConnectClientAddInResult>;
export interface DeleteConnectionAliasRequest {
  AliasId: string;
}
export const DeleteConnectionAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.String }).pipe(
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
  identifier: "DeleteConnectionAliasRequest",
}) as any as S.Schema<DeleteConnectionAliasRequest>;
export interface DeleteConnectionAliasResult {}
export const DeleteConnectionAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConnectionAliasResult",
}) as any as S.Schema<DeleteConnectionAliasResult>;
export interface DeleteIpGroupRequest {
  GroupId: string;
}
export const DeleteIpGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String }).pipe(
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
  identifier: "DeleteIpGroupRequest",
}) as any as S.Schema<DeleteIpGroupRequest>;
export interface DeleteIpGroupResult {}
export const DeleteIpGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteIpGroupResult",
}) as any as S.Schema<DeleteIpGroupResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteTagsRequest {
  ResourceId: string;
  TagKeys: string[];
}
export const DeleteTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagKeys: TagKeyList }).pipe(
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
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResult {}
export const DeleteTagsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTagsResult",
}) as any as S.Schema<DeleteTagsResult>;
export interface DeleteWorkspaceBundleRequest {
  BundleId?: string;
}
export const DeleteWorkspaceBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BundleId: S.optional(S.String) }).pipe(
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
  identifier: "DeleteWorkspaceBundleRequest",
}) as any as S.Schema<DeleteWorkspaceBundleRequest>;
export interface DeleteWorkspaceBundleResult {}
export const DeleteWorkspaceBundleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkspaceBundleResult",
}) as any as S.Schema<DeleteWorkspaceBundleResult>;
export interface DeleteWorkspaceImageRequest {
  ImageId: string;
}
export const DeleteWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageId: S.String }).pipe(
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
  identifier: "DeleteWorkspaceImageRequest",
}) as any as S.Schema<DeleteWorkspaceImageRequest>;
export interface DeleteWorkspaceImageResult {}
export const DeleteWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkspaceImageResult",
}) as any as S.Schema<DeleteWorkspaceImageResult>;
export interface DeployWorkspaceApplicationsRequest {
  WorkspaceId: string;
  Force?: boolean;
}
export const DeployWorkspaceApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String, Force: S.optional(S.Boolean) }).pipe(
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
  identifier: "DeployWorkspaceApplicationsRequest",
}) as any as S.Schema<DeployWorkspaceApplicationsRequest>;
export type WorkspaceResourceAssociationList = WorkspaceResourceAssociation[];
export const WorkspaceResourceAssociationList = /*@__PURE__*/ S.Array(
  WorkspaceResourceAssociation,
);
export interface WorkSpaceApplicationDeployment {
  Associations?: WorkspaceResourceAssociation[];
}
export const WorkSpaceApplicationDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Associations: S.optional(WorkspaceResourceAssociationList) }),
).annotate({
  identifier: "WorkSpaceApplicationDeployment",
}) as any as S.Schema<WorkSpaceApplicationDeployment>;
export interface DeployWorkspaceApplicationsResult {
  Deployment?: WorkSpaceApplicationDeployment;
}
export const DeployWorkspaceApplicationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Deployment: S.optional(WorkSpaceApplicationDeployment) }).pipe(ns),
).annotate({
  identifier: "DeployWorkspaceApplicationsResult",
}) as any as S.Schema<DeployWorkspaceApplicationsResult>;
export interface DeregisterWorkspaceDirectoryRequest {
  DirectoryId: string;
}
export const DeregisterWorkspaceDirectoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryId: S.String }).pipe(
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
  identifier: "DeregisterWorkspaceDirectoryRequest",
}) as any as S.Schema<DeregisterWorkspaceDirectoryRequest>;
export interface DeregisterWorkspaceDirectoryResult {}
export const DeregisterWorkspaceDirectoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterWorkspaceDirectoryResult",
}) as any as S.Schema<DeregisterWorkspaceDirectoryResult>;
export interface DescribeAccountRequest {}
export const DescribeAccountRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeAccountRequest",
}) as any as S.Schema<DescribeAccountRequest>;
export type DedicatedTenancySupportResultEnum =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DedicatedTenancySupportResultEnum = S.String;

export type DedicatedTenancyManagementCidrRange = string;
export type DedicatedTenancyAccountType =
  | "SOURCE_ACCOUNT"
  | "TARGET_ACCOUNT"
  | (string & {});
export const DedicatedTenancyAccountType = S.String;

export type Message = string;
export interface DescribeAccountResult {
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  DedicatedTenancyAccountType?: DedicatedTenancyAccountType;
  Message?: string;
}
export const DescribeAccountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportResultEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
    DedicatedTenancyAccountType: S.optional(DedicatedTenancyAccountType),
    Message: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountResult",
}) as any as S.Schema<DescribeAccountResult>;
export type PaginationToken = string;
export interface DescribeAccountModificationsRequest {
  NextToken?: string;
}
export const DescribeAccountModificationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
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
  identifier: "DescribeAccountModificationsRequest",
}) as any as S.Schema<DescribeAccountModificationsRequest>;
export type DedicatedTenancyModificationStateEnum =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const DedicatedTenancyModificationStateEnum = S.String;

export interface AccountModification {
  ModificationState?: DedicatedTenancyModificationStateEnum;
  DedicatedTenancySupport?: DedicatedTenancySupportResultEnum;
  DedicatedTenancyManagementCidrRange?: string;
  StartTime?: Date;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const AccountModification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModificationState: S.optional(DedicatedTenancyModificationStateEnum),
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportResultEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountModification",
}) as any as S.Schema<AccountModification>;
export type AccountModificationList = AccountModification[];
export const AccountModificationList =
  /*@__PURE__*/ S.Array(AccountModification);
export interface DescribeAccountModificationsResult {
  AccountModifications?: AccountModification[];
  NextToken?: string;
}
export const DescribeAccountModificationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountModifications: S.optional(AccountModificationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountModificationsResult",
}) as any as S.Schema<DescribeAccountModificationsResult>;
export type Limit = number;
export type ApplicationAssociatedResourceType =
  | "WORKSPACE"
  | "BUNDLE"
  | "IMAGE"
  | (string & {});
export const ApplicationAssociatedResourceType = S.String;

export type ApplicationAssociatedResourceTypeList =
  ApplicationAssociatedResourceType[];
export const ApplicationAssociatedResourceTypeList = /*@__PURE__*/ S.Array(
  ApplicationAssociatedResourceType,
);
export interface DescribeApplicationAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ApplicationId: string;
  AssociatedResourceTypes: ApplicationAssociatedResourceType[];
}
export const DescribeApplicationAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      ApplicationId: S.String,
      AssociatedResourceTypes: ApplicationAssociatedResourceTypeList,
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
  identifier: "DescribeApplicationAssociationsRequest",
}) as any as S.Schema<DescribeApplicationAssociationsRequest>;
export interface ApplicationResourceAssociation {
  ApplicationId?: string;
  AssociatedResourceId?: string;
  AssociatedResourceType?: ApplicationAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const ApplicationResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(ApplicationAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "ApplicationResourceAssociation",
}) as any as S.Schema<ApplicationResourceAssociation>;
export type ApplicationResourceAssociationList =
  ApplicationResourceAssociation[];
export const ApplicationResourceAssociationList = /*@__PURE__*/ S.Array(
  ApplicationResourceAssociation,
);
export interface DescribeApplicationAssociationsResult {
  Associations?: ApplicationResourceAssociation[];
  NextToken?: string;
}
export const DescribeApplicationAssociationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Associations: S.optional(ApplicationResourceAssociationList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationAssociationsResult",
}) as any as S.Schema<DescribeApplicationAssociationsResult>;
export type WorkSpaceApplicationIdList = string[];
export const WorkSpaceApplicationIdList = /*@__PURE__*/ S.Array(S.String);
export type ComputeList = Compute[];
export const ComputeList = /*@__PURE__*/ S.Array(Compute);
export type WorkSpaceApplicationLicenseType =
  | "LICENSED"
  | "UNLICENSED"
  | (string & {});
export const WorkSpaceApplicationLicenseType = S.String;

export type OperatingSystemNameList = OperatingSystemName[];
export const OperatingSystemNameList =
  /*@__PURE__*/ S.Array(OperatingSystemName);
export type WorkSpaceApplicationOwner = string;
export interface DescribeApplicationsRequest {
  ApplicationIds?: string[];
  ComputeTypeNames?: Compute[];
  LicenseType?: WorkSpaceApplicationLicenseType;
  OperatingSystemNames?: OperatingSystemName[];
  Owner?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIds: S.optional(WorkSpaceApplicationIdList),
    ComputeTypeNames: S.optional(ComputeList),
    LicenseType: S.optional(WorkSpaceApplicationLicenseType),
    OperatingSystemNames: S.optional(OperatingSystemNameList),
    Owner: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeApplicationsRequest",
}) as any as S.Schema<DescribeApplicationsRequest>;
export type WorkSpaceApplicationState =
  | "PENDING"
  | "ERROR"
  | "AVAILABLE"
  | "UNINSTALL_ONLY"
  | (string & {});
export const WorkSpaceApplicationState = S.String;

export interface WorkSpaceApplication {
  ApplicationId?: string;
  Created?: Date;
  Description?: string;
  LicenseType?: WorkSpaceApplicationLicenseType;
  Name?: string;
  Owner?: string;
  State?: WorkSpaceApplicationState;
  SupportedComputeTypeNames?: Compute[];
  SupportedOperatingSystemNames?: OperatingSystemName[];
}
export const WorkSpaceApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LicenseType: S.optional(WorkSpaceApplicationLicenseType),
    Name: S.optional(S.String),
    Owner: S.optional(S.String),
    State: S.optional(WorkSpaceApplicationState),
    SupportedComputeTypeNames: S.optional(ComputeList),
    SupportedOperatingSystemNames: S.optional(OperatingSystemNameList),
  }),
).annotate({
  identifier: "WorkSpaceApplication",
}) as any as S.Schema<WorkSpaceApplication>;
export type WorkSpaceApplicationList = WorkSpaceApplication[];
export const WorkSpaceApplicationList =
  /*@__PURE__*/ S.Array(WorkSpaceApplication);
export interface DescribeApplicationsResult {
  Applications?: WorkSpaceApplication[];
  NextToken?: string;
}
export const DescribeApplicationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Applications: S.optional(WorkSpaceApplicationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationsResult",
}) as any as S.Schema<DescribeApplicationsResult>;
export type BundleAssociatedResourceType = "APPLICATION" | (string & {});
export const BundleAssociatedResourceType = S.String;

export type BundleAssociatedResourceTypeList = BundleAssociatedResourceType[];
export const BundleAssociatedResourceTypeList = /*@__PURE__*/ S.Array(
  BundleAssociatedResourceType,
);
export interface DescribeBundleAssociationsRequest {
  BundleId: string;
  AssociatedResourceTypes: BundleAssociatedResourceType[];
}
export const DescribeBundleAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.String,
    AssociatedResourceTypes: BundleAssociatedResourceTypeList,
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
  identifier: "DescribeBundleAssociationsRequest",
}) as any as S.Schema<DescribeBundleAssociationsRequest>;
export interface BundleResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: BundleAssociatedResourceType;
  BundleId?: string;
  Created?: Date;
  LastUpdatedTime?: Date;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const BundleResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(BundleAssociatedResourceType),
    BundleId: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "BundleResourceAssociation",
}) as any as S.Schema<BundleResourceAssociation>;
export type BundleResourceAssociationList = BundleResourceAssociation[];
export const BundleResourceAssociationList = /*@__PURE__*/ S.Array(
  BundleResourceAssociation,
);
export interface DescribeBundleAssociationsResult {
  Associations?: BundleResourceAssociation[];
}
export const DescribeBundleAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Associations: S.optional(BundleResourceAssociationList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeBundleAssociationsResult",
}) as any as S.Schema<DescribeBundleAssociationsResult>;
export interface DescribeClientBrandingRequest {
  ResourceId: string;
}
export const DescribeClientBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
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
  identifier: "DescribeClientBrandingRequest",
}) as any as S.Schema<DescribeClientBrandingRequest>;
export type ClientUrl = string;
export type ClientEmail = string;
export type ClientLocale = string;
export type ClientLoginMessage = string;
export type LoginMessage = { [key: string]: string | undefined };
export const LoginMessage = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DefaultClientBrandingAttributes {
  LogoUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const DefaultClientBrandingAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogoUrl: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "DefaultClientBrandingAttributes",
}) as any as S.Schema<DefaultClientBrandingAttributes>;
export interface IosClientBrandingAttributes {
  LogoUrl?: string;
  Logo2xUrl?: string;
  Logo3xUrl?: string;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const IosClientBrandingAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogoUrl: S.optional(S.String),
    Logo2xUrl: S.optional(S.String),
    Logo3xUrl: S.optional(S.String),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "IosClientBrandingAttributes",
}) as any as S.Schema<IosClientBrandingAttributes>;
export interface DescribeClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export const DescribeClientBrandingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultClientBrandingAttributes),
  }).pipe(ns),
).annotate({
  identifier: "DescribeClientBrandingResult",
}) as any as S.Schema<DescribeClientBrandingResult>;
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeClientPropertiesRequest {
  ResourceIds: string[];
}
export const DescribeClientPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceIds: ResourceIdList }).pipe(
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
  identifier: "DescribeClientPropertiesRequest",
}) as any as S.Schema<DescribeClientPropertiesRequest>;
export type ReconnectEnum = "ENABLED" | "DISABLED" | (string & {});
export const ReconnectEnum = S.String;

export type LogUploadEnum = "ENABLED" | "DISABLED" | (string & {});
export const LogUploadEnum = S.String;

export type ClientExperiencePolicy = string;
export interface ClientProperties {
  ReconnectEnabled?: ReconnectEnum;
  LogUploadEnabled?: LogUploadEnum;
  ClientExperiencePolicy?: string;
}
export const ClientProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReconnectEnabled: S.optional(ReconnectEnum),
    LogUploadEnabled: S.optional(LogUploadEnum),
    ClientExperiencePolicy: S.optional(S.String),
  }),
).annotate({
  identifier: "ClientProperties",
}) as any as S.Schema<ClientProperties>;
export interface ClientPropertiesResult {
  ResourceId?: string;
  ClientProperties?: ClientProperties;
}
export const ClientPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ClientProperties: S.optional(ClientProperties),
  }),
).annotate({
  identifier: "ClientPropertiesResult",
}) as any as S.Schema<ClientPropertiesResult>;
export type ClientPropertiesList = ClientPropertiesResult[];
export const ClientPropertiesList = /*@__PURE__*/ S.Array(
  ClientPropertiesResult,
);
export interface DescribeClientPropertiesResult {
  ClientPropertiesList?: ClientPropertiesResult[];
}
export const DescribeClientPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClientPropertiesList: S.optional(ClientPropertiesList) }).pipe(ns),
).annotate({
  identifier: "DescribeClientPropertiesResult",
}) as any as S.Schema<DescribeClientPropertiesResult>;
export interface DescribeConnectClientAddInsRequest {
  ResourceId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeConnectClientAddInsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeConnectClientAddInsRequest",
}) as any as S.Schema<DescribeConnectClientAddInsRequest>;
export interface ConnectClientAddIn {
  AddInId?: string;
  ResourceId?: string;
  Name?: string;
  URL?: string;
}
export const ConnectClientAddIn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddInId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Name: S.optional(S.String),
    URL: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectClientAddIn",
}) as any as S.Schema<ConnectClientAddIn>;
export type ConnectClientAddInList = ConnectClientAddIn[];
export const ConnectClientAddInList = /*@__PURE__*/ S.Array(ConnectClientAddIn);
export interface DescribeConnectClientAddInsResult {
  AddIns?: ConnectClientAddIn[];
  NextToken?: string;
}
export const DescribeConnectClientAddInsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddIns: S.optional(ConnectClientAddInList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectClientAddInsResult",
}) as any as S.Schema<DescribeConnectClientAddInsResult>;
export type ConnectionAliasIdList = string[];
export const ConnectionAliasIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeConnectionAliasesRequest {
  AliasIds?: string[];
  ResourceId?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeConnectionAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AliasIds: S.optional(ConnectionAliasIdList),
    ResourceId: S.optional(S.String),
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
  identifier: "DescribeConnectionAliasesRequest",
}) as any as S.Schema<DescribeConnectionAliasesRequest>;
export type ConnectionAliasState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | (string & {});
export const ConnectionAliasState = S.String;

export type AssociationStatus =
  | "NOT_ASSOCIATED"
  | "ASSOCIATED_WITH_OWNER_ACCOUNT"
  | "ASSOCIATED_WITH_SHARED_ACCOUNT"
  | "PENDING_ASSOCIATION"
  | "PENDING_DISASSOCIATION"
  | (string & {});
export const AssociationStatus = S.String;

export interface ConnectionAliasAssociation {
  AssociationStatus?: AssociationStatus;
  AssociatedAccountId?: string;
  ResourceId?: string;
  ConnectionIdentifier?: string;
}
export const ConnectionAliasAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationStatus: S.optional(AssociationStatus),
    AssociatedAccountId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ConnectionIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectionAliasAssociation",
}) as any as S.Schema<ConnectionAliasAssociation>;
export type ConnectionAliasAssociationList = ConnectionAliasAssociation[];
export const ConnectionAliasAssociationList = /*@__PURE__*/ S.Array(
  ConnectionAliasAssociation,
);
export interface ConnectionAlias {
  ConnectionString?: string;
  AliasId?: string;
  State?: ConnectionAliasState;
  OwnerAccountId?: string;
  Associations?: ConnectionAliasAssociation[];
}
export const ConnectionAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionString: S.optional(S.String),
    AliasId: S.optional(S.String),
    State: S.optional(ConnectionAliasState),
    OwnerAccountId: S.optional(S.String),
    Associations: S.optional(ConnectionAliasAssociationList),
  }),
).annotate({
  identifier: "ConnectionAlias",
}) as any as S.Schema<ConnectionAlias>;
export type ConnectionAliasList = ConnectionAlias[];
export const ConnectionAliasList = /*@__PURE__*/ S.Array(ConnectionAlias);
export interface DescribeConnectionAliasesResult {
  ConnectionAliases?: ConnectionAlias[];
  NextToken?: string;
}
export const DescribeConnectionAliasesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionAliases: S.optional(ConnectionAliasList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionAliasesResult",
}) as any as S.Schema<DescribeConnectionAliasesResult>;
export interface DescribeConnectionAliasPermissionsRequest {
  AliasId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeConnectionAliasPermissionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AliasId: S.String,
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeConnectionAliasPermissionsRequest",
  }) as any as S.Schema<DescribeConnectionAliasPermissionsRequest>;
export interface ConnectionAliasPermission {
  SharedAccountId: string;
  AllowAssociation: boolean;
}
export const ConnectionAliasPermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SharedAccountId: S.String, AllowAssociation: S.Boolean }),
).annotate({
  identifier: "ConnectionAliasPermission",
}) as any as S.Schema<ConnectionAliasPermission>;
export type ConnectionAliasPermissions = ConnectionAliasPermission[];
export const ConnectionAliasPermissions = /*@__PURE__*/ S.Array(
  ConnectionAliasPermission,
);
export interface DescribeConnectionAliasPermissionsResult {
  AliasId?: string;
  ConnectionAliasPermissions?: ConnectionAliasPermission[];
  NextToken?: string;
}
export const DescribeConnectionAliasPermissionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AliasId: S.optional(S.String),
      ConnectionAliasPermissions: S.optional(ConnectionAliasPermissions),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionAliasPermissionsResult",
}) as any as S.Schema<DescribeConnectionAliasPermissionsResult>;
export interface DescribeCustomWorkspaceImageImportRequest {
  ImageId: string;
}
export const DescribeCustomWorkspaceImageImportRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ImageId: S.String }).pipe(
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
    identifier: "DescribeCustomWorkspaceImageImportRequest",
  }) as any as S.Schema<DescribeCustomWorkspaceImageImportRequest>;
export type InfrastructureConfigurationArn = string;
export type CustomWorkspaceImageImportState =
  | "PENDING"
  | "IN_PROGRESS"
  | "PROCESSING_SOURCE_IMAGE"
  | "IMAGE_TESTING_START"
  | "UPDATING_OPERATING_SYSTEM"
  | "IMAGE_COMPATIBILITY_CHECKING"
  | "IMAGE_TESTING_GENERALIZATION"
  | "CREATING_TEST_INSTANCE"
  | "INSTALLING_COMPONENTS"
  | "GENERALIZING"
  | "VALIDATING"
  | "PUBLISHING"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export const CustomWorkspaceImageImportState = S.String;

export type WorkflowStateMessage = string;
export type Percentage = number;
export type Ec2ImportTaskId = string;
export type ImageBuildVersionArn = string;
export type Ec2ImageId = string;
export type ImageSourceIdentifier =
  | {
      Ec2ImportTaskId: string;
      ImageBuildVersionArn?: never;
      Ec2ImageId?: never;
    }
  | {
      Ec2ImportTaskId?: never;
      ImageBuildVersionArn: string;
      Ec2ImageId?: never;
    }
  | {
      Ec2ImportTaskId?: never;
      ImageBuildVersionArn?: never;
      Ec2ImageId: string;
    };
export const ImageSourceIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ Ec2ImportTaskId: S.String }),
  S.Struct({ ImageBuildVersionArn: S.String }),
  S.Struct({ Ec2ImageId: S.String }),
]);
export type ErrorCode = string;
export type ImageErrorMessage = string;
export interface CustomWorkspaceImageImportErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const CustomWorkspaceImageImportErrorDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ErrorCode: S.optional(S.String),
      ErrorMessage: S.optional(S.String),
    }),
).annotate({
  identifier: "CustomWorkspaceImageImportErrorDetails",
}) as any as S.Schema<CustomWorkspaceImageImportErrorDetails>;
export type CustomWorkspaceImageImportErrorDetailsList =
  CustomWorkspaceImageImportErrorDetails[];
export const CustomWorkspaceImageImportErrorDetailsList = /*@__PURE__*/ S.Array(
  CustomWorkspaceImageImportErrorDetails,
);
export interface DescribeCustomWorkspaceImageImportResult {
  ImageId?: string;
  InfrastructureConfigurationArn?: string;
  State?: CustomWorkspaceImageImportState;
  StateMessage?: string;
  ProgressPercentage?: number;
  Created?: Date;
  LastUpdatedTime?: Date;
  ImageSource?: ImageSourceIdentifier;
  ImageBuilderInstanceId?: string;
  ErrorDetails?: CustomWorkspaceImageImportErrorDetails[];
}
export const DescribeCustomWorkspaceImageImportResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ImageId: S.optional(S.String),
      InfrastructureConfigurationArn: S.optional(S.String),
      State: S.optional(CustomWorkspaceImageImportState),
      StateMessage: S.optional(S.String),
      ProgressPercentage: S.optional(S.Number),
      Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastUpdatedTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      ImageSource: S.optional(ImageSourceIdentifier),
      ImageBuilderInstanceId: S.optional(S.String),
      ErrorDetails: S.optional(CustomWorkspaceImageImportErrorDetailsList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeCustomWorkspaceImageImportResult",
}) as any as S.Schema<DescribeCustomWorkspaceImageImportResult>;
export type ImageAssociatedResourceType = "APPLICATION" | (string & {});
export const ImageAssociatedResourceType = S.String;

export type ImageAssociatedResourceTypeList = ImageAssociatedResourceType[];
export const ImageAssociatedResourceTypeList = /*@__PURE__*/ S.Array(
  ImageAssociatedResourceType,
);
export interface DescribeImageAssociationsRequest {
  ImageId: string;
  AssociatedResourceTypes: ImageAssociatedResourceType[];
}
export const DescribeImageAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageId: S.String,
    AssociatedResourceTypes: ImageAssociatedResourceTypeList,
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
  identifier: "DescribeImageAssociationsRequest",
}) as any as S.Schema<DescribeImageAssociationsRequest>;
export interface ImageResourceAssociation {
  AssociatedResourceId?: string;
  AssociatedResourceType?: ImageAssociatedResourceType;
  Created?: Date;
  LastUpdatedTime?: Date;
  ImageId?: string;
  State?: AssociationState;
  StateReason?: AssociationStateReason;
}
export const ImageResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedResourceId: S.optional(S.String),
    AssociatedResourceType: S.optional(ImageAssociatedResourceType),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImageId: S.optional(S.String),
    State: S.optional(AssociationState),
    StateReason: S.optional(AssociationStateReason),
  }),
).annotate({
  identifier: "ImageResourceAssociation",
}) as any as S.Schema<ImageResourceAssociation>;
export type ImageResourceAssociationList = ImageResourceAssociation[];
export const ImageResourceAssociationList = /*@__PURE__*/ S.Array(
  ImageResourceAssociation,
);
export interface DescribeImageAssociationsResult {
  Associations?: ImageResourceAssociation[];
}
export const DescribeImageAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Associations: S.optional(ImageResourceAssociationList) }).pipe(ns),
).annotate({
  identifier: "DescribeImageAssociationsResult",
}) as any as S.Schema<DescribeImageAssociationsResult>;
export interface DescribeIpGroupsRequest {
  GroupIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeIpGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIds: S.optional(IpGroupIdList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeIpGroupsRequest",
}) as any as S.Schema<DescribeIpGroupsRequest>;
export interface WorkspacesIpGroup {
  groupId?: string;
  groupName?: string;
  groupDesc?: string;
  userRules?: IpRuleItem[];
}
export const WorkspacesIpGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupId: S.optional(S.String),
    groupName: S.optional(S.String),
    groupDesc: S.optional(S.String),
    userRules: S.optional(IpRuleList),
  }),
).annotate({
  identifier: "WorkspacesIpGroup",
}) as any as S.Schema<WorkspacesIpGroup>;
export type WorkspacesIpGroupsList = WorkspacesIpGroup[];
export const WorkspacesIpGroupsList = /*@__PURE__*/ S.Array(WorkspacesIpGroup);
export interface DescribeIpGroupsResult {
  Result?: WorkspacesIpGroup[];
  NextToken?: string;
}
export const DescribeIpGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Result: S.optional(WorkspacesIpGroupsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeIpGroupsResult",
}) as any as S.Schema<DescribeIpGroupsResult>;
export interface DescribeTagsRequest {
  ResourceId: string;
}
export const DescribeTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
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
  identifier: "DescribeTagsRequest",
}) as any as S.Schema<DescribeTagsRequest>;
export interface DescribeTagsResult {
  TagList?: Tag[];
}
export const DescribeTagsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "DescribeTagsResult",
}) as any as S.Schema<DescribeTagsResult>;
export type WorkSpaceAssociatedResourceTypeList =
  WorkSpaceAssociatedResourceType[];
export const WorkSpaceAssociatedResourceTypeList = /*@__PURE__*/ S.Array(
  WorkSpaceAssociatedResourceType,
);
export interface DescribeWorkspaceAssociationsRequest {
  WorkspaceId: string;
  AssociatedResourceTypes: WorkSpaceAssociatedResourceType[];
}
export const DescribeWorkspaceAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WorkspaceId: S.String,
      AssociatedResourceTypes: WorkSpaceAssociatedResourceTypeList,
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
  identifier: "DescribeWorkspaceAssociationsRequest",
}) as any as S.Schema<DescribeWorkspaceAssociationsRequest>;
export interface DescribeWorkspaceAssociationsResult {
  Associations?: WorkspaceResourceAssociation[];
}
export const DescribeWorkspaceAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Associations: S.optional(WorkspaceResourceAssociationList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeWorkspaceAssociationsResult",
}) as any as S.Schema<DescribeWorkspaceAssociationsResult>;
export type BundleIdList = string[];
export const BundleIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeWorkspaceBundlesRequest {
  BundleIds?: string[];
  Owner?: string;
  NextToken?: string;
}
export const DescribeWorkspaceBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleIds: S.optional(BundleIdList),
    Owner: S.optional(S.String),
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
  identifier: "DescribeWorkspaceBundlesRequest",
}) as any as S.Schema<DescribeWorkspaceBundlesRequest>;
export type BundleList = WorkspaceBundle[];
export const BundleList = /*@__PURE__*/ S.Array(WorkspaceBundle);
export interface DescribeWorkspaceBundlesResult {
  Bundles?: WorkspaceBundle[];
  NextToken?: string;
}
export const DescribeWorkspaceBundlesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bundles: S.optional(BundleList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceBundlesResult",
}) as any as S.Schema<DescribeWorkspaceBundlesResult>;
export type DirectoryIdList = string[];
export const DirectoryIdList = /*@__PURE__*/ S.Array(S.String);
export type WorkspaceDirectoryName = string;
export type WorkspaceDirectoryNameList = string[];
export const WorkspaceDirectoryNameList = /*@__PURE__*/ S.Array(S.String);
export type DescribeWorkspaceDirectoriesFilterName =
  | "USER_IDENTITY_TYPE"
  | "WORKSPACE_TYPE"
  | (string & {});
export const DescribeWorkspaceDirectoriesFilterName = S.String;

export type DescribeWorkspaceDirectoriesFilterValue = string;
export type DescribeWorkspaceDirectoriesFilterValues = string[];
export const DescribeWorkspaceDirectoriesFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DescribeWorkspaceDirectoriesFilter {
  Name: DescribeWorkspaceDirectoriesFilterName;
  Values: string[];
}
export const DescribeWorkspaceDirectoriesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: DescribeWorkspaceDirectoriesFilterName,
    Values: DescribeWorkspaceDirectoriesFilterValues,
  }),
).annotate({
  identifier: "DescribeWorkspaceDirectoriesFilter",
}) as any as S.Schema<DescribeWorkspaceDirectoriesFilter>;
export type DescribeWorkspaceDirectoriesFilterList =
  DescribeWorkspaceDirectoriesFilter[];
export const DescribeWorkspaceDirectoriesFilterList = /*@__PURE__*/ S.Array(
  DescribeWorkspaceDirectoriesFilter,
);
export interface DescribeWorkspaceDirectoriesRequest {
  DirectoryIds?: string[];
  WorkspaceDirectoryNames?: string[];
  Limit?: number;
  NextToken?: string;
  Filters?: DescribeWorkspaceDirectoriesFilter[];
}
export const DescribeWorkspaceDirectoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryIds: S.optional(DirectoryIdList),
    WorkspaceDirectoryNames: S.optional(WorkspaceDirectoryNameList),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(DescribeWorkspaceDirectoriesFilterList),
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
  identifier: "DescribeWorkspaceDirectoriesRequest",
}) as any as S.Schema<DescribeWorkspaceDirectoriesRequest>;
export type Alias = string;
export type DirectoryName = string;
export type RegistrationCode = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type DnsIpAddresses = string[];
export const DnsIpAddresses = /*@__PURE__*/ S.Array(S.String);
export type DnsIpv6Addresses = string[];
export const DnsIpv6Addresses = /*@__PURE__*/ S.Array(S.String);
export type WorkspaceDirectoryType =
  | "SIMPLE_AD"
  | "AD_CONNECTOR"
  | "CUSTOMER_MANAGED"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export const WorkspaceDirectoryType = S.String;

export type SecurityGroupId = string;
export type WorkspaceDirectoryState =
  | "REGISTERING"
  | "REGISTERED"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "ERROR"
  | (string & {});
export const WorkspaceDirectoryState = S.String;

export type DefaultOu = string;
export interface DefaultWorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export const DefaultWorkspaceCreationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableInternetAccess: S.optional(S.Boolean),
    DefaultOu: S.optional(S.String),
    CustomSecurityGroupId: S.optional(S.String),
    UserEnabledAsLocalAdministrator: S.optional(S.Boolean),
    EnableMaintenanceMode: S.optional(S.Boolean),
    InstanceIamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultWorkspaceCreationProperties",
}) as any as S.Schema<DefaultWorkspaceCreationProperties>;
export type AccessPropertyValue = "ALLOW" | "DENY" | (string & {});
export const AccessPropertyValue = S.String;

export type AccessEndpointType = "STREAMING_WSP" | (string & {});
export const AccessEndpointType = S.String;

export type AlphanumericDashUnderscoreNonEmptyString = string;
export interface AccessEndpoint {
  AccessEndpointType?: AccessEndpointType;
  VpcEndpointId?: string;
}
export const AccessEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessEndpointType: S.optional(AccessEndpointType),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({ identifier: "AccessEndpoint" }) as any as S.Schema<AccessEndpoint>;
export type AccessEndpointList = AccessEndpoint[];
export const AccessEndpointList = /*@__PURE__*/ S.Array(AccessEndpoint);
export type InternetFallbackProtocol = "PCOIP" | (string & {});
export const InternetFallbackProtocol = S.String;

export type InternetFallbackProtocolList = InternetFallbackProtocol[];
export const InternetFallbackProtocolList = /*@__PURE__*/ S.Array(
  InternetFallbackProtocol,
);
export interface AccessEndpointConfig {
  AccessEndpoints: AccessEndpoint[];
  InternetFallbackProtocols?: InternetFallbackProtocol[];
}
export const AccessEndpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessEndpoints: AccessEndpointList,
    InternetFallbackProtocols: S.optional(InternetFallbackProtocolList),
  }),
).annotate({
  identifier: "AccessEndpointConfig",
}) as any as S.Schema<AccessEndpointConfig>;
export interface WorkspaceAccessProperties {
  DeviceTypeWindows?: AccessPropertyValue;
  DeviceTypeOsx?: AccessPropertyValue;
  DeviceTypeWeb?: AccessPropertyValue;
  DeviceTypeIos?: AccessPropertyValue;
  DeviceTypeAndroid?: AccessPropertyValue;
  DeviceTypeChromeOs?: AccessPropertyValue;
  DeviceTypeZeroClient?: AccessPropertyValue;
  DeviceTypeLinux?: AccessPropertyValue;
  DeviceTypeWorkSpacesThinClient?: AccessPropertyValue;
  AccessEndpointConfig?: AccessEndpointConfig;
}
export const WorkspaceAccessProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(AccessPropertyValue),
    DeviceTypeOsx: S.optional(AccessPropertyValue),
    DeviceTypeWeb: S.optional(AccessPropertyValue),
    DeviceTypeIos: S.optional(AccessPropertyValue),
    DeviceTypeAndroid: S.optional(AccessPropertyValue),
    DeviceTypeChromeOs: S.optional(AccessPropertyValue),
    DeviceTypeZeroClient: S.optional(AccessPropertyValue),
    DeviceTypeLinux: S.optional(AccessPropertyValue),
    DeviceTypeWorkSpacesThinClient: S.optional(AccessPropertyValue),
    AccessEndpointConfig: S.optional(AccessEndpointConfig),
  }),
).annotate({
  identifier: "WorkspaceAccessProperties",
}) as any as S.Schema<WorkspaceAccessProperties>;
export type Tenancy = "DEDICATED" | "SHARED" | (string & {});
export const Tenancy = S.String;

export interface SelfservicePermissions {
  RestartWorkspace?: ReconnectEnum;
  IncreaseVolumeSize?: ReconnectEnum;
  ChangeComputeType?: ReconnectEnum;
  SwitchRunningMode?: ReconnectEnum;
  RebuildWorkspace?: ReconnectEnum;
}
export const SelfservicePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RestartWorkspace: S.optional(ReconnectEnum),
    IncreaseVolumeSize: S.optional(ReconnectEnum),
    ChangeComputeType: S.optional(ReconnectEnum),
    SwitchRunningMode: S.optional(ReconnectEnum),
    RebuildWorkspace: S.optional(ReconnectEnum),
  }),
).annotate({
  identifier: "SelfservicePermissions",
}) as any as S.Schema<SelfservicePermissions>;
export type SamlStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | "ENABLED_WITH_DIRECTORY_LOGIN_FALLBACK"
  | (string & {});
export const SamlStatusEnum = S.String;

export type SamlUserAccessUrl = string;
export interface SamlProperties {
  Status?: SamlStatusEnum;
  UserAccessUrl?: string;
  RelayStateParameterName?: string;
}
export const SamlProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(SamlStatusEnum),
    UserAccessUrl: S.optional(S.String),
    RelayStateParameterName: S.optional(S.String),
  }),
).annotate({ identifier: "SamlProperties" }) as any as S.Schema<SamlProperties>;
export type CertificateBasedAuthStatusEnum =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const CertificateBasedAuthStatusEnum = S.String;

export type CertificateAuthorityArn = string;
export interface CertificateBasedAuthProperties {
  Status?: CertificateBasedAuthStatusEnum;
  CertificateAuthorityArn?: string;
}
export const CertificateBasedAuthProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(CertificateBasedAuthStatusEnum),
    CertificateAuthorityArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateBasedAuthProperties",
}) as any as S.Schema<CertificateBasedAuthProperties>;
export type EndpointEncryptionMode =
  | "STANDARD_TLS"
  | "FIPS_VALIDATED"
  | (string & {});
export const EndpointEncryptionMode = S.String;

export type MicrosoftEntraConfigTenantId = string;
export type SecretsManagerArn = string;
export interface MicrosoftEntraConfig {
  TenantId?: string;
  ApplicationConfigSecretArn?: string;
}
export const MicrosoftEntraConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantId: S.optional(S.String),
    ApplicationConfigSecretArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MicrosoftEntraConfig",
}) as any as S.Schema<MicrosoftEntraConfig>;
export type WorkspaceDirectoryDescription = string;
export type UserIdentityType =
  | "CUSTOMER_MANAGED"
  | "AWS_DIRECTORY_SERVICE"
  | "AWS_IAM_IDENTITY_CENTER"
  | (string & {});
export const UserIdentityType = S.String;

export type WorkspaceType = "PERSONAL" | "POOLS" | (string & {});
export const WorkspaceType = S.String;

export interface IDCConfig {
  InstanceArn?: string;
  ApplicationArn?: string;
}
export const IDCConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({ identifier: "IDCConfig" }) as any as S.Schema<IDCConfig>;
export type DomainName = string;
export interface ActiveDirectoryConfig {
  DomainName: string;
  ServiceAccountSecretArn: string;
}
export const ActiveDirectoryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, ServiceAccountSecretArn: S.String }),
).annotate({
  identifier: "ActiveDirectoryConfig",
}) as any as S.Schema<ActiveDirectoryConfig>;
export type StreamingExperiencePreferredProtocolEnum =
  | "TCP"
  | "UDP"
  | (string & {});
export const StreamingExperiencePreferredProtocolEnum = S.String;

export type UserSettingActionEnum =
  | "CLIPBOARD_COPY_FROM_LOCAL_DEVICE"
  | "CLIPBOARD_COPY_TO_LOCAL_DEVICE"
  | "PRINTING_TO_LOCAL_DEVICE"
  | "SMART_CARD"
  | (string & {});
export const UserSettingActionEnum = S.String;

export type UserSettingPermissionEnum = "ENABLED" | "DISABLED" | (string & {});
export const UserSettingPermissionEnum = S.String;

export type MaximumLength = number;
export interface UserSetting {
  Action: UserSettingActionEnum;
  Permission: UserSettingPermissionEnum;
  MaximumLength?: number;
}
export const UserSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: UserSettingActionEnum,
    Permission: UserSettingPermissionEnum,
    MaximumLength: S.optional(S.Number),
  }),
).annotate({ identifier: "UserSetting" }) as any as S.Schema<UserSetting>;
export type UserSettings = UserSetting[];
export const UserSettings = /*@__PURE__*/ S.Array(UserSetting);
export type StorageConnectorTypeEnum = "HOME_FOLDER" | (string & {});
export const StorageConnectorTypeEnum = S.String;

export type StorageConnectorStatusEnum = "ENABLED" | "DISABLED" | (string & {});
export const StorageConnectorStatusEnum = S.String;

export interface StorageConnector {
  ConnectorType: StorageConnectorTypeEnum;
  Status: StorageConnectorStatusEnum;
}
export const StorageConnector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorType: StorageConnectorTypeEnum,
    Status: StorageConnectorStatusEnum,
  }),
).annotate({
  identifier: "StorageConnector",
}) as any as S.Schema<StorageConnector>;
export type StorageConnectors = StorageConnector[];
export const StorageConnectors = /*@__PURE__*/ S.Array(StorageConnector);
export type AGAModeForDirectoryEnum =
  | "ENABLED_AUTO"
  | "DISABLED"
  | (string & {});
export const AGAModeForDirectoryEnum = S.String;

export type AGAPreferredProtocolForDirectory = "TCP" | "NONE" | (string & {});
export const AGAPreferredProtocolForDirectory = S.String;

export interface GlobalAcceleratorForDirectory {
  Mode: AGAModeForDirectoryEnum;
  PreferredProtocol?: AGAPreferredProtocolForDirectory;
}
export const GlobalAcceleratorForDirectory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: AGAModeForDirectoryEnum,
    PreferredProtocol: S.optional(AGAPreferredProtocolForDirectory),
  }),
).annotate({
  identifier: "GlobalAcceleratorForDirectory",
}) as any as S.Schema<GlobalAcceleratorForDirectory>;
export interface StreamingProperties {
  StreamingExperiencePreferredProtocol?: StreamingExperiencePreferredProtocolEnum;
  UserSettings?: UserSetting[];
  StorageConnectors?: StorageConnector[];
  GlobalAccelerator?: GlobalAcceleratorForDirectory;
}
export const StreamingProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamingExperiencePreferredProtocol: S.optional(
      StreamingExperiencePreferredProtocolEnum,
    ),
    UserSettings: S.optional(UserSettings),
    StorageConnectors: S.optional(StorageConnectors),
    GlobalAccelerator: S.optional(GlobalAcceleratorForDirectory),
  }),
).annotate({
  identifier: "StreamingProperties",
}) as any as S.Schema<StreamingProperties>;
export interface WorkspaceDirectory {
  DirectoryId?: string;
  Alias?: string;
  DirectoryName?: string;
  RegistrationCode?: string;
  SubnetIds?: string[];
  DnsIpAddresses?: string[];
  DnsIpv6Addresses?: string[];
  CustomerUserName?: string;
  IamRoleId?: string;
  DirectoryType?: WorkspaceDirectoryType;
  WorkspaceSecurityGroupId?: string;
  State?: WorkspaceDirectoryState;
  WorkspaceCreationProperties?: DefaultWorkspaceCreationProperties;
  ipGroupIds?: string[];
  WorkspaceAccessProperties?: WorkspaceAccessProperties;
  Tenancy?: Tenancy;
  SelfservicePermissions?: SelfservicePermissions;
  SamlProperties?: SamlProperties;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
  EndpointEncryptionMode?: EndpointEncryptionMode;
  MicrosoftEntraConfig?: MicrosoftEntraConfig;
  WorkspaceDirectoryName?: string;
  WorkspaceDirectoryDescription?: string;
  UserIdentityType?: UserIdentityType;
  WorkspaceType?: WorkspaceType;
  IDCConfig?: IDCConfig;
  ActiveDirectoryConfig?: ActiveDirectoryConfig;
  StreamingProperties?: StreamingProperties;
  ErrorMessage?: string;
}
export const WorkspaceDirectory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Alias: S.optional(S.String),
    DirectoryName: S.optional(S.String),
    RegistrationCode: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    DnsIpAddresses: S.optional(DnsIpAddresses),
    DnsIpv6Addresses: S.optional(DnsIpv6Addresses),
    CustomerUserName: S.optional(S.String),
    IamRoleId: S.optional(S.String),
    DirectoryType: S.optional(WorkspaceDirectoryType),
    WorkspaceSecurityGroupId: S.optional(S.String),
    State: S.optional(WorkspaceDirectoryState),
    WorkspaceCreationProperties: S.optional(DefaultWorkspaceCreationProperties),
    ipGroupIds: S.optional(IpGroupIdList),
    WorkspaceAccessProperties: S.optional(WorkspaceAccessProperties),
    Tenancy: S.optional(Tenancy),
    SelfservicePermissions: S.optional(SelfservicePermissions),
    SamlProperties: S.optional(SamlProperties),
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
    EndpointEncryptionMode: S.optional(EndpointEncryptionMode),
    MicrosoftEntraConfig: S.optional(MicrosoftEntraConfig),
    WorkspaceDirectoryName: S.optional(S.String),
    WorkspaceDirectoryDescription: S.optional(S.String),
    UserIdentityType: S.optional(UserIdentityType),
    WorkspaceType: S.optional(WorkspaceType),
    IDCConfig: S.optional(IDCConfig),
    ActiveDirectoryConfig: S.optional(ActiveDirectoryConfig),
    StreamingProperties: S.optional(StreamingProperties),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceDirectory",
}) as any as S.Schema<WorkspaceDirectory>;
export type DirectoryList = WorkspaceDirectory[];
export const DirectoryList = /*@__PURE__*/ S.Array(WorkspaceDirectory);
export interface DescribeWorkspaceDirectoriesResult {
  Directories?: WorkspaceDirectory[];
  NextToken?: string;
}
export const DescribeWorkspaceDirectoriesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Directories: S.optional(DirectoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceDirectoriesResult",
}) as any as S.Schema<DescribeWorkspaceDirectoriesResult>;
export interface DescribeWorkspaceImagePermissionsRequest {
  ImageId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeWorkspaceImagePermissionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ImageId: S.String,
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
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
  identifier: "DescribeWorkspaceImagePermissionsRequest",
}) as any as S.Schema<DescribeWorkspaceImagePermissionsRequest>;
export interface ImagePermission {
  SharedAccountId?: string;
}
export const ImagePermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SharedAccountId: S.optional(S.String) }),
).annotate({
  identifier: "ImagePermission",
}) as any as S.Schema<ImagePermission>;
export type ImagePermissions = ImagePermission[];
export const ImagePermissions = /*@__PURE__*/ S.Array(ImagePermission);
export interface DescribeWorkspaceImagePermissionsResult {
  ImageId?: string;
  ImagePermissions?: ImagePermission[];
  NextToken?: string;
}
export const DescribeWorkspaceImagePermissionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ImageId: S.optional(S.String),
      ImagePermissions: S.optional(ImagePermissions),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceImagePermissionsResult",
}) as any as S.Schema<DescribeWorkspaceImagePermissionsResult>;
export type WorkspaceImageIdList = string[];
export const WorkspaceImageIdList = /*@__PURE__*/ S.Array(S.String);
export type ImageType = "OWNED" | "SHARED" | (string & {});
export const ImageType = S.String;

export interface DescribeWorkspaceImagesRequest {
  ImageIds?: string[];
  ImageType?: ImageType;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeWorkspaceImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageIds: S.optional(WorkspaceImageIdList),
    ImageType: S.optional(ImageType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeWorkspaceImagesRequest",
}) as any as S.Schema<DescribeWorkspaceImagesRequest>;
export type WorkspaceImageErrorCode = string;
export interface UpdateResult {
  UpdateAvailable?: boolean;
  Description?: string;
}
export const UpdateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateAvailable: S.optional(S.Boolean),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateResult" }) as any as S.Schema<UpdateResult>;
export type WorkspaceImageErrorDetailCode =
  | "OutdatedPowershellVersion"
  | "OfficeInstalled"
  | "PCoIPAgentInstalled"
  | "WindowsUpdatesEnabled"
  | "AutoMountDisabled"
  | "WorkspacesBYOLAccountNotFound"
  | "WorkspacesBYOLAccountDisabled"
  | "DHCPDisabled"
  | "DiskFreeSpace"
  | "AdditionalDrivesAttached"
  | "OSNotSupported"
  | "DomainJoined"
  | "AzureDomainJoined"
  | "FirewallEnabled"
  | "VMWareToolsInstalled"
  | "DiskSizeExceeded"
  | "IncompatiblePartitioning"
  | "PendingReboot"
  | "AutoLogonEnabled"
  | "RealTimeUniversalDisabled"
  | "MultipleBootPartition"
  | "Requires64BitOS"
  | "ZeroRearmCount"
  | "InPlaceUpgrade"
  | "AntiVirusInstalled"
  | "UEFINotSupported"
  | "UnknownError"
  | "AppXPackagesInstalled"
  | "ReservedStorageInUse"
  | "AdditionalDrivesPresent"
  | "WindowsUpdatesRequired"
  | "SysPrepFileMissing"
  | "UserProfileMissing"
  | "InsufficientDiskSpace"
  | "EnvironmentVariablesPathMissingEntries"
  | "DomainAccountServicesFound"
  | "InvalidIp"
  | "RemoteDesktopServicesDisabled"
  | "WindowsModulesInstallerDisabled"
  | "AmazonSsmAgentEnabled"
  | "UnsupportedSecurityProtocol"
  | "MultipleUserProfiles"
  | "StagedAppxPackage"
  | "UnsupportedOsUpgrade"
  | "InsufficientRearmCount"
  | "ProtocolOSIncompatibility"
  | "MemoryIntegrityIncompatibility"
  | "RestrictedDriveLetterInUse"
  | (string & {});
export const WorkspaceImageErrorDetailCode = S.String;

export interface ErrorDetails {
  ErrorCode?: WorkspaceImageErrorDetailCode;
  ErrorMessage?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(WorkspaceImageErrorDetailCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type ErrorDetailsList = ErrorDetails[];
export const ErrorDetailsList = /*@__PURE__*/ S.Array(ErrorDetails);
export interface WorkspaceImage {
  ImageId?: string;
  Name?: string;
  Description?: string;
  OperatingSystem?: OperatingSystem;
  State?: WorkspaceImageState;
  RequiredTenancy?: WorkspaceImageRequiredTenancy;
  ErrorCode?: string;
  ErrorMessage?: string;
  Created?: Date;
  OwnerAccountId?: string;
  Updates?: UpdateResult;
  ErrorDetails?: ErrorDetails[];
}
export const WorkspaceImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    State: S.optional(WorkspaceImageState),
    RequiredTenancy: S.optional(WorkspaceImageRequiredTenancy),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OwnerAccountId: S.optional(S.String),
    Updates: S.optional(UpdateResult),
    ErrorDetails: S.optional(ErrorDetailsList),
  }),
).annotate({ identifier: "WorkspaceImage" }) as any as S.Schema<WorkspaceImage>;
export type WorkspaceImageList = WorkspaceImage[];
export const WorkspaceImageList = /*@__PURE__*/ S.Array(WorkspaceImage);
export interface DescribeWorkspaceImagesResult {
  Images?: WorkspaceImage[];
  NextToken?: string;
}
export const DescribeWorkspaceImagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Images: S.optional(WorkspaceImageList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceImagesResult",
}) as any as S.Schema<DescribeWorkspaceImagesResult>;
export type WorkspaceIdList = string[];
export const WorkspaceIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeWorkspacesRequest {
  WorkspaceIds?: string[];
  DirectoryId?: string;
  UserName?: string;
  BundleId?: string;
  Limit?: number;
  NextToken?: string;
  WorkspaceName?: string;
}
export const DescribeWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceIds: S.optional(WorkspaceIdList),
    DirectoryId: S.optional(S.String),
    UserName: S.optional(S.String),
    BundleId: S.optional(S.String),
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    WorkspaceName: S.optional(S.String),
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
  identifier: "DescribeWorkspacesRequest",
}) as any as S.Schema<DescribeWorkspacesRequest>;
export interface DescribeWorkspacesResult {
  Workspaces?: Workspace[];
  NextToken?: string;
}
export const DescribeWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Workspaces: S.optional(WorkspaceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesResult",
}) as any as S.Schema<DescribeWorkspacesResult>;
export interface DescribeWorkspacesConnectionStatusRequest {
  WorkspaceIds?: string[];
  NextToken?: string;
}
export const DescribeWorkspacesConnectionStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WorkspaceIds: S.optional(WorkspaceIdList),
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
    identifier: "DescribeWorkspacesConnectionStatusRequest",
  }) as any as S.Schema<DescribeWorkspacesConnectionStatusRequest>;
export type ConnectionState =
  | "CONNECTED"
  | "DISCONNECTED"
  | "UNKNOWN"
  | (string & {});
export const ConnectionState = S.String;

export interface WorkspaceConnectionStatus {
  WorkspaceId?: string;
  ConnectionState?: ConnectionState;
  ConnectionStateCheckTimestamp?: Date;
  LastKnownUserConnectionTimestamp?: Date;
}
export const WorkspaceConnectionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    ConnectionState: S.optional(ConnectionState),
    ConnectionStateCheckTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastKnownUserConnectionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WorkspaceConnectionStatus",
}) as any as S.Schema<WorkspaceConnectionStatus>;
export type WorkspaceConnectionStatusList = WorkspaceConnectionStatus[];
export const WorkspaceConnectionStatusList = /*@__PURE__*/ S.Array(
  WorkspaceConnectionStatus,
);
export interface DescribeWorkspacesConnectionStatusResult {
  WorkspacesConnectionStatus?: WorkspaceConnectionStatus[];
  NextToken?: string;
}
export const DescribeWorkspacesConnectionStatusResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WorkspacesConnectionStatus: S.optional(WorkspaceConnectionStatusList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesConnectionStatusResult",
}) as any as S.Schema<DescribeWorkspacesConnectionStatusResult>;
export interface DescribeWorkspaceSnapshotsRequest {
  WorkspaceId: string;
}
export const DescribeWorkspaceSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }).pipe(
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
  identifier: "DescribeWorkspaceSnapshotsRequest",
}) as any as S.Schema<DescribeWorkspaceSnapshotsRequest>;
export interface Snapshot {
  SnapshotTime?: Date;
}
export const Snapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export type SnapshotList = Snapshot[];
export const SnapshotList = /*@__PURE__*/ S.Array(Snapshot);
export interface DescribeWorkspaceSnapshotsResult {
  RebuildSnapshots?: Snapshot[];
  RestoreSnapshots?: Snapshot[];
}
export const DescribeWorkspaceSnapshotsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RebuildSnapshots: S.optional(SnapshotList),
    RestoreSnapshots: S.optional(SnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspaceSnapshotsResult",
}) as any as S.Schema<DescribeWorkspaceSnapshotsResult>;
export type WorkspacesPoolIds = string[];
export const WorkspacesPoolIds = /*@__PURE__*/ S.Array(S.String);
export type DescribeWorkspacesPoolsFilterName = "PoolName" | (string & {});
export const DescribeWorkspacesPoolsFilterName = S.String;

export type DescribeWorkspacesPoolsFilterValue = string;
export type DescribeWorkspacesPoolsFilterValues = string[];
export const DescribeWorkspacesPoolsFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export type DescribeWorkspacesPoolsFilterOperator =
  | "EQUALS"
  | "NOTEQUALS"
  | "CONTAINS"
  | "NOTCONTAINS"
  | (string & {});
export const DescribeWorkspacesPoolsFilterOperator = S.String;

export interface DescribeWorkspacesPoolsFilter {
  Name: DescribeWorkspacesPoolsFilterName;
  Values: string[];
  Operator: DescribeWorkspacesPoolsFilterOperator;
}
export const DescribeWorkspacesPoolsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: DescribeWorkspacesPoolsFilterName,
    Values: DescribeWorkspacesPoolsFilterValues,
    Operator: DescribeWorkspacesPoolsFilterOperator,
  }),
).annotate({
  identifier: "DescribeWorkspacesPoolsFilter",
}) as any as S.Schema<DescribeWorkspacesPoolsFilter>;
export type DescribeWorkspacesPoolsFilters = DescribeWorkspacesPoolsFilter[];
export const DescribeWorkspacesPoolsFilters = /*@__PURE__*/ S.Array(
  DescribeWorkspacesPoolsFilter,
);
export interface DescribeWorkspacesPoolsRequest {
  PoolIds?: string[];
  Filters?: DescribeWorkspacesPoolsFilter[];
  Limit?: number;
  NextToken?: string;
}
export const DescribeWorkspacesPoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolIds: S.optional(WorkspacesPoolIds),
    Filters: S.optional(DescribeWorkspacesPoolsFilters),
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
  identifier: "DescribeWorkspacesPoolsRequest",
}) as any as S.Schema<DescribeWorkspacesPoolsRequest>;
export type WorkspacesPools = WorkspacesPool[];
export const WorkspacesPools = /*@__PURE__*/ S.Array(WorkspacesPool);
export interface DescribeWorkspacesPoolsResult {
  WorkspacesPools?: WorkspacesPool[];
  NextToken?: string;
}
export const DescribeWorkspacesPoolsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspacesPools: S.optional(WorkspacesPools),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesPoolsResult",
}) as any as S.Schema<DescribeWorkspacesPoolsResult>;
export type WorkspacesPoolUserId = string;
export type Limit50 = number;
export interface DescribeWorkspacesPoolSessionsRequest {
  PoolId: string;
  UserId?: string;
  Limit?: number;
  NextToken?: string;
}
export const DescribeWorkspacesPoolSessionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PoolId: S.String,
      UserId: S.optional(S.String),
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
  identifier: "DescribeWorkspacesPoolSessionsRequest",
}) as any as S.Schema<DescribeWorkspacesPoolSessionsRequest>;
export type AuthenticationType = "SAML" | (string & {});
export const AuthenticationType = S.String;

export type SessionConnectionState =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export const SessionConnectionState = S.String;

export type SessionInstanceId = string;
export interface NetworkAccessConfiguration {
  EniPrivateIpAddress?: string;
  EniId?: string;
}
export const NetworkAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EniPrivateIpAddress: S.optional(S.String),
    EniId: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkAccessConfiguration",
}) as any as S.Schema<NetworkAccessConfiguration>;
export interface WorkspacesPoolSession {
  AuthenticationType?: AuthenticationType;
  ConnectionState?: SessionConnectionState;
  SessionId: string;
  InstanceId?: string;
  PoolId: string;
  ExpirationTime?: Date;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  StartTime?: Date;
  UserId: string;
}
export const WorkspacesPoolSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationType: S.optional(AuthenticationType),
    ConnectionState: S.optional(SessionConnectionState),
    SessionId: S.String,
    InstanceId: S.optional(S.String),
    PoolId: S.String,
    ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NetworkAccessConfiguration: S.optional(NetworkAccessConfiguration),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UserId: S.String,
  }),
).annotate({
  identifier: "WorkspacesPoolSession",
}) as any as S.Schema<WorkspacesPoolSession>;
export type WorkspacesPoolSessions = WorkspacesPoolSession[];
export const WorkspacesPoolSessions = /*@__PURE__*/ S.Array(
  WorkspacesPoolSession,
);
export interface DescribeWorkspacesPoolSessionsResult {
  Sessions?: WorkspacesPoolSession[];
  NextToken?: string;
}
export const DescribeWorkspacesPoolSessionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Sessions: S.optional(WorkspacesPoolSessions),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeWorkspacesPoolSessionsResult",
}) as any as S.Schema<DescribeWorkspacesPoolSessionsResult>;
export interface DisassociateConnectionAliasRequest {
  AliasId: string;
}
export const DisassociateConnectionAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AliasId: S.String }).pipe(
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
  identifier: "DisassociateConnectionAliasRequest",
}) as any as S.Schema<DisassociateConnectionAliasRequest>;
export interface DisassociateConnectionAliasResult {}
export const DisassociateConnectionAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateConnectionAliasResult",
}) as any as S.Schema<DisassociateConnectionAliasResult>;
export interface DisassociateIpGroupsRequest {
  DirectoryId: string;
  GroupIds: string[];
}
export const DisassociateIpGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryId: S.String, GroupIds: IpGroupIdList }).pipe(
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
  identifier: "DisassociateIpGroupsRequest",
}) as any as S.Schema<DisassociateIpGroupsRequest>;
export interface DisassociateIpGroupsResult {}
export const DisassociateIpGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateIpGroupsResult",
}) as any as S.Schema<DisassociateIpGroupsResult>;
export interface DisassociateWorkspaceApplicationRequest {
  WorkspaceId: string;
  ApplicationId: string;
}
export const DisassociateWorkspaceApplicationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ WorkspaceId: S.String, ApplicationId: S.String }).pipe(
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
  identifier: "DisassociateWorkspaceApplicationRequest",
}) as any as S.Schema<DisassociateWorkspaceApplicationRequest>;
export interface DisassociateWorkspaceApplicationResult {
  Association?: WorkspaceResourceAssociation;
}
export const DisassociateWorkspaceApplicationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Association: S.optional(WorkspaceResourceAssociation) }).pipe(
      ns,
    ),
).annotate({
  identifier: "DisassociateWorkspaceApplicationResult",
}) as any as S.Schema<DisassociateWorkspaceApplicationResult>;
export interface GetAccountLinkRequest {
  LinkId?: string;
  LinkedAccountId?: string;
}
export const GetAccountLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkId: S.optional(S.String),
    LinkedAccountId: S.optional(S.String),
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
  identifier: "GetAccountLinkRequest",
}) as any as S.Schema<GetAccountLinkRequest>;
export interface GetAccountLinkResult {
  AccountLink?: AccountLink;
}
export const GetAccountLinkResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "GetAccountLinkResult",
}) as any as S.Schema<GetAccountLinkResult>;
export type DefaultLogo = Uint8Array;
export interface DefaultImportClientBrandingAttributes {
  Logo?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const DefaultImportClientBrandingAttributes = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Logo: S.optional(T.Blob),
      SupportEmail: S.optional(S.String),
      SupportLink: S.optional(S.String),
      ForgotPasswordLink: S.optional(S.String),
      LoginMessage: S.optional(LoginMessage),
    }),
).annotate({
  identifier: "DefaultImportClientBrandingAttributes",
}) as any as S.Schema<DefaultImportClientBrandingAttributes>;
export type IosLogo = Uint8Array;
export type Ios2XLogo = Uint8Array;
export type Ios3XLogo = Uint8Array;
export interface IosImportClientBrandingAttributes {
  Logo?: Uint8Array;
  Logo2x?: Uint8Array;
  Logo3x?: Uint8Array;
  SupportEmail?: string;
  SupportLink?: string;
  ForgotPasswordLink?: string;
  LoginMessage?: { [key: string]: string | undefined };
}
export const IosImportClientBrandingAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Logo: S.optional(T.Blob),
    Logo2x: S.optional(T.Blob),
    Logo3x: S.optional(T.Blob),
    SupportEmail: S.optional(S.String),
    SupportLink: S.optional(S.String),
    ForgotPasswordLink: S.optional(S.String),
    LoginMessage: S.optional(LoginMessage),
  }),
).annotate({
  identifier: "IosImportClientBrandingAttributes",
}) as any as S.Schema<IosImportClientBrandingAttributes>;
export interface ImportClientBrandingRequest {
  ResourceId: string;
  DeviceTypeWindows?: DefaultImportClientBrandingAttributes;
  DeviceTypeOsx?: DefaultImportClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultImportClientBrandingAttributes;
  DeviceTypeIos?: IosImportClientBrandingAttributes;
  DeviceTypeLinux?: DefaultImportClientBrandingAttributes;
  DeviceTypeWeb?: DefaultImportClientBrandingAttributes;
}
export const ImportClientBrandingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    DeviceTypeWindows: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosImportClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultImportClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultImportClientBrandingAttributes),
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
  identifier: "ImportClientBrandingRequest",
}) as any as S.Schema<ImportClientBrandingRequest>;
export interface ImportClientBrandingResult {
  DeviceTypeWindows?: DefaultClientBrandingAttributes;
  DeviceTypeOsx?: DefaultClientBrandingAttributes;
  DeviceTypeAndroid?: DefaultClientBrandingAttributes;
  DeviceTypeIos?: IosClientBrandingAttributes;
  DeviceTypeLinux?: DefaultClientBrandingAttributes;
  DeviceTypeWeb?: DefaultClientBrandingAttributes;
}
export const ImportClientBrandingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceTypeWindows: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeOsx: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeAndroid: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeIos: S.optional(IosClientBrandingAttributes),
    DeviceTypeLinux: S.optional(DefaultClientBrandingAttributes),
    DeviceTypeWeb: S.optional(DefaultClientBrandingAttributes),
  }).pipe(ns),
).annotate({
  identifier: "ImportClientBrandingResult",
}) as any as S.Schema<ImportClientBrandingResult>;
export type ImageComputeType =
  | "BASE"
  | "GRAPHICS_G4DN"
  | "GRAPHICS_G6"
  | (string & {});
export const ImageComputeType = S.String;

export type CustomImageProtocol = "PCOIP" | "DCV" | "BYOP" | (string & {});
export const CustomImageProtocol = S.String;

export type Platform = "WINDOWS" | (string & {});
export const Platform = S.String;

export type OSVersion = "Windows_10" | "Windows_11" | (string & {});
export const OSVersion = S.String;

export interface ImportCustomWorkspaceImageRequest {
  ImageName: string;
  ImageDescription: string;
  ComputeType: ImageComputeType;
  Protocol: CustomImageProtocol;
  ImageSource: ImageSourceIdentifier;
  InfrastructureConfigurationArn: string;
  Platform: Platform;
  OsVersion: OSVersion;
  Tags?: Tag[];
}
export const ImportCustomWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageName: S.String,
    ImageDescription: S.String,
    ComputeType: ImageComputeType,
    Protocol: CustomImageProtocol,
    ImageSource: ImageSourceIdentifier,
    InfrastructureConfigurationArn: S.String,
    Platform: Platform,
    OsVersion: OSVersion,
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
  identifier: "ImportCustomWorkspaceImageRequest",
}) as any as S.Schema<ImportCustomWorkspaceImageRequest>;
export interface ImportCustomWorkspaceImageResult {
  ImageId?: string;
  State?: CustomWorkspaceImageImportState;
}
export const ImportCustomWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageId: S.optional(S.String),
    State: S.optional(CustomWorkspaceImageImportState),
  }).pipe(ns),
).annotate({
  identifier: "ImportCustomWorkspaceImageResult",
}) as any as S.Schema<ImportCustomWorkspaceImageResult>;
export type WorkspaceImageIngestionProcess =
  | "BYOL_REGULAR"
  | "BYOL_GRAPHICS"
  | "BYOL_GRAPHICSPRO"
  | "BYOL_GRAPHICS_G4DN"
  | "BYOL_REGULAR_WSP"
  | "BYOL_GRAPHICS_G4DN_WSP"
  | "BYOL_REGULAR_BYOP"
  | "BYOL_GRAPHICS_G4DN_BYOP"
  | (string & {});
export const WorkspaceImageIngestionProcess = S.String;

export type Application =
  | "Microsoft_Office_2016"
  | "Microsoft_Office_2019"
  | (string & {});
export const Application = S.String;

export type ApplicationList = Application[];
export const ApplicationList = /*@__PURE__*/ S.Array(Application);
export interface ImportWorkspaceImageRequest {
  Ec2ImageId: string;
  IngestionProcess: WorkspaceImageIngestionProcess;
  ImageName: string;
  ImageDescription: string;
  Tags?: Tag[];
  Applications?: Application[];
}
export const ImportWorkspaceImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ec2ImageId: S.String,
    IngestionProcess: WorkspaceImageIngestionProcess,
    ImageName: S.String,
    ImageDescription: S.String,
    Tags: S.optional(TagList),
    Applications: S.optional(ApplicationList),
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
  identifier: "ImportWorkspaceImageRequest",
}) as any as S.Schema<ImportWorkspaceImageRequest>;
export interface ImportWorkspaceImageResult {
  ImageId?: string;
}
export const ImportWorkspaceImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ImportWorkspaceImageResult",
}) as any as S.Schema<ImportWorkspaceImageResult>;
export type LinkStatusFilterList = AccountLinkStatusEnum[];
export const LinkStatusFilterList = /*@__PURE__*/ S.Array(
  AccountLinkStatusEnum,
);
export interface ListAccountLinksRequest {
  LinkStatusFilter?: AccountLinkStatusEnum[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountLinksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkStatusFilter: S.optional(LinkStatusFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListAccountLinksRequest",
}) as any as S.Schema<ListAccountLinksRequest>;
export type AccountLinkList = AccountLink[];
export const AccountLinkList = /*@__PURE__*/ S.Array(AccountLink);
export interface ListAccountLinksResult {
  AccountLinks?: AccountLink[];
  NextToken?: string;
}
export const ListAccountLinksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountLinks: S.optional(AccountLinkList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccountLinksResult",
}) as any as S.Schema<ListAccountLinksResult>;
export type ManagementCidrRangeConstraint = string;
export type ManagementCidrRangeMaxResults = number;
export interface ListAvailableManagementCidrRangesRequest {
  ManagementCidrRangeConstraint: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAvailableManagementCidrRangesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManagementCidrRangeConstraint: S.String,
      MaxResults: S.optional(S.Number),
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
  identifier: "ListAvailableManagementCidrRangesRequest",
}) as any as S.Schema<ListAvailableManagementCidrRangesRequest>;
export type DedicatedTenancyCidrRangeList = string[];
export const DedicatedTenancyCidrRangeList = /*@__PURE__*/ S.Array(S.String);
export interface ListAvailableManagementCidrRangesResult {
  ManagementCidrRanges?: string[];
  NextToken?: string;
}
export const ListAvailableManagementCidrRangesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManagementCidrRanges: S.optional(DedicatedTenancyCidrRangeList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAvailableManagementCidrRangesResult",
}) as any as S.Schema<ListAvailableManagementCidrRangesResult>;
export interface MigrateWorkspaceRequest {
  SourceWorkspaceId: string;
  BundleId: string;
}
export const MigrateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceWorkspaceId: S.String, BundleId: S.String }).pipe(
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
  identifier: "MigrateWorkspaceRequest",
}) as any as S.Schema<MigrateWorkspaceRequest>;
export interface MigrateWorkspaceResult {
  SourceWorkspaceId?: string;
  TargetWorkspaceId?: string;
}
export const MigrateWorkspaceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceWorkspaceId: S.optional(S.String),
    TargetWorkspaceId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MigrateWorkspaceResult",
}) as any as S.Schema<MigrateWorkspaceResult>;
export type DedicatedTenancySupportEnum = "ENABLED" | (string & {});
export const DedicatedTenancySupportEnum = S.String;

export interface ModifyAccountRequest {
  DedicatedTenancySupport?: DedicatedTenancySupportEnum;
  DedicatedTenancyManagementCidrRange?: string;
}
export const ModifyAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedTenancySupport: S.optional(DedicatedTenancySupportEnum),
    DedicatedTenancyManagementCidrRange: S.optional(S.String),
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
  identifier: "ModifyAccountRequest",
}) as any as S.Schema<ModifyAccountRequest>;
export interface ModifyAccountResult {
  Message?: string;
}
export const ModifyAccountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ModifyAccountResult",
}) as any as S.Schema<ModifyAccountResult>;
export type DeletableCertificateBasedAuthProperty =
  | "CERTIFICATE_BASED_AUTH_PROPERTIES_CERTIFICATE_AUTHORITY_ARN"
  | (string & {});
export const DeletableCertificateBasedAuthProperty = S.String;

export type DeletableCertificateBasedAuthPropertiesList =
  DeletableCertificateBasedAuthProperty[];
export const DeletableCertificateBasedAuthPropertiesList =
  /*@__PURE__*/ S.Array(DeletableCertificateBasedAuthProperty);
export interface ModifyCertificateBasedAuthPropertiesRequest {
  ResourceId: string;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
  PropertiesToDelete?: DeletableCertificateBasedAuthProperty[];
}
export const ModifyCertificateBasedAuthPropertiesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceId: S.String,
      CertificateBasedAuthProperties: S.optional(
        CertificateBasedAuthProperties,
      ),
      PropertiesToDelete: S.optional(
        DeletableCertificateBasedAuthPropertiesList,
      ),
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
    identifier: "ModifyCertificateBasedAuthPropertiesRequest",
  }) as any as S.Schema<ModifyCertificateBasedAuthPropertiesRequest>;
export interface ModifyCertificateBasedAuthPropertiesResult {}
export const ModifyCertificateBasedAuthPropertiesResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "ModifyCertificateBasedAuthPropertiesResult",
  }) as any as S.Schema<ModifyCertificateBasedAuthPropertiesResult>;
export interface ModifyClientPropertiesRequest {
  ResourceId: string;
  ClientProperties: ClientProperties;
}
export const ModifyClientPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, ClientProperties: ClientProperties }).pipe(
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
  identifier: "ModifyClientPropertiesRequest",
}) as any as S.Schema<ModifyClientPropertiesRequest>;
export interface ModifyClientPropertiesResult {}
export const ModifyClientPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyClientPropertiesResult",
}) as any as S.Schema<ModifyClientPropertiesResult>;
export interface ModifyEndpointEncryptionModeRequest {
  DirectoryId: string;
  EndpointEncryptionMode: EndpointEncryptionMode;
}
export const ModifyEndpointEncryptionModeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.String,
    EndpointEncryptionMode: EndpointEncryptionMode,
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
  identifier: "ModifyEndpointEncryptionModeRequest",
}) as any as S.Schema<ModifyEndpointEncryptionModeRequest>;
export interface ModifyEndpointEncryptionModeResponse {}
export const ModifyEndpointEncryptionModeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyEndpointEncryptionModeResponse",
}) as any as S.Schema<ModifyEndpointEncryptionModeResponse>;
export type DeletableSamlProperty =
  | "SAML_PROPERTIES_USER_ACCESS_URL"
  | "SAML_PROPERTIES_RELAY_STATE_PARAMETER_NAME"
  | (string & {});
export const DeletableSamlProperty = S.String;

export type DeletableSamlPropertiesList = DeletableSamlProperty[];
export const DeletableSamlPropertiesList = /*@__PURE__*/ S.Array(
  DeletableSamlProperty,
);
export interface ModifySamlPropertiesRequest {
  ResourceId: string;
  SamlProperties?: SamlProperties;
  PropertiesToDelete?: DeletableSamlProperty[];
}
export const ModifySamlPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    SamlProperties: S.optional(SamlProperties),
    PropertiesToDelete: S.optional(DeletableSamlPropertiesList),
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
  identifier: "ModifySamlPropertiesRequest",
}) as any as S.Schema<ModifySamlPropertiesRequest>;
export interface ModifySamlPropertiesResult {}
export const ModifySamlPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifySamlPropertiesResult",
}) as any as S.Schema<ModifySamlPropertiesResult>;
export interface ModifySelfservicePermissionsRequest {
  ResourceId: string;
  SelfservicePermissions: SelfservicePermissions;
}
export const ModifySelfservicePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    SelfservicePermissions: SelfservicePermissions,
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
  identifier: "ModifySelfservicePermissionsRequest",
}) as any as S.Schema<ModifySelfservicePermissionsRequest>;
export interface ModifySelfservicePermissionsResult {}
export const ModifySelfservicePermissionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifySelfservicePermissionsResult",
}) as any as S.Schema<ModifySelfservicePermissionsResult>;
export interface ModifyStreamingPropertiesRequest {
  ResourceId: string;
  StreamingProperties?: StreamingProperties;
}
export const ModifyStreamingPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    StreamingProperties: S.optional(StreamingProperties),
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
  identifier: "ModifyStreamingPropertiesRequest",
}) as any as S.Schema<ModifyStreamingPropertiesRequest>;
export interface ModifyStreamingPropertiesResult {}
export const ModifyStreamingPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyStreamingPropertiesResult",
}) as any as S.Schema<ModifyStreamingPropertiesResult>;
export interface ModifyWorkspaceAccessPropertiesRequest {
  ResourceId: string;
  WorkspaceAccessProperties: WorkspaceAccessProperties;
}
export const ModifyWorkspaceAccessPropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceId: S.String,
      WorkspaceAccessProperties: WorkspaceAccessProperties,
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
  identifier: "ModifyWorkspaceAccessPropertiesRequest",
}) as any as S.Schema<ModifyWorkspaceAccessPropertiesRequest>;
export interface ModifyWorkspaceAccessPropertiesResult {}
export const ModifyWorkspaceAccessPropertiesResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceAccessPropertiesResult",
}) as any as S.Schema<ModifyWorkspaceAccessPropertiesResult>;
export interface WorkspaceCreationProperties {
  EnableInternetAccess?: boolean;
  DefaultOu?: string;
  CustomSecurityGroupId?: string;
  UserEnabledAsLocalAdministrator?: boolean;
  EnableMaintenanceMode?: boolean;
  InstanceIamRoleArn?: string;
}
export const WorkspaceCreationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableInternetAccess: S.optional(S.Boolean),
    DefaultOu: S.optional(S.String),
    CustomSecurityGroupId: S.optional(S.String),
    UserEnabledAsLocalAdministrator: S.optional(S.Boolean),
    EnableMaintenanceMode: S.optional(S.Boolean),
    InstanceIamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceCreationProperties",
}) as any as S.Schema<WorkspaceCreationProperties>;
export interface ModifyWorkspaceCreationPropertiesRequest {
  ResourceId: string;
  WorkspaceCreationProperties: WorkspaceCreationProperties;
}
export const ModifyWorkspaceCreationPropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceId: S.String,
      WorkspaceCreationProperties: WorkspaceCreationProperties,
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
  identifier: "ModifyWorkspaceCreationPropertiesRequest",
}) as any as S.Schema<ModifyWorkspaceCreationPropertiesRequest>;
export interface ModifyWorkspaceCreationPropertiesResult {}
export const ModifyWorkspaceCreationPropertiesResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceCreationPropertiesResult",
}) as any as S.Schema<ModifyWorkspaceCreationPropertiesResult>;
export interface ModifyWorkspacePropertiesRequest {
  WorkspaceId: string;
  WorkspaceProperties?: WorkspaceProperties;
  DataReplication?: DataReplication;
}
export const ModifyWorkspacePropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.String,
    WorkspaceProperties: S.optional(WorkspaceProperties),
    DataReplication: S.optional(DataReplication),
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
  identifier: "ModifyWorkspacePropertiesRequest",
}) as any as S.Schema<ModifyWorkspacePropertiesRequest>;
export interface ModifyWorkspacePropertiesResult {}
export const ModifyWorkspacePropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspacePropertiesResult",
}) as any as S.Schema<ModifyWorkspacePropertiesResult>;
export type TargetWorkspaceState =
  | "AVAILABLE"
  | "ADMIN_MAINTENANCE"
  | (string & {});
export const TargetWorkspaceState = S.String;

export interface ModifyWorkspaceStateRequest {
  WorkspaceId: string;
  WorkspaceState: TargetWorkspaceState;
}
export const ModifyWorkspaceStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.String,
    WorkspaceState: TargetWorkspaceState,
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
  identifier: "ModifyWorkspaceStateRequest",
}) as any as S.Schema<ModifyWorkspaceStateRequest>;
export interface ModifyWorkspaceStateResult {}
export const ModifyWorkspaceStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyWorkspaceStateResult",
}) as any as S.Schema<ModifyWorkspaceStateResult>;
export interface RebootRequest {
  WorkspaceId: string;
}
export const RebootRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({ identifier: "RebootRequest" }) as any as S.Schema<RebootRequest>;
export type RebootWorkspaceRequests = RebootRequest[];
export const RebootWorkspaceRequests = /*@__PURE__*/ S.Array(RebootRequest);
export interface RebootWorkspacesRequest {
  RebootWorkspaceRequests: RebootRequest[];
}
export const RebootWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RebootWorkspaceRequests: RebootWorkspaceRequests }).pipe(
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
  identifier: "RebootWorkspacesRequest",
}) as any as S.Schema<RebootWorkspacesRequest>;
export interface FailedWorkspaceChangeRequest {
  WorkspaceId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const FailedWorkspaceChangeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkspaceId: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedWorkspaceChangeRequest",
}) as any as S.Schema<FailedWorkspaceChangeRequest>;
export type FailedRebootWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedRebootWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedWorkspaceChangeRequest,
);
export interface RebootWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const RebootWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedRebootWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "RebootWorkspacesResult",
}) as any as S.Schema<RebootWorkspacesResult>;
export interface RebuildRequest {
  WorkspaceId: string;
}
export const RebuildRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({ identifier: "RebuildRequest" }) as any as S.Schema<RebuildRequest>;
export type RebuildWorkspaceRequests = RebuildRequest[];
export const RebuildWorkspaceRequests = /*@__PURE__*/ S.Array(RebuildRequest);
export interface RebuildWorkspacesRequest {
  RebuildWorkspaceRequests: RebuildRequest[];
}
export const RebuildWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RebuildWorkspaceRequests: RebuildWorkspaceRequests }).pipe(
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
  identifier: "RebuildWorkspacesRequest",
}) as any as S.Schema<RebuildWorkspacesRequest>;
export type FailedRebuildWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedRebuildWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedWorkspaceChangeRequest,
);
export interface RebuildWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const RebuildWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedRebuildWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "RebuildWorkspacesResult",
}) as any as S.Schema<RebuildWorkspacesResult>;
export interface RegisterWorkspaceDirectoryRequest {
  DirectoryId?: string;
  SubnetIds?: string[];
  EnableSelfService?: boolean;
  Tenancy?: Tenancy;
  Tags?: Tag[];
  WorkspaceDirectoryName?: string;
  WorkspaceDirectoryDescription?: string;
  UserIdentityType?: UserIdentityType;
  IdcInstanceArn?: string;
  MicrosoftEntraConfig?: MicrosoftEntraConfig;
  WorkspaceType?: WorkspaceType;
  ActiveDirectoryConfig?: ActiveDirectoryConfig;
}
export const RegisterWorkspaceDirectoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIds),
    EnableSelfService: S.optional(S.Boolean),
    Tenancy: S.optional(Tenancy),
    Tags: S.optional(TagList),
    WorkspaceDirectoryName: S.optional(S.String),
    WorkspaceDirectoryDescription: S.optional(S.String),
    UserIdentityType: S.optional(UserIdentityType),
    IdcInstanceArn: S.optional(S.String),
    MicrosoftEntraConfig: S.optional(MicrosoftEntraConfig),
    WorkspaceType: S.optional(WorkspaceType),
    ActiveDirectoryConfig: S.optional(ActiveDirectoryConfig),
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
  identifier: "RegisterWorkspaceDirectoryRequest",
}) as any as S.Schema<RegisterWorkspaceDirectoryRequest>;
export interface RegisterWorkspaceDirectoryResult {
  DirectoryId?: string;
  State?: WorkspaceDirectoryState;
}
export const RegisterWorkspaceDirectoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    State: S.optional(WorkspaceDirectoryState),
  }).pipe(ns),
).annotate({
  identifier: "RegisterWorkspaceDirectoryResult",
}) as any as S.Schema<RegisterWorkspaceDirectoryResult>;
export interface RejectAccountLinkInvitationRequest {
  LinkId: string;
  ClientToken?: string;
}
export const RejectAccountLinkInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LinkId: S.String, ClientToken: S.optional(S.String) }).pipe(
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
  identifier: "RejectAccountLinkInvitationRequest",
}) as any as S.Schema<RejectAccountLinkInvitationRequest>;
export interface RejectAccountLinkInvitationResult {
  AccountLink?: AccountLink;
}
export const RejectAccountLinkInvitationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountLink: S.optional(AccountLink) }).pipe(ns),
).annotate({
  identifier: "RejectAccountLinkInvitationResult",
}) as any as S.Schema<RejectAccountLinkInvitationResult>;
export interface RestoreWorkspaceRequest {
  WorkspaceId: string;
}
export const RestoreWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }).pipe(
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
  identifier: "RestoreWorkspaceRequest",
}) as any as S.Schema<RestoreWorkspaceRequest>;
export interface RestoreWorkspaceResult {}
export const RestoreWorkspaceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RestoreWorkspaceResult",
}) as any as S.Schema<RestoreWorkspaceResult>;
export type IpRevokedRuleList = string[];
export const IpRevokedRuleList = /*@__PURE__*/ S.Array(S.String);
export interface RevokeIpRulesRequest {
  GroupId: string;
  UserRules: string[];
}
export const RevokeIpRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRevokedRuleList }).pipe(
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
  identifier: "RevokeIpRulesRequest",
}) as any as S.Schema<RevokeIpRulesRequest>;
export interface RevokeIpRulesResult {}
export const RevokeIpRulesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RevokeIpRulesResult",
}) as any as S.Schema<RevokeIpRulesResult>;
export interface StartRequest {
  WorkspaceId?: string;
}
export const StartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.optional(S.String) }),
).annotate({ identifier: "StartRequest" }) as any as S.Schema<StartRequest>;
export type StartWorkspaceRequests = StartRequest[];
export const StartWorkspaceRequests = /*@__PURE__*/ S.Array(StartRequest);
export interface StartWorkspacesRequest {
  StartWorkspaceRequests: StartRequest[];
}
export const StartWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StartWorkspaceRequests: StartWorkspaceRequests }).pipe(
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
  identifier: "StartWorkspacesRequest",
}) as any as S.Schema<StartWorkspacesRequest>;
export type FailedStartWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedStartWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedWorkspaceChangeRequest,
);
export interface StartWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const StartWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedStartWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StartWorkspacesResult",
}) as any as S.Schema<StartWorkspacesResult>;
export interface StartWorkspacesPoolRequest {
  PoolId: string;
}
export const StartWorkspacesPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
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
  identifier: "StartWorkspacesPoolRequest",
}) as any as S.Schema<StartWorkspacesPoolRequest>;
export interface StartWorkspacesPoolResult {}
export const StartWorkspacesPoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartWorkspacesPoolResult",
}) as any as S.Schema<StartWorkspacesPoolResult>;
export interface StopRequest {
  WorkspaceId?: string;
}
export const StopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.optional(S.String) }),
).annotate({ identifier: "StopRequest" }) as any as S.Schema<StopRequest>;
export type StopWorkspaceRequests = StopRequest[];
export const StopWorkspaceRequests = /*@__PURE__*/ S.Array(StopRequest);
export interface StopWorkspacesRequest {
  StopWorkspaceRequests: StopRequest[];
}
export const StopWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StopWorkspaceRequests: StopWorkspaceRequests }).pipe(
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
  identifier: "StopWorkspacesRequest",
}) as any as S.Schema<StopWorkspacesRequest>;
export type FailedStopWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedStopWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedWorkspaceChangeRequest,
);
export interface StopWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const StopWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedRequests: S.optional(FailedStopWorkspaceRequests) }).pipe(
    ns,
  ),
).annotate({
  identifier: "StopWorkspacesResult",
}) as any as S.Schema<StopWorkspacesResult>;
export interface StopWorkspacesPoolRequest {
  PoolId: string;
}
export const StopWorkspacesPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
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
  identifier: "StopWorkspacesPoolRequest",
}) as any as S.Schema<StopWorkspacesPoolRequest>;
export interface StopWorkspacesPoolResult {}
export const StopWorkspacesPoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopWorkspacesPoolResult",
}) as any as S.Schema<StopWorkspacesPoolResult>;
export interface TerminateRequest {
  WorkspaceId: string;
}
export const TerminateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspaceId: S.String }),
).annotate({
  identifier: "TerminateRequest",
}) as any as S.Schema<TerminateRequest>;
export type TerminateWorkspaceRequests = TerminateRequest[];
export const TerminateWorkspaceRequests =
  /*@__PURE__*/ S.Array(TerminateRequest);
export interface TerminateWorkspacesRequest {
  TerminateWorkspaceRequests: TerminateRequest[];
}
export const TerminateWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TerminateWorkspaceRequests: TerminateWorkspaceRequests }).pipe(
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
  identifier: "TerminateWorkspacesRequest",
}) as any as S.Schema<TerminateWorkspacesRequest>;
export type FailedTerminateWorkspaceRequests = FailedWorkspaceChangeRequest[];
export const FailedTerminateWorkspaceRequests = /*@__PURE__*/ S.Array(
  FailedWorkspaceChangeRequest,
);
export interface TerminateWorkspacesResult {
  FailedRequests?: FailedWorkspaceChangeRequest[];
}
export const TerminateWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailedRequests: S.optional(FailedTerminateWorkspaceRequests),
  }).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesResult",
}) as any as S.Schema<TerminateWorkspacesResult>;
export interface TerminateWorkspacesPoolRequest {
  PoolId: string;
}
export const TerminateWorkspacesPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
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
  identifier: "TerminateWorkspacesPoolRequest",
}) as any as S.Schema<TerminateWorkspacesPoolRequest>;
export interface TerminateWorkspacesPoolResult {}
export const TerminateWorkspacesPoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesPoolResult",
}) as any as S.Schema<TerminateWorkspacesPoolResult>;
export interface TerminateWorkspacesPoolSessionRequest {
  SessionId: string;
}
export const TerminateWorkspacesPoolSessionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SessionId: S.String }).pipe(
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
  identifier: "TerminateWorkspacesPoolSessionRequest",
}) as any as S.Schema<TerminateWorkspacesPoolSessionRequest>;
export interface TerminateWorkspacesPoolSessionResult {}
export const TerminateWorkspacesPoolSessionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "TerminateWorkspacesPoolSessionResult",
}) as any as S.Schema<TerminateWorkspacesPoolSessionResult>;
export interface UpdateConnectClientAddInRequest {
  AddInId: string;
  ResourceId: string;
  Name?: string;
  URL?: string;
}
export const UpdateConnectClientAddInRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddInId: S.String,
    ResourceId: S.String,
    Name: S.optional(S.String),
    URL: S.optional(S.String),
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
  identifier: "UpdateConnectClientAddInRequest",
}) as any as S.Schema<UpdateConnectClientAddInRequest>;
export interface UpdateConnectClientAddInResult {}
export const UpdateConnectClientAddInResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateConnectClientAddInResult",
}) as any as S.Schema<UpdateConnectClientAddInResult>;
export interface UpdateConnectionAliasPermissionRequest {
  AliasId: string;
  ConnectionAliasPermission: ConnectionAliasPermission;
}
export const UpdateConnectionAliasPermissionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AliasId: S.String,
      ConnectionAliasPermission: ConnectionAliasPermission,
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
  identifier: "UpdateConnectionAliasPermissionRequest",
}) as any as S.Schema<UpdateConnectionAliasPermissionRequest>;
export interface UpdateConnectionAliasPermissionResult {}
export const UpdateConnectionAliasPermissionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateConnectionAliasPermissionResult",
}) as any as S.Schema<UpdateConnectionAliasPermissionResult>;
export interface UpdateRulesOfIpGroupRequest {
  GroupId: string;
  UserRules: IpRuleItem[];
}
export const UpdateRulesOfIpGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, UserRules: IpRuleList }).pipe(
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
  identifier: "UpdateRulesOfIpGroupRequest",
}) as any as S.Schema<UpdateRulesOfIpGroupRequest>;
export interface UpdateRulesOfIpGroupResult {}
export const UpdateRulesOfIpGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRulesOfIpGroupResult",
}) as any as S.Schema<UpdateRulesOfIpGroupResult>;
export interface UpdateWorkspaceBundleRequest {
  BundleId?: string;
  ImageId?: string;
}
export const UpdateWorkspaceBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    ImageId: S.optional(S.String),
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
  identifier: "UpdateWorkspaceBundleRequest",
}) as any as S.Schema<UpdateWorkspaceBundleRequest>;
export interface UpdateWorkspaceBundleResult {}
export const UpdateWorkspaceBundleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateWorkspaceBundleResult",
}) as any as S.Schema<UpdateWorkspaceBundleResult>;
export interface UpdateWorkspaceImagePermissionRequest {
  ImageId: string;
  AllowCopyImage: boolean;
  SharedAccountId: string;
}
export const UpdateWorkspaceImagePermissionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ImageId: S.String,
      AllowCopyImage: S.Boolean,
      SharedAccountId: S.String,
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
  identifier: "UpdateWorkspaceImagePermissionRequest",
}) as any as S.Schema<UpdateWorkspaceImagePermissionRequest>;
export interface UpdateWorkspaceImagePermissionResult {}
export const UpdateWorkspaceImagePermissionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateWorkspaceImagePermissionResult",
}) as any as S.Schema<UpdateWorkspaceImagePermissionResult>;
export interface UpdateWorkspacesPoolRequest {
  PoolId: string;
  Description?: string;
  BundleId?: string;
  DirectoryId?: string;
  Capacity?: Capacity;
  ApplicationSettings?: ApplicationSettingsRequest;
  TimeoutSettings?: TimeoutSettings;
  RunningMode?: PoolsRunningMode;
}
export const UpdateWorkspacesPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    Description: S.optional(S.String),
    BundleId: S.optional(S.String),
    DirectoryId: S.optional(S.String),
    Capacity: S.optional(Capacity),
    ApplicationSettings: S.optional(ApplicationSettingsRequest),
    TimeoutSettings: S.optional(TimeoutSettings),
    RunningMode: S.optional(PoolsRunningMode),
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
  identifier: "UpdateWorkspacesPoolRequest",
}) as any as S.Schema<UpdateWorkspacesPoolRequest>;
export interface UpdateWorkspacesPoolResult {
  WorkspacesPool?: WorkspacesPool;
}
export const UpdateWorkspacesPoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkspacesPool: S.optional(WorkspacesPool) }).pipe(ns),
).annotate({
  identifier: "UpdateWorkspacesPoolResult",
}) as any as S.Schema<UpdateWorkspacesPoolResult>;
export type ExceptionMessage = string;
export type ExceptionErrorCode = string;
export type AcceptAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the account link invitation.
 *
 * There's currently no unlinking capability after you accept the account linking invitation.
 */
export const acceptAccountLinkInvitation: API.OperationMethod<
  AcceptAccountLinkInvitationRequest,
  AcceptAccountLinkInvitationResult,
  AcceptAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAccountLinkInvitationRequest,
  output: AcceptAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAccountLinkInvitation",
}));

export type AssociateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified connection alias with the specified directory to enable
 * cross-Region redirection. For more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 */
export const associateConnectionAlias: API.OperationMethod<
  AssociateConnectionAliasRequest,
  AssociateConnectionAliasResult,
  AssociateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateConnectionAliasRequest,
  output: AssociateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConnectionAlias",
}));

export type AssociateIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified IP access control group with the specified directory.
 */
export const associateIpGroups: API.OperationMethod<
  AssociateIpGroupsRequest,
  AssociateIpGroupsResult,
  AssociateIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateIpGroupsRequest,
  output: AssociateIpGroupsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateIpGroups",
}));

export type AssociateWorkspaceApplicationError =
  | AccessDeniedException
  | ApplicationNotSupportedException
  | ComputeNotCompatibleException
  | IncompatibleApplicationsException
  | InvalidParameterValuesException
  | OperatingSystemNotCompatibleException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified application to the specified WorkSpace.
 */
export const associateWorkspaceApplication: API.OperationMethod<
  AssociateWorkspaceApplicationRequest,
  AssociateWorkspaceApplicationResult,
  AssociateWorkspaceApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateWorkspaceApplicationRequest,
  output: AssociateWorkspaceApplicationResult,
  errors: [
    AccessDeniedException,
    ApplicationNotSupportedException,
    ComputeNotCompatibleException,
    IncompatibleApplicationsException,
    InvalidParameterValuesException,
    OperatingSystemNotCompatibleException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWorkspaceApplication",
}));

export type AuthorizeIpRulesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more rules to the specified IP access control group.
 *
 * This action gives users permission to access their WorkSpaces from the CIDR address
 * ranges specified in the rules.
 */
export const authorizeIpRules: API.OperationMethod<
  AuthorizeIpRulesRequest,
  AuthorizeIpRulesResult,
  AuthorizeIpRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeIpRulesRequest,
  output: AuthorizeIpRulesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeIpRules",
}));

export type CopyWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Copies the specified image from the specified Region to the current Region. For more
 * information about copying images, see Copy a Custom WorkSpaces
 * Image.
 *
 * In the China (Ningxia) Region, you can copy images only within the same Region.
 *
 * In Amazon Web Services GovCloud (US), to copy images to and from other Regions, contact Amazon Web Services Support.
 *
 * Before copying a shared image, be sure to verify that it has been shared from the
 * correct Amazon Web Services account. To determine if an image has been shared and to see
 * the ID of the Amazon Web Services account that owns an image, use the DescribeWorkSpaceImages and DescribeWorkspaceImagePermissions API operations.
 */
export const copyWorkspaceImage: API.OperationMethod<
  CopyWorkspaceImageRequest,
  CopyWorkspaceImageResult,
  CopyWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyWorkspaceImageRequest,
  output: CopyWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyWorkspaceImage",
}));

export type CreateAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates the account link invitation.
 */
export const createAccountLinkInvitation: API.OperationMethod<
  CreateAccountLinkInvitationRequest,
  CreateAccountLinkInvitationResult,
  CreateAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccountLinkInvitationRequest,
  output: CreateAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountLinkInvitation",
}));

export type CreateConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a client-add-in for Connect Customer within a directory. You can create only
 * one Connect Customer client add-in within a directory.
 *
 * This client add-in allows WorkSpaces users to seamlessly connect to Connect Customer.
 */
export const createConnectClientAddIn: API.OperationMethod<
  CreateConnectClientAddInRequest,
  CreateConnectClientAddInResult,
  CreateConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectClientAddInRequest,
  output: CreateConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectClientAddIn",
}));

export type CreateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates the specified connection alias for use with cross-Region redirection. For more
 * information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const createConnectionAlias: API.OperationMethod<
  CreateConnectionAliasRequest,
  CreateConnectionAliasResult,
  CreateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionAliasRequest,
  output: CreateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectionAlias",
}));

export type CreateIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceCreationFailedException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates an IP access control group.
 *
 * An IP access control group provides you with the ability to control the IP addresses
 * from which users are allowed to access their WorkSpaces. To specify the CIDR address
 * ranges, add rules to your IP access control group and then associate the group with your
 * directory. You can add rules when you create the group or at any time using AuthorizeIpRules.
 *
 * There is a default IP access control group associated with your directory. If you don't
 * associate an IP access control group with your directory, the default group is used. The
 * default group includes a default rule that allows users to access their WorkSpaces from
 * anywhere. You cannot modify the default IP access control group for your directory.
 */
export const createIpGroup: API.OperationMethod<
  CreateIpGroupRequest,
  CreateIpGroupResult,
  CreateIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIpGroupRequest,
  output: CreateIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceCreationFailedException,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIpGroup",
}));

export type CreateStandbyWorkspacesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a standby WorkSpace in a secondary Region.
 */
export const createStandbyWorkspaces: API.OperationMethod<
  CreateStandbyWorkspacesRequest,
  CreateStandbyWorkspacesResult,
  CreateStandbyWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStandbyWorkspacesRequest,
  output: CreateStandbyWorkspacesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStandbyWorkspaces",
}));

export type CreateTagsError =
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates the specified tags for the specified WorkSpaces resource.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResult,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResult,
  errors: [
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type CreateUpdatedWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new updated WorkSpace image based on the specified source image. The new
 * updated WorkSpace image has the latest drivers and other updates required by the
 * Amazon WorkSpaces components.
 *
 * To determine which WorkSpace images need to be updated with the latest Amazon WorkSpaces
 * requirements, use
 * DescribeWorkspaceImages.
 *
 * - Only Windows 10, Windows Server 2016, and Windows Server 2019 WorkSpace images
 * can be programmatically updated at this time.
 *
 * - Microsoft Windows updates and other application updates are not included in the
 * update process.
 *
 * - The source WorkSpace image is not deleted. You can delete the source image
 * after you've verified your new updated image and created a new bundle.
 */
export const createUpdatedWorkspaceImage: API.OperationMethod<
  CreateUpdatedWorkspaceImageRequest,
  CreateUpdatedWorkspaceImageResult,
  CreateUpdatedWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUpdatedWorkspaceImageRequest,
  output: CreateUpdatedWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpdatedWorkspaceImage",
}));

export type CreateWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Creates the specified WorkSpace bundle. For more information about creating WorkSpace bundles, see
 *
 * Create a Custom WorkSpaces Image and Bundle.
 */
export const createWorkspaceBundle: API.OperationMethod<
  CreateWorkspaceBundleRequest,
  CreateWorkspaceBundleResult,
  CreateWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceBundleRequest,
  output: CreateWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaceBundle",
}));

export type CreateWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new WorkSpace image from an existing WorkSpace.
 */
export const createWorkspaceImage: API.OperationMethod<
  CreateWorkspaceImageRequest,
  CreateWorkspaceImageResult,
  CreateWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceImageRequest,
  output: CreateWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaceImage",
}));

export type CreateWorkspacesError =
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates one or more WorkSpaces.
 *
 * This operation is asynchronous and returns before the WorkSpaces are created.
 *
 * - The `MANUAL` running mode value is only supported by Amazon WorkSpaces
 * Core. Contact your account team to be allow-listed to use this value. For more
 * information, see Amazon WorkSpaces
 * Core.
 *
 * - You don't need to specify the `PCOIP` protocol for Linux bundles
 * because `DCV` (formerly WSP) is the default protocol for those bundles.
 *
 * - User-decoupled WorkSpaces are only supported by Amazon WorkSpaces
 * Core.
 *
 * - Review your running mode to ensure you are using one that is optimal for your needs and budget.
 * For more information on switching running modes, see
 *
 * Can I switch between hourly and monthly billing?
 */
export const createWorkspaces: API.OperationMethod<
  CreateWorkspacesRequest,
  CreateWorkspacesResult,
  CreateWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspacesRequest,
  output: CreateWorkspacesResult,
  errors: [InvalidParameterValuesException, ResourceLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaces",
}));

export type CreateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Creates a pool of WorkSpaces.
 */
export const createWorkspacesPool: API.OperationMethod<
  CreateWorkspacesPoolRequest,
  CreateWorkspacesPoolResult,
  CreateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspacesPoolRequest,
  output: CreateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspacesPool",
}));

export type DeleteAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the account link invitation.
 */
export const deleteAccountLinkInvitation: API.OperationMethod<
  DeleteAccountLinkInvitationRequest,
  DeleteAccountLinkInvitationResult,
  DeleteAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountLinkInvitationRequest,
  output: DeleteAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountLinkInvitation",
}));

export type DeleteClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes customized client branding. Client branding allows you to customize your
 * WorkSpace's client login portal. You can tailor your login portal company logo, the support
 * email address, support link, link to reset password, and a custom message for users trying
 * to sign in.
 *
 * After you delete your customized client branding, your login portal reverts to the
 * default client branding.
 */
export const deleteClientBranding: API.OperationMethod<
  DeleteClientBrandingRequest,
  DeleteClientBrandingResult,
  DeleteClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClientBrandingRequest,
  output: DeleteClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClientBranding",
}));

export type DeleteConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a client-add-in for Connect Customer that is configured within a
 * directory.
 */
export const deleteConnectClientAddIn: API.OperationMethod<
  DeleteConnectClientAddInRequest,
  DeleteConnectClientAddInResult,
  DeleteConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectClientAddInRequest,
  output: DeleteConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectClientAddIn",
}));

export type DeleteConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified connection alias. For more information, see
 * Cross-Region Redirection for Amazon WorkSpaces.
 *
 * If you will no longer be using a fully qualified domain name
 * (FQDN) as the registration code for your WorkSpaces users, you must take certain
 * precautions to prevent potential security issues. For more information,
 * see Security Considerations if You Stop Using Cross-Region Redirection.
 *
 * To delete a connection alias that has been shared, the shared account must first
 * disassociate the connection alias from any directories it has been associated with. Then
 * you must unshare the connection alias from the account it has been shared with. You can
 * delete a connection alias only after it is no longer shared with any accounts or
 * associated with any directories.
 */
export const deleteConnectionAlias: API.OperationMethod<
  DeleteConnectionAliasRequest,
  DeleteConnectionAliasResult,
  DeleteConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionAliasRequest,
  output: DeleteConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionAlias",
}));

export type DeleteIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified IP access control group.
 *
 * You cannot delete an IP access control group that is associated with a directory.
 */
export const deleteIpGroup: API.OperationMethod<
  DeleteIpGroupRequest,
  DeleteIpGroupResult,
  DeleteIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIpGroupRequest,
  output: DeleteIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIpGroup",
}));

export type DeleteTagsError =
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags from the specified WorkSpaces resource.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResult,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResult,
  errors: [InvalidParameterValuesException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DeleteWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceAssociatedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified WorkSpace bundle. For more information about deleting WorkSpace bundles, see
 *
 * Delete a Custom WorkSpaces Bundle or Image.
 */
export const deleteWorkspaceBundle: API.OperationMethod<
  DeleteWorkspaceBundleRequest,
  DeleteWorkspaceBundleResult,
  DeleteWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceBundleRequest,
  output: DeleteWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceAssociatedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceBundle",
}));

export type DeleteWorkspaceImageError =
  | AccessDeniedException
  | InvalidResourceStateException
  | ResourceAssociatedException
  | CommonErrors;
/**
 * Deletes the specified image from your account. To delete an image, you must first delete
 * any bundles that are associated with the image and unshare the image if it is shared with
 * other accounts.
 */
export const deleteWorkspaceImage: API.OperationMethod<
  DeleteWorkspaceImageRequest,
  DeleteWorkspaceImageResult,
  DeleteWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceImageRequest,
  output: DeleteWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidResourceStateException,
    ResourceAssociatedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspaceImage",
}));

export type DeployWorkspaceApplicationsError =
  | AccessDeniedException
  | IncompatibleApplicationsException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deploys associated applications to the specified WorkSpace
 */
export const deployWorkspaceApplications: API.OperationMethod<
  DeployWorkspaceApplicationsRequest,
  DeployWorkspaceApplicationsResult,
  DeployWorkspaceApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeployWorkspaceApplicationsRequest,
  output: DeployWorkspaceApplicationsResult,
  errors: [
    AccessDeniedException,
    IncompatibleApplicationsException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeployWorkspaceApplications",
}));

export type DeregisterWorkspaceDirectoryError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deregisters the specified directory. This operation is asynchronous and returns before
 * the WorkSpace directory is deregistered. If any WorkSpaces are registered to this
 * directory, you must remove them before you can deregister the directory.
 *
 * Simple AD and AD Connector are made available to you free of charge to use with
 * WorkSpaces. If there are no WorkSpaces being used with your Simple AD or AD Connector
 * directory for 30 consecutive days, this directory will be automatically deregistered for
 * use with Amazon WorkSpaces, and you will be charged for this directory as per the Directory Service pricing
 * terms.
 *
 * To delete empty directories, see Delete the
 * Directory for Your WorkSpaces. If you delete your Simple AD or AD Connector
 * directory, you can always create a new one when you want to start using WorkSpaces
 * again.
 */
export const deregisterWorkspaceDirectory: API.OperationMethod<
  DeregisterWorkspaceDirectoryRequest,
  DeregisterWorkspaceDirectoryResult,
  DeregisterWorkspaceDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterWorkspaceDirectoryRequest,
  output: DeregisterWorkspaceDirectoryResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWorkspaceDirectory",
}));

export type DescribeAccountError = AccessDeniedException | CommonErrors;
/**
 * Retrieves a list that describes the configuration of Bring Your Own License (BYOL) for
 * the specified account.
 */
export const describeAccount: API.OperationMethod<
  DescribeAccountRequest,
  DescribeAccountResult,
  DescribeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountRequest,
  output: DescribeAccountResult,
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccount",
}));

export type DescribeAccountModificationsError =
  | AccessDeniedException
  | CommonErrors;
/**
 * Retrieves a list that describes modifications to the configuration of Bring Your Own
 * License (BYOL) for the specified account.
 */
export const describeAccountModifications: API.OperationMethod<
  DescribeAccountModificationsRequest,
  DescribeAccountModificationsResult,
  DescribeAccountModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountModificationsRequest,
  output: DescribeAccountModificationsResult,
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountModifications",
}));

export type DescribeApplicationAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the application and the specified associated resources.
 */
export const describeApplicationAssociations: API.PaginatedOperationMethod<
  DescribeApplicationAssociationsRequest,
  DescribeApplicationAssociationsResult,
  DescribeApplicationAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeApplicationAssociationsRequest,
  output: DescribeApplicationAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeApplicationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified applications by filtering based on their compute types, license availability, operating systems, and owners.
 */
export const describeApplications: API.PaginatedOperationMethod<
  DescribeApplicationsRequest,
  DescribeApplicationsResult,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeApplicationsRequest,
  output: DescribeApplicationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBundleAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the applications and the specified bundle.
 */
export const describeBundleAssociations: API.OperationMethod<
  DescribeBundleAssociationsRequest,
  DescribeBundleAssociationsResult,
  DescribeBundleAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBundleAssociationsRequest,
  output: DescribeBundleAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBundleAssociations",
}));

export type DescribeClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified client branding. Client branding allows you to customize the log
 * in page of various device types for your users. You can add your company logo, the support
 * email address, support link, link to reset password, and a custom message for users trying
 * to sign in.
 *
 * Only device types that have branding information configured will be shown in the
 * response.
 */
export const describeClientBranding: API.OperationMethod<
  DescribeClientBrandingRequest,
  DescribeClientBrandingResult,
  DescribeClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClientBrandingRequest,
  output: DescribeClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClientBranding",
}));

export type DescribeClientPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified Amazon WorkSpaces clients.
 */
export const describeClientProperties: API.OperationMethod<
  DescribeClientPropertiesRequest,
  DescribeClientPropertiesResult,
  DescribeClientPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClientPropertiesRequest,
  output: DescribeClientPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClientProperties",
}));

export type DescribeConnectClientAddInsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of Connect Customer client add-ins that have been created.
 */
export const describeConnectClientAddIns: API.OperationMethod<
  DescribeConnectClientAddInsRequest,
  DescribeConnectClientAddInsResult,
  DescribeConnectClientAddInsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectClientAddInsRequest,
  output: DescribeConnectClientAddInsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectClientAddIns",
}));

export type DescribeConnectionAliasesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Retrieves a list that describes the connection aliases used for cross-Region
 * redirection. For more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliases: API.OperationMethod<
  DescribeConnectionAliasesRequest,
  DescribeConnectionAliasesResult,
  DescribeConnectionAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionAliasesRequest,
  output: DescribeConnectionAliasesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionAliases",
}));

export type DescribeConnectionAliasPermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the permissions that the owner of a connection alias has granted to another
 * Amazon Web Services account for the specified connection alias. For more information, see
 * Cross-Region
 * Redirection for Amazon WorkSpaces.
 */
export const describeConnectionAliasPermissions: API.OperationMethod<
  DescribeConnectionAliasPermissionsRequest,
  DescribeConnectionAliasPermissionsResult,
  DescribeConnectionAliasPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionAliasPermissionsRequest,
  output: DescribeConnectionAliasPermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionAliasPermissions",
}));

export type DescribeCustomWorkspaceImageImportError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a WorkSpace BYOL image being imported via ImportCustomWorkspaceImage.
 */
export const describeCustomWorkspaceImageImport: API.OperationMethod<
  DescribeCustomWorkspaceImageImportRequest,
  DescribeCustomWorkspaceImageImportResult,
  DescribeCustomWorkspaceImageImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomWorkspaceImageImportRequest,
  output: DescribeCustomWorkspaceImageImportResult,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomWorkspaceImageImport",
}));

export type DescribeImageAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations between the applications and the specified image.
 */
export const describeImageAssociations: API.OperationMethod<
  DescribeImageAssociationsRequest,
  DescribeImageAssociationsResult,
  DescribeImageAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeImageAssociationsRequest,
  output: DescribeImageAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageAssociations",
}));

export type DescribeIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes one or more of your IP access control groups.
 */
export const describeIpGroups: API.OperationMethod<
  DescribeIpGroupsRequest,
  DescribeIpGroupsResult,
  DescribeIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIpGroupsRequest,
  output: DescribeIpGroupsResult,
  errors: [AccessDeniedException, InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIpGroups",
}));

export type DescribeTagsError = ResourceNotFoundException | CommonErrors;
/**
 * Describes the specified tags for the specified WorkSpaces resource.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsRequest,
  DescribeTagsResult,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTagsRequest,
  output: DescribeTagsResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type DescribeWorkspaceAssociationsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the associations betweens applications and the specified WorkSpace.
 */
export const describeWorkspaceAssociations: API.OperationMethod<
  DescribeWorkspaceAssociationsRequest,
  DescribeWorkspaceAssociationsResult,
  DescribeWorkspaceAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceAssociationsRequest,
  output: DescribeWorkspaceAssociationsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceAssociations",
}));

export type DescribeWorkspaceBundlesError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Retrieves a list that describes the available WorkSpace bundles.
 *
 * You can filter the results using either bundle ID or owner, but not both.
 */
export const describeWorkspaceBundles: API.PaginatedOperationMethod<
  DescribeWorkspaceBundlesRequest,
  DescribeWorkspaceBundlesResult,
  DescribeWorkspaceBundlesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceBundle
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspaceBundlesRequest,
  output: DescribeWorkspaceBundlesResult,
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceBundles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Bundles",
  } as const,
})) as any;

export type DescribeWorkspaceDirectoriesError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes the available directories that are registered with Amazon WorkSpaces.
 */
export const describeWorkspaceDirectories: API.PaginatedOperationMethod<
  DescribeWorkspaceDirectoriesRequest,
  DescribeWorkspaceDirectoriesResult,
  DescribeWorkspaceDirectoriesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceDirectory
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspaceDirectoriesRequest,
  output: DescribeWorkspaceDirectoriesResult,
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceDirectories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Directories",
  } as const,
})) as any;

export type DescribeWorkspaceImagePermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the permissions that the owner of an image has granted to other Amazon Web Services accounts for an image.
 */
export const describeWorkspaceImagePermissions: API.OperationMethod<
  DescribeWorkspaceImagePermissionsRequest,
  DescribeWorkspaceImagePermissionsResult,
  DescribeWorkspaceImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceImagePermissionsRequest,
  output: DescribeWorkspaceImagePermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceImagePermissions",
}));

export type DescribeWorkspaceImagesError = AccessDeniedException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified images, if the image identifiers
 * are provided. Otherwise, all images in the account are described.
 */
export const describeWorkspaceImages: API.OperationMethod<
  DescribeWorkspaceImagesRequest,
  DescribeWorkspaceImagesResult,
  DescribeWorkspaceImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceImagesRequest,
  output: DescribeWorkspaceImagesResult,
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceImages",
}));

export type DescribeWorkspacesError =
  | InvalidParameterValuesException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Describes the specified WorkSpaces.
 *
 * You can filter the results by using the bundle identifier, directory identifier, or
 * owner, but you can specify only one filter at a time.
 */
export const describeWorkspaces: API.PaginatedOperationMethod<
  DescribeWorkspacesRequest,
  DescribeWorkspacesResult,
  DescribeWorkspacesError,
  Credentials | HttpClient.HttpClient,
  Workspace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeWorkspacesRequest,
  output: DescribeWorkspacesResult,
  errors: [InvalidParameterValuesException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workspaces",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeWorkspacesConnectionStatusError =
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Describes the connection status of the specified WorkSpaces.
 */
export const describeWorkspacesConnectionStatus: API.OperationMethod<
  DescribeWorkspacesConnectionStatusRequest,
  DescribeWorkspacesConnectionStatusResult,
  DescribeWorkspacesConnectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesConnectionStatusRequest,
  output: DescribeWorkspacesConnectionStatusResult,
  errors: [InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesConnectionStatus",
}));

export type DescribeWorkspaceSnapshotsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the snapshots for the specified WorkSpace.
 */
export const describeWorkspaceSnapshots: API.OperationMethod<
  DescribeWorkspaceSnapshotsRequest,
  DescribeWorkspaceSnapshotsResult,
  DescribeWorkspaceSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceSnapshotsRequest,
  output: DescribeWorkspaceSnapshotsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceSnapshots",
}));

export type DescribeWorkspacesPoolsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Describes the specified WorkSpaces Pools.
 */
export const describeWorkspacesPools: API.OperationMethod<
  DescribeWorkspacesPoolsRequest,
  DescribeWorkspacesPoolsResult,
  DescribeWorkspacesPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesPoolsRequest,
  output: DescribeWorkspacesPoolsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesPools",
}));

export type DescribeWorkspacesPoolSessionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Retrieves a list that describes the streaming sessions for a specified pool.
 */
export const describeWorkspacesPoolSessions: API.OperationMethod<
  DescribeWorkspacesPoolSessionsRequest,
  DescribeWorkspacesPoolSessionsResult,
  DescribeWorkspacesPoolSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkspacesPoolSessionsRequest,
  output: DescribeWorkspacesPoolSessionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspacesPoolSessions",
}));

export type DisassociateConnectionAliasError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a connection alias from a directory. Disassociating a connection alias
 * disables cross-Region redirection between two directories in different Regions. For more
 * information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 */
export const disassociateConnectionAlias: API.OperationMethod<
  DisassociateConnectionAliasRequest,
  DisassociateConnectionAliasResult,
  DisassociateConnectionAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateConnectionAliasRequest,
  output: DisassociateConnectionAliasResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConnectionAlias",
}));

export type DisassociateIpGroupsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified IP access control group from the specified directory.
 */
export const disassociateIpGroups: API.OperationMethod<
  DisassociateIpGroupsRequest,
  DisassociateIpGroupsResult,
  DisassociateIpGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateIpGroupsRequest,
  output: DisassociateIpGroupsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateIpGroups",
}));

export type DisassociateWorkspaceApplicationError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified application from a WorkSpace.
 */
export const disassociateWorkspaceApplication: API.OperationMethod<
  DisassociateWorkspaceApplicationRequest,
  DisassociateWorkspaceApplicationResult,
  DisassociateWorkspaceApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateWorkspaceApplicationRequest,
  output: DisassociateWorkspaceApplicationResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWorkspaceApplication",
}));

export type GetAccountLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves account link information.
 */
export const getAccountLink: API.OperationMethod<
  GetAccountLinkRequest,
  GetAccountLinkResult,
  GetAccountLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountLinkRequest,
  output: GetAccountLinkResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLink",
}));

export type ImportClientBrandingError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports client branding. Client branding allows you to customize your WorkSpace's client
 * login portal. You can tailor your login portal company logo, the support email address,
 * support link, link to reset password, and a custom message for users trying to sign
 * in.
 *
 * After you import client branding, the default branding experience for the specified
 * platform type is replaced with the imported experience
 *
 * - You must specify at least one platform type when importing client
 * branding.
 *
 * - You can import up to 6 MB of data with each request. If your request exceeds
 * this limit, you can import client branding for different platform types using
 * separate requests.
 *
 * - In each platform type, the `SupportEmail` and
 * `SupportLink` parameters are mutually exclusive. You can specify
 * only one parameter for each platform type, but not both.
 *
 * - Imported data can take up to a minute to appear in the WorkSpaces
 * client.
 */
export const importClientBranding: API.OperationMethod<
  ImportClientBrandingRequest,
  ImportClientBrandingResult,
  ImportClientBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportClientBrandingRequest,
  output: ImportClientBrandingResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportClientBranding",
}));

export type ImportCustomWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports the specified Windows 10 or 11 Bring Your Own License (BYOL)
 * image into Amazon WorkSpaces using EC2 Image Builder. The image must be an already licensed image that is
 * in your Amazon Web Services account, and you must own the image. For more information about
 * creating BYOL images, see Bring Your Own Windows
 * Desktop Licenses.
 */
export const importCustomWorkspaceImage: API.OperationMethod<
  ImportCustomWorkspaceImageRequest,
  ImportCustomWorkspaceImageResult,
  ImportCustomWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportCustomWorkspaceImageRequest,
  output: ImportCustomWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCustomWorkspaceImage",
}));

export type ImportWorkspaceImageError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports the specified Windows 10 or 11 Bring Your Own License (BYOL)
 * image into Amazon WorkSpaces. The image must be an already licensed Amazon EC2 image that is
 * in your Amazon Web Services account, and you must own the image. For more information about
 * creating BYOL images, see Bring Your Own Windows
 * Desktop Licenses.
 */
export const importWorkspaceImage: API.OperationMethod<
  ImportWorkspaceImageRequest,
  ImportWorkspaceImageResult,
  ImportWorkspaceImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportWorkspaceImageRequest,
  output: ImportWorkspaceImageResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportWorkspaceImage",
}));

export type ListAccountLinksError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account links.
 */
export const listAccountLinks: API.PaginatedOperationMethod<
  ListAccountLinksRequest,
  ListAccountLinksResult,
  ListAccountLinksError,
  Credentials | HttpClient.HttpClient,
  AccountLink
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountLinksRequest,
  output: ListAccountLinksResult,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLinks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableManagementCidrRangesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | CommonErrors;
/**
 * Retrieves a list of IP address ranges, specified as IPv4 CIDR blocks, that you can use
 * for the network management interface when you enable Bring Your Own License (BYOL).
 *
 * This operation can be run only by Amazon Web Services accounts that are enabled for BYOL.
 * If your account isn't enabled for BYOL, you'll receive an
 * `AccessDeniedException` error.
 *
 * The management network interface is connected to a secure Amazon WorkSpaces management
 * network. It is used for interactive streaming of the WorkSpace desktop to Amazon WorkSpaces
 * clients, and to allow Amazon WorkSpaces to manage the WorkSpace.
 */
export const listAvailableManagementCidrRanges: API.OperationMethod<
  ListAvailableManagementCidrRangesRequest,
  ListAvailableManagementCidrRangesResult,
  ListAvailableManagementCidrRangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAvailableManagementCidrRangesRequest,
  output: ListAvailableManagementCidrRangesResult,
  errors: [AccessDeniedException, InvalidParameterValuesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableManagementCidrRanges",
}));

export type MigrateWorkspaceError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Migrates a WorkSpace from one operating system or bundle type to another, while
 * retaining the data on the user volume.
 *
 * The migration process recreates the WorkSpace by using a new root volume from the target
 * bundle image and the user volume from the last available snapshot of the original
 * WorkSpace. During migration, the original `D:\Users\%USERNAME%` user profile
 * folder is renamed to `D:\Users\%USERNAME%MMddyyTHHmmss%.NotMigrated`. A new
 * `D:\Users\%USERNAME%\` folder is generated by the new OS. Certain files in
 * the old user profile are moved to the new user profile.
 *
 * For available migration scenarios, details about what happens during migration, and best
 * practices, see Migrate a
 * WorkSpace.
 *
 * If the source WorkSpace has nested virtualization enabled and the target bundle does
 * not support nested virtualization, the migration fails.
 */
export const migrateWorkspace: API.OperationMethod<
  MigrateWorkspaceRequest,
  MigrateWorkspaceResult,
  MigrateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MigrateWorkspaceRequest,
  output: MigrateWorkspaceResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MigrateWorkspace",
}));

export type ModifyAccountError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Modifies the configuration of Bring Your Own License (BYOL) for the specified
 * account.
 */
export const modifyAccount: API.OperationMethod<
  ModifyAccountRequest,
  ModifyAccountResult,
  ModifyAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyAccountRequest,
  output: ModifyAccountResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAccount",
}));

export type ModifyCertificateBasedAuthPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the properties of the certificate-based authentication you want
 * to use with your WorkSpaces.
 */
export const modifyCertificateBasedAuthProperties: API.OperationMethod<
  ModifyCertificateBasedAuthPropertiesRequest,
  ModifyCertificateBasedAuthPropertiesResult,
  ModifyCertificateBasedAuthPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCertificateBasedAuthPropertiesRequest,
  output: ModifyCertificateBasedAuthPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCertificateBasedAuthProperties",
}));

export type ModifyClientPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the properties of the specified Amazon WorkSpaces clients.
 */
export const modifyClientProperties: API.OperationMethod<
  ModifyClientPropertiesRequest,
  ModifyClientPropertiesResult,
  ModifyClientPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClientPropertiesRequest,
  output: ModifyClientPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClientProperties",
}));

export type ModifyEndpointEncryptionModeError =
  | AccessDeniedException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the endpoint encryption mode that allows you to configure the specified
 * directory between Standard TLS and FIPS 140-2 validated mode.
 */
export const modifyEndpointEncryptionMode: API.OperationMethod<
  ModifyEndpointEncryptionModeRequest,
  ModifyEndpointEncryptionModeResponse,
  ModifyEndpointEncryptionModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyEndpointEncryptionModeRequest,
  output: ModifyEndpointEncryptionModeResponse,
  errors: [
    AccessDeniedException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpointEncryptionMode",
}));

export type ModifySamlPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies multiple properties related to SAML 2.0 authentication, including the enablement status,
 * user access URL, and relay state parameter name that are used for configuring federation with an
 * SAML 2.0 identity provider.
 */
export const modifySamlProperties: API.OperationMethod<
  ModifySamlPropertiesRequest,
  ModifySamlPropertiesResult,
  ModifySamlPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifySamlPropertiesRequest,
  output: ModifySamlPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySamlProperties",
}));

export type ModifySelfservicePermissionsError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the self-service WorkSpace management capabilities for your users. For more
 * information, see Enable Self-Service WorkSpace Management Capabilities for Your Users.
 */
export const modifySelfservicePermissions: API.OperationMethod<
  ModifySelfservicePermissionsRequest,
  ModifySelfservicePermissionsResult,
  ModifySelfservicePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifySelfservicePermissionsRequest,
  output: ModifySelfservicePermissionsResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySelfservicePermissions",
}));

export type ModifyStreamingPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the specified streaming properties.
 */
export const modifyStreamingProperties: API.OperationMethod<
  ModifyStreamingPropertiesRequest,
  ModifyStreamingPropertiesResult,
  ModifyStreamingPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyStreamingPropertiesRequest,
  output: ModifyStreamingPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyStreamingProperties",
}));

export type ModifyWorkspaceAccessPropertiesError =
  | AccessDeniedException
  | InvalidParameterCombinationException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Specifies which devices and operating systems users can use to access their WorkSpaces.
 * For more information, see
 * Control Device Access.
 */
export const modifyWorkspaceAccessProperties: API.OperationMethod<
  ModifyWorkspaceAccessPropertiesRequest,
  ModifyWorkspaceAccessPropertiesResult,
  ModifyWorkspaceAccessPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceAccessPropertiesRequest,
  output: ModifyWorkspaceAccessPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterCombinationException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceAccessProperties",
}));

export type ModifyWorkspaceCreationPropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modify the default properties used to create WorkSpaces.
 */
export const modifyWorkspaceCreationProperties: API.OperationMethod<
  ModifyWorkspaceCreationPropertiesRequest,
  ModifyWorkspaceCreationPropertiesResult,
  ModifyWorkspaceCreationPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceCreationPropertiesRequest,
  output: ModifyWorkspaceCreationPropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceCreationProperties",
}));

export type ModifyWorkspacePropertiesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | UnsupportedWorkspaceConfigurationException
  | CommonErrors;
/**
 * Modifies the specified WorkSpace properties. For important information about how to
 * modify the size of the root and user volumes, see Modify a WorkSpace.
 *
 * The `MANUAL` running mode value is only supported by Amazon WorkSpaces
 * Core. Contact your account team to be allow-listed to use this value. For more
 * information, see Amazon WorkSpaces
 * Core.
 */
export const modifyWorkspaceProperties: API.OperationMethod<
  ModifyWorkspacePropertiesRequest,
  ModifyWorkspacePropertiesResult,
  ModifyWorkspacePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyWorkspacePropertiesRequest,
  output: ModifyWorkspacePropertiesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedWorkspaceConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceProperties",
}));

export type ModifyWorkspaceStateError =
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets the state of the specified WorkSpace.
 *
 * To maintain a WorkSpace without being interrupted, set the WorkSpace state to
 * `ADMIN_MAINTENANCE`. WorkSpaces in this state do not respond to requests to
 * reboot, stop, start, rebuild, or restore. An AutoStop WorkSpace in this state is not
 * stopped. Users cannot log into a WorkSpace in the `ADMIN_MAINTENANCE`
 * state.
 */
export const modifyWorkspaceState: API.OperationMethod<
  ModifyWorkspaceStateRequest,
  ModifyWorkspaceStateResult,
  ModifyWorkspaceStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyWorkspaceStateRequest,
  output: ModifyWorkspaceStateResult,
  errors: [
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyWorkspaceState",
}));

export type RebootWorkspacesError =
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Reboots the specified WorkSpaces.
 *
 * You cannot reboot a WorkSpace unless its state is `AVAILABLE`,
 * `UNHEALTHY`, or `REBOOTING`. Reboot a WorkSpace in the `REBOOTING`
 * state only if your WorkSpace has been stuck in the `REBOOTING` state for over 20 minutes.
 *
 * This operation is asynchronous and returns before the WorkSpaces have rebooted.
 */
export const rebootWorkspaces: API.OperationMethod<
  RebootWorkspacesRequest,
  RebootWorkspacesResult,
  RebootWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootWorkspacesRequest,
  output: RebootWorkspacesResult,
  errors: [OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootWorkspaces",
}));

export type RebuildWorkspacesError =
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Rebuilds the specified WorkSpace.
 *
 * You cannot rebuild a WorkSpace unless its state is `AVAILABLE`,
 * `ERROR`, `UNHEALTHY`, `STOPPED`, or
 * `REBOOTING`.
 *
 * Rebuilding a WorkSpace is a potentially destructive action that can result in the loss
 * of data. For more information, see Rebuild a
 * WorkSpace.
 *
 * This operation is asynchronous and returns before the WorkSpaces have been completely
 * rebuilt.
 */
export const rebuildWorkspaces: API.OperationMethod<
  RebuildWorkspacesRequest,
  RebuildWorkspacesResult,
  RebuildWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebuildWorkspacesRequest,
  output: RebuildWorkspacesResult,
  errors: [OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebuildWorkspaces",
}));

export type RegisterWorkspaceDirectoryError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAlreadyExistsException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | UnsupportedNetworkConfigurationException
  | WorkspacesDefaultRoleNotFoundException
  | CommonErrors;
/**
 * Registers the specified directory. This operation is asynchronous and returns before the
 * WorkSpace directory is registered. If this is the first time you are registering a
 * directory, you will need to create the workspaces_DefaultRole role before you can register
 * a directory. For more information, see
 * Creating the workspaces_DefaultRole Role.
 */
export const registerWorkspaceDirectory: API.OperationMethod<
  RegisterWorkspaceDirectoryRequest,
  RegisterWorkspaceDirectoryResult,
  RegisterWorkspaceDirectoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterWorkspaceDirectoryRequest,
  output: RegisterWorkspaceDirectoryResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAlreadyExistsException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    UnsupportedNetworkConfigurationException,
    WorkspacesDefaultRoleNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWorkspaceDirectory",
}));

export type RejectAccountLinkInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the account link invitation.
 */
export const rejectAccountLinkInvitation: API.OperationMethod<
  RejectAccountLinkInvitationRequest,
  RejectAccountLinkInvitationResult,
  RejectAccountLinkInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectAccountLinkInvitationRequest,
  output: RejectAccountLinkInvitationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAccountLinkInvitation",
}));

export type RestoreWorkspaceError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restores the specified WorkSpace to its last known healthy state.
 *
 * You cannot restore a WorkSpace unless its state is ` AVAILABLE`,
 * `ERROR`, `UNHEALTHY`, or `STOPPED`.
 *
 * Restoring a WorkSpace is a potentially destructive action that can result in the loss of
 * data. For more information, see Restore a
 * WorkSpace.
 *
 * This operation is asynchronous and returns before the WorkSpace is completely
 * restored.
 */
export const restoreWorkspace: API.OperationMethod<
  RestoreWorkspaceRequest,
  RestoreWorkspaceResult,
  RestoreWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreWorkspaceRequest,
  output: RestoreWorkspaceResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreWorkspace",
}));

export type RevokeIpRulesError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more rules from the specified IP access control group.
 */
export const revokeIpRules: API.OperationMethod<
  RevokeIpRulesRequest,
  RevokeIpRulesResult,
  RevokeIpRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeIpRulesRequest,
  output: RevokeIpRulesResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeIpRules",
}));

export type StartWorkspacesError = CommonErrors;
/**
 * Starts the specified WorkSpaces.
 *
 * You cannot start a WorkSpace unless it has a running mode of `AutoStop` or
 * `Manual` and a state of `STOPPED`.
 */
export const startWorkspaces: API.OperationMethod<
  StartWorkspacesRequest,
  StartWorkspacesResult,
  StartWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkspacesRequest,
  output: StartWorkspacesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkspaces",
}));

export type StartWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Starts the specified pool.
 *
 * You cannot start a pool unless it has a running mode of
 * `AutoStop` and a state of `STOPPED`.
 */
export const startWorkspacesPool: API.OperationMethod<
  StartWorkspacesPoolRequest,
  StartWorkspacesPoolResult,
  StartWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkspacesPoolRequest,
  output: StartWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkspacesPool",
}));

export type StopWorkspacesError = CommonErrors;
/**
 * Stops the specified WorkSpaces.
 *
 * You cannot stop a WorkSpace unless it has a running mode of `AutoStop` or
 * `Manual` and a state of `AVAILABLE`, `IMPAIRED`,
 * `UNHEALTHY`, or `ERROR`.
 */
export const stopWorkspaces: API.OperationMethod<
  StopWorkspacesRequest,
  StopWorkspacesResult,
  StopWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopWorkspacesRequest,
  output: StopWorkspacesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkspaces",
}));

export type StopWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Stops the specified pool.
 *
 * You cannot stop a WorkSpace pool unless it has a running mode of `AutoStop`
 * and a state of `AVAILABLE`, `IMPAIRED`, `UNHEALTHY`, or `ERROR`.
 */
export const stopWorkspacesPool: API.OperationMethod<
  StopWorkspacesPoolRequest,
  StopWorkspacesPoolResult,
  StopWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopWorkspacesPoolRequest,
  output: StopWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkspacesPool",
}));

export type TerminateWorkspacesError = CommonErrors;
/**
 * Terminates the specified WorkSpaces.
 *
 * Terminating a WorkSpace is a permanent action and cannot be undone. The user's data
 * is destroyed. If you need to archive any user data, contact Amazon Web Services Support before
 * terminating the WorkSpace.
 *
 * You can terminate a WorkSpace that is in any state except `SUSPENDED`.
 *
 * This operation is asynchronous and returns before the WorkSpaces have been completely
 * terminated. After a WorkSpace is terminated, the `TERMINATED` state is returned
 * only briefly before the WorkSpace directory metadata is cleaned up, so this state is rarely
 * returned. To confirm that a WorkSpace is terminated, check for the WorkSpace ID by using
 *
 * DescribeWorkSpaces. If the WorkSpace ID isn't returned, then the WorkSpace has
 * been successfully terminated.
 *
 * Simple AD and AD Connector are made available to you free of charge to use with
 * WorkSpaces. If there are no WorkSpaces being used with your Simple AD or AD Connector
 * directory for 30 consecutive days, this directory will be automatically deregistered for
 * use with Amazon WorkSpaces, and you will be charged for this directory as per the Directory Service pricing
 * terms.
 *
 * To delete empty directories, see Delete the
 * Directory for Your WorkSpaces. If you delete your Simple AD or AD Connector
 * directory, you can always create a new one when you want to start using WorkSpaces
 * again.
 */
export const terminateWorkspaces: API.OperationMethod<
  TerminateWorkspacesRequest,
  TerminateWorkspacesResult,
  TerminateWorkspacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesRequest,
  output: TerminateWorkspacesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspaces",
}));

export type TerminateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Terminates the specified pool.
 */
export const terminateWorkspacesPool: API.OperationMethod<
  TerminateWorkspacesPoolRequest,
  TerminateWorkspacesPoolResult,
  TerminateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesPoolRequest,
  output: TerminateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspacesPool",
}));

export type TerminateWorkspacesPoolSessionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Terminates the pool session.
 */
export const terminateWorkspacesPoolSession: API.OperationMethod<
  TerminateWorkspacesPoolSessionRequest,
  TerminateWorkspacesPoolSessionResult,
  TerminateWorkspacesPoolSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateWorkspacesPoolSessionRequest,
  output: TerminateWorkspacesPoolSessionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkspacesPoolSession",
}));

export type UpdateConnectClientAddInError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a Connect Customer client add-in. Use this action to update the name and
 * endpoint URL of a Connect Customer client add-in.
 */
export const updateConnectClientAddIn: API.OperationMethod<
  UpdateConnectClientAddInRequest,
  UpdateConnectClientAddInResult,
  UpdateConnectClientAddInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectClientAddInRequest,
  output: UpdateConnectClientAddInResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectClientAddIn",
}));

export type UpdateConnectionAliasPermissionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationNotSupportedException
  | ResourceAssociatedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Shares or unshares a connection alias with one account by specifying whether that
 * account has permission to associate the connection alias with a directory. If the
 * association permission is granted, the connection alias is shared with that account. If the
 * association permission is revoked, the connection alias is unshared with the account. For
 * more information, see Cross-Region
 * Redirection for Amazon WorkSpaces.
 *
 * - Before performing this operation, call
 * DescribeConnectionAliases to make sure that the current state of the
 * connection alias is `CREATED`.
 *
 * - To delete a connection alias that has been shared, the shared account must
 * first disassociate the connection alias from any directories it has been
 * associated with. Then you must unshare the connection alias from the account it
 * has been shared with. You can delete a connection alias only after it is no longer
 * shared with any accounts or associated with any directories.
 */
export const updateConnectionAliasPermission: API.OperationMethod<
  UpdateConnectionAliasPermissionRequest,
  UpdateConnectionAliasPermissionResult,
  UpdateConnectionAliasPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionAliasPermissionRequest,
  output: UpdateConnectionAliasPermissionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationNotSupportedException,
    ResourceAssociatedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionAliasPermission",
}));

export type UpdateRulesOfIpGroupError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replaces the current rules of the specified IP access control group with the specified
 * rules.
 */
export const updateRulesOfIpGroup: API.OperationMethod<
  UpdateRulesOfIpGroupRequest,
  UpdateRulesOfIpGroupResult,
  UpdateRulesOfIpGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRulesOfIpGroupRequest,
  output: UpdateRulesOfIpGroupResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRulesOfIpGroup",
}));

export type UpdateWorkspaceBundleError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Updates a WorkSpace bundle with a new image. For more information about updating WorkSpace bundles, see
 *
 * Update a Custom WorkSpaces Bundle.
 *
 * Existing WorkSpaces aren't automatically updated when you update the bundle that they're
 * based on. To update existing WorkSpaces that are based on a bundle that you've updated, you
 * must either rebuild the WorkSpaces or delete and recreate them.
 */
export const updateWorkspaceBundle: API.OperationMethod<
  UpdateWorkspaceBundleRequest,
  UpdateWorkspaceBundleResult,
  UpdateWorkspaceBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceBundleRequest,
  output: UpdateWorkspaceBundleResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceBundle",
}));

export type UpdateWorkspaceImagePermissionError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Shares or unshares an image with one account in the same Amazon Web Services Region by
 * specifying whether that account has permission to copy the image. If the copy image
 * permission is granted, the image is shared with that account. If the copy image permission
 * is revoked, the image is unshared with the account.
 *
 * After an image has been shared, the recipient account can copy the image to other
 * Regions as needed.
 *
 * In the China (Ningxia) Region, you can copy images only within the same Region.
 *
 * In Amazon Web Services GovCloud (US), to copy images to and from other Regions, contact Amazon Web Services Support.
 *
 * For more information about sharing images, see Share or Unshare a Custom
 * WorkSpaces Image.
 *
 * - To delete an image that has been shared, you must unshare the image before you
 * delete it.
 *
 * - Sharing Bring Your Own License (BYOL) images across Amazon Web Services accounts
 * isn't supported at this time in Amazon Web Services GovCloud (US). To share BYOL images
 * across accounts in Amazon Web Services GovCloud (US), contact Amazon Web Services Support.
 */
export const updateWorkspaceImagePermission: API.OperationMethod<
  UpdateWorkspaceImagePermissionRequest,
  UpdateWorkspaceImagePermissionResult,
  UpdateWorkspaceImagePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceImagePermissionRequest,
  output: UpdateWorkspaceImagePermissionResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    OperationNotSupportedException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspaceImagePermission",
}));

export type UpdateWorkspacesPoolError =
  | AccessDeniedException
  | InvalidParameterValuesException
  | InvalidResourceStateException
  | OperationInProgressException
  | OperationNotSupportedException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * End of support notice: On December 31, 2027, Amazon Web Services will end support for Amazon WorkSpaces Pools. After December 31, 2027,
 * you will no longer be able to access the Amazon WorkSpaces Pools console or Amazon WorkSpaces Pools resources. For more information, see
 * Amazon WorkSpaces Pools end of support.
 *
 * Updates the specified pool.
 */
export const updateWorkspacesPool: API.OperationMethod<
  UpdateWorkspacesPoolRequest,
  UpdateWorkspacesPoolResult,
  UpdateWorkspacesPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspacesPoolRequest,
  output: UpdateWorkspacesPoolResult,
  errors: [
    AccessDeniedException,
    InvalidParameterValuesException,
    InvalidResourceStateException,
    OperationInProgressException,
    OperationNotSupportedException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkspacesPool",
}));
