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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export type DatastoreName = string;
export type FHIRVersion = "R4" | (string & {});
export const FHIRVersion = /*@__PURE__*/ S.String;

export type CmkType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export const CmkType = /*@__PURE__*/ S.String;

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
export const PreloadDataType = /*@__PURE__*/ S.String;

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
export const AuthorizationStrategy = /*@__PURE__*/ S.String;

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
export const AnalyticsStatus = /*@__PURE__*/ S.String;

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
  | "DISABLED"
  | "ENABLING"
  | "DISABLING"
  | (string & {});
export const NlpStatus = /*@__PURE__*/ S.String;

export interface NlpConfiguration {
  Status?: NlpStatus;
}
export const NlpConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(NlpStatus) }),
).annotate({
  identifier: "NlpConfiguration",
}) as any as S.Schema<NlpConfiguration>;
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
export const DatastoreStatus = /*@__PURE__*/ S.String;

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
export type ErrorMessage = string;
export type ErrorCategory =
  | "RETRYABLE_ERROR"
  | "NON_RETRYABLE_ERROR"
  | (string & {});
export const ErrorCategory = /*@__PURE__*/ S.String;

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
export const JobStatus = /*@__PURE__*/ S.String;

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
  Throughput?: number;
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
    Throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobProgressReport",
}) as any as S.Schema<JobProgressReport>;
export type ValidationLevel =
  | "strict"
  | "structure-only"
  | "minimal"
  | (string & {});
export const ValidationLevel = /*@__PURE__*/ S.String;

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
export interface StartFHIRImportJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  JobOutputDataConfig: OutputDataConfig;
  DatastoreId: string;
  DataAccessRoleArn: string;
  ClientToken?: string;
  ValidationLevel?: ValidationLevel;
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
export interface UpdateFHIRDatastoreRequest {
  DatastoreId: string;
  DatastoreName?: string;
  NlpConfiguration?: NlpConfiguration;
  AnalyticsConfiguration?: AnalyticsConfiguration;
  ProfileConfiguration?: ProfileConfiguration;
  IdentityProviderConfiguration?: IdentityProviderConfiguration;
}
export const UpdateFHIRDatastoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatastoreId: S.String,
    DatastoreName: S.optional(S.String),
    NlpConfiguration: S.optional(NlpConfiguration),
    AnalyticsConfiguration: S.optional(AnalyticsConfiguration),
    ProfileConfiguration: S.optional(ProfileConfiguration),
    IdentityProviderConfiguration: S.optional(IdentityProviderConfiguration),
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

export type ListFHIRDatastoresError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all FHIR-enabled data stores in a user’s account, regardless of data store
 * status.
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

export type StartFHIRExportJobError =
  | AccessDeniedException
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start importing bulk FHIR data into an ACTIVE data store. The import job imports FHIR
 * data found in the `InputDataConfig` object and stores processing results in the
 * `JobOutputDataConfig` object.
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
