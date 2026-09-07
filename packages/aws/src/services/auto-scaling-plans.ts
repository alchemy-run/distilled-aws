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
  sdkId: "Auto Scaling Plans",
  serviceShapeName: "AnyScaleScalingPlannerFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "autoscaling-plans" });
const ver = T.ServiceVersion("2018-01-06");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://autoscaling-plans-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://autoscaling-plans.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://autoscaling-plans.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://autoscaling-plans-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConcurrentUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentUpdateException>()(
    "ConcurrentUpdateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentUpdateException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InternalServiceException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidNextTokenException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "LimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ObjectNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ObjectNotFoundException>()(
    "ObjectNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ObjectNotFoundException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ScalingPlanName = string;
export type XmlString = string;
export type XmlStringMaxLen128 = string;
export type XmlStringMaxLen256 = string;
export type TagValues = string[];
export const TagValues = /*@__PURE__*/ S.Array(S.String);
export interface TagFilter {
  Key?: string;
  Values?: string[];
}
export const TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Values: S.optional(TagValues) }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type TagFilters = TagFilter[];
export const TagFilters = /*@__PURE__*/ S.Array(TagFilter);
export interface ApplicationSource {
  CloudFormationStackARN?: string;
  TagFilters?: TagFilter[];
}
export const ApplicationSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudFormationStackARN: S.optional(S.String),
    TagFilters: S.optional(TagFilters),
  }),
).annotate({
  identifier: "ApplicationSource",
}) as any as S.Schema<ApplicationSource>;
export type ServiceNamespace =
  | "autoscaling"
  | "ecs"
  | "ec2"
  | "rds"
  | "dynamodb"
  | (string & {});
export const ServiceNamespace = /*@__PURE__*/ S.String;

export type ResourceIdMaxLen1600 = string;
export type ScalableDimension =
  | "autoscaling:autoScalingGroup:DesiredCapacity"
  | "ecs:service:DesiredCount"
  | "ec2:spot-fleet-request:TargetCapacity"
  | "rds:cluster:ReadReplicaCount"
  | "dynamodb:table:ReadCapacityUnits"
  | "dynamodb:table:WriteCapacityUnits"
  | "dynamodb:index:ReadCapacityUnits"
  | "dynamodb:index:WriteCapacityUnits"
  | (string & {});
export const ScalableDimension = /*@__PURE__*/ S.String;

export type ResourceCapacity = number;
export type ScalingMetricType =
  | "ASGAverageCPUUtilization"
  | "ASGAverageNetworkIn"
  | "ASGAverageNetworkOut"
  | "DynamoDBReadCapacityUtilization"
  | "DynamoDBWriteCapacityUtilization"
  | "ECSServiceAverageCPUUtilization"
  | "ECSServiceAverageMemoryUtilization"
  | "ALBRequestCountPerTarget"
  | "RDSReaderAverageCPUUtilization"
  | "RDSReaderAverageDatabaseConnections"
  | "EC2SpotFleetRequestAverageCPUUtilization"
  | "EC2SpotFleetRequestAverageNetworkIn"
  | "EC2SpotFleetRequestAverageNetworkOut"
  | (string & {});
export const ScalingMetricType = /*@__PURE__*/ S.String;

export type ResourceLabel = string;
export interface PredefinedScalingMetricSpecification {
  PredefinedScalingMetricType: ScalingMetricType;
  ResourceLabel?: string;
}
export const PredefinedScalingMetricSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PredefinedScalingMetricType: ScalingMetricType,
      ResourceLabel: S.optional(S.String),
    }),
).annotate({
  identifier: "PredefinedScalingMetricSpecification",
}) as any as S.Schema<PredefinedScalingMetricSpecification>;
export type MetricName = string;
export type MetricNamespace = string;
export type MetricDimensionName = string;
export type MetricDimensionValue = string;
export interface MetricDimension {
  Name: string;
  Value: string;
}
export const MetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "MetricDimension",
}) as any as S.Schema<MetricDimension>;
export type MetricDimensions = MetricDimension[];
export const MetricDimensions = /*@__PURE__*/ S.Array(MetricDimension);
export type MetricStatistic =
  | "Average"
  | "Minimum"
  | "Maximum"
  | "SampleCount"
  | "Sum"
  | (string & {});
export const MetricStatistic = /*@__PURE__*/ S.String;

export type MetricUnit = string;
export interface CustomizedScalingMetricSpecification {
  MetricName: string;
  Namespace: string;
  Dimensions?: MetricDimension[];
  Statistic: MetricStatistic;
  Unit?: string;
}
export const CustomizedScalingMetricSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MetricName: S.String,
      Namespace: S.String,
      Dimensions: S.optional(MetricDimensions),
      Statistic: MetricStatistic,
      Unit: S.optional(S.String),
    }),
).annotate({
  identifier: "CustomizedScalingMetricSpecification",
}) as any as S.Schema<CustomizedScalingMetricSpecification>;
export type MetricScale = number;
export type DisableScaleIn = boolean;
export type Cooldown = number;
export interface TargetTrackingConfiguration {
  PredefinedScalingMetricSpecification?: PredefinedScalingMetricSpecification;
  CustomizedScalingMetricSpecification?: CustomizedScalingMetricSpecification;
  TargetValue: number;
  DisableScaleIn?: boolean;
  ScaleOutCooldown?: number;
  ScaleInCooldown?: number;
  EstimatedInstanceWarmup?: number;
}
export const TargetTrackingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredefinedScalingMetricSpecification: S.optional(
      PredefinedScalingMetricSpecification,
    ),
    CustomizedScalingMetricSpecification: S.optional(
      CustomizedScalingMetricSpecification,
    ),
    TargetValue: S.Number,
    DisableScaleIn: S.optional(S.Boolean),
    ScaleOutCooldown: S.optional(S.Number),
    ScaleInCooldown: S.optional(S.Number),
    EstimatedInstanceWarmup: S.optional(S.Number),
  }),
).annotate({
  identifier: "TargetTrackingConfiguration",
}) as any as S.Schema<TargetTrackingConfiguration>;
export type TargetTrackingConfigurations = TargetTrackingConfiguration[];
export const TargetTrackingConfigurations = /*@__PURE__*/ S.Array(
  TargetTrackingConfiguration,
);
export type LoadMetricType =
  | "ASGTotalCPUUtilization"
  | "ASGTotalNetworkIn"
  | "ASGTotalNetworkOut"
  | "ALBTargetGroupRequestCount"
  | (string & {});
export const LoadMetricType = /*@__PURE__*/ S.String;

export interface PredefinedLoadMetricSpecification {
  PredefinedLoadMetricType: LoadMetricType;
  ResourceLabel?: string;
}
export const PredefinedLoadMetricSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredefinedLoadMetricType: LoadMetricType,
    ResourceLabel: S.optional(S.String),
  }),
).annotate({
  identifier: "PredefinedLoadMetricSpecification",
}) as any as S.Schema<PredefinedLoadMetricSpecification>;
export interface CustomizedLoadMetricSpecification {
  MetricName: string;
  Namespace: string;
  Dimensions?: MetricDimension[];
  Statistic: MetricStatistic;
  Unit?: string;
}
export const CustomizedLoadMetricSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.String,
    Namespace: S.String,
    Dimensions: S.optional(MetricDimensions),
    Statistic: MetricStatistic,
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomizedLoadMetricSpecification",
}) as any as S.Schema<CustomizedLoadMetricSpecification>;
export type ScheduledActionBufferTime = number;
export type PredictiveScalingMaxCapacityBehavior =
  | "SetForecastCapacityToMaxCapacity"
  | "SetMaxCapacityToForecastCapacity"
  | "SetMaxCapacityAboveForecastCapacity"
  | (string & {});
export const PredictiveScalingMaxCapacityBehavior = /*@__PURE__*/ S.String;

export type PredictiveScalingMode =
  | "ForecastAndScale"
  | "ForecastOnly"
  | (string & {});
export const PredictiveScalingMode = /*@__PURE__*/ S.String;

export type ScalingPolicyUpdateBehavior =
  | "KeepExternalPolicies"
  | "ReplaceExternalPolicies"
  | (string & {});
export const ScalingPolicyUpdateBehavior = /*@__PURE__*/ S.String;

export type DisableDynamicScaling = boolean;
export interface ScalingInstruction {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity: number;
  MaxCapacity: number;
  TargetTrackingConfigurations: TargetTrackingConfiguration[];
  PredefinedLoadMetricSpecification?: PredefinedLoadMetricSpecification;
  CustomizedLoadMetricSpecification?: CustomizedLoadMetricSpecification;
  ScheduledActionBufferTime?: number;
  PredictiveScalingMaxCapacityBehavior?: PredictiveScalingMaxCapacityBehavior;
  PredictiveScalingMaxCapacityBuffer?: number;
  PredictiveScalingMode?: PredictiveScalingMode;
  ScalingPolicyUpdateBehavior?: ScalingPolicyUpdateBehavior;
  DisableDynamicScaling?: boolean;
}
export const ScalingInstruction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    MinCapacity: S.Number,
    MaxCapacity: S.Number,
    TargetTrackingConfigurations: TargetTrackingConfigurations,
    PredefinedLoadMetricSpecification: S.optional(
      PredefinedLoadMetricSpecification,
    ),
    CustomizedLoadMetricSpecification: S.optional(
      CustomizedLoadMetricSpecification,
    ),
    ScheduledActionBufferTime: S.optional(S.Number),
    PredictiveScalingMaxCapacityBehavior: S.optional(
      PredictiveScalingMaxCapacityBehavior,
    ),
    PredictiveScalingMaxCapacityBuffer: S.optional(S.Number),
    PredictiveScalingMode: S.optional(PredictiveScalingMode),
    ScalingPolicyUpdateBehavior: S.optional(ScalingPolicyUpdateBehavior),
    DisableDynamicScaling: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ScalingInstruction",
}) as any as S.Schema<ScalingInstruction>;
export type ScalingInstructions = ScalingInstruction[];
export const ScalingInstructions = /*@__PURE__*/ S.Array(ScalingInstruction);
export interface CreateScalingPlanRequest {
  ScalingPlanName: string;
  ApplicationSource: ApplicationSource;
  ScalingInstructions: ScalingInstruction[];
}
export const CreateScalingPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanName: S.String,
    ApplicationSource: ApplicationSource,
    ScalingInstructions: ScalingInstructions,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateScalingPlanRequest",
}) as any as S.Schema<CreateScalingPlanRequest>;
export type ScalingPlanVersion = number;
export interface CreateScalingPlanResponse {
  ScalingPlanVersion: number;
}
export const CreateScalingPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScalingPlanVersion: S.Number }),
).annotate({
  identifier: "CreateScalingPlanResponse",
}) as any as S.Schema<CreateScalingPlanResponse>;
export interface DeleteScalingPlanRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
}
export const DeleteScalingPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScalingPlanName: S.String, ScalingPlanVersion: S.Number }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteScalingPlanRequest",
}) as any as S.Schema<DeleteScalingPlanRequest>;
export interface DeleteScalingPlanResponse {}
export const DeleteScalingPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScalingPlanResponse",
}) as any as S.Schema<DeleteScalingPlanResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface DescribeScalingPlanResourcesRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScalingPlanResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanName: S.String,
    ScalingPlanVersion: S.Number,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScalingPlanResourcesRequest",
}) as any as S.Schema<DescribeScalingPlanResourcesRequest>;
export type PolicyName = string;
export type PolicyType = "TargetTrackingScaling" | (string & {});
export const PolicyType = /*@__PURE__*/ S.String;

export interface ScalingPolicy {
  PolicyName: string;
  PolicyType: PolicyType;
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
}
export const ScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    PolicyType: PolicyType,
    TargetTrackingConfiguration: S.optional(TargetTrackingConfiguration),
  }),
).annotate({ identifier: "ScalingPolicy" }) as any as S.Schema<ScalingPolicy>;
export type ScalingPolicies = ScalingPolicy[];
export const ScalingPolicies = /*@__PURE__*/ S.Array(ScalingPolicy);
export type ScalingStatusCode =
  | "Inactive"
  | "PartiallyActive"
  | "Active"
  | (string & {});
export const ScalingStatusCode = /*@__PURE__*/ S.String;

export interface ScalingPlanResource {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  ScalingPolicies?: ScalingPolicy[];
  ScalingStatusCode: ScalingStatusCode;
  ScalingStatusMessage?: string;
}
export const ScalingPlanResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanName: S.String,
    ScalingPlanVersion: S.Number,
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    ScalingPolicies: S.optional(ScalingPolicies),
    ScalingStatusCode: ScalingStatusCode,
    ScalingStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ScalingPlanResource",
}) as any as S.Schema<ScalingPlanResource>;
export type ScalingPlanResources = ScalingPlanResource[];
export const ScalingPlanResources = /*@__PURE__*/ S.Array(ScalingPlanResource);
export interface DescribeScalingPlanResourcesResponse {
  ScalingPlanResources?: ScalingPlanResource[];
  NextToken?: string;
}
export const DescribeScalingPlanResourcesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ScalingPlanResources: S.optional(ScalingPlanResources),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeScalingPlanResourcesResponse",
}) as any as S.Schema<DescribeScalingPlanResourcesResponse>;
export type ScalingPlanNames = string[];
export const ScalingPlanNames = /*@__PURE__*/ S.Array(S.String);
export type ApplicationSources = ApplicationSource[];
export const ApplicationSources = /*@__PURE__*/ S.Array(ApplicationSource);
export interface DescribeScalingPlansRequest {
  ScalingPlanNames?: string[];
  ScalingPlanVersion?: number;
  ApplicationSources?: ApplicationSource[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScalingPlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanNames: S.optional(ScalingPlanNames),
    ScalingPlanVersion: S.optional(S.Number),
    ApplicationSources: S.optional(ApplicationSources),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScalingPlansRequest",
}) as any as S.Schema<DescribeScalingPlansRequest>;
export type ScalingPlanStatusCode =
  | "Active"
  | "ActiveWithProblems"
  | "CreationInProgress"
  | "CreationFailed"
  | "DeletionInProgress"
  | "DeletionFailed"
  | "UpdateInProgress"
  | "UpdateFailed"
  | (string & {});
export const ScalingPlanStatusCode = /*@__PURE__*/ S.String;

export interface ScalingPlan {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ApplicationSource: ApplicationSource;
  ScalingInstructions: ScalingInstruction[];
  StatusCode: ScalingPlanStatusCode;
  StatusMessage?: string;
  StatusStartTime?: Date;
  CreationTime?: Date;
}
export const ScalingPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanName: S.String,
    ScalingPlanVersion: S.Number,
    ApplicationSource: ApplicationSource,
    ScalingInstructions: ScalingInstructions,
    StatusCode: ScalingPlanStatusCode,
    StatusMessage: S.optional(S.String),
    StatusStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ScalingPlan" }) as any as S.Schema<ScalingPlan>;
export type ScalingPlans = ScalingPlan[];
export const ScalingPlans = /*@__PURE__*/ S.Array(ScalingPlan);
export interface DescribeScalingPlansResponse {
  ScalingPlans?: ScalingPlan[];
  NextToken?: string;
}
export const DescribeScalingPlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlans: S.optional(ScalingPlans),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScalingPlansResponse",
}) as any as S.Schema<DescribeScalingPlansResponse>;
export type ForecastDataType =
  | "CapacityForecast"
  | "LoadForecast"
  | "ScheduledActionMinCapacity"
  | "ScheduledActionMaxCapacity"
  | (string & {});
export const ForecastDataType = /*@__PURE__*/ S.String;

export interface GetScalingPlanResourceForecastDataRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  ForecastDataType: ForecastDataType;
  StartTime: Date;
  EndTime: Date;
}
export const GetScalingPlanResourceForecastDataRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ScalingPlanName: S.String,
      ScalingPlanVersion: S.Number,
      ServiceNamespace: ServiceNamespace,
      ResourceId: S.String,
      ScalableDimension: ScalableDimension,
      ForecastDataType: ForecastDataType,
      StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetScalingPlanResourceForecastDataRequest",
  }) as any as S.Schema<GetScalingPlanResourceForecastDataRequest>;
export interface Datapoint {
  Timestamp?: Date;
  Value?: number;
}
export const Datapoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Value: S.optional(S.Number),
  }),
).annotate({ identifier: "Datapoint" }) as any as S.Schema<Datapoint>;
export type Datapoints = Datapoint[];
export const Datapoints = /*@__PURE__*/ S.Array(Datapoint);
export interface GetScalingPlanResourceForecastDataResponse {
  Datapoints: Datapoint[];
}
export const GetScalingPlanResourceForecastDataResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({ Datapoints: Datapoints })).annotate({
    identifier: "GetScalingPlanResourceForecastDataResponse",
  }) as any as S.Schema<GetScalingPlanResourceForecastDataResponse>;
export interface UpdateScalingPlanRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ApplicationSource?: ApplicationSource;
  ScalingInstructions?: ScalingInstruction[];
}
export const UpdateScalingPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPlanName: S.String,
    ScalingPlanVersion: S.Number,
    ApplicationSource: S.optional(ApplicationSource),
    ScalingInstructions: S.optional(ScalingInstructions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateScalingPlanRequest",
}) as any as S.Schema<UpdateScalingPlanRequest>;
export interface UpdateScalingPlanResponse {}
export const UpdateScalingPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateScalingPlanResponse",
}) as any as S.Schema<UpdateScalingPlanResponse>;
export type ErrorMessage = string;
export type CreateScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scaling plan.
 */
export const createScalingPlan: API.OperationMethod<
  CreateScalingPlanRequest,
  CreateScalingPlanResponse,
  CreateScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScalingPlanRequest,
  output: CreateScalingPlanResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScalingPlan",
}));

export type DeleteScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scaling plan.
 *
 * Deleting a scaling plan deletes the underlying ScalingInstruction for
 * all of the scalable resources that are covered by the plan.
 *
 * If the plan has launched resources or has scaling activities in progress, you must
 * delete those resources separately.
 */
export const deleteScalingPlan: API.OperationMethod<
  DeleteScalingPlanRequest,
  DeleteScalingPlanResponse,
  DeleteScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScalingPlanRequest,
  output: DeleteScalingPlanResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPlan",
}));

export type DescribeScalingPlanResourcesError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the scalable resources in the specified scaling plan.
 */
export const describeScalingPlanResources: API.OperationMethod<
  DescribeScalingPlanResourcesRequest,
  DescribeScalingPlanResourcesResponse,
  DescribeScalingPlanResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScalingPlanResourcesRequest,
  output: DescribeScalingPlanResourcesResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPlanResources",
}));

export type DescribeScalingPlansError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes one or more of your scaling plans.
 */
export const describeScalingPlans: API.OperationMethod<
  DescribeScalingPlansRequest,
  DescribeScalingPlansResponse,
  DescribeScalingPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScalingPlansRequest,
  output: DescribeScalingPlansResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPlans",
}));

export type GetScalingPlanResourceForecastDataError =
  | InternalServiceException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the forecast data for a scalable resource.
 *
 * Capacity forecasts are represented as predicted values, or data points, that are
 * calculated using historical data points from a specified CloudWatch load metric. Data points are
 * available for up to 56 days.
 */
export const getScalingPlanResourceForecastData: API.OperationMethod<
  GetScalingPlanResourceForecastDataRequest,
  GetScalingPlanResourceForecastDataResponse,
  GetScalingPlanResourceForecastDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetScalingPlanResourceForecastDataRequest,
  output: GetScalingPlanResourceForecastDataResponse,
  errors: [InternalServiceException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScalingPlanResourceForecastData",
}));

export type UpdateScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified scaling plan.
 *
 * You cannot update a scaling plan if it is in the process of being created, updated, or
 * deleted.
 */
export const updateScalingPlan: API.OperationMethod<
  UpdateScalingPlanRequest,
  UpdateScalingPlanResponse,
  UpdateScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScalingPlanRequest,
  output: UpdateScalingPlanResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScalingPlan",
}));
