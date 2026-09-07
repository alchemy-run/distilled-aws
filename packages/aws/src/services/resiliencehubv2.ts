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
  sdkId: "resiliencehubv2",
  serviceShapeName: "NGRHServiceCore",
});
const auth = T.AwsAuthSigv4({ name: "resiliencehub" });
const ver = T.ServiceVersion("2026-02-17");
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
              `https://resiliencehub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://resiliencehub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type AssertionText = string;
export type ClientToken = string;
export interface CreateAssertionRequest {
  serviceArn: string;
  text: string;
  clientToken?: string;
}
export const CreateAssertionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    text: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-assertion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssertionRequest",
}) as any as S.Schema<CreateAssertionRequest>;
export type Uuid = string;
export type AssertionSource = "AI_GENERATED" | "USER" | (string & {});
export const AssertionSource = S.String;

export interface Assertion {
  serviceArn: string;
  assertionId: string;
  text: string;
  source: AssertionSource;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Assertion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    assertionId: S.String,
    text: S.String,
    source: AssertionSource,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Assertion" }) as any as S.Schema<Assertion>;
export interface CreateAssertionResponse {
  assertion: Assertion;
}
export const CreateAssertionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assertion: Assertion }),
).annotate({
  identifier: "CreateAssertionResponse",
}) as any as S.Schema<CreateAssertionResponse>;
export type TagKey = string;
export type TagValue = string;
export type TagValueList = string[];
export const TagValueList = /*@__PURE__*/ S.Array(S.String);
export interface ResourceTag {
  key: string;
  values: string[];
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, values: TagValueList }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export type S3Url = string;
export type EksNamespace = string;
export type EksNamespaceList = string[];
export const EksNamespaceList = /*@__PURE__*/ S.Array(S.String);
export interface EksSource {
  clusterArn: string;
  namespaces: string[];
}
export const EksSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clusterArn: S.String, namespaces: EksNamespaceList }),
).annotate({ identifier: "EksSource" }) as any as S.Schema<EksSource>;
export type ResourceConfiguration =
  | {
      resourceTags: ResourceTag[];
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn: string;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl: string;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks: EksSource;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url: string;
    };
export const ResourceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ resourceTags: ResourceTagList }),
  S.Struct({ cfnStackArn: S.String }),
  S.Struct({ tfStateFileUrl: S.String }),
  S.Struct({ eks: EksSource }),
  S.Struct({ designFileS3Url: S.String }),
]);
export interface CreateInputSourceRequest {
  serviceArn: string;
  resourceConfiguration: ResourceConfiguration;
  clientToken?: string;
}
export const CreateInputSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    resourceConfiguration: ResourceConfiguration,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-input-source" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInputSourceRequest",
}) as any as S.Schema<CreateInputSourceRequest>;
export type InputSourceId = string;
export interface CreateInputSourceResponse {
  serviceArn: string;
  inputSourceId: string;
}
export const CreateInputSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String, inputSourceId: S.String }),
).annotate({
  identifier: "CreateInputSourceResponse",
}) as any as S.Schema<CreateInputSourceResponse>;
export type EntityName = string;
export type LongDescription = string;
export interface AvailabilitySlo {
  target?: number;
}
export const AvailabilitySlo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ target: S.optional(S.Number) }),
).annotate({
  identifier: "AvailabilitySlo",
}) as any as S.Schema<AvailabilitySlo>;
export type MultiAzDisasterRecoveryApproach =
  | "ACTIVE_ACTIVE"
  | "HOT_STANDBY"
  | "WARM_STANDBY"
  | "PILOT_LIGHT"
  | "BACKUP_AND_RESTORE"
  | (string & {});
export const MultiAzDisasterRecoveryApproach = S.String;

export interface MultiAzTargets {
  rtoInMinutes?: number;
  rpoInMinutes?: number;
  disasterRecoveryApproach?: MultiAzDisasterRecoveryApproach;
}
export const MultiAzTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rtoInMinutes: S.optional(S.Number),
    rpoInMinutes: S.optional(S.Number),
    disasterRecoveryApproach: S.optional(MultiAzDisasterRecoveryApproach),
  }),
).annotate({ identifier: "MultiAzTargets" }) as any as S.Schema<MultiAzTargets>;
export type MultiRegionDisasterRecoveryApproach =
  | "ACTIVE_ACTIVE"
  | "HOT_STANDBY"
  | "WARM_STANDBY"
  | "PILOT_LIGHT"
  | "BACKUP_AND_RESTORE"
  | (string & {});
export const MultiRegionDisasterRecoveryApproach = S.String;

export interface MultiRegionTargets {
  rtoInMinutes?: number;
  rpoInMinutes?: number;
  disasterRecoveryApproach?: MultiRegionDisasterRecoveryApproach;
}
export const MultiRegionTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rtoInMinutes: S.optional(S.Number),
    rpoInMinutes: S.optional(S.Number),
    disasterRecoveryApproach: S.optional(MultiRegionDisasterRecoveryApproach),
  }),
).annotate({
  identifier: "MultiRegionTargets",
}) as any as S.Schema<MultiRegionTargets>;
export interface DataRecoveryTargets {
  timeBetweenBackupsInMinutes?: number;
}
export const DataRecoveryTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeBetweenBackupsInMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "DataRecoveryTargets",
}) as any as S.Schema<DataRecoveryTargets>;
export type KmsKeyId = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreatePolicyRequest {
  name: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAz: S.optional(MultiAzTargets),
    multiRegion: S.optional(MultiRegionTargets),
    dataRecovery: S.optional(DataRecoveryTargets),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePolicyRequest",
}) as any as S.Schema<CreatePolicyRequest>;
export interface Policy {
  policyArn: string;
  name: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  associatedServiceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAz: S.optional(MultiAzTargets),
    multiRegion: S.optional(MultiRegionTargets),
    dataRecovery: S.optional(DataRecoveryTargets),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    associatedServiceCount: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export interface CreatePolicyResponse {
  policy: Policy;
}
export const CreatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: Policy }),
).annotate({
  identifier: "CreatePolicyResponse",
}) as any as S.Schema<CreatePolicyResponse>;
export type ReportType = "FAILURE_MODE" | "TESTING" | (string & {});
export const ReportType = S.String;

export interface CreateReportRequest {
  serviceArn: string;
  reportType: ReportType;
  clientToken?: string;
}
export const CreateReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    reportType: ReportType,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-report" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReportRequest",
}) as any as S.Schema<CreateReportRequest>;
export type ReportGenerationStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const ReportGenerationStatus = S.String;

export type TestRunId = string;
export type ServiceOwnedArn = string;
export interface S3ReportOutput {
  s3ObjectKey: string;
}
export const S3ReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3ObjectKey: S.String }),
).annotate({ identifier: "S3ReportOutput" }) as any as S.Schema<S3ReportOutput>;
export type ReportGenerationErrorCode =
  | "INSUFFICIENT_PERMISSIONS"
  | "CONFIGURATION_ERROR"
  | "INTERNAL_ERROR"
  | (string & {});
export const ReportGenerationErrorCode = S.String;

export interface FailedReportOutput {
  errorCode: ReportGenerationErrorCode;
  errorMessage?: string;
}
export const FailedReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: ReportGenerationErrorCode,
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedReportOutput",
}) as any as S.Schema<FailedReportOutput>;
export type ReportOutput =
  | { s3ReportOutput: S3ReportOutput; failedReportOutput?: never }
  | { s3ReportOutput?: never; failedReportOutput: FailedReportOutput };
export const ReportOutput = /*@__PURE__*/ S.Union([
  S.Struct({ s3ReportOutput: S3ReportOutput }),
  S.Struct({ failedReportOutput: FailedReportOutput }),
]);
export interface ReportGenerationResult {
  reportType: ReportType;
  status: ReportGenerationStatus;
  serviceArn?: string;
  assessmentId?: string;
  testRunId?: string;
  testTemplateArn?: string;
  createdAt?: Date;
  reportOutput?: ReportOutput;
}
export const ReportGenerationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportType: ReportType,
    status: ReportGenerationStatus,
    serviceArn: S.optional(S.String),
    assessmentId: S.optional(S.String),
    testRunId: S.optional(S.String),
    testTemplateArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    reportOutput: S.optional(ReportOutput),
  }),
).annotate({
  identifier: "ReportGenerationResult",
}) as any as S.Schema<ReportGenerationResult>;
export interface CreateReportResponse {
  reportGenerationResult: ReportGenerationResult;
}
export const CreateReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportGenerationResult: ReportGenerationResult }),
).annotate({
  identifier: "CreateReportResponse",
}) as any as S.Schema<CreateReportResponse>;
export type UserJourneyId = string;
export type UserJourneyIdList = string[];
export const UserJourneyIdList = /*@__PURE__*/ S.Array(S.String);
export interface AssociatedSystem {
  systemArn: string;
  systemName?: string;
  userJourneyIds?: string[];
}
export const AssociatedSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String,
    systemName: S.optional(S.String),
    userJourneyIds: S.optional(UserJourneyIdList),
  }),
).annotate({
  identifier: "AssociatedSystem",
}) as any as S.Schema<AssociatedSystem>;
export type AssociatedSystemList = AssociatedSystem[];
export const AssociatedSystemList = /*@__PURE__*/ S.Array(AssociatedSystem);
export type AwsRegion = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export type IamRoleName = string;
export type IamRoleArn = string;
export interface CrossAccountRole {
  crossAccountRoleArn: string;
  externalId?: string;
}
export const CrossAccountRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ crossAccountRoleArn: S.String, externalId: S.optional(S.String) }),
).annotate({
  identifier: "CrossAccountRole",
}) as any as S.Schema<CrossAccountRole>;
export type CrossAccountRoleList = CrossAccountRole[];
export const CrossAccountRoleList = /*@__PURE__*/ S.Array(CrossAccountRole);
export interface PermissionModel {
  invokerRoleName: string;
  crossAccountRoles?: CrossAccountRole[];
}
export const PermissionModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invokerRoleName: S.String,
    crossAccountRoles: S.optional(CrossAccountRoleList),
  }),
).annotate({
  identifier: "PermissionModel",
}) as any as S.Schema<PermissionModel>;
export type DependencyDiscoveryInput = "ENABLED" | "DISABLED" | (string & {});
export const DependencyDiscoveryInput = S.String;

export type S3BucketPath = string;
export type AwsAccountId = string;
export interface S3ReportOutputConfiguration {
  bucketPath: string;
  bucketOwner: string;
}
export const S3ReportOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketPath: S.String, bucketOwner: S.String }),
).annotate({
  identifier: "S3ReportOutputConfiguration",
}) as any as S.Schema<S3ReportOutputConfiguration>;
export type ReportOutputConfiguration = { s3: S3ReportOutputConfiguration };
export const ReportOutputConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ s3: S3ReportOutputConfiguration }),
]);
export type ReportOutputConfigurationList = ReportOutputConfiguration[];
export const ReportOutputConfigurationList = /*@__PURE__*/ S.Array(
  ReportOutputConfiguration,
);
export interface ServiceReportConfiguration {
  reportOutputs: ReportOutputConfiguration[];
}
export const ServiceReportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportOutputs: ReportOutputConfigurationList }),
).annotate({
  identifier: "ServiceReportConfiguration",
}) as any as S.Schema<ServiceReportConfiguration>;
export interface CreateServiceRequest {
  name: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions: string[];
  permissionModel: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryInput;
  reportConfiguration?: ServiceReportConfiguration;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    associatedSystems: S.optional(AssociatedSystemList),
    policyArn: S.optional(S.String),
    regions: RegionList,
    permissionModel: PermissionModel,
    dependencyDiscovery: S.optional(DependencyDiscoveryInput),
    reportConfiguration: S.optional(ServiceReportConfiguration),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-service" }),
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
export type DependencyDiscoveryStatus =
  | "ENABLED"
  | "INITIALIZING"
  | "DISABLED"
  | (string & {});
export const DependencyDiscoveryStatus = S.String;

export interface DependencyDiscoveryConfig {
  status: DependencyDiscoveryStatus;
  updatedAt?: Date;
  eligibleResourceCount?: number;
  message?: string;
}
export const DependencyDiscoveryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: DependencyDiscoveryStatus,
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    eligibleResourceCount: S.optional(S.Number),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DependencyDiscoveryConfig",
}) as any as S.Schema<DependencyDiscoveryConfig>;
export type PolicyValueSource = "SELF" | "CROSS_ACCOUNT" | (string & {});
export const PolicyValueSource = S.String;

export interface SloSource {
  value?: number;
  policyName?: string;
  source?: PolicyValueSource;
}
export const SloSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.Number),
    policyName: S.optional(S.String),
    source: S.optional(PolicyValueSource),
  }),
).annotate({ identifier: "SloSource" }) as any as S.Schema<SloSource>;
export interface TargetSource {
  value?: number;
  policyName?: string;
  source?: PolicyValueSource;
}
export const TargetSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.Number),
    policyName: S.optional(S.String),
    source: S.optional(PolicyValueSource),
  }),
).annotate({ identifier: "TargetSource" }) as any as S.Schema<TargetSource>;
export interface DisasterRecoverySource {
  value?: string;
  policyName?: string;
  source?: PolicyValueSource;
}
export const DisasterRecoverySource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    policyName: S.optional(S.String),
    source: S.optional(PolicyValueSource),
  }),
).annotate({
  identifier: "DisasterRecoverySource",
}) as any as S.Schema<DisasterRecoverySource>;
export interface EffectivePolicyValues {
  availabilitySlo?: SloSource;
  multiAzRto?: TargetSource;
  multiAzRpo?: TargetSource;
  multiAzDrApproach?: DisasterRecoverySource;
  multiRegionRto?: TargetSource;
  multiRegionRpo?: TargetSource;
  multiRegionDrApproach?: DisasterRecoverySource;
  dataRecoveryTimeBetweenBackups?: TargetSource;
}
export const EffectivePolicyValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilitySlo: S.optional(SloSource),
    multiAzRto: S.optional(TargetSource),
    multiAzRpo: S.optional(TargetSource),
    multiAzDrApproach: S.optional(DisasterRecoverySource),
    multiRegionRto: S.optional(TargetSource),
    multiRegionRpo: S.optional(TargetSource),
    multiRegionDrApproach: S.optional(DisasterRecoverySource),
    dataRecoveryTimeBetweenBackups: S.optional(TargetSource),
  }),
).annotate({
  identifier: "EffectivePolicyValues",
}) as any as S.Schema<EffectivePolicyValues>;
export type AchievabilityStatus =
  | "ACHIEVABLE"
  | "NOT_ACHIEVABLE"
  | (string & {});
export const AchievabilityStatus = S.String;

export interface Achievability {
  availabilitySlo?: AchievabilityStatus;
  multiAzRtoRpo?: AchievabilityStatus;
  multiRegionRtoRpo?: AchievabilityStatus;
  dataRecoveryTimeBetweenBackups?: AchievabilityStatus;
}
export const Achievability = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilitySlo: S.optional(AchievabilityStatus),
    multiAzRtoRpo: S.optional(AchievabilityStatus),
    multiRegionRtoRpo: S.optional(AchievabilityStatus),
    dataRecoveryTimeBetweenBackups: S.optional(AchievabilityStatus),
  }),
).annotate({ identifier: "Achievability" }) as any as S.Schema<Achievability>;
export type CostCurrency = "USD" | (string & {});
export const CostCurrency = S.String;

export interface AssessmentCost {
  amount?: number;
  currency?: CostCurrency;
}
export const AssessmentCost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amount: S.optional(S.Number),
    currency: S.optional(CostCurrency),
  }),
).annotate({ identifier: "AssessmentCost" }) as any as S.Schema<AssessmentCost>;
export type ResourceDiscoveryRunStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | "NOT_STARTED"
  | (string & {});
export const ResourceDiscoveryRunStatus = S.String;

export type ResourceDiscoveryErrorCode =
  | "INVALID_PERMISSIONS"
  | "STACK_NOT_FOUND"
  | "CLUSTER_NOT_FOUND"
  | "STATE_FILE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "UNSUPPORTED_CLUSTER"
  | "INTERNAL_ERROR"
  | (string & {});
export const ResourceDiscoveryErrorCode = S.String;

export interface ResourceDiscoveryStatus {
  status?: ResourceDiscoveryRunStatus;
  lastRunAt?: Date;
  errorCode?: ResourceDiscoveryErrorCode;
  errorMessage?: string;
}
export const ResourceDiscoveryStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ResourceDiscoveryRunStatus),
    lastRunAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorCode: S.optional(ResourceDiscoveryErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceDiscoveryStatus",
}) as any as S.Schema<ResourceDiscoveryStatus>;
export type AssessmentStatus =
  | "NOT_STARTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export const AssessmentStatus = S.String;

export type OrganizationId = string;
export type OuId = string;
export type AccountId = string;
export interface Service {
  serviceArn: string;
  name: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions?: string[];
  permissionModel?: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryConfig;
  effectivePolicyValues?: EffectivePolicyValues;
  achievability?: Achievability;
  reportConfiguration?: ServiceReportConfiguration;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  estimatedAssessmentCost?: AssessmentCost;
  resourceDiscovery?: ResourceDiscoveryStatus;
  assessmentStatus?: AssessmentStatus;
  rerunAssessment?: boolean;
  openFindingsCount?: number;
  resolvedFindingsCount?: number;
  organizationId?: string;
  ouId?: string;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    associatedSystems: S.optional(AssociatedSystemList),
    policyArn: S.optional(S.String),
    regions: S.optional(RegionList),
    permissionModel: S.optional(PermissionModel),
    dependencyDiscovery: S.optional(DependencyDiscoveryConfig),
    effectivePolicyValues: S.optional(EffectivePolicyValues),
    achievability: S.optional(Achievability),
    reportConfiguration: S.optional(ServiceReportConfiguration),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    estimatedAssessmentCost: S.optional(AssessmentCost),
    resourceDiscovery: S.optional(ResourceDiscoveryStatus),
    assessmentStatus: S.optional(AssessmentStatus),
    rerunAssessment: S.optional(S.Boolean),
    openFindingsCount: S.optional(S.Number),
    resolvedFindingsCount: S.optional(S.Number),
    organizationId: S.optional(S.String),
    ouId: S.optional(S.String),
    accountId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface CreateServiceResponse {
  service: Service;
}
export const CreateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "CreateServiceResponse",
}) as any as S.Schema<CreateServiceResponse>;
export type EntityLabel = string;
export type EntityDescription = string;
export type ServiceFunctionCriticality =
  | "PRIMARY"
  | "SUPPLEMENTAL"
  | (string & {});
export const ServiceFunctionCriticality = S.String;

export interface CreateServiceFunctionRequest {
  name: string;
  serviceArn: string;
  description?: string;
  criticality: ServiceFunctionCriticality;
  clientToken?: string;
}
export const CreateServiceFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    serviceArn: S.String,
    description: S.optional(S.String),
    criticality: ServiceFunctionCriticality,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-service-function" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceFunctionRequest",
}) as any as S.Schema<CreateServiceFunctionRequest>;
export type EntityId = string;
export type ServiceFunctionSource = "AI_GENERATED" | "USER" | (string & {});
export const ServiceFunctionSource = S.String;

export interface ServiceFunction {
  serviceArn: string;
  serviceFunctionId: string;
  name: string;
  description?: string;
  criticality: ServiceFunctionCriticality;
  resourceCount?: number;
  source?: ServiceFunctionSource;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ServiceFunction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    serviceFunctionId: S.String,
    name: S.String,
    description: S.optional(S.String),
    criticality: ServiceFunctionCriticality,
    resourceCount: S.optional(S.Number),
    source: S.optional(ServiceFunctionSource),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ServiceFunction",
}) as any as S.Schema<ServiceFunction>;
export interface CreateServiceFunctionResponse {
  serviceFunction: ServiceFunction;
}
export const CreateServiceFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceFunction: ServiceFunction }),
).annotate({
  identifier: "CreateServiceFunctionResponse",
}) as any as S.Schema<CreateServiceFunctionResponse>;
export type ResourceList = string[];
export const ResourceList = /*@__PURE__*/ S.Array(S.String);
export interface CreateServiceFunctionResourcesRequest {
  serviceArn: string;
  serviceFunctionId: string;
  resources: string[];
}
export const CreateServiceFunctionResourcesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceArn: S.String,
      serviceFunctionId: S.String,
      resources: ResourceList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/create-service-function-resources",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateServiceFunctionResourcesRequest",
}) as any as S.Schema<CreateServiceFunctionResourcesRequest>;
export interface CreateServiceFunctionResourcesResponse {
  serviceArn?: string;
  serviceFunctionId?: string;
  resources?: string[];
}
export const CreateServiceFunctionResourcesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceArn: S.optional(S.String),
      serviceFunctionId: S.optional(S.String),
      resources: S.optional(ResourceList),
    }),
).annotate({
  identifier: "CreateServiceFunctionResourcesResponse",
}) as any as S.Schema<CreateServiceFunctionResourcesResponse>;
export interface CreateSystemRequest {
  name: string;
  description?: string;
  sharingEnabled?: boolean;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    sharingEnabled: S.optional(S.Boolean),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-system" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSystemRequest",
}) as any as S.Schema<CreateSystemRequest>;
export type SystemId = string;
export interface System {
  systemArn: string;
  systemId: string;
  name: string;
  description?: string;
  sharingEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
  organizationId?: string;
  ouId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const System = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String,
    systemId: S.String,
    name: S.String,
    description: S.optional(S.String),
    sharingEnabled: S.optional(S.Boolean),
    tags: S.optional(TagMap),
    kmsKeyId: S.optional(S.String),
    organizationId: S.optional(S.String),
    ouId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "System" }) as any as S.Schema<System>;
export interface CreateSystemResponse {
  system: System;
}
export const CreateSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ system: System }),
).annotate({
  identifier: "CreateSystemResponse",
}) as any as S.Schema<CreateSystemResponse>;
export interface LoggingConfiguration {
  s3BucketName?: string;
  cloudWatchLogGroupArn?: string;
  logSchemaVersion?: string;
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3BucketName: S.optional(S.String),
    cloudWatchLogGroupArn: S.optional(S.String),
    logSchemaVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export type StopConditionSource =
  | "aws:cloudwatch:alarm"
  | "none"
  | (string & {});
export const StopConditionSource = S.String;

export interface StopCondition {
  source: StopConditionSource;
  value: string;
}
export const StopCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: StopConditionSource, value: S.String }),
).annotate({ identifier: "StopCondition" }) as any as S.Schema<StopCondition>;
export type StopConditionList = StopCondition[];
export const StopConditionList = /*@__PURE__*/ S.Array(StopCondition);
export type ParameterKey = string;
export type ParameterValue = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type TestParameters = { [key: string]: string[] | undefined };
export const TestParameters = /*@__PURE__*/ S.Record(
  S.String,
  StringList.pipe(S.optional),
);
export interface CreateTestRequest {
  serviceArn: string;
  testTemplateArn: string;
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
}
export const CreateTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    testTemplateArn: S.String,
    loggingConfiguration: S.optional(LoggingConfiguration),
    stopConditions: S.optional(StopConditionList),
    roleName: S.optional(S.String),
    parameters: S.optional(TestParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTestRequest",
}) as any as S.Schema<CreateTestRequest>;
export type TestId = string;
export interface TestAction {
  actionId: string;
  description?: string;
  resourceType: string;
}
export const TestAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionId: S.String,
    description: S.optional(S.String),
    resourceType: S.String,
  }),
).annotate({ identifier: "TestAction" }) as any as S.Schema<TestAction>;
export type TestActionList = TestAction[];
export const TestActionList = /*@__PURE__*/ S.Array(TestAction);
export interface Test {
  testId: string;
  testTemplateArn: string;
  serviceArn: string;
  name: string;
  actions?: TestAction[];
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
  totalTestRuns: number;
  successfulTestRuns: number;
  creationTime: Date;
}
export const Test = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String,
    testTemplateArn: S.String,
    serviceArn: S.String,
    name: S.String,
    actions: S.optional(TestActionList),
    loggingConfiguration: S.optional(LoggingConfiguration),
    stopConditions: S.optional(StopConditionList),
    roleName: S.optional(S.String),
    parameters: S.optional(TestParameters),
    totalTestRuns: S.Number,
    successfulTestRuns: S.Number,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Test" }) as any as S.Schema<Test>;
export interface CreateTestResponse {
  test: Test;
}
export const CreateTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ test: Test }),
).annotate({
  identifier: "CreateTestResponse",
}) as any as S.Schema<CreateTestResponse>;
export interface CreateUserJourneyRequest {
  systemArn: string;
  name: string;
  description?: string;
  policyArn?: string;
  clientToken?: string;
}
export const CreateUserJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    policyArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/create-user-journey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserJourneyRequest",
}) as any as S.Schema<CreateUserJourneyRequest>;
export interface UserJourney {
  userJourneyId: string;
  name: string;
  description?: string;
  policyArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UserJourney = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneyId: S.String,
    name: S.String,
    description: S.optional(S.String),
    policyArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "UserJourney" }) as any as S.Schema<UserJourney>;
export interface CreateUserJourneyResponse {
  userJourney: UserJourney;
}
export const CreateUserJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userJourney: UserJourney }),
).annotate({
  identifier: "CreateUserJourneyResponse",
}) as any as S.Schema<CreateUserJourneyResponse>;
export interface DeleteAssertionRequest {
  serviceArn: string;
  assertionId: string;
}
export const DeleteAssertionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String, assertionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-assertion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssertionRequest",
}) as any as S.Schema<DeleteAssertionRequest>;
export interface DeleteAssertionResponse {
  assertionId?: string;
}
export const DeleteAssertionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assertionId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteAssertionResponse",
}) as any as S.Schema<DeleteAssertionResponse>;
export interface DeleteInputSourceRequest {
  serviceArn: string;
  inputSourceId: string;
}
export const DeleteInputSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String, inputSourceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-input-source" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInputSourceRequest",
}) as any as S.Schema<DeleteInputSourceRequest>;
export interface DeleteInputSourceResponse {
  serviceArn: string;
  inputSourceId: string;
}
export const DeleteInputSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String, inputSourceId: S.String }),
).annotate({
  identifier: "DeleteInputSourceResponse",
}) as any as S.Schema<DeleteInputSourceResponse>;
export interface DeletePolicyRequest {
  policyArn: string;
}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {
  policyArn: string;
}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyArn: S.String }),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeleteServiceRequest {
  serviceArn: string;
}
export const DeleteServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-service" }),
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
  serviceArn: string;
}
export const DeleteServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String }),
).annotate({
  identifier: "DeleteServiceResponse",
}) as any as S.Schema<DeleteServiceResponse>;
export interface DeleteServiceFunctionRequest {
  serviceArn: string;
  serviceFunctionId: string;
}
export const DeleteServiceFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String, serviceFunctionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-function" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceFunctionRequest",
}) as any as S.Schema<DeleteServiceFunctionRequest>;
export interface DeleteServiceFunctionResponse {
  serviceFunctionId?: string;
}
export const DeleteServiceFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceFunctionId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteServiceFunctionResponse",
}) as any as S.Schema<DeleteServiceFunctionResponse>;
export interface DeleteServiceFunctionResourcesRequest {
  serviceArn: string;
  serviceFunctionId: string;
  resources: string[];
}
export const DeleteServiceFunctionResourcesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceArn: S.String,
      serviceFunctionId: S.String,
      resources: ResourceList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/delete-service-function-resources",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteServiceFunctionResourcesRequest",
}) as any as S.Schema<DeleteServiceFunctionResourcesRequest>;
export interface DeleteServiceFunctionResourcesResponse {
  serviceArn?: string;
  serviceFunctionId?: string;
  resources?: string[];
}
export const DeleteServiceFunctionResourcesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceArn: S.optional(S.String),
      serviceFunctionId: S.optional(S.String),
      resources: S.optional(ResourceList),
    }),
).annotate({
  identifier: "DeleteServiceFunctionResourcesResponse",
}) as any as S.Schema<DeleteServiceFunctionResourcesResponse>;
export interface DeleteSystemRequest {
  systemArn: string;
}
export const DeleteSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ systemArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-system" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSystemRequest",
}) as any as S.Schema<DeleteSystemRequest>;
export interface DeleteSystemResponse {
  systemArn: string;
}
export const DeleteSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ systemArn: S.String }),
).annotate({
  identifier: "DeleteSystemResponse",
}) as any as S.Schema<DeleteSystemResponse>;
export interface DeleteTestRequest {
  testId: string;
  serviceArn: string;
}
export const DeleteTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testId: S.String, serviceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTestRequest",
}) as any as S.Schema<DeleteTestRequest>;
export interface DeleteTestResponse {
  testId: string;
}
export const DeleteTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testId: S.String }),
).annotate({
  identifier: "DeleteTestResponse",
}) as any as S.Schema<DeleteTestResponse>;
export type CloudWatchAlarmArn = string;
export interface SuccessCriteriaAlarmInput {
  alarmArn: string;
}
export const SuccessCriteriaAlarmInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ alarmArn: S.String }),
).annotate({
  identifier: "SuccessCriteriaAlarmInput",
}) as any as S.Schema<SuccessCriteriaAlarmInput>;
export interface ObservabilityAlarmInput {
  alarmArn: string;
}
export const ObservabilityAlarmInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ alarmArn: S.String }),
).annotate({
  identifier: "ObservabilityAlarmInput",
}) as any as S.Schema<ObservabilityAlarmInput>;
export type TestSourceInput =
  | {
      successCriteriaAlarm: SuccessCriteriaAlarmInput;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: ObservabilityAlarmInput;
    };
export const TestSourceInput = /*@__PURE__*/ S.Union([
  S.Struct({ successCriteriaAlarm: SuccessCriteriaAlarmInput }),
  S.Struct({ observabilityAlarm: ObservabilityAlarmInput }),
]);
export type TestSourceInputList = TestSourceInput[];
export const TestSourceInputList = /*@__PURE__*/ S.Array(TestSourceInput);
export interface DeleteTestSourcesRequest {
  testId: string;
  serviceArn: string;
  testSources: TestSourceInput[];
}
export const DeleteTestSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String,
    serviceArn: S.String,
    testSources: TestSourceInputList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-test-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTestSourcesRequest",
}) as any as S.Schema<DeleteTestSourcesRequest>;
export interface DeleteTestSourcesResponse {}
export const DeleteTestSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTestSourcesResponse",
}) as any as S.Schema<DeleteTestSourcesResponse>;
export interface DeleteUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
}
export const DeleteUserJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ systemArn: S.String, userJourneyId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/delete-user-journey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserJourneyRequest",
}) as any as S.Schema<DeleteUserJourneyRequest>;
export interface DeleteUserJourneyResponse {
  userJourneyId: string;
}
export const DeleteUserJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userJourneyId: S.String }),
).annotate({
  identifier: "DeleteUserJourneyResponse",
}) as any as S.Schema<DeleteUserJourneyResponse>;
export interface GetFailureModeFindingRequest {
  findingId: string;
  serviceArn: string;
}
export const GetFailureModeFindingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.String.pipe(T.HttpQuery("findingId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-failure-mode-finding" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFailureModeFindingRequest",
}) as any as S.Schema<GetFailureModeFindingRequest>;
export type FailureCategory =
  | "SHARED_FATE"
  | "EXCESSIVE_LOAD"
  | "EXCESSIVE_LATENCY"
  | "MISCONFIGURATION_AND_BUGS"
  | "SINGLE_POINT_OF_FAILURE"
  | (string & {});
export const FailureCategory = S.String;

export type FindingStatus = "OPEN" | "RESOLVED" | "IRRELEVANT" | (string & {});
export const FindingStatus = S.String;

export type FindingSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const FindingSeverity = S.String;

export type FunctionsList = string[];
export const FunctionsList = /*@__PURE__*/ S.Array(S.String);
export type PolicyComponent =
  | "AVAILABILITY_SLO"
  | "MULTI_AZ_DISASTER_RECOVERY"
  | "MULTI_REGION_DISASTER_RECOVERY"
  | "DATA_RECOVERY"
  | (string & {});
export const PolicyComponent = S.String;

export type SuggestedChangesList = string[];
export const SuggestedChangesList = /*@__PURE__*/ S.Array(S.String);
export interface InfrastructureAndCodeRecommendation {
  suggestedChanges?: string[];
}
export const InfrastructureAndCodeRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ suggestedChanges: S.optional(SuggestedChangesList) }),
).annotate({
  identifier: "InfrastructureAndCodeRecommendation",
}) as any as S.Schema<InfrastructureAndCodeRecommendation>;
export type InfrastructureAndCodeRecommendationsList =
  InfrastructureAndCodeRecommendation[];
export const InfrastructureAndCodeRecommendationsList = /*@__PURE__*/ S.Array(
  InfrastructureAndCodeRecommendation,
);
export interface ObservabilityRecommendation {
  suggestedChanges?: string[];
}
export const ObservabilityRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ suggestedChanges: S.optional(SuggestedChangesList) }),
).annotate({
  identifier: "ObservabilityRecommendation",
}) as any as S.Schema<ObservabilityRecommendation>;
export type ObservabilityRecommendationsList = ObservabilityRecommendation[];
export const ObservabilityRecommendationsList = /*@__PURE__*/ S.Array(
  ObservabilityRecommendation,
);
export interface TestingRecommendation {
  suggestedChanges?: string[];
}
export const TestingRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ suggestedChanges: S.optional(SuggestedChangesList) }),
).annotate({
  identifier: "TestingRecommendation",
}) as any as S.Schema<TestingRecommendation>;
export type TestingRecommendationsList = TestingRecommendation[];
export const TestingRecommendationsList = /*@__PURE__*/ S.Array(
  TestingRecommendation,
);
export interface Finding {
  findingId?: string;
  name?: string;
  description?: string;
  failureCategory?: FailureCategory;
  status?: FindingStatus;
  reasoning?: string;
  comment?: string;
  severity?: FindingSeverity;
  serviceFunctions?: string[];
  policyComponent?: PolicyComponent;
  infrastructureAndCodeRecommendations?: InfrastructureAndCodeRecommendation[];
  observabilityRecommendations?: ObservabilityRecommendation[];
  testingRecommendations?: TestingRecommendation[];
  updatedAt?: Date;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    failureCategory: S.optional(FailureCategory),
    status: S.optional(FindingStatus),
    reasoning: S.optional(S.String),
    comment: S.optional(S.String),
    severity: S.optional(FindingSeverity),
    serviceFunctions: S.optional(FunctionsList),
    policyComponent: S.optional(PolicyComponent),
    infrastructureAndCodeRecommendations: S.optional(
      InfrastructureAndCodeRecommendationsList,
    ),
    observabilityRecommendations: S.optional(ObservabilityRecommendationsList),
    testingRecommendations: S.optional(TestingRecommendationsList),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export interface GetFailureModeFindingResponse {
  finding?: Finding;
}
export const GetFailureModeFindingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ finding: S.optional(Finding) }),
).annotate({
  identifier: "GetFailureModeFindingResponse",
}) as any as S.Schema<GetFailureModeFindingResponse>;
export interface GetPolicyRequest {
  policyArn: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyArn: S.String.pipe(T.HttpQuery("policyArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export interface GetPolicyResponse {
  policy: Policy;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: Policy }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetServiceRequest {
  serviceArn: string;
}
export const GetServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceArn: S.String.pipe(T.HttpQuery("serviceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-service" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceRequest",
}) as any as S.Schema<GetServiceRequest>;
export interface GetServiceResponse {
  service: Service;
}
export const GetServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "GetServiceResponse",
}) as any as S.Schema<GetServiceResponse>;
export interface GetSystemRequest {
  systemArn: string;
}
export const GetSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ systemArn: S.String.pipe(T.HttpQuery("systemArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-system" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSystemRequest",
}) as any as S.Schema<GetSystemRequest>;
export interface GetSystemResponse {
  system: System;
}
export const GetSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ system: System }),
).annotate({
  identifier: "GetSystemResponse",
}) as any as S.Schema<GetSystemResponse>;
export interface GetTestRequest {
  testId: string;
  serviceArn: string;
}
export const GetTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String.pipe(T.HttpQuery("testId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTestRequest" }) as any as S.Schema<GetTestRequest>;
export interface GetTestResponse {
  test: Test;
}
export const GetTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ test: Test }),
).annotate({
  identifier: "GetTestResponse",
}) as any as S.Schema<GetTestResponse>;
export interface GetTestRunRequest {
  testRunId: string;
  serviceArn: string;
}
export const GetTestRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String.pipe(T.HttpQuery("testRunId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-test-run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTestRunRequest",
}) as any as S.Schema<GetTestRunRequest>;
export type TestRunStatus =
  | "INITIALIZING"
  | "RUNNING"
  | "STOPPING"
  | "PASSED"
  | "FAILED"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export const TestRunStatus = S.String;

export interface ExperimentDetails {
  experimentArn: string;
  details?: string;
}
export const ExperimentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ experimentArn: S.String, details: S.optional(S.String) }),
).annotate({
  identifier: "ExperimentDetails",
}) as any as S.Schema<ExperimentDetails>;
export type ExperimentDetailsList = ExperimentDetails[];
export const ExperimentDetailsList = /*@__PURE__*/ S.Array(ExperimentDetails);
export interface TestRunReportConfiguration {
  reportOutput: ReportOutputConfiguration[];
}
export const TestRunReportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reportOutput: ReportOutputConfigurationList }),
).annotate({
  identifier: "TestRunReportConfiguration",
}) as any as S.Schema<TestRunReportConfiguration>;
export interface TestRunPolicySnapshot {
  policyArn?: string;
  name?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
}
export const TestRunPolicySnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.optional(S.String),
    name: S.optional(S.String),
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAz: S.optional(MultiAzTargets),
    multiRegion: S.optional(MultiRegionTargets),
    dataRecovery: S.optional(DataRecoveryTargets),
  }),
).annotate({
  identifier: "TestRunPolicySnapshot",
}) as any as S.Schema<TestRunPolicySnapshot>;
export type RegionSwitchExecutionId = string;
export type AccountTargeting =
  | "SINGLE_ACCOUNT"
  | "MULTI_ACCOUNT"
  | (string & {});
export const AccountTargeting = S.String;

export interface TestRun {
  testRunId: string;
  testId: string;
  status: TestRunStatus;
  serviceArn?: string;
  startedAt: Date;
  endedAt?: Date;
  experiments?: ExperimentDetails[];
  eventCount?: number;
  parameters?: { [key: string]: string[] | undefined };
  errorMessage?: string;
  stopConditions?: StopCondition[];
  loggingConfiguration?: LoggingConfiguration;
  roleName?: string;
  testTemplateArn: string;
  reportConfiguration?: TestRunReportConfiguration;
  policy?: TestRunPolicySnapshot;
  reportOutput?: ReportGenerationResult;
  regionSwitchPlanArn?: string;
  regionSwitchExecutionId?: string;
  permissionModel?: PermissionModel;
  regions?: string[];
  accountTargeting?: AccountTargeting;
}
export const TestRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String,
    testId: S.String,
    status: TestRunStatus,
    serviceArn: S.optional(S.String),
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    experiments: S.optional(ExperimentDetailsList),
    eventCount: S.optional(S.Number),
    parameters: S.optional(TestParameters),
    errorMessage: S.optional(S.String),
    stopConditions: S.optional(StopConditionList),
    loggingConfiguration: S.optional(LoggingConfiguration),
    roleName: S.optional(S.String),
    testTemplateArn: S.String,
    reportConfiguration: S.optional(TestRunReportConfiguration),
    policy: S.optional(TestRunPolicySnapshot),
    reportOutput: S.optional(ReportGenerationResult),
    regionSwitchPlanArn: S.optional(S.String),
    regionSwitchExecutionId: S.optional(S.String),
    permissionModel: S.optional(PermissionModel),
    regions: S.optional(RegionList),
    accountTargeting: S.optional(AccountTargeting),
  }),
).annotate({ identifier: "TestRun" }) as any as S.Schema<TestRun>;
export interface GetTestRunResponse {
  testRun: TestRun;
}
export const GetTestRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testRun: TestRun }),
).annotate({
  identifier: "GetTestRunResponse",
}) as any as S.Schema<GetTestRunResponse>;
export interface GetTestTemplateRequest {
  testTemplateArn: string;
}
export const GetTestTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testTemplateArn: S.String.pipe(T.HttpQuery("testTemplateArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-test-template" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTestTemplateRequest",
}) as any as S.Schema<GetTestTemplateRequest>;
export type ParameterType =
  | "STRING"
  | "STRING_LIST"
  | "INTEGER"
  | (string & {});
export const ParameterType = S.String;

export interface TestTemplateParameter {
  name: string;
  description?: string;
  type: ParameterType;
  required: boolean;
  defaultValue?: string;
  maxValues?: number;
}
export const TestTemplateParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    type: ParameterType,
    required: S.Boolean,
    defaultValue: S.optional(S.String),
    maxValues: S.optional(S.Number),
  }),
).annotate({
  identifier: "TestTemplateParameter",
}) as any as S.Schema<TestTemplateParameter>;
export type TestTemplateParameterList = TestTemplateParameter[];
export const TestTemplateParameterList = /*@__PURE__*/ S.Array(
  TestTemplateParameter,
);
export interface TestTemplate {
  testTemplateArn: string;
  name: string;
  description?: string;
  parameters?: TestTemplateParameter[];
  actions?: TestAction[];
}
export const TestTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testTemplateArn: S.String,
    name: S.String,
    description: S.optional(S.String),
    parameters: S.optional(TestTemplateParameterList),
    actions: S.optional(TestActionList),
  }),
).annotate({ identifier: "TestTemplate" }) as any as S.Schema<TestTemplate>;
export interface GetTestTemplateResponse {
  testTemplate: TestTemplate;
}
export const GetTestTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testTemplate: TestTemplate }),
).annotate({
  identifier: "GetTestTemplateResponse",
}) as any as S.Schema<GetTestTemplateResponse>;
export interface GetUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
}
export const GetUserJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String.pipe(T.HttpQuery("systemArn")),
    userJourneyId: S.String.pipe(T.HttpQuery("userJourneyId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/get-user-journey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserJourneyRequest",
}) as any as S.Schema<GetUserJourneyRequest>;
export interface GetUserJourneyResponse {
  userJourney: UserJourney;
}
export const GetUserJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userJourney: UserJourney }),
).annotate({
  identifier: "GetUserJourneyResponse",
}) as any as S.Schema<GetUserJourneyResponse>;
export interface ImportAppRequest {
  v1AppArn: string;
  policyArn?: string;
  kmsKeyId?: string;
  skipManuallyAddedResources?: boolean;
  associatedSystems?: AssociatedSystem[];
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const ImportAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    v1AppArn: S.String,
    policyArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    skipManuallyAddedResources: S.optional(S.Boolean),
    associatedSystems: S.optional(AssociatedSystemList),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/import-app" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportAppRequest",
}) as any as S.Schema<ImportAppRequest>;
export interface ImportAppResponse {
  service: Service;
}
export const ImportAppResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "ImportAppResponse",
}) as any as S.Schema<ImportAppResponse>;
export interface ImportPolicyRequest {
  v1PolicyArn: string;
  kmsKeyId?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAzDisasterRecoveryApproach?: MultiAzDisasterRecoveryApproach;
  multiRegionDisasterRecoveryApproach?: MultiRegionDisasterRecoveryApproach;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const ImportPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    v1PolicyArn: S.String,
    kmsKeyId: S.optional(S.String),
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAzDisasterRecoveryApproach: S.optional(
      MultiAzDisasterRecoveryApproach,
    ),
    multiRegionDisasterRecoveryApproach: S.optional(
      MultiRegionDisasterRecoveryApproach,
    ),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/import-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportPolicyRequest",
}) as any as S.Schema<ImportPolicyRequest>;
export interface ImportPolicyResponse {
  policy: Policy;
}
export const ImportPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: Policy }),
).annotate({
  identifier: "ImportPolicyResponse",
}) as any as S.Schema<ImportPolicyResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAssertionsRequest {
  serviceArn: string;
  source?: AssertionSource;
  maxResults?: number;
  nextToken?: string;
}
export const ListAssertionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    source: S.optional(AssertionSource).pipe(T.HttpQuery("source")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-assertions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssertionsRequest",
}) as any as S.Schema<ListAssertionsRequest>;
export type AssertionList = Assertion[];
export const AssertionList = /*@__PURE__*/ S.Array(Assertion);
export interface ListAssertionsResponse {
  assertions: Assertion[];
  nextToken?: string;
}
export const ListAssertionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assertions: AssertionList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssertionsResponse",
}) as any as S.Schema<ListAssertionsResponse>;
export type QueryGranularity = "HOURLY" | "DAILY" | (string & {});
export const QueryGranularity = S.String;

export interface ListDependenciesRequest {
  serviceArn?: string;
  queryRangeStartTime?: Date;
  queryRangeEndTime?: Date;
  queryRangeGranularity?: QueryGranularity;
  maxResults?: number;
  nextToken?: string;
}
export const ListDependenciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String).pipe(T.HttpQuery("serviceArn")),
    queryRangeStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("queryRangeStartTime")),
    queryRangeEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("queryRangeEndTime")),
    queryRangeGranularity: S.optional(QueryGranularity).pipe(
      T.HttpQuery("queryRangeGranularity"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-dependencies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDependenciesRequest",
}) as any as S.Schema<ListDependenciesRequest>;
export interface QueryDataPoint {
  timestamp: Date;
  queryCount: number;
}
export const QueryDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    queryCount: S.Number,
  }),
).annotate({ identifier: "QueryDataPoint" }) as any as S.Schema<QueryDataPoint>;
export type QueryDataPointList = QueryDataPoint[];
export const QueryDataPointList = /*@__PURE__*/ S.Array(QueryDataPoint);
export interface QueryRange {
  startTime: Date;
  endTime: Date;
  granularity: QueryGranularity;
  dataPoints: QueryDataPoint[];
}
export const QueryRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    granularity: QueryGranularity,
    dataPoints: QueryDataPointList,
  }),
).annotate({ identifier: "QueryRange" }) as any as S.Schema<QueryRange>;
export type DependencyCriticality = "HARD" | "SOFT" | "UNKNOWN" | (string & {});
export const DependencyCriticality = S.String;

export interface DependencySummary {
  dependencyId: string;
  serviceArn: string;
  dependencyName: string;
  dnsName: string;
  location: string;
  lastDetectedTime: Date;
  sourceRegions: string[];
  provider?: string;
  queryRange: QueryRange;
  criticality: DependencyCriticality;
  comment?: string;
}
export const DependencySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dependencyId: S.String,
    serviceArn: S.String,
    dependencyName: S.String,
    dnsName: S.String,
    location: S.String,
    lastDetectedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    sourceRegions: RegionList,
    provider: S.optional(S.String),
    queryRange: QueryRange,
    criticality: DependencyCriticality,
    comment: S.optional(S.String),
  }),
).annotate({
  identifier: "DependencySummary",
}) as any as S.Schema<DependencySummary>;
export type DependencySummaryList = DependencySummary[];
export const DependencySummaryList = /*@__PURE__*/ S.Array(DependencySummary);
export interface ListDependenciesResponse {
  dependencySummaries: DependencySummary[];
  nextToken?: string;
}
export const ListDependenciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dependencySummaries: DependencySummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDependenciesResponse",
}) as any as S.Schema<ListDependenciesResponse>;
export type AssessmentStatusList = AssessmentStatus[];
export const AssessmentStatusList = /*@__PURE__*/ S.Array(AssessmentStatus);
export type AssessmentSortField = "STARTED_AT" | (string & {});
export const AssessmentSortField = S.String;

export type SortOrder = "ASC" | "DESC" | (string & {});
export const SortOrder = S.String;

export interface ListFailureModeAssessmentsRequest {
  serviceArn: string;
  assessmentStatuses?: AssessmentStatus[];
  startedAfter?: Date;
  endedBefore?: Date;
  sortBy?: AssessmentSortField;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export const ListFailureModeAssessmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    assessmentStatuses: S.optional(AssessmentStatusList).pipe(
      T.HttpQuery("assessmentStatuses"),
    ),
    startedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("startedAfter")),
    endedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("endedBefore")),
    sortBy: S.optional(AssessmentSortField).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-failure-mode-assessments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFailureModeAssessmentsRequest",
}) as any as S.Schema<ListFailureModeAssessmentsRequest>;
export type AssessmentStep =
  | "TOPOLOGY_GENERATION"
  | "INPUT_VALIDATION"
  | "DESIGN_ANALYSIS"
  | "TOPOLOGY_ENHANCEMENT"
  | "SERVICE_FUNCTION_GENERATION"
  | "POLICY_VALIDATION"
  | "RESILIENCE_ASSESSMENT"
  | "FAILURE_MODE_FINDINGS_CONSOLIDATION"
  | "FAILURE_MODE_FINDINGS_ENRICHMENT"
  | (string & {});
export const AssessmentStep = S.String;

export type AssessmentErrorCode =
  | "INVALID_PERMISSIONS"
  | "CMK_ACCESS_DENIED"
  | "AGENT_ERROR"
  | "INTERNAL_ERROR"
  | "DESIGN_FILE_ACCESS_DENIED"
  | (string & {});
export const AssessmentErrorCode = S.String;

export interface AssessmentSummary {
  assessmentId: string;
  serviceArn: string;
  assessmentStatus?: AssessmentStatus;
  assessmentStep?: AssessmentStep;
  totalFindings?: number;
  startedAt?: Date;
  endedAt?: Date;
  errorMessage?: string;
  errorCode?: AssessmentErrorCode;
  assessmentCost?: AssessmentCost;
  billableAssessmentUnitCount?: number;
  achievability?: Achievability;
}
export const AssessmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentId: S.String,
    serviceArn: S.String,
    assessmentStatus: S.optional(AssessmentStatus),
    assessmentStep: S.optional(AssessmentStep),
    totalFindings: S.optional(S.Number),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorMessage: S.optional(S.String),
    errorCode: S.optional(AssessmentErrorCode),
    assessmentCost: S.optional(AssessmentCost),
    billableAssessmentUnitCount: S.optional(S.Number),
    achievability: S.optional(Achievability),
  }),
).annotate({
  identifier: "AssessmentSummary",
}) as any as S.Schema<AssessmentSummary>;
export type AssessmentSummaryList = AssessmentSummary[];
export const AssessmentSummaryList = /*@__PURE__*/ S.Array(AssessmentSummary);
export interface ListFailureModeAssessmentsResponse {
  assessmentSummaries: AssessmentSummary[];
  nextToken?: string;
}
export const ListFailureModeAssessmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentSummaries: AssessmentSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFailureModeAssessmentsResponse",
}) as any as S.Schema<ListFailureModeAssessmentsResponse>;
export interface ListFailureModeFindingsRequest {
  serviceArn: string;
  severity?: FindingSeverity;
  failureCategory?: FailureCategory;
  status?: FindingStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListFailureModeFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    severity: S.optional(FindingSeverity).pipe(T.HttpQuery("severity")),
    failureCategory: S.optional(FailureCategory).pipe(
      T.HttpQuery("failureCategory"),
    ),
    status: S.optional(FindingStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-failure-mode-findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFailureModeFindingsRequest",
}) as any as S.Schema<ListFailureModeFindingsRequest>;
export interface FindingSummary {
  serviceArn?: string;
  findingId?: string;
  name?: string;
  description?: string;
  failureCategory?: FailureCategory;
  severity?: FindingSeverity;
  status?: FindingStatus;
  policyComponent?: PolicyComponent;
  updatedAt?: Date;
}
export const FindingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String),
    findingId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    failureCategory: S.optional(FailureCategory),
    severity: S.optional(FindingSeverity),
    status: S.optional(FindingStatus),
    policyComponent: S.optional(PolicyComponent),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "FindingSummary" }) as any as S.Schema<FindingSummary>;
export type FindingsList = FindingSummary[];
export const FindingsList = /*@__PURE__*/ S.Array(FindingSummary);
export interface ListFailureModeFindingsResponse {
  findingsSummary: FindingSummary[];
  nextToken?: string;
}
export const ListFailureModeFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingsSummary: FindingsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFailureModeFindingsResponse",
}) as any as S.Schema<ListFailureModeFindingsResponse>;
export type InputSourceType =
  | "CFN_STACK"
  | "TAGS"
  | "EKS"
  | "TERRAFORM"
  | "DESIGN_FILE"
  | "MONITORING"
  | (string & {});
export const InputSourceType = S.String;

export interface ListInputSourcesRequest {
  serviceArn: string;
  type?: InputSourceType;
  maxResults?: number;
  nextToken?: string;
}
export const ListInputSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    type: S.optional(InputSourceType).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-input-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInputSourcesRequest",
}) as any as S.Schema<ListInputSourcesRequest>;
export interface InputSourceSummary {
  inputSourceId: string;
  type?: InputSourceType;
  resourceTags?: ResourceTag[];
  cfnStackArn?: string;
  tfStateFileUrl?: string;
  eks?: EksSource;
  designFileS3Url?: string;
  createdAt?: Date;
}
export const InputSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceId: S.String,
    type: S.optional(InputSourceType),
    resourceTags: S.optional(ResourceTagList),
    cfnStackArn: S.optional(S.String),
    tfStateFileUrl: S.optional(S.String),
    eks: S.optional(EksSource),
    designFileS3Url: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InputSourceSummary",
}) as any as S.Schema<InputSourceSummary>;
export type InputSourceSummaryList = InputSourceSummary[];
export const InputSourceSummaryList = /*@__PURE__*/ S.Array(InputSourceSummary);
export interface ListInputSourcesResponse {
  inputSourceSummaries: InputSourceSummary[];
  nextToken?: string;
}
export const ListInputSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputSourceSummaries: InputSourceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInputSourcesResponse",
}) as any as S.Schema<ListInputSourcesResponse>;
export interface ListPoliciesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export interface PolicySummary {
  policyArn: string;
  name: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  associatedServiceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export const PolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.String,
    name: S.String,
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAz: S.optional(MultiAzTargets),
    multiRegion: S.optional(MultiRegionTargets),
    dataRecovery: S.optional(DataRecoveryTargets),
    associatedServiceCount: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "PolicySummary" }) as any as S.Schema<PolicySummary>;
export type PolicySummaryList = PolicySummary[];
export const PolicySummaryList = /*@__PURE__*/ S.Array(PolicySummary);
export interface ListPoliciesResponse {
  policySummaries: PolicySummary[];
  nextToken?: string;
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policySummaries: PolicySummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListReportsRequest {
  serviceArn?: string;
  reportType?: ReportType;
  testRunId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListReportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.optional(S.String).pipe(T.HttpQuery("serviceArn")),
    reportType: S.optional(ReportType).pipe(T.HttpQuery("reportType")),
    testRunId: S.optional(S.String).pipe(T.HttpQuery("testRunId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-reports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReportsRequest",
}) as any as S.Schema<ListReportsRequest>;
export type ReportGenerationResultList = ReportGenerationResult[];
export const ReportGenerationResultList = /*@__PURE__*/ S.Array(
  ReportGenerationResult,
);
export interface ListReportsResponse {
  reportGenerationResults: ReportGenerationResult[];
  nextToken?: string;
}
export const ListReportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reportGenerationResults: ReportGenerationResultList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReportsResponse",
}) as any as S.Schema<ListReportsResponse>;
export interface ListResolvedTestRunTargetResourcesRequest {
  testRunId: string;
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListResolvedTestRunTargetResourcesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      testRunId: S.String.pipe(T.HttpLabel("testRunId")),
      serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/test-runs/{testRunId}/resolved-target-resources",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListResolvedTestRunTargetResourcesRequest",
  }) as any as S.Schema<ListResolvedTestRunTargetResourcesRequest>;
export type ResolvedTargetInformationKey = string;
export type ResolvedTargetInformationValue = string;
export type ResolvedTargetInformation = { [key: string]: string | undefined };
export const ResolvedTargetInformation = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ResolvedTargetResource {
  resourceType: string;
  targetName: string;
  targetInformation: { [key: string]: string | undefined };
}
export const ResolvedTargetResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    targetName: S.String,
    targetInformation: ResolvedTargetInformation,
  }),
).annotate({
  identifier: "ResolvedTargetResource",
}) as any as S.Schema<ResolvedTargetResource>;
export type ResolvedTargetResourceList = ResolvedTargetResource[];
export const ResolvedTargetResourceList = /*@__PURE__*/ S.Array(
  ResolvedTargetResource,
);
export interface ListResolvedTestRunTargetResourcesResponse {
  resolvedTargetResources: ResolvedTargetResource[];
  nextToken?: string;
}
export const ListResolvedTestRunTargetResourcesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resolvedTargetResources: ResolvedTargetResourceList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListResolvedTestRunTargetResourcesResponse",
  }) as any as S.Schema<ListResolvedTestRunTargetResourcesResponse>;
export type ResourceTypeFilter = string;
export type ResourceTypeFilterList = string[];
export const ResourceTypeFilterList = /*@__PURE__*/ S.Array(S.String);
export interface ListResourcesRequest {
  serviceArn: string;
  serviceFunctionId?: string;
  awsRegion?: string;
  resourceTypes?: string[];
  billable?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    serviceFunctionId: S.optional(S.String).pipe(
      T.HttpQuery("serviceFunctionId"),
    ),
    awsRegion: S.optional(S.String).pipe(T.HttpQuery("awsRegion")),
    resourceTypes: S.optional(ResourceTypeFilterList).pipe(
      T.HttpQuery("resourceTypes"),
    ),
    billable: S.optional(S.Boolean).pipe(T.HttpQuery("billable")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcesRequest",
}) as any as S.Schema<ListResourcesRequest>;
export interface InputSource {
  identifier: string;
  type: InputSourceType;
}
export const InputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String, type: InputSourceType }),
).annotate({ identifier: "InputSource" }) as any as S.Schema<InputSource>;
export interface Resource {
  identifier: string;
  awsRegion?: string;
  awsAccountId?: string;
  resourceType?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    awsRegion: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    resourceType: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export interface ServiceResource {
  resourceIdentifier: string;
  inputSource?: InputSource;
  resource: Resource;
}
export const ServiceResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String,
    inputSource: S.optional(InputSource),
    resource: Resource,
  }),
).annotate({
  identifier: "ServiceResource",
}) as any as S.Schema<ServiceResource>;
export type ServiceResourceList = ServiceResource[];
export const ServiceResourceList = /*@__PURE__*/ S.Array(ServiceResource);
export interface ListResourcesResponse {
  serviceFunctionId?: string;
  serviceResources?: ServiceResource[];
  nextToken?: string;
}
export const ListResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctionId: S.optional(S.String),
    serviceResources: S.optional(ServiceResourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesResponse",
}) as any as S.Schema<ListResourcesResponse>;
export type ServiceEventType =
  | "SERVICE_CREATED"
  | "SERVICE_DELETED"
  | "SERVICE_SYSTEM_ASSOCIATED"
  | "SERVICE_SYSTEM_DISASSOCIATED"
  | "SERVICE_RESOURCES_ASSOCIATED"
  | "SERVICE_RESOURCES_DISASSOCIATED"
  | "SERVICE_WORKFLOW_UPDATED"
  | "SERVICE_INPUT_SOURCES_UPDATED"
  | "SERVICE_POLICY_ASSOCIATED"
  | "SERVICE_POLICY_DISASSOCIATED"
  | "SERVICE_FUNCTION_CREATED"
  | "SERVICE_FUNCTION_UPDATED"
  | "SERVICE_FUNCTION_DELETED"
  | "SERVICE_FUNCTION_RESOURCES_ADDED"
  | "SERVICE_FUNCTION_RESOURCES_REMOVED"
  | "SERVICE_ACHIEVABILITY_UPDATED"
  | "ASSERTION_CREATED"
  | "ASSERTION_UPDATED"
  | "ASSERTION_DELETED"
  | (string & {});
export const ServiceEventType = S.String;

export type ServiceEventTypeList = ServiceEventType[];
export const ServiceEventTypeList = /*@__PURE__*/ S.Array(ServiceEventType);
export interface ListServiceEventsRequest {
  serviceArn: string;
  eventTypes?: ServiceEventType[];
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    eventTypes: S.optional(ServiceEventTypeList).pipe(
      T.HttpQuery("eventTypes"),
    ),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-service-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceEventsRequest",
}) as any as S.Schema<ListServiceEventsRequest>;
export type ActorType = "USER" | "SYSTEM" | (string & {});
export const ActorType = S.String;

export interface EventActor {
  type: ActorType;
  principalId: string;
  accountId?: string;
  userName?: string;
}
export const EventActor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: ActorType,
    principalId: S.String,
    accountId: S.optional(S.String),
    userName: S.optional(S.String),
  }),
).annotate({ identifier: "EventActor" }) as any as S.Schema<EventActor>;
export interface ServiceCreatedMetadata {}
export const ServiceCreatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ServiceCreatedMetadata",
}) as any as S.Schema<ServiceCreatedMetadata>;
export interface ServiceDeletedMetadata {}
export const ServiceDeletedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ServiceDeletedMetadata",
}) as any as S.Schema<ServiceDeletedMetadata>;
export interface ServiceSystemAssociatedMetadata {
  systemName?: string;
  systemArn?: string;
}
export const ServiceSystemAssociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemName: S.optional(S.String),
    systemArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceSystemAssociatedMetadata",
}) as any as S.Schema<ServiceSystemAssociatedMetadata>;
export interface ServiceSystemDisassociatedMetadata {
  systemId?: string;
  systemName?: string;
  systemArn?: string;
}
export const ServiceSystemDisassociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemId: S.optional(S.String),
    systemName: S.optional(S.String),
    systemArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceSystemDisassociatedMetadata",
}) as any as S.Schema<ServiceSystemDisassociatedMetadata>;
export type ResourceTypeList = string[];
export const ResourceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface ServiceResourcesAssociatedMetadata {
  resourceCount?: number;
  resourceTypes?: string[];
}
export const ServiceResourcesAssociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceCount: S.optional(S.Number),
    resourceTypes: S.optional(ResourceTypeList),
  }),
).annotate({
  identifier: "ServiceResourcesAssociatedMetadata",
}) as any as S.Schema<ServiceResourcesAssociatedMetadata>;
export interface ServiceResourcesDisassociatedMetadata {
  resourceCount?: number;
  resourceTypes?: string[];
}
export const ServiceResourcesDisassociatedMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceCount: S.optional(S.Number),
      resourceTypes: S.optional(ResourceTypeList),
    }),
).annotate({
  identifier: "ServiceResourcesDisassociatedMetadata",
}) as any as S.Schema<ServiceResourcesDisassociatedMetadata>;
export interface ServiceWorkflowUpdatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export const ServiceWorkflowUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctionId: S.optional(S.String),
    serviceFunctionName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceWorkflowUpdatedMetadata",
}) as any as S.Schema<ServiceWorkflowUpdatedMetadata>;
export interface ServiceInputSourcesUpdatedMetadata {}
export const ServiceInputSourcesUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ServiceInputSourcesUpdatedMetadata",
}) as any as S.Schema<ServiceInputSourcesUpdatedMetadata>;
export interface ServicePolicyAssociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export const ServicePolicyAssociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServicePolicyAssociatedMetadata",
}) as any as S.Schema<ServicePolicyAssociatedMetadata>;
export interface ServicePolicyDisassociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export const ServicePolicyDisassociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServicePolicyDisassociatedMetadata",
}) as any as S.Schema<ServicePolicyDisassociatedMetadata>;
export interface ServiceFunctionCreatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export const ServiceFunctionCreatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctionId: S.optional(S.String),
    serviceFunctionName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceFunctionCreatedMetadata",
}) as any as S.Schema<ServiceFunctionCreatedMetadata>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface ServiceFunctionUpdatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesAdded?: string[];
  resourcesRemoved?: string[];
}
export const ServiceFunctionUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctionId: S.optional(S.String),
    serviceFunctionName: S.optional(S.String),
    resourcesAdded: S.optional(ArnList),
    resourcesRemoved: S.optional(ArnList),
  }),
).annotate({
  identifier: "ServiceFunctionUpdatedMetadata",
}) as any as S.Schema<ServiceFunctionUpdatedMetadata>;
export interface ServiceFunctionDeletedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export const ServiceFunctionDeletedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctionId: S.optional(S.String),
    serviceFunctionName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceFunctionDeletedMetadata",
}) as any as S.Schema<ServiceFunctionDeletedMetadata>;
export interface ServiceFunctionResourcesAddedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesAdded?: string[];
}
export const ServiceFunctionResourcesAddedMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceFunctionId: S.optional(S.String),
      serviceFunctionName: S.optional(S.String),
      resourcesAdded: S.optional(ArnList),
    }),
).annotate({
  identifier: "ServiceFunctionResourcesAddedMetadata",
}) as any as S.Schema<ServiceFunctionResourcesAddedMetadata>;
export interface ServiceFunctionResourcesRemovedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesRemoved?: string[];
}
export const ServiceFunctionResourcesRemovedMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      serviceFunctionId: S.optional(S.String),
      serviceFunctionName: S.optional(S.String),
      resourcesRemoved: S.optional(ArnList),
    }),
).annotate({
  identifier: "ServiceFunctionResourcesRemovedMetadata",
}) as any as S.Schema<ServiceFunctionResourcesRemovedMetadata>;
export interface ServiceAchievabilityUpdatedMetadata {
  assessmentId?: string;
  availabilitySlo?: string;
  multiAzRtoRpo?: string;
  multiRegionRtoRpo?: string;
}
export const ServiceAchievabilityUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentId: S.optional(S.String),
    availabilitySlo: S.optional(S.String),
    multiAzRtoRpo: S.optional(S.String),
    multiRegionRtoRpo: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceAchievabilityUpdatedMetadata",
}) as any as S.Schema<ServiceAchievabilityUpdatedMetadata>;
export interface AssertionCreatedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export const AssertionCreatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assertionId: S.optional(S.String),
    assertionName: S.optional(S.String),
  }),
).annotate({
  identifier: "AssertionCreatedMetadata",
}) as any as S.Schema<AssertionCreatedMetadata>;
export interface AssertionUpdatedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export const AssertionUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assertionId: S.optional(S.String),
    assertionName: S.optional(S.String),
  }),
).annotate({
  identifier: "AssertionUpdatedMetadata",
}) as any as S.Schema<AssertionUpdatedMetadata>;
export interface AssertionDeletedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export const AssertionDeletedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assertionId: S.optional(S.String),
    assertionName: S.optional(S.String),
  }),
).annotate({
  identifier: "AssertionDeletedMetadata",
}) as any as S.Schema<AssertionDeletedMetadata>;
export type ServiceEventMetadata =
  | {
      serviceCreated: ServiceCreatedMetadata;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted: ServiceDeletedMetadata;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated: ServiceSystemAssociatedMetadata;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated: ServiceSystemDisassociatedMetadata;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated: ServiceResourcesAssociatedMetadata;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated: ServiceResourcesDisassociatedMetadata;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated: ServiceWorkflowUpdatedMetadata;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated: ServiceInputSourcesUpdatedMetadata;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated: ServicePolicyAssociatedMetadata;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated: ServicePolicyDisassociatedMetadata;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated: ServiceFunctionCreatedMetadata;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated: ServiceFunctionUpdatedMetadata;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted: ServiceFunctionDeletedMetadata;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded: ServiceFunctionResourcesAddedMetadata;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved: ServiceFunctionResourcesRemovedMetadata;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated: ServiceAchievabilityUpdatedMetadata;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated: AssertionCreatedMetadata;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated: AssertionUpdatedMetadata;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted: AssertionDeletedMetadata;
    };
export const ServiceEventMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ serviceCreated: ServiceCreatedMetadata }),
  S.Struct({ serviceDeleted: ServiceDeletedMetadata }),
  S.Struct({ serviceSystemAssociated: ServiceSystemAssociatedMetadata }),
  S.Struct({ serviceSystemDisassociated: ServiceSystemDisassociatedMetadata }),
  S.Struct({ serviceResourcesAssociated: ServiceResourcesAssociatedMetadata }),
  S.Struct({
    serviceResourcesDisassociated: ServiceResourcesDisassociatedMetadata,
  }),
  S.Struct({ serviceWorkflowUpdated: ServiceWorkflowUpdatedMetadata }),
  S.Struct({ serviceInputSourcesUpdated: ServiceInputSourcesUpdatedMetadata }),
  S.Struct({ servicePolicyAssociated: ServicePolicyAssociatedMetadata }),
  S.Struct({ servicePolicyDisassociated: ServicePolicyDisassociatedMetadata }),
  S.Struct({ serviceFunctionCreated: ServiceFunctionCreatedMetadata }),
  S.Struct({ serviceFunctionUpdated: ServiceFunctionUpdatedMetadata }),
  S.Struct({ serviceFunctionDeleted: ServiceFunctionDeletedMetadata }),
  S.Struct({
    serviceFunctionResourcesAdded: ServiceFunctionResourcesAddedMetadata,
  }),
  S.Struct({
    serviceFunctionResourcesRemoved: ServiceFunctionResourcesRemovedMetadata,
  }),
  S.Struct({
    serviceAchievabilityUpdated: ServiceAchievabilityUpdatedMetadata,
  }),
  S.Struct({ assertionCreated: AssertionCreatedMetadata }),
  S.Struct({ assertionUpdated: AssertionUpdatedMetadata }),
  S.Struct({ assertionDeleted: AssertionDeletedMetadata }),
]);
export interface ServiceEventDetails {
  title: string;
  description: string;
  eventMetadata?: ServiceEventMetadata;
}
export const ServiceEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.String,
    eventMetadata: S.optional(ServiceEventMetadata),
  }),
).annotate({
  identifier: "ServiceEventDetails",
}) as any as S.Schema<ServiceEventDetails>;
export interface ServiceEvent {
  eventId: string;
  timestamp: Date;
  eventType: ServiceEventType;
  serviceArn: string;
  actor: EventActor;
  eventDetails: ServiceEventDetails;
}
export const ServiceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: ServiceEventType,
    serviceArn: S.String,
    actor: EventActor,
    eventDetails: ServiceEventDetails,
  }),
).annotate({ identifier: "ServiceEvent" }) as any as S.Schema<ServiceEvent>;
export type ServiceEventList = ServiceEvent[];
export const ServiceEventList = /*@__PURE__*/ S.Array(ServiceEvent);
export interface ListServiceEventsResponse {
  events: ServiceEvent[];
  nextToken?: string;
}
export const ListServiceEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: ServiceEventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListServiceEventsResponse",
}) as any as S.Schema<ListServiceEventsResponse>;
export interface ListServiceFunctionsRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceFunctionsRequest",
}) as any as S.Schema<ListServiceFunctionsRequest>;
export type ServiceFunctionList = ServiceFunction[];
export const ServiceFunctionList = /*@__PURE__*/ S.Array(ServiceFunction);
export interface ListServiceFunctionsResponse {
  serviceFunctions: ServiceFunction[];
  nextToken?: string;
}
export const ListServiceFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceFunctions: ServiceFunctionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceFunctionsResponse",
}) as any as S.Schema<ListServiceFunctionsResponse>;
export interface ListServicesRequest {
  systemArn?: string;
  userJourneyId?: string;
  ouId?: string;
  accountId?: string;
  assessmentStatus?: AssessmentStatus;
  policyArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.optional(S.String).pipe(T.HttpQuery("systemArn")),
    userJourneyId: S.optional(S.String).pipe(T.HttpQuery("userJourneyId")),
    ouId: S.optional(S.String).pipe(T.HttpQuery("ouId")),
    accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
    assessmentStatus: S.optional(AssessmentStatus).pipe(
      T.HttpQuery("assessmentStatus"),
    ),
    policyArn: S.optional(S.String).pipe(T.HttpQuery("policyArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-services" }),
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
  serviceArn: string;
  name: string;
  associatedSystems?: AssociatedSystem[];
  regions?: string[];
  policyArn?: string;
  assessmentStatus?: AssessmentStatus;
  openFindingsCount?: number;
  resolvedFindingsCount?: number;
  dependencyDiscovery?: DependencyDiscoveryConfig;
  achievability?: Achievability;
  organizationId?: string;
  ouId?: string;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    name: S.String,
    associatedSystems: S.optional(AssociatedSystemList),
    regions: S.optional(RegionList),
    policyArn: S.optional(S.String),
    assessmentStatus: S.optional(AssessmentStatus),
    openFindingsCount: S.optional(S.Number),
    resolvedFindingsCount: S.optional(S.Number),
    dependencyDiscovery: S.optional(DependencyDiscoveryConfig),
    achievability: S.optional(Achievability),
    organizationId: S.optional(S.String),
    ouId: S.optional(S.String),
    accountId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummaryList = ServiceSummary[];
export const ServiceSummaryList = /*@__PURE__*/ S.Array(ServiceSummary);
export interface ListServicesResponse {
  serviceSummaries: ServiceSummary[];
  nextToken?: string;
}
export const ListServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceSummaries: ServiceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
export interface ListServiceTopologyEdgesRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListServiceTopologyEdgesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-service-topology-edges" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceTopologyEdgesRequest",
}) as any as S.Schema<ListServiceTopologyEdgesRequest>;
export type TopologyType =
  | "CONTAINMENT"
  | "DATA_FLOW"
  | "OBSERVABILITY"
  | "PERMISSIONS"
  | (string & {});
export const TopologyType = S.String;

export interface EdgePropertySummary {
  topologyType?: TopologyType;
  label?: string;
}
export const EdgePropertySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topologyType: S.optional(TopologyType),
    label: S.optional(S.String),
  }),
).annotate({
  identifier: "EdgePropertySummary",
}) as any as S.Schema<EdgePropertySummary>;
export type EdgePropertyList = EdgePropertySummary[];
export const EdgePropertyList = /*@__PURE__*/ S.Array(EdgePropertySummary);
export interface ServiceTopologyEdgeSummary {
  sourceResourceIdentifier: string;
  destinationResourceIdentifier: string;
  sourceRegion?: string;
  destinationRegion?: string;
  sourceAccount?: string;
  destinationAccount?: string;
  properties?: EdgePropertySummary[];
}
export const ServiceTopologyEdgeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceResourceIdentifier: S.String,
    destinationResourceIdentifier: S.String,
    sourceRegion: S.optional(S.String),
    destinationRegion: S.optional(S.String),
    sourceAccount: S.optional(S.String),
    destinationAccount: S.optional(S.String),
    properties: S.optional(EdgePropertyList),
  }),
).annotate({
  identifier: "ServiceTopologyEdgeSummary",
}) as any as S.Schema<ServiceTopologyEdgeSummary>;
export type ServiceTopologyEdgeSummaryList = ServiceTopologyEdgeSummary[];
export const ServiceTopologyEdgeSummaryList = /*@__PURE__*/ S.Array(
  ServiceTopologyEdgeSummary,
);
export interface ListServiceTopologyEdgesResponse {
  serviceTopologyEdgeSummaries?: ServiceTopologyEdgeSummary[];
  nextToken?: string;
}
export const ListServiceTopologyEdgesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceTopologyEdgeSummaries: S.optional(ServiceTopologyEdgeSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceTopologyEdgesResponse",
}) as any as S.Schema<ListServiceTopologyEdgesResponse>;
export type SystemEventType =
  | "SYSTEM_CREATED"
  | "SYSTEM_DELETED"
  | "SYSTEM_USER_JOURNEY_CREATED"
  | "SYSTEM_USER_JOURNEY_UPDATED"
  | "SYSTEM_USER_JOURNEY_DELETED"
  | "SYSTEM_SERVICE_ASSOCIATED"
  | "SYSTEM_SERVICE_DISASSOCIATED"
  | "SYSTEM_POLICY_ASSOCIATED"
  | "SYSTEM_POLICY_DISASSOCIATED"
  | (string & {});
export const SystemEventType = S.String;

export type SystemEventTypeList = SystemEventType[];
export const SystemEventTypeList = /*@__PURE__*/ S.Array(SystemEventType);
export interface ListSystemEventsRequest {
  systemArn: string;
  eventTypes?: SystemEventType[];
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListSystemEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String.pipe(T.HttpQuery("systemArn")),
    eventTypes: S.optional(SystemEventTypeList).pipe(T.HttpQuery("eventTypes")),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-system-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSystemEventsRequest",
}) as any as S.Schema<ListSystemEventsRequest>;
export interface SystemCreatedMetadata {}
export const SystemCreatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SystemCreatedMetadata",
}) as any as S.Schema<SystemCreatedMetadata>;
export interface SystemDeletedMetadata {}
export const SystemDeletedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SystemDeletedMetadata",
}) as any as S.Schema<SystemDeletedMetadata>;
export interface ServiceReference {
  serviceId?: string;
  serviceName?: string;
}
export const ServiceReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceId: S.optional(S.String),
    serviceName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceReference",
}) as any as S.Schema<ServiceReference>;
export type ServiceReferenceList = ServiceReference[];
export const ServiceReferenceList = /*@__PURE__*/ S.Array(ServiceReference);
export interface SystemUserJourneyCreatedMetadata {
  userJourneyName?: string;
  associatedServices?: ServiceReference[];
}
export const SystemUserJourneyCreatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneyName: S.optional(S.String),
    associatedServices: S.optional(ServiceReferenceList),
  }),
).annotate({
  identifier: "SystemUserJourneyCreatedMetadata",
}) as any as S.Schema<SystemUserJourneyCreatedMetadata>;
export interface StringChange {
  oldValue?: string;
  newValue?: string;
}
export const StringChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oldValue: S.optional(S.String), newValue: S.optional(S.String) }),
).annotate({ identifier: "StringChange" }) as any as S.Schema<StringChange>;
export interface ServiceReferenceChanges {
  added?: ServiceReference[];
  removed?: ServiceReference[];
}
export const ServiceReferenceChanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    added: S.optional(ServiceReferenceList),
    removed: S.optional(ServiceReferenceList),
  }),
).annotate({
  identifier: "ServiceReferenceChanges",
}) as any as S.Schema<ServiceReferenceChanges>;
export interface UserJourneyChanges {
  journeyDescription?: StringChange;
  associatedServices?: ServiceReferenceChanges;
}
export const UserJourneyChanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    journeyDescription: S.optional(StringChange),
    associatedServices: S.optional(ServiceReferenceChanges),
  }),
).annotate({
  identifier: "UserJourneyChanges",
}) as any as S.Schema<UserJourneyChanges>;
export interface SystemUserJourneyUpdatedMetadata {
  userJourneyName?: string;
  changes?: UserJourneyChanges;
}
export const SystemUserJourneyUpdatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneyName: S.optional(S.String),
    changes: S.optional(UserJourneyChanges),
  }),
).annotate({
  identifier: "SystemUserJourneyUpdatedMetadata",
}) as any as S.Schema<SystemUserJourneyUpdatedMetadata>;
export interface SystemUserJourneyDeletedMetadata {
  userJourneyName?: string;
  associatedServicesAtDeletion?: ServiceReference[];
}
export const SystemUserJourneyDeletedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneyName: S.optional(S.String),
    associatedServicesAtDeletion: S.optional(ServiceReferenceList),
  }),
).annotate({
  identifier: "SystemUserJourneyDeletedMetadata",
}) as any as S.Schema<SystemUserJourneyDeletedMetadata>;
export type UserJourneyNameList = string[];
export const UserJourneyNameList = /*@__PURE__*/ S.Array(S.String);
export interface SystemServiceAssociatedMetadata {
  serviceName?: string;
  serviceArn?: string;
  userJourneys?: string[];
}
export const SystemServiceAssociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    serviceArn: S.optional(S.String),
    userJourneys: S.optional(UserJourneyNameList),
  }),
).annotate({
  identifier: "SystemServiceAssociatedMetadata",
}) as any as S.Schema<SystemServiceAssociatedMetadata>;
export interface SystemServiceDisassociatedMetadata {
  serviceName?: string;
  serviceArn?: string;
  userJourneysAffected?: string[];
  comment?: string;
}
export const SystemServiceDisassociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    serviceArn: S.optional(S.String),
    userJourneysAffected: S.optional(UserJourneyNameList),
    comment: S.optional(S.String),
  }),
).annotate({
  identifier: "SystemServiceDisassociatedMetadata",
}) as any as S.Schema<SystemServiceDisassociatedMetadata>;
export interface SystemPolicyAssociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export const SystemPolicyAssociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SystemPolicyAssociatedMetadata",
}) as any as S.Schema<SystemPolicyAssociatedMetadata>;
export interface SystemPolicyDisassociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export const SystemPolicyDisassociatedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SystemPolicyDisassociatedMetadata",
}) as any as S.Schema<SystemPolicyDisassociatedMetadata>;
export type SystemEventMetadata =
  | {
      systemCreated: SystemCreatedMetadata;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted: SystemDeletedMetadata;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated: SystemUserJourneyCreatedMetadata;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated: SystemUserJourneyUpdatedMetadata;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted: SystemUserJourneyDeletedMetadata;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated: SystemServiceAssociatedMetadata;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated: SystemServiceDisassociatedMetadata;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated: SystemPolicyAssociatedMetadata;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated: SystemPolicyDisassociatedMetadata;
    };
export const SystemEventMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ systemCreated: SystemCreatedMetadata }),
  S.Struct({ systemDeleted: SystemDeletedMetadata }),
  S.Struct({ systemUserJourneyCreated: SystemUserJourneyCreatedMetadata }),
  S.Struct({ systemUserJourneyUpdated: SystemUserJourneyUpdatedMetadata }),
  S.Struct({ systemUserJourneyDeleted: SystemUserJourneyDeletedMetadata }),
  S.Struct({ systemServiceAssociated: SystemServiceAssociatedMetadata }),
  S.Struct({ systemServiceDisassociated: SystemServiceDisassociatedMetadata }),
  S.Struct({ systemPolicyAssociated: SystemPolicyAssociatedMetadata }),
  S.Struct({ systemPolicyDisassociated: SystemPolicyDisassociatedMetadata }),
]);
export interface SystemEventDetails {
  title: string;
  description: string;
  eventMetadata?: SystemEventMetadata;
}
export const SystemEventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.String,
    eventMetadata: S.optional(SystemEventMetadata),
  }),
).annotate({
  identifier: "SystemEventDetails",
}) as any as S.Schema<SystemEventDetails>;
export interface SystemEvent {
  eventId: string;
  timestamp: Date;
  eventType: SystemEventType;
  systemArn: string;
  actor: EventActor;
  eventDetails: SystemEventDetails;
}
export const SystemEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    eventType: SystemEventType,
    systemArn: S.String,
    actor: EventActor,
    eventDetails: SystemEventDetails,
  }),
).annotate({ identifier: "SystemEvent" }) as any as S.Schema<SystemEvent>;
export type SystemEventList = SystemEvent[];
export const SystemEventList = /*@__PURE__*/ S.Array(SystemEvent);
export interface ListSystemEventsResponse {
  events: SystemEvent[];
  nextToken?: string;
}
export const ListSystemEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: SystemEventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSystemEventsResponse",
}) as any as S.Schema<ListSystemEventsResponse>;
export interface ListSystemsRequest {
  ouId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSystemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ouId: S.optional(S.String).pipe(T.HttpQuery("ouId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-systems" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSystemsRequest",
}) as any as S.Schema<ListSystemsRequest>;
export interface SystemSummary {
  systemId: string;
  name: string;
  systemArn?: string;
  userJourneysCount?: number;
  servicesCount?: number;
  organizationId?: string;
  ouId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const SystemSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemId: S.String,
    name: S.String,
    systemArn: S.optional(S.String),
    userJourneysCount: S.optional(S.Number),
    servicesCount: S.optional(S.Number),
    organizationId: S.optional(S.String),
    ouId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SystemSummary" }) as any as S.Schema<SystemSummary>;
export type SystemSummaryList = SystemSummary[];
export const SystemSummaryList = /*@__PURE__*/ S.Array(SystemSummary);
export interface ListSystemsResponse {
  systemSummaries: SystemSummary[];
  nextToken?: string;
}
export const ListSystemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemSummaries: SystemSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSystemsResponse",
}) as any as S.Schema<ListSystemsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/tags/{resourceArn}" }),
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
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTestRunEventsRequest {
  testRunId: string;
  serviceArn: string;
  startedAt?: Date;
  endedAt?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestRunEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String.pipe(T.HttpLabel("testRunId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startedAt"),
    ),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endedAt"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestRunEventsRequest",
}) as any as S.Schema<ListTestRunEventsRequest>;
export type TestRunEventAttributeKey = string;
export type TestRunEventAttributeValue = string;
export type TestRunEventAttributes = { [key: string]: string | undefined };
export const TestRunEventAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface TestRunEvent {
  eventId: string;
  eventType: string;
  message: string;
  timestamp: Date;
  attributes?: { [key: string]: string | undefined };
}
export const TestRunEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    eventType: S.String,
    message: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    attributes: S.optional(TestRunEventAttributes),
  }),
).annotate({ identifier: "TestRunEvent" }) as any as S.Schema<TestRunEvent>;
export type TestRunEventList = TestRunEvent[];
export const TestRunEventList = /*@__PURE__*/ S.Array(TestRunEvent);
export interface ListTestRunEventsResponse {
  events: TestRunEvent[];
  nextToken?: string;
}
export const ListTestRunEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: TestRunEventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTestRunEventsResponse",
}) as any as S.Schema<ListTestRunEventsResponse>;
export interface ListTestRunsRequest {
  serviceArn: string;
  testId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    testId: S.optional(S.String).pipe(T.HttpQuery("testId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-test-runs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestRunsRequest",
}) as any as S.Schema<ListTestRunsRequest>;
export interface TestRunSummary {
  testRunId: string;
  status: TestRunStatus;
  startedAt: Date;
  endedAt?: Date;
  testTemplateArn: string;
  serviceArn?: string;
  errorMessage?: string;
  accountTargeting?: AccountTargeting;
}
export const TestRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String,
    status: TestRunStatus,
    startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    testTemplateArn: S.String,
    serviceArn: S.optional(S.String),
    errorMessage: S.optional(S.String),
    accountTargeting: S.optional(AccountTargeting),
  }),
).annotate({ identifier: "TestRunSummary" }) as any as S.Schema<TestRunSummary>;
export type TestRunSummaryList = TestRunSummary[];
export const TestRunSummaryList = /*@__PURE__*/ S.Array(TestRunSummary);
export interface ListTestRunsResponse {
  testRuns: TestRunSummary[];
  nextToken?: string;
}
export const ListTestRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testRuns: TestRunSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTestRunsResponse",
}) as any as S.Schema<ListTestRunsResponse>;
export type TestRunSourceType =
  | "SUCCESS_CRITERIA"
  | "OBSERVABILITY"
  | (string & {});
export const TestRunSourceType = S.String;

export interface ListTestRunSourcesRequest {
  testRunId: string;
  serviceArn: string;
  type?: TestRunSourceType;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestRunSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String.pipe(T.HttpLabel("testRunId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    type: S.optional(TestRunSourceType).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestRunSourcesRequest",
}) as any as S.Schema<ListTestRunSourcesRequest>;
export type TestSourceOutcome = "PASSED" | "FAILED" | "ERROR" | (string & {});
export const TestSourceOutcome = S.String;

export interface TestRunSuccessCriteriaAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  outcome?: TestSourceOutcome;
  outcomeReason?: string;
}
export const TestRunSuccessCriteriaAlarmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmArn: S.String,
    alarmName: S.String,
    region: S.String,
    accountId: S.String,
    outcome: S.optional(TestSourceOutcome),
    outcomeReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TestRunSuccessCriteriaAlarmSummary",
}) as any as S.Schema<TestRunSuccessCriteriaAlarmSummary>;
export interface TestRunObservabilityAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
}
export const TestRunObservabilityAlarmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmArn: S.String,
    alarmName: S.String,
    region: S.String,
    accountId: S.String,
  }),
).annotate({
  identifier: "TestRunObservabilityAlarmSummary",
}) as any as S.Schema<TestRunObservabilityAlarmSummary>;
export type TestRunSourceSummary =
  | {
      successCriteriaAlarm: TestRunSuccessCriteriaAlarmSummary;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: TestRunObservabilityAlarmSummary;
    };
export const TestRunSourceSummary = /*@__PURE__*/ S.Union([
  S.Struct({ successCriteriaAlarm: TestRunSuccessCriteriaAlarmSummary }),
  S.Struct({ observabilityAlarm: TestRunObservabilityAlarmSummary }),
]);
export type TestRunSourceSummaryList = TestRunSourceSummary[];
export const TestRunSourceSummaryList =
  /*@__PURE__*/ S.Array(TestRunSourceSummary);
export interface ListTestRunSourcesResponse {
  testRunSources: TestRunSourceSummary[];
  nextToken?: string;
}
export const ListTestRunSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunSources: TestRunSourceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTestRunSourcesResponse",
}) as any as S.Schema<ListTestRunSourcesResponse>;
export interface ListTestsRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-tests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestsRequest",
}) as any as S.Schema<ListTestsRequest>;
export interface TestSummary {
  testId: string;
  testTemplateArn: string;
  serviceArn: string;
  totalTestRuns: number;
  successfulTestRuns: number;
  creationTime: Date;
}
export const TestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String,
    testTemplateArn: S.String,
    serviceArn: S.String,
    totalTestRuns: S.Number,
    successfulTestRuns: S.Number,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TestSummary" }) as any as S.Schema<TestSummary>;
export type TestSummaryList = TestSummary[];
export const TestSummaryList = /*@__PURE__*/ S.Array(TestSummary);
export interface ListTestsResponse {
  tests: TestSummary[];
  nextToken?: string;
}
export const ListTestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tests: TestSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTestsResponse",
}) as any as S.Schema<ListTestsResponse>;
export type TestSourceType =
  | "SUCCESS_CRITERIA"
  | "OBSERVABILITY"
  | (string & {});
export const TestSourceType = S.String;

export interface ListTestSourcesRequest {
  testId: string;
  serviceArn: string;
  type?: TestSourceType;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String.pipe(T.HttpLabel("testId")),
    serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
    type: S.optional(TestSourceType).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/tests/{testId}/sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestSourcesRequest",
}) as any as S.Schema<ListTestSourcesRequest>;
export interface SuccessCriteriaAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  createdAt?: Date;
}
export const SuccessCriteriaAlarmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmArn: S.String,
    alarmName: S.String,
    region: S.String,
    accountId: S.String,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SuccessCriteriaAlarmSummary",
}) as any as S.Schema<SuccessCriteriaAlarmSummary>;
export interface ObservabilityAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  createdAt?: Date;
}
export const ObservabilityAlarmSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmArn: S.String,
    alarmName: S.String,
    region: S.String,
    accountId: S.String,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ObservabilityAlarmSummary",
}) as any as S.Schema<ObservabilityAlarmSummary>;
export type TestSourceSummary =
  | {
      successCriteriaAlarm: SuccessCriteriaAlarmSummary;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: ObservabilityAlarmSummary;
    };
export const TestSourceSummary = /*@__PURE__*/ S.Union([
  S.Struct({ successCriteriaAlarm: SuccessCriteriaAlarmSummary }),
  S.Struct({ observabilityAlarm: ObservabilityAlarmSummary }),
]);
export type TestSourceSummaryList = TestSourceSummary[];
export const TestSourceSummaryList = /*@__PURE__*/ S.Array(TestSourceSummary);
export interface ListTestSourcesResponse {
  testSources: TestSourceSummary[];
  nextToken?: string;
}
export const ListTestSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSources: TestSourceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTestSourcesResponse",
}) as any as S.Schema<ListTestSourcesResponse>;
export interface ListTestTemplatesRequest {}
export const ListTestTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-test-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestTemplatesRequest",
}) as any as S.Schema<ListTestTemplatesRequest>;
export interface TestTemplateSummary {
  testTemplateArn: string;
  name: string;
  description: string;
}
export const TestTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testTemplateArn: S.String,
    name: S.String,
    description: S.String,
  }),
).annotate({
  identifier: "TestTemplateSummary",
}) as any as S.Schema<TestTemplateSummary>;
export type TestTemplateSummaryList = TestTemplateSummary[];
export const TestTemplateSummaryList =
  /*@__PURE__*/ S.Array(TestTemplateSummary);
export interface ListTestTemplatesResponse {
  testTemplates: TestTemplateSummary[];
}
export const ListTestTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testTemplates: TestTemplateSummaryList }),
).annotate({
  identifier: "ListTestTemplatesResponse",
}) as any as S.Schema<ListTestTemplatesResponse>;
export interface ListUserJourneysRequest {
  systemArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListUserJourneysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String.pipe(T.HttpQuery("systemArn")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/list-user-journeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUserJourneysRequest",
}) as any as S.Schema<ListUserJourneysRequest>;
export interface UserJourneySummary {
  userJourneyId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UserJourneySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneyId: S.String,
    name: S.String,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UserJourneySummary",
}) as any as S.Schema<UserJourneySummary>;
export type UserJourneySummaryList = UserJourneySummary[];
export const UserJourneySummaryList = /*@__PURE__*/ S.Array(UserJourneySummary);
export interface ListUserJourneysResponse {
  userJourneySummaries: UserJourneySummary[];
  nextToken?: string;
}
export const ListUserJourneysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userJourneySummaries: UserJourneySummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUserJourneysResponse",
}) as any as S.Schema<ListUserJourneysResponse>;
export interface PutTestSourcesRequest {
  testId: string;
  serviceArn: string;
  testSources: TestSourceInput[];
}
export const PutTestSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String,
    serviceArn: S.String,
    testSources: TestSourceInputList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/put-test-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTestSourcesRequest",
}) as any as S.Schema<PutTestSourcesRequest>;
export interface PutTestSourcesResponse {}
export const PutTestSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutTestSourcesResponse",
}) as any as S.Schema<PutTestSourcesResponse>;
export interface StartFailureModeAssessmentRequest {
  serviceArn: string;
  clientToken?: string;
}
export const StartFailureModeAssessmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/start-failure-mode-assessment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartFailureModeAssessmentRequest",
}) as any as S.Schema<StartFailureModeAssessmentRequest>;
export interface StartFailureModeAssessmentResponse {
  assessmentId?: string;
  serviceArn?: string;
  assessmentStatus?: AssessmentStatus;
  startedAt?: Date;
}
export const StartFailureModeAssessmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assessmentId: S.optional(S.String),
    serviceArn: S.optional(S.String),
    assessmentStatus: S.optional(AssessmentStatus),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "StartFailureModeAssessmentResponse",
}) as any as S.Schema<StartFailureModeAssessmentResponse>;
export interface StartTestRunRequest {
  testId: string;
  serviceArn: string;
}
export const StartTestRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testId: S.String, serviceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/start-test-run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTestRunRequest",
}) as any as S.Schema<StartTestRunRequest>;
export type ExperimentArnList = string[];
export const ExperimentArnList = /*@__PURE__*/ S.Array(S.String);
export interface StartTestRunResponse {
  testRunId: string;
  status: TestRunStatus;
  experimentArns: string[];
}
export const StartTestRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testRunId: S.String,
    status: TestRunStatus,
    experimentArns: ExperimentArnList,
  }),
).annotate({
  identifier: "StartTestRunResponse",
}) as any as S.Schema<StartTestRunResponse>;
export interface StopTestRunRequest {
  testRunId: string;
  serviceArn: string;
}
export const StopTestRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testRunId: S.String, serviceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/stop-test-run" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopTestRunRequest",
}) as any as S.Schema<StopTestRunRequest>;
export interface StopTestRunResponse {
  testRunId: string;
  status: TestRunStatus;
}
export const StopTestRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testRunId: S.String, status: TestRunStatus }),
).annotate({
  identifier: "StopTestRunResponse",
}) as any as S.Schema<StopTestRunResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/tags/{resourceArn}" }),
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
      T.Http({ method: "DELETE", uri: "/v2/tags/{resourceArn}" }),
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
export interface UpdateAssertionRequest {
  serviceArn: string;
  assertionId: string;
  text?: string;
}
export const UpdateAssertionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    assertionId: S.String,
    text: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-assertion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssertionRequest",
}) as any as S.Schema<UpdateAssertionRequest>;
export interface UpdateAssertionResponse {
  assertion: Assertion;
}
export const UpdateAssertionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assertion: Assertion }),
).annotate({
  identifier: "UpdateAssertionResponse",
}) as any as S.Schema<UpdateAssertionResponse>;
export interface UpdateDependencyRequest {
  serviceArn: string;
  dependencyId: string;
  criticality?: DependencyCriticality;
  comment?: string;
}
export const UpdateDependencyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    dependencyId: S.String,
    criticality: S.optional(DependencyCriticality),
    comment: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-dependency" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDependencyRequest",
}) as any as S.Schema<UpdateDependencyRequest>;
export interface UpdateDependencyResponse {
  dependencyId: string;
  dependencyName: string;
  location: string;
  criticality: DependencyCriticality;
  comment?: string;
  provider?: string;
  updatedAt: Date;
}
export const UpdateDependencyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dependencyId: S.String,
    dependencyName: S.String,
    location: S.String,
    criticality: DependencyCriticality,
    comment: S.optional(S.String),
    provider: S.optional(S.String),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateDependencyResponse",
}) as any as S.Schema<UpdateDependencyResponse>;
export interface UpdateFailureModeFindingRequest {
  findingId: string;
  status: FindingStatus;
  serviceArn: string;
  comment?: string;
}
export const UpdateFailureModeFindingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.String,
    status: FindingStatus,
    serviceArn: S.String,
    comment: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-failure-mode-finding" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFailureModeFindingRequest",
}) as any as S.Schema<UpdateFailureModeFindingRequest>;
export interface UpdateFailureModeFindingResponse {
  finding?: Finding;
}
export const UpdateFailureModeFindingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ finding: S.optional(Finding) }),
).annotate({
  identifier: "UpdateFailureModeFindingResponse",
}) as any as S.Schema<UpdateFailureModeFindingResponse>;
export interface UpdatePolicyRequest {
  policyArn: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
}
export const UpdatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.String,
    description: S.optional(S.String),
    availabilitySlo: S.optional(AvailabilitySlo),
    multiAz: S.optional(MultiAzTargets),
    multiRegion: S.optional(MultiRegionTargets),
    dataRecovery: S.optional(DataRecoveryTargets),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePolicyRequest",
}) as any as S.Schema<UpdatePolicyRequest>;
export interface UpdatePolicyResponse {
  policy: Policy;
}
export const UpdatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: Policy }),
).annotate({
  identifier: "UpdatePolicyResponse",
}) as any as S.Schema<UpdatePolicyResponse>;
export interface UpdateServiceRequest {
  serviceArn: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions?: string[];
  permissionModel?: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryInput;
  reportConfiguration?: ServiceReportConfiguration;
}
export const UpdateServiceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    description: S.optional(S.String),
    associatedSystems: S.optional(AssociatedSystemList),
    policyArn: S.optional(S.String),
    regions: S.optional(RegionList),
    permissionModel: S.optional(PermissionModel),
    dependencyDiscovery: S.optional(DependencyDiscoveryInput),
    reportConfiguration: S.optional(ServiceReportConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-service" }),
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
  service: Service;
}
export const UpdateServiceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: Service }),
).annotate({
  identifier: "UpdateServiceResponse",
}) as any as S.Schema<UpdateServiceResponse>;
export interface UpdateServiceFunctionRequest {
  serviceArn: string;
  serviceFunctionId: string;
  name?: string;
  description?: string;
  criticality?: ServiceFunctionCriticality;
}
export const UpdateServiceFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceArn: S.String,
    serviceFunctionId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    criticality: S.optional(ServiceFunctionCriticality),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-function" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceFunctionRequest",
}) as any as S.Schema<UpdateServiceFunctionRequest>;
export interface UpdateServiceFunctionResponse {
  serviceFunction: ServiceFunction;
}
export const UpdateServiceFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceFunction: ServiceFunction }),
).annotate({
  identifier: "UpdateServiceFunctionResponse",
}) as any as S.Schema<UpdateServiceFunctionResponse>;
export interface UpdateSystemRequest {
  systemArn: string;
  description?: string;
  sharingEnabled?: boolean;
}
export const UpdateSystemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String,
    description: S.optional(S.String),
    sharingEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-system" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSystemRequest",
}) as any as S.Schema<UpdateSystemRequest>;
export interface UpdateSystemResponse {
  system: System;
}
export const UpdateSystemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ system: System }),
).annotate({
  identifier: "UpdateSystemResponse",
}) as any as S.Schema<UpdateSystemResponse>;
export interface UpdateTestRequest {
  testId: string;
  serviceArn: string;
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
}
export const UpdateTestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testId: S.String,
    serviceArn: S.String,
    loggingConfiguration: S.optional(LoggingConfiguration),
    stopConditions: S.optional(StopConditionList),
    roleName: S.optional(S.String),
    parameters: S.optional(TestParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTestRequest",
}) as any as S.Schema<UpdateTestRequest>;
export interface UpdateTestResponse {
  test: Test;
}
export const UpdateTestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ test: Test }),
).annotate({
  identifier: "UpdateTestResponse",
}) as any as S.Schema<UpdateTestResponse>;
export interface UpdateUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
  name?: string;
  description?: string;
  policyArn?: string;
}
export const UpdateUserJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemArn: S.String,
    userJourneyId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    policyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/update-user-journey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserJourneyRequest",
}) as any as S.Schema<UpdateUserJourneyRequest>;
export interface UpdateUserJourneyResponse {
  userJourney: UserJourney;
}
export const UpdateUserJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userJourney: UserJourney }),
).annotate({
  identifier: "UpdateUserJourneyResponse",
}) as any as S.Schema<UpdateUserJourneyResponse>;
export type ValidationExceptionReason =
  | "INVALID_FIELD_VALUE"
  | "DUPLICATE_VALUE"
  | "MISSING_REQUIRED_FIELD"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type CreateAssertionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resilience assertion for a service.
 */
export const createAssertion: API.OperationMethod<
  CreateAssertionRequest,
  CreateAssertionResponse,
  CreateAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssertionRequest,
  output: CreateAssertionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssertion",
}));

export type CreateInputSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an input source for a service.
 */
export const createInputSource: API.OperationMethod<
  CreateInputSourceRequest,
  CreateInputSourceResponse,
  CreateInputSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInputSourceRequest,
  output: CreateInputSourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInputSource",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resilience policy that defines availability and disaster recovery requirements.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreateReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * On-demand report creation. Idempotent — duplicate requests with same clientToken return existing result.
 */
export const createReport: API.OperationMethod<
  CreateReportRequest,
  CreateReportResponse,
  CreateReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReportRequest,
  output: CreateReportResponse,
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
  operationName: "CreateReport",
}));

export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type CreateServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service function within a service.
 */
export const createServiceFunction: API.OperationMethod<
  CreateServiceFunctionRequest,
  CreateServiceFunctionResponse,
  CreateServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceFunctionRequest,
  output: CreateServiceFunctionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceFunction",
}));

export type CreateServiceFunctionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates resources with a service function.
 */
export const createServiceFunctionResources: API.OperationMethod<
  CreateServiceFunctionResourcesRequest,
  CreateServiceFunctionResourcesResponse,
  CreateServiceFunctionResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceFunctionResourcesRequest,
  output: CreateServiceFunctionResourcesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceFunctionResources",
}));

export type CreateSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a system that represents a logical grouping of services.
 */
export const createSystem: API.OperationMethod<
  CreateSystemRequest,
  CreateSystemResponse,
  CreateSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSystemRequest,
  output: CreateSystemResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSystem",
}));

export type CreateTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a test for a service by configuring a test template. Each service has one test per template.
 */
export const createTest: API.OperationMethod<
  CreateTestRequest,
  CreateTestResponse,
  CreateTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTestRequest,
  output: CreateTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTest",
}));

export type CreateUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user journey within a system.
 */
export const createUserJourney: API.OperationMethod<
  CreateUserJourneyRequest,
  CreateUserJourneyResponse,
  CreateUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserJourneyRequest,
  output: CreateUserJourneyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserJourney",
}));

export type DeleteAssertionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resilience assertion from a service.
 */
export const deleteAssertion: API.OperationMethod<
  DeleteAssertionRequest,
  DeleteAssertionResponse,
  DeleteAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssertionRequest,
  output: DeleteAssertionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssertion",
}));

export type DeleteInputSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an input source.
 */
export const deleteInputSource: API.OperationMethod<
  DeleteInputSourceRequest,
  DeleteInputSourceResponse,
  DeleteInputSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInputSourceRequest,
  output: DeleteInputSourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInputSource",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resilience policy.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service function.
 */
export const deleteServiceFunction: API.OperationMethod<
  DeleteServiceFunctionRequest,
  DeleteServiceFunctionResponse,
  DeleteServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceFunctionRequest,
  output: DeleteServiceFunctionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceFunction",
}));

export type DeleteServiceFunctionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes resources from a service function.
 */
export const deleteServiceFunctionResources: API.OperationMethod<
  DeleteServiceFunctionResourcesRequest,
  DeleteServiceFunctionResourcesResponse,
  DeleteServiceFunctionResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceFunctionResourcesRequest,
  output: DeleteServiceFunctionResourcesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceFunctionResources",
}));

export type DeleteSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a system.
 */
export const deleteSystem: API.OperationMethod<
  DeleteSystemRequest,
  DeleteSystemResponse,
  DeleteSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSystemRequest,
  output: DeleteSystemResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSystem",
}));

export type DeleteTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a test.
 */
export const deleteTest: API.OperationMethod<
  DeleteTestRequest,
  DeleteTestResponse,
  DeleteTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTestRequest,
  output: DeleteTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTest",
}));

export type DeleteTestSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes monitoring sources from a test. The operation is transactional and idempotent — removing a source that is not attached is a no-op.
 */
export const deleteTestSources: API.OperationMethod<
  DeleteTestSourcesRequest,
  DeleteTestSourcesResponse,
  DeleteTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTestSourcesRequest,
  output: DeleteTestSourcesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestSources",
}));

export type DeleteUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user journey.
 */
export const deleteUserJourney: API.OperationMethod<
  DeleteUserJourneyRequest,
  DeleteUserJourneyResponse,
  DeleteUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserJourneyRequest,
  output: DeleteUserJourneyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserJourney",
}));

export type GetFailureModeFindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a finding by findingId.
 */
export const getFailureModeFinding: API.OperationMethod<
  GetFailureModeFindingRequest,
  GetFailureModeFindingResponse,
  GetFailureModeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFailureModeFindingRequest,
  output: GetFailureModeFindingResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFailureModeFinding",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a resilience policy by ARN.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a service by ARN.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceRequest,
  output: GetServiceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetSystemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a system by ARN.
 */
export const getSystem: API.OperationMethod<
  GetSystemRequest,
  GetSystemResponse,
  GetSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSystemRequest,
  output: GetSystemResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystem",
}));

export type GetTestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a test by ID.
 */
export const getTest: API.OperationMethod<
  GetTestRequest,
  GetTestResponse,
  GetTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestRequest,
  output: GetTestResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
}));

export type GetTestRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a test run by ID, including its status, results, and the configuration snapshotted when the run started.
 */
export const getTestRun: API.OperationMethod<
  GetTestRunRequest,
  GetTestRunResponse,
  GetTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestRunRequest,
  output: GetTestRunResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestRun",
}));

export type GetTestTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a resilience test template by ARN, including the parameters it accepts and the fault actions it runs.
 */
export const getTestTemplate: API.OperationMethod<
  GetTestTemplateRequest,
  GetTestTemplateResponse,
  GetTestTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestTemplateRequest,
  output: GetTestTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestTemplate",
}));

export type GetUserJourneyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a user journey.
 */
export const getUserJourney: API.OperationMethod<
  GetUserJourneyRequest,
  GetUserJourneyResponse,
  GetUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserJourneyRequest,
  output: GetUserJourneyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserJourney",
}));

export type ImportAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Imports a V1 app into the V2 resource model, creating a service with the same name.
 */
export const importApp: API.OperationMethod<
  ImportAppRequest,
  ImportAppResponse,
  ImportAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportAppRequest,
  output: ImportAppResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApp",
}));

export type ImportPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Imports a V1 policy into V2, mapping RTO/RPO values from V1 scenarios.
 */
export const importPolicy: API.OperationMethod<
  ImportPolicyRequest,
  ImportPolicyResponse,
  ImportPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportPolicyRequest,
  output: ImportPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPolicy",
}));

export type ListAssertionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists resilience assertions for a service.
 */
export const listAssertions: API.PaginatedOperationMethod<
  ListAssertionsRequest,
  ListAssertionsResponse,
  ListAssertionsError,
  Credentials | HttpClient.HttpClient,
  Assertion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssertionsRequest,
  output: ListAssertionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssertions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assertions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists dependencies discovered for services.
 */
export const listDependencies: API.PaginatedOperationMethod<
  ListDependenciesRequest,
  ListDependenciesResponse,
  ListDependenciesError,
  Credentials | HttpClient.HttpClient,
  DependencySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDependenciesRequest,
  output: ListDependenciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDependencies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dependencySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFailureModeAssessmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists failure mode assessments.
 */
export const listFailureModeAssessments: API.PaginatedOperationMethod<
  ListFailureModeAssessmentsRequest,
  ListFailureModeAssessmentsResponse,
  ListFailureModeAssessmentsError,
  Credentials | HttpClient.HttpClient,
  AssessmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFailureModeAssessmentsRequest,
  output: ListFailureModeAssessmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailureModeAssessments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assessmentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFailureModeFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List findings.
 */
export const listFailureModeFindings: API.PaginatedOperationMethod<
  ListFailureModeFindingsRequest,
  ListFailureModeFindingsResponse,
  ListFailureModeFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFailureModeFindingsRequest,
  output: ListFailureModeFindingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailureModeFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInputSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists input sources for a service.
 */
export const listInputSources: API.PaginatedOperationMethod<
  ListInputSourcesRequest,
  ListInputSourcesResponse,
  ListInputSourcesError,
  Credentials | HttpClient.HttpClient,
  InputSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInputSourcesRequest,
  output: ListInputSourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "inputSourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists resilience policies.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List reports for a service, or all reports owned by the account if serviceArn is not provided.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsRequest,
  ListReportsResponse,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  ReportGenerationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReportsRequest,
  output: ListReportsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportGenerationResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolvedTestRunTargetResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the AWS resources that AWS Fault Injection Service (AWS FIS) resolved as targets for a test run.
 */
export const listResolvedTestRunTargetResources: API.PaginatedOperationMethod<
  ListResolvedTestRunTargetResourcesRequest,
  ListResolvedTestRunTargetResourcesResponse,
  ListResolvedTestRunTargetResourcesError,
  Credentials | HttpClient.HttpClient,
  ResolvedTargetResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResolvedTestRunTargetResourcesRequest,
  output: ListResolvedTestRunTargetResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolvedTestRunTargetResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvedTargetResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List resources.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  ServiceResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a service.
 */
export const listServiceEvents: API.PaginatedOperationMethod<
  ListServiceEventsRequest,
  ListServiceEventsResponse,
  ListServiceEventsError,
  Credentials | HttpClient.HttpClient,
  ServiceEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceEventsRequest,
  output: ListServiceEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceFunctionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists service functions for a service.
 */
export const listServiceFunctions: API.PaginatedOperationMethod<
  ListServiceFunctionsRequest,
  ListServiceFunctionsResponse,
  ListServiceFunctionsError,
  Credentials | HttpClient.HttpClient,
  ServiceFunction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceFunctionsRequest,
  output: ListServiceFunctionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceFunctions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists services.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTopologyEdgesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists topology edges for a service.
 */
export const listServiceTopologyEdges: API.PaginatedOperationMethod<
  ListServiceTopologyEdgesRequest,
  ListServiceTopologyEdgesResponse,
  ListServiceTopologyEdgesError,
  Credentials | HttpClient.HttpClient,
  ServiceTopologyEdgeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceTopologyEdgesRequest,
  output: ListServiceTopologyEdgesResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTopologyEdges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceTopologyEdgeSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a system.
 */
export const listSystemEvents: API.PaginatedOperationMethod<
  ListSystemEventsRequest,
  ListSystemEventsResponse,
  ListSystemEventsError,
  Credentials | HttpClient.HttpClient,
  SystemEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSystemEventsRequest,
  output: ListSystemEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystemEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists systems.
 */
export const listSystems: API.PaginatedOperationMethod<
  ListSystemsRequest,
  ListSystemsResponse,
  ListSystemsError,
  Credentials | HttpClient.HttpClient,
  SystemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSystemsRequest,
  output: ListSystemsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "systemSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTestRunEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events in a test run's timeline.
 */
export const listTestRunEvents: API.PaginatedOperationMethod<
  ListTestRunEventsRequest,
  ListTestRunEventsResponse,
  ListTestRunEventsError,
  Credentials | HttpClient.HttpClient,
  TestRunEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestRunEventsRequest,
  output: ListTestRunEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the runs of a test, or all test runs for a service.
 */
export const listTestRuns: API.PaginatedOperationMethod<
  ListTestRunsRequest,
  ListTestRunsResponse,
  ListTestRunsError,
  Credentials | HttpClient.HttpClient,
  TestRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestRunsRequest,
  output: ListTestRunsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the monitoring source snapshots captured for a test run, optionally filtered by type.
 */
export const listTestRunSources: API.PaginatedOperationMethod<
  ListTestRunSourcesRequest,
  ListTestRunSourcesResponse,
  ListTestRunSourcesError,
  Credentials | HttpClient.HttpClient,
  TestRunSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestRunSourcesRequest,
  output: ListTestRunSourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testRunSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tests configured for a service.
 */
export const listTests: API.PaginatedOperationMethod<
  ListTestsRequest,
  ListTestsResponse,
  ListTestsError,
  Credentials | HttpClient.HttpClient,
  TestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestsRequest,
  output: ListTestsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the monitoring sources attached to a test, optionally filtered by type.
 */
export const listTestSources: API.PaginatedOperationMethod<
  ListTestSourcesRequest,
  ListTestSourcesResponse,
  ListTestSourcesError,
  Credentials | HttpClient.HttpClient,
  TestSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestSourcesRequest,
  output: ListTestSourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available resilience test templates. A test template is a pre-configured, AWS recommended test that defines which resilience capability to validate.
 */
export const listTestTemplates: API.OperationMethod<
  ListTestTemplatesRequest,
  ListTestTemplatesResponse,
  ListTestTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTestTemplatesRequest,
  output: ListTestTemplatesResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestTemplates",
}));

export type ListUserJourneysError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists user journeys for a system.
 */
export const listUserJourneys: API.PaginatedOperationMethod<
  ListUserJourneysRequest,
  ListUserJourneysResponse,
  ListUserJourneysError,
  Credentials | HttpClient.HttpClient,
  UserJourneySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserJourneysRequest,
  output: ListUserJourneysResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserJourneys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "userJourneySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutTestSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the monitoring sources on a test. The operation is transactional — either every source is written or the call fails and nothing is written.
 */
export const putTestSources: API.OperationMethod<
  PutTestSourcesRequest,
  PutTestSourcesResponse,
  PutTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTestSourcesRequest,
  output: PutTestSourcesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTestSources",
}));

export type StartFailureModeAssessmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a failure mode assessment.
 */
export const startFailureModeAssessment: API.OperationMethod<
  StartFailureModeAssessmentRequest,
  StartFailureModeAssessmentResponse,
  StartFailureModeAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFailureModeAssessmentRequest,
  output: StartFailureModeAssessmentResponse,
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
  operationName: "StartFailureModeAssessment",
}));

export type StartTestRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts a run of a test. Each run scopes to the current resources in the service and produces a pass or fail outcome.
 */
export const startTestRun: API.OperationMethod<
  StartTestRunRequest,
  StartTestRunResponse,
  StartTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTestRunRequest,
  output: StartTestRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestRun",
}));

export type StopTestRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress test run.
 */
export const stopTestRun: API.OperationMethod<
  StopTestRunRequest,
  StopTestRunResponse,
  StopTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTestRunRequest,
  output: StopTestRunResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTestRun",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAssertionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a resilience assertion.
 */
export const updateAssertion: API.OperationMethod<
  UpdateAssertionRequest,
  UpdateAssertionResponse,
  UpdateAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssertionRequest,
  output: UpdateAssertionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssertion",
}));

export type UpdateDependencyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a dependency classification.
 */
export const updateDependency: API.OperationMethod<
  UpdateDependencyRequest,
  UpdateDependencyResponse,
  UpdateDependencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDependencyRequest,
  output: UpdateDependencyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDependency",
}));

export type UpdateFailureModeFindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing finding.
 */
export const updateFailureModeFinding: API.OperationMethod<
  UpdateFailureModeFindingRequest,
  UpdateFailureModeFindingResponse,
  UpdateFailureModeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFailureModeFindingRequest,
  output: UpdateFailureModeFindingResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFailureModeFinding",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing resilience policy.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing service.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a service function.
 */
export const updateServiceFunction: API.OperationMethod<
  UpdateServiceFunctionRequest,
  UpdateServiceFunctionResponse,
  UpdateServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceFunctionRequest,
  output: UpdateServiceFunctionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceFunction",
}));

export type UpdateSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing system.
 */
export const updateSystem: API.OperationMethod<
  UpdateSystemRequest,
  UpdateSystemResponse,
  UpdateSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSystemRequest,
  output: UpdateSystemResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSystem",
}));

export type UpdateTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing test.
 */
export const updateTest: API.OperationMethod<
  UpdateTestRequest,
  UpdateTestResponse,
  UpdateTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTestRequest,
  output: UpdateTestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTest",
}));

export type UpdateUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing user journey.
 */
export const updateUserJourney: API.OperationMethod<
  UpdateUserJourneyRequest,
  UpdateUserJourneyResponse,
  UpdateUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserJourneyRequest,
  output: UpdateUserJourneyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserJourney",
}));
