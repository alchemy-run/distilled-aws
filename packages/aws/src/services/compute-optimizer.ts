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
  sdkId: "Compute Optimizer",
  serviceShapeName: "ComputeOptimizerService",
});
const auth = T.AwsAuthSigv4({ name: "compute-optimizer" });
const ver = T.ServiceVersion("2019-11-01");
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
              `https://compute-optimizer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://compute-optimizer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MissingAuthenticationToken
  extends /*@__PURE__*/ S.TaggedError<MissingAuthenticationToken>()(
    "MissingAuthenticationToken",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class OptInRequiredException
  extends /*@__PURE__*/ S.TaggedError<OptInRequiredException>()(
    "OptInRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type ResourceType =
  | "Ec2Instance"
  | "AutoScalingGroup"
  | "EbsVolume"
  | "LambdaFunction"
  | "NotApplicable"
  | "EcsService"
  | "License"
  | "RdsDBInstance"
  | "AuroraDBClusterStorage"
  | "Idle"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type ScopeName =
  | "Organization"
  | "AccountId"
  | "ResourceArn"
  | (string & {});
export const ScopeName = /*@__PURE__*/ S.String;

export type ScopeValue = string;
export interface Scope {
  name?: ScopeName;
  value?: string;
}
export const Scope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(ScopeName), value: S.optional(S.String) }),
).annotate({ identifier: "Scope" }) as any as S.Schema<Scope>;
export type RecommendationPreferenceName =
  | "EnhancedInfrastructureMetrics"
  | "InferredWorkloadTypes"
  | "ExternalMetricsPreference"
  | "LookBackPeriodPreference"
  | "PreferredResources"
  | "UtilizationPreferences"
  | (string & {});
export const RecommendationPreferenceName = /*@__PURE__*/ S.String;

export type RecommendationPreferenceNames = RecommendationPreferenceName[];
export const RecommendationPreferenceNames = /*@__PURE__*/ S.Array(
  RecommendationPreferenceName,
);
export interface DeleteRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  recommendationPreferenceNames: RecommendationPreferenceName[];
}
export const DeleteRecommendationPreferencesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceType: ResourceType,
      scope: S.optional(Scope),
      recommendationPreferenceNames: RecommendationPreferenceNames,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteRecommendationPreferencesRequest",
}) as any as S.Schema<DeleteRecommendationPreferencesRequest>;
export interface DeleteRecommendationPreferencesResponse {}
export const DeleteRecommendationPreferencesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteRecommendationPreferencesResponse",
}) as any as S.Schema<DeleteRecommendationPreferencesResponse>;
export type JobId = string;
export type JobIds = string[];
export const JobIds = /*@__PURE__*/ S.Array(S.String);
export type JobFilterName = "ResourceType" | "JobStatus" | (string & {});
export const JobFilterName = /*@__PURE__*/ S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface JobFilter {
  name?: JobFilterName;
  values?: string[];
}
export const JobFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(JobFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({ identifier: "JobFilter" }) as any as S.Schema<JobFilter>;
export type JobFilters = JobFilter[];
export const JobFilters = /*@__PURE__*/ S.Array(JobFilter);
export type NextToken = string;
export type MaxResults = number;
export interface DescribeRecommendationExportJobsRequest {
  jobIds?: string[];
  filters?: JobFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeRecommendationExportJobsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobIds: S.optional(JobIds),
      filters: S.optional(JobFilters),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeRecommendationExportJobsRequest",
}) as any as S.Schema<DescribeRecommendationExportJobsRequest>;
export type DestinationBucket = string;
export type DestinationKey = string;
export type MetadataKey = string;
export interface S3Destination {
  bucket?: string;
  key?: string;
  metadataKey?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    key: S.optional(S.String),
    metadataKey: S.optional(S.String),
  }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface ExportDestination {
  s3?: S3Destination;
}
export const ExportDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3Destination) }),
).annotate({
  identifier: "ExportDestination",
}) as any as S.Schema<ExportDestination>;
export type JobStatus =
  | "Queued"
  | "InProgress"
  | "Complete"
  | "Failed"
  | (string & {});
export const JobStatus = /*@__PURE__*/ S.String;

export type CreationTimestamp = Date;
export type LastUpdatedTimestamp = Date;
export type FailureReason = string;
export interface RecommendationExportJob {
  jobId?: string;
  destination?: ExportDestination;
  resourceType?: ResourceType;
  status?: JobStatus;
  creationTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
  failureReason?: string;
}
export const RecommendationExportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    destination: S.optional(ExportDestination),
    resourceType: S.optional(ResourceType),
    status: S.optional(JobStatus),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommendationExportJob",
}) as any as S.Schema<RecommendationExportJob>;
export type RecommendationExportJobs = RecommendationExportJob[];
export const RecommendationExportJobs = /*@__PURE__*/ S.Array(
  RecommendationExportJob,
);
export interface DescribeRecommendationExportJobsResponse {
  recommendationExportJobs?: RecommendationExportJob[];
  nextToken?: string;
}
export const DescribeRecommendationExportJobsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recommendationExportJobs: S.optional(RecommendationExportJobs),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeRecommendationExportJobsResponse",
}) as any as S.Schema<DescribeRecommendationExportJobsResponse>;
export type AccountId = string;
export type AccountIds = string[];
export const AccountIds = /*@__PURE__*/ S.Array(S.String);
export type FilterName =
  | "Finding"
  | "FindingReasonCodes"
  | "RecommendationSourceType"
  | "InferredWorkloadTypes"
  | (string & {});
export const FilterName = /*@__PURE__*/ S.String;

export interface Filter {
  name?: FilterName;
  values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(FilterName), values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export type ExportableAutoScalingGroupField =
  | "AccountId"
  | "AutoScalingGroupArn"
  | "AutoScalingGroupName"
  | "Finding"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEbsReadOpsPerSecondMaximum"
  | "UtilizationMetricsEbsWriteOpsPerSecondMaximum"
  | "UtilizationMetricsEbsReadBytesPerSecondMaximum"
  | "UtilizationMetricsEbsWriteBytesPerSecondMaximum"
  | "UtilizationMetricsDiskReadOpsPerSecondMaximum"
  | "UtilizationMetricsDiskWriteOpsPerSecondMaximum"
  | "UtilizationMetricsDiskReadBytesPerSecondMaximum"
  | "UtilizationMetricsDiskWriteBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsInPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsOutPerSecondMaximum"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationInstanceType"
  | "CurrentConfigurationDesiredCapacity"
  | "CurrentConfigurationMinSize"
  | "CurrentConfigurationMaxSize"
  | "CurrentConfigurationAllocationStrategy"
  | "CurrentConfigurationMixedInstanceTypes"
  | "CurrentConfigurationType"
  | "CurrentOnDemandPrice"
  | "CurrentStandardOneYearNoUpfrontReservedPrice"
  | "CurrentStandardThreeYearNoUpfrontReservedPrice"
  | "CurrentVCpus"
  | "CurrentMemory"
  | "CurrentStorage"
  | "CurrentNetwork"
  | "RecommendationOptionsConfigurationInstanceType"
  | "RecommendationOptionsConfigurationDesiredCapacity"
  | "RecommendationOptionsConfigurationMinSize"
  | "RecommendationOptionsConfigurationMaxSize"
  | "RecommendationOptionsConfigurationEstimatedInstanceHourReductionPercentage"
  | "RecommendationOptionsConfigurationAllocationStrategy"
  | "RecommendationOptionsConfigurationMixedInstanceTypes"
  | "RecommendationOptionsConfigurationType"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "RecommendationOptionsPerformanceRisk"
  | "RecommendationOptionsOnDemandPrice"
  | "RecommendationOptionsStandardOneYearNoUpfrontReservedPrice"
  | "RecommendationOptionsStandardThreeYearNoUpfrontReservedPrice"
  | "RecommendationOptionsVcpus"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsStorage"
  | "RecommendationOptionsNetwork"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesInferredWorkloadTypes"
  | "EffectiveRecommendationPreferencesPreferredResources"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "InferredWorkloadTypes"
  | "RecommendationOptionsMigrationEffort"
  | "CurrentInstanceGpuInfo"
  | "RecommendationOptionsInstanceGpuInfo"
  | "UtilizationMetricsGpuPercentageMaximum"
  | "UtilizationMetricsGpuMemoryPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuMemoryPercentageMaximum"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export const ExportableAutoScalingGroupField = /*@__PURE__*/ S.String;

export type ExportableAutoScalingGroupFields =
  ExportableAutoScalingGroupField[];
export const ExportableAutoScalingGroupFields = /*@__PURE__*/ S.Array(
  ExportableAutoScalingGroupField,
);
export type DestinationKeyPrefix = string;
export interface S3DestinationConfig {
  bucket?: string;
  keyPrefix?: string;
}
export const S3DestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.optional(S.String), keyPrefix: S.optional(S.String) }),
).annotate({
  identifier: "S3DestinationConfig",
}) as any as S.Schema<S3DestinationConfig>;
export type FileFormat = "Csv" | (string & {});
export const FileFormat = /*@__PURE__*/ S.String;

export type IncludeMemberAccounts = boolean;
export type CpuVendorArchitecture = "AWS_ARM64" | "CURRENT" | (string & {});
export const CpuVendorArchitecture = /*@__PURE__*/ S.String;

export type CpuVendorArchitectures = CpuVendorArchitecture[];
export const CpuVendorArchitectures = /*@__PURE__*/ S.Array(
  CpuVendorArchitecture,
);
export interface RecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
}
export const RecommendationPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cpuVendorArchitectures: S.optional(CpuVendorArchitectures) }),
).annotate({
  identifier: "RecommendationPreferences",
}) as any as S.Schema<RecommendationPreferences>;
export interface ExportAutoScalingGroupRecommendationsRequest {
  accountIds?: string[];
  filters?: Filter[];
  fieldsToExport?: ExportableAutoScalingGroupField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export const ExportAutoScalingGroupRecommendationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(Filters),
      fieldsToExport: S.optional(ExportableAutoScalingGroupFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ExportAutoScalingGroupRecommendationsRequest",
  }) as any as S.Schema<ExportAutoScalingGroupRecommendationsRequest>;
export interface ExportAutoScalingGroupRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportAutoScalingGroupRecommendationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
  ).annotate({
    identifier: "ExportAutoScalingGroupRecommendationsResponse",
  }) as any as S.Schema<ExportAutoScalingGroupRecommendationsResponse>;
export type EBSFilterName = "Finding" | (string & {});
export const EBSFilterName = /*@__PURE__*/ S.String;

export interface EBSFilter {
  name?: EBSFilterName;
  values?: string[];
}
export const EBSFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(EBSFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({ identifier: "EBSFilter" }) as any as S.Schema<EBSFilter>;
export type EBSFilters = EBSFilter[];
export const EBSFilters = /*@__PURE__*/ S.Array(EBSFilter);
export type ExportableVolumeField =
  | "AccountId"
  | "VolumeArn"
  | "Finding"
  | "UtilizationMetricsVolumeReadOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeReadBytesPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteBytesPerSecondMaximum"
  | "UtilizationMetricsVolumeIOPSExceededMaximum"
  | "UtilizationMetricsVolumeThroughputExceededMaximum"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationVolumeType"
  | "CurrentConfigurationVolumeBaselineIOPS"
  | "CurrentConfigurationVolumeBaselineThroughput"
  | "CurrentConfigurationVolumeBurstIOPS"
  | "CurrentConfigurationVolumeBurstThroughput"
  | "CurrentConfigurationVolumeSize"
  | "CurrentMonthlyPrice"
  | "RecommendationOptionsConfigurationVolumeType"
  | "RecommendationOptionsConfigurationVolumeBaselineIOPS"
  | "RecommendationOptionsConfigurationVolumeBaselineThroughput"
  | "RecommendationOptionsConfigurationVolumeBurstIOPS"
  | "RecommendationOptionsConfigurationVolumeBurstThroughput"
  | "RecommendationOptionsConfigurationVolumeSize"
  | "RecommendationOptionsMonthlyPrice"
  | "RecommendationOptionsPerformanceRisk"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | "RootVolume"
  | "CurrentConfigurationRootVolume"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | (string & {});
export const ExportableVolumeField = /*@__PURE__*/ S.String;

export type ExportableVolumeFields = ExportableVolumeField[];
export const ExportableVolumeFields = /*@__PURE__*/ S.Array(
  ExportableVolumeField,
);
export interface ExportEBSVolumeRecommendationsRequest {
  accountIds?: string[];
  filters?: EBSFilter[];
  fieldsToExport?: ExportableVolumeField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export const ExportEBSVolumeRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(EBSFilters),
      fieldsToExport: S.optional(ExportableVolumeFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ExportEBSVolumeRecommendationsRequest",
}) as any as S.Schema<ExportEBSVolumeRecommendationsRequest>;
export interface ExportEBSVolumeRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportEBSVolumeRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
).annotate({
  identifier: "ExportEBSVolumeRecommendationsResponse",
}) as any as S.Schema<ExportEBSVolumeRecommendationsResponse>;
export type ExportableInstanceField =
  | "AccountId"
  | "InstanceArn"
  | "InstanceName"
  | "Finding"
  | "FindingReasonCodes"
  | "LookbackPeriodInDays"
  | "CurrentInstanceType"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEbsReadOpsPerSecondMaximum"
  | "UtilizationMetricsEbsWriteOpsPerSecondMaximum"
  | "UtilizationMetricsEbsReadBytesPerSecondMaximum"
  | "UtilizationMetricsEbsWriteBytesPerSecondMaximum"
  | "UtilizationMetricsDiskReadOpsPerSecondMaximum"
  | "UtilizationMetricsDiskWriteOpsPerSecondMaximum"
  | "UtilizationMetricsDiskReadBytesPerSecondMaximum"
  | "UtilizationMetricsDiskWriteBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsInPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsOutPerSecondMaximum"
  | "CurrentOnDemandPrice"
  | "CurrentStandardOneYearNoUpfrontReservedPrice"
  | "CurrentStandardThreeYearNoUpfrontReservedPrice"
  | "CurrentVCpus"
  | "CurrentMemory"
  | "CurrentStorage"
  | "CurrentNetwork"
  | "RecommendationOptionsInstanceType"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "RecommendationOptionsPlatformDifferences"
  | "RecommendationOptionsPerformanceRisk"
  | "RecommendationOptionsVcpus"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsStorage"
  | "RecommendationOptionsNetwork"
  | "RecommendationOptionsOnDemandPrice"
  | "RecommendationOptionsStandardOneYearNoUpfrontReservedPrice"
  | "RecommendationOptionsStandardThreeYearNoUpfrontReservedPrice"
  | "RecommendationsSourcesRecommendationSourceArn"
  | "RecommendationsSourcesRecommendationSourceType"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesInferredWorkloadTypes"
  | "InferredWorkloadTypes"
  | "RecommendationOptionsMigrationEffort"
  | "EffectiveRecommendationPreferencesExternalMetricsSource"
  | "Tags"
  | "InstanceState"
  | "ExternalMetricStatusCode"
  | "ExternalMetricStatusReason"
  | "CurrentInstanceGpuInfo"
  | "RecommendationOptionsInstanceGpuInfo"
  | "UtilizationMetricsGpuPercentageMaximum"
  | "UtilizationMetricsGpuMemoryPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuMemoryPercentageMaximum"
  | "Idle"
  | "EffectiveRecommendationPreferencesPreferredResources"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "EffectiveRecommendationPreferencesUtilizationPreferences"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export const ExportableInstanceField = /*@__PURE__*/ S.String;

export type ExportableInstanceFields = ExportableInstanceField[];
export const ExportableInstanceFields = /*@__PURE__*/ S.Array(
  ExportableInstanceField,
);
export interface ExportEC2InstanceRecommendationsRequest {
  accountIds?: string[];
  filters?: Filter[];
  fieldsToExport?: ExportableInstanceField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export const ExportEC2InstanceRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(Filters),
      fieldsToExport: S.optional(ExportableInstanceFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ExportEC2InstanceRecommendationsRequest",
}) as any as S.Schema<ExportEC2InstanceRecommendationsRequest>;
export interface ExportEC2InstanceRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportEC2InstanceRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
).annotate({
  identifier: "ExportEC2InstanceRecommendationsResponse",
}) as any as S.Schema<ExportEC2InstanceRecommendationsResponse>;
export type ECSServiceRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | (string & {});
export const ECSServiceRecommendationFilterName = /*@__PURE__*/ S.String;

export interface ECSServiceRecommendationFilter {
  name?: ECSServiceRecommendationFilterName;
  values?: string[];
}
export const ECSServiceRecommendationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ECSServiceRecommendationFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "ECSServiceRecommendationFilter",
}) as any as S.Schema<ECSServiceRecommendationFilter>;
export type ECSServiceRecommendationFilters = ECSServiceRecommendationFilter[];
export const ECSServiceRecommendationFilters = /*@__PURE__*/ S.Array(
  ECSServiceRecommendationFilter,
);
export type ExportableECSServiceField =
  | "AccountId"
  | "ServiceArn"
  | "LookbackPeriodInDays"
  | "LastRefreshTimestamp"
  | "LaunchType"
  | "CurrentPerformanceRisk"
  | "CurrentServiceConfigurationMemory"
  | "CurrentServiceConfigurationCpu"
  | "CurrentServiceConfigurationTaskDefinitionArn"
  | "CurrentServiceConfigurationAutoScalingConfiguration"
  | "CurrentServiceContainerConfigurations"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "Finding"
  | "FindingReasonCodes"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsCpu"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "RecommendationOptionsContainerRecommendations"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "Tags"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | (string & {});
export const ExportableECSServiceField = /*@__PURE__*/ S.String;

export type ExportableECSServiceFields = ExportableECSServiceField[];
export const ExportableECSServiceFields = /*@__PURE__*/ S.Array(
  ExportableECSServiceField,
);
export interface ExportECSServiceRecommendationsRequest {
  accountIds?: string[];
  filters?: ECSServiceRecommendationFilter[];
  fieldsToExport?: ExportableECSServiceField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export const ExportECSServiceRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(ECSServiceRecommendationFilters),
      fieldsToExport: S.optional(ExportableECSServiceFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ExportECSServiceRecommendationsRequest",
}) as any as S.Schema<ExportECSServiceRecommendationsRequest>;
export interface ExportECSServiceRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportECSServiceRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
).annotate({
  identifier: "ExportECSServiceRecommendationsResponse",
}) as any as S.Schema<ExportECSServiceRecommendationsResponse>;
export type IdleRecommendationFilterName =
  | "Finding"
  | "ResourceType"
  | (string & {});
export const IdleRecommendationFilterName = /*@__PURE__*/ S.String;

export interface IdleRecommendationFilter {
  name?: IdleRecommendationFilterName;
  values?: string[];
}
export const IdleRecommendationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(IdleRecommendationFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "IdleRecommendationFilter",
}) as any as S.Schema<IdleRecommendationFilter>;
export type IdleRecommendationFilters = IdleRecommendationFilter[];
export const IdleRecommendationFilters = /*@__PURE__*/ S.Array(
  IdleRecommendationFilter,
);
export type ExportableIdleField =
  | "AccountId"
  | "ResourceArn"
  | "ResourceId"
  | "ResourceType"
  | "LastRefreshTimestamp"
  | "LookbackPeriodInDays"
  | "SavingsOpportunity"
  | "SavingsOpportunityAfterDiscount"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsDatabaseConnectionsMaximum"
  | "UtilizationMetricsEBSVolumeReadIOPSMaximum"
  | "UtilizationMetricsEBSVolumeWriteIOPSMaximum"
  | "UtilizationMetricsVolumeReadOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteOpsPerSecondMaximum"
  | "UtilizationMetricsActiveConnectionCountMaximum"
  | "UtilizationMetricsPacketsInFromSourceMaximum"
  | "UtilizationMetricsPacketsInFromDestinationMaximum"
  | "UtilizationMetricsConsumedReadCapacityUnitsSum"
  | "UtilizationMetricsConsumedWriteCapacityUnitsSum"
  | "UtilizationMetricsNewConnectionsSum"
  | "UtilizationMetricsEngineCPUUtilizationMaximum"
  | "UtilizationMetricsCacheHitsSum"
  | "UtilizationMetricsCacheMissesSum"
  | "UtilizationMetricsKeyspaceHitsSum"
  | "UtilizationMetricsKeyspaceMissesSum"
  | "UtilizationMetricsIsIdleMinimum"
  | "UtilizationMetricsUserConnectedSum"
  | "UtilizationMetricsInvocationsSum"
  | "UtilizationMetricsGetTypeCmdsSum"
  | "UtilizationMetricsSetTypeCmdsSum"
  | "UtilizationMetricsElastiCacheProcessingUnitsSum"
  | "UtilizationMetricsCurrConnectionsSum"
  | "UtilizationMetricsDatabaseConnectionsSum"
  | "Finding"
  | "FindingDescription"
  | "Tags"
  | (string & {});
export const ExportableIdleField = /*@__PURE__*/ S.String;

export type ExportableIdleFields = ExportableIdleField[];
export const ExportableIdleFields = /*@__PURE__*/ S.Array(ExportableIdleField);
export interface ExportIdleRecommendationsRequest {
  accountIds?: string[];
  filters?: IdleRecommendationFilter[];
  fieldsToExport?: ExportableIdleField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export const ExportIdleRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIds),
    filters: S.optional(IdleRecommendationFilters),
    fieldsToExport: S.optional(ExportableIdleFields),
    s3DestinationConfig: S3DestinationConfig,
    fileFormat: S.optional(FileFormat),
    includeMemberAccounts: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExportIdleRecommendationsRequest",
}) as any as S.Schema<ExportIdleRecommendationsRequest>;
export interface ExportIdleRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportIdleRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    s3Destination: S.optional(S3Destination),
  }),
).annotate({
  identifier: "ExportIdleRecommendationsResponse",
}) as any as S.Schema<ExportIdleRecommendationsResponse>;
export type LambdaFunctionRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | (string & {});
export const LambdaFunctionRecommendationFilterName = /*@__PURE__*/ S.String;

export interface LambdaFunctionRecommendationFilter {
  name?: LambdaFunctionRecommendationFilterName;
  values?: string[];
}
export const LambdaFunctionRecommendationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(LambdaFunctionRecommendationFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "LambdaFunctionRecommendationFilter",
}) as any as S.Schema<LambdaFunctionRecommendationFilter>;
export type LambdaFunctionRecommendationFilters =
  LambdaFunctionRecommendationFilter[];
export const LambdaFunctionRecommendationFilters = /*@__PURE__*/ S.Array(
  LambdaFunctionRecommendationFilter,
);
export type ExportableLambdaFunctionField =
  | "AccountId"
  | "FunctionArn"
  | "FunctionVersion"
  | "Finding"
  | "FindingReasonCodes"
  | "NumberOfInvocations"
  | "UtilizationMetricsDurationMaximum"
  | "UtilizationMetricsDurationAverage"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsMemoryAverage"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationMemorySize"
  | "CurrentConfigurationTimeout"
  | "CurrentCostTotal"
  | "CurrentCostAverage"
  | "RecommendationOptionsConfigurationMemorySize"
  | "RecommendationOptionsCostLow"
  | "RecommendationOptionsCostHigh"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationLowerBound"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationUpperBound"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationExpected"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export const ExportableLambdaFunctionField = /*@__PURE__*/ S.String;

export type ExportableLambdaFunctionFields = ExportableLambdaFunctionField[];
export const ExportableLambdaFunctionFields = /*@__PURE__*/ S.Array(
  ExportableLambdaFunctionField,
);
export interface ExportLambdaFunctionRecommendationsRequest {
  accountIds?: string[];
  filters?: LambdaFunctionRecommendationFilter[];
  fieldsToExport?: ExportableLambdaFunctionField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export const ExportLambdaFunctionRecommendationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(LambdaFunctionRecommendationFilters),
      fieldsToExport: S.optional(ExportableLambdaFunctionFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ExportLambdaFunctionRecommendationsRequest",
  }) as any as S.Schema<ExportLambdaFunctionRecommendationsRequest>;
export interface ExportLambdaFunctionRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportLambdaFunctionRecommendationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
  ).annotate({
    identifier: "ExportLambdaFunctionRecommendationsResponse",
  }) as any as S.Schema<ExportLambdaFunctionRecommendationsResponse>;
export type LicenseRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | "LicenseName"
  | (string & {});
export const LicenseRecommendationFilterName = /*@__PURE__*/ S.String;

export interface LicenseRecommendationFilter {
  name?: LicenseRecommendationFilterName;
  values?: string[];
}
export const LicenseRecommendationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(LicenseRecommendationFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "LicenseRecommendationFilter",
}) as any as S.Schema<LicenseRecommendationFilter>;
export type LicenseRecommendationFilters = LicenseRecommendationFilter[];
export const LicenseRecommendationFilters = /*@__PURE__*/ S.Array(
  LicenseRecommendationFilter,
);
export type ExportableLicenseField =
  | "AccountId"
  | "ResourceArn"
  | "LookbackPeriodInDays"
  | "LastRefreshTimestamp"
  | "Finding"
  | "FindingReasonCodes"
  | "CurrentLicenseConfigurationNumberOfCores"
  | "CurrentLicenseConfigurationInstanceType"
  | "CurrentLicenseConfigurationOperatingSystem"
  | "CurrentLicenseConfigurationLicenseName"
  | "CurrentLicenseConfigurationLicenseEdition"
  | "CurrentLicenseConfigurationLicenseModel"
  | "CurrentLicenseConfigurationLicenseVersion"
  | "CurrentLicenseConfigurationMetricsSource"
  | "RecommendationOptionsOperatingSystem"
  | "RecommendationOptionsLicenseEdition"
  | "RecommendationOptionsLicenseModel"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | (string & {});
export const ExportableLicenseField = /*@__PURE__*/ S.String;

export type ExportableLicenseFields = ExportableLicenseField[];
export const ExportableLicenseFields = /*@__PURE__*/ S.Array(
  ExportableLicenseField,
);
export interface ExportLicenseRecommendationsRequest {
  accountIds?: string[];
  filters?: LicenseRecommendationFilter[];
  fieldsToExport?: ExportableLicenseField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export const ExportLicenseRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIds),
    filters: S.optional(LicenseRecommendationFilters),
    fieldsToExport: S.optional(ExportableLicenseFields),
    s3DestinationConfig: S3DestinationConfig,
    fileFormat: S.optional(FileFormat),
    includeMemberAccounts: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExportLicenseRecommendationsRequest",
}) as any as S.Schema<ExportLicenseRecommendationsRequest>;
export interface ExportLicenseRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportLicenseRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
).annotate({
  identifier: "ExportLicenseRecommendationsResponse",
}) as any as S.Schema<ExportLicenseRecommendationsResponse>;
export type RDSDBRecommendationFilterName =
  | "InstanceFinding"
  | "InstanceFindingReasonCode"
  | "StorageFinding"
  | "StorageFindingReasonCode"
  | "Idle"
  | (string & {});
export const RDSDBRecommendationFilterName = /*@__PURE__*/ S.String;

export interface RDSDBRecommendationFilter {
  name?: RDSDBRecommendationFilterName;
  values?: string[];
}
export const RDSDBRecommendationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(RDSDBRecommendationFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "RDSDBRecommendationFilter",
}) as any as S.Schema<RDSDBRecommendationFilter>;
export type RDSDBRecommendationFilters = RDSDBRecommendationFilter[];
export const RDSDBRecommendationFilters = /*@__PURE__*/ S.Array(
  RDSDBRecommendationFilter,
);
export type ExportableRDSDBField =
  | "ResourceArn"
  | "AccountId"
  | "Engine"
  | "EngineVersion"
  | "Idle"
  | "MultiAZDBInstance"
  | "ClusterWriter"
  | "CurrentDBInstanceClass"
  | "CurrentStorageConfigurationStorageType"
  | "CurrentStorageConfigurationAllocatedStorage"
  | "CurrentStorageConfigurationMaxAllocatedStorage"
  | "CurrentStorageConfigurationIOPS"
  | "CurrentStorageConfigurationStorageThroughput"
  | "CurrentStorageEstimatedMonthlyVolumeIOPsCostVariation"
  | "CurrentInstanceOnDemandHourlyPrice"
  | "CurrentStorageOnDemandMonthlyPrice"
  | "LookbackPeriodInDays"
  | "CurrentStorageEstimatedClusterInstanceOnDemandMonthlyCost"
  | "CurrentStorageEstimatedClusterStorageOnDemandMonthlyCost"
  | "CurrentStorageEstimatedClusterStorageIOOnDemandMonthlyCost"
  | "CurrentInstancePerformanceRisk"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEBSVolumeStorageSpaceUtilizationMaximum"
  | "UtilizationMetricsNetworkReceiveThroughputMaximum"
  | "UtilizationMetricsNetworkTransmitThroughputMaximum"
  | "UtilizationMetricsEBSVolumeReadIOPSMaximum"
  | "UtilizationMetricsEBSVolumeWriteIOPSMaximum"
  | "UtilizationMetricsEBSVolumeReadThroughputMaximum"
  | "UtilizationMetricsEBSVolumeWriteThroughputMaximum"
  | "UtilizationMetricsDatabaseConnectionsMaximum"
  | "UtilizationMetricsStorageNetworkReceiveThroughputMaximum"
  | "UtilizationMetricsStorageNetworkTransmitThroughputMaximum"
  | "UtilizationMetricsAuroraMemoryHealthStateMaximum"
  | "UtilizationMetricsAuroraMemoryNumDeclinedSqlTotalMaximum"
  | "UtilizationMetricsAuroraMemoryNumKillConnTotalMaximum"
  | "UtilizationMetricsAuroraMemoryNumKillQueryTotalMaximum"
  | "UtilizationMetricsReadIOPSEphemeralStorageMaximum"
  | "UtilizationMetricsWriteIOPSEphemeralStorageMaximum"
  | "UtilizationMetricsVolumeBytesUsedAverage"
  | "UtilizationMetricsVolumeReadIOPsAverage"
  | "UtilizationMetricsVolumeWriteIOPsAverage"
  | "InstanceFinding"
  | "InstanceFindingReasonCodes"
  | "StorageFinding"
  | "StorageFindingReasonCodes"
  | "InstanceRecommendationOptionsDBInstanceClass"
  | "InstanceRecommendationOptionsRank"
  | "InstanceRecommendationOptionsPerformanceRisk"
  | "InstanceRecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "StorageRecommendationOptionsStorageType"
  | "StorageRecommendationOptionsAllocatedStorage"
  | "StorageRecommendationOptionsMaxAllocatedStorage"
  | "StorageRecommendationOptionsIOPS"
  | "StorageRecommendationOptionsStorageThroughput"
  | "StorageRecommendationOptionsRank"
  | "StorageRecommendationOptionsEstimatedMonthlyVolumeIOPsCostVariation"
  | "InstanceRecommendationOptionsInstanceOnDemandHourlyPrice"
  | "InstanceRecommendationOptionsSavingsOpportunityPercentage"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsValue"
  | "InstanceRecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "StorageRecommendationOptionsOnDemandMonthlyPrice"
  | "StorageRecommendationOptionsEstimatedClusterInstanceOnDemandMonthlyCost"
  | "StorageRecommendationOptionsEstimatedClusterStorageOnDemandMonthlyCost"
  | "StorageRecommendationOptionsEstimatedClusterStorageIOOnDemandMonthlyCost"
  | "StorageRecommendationOptionsSavingsOpportunityPercentage"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsValue"
  | "StorageRecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "LastRefreshTimestamp"
  | "Tags"
  | "DBClusterIdentifier"
  | "PromotionTier"
  | (string & {});
export const ExportableRDSDBField = /*@__PURE__*/ S.String;

export type ExportableRDSDBFields = ExportableRDSDBField[];
export const ExportableRDSDBFields =
  /*@__PURE__*/ S.Array(ExportableRDSDBField);
export interface ExportRDSDatabaseRecommendationsRequest {
  accountIds?: string[];
  filters?: RDSDBRecommendationFilter[];
  fieldsToExport?: ExportableRDSDBField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export const ExportRDSDatabaseRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      filters: S.optional(RDSDBRecommendationFilters),
      fieldsToExport: S.optional(ExportableRDSDBFields),
      s3DestinationConfig: S3DestinationConfig,
      fileFormat: S.optional(FileFormat),
      includeMemberAccounts: S.optional(S.Boolean),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ExportRDSDatabaseRecommendationsRequest",
}) as any as S.Schema<ExportRDSDatabaseRecommendationsRequest>;
export interface ExportRDSDatabaseRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export const ExportRDSDatabaseRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      jobId: S.optional(S.String),
      s3Destination: S.optional(S3Destination),
    }),
).annotate({
  identifier: "ExportRDSDatabaseRecommendationsResponse",
}) as any as S.Schema<ExportRDSDatabaseRecommendationsResponse>;
export type AutoScalingGroupArn = string;
export type AutoScalingGroupArns = string[];
export const AutoScalingGroupArns = /*@__PURE__*/ S.Array(S.String);
export interface GetAutoScalingGroupRecommendationsRequest {
  accountIds?: string[];
  autoScalingGroupArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: Filter[];
  recommendationPreferences?: RecommendationPreferences;
}
export const GetAutoScalingGroupRecommendationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accountIds: S.optional(AccountIds),
      autoScalingGroupArns: S.optional(AutoScalingGroupArns),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
      filters: S.optional(Filters),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetAutoScalingGroupRecommendationsRequest",
  }) as any as S.Schema<GetAutoScalingGroupRecommendationsRequest>;
export type AutoScalingGroupName = string;
export type Finding =
  | "Underprovisioned"
  | "Overprovisioned"
  | "Optimized"
  | "NotOptimized"
  | (string & {});
export const Finding = /*@__PURE__*/ S.String;

export type MetricName =
  | "Cpu"
  | "Memory"
  | "EBS_READ_OPS_PER_SECOND"
  | "EBS_WRITE_OPS_PER_SECOND"
  | "EBS_READ_BYTES_PER_SECOND"
  | "EBS_WRITE_BYTES_PER_SECOND"
  | "DISK_READ_OPS_PER_SECOND"
  | "DISK_WRITE_OPS_PER_SECOND"
  | "DISK_READ_BYTES_PER_SECOND"
  | "DISK_WRITE_BYTES_PER_SECOND"
  | "NETWORK_IN_BYTES_PER_SECOND"
  | "NETWORK_OUT_BYTES_PER_SECOND"
  | "NETWORK_PACKETS_IN_PER_SECOND"
  | "NETWORK_PACKETS_OUT_PER_SECOND"
  | "GPU_PERCENTAGE"
  | "GPU_MEMORY_PERCENTAGE"
  | (string & {});
export const MetricName = /*@__PURE__*/ S.String;

export type MetricStatistic = "Maximum" | "Average" | (string & {});
export const MetricStatistic = /*@__PURE__*/ S.String;

export type MetricValue = number;
export interface UtilizationMetric {
  name?: MetricName;
  statistic?: MetricStatistic;
  value?: number;
}
export const UtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(MetricName),
    statistic: S.optional(MetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "UtilizationMetric",
}) as any as S.Schema<UtilizationMetric>;
export type UtilizationMetrics = UtilizationMetric[];
export const UtilizationMetrics = /*@__PURE__*/ S.Array(UtilizationMetric);
export type LookBackPeriodInDays = number;
export type DesiredCapacity = number;
export type MinSize = number;
export type MaxSize = number;
export type NullableInstanceType = string;
export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export const AllocationStrategy = /*@__PURE__*/ S.String;

export type NullableEstimatedInstanceHourReductionPercentage = number;
export type AsgType =
  | "SingleInstanceType"
  | "MixedInstanceTypes"
  | (string & {});
export const AsgType = /*@__PURE__*/ S.String;

export type MixedInstanceType = string;
export type MixedInstanceTypes = string[];
export const MixedInstanceTypes = /*@__PURE__*/ S.Array(S.String);
export interface AutoScalingGroupConfiguration {
  desiredCapacity?: number;
  minSize?: number;
  maxSize?: number;
  instanceType?: string;
  allocationStrategy?: AllocationStrategy;
  estimatedInstanceHourReductionPercentage?: number;
  type?: AsgType;
  mixedInstanceTypes?: string[];
}
export const AutoScalingGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    desiredCapacity: S.optional(S.Number),
    minSize: S.optional(S.Number),
    maxSize: S.optional(S.Number),
    instanceType: S.optional(S.String),
    allocationStrategy: S.optional(AllocationStrategy),
    estimatedInstanceHourReductionPercentage: S.optional(S.Number),
    type: S.optional(AsgType),
    mixedInstanceTypes: S.optional(MixedInstanceTypes),
  }),
).annotate({
  identifier: "AutoScalingGroupConfiguration",
}) as any as S.Schema<AutoScalingGroupConfiguration>;
export type GpuCount = number;
export type GpuMemorySizeInMiB = number;
export interface Gpu {
  gpuCount?: number;
  gpuMemorySizeInMiB?: number;
}
export const Gpu = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gpuCount: S.optional(S.Number),
    gpuMemorySizeInMiB: S.optional(S.Number),
  }),
).annotate({ identifier: "Gpu" }) as any as S.Schema<Gpu>;
export type Gpus = Gpu[];
export const Gpus = /*@__PURE__*/ S.Array(Gpu);
export interface GpuInfo {
  gpus?: Gpu[];
}
export const GpuInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gpus: S.optional(Gpus) }),
).annotate({ identifier: "GpuInfo" }) as any as S.Schema<GpuInfo>;
export type ProjectedUtilizationMetrics = UtilizationMetric[];
export const ProjectedUtilizationMetrics =
  /*@__PURE__*/ S.Array(UtilizationMetric);
export type PerformanceRisk = number;
export type Rank = number;
export type SavingsOpportunityPercentage = number;
export type Currency = "USD" | "CNY" | (string & {});
export const Currency = /*@__PURE__*/ S.String;

export type Value = number;
export interface EstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const EstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "EstimatedMonthlySavings",
}) as any as S.Schema<EstimatedMonthlySavings>;
export interface SavingsOpportunity {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const SavingsOpportunity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsOpportunityPercentage: S.optional(S.Number),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({
  identifier: "SavingsOpportunity",
}) as any as S.Schema<SavingsOpportunity>;
export interface AutoScalingGroupEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const AutoScalingGroupEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "AutoScalingGroupEstimatedMonthlySavings",
}) as any as S.Schema<AutoScalingGroupEstimatedMonthlySavings>;
export interface AutoScalingGroupSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: AutoScalingGroupEstimatedMonthlySavings;
}
export const AutoScalingGroupSavingsOpportunityAfterDiscounts =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(
        AutoScalingGroupEstimatedMonthlySavings,
      ),
    }),
  ).annotate({
    identifier: "AutoScalingGroupSavingsOpportunityAfterDiscounts",
  }) as any as S.Schema<AutoScalingGroupSavingsOpportunityAfterDiscounts>;
export type MigrationEffort =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export const MigrationEffort = /*@__PURE__*/ S.String;

export interface AutoScalingGroupRecommendationOption {
  configuration?: AutoScalingGroupConfiguration;
  instanceGpuInfo?: GpuInfo;
  projectedUtilizationMetrics?: UtilizationMetric[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: AutoScalingGroupSavingsOpportunityAfterDiscounts;
  migrationEffort?: MigrationEffort;
}
export const AutoScalingGroupRecommendationOption = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      configuration: S.optional(AutoScalingGroupConfiguration),
      instanceGpuInfo: S.optional(GpuInfo),
      projectedUtilizationMetrics: S.optional(ProjectedUtilizationMetrics),
      performanceRisk: S.optional(S.Number),
      rank: S.optional(S.Number),
      savingsOpportunity: S.optional(SavingsOpportunity),
      savingsOpportunityAfterDiscounts: S.optional(
        AutoScalingGroupSavingsOpportunityAfterDiscounts,
      ),
      migrationEffort: S.optional(MigrationEffort),
    }),
).annotate({
  identifier: "AutoScalingGroupRecommendationOption",
}) as any as S.Schema<AutoScalingGroupRecommendationOption>;
export type AutoScalingGroupRecommendationOptions =
  AutoScalingGroupRecommendationOption[];
export const AutoScalingGroupRecommendationOptions = /*@__PURE__*/ S.Array(
  AutoScalingGroupRecommendationOption,
);
export type LastRefreshTimestamp = Date;
export type CurrentPerformanceRisk =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export const CurrentPerformanceRisk = /*@__PURE__*/ S.String;

export type EnhancedInfrastructureMetrics =
  | "Active"
  | "Inactive"
  | (string & {});
export const EnhancedInfrastructureMetrics = /*@__PURE__*/ S.String;

export type InferredWorkloadTypesPreference =
  | "Active"
  | "Inactive"
  | (string & {});
export const InferredWorkloadTypesPreference = /*@__PURE__*/ S.String;

export type ExternalMetricsSource =
  | "Datadog"
  | "Dynatrace"
  | "NewRelic"
  | "Instana"
  | (string & {});
export const ExternalMetricsSource = /*@__PURE__*/ S.String;

export interface ExternalMetricsPreference {
  source?: ExternalMetricsSource;
}
export const ExternalMetricsPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(ExternalMetricsSource) }),
).annotate({
  identifier: "ExternalMetricsPreference",
}) as any as S.Schema<ExternalMetricsPreference>;
export type LookBackPeriodPreference =
  | "DAYS_14"
  | "DAYS_32"
  | "DAYS_93"
  | (string & {});
export const LookBackPeriodPreference = /*@__PURE__*/ S.String;

export type CustomizableMetricName =
  | "CpuUtilization"
  | "MemoryUtilization"
  | (string & {});
export const CustomizableMetricName = /*@__PURE__*/ S.String;

export type CustomizableMetricThreshold =
  | "P90"
  | "P95"
  | "P99_5"
  | (string & {});
export const CustomizableMetricThreshold = /*@__PURE__*/ S.String;

export type CustomizableMetricHeadroom =
  | "PERCENT_30"
  | "PERCENT_20"
  | "PERCENT_10"
  | "PERCENT_0"
  | (string & {});
export const CustomizableMetricHeadroom = /*@__PURE__*/ S.String;

export interface CustomizableMetricParameters {
  threshold?: CustomizableMetricThreshold;
  headroom?: CustomizableMetricHeadroom;
}
export const CustomizableMetricParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threshold: S.optional(CustomizableMetricThreshold),
    headroom: S.optional(CustomizableMetricHeadroom),
  }),
).annotate({
  identifier: "CustomizableMetricParameters",
}) as any as S.Schema<CustomizableMetricParameters>;
export interface UtilizationPreference {
  metricName?: CustomizableMetricName;
  metricParameters?: CustomizableMetricParameters;
}
export const UtilizationPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(CustomizableMetricName),
    metricParameters: S.optional(CustomizableMetricParameters),
  }),
).annotate({
  identifier: "UtilizationPreference",
}) as any as S.Schema<UtilizationPreference>;
export type UtilizationPreferences = UtilizationPreference[];
export const UtilizationPreferences = /*@__PURE__*/ S.Array(
  UtilizationPreference,
);
export type PreferredResourceName = "Ec2InstanceTypes" | (string & {});
export const PreferredResourceName = /*@__PURE__*/ S.String;

export type PreferredResourceValue = string;
export type PreferredResourceValues = string[];
export const PreferredResourceValues = /*@__PURE__*/ S.Array(S.String);
export interface EffectivePreferredResource {
  name?: PreferredResourceName;
  includeList?: string[];
  effectiveIncludeList?: string[];
  excludeList?: string[];
}
export const EffectivePreferredResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(PreferredResourceName),
    includeList: S.optional(PreferredResourceValues),
    effectiveIncludeList: S.optional(PreferredResourceValues),
    excludeList: S.optional(PreferredResourceValues),
  }),
).annotate({
  identifier: "EffectivePreferredResource",
}) as any as S.Schema<EffectivePreferredResource>;
export type EffectivePreferredResources = EffectivePreferredResource[];
export const EffectivePreferredResources = /*@__PURE__*/ S.Array(
  EffectivePreferredResource,
);
export type InstanceSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export const InstanceSavingsEstimationModeSource = /*@__PURE__*/ S.String;

export interface InstanceSavingsEstimationMode {
  source?: InstanceSavingsEstimationModeSource;
}
export const InstanceSavingsEstimationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(InstanceSavingsEstimationModeSource) }),
).annotate({
  identifier: "InstanceSavingsEstimationMode",
}) as any as S.Schema<InstanceSavingsEstimationMode>;
export interface EffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
  savingsEstimationMode?: InstanceSavingsEstimationMode;
}
export const EffectiveRecommendationPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cpuVendorArchitectures: S.optional(CpuVendorArchitectures),
    enhancedInfrastructureMetrics: S.optional(EnhancedInfrastructureMetrics),
    inferredWorkloadTypes: S.optional(InferredWorkloadTypesPreference),
    externalMetricsPreference: S.optional(ExternalMetricsPreference),
    lookBackPeriod: S.optional(LookBackPeriodPreference),
    utilizationPreferences: S.optional(UtilizationPreferences),
    preferredResources: S.optional(EffectivePreferredResources),
    savingsEstimationMode: S.optional(InstanceSavingsEstimationMode),
  }),
).annotate({
  identifier: "EffectiveRecommendationPreferences",
}) as any as S.Schema<EffectiveRecommendationPreferences>;
export type InferredWorkloadType =
  | "AmazonEmr"
  | "ApacheCassandra"
  | "ApacheHadoop"
  | "Memcached"
  | "Nginx"
  | "PostgreSql"
  | "Redis"
  | "Kafka"
  | "SQLServer"
  | (string & {});
export const InferredWorkloadType = /*@__PURE__*/ S.String;

export type InferredWorkloadTypes = InferredWorkloadType[];
export const InferredWorkloadTypes =
  /*@__PURE__*/ S.Array(InferredWorkloadType);
export interface AutoScalingGroupRecommendation {
  accountId?: string;
  autoScalingGroupArn?: string;
  autoScalingGroupName?: string;
  finding?: Finding;
  utilizationMetrics?: UtilizationMetric[];
  lookBackPeriodInDays?: number;
  currentConfiguration?: AutoScalingGroupConfiguration;
  currentInstanceGpuInfo?: GpuInfo;
  recommendationOptions?: AutoScalingGroupRecommendationOption[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences;
  inferredWorkloadTypes?: InferredWorkloadType[];
}
export const AutoScalingGroupRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    autoScalingGroupArn: S.optional(S.String),
    autoScalingGroupName: S.optional(S.String),
    finding: S.optional(Finding),
    utilizationMetrics: S.optional(UtilizationMetrics),
    lookBackPeriodInDays: S.optional(S.Number),
    currentConfiguration: S.optional(AutoScalingGroupConfiguration),
    currentInstanceGpuInfo: S.optional(GpuInfo),
    recommendationOptions: S.optional(AutoScalingGroupRecommendationOptions),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    currentPerformanceRisk: S.optional(CurrentPerformanceRisk),
    effectiveRecommendationPreferences: S.optional(
      EffectiveRecommendationPreferences,
    ),
    inferredWorkloadTypes: S.optional(InferredWorkloadTypes),
  }),
).annotate({
  identifier: "AutoScalingGroupRecommendation",
}) as any as S.Schema<AutoScalingGroupRecommendation>;
export type AutoScalingGroupRecommendations = AutoScalingGroupRecommendation[];
export const AutoScalingGroupRecommendations = /*@__PURE__*/ S.Array(
  AutoScalingGroupRecommendation,
);
export type Identifier = string;
export type Code = string;
export type Message = string;
export interface GetRecommendationError {
  identifier?: string;
  code?: string;
  message?: string;
}
export const GetRecommendationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    code: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRecommendationError",
}) as any as S.Schema<GetRecommendationError>;
export type GetRecommendationErrors = GetRecommendationError[];
export const GetRecommendationErrors = /*@__PURE__*/ S.Array(
  GetRecommendationError,
);
export interface GetAutoScalingGroupRecommendationsResponse {
  nextToken?: string;
  autoScalingGroupRecommendations?: AutoScalingGroupRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetAutoScalingGroupRecommendationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      autoScalingGroupRecommendations: S.optional(
        AutoScalingGroupRecommendations,
      ),
      errors: S.optional(GetRecommendationErrors),
    }),
  ).annotate({
    identifier: "GetAutoScalingGroupRecommendationsResponse",
  }) as any as S.Schema<GetAutoScalingGroupRecommendationsResponse>;
export type VolumeArn = string;
export type VolumeArns = string[];
export const VolumeArns = /*@__PURE__*/ S.Array(S.String);
export interface GetEBSVolumeRecommendationsRequest {
  volumeArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: EBSFilter[];
  accountIds?: string[];
}
export const GetEBSVolumeRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeArns: S.optional(VolumeArns),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(EBSFilters),
    accountIds: S.optional(AccountIds),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEBSVolumeRecommendationsRequest",
}) as any as S.Schema<GetEBSVolumeRecommendationsRequest>;
export type VolumeType = string;
export type VolumeSize = number;
export type VolumeBaselineIOPS = number;
export type VolumeBurstIOPS = number;
export type VolumeBaselineThroughput = number;
export type VolumeBurstThroughput = number;
export type RootVolume = boolean;
export interface VolumeConfiguration {
  volumeType?: string;
  volumeSize?: number;
  volumeBaselineIOPS?: number;
  volumeBurstIOPS?: number;
  volumeBaselineThroughput?: number;
  volumeBurstThroughput?: number;
  rootVolume?: boolean;
}
export const VolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeType: S.optional(S.String),
    volumeSize: S.optional(S.Number),
    volumeBaselineIOPS: S.optional(S.Number),
    volumeBurstIOPS: S.optional(S.Number),
    volumeBaselineThroughput: S.optional(S.Number),
    volumeBurstThroughput: S.optional(S.Number),
    rootVolume: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "VolumeConfiguration",
}) as any as S.Schema<VolumeConfiguration>;
export type EBSFinding = "Optimized" | "NotOptimized" | (string & {});
export const EBSFinding = /*@__PURE__*/ S.String;

export type EBSMetricName =
  | "VolumeReadOpsPerSecond"
  | "VolumeWriteOpsPerSecond"
  | "VolumeReadBytesPerSecond"
  | "VolumeWriteBytesPerSecond"
  | "VolumeIOPSExceeded"
  | "VolumeThroughputExceeded"
  | (string & {});
export const EBSMetricName = /*@__PURE__*/ S.String;

export interface EBSUtilizationMetric {
  name?: EBSMetricName;
  statistic?: MetricStatistic;
  value?: number;
}
export const EBSUtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(EBSMetricName),
    statistic: S.optional(MetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "EBSUtilizationMetric",
}) as any as S.Schema<EBSUtilizationMetric>;
export type EBSUtilizationMetrics = EBSUtilizationMetric[];
export const EBSUtilizationMetrics =
  /*@__PURE__*/ S.Array(EBSUtilizationMetric);
export interface EBSEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const EBSEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "EBSEstimatedMonthlySavings",
}) as any as S.Schema<EBSEstimatedMonthlySavings>;
export interface EBSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: EBSEstimatedMonthlySavings;
}
export const EBSSavingsOpportunityAfterDiscounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsOpportunityPercentage: S.optional(S.Number),
    estimatedMonthlySavings: S.optional(EBSEstimatedMonthlySavings),
  }),
).annotate({
  identifier: "EBSSavingsOpportunityAfterDiscounts",
}) as any as S.Schema<EBSSavingsOpportunityAfterDiscounts>;
export interface VolumeRecommendationOption {
  configuration?: VolumeConfiguration;
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: EBSSavingsOpportunityAfterDiscounts;
}
export const VolumeRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configuration: S.optional(VolumeConfiguration),
    performanceRisk: S.optional(S.Number),
    rank: S.optional(S.Number),
    savingsOpportunity: S.optional(SavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      EBSSavingsOpportunityAfterDiscounts,
    ),
  }),
).annotate({
  identifier: "VolumeRecommendationOption",
}) as any as S.Schema<VolumeRecommendationOption>;
export type VolumeRecommendationOptions = VolumeRecommendationOption[];
export const VolumeRecommendationOptions = /*@__PURE__*/ S.Array(
  VolumeRecommendationOption,
);
export type EBSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export const EBSSavingsEstimationModeSource = /*@__PURE__*/ S.String;

export interface EBSSavingsEstimationMode {
  source?: EBSSavingsEstimationModeSource;
}
export const EBSSavingsEstimationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(EBSSavingsEstimationModeSource) }),
).annotate({
  identifier: "EBSSavingsEstimationMode",
}) as any as S.Schema<EBSSavingsEstimationMode>;
export interface EBSEffectiveRecommendationPreferences {
  savingsEstimationMode?: EBSSavingsEstimationMode;
  lookBackPeriod?: LookBackPeriodPreference;
}
export const EBSEffectiveRecommendationPreferences = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsEstimationMode: S.optional(EBSSavingsEstimationMode),
      lookBackPeriod: S.optional(LookBackPeriodPreference),
    }),
).annotate({
  identifier: "EBSEffectiveRecommendationPreferences",
}) as any as S.Schema<EBSEffectiveRecommendationPreferences>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface VolumeRecommendation {
  volumeArn?: string;
  accountId?: string;
  currentConfiguration?: VolumeConfiguration;
  finding?: EBSFinding;
  utilizationMetrics?: EBSUtilizationMetric[];
  lookBackPeriodInDays?: number;
  volumeRecommendationOptions?: VolumeRecommendationOption[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EBSEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export const VolumeRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    volumeArn: S.optional(S.String),
    accountId: S.optional(S.String),
    currentConfiguration: S.optional(VolumeConfiguration),
    finding: S.optional(EBSFinding),
    utilizationMetrics: S.optional(EBSUtilizationMetrics),
    lookBackPeriodInDays: S.optional(S.Number),
    volumeRecommendationOptions: S.optional(VolumeRecommendationOptions),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    currentPerformanceRisk: S.optional(CurrentPerformanceRisk),
    effectiveRecommendationPreferences: S.optional(
      EBSEffectiveRecommendationPreferences,
    ),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "VolumeRecommendation",
}) as any as S.Schema<VolumeRecommendation>;
export type VolumeRecommendations = VolumeRecommendation[];
export const VolumeRecommendations =
  /*@__PURE__*/ S.Array(VolumeRecommendation);
export interface GetEBSVolumeRecommendationsResponse {
  nextToken?: string;
  volumeRecommendations?: VolumeRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetEBSVolumeRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    volumeRecommendations: S.optional(VolumeRecommendations),
    errors: S.optional(GetRecommendationErrors),
  }),
).annotate({
  identifier: "GetEBSVolumeRecommendationsResponse",
}) as any as S.Schema<GetEBSVolumeRecommendationsResponse>;
export type InstanceArn = string;
export type InstanceArns = string[];
export const InstanceArns = /*@__PURE__*/ S.Array(S.String);
export interface GetEC2InstanceRecommendationsRequest {
  instanceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: Filter[];
  accountIds?: string[];
  recommendationPreferences?: RecommendationPreferences;
}
export const GetEC2InstanceRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      instanceArns: S.optional(InstanceArns),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
      filters: S.optional(Filters),
      accountIds: S.optional(AccountIds),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetEC2InstanceRecommendationsRequest",
}) as any as S.Schema<GetEC2InstanceRecommendationsRequest>;
export type InstanceName = string;
export type CurrentInstanceType = string;
export type InstanceRecommendationFindingReasonCode =
  | "CPUOverprovisioned"
  | "CPUUnderprovisioned"
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "EBSThroughputOverprovisioned"
  | "EBSThroughputUnderprovisioned"
  | "EBSIOPSOverprovisioned"
  | "EBSIOPSUnderprovisioned"
  | "NetworkBandwidthOverprovisioned"
  | "NetworkBandwidthUnderprovisioned"
  | "NetworkPPSOverprovisioned"
  | "NetworkPPSUnderprovisioned"
  | "DiskIOPSOverprovisioned"
  | "DiskIOPSUnderprovisioned"
  | "DiskThroughputOverprovisioned"
  | "DiskThroughputUnderprovisioned"
  | "GPUUnderprovisioned"
  | "GPUOverprovisioned"
  | "GPUMemoryUnderprovisioned"
  | "GPUMemoryOverprovisioned"
  | (string & {});
export const InstanceRecommendationFindingReasonCode = /*@__PURE__*/ S.String;

export type InstanceRecommendationFindingReasonCodes =
  InstanceRecommendationFindingReasonCode[];
export const InstanceRecommendationFindingReasonCodes = /*@__PURE__*/ S.Array(
  InstanceRecommendationFindingReasonCode,
);
export type InstanceType = string;
export type PlatformDifference =
  | "Hypervisor"
  | "NetworkInterface"
  | "StorageInterface"
  | "InstanceStoreAvailability"
  | "VirtualizationType"
  | "Architecture"
  | (string & {});
export const PlatformDifference = /*@__PURE__*/ S.String;

export type PlatformDifferences = PlatformDifference[];
export const PlatformDifferences = /*@__PURE__*/ S.Array(PlatformDifference);
export interface InstanceEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const InstanceEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "InstanceEstimatedMonthlySavings",
}) as any as S.Schema<InstanceEstimatedMonthlySavings>;
export interface InstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: InstanceEstimatedMonthlySavings;
}
export const InstanceSavingsOpportunityAfterDiscounts = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(InstanceEstimatedMonthlySavings),
    }),
).annotate({
  identifier: "InstanceSavingsOpportunityAfterDiscounts",
}) as any as S.Schema<InstanceSavingsOpportunityAfterDiscounts>;
export interface InstanceRecommendationOption {
  instanceType?: string;
  instanceGpuInfo?: GpuInfo;
  projectedUtilizationMetrics?: UtilizationMetric[];
  platformDifferences?: PlatformDifference[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: InstanceSavingsOpportunityAfterDiscounts;
  migrationEffort?: MigrationEffort;
}
export const InstanceRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceType: S.optional(S.String),
    instanceGpuInfo: S.optional(GpuInfo),
    projectedUtilizationMetrics: S.optional(ProjectedUtilizationMetrics),
    platformDifferences: S.optional(PlatformDifferences),
    performanceRisk: S.optional(S.Number),
    rank: S.optional(S.Number),
    savingsOpportunity: S.optional(SavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      InstanceSavingsOpportunityAfterDiscounts,
    ),
    migrationEffort: S.optional(MigrationEffort),
  }),
).annotate({
  identifier: "InstanceRecommendationOption",
}) as any as S.Schema<InstanceRecommendationOption>;
export type RecommendationOptions = InstanceRecommendationOption[];
export const RecommendationOptions = /*@__PURE__*/ S.Array(
  InstanceRecommendationOption,
);
export type RecommendationSourceArn = string;
export type RecommendationSourceType =
  | "Ec2Instance"
  | "AutoScalingGroup"
  | "EbsVolume"
  | "LambdaFunction"
  | "EcsService"
  | "License"
  | "RdsDBInstance"
  | "RdsDBInstanceStorage"
  | "AuroraDBClusterStorage"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export const RecommendationSourceType = /*@__PURE__*/ S.String;

export interface RecommendationSource {
  recommendationSourceArn?: string;
  recommendationSourceType?: RecommendationSourceType;
}
export const RecommendationSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationSourceArn: S.optional(S.String),
    recommendationSourceType: S.optional(RecommendationSourceType),
  }),
).annotate({
  identifier: "RecommendationSource",
}) as any as S.Schema<RecommendationSource>;
export type RecommendationSources = RecommendationSource[];
export const RecommendationSources =
  /*@__PURE__*/ S.Array(RecommendationSource);
export type InstanceState =
  | "pending"
  | "running"
  | "shutting-down"
  | "terminated"
  | "stopping"
  | "stopped"
  | (string & {});
export const InstanceState = /*@__PURE__*/ S.String;

export type ExternalMetricStatusCode =
  | "NO_EXTERNAL_METRIC_SET"
  | "INTEGRATION_SUCCESS"
  | "DATADOG_INTEGRATION_ERROR"
  | "DYNATRACE_INTEGRATION_ERROR"
  | "NEWRELIC_INTEGRATION_ERROR"
  | "INSTANA_INTEGRATION_ERROR"
  | "INSUFFICIENT_DATADOG_METRICS"
  | "INSUFFICIENT_DYNATRACE_METRICS"
  | "INSUFFICIENT_NEWRELIC_METRICS"
  | "INSUFFICIENT_INSTANA_METRICS"
  | (string & {});
export const ExternalMetricStatusCode = /*@__PURE__*/ S.String;

export type ExternalMetricStatusReason = string;
export interface ExternalMetricStatus {
  statusCode?: ExternalMetricStatusCode;
  statusReason?: string;
}
export const ExternalMetricStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(ExternalMetricStatusCode),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ExternalMetricStatus",
}) as any as S.Schema<ExternalMetricStatus>;
export type InstanceIdle = "True" | "False" | (string & {});
export const InstanceIdle = /*@__PURE__*/ S.String;

export interface InstanceRecommendation {
  instanceArn?: string;
  accountId?: string;
  instanceName?: string;
  currentInstanceType?: string;
  finding?: Finding;
  findingReasonCodes?: InstanceRecommendationFindingReasonCode[];
  utilizationMetrics?: UtilizationMetric[];
  lookBackPeriodInDays?: number;
  recommendationOptions?: InstanceRecommendationOption[];
  recommendationSources?: RecommendationSource[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences;
  inferredWorkloadTypes?: InferredWorkloadType[];
  instanceState?: InstanceState;
  tags?: Tag[];
  externalMetricStatus?: ExternalMetricStatus;
  currentInstanceGpuInfo?: GpuInfo;
  idle?: InstanceIdle;
}
export const InstanceRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceArn: S.optional(S.String),
    accountId: S.optional(S.String),
    instanceName: S.optional(S.String),
    currentInstanceType: S.optional(S.String),
    finding: S.optional(Finding),
    findingReasonCodes: S.optional(InstanceRecommendationFindingReasonCodes),
    utilizationMetrics: S.optional(UtilizationMetrics),
    lookBackPeriodInDays: S.optional(S.Number),
    recommendationOptions: S.optional(RecommendationOptions),
    recommendationSources: S.optional(RecommendationSources),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    currentPerformanceRisk: S.optional(CurrentPerformanceRisk),
    effectiveRecommendationPreferences: S.optional(
      EffectiveRecommendationPreferences,
    ),
    inferredWorkloadTypes: S.optional(InferredWorkloadTypes),
    instanceState: S.optional(InstanceState),
    tags: S.optional(Tags),
    externalMetricStatus: S.optional(ExternalMetricStatus),
    currentInstanceGpuInfo: S.optional(GpuInfo),
    idle: S.optional(InstanceIdle),
  }),
).annotate({
  identifier: "InstanceRecommendation",
}) as any as S.Schema<InstanceRecommendation>;
export type InstanceRecommendations = InstanceRecommendation[];
export const InstanceRecommendations = /*@__PURE__*/ S.Array(
  InstanceRecommendation,
);
export interface GetEC2InstanceRecommendationsResponse {
  nextToken?: string;
  instanceRecommendations?: InstanceRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetEC2InstanceRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      instanceRecommendations: S.optional(InstanceRecommendations),
      errors: S.optional(GetRecommendationErrors),
    }),
).annotate({
  identifier: "GetEC2InstanceRecommendationsResponse",
}) as any as S.Schema<GetEC2InstanceRecommendationsResponse>;
export type Period = number;
export interface GetEC2RecommendationProjectedMetricsRequest {
  instanceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences;
}
export const GetEC2RecommendationProjectedMetricsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      instanceArn: S.String,
      stat: MetricStatistic,
      period: S.Number,
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetEC2RecommendationProjectedMetricsRequest",
  }) as any as S.Schema<GetEC2RecommendationProjectedMetricsRequest>;
export type RecommendedInstanceType = string;
export type Timestamps = Date[];
export const Timestamps = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type MetricValues = number[];
export const MetricValues = /*@__PURE__*/ S.Array(S.Number);
export interface ProjectedMetric {
  name?: MetricName;
  timestamps?: Date[];
  values?: number[];
}
export const ProjectedMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(MetricName),
    timestamps: S.optional(Timestamps),
    values: S.optional(MetricValues),
  }),
).annotate({
  identifier: "ProjectedMetric",
}) as any as S.Schema<ProjectedMetric>;
export type ProjectedMetrics = ProjectedMetric[];
export const ProjectedMetrics = /*@__PURE__*/ S.Array(ProjectedMetric);
export interface RecommendedOptionProjectedMetric {
  recommendedInstanceType?: string;
  rank?: number;
  projectedMetrics?: ProjectedMetric[];
}
export const RecommendedOptionProjectedMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedInstanceType: S.optional(S.String),
    rank: S.optional(S.Number),
    projectedMetrics: S.optional(ProjectedMetrics),
  }),
).annotate({
  identifier: "RecommendedOptionProjectedMetric",
}) as any as S.Schema<RecommendedOptionProjectedMetric>;
export type RecommendedOptionProjectedMetrics =
  RecommendedOptionProjectedMetric[];
export const RecommendedOptionProjectedMetrics = /*@__PURE__*/ S.Array(
  RecommendedOptionProjectedMetric,
);
export interface GetEC2RecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RecommendedOptionProjectedMetric[];
}
export const GetEC2RecommendationProjectedMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendedOptionProjectedMetrics: S.optional(
        RecommendedOptionProjectedMetrics,
      ),
    }),
  ).annotate({
    identifier: "GetEC2RecommendationProjectedMetricsResponse",
  }) as any as S.Schema<GetEC2RecommendationProjectedMetricsResponse>;
export type ServiceArn = string;
export interface GetECSServiceRecommendationProjectedMetricsRequest {
  serviceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
}
export const GetECSServiceRecommendationProjectedMetricsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      serviceArn: S.String,
      stat: MetricStatistic,
      period: S.Number,
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetECSServiceRecommendationProjectedMetricsRequest",
  }) as any as S.Schema<GetECSServiceRecommendationProjectedMetricsRequest>;
export type CpuSize = number;
export type MemorySize = number;
export type ECSServiceMetricName = "Cpu" | "Memory" | (string & {});
export const ECSServiceMetricName = /*@__PURE__*/ S.String;

export interface ECSServiceProjectedMetric {
  name?: ECSServiceMetricName;
  timestamps?: Date[];
  upperBoundValues?: number[];
  lowerBoundValues?: number[];
}
export const ECSServiceProjectedMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ECSServiceMetricName),
    timestamps: S.optional(Timestamps),
    upperBoundValues: S.optional(MetricValues),
    lowerBoundValues: S.optional(MetricValues),
  }),
).annotate({
  identifier: "ECSServiceProjectedMetric",
}) as any as S.Schema<ECSServiceProjectedMetric>;
export type ECSServiceProjectedMetrics = ECSServiceProjectedMetric[];
export const ECSServiceProjectedMetrics = /*@__PURE__*/ S.Array(
  ECSServiceProjectedMetric,
);
export interface ECSServiceRecommendedOptionProjectedMetric {
  recommendedCpuUnits?: number;
  recommendedMemorySize?: number;
  projectedMetrics?: ECSServiceProjectedMetric[];
}
export const ECSServiceRecommendedOptionProjectedMetric =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendedCpuUnits: S.optional(S.Number),
      recommendedMemorySize: S.optional(S.Number),
      projectedMetrics: S.optional(ECSServiceProjectedMetrics),
    }),
  ).annotate({
    identifier: "ECSServiceRecommendedOptionProjectedMetric",
  }) as any as S.Schema<ECSServiceRecommendedOptionProjectedMetric>;
export type ECSServiceRecommendedOptionProjectedMetrics =
  ECSServiceRecommendedOptionProjectedMetric[];
export const ECSServiceRecommendedOptionProjectedMetrics =
  /*@__PURE__*/ S.Array(ECSServiceRecommendedOptionProjectedMetric);
export interface GetECSServiceRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: ECSServiceRecommendedOptionProjectedMetric[];
}
export const GetECSServiceRecommendationProjectedMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendedOptionProjectedMetrics: S.optional(
        ECSServiceRecommendedOptionProjectedMetrics,
      ),
    }),
  ).annotate({
    identifier: "GetECSServiceRecommendationProjectedMetricsResponse",
  }) as any as S.Schema<GetECSServiceRecommendationProjectedMetricsResponse>;
export type ServiceArns = string[];
export const ServiceArns = /*@__PURE__*/ S.Array(S.String);
export interface GetECSServiceRecommendationsRequest {
  serviceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: ECSServiceRecommendationFilter[];
  accountIds?: string[];
}
export const GetECSServiceRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArns: S.optional(ServiceArns),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(ECSServiceRecommendationFilters),
    accountIds: S.optional(AccountIds),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetECSServiceRecommendationsRequest",
}) as any as S.Schema<GetECSServiceRecommendationsRequest>;
export type NullableMemory = number;
export type NullableCpu = number;
export type ContainerName = string;
export type NullableMemoryReservation = number;
export interface MemorySizeConfiguration {
  memory?: number;
  memoryReservation?: number;
}
export const MemorySizeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memory: S.optional(S.Number),
    memoryReservation: S.optional(S.Number),
  }),
).annotate({
  identifier: "MemorySizeConfiguration",
}) as any as S.Schema<MemorySizeConfiguration>;
export interface ContainerConfiguration {
  containerName?: string;
  memorySizeConfiguration?: MemorySizeConfiguration;
  cpu?: number;
}
export const ContainerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    memorySizeConfiguration: S.optional(MemorySizeConfiguration),
    cpu: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContainerConfiguration",
}) as any as S.Schema<ContainerConfiguration>;
export type ContainerConfigurations = ContainerConfiguration[];
export const ContainerConfigurations = /*@__PURE__*/ S.Array(
  ContainerConfiguration,
);
export type AutoScalingConfiguration =
  | "TargetTrackingScalingCpu"
  | "TargetTrackingScalingMemory"
  | (string & {});
export const AutoScalingConfiguration = /*@__PURE__*/ S.String;

export type TaskDefinitionArn = string;
export interface ServiceConfiguration {
  memory?: number;
  cpu?: number;
  containerConfigurations?: ContainerConfiguration[];
  autoScalingConfiguration?: AutoScalingConfiguration;
  taskDefinitionArn?: string;
}
export const ServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memory: S.optional(S.Number),
    cpu: S.optional(S.Number),
    containerConfigurations: S.optional(ContainerConfigurations),
    autoScalingConfiguration: S.optional(AutoScalingConfiguration),
    taskDefinitionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceConfiguration",
}) as any as S.Schema<ServiceConfiguration>;
export type ECSServiceMetricStatistic = "Maximum" | "Average" | (string & {});
export const ECSServiceMetricStatistic = /*@__PURE__*/ S.String;

export interface ECSServiceUtilizationMetric {
  name?: ECSServiceMetricName;
  statistic?: ECSServiceMetricStatistic;
  value?: number;
}
export const ECSServiceUtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(ECSServiceMetricName),
    statistic: S.optional(ECSServiceMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "ECSServiceUtilizationMetric",
}) as any as S.Schema<ECSServiceUtilizationMetric>;
export type ECSServiceUtilizationMetrics = ECSServiceUtilizationMetric[];
export const ECSServiceUtilizationMetrics = /*@__PURE__*/ S.Array(
  ECSServiceUtilizationMetric,
);
export type ECSServiceLaunchType = "EC2" | "Fargate" | (string & {});
export const ECSServiceLaunchType = /*@__PURE__*/ S.String;

export type ECSServiceRecommendationFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | (string & {});
export const ECSServiceRecommendationFinding = /*@__PURE__*/ S.String;

export type ECSServiceRecommendationFindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "CPUOverprovisioned"
  | "CPUUnderprovisioned"
  | (string & {});
export const ECSServiceRecommendationFindingReasonCode = /*@__PURE__*/ S.String;

export type ECSServiceRecommendationFindingReasonCodes =
  ECSServiceRecommendationFindingReasonCode[];
export const ECSServiceRecommendationFindingReasonCodes = /*@__PURE__*/ S.Array(
  ECSServiceRecommendationFindingReasonCode,
);
export interface ECSEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const ECSEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "ECSEstimatedMonthlySavings",
}) as any as S.Schema<ECSEstimatedMonthlySavings>;
export interface ECSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: ECSEstimatedMonthlySavings;
}
export const ECSSavingsOpportunityAfterDiscounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsOpportunityPercentage: S.optional(S.Number),
    estimatedMonthlySavings: S.optional(ECSEstimatedMonthlySavings),
  }),
).annotate({
  identifier: "ECSSavingsOpportunityAfterDiscounts",
}) as any as S.Schema<ECSSavingsOpportunityAfterDiscounts>;
export type LowerBoundValue = number;
export type UpperBoundValue = number;
export interface ECSServiceProjectedUtilizationMetric {
  name?: ECSServiceMetricName;
  statistic?: ECSServiceMetricStatistic;
  lowerBoundValue?: number;
  upperBoundValue?: number;
}
export const ECSServiceProjectedUtilizationMetric = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(ECSServiceMetricName),
      statistic: S.optional(ECSServiceMetricStatistic),
      lowerBoundValue: S.optional(S.Number),
      upperBoundValue: S.optional(S.Number),
    }),
).annotate({
  identifier: "ECSServiceProjectedUtilizationMetric",
}) as any as S.Schema<ECSServiceProjectedUtilizationMetric>;
export type ECSServiceProjectedUtilizationMetrics =
  ECSServiceProjectedUtilizationMetric[];
export const ECSServiceProjectedUtilizationMetrics = /*@__PURE__*/ S.Array(
  ECSServiceProjectedUtilizationMetric,
);
export interface ContainerRecommendation {
  containerName?: string;
  memorySizeConfiguration?: MemorySizeConfiguration;
  cpu?: number;
}
export const ContainerRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    containerName: S.optional(S.String),
    memorySizeConfiguration: S.optional(MemorySizeConfiguration),
    cpu: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContainerRecommendation",
}) as any as S.Schema<ContainerRecommendation>;
export type ContainerRecommendations = ContainerRecommendation[];
export const ContainerRecommendations = /*@__PURE__*/ S.Array(
  ContainerRecommendation,
);
export interface ECSServiceRecommendationOption {
  memory?: number;
  cpu?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: ECSSavingsOpportunityAfterDiscounts;
  projectedUtilizationMetrics?: ECSServiceProjectedUtilizationMetric[];
  containerRecommendations?: ContainerRecommendation[];
}
export const ECSServiceRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memory: S.optional(S.Number),
    cpu: S.optional(S.Number),
    savingsOpportunity: S.optional(SavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      ECSSavingsOpportunityAfterDiscounts,
    ),
    projectedUtilizationMetrics: S.optional(
      ECSServiceProjectedUtilizationMetrics,
    ),
    containerRecommendations: S.optional(ContainerRecommendations),
  }),
).annotate({
  identifier: "ECSServiceRecommendationOption",
}) as any as S.Schema<ECSServiceRecommendationOption>;
export type ECSServiceRecommendationOptions = ECSServiceRecommendationOption[];
export const ECSServiceRecommendationOptions = /*@__PURE__*/ S.Array(
  ECSServiceRecommendationOption,
);
export type ECSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export const ECSSavingsEstimationModeSource = /*@__PURE__*/ S.String;

export interface ECSSavingsEstimationMode {
  source?: ECSSavingsEstimationModeSource;
}
export const ECSSavingsEstimationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(ECSSavingsEstimationModeSource) }),
).annotate({
  identifier: "ECSSavingsEstimationMode",
}) as any as S.Schema<ECSSavingsEstimationMode>;
export interface ECSEffectiveRecommendationPreferences {
  savingsEstimationMode?: ECSSavingsEstimationMode;
  lookBackPeriod?: LookBackPeriodPreference;
}
export const ECSEffectiveRecommendationPreferences = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsEstimationMode: S.optional(ECSSavingsEstimationMode),
      lookBackPeriod: S.optional(LookBackPeriodPreference),
    }),
).annotate({
  identifier: "ECSEffectiveRecommendationPreferences",
}) as any as S.Schema<ECSEffectiveRecommendationPreferences>;
export interface ECSServiceRecommendation {
  serviceArn?: string;
  accountId?: string;
  currentServiceConfiguration?: ServiceConfiguration;
  utilizationMetrics?: ECSServiceUtilizationMetric[];
  lookbackPeriodInDays?: number;
  launchType?: ECSServiceLaunchType;
  lastRefreshTimestamp?: Date;
  finding?: ECSServiceRecommendationFinding;
  findingReasonCodes?: ECSServiceRecommendationFindingReasonCode[];
  serviceRecommendationOptions?: ECSServiceRecommendationOption[];
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: ECSEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export const ECSServiceRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String),
    accountId: S.optional(S.String),
    currentServiceConfiguration: S.optional(ServiceConfiguration),
    utilizationMetrics: S.optional(ECSServiceUtilizationMetrics),
    lookbackPeriodInDays: S.optional(S.Number),
    launchType: S.optional(ECSServiceLaunchType),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    finding: S.optional(ECSServiceRecommendationFinding),
    findingReasonCodes: S.optional(ECSServiceRecommendationFindingReasonCodes),
    serviceRecommendationOptions: S.optional(ECSServiceRecommendationOptions),
    currentPerformanceRisk: S.optional(CurrentPerformanceRisk),
    effectiveRecommendationPreferences: S.optional(
      ECSEffectiveRecommendationPreferences,
    ),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "ECSServiceRecommendation",
}) as any as S.Schema<ECSServiceRecommendation>;
export type ECSServiceRecommendations = ECSServiceRecommendation[];
export const ECSServiceRecommendations = /*@__PURE__*/ S.Array(
  ECSServiceRecommendation,
);
export interface GetECSServiceRecommendationsResponse {
  nextToken?: string;
  ecsServiceRecommendations?: ECSServiceRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetECSServiceRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      ecsServiceRecommendations: S.optional(ECSServiceRecommendations),
      errors: S.optional(GetRecommendationErrors),
    }),
).annotate({
  identifier: "GetECSServiceRecommendationsResponse",
}) as any as S.Schema<GetECSServiceRecommendationsResponse>;
export type ResourceArn = string;
export interface GetEffectiveRecommendationPreferencesRequest {
  resourceArn: string;
}
export const GetEffectiveRecommendationPreferencesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ resourceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetEffectiveRecommendationPreferencesRequest",
  }) as any as S.Schema<GetEffectiveRecommendationPreferencesRequest>;
export interface GetEffectiveRecommendationPreferencesResponse {
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
}
export const GetEffectiveRecommendationPreferencesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      enhancedInfrastructureMetrics: S.optional(EnhancedInfrastructureMetrics),
      externalMetricsPreference: S.optional(ExternalMetricsPreference),
      lookBackPeriod: S.optional(LookBackPeriodPreference),
      utilizationPreferences: S.optional(UtilizationPreferences),
      preferredResources: S.optional(EffectivePreferredResources),
    }),
  ).annotate({
    identifier: "GetEffectiveRecommendationPreferencesResponse",
  }) as any as S.Schema<GetEffectiveRecommendationPreferencesResponse>;
export interface GetEnrollmentStatusRequest {}
export const GetEnrollmentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnrollmentStatusRequest",
}) as any as S.Schema<GetEnrollmentStatusRequest>;
export type Status =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Failed"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export type StatusReason = string;
export type MemberAccountsEnrolled = boolean;
export type NumberOfMemberAccountsOptedIn = number;
export interface GetEnrollmentStatusResponse {
  status?: Status;
  statusReason?: string;
  memberAccountsEnrolled?: boolean;
  lastUpdatedTimestamp?: Date;
  numberOfMemberAccountsOptedIn?: number;
}
export const GetEnrollmentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(Status),
    statusReason: S.optional(S.String),
    memberAccountsEnrolled: S.optional(S.Boolean),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    numberOfMemberAccountsOptedIn: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetEnrollmentStatusResponse",
}) as any as S.Schema<GetEnrollmentStatusResponse>;
export type EnrollmentFilterName = "Status" | (string & {});
export const EnrollmentFilterName = /*@__PURE__*/ S.String;

export interface EnrollmentFilter {
  name?: EnrollmentFilterName;
  values?: string[];
}
export const EnrollmentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(EnrollmentFilterName),
    values: S.optional(FilterValues),
  }),
).annotate({
  identifier: "EnrollmentFilter",
}) as any as S.Schema<EnrollmentFilter>;
export type EnrollmentFilters = EnrollmentFilter[];
export const EnrollmentFilters = /*@__PURE__*/ S.Array(EnrollmentFilter);
export interface GetEnrollmentStatusesForOrganizationRequest {
  filters?: EnrollmentFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const GetEnrollmentStatusesForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      filters: S.optional(EnrollmentFilters),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetEnrollmentStatusesForOrganizationRequest",
  }) as any as S.Schema<GetEnrollmentStatusesForOrganizationRequest>;
export interface AccountEnrollmentStatus {
  accountId?: string;
  status?: Status;
  statusReason?: string;
  lastUpdatedTimestamp?: Date;
}
export const AccountEnrollmentStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    status: S.optional(Status),
    statusReason: S.optional(S.String),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AccountEnrollmentStatus",
}) as any as S.Schema<AccountEnrollmentStatus>;
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export const AccountEnrollmentStatuses = /*@__PURE__*/ S.Array(
  AccountEnrollmentStatus,
);
export interface GetEnrollmentStatusesForOrganizationResponse {
  accountEnrollmentStatuses?: AccountEnrollmentStatus[];
  nextToken?: string;
}
export const GetEnrollmentStatusesForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      accountEnrollmentStatuses: S.optional(AccountEnrollmentStatuses),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetEnrollmentStatusesForOrganizationResponse",
  }) as any as S.Schema<GetEnrollmentStatusesForOrganizationResponse>;
export type ResourceArns = string[];
export const ResourceArns = /*@__PURE__*/ S.Array(S.String);
export type IdleMaxResults = number;
export type Dimension =
  | "SavingsValue"
  | "SavingsValueAfterDiscount"
  | (string & {});
export const Dimension = /*@__PURE__*/ S.String;

export type Order = "Asc" | "Desc" | (string & {});
export const Order = /*@__PURE__*/ S.String;

export interface OrderBy {
  dimension?: Dimension;
  order?: Order;
}
export const OrderBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dimension: S.optional(Dimension), order: S.optional(Order) }),
).annotate({ identifier: "OrderBy" }) as any as S.Schema<OrderBy>;
export interface GetIdleRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: IdleRecommendationFilter[];
  accountIds?: string[];
  orderBy?: OrderBy;
}
export const GetIdleRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArns: S.optional(ResourceArns),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(IdleRecommendationFilters),
    accountIds: S.optional(AccountIds),
    orderBy: S.optional(OrderBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetIdleRecommendationsRequest",
}) as any as S.Schema<GetIdleRecommendationsRequest>;
export type ResourceId = string;
export type IdleRecommendationResourceType =
  | "EC2Instance"
  | "AutoScalingGroup"
  | "EBSVolume"
  | "ECSService"
  | "RDSDBInstance"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export const IdleRecommendationResourceType = /*@__PURE__*/ S.String;

export type IdleFinding = "Idle" | "Unattached" | "Unused" | (string & {});
export const IdleFinding = /*@__PURE__*/ S.String;

export type IdleFindingDescription = string;
export interface IdleEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const IdleEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "IdleEstimatedMonthlySavings",
}) as any as S.Schema<IdleEstimatedMonthlySavings>;
export interface IdleSavingsOpportunity {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings;
}
export const IdleSavingsOpportunity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsOpportunityPercentage: S.optional(S.Number),
    estimatedMonthlySavings: S.optional(IdleEstimatedMonthlySavings),
  }),
).annotate({
  identifier: "IdleSavingsOpportunity",
}) as any as S.Schema<IdleSavingsOpportunity>;
export interface IdleSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings;
}
export const IdleSavingsOpportunityAfterDiscounts = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(IdleEstimatedMonthlySavings),
    }),
).annotate({
  identifier: "IdleSavingsOpportunityAfterDiscounts",
}) as any as S.Schema<IdleSavingsOpportunityAfterDiscounts>;
export type IdleMetricName =
  | "CPU"
  | "Memory"
  | "NetworkOutBytesPerSecond"
  | "NetworkInBytesPerSecond"
  | "DatabaseConnections"
  | "EBSVolumeReadIOPS"
  | "EBSVolumeWriteIOPS"
  | "VolumeReadOpsPerSecond"
  | "VolumeWriteOpsPerSecond"
  | "ActiveConnectionCount"
  | "PacketsInFromSource"
  | "PacketsInFromDestination"
  | "ConsumedReadCapacityUnits"
  | "ConsumedWriteCapacityUnits"
  | "ConsumedChangeDataCaptureUnits"
  | "NewConnections"
  | "EngineCPUUtilization"
  | "CacheHits"
  | "CacheMisses"
  | "KeyspaceHits"
  | "KeyspaceMisses"
  | "IsIdle"
  | "UserConnected"
  | "Invocations"
  | "GetTypeCmds"
  | "SetTypeCmds"
  | "ElastiCacheProcessingUnits"
  | "CurrConnections"
  | (string & {});
export const IdleMetricName = /*@__PURE__*/ S.String;

export type IdleDimensionKey = string;
export type IdleDimensionValue = string;
export type IdleDimensionValues = string[];
export const IdleDimensionValues = /*@__PURE__*/ S.Array(S.String);
export interface IdleDimension {
  key?: string;
  values?: string[];
}
export const IdleDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    values: S.optional(IdleDimensionValues),
  }),
).annotate({ identifier: "IdleDimension" }) as any as S.Schema<IdleDimension>;
export type IdleDimensions = IdleDimension[];
export const IdleDimensions = /*@__PURE__*/ S.Array(IdleDimension);
export interface IdleUtilizationMetric {
  name?: IdleMetricName;
  statistic?: MetricStatistic;
  value?: number;
  dimensions?: IdleDimension[];
}
export const IdleUtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(IdleMetricName),
    statistic: S.optional(MetricStatistic),
    value: S.optional(S.Number),
    dimensions: S.optional(IdleDimensions),
  }),
).annotate({
  identifier: "IdleUtilizationMetric",
}) as any as S.Schema<IdleUtilizationMetric>;
export type IdleUtilizationMetrics = IdleUtilizationMetric[];
export const IdleUtilizationMetrics = /*@__PURE__*/ S.Array(
  IdleUtilizationMetric,
);
export interface IdleRecommendation {
  resourceArn?: string;
  resourceId?: string;
  resourceType?: IdleRecommendationResourceType;
  accountId?: string;
  finding?: IdleFinding;
  findingDescription?: string;
  savingsOpportunity?: IdleSavingsOpportunity;
  savingsOpportunityAfterDiscounts?: IdleSavingsOpportunityAfterDiscounts;
  utilizationMetrics?: IdleUtilizationMetric[];
  lookBackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  tags?: Tag[];
}
export const IdleRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    resourceType: S.optional(IdleRecommendationResourceType),
    accountId: S.optional(S.String),
    finding: S.optional(IdleFinding),
    findingDescription: S.optional(S.String),
    savingsOpportunity: S.optional(IdleSavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      IdleSavingsOpportunityAfterDiscounts,
    ),
    utilizationMetrics: S.optional(IdleUtilizationMetrics),
    lookBackPeriodInDays: S.optional(S.Number),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "IdleRecommendation",
}) as any as S.Schema<IdleRecommendation>;
export type IdleRecommendations = IdleRecommendation[];
export const IdleRecommendations = /*@__PURE__*/ S.Array(IdleRecommendation);
export interface IdleRecommendationError {
  identifier?: string;
  code?: string;
  message?: string;
  resourceType?: IdleRecommendationResourceType;
}
export const IdleRecommendationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    code: S.optional(S.String),
    message: S.optional(S.String),
    resourceType: S.optional(IdleRecommendationResourceType),
  }),
).annotate({
  identifier: "IdleRecommendationError",
}) as any as S.Schema<IdleRecommendationError>;
export type IdleRecommendationErrors = IdleRecommendationError[];
export const IdleRecommendationErrors = /*@__PURE__*/ S.Array(
  IdleRecommendationError,
);
export interface GetIdleRecommendationsResponse {
  nextToken?: string;
  idleRecommendations?: IdleRecommendation[];
  errors?: IdleRecommendationError[];
}
export const GetIdleRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    idleRecommendations: S.optional(IdleRecommendations),
    errors: S.optional(IdleRecommendationErrors),
  }),
).annotate({
  identifier: "GetIdleRecommendationsResponse",
}) as any as S.Schema<GetIdleRecommendationsResponse>;
export type FunctionArn = string;
export type FunctionArns = string[];
export const FunctionArns = /*@__PURE__*/ S.Array(S.String);
export interface GetLambdaFunctionRecommendationsRequest {
  functionArns?: string[];
  accountIds?: string[];
  filters?: LambdaFunctionRecommendationFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const GetLambdaFunctionRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      functionArns: S.optional(FunctionArns),
      accountIds: S.optional(AccountIds),
      filters: S.optional(LambdaFunctionRecommendationFilters),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetLambdaFunctionRecommendationsRequest",
}) as any as S.Schema<GetLambdaFunctionRecommendationsRequest>;
export type FunctionVersion = string;
export type NumberOfInvocations = number;
export type LambdaFunctionMetricName = "Duration" | "Memory" | (string & {});
export const LambdaFunctionMetricName = /*@__PURE__*/ S.String;

export type LambdaFunctionMetricStatistic =
  | "Maximum"
  | "Average"
  | (string & {});
export const LambdaFunctionMetricStatistic = /*@__PURE__*/ S.String;

export interface LambdaFunctionUtilizationMetric {
  name?: LambdaFunctionMetricName;
  statistic?: LambdaFunctionMetricStatistic;
  value?: number;
}
export const LambdaFunctionUtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(LambdaFunctionMetricName),
    statistic: S.optional(LambdaFunctionMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "LambdaFunctionUtilizationMetric",
}) as any as S.Schema<LambdaFunctionUtilizationMetric>;
export type LambdaFunctionUtilizationMetrics =
  LambdaFunctionUtilizationMetric[];
export const LambdaFunctionUtilizationMetrics = /*@__PURE__*/ S.Array(
  LambdaFunctionUtilizationMetric,
);
export type LambdaFunctionRecommendationFinding =
  | "Optimized"
  | "NotOptimized"
  | "Unavailable"
  | (string & {});
export const LambdaFunctionRecommendationFinding = /*@__PURE__*/ S.String;

export type LambdaFunctionRecommendationFindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "InsufficientData"
  | "Inconclusive"
  | (string & {});
export const LambdaFunctionRecommendationFindingReasonCode =
  /*@__PURE__*/ S.String;

export type LambdaFunctionRecommendationFindingReasonCodes =
  LambdaFunctionRecommendationFindingReasonCode[];
export const LambdaFunctionRecommendationFindingReasonCodes =
  /*@__PURE__*/ S.Array(LambdaFunctionRecommendationFindingReasonCode);
export type LambdaFunctionMemoryMetricName = "Duration" | (string & {});
export const LambdaFunctionMemoryMetricName = /*@__PURE__*/ S.String;

export type LambdaFunctionMemoryMetricStatistic =
  | "LowerBound"
  | "UpperBound"
  | "Expected"
  | (string & {});
export const LambdaFunctionMemoryMetricStatistic = /*@__PURE__*/ S.String;

export interface LambdaFunctionMemoryProjectedMetric {
  name?: LambdaFunctionMemoryMetricName;
  statistic?: LambdaFunctionMemoryMetricStatistic;
  value?: number;
}
export const LambdaFunctionMemoryProjectedMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(LambdaFunctionMemoryMetricName),
    statistic: S.optional(LambdaFunctionMemoryMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "LambdaFunctionMemoryProjectedMetric",
}) as any as S.Schema<LambdaFunctionMemoryProjectedMetric>;
export type LambdaFunctionMemoryProjectedMetrics =
  LambdaFunctionMemoryProjectedMetric[];
export const LambdaFunctionMemoryProjectedMetrics = /*@__PURE__*/ S.Array(
  LambdaFunctionMemoryProjectedMetric,
);
export interface LambdaEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const LambdaEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "LambdaEstimatedMonthlySavings",
}) as any as S.Schema<LambdaEstimatedMonthlySavings>;
export interface LambdaSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: LambdaEstimatedMonthlySavings;
}
export const LambdaSavingsOpportunityAfterDiscounts = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(LambdaEstimatedMonthlySavings),
    }),
).annotate({
  identifier: "LambdaSavingsOpportunityAfterDiscounts",
}) as any as S.Schema<LambdaSavingsOpportunityAfterDiscounts>;
export interface LambdaFunctionMemoryRecommendationOption {
  rank?: number;
  memorySize?: number;
  projectedUtilizationMetrics?: LambdaFunctionMemoryProjectedMetric[];
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: LambdaSavingsOpportunityAfterDiscounts;
}
export const LambdaFunctionMemoryRecommendationOption = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      rank: S.optional(S.Number),
      memorySize: S.optional(S.Number),
      projectedUtilizationMetrics: S.optional(
        LambdaFunctionMemoryProjectedMetrics,
      ),
      savingsOpportunity: S.optional(SavingsOpportunity),
      savingsOpportunityAfterDiscounts: S.optional(
        LambdaSavingsOpportunityAfterDiscounts,
      ),
    }),
).annotate({
  identifier: "LambdaFunctionMemoryRecommendationOption",
}) as any as S.Schema<LambdaFunctionMemoryRecommendationOption>;
export type LambdaFunctionMemoryRecommendationOptions =
  LambdaFunctionMemoryRecommendationOption[];
export const LambdaFunctionMemoryRecommendationOptions = /*@__PURE__*/ S.Array(
  LambdaFunctionMemoryRecommendationOption,
);
export type LambdaSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export const LambdaSavingsEstimationModeSource = /*@__PURE__*/ S.String;

export interface LambdaSavingsEstimationMode {
  source?: LambdaSavingsEstimationModeSource;
}
export const LambdaSavingsEstimationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(LambdaSavingsEstimationModeSource) }),
).annotate({
  identifier: "LambdaSavingsEstimationMode",
}) as any as S.Schema<LambdaSavingsEstimationMode>;
export interface LambdaEffectiveRecommendationPreferences {
  savingsEstimationMode?: LambdaSavingsEstimationMode;
}
export const LambdaEffectiveRecommendationPreferences = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsEstimationMode: S.optional(LambdaSavingsEstimationMode),
    }),
).annotate({
  identifier: "LambdaEffectiveRecommendationPreferences",
}) as any as S.Schema<LambdaEffectiveRecommendationPreferences>;
export interface LambdaFunctionRecommendation {
  functionArn?: string;
  functionVersion?: string;
  accountId?: string;
  currentMemorySize?: number;
  numberOfInvocations?: number;
  utilizationMetrics?: LambdaFunctionUtilizationMetric[];
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  finding?: LambdaFunctionRecommendationFinding;
  findingReasonCodes?: LambdaFunctionRecommendationFindingReasonCode[];
  memorySizeRecommendationOptions?: LambdaFunctionMemoryRecommendationOption[];
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: LambdaEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export const LambdaFunctionRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionArn: S.optional(S.String),
    functionVersion: S.optional(S.String),
    accountId: S.optional(S.String),
    currentMemorySize: S.optional(S.Number),
    numberOfInvocations: S.optional(S.Number),
    utilizationMetrics: S.optional(LambdaFunctionUtilizationMetrics),
    lookbackPeriodInDays: S.optional(S.Number),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    finding: S.optional(LambdaFunctionRecommendationFinding),
    findingReasonCodes: S.optional(
      LambdaFunctionRecommendationFindingReasonCodes,
    ),
    memorySizeRecommendationOptions: S.optional(
      LambdaFunctionMemoryRecommendationOptions,
    ),
    currentPerformanceRisk: S.optional(CurrentPerformanceRisk),
    effectiveRecommendationPreferences: S.optional(
      LambdaEffectiveRecommendationPreferences,
    ),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "LambdaFunctionRecommendation",
}) as any as S.Schema<LambdaFunctionRecommendation>;
export type LambdaFunctionRecommendations = LambdaFunctionRecommendation[];
export const LambdaFunctionRecommendations = /*@__PURE__*/ S.Array(
  LambdaFunctionRecommendation,
);
export interface GetLambdaFunctionRecommendationsResponse {
  nextToken?: string;
  lambdaFunctionRecommendations?: LambdaFunctionRecommendation[];
}
export const GetLambdaFunctionRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      lambdaFunctionRecommendations: S.optional(LambdaFunctionRecommendations),
    }),
).annotate({
  identifier: "GetLambdaFunctionRecommendationsResponse",
}) as any as S.Schema<GetLambdaFunctionRecommendationsResponse>;
export interface GetLicenseRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: LicenseRecommendationFilter[];
  accountIds?: string[];
}
export const GetLicenseRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArns: S.optional(ResourceArns),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(LicenseRecommendationFilters),
    accountIds: S.optional(AccountIds),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetLicenseRecommendationsRequest",
}) as any as S.Schema<GetLicenseRecommendationsRequest>;
export type NumberOfCores = number;
export type OperatingSystem = string;
export type LicenseEdition =
  | "Enterprise"
  | "Standard"
  | "Free"
  | "NoLicenseEditionFound"
  | (string & {});
export const LicenseEdition = /*@__PURE__*/ S.String;

export type LicenseName = "SQLServer" | (string & {});
export const LicenseName = /*@__PURE__*/ S.String;

export type LicenseModel =
  | "LicenseIncluded"
  | "BringYourOwnLicense"
  | (string & {});
export const LicenseModel = /*@__PURE__*/ S.String;

export type LicenseVersion = string;
export type MetricSourceProvider =
  | "CloudWatchApplicationInsights"
  | (string & {});
export const MetricSourceProvider = /*@__PURE__*/ S.String;

export type MetricProviderArn = string;
export interface MetricSource {
  provider?: MetricSourceProvider;
  providerArn?: string;
}
export const MetricSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: S.optional(MetricSourceProvider),
    providerArn: S.optional(S.String),
  }),
).annotate({ identifier: "MetricSource" }) as any as S.Schema<MetricSource>;
export type MetricsSource = MetricSource[];
export const MetricsSource = /*@__PURE__*/ S.Array(MetricSource);
export interface LicenseConfiguration {
  numberOfCores?: number;
  instanceType?: string;
  operatingSystem?: string;
  licenseEdition?: LicenseEdition;
  licenseName?: LicenseName;
  licenseModel?: LicenseModel;
  licenseVersion?: string;
  metricsSource?: MetricSource[];
}
export const LicenseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfCores: S.optional(S.Number),
    instanceType: S.optional(S.String),
    operatingSystem: S.optional(S.String),
    licenseEdition: S.optional(LicenseEdition),
    licenseName: S.optional(LicenseName),
    licenseModel: S.optional(LicenseModel),
    licenseVersion: S.optional(S.String),
    metricsSource: S.optional(MetricsSource),
  }),
).annotate({
  identifier: "LicenseConfiguration",
}) as any as S.Schema<LicenseConfiguration>;
export type LicenseFinding =
  | "InsufficientMetrics"
  | "Optimized"
  | "NotOptimized"
  | (string & {});
export const LicenseFinding = /*@__PURE__*/ S.String;

export type LicenseFindingReasonCode =
  | "InvalidCloudWatchApplicationInsightsSetup"
  | "CloudWatchApplicationInsightsError"
  | "LicenseOverprovisioned"
  | "Optimized"
  | (string & {});
export const LicenseFindingReasonCode = /*@__PURE__*/ S.String;

export type LicenseFindingReasonCodes = LicenseFindingReasonCode[];
export const LicenseFindingReasonCodes = /*@__PURE__*/ S.Array(
  LicenseFindingReasonCode,
);
export interface LicenseRecommendationOption {
  rank?: number;
  operatingSystem?: string;
  licenseEdition?: LicenseEdition;
  licenseModel?: LicenseModel;
  savingsOpportunity?: SavingsOpportunity;
}
export const LicenseRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rank: S.optional(S.Number),
    operatingSystem: S.optional(S.String),
    licenseEdition: S.optional(LicenseEdition),
    licenseModel: S.optional(LicenseModel),
    savingsOpportunity: S.optional(SavingsOpportunity),
  }),
).annotate({
  identifier: "LicenseRecommendationOption",
}) as any as S.Schema<LicenseRecommendationOption>;
export type LicenseRecommendationOptions = LicenseRecommendationOption[];
export const LicenseRecommendationOptions = /*@__PURE__*/ S.Array(
  LicenseRecommendationOption,
);
export interface LicenseRecommendation {
  resourceArn?: string;
  accountId?: string;
  currentLicenseConfiguration?: LicenseConfiguration;
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  finding?: LicenseFinding;
  findingReasonCodes?: LicenseFindingReasonCode[];
  licenseRecommendationOptions?: LicenseRecommendationOption[];
  tags?: Tag[];
}
export const LicenseRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    accountId: S.optional(S.String),
    currentLicenseConfiguration: S.optional(LicenseConfiguration),
    lookbackPeriodInDays: S.optional(S.Number),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    finding: S.optional(LicenseFinding),
    findingReasonCodes: S.optional(LicenseFindingReasonCodes),
    licenseRecommendationOptions: S.optional(LicenseRecommendationOptions),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "LicenseRecommendation",
}) as any as S.Schema<LicenseRecommendation>;
export type LicenseRecommendations = LicenseRecommendation[];
export const LicenseRecommendations = /*@__PURE__*/ S.Array(
  LicenseRecommendation,
);
export interface GetLicenseRecommendationsResponse {
  nextToken?: string;
  licenseRecommendations?: LicenseRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetLicenseRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    licenseRecommendations: S.optional(LicenseRecommendations),
    errors: S.optional(GetRecommendationErrors),
  }),
).annotate({
  identifier: "GetLicenseRecommendationsResponse",
}) as any as S.Schema<GetLicenseRecommendationsResponse>;
export interface GetRDSDatabaseRecommendationProjectedMetricsRequest {
  resourceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences;
}
export const GetRDSDatabaseRecommendationProjectedMetricsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resourceArn: S.String,
      stat: MetricStatistic,
      period: S.Number,
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetRDSDatabaseRecommendationProjectedMetricsRequest",
  }) as any as S.Schema<GetRDSDatabaseRecommendationProjectedMetricsRequest>;
export type RecommendedDBInstanceClass = string;
export type RDSDBMetricName =
  | "CPU"
  | "Memory"
  | "EBSVolumeStorageSpaceUtilization"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | "EBSVolumeReadIOPS"
  | "EBSVolumeWriteIOPS"
  | "EBSVolumeReadThroughput"
  | "EBSVolumeWriteThroughput"
  | "DatabaseConnections"
  | "StorageNetworkReceiveThroughput"
  | "StorageNetworkTransmitThroughput"
  | "AuroraMemoryHealthState"
  | "AuroraMemoryNumDeclinedSql"
  | "AuroraMemoryNumKillConnTotal"
  | "AuroraMemoryNumKillQueryTotal"
  | "ReadIOPSEphemeralStorage"
  | "WriteIOPSEphemeralStorage"
  | "VolumeReadIOPs"
  | "VolumeBytesUsed"
  | "VolumeWriteIOPs"
  | (string & {});
export const RDSDBMetricName = /*@__PURE__*/ S.String;

export interface RDSDatabaseProjectedMetric {
  name?: RDSDBMetricName;
  timestamps?: Date[];
  values?: number[];
}
export const RDSDatabaseProjectedMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(RDSDBMetricName),
    timestamps: S.optional(Timestamps),
    values: S.optional(MetricValues),
  }),
).annotate({
  identifier: "RDSDatabaseProjectedMetric",
}) as any as S.Schema<RDSDatabaseProjectedMetric>;
export type RDSDatabaseProjectedMetrics = RDSDatabaseProjectedMetric[];
export const RDSDatabaseProjectedMetrics = /*@__PURE__*/ S.Array(
  RDSDatabaseProjectedMetric,
);
export interface RDSDatabaseRecommendedOptionProjectedMetric {
  recommendedDBInstanceClass?: string;
  rank?: number;
  projectedMetrics?: RDSDatabaseProjectedMetric[];
}
export const RDSDatabaseRecommendedOptionProjectedMetric =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendedDBInstanceClass: S.optional(S.String),
      rank: S.optional(S.Number),
      projectedMetrics: S.optional(RDSDatabaseProjectedMetrics),
    }),
  ).annotate({
    identifier: "RDSDatabaseRecommendedOptionProjectedMetric",
  }) as any as S.Schema<RDSDatabaseRecommendedOptionProjectedMetric>;
export type RDSDatabaseRecommendedOptionProjectedMetrics =
  RDSDatabaseRecommendedOptionProjectedMetric[];
export const RDSDatabaseRecommendedOptionProjectedMetrics =
  /*@__PURE__*/ S.Array(RDSDatabaseRecommendedOptionProjectedMetric);
export interface GetRDSDatabaseRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RDSDatabaseRecommendedOptionProjectedMetric[];
}
export const GetRDSDatabaseRecommendationProjectedMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendedOptionProjectedMetrics: S.optional(
        RDSDatabaseRecommendedOptionProjectedMetrics,
      ),
    }),
  ).annotate({
    identifier: "GetRDSDatabaseRecommendationProjectedMetricsResponse",
  }) as any as S.Schema<GetRDSDatabaseRecommendationProjectedMetricsResponse>;
export interface GetRDSDatabaseRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: RDSDBRecommendationFilter[];
  accountIds?: string[];
  recommendationPreferences?: RecommendationPreferences;
}
export const GetRDSDatabaseRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArns: S.optional(ResourceArns),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
      filters: S.optional(RDSDBRecommendationFilters),
      accountIds: S.optional(AccountIds),
      recommendationPreferences: S.optional(RecommendationPreferences),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetRDSDatabaseRecommendationsRequest",
}) as any as S.Schema<GetRDSDatabaseRecommendationsRequest>;
export type Engine = string;
export type EngineVersion = string;
export type PromotionTier = number;
export type CurrentDBInstanceClass = string;
export type StorageType = string;
export type AllocatedStorage = number;
export type NullableIOPS = number;
export type NullableMaxAllocatedStorage = number;
export type NullableStorageThroughput = number;
export interface DBStorageConfiguration {
  storageType?: string;
  allocatedStorage?: number;
  iops?: number;
  maxAllocatedStorage?: number;
  storageThroughput?: number;
}
export const DBStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: S.optional(S.String),
    allocatedStorage: S.optional(S.Number),
    iops: S.optional(S.Number),
    maxAllocatedStorage: S.optional(S.Number),
    storageThroughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "DBStorageConfiguration",
}) as any as S.Schema<DBStorageConfiguration>;
export type DBClusterIdentifier = string;
export type Idle = "True" | "False" | (string & {});
export const Idle = /*@__PURE__*/ S.String;

export type RDSInstanceFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | (string & {});
export const RDSInstanceFinding = /*@__PURE__*/ S.String;

export type RDSStorageFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | "NotOptimized"
  | (string & {});
export const RDSStorageFinding = /*@__PURE__*/ S.String;

export type RDSInstanceFindingReasonCode =
  | "CPUOverprovisioned"
  | "NetworkBandwidthOverprovisioned"
  | "EBSIOPSOverprovisioned"
  | "EBSIOPSUnderprovisioned"
  | "EBSThroughputOverprovisioned"
  | "CPUUnderprovisioned"
  | "NetworkBandwidthUnderprovisioned"
  | "EBSThroughputUnderprovisioned"
  | "NewGenerationDBInstanceClassAvailable"
  | "NewEngineVersionAvailable"
  | "DBClusterWriterUnderprovisioned"
  | "MemoryUnderprovisioned"
  | "InstanceStorageReadIOPSUnderprovisioned"
  | "InstanceStorageWriteIOPSUnderprovisioned"
  | (string & {});
export const RDSInstanceFindingReasonCode = /*@__PURE__*/ S.String;

export type RDSInstanceFindingReasonCodes = RDSInstanceFindingReasonCode[];
export const RDSInstanceFindingReasonCodes = /*@__PURE__*/ S.Array(
  RDSInstanceFindingReasonCode,
);
export type RDSCurrentInstancePerformanceRisk =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export const RDSCurrentInstancePerformanceRisk = /*@__PURE__*/ S.String;

export type RDSEstimatedMonthlyVolumeIOPsCostVariation =
  | "None"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export const RDSEstimatedMonthlyVolumeIOPsCostVariation =
  /*@__PURE__*/ S.String;

export type RDSStorageFindingReasonCode =
  | "EBSVolumeAllocatedStorageUnderprovisioned"
  | "EBSVolumeThroughputUnderprovisioned"
  | "EBSVolumeIOPSOverprovisioned"
  | "EBSVolumeThroughputOverprovisioned"
  | "NewGenerationStorageTypeAvailable"
  | "DBClusterStorageOptionAvailable"
  | "DBClusterStorageSavingsAvailable"
  | (string & {});
export const RDSStorageFindingReasonCode = /*@__PURE__*/ S.String;

export type RDSStorageFindingReasonCodes = RDSStorageFindingReasonCode[];
export const RDSStorageFindingReasonCodes = /*@__PURE__*/ S.Array(
  RDSStorageFindingReasonCode,
);
export type DBInstanceClass = string;
export type RDSDBMetricStatistic =
  | "Maximum"
  | "Minimum"
  | "Average"
  | (string & {});
export const RDSDBMetricStatistic = /*@__PURE__*/ S.String;

export interface RDSDBUtilizationMetric {
  name?: RDSDBMetricName;
  statistic?: RDSDBMetricStatistic;
  value?: number;
}
export const RDSDBUtilizationMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(RDSDBMetricName),
    statistic: S.optional(RDSDBMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "RDSDBUtilizationMetric",
}) as any as S.Schema<RDSDBUtilizationMetric>;
export type RDSDBProjectedUtilizationMetrics = RDSDBUtilizationMetric[];
export const RDSDBProjectedUtilizationMetrics = /*@__PURE__*/ S.Array(
  RDSDBUtilizationMetric,
);
export interface RDSInstanceEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const RDSInstanceEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "RDSInstanceEstimatedMonthlySavings",
}) as any as S.Schema<RDSInstanceEstimatedMonthlySavings>;
export interface RDSInstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: RDSInstanceEstimatedMonthlySavings;
}
export const RDSInstanceSavingsOpportunityAfterDiscounts =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(RDSInstanceEstimatedMonthlySavings),
    }),
  ).annotate({
    identifier: "RDSInstanceSavingsOpportunityAfterDiscounts",
  }) as any as S.Schema<RDSInstanceSavingsOpportunityAfterDiscounts>;
export interface RDSDBInstanceRecommendationOption {
  dbInstanceClass?: string;
  projectedUtilizationMetrics?: RDSDBUtilizationMetric[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: RDSInstanceSavingsOpportunityAfterDiscounts;
}
export const RDSDBInstanceRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbInstanceClass: S.optional(S.String),
    projectedUtilizationMetrics: S.optional(RDSDBProjectedUtilizationMetrics),
    performanceRisk: S.optional(S.Number),
    rank: S.optional(S.Number),
    savingsOpportunity: S.optional(SavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      RDSInstanceSavingsOpportunityAfterDiscounts,
    ),
  }),
).annotate({
  identifier: "RDSDBInstanceRecommendationOption",
}) as any as S.Schema<RDSDBInstanceRecommendationOption>;
export type RDSDBInstanceRecommendationOptions =
  RDSDBInstanceRecommendationOption[];
export const RDSDBInstanceRecommendationOptions = /*@__PURE__*/ S.Array(
  RDSDBInstanceRecommendationOption,
);
export interface RDSStorageEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export const RDSStorageEstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currency: S.optional(Currency), value: S.optional(S.Number) }),
).annotate({
  identifier: "RDSStorageEstimatedMonthlySavings",
}) as any as S.Schema<RDSStorageEstimatedMonthlySavings>;
export interface RDSStorageSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: RDSStorageEstimatedMonthlySavings;
}
export const RDSStorageSavingsOpportunityAfterDiscounts =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      savingsOpportunityPercentage: S.optional(S.Number),
      estimatedMonthlySavings: S.optional(RDSStorageEstimatedMonthlySavings),
    }),
  ).annotate({
    identifier: "RDSStorageSavingsOpportunityAfterDiscounts",
  }) as any as S.Schema<RDSStorageSavingsOpportunityAfterDiscounts>;
export interface RDSDBStorageRecommendationOption {
  storageConfiguration?: DBStorageConfiguration;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: RDSStorageSavingsOpportunityAfterDiscounts;
  estimatedMonthlyVolumeIOPsCostVariation?: RDSEstimatedMonthlyVolumeIOPsCostVariation;
}
export const RDSDBStorageRecommendationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageConfiguration: S.optional(DBStorageConfiguration),
    rank: S.optional(S.Number),
    savingsOpportunity: S.optional(SavingsOpportunity),
    savingsOpportunityAfterDiscounts: S.optional(
      RDSStorageSavingsOpportunityAfterDiscounts,
    ),
    estimatedMonthlyVolumeIOPsCostVariation: S.optional(
      RDSEstimatedMonthlyVolumeIOPsCostVariation,
    ),
  }),
).annotate({
  identifier: "RDSDBStorageRecommendationOption",
}) as any as S.Schema<RDSDBStorageRecommendationOption>;
export type RDSDBStorageRecommendationOptions =
  RDSDBStorageRecommendationOption[];
export const RDSDBStorageRecommendationOptions = /*@__PURE__*/ S.Array(
  RDSDBStorageRecommendationOption,
);
export type RDSDBUtilizationMetrics = RDSDBUtilizationMetric[];
export const RDSDBUtilizationMetrics = /*@__PURE__*/ S.Array(
  RDSDBUtilizationMetric,
);
export type RDSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export const RDSSavingsEstimationModeSource = /*@__PURE__*/ S.String;

export interface RDSSavingsEstimationMode {
  source?: RDSSavingsEstimationModeSource;
}
export const RDSSavingsEstimationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(RDSSavingsEstimationModeSource) }),
).annotate({
  identifier: "RDSSavingsEstimationMode",
}) as any as S.Schema<RDSSavingsEstimationMode>;
export interface RDSEffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  lookBackPeriod?: LookBackPeriodPreference;
  savingsEstimationMode?: RDSSavingsEstimationMode;
}
export const RDSEffectiveRecommendationPreferences = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      cpuVendorArchitectures: S.optional(CpuVendorArchitectures),
      enhancedInfrastructureMetrics: S.optional(EnhancedInfrastructureMetrics),
      lookBackPeriod: S.optional(LookBackPeriodPreference),
      savingsEstimationMode: S.optional(RDSSavingsEstimationMode),
    }),
).annotate({
  identifier: "RDSEffectiveRecommendationPreferences",
}) as any as S.Schema<RDSEffectiveRecommendationPreferences>;
export interface RDSDBRecommendation {
  resourceArn?: string;
  accountId?: string;
  engine?: string;
  engineVersion?: string;
  promotionTier?: number;
  currentDBInstanceClass?: string;
  currentStorageConfiguration?: DBStorageConfiguration;
  dbClusterIdentifier?: string;
  idle?: Idle;
  instanceFinding?: RDSInstanceFinding;
  storageFinding?: RDSStorageFinding;
  instanceFindingReasonCodes?: RDSInstanceFindingReasonCode[];
  currentInstancePerformanceRisk?: RDSCurrentInstancePerformanceRisk;
  currentStorageEstimatedMonthlyVolumeIOPsCostVariation?: RDSEstimatedMonthlyVolumeIOPsCostVariation;
  storageFindingReasonCodes?: RDSStorageFindingReasonCode[];
  instanceRecommendationOptions?: RDSDBInstanceRecommendationOption[];
  storageRecommendationOptions?: RDSDBStorageRecommendationOption[];
  utilizationMetrics?: RDSDBUtilizationMetric[];
  effectiveRecommendationPreferences?: RDSEffectiveRecommendationPreferences;
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  tags?: Tag[];
}
export const RDSDBRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    accountId: S.optional(S.String),
    engine: S.optional(S.String),
    engineVersion: S.optional(S.String),
    promotionTier: S.optional(S.Number),
    currentDBInstanceClass: S.optional(S.String),
    currentStorageConfiguration: S.optional(DBStorageConfiguration),
    dbClusterIdentifier: S.optional(S.String),
    idle: S.optional(Idle),
    instanceFinding: S.optional(RDSInstanceFinding),
    storageFinding: S.optional(RDSStorageFinding),
    instanceFindingReasonCodes: S.optional(RDSInstanceFindingReasonCodes),
    currentInstancePerformanceRisk: S.optional(
      RDSCurrentInstancePerformanceRisk,
    ),
    currentStorageEstimatedMonthlyVolumeIOPsCostVariation: S.optional(
      RDSEstimatedMonthlyVolumeIOPsCostVariation,
    ),
    storageFindingReasonCodes: S.optional(RDSStorageFindingReasonCodes),
    instanceRecommendationOptions: S.optional(
      RDSDBInstanceRecommendationOptions,
    ),
    storageRecommendationOptions: S.optional(RDSDBStorageRecommendationOptions),
    utilizationMetrics: S.optional(RDSDBUtilizationMetrics),
    effectiveRecommendationPreferences: S.optional(
      RDSEffectiveRecommendationPreferences,
    ),
    lookbackPeriodInDays: S.optional(S.Number),
    lastRefreshTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "RDSDBRecommendation",
}) as any as S.Schema<RDSDBRecommendation>;
export type RDSDBRecommendations = RDSDBRecommendation[];
export const RDSDBRecommendations = /*@__PURE__*/ S.Array(RDSDBRecommendation);
export interface GetRDSDatabaseRecommendationsResponse {
  nextToken?: string;
  rdsDBRecommendations?: RDSDBRecommendation[];
  errors?: GetRecommendationError[];
}
export const GetRDSDatabaseRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      rdsDBRecommendations: S.optional(RDSDBRecommendations),
      errors: S.optional(GetRecommendationErrors),
    }),
).annotate({
  identifier: "GetRDSDatabaseRecommendationsResponse",
}) as any as S.Schema<GetRDSDatabaseRecommendationsResponse>;
export interface GetRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  nextToken?: string;
  maxResults?: number;
}
export const GetRecommendationPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: ResourceType,
    scope: S.optional(Scope),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRecommendationPreferencesRequest",
}) as any as S.Schema<GetRecommendationPreferencesRequest>;
export type SavingsEstimationMode =
  | "AfterDiscounts"
  | "BeforeDiscounts"
  | (string & {});
export const SavingsEstimationMode = /*@__PURE__*/ S.String;

export interface RecommendationPreferencesDetail {
  scope?: Scope;
  resourceType?: ResourceType;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
  savingsEstimationMode?: SavingsEstimationMode;
}
export const RecommendationPreferencesDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scope: S.optional(Scope),
    resourceType: S.optional(ResourceType),
    enhancedInfrastructureMetrics: S.optional(EnhancedInfrastructureMetrics),
    inferredWorkloadTypes: S.optional(InferredWorkloadTypesPreference),
    externalMetricsPreference: S.optional(ExternalMetricsPreference),
    lookBackPeriod: S.optional(LookBackPeriodPreference),
    utilizationPreferences: S.optional(UtilizationPreferences),
    preferredResources: S.optional(EffectivePreferredResources),
    savingsEstimationMode: S.optional(SavingsEstimationMode),
  }),
).annotate({
  identifier: "RecommendationPreferencesDetail",
}) as any as S.Schema<RecommendationPreferencesDetail>;
export type RecommendationPreferencesDetails =
  RecommendationPreferencesDetail[];
export const RecommendationPreferencesDetails = /*@__PURE__*/ S.Array(
  RecommendationPreferencesDetail,
);
export interface GetRecommendationPreferencesResponse {
  nextToken?: string;
  recommendationPreferencesDetails?: RecommendationPreferencesDetail[];
}
export const GetRecommendationPreferencesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      recommendationPreferencesDetails: S.optional(
        RecommendationPreferencesDetails,
      ),
    }),
).annotate({
  identifier: "GetRecommendationPreferencesResponse",
}) as any as S.Schema<GetRecommendationPreferencesResponse>;
export interface GetRecommendationSummariesRequest {
  accountIds?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const GetRecommendationSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIds),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRecommendationSummariesRequest",
}) as any as S.Schema<GetRecommendationSummariesRequest>;
export type SummaryValue = number;
export type FindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | (string & {});
export const FindingReasonCode = /*@__PURE__*/ S.String;

export interface ReasonCodeSummary {
  name?: FindingReasonCode;
  value?: number;
}
export const ReasonCodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(FindingReasonCode),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReasonCodeSummary",
}) as any as S.Schema<ReasonCodeSummary>;
export type ReasonCodeSummaries = ReasonCodeSummary[];
export const ReasonCodeSummaries = /*@__PURE__*/ S.Array(ReasonCodeSummary);
export interface Summary {
  name?: Finding;
  value?: number;
  reasonCodeSummaries?: ReasonCodeSummary[];
}
export const Summary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(Finding),
    value: S.optional(S.Number),
    reasonCodeSummaries: S.optional(ReasonCodeSummaries),
  }),
).annotate({ identifier: "Summary" }) as any as S.Schema<Summary>;
export type Summaries = Summary[];
export const Summaries = /*@__PURE__*/ S.Array(Summary);
export interface IdleSummary {
  name?: IdleFinding;
  value?: number;
}
export const IdleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(IdleFinding), value: S.optional(S.Number) }),
).annotate({ identifier: "IdleSummary" }) as any as S.Schema<IdleSummary>;
export type IdleSummaries = IdleSummary[];
export const IdleSummaries = /*@__PURE__*/ S.Array(IdleSummary);
export type High = number;
export type Medium = number;
export type Low = number;
export type VeryLow = number;
export interface CurrentPerformanceRiskRatings {
  high?: number;
  medium?: number;
  low?: number;
  veryLow?: number;
}
export const CurrentPerformanceRiskRatings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    high: S.optional(S.Number),
    medium: S.optional(S.Number),
    low: S.optional(S.Number),
    veryLow: S.optional(S.Number),
  }),
).annotate({
  identifier: "CurrentPerformanceRiskRatings",
}) as any as S.Schema<CurrentPerformanceRiskRatings>;
export interface InferredWorkloadSaving {
  inferredWorkloadTypes?: InferredWorkloadType[];
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const InferredWorkloadSaving = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inferredWorkloadTypes: S.optional(InferredWorkloadTypes),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({
  identifier: "InferredWorkloadSaving",
}) as any as S.Schema<InferredWorkloadSaving>;
export type InferredWorkloadSavings = InferredWorkloadSaving[];
export const InferredWorkloadSavings = /*@__PURE__*/ S.Array(
  InferredWorkloadSaving,
);
export interface RecommendationSummary {
  summaries?: Summary[];
  idleSummaries?: IdleSummary[];
  recommendationResourceType?: RecommendationSourceType;
  accountId?: string;
  savingsOpportunity?: SavingsOpportunity;
  idleSavingsOpportunity?: SavingsOpportunity;
  aggregatedSavingsOpportunity?: SavingsOpportunity;
  currentPerformanceRiskRatings?: CurrentPerformanceRiskRatings;
  inferredWorkloadSavings?: InferredWorkloadSaving[];
}
export const RecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(Summaries),
    idleSummaries: S.optional(IdleSummaries),
    recommendationResourceType: S.optional(RecommendationSourceType),
    accountId: S.optional(S.String),
    savingsOpportunity: S.optional(SavingsOpportunity),
    idleSavingsOpportunity: S.optional(SavingsOpportunity),
    aggregatedSavingsOpportunity: S.optional(SavingsOpportunity),
    currentPerformanceRiskRatings: S.optional(CurrentPerformanceRiskRatings),
    inferredWorkloadSavings: S.optional(InferredWorkloadSavings),
  }),
).annotate({
  identifier: "RecommendationSummary",
}) as any as S.Schema<RecommendationSummary>;
export type RecommendationSummaries = RecommendationSummary[];
export const RecommendationSummaries = /*@__PURE__*/ S.Array(
  RecommendationSummary,
);
export interface GetRecommendationSummariesResponse {
  nextToken?: string;
  recommendationSummaries?: RecommendationSummary[];
}
export const GetRecommendationSummariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    recommendationSummaries: S.optional(RecommendationSummaries),
  }),
).annotate({
  identifier: "GetRecommendationSummariesResponse",
}) as any as S.Schema<GetRecommendationSummariesResponse>;
export interface PreferredResource {
  name?: PreferredResourceName;
  includeList?: string[];
  excludeList?: string[];
}
export const PreferredResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(PreferredResourceName),
    includeList: S.optional(PreferredResourceValues),
    excludeList: S.optional(PreferredResourceValues),
  }),
).annotate({
  identifier: "PreferredResource",
}) as any as S.Schema<PreferredResource>;
export type PreferredResources = PreferredResource[];
export const PreferredResources = /*@__PURE__*/ S.Array(PreferredResource);
export interface PutRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: PreferredResource[];
  savingsEstimationMode?: SavingsEstimationMode;
}
export const PutRecommendationPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: ResourceType,
    scope: S.optional(Scope),
    enhancedInfrastructureMetrics: S.optional(EnhancedInfrastructureMetrics),
    inferredWorkloadTypes: S.optional(InferredWorkloadTypesPreference),
    externalMetricsPreference: S.optional(ExternalMetricsPreference),
    lookBackPeriod: S.optional(LookBackPeriodPreference),
    utilizationPreferences: S.optional(UtilizationPreferences),
    preferredResources: S.optional(PreferredResources),
    savingsEstimationMode: S.optional(SavingsEstimationMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutRecommendationPreferencesRequest",
}) as any as S.Schema<PutRecommendationPreferencesRequest>;
export interface PutRecommendationPreferencesResponse {}
export const PutRecommendationPreferencesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutRecommendationPreferencesResponse",
}) as any as S.Schema<PutRecommendationPreferencesResponse>;
export interface UpdateEnrollmentStatusRequest {
  status: Status;
  includeMemberAccounts?: boolean;
}
export const UpdateEnrollmentStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: Status,
    includeMemberAccounts: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEnrollmentStatusRequest",
}) as any as S.Schema<UpdateEnrollmentStatusRequest>;
export interface UpdateEnrollmentStatusResponse {
  status?: Status;
  statusReason?: string;
}
export const UpdateEnrollmentStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(Status), statusReason: S.optional(S.String) }),
).annotate({
  identifier: "UpdateEnrollmentStatusResponse",
}) as any as S.Schema<UpdateEnrollmentStatusResponse>;
export type ErrorMessage = string;
export type DeleteRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a recommendation preference, such as enhanced infrastructure metrics.
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const deleteRecommendationPreferences: API.OperationMethod<
  DeleteRecommendationPreferencesRequest,
  DeleteRecommendationPreferencesResponse,
  DeleteRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecommendationPreferencesRequest,
  output: DeleteRecommendationPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommendationPreferences",
}));

export type DescribeRecommendationExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes recommendation export jobs created in the last seven days.
 *
 * Use the ExportAutoScalingGroupRecommendations or ExportEC2InstanceRecommendations actions to request an export of your
 * recommendations. Then use the DescribeRecommendationExportJobs action
 * to view your export jobs.
 */
export const describeRecommendationExportJobs: API.PaginatedOperationMethod<
  DescribeRecommendationExportJobsRequest,
  DescribeRecommendationExportJobsResponse,
  DescribeRecommendationExportJobsError,
  Credentials | HttpClient.HttpClient,
  RecommendationExportJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRecommendationExportJobsRequest,
  output: DescribeRecommendationExportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendationExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ExportAutoScalingGroupRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Auto Scaling groups.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Auto Scaling group export job in progress per Amazon Web Services Region.
 */
export const exportAutoScalingGroupRecommendations: API.OperationMethod<
  ExportAutoScalingGroupRecommendationsRequest,
  ExportAutoScalingGroupRecommendationsResponse,
  ExportAutoScalingGroupRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportAutoScalingGroupRecommendationsRequest,
  output: ExportAutoScalingGroupRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportAutoScalingGroupRecommendations",
}));

export type ExportEBSVolumeRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon EBS volumes.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon EBS volume export job in progress per Amazon Web Services Region.
 */
export const exportEBSVolumeRecommendations: API.OperationMethod<
  ExportEBSVolumeRecommendationsRequest,
  ExportEBSVolumeRecommendationsResponse,
  ExportEBSVolumeRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportEBSVolumeRecommendationsRequest,
  output: ExportEBSVolumeRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportEBSVolumeRecommendations",
}));

export type ExportEC2InstanceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon EC2 instances.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon EC2 instance export job in progress per Amazon Web Services Region.
 */
export const exportEC2InstanceRecommendations: API.OperationMethod<
  ExportEC2InstanceRecommendationsRequest,
  ExportEC2InstanceRecommendationsResponse,
  ExportEC2InstanceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportEC2InstanceRecommendationsRequest,
  output: ExportEC2InstanceRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportEC2InstanceRecommendations",
}));

export type ExportECSServiceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon ECS services on Fargate.
 *
 * Recommendations are exported in a CSV file, and its metadata
 * in a JSON file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can only have one Amazon ECS service export job in progress per Amazon Web Services Region.
 */
export const exportECSServiceRecommendations: API.OperationMethod<
  ExportECSServiceRecommendationsRequest,
  ExportECSServiceRecommendationsResponse,
  ExportECSServiceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportECSServiceRecommendationsRequest,
  output: ExportECSServiceRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportECSServiceRecommendations",
}));

export type ExportIdleRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your idle resources.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one idle resource export job in progress per Amazon Web Services Region.
 */
export const exportIdleRecommendations: API.OperationMethod<
  ExportIdleRecommendationsRequest,
  ExportIdleRecommendationsResponse,
  ExportIdleRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportIdleRecommendationsRequest,
  output: ExportIdleRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportIdleRecommendations",
}));

export type ExportLambdaFunctionRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Lambda functions.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Lambda function export job in progress per Amazon Web Services Region.
 */
export const exportLambdaFunctionRecommendations: API.OperationMethod<
  ExportLambdaFunctionRecommendationsRequest,
  ExportLambdaFunctionRecommendationsResponse,
  ExportLambdaFunctionRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportLambdaFunctionRecommendationsRequest,
  output: ExportLambdaFunctionRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportLambdaFunctionRecommendations",
}));

export type ExportLicenseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your licenses.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one license export job in progress per Amazon Web Services Region.
 */
export const exportLicenseRecommendations: API.OperationMethod<
  ExportLicenseRecommendationsRequest,
  ExportLicenseRecommendationsResponse,
  ExportLicenseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportLicenseRecommendationsRequest,
  output: ExportLicenseRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportLicenseRecommendations",
}));

export type ExportRDSDatabaseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your Amazon Aurora and Amazon Relational Database Service (Amazon RDS) databases.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon Aurora or RDS export job in progress per Amazon Web Services Region.
 */
export const exportRDSDatabaseRecommendations: API.OperationMethod<
  ExportRDSDatabaseRecommendationsRequest,
  ExportRDSDatabaseRecommendationsResponse,
  ExportRDSDatabaseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportRDSDatabaseRecommendationsRequest,
  output: ExportRDSDatabaseRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportRDSDatabaseRecommendations",
}));

export type GetAutoScalingGroupRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Auto Scaling group recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon EC2 Auto Scaling groups that
 * meet a specific set of requirements. For more information, see the Supported
 * resources and requirements in the Compute Optimizer User
 * Guide.
 */
export const getAutoScalingGroupRecommendations: API.OperationMethod<
  GetAutoScalingGroupRecommendationsRequest,
  GetAutoScalingGroupRecommendationsResponse,
  GetAutoScalingGroupRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutoScalingGroupRecommendationsRequest,
  output: GetAutoScalingGroupRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoScalingGroupRecommendations",
}));

export type GetEBSVolumeRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon Elastic Block Store (Amazon EBS) volume recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon EBS volumes that
 * meet a specific set of requirements. For more information, see the Supported
 * resources and requirements in the Compute Optimizer User
 * Guide.
 */
export const getEBSVolumeRecommendations: API.OperationMethod<
  GetEBSVolumeRecommendationsRequest,
  GetEBSVolumeRecommendationsResponse,
  GetEBSVolumeRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEBSVolumeRecommendationsRequest,
  output: GetEBSVolumeRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEBSVolumeRecommendations",
}));

export type GetEC2InstanceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon EC2 instance recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon Elastic Compute Cloud (Amazon EC2) instances that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getEC2InstanceRecommendations: API.OperationMethod<
  GetEC2InstanceRecommendationsRequest,
  GetEC2InstanceRecommendationsResponse,
  GetEC2InstanceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEC2InstanceRecommendationsRequest,
  output: GetEC2InstanceRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEC2InstanceRecommendations",
}));

export type GetEC2RecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected utilization metrics of Amazon EC2 instance
 * recommendations.
 *
 * The `Cpu` and `Memory` metrics are the only projected
 * utilization metrics returned when you run this action. Additionally, the
 * `Memory` metric is returned only for resources that have the unified
 * CloudWatch agent installed on them. For more information, see Enabling Memory Utilization with the CloudWatch Agent.
 */
export const getEC2RecommendationProjectedMetrics: API.OperationMethod<
  GetEC2RecommendationProjectedMetricsRequest,
  GetEC2RecommendationProjectedMetricsResponse,
  GetEC2RecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEC2RecommendationProjectedMetricsRequest,
  output: GetEC2RecommendationProjectedMetricsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEC2RecommendationProjectedMetrics",
}));

export type GetECSServiceRecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected metrics of Amazon ECS service recommendations.
 */
export const getECSServiceRecommendationProjectedMetrics: API.OperationMethod<
  GetECSServiceRecommendationProjectedMetricsRequest,
  GetECSServiceRecommendationProjectedMetricsResponse,
  GetECSServiceRecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetECSServiceRecommendationProjectedMetricsRequest,
  output: GetECSServiceRecommendationProjectedMetricsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetECSServiceRecommendationProjectedMetrics",
}));

export type GetECSServiceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon ECS service recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon ECS services on
 * Fargate that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getECSServiceRecommendations: API.OperationMethod<
  GetECSServiceRecommendationsRequest,
  GetECSServiceRecommendationsResponse,
  GetECSServiceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetECSServiceRecommendationsRequest,
  output: GetECSServiceRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetECSServiceRecommendations",
}));

export type GetEffectiveRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the recommendation preferences that are in effect for a given resource, such
 * as enhanced infrastructure metrics. Considers all applicable preferences that you might
 * have set at the resource, account, and organization level.
 *
 * When you create a recommendation preference, you can set its status to
 * `Active` or `Inactive`. Use this action to view the
 * recommendation preferences that are in effect, or `Active`.
 */
export const getEffectiveRecommendationPreferences: API.OperationMethod<
  GetEffectiveRecommendationPreferencesRequest,
  GetEffectiveRecommendationPreferencesResponse,
  GetEffectiveRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEffectiveRecommendationPreferencesRequest,
  output: GetEffectiveRecommendationPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectiveRecommendationPreferences",
}));

export type GetEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the enrollment (opt in) status of an account to the Compute Optimizer
 * service.
 *
 * If the account is the management account of an organization, this action also confirms
 * the enrollment status of member accounts of the organization. Use the GetEnrollmentStatusesForOrganization action to get detailed information
 * about the enrollment status of member accounts of an organization.
 */
export const getEnrollmentStatus: API.OperationMethod<
  GetEnrollmentStatusRequest,
  GetEnrollmentStatusResponse,
  GetEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnrollmentStatusRequest,
  output: GetEnrollmentStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentStatus",
}));

export type GetEnrollmentStatusesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the Compute Optimizer enrollment (opt-in) status of organization member
 * accounts, if your account is an organization management account.
 *
 * To get the enrollment status of standalone accounts, use the GetEnrollmentStatus action.
 */
export const getEnrollmentStatusesForOrganization: API.PaginatedOperationMethod<
  GetEnrollmentStatusesForOrganizationRequest,
  GetEnrollmentStatusesForOrganizationResponse,
  GetEnrollmentStatusesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AccountEnrollmentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEnrollmentStatusesForOrganizationRequest,
  output: GetEnrollmentStatusesForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentStatusesForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountEnrollmentStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetIdleRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns idle resource recommendations. Compute Optimizer generates recommendations for
 * idle resources that meet a specific set of requirements. For more information, see
 * Resource requirements in the
 * *Compute Optimizer User Guide*
 */
export const getIdleRecommendations: API.OperationMethod<
  GetIdleRecommendationsRequest,
  GetIdleRecommendationsResponse,
  GetIdleRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdleRecommendationsRequest,
  output: GetIdleRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdleRecommendations",
}));

export type GetLambdaFunctionRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Lambda function recommendations.
 *
 * Compute Optimizer generates recommendations for functions that meet a specific set
 * of requirements. For more information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getLambdaFunctionRecommendations: API.PaginatedOperationMethod<
  GetLambdaFunctionRecommendationsRequest,
  GetLambdaFunctionRecommendationsResponse,
  GetLambdaFunctionRecommendationsError,
  Credentials | HttpClient.HttpClient,
  LambdaFunctionRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetLambdaFunctionRecommendationsRequest,
  output: GetLambdaFunctionRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLambdaFunctionRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lambdaFunctionRecommendations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetLicenseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns license recommendations for Amazon EC2 instances that run on a specific license.
 *
 * Compute Optimizer generates recommendations for licenses that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getLicenseRecommendations: API.OperationMethod<
  GetLicenseRecommendationsRequest,
  GetLicenseRecommendationsResponse,
  GetLicenseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseRecommendationsRequest,
  output: GetLicenseRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseRecommendations",
}));

export type GetRDSDatabaseRecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected metrics of Aurora and RDS database recommendations.
 */
export const getRDSDatabaseRecommendationProjectedMetrics: API.OperationMethod<
  GetRDSDatabaseRecommendationProjectedMetricsRequest,
  GetRDSDatabaseRecommendationProjectedMetricsResponse,
  GetRDSDatabaseRecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRDSDatabaseRecommendationProjectedMetricsRequest,
  output: GetRDSDatabaseRecommendationProjectedMetricsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDSDatabaseRecommendationProjectedMetrics",
}));

export type GetRDSDatabaseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon Aurora and RDS database recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon Aurora and RDS databases that
 * meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getRDSDatabaseRecommendations: API.OperationMethod<
  GetRDSDatabaseRecommendationsRequest,
  GetRDSDatabaseRecommendationsResponse,
  GetRDSDatabaseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRDSDatabaseRecommendationsRequest,
  output: GetRDSDatabaseRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDSDatabaseRecommendations",
}));

export type GetRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns existing recommendation preferences, such as enhanced infrastructure
 * metrics.
 *
 * Use the `scope` parameter to specify which preferences to return. You can
 * specify to return preferences for an organization, a specific account ID, or a specific
 * EC2 instance or Auto Scaling group Amazon Resource Name (ARN).
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const getRecommendationPreferences: API.PaginatedOperationMethod<
  GetRecommendationPreferencesRequest,
  GetRecommendationPreferencesResponse,
  GetRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient,
  RecommendationPreferencesDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRecommendationPreferencesRequest,
  output: GetRecommendationPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationPreferences",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationPreferencesDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetRecommendationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the optimization findings for an account.
 *
 * It returns the number of:
 *
 * - Amazon EC2 instances in an account that are
 * `Underprovisioned`, `Overprovisioned`, or
 * `Optimized`.
 *
 * - EC2Auto Scaling groups in an account that are `NotOptimized`, or
 * `Optimized`.
 *
 * - Amazon EBS volumes in an account that are `NotOptimized`,
 * or `Optimized`.
 *
 * - Lambda functions in an account that are `NotOptimized`,
 * or `Optimized`.
 *
 * - Amazon ECS services in an account that are `Underprovisioned`,
 * `Overprovisioned`, or `Optimized`.
 *
 * - Commercial software licenses in an account that are `InsufficientMetrics`,
 * `NotOptimized` or `Optimized`.
 *
 * - Amazon Aurora and Amazon RDS databases in an account that are `Underprovisioned`,
 * `Overprovisioned`, `Optimized`, or `NotOptimized`.
 */
export const getRecommendationSummaries: API.PaginatedOperationMethod<
  GetRecommendationSummariesRequest,
  GetRecommendationSummariesResponse,
  GetRecommendationSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRecommendationSummariesRequest,
  output: GetRecommendationSummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new recommendation preference or updates an existing recommendation
 * preference, such as enhanced infrastructure metrics.
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const putRecommendationPreferences: API.OperationMethod<
  PutRecommendationPreferencesRequest,
  PutRecommendationPreferencesResponse,
  PutRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRecommendationPreferencesRequest,
  output: PutRecommendationPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecommendationPreferences",
}));

export type UpdateEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the enrollment (opt in and opt out) status of an account to the Compute Optimizer service.
 *
 * If the account is a management account of an organization, this action can also be
 * used to enroll member accounts of the organization.
 *
 * You must have the appropriate permissions to opt in to Compute Optimizer, to view its
 * recommendations, and to opt out. For more information, see Controlling access with Amazon Web Services Identity and Access Management in the *Compute Optimizer User Guide*.
 *
 * When you opt in, Compute Optimizer automatically creates a service-linked role in your
 * account to access its data. For more information, see Using
 * Service-Linked Roles for Compute Optimizer in the *Compute Optimizer User Guide*.
 */
export const updateEnrollmentStatus: API.OperationMethod<
  UpdateEnrollmentStatusRequest,
  UpdateEnrollmentStatusResponse,
  UpdateEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnrollmentStatusRequest,
  output: UpdateEnrollmentStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentStatus",
}));
