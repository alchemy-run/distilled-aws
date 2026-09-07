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
  sdkId: "HealthLake",
  serviceShapeName: "HealthLake",
});
const auth = T.AwsAuthSigv4({ name: "healthlake" });
const ver = T.ServiceVersion("2017-07-01");
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
              `https://healthlake-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://healthlake-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://healthlake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://healthlake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AgentMessageOutOfContextException
  extends /*@__PURE__*/ S.TaggedError<AgentMessageOutOfContextException>()(
    "AgentMessageOutOfContextException",
    { message: S.String.pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConversationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ConversationNotFoundException>()(
    "ConversationNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotImplementedOperationException
  extends /*@__PURE__*/ S.TaggedError<NotImplementedOperationException>()(
    "NotImplementedOperationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(501),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnsupportedMIMETypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMIMETypeException>()(
    "UnsupportedMIMETypeException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SourceFormat = "CCDA" | "CSV" | (string & {});
export const SourceFormat = S.String;

export interface StarterProfileSource {
  StarterProfileName: string;
}
export const StarterProfileSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StarterProfileName: S.String }),
).annotate({
  identifier: "StarterProfileSource",
}) as any as S.Schema<StarterProfileSource>;
export interface ExistingVersionedProfileSource {
  ProfileId: string;
  Version: number;
}
export const ExistingVersionedProfileSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileId: S.String, Version: S.Number }),
).annotate({
  identifier: "ExistingVersionedProfileSource",
}) as any as S.Schema<ExistingVersionedProfileSource>;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ProfileMappingSource {
  ProfileMapping: { [key: string]: string | undefined };
}
export const ProfileMappingSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileMapping: StringMap }),
).annotate({
  identifier: "ProfileMappingSource",
}) as any as S.Schema<ProfileMappingSource>;
export type SampleDataS3Uri = string;
export interface SampleDataSource {
  S3Uri: string;
}
export const SampleDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String }),
).annotate({
  identifier: "SampleDataSource",
}) as any as S.Schema<SampleDataSource>;
export type CreateDataTransformationProfileSource =
  | {
      StarterProfile: StarterProfileSource;
      ExistingVersionedProfileId?: never;
      ProfileMapping?: never;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId: ExistingVersionedProfileSource;
      ProfileMapping?: never;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId?: never;
      ProfileMapping: ProfileMappingSource;
      SampleData?: never;
    }
  | {
      StarterProfile?: never;
      ExistingVersionedProfileId?: never;
      ProfileMapping?: never;
      SampleData: SampleDataSource;
    };
export const CreateDataTransformationProfileSource = /*@__PURE__*/ S.Union([
  S.Struct({ StarterProfile: StarterProfileSource }),
  S.Struct({ ExistingVersionedProfileId: ExistingVersionedProfileSource }),
  S.Struct({ ProfileMapping: ProfileMappingSource }),
  S.Struct({ SampleData: SampleDataSource }),
]);
export type KmsKeyId = string;
export type ProfileDescription = string;
export type ProfileNameString = string;
export type DataTransformationTagKey = string;
export type DataTransformationTagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ClientToken = string;
export interface CreateDataTransformationProfileRequest {
  SourceFormat: SourceFormat;
  Source: CreateDataTransformationProfileSource;
  KmsKeyId?: string;
  ProfileDescription?: string;
  ProfileName: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export const CreateDataTransformationProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceFormat: SourceFormat,
      Source: CreateDataTransformationProfileSource,
      KmsKeyId: S.optional(S.String),
      ProfileDescription: S.optional(S.String),
      ProfileName: S.String,
      Tags: S.optional(TagMap),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/data-transformation-profile" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDataTransformationProfileRequest",
}) as any as S.Schema<CreateDataTransformationProfileRequest>;
export type ProfileIdString = string;
export type ProfileVersion = number;
export type TargetFormat = "FHIR_R4" | (string & {});
export const TargetFormat = S.String;

export interface CreateDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName: string;
  LastUpdatedAt: Date;
}
export const CreateDataTransformationProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      Version: S.Number,
      SourceFormat: SourceFormat,
      TargetFormat: TargetFormat,
      ProfileName: S.String,
      LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "CreateDataTransformationProfileResponse",
}) as any as S.Schema<CreateDataTransformationProfileResponse>;
export type DatastoreName = string;
export type FHIRVersion = "R4" | (string & {});
export const FHIRVersion = S.String;

export type CmkType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export const CmkType = S.String;

export type EncryptionKeyID = string;
export interface KmsEncryptionConfig {
  CmkType: CmkType;
  KmsKeyId?: string;
}
export const KmsEncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CmkType: CmkType, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "KmsEncryptionConfig",
}) as any as S.Schema<KmsEncryptionConfig>;
export interface SseConfiguration {
  KmsEncryptionConfig: KmsEncryptionConfig;
}
export const SseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsEncryptionConfig: KmsEncryptionConfig }),
).annotate({
  identifier: "SseConfiguration",
}) as any as S.Schema<SseConfiguration>;
export type PreloadDataType = "SYNTHEA" | (string & {});
export const PreloadDataType = S.String;

export interface PreloadDataConfig {
  PreloadDataType: PreloadDataType;
}
export const PreloadDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PreloadDataType: PreloadDataType }),
).annotate({
  identifier: "PreloadDataConfig",
}) as any as S.Schema<PreloadDataConfig>;
export type ClientTokenString = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type AuthorizationStrategy =
  | "SMART_ON_FHIR_V1"
  | "SMART_ON_FHIR"
  | "AWS_AUTH"
  | (string & {});
export const AuthorizationStrategy = S.String;

export type HealthLakeBoolean = boolean;
export type ConfigurationMetadata = string;
export type LambdaArn = string;
export interface IdentityProviderConfiguration {
  AuthorizationStrategy: AuthorizationStrategy;
  FineGrainedAuthorizationEnabled?: boolean;
  Metadata?: string;
  IdpLambdaArn?: string;
}
export const IdentityProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizationStrategy: AuthorizationStrategy,
    FineGrainedAuthorizationEnabled: S.optional(S.Boolean),
    Metadata: S.optional(S.String),
    IdpLambdaArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityProviderConfiguration",
}) as any as S.Schema<IdentityProviderConfiguration>;
export type AnalyticsStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | "PAUSING"
  | "PAUSED"
  | (string & {});
export const AnalyticsStatus = S.String;

export interface AnalyticsConfiguration {
  Status?: AnalyticsStatus;
}
export const AnalyticsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(AnalyticsStatus) }),
).annotate({
  identifier: "AnalyticsConfiguration",
}) as any as S.Schema<AnalyticsConfiguration>;
export type NlpStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
export const NlpStatus = S.String;

export interface NlpConfiguration {
  Status?: NlpStatus;
}
export const NlpConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(NlpStatus) }),
).annotate({
  identifier: "NlpConfiguration",
}) as any as S.Schema<NlpConfiguration>;
export type HealthLakeString = string;
export type DefaultProfiles = string[];
export const DefaultProfiles = /*@__PURE__*/ S.Array(S.String);
export interface ProfileConfiguration {
  DefaultProfiles?: string[];
}
export const ProfileConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DefaultProfiles: S.optional(DefaultProfiles) }),
).annotate({
  identifier: "ProfileConfiguration",
}) as any as S.Schema<ProfileConfiguration>;
export type BackupStatus = "ENABLED" | "DISABLED" | (string & {});
export const BackupStatus = S.String;

export type BackupType = "CONTINUOUS" | (string & {});
export const BackupType = S.String;

export type BackupRetentionPeriodInDays = number;
export interface BackupConfiguration {
  Status?: BackupStatus;
  BackupType?: BackupType;
  RetentionPeriodInDays?: number;
  BackupTagsEnabled?: boolean;
}
export const BackupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(BackupStatus),
    BackupType: S.optional(BackupType),
    RetentionPeriodInDays: S.optional(S.Number),
    BackupTagsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BackupConfiguration",
}) as any as S.Schema<BackupConfiguration>;
export interface CreateFHIRDatastoreRequest {
  DatastoreName?: string;
  DatastoreTypeVersion: FHIRVersion;
  SseConfiguration?: SseConfiguration;
  PreloadDataConfig?: PreloadDataConfig;
  ClientToken?: string;
  Tags?: Tag[];
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  BackupConfiguration?: BackupConfiguration;
}
export const CreateFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreName: S.optional(S.String),
    DatastoreTypeVersion: FHIRVersion,
    SseConfiguration: S.optional(SseConfiguration),
    PreloadDataConfig: S.optional(PreloadDataConfig),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    AnalyticsConfiguration: S.optional(AnalyticsConfiguration),
    NlpConfiguration: S.optional(NlpConfiguration),
    ProfileConfiguration: S.optional(ProfileConfiguration),
    BackupConfiguration: S.optional(BackupConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFHIRDatastoreRequest",
}) as any as S.Schema<CreateFHIRDatastoreRequest>;
export type DatastoreId = string;
export type DatastoreArn = string;
export type DatastoreStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | (string & {});
export const DatastoreStatus = S.String;

export type BoundedLengthString = string;
export interface CreateFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export const CreateFHIRDatastoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreStatus: DatastoreStatus,
    DatastoreEndpoint: S.String,
  }),
).annotate({
  identifier: "CreateFHIRDatastoreResponse",
}) as any as S.Schema<CreateFHIRDatastoreResponse>;
export interface DeleteDataTransformationProfileRequest {
  ProfileId: string;
}
export const DeleteDataTransformationProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/data-transformation-profile/{ProfileId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteDataTransformationProfileRequest",
}) as any as S.Schema<DeleteDataTransformationProfileRequest>;
export interface DeleteDataTransformationProfileResponse {
  ProfileId: string;
  ProfileName?: string;
  DeletionTime: Date;
}
export const DeleteDataTransformationProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      ProfileName: S.optional(S.String),
      DeletionTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "DeleteDataTransformationProfileResponse",
}) as any as S.Schema<DeleteDataTransformationProfileResponse>;
export interface DeleteFHIRDatastoreRequest {
  DatastoreId: string;
}
export const DeleteFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFHIRDatastoreRequest",
}) as any as S.Schema<DeleteFHIRDatastoreRequest>;
export interface DeleteFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export const DeleteFHIRDatastoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreStatus: DatastoreStatus,
    DatastoreEndpoint: S.String,
  }),
).annotate({
  identifier: "DeleteFHIRDatastoreResponse",
}) as any as S.Schema<DeleteFHIRDatastoreResponse>;
export type DataTransformationJobId = string;
export interface DescribeDataTransformationJobRequest {
  JobId: string;
}
export const DescribeDataTransformationJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/data-transformation-job/{JobId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeDataTransformationJobRequest",
}) as any as S.Schema<DescribeDataTransformationJobRequest>;
export type TransformationJobStatus =
  | "SUBMITTED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | (string & {});
export const TransformationJobStatus = S.String;

export type DataTransformationS3Uri = string;
export interface TransformationInputDataConfig {
  S3Uri: string;
  SourceFormat?: SourceFormat;
}
export const TransformationInputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, SourceFormat: S.optional(SourceFormat) }),
).annotate({
  identifier: "TransformationInputDataConfig",
}) as any as S.Schema<TransformationInputDataConfig>;
export interface DataTransformationS3Configuration {
  S3Uri: string;
  KmsKeyId: string;
}
export const DataTransformationS3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.String }),
).annotate({
  identifier: "DataTransformationS3Configuration",
}) as any as S.Schema<DataTransformationS3Configuration>;
export interface TransformationOutputDataConfig {
  S3Configuration: DataTransformationS3Configuration;
}
export const TransformationOutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Configuration: DataTransformationS3Configuration }),
).annotate({
  identifier: "TransformationOutputDataConfig",
}) as any as S.Schema<TransformationOutputDataConfig>;
export type DataTransformationIamRoleArn = string;
export type DataTransformationJobName = string;
export type BoundedString = string;
export interface TransformationJobProgressReport {
  TotalFilesScanned: number;
  TotalFilesConverted: number;
  TotalFilesFailed: number;
  TotalResourcesGenerated: number;
}
export const TransformationJobProgressReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalFilesScanned: S.Number,
    TotalFilesConverted: S.Number,
    TotalFilesFailed: S.Number,
    TotalResourcesGenerated: S.Number,
  }),
).annotate({
  identifier: "TransformationJobProgressReport",
}) as any as S.Schema<TransformationJobProgressReport>;
export interface TransformationJobProperties {
  JobId: string;
  JobStatus: TransformationJobStatus;
  InputDataConfig: TransformationInputDataConfig;
  OutputDataConfig: TransformationOutputDataConfig;
  DataAccessRoleArn: string;
  SubmitTime: Date;
  JobName?: string;
  ProfileId?: string;
  ProfileName?: string;
  ProfileVersion?: number;
  EndTime?: Date;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
  Message?: string;
  JobProgressReport?: TransformationJobProgressReport;
}
export const TransformationJobProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: TransformationJobStatus,
    InputDataConfig: TransformationInputDataConfig,
    OutputDataConfig: TransformationOutputDataConfig,
    DataAccessRoleArn: S.String,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    JobName: S.optional(S.String),
    ProfileId: S.optional(S.String),
    ProfileName: S.optional(S.String),
    ProfileVersion: S.optional(S.Number),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DriftDetectionEnabled: S.optional(S.Boolean),
    ProvenanceEnabled: S.optional(S.Boolean),
    Message: S.optional(S.String),
    JobProgressReport: S.optional(TransformationJobProgressReport),
  }),
).annotate({
  identifier: "TransformationJobProperties",
}) as any as S.Schema<TransformationJobProperties>;
export interface DescribeDataTransformationJobResponse {
  TransformationJobProperties: TransformationJobProperties;
}
export const DescribeDataTransformationJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ TransformationJobProperties: TransformationJobProperties }),
).annotate({
  identifier: "DescribeDataTransformationJobResponse",
}) as any as S.Schema<DescribeDataTransformationJobResponse>;
export interface DescribeFHIRDatastoreRequest {
  DatastoreId: string;
}
export const DescribeFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRDatastoreRequest",
}) as any as S.Schema<DescribeFHIRDatastoreRequest>;
export type HealthLakeTimestamp = Date;
export type ErrorMessage = string;
export type ErrorCategory =
  | "RETRYABLE_ERROR"
  | "NON_RETRYABLE_ERROR"
  | (string & {});
export const ErrorCategory = S.String;

export interface ErrorCause {
  ErrorMessage?: string;
  ErrorCategory?: ErrorCategory;
}
export const ErrorCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorMessage: S.optional(S.String),
    ErrorCategory: S.optional(ErrorCategory),
  }),
).annotate({ identifier: "ErrorCause" }) as any as S.Schema<ErrorCause>;
export interface DatastoreBackupStatus {
  Configuration?: BackupConfiguration;
  BackupEnabledAt?: Date;
  EarliestRestorePoint?: Date;
  LatestRestorePoint?: Date;
  ScheduledPermanentDeletionTime?: Date;
}
export const DatastoreBackupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Configuration: S.optional(BackupConfiguration),
    BackupEnabledAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EarliestRestorePoint: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestRestorePoint: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ScheduledPermanentDeletionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DatastoreBackupStatus",
}) as any as S.Schema<DatastoreBackupStatus>;
export interface DatastoreProperties {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreName?: string;
  DatastoreStatus: DatastoreStatus;
  CreatedAt?: Date;
  DatastoreTypeVersion: FHIRVersion;
  DatastoreEndpoint: string;
  SseConfiguration?: SseConfiguration;
  PreloadDataConfig?: PreloadDataConfig;
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  ErrorCause?: ErrorCause;
  NlpConfiguration?: NlpConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  BackupStatusInfo?: DatastoreBackupStatus;
}
export const DatastoreProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreName: S.optional(S.String),
    DatastoreStatus: DatastoreStatus,
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreTypeVersion: FHIRVersion,
    DatastoreEndpoint: S.String,
    SseConfiguration: S.optional(SseConfiguration),
    PreloadDataConfig: S.optional(PreloadDataConfig),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    ErrorCause: S.optional(ErrorCause),
    NlpConfiguration: S.optional(NlpConfiguration),
    AnalyticsConfiguration: S.optional(AnalyticsConfiguration),
    ProfileConfiguration: S.optional(ProfileConfiguration),
    BackupStatusInfo: S.optional(DatastoreBackupStatus),
  }),
).annotate({
  identifier: "DatastoreProperties",
}) as any as S.Schema<DatastoreProperties>;
export interface DescribeFHIRDatastoreResponse {
  DatastoreProperties: DatastoreProperties;
}
export const DescribeFHIRDatastoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreProperties: DatastoreProperties }),
).annotate({
  identifier: "DescribeFHIRDatastoreResponse",
}) as any as S.Schema<DescribeFHIRDatastoreResponse>;
export type JobId = string;
export interface DescribeFHIRExportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export const DescribeFHIRExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRExportJobRequest",
}) as any as S.Schema<DescribeFHIRExportJobRequest>;
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED_WITH_ERRORS"
  | "COMPLETED"
  | "FAILED"
  | "CANCEL_SUBMITTED"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_COMPLETED"
  | "CANCEL_FAILED"
  | (string & {});
export const JobStatus = S.String;

export type S3Uri = string;
export interface S3Configuration {
  S3Uri: string;
  KmsKeyId: string;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.String }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export type OutputDataConfig = { S3Configuration: S3Configuration };
export const OutputDataConfig = /*@__PURE__*/ S.Union([
  S.Struct({ S3Configuration: S3Configuration }),
]);
export type IamRoleArn = string;
export type Message = string;
export interface ExportJobProperties {
  JobId: string;
  JobName?: string;
  JobStatus: JobStatus;
  SubmitTime: Date;
  EndTime?: Date;
  DatastoreId: string;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn?: string;
  Message?: string;
}
export const ExportJobProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    JobStatus: JobStatus,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreId: S.String,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportJobProperties",
}) as any as S.Schema<ExportJobProperties>;
export interface DescribeFHIRExportJobResponse {
  ExportJobProperties: ExportJobProperties;
}
export const DescribeFHIRExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportJobProperties: ExportJobProperties }),
).annotate({
  identifier: "DescribeFHIRExportJobResponse",
}) as any as S.Schema<DescribeFHIRExportJobResponse>;
export interface DescribeFHIRImportJobRequest {
  DatastoreId: string;
  JobId: string;
}
export const DescribeFHIRImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreId: S.String, JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFHIRImportJobRequest",
}) as any as S.Schema<DescribeFHIRImportJobRequest>;
export type InputDataConfig = { S3Uri: string };
export const InputDataConfig = /*@__PURE__*/ S.Union([
  S.Struct({ S3Uri: S.String }),
]);
export interface JobProgressReport {
  TotalNumberOfScannedFiles?: number;
  TotalSizeOfScannedFilesInMB?: number;
  TotalNumberOfImportedFiles?: number;
  TotalNumberOfResourcesScanned?: number;
  TotalNumberOfResourcesImported?: number;
  TotalNumberOfResourcesWithCustomerError?: number;
  TotalNumberOfFilesReadWithCustomerError?: number;
  TotalNumberOfScannedNonFhirFiles?: number;
  TotalSizeOfScannedNonFhirFilesInMB?: number;
  TotalNumberOfImportedNonFhirFiles?: number;
  TotalNumberOfNonFhirResourcesScanned?: number;
  TotalNumberOfNonFhirResourcesImported?: number;
  TotalNumberOfNonFhirResourcesWithCustomerError?: number;
  TotalNumberOfNonFhirFilesReadWithCustomerError?: number;
  Throughput?: number;
  TotalFilesConverted?: number;
  TotalResourcesGenerated?: number;
}
export const JobProgressReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalNumberOfScannedFiles: S.optional(S.Number),
    TotalSizeOfScannedFilesInMB: S.optional(S.Number),
    TotalNumberOfImportedFiles: S.optional(S.Number),
    TotalNumberOfResourcesScanned: S.optional(S.Number),
    TotalNumberOfResourcesImported: S.optional(S.Number),
    TotalNumberOfResourcesWithCustomerError: S.optional(S.Number),
    TotalNumberOfFilesReadWithCustomerError: S.optional(S.Number),
    TotalNumberOfScannedNonFhirFiles: S.optional(S.Number),
    TotalSizeOfScannedNonFhirFilesInMB: S.optional(S.Number),
    TotalNumberOfImportedNonFhirFiles: S.optional(S.Number),
    TotalNumberOfNonFhirResourcesScanned: S.optional(S.Number),
    TotalNumberOfNonFhirResourcesImported: S.optional(S.Number),
    TotalNumberOfNonFhirResourcesWithCustomerError: S.optional(S.Number),
    TotalNumberOfNonFhirFilesReadWithCustomerError: S.optional(S.Number),
    Throughput: S.optional(S.Number),
    TotalFilesConverted: S.optional(S.Number),
    TotalResourcesGenerated: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobProgressReport",
}) as any as S.Schema<JobProgressReport>;
export type ValidationLevel =
  | "strict"
  | "structure-only"
  | "minimal"
  | (string & {});
export const ValidationLevel = S.String;

export interface ImportJobProperties {
  JobId: string;
  JobName?: string;
  JobStatus: JobStatus;
  SubmitTime: Date;
  EndTime?: Date;
  DatastoreId: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig?: OutputDataConfig;
  JobProgressReport?: JobProgressReport;
  DataAccessRoleArn?: string;
  Message?: string;
  ValidationLevel?: ValidationLevel;
}
export const ImportJobProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    JobStatus: JobStatus,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DatastoreId: S.String,
    InputDataConfig: InputDataConfig,
    JobOutputDataConfig: S.optional(OutputDataConfig),
    JobProgressReport: S.optional(JobProgressReport),
    DataAccessRoleArn: S.optional(S.String),
    Message: S.optional(S.String),
    ValidationLevel: S.optional(ValidationLevel),
  }),
).annotate({
  identifier: "ImportJobProperties",
}) as any as S.Schema<ImportJobProperties>;
export interface DescribeFHIRImportJobResponse {
  ImportJobProperties: ImportJobProperties;
}
export const DescribeFHIRImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportJobProperties: ImportJobProperties }),
).annotate({
  identifier: "DescribeFHIRImportJobResponse",
}) as any as S.Schema<DescribeFHIRImportJobResponse>;
export interface GetDataTransformationProfileRequest {
  ProfileId: string;
  ProfileVersion?: number;
}
export const GetDataTransformationProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
    ProfileVersion: S.optional(S.Number).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/data-transformation-profile/{ProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataTransformationProfileRequest",
}) as any as S.Schema<GetDataTransformationProfileRequest>;
export type ProfileMappingKey = string;
export type ProfileMappingValue = string;
export type ProfileMapping = { [key: string]: string | undefined };
export const ProfileMapping = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ChangeDescription = string;
export interface GetDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileMapping: { [key: string]: string | undefined };
  ProfileName?: string;
  ProfileDescription?: string;
  ChangeDescription?: string;
  LastUpdatedAt: Date;
}
export const GetDataTransformationProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      Version: S.Number,
      SourceFormat: SourceFormat,
      TargetFormat: TargetFormat,
      ProfileMapping: ProfileMapping,
      ProfileName: S.optional(S.String),
      ProfileDescription: S.optional(S.String),
      ChangeDescription: S.optional(S.String),
      LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "GetDataTransformationProfileResponse",
}) as any as S.Schema<GetDataTransformationProfileResponse>;
export type MaxResults = number;
export type DataTransformationNextToken = string;
export interface ListDataTransformationJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  JobStatus?: TransformationJobStatus;
  JobName?: string;
  SubmittedAfter?: Date;
  SubmittedBefore?: Date;
}
export const ListDataTransformationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    JobStatus: S.optional(TransformationJobStatus).pipe(
      T.HttpQuery("jobStatus"),
    ),
    JobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
    SubmittedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("submittedAfter")),
    SubmittedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("submittedBefore")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/data-transformation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataTransformationJobsRequest",
}) as any as S.Schema<ListDataTransformationJobsRequest>;
export interface TransformationJobSummary {
  JobId: string;
  JobStatus: TransformationJobStatus;
  SubmitTime: Date;
  JobName?: string;
  EndTime?: Date;
  SourceFormat?: SourceFormat;
}
export const TransformationJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: TransformationJobStatus,
    SubmitTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    JobName: S.optional(S.String),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SourceFormat: S.optional(SourceFormat),
  }),
).annotate({
  identifier: "TransformationJobSummary",
}) as any as S.Schema<TransformationJobSummary>;
export type TransformationJobSummaryList = TransformationJobSummary[];
export const TransformationJobSummaryList = /*@__PURE__*/ S.Array(
  TransformationJobSummary,
);
export interface ListDataTransformationJobsResponse {
  Items: TransformationJobSummary[];
  NextToken?: string;
}
export const ListDataTransformationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: TransformationJobSummaryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataTransformationJobsResponse",
}) as any as S.Schema<ListDataTransformationJobsResponse>;
export interface ListDataTransformationProfilesRequest {
  SourceFormat: SourceFormat;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataTransformationProfilesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SourceFormat: SourceFormat.pipe(T.HttpQuery("sourceFormat")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/data-transformation-profile" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDataTransformationProfilesRequest",
}) as any as S.Schema<ListDataTransformationProfilesRequest>;
export interface DataTransformationProfileSummary {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  ProfileDescription?: string;
  LastUpdatedAt?: Date;
}
export const DataTransformationProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String,
    Version: S.Number,
    SourceFormat: SourceFormat,
    TargetFormat: TargetFormat,
    ProfileName: S.optional(S.String),
    ProfileDescription: S.optional(S.String),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DataTransformationProfileSummary",
}) as any as S.Schema<DataTransformationProfileSummary>;
export type DataTransformationProfileSummaryList =
  DataTransformationProfileSummary[];
export const DataTransformationProfileSummaryList = /*@__PURE__*/ S.Array(
  DataTransformationProfileSummary,
);
export interface ListDataTransformationProfilesResponse {
  Items: DataTransformationProfileSummary[];
  NextToken?: string;
}
export const ListDataTransformationProfilesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Items: DataTransformationProfileSummaryList,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDataTransformationProfilesResponse",
}) as any as S.Schema<ListDataTransformationProfilesResponse>;
export interface ListDataTransformationProfileVersionsRequest {
  ProfileId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataTransformationProfileVersionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/data-transformation-profile/{ProfileId}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListDataTransformationProfileVersionsRequest",
  }) as any as S.Schema<ListDataTransformationProfileVersionsRequest>;
export interface DataTransformationProfileVersionSummary {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  ChangeDescription?: string;
  LastUpdatedAt?: Date;
}
export const DataTransformationProfileVersionSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      Version: S.Number,
      SourceFormat: SourceFormat,
      TargetFormat: TargetFormat,
      ProfileName: S.optional(S.String),
      ChangeDescription: S.optional(S.String),
      LastUpdatedAt: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "DataTransformationProfileVersionSummary",
}) as any as S.Schema<DataTransformationProfileVersionSummary>;
export type DataTransformationProfileVersionSummaryList =
  DataTransformationProfileVersionSummary[];
export const DataTransformationProfileVersionSummaryList =
  /*@__PURE__*/ S.Array(DataTransformationProfileVersionSummary);
export interface ListDataTransformationProfileVersionsResponse {
  Items: DataTransformationProfileVersionSummary[];
  NextToken?: string;
}
export const ListDataTransformationProfileVersionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Items: DataTransformationProfileVersionSummaryList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDataTransformationProfileVersionsResponse",
  }) as any as S.Schema<ListDataTransformationProfileVersionsResponse>;
export interface DatastoreFilter {
  DatastoreName?: string;
  DatastoreStatus?: DatastoreStatus;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
}
export const DatastoreFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreName: S.optional(S.String),
    DatastoreStatus: S.optional(DatastoreStatus),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DatastoreFilter",
}) as any as S.Schema<DatastoreFilter>;
export type NextToken = string;
export type MaxResultsInteger = number;
export interface ListFHIRDatastoresRequest {
  Filter?: DatastoreFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFHIRDatastoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(DatastoreFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRDatastoresRequest",
}) as any as S.Schema<ListFHIRDatastoresRequest>;
export type DatastorePropertiesList = DatastoreProperties[];
export const DatastorePropertiesList =
  /*@__PURE__*/ S.Array(DatastoreProperties);
export interface ListFHIRDatastoresResponse {
  DatastorePropertiesList: DatastoreProperties[];
  NextToken?: string;
}
export const ListFHIRDatastoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastorePropertiesList: DatastorePropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRDatastoresResponse",
}) as any as S.Schema<ListFHIRDatastoresResponse>;
export interface ListFHIRExportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export const ListFHIRExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmittedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRExportJobsRequest",
}) as any as S.Schema<ListFHIRExportJobsRequest>;
export type ExportJobPropertiesList = ExportJobProperties[];
export const ExportJobPropertiesList =
  /*@__PURE__*/ S.Array(ExportJobProperties);
export interface ListFHIRExportJobsResponse {
  ExportJobPropertiesList: ExportJobProperties[];
  NextToken?: string;
}
export const ListFHIRExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobPropertiesList: ExportJobPropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRExportJobsResponse",
}) as any as S.Schema<ListFHIRExportJobsResponse>;
export interface ListFHIRImportJobsRequest {
  DatastoreId: string;
  NextToken?: string;
  MaxResults?: number;
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBefore?: Date;
  SubmittedAfter?: Date;
}
export const ListFHIRImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmittedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmittedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFHIRImportJobsRequest",
}) as any as S.Schema<ListFHIRImportJobsRequest>;
export type ImportJobPropertiesList = ImportJobProperties[];
export const ImportJobPropertiesList =
  /*@__PURE__*/ S.Array(ImportJobProperties);
export interface ListFHIRImportJobsResponse {
  ImportJobPropertiesList: ImportJobProperties[];
  NextToken?: string;
}
export const ListFHIRImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobPropertiesList: ImportJobPropertiesList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFHIRImportJobsResponse",
}) as any as S.Schema<ListFHIRImportJobsResponse>;
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
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PublishDataTransformationProfileRequest {
  ProfileId: string;
  SourceFormat: SourceFormat;
  FromExistingVersion?: number;
  ChangeDescription?: string;
}
export const PublishDataTransformationProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
      SourceFormat: SourceFormat.pipe(T.HttpQuery("sourceFormat")),
      FromExistingVersion: S.optional(S.Number),
      ChangeDescription: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/data-transformation-profile/{ProfileId}/publish",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PublishDataTransformationProfileRequest",
}) as any as S.Schema<PublishDataTransformationProfileRequest>;
export interface PublishDataTransformationProfileResponse {
  ProfileId: string;
  Version: number;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  LastUpdatedAt: Date;
}
export const PublishDataTransformationProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      Version: S.Number,
      SourceFormat: SourceFormat,
      TargetFormat: TargetFormat,
      ProfileName: S.optional(S.String),
      LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "PublishDataTransformationProfileResponse",
}) as any as S.Schema<PublishDataTransformationProfileResponse>;
export interface ContinuousBackupRestoreConfiguration {
  RestorePointTime?: Date;
}
export const ContinuousBackupRestoreConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RestorePointTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "ContinuousBackupRestoreConfiguration",
}) as any as S.Schema<ContinuousBackupRestoreConfiguration>;
export type RestoreConfiguration = {
  ContinuousBackupRestoreConfiguration: ContinuousBackupRestoreConfiguration;
};
export const RestoreConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    ContinuousBackupRestoreConfiguration: ContinuousBackupRestoreConfiguration,
  }),
]);
export interface RestoreFHIRDatastoreRequest {
  SourceDatastoreId: string;
  RestoreConfiguration: RestoreConfiguration;
  DatastoreName?: string;
  SseConfiguration?: SseConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
}
export const RestoreFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceDatastoreId: S.String,
    RestoreConfiguration: RestoreConfiguration,
    DatastoreName: S.optional(S.String),
    SseConfiguration: S.optional(SseConfiguration),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    AnalyticsConfiguration: S.optional(AnalyticsConfiguration),
    NlpConfiguration: S.optional(NlpConfiguration),
    ProfileConfiguration: S.optional(ProfileConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreFHIRDatastoreRequest",
}) as any as S.Schema<RestoreFHIRDatastoreRequest>;
export interface RestoreFHIRDatastoreResponse {
  DatastoreId: string;
  DatastoreArn: string;
  DatastoreStatus: DatastoreStatus;
  DatastoreEndpoint: string;
}
export const RestoreFHIRDatastoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreArn: S.String,
    DatastoreStatus: DatastoreStatus,
    DatastoreEndpoint: S.String,
  }),
).annotate({
  identifier: "RestoreFHIRDatastoreResponse",
}) as any as S.Schema<RestoreFHIRDatastoreResponse>;
export interface StartDataTransformationJobRequest {
  InputDataConfig: TransformationInputDataConfig;
  OutputDataConfig: TransformationOutputDataConfig;
  DataAccessRoleArn: string;
  ClientToken: string;
  JobName?: string;
  ProfileId: string;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
}
export const StartDataTransformationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputDataConfig: TransformationInputDataConfig,
    OutputDataConfig: TransformationOutputDataConfig,
    DataAccessRoleArn: S.String,
    ClientToken: S.String,
    JobName: S.optional(S.String),
    ProfileId: S.String,
    DriftDetectionEnabled: S.optional(S.Boolean),
    ProvenanceEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/data-transformation-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDataTransformationJobRequest",
}) as any as S.Schema<StartDataTransformationJobRequest>;
export interface StartDataTransformationJobResponse {
  JobId: string;
  JobStatus: TransformationJobStatus;
}
export const StartDataTransformationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String, JobStatus: TransformationJobStatus }),
).annotate({
  identifier: "StartDataTransformationJobResponse",
}) as any as S.Schema<StartDataTransformationJobResponse>;
export interface StartFHIRExportJobRequest {
  JobName?: string;
  OutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
}
export const StartFHIRExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    OutputDataConfig: OutputDataConfig,
    DatastoreId: S.String,
    DataAccessRoleArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFHIRExportJobRequest",
}) as any as S.Schema<StartFHIRExportJobRequest>;
export interface StartFHIRExportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export const StartFHIRExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: JobStatus,
    DatastoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartFHIRExportJobResponse",
}) as any as S.Schema<StartFHIRExportJobResponse>;
export type DefaultEnabledBoolean = boolean;
export interface StartFHIRImportJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
  ValidationLevel?: ValidationLevel;
  ProfileId?: string;
  InputFormat?: string;
  DriftDetectionEnabled?: boolean;
  ProvenanceEnabled?: boolean;
}
export const StartFHIRImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    InputDataConfig: InputDataConfig,
    JobOutputDataConfig: OutputDataConfig,
    DatastoreId: S.String,
    DataAccessRoleArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ValidationLevel: S.optional(ValidationLevel),
    ProfileId: S.optional(S.String),
    InputFormat: S.optional(S.String),
    DriftDetectionEnabled: S.optional(S.Boolean),
    ProvenanceEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFHIRImportJobRequest",
}) as any as S.Schema<StartFHIRImportJobRequest>;
export interface StartFHIRImportJobResponse {
  JobId: string;
  JobStatus: JobStatus;
  DatastoreId?: string;
}
export const StartFHIRImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobStatus: JobStatus,
    DatastoreId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartFHIRImportJobResponse",
}) as any as S.Schema<StartFHIRImportJobResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
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
export interface UpdateDataTransformationProfileRequest {
  ProfileId: string;
  ProfileMapping: { [key: string]: string | undefined };
  ChangeDescription?: string;
}
export const UpdateDataTransformationProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
      ProfileMapping: ProfileMapping,
      ChangeDescription: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/data-transformation-profile/{ProfileId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDataTransformationProfileRequest",
}) as any as S.Schema<UpdateDataTransformationProfileRequest>;
export interface UpdateDataTransformationProfileResponse {
  ProfileId: string;
  SourceFormat: SourceFormat;
  TargetFormat: TargetFormat;
  ProfileName?: string;
  LastUpdatedAt: Date;
}
export const UpdateDataTransformationProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      SourceFormat: SourceFormat,
      TargetFormat: TargetFormat,
      ProfileName: S.optional(S.String),
      LastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "UpdateDataTransformationProfileResponse",
}) as any as S.Schema<UpdateDataTransformationProfileResponse>;
export interface UpdateFHIRDatastoreRequest {
  DatastoreId: string;
  DatastoreName?: string;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  NlpConfiguration?: NlpConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
  BackupConfiguration?: BackupConfiguration;
}
export const UpdateFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreName: S.optional(S.String),
    AnalyticsConfiguration: S.optional(AnalyticsConfiguration),
    NlpConfiguration: S.optional(NlpConfiguration),
    ProfileConfiguration: S.optional(ProfileConfiguration),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    BackupConfiguration: S.optional(BackupConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFHIRDatastoreRequest",
}) as any as S.Schema<UpdateFHIRDatastoreRequest>;
export interface UpdateFHIRDatastoreResponse {
  DatastoreProperties: DatastoreProperties;
}
export const UpdateFHIRDatastoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatastoreProperties: DatastoreProperties }),
).annotate({
  identifier: "UpdateFHIRDatastoreResponse",
}) as any as S.Schema<UpdateFHIRDatastoreResponse>;
export type AgentMessageString = string | redacted.Redacted<string>;
export type AgentInputMessageType =
  | "normal"
  | "confirmation_response"
  | (string & {});
export const AgentInputMessageType = S.String;

export interface AgentInputMessage {
  Body: string | redacted.Redacted<string>;
  Type: AgentInputMessageType;
}
export const AgentInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Body: SensitiveString, Type: AgentInputMessageType }),
).annotate({
  identifier: "AgentInputMessage",
}) as any as S.Schema<AgentInputMessage>;
export type ConversationIdString = string;
export interface UpdateProfileWithAgentRequest {
  ProfileId: string;
  SourceFormat: SourceFormat;
  InputMessage: AgentInputMessage;
  ConversationId?: string;
}
export const UpdateProfileWithAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String,
    SourceFormat: SourceFormat,
    InputMessage: AgentInputMessage,
    ConversationId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-profile-with-agent" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProfileWithAgentRequest",
}) as any as S.Schema<UpdateProfileWithAgentRequest>;
export type AgentOutputMessageType =
  | "INITIAL_GREETING"
  | "normal"
  | "confirmation"
  | "complete"
  | "error"
  | "options"
  | "choices"
  | (string & {});
export const AgentOutputMessageType = S.String;

export type DataTransformationChatOptionString =
  | string
  | redacted.Redacted<string>;
export type DataTransformationChatOptionsList = (
  | string
  | redacted.Redacted<string>
)[];
export const DataTransformationChatOptionsList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface AgentOutputMessage {
  Body: string | redacted.Redacted<string>;
  Type: AgentOutputMessageType;
  OptionsList?: (string | redacted.Redacted<string>)[];
}
export const AgentOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: SensitiveString,
    Type: AgentOutputMessageType,
    OptionsList: S.optional(DataTransformationChatOptionsList),
  }),
).annotate({
  identifier: "AgentOutputMessage",
}) as any as S.Schema<AgentOutputMessage>;
export interface UpdateProfileWithAgentResponse {
  AgentResponse: AgentOutputMessage;
  ConversationId: string;
}
export const UpdateProfileWithAgentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AgentResponse: AgentOutputMessage, ConversationId: S.String }),
).annotate({
  identifier: "UpdateProfileWithAgentResponse",
}) as any as S.Schema<UpdateProfileWithAgentResponse>;
export type CreateDataTransformationProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data transformation profile in DRAFT state. Specify a built-in starter profile, an existing profile version, raw profile content, or a sample data file as the source.
 */
export const createDataTransformationProfile: API.OperationMethod<
  CreateDataTransformationProfileRequest,
  CreateDataTransformationProfileResponse,
  CreateDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataTransformationProfileRequest,
  output: CreateDataTransformationProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type CreateFHIRDatastoreError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a FHIR-enabled data store.
 */
export const createFHIRDatastore: API.OperationMethod<
  CreateFHIRDatastoreRequest,
  CreateFHIRDatastoreResponse,
  CreateFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFHIRDatastoreRequest,
  output: CreateFHIRDatastoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFHIRDatastore",
}));

export type DeleteDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data transformation profile and all its versions, including the DRAFT and all published versions.
 */
export const deleteDataTransformationProfile: API.OperationMethod<
  DeleteDataTransformationProfileRequest,
  DeleteDataTransformationProfileResponse,
  DeleteDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataTransformationProfileRequest,
  output: DeleteDataTransformationProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type DeleteFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a FHIR-enabled data store.
 */
export const deleteFHIRDatastore: API.OperationMethod<
  DeleteFHIRDatastoreRequest,
  DeleteFHIRDatastoreResponse,
  DeleteFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFHIRDatastoreRequest,
  output: DeleteFHIRDatastoreResponse,
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
  operationName: "DeleteFHIRDatastore",
}));

export type DescribeDataTransformationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a data transformation job, including its current status, configuration, and progress information.
 */
export const describeDataTransformationJob: API.OperationMethod<
  DescribeDataTransformationJobRequest,
  DescribeDataTransformationJobResponse,
  DescribeDataTransformationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDataTransformationJobRequest,
  output: DescribeDataTransformationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
}));

export type DescribeFHIRDatastoreError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get properties for a FHIR-enabled data store.
 */
export const describeFHIRDatastore: API.OperationMethod<
  DescribeFHIRDatastoreRequest,
  DescribeFHIRDatastoreResponse,
  DescribeFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFHIRDatastoreRequest,
  output: DescribeFHIRDatastoreResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRDatastore",
}));

export type DescribeFHIRExportJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get FHIR export job properties.
 */
export const describeFHIRExportJob: API.OperationMethod<
  DescribeFHIRExportJobRequest,
  DescribeFHIRExportJobResponse,
  DescribeFHIRExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFHIRExportJobRequest,
  output: DescribeFHIRExportJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRExportJob",
}));

export type DescribeFHIRImportJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the import job properties to learn more about the job or job progress.
 */
export const describeFHIRImportJob: API.OperationMethod<
  DescribeFHIRImportJobRequest,
  DescribeFHIRImportJobResponse,
  DescribeFHIRImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFHIRImportJobRequest,
  output: DescribeFHIRImportJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFHIRImportJob",
}));

export type GetDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a data transformation profile's metadata and profile content at a specific version. Specify version 0 to retrieve the DRAFT, a version number between 1 and 99 to retrieve a specific published version, or omit the version to retrieve the latest published version.
 */
export const getDataTransformationProfile: API.OperationMethod<
  GetDataTransformationProfileRequest,
  GetDataTransformationProfileResponse,
  GetDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataTransformationProfileRequest,
  output: GetDataTransformationProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type ListDataTransformationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data transformation jobs for your Amazon Web Services account. Results can be filtered by status, job name, and submit time window. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationJobs: API.PaginatedOperationMethod<
  ListDataTransformationJobsRequest,
  ListDataTransformationJobsResponse,
  ListDataTransformationJobsError,
  Credentials | HttpClient.HttpClient,
  TransformationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataTransformationJobsRequest,
  output: ListDataTransformationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationJobs",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTransformationProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all data transformation profiles in your account, returning the latest version summary for each. Use `GetDataTransformationProfile` to retrieve profile content. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationProfiles: API.PaginatedOperationMethod<
  ListDataTransformationProfilesRequest,
  ListDataTransformationProfilesResponse,
  ListDataTransformationProfilesError,
  Credentials | HttpClient.HttpClient,
  DataTransformationProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataTransformationProfilesRequest,
  output: ListDataTransformationProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationProfiles",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataTransformationProfileVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specific data transformation profile (DRAFT and published), in reverse chronological order (newest first). Use `GetDataTransformationProfile` to retrieve profile content. Results are paginated. Use the `NextToken` parameter to retrieve additional results.
 */
export const listDataTransformationProfileVersions: API.PaginatedOperationMethod<
  ListDataTransformationProfileVersionsRequest,
  ListDataTransformationProfileVersionsResponse,
  ListDataTransformationProfileVersionsError,
  Credentials | HttpClient.HttpClient,
  DataTransformationProfileVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataTransformationProfileVersionsRequest,
  output: ListDataTransformationProfileVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataTransformationProfileVersions",
  endpointHostPrefix: "datatransformation.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRDatastoresError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR-enabled data stores in a user’s account, regardless of data store status.
 */
export const listFHIRDatastores: API.PaginatedOperationMethod<
  ListFHIRDatastoresRequest,
  ListFHIRDatastoresResponse,
  ListFHIRDatastoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRDatastoresRequest,
  output: ListFHIRDatastoresResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRDatastores",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all FHIR export jobs associated with an account and their statuses.
 */
export const listFHIRExportJobs: API.PaginatedOperationMethod<
  ListFHIRExportJobsRequest,
  ListFHIRExportJobsResponse,
  ListFHIRExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRExportJobsRequest,
  output: ListFHIRExportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFHIRImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR import jobs associated with an account and their statuses.
 */
export const listFHIRImportJobs: API.PaginatedOperationMethod<
  ListFHIRImportJobsRequest,
  ListFHIRImportJobsResponse,
  ListFHIRImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFHIRImportJobsRequest,
  output: ListFHIRImportJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFHIRImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all existing tags associated with a data store.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PublishDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Promotes the current DRAFT version of a data transformation profile to a new immutable published version. Also supports rollback by publishing from a previously published version.
 */
export const publishDataTransformationProfile: API.OperationMethod<
  PublishDataTransformationProfileRequest,
  PublishDataTransformationProfileResponse,
  PublishDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishDataTransformationProfileRequest,
  output: PublishDataTransformationProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type RestoreFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restore a backup-enabled data store to a point in time. Creates a new data store from the backup.
 */
export const restoreFHIRDatastore: API.OperationMethod<
  RestoreFHIRDatastoreRequest,
  RestoreFHIRDatastoreResponse,
  RestoreFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreFHIRDatastoreRequest,
  output: RestoreFHIRDatastoreResponse,
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
  operationName: "RestoreFHIRDatastore",
}));

export type StartDataTransformationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous data transformation job that converts source files from Amazon Simple Storage Service (Amazon S3) and writes the output to Amazon S3 or HealthLake.
 */
export const startDataTransformationJob: API.OperationMethod<
  StartDataTransformationJobRequest,
  StartDataTransformationJobResponse,
  StartDataTransformationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataTransformationJobRequest,
  output: StartDataTransformationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataTransformationJob",
  endpointHostPrefix: "datatransformation.",
}));

export type StartFHIRExportJobError =
  | AccessDeniedException
  | FailedDependencyException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start a FHIR export job.
 */
export const startFHIRExportJob: API.OperationMethod<
  StartFHIRExportJobRequest,
  StartFHIRExportJobResponse,
  StartFHIRExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFHIRExportJobRequest,
  output: StartFHIRExportJobResponse,
  errors: [
    AccessDeniedException,
    FailedDependencyException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFHIRExportJob",
}));

export type StartFHIRImportJobError =
  | AccessDeniedException
  | FailedDependencyException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start importing bulk FHIR data into an ACTIVE data store. The import job imports FHIR data found in the `InputDataConfig` object and stores processing results in the `JobOutputDataConfig` object.
 */
export const startFHIRImportJob: API.OperationMethod<
  StartFHIRImportJobRequest,
  StartFHIRImportJobResponse,
  StartFHIRImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFHIRImportJobRequest,
  output: StartFHIRImportJobResponse,
  errors: [
    AccessDeniedException,
    FailedDependencyException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFHIRImportJob",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Add a user-specifed key and value tag to a data store.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove a user-specifed key and value tag from a data store.
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

export type UpdateDataTransformationProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the DRAFT version (version 0) of a data transformation profile with new profile content. The update replaces all existing DRAFT content.
 */
export const updateDataTransformationProfile: API.OperationMethod<
  UpdateDataTransformationProfileRequest,
  UpdateDataTransformationProfileResponse,
  UpdateDataTransformationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataTransformationProfileRequest,
  output: UpdateDataTransformationProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataTransformationProfile",
  endpointHostPrefix: "datatransformation.",
}));

export type UpdateFHIRDatastoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the properties of a FHIR-enabled data store.
 */
export const updateFHIRDatastore: API.OperationMethod<
  UpdateFHIRDatastoreRequest,
  UpdateFHIRDatastoreResponse,
  UpdateFHIRDatastoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFHIRDatastoreRequest,
  output: UpdateFHIRDatastoreResponse,
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
  operationName: "UpdateFHIRDatastore",
}));

export type UpdateProfileWithAgentError =
  | AccessDeniedException
  | AgentMessageOutOfContextException
  | ConversationNotFoundException
  | InternalServerException
  | NotImplementedOperationException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | UnsupportedMIMETypeException
  | ValidationException
  | CommonErrors;
/**
 * Updates a data transformation profile using chat-based interaction with an agent. Supports multi-turn conversations for iteratively customizing profiles.
 */
export const updateProfileWithAgent: API.OperationMethod<
  UpdateProfileWithAgentRequest,
  UpdateProfileWithAgentResponse,
  UpdateProfileWithAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProfileWithAgentRequest,
  output: UpdateProfileWithAgentResponse,
  errors: [
    AccessDeniedException,
    AgentMessageOutOfContextException,
    ConversationNotFoundException,
    InternalServerException,
    NotImplementedOperationException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    UnsupportedMIMETypeException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileWithAgent",
  endpointHostPrefix: "datatransformation.",
}));
