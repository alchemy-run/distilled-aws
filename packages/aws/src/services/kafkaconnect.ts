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
  sdkId: "KafkaConnect",
  serviceShapeName: "KafkaConnect",
});
const auth = T.AwsAuthSigv4({ name: "kafkaconnect" });
const ver = T.ServiceVersion("2021-09-14");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://kafkaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kafkaconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://kafkaconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type __integerMin1Max8 = number;
export type __integerMin1Max100 = number;
export interface ScaleInPolicy {
  cpuUtilizationPercentage: number;
}
export const ScaleInPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.Number }),
).annotate({ identifier: "ScaleInPolicy" }) as any as S.Schema<ScaleInPolicy>;
export interface ScaleOutPolicy {
  cpuUtilizationPercentage: number;
}
export const ScaleOutPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.Number }),
).annotate({ identifier: "ScaleOutPolicy" }) as any as S.Schema<ScaleOutPolicy>;
export interface AutoScaling {
  maxWorkerCount: number;
  mcuCount: number;
  minWorkerCount: number;
  scaleInPolicy?: ScaleInPolicy;
  scaleOutPolicy?: ScaleOutPolicy;
  maxAutoscalingTaskCount?: number;
}
export const AutoScaling = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxWorkerCount: S.Number,
    mcuCount: S.Number,
    minWorkerCount: S.Number,
    scaleInPolicy: S.optional(ScaleInPolicy),
    scaleOutPolicy: S.optional(ScaleOutPolicy),
    maxAutoscalingTaskCount: S.optional(S.Number),
  }),
).annotate({ identifier: "AutoScaling" }) as any as S.Schema<AutoScaling>;
export interface ProvisionedCapacity {
  mcuCount: number;
  workerCount: number;
}
export const ProvisionedCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mcuCount: S.Number, workerCount: S.Number }),
).annotate({
  identifier: "ProvisionedCapacity",
}) as any as S.Schema<ProvisionedCapacity>;
export interface Capacity {
  autoScaling?: AutoScaling;
  provisionedCapacity?: ProvisionedCapacity;
}
export const Capacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScaling: S.optional(AutoScaling),
    provisionedCapacity: S.optional(ProvisionedCapacity),
  }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type ConnectorConfiguration = { [key: string]: string | undefined };
export const ConnectorConfiguration = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type __stringMax1024 = string;
export type __stringMin1Max128 = string;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface Vpc {
  securityGroups?: string[];
  subnets: string[];
}
export const Vpc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroups: S.optional(__listOf__string),
    subnets: __listOf__string,
  }),
).annotate({ identifier: "Vpc" }) as any as S.Schema<Vpc>;
export interface ApacheKafkaCluster {
  bootstrapServers: string;
  vpc: Vpc;
}
export const ApacheKafkaCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bootstrapServers: S.String, vpc: Vpc }),
).annotate({
  identifier: "ApacheKafkaCluster",
}) as any as S.Schema<ApacheKafkaCluster>;
export interface KafkaCluster {
  apacheKafkaCluster: ApacheKafkaCluster;
}
export const KafkaCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apacheKafkaCluster: ApacheKafkaCluster }),
).annotate({ identifier: "KafkaCluster" }) as any as S.Schema<KafkaCluster>;
export type KafkaClusterClientAuthenticationType = string;
export interface KafkaClusterClientAuthentication {
  authenticationType: string;
}
export const KafkaClusterClientAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authenticationType: S.String }),
).annotate({
  identifier: "KafkaClusterClientAuthentication",
}) as any as S.Schema<KafkaClusterClientAuthentication>;
export type KafkaClusterEncryptionInTransitType = string;
export interface KafkaClusterEncryptionInTransit {
  encryptionType: string;
}
export const KafkaClusterEncryptionInTransit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encryptionType: S.String }),
).annotate({
  identifier: "KafkaClusterEncryptionInTransit",
}) as any as S.Schema<KafkaClusterEncryptionInTransit>;
export interface CloudWatchLogsLogDelivery {
  enabled: boolean;
  logGroup?: string;
}
export const CloudWatchLogsLogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean, logGroup: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogsLogDelivery",
}) as any as S.Schema<CloudWatchLogsLogDelivery>;
export interface FirehoseLogDelivery {
  deliveryStream?: string;
  enabled: boolean;
}
export const FirehoseLogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deliveryStream: S.optional(S.String), enabled: S.Boolean }),
).annotate({
  identifier: "FirehoseLogDelivery",
}) as any as S.Schema<FirehoseLogDelivery>;
export interface S3LogDelivery {
  bucket?: string;
  enabled: boolean;
  prefix?: string;
}
export const S3LogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    enabled: S.Boolean,
    prefix: S.optional(S.String),
  }),
).annotate({ identifier: "S3LogDelivery" }) as any as S.Schema<S3LogDelivery>;
export interface WorkerLogDelivery {
  cloudWatchLogs?: CloudWatchLogsLogDelivery;
  firehose?: FirehoseLogDelivery;
  s3?: S3LogDelivery;
}
export const WorkerLogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudWatchLogs: S.optional(CloudWatchLogsLogDelivery),
    firehose: S.optional(FirehoseLogDelivery),
    s3: S.optional(S3LogDelivery),
  }),
).annotate({
  identifier: "WorkerLogDelivery",
}) as any as S.Schema<WorkerLogDelivery>;
export interface LogDelivery {
  workerLogDelivery: WorkerLogDelivery;
}
export const LogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workerLogDelivery: WorkerLogDelivery }),
).annotate({ identifier: "LogDelivery" }) as any as S.Schema<LogDelivery>;
export type NetworkType = string;
export type __longMin1 = number;
export interface CustomPlugin {
  customPluginArn: string;
  revision: number;
}
export const CustomPlugin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customPluginArn: S.String, revision: S.Number }),
).annotate({ identifier: "CustomPlugin" }) as any as S.Schema<CustomPlugin>;
export interface Plugin {
  customPlugin: CustomPlugin;
}
export const Plugin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customPlugin: CustomPlugin }),
).annotate({ identifier: "Plugin" }) as any as S.Schema<Plugin>;
export type __listOfPlugin = Plugin[];
export const __listOfPlugin = /*@__PURE__*/ S.Array(Plugin);
export interface WorkerConfiguration {
  revision: number;
  workerConfigurationArn: string;
}
export const WorkerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revision: S.Number, workerConfigurationArn: S.String }),
).annotate({
  identifier: "WorkerConfiguration",
}) as any as S.Schema<WorkerConfiguration>;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateConnectorRequest {
  capacity: Capacity;
  connectorConfiguration: { [key: string]: string | undefined };
  connectorDescription?: string;
  connectorName: string;
  kafkaCluster: KafkaCluster;
  kafkaClusterClientAuthentication: KafkaClusterClientAuthentication;
  kafkaClusterEncryptionInTransit: KafkaClusterEncryptionInTransit;
  kafkaConnectVersion: string;
  logDelivery?: LogDelivery;
  networkType?: string;
  plugins: Plugin[];
  serviceExecutionRoleArn: string;
  workerConfiguration?: WorkerConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: Capacity,
    connectorConfiguration: ConnectorConfiguration,
    connectorDescription: S.optional(S.String),
    connectorName: S.String,
    kafkaCluster: KafkaCluster,
    kafkaClusterClientAuthentication: KafkaClusterClientAuthentication,
    kafkaClusterEncryptionInTransit: KafkaClusterEncryptionInTransit,
    kafkaConnectVersion: S.String,
    logDelivery: S.optional(LogDelivery),
    networkType: S.optional(S.String),
    plugins: __listOfPlugin,
    serviceExecutionRoleArn: S.String,
    workerConfiguration: S.optional(WorkerConfiguration),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorRequest",
}) as any as S.Schema<CreateConnectorRequest>;
export type ConnectorState = string;
export interface CreateConnectorResponse {
  connectorArn?: string;
  connectorName?: string;
  connectorState?: string;
}
export const CreateConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.optional(S.String),
    connectorName: S.optional(S.String),
    connectorState: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateConnectorResponse",
}) as any as S.Schema<CreateConnectorResponse>;
export type CustomPluginContentType = string;
export interface S3Location {
  bucketArn: string;
  fileKey: string;
  objectVersion?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.String,
    fileKey: S.String,
    objectVersion: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface CustomPluginLocation {
  s3Location: S3Location;
}
export const CustomPluginLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Location: S3Location }),
).annotate({
  identifier: "CustomPluginLocation",
}) as any as S.Schema<CustomPluginLocation>;
export interface CreateCustomPluginRequest {
  contentType: string;
  description?: string;
  location: CustomPluginLocation;
  name: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateCustomPluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.String,
    description: S.optional(S.String),
    location: CustomPluginLocation,
    name: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/custom-plugins" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomPluginRequest",
}) as any as S.Schema<CreateCustomPluginRequest>;
export type CustomPluginState = string;
export interface CreateCustomPluginResponse {
  customPluginArn?: string;
  customPluginState?: string;
  name?: string;
  revision?: number;
}
export const CreateCustomPluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPluginArn: S.optional(S.String),
    customPluginState: S.optional(S.String),
    name: S.optional(S.String),
    revision: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateCustomPluginResponse",
}) as any as S.Schema<CreateCustomPluginResponse>;
export type __sensitiveString = string | redacted.Redacted<string>;
export interface CreateWorkerConfigurationRequest {
  description?: string;
  name: string;
  propertiesFileContent: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export const CreateWorkerConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    name: S.String,
    propertiesFileContent: SensitiveString,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/worker-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkerConfigurationRequest",
}) as any as S.Schema<CreateWorkerConfigurationRequest>;
export type __timestampIso8601 = Date;
export interface WorkerConfigurationRevisionSummary {
  creationTime?: Date;
  description?: string;
  revision?: number;
}
export const WorkerConfigurationRevisionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    revision: S.optional(S.Number),
  }),
).annotate({
  identifier: "WorkerConfigurationRevisionSummary",
}) as any as S.Schema<WorkerConfigurationRevisionSummary>;
export type WorkerConfigurationState = string;
export interface CreateWorkerConfigurationResponse {
  creationTime?: Date;
  latestRevision?: WorkerConfigurationRevisionSummary;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export const CreateWorkerConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    latestRevision: S.optional(WorkerConfigurationRevisionSummary),
    name: S.optional(S.String),
    workerConfigurationArn: S.optional(S.String),
    workerConfigurationState: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkerConfigurationResponse",
}) as any as S.Schema<CreateWorkerConfigurationResponse>;
export interface DeleteConnectorRequest {
  connectorArn: string;
  currentVersion?: string;
}
export const DeleteConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
    currentVersion: S.optional(S.String).pipe(T.HttpQuery("currentVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/connectors/{connectorArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorRequest",
}) as any as S.Schema<DeleteConnectorRequest>;
export interface DeleteConnectorResponse {
  connectorArn?: string;
  connectorState?: string;
}
export const DeleteConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.optional(S.String),
    connectorState: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteConnectorResponse",
}) as any as S.Schema<DeleteConnectorResponse>;
export interface DeleteCustomPluginRequest {
  customPluginArn: string;
}
export const DeleteCustomPluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPluginArn: S.String.pipe(T.HttpLabel("customPluginArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/custom-plugins/{customPluginArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomPluginRequest",
}) as any as S.Schema<DeleteCustomPluginRequest>;
export interface DeleteCustomPluginResponse {
  customPluginArn?: string;
  customPluginState?: string;
}
export const DeleteCustomPluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPluginArn: S.optional(S.String),
    customPluginState: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteCustomPluginResponse",
}) as any as S.Schema<DeleteCustomPluginResponse>;
export interface DeleteWorkerConfigurationRequest {
  workerConfigurationArn: string;
}
export const DeleteWorkerConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workerConfigurationArn: S.String.pipe(
      T.HttpLabel("workerConfigurationArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/worker-configurations/{workerConfigurationArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkerConfigurationRequest",
}) as any as S.Schema<DeleteWorkerConfigurationRequest>;
export interface DeleteWorkerConfigurationResponse {
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export const DeleteWorkerConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workerConfigurationArn: S.optional(S.String),
    workerConfigurationState: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteWorkerConfigurationResponse",
}) as any as S.Schema<DeleteWorkerConfigurationResponse>;
export interface DescribeConnectorRequest {
  connectorArn: string;
}
export const DescribeConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectorArn: S.String.pipe(T.HttpLabel("connectorArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/connectors/{connectorArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectorRequest",
}) as any as S.Schema<DescribeConnectorRequest>;
export interface ScaleInPolicyDescription {
  cpuUtilizationPercentage?: number;
}
export const ScaleInPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.optional(S.Number) }),
).annotate({
  identifier: "ScaleInPolicyDescription",
}) as any as S.Schema<ScaleInPolicyDescription>;
export interface ScaleOutPolicyDescription {
  cpuUtilizationPercentage?: number;
}
export const ScaleOutPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.optional(S.Number) }),
).annotate({
  identifier: "ScaleOutPolicyDescription",
}) as any as S.Schema<ScaleOutPolicyDescription>;
export interface AutoScalingDescription {
  maxWorkerCount?: number;
  mcuCount?: number;
  minWorkerCount?: number;
  scaleInPolicy?: ScaleInPolicyDescription;
  scaleOutPolicy?: ScaleOutPolicyDescription;
  maxAutoscalingTaskCount?: number;
}
export const AutoScalingDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxWorkerCount: S.optional(S.Number),
    mcuCount: S.optional(S.Number),
    minWorkerCount: S.optional(S.Number),
    scaleInPolicy: S.optional(ScaleInPolicyDescription),
    scaleOutPolicy: S.optional(ScaleOutPolicyDescription),
    maxAutoscalingTaskCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "AutoScalingDescription",
}) as any as S.Schema<AutoScalingDescription>;
export interface ProvisionedCapacityDescription {
  mcuCount?: number;
  workerCount?: number;
}
export const ProvisionedCapacityDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mcuCount: S.optional(S.Number),
    workerCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProvisionedCapacityDescription",
}) as any as S.Schema<ProvisionedCapacityDescription>;
export interface CapacityDescription {
  autoScaling?: AutoScalingDescription;
  provisionedCapacity?: ProvisionedCapacityDescription;
}
export const CapacityDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScaling: S.optional(AutoScalingDescription),
    provisionedCapacity: S.optional(ProvisionedCapacityDescription),
  }),
).annotate({
  identifier: "CapacityDescription",
}) as any as S.Schema<CapacityDescription>;
export interface VpcDescription {
  securityGroups?: string[];
  subnets?: string[];
}
export const VpcDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityGroups: S.optional(__listOf__string),
    subnets: S.optional(__listOf__string),
  }),
).annotate({ identifier: "VpcDescription" }) as any as S.Schema<VpcDescription>;
export interface ApacheKafkaClusterDescription {
  bootstrapServers?: string;
  vpc?: VpcDescription;
}
export const ApacheKafkaClusterDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bootstrapServers: S.optional(S.String),
    vpc: S.optional(VpcDescription),
  }),
).annotate({
  identifier: "ApacheKafkaClusterDescription",
}) as any as S.Schema<ApacheKafkaClusterDescription>;
export interface KafkaClusterDescription {
  apacheKafkaCluster?: ApacheKafkaClusterDescription;
}
export const KafkaClusterDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apacheKafkaCluster: S.optional(ApacheKafkaClusterDescription) }),
).annotate({
  identifier: "KafkaClusterDescription",
}) as any as S.Schema<KafkaClusterDescription>;
export interface KafkaClusterClientAuthenticationDescription {
  authenticationType?: string;
}
export const KafkaClusterClientAuthenticationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ authenticationType: S.optional(S.String) }),
  ).annotate({
    identifier: "KafkaClusterClientAuthenticationDescription",
  }) as any as S.Schema<KafkaClusterClientAuthenticationDescription>;
export interface KafkaClusterEncryptionInTransitDescription {
  encryptionType?: string;
}
export const KafkaClusterEncryptionInTransitDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ encryptionType: S.optional(S.String) }),
  ).annotate({
    identifier: "KafkaClusterEncryptionInTransitDescription",
  }) as any as S.Schema<KafkaClusterEncryptionInTransitDescription>;
export interface CloudWatchLogsLogDeliveryDescription {
  enabled?: boolean;
  logGroup?: string;
}
export const CloudWatchLogsLogDeliveryDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      enabled: S.optional(S.Boolean),
      logGroup: S.optional(S.String),
    }),
).annotate({
  identifier: "CloudWatchLogsLogDeliveryDescription",
}) as any as S.Schema<CloudWatchLogsLogDeliveryDescription>;
export interface FirehoseLogDeliveryDescription {
  deliveryStream?: string;
  enabled?: boolean;
}
export const FirehoseLogDeliveryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deliveryStream: S.optional(S.String),
    enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FirehoseLogDeliveryDescription",
}) as any as S.Schema<FirehoseLogDeliveryDescription>;
export interface S3LogDeliveryDescription {
  bucket?: string;
  enabled?: boolean;
  prefix?: string;
}
export const S3LogDeliveryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3LogDeliveryDescription",
}) as any as S.Schema<S3LogDeliveryDescription>;
export interface WorkerLogDeliveryDescription {
  cloudWatchLogs?: CloudWatchLogsLogDeliveryDescription;
  firehose?: FirehoseLogDeliveryDescription;
  s3?: S3LogDeliveryDescription;
}
export const WorkerLogDeliveryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudWatchLogs: S.optional(CloudWatchLogsLogDeliveryDescription),
    firehose: S.optional(FirehoseLogDeliveryDescription),
    s3: S.optional(S3LogDeliveryDescription),
  }),
).annotate({
  identifier: "WorkerLogDeliveryDescription",
}) as any as S.Schema<WorkerLogDeliveryDescription>;
export interface LogDeliveryDescription {
  workerLogDelivery?: WorkerLogDeliveryDescription;
}
export const LogDeliveryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workerLogDelivery: S.optional(WorkerLogDeliveryDescription) }),
).annotate({
  identifier: "LogDeliveryDescription",
}) as any as S.Schema<LogDeliveryDescription>;
export interface CustomPluginDescription {
  customPluginArn?: string;
  revision?: number;
}
export const CustomPluginDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPluginArn: S.optional(S.String),
    revision: S.optional(S.Number),
  }),
).annotate({
  identifier: "CustomPluginDescription",
}) as any as S.Schema<CustomPluginDescription>;
export interface PluginDescription {
  customPlugin?: CustomPluginDescription;
}
export const PluginDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customPlugin: S.optional(CustomPluginDescription) }),
).annotate({
  identifier: "PluginDescription",
}) as any as S.Schema<PluginDescription>;
export type __listOfPluginDescription = PluginDescription[];
export const __listOfPluginDescription =
  /*@__PURE__*/ S.Array(PluginDescription);
export interface WorkerConfigurationDescription {
  revision?: number;
  workerConfigurationArn?: string;
}
export const WorkerConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revision: S.optional(S.Number),
    workerConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkerConfigurationDescription",
}) as any as S.Schema<WorkerConfigurationDescription>;
export interface StateDescription {
  code?: string;
  message?: string;
}
export const StateDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({
  identifier: "StateDescription",
}) as any as S.Schema<StateDescription>;
export interface DescribeConnectorResponse {
  capacity?: CapacityDescription;
  connectorArn?: string;
  connectorConfiguration?: { [key: string]: string | undefined };
  connectorDescription?: string;
  connectorName?: string;
  connectorState?: string;
  creationTime?: Date;
  currentVersion?: string;
  kafkaCluster?: KafkaClusterDescription;
  kafkaClusterClientAuthentication?: KafkaClusterClientAuthenticationDescription;
  kafkaClusterEncryptionInTransit?: KafkaClusterEncryptionInTransitDescription;
  kafkaConnectVersion?: string;
  logDelivery?: LogDeliveryDescription;
  networkType?: string;
  plugins?: PluginDescription[];
  serviceExecutionRoleArn?: string;
  workerConfiguration?: WorkerConfigurationDescription;
  stateDescription?: StateDescription;
}
export const DescribeConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(CapacityDescription),
    connectorArn: S.optional(S.String),
    connectorConfiguration: S.optional(ConnectorConfiguration),
    connectorDescription: S.optional(S.String),
    connectorName: S.optional(S.String),
    connectorState: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    currentVersion: S.optional(S.String),
    kafkaCluster: S.optional(KafkaClusterDescription),
    kafkaClusterClientAuthentication: S.optional(
      KafkaClusterClientAuthenticationDescription,
    ),
    kafkaClusterEncryptionInTransit: S.optional(
      KafkaClusterEncryptionInTransitDescription,
    ),
    kafkaConnectVersion: S.optional(S.String),
    logDelivery: S.optional(LogDeliveryDescription),
    networkType: S.optional(S.String),
    plugins: S.optional(__listOfPluginDescription),
    serviceExecutionRoleArn: S.optional(S.String),
    workerConfiguration: S.optional(WorkerConfigurationDescription),
    stateDescription: S.optional(StateDescription),
  }),
).annotate({
  identifier: "DescribeConnectorResponse",
}) as any as S.Schema<DescribeConnectorResponse>;
export interface DescribeConnectorOperationRequest {
  connectorOperationArn: string;
}
export const DescribeConnectorOperationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorOperationArn: S.String.pipe(T.HttpLabel("connectorOperationArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/connectorOperations/{connectorOperationArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectorOperationRequest",
}) as any as S.Schema<DescribeConnectorOperationRequest>;
export type ConnectorOperationState = string;
export type ConnectorOperationType = string;
export type ConnectorOperationStepType = string;
export type ConnectorOperationStepState = string;
export interface ConnectorOperationStep {
  stepType?: string;
  stepState?: string;
}
export const ConnectorOperationStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stepType: S.optional(S.String), stepState: S.optional(S.String) }),
).annotate({
  identifier: "ConnectorOperationStep",
}) as any as S.Schema<ConnectorOperationStep>;
export type __listOfConnectorOperationStep = ConnectorOperationStep[];
export const __listOfConnectorOperationStep = /*@__PURE__*/ S.Array(
  ConnectorOperationStep,
);
export interface WorkerSetting {
  capacity?: CapacityDescription;
}
export const WorkerSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ capacity: S.optional(CapacityDescription) }),
).annotate({ identifier: "WorkerSetting" }) as any as S.Schema<WorkerSetting>;
export interface DescribeConnectorOperationResponse {
  connectorArn?: string;
  connectorOperationArn?: string;
  connectorOperationState?: string;
  connectorOperationType?: string;
  operationSteps?: ConnectorOperationStep[];
  originWorkerSetting?: WorkerSetting;
  originConnectorConfiguration?: { [key: string]: string | undefined };
  targetWorkerSetting?: WorkerSetting;
  targetConnectorConfiguration?: { [key: string]: string | undefined };
  errorInfo?: StateDescription;
  creationTime?: Date;
  endTime?: Date;
}
export const DescribeConnectorOperationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.optional(S.String),
    connectorOperationArn: S.optional(S.String),
    connectorOperationState: S.optional(S.String),
    connectorOperationType: S.optional(S.String),
    operationSteps: S.optional(__listOfConnectorOperationStep),
    originWorkerSetting: S.optional(WorkerSetting),
    originConnectorConfiguration: S.optional(ConnectorConfiguration),
    targetWorkerSetting: S.optional(WorkerSetting),
    targetConnectorConfiguration: S.optional(ConnectorConfiguration),
    errorInfo: S.optional(StateDescription),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "DescribeConnectorOperationResponse",
}) as any as S.Schema<DescribeConnectorOperationResponse>;
export interface DescribeCustomPluginRequest {
  customPluginArn: string;
}
export const DescribeCustomPluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPluginArn: S.String.pipe(T.HttpLabel("customPluginArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/custom-plugins/{customPluginArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCustomPluginRequest",
}) as any as S.Schema<DescribeCustomPluginRequest>;
export interface CustomPluginFileDescription {
  fileMd5?: string;
  fileSize?: number;
}
export const CustomPluginFileDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileMd5: S.optional(S.String), fileSize: S.optional(S.Number) }),
).annotate({
  identifier: "CustomPluginFileDescription",
}) as any as S.Schema<CustomPluginFileDescription>;
export interface S3LocationDescription {
  bucketArn?: string;
  fileKey?: string;
  objectVersion?: string;
}
export const S3LocationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.optional(S.String),
    fileKey: S.optional(S.String),
    objectVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "S3LocationDescription",
}) as any as S.Schema<S3LocationDescription>;
export interface CustomPluginLocationDescription {
  s3Location?: S3LocationDescription;
}
export const CustomPluginLocationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Location: S.optional(S3LocationDescription) }),
).annotate({
  identifier: "CustomPluginLocationDescription",
}) as any as S.Schema<CustomPluginLocationDescription>;
export interface CustomPluginRevisionSummary {
  contentType?: string;
  creationTime?: Date;
  description?: string;
  fileDescription?: CustomPluginFileDescription;
  location?: CustomPluginLocationDescription;
  revision?: number;
}
export const CustomPluginRevisionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    fileDescription: S.optional(CustomPluginFileDescription),
    location: S.optional(CustomPluginLocationDescription),
    revision: S.optional(S.Number),
  }),
).annotate({
  identifier: "CustomPluginRevisionSummary",
}) as any as S.Schema<CustomPluginRevisionSummary>;
export interface DescribeCustomPluginResponse {
  creationTime?: Date;
  customPluginArn?: string;
  customPluginState?: string;
  description?: string;
  latestRevision?: CustomPluginRevisionSummary;
  name?: string;
  stateDescription?: StateDescription;
}
export const DescribeCustomPluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customPluginArn: S.optional(S.String),
    customPluginState: S.optional(S.String),
    description: S.optional(S.String),
    latestRevision: S.optional(CustomPluginRevisionSummary),
    name: S.optional(S.String),
    stateDescription: S.optional(StateDescription),
  }),
).annotate({
  identifier: "DescribeCustomPluginResponse",
}) as any as S.Schema<DescribeCustomPluginResponse>;
export interface DescribeWorkerConfigurationRequest {
  workerConfigurationArn: string;
}
export const DescribeWorkerConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workerConfigurationArn: S.String.pipe(
      T.HttpLabel("workerConfigurationArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/worker-configurations/{workerConfigurationArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkerConfigurationRequest",
}) as any as S.Schema<DescribeWorkerConfigurationRequest>;
export interface WorkerConfigurationRevisionDescription {
  creationTime?: Date;
  description?: string;
  propertiesFileContent?: string | redacted.Redacted<string>;
  revision?: number;
}
export const WorkerConfigurationRevisionDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      creationTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      description: S.optional(S.String),
      propertiesFileContent: S.optional(SensitiveString),
      revision: S.optional(S.Number),
    }),
).annotate({
  identifier: "WorkerConfigurationRevisionDescription",
}) as any as S.Schema<WorkerConfigurationRevisionDescription>;
export interface DescribeWorkerConfigurationResponse {
  creationTime?: Date;
  description?: string;
  latestRevision?: WorkerConfigurationRevisionDescription;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export const DescribeWorkerConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    latestRevision: S.optional(WorkerConfigurationRevisionDescription),
    name: S.optional(S.String),
    workerConfigurationArn: S.optional(S.String),
    workerConfigurationState: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeWorkerConfigurationResponse",
}) as any as S.Schema<DescribeWorkerConfigurationResponse>;
export type MaxResults = number;
export interface ListConnectorOperationsRequest {
  connectorArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListConnectorOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/connectors/{connectorArn}/operations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorOperationsRequest",
}) as any as S.Schema<ListConnectorOperationsRequest>;
export interface ConnectorOperationSummary {
  connectorOperationArn?: string;
  connectorOperationType?: string;
  connectorOperationState?: string;
  creationTime?: Date;
  endTime?: Date;
}
export const ConnectorOperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorOperationArn: S.optional(S.String),
    connectorOperationType: S.optional(S.String),
    connectorOperationState: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "ConnectorOperationSummary",
}) as any as S.Schema<ConnectorOperationSummary>;
export type __listOfConnectorOperationSummary = ConnectorOperationSummary[];
export const __listOfConnectorOperationSummary = /*@__PURE__*/ S.Array(
  ConnectorOperationSummary,
);
export interface ListConnectorOperationsResponse {
  connectorOperations?: ConnectorOperationSummary[];
  nextToken?: string;
}
export const ListConnectorOperationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorOperations: S.optional(__listOfConnectorOperationSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorOperationsResponse",
}) as any as S.Schema<ListConnectorOperationsResponse>;
export interface ListConnectorsRequest {
  connectorNamePrefix?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorNamePrefix: S.optional(S.String).pipe(
      T.HttpQuery("connectorNamePrefix"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorsRequest",
}) as any as S.Schema<ListConnectorsRequest>;
export interface ConnectorSummary {
  capacity?: CapacityDescription;
  connectorArn?: string;
  connectorDescription?: string;
  connectorName?: string;
  connectorState?: string;
  creationTime?: Date;
  currentVersion?: string;
  kafkaCluster?: KafkaClusterDescription;
  kafkaClusterClientAuthentication?: KafkaClusterClientAuthenticationDescription;
  kafkaClusterEncryptionInTransit?: KafkaClusterEncryptionInTransitDescription;
  kafkaConnectVersion?: string;
  logDelivery?: LogDeliveryDescription;
  networkType?: string;
  plugins?: PluginDescription[];
  serviceExecutionRoleArn?: string;
  workerConfiguration?: WorkerConfigurationDescription;
}
export const ConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(CapacityDescription),
    connectorArn: S.optional(S.String),
    connectorDescription: S.optional(S.String),
    connectorName: S.optional(S.String),
    connectorState: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    currentVersion: S.optional(S.String),
    kafkaCluster: S.optional(KafkaClusterDescription),
    kafkaClusterClientAuthentication: S.optional(
      KafkaClusterClientAuthenticationDescription,
    ),
    kafkaClusterEncryptionInTransit: S.optional(
      KafkaClusterEncryptionInTransitDescription,
    ),
    kafkaConnectVersion: S.optional(S.String),
    logDelivery: S.optional(LogDeliveryDescription),
    networkType: S.optional(S.String),
    plugins: S.optional(__listOfPluginDescription),
    serviceExecutionRoleArn: S.optional(S.String),
    workerConfiguration: S.optional(WorkerConfigurationDescription),
  }),
).annotate({
  identifier: "ConnectorSummary",
}) as any as S.Schema<ConnectorSummary>;
export type __listOfConnectorSummary = ConnectorSummary[];
export const __listOfConnectorSummary = /*@__PURE__*/ S.Array(ConnectorSummary);
export interface ListConnectorsResponse {
  connectors?: ConnectorSummary[];
  nextToken?: string;
}
export const ListConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectors: S.optional(__listOfConnectorSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorsResponse",
}) as any as S.Schema<ListConnectorsResponse>;
export interface ListCustomPluginsRequest {
  maxResults?: number;
  nextToken?: string;
  namePrefix?: string;
}
export const ListCustomPluginsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    namePrefix: S.optional(S.String).pipe(T.HttpQuery("namePrefix")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/custom-plugins" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomPluginsRequest",
}) as any as S.Schema<ListCustomPluginsRequest>;
export interface CustomPluginSummary {
  creationTime?: Date;
  customPluginArn?: string;
  customPluginState?: string;
  description?: string;
  latestRevision?: CustomPluginRevisionSummary;
  name?: string;
}
export const CustomPluginSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customPluginArn: S.optional(S.String),
    customPluginState: S.optional(S.String),
    description: S.optional(S.String),
    latestRevision: S.optional(CustomPluginRevisionSummary),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomPluginSummary",
}) as any as S.Schema<CustomPluginSummary>;
export type __listOfCustomPluginSummary = CustomPluginSummary[];
export const __listOfCustomPluginSummary =
  /*@__PURE__*/ S.Array(CustomPluginSummary);
export interface ListCustomPluginsResponse {
  customPlugins?: CustomPluginSummary[];
  nextToken?: string;
}
export const ListCustomPluginsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customPlugins: S.optional(__listOfCustomPluginSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomPluginsResponse",
}) as any as S.Schema<ListCustomPluginsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
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
export interface ListWorkerConfigurationsRequest {
  maxResults?: number;
  nextToken?: string;
  namePrefix?: string;
}
export const ListWorkerConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    namePrefix: S.optional(S.String).pipe(T.HttpQuery("namePrefix")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/worker-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkerConfigurationsRequest",
}) as any as S.Schema<ListWorkerConfigurationsRequest>;
export interface WorkerConfigurationSummary {
  creationTime?: Date;
  description?: string;
  latestRevision?: WorkerConfigurationRevisionSummary;
  name?: string;
  workerConfigurationArn?: string;
  workerConfigurationState?: string;
}
export const WorkerConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    latestRevision: S.optional(WorkerConfigurationRevisionSummary),
    name: S.optional(S.String),
    workerConfigurationArn: S.optional(S.String),
    workerConfigurationState: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkerConfigurationSummary",
}) as any as S.Schema<WorkerConfigurationSummary>;
export type __listOfWorkerConfigurationSummary = WorkerConfigurationSummary[];
export const __listOfWorkerConfigurationSummary = /*@__PURE__*/ S.Array(
  WorkerConfigurationSummary,
);
export interface ListWorkerConfigurationsResponse {
  nextToken?: string;
  workerConfigurations?: WorkerConfigurationSummary[];
}
export const ListWorkerConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    workerConfigurations: S.optional(__listOfWorkerConfigurationSummary),
  }),
).annotate({
  identifier: "ListWorkerConfigurationsResponse",
}) as any as S.Schema<ListWorkerConfigurationsResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
export interface ScaleInPolicyUpdate {
  cpuUtilizationPercentage: number;
}
export const ScaleInPolicyUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.Number }),
).annotate({
  identifier: "ScaleInPolicyUpdate",
}) as any as S.Schema<ScaleInPolicyUpdate>;
export interface ScaleOutPolicyUpdate {
  cpuUtilizationPercentage: number;
}
export const ScaleOutPolicyUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuUtilizationPercentage: S.Number }),
).annotate({
  identifier: "ScaleOutPolicyUpdate",
}) as any as S.Schema<ScaleOutPolicyUpdate>;
export interface AutoScalingUpdate {
  maxWorkerCount: number;
  mcuCount: number;
  minWorkerCount: number;
  scaleInPolicy: ScaleInPolicyUpdate;
  scaleOutPolicy: ScaleOutPolicyUpdate;
  maxAutoscalingTaskCount?: number;
}
export const AutoScalingUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxWorkerCount: S.Number,
    mcuCount: S.Number,
    minWorkerCount: S.Number,
    scaleInPolicy: ScaleInPolicyUpdate,
    scaleOutPolicy: ScaleOutPolicyUpdate,
    maxAutoscalingTaskCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "AutoScalingUpdate",
}) as any as S.Schema<AutoScalingUpdate>;
export interface ProvisionedCapacityUpdate {
  mcuCount: number;
  workerCount: number;
}
export const ProvisionedCapacityUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mcuCount: S.Number, workerCount: S.Number }),
).annotate({
  identifier: "ProvisionedCapacityUpdate",
}) as any as S.Schema<ProvisionedCapacityUpdate>;
export interface CapacityUpdate {
  autoScaling?: AutoScalingUpdate;
  provisionedCapacity?: ProvisionedCapacityUpdate;
}
export const CapacityUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScaling: S.optional(AutoScalingUpdate),
    provisionedCapacity: S.optional(ProvisionedCapacityUpdate),
  }),
).annotate({ identifier: "CapacityUpdate" }) as any as S.Schema<CapacityUpdate>;
export type ConnectorConfigurationUpdate = {
  [key: string]: string | undefined;
};
export const ConnectorConfigurationUpdate = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface UpdateConnectorRequest {
  capacity?: CapacityUpdate;
  connectorConfiguration?: { [key: string]: string | undefined };
  connectorArn: string;
  currentVersion: string;
}
export const UpdateConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(CapacityUpdate),
    connectorConfiguration: S.optional(ConnectorConfigurationUpdate),
    connectorArn: S.String.pipe(T.HttpLabel("connectorArn")),
    currentVersion: S.String.pipe(T.HttpQuery("currentVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/connectors/{connectorArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConnectorRequest",
}) as any as S.Schema<UpdateConnectorRequest>;
export interface UpdateConnectorResponse {
  connectorArn?: string;
  connectorState?: string;
  connectorOperationArn?: string;
}
export const UpdateConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectorArn: S.optional(S.String),
    connectorState: S.optional(S.String),
    connectorOperationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateConnectorResponse",
}) as any as S.Schema<UpdateConnectorResponse>;
export type CreateConnectorError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a connector using the specified properties.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorRequest,
  output: CreateConnectorResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

export type CreateCustomPluginError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a custom plugin using the specified properties.
 */
export const createCustomPlugin: API.OperationMethod<
  CreateCustomPluginRequest,
  CreateCustomPluginResponse,
  CreateCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomPluginRequest,
  output: CreateCustomPluginResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomPlugin",
}));

export type CreateWorkerConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a worker configuration using the specified properties.
 */
export const createWorkerConfiguration: API.OperationMethod<
  CreateWorkerConfigurationRequest,
  CreateWorkerConfigurationResponse,
  CreateWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkerConfigurationRequest,
  output: CreateWorkerConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkerConfiguration",
}));

export type DeleteConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorRequest,
  output: DeleteConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

export type DeleteCustomPluginError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a custom plugin.
 */
export const deleteCustomPlugin: API.OperationMethod<
  DeleteCustomPluginRequest,
  DeleteCustomPluginResponse,
  DeleteCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomPluginRequest,
  output: DeleteCustomPluginResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomPlugin",
}));

export type DeleteWorkerConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified worker configuration.
 */
export const deleteWorkerConfiguration: API.OperationMethod<
  DeleteWorkerConfigurationRequest,
  DeleteWorkerConfigurationResponse,
  DeleteWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkerConfigurationRequest,
  output: DeleteWorkerConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkerConfiguration",
}));

export type DescribeConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns summary information about the connector.
 */
export const describeConnector: API.OperationMethod<
  DescribeConnectorRequest,
  DescribeConnectorResponse,
  DescribeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectorRequest,
  output: DescribeConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnector",
}));

export type DescribeConnectorOperationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about the specified connector's operations.
 */
export const describeConnectorOperation: API.OperationMethod<
  DescribeConnectorOperationRequest,
  DescribeConnectorOperationResponse,
  DescribeConnectorOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectorOperationRequest,
  output: DescribeConnectorOperationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectorOperation",
}));

export type DescribeCustomPluginError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A summary description of the custom plugin.
 */
export const describeCustomPlugin: API.OperationMethod<
  DescribeCustomPluginRequest,
  DescribeCustomPluginResponse,
  DescribeCustomPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomPluginRequest,
  output: DescribeCustomPluginResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomPlugin",
}));

export type DescribeWorkerConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a worker configuration.
 */
export const describeWorkerConfiguration: API.OperationMethod<
  DescribeWorkerConfigurationRequest,
  DescribeWorkerConfigurationResponse,
  DescribeWorkerConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkerConfigurationRequest,
  output: DescribeWorkerConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkerConfiguration",
}));

export type ListConnectorOperationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a connector's operation(s).
 */
export const listConnectorOperations: API.PaginatedOperationMethod<
  ListConnectorOperationsRequest,
  ListConnectorOperationsResponse,
  ListConnectorOperationsError,
  Credentials | HttpClient.HttpClient,
  ConnectorOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorOperationsRequest,
  output: ListConnectorOperationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectorOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all the connectors in this account and Region. The list is limited to connectors whose name starts with the specified prefix. The response also includes a description of each of the listed connectors.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomPluginsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all of the custom plugins in this account and Region.
 */
export const listCustomPlugins: API.PaginatedOperationMethod<
  ListCustomPluginsRequest,
  ListCustomPluginsResponse,
  ListCustomPluginsError,
  Credentials | HttpClient.HttpClient,
  CustomPluginSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomPluginsRequest,
  output: ListCustomPluginsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomPlugins",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "customPlugins",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all the tags attached to the specified resource.
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
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWorkerConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of all of the worker configurations in this account and Region.
 */
export const listWorkerConfigurations: API.PaginatedOperationMethod<
  ListWorkerConfigurationsRequest,
  ListWorkerConfigurationsResponse,
  ListWorkerConfigurationsError,
  Credentials | HttpClient.HttpClient,
  WorkerConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkerConfigurationsRequest,
  output: ListWorkerConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkerConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workerConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches tags to the specified resource.
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
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
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
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectorError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified connector. For request body, specify only one parameter: either `capacity` or `connectorConfiguration`.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  UpdateConnectorResponse,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectorRequest,
  output: UpdateConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
}));
