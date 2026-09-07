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
  sdkId: "Application Auto Scaling",
  serviceShapeName: "AnyScaleFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "application-autoscaling" });
const ver = T.ServiceVersion("2016-02-06");
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
              `https://application-autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(
                `https://application-autoscaling.${Region}.amazonaws.com`,
              );
            }
            return e(
              `https://application-autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class FailedResourceAccessException
  extends /*@__PURE__*/ S.TaggedError<FailedResourceAccessException>()(
    "FailedResourceAccessException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "FailedResourceAccessException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export class PredictiveScalingForecastNotSupported
  extends /*@__PURE__*/ S.TaggedError<PredictiveScalingForecastNotSupported>()(
    "PredictiveScalingForecastNotSupported",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "GetPredictiveScalingForecast is not supported" },
    }),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
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
export type ResourceIdMaxLen1600 = string;
export type ServiceNamespace =
  | "ecs"
  | "elasticmapreduce"
  | "ec2"
  | "appstream"
  | "dynamodb"
  | "rds"
  | "sagemaker"
  | "custom-resource"
  | "comprehend"
  | "lambda"
  | "cassandra"
  | "kafka"
  | "elasticache"
  | "neptune"
  | "workspaces"
  | (string & {});
export const ServiceNamespace = /*@__PURE__*/ S.String;

export type ScalableDimension =
  | "ecs:service:DesiredCount"
  | "ec2:spot-fleet-request:TargetCapacity"
  | "elasticmapreduce:instancegroup:InstanceCount"
  | "appstream:fleet:DesiredCapacity"
  | "dynamodb:table:ReadCapacityUnits"
  | "dynamodb:table:WriteCapacityUnits"
  | "dynamodb:index:ReadCapacityUnits"
  | "dynamodb:index:WriteCapacityUnits"
  | "rds:cluster:ReadReplicaCount"
  | "sagemaker:variant:DesiredInstanceCount"
  | "custom-resource:ResourceType:Property"
  | "comprehend:document-classifier-endpoint:DesiredInferenceUnits"
  | "comprehend:entity-recognizer-endpoint:DesiredInferenceUnits"
  | "lambda:function:ProvisionedConcurrency"
  | "cassandra:table:ReadCapacityUnits"
  | "cassandra:table:WriteCapacityUnits"
  | "kafka:broker-storage:VolumeSize"
  | "elasticache:cache-cluster:Nodes"
  | "elasticache:replication-group:NodeGroups"
  | "elasticache:replication-group:Replicas"
  | "neptune:cluster:ReadReplicaCount"
  | "sagemaker:variant:DesiredProvisionedConcurrency"
  | "sagemaker:inference-component:DesiredCopyCount"
  | "workspaces:workspacespool:DesiredUserSessions"
  | (string & {});
export const ScalableDimension = /*@__PURE__*/ S.String;

export interface DeleteScalingPolicyRequest {
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export const DeleteScalingPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteScalingPolicyRequest",
}) as any as S.Schema<DeleteScalingPolicyRequest>;
export interface DeleteScalingPolicyResponse {}
export const DeleteScalingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScalingPolicyResponse",
}) as any as S.Schema<DeleteScalingPolicyResponse>;
export interface DeleteScheduledActionRequest {
  ServiceNamespace: ServiceNamespace;
  ScheduledActionName: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export const DeleteScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ScheduledActionName: S.String,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteScheduledActionRequest",
}) as any as S.Schema<DeleteScheduledActionRequest>;
export interface DeleteScheduledActionResponse {}
export const DeleteScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScheduledActionResponse",
}) as any as S.Schema<DeleteScheduledActionResponse>;
export interface DeregisterScalableTargetRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export const DeregisterScalableTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeregisterScalableTargetRequest",
}) as any as S.Schema<DeregisterScalableTargetRequest>;
export interface DeregisterScalableTargetResponse {}
export const DeregisterScalableTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterScalableTargetResponse",
}) as any as S.Schema<DeregisterScalableTargetResponse>;
export type ResourceIdsMaxLen1600 = string[];
export const ResourceIdsMaxLen1600 = /*@__PURE__*/ S.Array(S.String);
export type MaxResults = number;
export type XmlString = string;
export interface DescribeScalableTargetsRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceIds?: string[];
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScalableTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceIds: S.optional(ResourceIdsMaxLen1600),
    ScalableDimension: S.optional(ScalableDimension),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScalableTargetsRequest",
}) as any as S.Schema<DescribeScalableTargetsRequest>;
export type ResourceCapacity = number;
export type ScalingSuspended = boolean;
export interface SuspendedState {
  DynamicScalingInSuspended?: boolean;
  DynamicScalingOutSuspended?: boolean;
  ScheduledScalingSuspended?: boolean;
}
export const SuspendedState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamicScalingInSuspended: S.optional(S.Boolean),
    DynamicScalingOutSuspended: S.optional(S.Boolean),
    ScheduledScalingSuspended: S.optional(S.Boolean),
  }),
).annotate({ identifier: "SuspendedState" }) as any as S.Schema<SuspendedState>;
export interface ScalableTarget {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity: number;
  MaxCapacity: number;
  PredictedCapacity?: number;
  RoleARN: string;
  CreationTime: Date;
  SuspendedState?: SuspendedState;
  ScalableTargetARN?: string;
}
export const ScalableTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    MinCapacity: S.Number,
    MaxCapacity: S.Number,
    PredictedCapacity: S.optional(S.Number),
    RoleARN: S.String,
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SuspendedState: S.optional(SuspendedState),
    ScalableTargetARN: S.optional(S.String),
  }),
).annotate({ identifier: "ScalableTarget" }) as any as S.Schema<ScalableTarget>;
export type ScalableTargets = ScalableTarget[];
export const ScalableTargets = /*@__PURE__*/ S.Array(ScalableTarget);
export interface DescribeScalableTargetsResponse {
  ScalableTargets?: ScalableTarget[];
  NextToken?: string;
}
export const DescribeScalableTargetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalableTargets: S.optional(ScalableTargets),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScalableTargetsResponse",
}) as any as S.Schema<DescribeScalableTargetsResponse>;
export type IncludeNotScaledActivities = boolean;
export interface DescribeScalingActivitiesRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
  IncludeNotScaledActivities?: boolean;
}
export const DescribeScalingActivitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.optional(S.String),
    ScalableDimension: S.optional(ScalableDimension),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeNotScaledActivities: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScalingActivitiesRequest",
}) as any as S.Schema<DescribeScalingActivitiesRequest>;
export type ResourceId = string;
export type ScalingActivityStatusCode =
  | "Pending"
  | "InProgress"
  | "Successful"
  | "Overridden"
  | "Unfulfilled"
  | "Failed"
  | (string & {});
export const ScalingActivityStatusCode = /*@__PURE__*/ S.String;

export interface NotScaledReason {
  Code: string;
  MaxCapacity?: number;
  MinCapacity?: number;
  CurrentCapacity?: number;
}
export const NotScaledReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.String,
    MaxCapacity: S.optional(S.Number),
    MinCapacity: S.optional(S.Number),
    CurrentCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "NotScaledReason",
}) as any as S.Schema<NotScaledReason>;
export type NotScaledReasons = NotScaledReason[];
export const NotScaledReasons = /*@__PURE__*/ S.Array(NotScaledReason);
export interface ScalingActivity {
  ActivityId: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  Description: string;
  Cause: string;
  StartTime: Date;
  EndTime?: Date;
  StatusCode: ScalingActivityStatusCode;
  StatusMessage?: string;
  Details?: string;
  NotScaledReasons?: NotScaledReason[];
}
export const ScalingActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivityId: S.String,
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    Description: S.String,
    Cause: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StatusCode: ScalingActivityStatusCode,
    StatusMessage: S.optional(S.String),
    Details: S.optional(S.String),
    NotScaledReasons: S.optional(NotScaledReasons),
  }),
).annotate({
  identifier: "ScalingActivity",
}) as any as S.Schema<ScalingActivity>;
export type ScalingActivities = ScalingActivity[];
export const ScalingActivities = /*@__PURE__*/ S.Array(ScalingActivity);
export interface DescribeScalingActivitiesResponse {
  ScalingActivities?: ScalingActivity[];
  NextToken?: string;
}
export const DescribeScalingActivitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingActivities: S.optional(ScalingActivities),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScalingActivitiesResponse",
}) as any as S.Schema<DescribeScalingActivitiesResponse>;
export interface DescribeScalingPoliciesRequest {
  PolicyNames?: string[];
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScalingPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyNames: S.optional(ResourceIdsMaxLen1600),
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.optional(S.String),
    ScalableDimension: S.optional(ScalableDimension),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScalingPoliciesRequest",
}) as any as S.Schema<DescribeScalingPoliciesRequest>;
export type PolicyName = string;
export type PolicyType =
  | "StepScaling"
  | "TargetTrackingScaling"
  | "PredictiveScaling"
  | (string & {});
export const PolicyType = /*@__PURE__*/ S.String;

export type AdjustmentType =
  | "ChangeInCapacity"
  | "PercentChangeInCapacity"
  | "ExactCapacity"
  | (string & {});
export const AdjustmentType = /*@__PURE__*/ S.String;

export type MetricScale = number;
export type ScalingAdjustment = number;
export interface StepAdjustment {
  MetricIntervalLowerBound?: number;
  MetricIntervalUpperBound?: number;
  ScalingAdjustment: number;
}
export const StepAdjustment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricIntervalLowerBound: S.optional(S.Number),
    MetricIntervalUpperBound: S.optional(S.Number),
    ScalingAdjustment: S.Number,
  }),
).annotate({ identifier: "StepAdjustment" }) as any as S.Schema<StepAdjustment>;
export type StepAdjustments = StepAdjustment[];
export const StepAdjustments = /*@__PURE__*/ S.Array(StepAdjustment);
export type MinAdjustmentMagnitude = number;
export type Cooldown = number;
export type MetricAggregationType =
  | "Average"
  | "Minimum"
  | "Maximum"
  | (string & {});
export const MetricAggregationType = /*@__PURE__*/ S.String;

export interface StepScalingPolicyConfiguration {
  AdjustmentType?: AdjustmentType;
  StepAdjustments?: StepAdjustment[];
  MinAdjustmentMagnitude?: number;
  Cooldown?: number;
  MetricAggregationType?: MetricAggregationType;
}
export const StepScalingPolicyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdjustmentType: S.optional(AdjustmentType),
    StepAdjustments: S.optional(StepAdjustments),
    MinAdjustmentMagnitude: S.optional(S.Number),
    Cooldown: S.optional(S.Number),
    MetricAggregationType: S.optional(MetricAggregationType),
  }),
).annotate({
  identifier: "StepScalingPolicyConfiguration",
}) as any as S.Schema<StepScalingPolicyConfiguration>;
export type MetricType =
  | "DynamoDBReadCapacityUtilization"
  | "DynamoDBWriteCapacityUtilization"
  | "ALBRequestCountPerTarget"
  | "RDSReaderAverageCPUUtilization"
  | "RDSReaderAverageDatabaseConnections"
  | "EC2SpotFleetRequestAverageCPUUtilization"
  | "EC2SpotFleetRequestAverageNetworkIn"
  | "EC2SpotFleetRequestAverageNetworkOut"
  | "SageMakerVariantInvocationsPerInstance"
  | "ECSServiceAverageCPUUtilization"
  | "ECSServiceAverageMemoryUtilization"
  | "AppStreamAverageCapacityUtilization"
  | "ComprehendInferenceUtilization"
  | "LambdaProvisionedConcurrencyUtilization"
  | "CassandraReadCapacityUtilization"
  | "CassandraWriteCapacityUtilization"
  | "KafkaBrokerStorageUtilization"
  | "ElastiCacheEngineCPUUtilization"
  | "ElastiCacheDatabaseMemoryUsagePercentage"
  | "ElastiCachePrimaryEngineCPUUtilization"
  | "ElastiCacheReplicaEngineCPUUtilization"
  | "ElastiCacheDatabaseMemoryUsageCountedForEvictPercentage"
  | "NeptuneReaderAverageCPUUtilization"
  | "SageMakerVariantProvisionedConcurrencyUtilization"
  | "ElastiCacheDatabaseCapacityUsageCountedForEvictPercentage"
  | "SageMakerInferenceComponentInvocationsPerCopy"
  | "WorkSpacesAverageUserSessionsCapacityUtilization"
  | "SageMakerInferenceComponentConcurrentRequestsPerCopyHighResolution"
  | "SageMakerVariantConcurrentRequestsPerModelHighResolution"
  | "ECSServiceAverageCPUUtilizationHighResolution"
  | "ECSServiceAverageMemoryUtilizationHighResolution"
  | (string & {});
export const MetricType = /*@__PURE__*/ S.String;

export type ResourceLabel = string;
export interface PredefinedMetricSpecification {
  PredefinedMetricType: MetricType;
  ResourceLabel?: string;
}
export const PredefinedMetricSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredefinedMetricType: MetricType,
    ResourceLabel: S.optional(S.String),
  }),
).annotate({
  identifier: "PredefinedMetricSpecification",
}) as any as S.Schema<PredefinedMetricSpecification>;
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
export type Expression = string;
export type Id = string;
export type TargetTrackingMetricDimensionName = string;
export type TargetTrackingMetricDimensionValue = string;
export interface TargetTrackingMetricDimension {
  Name: string;
  Value: string;
}
export const TargetTrackingMetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "TargetTrackingMetricDimension",
}) as any as S.Schema<TargetTrackingMetricDimension>;
export type TargetTrackingMetricDimensions = TargetTrackingMetricDimension[];
export const TargetTrackingMetricDimensions = /*@__PURE__*/ S.Array(
  TargetTrackingMetricDimension,
);
export type TargetTrackingMetricName = string;
export type TargetTrackingMetricNamespace = string;
export interface TargetTrackingMetric {
  Dimensions?: TargetTrackingMetricDimension[];
  MetricName?: string;
  Namespace?: string;
}
export const TargetTrackingMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(TargetTrackingMetricDimensions),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetTrackingMetric",
}) as any as S.Schema<TargetTrackingMetric>;
export type TargetTrackingMetricUnit = string;
export interface TargetTrackingMetricStat {
  Metric: TargetTrackingMetric;
  Stat: string;
  Unit?: string;
}
export const TargetTrackingMetricStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: TargetTrackingMetric,
    Stat: S.String,
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetTrackingMetricStat",
}) as any as S.Schema<TargetTrackingMetricStat>;
export type ReturnData = boolean;
export interface TargetTrackingMetricDataQuery {
  Expression?: string;
  Id: string;
  Label?: string;
  MetricStat?: TargetTrackingMetricStat;
  ReturnData?: boolean;
}
export const TargetTrackingMetricDataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: S.optional(S.String),
    Id: S.String,
    Label: S.optional(S.String),
    MetricStat: S.optional(TargetTrackingMetricStat),
    ReturnData: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "TargetTrackingMetricDataQuery",
}) as any as S.Schema<TargetTrackingMetricDataQuery>;
export type TargetTrackingMetricDataQueries = TargetTrackingMetricDataQuery[];
export const TargetTrackingMetricDataQueries = /*@__PURE__*/ S.Array(
  TargetTrackingMetricDataQuery,
);
export interface CustomizedMetricSpecification {
  MetricName?: string;
  Namespace?: string;
  Dimensions?: MetricDimension[];
  Statistic?: MetricStatistic;
  Unit?: string;
  Metrics?: TargetTrackingMetricDataQuery[];
}
export const CustomizedMetricSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Dimensions: S.optional(MetricDimensions),
    Statistic: S.optional(MetricStatistic),
    Unit: S.optional(S.String),
    Metrics: S.optional(TargetTrackingMetricDataQueries),
  }),
).annotate({
  identifier: "CustomizedMetricSpecification",
}) as any as S.Schema<CustomizedMetricSpecification>;
export type DisableScaleIn = boolean;
export interface TargetTrackingScalingPolicyConfiguration {
  TargetValue: number;
  PredefinedMetricSpecification?: PredefinedMetricSpecification;
  CustomizedMetricSpecification?: CustomizedMetricSpecification;
  ScaleOutCooldown?: number;
  ScaleInCooldown?: number;
  DisableScaleIn?: boolean;
}
export const TargetTrackingScalingPolicyConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TargetValue: S.Number,
      PredefinedMetricSpecification: S.optional(PredefinedMetricSpecification),
      CustomizedMetricSpecification: S.optional(CustomizedMetricSpecification),
      ScaleOutCooldown: S.optional(S.Number),
      ScaleInCooldown: S.optional(S.Number),
      DisableScaleIn: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "TargetTrackingScalingPolicyConfiguration",
}) as any as S.Schema<TargetTrackingScalingPolicyConfiguration>;
export type PredictiveScalingMetricType = string;
export interface PredictiveScalingPredefinedMetricPairSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export const PredictiveScalingPredefinedMetricPairSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PredefinedMetricType: S.String,
      ResourceLabel: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PredictiveScalingPredefinedMetricPairSpecification",
  }) as any as S.Schema<PredictiveScalingPredefinedMetricPairSpecification>;
export interface PredictiveScalingPredefinedScalingMetricSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export const PredictiveScalingPredefinedScalingMetricSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PredefinedMetricType: S.String,
      ResourceLabel: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PredictiveScalingPredefinedScalingMetricSpecification",
  }) as any as S.Schema<PredictiveScalingPredefinedScalingMetricSpecification>;
export interface PredictiveScalingPredefinedLoadMetricSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export const PredictiveScalingPredefinedLoadMetricSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PredefinedMetricType: S.String,
      ResourceLabel: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PredictiveScalingPredefinedLoadMetricSpecification",
  }) as any as S.Schema<PredictiveScalingPredefinedLoadMetricSpecification>;
export type PredictiveScalingMetricDimensionName = string;
export type PredictiveScalingMetricDimensionValue = string;
export interface PredictiveScalingMetricDimension {
  Name: string;
  Value: string;
}
export const PredictiveScalingMetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "PredictiveScalingMetricDimension",
}) as any as S.Schema<PredictiveScalingMetricDimension>;
export type PredictiveScalingMetricDimensions =
  PredictiveScalingMetricDimension[];
export const PredictiveScalingMetricDimensions = /*@__PURE__*/ S.Array(
  PredictiveScalingMetricDimension,
);
export type PredictiveScalingMetricName = string;
export type PredictiveScalingMetricNamespace = string;
export interface PredictiveScalingMetric {
  Dimensions?: PredictiveScalingMetricDimension[];
  MetricName?: string;
  Namespace?: string;
}
export const PredictiveScalingMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(PredictiveScalingMetricDimensions),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
  }),
).annotate({
  identifier: "PredictiveScalingMetric",
}) as any as S.Schema<PredictiveScalingMetric>;
export type PredictiveScalingMetricUnit = string;
export interface PredictiveScalingMetricStat {
  Metric: PredictiveScalingMetric;
  Stat: string;
  Unit?: string;
}
export const PredictiveScalingMetricStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: PredictiveScalingMetric,
    Stat: S.String,
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "PredictiveScalingMetricStat",
}) as any as S.Schema<PredictiveScalingMetricStat>;
export interface PredictiveScalingMetricDataQuery {
  Id: string;
  Expression?: string;
  MetricStat?: PredictiveScalingMetricStat;
  Label?: string;
  ReturnData?: boolean;
}
export const PredictiveScalingMetricDataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Expression: S.optional(S.String),
    MetricStat: S.optional(PredictiveScalingMetricStat),
    Label: S.optional(S.String),
    ReturnData: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PredictiveScalingMetricDataQuery",
}) as any as S.Schema<PredictiveScalingMetricDataQuery>;
export type PredictiveScalingMetricDataQueries =
  PredictiveScalingMetricDataQuery[];
export const PredictiveScalingMetricDataQueries = /*@__PURE__*/ S.Array(
  PredictiveScalingMetricDataQuery,
);
export interface PredictiveScalingCustomizedMetricSpecification {
  MetricDataQueries: PredictiveScalingMetricDataQuery[];
}
export const PredictiveScalingCustomizedMetricSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MetricDataQueries: PredictiveScalingMetricDataQueries }),
  ).annotate({
    identifier: "PredictiveScalingCustomizedMetricSpecification",
  }) as any as S.Schema<PredictiveScalingCustomizedMetricSpecification>;
export interface PredictiveScalingMetricSpecification {
  TargetValue: number;
  PredefinedMetricPairSpecification?: PredictiveScalingPredefinedMetricPairSpecification;
  PredefinedScalingMetricSpecification?: PredictiveScalingPredefinedScalingMetricSpecification;
  PredefinedLoadMetricSpecification?: PredictiveScalingPredefinedLoadMetricSpecification;
  CustomizedScalingMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
  CustomizedLoadMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
  CustomizedCapacityMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
}
export const PredictiveScalingMetricSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TargetValue: S.Number,
      PredefinedMetricPairSpecification: S.optional(
        PredictiveScalingPredefinedMetricPairSpecification,
      ),
      PredefinedScalingMetricSpecification: S.optional(
        PredictiveScalingPredefinedScalingMetricSpecification,
      ),
      PredefinedLoadMetricSpecification: S.optional(
        PredictiveScalingPredefinedLoadMetricSpecification,
      ),
      CustomizedScalingMetricSpecification: S.optional(
        PredictiveScalingCustomizedMetricSpecification,
      ),
      CustomizedLoadMetricSpecification: S.optional(
        PredictiveScalingCustomizedMetricSpecification,
      ),
      CustomizedCapacityMetricSpecification: S.optional(
        PredictiveScalingCustomizedMetricSpecification,
      ),
    }),
).annotate({
  identifier: "PredictiveScalingMetricSpecification",
}) as any as S.Schema<PredictiveScalingMetricSpecification>;
export type PredictiveScalingMetricSpecifications =
  PredictiveScalingMetricSpecification[];
export const PredictiveScalingMetricSpecifications = /*@__PURE__*/ S.Array(
  PredictiveScalingMetricSpecification,
);
export type PredictiveScalingMode =
  | "ForecastOnly"
  | "ForecastAndScale"
  | (string & {});
export const PredictiveScalingMode = /*@__PURE__*/ S.String;

export type PredictiveScalingSchedulingBufferTime = number;
export type PredictiveScalingMaxCapacityBreachBehavior =
  | "HonorMaxCapacity"
  | "IncreaseMaxCapacity"
  | (string & {});
export const PredictiveScalingMaxCapacityBreachBehavior =
  /*@__PURE__*/ S.String;

export type PredictiveScalingMaxCapacityBuffer = number;
export interface PredictiveScalingPolicyConfiguration {
  MetricSpecifications: PredictiveScalingMetricSpecification[];
  Mode?: PredictiveScalingMode;
  SchedulingBufferTime?: number;
  MaxCapacityBreachBehavior?: PredictiveScalingMaxCapacityBreachBehavior;
  MaxCapacityBuffer?: number;
}
export const PredictiveScalingPolicyConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MetricSpecifications: PredictiveScalingMetricSpecifications,
      Mode: S.optional(PredictiveScalingMode),
      SchedulingBufferTime: S.optional(S.Number),
      MaxCapacityBreachBehavior: S.optional(
        PredictiveScalingMaxCapacityBreachBehavior,
      ),
      MaxCapacityBuffer: S.optional(S.Number),
    }),
).annotate({
  identifier: "PredictiveScalingPolicyConfiguration",
}) as any as S.Schema<PredictiveScalingPolicyConfiguration>;
export interface Alarm {
  AlarmName: string;
  AlarmARN: string;
}
export const Alarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmName: S.String, AlarmARN: S.String }),
).annotate({ identifier: "Alarm" }) as any as S.Schema<Alarm>;
export type Alarms = Alarm[];
export const Alarms = /*@__PURE__*/ S.Array(Alarm);
export interface ScalingPolicy {
  PolicyARN: string;
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyType: PolicyType;
  StepScalingPolicyConfiguration?: StepScalingPolicyConfiguration;
  TargetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
  PredictiveScalingPolicyConfiguration?: PredictiveScalingPolicyConfiguration;
  Alarms?: Alarm[];
  CreationTime: Date;
}
export const ScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyARN: S.String,
    PolicyName: S.String,
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    PolicyType: PolicyType,
    StepScalingPolicyConfiguration: S.optional(StepScalingPolicyConfiguration),
    TargetTrackingScalingPolicyConfiguration: S.optional(
      TargetTrackingScalingPolicyConfiguration,
    ),
    PredictiveScalingPolicyConfiguration: S.optional(
      PredictiveScalingPolicyConfiguration,
    ),
    Alarms: S.optional(Alarms),
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ScalingPolicy" }) as any as S.Schema<ScalingPolicy>;
export type ScalingPolicies = ScalingPolicy[];
export const ScalingPolicies = /*@__PURE__*/ S.Array(ScalingPolicy);
export interface DescribeScalingPoliciesResponse {
  ScalingPolicies?: ScalingPolicy[];
  NextToken?: string;
}
export const DescribeScalingPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalingPolicies: S.optional(ScalingPolicies),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScalingPoliciesResponse",
}) as any as S.Schema<DescribeScalingPoliciesResponse>;
export interface DescribeScheduledActionsRequest {
  ScheduledActionNames?: string[];
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScheduledActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionNames: S.optional(ResourceIdsMaxLen1600),
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.optional(S.String),
    ScalableDimension: S.optional(ScalableDimension),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScheduledActionsRequest",
}) as any as S.Schema<DescribeScheduledActionsRequest>;
export type ScheduledActionName = string;
export interface ScalableTargetAction {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export const ScalableTargetAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinCapacity: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScalableTargetAction",
}) as any as S.Schema<ScalableTargetAction>;
export interface ScheduledAction {
  ScheduledActionName: string;
  ScheduledActionARN: string;
  ServiceNamespace: ServiceNamespace;
  Schedule: string;
  Timezone?: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  StartTime?: Date;
  EndTime?: Date;
  ScalableTargetAction?: ScalableTargetAction;
  CreationTime: Date;
}
export const ScheduledAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionName: S.String,
    ScheduledActionARN: S.String,
    ServiceNamespace: ServiceNamespace,
    Schedule: S.String,
    Timezone: S.optional(S.String),
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScalableTargetAction: S.optional(ScalableTargetAction),
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ScheduledAction",
}) as any as S.Schema<ScheduledAction>;
export type ScheduledActions = ScheduledAction[];
export const ScheduledActions = /*@__PURE__*/ S.Array(ScheduledAction);
export interface DescribeScheduledActionsResponse {
  ScheduledActions?: ScheduledAction[];
  NextToken?: string;
}
export const DescribeScheduledActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActions: S.optional(ScheduledActions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScheduledActionsResponse",
}) as any as S.Schema<DescribeScheduledActionsResponse>;
export interface GetPredictiveScalingForecastRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyName: string;
  StartTime: Date;
  EndTime: Date;
}
export const GetPredictiveScalingForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    PolicyName: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPredictiveScalingForecastRequest",
}) as any as S.Schema<GetPredictiveScalingForecastRequest>;
export type PredictiveScalingForecastTimestamps = Date[];
export const PredictiveScalingForecastTimestamps = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type PredictiveScalingForecastValues = number[];
export const PredictiveScalingForecastValues = /*@__PURE__*/ S.Array(S.Number);
export interface LoadForecast {
  Timestamps: Date[];
  Values: number[];
  MetricSpecification: PredictiveScalingMetricSpecification;
}
export const LoadForecast = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamps: PredictiveScalingForecastTimestamps,
    Values: PredictiveScalingForecastValues,
    MetricSpecification: PredictiveScalingMetricSpecification,
  }),
).annotate({ identifier: "LoadForecast" }) as any as S.Schema<LoadForecast>;
export type LoadForecasts = LoadForecast[];
export const LoadForecasts = /*@__PURE__*/ S.Array(LoadForecast);
export interface CapacityForecast {
  Timestamps: Date[];
  Values: number[];
}
export const CapacityForecast = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamps: PredictiveScalingForecastTimestamps,
    Values: PredictiveScalingForecastValues,
  }),
).annotate({
  identifier: "CapacityForecast",
}) as any as S.Schema<CapacityForecast>;
export interface GetPredictiveScalingForecastResponse {
  LoadForecast?: LoadForecast[];
  CapacityForecast?: CapacityForecast;
  UpdateTime?: Date;
}
export const GetPredictiveScalingForecastResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LoadForecast: S.optional(LoadForecasts),
      CapacityForecast: S.optional(CapacityForecast),
      UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "GetPredictiveScalingForecastResponse",
}) as any as S.Schema<GetPredictiveScalingForecastResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutScalingPolicyRequest {
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyType?: PolicyType;
  StepScalingPolicyConfiguration?: StepScalingPolicyConfiguration;
  TargetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
  PredictiveScalingPolicyConfiguration?: PredictiveScalingPolicyConfiguration;
}
export const PutScalingPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    PolicyType: S.optional(PolicyType),
    StepScalingPolicyConfiguration: S.optional(StepScalingPolicyConfiguration),
    TargetTrackingScalingPolicyConfiguration: S.optional(
      TargetTrackingScalingPolicyConfiguration,
    ),
    PredictiveScalingPolicyConfiguration: S.optional(
      PredictiveScalingPolicyConfiguration,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutScalingPolicyRequest",
}) as any as S.Schema<PutScalingPolicyRequest>;
export interface PutScalingPolicyResponse {
  PolicyARN: string;
  Alarms?: Alarm[];
}
export const PutScalingPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyARN: S.String, Alarms: S.optional(Alarms) }),
).annotate({
  identifier: "PutScalingPolicyResponse",
}) as any as S.Schema<PutScalingPolicyResponse>;
export interface PutScheduledActionRequest {
  ServiceNamespace: ServiceNamespace;
  Schedule?: string;
  Timezone?: string;
  ScheduledActionName: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  StartTime?: Date;
  EndTime?: Date;
  ScalableTargetAction?: ScalableTargetAction;
}
export const PutScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    Schedule: S.optional(S.String),
    Timezone: S.optional(S.String),
    ScheduledActionName: S.String,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScalableTargetAction: S.optional(ScalableTargetAction),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutScheduledActionRequest",
}) as any as S.Schema<PutScheduledActionRequest>;
export interface PutScheduledActionResponse {}
export const PutScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutScheduledActionResponse",
}) as any as S.Schema<PutScheduledActionResponse>;
export interface RegisterScalableTargetRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity?: number;
  MaxCapacity?: number;
  RoleARN?: string;
  SuspendedState?: SuspendedState;
  Tags?: { [key: string]: string | undefined };
}
export const RegisterScalableTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceNamespace: ServiceNamespace,
    ResourceId: S.String,
    ScalableDimension: ScalableDimension,
    MinCapacity: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    RoleARN: S.optional(S.String),
    SuspendedState: S.optional(SuspendedState),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterScalableTargetRequest",
}) as any as S.Schema<RegisterScalableTargetRequest>;
export interface RegisterScalableTargetResponse {
  ScalableTargetARN?: string;
}
export const RegisterScalableTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScalableTargetARN: S.optional(S.String) }),
).annotate({
  identifier: "RegisterScalableTargetResponse",
}) as any as S.Schema<RegisterScalableTargetResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type ErrorMessage = string;
export type ExceptionMessage = string;
export type DeleteScalingPolicyError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scaling policy for an Application Auto Scaling scalable target.
 *
 * Deleting a step scaling policy deletes the underlying alarm action, but does not delete
 * the CloudWatch alarm associated with the scaling policy, even if it no longer has an associated
 * action.
 *
 * For more information, see Delete a step scaling policy and Delete a target tracking scaling policy in the
 * *Application Auto Scaling User Guide*.
 */
export const deleteScalingPolicy: API.OperationMethod<
  DeleteScalingPolicyRequest,
  DeleteScalingPolicyResponse,
  DeleteScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScalingPolicyRequest,
  output: DeleteScalingPolicyResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPolicy",
}));

export type DeleteScheduledActionError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scheduled action for an Application Auto Scaling scalable target.
 *
 * For more information, see Delete a scheduled action in the *Application Auto Scaling User Guide*.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionRequest,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduledActionRequest,
  output: DeleteScheduledActionResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeregisterScalableTargetError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters an Application Auto Scaling scalable target when you have finished using it. To see which
 * resources have been registered, use DescribeScalableTargets.
 *
 * Deregistering a scalable target deletes the scaling policies and the scheduled
 * actions that are associated with it.
 */
export const deregisterScalableTarget: API.OperationMethod<
  DeregisterScalableTargetRequest,
  DeregisterScalableTargetResponse,
  DeregisterScalableTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterScalableTargetRequest,
  output: DeregisterScalableTargetResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterScalableTarget",
}));

export type DescribeScalableTargetsError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the scalable targets in the specified namespace.
 *
 * You can filter the results using `ResourceIds` and
 * `ScalableDimension`.
 */
export const describeScalableTargets: API.PaginatedOperationMethod<
  DescribeScalableTargetsRequest,
  DescribeScalableTargetsResponse,
  DescribeScalableTargetsError,
  Credentials | HttpClient.HttpClient,
  ScalableTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScalableTargetsRequest,
  output: DescribeScalableTargetsResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalableTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalableTargets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScalingActivitiesError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Provides descriptive information about the scaling activities in the specified namespace
 * from the previous six weeks.
 *
 * You can filter the results using `ResourceId` and
 * `ScalableDimension`.
 *
 * For information about viewing scaling activities using the Amazon Web Services CLI, see Scaling activities for Application Auto Scaling.
 */
export const describeScalingActivities: API.PaginatedOperationMethod<
  DescribeScalingActivitiesRequest,
  DescribeScalingActivitiesResponse,
  DescribeScalingActivitiesError,
  Credentials | HttpClient.HttpClient,
  ScalingActivity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScalingActivitiesRequest,
  output: DescribeScalingActivitiesResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingActivities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingActivities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScalingPoliciesError =
  | ConcurrentUpdateException
  | FailedResourceAccessException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Application Auto Scaling scaling policies for the specified service namespace.
 *
 * You can filter the results using `ResourceId`,
 * `ScalableDimension`, and `PolicyNames`.
 *
 * For more information, see Target tracking scaling policies and Step scaling policies in the *Application Auto Scaling User Guide*.
 */
export const describeScalingPolicies: API.PaginatedOperationMethod<
  DescribeScalingPoliciesRequest,
  DescribeScalingPoliciesResponse,
  DescribeScalingPoliciesError,
  Credentials | HttpClient.HttpClient,
  ScalingPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScalingPoliciesRequest,
  output: DescribeScalingPoliciesResponse,
  errors: [
    ConcurrentUpdateException,
    FailedResourceAccessException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScheduledActionsError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Application Auto Scaling scheduled actions for the specified service namespace.
 *
 * You can filter the results using the `ResourceId`,
 * `ScalableDimension`, and `ScheduledActionNames` parameters.
 *
 * For more information, see Scheduled scaling in the *Application Auto Scaling User Guide*.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsRequest,
  DescribeScheduledActionsResponse,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScheduledActionsRequest,
  output: DescribeScheduledActionsResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPredictiveScalingForecastError =
  | InternalServiceException
  | ValidationException
  | PredictiveScalingForecastNotSupported
  | CommonErrors;
/**
 * Retrieves the forecast data for a predictive scaling policy.
 *
 * Load forecasts are predictions of the hourly load values using historical load data
 * from CloudWatch and an analysis of historical trends. Capacity forecasts are represented as
 * predicted values for the minimum capacity that is needed on an hourly basis, based on
 * the hourly load forecast.
 *
 * A minimum of 24 hours of data is required to create the initial forecasts. However,
 * having a full 14 days of historical data results in more accurate forecasts.
 */
export const getPredictiveScalingForecast: API.OperationMethod<
  GetPredictiveScalingForecastRequest,
  GetPredictiveScalingForecastResponse,
  GetPredictiveScalingForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPredictiveScalingForecastRequest,
  output: GetPredictiveScalingForecastResponse,
  errors: [
    InternalServiceException,
    ValidationException,
    PredictiveScalingForecastNotSupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPredictiveScalingForecast",
}));

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Returns all the tags on the specified Application Auto Scaling scalable target.
 *
 * For general information about tags, including the format and syntax, see Tagging your Amazon Web Services
 * resources in the *Amazon Web Services General Reference*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutScalingPolicyError =
  | ConcurrentUpdateException
  | FailedResourceAccessException
  | InternalServiceException
  | LimitExceededException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a scaling policy for an Application Auto Scaling scalable target.
 *
 * Each scalable target is identified by a service namespace, resource ID, and scalable
 * dimension. A scaling policy applies to the scalable target identified by those three
 * attributes. You cannot create a scaling policy until you have registered the resource as a
 * scalable target.
 *
 * Multiple scaling policies can be in force at the same time for the same scalable target.
 * You can have one or more target tracking scaling policies, one or more step scaling
 * policies, or both. However, there is a chance that multiple policies could conflict,
 * instructing the scalable target to scale out or in at the same time. Application Auto Scaling gives
 * precedence to the policy that provides the largest capacity for both scale out and scale
 * in. For example, if one policy increases capacity by 3, another policy increases capacity
 * by 200 percent, and the current capacity is 10, Application Auto Scaling uses the policy with the highest
 * calculated capacity (200% of 10 = 20) and scales out to 30.
 *
 * We recommend caution, however, when using target tracking scaling policies with step
 * scaling policies because conflicts between these policies can cause undesirable behavior.
 * For example, if the step scaling policy initiates a scale-in activity before the target
 * tracking policy is ready to scale in, the scale-in activity will not be blocked. After the
 * scale-in activity completes, the target tracking policy could instruct the scalable target
 * to scale out again.
 *
 * For more information, see Target tracking scaling policies, Step scaling policies, and Predictive scaling policies
 * in the *Application Auto Scaling User Guide*.
 *
 * If a scalable target is deregistered, the scalable target is no longer available to
 * use scaling policies. Any scaling policies that were specified for the scalable target
 * are deleted.
 */
export const putScalingPolicy: API.OperationMethod<
  PutScalingPolicyRequest,
  PutScalingPolicyResponse,
  PutScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutScalingPolicyRequest,
  output: PutScalingPolicyResponse,
  errors: [
    ConcurrentUpdateException,
    FailedResourceAccessException,
    InternalServiceException,
    LimitExceededException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
}));

export type PutScheduledActionError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a scheduled action for an Application Auto Scaling scalable target.
 *
 * Each scalable target is identified by a service namespace, resource ID, and scalable
 * dimension. A scheduled action applies to the scalable target identified by those three
 * attributes. You cannot create a scheduled action until you have registered the resource as
 * a scalable target.
 *
 * When you specify start and end times with a recurring schedule using a cron expression
 * or rates, they form the boundaries for when the recurring action starts and stops.
 *
 * To update a scheduled action, specify the parameters that you want to change. If you
 * don't specify start and end times, the old values are deleted.
 *
 * For more information, see Scheduled scaling in the *Application Auto Scaling User Guide*.
 *
 * If a scalable target is deregistered, the scalable target is no longer available to
 * run scheduled actions. Any scheduled actions that were specified for the scalable target
 * are deleted.
 */
export const putScheduledAction: API.OperationMethod<
  PutScheduledActionRequest,
  PutScheduledActionResponse,
  PutScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutScheduledActionRequest,
  output: PutScheduledActionResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScheduledAction",
}));

export type RegisterScalableTargetError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers or updates a scalable target, which is the resource that you want to
 * scale.
 *
 * Scalable targets are uniquely identified by the combination of resource ID, scalable
 * dimension, and namespace, which represents some capacity dimension of the underlying
 * service.
 *
 * When you register a new scalable target, you must specify values for the minimum and
 * maximum capacity. If the specified resource is not active in the target service, this
 * operation does not change the resource's current capacity. Otherwise, it changes the
 * resource's current capacity to a value that is inside of this range.
 *
 * If you add a scaling policy, current capacity is adjustable within the specified range
 * when scaling starts. Application Auto Scaling scaling policies will not scale capacity to values that are
 * outside of the minimum and maximum range.
 *
 * After you register a scalable target, you do not need to register it again to use other
 * Application Auto Scaling operations. To see which resources have been registered, use DescribeScalableTargets. You can also view the scaling policies for a service
 * namespace by using DescribeScalableTargets. If you no longer need a scalable target, you can
 * deregister it by using DeregisterScalableTarget.
 *
 * To update a scalable target, specify the parameters that you want to change. Include the
 * parameters that identify the scalable target: resource ID, scalable dimension, and
 * namespace. Any parameters that you don't specify are not changed by this update request.
 *
 * If you call the `RegisterScalableTarget` API operation to create a
 * scalable target, there might be a brief delay until the operation achieves eventual
 * consistency. You might become aware of this brief delay if you get unexpected
 * errors when performing sequential operations. The typical strategy is to retry the
 * request, and some Amazon Web Services SDKs include automatic backoff and retry logic.
 *
 * If you call the `RegisterScalableTarget` API operation to update an
 * existing scalable target, Application Auto Scaling retrieves the current capacity of the resource. If
 * it's below the minimum capacity or above the maximum capacity, Application Auto Scaling adjusts the
 * capacity of the scalable target to place it within these bounds, even if you don't
 * include the `MinCapacity` or `MaxCapacity` request
 * parameters.
 */
export const registerScalableTarget: API.OperationMethod<
  RegisterScalableTargetRequest,
  RegisterScalableTargetResponse,
  RegisterScalableTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterScalableTargetRequest,
  output: RegisterScalableTargetResponse,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterScalableTarget",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or edits tags on an Application Auto Scaling scalable target.
 *
 * Each tag consists of a tag key and a tag value, which are both case-sensitive strings.
 * To add a tag, specify a new tag key and a tag value. To edit a tag, specify an existing tag
 * key and a new tag value.
 *
 * You can use this operation to tag an Application Auto Scaling scalable target, but you cannot tag a
 * scaling policy or scheduled action.
 *
 * You can also add tags to an Application Auto Scaling scalable target while creating it
 * (`RegisterScalableTarget`).
 *
 * For general information about tags, including the format and syntax, see Tagging your Amazon Web Services
 * resources in the *Amazon Web Services General Reference*.
 *
 * Use tags to control access to a scalable target. For more information, see Tagging support
 * for Application Auto Scaling in the *Application Auto Scaling User Guide*.
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
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tags from an Application Auto Scaling scalable target. To delete a tag, specify the tag key and
 * the Application Auto Scaling scalable target.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
