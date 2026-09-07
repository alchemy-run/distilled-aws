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
  sdkId: "GreengrassV2",
  serviceShapeName: "GreengrassV2",
});
const auth = T.AwsAuthSigv4({ name: "greengrass" });
const ver = T.ServiceVersion("2020-11-30");
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
              `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://greengrass.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://greengrass.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "dataplane-us-gov-east-1") {
          return e(
            "https://greengrass-ats.iot.us-gov-east-1.amazonaws.com",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "greengrass",
                  signingRegion: "us-gov-east-1",
                },
              ],
            },
            {},
          );
        }
        if (Region === "dataplane-us-gov-west-1") {
          return e(
            "https://greengrass-ats.iot.us-gov-west-1.amazonaws.com",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "greengrass",
                  signingRegion: "us-gov-west-1",
                },
              ],
            },
            {},
          );
        }
        return e(
          `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class RequestAlreadyInProgressException
  extends /*@__PURE__*/ S.TaggedError<RequestAlreadyInProgressException>()(
    "RequestAlreadyInProgressException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      quotaCode: S.String,
      serviceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaCode: S.optional(S.String),
      serviceCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AssociateServiceRoleToAccountRequest {
  roleArn: string;
}
export const AssociateServiceRoleToAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ roleArn: S.String })
      .pipe(S.encodeKeys({ roleArn: "RoleArn" }))
      .pipe(
        T.all(
          T.Http({ method: "PUT", uri: "/greengrass/servicerole" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "AssociateServiceRoleToAccountRequest",
}) as any as S.Schema<AssociateServiceRoleToAccountRequest>;
export interface AssociateServiceRoleToAccountResponse {
  associatedAt?: string;
}
export const AssociateServiceRoleToAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ associatedAt: S.optional(S.String) }).pipe(
      S.encodeKeys({ associatedAt: "AssociatedAt" }),
    ),
).annotate({
  identifier: "AssociateServiceRoleToAccountResponse",
}) as any as S.Schema<AssociateServiceRoleToAccountResponse>;
export type IoTThingName = string;
export interface AssociateClientDeviceWithCoreDeviceEntry {
  thingName: string;
}
export const AssociateClientDeviceWithCoreDeviceEntry = /*@__PURE__*/ S.suspend(
  () => S.Struct({ thingName: S.String }),
).annotate({
  identifier: "AssociateClientDeviceWithCoreDeviceEntry",
}) as any as S.Schema<AssociateClientDeviceWithCoreDeviceEntry>;
export type AssociateClientDeviceWithCoreDeviceEntryList =
  AssociateClientDeviceWithCoreDeviceEntry[];
export const AssociateClientDeviceWithCoreDeviceEntryList =
  /*@__PURE__*/ S.Array(AssociateClientDeviceWithCoreDeviceEntry);
export interface BatchAssociateClientDeviceWithCoreDeviceRequest {
  entries?: AssociateClientDeviceWithCoreDeviceEntry[];
  coreDeviceThingName: string;
}
export const BatchAssociateClientDeviceWithCoreDeviceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      entries: S.optional(AssociateClientDeviceWithCoreDeviceEntryList),
      coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/associateClientDevices",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchAssociateClientDeviceWithCoreDeviceRequest",
  }) as any as S.Schema<BatchAssociateClientDeviceWithCoreDeviceRequest>;
export type NonEmptyString = string;
export interface AssociateClientDeviceWithCoreDeviceErrorEntry {
  thingName?: string;
  code?: string;
  message?: string;
}
export const AssociateClientDeviceWithCoreDeviceErrorEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      thingName: S.optional(S.String),
      code: S.optional(S.String),
      message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "AssociateClientDeviceWithCoreDeviceErrorEntry",
  }) as any as S.Schema<AssociateClientDeviceWithCoreDeviceErrorEntry>;
export type AssociateClientDeviceWithCoreDeviceErrorList =
  AssociateClientDeviceWithCoreDeviceErrorEntry[];
export const AssociateClientDeviceWithCoreDeviceErrorList =
  /*@__PURE__*/ S.Array(AssociateClientDeviceWithCoreDeviceErrorEntry);
export interface BatchAssociateClientDeviceWithCoreDeviceResponse {
  errorEntries?: AssociateClientDeviceWithCoreDeviceErrorEntry[];
}
export const BatchAssociateClientDeviceWithCoreDeviceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorEntries: S.optional(AssociateClientDeviceWithCoreDeviceErrorList),
    }),
  ).annotate({
    identifier: "BatchAssociateClientDeviceWithCoreDeviceResponse",
  }) as any as S.Schema<BatchAssociateClientDeviceWithCoreDeviceResponse>;
export interface DisassociateClientDeviceFromCoreDeviceEntry {
  thingName: string;
}
export const DisassociateClientDeviceFromCoreDeviceEntry =
  /*@__PURE__*/ S.suspend(() => S.Struct({ thingName: S.String })).annotate({
    identifier: "DisassociateClientDeviceFromCoreDeviceEntry",
  }) as any as S.Schema<DisassociateClientDeviceFromCoreDeviceEntry>;
export type DisassociateClientDeviceFromCoreDeviceEntryList =
  DisassociateClientDeviceFromCoreDeviceEntry[];
export const DisassociateClientDeviceFromCoreDeviceEntryList =
  /*@__PURE__*/ S.Array(DisassociateClientDeviceFromCoreDeviceEntry);
export interface BatchDisassociateClientDeviceFromCoreDeviceRequest {
  entries?: DisassociateClientDeviceFromCoreDeviceEntry[];
  coreDeviceThingName: string;
}
export const BatchDisassociateClientDeviceFromCoreDeviceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      entries: S.optional(DisassociateClientDeviceFromCoreDeviceEntryList),
      coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/disassociateClientDevices",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchDisassociateClientDeviceFromCoreDeviceRequest",
  }) as any as S.Schema<BatchDisassociateClientDeviceFromCoreDeviceRequest>;
export interface DisassociateClientDeviceFromCoreDeviceErrorEntry {
  thingName?: string;
  code?: string;
  message?: string;
}
export const DisassociateClientDeviceFromCoreDeviceErrorEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      thingName: S.optional(S.String),
      code: S.optional(S.String),
      message: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DisassociateClientDeviceFromCoreDeviceErrorEntry",
  }) as any as S.Schema<DisassociateClientDeviceFromCoreDeviceErrorEntry>;
export type DisassociateClientDeviceFromCoreDeviceErrorList =
  DisassociateClientDeviceFromCoreDeviceErrorEntry[];
export const DisassociateClientDeviceFromCoreDeviceErrorList =
  /*@__PURE__*/ S.Array(DisassociateClientDeviceFromCoreDeviceErrorEntry);
export interface BatchDisassociateClientDeviceFromCoreDeviceResponse {
  errorEntries?: DisassociateClientDeviceFromCoreDeviceErrorEntry[];
}
export const BatchDisassociateClientDeviceFromCoreDeviceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorEntries: S.optional(DisassociateClientDeviceFromCoreDeviceErrorList),
    }),
  ).annotate({
    identifier: "BatchDisassociateClientDeviceFromCoreDeviceResponse",
  }) as any as S.Schema<BatchDisassociateClientDeviceFromCoreDeviceResponse>;
export interface CancelDeploymentRequest {
  deploymentId: string;
}
export const CancelDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/greengrass/v2/deployments/{deploymentId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelDeploymentRequest",
}) as any as S.Schema<CancelDeploymentRequest>;
export interface CancelDeploymentResponse {
  message?: string;
}
export const CancelDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "CancelDeploymentResponse",
}) as any as S.Schema<CancelDeploymentResponse>;
export type RecipeBlob = Uint8Array;
export type ComponentNameString = string;
export type ComponentVersionString = string;
export type PlatformAttributesMap = { [key: string]: string | undefined };
export const PlatformAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ComponentPlatform {
  name?: string;
  attributes?: { [key: string]: string | undefined };
}
export const ComponentPlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    attributes: S.optional(PlatformAttributesMap),
  }),
).annotate({
  identifier: "ComponentPlatform",
}) as any as S.Schema<ComponentPlatform>;
export type ComponentPlatformList = ComponentPlatform[];
export const ComponentPlatformList = /*@__PURE__*/ S.Array(ComponentPlatform);
export type ComponentDependencyType = "HARD" | "SOFT" | (string & {});
export const ComponentDependencyType = /*@__PURE__*/ S.String;

export interface ComponentDependencyRequirement {
  versionRequirement?: string;
  dependencyType?: ComponentDependencyType;
}
export const ComponentDependencyRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionRequirement: S.optional(S.String),
    dependencyType: S.optional(ComponentDependencyType),
  }),
).annotate({
  identifier: "ComponentDependencyRequirement",
}) as any as S.Schema<ComponentDependencyRequirement>;
export type ComponentDependencyMap = {
  [key: string]: ComponentDependencyRequirement | undefined;
};
export const ComponentDependencyMap = /*@__PURE__*/ S.Record(
  S.String,
  ComponentDependencyRequirement.pipe(S.optional),
);
export type TopicString = string;
export type LambdaEventSourceType = "PUB_SUB" | "IOT_CORE" | (string & {});
export const LambdaEventSourceType = /*@__PURE__*/ S.String;

export interface LambdaEventSource {
  topic: string;
  type: LambdaEventSourceType;
}
export const LambdaEventSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topic: S.String, type: LambdaEventSourceType }),
).annotate({
  identifier: "LambdaEventSource",
}) as any as S.Schema<LambdaEventSource>;
export type LambdaEventSourceList = LambdaEventSource[];
export const LambdaEventSourceList = /*@__PURE__*/ S.Array(LambdaEventSource);
export type OptionalInteger = number;
export type OptionalBoolean = boolean;
export type LambdaInputPayloadEncodingType = "json" | "binary" | (string & {});
export const LambdaInputPayloadEncodingType = /*@__PURE__*/ S.String;

export type LambdaExecArg = string;
export type LambdaExecArgsList = string[];
export const LambdaExecArgsList = /*@__PURE__*/ S.Array(S.String);
export type LambdaEnvironmentVariables = { [key: string]: string | undefined };
export const LambdaEnvironmentVariables = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type LambdaIsolationMode =
  | "GreengrassContainer"
  | "NoContainer"
  | (string & {});
export const LambdaIsolationMode = /*@__PURE__*/ S.String;

export type FileSystemPath = string;
export type LambdaFilesystemPermission = "ro" | "rw" | (string & {});
export const LambdaFilesystemPermission = /*@__PURE__*/ S.String;

export interface LambdaVolumeMount {
  sourcePath: string;
  destinationPath: string;
  permission?: LambdaFilesystemPermission;
  addGroupOwner?: boolean;
}
export const LambdaVolumeMount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourcePath: S.String,
    destinationPath: S.String,
    permission: S.optional(LambdaFilesystemPermission),
    addGroupOwner: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LambdaVolumeMount",
}) as any as S.Schema<LambdaVolumeMount>;
export type LambdaVolumeList = LambdaVolumeMount[];
export const LambdaVolumeList = /*@__PURE__*/ S.Array(LambdaVolumeMount);
export interface LambdaDeviceMount {
  path: string;
  permission?: LambdaFilesystemPermission;
  addGroupOwner?: boolean;
}
export const LambdaDeviceMount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    path: S.String,
    permission: S.optional(LambdaFilesystemPermission),
    addGroupOwner: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LambdaDeviceMount",
}) as any as S.Schema<LambdaDeviceMount>;
export type LambdaDeviceList = LambdaDeviceMount[];
export const LambdaDeviceList = /*@__PURE__*/ S.Array(LambdaDeviceMount);
export interface LambdaContainerParams {
  memorySizeInKB?: number;
  mountROSysfs?: boolean;
  volumes?: LambdaVolumeMount[];
  devices?: LambdaDeviceMount[];
}
export const LambdaContainerParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memorySizeInKB: S.optional(S.Number),
    mountROSysfs: S.optional(S.Boolean),
    volumes: S.optional(LambdaVolumeList),
    devices: S.optional(LambdaDeviceList),
  }),
).annotate({
  identifier: "LambdaContainerParams",
}) as any as S.Schema<LambdaContainerParams>;
export interface LambdaLinuxProcessParams {
  isolationMode?: LambdaIsolationMode;
  containerParams?: LambdaContainerParams;
}
export const LambdaLinuxProcessParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isolationMode: S.optional(LambdaIsolationMode),
    containerParams: S.optional(LambdaContainerParams),
  }),
).annotate({
  identifier: "LambdaLinuxProcessParams",
}) as any as S.Schema<LambdaLinuxProcessParams>;
export interface LambdaExecutionParameters {
  eventSources?: LambdaEventSource[];
  maxQueueSize?: number;
  maxInstancesCount?: number;
  maxIdleTimeInSeconds?: number;
  timeoutInSeconds?: number;
  statusTimeoutInSeconds?: number;
  pinned?: boolean;
  inputPayloadEncodingType?: LambdaInputPayloadEncodingType;
  execArgs?: string[];
  environmentVariables?: { [key: string]: string | undefined };
  linuxProcessParams?: LambdaLinuxProcessParams;
}
export const LambdaExecutionParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventSources: S.optional(LambdaEventSourceList),
    maxQueueSize: S.optional(S.Number),
    maxInstancesCount: S.optional(S.Number),
    maxIdleTimeInSeconds: S.optional(S.Number),
    timeoutInSeconds: S.optional(S.Number),
    statusTimeoutInSeconds: S.optional(S.Number),
    pinned: S.optional(S.Boolean),
    inputPayloadEncodingType: S.optional(LambdaInputPayloadEncodingType),
    execArgs: S.optional(LambdaExecArgsList),
    environmentVariables: S.optional(LambdaEnvironmentVariables),
    linuxProcessParams: S.optional(LambdaLinuxProcessParams),
  }),
).annotate({
  identifier: "LambdaExecutionParameters",
}) as any as S.Schema<LambdaExecutionParameters>;
export interface LambdaFunctionRecipeSource {
  lambdaArn: string;
  componentName?: string;
  componentVersion?: string;
  componentPlatforms?: ComponentPlatform[];
  componentDependencies?: {
    [key: string]: ComponentDependencyRequirement | undefined;
  };
  componentLambdaParameters?: LambdaExecutionParameters;
}
export const LambdaFunctionRecipeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lambdaArn: S.String,
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    componentPlatforms: S.optional(ComponentPlatformList),
    componentDependencies: S.optional(ComponentDependencyMap),
    componentLambdaParameters: S.optional(LambdaExecutionParameters),
  }),
).annotate({
  identifier: "LambdaFunctionRecipeSource",
}) as any as S.Schema<LambdaFunctionRecipeSource>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ClientTokenString = string;
export interface CreateComponentVersionRequest {
  inlineRecipe?: Uint8Array;
  lambdaFunction?: LambdaFunctionRecipeSource;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateComponentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inlineRecipe: S.optional(T.Blob),
    lambdaFunction: S.optional(LambdaFunctionRecipeSource),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/v2/createComponentVersion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComponentVersionRequest",
}) as any as S.Schema<CreateComponentVersionRequest>;
export type ComponentVersionARN = string;
export type CloudComponentState =
  | "REQUESTED"
  | "INITIATED"
  | "DEPLOYABLE"
  | "FAILED"
  | "DEPRECATED"
  | (string & {});
export const CloudComponentState = /*@__PURE__*/ S.String;

export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VendorGuidance =
  | "ACTIVE"
  | "DISCONTINUED"
  | "DELETED"
  | (string & {});
export const VendorGuidance = /*@__PURE__*/ S.String;

export interface CloudComponentStatus {
  componentState?: CloudComponentState;
  message?: string;
  errors?: { [key: string]: string | undefined };
  vendorGuidance?: VendorGuidance;
  vendorGuidanceMessage?: string;
}
export const CloudComponentStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentState: S.optional(CloudComponentState),
    message: S.optional(S.String),
    errors: S.optional(StringMap),
    vendorGuidance: S.optional(VendorGuidance),
    vendorGuidanceMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudComponentStatus",
}) as any as S.Schema<CloudComponentStatus>;
export interface CreateComponentVersionResponse {
  arn?: string;
  componentName: string;
  componentVersion: string;
  creationTimestamp: Date;
  status: CloudComponentStatus;
}
export const CreateComponentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    componentName: S.String,
    componentVersion: S.String,
    creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: CloudComponentStatus,
  }),
).annotate({
  identifier: "CreateComponentVersionResponse",
}) as any as S.Schema<CreateComponentVersionResponse>;
export type TargetARN = string;
export type DeploymentNameString = string;
export type ComponentConfigurationString = string;
export type ComponentConfigurationPath = string;
export type ComponentConfigurationPathList = string[];
export const ComponentConfigurationPathList = /*@__PURE__*/ S.Array(S.String);
export interface ComponentConfigurationUpdate {
  merge?: string;
  reset?: string[];
}
export const ComponentConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    merge: S.optional(S.String),
    reset: S.optional(ComponentConfigurationPathList),
  }),
).annotate({
  identifier: "ComponentConfigurationUpdate",
}) as any as S.Schema<ComponentConfigurationUpdate>;
export type Memory = number;
export type CPU = number;
export interface SystemResourceLimits {
  memory?: number;
  cpus?: number;
}
export const SystemResourceLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ memory: S.optional(S.Number), cpus: S.optional(S.Number) }),
).annotate({
  identifier: "SystemResourceLimits",
}) as any as S.Schema<SystemResourceLimits>;
export interface ComponentRunWith {
  posixUser?: string;
  systemResourceLimits?: SystemResourceLimits;
  windowsUser?: string;
}
export const ComponentRunWith = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    posixUser: S.optional(S.String),
    systemResourceLimits: S.optional(SystemResourceLimits),
    windowsUser: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentRunWith",
}) as any as S.Schema<ComponentRunWith>;
export interface ComponentDeploymentSpecification {
  componentVersion: string;
  configurationUpdate?: ComponentConfigurationUpdate;
  runWith?: ComponentRunWith;
}
export const ComponentDeploymentSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentVersion: S.String,
    configurationUpdate: S.optional(ComponentConfigurationUpdate),
    runWith: S.optional(ComponentRunWith),
  }),
).annotate({
  identifier: "ComponentDeploymentSpecification",
}) as any as S.Schema<ComponentDeploymentSpecification>;
export type ComponentDeploymentSpecifications = {
  [key: string]: ComponentDeploymentSpecification | undefined;
};
export const ComponentDeploymentSpecifications = /*@__PURE__*/ S.Record(
  S.String,
  ComponentDeploymentSpecification.pipe(S.optional),
);
export type IoTJobRolloutBaseRatePerMinute = number;
export type IoTJobRolloutIncrementFactor = number;
export type IoTJobNumberOfThings = number;
export interface IoTJobRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export const IoTJobRateIncreaseCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfNotifiedThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
  }),
).annotate({
  identifier: "IoTJobRateIncreaseCriteria",
}) as any as S.Schema<IoTJobRateIncreaseCriteria>;
export interface IoTJobExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: IoTJobRateIncreaseCriteria;
}
export const IoTJobExponentialRolloutRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseRatePerMinute: S.Number,
    incrementFactor: S.Number,
    rateIncreaseCriteria: IoTJobRateIncreaseCriteria,
  }),
).annotate({
  identifier: "IoTJobExponentialRolloutRate",
}) as any as S.Schema<IoTJobExponentialRolloutRate>;
export type IoTJobMaxExecutionsPerMin = number;
export interface IoTJobExecutionsRolloutConfig {
  exponentialRate?: IoTJobExponentialRolloutRate;
  maximumPerMinute?: number;
}
export const IoTJobExecutionsRolloutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exponentialRate: S.optional(IoTJobExponentialRolloutRate),
    maximumPerMinute: S.optional(S.Number),
  }),
).annotate({
  identifier: "IoTJobExecutionsRolloutConfig",
}) as any as S.Schema<IoTJobExecutionsRolloutConfig>;
export type IoTJobExecutionFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const IoTJobExecutionFailureType = /*@__PURE__*/ S.String;

export type IoTJobAbortAction = "CANCEL" | (string & {});
export const IoTJobAbortAction = /*@__PURE__*/ S.String;

export type IoTJobAbortThresholdPercentage = number;
export type IoTJobMinimumNumberOfExecutedThings = number;
export interface IoTJobAbortCriteria {
  failureType: IoTJobExecutionFailureType;
  action: IoTJobAbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export const IoTJobAbortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failureType: IoTJobExecutionFailureType,
    action: IoTJobAbortAction,
    thresholdPercentage: S.Number,
    minNumberOfExecutedThings: S.Number,
  }),
).annotate({
  identifier: "IoTJobAbortCriteria",
}) as any as S.Schema<IoTJobAbortCriteria>;
export type IoTJobAbortCriteriaList = IoTJobAbortCriteria[];
export const IoTJobAbortCriteriaList =
  /*@__PURE__*/ S.Array(IoTJobAbortCriteria);
export interface IoTJobAbortConfig {
  criteriaList: IoTJobAbortCriteria[];
}
export const IoTJobAbortConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ criteriaList: IoTJobAbortCriteriaList }),
).annotate({
  identifier: "IoTJobAbortConfig",
}) as any as S.Schema<IoTJobAbortConfig>;
export type IoTJobInProgressTimeoutInMinutes = number;
export interface IoTJobTimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export const IoTJobTimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inProgressTimeoutInMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "IoTJobTimeoutConfig",
}) as any as S.Schema<IoTJobTimeoutConfig>;
export interface DeploymentIoTJobConfiguration {
  jobExecutionsRolloutConfig?: IoTJobExecutionsRolloutConfig;
  abortConfig?: IoTJobAbortConfig;
  timeoutConfig?: IoTJobTimeoutConfig;
}
export const DeploymentIoTJobConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobExecutionsRolloutConfig: S.optional(IoTJobExecutionsRolloutConfig),
    abortConfig: S.optional(IoTJobAbortConfig),
    timeoutConfig: S.optional(IoTJobTimeoutConfig),
  }),
).annotate({
  identifier: "DeploymentIoTJobConfiguration",
}) as any as S.Schema<DeploymentIoTJobConfiguration>;
export type DeploymentFailureHandlingPolicy =
  | "ROLLBACK"
  | "DO_NOTHING"
  | (string & {});
export const DeploymentFailureHandlingPolicy = /*@__PURE__*/ S.String;

export type DeploymentComponentUpdatePolicyAction =
  | "NOTIFY_COMPONENTS"
  | "SKIP_NOTIFY_COMPONENTS"
  | (string & {});
export const DeploymentComponentUpdatePolicyAction = /*@__PURE__*/ S.String;

export interface DeploymentComponentUpdatePolicy {
  timeoutInSeconds?: number;
  action?: DeploymentComponentUpdatePolicyAction;
}
export const DeploymentComponentUpdatePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timeoutInSeconds: S.optional(S.Number),
    action: S.optional(DeploymentComponentUpdatePolicyAction),
  }),
).annotate({
  identifier: "DeploymentComponentUpdatePolicy",
}) as any as S.Schema<DeploymentComponentUpdatePolicy>;
export interface DeploymentConfigurationValidationPolicy {
  timeoutInSeconds?: number;
}
export const DeploymentConfigurationValidationPolicy = /*@__PURE__*/ S.suspend(
  () => S.Struct({ timeoutInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "DeploymentConfigurationValidationPolicy",
}) as any as S.Schema<DeploymentConfigurationValidationPolicy>;
export interface DeploymentPolicies {
  failureHandlingPolicy?: DeploymentFailureHandlingPolicy;
  componentUpdatePolicy?: DeploymentComponentUpdatePolicy;
  configurationValidationPolicy?: DeploymentConfigurationValidationPolicy;
}
export const DeploymentPolicies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failureHandlingPolicy: S.optional(DeploymentFailureHandlingPolicy),
    componentUpdatePolicy: S.optional(DeploymentComponentUpdatePolicy),
    configurationValidationPolicy: S.optional(
      DeploymentConfigurationValidationPolicy,
    ),
  }),
).annotate({
  identifier: "DeploymentPolicies",
}) as any as S.Schema<DeploymentPolicies>;
export type ThingGroupARN = string;
export interface CreateDeploymentRequest {
  targetArn: string;
  deploymentName?: string;
  components?: { [key: string]: ComponentDeploymentSpecification | undefined };
  iotJobConfiguration?: DeploymentIoTJobConfiguration;
  deploymentPolicies?: DeploymentPolicies;
  parentTargetArn?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.String,
    deploymentName: S.optional(S.String),
    components: S.optional(ComponentDeploymentSpecifications),
    iotJobConfiguration: S.optional(DeploymentIoTJobConfiguration),
    deploymentPolicies: S.optional(DeploymentPolicies),
    parentTargetArn: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/v2/deployments" }),
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
export type IoTJobARN = string;
export interface CreateDeploymentResponse {
  deploymentId?: string;
  iotJobId?: string;
  iotJobArn?: string;
}
export const CreateDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    iotJobId: S.optional(S.String),
    iotJobArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDeploymentResponse",
}) as any as S.Schema<CreateDeploymentResponse>;
export interface DeleteComponentRequest {
  arn: string;
}
export const DeleteComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/greengrass/v2/components/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteComponentRequest",
}) as any as S.Schema<DeleteComponentRequest>;
export interface DeleteComponentResponse {}
export const DeleteComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteComponentResponse",
}) as any as S.Schema<DeleteComponentResponse>;
export type CoreDeviceThingName = string;
export interface DeleteCoreDeviceRequest {
  coreDeviceThingName: string;
}
export const DeleteCoreDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCoreDeviceRequest",
}) as any as S.Schema<DeleteCoreDeviceRequest>;
export interface DeleteCoreDeviceResponse {}
export const DeleteCoreDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCoreDeviceResponse",
}) as any as S.Schema<DeleteCoreDeviceResponse>;
export interface DeleteDeploymentRequest {
  deploymentId: string;
}
export const DeleteDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/v2/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentRequest",
}) as any as S.Schema<DeleteDeploymentRequest>;
export interface DeleteDeploymentResponse {}
export const DeleteDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeploymentResponse",
}) as any as S.Schema<DeleteDeploymentResponse>;
export interface DescribeComponentRequest {
  arn: string;
}
export const DescribeComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/components/{arn}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeComponentRequest",
}) as any as S.Schema<DescribeComponentRequest>;
export type PublisherString = string;
export type DescriptionString = string;
export interface DescribeComponentResponse {
  arn?: string;
  componentName?: string;
  componentVersion?: string;
  creationTimestamp?: Date;
  publisher?: string;
  description?: string;
  status?: CloudComponentStatus;
  platforms?: ComponentPlatform[];
  tags?: { [key: string]: string | undefined };
}
export const DescribeComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    publisher: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(CloudComponentStatus),
    platforms: S.optional(ComponentPlatformList),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeComponentResponse",
}) as any as S.Schema<DescribeComponentResponse>;
export interface DisassociateServiceRoleFromAccountRequest {}
export const DisassociateServiceRoleFromAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/greengrass/servicerole" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateServiceRoleFromAccountRequest",
  }) as any as S.Schema<DisassociateServiceRoleFromAccountRequest>;
export interface DisassociateServiceRoleFromAccountResponse {
  disassociatedAt?: string;
}
export const DisassociateServiceRoleFromAccountResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ disassociatedAt: S.optional(S.String) }).pipe(
      S.encodeKeys({ disassociatedAt: "DisassociatedAt" }),
    ),
  ).annotate({
    identifier: "DisassociateServiceRoleFromAccountResponse",
  }) as any as S.Schema<DisassociateServiceRoleFromAccountResponse>;
export type RecipeOutputFormat = "JSON" | "YAML" | (string & {});
export const RecipeOutputFormat = /*@__PURE__*/ S.String;

export interface GetComponentRequest {
  recipeOutputFormat?: RecipeOutputFormat;
  arn: string;
}
export const GetComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recipeOutputFormat: S.optional(RecipeOutputFormat).pipe(
      T.HttpQuery("recipeOutputFormat"),
    ),
    arn: S.String.pipe(T.HttpLabel("arn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/v2/components/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentRequest",
}) as any as S.Schema<GetComponentRequest>;
export interface GetComponentResponse {
  recipeOutputFormat: RecipeOutputFormat;
  recipe: Uint8Array;
  tags?: { [key: string]: string | undefined };
}
export const GetComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recipeOutputFormat: RecipeOutputFormat,
    recipe: T.Blob,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetComponentResponse",
}) as any as S.Schema<GetComponentResponse>;
export type S3EndpointType = "REGIONAL" | "GLOBAL" | (string & {});
export const S3EndpointType = /*@__PURE__*/ S.String;

export type IotEndpointType = "fips" | "standard" | (string & {});
export const IotEndpointType = /*@__PURE__*/ S.String;

export interface GetComponentVersionArtifactRequest {
  arn: string;
  artifactName: string;
  s3EndpointType?: S3EndpointType;
  iotEndpointType?: IotEndpointType;
}
export const GetComponentVersionArtifactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    artifactName: S.String.pipe(T.HttpLabel("artifactName")),
    s3EndpointType: S.optional(S3EndpointType).pipe(
      T.HttpQuery("s3EndpointType"),
    ),
    iotEndpointType: S.optional(IotEndpointType).pipe(
      T.HttpHeader("x-amz-iot-endpoint-type"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/components/{arn}/artifacts/{artifactName+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentVersionArtifactRequest",
}) as any as S.Schema<GetComponentVersionArtifactRequest>;
export interface GetComponentVersionArtifactResponse {
  preSignedUrl: string;
}
export const GetComponentVersionArtifactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ preSignedUrl: S.String }),
).annotate({
  identifier: "GetComponentVersionArtifactResponse",
}) as any as S.Schema<GetComponentVersionArtifactResponse>;
export interface GetConnectivityInfoRequest {
  thingName: string;
}
export const GetConnectivityInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/things/{thingName}/connectivityInfo",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectivityInfoRequest",
}) as any as S.Schema<GetConnectivityInfoRequest>;
export type PortNumberInt = number;
export interface ConnectivityInfo {
  id?: string;
  hostAddress?: string;
  portNumber?: number;
  metadata?: string;
}
export const ConnectivityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    hostAddress: S.optional(S.String),
    portNumber: S.optional(S.Number),
    metadata: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      id: "Id",
      hostAddress: "HostAddress",
      portNumber: "PortNumber",
      metadata: "Metadata",
    }),
  ),
).annotate({
  identifier: "ConnectivityInfo",
}) as any as S.Schema<ConnectivityInfo>;
export type ConnectivityInfoList = ConnectivityInfo[];
export const ConnectivityInfoList = /*@__PURE__*/ S.Array(ConnectivityInfo);
export interface GetConnectivityInfoResponse {
  connectivityInfo?: ConnectivityInfo[];
  message?: string;
}
export const GetConnectivityInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectivityInfo: S.optional(ConnectivityInfoList),
    message: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ connectivityInfo: "ConnectivityInfo", message: "Message" }),
  ),
).annotate({
  identifier: "GetConnectivityInfoResponse",
}) as any as S.Schema<GetConnectivityInfoResponse>;
export interface GetCoreDeviceRequest {
  coreDeviceThingName: string;
}
export const GetCoreDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCoreDeviceRequest",
}) as any as S.Schema<GetCoreDeviceRequest>;
export type GGCVersion = string;
export type CoreDevicePlatformString = string;
export type CoreDeviceArchitectureString = string;
export type CoreDeviceRuntimeString = string;
export type CoreDeviceStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export const CoreDeviceStatus = /*@__PURE__*/ S.String;

export interface GetCoreDeviceResponse {
  coreDeviceThingName?: string;
  coreVersion?: string;
  platform?: string;
  architecture?: string;
  runtime?: string;
  status?: CoreDeviceStatus;
  lastStatusUpdateTimestamp?: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetCoreDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.optional(S.String),
    coreVersion: S.optional(S.String),
    platform: S.optional(S.String),
    architecture: S.optional(S.String),
    runtime: S.optional(S.String),
    status: S.optional(CoreDeviceStatus),
    lastStatusUpdateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetCoreDeviceResponse",
}) as any as S.Schema<GetCoreDeviceResponse>;
export interface GetDeploymentRequest {
  deploymentId: string;
}
export const GetDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String.pipe(T.HttpLabel("deploymentId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/deployments/{deploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export type NullableString = string;
export type DeploymentStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELED"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

export type IsLatestForTarget = boolean;
export interface GetDeploymentResponse {
  targetArn?: string;
  revisionId?: string;
  deploymentId?: string;
  deploymentName?: string;
  deploymentStatus?: DeploymentStatus;
  iotJobId?: string;
  iotJobArn?: string;
  components?: { [key: string]: ComponentDeploymentSpecification | undefined };
  deploymentPolicies?: DeploymentPolicies;
  iotJobConfiguration?: DeploymentIoTJobConfiguration;
  creationTimestamp?: Date;
  isLatestForTarget?: boolean;
  parentTargetArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.optional(S.String),
    revisionId: S.optional(S.String),
    deploymentId: S.optional(S.String),
    deploymentName: S.optional(S.String),
    deploymentStatus: S.optional(DeploymentStatus),
    iotJobId: S.optional(S.String),
    iotJobArn: S.optional(S.String),
    components: S.optional(ComponentDeploymentSpecifications),
    deploymentPolicies: S.optional(DeploymentPolicies),
    iotJobConfiguration: S.optional(DeploymentIoTJobConfiguration),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    isLatestForTarget: S.optional(S.Boolean),
    parentTargetArn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetDeploymentResponse",
}) as any as S.Schema<GetDeploymentResponse>;
export interface GetServiceRoleForAccountRequest {}
export const GetServiceRoleForAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/servicerole" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceRoleForAccountRequest",
}) as any as S.Schema<GetServiceRoleForAccountRequest>;
export interface GetServiceRoleForAccountResponse {
  associatedAt?: string;
  roleArn?: string;
}
export const GetServiceRoleForAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associatedAt: S.optional(S.String),
    roleArn: S.optional(S.String),
  }).pipe(S.encodeKeys({ associatedAt: "AssociatedAt", roleArn: "RoleArn" })),
).annotate({
  identifier: "GetServiceRoleForAccountResponse",
}) as any as S.Schema<GetServiceRoleForAccountResponse>;
export type DefaultMaxResults = number;
export type NextTokenString = string;
export interface ListClientDevicesAssociatedWithCoreDeviceRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListClientDevicesAssociatedWithCoreDeviceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/associatedClientDevices",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListClientDevicesAssociatedWithCoreDeviceRequest",
  }) as any as S.Schema<ListClientDevicesAssociatedWithCoreDeviceRequest>;
export interface AssociatedClientDevice {
  thingName?: string;
  associationTimestamp?: Date;
}
export const AssociatedClientDevice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String),
    associationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AssociatedClientDevice",
}) as any as S.Schema<AssociatedClientDevice>;
export type AssociatedClientDeviceList = AssociatedClientDevice[];
export const AssociatedClientDeviceList = /*@__PURE__*/ S.Array(
  AssociatedClientDevice,
);
export interface ListClientDevicesAssociatedWithCoreDeviceResponse {
  associatedClientDevices?: AssociatedClientDevice[];
  nextToken?: string;
}
export const ListClientDevicesAssociatedWithCoreDeviceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      associatedClientDevices: S.optional(AssociatedClientDeviceList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListClientDevicesAssociatedWithCoreDeviceResponse",
  }) as any as S.Schema<ListClientDevicesAssociatedWithCoreDeviceResponse>;
export type ComponentVisibilityScope = "PRIVATE" | "PUBLIC" | (string & {});
export const ComponentVisibilityScope = /*@__PURE__*/ S.String;

export interface ListComponentsRequest {
  scope?: ComponentVisibilityScope;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scope: S.optional(ComponentVisibilityScope).pipe(T.HttpQuery("scope")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/v2/components" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentsRequest",
}) as any as S.Schema<ListComponentsRequest>;
export type ComponentARN = string;
export interface ComponentLatestVersion {
  arn?: string;
  componentVersion?: string;
  creationTimestamp?: Date;
  description?: string;
  publisher?: string;
  platforms?: ComponentPlatform[];
}
export const ComponentLatestVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    componentVersion: S.optional(S.String),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    description: S.optional(S.String),
    publisher: S.optional(S.String),
    platforms: S.optional(ComponentPlatformList),
  }),
).annotate({
  identifier: "ComponentLatestVersion",
}) as any as S.Schema<ComponentLatestVersion>;
export interface Component {
  arn?: string;
  componentName?: string;
  latestVersion?: ComponentLatestVersion;
}
export const Component = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    componentName: S.optional(S.String),
    latestVersion: S.optional(ComponentLatestVersion),
  }),
).annotate({ identifier: "Component" }) as any as S.Schema<Component>;
export type ComponentList = Component[];
export const ComponentList = /*@__PURE__*/ S.Array(Component);
export interface ListComponentsResponse {
  components?: Component[];
  nextToken?: string;
}
export const ListComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    components: S.optional(ComponentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export interface ListComponentVersionsRequest {
  arn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/components/{arn}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentVersionsRequest",
}) as any as S.Schema<ListComponentVersionsRequest>;
export interface ComponentVersionListItem {
  componentName?: string;
  componentVersion?: string;
  arn?: string;
}
export const ComponentVersionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentVersionListItem",
}) as any as S.Schema<ComponentVersionListItem>;
export type ComponentVersionList = ComponentVersionListItem[];
export const ComponentVersionList = /*@__PURE__*/ S.Array(
  ComponentVersionListItem,
);
export interface ListComponentVersionsResponse {
  componentVersions?: ComponentVersionListItem[];
  nextToken?: string;
}
export const ListComponentVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentVersions: S.optional(ComponentVersionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentVersionsResponse",
}) as any as S.Schema<ListComponentVersionsResponse>;
export interface ListCoreDevicesRequest {
  thingGroupArn?: string;
  status?: CoreDeviceStatus;
  maxResults?: number;
  nextToken?: string;
  runtime?: string;
}
export const ListCoreDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupArn: S.optional(S.String).pipe(T.HttpQuery("thingGroupArn")),
    status: S.optional(CoreDeviceStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    runtime: S.optional(S.String).pipe(T.HttpQuery("runtime")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/v2/coreDevices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCoreDevicesRequest",
}) as any as S.Schema<ListCoreDevicesRequest>;
export interface CoreDevice {
  coreDeviceThingName?: string;
  status?: CoreDeviceStatus;
  lastStatusUpdateTimestamp?: Date;
  platform?: string;
  architecture?: string;
  runtime?: string;
}
export const CoreDevice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.optional(S.String),
    status: S.optional(CoreDeviceStatus),
    lastStatusUpdateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    platform: S.optional(S.String),
    architecture: S.optional(S.String),
    runtime: S.optional(S.String),
  }),
).annotate({ identifier: "CoreDevice" }) as any as S.Schema<CoreDevice>;
export type CoreDevicesList = CoreDevice[];
export const CoreDevicesList = /*@__PURE__*/ S.Array(CoreDevice);
export interface ListCoreDevicesResponse {
  coreDevices?: CoreDevice[];
  nextToken?: string;
}
export const ListCoreDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDevices: S.optional(CoreDevicesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCoreDevicesResponse",
}) as any as S.Schema<ListCoreDevicesResponse>;
export type DeploymentHistoryFilter = "ALL" | "LATEST_ONLY" | (string & {});
export const DeploymentHistoryFilter = /*@__PURE__*/ S.String;

export interface ListDeploymentsRequest {
  targetArn?: string;
  historyFilter?: DeploymentHistoryFilter;
  parentTargetArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.optional(S.String).pipe(T.HttpQuery("targetArn")),
    historyFilter: S.optional(DeploymentHistoryFilter).pipe(
      T.HttpQuery("historyFilter"),
    ),
    parentTargetArn: S.optional(S.String).pipe(T.HttpQuery("parentTargetArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/v2/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsRequest",
}) as any as S.Schema<ListDeploymentsRequest>;
export interface Deployment {
  targetArn?: string;
  revisionId?: string;
  deploymentId?: string;
  deploymentName?: string;
  creationTimestamp?: Date;
  deploymentStatus?: DeploymentStatus;
  isLatestForTarget?: boolean;
  parentTargetArn?: string;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.optional(S.String),
    revisionId: S.optional(S.String),
    deploymentId: S.optional(S.String),
    deploymentName: S.optional(S.String),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    deploymentStatus: S.optional(DeploymentStatus),
    isLatestForTarget: S.optional(S.Boolean),
    parentTargetArn: S.optional(S.String),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type DeploymentList = Deployment[];
export const DeploymentList = /*@__PURE__*/ S.Array(Deployment);
export interface ListDeploymentsResponse {
  deployments?: Deployment[];
  nextToken?: string;
}
export const ListDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deployments: S.optional(DeploymentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentsResponse",
}) as any as S.Schema<ListDeploymentsResponse>;
export interface ListEffectiveDeploymentsRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEffectiveDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/effectiveDeployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEffectiveDeploymentsRequest",
}) as any as S.Schema<ListEffectiveDeploymentsRequest>;
export type DeploymentID = string;
export type DeploymentName = string;
export type IoTJobId = string;
export type Description = string;
export type EffectiveDeploymentExecutionStatus =
  | "IN_PROGRESS"
  | "QUEUED"
  | "FAILED"
  | "COMPLETED"
  | "TIMED_OUT"
  | "CANCELED"
  | "REJECTED"
  | "SUCCEEDED"
  | (string & {});
export const EffectiveDeploymentExecutionStatus = /*@__PURE__*/ S.String;

export type Reason = string;
export type EffectiveDeploymentErrorCode = string;
export type EffectiveDeploymentErrorStack = string[];
export const EffectiveDeploymentErrorStack = /*@__PURE__*/ S.Array(S.String);
export type EffectiveDeploymentErrorType = string;
export type EffectiveDeploymentErrorTypeList = string[];
export const EffectiveDeploymentErrorTypeList = /*@__PURE__*/ S.Array(S.String);
export interface EffectiveDeploymentStatusDetails {
  errorStack?: string[];
  errorTypes?: string[];
}
export const EffectiveDeploymentStatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorStack: S.optional(EffectiveDeploymentErrorStack),
    errorTypes: S.optional(EffectiveDeploymentErrorTypeList),
  }),
).annotate({
  identifier: "EffectiveDeploymentStatusDetails",
}) as any as S.Schema<EffectiveDeploymentStatusDetails>;
export interface EffectiveDeployment {
  deploymentId: string;
  deploymentName: string;
  iotJobId?: string;
  iotJobArn?: string;
  description?: string;
  targetArn: string;
  coreDeviceExecutionStatus: EffectiveDeploymentExecutionStatus;
  reason?: string;
  creationTimestamp: Date;
  modifiedTimestamp: Date;
  statusDetails?: EffectiveDeploymentStatusDetails;
}
export const EffectiveDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentName: S.String,
    iotJobId: S.optional(S.String),
    iotJobArn: S.optional(S.String),
    description: S.optional(S.String),
    targetArn: S.String,
    coreDeviceExecutionStatus: EffectiveDeploymentExecutionStatus,
    reason: S.optional(S.String),
    creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    statusDetails: S.optional(EffectiveDeploymentStatusDetails),
  }),
).annotate({
  identifier: "EffectiveDeployment",
}) as any as S.Schema<EffectiveDeployment>;
export type EffectiveDeploymentsList = EffectiveDeployment[];
export const EffectiveDeploymentsList =
  /*@__PURE__*/ S.Array(EffectiveDeployment);
export interface ListEffectiveDeploymentsResponse {
  effectiveDeployments?: EffectiveDeployment[];
  nextToken?: string;
}
export const ListEffectiveDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    effectiveDeployments: S.optional(EffectiveDeploymentsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEffectiveDeploymentsResponse",
}) as any as S.Schema<ListEffectiveDeploymentsResponse>;
export type InstalledComponentTopologyFilter = "ALL" | "ROOT" | (string & {});
export const InstalledComponentTopologyFilter = /*@__PURE__*/ S.String;

export interface ListInstalledComponentsRequest {
  coreDeviceThingName: string;
  maxResults?: number;
  nextToken?: string;
  topologyFilter?: InstalledComponentTopologyFilter;
}
export const ListInstalledComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.String.pipe(T.HttpLabel("coreDeviceThingName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    topologyFilter: S.optional(InstalledComponentTopologyFilter).pipe(
      T.HttpQuery("topologyFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/v2/coreDevices/{coreDeviceThingName}/installedComponents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInstalledComponentsRequest",
}) as any as S.Schema<ListInstalledComponentsRequest>;
export type InstalledComponentLifecycleState =
  | "NEW"
  | "INSTALLED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "ERRORED"
  | "BROKEN"
  | "FINISHED"
  | (string & {});
export const InstalledComponentLifecycleState = /*@__PURE__*/ S.String;

export type LifecycleStateDetails = string;
export type IsRoot = boolean;
export type InstalledComponentLifecycleStatusCode = string;
export type InstalledComponentLifecycleStatusCodeList = string[];
export const InstalledComponentLifecycleStatusCodeList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface InstalledComponent {
  componentName?: string;
  componentVersion?: string;
  lifecycleState?: InstalledComponentLifecycleState;
  lifecycleStateDetails?: string;
  isRoot?: boolean;
  lastStatusChangeTimestamp?: Date;
  lastReportedTimestamp?: Date;
  lastInstallationSource?: string;
  lifecycleStatusCodes?: string[];
}
export const InstalledComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    lifecycleState: S.optional(InstalledComponentLifecycleState),
    lifecycleStateDetails: S.optional(S.String),
    isRoot: S.optional(S.Boolean),
    lastStatusChangeTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastReportedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastInstallationSource: S.optional(S.String),
    lifecycleStatusCodes: S.optional(InstalledComponentLifecycleStatusCodeList),
  }),
).annotate({
  identifier: "InstalledComponent",
}) as any as S.Schema<InstalledComponent>;
export type InstalledComponentList = InstalledComponent[];
export const InstalledComponentList = /*@__PURE__*/ S.Array(InstalledComponent);
export interface ListInstalledComponentsResponse {
  installedComponents?: InstalledComponent[];
  nextToken?: string;
}
export const ListInstalledComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    installedComponents: S.optional(InstalledComponentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInstalledComponentsResponse",
}) as any as S.Schema<ListInstalledComponentsResponse>;
export type GenericV2ARN = string;
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
export type ComponentVersionRequirementMap = {
  [key: string]: string | undefined;
};
export const ComponentVersionRequirementMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ComponentCandidate {
  componentName?: string;
  componentVersion?: string;
  versionRequirements?: { [key: string]: string | undefined };
}
export const ComponentCandidate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    versionRequirements: S.optional(ComponentVersionRequirementMap),
  }),
).annotate({
  identifier: "ComponentCandidate",
}) as any as S.Schema<ComponentCandidate>;
export type ComponentCandidateList = ComponentCandidate[];
export const ComponentCandidateList = /*@__PURE__*/ S.Array(ComponentCandidate);
export interface ResolveComponentCandidatesRequest {
  platform?: ComponentPlatform;
  componentCandidates?: ComponentCandidate[];
}
export const ResolveComponentCandidatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    platform: S.optional(ComponentPlatform),
    componentCandidates: S.optional(ComponentCandidateList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/greengrass/v2/resolveComponentCandidates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResolveComponentCandidatesRequest",
}) as any as S.Schema<ResolveComponentCandidatesRequest>;
export interface ResolvedComponentVersion {
  arn?: string;
  componentName?: string;
  componentVersion?: string;
  recipe?: Uint8Array;
  vendorGuidance?: VendorGuidance;
  message?: string;
}
export const ResolvedComponentVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    componentName: S.optional(S.String),
    componentVersion: S.optional(S.String),
    recipe: S.optional(T.Blob),
    vendorGuidance: S.optional(VendorGuidance),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolvedComponentVersion",
}) as any as S.Schema<ResolvedComponentVersion>;
export type ResolvedComponentVersionsList = ResolvedComponentVersion[];
export const ResolvedComponentVersionsList = /*@__PURE__*/ S.Array(
  ResolvedComponentVersion,
);
export interface ResolveComponentCandidatesResponse {
  resolvedComponentVersions?: ResolvedComponentVersion[];
}
export const ResolveComponentCandidatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolvedComponentVersions: S.optional(ResolvedComponentVersionsList),
  }),
).annotate({
  identifier: "ResolveComponentCandidatesResponse",
}) as any as S.Schema<ResolveComponentCandidatesResponse>;
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
export interface UpdateConnectivityInfoRequest {
  thingName: string;
  connectivityInfo: ConnectivityInfo[];
}
export const UpdateConnectivityInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    connectivityInfo: ConnectivityInfoList,
  })
    .pipe(
      S.encodeKeys({
        thingName: "ThingName",
        connectivityInfo: "ConnectivityInfo",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/greengrass/things/{thingName}/connectivityInfo",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateConnectivityInfoRequest",
}) as any as S.Schema<UpdateConnectivityInfoRequest>;
export interface UpdateConnectivityInfoResponse {
  version?: string;
  message?: string;
}
export const UpdateConnectivityInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    message: S.optional(S.String),
  }).pipe(S.encodeKeys({ version: "Version", message: "Message" })),
).annotate({
  identifier: "UpdateConnectivityInfoResponse",
}) as any as S.Schema<UpdateConnectivityInfoResponse>;
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateServiceRoleToAccountError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Greengrass service role with IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region. IoT Greengrass
 * uses this role to verify the identity of client devices and manage core device connectivity
 * information. The role must include the AWSGreengrassResourceAccessRolePolicy managed policy or a custom policy that
 * defines equivalent permissions for the IoT Greengrass features that you use. For more information, see
 * Greengrass service role in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const associateServiceRoleToAccount: API.OperationMethod<
  AssociateServiceRoleToAccountRequest,
  AssociateServiceRoleToAccountResponse,
  AssociateServiceRoleToAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateServiceRoleToAccountRequest,
  output: AssociateServiceRoleToAccountResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
}));

export type BatchAssociateClientDeviceWithCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a list of client devices with a core device. Use this API operation to specify
 * which client devices can discover a core device through cloud discovery. With cloud discovery,
 * client devices connect to IoT Greengrass to retrieve associated core devices' connectivity information
 * and certificates. For more information, see Configure cloud
 * discovery in the *IoT Greengrass V2 Developer Guide*.
 *
 * Client devices are local IoT devices that connect to and communicate with an IoT Greengrass core
 * device over MQTT. You can connect client devices to a core device to sync MQTT messages and
 * data to Amazon Web Services IoT Core and interact with client devices in Greengrass components. For more information,
 * see Interact with
 * local IoT devices in the *IoT Greengrass V2 Developer Guide*.
 */
export const batchAssociateClientDeviceWithCoreDevice: API.OperationMethod<
  BatchAssociateClientDeviceWithCoreDeviceRequest,
  BatchAssociateClientDeviceWithCoreDeviceResponse,
  BatchAssociateClientDeviceWithCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateClientDeviceWithCoreDeviceRequest,
  output: BatchAssociateClientDeviceWithCoreDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateClientDeviceWithCoreDevice",
}));

export type BatchDisassociateClientDeviceFromCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of client devices from a core device. After you disassociate a client
 * device from a core device, the client device won't be able to use cloud discovery to retrieve
 * the core device's connectivity information and certificates.
 */
export const batchDisassociateClientDeviceFromCoreDevice: API.OperationMethod<
  BatchDisassociateClientDeviceFromCoreDeviceRequest,
  BatchDisassociateClientDeviceFromCoreDeviceResponse,
  BatchDisassociateClientDeviceFromCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateClientDeviceFromCoreDeviceRequest,
  output: BatchDisassociateClientDeviceFromCoreDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateClientDeviceFromCoreDevice",
}));

export type CancelDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a deployment. This operation cancels the deployment for devices that haven't yet
 * received it. If a device already received the deployment, this operation doesn't change
 * anything for that device.
 */
export const cancelDeployment: API.OperationMethod<
  CancelDeploymentRequest,
  CancelDeploymentResponse,
  CancelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDeploymentRequest,
  output: CancelDeploymentResponse,
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
  operationName: "CancelDeployment",
}));

export type CreateComponentVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestAlreadyInProgressException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a component. Components are software that run on Greengrass core devices. After you
 * develop and test a component on your core device, you can use this operation to upload your
 * component to IoT Greengrass. Then, you can deploy the component to other core devices.
 *
 * You can use this operation to do the following:
 *
 * - **Create components from recipes**
 *
 * Create a component from a recipe, which is a file that defines the component's
 * metadata, parameters, dependencies, lifecycle, artifacts, and platform capability. For
 * more information, see IoT Greengrass component recipe
 * reference in the *IoT Greengrass V2 Developer Guide*.
 *
 * To create a component from a recipe, specify `inlineRecipe` when you call
 * this operation.
 *
 * - **Create components from Lambda functions**
 *
 * Create a component from an Lambda function that runs on IoT Greengrass. This creates a recipe
 * and artifacts from the Lambda function's deployment package. You can use this operation to
 * migrate Lambda functions from IoT Greengrass V1 to IoT Greengrass V2.
 *
 * This function accepts Lambda functions in all supported versions of Python, Node.js,
 * and Java runtimes. IoT Greengrass doesn't apply any additional restrictions on deprecated Lambda
 * runtime versions.
 *
 * To create a component from a Lambda function, specify `lambdaFunction` when
 * you call this operation.
 *
 * IoT Greengrass currently supports Lambda functions on only Linux core devices.
 */
export const createComponentVersion: API.OperationMethod<
  CreateComponentVersionRequest,
  CreateComponentVersionResponse,
  CreateComponentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComponentVersionRequest,
  output: CreateComponentVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestAlreadyInProgressException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponentVersion",
}));

export type CreateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | RequestAlreadyInProgressException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a continuous deployment for a target, which is a Greengrass core device or group of core
 * devices. When you add a new core device to a group of core devices that has a deployment, IoT Greengrass
 * deploys that group's deployment to the new device.
 *
 * You can define one deployment for each target. When you create a new deployment for a
 * target that has an existing deployment, you replace the previous deployment. IoT Greengrass applies the
 * new deployment to the target devices.
 *
 * Every deployment has a revision number that indicates how many deployment revisions you
 * define for a target. Use this operation to create a new revision of an existing
 * deployment.
 *
 * For more information, see the Create deployments in the
 * *IoT Greengrass V2 Developer Guide*.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    RequestAlreadyInProgressException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
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
 * Deletes a version of a component from IoT Greengrass.
 *
 * This operation deletes the component's recipe and artifacts. As a result, deployments
 * that refer to this component version will fail. If you have deployments that use this
 * component version, you can remove the component from the deployment or update the deployment
 * to use a valid version.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComponentRequest,
  output: DeleteComponentResponse,
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

export type DeleteCoreDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Greengrass core device, which is an IoT thing. This operation removes the core
 * device from the list of core devices. This operation doesn't delete the IoT thing. For more
 * information about how to delete the IoT thing, see DeleteThing in the
 * *IoT API Reference*.
 */
export const deleteCoreDevice: API.OperationMethod<
  DeleteCoreDeviceRequest,
  DeleteCoreDeviceResponse,
  DeleteCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCoreDeviceRequest,
  output: DeleteCoreDeviceResponse,
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
  operationName: "DeleteCoreDevice",
}));

export type DeleteDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a deployment. To delete an active deployment, you must first cancel it. For more
 * information, see CancelDeployment.
 *
 * Deleting a deployment doesn't affect core devices that run that deployment, because core
 * devices store the deployment's configuration on the device. Additionally, core devices can
 * roll back to a previous deployment that has been deleted.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
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
  operationName: "DeleteDeployment",
}));

export type DescribeComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a version of a component.
 */
export const describeComponent: API.OperationMethod<
  DescribeComponentRequest,
  DescribeComponentResponse,
  DescribeComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComponentRequest,
  output: DescribeComponentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponent",
}));

export type DisassociateServiceRoleFromAccountError =
  | InternalServerException
  | CommonErrors;
/**
 * Disassociates the Greengrass service role from IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region.
 * Without a service role, IoT Greengrass can't verify the identity of client devices or manage core device
 * connectivity information. For more information, see Greengrass service role in
 * the *IoT Greengrass Version 2 Developer Guide*.
 */
export const disassociateServiceRoleFromAccount: API.OperationMethod<
  DisassociateServiceRoleFromAccountRequest,
  DisassociateServiceRoleFromAccountResponse,
  DisassociateServiceRoleFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateServiceRoleFromAccountRequest,
  output: DisassociateServiceRoleFromAccountResponse,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
}));

export type GetComponentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the recipe for a version of a component.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentRequest,
  output: GetComponentResponse,
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

export type GetComponentVersionArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the pre-signed URL to download a public or a Lambda component artifact. Core devices
 * call this operation to identify the URL that they can use to download an artifact to
 * install.
 */
export const getComponentVersionArtifact: API.OperationMethod<
  GetComponentVersionArtifactRequest,
  GetComponentVersionArtifactResponse,
  GetComponentVersionArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentVersionArtifactRequest,
  output: GetComponentVersionArtifactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponentVersionArtifact",
}));

export type GetConnectivityInfoError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves connectivity information for a Greengrass core device.
 *
 * Connectivity information includes endpoints and ports where client devices
 * can connect to an MQTT broker on the core device. When a client device
 * calls the IoT Greengrass discovery API,
 * IoT Greengrass returns connectivity information for all of the core devices where the client device can
 * connect. For more information, see Connect client devices to
 * core devices in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const getConnectivityInfo: API.OperationMethod<
  GetConnectivityInfoRequest,
  GetConnectivityInfoResponse,
  GetConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectivityInfoRequest,
  output: GetConnectivityInfoResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
}));

export type GetCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for a Greengrass core device.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - When the status of any component on the core device becomes
 * `BROKEN`
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const getCoreDevice: API.OperationMethod<
  GetCoreDeviceRequest,
  GetCoreDeviceResponse,
  GetCoreDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCoreDeviceRequest,
  output: GetCoreDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDevice",
}));

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a deployment. Deployments define the components that run on Greengrass core devices.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: GetDeploymentResponse,
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

export type GetServiceRoleForAccountError =
  | InternalServerException
  | CommonErrors;
/**
 * Gets the service role associated with IoT Greengrass for your Amazon Web Services account in this Amazon Web Services Region.
 * IoT Greengrass uses this role to verify the identity of client devices and manage core device
 * connectivity information. For more information, see Greengrass service role in
 * the *IoT Greengrass Version 2 Developer Guide*.
 */
export const getServiceRoleForAccount: API.OperationMethod<
  GetServiceRoleForAccountRequest,
  GetServiceRoleForAccountResponse,
  GetServiceRoleForAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceRoleForAccountRequest,
  output: GetServiceRoleForAccountResponse,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
}));

export type ListClientDevicesAssociatedWithCoreDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of client devices that are associated with a core
 * device.
 */
export const listClientDevicesAssociatedWithCoreDevice: API.PaginatedOperationMethod<
  ListClientDevicesAssociatedWithCoreDeviceRequest,
  ListClientDevicesAssociatedWithCoreDeviceResponse,
  ListClientDevicesAssociatedWithCoreDeviceError,
  Credentials | HttpClient.HttpClient,
  AssociatedClientDevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClientDevicesAssociatedWithCoreDeviceRequest,
  output: ListClientDevicesAssociatedWithCoreDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClientDevicesAssociatedWithCoreDevice",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedClientDevices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of component summaries. This list includes components that you
 * have permission to view.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  Component
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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

export type ListComponentVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of all versions for a component. Greater versions are listed
 * first.
 */
export const listComponentVersions: API.PaginatedOperationMethod<
  ListComponentVersionsRequest,
  ListComponentVersionsResponse,
  ListComponentVersionsError,
  Credentials | HttpClient.HttpClient,
  ComponentVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentVersionsRequest,
  output: ListComponentVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "componentVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCoreDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of Greengrass core devices.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - For Greengrass nucleus 2.12.2 and earlier, the core device sends status updates when the
 * status of any component on the core device becomes `ERRORED` or
 * `BROKEN`.
 *
 * - For Greengrass nucleus 2.12.3 and later, the core device sends status updates when the
 * status of any component on the core device becomes `ERRORED`,
 * `BROKEN`, `RUNNING`, or `FINISHED`.
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const listCoreDevices: API.PaginatedOperationMethod<
  ListCoreDevicesRequest,
  ListCoreDevicesResponse,
  ListCoreDevicesError,
  Credentials | HttpClient.HttpClient,
  CoreDevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCoreDevicesRequest,
  output: ListCoreDevicesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "coreDevices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of deployments.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  Deployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
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

export type ListEffectiveDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of deployment jobs that IoT Greengrass sends to Greengrass core devices.
 */
export const listEffectiveDeployments: API.PaginatedOperationMethod<
  ListEffectiveDeploymentsRequest,
  ListEffectiveDeploymentsResponse,
  ListEffectiveDeploymentsError,
  Credentials | HttpClient.HttpClient,
  EffectiveDeployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEffectiveDeploymentsRequest,
  output: ListEffectiveDeploymentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEffectiveDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "effectiveDeployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInstalledComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the components that a Greengrass core device runs. By default,
 * this list doesn't include components that are deployed as dependencies of other components. To
 * include dependencies in the response, set the `topologyFilter` parameter to
 * `ALL`.
 *
 * IoT Greengrass relies on individual devices to send status updates to the Amazon Web Services Cloud. If the
 * IoT Greengrass Core software isn't running on the device, or if device isn't connected to the Amazon Web Services Cloud,
 * then the reported status of that device might not reflect its current status. The status
 * timestamp indicates when the device status was last updated.
 *
 * Core devices send status updates at the following times:
 *
 * - When the IoT Greengrass Core software starts
 *
 * - When the core device receives a deployment from the Amazon Web Services Cloud
 *
 * - When the status of any component on the core device becomes
 * `BROKEN`
 *
 * - At a regular interval that you can configure, which defaults to 24 hours
 *
 * - For IoT Greengrass Core v2.7.0, the core device sends status updates upon local deployment and
 * cloud deployment
 */
export const listInstalledComponents: API.PaginatedOperationMethod<
  ListInstalledComponentsRequest,
  ListInstalledComponentsResponse,
  ListInstalledComponentsError,
  Credentials | HttpClient.HttpClient,
  InstalledComponent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstalledComponentsRequest,
  output: ListInstalledComponentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstalledComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "installedComponents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of tags for an IoT Greengrass resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ResolveComponentCandidatesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of components that meet the component, version, and platform requirements
 * of a deployment. Greengrass core devices call this operation when they receive a deployment to
 * identify the components to install.
 *
 * This operation identifies components that meet all dependency requirements for a
 * deployment. If the requirements conflict, then this operation returns an error and the
 * deployment fails. For example, this occurs if component `A` requires version
 * `>2.0.0` and component `B` requires version `<2.0.0`
 * of a component dependency.
 *
 * When you specify the component candidates to resolve, IoT Greengrass compares each component's
 * digest from the core device with the component's digest in the Amazon Web Services Cloud. If the digests
 * don't match, then IoT Greengrass specifies to use the version from the Amazon Web Services Cloud.
 *
 * To use this operation, you must use the data plane API endpoint and authenticate with an
 * IoT device certificate. For more information, see IoT Greengrass endpoints and quotas.
 */
export const resolveComponentCandidates: API.OperationMethod<
  ResolveComponentCandidatesRequest,
  ResolveComponentCandidatesResponse,
  ResolveComponentCandidatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResolveComponentCandidatesRequest,
  output: ResolveComponentCandidatesResponse,
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
  operationName: "ResolveComponentCandidates",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an IoT Greengrass resource. If a tag already exists for the resource, this operation
 * updates the tag's value.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from an IoT Greengrass resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectivityInfoError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates connectivity information for a Greengrass core device.
 *
 * Connectivity information includes endpoints and ports where client devices
 * can connect to an MQTT broker on the core device. When a client device
 * calls the IoT Greengrass discovery API,
 * IoT Greengrass returns connectivity information for all of the core devices where the client device can
 * connect. For more information, see Connect client devices to
 * core devices in the *IoT Greengrass Version 2 Developer Guide*.
 */
export const updateConnectivityInfo: API.OperationMethod<
  UpdateConnectivityInfoRequest,
  UpdateConnectivityInfoResponse,
  UpdateConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectivityInfoRequest,
  output: UpdateConnectivityInfoResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
}));
