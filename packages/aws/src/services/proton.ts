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
  sdkId: "Proton",
  serviceShapeName: "AwsProton20200720",
});
const auth = T.AwsAuthSigv4({ name: "proton" });
const ver = T.ServiceVersion("2020-07-20");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://proton-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://proton-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://proton.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://proton.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type EnvironmentAccountConnectionId = string;
export interface AcceptEnvironmentAccountConnectionInput {
  id: string;
}
export const AcceptEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AcceptEnvironmentAccountConnectionInput",
}) as any as S.Schema<AcceptEnvironmentAccountConnectionInput>;
export type EnvironmentAccountConnectionArn = string;
export type AwsAccountId = string;
export type Arn = string;
export type ResourceName = string;
export type EnvironmentAccountConnectionStatus = string;
export type RoleArn = string;
export interface EnvironmentAccountConnection {
  id: string;
  arn: string;
  managementAccountId: string;
  environmentAccountId: string;
  roleArn: string;
  environmentName: string;
  requestedAt: Date;
  lastModifiedAt: Date;
  status: string;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export const EnvironmentAccountConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    managementAccountId: S.String,
    environmentAccountId: S.String,
    roleArn: S.String,
    environmentName: S.String,
    requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    componentRoleArn: S.optional(S.String),
    codebuildRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentAccountConnection",
}) as any as S.Schema<EnvironmentAccountConnection>;
export interface AcceptEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export const AcceptEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ environmentAccountConnection: EnvironmentAccountConnection }),
).annotate({
  identifier: "AcceptEnvironmentAccountConnectionOutput",
}) as any as S.Schema<AcceptEnvironmentAccountConnectionOutput>;
export interface CancelComponentDeploymentInput {
  componentName: string;
}
export const CancelComponentDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ componentName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelComponentDeploymentInput",
}) as any as S.Schema<CancelComponentDeploymentInput>;
export type Description = string | redacted.Redacted<string>;
export type ComponentArn = string;
export type DeploymentStatus = string;
export type StatusMessage = string | redacted.Redacted<string>;
export type SpecContents = string | redacted.Redacted<string>;
export type DeploymentId = string;
export interface Component {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  createdAt: Date;
  lastModifiedAt: Date;
  lastDeploymentAttemptedAt?: Date;
  lastDeploymentSucceededAt?: Date;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  serviceSpec?: string | redacted.Redacted<string>;
  lastClientRequestToken?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const Component = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    arn: S.String,
    environmentName: S.String,
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastDeploymentSucceededAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    serviceSpec: S.optional(SensitiveString),
    lastClientRequestToken: S.optional(S.String),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({ identifier: "Component" }) as any as S.Schema<Component>;
export interface CancelComponentDeploymentOutput {
  component: Component;
}
export const CancelComponentDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ component: Component }),
).annotate({
  identifier: "CancelComponentDeploymentOutput",
}) as any as S.Schema<CancelComponentDeploymentOutput>;
export interface CancelEnvironmentDeploymentInput {
  environmentName: string;
}
export const CancelEnvironmentDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelEnvironmentDeploymentInput",
}) as any as S.Schema<CancelEnvironmentDeploymentInput>;
export type EnvironmentArn = string;
export type TemplateVersionPart = string;
export type Provisioning = string;
export type RepositoryArn = string;
export type RepositoryProvider = string;
export type RepositoryName = string;
export type GitBranchName = string;
export interface RepositoryBranch {
  arn: string;
  provider: string;
  name: string;
  branch: string;
}
export const RepositoryBranch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    provider: S.String,
    name: S.String,
    branch: S.String,
  }),
).annotate({
  identifier: "RepositoryBranch",
}) as any as S.Schema<RepositoryBranch>;
export interface Environment {
  name: string;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  arn: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  environmentAccountId?: string;
  spec?: string | redacted.Redacted<string>;
  provisioning?: string;
  provisioningRepository?: RepositoryBranch;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    arn: S.String,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    protonServiceRoleArn: S.optional(S.String),
    environmentAccountConnectionId: S.optional(S.String),
    environmentAccountId: S.optional(S.String),
    spec: S.optional(SensitiveString),
    provisioning: S.optional(S.String),
    provisioningRepository: S.optional(RepositoryBranch),
    componentRoleArn: S.optional(S.String),
    codebuildRoleArn: S.optional(S.String),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface CancelEnvironmentDeploymentOutput {
  environment: Environment;
}
export const CancelEnvironmentDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: Environment }),
).annotate({
  identifier: "CancelEnvironmentDeploymentOutput",
}) as any as S.Schema<CancelEnvironmentDeploymentOutput>;
export interface CancelServiceInstanceDeploymentInput {
  serviceInstanceName: string;
  serviceName: string;
}
export const CancelServiceInstanceDeploymentInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ serviceInstanceName: S.String, serviceName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CancelServiceInstanceDeploymentInput",
}) as any as S.Schema<CancelServiceInstanceDeploymentInput>;
export type ServiceInstanceArn = string;
export interface ServiceInstance {
  name: string;
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  serviceName: string;
  environmentName: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  lastClientRequestToken?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const ServiceInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    serviceName: S.String,
    environmentName: S.String,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    spec: S.optional(SensitiveString),
    lastClientRequestToken: S.optional(S.String),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceInstance",
}) as any as S.Schema<ServiceInstance>;
export interface CancelServiceInstanceDeploymentOutput {
  serviceInstance: ServiceInstance;
}
export const CancelServiceInstanceDeploymentOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ serviceInstance: ServiceInstance }),
).annotate({
  identifier: "CancelServiceInstanceDeploymentOutput",
}) as any as S.Schema<CancelServiceInstanceDeploymentOutput>;
export interface CancelServicePipelineDeploymentInput {
  serviceName: string;
}
export const CancelServicePipelineDeploymentInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ serviceName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CancelServicePipelineDeploymentInput",
}) as any as S.Schema<CancelServicePipelineDeploymentInput>;
export interface ServicePipeline {
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const ServicePipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    spec: S.optional(SensitiveString),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServicePipeline",
}) as any as S.Schema<ServicePipeline>;
export interface CancelServicePipelineDeploymentOutput {
  pipeline: ServicePipeline;
}
export const CancelServicePipelineDeploymentOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ pipeline: ServicePipeline }),
).annotate({
  identifier: "CancelServicePipelineDeploymentOutput",
}) as any as S.Schema<CancelServicePipelineDeploymentOutput>;
export type TemplateFileContents = string | redacted.Redacted<string>;
export type TemplateManifestContents = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type ClientToken = string;
export interface CreateComponentInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  serviceName?: string;
  serviceInstanceName?: string;
  environmentName?: string;
  templateFile: string | redacted.Redacted<string>;
  manifest: string | redacted.Redacted<string>;
  serviceSpec?: string | redacted.Redacted<string>;
  tags?: Tag[];
  clientToken?: string;
}
export const CreateComponentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    environmentName: S.optional(S.String),
    templateFile: SensitiveString,
    manifest: SensitiveString,
    serviceSpec: S.optional(SensitiveString),
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateComponentInput",
}) as any as S.Schema<CreateComponentInput>;
export interface CreateComponentOutput {
  component: Component;
}
export const CreateComponentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ component: Component }),
).annotate({
  identifier: "CreateComponentOutput",
}) as any as S.Schema<CreateComponentOutput>;
export interface RepositoryBranchInput {
  provider: string;
  name: string;
  branch: string;
}
export const RepositoryBranchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ provider: S.String, name: S.String, branch: S.String }),
).annotate({
  identifier: "RepositoryBranchInput",
}) as any as S.Schema<RepositoryBranchInput>;
export interface CreateEnvironmentInput {
  name: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion?: string;
  description?: string | redacted.Redacted<string>;
  spec: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  tags?: Tag[];
  provisioningRepository?: RepositoryBranchInput;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export const CreateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.optional(S.String),
    description: S.optional(SensitiveString),
    spec: SensitiveString,
    protonServiceRoleArn: S.optional(S.String),
    environmentAccountConnectionId: S.optional(S.String),
    tags: S.optional(TagList),
    provisioningRepository: S.optional(RepositoryBranchInput),
    componentRoleArn: S.optional(S.String),
    codebuildRoleArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentInput",
}) as any as S.Schema<CreateEnvironmentInput>;
export interface CreateEnvironmentOutput {
  environment: Environment;
}
export const CreateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: Environment }),
).annotate({
  identifier: "CreateEnvironmentOutput",
}) as any as S.Schema<CreateEnvironmentOutput>;
export interface CreateEnvironmentAccountConnectionInput {
  clientToken?: string;
  managementAccountId: string;
  roleArn?: string;
  environmentName: string;
  tags?: Tag[];
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export const CreateEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      managementAccountId: S.String,
      roleArn: S.optional(S.String),
      environmentName: S.String,
      tags: S.optional(TagList),
      componentRoleArn: S.optional(S.String),
      codebuildRoleArn: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateEnvironmentAccountConnectionInput",
}) as any as S.Schema<CreateEnvironmentAccountConnectionInput>;
export interface CreateEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export const CreateEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ environmentAccountConnection: EnvironmentAccountConnection }),
).annotate({
  identifier: "CreateEnvironmentAccountConnectionOutput",
}) as any as S.Schema<CreateEnvironmentAccountConnectionOutput>;
export type DisplayName = string | redacted.Redacted<string>;
export interface CreateEnvironmentTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  encryptionKey?: string;
  provisioning?: string;
  tags?: Tag[];
}
export const CreateEnvironmentTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    encryptionKey: S.optional(S.String),
    provisioning: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentTemplateInput",
}) as any as S.Schema<CreateEnvironmentTemplateInput>;
export type EnvironmentTemplateArn = string;
export type FullTemplateVersionNumber = string;
export interface EnvironmentTemplate {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  encryptionKey?: string;
  provisioning?: string;
}
export const EnvironmentTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    recommendedVersion: S.optional(S.String),
    encryptionKey: S.optional(S.String),
    provisioning: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentTemplate",
}) as any as S.Schema<EnvironmentTemplate>;
export interface CreateEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export const CreateEnvironmentTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentTemplate: EnvironmentTemplate }),
).annotate({
  identifier: "CreateEnvironmentTemplateOutput",
}) as any as S.Schema<CreateEnvironmentTemplateOutput>;
export type S3Bucket = string;
export type S3Key = string;
export interface S3ObjectSource {
  bucket: string;
  key: string;
}
export const S3ObjectSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String }),
).annotate({ identifier: "S3ObjectSource" }) as any as S.Schema<S3ObjectSource>;
export type TemplateVersionSourceInput = { s3: S3ObjectSource };
export const TemplateVersionSourceInput = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3ObjectSource }),
]);
export interface CreateEnvironmentTemplateVersionInput {
  clientToken?: string;
  templateName: string;
  description?: string | redacted.Redacted<string>;
  majorVersion?: string;
  source: TemplateVersionSourceInput;
  tags?: Tag[];
}
export const CreateEnvironmentTemplateVersionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      templateName: S.String,
      description: S.optional(SensitiveString),
      majorVersion: S.optional(S.String),
      source: TemplateVersionSourceInput,
      tags: S.optional(TagList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateEnvironmentTemplateVersionInput",
}) as any as S.Schema<CreateEnvironmentTemplateVersionInput>;
export type TemplateVersionStatus = string;
export type EnvironmentTemplateVersionArn = string;
export type TemplateSchema = string | redacted.Redacted<string>;
export interface EnvironmentTemplateVersion {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  schema?: string | redacted.Redacted<string>;
}
export const EnvironmentTemplateVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
    recommendedMinorVersion: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    schema: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EnvironmentTemplateVersion",
}) as any as S.Schema<EnvironmentTemplateVersion>;
export interface CreateEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export const CreateEnvironmentTemplateVersionOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ environmentTemplateVersion: EnvironmentTemplateVersion }),
).annotate({
  identifier: "CreateEnvironmentTemplateVersionOutput",
}) as any as S.Schema<CreateEnvironmentTemplateVersionOutput>;
export interface CreateRepositoryInput {
  provider: string;
  name: string;
  connectionArn: string;
  encryptionKey?: string;
  tags?: Tag[];
}
export const CreateRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: S.String,
    name: S.String,
    connectionArn: S.String,
    encryptionKey: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRepositoryInput",
}) as any as S.Schema<CreateRepositoryInput>;
export interface Repository {
  arn: string;
  provider: string;
  name: string;
  connectionArn: string;
  encryptionKey?: string;
}
export const Repository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    provider: S.String,
    name: S.String,
    connectionArn: S.String,
    encryptionKey: S.optional(S.String),
  }),
).annotate({ identifier: "Repository" }) as any as S.Schema<Repository>;
export interface CreateRepositoryOutput {
  repository: Repository;
}
export const CreateRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: Repository }),
).annotate({
  identifier: "CreateRepositoryOutput",
}) as any as S.Schema<CreateRepositoryOutput>;
export type RepositoryId = string;
export interface CreateServiceInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion?: string;
  spec: string | redacted.Redacted<string>;
  repositoryConnectionArn?: string;
  repositoryId?: string;
  branchName?: string;
  tags?: Tag[];
}
export const CreateServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.optional(S.String),
    spec: SensitiveString,
    repositoryConnectionArn: S.optional(S.String),
    repositoryId: S.optional(S.String),
    branchName: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceInput",
}) as any as S.Schema<CreateServiceInput>;
export type ServiceArn = string;
export type ServiceStatus = string;
export interface Service {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  templateName: string;
  createdAt: Date;
  lastModifiedAt: Date;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  spec: string | redacted.Redacted<string>;
  pipeline?: ServicePipeline;
  repositoryConnectionArn?: string;
  repositoryId?: string;
  branchName?: string;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    arn: S.String,
    templateName: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
    spec: SensitiveString,
    pipeline: S.optional(ServicePipeline),
    repositoryConnectionArn: S.optional(S.String),
    repositoryId: S.optional(S.String),
    branchName: S.optional(S.String),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface CreateServiceOutput {
  service: Service;
}
export const CreateServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "CreateServiceOutput",
}) as any as S.Schema<CreateServiceOutput>;
export interface CreateServiceInstanceInput {
  name: string;
  serviceName: string;
  spec: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  tags?: Tag[];
  clientToken?: string;
}
export const CreateServiceInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    serviceName: S.String,
    spec: SensitiveString,
    templateMajorVersion: S.optional(S.String),
    templateMinorVersion: S.optional(S.String),
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceInstanceInput",
}) as any as S.Schema<CreateServiceInstanceInput>;
export interface CreateServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export const CreateServiceInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceInstance: ServiceInstance }),
).annotate({
  identifier: "CreateServiceInstanceOutput",
}) as any as S.Schema<CreateServiceInstanceOutput>;
export type OpsFilePath = string;
export interface CreateServiceSyncConfigInput {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export const CreateServiceSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    filePath: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceSyncConfigInput",
}) as any as S.Schema<CreateServiceSyncConfigInput>;
export interface ServiceSyncConfig {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export const ServiceSyncConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    filePath: S.String,
  }),
).annotate({
  identifier: "ServiceSyncConfig",
}) as any as S.Schema<ServiceSyncConfig>;
export interface CreateServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export const CreateServiceSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceSyncConfig: S.optional(ServiceSyncConfig) }),
).annotate({
  identifier: "CreateServiceSyncConfigOutput",
}) as any as S.Schema<CreateServiceSyncConfigOutput>;
export interface CreateServiceTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  encryptionKey?: string;
  pipelineProvisioning?: string;
  tags?: Tag[];
}
export const CreateServiceTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    encryptionKey: S.optional(S.String),
    pipelineProvisioning: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceTemplateInput",
}) as any as S.Schema<CreateServiceTemplateInput>;
export type ServiceTemplateArn = string;
export interface ServiceTemplate {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  encryptionKey?: string;
  pipelineProvisioning?: string;
}
export const ServiceTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    recommendedVersion: S.optional(S.String),
    encryptionKey: S.optional(S.String),
    pipelineProvisioning: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceTemplate",
}) as any as S.Schema<ServiceTemplate>;
export interface CreateServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export const CreateServiceTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplate: ServiceTemplate }),
).annotate({
  identifier: "CreateServiceTemplateOutput",
}) as any as S.Schema<CreateServiceTemplateOutput>;
export interface CompatibleEnvironmentTemplateInput {
  templateName: string;
  majorVersion: string;
}
export const CompatibleEnvironmentTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String, majorVersion: S.String }),
).annotate({
  identifier: "CompatibleEnvironmentTemplateInput",
}) as any as S.Schema<CompatibleEnvironmentTemplateInput>;
export type CompatibleEnvironmentTemplateInputList =
  CompatibleEnvironmentTemplateInput[];
export const CompatibleEnvironmentTemplateInputList = /*@__PURE__*/ S.Array(
  CompatibleEnvironmentTemplateInput,
);
export type ServiceTemplateSupportedComponentSourceType = string;
export type ServiceTemplateSupportedComponentSourceInputList = string[];
export const ServiceTemplateSupportedComponentSourceInputList =
  /*@__PURE__*/ S.Array(S.String);
export interface CreateServiceTemplateVersionInput {
  clientToken?: string;
  templateName: string;
  description?: string | redacted.Redacted<string>;
  majorVersion?: string;
  source: TemplateVersionSourceInput;
  compatibleEnvironmentTemplates: CompatibleEnvironmentTemplateInput[];
  tags?: Tag[];
  supportedComponentSources?: string[];
}
export const CreateServiceTemplateVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    templateName: S.String,
    description: S.optional(SensitiveString),
    majorVersion: S.optional(S.String),
    source: TemplateVersionSourceInput,
    compatibleEnvironmentTemplates: CompatibleEnvironmentTemplateInputList,
    tags: S.optional(TagList),
    supportedComponentSources: S.optional(
      ServiceTemplateSupportedComponentSourceInputList,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateServiceTemplateVersionInput",
}) as any as S.Schema<CreateServiceTemplateVersionInput>;
export type ServiceTemplateVersionArn = string;
export interface CompatibleEnvironmentTemplate {
  templateName: string;
  majorVersion: string;
}
export const CompatibleEnvironmentTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String, majorVersion: S.String }),
).annotate({
  identifier: "CompatibleEnvironmentTemplate",
}) as any as S.Schema<CompatibleEnvironmentTemplate>;
export type CompatibleEnvironmentTemplateList = CompatibleEnvironmentTemplate[];
export const CompatibleEnvironmentTemplateList = /*@__PURE__*/ S.Array(
  CompatibleEnvironmentTemplate,
);
export interface ServiceTemplateVersion {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  compatibleEnvironmentTemplates: CompatibleEnvironmentTemplate[];
  schema?: string | redacted.Redacted<string>;
  supportedComponentSources?: string[];
}
export const ServiceTemplateVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
    recommendedMinorVersion: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    compatibleEnvironmentTemplates: CompatibleEnvironmentTemplateList,
    schema: S.optional(SensitiveString),
    supportedComponentSources: S.optional(
      ServiceTemplateSupportedComponentSourceInputList,
    ),
  }),
).annotate({
  identifier: "ServiceTemplateVersion",
}) as any as S.Schema<ServiceTemplateVersion>;
export interface CreateServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export const CreateServiceTemplateVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplateVersion: ServiceTemplateVersion }),
).annotate({
  identifier: "CreateServiceTemplateVersionOutput",
}) as any as S.Schema<CreateServiceTemplateVersionOutput>;
export type TemplateType = string;
export type Subdirectory = string;
export interface CreateTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export const CreateTemplateSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    templateType: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    subdirectory: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTemplateSyncConfigInput",
}) as any as S.Schema<CreateTemplateSyncConfigInput>;
export interface TemplateSyncConfig {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export const TemplateSyncConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    templateType: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    subdirectory: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateSyncConfig",
}) as any as S.Schema<TemplateSyncConfig>;
export interface CreateTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export const CreateTemplateSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateSyncConfig: S.optional(TemplateSyncConfig) }),
).annotate({
  identifier: "CreateTemplateSyncConfigOutput",
}) as any as S.Schema<CreateTemplateSyncConfigOutput>;
export interface DeleteComponentInput {
  name: string;
}
export const DeleteComponentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteComponentInput",
}) as any as S.Schema<DeleteComponentInput>;
export interface DeleteComponentOutput {
  component?: Component;
}
export const DeleteComponentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ component: S.optional(Component) }),
).annotate({
  identifier: "DeleteComponentOutput",
}) as any as S.Schema<DeleteComponentOutput>;
export interface DeleteDeploymentInput {
  id: string;
}
export const DeleteDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDeploymentInput",
}) as any as S.Schema<DeleteDeploymentInput>;
export type DeploymentArn = string;
export type DeploymentTargetResourceType = string;
export type ComponentDeploymentIdList = string[];
export const ComponentDeploymentIdList = /*@__PURE__*/ S.Array(S.String);
export interface ServiceInstanceState {
  spec: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  lastSuccessfulComponentDeploymentIds?: string[];
  lastSuccessfulEnvironmentDeploymentId?: string;
  lastSuccessfulServicePipelineDeploymentId?: string;
}
export const ServiceInstanceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spec: SensitiveString,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    lastSuccessfulComponentDeploymentIds: S.optional(ComponentDeploymentIdList),
    lastSuccessfulEnvironmentDeploymentId: S.optional(S.String),
    lastSuccessfulServicePipelineDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceInstanceState",
}) as any as S.Schema<ServiceInstanceState>;
export interface EnvironmentState {
  spec?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
}
export const EnvironmentState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spec: S.optional(SensitiveString),
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
  }),
).annotate({
  identifier: "EnvironmentState",
}) as any as S.Schema<EnvironmentState>;
export interface ServicePipelineState {
  spec?: string | redacted.Redacted<string>;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
}
export const ServicePipelineState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    spec: S.optional(SensitiveString),
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
  }),
).annotate({
  identifier: "ServicePipelineState",
}) as any as S.Schema<ServicePipelineState>;
export type ResourceNameOrEmpty = string;
export interface ComponentState {
  serviceName?: string;
  serviceInstanceName?: string;
  serviceSpec?: string | redacted.Redacted<string>;
  templateFile?: string | redacted.Redacted<string>;
}
export const ComponentState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    serviceSpec: S.optional(SensitiveString),
    templateFile: S.optional(SensitiveString),
  }),
).annotate({ identifier: "ComponentState" }) as any as S.Schema<ComponentState>;
export type DeploymentState =
  | {
      serviceInstance: ServiceInstanceState;
      environment?: never;
      servicePipeline?: never;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment: EnvironmentState;
      servicePipeline?: never;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment?: never;
      servicePipeline: ServicePipelineState;
      component?: never;
    }
  | {
      serviceInstance?: never;
      environment?: never;
      servicePipeline?: never;
      component: ComponentState;
    };
export const DeploymentState = /*@__PURE__*/ S.Union([
  S.Struct({ serviceInstance: ServiceInstanceState }),
  S.Struct({ environment: EnvironmentState }),
  S.Struct({ servicePipeline: ServicePipelineState }),
  S.Struct({ component: ComponentState }),
]);
export interface Deployment {
  id: string;
  arn: string;
  targetArn: string;
  targetResourceCreatedAt: Date;
  targetResourceType: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastModifiedAt: Date;
  completedAt?: Date;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
  initialState?: DeploymentState;
  targetState?: DeploymentState;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    targetArn: S.String,
    targetResourceCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    targetResourceType: S.String,
    environmentName: S.String,
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    componentName: S.optional(S.String),
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
    initialState: S.optional(DeploymentState),
    targetState: S.optional(DeploymentState),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export interface DeleteDeploymentOutput {
  deployment?: Deployment;
}
export const DeleteDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deployment: S.optional(Deployment) }),
).annotate({
  identifier: "DeleteDeploymentOutput",
}) as any as S.Schema<DeleteDeploymentOutput>;
export interface DeleteEnvironmentInput {
  name: string;
}
export const DeleteEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentInput",
}) as any as S.Schema<DeleteEnvironmentInput>;
export interface DeleteEnvironmentOutput {
  environment?: Environment;
}
export const DeleteEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "DeleteEnvironmentOutput",
}) as any as S.Schema<DeleteEnvironmentOutput>;
export interface DeleteEnvironmentAccountConnectionInput {
  id: string;
}
export const DeleteEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteEnvironmentAccountConnectionInput",
}) as any as S.Schema<DeleteEnvironmentAccountConnectionInput>;
export interface DeleteEnvironmentAccountConnectionOutput {
  environmentAccountConnection?: EnvironmentAccountConnection;
}
export const DeleteEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      environmentAccountConnection: S.optional(EnvironmentAccountConnection),
    }),
).annotate({
  identifier: "DeleteEnvironmentAccountConnectionOutput",
}) as any as S.Schema<DeleteEnvironmentAccountConnectionOutput>;
export interface DeleteEnvironmentTemplateInput {
  name: string;
}
export const DeleteEnvironmentTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentTemplateInput",
}) as any as S.Schema<DeleteEnvironmentTemplateInput>;
export interface DeleteEnvironmentTemplateOutput {
  environmentTemplate?: EnvironmentTemplate;
}
export const DeleteEnvironmentTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentTemplate: S.optional(EnvironmentTemplate) }),
).annotate({
  identifier: "DeleteEnvironmentTemplateOutput",
}) as any as S.Schema<DeleteEnvironmentTemplateOutput>;
export interface DeleteEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export const DeleteEnvironmentTemplateVersionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateName: S.String,
      majorVersion: S.String,
      minorVersion: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteEnvironmentTemplateVersionInput",
}) as any as S.Schema<DeleteEnvironmentTemplateVersionInput>;
export interface DeleteEnvironmentTemplateVersionOutput {
  environmentTemplateVersion?: EnvironmentTemplateVersion;
}
export const DeleteEnvironmentTemplateVersionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      environmentTemplateVersion: S.optional(EnvironmentTemplateVersion),
    }),
).annotate({
  identifier: "DeleteEnvironmentTemplateVersionOutput",
}) as any as S.Schema<DeleteEnvironmentTemplateVersionOutput>;
export interface DeleteRepositoryInput {
  provider: string;
  name: string;
}
export const DeleteRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ provider: S.String, name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRepositoryInput",
}) as any as S.Schema<DeleteRepositoryInput>;
export interface DeleteRepositoryOutput {
  repository?: Repository;
}
export const DeleteRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(Repository) }),
).annotate({
  identifier: "DeleteRepositoryOutput",
}) as any as S.Schema<DeleteRepositoryOutput>;
export interface DeleteServiceInput {
  name: string;
}
export const DeleteServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceInput",
}) as any as S.Schema<DeleteServiceInput>;
export interface DeleteServiceOutput {
  service?: Service;
}
export const DeleteServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(Service) }),
).annotate({
  identifier: "DeleteServiceOutput",
}) as any as S.Schema<DeleteServiceOutput>;
export interface DeleteServiceSyncConfigInput {
  serviceName: string;
}
export const DeleteServiceSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceSyncConfigInput",
}) as any as S.Schema<DeleteServiceSyncConfigInput>;
export interface DeleteServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export const DeleteServiceSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceSyncConfig: S.optional(ServiceSyncConfig) }),
).annotate({
  identifier: "DeleteServiceSyncConfigOutput",
}) as any as S.Schema<DeleteServiceSyncConfigOutput>;
export interface DeleteServiceTemplateInput {
  name: string;
}
export const DeleteServiceTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceTemplateInput",
}) as any as S.Schema<DeleteServiceTemplateInput>;
export interface DeleteServiceTemplateOutput {
  serviceTemplate?: ServiceTemplate;
}
export const DeleteServiceTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplate: S.optional(ServiceTemplate) }),
).annotate({
  identifier: "DeleteServiceTemplateOutput",
}) as any as S.Schema<DeleteServiceTemplateOutput>;
export interface DeleteServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export const DeleteServiceTemplateVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteServiceTemplateVersionInput",
}) as any as S.Schema<DeleteServiceTemplateVersionInput>;
export interface DeleteServiceTemplateVersionOutput {
  serviceTemplateVersion?: ServiceTemplateVersion;
}
export const DeleteServiceTemplateVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplateVersion: S.optional(ServiceTemplateVersion) }),
).annotate({
  identifier: "DeleteServiceTemplateVersionOutput",
}) as any as S.Schema<DeleteServiceTemplateVersionOutput>;
export interface DeleteTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
}
export const DeleteTemplateSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String, templateType: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTemplateSyncConfigInput",
}) as any as S.Schema<DeleteTemplateSyncConfigInput>;
export interface DeleteTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export const DeleteTemplateSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateSyncConfig: S.optional(TemplateSyncConfig) }),
).annotate({
  identifier: "DeleteTemplateSyncConfigOutput",
}) as any as S.Schema<DeleteTemplateSyncConfigOutput>;
export interface GetAccountSettingsInput {}
export const GetAccountSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAccountSettingsInput",
}) as any as S.Schema<GetAccountSettingsInput>;
export type RoleArnOrEmptyString = string;
export interface AccountSettings {
  pipelineServiceRoleArn?: string;
  pipelineProvisioningRepository?: RepositoryBranch;
  pipelineCodebuildRoleArn?: string;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineServiceRoleArn: S.optional(S.String),
    pipelineProvisioningRepository: S.optional(RepositoryBranch),
    pipelineCodebuildRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetAccountSettingsOutput {
  accountSettings?: AccountSettings;
}
export const GetAccountSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountSettings: S.optional(AccountSettings) }),
).annotate({
  identifier: "GetAccountSettingsOutput",
}) as any as S.Schema<GetAccountSettingsOutput>;
export interface GetComponentInput {
  name: string;
}
export const GetComponentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetComponentInput",
}) as any as S.Schema<GetComponentInput>;
export interface GetComponentOutput {
  component?: Component;
}
export const GetComponentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ component: S.optional(Component) }),
).annotate({
  identifier: "GetComponentOutput",
}) as any as S.Schema<GetComponentOutput>;
export interface GetDeploymentInput {
  id: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
}
export const GetDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    environmentName: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    componentName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDeploymentInput",
}) as any as S.Schema<GetDeploymentInput>;
export interface GetDeploymentOutput {
  deployment?: Deployment;
}
export const GetDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deployment: S.optional(Deployment) }),
).annotate({
  identifier: "GetDeploymentOutput",
}) as any as S.Schema<GetDeploymentOutput>;
export interface GetEnvironmentInput {
  name: string;
}
export const GetEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentInput",
}) as any as S.Schema<GetEnvironmentInput>;
export interface GetEnvironmentOutput {
  environment: Environment;
}
export const GetEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: Environment }),
).annotate({
  identifier: "GetEnvironmentOutput",
}) as any as S.Schema<GetEnvironmentOutput>;
export interface GetEnvironmentAccountConnectionInput {
  id: string;
}
export const GetEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetEnvironmentAccountConnectionInput",
}) as any as S.Schema<GetEnvironmentAccountConnectionInput>;
export interface GetEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export const GetEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ environmentAccountConnection: EnvironmentAccountConnection }),
).annotate({
  identifier: "GetEnvironmentAccountConnectionOutput",
}) as any as S.Schema<GetEnvironmentAccountConnectionOutput>;
export interface GetEnvironmentTemplateInput {
  name: string;
}
export const GetEnvironmentTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentTemplateInput",
}) as any as S.Schema<GetEnvironmentTemplateInput>;
export interface GetEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export const GetEnvironmentTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentTemplate: EnvironmentTemplate }),
).annotate({
  identifier: "GetEnvironmentTemplateOutput",
}) as any as S.Schema<GetEnvironmentTemplateOutput>;
export interface GetEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export const GetEnvironmentTemplateVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentTemplateVersionInput",
}) as any as S.Schema<GetEnvironmentTemplateVersionInput>;
export interface GetEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export const GetEnvironmentTemplateVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentTemplateVersion: EnvironmentTemplateVersion }),
).annotate({
  identifier: "GetEnvironmentTemplateVersionOutput",
}) as any as S.Schema<GetEnvironmentTemplateVersionOutput>;
export interface GetRepositoryInput {
  provider: string;
  name: string;
}
export const GetRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ provider: S.String, name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRepositoryInput",
}) as any as S.Schema<GetRepositoryInput>;
export interface GetRepositoryOutput {
  repository: Repository;
}
export const GetRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: Repository }),
).annotate({
  identifier: "GetRepositoryOutput",
}) as any as S.Schema<GetRepositoryOutput>;
export type SyncType = string;
export interface GetRepositorySyncStatusInput {
  repositoryName: string;
  repositoryProvider: string;
  branch: string;
  syncType: string;
}
export const GetRepositorySyncStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryProvider: S.String,
    branch: S.String,
    syncType: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRepositorySyncStatusInput",
}) as any as S.Schema<GetRepositorySyncStatusInput>;
export type RepositorySyncStatus = string;
export interface RepositorySyncEvent {
  type: string;
  externalId?: string;
  time: Date;
  event: string;
}
export const RepositorySyncEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    externalId: S.optional(S.String),
    time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    event: S.String,
  }),
).annotate({
  identifier: "RepositorySyncEvent",
}) as any as S.Schema<RepositorySyncEvent>;
export type RepositorySyncEvents = RepositorySyncEvent[];
export const RepositorySyncEvents = /*@__PURE__*/ S.Array(RepositorySyncEvent);
export interface RepositorySyncAttempt {
  startedAt: Date;
  status: string;
  events: RepositorySyncEvent[];
}
export const RepositorySyncAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    events: RepositorySyncEvents,
  }),
).annotate({
  identifier: "RepositorySyncAttempt",
}) as any as S.Schema<RepositorySyncAttempt>;
export interface GetRepositorySyncStatusOutput {
  latestSync?: RepositorySyncAttempt;
}
export const GetRepositorySyncStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latestSync: S.optional(RepositorySyncAttempt) }),
).annotate({
  identifier: "GetRepositorySyncStatusOutput",
}) as any as S.Schema<GetRepositorySyncStatusOutput>;
export interface GetResourcesSummaryInput {}
export const GetResourcesSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcesSummaryInput",
}) as any as S.Schema<GetResourcesSummaryInput>;
export interface ResourceCountsSummary {
  total: number;
  failed?: number;
  upToDate?: number;
  behindMajor?: number;
  behindMinor?: number;
}
export const ResourceCountsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    total: S.Number,
    failed: S.optional(S.Number),
    upToDate: S.optional(S.Number),
    behindMajor: S.optional(S.Number),
    behindMinor: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourceCountsSummary",
}) as any as S.Schema<ResourceCountsSummary>;
export interface CountsSummary {
  components?: ResourceCountsSummary;
  environments?: ResourceCountsSummary;
  environmentTemplates?: ResourceCountsSummary;
  serviceInstances?: ResourceCountsSummary;
  services?: ResourceCountsSummary;
  serviceTemplates?: ResourceCountsSummary;
  pipelines?: ResourceCountsSummary;
}
export const CountsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    components: S.optional(ResourceCountsSummary),
    environments: S.optional(ResourceCountsSummary),
    environmentTemplates: S.optional(ResourceCountsSummary),
    serviceInstances: S.optional(ResourceCountsSummary),
    services: S.optional(ResourceCountsSummary),
    serviceTemplates: S.optional(ResourceCountsSummary),
    pipelines: S.optional(ResourceCountsSummary),
  }),
).annotate({ identifier: "CountsSummary" }) as any as S.Schema<CountsSummary>;
export interface GetResourcesSummaryOutput {
  counts: CountsSummary;
}
export const GetResourcesSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ counts: CountsSummary }),
).annotate({
  identifier: "GetResourcesSummaryOutput",
}) as any as S.Schema<GetResourcesSummaryOutput>;
export interface GetServiceInput {
  name: string;
}
export const GetServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceInput",
}) as any as S.Schema<GetServiceInput>;
export interface GetServiceOutput {
  service?: Service;
}
export const GetServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(Service) }),
).annotate({
  identifier: "GetServiceOutput",
}) as any as S.Schema<GetServiceOutput>;
export interface GetServiceInstanceInput {
  name: string;
  serviceName: string;
}
export const GetServiceInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, serviceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceInstanceInput",
}) as any as S.Schema<GetServiceInstanceInput>;
export interface GetServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export const GetServiceInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceInstance: ServiceInstance }),
).annotate({
  identifier: "GetServiceInstanceOutput",
}) as any as S.Schema<GetServiceInstanceOutput>;
export interface GetServiceInstanceSyncStatusInput {
  serviceName: string;
  serviceInstanceName: string;
}
export const GetServiceInstanceSyncStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String, serviceInstanceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceInstanceSyncStatusInput",
}) as any as S.Schema<GetServiceInstanceSyncStatusInput>;
export type SHA = string;
export interface Revision {
  repositoryName: string;
  repositoryProvider: string;
  sha: string;
  directory: string;
  branch: string;
}
export const Revision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryProvider: S.String,
    sha: S.String,
    directory: S.String,
    branch: S.String,
  }),
).annotate({ identifier: "Revision" }) as any as S.Schema<Revision>;
export type ResourceSyncStatus = string;
export interface ResourceSyncEvent {
  type: string;
  externalId?: string;
  time: Date;
  event: string;
}
export const ResourceSyncEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    externalId: S.optional(S.String),
    time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    event: S.String,
  }),
).annotate({
  identifier: "ResourceSyncEvent",
}) as any as S.Schema<ResourceSyncEvent>;
export type ResourceSyncEvents = ResourceSyncEvent[];
export const ResourceSyncEvents = /*@__PURE__*/ S.Array(ResourceSyncEvent);
export interface ResourceSyncAttempt {
  initialRevision: Revision;
  targetRevision: Revision;
  target: string;
  startedAt: Date;
  status: string;
  events: ResourceSyncEvent[];
}
export const ResourceSyncAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initialRevision: Revision,
    targetRevision: Revision,
    target: S.String,
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    events: ResourceSyncEvents,
  }),
).annotate({
  identifier: "ResourceSyncAttempt",
}) as any as S.Schema<ResourceSyncAttempt>;
export interface GetServiceInstanceSyncStatusOutput {
  latestSync?: ResourceSyncAttempt;
  latestSuccessfulSync?: ResourceSyncAttempt;
  desiredState?: Revision;
}
export const GetServiceInstanceSyncStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    latestSync: S.optional(ResourceSyncAttempt),
    latestSuccessfulSync: S.optional(ResourceSyncAttempt),
    desiredState: S.optional(Revision),
  }),
).annotate({
  identifier: "GetServiceInstanceSyncStatusOutput",
}) as any as S.Schema<GetServiceInstanceSyncStatusOutput>;
export interface GetServiceSyncBlockerSummaryInput {
  serviceName: string;
  serviceInstanceName?: string;
}
export const GetServiceSyncBlockerSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    serviceInstanceName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceSyncBlockerSummaryInput",
}) as any as S.Schema<GetServiceSyncBlockerSummaryInput>;
export type BlockerType = string;
export type BlockerStatus = string;
export interface SyncBlockerContext {
  key: string;
  value: string;
}
export const SyncBlockerContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "SyncBlockerContext",
}) as any as S.Schema<SyncBlockerContext>;
export type SyncBlockerContexts = SyncBlockerContext[];
export const SyncBlockerContexts = /*@__PURE__*/ S.Array(SyncBlockerContext);
export interface SyncBlocker {
  id: string;
  type: string;
  status: string;
  createdReason: string;
  createdAt: Date;
  contexts?: SyncBlockerContext[];
  resolvedReason?: string;
  resolvedAt?: Date;
}
export const SyncBlocker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: S.String,
    status: S.String,
    createdReason: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    contexts: S.optional(SyncBlockerContexts),
    resolvedReason: S.optional(S.String),
    resolvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SyncBlocker" }) as any as S.Schema<SyncBlocker>;
export type LatestSyncBlockers = SyncBlocker[];
export const LatestSyncBlockers = /*@__PURE__*/ S.Array(SyncBlocker);
export interface ServiceSyncBlockerSummary {
  serviceName: string;
  serviceInstanceName?: string;
  latestBlockers?: SyncBlocker[];
}
export const ServiceSyncBlockerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    serviceInstanceName: S.optional(S.String),
    latestBlockers: S.optional(LatestSyncBlockers),
  }),
).annotate({
  identifier: "ServiceSyncBlockerSummary",
}) as any as S.Schema<ServiceSyncBlockerSummary>;
export interface GetServiceSyncBlockerSummaryOutput {
  serviceSyncBlockerSummary?: ServiceSyncBlockerSummary;
}
export const GetServiceSyncBlockerSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceSyncBlockerSummary: S.optional(ServiceSyncBlockerSummary),
  }),
).annotate({
  identifier: "GetServiceSyncBlockerSummaryOutput",
}) as any as S.Schema<GetServiceSyncBlockerSummaryOutput>;
export interface GetServiceSyncConfigInput {
  serviceName: string;
}
export const GetServiceSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceSyncConfigInput",
}) as any as S.Schema<GetServiceSyncConfigInput>;
export interface GetServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export const GetServiceSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceSyncConfig: S.optional(ServiceSyncConfig) }),
).annotate({
  identifier: "GetServiceSyncConfigOutput",
}) as any as S.Schema<GetServiceSyncConfigOutput>;
export interface GetServiceTemplateInput {
  name: string;
}
export const GetServiceTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceTemplateInput",
}) as any as S.Schema<GetServiceTemplateInput>;
export interface GetServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export const GetServiceTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplate: ServiceTemplate }),
).annotate({
  identifier: "GetServiceTemplateOutput",
}) as any as S.Schema<GetServiceTemplateOutput>;
export interface GetServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
}
export const GetServiceTemplateVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceTemplateVersionInput",
}) as any as S.Schema<GetServiceTemplateVersionInput>;
export interface GetServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export const GetServiceTemplateVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplateVersion: ServiceTemplateVersion }),
).annotate({
  identifier: "GetServiceTemplateVersionOutput",
}) as any as S.Schema<GetServiceTemplateVersionOutput>;
export interface GetTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
}
export const GetTemplateSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String, templateType: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTemplateSyncConfigInput",
}) as any as S.Schema<GetTemplateSyncConfigInput>;
export interface GetTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export const GetTemplateSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateSyncConfig: S.optional(TemplateSyncConfig) }),
).annotate({
  identifier: "GetTemplateSyncConfigOutput",
}) as any as S.Schema<GetTemplateSyncConfigOutput>;
export interface GetTemplateSyncStatusInput {
  templateName: string;
  templateType: string;
  templateVersion: string;
}
export const GetTemplateSyncStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    templateType: S.String,
    templateVersion: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTemplateSyncStatusInput",
}) as any as S.Schema<GetTemplateSyncStatusInput>;
export interface GetTemplateSyncStatusOutput {
  latestSync?: ResourceSyncAttempt;
  latestSuccessfulSync?: ResourceSyncAttempt;
  desiredState?: Revision;
}
export const GetTemplateSyncStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    latestSync: S.optional(ResourceSyncAttempt),
    latestSuccessfulSync: S.optional(ResourceSyncAttempt),
    desiredState: S.optional(Revision),
  }),
).annotate({
  identifier: "GetTemplateSyncStatusOutput",
}) as any as S.Schema<GetTemplateSyncStatusOutput>;
export type EmptyNextToken = string;
export interface ListComponentOutputsInput {
  componentName: string;
  nextToken?: string;
  deploymentId?: string;
}
export const ListComponentOutputsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.String,
    nextToken: S.optional(S.String),
    deploymentId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListComponentOutputsInput",
}) as any as S.Schema<ListComponentOutputsInput>;
export type OutputKey = string;
export type OutputValueString = string;
export interface Output {
  key?: string;
  valueString?: string;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), valueString: S.optional(S.String) }),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type OutputsList = Output[];
export const OutputsList = /*@__PURE__*/ S.Array(Output);
export interface ListComponentOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export const ListComponentOutputsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), outputs: OutputsList }),
).annotate({
  identifier: "ListComponentOutputsOutput",
}) as any as S.Schema<ListComponentOutputsOutput>;
export interface ListComponentProvisionedResourcesInput {
  componentName: string;
  nextToken?: string;
}
export const ListComponentProvisionedResourcesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ componentName: S.String, nextToken: S.optional(S.String) }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListComponentProvisionedResourcesInput",
}) as any as S.Schema<ListComponentProvisionedResourcesInput>;
export type ProvisionedResourceName = string;
export type ProvisionedResourceIdentifier = string;
export type ProvisionedResourceEngine = string;
export interface ProvisionedResource {
  name?: string;
  identifier?: string;
  provisioningEngine?: string;
}
export const ProvisionedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    identifier: S.optional(S.String),
    provisioningEngine: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedResource",
}) as any as S.Schema<ProvisionedResource>;
export type ProvisionedResourceList = ProvisionedResource[];
export const ProvisionedResourceList =
  /*@__PURE__*/ S.Array(ProvisionedResource);
export interface ListComponentProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export const ListComponentProvisionedResourcesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      provisionedResources: ProvisionedResourceList,
    }),
).annotate({
  identifier: "ListComponentProvisionedResourcesOutput",
}) as any as S.Schema<ListComponentProvisionedResourcesOutput>;
export type NextToken = string;
export type MaxPageResults = number;
export interface ListComponentsInput {
  nextToken?: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  maxResults?: number;
}
export const ListComponentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentName: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListComponentsInput",
}) as any as S.Schema<ListComponentsInput>;
export interface ComponentSummary {
  name: string;
  arn: string;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  createdAt: Date;
  lastModifiedAt: Date;
  lastDeploymentAttemptedAt?: Date;
  lastDeploymentSucceededAt?: Date;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const ComponentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    environmentName: S.String,
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastDeploymentSucceededAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type ComponentSummaryList = ComponentSummary[];
export const ComponentSummaryList = /*@__PURE__*/ S.Array(ComponentSummary);
export interface ListComponentsOutput {
  nextToken?: string;
  components: ComponentSummary[];
}
export const ListComponentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    components: ComponentSummaryList,
  }),
).annotate({
  identifier: "ListComponentsOutput",
}) as any as S.Schema<ListComponentsOutput>;
export interface ListDeploymentsInput {
  nextToken?: string;
  environmentName?: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  maxResults?: number;
}
export const ListDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentName: S.optional(S.String),
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    componentName: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDeploymentsInput",
}) as any as S.Schema<ListDeploymentsInput>;
export interface DeploymentSummary {
  id: string;
  arn: string;
  targetArn: string;
  targetResourceCreatedAt: Date;
  targetResourceType: string;
  createdAt: Date;
  lastModifiedAt: Date;
  completedAt?: Date;
  environmentName: string;
  serviceName?: string;
  serviceInstanceName?: string;
  componentName?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
  deploymentStatus: string;
}
export const DeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    targetArn: S.String,
    targetResourceCreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    targetResourceType: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    environmentName: S.String,
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    componentName: S.optional(S.String),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
    deploymentStatus: S.String,
  }),
).annotate({
  identifier: "DeploymentSummary",
}) as any as S.Schema<DeploymentSummary>;
export type DeploymentSummaryList = DeploymentSummary[];
export const DeploymentSummaryList = /*@__PURE__*/ S.Array(DeploymentSummary);
export interface ListDeploymentsOutput {
  nextToken?: string;
  deployments: DeploymentSummary[];
}
export const ListDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    deployments: DeploymentSummaryList,
  }),
).annotate({
  identifier: "ListDeploymentsOutput",
}) as any as S.Schema<ListDeploymentsOutput>;
export type EnvironmentAccountConnectionRequesterAccountType = string;
export type EnvironmentAccountConnectionStatusList = string[];
export const EnvironmentAccountConnectionStatusList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListEnvironmentAccountConnectionsInput {
  requestedBy: string;
  environmentName?: string;
  statuses?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentAccountConnectionsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      requestedBy: S.String,
      environmentName: S.optional(S.String),
      statuses: S.optional(EnvironmentAccountConnectionStatusList),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListEnvironmentAccountConnectionsInput",
}) as any as S.Schema<ListEnvironmentAccountConnectionsInput>;
export interface EnvironmentAccountConnectionSummary {
  id: string;
  arn: string;
  managementAccountId: string;
  environmentAccountId: string;
  roleArn: string;
  environmentName: string;
  requestedAt: Date;
  lastModifiedAt: Date;
  status: string;
  componentRoleArn?: string;
}
export const EnvironmentAccountConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    managementAccountId: S.String,
    environmentAccountId: S.String,
    roleArn: S.String,
    environmentName: S.String,
    requestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    componentRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentAccountConnectionSummary",
}) as any as S.Schema<EnvironmentAccountConnectionSummary>;
export type EnvironmentAccountConnectionSummaryList =
  EnvironmentAccountConnectionSummary[];
export const EnvironmentAccountConnectionSummaryList = /*@__PURE__*/ S.Array(
  EnvironmentAccountConnectionSummary,
);
export interface ListEnvironmentAccountConnectionsOutput {
  environmentAccountConnections: EnvironmentAccountConnectionSummary[];
  nextToken?: string;
}
export const ListEnvironmentAccountConnectionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      environmentAccountConnections: EnvironmentAccountConnectionSummaryList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListEnvironmentAccountConnectionsOutput",
}) as any as S.Schema<ListEnvironmentAccountConnectionsOutput>;
export interface ListEnvironmentOutputsInput {
  environmentName: string;
  nextToken?: string;
  deploymentId?: string;
}
export const ListEnvironmentOutputsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environmentName: S.String,
    nextToken: S.optional(S.String),
    deploymentId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentOutputsInput",
}) as any as S.Schema<ListEnvironmentOutputsInput>;
export interface ListEnvironmentOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export const ListEnvironmentOutputsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), outputs: OutputsList }),
).annotate({
  identifier: "ListEnvironmentOutputsOutput",
}) as any as S.Schema<ListEnvironmentOutputsOutput>;
export interface ListEnvironmentProvisionedResourcesInput {
  environmentName: string;
  nextToken?: string;
}
export const ListEnvironmentProvisionedResourcesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      environmentName: S.String,
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListEnvironmentProvisionedResourcesInput",
}) as any as S.Schema<ListEnvironmentProvisionedResourcesInput>;
export interface ListEnvironmentProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export const ListEnvironmentProvisionedResourcesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      provisionedResources: ProvisionedResourceList,
    }),
  ).annotate({
    identifier: "ListEnvironmentProvisionedResourcesOutput",
  }) as any as S.Schema<ListEnvironmentProvisionedResourcesOutput>;
export interface EnvironmentTemplateFilter {
  templateName: string;
  majorVersion: string;
}
export const EnvironmentTemplateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String, majorVersion: S.String }),
).annotate({
  identifier: "EnvironmentTemplateFilter",
}) as any as S.Schema<EnvironmentTemplateFilter>;
export type EnvironmentTemplateFilterList = EnvironmentTemplateFilter[];
export const EnvironmentTemplateFilterList = /*@__PURE__*/ S.Array(
  EnvironmentTemplateFilter,
);
export interface ListEnvironmentsInput {
  nextToken?: string;
  maxResults?: number;
  environmentTemplates?: EnvironmentTemplateFilter[];
}
export const ListEnvironmentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    environmentTemplates: S.optional(EnvironmentTemplateFilterList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentsInput",
}) as any as S.Schema<ListEnvironmentsInput>;
export interface EnvironmentSummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  arn: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  protonServiceRoleArn?: string;
  environmentAccountConnectionId?: string;
  environmentAccountId?: string;
  provisioning?: string;
  componentRoleArn?: string;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const EnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    arn: S.String,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    protonServiceRoleArn: S.optional(S.String),
    environmentAccountConnectionId: S.optional(S.String),
    environmentAccountId: S.optional(S.String),
    provisioning: S.optional(S.String),
    componentRoleArn: S.optional(S.String),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export type EnvironmentSummaryList = EnvironmentSummary[];
export const EnvironmentSummaryList = /*@__PURE__*/ S.Array(EnvironmentSummary);
export interface ListEnvironmentsOutput {
  nextToken?: string;
  environments: EnvironmentSummary[];
}
export const ListEnvironmentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environments: EnvironmentSummaryList,
  }),
).annotate({
  identifier: "ListEnvironmentsOutput",
}) as any as S.Schema<ListEnvironmentsOutput>;
export interface ListEnvironmentTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentTemplatesInput",
}) as any as S.Schema<ListEnvironmentTemplatesInput>;
export interface EnvironmentTemplateSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  provisioning?: string;
}
export const EnvironmentTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    recommendedVersion: S.optional(S.String),
    provisioning: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentTemplateSummary",
}) as any as S.Schema<EnvironmentTemplateSummary>;
export type EnvironmentTemplateSummaryList = EnvironmentTemplateSummary[];
export const EnvironmentTemplateSummaryList = /*@__PURE__*/ S.Array(
  EnvironmentTemplateSummary,
);
export interface ListEnvironmentTemplatesOutput {
  nextToken?: string;
  templates: EnvironmentTemplateSummary[];
}
export const ListEnvironmentTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    templates: EnvironmentTemplateSummaryList,
  }),
).annotate({
  identifier: "ListEnvironmentTemplatesOutput",
}) as any as S.Schema<ListEnvironmentTemplatesOutput>;
export interface ListEnvironmentTemplateVersionsInput {
  nextToken?: string;
  maxResults?: number;
  templateName: string;
  majorVersion?: string;
}
export const ListEnvironmentTemplateVersionsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
      templateName: S.String,
      majorVersion: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListEnvironmentTemplateVersionsInput",
}) as any as S.Schema<ListEnvironmentTemplateVersionsInput>;
export interface EnvironmentTemplateVersionSummary {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
export const EnvironmentTemplateVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
    recommendedMinorVersion: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "EnvironmentTemplateVersionSummary",
}) as any as S.Schema<EnvironmentTemplateVersionSummary>;
export type EnvironmentTemplateVersionSummaryList =
  EnvironmentTemplateVersionSummary[];
export const EnvironmentTemplateVersionSummaryList = /*@__PURE__*/ S.Array(
  EnvironmentTemplateVersionSummary,
);
export interface ListEnvironmentTemplateVersionsOutput {
  nextToken?: string;
  templateVersions: EnvironmentTemplateVersionSummary[];
}
export const ListEnvironmentTemplateVersionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      templateVersions: EnvironmentTemplateVersionSummaryList,
    }),
).annotate({
  identifier: "ListEnvironmentTemplateVersionsOutput",
}) as any as S.Schema<ListEnvironmentTemplateVersionsOutput>;
export interface ListRepositoriesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListRepositoriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRepositoriesInput",
}) as any as S.Schema<ListRepositoriesInput>;
export interface RepositorySummary {
  arn: string;
  provider: string;
  name: string;
  connectionArn: string;
}
export const RepositorySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    provider: S.String,
    name: S.String,
    connectionArn: S.String,
  }),
).annotate({
  identifier: "RepositorySummary",
}) as any as S.Schema<RepositorySummary>;
export type RepositorySummaryList = RepositorySummary[];
export const RepositorySummaryList = /*@__PURE__*/ S.Array(RepositorySummary);
export interface ListRepositoriesOutput {
  nextToken?: string;
  repositories: RepositorySummary[];
}
export const ListRepositoriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    repositories: RepositorySummaryList,
  }),
).annotate({
  identifier: "ListRepositoriesOutput",
}) as any as S.Schema<ListRepositoriesOutput>;
export interface ListRepositorySyncDefinitionsInput {
  repositoryName: string;
  repositoryProvider: string;
  syncType: string;
  nextToken?: string;
}
export const ListRepositorySyncDefinitionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryProvider: S.String,
    syncType: S.String,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRepositorySyncDefinitionsInput",
}) as any as S.Schema<ListRepositorySyncDefinitionsInput>;
export interface RepositorySyncDefinition {
  target: string;
  parent: string;
  branch: string;
  directory: string;
}
export const RepositorySyncDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    target: S.String,
    parent: S.String,
    branch: S.String,
    directory: S.String,
  }),
).annotate({
  identifier: "RepositorySyncDefinition",
}) as any as S.Schema<RepositorySyncDefinition>;
export type RepositorySyncDefinitionList = RepositorySyncDefinition[];
export const RepositorySyncDefinitionList = /*@__PURE__*/ S.Array(
  RepositorySyncDefinition,
);
export interface ListRepositorySyncDefinitionsOutput {
  nextToken?: string;
  syncDefinitions: RepositorySyncDefinition[];
}
export const ListRepositorySyncDefinitionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    syncDefinitions: RepositorySyncDefinitionList,
  }),
).annotate({
  identifier: "ListRepositorySyncDefinitionsOutput",
}) as any as S.Schema<ListRepositorySyncDefinitionsOutput>;
export interface ListServiceInstanceOutputsInput {
  serviceInstanceName: string;
  serviceName: string;
  nextToken?: string;
  deploymentId?: string;
}
export const ListServiceInstanceOutputsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceInstanceName: S.String,
    serviceName: S.String,
    nextToken: S.optional(S.String),
    deploymentId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceInstanceOutputsInput",
}) as any as S.Schema<ListServiceInstanceOutputsInput>;
export interface ListServiceInstanceOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export const ListServiceInstanceOutputsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), outputs: OutputsList }),
).annotate({
  identifier: "ListServiceInstanceOutputsOutput",
}) as any as S.Schema<ListServiceInstanceOutputsOutput>;
export interface ListServiceInstanceProvisionedResourcesInput {
  serviceName: string;
  serviceInstanceName: string;
  nextToken?: string;
}
export const ListServiceInstanceProvisionedResourcesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      serviceName: S.String,
      serviceInstanceName: S.String,
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListServiceInstanceProvisionedResourcesInput",
  }) as any as S.Schema<ListServiceInstanceProvisionedResourcesInput>;
export interface ListServiceInstanceProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export const ListServiceInstanceProvisionedResourcesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      provisionedResources: ProvisionedResourceList,
    }),
  ).annotate({
    identifier: "ListServiceInstanceProvisionedResourcesOutput",
  }) as any as S.Schema<ListServiceInstanceProvisionedResourcesOutput>;
export type ListServiceInstancesFilterBy = string;
export type ListServiceInstancesFilterValue = string;
export interface ListServiceInstancesFilter {
  key?: string;
  value?: string;
}
export const ListServiceInstancesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "ListServiceInstancesFilter",
}) as any as S.Schema<ListServiceInstancesFilter>;
export type ListServiceInstancesFilterList = ListServiceInstancesFilter[];
export const ListServiceInstancesFilterList = /*@__PURE__*/ S.Array(
  ListServiceInstancesFilter,
);
export type ListServiceInstancesSortBy = string;
export type SortOrder = string;
export interface ListServiceInstancesInput {
  serviceName?: string;
  nextToken?: string;
  maxResults?: number;
  filters?: ListServiceInstancesFilter[];
  sortBy?: string;
  sortOrder?: string;
}
export const ListServiceInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(ListServiceInstancesFilterList),
    sortBy: S.optional(S.String),
    sortOrder: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceInstancesInput",
}) as any as S.Schema<ListServiceInstancesInput>;
export interface ServiceInstanceSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastDeploymentAttemptedAt: Date;
  lastDeploymentSucceededAt: Date;
  serviceName: string;
  environmentName: string;
  templateName: string;
  templateMajorVersion: string;
  templateMinorVersion: string;
  deploymentStatus: string;
  deploymentStatusMessage?: string | redacted.Redacted<string>;
  lastAttemptedDeploymentId?: string;
  lastSucceededDeploymentId?: string;
}
export const ServiceInstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentAttemptedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastDeploymentSucceededAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    serviceName: S.String,
    environmentName: S.String,
    templateName: S.String,
    templateMajorVersion: S.String,
    templateMinorVersion: S.String,
    deploymentStatus: S.String,
    deploymentStatusMessage: S.optional(SensitiveString),
    lastAttemptedDeploymentId: S.optional(S.String),
    lastSucceededDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceInstanceSummary",
}) as any as S.Schema<ServiceInstanceSummary>;
export type ServiceInstanceSummaryList = ServiceInstanceSummary[];
export const ServiceInstanceSummaryList = /*@__PURE__*/ S.Array(
  ServiceInstanceSummary,
);
export interface ListServiceInstancesOutput {
  nextToken?: string;
  serviceInstances: ServiceInstanceSummary[];
}
export const ListServiceInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    serviceInstances: ServiceInstanceSummaryList,
  }),
).annotate({
  identifier: "ListServiceInstancesOutput",
}) as any as S.Schema<ListServiceInstancesOutput>;
export interface ListServicePipelineOutputsInput {
  serviceName: string;
  nextToken?: string;
  deploymentId?: string;
}
export const ListServicePipelineOutputsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    nextToken: S.optional(S.String),
    deploymentId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServicePipelineOutputsInput",
}) as any as S.Schema<ListServicePipelineOutputsInput>;
export interface ListServicePipelineOutputsOutput {
  nextToken?: string;
  outputs: Output[];
}
export const ListServicePipelineOutputsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), outputs: OutputsList }),
).annotate({
  identifier: "ListServicePipelineOutputsOutput",
}) as any as S.Schema<ListServicePipelineOutputsOutput>;
export interface ListServicePipelineProvisionedResourcesInput {
  serviceName: string;
  nextToken?: string;
}
export const ListServicePipelineProvisionedResourcesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ serviceName: S.String, nextToken: S.optional(S.String) }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListServicePipelineProvisionedResourcesInput",
  }) as any as S.Schema<ListServicePipelineProvisionedResourcesInput>;
export interface ListServicePipelineProvisionedResourcesOutput {
  nextToken?: string;
  provisionedResources: ProvisionedResource[];
}
export const ListServicePipelineProvisionedResourcesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      provisionedResources: ProvisionedResourceList,
    }),
  ).annotate({
    identifier: "ListServicePipelineProvisionedResourcesOutput",
  }) as any as S.Schema<ListServicePipelineProvisionedResourcesOutput>;
export interface ListServicesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServicesInput",
}) as any as S.Schema<ListServicesInput>;
export interface ServiceSummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  arn: string;
  templateName: string;
  createdAt: Date;
  lastModifiedAt: Date;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
}
export const ServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    arn: S.String,
    templateName: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummaryList = ServiceSummary[];
export const ServiceSummaryList = /*@__PURE__*/ S.Array(ServiceSummary);
export interface ListServicesOutput {
  nextToken?: string;
  services: ServiceSummary[];
}
export const ListServicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), services: ServiceSummaryList }),
).annotate({
  identifier: "ListServicesOutput",
}) as any as S.Schema<ListServicesOutput>;
export interface ListServiceTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListServiceTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceTemplatesInput",
}) as any as S.Schema<ListServiceTemplatesInput>;
export interface ServiceTemplateSummary {
  name: string;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  recommendedVersion?: string;
  pipelineProvisioning?: string;
}
export const ServiceTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    recommendedVersion: S.optional(S.String),
    pipelineProvisioning: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceTemplateSummary",
}) as any as S.Schema<ServiceTemplateSummary>;
export type ServiceTemplateSummaryList = ServiceTemplateSummary[];
export const ServiceTemplateSummaryList = /*@__PURE__*/ S.Array(
  ServiceTemplateSummary,
);
export interface ListServiceTemplatesOutput {
  nextToken?: string;
  templates: ServiceTemplateSummary[];
}
export const ListServiceTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    templates: ServiceTemplateSummaryList,
  }),
).annotate({
  identifier: "ListServiceTemplatesOutput",
}) as any as S.Schema<ListServiceTemplatesOutput>;
export interface ListServiceTemplateVersionsInput {
  nextToken?: string;
  maxResults?: number;
  templateName: string;
  majorVersion?: string;
}
export const ListServiceTemplateVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    templateName: S.String,
    majorVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceTemplateVersionsInput",
}) as any as S.Schema<ListServiceTemplateVersionsInput>;
export interface ServiceTemplateVersionSummary {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  recommendedMinorVersion?: string;
  status: string;
  statusMessage?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
export const ServiceTemplateVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
    recommendedMinorVersion: S.optional(S.String),
    status: S.String,
    statusMessage: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    arn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ServiceTemplateVersionSummary",
}) as any as S.Schema<ServiceTemplateVersionSummary>;
export type ServiceTemplateVersionSummaryList = ServiceTemplateVersionSummary[];
export const ServiceTemplateVersionSummaryList = /*@__PURE__*/ S.Array(
  ServiceTemplateVersionSummary,
);
export interface ListServiceTemplateVersionsOutput {
  nextToken?: string;
  templateVersions: ServiceTemplateVersionSummary[];
}
export const ListServiceTemplateVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    templateVersions: ServiceTemplateVersionSummaryList,
  }),
).annotate({
  identifier: "ListServiceTemplateVersionsOutput",
}) as any as S.Schema<ListServiceTemplateVersionsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ResourceDeploymentStatus = string;
export interface NotifyResourceDeploymentStatusChangeInput {
  resourceArn: string;
  status?: string;
  outputs?: Output[];
  deploymentId?: string;
  statusMessage?: string | redacted.Redacted<string>;
}
export const NotifyResourceDeploymentStatusChangeInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resourceArn: S.String,
      status: S.optional(S.String),
      outputs: S.optional(OutputsList),
      deploymentId: S.optional(S.String),
      statusMessage: S.optional(SensitiveString),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "NotifyResourceDeploymentStatusChangeInput",
  }) as any as S.Schema<NotifyResourceDeploymentStatusChangeInput>;
export interface NotifyResourceDeploymentStatusChangeOutput {}
export const NotifyResourceDeploymentStatusChangeOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "NotifyResourceDeploymentStatusChangeOutput",
  }) as any as S.Schema<NotifyResourceDeploymentStatusChangeOutput>;
export interface RejectEnvironmentAccountConnectionInput {
  id: string;
}
export const RejectEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "RejectEnvironmentAccountConnectionInput",
}) as any as S.Schema<RejectEnvironmentAccountConnectionInput>;
export interface RejectEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export const RejectEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ environmentAccountConnection: EnvironmentAccountConnection }),
).annotate({
  identifier: "RejectEnvironmentAccountConnectionOutput",
}) as any as S.Schema<RejectEnvironmentAccountConnectionOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tagKeys: TagKeyList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateAccountSettingsInput {
  pipelineServiceRoleArn?: string;
  pipelineProvisioningRepository?: RepositoryBranchInput;
  deletePipelineProvisioningRepository?: boolean;
  pipelineCodebuildRoleArn?: string;
}
export const UpdateAccountSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineServiceRoleArn: S.optional(S.String),
    pipelineProvisioningRepository: S.optional(RepositoryBranchInput),
    deletePipelineProvisioningRepository: S.optional(S.Boolean),
    pipelineCodebuildRoleArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAccountSettingsInput",
}) as any as S.Schema<UpdateAccountSettingsInput>;
export interface UpdateAccountSettingsOutput {
  accountSettings: AccountSettings;
}
export const UpdateAccountSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountSettings: AccountSettings }),
).annotate({
  identifier: "UpdateAccountSettingsOutput",
}) as any as S.Schema<UpdateAccountSettingsOutput>;
export type ComponentDeploymentUpdateType = string;
export interface UpdateComponentInput {
  name: string;
  deploymentType: string;
  description?: string | redacted.Redacted<string>;
  serviceName?: string;
  serviceInstanceName?: string;
  serviceSpec?: string | redacted.Redacted<string>;
  templateFile?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const UpdateComponentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    deploymentType: S.String,
    description: S.optional(SensitiveString),
    serviceName: S.optional(S.String),
    serviceInstanceName: S.optional(S.String),
    serviceSpec: S.optional(SensitiveString),
    templateFile: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateComponentInput",
}) as any as S.Schema<UpdateComponentInput>;
export interface UpdateComponentOutput {
  component: Component;
}
export const UpdateComponentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ component: Component }),
).annotate({
  identifier: "UpdateComponentOutput",
}) as any as S.Schema<UpdateComponentOutput>;
export type DeploymentUpdateType = string;
export interface UpdateEnvironmentInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  protonServiceRoleArn?: string;
  deploymentType: string;
  environmentAccountConnectionId?: string;
  provisioningRepository?: RepositoryBranchInput;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export const UpdateEnvironmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    spec: S.optional(SensitiveString),
    templateMajorVersion: S.optional(S.String),
    templateMinorVersion: S.optional(S.String),
    protonServiceRoleArn: S.optional(S.String),
    deploymentType: S.String,
    environmentAccountConnectionId: S.optional(S.String),
    provisioningRepository: S.optional(RepositoryBranchInput),
    componentRoleArn: S.optional(S.String),
    codebuildRoleArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEnvironmentInput",
}) as any as S.Schema<UpdateEnvironmentInput>;
export interface UpdateEnvironmentOutput {
  environment: Environment;
}
export const UpdateEnvironmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: Environment }),
).annotate({
  identifier: "UpdateEnvironmentOutput",
}) as any as S.Schema<UpdateEnvironmentOutput>;
export interface UpdateEnvironmentAccountConnectionInput {
  id: string;
  roleArn?: string;
  componentRoleArn?: string;
  codebuildRoleArn?: string;
}
export const UpdateEnvironmentAccountConnectionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      roleArn: S.optional(S.String),
      componentRoleArn: S.optional(S.String),
      codebuildRoleArn: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateEnvironmentAccountConnectionInput",
}) as any as S.Schema<UpdateEnvironmentAccountConnectionInput>;
export interface UpdateEnvironmentAccountConnectionOutput {
  environmentAccountConnection: EnvironmentAccountConnection;
}
export const UpdateEnvironmentAccountConnectionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ environmentAccountConnection: EnvironmentAccountConnection }),
).annotate({
  identifier: "UpdateEnvironmentAccountConnectionOutput",
}) as any as S.Schema<UpdateEnvironmentAccountConnectionOutput>;
export interface UpdateEnvironmentTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const UpdateEnvironmentTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEnvironmentTemplateInput",
}) as any as S.Schema<UpdateEnvironmentTemplateInput>;
export interface UpdateEnvironmentTemplateOutput {
  environmentTemplate: EnvironmentTemplate;
}
export const UpdateEnvironmentTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environmentTemplate: EnvironmentTemplate }),
).annotate({
  identifier: "UpdateEnvironmentTemplateOutput",
}) as any as S.Schema<UpdateEnvironmentTemplateOutput>;
export interface UpdateEnvironmentTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  description?: string | redacted.Redacted<string>;
  status?: string;
}
export const UpdateEnvironmentTemplateVersionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateName: S.String,
      majorVersion: S.String,
      minorVersion: S.String,
      description: S.optional(SensitiveString),
      status: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateEnvironmentTemplateVersionInput",
}) as any as S.Schema<UpdateEnvironmentTemplateVersionInput>;
export interface UpdateEnvironmentTemplateVersionOutput {
  environmentTemplateVersion: EnvironmentTemplateVersion;
}
export const UpdateEnvironmentTemplateVersionOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ environmentTemplateVersion: EnvironmentTemplateVersion }),
).annotate({
  identifier: "UpdateEnvironmentTemplateVersionOutput",
}) as any as S.Schema<UpdateEnvironmentTemplateVersionOutput>;
export interface UpdateServiceInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  spec?: string | redacted.Redacted<string>;
}
export const UpdateServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(SensitiveString),
    spec: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceInput",
}) as any as S.Schema<UpdateServiceInput>;
export interface UpdateServiceOutput {
  service: Service;
}
export const UpdateServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "UpdateServiceOutput",
}) as any as S.Schema<UpdateServiceOutput>;
export interface UpdateServiceInstanceInput {
  name: string;
  serviceName: string;
  deploymentType: string;
  spec?: string | redacted.Redacted<string>;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
  clientToken?: string;
}
export const UpdateServiceInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    serviceName: S.String,
    deploymentType: S.String,
    spec: S.optional(SensitiveString),
    templateMajorVersion: S.optional(S.String),
    templateMinorVersion: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceInstanceInput",
}) as any as S.Schema<UpdateServiceInstanceInput>;
export interface UpdateServiceInstanceOutput {
  serviceInstance: ServiceInstance;
}
export const UpdateServiceInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceInstance: ServiceInstance }),
).annotate({
  identifier: "UpdateServiceInstanceOutput",
}) as any as S.Schema<UpdateServiceInstanceOutput>;
export interface UpdateServicePipelineInput {
  serviceName: string;
  spec: string | redacted.Redacted<string>;
  deploymentType: string;
  templateMajorVersion?: string;
  templateMinorVersion?: string;
}
export const UpdateServicePipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    spec: SensitiveString,
    deploymentType: S.String,
    templateMajorVersion: S.optional(S.String),
    templateMinorVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServicePipelineInput",
}) as any as S.Schema<UpdateServicePipelineInput>;
export interface UpdateServicePipelineOutput {
  pipeline: ServicePipeline;
}
export const UpdateServicePipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pipeline: ServicePipeline }),
).annotate({
  identifier: "UpdateServicePipelineOutput",
}) as any as S.Schema<UpdateServicePipelineOutput>;
export interface UpdateServiceSyncBlockerInput {
  id: string;
  resolvedReason: string;
}
export const UpdateServiceSyncBlockerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, resolvedReason: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceSyncBlockerInput",
}) as any as S.Schema<UpdateServiceSyncBlockerInput>;
export interface UpdateServiceSyncBlockerOutput {
  serviceName: string;
  serviceInstanceName?: string;
  serviceSyncBlocker: SyncBlocker;
}
export const UpdateServiceSyncBlockerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    serviceInstanceName: S.optional(S.String),
    serviceSyncBlocker: SyncBlocker,
  }),
).annotate({
  identifier: "UpdateServiceSyncBlockerOutput",
}) as any as S.Schema<UpdateServiceSyncBlockerOutput>;
export interface UpdateServiceSyncConfigInput {
  serviceName: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  filePath: string;
}
export const UpdateServiceSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    filePath: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceSyncConfigInput",
}) as any as S.Schema<UpdateServiceSyncConfigInput>;
export interface UpdateServiceSyncConfigOutput {
  serviceSyncConfig?: ServiceSyncConfig;
}
export const UpdateServiceSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceSyncConfig: S.optional(ServiceSyncConfig) }),
).annotate({
  identifier: "UpdateServiceSyncConfigOutput",
}) as any as S.Schema<UpdateServiceSyncConfigOutput>;
export interface UpdateServiceTemplateInput {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const UpdateServiceTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceTemplateInput",
}) as any as S.Schema<UpdateServiceTemplateInput>;
export interface UpdateServiceTemplateOutput {
  serviceTemplate: ServiceTemplate;
}
export const UpdateServiceTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplate: ServiceTemplate }),
).annotate({
  identifier: "UpdateServiceTemplateOutput",
}) as any as S.Schema<UpdateServiceTemplateOutput>;
export interface UpdateServiceTemplateVersionInput {
  templateName: string;
  majorVersion: string;
  minorVersion: string;
  description?: string | redacted.Redacted<string>;
  status?: string;
  compatibleEnvironmentTemplates?: CompatibleEnvironmentTemplateInput[];
  supportedComponentSources?: string[];
}
export const UpdateServiceTemplateVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    majorVersion: S.String,
    minorVersion: S.String,
    description: S.optional(SensitiveString),
    status: S.optional(S.String),
    compatibleEnvironmentTemplates: S.optional(
      CompatibleEnvironmentTemplateInputList,
    ),
    supportedComponentSources: S.optional(
      ServiceTemplateSupportedComponentSourceInputList,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateServiceTemplateVersionInput",
}) as any as S.Schema<UpdateServiceTemplateVersionInput>;
export interface UpdateServiceTemplateVersionOutput {
  serviceTemplateVersion: ServiceTemplateVersion;
}
export const UpdateServiceTemplateVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceTemplateVersion: ServiceTemplateVersion }),
).annotate({
  identifier: "UpdateServiceTemplateVersionOutput",
}) as any as S.Schema<UpdateServiceTemplateVersionOutput>;
export interface UpdateTemplateSyncConfigInput {
  templateName: string;
  templateType: string;
  repositoryProvider: string;
  repositoryName: string;
  branch: string;
  subdirectory?: string;
}
export const UpdateTemplateSyncConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    templateType: S.String,
    repositoryProvider: S.String,
    repositoryName: S.String,
    branch: S.String,
    subdirectory: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTemplateSyncConfigInput",
}) as any as S.Schema<UpdateTemplateSyncConfigInput>;
export interface UpdateTemplateSyncConfigOutput {
  templateSyncConfig?: TemplateSyncConfig;
}
export const UpdateTemplateSyncConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateSyncConfig: S.optional(TemplateSyncConfig) }),
).annotate({
  identifier: "UpdateTemplateSyncConfigOutput",
}) as any as S.Schema<UpdateTemplateSyncConfigOutput>;
export type ErrorMessage = string | redacted.Redacted<string>;
export type AcceptEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In a management account, an environment account connection request is accepted. When the environment account connection request is accepted, Proton
 * can use the associated IAM role to provision environment infrastructure resources in the associated environment account.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const acceptEnvironmentAccountConnection: API.OperationMethod<
  AcceptEnvironmentAccountConnectionInput,
  AcceptEnvironmentAccountConnectionOutput,
  AcceptEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptEnvironmentAccountConnectionInput,
  output: AcceptEnvironmentAccountConnectionOutput,
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
  operationName: "AcceptEnvironmentAccountConnection",
}));

export type CancelComponentDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a component deployment (for a component that is in the `IN_PROGRESS` deployment status).
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const cancelComponentDeployment: API.OperationMethod<
  CancelComponentDeploymentInput,
  CancelComponentDeploymentOutput,
  CancelComponentDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelComponentDeploymentInput,
  output: CancelComponentDeploymentOutput,
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
  operationName: "CancelComponentDeployment",
}));

export type CancelEnvironmentDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel an environment deployment on an UpdateEnvironment action, if the deployment is `IN_PROGRESS`. For more
 * information, see Update an environment in the Proton
 * User guide.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is `FAILED`.
 *
 * - If the current UpdateEnvironment action succeeds before the cancellation attempt starts, the resulting deployment state is
 * `SUCCEEDED` and the cancellation attempt has no effect.
 */
export const cancelEnvironmentDeployment: API.OperationMethod<
  CancelEnvironmentDeploymentInput,
  CancelEnvironmentDeploymentOutput,
  CancelEnvironmentDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelEnvironmentDeploymentInput,
  output: CancelEnvironmentDeploymentOutput,
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
  operationName: "CancelEnvironmentDeployment",
}));

export type CancelServiceInstanceDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a service instance deployment on an UpdateServiceInstance action, if the deployment is `IN_PROGRESS`. For
 * more information, see Update a service instance
 * in the *Proton User guide*.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is
 * `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is
 * `FAILED`.
 *
 * - If the current UpdateServiceInstance action succeeds before the
 * cancellation attempt starts, the resulting deployment state is `SUCCEEDED` and
 * the cancellation attempt has no effect.
 */
export const cancelServiceInstanceDeployment: API.OperationMethod<
  CancelServiceInstanceDeploymentInput,
  CancelServiceInstanceDeploymentOutput,
  CancelServiceInstanceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelServiceInstanceDeploymentInput,
  output: CancelServiceInstanceDeploymentOutput,
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
  operationName: "CancelServiceInstanceDeployment",
}));

export type CancelServicePipelineDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attempts to cancel a service pipeline deployment on an UpdateServicePipeline action, if the deployment is `IN_PROGRESS`. For
 * more information, see Update a service pipeline
 * in the *Proton User guide*.
 *
 * The following list includes potential cancellation scenarios.
 *
 * - If the cancellation attempt succeeds, the resulting deployment state is
 * `CANCELLED`.
 *
 * - If the cancellation attempt fails, the resulting deployment state is
 * `FAILED`.
 *
 * - If the current UpdateServicePipeline action succeeds before the
 * cancellation attempt starts, the resulting deployment state is `SUCCEEDED` and
 * the cancellation attempt has no effect.
 */
export const cancelServicePipelineDeployment: API.OperationMethod<
  CancelServicePipelineDeploymentInput,
  CancelServicePipelineDeploymentOutput,
  CancelServicePipelineDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelServicePipelineDeploymentInput,
  output: CancelServicePipelineDeploymentOutput,
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
  operationName: "CancelServicePipelineDeployment",
}));

export type CreateComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Proton component. A component is an infrastructure extension for a service instance.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const createComponent: API.OperationMethod<
  CreateComponentInput,
  CreateComponentOutput,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComponentInput,
  output: CreateComponentOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deploy a new environment. An Proton environment is created from an environment template that defines infrastructure and resources that can be
 * shared across services.
 *
 * **You can provision environments using the following methods:**
 *
 * - Amazon Web Services-managed provisioning: Proton makes direct calls to provision your resources.
 *
 * - Self-managed provisioning: Proton makes pull requests on your repository to provide compiled infrastructure as code (IaC) files that your IaC
 * engine uses to provision resources.
 *
 * For more information, see Environments and Provisioning methods in the Proton User
 * Guide.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentInput,
  output: CreateEnvironmentOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

export type CreateEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an environment account connection in an environment account so that environment infrastructure resources can be provisioned in the environment
 * account from a management account.
 *
 * An environment account connection is a secure bi-directional connection between a *management account* and an environment
 * account that maintains authorization and permissions. For more information, see Environment account connections in the Proton User
 * guide.
 */
export const createEnvironmentAccountConnection: API.OperationMethod<
  CreateEnvironmentAccountConnectionInput,
  CreateEnvironmentAccountConnectionOutput,
  CreateEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentAccountConnectionInput,
  output: CreateEnvironmentAccountConnectionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentAccountConnection",
}));

export type CreateEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an environment template for Proton. For more information, see Environment Templates in the *Proton User Guide*.
 *
 * You can create an environment template in one of the two following ways:
 *
 * - Register and publish a *standard* environment template that instructs Proton to deploy and manage environment
 * infrastructure.
 *
 * - Register and publish a *customer managed* environment template that connects Proton to your existing provisioned
 * infrastructure that you manage. Proton *doesn't* manage your existing provisioned infrastructure. To create an environment
 * template for customer provisioned and managed infrastructure, include the `provisioning` parameter and set the value to
 * `CUSTOMER_MANAGED`. For more information, see Register
 * and publish an environment template in the *Proton User Guide*.
 */
export const createEnvironmentTemplate: API.OperationMethod<
  CreateEnvironmentTemplateInput,
  CreateEnvironmentTemplateOutput,
  CreateEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentTemplateInput,
  output: CreateEnvironmentTemplateOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentTemplate",
}));

export type CreateEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new major or minor version of an environment template. A major version of an environment template is a version that
 * *isn't* backwards compatible. A minor version of an environment template is a version that's backwards compatible within its major
 * version.
 */
export const createEnvironmentTemplateVersion: API.OperationMethod<
  CreateEnvironmentTemplateVersionInput,
  CreateEnvironmentTemplateVersionOutput,
  CreateEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentTemplateVersionInput,
  output: CreateEnvironmentTemplateVersionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentTemplateVersion",
}));

export type CreateRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create and register a link to a repository. Proton uses the link to repeatedly access the repository, to either push to it (self-managed
 * provisioning) or pull from it (template sync). You can share a linked repository across multiple resources (like environments using self-managed
 * provisioning, or synced templates). When you create a repository link, Proton creates a service-linked role for you.
 *
 * For more information, see Self-managed provisioning, Template bundles, and
 * Template sync configurations in the Proton
 * User Guide.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryInput,
  CreateRepositoryOutput,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRepositoryInput,
  output: CreateRepositoryOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
}));

export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Proton service. An Proton service is an instantiation of a service
 * template and often includes several service instances and pipeline. For more information, see
 * Services
 * in the *Proton User Guide*.
 */
export const createService: API.OperationMethod<
  CreateServiceInput,
  CreateServiceOutput,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceInput,
  output: CreateServiceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type CreateServiceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a service instance.
 */
export const createServiceInstance: API.OperationMethod<
  CreateServiceInstanceInput,
  CreateServiceInstanceOutput,
  CreateServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceInstanceInput,
  output: CreateServiceInstanceOutput,
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
  operationName: "CreateServiceInstance",
}));

export type CreateServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create the Proton Ops configuration file.
 */
export const createServiceSyncConfig: API.OperationMethod<
  CreateServiceSyncConfigInput,
  CreateServiceSyncConfigOutput,
  CreateServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceSyncConfigInput,
  output: CreateServiceSyncConfigOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceSyncConfig",
}));

export type CreateServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a service template. The administrator creates a service template to define
 * standardized infrastructure and an optional CI/CD service pipeline. Developers, in turn,
 * select the service template from Proton. If the selected service template includes a
 * service pipeline definition, they provide a link to their source code repository. Proton
 * then deploys and manages the infrastructure defined by the selected service template. For more
 * information, see Proton templates in the *Proton User Guide*.
 */
export const createServiceTemplate: API.OperationMethod<
  CreateServiceTemplateInput,
  CreateServiceTemplateOutput,
  CreateServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceTemplateInput,
  output: CreateServiceTemplateOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceTemplate",
}));

export type CreateServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new major or minor version of a service template. A major version of a service
 * template is a version that *isn't* backward compatible. A minor version of
 * a service template is a version that's backward compatible within its major version.
 */
export const createServiceTemplateVersion: API.OperationMethod<
  CreateServiceTemplateVersionInput,
  CreateServiceTemplateVersionOutput,
  CreateServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceTemplateVersionInput,
  output: CreateServiceTemplateVersionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceTemplateVersion",
}));

export type CreateTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set up a template to create new template versions automatically by tracking a linked repository. A linked repository is a repository that has
 * been registered with Proton. For more information, see CreateRepository.
 *
 * When a commit is pushed to your linked repository, Proton checks for changes to your repository template bundles. If it detects a template
 * bundle change, a new major or minor version of its template is created, if the version doesn’t already exist. For more information, see Template sync configurations in the Proton
 * User Guide.
 */
export const createTemplateSyncConfig: API.OperationMethod<
  CreateTemplateSyncConfigInput,
  CreateTemplateSyncConfigOutput,
  CreateTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTemplateSyncConfigInput,
  output: CreateTemplateSyncConfigOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplateSyncConfig",
}));

export type DeleteComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an Proton component resource.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentInput,
  DeleteComponentOutput,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComponentInput,
  output: DeleteComponentOutput,
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
  operationName: "DeleteComponent",
}));

export type DeleteDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentOutput,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentInput,
  output: DeleteDeploymentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentOutput,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentInput,
  output: DeleteEnvironmentOutput,
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
  operationName: "DeleteEnvironment",
}));

export type DeleteEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, delete an environment account connection.
 *
 * After you delete an environment account connection that’s in use by an Proton environment, Proton *can’t* manage the
 * environment infrastructure resources until a new environment account connection is accepted for the environment account and associated environment. You're
 * responsible for cleaning up provisioned resources that remain without an environment connection.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const deleteEnvironmentAccountConnection: API.OperationMethod<
  DeleteEnvironmentAccountConnectionInput,
  DeleteEnvironmentAccountConnectionOutput,
  DeleteEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentAccountConnectionInput,
  output: DeleteEnvironmentAccountConnectionOutput,
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
  operationName: "DeleteEnvironmentAccountConnection",
}));

export type DeleteEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other major or minor versions of an environment template exist, delete the environment template.
 */
export const deleteEnvironmentTemplate: API.OperationMethod<
  DeleteEnvironmentTemplateInput,
  DeleteEnvironmentTemplateOutput,
  DeleteEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentTemplateInput,
  output: DeleteEnvironmentTemplateOutput,
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
  operationName: "DeleteEnvironmentTemplate",
}));

export type DeleteEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other minor versions of an environment template exist, delete a major version of the environment template if it's not the
 * `Recommended` version. Delete the `Recommended` version of the environment template if no other major versions or minor versions
 * of the environment template exist. A major version of an environment template is a version that's not backward compatible.
 *
 * Delete a minor version of an environment template if it *isn't* the `Recommended` version. Delete a
 * `Recommended` minor version of the environment template if no other minor versions of the environment template exist. A minor version of an
 * environment template is a version that's backward compatible.
 */
export const deleteEnvironmentTemplateVersion: API.OperationMethod<
  DeleteEnvironmentTemplateVersionInput,
  DeleteEnvironmentTemplateVersionOutput,
  DeleteEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentTemplateVersionInput,
  output: DeleteEnvironmentTemplateVersionOutput,
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
  operationName: "DeleteEnvironmentTemplateVersion",
}));

export type DeleteRepositoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * De-register and unlink your repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryInput,
  DeleteRepositoryOutput,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryInput,
  output: DeleteRepositoryOutput,
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
  operationName: "DeleteRepository",
}));

export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a service, with its instances and pipeline.
 *
 * You can't delete a service if it has any service instances that have components attached
 * to them.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceInput,
  DeleteServiceOutput,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceInput,
  output: DeleteServiceOutput,
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
  operationName: "DeleteService",
}));

export type DeleteServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the Proton Ops file.
 */
export const deleteServiceSyncConfig: API.OperationMethod<
  DeleteServiceSyncConfigInput,
  DeleteServiceSyncConfigOutput,
  DeleteServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceSyncConfigInput,
  output: DeleteServiceSyncConfigOutput,
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
  operationName: "DeleteServiceSyncConfig",
}));

export type DeleteServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other major or minor versions of the service template exist, delete the service
 * template.
 */
export const deleteServiceTemplate: API.OperationMethod<
  DeleteServiceTemplateInput,
  DeleteServiceTemplateOutput,
  DeleteServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceTemplateInput,
  output: DeleteServiceTemplateOutput,
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
  operationName: "DeleteServiceTemplate",
}));

export type DeleteServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * If no other minor versions of a service template exist, delete a major version of the
 * service template if it's not the `Recommended` version. Delete the
 * `Recommended` version of the service template if no other major versions or minor
 * versions of the service template exist. A major version of a service template is a version
 * that *isn't* backwards compatible.
 *
 * Delete a minor version of a service template if it's not the `Recommended`
 * version. Delete a `Recommended` minor version of the service template if no other
 * minor versions of the service template exist. A minor version of a service template is a
 * version that's backwards compatible.
 */
export const deleteServiceTemplateVersion: API.OperationMethod<
  DeleteServiceTemplateVersionInput,
  DeleteServiceTemplateVersionOutput,
  DeleteServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceTemplateVersionInput,
  output: DeleteServiceTemplateVersionOutput,
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
  operationName: "DeleteServiceTemplateVersion",
}));

export type DeleteTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a template sync configuration.
 */
export const deleteTemplateSyncConfig: API.OperationMethod<
  DeleteTemplateSyncConfigInput,
  DeleteTemplateSyncConfigOutput,
  DeleteTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTemplateSyncConfigInput,
  output: DeleteTemplateSyncConfigOutput,
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
  operationName: "DeleteTemplateSyncConfig",
}));

export type GetAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for Proton account-wide settings.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsInput,
  GetAccountSettingsOutput,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsInput,
  output: GetAccountSettingsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a component.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const getComponent: API.OperationMethod<
  GetComponentInput,
  GetComponentOutput,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentInput,
  output: GetComponentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
}));

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentInput,
  output: GetDeploymentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for an environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentInput,
  output: GetEnvironmentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetEnvironmentAccountConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, get the detailed data for an environment account connection.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const getEnvironmentAccountConnection: API.OperationMethod<
  GetEnvironmentAccountConnectionInput,
  GetEnvironmentAccountConnectionOutput,
  GetEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentAccountConnectionInput,
  output: GetEnvironmentAccountConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentAccountConnection",
}));

export type GetEnvironmentTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for an environment template.
 */
export const getEnvironmentTemplate: API.OperationMethod<
  GetEnvironmentTemplateInput,
  GetEnvironmentTemplateOutput,
  GetEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentTemplateInput,
  output: GetEnvironmentTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentTemplate",
}));

export type GetEnvironmentTemplateVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a major or minor version of an environment template.
 */
export const getEnvironmentTemplateVersion: API.OperationMethod<
  GetEnvironmentTemplateVersionInput,
  GetEnvironmentTemplateVersionOutput,
  GetEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentTemplateVersionInput,
  output: GetEnvironmentTemplateVersionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentTemplateVersion",
}));

export type GetRepositoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for a linked repository.
 */
export const getRepository: API.OperationMethod<
  GetRepositoryInput,
  GetRepositoryOutput,
  GetRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryInput,
  output: GetRepositoryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepository",
}));

export type GetRepositorySyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the sync status of a repository used for Proton template sync. For more information about template sync, see .
 *
 * A repository sync status isn't tied to the Proton Repository resource (or any other Proton resource). Therefore, tags on an Proton Repository resource
 * have no effect on this action. Specifically, you can't use these tags to control access to this action using Attribute-based access control
 * (ABAC).
 *
 * For more information about ABAC, see ABAC in the Proton User
 * Guide.
 */
export const getRepositorySyncStatus: API.OperationMethod<
  GetRepositorySyncStatusInput,
  GetRepositorySyncStatusOutput,
  GetRepositorySyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositorySyncStatusInput,
  output: GetRepositorySyncStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositorySyncStatus",
}));

export type GetResourcesSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get counts of Proton resources.
 *
 * For infrastructure-provisioning resources (environments, services, service instances, pipelines), the action returns staleness counts. A
 * resource is stale when it's behind the recommended version of the Proton template that it uses and it needs an update to become current.
 *
 * The action returns staleness counts (counts of resources that are up-to-date, behind a template major version, or behind a template minor
 * version), the total number of resources, and the number of resources that are in a failed state, grouped by resource type. Components,
 * environments, and service templates return less information - see the `components`, `environments`, and
 * `serviceTemplates` field descriptions.
 *
 * For context, the action also returns the total number of each type of Proton template in the Amazon Web Services account.
 *
 * For more information, see Proton dashboard in the
 * *Proton User Guide*.
 */
export const getResourcesSummary: API.OperationMethod<
  GetResourcesSummaryInput,
  GetResourcesSummaryOutput,
  GetResourcesSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcesSummaryInput,
  output: GetResourcesSummaryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcesSummary",
}));

export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service.
 */
export const getService: API.OperationMethod<
  GetServiceInput,
  GetServiceOutput,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceInput,
  output: GetServiceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetServiceInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service instance. A service instance is an instantiation of
 * service template and it runs in a specific environment.
 */
export const getServiceInstance: API.OperationMethod<
  GetServiceInstanceInput,
  GetServiceInstanceOutput,
  GetServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceInstanceInput,
  output: GetServiceInstanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceInstance",
}));

export type GetServiceInstanceSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the status of the synced service instance.
 */
export const getServiceInstanceSyncStatus: API.OperationMethod<
  GetServiceInstanceSyncStatusInput,
  GetServiceInstanceSyncStatusOutput,
  GetServiceInstanceSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceInstanceSyncStatusInput,
  output: GetServiceInstanceSyncStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceInstanceSyncStatus",
}));

export type GetServiceSyncBlockerSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for the service sync blocker summary.
 */
export const getServiceSyncBlockerSummary: API.OperationMethod<
  GetServiceSyncBlockerSummaryInput,
  GetServiceSyncBlockerSummaryOutput,
  GetServiceSyncBlockerSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSyncBlockerSummaryInput,
  output: GetServiceSyncBlockerSummaryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSyncBlockerSummary",
}));

export type GetServiceSyncConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed information for the service sync configuration.
 */
export const getServiceSyncConfig: API.OperationMethod<
  GetServiceSyncConfigInput,
  GetServiceSyncConfigOutput,
  GetServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSyncConfigInput,
  output: GetServiceSyncConfigOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSyncConfig",
}));

export type GetServiceTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a service template.
 */
export const getServiceTemplate: API.OperationMethod<
  GetServiceTemplateInput,
  GetServiceTemplateOutput,
  GetServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceTemplateInput,
  output: GetServiceTemplateOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceTemplate",
}));

export type GetServiceTemplateVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detailed data for a major or minor version of a service template.
 */
export const getServiceTemplateVersion: API.OperationMethod<
  GetServiceTemplateVersionInput,
  GetServiceTemplateVersionOutput,
  GetServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceTemplateVersionInput,
  output: GetServiceTemplateVersionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceTemplateVersion",
}));

export type GetTemplateSyncConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get detail data for a template sync configuration.
 */
export const getTemplateSyncConfig: API.OperationMethod<
  GetTemplateSyncConfigInput,
  GetTemplateSyncConfigOutput,
  GetTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemplateSyncConfigInput,
  output: GetTemplateSyncConfigOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSyncConfig",
}));

export type GetTemplateSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the status of a template sync.
 */
export const getTemplateSyncStatus: API.OperationMethod<
  GetTemplateSyncStatusInput,
  GetTemplateSyncStatusOutput,
  GetTemplateSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemplateSyncStatusInput,
  output: GetTemplateSyncStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSyncStatus",
}));

export type ListComponentOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of component Infrastructure as Code (IaC) outputs.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const listComponentOutputs: API.PaginatedOperationMethod<
  ListComponentOutputsInput,
  ListComponentOutputsOutput,
  ListComponentOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentOutputsInput,
  output: ListComponentOutputsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListComponentProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a component with details.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const listComponentProvisionedResources: API.PaginatedOperationMethod<
  ListComponentProvisionedResourcesInput,
  ListComponentProvisionedResourcesOutput,
  ListComponentProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentProvisionedResourcesInput,
  output: ListComponentProvisionedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List components with summary data. You can filter the result list by environment, service, or a single service instance.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
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
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "components",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List deployments. You can filter the result list by environment, service, or a single service instance.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsInput,
  output: ListDeploymentsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentAccountConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * View a list of environment account connections.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const listEnvironmentAccountConnections: API.PaginatedOperationMethod<
  ListEnvironmentAccountConnectionsInput,
  ListEnvironmentAccountConnectionsOutput,
  ListEnvironmentAccountConnectionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentAccountConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentAccountConnectionsInput,
  output: ListEnvironmentAccountConnectionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentAccountConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentAccountConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the infrastructure as code outputs for your environment.
 */
export const listEnvironmentOutputs: API.PaginatedOperationMethod<
  ListEnvironmentOutputsInput,
  ListEnvironmentOutputsOutput,
  ListEnvironmentOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentOutputsInput,
  output: ListEnvironmentOutputsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListEnvironmentProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the provisioned resources for your environment.
 */
export const listEnvironmentProvisionedResources: API.PaginatedOperationMethod<
  ListEnvironmentProvisionedResourcesInput,
  ListEnvironmentProvisionedResourcesOutput,
  ListEnvironmentProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentProvisionedResourcesInput,
  output: ListEnvironmentProvisionedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List environments with detail data summaries.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsInput,
  output: ListEnvironmentsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List environment templates.
 */
export const listEnvironmentTemplates: API.PaginatedOperationMethod<
  ListEnvironmentTemplatesInput,
  ListEnvironmentTemplatesOutput,
  ListEnvironmentTemplatesError,
  Credentials | HttpClient.HttpClient,
  EnvironmentTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentTemplatesInput,
  output: ListEnvironmentTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentTemplateVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List major or minor versions of an environment template with detail data.
 */
export const listEnvironmentTemplateVersions: API.PaginatedOperationMethod<
  ListEnvironmentTemplateVersionsInput,
  ListEnvironmentTemplateVersionsOutput,
  ListEnvironmentTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentTemplateVersionsInput,
  output: ListEnvironmentTemplateVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List linked repositories with detail data.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesInput,
  ListRepositoriesOutput,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesInput,
  output: ListRepositoriesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositorySyncDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List repository sync definitions with detail data.
 */
export const listRepositorySyncDefinitions: API.PaginatedOperationMethod<
  ListRepositorySyncDefinitionsInput,
  ListRepositorySyncDefinitionsOutput,
  ListRepositorySyncDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RepositorySyncDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositorySyncDefinitionsInput,
  output: ListRepositorySyncDefinitionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositorySyncDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "syncDefinitions",
  } as const,
})) as any;

export type ListServiceInstanceOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list service of instance Infrastructure as Code (IaC) outputs.
 */
export const listServiceInstanceOutputs: API.PaginatedOperationMethod<
  ListServiceInstanceOutputsInput,
  ListServiceInstanceOutputsOutput,
  ListServiceInstanceOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceInstanceOutputsInput,
  output: ListServiceInstanceOutputsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstanceOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListServiceInstanceProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a service instance with details.
 */
export const listServiceInstanceProvisionedResources: API.PaginatedOperationMethod<
  ListServiceInstanceProvisionedResourcesInput,
  ListServiceInstanceProvisionedResourcesOutput,
  ListServiceInstanceProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceInstanceProvisionedResourcesInput,
  output: ListServiceInstanceProvisionedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstanceProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListServiceInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List service instances with summary data. This action lists service instances of all
 * services in the Amazon Web Services account.
 */
export const listServiceInstances: API.PaginatedOperationMethod<
  ListServiceInstancesInput,
  ListServiceInstancesOutput,
  ListServiceInstancesError,
  Credentials | HttpClient.HttpClient,
  ServiceInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceInstancesInput,
  output: ListServiceInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicePipelineOutputsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of service pipeline Infrastructure as Code (IaC) outputs.
 */
export const listServicePipelineOutputs: API.PaginatedOperationMethod<
  ListServicePipelineOutputsInput,
  ListServicePipelineOutputsOutput,
  ListServicePipelineOutputsError,
  Credentials | HttpClient.HttpClient,
  Output
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicePipelineOutputsInput,
  output: ListServicePipelineOutputsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicePipelineOutputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "outputs",
  } as const,
})) as any;

export type ListServicePipelineProvisionedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List provisioned resources for a service and pipeline with details.
 */
export const listServicePipelineProvisionedResources: API.PaginatedOperationMethod<
  ListServicePipelineProvisionedResourcesInput,
  ListServicePipelineProvisionedResourcesOutput,
  ListServicePipelineProvisionedResourcesError,
  Credentials | HttpClient.HttpClient,
  ProvisionedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicePipelineProvisionedResourcesInput,
  output: ListServicePipelineProvisionedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicePipelineProvisionedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedResources",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List services with summaries of detail data.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesInput,
  output: ListServicesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "services",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List service templates with detail data.
 */
export const listServiceTemplates: API.PaginatedOperationMethod<
  ListServiceTemplatesInput,
  ListServiceTemplatesOutput,
  ListServiceTemplatesError,
  Credentials | HttpClient.HttpClient,
  ServiceTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceTemplatesInput,
  output: ListServiceTemplatesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTemplateVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List major or minor versions of a service template with detail data.
 */
export const listServiceTemplateVersions: API.PaginatedOperationMethod<
  ListServiceTemplateVersionsInput,
  ListServiceTemplateVersionsOutput,
  ListServiceTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  ServiceTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceTemplateVersionsInput,
  output: ListServiceTemplateVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templateVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for a resource. For more information, see Proton
 * resources and tagging in the *Proton User Guide*.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type NotifyResourceDeploymentStatusChangeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Notify Proton of status changes to a provisioned resource when you use self-managed provisioning.
 *
 * For more information, see Self-managed provisioning in the *Proton User Guide*.
 */
export const notifyResourceDeploymentStatusChange: API.OperationMethod<
  NotifyResourceDeploymentStatusChangeInput,
  NotifyResourceDeploymentStatusChangeOutput,
  NotifyResourceDeploymentStatusChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyResourceDeploymentStatusChangeInput,
  output: NotifyResourceDeploymentStatusChangeOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyResourceDeploymentStatusChange",
}));

export type RejectEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In a management account, reject an environment account connection from another environment account.
 *
 * After you reject an environment account connection request, you *can't* accept or use the rejected environment account
 * connection.
 *
 * You *can’t* reject an environment account connection that's connected to an environment.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const rejectEnvironmentAccountConnection: API.OperationMethod<
  RejectEnvironmentAccountConnectionInput,
  RejectEnvironmentAccountConnectionOutput,
  RejectEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectEnvironmentAccountConnectionInput,
  output: RejectEnvironmentAccountConnectionOutput,
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
  operationName: "RejectEnvironmentAccountConnection",
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
 * Tag a resource. A tag is a key-value pair of metadata that you associate with an Proton resource.
 *
 * For more information, see Proton resources and tagging in
 * the *Proton User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
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
 * Remove a customer tag from a resource. A tag is a key-value pair of metadata associated with an Proton resource.
 *
 * For more information, see Proton resources and tagging in
 * the *Proton User Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
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

export type UpdateAccountSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update Proton settings that are used for multiple services in the Amazon Web Services account.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a component.
 *
 * There are a few modes for updating a component. The `deploymentType` field defines the mode.
 *
 * You can't update a component while its deployment status, or the deployment status of a service instance attached to it, is
 * `IN_PROGRESS`.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateComponent: API.OperationMethod<
  UpdateComponentInput,
  UpdateComponentOutput,
  UpdateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComponentInput,
  output: UpdateComponentOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponent",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an environment.
 *
 * If the environment is associated with an environment account connection, *don't* update or include the
 * `protonServiceRoleArn` and `provisioningRepository` parameter to update or connect to an environment account connection.
 *
 * You can only update to a new environment account connection if that connection was created in the same environment account that the current
 * environment account connection was created in. The account connection must also be associated with the current environment.
 *
 * If the environment *isn't* associated with an environment account connection, *don't* update or include the
 * `environmentAccountConnectionId` parameter. You *can't* update or connect the environment to an environment account
 * connection if it *isn't* already associated with an environment connection.
 *
 * You can update either the `environmentAccountConnectionId` or `protonServiceRoleArn` parameter and value. You can’t update
 * both.
 *
 * If the environment was configured for Amazon Web Services-managed provisioning, omit the `provisioningRepository` parameter.
 *
 * If the environment was configured for self-managed provisioning, specify the `provisioningRepository` parameter and omit the
 * `protonServiceRoleArn` and `environmentAccountConnectionId` parameters.
 *
 * For more information, see Environments and Provisioning methods in the Proton User
 * Guide.
 *
 * There are four modes for updating an environment. The `deploymentType` field defines the mode.
 *
 * `NONE`
 *
 * In this mode, a deployment *doesn't* occur. Only the requested metadata parameters are updated.
 *
 * `CURRENT_VERSION`
 *
 * In this mode, the environment is deployed and updated with the new spec that you provide. Only requested parameters are updated.
 * *Don’t* include minor or major version parameters when you use this `deployment-type`.
 *
 * `MINOR_VERSION`
 *
 * In this mode, the environment is deployed and updated with the published, recommended (latest) minor version of the current major version in
 * use, by default. You can also specify a different minor version of the current major version in use.
 *
 * `MAJOR_VERSION`
 *
 * In this mode, the environment is deployed and updated with the published, recommended (latest) major and minor version of the current template,
 * by default. You can also specify a different major version that's higher than the major version in use and a minor version.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentInput,
  output: UpdateEnvironmentOutput,
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
  operationName: "UpdateEnvironment",
}));

export type UpdateEnvironmentAccountConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * In an environment account, update an environment account connection to use a new IAM role.
 *
 * For more information, see Environment account
 * connections in the *Proton User guide*.
 */
export const updateEnvironmentAccountConnection: API.OperationMethod<
  UpdateEnvironmentAccountConnectionInput,
  UpdateEnvironmentAccountConnectionOutput,
  UpdateEnvironmentAccountConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentAccountConnectionInput,
  output: UpdateEnvironmentAccountConnectionOutput,
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
  operationName: "UpdateEnvironmentAccountConnection",
}));

export type UpdateEnvironmentTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an environment template.
 */
export const updateEnvironmentTemplate: API.OperationMethod<
  UpdateEnvironmentTemplateInput,
  UpdateEnvironmentTemplateOutput,
  UpdateEnvironmentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentTemplateInput,
  output: UpdateEnvironmentTemplateOutput,
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
  operationName: "UpdateEnvironmentTemplate",
}));

export type UpdateEnvironmentTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a major or minor version of an environment template.
 */
export const updateEnvironmentTemplateVersion: API.OperationMethod<
  UpdateEnvironmentTemplateVersionInput,
  UpdateEnvironmentTemplateVersionOutput,
  UpdateEnvironmentTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentTemplateVersionInput,
  output: UpdateEnvironmentTemplateVersionOutput,
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
  operationName: "UpdateEnvironmentTemplateVersion",
}));

export type UpdateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Edit a service description or use a spec to add and delete service instances.
 *
 * Existing service instances and the service pipeline *can't* be edited
 * using this API. They can only be deleted.
 *
 * Use the `description` parameter to modify the description.
 *
 * Edit the `spec` parameter to add or delete instances.
 *
 * You can't delete a service instance (remove it from the spec) if it has an attached
 * component.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateService: API.OperationMethod<
  UpdateServiceInput,
  UpdateServiceOutput,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceInput,
  output: UpdateServiceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateServiceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a service instance.
 *
 * There are a few modes for updating a service instance. The `deploymentType`
 * field defines the mode.
 *
 * You can't update a service instance while its deployment status, or the deployment
 * status of a component attached to it, is `IN_PROGRESS`.
 *
 * For more information about components, see
 * Proton components in the
 * *Proton User Guide*.
 */
export const updateServiceInstance: API.OperationMethod<
  UpdateServiceInstanceInput,
  UpdateServiceInstanceOutput,
  UpdateServiceInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceInstanceInput,
  output: UpdateServiceInstanceOutput,
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
  operationName: "UpdateServiceInstance",
}));

export type UpdateServicePipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the service pipeline.
 *
 * There are four modes for updating a service pipeline. The `deploymentType`
 * field defines the mode.
 *
 * `NONE`
 *
 * In this mode, a deployment *doesn't* occur. Only the requested
 * metadata parameters are updated.
 *
 * `CURRENT_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the new spec that
 * you provide. Only requested parameters are updated. *Don’t* include
 * major or minor version parameters when you use this `deployment-type`.
 *
 * `MINOR_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the published,
 * recommended (latest) minor version of the current major version in use, by default. You
 * can specify a different minor version of the current major version in use.
 *
 * `MAJOR_VERSION`
 *
 * In this mode, the service pipeline is deployed and updated with the published,
 * recommended (latest) major and minor version of the current template by default. You can
 * specify a different major version that's higher than the major version in use and a
 * minor version.
 */
export const updateServicePipeline: API.OperationMethod<
  UpdateServicePipelineInput,
  UpdateServicePipelineOutput,
  UpdateServicePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServicePipelineInput,
  output: UpdateServicePipelineOutput,
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
  operationName: "UpdateServicePipeline",
}));

export type UpdateServiceSyncBlockerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the service sync blocker by resolving it.
 */
export const updateServiceSyncBlocker: API.OperationMethod<
  UpdateServiceSyncBlockerInput,
  UpdateServiceSyncBlockerOutput,
  UpdateServiceSyncBlockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSyncBlockerInput,
  output: UpdateServiceSyncBlockerOutput,
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
  operationName: "UpdateServiceSyncBlocker",
}));

export type UpdateServiceSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the Proton Ops config file.
 */
export const updateServiceSyncConfig: API.OperationMethod<
  UpdateServiceSyncConfigInput,
  UpdateServiceSyncConfigOutput,
  UpdateServiceSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSyncConfigInput,
  output: UpdateServiceSyncConfigOutput,
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
  operationName: "UpdateServiceSyncConfig",
}));

export type UpdateServiceTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a service template.
 */
export const updateServiceTemplate: API.OperationMethod<
  UpdateServiceTemplateInput,
  UpdateServiceTemplateOutput,
  UpdateServiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceTemplateInput,
  output: UpdateServiceTemplateOutput,
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
  operationName: "UpdateServiceTemplate",
}));

export type UpdateServiceTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a major or minor version of a service template.
 */
export const updateServiceTemplateVersion: API.OperationMethod<
  UpdateServiceTemplateVersionInput,
  UpdateServiceTemplateVersionOutput,
  UpdateServiceTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceTemplateVersionInput,
  output: UpdateServiceTemplateVersionOutput,
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
  operationName: "UpdateServiceTemplateVersion",
}));

export type UpdateTemplateSyncConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update template sync configuration parameters, except for the `templateName` and `templateType`. Repository details
 * (branch, name, and provider) should be of a linked repository. A linked repository is a repository that has been registered with Proton. For
 * more information, see CreateRepository.
 */
export const updateTemplateSyncConfig: API.OperationMethod<
  UpdateTemplateSyncConfigInput,
  UpdateTemplateSyncConfigOutput,
  UpdateTemplateSyncConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTemplateSyncConfigInput,
  output: UpdateTemplateSyncConfigOutput,
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
  operationName: "UpdateTemplateSyncConfig",
}));
