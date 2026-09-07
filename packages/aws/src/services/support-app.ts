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
  sdkId: "Support App",
  serviceShapeName: "SupportApp",
});
const auth = T.AwsAuthSigv4({ name: "supportapp" });
const ver = T.ServiceVersion("2021-08-20");
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
              `https://supportapp-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://supportapp-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://supportapp.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://supportapp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TeamId = string;
export type ChannelId = string;
export type ChannelName = string;
export type NotificationSeverityLevel = string;
export type RoleArn = string;
export interface CreateSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity: string;
  channelRoleArn: string;
}
export const CreateSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      teamId: S.String,
      channelId: S.String,
      channelName: S.optional(S.String),
      notifyOnCreateOrReopenCase: S.optional(S.Boolean),
      notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
      notifyOnResolveCase: S.optional(S.Boolean),
      notifyOnCaseSeverity: S.String,
      channelRoleArn: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/create-slack-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSlackChannelConfigurationRequest",
}) as any as S.Schema<CreateSlackChannelConfigurationRequest>;
export interface CreateSlackChannelConfigurationResult {}
export const CreateSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CreateSlackChannelConfigurationResult",
}) as any as S.Schema<CreateSlackChannelConfigurationResult>;
export interface DeleteAccountAliasRequest {}
export const DeleteAccountAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/control/delete-account-alias" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountAliasRequest",
}) as any as S.Schema<DeleteAccountAliasRequest>;
export interface DeleteAccountAliasResult {}
export const DeleteAccountAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccountAliasResult",
}) as any as S.Schema<DeleteAccountAliasResult>;
export interface DeleteSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
}
export const DeleteSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ teamId: S.String, channelId: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/delete-slack-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteSlackChannelConfigurationRequest",
}) as any as S.Schema<DeleteSlackChannelConfigurationRequest>;
export interface DeleteSlackChannelConfigurationResult {}
export const DeleteSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteSlackChannelConfigurationResult",
}) as any as S.Schema<DeleteSlackChannelConfigurationResult>;
export interface DeleteSlackWorkspaceConfigurationRequest {
  teamId: string;
}
export const DeleteSlackWorkspaceConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ teamId: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/delete-slack-workspace-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteSlackWorkspaceConfigurationRequest",
}) as any as S.Schema<DeleteSlackWorkspaceConfigurationRequest>;
export interface DeleteSlackWorkspaceConfigurationResult {}
export const DeleteSlackWorkspaceConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteSlackWorkspaceConfigurationResult",
}) as any as S.Schema<DeleteSlackWorkspaceConfigurationResult>;
export interface GetAccountAliasRequest {}
export const GetAccountAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/control/get-account-alias" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountAliasRequest",
}) as any as S.Schema<GetAccountAliasRequest>;
export type AwsAccountAlias = string;
export interface GetAccountAliasResult {
  accountAlias?: string;
}
export const GetAccountAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountAlias: S.optional(S.String) }),
).annotate({
  identifier: "GetAccountAliasResult",
}) as any as S.Schema<GetAccountAliasResult>;
export type PaginationToken = string;
export interface ListSlackChannelConfigurationsRequest {
  nextToken?: string;
}
export const ListSlackChannelConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ nextToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/list-slack-channel-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSlackChannelConfigurationsRequest",
}) as any as S.Schema<ListSlackChannelConfigurationsRequest>;
export interface SlackChannelConfiguration {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export const SlackChannelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    teamId: S.String,
    channelId: S.String,
    channelName: S.optional(S.String),
    notifyOnCreateOrReopenCase: S.optional(S.Boolean),
    notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
    notifyOnResolveCase: S.optional(S.Boolean),
    notifyOnCaseSeverity: S.optional(S.String),
    channelRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SlackChannelConfiguration",
}) as any as S.Schema<SlackChannelConfiguration>;
export type SlackChannelConfigurationList = SlackChannelConfiguration[];
export const SlackChannelConfigurationList = /*@__PURE__*/ S.Array(
  SlackChannelConfiguration,
);
export interface ListSlackChannelConfigurationsResult {
  nextToken?: string;
  slackChannelConfigurations: SlackChannelConfiguration[];
}
export const ListSlackChannelConfigurationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      slackChannelConfigurations: SlackChannelConfigurationList,
    }),
).annotate({
  identifier: "ListSlackChannelConfigurationsResult",
}) as any as S.Schema<ListSlackChannelConfigurationsResult>;
export interface ListSlackWorkspaceConfigurationsRequest {
  nextToken?: string;
}
export const ListSlackWorkspaceConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ nextToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/list-slack-workspace-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSlackWorkspaceConfigurationsRequest",
}) as any as S.Schema<ListSlackWorkspaceConfigurationsRequest>;
export type TeamName = string;
export interface SlackWorkspaceConfiguration {
  teamId: string;
  teamName?: string;
  allowOrganizationMemberAccount?: boolean;
}
export const SlackWorkspaceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    teamId: S.String,
    teamName: S.optional(S.String),
    allowOrganizationMemberAccount: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SlackWorkspaceConfiguration",
}) as any as S.Schema<SlackWorkspaceConfiguration>;
export type SlackWorkspaceConfigurationList = SlackWorkspaceConfiguration[];
export const SlackWorkspaceConfigurationList = /*@__PURE__*/ S.Array(
  SlackWorkspaceConfiguration,
);
export interface ListSlackWorkspaceConfigurationsResult {
  nextToken?: string;
  slackWorkspaceConfigurations?: SlackWorkspaceConfiguration[];
}
export const ListSlackWorkspaceConfigurationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      slackWorkspaceConfigurations: S.optional(SlackWorkspaceConfigurationList),
    }),
).annotate({
  identifier: "ListSlackWorkspaceConfigurationsResult",
}) as any as S.Schema<ListSlackWorkspaceConfigurationsResult>;
export interface PutAccountAliasRequest {
  accountAlias: string;
}
export const PutAccountAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountAlias: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/control/put-account-alias" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountAliasRequest",
}) as any as S.Schema<PutAccountAliasRequest>;
export interface PutAccountAliasResult {}
export const PutAccountAliasResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountAliasResult",
}) as any as S.Schema<PutAccountAliasResult>;
export interface RegisterSlackWorkspaceForOrganizationRequest {
  teamId: string;
}
export const RegisterSlackWorkspaceForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ teamId: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/register-slack-workspace-for-organization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "RegisterSlackWorkspaceForOrganizationRequest",
  }) as any as S.Schema<RegisterSlackWorkspaceForOrganizationRequest>;
export type AccountType = string;
export interface RegisterSlackWorkspaceForOrganizationResult {
  teamId?: string;
  teamName?: string;
  accountType?: string;
}
export const RegisterSlackWorkspaceForOrganizationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      teamId: S.optional(S.String),
      teamName: S.optional(S.String),
      accountType: S.optional(S.String),
    }),
  ).annotate({
    identifier: "RegisterSlackWorkspaceForOrganizationResult",
  }) as any as S.Schema<RegisterSlackWorkspaceForOrganizationResult>;
export interface UpdateSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export const UpdateSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      teamId: S.String,
      channelId: S.String,
      channelName: S.optional(S.String),
      notifyOnCreateOrReopenCase: S.optional(S.Boolean),
      notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
      notifyOnResolveCase: S.optional(S.Boolean),
      notifyOnCaseSeverity: S.optional(S.String),
      channelRoleArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/control/update-slack-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSlackChannelConfigurationRequest",
}) as any as S.Schema<UpdateSlackChannelConfigurationRequest>;
export interface UpdateSlackChannelConfigurationResult {
  teamId?: string;
  channelId?: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export const UpdateSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      teamId: S.optional(S.String),
      channelId: S.optional(S.String),
      channelName: S.optional(S.String),
      notifyOnCreateOrReopenCase: S.optional(S.Boolean),
      notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
      notifyOnResolveCase: S.optional(S.Boolean),
      notifyOnCaseSeverity: S.optional(S.String),
      channelRoleArn: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateSlackChannelConfigurationResult",
}) as any as S.Schema<UpdateSlackChannelConfigurationResult>;
export type ErrorMessage = string;
export type CreateSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Slack channel configuration for your Amazon Web Services account.
 *
 * - You can add up to 5 Slack workspaces for your account.
 *
 * - You can add up to 20 Slack channels for your account.
 *
 * A Slack channel can have up to 100 Amazon Web Services accounts. This means that only 100 accounts can
 * add the same Slack channel to the Amazon Web Services Support App. We recommend that you only add the accounts that
 * you need to manage support cases for your organization. This can reduce the notifications
 * about case updates that you receive in the Slack channel.
 *
 * We recommend that you choose a private Slack channel so that only members in that
 * channel have read and write access to your support cases. Anyone in your Slack channel can
 * create, update, or resolve support cases for your account. Users require an invitation to
 * join private channels.
 */
export const createSlackChannelConfiguration: API.OperationMethod<
  CreateSlackChannelConfigurationRequest,
  CreateSlackChannelConfigurationResult,
  CreateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSlackChannelConfigurationRequest,
  output: CreateSlackChannelConfigurationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlackChannelConfiguration",
}));

export type DeleteAccountAliasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an alias for an Amazon Web Services account ID. The alias appears in the Amazon Web Services Support App page of the
 * Amazon Web Services Support Center. The alias also appears in Slack messages from the Amazon Web Services Support App.
 */
export const deleteAccountAlias: API.OperationMethod<
  DeleteAccountAliasRequest,
  DeleteAccountAliasResult,
  DeleteAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountAliasRequest,
  output: DeleteAccountAliasResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAlias",
}));

export type DeleteSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Slack channel configuration from your Amazon Web Services account. This operation doesn't
 * delete your Slack channel.
 */
export const deleteSlackChannelConfiguration: API.OperationMethod<
  DeleteSlackChannelConfigurationRequest,
  DeleteSlackChannelConfigurationResult,
  DeleteSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlackChannelConfigurationRequest,
  output: DeleteSlackChannelConfigurationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackChannelConfiguration",
}));

export type DeleteSlackWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Slack workspace configuration from your Amazon Web Services account. This operation doesn't
 * delete your Slack workspace.
 */
export const deleteSlackWorkspaceConfiguration: API.OperationMethod<
  DeleteSlackWorkspaceConfigurationRequest,
  DeleteSlackWorkspaceConfigurationResult,
  DeleteSlackWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlackWorkspaceConfigurationRequest,
  output: DeleteSlackWorkspaceConfigurationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackWorkspaceConfiguration",
}));

export type GetAccountAliasError = InternalServerException | CommonErrors;
/**
 * Retrieves the alias from an Amazon Web Services account ID. The alias appears in the Amazon Web Services Support App page of
 * the Amazon Web Services Support Center. The alias also appears in Slack messages from the Amazon Web Services Support App.
 */
export const getAccountAlias: API.OperationMethod<
  GetAccountAliasRequest,
  GetAccountAliasResult,
  GetAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountAliasRequest,
  output: GetAccountAliasResult,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAlias",
}));

export type ListSlackChannelConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the Slack channel configurations for an Amazon Web Services account.
 */
export const listSlackChannelConfigurations: API.PaginatedOperationMethod<
  ListSlackChannelConfigurationsRequest,
  ListSlackChannelConfigurationsResult,
  ListSlackChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSlackChannelConfigurationsRequest,
  output: ListSlackChannelConfigurationsResult,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlackChannelConfigurations",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListSlackWorkspaceConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the Slack workspace configurations for an Amazon Web Services account.
 */
export const listSlackWorkspaceConfigurations: API.PaginatedOperationMethod<
  ListSlackWorkspaceConfigurationsRequest,
  ListSlackWorkspaceConfigurationsResult,
  ListSlackWorkspaceConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSlackWorkspaceConfigurationsRequest,
  output: ListSlackWorkspaceConfigurationsResult,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlackWorkspaceConfigurations",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type PutAccountAliasError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an individual alias for each Amazon Web Services account ID. The alias appears in the
 * Amazon Web Services Support App page of the Amazon Web Services Support Center. The alias also appears in Slack messages from the
 * Amazon Web Services Support App.
 */
export const putAccountAlias: API.OperationMethod<
  PutAccountAliasRequest,
  PutAccountAliasResult,
  PutAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountAliasRequest,
  output: PutAccountAliasResult,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountAlias",
}));

export type RegisterSlackWorkspaceForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Registers a Slack workspace for your Amazon Web Services account. To call this API, your account must be
 * part of an organization in Organizations.
 *
 * If you're the *management account* and you want to register Slack
 * workspaces for your organization, you must complete the following tasks:
 *
 * - Sign in to the Amazon Web Services Support Center and
 * authorize the Slack workspaces where you want your organization to have access to. See
 * Authorize a Slack workspace in the Amazon Web Services Support User
 * Guide.
 *
 * - Call the `RegisterSlackWorkspaceForOrganization` API to authorize each
 * Slack workspace for the organization.
 *
 * After the management account authorizes the Slack workspace, member accounts can call this
 * API to authorize the same Slack workspace for their individual accounts. Member accounts don't
 * need to authorize the Slack workspace manually through the Amazon Web Services Support Center.
 *
 * To use the Amazon Web Services Support App, each account must then complete the following tasks:
 *
 * - Create an Identity and Access Management (IAM) role with the required permission. For more information,
 * see Managing access to the Amazon Web Services Support App.
 *
 * - Configure a Slack channel to use the Amazon Web Services Support App for support cases for that account. For
 * more information, see Configuring a Slack channel.
 */
export const registerSlackWorkspaceForOrganization: API.OperationMethod<
  RegisterSlackWorkspaceForOrganizationRequest,
  RegisterSlackWorkspaceForOrganizationResult,
  RegisterSlackWorkspaceForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterSlackWorkspaceForOrganizationRequest,
  output: RegisterSlackWorkspaceForOrganizationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSlackWorkspaceForOrganization",
}));

export type UpdateSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for a Slack channel, such as case update notifications.
 */
export const updateSlackChannelConfiguration: API.OperationMethod<
  UpdateSlackChannelConfigurationRequest,
  UpdateSlackChannelConfigurationResult,
  UpdateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSlackChannelConfigurationRequest,
  output: UpdateSlackChannelConfigurationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlackChannelConfiguration",
}));
