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
  sdkId: "Lambda Microvms",
  serviceShapeName: "LambdaMicrovms",
});
const auth = T.AwsAuthSigv4({ name: "lambda" });
const ver = T.ServiceVersion("2025-09-09");
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
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceType: S.optional(S.String),
      resourceId: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type MicrovmIdentifier = string;
export type PositiveInteger = number;
export type PortNumber = number;
export interface PortRange {
  startPort: number;
  endPort: number;
}
export const PortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startPort: S.Number, endPort: S.Number }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export type PortSpecification =
  | { port: number; range?: never; allPorts?: never }
  | { port?: never; range: PortRange; allPorts?: never }
  | { port?: never; range?: never; allPorts: Record<string, never> };
export const PortSpecification = /*@__PURE__*/ S.Union([
  S.Struct({ port: S.Number }),
  S.Struct({ range: PortRange }),
  S.Struct({ allPorts: S.Struct({}) }),
]);
export type ListOfPortSpecification = PortSpecification[];
export const ListOfPortSpecification = /*@__PURE__*/ S.Array(PortSpecification);
export interface CreateMicrovmAuthTokenRequest {
  microvmIdentifier: string;
  expirationInMinutes: number;
  allowedPorts: PortSpecification[];
}
export const CreateMicrovmAuthTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
    expirationInMinutes: S.Number,
    allowedPorts: ListOfPortSpecification,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-09-09/microvms/{microvmIdentifier}/auth-token",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMicrovmAuthTokenRequest",
}) as any as S.Schema<CreateMicrovmAuthTokenRequest>;
export type AuthTokenKey = string;
export type AuthTokenValue = string | redacted.Redacted<string>;
export type TokenParts = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const TokenParts = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface CreateMicrovmAuthTokenResponse {
  authToken: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const CreateMicrovmAuthTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authToken: TokenParts }),
).annotate({
  identifier: "CreateMicrovmAuthTokenResponse",
}) as any as S.Schema<CreateMicrovmAuthTokenResponse>;
export type NonBlankString = string;
export type Version = string;
export type RoleArn = string;
export type CodeArtifact = { uri: string };
export const CodeArtifact = /*@__PURE__*/ S.Union([
  S.Struct({ uri: S.String }),
]);
export interface LoggingDisabled {}
export const LoggingDisabled = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "LoggingDisabled",
}) as any as S.Schema<LoggingDisabled>;
export interface CloudWatchLogging {
  logGroup?: string;
  logStream?: string;
}
export const CloudWatchLogging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logGroup: S.optional(S.String), logStream: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogging",
}) as any as S.Schema<CloudWatchLogging>;
export type Logging =
  | { disabled: LoggingDisabled; cloudWatch?: never }
  | { disabled?: never; cloudWatch: CloudWatchLogging };
export const Logging = /*@__PURE__*/ S.Union([
  S.Struct({ disabled: LoggingDisabled }),
  S.Struct({ cloudWatch: CloudWatchLogging }),
]);
export type NetworkConnector = string;
export type NetworkConnectorList = string[];
export const NetworkConnectorList = /*@__PURE__*/ S.Array(S.String);
export type Architecture = "ARM_64" | (string & {});
export const Architecture = /*@__PURE__*/ S.String;

export interface CpuConfiguration {
  architecture: Architecture;
}
export const CpuConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ architecture: Architecture }),
).annotate({
  identifier: "CpuConfiguration",
}) as any as S.Schema<CpuConfiguration>;
export type CpuConfigurationList = CpuConfiguration[];
export const CpuConfigurationList = /*@__PURE__*/ S.Array(CpuConfiguration);
export interface Resources {
  minimumMemoryInMiB: number;
}
export const Resources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ minimumMemoryInMiB: S.Number }),
).annotate({ identifier: "Resources" }) as any as S.Schema<Resources>;
export type ResourcesList = Resources[];
export const ResourcesList = /*@__PURE__*/ S.Array(Resources);
export type Capability = "ALL" | (string & {});
export const Capability = /*@__PURE__*/ S.String;

export type CapabilityList = Capability[];
export const CapabilityList = /*@__PURE__*/ S.Array(Capability);
export type HookState = "DISABLED" | "ENABLED" | (string & {});
export const HookState = /*@__PURE__*/ S.String;

export interface MicrovmHooks {
  run?: HookState;
  runTimeoutInSeconds?: number;
  resume?: HookState;
  resumeTimeoutInSeconds?: number;
  suspend?: HookState;
  suspendTimeoutInSeconds?: number;
  terminate?: HookState;
  terminateTimeoutInSeconds?: number;
}
export const MicrovmHooks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    run: S.optional(HookState),
    runTimeoutInSeconds: S.optional(S.Number),
    resume: S.optional(HookState),
    resumeTimeoutInSeconds: S.optional(S.Number),
    suspend: S.optional(HookState),
    suspendTimeoutInSeconds: S.optional(S.Number),
    terminate: S.optional(HookState),
    terminateTimeoutInSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "MicrovmHooks" }) as any as S.Schema<MicrovmHooks>;
export interface MicrovmImageHooks {
  ready?: HookState;
  readyTimeoutInSeconds?: number;
  validate?: HookState;
  validateTimeoutInSeconds?: number;
}
export const MicrovmImageHooks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ready: S.optional(HookState),
    readyTimeoutInSeconds: S.optional(S.Number),
    validate: S.optional(HookState),
    validateTimeoutInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "MicrovmImageHooks",
}) as any as S.Schema<MicrovmImageHooks>;
export interface Hooks {
  port?: number;
  microvmHooks?: MicrovmHooks;
  microvmImageHooks?: MicrovmImageHooks;
}
export const Hooks = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    port: S.optional(S.Number),
    microvmHooks: S.optional(MicrovmHooks),
    microvmImageHooks: S.optional(MicrovmImageHooks),
  }),
).annotate({ identifier: "Hooks" }) as any as S.Schema<Hooks>;
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariableMap = { [key: string]: string | undefined };
export const EnvironmentVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ImageName = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateMicrovmImageRequest {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  name: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateMicrovmImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    name: S.String,
    tags: S.optional(Tags),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2025-09-09/microvm-images" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMicrovmImageRequest",
}) as any as S.Schema<CreateMicrovmImageRequest>;
export type MicrovmImageState =
  | "CREATING"
  | "CREATED"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export const MicrovmImageState = /*@__PURE__*/ S.String;

export interface CreateMicrovmImageResponse {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
  imageVersion: string;
}
export const CreateMicrovmImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    name: S.String,
    state: MicrovmImageState,
    latestActiveImageVersion: S.optional(S.String),
    latestFailedImageVersion: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    tags: S.optional(Tags),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageVersion: S.String,
  }),
).annotate({
  identifier: "CreateMicrovmImageResponse",
}) as any as S.Schema<CreateMicrovmImageResponse>;
export interface CreateMicrovmShellAuthTokenRequest {
  microvmIdentifier: string;
  expirationInMinutes: number;
}
export const CreateMicrovmShellAuthTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
    expirationInMinutes: S.Number,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-09-09/microvms/{microvmIdentifier}/shell-auth-token",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMicrovmShellAuthTokenRequest",
}) as any as S.Schema<CreateMicrovmShellAuthTokenRequest>;
export interface CreateMicrovmShellAuthTokenResponse {
  authToken: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const CreateMicrovmShellAuthTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authToken: TokenParts }),
).annotate({
  identifier: "CreateMicrovmShellAuthTokenResponse",
}) as any as S.Schema<CreateMicrovmShellAuthTokenResponse>;
export type MicrovmImageIdentifier = string;
export interface DeleteMicrovmImageInput {
  imageIdentifier: string;
}
export const DeleteMicrovmImageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMicrovmImageInput",
}) as any as S.Schema<DeleteMicrovmImageInput>;
export interface DeleteMicrovmImageOutput {
  imageIdentifier: string;
  state: MicrovmImageState;
}
export const DeleteMicrovmImageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ imageIdentifier: S.String, state: MicrovmImageState }),
).annotate({
  identifier: "DeleteMicrovmImageOutput",
}) as any as S.Schema<DeleteMicrovmImageOutput>;
export interface DeleteMicrovmImageVersionInput {
  imageIdentifier: string;
  imageVersion: string;
}
export const DeleteMicrovmImageVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMicrovmImageVersionInput",
}) as any as S.Schema<DeleteMicrovmImageVersionInput>;
export type MicrovmImageVersionState =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export const MicrovmImageVersionState = /*@__PURE__*/ S.String;

export interface DeleteMicrovmImageVersionOutput {
  imageIdentifier: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
}
export const DeleteMicrovmImageVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String,
    imageVersion: S.String,
    state: MicrovmImageVersionState,
  }),
).annotate({
  identifier: "DeleteMicrovmImageVersionOutput",
}) as any as S.Schema<DeleteMicrovmImageVersionOutput>;
export interface GetMicrovmRequest {
  microvmIdentifier: string;
}
export const GetMicrovmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvms/{microvmIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMicrovmRequest",
}) as any as S.Schema<GetMicrovmRequest>;
export type MicrovmState =
  | "PENDING"
  | "RUNNING"
  | "SUSPENDING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | (string & {});
export const MicrovmState = /*@__PURE__*/ S.String;

export type MicrovmImageArn = string;
export interface IdlePolicy {
  maxIdleDurationSeconds: number;
  suspendedDurationSeconds: number;
  autoResumeEnabled: boolean;
}
export const IdlePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxIdleDurationSeconds: S.Number,
    suspendedDurationSeconds: S.Number,
    autoResumeEnabled: S.Boolean,
  }),
).annotate({ identifier: "IdlePolicy" }) as any as S.Schema<IdlePolicy>;
export interface GetMicrovmResponse {
  microvmId: string;
  state: MicrovmState;
  endpoint: string;
  imageArn: string;
  imageVersion: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  maximumDurationInSeconds: number;
  startedAt: Date;
  terminatedAt?: Date;
  stateReason?: string;
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
}
export const GetMicrovmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmId: S.String,
    state: MicrovmState,
    endpoint: S.String,
    imageArn: S.String,
    imageVersion: S.String,
    executionRoleArn: S.optional(S.String),
    idlePolicy: S.optional(IdlePolicy),
    maximumDurationInSeconds: S.Number,
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    terminatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateReason: S.optional(S.String),
    ingressNetworkConnectors: S.optional(NetworkConnectorList),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
  }),
).annotate({
  identifier: "GetMicrovmResponse",
}) as any as S.Schema<GetMicrovmResponse>;
export interface GetMicrovmImageInput {
  imageIdentifier: string;
}
export const GetMicrovmImageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMicrovmImageInput",
}) as any as S.Schema<GetMicrovmImageInput>;
export interface GetMicrovmImageOutput {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  updatedAt?: Date;
}
export const GetMicrovmImageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    name: S.String,
    state: MicrovmImageState,
    latestActiveImageVersion: S.optional(S.String),
    latestFailedImageVersion: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(Tags),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetMicrovmImageOutput",
}) as any as S.Schema<GetMicrovmImageOutput>;
export interface GetMicrovmImageBuildInput {
  imageIdentifier: string;
  imageVersion: string;
  buildId: string;
}
export const GetMicrovmImageBuildInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
    buildId: S.String.pipe(T.HttpLabel("buildId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds/{buildId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMicrovmImageBuildInput",
}) as any as S.Schema<GetMicrovmImageBuildInput>;
export type BuildState =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export const BuildState = /*@__PURE__*/ S.String;

export type Chipset = "GRAVITON" | (string & {});
export const Chipset = /*@__PURE__*/ S.String;

export interface SnapshotBuild {
  memorySnapshotSizeInBytes?: number;
  codeInstallSizeInBytes?: number;
  diskSnapshotSizeInBytes?: number;
}
export const SnapshotBuild = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memorySnapshotSizeInBytes: S.optional(S.Number),
    codeInstallSizeInBytes: S.optional(S.Number),
    diskSnapshotSizeInBytes: S.optional(S.Number),
  }),
).annotate({ identifier: "SnapshotBuild" }) as any as S.Schema<SnapshotBuild>;
export interface GetMicrovmImageBuildOutput {
  imageArn: string;
  imageVersion: string;
  buildId: string;
  buildState: BuildState;
  architecture: Architecture;
  chipset: Chipset;
  chipsetGeneration: string;
  stateReason?: string;
  createdAt: Date;
  snapshotBuild?: SnapshotBuild;
}
export const GetMicrovmImageBuildOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    imageVersion: S.String,
    buildId: S.String,
    buildState: BuildState,
    architecture: Architecture,
    chipset: Chipset,
    chipsetGeneration: S.String,
    stateReason: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    snapshotBuild: S.optional(SnapshotBuild),
  }),
).annotate({
  identifier: "GetMicrovmImageBuildOutput",
}) as any as S.Schema<GetMicrovmImageBuildOutput>;
export interface GetMicrovmImageVersionInput {
  imageIdentifier: string;
  imageVersion: string;
}
export const GetMicrovmImageVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMicrovmImageVersionInput",
}) as any as S.Schema<GetMicrovmImageVersionInput>;
export type MicrovmImageVersionStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const MicrovmImageVersionStatus = /*@__PURE__*/ S.String;

export interface GetMicrovmImageVersionOutput {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetMicrovmImageVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    imageArn: S.String,
    imageVersion: S.String,
    state: MicrovmImageVersionState,
    status: MicrovmImageVersionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateReason: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetMicrovmImageVersionOutput",
}) as any as S.Schema<GetMicrovmImageVersionOutput>;
export interface ListManagedMicrovmImagesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedMicrovmImagesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2025-09-09/managed-microvm-images" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedMicrovmImagesInput",
}) as any as S.Schema<ListManagedMicrovmImagesInput>;
export interface ManagedMicrovmImageSummary {
  imageArn: string;
  createdAt: Date;
  updatedAt?: Date;
}
export const ManagedMicrovmImageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ManagedMicrovmImageSummary",
}) as any as S.Schema<ManagedMicrovmImageSummary>;
export type ManagedMicrovmImageSummaryList = ManagedMicrovmImageSummary[];
export const ManagedMicrovmImageSummaryList = /*@__PURE__*/ S.Array(
  ManagedMicrovmImageSummary,
);
export interface ListManagedMicrovmImagesOutput {
  nextToken?: string;
  items: ManagedMicrovmImageSummary[];
}
export const ListManagedMicrovmImagesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: ManagedMicrovmImageSummaryList,
  }),
).annotate({
  identifier: "ListManagedMicrovmImagesOutput",
}) as any as S.Schema<ListManagedMicrovmImagesOutput>;
export interface ListManagedMicrovmImageVersionsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
}
export const ListManagedMicrovmImageVersionsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2025-09-09/managed-microvm-images/{imageIdentifier}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListManagedMicrovmImageVersionsInput",
}) as any as S.Schema<ListManagedMicrovmImageVersionsInput>;
export interface ManagedMicrovmImageVersion {
  imageArn: string;
  imageVersion: string;
  createdAt: Date;
  updatedAt?: Date;
}
export const ManagedMicrovmImageVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    imageVersion: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ManagedMicrovmImageVersion",
}) as any as S.Schema<ManagedMicrovmImageVersion>;
export type ManagedMicrovmImageVersionList = ManagedMicrovmImageVersion[];
export const ManagedMicrovmImageVersionList = /*@__PURE__*/ S.Array(
  ManagedMicrovmImageVersion,
);
export interface ListManagedMicrovmImageVersionsOutput {
  nextToken?: string;
  items: ManagedMicrovmImageVersion[];
}
export const ListManagedMicrovmImageVersionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      items: ManagedMicrovmImageVersionList,
    }),
).annotate({
  identifier: "ListManagedMicrovmImageVersionsOutput",
}) as any as S.Schema<ListManagedMicrovmImageVersionsOutput>;
export interface ListMicrovmImageBuildsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
  imageVersion: string;
  architecture?: Architecture;
  chipset?: Chipset;
  chipsetGeneration?: string;
}
export const ListMicrovmImageBuildsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
    architecture: S.optional(Architecture).pipe(T.HttpQuery("architecture")),
    chipset: S.optional(Chipset).pipe(T.HttpQuery("chipset")),
    chipsetGeneration: S.optional(S.String).pipe(
      T.HttpQuery("chipsetGeneration"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}/builds",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMicrovmImageBuildsInput",
}) as any as S.Schema<ListMicrovmImageBuildsInput>;
export interface MicrovmImageBuildSummary {
  imageArn: string;
  imageVersion: string;
  buildId: string;
  buildState: BuildState;
  architecture: Architecture;
  chipset: Chipset;
  chipsetGeneration: string;
  stateReason?: string;
  createdAt: Date;
}
export const MicrovmImageBuildSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    imageVersion: S.String,
    buildId: S.String,
    buildState: BuildState,
    architecture: Architecture,
    chipset: Chipset,
    chipsetGeneration: S.String,
    stateReason: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "MicrovmImageBuildSummary",
}) as any as S.Schema<MicrovmImageBuildSummary>;
export type MicrovmImageBuildSummaries = MicrovmImageBuildSummary[];
export const MicrovmImageBuildSummaries = /*@__PURE__*/ S.Array(
  MicrovmImageBuildSummary,
);
export interface ListMicrovmImageBuildsOutput {
  nextToken?: string;
  items: MicrovmImageBuildSummary[];
}
export const ListMicrovmImageBuildsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: MicrovmImageBuildSummaries,
  }),
).annotate({
  identifier: "ListMicrovmImageBuildsOutput",
}) as any as S.Schema<ListMicrovmImageBuildsOutput>;
export interface ListMicrovmImagesRequest {
  maxResults?: number;
  nextToken?: string;
  nameFilter?: string;
}
export const ListMicrovmImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    nameFilter: S.optional(S.String).pipe(T.HttpQuery("nameFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2025-09-09/microvm-images" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMicrovmImagesRequest",
}) as any as S.Schema<ListMicrovmImagesRequest>;
export interface MicrovmImageSummary {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
}
export const MicrovmImageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    name: S.String,
    state: MicrovmImageState,
    latestActiveImageVersion: S.optional(S.String),
    latestFailedImageVersion: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "MicrovmImageSummary",
}) as any as S.Schema<MicrovmImageSummary>;
export type MicrovmImageSummaries = MicrovmImageSummary[];
export const MicrovmImageSummaries = /*@__PURE__*/ S.Array(MicrovmImageSummary);
export interface ListMicrovmImagesResponse {
  nextToken?: string;
  items: MicrovmImageSummary[];
}
export const ListMicrovmImagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), items: MicrovmImageSummaries }),
).annotate({
  identifier: "ListMicrovmImagesResponse",
}) as any as S.Schema<ListMicrovmImagesResponse>;
export interface ListMicrovmImageVersionsInput {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier: string;
}
export const ListMicrovmImageVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMicrovmImageVersionsInput",
}) as any as S.Schema<ListMicrovmImageVersionsInput>;
export interface MicrovmImageVersionSummary {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export const MicrovmImageVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    imageArn: S.String,
    imageVersion: S.String,
    state: MicrovmImageVersionState,
    status: MicrovmImageVersionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateReason: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "MicrovmImageVersionSummary",
}) as any as S.Schema<MicrovmImageVersionSummary>;
export type MicrovmImageVersionSummaryList = MicrovmImageVersionSummary[];
export const MicrovmImageVersionSummaryList = /*@__PURE__*/ S.Array(
  MicrovmImageVersionSummary,
);
export interface ListMicrovmImageVersionsOutput {
  nextToken?: string;
  items: MicrovmImageVersionSummary[];
}
export const ListMicrovmImageVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: MicrovmImageVersionSummaryList,
  }),
).annotate({
  identifier: "ListMicrovmImageVersionsOutput",
}) as any as S.Schema<ListMicrovmImageVersionsOutput>;
export interface ListMicrovmsRequest {
  maxResults?: number;
  nextToken?: string;
  imageIdentifier?: string;
  imageVersion?: string;
}
export const ListMicrovmsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    imageIdentifier: S.optional(S.String).pipe(T.HttpQuery("imageIdentifier")),
    imageVersion: S.optional(S.String).pipe(T.HttpQuery("imageVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2025-09-09/microvms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMicrovmsRequest",
}) as any as S.Schema<ListMicrovmsRequest>;
export interface MicrovmItem {
  microvmId: string;
  state: MicrovmState;
  imageArn: string;
  imageVersion: string;
  startedAt: Date;
}
export const MicrovmItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmId: S.String,
    state: MicrovmState,
    imageArn: S.String,
    imageVersion: S.String,
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "MicrovmItem" }) as any as S.Schema<MicrovmItem>;
export type MicrovmItemList = MicrovmItem[];
export const MicrovmItemList = /*@__PURE__*/ S.Array(MicrovmItem);
export interface ListMicrovmsResponse {
  nextToken?: string;
  items: MicrovmItem[];
}
export const ListMicrovmsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), items: MicrovmItemList }),
).annotate({
  identifier: "ListMicrovmsResponse",
}) as any as S.Schema<ListMicrovmsResponse>;
export type TaggableResource = string;
export interface ListTagsRequest {
  Resource: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String.pipe(T.HttpLabel("Resource")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-03-31/tags/{Resource}" }),
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
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ResumeMicrovmRequest {
  microvmIdentifier: string;
}
export const ResumeMicrovmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-09-09/microvms/{microvmIdentifier}/resume",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResumeMicrovmRequest",
}) as any as S.Schema<ResumeMicrovmRequest>;
export interface ResumeMicrovmResponse {}
export const ResumeMicrovmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResumeMicrovmResponse",
}) as any as S.Schema<ResumeMicrovmResponse>;
export interface RunMicrovmRequest {
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
  imageIdentifier: string;
  imageVersion?: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  logging?: Logging;
  runHookPayload?: string;
  maximumDurationInSeconds?: number;
  clientToken?: string;
}
export const RunMicrovmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingressNetworkConnectors: S.optional(NetworkConnectorList),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    imageIdentifier: S.String,
    imageVersion: S.optional(S.String),
    executionRoleArn: S.optional(S.String),
    idlePolicy: S.optional(IdlePolicy),
    logging: S.optional(Logging),
    runHookPayload: S.optional(S.String),
    maximumDurationInSeconds: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2025-09-09/microvms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RunMicrovmRequest",
}) as any as S.Schema<RunMicrovmRequest>;
export interface RunMicrovmResponse {
  microvmId: string;
  state: MicrovmState;
  endpoint: string;
  imageArn: string;
  imageVersion: string;
  executionRoleArn?: string;
  idlePolicy?: IdlePolicy;
  maximumDurationInSeconds: number;
  startedAt: Date;
  terminatedAt?: Date;
  stateReason?: string;
  ingressNetworkConnectors?: string[];
  egressNetworkConnectors?: string[];
}
export const RunMicrovmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmId: S.String,
    state: MicrovmState,
    endpoint: S.String,
    imageArn: S.String,
    imageVersion: S.String,
    executionRoleArn: S.optional(S.String),
    idlePolicy: S.optional(IdlePolicy),
    maximumDurationInSeconds: S.Number,
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    terminatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateReason: S.optional(S.String),
    ingressNetworkConnectors: S.optional(NetworkConnectorList),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
  }),
).annotate({
  identifier: "RunMicrovmResponse",
}) as any as S.Schema<RunMicrovmResponse>;
export interface SuspendMicrovmRequest {
  microvmIdentifier: string;
}
export const SuspendMicrovmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-09-09/microvms/{microvmIdentifier}/suspend",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SuspendMicrovmRequest",
}) as any as S.Schema<SuspendMicrovmRequest>;
export interface SuspendMicrovmResponse {}
export const SuspendMicrovmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SuspendMicrovmResponse",
}) as any as S.Schema<SuspendMicrovmResponse>;
export interface TagResourceRequest {
  Resource: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.String.pipe(T.HttpLabel("Resource")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2017-03-31/tags/{Resource}" }),
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
export interface TerminateMicrovmRequest {
  microvmIdentifier: string;
}
export const TerminateMicrovmRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    microvmIdentifier: S.String.pipe(T.HttpLabel("microvmIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2025-09-09/microvms/{microvmIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateMicrovmRequest",
}) as any as S.Schema<TerminateMicrovmRequest>;
export interface TerminateMicrovmResponse {}
export const TerminateMicrovmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TerminateMicrovmResponse",
}) as any as S.Schema<TerminateMicrovmResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Key")),
);
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.String.pipe(T.HttpLabel("Resource")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-03-31/tags/{Resource}" }),
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
export interface UpdateMicrovmImageRequest {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  imageIdentifier: string;
  clientToken?: string;
}
export const UpdateMicrovmImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMicrovmImageRequest",
}) as any as S.Schema<UpdateMicrovmImageRequest>;
export interface UpdateMicrovmImageResponse {
  imageArn: string;
  name: string;
  state: MicrovmImageState;
  latestActiveImageVersion?: string;
  latestFailedImageVersion?: string;
  createdAt: Date;
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  updatedAt: Date;
  imageVersion: string;
}
export const UpdateMicrovmImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageArn: S.String,
    name: S.String,
    state: MicrovmImageState,
    latestActiveImageVersion: S.optional(S.String),
    latestFailedImageVersion: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    imageVersion: S.String,
  }),
).annotate({
  identifier: "UpdateMicrovmImageResponse",
}) as any as S.Schema<UpdateMicrovmImageResponse>;
export interface UpdateMicrovmImageVersionRequest {
  imageIdentifier: string;
  imageVersion: string;
  status: MicrovmImageVersionStatus;
}
export const UpdateMicrovmImageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIdentifier: S.String.pipe(T.HttpLabel("imageIdentifier")),
    imageVersion: S.String.pipe(T.HttpLabel("imageVersion")),
    status: MicrovmImageVersionStatus,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/2025-09-09/microvm-images/{imageIdentifier}/versions/{imageVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMicrovmImageVersionRequest",
}) as any as S.Schema<UpdateMicrovmImageVersionRequest>;
export interface UpdateMicrovmImageVersionResponse {
  baseImageArn: string;
  baseImageVersion?: string;
  buildRoleArn: string;
  description?: string;
  codeArtifact: CodeArtifact;
  logging?: Logging;
  egressNetworkConnectors?: string[];
  cpuConfigurations?: CpuConfiguration[];
  resources?: Resources[];
  additionalOsCapabilities?: Capability[];
  hooks?: Hooks;
  environmentVariables?: { [key: string]: string | undefined };
  imageArn: string;
  imageVersion: string;
  state: MicrovmImageVersionState;
  status: MicrovmImageVersionStatus;
  createdAt: Date;
  updatedAt?: Date;
  stateReason?: string;
  tags?: { [key: string]: string | undefined };
}
export const UpdateMicrovmImageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseImageArn: S.String,
    baseImageVersion: S.optional(S.String),
    buildRoleArn: S.String,
    description: S.optional(S.String),
    codeArtifact: CodeArtifact,
    logging: S.optional(Logging),
    egressNetworkConnectors: S.optional(NetworkConnectorList),
    cpuConfigurations: S.optional(CpuConfigurationList),
    resources: S.optional(ResourcesList),
    additionalOsCapabilities: S.optional(CapabilityList),
    hooks: S.optional(Hooks),
    environmentVariables: S.optional(EnvironmentVariableMap),
    imageArn: S.String,
    imageVersion: S.String,
    state: MicrovmImageVersionState,
    status: MicrovmImageVersionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    stateReason: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "UpdateMicrovmImageVersionResponse",
}) as any as S.Schema<UpdateMicrovmImageVersionResponse>;
export type CreateMicrovmAuthTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an authentication token for accessing a running MicroVM. The token grants access to the specified ports on the MicroVM endpoint.
 */
export const createMicrovmAuthToken: API.OperationMethod<
  CreateMicrovmAuthTokenRequest,
  CreateMicrovmAuthTokenResponse,
  CreateMicrovmAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMicrovmAuthTokenRequest,
  output: CreateMicrovmAuthTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMicrovmAuthToken",
}));

export type CreateMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a MicroVM image from the specified code artifact and base image. The build is asynchronous — the image transitions from CREATING to CREATED on success, or CREATE_FAILED on failure. Use GetMicrovmImage to poll for completion.
 */
export const createMicrovmImage: API.OperationMethod<
  CreateMicrovmImageRequest,
  CreateMicrovmImageResponse,
  CreateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMicrovmImageRequest,
  output: CreateMicrovmImageResponse,
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
  operationName: "CreateMicrovmImage",
}));

export type CreateMicrovmShellAuthTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a shell authentication token for interactive shell access to a running MicroVM. The MicroVM must have been run with the SHELL_INGRESS network connector attached.
 */
export const createMicrovmShellAuthToken: API.OperationMethod<
  CreateMicrovmShellAuthTokenRequest,
  CreateMicrovmShellAuthTokenResponse,
  CreateMicrovmShellAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMicrovmShellAuthTokenRequest,
  output: CreateMicrovmShellAuthTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMicrovmShellAuthToken",
}));

export type DeleteMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a MicroVM image. This operation is idempotent; deleting an image that has already been deleted succeeds without error.
 */
export const deleteMicrovmImage: API.OperationMethod<
  DeleteMicrovmImageInput,
  DeleteMicrovmImageOutput,
  DeleteMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMicrovmImageInput,
  output: DeleteMicrovmImageOutput,
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
  operationName: "DeleteMicrovmImage",
}));

export type DeleteMicrovmImageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version of a MicroVM image. This operation is idempotent; deleting a version that has already been deleted succeeds without error.
 */
export const deleteMicrovmImageVersion: API.OperationMethod<
  DeleteMicrovmImageVersionInput,
  DeleteMicrovmImageVersionOutput,
  DeleteMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMicrovmImageVersionInput,
  output: DeleteMicrovmImageVersionOutput,
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
  operationName: "DeleteMicrovmImageVersion",
}));

export type GetMicrovmError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific MicroVM, including its state, endpoint, image information, and configuration. The state field is eventually consistent — determine readiness by connecting to the endpoint.
 */
export const getMicrovm: API.OperationMethod<
  GetMicrovmRequest,
  GetMicrovmResponse,
  GetMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMicrovmRequest,
  output: GetMicrovmResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovm",
}));

export type GetMicrovmImageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a MicroVM image, including its state, versions, and configuration.
 */
export const getMicrovmImage: API.OperationMethod<
  GetMicrovmImageInput,
  GetMicrovmImageOutput,
  GetMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMicrovmImageInput,
  output: GetMicrovmImageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImage",
}));

export type GetMicrovmImageBuildError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific MicroVM image build, including its state, target architecture, and snapshot information.
 */
export const getMicrovmImageBuild: API.OperationMethod<
  GetMicrovmImageBuildInput,
  GetMicrovmImageBuildOutput,
  GetMicrovmImageBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMicrovmImageBuildInput,
  output: GetMicrovmImageBuildOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImageBuild",
}));

export type GetMicrovmImageVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific version of a MicroVM image, including its configuration, state, and build information.
 */
export const getMicrovmImageVersion: API.OperationMethod<
  GetMicrovmImageVersionInput,
  GetMicrovmImageVersionOutput,
  GetMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMicrovmImageVersionInput,
  output: GetMicrovmImageVersionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrovmImageVersion",
}));

export type ListManagedMicrovmImagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists AWS managed MicroVM images available for use as base images. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listManagedMicrovmImages: API.PaginatedOperationMethod<
  ListManagedMicrovmImagesInput,
  ListManagedMicrovmImagesOutput,
  ListManagedMicrovmImagesError,
  Credentials | HttpClient.HttpClient,
  ManagedMicrovmImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedMicrovmImagesInput,
  output: ListManagedMicrovmImagesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedMicrovmImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedMicrovmImageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists versions of a managed MicroVM image. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listManagedMicrovmImageVersions: API.PaginatedOperationMethod<
  ListManagedMicrovmImageVersionsInput,
  ListManagedMicrovmImageVersionsOutput,
  ListManagedMicrovmImageVersionsError,
  Credentials | HttpClient.HttpClient,
  ManagedMicrovmImageVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedMicrovmImageVersionsInput,
  output: ListManagedMicrovmImageVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedMicrovmImageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImageBuildsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists builds for a MicroVM image version with optional filtering by architecture and chipset. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImageBuilds: API.PaginatedOperationMethod<
  ListMicrovmImageBuildsInput,
  ListMicrovmImageBuildsOutput,
  ListMicrovmImageBuildsError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageBuildSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrovmImageBuildsInput,
  output: ListMicrovmImageBuildsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImageBuilds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists MicroVM images in the account with optional name filtering. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImages: API.PaginatedOperationMethod<
  ListMicrovmImagesRequest,
  ListMicrovmImagesResponse,
  ListMicrovmImagesError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrovmImagesRequest,
  output: ListMicrovmImagesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmImageVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists versions of a MicroVM image. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovmImageVersions: API.PaginatedOperationMethod<
  ListMicrovmImageVersionsInput,
  ListMicrovmImageVersionsOutput,
  ListMicrovmImageVersionsError,
  Credentials | HttpClient.HttpClient,
  MicrovmImageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrovmImageVersionsInput,
  output: ListMicrovmImageVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovmImageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMicrovmsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists MicroVMs in the account with optional filtering by image and version. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listMicrovms: API.PaginatedOperationMethod<
  ListMicrovmsRequest,
  ListMicrovmsResponse,
  ListMicrovmsError,
  Credentials | HttpClient.HttpClient,
  MicrovmItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrovmsRequest,
  output: ListMicrovmsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrovms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags associated with a Lambda MicroVM resource.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ResumeMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resumes a suspended MicroVM, restoring it to RUNNING state with all state intact. The MicroVM must be in SUSPENDED state.
 */
export const resumeMicrovm: API.OperationMethod<
  ResumeMicrovmRequest,
  ResumeMicrovmResponse,
  ResumeMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeMicrovmRequest,
  output: ResumeMicrovmResponse,
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
  operationName: "ResumeMicrovm",
}));

export type RunMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Runs a new MicroVM from the specified image. The MicroVM starts in PENDING state and transitions to RUNNING once provisioning completes. To connect, generate an authentication token using CreateMicrovmAuthToken.
 */
export const runMicrovm: API.OperationMethod<
  RunMicrovmRequest,
  RunMicrovmResponse,
  RunMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RunMicrovmRequest,
  output: RunMicrovmResponse,
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
  operationName: "RunMicrovm",
}));

export type SuspendMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Suspends a running MicroVM, preserving its full memory and disk state. The MicroVM transitions through SUSPENDING to SUSPENDED. To restore, call ResumeMicrovm or send traffic to the endpoint if autoResumeEnabled is true.
 */
export const suspendMicrovm: API.OperationMethod<
  SuspendMicrovmRequest,
  SuspendMicrovmResponse,
  SuspendMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SuspendMicrovmRequest,
  output: SuspendMicrovmResponse,
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
  operationName: "SuspendMicrovm",
}));

export type TagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds tags to a Lambda MicroVM resource.
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
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateMicrovmError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates a MicroVM. This operation is idempotent; terminating a MicroVM that has already been terminated succeeds without error.
 */
export const terminateMicrovm: API.OperationMethod<
  TerminateMicrovmRequest,
  TerminateMicrovmResponse,
  TerminateMicrovmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateMicrovmRequest,
  output: TerminateMicrovmResponse,
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
  operationName: "TerminateMicrovm",
}));

export type UntagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes tags from a Lambda MicroVM resource.
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
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMicrovmImageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a MicroVM image and triggers a new version build. This operation uses PUT semantics — all required fields (codeArtifact, baseImageArn, buildRoleArn) must be provided with every request.
 */
export const updateMicrovmImage: API.OperationMethod<
  UpdateMicrovmImageRequest,
  UpdateMicrovmImageResponse,
  UpdateMicrovmImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMicrovmImageRequest,
  output: UpdateMicrovmImageResponse,
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
  operationName: "UpdateMicrovmImage",
}));

export type UpdateMicrovmImageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a specific MicroVM image version.
 */
export const updateMicrovmImageVersion: API.OperationMethod<
  UpdateMicrovmImageVersionRequest,
  UpdateMicrovmImageVersionResponse,
  UpdateMicrovmImageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMicrovmImageVersionRequest,
  output: UpdateMicrovmImageVersionResponse,
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
  operationName: "UpdateMicrovmImageVersion",
}));
