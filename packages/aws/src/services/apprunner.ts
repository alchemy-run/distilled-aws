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
const ns = T.XmlNamespace("http://apprunner.amazonaws.com/doc/2020-05-15/");
const svc = T.AwsApiService({
  sdkId: "AppRunner",
  serviceShapeName: "AppRunner",
});
const auth = T.AwsAuthSigv4({ name: "apprunner" });
const ver = T.ServiceVersion("2020-05-15");
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
              `https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://apprunner-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apprunner.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://apprunner.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalServiceError", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidRequest", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceNotfound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 402 }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export type AppRunnerResourceArn = string;
export type DomainName = string;
export interface AssociateCustomDomainRequest {
  ServiceArn: string;
  DomainName: string;
  EnableWWWSubdomain?: boolean;
}
export const AssociateCustomDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.String,
    DomainName: S.String,
    EnableWWWSubdomain: S.optional(S.Boolean),
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
  identifier: "AssociateCustomDomainRequest",
}) as any as S.Schema<AssociateCustomDomainRequest>;
export type CertificateValidationRecordStatus =
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const CertificateValidationRecordStatus = /*@__PURE__*/ S.String;

export interface CertificateValidationRecord {
  Name?: string;
  Type?: string;
  Value?: string;
  Status?: CertificateValidationRecordStatus;
}
export const CertificateValidationRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Value: S.optional(S.String),
    Status: S.optional(CertificateValidationRecordStatus),
  }),
).annotate({
  identifier: "CertificateValidationRecord",
}) as any as S.Schema<CertificateValidationRecord>;
export type CertificateValidationRecordList = CertificateValidationRecord[];
export const CertificateValidationRecordList = /*@__PURE__*/ S.Array(
  CertificateValidationRecord,
);
export type CustomDomainAssociationStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "PENDING_CERTIFICATE_DNS_VALIDATION"
  | "BINDING_CERTIFICATE"
  | (string & {});
export const CustomDomainAssociationStatus = /*@__PURE__*/ S.String;

export interface CustomDomain {
  DomainName: string;
  EnableWWWSubdomain: boolean;
  CertificateValidationRecords?: CertificateValidationRecord[];
  Status: CustomDomainAssociationStatus;
}
export const CustomDomain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    EnableWWWSubdomain: S.Boolean,
    CertificateValidationRecords: S.optional(CertificateValidationRecordList),
    Status: CustomDomainAssociationStatus,
  }),
).annotate({ identifier: "CustomDomain" }) as any as S.Schema<CustomDomain>;
export interface VpcDNSTarget {
  VpcIngressConnectionArn?: string;
  VpcId?: string;
  DomainName?: string;
}
export const VpcDNSTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcIngressConnectionArn: S.optional(S.String),
    VpcId: S.optional(S.String),
    DomainName: S.optional(S.String),
  }),
).annotate({ identifier: "VpcDNSTarget" }) as any as S.Schema<VpcDNSTarget>;
export type VpcDNSTargetList = VpcDNSTarget[];
export const VpcDNSTargetList = /*@__PURE__*/ S.Array(VpcDNSTarget);
export interface AssociateCustomDomainResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomain: CustomDomain;
  VpcDNSTargets: VpcDNSTarget[];
}
export const AssociateCustomDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DNSTarget: S.String,
    ServiceArn: S.String,
    CustomDomain: CustomDomain,
    VpcDNSTargets: VpcDNSTargetList,
  }).pipe(ns),
).annotate({
  identifier: "AssociateCustomDomainResponse",
}) as any as S.Schema<AssociateCustomDomainResponse>;
export type AutoScalingConfigurationName = string;
export type ASConfigMaxConcurrency = number;
export type ASConfigMinSize = number;
export type ASConfigMaxSize = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateAutoScalingConfigurationRequest {
  AutoScalingConfigurationName: string;
  MaxConcurrency?: number;
  MinSize?: number;
  MaxSize?: number;
  Tags?: Tag[];
}
export const CreateAutoScalingConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoScalingConfigurationName: S.String,
      MaxConcurrency: S.optional(S.Number),
      MinSize: S.optional(S.Number),
      MaxSize: S.optional(S.Number),
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
  identifier: "CreateAutoScalingConfigurationRequest",
}) as any as S.Schema<CreateAutoScalingConfigurationRequest>;
export type AutoScalingConfigurationRevision = number;
export type Latest = boolean;
export type AutoScalingConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "active"
  | "inactive"
  | (string & {});
export const AutoScalingConfigurationStatus = /*@__PURE__*/ S.String;

export type MaxConcurrency = number;
export type MinSize = number;
export type MaxSize = number;
export type HasAssociatedService = boolean;
export type IsDefault = boolean;
export interface AutoScalingConfiguration {
  AutoScalingConfigurationArn?: string;
  AutoScalingConfigurationName?: string;
  AutoScalingConfigurationRevision?: number;
  Latest?: boolean;
  Status?: AutoScalingConfigurationStatus;
  MaxConcurrency?: number;
  MinSize?: number;
  MaxSize?: number;
  CreatedAt?: Date;
  DeletedAt?: Date;
  HasAssociatedService?: boolean;
  IsDefault?: boolean;
}
export const AutoScalingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoScalingConfigurationArn: S.optional(S.String),
    AutoScalingConfigurationName: S.optional(S.String),
    AutoScalingConfigurationRevision: S.optional(S.Number),
    Latest: S.optional(S.Boolean),
    Status: S.optional(AutoScalingConfigurationStatus),
    MaxConcurrency: S.optional(S.Number),
    MinSize: S.optional(S.Number),
    MaxSize: S.optional(S.Number),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HasAssociatedService: S.optional(S.Boolean),
    IsDefault: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AutoScalingConfiguration",
}) as any as S.Schema<AutoScalingConfiguration>;
export interface CreateAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export const CreateAutoScalingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AutoScalingConfiguration: AutoScalingConfiguration }).pipe(ns),
).annotate({
  identifier: "CreateAutoScalingConfigurationResponse",
}) as any as S.Schema<CreateAutoScalingConfigurationResponse>;
export type ConnectionName = string;
export type ProviderType = "GITHUB" | "BITBUCKET" | (string & {});
export const ProviderType = /*@__PURE__*/ S.String;

export interface CreateConnectionRequest {
  ConnectionName: string;
  ProviderType: ProviderType;
  Tags?: Tag[];
}
export const CreateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.String,
    ProviderType: ProviderType,
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
  identifier: "CreateConnectionRequest",
}) as any as S.Schema<CreateConnectionRequest>;
export type ConnectionStatus =
  | "PENDING_HANDSHAKE"
  | "AVAILABLE"
  | "ERROR"
  | "DELETED"
  | (string & {});
export const ConnectionStatus = /*@__PURE__*/ S.String;

export interface Connection {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  Status?: ConnectionStatus;
  CreatedAt?: Date;
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    ConnectionArn: S.optional(S.String),
    ProviderType: S.optional(ProviderType),
    Status: S.optional(ConnectionStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface CreateConnectionResponse {
  Connection: Connection;
}
export const CreateConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: Connection }).pipe(ns),
).annotate({
  identifier: "CreateConnectionResponse",
}) as any as S.Schema<CreateConnectionResponse>;
export type ObservabilityConfigurationName = string;
export type TracingVendor = "AWSXRAY" | (string & {});
export const TracingVendor = /*@__PURE__*/ S.String;

export interface TraceConfiguration {
  Vendor: TracingVendor;
}
export const TraceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Vendor: TracingVendor }),
).annotate({
  identifier: "TraceConfiguration",
}) as any as S.Schema<TraceConfiguration>;
export interface CreateObservabilityConfigurationRequest {
  ObservabilityConfigurationName: string;
  TraceConfiguration?: TraceConfiguration;
  Tags?: Tag[];
}
export const CreateObservabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ObservabilityConfigurationName: S.String,
      TraceConfiguration: S.optional(TraceConfiguration),
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
  identifier: "CreateObservabilityConfigurationRequest",
}) as any as S.Schema<CreateObservabilityConfigurationRequest>;
export type ObservabilityConfigurationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export const ObservabilityConfigurationStatus = /*@__PURE__*/ S.String;

export interface ObservabilityConfiguration {
  ObservabilityConfigurationArn?: string;
  ObservabilityConfigurationName?: string;
  TraceConfiguration?: TraceConfiguration;
  ObservabilityConfigurationRevision?: number;
  Latest?: boolean;
  Status?: ObservabilityConfigurationStatus;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export const ObservabilityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObservabilityConfigurationArn: S.optional(S.String),
    ObservabilityConfigurationName: S.optional(S.String),
    TraceConfiguration: S.optional(TraceConfiguration),
    ObservabilityConfigurationRevision: S.optional(S.Number),
    Latest: S.optional(S.Boolean),
    Status: S.optional(ObservabilityConfigurationStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ObservabilityConfiguration",
}) as any as S.Schema<ObservabilityConfiguration>;
export interface CreateObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export const CreateObservabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ObservabilityConfiguration: ObservabilityConfiguration }).pipe(
      ns,
    ),
).annotate({
  identifier: "CreateObservabilityConfigurationResponse",
}) as any as S.Schema<CreateObservabilityConfigurationResponse>;
export type ServiceName = string;
export type SourceCodeVersionType = "BRANCH" | (string & {});
export const SourceCodeVersionType = /*@__PURE__*/ S.String;

export interface SourceCodeVersion {
  Type: SourceCodeVersionType;
  Value: string;
}
export const SourceCodeVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: SourceCodeVersionType, Value: S.String }),
).annotate({
  identifier: "SourceCodeVersion",
}) as any as S.Schema<SourceCodeVersion>;
export type ConfigurationSource = "REPOSITORY" | "API" | (string & {});
export const ConfigurationSource = /*@__PURE__*/ S.String;

export type Runtime =
  | "PYTHON_3"
  | "NODEJS_12"
  | "NODEJS_14"
  | "CORRETTO_8"
  | "CORRETTO_11"
  | "NODEJS_16"
  | "GO_1"
  | "DOTNET_6"
  | "PHP_81"
  | "RUBY_31"
  | "PYTHON_311"
  | "NODEJS_18"
  | "NODEJS_22"
  | (string & {});
export const Runtime = /*@__PURE__*/ S.String;

export type BuildCommand = string | redacted.Redacted<string>;
export type StartCommand = string | redacted.Redacted<string>;
export type RuntimeEnvironmentVariablesKey = string | redacted.Redacted<string>;
export type RuntimeEnvironmentVariablesValue =
  | string
  | redacted.Redacted<string>;
export type RuntimeEnvironmentVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const RuntimeEnvironmentVariables = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type RuntimeEnvironmentSecretsName = string | redacted.Redacted<string>;
export type RuntimeEnvironmentSecretsValue = string | redacted.Redacted<string>;
export type RuntimeEnvironmentSecrets = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const RuntimeEnvironmentSecrets = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface CodeConfigurationValues {
  Runtime: Runtime;
  BuildCommand?: string | redacted.Redacted<string>;
  StartCommand?: string | redacted.Redacted<string>;
  Port?: string;
  RuntimeEnvironmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  RuntimeEnvironmentSecrets?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const CodeConfigurationValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Runtime: Runtime,
    BuildCommand: S.optional(SensitiveString),
    StartCommand: S.optional(SensitiveString),
    Port: S.optional(S.String),
    RuntimeEnvironmentVariables: S.optional(RuntimeEnvironmentVariables),
    RuntimeEnvironmentSecrets: S.optional(RuntimeEnvironmentSecrets),
  }),
).annotate({
  identifier: "CodeConfigurationValues",
}) as any as S.Schema<CodeConfigurationValues>;
export interface CodeConfiguration {
  ConfigurationSource: ConfigurationSource;
  CodeConfigurationValues?: CodeConfigurationValues;
}
export const CodeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSource: ConfigurationSource,
    CodeConfigurationValues: S.optional(CodeConfigurationValues),
  }),
).annotate({
  identifier: "CodeConfiguration",
}) as any as S.Schema<CodeConfiguration>;
export type SourceDirectory = string;
export interface CodeRepository {
  RepositoryUrl: string;
  SourceCodeVersion: SourceCodeVersion;
  CodeConfiguration?: CodeConfiguration;
  SourceDirectory?: string;
}
export const CodeRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RepositoryUrl: S.String,
    SourceCodeVersion: SourceCodeVersion,
    CodeConfiguration: S.optional(CodeConfiguration),
    SourceDirectory: S.optional(S.String),
  }),
).annotate({ identifier: "CodeRepository" }) as any as S.Schema<CodeRepository>;
export type ImageIdentifier = string;
export interface ImageConfiguration {
  RuntimeEnvironmentVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  StartCommand?: string | redacted.Redacted<string>;
  Port?: string;
  RuntimeEnvironmentSecrets?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const ImageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuntimeEnvironmentVariables: S.optional(RuntimeEnvironmentVariables),
    StartCommand: S.optional(SensitiveString),
    Port: S.optional(S.String),
    RuntimeEnvironmentSecrets: S.optional(RuntimeEnvironmentSecrets),
  }),
).annotate({
  identifier: "ImageConfiguration",
}) as any as S.Schema<ImageConfiguration>;
export type ImageRepositoryType = "ECR" | "ECR_PUBLIC" | (string & {});
export const ImageRepositoryType = /*@__PURE__*/ S.String;

export interface ImageRepository {
  ImageIdentifier: string;
  ImageConfiguration?: ImageConfiguration;
  ImageRepositoryType: ImageRepositoryType;
}
export const ImageRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageIdentifier: S.String,
    ImageConfiguration: S.optional(ImageConfiguration),
    ImageRepositoryType: ImageRepositoryType,
  }),
).annotate({
  identifier: "ImageRepository",
}) as any as S.Schema<ImageRepository>;
export type RoleArn = string;
export interface AuthenticationConfiguration {
  ConnectionArn?: string;
  AccessRoleArn?: string;
}
export const AuthenticationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionArn: S.optional(S.String),
    AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthenticationConfiguration",
}) as any as S.Schema<AuthenticationConfiguration>;
export interface SourceConfiguration {
  CodeRepository?: CodeRepository;
  ImageRepository?: ImageRepository;
  AutoDeploymentsEnabled?: boolean;
  AuthenticationConfiguration?: AuthenticationConfiguration;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeRepository: S.optional(CodeRepository),
    ImageRepository: S.optional(ImageRepository),
    AutoDeploymentsEnabled: S.optional(S.Boolean),
    AuthenticationConfiguration: S.optional(AuthenticationConfiguration),
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type Cpu = string;
export type Memory = string;
export interface InstanceConfiguration {
  Cpu?: string;
  Memory?: string;
  InstanceRoleArn?: string;
}
export const InstanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cpu: S.optional(S.String),
    Memory: S.optional(S.String),
    InstanceRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceConfiguration",
}) as any as S.Schema<InstanceConfiguration>;
export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  KmsKey: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKey: S.String }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type HealthCheckProtocol = "TCP" | "HTTP" | (string & {});
export const HealthCheckProtocol = /*@__PURE__*/ S.String;

export type HealthCheckPath = string;
export type HealthCheckInterval = number;
export type HealthCheckTimeout = number;
export type HealthCheckHealthyThreshold = number;
export type HealthCheckUnhealthyThreshold = number;
export interface HealthCheckConfiguration {
  Protocol?: HealthCheckProtocol;
  Path?: string;
  Interval?: number;
  Timeout?: number;
  HealthyThreshold?: number;
  UnhealthyThreshold?: number;
}
export const HealthCheckConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: S.optional(HealthCheckProtocol),
    Path: S.optional(S.String),
    Interval: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    HealthyThreshold: S.optional(S.Number),
    UnhealthyThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "HealthCheckConfiguration",
}) as any as S.Schema<HealthCheckConfiguration>;
export type EgressType = "DEFAULT" | "VPC" | (string & {});
export const EgressType = /*@__PURE__*/ S.String;

export interface EgressConfiguration {
  EgressType?: EgressType;
  VpcConnectorArn?: string;
}
export const EgressConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressType: S.optional(EgressType),
    VpcConnectorArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EgressConfiguration",
}) as any as S.Schema<EgressConfiguration>;
export interface IngressConfiguration {
  IsPubliclyAccessible?: boolean;
}
export const IngressConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsPubliclyAccessible: S.optional(S.Boolean) }),
).annotate({
  identifier: "IngressConfiguration",
}) as any as S.Schema<IngressConfiguration>;
export type IpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export interface NetworkConfiguration {
  EgressConfiguration?: EgressConfiguration;
  IngressConfiguration?: IngressConfiguration;
  IpAddressType?: IpAddressType;
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressConfiguration: S.optional(EgressConfiguration),
    IngressConfiguration: S.optional(IngressConfiguration),
    IpAddressType: S.optional(IpAddressType),
  }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export interface ServiceObservabilityConfiguration {
  ObservabilityEnabled: boolean;
  ObservabilityConfigurationArn?: string;
}
export const ServiceObservabilityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObservabilityEnabled: S.Boolean,
    ObservabilityConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceObservabilityConfiguration",
}) as any as S.Schema<ServiceObservabilityConfiguration>;
export interface CreateServiceRequest {
  ServiceName: string;
  SourceConfiguration: SourceConfiguration;
  InstanceConfiguration?: InstanceConfiguration;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  AutoScalingConfigurationArn?: string;
  NetworkConfiguration?: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export const CreateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.String,
    SourceConfiguration: SourceConfiguration,
    InstanceConfiguration: S.optional(InstanceConfiguration),
    Tags: S.optional(TagList),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    HealthCheckConfiguration: S.optional(HealthCheckConfiguration),
    AutoScalingConfigurationArn: S.optional(S.String),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    ObservabilityConfiguration: S.optional(ServiceObservabilityConfiguration),
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
  identifier: "CreateServiceRequest",
}) as any as S.Schema<CreateServiceRequest>;
export type ServiceId = string;
export type ServiceStatus =
  | "CREATE_FAILED"
  | "RUNNING"
  | "DELETED"
  | "DELETE_FAILED"
  | "PAUSED"
  | "OPERATION_IN_PROGRESS"
  | (string & {});
export const ServiceStatus = /*@__PURE__*/ S.String;

export interface AutoScalingConfigurationSummary {
  AutoScalingConfigurationArn?: string;
  AutoScalingConfigurationName?: string;
  AutoScalingConfigurationRevision?: number;
  Status?: AutoScalingConfigurationStatus;
  CreatedAt?: Date;
  HasAssociatedService?: boolean;
  IsDefault?: boolean;
}
export const AutoScalingConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoScalingConfigurationArn: S.optional(S.String),
    AutoScalingConfigurationName: S.optional(S.String),
    AutoScalingConfigurationRevision: S.optional(S.Number),
    Status: S.optional(AutoScalingConfigurationStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HasAssociatedService: S.optional(S.Boolean),
    IsDefault: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AutoScalingConfigurationSummary",
}) as any as S.Schema<AutoScalingConfigurationSummary>;
export interface Service {
  ServiceName: string;
  ServiceId: string;
  ServiceArn: string;
  ServiceUrl?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
  Status: ServiceStatus;
  SourceConfiguration: SourceConfiguration;
  InstanceConfiguration: InstanceConfiguration;
  EncryptionConfiguration?: EncryptionConfiguration;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  AutoScalingConfigurationSummary: AutoScalingConfigurationSummary;
  NetworkConfiguration: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.String,
    ServiceId: S.String,
    ServiceArn: S.String,
    ServiceUrl: S.optional(S.String),
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: ServiceStatus,
    SourceConfiguration: SourceConfiguration,
    InstanceConfiguration: InstanceConfiguration,
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    HealthCheckConfiguration: S.optional(HealthCheckConfiguration),
    AutoScalingConfigurationSummary: AutoScalingConfigurationSummary,
    NetworkConfiguration: NetworkConfiguration,
    ObservabilityConfiguration: S.optional(ServiceObservabilityConfiguration),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export type UUID = string;
export interface CreateServiceResponse {
  Service: Service;
  OperationId: string;
}
export const CreateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service, OperationId: S.String }).pipe(ns),
).annotate({
  identifier: "CreateServiceResponse",
}) as any as S.Schema<CreateServiceResponse>;
export type VpcConnectorName = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface CreateVpcConnectorRequest {
  VpcConnectorName: string;
  Subnets: string[];
  SecurityGroups?: string[];
  Tags?: Tag[];
}
export const CreateVpcConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcConnectorName: S.String,
    Subnets: StringList,
    SecurityGroups: S.optional(StringList),
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
  identifier: "CreateVpcConnectorRequest",
}) as any as S.Schema<CreateVpcConnectorRequest>;
export type VpcConnectorStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "active"
  | "inactive"
  | (string & {});
export const VpcConnectorStatus = /*@__PURE__*/ S.String;

export interface VpcConnector {
  VpcConnectorName?: string;
  VpcConnectorArn?: string;
  VpcConnectorRevision?: number;
  Subnets?: string[];
  SecurityGroups?: string[];
  Status?: VpcConnectorStatus;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export const VpcConnector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcConnectorName: S.optional(S.String),
    VpcConnectorArn: S.optional(S.String),
    VpcConnectorRevision: S.optional(S.Number),
    Subnets: S.optional(StringList),
    SecurityGroups: S.optional(StringList),
    Status: S.optional(VpcConnectorStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "VpcConnector" }) as any as S.Schema<VpcConnector>;
export interface CreateVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export const CreateVpcConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcConnector: VpcConnector }).pipe(ns),
).annotate({
  identifier: "CreateVpcConnectorResponse",
}) as any as S.Schema<CreateVpcConnectorResponse>;
export type VpcIngressConnectionName = string;
export interface IngressVpcConfiguration {
  VpcId?: string;
  VpcEndpointId?: string;
}
export const IngressVpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcId: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "IngressVpcConfiguration",
}) as any as S.Schema<IngressVpcConfiguration>;
export interface CreateVpcIngressConnectionRequest {
  ServiceArn: string;
  VpcIngressConnectionName: string;
  IngressVpcConfiguration: IngressVpcConfiguration;
  Tags?: Tag[];
}
export const CreateVpcIngressConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.String,
    VpcIngressConnectionName: S.String,
    IngressVpcConfiguration: IngressVpcConfiguration,
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
  identifier: "CreateVpcIngressConnectionRequest",
}) as any as S.Schema<CreateVpcIngressConnectionRequest>;
export type VpcIngressConnectionStatus =
  | "AVAILABLE"
  | "PENDING_CREATION"
  | "PENDING_UPDATE"
  | "PENDING_DELETION"
  | "FAILED_CREATION"
  | "FAILED_UPDATE"
  | "FAILED_DELETION"
  | "DELETED"
  | (string & {});
export const VpcIngressConnectionStatus = /*@__PURE__*/ S.String;

export type CustomerAccountId = string;
export interface VpcIngressConnection {
  VpcIngressConnectionArn?: string;
  VpcIngressConnectionName?: string;
  ServiceArn?: string;
  Status?: VpcIngressConnectionStatus;
  AccountId?: string;
  DomainName?: string;
  IngressVpcConfiguration?: IngressVpcConfiguration;
  CreatedAt?: Date;
  DeletedAt?: Date;
}
export const VpcIngressConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcIngressConnectionArn: S.optional(S.String),
    VpcIngressConnectionName: S.optional(S.String),
    ServiceArn: S.optional(S.String),
    Status: S.optional(VpcIngressConnectionStatus),
    AccountId: S.optional(S.String),
    DomainName: S.optional(S.String),
    IngressVpcConfiguration: S.optional(IngressVpcConfiguration),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "VpcIngressConnection",
}) as any as S.Schema<VpcIngressConnection>;
export interface CreateVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export const CreateVpcIngressConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcIngressConnection: VpcIngressConnection }).pipe(ns),
).annotate({
  identifier: "CreateVpcIngressConnectionResponse",
}) as any as S.Schema<CreateVpcIngressConnectionResponse>;
export interface DeleteAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
  DeleteAllRevisions?: boolean;
}
export const DeleteAutoScalingConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoScalingConfigurationArn: S.String,
      DeleteAllRevisions: S.optional(S.Boolean),
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
  identifier: "DeleteAutoScalingConfigurationRequest",
}) as any as S.Schema<DeleteAutoScalingConfigurationRequest>;
export interface DeleteAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export const DeleteAutoScalingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AutoScalingConfiguration: AutoScalingConfiguration }).pipe(ns),
).annotate({
  identifier: "DeleteAutoScalingConfigurationResponse",
}) as any as S.Schema<DeleteAutoScalingConfigurationResponse>;
export interface DeleteConnectionRequest {
  ConnectionArn: string;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionArn: S.String }).pipe(
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
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteConnectionResponse {
  Connection?: Connection;
}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(Connection) }).pipe(ns),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export interface DeleteObservabilityConfigurationRequest {
  ObservabilityConfigurationArn: string;
}
export const DeleteObservabilityConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ObservabilityConfigurationArn: S.String }).pipe(
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
  identifier: "DeleteObservabilityConfigurationRequest",
}) as any as S.Schema<DeleteObservabilityConfigurationRequest>;
export interface DeleteObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export const DeleteObservabilityConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ObservabilityConfiguration: ObservabilityConfiguration }).pipe(
      ns,
    ),
).annotate({
  identifier: "DeleteObservabilityConfigurationResponse",
}) as any as S.Schema<DeleteObservabilityConfigurationResponse>;
export interface DeleteServiceRequest {
  ServiceArn: string;
}
export const DeleteServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String }).pipe(
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
  identifier: "DeleteServiceRequest",
}) as any as S.Schema<DeleteServiceRequest>;
export interface DeleteServiceResponse {
  Service: Service;
  OperationId: string;
}
export const DeleteServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service, OperationId: S.String }).pipe(ns),
).annotate({
  identifier: "DeleteServiceResponse",
}) as any as S.Schema<DeleteServiceResponse>;
export interface DeleteVpcConnectorRequest {
  VpcConnectorArn: string;
}
export const DeleteVpcConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcConnectorArn: S.String }).pipe(
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
  identifier: "DeleteVpcConnectorRequest",
}) as any as S.Schema<DeleteVpcConnectorRequest>;
export interface DeleteVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export const DeleteVpcConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcConnector: VpcConnector }).pipe(ns),
).annotate({
  identifier: "DeleteVpcConnectorResponse",
}) as any as S.Schema<DeleteVpcConnectorResponse>;
export interface DeleteVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
}
export const DeleteVpcIngressConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcIngressConnectionArn: S.String }).pipe(
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
  identifier: "DeleteVpcIngressConnectionRequest",
}) as any as S.Schema<DeleteVpcIngressConnectionRequest>;
export interface DeleteVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export const DeleteVpcIngressConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcIngressConnection: VpcIngressConnection }).pipe(ns),
).annotate({
  identifier: "DeleteVpcIngressConnectionResponse",
}) as any as S.Schema<DeleteVpcIngressConnectionResponse>;
export interface DescribeAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
}
export const DescribeAutoScalingConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AutoScalingConfigurationArn: S.String }).pipe(
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
  identifier: "DescribeAutoScalingConfigurationRequest",
}) as any as S.Schema<DescribeAutoScalingConfigurationRequest>;
export interface DescribeAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export const DescribeAutoScalingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AutoScalingConfiguration: AutoScalingConfiguration }).pipe(ns),
).annotate({
  identifier: "DescribeAutoScalingConfigurationResponse",
}) as any as S.Schema<DescribeAutoScalingConfigurationResponse>;
export type DescribeCustomDomainsMaxResults = number;
export interface DescribeCustomDomainsRequest {
  ServiceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeCustomDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.String,
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
  identifier: "DescribeCustomDomainsRequest",
}) as any as S.Schema<DescribeCustomDomainsRequest>;
export type CustomDomainList = CustomDomain[];
export const CustomDomainList = /*@__PURE__*/ S.Array(CustomDomain);
export interface DescribeCustomDomainsResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomains: CustomDomain[];
  VpcDNSTargets: VpcDNSTarget[];
  NextToken?: string;
}
export const DescribeCustomDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DNSTarget: S.String,
    ServiceArn: S.String,
    CustomDomains: CustomDomainList,
    VpcDNSTargets: VpcDNSTargetList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCustomDomainsResponse",
}) as any as S.Schema<DescribeCustomDomainsResponse>;
export interface DescribeObservabilityConfigurationRequest {
  ObservabilityConfigurationArn: string;
}
export const DescribeObservabilityConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ObservabilityConfigurationArn: S.String }).pipe(
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
    identifier: "DescribeObservabilityConfigurationRequest",
  }) as any as S.Schema<DescribeObservabilityConfigurationRequest>;
export interface DescribeObservabilityConfigurationResponse {
  ObservabilityConfiguration: ObservabilityConfiguration;
}
export const DescribeObservabilityConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ObservabilityConfiguration: ObservabilityConfiguration }).pipe(
      ns,
    ),
  ).annotate({
    identifier: "DescribeObservabilityConfigurationResponse",
  }) as any as S.Schema<DescribeObservabilityConfigurationResponse>;
export interface DescribeServiceRequest {
  ServiceArn: string;
}
export const DescribeServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String }).pipe(
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
  identifier: "DescribeServiceRequest",
}) as any as S.Schema<DescribeServiceRequest>;
export interface DescribeServiceResponse {
  Service: Service;
}
export const DescribeServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service }).pipe(ns),
).annotate({
  identifier: "DescribeServiceResponse",
}) as any as S.Schema<DescribeServiceResponse>;
export interface DescribeVpcConnectorRequest {
  VpcConnectorArn: string;
}
export const DescribeVpcConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcConnectorArn: S.String }).pipe(
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
  identifier: "DescribeVpcConnectorRequest",
}) as any as S.Schema<DescribeVpcConnectorRequest>;
export interface DescribeVpcConnectorResponse {
  VpcConnector: VpcConnector;
}
export const DescribeVpcConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcConnector: VpcConnector }).pipe(ns),
).annotate({
  identifier: "DescribeVpcConnectorResponse",
}) as any as S.Schema<DescribeVpcConnectorResponse>;
export interface DescribeVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
}
export const DescribeVpcIngressConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcIngressConnectionArn: S.String }).pipe(
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
  identifier: "DescribeVpcIngressConnectionRequest",
}) as any as S.Schema<DescribeVpcIngressConnectionRequest>;
export interface DescribeVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export const DescribeVpcIngressConnectionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ VpcIngressConnection: VpcIngressConnection }).pipe(ns),
).annotate({
  identifier: "DescribeVpcIngressConnectionResponse",
}) as any as S.Schema<DescribeVpcIngressConnectionResponse>;
export interface DisassociateCustomDomainRequest {
  ServiceArn: string;
  DomainName: string;
}
export const DisassociateCustomDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String, DomainName: S.String }).pipe(
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
  identifier: "DisassociateCustomDomainRequest",
}) as any as S.Schema<DisassociateCustomDomainRequest>;
export interface DisassociateCustomDomainResponse {
  DNSTarget: string;
  ServiceArn: string;
  CustomDomain: CustomDomain;
  VpcDNSTargets: VpcDNSTarget[];
}
export const DisassociateCustomDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DNSTarget: S.String,
    ServiceArn: S.String,
    CustomDomain: CustomDomain,
    VpcDNSTargets: VpcDNSTargetList,
  }).pipe(ns),
).annotate({
  identifier: "DisassociateCustomDomainResponse",
}) as any as S.Schema<DisassociateCustomDomainResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAutoScalingConfigurationsRequest {
  AutoScalingConfigurationName?: string;
  LatestOnly?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAutoScalingConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoScalingConfigurationName: S.optional(S.String),
      LatestOnly: S.optional(S.Boolean),
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
  identifier: "ListAutoScalingConfigurationsRequest",
}) as any as S.Schema<ListAutoScalingConfigurationsRequest>;
export type AutoScalingConfigurationSummaryList =
  AutoScalingConfigurationSummary[];
export const AutoScalingConfigurationSummaryList = /*@__PURE__*/ S.Array(
  AutoScalingConfigurationSummary,
);
export interface ListAutoScalingConfigurationsResponse {
  AutoScalingConfigurationSummaryList: AutoScalingConfigurationSummary[];
  NextToken?: string;
}
export const ListAutoScalingConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutoScalingConfigurationSummaryList: AutoScalingConfigurationSummaryList,
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAutoScalingConfigurationsResponse",
}) as any as S.Schema<ListAutoScalingConfigurationsResponse>;
export interface ListConnectionsRequest {
  ConnectionName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
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
  identifier: "ListConnectionsRequest",
}) as any as S.Schema<ListConnectionsRequest>;
export interface ConnectionSummary {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  Status?: ConnectionStatus;
  CreatedAt?: Date;
}
export const ConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    ConnectionArn: S.optional(S.String),
    ProviderType: S.optional(ProviderType),
    Status: S.optional(ConnectionStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ConnectionSummary",
}) as any as S.Schema<ConnectionSummary>;
export type ConnectionSummaryList = ConnectionSummary[];
export const ConnectionSummaryList = /*@__PURE__*/ S.Array(ConnectionSummary);
export interface ListConnectionsResponse {
  ConnectionSummaryList: ConnectionSummary[];
  NextToken?: string;
}
export const ListConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionSummaryList: ConnectionSummaryList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListConnectionsResponse",
}) as any as S.Schema<ListConnectionsResponse>;
export interface ListObservabilityConfigurationsRequest {
  ObservabilityConfigurationName?: string;
  LatestOnly?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListObservabilityConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ObservabilityConfigurationName: S.optional(S.String),
      LatestOnly: S.optional(S.Boolean),
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
  identifier: "ListObservabilityConfigurationsRequest",
}) as any as S.Schema<ListObservabilityConfigurationsRequest>;
export interface ObservabilityConfigurationSummary {
  ObservabilityConfigurationArn?: string;
  ObservabilityConfigurationName?: string;
  ObservabilityConfigurationRevision?: number;
}
export const ObservabilityConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObservabilityConfigurationArn: S.optional(S.String),
    ObservabilityConfigurationName: S.optional(S.String),
    ObservabilityConfigurationRevision: S.optional(S.Number),
  }),
).annotate({
  identifier: "ObservabilityConfigurationSummary",
}) as any as S.Schema<ObservabilityConfigurationSummary>;
export type ObservabilityConfigurationSummaryList =
  ObservabilityConfigurationSummary[];
export const ObservabilityConfigurationSummaryList = /*@__PURE__*/ S.Array(
  ObservabilityConfigurationSummary,
);
export interface ListObservabilityConfigurationsResponse {
  ObservabilityConfigurationSummaryList: ObservabilityConfigurationSummary[];
  NextToken?: string;
}
export const ListObservabilityConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ObservabilityConfigurationSummaryList:
        ObservabilityConfigurationSummaryList,
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListObservabilityConfigurationsResponse",
}) as any as S.Schema<ListObservabilityConfigurationsResponse>;
export type ListOperationsMaxResults = number;
export interface ListOperationsRequest {
  ServiceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.String,
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
  identifier: "ListOperationsRequest",
}) as any as S.Schema<ListOperationsRequest>;
export type OperationType =
  | "START_DEPLOYMENT"
  | "CREATE_SERVICE"
  | "PAUSE_SERVICE"
  | "RESUME_SERVICE"
  | "DELETE_SERVICE"
  | "UPDATE_SERVICE"
  | (string & {});
export const OperationType = /*@__PURE__*/ S.String;

export type OperationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_FAILED"
  | "ROLLBACK_SUCCEEDED"
  | (string & {});
export const OperationStatus = /*@__PURE__*/ S.String;

export interface OperationSummary {
  Id?: string;
  Type?: OperationType;
  Status?: OperationStatus;
  TargetArn?: string;
  StartedAt?: Date;
  EndedAt?: Date;
  UpdatedAt?: Date;
}
export const OperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Type: S.optional(OperationType),
    Status: S.optional(OperationStatus),
    TargetArn: S.optional(S.String),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "OperationSummary",
}) as any as S.Schema<OperationSummary>;
export type OperationSummaryList = OperationSummary[];
export const OperationSummaryList = /*@__PURE__*/ S.Array(OperationSummary);
export interface ListOperationsResponse {
  OperationSummaryList?: OperationSummary[];
  NextToken?: string;
}
export const ListOperationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationSummaryList: S.optional(OperationSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOperationsResponse",
}) as any as S.Schema<ListOperationsResponse>;
export type ServiceMaxResults = number;
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListServicesRequest",
}) as any as S.Schema<ListServicesRequest>;
export interface ServiceSummary {
  ServiceName?: string;
  ServiceId?: string;
  ServiceArn?: string;
  ServiceUrl?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Status?: ServiceStatus;
}
export const ServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.optional(S.String),
    ServiceId: S.optional(S.String),
    ServiceArn: S.optional(S.String),
    ServiceUrl: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ServiceStatus),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummaryList = ServiceSummary[];
export const ServiceSummaryList = /*@__PURE__*/ S.Array(ServiceSummary);
export interface ListServicesResponse {
  ServiceSummaryList: ServiceSummary[];
  NextToken?: string;
}
export const ListServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceSummaryList: ServiceSummaryList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
export interface ListServicesForAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListServicesForAutoScalingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AutoScalingConfigurationArn: S.String,
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
    identifier: "ListServicesForAutoScalingConfigurationRequest",
  }) as any as S.Schema<ListServicesForAutoScalingConfigurationRequest>;
export type ServiceArnList = string[];
export const ServiceArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListServicesForAutoScalingConfigurationResponse {
  ServiceArnList: string[];
  NextToken?: string;
}
export const ListServicesForAutoScalingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceArnList: ServiceArnList,
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListServicesForAutoScalingConfigurationResponse",
  }) as any as S.Schema<ListServicesForAutoScalingConfigurationResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVpcConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListVpcConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListVpcConnectorsRequest",
}) as any as S.Schema<ListVpcConnectorsRequest>;
export type VpcConnectors = VpcConnector[];
export const VpcConnectors = /*@__PURE__*/ S.Array(VpcConnector);
export interface ListVpcConnectorsResponse {
  VpcConnectors: VpcConnector[];
  NextToken?: string;
}
export const ListVpcConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcConnectors: VpcConnectors,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListVpcConnectorsResponse",
}) as any as S.Schema<ListVpcConnectorsResponse>;
export interface ListVpcIngressConnectionsFilter {
  ServiceArn?: string;
  VpcEndpointId?: string;
}
export const ListVpcIngressConnectionsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.optional(S.String),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVpcIngressConnectionsFilter",
}) as any as S.Schema<ListVpcIngressConnectionsFilter>;
export interface ListVpcIngressConnectionsRequest {
  Filter?: ListVpcIngressConnectionsFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListVpcIngressConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(ListVpcIngressConnectionsFilter),
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
  identifier: "ListVpcIngressConnectionsRequest",
}) as any as S.Schema<ListVpcIngressConnectionsRequest>;
export interface VpcIngressConnectionSummary {
  VpcIngressConnectionArn?: string;
  ServiceArn?: string;
}
export const VpcIngressConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcIngressConnectionArn: S.optional(S.String),
    ServiceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcIngressConnectionSummary",
}) as any as S.Schema<VpcIngressConnectionSummary>;
export type VpcIngressConnectionSummaryList = VpcIngressConnectionSummary[];
export const VpcIngressConnectionSummaryList = /*@__PURE__*/ S.Array(
  VpcIngressConnectionSummary,
);
export interface ListVpcIngressConnectionsResponse {
  VpcIngressConnectionSummaryList: VpcIngressConnectionSummary[];
  NextToken?: string;
}
export const ListVpcIngressConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcIngressConnectionSummaryList: VpcIngressConnectionSummaryList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListVpcIngressConnectionsResponse",
}) as any as S.Schema<ListVpcIngressConnectionsResponse>;
export interface PauseServiceRequest {
  ServiceArn: string;
}
export const PauseServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String }).pipe(
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
  identifier: "PauseServiceRequest",
}) as any as S.Schema<PauseServiceRequest>;
export interface PauseServiceResponse {
  Service: Service;
  OperationId?: string;
}
export const PauseServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service, OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PauseServiceResponse",
}) as any as S.Schema<PauseServiceResponse>;
export interface ResumeServiceRequest {
  ServiceArn: string;
}
export const ResumeServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String }).pipe(
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
  identifier: "ResumeServiceRequest",
}) as any as S.Schema<ResumeServiceRequest>;
export interface ResumeServiceResponse {
  Service: Service;
  OperationId?: string;
}
export const ResumeServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service, OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ResumeServiceResponse",
}) as any as S.Schema<ResumeServiceResponse>;
export interface StartDeploymentRequest {
  ServiceArn: string;
}
export const StartDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceArn: S.String }).pipe(
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
  identifier: "StartDeploymentRequest",
}) as any as S.Schema<StartDeploymentRequest>;
export interface StartDeploymentResponse {
  OperationId: string;
}
export const StartDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.String }).pipe(ns),
).annotate({
  identifier: "StartDeploymentResponse",
}) as any as S.Schema<StartDeploymentResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateDefaultAutoScalingConfigurationRequest {
  AutoScalingConfigurationArn: string;
}
export const UpdateDefaultAutoScalingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoScalingConfigurationArn: S.String }).pipe(
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
    identifier: "UpdateDefaultAutoScalingConfigurationRequest",
  }) as any as S.Schema<UpdateDefaultAutoScalingConfigurationRequest>;
export interface UpdateDefaultAutoScalingConfigurationResponse {
  AutoScalingConfiguration: AutoScalingConfiguration;
}
export const UpdateDefaultAutoScalingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoScalingConfiguration: AutoScalingConfiguration }).pipe(ns),
  ).annotate({
    identifier: "UpdateDefaultAutoScalingConfigurationResponse",
  }) as any as S.Schema<UpdateDefaultAutoScalingConfigurationResponse>;
export interface UpdateServiceRequest {
  ServiceArn: string;
  SourceConfiguration?: SourceConfiguration;
  InstanceConfiguration?: InstanceConfiguration;
  AutoScalingConfigurationArn?: string;
  HealthCheckConfiguration?: HealthCheckConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  ObservabilityConfiguration?: ServiceObservabilityConfiguration;
}
export const UpdateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceArn: S.String,
    SourceConfiguration: S.optional(SourceConfiguration),
    InstanceConfiguration: S.optional(InstanceConfiguration),
    AutoScalingConfigurationArn: S.optional(S.String),
    HealthCheckConfiguration: S.optional(HealthCheckConfiguration),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    ObservabilityConfiguration: S.optional(ServiceObservabilityConfiguration),
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
  identifier: "UpdateServiceRequest",
}) as any as S.Schema<UpdateServiceRequest>;
export interface UpdateServiceResponse {
  Service: Service;
  OperationId: string;
}
export const UpdateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: Service, OperationId: S.String }).pipe(ns),
).annotate({
  identifier: "UpdateServiceResponse",
}) as any as S.Schema<UpdateServiceResponse>;
export interface UpdateVpcIngressConnectionRequest {
  VpcIngressConnectionArn: string;
  IngressVpcConfiguration: IngressVpcConfiguration;
}
export const UpdateVpcIngressConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcIngressConnectionArn: S.String,
    IngressVpcConfiguration: IngressVpcConfiguration,
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
  identifier: "UpdateVpcIngressConnectionRequest",
}) as any as S.Schema<UpdateVpcIngressConnectionRequest>;
export interface UpdateVpcIngressConnectionResponse {
  VpcIngressConnection: VpcIngressConnection;
}
export const UpdateVpcIngressConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcIngressConnection: VpcIngressConnection }).pipe(ns),
).annotate({
  identifier: "UpdateVpcIngressConnectionResponse",
}) as any as S.Schema<UpdateVpcIngressConnectionResponse>;
export type ErrorMessage = string;
export type AssociateCustomDomainError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | CommonErrors;
/**
 * Associate your own domain name with the App Runner subdomain URL of your App Runner service.
 *
 * After you call `AssociateCustomDomain` and receive a successful response, use the information in the CustomDomain record
 * that's returned to add CNAME records to your Domain Name System (DNS). For each mapped domain name, add a mapping to the target App Runner subdomain and one or
 * more certificate validation records. App Runner then performs DNS validation to verify that you own or control the domain name that you associated. App Runner tracks
 * domain validity in a certificate stored in AWS Certificate Manager (ACM).
 */
export const associateCustomDomain: API.OperationMethod<
  AssociateCustomDomainRequest,
  AssociateCustomDomainResponse,
  AssociateCustomDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateCustomDomainRequest,
  output: AssociateCustomDomainResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCustomDomain",
}));

export type CreateAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner automatic scaling configuration resource. App Runner requires this resource when you create or update App Runner services and you require
 * non-default auto scaling settings. You can share an auto scaling configuration across multiple services.
 *
 * Create multiple revisions of a configuration by calling this action multiple times using the same `AutoScalingConfigurationName`. The call
 * returns incremental `AutoScalingConfigurationRevision` values. When you create a service and configure an auto scaling configuration resource,
 * the service uses the latest active revision of the auto scaling configuration by default. You can optionally configure the service to use a specific
 * revision.
 *
 * Configure a higher `MinSize` to increase the spread of your App Runner service over more Availability Zones in the Amazon Web Services Region. The
 * tradeoff is a higher minimal cost.
 *
 * Configure a lower `MaxSize` to control your cost. The tradeoff is lower responsiveness during peak demand.
 */
export const createAutoScalingConfiguration: API.OperationMethod<
  CreateAutoScalingConfigurationRequest,
  CreateAutoScalingConfigurationResponse,
  CreateAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutoScalingConfigurationRequest,
  output: CreateAutoScalingConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoScalingConfiguration",
}));

export type CreateConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner connection resource. App Runner requires a connection resource when you create App Runner services that access private repositories from
 * certain third-party providers. You can share a connection across multiple services.
 *
 * A connection resource is needed to access GitHub and Bitbucket repositories. Both require
 * a user interface approval process through the App Runner console before you can use the
 * connection.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionRequest,
  output: CreateConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type CreateObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner observability configuration resource. App Runner requires this resource when you create or update App Runner services and you want to enable
 * non-default observability features. You can share an observability configuration across multiple services.
 *
 * Create multiple revisions of a configuration by calling this action multiple times using the same `ObservabilityConfigurationName`. The
 * call returns incremental `ObservabilityConfigurationRevision` values. When you create a service and configure an observability configuration
 * resource, the service uses the latest active revision of the observability configuration by default. You can optionally configure the service to use a
 * specific revision.
 *
 * The observability configuration resource is designed to configure multiple features (currently one feature, tracing). This action takes optional
 * parameters that describe the configuration of these features (currently one parameter, `TraceConfiguration`). If you don't specify a feature
 * parameter, App Runner doesn't enable the feature.
 */
export const createObservabilityConfiguration: API.OperationMethod<
  CreateObservabilityConfigurationRequest,
  CreateObservabilityConfigurationResponse,
  CreateObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateObservabilityConfigurationRequest,
  output: CreateObservabilityConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateObservabilityConfiguration",
}));

export type CreateServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner service. After the service is created, the action also automatically starts a deployment.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations call to track the operation's progress.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceRequest,
  output: CreateServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type CreateVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner VPC connector resource. App Runner requires this resource when you want to associate your App Runner service to a custom Amazon Virtual Private Cloud
 * (Amazon VPC).
 */
export const createVpcConnector: API.OperationMethod<
  CreateVpcConnectorRequest,
  CreateVpcConnectorResponse,
  CreateVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcConnectorRequest,
  output: CreateVpcConnectorResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcConnector",
}));

export type CreateVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create an App Runner VPC Ingress Connection resource. App Runner requires this resource when you want to associate your App Runner service with an Amazon VPC endpoint.
 */
export const createVpcIngressConnection: API.OperationMethod<
  CreateVpcIngressConnectionRequest,
  CreateVpcIngressConnectionResponse,
  CreateVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcIngressConnectionRequest,
  output: CreateVpcIngressConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcIngressConnection",
}));

export type DeleteAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner automatic scaling configuration resource. You can delete a top level auto scaling configuration, a specific revision of one, or all
 * revisions associated with the top level configuration. You can't delete the default auto scaling configuration or a configuration that's used by one or
 * more App Runner services.
 */
export const deleteAutoScalingConfiguration: API.OperationMethod<
  DeleteAutoScalingConfigurationRequest,
  DeleteAutoScalingConfigurationResponse,
  DeleteAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutoScalingConfigurationRequest,
  output: DeleteAutoScalingConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoScalingConfiguration",
}));

export type DeleteConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner connection. You must first ensure that there are no running App Runner services that use this connection. If there are any, the
 * `DeleteConnection` action fails.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: DeleteConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner observability configuration resource. You can delete a specific revision or the latest active revision. You can't delete a
 * configuration that's used by one or more App Runner services.
 */
export const deleteObservabilityConfiguration: API.OperationMethod<
  DeleteObservabilityConfigurationRequest,
  DeleteObservabilityConfigurationResponse,
  DeleteObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteObservabilityConfigurationRequest,
  output: DeleteObservabilityConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObservabilityConfiguration",
}));

export type DeleteServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner service.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 *
 * Make sure that you don't have any active VPCIngressConnections associated with the service you want to delete.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceRequest,
  output: DeleteServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner VPC connector resource. You can't delete a
 * connector that's used by one or more App Runner services.
 */
export const deleteVpcConnector: API.OperationMethod<
  DeleteVpcConnectorRequest,
  DeleteVpcConnectorResponse,
  DeleteVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcConnectorRequest,
  output: DeleteVpcConnectorResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcConnector",
}));

export type DeleteVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete an App Runner VPC Ingress Connection resource that's associated with an App Runner service. The VPC Ingress Connection must be in one of the following states to be deleted:
 *
 * - `AVAILABLE`
 *
 * - `FAILED_CREATION`
 *
 * - `FAILED_UPDATE`
 *
 * - `FAILED_DELETION`
 */
export const deleteVpcIngressConnection: API.OperationMethod<
  DeleteVpcIngressConnectionRequest,
  DeleteVpcIngressConnectionResponse,
  DeleteVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcIngressConnectionRequest,
  output: DeleteVpcIngressConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcIngressConnection",
}));

export type DescribeAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner automatic scaling configuration resource.
 */
export const describeAutoScalingConfiguration: API.OperationMethod<
  DescribeAutoScalingConfigurationRequest,
  DescribeAutoScalingConfigurationResponse,
  DescribeAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAutoScalingConfigurationRequest,
  output: DescribeAutoScalingConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingConfiguration",
}));

export type DescribeCustomDomainsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a description of custom domain names that are associated with an App Runner service.
 */
export const describeCustomDomains: API.PaginatedOperationMethod<
  DescribeCustomDomainsRequest,
  DescribeCustomDomainsResponse,
  DescribeCustomDomainsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCustomDomainsRequest,
  output: DescribeCustomDomainsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeObservabilityConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner observability configuration resource.
 */
export const describeObservabilityConfiguration: API.OperationMethod<
  DescribeObservabilityConfigurationRequest,
  DescribeObservabilityConfigurationResponse,
  DescribeObservabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeObservabilityConfigurationRequest,
  output: DescribeObservabilityConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObservabilityConfiguration",
}));

export type DescribeServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner service.
 */
export const describeService: API.OperationMethod<
  DescribeServiceRequest,
  DescribeServiceResponse,
  DescribeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceRequest,
  output: DescribeServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeService",
}));

export type DescribeVpcConnectorError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a description of an App Runner VPC connector resource.
 */
export const describeVpcConnector: API.OperationMethod<
  DescribeVpcConnectorRequest,
  DescribeVpcConnectorResponse,
  DescribeVpcConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcConnectorRequest,
  output: DescribeVpcConnectorResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcConnector",
}));

export type DescribeVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a full description of an App Runner VPC Ingress Connection resource.
 */
export const describeVpcIngressConnection: API.OperationMethod<
  DescribeVpcIngressConnectionRequest,
  DescribeVpcIngressConnectionResponse,
  DescribeVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVpcIngressConnectionRequest,
  output: DescribeVpcIngressConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcIngressConnection",
}));

export type DisassociateCustomDomainError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociate a custom domain name from an App Runner service.
 *
 * Certificates tracking domain validity are associated with a custom domain and are stored in AWS
 * Certificate Manager (ACM). These certificates aren't deleted as part of this action. App Runner delays certificate deletion for
 * 30 days after a domain is disassociated from your service.
 */
export const disassociateCustomDomain: API.OperationMethod<
  DisassociateCustomDomainRequest,
  DisassociateCustomDomainResponse,
  DisassociateCustomDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateCustomDomainRequest,
  output: DisassociateCustomDomainResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCustomDomain",
}));

export type ListAutoScalingConfigurationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of active App Runner automatic scaling configurations in your Amazon Web Services account. You can query the revisions for a specific
 * configuration name or the revisions for all active configurations in your account. You can optionally query only the latest revision of each requested
 * name.
 *
 * To retrieve a full description of a particular configuration revision, call and provide one of
 * the ARNs returned by `ListAutoScalingConfigurations`.
 */
export const listAutoScalingConfigurations: API.PaginatedOperationMethod<
  ListAutoScalingConfigurationsRequest,
  ListAutoScalingConfigurationsResponse,
  ListAutoScalingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutoScalingConfigurationsRequest,
  output: ListAutoScalingConfigurationsResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutoScalingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of App Runner connections that are associated with your Amazon Web Services account.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionsRequest,
  output: ListConnectionsResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObservabilityConfigurationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of active App Runner observability configurations in your Amazon Web Services account. You can query the revisions for a specific
 * configuration name or the revisions for all active configurations in your account. You can optionally query only the latest revision of each requested
 * name.
 *
 * To retrieve a full description of a particular configuration revision, call and provide one
 * of the ARNs returned by `ListObservabilityConfigurations`.
 */
export const listObservabilityConfigurations: API.PaginatedOperationMethod<
  ListObservabilityConfigurationsRequest,
  ListObservabilityConfigurationsResponse,
  ListObservabilityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListObservabilityConfigurationsRequest,
  output: ListObservabilityConfigurationsResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObservabilityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOperationsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Return a list of operations that occurred on an App Runner service.
 *
 * The resulting list of OperationSummary objects is sorted in reverse chronological order. The first object on the list represents the
 * last started operation.
 */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of running App Runner services in your Amazon Web Services account.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesForAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the associated App Runner services using an auto scaling configuration.
 */
export const listServicesForAutoScalingConfiguration: API.PaginatedOperationMethod<
  ListServicesForAutoScalingConfigurationRequest,
  ListServicesForAutoScalingConfigurationResponse,
  ListServicesForAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesForAutoScalingConfigurationRequest,
  output: ListServicesForAutoScalingConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicesForAutoScalingConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List tags that are associated with for an App Runner resource. The response contains a list of tag key-value pairs.
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
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVpcConnectorsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of App Runner VPC connectors in your Amazon Web Services account.
 */
export const listVpcConnectors: API.PaginatedOperationMethod<
  ListVpcConnectorsRequest,
  ListVpcConnectorsResponse,
  ListVpcConnectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVpcConnectorsRequest,
  output: ListVpcConnectorsResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcIngressConnectionsError =
  | InternalServiceErrorException
  | InvalidRequestException
  | CommonErrors;
/**
 * Return a list of App Runner VPC Ingress Connections in your Amazon Web Services account.
 */
export const listVpcIngressConnections: API.PaginatedOperationMethod<
  ListVpcIngressConnectionsRequest,
  ListVpcIngressConnectionsResponse,
  ListVpcIngressConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVpcIngressConnectionsRequest,
  output: ListVpcIngressConnectionsResponse,
  errors: [InternalServiceErrorException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcIngressConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PauseServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Pause an active App Runner service. App Runner reduces compute capacity for the service to zero and loses state (for example, ephemeral storage is
 * removed).
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const pauseService: API.OperationMethod<
  PauseServiceRequest,
  PauseServiceResponse,
  PauseServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PauseServiceRequest,
  output: PauseServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseService",
}));

export type ResumeServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resume an active App Runner service. App Runner provisions compute capacity for the service.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const resumeService: API.OperationMethod<
  ResumeServiceRequest,
  ResumeServiceResponse,
  ResumeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeServiceRequest,
  output: ResumeServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeService",
}));

export type StartDeploymentError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiate a manual deployment of the latest commit in a source code repository or the latest image in a source image repository to an App Runner
 * service.
 *
 * For a source code repository, App Runner retrieves the commit and builds a Docker image. For a source image repository, App Runner retrieves the latest Docker
 * image. In both cases, App Runner then deploys the new image to your service and starts a new container instance.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  StartDeploymentResponse,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDeploymentRequest,
  output: StartDeploymentResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

export type TagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Add tags to, or update the tag values of, an App Runner resource. A tag is a key-value pair.
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
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Remove tags from an App Runner resource.
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
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDefaultAutoScalingConfigurationError =
  | InternalServiceErrorException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an auto scaling configuration to be the default. The existing default auto scaling configuration will be set to non-default
 * automatically.
 */
export const updateDefaultAutoScalingConfiguration: API.OperationMethod<
  UpdateDefaultAutoScalingConfigurationRequest,
  UpdateDefaultAutoScalingConfigurationResponse,
  UpdateDefaultAutoScalingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDefaultAutoScalingConfigurationRequest,
  output: UpdateDefaultAutoScalingConfigurationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultAutoScalingConfiguration",
}));

export type UpdateServiceError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an App Runner service. You can update the source configuration and instance configuration of the service. You can also update the ARN of the auto
 * scaling configuration resource that's associated with the service. However, you can't change the name or the encryption configuration of the service.
 * These can be set only when you create the service.
 *
 * To update the tags applied to your service, use the separate actions TagResource and UntagResource.
 *
 * This is an asynchronous operation. On a successful call, you can use the returned `OperationId` and the ListOperations
 * call to track the operation's progress.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceRequest,
  output: UpdateServiceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateVpcIngressConnectionError =
  | InternalServiceErrorException
  | InvalidRequestException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update an existing App Runner VPC Ingress Connection resource. The VPC Ingress Connection must be in one of the following states to be updated:
 *
 * - AVAILABLE
 *
 * - FAILED_CREATION
 *
 * - FAILED_UPDATE
 */
export const updateVpcIngressConnection: API.OperationMethod<
  UpdateVpcIngressConnectionRequest,
  UpdateVpcIngressConnectionResponse,
  UpdateVpcIngressConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVpcIngressConnectionRequest,
  output: UpdateVpcIngressConnectionResponse,
  errors: [
    InternalServiceErrorException,
    InvalidRequestException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcIngressConnection",
}));
