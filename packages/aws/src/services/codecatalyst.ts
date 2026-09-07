import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "CodeCatalyst",
  serviceShapeName: "CodeCatalyst",
});
const auth = T.AwsAuthSigv4({ name: "CodeCatalyst" });
const ver = T.ServiceVersion("2022-09-28");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Region, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    return e(Endpoint);
  }
  {
    const PartitionResult = _.partition("us-west-2");
    if (
      !(Region != null) &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (UseFIPS === true) {
        if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
          return err("Partition does not support FIPS.");
        }
        return e(
          `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      return e(
        `https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
      );
    }
  }
  {
    const PartitionResult = _.partition(Region);
    if (
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (UseFIPS === true) {
        if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
          return err("Partition does not support FIPS.");
        }
        return e(
          `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      return e(
        `https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
      );
    }
  }
  return err("No matching endpoint rule");
});

export type AccessTokenName = string;
export interface CreateAccessTokenRequest {
  name: string;
  expiresTime?: Date;
}
export const CreateAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    expiresTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/accessTokens" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessTokenRequest",
}) as any as S.Schema<CreateAccessTokenRequest>;
export type AccessTokenSecret = string | redacted.Redacted<string>;
export type AccessTokenId = string;
export interface CreateAccessTokenResponse {
  secret: string | redacted.Redacted<string>;
  name: string;
  expiresTime: Date;
  accessTokenId: string;
}
export const CreateAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secret: SensitiveString,
    name: S.String,
    expiresTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    accessTokenId: S.String,
  }),
).annotate({
  identifier: "CreateAccessTokenResponse",
}) as any as S.Schema<CreateAccessTokenResponse>;
export type NameString = string;
export type SourceRepositoryNameString = string;
export type SourceRepositoryBranchString = string;
export interface RepositoryInput {
  repositoryName: string;
  branchName?: string;
}
export const RepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, branchName: S.optional(S.String) }),
).annotate({
  identifier: "RepositoryInput",
}) as any as S.Schema<RepositoryInput>;
export type RepositoriesInput = RepositoryInput[];
export const RepositoriesInput = /*@__PURE__*/ S.Array(RepositoryInput);
export type ClientToken = string;
export interface IdeConfiguration {
  runtime?: string;
  name?: string;
}
export const IdeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runtime: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "IdeConfiguration",
}) as any as S.Schema<IdeConfiguration>;
export type IdeConfigurationList = IdeConfiguration[];
export const IdeConfigurationList = /*@__PURE__*/ S.Array(IdeConfiguration);
export type InstanceType = string;
export type InactivityTimeoutMinutes = number;
export interface PersistentStorageConfiguration {
  sizeInGiB: number;
}
export const PersistentStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.Number }),
).annotate({
  identifier: "PersistentStorageConfiguration",
}) as any as S.Schema<PersistentStorageConfiguration>;
export interface CreateDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  repositories?: RepositoryInput[];
  clientToken?: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType: string;
  inactivityTimeoutMinutes?: number;
  persistentStorage: PersistentStorageConfiguration;
  vpcConnectionName?: string;
}
export const CreateDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    repositories: S.optional(RepositoriesInput),
    clientToken: S.optional(S.String),
    alias: S.optional(S.String),
    ides: S.optional(IdeConfigurationList),
    instanceType: S.String,
    inactivityTimeoutMinutes: S.optional(S.Number),
    persistentStorage: PersistentStorageConfiguration,
    vpcConnectionName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDevEnvironmentRequest",
}) as any as S.Schema<CreateDevEnvironmentRequest>;
export type Uuid = string;
export interface CreateDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  vpcConnectionName?: string;
}
export const CreateDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    vpcConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDevEnvironmentResponse",
}) as any as S.Schema<CreateDevEnvironmentResponse>;
export type ProjectDisplayName = string;
export type ProjectDescription = string;
export interface CreateProjectRequest {
  spaceName: string;
  displayName: string;
  description?: string;
}
export const CreateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    displayName: S.String,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/spaces/{spaceName}/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectRequest",
}) as any as S.Schema<CreateProjectRequest>;
export interface CreateProjectResponse {
  spaceName?: string;
  name: string;
  displayName?: string;
  description?: string;
}
export const CreateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.optional(S.String),
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateProjectResponse",
}) as any as S.Schema<CreateProjectResponse>;
export type SourceRepositoryDescriptionString = string;
export interface CreateSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
}
export const CreateSourceRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSourceRepositoryRequest",
}) as any as S.Schema<CreateSourceRepositoryRequest>;
export interface CreateSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
}
export const CreateSourceRepositoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    name: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSourceRepositoryResponse",
}) as any as S.Schema<CreateSourceRepositoryResponse>;
export interface CreateSourceRepositoryBranchRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  name: string;
  headCommitId?: string;
}
export const CreateSourceRepositoryBranchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
    name: S.String.pipe(T.HttpLabel("name")),
    headCommitId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSourceRepositoryBranchRequest",
}) as any as S.Schema<CreateSourceRepositoryBranchRequest>;
export type SourceRepositoryBranchRefString = string;
export interface CreateSourceRepositoryBranchResponse {
  ref?: string;
  name?: string;
  lastUpdatedTime?: Date;
  headCommitId?: string;
}
export const CreateSourceRepositoryBranchResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ref: S.optional(S.String),
      name: S.optional(S.String),
      lastUpdatedTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      headCommitId: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateSourceRepositoryBranchResponse",
}) as any as S.Schema<CreateSourceRepositoryBranchResponse>;
export interface DeleteAccessTokenRequest {
  id: string;
}
export const DeleteAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/accessTokens/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessTokenRequest",
}) as any as S.Schema<DeleteAccessTokenRequest>;
export interface DeleteAccessTokenResponse {}
export const DeleteAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessTokenResponse",
}) as any as S.Schema<DeleteAccessTokenResponse>;
export interface DeleteDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export const DeleteDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDevEnvironmentRequest",
}) as any as S.Schema<DeleteDevEnvironmentRequest>;
export interface DeleteDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
}
export const DeleteDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceName: S.String, projectName: S.String, id: S.String }),
).annotate({
  identifier: "DeleteDevEnvironmentResponse",
}) as any as S.Schema<DeleteDevEnvironmentResponse>;
export interface DeleteProjectRequest {
  spaceName: string;
  name: string;
}
export const DeleteProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/spaces/{spaceName}/projects/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectRequest",
}) as any as S.Schema<DeleteProjectRequest>;
export interface DeleteProjectResponse {
  spaceName: string;
  name: string;
  displayName?: string;
}
export const DeleteProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    name: S.String,
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteProjectResponse",
}) as any as S.Schema<DeleteProjectResponse>;
export interface DeleteSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
}
export const DeleteSourceRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSourceRepositoryRequest",
}) as any as S.Schema<DeleteSourceRepositoryRequest>;
export interface DeleteSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
}
export const DeleteSourceRepositoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceName: S.String, projectName: S.String, name: S.String }),
).annotate({
  identifier: "DeleteSourceRepositoryResponse",
}) as any as S.Schema<DeleteSourceRepositoryResponse>;
export interface DeleteSpaceRequest {
  name: string;
}
export const DeleteSpaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/spaces/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSpaceRequest",
}) as any as S.Schema<DeleteSpaceRequest>;
export interface DeleteSpaceResponse {
  name: string;
  displayName?: string;
}
export const DeleteSpaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, displayName: S.optional(S.String) }),
).annotate({
  identifier: "DeleteSpaceResponse",
}) as any as S.Schema<DeleteSpaceResponse>;
export interface GetDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export const GetDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDevEnvironmentRequest",
}) as any as S.Schema<GetDevEnvironmentRequest>;
export type DevEnvironmentStatus = string;
export type StatusReason = string;
export interface DevEnvironmentRepositorySummary {
  repositoryName: string;
  branchName?: string;
}
export const DevEnvironmentRepositorySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, branchName: S.optional(S.String) }),
).annotate({
  identifier: "DevEnvironmentRepositorySummary",
}) as any as S.Schema<DevEnvironmentRepositorySummary>;
export type DevEnvironmentRepositorySummaries =
  DevEnvironmentRepositorySummary[];
export const DevEnvironmentRepositorySummaries = /*@__PURE__*/ S.Array(
  DevEnvironmentRepositorySummary,
);
export interface Ide {
  runtime?: string;
  name?: string;
}
export const Ide = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ runtime: S.optional(S.String), name: S.optional(S.String) }),
).annotate({ identifier: "Ide" }) as any as S.Schema<Ide>;
export type Ides = Ide[];
export const Ides = /*@__PURE__*/ S.Array(Ide);
export interface PersistentStorage {
  sizeInGiB: number;
}
export const PersistentStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.Number }),
).annotate({
  identifier: "PersistentStorage",
}) as any as S.Schema<PersistentStorage>;
export interface GetDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  lastUpdatedTime: Date;
  creatorId: string;
  status: string;
  statusReason?: string;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string;
  ides?: Ide[];
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string;
}
export const GetDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    creatorId: S.String,
    status: S.String,
    statusReason: S.optional(S.String),
    repositories: DevEnvironmentRepositorySummaries,
    alias: S.optional(S.String),
    ides: S.optional(Ides),
    instanceType: S.String,
    inactivityTimeoutMinutes: S.Number,
    persistentStorage: PersistentStorage,
    vpcConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDevEnvironmentResponse",
}) as any as S.Schema<GetDevEnvironmentResponse>;
export interface GetProjectRequest {
  spaceName: string;
  name: string;
}
export const GetProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/spaces/{spaceName}/projects/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProjectRequest",
}) as any as S.Schema<GetProjectRequest>;
export interface GetProjectResponse {
  spaceName?: string;
  name: string;
  displayName?: string;
  description?: string;
}
export const GetProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.optional(S.String),
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProjectResponse",
}) as any as S.Schema<GetProjectResponse>;
export interface GetSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
}
export const GetSourceRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSourceRepositoryRequest",
}) as any as S.Schema<GetSourceRepositoryRequest>;
export interface GetSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
  lastUpdatedTime: Date;
  createdTime: Date;
}
export const GetSourceRepositoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    name: S.String,
    description: S.optional(S.String),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSourceRepositoryResponse",
}) as any as S.Schema<GetSourceRepositoryResponse>;
export interface GetSourceRepositoryCloneUrlsRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
}
export const GetSourceRepositoryCloneUrlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/cloneUrls",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSourceRepositoryCloneUrlsRequest",
}) as any as S.Schema<GetSourceRepositoryCloneUrlsRequest>;
export interface GetSourceRepositoryCloneUrlsResponse {
  https: string;
}
export const GetSourceRepositoryCloneUrlsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ https: S.String }),
).annotate({
  identifier: "GetSourceRepositoryCloneUrlsResponse",
}) as any as S.Schema<GetSourceRepositoryCloneUrlsResponse>;
export interface GetSpaceRequest {
  name: string;
}
export const GetSpaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/spaces/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSpaceRequest",
}) as any as S.Schema<GetSpaceRequest>;
export type RegionString = string;
export interface GetSpaceResponse {
  name: string;
  regionName: string;
  displayName?: string;
  description?: string;
}
export const GetSpaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    regionName: S.String,
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSpaceResponse",
}) as any as S.Schema<GetSpaceResponse>;
export interface GetSubscriptionRequest {
  spaceName: string;
}
export const GetSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ spaceName: S.String.pipe(T.HttpLabel("spaceName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/spaces/{spaceName}/subscription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionRequest",
}) as any as S.Schema<GetSubscriptionRequest>;
export interface GetSubscriptionResponse {
  subscriptionType?: string;
  awsAccountName?: string;
  pendingSubscriptionType?: string;
  pendingSubscriptionStartTime?: Date;
}
export const GetSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionType: S.optional(S.String),
    awsAccountName: S.optional(S.String),
    pendingSubscriptionType: S.optional(S.String),
    pendingSubscriptionStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetSubscriptionResponse",
}) as any as S.Schema<GetSubscriptionResponse>;
export interface GetUserDetailsRequest {
  id?: string;
  userName?: string;
}
export const GetUserDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String).pipe(T.HttpQuery("id")),
    userName: S.optional(S.String).pipe(T.HttpQuery("userName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/userDetails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserDetailsRequest",
}) as any as S.Schema<GetUserDetailsRequest>;
export interface EmailAddress {
  email?: string;
  verified?: boolean;
}
export const EmailAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ email: S.optional(S.String), verified: S.optional(S.Boolean) }),
).annotate({ identifier: "EmailAddress" }) as any as S.Schema<EmailAddress>;
export interface GetUserDetailsResponse {
  userId?: string;
  userName?: string;
  displayName?: string;
  primaryEmail?: EmailAddress;
  version?: string;
}
export const GetUserDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    userName: S.optional(S.String),
    displayName: S.optional(S.String),
    primaryEmail: S.optional(EmailAddress),
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "GetUserDetailsResponse",
}) as any as S.Schema<GetUserDetailsResponse>;
export interface GetWorkflowRequest {
  spaceName: string;
  id: string;
  projectName: string;
}
export const GetWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    id: S.String.pipe(T.HttpLabel("id")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflows/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export interface WorkflowDefinition {
  path: string;
}
export const WorkflowDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String }),
).annotate({
  identifier: "WorkflowDefinition",
}) as any as S.Schema<WorkflowDefinition>;
export type WorkflowRunMode = string;
export type WorkflowStatus = string;
export interface GetWorkflowResponse {
  spaceName: string;
  projectName: string;
  id: string;
  name: string;
  sourceRepositoryName?: string;
  sourceBranchName?: string;
  definition: WorkflowDefinition;
  createdTime: Date;
  lastUpdatedTime: Date;
  runMode: string;
  status: string;
}
export const GetWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    name: S.String,
    sourceRepositoryName: S.optional(S.String),
    sourceBranchName: S.optional(S.String),
    definition: WorkflowDefinition,
    createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    runMode: S.String,
    status: S.String,
  }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface GetWorkflowRunRequest {
  spaceName: string;
  id: string;
  projectName: string;
}
export const GetWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    id: S.String.pipe(T.HttpLabel("id")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkflowRunRequest",
}) as any as S.Schema<GetWorkflowRunRequest>;
export type WorkflowRunStatus = string;
export interface WorkflowRunStatusReason {}
export const WorkflowRunStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "WorkflowRunStatusReason",
}) as any as S.Schema<WorkflowRunStatusReason>;
export type WorkflowRunStatusReasons = WorkflowRunStatusReason[];
export const WorkflowRunStatusReasons = /*@__PURE__*/ S.Array(
  WorkflowRunStatusReason,
);
export interface GetWorkflowRunResponse {
  spaceName: string;
  projectName: string;
  id: string;
  workflowId: string;
  status: string;
  statusReasons?: WorkflowRunStatusReason[];
  startTime: Date;
  endTime?: Date;
  lastUpdatedTime: Date;
}
export const GetWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    workflowId: S.String,
    status: S.String,
    statusReasons: S.optional(WorkflowRunStatusReasons),
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetWorkflowRunResponse",
}) as any as S.Schema<GetWorkflowRunResponse>;
export interface ListAccessTokensRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAccessTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/accessTokens" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessTokensRequest",
}) as any as S.Schema<ListAccessTokensRequest>;
export interface AccessTokenSummary {
  id: string;
  name: string;
  expiresTime?: Date;
}
export const AccessTokenSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    expiresTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AccessTokenSummary",
}) as any as S.Schema<AccessTokenSummary>;
export type AccessTokenSummaries = AccessTokenSummary[];
export const AccessTokenSummaries = /*@__PURE__*/ S.Array(AccessTokenSummary);
export interface ListAccessTokensResponse {
  items: AccessTokenSummary[];
  nextToken?: string;
}
export const ListAccessTokensResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: AccessTokenSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAccessTokensResponse",
}) as any as S.Schema<ListAccessTokensResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  key: string;
  values: string[];
  comparisonOperator?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    values: StringList,
    comparisonOperator: S.optional(S.String),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface ListDevEnvironmentsRequest {
  spaceName: string;
  projectName?: string;
  filters?: Filter[];
  nextToken?: string;
  maxResults?: number;
}
export const ListDevEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.optional(S.String),
    filters: S.optional(Filters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/devEnvironments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevEnvironmentsRequest",
}) as any as S.Schema<ListDevEnvironmentsRequest>;
export interface DevEnvironmentSummary {
  spaceName?: string;
  projectName?: string;
  id: string;
  lastUpdatedTime: Date;
  creatorId: string;
  status: string;
  statusReason?: string;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string;
  ides?: Ide[];
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string;
}
export const DevEnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.optional(S.String),
    projectName: S.optional(S.String),
    id: S.String,
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    creatorId: S.String,
    status: S.String,
    statusReason: S.optional(S.String),
    repositories: DevEnvironmentRepositorySummaries,
    alias: S.optional(S.String),
    ides: S.optional(Ides),
    instanceType: S.String,
    inactivityTimeoutMinutes: S.Number,
    persistentStorage: PersistentStorage,
    vpcConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "DevEnvironmentSummary",
}) as any as S.Schema<DevEnvironmentSummary>;
export type DevEnvironmentSummaryList = DevEnvironmentSummary[];
export const DevEnvironmentSummaryList = /*@__PURE__*/ S.Array(
  DevEnvironmentSummary,
);
export interface ListDevEnvironmentsResponse {
  items: DevEnvironmentSummary[];
  nextToken?: string;
}
export const ListDevEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: DevEnvironmentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevEnvironmentsResponse",
}) as any as S.Schema<ListDevEnvironmentsResponse>;
export interface ListDevEnvironmentSessionsRequest {
  spaceName: string;
  projectName: string;
  devEnvironmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDevEnvironmentSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    devEnvironmentId: S.String.pipe(T.HttpLabel("devEnvironmentId")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{devEnvironmentId}/sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevEnvironmentSessionsRequest",
}) as any as S.Schema<ListDevEnvironmentSessionsRequest>;
export interface DevEnvironmentSessionSummary {
  spaceName: string;
  projectName: string;
  devEnvironmentId: string;
  startedTime: Date;
  id: string;
}
export const DevEnvironmentSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    devEnvironmentId: S.String,
    startedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
  }),
).annotate({
  identifier: "DevEnvironmentSessionSummary",
}) as any as S.Schema<DevEnvironmentSessionSummary>;
export type DevEnvironmentSessionsSummaryList = DevEnvironmentSessionSummary[];
export const DevEnvironmentSessionsSummaryList = /*@__PURE__*/ S.Array(
  DevEnvironmentSessionSummary,
);
export interface ListDevEnvironmentSessionsResponse {
  items: DevEnvironmentSessionSummary[];
  nextToken?: string;
}
export const ListDevEnvironmentSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: DevEnvironmentSessionsSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevEnvironmentSessionsResponse",
}) as any as S.Schema<ListDevEnvironmentSessionsResponse>;
export interface ListEventLogsRequest {
  spaceName: string;
  startTime: Date;
  endTime: Date;
  eventName?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListEventLogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    eventName: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/eventLogs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventLogsRequest",
}) as any as S.Schema<ListEventLogsRequest>;
export type OperationType = string;
export type UserType = string;
export interface UserIdentity {
  userType: string;
  principalId: string;
  userName?: string;
  awsAccountId?: string;
}
export const UserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userType: S.String,
    principalId: S.String,
    userName: S.optional(S.String),
    awsAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "UserIdentity" }) as any as S.Schema<UserIdentity>;
export interface ProjectInformation {
  name?: string;
  projectId?: string;
}
export const ProjectInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), projectId: S.optional(S.String) }),
).annotate({
  identifier: "ProjectInformation",
}) as any as S.Schema<ProjectInformation>;
export interface EventPayload {
  contentType?: string;
  data?: string;
}
export const EventPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentType: S.optional(S.String), data: S.optional(S.String) }),
).annotate({ identifier: "EventPayload" }) as any as S.Schema<EventPayload>;
export interface EventLogEntry {
  id: string;
  eventName: string;
  eventType: string;
  eventCategory: string;
  eventSource: string;
  eventTime: Date;
  operationType: string;
  userIdentity: UserIdentity;
  projectInformation?: ProjectInformation;
  requestId?: string;
  requestPayload?: EventPayload;
  responsePayload?: EventPayload;
  errorCode?: string;
  sourceIpAddress?: string;
  userAgent?: string;
}
export const EventLogEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    eventName: S.String,
    eventType: S.String,
    eventCategory: S.String,
    eventSource: S.String,
    eventTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    operationType: S.String,
    userIdentity: UserIdentity,
    projectInformation: S.optional(ProjectInformation),
    requestId: S.optional(S.String),
    requestPayload: S.optional(EventPayload),
    responsePayload: S.optional(EventPayload),
    errorCode: S.optional(S.String),
    sourceIpAddress: S.optional(S.String),
    userAgent: S.optional(S.String),
  }),
).annotate({ identifier: "EventLogEntry" }) as any as S.Schema<EventLogEntry>;
export type EventLogEntries = EventLogEntry[];
export const EventLogEntries = /*@__PURE__*/ S.Array(EventLogEntry);
export interface ListEventLogsResponse {
  nextToken?: string;
  items: EventLogEntry[];
}
export const ListEventLogsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), items: EventLogEntries }),
).annotate({
  identifier: "ListEventLogsResponse",
}) as any as S.Schema<ListEventLogsResponse>;
export type FilterKey = string;
export type ComparisonOperator = string;
export interface ProjectListFilter {
  key: string;
  values: string[];
  comparisonOperator?: string;
}
export const ProjectListFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    values: StringList,
    comparisonOperator: S.optional(S.String),
  }),
).annotate({
  identifier: "ProjectListFilter",
}) as any as S.Schema<ProjectListFilter>;
export type ProjectListFilters = ProjectListFilter[];
export const ProjectListFilters = /*@__PURE__*/ S.Array(ProjectListFilter);
export interface ListProjectsRequest {
  spaceName: string;
  nextToken?: string;
  maxResults?: number;
  filters?: ProjectListFilter[];
}
export const ListProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(ProjectListFilters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectsRequest",
}) as any as S.Schema<ListProjectsRequest>;
export interface ProjectSummary {
  name: string;
  displayName?: string;
  description?: string;
}
export const ProjectSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "ProjectSummary" }) as any as S.Schema<ProjectSummary>;
export type ProjectSummaries = ProjectSummary[];
export const ProjectSummaries = /*@__PURE__*/ S.Array(ProjectSummary);
export interface ListProjectsResponse {
  nextToken?: string;
  items?: ProjectSummary[];
}
export const ListProjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(ProjectSummaries),
  }),
).annotate({
  identifier: "ListProjectsResponse",
}) as any as S.Schema<ListProjectsResponse>;
export interface ListSourceRepositoriesRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSourceRepositoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceRepositoriesRequest",
}) as any as S.Schema<ListSourceRepositoriesRequest>;
export type SourceRepositoryIdString = string;
export interface ListSourceRepositoriesItem {
  id: string;
  name: string;
  description?: string;
  lastUpdatedTime: Date;
  createdTime: Date;
}
export const ListSourceRepositoriesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(S.String),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSourceRepositoriesItem",
}) as any as S.Schema<ListSourceRepositoriesItem>;
export type ListSourceRepositoriesItems = ListSourceRepositoriesItem[];
export const ListSourceRepositoriesItems = /*@__PURE__*/ S.Array(
  ListSourceRepositoriesItem,
);
export interface ListSourceRepositoriesResponse {
  items?: ListSourceRepositoriesItem[];
  nextToken?: string;
}
export const ListSourceRepositoriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ListSourceRepositoriesItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceRepositoriesResponse",
}) as any as S.Schema<ListSourceRepositoriesResponse>;
export interface ListSourceRepositoryBranchesRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSourceRepositoryBranchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceRepositoryBranchesRequest",
}) as any as S.Schema<ListSourceRepositoryBranchesRequest>;
export interface ListSourceRepositoryBranchesItem {
  ref?: string;
  name?: string;
  lastUpdatedTime?: Date;
  headCommitId?: string;
}
export const ListSourceRepositoryBranchesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ref: S.optional(S.String),
    name: S.optional(S.String),
    lastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    headCommitId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceRepositoryBranchesItem",
}) as any as S.Schema<ListSourceRepositoryBranchesItem>;
export type ListSourceRepositoryBranchesItems =
  ListSourceRepositoryBranchesItem[];
export const ListSourceRepositoryBranchesItems = /*@__PURE__*/ S.Array(
  ListSourceRepositoryBranchesItem,
);
export interface ListSourceRepositoryBranchesResponse {
  nextToken?: string;
  items: ListSourceRepositoryBranchesItem[];
}
export const ListSourceRepositoryBranchesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      items: ListSourceRepositoryBranchesItems,
    }),
).annotate({
  identifier: "ListSourceRepositoryBranchesResponse",
}) as any as S.Schema<ListSourceRepositoryBranchesResponse>;
export interface ListSpacesRequest {
  nextToken?: string;
}
export const ListSpacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/spaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSpacesRequest",
}) as any as S.Schema<ListSpacesRequest>;
export interface SpaceSummary {
  name: string;
  regionName: string;
  displayName?: string;
  description?: string;
}
export const SpaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    regionName: S.String,
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "SpaceSummary" }) as any as S.Schema<SpaceSummary>;
export type SpaceSummaries = SpaceSummary[];
export const SpaceSummaries = /*@__PURE__*/ S.Array(SpaceSummary);
export interface ListSpacesResponse {
  nextToken?: string;
  items?: SpaceSummary[];
}
export const ListSpacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(SpaceSummaries),
  }),
).annotate({
  identifier: "ListSpacesResponse",
}) as any as S.Schema<ListSpacesResponse>;
export interface WorkflowRunSortCriteria {}
export const WorkflowRunSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "WorkflowRunSortCriteria",
}) as any as S.Schema<WorkflowRunSortCriteria>;
export type WorkflowRunSortCriteriaList = WorkflowRunSortCriteria[];
export const WorkflowRunSortCriteriaList = /*@__PURE__*/ S.Array(
  WorkflowRunSortCriteria,
);
export interface ListWorkflowRunsRequest {
  spaceName: string;
  workflowId?: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
  sortBy?: WorkflowRunSortCriteria[];
}
export const ListWorkflowRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    workflowId: S.optional(S.String).pipe(T.HttpQuery("workflowId")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortBy: S.optional(WorkflowRunSortCriteriaList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowRunsRequest",
}) as any as S.Schema<ListWorkflowRunsRequest>;
export interface WorkflowRunSummary {
  id: string;
  workflowId: string;
  workflowName: string;
  status: string;
  statusReasons?: WorkflowRunStatusReason[];
  startTime: Date;
  endTime?: Date;
  lastUpdatedTime: Date;
}
export const WorkflowRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    workflowId: S.String,
    workflowName: S.String,
    status: S.String,
    statusReasons: S.optional(WorkflowRunStatusReasons),
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "WorkflowRunSummary",
}) as any as S.Schema<WorkflowRunSummary>;
export type WorkflowRunSummaries = WorkflowRunSummary[];
export const WorkflowRunSummaries = /*@__PURE__*/ S.Array(WorkflowRunSummary);
export interface ListWorkflowRunsResponse {
  nextToken?: string;
  items?: WorkflowRunSummary[];
}
export const ListWorkflowRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(WorkflowRunSummaries),
  }),
).annotate({
  identifier: "ListWorkflowRunsResponse",
}) as any as S.Schema<ListWorkflowRunsResponse>;
export interface WorkflowSortCriteria {}
export const WorkflowSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "WorkflowSortCriteria",
}) as any as S.Schema<WorkflowSortCriteria>;
export type WorkflowSortCriteriaList = WorkflowSortCriteria[];
export const WorkflowSortCriteriaList =
  /*@__PURE__*/ S.Array(WorkflowSortCriteria);
export interface ListWorkflowsRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
  sortBy?: WorkflowSortCriteria[];
}
export const ListWorkflowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    sortBy: S.optional(WorkflowSortCriteriaList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflows",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
export interface WorkflowDefinitionSummary {
  path: string;
}
export const WorkflowDefinitionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String }),
).annotate({
  identifier: "WorkflowDefinitionSummary",
}) as any as S.Schema<WorkflowDefinitionSummary>;
export interface WorkflowSummary {
  id: string;
  name: string;
  sourceRepositoryName: string;
  sourceBranchName: string;
  definition: WorkflowDefinitionSummary;
  createdTime: Date;
  lastUpdatedTime: Date;
  runMode: string;
  status: string;
}
export const WorkflowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    sourceRepositoryName: S.String,
    sourceBranchName: S.String,
    definition: WorkflowDefinitionSummary,
    createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    runMode: S.String,
    status: S.String,
  }),
).annotate({
  identifier: "WorkflowSummary",
}) as any as S.Schema<WorkflowSummary>;
export type WorkflowSummaries = WorkflowSummary[];
export const WorkflowSummaries = /*@__PURE__*/ S.Array(WorkflowSummary);
export interface ListWorkflowsResponse {
  nextToken?: string;
  items?: WorkflowSummary[];
}
export const ListWorkflowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(WorkflowSummaries),
  }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
export interface StartDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
}
export const StartDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
    ides: S.optional(IdeConfigurationList),
    instanceType: S.optional(S.String),
    inactivityTimeoutMinutes: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDevEnvironmentRequest",
}) as any as S.Schema<StartDevEnvironmentRequest>;
export interface StartDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  status: string;
}
export const StartDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    status: S.String,
  }),
).annotate({
  identifier: "StartDevEnvironmentResponse",
}) as any as S.Schema<StartDevEnvironmentResponse>;
export type DevEnvironmentSessionType = string;
export type ExecuteCommandSessionConfigurationArguments = string[];
export const ExecuteCommandSessionConfigurationArguments =
  /*@__PURE__*/ S.Array(S.String);
export interface ExecuteCommandSessionConfiguration {
  command: string;
  arguments?: string[];
}
export const ExecuteCommandSessionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    command: S.String,
    arguments: S.optional(ExecuteCommandSessionConfigurationArguments),
  }),
).annotate({
  identifier: "ExecuteCommandSessionConfiguration",
}) as any as S.Schema<ExecuteCommandSessionConfiguration>;
export interface DevEnvironmentSessionConfiguration {
  sessionType: string;
  executeCommandSessionConfiguration?: ExecuteCommandSessionConfiguration;
}
export const DevEnvironmentSessionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionType: S.String,
    executeCommandSessionConfiguration: S.optional(
      ExecuteCommandSessionConfiguration,
    ),
  }),
).annotate({
  identifier: "DevEnvironmentSessionConfiguration",
}) as any as S.Schema<DevEnvironmentSessionConfiguration>;
export interface StartDevEnvironmentSessionRequest {
  spaceName: string;
  projectName: string;
  id: string;
  sessionConfiguration: DevEnvironmentSessionConfiguration;
}
export const StartDevEnvironmentSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
    sessionConfiguration: DevEnvironmentSessionConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDevEnvironmentSessionRequest",
}) as any as S.Schema<StartDevEnvironmentSessionRequest>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface DevEnvironmentAccessDetails {
  streamUrl: string | redacted.Redacted<string>;
  tokenValue: string | redacted.Redacted<string>;
}
export const DevEnvironmentAccessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamUrl: SensitiveString, tokenValue: SensitiveString }),
).annotate({
  identifier: "DevEnvironmentAccessDetails",
}) as any as S.Schema<DevEnvironmentAccessDetails>;
export interface StartDevEnvironmentSessionResponse {
  accessDetails: DevEnvironmentAccessDetails;
  sessionId?: string;
  spaceName: string;
  projectName: string;
  id: string;
}
export const StartDevEnvironmentSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessDetails: DevEnvironmentAccessDetails,
    sessionId: S.optional(S.String),
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
  }),
).annotate({
  identifier: "StartDevEnvironmentSessionResponse",
}) as any as S.Schema<StartDevEnvironmentSessionResponse>;
export interface StartWorkflowRunRequest {
  spaceName: string;
  projectName: string;
  workflowId: string;
  clientToken?: string;
}
export const StartWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    workflowId: S.String.pipe(T.HttpQuery("workflowId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartWorkflowRunRequest",
}) as any as S.Schema<StartWorkflowRunRequest>;
export interface StartWorkflowRunResponse {
  spaceName: string;
  projectName: string;
  id: string;
  workflowId: string;
}
export const StartWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    workflowId: S.String,
  }),
).annotate({
  identifier: "StartWorkflowRunResponse",
}) as any as S.Schema<StartWorkflowRunResponse>;
export interface StopDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export const StopDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDevEnvironmentRequest",
}) as any as S.Schema<StopDevEnvironmentRequest>;
export interface StopDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  status: string;
}
export const StopDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    status: S.String,
  }),
).annotate({
  identifier: "StopDevEnvironmentResponse",
}) as any as S.Schema<StopDevEnvironmentResponse>;
export interface StopDevEnvironmentSessionRequest {
  spaceName: string;
  projectName: string;
  id: string;
  sessionId: string;
}
export const StopDevEnvironmentSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDevEnvironmentSessionRequest",
}) as any as S.Schema<StopDevEnvironmentSessionRequest>;
export interface StopDevEnvironmentSessionResponse {
  spaceName: string;
  projectName: string;
  id: string;
  sessionId: string;
}
export const StopDevEnvironmentSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String,
    projectName: S.String,
    id: S.String,
    sessionId: S.String,
  }),
).annotate({
  identifier: "StopDevEnvironmentSessionResponse",
}) as any as S.Schema<StopDevEnvironmentSessionResponse>;
export interface UpdateDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
  clientToken?: string;
}
export const UpdateDevEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    projectName: S.String.pipe(T.HttpLabel("projectName")),
    id: S.String.pipe(T.HttpLabel("id")),
    alias: S.optional(S.String),
    ides: S.optional(IdeConfigurationList),
    instanceType: S.optional(S.String),
    inactivityTimeoutMinutes: S.optional(S.Number),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDevEnvironmentRequest",
}) as any as S.Schema<UpdateDevEnvironmentRequest>;
export interface UpdateDevEnvironmentResponse {
  id: string;
  spaceName: string;
  projectName: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
  clientToken?: string;
}
export const UpdateDevEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    spaceName: S.String,
    projectName: S.String,
    alias: S.optional(S.String),
    ides: S.optional(IdeConfigurationList),
    instanceType: S.optional(S.String),
    inactivityTimeoutMinutes: S.optional(S.Number),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDevEnvironmentResponse",
}) as any as S.Schema<UpdateDevEnvironmentResponse>;
export interface UpdateProjectRequest {
  spaceName: string;
  name: string;
  description?: string;
}
export const UpdateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.String.pipe(T.HttpLabel("spaceName")),
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v1/spaces/{spaceName}/projects/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProjectRequest",
}) as any as S.Schema<UpdateProjectRequest>;
export interface UpdateProjectResponse {
  spaceName?: string;
  name?: string;
  displayName?: string;
  description?: string;
}
export const UpdateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spaceName: S.optional(S.String),
    name: S.optional(S.String),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateProjectResponse",
}) as any as S.Schema<UpdateProjectResponse>;
export type SpaceDescription = string;
export interface UpdateSpaceRequest {
  name: string;
  description?: string;
}
export const UpdateSpaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/spaces/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSpaceRequest",
}) as any as S.Schema<UpdateSpaceRequest>;
export interface UpdateSpaceResponse {
  name?: string;
  displayName?: string;
  description?: string;
}
export const UpdateSpaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSpaceResponse",
}) as any as S.Schema<UpdateSpaceResponse>;
export interface VerifySessionRequest {}
export const VerifySessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/session" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifySessionRequest",
}) as any as S.Schema<VerifySessionRequest>;
export interface VerifySessionResponse {
  identity?: string;
}
export const VerifySessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identity: S.optional(S.String) }),
).annotate({
  identifier: "VerifySessionResponse",
}) as any as S.Schema<VerifySessionResponse>;
export type CreateAccessTokenError = CommonErrors;
/**
 * Creates a personal access token (PAT) for the current user. A personal access token (PAT) is similar to a password.
 * It is associated with your user identity for use across all spaces and projects in Amazon CodeCatalyst. You use PATs to access CodeCatalyst
 * from resources that include integrated development environments (IDEs) and Git-based source repositories.
 * PATs represent you in Amazon CodeCatalyst and you can manage them in your user settings.For more information, see
 * Managing personal access tokens in Amazon CodeCatalyst.
 */
export const createAccessToken: API.OperationMethod<
  CreateAccessTokenRequest,
  CreateAccessTokenResponse,
  CreateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessTokenRequest,
  output: CreateAccessTokenResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessToken",
}));

export type CreateDevEnvironmentError = CommonErrors;
/**
 * Creates a Dev Environment in Amazon CodeCatalyst, a cloud-based development environment that you can use to quickly work on the code stored
 * in the source repositories of your project.
 *
 * When created in the Amazon CodeCatalyst console, by default a Dev Environment is configured to have a 2 core processor, 4GB of RAM, and 16GB of persistent storage. None of these
 * defaults apply to a Dev Environment created programmatically.
 */
export const createDevEnvironment: API.OperationMethod<
  CreateDevEnvironmentRequest,
  CreateDevEnvironmentResponse,
  CreateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDevEnvironmentRequest,
  output: CreateDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEnvironment",
}));

export type CreateProjectError = CommonErrors;
/**
 * Creates a project in a specified space.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
}));

export type CreateSourceRepositoryError = CommonErrors;
/**
 * Creates an empty Git-based source repository in a specified project. The repository is
 * created with an initial empty commit with a default branch named `main`.
 */
export const createSourceRepository: API.OperationMethod<
  CreateSourceRepositoryRequest,
  CreateSourceRepositoryResponse,
  CreateSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSourceRepositoryRequest,
  output: CreateSourceRepositoryResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepository",
}));

export type CreateSourceRepositoryBranchError = CommonErrors;
/**
 * Creates a branch in a specified source repository in Amazon CodeCatalyst.
 *
 * This API only creates a branch in a source repository hosted in Amazon CodeCatalyst. You cannot use this API to create a branch in a linked repository.
 */
export const createSourceRepositoryBranch: API.OperationMethod<
  CreateSourceRepositoryBranchRequest,
  CreateSourceRepositoryBranchResponse,
  CreateSourceRepositoryBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSourceRepositoryBranchRequest,
  output: CreateSourceRepositoryBranchResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepositoryBranch",
}));

export type DeleteAccessTokenError = CommonErrors;
/**
 * Deletes a specified personal access token (PAT). A personal access token can only be deleted by the user who created it.
 */
export const deleteAccessToken: API.OperationMethod<
  DeleteAccessTokenRequest,
  DeleteAccessTokenResponse,
  DeleteAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessTokenRequest,
  output: DeleteAccessTokenResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessToken",
}));

export type DeleteDevEnvironmentError = CommonErrors;
/**
 * Deletes a Dev Environment.
 */
export const deleteDevEnvironment: API.OperationMethod<
  DeleteDevEnvironmentRequest,
  DeleteDevEnvironmentResponse,
  DeleteDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDevEnvironmentRequest,
  output: DeleteDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEnvironment",
}));

export type DeleteProjectError = CommonErrors;
/**
 * Deletes a project in a space.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteSourceRepositoryError = CommonErrors;
/**
 * Deletes a source repository in Amazon CodeCatalyst. You cannot use this API to delete a linked repository. It can only be used to delete a Amazon CodeCatalyst source repository.
 */
export const deleteSourceRepository: API.OperationMethod<
  DeleteSourceRepositoryRequest,
  DeleteSourceRepositoryResponse,
  DeleteSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSourceRepositoryRequest,
  output: DeleteSourceRepositoryResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceRepository",
}));

export type DeleteSpaceError = CommonErrors;
/**
 * Deletes a space.
 *
 * Deleting a space cannot be undone. Additionally, since space names must be unique across Amazon CodeCatalyst, you cannot reuse names of deleted spaces.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSpaceRequest,
  output: DeleteSpaceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
}));

export type GetDevEnvironmentError = CommonErrors;
/**
 * Returns information about a Dev Environment for a source repository in a project. Dev Environments are specific to the user who creates them.
 */
export const getDevEnvironment: API.OperationMethod<
  GetDevEnvironmentRequest,
  GetDevEnvironmentResponse,
  GetDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDevEnvironmentRequest,
  output: GetDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEnvironment",
}));

export type GetProjectError = CommonErrors;
/**
 * Returns information about a project.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest,
  GetProjectResponse,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProjectRequest,
  output: GetProjectResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
}));

export type GetSourceRepositoryError = CommonErrors;
/**
 * Returns information about a source repository.
 */
export const getSourceRepository: API.OperationMethod<
  GetSourceRepositoryRequest,
  GetSourceRepositoryResponse,
  GetSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSourceRepositoryRequest,
  output: GetSourceRepositoryResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepository",
}));

export type GetSourceRepositoryCloneUrlsError = CommonErrors;
/**
 * Returns information about the URLs that can be used with a Git client to clone a source
 * repository.
 */
export const getSourceRepositoryCloneUrls: API.OperationMethod<
  GetSourceRepositoryCloneUrlsRequest,
  GetSourceRepositoryCloneUrlsResponse,
  GetSourceRepositoryCloneUrlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSourceRepositoryCloneUrlsRequest,
  output: GetSourceRepositoryCloneUrlsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepositoryCloneUrls",
}));

export type GetSpaceError = CommonErrors;
/**
 * Returns information about an space.
 */
export const getSpace: API.OperationMethod<
  GetSpaceRequest,
  GetSpaceResponse,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSpaceRequest,
  output: GetSpaceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
}));

export type GetSubscriptionError = CommonErrors;
/**
 * Returns information about the Amazon Web Services account used for billing purposes
 * and the billing plan for the space.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type GetUserDetailsError = CommonErrors;
/**
 * Returns information about a user.
 */
export const getUserDetails: API.OperationMethod<
  GetUserDetailsRequest,
  GetUserDetailsResponse,
  GetUserDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserDetailsRequest,
  output: GetUserDetailsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDetails",
}));

export type GetWorkflowError = CommonErrors;
/**
 * Returns information about a workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

export type GetWorkflowRunError = CommonErrors;
/**
 * Returns information about a specified run of a workflow.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRunRequest,
  output: GetWorkflowRunResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
}));

export type ListAccessTokensError = CommonErrors;
/**
 * Lists all personal access tokens (PATs) associated with the user who calls the API. You can only list PATs associated with your Amazon Web Services Builder ID.
 */
export const listAccessTokens: API.PaginatedOperationMethod<
  ListAccessTokensRequest,
  ListAccessTokensResponse,
  ListAccessTokensError,
  Credentials | HttpClient.HttpClient,
  AccessTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessTokensRequest,
  output: ListAccessTokensResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevEnvironmentsError = CommonErrors;
/**
 * Retrieves a list of Dev Environments in a project.
 */
export const listDevEnvironments: API.PaginatedOperationMethod<
  ListDevEnvironmentsRequest,
  ListDevEnvironmentsResponse,
  ListDevEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevEnvironmentsRequest,
  output: ListDevEnvironmentsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevEnvironmentSessionsError = CommonErrors;
/**
 * Retrieves a list of active sessions for a Dev Environment in a project.
 */
export const listDevEnvironmentSessions: API.PaginatedOperationMethod<
  ListDevEnvironmentSessionsRequest,
  ListDevEnvironmentSessionsResponse,
  ListDevEnvironmentSessionsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevEnvironmentSessionsRequest,
  output: ListDevEnvironmentSessionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironmentSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventLogsError = CommonErrors;
/**
 * Retrieves a list of events that occurred during a specific time in a space. You can
 * use these events to audit user and system activity in a space. For more information, see
 * Monitoring in the *Amazon CodeCatalyst User Guide*.
 *
 * ListEventLogs guarantees events for the last 30 days in a given space. You can also
 * view and retrieve a list of management events over the last 90 days for Amazon CodeCatalyst in the
 * CloudTrail console by viewing Event history, or by creating a trail to create
 * and maintain a record of events that extends past 90 days. For more information, see Working with CloudTrail Event History and Working with
 * CloudTrail trails.
 */
export const listEventLogs: API.PaginatedOperationMethod<
  ListEventLogsRequest,
  ListEventLogsResponse,
  ListEventLogsError,
  Credentials | HttpClient.HttpClient,
  EventLogEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventLogsRequest,
  output: ListEventLogsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventLogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError = CommonErrors;
/**
 * Retrieves a list of projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceRepositoriesError = CommonErrors;
/**
 * Retrieves a list of source repositories in a project.
 */
export const listSourceRepositories: API.PaginatedOperationMethod<
  ListSourceRepositoriesRequest,
  ListSourceRepositoriesResponse,
  ListSourceRepositoriesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoriesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceRepositoriesRequest,
  output: ListSourceRepositoriesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceRepositoryBranchesError = CommonErrors;
/**
 * Retrieves a list of branches in a specified source repository.
 */
export const listSourceRepositoryBranches: API.PaginatedOperationMethod<
  ListSourceRepositoryBranchesRequest,
  ListSourceRepositoryBranchesResponse,
  ListSourceRepositoryBranchesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoryBranchesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceRepositoryBranchesRequest,
  output: ListSourceRepositoryBranchesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositoryBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSpacesError = CommonErrors;
/**
 * Retrieves a list of spaces.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesRequest,
  output: ListSpacesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
  } as const,
})) as any;

export type ListWorkflowRunsError = CommonErrors;
/**
 * Retrieves a list of workflow runs of a specified workflow.
 */
export const listWorkflowRuns: API.PaginatedOperationMethod<
  ListWorkflowRunsRequest,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowRunsRequest,
  output: ListWorkflowRunsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError = CommonErrors;
/**
 * Retrieves a list of workflows in a specified project.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDevEnvironmentError = CommonErrors;
/**
 * Starts a specified Dev Environment and puts it into an active state.
 */
export const startDevEnvironment: API.OperationMethod<
  StartDevEnvironmentRequest,
  StartDevEnvironmentResponse,
  StartDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDevEnvironmentRequest,
  output: StartDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironment",
}));

export type StartDevEnvironmentSessionError = CommonErrors;
/**
 * Starts a session for a specified Dev Environment.
 */
export const startDevEnvironmentSession: API.OperationMethod<
  StartDevEnvironmentSessionRequest,
  StartDevEnvironmentSessionResponse,
  StartDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDevEnvironmentSessionRequest,
  output: StartDevEnvironmentSessionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironmentSession",
}));

export type StartWorkflowRunError = CommonErrors;
/**
 * Begins a run of a specified workflow.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkflowRunRequest,
  output: StartWorkflowRunResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
}));

export type StopDevEnvironmentError = CommonErrors;
/**
 * Pauses a specified Dev Environment and places it in a non-running state. Stopped Dev Environments do not consume compute minutes.
 */
export const stopDevEnvironment: API.OperationMethod<
  StopDevEnvironmentRequest,
  StopDevEnvironmentResponse,
  StopDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDevEnvironmentRequest,
  output: StopDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironment",
}));

export type StopDevEnvironmentSessionError = CommonErrors;
/**
 * Stops a session for a specified Dev Environment.
 */
export const stopDevEnvironmentSession: API.OperationMethod<
  StopDevEnvironmentSessionRequest,
  StopDevEnvironmentSessionResponse,
  StopDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDevEnvironmentSessionRequest,
  output: StopDevEnvironmentSessionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironmentSession",
}));

export type UpdateDevEnvironmentError = CommonErrors;
/**
 * Changes one or more values for a Dev Environment. Updating certain values of the Dev Environment will cause a restart.
 */
export const updateDevEnvironment: API.OperationMethod<
  UpdateDevEnvironmentRequest,
  UpdateDevEnvironmentResponse,
  UpdateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDevEnvironmentRequest,
  output: UpdateDevEnvironmentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEnvironment",
}));

export type UpdateProjectError = CommonErrors;
/**
 * Changes one or more values for a project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectRequest,
  output: UpdateProjectResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

export type UpdateSpaceError = CommonErrors;
/**
 * Changes one or more values for a space.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSpaceRequest,
  output: UpdateSpaceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
}));

export type VerifySessionError = CommonErrors;
/**
 * Verifies whether the calling user has a valid Amazon CodeCatalyst login and session. If successful, this returns the ID of the user in Amazon CodeCatalyst.
 */
export const verifySession: API.OperationMethod<
  VerifySessionRequest,
  VerifySessionResponse,
  VerifySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifySessionRequest,
  output: VerifySessionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySession",
}));
