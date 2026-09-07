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
const ns = T.XmlNamespace("http://events.amazonaws.com/doc/2015-10-07");
const svc = T.AwsApiService({ sdkId: "Pipes", serviceShapeName: "Pipes" });
const auth = T.AwsAuthSigv4({ name: "pipes" });
const ver = T.ServiceVersion("2015-10-07");
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
              `https://pipes-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pipes-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pipes.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://pipes.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

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
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type PipeName = string;
export type PipeDescription = string | redacted.Redacted<string>;
export type RequestedPipeState = string;
export type ArnOrUrl = string;
export type EventPattern = string | redacted.Redacted<string>;
export interface Filter {
  Pattern?: string | redacted.Redacted<string>;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pattern: S.optional(SensitiveString) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface FilterCriteria {
  Filters?: Filter[];
}
export const FilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Filters: S.optional(FilterList) }),
).annotate({ identifier: "FilterCriteria" }) as any as S.Schema<FilterCriteria>;
export type LimitMax10000 = number;
export type Arn = string;
export interface DeadLetterConfig {
  Arn?: string;
}
export const DeadLetterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeadLetterConfig",
}) as any as S.Schema<DeadLetterConfig>;
export type OnPartialBatchItemFailureStreams = string;
export type MaximumBatchingWindowInSeconds = number;
export type MaximumRecordAgeInSeconds = number;
export type MaximumRetryAttemptsESM = number;
export type LimitMax10 = number;
export type KinesisStreamStartPosition = string;
export interface PipeSourceKinesisStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
  StartingPosition: string;
  StartingPositionTimestamp?: Date;
}
export const PipeSourceKinesisStreamParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchSize: S.optional(S.Number),
    DeadLetterConfig: S.optional(DeadLetterConfig),
    OnPartialBatchItemFailure: S.optional(S.String),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
    MaximumRecordAgeInSeconds: S.optional(S.Number),
    MaximumRetryAttempts: S.optional(S.Number),
    ParallelizationFactor: S.optional(S.Number),
    StartingPosition: S.String,
    StartingPositionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PipeSourceKinesisStreamParameters",
}) as any as S.Schema<PipeSourceKinesisStreamParameters>;
export type DynamoDBStreamStartPosition = string;
export interface PipeSourceDynamoDBStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
  StartingPosition: string;
}
export const PipeSourceDynamoDBStreamParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchSize: S.optional(S.Number),
    DeadLetterConfig: S.optional(DeadLetterConfig),
    OnPartialBatchItemFailure: S.optional(S.String),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
    MaximumRecordAgeInSeconds: S.optional(S.Number),
    MaximumRetryAttempts: S.optional(S.Number),
    ParallelizationFactor: S.optional(S.Number),
    StartingPosition: S.String,
  }),
).annotate({
  identifier: "PipeSourceDynamoDBStreamParameters",
}) as any as S.Schema<PipeSourceDynamoDBStreamParameters>;
export interface PipeSourceSqsQueueParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const PipeSourceSqsQueueParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchSize: S.optional(S.Number),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "PipeSourceSqsQueueParameters",
}) as any as S.Schema<PipeSourceSqsQueueParameters>;
export type SecretManagerArn = string;
export type MQBrokerAccessCredentials = { BasicAuth: string };
export const MQBrokerAccessCredentials = /*@__PURE__*/ S.Union([
  S.Struct({ BasicAuth: S.String }),
]);
export type MQBrokerQueueName = string | redacted.Redacted<string>;
export interface PipeSourceActiveMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  QueueName: string | redacted.Redacted<string>;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const PipeSourceActiveMQBrokerParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: MQBrokerAccessCredentials,
    QueueName: SensitiveString,
    BatchSize: S.optional(S.Number),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "PipeSourceActiveMQBrokerParameters",
}) as any as S.Schema<PipeSourceActiveMQBrokerParameters>;
export type URI = string | redacted.Redacted<string>;
export interface PipeSourceRabbitMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  QueueName: string | redacted.Redacted<string>;
  VirtualHost?: string | redacted.Redacted<string>;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const PipeSourceRabbitMQBrokerParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: MQBrokerAccessCredentials,
    QueueName: SensitiveString,
    VirtualHost: S.optional(SensitiveString),
    BatchSize: S.optional(S.Number),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "PipeSourceRabbitMQBrokerParameters",
}) as any as S.Schema<PipeSourceRabbitMQBrokerParameters>;
export type KafkaTopicName = string | redacted.Redacted<string>;
export type MSKStartPosition = string;
export type MSKAccessCredentials =
  | { SaslScram512Auth: string; ClientCertificateTlsAuth?: never }
  | { SaslScram512Auth?: never; ClientCertificateTlsAuth: string };
export const MSKAccessCredentials = /*@__PURE__*/ S.Union([
  S.Struct({ SaslScram512Auth: S.String }),
  S.Struct({ ClientCertificateTlsAuth: S.String }),
]);
export interface PipeSourceManagedStreamingKafkaParameters {
  TopicName: string | redacted.Redacted<string>;
  StartingPosition?: string;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ConsumerGroupID?: string | redacted.Redacted<string>;
  Credentials?: MSKAccessCredentials;
}
export const PipeSourceManagedStreamingKafkaParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TopicName: SensitiveString,
      StartingPosition: S.optional(S.String),
      BatchSize: S.optional(S.Number),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
      ConsumerGroupID: S.optional(SensitiveString),
      Credentials: S.optional(MSKAccessCredentials),
    }),
  ).annotate({
    identifier: "PipeSourceManagedStreamingKafkaParameters",
  }) as any as S.Schema<PipeSourceManagedStreamingKafkaParameters>;
export type SelfManagedKafkaStartPosition = string;
export type EndpointString = string | redacted.Redacted<string>;
export type KafkaBootstrapServers = (string | redacted.Redacted<string>)[];
export const KafkaBootstrapServers = /*@__PURE__*/ S.Array(SensitiveString);
export type SelfManagedKafkaAccessConfigurationCredentials =
  | {
      BasicAuth: string;
      SaslScram512Auth?: never;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth: string;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth?: never;
      SaslScram256Auth: string;
      ClientCertificateTlsAuth?: never;
    }
  | {
      BasicAuth?: never;
      SaslScram512Auth?: never;
      SaslScram256Auth?: never;
      ClientCertificateTlsAuth: string;
    };
export const SelfManagedKafkaAccessConfigurationCredentials =
  /*@__PURE__*/ S.Union([
    S.Struct({ BasicAuth: S.String }),
    S.Struct({ SaslScram512Auth: S.String }),
    S.Struct({ SaslScram256Auth: S.String }),
    S.Struct({ ClientCertificateTlsAuth: S.String }),
  ]);
export type SubnetId = string | redacted.Redacted<string>;
export type SubnetIds = (string | redacted.Redacted<string>)[];
export const SubnetIds = /*@__PURE__*/ S.Array(SensitiveString);
export type SecurityGroupId = string | redacted.Redacted<string>;
export type SecurityGroupIds = (string | redacted.Redacted<string>)[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(SensitiveString);
export interface SelfManagedKafkaAccessConfigurationVpc {
  Subnets?: (string | redacted.Redacted<string>)[];
  SecurityGroup?: (string | redacted.Redacted<string>)[];
}
export const SelfManagedKafkaAccessConfigurationVpc = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Subnets: S.optional(SubnetIds),
      SecurityGroup: S.optional(SecurityGroupIds),
    }),
).annotate({
  identifier: "SelfManagedKafkaAccessConfigurationVpc",
}) as any as S.Schema<SelfManagedKafkaAccessConfigurationVpc>;
export interface PipeSourceSelfManagedKafkaParameters {
  TopicName: string | redacted.Redacted<string>;
  StartingPosition?: string;
  AdditionalBootstrapServers?: (string | redacted.Redacted<string>)[];
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ConsumerGroupID?: string | redacted.Redacted<string>;
  Credentials?: SelfManagedKafkaAccessConfigurationCredentials;
  ServerRootCaCertificate?: string;
  Vpc?: SelfManagedKafkaAccessConfigurationVpc;
}
export const PipeSourceSelfManagedKafkaParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TopicName: SensitiveString,
      StartingPosition: S.optional(S.String),
      AdditionalBootstrapServers: S.optional(KafkaBootstrapServers),
      BatchSize: S.optional(S.Number),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
      ConsumerGroupID: S.optional(SensitiveString),
      Credentials: S.optional(SelfManagedKafkaAccessConfigurationCredentials),
      ServerRootCaCertificate: S.optional(S.String),
      Vpc: S.optional(SelfManagedKafkaAccessConfigurationVpc),
    }),
).annotate({
  identifier: "PipeSourceSelfManagedKafkaParameters",
}) as any as S.Schema<PipeSourceSelfManagedKafkaParameters>;
export interface PipeSourceParameters {
  FilterCriteria?: FilterCriteria;
  KinesisStreamParameters?: PipeSourceKinesisStreamParameters;
  DynamoDBStreamParameters?: PipeSourceDynamoDBStreamParameters;
  SqsQueueParameters?: PipeSourceSqsQueueParameters;
  ActiveMQBrokerParameters?: PipeSourceActiveMQBrokerParameters;
  RabbitMQBrokerParameters?: PipeSourceRabbitMQBrokerParameters;
  ManagedStreamingKafkaParameters?: PipeSourceManagedStreamingKafkaParameters;
  SelfManagedKafkaParameters?: PipeSourceSelfManagedKafkaParameters;
}
export const PipeSourceParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterCriteria: S.optional(FilterCriteria),
    KinesisStreamParameters: S.optional(PipeSourceKinesisStreamParameters),
    DynamoDBStreamParameters: S.optional(PipeSourceDynamoDBStreamParameters),
    SqsQueueParameters: S.optional(PipeSourceSqsQueueParameters),
    ActiveMQBrokerParameters: S.optional(PipeSourceActiveMQBrokerParameters),
    RabbitMQBrokerParameters: S.optional(PipeSourceRabbitMQBrokerParameters),
    ManagedStreamingKafkaParameters: S.optional(
      PipeSourceManagedStreamingKafkaParameters,
    ),
    SelfManagedKafkaParameters: S.optional(
      PipeSourceSelfManagedKafkaParameters,
    ),
  }),
).annotate({
  identifier: "PipeSourceParameters",
}) as any as S.Schema<PipeSourceParameters>;
export type OptionalArn = string;
export type InputTemplate = string | redacted.Redacted<string>;
export type PathParameter = string | redacted.Redacted<string>;
export type PathParameterList = (string | redacted.Redacted<string>)[];
export const PathParameterList = /*@__PURE__*/ S.Array(SensitiveString);
export type HeaderKey = string;
export type HeaderValue = string | redacted.Redacted<string>;
export type HeaderParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const HeaderParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type QueryStringKey = string;
export type QueryStringValue = string | redacted.Redacted<string>;
export type QueryStringParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const QueryStringParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface PipeEnrichmentHttpParameters {
  PathParameterValues?: (string | redacted.Redacted<string>)[];
  HeaderParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  QueryStringParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const PipeEnrichmentHttpParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PathParameterValues: S.optional(PathParameterList),
    HeaderParameters: S.optional(HeaderParametersMap),
    QueryStringParameters: S.optional(QueryStringParametersMap),
  }),
).annotate({
  identifier: "PipeEnrichmentHttpParameters",
}) as any as S.Schema<PipeEnrichmentHttpParameters>;
export interface PipeEnrichmentParameters {
  InputTemplate?: string | redacted.Redacted<string>;
  HttpParameters?: PipeEnrichmentHttpParameters;
}
export const PipeEnrichmentParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputTemplate: S.optional(SensitiveString),
    HttpParameters: S.optional(PipeEnrichmentHttpParameters),
  }),
).annotate({
  identifier: "PipeEnrichmentParameters",
}) as any as S.Schema<PipeEnrichmentParameters>;
export type PipeTargetInvocationType = string;
export interface PipeTargetLambdaFunctionParameters {
  InvocationType?: string;
}
export const PipeTargetLambdaFunctionParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvocationType: S.optional(S.String) }),
).annotate({
  identifier: "PipeTargetLambdaFunctionParameters",
}) as any as S.Schema<PipeTargetLambdaFunctionParameters>;
export interface PipeTargetStateMachineParameters {
  InvocationType?: string;
}
export const PipeTargetStateMachineParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvocationType: S.optional(S.String) }),
).annotate({
  identifier: "PipeTargetStateMachineParameters",
}) as any as S.Schema<PipeTargetStateMachineParameters>;
export type KinesisPartitionKey = string | redacted.Redacted<string>;
export interface PipeTargetKinesisStreamParameters {
  PartitionKey: string | redacted.Redacted<string>;
}
export const PipeTargetKinesisStreamParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PartitionKey: SensitiveString }),
).annotate({
  identifier: "PipeTargetKinesisStreamParameters",
}) as any as S.Schema<PipeTargetKinesisStreamParameters>;
export type ArnOrJsonPath = string;
export type LimitMin1 = number;
export type LaunchType = string;
export type Subnet = string | redacted.Redacted<string>;
export type Subnets = (string | redacted.Redacted<string>)[];
export const Subnets = /*@__PURE__*/ S.Array(SensitiveString);
export type SecurityGroup = string | redacted.Redacted<string>;
export type SecurityGroups = (string | redacted.Redacted<string>)[];
export const SecurityGroups = /*@__PURE__*/ S.Array(SensitiveString);
export type AssignPublicIp = string;
export interface AwsVpcConfiguration {
  Subnets: (string | redacted.Redacted<string>)[];
  SecurityGroups?: (string | redacted.Redacted<string>)[];
  AssignPublicIp?: string;
}
export const AwsVpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subnets: Subnets,
    SecurityGroups: S.optional(SecurityGroups),
    AssignPublicIp: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsVpcConfiguration",
}) as any as S.Schema<AwsVpcConfiguration>;
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export const NetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ awsvpcConfiguration: S.optional(AwsVpcConfiguration) }),
).annotate({
  identifier: "NetworkConfiguration",
}) as any as S.Schema<NetworkConfiguration>;
export type CapacityProvider = string | redacted.Redacted<string>;
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string | redacted.Redacted<string>;
  weight?: number;
  base?: number;
}
export const CapacityProviderStrategyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacityProvider: SensitiveString,
    weight: S.optional(S.Number),
    base: S.optional(S.Number),
  }),
).annotate({
  identifier: "CapacityProviderStrategyItem",
}) as any as S.Schema<CapacityProviderStrategyItem>;
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export const CapacityProviderStrategy = /*@__PURE__*/ S.Array(
  CapacityProviderStrategyItem,
);
export type PlacementConstraintType = string;
export type PlacementConstraintExpression = string | redacted.Redacted<string>;
export interface PlacementConstraint {
  type?: string;
  expression?: string | redacted.Redacted<string>;
}
export const PlacementConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    expression: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "PlacementConstraint",
}) as any as S.Schema<PlacementConstraint>;
export type PlacementConstraints = PlacementConstraint[];
export const PlacementConstraints = /*@__PURE__*/ S.Array(PlacementConstraint);
export type PlacementStrategyType = string;
export type PlacementStrategyField = string | redacted.Redacted<string>;
export interface PlacementStrategy {
  type?: string;
  field?: string | redacted.Redacted<string>;
}
export const PlacementStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String), field: S.optional(SensitiveString) }),
).annotate({
  identifier: "PlacementStrategy",
}) as any as S.Schema<PlacementStrategy>;
export type PlacementStrategies = PlacementStrategy[];
export const PlacementStrategies = /*@__PURE__*/ S.Array(PlacementStrategy);
export type PropagateTags = string;
export type ReferenceId = string | redacted.Redacted<string>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface EcsEnvironmentVariable {
  name?: string;
  value?: string;
}
export const EcsEnvironmentVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "EcsEnvironmentVariable",
}) as any as S.Schema<EcsEnvironmentVariable>;
export type EcsEnvironmentVariableList = EcsEnvironmentVariable[];
export const EcsEnvironmentVariableList = /*@__PURE__*/ S.Array(
  EcsEnvironmentVariable,
);
export type EcsEnvironmentFileType = string;
export interface EcsEnvironmentFile {
  type: string;
  value: string;
}
export const EcsEnvironmentFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, value: S.String }),
).annotate({
  identifier: "EcsEnvironmentFile",
}) as any as S.Schema<EcsEnvironmentFile>;
export type EcsEnvironmentFileList = EcsEnvironmentFile[];
export const EcsEnvironmentFileList = /*@__PURE__*/ S.Array(EcsEnvironmentFile);
export type EcsResourceRequirementType = string;
export interface EcsResourceRequirement {
  type: string;
  value: string;
}
export const EcsResourceRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, value: S.String }),
).annotate({
  identifier: "EcsResourceRequirement",
}) as any as S.Schema<EcsResourceRequirement>;
export type EcsResourceRequirementsList = EcsResourceRequirement[];
export const EcsResourceRequirementsList = /*@__PURE__*/ S.Array(
  EcsResourceRequirement,
);
export interface EcsContainerOverride {
  Command?: string[];
  Cpu?: number;
  Environment?: EcsEnvironmentVariable[];
  EnvironmentFiles?: EcsEnvironmentFile[];
  Memory?: number;
  MemoryReservation?: number;
  Name?: string;
  ResourceRequirements?: EcsResourceRequirement[];
}
export const EcsContainerOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Command: S.optional(StringList),
    Cpu: S.optional(S.Number),
    Environment: S.optional(EcsEnvironmentVariableList),
    EnvironmentFiles: S.optional(EcsEnvironmentFileList),
    Memory: S.optional(S.Number),
    MemoryReservation: S.optional(S.Number),
    Name: S.optional(S.String),
    ResourceRequirements: S.optional(EcsResourceRequirementsList),
  }),
).annotate({
  identifier: "EcsContainerOverride",
}) as any as S.Schema<EcsContainerOverride>;
export type EcsContainerOverrideList = EcsContainerOverride[];
export const EcsContainerOverrideList =
  /*@__PURE__*/ S.Array(EcsContainerOverride);
export type EphemeralStorageSize = number;
export interface EcsEphemeralStorage {
  sizeInGiB: number;
}
export const EcsEphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sizeInGiB: S.Number }),
).annotate({
  identifier: "EcsEphemeralStorage",
}) as any as S.Schema<EcsEphemeralStorage>;
export interface EcsInferenceAcceleratorOverride {
  deviceName?: string;
  deviceType?: string;
}
export const EcsInferenceAcceleratorOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    deviceType: S.optional(S.String),
  }),
).annotate({
  identifier: "EcsInferenceAcceleratorOverride",
}) as any as S.Schema<EcsInferenceAcceleratorOverride>;
export type EcsInferenceAcceleratorOverrideList =
  EcsInferenceAcceleratorOverride[];
export const EcsInferenceAcceleratorOverrideList = /*@__PURE__*/ S.Array(
  EcsInferenceAcceleratorOverride,
);
export interface EcsTaskOverride {
  ContainerOverrides?: EcsContainerOverride[];
  Cpu?: string;
  EphemeralStorage?: EcsEphemeralStorage;
  ExecutionRoleArn?: string;
  InferenceAcceleratorOverrides?: EcsInferenceAcceleratorOverride[];
  Memory?: string;
  TaskRoleArn?: string;
}
export const EcsTaskOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerOverrides: S.optional(EcsContainerOverrideList),
    Cpu: S.optional(S.String),
    EphemeralStorage: S.optional(EcsEphemeralStorage),
    ExecutionRoleArn: S.optional(S.String),
    InferenceAcceleratorOverrides: S.optional(
      EcsInferenceAcceleratorOverrideList,
    ),
    Memory: S.optional(S.String),
    TaskRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EcsTaskOverride",
}) as any as S.Schema<EcsTaskOverride>;
export type TagKey = string;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface PipeTargetEcsTaskParameters {
  TaskDefinitionArn: string;
  TaskCount?: number;
  LaunchType?: string;
  NetworkConfiguration?: NetworkConfiguration;
  PlatformVersion?: string;
  Group?: string;
  CapacityProviderStrategy?: CapacityProviderStrategyItem[];
  EnableECSManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  PlacementConstraints?: PlacementConstraint[];
  PlacementStrategy?: PlacementStrategy[];
  PropagateTags?: string;
  ReferenceId?: string | redacted.Redacted<string>;
  Overrides?: EcsTaskOverride;
  Tags?: Tag[];
}
export const PipeTargetEcsTaskParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskDefinitionArn: S.String,
    TaskCount: S.optional(S.Number),
    LaunchType: S.optional(S.String),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    PlatformVersion: S.optional(S.String),
    Group: S.optional(S.String),
    CapacityProviderStrategy: S.optional(CapacityProviderStrategy),
    EnableECSManagedTags: S.optional(S.Boolean),
    EnableExecuteCommand: S.optional(S.Boolean),
    PlacementConstraints: S.optional(PlacementConstraints),
    PlacementStrategy: S.optional(PlacementStrategies),
    PropagateTags: S.optional(S.String),
    ReferenceId: S.optional(SensitiveString),
    Overrides: S.optional(EcsTaskOverride),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "PipeTargetEcsTaskParameters",
}) as any as S.Schema<PipeTargetEcsTaskParameters>;
export type BatchArraySize = number;
export interface BatchArrayProperties {
  Size?: number;
}
export const BatchArrayProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Size: S.optional(S.Number) }),
).annotate({
  identifier: "BatchArrayProperties",
}) as any as S.Schema<BatchArrayProperties>;
export type BatchRetryAttempts = number;
export interface BatchRetryStrategy {
  Attempts?: number;
}
export const BatchRetryStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attempts: S.optional(S.Number) }),
).annotate({
  identifier: "BatchRetryStrategy",
}) as any as S.Schema<BatchRetryStrategy>;
export interface BatchEnvironmentVariable {
  Name?: string;
  Value?: string;
}
export const BatchEnvironmentVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "BatchEnvironmentVariable",
}) as any as S.Schema<BatchEnvironmentVariable>;
export type BatchEnvironmentVariableList = BatchEnvironmentVariable[];
export const BatchEnvironmentVariableList = /*@__PURE__*/ S.Array(
  BatchEnvironmentVariable,
);
export type BatchResourceRequirementType = string;
export interface BatchResourceRequirement {
  Type: string;
  Value: string;
}
export const BatchResourceRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Value: S.String }),
).annotate({
  identifier: "BatchResourceRequirement",
}) as any as S.Schema<BatchResourceRequirement>;
export type BatchResourceRequirementsList = BatchResourceRequirement[];
export const BatchResourceRequirementsList = /*@__PURE__*/ S.Array(
  BatchResourceRequirement,
);
export interface BatchContainerOverrides {
  Command?: string[];
  Environment?: BatchEnvironmentVariable[];
  InstanceType?: string;
  ResourceRequirements?: BatchResourceRequirement[];
}
export const BatchContainerOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Command: S.optional(StringList),
    Environment: S.optional(BatchEnvironmentVariableList),
    InstanceType: S.optional(S.String),
    ResourceRequirements: S.optional(BatchResourceRequirementsList),
  }),
).annotate({
  identifier: "BatchContainerOverrides",
}) as any as S.Schema<BatchContainerOverrides>;
export type BatchJobDependencyType = string;
export interface BatchJobDependency {
  JobId?: string;
  Type?: string;
}
export const BatchJobDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({
  identifier: "BatchJobDependency",
}) as any as S.Schema<BatchJobDependency>;
export type BatchDependsOn = BatchJobDependency[];
export const BatchDependsOn = /*@__PURE__*/ S.Array(BatchJobDependency);
export type BatchParametersMap = { [key: string]: string | undefined };
export const BatchParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PipeTargetBatchJobParameters {
  JobDefinition: string;
  JobName: string;
  ArrayProperties?: BatchArrayProperties;
  RetryStrategy?: BatchRetryStrategy;
  ContainerOverrides?: BatchContainerOverrides;
  DependsOn?: BatchJobDependency[];
  Parameters?: { [key: string]: string | undefined };
}
export const PipeTargetBatchJobParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobDefinition: S.String,
    JobName: S.String,
    ArrayProperties: S.optional(BatchArrayProperties),
    RetryStrategy: S.optional(BatchRetryStrategy),
    ContainerOverrides: S.optional(BatchContainerOverrides),
    DependsOn: S.optional(BatchDependsOn),
    Parameters: S.optional(BatchParametersMap),
  }),
).annotate({
  identifier: "PipeTargetBatchJobParameters",
}) as any as S.Schema<PipeTargetBatchJobParameters>;
export type MessageGroupId = string | redacted.Redacted<string>;
export type MessageDeduplicationId = string | redacted.Redacted<string>;
export interface PipeTargetSqsQueueParameters {
  MessageGroupId?: string | redacted.Redacted<string>;
  MessageDeduplicationId?: string | redacted.Redacted<string>;
}
export const PipeTargetSqsQueueParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageGroupId: S.optional(SensitiveString),
    MessageDeduplicationId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "PipeTargetSqsQueueParameters",
}) as any as S.Schema<PipeTargetSqsQueueParameters>;
export interface PipeTargetHttpParameters {
  PathParameterValues?: (string | redacted.Redacted<string>)[];
  HeaderParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  QueryStringParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const PipeTargetHttpParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PathParameterValues: S.optional(PathParameterList),
    HeaderParameters: S.optional(HeaderParametersMap),
    QueryStringParameters: S.optional(QueryStringParametersMap),
  }),
).annotate({
  identifier: "PipeTargetHttpParameters",
}) as any as S.Schema<PipeTargetHttpParameters>;
export type SecretManagerArnOrJsonPath = string;
export type Database = string | redacted.Redacted<string>;
export type DbUser = string | redacted.Redacted<string>;
export type StatementName = string | redacted.Redacted<string>;
export type Sql = string | redacted.Redacted<string>;
export type Sqls = (string | redacted.Redacted<string>)[];
export const Sqls = /*@__PURE__*/ S.Array(SensitiveString);
export interface PipeTargetRedshiftDataParameters {
  SecretManagerArn?: string;
  Database: string | redacted.Redacted<string>;
  DbUser?: string | redacted.Redacted<string>;
  StatementName?: string | redacted.Redacted<string>;
  WithEvent?: boolean;
  Sqls: (string | redacted.Redacted<string>)[];
}
export const PipeTargetRedshiftDataParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretManagerArn: S.optional(S.String),
    Database: SensitiveString,
    DbUser: S.optional(SensitiveString),
    StatementName: S.optional(SensitiveString),
    WithEvent: S.optional(S.Boolean),
    Sqls: Sqls,
  }),
).annotate({
  identifier: "PipeTargetRedshiftDataParameters",
}) as any as S.Schema<PipeTargetRedshiftDataParameters>;
export type SageMakerPipelineParameterName = string | redacted.Redacted<string>;
export type SageMakerPipelineParameterValue =
  | string
  | redacted.Redacted<string>;
export interface SageMakerPipelineParameter {
  Name: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export const SageMakerPipelineParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: SensitiveString, Value: SensitiveString }),
).annotate({
  identifier: "SageMakerPipelineParameter",
}) as any as S.Schema<SageMakerPipelineParameter>;
export type SageMakerPipelineParameterList = SageMakerPipelineParameter[];
export const SageMakerPipelineParameterList = /*@__PURE__*/ S.Array(
  SageMakerPipelineParameter,
);
export interface PipeTargetSageMakerPipelineParameters {
  PipelineParameterList?: SageMakerPipelineParameter[];
}
export const PipeTargetSageMakerPipelineParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PipelineParameterList: S.optional(SageMakerPipelineParameterList),
    }),
).annotate({
  identifier: "PipeTargetSageMakerPipelineParameters",
}) as any as S.Schema<PipeTargetSageMakerPipelineParameters>;
export type EventBridgeEndpointId = string | redacted.Redacted<string>;
export type EventBridgeDetailType = string | redacted.Redacted<string>;
export type EventBridgeEventSource = string | redacted.Redacted<string>;
export type EventBridgeEventResourceList = string[];
export const EventBridgeEventResourceList = /*@__PURE__*/ S.Array(S.String);
export type JsonPath = string;
export interface PipeTargetEventBridgeEventBusParameters {
  EndpointId?: string | redacted.Redacted<string>;
  DetailType?: string | redacted.Redacted<string>;
  Source?: string | redacted.Redacted<string>;
  Resources?: string[];
  Time?: string;
}
export const PipeTargetEventBridgeEventBusParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EndpointId: S.optional(SensitiveString),
      DetailType: S.optional(SensitiveString),
      Source: S.optional(SensitiveString),
      Resources: S.optional(EventBridgeEventResourceList),
      Time: S.optional(S.String),
    }),
).annotate({
  identifier: "PipeTargetEventBridgeEventBusParameters",
}) as any as S.Schema<PipeTargetEventBridgeEventBusParameters>;
export type LogStreamName = string;
export interface PipeTargetCloudWatchLogsParameters {
  LogStreamName?: string;
  Timestamp?: string;
}
export const PipeTargetCloudWatchLogsParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogStreamName: S.optional(S.String),
    Timestamp: S.optional(S.String),
  }),
).annotate({
  identifier: "PipeTargetCloudWatchLogsParameters",
}) as any as S.Schema<PipeTargetCloudWatchLogsParameters>;
export type TimeValue = string;
export type EpochTimeUnit = string;
export type TimeFieldType = string;
export type TimestampFormat = string;
export type VersionValue = string;
export type DimensionValue = string;
export type DimensionValueType = string;
export type DimensionName = string;
export interface DimensionMapping {
  DimensionValue: string;
  DimensionValueType: string;
  DimensionName: string;
}
export const DimensionMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionValue: S.String,
    DimensionValueType: S.String,
    DimensionName: S.String,
  }),
).annotate({
  identifier: "DimensionMapping",
}) as any as S.Schema<DimensionMapping>;
export type DimensionMappings = DimensionMapping[];
export const DimensionMappings = /*@__PURE__*/ S.Array(DimensionMapping);
export type MeasureValue = string;
export type MeasureValueType = string;
export type MeasureName = string;
export interface SingleMeasureMapping {
  MeasureValue: string;
  MeasureValueType: string;
  MeasureName: string;
}
export const SingleMeasureMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MeasureValue: S.String,
    MeasureValueType: S.String,
    MeasureName: S.String,
  }),
).annotate({
  identifier: "SingleMeasureMapping",
}) as any as S.Schema<SingleMeasureMapping>;
export type SingleMeasureMappings = SingleMeasureMapping[];
export const SingleMeasureMappings =
  /*@__PURE__*/ S.Array(SingleMeasureMapping);
export type MultiMeasureName = string;
export type MultiMeasureAttributeName = string;
export interface MultiMeasureAttributeMapping {
  MeasureValue: string;
  MeasureValueType: string;
  MultiMeasureAttributeName: string;
}
export const MultiMeasureAttributeMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MeasureValue: S.String,
    MeasureValueType: S.String,
    MultiMeasureAttributeName: S.String,
  }),
).annotate({
  identifier: "MultiMeasureAttributeMapping",
}) as any as S.Schema<MultiMeasureAttributeMapping>;
export type MultiMeasureAttributeMappings = MultiMeasureAttributeMapping[];
export const MultiMeasureAttributeMappings = /*@__PURE__*/ S.Array(
  MultiMeasureAttributeMapping,
);
export interface MultiMeasureMapping {
  MultiMeasureName: string;
  MultiMeasureAttributeMappings: MultiMeasureAttributeMapping[];
}
export const MultiMeasureMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiMeasureName: S.String,
    MultiMeasureAttributeMappings: MultiMeasureAttributeMappings,
  }),
).annotate({
  identifier: "MultiMeasureMapping",
}) as any as S.Schema<MultiMeasureMapping>;
export type MultiMeasureMappings = MultiMeasureMapping[];
export const MultiMeasureMappings = /*@__PURE__*/ S.Array(MultiMeasureMapping);
export interface PipeTargetTimestreamParameters {
  TimeValue: string;
  EpochTimeUnit?: string;
  TimeFieldType?: string;
  TimestampFormat?: string;
  VersionValue: string;
  DimensionMappings: DimensionMapping[];
  SingleMeasureMappings?: SingleMeasureMapping[];
  MultiMeasureMappings?: MultiMeasureMapping[];
}
export const PipeTargetTimestreamParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeValue: S.String,
    EpochTimeUnit: S.optional(S.String),
    TimeFieldType: S.optional(S.String),
    TimestampFormat: S.optional(S.String),
    VersionValue: S.String,
    DimensionMappings: DimensionMappings,
    SingleMeasureMappings: S.optional(SingleMeasureMappings),
    MultiMeasureMappings: S.optional(MultiMeasureMappings),
  }),
).annotate({
  identifier: "PipeTargetTimestreamParameters",
}) as any as S.Schema<PipeTargetTimestreamParameters>;
export interface PipeTargetParameters {
  InputTemplate?: string | redacted.Redacted<string>;
  LambdaFunctionParameters?: PipeTargetLambdaFunctionParameters;
  StepFunctionStateMachineParameters?: PipeTargetStateMachineParameters;
  KinesisStreamParameters?: PipeTargetKinesisStreamParameters;
  EcsTaskParameters?: PipeTargetEcsTaskParameters;
  BatchJobParameters?: PipeTargetBatchJobParameters;
  SqsQueueParameters?: PipeTargetSqsQueueParameters;
  HttpParameters?: PipeTargetHttpParameters;
  RedshiftDataParameters?: PipeTargetRedshiftDataParameters;
  SageMakerPipelineParameters?: PipeTargetSageMakerPipelineParameters;
  EventBridgeEventBusParameters?: PipeTargetEventBridgeEventBusParameters;
  CloudWatchLogsParameters?: PipeTargetCloudWatchLogsParameters;
  TimestreamParameters?: PipeTargetTimestreamParameters;
}
export const PipeTargetParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputTemplate: S.optional(SensitiveString),
    LambdaFunctionParameters: S.optional(PipeTargetLambdaFunctionParameters),
    StepFunctionStateMachineParameters: S.optional(
      PipeTargetStateMachineParameters,
    ),
    KinesisStreamParameters: S.optional(PipeTargetKinesisStreamParameters),
    EcsTaskParameters: S.optional(PipeTargetEcsTaskParameters),
    BatchJobParameters: S.optional(PipeTargetBatchJobParameters),
    SqsQueueParameters: S.optional(PipeTargetSqsQueueParameters),
    HttpParameters: S.optional(PipeTargetHttpParameters),
    RedshiftDataParameters: S.optional(PipeTargetRedshiftDataParameters),
    SageMakerPipelineParameters: S.optional(
      PipeTargetSageMakerPipelineParameters,
    ),
    EventBridgeEventBusParameters: S.optional(
      PipeTargetEventBridgeEventBusParameters,
    ),
    CloudWatchLogsParameters: S.optional(PipeTargetCloudWatchLogsParameters),
    TimestreamParameters: S.optional(PipeTargetTimestreamParameters),
  }),
).annotate({
  identifier: "PipeTargetParameters",
}) as any as S.Schema<PipeTargetParameters>;
export type RoleArn = string;
export type TagMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type S3OutputFormat = string;
export interface S3LogDestinationParameters {
  BucketName: string;
  BucketOwner: string;
  OutputFormat?: string;
  Prefix?: string;
}
export const S3LogDestinationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.String,
    BucketOwner: S.String,
    OutputFormat: S.optional(S.String),
    Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3LogDestinationParameters",
}) as any as S.Schema<S3LogDestinationParameters>;
export type FirehoseArn = string;
export interface FirehoseLogDestinationParameters {
  DeliveryStreamArn: string;
}
export const FirehoseLogDestinationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryStreamArn: S.String }),
).annotate({
  identifier: "FirehoseLogDestinationParameters",
}) as any as S.Schema<FirehoseLogDestinationParameters>;
export type CloudwatchLogGroupArn = string;
export interface CloudwatchLogsLogDestinationParameters {
  LogGroupArn: string;
}
export const CloudwatchLogsLogDestinationParameters = /*@__PURE__*/ S.suspend(
  () => S.Struct({ LogGroupArn: S.String }),
).annotate({
  identifier: "CloudwatchLogsLogDestinationParameters",
}) as any as S.Schema<CloudwatchLogsLogDestinationParameters>;
export type LogLevel = string;
export type IncludeExecutionDataOption = string;
export type IncludeExecutionData = string[];
export const IncludeExecutionData = /*@__PURE__*/ S.Array(S.String);
export interface PipeLogConfigurationParameters {
  S3LogDestination?: S3LogDestinationParameters;
  FirehoseLogDestination?: FirehoseLogDestinationParameters;
  CloudwatchLogsLogDestination?: CloudwatchLogsLogDestinationParameters;
  Level: string;
  IncludeExecutionData?: string[];
}
export const PipeLogConfigurationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3LogDestination: S.optional(S3LogDestinationParameters),
    FirehoseLogDestination: S.optional(FirehoseLogDestinationParameters),
    CloudwatchLogsLogDestination: S.optional(
      CloudwatchLogsLogDestinationParameters,
    ),
    Level: S.String,
    IncludeExecutionData: S.optional(IncludeExecutionData),
  }),
).annotate({
  identifier: "PipeLogConfigurationParameters",
}) as any as S.Schema<PipeLogConfigurationParameters>;
export type KmsKeyIdentifier = string;
export interface CreatePipeRequest {
  Name: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  Source: string;
  SourceParameters?: PipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
  LogConfiguration?: PipeLogConfigurationParameters;
  KmsKeyIdentifier?: string;
}
export const CreatePipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Description: S.optional(SensitiveString),
    DesiredState: S.optional(S.String),
    Source: S.String,
    SourceParameters: S.optional(PipeSourceParameters),
    Enrichment: S.optional(S.String),
    EnrichmentParameters: S.optional(PipeEnrichmentParameters),
    Target: S.String,
    TargetParameters: S.optional(PipeTargetParameters),
    RoleArn: S.String,
    Tags: S.optional(TagMap),
    LogConfiguration: S.optional(PipeLogConfigurationParameters),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/pipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePipeRequest",
}) as any as S.Schema<CreatePipeRequest>;
export type PipeArn = string;
export type PipeState = string;
export interface CreatePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const CreatePipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "CreatePipeResponse",
}) as any as S.Schema<CreatePipeResponse>;
export interface DeletePipeRequest {
  Name: string;
}
export const DeletePipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/pipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePipeRequest",
}) as any as S.Schema<DeletePipeRequest>;
export type RequestedPipeStateDescribeResponse = string;
export interface DeletePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const DeletePipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "DeletePipeResponse",
}) as any as S.Schema<DeletePipeResponse>;
export interface DescribePipeRequest {
  Name: string;
}
export const DescribePipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/pipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePipeRequest",
}) as any as S.Schema<DescribePipeRequest>;
export type PipeStateReason = string;
export interface S3LogDestination {
  BucketName?: string;
  Prefix?: string;
  BucketOwner?: string;
  OutputFormat?: string;
}
export const S3LogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    Prefix: S.optional(S.String),
    BucketOwner: S.optional(S.String),
    OutputFormat: S.optional(S.String),
  }),
).annotate({
  identifier: "S3LogDestination",
}) as any as S.Schema<S3LogDestination>;
export interface FirehoseLogDestination {
  DeliveryStreamArn?: string;
}
export const FirehoseLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryStreamArn: S.optional(S.String) }),
).annotate({
  identifier: "FirehoseLogDestination",
}) as any as S.Schema<FirehoseLogDestination>;
export interface CloudwatchLogsLogDestination {
  LogGroupArn?: string;
}
export const CloudwatchLogsLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupArn: S.optional(S.String) }),
).annotate({
  identifier: "CloudwatchLogsLogDestination",
}) as any as S.Schema<CloudwatchLogsLogDestination>;
export interface PipeLogConfiguration {
  S3LogDestination?: S3LogDestination;
  FirehoseLogDestination?: FirehoseLogDestination;
  CloudwatchLogsLogDestination?: CloudwatchLogsLogDestination;
  Level?: string;
  IncludeExecutionData?: string[];
}
export const PipeLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3LogDestination: S.optional(S3LogDestination),
    FirehoseLogDestination: S.optional(FirehoseLogDestination),
    CloudwatchLogsLogDestination: S.optional(CloudwatchLogsLogDestination),
    Level: S.optional(S.String),
    IncludeExecutionData: S.optional(IncludeExecutionData),
  }),
).annotate({
  identifier: "PipeLogConfiguration",
}) as any as S.Schema<PipeLogConfiguration>;
export interface DescribePipeResponse {
  Arn?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  CurrentState?: string;
  StateReason?: string;
  Source?: string;
  SourceParameters?: PipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target?: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn?: string;
  Tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LogConfiguration?: PipeLogConfiguration;
  KmsKeyIdentifier?: string;
}
export const DescribePipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    StateReason: S.optional(S.String),
    Source: S.optional(S.String),
    SourceParameters: S.optional(PipeSourceParameters),
    Enrichment: S.optional(S.String),
    EnrichmentParameters: S.optional(PipeEnrichmentParameters),
    Target: S.optional(S.String),
    TargetParameters: S.optional(PipeTargetParameters),
    RoleArn: S.optional(S.String),
    Tags: S.optional(TagMap),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LogConfiguration: S.optional(PipeLogConfiguration),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePipeResponse",
}) as any as S.Schema<DescribePipeResponse>;
export type ResourceArn = string;
export type NextToken = string | redacted.Redacted<string>;
export type LimitMax100 = number;
export interface ListPipesRequest {
  NamePrefix?: string;
  DesiredState?: string;
  CurrentState?: string;
  SourcePrefix?: string;
  TargetPrefix?: string;
  NextToken?: string | redacted.Redacted<string>;
  Limit?: number;
}
export const ListPipesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamePrefix: S.optional(S.String).pipe(T.HttpQuery("NamePrefix")),
    DesiredState: S.optional(S.String).pipe(T.HttpQuery("DesiredState")),
    CurrentState: S.optional(S.String).pipe(T.HttpQuery("CurrentState")),
    SourcePrefix: S.optional(S.String).pipe(T.HttpQuery("SourcePrefix")),
    TargetPrefix: S.optional(S.String).pipe(T.HttpQuery("TargetPrefix")),
    NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("NextToken")),
    Limit: S.optional(S.Number).pipe(T.HttpQuery("Limit")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/pipes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipesRequest",
}) as any as S.Schema<ListPipesRequest>;
export interface Pipe {
  Name?: string;
  Arn?: string;
  DesiredState?: string;
  CurrentState?: string;
  StateReason?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  Source?: string;
  Target?: string;
  Enrichment?: string;
}
export const Pipe = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    StateReason: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Source: S.optional(S.String),
    Target: S.optional(S.String),
    Enrichment: S.optional(S.String),
  }),
).annotate({ identifier: "Pipe" }) as any as S.Schema<Pipe>;
export type PipeList = Pipe[];
export const PipeList = /*@__PURE__*/ S.Array(Pipe);
export interface ListPipesResponse {
  Pipes?: Pipe[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListPipesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Pipes: S.optional(PipeList),
    NextToken: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "ListPipesResponse",
}) as any as S.Schema<ListPipesResponse>;
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
  tags?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartPipeRequest {
  Name: string;
}
export const StartPipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/pipes/{Name}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPipeRequest",
}) as any as S.Schema<StartPipeRequest>;
export interface StartPipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const StartPipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "StartPipeResponse",
}) as any as S.Schema<StartPipeResponse>;
export interface StopPipeRequest {
  Name: string;
}
export const StopPipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/pipes/{Name}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopPipeRequest",
}) as any as S.Schema<StopPipeRequest>;
export interface StopPipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const StopPipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "StopPipeResponse",
}) as any as S.Schema<StopPipeResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export interface UpdatePipeSourceKinesisStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
}
export const UpdatePipeSourceKinesisStreamParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BatchSize: S.optional(S.Number),
      DeadLetterConfig: S.optional(DeadLetterConfig),
      OnPartialBatchItemFailure: S.optional(S.String),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
      MaximumRecordAgeInSeconds: S.optional(S.Number),
      MaximumRetryAttempts: S.optional(S.Number),
      ParallelizationFactor: S.optional(S.Number),
    }),
).annotate({
  identifier: "UpdatePipeSourceKinesisStreamParameters",
}) as any as S.Schema<UpdatePipeSourceKinesisStreamParameters>;
export interface UpdatePipeSourceDynamoDBStreamParameters {
  BatchSize?: number;
  DeadLetterConfig?: DeadLetterConfig;
  OnPartialBatchItemFailure?: string;
  MaximumBatchingWindowInSeconds?: number;
  MaximumRecordAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
  ParallelizationFactor?: number;
}
export const UpdatePipeSourceDynamoDBStreamParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BatchSize: S.optional(S.Number),
      DeadLetterConfig: S.optional(DeadLetterConfig),
      OnPartialBatchItemFailure: S.optional(S.String),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
      MaximumRecordAgeInSeconds: S.optional(S.Number),
      MaximumRetryAttempts: S.optional(S.Number),
      ParallelizationFactor: S.optional(S.Number),
    }),
).annotate({
  identifier: "UpdatePipeSourceDynamoDBStreamParameters",
}) as any as S.Schema<UpdatePipeSourceDynamoDBStreamParameters>;
export interface UpdatePipeSourceSqsQueueParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const UpdatePipeSourceSqsQueueParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchSize: S.optional(S.Number),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdatePipeSourceSqsQueueParameters",
}) as any as S.Schema<UpdatePipeSourceSqsQueueParameters>;
export interface UpdatePipeSourceActiveMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const UpdatePipeSourceActiveMQBrokerParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Credentials: MQBrokerAccessCredentials,
      BatchSize: S.optional(S.Number),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
    }),
).annotate({
  identifier: "UpdatePipeSourceActiveMQBrokerParameters",
}) as any as S.Schema<UpdatePipeSourceActiveMQBrokerParameters>;
export interface UpdatePipeSourceRabbitMQBrokerParameters {
  Credentials: MQBrokerAccessCredentials;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
}
export const UpdatePipeSourceRabbitMQBrokerParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Credentials: MQBrokerAccessCredentials,
      BatchSize: S.optional(S.Number),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
    }),
).annotate({
  identifier: "UpdatePipeSourceRabbitMQBrokerParameters",
}) as any as S.Schema<UpdatePipeSourceRabbitMQBrokerParameters>;
export interface UpdatePipeSourceManagedStreamingKafkaParameters {
  BatchSize?: number;
  Credentials?: MSKAccessCredentials;
  MaximumBatchingWindowInSeconds?: number;
}
export const UpdatePipeSourceManagedStreamingKafkaParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BatchSize: S.optional(S.Number),
      Credentials: S.optional(MSKAccessCredentials),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "UpdatePipeSourceManagedStreamingKafkaParameters",
  }) as any as S.Schema<UpdatePipeSourceManagedStreamingKafkaParameters>;
export interface UpdatePipeSourceSelfManagedKafkaParameters {
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  Credentials?: SelfManagedKafkaAccessConfigurationCredentials;
  ServerRootCaCertificate?: string;
  Vpc?: SelfManagedKafkaAccessConfigurationVpc;
}
export const UpdatePipeSourceSelfManagedKafkaParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BatchSize: S.optional(S.Number),
      MaximumBatchingWindowInSeconds: S.optional(S.Number),
      Credentials: S.optional(SelfManagedKafkaAccessConfigurationCredentials),
      ServerRootCaCertificate: S.optional(S.String),
      Vpc: S.optional(SelfManagedKafkaAccessConfigurationVpc),
    }),
  ).annotate({
    identifier: "UpdatePipeSourceSelfManagedKafkaParameters",
  }) as any as S.Schema<UpdatePipeSourceSelfManagedKafkaParameters>;
export interface UpdatePipeSourceParameters {
  FilterCriteria?: FilterCriteria;
  KinesisStreamParameters?: UpdatePipeSourceKinesisStreamParameters;
  DynamoDBStreamParameters?: UpdatePipeSourceDynamoDBStreamParameters;
  SqsQueueParameters?: UpdatePipeSourceSqsQueueParameters;
  ActiveMQBrokerParameters?: UpdatePipeSourceActiveMQBrokerParameters;
  RabbitMQBrokerParameters?: UpdatePipeSourceRabbitMQBrokerParameters;
  ManagedStreamingKafkaParameters?: UpdatePipeSourceManagedStreamingKafkaParameters;
  SelfManagedKafkaParameters?: UpdatePipeSourceSelfManagedKafkaParameters;
}
export const UpdatePipeSourceParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterCriteria: S.optional(FilterCriteria),
    KinesisStreamParameters: S.optional(
      UpdatePipeSourceKinesisStreamParameters,
    ),
    DynamoDBStreamParameters: S.optional(
      UpdatePipeSourceDynamoDBStreamParameters,
    ),
    SqsQueueParameters: S.optional(UpdatePipeSourceSqsQueueParameters),
    ActiveMQBrokerParameters: S.optional(
      UpdatePipeSourceActiveMQBrokerParameters,
    ),
    RabbitMQBrokerParameters: S.optional(
      UpdatePipeSourceRabbitMQBrokerParameters,
    ),
    ManagedStreamingKafkaParameters: S.optional(
      UpdatePipeSourceManagedStreamingKafkaParameters,
    ),
    SelfManagedKafkaParameters: S.optional(
      UpdatePipeSourceSelfManagedKafkaParameters,
    ),
  }),
).annotate({
  identifier: "UpdatePipeSourceParameters",
}) as any as S.Schema<UpdatePipeSourceParameters>;
export interface UpdatePipeRequest {
  Name: string;
  Description?: string | redacted.Redacted<string>;
  DesiredState?: string;
  SourceParameters?: UpdatePipeSourceParameters;
  Enrichment?: string;
  EnrichmentParameters?: PipeEnrichmentParameters;
  Target?: string;
  TargetParameters?: PipeTargetParameters;
  RoleArn: string;
  LogConfiguration?: PipeLogConfigurationParameters;
  KmsKeyIdentifier?: string;
}
export const UpdatePipeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Description: S.optional(SensitiveString),
    DesiredState: S.optional(S.String),
    SourceParameters: S.optional(UpdatePipeSourceParameters),
    Enrichment: S.optional(S.String),
    EnrichmentParameters: S.optional(PipeEnrichmentParameters),
    Target: S.optional(S.String),
    TargetParameters: S.optional(PipeTargetParameters),
    RoleArn: S.String,
    LogConfiguration: S.optional(PipeLogConfigurationParameters),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v1/pipes/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePipeRequest",
}) as any as S.Schema<UpdatePipeRequest>;
export interface UpdatePipeResponse {
  Arn?: string;
  Name?: string;
  DesiredState?: string;
  CurrentState?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export const UpdatePipeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DesiredState: S.optional(S.String),
    CurrentState: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "UpdatePipeResponse",
}) as any as S.Schema<UpdatePipeResponse>;
export type ErrorMessage = string;
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
export type CreatePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a pipe. Amazon EventBridge Pipes connect event sources to targets and reduces
 * the need for specialized knowledge and integration code.
 */
export const createPipe: API.OperationMethod<
  CreatePipeRequest,
  CreatePipeResponse,
  CreatePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePipeRequest,
  output: CreatePipeResponse,
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipe",
}));

export type DeletePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing pipe. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const deletePipe: API.OperationMethod<
  DeletePipeRequest,
  DeletePipeResponse,
  DeletePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePipeRequest,
  output: DeletePipeResponse,
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipe",
}));

export type DescribePipeError =
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the information about an existing pipe. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const describePipe: API.OperationMethod<
  DescribePipeRequest,
  DescribePipeResponse,
  DescribePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePipeRequest,
  output: DescribePipeResponse,
  errors: [
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePipe",
}));

export type ListPipesError =
  | InternalException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the pipes associated with this account. For more information about pipes, see Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const listPipes: API.PaginatedOperationMethod<
  ListPipesRequest,
  ListPipesResponse,
  ListPipesError,
  Credentials | HttpClient.HttpClient,
  Pipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipesRequest,
  output: ListPipesResponse,
  errors: [InternalException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pipes",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with a pipe.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartPipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start an existing pipe.
 */
export const startPipe: API.OperationMethod<
  StartPipeRequest,
  StartPipeResponse,
  StartPipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPipeRequest,
  output: StartPipeResponse,
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipe",
}));

export type StopPipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop an existing pipe.
 */
export const stopPipe: API.OperationMethod<
  StopPipeRequest,
  StopPipeResponse,
  StopPipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopPipeRequest,
  output: StopPipeResponse,
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipe",
}));

export type TagResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified pipe. Tags can help you
 * organize and categorize your resources. You can also use them to scope user permissions by
 * granting a user permission to access or change only resources with certain tag
 * values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly
 * as strings of characters.
 *
 * You can use the `TagResource` action with a pipe that already has tags. If
 * you specify a new tag key, this tag is appended to the list of tags associated with the
 * pipe. If you specify a tag key that is already associated with the pipe, the new tag value
 * that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a pipe.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified pipes.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePipeError =
  | ConflictException
  | InternalException
  | NotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing pipe. When you call `UpdatePipe`, EventBridge only the
 * updates fields you have specified in the request; the rest remain unchanged. The exception
 * to this is if you modify any Amazon Web Services-service specific fields in the
 * `SourceParameters`, `EnrichmentParameters`, or
 * `TargetParameters` objects. For example,
 * `DynamoDBStreamParameters` or `EventBridgeEventBusParameters`.
 * EventBridge updates the fields in these objects atomically as one and overrides existing
 * values. This is by design, and means that if you don't specify an optional field in one of
 * these `Parameters` objects, EventBridge sets that field to its system-default
 * value during the update.
 *
 * For more information about pipes, see
 * Amazon EventBridge Pipes in the Amazon EventBridge User Guide.
 */
export const updatePipe: API.OperationMethod<
  UpdatePipeRequest,
  UpdatePipeResponse,
  UpdatePipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePipeRequest,
  output: UpdatePipeResponse,
  errors: [
    ConflictException,
    InternalException,
    NotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipe",
}));
