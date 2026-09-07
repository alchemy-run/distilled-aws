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
const ns = T.XmlNamespace("http://amplify.amazonaws.com");
const svc = T.AwsApiService({ sdkId: "Amplify", serviceShapeName: "Amplify" });
const auth = T.AwsAuthSigv4({ name: "amplify" });
const ver = T.ServiceVersion("2017-07-25");
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
              `https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://amplify-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://amplify.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://amplify.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DependentServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<DependentServiceFailureException>()(
    "DependentServiceFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { code: S.String, message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TimeoutException
  extends /*@__PURE__*/ S.TaggedError<TimeoutException>()("TimeoutException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type Name = string;
export type Description = string;
export type Repository = string;
export type Platform = "WEB" | "WEB_DYNAMIC" | "WEB_COMPUTE" | (string & {});
export const Platform = /*@__PURE__*/ S.String;

export type ComputeRoleArn = string;
export type ServiceRoleArn = string;
export type OauthToken = string | redacted.Redacted<string>;
export type AccessToken = string | redacted.Redacted<string>;
export type EnvKey = string;
export type EnvValue = string;
export type EnvironmentVariables = { [key: string]: string | undefined };
export const EnvironmentVariables = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EnableBranchAutoBuild = boolean;
export type EnableBranchAutoDeletion = boolean;
export type EnableBasicAuth = boolean;
export type BasicAuthCredentials = string | redacted.Redacted<string>;
export type Source = string;
export type Target = string;
export type Status = string;
export type Condition = string;
export interface CustomRule {
  source: string;
  target: string;
  status?: string;
  condition?: string;
}
export const CustomRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.String,
    target: S.String,
    status: S.optional(S.String),
    condition: S.optional(S.String),
  }),
).annotate({ identifier: "CustomRule" }) as any as S.Schema<CustomRule>;
export type CustomRules = CustomRule[];
export const CustomRules = /*@__PURE__*/ S.Array(CustomRule);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type BuildSpec = string | redacted.Redacted<string>;
export type CustomHeaders = string;
export type EnableAutoBranchCreation = boolean;
export type AutoBranchCreationPattern = string;
export type AutoBranchCreationPatterns = string[];
export const AutoBranchCreationPatterns = /*@__PURE__*/ S.Array(S.String);
export type Stage =
  | "PRODUCTION"
  | "BETA"
  | "DEVELOPMENT"
  | "EXPERIMENTAL"
  | "PULL_REQUEST"
  | (string & {});
export const Stage = /*@__PURE__*/ S.String;

export type Framework = string;
export type EnableAutoBuild = boolean;
export type EnablePerformanceMode = boolean;
export type EnablePullRequestPreview = boolean;
export type PullRequestEnvironmentName = string;
export interface AutoBranchCreationConfig {
  stage?: Stage;
  framework?: string;
  enableAutoBuild?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  buildSpec?: string | redacted.Redacted<string>;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
}
export const AutoBranchCreationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stage: S.optional(Stage),
    framework: S.optional(S.String),
    enableAutoBuild: S.optional(S.Boolean),
    environmentVariables: S.optional(EnvironmentVariables),
    basicAuthCredentials: S.optional(SensitiveString),
    enableBasicAuth: S.optional(S.Boolean),
    enablePerformanceMode: S.optional(S.Boolean),
    buildSpec: S.optional(SensitiveString),
    enablePullRequestPreview: S.optional(S.Boolean),
    pullRequestEnvironmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoBranchCreationConfig",
}) as any as S.Schema<AutoBranchCreationConfig>;
export type BuildComputeType =
  | "STANDARD_8GB"
  | "LARGE_16GB"
  | "XLARGE_72GB"
  | (string & {});
export const BuildComputeType = /*@__PURE__*/ S.String;

export interface JobConfig {
  buildComputeType: BuildComputeType;
}
export const JobConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ buildComputeType: BuildComputeType }),
).annotate({ identifier: "JobConfig" }) as any as S.Schema<JobConfig>;
export type CacheConfigType =
  | "AMPLIFY_MANAGED"
  | "AMPLIFY_MANAGED_NO_COOKIES"
  | (string & {});
export const CacheConfigType = /*@__PURE__*/ S.String;

export interface CacheConfig {
  type: CacheConfigType;
}
export const CacheConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: CacheConfigType }),
).annotate({ identifier: "CacheConfig" }) as any as S.Schema<CacheConfig>;
export interface CreateAppRequest {
  name: string;
  description?: string;
  repository?: string;
  platform?: Platform;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  oauthToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  environmentVariables?: { [key: string]: string | undefined };
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  tags?: { [key: string]: string | undefined };
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  jobConfig?: JobConfig;
  cacheConfig?: CacheConfig;
}
export const CreateAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    repository: S.optional(S.String),
    platform: S.optional(Platform),
    computeRoleArn: S.optional(S.String),
    iamServiceRoleArn: S.optional(S.String),
    oauthToken: S.optional(SensitiveString),
    accessToken: S.optional(SensitiveString),
    environmentVariables: S.optional(EnvironmentVariables),
    enableBranchAutoBuild: S.optional(S.Boolean),
    enableBranchAutoDeletion: S.optional(S.Boolean),
    enableBasicAuth: S.optional(S.Boolean),
    basicAuthCredentials: S.optional(SensitiveString),
    customRules: S.optional(CustomRules),
    tags: S.optional(TagMap),
    buildSpec: S.optional(SensitiveString),
    customHeaders: S.optional(S.String),
    enableAutoBranchCreation: S.optional(S.Boolean),
    autoBranchCreationPatterns: S.optional(AutoBranchCreationPatterns),
    autoBranchCreationConfig: S.optional(AutoBranchCreationConfig),
    jobConfig: S.optional(JobConfig),
    cacheConfig: S.optional(CacheConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAppRequest",
}) as any as S.Schema<CreateAppRequest>;
export type AppId = string;
export type AppArn = string;
export type CreateTime = Date;
export type UpdateTime = Date;
export type DefaultDomain = string;
export type LastDeployTime = Date;
export type ThumbnailUrl = string;
export type BranchName = string;
export interface ProductionBranch {
  lastDeployTime?: Date;
  status?: string;
  thumbnailUrl?: string;
  branchName?: string;
}
export const ProductionBranch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lastDeployTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
    thumbnailUrl: S.optional(S.String),
    branchName: S.optional(S.String),
  }),
).annotate({
  identifier: "ProductionBranch",
}) as any as S.Schema<ProductionBranch>;
export type RepositoryCloneMethod = "SSH" | "TOKEN" | "SIGV4" | (string & {});
export const RepositoryCloneMethod = /*@__PURE__*/ S.String;

export type WebhookCreateTime = Date;
export type WebAclArn = string;
export type WafStatus =
  | "ASSOCIATING"
  | "ASSOCIATION_FAILED"
  | "ASSOCIATION_SUCCESS"
  | "DISASSOCIATING"
  | "DISASSOCIATION_FAILED"
  | (string & {});
export const WafStatus = /*@__PURE__*/ S.String;

export type StatusReason = string;
export interface WafConfiguration {
  webAclArn?: string;
  wafStatus?: WafStatus;
  statusReason?: string;
}
export const WafConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webAclArn: S.optional(S.String),
    wafStatus: S.optional(WafStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "WafConfiguration",
}) as any as S.Schema<WafConfiguration>;
export interface App {
  appId: string;
  appArn: string;
  name: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
  repository?: string;
  platform?: Platform;
  createTime: Date;
  updateTime: Date;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  environmentVariables?: { [key: string]: string | undefined };
  defaultDomain?: string;
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  productionBranch?: ProductionBranch;
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  repositoryCloneMethod?: RepositoryCloneMethod;
  cacheConfig?: CacheConfig;
  webhookCreateTime?: Date;
  wafConfiguration?: WafConfiguration;
  jobConfig?: JobConfig;
}
export const App = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appArn: S.String,
    name: S.String,
    tags: S.optional(TagMap),
    description: S.optional(S.String),
    repository: S.optional(S.String),
    platform: S.optional(Platform),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    computeRoleArn: S.optional(S.String),
    iamServiceRoleArn: S.optional(S.String),
    environmentVariables: S.optional(EnvironmentVariables),
    defaultDomain: S.optional(S.String),
    enableBranchAutoBuild: S.optional(S.Boolean),
    enableBranchAutoDeletion: S.optional(S.Boolean),
    enableBasicAuth: S.optional(S.Boolean),
    basicAuthCredentials: S.optional(SensitiveString),
    customRules: S.optional(CustomRules),
    productionBranch: S.optional(ProductionBranch),
    buildSpec: S.optional(SensitiveString),
    customHeaders: S.optional(S.String),
    enableAutoBranchCreation: S.optional(S.Boolean),
    autoBranchCreationPatterns: S.optional(AutoBranchCreationPatterns),
    autoBranchCreationConfig: S.optional(AutoBranchCreationConfig),
    repositoryCloneMethod: S.optional(RepositoryCloneMethod),
    cacheConfig: S.optional(CacheConfig),
    webhookCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    wafConfiguration: S.optional(WafConfiguration),
    jobConfig: S.optional(JobConfig),
  }),
).annotate({ identifier: "App" }) as any as S.Schema<App>;
export interface CreateAppResult {
  app: App;
}
export const CreateAppResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ app: App }).pipe(ns),
).annotate({
  identifier: "CreateAppResult",
}) as any as S.Schema<CreateAppResult>;
export type EnvironmentName = string;
export type StackName = string;
export type DeploymentArtifacts = string;
export interface CreateBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
  stackName?: string;
  deploymentArtifacts?: string;
}
export const CreateBackendEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String,
    stackName: S.optional(S.String),
    deploymentArtifacts: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/backendenvironments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBackendEnvironmentRequest",
}) as any as S.Schema<CreateBackendEnvironmentRequest>;
export type BackendEnvironmentArn = string;
export interface BackendEnvironment {
  backendEnvironmentArn: string;
  environmentName: string;
  stackName?: string;
  deploymentArtifacts?: string;
  createTime: Date;
  updateTime: Date;
}
export const BackendEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    backendEnvironmentArn: S.String,
    environmentName: S.String,
    stackName: S.optional(S.String),
    deploymentArtifacts: S.optional(S.String),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "BackendEnvironment",
}) as any as S.Schema<BackendEnvironment>;
export interface CreateBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export const CreateBackendEnvironmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ backendEnvironment: BackendEnvironment }).pipe(ns),
).annotate({
  identifier: "CreateBackendEnvironmentResult",
}) as any as S.Schema<CreateBackendEnvironmentResult>;
export type EnableNotification = boolean;
export type EnableSkewProtection = boolean;
export type TTL = string;
export type DisplayName = string;
export type StackArn = string;
export interface Backend {
  stackArn?: string;
}
export const Backend = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stackArn: S.optional(S.String) }),
).annotate({ identifier: "Backend" }) as any as S.Schema<Backend>;
export interface CreateBranchRequest {
  appId: string;
  branchName: string;
  description?: string;
  stage?: Stage;
  framework?: string;
  enableNotification?: boolean;
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  tags?: { [key: string]: string | undefined };
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  displayName?: string;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export const CreateBranchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String,
    description: S.optional(S.String),
    stage: S.optional(Stage),
    framework: S.optional(S.String),
    enableNotification: S.optional(S.Boolean),
    enableAutoBuild: S.optional(S.Boolean),
    enableSkewProtection: S.optional(S.Boolean),
    environmentVariables: S.optional(EnvironmentVariables),
    basicAuthCredentials: S.optional(SensitiveString),
    enableBasicAuth: S.optional(S.Boolean),
    enablePerformanceMode: S.optional(S.Boolean),
    tags: S.optional(TagMap),
    buildSpec: S.optional(SensitiveString),
    ttl: S.optional(S.String),
    displayName: S.optional(S.String),
    enablePullRequestPreview: S.optional(S.Boolean),
    pullRequestEnvironmentName: S.optional(S.String),
    backendEnvironmentArn: S.optional(S.String),
    backend: S.optional(Backend),
    computeRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/branches" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBranchRequest",
}) as any as S.Schema<CreateBranchRequest>;
export type BranchArn = string;
export type CustomDomain = string;
export type CustomDomains = string[];
export const CustomDomains = /*@__PURE__*/ S.Array(S.String);
export type ActiveJobId = string;
export type TotalNumberOfJobs = string;
export type AssociatedResource = string;
export type AssociatedResources = string[];
export const AssociatedResources = /*@__PURE__*/ S.Array(S.String);
export interface Branch {
  branchArn: string;
  branchName: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  stage?: Stage;
  displayName?: string;
  enableNotification?: boolean;
  createTime: Date;
  updateTime: Date;
  environmentVariables?: { [key: string]: string | undefined };
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  customDomains?: string[];
  framework?: string;
  activeJobId?: string;
  totalNumberOfJobs?: string;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  thumbnailUrl?: string;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  associatedResources?: string[];
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  destinationBranch?: string;
  sourceBranch?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export const Branch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    branchArn: S.String,
    branchName: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    stage: S.optional(Stage),
    displayName: S.optional(S.String),
    enableNotification: S.optional(S.Boolean),
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    environmentVariables: S.optional(EnvironmentVariables),
    enableAutoBuild: S.optional(S.Boolean),
    enableSkewProtection: S.optional(S.Boolean),
    customDomains: S.optional(CustomDomains),
    framework: S.optional(S.String),
    activeJobId: S.optional(S.String),
    totalNumberOfJobs: S.optional(S.String),
    enableBasicAuth: S.optional(S.Boolean),
    enablePerformanceMode: S.optional(S.Boolean),
    thumbnailUrl: S.optional(S.String),
    basicAuthCredentials: S.optional(SensitiveString),
    buildSpec: S.optional(SensitiveString),
    ttl: S.optional(S.String),
    associatedResources: S.optional(AssociatedResources),
    enablePullRequestPreview: S.optional(S.Boolean),
    pullRequestEnvironmentName: S.optional(S.String),
    destinationBranch: S.optional(S.String),
    sourceBranch: S.optional(S.String),
    backendEnvironmentArn: S.optional(S.String),
    backend: S.optional(Backend),
    computeRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Branch" }) as any as S.Schema<Branch>;
export interface CreateBranchResult {
  branch: Branch;
}
export const CreateBranchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branch: Branch }).pipe(ns),
).annotate({
  identifier: "CreateBranchResult",
}) as any as S.Schema<CreateBranchResult>;
export type FileName = string;
export type MD5Hash = string;
export type FileMap = { [key: string]: string | undefined };
export const FileMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDeploymentRequest {
  appId: string;
  branchName: string;
  fileMap?: { [key: string]: string | undefined };
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    fileMap: S.optional(FileMap),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/apps/{appId}/branches/{branchName}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentRequest",
}) as any as S.Schema<CreateDeploymentRequest>;
export type JobId = string;
export type UploadUrl = string;
export type FileUploadUrls = { [key: string]: string | undefined };
export const FileUploadUrls = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDeploymentResult {
  jobId?: string;
  fileUploadUrls?: { [key: string]: string | undefined };
  zipUploadUrl: string;
}
export const CreateDeploymentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    fileUploadUrls: S.optional(FileUploadUrls),
    zipUploadUrl: S.String,
  }).pipe(ns),
).annotate({
  identifier: "CreateDeploymentResult",
}) as any as S.Schema<CreateDeploymentResult>;
export type DomainName = string;
export type EnableAutoSubDomain = boolean;
export type DomainPrefix = string;
export interface SubDomainSetting {
  prefix: string;
  branchName: string;
}
export const SubDomainSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ prefix: S.String, branchName: S.String }),
).annotate({
  identifier: "SubDomainSetting",
}) as any as S.Schema<SubDomainSetting>;
export type SubDomainSettings = SubDomainSetting[];
export const SubDomainSettings = /*@__PURE__*/ S.Array(SubDomainSetting);
export type AutoSubDomainCreationPattern = string;
export type AutoSubDomainCreationPatterns = string[];
export const AutoSubDomainCreationPatterns = /*@__PURE__*/ S.Array(S.String);
export type AutoSubDomainIAMRole = string;
export type CertificateType = "AMPLIFY_MANAGED" | "CUSTOM" | (string & {});
export const CertificateType = /*@__PURE__*/ S.String;

export type CertificateArn = string;
export interface CertificateSettings {
  type: CertificateType;
  customCertificateArn?: string;
}
export const CertificateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: CertificateType,
    customCertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateSettings",
}) as any as S.Schema<CertificateSettings>;
export interface CreateDomainAssociationRequest {
  appId: string;
  domainName: string;
  enableAutoSubDomain?: boolean;
  subDomainSettings: SubDomainSetting[];
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  certificateSettings?: CertificateSettings;
}
export const CreateDomainAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    domainName: S.String,
    enableAutoSubDomain: S.optional(S.Boolean),
    subDomainSettings: SubDomainSettings,
    autoSubDomainCreationPatterns: S.optional(AutoSubDomainCreationPatterns),
    autoSubDomainIAMRole: S.optional(S.String),
    certificateSettings: S.optional(CertificateSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainAssociationRequest",
}) as any as S.Schema<CreateDomainAssociationRequest>;
export type DomainAssociationArn = string;
export type DomainStatus =
  | "PENDING_VERIFICATION"
  | "IN_PROGRESS"
  | "AVAILABLE"
  | "IMPORTING_CUSTOM_CERTIFICATE"
  | "PENDING_DEPLOYMENT"
  | "AWAITING_APP_CNAME"
  | "FAILED"
  | "CREATING"
  | "REQUESTING_CERTIFICATE"
  | "UPDATING"
  | (string & {});
export const DomainStatus = /*@__PURE__*/ S.String;

export type UpdateStatus =
  | "REQUESTING_CERTIFICATE"
  | "PENDING_VERIFICATION"
  | "IMPORTING_CUSTOM_CERTIFICATE"
  | "PENDING_DEPLOYMENT"
  | "AWAITING_APP_CNAME"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export const UpdateStatus = /*@__PURE__*/ S.String;

export type CertificateVerificationDNSRecord = string;
export type Verified = boolean;
export type DNSRecord = string;
export interface SubDomain {
  subDomainSetting: SubDomainSetting;
  verified: boolean;
  dnsRecord: string;
}
export const SubDomain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subDomainSetting: SubDomainSetting,
    verified: S.Boolean,
    dnsRecord: S.String,
  }),
).annotate({ identifier: "SubDomain" }) as any as S.Schema<SubDomain>;
export type SubDomains = SubDomain[];
export const SubDomains = /*@__PURE__*/ S.Array(SubDomain);
export interface Certificate {
  type: CertificateType;
  customCertificateArn?: string;
  certificateVerificationDNSRecord?: string;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: CertificateType,
    customCertificateArn: S.optional(S.String),
    certificateVerificationDNSRecord: S.optional(S.String),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export interface DomainAssociation {
  domainAssociationArn: string;
  domainName: string;
  enableAutoSubDomain: boolean;
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  domainStatus: DomainStatus;
  updateStatus?: UpdateStatus;
  statusReason: string;
  certificateVerificationDNSRecord?: string;
  subDomains: SubDomain[];
  certificate?: Certificate;
}
export const DomainAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainAssociationArn: S.String,
    domainName: S.String,
    enableAutoSubDomain: S.Boolean,
    autoSubDomainCreationPatterns: S.optional(AutoSubDomainCreationPatterns),
    autoSubDomainIAMRole: S.optional(S.String),
    domainStatus: DomainStatus,
    updateStatus: S.optional(UpdateStatus),
    statusReason: S.String,
    certificateVerificationDNSRecord: S.optional(S.String),
    subDomains: SubDomains,
    certificate: S.optional(Certificate),
  }),
).annotate({
  identifier: "DomainAssociation",
}) as any as S.Schema<DomainAssociation>;
export interface CreateDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export const CreateDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainAssociation: DomainAssociation }).pipe(ns),
).annotate({
  identifier: "CreateDomainAssociationResult",
}) as any as S.Schema<CreateDomainAssociationResult>;
export interface CreateWebhookRequest {
  appId: string;
  branchName: string;
  description?: string;
}
export const CreateWebhookRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/webhooks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWebhookRequest",
}) as any as S.Schema<CreateWebhookRequest>;
export type WebhookArn = string;
export type WebhookId = string;
export type WebhookUrl = string;
export interface Webhook {
  webhookArn: string;
  webhookId: string;
  webhookUrl: string;
  appId?: string;
  branchName: string;
  description: string;
  createTime: Date;
  updateTime: Date;
}
export const Webhook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webhookArn: S.String,
    webhookId: S.String,
    webhookUrl: S.String,
    appId: S.optional(S.String),
    branchName: S.String,
    description: S.String,
    createTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Webhook" }) as any as S.Schema<Webhook>;
export interface CreateWebhookResult {
  webhook: Webhook;
}
export const CreateWebhookResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: Webhook }).pipe(ns),
).annotate({
  identifier: "CreateWebhookResult",
}) as any as S.Schema<CreateWebhookResult>;
export interface DeleteAppRequest {
  appId: string;
}
export const DeleteAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appId: S.String.pipe(T.HttpLabel("appId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/apps/{appId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAppRequest",
}) as any as S.Schema<DeleteAppRequest>;
export interface DeleteAppResult {
  app: App;
}
export const DeleteAppResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ app: App }).pipe(ns),
).annotate({
  identifier: "DeleteAppResult",
}) as any as S.Schema<DeleteAppResult>;
export interface DeleteBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
}
export const DeleteBackendEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/apps/{appId}/backendenvironments/{environmentName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackendEnvironmentRequest",
}) as any as S.Schema<DeleteBackendEnvironmentRequest>;
export interface DeleteBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export const DeleteBackendEnvironmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ backendEnvironment: BackendEnvironment }).pipe(ns),
).annotate({
  identifier: "DeleteBackendEnvironmentResult",
}) as any as S.Schema<DeleteBackendEnvironmentResult>;
export interface DeleteBranchRequest {
  appId: string;
  branchName: string;
}
export const DeleteBranchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/apps/{appId}/branches/{branchName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBranchRequest",
}) as any as S.Schema<DeleteBranchRequest>;
export interface DeleteBranchResult {
  branch: Branch;
}
export const DeleteBranchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branch: Branch }).pipe(ns),
).annotate({
  identifier: "DeleteBranchResult",
}) as any as S.Schema<DeleteBranchResult>;
export interface DeleteDomainAssociationRequest {
  appId: string;
  domainName: string;
}
export const DeleteDomainAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    domainName: S.String.pipe(T.HttpLabel("domainName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/apps/{appId}/domains/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainAssociationRequest",
}) as any as S.Schema<DeleteDomainAssociationRequest>;
export interface DeleteDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export const DeleteDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainAssociation: DomainAssociation }).pipe(ns),
).annotate({
  identifier: "DeleteDomainAssociationResult",
}) as any as S.Schema<DeleteDomainAssociationResult>;
export interface DeleteJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export type JobArn = string;
export type CommitId = string;
export type CommitMessage = string;
export type CommitTime = Date;
export type StartTime = Date;
export type JobStatus =
  | "CREATED"
  | "PENDING"
  | "PROVISIONING"
  | "RUNNING"
  | "FAILED"
  | "SUCCEED"
  | "CANCELLING"
  | "CANCELLED"
  | (string & {});
export const JobStatus = /*@__PURE__*/ S.String;

export type EndTime = Date;
export type JobType =
  | "RELEASE"
  | "RETRY"
  | "MANUAL"
  | "WEB_HOOK"
  | (string & {});
export const JobType = /*@__PURE__*/ S.String;

export type SourceUrl = string;
export type SourceUrlType = "ZIP" | "BUCKET_PREFIX" | (string & {});
export const SourceUrlType = /*@__PURE__*/ S.String;

export interface JobSummary {
  jobArn: string;
  jobId: string;
  commitId?: string;
  commitMessage?: string;
  commitTime?: Date;
  startTime: Date;
  status: JobStatus;
  endTime?: Date;
  jobType?: JobType;
  sourceUrl?: string;
  sourceUrlType?: SourceUrlType;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobId: S.String,
    commitId: S.optional(S.String),
    commitMessage: S.optional(S.String),
    commitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: JobStatus,
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    jobType: S.optional(JobType),
    sourceUrl: S.optional(S.String),
    sourceUrlType: S.optional(SourceUrlType),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export interface DeleteJobResult {
  jobSummary: JobSummary;
}
export const DeleteJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobSummary: JobSummary }).pipe(ns),
).annotate({
  identifier: "DeleteJobResult",
}) as any as S.Schema<DeleteJobResult>;
export interface DeleteWebhookRequest {
  webhookId: string;
}
export const DeleteWebhookRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhookId: S.String.pipe(T.HttpLabel("webhookId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/webhooks/{webhookId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWebhookRequest",
}) as any as S.Schema<DeleteWebhookRequest>;
export interface DeleteWebhookResult {
  webhook: Webhook;
}
export const DeleteWebhookResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: Webhook }).pipe(ns),
).annotate({
  identifier: "DeleteWebhookResult",
}) as any as S.Schema<DeleteWebhookResult>;
export interface GenerateAccessLogsRequest {
  startTime?: Date;
  endTime?: Date;
  domainName: string;
  appId: string;
}
export const GenerateAccessLogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    domainName: S.String,
    appId: S.String.pipe(T.HttpLabel("appId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/accesslogs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateAccessLogsRequest",
}) as any as S.Schema<GenerateAccessLogsRequest>;
export type LogUrl = string;
export interface GenerateAccessLogsResult {
  logUrl?: string;
}
export const GenerateAccessLogsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logUrl: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GenerateAccessLogsResult",
}) as any as S.Schema<GenerateAccessLogsResult>;
export interface GetAppRequest {
  appId: string;
}
export const GetAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appId: S.String.pipe(T.HttpLabel("appId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAppRequest" }) as any as S.Schema<GetAppRequest>;
export interface GetAppResult {
  app: App;
}
export const GetAppResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ app: App }).pipe(ns),
).annotate({ identifier: "GetAppResult" }) as any as S.Schema<GetAppResult>;
export type ArtifactId = string;
export interface GetArtifactUrlRequest {
  artifactId: string;
}
export const GetArtifactUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifactId: S.String.pipe(T.HttpLabel("artifactId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/artifacts/{artifactId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetArtifactUrlRequest",
}) as any as S.Schema<GetArtifactUrlRequest>;
export type ArtifactUrl = string;
export interface GetArtifactUrlResult {
  artifactId: string;
  artifactUrl: string;
}
export const GetArtifactUrlResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifactId: S.String, artifactUrl: S.String }).pipe(ns),
).annotate({
  identifier: "GetArtifactUrlResult",
}) as any as S.Schema<GetArtifactUrlResult>;
export interface GetBackendEnvironmentRequest {
  appId: string;
  environmentName: string;
}
export const GetBackendEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/apps/{appId}/backendenvironments/{environmentName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBackendEnvironmentRequest",
}) as any as S.Schema<GetBackendEnvironmentRequest>;
export interface GetBackendEnvironmentResult {
  backendEnvironment: BackendEnvironment;
}
export const GetBackendEnvironmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ backendEnvironment: BackendEnvironment }).pipe(ns),
).annotate({
  identifier: "GetBackendEnvironmentResult",
}) as any as S.Schema<GetBackendEnvironmentResult>;
export interface GetBranchRequest {
  appId: string;
  branchName: string;
}
export const GetBranchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/branches/{branchName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBranchRequest",
}) as any as S.Schema<GetBranchRequest>;
export interface GetBranchResult {
  branch: Branch;
}
export const GetBranchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branch: Branch }).pipe(ns),
).annotate({
  identifier: "GetBranchResult",
}) as any as S.Schema<GetBranchResult>;
export interface GetDomainAssociationRequest {
  appId: string;
  domainName: string;
}
export const GetDomainAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    domainName: S.String.pipe(T.HttpLabel("domainName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/domains/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainAssociationRequest",
}) as any as S.Schema<GetDomainAssociationRequest>;
export interface GetDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export const GetDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainAssociation: DomainAssociation }).pipe(ns),
).annotate({
  identifier: "GetDomainAssociationResult",
}) as any as S.Schema<GetDomainAssociationResult>;
export interface GetJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export type StepName = string;
export type ArtifactsUrl = string;
export type TestArtifactsUrl = string;
export type TestConfigUrl = string;
export type ThumbnailName = string;
export type Screenshots = { [key: string]: string | undefined };
export const Screenshots = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Context = string;
export interface Step {
  stepName: string;
  startTime: Date;
  status: JobStatus;
  endTime?: Date;
  logUrl?: string;
  artifactsUrl?: string;
  testArtifactsUrl?: string;
  testConfigUrl?: string;
  screenshots?: { [key: string]: string | undefined };
  statusReason?: string;
  context?: string;
}
export const Step = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stepName: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: JobStatus,
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    logUrl: S.optional(S.String),
    artifactsUrl: S.optional(S.String),
    testArtifactsUrl: S.optional(S.String),
    testConfigUrl: S.optional(S.String),
    screenshots: S.optional(Screenshots),
    statusReason: S.optional(S.String),
    context: S.optional(S.String),
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export type Steps = Step[];
export const Steps = /*@__PURE__*/ S.Array(Step);
export interface Job {
  summary: JobSummary;
  steps: Step[];
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ summary: JobSummary, steps: Steps }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export interface GetJobResult {
  job: Job;
}
export const GetJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ job: Job }).pipe(ns),
).annotate({ identifier: "GetJobResult" }) as any as S.Schema<GetJobResult>;
export interface GetWebhookRequest {
  webhookId: string;
}
export const GetWebhookRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhookId: S.String.pipe(T.HttpLabel("webhookId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/webhooks/{webhookId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWebhookRequest",
}) as any as S.Schema<GetWebhookRequest>;
export interface GetWebhookResult {
  webhook: Webhook;
}
export const GetWebhookResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: Webhook }).pipe(ns),
).annotate({
  identifier: "GetWebhookResult",
}) as any as S.Schema<GetWebhookResult>;
export type NextToken = string;
export type MaxResultsForListApps = number;
export interface ListAppsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAppsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAppsRequest",
}) as any as S.Schema<ListAppsRequest>;
export type Apps = App[];
export const Apps = /*@__PURE__*/ S.Array(App);
export interface ListAppsResult {
  apps: App[];
  nextToken?: string;
}
export const ListAppsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apps: Apps, nextToken: S.optional(S.String) }).pipe(ns),
).annotate({ identifier: "ListAppsResult" }) as any as S.Schema<ListAppsResult>;
export type MaxResults = number;
export interface ListArtifactsRequest {
  appId: string;
  branchName: string;
  jobId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListArtifactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}/artifacts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListArtifactsRequest",
}) as any as S.Schema<ListArtifactsRequest>;
export type ArtifactFileName = string;
export interface Artifact {
  artifactFileName: string;
  artifactId: string;
}
export const Artifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifactFileName: S.String, artifactId: S.String }),
).annotate({ identifier: "Artifact" }) as any as S.Schema<Artifact>;
export type Artifacts = Artifact[];
export const Artifacts = /*@__PURE__*/ S.Array(Artifact);
export interface ListArtifactsResult {
  artifacts: Artifact[];
  nextToken?: string;
}
export const ListArtifactsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifacts: Artifacts, nextToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ListArtifactsResult",
}) as any as S.Schema<ListArtifactsResult>;
export interface ListBackendEnvironmentsRequest {
  appId: string;
  environmentName?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListBackendEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.optional(S.String).pipe(T.HttpQuery("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/backendenvironments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBackendEnvironmentsRequest",
}) as any as S.Schema<ListBackendEnvironmentsRequest>;
export type BackendEnvironments = BackendEnvironment[];
export const BackendEnvironments = /*@__PURE__*/ S.Array(BackendEnvironment);
export interface ListBackendEnvironmentsResult {
  backendEnvironments: BackendEnvironment[];
  nextToken?: string;
}
export const ListBackendEnvironmentsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    backendEnvironments: BackendEnvironments,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBackendEnvironmentsResult",
}) as any as S.Schema<ListBackendEnvironmentsResult>;
export interface ListBranchesRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListBranchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/branches" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBranchesRequest",
}) as any as S.Schema<ListBranchesRequest>;
export type Branches = Branch[];
export const Branches = /*@__PURE__*/ S.Array(Branch);
export interface ListBranchesResult {
  branches: Branch[];
  nextToken?: string;
}
export const ListBranchesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branches: Branches, nextToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ListBranchesResult",
}) as any as S.Schema<ListBranchesResult>;
export interface ListDomainAssociationsRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDomainAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainAssociationsRequest",
}) as any as S.Schema<ListDomainAssociationsRequest>;
export type DomainAssociations = DomainAssociation[];
export const DomainAssociations = /*@__PURE__*/ S.Array(DomainAssociation);
export interface ListDomainAssociationsResult {
  domainAssociations: DomainAssociation[];
  nextToken?: string;
}
export const ListDomainAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainAssociations: DomainAssociations,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainAssociationsResult",
}) as any as S.Schema<ListDomainAssociationsResult>;
export interface ListJobsRequest {
  appId: string;
  branchName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/apps/{appId}/branches/{branchName}/jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export type JobSummaries = JobSummary[];
export const JobSummaries = /*@__PURE__*/ S.Array(JobSummary);
export interface ListJobsResult {
  jobSummaries: JobSummary[];
  nextToken?: string;
}
export const ListJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobSummaries: JobSummaries,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "ListJobsResult" }) as any as S.Schema<ListJobsResult>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      ns,
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
  S.Struct({ tags: S.optional(TagMap) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWebhooksRequest {
  appId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWebhooksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/apps/{appId}/webhooks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWebhooksRequest",
}) as any as S.Schema<ListWebhooksRequest>;
export type Webhooks = Webhook[];
export const Webhooks = /*@__PURE__*/ S.Array(Webhook);
export interface ListWebhooksResult {
  webhooks: Webhook[];
  nextToken?: string;
}
export const ListWebhooksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhooks: Webhooks, nextToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ListWebhooksResult",
}) as any as S.Schema<ListWebhooksResult>;
export interface StartDeploymentRequest {
  appId: string;
  branchName: string;
  jobId?: string;
  sourceUrl?: string;
  sourceUrlType?: SourceUrlType;
}
export const StartDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.optional(S.String),
    sourceUrl: S.optional(S.String),
    sourceUrlType: S.optional(SourceUrlType),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/apps/{appId}/branches/{branchName}/deployments/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDeploymentRequest",
}) as any as S.Schema<StartDeploymentRequest>;
export interface StartDeploymentResult {
  jobSummary: JobSummary;
}
export const StartDeploymentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobSummary: JobSummary }).pipe(ns),
).annotate({
  identifier: "StartDeploymentResult",
}) as any as S.Schema<StartDeploymentResult>;
export type JobReason = string;
export interface StartJobRequest {
  appId: string;
  branchName: string;
  jobId?: string;
  jobType: JobType;
  jobReason?: string;
  commitId?: string;
  commitMessage?: string;
  commitTime?: Date;
}
export const StartJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.optional(S.String),
    jobType: JobType,
    jobReason: S.optional(S.String),
    commitId: S.optional(S.String),
    commitMessage: S.optional(S.String),
    commitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/apps/{appId}/branches/{branchName}/jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartJobRequest",
}) as any as S.Schema<StartJobRequest>;
export interface StartJobResult {
  jobSummary: JobSummary;
}
export const StartJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobSummary: JobSummary }).pipe(ns),
).annotate({ identifier: "StartJobResult" }) as any as S.Schema<StartJobResult>;
export interface StopJobRequest {
  appId: string;
  branchName: string;
  jobId: string;
}
export const StopJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/apps/{appId}/branches/{branchName}/jobs/{jobId}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "StopJobRequest" }) as any as S.Schema<StopJobRequest>;
export interface StopJobResult {
  jobSummary: JobSummary;
}
export const StopJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobSummary: JobSummary }).pipe(ns),
).annotate({ identifier: "StopJobResult" }) as any as S.Schema<StopJobResult>;
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
      ns,
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
  S.Struct({}).pipe(ns),
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
      ns,
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAppRequest {
  appId: string;
  name?: string;
  description?: string;
  platform?: Platform;
  computeRoleArn?: string;
  iamServiceRoleArn?: string;
  environmentVariables?: { [key: string]: string | undefined };
  enableBranchAutoBuild?: boolean;
  enableBranchAutoDeletion?: boolean;
  enableBasicAuth?: boolean;
  basicAuthCredentials?: string | redacted.Redacted<string>;
  customRules?: CustomRule[];
  buildSpec?: string | redacted.Redacted<string>;
  customHeaders?: string;
  enableAutoBranchCreation?: boolean;
  autoBranchCreationPatterns?: string[];
  autoBranchCreationConfig?: AutoBranchCreationConfig;
  repository?: string;
  oauthToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  jobConfig?: JobConfig;
  cacheConfig?: CacheConfig;
}
export const UpdateAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    platform: S.optional(Platform),
    computeRoleArn: S.optional(S.String),
    iamServiceRoleArn: S.optional(S.String),
    environmentVariables: S.optional(EnvironmentVariables),
    enableBranchAutoBuild: S.optional(S.Boolean),
    enableBranchAutoDeletion: S.optional(S.Boolean),
    enableBasicAuth: S.optional(S.Boolean),
    basicAuthCredentials: S.optional(SensitiveString),
    customRules: S.optional(CustomRules),
    buildSpec: S.optional(SensitiveString),
    customHeaders: S.optional(S.String),
    enableAutoBranchCreation: S.optional(S.Boolean),
    autoBranchCreationPatterns: S.optional(AutoBranchCreationPatterns),
    autoBranchCreationConfig: S.optional(AutoBranchCreationConfig),
    repository: S.optional(S.String),
    oauthToken: S.optional(SensitiveString),
    accessToken: S.optional(SensitiveString),
    jobConfig: S.optional(JobConfig),
    cacheConfig: S.optional(CacheConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAppRequest",
}) as any as S.Schema<UpdateAppRequest>;
export interface UpdateAppResult {
  app: App;
}
export const UpdateAppResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ app: App }).pipe(ns),
).annotate({
  identifier: "UpdateAppResult",
}) as any as S.Schema<UpdateAppResult>;
export interface UpdateBranchRequest {
  appId: string;
  branchName: string;
  description?: string;
  framework?: string;
  stage?: Stage;
  enableNotification?: boolean;
  enableAutoBuild?: boolean;
  enableSkewProtection?: boolean;
  environmentVariables?: { [key: string]: string | undefined };
  basicAuthCredentials?: string | redacted.Redacted<string>;
  enableBasicAuth?: boolean;
  enablePerformanceMode?: boolean;
  buildSpec?: string | redacted.Redacted<string>;
  ttl?: string;
  displayName?: string;
  enablePullRequestPreview?: boolean;
  pullRequestEnvironmentName?: string;
  backendEnvironmentArn?: string;
  backend?: Backend;
  computeRoleArn?: string;
}
export const UpdateBranchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    branchName: S.String.pipe(T.HttpLabel("branchName")),
    description: S.optional(S.String),
    framework: S.optional(S.String),
    stage: S.optional(Stage),
    enableNotification: S.optional(S.Boolean),
    enableAutoBuild: S.optional(S.Boolean),
    enableSkewProtection: S.optional(S.Boolean),
    environmentVariables: S.optional(EnvironmentVariables),
    basicAuthCredentials: S.optional(SensitiveString),
    enableBasicAuth: S.optional(S.Boolean),
    enablePerformanceMode: S.optional(S.Boolean),
    buildSpec: S.optional(SensitiveString),
    ttl: S.optional(S.String),
    displayName: S.optional(S.String),
    enablePullRequestPreview: S.optional(S.Boolean),
    pullRequestEnvironmentName: S.optional(S.String),
    backendEnvironmentArn: S.optional(S.String),
    backend: S.optional(Backend),
    computeRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/branches/{branchName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBranchRequest",
}) as any as S.Schema<UpdateBranchRequest>;
export interface UpdateBranchResult {
  branch: Branch;
}
export const UpdateBranchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branch: Branch }).pipe(ns),
).annotate({
  identifier: "UpdateBranchResult",
}) as any as S.Schema<UpdateBranchResult>;
export interface UpdateDomainAssociationRequest {
  appId: string;
  domainName: string;
  enableAutoSubDomain?: boolean;
  subDomainSettings?: SubDomainSetting[];
  autoSubDomainCreationPatterns?: string[];
  autoSubDomainIAMRole?: string;
  certificateSettings?: CertificateSettings;
}
export const UpdateDomainAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    domainName: S.String.pipe(T.HttpLabel("domainName")),
    enableAutoSubDomain: S.optional(S.Boolean),
    subDomainSettings: S.optional(SubDomainSettings),
    autoSubDomainCreationPatterns: S.optional(AutoSubDomainCreationPatterns),
    autoSubDomainIAMRole: S.optional(S.String),
    certificateSettings: S.optional(CertificateSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/apps/{appId}/domains/{domainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainAssociationRequest",
}) as any as S.Schema<UpdateDomainAssociationRequest>;
export interface UpdateDomainAssociationResult {
  domainAssociation: DomainAssociation;
}
export const UpdateDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainAssociation: DomainAssociation }).pipe(ns),
).annotate({
  identifier: "UpdateDomainAssociationResult",
}) as any as S.Schema<UpdateDomainAssociationResult>;
export interface UpdateWebhookRequest {
  webhookId: string;
  branchName?: string;
  description?: string;
}
export const UpdateWebhookRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webhookId: S.String.pipe(T.HttpLabel("webhookId")),
    branchName: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/webhooks/{webhookId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWebhookRequest",
}) as any as S.Schema<UpdateWebhookRequest>;
export interface UpdateWebhookResult {
  webhook: Webhook;
}
export const UpdateWebhookResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webhook: Webhook }).pipe(ns),
).annotate({
  identifier: "UpdateWebhookResult",
}) as any as S.Schema<UpdateWebhookResult>;
export type ErrorMessage = string;
export type Code = string;
export type CreateAppError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new Amplify app.
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResult,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppRequest,
  output: CreateAppResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApp",
}));

export type CreateBackendEnvironmentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const createBackendEnvironment: API.OperationMethod<
  CreateBackendEnvironmentRequest,
  CreateBackendEnvironmentResult,
  CreateBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackendEnvironmentRequest,
  output: CreateBackendEnvironmentResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendEnvironment",
}));

export type CreateBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new branch for an Amplify app.
 */
export const createBranch: API.OperationMethod<
  CreateBranchRequest,
  CreateBranchResult,
  CreateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBranchRequest,
  output: CreateBranchResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBranch",
}));

export type CreateDeploymentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a deployment for a manually deployed Amplify app. Manually deployed apps are
 * not connected to a Git repository.
 *
 * The maximum duration between the `CreateDeployment` call and the
 * `StartDeployment` call cannot exceed 8 hours. If the duration exceeds 8
 * hours, the `StartDeployment` call and the associated `Job` will
 * fail.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResult,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new domain association for an Amplify app. This action associates a custom
 * domain with the Amplify app
 */
export const createDomainAssociation: API.OperationMethod<
  CreateDomainAssociationRequest,
  CreateDomainAssociationResult,
  CreateDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainAssociationRequest,
  output: CreateDomainAssociationResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainAssociation",
}));

export type CreateWebhookError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new webhook on an Amplify app.
 */
export const createWebhook: API.OperationMethod<
  CreateWebhookRequest,
  CreateWebhookResult,
  CreateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebhookRequest,
  output: CreateWebhookResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebhook",
}));

export type DeleteAppError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes an existing Amplify app specified by an app ID.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResult,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppRequest,
  output: DeleteAppResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteBackendEnvironmentError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const deleteBackendEnvironment: API.OperationMethod<
  DeleteBackendEnvironmentRequest,
  DeleteBackendEnvironmentResult,
  DeleteBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackendEnvironmentRequest,
  output: DeleteBackendEnvironmentResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendEnvironment",
}));

export type DeleteBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a branch for an Amplify app.
 */
export const deleteBranch: API.OperationMethod<
  DeleteBranchRequest,
  DeleteBranchResult,
  DeleteBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBranchRequest,
  output: DeleteBranchResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBranch",
}));

export type DeleteDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a domain association for an Amplify app.
 */
export const deleteDomainAssociation: API.OperationMethod<
  DeleteDomainAssociationRequest,
  DeleteDomainAssociationResult,
  DeleteDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainAssociationRequest,
  output: DeleteDomainAssociationResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainAssociation",
}));

export type DeleteJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a job for a branch of an Amplify app.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResult,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteWebhookError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Deletes a webhook.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookRequest,
  DeleteWebhookResult,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebhookRequest,
  output: DeleteWebhookResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
}));

export type GenerateAccessLogsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the website access logs for a specific time range using a presigned URL.
 */
export const generateAccessLogs: API.OperationMethod<
  GenerateAccessLogsRequest,
  GenerateAccessLogsResult,
  GenerateAccessLogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateAccessLogsRequest,
  output: GenerateAccessLogsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateAccessLogs",
}));

export type GetAppError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns an existing Amplify app specified by an app ID.
 */
export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResult,
  GetAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppRequest,
  output: GetAppResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApp",
}));

export type GetArtifactUrlError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the artifact info that corresponds to an artifact id.
 */
export const getArtifactUrl: API.OperationMethod<
  GetArtifactUrlRequest,
  GetArtifactUrlResult,
  GetArtifactUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArtifactUrlRequest,
  output: GetArtifactUrlResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArtifactUrl",
}));

export type GetBackendEnvironmentError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a backend environment for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const getBackendEnvironment: API.OperationMethod<
  GetBackendEnvironmentRequest,
  GetBackendEnvironmentResult,
  GetBackendEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBackendEnvironmentRequest,
  output: GetBackendEnvironmentResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendEnvironment",
}));

export type GetBranchError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a branch for an Amplify app.
 */
export const getBranch: API.OperationMethod<
  GetBranchRequest,
  GetBranchResult,
  GetBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBranchRequest,
  output: GetBranchResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBranch",
}));

export type GetDomainAssociationError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the domain information for an Amplify app.
 */
export const getDomainAssociation: API.OperationMethod<
  GetDomainAssociationRequest,
  GetDomainAssociationResult,
  GetDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainAssociationRequest,
  output: GetDomainAssociationResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainAssociation",
}));

export type GetJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a job for a branch of an Amplify app.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResult,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetWebhookError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the webhook information that corresponds to a specified webhook ID.
 */
export const getWebhook: API.OperationMethod<
  GetWebhookRequest,
  GetWebhookResult,
  GetWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebhookRequest,
  output: GetWebhookResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebhook",
}));

export type ListAppsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of the existing Amplify apps.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsRequest,
  ListAppsResult,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  App
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAppsRequest,
  output: ListAppsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListArtifactsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of end-to-end testing artifacts for a specified app, branch, and
 * job.
 *
 * To return the build artifacts, use the GetJob API.
 *
 * For more information about Amplify testing support, see Setting up
 * end-to-end Cypress tests for your Amplify application in the
 * *Amplify Hosting User Guide*.
 */
export const listArtifacts: API.OperationMethod<
  ListArtifactsRequest,
  ListArtifactsResult,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListArtifactsRequest,
  output: ListArtifactsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
}));

export type ListBackendEnvironmentsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the backend environments for an Amplify app.
 *
 * This API is available only to Amplify Gen 1 applications where the
 * backend is created using Amplify Studio or the Amplify
 * command line interface (CLI). This API isn’t available to Amplify Gen 2
 * applications. When you deploy an application with Amplify Gen 2, you provision the app's
 * backend infrastructure using Typescript code.
 */
export const listBackendEnvironments: API.OperationMethod<
  ListBackendEnvironmentsRequest,
  ListBackendEnvironmentsResult,
  ListBackendEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBackendEnvironmentsRequest,
  output: ListBackendEnvironmentsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendEnvironments",
}));

export type ListBranchesError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the branches of an Amplify app.
 */
export const listBranches: API.PaginatedOperationMethod<
  ListBranchesRequest,
  ListBranchesResult,
  ListBranchesError,
  Credentials | HttpClient.HttpClient,
  Branch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBranchesRequest,
  output: ListBranchesResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "branches",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainAssociationsError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns the domain associations for an Amplify app.
 */
export const listDomainAssociations: API.PaginatedOperationMethod<
  ListDomainAssociationsRequest,
  ListDomainAssociationsResult,
  ListDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  DomainAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainAssociationsRequest,
  output: ListDomainAssociationsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domainAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Lists the jobs for a branch of an Amplify app.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of tags for a specified Amazon Resource Name (ARN).
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
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWebhooksError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Returns a list of webhooks for an Amplify app.
 */
export const listWebhooks: API.OperationMethod<
  ListWebhooksRequest,
  ListWebhooksResult,
  ListWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListWebhooksRequest,
  output: ListWebhooksResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebhooks",
}));

export type StartDeploymentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Starts a deployment for a manually deployed app. Manually deployed apps are not
 * connected to a Git repository.
 *
 * The maximum duration between the `CreateDeployment` call and the
 * `StartDeployment` call cannot exceed 8 hours. If the duration exceeds 8
 * hours, the `StartDeployment` call and the associated `Job` will
 * fail.
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  StartDeploymentResult,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDeploymentRequest,
  output: StartDeploymentResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

export type StartJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Starts a new job for a branch of an Amplify app.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResult,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRequest,
  output: StartJobResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJob",
}));

export type StopJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Stops a job that is in progress for a branch of an Amplify app.
 */
export const stopJob: API.OperationMethod<
  StopJobRequest,
  StopJobResult,
  StopJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopJobRequest,
  output: StopJobResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJob",
}));

export type TagResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Tags the resource with a tag key and value.
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
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalFailureException
  | ResourceNotFoundException
  | TimeoutException
  | CommonErrors;
/**
 * Untags a resource with a specified Amazon Resource Name (ARN).
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
    BadRequestException,
    InternalFailureException,
    ResourceNotFoundException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates an existing Amplify app.
 */
export const updateApp: API.OperationMethod<
  UpdateAppRequest,
  UpdateAppResult,
  UpdateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAppRequest,
  output: UpdateAppResult,
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApp",
}));

export type UpdateBranchError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates a branch for an Amplify app.
 */
export const updateBranch: API.OperationMethod<
  UpdateBranchRequest,
  UpdateBranchResult,
  UpdateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBranchRequest,
  output: UpdateBranchResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBranch",
}));

export type UpdateDomainAssociationError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Creates a new domain association for an Amplify app.
 */
export const updateDomainAssociation: API.OperationMethod<
  UpdateDomainAssociationRequest,
  UpdateDomainAssociationResult,
  UpdateDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainAssociationRequest,
  output: UpdateDomainAssociationResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainAssociation",
}));

export type UpdateWebhookError =
  | BadRequestException
  | DependentServiceFailureException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | TimeoutException
  | CommonErrors;
/**
 * Updates a webhook.
 */
export const updateWebhook: API.OperationMethod<
  UpdateWebhookRequest,
  UpdateWebhookResult,
  UpdateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWebhookRequest,
  output: UpdateWebhookResult,
  errors: [
    BadRequestException,
    DependentServiceFailureException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
    TimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebhook",
}));
