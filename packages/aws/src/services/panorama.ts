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
  sdkId: "Panorama",
  serviceShapeName: "OmniCloudServiceLambda",
});
const auth = T.AwsAuthSigv4({ name: "panorama" });
const ver = T.ServiceVersion("2019-07-24");
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
              `https://panorama-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://panorama-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://panorama.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://panorama.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      ErrorId: S.optional(S.String),
      ErrorArguments: S.optional(
        S.suspend(() => ConflictExceptionErrorArgumentList).annotate({
          identifier: "ConflictExceptionErrorArgumentList",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      QuotaCode: S.String,
      ServiceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(S.String),
      ErrorId: S.optional(S.String),
      ErrorArguments: S.optional(
        S.suspend(() => ValidationExceptionErrorArgumentList).annotate({
          identifier: "ValidationExceptionErrorArgumentList",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationInstanceName = string;
export type Description = string;
export type ManifestPayloadData = string;
export type ManifestPayload = { PayloadData: string };
export const ManifestPayload = /*@__PURE__*/ S.Union([
  S.Struct({ PayloadData: S.String }),
]);
export type ManifestOverridesPayloadData = string;
export type ManifestOverridesPayload = { PayloadData: string };
export const ManifestOverridesPayload = /*@__PURE__*/ S.Union([
  S.Struct({ PayloadData: S.String }),
]);
export type ApplicationInstanceId = string;
export type RuntimeRoleArn = string;
export type DefaultRuntimeContextDevice = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateApplicationInstanceRequest {
  Name?: string;
  Description?: string;
  ManifestPayload: ManifestPayload;
  ManifestOverridesPayload?: ManifestOverridesPayload;
  ApplicationInstanceIdToReplace?: string;
  RuntimeRoleArn?: string;
  DefaultRuntimeContextDevice: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateApplicationInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ManifestPayload: ManifestPayload,
    ManifestOverridesPayload: S.optional(ManifestOverridesPayload),
    ApplicationInstanceIdToReplace: S.optional(S.String),
    RuntimeRoleArn: S.optional(S.String),
    DefaultRuntimeContextDevice: S.String,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/application-instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationInstanceRequest",
}) as any as S.Schema<CreateApplicationInstanceRequest>;
export interface CreateApplicationInstanceResponse {
  ApplicationInstanceId: string;
}
export const CreateApplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationInstanceId: S.String }),
).annotate({
  identifier: "CreateApplicationInstanceResponse",
}) as any as S.Schema<CreateApplicationInstanceResponse>;
export type DeviceId = string;
export type DeviceIdList = string[];
export const DeviceIdList = /*@__PURE__*/ S.Array(S.String);
export type ImageVersion = string;
export interface OTAJobConfig {
  ImageVersion: string;
  AllowMajorVersionUpdate?: boolean;
}
export const OTAJobConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageVersion: S.String,
    AllowMajorVersionUpdate: S.optional(S.Boolean),
  }),
).annotate({ identifier: "OTAJobConfig" }) as any as S.Schema<OTAJobConfig>;
export interface DeviceJobConfig {
  OTAJobConfig?: OTAJobConfig;
}
export const DeviceJobConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OTAJobConfig: S.optional(OTAJobConfig) }),
).annotate({
  identifier: "DeviceJobConfig",
}) as any as S.Schema<DeviceJobConfig>;
export type JobType = string;
export interface CreateJobForDevicesRequest {
  DeviceIds: string[];
  DeviceJobConfig?: DeviceJobConfig;
  JobType: string;
}
export const CreateJobForDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceIds: DeviceIdList,
    DeviceJobConfig: S.optional(DeviceJobConfig),
    JobType: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobForDevicesRequest",
}) as any as S.Schema<CreateJobForDevicesRequest>;
export type JobId = string;
export interface Job {
  JobId?: string;
  DeviceId?: string;
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), DeviceId: S.optional(S.String) }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobList = Job[];
export const JobList = /*@__PURE__*/ S.Array(Job);
export interface CreateJobForDevicesResponse {
  Jobs: Job[];
}
export const CreateJobForDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Jobs: JobList }),
).annotate({
  identifier: "CreateJobForDevicesResponse",
}) as any as S.Schema<CreateJobForDevicesResponse>;
export type TemplateType = string;
export type NodePackageName = string;
export type NodePackageVersion = string;
export type NodeName = string;
export type TemplateKey = string;
export type TemplateValue = string | redacted.Redacted<string>;
export type TemplateParametersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const TemplateParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type JobResourceType = string;
export interface JobResourceTags {
  ResourceType: string;
  Tags: { [key: string]: string | undefined };
}
export const JobResourceTags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceType: S.String, Tags: TagMap }),
).annotate({
  identifier: "JobResourceTags",
}) as any as S.Schema<JobResourceTags>;
export type JobTagsList = JobResourceTags[];
export const JobTagsList = /*@__PURE__*/ S.Array(JobResourceTags);
export interface CreateNodeFromTemplateJobRequest {
  TemplateType: string;
  OutputPackageName: string;
  OutputPackageVersion: string;
  NodeName: string;
  NodeDescription?: string;
  TemplateParameters: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  JobTags?: JobResourceTags[];
}
export const CreateNodeFromTemplateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateType: S.String,
    OutputPackageName: S.String,
    OutputPackageVersion: S.String,
    NodeName: S.String,
    NodeDescription: S.optional(S.String),
    TemplateParameters: TemplateParametersMap,
    JobTags: S.optional(JobTagsList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/packages/template-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNodeFromTemplateJobRequest",
}) as any as S.Schema<CreateNodeFromTemplateJobRequest>;
export interface CreateNodeFromTemplateJobResponse {
  JobId: string;
}
export const CreateNodeFromTemplateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }),
).annotate({
  identifier: "CreateNodeFromTemplateJobResponse",
}) as any as S.Schema<CreateNodeFromTemplateJobResponse>;
export interface CreatePackageRequest {
  PackageName: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageName: S.String, Tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageRequest",
}) as any as S.Schema<CreatePackageRequest>;
export type NodePackageId = string;
export type NodePackageArn = string;
export type Bucket = string;
export interface StorageLocation {
  Bucket: string;
  RepoPrefixLocation: string;
  GeneratedPrefixLocation: string;
  BinaryPrefixLocation: string;
  ManifestPrefixLocation: string;
}
export const StorageLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    RepoPrefixLocation: S.String,
    GeneratedPrefixLocation: S.String,
    BinaryPrefixLocation: S.String,
    ManifestPrefixLocation: S.String,
  }),
).annotate({
  identifier: "StorageLocation",
}) as any as S.Schema<StorageLocation>;
export interface CreatePackageResponse {
  PackageId?: string;
  Arn?: string;
  StorageLocation: StorageLocation;
}
export const CreatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageId: S.optional(S.String),
    Arn: S.optional(S.String),
    StorageLocation: StorageLocation,
  }),
).annotate({
  identifier: "CreatePackageResponse",
}) as any as S.Schema<CreatePackageResponse>;
export type PackageImportJobType = string;
export type Region = string;
export type BucketName = string;
export type ObjectKey = string;
export interface S3Location {
  Region?: string;
  BucketName: string;
  ObjectKey: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    BucketName: S.String,
    ObjectKey: S.String,
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface PackageVersionInputConfig {
  S3Location: S3Location;
}
export const PackageVersionInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Location: S3Location }),
).annotate({
  identifier: "PackageVersionInputConfig",
}) as any as S.Schema<PackageVersionInputConfig>;
export interface PackageImportJobInputConfig {
  PackageVersionInputConfig?: PackageVersionInputConfig;
}
export const PackageImportJobInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageVersionInputConfig: S.optional(PackageVersionInputConfig),
  }),
).annotate({
  identifier: "PackageImportJobInputConfig",
}) as any as S.Schema<PackageImportJobInputConfig>;
export type MarkLatestPatch = boolean;
export interface PackageVersionOutputConfig {
  PackageName: string;
  PackageVersion: string;
  MarkLatest?: boolean;
}
export const PackageVersionOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageName: S.String,
    PackageVersion: S.String,
    MarkLatest: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PackageVersionOutputConfig",
}) as any as S.Schema<PackageVersionOutputConfig>;
export interface PackageImportJobOutputConfig {
  PackageVersionOutputConfig?: PackageVersionOutputConfig;
}
export const PackageImportJobOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageVersionOutputConfig: S.optional(PackageVersionOutputConfig),
  }),
).annotate({
  identifier: "PackageImportJobOutputConfig",
}) as any as S.Schema<PackageImportJobOutputConfig>;
export type ClientToken = string;
export interface CreatePackageImportJobRequest {
  JobType: string;
  InputConfig: PackageImportJobInputConfig;
  OutputConfig: PackageImportJobOutputConfig;
  ClientToken: string;
  JobTags?: JobResourceTags[];
}
export const CreatePackageImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobType: S.String,
    InputConfig: PackageImportJobInputConfig,
    OutputConfig: PackageImportJobOutputConfig,
    ClientToken: S.String,
    JobTags: S.optional(JobTagsList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/packages/import-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageImportJobRequest",
}) as any as S.Schema<CreatePackageImportJobRequest>;
export interface CreatePackageImportJobResponse {
  JobId: string;
}
export const CreatePackageImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }),
).annotate({
  identifier: "CreatePackageImportJobResponse",
}) as any as S.Schema<CreatePackageImportJobResponse>;
export interface DeleteDeviceRequest {
  DeviceId: string;
}
export const DeleteDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceId: S.String.pipe(T.HttpLabel("DeviceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/devices/{DeviceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeviceRequest",
}) as any as S.Schema<DeleteDeviceRequest>;
export interface DeleteDeviceResponse {
  DeviceId?: string;
}
export const DeleteDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteDeviceResponse",
}) as any as S.Schema<DeleteDeviceResponse>;
export interface DeletePackageRequest {
  PackageId: string;
  ForceDelete?: boolean;
}
export const DeletePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageId: S.String.pipe(T.HttpLabel("PackageId")),
    ForceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("ForceDelete")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/packages/{PackageId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageRequest",
}) as any as S.Schema<DeletePackageRequest>;
export interface DeletePackageResponse {}
export const DeletePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackageResponse",
}) as any as S.Schema<DeletePackageResponse>;
export type PackageOwnerAccount = string;
export type NodePackagePatchVersion = string;
export interface DeregisterPackageVersionRequest {
  OwnerAccount?: string;
  PackageId: string;
  PackageVersion: string;
  PatchVersion: string;
  UpdatedLatestPatchVersion?: string;
}
export const DeregisterPackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerAccount: S.optional(S.String).pipe(T.HttpQuery("OwnerAccount")),
    PackageId: S.String.pipe(T.HttpLabel("PackageId")),
    PackageVersion: S.String.pipe(T.HttpLabel("PackageVersion")),
    PatchVersion: S.String.pipe(T.HttpLabel("PatchVersion")),
    UpdatedLatestPatchVersion: S.optional(S.String).pipe(
      T.HttpQuery("UpdatedLatestPatchVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/packages/{PackageId}/versions/{PackageVersion}/patch/{PatchVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterPackageVersionRequest",
}) as any as S.Schema<DeregisterPackageVersionRequest>;
export interface DeregisterPackageVersionResponse {}
export const DeregisterPackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterPackageVersionResponse",
}) as any as S.Schema<DeregisterPackageVersionResponse>;
export interface DescribeApplicationInstanceRequest {
  ApplicationInstanceId: string;
}
export const DescribeApplicationInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationInstanceId: S.String.pipe(T.HttpLabel("ApplicationInstanceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/application-instances/{ApplicationInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationInstanceRequest",
}) as any as S.Schema<DescribeApplicationInstanceRequest>;
export type DeviceName = string;
export type ApplicationInstanceStatus = string;
export type ApplicationInstanceHealthStatus = string;
export type ApplicationInstanceStatusDescription = string;
export type ApplicationInstanceArn = string;
export type DesiredState = string;
export type RuntimeContextName = string;
export type DeviceReportedStatus = string;
export interface ReportedRuntimeContextState {
  DesiredState: string;
  RuntimeContextName: string;
  DeviceReportedStatus: string;
  DeviceReportedTime: Date;
}
export const ReportedRuntimeContextState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredState: S.String,
    RuntimeContextName: S.String,
    DeviceReportedStatus: S.String,
    DeviceReportedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ReportedRuntimeContextState",
}) as any as S.Schema<ReportedRuntimeContextState>;
export type ReportedRuntimeContextStates = ReportedRuntimeContextState[];
export const ReportedRuntimeContextStates = /*@__PURE__*/ S.Array(
  ReportedRuntimeContextState,
);
export interface DescribeApplicationInstanceResponse {
  Name?: string;
  Description?: string;
  DefaultRuntimeContextDevice?: string;
  DefaultRuntimeContextDeviceName?: string;
  ApplicationInstanceIdToReplace?: string;
  RuntimeRoleArn?: string;
  Status?: string;
  HealthStatus?: string;
  StatusDescription?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
  ApplicationInstanceId?: string;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  RuntimeContextStates?: ReportedRuntimeContextState[];
}
export const DescribeApplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DefaultRuntimeContextDevice: S.optional(S.String),
    DefaultRuntimeContextDeviceName: S.optional(S.String),
    ApplicationInstanceIdToReplace: S.optional(S.String),
    RuntimeRoleArn: S.optional(S.String),
    Status: S.optional(S.String),
    HealthStatus: S.optional(S.String),
    StatusDescription: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ApplicationInstanceId: S.optional(S.String),
    Arn: S.optional(S.String),
    Tags: S.optional(TagMap),
    RuntimeContextStates: S.optional(ReportedRuntimeContextStates),
  }),
).annotate({
  identifier: "DescribeApplicationInstanceResponse",
}) as any as S.Schema<DescribeApplicationInstanceResponse>;
export interface DescribeApplicationInstanceDetailsRequest {
  ApplicationInstanceId: string;
}
export const DescribeApplicationInstanceDetailsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationInstanceId: S.String.pipe(
        T.HttpLabel("ApplicationInstanceId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/application-instances/{ApplicationInstanceId}/details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeApplicationInstanceDetailsRequest",
  }) as any as S.Schema<DescribeApplicationInstanceDetailsRequest>;
export interface DescribeApplicationInstanceDetailsResponse {
  Name?: string;
  Description?: string;
  DefaultRuntimeContextDevice?: string;
  ManifestPayload?: ManifestPayload;
  ManifestOverridesPayload?: ManifestOverridesPayload;
  ApplicationInstanceIdToReplace?: string;
  CreatedTime?: Date;
  ApplicationInstanceId?: string;
}
export const DescribeApplicationInstanceDetailsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(S.String),
      Description: S.optional(S.String),
      DefaultRuntimeContextDevice: S.optional(S.String),
      ManifestPayload: S.optional(ManifestPayload),
      ManifestOverridesPayload: S.optional(ManifestOverridesPayload),
      ApplicationInstanceIdToReplace: S.optional(S.String),
      CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      ApplicationInstanceId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeApplicationInstanceDetailsResponse",
  }) as any as S.Schema<DescribeApplicationInstanceDetailsResponse>;
export interface DescribeDeviceRequest {
  DeviceId: string;
}
export const DescribeDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceId: S.String.pipe(T.HttpLabel("DeviceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/devices/{DeviceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceRequest",
}) as any as S.Schema<DescribeDeviceRequest>;
export type DeviceArn = string;
export type DeviceType = string;
export type DeviceConnectionStatus = string;
export type CreatedTime = Date;
export type DeviceStatus = string;
export type LatestSoftware = string;
export type CurrentSoftware = string;
export type DeviceSerialNumber = string;
export type ConnectionType = string;
export type IpAddress = string;
export type Mask = string;
export type Dns = string;
export type DnsList = string[];
export const DnsList = /*@__PURE__*/ S.Array(S.String);
export type DefaultGateway = string;
export interface StaticIpConnectionInfo {
  IpAddress: string;
  Mask: string;
  Dns: string[];
  DefaultGateway: string;
}
export const StaticIpConnectionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.String,
    Mask: S.String,
    Dns: DnsList,
    DefaultGateway: S.String,
  }),
).annotate({
  identifier: "StaticIpConnectionInfo",
}) as any as S.Schema<StaticIpConnectionInfo>;
export interface EthernetPayload {
  ConnectionType: string;
  StaticIpConnectionInfo?: StaticIpConnectionInfo;
}
export const EthernetPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionType: S.String,
    StaticIpConnectionInfo: S.optional(StaticIpConnectionInfo),
  }),
).annotate({
  identifier: "EthernetPayload",
}) as any as S.Schema<EthernetPayload>;
export type IpAddressOrServerName = string;
export type NtpServerList = string[];
export const NtpServerList = /*@__PURE__*/ S.Array(S.String);
export interface NtpPayload {
  NtpServers: string[];
}
export const NtpPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NtpServers: NtpServerList }),
).annotate({ identifier: "NtpPayload" }) as any as S.Schema<NtpPayload>;
export interface NetworkPayload {
  Ethernet0?: EthernetPayload;
  Ethernet1?: EthernetPayload;
  Ntp?: NtpPayload;
}
export const NetworkPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ethernet0: S.optional(EthernetPayload),
    Ethernet1: S.optional(EthernetPayload),
    Ntp: S.optional(NtpPayload),
  }),
).annotate({ identifier: "NetworkPayload" }) as any as S.Schema<NetworkPayload>;
export type NetworkConnectionStatus = string;
export type HwAddress = string;
export interface EthernetStatus {
  IpAddress?: string;
  ConnectionStatus?: string;
  HwAddress?: string;
}
export const EthernetStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    ConnectionStatus: S.optional(S.String),
    HwAddress: S.optional(S.String),
  }),
).annotate({ identifier: "EthernetStatus" }) as any as S.Schema<EthernetStatus>;
export type NtpServerName = string;
export interface NtpStatus {
  ConnectionStatus?: string;
  IpAddress?: string;
  NtpServerName?: string;
}
export const NtpStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionStatus: S.optional(S.String),
    IpAddress: S.optional(S.String),
    NtpServerName: S.optional(S.String),
  }),
).annotate({ identifier: "NtpStatus" }) as any as S.Schema<NtpStatus>;
export type LastUpdatedTime = Date;
export interface NetworkStatus {
  Ethernet0Status?: EthernetStatus;
  Ethernet1Status?: EthernetStatus;
  NtpStatus?: NtpStatus;
  LastUpdatedTime?: Date;
}
export const NetworkStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ethernet0Status: S.optional(EthernetStatus),
    Ethernet1Status: S.optional(EthernetStatus),
    NtpStatus: S.optional(NtpStatus),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "NetworkStatus" }) as any as S.Schema<NetworkStatus>;
export type LeaseExpirationTime = Date;
export type Version = string;
export interface AlternateSoftwareMetadata {
  Version?: string;
}
export const AlternateSoftwareMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }),
).annotate({
  identifier: "AlternateSoftwareMetadata",
}) as any as S.Schema<AlternateSoftwareMetadata>;
export type AlternateSoftwares = AlternateSoftwareMetadata[];
export const AlternateSoftwares = /*@__PURE__*/ S.Array(
  AlternateSoftwareMetadata,
);
export type LatestAlternateSoftware = string;
export type DeviceBrand = string;
export type UpdateProgress = string;
export interface LatestDeviceJob {
  ImageVersion?: string;
  Status?: string;
  JobType?: string;
}
export const LatestDeviceJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageVersion: S.optional(S.String),
    Status: S.optional(S.String),
    JobType: S.optional(S.String),
  }),
).annotate({
  identifier: "LatestDeviceJob",
}) as any as S.Schema<LatestDeviceJob>;
export type DeviceAggregatedStatus = string;
export interface DescribeDeviceResponse {
  DeviceId?: string;
  Name?: string;
  Arn?: string;
  Description?: string;
  Type?: string;
  DeviceConnectionStatus?: string;
  CreatedTime?: Date;
  ProvisioningStatus?: string;
  LatestSoftware?: string;
  CurrentSoftware?: string;
  SerialNumber?: string;
  Tags?: { [key: string]: string | undefined };
  NetworkingConfiguration?: NetworkPayload;
  CurrentNetworkingStatus?: NetworkStatus;
  LeaseExpirationTime?: Date;
  AlternateSoftwares?: AlternateSoftwareMetadata[];
  LatestAlternateSoftware?: string;
  Brand?: string;
  LatestDeviceJob?: LatestDeviceJob;
  DeviceAggregatedStatus?: string;
}
export const DescribeDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String),
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(S.String),
    DeviceConnectionStatus: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProvisioningStatus: S.optional(S.String),
    LatestSoftware: S.optional(S.String),
    CurrentSoftware: S.optional(S.String),
    SerialNumber: S.optional(S.String),
    Tags: S.optional(TagMap),
    NetworkingConfiguration: S.optional(NetworkPayload),
    CurrentNetworkingStatus: S.optional(NetworkStatus),
    LeaseExpirationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AlternateSoftwares: S.optional(AlternateSoftwares),
    LatestAlternateSoftware: S.optional(S.String),
    Brand: S.optional(S.String),
    LatestDeviceJob: S.optional(LatestDeviceJob),
    DeviceAggregatedStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDeviceResponse",
}) as any as S.Schema<DescribeDeviceResponse>;
export interface DescribeDeviceJobRequest {
  JobId: string;
}
export const DescribeDeviceJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceJobRequest",
}) as any as S.Schema<DescribeDeviceJobRequest>;
export type UpdateCreatedTime = Date;
export interface DescribeDeviceJobResponse {
  JobId?: string;
  DeviceId?: string;
  DeviceArn?: string;
  DeviceName?: string;
  DeviceType?: string;
  ImageVersion?: string;
  Status?: string;
  CreatedTime?: Date;
  JobType?: string;
}
export const DescribeDeviceJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    DeviceId: S.optional(S.String),
    DeviceArn: S.optional(S.String),
    DeviceName: S.optional(S.String),
    DeviceType: S.optional(S.String),
    ImageVersion: S.optional(S.String),
    Status: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobType: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDeviceJobResponse",
}) as any as S.Schema<DescribeDeviceJobResponse>;
export type NodeId = string;
export interface DescribeNodeRequest {
  NodeId: string;
  OwnerAccount?: string;
}
export const DescribeNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
    OwnerAccount: S.optional(S.String).pipe(T.HttpQuery("OwnerAccount")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/nodes/{NodeId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeNodeRequest",
}) as any as S.Schema<DescribeNodeRequest>;
export type NodeCategory = string;
export type PortName = string;
export type PortType = string;
export type PortDefaultValue = string;
export type MaxConnections = number;
export interface NodeInputPort {
  Name?: string;
  Description?: string;
  Type?: string;
  DefaultValue?: string;
  MaxConnections?: number;
}
export const NodeInputPort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    MaxConnections: S.optional(S.Number),
  }),
).annotate({ identifier: "NodeInputPort" }) as any as S.Schema<NodeInputPort>;
export type InputPortList = NodeInputPort[];
export const InputPortList = /*@__PURE__*/ S.Array(NodeInputPort);
export interface NodeOutputPort {
  Name?: string;
  Description?: string;
  Type?: string;
}
export const NodeOutputPort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "NodeOutputPort" }) as any as S.Schema<NodeOutputPort>;
export type OutputPortList = NodeOutputPort[];
export const OutputPortList = /*@__PURE__*/ S.Array(NodeOutputPort);
export interface NodeInterface {
  Inputs: NodeInputPort[];
  Outputs: NodeOutputPort[];
}
export const NodeInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Inputs: InputPortList, Outputs: OutputPortList }),
).annotate({ identifier: "NodeInterface" }) as any as S.Schema<NodeInterface>;
export type NodeAssetName = string;
export interface DescribeNodeResponse {
  NodeId: string;
  Name: string;
  Category: string;
  OwnerAccount: string;
  PackageName: string;
  PackageId: string;
  PackageArn?: string;
  PackageVersion: string;
  PatchVersion: string;
  NodeInterface: NodeInterface;
  AssetName?: string;
  Description: string;
  CreatedTime: Date;
  LastUpdatedTime: Date;
}
export const DescribeNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeId: S.String,
    Name: S.String,
    Category: S.String,
    OwnerAccount: S.String,
    PackageName: S.String,
    PackageId: S.String,
    PackageArn: S.optional(S.String),
    PackageVersion: S.String,
    PatchVersion: S.String,
    NodeInterface: NodeInterface,
    AssetName: S.optional(S.String),
    Description: S.String,
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeNodeResponse",
}) as any as S.Schema<DescribeNodeResponse>;
export interface DescribeNodeFromTemplateJobRequest {
  JobId: string;
}
export const DescribeNodeFromTemplateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/template-job/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeNodeFromTemplateJobRequest",
}) as any as S.Schema<DescribeNodeFromTemplateJobRequest>;
export type NodeFromTemplateJobStatus = string;
export type NodeFromTemplateJobStatusMessage = string;
export interface DescribeNodeFromTemplateJobResponse {
  JobId: string;
  Status: string;
  StatusMessage: string;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  OutputPackageName: string;
  OutputPackageVersion: string;
  NodeName: string;
  NodeDescription?: string;
  TemplateType: string;
  TemplateParameters: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  JobTags?: JobResourceTags[];
}
export const DescribeNodeFromTemplateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    Status: S.String,
    StatusMessage: S.String,
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    OutputPackageName: S.String,
    OutputPackageVersion: S.String,
    NodeName: S.String,
    NodeDescription: S.optional(S.String),
    TemplateType: S.String,
    TemplateParameters: TemplateParametersMap,
    JobTags: S.optional(JobTagsList),
  }),
).annotate({
  identifier: "DescribeNodeFromTemplateJobResponse",
}) as any as S.Schema<DescribeNodeFromTemplateJobResponse>;
export interface DescribePackageRequest {
  PackageId: string;
}
export const DescribePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PackageId: S.String.pipe(T.HttpLabel("PackageId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/metadata/{PackageId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageRequest",
}) as any as S.Schema<DescribePackageRequest>;
export type PrincipalArn = string;
export type PrincipalArnsList = string[];
export const PrincipalArnsList = /*@__PURE__*/ S.Array(S.String);
export interface DescribePackageResponse {
  PackageId: string;
  PackageName: string;
  Arn: string;
  StorageLocation: StorageLocation;
  ReadAccessPrincipalArns?: string[];
  WriteAccessPrincipalArns?: string[];
  CreatedTime: Date;
  Tags: { [key: string]: string | undefined };
}
export const DescribePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageId: S.String,
    PackageName: S.String,
    Arn: S.String,
    StorageLocation: StorageLocation,
    ReadAccessPrincipalArns: S.optional(PrincipalArnsList),
    WriteAccessPrincipalArns: S.optional(PrincipalArnsList),
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Tags: TagMap,
  }),
).annotate({
  identifier: "DescribePackageResponse",
}) as any as S.Schema<DescribePackageResponse>;
export interface DescribePackageImportJobRequest {
  JobId: string;
}
export const DescribePackageImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/import-jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageImportJobRequest",
}) as any as S.Schema<DescribePackageImportJobRequest>;
export interface OutPutS3Location {
  BucketName: string;
  ObjectKey: string;
}
export const OutPutS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketName: S.String, ObjectKey: S.String }),
).annotate({
  identifier: "OutPutS3Location",
}) as any as S.Schema<OutPutS3Location>;
export interface PackageImportJobOutput {
  PackageId: string;
  PackageVersion: string;
  PatchVersion: string;
  OutputS3Location: OutPutS3Location;
}
export const PackageImportJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageId: S.String,
    PackageVersion: S.String,
    PatchVersion: S.String,
    OutputS3Location: OutPutS3Location,
  }),
).annotate({
  identifier: "PackageImportJobOutput",
}) as any as S.Schema<PackageImportJobOutput>;
export type PackageImportJobStatus = string;
export type PackageImportJobStatusMessage = string;
export interface DescribePackageImportJobResponse {
  JobId: string;
  ClientToken?: string;
  JobType: string;
  InputConfig: PackageImportJobInputConfig;
  OutputConfig: PackageImportJobOutputConfig;
  Output: PackageImportJobOutput;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  Status: string;
  StatusMessage: string;
  JobTags?: JobResourceTags[];
}
export const DescribePackageImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    ClientToken: S.optional(S.String),
    JobType: S.String,
    InputConfig: PackageImportJobInputConfig,
    OutputConfig: PackageImportJobOutputConfig,
    Output: PackageImportJobOutput,
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: S.String,
    StatusMessage: S.String,
    JobTags: S.optional(JobTagsList),
  }),
).annotate({
  identifier: "DescribePackageImportJobResponse",
}) as any as S.Schema<DescribePackageImportJobResponse>;
export interface DescribePackageVersionRequest {
  OwnerAccount?: string;
  PackageId: string;
  PackageVersion: string;
  PatchVersion?: string;
}
export const DescribePackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerAccount: S.optional(S.String).pipe(T.HttpQuery("OwnerAccount")),
    PackageId: S.String.pipe(T.HttpLabel("PackageId")),
    PackageVersion: S.String.pipe(T.HttpLabel("PackageVersion")),
    PatchVersion: S.optional(S.String).pipe(T.HttpQuery("PatchVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/packages/metadata/{PackageId}/versions/{PackageVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackageVersionRequest",
}) as any as S.Schema<DescribePackageVersionRequest>;
export type PackageVersionStatus = string;
export type PackageVersionStatusDescription = string;
export interface DescribePackageVersionResponse {
  OwnerAccount?: string;
  PackageId: string;
  PackageArn?: string;
  PackageName: string;
  PackageVersion: string;
  PatchVersion: string;
  IsLatestPatch: boolean;
  Status: string;
  StatusDescription?: string;
  RegisteredTime?: Date;
}
export const DescribePackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerAccount: S.optional(S.String),
    PackageId: S.String,
    PackageArn: S.optional(S.String),
    PackageName: S.String,
    PackageVersion: S.String,
    PatchVersion: S.String,
    IsLatestPatch: S.Boolean,
    Status: S.String,
    StatusDescription: S.optional(S.String),
    RegisteredTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribePackageVersionResponse",
}) as any as S.Schema<DescribePackageVersionResponse>;
export type MaxSize25 = number;
export type NextToken = string;
export interface ListApplicationInstanceDependenciesRequest {
  ApplicationInstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationInstanceDependenciesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationInstanceId: S.String.pipe(
        T.HttpLabel("ApplicationInstanceId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/application-instances/{ApplicationInstanceId}/package-dependencies",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListApplicationInstanceDependenciesRequest",
  }) as any as S.Schema<ListApplicationInstanceDependenciesRequest>;
export interface PackageObject {
  Name: string;
  PackageVersion: string;
  PatchVersion: string;
}
export const PackageObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    PackageVersion: S.String,
    PatchVersion: S.String,
  }),
).annotate({ identifier: "PackageObject" }) as any as S.Schema<PackageObject>;
export type PackageObjects = PackageObject[];
export const PackageObjects = /*@__PURE__*/ S.Array(PackageObject);
export interface ListApplicationInstanceDependenciesResponse {
  PackageObjects?: PackageObject[];
  NextToken?: string;
}
export const ListApplicationInstanceDependenciesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PackageObjects: S.optional(PackageObjects),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListApplicationInstanceDependenciesResponse",
  }) as any as S.Schema<ListApplicationInstanceDependenciesResponse>;
export interface ListApplicationInstanceNodeInstancesRequest {
  ApplicationInstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationInstanceNodeInstancesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationInstanceId: S.String.pipe(
        T.HttpLabel("ApplicationInstanceId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/application-instances/{ApplicationInstanceId}/node-instances",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListApplicationInstanceNodeInstancesRequest",
  }) as any as S.Schema<ListApplicationInstanceNodeInstancesRequest>;
export type NodeInstanceId = string;
export type NodeInstanceStatus = string;
export interface NodeInstance {
  NodeInstanceId: string;
  NodeId?: string;
  PackageName?: string;
  PackageVersion?: string;
  PackagePatchVersion?: string;
  NodeName?: string;
  CurrentStatus: string;
}
export const NodeInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeInstanceId: S.String,
    NodeId: S.optional(S.String),
    PackageName: S.optional(S.String),
    PackageVersion: S.optional(S.String),
    PackagePatchVersion: S.optional(S.String),
    NodeName: S.optional(S.String),
    CurrentStatus: S.String,
  }),
).annotate({ identifier: "NodeInstance" }) as any as S.Schema<NodeInstance>;
export type NodeInstances = NodeInstance[];
export const NodeInstances = /*@__PURE__*/ S.Array(NodeInstance);
export interface ListApplicationInstanceNodeInstancesResponse {
  NodeInstances?: NodeInstance[];
  NextToken?: string;
}
export const ListApplicationInstanceNodeInstancesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NodeInstances: S.optional(NodeInstances),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListApplicationInstanceNodeInstancesResponse",
  }) as any as S.Schema<ListApplicationInstanceNodeInstancesResponse>;
export type StatusFilter = string;
export interface ListApplicationInstancesRequest {
  DeviceId?: string;
  StatusFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String).pipe(T.HttpQuery("deviceId")),
    StatusFilter: S.optional(S.String).pipe(T.HttpQuery("statusFilter")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/application-instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationInstancesRequest",
}) as any as S.Schema<ListApplicationInstancesRequest>;
export interface ApplicationInstance {
  Name?: string;
  ApplicationInstanceId?: string;
  DefaultRuntimeContextDevice?: string;
  DefaultRuntimeContextDeviceName?: string;
  Description?: string;
  Status?: string;
  HealthStatus?: string;
  StatusDescription?: string;
  CreatedTime?: Date;
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
  RuntimeContextStates?: ReportedRuntimeContextState[];
}
export const ApplicationInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ApplicationInstanceId: S.optional(S.String),
    DefaultRuntimeContextDevice: S.optional(S.String),
    DefaultRuntimeContextDeviceName: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(S.String),
    HealthStatus: S.optional(S.String),
    StatusDescription: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Arn: S.optional(S.String),
    Tags: S.optional(TagMap),
    RuntimeContextStates: S.optional(ReportedRuntimeContextStates),
  }),
).annotate({
  identifier: "ApplicationInstance",
}) as any as S.Schema<ApplicationInstance>;
export type ApplicationInstances = ApplicationInstance[];
export const ApplicationInstances = /*@__PURE__*/ S.Array(ApplicationInstance);
export interface ListApplicationInstancesResponse {
  ApplicationInstances?: ApplicationInstance[];
  NextToken?: string;
}
export const ListApplicationInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationInstances: S.optional(ApplicationInstances),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationInstancesResponse",
}) as any as S.Schema<ListApplicationInstancesResponse>;
export type ListDevicesSortBy = string;
export type SortOrder = string;
export type NameFilter = string;
export interface ListDevicesRequest {
  NextToken?: string;
  MaxResults?: number;
  SortBy?: string;
  SortOrder?: string;
  NameFilter?: string;
  DeviceAggregatedStatusFilter?: string;
}
export const ListDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    SortBy: S.optional(S.String).pipe(T.HttpQuery("SortBy")),
    SortOrder: S.optional(S.String).pipe(T.HttpQuery("SortOrder")),
    NameFilter: S.optional(S.String).pipe(T.HttpQuery("NameFilter")),
    DeviceAggregatedStatusFilter: S.optional(S.String).pipe(
      T.HttpQuery("DeviceAggregatedStatusFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicesRequest",
}) as any as S.Schema<ListDevicesRequest>;
export interface Device {
  DeviceId?: string;
  Name?: string;
  CreatedTime?: Date;
  ProvisioningStatus?: string;
  LastUpdatedTime?: Date;
  LeaseExpirationTime?: Date;
  Brand?: string;
  CurrentSoftware?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  LatestDeviceJob?: LatestDeviceJob;
  DeviceAggregatedStatus?: string;
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String),
    Name: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProvisioningStatus: S.optional(S.String),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LeaseExpirationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Brand: S.optional(S.String),
    CurrentSoftware: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    Type: S.optional(S.String),
    LatestDeviceJob: S.optional(LatestDeviceJob),
    DeviceAggregatedStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export type DeviceList = Device[];
export const DeviceList = /*@__PURE__*/ S.Array(Device);
export interface ListDevicesResponse {
  Devices: Device[];
  NextToken?: string;
}
export const ListDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Devices: DeviceList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDevicesResponse",
}) as any as S.Schema<ListDevicesResponse>;
export interface ListDevicesJobsRequest {
  DeviceId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDevicesJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String).pipe(T.HttpQuery("DeviceId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicesJobsRequest",
}) as any as S.Schema<ListDevicesJobsRequest>;
export interface DeviceJob {
  DeviceName?: string;
  DeviceId?: string;
  JobId?: string;
  CreatedTime?: Date;
  JobType?: string;
}
export const DeviceJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    DeviceId: S.optional(S.String),
    JobId: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobType: S.optional(S.String),
  }),
).annotate({ identifier: "DeviceJob" }) as any as S.Schema<DeviceJob>;
export type DeviceJobList = DeviceJob[];
export const DeviceJobList = /*@__PURE__*/ S.Array(DeviceJob);
export interface ListDevicesJobsResponse {
  DeviceJobs?: DeviceJob[];
  NextToken?: string;
}
export const ListDevicesJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceJobs: S.optional(DeviceJobList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevicesJobsResponse",
}) as any as S.Schema<ListDevicesJobsResponse>;
export interface ListNodeFromTemplateJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListNodeFromTemplateJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/template-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNodeFromTemplateJobsRequest",
}) as any as S.Schema<ListNodeFromTemplateJobsRequest>;
export interface NodeFromTemplateJob {
  JobId?: string;
  TemplateType?: string;
  Status?: string;
  StatusMessage?: string;
  CreatedTime?: Date;
  NodeName?: string;
}
export const NodeFromTemplateJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    TemplateType: S.optional(S.String),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NodeName: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeFromTemplateJob",
}) as any as S.Schema<NodeFromTemplateJob>;
export type NodeFromTemplateJobList = NodeFromTemplateJob[];
export const NodeFromTemplateJobList =
  /*@__PURE__*/ S.Array(NodeFromTemplateJob);
export interface ListNodeFromTemplateJobsResponse {
  NodeFromTemplateJobs: NodeFromTemplateJob[];
  NextToken?: string;
}
export const ListNodeFromTemplateJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeFromTemplateJobs: NodeFromTemplateJobList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNodeFromTemplateJobsResponse",
}) as any as S.Schema<ListNodeFromTemplateJobsResponse>;
export type Token = string;
export interface ListNodesRequest {
  Category?: string;
  OwnerAccount?: string;
  PackageName?: string;
  PackageVersion?: string;
  PatchVersion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String).pipe(T.HttpQuery("category")),
    OwnerAccount: S.optional(S.String).pipe(T.HttpQuery("ownerAccount")),
    PackageName: S.optional(S.String).pipe(T.HttpQuery("packageName")),
    PackageVersion: S.optional(S.String).pipe(T.HttpQuery("packageVersion")),
    PatchVersion: S.optional(S.String).pipe(T.HttpQuery("patchVersion")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNodesRequest",
}) as any as S.Schema<ListNodesRequest>;
export interface Node {
  NodeId: string;
  Name: string;
  Category: string;
  OwnerAccount?: string;
  PackageName: string;
  PackageId: string;
  PackageArn?: string;
  PackageVersion: string;
  PatchVersion: string;
  Description?: string;
  CreatedTime: Date;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeId: S.String,
    Name: S.String,
    Category: S.String,
    OwnerAccount: S.optional(S.String),
    PackageName: S.String,
    PackageId: S.String,
    PackageArn: S.optional(S.String),
    PackageVersion: S.String,
    PatchVersion: S.String,
    Description: S.optional(S.String),
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type NodesList = Node[];
export const NodesList = /*@__PURE__*/ S.Array(Node);
export interface ListNodesResponse {
  Nodes?: Node[];
  NextToken?: string;
}
export const ListNodesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Nodes: S.optional(NodesList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListNodesResponse",
}) as any as S.Schema<ListNodesResponse>;
export interface ListPackageImportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListPackageImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/import-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackageImportJobsRequest",
}) as any as S.Schema<ListPackageImportJobsRequest>;
export interface PackageImportJob {
  JobId?: string;
  JobType?: string;
  Status?: string;
  StatusMessage?: string;
  CreatedTime?: Date;
  LastUpdatedTime?: Date;
}
export const PackageImportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobType: S.optional(S.String),
    Status: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PackageImportJob",
}) as any as S.Schema<PackageImportJob>;
export type PackageImportJobList = PackageImportJob[];
export const PackageImportJobList = /*@__PURE__*/ S.Array(PackageImportJob);
export interface ListPackageImportJobsResponse {
  PackageImportJobs: PackageImportJob[];
  NextToken?: string;
}
export const ListPackageImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageImportJobs: PackageImportJobList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackageImportJobsResponse",
}) as any as S.Schema<ListPackageImportJobsResponse>;
export interface ListPackagesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagesRequest",
}) as any as S.Schema<ListPackagesRequest>;
export interface PackageListItem {
  PackageId?: string;
  PackageName?: string;
  Arn?: string;
  CreatedTime?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const PackageListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackageId: S.optional(S.String),
    PackageName: S.optional(S.String),
    Arn: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "PackageListItem",
}) as any as S.Schema<PackageListItem>;
export type PackageList = PackageListItem[];
export const PackageList = /*@__PURE__*/ S.Array(PackageListItem);
export interface ListPackagesResponse {
  Packages?: PackageListItem[];
  NextToken?: string;
}
export const ListPackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Packages: S.optional(PackageList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackagesResponse",
}) as any as S.Schema<ListPackagesResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ProvisionDeviceRequest {
  Name: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  NetworkingConfiguration?: NetworkPayload;
}
export const ProvisionDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    NetworkingConfiguration: S.optional(NetworkPayload),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ProvisionDeviceRequest",
}) as any as S.Schema<ProvisionDeviceRequest>;
export type Certificates = Uint8Array;
export type IotThingName = string;
export interface ProvisionDeviceResponse {
  DeviceId?: string;
  Arn: string;
  Status: string;
  Certificates?: Uint8Array;
  IotThingName?: string;
}
export const ProvisionDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String),
    Arn: S.String,
    Status: S.String,
    Certificates: S.optional(T.Blob),
    IotThingName: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionDeviceResponse",
}) as any as S.Schema<ProvisionDeviceResponse>;
export interface RegisterPackageVersionRequest {
  OwnerAccount?: string;
  PackageId: string;
  PackageVersion: string;
  PatchVersion: string;
  MarkLatest?: boolean;
}
export const RegisterPackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerAccount: S.optional(S.String),
    PackageId: S.String.pipe(T.HttpLabel("PackageId")),
    PackageVersion: S.String.pipe(T.HttpLabel("PackageVersion")),
    PatchVersion: S.String.pipe(T.HttpLabel("PatchVersion")),
    MarkLatest: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/packages/{PackageId}/versions/{PackageVersion}/patch/{PatchVersion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterPackageVersionRequest",
}) as any as S.Schema<RegisterPackageVersionRequest>;
export interface RegisterPackageVersionResponse {}
export const RegisterPackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterPackageVersionResponse",
}) as any as S.Schema<RegisterPackageVersionResponse>;
export interface RemoveApplicationInstanceRequest {
  ApplicationInstanceId: string;
}
export const RemoveApplicationInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationInstanceId: S.String.pipe(T.HttpLabel("ApplicationInstanceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/application-instances/{ApplicationInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveApplicationInstanceRequest",
}) as any as S.Schema<RemoveApplicationInstanceRequest>;
export interface RemoveApplicationInstanceResponse {}
export const RemoveApplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveApplicationInstanceResponse",
}) as any as S.Schema<RemoveApplicationInstanceResponse>;
export type NodeSignalValue = string;
export interface NodeSignal {
  NodeInstanceId: string;
  Signal: string;
}
export const NodeSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NodeInstanceId: S.String, Signal: S.String }),
).annotate({ identifier: "NodeSignal" }) as any as S.Schema<NodeSignal>;
export type NodeSignalList = NodeSignal[];
export const NodeSignalList = /*@__PURE__*/ S.Array(NodeSignal);
export interface SignalApplicationInstanceNodeInstancesRequest {
  ApplicationInstanceId: string;
  NodeSignals: NodeSignal[];
}
export const SignalApplicationInstanceNodeInstancesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationInstanceId: S.String.pipe(
        T.HttpLabel("ApplicationInstanceId"),
      ),
      NodeSignals: NodeSignalList,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/application-instances/{ApplicationInstanceId}/node-signals",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SignalApplicationInstanceNodeInstancesRequest",
  }) as any as S.Schema<SignalApplicationInstanceNodeInstancesRequest>;
export interface SignalApplicationInstanceNodeInstancesResponse {
  ApplicationInstanceId: string;
}
export const SignalApplicationInstanceNodeInstancesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ApplicationInstanceId: S.String }),
  ).annotate({
    identifier: "SignalApplicationInstanceNodeInstancesResponse",
  }) as any as S.Schema<SignalApplicationInstanceNodeInstancesResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateDeviceMetadataRequest {
  DeviceId: string;
  Description?: string;
}
export const UpdateDeviceMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/devices/{DeviceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeviceMetadataRequest",
}) as any as S.Schema<UpdateDeviceMetadataRequest>;
export interface UpdateDeviceMetadataResponse {
  DeviceId?: string;
}
export const UpdateDeviceMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateDeviceMetadataResponse",
}) as any as S.Schema<UpdateDeviceMetadataResponse>;
export type RetryAfterSeconds = number;
export type ValidationExceptionReason = string;
export interface ValidationExceptionErrorArgument {
  Name: string;
  Value: string;
}
export const ValidationExceptionErrorArgument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "ValidationExceptionErrorArgument",
}) as any as S.Schema<ValidationExceptionErrorArgument>;
export type ValidationExceptionErrorArgumentList =
  ValidationExceptionErrorArgument[];
export const ValidationExceptionErrorArgumentList = /*@__PURE__*/ S.Array(
  ValidationExceptionErrorArgument,
);
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export interface ConflictExceptionErrorArgument {
  Name: string;
  Value: string;
}
export const ConflictExceptionErrorArgument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "ConflictExceptionErrorArgument",
}) as any as S.Schema<ConflictExceptionErrorArgument>;
export type ConflictExceptionErrorArgumentList =
  ConflictExceptionErrorArgument[];
export const ConflictExceptionErrorArgumentList = /*@__PURE__*/ S.Array(
  ConflictExceptionErrorArgument,
);
export type CreateApplicationInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application instance and deploys it to a device.
 */
export const createApplicationInstance: API.OperationMethod<
  CreateApplicationInstanceRequest,
  CreateApplicationInstanceResponse,
  CreateApplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationInstanceRequest,
  output: CreateApplicationInstanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationInstance",
}));

export type CreateJobForDevicesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a job to run on a device. A job can update a device's software or reboot it.
 */
export const createJobForDevices: API.OperationMethod<
  CreateJobForDevicesRequest,
  CreateJobForDevicesResponse,
  CreateJobForDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobForDevicesRequest,
  output: CreateJobForDevicesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobForDevices",
}));

export type CreateNodeFromTemplateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates a camera stream node.
 */
export const createNodeFromTemplateJob: API.OperationMethod<
  CreateNodeFromTemplateJobRequest,
  CreateNodeFromTemplateJobResponse,
  CreateNodeFromTemplateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNodeFromTemplateJobRequest,
  output: CreateNodeFromTemplateJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNodeFromTemplateJob",
}));

export type CreatePackageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates a package and storage location in an Amazon S3 access point.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageRequest,
  output: CreatePackageResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackage",
}));

export type CreatePackageImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Imports a node package.
 */
export const createPackageImportJob: API.OperationMethod<
  CreatePackageImportJobRequest,
  CreatePackageImportJobResponse,
  CreatePackageImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageImportJobRequest,
  output: CreatePackageImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackageImportJob",
}));

export type DeleteDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a device.
 */
export const deleteDevice: API.OperationMethod<
  DeleteDeviceRequest,
  DeleteDeviceResponse,
  DeleteDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeviceRequest,
  output: DeleteDeviceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevice",
}));

export type DeletePackageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a package.
 *
 * To delete a package, you need permission to call `s3:DeleteObject` in addition to permissions for
 * the AWS Panorama API.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageRequest,
  output: DeletePackageResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
}));

export type DeregisterPackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a package version.
 */
export const deregisterPackageVersion: API.OperationMethod<
  DeregisterPackageVersionRequest,
  DeregisterPackageVersionResponse,
  DeregisterPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterPackageVersionRequest,
  output: DeregisterPackageVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterPackageVersion",
}));

export type DescribeApplicationInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an application instance on a device.
 */
export const describeApplicationInstance: API.OperationMethod<
  DescribeApplicationInstanceRequest,
  DescribeApplicationInstanceResponse,
  DescribeApplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationInstanceRequest,
  output: DescribeApplicationInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationInstance",
}));

export type DescribeApplicationInstanceDetailsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an application instance's configuration manifest.
 */
export const describeApplicationInstanceDetails: API.OperationMethod<
  DescribeApplicationInstanceDetailsRequest,
  DescribeApplicationInstanceDetailsResponse,
  DescribeApplicationInstanceDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationInstanceDetailsRequest,
  output: DescribeApplicationInstanceDetailsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationInstanceDetails",
}));

export type DescribeDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a device.
 */
export const describeDevice: API.OperationMethod<
  DescribeDeviceRequest,
  DescribeDeviceResponse,
  DescribeDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDeviceRequest,
  output: DescribeDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDevice",
}));

export type DescribeDeviceJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a device job.
 */
export const describeDeviceJob: API.OperationMethod<
  DescribeDeviceJobRequest,
  DescribeDeviceJobResponse,
  DescribeDeviceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDeviceJobRequest,
  output: DescribeDeviceJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeviceJob",
}));

export type DescribeNodeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a node.
 */
export const describeNode: API.OperationMethod<
  DescribeNodeRequest,
  DescribeNodeResponse,
  DescribeNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNodeRequest,
  output: DescribeNodeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNode",
}));

export type DescribeNodeFromTemplateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a job to create a camera stream node.
 */
export const describeNodeFromTemplateJob: API.OperationMethod<
  DescribeNodeFromTemplateJobRequest,
  DescribeNodeFromTemplateJobResponse,
  DescribeNodeFromTemplateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNodeFromTemplateJobRequest,
  output: DescribeNodeFromTemplateJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodeFromTemplateJob",
}));

export type DescribePackageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a package.
 */
export const describePackage: API.OperationMethod<
  DescribePackageRequest,
  DescribePackageResponse,
  DescribePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageRequest,
  output: DescribePackageResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackage",
}));

export type DescribePackageImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a package import job.
 */
export const describePackageImportJob: API.OperationMethod<
  DescribePackageImportJobRequest,
  DescribePackageImportJobResponse,
  DescribePackageImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageImportJobRequest,
  output: DescribePackageImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackageImportJob",
}));

export type DescribePackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a package version.
 */
export const describePackageVersion: API.OperationMethod<
  DescribePackageVersionRequest,
  DescribePackageVersionResponse,
  DescribePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackageVersionRequest,
  output: DescribePackageVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackageVersion",
}));

export type ListApplicationInstanceDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Returns a list of application instance dependencies.
 */
export const listApplicationInstanceDependencies: API.PaginatedOperationMethod<
  ListApplicationInstanceDependenciesRequest,
  ListApplicationInstanceDependenciesResponse,
  ListApplicationInstanceDependenciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationInstanceDependenciesRequest,
  output: ListApplicationInstanceDependenciesResponse,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationInstanceDependencies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationInstanceNodeInstancesError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Returns a list of application node instances.
 */
export const listApplicationInstanceNodeInstances: API.PaginatedOperationMethod<
  ListApplicationInstanceNodeInstancesRequest,
  ListApplicationInstanceNodeInstancesResponse,
  ListApplicationInstanceNodeInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationInstanceNodeInstancesRequest,
  output: ListApplicationInstanceNodeInstancesResponse,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationInstanceNodeInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationInstancesError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Returns a list of application instances.
 */
export const listApplicationInstances: API.PaginatedOperationMethod<
  ListApplicationInstancesRequest,
  ListApplicationInstancesResponse,
  ListApplicationInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationInstancesRequest,
  output: ListApplicationInstancesResponse,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDevicesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of devices.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDevicesJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of jobs.
 */
export const listDevicesJobs: API.PaginatedOperationMethod<
  ListDevicesJobsRequest,
  ListDevicesJobsResponse,
  ListDevicesJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesJobsRequest,
  output: ListDevicesJobsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicesJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodeFromTemplateJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of camera stream node jobs.
 */
export const listNodeFromTemplateJobs: API.PaginatedOperationMethod<
  ListNodeFromTemplateJobsRequest,
  ListNodeFromTemplateJobsResponse,
  ListNodeFromTemplateJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodeFromTemplateJobsRequest,
  output: ListNodeFromTemplateJobsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodeFromTemplateJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of nodes.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest,
  ListNodesResponse,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodesRequest,
  output: ListNodesResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackageImportJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of package import jobs.
 */
export const listPackageImportJobs: API.PaginatedOperationMethod<
  ListPackageImportJobsRequest,
  ListPackageImportJobsResponse,
  ListPackageImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackageImportJobsRequest,
  output: ListPackageImportJobsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of packages.
 */
export const listPackages: API.PaginatedOperationMethod<
  ListPackagesRequest,
  ListPackagesResponse,
  ListPackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagesRequest,
  output: ListPackagesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ProvisionDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a device and returns a configuration archive. The configuration archive is a ZIP file that contains a
 * provisioning certificate that is valid for 5 minutes. Name the configuration archive
 * `certificates-omni_*device-name*.zip` and transfer it to the device within 5
 * minutes. Use the included USB storage device and connect it to the USB 3.0 port next to the HDMI output.
 */
export const provisionDevice: API.OperationMethod<
  ProvisionDeviceRequest,
  ProvisionDeviceResponse,
  ProvisionDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProvisionDeviceRequest,
  output: ProvisionDeviceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionDevice",
}));

export type RegisterPackageVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Registers a package version.
 */
export const registerPackageVersion: API.OperationMethod<
  RegisterPackageVersionRequest,
  RegisterPackageVersionResponse,
  RegisterPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterPackageVersionRequest,
  output: RegisterPackageVersionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPackageVersion",
}));

export type RemoveApplicationInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes an application instance.
 */
export const removeApplicationInstance: API.OperationMethod<
  RemoveApplicationInstanceRequest,
  RemoveApplicationInstanceResponse,
  RemoveApplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveApplicationInstanceRequest,
  output: RemoveApplicationInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveApplicationInstance",
}));

export type SignalApplicationInstanceNodeInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Signal camera nodes to stop or resume.
 */
export const signalApplicationInstanceNodeInstances: API.OperationMethod<
  SignalApplicationInstanceNodeInstancesRequest,
  SignalApplicationInstanceNodeInstancesResponse,
  SignalApplicationInstanceNodeInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SignalApplicationInstanceNodeInstancesRequest,
  output: SignalApplicationInstanceNodeInstancesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignalApplicationInstanceNodeInstances",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeviceMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a device's metadata.
 */
export const updateDeviceMetadata: API.OperationMethod<
  UpdateDeviceMetadataRequest,
  UpdateDeviceMetadataResponse,
  UpdateDeviceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeviceMetadataRequest,
  output: UpdateDeviceMetadataResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceMetadata",
}));
