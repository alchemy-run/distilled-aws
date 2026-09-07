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
  sdkId: "MigrationHubStrategy",
  serviceShapeName: "AWSMigrationHubStrategyRecommendation",
});
const auth = T.AwsAuthSigv4({ name: "migrationhub-strategy" });
const ver = T.ServiceVersion("2020-02-19");
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
              `https://migrationhub-strategy-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://migrationhub-strategy-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleLockClientException
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleLockClientException>()(
    "ServiceLinkedRoleLockClientException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationComponentId = string;
export interface GetApplicationComponentDetailsRequest {
  applicationComponentId: string;
}
export const GetApplicationComponentDetailsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationComponentId: S.String.pipe(
        T.HttpLabel("applicationComponentId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/get-applicationcomponent-details/{applicationComponentId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetApplicationComponentDetailsRequest",
}) as any as S.Schema<GetApplicationComponentDetailsRequest>;
export type ResourceId = string;
export type ResourceName = string;
export type TransformationToolName = string;
export type TranformationToolDescription = string;
export type TranformationToolInstallationLink = string;
export interface TransformationTool {
  name?: string;
  description?: string;
  tranformationToolInstallationLink?: string;
}
export const TransformationTool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    tranformationToolInstallationLink: S.optional(S.String),
  }),
).annotate({
  identifier: "TransformationTool",
}) as any as S.Schema<TransformationTool>;
export type TargetDestination = string;
export type Strategy = string;
export interface RecommendationSet {
  transformationTool?: TransformationTool;
  targetDestination?: string;
  strategy?: string;
}
export const RecommendationSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transformationTool: S.optional(TransformationTool),
    targetDestination: S.optional(S.String),
    strategy: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommendationSet",
}) as any as S.Schema<RecommendationSet>;
export type SrcCodeOrDbAnalysisStatus = string;
export type StatusMessage = string;
export type Severity = string;
export interface AntipatternSeveritySummary {
  severity?: string;
  count?: number;
}
export const AntipatternSeveritySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ severity: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({
  identifier: "AntipatternSeveritySummary",
}) as any as S.Schema<AntipatternSeveritySummary>;
export type ListAntipatternSeveritySummary = AntipatternSeveritySummary[];
export const ListAntipatternSeveritySummary = /*@__PURE__*/ S.Array(
  AntipatternSeveritySummary,
);
export interface DatabaseConfigDetail {
  secretName?: string;
}
export const DatabaseConfigDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretName: S.optional(S.String) }),
).annotate({
  identifier: "DatabaseConfigDetail",
}) as any as S.Schema<DatabaseConfigDetail>;
export interface SourceCodeRepository {
  repository?: string;
  branch?: string;
  versionControlType?: string;
  projectName?: string;
}
export const SourceCodeRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repository: S.optional(S.String),
    branch: S.optional(S.String),
    versionControlType: S.optional(S.String),
    projectName: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceCodeRepository",
}) as any as S.Schema<SourceCodeRepository>;
export type SourceCodeRepositories = SourceCodeRepository[];
export const SourceCodeRepositories =
  /*@__PURE__*/ S.Array(SourceCodeRepository);
export type AppType = string;
export type ResourceSubType = string;
export type InclusionStatus = string;
export type S3Bucket = string;
export type S3Key = string;
export interface S3Object {
  s3Bucket?: string;
  s3key?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S.optional(S.String), s3key: S.optional(S.String) }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export type AntipatternReportStatus = string;
export type ServerId = string;
export type RuntimeAnalysisStatus = string;
export type AppUnitErrorCategory = string;
export interface AppUnitError {
  appUnitErrorCategory?: string;
}
export const AppUnitError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appUnitErrorCategory: S.optional(S.String) }),
).annotate({ identifier: "AppUnitError" }) as any as S.Schema<AppUnitError>;
export type AnalysisType = string;
export type AnalysisStatusUnion =
  | { runtimeAnalysisStatus: string; srcCodeOrDbAnalysisStatus?: never }
  | { runtimeAnalysisStatus?: never; srcCodeOrDbAnalysisStatus: string };
export const AnalysisStatusUnion = /*@__PURE__*/ S.Union([
  S.Struct({ runtimeAnalysisStatus: S.String }),
  S.Struct({ srcCodeOrDbAnalysisStatus: S.String }),
]);
export type BinaryAnalyzerName = string;
export type RunTimeAnalyzerName = string;
export type SourceCodeAnalyzerName = string;
export type AnalyzerNameUnion =
  | {
      binaryAnalyzerName: string;
      runTimeAnalyzerName?: never;
      sourceCodeAnalyzerName?: never;
    }
  | {
      binaryAnalyzerName?: never;
      runTimeAnalyzerName: string;
      sourceCodeAnalyzerName?: never;
    }
  | {
      binaryAnalyzerName?: never;
      runTimeAnalyzerName?: never;
      sourceCodeAnalyzerName: string;
    };
export const AnalyzerNameUnion = /*@__PURE__*/ S.Union([
  S.Struct({ binaryAnalyzerName: S.String }),
  S.Struct({ runTimeAnalyzerName: S.String }),
  S.Struct({ sourceCodeAnalyzerName: S.String }),
]);
export interface AntipatternReportResult {
  analyzerName?: AnalyzerNameUnion;
  antiPatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
}
export const AntipatternReportResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analyzerName: S.optional(AnalyzerNameUnion),
    antiPatternReportS3Object: S.optional(S3Object),
    antipatternReportStatus: S.optional(S.String),
    antipatternReportStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AntipatternReportResult",
}) as any as S.Schema<AntipatternReportResult>;
export type AntipatternReportResultList = AntipatternReportResult[];
export const AntipatternReportResultList = /*@__PURE__*/ S.Array(
  AntipatternReportResult,
);
export interface Result {
  analysisType?: string;
  analysisStatus?: AnalysisStatusUnion;
  statusMessage?: string;
  antipatternReportResultList?: AntipatternReportResult[];
}
export const Result = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analysisType: S.optional(S.String),
    analysisStatus: S.optional(AnalysisStatusUnion),
    statusMessage: S.optional(S.String),
    antipatternReportResultList: S.optional(AntipatternReportResultList),
  }),
).annotate({ identifier: "Result" }) as any as S.Schema<Result>;
export type ResultList = Result[];
export const ResultList = /*@__PURE__*/ S.Array(Result);
export interface ApplicationComponentDetail {
  id?: string;
  name?: string;
  recommendationSet?: RecommendationSet;
  analysisStatus?: string;
  statusMessage?: string;
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  databaseConfigDetail?: DatabaseConfigDetail;
  sourceCodeRepositories?: SourceCodeRepository[];
  appType?: string;
  resourceSubType?: string;
  inclusionStatus?: string;
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  osVersion?: string;
  osDriver?: string;
  lastAnalyzedTimestamp?: Date;
  associatedServerId?: string;
  moreServerAssociationExists?: boolean;
  runtimeStatus?: string;
  runtimeStatusMessage?: string;
  appUnitError?: AppUnitError;
  resultList?: Result[];
}
export const ApplicationComponentDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    recommendationSet: S.optional(RecommendationSet),
    analysisStatus: S.optional(S.String),
    statusMessage: S.optional(S.String),
    listAntipatternSeveritySummary: S.optional(ListAntipatternSeveritySummary),
    databaseConfigDetail: S.optional(DatabaseConfigDetail),
    sourceCodeRepositories: S.optional(SourceCodeRepositories),
    appType: S.optional(S.String),
    resourceSubType: S.optional(S.String),
    inclusionStatus: S.optional(S.String),
    antipatternReportS3Object: S.optional(S3Object),
    antipatternReportStatus: S.optional(S.String),
    antipatternReportStatusMessage: S.optional(S.String),
    osVersion: S.optional(S.String),
    osDriver: S.optional(S.String),
    lastAnalyzedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    associatedServerId: S.optional(S.String),
    moreServerAssociationExists: S.optional(S.Boolean),
    runtimeStatus: S.optional(S.String),
    runtimeStatusMessage: S.optional(S.String),
    appUnitError: S.optional(AppUnitError),
    resultList: S.optional(ResultList),
  }),
).annotate({
  identifier: "ApplicationComponentDetail",
}) as any as S.Schema<ApplicationComponentDetail>;
export interface AssociatedApplication {
  name?: string;
  id?: string;
}
export const AssociatedApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "AssociatedApplication",
}) as any as S.Schema<AssociatedApplication>;
export type AssociatedApplications = AssociatedApplication[];
export const AssociatedApplications = /*@__PURE__*/ S.Array(
  AssociatedApplication,
);
export type AssociatedServerIDs = string[];
export const AssociatedServerIDs = /*@__PURE__*/ S.Array(S.String);
export interface GetApplicationComponentDetailsResponse {
  applicationComponentDetail?: ApplicationComponentDetail;
  associatedApplications?: AssociatedApplication[];
  moreApplicationResource?: boolean;
  associatedServerIds?: string[];
}
export const GetApplicationComponentDetailsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationComponentDetail: S.optional(ApplicationComponentDetail),
      associatedApplications: S.optional(AssociatedApplications),
      moreApplicationResource: S.optional(S.Boolean),
      associatedServerIds: S.optional(AssociatedServerIDs),
    }),
).annotate({
  identifier: "GetApplicationComponentDetailsResponse",
}) as any as S.Schema<GetApplicationComponentDetailsResponse>;
export interface GetApplicationComponentStrategiesRequest {
  applicationComponentId: string;
}
export const GetApplicationComponentStrategiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationComponentId: S.String.pipe(
        T.HttpLabel("applicationComponentId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/get-applicationcomponent-strategies/{applicationComponentId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetApplicationComponentStrategiesRequest",
}) as any as S.Schema<GetApplicationComponentStrategiesRequest>;
export type StrategyRecommendation = string;
export interface ApplicationComponentStrategy {
  recommendation?: RecommendationSet;
  status?: string;
  isPreferred?: boolean;
}
export const ApplicationComponentStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendation: S.optional(RecommendationSet),
    status: S.optional(S.String),
    isPreferred: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ApplicationComponentStrategy",
}) as any as S.Schema<ApplicationComponentStrategy>;
export type ApplicationComponentStrategies = ApplicationComponentStrategy[];
export const ApplicationComponentStrategies = /*@__PURE__*/ S.Array(
  ApplicationComponentStrategy,
);
export interface GetApplicationComponentStrategiesResponse {
  applicationComponentStrategies?: ApplicationComponentStrategy[];
}
export const GetApplicationComponentStrategiesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      applicationComponentStrategies: S.optional(
        ApplicationComponentStrategies,
      ),
    }),
  ).annotate({
    identifier: "GetApplicationComponentStrategiesResponse",
  }) as any as S.Schema<GetApplicationComponentStrategiesResponse>;
export type AsyncTaskId = string;
export interface GetAssessmentRequest {
  id: string;
}
export const GetAssessmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-assessment/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssessmentRequest",
}) as any as S.Schema<GetAssessmentRequest>;
export type AssessmentStatus = string;
export type AssessmentStatusMessage = string;
export interface DataCollectionDetails {
  status?: string;
  servers?: number;
  failed?: number;
  success?: number;
  inProgress?: number;
  startTime?: Date;
  completionTime?: Date;
  statusMessage?: string;
}
export const DataCollectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    servers: S.optional(S.Number),
    failed: S.optional(S.Number),
    success: S.optional(S.Number),
    inProgress: S.optional(S.Number),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "DataCollectionDetails",
}) as any as S.Schema<DataCollectionDetails>;
export type Condition = string;
export type AssessmentTargetValues = string[];
export const AssessmentTargetValues = /*@__PURE__*/ S.Array(S.String);
export interface AssessmentTarget {
  condition: string;
  name: string;
  values: string[];
}
export const AssessmentTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    condition: S.String,
    name: S.String,
    values: AssessmentTargetValues,
  }),
).annotate({
  identifier: "AssessmentTarget",
}) as any as S.Schema<AssessmentTarget>;
export type AssessmentTargets = AssessmentTarget[];
export const AssessmentTargets = /*@__PURE__*/ S.Array(AssessmentTarget);
export interface GetAssessmentResponse {
  id?: string;
  dataCollectionDetails?: DataCollectionDetails;
  assessmentTargets?: AssessmentTarget[];
}
export const GetAssessmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    dataCollectionDetails: S.optional(DataCollectionDetails),
    assessmentTargets: S.optional(AssessmentTargets),
  }),
).annotate({
  identifier: "GetAssessmentResponse",
}) as any as S.Schema<GetAssessmentResponse>;
export interface GetImportFileTaskRequest {
  id: string;
}
export const GetImportFileTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-import-file-task/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportFileTaskRequest",
}) as any as S.Schema<GetImportFileTaskRequest>;
export type ImportFileTaskStatus = string;
export type ImportS3Bucket = string;
export type ImportS3Key = string;
export interface GetImportFileTaskResponse {
  id?: string;
  status?: string;
  startTime?: Date;
  inputS3Bucket?: string;
  inputS3Key?: string;
  statusReportS3Bucket?: string;
  statusReportS3Key?: string;
  completionTime?: Date;
  numberOfRecordsSuccess?: number;
  numberOfRecordsFailed?: number;
  importName?: string;
}
export const GetImportFileTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inputS3Bucket: S.optional(S.String),
    inputS3Key: S.optional(S.String),
    statusReportS3Bucket: S.optional(S.String),
    statusReportS3Key: S.optional(S.String),
    completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    numberOfRecordsSuccess: S.optional(S.Number),
    numberOfRecordsFailed: S.optional(S.Number),
    importName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetImportFileTaskResponse",
}) as any as S.Schema<GetImportFileTaskResponse>;
export interface GetLatestAssessmentIdRequest {}
export const GetLatestAssessmentIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-latest-assessment-id" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLatestAssessmentIdRequest",
}) as any as S.Schema<GetLatestAssessmentIdRequest>;
export interface GetLatestAssessmentIdResponse {
  id?: string;
}
export const GetLatestAssessmentIdResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "GetLatestAssessmentIdResponse",
}) as any as S.Schema<GetLatestAssessmentIdResponse>;
export interface GetPortfolioPreferencesRequest {}
export const GetPortfolioPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-portfolio-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortfolioPreferencesRequest",
}) as any as S.Schema<GetPortfolioPreferencesRequest>;
export type BusinessGoalsInteger = number;
export interface BusinessGoals {
  speedOfMigration?: number;
  reduceOperationalOverheadWithManagedServices?: number;
  modernizeInfrastructureWithCloudNativeTechnologies?: number;
  licenseCostReduction?: number;
}
export const BusinessGoals = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    speedOfMigration: S.optional(S.Number),
    reduceOperationalOverheadWithManagedServices: S.optional(S.Number),
    modernizeInfrastructureWithCloudNativeTechnologies: S.optional(S.Number),
    licenseCostReduction: S.optional(S.Number),
  }),
).annotate({ identifier: "BusinessGoals" }) as any as S.Schema<BusinessGoals>;
export interface PrioritizeBusinessGoals {
  businessGoals?: BusinessGoals;
}
export const PrioritizeBusinessGoals = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ businessGoals: S.optional(BusinessGoals) }),
).annotate({
  identifier: "PrioritizeBusinessGoals",
}) as any as S.Schema<PrioritizeBusinessGoals>;
export type AwsManagedTargetDestination = string;
export type AwsManagedTargetDestinations = string[];
export const AwsManagedTargetDestinations = /*@__PURE__*/ S.Array(S.String);
export interface AwsManagedResources {
  targetDestination: string[];
}
export const AwsManagedResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDestination: AwsManagedTargetDestinations }),
).annotate({
  identifier: "AwsManagedResources",
}) as any as S.Schema<AwsManagedResources>;
export type SelfManageTargetDestination = string;
export type SelfManageTargetDestinations = string[];
export const SelfManageTargetDestinations = /*@__PURE__*/ S.Array(S.String);
export interface SelfManageResources {
  targetDestination: string[];
}
export const SelfManageResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDestination: SelfManageTargetDestinations }),
).annotate({
  identifier: "SelfManageResources",
}) as any as S.Schema<SelfManageResources>;
export type NoPreferenceTargetDestination = string;
export type NoPreferenceTargetDestinations = string[];
export const NoPreferenceTargetDestinations = /*@__PURE__*/ S.Array(S.String);
export interface NoManagementPreference {
  targetDestination: string[];
}
export const NoManagementPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDestination: NoPreferenceTargetDestinations }),
).annotate({
  identifier: "NoManagementPreference",
}) as any as S.Schema<NoManagementPreference>;
export type ManagementPreference =
  | {
      awsManagedResources: AwsManagedResources;
      selfManageResources?: never;
      noPreference?: never;
    }
  | {
      awsManagedResources?: never;
      selfManageResources: SelfManageResources;
      noPreference?: never;
    }
  | {
      awsManagedResources?: never;
      selfManageResources?: never;
      noPreference: NoManagementPreference;
    };
export const ManagementPreference = /*@__PURE__*/ S.Union([
  S.Struct({ awsManagedResources: AwsManagedResources }),
  S.Struct({ selfManageResources: SelfManageResources }),
  S.Struct({ noPreference: NoManagementPreference }),
]);
export interface ApplicationPreferences {
  managementPreference?: ManagementPreference;
}
export const ApplicationPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ managementPreference: S.optional(ManagementPreference) }),
).annotate({
  identifier: "ApplicationPreferences",
}) as any as S.Schema<ApplicationPreferences>;
export type DatabaseManagementPreference = string;
export type HeterogeneousTargetDatabaseEngine = string;
export type HeterogeneousTargetDatabaseEngines = string[];
export const HeterogeneousTargetDatabaseEngines = /*@__PURE__*/ S.Array(
  S.String,
);
export interface Heterogeneous {
  targetDatabaseEngine: string[];
}
export const Heterogeneous = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDatabaseEngine: HeterogeneousTargetDatabaseEngines }),
).annotate({ identifier: "Heterogeneous" }) as any as S.Schema<Heterogeneous>;
export type HomogeneousTargetDatabaseEngine = string;
export type HomogeneousTargetDatabaseEngines = string[];
export const HomogeneousTargetDatabaseEngines = /*@__PURE__*/ S.Array(S.String);
export interface Homogeneous {
  targetDatabaseEngine?: string[];
}
export const Homogeneous = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDatabaseEngine: S.optional(HomogeneousTargetDatabaseEngines),
  }),
).annotate({ identifier: "Homogeneous" }) as any as S.Schema<Homogeneous>;
export type TargetDatabaseEngine = string;
export type TargetDatabaseEngines = string[];
export const TargetDatabaseEngines = /*@__PURE__*/ S.Array(S.String);
export interface NoDatabaseMigrationPreference {
  targetDatabaseEngine: string[];
}
export const NoDatabaseMigrationPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDatabaseEngine: TargetDatabaseEngines }),
).annotate({
  identifier: "NoDatabaseMigrationPreference",
}) as any as S.Schema<NoDatabaseMigrationPreference>;
export type DatabaseMigrationPreference =
  | { heterogeneous: Heterogeneous; homogeneous?: never; noPreference?: never }
  | { heterogeneous?: never; homogeneous: Homogeneous; noPreference?: never }
  | {
      heterogeneous?: never;
      homogeneous?: never;
      noPreference: NoDatabaseMigrationPreference;
    };
export const DatabaseMigrationPreference = /*@__PURE__*/ S.Union([
  S.Struct({ heterogeneous: Heterogeneous }),
  S.Struct({ homogeneous: Homogeneous }),
  S.Struct({ noPreference: NoDatabaseMigrationPreference }),
]);
export interface DatabasePreferences {
  databaseManagementPreference?: string;
  databaseMigrationPreference?: DatabaseMigrationPreference;
}
export const DatabasePreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    databaseManagementPreference: S.optional(S.String),
    databaseMigrationPreference: S.optional(DatabaseMigrationPreference),
  }),
).annotate({
  identifier: "DatabasePreferences",
}) as any as S.Schema<DatabasePreferences>;
export type ApplicationMode = string;
export interface GetPortfolioPreferencesResponse {
  prioritizeBusinessGoals?: PrioritizeBusinessGoals;
  applicationPreferences?: ApplicationPreferences;
  databasePreferences?: DatabasePreferences;
  applicationMode?: string;
}
export const GetPortfolioPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prioritizeBusinessGoals: S.optional(PrioritizeBusinessGoals),
    applicationPreferences: S.optional(ApplicationPreferences),
    databasePreferences: S.optional(DatabasePreferences),
    applicationMode: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPortfolioPreferencesResponse",
}) as any as S.Schema<GetPortfolioPreferencesResponse>;
export interface GetPortfolioSummaryRequest {}
export const GetPortfolioSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-portfolio-summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortfolioSummaryRequest",
}) as any as S.Schema<GetPortfolioSummaryRequest>;
export interface StrategySummary {
  strategy?: string;
  count?: number;
}
export const StrategySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ strategy: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({
  identifier: "StrategySummary",
}) as any as S.Schema<StrategySummary>;
export type ListStrategySummary = StrategySummary[];
export const ListStrategySummary = /*@__PURE__*/ S.Array(StrategySummary);
export interface ApplicationComponentSummary {
  appType?: string;
  count?: number;
}
export const ApplicationComponentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appType: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({
  identifier: "ApplicationComponentSummary",
}) as any as S.Schema<ApplicationComponentSummary>;
export type ListApplicationComponentSummary = ApplicationComponentSummary[];
export const ListApplicationComponentSummary = /*@__PURE__*/ S.Array(
  ApplicationComponentSummary,
);
export type ServerOsType = string;
export interface ServerSummary {
  ServerOsType?: string;
  count?: number;
}
export const ServerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerOsType: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({ identifier: "ServerSummary" }) as any as S.Schema<ServerSummary>;
export type ListServerSummary = ServerSummary[];
export const ListServerSummary = /*@__PURE__*/ S.Array(ServerSummary);
export interface ApplicationComponentStatusSummary {
  srcCodeOrDbAnalysisStatus?: string;
  count?: number;
}
export const ApplicationComponentStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    srcCodeOrDbAnalysisStatus: S.optional(S.String),
    count: S.optional(S.Number),
  }),
).annotate({
  identifier: "ApplicationComponentStatusSummary",
}) as any as S.Schema<ApplicationComponentStatusSummary>;
export type ListApplicationComponentStatusSummary =
  ApplicationComponentStatusSummary[];
export const ListApplicationComponentStatusSummary = /*@__PURE__*/ S.Array(
  ApplicationComponentStatusSummary,
);
export type RunTimeAssessmentStatus = string;
export interface ServerStatusSummary {
  runTimeAssessmentStatus?: string;
  count?: number;
}
export const ServerStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runTimeAssessmentStatus: S.optional(S.String),
    count: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServerStatusSummary",
}) as any as S.Schema<ServerStatusSummary>;
export type ListServerStatusSummary = ServerStatusSummary[];
export const ListServerStatusSummary =
  /*@__PURE__*/ S.Array(ServerStatusSummary);
export interface AssessmentSummary {
  listServerStrategySummary?: StrategySummary[];
  listApplicationComponentStrategySummary?: StrategySummary[];
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  listApplicationComponentSummary?: ApplicationComponentSummary[];
  listServerSummary?: ServerSummary[];
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  lastAnalyzedTimestamp?: Date;
  listApplicationComponentStatusSummary?: ApplicationComponentStatusSummary[];
  listServerStatusSummary?: ServerStatusSummary[];
}
export const AssessmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listServerStrategySummary: S.optional(ListStrategySummary),
    listApplicationComponentStrategySummary: S.optional(ListStrategySummary),
    listAntipatternSeveritySummary: S.optional(ListAntipatternSeveritySummary),
    listApplicationComponentSummary: S.optional(
      ListApplicationComponentSummary,
    ),
    listServerSummary: S.optional(ListServerSummary),
    antipatternReportS3Object: S.optional(S3Object),
    antipatternReportStatus: S.optional(S.String),
    antipatternReportStatusMessage: S.optional(S.String),
    lastAnalyzedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    listApplicationComponentStatusSummary: S.optional(
      ListApplicationComponentStatusSummary,
    ),
    listServerStatusSummary: S.optional(ListServerStatusSummary),
  }),
).annotate({
  identifier: "AssessmentSummary",
}) as any as S.Schema<AssessmentSummary>;
export interface GetPortfolioSummaryResponse {
  assessmentSummary?: AssessmentSummary;
}
export const GetPortfolioSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentSummary: S.optional(AssessmentSummary) }),
).annotate({
  identifier: "GetPortfolioSummaryResponse",
}) as any as S.Schema<GetPortfolioSummaryResponse>;
export type RecommendationTaskId = string;
export interface GetRecommendationReportDetailsRequest {
  id: string;
}
export const GetRecommendationReportDetailsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/get-recommendation-report-details/{id}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRecommendationReportDetailsRequest",
}) as any as S.Schema<GetRecommendationReportDetailsRequest>;
export type RecommendationReportStatus = string;
export type RecommendationReportStatusMessage = string;
export type RecommendationReportTimeStamp = Date;
export type S3Keys = string[];
export const S3Keys = /*@__PURE__*/ S.Array(S.String);
export interface RecommendationReportDetails {
  status?: string;
  statusMessage?: string;
  startTime?: Date;
  completionTime?: Date;
  s3Bucket?: string;
  s3Keys?: string[];
}
export const RecommendationReportDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    statusMessage: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    s3Bucket: S.optional(S.String),
    s3Keys: S.optional(S3Keys),
  }),
).annotate({
  identifier: "RecommendationReportDetails",
}) as any as S.Schema<RecommendationReportDetails>;
export interface GetRecommendationReportDetailsResponse {
  id?: string;
  recommendationReportDetails?: RecommendationReportDetails;
}
export const GetRecommendationReportDetailsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.optional(S.String),
      recommendationReportDetails: S.optional(RecommendationReportDetails),
    }),
).annotate({
  identifier: "GetRecommendationReportDetailsResponse",
}) as any as S.Schema<GetRecommendationReportDetailsResponse>;
export type NextToken = string;
export type MaxResult = number;
export interface GetServerDetailsRequest {
  serverId: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetServerDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serverId: S.String.pipe(T.HttpLabel("serverId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-server-details/{serverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServerDetailsRequest",
}) as any as S.Schema<GetServerDetailsRequest>;
export type OSType = string;
export type OSVersion = string;
export interface OSInfo {
  type?: string;
  version?: string;
}
export const OSInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String), version: S.optional(S.String) }),
).annotate({ identifier: "OSInfo" }) as any as S.Schema<OSInfo>;
export type InterfaceName = string;
export type IPAddress = string;
export type MacAddress = string;
export type NetMask = string;
export interface NetworkInfo {
  interfaceName: string;
  ipAddress: string;
  macAddress: string;
  netMask: string;
}
export const NetworkInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceName: S.String,
    ipAddress: S.String,
    macAddress: S.String,
    netMask: S.String,
  }),
).annotate({ identifier: "NetworkInfo" }) as any as S.Schema<NetworkInfo>;
export type NetworkInfoList = NetworkInfo[];
export const NetworkInfoList = /*@__PURE__*/ S.Array(NetworkInfo);
export interface SystemInfo {
  osInfo?: OSInfo;
  fileSystemType?: string;
  networkInfoList?: NetworkInfo[];
  cpuArchitecture?: string;
}
export const SystemInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    osInfo: S.optional(OSInfo),
    fileSystemType: S.optional(S.String),
    networkInfoList: S.optional(NetworkInfoList),
    cpuArchitecture: S.optional(S.String),
  }),
).annotate({ identifier: "SystemInfo" }) as any as S.Schema<SystemInfo>;
export type ServerErrorCategory = string;
export interface ServerError {
  serverErrorCategory?: string;
}
export const ServerError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serverErrorCategory: S.optional(S.String) }),
).annotate({ identifier: "ServerError" }) as any as S.Schema<ServerError>;
export interface ServerDetail {
  id?: string;
  name?: string;
  recommendationSet?: RecommendationSet;
  dataCollectionStatus?: string;
  statusMessage?: string;
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  systemInfo?: SystemInfo;
  applicationComponentStrategySummary?: StrategySummary[];
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  serverType?: string;
  lastAnalyzedTimestamp?: Date;
  serverError?: ServerError;
}
export const ServerDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    recommendationSet: S.optional(RecommendationSet),
    dataCollectionStatus: S.optional(S.String),
    statusMessage: S.optional(S.String),
    listAntipatternSeveritySummary: S.optional(ListAntipatternSeveritySummary),
    systemInfo: S.optional(SystemInfo),
    applicationComponentStrategySummary: S.optional(ListStrategySummary),
    antipatternReportS3Object: S.optional(S3Object),
    antipatternReportStatus: S.optional(S.String),
    antipatternReportStatusMessage: S.optional(S.String),
    serverType: S.optional(S.String),
    lastAnalyzedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    serverError: S.optional(ServerError),
  }),
).annotate({ identifier: "ServerDetail" }) as any as S.Schema<ServerDetail>;
export interface GetServerDetailsResponse {
  nextToken?: string;
  serverDetail?: ServerDetail;
  associatedApplications?: AssociatedApplication[];
}
export const GetServerDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    serverDetail: S.optional(ServerDetail),
    associatedApplications: S.optional(AssociatedApplications),
  }),
).annotate({
  identifier: "GetServerDetailsResponse",
}) as any as S.Schema<GetServerDetailsResponse>;
export interface GetServerStrategiesRequest {
  serverId: string;
}
export const GetServerStrategiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serverId: S.String.pipe(T.HttpLabel("serverId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/get-server-strategies/{serverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServerStrategiesRequest",
}) as any as S.Schema<GetServerStrategiesRequest>;
export interface ServerStrategy {
  recommendation?: RecommendationSet;
  status?: string;
  numberOfApplicationComponents?: number;
  isPreferred?: boolean;
}
export const ServerStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendation: S.optional(RecommendationSet),
    status: S.optional(S.String),
    numberOfApplicationComponents: S.optional(S.Number),
    isPreferred: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ServerStrategy" }) as any as S.Schema<ServerStrategy>;
export type ServerStrategies = ServerStrategy[];
export const ServerStrategies = /*@__PURE__*/ S.Array(ServerStrategy);
export interface GetServerStrategiesResponse {
  serverStrategies?: ServerStrategy[];
}
export const GetServerStrategiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serverStrategies: S.optional(ServerStrategies) }),
).annotate({
  identifier: "GetServerStrategiesResponse",
}) as any as S.Schema<GetServerStrategiesResponse>;
export type SortOrder = string;
export interface ListAnalyzableServersRequest {
  sort?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAnalyzableServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sort: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-analyzable-servers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnalyzableServersRequest",
}) as any as S.Schema<ListAnalyzableServersRequest>;
export interface AnalyzableServerSummary {
  hostname?: string;
  ipAddress?: string;
  source?: string;
  vmId?: string;
}
export const AnalyzableServerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostname: S.optional(S.String),
    ipAddress: S.optional(S.String),
    source: S.optional(S.String),
    vmId: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalyzableServerSummary",
}) as any as S.Schema<AnalyzableServerSummary>;
export type AnalyzableServerSummaryList = AnalyzableServerSummary[];
export const AnalyzableServerSummaryList = /*@__PURE__*/ S.Array(
  AnalyzableServerSummary,
);
export interface ListAnalyzableServersResponse {
  analyzableServers?: AnalyzableServerSummary[];
  nextToken?: string;
}
export const ListAnalyzableServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    analyzableServers: S.optional(AnalyzableServerSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnalyzableServersResponse",
}) as any as S.Schema<ListAnalyzableServersResponse>;
export type ApplicationComponentCriteria = string;
export type GroupName = string;
export interface Group {
  name?: string;
  value?: string;
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type GroupIds = Group[];
export const GroupIds = /*@__PURE__*/ S.Array(Group);
export interface ListApplicationComponentsRequest {
  applicationComponentCriteria?: string;
  filterValue?: string;
  sort?: string;
  groupIdFilter?: Group[];
  nextToken?: string;
  maxResults?: number;
}
export const ListApplicationComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationComponentCriteria: S.optional(S.String),
    filterValue: S.optional(S.String),
    sort: S.optional(S.String),
    groupIdFilter: S.optional(GroupIds),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-applicationcomponents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationComponentsRequest",
}) as any as S.Schema<ListApplicationComponentsRequest>;
export type ApplicationComponentDetails = ApplicationComponentDetail[];
export const ApplicationComponentDetails = /*@__PURE__*/ S.Array(
  ApplicationComponentDetail,
);
export interface ListApplicationComponentsResponse {
  applicationComponentInfos?: ApplicationComponentDetail[];
  nextToken?: string;
}
export const ListApplicationComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationComponentInfos: S.optional(ApplicationComponentDetails),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationComponentsResponse",
}) as any as S.Schema<ListApplicationComponentsResponse>;
export interface ListCollectorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListCollectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/list-collectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCollectorsRequest",
}) as any as S.Schema<ListCollectorsRequest>;
export type CollectorHealth = string;
export interface VcenterBasedRemoteInfo {
  vcenterConfigurationTimeStamp?: string;
  osType?: string;
}
export const VcenterBasedRemoteInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcenterConfigurationTimeStamp: S.optional(S.String),
    osType: S.optional(S.String),
  }),
).annotate({
  identifier: "VcenterBasedRemoteInfo",
}) as any as S.Schema<VcenterBasedRemoteInfo>;
export type VcenterBasedRemoteInfoList = VcenterBasedRemoteInfo[];
export const VcenterBasedRemoteInfoList = /*@__PURE__*/ S.Array(
  VcenterBasedRemoteInfo,
);
export type AuthType = string;
export interface IPAddressBasedRemoteInfo {
  ipAddressConfigurationTimeStamp?: string;
  authType?: string;
  osType?: string;
}
export const IPAddressBasedRemoteInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAddressConfigurationTimeStamp: S.optional(S.String),
    authType: S.optional(S.String),
    osType: S.optional(S.String),
  }),
).annotate({
  identifier: "IPAddressBasedRemoteInfo",
}) as any as S.Schema<IPAddressBasedRemoteInfo>;
export type IPAddressBasedRemoteInfoList = IPAddressBasedRemoteInfo[];
export const IPAddressBasedRemoteInfoList = /*@__PURE__*/ S.Array(
  IPAddressBasedRemoteInfo,
);
export type VersionControlType = string;
export interface VersionControlInfo {
  versionControlType?: string;
  versionControlConfigurationTimeStamp?: string;
}
export const VersionControlInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionControlType: S.optional(S.String),
    versionControlConfigurationTimeStamp: S.optional(S.String),
  }),
).annotate({
  identifier: "VersionControlInfo",
}) as any as S.Schema<VersionControlInfo>;
export type VersionControlInfoList = VersionControlInfo[];
export const VersionControlInfoList = /*@__PURE__*/ S.Array(VersionControlInfo);
export type PipelineType = string;
export interface PipelineInfo {
  pipelineType?: string;
  pipelineConfigurationTimeStamp?: string;
}
export const PipelineInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pipelineType: S.optional(S.String),
    pipelineConfigurationTimeStamp: S.optional(S.String),
  }),
).annotate({ identifier: "PipelineInfo" }) as any as S.Schema<PipelineInfo>;
export type PipelineInfoList = PipelineInfo[];
export const PipelineInfoList = /*@__PURE__*/ S.Array(PipelineInfo);
export interface RemoteSourceCodeAnalysisServerInfo {
  remoteSourceCodeAnalysisServerConfigurationTimestamp?: string;
}
export const RemoteSourceCodeAnalysisServerInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remoteSourceCodeAnalysisServerConfigurationTimestamp: S.optional(S.String),
  }),
).annotate({
  identifier: "RemoteSourceCodeAnalysisServerInfo",
}) as any as S.Schema<RemoteSourceCodeAnalysisServerInfo>;
export interface ConfigurationSummary {
  vcenterBasedRemoteInfoList?: VcenterBasedRemoteInfo[];
  ipAddressBasedRemoteInfoList?: IPAddressBasedRemoteInfo[];
  versionControlInfoList?: VersionControlInfo[];
  pipelineInfoList?: PipelineInfo[];
  remoteSourceCodeAnalysisServerInfo?: RemoteSourceCodeAnalysisServerInfo;
}
export const ConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vcenterBasedRemoteInfoList: S.optional(VcenterBasedRemoteInfoList),
    ipAddressBasedRemoteInfoList: S.optional(IPAddressBasedRemoteInfoList),
    versionControlInfoList: S.optional(VersionControlInfoList),
    pipelineInfoList: S.optional(PipelineInfoList),
    remoteSourceCodeAnalysisServerInfo: S.optional(
      RemoteSourceCodeAnalysisServerInfo,
    ),
  }),
).annotate({
  identifier: "ConfigurationSummary",
}) as any as S.Schema<ConfigurationSummary>;
export interface Collector {
  collectorId?: string;
  ipAddress?: string;
  hostName?: string;
  collectorHealth?: string;
  collectorVersion?: string;
  registeredTimeStamp?: string;
  lastActivityTimeStamp?: string;
  configurationSummary?: ConfigurationSummary;
}
export const Collector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    collectorId: S.optional(S.String),
    ipAddress: S.optional(S.String),
    hostName: S.optional(S.String),
    collectorHealth: S.optional(S.String),
    collectorVersion: S.optional(S.String),
    registeredTimeStamp: S.optional(S.String),
    lastActivityTimeStamp: S.optional(S.String),
    configurationSummary: S.optional(ConfigurationSummary),
  }),
).annotate({ identifier: "Collector" }) as any as S.Schema<Collector>;
export type Collectors = Collector[];
export const Collectors = /*@__PURE__*/ S.Array(Collector);
export interface ListCollectorsResponse {
  Collectors?: Collector[];
  nextToken?: string;
}
export const ListCollectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Collectors: S.optional(Collectors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCollectorsResponse",
}) as any as S.Schema<ListCollectorsResponse>;
export interface ListImportFileTaskRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListImportFileTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/list-import-file-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportFileTaskRequest",
}) as any as S.Schema<ListImportFileTaskRequest>;
export interface ImportFileTaskInformation {
  id?: string;
  status?: string;
  startTime?: Date;
  inputS3Bucket?: string;
  inputS3Key?: string;
  statusReportS3Bucket?: string;
  statusReportS3Key?: string;
  completionTime?: Date;
  numberOfRecordsSuccess?: number;
  numberOfRecordsFailed?: number;
  importName?: string;
}
export const ImportFileTaskInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inputS3Bucket: S.optional(S.String),
    inputS3Key: S.optional(S.String),
    statusReportS3Bucket: S.optional(S.String),
    statusReportS3Key: S.optional(S.String),
    completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    numberOfRecordsSuccess: S.optional(S.Number),
    numberOfRecordsFailed: S.optional(S.Number),
    importName: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportFileTaskInformation",
}) as any as S.Schema<ImportFileTaskInformation>;
export type ListImportFileTaskInformation = ImportFileTaskInformation[];
export const ListImportFileTaskInformation = /*@__PURE__*/ S.Array(
  ImportFileTaskInformation,
);
export interface ListImportFileTaskResponse {
  taskInfos?: ImportFileTaskInformation[];
  nextToken?: string;
}
export const ListImportFileTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskInfos: S.optional(ListImportFileTaskInformation),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportFileTaskResponse",
}) as any as S.Schema<ListImportFileTaskResponse>;
export type ServerCriteria = string;
export interface ListServersRequest {
  serverCriteria?: string;
  filterValue?: string;
  sort?: string;
  groupIdFilter?: Group[];
  nextToken?: string;
  maxResults?: number;
}
export const ListServersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serverCriteria: S.optional(S.String),
    filterValue: S.optional(S.String),
    sort: S.optional(S.String),
    groupIdFilter: S.optional(GroupIds),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-servers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServersRequest",
}) as any as S.Schema<ListServersRequest>;
export type ServerDetails = ServerDetail[];
export const ServerDetails = /*@__PURE__*/ S.Array(ServerDetail);
export interface ListServersResponse {
  serverInfos?: ServerDetail[];
  nextToken?: string;
}
export const ListServersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serverInfos: S.optional(ServerDetails),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServersResponse",
}) as any as S.Schema<ListServersResponse>;
export interface PutPortfolioPreferencesRequest {
  prioritizeBusinessGoals?: PrioritizeBusinessGoals;
  applicationPreferences?: ApplicationPreferences;
  databasePreferences?: DatabasePreferences;
  applicationMode?: string;
}
export const PutPortfolioPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prioritizeBusinessGoals: S.optional(PrioritizeBusinessGoals),
    applicationPreferences: S.optional(ApplicationPreferences),
    databasePreferences: S.optional(DatabasePreferences),
    applicationMode: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/put-portfolio-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutPortfolioPreferencesRequest",
}) as any as S.Schema<PutPortfolioPreferencesRequest>;
export interface PutPortfolioPreferencesResponse {}
export const PutPortfolioPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutPortfolioPreferencesResponse",
}) as any as S.Schema<PutPortfolioPreferencesResponse>;
export type AssessmentDataSourceType = string;
export interface StartAssessmentRequest {
  s3bucketForAnalysisData?: string;
  s3bucketForReportData?: string;
  assessmentTargets?: AssessmentTarget[];
  assessmentDataSourceType?: string;
}
export const StartAssessmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3bucketForAnalysisData: S.optional(S.String),
    s3bucketForReportData: S.optional(S.String),
    assessmentTargets: S.optional(AssessmentTargets),
    assessmentDataSourceType: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-assessment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAssessmentRequest",
}) as any as S.Schema<StartAssessmentRequest>;
export interface StartAssessmentResponse {
  assessmentId?: string;
}
export const StartAssessmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentId: S.optional(S.String) }),
).annotate({
  identifier: "StartAssessmentResponse",
}) as any as S.Schema<StartAssessmentResponse>;
export type DataSourceType = string;
export interface StartImportFileTaskRequest {
  name: string;
  S3Bucket: string;
  s3key: string;
  dataSourceType?: string;
  groupId?: Group[];
  s3bucketForReportData?: string;
}
export const StartImportFileTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    S3Bucket: S.String,
    s3key: S.String,
    dataSourceType: S.optional(S.String),
    groupId: S.optional(GroupIds),
    s3bucketForReportData: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-import-file-task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportFileTaskRequest",
}) as any as S.Schema<StartImportFileTaskRequest>;
export interface StartImportFileTaskResponse {
  id?: string;
}
export const StartImportFileTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "StartImportFileTaskResponse",
}) as any as S.Schema<StartImportFileTaskResponse>;
export type OutputFormat = string;
export interface StartRecommendationReportGenerationRequest {
  outputFormat?: string;
  groupIdFilter?: Group[];
}
export const StartRecommendationReportGenerationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      outputFormat: S.optional(S.String),
      groupIdFilter: S.optional(GroupIds),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/start-recommendation-report-generation",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartRecommendationReportGenerationRequest",
  }) as any as S.Schema<StartRecommendationReportGenerationRequest>;
export interface StartRecommendationReportGenerationResponse {
  id?: string;
}
export const StartRecommendationReportGenerationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ id: S.optional(S.String) }),
  ).annotate({
    identifier: "StartRecommendationReportGenerationResponse",
  }) as any as S.Schema<StartRecommendationReportGenerationResponse>;
export interface StopAssessmentRequest {
  assessmentId: string;
}
export const StopAssessmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assessmentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stop-assessment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopAssessmentRequest",
}) as any as S.Schema<StopAssessmentRequest>;
export interface StopAssessmentResponse {}
export const StopAssessmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopAssessmentResponse",
}) as any as S.Schema<StopAssessmentResponse>;
export interface StrategyOption {
  strategy?: string;
  toolName?: string;
  targetDestination?: string;
  isPreferred?: boolean;
}
export const StrategyOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    strategy: S.optional(S.String),
    toolName: S.optional(S.String),
    targetDestination: S.optional(S.String),
    isPreferred: S.optional(S.Boolean),
  }),
).annotate({ identifier: "StrategyOption" }) as any as S.Schema<StrategyOption>;
export type VersionControl = string;
export type SourceVersion = string;
export type Location = string;
export type ProjectName = string;
export interface SourceCode {
  versionControl?: string;
  sourceVersion?: string;
  location?: string;
  projectName?: string;
}
export const SourceCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionControl: S.optional(S.String),
    sourceVersion: S.optional(S.String),
    location: S.optional(S.String),
    projectName: S.optional(S.String),
  }),
).annotate({ identifier: "SourceCode" }) as any as S.Schema<SourceCode>;
export type SourceCodeList = SourceCode[];
export const SourceCodeList = /*@__PURE__*/ S.Array(SourceCode);
export type SecretsManagerKey = string | redacted.Redacted<string>;
export interface UpdateApplicationComponentConfigRequest {
  applicationComponentId: string;
  inclusionStatus?: string;
  strategyOption?: StrategyOption;
  sourceCodeList?: SourceCode[];
  secretsManagerKey?: string | redacted.Redacted<string>;
  configureOnly?: boolean;
  appType?: string;
}
export const UpdateApplicationComponentConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationComponentId: S.String,
      inclusionStatus: S.optional(S.String),
      strategyOption: S.optional(StrategyOption),
      sourceCodeList: S.optional(SourceCodeList),
      secretsManagerKey: S.optional(SensitiveString),
      configureOnly: S.optional(S.Boolean),
      appType: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/update-applicationcomponent-config/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateApplicationComponentConfigRequest",
}) as any as S.Schema<UpdateApplicationComponentConfigRequest>;
export interface UpdateApplicationComponentConfigResponse {}
export const UpdateApplicationComponentConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateApplicationComponentConfigResponse",
}) as any as S.Schema<UpdateApplicationComponentConfigResponse>;
export interface UpdateServerConfigRequest {
  serverId: string;
  strategyOption?: StrategyOption;
}
export const UpdateServerConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serverId: S.String,
    strategyOption: S.optional(StrategyOption),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-server-config/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServerConfigRequest",
}) as any as S.Schema<UpdateServerConfigRequest>;
export interface UpdateServerConfigResponse {}
export const UpdateServerConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateServerConfigResponse",
}) as any as S.Schema<UpdateServerConfigResponse>;
export type ErrorMessage = string;
export type GetApplicationComponentDetailsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about an application component.
 */
export const getApplicationComponentDetails: API.OperationMethod<
  GetApplicationComponentDetailsRequest,
  GetApplicationComponentDetailsResponse,
  GetApplicationComponentDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationComponentDetailsRequest,
  output: GetApplicationComponentDetailsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentDetails",
}));

export type GetApplicationComponentStrategiesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of all the recommended strategies and tools for an application component
 * running on a server.
 */
export const getApplicationComponentStrategies: API.OperationMethod<
  GetApplicationComponentStrategiesRequest,
  GetApplicationComponentStrategiesResponse,
  GetApplicationComponentStrategiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationComponentStrategiesRequest,
  output: GetApplicationComponentStrategiesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentStrategies",
}));

export type GetAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status of an on-going assessment.
 */
export const getAssessment: API.OperationMethod<
  GetAssessmentRequest,
  GetAssessmentResponse,
  GetAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssessmentRequest,
  output: GetAssessmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessment",
}));

export type GetImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details about a specific import task.
 */
export const getImportFileTask: API.OperationMethod<
  GetImportFileTaskRequest,
  GetImportFileTaskResponse,
  GetImportFileTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportFileTaskRequest,
  output: GetImportFileTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportFileTask",
}));

export type GetLatestAssessmentIdError =
  | AccessDeniedException
  | DependencyException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the latest ID of a specific assessment task.
 */
export const getLatestAssessmentId: API.OperationMethod<
  GetLatestAssessmentIdRequest,
  GetLatestAssessmentIdResponse,
  GetLatestAssessmentIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLatestAssessmentIdRequest,
  output: GetLatestAssessmentIdResponse,
  errors: [
    AccessDeniedException,
    DependencyException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLatestAssessmentId",
}));

export type GetPortfolioPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves your migration and modernization preferences.
 */
export const getPortfolioPreferences: API.OperationMethod<
  GetPortfolioPreferencesRequest,
  GetPortfolioPreferencesResponse,
  GetPortfolioPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortfolioPreferencesRequest,
  output: GetPortfolioPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortfolioPreferences",
}));

export type GetPortfolioSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves overall summary including the number of servers to rehost and the overall
 * number of anti-patterns.
 */
export const getPortfolioSummary: API.OperationMethod<
  GetPortfolioSummaryRequest,
  GetPortfolioSummaryResponse,
  GetPortfolioSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortfolioSummaryRequest,
  output: GetPortfolioSummaryResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortfolioSummary",
}));

export type GetRecommendationReportDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about the specified recommendation report.
 */
export const getRecommendationReportDetails: API.OperationMethod<
  GetRecommendationReportDetailsRequest,
  GetRecommendationReportDetailsResponse,
  GetRecommendationReportDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommendationReportDetailsRequest,
  output: GetRecommendationReportDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationReportDetails",
}));

export type GetServerDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specified server.
 */
export const getServerDetails: API.PaginatedOperationMethod<
  GetServerDetailsRequest,
  GetServerDetailsResponse,
  GetServerDetailsError,
  Credentials | HttpClient.HttpClient,
  AssociatedApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetServerDetailsRequest,
  output: GetServerDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServerDetails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedApplications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetServerStrategiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves recommended strategies and tools for the specified server.
 */
export const getServerStrategies: API.OperationMethod<
  GetServerStrategiesRequest,
  GetServerStrategiesResponse,
  GetServerStrategiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServerStrategiesRequest,
  output: GetServerStrategiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServerStrategies",
}));

export type ListAnalyzableServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the servers fetched from customer vCenter using Strategy Recommendation Collector.
 */
export const listAnalyzableServers: API.PaginatedOperationMethod<
  ListAnalyzableServersRequest,
  ListAnalyzableServersResponse,
  ListAnalyzableServersError,
  Credentials | HttpClient.HttpClient,
  AnalyzableServerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAnalyzableServersRequest,
  output: ListAnalyzableServersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyzableServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analyzableServers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLinkedRoleLockClientException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the application components (processes).
 */
export const listApplicationComponents: API.PaginatedOperationMethod<
  ListApplicationComponentsRequest,
  ListApplicationComponentsResponse,
  ListApplicationComponentsError,
  Credentials | HttpClient.HttpClient,
  ApplicationComponentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationComponentsRequest,
  output: ListApplicationComponentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLinkedRoleLockClientException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationComponentInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the installed collectors.
 */
export const listCollectors: API.PaginatedOperationMethod<
  ListCollectorsRequest,
  ListCollectorsResponse,
  ListCollectorsError,
  Credentials | HttpClient.HttpClient,
  Collector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollectorsRequest,
  output: ListCollectorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "Collectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the imports performed.
 */
export const listImportFileTask: API.PaginatedOperationMethod<
  ListImportFileTaskRequest,
  ListImportFileTaskResponse,
  ListImportFileTaskError,
  Credentials | HttpClient.HttpClient,
  ImportFileTaskInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportFileTaskRequest,
  output: ListImportFileTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFileTask",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the servers.
 */
export const listServers: API.PaginatedOperationMethod<
  ListServersRequest,
  ListServersResponse,
  ListServersError,
  Credentials | HttpClient.HttpClient,
  ServerDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServersRequest,
  output: ListServersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serverInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutPortfolioPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Saves the specified migration and modernization preferences.
 */
export const putPortfolioPreferences: API.OperationMethod<
  PutPortfolioPreferencesRequest,
  PutPortfolioPreferencesResponse,
  PutPortfolioPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPortfolioPreferencesRequest,
  output: PutPortfolioPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPortfolioPreferences",
}));

export type StartAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts the assessment of an on-premises environment.
 */
export const startAssessment: API.OperationMethod<
  StartAssessmentRequest,
  StartAssessmentResponse,
  StartAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAssessmentRequest,
  output: StartAssessmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessment",
}));

export type StartImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a file import.
 */
export const startImportFileTask: API.OperationMethod<
  StartImportFileTaskRequest,
  StartImportFileTaskResponse,
  StartImportFileTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportFileTaskRequest,
  output: StartImportFileTaskResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportFileTask",
}));

export type StartRecommendationReportGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts generating a recommendation report.
 */
export const startRecommendationReportGeneration: API.OperationMethod<
  StartRecommendationReportGenerationRequest,
  StartRecommendationReportGenerationResponse,
  StartRecommendationReportGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRecommendationReportGenerationRequest,
  output: StartRecommendationReportGenerationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommendationReportGeneration",
}));

export type StopAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the assessment of an on-premises environment.
 */
export const stopAssessment: API.OperationMethod<
  StopAssessmentRequest,
  StopAssessmentResponse,
  StopAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAssessmentRequest,
  output: StopAssessmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAssessment",
}));

export type UpdateApplicationComponentConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an application component.
 */
export const updateApplicationComponentConfig: API.OperationMethod<
  UpdateApplicationComponentConfigRequest,
  UpdateApplicationComponentConfigResponse,
  UpdateApplicationComponentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationComponentConfigRequest,
  output: UpdateApplicationComponentConfigResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationComponentConfig",
}));

export type UpdateServerConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of the specified server.
 */
export const updateServerConfig: API.OperationMethod<
  UpdateServerConfigRequest,
  UpdateServerConfigResponse,
  UpdateServerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServerConfigRequest,
  output: UpdateServerConfigResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServerConfig",
}));
