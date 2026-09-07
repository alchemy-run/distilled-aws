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
  sdkId: "ObservabilityAdmin",
  serviceShapeName: "ObservabilityAdmin",
});
const auth = T.AwsAuthSigv4({ name: "observabilityadmin" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://observabilityadmin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://observabilityadmin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      amznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      amznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      ServiceCode: S.optional(S.String),
      QuotaCode: S.optional(S.String),
      amznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Errors: S.optional(
        S.suspend(() => ValidationErrors).annotate({
          identifier: "ValidationErrors",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RuleName = string;
export type Region = string;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(S.String);
export type SourceFilterString = string;
export type LogsFilterString = string;
export type DataSourceFilterString = string;
export type EncryptedLogGroupStrategy = "ALLOW" | "SKIP" | (string & {});
export const EncryptedLogGroupStrategy = /*@__PURE__*/ S.String;

export interface SourceLogsConfiguration {
  LogGroupSelectionCriteria?: string;
  DataSourceSelectionCriteria?: string;
  EncryptedLogGroupStrategy: EncryptedLogGroupStrategy;
}
export const SourceLogsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogGroupSelectionCriteria: S.optional(S.String),
    DataSourceSelectionCriteria: S.optional(S.String),
    EncryptedLogGroupStrategy: EncryptedLogGroupStrategy,
  }),
).annotate({
  identifier: "SourceLogsConfiguration",
}) as any as S.Schema<SourceLogsConfiguration>;
export type MetricsFilterString = string;
export interface SourceMetricsConfiguration {
  MetricsSelectionCriteria?: string;
}
export const SourceMetricsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricsSelectionCriteria: S.optional(S.String) }),
).annotate({
  identifier: "SourceMetricsConfiguration",
}) as any as S.Schema<SourceMetricsConfiguration>;
export interface CentralizationRuleSource {
  Regions: string[];
  Scope?: string;
  SourceLogsConfiguration?: SourceLogsConfiguration;
  SourceMetricsConfiguration?: SourceMetricsConfiguration;
}
export const CentralizationRuleSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Regions: Regions,
    Scope: S.optional(S.String),
    SourceLogsConfiguration: S.optional(SourceLogsConfiguration),
    SourceMetricsConfiguration: S.optional(SourceMetricsConfiguration),
  }),
).annotate({
  identifier: "CentralizationRuleSource",
}) as any as S.Schema<CentralizationRuleSource>;
export type AccountIdentifier = string;
export type EncryptionStrategy =
  | "CUSTOMER_MANAGED"
  | "AWS_OWNED"
  | (string & {});
export const EncryptionStrategy = /*@__PURE__*/ S.String;

export type ResourceArn = string;
export type EncryptionConflictResolutionStrategy =
  | "ALLOW"
  | "SKIP"
  | (string & {});
export const EncryptionConflictResolutionStrategy = /*@__PURE__*/ S.String;

export interface LogsEncryptionConfiguration {
  EncryptionStrategy: EncryptionStrategy;
  KmsKeyArn?: string;
  EncryptionConflictResolutionStrategy?: EncryptionConflictResolutionStrategy;
}
export const LogsEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionStrategy: EncryptionStrategy,
    KmsKeyArn: S.optional(S.String),
    EncryptionConflictResolutionStrategy: S.optional(
      EncryptionConflictResolutionStrategy,
    ),
  }),
).annotate({
  identifier: "LogsEncryptionConfiguration",
}) as any as S.Schema<LogsEncryptionConfiguration>;
export interface LogsBackupConfiguration {
  Region: string;
  KmsKeyArn?: string;
}
export const LogsBackupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.String, KmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "LogsBackupConfiguration",
}) as any as S.Schema<LogsBackupConfiguration>;
export type LogGroupNamePattern = string;
export interface LogGroupNameConfiguration {
  LogGroupNamePattern: string;
}
export const LogGroupNameConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupNamePattern: S.String }),
).annotate({
  identifier: "LogGroupNameConfiguration",
}) as any as S.Schema<LogGroupNameConfiguration>;
export interface DestinationLogsConfiguration {
  LogsEncryptionConfiguration?: LogsEncryptionConfiguration;
  BackupConfiguration?: LogsBackupConfiguration;
  LogGroupNameConfiguration?: LogGroupNameConfiguration;
}
export const DestinationLogsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogsEncryptionConfiguration: S.optional(LogsEncryptionConfiguration),
    BackupConfiguration: S.optional(LogsBackupConfiguration),
    LogGroupNameConfiguration: S.optional(LogGroupNameConfiguration),
  }),
).annotate({
  identifier: "DestinationLogsConfiguration",
}) as any as S.Schema<DestinationLogsConfiguration>;
export interface MetricsBackupConfiguration {
  Region: string;
}
export const MetricsBackupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.String }),
).annotate({
  identifier: "MetricsBackupConfiguration",
}) as any as S.Schema<MetricsBackupConfiguration>;
export interface DestinationMetricsConfiguration {
  BackupConfiguration?: MetricsBackupConfiguration;
}
export const DestinationMetricsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupConfiguration: S.optional(MetricsBackupConfiguration) }),
).annotate({
  identifier: "DestinationMetricsConfiguration",
}) as any as S.Schema<DestinationMetricsConfiguration>;
export interface CentralizationRuleDestination {
  Region: string;
  Account?: string;
  DestinationLogsConfiguration?: DestinationLogsConfiguration;
  DestinationMetricsConfiguration?: DestinationMetricsConfiguration;
}
export const CentralizationRuleDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.String,
    Account: S.optional(S.String),
    DestinationLogsConfiguration: S.optional(DestinationLogsConfiguration),
    DestinationMetricsConfiguration: S.optional(
      DestinationMetricsConfiguration,
    ),
  }),
).annotate({
  identifier: "CentralizationRuleDestination",
}) as any as S.Schema<CentralizationRuleDestination>;
export interface CentralizationRule {
  Source: CentralizationRuleSource;
  Destination: CentralizationRuleDestination;
}
export const CentralizationRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: CentralizationRuleSource,
    Destination: CentralizationRuleDestination,
  }),
).annotate({
  identifier: "CentralizationRule",
}) as any as S.Schema<CentralizationRule>;
export type TagKey = string;
export type TagValue = string;
export type TagMapInput = { [key: string]: string | undefined };
export const TagMapInput = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateCentralizationRuleForOrganizationInput {
  RuleName: string;
  Rule: CentralizationRule;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCentralizationRuleForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RuleName: S.String,
      Rule: CentralizationRule,
      Tags: S.optional(TagMapInput),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/CreateCentralizationRuleForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateCentralizationRuleForOrganizationInput",
  }) as any as S.Schema<CreateCentralizationRuleForOrganizationInput>;
export interface CreateCentralizationRuleForOrganizationOutput {
  RuleArn?: string;
}
export const CreateCentralizationRuleForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RuleArn: S.optional(S.String) }),
  ).annotate({
    identifier: "CreateCentralizationRuleForOrganizationOutput",
  }) as any as S.Schema<CreateCentralizationRuleForOrganizationOutput>;
export type SSEAlgorithm = "aws:kms" | "AES256" | (string & {});
export const SSEAlgorithm = /*@__PURE__*/ S.String;

export interface Encryption {
  SseAlgorithm: SSEAlgorithm;
  KmsKeyArn?: string;
}
export const Encryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SseAlgorithm: SSEAlgorithm, KmsKeyArn: S.optional(S.String) }),
).annotate({ identifier: "Encryption" }) as any as S.Schema<Encryption>;
export interface CreateS3TableIntegrationInput {
  Encryption: Encryption;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateS3TableIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Encryption: Encryption,
    RoleArn: S.String,
    Tags: S.optional(TagMapInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateS3TableIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateS3TableIntegrationInput",
}) as any as S.Schema<CreateS3TableIntegrationInput>;
export interface CreateS3TableIntegrationOutput {
  Arn?: string;
}
export const CreateS3TableIntegrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateS3TableIntegrationOutput",
}) as any as S.Schema<CreateS3TableIntegrationOutput>;
export type TelemetryPipelineName = string;
export type TelemetryPipelineConfigurationBody = string;
export interface TelemetryPipelineConfiguration {
  Body: string;
}
export const TelemetryPipelineConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Body: S.String }),
).annotate({
  identifier: "TelemetryPipelineConfiguration",
}) as any as S.Schema<TelemetryPipelineConfiguration>;
export interface CreateTelemetryPipelineInput {
  Name: string;
  Configuration: TelemetryPipelineConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTelemetryPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: TelemetryPipelineConfiguration,
    Tags: S.optional(TagMapInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateTelemetryPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTelemetryPipelineInput",
}) as any as S.Schema<CreateTelemetryPipelineInput>;
export interface CreateTelemetryPipelineOutput {
  Arn?: string;
}
export const CreateTelemetryPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTelemetryPipelineOutput",
}) as any as S.Schema<CreateTelemetryPipelineOutput>;
export type ResourceType =
  | "AWS::EC2::Instance"
  | "AWS::EC2::VPC"
  | "AWS::Lambda::Function"
  | "AWS::CloudTrail"
  | "AWS::EKS::Cluster"
  | "AWS::WAFv2::WebACL"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer"
  | "AWS::Route53Resolver::ResolverEndpoint"
  | "AWS::BedrockAgentCore::Runtime"
  | "AWS::BedrockAgentCore::Browser"
  | "AWS::BedrockAgentCore::CodeInterpreter"
  | "AWS::BedrockAgentCore::Gateway"
  | "AWS::BedrockAgentCore::Memory"
  | "AWS::BedrockAgentCore::WorkloadIdentity"
  | "AWS::SecurityHub::Hub"
  | "AWS::CloudFront::Distribution"
  | "AWS::SecurityHub::HubV2"
  | "AWS::CloudWatch::OTelEnrichment"
  | "AWS::MSK::Cluster"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type TelemetryType = "Logs" | "Metrics" | "Traces" | (string & {});
export const TelemetryType = /*@__PURE__*/ S.String;

export type TelemetrySourceType =
  | "VPC_FLOW_LOGS"
  | "ROUTE53_RESOLVER_QUERY_LOGS"
  | "EKS_AUDIT_LOGS"
  | "EKS_AUTHENTICATOR_LOGS"
  | "EKS_CONTROLLER_MANAGER_LOGS"
  | "EKS_SCHEDULER_LOGS"
  | "EKS_API_LOGS"
  | (string & {});
export const TelemetrySourceType = /*@__PURE__*/ S.String;

export type TelemetrySourceTypes = TelemetrySourceType[];
export const TelemetrySourceTypes = /*@__PURE__*/ S.Array(TelemetrySourceType);
export type DestinationType = "cloud-watch-logs" | (string & {});
export const DestinationType = /*@__PURE__*/ S.String;

export type RetentionPeriodInDays = number;
export interface VPCFlowLogParameters {
  LogFormat?: string;
  TrafficType?: string;
  MaxAggregationInterval?: number;
}
export const VPCFlowLogParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogFormat: S.optional(S.String),
    TrafficType: S.optional(S.String),
    MaxAggregationInterval: S.optional(S.Number),
  }),
).annotate({
  identifier: "VPCFlowLogParameters",
}) as any as S.Schema<VPCFlowLogParameters>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface AdvancedFieldSelector {
  Field: string;
  Equals?: string[];
  StartsWith?: string[];
  EndsWith?: string[];
  NotEquals?: string[];
  NotStartsWith?: string[];
  NotEndsWith?: string[];
}
export const AdvancedFieldSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.String,
    Equals: S.optional(StringList),
    StartsWith: S.optional(StringList),
    EndsWith: S.optional(StringList),
    NotEquals: S.optional(StringList),
    NotStartsWith: S.optional(StringList),
    NotEndsWith: S.optional(StringList),
  }),
).annotate({
  identifier: "AdvancedFieldSelector",
}) as any as S.Schema<AdvancedFieldSelector>;
export type FieldSelectors = AdvancedFieldSelector[];
export const FieldSelectors = /*@__PURE__*/ S.Array(AdvancedFieldSelector);
export interface AdvancedEventSelector {
  Name?: string;
  FieldSelectors: AdvancedFieldSelector[];
}
export const AdvancedEventSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), FieldSelectors: FieldSelectors }),
).annotate({
  identifier: "AdvancedEventSelector",
}) as any as S.Schema<AdvancedEventSelector>;
export type AdvancedEventSelectors = AdvancedEventSelector[];
export const AdvancedEventSelectors = /*@__PURE__*/ S.Array(
  AdvancedEventSelector,
);
export interface CloudtrailParameters {
  AdvancedEventSelectors: AdvancedEventSelector[];
}
export const CloudtrailParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdvancedEventSelectors: AdvancedEventSelectors }),
).annotate({
  identifier: "CloudtrailParameters",
}) as any as S.Schema<CloudtrailParameters>;
export type OutputFormat = "plain" | "json" | (string & {});
export const OutputFormat = /*@__PURE__*/ S.String;

export interface ELBLoadBalancerLoggingParameters {
  OutputFormat?: OutputFormat;
  FieldDelimiter?: string;
}
export const ELBLoadBalancerLoggingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputFormat: S.optional(OutputFormat),
    FieldDelimiter: S.optional(S.String),
  }),
).annotate({
  identifier: "ELBLoadBalancerLoggingParameters",
}) as any as S.Schema<ELBLoadBalancerLoggingParameters>;
export interface SingleHeader {
  Name?: string;
}
export const SingleHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "SingleHeader" }) as any as S.Schema<SingleHeader>;
export interface FieldToMatch {
  SingleHeader?: SingleHeader;
  UriPath?: string;
  QueryString?: string;
  Method?: string;
}
export const FieldToMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SingleHeader: S.optional(SingleHeader),
    UriPath: S.optional(S.String),
    QueryString: S.optional(S.String),
    Method: S.optional(S.String),
  }),
).annotate({ identifier: "FieldToMatch" }) as any as S.Schema<FieldToMatch>;
export type RedactedFields = FieldToMatch[];
export const RedactedFields = /*@__PURE__*/ S.Array(FieldToMatch);
export type FilterBehavior = "KEEP" | "DROP" | (string & {});
export const FilterBehavior = /*@__PURE__*/ S.String;

export type FilterRequirement = "MEETS_ALL" | "MEETS_ANY" | (string & {});
export const FilterRequirement = /*@__PURE__*/ S.String;

export type Action =
  | "ALLOW"
  | "BLOCK"
  | "COUNT"
  | "CAPTCHA"
  | "CHALLENGE"
  | "EXCLUDED_AS_COUNT"
  | (string & {});
export const Action = /*@__PURE__*/ S.String;

export interface ActionCondition {
  Action?: Action;
}
export const ActionCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: S.optional(Action) }),
).annotate({
  identifier: "ActionCondition",
}) as any as S.Schema<ActionCondition>;
export interface LabelNameCondition {
  LabelName?: string;
}
export const LabelNameCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LabelName: S.optional(S.String) }),
).annotate({
  identifier: "LabelNameCondition",
}) as any as S.Schema<LabelNameCondition>;
export interface Condition {
  ActionCondition?: ActionCondition;
  LabelNameCondition?: LabelNameCondition;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionCondition: S.optional(ActionCondition),
    LabelNameCondition: S.optional(LabelNameCondition),
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type Conditions = Condition[];
export const Conditions = /*@__PURE__*/ S.Array(Condition);
export interface Filter {
  Behavior?: FilterBehavior;
  Requirement?: FilterRequirement;
  Conditions?: Condition[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Behavior: S.optional(FilterBehavior),
    Requirement: S.optional(FilterRequirement),
    Conditions: S.optional(Conditions),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface LoggingFilter {
  Filters?: Filter[];
  DefaultBehavior?: FilterBehavior;
}
export const LoggingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    DefaultBehavior: S.optional(FilterBehavior),
  }),
).annotate({ identifier: "LoggingFilter" }) as any as S.Schema<LoggingFilter>;
export type WAFLogType = "WAF_LOGS" | (string & {});
export const WAFLogType = /*@__PURE__*/ S.String;

export interface WAFLoggingParameters {
  RedactedFields?: FieldToMatch[];
  LoggingFilter?: LoggingFilter;
  LogType?: WAFLogType;
}
export const WAFLoggingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RedactedFields: S.optional(RedactedFields),
    LoggingFilter: S.optional(LoggingFilter),
    LogType: S.optional(WAFLogType),
  }),
).annotate({
  identifier: "WAFLoggingParameters",
}) as any as S.Schema<WAFLoggingParameters>;
export type LogType =
  | "APPLICATION_LOGS"
  | "USAGE_LOGS"
  | "SECURITY_FINDING_LOGS"
  | "ACCESS_LOGS"
  | "CONNECTION_LOGS"
  | (string & {});
export const LogType = /*@__PURE__*/ S.String;

export type LogTypes = LogType[];
export const LogTypes = /*@__PURE__*/ S.Array(LogType);
export interface LogDeliveryParameters {
  LogTypes?: LogType[];
}
export const LogDeliveryParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogTypes: S.optional(LogTypes) }),
).annotate({
  identifier: "LogDeliveryParameters",
}) as any as S.Schema<LogDeliveryParameters>;
export type MskEnhancedMonitoringLevel =
  | "DEFAULT"
  | "PER_BROKER"
  | "PER_TOPIC_PER_BROKER"
  | "PER_TOPIC_PER_PARTITION"
  | (string & {});
export const MskEnhancedMonitoringLevel = /*@__PURE__*/ S.String;

export interface MskMonitoringParameters {
  EnhancedMonitoring?: MskEnhancedMonitoringLevel;
}
export const MskMonitoringParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EnhancedMonitoring: S.optional(MskEnhancedMonitoringLevel) }),
).annotate({
  identifier: "MskMonitoringParameters",
}) as any as S.Schema<MskMonitoringParameters>;
export interface TelemetryDestinationConfiguration {
  DestinationType?: DestinationType;
  DestinationPattern?: string;
  RetentionInDays?: number;
  VPCFlowLogParameters?: VPCFlowLogParameters;
  CloudtrailParameters?: CloudtrailParameters;
  ELBLoadBalancerLoggingParameters?: ELBLoadBalancerLoggingParameters;
  WAFLoggingParameters?: WAFLoggingParameters;
  LogDeliveryParameters?: LogDeliveryParameters;
  MskMonitoringParameters?: MskMonitoringParameters;
}
export const TelemetryDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationType: S.optional(DestinationType),
    DestinationPattern: S.optional(S.String),
    RetentionInDays: S.optional(S.Number),
    VPCFlowLogParameters: S.optional(VPCFlowLogParameters),
    CloudtrailParameters: S.optional(CloudtrailParameters),
    ELBLoadBalancerLoggingParameters: S.optional(
      ELBLoadBalancerLoggingParameters,
    ),
    WAFLoggingParameters: S.optional(WAFLoggingParameters),
    LogDeliveryParameters: S.optional(LogDeliveryParameters),
    MskMonitoringParameters: S.optional(MskMonitoringParameters),
  }),
).annotate({
  identifier: "TelemetryDestinationConfiguration",
}) as any as S.Schema<TelemetryDestinationConfiguration>;
export type AllRegions = boolean;
export interface TelemetryRule {
  ResourceType?: ResourceType;
  TelemetryType: TelemetryType;
  TelemetrySourceTypes?: TelemetrySourceType[];
  DestinationConfiguration?: TelemetryDestinationConfiguration;
  Scope?: string;
  SelectionCriteria?: string;
  AllowFieldUpdates?: boolean;
  Regions?: string[];
  AllRegions?: boolean;
}
export const TelemetryRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceType),
    TelemetryType: TelemetryType,
    TelemetrySourceTypes: S.optional(TelemetrySourceTypes),
    DestinationConfiguration: S.optional(TelemetryDestinationConfiguration),
    Scope: S.optional(S.String),
    SelectionCriteria: S.optional(S.String),
    AllowFieldUpdates: S.optional(S.Boolean),
    Regions: S.optional(Regions),
    AllRegions: S.optional(S.Boolean),
  }),
).annotate({ identifier: "TelemetryRule" }) as any as S.Schema<TelemetryRule>;
export interface CreateTelemetryRuleInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTelemetryRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    Rule: TelemetryRule,
    Tags: S.optional(TagMapInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateTelemetryRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTelemetryRuleInput",
}) as any as S.Schema<CreateTelemetryRuleInput>;
export interface CreateTelemetryRuleOutput {
  RuleArn?: string;
}
export const CreateTelemetryRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTelemetryRuleOutput",
}) as any as S.Schema<CreateTelemetryRuleOutput>;
export interface CreateTelemetryRuleForOrganizationInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTelemetryRuleForOrganizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RuleName: S.String,
      Rule: TelemetryRule,
      Tags: S.optional(TagMapInput),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/CreateTelemetryRuleForOrganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTelemetryRuleForOrganizationInput",
}) as any as S.Schema<CreateTelemetryRuleForOrganizationInput>;
export interface CreateTelemetryRuleForOrganizationOutput {
  RuleArn?: string;
}
export const CreateTelemetryRuleForOrganizationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RuleArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTelemetryRuleForOrganizationOutput",
}) as any as S.Schema<CreateTelemetryRuleForOrganizationOutput>;
export type RuleIdentifier = string;
export interface DeleteCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
}
export const DeleteCentralizationRuleForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RuleIdentifier: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DeleteCentralizationRuleForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteCentralizationRuleForOrganizationInput",
  }) as any as S.Schema<DeleteCentralizationRuleForOrganizationInput>;
export interface DeleteCentralizationRuleForOrganizationResponse {}
export const DeleteCentralizationRuleForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteCentralizationRuleForOrganizationResponse",
  }) as any as S.Schema<DeleteCentralizationRuleForOrganizationResponse>;
export interface DeleteS3TableIntegrationInput {
  Arn: string;
}
export const DeleteS3TableIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteS3TableIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteS3TableIntegrationInput",
}) as any as S.Schema<DeleteS3TableIntegrationInput>;
export interface DeleteS3TableIntegrationResponse {}
export const DeleteS3TableIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteS3TableIntegrationResponse",
}) as any as S.Schema<DeleteS3TableIntegrationResponse>;
export type TelemetryPipelineIdentifier = string;
export interface DeleteTelemetryPipelineInput {
  PipelineIdentifier: string;
}
export const DeleteTelemetryPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteTelemetryPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTelemetryPipelineInput",
}) as any as S.Schema<DeleteTelemetryPipelineInput>;
export interface DeleteTelemetryPipelineOutput {}
export const DeleteTelemetryPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTelemetryPipelineOutput",
}) as any as S.Schema<DeleteTelemetryPipelineOutput>;
export interface DeleteTelemetryRuleInput {
  RuleIdentifier: string;
}
export const DeleteTelemetryRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteTelemetryRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTelemetryRuleInput",
}) as any as S.Schema<DeleteTelemetryRuleInput>;
export interface DeleteTelemetryRuleResponse {}
export const DeleteTelemetryRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTelemetryRuleResponse",
}) as any as S.Schema<DeleteTelemetryRuleResponse>;
export interface DeleteTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
}
export const DeleteTelemetryRuleForOrganizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RuleIdentifier: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DeleteTelemetryRuleForOrganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteTelemetryRuleForOrganizationInput",
}) as any as S.Schema<DeleteTelemetryRuleForOrganizationInput>;
export interface DeleteTelemetryRuleForOrganizationResponse {}
export const DeleteTelemetryRuleForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteTelemetryRuleForOrganizationResponse",
  }) as any as S.Schema<DeleteTelemetryRuleForOrganizationResponse>;
export interface GetCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
}
export const GetCentralizationRuleForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RuleIdentifier: S.String }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/GetCentralizationRuleForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCentralizationRuleForOrganizationInput",
  }) as any as S.Schema<GetCentralizationRuleForOrganizationInput>;
export type RuleHealth =
  | "Healthy"
  | "Unhealthy"
  | "Provisioning"
  | (string & {});
export const RuleHealth = /*@__PURE__*/ S.String;

export type CentralizationFailureReason =
  | "TRUSTED_ACCESS_NOT_ENABLED"
  | "DESTINATION_ACCOUNT_NOT_IN_ORGANIZATION"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export const CentralizationFailureReason = /*@__PURE__*/ S.String;

export interface GetCentralizationRuleForOrganizationOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatorAccountId?: string;
  CreatedTimeStamp?: number;
  CreatedRegion?: string;
  LastUpdateTimeStamp?: number;
  RuleHealth?: RuleHealth;
  FailureReason?: CentralizationFailureReason;
  CentralizationRule?: CentralizationRule;
}
export const GetCentralizationRuleForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RuleName: S.optional(S.String),
      RuleArn: S.optional(S.String),
      CreatorAccountId: S.optional(S.String),
      CreatedTimeStamp: S.optional(S.Number),
      CreatedRegion: S.optional(S.String),
      LastUpdateTimeStamp: S.optional(S.Number),
      RuleHealth: S.optional(RuleHealth),
      FailureReason: S.optional(CentralizationFailureReason),
      CentralizationRule: S.optional(CentralizationRule),
    }),
  ).annotate({
    identifier: "GetCentralizationRuleForOrganizationOutput",
  }) as any as S.Schema<GetCentralizationRuleForOrganizationOutput>;
export interface GetS3TableIntegrationInput {
  Arn: string;
}
export const GetS3TableIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetS3TableIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetS3TableIntegrationInput",
}) as any as S.Schema<GetS3TableIntegrationInput>;
export type IntegrationStatus = "ACTIVE" | "DELETING" | (string & {});
export const IntegrationStatus = /*@__PURE__*/ S.String;

export interface GetS3TableIntegrationOutput {
  Arn?: string;
  RoleArn?: string;
  Status?: IntegrationStatus;
  Encryption?: Encryption;
  DestinationTableBucketArn?: string;
  CreatedTimeStamp?: number;
}
export const GetS3TableIntegrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Status: S.optional(IntegrationStatus),
    Encryption: S.optional(Encryption),
    DestinationTableBucketArn: S.optional(S.String),
    CreatedTimeStamp: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetS3TableIntegrationOutput",
}) as any as S.Schema<GetS3TableIntegrationOutput>;
export interface GetTelemetryEnrichmentStatusRequest {}
export const GetTelemetryEnrichmentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTelemetryEnrichmentStatus" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTelemetryEnrichmentStatusRequest",
}) as any as S.Schema<GetTelemetryEnrichmentStatusRequest>;
export type TelemetryEnrichmentStatus =
  | "Running"
  | "Stopped"
  | "Impaired"
  | (string & {});
export const TelemetryEnrichmentStatus = /*@__PURE__*/ S.String;

export type AwsResourceExplorerManagedViewArn = string;
export interface GetTelemetryEnrichmentStatusOutput {
  Status?: TelemetryEnrichmentStatus;
  AwsResourceExplorerManagedViewArn?: string;
}
export const GetTelemetryEnrichmentStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(TelemetryEnrichmentStatus),
    AwsResourceExplorerManagedViewArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTelemetryEnrichmentStatusOutput",
}) as any as S.Schema<GetTelemetryEnrichmentStatusOutput>;
export interface GetTelemetryEvaluationStatusRequest {}
export const GetTelemetryEvaluationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTelemetryEvaluationStatus" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTelemetryEvaluationStatusRequest",
}) as any as S.Schema<GetTelemetryEvaluationStatusRequest>;
export type Status =
  | "NOT_STARTED"
  | "STARTING"
  | "FAILED_START"
  | "RUNNING"
  | "STOPPING"
  | "FAILED_STOP"
  | "STOPPED"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export type FailureReason = string;
export interface RegionStatus {
  Region?: string;
  Status?: string;
  FailureReason?: string;
  RuleArn?: string;
}
export const RegionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    Status: S.optional(S.String),
    FailureReason: S.optional(S.String),
    RuleArn: S.optional(S.String),
  }),
).annotate({ identifier: "RegionStatus" }) as any as S.Schema<RegionStatus>;
export type RegionStatuses = RegionStatus[];
export const RegionStatuses = /*@__PURE__*/ S.Array(RegionStatus);
export interface GetTelemetryEvaluationStatusOutput {
  Status?: Status;
  FailureReason?: string;
  HomeRegion?: string;
  RegionStatuses?: RegionStatus[];
}
export const GetTelemetryEvaluationStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(Status),
    FailureReason: S.optional(S.String),
    HomeRegion: S.optional(S.String),
    RegionStatuses: S.optional(RegionStatuses),
  }),
).annotate({
  identifier: "GetTelemetryEvaluationStatusOutput",
}) as any as S.Schema<GetTelemetryEvaluationStatusOutput>;
export interface GetTelemetryEvaluationStatusForOrganizationRequest {}
export const GetTelemetryEvaluationStatusForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/GetTelemetryEvaluationStatusForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetTelemetryEvaluationStatusForOrganizationRequest",
  }) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationRequest>;
export interface GetTelemetryEvaluationStatusForOrganizationOutput {
  Status?: Status;
  FailureReason?: string;
  HomeRegion?: string;
  RegionStatuses?: RegionStatus[];
}
export const GetTelemetryEvaluationStatusForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Status: S.optional(Status),
      FailureReason: S.optional(S.String),
      HomeRegion: S.optional(S.String),
      RegionStatuses: S.optional(RegionStatuses),
    }),
  ).annotate({
    identifier: "GetTelemetryEvaluationStatusForOrganizationOutput",
  }) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationOutput>;
export interface GetTelemetryPipelineInput {
  PipelineIdentifier: string;
}
export const GetTelemetryPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTelemetryPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTelemetryPipelineInput",
}) as any as S.Schema<GetTelemetryPipelineInput>;
export type TelemetryPipelineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export const TelemetryPipelineStatus = /*@__PURE__*/ S.String;

export interface TelemetryPipelineStatusReason {
  Description?: string;
}
export const TelemetryPipelineStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.optional(S.String) }),
).annotate({
  identifier: "TelemetryPipelineStatusReason",
}) as any as S.Schema<TelemetryPipelineStatusReason>;
export type TagMapOutput = { [key: string]: string | undefined };
export const TagMapOutput = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface TelemetryPipeline {
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  Arn?: string;
  Name?: string;
  Configuration?: TelemetryPipelineConfiguration;
  Status?: TelemetryPipelineStatus;
  StatusReason?: TelemetryPipelineStatusReason;
  Tags?: { [key: string]: string | undefined };
}
export const TelemetryPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedTimeStamp: S.optional(S.Number),
    LastUpdateTimeStamp: S.optional(S.Number),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Configuration: S.optional(TelemetryPipelineConfiguration),
    Status: S.optional(TelemetryPipelineStatus),
    StatusReason: S.optional(TelemetryPipelineStatusReason),
    Tags: S.optional(TagMapOutput),
  }),
).annotate({
  identifier: "TelemetryPipeline",
}) as any as S.Schema<TelemetryPipeline>;
export interface GetTelemetryPipelineOutput {
  Pipeline?: TelemetryPipeline;
}
export const GetTelemetryPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(TelemetryPipeline) }),
).annotate({
  identifier: "GetTelemetryPipelineOutput",
}) as any as S.Schema<GetTelemetryPipelineOutput>;
export interface GetTelemetryRuleInput {
  RuleIdentifier: string;
}
export const GetTelemetryRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTelemetryRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTelemetryRuleInput",
}) as any as S.Schema<GetTelemetryRuleInput>;
export type IsReplicated = boolean;
export interface GetTelemetryRuleOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  TelemetryRule?: TelemetryRule;
  HomeRegion?: string;
  IsReplicated?: boolean;
  RegionStatuses?: RegionStatus[];
}
export const GetTelemetryRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleArn: S.optional(S.String),
    CreatedTimeStamp: S.optional(S.Number),
    LastUpdateTimeStamp: S.optional(S.Number),
    TelemetryRule: S.optional(TelemetryRule),
    HomeRegion: S.optional(S.String),
    IsReplicated: S.optional(S.Boolean),
    RegionStatuses: S.optional(RegionStatuses),
  }),
).annotate({
  identifier: "GetTelemetryRuleOutput",
}) as any as S.Schema<GetTelemetryRuleOutput>;
export interface GetTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
}
export const GetTelemetryRuleForOrganizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RuleIdentifier: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetTelemetryRuleForOrganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetTelemetryRuleForOrganizationInput",
}) as any as S.Schema<GetTelemetryRuleForOrganizationInput>;
export interface GetTelemetryRuleForOrganizationOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  TelemetryRule?: TelemetryRule;
  HomeRegion?: string;
  IsReplicated?: boolean;
  RegionStatuses?: RegionStatus[];
}
export const GetTelemetryRuleForOrganizationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RuleName: S.optional(S.String),
      RuleArn: S.optional(S.String),
      CreatedTimeStamp: S.optional(S.Number),
      LastUpdateTimeStamp: S.optional(S.Number),
      TelemetryRule: S.optional(TelemetryRule),
      HomeRegion: S.optional(S.String),
      IsReplicated: S.optional(S.Boolean),
      RegionStatuses: S.optional(RegionStatuses),
    }),
).annotate({
  identifier: "GetTelemetryRuleForOrganizationOutput",
}) as any as S.Schema<GetTelemetryRuleForOrganizationOutput>;
export type ListCentralizationRulesForOrganizationMaxResults = number;
export type NextToken = string;
export interface ListCentralizationRulesForOrganizationInput {
  RuleNamePrefix?: string;
  AllRegions?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCentralizationRulesForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RuleNamePrefix: S.optional(S.String),
      AllRegions: S.optional(S.Boolean),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ListCentralizationRulesForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCentralizationRulesForOrganizationInput",
  }) as any as S.Schema<ListCentralizationRulesForOrganizationInput>;
export interface CentralizationRuleSummary {
  RuleName?: string;
  RuleArn?: string;
  CreatorAccountId?: string;
  CreatedTimeStamp?: number;
  CreatedRegion?: string;
  LastUpdateTimeStamp?: number;
  RuleHealth?: RuleHealth;
  FailureReason?: CentralizationFailureReason;
  DestinationAccountId?: string;
  DestinationRegion?: string;
}
export const CentralizationRuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleArn: S.optional(S.String),
    CreatorAccountId: S.optional(S.String),
    CreatedTimeStamp: S.optional(S.Number),
    CreatedRegion: S.optional(S.String),
    LastUpdateTimeStamp: S.optional(S.Number),
    RuleHealth: S.optional(RuleHealth),
    FailureReason: S.optional(CentralizationFailureReason),
    DestinationAccountId: S.optional(S.String),
    DestinationRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "CentralizationRuleSummary",
}) as any as S.Schema<CentralizationRuleSummary>;
export type CentralizationRuleSummaries = CentralizationRuleSummary[];
export const CentralizationRuleSummaries = /*@__PURE__*/ S.Array(
  CentralizationRuleSummary,
);
export interface ListCentralizationRulesForOrganizationOutput {
  CentralizationRuleSummaries?: CentralizationRuleSummary[];
  NextToken?: string;
}
export const ListCentralizationRulesForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CentralizationRuleSummaries: S.optional(CentralizationRuleSummaries),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCentralizationRulesForOrganizationOutput",
  }) as any as S.Schema<ListCentralizationRulesForOrganizationOutput>;
export type ResourceIdentifierPrefix = string;
export type ResourceTypes = ResourceType[];
export const ResourceTypes = /*@__PURE__*/ S.Array(ResourceType);
export type TelemetryState =
  | "Enabled"
  | "Disabled"
  | "NotApplicable"
  | (string & {});
export const TelemetryState = /*@__PURE__*/ S.String;

export type TelemetryConfigurationState = {
  [key in TelemetryType]?: TelemetryState;
};
export const TelemetryConfigurationState = /*@__PURE__*/ S.Record(
  TelemetryType,
  TelemetryState.pipe(S.optional),
);
export type ListResourceTelemetryMaxResults = number;
export interface ListResourceTelemetryInput {
  ResourceIdentifierPrefix?: string;
  ResourceTypes?: ResourceType[];
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceTags?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceTelemetryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdentifierPrefix: S.optional(S.String),
    ResourceTypes: S.optional(ResourceTypes),
    TelemetryConfigurationState: S.optional(TelemetryConfigurationState),
    ResourceTags: S.optional(TagMapInput),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResourceTelemetry" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceTelemetryInput",
}) as any as S.Schema<ListResourceTelemetryInput>;
export type ResourceIdentifier = string;
export interface TelemetryConfiguration {
  AccountIdentifier?: string;
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  ResourceTags?: { [key: string]: string | undefined };
  LastUpdateTimeStamp?: number;
  TelemetrySourceType?: TelemetrySourceType;
}
export const TelemetryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountIdentifier: S.optional(S.String),
    TelemetryConfigurationState: S.optional(TelemetryConfigurationState),
    ResourceType: S.optional(ResourceType),
    ResourceIdentifier: S.optional(S.String),
    ResourceTags: S.optional(TagMapOutput),
    LastUpdateTimeStamp: S.optional(S.Number),
    TelemetrySourceType: S.optional(TelemetrySourceType),
  }),
).annotate({
  identifier: "TelemetryConfiguration",
}) as any as S.Schema<TelemetryConfiguration>;
export type TelemetryConfigurations = TelemetryConfiguration[];
export const TelemetryConfigurations = /*@__PURE__*/ S.Array(
  TelemetryConfiguration,
);
export interface ListResourceTelemetryOutput {
  TelemetryConfigurations?: TelemetryConfiguration[];
  NextToken?: string;
}
export const ListResourceTelemetryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TelemetryConfigurations: S.optional(TelemetryConfigurations),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceTelemetryOutput",
}) as any as S.Schema<ListResourceTelemetryOutput>;
export type AccountIdentifiers = string[];
export const AccountIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type ListResourceTelemetryForOrganizationMaxResults = number;
export interface ListResourceTelemetryForOrganizationInput {
  AccountIdentifiers?: string[];
  ResourceIdentifierPrefix?: string;
  ResourceTypes?: ResourceType[];
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceTags?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceTelemetryForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountIdentifiers: S.optional(AccountIdentifiers),
      ResourceIdentifierPrefix: S.optional(S.String),
      ResourceTypes: S.optional(ResourceTypes),
      TelemetryConfigurationState: S.optional(TelemetryConfigurationState),
      ResourceTags: S.optional(TagMapInput),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ListResourceTelemetryForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListResourceTelemetryForOrganizationInput",
  }) as any as S.Schema<ListResourceTelemetryForOrganizationInput>;
export interface ListResourceTelemetryForOrganizationOutput {
  TelemetryConfigurations?: TelemetryConfiguration[];
  NextToken?: string;
}
export const ListResourceTelemetryForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TelemetryConfigurations: S.optional(TelemetryConfigurations),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListResourceTelemetryForOrganizationOutput",
  }) as any as S.Schema<ListResourceTelemetryForOrganizationOutput>;
export type ListS3TableIntegrationsMaxResults = number;
export interface ListS3TableIntegrationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListS3TableIntegrationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListS3TableIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListS3TableIntegrationsInput",
}) as any as S.Schema<ListS3TableIntegrationsInput>;
export interface IntegrationSummary {
  Arn?: string;
  Status?: IntegrationStatus;
}
export const IntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Status: S.optional(IntegrationStatus),
  }),
).annotate({
  identifier: "IntegrationSummary",
}) as any as S.Schema<IntegrationSummary>;
export type IntegrationSummaries = IntegrationSummary[];
export const IntegrationSummaries = /*@__PURE__*/ S.Array(IntegrationSummary);
export interface ListS3TableIntegrationsOutput {
  IntegrationSummaries?: IntegrationSummary[];
  NextToken?: string;
}
export const ListS3TableIntegrationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationSummaries: S.optional(IntegrationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListS3TableIntegrationsOutput",
}) as any as S.Schema<ListS3TableIntegrationsOutput>;
export interface ListTagsForResourceInput {
  ResourceARN: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagMapOutput }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ListTelemetryPipelinesMaxResults = number;
export interface ListTelemetryPipelinesInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListTelemetryPipelinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTelemetryPipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTelemetryPipelinesInput",
}) as any as S.Schema<ListTelemetryPipelinesInput>;
export interface Source {
  Type?: string;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String) }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export type Sources = Source[];
export const Sources = /*@__PURE__*/ S.Array(Source);
export interface DataSource {
  Name?: string;
  Type?: string;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type DataSources = DataSource[];
export const DataSources = /*@__PURE__*/ S.Array(DataSource);
export type Processors = string[];
export const Processors = /*@__PURE__*/ S.Array(S.String);
export type Sinks = string[];
export const Sinks = /*@__PURE__*/ S.Array(S.String);
export interface ConfigurationSummary {
  Sources?: Source[];
  DataSources?: DataSource[];
  Processors?: string[];
  ProcessorCount?: number;
  Sinks?: string[];
}
export const ConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sources: S.optional(Sources),
    DataSources: S.optional(DataSources),
    Processors: S.optional(Processors),
    ProcessorCount: S.optional(S.Number),
    Sinks: S.optional(Sinks),
  }),
).annotate({
  identifier: "ConfigurationSummary",
}) as any as S.Schema<ConfigurationSummary>;
export interface TelemetryPipelineSummary {
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  Arn?: string;
  Name?: string;
  Status?: TelemetryPipelineStatus;
  Tags?: { [key: string]: string | undefined };
  ConfigurationSummary?: ConfigurationSummary;
}
export const TelemetryPipelineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedTimeStamp: S.optional(S.Number),
    LastUpdateTimeStamp: S.optional(S.Number),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(TelemetryPipelineStatus),
    Tags: S.optional(TagMapOutput),
    ConfigurationSummary: S.optional(ConfigurationSummary),
  }),
).annotate({
  identifier: "TelemetryPipelineSummary",
}) as any as S.Schema<TelemetryPipelineSummary>;
export type TelemetryPipelineSummaries = TelemetryPipelineSummary[];
export const TelemetryPipelineSummaries = /*@__PURE__*/ S.Array(
  TelemetryPipelineSummary,
);
export interface ListTelemetryPipelinesOutput {
  PipelineSummaries?: TelemetryPipelineSummary[];
  NextToken?: string;
}
export const ListTelemetryPipelinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineSummaries: S.optional(TelemetryPipelineSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTelemetryPipelinesOutput",
}) as any as S.Schema<ListTelemetryPipelinesOutput>;
export type ListTelemetryRulesMaxResults = number;
export interface ListTelemetryRulesInput {
  RuleNamePrefix?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTelemetryRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleNamePrefix: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTelemetryRules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTelemetryRulesInput",
}) as any as S.Schema<ListTelemetryRulesInput>;
export interface TelemetryRuleSummary {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  ResourceType?: ResourceType;
  TelemetryType?: TelemetryType;
  TelemetrySourceTypes?: TelemetrySourceType[];
}
export const TelemetryRuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleArn: S.optional(S.String),
    CreatedTimeStamp: S.optional(S.Number),
    LastUpdateTimeStamp: S.optional(S.Number),
    ResourceType: S.optional(ResourceType),
    TelemetryType: S.optional(TelemetryType),
    TelemetrySourceTypes: S.optional(TelemetrySourceTypes),
  }),
).annotate({
  identifier: "TelemetryRuleSummary",
}) as any as S.Schema<TelemetryRuleSummary>;
export type TelemetryRuleSummaries = TelemetryRuleSummary[];
export const TelemetryRuleSummaries =
  /*@__PURE__*/ S.Array(TelemetryRuleSummary);
export interface ListTelemetryRulesOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[];
  NextToken?: string;
}
export const ListTelemetryRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TelemetryRuleSummaries: S.optional(TelemetryRuleSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTelemetryRulesOutput",
}) as any as S.Schema<ListTelemetryRulesOutput>;
export type OrganizationUnitIdentifier = string;
export type OrganizationUnitIdentifiers = string[];
export const OrganizationUnitIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type ListTelemetryRulesForOrganizationMaxResults = number;
export interface ListTelemetryRulesForOrganizationInput {
  RuleNamePrefix?: string;
  SourceAccountIds?: string[];
  SourceOrganizationUnitIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListTelemetryRulesForOrganizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RuleNamePrefix: S.optional(S.String),
      SourceAccountIds: S.optional(AccountIdentifiers),
      SourceOrganizationUnitIds: S.optional(OrganizationUnitIdentifiers),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListTelemetryRulesForOrganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListTelemetryRulesForOrganizationInput",
}) as any as S.Schema<ListTelemetryRulesForOrganizationInput>;
export interface ListTelemetryRulesForOrganizationOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[];
  NextToken?: string;
}
export const ListTelemetryRulesForOrganizationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TelemetryRuleSummaries: S.optional(TelemetryRuleSummaries),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListTelemetryRulesForOrganizationOutput",
}) as any as S.Schema<ListTelemetryRulesForOrganizationOutput>;
export interface StartTelemetryEnrichmentRequest {}
export const StartTelemetryEnrichmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTelemetryEnrichment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTelemetryEnrichmentRequest",
}) as any as S.Schema<StartTelemetryEnrichmentRequest>;
export interface StartTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus;
  AwsResourceExplorerManagedViewArn?: string;
}
export const StartTelemetryEnrichmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(TelemetryEnrichmentStatus),
    AwsResourceExplorerManagedViewArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartTelemetryEnrichmentOutput",
}) as any as S.Schema<StartTelemetryEnrichmentOutput>;
export interface StartTelemetryEvaluationInput {
  Regions?: string[];
  AllRegions?: boolean;
}
export const StartTelemetryEvaluationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Regions: S.optional(Regions),
    AllRegions: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTelemetryEvaluation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTelemetryEvaluationInput",
}) as any as S.Schema<StartTelemetryEvaluationInput>;
export interface StartTelemetryEvaluationResponse {}
export const StartTelemetryEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartTelemetryEvaluationResponse",
}) as any as S.Schema<StartTelemetryEvaluationResponse>;
export interface StartTelemetryEvaluationForOrganizationInput {
  Regions?: string[];
  AllRegions?: boolean;
}
export const StartTelemetryEvaluationForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Regions: S.optional(Regions),
      AllRegions: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/StartTelemetryEvaluationForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartTelemetryEvaluationForOrganizationInput",
  }) as any as S.Schema<StartTelemetryEvaluationForOrganizationInput>;
export interface StartTelemetryEvaluationForOrganizationResponse {}
export const StartTelemetryEvaluationForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StartTelemetryEvaluationForOrganizationResponse",
  }) as any as S.Schema<StartTelemetryEvaluationForOrganizationResponse>;
export interface StopTelemetryEnrichmentRequest {}
export const StopTelemetryEnrichmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopTelemetryEnrichment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopTelemetryEnrichmentRequest",
}) as any as S.Schema<StopTelemetryEnrichmentRequest>;
export interface StopTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus;
}
export const StopTelemetryEnrichmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(TelemetryEnrichmentStatus) }),
).annotate({
  identifier: "StopTelemetryEnrichmentOutput",
}) as any as S.Schema<StopTelemetryEnrichmentOutput>;
export interface StopTelemetryEvaluationRequest {}
export const StopTelemetryEvaluationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopTelemetryEvaluation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopTelemetryEvaluationRequest",
}) as any as S.Schema<StopTelemetryEvaluationRequest>;
export interface StopTelemetryEvaluationResponse {}
export const StopTelemetryEvaluationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopTelemetryEvaluationResponse",
}) as any as S.Schema<StopTelemetryEvaluationResponse>;
export interface StopTelemetryEvaluationForOrganizationRequest {}
export const StopTelemetryEvaluationForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/StopTelemetryEvaluationForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StopTelemetryEvaluationForOrganizationRequest",
  }) as any as S.Schema<StopTelemetryEvaluationForOrganizationRequest>;
export interface StopTelemetryEvaluationForOrganizationResponse {}
export const StopTelemetryEvaluationForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StopTelemetryEvaluationForOrganizationResponse",
  }) as any as S.Schema<StopTelemetryEvaluationForOrganizationResponse>;
export interface TagResourceInput {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagMapInput }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type RecordFormat = "STRING" | "JSON" | (string & {});
export const RecordFormat = /*@__PURE__*/ S.String;

export interface Record {
  Data?: string;
  Type?: RecordFormat;
}
export const Record = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(S.String), Type: S.optional(RecordFormat) }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type Records = Record[];
export const Records = /*@__PURE__*/ S.Array(Record);
export interface TestTelemetryPipelineInput {
  Records: Record[];
  Configuration: TelemetryPipelineConfiguration;
}
export const TestTelemetryPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: Records,
    Configuration: TelemetryPipelineConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TestTelemetryPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestTelemetryPipelineInput",
}) as any as S.Schema<TestTelemetryPipelineInput>;
export interface PipelineOutputError {
  Message?: string;
}
export const PipelineOutputError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "PipelineOutputError",
}) as any as S.Schema<PipelineOutputError>;
export interface PipelineOutput {
  Record?: Record;
  Error?: PipelineOutputError;
}
export const PipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Record: S.optional(Record),
    Error: S.optional(PipelineOutputError),
  }),
).annotate({ identifier: "PipelineOutput" }) as any as S.Schema<PipelineOutput>;
export type PipelineOutputs = PipelineOutput[];
export const PipelineOutputs = /*@__PURE__*/ S.Array(PipelineOutput);
export interface TestTelemetryPipelineOutput {
  Results?: PipelineOutput[];
}
export const TestTelemetryPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: S.optional(PipelineOutputs) }),
).annotate({
  identifier: "TestTelemetryPipelineOutput",
}) as any as S.Schema<TestTelemetryPipelineOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
  Rule: CentralizationRule;
}
export const UpdateCentralizationRuleForOrganizationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RuleIdentifier: S.String, Rule: CentralizationRule }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/UpdateCentralizationRuleForOrganization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateCentralizationRuleForOrganizationInput",
  }) as any as S.Schema<UpdateCentralizationRuleForOrganizationInput>;
export interface UpdateCentralizationRuleForOrganizationOutput {
  RuleArn?: string;
}
export const UpdateCentralizationRuleForOrganizationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RuleArn: S.optional(S.String) }),
  ).annotate({
    identifier: "UpdateCentralizationRuleForOrganizationOutput",
  }) as any as S.Schema<UpdateCentralizationRuleForOrganizationOutput>;
export interface UpdateTelemetryPipelineInput {
  PipelineIdentifier: string;
  Configuration: TelemetryPipelineConfiguration;
}
export const UpdateTelemetryPipelineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineIdentifier: S.String,
    Configuration: TelemetryPipelineConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateTelemetryPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTelemetryPipelineInput",
}) as any as S.Schema<UpdateTelemetryPipelineInput>;
export interface UpdateTelemetryPipelineOutput {}
export const UpdateTelemetryPipelineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTelemetryPipelineOutput",
}) as any as S.Schema<UpdateTelemetryPipelineOutput>;
export interface UpdateTelemetryRuleInput {
  RuleIdentifier: string;
  Rule: TelemetryRule;
}
export const UpdateTelemetryRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleIdentifier: S.String, Rule: TelemetryRule }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateTelemetryRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTelemetryRuleInput",
}) as any as S.Schema<UpdateTelemetryRuleInput>;
export interface UpdateTelemetryRuleOutput {
  RuleArn?: string;
}
export const UpdateTelemetryRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateTelemetryRuleOutput",
}) as any as S.Schema<UpdateTelemetryRuleOutput>;
export interface UpdateTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
  Rule: TelemetryRule;
}
export const UpdateTelemetryRuleForOrganizationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RuleIdentifier: S.String, Rule: TelemetryRule }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateTelemetryRuleForOrganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateTelemetryRuleForOrganizationInput",
}) as any as S.Schema<UpdateTelemetryRuleForOrganizationInput>;
export interface UpdateTelemetryRuleForOrganizationOutput {
  RuleArn?: string;
}
export const UpdateTelemetryRuleForOrganizationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RuleArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateTelemetryRuleForOrganizationOutput",
}) as any as S.Schema<UpdateTelemetryRuleForOrganizationOutput>;
export interface ValidateTelemetryPipelineConfigurationInput {
  Configuration: TelemetryPipelineConfiguration;
}
export const ValidateTelemetryPipelineConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Configuration: TelemetryPipelineConfiguration }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/ValidateTelemetryPipelineConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ValidateTelemetryPipelineConfigurationInput",
  }) as any as S.Schema<ValidateTelemetryPipelineConfigurationInput>;
export type FieldMap = { [key: string]: string | undefined };
export const FieldMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ValidationError {
  Message?: string;
  Reason?: string;
  FieldMap?: { [key: string]: string | undefined };
}
export const ValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Reason: S.optional(S.String),
    FieldMap: S.optional(FieldMap),
  }),
).annotate({
  identifier: "ValidationError",
}) as any as S.Schema<ValidationError>;
export type ValidationErrors = ValidationError[];
export const ValidationErrors = /*@__PURE__*/ S.Array(ValidationError);
export interface ValidateTelemetryPipelineConfigurationOutput {
  Errors?: ValidationError[];
}
export const ValidateTelemetryPipelineConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Errors: S.optional(ValidationErrors) }),
  ).annotate({
    identifier: "ValidateTelemetryPipelineConfigurationOutput",
  }) as any as S.Schema<ValidateTelemetryPipelineConfigurationOutput>;
export type CreateCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a centralization rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const createCentralizationRuleForOrganization: API.OperationMethod<
  CreateCentralizationRuleForOrganizationInput,
  CreateCentralizationRuleForOrganizationOutput,
  CreateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCentralizationRuleForOrganizationInput,
  output: CreateCentralizationRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCentralizationRuleForOrganization",
}));

export type CreateS3TableIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an integration between CloudWatch and S3 Tables for analytics. This integration enables querying CloudWatch telemetry data using analytics engines like Amazon Athena, Amazon Redshift, and Apache Spark.
 */
export const createS3TableIntegration: API.OperationMethod<
  CreateS3TableIntegrationInput,
  CreateS3TableIntegrationOutput,
  CreateS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateS3TableIntegrationInput,
  output: CreateS3TableIntegrationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateS3TableIntegration",
}));

export type CreateTelemetryPipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry pipeline for processing and transforming telemetry data. The pipeline defines how data flows from sources through processors to destinations, enabling data transformation and delivering capabilities.
 */
export const createTelemetryPipeline: API.OperationMethod<
  CreateTelemetryPipelineInput,
  CreateTelemetryPipelineOutput,
  CreateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTelemetryPipelineInput,
  output: CreateTelemetryPipelineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryPipeline",
}));

export type CreateTelemetryRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry rule that defines how telemetry should be configured for Amazon Web Services resources in your account. The rule specifies which resources should have telemetry enabled and how that telemetry data should be collected based on resource type, telemetry type, and selection criteria.
 */
export const createTelemetryRule: API.OperationMethod<
  CreateTelemetryRuleInput,
  CreateTelemetryRuleOutput,
  CreateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTelemetryRuleInput,
  output: CreateTelemetryRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRule",
}));

export type CreateTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const createTelemetryRuleForOrganization: API.OperationMethod<
  CreateTelemetryRuleForOrganizationInput,
  CreateTelemetryRuleForOrganizationOutput,
  CreateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTelemetryRuleForOrganizationInput,
  output: CreateTelemetryRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRuleForOrganization",
}));

export type DeleteCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an organization-wide centralization rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const deleteCentralizationRuleForOrganization: API.OperationMethod<
  DeleteCentralizationRuleForOrganizationInput,
  DeleteCentralizationRuleForOrganizationResponse,
  DeleteCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCentralizationRuleForOrganizationInput,
  output: DeleteCentralizationRuleForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCentralizationRuleForOrganization",
}));

export type DeleteS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 Table integration and its associated data. This operation removes the connection between CloudWatch Observability Admin and S3 Tables.
 */
export const deleteS3TableIntegration: API.OperationMethod<
  DeleteS3TableIntegrationInput,
  DeleteS3TableIntegrationResponse,
  DeleteS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteS3TableIntegrationInput,
  output: DeleteS3TableIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteS3TableIntegration",
}));

export type DeleteTelemetryPipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a telemetry pipeline and its associated resources. This operation stops data processing and removes the pipeline configuration.
 */
export const deleteTelemetryPipeline: API.OperationMethod<
  DeleteTelemetryPipelineInput,
  DeleteTelemetryPipelineOutput,
  DeleteTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTelemetryPipelineInput,
  output: DeleteTelemetryPipelineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryPipeline",
}));

export type DeleteTelemetryRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a telemetry rule from your account. Any telemetry configurations previously created by the rule will remain but no new resources will be configured by this rule.
 */
export const deleteTelemetryRule: API.OperationMethod<
  DeleteTelemetryRuleInput,
  DeleteTelemetryRuleResponse,
  DeleteTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTelemetryRuleInput,
  output: DeleteTelemetryRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRule",
}));

export type DeleteTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an organization-wide telemetry rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const deleteTelemetryRuleForOrganization: API.OperationMethod<
  DeleteTelemetryRuleForOrganizationInput,
  DeleteTelemetryRuleForOrganizationResponse,
  DeleteTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTelemetryRuleForOrganizationInput,
  output: DeleteTelemetryRuleForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRuleForOrganization",
}));

export type GetCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific organization centralization rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const getCentralizationRuleForOrganization: API.OperationMethod<
  GetCentralizationRuleForOrganizationInput,
  GetCentralizationRuleForOrganizationOutput,
  GetCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCentralizationRuleForOrganizationInput,
  output: GetCentralizationRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCentralizationRuleForOrganization",
}));

export type GetS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific S3 Table integration, including its configuration, status, and metadata.
 */
export const getS3TableIntegration: API.OperationMethod<
  GetS3TableIntegrationInput,
  GetS3TableIntegrationOutput,
  GetS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetS3TableIntegrationInput,
  output: GetS3TableIntegrationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetS3TableIntegration",
}));

export type GetTelemetryEnrichmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current status of the resource tags for telemetry feature, which enhances telemetry data with additional resource metadata from Resource Explorer.
 */
export const getTelemetryEnrichmentStatus: API.OperationMethod<
  GetTelemetryEnrichmentStatusRequest,
  GetTelemetryEnrichmentStatusOutput,
  GetTelemetryEnrichmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryEnrichmentStatusRequest,
  output: GetTelemetryEnrichmentStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEnrichmentStatus",
}));

export type GetTelemetryEvaluationStatusError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current onboarding status of the telemetry config feature, including the status of the feature and reason the feature failed to start or stop.
 */
export const getTelemetryEvaluationStatus: API.OperationMethod<
  GetTelemetryEvaluationStatusRequest,
  GetTelemetryEvaluationStatusOutput,
  GetTelemetryEvaluationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryEvaluationStatusRequest,
  output: GetTelemetryEvaluationStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatus",
}));

export type GetTelemetryEvaluationStatusForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This returns the onboarding status of the telemetry configuration feature for the organization. It can only be called by a Management Account of an Amazon Web Services Organization or an assigned Delegated Admin Account of Amazon CloudWatch telemetry config.
 */
export const getTelemetryEvaluationStatusForOrganization: API.OperationMethod<
  GetTelemetryEvaluationStatusForOrganizationRequest,
  GetTelemetryEvaluationStatusForOrganizationOutput,
  GetTelemetryEvaluationStatusForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryEvaluationStatusForOrganizationRequest,
  output: GetTelemetryEvaluationStatusForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatusForOrganization",
}));

export type GetTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific telemetry pipeline, including its configuration, status, and metadata.
 */
export const getTelemetryPipeline: API.OperationMethod<
  GetTelemetryPipelineInput,
  GetTelemetryPipelineOutput,
  GetTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryPipelineInput,
  output: GetTelemetryPipelineOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryPipeline",
}));

export type GetTelemetryRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific telemetry rule in your account.
 */
export const getTelemetryRule: API.OperationMethod<
  GetTelemetryRuleInput,
  GetTelemetryRuleOutput,
  GetTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryRuleInput,
  output: GetTelemetryRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRule",
}));

export type GetTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific organization telemetry rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const getTelemetryRuleForOrganization: API.OperationMethod<
  GetTelemetryRuleForOrganizationInput,
  GetTelemetryRuleForOrganizationOutput,
  GetTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTelemetryRuleForOrganizationInput,
  output: GetTelemetryRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRuleForOrganization",
}));

export type ListCentralizationRulesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all centralization rules in your organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const listCentralizationRulesForOrganization: API.PaginatedOperationMethod<
  ListCentralizationRulesForOrganizationInput,
  ListCentralizationRulesForOrganizationOutput,
  ListCentralizationRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  CentralizationRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCentralizationRulesForOrganizationInput,
  output: ListCentralizationRulesForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCentralizationRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CentralizationRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceTelemetryError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry configurations for Amazon Web Services resources supported by telemetry config. For more information, see Auditing CloudWatch telemetry configurations.
 */
export const listResourceTelemetry: API.PaginatedOperationMethod<
  ListResourceTelemetryInput,
  ListResourceTelemetryOutput,
  ListResourceTelemetryError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceTelemetryInput,
  output: ListResourceTelemetryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetry",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceTelemetryForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry configurations for Amazon Web Services resources supported by telemetry config in the organization.
 */
export const listResourceTelemetryForOrganization: API.PaginatedOperationMethod<
  ListResourceTelemetryForOrganizationInput,
  ListResourceTelemetryForOrganizationOutput,
  ListResourceTelemetryForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceTelemetryForOrganizationInput,
  output: ListResourceTelemetryForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetryForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListS3TableIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all S3 Table integrations in your account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listS3TableIntegrations: API.PaginatedOperationMethod<
  ListS3TableIntegrationsInput,
  ListS3TableIntegrationsOutput,
  ListS3TableIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListS3TableIntegrationsInput,
  output: ListS3TableIntegrationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3TableIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IntegrationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags attached to the specified resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTelemetryPipelinesError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry pipelines in your account. Returns up to 100 results. If more than 100 telemetry pipelines exist, include the `NextToken` value from the response to retrieve the next set of results.
 */
export const listTelemetryPipelines: API.PaginatedOperationMethod<
  ListTelemetryPipelinesInput,
  ListTelemetryPipelinesOutput,
  ListTelemetryPipelinesError,
  Credentials | HttpClient.HttpClient,
  TelemetryPipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTelemetryPipelinesInput,
  output: ListTelemetryPipelinesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTelemetryRulesError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all telemetry rules in your account. You can filter the results by specifying a rule name prefix.
 */
export const listTelemetryRules: API.PaginatedOperationMethod<
  ListTelemetryRulesInput,
  ListTelemetryRulesOutput,
  ListTelemetryRulesError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTelemetryRulesInput,
  output: ListTelemetryRulesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTelemetryRulesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all telemetry rules in your organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const listTelemetryRulesForOrganization: API.PaginatedOperationMethod<
  ListTelemetryRulesForOrganizationInput,
  ListTelemetryRulesForOrganizationOutput,
  ListTelemetryRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTelemetryRulesForOrganizationInput,
  output: ListTelemetryRulesForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the resource tags for telemetry feature for your account, which enhances telemetry data with additional resource metadata from Resource Explorer to provide richer context for monitoring and observability.
 */
export const startTelemetryEnrichment: API.OperationMethod<
  StartTelemetryEnrichmentRequest,
  StartTelemetryEnrichmentOutput,
  StartTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTelemetryEnrichmentRequest,
  output: StartTelemetryEnrichmentOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEnrichment",
}));

export type StartTelemetryEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action begins onboarding the caller Amazon Web Services account to the telemetry config feature.
 */
export const startTelemetryEvaluation: API.OperationMethod<
  StartTelemetryEvaluationInput,
  StartTelemetryEvaluationResponse,
  StartTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTelemetryEvaluationInput,
  output: StartTelemetryEvaluationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluation",
}));

export type StartTelemetryEvaluationForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This actions begins onboarding the organization and all member accounts to the telemetry config feature.
 */
export const startTelemetryEvaluationForOrganization: API.OperationMethod<
  StartTelemetryEvaluationForOrganizationInput,
  StartTelemetryEvaluationForOrganizationResponse,
  StartTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTelemetryEvaluationForOrganizationInput,
  output: StartTelemetryEvaluationForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluationForOrganization",
}));

export type StopTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the resource tags for telemetry feature for your account, stopping the enhancement of telemetry data with additional resource metadata.
 */
export const stopTelemetryEnrichment: API.OperationMethod<
  StopTelemetryEnrichmentRequest,
  StopTelemetryEnrichmentOutput,
  StopTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTelemetryEnrichmentRequest,
  output: StopTelemetryEnrichmentOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEnrichment",
}));

export type StopTelemetryEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action begins offboarding the caller Amazon Web Services account from the telemetry config feature.
 */
export const stopTelemetryEvaluation: API.OperationMethod<
  StopTelemetryEvaluationRequest,
  StopTelemetryEvaluationResponse,
  StopTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTelemetryEvaluationRequest,
  output: StopTelemetryEvaluationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluation",
}));

export type StopTelemetryEvaluationForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action offboards the Organization of the caller Amazon Web Services account from the telemetry config feature.
 */
export const stopTelemetryEvaluationForOrganization: API.OperationMethod<
  StopTelemetryEvaluationForOrganizationRequest,
  StopTelemetryEvaluationForOrganizationResponse,
  StopTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTelemetryEvaluationForOrganizationRequest,
  output: StopTelemetryEvaluationForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluationForOrganization",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Tests a pipeline configuration with sample records to validate data processing before deployment. This operation helps ensure your pipeline configuration works as expected.
 */
export const testTelemetryPipeline: API.OperationMethod<
  TestTelemetryPipelineInput,
  TestTelemetryPipelineOutput,
  TestTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestTelemetryPipelineInput,
  output: TestTelemetryPipelineOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTelemetryPipeline",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing centralization rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const updateCentralizationRuleForOrganization: API.OperationMethod<
  UpdateCentralizationRuleForOrganizationInput,
  UpdateCentralizationRuleForOrganizationOutput,
  UpdateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCentralizationRuleForOrganizationInput,
  output: UpdateCentralizationRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCentralizationRuleForOrganization",
}));

export type UpdateTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing telemetry pipeline.
 *
 * The following attributes cannot be updated after pipeline creation:
 *
 * - **Pipeline name** - The pipeline name is immutable
 *
 * - **Pipeline ARN** - The ARN is automatically generated and cannot be changed
 *
 * - **Source type** - Once a pipeline is created with a specific source type (such as S3, CloudWatch Logs, GitHub, or third-party sources), it cannot be changed to a different source type
 *
 * Processors can be added, removed, or modified. However, some processors are not supported for third-party pipelines and cannot be added through updates.
 *
 * **Source-Specific Update Rules**
 *
 * ### CloudWatch Logs Sources (Vended and Custom)
 *
 * **Updatable:** `sts_role_arn`
 *
 * **Fixed:** `data_source_name`, `data_source_type`, sink (must remain `@original`)
 *
 * ### S3 Sources (Crowdstrike, Zscaler, SentinelOne, Custom)
 *
 * **Updatable:** All SQS configuration parameters, `sts_role_arn`, codec settings, compression type, bucket ownership settings, sink log group
 *
 * **Fixed:** `notification_type`, `aws.region`
 *
 * ### GitHub Audit Logs
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `scope` (can switch between ORGANIZATION/ENTERPRISE), `organization` or `enterprise` name, `range`, authentication credentials (PAT or GitHub App)
 *
 * ### Microsoft Sources (Entra ID, Office365, Windows)
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `tenant_id`, `workspace_id` (Windows only), OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Okta Sources (SSO, Auth0)
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `domain`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Palo Alto Networks
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `hostname`, basic authentication credentials (`username`, `password`)
 *
 * ### ServiceNow CMDB
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `instance_url`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Wiz CNAPP
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `region`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 */
export const updateTelemetryPipeline: API.OperationMethod<
  UpdateTelemetryPipelineInput,
  UpdateTelemetryPipelineOutput,
  UpdateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTelemetryPipelineInput,
  output: UpdateTelemetryPipelineOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryPipeline",
}));

export type UpdateTelemetryRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing telemetry rule in your account. If multiple users attempt to modify the same telemetry rule simultaneously, a ConflictException is returned to provide specific error information for concurrent modification scenarios.
 */
export const updateTelemetryRule: API.OperationMethod<
  UpdateTelemetryRuleInput,
  UpdateTelemetryRuleOutput,
  UpdateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTelemetryRuleInput,
  output: UpdateTelemetryRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRule",
}));

export type UpdateTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing telemetry rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const updateTelemetryRuleForOrganization: API.OperationMethod<
  UpdateTelemetryRuleForOrganizationInput,
  UpdateTelemetryRuleForOrganizationOutput,
  UpdateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTelemetryRuleForOrganizationInput,
  output: UpdateTelemetryRuleForOrganizationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRuleForOrganization",
}));

export type ValidateTelemetryPipelineConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Validates a pipeline configuration without creating the pipeline. This operation checks the configuration for syntax errors and compatibility issues.
 */
export const validateTelemetryPipelineConfiguration: API.OperationMethod<
  ValidateTelemetryPipelineConfigurationInput,
  ValidateTelemetryPipelineConfigurationOutput,
  ValidateTelemetryPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateTelemetryPipelineConfigurationInput,
  output: ValidateTelemetryPipelineConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTelemetryPipelineConfiguration",
}));
