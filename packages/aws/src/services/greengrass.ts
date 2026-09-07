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
  sdkId: "Greengrass",
  serviceShapeName: "Greengrass",
});
const auth = T.AwsAuthSigv4({ name: "greengrass" });
const ver = T.ServiceVersion("2017-06-07");
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

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      ErrorDetails: S.optional(
        S.suspend(() => ErrorDetails).annotate({ identifier: "ErrorDetails" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      ErrorDetails: S.optional(
        S.suspend(() => ErrorDetails).annotate({ identifier: "ErrorDetails" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export interface AssociateRoleToGroupRequest {
  GroupId: string;
  RoleArn?: string;
}
export const AssociateRoleToGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    RoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/greengrass/groups/{GroupId}/role" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateRoleToGroupRequest",
}) as any as S.Schema<AssociateRoleToGroupRequest>;
export interface AssociateRoleToGroupResponse {
  AssociatedAt?: string;
}
export const AssociateRoleToGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociatedAt: S.optional(S.String) }),
).annotate({
  identifier: "AssociateRoleToGroupResponse",
}) as any as S.Schema<AssociateRoleToGroupResponse>;
export interface AssociateServiceRoleToAccountRequest {
  RoleArn?: string;
}
export const AssociateServiceRoleToAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RoleArn: S.optional(S.String) }).pipe(
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
  AssociatedAt?: string;
}
export const AssociateServiceRoleToAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AssociatedAt: S.optional(S.String) }),
).annotate({
  identifier: "AssociateServiceRoleToAccountResponse",
}) as any as S.Schema<AssociateServiceRoleToAccountResponse>;
export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Connector {
  ConnectorArn?: string;
  Id?: string;
  Parameters?: { [key: string]: string | undefined };
}
export const Connector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.optional(S.String),
    Id: S.optional(S.String),
    Parameters: S.optional(__mapOf__string),
  }),
).annotate({ identifier: "Connector" }) as any as S.Schema<Connector>;
export type __listOfConnector = Connector[];
export const __listOfConnector = /*@__PURE__*/ S.Array(Connector);
export interface ConnectorDefinitionVersion {
  Connectors?: Connector[];
}
export const ConnectorDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connectors: S.optional(__listOfConnector) }),
).annotate({
  identifier: "ConnectorDefinitionVersion",
}) as any as S.Schema<ConnectorDefinitionVersion>;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateConnectorDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: ConnectorDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateConnectorDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(ConnectorDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorDefinitionRequest",
}) as any as S.Schema<CreateConnectorDefinitionRequest>;
export interface CreateConnectorDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateConnectorDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateConnectorDefinitionResponse",
}) as any as S.Schema<CreateConnectorDefinitionResponse>;
export interface CreateConnectorDefinitionVersionRequest {
  AmznClientToken?: string;
  ConnectorDefinitionId: string;
  Connectors?: Connector[];
}
export const CreateConnectorDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      ConnectorDefinitionId: S.String.pipe(
        T.HttpLabel("ConnectorDefinitionId"),
      ),
      Connectors: S.optional(__listOfConnector),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateConnectorDefinitionVersionRequest",
}) as any as S.Schema<CreateConnectorDefinitionVersionRequest>;
export interface CreateConnectorDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateConnectorDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateConnectorDefinitionVersionResponse",
}) as any as S.Schema<CreateConnectorDefinitionVersionResponse>;
export interface Core {
  CertificateArn?: string;
  Id?: string;
  SyncShadow?: boolean;
  ThingArn?: string;
}
export const Core = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    Id: S.optional(S.String),
    SyncShadow: S.optional(S.Boolean),
    ThingArn: S.optional(S.String),
  }),
).annotate({ identifier: "Core" }) as any as S.Schema<Core>;
export type __listOfCore = Core[];
export const __listOfCore = /*@__PURE__*/ S.Array(Core);
export interface CoreDefinitionVersion {
  Cores?: Core[];
}
export const CoreDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cores: S.optional(__listOfCore) }),
).annotate({
  identifier: "CoreDefinitionVersion",
}) as any as S.Schema<CoreDefinitionVersion>;
export interface CreateCoreDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: CoreDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateCoreDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(CoreDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/cores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCoreDefinitionRequest",
}) as any as S.Schema<CreateCoreDefinitionRequest>;
export interface CreateCoreDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateCoreDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCoreDefinitionResponse",
}) as any as S.Schema<CreateCoreDefinitionResponse>;
export interface CreateCoreDefinitionVersionRequest {
  AmznClientToken?: string;
  CoreDefinitionId: string;
  Cores?: Core[];
}
export const CreateCoreDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
    Cores: S.optional(__listOfCore),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCoreDefinitionVersionRequest",
}) as any as S.Schema<CreateCoreDefinitionVersionRequest>;
export interface CreateCoreDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateCoreDefinitionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCoreDefinitionVersionResponse",
}) as any as S.Schema<CreateCoreDefinitionVersionResponse>;
export type DeploymentType =
  | "NewDeployment"
  | "Redeployment"
  | "ResetDeployment"
  | "ForceResetDeployment"
  | (string & {});
export const DeploymentType = S.String;

export interface CreateDeploymentRequest {
  AmznClientToken?: string;
  DeploymentId?: string;
  DeploymentType?: DeploymentType;
  GroupId: string;
  GroupVersionId?: string;
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentType: S.optional(DeploymentType),
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    GroupVersionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/greengrass/groups/{GroupId}/deployments",
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
export interface CreateDeploymentResponse {
  DeploymentArn?: string;
  DeploymentId?: string;
}
export const CreateDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentArn: S.optional(S.String),
    DeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDeploymentResponse",
}) as any as S.Schema<CreateDeploymentResponse>;
export interface Device {
  CertificateArn?: string;
  Id?: string;
  SyncShadow?: boolean;
  ThingArn?: string;
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    Id: S.optional(S.String),
    SyncShadow: S.optional(S.Boolean),
    ThingArn: S.optional(S.String),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export type __listOfDevice = Device[];
export const __listOfDevice = /*@__PURE__*/ S.Array(Device);
export interface DeviceDefinitionVersion {
  Devices?: Device[];
}
export const DeviceDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Devices: S.optional(__listOfDevice) }),
).annotate({
  identifier: "DeviceDefinitionVersion",
}) as any as S.Schema<DeviceDefinitionVersion>;
export interface CreateDeviceDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: DeviceDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDeviceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(DeviceDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeviceDefinitionRequest",
}) as any as S.Schema<CreateDeviceDefinitionRequest>;
export interface CreateDeviceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateDeviceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDeviceDefinitionResponse",
}) as any as S.Schema<CreateDeviceDefinitionResponse>;
export interface CreateDeviceDefinitionVersionRequest {
  AmznClientToken?: string;
  DeviceDefinitionId: string;
  Devices?: Device[];
}
export const CreateDeviceDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
      Devices: S.optional(__listOfDevice),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDeviceDefinitionVersionRequest",
}) as any as S.Schema<CreateDeviceDefinitionVersionRequest>;
export interface CreateDeviceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateDeviceDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateDeviceDefinitionVersionResponse",
}) as any as S.Schema<CreateDeviceDefinitionVersionResponse>;
export type FunctionIsolationMode =
  | "GreengrassContainer"
  | "NoContainer"
  | (string & {});
export const FunctionIsolationMode = S.String;

export interface FunctionRunAsConfig {
  Gid?: number;
  Uid?: number;
}
export const FunctionRunAsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Gid: S.optional(S.Number), Uid: S.optional(S.Number) }),
).annotate({
  identifier: "FunctionRunAsConfig",
}) as any as S.Schema<FunctionRunAsConfig>;
export interface FunctionDefaultExecutionConfig {
  IsolationMode?: FunctionIsolationMode;
  RunAs?: FunctionRunAsConfig;
}
export const FunctionDefaultExecutionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsolationMode: S.optional(FunctionIsolationMode),
    RunAs: S.optional(FunctionRunAsConfig),
  }),
).annotate({
  identifier: "FunctionDefaultExecutionConfig",
}) as any as S.Schema<FunctionDefaultExecutionConfig>;
export interface FunctionDefaultConfig {
  Execution?: FunctionDefaultExecutionConfig;
}
export const FunctionDefaultConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Execution: S.optional(FunctionDefaultExecutionConfig) }),
).annotate({
  identifier: "FunctionDefaultConfig",
}) as any as S.Schema<FunctionDefaultConfig>;
export type EncodingType = "binary" | "json" | (string & {});
export const EncodingType = S.String;

export interface FunctionExecutionConfig {
  IsolationMode?: FunctionIsolationMode;
  RunAs?: FunctionRunAsConfig;
}
export const FunctionExecutionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsolationMode: S.optional(FunctionIsolationMode),
    RunAs: S.optional(FunctionRunAsConfig),
  }),
).annotate({
  identifier: "FunctionExecutionConfig",
}) as any as S.Schema<FunctionExecutionConfig>;
export type Permission = "ro" | "rw" | (string & {});
export const Permission = S.String;

export interface ResourceAccessPolicy {
  Permission?: Permission;
  ResourceId?: string;
}
export const ResourceAccessPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Permission: S.optional(Permission),
    ResourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceAccessPolicy",
}) as any as S.Schema<ResourceAccessPolicy>;
export type __listOfResourceAccessPolicy = ResourceAccessPolicy[];
export const __listOfResourceAccessPolicy =
  /*@__PURE__*/ S.Array(ResourceAccessPolicy);
export interface FunctionConfigurationEnvironment {
  AccessSysfs?: boolean;
  Execution?: FunctionExecutionConfig;
  ResourceAccessPolicies?: ResourceAccessPolicy[];
  Variables?: { [key: string]: string | undefined };
}
export const FunctionConfigurationEnvironment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessSysfs: S.optional(S.Boolean),
    Execution: S.optional(FunctionExecutionConfig),
    ResourceAccessPolicies: S.optional(__listOfResourceAccessPolicy),
    Variables: S.optional(__mapOf__string),
  }),
).annotate({
  identifier: "FunctionConfigurationEnvironment",
}) as any as S.Schema<FunctionConfigurationEnvironment>;
export interface FunctionConfiguration {
  EncodingType?: EncodingType;
  Environment?: FunctionConfigurationEnvironment;
  ExecArgs?: string;
  Executable?: string;
  MemorySize?: number;
  Pinned?: boolean;
  Timeout?: number;
  FunctionRuntimeOverride?: string;
}
export const FunctionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncodingType: S.optional(EncodingType),
    Environment: S.optional(FunctionConfigurationEnvironment),
    ExecArgs: S.optional(S.String),
    Executable: S.optional(S.String),
    MemorySize: S.optional(S.Number),
    Pinned: S.optional(S.Boolean),
    Timeout: S.optional(S.Number),
    FunctionRuntimeOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "FunctionConfiguration",
}) as any as S.Schema<FunctionConfiguration>;
export interface Function {
  FunctionArn?: string;
  FunctionConfiguration?: FunctionConfiguration;
  Id?: string;
}
export const Function = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionArn: S.optional(S.String),
    FunctionConfiguration: S.optional(FunctionConfiguration),
    Id: S.optional(S.String),
  }),
).annotate({ identifier: "Function" }) as any as S.Schema<Function>;
export type __listOfFunction = Function[];
export const __listOfFunction = /*@__PURE__*/ S.Array(Function);
export interface FunctionDefinitionVersion {
  DefaultConfig?: FunctionDefaultConfig;
  Functions?: Function[];
}
export const FunctionDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultConfig: S.optional(FunctionDefaultConfig),
    Functions: S.optional(__listOfFunction),
  }),
).annotate({
  identifier: "FunctionDefinitionVersion",
}) as any as S.Schema<FunctionDefinitionVersion>;
export interface CreateFunctionDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: FunctionDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateFunctionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(FunctionDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFunctionDefinitionRequest",
}) as any as S.Schema<CreateFunctionDefinitionRequest>;
export interface CreateFunctionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateFunctionDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFunctionDefinitionResponse",
}) as any as S.Schema<CreateFunctionDefinitionResponse>;
export interface CreateFunctionDefinitionVersionRequest {
  AmznClientToken?: string;
  DefaultConfig?: FunctionDefaultConfig;
  FunctionDefinitionId: string;
  Functions?: Function[];
}
export const CreateFunctionDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      DefaultConfig: S.optional(FunctionDefaultConfig),
      FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
      Functions: S.optional(__listOfFunction),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateFunctionDefinitionVersionRequest",
}) as any as S.Schema<CreateFunctionDefinitionVersionRequest>;
export interface CreateFunctionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateFunctionDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateFunctionDefinitionVersionResponse",
}) as any as S.Schema<CreateFunctionDefinitionVersionResponse>;
export interface GroupVersion {
  ConnectorDefinitionVersionArn?: string;
  CoreDefinitionVersionArn?: string;
  DeviceDefinitionVersionArn?: string;
  FunctionDefinitionVersionArn?: string;
  LoggerDefinitionVersionArn?: string;
  ResourceDefinitionVersionArn?: string;
  SubscriptionDefinitionVersionArn?: string;
}
export const GroupVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDefinitionVersionArn: S.optional(S.String),
    CoreDefinitionVersionArn: S.optional(S.String),
    DeviceDefinitionVersionArn: S.optional(S.String),
    FunctionDefinitionVersionArn: S.optional(S.String),
    LoggerDefinitionVersionArn: S.optional(S.String),
    ResourceDefinitionVersionArn: S.optional(S.String),
    SubscriptionDefinitionVersionArn: S.optional(S.String),
  }),
).annotate({ identifier: "GroupVersion" }) as any as S.Schema<GroupVersion>;
export interface CreateGroupRequest {
  AmznClientToken?: string;
  InitialVersion?: GroupVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(GroupVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface CreateGroupResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export interface CreateGroupCertificateAuthorityRequest {
  AmznClientToken?: string;
  GroupId: string;
}
export const CreateGroupCertificateAuthorityRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/groups/{GroupId}/certificateauthorities",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateGroupCertificateAuthorityRequest",
}) as any as S.Schema<CreateGroupCertificateAuthorityRequest>;
export interface CreateGroupCertificateAuthorityResponse {
  GroupCertificateAuthorityArn?: string;
}
export const CreateGroupCertificateAuthorityResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ GroupCertificateAuthorityArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateGroupCertificateAuthorityResponse",
}) as any as S.Schema<CreateGroupCertificateAuthorityResponse>;
export interface CreateGroupVersionRequest {
  AmznClientToken?: string;
  ConnectorDefinitionVersionArn?: string;
  CoreDefinitionVersionArn?: string;
  DeviceDefinitionVersionArn?: string;
  FunctionDefinitionVersionArn?: string;
  GroupId: string;
  LoggerDefinitionVersionArn?: string;
  ResourceDefinitionVersionArn?: string;
  SubscriptionDefinitionVersionArn?: string;
}
export const CreateGroupVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    ConnectorDefinitionVersionArn: S.optional(S.String),
    CoreDefinitionVersionArn: S.optional(S.String),
    DeviceDefinitionVersionArn: S.optional(S.String),
    FunctionDefinitionVersionArn: S.optional(S.String),
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    LoggerDefinitionVersionArn: S.optional(S.String),
    ResourceDefinitionVersionArn: S.optional(S.String),
    SubscriptionDefinitionVersionArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/groups/{GroupId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupVersionRequest",
}) as any as S.Schema<CreateGroupVersionRequest>;
export interface CreateGroupVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateGroupVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGroupVersionResponse",
}) as any as S.Schema<CreateGroupVersionResponse>;
export type LoggerComponent = "GreengrassSystem" | "Lambda" | (string & {});
export const LoggerComponent = S.String;

export type LoggerLevel =
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export const LoggerLevel = S.String;

export type LoggerType = "FileSystem" | "AWSCloudWatch" | (string & {});
export const LoggerType = S.String;

export interface Logger {
  Component?: LoggerComponent;
  Id?: string;
  Level?: LoggerLevel;
  Space?: number;
  Type?: LoggerType;
}
export const Logger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Component: S.optional(LoggerComponent),
    Id: S.optional(S.String),
    Level: S.optional(LoggerLevel),
    Space: S.optional(S.Number),
    Type: S.optional(LoggerType),
  }),
).annotate({ identifier: "Logger" }) as any as S.Schema<Logger>;
export type __listOfLogger = Logger[];
export const __listOfLogger = /*@__PURE__*/ S.Array(Logger);
export interface LoggerDefinitionVersion {
  Loggers?: Logger[];
}
export const LoggerDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Loggers: S.optional(__listOfLogger) }),
).annotate({
  identifier: "LoggerDefinitionVersion",
}) as any as S.Schema<LoggerDefinitionVersion>;
export interface CreateLoggerDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: LoggerDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateLoggerDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(LoggerDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/loggers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLoggerDefinitionRequest",
}) as any as S.Schema<CreateLoggerDefinitionRequest>;
export interface CreateLoggerDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateLoggerDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLoggerDefinitionResponse",
}) as any as S.Schema<CreateLoggerDefinitionResponse>;
export interface CreateLoggerDefinitionVersionRequest {
  AmznClientToken?: string;
  LoggerDefinitionId: string;
  Loggers?: Logger[];
}
export const CreateLoggerDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
      Loggers: S.optional(__listOfLogger),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateLoggerDefinitionVersionRequest",
}) as any as S.Schema<CreateLoggerDefinitionVersionRequest>;
export interface CreateLoggerDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateLoggerDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateLoggerDefinitionVersionResponse",
}) as any as S.Schema<CreateLoggerDefinitionVersionResponse>;
export interface GroupOwnerSetting {
  AutoAddGroupOwner?: boolean;
  GroupOwner?: string;
}
export const GroupOwnerSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoAddGroupOwner: S.optional(S.Boolean),
    GroupOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupOwnerSetting",
}) as any as S.Schema<GroupOwnerSetting>;
export interface LocalDeviceResourceData {
  GroupOwnerSetting?: GroupOwnerSetting;
  SourcePath?: string;
}
export const LocalDeviceResourceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupOwnerSetting: S.optional(GroupOwnerSetting),
    SourcePath: S.optional(S.String),
  }),
).annotate({
  identifier: "LocalDeviceResourceData",
}) as any as S.Schema<LocalDeviceResourceData>;
export interface LocalVolumeResourceData {
  DestinationPath?: string;
  GroupOwnerSetting?: GroupOwnerSetting;
  SourcePath?: string;
}
export const LocalVolumeResourceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPath: S.optional(S.String),
    GroupOwnerSetting: S.optional(GroupOwnerSetting),
    SourcePath: S.optional(S.String),
  }),
).annotate({
  identifier: "LocalVolumeResourceData",
}) as any as S.Schema<LocalVolumeResourceData>;
export interface ResourceDownloadOwnerSetting {
  GroupOwner?: string;
  GroupPermission?: Permission;
}
export const ResourceDownloadOwnerSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupOwner: S.optional(S.String),
    GroupPermission: S.optional(Permission),
  }),
).annotate({
  identifier: "ResourceDownloadOwnerSetting",
}) as any as S.Schema<ResourceDownloadOwnerSetting>;
export interface S3MachineLearningModelResourceData {
  DestinationPath?: string;
  OwnerSetting?: ResourceDownloadOwnerSetting;
  S3Uri?: string;
}
export const S3MachineLearningModelResourceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPath: S.optional(S.String),
    OwnerSetting: S.optional(ResourceDownloadOwnerSetting),
    S3Uri: S.optional(S.String),
  }),
).annotate({
  identifier: "S3MachineLearningModelResourceData",
}) as any as S.Schema<S3MachineLearningModelResourceData>;
export interface SageMakerMachineLearningModelResourceData {
  DestinationPath?: string;
  OwnerSetting?: ResourceDownloadOwnerSetting;
  SageMakerJobArn?: string;
}
export const SageMakerMachineLearningModelResourceData =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationPath: S.optional(S.String),
      OwnerSetting: S.optional(ResourceDownloadOwnerSetting),
      SageMakerJobArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SageMakerMachineLearningModelResourceData",
  }) as any as S.Schema<SageMakerMachineLearningModelResourceData>;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface SecretsManagerSecretResourceData {
  ARN?: string;
  AdditionalStagingLabelsToDownload?: string[];
}
export const SecretsManagerSecretResourceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    AdditionalStagingLabelsToDownload: S.optional(__listOf__string),
  }),
).annotate({
  identifier: "SecretsManagerSecretResourceData",
}) as any as S.Schema<SecretsManagerSecretResourceData>;
export interface ResourceDataContainer {
  LocalDeviceResourceData?: LocalDeviceResourceData;
  LocalVolumeResourceData?: LocalVolumeResourceData;
  S3MachineLearningModelResourceData?: S3MachineLearningModelResourceData;
  SageMakerMachineLearningModelResourceData?: SageMakerMachineLearningModelResourceData;
  SecretsManagerSecretResourceData?: SecretsManagerSecretResourceData;
}
export const ResourceDataContainer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalDeviceResourceData: S.optional(LocalDeviceResourceData),
    LocalVolumeResourceData: S.optional(LocalVolumeResourceData),
    S3MachineLearningModelResourceData: S.optional(
      S3MachineLearningModelResourceData,
    ),
    SageMakerMachineLearningModelResourceData: S.optional(
      SageMakerMachineLearningModelResourceData,
    ),
    SecretsManagerSecretResourceData: S.optional(
      SecretsManagerSecretResourceData,
    ),
  }),
).annotate({
  identifier: "ResourceDataContainer",
}) as any as S.Schema<ResourceDataContainer>;
export interface Resource {
  Id?: string;
  Name?: string;
  ResourceDataContainer?: ResourceDataContainer;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    ResourceDataContainer: S.optional(ResourceDataContainer),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type __listOfResource = Resource[];
export const __listOfResource = /*@__PURE__*/ S.Array(Resource);
export interface ResourceDefinitionVersion {
  Resources?: Resource[];
}
export const ResourceDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resources: S.optional(__listOfResource) }),
).annotate({
  identifier: "ResourceDefinitionVersion",
}) as any as S.Schema<ResourceDefinitionVersion>;
export interface CreateResourceDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: ResourceDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateResourceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(ResourceDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceDefinitionRequest",
}) as any as S.Schema<CreateResourceDefinitionRequest>;
export interface CreateResourceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateResourceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateResourceDefinitionResponse",
}) as any as S.Schema<CreateResourceDefinitionResponse>;
export interface CreateResourceDefinitionVersionRequest {
  AmznClientToken?: string;
  ResourceDefinitionId: string;
  Resources?: Resource[];
}
export const CreateResourceDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
      Resources: S.optional(__listOfResource),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateResourceDefinitionVersionRequest",
}) as any as S.Schema<CreateResourceDefinitionVersionRequest>;
export interface CreateResourceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateResourceDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateResourceDefinitionVersionResponse",
}) as any as S.Schema<CreateResourceDefinitionVersionResponse>;
export type S3UrlSignerRole = string;
export type SoftwareToUpdate = "core" | "ota_agent" | (string & {});
export const SoftwareToUpdate = S.String;

export type UpdateAgentLogLevel =
  | "NONE"
  | "TRACE"
  | "DEBUG"
  | "VERBOSE"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export const UpdateAgentLogLevel = S.String;

export type UpdateTargets = string[];
export const UpdateTargets = /*@__PURE__*/ S.Array(S.String);
export type UpdateTargetsArchitecture =
  | "armv6l"
  | "armv7l"
  | "x86_64"
  | "aarch64"
  | (string & {});
export const UpdateTargetsArchitecture = S.String;

export type UpdateTargetsOperatingSystem =
  | "ubuntu"
  | "raspbian"
  | "amazon_linux"
  | "openwrt"
  | (string & {});
export const UpdateTargetsOperatingSystem = S.String;

export interface CreateSoftwareUpdateJobRequest {
  AmznClientToken?: string;
  S3UrlSignerRole?: string;
  SoftwareToUpdate?: SoftwareToUpdate;
  UpdateAgentLogLevel?: UpdateAgentLogLevel;
  UpdateTargets?: string[];
  UpdateTargetsArchitecture?: UpdateTargetsArchitecture;
  UpdateTargetsOperatingSystem?: UpdateTargetsOperatingSystem;
}
export const CreateSoftwareUpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    S3UrlSignerRole: S.optional(S.String),
    SoftwareToUpdate: S.optional(SoftwareToUpdate),
    UpdateAgentLogLevel: S.optional(UpdateAgentLogLevel),
    UpdateTargets: S.optional(UpdateTargets),
    UpdateTargetsArchitecture: S.optional(UpdateTargetsArchitecture),
    UpdateTargetsOperatingSystem: S.optional(UpdateTargetsOperatingSystem),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/updates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSoftwareUpdateJobRequest",
}) as any as S.Schema<CreateSoftwareUpdateJobRequest>;
export interface CreateSoftwareUpdateJobResponse {
  IotJobArn?: string;
  IotJobId?: string;
  PlatformSoftwareVersion?: string;
}
export const CreateSoftwareUpdateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IotJobArn: S.optional(S.String),
    IotJobId: S.optional(S.String),
    PlatformSoftwareVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSoftwareUpdateJobResponse",
}) as any as S.Schema<CreateSoftwareUpdateJobResponse>;
export interface Subscription {
  Id?: string;
  Source?: string;
  Subject?: string;
  Target?: string;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Source: S.optional(S.String),
    Subject: S.optional(S.String),
    Target: S.optional(S.String),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type __listOfSubscription = Subscription[];
export const __listOfSubscription = /*@__PURE__*/ S.Array(Subscription);
export interface SubscriptionDefinitionVersion {
  Subscriptions?: Subscription[];
}
export const SubscriptionDefinitionVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Subscriptions: S.optional(__listOfSubscription) }),
).annotate({
  identifier: "SubscriptionDefinitionVersion",
}) as any as S.Schema<SubscriptionDefinitionVersion>;
export interface CreateSubscriptionDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: SubscriptionDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSubscriptionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    InitialVersion: S.optional(SubscriptionDefinitionVersion),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/definition/subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionDefinitionRequest",
}) as any as S.Schema<CreateSubscriptionDefinitionRequest>;
export interface CreateSubscriptionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const CreateSubscriptionDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      LastUpdatedTimestamp: S.optional(S.String),
      LatestVersion: S.optional(S.String),
      LatestVersionArn: S.optional(S.String),
      Name: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateSubscriptionDefinitionResponse",
}) as any as S.Schema<CreateSubscriptionDefinitionResponse>;
export interface CreateSubscriptionDefinitionVersionRequest {
  AmznClientToken?: string;
  SubscriptionDefinitionId: string;
  Subscriptions?: Subscription[];
}
export const CreateSubscriptionDefinitionVersionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AmznClientToken: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Client-Token"),
      ),
      SubscriptionDefinitionId: S.String.pipe(
        T.HttpLabel("SubscriptionDefinitionId"),
      ),
      Subscriptions: S.optional(__listOfSubscription),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateSubscriptionDefinitionVersionRequest",
  }) as any as S.Schema<CreateSubscriptionDefinitionVersionRequest>;
export interface CreateSubscriptionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const CreateSubscriptionDefinitionVersionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
  ).annotate({
    identifier: "CreateSubscriptionDefinitionVersionResponse",
  }) as any as S.Schema<CreateSubscriptionDefinitionVersionResponse>;
export interface DeleteConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
}
export const DeleteConnectorDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorDefinitionRequest",
}) as any as S.Schema<DeleteConnectorDefinitionRequest>;
export interface DeleteConnectorDefinitionResponse {}
export const DeleteConnectorDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectorDefinitionResponse",
}) as any as S.Schema<DeleteConnectorDefinitionResponse>;
export interface DeleteCoreDefinitionRequest {
  CoreDefinitionId: string;
}
export const DeleteCoreDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCoreDefinitionRequest",
}) as any as S.Schema<DeleteCoreDefinitionRequest>;
export interface DeleteCoreDefinitionResponse {}
export const DeleteCoreDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCoreDefinitionResponse",
}) as any as S.Schema<DeleteCoreDefinitionResponse>;
export interface DeleteDeviceDefinitionRequest {
  DeviceDefinitionId: string;
}
export const DeleteDeviceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/devices/{DeviceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeviceDefinitionRequest",
}) as any as S.Schema<DeleteDeviceDefinitionRequest>;
export interface DeleteDeviceDefinitionResponse {}
export const DeleteDeviceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeviceDefinitionResponse",
}) as any as S.Schema<DeleteDeviceDefinitionResponse>;
export interface DeleteFunctionDefinitionRequest {
  FunctionDefinitionId: string;
}
export const DeleteFunctionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionDefinitionRequest",
}) as any as S.Schema<DeleteFunctionDefinitionRequest>;
export interface DeleteFunctionDefinitionResponse {}
export const DeleteFunctionDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFunctionDefinitionResponse",
}) as any as S.Schema<DeleteFunctionDefinitionResponse>;
export interface DeleteGroupRequest {
  GroupId: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/greengrass/groups/{GroupId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export interface DeleteLoggerDefinitionRequest {
  LoggerDefinitionId: string;
}
export const DeleteLoggerDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/loggers/{LoggerDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLoggerDefinitionRequest",
}) as any as S.Schema<DeleteLoggerDefinitionRequest>;
export interface DeleteLoggerDefinitionResponse {}
export const DeleteLoggerDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLoggerDefinitionResponse",
}) as any as S.Schema<DeleteLoggerDefinitionResponse>;
export interface DeleteResourceDefinitionRequest {
  ResourceDefinitionId: string;
}
export const DeleteResourceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceDefinitionRequest",
}) as any as S.Schema<DeleteResourceDefinitionRequest>;
export interface DeleteResourceDefinitionResponse {}
export const DeleteResourceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceDefinitionResponse",
}) as any as S.Schema<DeleteResourceDefinitionResponse>;
export interface DeleteSubscriptionDefinitionRequest {
  SubscriptionDefinitionId: string;
}
export const DeleteSubscriptionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionDefinitionId: S.String.pipe(
      T.HttpLabel("SubscriptionDefinitionId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriptionDefinitionRequest",
}) as any as S.Schema<DeleteSubscriptionDefinitionRequest>;
export interface DeleteSubscriptionDefinitionResponse {}
export const DeleteSubscriptionDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteSubscriptionDefinitionResponse",
}) as any as S.Schema<DeleteSubscriptionDefinitionResponse>;
export interface DisassociateRoleFromGroupRequest {
  GroupId: string;
}
export const DisassociateRoleFromGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/greengrass/groups/{GroupId}/role" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateRoleFromGroupRequest",
}) as any as S.Schema<DisassociateRoleFromGroupRequest>;
export interface DisassociateRoleFromGroupResponse {
  DisassociatedAt?: string;
}
export const DisassociateRoleFromGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DisassociatedAt: S.optional(S.String) }),
).annotate({
  identifier: "DisassociateRoleFromGroupResponse",
}) as any as S.Schema<DisassociateRoleFromGroupResponse>;
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
  DisassociatedAt?: string;
}
export const DisassociateServiceRoleFromAccountResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DisassociatedAt: S.optional(S.String) }),
  ).annotate({
    identifier: "DisassociateServiceRoleFromAccountResponse",
  }) as any as S.Schema<DisassociateServiceRoleFromAccountResponse>;
export interface GetAssociatedRoleRequest {
  GroupId: string;
}
export const GetAssociatedRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/role" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssociatedRoleRequest",
}) as any as S.Schema<GetAssociatedRoleRequest>;
export interface GetAssociatedRoleResponse {
  AssociatedAt?: string;
  RoleArn?: string;
}
export const GetAssociatedRoleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedAt: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAssociatedRoleResponse",
}) as any as S.Schema<GetAssociatedRoleResponse>;
export interface GetBulkDeploymentStatusRequest {
  BulkDeploymentId: string;
}
export const GetBulkDeploymentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBulkDeploymentStatusRequest",
}) as any as S.Schema<GetBulkDeploymentStatusRequest>;
export interface BulkDeploymentMetrics {
  InvalidInputRecords?: number;
  RecordsProcessed?: number;
  RetryAttempts?: number;
}
export const BulkDeploymentMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvalidInputRecords: S.optional(S.Number),
    RecordsProcessed: S.optional(S.Number),
    RetryAttempts: S.optional(S.Number),
  }),
).annotate({
  identifier: "BulkDeploymentMetrics",
}) as any as S.Schema<BulkDeploymentMetrics>;
export type BulkDeploymentStatus =
  | "Initializing"
  | "Running"
  | "Completed"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | (string & {});
export const BulkDeploymentStatus = S.String;

export interface ErrorDetail {
  DetailedErrorCode?: string;
  DetailedErrorMessage?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetailedErrorCode: S.optional(S.String),
    DetailedErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type ErrorDetails = ErrorDetail[];
export const ErrorDetails = /*@__PURE__*/ S.Array(ErrorDetail);
export interface GetBulkDeploymentStatusResponse {
  BulkDeploymentMetrics?: BulkDeploymentMetrics;
  BulkDeploymentStatus?: BulkDeploymentStatus;
  CreatedAt?: string;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetBulkDeploymentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeploymentMetrics: S.optional(BulkDeploymentMetrics),
    BulkDeploymentStatus: S.optional(BulkDeploymentStatus),
    CreatedAt: S.optional(S.String),
    ErrorDetails: S.optional(ErrorDetails),
    ErrorMessage: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetBulkDeploymentStatusResponse",
}) as any as S.Schema<GetBulkDeploymentStatusResponse>;
export interface GetConnectivityInfoRequest {
  ThingName: string;
}
export const GetConnectivityInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThingName: S.String.pipe(T.HttpLabel("ThingName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/things/{ThingName}/connectivityInfo",
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
export interface ConnectivityInfo {
  HostAddress?: string;
  Id?: string;
  Metadata?: string;
  PortNumber?: number;
}
export const ConnectivityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostAddress: S.optional(S.String),
    Id: S.optional(S.String),
    Metadata: S.optional(S.String),
    PortNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConnectivityInfo",
}) as any as S.Schema<ConnectivityInfo>;
export type __listOfConnectivityInfo = ConnectivityInfo[];
export const __listOfConnectivityInfo = /*@__PURE__*/ S.Array(ConnectivityInfo);
export interface GetConnectivityInfoResponse {
  ConnectivityInfo?: ConnectivityInfo[];
  Message?: string;
}
export const GetConnectivityInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectivityInfo: S.optional(__listOfConnectivityInfo),
    Message: S.optional(S.String),
  }).pipe(S.encodeKeys({ Message: "message" })),
).annotate({
  identifier: "GetConnectivityInfoResponse",
}) as any as S.Schema<GetConnectivityInfoResponse>;
export interface GetConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
}
export const GetConnectorDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectorDefinitionRequest",
}) as any as S.Schema<GetConnectorDefinitionRequest>;
export interface GetConnectorDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetConnectorDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetConnectorDefinitionResponse",
}) as any as S.Schema<GetConnectorDefinitionResponse>;
export interface GetConnectorDefinitionVersionRequest {
  ConnectorDefinitionId: string;
  ConnectorDefinitionVersionId: string;
  NextToken?: string;
}
export const GetConnectorDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConnectorDefinitionId: S.String.pipe(
        T.HttpLabel("ConnectorDefinitionId"),
      ),
      ConnectorDefinitionVersionId: S.String.pipe(
        T.HttpLabel("ConnectorDefinitionVersionId"),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions/{ConnectorDefinitionVersionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetConnectorDefinitionVersionRequest",
}) as any as S.Schema<GetConnectorDefinitionVersionRequest>;
export interface GetConnectorDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: ConnectorDefinitionVersion & {
    Connectors: (Connector & { ConnectorArn: string; Id: string })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export const GetConnectorDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Definition: S.optional(ConnectorDefinitionVersion),
      Id: S.optional(S.String),
      NextToken: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "GetConnectorDefinitionVersionResponse",
}) as any as S.Schema<GetConnectorDefinitionVersionResponse>;
export interface GetCoreDefinitionRequest {
  CoreDefinitionId: string;
}
export const GetCoreDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCoreDefinitionRequest",
}) as any as S.Schema<GetCoreDefinitionRequest>;
export interface GetCoreDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetCoreDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetCoreDefinitionResponse",
}) as any as S.Schema<GetCoreDefinitionResponse>;
export interface GetCoreDefinitionVersionRequest {
  CoreDefinitionId: string;
  CoreDefinitionVersionId: string;
}
export const GetCoreDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
    CoreDefinitionVersionId: S.String.pipe(
      T.HttpLabel("CoreDefinitionVersionId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions/{CoreDefinitionVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCoreDefinitionVersionRequest",
}) as any as S.Schema<GetCoreDefinitionVersionRequest>;
export interface GetCoreDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: CoreDefinitionVersion & {
    Cores: (Core & { CertificateArn: string; Id: string; ThingArn: string })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export const GetCoreDefinitionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Definition: S.optional(CoreDefinitionVersion),
    Id: S.optional(S.String),
    NextToken: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCoreDefinitionVersionResponse",
}) as any as S.Schema<GetCoreDefinitionVersionResponse>;
export interface GetDeploymentStatusRequest {
  DeploymentId: string;
  GroupId: string;
}
export const GetDeploymentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/groups/{GroupId}/deployments/{DeploymentId}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentStatusRequest",
}) as any as S.Schema<GetDeploymentStatusRequest>;
export interface GetDeploymentStatusResponse {
  DeploymentStatus?: string;
  DeploymentType?: DeploymentType;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  UpdatedAt?: string;
}
export const GetDeploymentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentStatus: S.optional(S.String),
    DeploymentType: S.optional(DeploymentType),
    ErrorDetails: S.optional(ErrorDetails),
    ErrorMessage: S.optional(S.String),
    UpdatedAt: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDeploymentStatusResponse",
}) as any as S.Schema<GetDeploymentStatusResponse>;
export interface GetDeviceDefinitionRequest {
  DeviceDefinitionId: string;
}
export const GetDeviceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/devices/{DeviceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceDefinitionRequest",
}) as any as S.Schema<GetDeviceDefinitionRequest>;
export interface GetDeviceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetDeviceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetDeviceDefinitionResponse",
}) as any as S.Schema<GetDeviceDefinitionResponse>;
export interface GetDeviceDefinitionVersionRequest {
  DeviceDefinitionId: string;
  DeviceDefinitionVersionId: string;
  NextToken?: string;
}
export const GetDeviceDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
    DeviceDefinitionVersionId: S.String.pipe(
      T.HttpLabel("DeviceDefinitionVersionId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions/{DeviceDefinitionVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceDefinitionVersionRequest",
}) as any as S.Schema<GetDeviceDefinitionVersionRequest>;
export interface GetDeviceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: DeviceDefinitionVersion & {
    Devices: (Device & {
      CertificateArn: string;
      Id: string;
      ThingArn: string;
    })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export const GetDeviceDefinitionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Definition: S.optional(DeviceDefinitionVersion),
    Id: S.optional(S.String),
    NextToken: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDeviceDefinitionVersionResponse",
}) as any as S.Schema<GetDeviceDefinitionVersionResponse>;
export interface GetFunctionDefinitionRequest {
  FunctionDefinitionId: string;
}
export const GetFunctionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionDefinitionRequest",
}) as any as S.Schema<GetFunctionDefinitionRequest>;
export interface GetFunctionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetFunctionDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetFunctionDefinitionResponse",
}) as any as S.Schema<GetFunctionDefinitionResponse>;
export interface GetFunctionDefinitionVersionRequest {
  FunctionDefinitionId: string;
  FunctionDefinitionVersionId: string;
  NextToken?: string;
}
export const GetFunctionDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
    FunctionDefinitionVersionId: S.String.pipe(
      T.HttpLabel("FunctionDefinitionVersionId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions/{FunctionDefinitionVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionDefinitionVersionRequest",
}) as any as S.Schema<GetFunctionDefinitionVersionRequest>;
export interface GetFunctionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: FunctionDefinitionVersion & {
    Functions: (Function & {
      Id: string;
      FunctionConfiguration: FunctionConfiguration & {
        Environment: FunctionConfigurationEnvironment & {
          ResourceAccessPolicies: (ResourceAccessPolicy & {
            ResourceId: string;
          })[];
        };
      };
    })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export const GetFunctionDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Definition: S.optional(FunctionDefinitionVersion),
      Id: S.optional(S.String),
      NextToken: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "GetFunctionDefinitionVersionResponse",
}) as any as S.Schema<GetFunctionDefinitionVersionResponse>;
export interface GetGroupRequest {
  GroupId: string;
}
export const GetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupRequest",
}) as any as S.Schema<GetGroupRequest>;
export interface GetGroupResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetGroupResponse",
}) as any as S.Schema<GetGroupResponse>;
export interface GetGroupCertificateAuthorityRequest {
  CertificateAuthorityId: string;
  GroupId: string;
}
export const GetGroupCertificateAuthorityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateAuthorityId: S.String.pipe(
      T.HttpLabel("CertificateAuthorityId"),
    ),
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/groups/{GroupId}/certificateauthorities/{CertificateAuthorityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupCertificateAuthorityRequest",
}) as any as S.Schema<GetGroupCertificateAuthorityRequest>;
export interface GetGroupCertificateAuthorityResponse {
  GroupCertificateAuthorityArn?: string;
  GroupCertificateAuthorityId?: string;
  PemEncodedCertificate?: string;
}
export const GetGroupCertificateAuthorityResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GroupCertificateAuthorityArn: S.optional(S.String),
      GroupCertificateAuthorityId: S.optional(S.String),
      PemEncodedCertificate: S.optional(S.String),
    }),
).annotate({
  identifier: "GetGroupCertificateAuthorityResponse",
}) as any as S.Schema<GetGroupCertificateAuthorityResponse>;
export interface GetGroupCertificateConfigurationRequest {
  GroupId: string;
}
export const GetGroupCertificateConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetGroupCertificateConfigurationRequest",
}) as any as S.Schema<GetGroupCertificateConfigurationRequest>;
export interface GetGroupCertificateConfigurationResponse {
  CertificateAuthorityExpiryInMilliseconds?: string;
  CertificateExpiryInMilliseconds?: string;
  GroupId?: string;
}
export const GetGroupCertificateConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CertificateAuthorityExpiryInMilliseconds: S.optional(S.String),
      CertificateExpiryInMilliseconds: S.optional(S.String),
      GroupId: S.optional(S.String),
    }),
).annotate({
  identifier: "GetGroupCertificateConfigurationResponse",
}) as any as S.Schema<GetGroupCertificateConfigurationResponse>;
export interface GetGroupVersionRequest {
  GroupId: string;
  GroupVersionId: string;
}
export const GetGroupVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    GroupVersionId: S.String.pipe(T.HttpLabel("GroupVersionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/groups/{GroupId}/versions/{GroupVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupVersionRequest",
}) as any as S.Schema<GetGroupVersionRequest>;
export interface GetGroupVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: GroupVersion;
  Id?: string;
  Version?: string;
}
export const GetGroupVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Definition: S.optional(GroupVersion),
    Id: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGroupVersionResponse",
}) as any as S.Schema<GetGroupVersionResponse>;
export interface GetLoggerDefinitionRequest {
  LoggerDefinitionId: string;
}
export const GetLoggerDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/loggers/{LoggerDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoggerDefinitionRequest",
}) as any as S.Schema<GetLoggerDefinitionRequest>;
export interface GetLoggerDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetLoggerDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetLoggerDefinitionResponse",
}) as any as S.Schema<GetLoggerDefinitionResponse>;
export interface GetLoggerDefinitionVersionRequest {
  LoggerDefinitionId: string;
  LoggerDefinitionVersionId: string;
  NextToken?: string;
}
export const GetLoggerDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
    LoggerDefinitionVersionId: S.String.pipe(
      T.HttpLabel("LoggerDefinitionVersionId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions/{LoggerDefinitionVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoggerDefinitionVersionRequest",
}) as any as S.Schema<GetLoggerDefinitionVersionRequest>;
export interface GetLoggerDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: LoggerDefinitionVersion & {
    Loggers: (Logger & {
      Component: LoggerComponent;
      Id: string;
      Level: LoggerLevel;
      Type: LoggerType;
    })[];
  };
  Id?: string;
  Version?: string;
}
export const GetLoggerDefinitionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Definition: S.optional(LoggerDefinitionVersion),
    Id: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "GetLoggerDefinitionVersionResponse",
}) as any as S.Schema<GetLoggerDefinitionVersionResponse>;
export interface GetResourceDefinitionRequest {
  ResourceDefinitionId: string;
}
export const GetResourceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceDefinitionRequest",
}) as any as S.Schema<GetResourceDefinitionRequest>;
export interface GetResourceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetResourceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetResourceDefinitionResponse",
}) as any as S.Schema<GetResourceDefinitionResponse>;
export interface GetResourceDefinitionVersionRequest {
  ResourceDefinitionId: string;
  ResourceDefinitionVersionId: string;
}
export const GetResourceDefinitionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
    ResourceDefinitionVersionId: S.String.pipe(
      T.HttpLabel("ResourceDefinitionVersionId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions/{ResourceDefinitionVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceDefinitionVersionRequest",
}) as any as S.Schema<GetResourceDefinitionVersionRequest>;
export interface GetResourceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: ResourceDefinitionVersion & {
    Resources: (Resource & {
      Id: string;
      Name: string;
      ResourceDataContainer: ResourceDataContainer & {
        S3MachineLearningModelResourceData: S3MachineLearningModelResourceData & {
          OwnerSetting: ResourceDownloadOwnerSetting & {
            GroupOwner: string;
            GroupPermission: Permission;
          };
        };
        SageMakerMachineLearningModelResourceData: SageMakerMachineLearningModelResourceData & {
          OwnerSetting: ResourceDownloadOwnerSetting & {
            GroupOwner: string;
            GroupPermission: Permission;
          };
        };
      };
    })[];
  };
  Id?: string;
  Version?: string;
}
export const GetResourceDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Definition: S.optional(ResourceDefinitionVersion),
      Id: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "GetResourceDefinitionVersionResponse",
}) as any as S.Schema<GetResourceDefinitionVersionResponse>;
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
  AssociatedAt?: string;
  RoleArn?: string;
}
export const GetServiceRoleForAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedAt: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetServiceRoleForAccountResponse",
}) as any as S.Schema<GetServiceRoleForAccountResponse>;
export interface GetSubscriptionDefinitionRequest {
  SubscriptionDefinitionId: string;
}
export const GetSubscriptionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionDefinitionId: S.String.pipe(
      T.HttpLabel("SubscriptionDefinitionId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionDefinitionRequest",
}) as any as S.Schema<GetSubscriptionDefinitionRequest>;
export interface GetSubscriptionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetSubscriptionDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetSubscriptionDefinitionResponse",
}) as any as S.Schema<GetSubscriptionDefinitionResponse>;
export interface GetSubscriptionDefinitionVersionRequest {
  NextToken?: string;
  SubscriptionDefinitionId: string;
  SubscriptionDefinitionVersionId: string;
}
export const GetSubscriptionDefinitionVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      SubscriptionDefinitionId: S.String.pipe(
        T.HttpLabel("SubscriptionDefinitionId"),
      ),
      SubscriptionDefinitionVersionId: S.String.pipe(
        T.HttpLabel("SubscriptionDefinitionVersionId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions/{SubscriptionDefinitionVersionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSubscriptionDefinitionVersionRequest",
}) as any as S.Schema<GetSubscriptionDefinitionVersionRequest>;
export interface GetSubscriptionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: SubscriptionDefinitionVersion & {
    Subscriptions: (Subscription & {
      Id: string;
      Source: string;
      Subject: string;
      Target: string;
    })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export const GetSubscriptionDefinitionVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreationTimestamp: S.optional(S.String),
      Definition: S.optional(SubscriptionDefinitionVersion),
      Id: S.optional(S.String),
      NextToken: S.optional(S.String),
      Version: S.optional(S.String),
    }),
).annotate({
  identifier: "GetSubscriptionDefinitionVersionResponse",
}) as any as S.Schema<GetSubscriptionDefinitionVersionResponse>;
export interface GetThingRuntimeConfigurationRequest {
  ThingName: string;
}
export const GetThingRuntimeConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThingName: S.String.pipe(T.HttpLabel("ThingName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/things/{ThingName}/runtimeconfig",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThingRuntimeConfigurationRequest",
}) as any as S.Schema<GetThingRuntimeConfigurationRequest>;
export type ConfigurationSyncStatus = "InSync" | "OutOfSync" | (string & {});
export const ConfigurationSyncStatus = S.String;

export type Telemetry = "On" | "Off" | (string & {});
export const Telemetry = S.String;

export interface TelemetryConfiguration {
  ConfigurationSyncStatus?: ConfigurationSyncStatus;
  Telemetry?: Telemetry;
}
export const TelemetryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSyncStatus: S.optional(ConfigurationSyncStatus),
    Telemetry: S.optional(Telemetry),
  }),
).annotate({
  identifier: "TelemetryConfiguration",
}) as any as S.Schema<TelemetryConfiguration>;
export interface RuntimeConfiguration {
  TelemetryConfiguration?: TelemetryConfiguration;
}
export const RuntimeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TelemetryConfiguration: S.optional(TelemetryConfiguration) }),
).annotate({
  identifier: "RuntimeConfiguration",
}) as any as S.Schema<RuntimeConfiguration>;
export interface GetThingRuntimeConfigurationResponse {
  RuntimeConfiguration?: RuntimeConfiguration & {
    TelemetryConfiguration: TelemetryConfiguration & { Telemetry: Telemetry };
  };
}
export const GetThingRuntimeConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RuntimeConfiguration: S.optional(RuntimeConfiguration) }),
).annotate({
  identifier: "GetThingRuntimeConfigurationResponse",
}) as any as S.Schema<GetThingRuntimeConfigurationResponse>;
export interface ListBulkDeploymentDetailedReportsRequest {
  BulkDeploymentId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListBulkDeploymentDetailedReportsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")),
      MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/detailed-reports",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListBulkDeploymentDetailedReportsRequest",
}) as any as S.Schema<ListBulkDeploymentDetailedReportsRequest>;
export interface BulkDeploymentResult {
  CreatedAt?: string;
  DeploymentArn?: string;
  DeploymentId?: string;
  DeploymentStatus?: string;
  DeploymentType?: DeploymentType;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  GroupArn?: string;
}
export const BulkDeploymentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(S.String),
    DeploymentArn: S.optional(S.String),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(S.String),
    DeploymentType: S.optional(DeploymentType),
    ErrorDetails: S.optional(ErrorDetails),
    ErrorMessage: S.optional(S.String),
    GroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "BulkDeploymentResult",
}) as any as S.Schema<BulkDeploymentResult>;
export type BulkDeploymentResults = BulkDeploymentResult[];
export const BulkDeploymentResults =
  /*@__PURE__*/ S.Array(BulkDeploymentResult);
export interface ListBulkDeploymentDetailedReportsResponse {
  Deployments?: BulkDeploymentResult[];
  NextToken?: string;
}
export const ListBulkDeploymentDetailedReportsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Deployments: S.optional(BulkDeploymentResults),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListBulkDeploymentDetailedReportsResponse",
  }) as any as S.Schema<ListBulkDeploymentDetailedReportsResponse>;
export interface ListBulkDeploymentsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListBulkDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/bulk/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBulkDeploymentsRequest",
}) as any as S.Schema<ListBulkDeploymentsRequest>;
export interface BulkDeployment {
  BulkDeploymentArn?: string;
  BulkDeploymentId?: string;
  CreatedAt?: string;
}
export const BulkDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeploymentArn: S.optional(S.String),
    BulkDeploymentId: S.optional(S.String),
    CreatedAt: S.optional(S.String),
  }),
).annotate({ identifier: "BulkDeployment" }) as any as S.Schema<BulkDeployment>;
export type BulkDeployments = BulkDeployment[];
export const BulkDeployments = /*@__PURE__*/ S.Array(BulkDeployment);
export interface ListBulkDeploymentsResponse {
  BulkDeployments?: BulkDeployment[];
  NextToken?: string;
}
export const ListBulkDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeployments: S.optional(BulkDeployments),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBulkDeploymentsResponse",
}) as any as S.Schema<ListBulkDeploymentsResponse>;
export interface ListConnectorDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListConnectorDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorDefinitionsRequest",
}) as any as S.Schema<ListConnectorDefinitionsRequest>;
export interface DefinitionInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DefinitionInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DefinitionInformation",
}) as any as S.Schema<DefinitionInformation>;
export type __listOfDefinitionInformation = DefinitionInformation[];
export const __listOfDefinitionInformation = /*@__PURE__*/ S.Array(
  DefinitionInformation,
);
export interface ListConnectorDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListConnectorDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorDefinitionsResponse",
}) as any as S.Schema<ListConnectorDefinitionsResponse>;
export interface ListConnectorDefinitionVersionsRequest {
  ConnectorDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListConnectorDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConnectorDefinitionId: S.String.pipe(
        T.HttpLabel("ConnectorDefinitionId"),
      ),
      MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConnectorDefinitionVersionsRequest",
}) as any as S.Schema<ListConnectorDefinitionVersionsRequest>;
export interface VersionInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export const VersionInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "VersionInformation",
}) as any as S.Schema<VersionInformation>;
export type __listOfVersionInformation = VersionInformation[];
export const __listOfVersionInformation =
  /*@__PURE__*/ S.Array(VersionInformation);
export interface ListConnectorDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListConnectorDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
).annotate({
  identifier: "ListConnectorDefinitionVersionsResponse",
}) as any as S.Schema<ListConnectorDefinitionVersionsResponse>;
export interface ListCoreDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListCoreDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/cores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCoreDefinitionsRequest",
}) as any as S.Schema<ListCoreDefinitionsRequest>;
export interface ListCoreDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListCoreDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCoreDefinitionsResponse",
}) as any as S.Schema<ListCoreDefinitionsResponse>;
export interface ListCoreDefinitionVersionsRequest {
  CoreDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListCoreDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCoreDefinitionVersionsRequest",
}) as any as S.Schema<ListCoreDefinitionVersionsRequest>;
export interface ListCoreDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListCoreDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Versions: S.optional(__listOfVersionInformation),
  }),
).annotate({
  identifier: "ListCoreDefinitionVersionsResponse",
}) as any as S.Schema<ListCoreDefinitionVersionsResponse>;
export interface ListDeploymentsRequest {
  GroupId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/groups/{GroupId}/deployments",
      }),
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
  CreatedAt?: string;
  DeploymentArn?: string;
  DeploymentId?: string;
  DeploymentType?: DeploymentType;
  GroupArn?: string;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(S.String),
    DeploymentArn: S.optional(S.String),
    DeploymentId: S.optional(S.String),
    DeploymentType: S.optional(DeploymentType),
    GroupArn: S.optional(S.String),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type Deployments = Deployment[];
export const Deployments = /*@__PURE__*/ S.Array(Deployment);
export interface ListDeploymentsResponse {
  Deployments?: Deployment[];
  NextToken?: string;
}
export const ListDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Deployments: S.optional(Deployments),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentsResponse",
}) as any as S.Schema<ListDeploymentsResponse>;
export interface ListDeviceDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListDeviceDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeviceDefinitionsRequest",
}) as any as S.Schema<ListDeviceDefinitionsRequest>;
export interface ListDeviceDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListDeviceDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeviceDefinitionsResponse",
}) as any as S.Schema<ListDeviceDefinitionsResponse>;
export interface ListDeviceDefinitionVersionsRequest {
  DeviceDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListDeviceDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeviceDefinitionVersionsRequest",
}) as any as S.Schema<ListDeviceDefinitionVersionsRequest>;
export interface ListDeviceDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListDeviceDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
).annotate({
  identifier: "ListDeviceDefinitionVersionsResponse",
}) as any as S.Schema<ListDeviceDefinitionVersionsResponse>;
export interface ListFunctionDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListFunctionDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFunctionDefinitionsRequest",
}) as any as S.Schema<ListFunctionDefinitionsRequest>;
export interface ListFunctionDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListFunctionDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFunctionDefinitionsResponse",
}) as any as S.Schema<ListFunctionDefinitionsResponse>;
export interface ListFunctionDefinitionVersionsRequest {
  FunctionDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListFunctionDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
      MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListFunctionDefinitionVersionsRequest",
}) as any as S.Schema<ListFunctionDefinitionVersionsRequest>;
export interface ListFunctionDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListFunctionDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
).annotate({
  identifier: "ListFunctionDefinitionVersionsResponse",
}) as any as S.Schema<ListFunctionDefinitionVersionsResponse>;
export interface ListGroupCertificateAuthoritiesRequest {
  GroupId: string;
}
export const ListGroupCertificateAuthoritiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/groups/{GroupId}/certificateauthorities",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListGroupCertificateAuthoritiesRequest",
}) as any as S.Schema<ListGroupCertificateAuthoritiesRequest>;
export interface GroupCertificateAuthorityProperties {
  GroupCertificateAuthorityArn?: string;
  GroupCertificateAuthorityId?: string;
}
export const GroupCertificateAuthorityProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupCertificateAuthorityArn: S.optional(S.String),
    GroupCertificateAuthorityId: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupCertificateAuthorityProperties",
}) as any as S.Schema<GroupCertificateAuthorityProperties>;
export type __listOfGroupCertificateAuthorityProperties =
  GroupCertificateAuthorityProperties[];
export const __listOfGroupCertificateAuthorityProperties =
  /*@__PURE__*/ S.Array(GroupCertificateAuthorityProperties);
export interface ListGroupCertificateAuthoritiesResponse {
  GroupCertificateAuthorities?: GroupCertificateAuthorityProperties[];
}
export const ListGroupCertificateAuthoritiesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GroupCertificateAuthorities: S.optional(
        __listOfGroupCertificateAuthorityProperties,
      ),
    }),
).annotate({
  identifier: "ListGroupCertificateAuthoritiesResponse",
}) as any as S.Schema<ListGroupCertificateAuthoritiesResponse>;
export interface ListGroupsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface GroupInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export const GroupInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTimestamp: S.optional(S.String),
    Id: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    LatestVersionArn: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupInformation",
}) as any as S.Schema<GroupInformation>;
export type __listOfGroupInformation = GroupInformation[];
export const __listOfGroupInformation = /*@__PURE__*/ S.Array(GroupInformation);
export interface ListGroupsResponse {
  Groups?: GroupInformation[];
  NextToken?: string;
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(__listOfGroupInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export interface ListGroupVersionsRequest {
  GroupId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListGroupVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupVersionsRequest",
}) as any as S.Schema<ListGroupVersionsRequest>;
export interface ListGroupVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListGroupVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Versions: S.optional(__listOfVersionInformation),
  }),
).annotate({
  identifier: "ListGroupVersionsResponse",
}) as any as S.Schema<ListGroupVersionsResponse>;
export interface ListLoggerDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListLoggerDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/loggers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLoggerDefinitionsRequest",
}) as any as S.Schema<ListLoggerDefinitionsRequest>;
export interface ListLoggerDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListLoggerDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLoggerDefinitionsResponse",
}) as any as S.Schema<ListLoggerDefinitionsResponse>;
export interface ListLoggerDefinitionVersionsRequest {
  LoggerDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const ListLoggerDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLoggerDefinitionVersionsRequest",
}) as any as S.Schema<ListLoggerDefinitionVersionsRequest>;
export interface ListLoggerDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListLoggerDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
).annotate({
  identifier: "ListLoggerDefinitionVersionsResponse",
}) as any as S.Schema<ListLoggerDefinitionVersionsResponse>;
export interface ListResourceDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListResourceDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceDefinitionsRequest",
}) as any as S.Schema<ListResourceDefinitionsRequest>;
export interface ListResourceDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListResourceDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceDefinitionsResponse",
}) as any as S.Schema<ListResourceDefinitionsResponse>;
export interface ListResourceDefinitionVersionsRequest {
  MaxResults?: string;
  NextToken?: string;
  ResourceDefinitionId: string;
}
export const ListResourceDefinitionVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListResourceDefinitionVersionsRequest",
}) as any as S.Schema<ListResourceDefinitionVersionsRequest>;
export interface ListResourceDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListResourceDefinitionVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
).annotate({
  identifier: "ListResourceDefinitionVersionsResponse",
}) as any as S.Schema<ListResourceDefinitionVersionsResponse>;
export interface ListSubscriptionDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListSubscriptionDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/greengrass/definition/subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionDefinitionsRequest",
}) as any as S.Schema<ListSubscriptionDefinitionsRequest>;
export interface ListSubscriptionDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export const ListSubscriptionDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definitions: S.optional(__listOfDefinitionInformation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubscriptionDefinitionsResponse",
}) as any as S.Schema<ListSubscriptionDefinitionsResponse>;
export interface ListSubscriptionDefinitionVersionsRequest {
  MaxResults?: string;
  NextToken?: string;
  SubscriptionDefinitionId: string;
}
export const ListSubscriptionDefinitionVersionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      SubscriptionDefinitionId: S.String.pipe(
        T.HttpLabel("SubscriptionDefinitionId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListSubscriptionDefinitionVersionsRequest",
  }) as any as S.Schema<ListSubscriptionDefinitionVersionsRequest>;
export interface ListSubscriptionDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export const ListSubscriptionDefinitionVersionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      Versions: S.optional(__listOfVersionInformation),
    }),
  ).annotate({
    identifier: "ListSubscriptionDefinitionVersionsResponse",
  }) as any as S.Schema<ListSubscriptionDefinitionVersionsResponse>;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ResetDeploymentsRequest {
  AmznClientToken?: string;
  Force?: boolean;
  GroupId: string;
}
export const ResetDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    Force: S.optional(S.Boolean),
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/greengrass/groups/{GroupId}/deployments/$reset",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetDeploymentsRequest",
}) as any as S.Schema<ResetDeploymentsRequest>;
export interface ResetDeploymentsResponse {
  DeploymentArn?: string;
  DeploymentId?: string;
}
export const ResetDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentArn: S.optional(S.String),
    DeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResetDeploymentsResponse",
}) as any as S.Schema<ResetDeploymentsResponse>;
export interface StartBulkDeploymentRequest {
  AmznClientToken?: string;
  ExecutionRoleArn?: string;
  InputFileUri?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartBulkDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmznClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
    ),
    ExecutionRoleArn: S.optional(S.String),
    InputFileUri: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/greengrass/bulk/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBulkDeploymentRequest",
}) as any as S.Schema<StartBulkDeploymentRequest>;
export interface StartBulkDeploymentResponse {
  BulkDeploymentArn?: string;
  BulkDeploymentId?: string;
}
export const StartBulkDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeploymentArn: S.optional(S.String),
    BulkDeploymentId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartBulkDeploymentResponse",
}) as any as S.Schema<StartBulkDeploymentResponse>;
export interface StopBulkDeploymentRequest {
  BulkDeploymentId: string;
}
export const StopBulkDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/$stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBulkDeploymentRequest",
}) as any as S.Schema<StopBulkDeploymentRequest>;
export interface StopBulkDeploymentResponse {}
export const StopBulkDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopBulkDeploymentResponse",
}) as any as S.Schema<StopBulkDeploymentResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    tags: S.optional(Tags),
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateConnectivityInfoRequest {
  ConnectivityInfo?: ConnectivityInfo[];
  ThingName: string;
}
export const UpdateConnectivityInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectivityInfo: S.optional(__listOfConnectivityInfo),
    ThingName: S.String.pipe(T.HttpLabel("ThingName")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/things/{ThingName}/connectivityInfo",
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
  Message?: string;
  Version?: string;
}
export const UpdateConnectivityInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Version: S.optional(S.String),
  }).pipe(S.encodeKeys({ Message: "message" })),
).annotate({
  identifier: "UpdateConnectivityInfoResponse",
}) as any as S.Schema<UpdateConnectivityInfoResponse>;
export interface UpdateConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
  Name?: string;
}
export const UpdateConnectorDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorDefinitionRequest",
}) as any as S.Schema<UpdateConnectorDefinitionRequest>;
export interface UpdateConnectorDefinitionResponse {}
export const UpdateConnectorDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConnectorDefinitionResponse",
}) as any as S.Schema<UpdateConnectorDefinitionResponse>;
export interface UpdateCoreDefinitionRequest {
  CoreDefinitionId: string;
  Name?: string;
}
export const UpdateCoreDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/cores/{CoreDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCoreDefinitionRequest",
}) as any as S.Schema<UpdateCoreDefinitionRequest>;
export interface UpdateCoreDefinitionResponse {}
export const UpdateCoreDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCoreDefinitionResponse",
}) as any as S.Schema<UpdateCoreDefinitionResponse>;
export interface UpdateDeviceDefinitionRequest {
  DeviceDefinitionId: string;
  Name?: string;
}
export const UpdateDeviceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/devices/{DeviceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeviceDefinitionRequest",
}) as any as S.Schema<UpdateDeviceDefinitionRequest>;
export interface UpdateDeviceDefinitionResponse {}
export const UpdateDeviceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDeviceDefinitionResponse",
}) as any as S.Schema<UpdateDeviceDefinitionResponse>;
export interface UpdateFunctionDefinitionRequest {
  FunctionDefinitionId: string;
  Name?: string;
}
export const UpdateFunctionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFunctionDefinitionRequest",
}) as any as S.Schema<UpdateFunctionDefinitionRequest>;
export interface UpdateFunctionDefinitionResponse {}
export const UpdateFunctionDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFunctionDefinitionResponse",
}) as any as S.Schema<UpdateFunctionDefinitionResponse>;
export interface UpdateGroupRequest {
  GroupId: string;
  Name?: string;
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/greengrass/groups/{GroupId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResponse {}
export const UpdateGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGroupResponse",
}) as any as S.Schema<UpdateGroupResponse>;
export interface UpdateGroupCertificateConfigurationRequest {
  CertificateExpiryInMilliseconds?: string;
  GroupId: string;
}
export const UpdateGroupCertificateConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CertificateExpiryInMilliseconds: S.optional(S.String),
      GroupId: S.String.pipe(T.HttpLabel("GroupId")),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateGroupCertificateConfigurationRequest",
  }) as any as S.Schema<UpdateGroupCertificateConfigurationRequest>;
export interface UpdateGroupCertificateConfigurationResponse {
  CertificateAuthorityExpiryInMilliseconds?: string;
  CertificateExpiryInMilliseconds?: string;
  GroupId?: string;
}
export const UpdateGroupCertificateConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CertificateAuthorityExpiryInMilliseconds: S.optional(S.String),
      CertificateExpiryInMilliseconds: S.optional(S.String),
      GroupId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "UpdateGroupCertificateConfigurationResponse",
  }) as any as S.Schema<UpdateGroupCertificateConfigurationResponse>;
export interface UpdateLoggerDefinitionRequest {
  LoggerDefinitionId: string;
  Name?: string;
}
export const UpdateLoggerDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/loggers/{LoggerDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLoggerDefinitionRequest",
}) as any as S.Schema<UpdateLoggerDefinitionRequest>;
export interface UpdateLoggerDefinitionResponse {}
export const UpdateLoggerDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLoggerDefinitionResponse",
}) as any as S.Schema<UpdateLoggerDefinitionResponse>;
export interface UpdateResourceDefinitionRequest {
  Name?: string;
  ResourceDefinitionId: string;
}
export const UpdateResourceDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceDefinitionRequest",
}) as any as S.Schema<UpdateResourceDefinitionRequest>;
export interface UpdateResourceDefinitionResponse {}
export const UpdateResourceDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceDefinitionResponse",
}) as any as S.Schema<UpdateResourceDefinitionResponse>;
export interface UpdateSubscriptionDefinitionRequest {
  Name?: string;
  SubscriptionDefinitionId: string;
}
export const UpdateSubscriptionDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SubscriptionDefinitionId: S.String.pipe(
      T.HttpLabel("SubscriptionDefinitionId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionDefinitionRequest",
}) as any as S.Schema<UpdateSubscriptionDefinitionRequest>;
export interface UpdateSubscriptionDefinitionResponse {}
export const UpdateSubscriptionDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateSubscriptionDefinitionResponse",
}) as any as S.Schema<UpdateSubscriptionDefinitionResponse>;
export interface TelemetryConfigurationUpdate {
  Telemetry?: Telemetry;
}
export const TelemetryConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Telemetry: S.optional(Telemetry) }),
).annotate({
  identifier: "TelemetryConfigurationUpdate",
}) as any as S.Schema<TelemetryConfigurationUpdate>;
export interface UpdateThingRuntimeConfigurationRequest {
  TelemetryConfiguration?: TelemetryConfigurationUpdate;
  ThingName: string;
}
export const UpdateThingRuntimeConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TelemetryConfiguration: S.optional(TelemetryConfigurationUpdate),
      ThingName: S.String.pipe(T.HttpLabel("ThingName")),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/greengrass/things/{ThingName}/runtimeconfig",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateThingRuntimeConfigurationRequest",
}) as any as S.Schema<UpdateThingRuntimeConfigurationRequest>;
export interface UpdateThingRuntimeConfigurationResponse {}
export const UpdateThingRuntimeConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateThingRuntimeConfigurationResponse",
}) as any as S.Schema<UpdateThingRuntimeConfigurationResponse>;
export type AssociateRoleToGroupError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Associates a role with a group. Your Greengrass core will use the role to access AWS cloud services. The role's permissions should allow Greengrass core Lambda functions to perform actions against the cloud.
 */
export const associateRoleToGroup: API.OperationMethod<
  AssociateRoleToGroupRequest,
  AssociateRoleToGroupResponse,
  AssociateRoleToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateRoleToGroupRequest,
  output: AssociateRoleToGroupResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateRoleToGroup",
}));

export type AssociateServiceRoleToAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Associates a role with your account. AWS IoT Greengrass will use the role to access your Lambda functions and AWS IoT resources. This is necessary for deployments to succeed. The role must have at least minimum permissions in the policy ''AWSGreengrassResourceAccessRolePolicy''.
 */
export const associateServiceRoleToAccount: API.OperationMethod<
  AssociateServiceRoleToAccountRequest,
  AssociateServiceRoleToAccountResponse,
  AssociateServiceRoleToAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateServiceRoleToAccountRequest,
  output: AssociateServiceRoleToAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
}));

export type CreateConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a connector definition. You may provide the initial version of the connector definition now or use ''CreateConnectorDefinitionVersion'' at a later time.
 */
export const createConnectorDefinition: API.OperationMethod<
  CreateConnectorDefinitionRequest,
  CreateConnectorDefinitionResponse,
  CreateConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorDefinitionRequest,
  output: CreateConnectorDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinition",
}));

export type CreateConnectorDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a connector definition which has already been defined.
 */
export const createConnectorDefinitionVersion: API.OperationMethod<
  CreateConnectorDefinitionVersionRequest,
  CreateConnectorDefinitionVersionResponse,
  CreateConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorDefinitionVersionRequest,
  output: CreateConnectorDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinitionVersion",
}));

export type CreateCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a core definition. You may provide the initial version of the core definition now or use ''CreateCoreDefinitionVersion'' at a later time. Greengrass groups must each contain exactly one Greengrass core.
 */
export const createCoreDefinition: API.OperationMethod<
  CreateCoreDefinitionRequest,
  CreateCoreDefinitionResponse,
  CreateCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCoreDefinitionRequest,
  output: CreateCoreDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinition",
}));

export type CreateCoreDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a core definition that has already been defined. Greengrass groups must each contain exactly one Greengrass core.
 */
export const createCoreDefinitionVersion: API.OperationMethod<
  CreateCoreDefinitionVersionRequest,
  CreateCoreDefinitionVersionResponse,
  CreateCoreDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCoreDefinitionVersionRequest,
  output: CreateCoreDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinitionVersion",
}));

export type CreateDeploymentError = BadRequestException | CommonErrors;
/**
 * Creates a deployment. ''CreateDeployment'' requests are idempotent with respect to the ''X-Amzn-Client-Token'' token and the request parameters.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a device definition. You may provide the initial version of the device definition now or use ''CreateDeviceDefinitionVersion'' at a later time.
 */
export const createDeviceDefinition: API.OperationMethod<
  CreateDeviceDefinitionRequest,
  CreateDeviceDefinitionResponse,
  CreateDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeviceDefinitionRequest,
  output: CreateDeviceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinition",
}));

export type CreateDeviceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a device definition that has already been defined.
 */
export const createDeviceDefinitionVersion: API.OperationMethod<
  CreateDeviceDefinitionVersionRequest,
  CreateDeviceDefinitionVersionResponse,
  CreateDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeviceDefinitionVersionRequest,
  output: CreateDeviceDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinitionVersion",
}));

export type CreateFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a Lambda function definition which contains a list of Lambda functions and their configurations to be used in a group. You can create an initial version of the definition by providing a list of Lambda functions and their configurations now, or use ''CreateFunctionDefinitionVersion'' later.
 */
export const createFunctionDefinition: API.OperationMethod<
  CreateFunctionDefinitionRequest,
  CreateFunctionDefinitionResponse,
  CreateFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFunctionDefinitionRequest,
  output: CreateFunctionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinition",
}));

export type CreateFunctionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a Lambda function definition that has already been defined.
 */
export const createFunctionDefinitionVersion: API.OperationMethod<
  CreateFunctionDefinitionVersionRequest,
  CreateFunctionDefinitionVersionResponse,
  CreateFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFunctionDefinitionVersionRequest,
  output: CreateFunctionDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinitionVersion",
}));

export type CreateGroupError = BadRequestException | CommonErrors;
/**
 * Creates a group. You may provide the initial version of the group or use ''CreateGroupVersion'' at a later time. Tip: You can use the ''gg_group_setup'' package (https://github.com/awslabs/aws-greengrass-group-setup) as a library or command-line application to create and deploy Greengrass groups.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateGroupCertificateAuthorityError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a CA for the group. If a CA already exists, it will rotate the existing CA.
 */
export const createGroupCertificateAuthority: API.OperationMethod<
  CreateGroupCertificateAuthorityRequest,
  CreateGroupCertificateAuthorityResponse,
  CreateGroupCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupCertificateAuthorityRequest,
  output: CreateGroupCertificateAuthorityResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupCertificateAuthority",
}));

export type CreateGroupVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a group which has already been defined.
 */
export const createGroupVersion: API.OperationMethod<
  CreateGroupVersionRequest,
  CreateGroupVersionResponse,
  CreateGroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupVersionRequest,
  output: CreateGroupVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupVersion",
}));

export type CreateLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a logger definition. You may provide the initial version of the logger definition now or use ''CreateLoggerDefinitionVersion'' at a later time.
 */
export const createLoggerDefinition: API.OperationMethod<
  CreateLoggerDefinitionRequest,
  CreateLoggerDefinitionResponse,
  CreateLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoggerDefinitionRequest,
  output: CreateLoggerDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinition",
}));

export type CreateLoggerDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a logger definition that has already been defined.
 */
export const createLoggerDefinitionVersion: API.OperationMethod<
  CreateLoggerDefinitionVersionRequest,
  CreateLoggerDefinitionVersionResponse,
  CreateLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoggerDefinitionVersionRequest,
  output: CreateLoggerDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinitionVersion",
}));

export type CreateResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a resource definition which contains a list of resources to be used in a group. You can create an initial version of the definition by providing a list of resources now, or use ''CreateResourceDefinitionVersion'' later.
 */
export const createResourceDefinition: API.OperationMethod<
  CreateResourceDefinitionRequest,
  CreateResourceDefinitionResponse,
  CreateResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceDefinitionRequest,
  output: CreateResourceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinition",
}));

export type CreateResourceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a resource definition that has already been defined.
 */
export const createResourceDefinitionVersion: API.OperationMethod<
  CreateResourceDefinitionVersionRequest,
  CreateResourceDefinitionVersionResponse,
  CreateResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceDefinitionVersionRequest,
  output: CreateResourceDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinitionVersion",
}));

export type CreateSoftwareUpdateJobError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a software update for a core or group of cores (specified as an IoT thing group.) Use this to update the OTA Agent as well as the Greengrass core software. It makes use of the IoT Jobs feature which provides additional commands to manage a Greengrass core software update job.
 */
export const createSoftwareUpdateJob: API.OperationMethod<
  CreateSoftwareUpdateJobRequest,
  CreateSoftwareUpdateJobResponse,
  CreateSoftwareUpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSoftwareUpdateJobRequest,
  output: CreateSoftwareUpdateJobResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSoftwareUpdateJob",
}));

export type CreateSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a subscription definition. You may provide the initial version of the subscription definition now or use ''CreateSubscriptionDefinitionVersion'' at a later time.
 */
export const createSubscriptionDefinition: API.OperationMethod<
  CreateSubscriptionDefinitionRequest,
  CreateSubscriptionDefinitionResponse,
  CreateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionDefinitionRequest,
  output: CreateSubscriptionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinition",
}));

export type CreateSubscriptionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a subscription definition which has already been defined.
 */
export const createSubscriptionDefinitionVersion: API.OperationMethod<
  CreateSubscriptionDefinitionVersionRequest,
  CreateSubscriptionDefinitionVersionResponse,
  CreateSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionDefinitionVersionRequest,
  output: CreateSubscriptionDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinitionVersion",
}));

export type DeleteConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a connector definition.
 */
export const deleteConnectorDefinition: API.OperationMethod<
  DeleteConnectorDefinitionRequest,
  DeleteConnectorDefinitionResponse,
  DeleteConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorDefinitionRequest,
  output: DeleteConnectorDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorDefinition",
}));

export type DeleteCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a core definition.
 */
export const deleteCoreDefinition: API.OperationMethod<
  DeleteCoreDefinitionRequest,
  DeleteCoreDefinitionResponse,
  DeleteCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCoreDefinitionRequest,
  output: DeleteCoreDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreDefinition",
}));

export type DeleteDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a device definition.
 */
export const deleteDeviceDefinition: API.OperationMethod<
  DeleteDeviceDefinitionRequest,
  DeleteDeviceDefinitionResponse,
  DeleteDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeviceDefinitionRequest,
  output: DeleteDeviceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeviceDefinition",
}));

export type DeleteFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a Lambda function definition.
 */
export const deleteFunctionDefinition: API.OperationMethod<
  DeleteFunctionDefinitionRequest,
  DeleteFunctionDefinitionResponse,
  DeleteFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionDefinitionRequest,
  output: DeleteFunctionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionDefinition",
}));

export type DeleteGroupError = BadRequestException | CommonErrors;
/**
 * Deletes a group.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a logger definition.
 */
export const deleteLoggerDefinition: API.OperationMethod<
  DeleteLoggerDefinitionRequest,
  DeleteLoggerDefinitionResponse,
  DeleteLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoggerDefinitionRequest,
  output: DeleteLoggerDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggerDefinition",
}));

export type DeleteResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a resource definition.
 */
export const deleteResourceDefinition: API.OperationMethod<
  DeleteResourceDefinitionRequest,
  DeleteResourceDefinitionResponse,
  DeleteResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceDefinitionRequest,
  output: DeleteResourceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDefinition",
}));

export type DeleteSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Deletes a subscription definition.
 */
export const deleteSubscriptionDefinition: API.OperationMethod<
  DeleteSubscriptionDefinitionRequest,
  DeleteSubscriptionDefinitionResponse,
  DeleteSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionDefinitionRequest,
  output: DeleteSubscriptionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionDefinition",
}));

export type DisassociateRoleFromGroupError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the role from a group.
 */
export const disassociateRoleFromGroup: API.OperationMethod<
  DisassociateRoleFromGroupRequest,
  DisassociateRoleFromGroupResponse,
  DisassociateRoleFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateRoleFromGroupRequest,
  output: DisassociateRoleFromGroupResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRoleFromGroup",
}));

export type DisassociateServiceRoleFromAccountError =
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the service role from your account. Without a service role, deployments will not work.
 */
export const disassociateServiceRoleFromAccount: API.OperationMethod<
  DisassociateServiceRoleFromAccountRequest,
  DisassociateServiceRoleFromAccountResponse,
  DisassociateServiceRoleFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateServiceRoleFromAccountRequest,
  output: DisassociateServiceRoleFromAccountResponse,
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
}));

export type GetAssociatedRoleError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the role associated with a particular group.
 */
export const getAssociatedRole: API.OperationMethod<
  GetAssociatedRoleRequest,
  GetAssociatedRoleResponse,
  GetAssociatedRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssociatedRoleRequest,
  output: GetAssociatedRoleResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedRole",
}));

export type GetBulkDeploymentStatusError = BadRequestException | CommonErrors;
/**
 * Returns the status of a bulk deployment.
 */
export const getBulkDeploymentStatus: API.OperationMethod<
  GetBulkDeploymentStatusRequest,
  GetBulkDeploymentStatusResponse,
  GetBulkDeploymentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBulkDeploymentStatusRequest,
  output: GetBulkDeploymentStatusResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBulkDeploymentStatus",
}));

export type GetConnectivityInfoError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the connectivity information for a core.
 */
export const getConnectivityInfo: API.OperationMethod<
  GetConnectivityInfoRequest,
  GetConnectivityInfoResponse,
  GetConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectivityInfoRequest,
  output: GetConnectivityInfoResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
}));

export type GetConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a connector definition.
 */
export const getConnectorDefinition: API.OperationMethod<
  GetConnectorDefinitionRequest,
  GetConnectorDefinitionResponse,
  GetConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectorDefinitionRequest,
  output: GetConnectorDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinition",
}));

export type GetConnectorDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a connector definition version, including the connectors that the version contains. Connectors are prebuilt modules that interact with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const getConnectorDefinitionVersion: API.OperationMethod<
  GetConnectorDefinitionVersionRequest,
  GetConnectorDefinitionVersionResponse,
  GetConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectorDefinitionVersionRequest,
  output: GetConnectorDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinitionVersion",
}));

export type GetCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a core definition version.
 */
export const getCoreDefinition: API.OperationMethod<
  GetCoreDefinitionRequest,
  GetCoreDefinitionResponse,
  GetCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCoreDefinitionRequest,
  output: GetCoreDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinition",
}));

export type GetCoreDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a core definition version.
 */
export const getCoreDefinitionVersion: API.OperationMethod<
  GetCoreDefinitionVersionRequest,
  GetCoreDefinitionVersionResponse,
  GetCoreDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCoreDefinitionVersionRequest,
  output: GetCoreDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinitionVersion",
}));

export type GetDeploymentStatusError = BadRequestException | CommonErrors;
/**
 * Returns the status of a deployment.
 */
export const getDeploymentStatus: API.OperationMethod<
  GetDeploymentStatusRequest,
  GetDeploymentStatusResponse,
  GetDeploymentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentStatusRequest,
  output: GetDeploymentStatusResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStatus",
}));

export type GetDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a device definition.
 */
export const getDeviceDefinition: API.OperationMethod<
  GetDeviceDefinitionRequest,
  GetDeviceDefinitionResponse,
  GetDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceDefinitionRequest,
  output: GetDeviceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinition",
}));

export type GetDeviceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a device definition version.
 */
export const getDeviceDefinitionVersion: API.OperationMethod<
  GetDeviceDefinitionVersionRequest,
  GetDeviceDefinitionVersionResponse,
  GetDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceDefinitionVersionRequest,
  output: GetDeviceDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinitionVersion",
}));

export type GetFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a Lambda function definition, including its creation time and latest version.
 */
export const getFunctionDefinition: API.OperationMethod<
  GetFunctionDefinitionRequest,
  GetFunctionDefinitionResponse,
  GetFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionDefinitionRequest,
  output: GetFunctionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinition",
}));

export type GetFunctionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a Lambda function definition version, including which Lambda functions are included in the version and their configurations.
 */
export const getFunctionDefinitionVersion: API.OperationMethod<
  GetFunctionDefinitionVersionRequest,
  GetFunctionDefinitionVersionResponse,
  GetFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionDefinitionVersionRequest,
  output: GetFunctionDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinitionVersion",
}));

export type GetGroupError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a group.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupRequest,
  output: GetGroupResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupCertificateAuthorityError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retreives the CA associated with a group. Returns the public key of the CA.
 */
export const getGroupCertificateAuthority: API.OperationMethod<
  GetGroupCertificateAuthorityRequest,
  GetGroupCertificateAuthorityResponse,
  GetGroupCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupCertificateAuthorityRequest,
  output: GetGroupCertificateAuthorityResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateAuthority",
}));

export type GetGroupCertificateConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the current configuration for the CA used by the group.
 */
export const getGroupCertificateConfiguration: API.OperationMethod<
  GetGroupCertificateConfigurationRequest,
  GetGroupCertificateConfigurationResponse,
  GetGroupCertificateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupCertificateConfigurationRequest,
  output: GetGroupCertificateConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateConfiguration",
}));

export type GetGroupVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a group version.
 */
export const getGroupVersion: API.OperationMethod<
  GetGroupVersionRequest,
  GetGroupVersionResponse,
  GetGroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupVersionRequest,
  output: GetGroupVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupVersion",
}));

export type GetLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a logger definition.
 */
export const getLoggerDefinition: API.OperationMethod<
  GetLoggerDefinitionRequest,
  GetLoggerDefinitionResponse,
  GetLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggerDefinitionRequest,
  output: GetLoggerDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinition",
}));

export type GetLoggerDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a logger definition version.
 */
export const getLoggerDefinitionVersion: API.OperationMethod<
  GetLoggerDefinitionVersionRequest,
  GetLoggerDefinitionVersionResponse,
  GetLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggerDefinitionVersionRequest,
  output: GetLoggerDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinitionVersion",
}));

export type GetResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a resource definition, including its creation time and latest version.
 */
export const getResourceDefinition: API.OperationMethod<
  GetResourceDefinitionRequest,
  GetResourceDefinitionResponse,
  GetResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceDefinitionRequest,
  output: GetResourceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinition",
}));

export type GetResourceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a resource definition version, including which resources are included in the version.
 */
export const getResourceDefinitionVersion: API.OperationMethod<
  GetResourceDefinitionVersionRequest,
  GetResourceDefinitionVersionResponse,
  GetResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceDefinitionVersionRequest,
  output: GetResourceDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinitionVersion",
}));

export type GetServiceRoleForAccountError =
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the service role that is attached to your account.
 */
export const getServiceRoleForAccount: API.OperationMethod<
  GetServiceRoleForAccountRequest,
  GetServiceRoleForAccountResponse,
  GetServiceRoleForAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceRoleForAccountRequest,
  output: GetServiceRoleForAccountResponse,
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
}));

export type GetSubscriptionDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a subscription definition.
 */
export const getSubscriptionDefinition: API.OperationMethod<
  GetSubscriptionDefinitionRequest,
  GetSubscriptionDefinitionResponse,
  GetSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionDefinitionRequest,
  output: GetSubscriptionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinition",
}));

export type GetSubscriptionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a subscription definition version.
 */
export const getSubscriptionDefinitionVersion: API.OperationMethod<
  GetSubscriptionDefinitionVersionRequest,
  GetSubscriptionDefinitionVersionResponse,
  GetSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionDefinitionVersionRequest,
  output: GetSubscriptionDefinitionVersionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinitionVersion",
}));

export type GetThingRuntimeConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Get the runtime configuration of a thing.
 */
export const getThingRuntimeConfiguration: API.OperationMethod<
  GetThingRuntimeConfigurationRequest,
  GetThingRuntimeConfigurationResponse,
  GetThingRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThingRuntimeConfigurationRequest,
  output: GetThingRuntimeConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingRuntimeConfiguration",
}));

export type ListBulkDeploymentDetailedReportsError =
  | BadRequestException
  | CommonErrors;
/**
 * Gets a paginated list of the deployments that have been started in a bulk deployment operation, and their current deployment status.
 */
export const listBulkDeploymentDetailedReports: API.OperationMethod<
  ListBulkDeploymentDetailedReportsRequest,
  ListBulkDeploymentDetailedReportsResponse,
  ListBulkDeploymentDetailedReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBulkDeploymentDetailedReportsRequest,
  output: ListBulkDeploymentDetailedReportsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeploymentDetailedReports",
}));

export type ListBulkDeploymentsError = BadRequestException | CommonErrors;
/**
 * Returns a list of bulk deployments.
 */
export const listBulkDeployments: API.OperationMethod<
  ListBulkDeploymentsRequest,
  ListBulkDeploymentsResponse,
  ListBulkDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBulkDeploymentsRequest,
  output: ListBulkDeploymentsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeployments",
}));

export type ListConnectorDefinitionsError = CommonErrors;
/**
 * Retrieves a list of connector definitions.
 */
export const listConnectorDefinitions: API.OperationMethod<
  ListConnectorDefinitionsRequest,
  ListConnectorDefinitionsResponse,
  ListConnectorDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConnectorDefinitionsRequest,
  output: ListConnectorDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitions",
}));

export type ListConnectorDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a connector definition, which are containers for connectors. Connectors run on the Greengrass core and contain built-in integration with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const listConnectorDefinitionVersions: API.OperationMethod<
  ListConnectorDefinitionVersionsRequest,
  ListConnectorDefinitionVersionsResponse,
  ListConnectorDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConnectorDefinitionVersionsRequest,
  output: ListConnectorDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitionVersions",
}));

export type ListCoreDefinitionsError = CommonErrors;
/**
 * Retrieves a list of core definitions.
 */
export const listCoreDefinitions: API.OperationMethod<
  ListCoreDefinitionsRequest,
  ListCoreDefinitionsResponse,
  ListCoreDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCoreDefinitionsRequest,
  output: ListCoreDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitions",
}));

export type ListCoreDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a core definition.
 */
export const listCoreDefinitionVersions: API.OperationMethod<
  ListCoreDefinitionVersionsRequest,
  ListCoreDefinitionVersionsResponse,
  ListCoreDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCoreDefinitionVersionsRequest,
  output: ListCoreDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitionVersions",
}));

export type ListDeploymentsError = BadRequestException | CommonErrors;
/**
 * Returns a history of deployments for the group.
 */
export const listDeployments: API.OperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
}));

export type ListDeviceDefinitionsError = CommonErrors;
/**
 * Retrieves a list of device definitions.
 */
export const listDeviceDefinitions: API.OperationMethod<
  ListDeviceDefinitionsRequest,
  ListDeviceDefinitionsResponse,
  ListDeviceDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDeviceDefinitionsRequest,
  output: ListDeviceDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitions",
}));

export type ListDeviceDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a device definition.
 */
export const listDeviceDefinitionVersions: API.OperationMethod<
  ListDeviceDefinitionVersionsRequest,
  ListDeviceDefinitionVersionsResponse,
  ListDeviceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDeviceDefinitionVersionsRequest,
  output: ListDeviceDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitionVersions",
}));

export type ListFunctionDefinitionsError = CommonErrors;
/**
 * Retrieves a list of Lambda function definitions.
 */
export const listFunctionDefinitions: API.OperationMethod<
  ListFunctionDefinitionsRequest,
  ListFunctionDefinitionsResponse,
  ListFunctionDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListFunctionDefinitionsRequest,
  output: ListFunctionDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitions",
}));

export type ListFunctionDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a Lambda function definition.
 */
export const listFunctionDefinitionVersions: API.OperationMethod<
  ListFunctionDefinitionVersionsRequest,
  ListFunctionDefinitionVersionsResponse,
  ListFunctionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListFunctionDefinitionVersionsRequest,
  output: ListFunctionDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitionVersions",
}));

export type ListGroupCertificateAuthoritiesError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the current CAs for a group.
 */
export const listGroupCertificateAuthorities: API.OperationMethod<
  ListGroupCertificateAuthoritiesRequest,
  ListGroupCertificateAuthoritiesResponse,
  ListGroupCertificateAuthoritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGroupCertificateAuthoritiesRequest,
  output: ListGroupCertificateAuthoritiesResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupCertificateAuthorities",
}));

export type ListGroupsError = CommonErrors;
/**
 * Retrieves a list of groups.
 */
export const listGroups: API.OperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
}));

export type ListGroupVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a group.
 */
export const listGroupVersions: API.OperationMethod<
  ListGroupVersionsRequest,
  ListGroupVersionsResponse,
  ListGroupVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGroupVersionsRequest,
  output: ListGroupVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupVersions",
}));

export type ListLoggerDefinitionsError = CommonErrors;
/**
 * Retrieves a list of logger definitions.
 */
export const listLoggerDefinitions: API.OperationMethod<
  ListLoggerDefinitionsRequest,
  ListLoggerDefinitionsResponse,
  ListLoggerDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLoggerDefinitionsRequest,
  output: ListLoggerDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitions",
}));

export type ListLoggerDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a logger definition.
 */
export const listLoggerDefinitionVersions: API.OperationMethod<
  ListLoggerDefinitionVersionsRequest,
  ListLoggerDefinitionVersionsResponse,
  ListLoggerDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLoggerDefinitionVersionsRequest,
  output: ListLoggerDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitionVersions",
}));

export type ListResourceDefinitionsError = CommonErrors;
/**
 * Retrieves a list of resource definitions.
 */
export const listResourceDefinitions: API.OperationMethod<
  ListResourceDefinitionsRequest,
  ListResourceDefinitionsResponse,
  ListResourceDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourceDefinitionsRequest,
  output: ListResourceDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitions",
}));

export type ListResourceDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a resource definition.
 */
export const listResourceDefinitionVersions: API.OperationMethod<
  ListResourceDefinitionVersionsRequest,
  ListResourceDefinitionVersionsResponse,
  ListResourceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourceDefinitionVersionsRequest,
  output: ListResourceDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitionVersions",
}));

export type ListSubscriptionDefinitionsError = CommonErrors;
/**
 * Retrieves a list of subscription definitions.
 */
export const listSubscriptionDefinitions: API.OperationMethod<
  ListSubscriptionDefinitionsRequest,
  ListSubscriptionDefinitionsResponse,
  ListSubscriptionDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSubscriptionDefinitionsRequest,
  output: ListSubscriptionDefinitionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitions",
}));

export type ListSubscriptionDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a subscription definition.
 */
export const listSubscriptionDefinitionVersions: API.OperationMethod<
  ListSubscriptionDefinitionVersionsRequest,
  ListSubscriptionDefinitionVersionsResponse,
  ListSubscriptionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSubscriptionDefinitionVersionsRequest,
  output: ListSubscriptionDefinitionVersionsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitionVersions",
}));

export type ListTagsForResourceError = BadRequestException | CommonErrors;
/**
 * Retrieves a list of resource tags for a resource arn.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ResetDeploymentsError = BadRequestException | CommonErrors;
/**
 * Resets a group's deployments.
 */
export const resetDeployments: API.OperationMethod<
  ResetDeploymentsRequest,
  ResetDeploymentsResponse,
  ResetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetDeploymentsRequest,
  output: ResetDeploymentsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDeployments",
}));

export type StartBulkDeploymentError = BadRequestException | CommonErrors;
/**
 * Deploys multiple groups in one operation. This action starts the bulk deployment of a specified set of group versions. Each group version deployment will be triggered with an adaptive rate that has a fixed upper limit. We recommend that you include an ''X-Amzn-Client-Token'' token in every ''StartBulkDeployment'' request. These requests are idempotent with respect to the token and the request parameters.
 */
export const startBulkDeployment: API.OperationMethod<
  StartBulkDeploymentRequest,
  StartBulkDeploymentResponse,
  StartBulkDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBulkDeploymentRequest,
  output: StartBulkDeploymentResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBulkDeployment",
}));

export type StopBulkDeploymentError = BadRequestException | CommonErrors;
/**
 * Stops the execution of a bulk deployment. This action returns a status of ''Stopping'' until the deployment is stopped. You cannot start a new bulk deployment while a previous deployment is in the ''Stopping'' state. This action doesn't rollback completed deployments or cancel pending deployments.
 */
export const stopBulkDeployment: API.OperationMethod<
  StopBulkDeploymentRequest,
  StopBulkDeploymentResponse,
  StopBulkDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBulkDeploymentRequest,
  output: StopBulkDeploymentResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBulkDeployment",
}));

export type TagResourceError = BadRequestException | CommonErrors;
/**
 * Adds tags to a Greengrass resource. Valid resources are 'Group', 'ConnectorDefinition', 'CoreDefinition', 'DeviceDefinition', 'FunctionDefinition', 'LoggerDefinition', 'SubscriptionDefinition', 'ResourceDefinition', and 'BulkDeployment'.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = BadRequestException | CommonErrors;
/**
 * Remove resource tags from a Greengrass Resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectivityInfoError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the connectivity information for the core. Any devices that belong to the group which has this core will receive this information in order to find the location of the core and connect to it.
 */
export const updateConnectivityInfo: API.OperationMethod<
  UpdateConnectivityInfoRequest,
  UpdateConnectivityInfoResponse,
  UpdateConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectivityInfoRequest,
  output: UpdateConnectivityInfoResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
}));

export type UpdateConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a connector definition.
 */
export const updateConnectorDefinition: API.OperationMethod<
  UpdateConnectorDefinitionRequest,
  UpdateConnectorDefinitionResponse,
  UpdateConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectorDefinitionRequest,
  output: UpdateConnectorDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorDefinition",
}));

export type UpdateCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a core definition.
 */
export const updateCoreDefinition: API.OperationMethod<
  UpdateCoreDefinitionRequest,
  UpdateCoreDefinitionResponse,
  UpdateCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCoreDefinitionRequest,
  output: UpdateCoreDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCoreDefinition",
}));

export type UpdateDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a device definition.
 */
export const updateDeviceDefinition: API.OperationMethod<
  UpdateDeviceDefinitionRequest,
  UpdateDeviceDefinitionResponse,
  UpdateDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeviceDefinitionRequest,
  output: UpdateDeviceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceDefinition",
}));

export type UpdateFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a Lambda function definition.
 */
export const updateFunctionDefinition: API.OperationMethod<
  UpdateFunctionDefinitionRequest,
  UpdateFunctionDefinitionResponse,
  UpdateFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionDefinitionRequest,
  output: UpdateFunctionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionDefinition",
}));

export type UpdateGroupError = BadRequestException | CommonErrors;
/**
 * Updates a group.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateGroupCertificateConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the Certificate expiry time for a group.
 */
export const updateGroupCertificateConfiguration: API.OperationMethod<
  UpdateGroupCertificateConfigurationRequest,
  UpdateGroupCertificateConfigurationResponse,
  UpdateGroupCertificateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupCertificateConfigurationRequest,
  output: UpdateGroupCertificateConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupCertificateConfiguration",
}));

export type UpdateLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a logger definition.
 */
export const updateLoggerDefinition: API.OperationMethod<
  UpdateLoggerDefinitionRequest,
  UpdateLoggerDefinitionResponse,
  UpdateLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLoggerDefinitionRequest,
  output: UpdateLoggerDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggerDefinition",
}));

export type UpdateResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a resource definition.
 */
export const updateResourceDefinition: API.OperationMethod<
  UpdateResourceDefinitionRequest,
  UpdateResourceDefinitionResponse,
  UpdateResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceDefinitionRequest,
  output: UpdateResourceDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDefinition",
}));

export type UpdateSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Updates a subscription definition.
 */
export const updateSubscriptionDefinition: API.OperationMethod<
  UpdateSubscriptionDefinitionRequest,
  UpdateSubscriptionDefinitionResponse,
  UpdateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionDefinitionRequest,
  output: UpdateSubscriptionDefinitionResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionDefinition",
}));

export type UpdateThingRuntimeConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the runtime configuration of a thing.
 */
export const updateThingRuntimeConfiguration: API.OperationMethod<
  UpdateThingRuntimeConfigurationRequest,
  UpdateThingRuntimeConfigurationResponse,
  UpdateThingRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingRuntimeConfigurationRequest,
  output: UpdateThingRuntimeConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingRuntimeConfiguration",
}));
