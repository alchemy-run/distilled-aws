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
  sdkId: "IoT Managed Integrations",
  serviceShapeName: "IotManagedIntegrations",
});
const auth = T.AwsAuthSigv4({ name: "iotmanagedintegrations" });
const ver = T.ServiceVersion("2025-03-03");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://api.iotmanagedintegrations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://api.iotmanagedintegrations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type ConnectorDestinationId = string;
export type AccountAssociationName = string;
export type AccountAssociationDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AuthMaterialName = string;
export interface GeneralAuthorizationName {
  AuthMaterialName?: string;
}
export const GeneralAuthorizationName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthMaterialName: S.optional(S.String) }),
).annotate({
  identifier: "GeneralAuthorizationName",
}) as any as S.Schema<GeneralAuthorizationName>;
export interface CreateAccountAssociationRequest {
  ClientToken?: string;
  ConnectorDestinationId: string;
  Name?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  GeneralAuthorization?: GeneralAuthorizationName;
}
export const CreateAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ConnectorDestinationId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagsMap),
    GeneralAuthorization: S.optional(GeneralAuthorizationName),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/account-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccountAssociationRequest",
}) as any as S.Schema<CreateAccountAssociationRequest>;
export type OAuthAuthorizationUrlOutput = string | redacted.Redacted<string>;
export type AccountAssociationId = string;
export type AssociationState =
  | "ASSOCIATION_IN_PROGRESS"
  | "ASSOCIATION_FAILED"
  | "ASSOCIATION_SUCCEEDED"
  | "ASSOCIATION_DELETING"
  | "REFRESH_TOKEN_EXPIRED"
  | (string & {});
export const AssociationState = S.String;

export type AccountAssociationArn = string;
export interface CreateAccountAssociationResponse {
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
  AccountAssociationId: string;
  AssociationState: AssociationState;
  Arn?: string;
}
export const CreateAccountAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OAuthAuthorizationUrl: SensitiveString,
    AccountAssociationId: S.String,
    AssociationState: AssociationState,
    Arn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAccountAssociationResponse",
}) as any as S.Schema<CreateAccountAssociationResponse>;
export type DisplayName = string;
export type LambdaArn = string;
export interface LambdaConfig {
  arn: string;
}
export const LambdaConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({ identifier: "LambdaConfig" }) as any as S.Schema<LambdaConfig>;
export interface EndpointConfig {
  lambda?: LambdaConfig;
}
export const EndpointConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambda: S.optional(LambdaConfig) }),
).annotate({ identifier: "EndpointConfig" }) as any as S.Schema<EndpointConfig>;
export type CloudConnectorDescription = string;
export type EndpointType = "LAMBDA" | (string & {});
export const EndpointType = S.String;

export interface CreateCloudConnectorRequest {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  ClientToken?: string;
}
export const CreateCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EndpointConfig: EndpointConfig,
    Description: S.optional(S.String),
    EndpointType: S.optional(EndpointType),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cloud-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCloudConnectorRequest",
}) as any as S.Schema<CreateCloudConnectorRequest>;
export type CloudConnectorId = string;
export interface CreateCloudConnectorResponse {
  Id?: string;
}
export const CreateCloudConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "CreateCloudConnectorResponse",
}) as any as S.Schema<CreateCloudConnectorResponse>;
export type ConnectorDestinationName = string;
export type ConnectorDestinationDescription = string;
export type AuthType = "OAUTH" | (string & {});
export const AuthType = S.String;

export type AuthUrl = string;
export type TokenUrl = string;
export type TokenEndpointAuthenticationScheme =
  | "HTTP_BASIC"
  | "REQUEST_BODY_CREDENTIALS"
  | (string & {});
export const TokenEndpointAuthenticationScheme = S.String;

export interface ProactiveRefreshTokenRenewal {
  enabled?: boolean;
  DaysBeforeRenewal?: number;
}
export const ProactiveRefreshTokenRenewal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    DaysBeforeRenewal: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProactiveRefreshTokenRenewal",
}) as any as S.Schema<ProactiveRefreshTokenRenewal>;
export interface OAuthConfig {
  authUrl: string;
  tokenUrl: string;
  scope?: string;
  tokenEndpointAuthenticationScheme: TokenEndpointAuthenticationScheme;
  oAuthCompleteRedirectUrl?: string;
  proactiveRefreshTokenRenewal?: ProactiveRefreshTokenRenewal;
}
export const OAuthConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authUrl: S.String,
    tokenUrl: S.String,
    scope: S.optional(S.String),
    tokenEndpointAuthenticationScheme: TokenEndpointAuthenticationScheme,
    oAuthCompleteRedirectUrl: S.optional(S.String),
    proactiveRefreshTokenRenewal: S.optional(ProactiveRefreshTokenRenewal),
  }),
).annotate({ identifier: "OAuthConfig" }) as any as S.Schema<OAuthConfig>;
export type SecretsManagerArn = string;
export type SecretsManagerVersionId = string;
export interface SecretsManager {
  arn: string;
  versionId: string;
}
export const SecretsManager = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, versionId: S.String }),
).annotate({ identifier: "SecretsManager" }) as any as S.Schema<SecretsManager>;
export interface AuthMaterial {
  SecretsManager: SecretsManager;
  AuthMaterialName: string;
}
export const AuthMaterial = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretsManager: SecretsManager, AuthMaterialName: S.String }),
).annotate({ identifier: "AuthMaterial" }) as any as S.Schema<AuthMaterial>;
export type AuthMaterials = AuthMaterial[];
export const AuthMaterials = /*@__PURE__*/ S.Array(AuthMaterial);
export interface AuthConfig {
  oAuth?: OAuthConfig;
  GeneralAuthorization?: AuthMaterial[];
}
export const AuthConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oAuth: S.optional(OAuthConfig),
    GeneralAuthorization: S.optional(AuthMaterials),
  }),
).annotate({ identifier: "AuthConfig" }) as any as S.Schema<AuthConfig>;
export interface CreateConnectorDestinationRequest {
  Name?: string;
  Description?: string;
  CloudConnectorId: string;
  AuthType?: AuthType;
  AuthConfig: AuthConfig;
  SecretsManager?: SecretsManager;
  ClientToken?: string;
}
export const CreateConnectorDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CloudConnectorId: S.String,
    AuthType: S.optional(AuthType),
    AuthConfig: AuthConfig,
    SecretsManager: S.optional(SecretsManager),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connector-destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorDestinationRequest",
}) as any as S.Schema<CreateConnectorDestinationRequest>;
export interface CreateConnectorDestinationResponse {
  Id?: string;
}
export const CreateConnectorDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "CreateConnectorDestinationResponse",
}) as any as S.Schema<CreateConnectorDestinationResponse>;
export type CredentialLockerName = string | redacted.Redacted<string>;
export interface CreateCredentialLockerRequest {
  Name?: string | redacted.Redacted<string>;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCredentialLockerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/credential-lockers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCredentialLockerRequest",
}) as any as S.Schema<CreateCredentialLockerRequest>;
export type CredentialLockerId = string;
export type CredentialLockerArn = string;
export type CredentialLockerCreatedAt = Date;
export interface CreateCredentialLockerResponse {
  Id?: string;
  Arn?: string;
  CreatedAt?: Date;
}
export const CreateCredentialLockerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateCredentialLockerResponse",
}) as any as S.Schema<CreateCredentialLockerResponse>;
export type DeliveryDestinationArn = string;
export type DeliveryDestinationType = "KINESIS" | (string & {});
export const DeliveryDestinationType = S.String;

export type DestinationName = string;
export type DeliveryDestinationRoleArn = string;
export type DestinationDescription = string;
export interface CreateDestinationRequest {
  DeliveryDestinationArn: string;
  DeliveryDestinationType: DeliveryDestinationType;
  Name: string;
  RoleArn: string;
  ClientToken?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryDestinationArn: S.String,
    DeliveryDestinationType: DeliveryDestinationType,
    Name: S.String,
    RoleArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDestinationRequest",
}) as any as S.Schema<CreateDestinationRequest>;
export interface CreateDestinationResponse {
  Name?: string;
}
export const CreateDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateDestinationResponse",
}) as any as S.Schema<CreateDestinationResponse>;
export type SmartHomeResourceType = string;
export type SmartHomeResourceId = string;
export type LogLevel = "DEBUG" | "ERROR" | "INFO" | "WARN" | (string & {});
export const LogLevel = S.String;

export interface CreateEventLogConfigurationRequest {
  ResourceType: string;
  ResourceId?: string;
  EventLogLevel: LogLevel;
  ClientToken?: string;
}
export const CreateEventLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.String,
    ResourceId: S.optional(S.String),
    EventLogLevel: LogLevel,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/event-log-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventLogConfigurationRequest",
}) as any as S.Schema<CreateEventLogConfigurationRequest>;
export type LogConfigurationId = string;
export interface CreateEventLogConfigurationResponse {
  Id?: string;
}
export const CreateEventLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "CreateEventLogConfigurationResponse",
}) as any as S.Schema<CreateEventLogConfigurationResponse>;
export type Role = "CONTROLLER" | "DEVICE" | (string & {});
export const Role = S.String;

export type Owner = string | redacted.Redacted<string>;
export type AuthMaterialString = string | redacted.Redacted<string>;
export type AuthMaterialType =
  | "CUSTOM_PROTOCOL_QR_BAR_CODE"
  | "WIFI_SETUP_QR_BAR_CODE"
  | "ZWAVE_QR_BAR_CODE"
  | "ZIGBEE_QR_BAR_CODE"
  | "DISCOVERED_DEVICE"
  | "PRE_ONBOARDED_CLOUD"
  | (string & {});
export const AuthMaterialType = S.String;

export type EnableAsProvisioner = boolean;
export type EnableAsProvisionee = boolean;
export type TimeoutInMinutes = number;
export interface WiFiSimpleSetupConfiguration {
  EnableAsProvisioner?: boolean;
  EnableAsProvisionee?: boolean;
  TimeoutInMinutes?: number;
}
export const WiFiSimpleSetupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableAsProvisioner: S.optional(S.Boolean),
    EnableAsProvisionee: S.optional(S.Boolean),
    TimeoutInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "WiFiSimpleSetupConfiguration",
}) as any as S.Schema<WiFiSimpleSetupConfiguration>;
export type SerialNumber = string | redacted.Redacted<string>;
export type Brand = string | redacted.Redacted<string>;
export type Model = string | redacted.Redacted<string>;
export type Name = string;
export type CapabilityReportVersion = string;
export type NodeId = string;
export type EndpointId = string;
export type DeviceType = string;
export type DeviceTypes = string[];
export const DeviceTypes = /*@__PURE__*/ S.Array(S.String);
export type SchemaVersionedId = string;
export type CapabilityName = string;
export type CapabilityVersion = string;
export type PropertyName = string;
export type CapabilityReportProperties = string[];
export const CapabilityReportProperties = /*@__PURE__*/ S.Array(S.String);
export type ActionName = string;
export type CapabilityReportActions = string[];
export const CapabilityReportActions = /*@__PURE__*/ S.Array(S.String);
export type EventName = string;
export type CapabilityReportEvents = string[];
export const CapabilityReportEvents = /*@__PURE__*/ S.Array(S.String);
export interface CapabilityReportCapability {
  id: string;
  name: string;
  version: string;
  properties: string[];
  actions: string[];
  events: string[];
}
export const CapabilityReportCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    version: S.String,
    properties: CapabilityReportProperties,
    actions: CapabilityReportActions,
    events: CapabilityReportEvents,
  }),
).annotate({
  identifier: "CapabilityReportCapability",
}) as any as S.Schema<CapabilityReportCapability>;
export type CapabilityReportCapabilities = CapabilityReportCapability[];
export const CapabilityReportCapabilities = /*@__PURE__*/ S.Array(
  CapabilityReportCapability,
);
export interface CapabilityReportEndpoint {
  id: string;
  deviceTypes: string[];
  capabilities: CapabilityReportCapability[];
}
export const CapabilityReportEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    deviceTypes: DeviceTypes,
    capabilities: CapabilityReportCapabilities,
  }),
).annotate({
  identifier: "CapabilityReportEndpoint",
}) as any as S.Schema<CapabilityReportEndpoint>;
export type CapabilityReportEndpoints = CapabilityReportEndpoint[];
export const CapabilityReportEndpoints = /*@__PURE__*/ S.Array(
  CapabilityReportEndpoint,
);
export interface CapabilityReport {
  version: string;
  nodeId?: string;
  endpoints: CapabilityReportEndpoint[];
}
export const CapabilityReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    nodeId: S.optional(S.String),
    endpoints: CapabilityReportEndpoints,
  }),
).annotate({
  identifier: "CapabilityReport",
}) as any as S.Schema<CapabilityReport>;
export type SchemaVersionFormat = "AWS" | "ZCL" | "CONNECTOR" | (string & {});
export const SchemaVersionFormat = S.String;

export type ExtrinsicSchemaId = string;
export type MatterCapabilityReportClusterRevisionId = number;
export type ValidationSchema = unknown;
export interface CapabilitySchemaItem {
  Format: SchemaVersionFormat;
  CapabilityId: string;
  ExtrinsicId: string;
  ExtrinsicVersion: number;
  Schema: any;
}
export const CapabilitySchemaItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: SchemaVersionFormat,
    CapabilityId: S.String,
    ExtrinsicId: S.String,
    ExtrinsicVersion: S.Number,
    Schema: S.Any,
  }),
).annotate({
  identifier: "CapabilitySchemaItem",
}) as any as S.Schema<CapabilitySchemaItem>;
export type CapabilitySchemas = CapabilitySchemaItem[];
export const CapabilitySchemas = /*@__PURE__*/ S.Array(CapabilitySchemaItem);
export type Capabilities = string;
export type Classification = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type MetaData = { [key: string]: string | undefined };
export const MetaData = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateManagedThingRequest {
  Role: Role;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  AuthenticationMaterial: string | redacted.Redacted<string>;
  AuthenticationMaterialType: AuthMaterialType;
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
  SerialNumber?: string | redacted.Redacted<string>;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  CapabilityReport?: CapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  Capabilities?: string;
  ClientToken?: string;
  Classification?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
  MetaData?: { [key: string]: string | undefined };
}
export const CreateManagedThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Role: Role,
    Owner: S.optional(SensitiveString),
    CredentialLockerId: S.optional(S.String),
    AuthenticationMaterial: SensitiveString,
    AuthenticationMaterialType: AuthMaterialType,
    WiFiSimpleSetupConfiguration: S.optional(WiFiSimpleSetupConfiguration),
    SerialNumber: S.optional(SensitiveString),
    Brand: S.optional(SensitiveString),
    Model: S.optional(SensitiveString),
    Name: S.optional(S.String),
    CapabilityReport: S.optional(CapabilityReport),
    CapabilitySchemas: S.optional(CapabilitySchemas),
    Capabilities: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Classification: S.optional(SensitiveString),
    Tags: S.optional(TagsMap),
    MetaData: S.optional(MetaData),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/managed-things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateManagedThingRequest",
}) as any as S.Schema<CreateManagedThingRequest>;
export type ManagedThingId = string;
export type ManagedThingArn = string;
export type CreatedAt = Date;
export interface CreateManagedThingResponse {
  Id?: string;
  Arn?: string;
  CreatedAt?: Date;
}
export const CreateManagedThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateManagedThingResponse",
}) as any as S.Schema<CreateManagedThingResponse>;
export type EventType =
  | "DEVICE_COMMAND"
  | "DEVICE_COMMAND_REQUEST"
  | "DEVICE_DISCOVERY_STATUS"
  | "DEVICE_EVENT"
  | "DEVICE_LIFE_CYCLE"
  | "DEVICE_STATE"
  | "DEVICE_OTA"
  | "DEVICE_WSS"
  | "CONNECTOR_ASSOCIATION"
  | "ACCOUNT_ASSOCIATION"
  | "CONNECTOR_ERROR_REPORT"
  | (string & {});
export const EventType = S.String;

export interface CreateNotificationConfigurationRequest {
  EventType: EventType;
  DestinationName: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNotificationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventType: EventType,
      DestinationName: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      Tags: S.optional(TagsMap),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/notification-configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNotificationConfigurationRequest",
}) as any as S.Schema<CreateNotificationConfigurationRequest>;
export interface CreateNotificationConfigurationResponse {
  EventType?: EventType;
}
export const CreateNotificationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ EventType: S.optional(EventType) }),
).annotate({
  identifier: "CreateNotificationConfigurationResponse",
}) as any as S.Schema<CreateNotificationConfigurationResponse>;
export type OtaDescription = string;
export type S3Url = string;
export type OtaProtocol = "HTTP" | (string & {});
export const OtaProtocol = S.String;

export type Target = string[];
export const Target = /*@__PURE__*/ S.Array(S.String);
export type OtaTaskConfigurationId = string;
export type OtaMechanism = "PUSH" | (string & {});
export const OtaMechanism = S.String;

export type OtaType = "ONE_TIME" | "CONTINUOUS" | (string & {});
export const OtaType = S.String;

export type OtaTargetQueryString = string;
export type SchedulingConfigEndBehavior =
  | "STOP_ROLLOUT"
  | "CANCEL"
  | "FORCE_CANCEL"
  | (string & {});
export const SchedulingConfigEndBehavior = S.String;

export type EndTime = string;
export type DurationInMinutes = number;
export type StartTime = string;
export interface ScheduleMaintenanceWindow {
  DurationInMinutes?: number;
  StartTime?: string;
}
export const ScheduleMaintenanceWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurationInMinutes: S.optional(S.Number),
    StartTime: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduleMaintenanceWindow",
}) as any as S.Schema<ScheduleMaintenanceWindow>;
export type ScheduleMaintenanceWindowList = ScheduleMaintenanceWindow[];
export const ScheduleMaintenanceWindowList = /*@__PURE__*/ S.Array(
  ScheduleMaintenanceWindow,
);
export type ScheduleStartTime = string;
export interface OtaTaskSchedulingConfig {
  EndBehavior?: SchedulingConfigEndBehavior;
  EndTime?: string;
  MaintenanceWindows?: ScheduleMaintenanceWindow[];
  StartTime?: string;
}
export const OtaTaskSchedulingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndBehavior: S.optional(SchedulingConfigEndBehavior),
    EndTime: S.optional(S.String),
    MaintenanceWindows: S.optional(ScheduleMaintenanceWindowList),
    StartTime: S.optional(S.String),
  }),
).annotate({
  identifier: "OtaTaskSchedulingConfig",
}) as any as S.Schema<OtaTaskSchedulingConfig>;
export type RetryCriteriaFailureType =
  | "FAILED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const RetryCriteriaFailureType = S.String;

export type MinNumberOfRetries = number;
export interface RetryConfigCriteria {
  FailureType?: RetryCriteriaFailureType;
  MinNumberOfRetries?: number;
}
export const RetryConfigCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailureType: S.optional(RetryCriteriaFailureType),
    MinNumberOfRetries: S.optional(S.Number),
  }),
).annotate({
  identifier: "RetryConfigCriteria",
}) as any as S.Schema<RetryConfigCriteria>;
export type RetryConfigCriteriaList = RetryConfigCriteria[];
export const RetryConfigCriteriaList =
  /*@__PURE__*/ S.Array(RetryConfigCriteria);
export interface OtaTaskExecutionRetryConfig {
  RetryConfigCriteria?: RetryConfigCriteria[];
}
export const OtaTaskExecutionRetryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetryConfigCriteria: S.optional(RetryConfigCriteriaList) }),
).annotate({
  identifier: "OtaTaskExecutionRetryConfig",
}) as any as S.Schema<OtaTaskExecutionRetryConfig>;
export interface CreateOtaTaskRequest {
  Description?: string;
  S3Url: string;
  Protocol?: OtaProtocol;
  Target?: string[];
  TaskConfigurationId?: string;
  OtaMechanism?: OtaMechanism;
  OtaType: OtaType;
  OtaTargetQueryString?: string;
  ClientToken?: string;
  OtaSchedulingConfig?: OtaTaskSchedulingConfig;
  OtaTaskExecutionRetryConfig?: OtaTaskExecutionRetryConfig;
  Tags?: { [key: string]: string | undefined };
}
export const CreateOtaTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    S3Url: S.String,
    Protocol: S.optional(OtaProtocol),
    Target: S.optional(Target),
    TaskConfigurationId: S.optional(S.String),
    OtaMechanism: S.optional(OtaMechanism),
    OtaType: OtaType,
    OtaTargetQueryString: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    OtaSchedulingConfig: S.optional(OtaTaskSchedulingConfig),
    OtaTaskExecutionRetryConfig: S.optional(OtaTaskExecutionRetryConfig),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ota-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOtaTaskRequest",
}) as any as S.Schema<CreateOtaTaskRequest>;
export type OtaTaskId = string;
export type OtaTaskArn = string;
export interface CreateOtaTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  Description?: string;
}
export const CreateOtaTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.optional(S.String),
    TaskArn: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateOtaTaskResponse",
}) as any as S.Schema<CreateOtaTaskResponse>;
export type OtaTaskConfigurationName = string | redacted.Redacted<string>;
export type AbortCriteriaAction = "CANCEL" | (string & {});
export const AbortCriteriaAction = S.String;

export type AbortCriteriaFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const AbortCriteriaFailureType = S.String;

export type MinNumberOfExecutedThings = number;
export type ThresholdPercentage = number;
export interface AbortConfigCriteria {
  Action?: AbortCriteriaAction;
  FailureType?: AbortCriteriaFailureType;
  MinNumberOfExecutedThings?: number;
  ThresholdPercentage?: number;
}
export const AbortConfigCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(AbortCriteriaAction),
    FailureType: S.optional(AbortCriteriaFailureType),
    MinNumberOfExecutedThings: S.optional(S.Number),
    ThresholdPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "AbortConfigCriteria",
}) as any as S.Schema<AbortConfigCriteria>;
export type AbortConfigCriteriaList = AbortConfigCriteria[];
export const AbortConfigCriteriaList =
  /*@__PURE__*/ S.Array(AbortConfigCriteria);
export interface OtaTaskAbortConfig {
  AbortConfigCriteriaList?: AbortConfigCriteria[];
}
export const OtaTaskAbortConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AbortConfigCriteriaList: S.optional(AbortConfigCriteriaList) }),
).annotate({
  identifier: "OtaTaskAbortConfig",
}) as any as S.Schema<OtaTaskAbortConfig>;
export type BaseRatePerMinute = number;
export type IncrementFactor = number;
export type NumberOfNotifiedThings = number;
export type NumberOfSucceededThings = number;
export interface RolloutRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export const RolloutRateIncreaseCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfNotifiedThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
  }),
).annotate({
  identifier: "RolloutRateIncreaseCriteria",
}) as any as S.Schema<RolloutRateIncreaseCriteria>;
export interface ExponentialRolloutRate {
  BaseRatePerMinute?: number;
  IncrementFactor?: number;
  RateIncreaseCriteria?: RolloutRateIncreaseCriteria;
}
export const ExponentialRolloutRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaseRatePerMinute: S.optional(S.Number),
    IncrementFactor: S.optional(S.Number),
    RateIncreaseCriteria: S.optional(RolloutRateIncreaseCriteria),
  }),
).annotate({
  identifier: "ExponentialRolloutRate",
}) as any as S.Schema<ExponentialRolloutRate>;
export type MaximumPerMinute = number;
export interface OtaTaskExecutionRolloutConfig {
  ExponentialRolloutRate?: ExponentialRolloutRate;
  MaximumPerMinute?: number;
}
export const OtaTaskExecutionRolloutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExponentialRolloutRate: S.optional(ExponentialRolloutRate),
    MaximumPerMinute: S.optional(S.Number),
  }),
).annotate({
  identifier: "OtaTaskExecutionRolloutConfig",
}) as any as S.Schema<OtaTaskExecutionRolloutConfig>;
export type InProgressTimeoutInMinutes = number;
export interface OtaTaskTimeoutConfig {
  InProgressTimeoutInMinutes?: number;
}
export const OtaTaskTimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InProgressTimeoutInMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "OtaTaskTimeoutConfig",
}) as any as S.Schema<OtaTaskTimeoutConfig>;
export interface PushConfig {
  AbortConfig?: OtaTaskAbortConfig;
  RolloutConfig?: OtaTaskExecutionRolloutConfig;
  TimeoutConfig?: OtaTaskTimeoutConfig;
}
export const PushConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AbortConfig: S.optional(OtaTaskAbortConfig),
    RolloutConfig: S.optional(OtaTaskExecutionRolloutConfig),
    TimeoutConfig: S.optional(OtaTaskTimeoutConfig),
  }),
).annotate({ identifier: "PushConfig" }) as any as S.Schema<PushConfig>;
export interface CreateOtaTaskConfigurationRequest {
  Description?: string;
  Name?: string | redacted.Redacted<string>;
  PushConfig?: PushConfig;
  ClientToken?: string;
}
export const CreateOtaTaskConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Name: S.optional(SensitiveString),
    PushConfig: S.optional(PushConfig),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ota-task-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOtaTaskConfigurationRequest",
}) as any as S.Schema<CreateOtaTaskConfigurationRequest>;
export interface CreateOtaTaskConfigurationResponse {
  TaskConfigurationId?: string;
}
export const CreateOtaTaskConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskConfigurationId: S.optional(S.String) }),
).annotate({
  identifier: "CreateOtaTaskConfigurationResponse",
}) as any as S.Schema<CreateOtaTaskConfigurationResponse>;
export type ProvisioningType = "FLEET_PROVISIONING" | "JITR" | (string & {});
export const ProvisioningType = S.String;

export type CaCertificate = string | redacted.Redacted<string>;
export type ClaimCertificate = string | redacted.Redacted<string>;
export type ProvisioningProfileName = string;
export interface CreateProvisioningProfileRequest {
  ProvisioningType: ProvisioningType;
  CaCertificate?: string | redacted.Redacted<string>;
  ClaimCertificate?: string | redacted.Redacted<string>;
  Name?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProvisioningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisioningType: ProvisioningType,
    CaCertificate: S.optional(SensitiveString),
    ClaimCertificate: S.optional(SensitiveString),
    Name: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/provisioning-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProvisioningProfileRequest",
}) as any as S.Schema<CreateProvisioningProfileRequest>;
export type ProvisioningProfileArn = string;
export type ProvisioningProfileId = string;
export type ProvisioningProfileStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const ProvisioningProfileStatus = S.String;

export type ClaimCertificatePrivateKey = string | redacted.Redacted<string>;
export interface CreateProvisioningProfileResponse {
  Arn?: string;
  Name?: string;
  ProvisioningType?: ProvisioningType;
  Id?: string;
  Status?: ProvisioningProfileStatus;
  ClaimCertificate?: string | redacted.Redacted<string>;
  ClaimCertificatePrivateKey?: string | redacted.Redacted<string>;
}
export const CreateProvisioningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    ProvisioningType: S.optional(ProvisioningType),
    Id: S.optional(S.String),
    Status: S.optional(ProvisioningProfileStatus),
    ClaimCertificate: S.optional(SensitiveString),
    ClaimCertificatePrivateKey: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CreateProvisioningProfileResponse",
}) as any as S.Schema<CreateProvisioningProfileResponse>;
export interface DeleteAccountAssociationRequest {
  AccountAssociationId: string;
}
export const DeleteAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/account-associations/{AccountAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccountAssociationRequest",
}) as any as S.Schema<DeleteAccountAssociationRequest>;
export interface DeleteAccountAssociationResponse {}
export const DeleteAccountAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccountAssociationResponse",
}) as any as S.Schema<DeleteAccountAssociationResponse>;
export interface DeleteCloudConnectorRequest {
  Identifier: string;
}
export const DeleteCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cloud-connectors/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCloudConnectorRequest",
}) as any as S.Schema<DeleteCloudConnectorRequest>;
export interface DeleteCloudConnectorResponse {}
export const DeleteCloudConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCloudConnectorResponse",
}) as any as S.Schema<DeleteCloudConnectorResponse>;
export interface DeleteConnectorDestinationRequest {
  Identifier: string;
}
export const DeleteConnectorDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/connector-destinations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorDestinationRequest",
}) as any as S.Schema<DeleteConnectorDestinationRequest>;
export interface DeleteConnectorDestinationResponse {}
export const DeleteConnectorDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectorDestinationResponse",
}) as any as S.Schema<DeleteConnectorDestinationResponse>;
export interface DeleteCredentialLockerRequest {
  Identifier: string;
}
export const DeleteCredentialLockerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/credential-lockers/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCredentialLockerRequest",
}) as any as S.Schema<DeleteCredentialLockerRequest>;
export interface DeleteCredentialLockerResponse {}
export const DeleteCredentialLockerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCredentialLockerResponse",
}) as any as S.Schema<DeleteCredentialLockerResponse>;
export interface DeleteDestinationRequest {
  Name: string;
}
export const DeleteDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/destinations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDestinationRequest",
}) as any as S.Schema<DeleteDestinationRequest>;
export interface DeleteDestinationResponse {}
export const DeleteDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDestinationResponse",
}) as any as S.Schema<DeleteDestinationResponse>;
export interface DeleteEventLogConfigurationRequest {
  Id: string;
}
export const DeleteEventLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/event-log-configurations/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventLogConfigurationRequest",
}) as any as S.Schema<DeleteEventLogConfigurationRequest>;
export interface DeleteEventLogConfigurationResponse {}
export const DeleteEventLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEventLogConfigurationResponse",
}) as any as S.Schema<DeleteEventLogConfigurationResponse>;
export interface DeleteManagedThingRequest {
  Identifier: string;
  Force?: boolean;
}
export const DeleteManagedThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Force: S.optional(S.Boolean).pipe(T.HttpQuery("Force")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/managed-things/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteManagedThingRequest",
}) as any as S.Schema<DeleteManagedThingRequest>;
export interface DeleteManagedThingResponse {}
export const DeleteManagedThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteManagedThingResponse",
}) as any as S.Schema<DeleteManagedThingResponse>;
export interface DeleteNotificationConfigurationRequest {
  EventType: EventType;
}
export const DeleteNotificationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ EventType: EventType.pipe(T.HttpLabel("EventType")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/notification-configurations/{EventType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteNotificationConfigurationRequest",
}) as any as S.Schema<DeleteNotificationConfigurationRequest>;
export interface DeleteNotificationConfigurationResponse {}
export const DeleteNotificationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteNotificationConfigurationResponse",
}) as any as S.Schema<DeleteNotificationConfigurationResponse>;
export interface DeleteOtaTaskRequest {
  Identifier: string;
}
export const DeleteOtaTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/ota-tasks/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOtaTaskRequest",
}) as any as S.Schema<DeleteOtaTaskRequest>;
export interface DeleteOtaTaskResponse {}
export const DeleteOtaTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOtaTaskResponse",
}) as any as S.Schema<DeleteOtaTaskResponse>;
export interface DeleteOtaTaskConfigurationRequest {
  Identifier: string;
}
export const DeleteOtaTaskConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/ota-task-configurations/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOtaTaskConfigurationRequest",
}) as any as S.Schema<DeleteOtaTaskConfigurationRequest>;
export interface DeleteOtaTaskConfigurationResponse {}
export const DeleteOtaTaskConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOtaTaskConfigurationResponse",
}) as any as S.Schema<DeleteOtaTaskConfigurationResponse>;
export interface DeleteProvisioningProfileRequest {
  Identifier: string;
}
export const DeleteProvisioningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/provisioning-profiles/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProvisioningProfileRequest",
}) as any as S.Schema<DeleteProvisioningProfileRequest>;
export interface DeleteProvisioningProfileResponse {}
export const DeleteProvisioningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProvisioningProfileResponse",
}) as any as S.Schema<DeleteProvisioningProfileResponse>;
export interface DeregisterAccountAssociationRequest {
  ManagedThingId: string;
  AccountAssociationId: string;
}
export const DeregisterAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedThingId: S.String, AccountAssociationId: S.String }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/managed-thing-associations/deregister" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterAccountAssociationRequest",
}) as any as S.Schema<DeregisterAccountAssociationRequest>;
export interface DeregisterAccountAssociationResponse {}
export const DeregisterAccountAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeregisterAccountAssociationResponse",
}) as any as S.Schema<DeregisterAccountAssociationResponse>;
export interface GetAccountAssociationRequest {
  AccountAssociationId: string;
}
export const GetAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/account-associations/{AccountAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountAssociationRequest",
}) as any as S.Schema<GetAccountAssociationRequest>;
export type AccountAssociationErrorMessage = string;
export interface GetAccountAssociationResponse {
  AccountAssociationId: string;
  AssociationState: AssociationState;
  ErrorMessage?: string;
  ConnectorDestinationId?: string;
  Name?: string;
  Description?: string;
  Arn?: string;
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
  GeneralAuthorization?: GeneralAuthorizationName;
}
export const GetAccountAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.String,
    AssociationState: AssociationState,
    ErrorMessage: S.optional(S.String),
    ConnectorDestinationId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Arn: S.optional(S.String),
    OAuthAuthorizationUrl: SensitiveString,
    Tags: S.optional(TagsMap),
    GeneralAuthorization: S.optional(GeneralAuthorizationName),
  }),
).annotate({
  identifier: "GetAccountAssociationResponse",
}) as any as S.Schema<GetAccountAssociationResponse>;
export interface GetCloudConnectorRequest {
  Identifier: string;
}
export const GetCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cloud-connectors/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCloudConnectorRequest",
}) as any as S.Schema<GetCloudConnectorRequest>;
export type CloudConnectorType = "LISTED" | "UNLISTED" | (string & {});
export const CloudConnectorType = S.String;

export interface GetCloudConnectorResponse {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  Id?: string;
  Type?: CloudConnectorType;
}
export const GetCloudConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EndpointConfig: EndpointConfig,
    Description: S.optional(S.String),
    EndpointType: S.optional(EndpointType),
    Id: S.optional(S.String),
    Type: S.optional(CloudConnectorType),
  }),
).annotate({
  identifier: "GetCloudConnectorResponse",
}) as any as S.Schema<GetCloudConnectorResponse>;
export interface GetConnectorDestinationRequest {
  Identifier: string;
}
export const GetConnectorDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connector-destinations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectorDestinationRequest",
}) as any as S.Schema<GetConnectorDestinationRequest>;
export type OAuthCompleteRedirectUrl = string;
export interface GetConnectorDestinationResponse {
  Name?: string;
  Description?: string;
  CloudConnectorId?: string;
  Id?: string;
  AuthType?: AuthType;
  AuthConfig?: AuthConfig;
  SecretsManager?: SecretsManager;
  OAuthCompleteRedirectUrl?: string;
}
export const GetConnectorDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CloudConnectorId: S.optional(S.String),
    Id: S.optional(S.String),
    AuthType: S.optional(AuthType),
    AuthConfig: S.optional(AuthConfig),
    SecretsManager: S.optional(SecretsManager),
    OAuthCompleteRedirectUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConnectorDestinationResponse",
}) as any as S.Schema<GetConnectorDestinationResponse>;
export interface GetCredentialLockerRequest {
  Identifier: string;
}
export const GetCredentialLockerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/credential-lockers/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCredentialLockerRequest",
}) as any as S.Schema<GetCredentialLockerRequest>;
export interface GetCredentialLockerResponse {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetCredentialLockerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetCredentialLockerResponse",
}) as any as S.Schema<GetCredentialLockerResponse>;
export interface GetCustomEndpointRequest {}
export const GetCustomEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-endpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomEndpointRequest",
}) as any as S.Schema<GetCustomEndpointRequest>;
export type EndpointAddress = string;
export interface GetCustomEndpointResponse {
  EndpointAddress: string;
}
export const GetCustomEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointAddress: S.String }),
).annotate({
  identifier: "GetCustomEndpointResponse",
}) as any as S.Schema<GetCustomEndpointResponse>;
export interface GetDefaultEncryptionConfigurationRequest {}
export const GetDefaultEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/configuration/account/encryption" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDefaultEncryptionConfigurationRequest",
}) as any as S.Schema<GetDefaultEncryptionConfigurationRequest>;
export type ConfigurationErrorCode = string;
export type ConfigurationErrorMessage = string;
export interface ConfigurationError {
  code?: string;
  message?: string;
}
export const ConfigurationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({
  identifier: "ConfigurationError",
}) as any as S.Schema<ConfigurationError>;
export type ConfigurationState =
  | "ENABLED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export const ConfigurationState = S.String;

export interface ConfigurationStatus {
  error?: ConfigurationError;
  state: ConfigurationState;
}
export const ConfigurationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(ConfigurationError),
    state: ConfigurationState,
  }),
).annotate({
  identifier: "ConfigurationStatus",
}) as any as S.Schema<ConfigurationStatus>;
export type EncryptionType =
  | "MANAGED_INTEGRATIONS_DEFAULT_ENCRYPTION"
  | "CUSTOMER_KEY_ENCRYPTION"
  | (string & {});
export const EncryptionType = S.String;

export type KmsKeyArn = string;
export interface GetDefaultEncryptionConfigurationResponse {
  configurationStatus: ConfigurationStatus;
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export const GetDefaultEncryptionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configurationStatus: ConfigurationStatus,
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetDefaultEncryptionConfigurationResponse",
  }) as any as S.Schema<GetDefaultEncryptionConfigurationResponse>;
export interface GetDestinationRequest {
  Name: string;
}
export const GetDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/destinations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDestinationRequest",
}) as any as S.Schema<GetDestinationRequest>;
export type DestinationCreatedAt = Date;
export type DestinationUpdatedAt = Date;
export interface GetDestinationResponse {
  Description?: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  Name?: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DeliveryDestinationArn: S.optional(S.String),
    DeliveryDestinationType: S.optional(DeliveryDestinationType),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetDestinationResponse",
}) as any as S.Schema<GetDestinationResponse>;
export type DeviceDiscoveryId = string;
export interface GetDeviceDiscoveryRequest {
  Identifier: string;
}
export const GetDeviceDiscoveryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/device-discoveries/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceDiscoveryRequest",
}) as any as S.Schema<GetDeviceDiscoveryRequest>;
export type DeviceDiscoveryArn = string;
export type DiscoveryType =
  | "ZWAVE"
  | "ZIGBEE"
  | "CLOUD"
  | "CUSTOM"
  | "CONTROLLER_CAPABILITY_REDISCOVERY"
  | (string & {});
export const DiscoveryType = S.String;

export type DeviceDiscoveryStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const DeviceDiscoveryStatus = S.String;

export type DiscoveryStartedAt = Date;
export type ConnectorAssociationId = string;
export type DiscoveryFinishedAt = Date;
export interface GetDeviceDiscoveryResponse {
  Id: string;
  Arn: string;
  DiscoveryType: DiscoveryType;
  Status: DeviceDiscoveryStatus;
  StartedAt: Date;
  ControllerId?: string;
  ConnectorAssociationId?: string;
  AccountAssociationId?: string;
  FinishedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetDeviceDiscoveryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Arn: S.String,
    DiscoveryType: DiscoveryType,
    Status: DeviceDiscoveryStatus,
    StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ControllerId: S.optional(S.String),
    ConnectorAssociationId: S.optional(S.String),
    AccountAssociationId: S.optional(S.String),
    FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetDeviceDiscoveryResponse",
}) as any as S.Schema<GetDeviceDiscoveryResponse>;
export interface GetEventLogConfigurationRequest {
  Id: string;
}
export const GetEventLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/event-log-configurations/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventLogConfigurationRequest",
}) as any as S.Schema<GetEventLogConfigurationRequest>;
export interface GetEventLogConfigurationResponse {
  Id?: string;
  ResourceType?: string;
  ResourceId?: string;
  EventLogLevel?: LogLevel;
}
export const GetEventLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    EventLogLevel: S.optional(LogLevel),
  }),
).annotate({
  identifier: "GetEventLogConfigurationResponse",
}) as any as S.Schema<GetEventLogConfigurationResponse>;
export interface GetHubConfigurationRequest {}
export const GetHubConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/hub-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHubConfigurationRequest",
}) as any as S.Schema<GetHubConfigurationRequest>;
export type HubTokenTimerExpirySettingInSeconds = number;
export type HubConfigurationUpdatedAt = Date;
export interface GetHubConfigurationResponse {
  HubTokenTimerExpirySettingInSeconds?: number;
  UpdatedAt?: Date;
}
export const GetHubConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HubTokenTimerExpirySettingInSeconds: S.optional(S.Number),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetHubConfigurationResponse",
}) as any as S.Schema<GetHubConfigurationResponse>;
export interface GetManagedThingRequest {
  Identifier: string;
}
export const GetManagedThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-things/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedThingRequest",
}) as any as S.Schema<GetManagedThingRequest>;
export type AdvertisedProductId = string;
export type ProvisioningStatus =
  | "UNASSOCIATED"
  | "PRE_ASSOCIATED"
  | "DISCOVERED"
  | "ACTIVATED"
  | "DELETION_FAILED"
  | "DELETE_IN_PROGRESS"
  | "ISOLATED"
  | "DELETED"
  | (string & {});
export const ProvisioningStatus = S.String;

export type UniversalProductCode = string | redacted.Redacted<string>;
export type InternationalArticleNumber = string | redacted.Redacted<string>;
export type ConnectorPolicyId = string;
export type ConnectorDeviceId = string | redacted.Redacted<string>;
export type DeviceSpecificKey = string | redacted.Redacted<string>;
export type MacAddress = string | redacted.Redacted<string>;
export type ParentControllerId = string;
export type UpdatedAt = Date;
export type SetupAt = Date;
export type HubNetworkMode =
  | "STANDARD"
  | "NETWORK_WIDE_EXCLUSION"
  | (string & {});
export const HubNetworkMode = S.String;

export interface GetManagedThingResponse {
  Id?: string;
  Arn?: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  AdvertisedProductId?: string;
  Role?: Role;
  ProvisioningStatus?: ProvisioningStatus;
  Name?: string;
  Model?: string | redacted.Redacted<string>;
  Brand?: string | redacted.Redacted<string>;
  SerialNumber?: string | redacted.Redacted<string>;
  UniversalProductCode?: string | redacted.Redacted<string>;
  InternationalArticleNumber?: string | redacted.Redacted<string>;
  ConnectorPolicyId?: string;
  ConnectorDestinationId?: string;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  DeviceSpecificKey?: string | redacted.Redacted<string>;
  MacAddress?: string | redacted.Redacted<string>;
  ParentControllerId?: string;
  Classification?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ActivatedAt?: Date;
  HubNetworkMode?: HubNetworkMode;
  MetaData?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
}
export const GetManagedThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Owner: S.optional(SensitiveString),
    CredentialLockerId: S.optional(S.String),
    AdvertisedProductId: S.optional(S.String),
    Role: S.optional(Role),
    ProvisioningStatus: S.optional(ProvisioningStatus),
    Name: S.optional(S.String),
    Model: S.optional(SensitiveString),
    Brand: S.optional(SensitiveString),
    SerialNumber: S.optional(SensitiveString),
    UniversalProductCode: S.optional(SensitiveString),
    InternationalArticleNumber: S.optional(SensitiveString),
    ConnectorPolicyId: S.optional(S.String),
    ConnectorDestinationId: S.optional(S.String),
    ConnectorDeviceId: S.optional(SensitiveString),
    DeviceSpecificKey: S.optional(SensitiveString),
    MacAddress: S.optional(SensitiveString),
    ParentControllerId: S.optional(S.String),
    Classification: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ActivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HubNetworkMode: S.optional(HubNetworkMode),
    MetaData: S.optional(MetaData),
    Tags: S.optional(TagsMap),
    WiFiSimpleSetupConfiguration: S.optional(WiFiSimpleSetupConfiguration),
  }),
).annotate({
  identifier: "GetManagedThingResponse",
}) as any as S.Schema<GetManagedThingResponse>;
export interface GetManagedThingCapabilitiesRequest {
  Identifier: string;
}
export const GetManagedThingCapabilitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-things-capabilities/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedThingCapabilitiesRequest",
}) as any as S.Schema<GetManagedThingCapabilitiesRequest>;
export interface GetManagedThingCapabilitiesResponse {
  ManagedThingId?: string;
  Capabilities?: string;
  CapabilityReport?: CapabilityReport;
}
export const GetManagedThingCapabilitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.optional(S.String),
    Capabilities: S.optional(S.String),
    CapabilityReport: S.optional(CapabilityReport),
  }),
).annotate({
  identifier: "GetManagedThingCapabilitiesResponse",
}) as any as S.Schema<GetManagedThingCapabilitiesResponse>;
export interface GetManagedThingCertificateRequest {
  Identifier: string;
}
export const GetManagedThingCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-things-certificate/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedThingCertificateRequest",
}) as any as S.Schema<GetManagedThingCertificateRequest>;
export type CertificatePem = string;
export interface GetManagedThingCertificateResponse {
  ManagedThingId?: string;
  CertificatePem?: string;
}
export const GetManagedThingCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.optional(S.String),
    CertificatePem: S.optional(S.String),
  }),
).annotate({
  identifier: "GetManagedThingCertificateResponse",
}) as any as S.Schema<GetManagedThingCertificateResponse>;
export interface GetManagedThingConnectivityDataRequest {
  Identifier: string;
}
export const GetManagedThingConnectivityDataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/managed-things-connectivity-data/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetManagedThingConnectivityDataRequest",
}) as any as S.Schema<GetManagedThingConnectivityDataRequest>;
export type ConnectivityStatus = boolean;
export type ConnectivityTimestamp = Date;
export type DisconnectReasonValue =
  | "AUTH_ERROR"
  | "CLIENT_INITIATED_DISCONNECT"
  | "CLIENT_ERROR"
  | "CONNECTION_LOST"
  | "DUPLICATE_CLIENTID"
  | "FORBIDDEN_ACCESS"
  | "MQTT_KEEP_ALIVE_TIMEOUT"
  | "SERVER_ERROR"
  | "SERVER_INITIATED_DISCONNECT"
  | "THROTTLED"
  | "WEBSOCKET_TTL_EXPIRATION"
  | "CUSTOMAUTH_TTL_EXPIRATION"
  | "UNKNOWN"
  | "NONE"
  | (string & {});
export const DisconnectReasonValue = S.String;

export interface GetManagedThingConnectivityDataResponse {
  ManagedThingId?: string;
  Connected?: boolean;
  Timestamp?: Date;
  DisconnectReason?: DisconnectReasonValue;
}
export const GetManagedThingConnectivityDataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManagedThingId: S.optional(S.String),
      Connected: S.optional(S.Boolean),
      Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      DisconnectReason: S.optional(DisconnectReasonValue),
    }),
).annotate({
  identifier: "GetManagedThingConnectivityDataResponse",
}) as any as S.Schema<GetManagedThingConnectivityDataResponse>;
export interface GetManagedThingMetaDataRequest {
  Identifier: string;
}
export const GetManagedThingMetaDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-things-metadata/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedThingMetaDataRequest",
}) as any as S.Schema<GetManagedThingMetaDataRequest>;
export interface GetManagedThingMetaDataResponse {
  ManagedThingId?: string;
  MetaData?: { [key: string]: string | undefined };
}
export const GetManagedThingMetaDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.optional(S.String),
    MetaData: S.optional(MetaData),
  }),
).annotate({
  identifier: "GetManagedThingMetaDataResponse",
}) as any as S.Schema<GetManagedThingMetaDataResponse>;
export interface GetManagedThingStateRequest {
  ManagedThingId: string;
}
export const GetManagedThingStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-thing-states/{ManagedThingId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedThingStateRequest",
}) as any as S.Schema<GetManagedThingStateRequest>;
export type CapabilityProperties = unknown;
export interface StateCapability {
  id: string;
  name: string;
  version: string;
  properties?: any;
}
export const StateCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    version: S.String,
    properties: S.optional(S.Any),
  }),
).annotate({
  identifier: "StateCapability",
}) as any as S.Schema<StateCapability>;
export type StateCapabilities = StateCapability[];
export const StateCapabilities = /*@__PURE__*/ S.Array(StateCapability);
export interface StateEndpoint {
  endpointId: string;
  capabilities: StateCapability[];
}
export const StateEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointId: S.String, capabilities: StateCapabilities }),
).annotate({ identifier: "StateEndpoint" }) as any as S.Schema<StateEndpoint>;
export type StateEndpoints = StateEndpoint[];
export const StateEndpoints = /*@__PURE__*/ S.Array(StateEndpoint);
export interface GetManagedThingStateResponse {
  Endpoints: StateEndpoint[];
}
export const GetManagedThingStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoints: StateEndpoints }),
).annotate({
  identifier: "GetManagedThingStateResponse",
}) as any as S.Schema<GetManagedThingStateResponse>;
export interface GetNotificationConfigurationRequest {
  EventType: EventType;
}
export const GetNotificationConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventType: EventType.pipe(T.HttpLabel("EventType")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/notification-configurations/{EventType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotificationConfigurationRequest",
}) as any as S.Schema<GetNotificationConfigurationRequest>;
export type NotificationConfigurationCreatedAt = Date;
export type NotificationConfigurationUpdatedAt = Date;
export interface GetNotificationConfigurationResponse {
  EventType?: EventType;
  DestinationName?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetNotificationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventType: S.optional(EventType),
      DestinationName: S.optional(S.String),
      CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      Tags: S.optional(TagsMap),
    }),
).annotate({
  identifier: "GetNotificationConfigurationResponse",
}) as any as S.Schema<GetNotificationConfigurationResponse>;
export interface GetOtaTaskRequest {
  Identifier: string;
}
export const GetOtaTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ota-tasks/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOtaTaskRequest",
}) as any as S.Schema<GetOtaTaskRequest>;
export type LastUpdatedAt = Date;
export interface TaskProcessingDetails {
  NumberOfCanceledThings?: number;
  NumberOfFailedThings?: number;
  NumberOfInProgressThings?: number;
  numberOfQueuedThings?: number;
  numberOfRejectedThings?: number;
  numberOfRemovedThings?: number;
  numberOfSucceededThings?: number;
  numberOfTimedOutThings?: number;
  processingTargets?: string[];
}
export const TaskProcessingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfCanceledThings: S.optional(S.Number),
    NumberOfFailedThings: S.optional(S.Number),
    NumberOfInProgressThings: S.optional(S.Number),
    numberOfQueuedThings: S.optional(S.Number),
    numberOfRejectedThings: S.optional(S.Number),
    numberOfRemovedThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
    numberOfTimedOutThings: S.optional(S.Number),
    processingTargets: S.optional(Target),
  }),
).annotate({
  identifier: "TaskProcessingDetails",
}) as any as S.Schema<TaskProcessingDetails>;
export type OtaStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "COMPLETED"
  | "DELETION_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export const OtaStatus = S.String;

export interface GetOtaTaskResponse {
  TaskId?: string;
  TaskArn?: string;
  Description?: string;
  S3Url?: string;
  Protocol?: OtaProtocol;
  OtaType?: OtaType;
  OtaTargetQueryString?: string;
  OtaMechanism?: OtaMechanism;
  Target?: string[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  TaskConfigurationId?: string;
  TaskProcessingDetails?: TaskProcessingDetails;
  OtaSchedulingConfig?: OtaTaskSchedulingConfig;
  OtaTaskExecutionRetryConfig?: OtaTaskExecutionRetryConfig;
  Status?: OtaStatus;
  Tags?: { [key: string]: string | undefined };
}
export const GetOtaTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.optional(S.String),
    TaskArn: S.optional(S.String),
    Description: S.optional(S.String),
    S3Url: S.optional(S.String),
    Protocol: S.optional(OtaProtocol),
    OtaType: S.optional(OtaType),
    OtaTargetQueryString: S.optional(S.String),
    OtaMechanism: S.optional(OtaMechanism),
    Target: S.optional(Target),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TaskConfigurationId: S.optional(S.String),
    TaskProcessingDetails: S.optional(TaskProcessingDetails),
    OtaSchedulingConfig: S.optional(OtaTaskSchedulingConfig),
    OtaTaskExecutionRetryConfig: S.optional(OtaTaskExecutionRetryConfig),
    Status: S.optional(OtaStatus),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetOtaTaskResponse",
}) as any as S.Schema<GetOtaTaskResponse>;
export interface GetOtaTaskConfigurationRequest {
  Identifier: string;
}
export const GetOtaTaskConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ota-task-configurations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOtaTaskConfigurationRequest",
}) as any as S.Schema<GetOtaTaskConfigurationRequest>;
export interface GetOtaTaskConfigurationResponse {
  TaskConfigurationId?: string;
  Name?: string | redacted.Redacted<string>;
  PushConfig?: PushConfig;
  Description?: string;
  CreatedAt?: Date;
}
export const GetOtaTaskConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskConfigurationId: S.optional(S.String),
    Name: S.optional(SensitiveString),
    PushConfig: S.optional(PushConfig),
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetOtaTaskConfigurationResponse",
}) as any as S.Schema<GetOtaTaskConfigurationResponse>;
export interface GetProvisioningProfileRequest {
  Identifier: string;
}
export const GetProvisioningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/provisioning-profiles/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProvisioningProfileRequest",
}) as any as S.Schema<GetProvisioningProfileRequest>;
export interface GetProvisioningProfileResponse {
  Arn?: string;
  Name?: string;
  ProvisioningType?: ProvisioningType;
  Id?: string;
  Status?: ProvisioningProfileStatus;
  ClaimCertificate?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export const GetProvisioningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    ProvisioningType: S.optional(ProvisioningType),
    Id: S.optional(S.String),
    Status: S.optional(ProvisioningProfileStatus),
    ClaimCertificate: S.optional(SensitiveString),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetProvisioningProfileResponse",
}) as any as S.Schema<GetProvisioningProfileResponse>;
export interface GetRuntimeLogConfigurationRequest {
  ManagedThingId: string;
}
export const GetRuntimeLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/runtime-log-configurations/{ManagedThingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRuntimeLogConfigurationRequest",
}) as any as S.Schema<GetRuntimeLogConfigurationRequest>;
export type LocalStoreLocation = string;
export type LocalStoreFileRotationMaxFiles = number;
export type LocalStoreFileRotationMaxBytes = number;
export type UploadLog = boolean;
export type UploadPeriodMinutes = number;
export type DeleteLocalStoreAfterUpload = boolean;
export interface RuntimeLogConfigurations {
  LogLevel?: LogLevel;
  LogFlushLevel?: LogLevel;
  LocalStoreLocation?: string;
  LocalStoreFileRotationMaxFiles?: number;
  LocalStoreFileRotationMaxBytes?: number;
  UploadLog?: boolean;
  UploadPeriodMinutes?: number;
  DeleteLocalStoreAfterUpload?: boolean;
}
export const RuntimeLogConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogLevel: S.optional(LogLevel),
    LogFlushLevel: S.optional(LogLevel),
    LocalStoreLocation: S.optional(S.String),
    LocalStoreFileRotationMaxFiles: S.optional(S.Number),
    LocalStoreFileRotationMaxBytes: S.optional(S.Number),
    UploadLog: S.optional(S.Boolean),
    UploadPeriodMinutes: S.optional(S.Number),
    DeleteLocalStoreAfterUpload: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RuntimeLogConfigurations",
}) as any as S.Schema<RuntimeLogConfigurations>;
export interface GetRuntimeLogConfigurationResponse {
  ManagedThingId?: string;
  RuntimeLogConfigurations?: RuntimeLogConfigurations;
}
export const GetRuntimeLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.optional(S.String),
    RuntimeLogConfigurations: S.optional(RuntimeLogConfigurations),
  }),
).annotate({
  identifier: "GetRuntimeLogConfigurationResponse",
}) as any as S.Schema<GetRuntimeLogConfigurationResponse>;
export type SchemaVersionType = "capability" | "definition" | (string & {});
export const SchemaVersionType = S.String;

export interface GetSchemaVersionRequest {
  Type: SchemaVersionType;
  SchemaVersionedId: string;
  Format?: SchemaVersionFormat;
}
export const GetSchemaVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: SchemaVersionType.pipe(T.HttpLabel("Type")),
    SchemaVersionedId: S.String.pipe(T.HttpLabel("SchemaVersionedId")),
    Format: S.optional(SchemaVersionFormat).pipe(T.HttpQuery("Format")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/schema-versions/{Type}/{SchemaVersionedId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSchemaVersionRequest",
}) as any as S.Schema<GetSchemaVersionRequest>;
export type SchemaId = string;
export type SchemaVersionDescription = string;
export type SchemaVersionNamespaceName = string;
export type SchemaVersionVersion = string;
export type SchemaVersionVisibility = "PUBLIC" | "PRIVATE" | (string & {});
export const SchemaVersionVisibility = S.String;

export type SchemaVersionSchema = unknown;
export interface GetSchemaVersionResponse {
  SchemaId?: string;
  Type?: SchemaVersionType;
  Description?: string;
  Namespace?: string;
  SemanticVersion?: string;
  Visibility?: SchemaVersionVisibility;
  Schema?: any;
}
export const GetSchemaVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(S.String),
    Type: S.optional(SchemaVersionType),
    Description: S.optional(S.String),
    Namespace: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    Visibility: S.optional(SchemaVersionVisibility),
    Schema: S.optional(S.Any),
  }),
).annotate({
  identifier: "GetSchemaVersionResponse",
}) as any as S.Schema<GetSchemaVersionResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAccountAssociationsRequest {
  ConnectorDestinationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAccountAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDestinationId: S.optional(S.String).pipe(
      T.HttpQuery("ConnectorDestinationId"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/account-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountAssociationsRequest",
}) as any as S.Schema<ListAccountAssociationsRequest>;
export interface AccountAssociationItem {
  AccountAssociationId: string;
  AssociationState: AssociationState;
  ErrorMessage?: string;
  ConnectorDestinationId?: string;
  Name?: string;
  Description?: string;
  Arn?: string;
}
export const AccountAssociationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.String,
    AssociationState: AssociationState,
    ErrorMessage: S.optional(S.String),
    ConnectorDestinationId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Arn: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountAssociationItem",
}) as any as S.Schema<AccountAssociationItem>;
export type AccountAssociationListDefinition = AccountAssociationItem[];
export const AccountAssociationListDefinition = /*@__PURE__*/ S.Array(
  AccountAssociationItem,
);
export interface ListAccountAssociationsResponse {
  Items?: AccountAssociationItem[];
  NextToken?: string;
}
export const ListAccountAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(AccountAssociationListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssociationsResponse",
}) as any as S.Schema<ListAccountAssociationsResponse>;
export interface ListCloudConnectorsRequest {
  Type?: CloudConnectorType;
  LambdaArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCloudConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(CloudConnectorType).pipe(T.HttpQuery("Type")),
    LambdaArn: S.optional(S.String).pipe(T.HttpQuery("LambdaArn")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cloud-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCloudConnectorsRequest",
}) as any as S.Schema<ListCloudConnectorsRequest>;
export interface ConnectorItem {
  Name: string;
  EndpointConfig: EndpointConfig;
  Description?: string;
  EndpointType?: EndpointType;
  Id?: string;
  Type?: CloudConnectorType;
}
export const ConnectorItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EndpointConfig: EndpointConfig,
    Description: S.optional(S.String),
    EndpointType: S.optional(EndpointType),
    Id: S.optional(S.String),
    Type: S.optional(CloudConnectorType),
  }),
).annotate({ identifier: "ConnectorItem" }) as any as S.Schema<ConnectorItem>;
export type ConnectorList = ConnectorItem[];
export const ConnectorList = /*@__PURE__*/ S.Array(ConnectorItem);
export interface ListCloudConnectorsResponse {
  Items?: ConnectorItem[];
  NextToken?: string;
}
export const ListCloudConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ConnectorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCloudConnectorsResponse",
}) as any as S.Schema<ListCloudConnectorsResponse>;
export interface ListConnectorDestinationsRequest {
  CloudConnectorId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListConnectorDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectorId: S.optional(S.String).pipe(
      T.HttpQuery("CloudConnectorId"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connector-destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorDestinationsRequest",
}) as any as S.Schema<ListConnectorDestinationsRequest>;
export interface ConnectorDestinationSummary {
  Name?: string;
  Description?: string;
  CloudConnectorId?: string;
  Id?: string;
}
export const ConnectorDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CloudConnectorId: S.optional(S.String),
    Id: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectorDestinationSummary",
}) as any as S.Schema<ConnectorDestinationSummary>;
export type ConnectorDestinationListDefinition = ConnectorDestinationSummary[];
export const ConnectorDestinationListDefinition = /*@__PURE__*/ S.Array(
  ConnectorDestinationSummary,
);
export interface ListConnectorDestinationsResponse {
  ConnectorDestinationList?: ConnectorDestinationSummary[];
  NextToken?: string;
}
export const ListConnectorDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDestinationList: S.optional(ConnectorDestinationListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorDestinationsResponse",
}) as any as S.Schema<ListConnectorDestinationsResponse>;
export interface ListCredentialLockersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCredentialLockersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/credential-lockers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCredentialLockersRequest",
}) as any as S.Schema<ListCredentialLockersRequest>;
export interface CredentialLockerSummary {
  Id?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
}
export const CredentialLockerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CredentialLockerSummary",
}) as any as S.Schema<CredentialLockerSummary>;
export type CredentialLockerListDefinition = CredentialLockerSummary[];
export const CredentialLockerListDefinition = /*@__PURE__*/ S.Array(
  CredentialLockerSummary,
);
export interface ListCredentialLockersResponse {
  Items?: CredentialLockerSummary[];
  NextToken?: string;
}
export const ListCredentialLockersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(CredentialLockerListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCredentialLockersResponse",
}) as any as S.Schema<ListCredentialLockersResponse>;
export interface ListDestinationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDestinationsRequest",
}) as any as S.Schema<ListDestinationsRequest>;
export interface DestinationSummary {
  Description?: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  Name?: string;
  RoleArn?: string;
}
export const DestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DeliveryDestinationArn: S.optional(S.String),
    DeliveryDestinationType: S.optional(DeliveryDestinationType),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DestinationSummary",
}) as any as S.Schema<DestinationSummary>;
export type DestinationListDefinition = DestinationSummary[];
export const DestinationListDefinition =
  /*@__PURE__*/ S.Array(DestinationSummary);
export interface ListDestinationsResponse {
  DestinationList?: DestinationSummary[];
  NextToken?: string;
}
export const ListDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationList: S.optional(DestinationListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDestinationsResponse",
}) as any as S.Schema<ListDestinationsResponse>;
export interface ListDeviceDiscoveriesRequest {
  NextToken?: string;
  MaxResults?: number;
  TypeFilter?: DiscoveryType;
  StatusFilter?: DeviceDiscoveryStatus;
}
export const ListDeviceDiscoveriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    TypeFilter: S.optional(DiscoveryType).pipe(T.HttpQuery("TypeFilter")),
    StatusFilter: S.optional(DeviceDiscoveryStatus).pipe(
      T.HttpQuery("StatusFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/device-discoveries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeviceDiscoveriesRequest",
}) as any as S.Schema<ListDeviceDiscoveriesRequest>;
export interface DeviceDiscoverySummary {
  Id?: string;
  DiscoveryType?: DiscoveryType;
  Status?: DeviceDiscoveryStatus;
}
export const DeviceDiscoverySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    DiscoveryType: S.optional(DiscoveryType),
    Status: S.optional(DeviceDiscoveryStatus),
  }),
).annotate({
  identifier: "DeviceDiscoverySummary",
}) as any as S.Schema<DeviceDiscoverySummary>;
export type DeviceDiscoveryListDefinition = DeviceDiscoverySummary[];
export const DeviceDiscoveryListDefinition = /*@__PURE__*/ S.Array(
  DeviceDiscoverySummary,
);
export interface ListDeviceDiscoveriesResponse {
  Items?: DeviceDiscoverySummary[];
  NextToken?: string;
}
export const ListDeviceDiscoveriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(DeviceDiscoveryListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeviceDiscoveriesResponse",
}) as any as S.Schema<ListDeviceDiscoveriesResponse>;
export interface ListDiscoveredDevicesRequest {
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDiscoveredDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/device-discoveries/{Identifier}/devices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDiscoveredDevicesRequest",
}) as any as S.Schema<ListDiscoveredDevicesRequest>;
export type ConnectorDeviceName = string;
export type DeviceTypeList = string[];
export const DeviceTypeList = /*@__PURE__*/ S.Array(S.String);
export type DiscoveryModification =
  | "DISCOVERED"
  | "UPDATED"
  | "NO_CHANGE"
  | (string & {});
export const DiscoveryModification = S.String;

export type DiscoveredAt = Date;
export interface DiscoveredDeviceSummary {
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  ConnectorDeviceName?: string;
  DeviceTypes?: string[];
  ManagedThingId?: string;
  Modification?: DiscoveryModification;
  DiscoveredAt?: Date;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  AuthenticationMaterial?: string | redacted.Redacted<string>;
}
export const DiscoveredDeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDeviceId: S.optional(SensitiveString),
    ConnectorDeviceName: S.optional(S.String),
    DeviceTypes: S.optional(DeviceTypeList),
    ManagedThingId: S.optional(S.String),
    Modification: S.optional(DiscoveryModification),
    DiscoveredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Brand: S.optional(SensitiveString),
    Model: S.optional(SensitiveString),
    AuthenticationMaterial: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DiscoveredDeviceSummary",
}) as any as S.Schema<DiscoveredDeviceSummary>;
export type DiscoveredDeviceListDefinition = DiscoveredDeviceSummary[];
export const DiscoveredDeviceListDefinition = /*@__PURE__*/ S.Array(
  DiscoveredDeviceSummary,
);
export interface ListDiscoveredDevicesResponse {
  Items?: DiscoveredDeviceSummary[];
  NextToken?: string;
}
export const ListDiscoveredDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(DiscoveredDeviceListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDiscoveredDevicesResponse",
}) as any as S.Schema<ListDiscoveredDevicesResponse>;
export interface ListEventLogConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEventLogConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/event-log-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventLogConfigurationsRequest",
}) as any as S.Schema<ListEventLogConfigurationsRequest>;
export interface EventLogConfigurationSummary {
  Id?: string;
  ResourceType?: string;
  ResourceId?: string;
  EventLogLevel?: LogLevel;
}
export const EventLogConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    EventLogLevel: S.optional(LogLevel),
  }),
).annotate({
  identifier: "EventLogConfigurationSummary",
}) as any as S.Schema<EventLogConfigurationSummary>;
export type EventLogConfigurationListDefinition =
  EventLogConfigurationSummary[];
export const EventLogConfigurationListDefinition = /*@__PURE__*/ S.Array(
  EventLogConfigurationSummary,
);
export interface ListEventLogConfigurationsResponse {
  EventLogConfigurationList?: EventLogConfigurationSummary[];
  NextToken?: string;
}
export const ListEventLogConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventLogConfigurationList: S.optional(EventLogConfigurationListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventLogConfigurationsResponse",
}) as any as S.Schema<ListEventLogConfigurationsResponse>;
export interface ListManagedThingAccountAssociationsRequest {
  ManagedThingId?: string;
  AccountAssociationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListManagedThingAccountAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ManagedThingId: S.optional(S.String).pipe(T.HttpQuery("ManagedThingId")),
      AccountAssociationId: S.optional(S.String).pipe(
        T.HttpQuery("AccountAssociationId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/managed-thing-associations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListManagedThingAccountAssociationsRequest",
  }) as any as S.Schema<ListManagedThingAccountAssociationsRequest>;
export type ManagedThingAssociationStatus =
  | "PRE_ASSOCIATED"
  | "ASSOCIATED"
  | (string & {});
export const ManagedThingAssociationStatus = S.String;

export interface ManagedThingAssociation {
  ManagedThingId?: string;
  AccountAssociationId?: string;
  ManagedThingAssociationStatus?: ManagedThingAssociationStatus;
}
export const ManagedThingAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.optional(S.String),
    AccountAssociationId: S.optional(S.String),
    ManagedThingAssociationStatus: S.optional(ManagedThingAssociationStatus),
  }),
).annotate({
  identifier: "ManagedThingAssociation",
}) as any as S.Schema<ManagedThingAssociation>;
export type ManagedThingAssociationList = ManagedThingAssociation[];
export const ManagedThingAssociationList = /*@__PURE__*/ S.Array(
  ManagedThingAssociation,
);
export interface ListManagedThingAccountAssociationsResponse {
  Items?: ManagedThingAssociation[];
  NextToken?: string;
}
export const ListManagedThingAccountAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Items: S.optional(ManagedThingAssociationList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListManagedThingAccountAssociationsResponse",
  }) as any as S.Schema<ListManagedThingAccountAssociationsResponse>;
export interface ListManagedThingsRequest {
  OwnerFilter?: string | redacted.Redacted<string>;
  CredentialLockerFilter?: string;
  RoleFilter?: Role;
  ParentControllerIdentifierFilter?: string;
  ConnectorPolicyIdFilter?: string;
  ConnectorDestinationIdFilter?: string;
  ConnectorDeviceIdFilter?: string | redacted.Redacted<string>;
  SerialNumberFilter?: string | redacted.Redacted<string>;
  ProvisioningStatusFilter?: ProvisioningStatus;
  NextToken?: string;
  MaxResults?: number;
}
export const ListManagedThingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerFilter: S.optional(SensitiveString).pipe(T.HttpQuery("OwnerFilter")),
    CredentialLockerFilter: S.optional(S.String).pipe(
      T.HttpQuery("CredentialLockerFilter"),
    ),
    RoleFilter: S.optional(Role).pipe(T.HttpQuery("RoleFilter")),
    ParentControllerIdentifierFilter: S.optional(S.String).pipe(
      T.HttpQuery("ParentControllerIdentifierFilter"),
    ),
    ConnectorPolicyIdFilter: S.optional(S.String).pipe(
      T.HttpQuery("ConnectorPolicyIdFilter"),
    ),
    ConnectorDestinationIdFilter: S.optional(S.String).pipe(
      T.HttpQuery("ConnectorDestinationIdFilter"),
    ),
    ConnectorDeviceIdFilter: S.optional(SensitiveString).pipe(
      T.HttpQuery("ConnectorDeviceIdFilter"),
    ),
    SerialNumberFilter: S.optional(SensitiveString).pipe(
      T.HttpQuery("SerialNumberFilter"),
    ),
    ProvisioningStatusFilter: S.optional(ProvisioningStatus).pipe(
      T.HttpQuery("ProvisioningStatusFilter"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedThingsRequest",
}) as any as S.Schema<ListManagedThingsRequest>;
export interface ManagedThingSummary {
  Id?: string;
  Arn?: string;
  AdvertisedProductId?: string;
  Brand?: string | redacted.Redacted<string>;
  Classification?: string | redacted.Redacted<string>;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  ConnectorPolicyId?: string;
  ConnectorDestinationId?: string;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  ParentControllerId?: string;
  ProvisioningStatus?: ProvisioningStatus;
  Role?: Role;
  SerialNumber?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ActivatedAt?: Date;
}
export const ManagedThingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    AdvertisedProductId: S.optional(S.String),
    Brand: S.optional(SensitiveString),
    Classification: S.optional(SensitiveString),
    ConnectorDeviceId: S.optional(SensitiveString),
    ConnectorPolicyId: S.optional(S.String),
    ConnectorDestinationId: S.optional(S.String),
    Model: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Owner: S.optional(SensitiveString),
    CredentialLockerId: S.optional(S.String),
    ParentControllerId: S.optional(S.String),
    ProvisioningStatus: S.optional(ProvisioningStatus),
    Role: S.optional(Role),
    SerialNumber: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ActivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ManagedThingSummary",
}) as any as S.Schema<ManagedThingSummary>;
export type ManagedThingListDefinition = ManagedThingSummary[];
export const ManagedThingListDefinition =
  /*@__PURE__*/ S.Array(ManagedThingSummary);
export interface ListManagedThingsResponse {
  Items?: ManagedThingSummary[];
  NextToken?: string;
}
export const ListManagedThingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ManagedThingListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedThingsResponse",
}) as any as S.Schema<ListManagedThingsResponse>;
export type CapabilityId = string;
export interface ListManagedThingSchemasRequest {
  Identifier: string;
  EndpointIdFilter?: string;
  CapabilityIdFilter?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListManagedThingSchemasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    EndpointIdFilter: S.optional(S.String).pipe(
      T.HttpQuery("EndpointIdFilter"),
    ),
    CapabilityIdFilter: S.optional(S.String).pipe(
      T.HttpQuery("CapabilityIdFilter"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-thing-schemas/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedThingSchemasRequest",
}) as any as S.Schema<ListManagedThingSchemasRequest>;
export interface ManagedThingSchemaListItem {
  EndpointId?: string;
  CapabilityId?: string;
  Schema?: any;
}
export const ManagedThingSchemaListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    CapabilityId: S.optional(S.String),
    Schema: S.optional(S.Any),
  }),
).annotate({
  identifier: "ManagedThingSchemaListItem",
}) as any as S.Schema<ManagedThingSchemaListItem>;
export type ManagedThingSchemaListDefinition = ManagedThingSchemaListItem[];
export const ManagedThingSchemaListDefinition = /*@__PURE__*/ S.Array(
  ManagedThingSchemaListItem,
);
export interface ListManagedThingSchemasResponse {
  Items?: ManagedThingSchemaListItem[];
  NextToken?: string;
}
export const ListManagedThingSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ManagedThingSchemaListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedThingSchemasResponse",
}) as any as S.Schema<ListManagedThingSchemasResponse>;
export interface ListNotificationConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListNotificationConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/notification-configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListNotificationConfigurationsRequest",
}) as any as S.Schema<ListNotificationConfigurationsRequest>;
export interface NotificationConfigurationSummary {
  EventType?: EventType;
  DestinationName?: string;
}
export const NotificationConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventType: S.optional(EventType),
    DestinationName: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationConfigurationSummary",
}) as any as S.Schema<NotificationConfigurationSummary>;
export type NotificationConfigurationListDefinition =
  NotificationConfigurationSummary[];
export const NotificationConfigurationListDefinition = /*@__PURE__*/ S.Array(
  NotificationConfigurationSummary,
);
export interface ListNotificationConfigurationsResponse {
  NotificationConfigurationList?: NotificationConfigurationSummary[];
  NextToken?: string;
}
export const ListNotificationConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NotificationConfigurationList: S.optional(
        NotificationConfigurationListDefinition,
      ),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListNotificationConfigurationsResponse",
}) as any as S.Schema<ListNotificationConfigurationsResponse>;
export interface ListOtaTaskConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListOtaTaskConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ota-task-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOtaTaskConfigurationsRequest",
}) as any as S.Schema<ListOtaTaskConfigurationsRequest>;
export interface OtaTaskConfigurationSummary {
  TaskConfigurationId?: string;
  Name?: string | redacted.Redacted<string>;
  CreatedAt?: Date;
}
export const OtaTaskConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskConfigurationId: S.optional(S.String),
    Name: S.optional(SensitiveString),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "OtaTaskConfigurationSummary",
}) as any as S.Schema<OtaTaskConfigurationSummary>;
export type OtaTaskConfigurationListDefinition = OtaTaskConfigurationSummary[];
export const OtaTaskConfigurationListDefinition = /*@__PURE__*/ S.Array(
  OtaTaskConfigurationSummary,
);
export interface ListOtaTaskConfigurationsResponse {
  Items?: OtaTaskConfigurationSummary[];
  NextToken?: string;
}
export const ListOtaTaskConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(OtaTaskConfigurationListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOtaTaskConfigurationsResponse",
}) as any as S.Schema<ListOtaTaskConfigurationsResponse>;
export type OtaNextToken = string;
export interface ListOtaTaskExecutionsRequest {
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOtaTaskExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ota-tasks/{Identifier}/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOtaTaskExecutionsRequest",
}) as any as S.Schema<ListOtaTaskExecutionsRequest>;
export type ExecutionNumber = number;
export type QueuedAt = Date;
export type RetryAttempt = number;
export type StartedAt = Date;
export type OtaTaskExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export const OtaTaskExecutionStatus = S.String;

export interface OtaTaskExecutionSummary {
  ExecutionNumber?: number;
  LastUpdatedAt?: Date;
  QueuedAt?: Date;
  RetryAttempt?: number;
  StartedAt?: Date;
  Status?: OtaTaskExecutionStatus;
}
export const OtaTaskExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionNumber: S.optional(S.Number),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    QueuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RetryAttempt: S.optional(S.Number),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(OtaTaskExecutionStatus),
  }),
).annotate({
  identifier: "OtaTaskExecutionSummary",
}) as any as S.Schema<OtaTaskExecutionSummary>;
export interface OtaTaskExecutionSummaries {
  TaskExecutionSummary?: OtaTaskExecutionSummary;
  ManagedThingId?: string;
}
export const OtaTaskExecutionSummaries = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskExecutionSummary: S.optional(OtaTaskExecutionSummary),
    ManagedThingId: S.optional(S.String),
  }),
).annotate({
  identifier: "OtaTaskExecutionSummaries",
}) as any as S.Schema<OtaTaskExecutionSummaries>;
export type OtaTaskExecutionSummariesListDefinition =
  OtaTaskExecutionSummaries[];
export const OtaTaskExecutionSummariesListDefinition = /*@__PURE__*/ S.Array(
  OtaTaskExecutionSummaries,
);
export interface ListOtaTaskExecutionsResponse {
  ExecutionSummaries?: OtaTaskExecutionSummaries[];
  NextToken?: string;
}
export const ListOtaTaskExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionSummaries: S.optional(OtaTaskExecutionSummariesListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOtaTaskExecutionsResponse",
}) as any as S.Schema<ListOtaTaskExecutionsResponse>;
export interface ListOtaTasksRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListOtaTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ota-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOtaTasksRequest",
}) as any as S.Schema<ListOtaTasksRequest>;
export interface OtaTaskSummary {
  TaskId?: string;
  TaskArn?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  TaskConfigurationId?: string;
  Status?: OtaStatus;
}
export const OtaTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.optional(S.String),
    TaskArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TaskConfigurationId: S.optional(S.String),
    Status: S.optional(OtaStatus),
  }),
).annotate({ identifier: "OtaTaskSummary" }) as any as S.Schema<OtaTaskSummary>;
export type OtaTaskListDefinition = OtaTaskSummary[];
export const OtaTaskListDefinition = /*@__PURE__*/ S.Array(OtaTaskSummary);
export interface ListOtaTasksResponse {
  Tasks?: OtaTaskSummary[];
  NextToken?: string;
}
export const ListOtaTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tasks: S.optional(OtaTaskListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOtaTasksResponse",
}) as any as S.Schema<ListOtaTasksResponse>;
export interface ListProvisioningProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProvisioningProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/provisioning-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProvisioningProfilesRequest",
}) as any as S.Schema<ListProvisioningProfilesRequest>;
export interface ProvisioningProfileSummary {
  Name?: string;
  Id?: string;
  Arn?: string;
  ProvisioningType?: ProvisioningType;
  Status?: ProvisioningProfileStatus;
}
export const ProvisioningProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    ProvisioningType: S.optional(ProvisioningType),
    Status: S.optional(ProvisioningProfileStatus),
  }),
).annotate({
  identifier: "ProvisioningProfileSummary",
}) as any as S.Schema<ProvisioningProfileSummary>;
export type ProvisioningProfileListDefinition = ProvisioningProfileSummary[];
export const ProvisioningProfileListDefinition = /*@__PURE__*/ S.Array(
  ProvisioningProfileSummary,
);
export interface ListProvisioningProfilesResponse {
  Items?: ProvisioningProfileSummary[];
  NextToken?: string;
}
export const ListProvisioningProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ProvisioningProfileListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProvisioningProfilesResponse",
}) as any as S.Schema<ListProvisioningProfilesResponse>;
export interface ListSchemaVersionsRequest {
  Type: SchemaVersionType;
  MaxResults?: number;
  NextToken?: string;
  SchemaId?: string;
  Namespace?: string;
  Visibility?: SchemaVersionVisibility;
  SemanticVersion?: string;
}
export const ListSchemaVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: SchemaVersionType.pipe(T.HttpLabel("Type")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    SchemaId: S.optional(S.String).pipe(T.HttpQuery("SchemaIdFilter")),
    Namespace: S.optional(S.String).pipe(T.HttpQuery("NamespaceFilter")),
    Visibility: S.optional(SchemaVersionVisibility).pipe(
      T.HttpQuery("VisibilityFilter"),
    ),
    SemanticVersion: S.optional(S.String).pipe(
      T.HttpQuery("SemanticVersionFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/schema-versions/{Type}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSchemaVersionsRequest",
}) as any as S.Schema<ListSchemaVersionsRequest>;
export interface SchemaVersionListItem {
  SchemaId?: string;
  Type?: SchemaVersionType;
  Description?: string;
  Namespace?: string;
  SemanticVersion?: string;
  Visibility?: SchemaVersionVisibility;
}
export const SchemaVersionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(S.String),
    Type: S.optional(SchemaVersionType),
    Description: S.optional(S.String),
    Namespace: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    Visibility: S.optional(SchemaVersionVisibility),
  }),
).annotate({
  identifier: "SchemaVersionListItem",
}) as any as S.Schema<SchemaVersionListItem>;
export type SchemaVersionList = SchemaVersionListItem[];
export const SchemaVersionList = /*@__PURE__*/ S.Array(SchemaVersionListItem);
export interface ListSchemaVersionsResponse {
  Items?: SchemaVersionListItem[];
  NextToken?: string;
}
export const ListSchemaVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(SchemaVersionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemaVersionsResponse",
}) as any as S.Schema<ListSchemaVersionsResponse>;
export type IoTManagedIntegrationsResourceARN = string;
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
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutDefaultEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export const PutDefaultEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configuration/account/encryption" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDefaultEncryptionConfigurationRequest",
}) as any as S.Schema<PutDefaultEncryptionConfigurationRequest>;
export interface PutDefaultEncryptionConfigurationResponse {
  configurationStatus: ConfigurationStatus;
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export const PutDefaultEncryptionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      configurationStatus: ConfigurationStatus,
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PutDefaultEncryptionConfigurationResponse",
  }) as any as S.Schema<PutDefaultEncryptionConfigurationResponse>;
export interface PutHubConfigurationRequest {
  HubTokenTimerExpirySettingInSeconds: number;
}
export const PutHubConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HubTokenTimerExpirySettingInSeconds: S.Number }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/hub-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutHubConfigurationRequest",
}) as any as S.Schema<PutHubConfigurationRequest>;
export interface PutHubConfigurationResponse {
  HubTokenTimerExpirySettingInSeconds?: number;
}
export const PutHubConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HubTokenTimerExpirySettingInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "PutHubConfigurationResponse",
}) as any as S.Schema<PutHubConfigurationResponse>;
export interface PutRuntimeLogConfigurationRequest {
  ManagedThingId: string;
  RuntimeLogConfigurations: RuntimeLogConfigurations;
}
export const PutRuntimeLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
    RuntimeLogConfigurations: RuntimeLogConfigurations,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/runtime-log-configurations/{ManagedThingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRuntimeLogConfigurationRequest",
}) as any as S.Schema<PutRuntimeLogConfigurationRequest>;
export interface PutRuntimeLogConfigurationResponse {}
export const PutRuntimeLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutRuntimeLogConfigurationResponse",
}) as any as S.Schema<PutRuntimeLogConfigurationResponse>;
export interface RegisterAccountAssociationRequest {
  ManagedThingId: string;
  AccountAssociationId: string;
  DeviceDiscoveryId: string;
}
export const RegisterAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String,
    AccountAssociationId: S.String,
    DeviceDiscoveryId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/managed-thing-associations/register" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterAccountAssociationRequest",
}) as any as S.Schema<RegisterAccountAssociationRequest>;
export interface RegisterAccountAssociationResponse {
  AccountAssociationId?: string;
  DeviceDiscoveryId?: string;
  ManagedThingId?: string;
}
export const RegisterAccountAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.optional(S.String),
    DeviceDiscoveryId: S.optional(S.String),
    ManagedThingId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterAccountAssociationResponse",
}) as any as S.Schema<RegisterAccountAssociationResponse>;
export interface RegisterCustomEndpointRequest {}
export const RegisterCustomEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-endpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterCustomEndpointRequest",
}) as any as S.Schema<RegisterCustomEndpointRequest>;
export interface RegisterCustomEndpointResponse {
  EndpointAddress: string;
}
export const RegisterCustomEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointAddress: S.String }),
).annotate({
  identifier: "RegisterCustomEndpointResponse",
}) as any as S.Schema<RegisterCustomEndpointResponse>;
export interface ResetRuntimeLogConfigurationRequest {
  ManagedThingId: string;
}
export const ResetRuntimeLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/runtime-log-configurations/{ManagedThingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetRuntimeLogConfigurationRequest",
}) as any as S.Schema<ResetRuntimeLogConfigurationRequest>;
export interface ResetRuntimeLogConfigurationResponse {}
export const ResetRuntimeLogConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "ResetRuntimeLogConfigurationResponse",
}) as any as S.Schema<ResetRuntimeLogConfigurationResponse>;
export type ConnectorId = string;
export type ThirdPartyUserId = string | redacted.Redacted<string>;
export type ConnectorEventOperation =
  | "DEVICE_COMMAND_RESPONSE"
  | "DEVICE_DISCOVERY"
  | "DEVICE_EVENT"
  | "DEVICE_COMMAND_REQUEST"
  | (string & {});
export const ConnectorEventOperation = S.String;

export type ConnectorEventOperationVersion = string;
export type ConnectorEventStatusCode = number;
export type ConnectorEventMessage = string | redacted.Redacted<string>;
export type TraceId = string;
export type ClusterId = string;
export type SpecVersion = string;
export type MatterAttributeId = string;
export type MatterCapabilityReportAttributeValue = unknown;
export interface MatterCapabilityReportAttribute {
  id?: string;
  name?: string;
  value?: any;
}
export const MatterCapabilityReportAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    value: S.optional(S.Any),
  }),
).annotate({
  identifier: "MatterCapabilityReportAttribute",
}) as any as S.Schema<MatterCapabilityReportAttribute>;
export type MatterCapabilityReportAttributes =
  MatterCapabilityReportAttribute[];
export const MatterCapabilityReportAttributes = /*@__PURE__*/ S.Array(
  MatterCapabilityReportAttribute,
);
export type MatterCommandId = string;
export type MatterCapabilityReportCommands = string[];
export const MatterCapabilityReportCommands = /*@__PURE__*/ S.Array(S.String);
export type MatterEventId = string;
export type MatterCapabilityReportEvents = string[];
export const MatterCapabilityReportEvents = /*@__PURE__*/ S.Array(S.String);
export type MatterCapabilityReportFeatureMap = number;
export type MatterCapabilityReportGeneratedCommands = string[];
export const MatterCapabilityReportGeneratedCommands = /*@__PURE__*/ S.Array(
  S.String,
);
export type MatterCapabilityReportFabricIndex = number;
export interface MatterCapabilityReportCluster {
  id: string;
  revision: number;
  publicId?: string;
  name?: string;
  specVersion?: string;
  attributes?: MatterCapabilityReportAttribute[];
  commands?: string[];
  events?: string[];
  featureMap?: number;
  generatedCommands?: string[];
  fabricIndex?: number;
}
export const MatterCapabilityReportCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    revision: S.Number,
    publicId: S.optional(S.String),
    name: S.optional(S.String),
    specVersion: S.optional(S.String),
    attributes: S.optional(MatterCapabilityReportAttributes),
    commands: S.optional(MatterCapabilityReportCommands),
    events: S.optional(MatterCapabilityReportEvents),
    featureMap: S.optional(S.Number),
    generatedCommands: S.optional(MatterCapabilityReportGeneratedCommands),
    fabricIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "MatterCapabilityReportCluster",
}) as any as S.Schema<MatterCapabilityReportCluster>;
export type MatterCapabilityReportClusters = MatterCapabilityReportCluster[];
export const MatterCapabilityReportClusters = /*@__PURE__*/ S.Array(
  MatterCapabilityReportCluster,
);
export type MatterCapabilityReportEndpointParts = string[];
export const MatterCapabilityReportEndpointParts = /*@__PURE__*/ S.Array(
  S.String,
);
export type EndpointSemanticTag = string;
export type MatterCapabilityReportEndpointSemanticTags = string[];
export const MatterCapabilityReportEndpointSemanticTags = /*@__PURE__*/ S.Array(
  S.String,
);
export type MatterCapabilityReportEndpointClientClusters = string[];
export const MatterCapabilityReportEndpointClientClusters =
  /*@__PURE__*/ S.Array(S.String);
export interface MatterCapabilityReportEndpoint {
  id: string;
  deviceTypes: string[];
  clusters: MatterCapabilityReportCluster[];
  parts?: string[];
  semanticTags?: string[];
  clientClusters?: string[];
}
export const MatterCapabilityReportEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    deviceTypes: DeviceTypes,
    clusters: MatterCapabilityReportClusters,
    parts: S.optional(MatterCapabilityReportEndpointParts),
    semanticTags: S.optional(MatterCapabilityReportEndpointSemanticTags),
    clientClusters: S.optional(MatterCapabilityReportEndpointClientClusters),
  }),
).annotate({
  identifier: "MatterCapabilityReportEndpoint",
}) as any as S.Schema<MatterCapabilityReportEndpoint>;
export type MatterCapabilityReportEndpoints = MatterCapabilityReportEndpoint[];
export const MatterCapabilityReportEndpoints = /*@__PURE__*/ S.Array(
  MatterCapabilityReportEndpoint,
);
export interface MatterCapabilityReport {
  version: string;
  nodeId?: string;
  endpoints: MatterCapabilityReportEndpoint[];
}
export const MatterCapabilityReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    nodeId: S.optional(S.String),
    endpoints: MatterCapabilityReportEndpoints,
  }),
).annotate({
  identifier: "MatterCapabilityReport",
}) as any as S.Schema<MatterCapabilityReport>;
export type DeviceMetadata = unknown;
export interface Device {
  ConnectorDeviceId: string | redacted.Redacted<string>;
  ConnectorDeviceName?: string;
  CapabilityReport: MatterCapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  DeviceMetadata?: any;
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorDeviceId: SensitiveString,
    ConnectorDeviceName: S.optional(S.String),
    CapabilityReport: MatterCapabilityReport,
    CapabilitySchemas: S.optional(CapabilitySchemas),
    DeviceMetadata: S.optional(S.Any),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export type Devices = Device[];
export const Devices = /*@__PURE__*/ S.Array(Device);
export type MatterAttributes = unknown;
export type MatterFields = unknown;
export type MatterCommands = { [key: string]: any | undefined };
export const MatterCommands = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export type MatterEvents = { [key: string]: any | undefined };
export const MatterEvents = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export interface MatterCluster {
  id?: string;
  attributes?: any;
  commands?: { [key: string]: any | undefined };
  events?: { [key: string]: any | undefined };
}
export const MatterCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    attributes: S.optional(S.Any),
    commands: S.optional(MatterCommands),
    events: S.optional(MatterEvents),
  }),
).annotate({ identifier: "MatterCluster" }) as any as S.Schema<MatterCluster>;
export type MatterClusters = MatterCluster[];
export const MatterClusters = /*@__PURE__*/ S.Array(MatterCluster);
export interface MatterEndpoint {
  id?: string;
  clusters?: MatterCluster[];
}
export const MatterEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), clusters: S.optional(MatterClusters) }),
).annotate({ identifier: "MatterEndpoint" }) as any as S.Schema<MatterEndpoint>;
export interface SendConnectorEventRequest {
  ConnectorId: string;
  UserId?: string | redacted.Redacted<string>;
  Operation: ConnectorEventOperation;
  OperationVersion?: string;
  StatusCode?: number;
  Message?: string | redacted.Redacted<string>;
  DeviceDiscoveryId?: string;
  ConnectorDeviceId?: string | redacted.Redacted<string>;
  TraceId?: string;
  Devices?: Device[];
  MatterEndpoint?: MatterEndpoint;
}
export const SendConnectorEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorId: S.String.pipe(T.HttpLabel("ConnectorId")),
    UserId: S.optional(SensitiveString),
    Operation: ConnectorEventOperation,
    OperationVersion: S.optional(S.String),
    StatusCode: S.optional(S.Number),
    Message: S.optional(SensitiveString),
    DeviceDiscoveryId: S.optional(S.String),
    ConnectorDeviceId: S.optional(SensitiveString),
    TraceId: S.optional(S.String),
    Devices: S.optional(Devices),
    MatterEndpoint: S.optional(MatterEndpoint),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connector-event/{ConnectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendConnectorEventRequest",
}) as any as S.Schema<SendConnectorEventRequest>;
export interface SendConnectorEventResponse {
  ConnectorId: string;
}
export const SendConnectorEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorId: S.String }),
).annotate({
  identifier: "SendConnectorEventResponse",
}) as any as S.Schema<SendConnectorEventResponse>;
export type CapabilityActionName = string;
export type ActionReference = string;
export type ActionTraceId = string;
export interface CapabilityAction {
  name: string;
  ref?: string;
  actionTraceId?: string;
  parameters?: any;
}
export const CapabilityAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    ref: S.optional(S.String),
    actionTraceId: S.optional(S.String),
    parameters: S.optional(S.Any),
  }),
).annotate({
  identifier: "CapabilityAction",
}) as any as S.Schema<CapabilityAction>;
export type CapabilityActions = CapabilityAction[];
export const CapabilityActions = /*@__PURE__*/ S.Array(CapabilityAction);
export interface CommandCapability {
  id: string;
  name: string;
  version: string;
  actions: CapabilityAction[];
}
export const CommandCapability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    version: S.String,
    actions: CapabilityActions,
  }),
).annotate({
  identifier: "CommandCapability",
}) as any as S.Schema<CommandCapability>;
export type CommandCapabilities = CommandCapability[];
export const CommandCapabilities = /*@__PURE__*/ S.Array(CommandCapability);
export interface CommandEndpoint {
  endpointId: string;
  capabilities: CommandCapability[];
}
export const CommandEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointId: S.String, capabilities: CommandCapabilities }),
).annotate({
  identifier: "CommandEndpoint",
}) as any as S.Schema<CommandEndpoint>;
export type CommandEndpoints = CommandEndpoint[];
export const CommandEndpoints = /*@__PURE__*/ S.Array(CommandEndpoint);
export interface SendManagedThingCommandRequest {
  ManagedThingId: string;
  Endpoints: CommandEndpoint[];
  ConnectorAssociationId?: string;
  AccountAssociationId?: string;
}
export const SendManagedThingCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedThingId: S.String.pipe(T.HttpLabel("ManagedThingId")),
    Endpoints: CommandEndpoints,
    ConnectorAssociationId: S.optional(S.String),
    AccountAssociationId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/managed-things-command/{ManagedThingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendManagedThingCommandRequest",
}) as any as S.Schema<SendManagedThingCommandRequest>;
export interface SendManagedThingCommandResponse {
  TraceId?: string;
}
export const SendManagedThingCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TraceId: S.optional(S.String) }),
).annotate({
  identifier: "SendManagedThingCommandResponse",
}) as any as S.Schema<SendManagedThingCommandResponse>;
export interface StartAccountAssociationRefreshRequest {
  AccountAssociationId: string;
}
export const StartAccountAssociationRefreshRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/account-associations/{AccountAssociationId}/refresh",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartAccountAssociationRefreshRequest",
}) as any as S.Schema<StartAccountAssociationRefreshRequest>;
export interface StartAccountAssociationRefreshResponse {
  OAuthAuthorizationUrl: string | redacted.Redacted<string>;
}
export const StartAccountAssociationRefreshResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ OAuthAuthorizationUrl: SensitiveString }),
).annotate({
  identifier: "StartAccountAssociationRefreshResponse",
}) as any as S.Schema<StartAccountAssociationRefreshResponse>;
export type CustomProtocolDetailKey = string;
export type CustomProtocolDetailValue = string;
export type CustomProtocolDetail = { [key: string]: string | undefined };
export const CustomProtocolDetail = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DiscoveryAuthMaterialString = string | redacted.Redacted<string>;
export type DiscoveryAuthMaterialType = "ZWAVE_INSTALL_CODE" | (string & {});
export const DiscoveryAuthMaterialType = S.String;

export type ConnectorDeviceIdList = (string | redacted.Redacted<string>)[];
export const ConnectorDeviceIdList = /*@__PURE__*/ S.Array(SensitiveString);
export type ProtocolType = "ZWAVE" | "ZIGBEE" | "CUSTOM" | (string & {});
export const ProtocolType = S.String;

export interface StartDeviceDiscoveryRequest {
  DiscoveryType: DiscoveryType;
  CustomProtocolDetail?: { [key: string]: string | undefined };
  ControllerIdentifier?: string;
  ConnectorAssociationIdentifier?: string;
  AccountAssociationId?: string;
  AuthenticationMaterial?: string | redacted.Redacted<string>;
  AuthenticationMaterialType?: DiscoveryAuthMaterialType;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ConnectorDeviceIdList?: (string | redacted.Redacted<string>)[];
  Protocol?: ProtocolType;
  EndDeviceIdentifier?: string;
}
export const StartDeviceDiscoveryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DiscoveryType: DiscoveryType,
    CustomProtocolDetail: S.optional(CustomProtocolDetail),
    ControllerIdentifier: S.optional(S.String),
    ConnectorAssociationIdentifier: S.optional(S.String),
    AccountAssociationId: S.optional(S.String),
    AuthenticationMaterial: S.optional(SensitiveString),
    AuthenticationMaterialType: S.optional(DiscoveryAuthMaterialType),
    ClientToken: S.optional(S.String),
    Tags: S.optional(TagsMap),
    ConnectorDeviceIdList: S.optional(ConnectorDeviceIdList),
    Protocol: S.optional(ProtocolType),
    EndDeviceIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/device-discoveries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDeviceDiscoveryRequest",
}) as any as S.Schema<StartDeviceDiscoveryRequest>;
export interface StartDeviceDiscoveryResponse {
  Id?: string;
  StartedAt?: Date;
}
export const StartDeviceDiscoveryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "StartDeviceDiscoveryResponse",
}) as any as S.Schema<StartDeviceDiscoveryResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagsMap,
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
export interface UpdateAccountAssociationRequest {
  AccountAssociationId: string;
  Name?: string;
  Description?: string;
}
export const UpdateAccountAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAssociationId: S.String.pipe(T.HttpLabel("AccountAssociationId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/account-associations/{AccountAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountAssociationRequest",
}) as any as S.Schema<UpdateAccountAssociationRequest>;
export interface UpdateAccountAssociationResponse {}
export const UpdateAccountAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAccountAssociationResponse",
}) as any as S.Schema<UpdateAccountAssociationResponse>;
export interface UpdateCloudConnectorRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
}
export const UpdateCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/cloud-connectors/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCloudConnectorRequest",
}) as any as S.Schema<UpdateCloudConnectorRequest>;
export interface UpdateCloudConnectorResponse {}
export const UpdateCloudConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCloudConnectorResponse",
}) as any as S.Schema<UpdateCloudConnectorResponse>;
export interface OAuthUpdate {
  oAuthCompleteRedirectUrl?: string;
  proactiveRefreshTokenRenewal?: ProactiveRefreshTokenRenewal;
}
export const OAuthUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oAuthCompleteRedirectUrl: S.optional(S.String),
    proactiveRefreshTokenRenewal: S.optional(ProactiveRefreshTokenRenewal),
  }),
).annotate({ identifier: "OAuthUpdate" }) as any as S.Schema<OAuthUpdate>;
export interface GeneralAuthorizationUpdate {
  AuthMaterialsToAdd?: AuthMaterial[];
  AuthMaterialsToUpdate?: AuthMaterial[];
}
export const GeneralAuthorizationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthMaterialsToAdd: S.optional(AuthMaterials),
    AuthMaterialsToUpdate: S.optional(AuthMaterials),
  }),
).annotate({
  identifier: "GeneralAuthorizationUpdate",
}) as any as S.Schema<GeneralAuthorizationUpdate>;
export interface AuthConfigUpdate {
  oAuthUpdate?: OAuthUpdate;
  GeneralAuthorizationUpdate?: GeneralAuthorizationUpdate;
}
export const AuthConfigUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oAuthUpdate: S.optional(OAuthUpdate),
    GeneralAuthorizationUpdate: S.optional(GeneralAuthorizationUpdate),
  }),
).annotate({
  identifier: "AuthConfigUpdate",
}) as any as S.Schema<AuthConfigUpdate>;
export interface UpdateConnectorDestinationRequest {
  Identifier: string;
  Description?: string;
  Name?: string;
  AuthType?: AuthType;
  AuthConfig?: AuthConfigUpdate;
  SecretsManager?: SecretsManager;
}
export const UpdateConnectorDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    AuthType: S.optional(AuthType),
    AuthConfig: S.optional(AuthConfigUpdate),
    SecretsManager: S.optional(SecretsManager),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/connector-destinations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorDestinationRequest",
}) as any as S.Schema<UpdateConnectorDestinationRequest>;
export interface UpdateConnectorDestinationResponse {}
export const UpdateConnectorDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConnectorDestinationResponse",
}) as any as S.Schema<UpdateConnectorDestinationResponse>;
export interface UpdateDestinationRequest {
  Name: string;
  DeliveryDestinationArn?: string;
  DeliveryDestinationType?: DeliveryDestinationType;
  RoleArn?: string;
  Description?: string;
}
export const UpdateDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    DeliveryDestinationArn: S.optional(S.String),
    DeliveryDestinationType: S.optional(DeliveryDestinationType),
    RoleArn: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/destinations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDestinationRequest",
}) as any as S.Schema<UpdateDestinationRequest>;
export interface UpdateDestinationResponse {}
export const UpdateDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDestinationResponse",
}) as any as S.Schema<UpdateDestinationResponse>;
export interface UpdateEventLogConfigurationRequest {
  Id: string;
  EventLogLevel: LogLevel;
}
export const UpdateEventLogConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String.pipe(T.HttpLabel("Id")),
    EventLogLevel: LogLevel,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/event-log-configurations/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventLogConfigurationRequest",
}) as any as S.Schema<UpdateEventLogConfigurationRequest>;
export interface UpdateEventLogConfigurationResponse {}
export const UpdateEventLogConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEventLogConfigurationResponse",
}) as any as S.Schema<UpdateEventLogConfigurationResponse>;
export interface UpdateManagedThingRequest {
  Identifier: string;
  Owner?: string | redacted.Redacted<string>;
  CredentialLockerId?: string;
  SerialNumber?: string | redacted.Redacted<string>;
  WiFiSimpleSetupConfiguration?: WiFiSimpleSetupConfiguration;
  Brand?: string | redacted.Redacted<string>;
  Model?: string | redacted.Redacted<string>;
  Name?: string;
  CapabilityReport?: CapabilityReport;
  CapabilitySchemas?: CapabilitySchemaItem[];
  Capabilities?: string;
  Classification?: string | redacted.Redacted<string>;
  HubNetworkMode?: HubNetworkMode;
  MetaData?: { [key: string]: string | undefined };
}
export const UpdateManagedThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Owner: S.optional(SensitiveString),
    CredentialLockerId: S.optional(S.String),
    SerialNumber: S.optional(SensitiveString),
    WiFiSimpleSetupConfiguration: S.optional(WiFiSimpleSetupConfiguration),
    Brand: S.optional(SensitiveString),
    Model: S.optional(SensitiveString),
    Name: S.optional(S.String),
    CapabilityReport: S.optional(CapabilityReport),
    CapabilitySchemas: S.optional(CapabilitySchemas),
    Capabilities: S.optional(S.String),
    Classification: S.optional(SensitiveString),
    HubNetworkMode: S.optional(HubNetworkMode),
    MetaData: S.optional(MetaData),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/managed-things/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateManagedThingRequest",
}) as any as S.Schema<UpdateManagedThingRequest>;
export interface UpdateManagedThingResponse {}
export const UpdateManagedThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateManagedThingResponse",
}) as any as S.Schema<UpdateManagedThingResponse>;
export interface UpdateNotificationConfigurationRequest {
  EventType: EventType;
  DestinationName: string;
}
export const UpdateNotificationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventType: EventType.pipe(T.HttpLabel("EventType")),
      DestinationName: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/notification-configurations/{EventType}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNotificationConfigurationRequest",
}) as any as S.Schema<UpdateNotificationConfigurationRequest>;
export interface UpdateNotificationConfigurationResponse {}
export const UpdateNotificationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateNotificationConfigurationResponse",
}) as any as S.Schema<UpdateNotificationConfigurationResponse>;
export interface UpdateOtaTaskRequest {
  Identifier: string;
  Description?: string;
  TaskConfigurationId?: string;
}
export const UpdateOtaTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Description: S.optional(S.String),
    TaskConfigurationId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/ota-tasks/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOtaTaskRequest",
}) as any as S.Schema<UpdateOtaTaskRequest>;
export interface UpdateOtaTaskResponse {}
export const UpdateOtaTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateOtaTaskResponse",
}) as any as S.Schema<UpdateOtaTaskResponse>;
export type ErrorMessage = string;
export type ErrorResourceId = string;
export type ErrorResourceType = string;
export type CreateAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new account association via the destination id.
 */
export const createAccountAssociation: API.OperationMethod<
  CreateAccountAssociationRequest,
  CreateAccountAssociationResponse,
  CreateAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccountAssociationRequest,
  output: CreateAccountAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountAssociation",
}));

export type CreateCloudConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a C2C (cloud-to-cloud) connector.
 */
export const createCloudConnector: API.OperationMethod<
  CreateCloudConnectorRequest,
  CreateCloudConnectorResponse,
  CreateCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudConnectorRequest,
  output: CreateCloudConnectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudConnector",
}));

export type CreateConnectorDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create a connector destination for connecting a cloud-to-cloud (C2C) connector to the customer's Amazon Web Services account.
 */
export const createConnectorDestination: API.OperationMethod<
  CreateConnectorDestinationRequest,
  CreateConnectorDestinationResponse,
  CreateConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorDestinationRequest,
  output: CreateConnectorDestinationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDestination",
}));

export type CreateCredentialLockerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a credential locker.
 *
 * This operation will not trigger the creation of all the manufacturing resources.
 */
export const createCredentialLocker: API.OperationMethod<
  CreateCredentialLockerRequest,
  CreateCredentialLockerResponse,
  CreateCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCredentialLockerRequest,
  output: CreateCredentialLockerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCredentialLocker",
}));

export type CreateDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a notification destination such as Kinesis Data Streams that receive events and notifications from Managed integrations. Managed integrations uses the destination to determine where to deliver notifications.
 */
export const createDestination: API.OperationMethod<
  CreateDestinationRequest,
  CreateDestinationResponse,
  CreateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDestinationRequest,
  output: CreateDestinationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDestination",
}));

export type CreateEventLogConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the event log configuration for the account, resource type, or specific resource.
 */
export const createEventLogConfiguration: API.OperationMethod<
  CreateEventLogConfigurationRequest,
  CreateEventLogConfigurationResponse,
  CreateEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventLogConfigurationRequest,
  output: CreateEventLogConfigurationResponse,
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
  operationName: "CreateEventLogConfiguration",
}));

export type CreateManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a managed thing. A managed thing contains the device identifier, protocol supported, and capabilities of the device in a data model format defined by Managed integrations.
 */
export const createManagedThing: API.OperationMethod<
  CreateManagedThingRequest,
  CreateManagedThingResponse,
  CreateManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateManagedThingRequest,
  output: CreateManagedThingResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedThing",
}));

export type CreateNotificationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notification configuration. A configuration is a connection between an event type and a destination that you have already created.
 */
export const createNotificationConfiguration: API.OperationMethod<
  CreateNotificationConfigurationRequest,
  CreateNotificationConfigurationResponse,
  CreateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotificationConfigurationRequest,
  output: CreateNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationConfiguration",
}));

export type CreateOtaTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create an over-the-air (OTA) task to target a device.
 */
export const createOtaTask: API.OperationMethod<
  CreateOtaTaskRequest,
  CreateOtaTaskResponse,
  CreateOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOtaTaskRequest,
  output: CreateOtaTaskResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOtaTask",
}));

export type CreateOtaTaskConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a configuraiton for the over-the-air (OTA) task.
 */
export const createOtaTaskConfiguration: API.OperationMethod<
  CreateOtaTaskConfigurationRequest,
  CreateOtaTaskConfigurationResponse,
  CreateOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOtaTaskConfigurationRequest,
  output: CreateOtaTaskConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOtaTaskConfiguration",
}));

export type CreateProvisioningProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Create a provisioning profile for executing device provisioning flows. The provisioning profile is a document that defines the set of resources and policies applied to a device during the provisioning process.
 */
export const createProvisioningProfile: API.OperationMethod<
  CreateProvisioningProfileRequest,
  CreateProvisioningProfileResponse,
  CreateProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisioningProfileRequest,
  output: CreateProvisioningProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningProfile",
}));

export type DeleteAccountAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a third-party account association for an end user.
 *
 * You must first call the `DeregisterAccountAssociation` to remove the connection between the managed thing and the third-party account before calling the `DeleteAccountAssociation` API.
 */
export const deleteAccountAssociation: API.OperationMethod<
  DeleteAccountAssociationRequest,
  DeleteAccountAssociationResponse,
  DeleteAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountAssociationRequest,
  output: DeleteAccountAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAssociation",
}));

export type DeleteCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a cloud connector.
 */
export const deleteCloudConnector: API.OperationMethod<
  DeleteCloudConnectorRequest,
  DeleteCloudConnectorResponse,
  DeleteCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudConnectorRequest,
  output: DeleteCloudConnectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudConnector",
}));

export type DeleteConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a connector destination linked to a cloud-to-cloud (C2C) connector.
 *
 * Deletion can't be done if the account association has used this connector destination.
 */
export const deleteConnectorDestination: API.OperationMethod<
  DeleteConnectorDestinationRequest,
  DeleteConnectorDestinationResponse,
  DeleteConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorDestinationRequest,
  output: DeleteConnectorDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorDestination",
}));

export type DeleteCredentialLockerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a credential locker.
 *
 * This operation can't be undone and any existing device won't be able to use IoT managed integrations.
 */
export const deleteCredentialLocker: API.OperationMethod<
  DeleteCredentialLockerRequest,
  DeleteCredentialLockerResponse,
  DeleteCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCredentialLockerRequest,
  output: DeleteCredentialLockerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCredentialLocker",
}));

export type DeleteDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notification destination specified by name.
 */
export const deleteDestination: API.OperationMethod<
  DeleteDestinationRequest,
  DeleteDestinationResponse,
  DeleteDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDestinationRequest,
  output: DeleteDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDestination",
}));

export type DeleteEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an event log configuration.
 */
export const deleteEventLogConfiguration: API.OperationMethod<
  DeleteEventLogConfigurationRequest,
  DeleteEventLogConfigurationResponse,
  DeleteEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventLogConfigurationRequest,
  output: DeleteEventLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventLogConfiguration",
}));

export type DeleteManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a managed thing. For direct-connected and hub-connected devices connecting with Managed integrations via a controller, all of the devices connected to it will have their status changed to `PENDING`. It is not possible to remove a cloud-to-cloud device.
 */
export const deleteManagedThing: API.OperationMethod<
  DeleteManagedThingRequest,
  DeleteManagedThingResponse,
  DeleteManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteManagedThingRequest,
  output: DeleteManagedThingResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedThing",
}));

export type DeleteNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notification configuration.
 */
export const deleteNotificationConfiguration: API.OperationMethod<
  DeleteNotificationConfigurationRequest,
  DeleteNotificationConfigurationResponse,
  DeleteNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotificationConfigurationRequest,
  output: DeleteNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationConfiguration",
}));

export type DeleteOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the over-the-air (OTA) task.
 */
export const deleteOtaTask: API.OperationMethod<
  DeleteOtaTaskRequest,
  DeleteOtaTaskResponse,
  DeleteOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOtaTaskRequest,
  output: DeleteOtaTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOtaTask",
}));

export type DeleteOtaTaskConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the over-the-air (OTA) task configuration.
 */
export const deleteOtaTaskConfiguration: API.OperationMethod<
  DeleteOtaTaskConfigurationRequest,
  DeleteOtaTaskConfigurationResponse,
  DeleteOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOtaTaskConfigurationRequest,
  output: DeleteOtaTaskConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOtaTaskConfiguration",
}));

export type DeleteProvisioningProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete a provisioning profile.
 */
export const deleteProvisioningProfile: API.OperationMethod<
  DeleteProvisioningProfileRequest,
  DeleteProvisioningProfileResponse,
  DeleteProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisioningProfileRequest,
  output: DeleteProvisioningProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningProfile",
}));

export type DeregisterAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregister an account association from a managed thing.
 */
export const deregisterAccountAssociation: API.OperationMethod<
  DeregisterAccountAssociationRequest,
  DeregisterAccountAssociationResponse,
  DeregisterAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterAccountAssociationRequest,
  output: DeregisterAccountAssociationResponse,
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
  operationName: "DeregisterAccountAssociation",
}));

export type GetAccountAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an account association for an Amazon Web Services account linked to a customer-managed destination.
 */
export const getAccountAssociation: API.OperationMethod<
  GetAccountAssociationRequest,
  GetAccountAssociationResponse,
  GetAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountAssociationRequest,
  output: GetAccountAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAssociation",
}));

export type GetCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get configuration details for a cloud connector.
 */
export const getCloudConnector: API.OperationMethod<
  GetCloudConnectorRequest,
  GetCloudConnectorResponse,
  GetCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudConnectorRequest,
  output: GetCloudConnectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudConnector",
}));

export type GetConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get connector destination details linked to a cloud-to-cloud (C2C) connector.
 */
export const getConnectorDestination: API.OperationMethod<
  GetConnectorDestinationRequest,
  GetConnectorDestinationResponse,
  GetConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectorDestinationRequest,
  output: GetConnectorDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDestination",
}));

export type GetCredentialLockerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information on an existing credential locker
 */
export const getCredentialLocker: API.OperationMethod<
  GetCredentialLockerRequest,
  GetCredentialLockerResponse,
  GetCredentialLockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCredentialLockerRequest,
  output: GetCredentialLockerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentialLocker",
}));

export type GetCustomEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the IoT managed integrations custom endpoint.
 */
export const getCustomEndpoint: API.OperationMethod<
  GetCustomEndpointRequest,
  GetCustomEndpointResponse,
  GetCustomEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomEndpointRequest,
  output: GetCustomEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomEndpoint",
}));

export type GetDefaultEncryptionConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the default encryption configuration for the Amazon Web Services account in the default or specified region. For more information, see Key management in the *AWS IoT SiteWise User Guide*.
 */
export const getDefaultEncryptionConfiguration: API.OperationMethod<
  GetDefaultEncryptionConfigurationRequest,
  GetDefaultEncryptionConfigurationResponse,
  GetDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDefaultEncryptionConfigurationRequest,
  output: GetDefaultEncryptionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultEncryptionConfiguration",
}));

export type GetDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a destination by name.
 */
export const getDestination: API.OperationMethod<
  GetDestinationRequest,
  GetDestinationResponse,
  GetDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDestinationRequest,
  output: GetDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDestination",
}));

export type GetDeviceDiscoveryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the current state of a device discovery.
 */
export const getDeviceDiscovery: API.OperationMethod<
  GetDeviceDiscoveryRequest,
  GetDeviceDiscoveryResponse,
  GetDeviceDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceDiscoveryRequest,
  output: GetDeviceDiscoveryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDiscovery",
}));

export type GetEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an event log configuration.
 */
export const getEventLogConfiguration: API.OperationMethod<
  GetEventLogConfigurationRequest,
  GetEventLogConfigurationResponse,
  GetEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventLogConfigurationRequest,
  output: GetEventLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventLogConfiguration",
}));

export type GetHubConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a hub configuration.
 */
export const getHubConfiguration: API.OperationMethod<
  GetHubConfigurationRequest,
  GetHubConfigurationResponse,
  GetHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHubConfigurationRequest,
  output: GetHubConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHubConfiguration",
}));

export type GetManagedThingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a managed thing including its attributes and capabilities.
 */
export const getManagedThing: API.OperationMethod<
  GetManagedThingRequest,
  GetManagedThingResponse,
  GetManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingRequest,
  output: GetManagedThingResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThing",
}));

export type GetManagedThingCapabilitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the capabilities for a managed thing using the device ID.
 */
export const getManagedThingCapabilities: API.OperationMethod<
  GetManagedThingCapabilitiesRequest,
  GetManagedThingCapabilitiesResponse,
  GetManagedThingCapabilitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingCapabilitiesRequest,
  output: GetManagedThingCapabilitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingCapabilities",
}));

export type GetManagedThingCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the certificate PEM for a managed IoT thing.
 */
export const getManagedThingCertificate: API.OperationMethod<
  GetManagedThingCertificateRequest,
  GetManagedThingCertificateResponse,
  GetManagedThingCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingCertificateRequest,
  output: GetManagedThingCertificateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingCertificate",
}));

export type GetManagedThingConnectivityDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the connectivity status of a managed thing.
 */
export const getManagedThingConnectivityData: API.OperationMethod<
  GetManagedThingConnectivityDataRequest,
  GetManagedThingConnectivityDataResponse,
  GetManagedThingConnectivityDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingConnectivityDataRequest,
  output: GetManagedThingConnectivityDataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingConnectivityData",
}));

export type GetManagedThingMetaDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get the metadata information for a managed thing.
 *
 * The `managedThing` `metadata` parameter is used for associating attributes with a `managedThing` that can be used for grouping over-the-air (OTA) tasks. Name value pairs in `metadata` can be used in the `OtaTargetQueryString` parameter for the `CreateOtaTask` API operation.
 */
export const getManagedThingMetaData: API.OperationMethod<
  GetManagedThingMetaDataRequest,
  GetManagedThingMetaDataResponse,
  GetManagedThingMetaDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingMetaDataRequest,
  output: GetManagedThingMetaDataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingMetaData",
}));

export type GetManagedThingStateError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the managed thing state for the given device Id.
 */
export const getManagedThingState: API.OperationMethod<
  GetManagedThingStateRequest,
  GetManagedThingStateResponse,
  GetManagedThingStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedThingStateRequest,
  output: GetManagedThingStateResponse,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedThingState",
}));

export type GetNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a notification configuration for a specified event type.
 */
export const getNotificationConfiguration: API.OperationMethod<
  GetNotificationConfigurationRequest,
  GetNotificationConfigurationResponse,
  GetNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotificationConfigurationRequest,
  output: GetNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationConfiguration",
}));

export type GetOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details of the over-the-air (OTA) task by its task id.
 */
export const getOtaTask: API.OperationMethod<
  GetOtaTaskRequest,
  GetOtaTaskResponse,
  GetOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOtaTaskRequest,
  output: GetOtaTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOtaTask",
}));

export type GetOtaTaskConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a configuraiton for the over-the-air (OTA) task.
 */
export const getOtaTaskConfiguration: API.OperationMethod<
  GetOtaTaskConfigurationRequest,
  GetOtaTaskConfigurationResponse,
  GetOtaTaskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOtaTaskConfigurationRequest,
  output: GetOtaTaskConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOtaTaskConfiguration",
}));

export type GetProvisioningProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a provisioning profile.
 */
export const getProvisioningProfile: API.OperationMethod<
  GetProvisioningProfileRequest,
  GetProvisioningProfileResponse,
  GetProvisioningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProvisioningProfileRequest,
  output: GetProvisioningProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisioningProfile",
}));

export type GetRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the runtime log configuration for a specific managed thing.
 */
export const getRuntimeLogConfiguration: API.OperationMethod<
  GetRuntimeLogConfigurationRequest,
  GetRuntimeLogConfigurationResponse,
  GetRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuntimeLogConfigurationRequest,
  output: GetRuntimeLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeLogConfiguration",
}));

export type GetSchemaVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a schema version with the provided information.
 */
export const getSchemaVersion: API.OperationMethod<
  GetSchemaVersionRequest,
  GetSchemaVersionResponse,
  GetSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaVersionRequest,
  output: GetSchemaVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersion",
}));

export type ListAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account associations, with optional filtering by connector destination ID.
 */
export const listAccountAssociations: API.PaginatedOperationMethod<
  ListAccountAssociationsRequest,
  ListAccountAssociationsResponse,
  ListAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  AccountAssociationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssociationsRequest,
  output: ListAccountAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of connectors filtered by its Lambda Amazon Resource Name (ARN) and `type`.
 */
export const listCloudConnectors: API.PaginatedOperationMethod<
  ListCloudConnectorsRequest,
  ListCloudConnectorsResponse,
  ListCloudConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudConnectorsRequest,
  output: ListCloudConnectorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all connector destinations, with optional filtering by cloud connector ID.
 */
export const listConnectorDestinations: API.PaginatedOperationMethod<
  ListConnectorDestinationsRequest,
  ListConnectorDestinationsResponse,
  ListConnectorDestinationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorDestinationsRequest,
  output: ListConnectorDestinationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectorDestinationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCredentialLockersError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List information on an existing credential locker.
 */
export const listCredentialLockers: API.PaginatedOperationMethod<
  ListCredentialLockersRequest,
  ListCredentialLockersResponse,
  ListCredentialLockersError,
  Credentials | HttpClient.HttpClient,
  CredentialLockerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCredentialLockersRequest,
  output: ListCredentialLockersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCredentialLockers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all notification destinations.
 */
export const listDestinations: API.PaginatedOperationMethod<
  ListDestinationsRequest,
  ListDestinationsResponse,
  ListDestinationsError,
  Credentials | HttpClient.HttpClient,
  DestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDestinationsRequest,
  output: ListDestinationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DestinationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeviceDiscoveriesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all device discovery tasks, with optional filtering by type and status.
 */
export const listDeviceDiscoveries: API.PaginatedOperationMethod<
  ListDeviceDiscoveriesRequest,
  ListDeviceDiscoveriesResponse,
  ListDeviceDiscoveriesError,
  Credentials | HttpClient.HttpClient,
  DeviceDiscoverySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeviceDiscoveriesRequest,
  output: ListDeviceDiscoveriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDiscoveries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all devices discovered during a specific device discovery task.
 */
export const listDiscoveredDevices: API.PaginatedOperationMethod<
  ListDiscoveredDevicesRequest,
  ListDiscoveredDevicesResponse,
  ListDiscoveredDevicesError,
  Credentials | HttpClient.HttpClient,
  DiscoveredDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDiscoveredDevicesRequest,
  output: ListDiscoveredDevicesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventLogConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all event log configurations for an account.
 */
export const listEventLogConfigurations: API.PaginatedOperationMethod<
  ListEventLogConfigurationsRequest,
  ListEventLogConfigurationsResponse,
  ListEventLogConfigurationsError,
  Credentials | HttpClient.HttpClient,
  EventLogConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventLogConfigurationsRequest,
  output: ListEventLogConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventLogConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventLogConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all account associations for a specific managed thing.
 */
export const listManagedThingAccountAssociations: API.PaginatedOperationMethod<
  ListManagedThingAccountAssociationsRequest,
  ListManagedThingAccountAssociationsResponse,
  ListManagedThingAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  ManagedThingAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedThingAccountAssociationsRequest,
  output: ListManagedThingAccountAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThingAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Listing all managed things with provision for filters.
 */
export const listManagedThings: API.PaginatedOperationMethod<
  ListManagedThingsRequest,
  ListManagedThingsResponse,
  ListManagedThingsError,
  Credentials | HttpClient.HttpClient,
  ManagedThingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedThingsRequest,
  output: ListManagedThingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedThingSchemasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * List schemas associated with a managed thing.
 */
export const listManagedThingSchemas: API.PaginatedOperationMethod<
  ListManagedThingSchemasRequest,
  ListManagedThingSchemasResponse,
  ListManagedThingSchemasError,
  Credentials | HttpClient.HttpClient,
  ManagedThingSchemaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedThingSchemasRequest,
  output: ListManagedThingSchemasResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedThingSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all notification configurations.
 */
export const listNotificationConfigurations: API.PaginatedOperationMethod<
  ListNotificationConfigurationsRequest,
  ListNotificationConfigurationsResponse,
  ListNotificationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotificationConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationConfigurationsRequest,
  output: ListNotificationConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotificationConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTaskConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) task configurations.
 */
export const listOtaTaskConfigurations: API.PaginatedOperationMethod<
  ListOtaTaskConfigurationsRequest,
  ListOtaTaskConfigurationsResponse,
  ListOtaTaskConfigurationsError,
  Credentials | HttpClient.HttpClient,
  OtaTaskConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOtaTaskConfigurationsRequest,
  output: ListOtaTaskConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTaskConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTaskExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) task executions.
 */
export const listOtaTaskExecutions: API.PaginatedOperationMethod<
  ListOtaTaskExecutionsRequest,
  ListOtaTaskExecutionsResponse,
  ListOtaTaskExecutionsError,
  Credentials | HttpClient.HttpClient,
  OtaTaskExecutionSummaries
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOtaTaskExecutionsRequest,
  output: ListOtaTaskExecutionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTaskExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExecutionSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOtaTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all of the over-the-air (OTA) tasks.
 */
export const listOtaTasks: API.PaginatedOperationMethod<
  ListOtaTasksRequest,
  ListOtaTasksResponse,
  ListOtaTasksError,
  Credentials | HttpClient.HttpClient,
  OtaTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOtaTasksRequest,
  output: ListOtaTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOtaTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProvisioningProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * List the provisioning profiles within the Amazon Web Services account.
 */
export const listProvisioningProfiles: API.PaginatedOperationMethod<
  ListProvisioningProfilesRequest,
  ListProvisioningProfilesResponse,
  ListProvisioningProfilesError,
  Credentials | HttpClient.HttpClient,
  ProvisioningProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisioningProfilesRequest,
  output: ListProvisioningProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemaVersionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists schema versions with the provided information.
 */
export const listSchemaVersions: API.PaginatedOperationMethod<
  ListSchemaVersionsRequest,
  ListSchemaVersionsResponse,
  ListSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  SchemaVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemaVersionsRequest,
  output: ListSchemaVersionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the tags for a specified resource.
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
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutDefaultEncryptionConfigurationError =
  | AccessDeniedException
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default encryption configuration for the Amazon Web Services account. For more information, see Key management in the AWS IoT SiteWise User Guide.
 */
export const putDefaultEncryptionConfiguration: API.OperationMethod<
  PutDefaultEncryptionConfigurationRequest,
  PutDefaultEncryptionConfigurationResponse,
  PutDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDefaultEncryptionConfigurationRequest,
  output: PutDefaultEncryptionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultEncryptionConfiguration",
}));

export type PutHubConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a hub configuration.
 */
export const putHubConfiguration: API.OperationMethod<
  PutHubConfigurationRequest,
  PutHubConfigurationResponse,
  PutHubConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutHubConfigurationRequest,
  output: PutHubConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutHubConfiguration",
}));

export type PutRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the runtime log configuration for a specific managed thing.
 */
export const putRuntimeLogConfiguration: API.OperationMethod<
  PutRuntimeLogConfigurationRequest,
  PutRuntimeLogConfigurationResponse,
  PutRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRuntimeLogConfigurationRequest,
  output: PutRuntimeLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRuntimeLogConfiguration",
}));

export type RegisterAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an account association with a managed thing, establishing a connection between a device and a third-party account.
 */
export const registerAccountAssociation: API.OperationMethod<
  RegisterAccountAssociationRequest,
  RegisterAccountAssociationResponse,
  RegisterAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterAccountAssociationRequest,
  output: RegisterAccountAssociationResponse,
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
  operationName: "RegisterAccountAssociation",
}));

export type RegisterCustomEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Customers can request IoT managed integrations to manage the server trust for them or bring their own external server trusts for the custom domain. Returns an IoT managed integrations endpoint.
 */
export const registerCustomEndpoint: API.OperationMethod<
  RegisterCustomEndpointRequest,
  RegisterCustomEndpointResponse,
  RegisterCustomEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCustomEndpointRequest,
  output: RegisterCustomEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCustomEndpoint",
}));

export type ResetRuntimeLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reset a runtime log configuration for a specific managed thing.
 */
export const resetRuntimeLogConfiguration: API.OperationMethod<
  ResetRuntimeLogConfigurationRequest,
  ResetRuntimeLogConfigurationResponse,
  ResetRuntimeLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetRuntimeLogConfigurationRequest,
  output: ResetRuntimeLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetRuntimeLogConfiguration",
}));

export type SendConnectorEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Relays third-party device events for a connector such as a new device or a device state change event.
 */
export const sendConnectorEvent: API.OperationMethod<
  SendConnectorEventRequest,
  SendConnectorEventResponse,
  SendConnectorEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendConnectorEventRequest,
  output: SendConnectorEventResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendConnectorEvent",
}));

export type SendManagedThingCommandError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Send the command to the device represented by the managed thing.
 */
export const sendManagedThingCommand: API.OperationMethod<
  SendManagedThingCommandRequest,
  SendManagedThingCommandResponse,
  SendManagedThingCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendManagedThingCommandRequest,
  output: SendManagedThingCommandResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendManagedThingCommand",
}));

export type StartAccountAssociationRefreshError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a refresh of an existing account association to update its authorization and connection status.
 */
export const startAccountAssociationRefresh: API.OperationMethod<
  StartAccountAssociationRefreshRequest,
  StartAccountAssociationRefreshResponse,
  StartAccountAssociationRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAccountAssociationRefreshRequest,
  output: StartAccountAssociationRefreshResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccountAssociationRefresh",
}));

export type StartDeviceDiscoveryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to start device discovery for hub-connected and third-party-connected devices. The authentication material (install code) is delivered as a message to the controller instructing it to start the discovery.
 */
export const startDeviceDiscovery: API.OperationMethod<
  StartDeviceDiscoveryRequest,
  StartDeviceDiscoveryResponse,
  StartDeviceDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDeviceDiscoveryRequest,
  output: StartDeviceDiscoveryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeviceDiscovery",
}));

export type TagResourceError =
  | ConflictException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds tags to a specified resource.
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
    ConflictException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes tags from a specified resource.
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
    ConflictException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an existing account association.
 */
export const updateAccountAssociation: API.OperationMethod<
  UpdateAccountAssociationRequest,
  UpdateAccountAssociationResponse,
  UpdateAccountAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountAssociationRequest,
  output: UpdateAccountAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountAssociation",
}));

export type UpdateCloudConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing cloud connector.
 */
export const updateCloudConnector: API.OperationMethod<
  UpdateCloudConnectorRequest,
  UpdateCloudConnectorResponse,
  UpdateCloudConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCloudConnectorRequest,
  output: UpdateCloudConnectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudConnector",
}));

export type UpdateConnectorDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an existing connector destination.
 */
export const updateConnectorDestination: API.OperationMethod<
  UpdateConnectorDestinationRequest,
  UpdateConnectorDestinationResponse,
  UpdateConnectorDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectorDestinationRequest,
  output: UpdateConnectorDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorDestination",
}));

export type UpdateDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a destination specified by name.
 */
export const updateDestination: API.OperationMethod<
  UpdateDestinationRequest,
  UpdateDestinationResponse,
  UpdateDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDestinationRequest,
  output: UpdateDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDestination",
}));

export type UpdateEventLogConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an event log configuration by log configuration ID.
 */
export const updateEventLogConfiguration: API.OperationMethod<
  UpdateEventLogConfigurationRequest,
  UpdateEventLogConfigurationResponse,
  UpdateEventLogConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventLogConfigurationRequest,
  output: UpdateEventLogConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventLogConfiguration",
}));

export type UpdateManagedThingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Update the attributes and capabilities associated with a managed thing.
 */
export const updateManagedThing: API.OperationMethod<
  UpdateManagedThingRequest,
  UpdateManagedThingResponse,
  UpdateManagedThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateManagedThingRequest,
  output: UpdateManagedThingResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedThing",
}));

export type UpdateNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a notification configuration.
 */
export const updateNotificationConfiguration: API.OperationMethod<
  UpdateNotificationConfigurationRequest,
  UpdateNotificationConfigurationResponse,
  UpdateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotificationConfigurationRequest,
  output: UpdateNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationConfiguration",
}));

export type UpdateOtaTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an over-the-air (OTA) task.
 */
export const updateOtaTask: API.OperationMethod<
  UpdateOtaTaskRequest,
  UpdateOtaTaskResponse,
  UpdateOtaTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOtaTaskRequest,
  output: UpdateOtaTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOtaTask",
}));
