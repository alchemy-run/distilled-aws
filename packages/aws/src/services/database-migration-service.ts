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
const ns = T.XmlNamespace("http://dms.amazonaws.com/doc/2016-01-01/");
const svc = T.AwsApiService({
  sdkId: "Database Migration Service",
  serviceShapeName: "AmazonDMSv20160101",
});
const auth = T.AwsAuthSigv4({ name: "dms" });
const ver = T.ServiceVersion("2016-01-01");
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
              `https://dms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://dms.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-iso") {
              return e(`https://dms.${Region}.c2s.ic.gov`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-iso-b") {
              return e(`https://dms.${Region}.sc2s.sgov.gov`);
            }
            return e(
              `https://dms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://dms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://dms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedFault
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedFault>()(
    "AccessDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class CollectorNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CollectorNotFoundFault>()(
    "CollectorNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyFault
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyFault>()(
    "FailedDependencyFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InsufficientResourceCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientResourceCapacityFault>()(
    "InsufficientResourceCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCertificateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCertificateFault>()(
    "InvalidCertificateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOperationFault
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationFault>()(
    "InvalidOperationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidResourceStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateFault>()(
    "InvalidResourceStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()("InvalidSubnet", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class KMSAccessDeniedFault
  extends /*@__PURE__*/ S.TaggedError<KMSAccessDeniedFault>()(
    "KMSAccessDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class KMSDisabledFault
  extends /*@__PURE__*/ S.TaggedError<KMSDisabledFault>()("KMSDisabledFault", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class KMSFault
  extends /*@__PURE__*/ S.TaggedError<KMSFault>()("KMSFault", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class KMSInvalidStateFault
  extends /*@__PURE__*/ S.TaggedError<KMSInvalidStateFault>()(
    "KMSInvalidStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ S.TaggedError<KMSKeyNotAccessibleFault>()(
    "KMSKeyNotAccessibleFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class KMSNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<KMSNotFoundFault>()("KMSNotFoundFault", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class KMSThrottlingFault
  extends /*@__PURE__*/ S.TaggedError<KMSThrottlingFault>()(
    "KMSThrottlingFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReplicationSubnetGroupDoesNotCoverEnoughAZs
  extends /*@__PURE__*/ S.TaggedError<ReplicationSubnetGroupDoesNotCoverEnoughAZs>()(
    "ReplicationSubnetGroupDoesNotCoverEnoughAZs",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsFault>()(
    "ResourceAlreadyExistsFault",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceArn: S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundFault>()(
    "ResourceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ResourceQuotaExceededFault>()(
    "ResourceQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class S3AccessDeniedFault
  extends /*@__PURE__*/ S.TaggedError<S3AccessDeniedFault>()(
    "S3AccessDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class S3ResourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<S3ResourceNotFoundFault>()(
    "S3ResourceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ S.TaggedError<SNSInvalidTopicFault>()(
    "SNSInvalidTopicFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ S.TaggedError<SNSNoAuthorizationFault>()(
    "SNSNoAuthorizationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StorageQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<StorageQuotaExceededFault>()(
    "StorageQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetAlreadyInUse>()(
    "SubnetAlreadyInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class UpgradeDependencyFailureFault
  extends /*@__PURE__*/ S.TaggedError<UpgradeDependencyFailureFault>()(
    "UpgradeDependencyFailureFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export interface Tag {
  Key?: string;
  Value?: string;
  ResourceArn?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    ResourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(
  Tag.pipe(T.XmlName("Tag")).annotate({ identifier: "Tag" }),
);
export interface AddTagsToResourceMessage {
  ResourceArn: string;
  Tags: Tag[];
}
export const AddTagsToResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddTagsToResourceMessage",
}) as any as S.Schema<AddTagsToResourceMessage>;
export interface AddTagsToResourceResponse {}
export const AddTagsToResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsToResourceResponse",
}) as any as S.Schema<AddTagsToResourceResponse>;
export interface ApplyPendingMaintenanceActionMessage {
  ReplicationInstanceArn: string;
  ApplyAction: string;
  OptInType: string;
}
export const ApplyPendingMaintenanceActionMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReplicationInstanceArn: S.String,
      ApplyAction: S.String,
      OptInType: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ApplyPendingMaintenanceActionMessage",
}) as any as S.Schema<ApplyPendingMaintenanceActionMessage>;
export interface PendingMaintenanceAction {
  Action?: string;
  AutoAppliedAfterDate?: Date;
  ForcedApplyDate?: Date;
  OptInStatus?: string;
  CurrentApplyDate?: Date;
  Description?: string;
}
export const PendingMaintenanceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(S.String),
    AutoAppliedAfterDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ForcedApplyDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OptInStatus: S.optional(S.String),
    CurrentApplyDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingMaintenanceAction",
}) as any as S.Schema<PendingMaintenanceAction>;
export type PendingMaintenanceActionDetails = PendingMaintenanceAction[];
export const PendingMaintenanceActionDetails = /*@__PURE__*/ S.Array(
  PendingMaintenanceAction.pipe(T.XmlName("PendingMaintenanceAction")).annotate(
    { identifier: "PendingMaintenanceAction" },
  ),
);
export interface ResourcePendingMaintenanceActions {
  ResourceIdentifier?: string;
  PendingMaintenanceActionDetails?: PendingMaintenanceAction[];
}
export const ResourcePendingMaintenanceActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdentifier: S.optional(S.String),
    PendingMaintenanceActionDetails: S.optional(
      PendingMaintenanceActionDetails,
    ),
  }),
).annotate({
  identifier: "ResourcePendingMaintenanceActions",
}) as any as S.Schema<ResourcePendingMaintenanceActions>;
export interface ApplyPendingMaintenanceActionResponse {
  ResourcePendingMaintenanceActions?: ResourcePendingMaintenanceActions;
}
export const ApplyPendingMaintenanceActionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourcePendingMaintenanceActions: S.optional(
        ResourcePendingMaintenanceActions,
      ),
    }).pipe(ns),
).annotate({
  identifier: "ApplyPendingMaintenanceActionResponse",
}) as any as S.Schema<ApplyPendingMaintenanceActionResponse>;
export interface RecommendationSettings {
  InstanceSizingType: string;
  WorkloadType: string;
}
export const RecommendationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceSizingType: S.String, WorkloadType: S.String }),
).annotate({
  identifier: "RecommendationSettings",
}) as any as S.Schema<RecommendationSettings>;
export interface StartRecommendationsRequestEntry {
  DatabaseId: string;
  Settings: RecommendationSettings;
}
export const StartRecommendationsRequestEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseId: S.String, Settings: RecommendationSettings }),
).annotate({
  identifier: "StartRecommendationsRequestEntry",
}) as any as S.Schema<StartRecommendationsRequestEntry>;
export type StartRecommendationsRequestEntryList =
  StartRecommendationsRequestEntry[];
export const StartRecommendationsRequestEntryList = /*@__PURE__*/ S.Array(
  StartRecommendationsRequestEntry,
);
export interface BatchStartRecommendationsRequest {
  Data?: StartRecommendationsRequestEntry[];
}
export const BatchStartRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(StartRecommendationsRequestEntryList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchStartRecommendationsRequest",
}) as any as S.Schema<BatchStartRecommendationsRequest>;
export interface BatchStartRecommendationsErrorEntry {
  DatabaseId?: string;
  Message?: string;
  Code?: string;
}
export const BatchStartRecommendationsErrorEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseId: S.optional(S.String),
    Message: S.optional(S.String),
    Code: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchStartRecommendationsErrorEntry",
}) as any as S.Schema<BatchStartRecommendationsErrorEntry>;
export type BatchStartRecommendationsErrorEntryList =
  BatchStartRecommendationsErrorEntry[];
export const BatchStartRecommendationsErrorEntryList = /*@__PURE__*/ S.Array(
  BatchStartRecommendationsErrorEntry,
);
export interface BatchStartRecommendationsResponse {
  ErrorEntries?: BatchStartRecommendationsErrorEntry[];
}
export const BatchStartRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorEntries: S.optional(BatchStartRecommendationsErrorEntryList),
  }).pipe(ns),
).annotate({
  identifier: "BatchStartRecommendationsResponse",
}) as any as S.Schema<BatchStartRecommendationsResponse>;
export type MigrationProjectIdentifier = string;
export interface CancelMetadataModelConversionMessage {
  MigrationProjectIdentifier: string;
  RequestIdentifier: string;
}
export const CancelMetadataModelConversionMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      RequestIdentifier: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CancelMetadataModelConversionMessage",
}) as any as S.Schema<CancelMetadataModelConversionMessage>;
export interface DefaultErrorDetails {
  Message?: string;
}
export const DefaultErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "DefaultErrorDetails",
}) as any as S.Schema<DefaultErrorDetails>;
export type ErrorDetails = { defaultErrorDetails: DefaultErrorDetails };
export const ErrorDetails = /*@__PURE__*/ S.Union([
  S.Struct({ defaultErrorDetails: DefaultErrorDetails }),
]);
export interface ExportSqlDetails {
  S3ObjectKey?: string;
  ObjectURL?: string;
}
export const ExportSqlDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3ObjectKey: S.optional(S.String),
    ObjectURL: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportSqlDetails",
}) as any as S.Schema<ExportSqlDetails>;
export interface ProcessedObject {
  Name?: string;
  Type?: string;
  EndpointType?: string;
}
export const ProcessedObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    EndpointType: S.optional(S.String),
  }),
).annotate({
  identifier: "ProcessedObject",
}) as any as S.Schema<ProcessedObject>;
export interface Progress {
  ProgressPercent?: number;
  TotalObjects?: number;
  ProgressStep?: string;
  ProcessedObject?: ProcessedObject;
}
export const Progress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressPercent: S.optional(S.Number),
    TotalObjects: S.optional(S.Number),
    ProgressStep: S.optional(S.String),
    ProcessedObject: S.optional(ProcessedObject),
  }),
).annotate({ identifier: "Progress" }) as any as S.Schema<Progress>;
export interface SchemaConversionRequest {
  Status?: string;
  RequestIdentifier?: string;
  MigrationProjectArn?: string;
  Error?: ErrorDetails;
  ExportSqlDetails?: ExportSqlDetails;
  Progress?: Progress;
}
export const SchemaConversionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    RequestIdentifier: S.optional(S.String),
    MigrationProjectArn: S.optional(S.String),
    Error: S.optional(ErrorDetails),
    ExportSqlDetails: S.optional(ExportSqlDetails),
    Progress: S.optional(Progress),
  }),
).annotate({
  identifier: "SchemaConversionRequest",
}) as any as S.Schema<SchemaConversionRequest>;
export interface CancelMetadataModelConversionResponse {
  Request?: SchemaConversionRequest;
}
export const CancelMetadataModelConversionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Request: S.optional(SchemaConversionRequest) }).pipe(ns),
).annotate({
  identifier: "CancelMetadataModelConversionResponse",
}) as any as S.Schema<CancelMetadataModelConversionResponse>;
export interface CancelMetadataModelCreationMessage {
  MigrationProjectIdentifier: string;
  RequestIdentifier: string;
}
export const CancelMetadataModelCreationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    RequestIdentifier: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMetadataModelCreationMessage",
}) as any as S.Schema<CancelMetadataModelCreationMessage>;
export interface CancelMetadataModelCreationResponse {
  Request?: SchemaConversionRequest;
}
export const CancelMetadataModelCreationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Request: S.optional(SchemaConversionRequest) }).pipe(ns),
).annotate({
  identifier: "CancelMetadataModelCreationResponse",
}) as any as S.Schema<CancelMetadataModelCreationResponse>;
export interface CancelReplicationTaskAssessmentRunMessage {
  ReplicationTaskAssessmentRunArn: string;
}
export const CancelReplicationTaskAssessmentRunMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ReplicationTaskAssessmentRunArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CancelReplicationTaskAssessmentRunMessage",
  }) as any as S.Schema<CancelReplicationTaskAssessmentRunMessage>;
export interface ReplicationTaskAssessmentRunProgress {
  IndividualAssessmentCount?: number;
  IndividualAssessmentCompletedCount?: number;
}
export const ReplicationTaskAssessmentRunProgress = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IndividualAssessmentCount: S.optional(S.Number),
      IndividualAssessmentCompletedCount: S.optional(S.Number),
    }),
).annotate({
  identifier: "ReplicationTaskAssessmentRunProgress",
}) as any as S.Schema<ReplicationTaskAssessmentRunProgress>;
export interface ReplicationTaskAssessmentRunResultStatistic {
  Passed?: number;
  Failed?: number;
  Error?: number;
  Warning?: number;
  Cancelled?: number;
  Skipped?: number;
}
export const ReplicationTaskAssessmentRunResultStatistic =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Passed: S.optional(S.Number),
      Failed: S.optional(S.Number),
      Error: S.optional(S.Number),
      Warning: S.optional(S.Number),
      Cancelled: S.optional(S.Number),
      Skipped: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "ReplicationTaskAssessmentRunResultStatistic",
  }) as any as S.Schema<ReplicationTaskAssessmentRunResultStatistic>;
export interface ReplicationTaskAssessmentRun {
  ReplicationTaskAssessmentRunArn?: string;
  ReplicationTaskArn?: string;
  Status?: string;
  ReplicationTaskAssessmentRunCreationDate?: Date;
  AssessmentProgress?: ReplicationTaskAssessmentRunProgress;
  LastFailureMessage?: string;
  ServiceAccessRoleArn?: string;
  ResultLocationBucket?: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  AssessmentRunName?: string;
  IsLatestTaskAssessmentRun?: boolean;
  ResultStatistic?: ReplicationTaskAssessmentRunResultStatistic;
}
export const ReplicationTaskAssessmentRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskAssessmentRunArn: S.optional(S.String),
    ReplicationTaskArn: S.optional(S.String),
    Status: S.optional(S.String),
    ReplicationTaskAssessmentRunCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssessmentProgress: S.optional(ReplicationTaskAssessmentRunProgress),
    LastFailureMessage: S.optional(S.String),
    ServiceAccessRoleArn: S.optional(S.String),
    ResultLocationBucket: S.optional(S.String),
    ResultLocationFolder: S.optional(S.String),
    ResultEncryptionMode: S.optional(S.String),
    ResultKmsKeyArn: S.optional(S.String),
    AssessmentRunName: S.optional(S.String),
    IsLatestTaskAssessmentRun: S.optional(S.Boolean),
    ResultStatistic: S.optional(ReplicationTaskAssessmentRunResultStatistic),
  }),
).annotate({
  identifier: "ReplicationTaskAssessmentRun",
}) as any as S.Schema<ReplicationTaskAssessmentRun>;
export interface CancelReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export const CancelReplicationTaskAssessmentRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationTaskAssessmentRun: S.optional(ReplicationTaskAssessmentRun),
    }).pipe(ns),
  ).annotate({
    identifier: "CancelReplicationTaskAssessmentRunResponse",
  }) as any as S.Schema<CancelReplicationTaskAssessmentRunResponse>;
export type MigrationTypeValue =
  | "full-load"
  | "cdc"
  | "full-load-and-cdc"
  | (string & {});
export const MigrationTypeValue = /*@__PURE__*/ S.String;

export type Iso8601DateTime = Date;
export interface SourceDataSetting {
  CDCStartPosition?: string;
  CDCStartTime?: Date;
  CDCStopTime?: Date;
  SlotName?: string;
}
export const SourceDataSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CDCStartPosition: S.optional(S.String),
    CDCStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CDCStopTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SlotName: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceDataSetting",
}) as any as S.Schema<SourceDataSetting>;
export type SourceDataSettings = SourceDataSetting[];
export const SourceDataSettings = /*@__PURE__*/ S.Array(SourceDataSetting);
export type TablePreparationMode =
  | "do-nothing"
  | "truncate"
  | "drop-tables-on-target"
  | (string & {});
export const TablePreparationMode = /*@__PURE__*/ S.String;

export interface TargetDataSetting {
  TablePreparationMode?: TablePreparationMode;
}
export const TargetDataSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TablePreparationMode: S.optional(TablePreparationMode) }),
).annotate({
  identifier: "TargetDataSetting",
}) as any as S.Schema<TargetDataSetting>;
export type TargetDataSettings = TargetDataSetting[];
export const TargetDataSettings = /*@__PURE__*/ S.Array(TargetDataSetting);
export type SecretString = string | redacted.Redacted<string>;
export interface CreateDataMigrationMessage {
  DataMigrationName?: string;
  MigrationProjectIdentifier: string;
  DataMigrationType: MigrationTypeValue;
  ServiceAccessRoleArn: string;
  EnableCloudwatchLogs?: boolean;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  NumberOfJobs?: number;
  Tags?: Tag[];
  SelectionRules?: string | redacted.Redacted<string>;
}
export const CreateDataMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataMigrationName: S.optional(S.String),
    MigrationProjectIdentifier: S.String,
    DataMigrationType: MigrationTypeValue,
    ServiceAccessRoleArn: S.String,
    EnableCloudwatchLogs: S.optional(S.Boolean),
    SourceDataSettings: S.optional(SourceDataSettings),
    TargetDataSettings: S.optional(TargetDataSettings),
    NumberOfJobs: S.optional(S.Number),
    Tags: S.optional(TagList),
    SelectionRules: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataMigrationMessage",
}) as any as S.Schema<CreateDataMigrationMessage>;
export interface DataMigrationSettings {
  NumberOfJobs?: number;
  CloudwatchLogsEnabled?: boolean;
  SelectionRules?: string | redacted.Redacted<string>;
}
export const DataMigrationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfJobs: S.optional(S.Number),
    CloudwatchLogsEnabled: S.optional(S.Boolean),
    SelectionRules: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DataMigrationSettings",
}) as any as S.Schema<DataMigrationSettings>;
export interface DataMigrationStatistics {
  TablesLoaded?: number;
  ElapsedTimeMillis?: number;
  TablesLoading?: number;
  FullLoadPercentage?: number;
  CDCLatency?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  StartTime?: Date;
  StopTime?: Date;
}
export const DataMigrationStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TablesLoaded: S.optional(S.Number),
    ElapsedTimeMillis: S.optional(S.Number),
    TablesLoading: S.optional(S.Number),
    FullLoadPercentage: S.optional(S.Number),
    CDCLatency: S.optional(S.Number),
    TablesQueued: S.optional(S.Number),
    TablesErrored: S.optional(S.Number),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StopTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "DataMigrationStatistics",
}) as any as S.Schema<DataMigrationStatistics>;
export type PublicIpAddressList = string[];
export const PublicIpAddressList = /*@__PURE__*/ S.Array(S.String);
export type DataMigrationCidrBlock = string[];
export const DataMigrationCidrBlock = /*@__PURE__*/ S.Array(S.String);
export interface DataMigration {
  DataMigrationName?: string;
  DataMigrationArn?: string;
  DataMigrationCreateTime?: Date;
  DataMigrationStartTime?: Date;
  DataMigrationEndTime?: Date;
  ServiceAccessRoleArn?: string;
  MigrationProjectArn?: string;
  DataMigrationType?: MigrationTypeValue;
  DataMigrationSettings?: DataMigrationSettings;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  DataMigrationStatistics?: DataMigrationStatistics;
  DataMigrationStatus?: string;
  PublicIpAddresses?: string[];
  DataMigrationCidrBlocks?: string[];
  LastFailureMessage?: string;
  StopReason?: string;
}
export const DataMigration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataMigrationName: S.optional(S.String),
    DataMigrationArn: S.optional(S.String),
    DataMigrationCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataMigrationStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataMigrationEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceAccessRoleArn: S.optional(S.String),
    MigrationProjectArn: S.optional(S.String),
    DataMigrationType: S.optional(MigrationTypeValue),
    DataMigrationSettings: S.optional(DataMigrationSettings),
    SourceDataSettings: S.optional(SourceDataSettings),
    TargetDataSettings: S.optional(TargetDataSettings),
    DataMigrationStatistics: S.optional(DataMigrationStatistics),
    DataMigrationStatus: S.optional(S.String),
    PublicIpAddresses: S.optional(PublicIpAddressList),
    DataMigrationCidrBlocks: S.optional(DataMigrationCidrBlock),
    LastFailureMessage: S.optional(S.String),
    StopReason: S.optional(S.String),
  }),
).annotate({ identifier: "DataMigration" }) as any as S.Schema<DataMigration>;
export interface CreateDataMigrationResponse {
  DataMigration?: DataMigration;
}
export const CreateDataMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigration: S.optional(DataMigration) }).pipe(ns),
).annotate({
  identifier: "CreateDataMigrationResponse",
}) as any as S.Schema<CreateDataMigrationResponse>;
export interface RedshiftDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const RedshiftDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RedshiftDataProviderSettings",
}) as any as S.Schema<RedshiftDataProviderSettings>;
export type DmsSslModeValue =
  | "none"
  | "require"
  | "verify-ca"
  | "verify-full"
  | (string & {});
export const DmsSslModeValue = /*@__PURE__*/ S.String;

export interface PostgreSqlDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const PostgreSqlDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PostgreSqlDataProviderSettings",
}) as any as S.Schema<PostgreSqlDataProviderSettings>;
export interface MySqlDataProviderSettings {
  ServerName?: string;
  Port?: number;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const MySqlDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MySqlDataProviderSettings",
}) as any as S.Schema<MySqlDataProviderSettings>;
export interface OracleDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  AsmServer?: string;
  SecretsManagerOracleAsmSecretId?: string;
  SecretsManagerOracleAsmAccessRoleArn?: string;
  SecretsManagerSecurityDbEncryptionSecretId?: string;
  SecretsManagerSecurityDbEncryptionAccessRoleArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const OracleDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    AsmServer: S.optional(S.String),
    SecretsManagerOracleAsmSecretId: S.optional(S.String),
    SecretsManagerOracleAsmAccessRoleArn: S.optional(S.String),
    SecretsManagerSecurityDbEncryptionSecretId: S.optional(S.String),
    SecretsManagerSecurityDbEncryptionAccessRoleArn: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "OracleDataProviderSettings",
}) as any as S.Schema<OracleDataProviderSettings>;
export interface SybaseAseDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  EncryptPassword?: boolean;
  CertificateArn?: string;
}
export const SybaseAseDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    EncryptPassword: S.optional(S.Boolean),
    CertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SybaseAseDataProviderSettings",
}) as any as S.Schema<SybaseAseDataProviderSettings>;
export interface MicrosoftSqlServerDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const MicrosoftSqlServerDataProviderSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerName: S.optional(S.String),
      Port: S.optional(S.Number),
      DatabaseName: S.optional(S.String),
      SslMode: S.optional(DmsSslModeValue),
      CertificateArn: S.optional(S.String),
      S3Path: S.optional(S.String),
      S3AccessRoleArn: S.optional(S.String),
    }),
).annotate({
  identifier: "MicrosoftSqlServerDataProviderSettings",
}) as any as S.Schema<MicrosoftSqlServerDataProviderSettings>;
export interface DocDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
}
export const DocDbDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DocDbDataProviderSettings",
}) as any as S.Schema<DocDbDataProviderSettings>;
export interface MariaDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const MariaDbDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MariaDbDataProviderSettings",
}) as any as S.Schema<MariaDbDataProviderSettings>;
export interface IbmDb2LuwDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  EncryptionAlgorithm?: number;
  SecurityMechanism?: number;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const IbmDb2LuwDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    EncryptionAlgorithm: S.optional(S.Number),
    SecurityMechanism: S.optional(S.Number),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IbmDb2LuwDataProviderSettings",
}) as any as S.Schema<IbmDb2LuwDataProviderSettings>;
export interface IbmDb2zOsDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  S3Path?: string;
  S3AccessRoleArn?: string;
}
export const IbmDb2zOsDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    S3Path: S.optional(S.String),
    S3AccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IbmDb2zOsDataProviderSettings",
}) as any as S.Schema<IbmDb2zOsDataProviderSettings>;
export type AuthTypeValue = "no" | "password" | (string & {});
export const AuthTypeValue = /*@__PURE__*/ S.String;

export type AuthMechanismValue =
  | "default"
  | "mongodb_cr"
  | "scram_sha_1"
  | (string & {});
export const AuthMechanismValue = /*@__PURE__*/ S.String;

export interface MongoDbDataProviderSettings {
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  SslMode?: DmsSslModeValue;
  CertificateArn?: string;
  AuthType?: AuthTypeValue;
  AuthSource?: string;
  AuthMechanism?: AuthMechanismValue;
}
export const MongoDbDataProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    CertificateArn: S.optional(S.String),
    AuthType: S.optional(AuthTypeValue),
    AuthSource: S.optional(S.String),
    AuthMechanism: S.optional(AuthMechanismValue),
  }),
).annotate({
  identifier: "MongoDbDataProviderSettings",
}) as any as S.Schema<MongoDbDataProviderSettings>;
export type DataProviderSettings =
  | {
      RedshiftSettings: RedshiftDataProviderSettings;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings: PostgreSqlDataProviderSettings;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings: MySqlDataProviderSettings;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings: OracleDataProviderSettings;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings: SybaseAseDataProviderSettings;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings: MicrosoftSqlServerDataProviderSettings;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings: DocDbDataProviderSettings;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings: MariaDbDataProviderSettings;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings: IbmDb2LuwDataProviderSettings;
      IbmDb2zOsSettings?: never;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings: IbmDb2zOsDataProviderSettings;
      MongoDbSettings?: never;
    }
  | {
      RedshiftSettings?: never;
      PostgreSqlSettings?: never;
      MySqlSettings?: never;
      OracleSettings?: never;
      SybaseAseSettings?: never;
      MicrosoftSqlServerSettings?: never;
      DocDbSettings?: never;
      MariaDbSettings?: never;
      IbmDb2LuwSettings?: never;
      IbmDb2zOsSettings?: never;
      MongoDbSettings: MongoDbDataProviderSettings;
    };
export const DataProviderSettings = /*@__PURE__*/ S.Union([
  S.Struct({ RedshiftSettings: RedshiftDataProviderSettings }),
  S.Struct({ PostgreSqlSettings: PostgreSqlDataProviderSettings }),
  S.Struct({ MySqlSettings: MySqlDataProviderSettings }),
  S.Struct({ OracleSettings: OracleDataProviderSettings }),
  S.Struct({ SybaseAseSettings: SybaseAseDataProviderSettings }),
  S.Struct({
    MicrosoftSqlServerSettings: MicrosoftSqlServerDataProviderSettings,
  }),
  S.Struct({ DocDbSettings: DocDbDataProviderSettings }),
  S.Struct({ MariaDbSettings: MariaDbDataProviderSettings }),
  S.Struct({ IbmDb2LuwSettings: IbmDb2LuwDataProviderSettings }),
  S.Struct({ IbmDb2zOsSettings: IbmDb2zOsDataProviderSettings }),
  S.Struct({ MongoDbSettings: MongoDbDataProviderSettings }),
]);
export interface CreateDataProviderMessage {
  DataProviderName?: string;
  Description?: string;
  Engine: string;
  Virtual?: boolean;
  Settings: DataProviderSettings;
  Tags?: Tag[];
}
export const CreateDataProviderMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataProviderName: S.optional(S.String),
    Description: S.optional(S.String),
    Engine: S.String,
    Virtual: S.optional(S.Boolean),
    Settings: DataProviderSettings,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataProviderMessage",
}) as any as S.Schema<CreateDataProviderMessage>;
export interface DataProvider {
  DataProviderName?: string;
  DataProviderArn?: string;
  DataProviderCreationTime?: Date;
  Description?: string;
  Engine?: string;
  Virtual?: boolean;
  Settings?: DataProviderSettings;
}
export const DataProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataProviderName: S.optional(S.String),
    DataProviderArn: S.optional(S.String),
    DataProviderCreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Engine: S.optional(S.String),
    Virtual: S.optional(S.Boolean),
    Settings: S.optional(DataProviderSettings),
  }),
).annotate({ identifier: "DataProvider" }) as any as S.Schema<DataProvider>;
export interface CreateDataProviderResponse {
  DataProvider?: DataProvider;
}
export const CreateDataProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataProvider: S.optional(DataProvider) }).pipe(ns),
).annotate({
  identifier: "CreateDataProviderResponse",
}) as any as S.Schema<CreateDataProviderResponse>;
export type ReplicationEndpointTypeValue = "source" | "target" | (string & {});
export const ReplicationEndpointTypeValue = /*@__PURE__*/ S.String;

export interface DynamoDbSettings {
  ServiceAccessRoleArn: string;
}
export const DynamoDbSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceAccessRoleArn: S.String }),
).annotate({
  identifier: "DynamoDbSettings",
}) as any as S.Schema<DynamoDbSettings>;
export type CompressionTypeValue = "none" | "gzip" | (string & {});
export const CompressionTypeValue = /*@__PURE__*/ S.String;

export type EncryptionModeValue = "sse-s3" | "sse-kms" | (string & {});
export const EncryptionModeValue = /*@__PURE__*/ S.String;

export type DataFormatValue = "csv" | "parquet" | (string & {});
export const DataFormatValue = /*@__PURE__*/ S.String;

export type EncodingTypeValue =
  | "plain"
  | "plain-dictionary"
  | "rle-dictionary"
  | (string & {});
export const EncodingTypeValue = /*@__PURE__*/ S.String;

export type ParquetVersionValue = "parquet-1-0" | "parquet-2-0" | (string & {});
export const ParquetVersionValue = /*@__PURE__*/ S.String;

export type DatePartitionSequenceValue =
  | "YYYYMMDD"
  | "YYYYMMDDHH"
  | "YYYYMM"
  | "MMYYYYDD"
  | "DDMMYYYY"
  | (string & {});
export const DatePartitionSequenceValue = /*@__PURE__*/ S.String;

export type DatePartitionDelimiterValue =
  | "SLASH"
  | "UNDERSCORE"
  | "DASH"
  | "NONE"
  | (string & {});
export const DatePartitionDelimiterValue = /*@__PURE__*/ S.String;

export type CannedAclForObjectsValue =
  | "none"
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | (string & {});
export const CannedAclForObjectsValue = /*@__PURE__*/ S.String;

export interface S3Settings {
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  CsvRowDelimiter?: string;
  CsvDelimiter?: string;
  BucketFolder?: string;
  BucketName?: string;
  CompressionType?: CompressionTypeValue;
  EncryptionMode?: EncryptionModeValue;
  ServerSideEncryptionKmsKeyId?: string;
  DataFormat?: DataFormatValue;
  EncodingType?: EncodingTypeValue;
  DictPageSizeLimit?: number;
  RowGroupLength?: number;
  DataPageSize?: number;
  ParquetVersion?: ParquetVersionValue;
  EnableStatistics?: boolean;
  IncludeOpForFullLoad?: boolean;
  CdcInsertsOnly?: boolean;
  TimestampColumnName?: string;
  ParquetTimestampInMillisecond?: boolean;
  CdcInsertsAndUpdates?: boolean;
  DatePartitionEnabled?: boolean;
  DatePartitionSequence?: DatePartitionSequenceValue;
  DatePartitionDelimiter?: DatePartitionDelimiterValue;
  UseCsvNoSupValue?: boolean;
  CsvNoSupValue?: string;
  PreserveTransactions?: boolean;
  CdcPath?: string;
  UseTaskStartTimeForFullLoadTimestamp?: boolean;
  CannedAclForObjects?: CannedAclForObjectsValue;
  AddColumnName?: boolean;
  CdcMaxBatchInterval?: number;
  CdcMinFileSize?: number;
  CsvNullValue?: string;
  IgnoreHeaderRows?: number;
  MaxFileSize?: number;
  Rfc4180?: boolean;
  DatePartitionTimezone?: string;
  AddTrailingPaddingCharacter?: boolean;
  ExpectedBucketOwner?: string;
  GlueCatalogGeneration?: boolean;
}
export const S3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceAccessRoleArn: S.optional(S.String),
    ExternalTableDefinition: S.optional(S.String),
    CsvRowDelimiter: S.optional(S.String),
    CsvDelimiter: S.optional(S.String),
    BucketFolder: S.optional(S.String),
    BucketName: S.optional(S.String),
    CompressionType: S.optional(CompressionTypeValue),
    EncryptionMode: S.optional(EncryptionModeValue),
    ServerSideEncryptionKmsKeyId: S.optional(S.String),
    DataFormat: S.optional(DataFormatValue),
    EncodingType: S.optional(EncodingTypeValue),
    DictPageSizeLimit: S.optional(S.Number),
    RowGroupLength: S.optional(S.Number),
    DataPageSize: S.optional(S.Number),
    ParquetVersion: S.optional(ParquetVersionValue),
    EnableStatistics: S.optional(S.Boolean),
    IncludeOpForFullLoad: S.optional(S.Boolean),
    CdcInsertsOnly: S.optional(S.Boolean),
    TimestampColumnName: S.optional(S.String),
    ParquetTimestampInMillisecond: S.optional(S.Boolean),
    CdcInsertsAndUpdates: S.optional(S.Boolean),
    DatePartitionEnabled: S.optional(S.Boolean),
    DatePartitionSequence: S.optional(DatePartitionSequenceValue),
    DatePartitionDelimiter: S.optional(DatePartitionDelimiterValue),
    UseCsvNoSupValue: S.optional(S.Boolean),
    CsvNoSupValue: S.optional(S.String),
    PreserveTransactions: S.optional(S.Boolean),
    CdcPath: S.optional(S.String),
    UseTaskStartTimeForFullLoadTimestamp: S.optional(S.Boolean),
    CannedAclForObjects: S.optional(CannedAclForObjectsValue),
    AddColumnName: S.optional(S.Boolean),
    CdcMaxBatchInterval: S.optional(S.Number),
    CdcMinFileSize: S.optional(S.Number),
    CsvNullValue: S.optional(S.String),
    IgnoreHeaderRows: S.optional(S.Number),
    MaxFileSize: S.optional(S.Number),
    Rfc4180: S.optional(S.Boolean),
    DatePartitionTimezone: S.optional(S.String),
    AddTrailingPaddingCharacter: S.optional(S.Boolean),
    ExpectedBucketOwner: S.optional(S.String),
    GlueCatalogGeneration: S.optional(S.Boolean),
  }),
).annotate({ identifier: "S3Settings" }) as any as S.Schema<S3Settings>;
export interface DmsTransferSettings {
  ServiceAccessRoleArn?: string;
  BucketName?: string;
}
export const DmsTransferSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceAccessRoleArn: S.optional(S.String),
    BucketName: S.optional(S.String),
  }),
).annotate({
  identifier: "DmsTransferSettings",
}) as any as S.Schema<DmsTransferSettings>;
export type NestingLevelValue = "none" | "one" | (string & {});
export const NestingLevelValue = /*@__PURE__*/ S.String;

export interface MongoDbSettings {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  AuthType?: AuthTypeValue;
  AuthMechanism?: AuthMechanismValue;
  NestingLevel?: NestingLevelValue;
  ExtractDocId?: string;
  DocsToInvestigate?: string;
  AuthSource?: string;
  KmsKeyId?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  UseUpdateLookUp?: boolean;
  ReplicateShardCollections?: boolean;
}
export const MongoDbSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    AuthType: S.optional(AuthTypeValue),
    AuthMechanism: S.optional(AuthMechanismValue),
    NestingLevel: S.optional(NestingLevelValue),
    ExtractDocId: S.optional(S.String),
    DocsToInvestigate: S.optional(S.String),
    AuthSource: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    UseUpdateLookUp: S.optional(S.Boolean),
    ReplicateShardCollections: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "MongoDbSettings",
}) as any as S.Schema<MongoDbSettings>;
export type MessageFormatValue = "json" | "json-unformatted" | (string & {});
export const MessageFormatValue = /*@__PURE__*/ S.String;

export interface KinesisSettings {
  StreamArn?: string;
  MessageFormat?: MessageFormatValue;
  ServiceAccessRoleArn?: string;
  IncludeTransactionDetails?: boolean;
  IncludePartitionValue?: boolean;
  PartitionIncludeSchemaTable?: boolean;
  IncludeTableAlterOperations?: boolean;
  IncludeControlDetails?: boolean;
  IncludeNullAndEmpty?: boolean;
  NoHexPrefix?: boolean;
  UseLargeIntegerValue?: boolean;
}
export const KinesisSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamArn: S.optional(S.String),
    MessageFormat: S.optional(MessageFormatValue),
    ServiceAccessRoleArn: S.optional(S.String),
    IncludeTransactionDetails: S.optional(S.Boolean),
    IncludePartitionValue: S.optional(S.Boolean),
    PartitionIncludeSchemaTable: S.optional(S.Boolean),
    IncludeTableAlterOperations: S.optional(S.Boolean),
    IncludeControlDetails: S.optional(S.Boolean),
    IncludeNullAndEmpty: S.optional(S.Boolean),
    NoHexPrefix: S.optional(S.Boolean),
    UseLargeIntegerValue: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "KinesisSettings",
}) as any as S.Schema<KinesisSettings>;
export type KafkaSecurityProtocol =
  | "plaintext"
  | "ssl-authentication"
  | "ssl-encryption"
  | "sasl-ssl"
  | (string & {});
export const KafkaSecurityProtocol = /*@__PURE__*/ S.String;

export type KafkaSaslMechanism = "scram-sha-512" | "plain" | (string & {});
export const KafkaSaslMechanism = /*@__PURE__*/ S.String;

export type KafkaSslEndpointIdentificationAlgorithm =
  | "none"
  | "https"
  | (string & {});
export const KafkaSslEndpointIdentificationAlgorithm = /*@__PURE__*/ S.String;

export interface KafkaSettings {
  Broker?: string;
  Topic?: string;
  MessageFormat?: MessageFormatValue;
  IncludeTransactionDetails?: boolean;
  IncludePartitionValue?: boolean;
  PartitionIncludeSchemaTable?: boolean;
  IncludeTableAlterOperations?: boolean;
  IncludeControlDetails?: boolean;
  MessageMaxBytes?: number;
  IncludeNullAndEmpty?: boolean;
  SecurityProtocol?: KafkaSecurityProtocol;
  SslClientCertificateArn?: string;
  SslClientKeyArn?: string;
  SslClientKeyPassword?: string | redacted.Redacted<string>;
  SslCaCertificateArn?: string;
  SaslUsername?: string;
  SaslPassword?: string | redacted.Redacted<string>;
  NoHexPrefix?: boolean;
  SaslMechanism?: KafkaSaslMechanism;
  SslEndpointIdentificationAlgorithm?: KafkaSslEndpointIdentificationAlgorithm;
  UseLargeIntegerValue?: boolean;
}
export const KafkaSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Broker: S.optional(S.String),
    Topic: S.optional(S.String),
    MessageFormat: S.optional(MessageFormatValue),
    IncludeTransactionDetails: S.optional(S.Boolean),
    IncludePartitionValue: S.optional(S.Boolean),
    PartitionIncludeSchemaTable: S.optional(S.Boolean),
    IncludeTableAlterOperations: S.optional(S.Boolean),
    IncludeControlDetails: S.optional(S.Boolean),
    MessageMaxBytes: S.optional(S.Number),
    IncludeNullAndEmpty: S.optional(S.Boolean),
    SecurityProtocol: S.optional(KafkaSecurityProtocol),
    SslClientCertificateArn: S.optional(S.String),
    SslClientKeyArn: S.optional(S.String),
    SslClientKeyPassword: S.optional(SensitiveString),
    SslCaCertificateArn: S.optional(S.String),
    SaslUsername: S.optional(S.String),
    SaslPassword: S.optional(SensitiveString),
    NoHexPrefix: S.optional(S.Boolean),
    SaslMechanism: S.optional(KafkaSaslMechanism),
    SslEndpointIdentificationAlgorithm: S.optional(
      KafkaSslEndpointIdentificationAlgorithm,
    ),
    UseLargeIntegerValue: S.optional(S.Boolean),
  }),
).annotate({ identifier: "KafkaSettings" }) as any as S.Schema<KafkaSettings>;
export interface ElasticsearchSettings {
  ServiceAccessRoleArn: string;
  EndpointUri: string;
  FullLoadErrorPercentage?: number;
  ErrorRetryDuration?: number;
  UseNewMappingType?: boolean;
}
export const ElasticsearchSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceAccessRoleArn: S.String,
    EndpointUri: S.String,
    FullLoadErrorPercentage: S.optional(S.Number),
    ErrorRetryDuration: S.optional(S.Number),
    UseNewMappingType: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ElasticsearchSettings",
}) as any as S.Schema<ElasticsearchSettings>;
export interface NeptuneSettings {
  ServiceAccessRoleArn?: string;
  S3BucketName: string;
  S3BucketFolder: string;
  ErrorRetryDuration?: number;
  MaxFileSize?: number;
  MaxRetryCount?: number;
  IamAuthEnabled?: boolean;
}
export const NeptuneSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceAccessRoleArn: S.optional(S.String),
    S3BucketName: S.String,
    S3BucketFolder: S.String,
    ErrorRetryDuration: S.optional(S.Number),
    MaxFileSize: S.optional(S.Number),
    MaxRetryCount: S.optional(S.Number),
    IamAuthEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NeptuneSettings",
}) as any as S.Schema<NeptuneSettings>;
export interface RedshiftSettings {
  AcceptAnyDate?: boolean;
  AfterConnectScript?: string;
  BucketFolder?: string;
  BucketName?: string;
  CaseSensitiveNames?: boolean;
  CompUpdate?: boolean;
  ConnectionTimeout?: number;
  DatabaseName?: string;
  DateFormat?: string;
  EmptyAsNull?: boolean;
  EncryptionMode?: EncryptionModeValue;
  ExplicitIds?: boolean;
  FileTransferUploadStreams?: number;
  LoadTimeout?: number;
  MaxFileSize?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  RemoveQuotes?: boolean;
  ReplaceInvalidChars?: string;
  ReplaceChars?: string;
  ServerName?: string;
  ServiceAccessRoleArn?: string;
  ServerSideEncryptionKmsKeyId?: string;
  TimeFormat?: string;
  TrimBlanks?: boolean;
  TruncateColumns?: boolean;
  Username?: string;
  WriteBufferSize?: number;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  MapBooleanAsBoolean?: boolean;
}
export const RedshiftSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptAnyDate: S.optional(S.Boolean),
    AfterConnectScript: S.optional(S.String),
    BucketFolder: S.optional(S.String),
    BucketName: S.optional(S.String),
    CaseSensitiveNames: S.optional(S.Boolean),
    CompUpdate: S.optional(S.Boolean),
    ConnectionTimeout: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    DateFormat: S.optional(S.String),
    EmptyAsNull: S.optional(S.Boolean),
    EncryptionMode: S.optional(EncryptionModeValue),
    ExplicitIds: S.optional(S.Boolean),
    FileTransferUploadStreams: S.optional(S.Number),
    LoadTimeout: S.optional(S.Number),
    MaxFileSize: S.optional(S.Number),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    RemoveQuotes: S.optional(S.Boolean),
    ReplaceInvalidChars: S.optional(S.String),
    ReplaceChars: S.optional(S.String),
    ServerName: S.optional(S.String),
    ServiceAccessRoleArn: S.optional(S.String),
    ServerSideEncryptionKmsKeyId: S.optional(S.String),
    TimeFormat: S.optional(S.String),
    TrimBlanks: S.optional(S.Boolean),
    TruncateColumns: S.optional(S.Boolean),
    Username: S.optional(S.String),
    WriteBufferSize: S.optional(S.Number),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    MapBooleanAsBoolean: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RedshiftSettings",
}) as any as S.Schema<RedshiftSettings>;
export type PluginNameValue =
  | "no-preference"
  | "test-decoding"
  | "pglogical"
  | (string & {});
export const PluginNameValue = /*@__PURE__*/ S.String;

export type LongVarcharMappingType =
  | "wstring"
  | "clob"
  | "nclob"
  | (string & {});
export const LongVarcharMappingType = /*@__PURE__*/ S.String;

export type DatabaseMode = "default" | "babelfish" | (string & {});
export const DatabaseMode = /*@__PURE__*/ S.String;

export type PostgreSQLAuthenticationMethod = "password" | "iam" | (string & {});
export const PostgreSQLAuthenticationMethod = /*@__PURE__*/ S.String;

export interface PostgreSQLSettings {
  AfterConnectScript?: string;
  CaptureDdls?: boolean;
  MaxFileSize?: number;
  DatabaseName?: string;
  DdlArtifactsSchema?: string;
  ExecuteTimeout?: number;
  FailTasksOnLobTruncation?: boolean;
  HeartbeatEnable?: boolean;
  HeartbeatSchema?: string;
  HeartbeatFrequency?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  Username?: string;
  SlotName?: string;
  PluginName?: PluginNameValue;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  TrimSpaceInChar?: boolean;
  MapBooleanAsBoolean?: boolean;
  MapJsonbAsClob?: boolean;
  MapLongVarcharAs?: LongVarcharMappingType;
  DatabaseMode?: DatabaseMode;
  BabelfishDatabaseName?: string;
  DisableUnicodeSourceFilter?: boolean;
  ServiceAccessRoleArn?: string;
  AuthenticationMethod?: PostgreSQLAuthenticationMethod;
}
export const PostgreSQLSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterConnectScript: S.optional(S.String),
    CaptureDdls: S.optional(S.Boolean),
    MaxFileSize: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    DdlArtifactsSchema: S.optional(S.String),
    ExecuteTimeout: S.optional(S.Number),
    FailTasksOnLobTruncation: S.optional(S.Boolean),
    HeartbeatEnable: S.optional(S.Boolean),
    HeartbeatSchema: S.optional(S.String),
    HeartbeatFrequency: S.optional(S.Number),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    Username: S.optional(S.String),
    SlotName: S.optional(S.String),
    PluginName: S.optional(PluginNameValue),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    TrimSpaceInChar: S.optional(S.Boolean),
    MapBooleanAsBoolean: S.optional(S.Boolean),
    MapJsonbAsClob: S.optional(S.Boolean),
    MapLongVarcharAs: S.optional(LongVarcharMappingType),
    DatabaseMode: S.optional(DatabaseMode),
    BabelfishDatabaseName: S.optional(S.String),
    DisableUnicodeSourceFilter: S.optional(S.Boolean),
    ServiceAccessRoleArn: S.optional(S.String),
    AuthenticationMethod: S.optional(PostgreSQLAuthenticationMethod),
  }),
).annotate({
  identifier: "PostgreSQLSettings",
}) as any as S.Schema<PostgreSQLSettings>;
export type TargetDbType =
  | "specific-database"
  | "multiple-databases"
  | (string & {});
export const TargetDbType = /*@__PURE__*/ S.String;

export type MySQLAuthenticationMethod = "password" | "iam" | (string & {});
export const MySQLAuthenticationMethod = /*@__PURE__*/ S.String;

export interface MySQLSettings {
  AfterConnectScript?: string;
  CleanSourceMetadataOnMismatch?: boolean;
  DatabaseName?: string;
  EventsPollInterval?: number;
  TargetDbType?: TargetDbType;
  MaxFileSize?: number;
  ParallelLoadThreads?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  ServerTimezone?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  ExecuteTimeout?: number;
  ServiceAccessRoleArn?: string;
  AuthenticationMethod?: MySQLAuthenticationMethod;
}
export const MySQLSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterConnectScript: S.optional(S.String),
    CleanSourceMetadataOnMismatch: S.optional(S.Boolean),
    DatabaseName: S.optional(S.String),
    EventsPollInterval: S.optional(S.Number),
    TargetDbType: S.optional(TargetDbType),
    MaxFileSize: S.optional(S.Number),
    ParallelLoadThreads: S.optional(S.Number),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    ServerTimezone: S.optional(S.String),
    Username: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    ExecuteTimeout: S.optional(S.Number),
    ServiceAccessRoleArn: S.optional(S.String),
    AuthenticationMethod: S.optional(MySQLAuthenticationMethod),
  }),
).annotate({ identifier: "MySQLSettings" }) as any as S.Schema<MySQLSettings>;
export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export type CharLengthSemantics = "default" | "char" | "byte" | (string & {});
export const CharLengthSemantics = /*@__PURE__*/ S.String;

export type OracleAuthenticationMethod =
  | "password"
  | "kerberos"
  | (string & {});
export const OracleAuthenticationMethod = /*@__PURE__*/ S.String;

export interface OracleSettings {
  AddSupplementalLogging?: boolean;
  ArchivedLogDestId?: number;
  AdditionalArchivedLogDestId?: number;
  ExtraArchivedLogDestIds?: number[];
  AllowSelectNestedTables?: boolean;
  ParallelAsmReadThreads?: number;
  ReadAheadBlocks?: number;
  AccessAlternateDirectly?: boolean;
  UseAlternateFolderForOnline?: boolean;
  OraclePathPrefix?: string;
  UsePathPrefix?: string;
  ReplacePathPrefix?: boolean;
  EnableHomogenousTablespace?: boolean;
  DirectPathNoLog?: boolean;
  ArchivedLogsOnly?: boolean;
  AsmPassword?: string | redacted.Redacted<string>;
  AsmServer?: string;
  AsmUser?: string;
  CharLengthSemantics?: CharLengthSemantics;
  DatabaseName?: string;
  DirectPathParallelLoad?: boolean;
  FailTasksOnLobTruncation?: boolean;
  NumberDatatypeScale?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ReadTableSpaceName?: boolean;
  RetryInterval?: number;
  SecurityDbEncryption?: string | redacted.Redacted<string>;
  SecurityDbEncryptionName?: string;
  ServerName?: string;
  SpatialDataOptionToGeoJsonFunctionName?: string;
  StandbyDelayTime?: number;
  Username?: string;
  UseBFile?: boolean;
  UseDirectPathFullLoad?: boolean;
  UseLogminerReader?: boolean;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  SecretsManagerOracleAsmAccessRoleArn?: string;
  SecretsManagerOracleAsmSecretId?: string;
  TrimSpaceInChar?: boolean;
  ConvertTimestampWithZoneToUTC?: boolean;
  OpenTransactionWindow?: number;
  AuthenticationMethod?: OracleAuthenticationMethod;
}
export const OracleSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddSupplementalLogging: S.optional(S.Boolean),
    ArchivedLogDestId: S.optional(S.Number),
    AdditionalArchivedLogDestId: S.optional(S.Number),
    ExtraArchivedLogDestIds: S.optional(IntegerList),
    AllowSelectNestedTables: S.optional(S.Boolean),
    ParallelAsmReadThreads: S.optional(S.Number),
    ReadAheadBlocks: S.optional(S.Number),
    AccessAlternateDirectly: S.optional(S.Boolean),
    UseAlternateFolderForOnline: S.optional(S.Boolean),
    OraclePathPrefix: S.optional(S.String),
    UsePathPrefix: S.optional(S.String),
    ReplacePathPrefix: S.optional(S.Boolean),
    EnableHomogenousTablespace: S.optional(S.Boolean),
    DirectPathNoLog: S.optional(S.Boolean),
    ArchivedLogsOnly: S.optional(S.Boolean),
    AsmPassword: S.optional(SensitiveString),
    AsmServer: S.optional(S.String),
    AsmUser: S.optional(S.String),
    CharLengthSemantics: S.optional(CharLengthSemantics),
    DatabaseName: S.optional(S.String),
    DirectPathParallelLoad: S.optional(S.Boolean),
    FailTasksOnLobTruncation: S.optional(S.Boolean),
    NumberDatatypeScale: S.optional(S.Number),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ReadTableSpaceName: S.optional(S.Boolean),
    RetryInterval: S.optional(S.Number),
    SecurityDbEncryption: S.optional(SensitiveString),
    SecurityDbEncryptionName: S.optional(S.String),
    ServerName: S.optional(S.String),
    SpatialDataOptionToGeoJsonFunctionName: S.optional(S.String),
    StandbyDelayTime: S.optional(S.Number),
    Username: S.optional(S.String),
    UseBFile: S.optional(S.Boolean),
    UseDirectPathFullLoad: S.optional(S.Boolean),
    UseLogminerReader: S.optional(S.Boolean),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    SecretsManagerOracleAsmAccessRoleArn: S.optional(S.String),
    SecretsManagerOracleAsmSecretId: S.optional(S.String),
    TrimSpaceInChar: S.optional(S.Boolean),
    ConvertTimestampWithZoneToUTC: S.optional(S.Boolean),
    OpenTransactionWindow: S.optional(S.Number),
    AuthenticationMethod: S.optional(OracleAuthenticationMethod),
  }),
).annotate({ identifier: "OracleSettings" }) as any as S.Schema<OracleSettings>;
export interface SybaseSettings {
  DatabaseName?: string;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
}
export const SybaseSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    Username: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
  }),
).annotate({ identifier: "SybaseSettings" }) as any as S.Schema<SybaseSettings>;
export type SafeguardPolicy =
  | "rely-on-sql-server-replication-agent"
  | "exclusive-automatic-truncation"
  | "shared-automatic-truncation"
  | (string & {});
export const SafeguardPolicy = /*@__PURE__*/ S.String;

export type TlogAccessMode =
  | "BackupOnly"
  | "PreferBackup"
  | "PreferTlog"
  | "TlogOnly"
  | (string & {});
export const TlogAccessMode = /*@__PURE__*/ S.String;

export type SqlServerAuthenticationMethod =
  | "password"
  | "kerberos"
  | (string & {});
export const SqlServerAuthenticationMethod = /*@__PURE__*/ S.String;

export interface MicrosoftSQLServerSettings {
  Port?: number;
  BcpPacketSize?: number;
  DatabaseName?: string;
  ControlTablesFileGroup?: string;
  Password?: string | redacted.Redacted<string>;
  QuerySingleAlwaysOnNode?: boolean;
  ReadBackupOnly?: boolean;
  SafeguardPolicy?: SafeguardPolicy;
  ServerName?: string;
  Username?: string;
  UseBcpFullLoad?: boolean;
  UseThirdPartyBackupDevice?: boolean;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  TrimSpaceInChar?: boolean;
  TlogAccessMode?: TlogAccessMode;
  ForceLobLookup?: boolean;
  AuthenticationMethod?: SqlServerAuthenticationMethod;
}
export const MicrosoftSQLServerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Port: S.optional(S.Number),
    BcpPacketSize: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    ControlTablesFileGroup: S.optional(S.String),
    Password: S.optional(SensitiveString),
    QuerySingleAlwaysOnNode: S.optional(S.Boolean),
    ReadBackupOnly: S.optional(S.Boolean),
    SafeguardPolicy: S.optional(SafeguardPolicy),
    ServerName: S.optional(S.String),
    Username: S.optional(S.String),
    UseBcpFullLoad: S.optional(S.Boolean),
    UseThirdPartyBackupDevice: S.optional(S.Boolean),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    TrimSpaceInChar: S.optional(S.Boolean),
    TlogAccessMode: S.optional(TlogAccessMode),
    ForceLobLookup: S.optional(S.Boolean),
    AuthenticationMethod: S.optional(SqlServerAuthenticationMethod),
  }),
).annotate({
  identifier: "MicrosoftSQLServerSettings",
}) as any as S.Schema<MicrosoftSQLServerSettings>;
export interface IBMDb2Settings {
  DatabaseName?: string;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  SetDataCaptureChanges?: boolean;
  CurrentLsn?: string;
  MaxKBytesPerRead?: number;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  LoadTimeout?: number;
  WriteBufferSize?: number;
  MaxFileSize?: number;
  KeepCsvFiles?: boolean;
}
export const IBMDb2Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    SetDataCaptureChanges: S.optional(S.Boolean),
    CurrentLsn: S.optional(S.String),
    MaxKBytesPerRead: S.optional(S.Number),
    Username: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    LoadTimeout: S.optional(S.Number),
    WriteBufferSize: S.optional(S.Number),
    MaxFileSize: S.optional(S.Number),
    KeepCsvFiles: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IBMDb2Settings" }) as any as S.Schema<IBMDb2Settings>;
export interface DocDbSettings {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  NestingLevel?: NestingLevelValue;
  ExtractDocId?: boolean;
  DocsToInvestigate?: number;
  KmsKeyId?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
  UseUpdateLookUp?: boolean;
  ReplicateShardCollections?: boolean;
}
export const DocDbSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    NestingLevel: S.optional(NestingLevelValue),
    ExtractDocId: S.optional(S.Boolean),
    DocsToInvestigate: S.optional(S.Number),
    KmsKeyId: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
    UseUpdateLookUp: S.optional(S.Boolean),
    ReplicateShardCollections: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DocDbSettings" }) as any as S.Schema<DocDbSettings>;
export type SslSecurityProtocolValue =
  | "plaintext"
  | "ssl-encryption"
  | (string & {});
export const SslSecurityProtocolValue = /*@__PURE__*/ S.String;

export type RedisAuthTypeValue =
  | "none"
  | "auth-role"
  | "auth-token"
  | (string & {});
export const RedisAuthTypeValue = /*@__PURE__*/ S.String;

export interface RedisSettings {
  ServerName: string;
  Port: number;
  SslSecurityProtocol?: SslSecurityProtocolValue;
  AuthType?: RedisAuthTypeValue;
  AuthUserName?: string;
  AuthPassword?: string | redacted.Redacted<string>;
  SslCaCertificateArn?: string;
}
export const RedisSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerName: S.String,
    Port: S.Number,
    SslSecurityProtocol: S.optional(SslSecurityProtocolValue),
    AuthType: S.optional(RedisAuthTypeValue),
    AuthUserName: S.optional(S.String),
    AuthPassword: S.optional(SensitiveString),
    SslCaCertificateArn: S.optional(S.String),
  }),
).annotate({ identifier: "RedisSettings" }) as any as S.Schema<RedisSettings>;
export interface GcpMySQLSettings {
  AfterConnectScript?: string;
  CleanSourceMetadataOnMismatch?: boolean;
  DatabaseName?: string;
  EventsPollInterval?: number;
  TargetDbType?: TargetDbType;
  MaxFileSize?: number;
  ParallelLoadThreads?: number;
  Password?: string | redacted.Redacted<string>;
  Port?: number;
  ServerName?: string;
  ServerTimezone?: string;
  Username?: string;
  SecretsManagerAccessRoleArn?: string;
  SecretsManagerSecretId?: string;
}
export const GcpMySQLSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfterConnectScript: S.optional(S.String),
    CleanSourceMetadataOnMismatch: S.optional(S.Boolean),
    DatabaseName: S.optional(S.String),
    EventsPollInterval: S.optional(S.Number),
    TargetDbType: S.optional(TargetDbType),
    MaxFileSize: S.optional(S.Number),
    ParallelLoadThreads: S.optional(S.Number),
    Password: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    ServerName: S.optional(S.String),
    ServerTimezone: S.optional(S.String),
    Username: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    SecretsManagerSecretId: S.optional(S.String),
  }),
).annotate({
  identifier: "GcpMySQLSettings",
}) as any as S.Schema<GcpMySQLSettings>;
export interface TimestreamSettings {
  DatabaseName: string;
  MemoryDuration: number;
  MagneticDuration: number;
  CdcInsertsAndUpdates?: boolean;
  EnableMagneticStoreWrites?: boolean;
}
export const TimestreamSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    MemoryDuration: S.Number,
    MagneticDuration: S.Number,
    CdcInsertsAndUpdates: S.optional(S.Boolean),
    EnableMagneticStoreWrites: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "TimestreamSettings",
}) as any as S.Schema<TimestreamSettings>;
export interface CreateEndpointMessage {
  EndpointIdentifier: string;
  EndpointType: ReplicationEndpointTypeValue;
  EngineName: string;
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  ResourceIdentifier?: string;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
}
export const CreateEndpointMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointIdentifier: S.String,
    EndpointType: ReplicationEndpointTypeValue,
    EngineName: S.String,
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    ExtraConnectionAttributes: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
    CertificateArn: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    ServiceAccessRoleArn: S.optional(S.String),
    ExternalTableDefinition: S.optional(S.String),
    DynamoDbSettings: S.optional(DynamoDbSettings),
    S3Settings: S.optional(S3Settings),
    DmsTransferSettings: S.optional(DmsTransferSettings),
    MongoDbSettings: S.optional(MongoDbSettings),
    KinesisSettings: S.optional(KinesisSettings),
    KafkaSettings: S.optional(KafkaSettings),
    ElasticsearchSettings: S.optional(ElasticsearchSettings),
    NeptuneSettings: S.optional(NeptuneSettings),
    RedshiftSettings: S.optional(RedshiftSettings),
    PostgreSQLSettings: S.optional(PostgreSQLSettings),
    MySQLSettings: S.optional(MySQLSettings),
    OracleSettings: S.optional(OracleSettings),
    SybaseSettings: S.optional(SybaseSettings),
    MicrosoftSQLServerSettings: S.optional(MicrosoftSQLServerSettings),
    IBMDb2Settings: S.optional(IBMDb2Settings),
    ResourceIdentifier: S.optional(S.String),
    DocDbSettings: S.optional(DocDbSettings),
    RedisSettings: S.optional(RedisSettings),
    GcpMySQLSettings: S.optional(GcpMySQLSettings),
    TimestreamSettings: S.optional(TimestreamSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEndpointMessage",
}) as any as S.Schema<CreateEndpointMessage>;
export interface LakehouseSettings {
  Arn: string;
}
export const LakehouseSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }),
).annotate({
  identifier: "LakehouseSettings",
}) as any as S.Schema<LakehouseSettings>;
export interface Endpoint {
  EndpointIdentifier?: string;
  EndpointType?: ReplicationEndpointTypeValue;
  EngineName?: string;
  EngineDisplayName?: string;
  Username?: string;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  Status?: string;
  KmsKeyId?: string;
  EndpointArn?: string;
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  ExternalId?: string;
  IsReadOnly?: boolean;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
  LakehouseSettings?: LakehouseSettings;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointIdentifier: S.optional(S.String),
    EndpointType: S.optional(ReplicationEndpointTypeValue),
    EngineName: S.optional(S.String),
    EngineDisplayName: S.optional(S.String),
    Username: S.optional(S.String),
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    ExtraConnectionAttributes: S.optional(S.String),
    Status: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    EndpointArn: S.optional(S.String),
    CertificateArn: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    ServiceAccessRoleArn: S.optional(S.String),
    ExternalTableDefinition: S.optional(S.String),
    ExternalId: S.optional(S.String),
    IsReadOnly: S.optional(S.Boolean),
    DynamoDbSettings: S.optional(DynamoDbSettings),
    S3Settings: S.optional(S3Settings),
    DmsTransferSettings: S.optional(DmsTransferSettings),
    MongoDbSettings: S.optional(MongoDbSettings),
    KinesisSettings: S.optional(KinesisSettings),
    KafkaSettings: S.optional(KafkaSettings),
    ElasticsearchSettings: S.optional(ElasticsearchSettings),
    NeptuneSettings: S.optional(NeptuneSettings),
    RedshiftSettings: S.optional(RedshiftSettings),
    PostgreSQLSettings: S.optional(PostgreSQLSettings),
    MySQLSettings: S.optional(MySQLSettings),
    OracleSettings: S.optional(OracleSettings),
    SybaseSettings: S.optional(SybaseSettings),
    MicrosoftSQLServerSettings: S.optional(MicrosoftSQLServerSettings),
    IBMDb2Settings: S.optional(IBMDb2Settings),
    DocDbSettings: S.optional(DocDbSettings),
    RedisSettings: S.optional(RedisSettings),
    GcpMySQLSettings: S.optional(GcpMySQLSettings),
    TimestreamSettings: S.optional(TimestreamSettings),
    LakehouseSettings: S.optional(LakehouseSettings),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export interface CreateEndpointResponse {
  Endpoint?: Endpoint;
}
export const CreateEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(Endpoint) }).pipe(ns),
).annotate({
  identifier: "CreateEndpointResponse",
}) as any as S.Schema<CreateEndpointResponse>;
export type EventCategoriesList = string[];
export const EventCategoriesList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("EventCategory")),
);
export type SourceIdsList = string[];
export const SourceIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SourceId")),
);
export interface CreateEventSubscriptionMessage {
  SubscriptionName: string;
  SnsTopicArn: string;
  SourceType?: string;
  EventCategories?: string[];
  SourceIds?: string[];
  Enabled?: boolean;
  Tags?: Tag[];
}
export const CreateEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.String,
    SnsTopicArn: S.String,
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    SourceIds: S.optional(SourceIdsList),
    Enabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventSubscriptionMessage",
}) as any as S.Schema<CreateEventSubscriptionMessage>;
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Enabled?: boolean;
}
export const EventSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerAwsId: S.optional(S.String),
    CustSubscriptionId: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    Status: S.optional(S.String),
    SubscriptionCreationTime: S.optional(S.String),
    SourceType: S.optional(S.String),
    SourceIdsList: S.optional(SourceIdsList),
    EventCategoriesList: S.optional(EventCategoriesList),
    Enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EventSubscription",
}) as any as S.Schema<EventSubscription>;
export interface CreateEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export const CreateEventSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "CreateEventSubscriptionResponse",
}) as any as S.Schema<CreateEventSubscriptionResponse>;
export interface CreateFleetAdvisorCollectorRequest {
  CollectorName: string;
  Description?: string;
  ServiceAccessRoleArn: string;
  S3BucketName: string;
}
export const CreateFleetAdvisorCollectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectorName: S.String,
    Description: S.optional(S.String),
    ServiceAccessRoleArn: S.String,
    S3BucketName: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetAdvisorCollectorRequest",
}) as any as S.Schema<CreateFleetAdvisorCollectorRequest>;
export interface CreateFleetAdvisorCollectorResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
  Description?: string;
  ServiceAccessRoleArn?: string;
  S3BucketName?: string;
}
export const CreateFleetAdvisorCollectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectorReferencedId: S.optional(S.String),
    CollectorName: S.optional(S.String),
    Description: S.optional(S.String),
    ServiceAccessRoleArn: S.optional(S.String),
    S3BucketName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateFleetAdvisorCollectorResponse",
}) as any as S.Schema<CreateFleetAdvisorCollectorResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface CreateInstanceProfileMessage {
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export const CreateInstanceProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    NetworkType: S.optional(S.String),
    InstanceProfileName: S.optional(S.String),
    Description: S.optional(S.String),
    SubnetGroupIdentifier: S.optional(S.String),
    VpcSecurityGroups: S.optional(StringList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInstanceProfileMessage",
}) as any as S.Schema<CreateInstanceProfileMessage>;
export interface InstanceProfile {
  InstanceProfileArn?: string;
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  InstanceProfileCreationTime?: Date;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export const InstanceProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceProfileArn: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    NetworkType: S.optional(S.String),
    InstanceProfileName: S.optional(S.String),
    Description: S.optional(S.String),
    InstanceProfileCreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SubnetGroupIdentifier: S.optional(S.String),
    VpcSecurityGroups: S.optional(StringList),
  }),
).annotate({
  identifier: "InstanceProfile",
}) as any as S.Schema<InstanceProfile>;
export interface CreateInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export const CreateInstanceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "CreateInstanceProfileResponse",
}) as any as S.Schema<CreateInstanceProfileResponse>;
export interface DataProviderDescriptorDefinition {
  DataProviderIdentifier: string;
  SecretsManagerSecretId?: string;
  SecretsManagerAccessRoleArn?: string;
}
export const DataProviderDescriptorDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataProviderIdentifier: S.String,
    SecretsManagerSecretId: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataProviderDescriptorDefinition",
}) as any as S.Schema<DataProviderDescriptorDefinition>;
export type DataProviderDescriptorDefinitionList =
  DataProviderDescriptorDefinition[];
export const DataProviderDescriptorDefinitionList = /*@__PURE__*/ S.Array(
  DataProviderDescriptorDefinition,
);
export interface SCApplicationAttributes {
  S3BucketPath?: string;
  S3BucketRoleArn?: string;
}
export const SCApplicationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketPath: S.optional(S.String),
    S3BucketRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SCApplicationAttributes",
}) as any as S.Schema<SCApplicationAttributes>;
export interface CreateMigrationProjectMessage {
  MigrationProjectName?: string;
  SourceDataProviderDescriptors: DataProviderDescriptorDefinition[];
  TargetDataProviderDescriptors: DataProviderDescriptorDefinition[];
  InstanceProfileIdentifier: string;
  TransformationRules?: string;
  Description?: string;
  Tags?: Tag[];
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export const CreateMigrationProjectMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectName: S.optional(S.String),
    SourceDataProviderDescriptors: DataProviderDescriptorDefinitionList,
    TargetDataProviderDescriptors: DataProviderDescriptorDefinitionList,
    InstanceProfileIdentifier: S.String,
    TransformationRules: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
    SchemaConversionApplicationAttributes: S.optional(SCApplicationAttributes),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMigrationProjectMessage",
}) as any as S.Schema<CreateMigrationProjectMessage>;
export interface DataProviderDescriptor {
  SecretsManagerSecretId?: string;
  SecretsManagerAccessRoleArn?: string;
  DataProviderName?: string;
  DataProviderArn?: string;
}
export const DataProviderDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretsManagerSecretId: S.optional(S.String),
    SecretsManagerAccessRoleArn: S.optional(S.String),
    DataProviderName: S.optional(S.String),
    DataProviderArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataProviderDescriptor",
}) as any as S.Schema<DataProviderDescriptor>;
export type DataProviderDescriptorList = DataProviderDescriptor[];
export const DataProviderDescriptorList = /*@__PURE__*/ S.Array(
  DataProviderDescriptor,
);
export interface MigrationProject {
  MigrationProjectName?: string;
  MigrationProjectArn?: string;
  MigrationProjectCreationTime?: Date;
  SourceDataProviderDescriptors?: DataProviderDescriptor[];
  TargetDataProviderDescriptors?: DataProviderDescriptor[];
  InstanceProfileArn?: string;
  InstanceProfileName?: string;
  TransformationRules?: string;
  Description?: string;
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export const MigrationProject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectName: S.optional(S.String),
    MigrationProjectArn: S.optional(S.String),
    MigrationProjectCreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SourceDataProviderDescriptors: S.optional(DataProviderDescriptorList),
    TargetDataProviderDescriptors: S.optional(DataProviderDescriptorList),
    InstanceProfileArn: S.optional(S.String),
    InstanceProfileName: S.optional(S.String),
    TransformationRules: S.optional(S.String),
    Description: S.optional(S.String),
    SchemaConversionApplicationAttributes: S.optional(SCApplicationAttributes),
  }),
).annotate({
  identifier: "MigrationProject",
}) as any as S.Schema<MigrationProject>;
export interface CreateMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export const CreateMigrationProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MigrationProject: S.optional(MigrationProject) }).pipe(ns),
).annotate({
  identifier: "CreateMigrationProjectResponse",
}) as any as S.Schema<CreateMigrationProjectResponse>;
export interface ComputeConfig {
  AvailabilityZone?: string;
  DnsNameServers?: string;
  KmsKeyId?: string;
  MaxCapacityUnits?: number;
  MinCapacityUnits?: number;
  MultiAZ?: boolean;
  PreferredMaintenanceWindow?: string;
  ReplicationSubnetGroupId?: string;
  VpcSecurityGroupIds?: string[];
}
export const ComputeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    DnsNameServers: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    MaxCapacityUnits: S.optional(S.Number),
    MinCapacityUnits: S.optional(S.Number),
    MultiAZ: S.optional(S.Boolean),
    PreferredMaintenanceWindow: S.optional(S.String),
    ReplicationSubnetGroupId: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(StringList),
  }),
).annotate({ identifier: "ComputeConfig" }) as any as S.Schema<ComputeConfig>;
export interface CreateReplicationConfigMessage {
  ReplicationConfigIdentifier: string;
  SourceEndpointArn: string;
  TargetEndpointArn: string;
  ComputeConfig: ComputeConfig;
  ReplicationType: MigrationTypeValue;
  TableMappings: string;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  ResourceIdentifier?: string;
  Tags?: Tag[];
}
export const CreateReplicationConfigMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigIdentifier: S.String,
    SourceEndpointArn: S.String,
    TargetEndpointArn: S.String,
    ComputeConfig: ComputeConfig,
    ReplicationType: MigrationTypeValue,
    TableMappings: S.String,
    ReplicationSettings: S.optional(S.String),
    SupplementalSettings: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationConfigMessage",
}) as any as S.Schema<CreateReplicationConfigMessage>;
export interface ReplicationConfig {
  ReplicationConfigIdentifier?: string;
  ReplicationConfigArn?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationType?: MigrationTypeValue;
  ComputeConfig?: ComputeConfig;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  TableMappings?: string;
  ReplicationConfigCreateTime?: Date;
  ReplicationConfigUpdateTime?: Date;
  IsReadOnly?: boolean;
}
export const ReplicationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigIdentifier: S.optional(S.String),
    ReplicationConfigArn: S.optional(S.String),
    SourceEndpointArn: S.optional(S.String),
    TargetEndpointArn: S.optional(S.String),
    ReplicationType: S.optional(MigrationTypeValue),
    ComputeConfig: S.optional(ComputeConfig),
    ReplicationSettings: S.optional(S.String),
    SupplementalSettings: S.optional(S.String),
    TableMappings: S.optional(S.String),
    ReplicationConfigCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicationConfigUpdateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsReadOnly: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ReplicationConfig",
}) as any as S.Schema<ReplicationConfig>;
export interface CreateReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export const CreateReplicationConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfig: S.optional(ReplicationConfig) }).pipe(ns),
).annotate({
  identifier: "CreateReplicationConfigResponse",
}) as any as S.Schema<CreateReplicationConfigResponse>;
export type ReplicationInstanceClass = string;
export type VpcSecurityGroupIdList = string[];
export const VpcSecurityGroupIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("VpcSecurityGroupId")),
);
export interface KerberosAuthenticationSettings {
  KeyCacheSecretId?: string;
  KeyCacheSecretIamArn?: string;
  Krb5FileContents?: string;
}
export const KerberosAuthenticationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyCacheSecretId: S.optional(S.String),
    KeyCacheSecretIamArn: S.optional(S.String),
    Krb5FileContents: S.optional(S.String),
  }),
).annotate({
  identifier: "KerberosAuthenticationSettings",
}) as any as S.Schema<KerberosAuthenticationSettings>;
export interface CreateReplicationInstanceMessage {
  ReplicationInstanceIdentifier: string;
  AllocatedStorage?: number;
  ReplicationInstanceClass: string;
  VpcSecurityGroupIds?: string[];
  AvailabilityZone?: string;
  ReplicationSubnetGroupIdentifier?: string;
  PreferredMaintenanceWindow?: string;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  Tags?: Tag[];
  KmsKeyId?: string;
  PubliclyAccessible?: boolean;
  DnsNameServers?: string;
  ResourceIdentifier?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export const CreateReplicationInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceIdentifier: S.String,
    AllocatedStorage: S.optional(S.Number),
    ReplicationInstanceClass: S.String,
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    AvailabilityZone: S.optional(S.String),
    ReplicationSubnetGroupIdentifier: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    DnsNameServers: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
    NetworkType: S.optional(S.String),
    KerberosAuthenticationSettings: S.optional(KerberosAuthenticationSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationInstanceMessage",
}) as any as S.Schema<CreateReplicationInstanceMessage>;
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export const VpcSecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcSecurityGroupId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcSecurityGroupMembership",
}) as any as S.Schema<VpcSecurityGroupMembership>;
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export const VpcSecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  VpcSecurityGroupMembership.pipe(
    T.XmlName("VpcSecurityGroupMembership"),
  ).annotate({ identifier: "VpcSecurityGroupMembership" }),
);
export interface AvailabilityZone {
  Name?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export const Subnet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIdentifier: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(AvailabilityZone),
    SubnetStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Subnet" }) as any as S.Schema<Subnet>;
export type SubnetList = Subnet[];
export const SubnetList = /*@__PURE__*/ S.Array(
  Subnet.pipe(T.XmlName("Subnet")).annotate({ identifier: "Subnet" }),
);
export interface ReplicationSubnetGroup {
  ReplicationSubnetGroupIdentifier?: string;
  ReplicationSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  SupportedNetworkTypes?: string[];
  IsReadOnly?: boolean;
}
export const ReplicationSubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationSubnetGroupIdentifier: S.optional(S.String),
    ReplicationSubnetGroupDescription: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetGroupStatus: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    SupportedNetworkTypes: S.optional(StringList),
    IsReadOnly: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ReplicationSubnetGroup",
}) as any as S.Schema<ReplicationSubnetGroup>;
export interface ReplicationPendingModifiedValues {
  ReplicationInstanceClass?: string;
  AllocatedStorage?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  NetworkType?: string;
}
export const ReplicationPendingModifiedValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceClass: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    NetworkType: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationPendingModifiedValues",
}) as any as S.Schema<ReplicationPendingModifiedValues>;
export type ReplicationInstancePublicIpAddressList = string[];
export const ReplicationInstancePublicIpAddressList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReplicationInstancePrivateIpAddressList = string[];
export const ReplicationInstancePrivateIpAddressList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReplicationInstanceIpv6AddressList = string[];
export const ReplicationInstanceIpv6AddressList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ReplicationInstance {
  ReplicationInstanceIdentifier?: string;
  ReplicationInstanceClass?: string;
  ReplicationInstanceStatus?: string;
  AllocatedStorage?: number;
  InstanceCreateTime?: Date;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  AvailabilityZone?: string;
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: ReplicationPendingModifiedValues;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  KmsKeyId?: string;
  ReplicationInstanceArn?: string;
  ReplicationInstancePublicIpAddress?: string;
  ReplicationInstancePrivateIpAddress?: string;
  ReplicationInstancePublicIpAddresses?: string[];
  ReplicationInstancePrivateIpAddresses?: string[];
  ReplicationInstanceIpv6Addresses?: string[];
  PubliclyAccessible?: boolean;
  SecondaryAvailabilityZone?: string;
  FreeUntil?: Date;
  DnsNameServers?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export const ReplicationInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceIdentifier: S.optional(S.String),
    ReplicationInstanceClass: S.optional(S.String),
    ReplicationInstanceStatus: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    InstanceCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    AvailabilityZone: S.optional(S.String),
    ReplicationSubnetGroup: S.optional(ReplicationSubnetGroup),
    PreferredMaintenanceWindow: S.optional(S.String),
    PendingModifiedValues: S.optional(ReplicationPendingModifiedValues),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    ReplicationInstanceArn: S.optional(S.String),
    ReplicationInstancePublicIpAddress: S.optional(S.String),
    ReplicationInstancePrivateIpAddress: S.optional(S.String),
    ReplicationInstancePublicIpAddresses: S.optional(
      ReplicationInstancePublicIpAddressList,
    ),
    ReplicationInstancePrivateIpAddresses: S.optional(
      ReplicationInstancePrivateIpAddressList,
    ),
    ReplicationInstanceIpv6Addresses: S.optional(
      ReplicationInstanceIpv6AddressList,
    ),
    PubliclyAccessible: S.optional(S.Boolean),
    SecondaryAvailabilityZone: S.optional(S.String),
    FreeUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DnsNameServers: S.optional(S.String),
    NetworkType: S.optional(S.String),
    KerberosAuthenticationSettings: S.optional(KerberosAuthenticationSettings),
  }),
).annotate({
  identifier: "ReplicationInstance",
}) as any as S.Schema<ReplicationInstance>;
export interface CreateReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export const CreateReplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstance: S.optional(ReplicationInstance) }).pipe(ns),
).annotate({
  identifier: "CreateReplicationInstanceResponse",
}) as any as S.Schema<CreateReplicationInstanceResponse>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SubnetIdentifier")),
);
export interface CreateReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
  ReplicationSubnetGroupDescription: string;
  SubnetIds: string[];
  Tags?: Tag[];
}
export const CreateReplicationSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationSubnetGroupIdentifier: S.String,
    ReplicationSubnetGroupDescription: S.String,
    SubnetIds: SubnetIdentifierList,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationSubnetGroupMessage",
}) as any as S.Schema<CreateReplicationSubnetGroupMessage>;
export interface CreateReplicationSubnetGroupResponse {
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
}
export const CreateReplicationSubnetGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReplicationSubnetGroup: S.optional(ReplicationSubnetGroup),
    }).pipe(ns),
).annotate({
  identifier: "CreateReplicationSubnetGroupResponse",
}) as any as S.Schema<CreateReplicationSubnetGroupResponse>;
export interface CreateReplicationTaskMessage {
  ReplicationTaskIdentifier: string;
  SourceEndpointArn: string;
  TargetEndpointArn: string;
  ReplicationInstanceArn: string;
  MigrationType: MigrationTypeValue;
  TableMappings: string;
  ReplicationTaskSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  Tags?: Tag[];
  TaskData?: string;
  ResourceIdentifier?: string;
}
export const CreateReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskIdentifier: S.String,
    SourceEndpointArn: S.String,
    TargetEndpointArn: S.String,
    ReplicationInstanceArn: S.String,
    MigrationType: MigrationTypeValue,
    TableMappings: S.String,
    ReplicationTaskSettings: S.optional(S.String),
    CdcStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
    Tags: S.optional(TagList),
    TaskData: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationTaskMessage",
}) as any as S.Schema<CreateReplicationTaskMessage>;
export interface ReplicationTaskStats {
  FullLoadProgressPercent?: number;
  ElapsedTimeMillis?: number;
  TablesLoaded?: number;
  TablesLoading?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  FreshStartDate?: Date;
  StartDate?: Date;
  StopDate?: Date;
  FullLoadStartDate?: Date;
  FullLoadFinishDate?: Date;
}
export const ReplicationTaskStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FullLoadProgressPercent: S.optional(S.Number),
    ElapsedTimeMillis: S.optional(S.Number),
    TablesLoaded: S.optional(S.Number),
    TablesLoading: S.optional(S.Number),
    TablesQueued: S.optional(S.Number),
    TablesErrored: S.optional(S.Number),
    FreshStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FullLoadStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FullLoadFinishDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReplicationTaskStats",
}) as any as S.Schema<ReplicationTaskStats>;
export interface ReplicationTask {
  ReplicationTaskIdentifier?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationInstanceArn?: string;
  MigrationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationTaskSettings?: string;
  Status?: string;
  LastFailureMessage?: string;
  StopReason?: string;
  ReplicationTaskCreationDate?: Date;
  ReplicationTaskStartDate?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  RecoveryCheckpoint?: string;
  ReplicationTaskArn?: string;
  ReplicationTaskStats?: ReplicationTaskStats;
  TaskData?: string;
  TargetReplicationInstanceArn?: string;
}
export const ReplicationTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskIdentifier: S.optional(S.String),
    SourceEndpointArn: S.optional(S.String),
    TargetEndpointArn: S.optional(S.String),
    ReplicationInstanceArn: S.optional(S.String),
    MigrationType: S.optional(MigrationTypeValue),
    TableMappings: S.optional(S.String),
    ReplicationTaskSettings: S.optional(S.String),
    Status: S.optional(S.String),
    LastFailureMessage: S.optional(S.String),
    StopReason: S.optional(S.String),
    ReplicationTaskCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicationTaskStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
    RecoveryCheckpoint: S.optional(S.String),
    ReplicationTaskArn: S.optional(S.String),
    ReplicationTaskStats: S.optional(ReplicationTaskStats),
    TaskData: S.optional(S.String),
    TargetReplicationInstanceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationTask",
}) as any as S.Schema<ReplicationTask>;
export interface CreateReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const CreateReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "CreateReplicationTaskResponse",
}) as any as S.Schema<CreateReplicationTaskResponse>;
export interface DeleteCertificateMessage {
  CertificateArn: string;
}
export const DeleteCertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCertificateMessage",
}) as any as S.Schema<DeleteCertificateMessage>;
export type CertificateWallet = Uint8Array;
export interface Certificate {
  CertificateIdentifier?: string;
  CertificateCreationDate?: Date;
  CertificatePem?: string;
  CertificateWallet?: Uint8Array;
  CertificateArn?: string;
  CertificateOwner?: string;
  ValidFromDate?: Date;
  ValidToDate?: Date;
  SigningAlgorithm?: string;
  KeyLength?: number;
  KmsKeyId?: string;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateIdentifier: S.optional(S.String),
    CertificateCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CertificatePem: S.optional(S.String),
    CertificateWallet: S.optional(T.Blob),
    CertificateArn: S.optional(S.String),
    CertificateOwner: S.optional(S.String),
    ValidFromDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ValidToDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SigningAlgorithm: S.optional(S.String),
    KeyLength: S.optional(S.Number),
    KmsKeyId: S.optional(S.String),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export interface DeleteCertificateResponse {
  Certificate?: Certificate;
}
export const DeleteCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Certificate: S.optional(Certificate) }).pipe(ns),
).annotate({
  identifier: "DeleteCertificateResponse",
}) as any as S.Schema<DeleteCertificateResponse>;
export interface DeleteConnectionMessage {
  EndpointArn: string;
  ReplicationInstanceArn: string;
}
export const DeleteConnectionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointArn: S.String, ReplicationInstanceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionMessage",
}) as any as S.Schema<DeleteConnectionMessage>;
export interface Connection {
  ReplicationInstanceArn?: string;
  EndpointArn?: string;
  Status?: string;
  LastFailureMessage?: string;
  EndpointIdentifier?: string;
  ReplicationInstanceIdentifier?: string;
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceArn: S.optional(S.String),
    EndpointArn: S.optional(S.String),
    Status: S.optional(S.String),
    LastFailureMessage: S.optional(S.String),
    EndpointIdentifier: S.optional(S.String),
    ReplicationInstanceIdentifier: S.optional(S.String),
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface DeleteConnectionResponse {
  Connection?: Connection;
}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(Connection) }).pipe(ns),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export interface DeleteDataMigrationMessage {
  DataMigrationIdentifier: string;
}
export const DeleteDataMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigrationIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataMigrationMessage",
}) as any as S.Schema<DeleteDataMigrationMessage>;
export interface DeleteDataMigrationResponse {
  DataMigration?: DataMigration;
}
export const DeleteDataMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigration: S.optional(DataMigration) }).pipe(ns),
).annotate({
  identifier: "DeleteDataMigrationResponse",
}) as any as S.Schema<DeleteDataMigrationResponse>;
export interface DeleteDataProviderMessage {
  DataProviderIdentifier: string;
}
export const DeleteDataProviderMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataProviderIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataProviderMessage",
}) as any as S.Schema<DeleteDataProviderMessage>;
export interface DeleteDataProviderResponse {
  DataProvider?: DataProvider;
}
export const DeleteDataProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataProvider: S.optional(DataProvider) }).pipe(ns),
).annotate({
  identifier: "DeleteDataProviderResponse",
}) as any as S.Schema<DeleteDataProviderResponse>;
export interface DeleteEndpointMessage {
  EndpointArn: string;
}
export const DeleteEndpointMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEndpointMessage",
}) as any as S.Schema<DeleteEndpointMessage>;
export interface DeleteEndpointResponse {
  Endpoint?: Endpoint;
}
export const DeleteEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(Endpoint) }).pipe(ns),
).annotate({
  identifier: "DeleteEndpointResponse",
}) as any as S.Schema<DeleteEndpointResponse>;
export interface DeleteEventSubscriptionMessage {
  SubscriptionName: string;
}
export const DeleteEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventSubscriptionMessage",
}) as any as S.Schema<DeleteEventSubscriptionMessage>;
export interface DeleteEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export const DeleteEventSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "DeleteEventSubscriptionResponse",
}) as any as S.Schema<DeleteEventSubscriptionResponse>;
export interface DeleteCollectorRequest {
  CollectorReferencedId: string;
}
export const DeleteCollectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CollectorReferencedId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCollectorRequest",
}) as any as S.Schema<DeleteCollectorRequest>;
export interface DeleteFleetAdvisorCollectorResponse {}
export const DeleteFleetAdvisorCollectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteFleetAdvisorCollectorResponse",
}) as any as S.Schema<DeleteFleetAdvisorCollectorResponse>;
export interface DeleteFleetAdvisorDatabasesRequest {
  DatabaseIds: string[];
}
export const DeleteFleetAdvisorDatabasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseIds: StringList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetAdvisorDatabasesRequest",
}) as any as S.Schema<DeleteFleetAdvisorDatabasesRequest>;
export interface DeleteFleetAdvisorDatabasesResponse {
  DatabaseIds?: string[];
}
export const DeleteFleetAdvisorDatabasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseIds: S.optional(StringList) }).pipe(ns),
).annotate({
  identifier: "DeleteFleetAdvisorDatabasesResponse",
}) as any as S.Schema<DeleteFleetAdvisorDatabasesResponse>;
export interface DeleteInstanceProfileMessage {
  InstanceProfileIdentifier: string;
}
export const DeleteInstanceProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceProfileIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInstanceProfileMessage",
}) as any as S.Schema<DeleteInstanceProfileMessage>;
export interface DeleteInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export const DeleteInstanceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "DeleteInstanceProfileResponse",
}) as any as S.Schema<DeleteInstanceProfileResponse>;
export interface DeleteMigrationProjectMessage {
  MigrationProjectIdentifier: string;
}
export const DeleteMigrationProjectMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MigrationProjectIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMigrationProjectMessage",
}) as any as S.Schema<DeleteMigrationProjectMessage>;
export interface DeleteMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export const DeleteMigrationProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MigrationProject: S.optional(MigrationProject) }).pipe(ns),
).annotate({
  identifier: "DeleteMigrationProjectResponse",
}) as any as S.Schema<DeleteMigrationProjectResponse>;
export interface DeleteReplicationConfigMessage {
  ReplicationConfigArn: string;
}
export const DeleteReplicationConfigMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfigArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationConfigMessage",
}) as any as S.Schema<DeleteReplicationConfigMessage>;
export interface DeleteReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export const DeleteReplicationConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfig: S.optional(ReplicationConfig) }).pipe(ns),
).annotate({
  identifier: "DeleteReplicationConfigResponse",
}) as any as S.Schema<DeleteReplicationConfigResponse>;
export interface DeleteReplicationInstanceMessage {
  ReplicationInstanceArn: string;
}
export const DeleteReplicationInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstanceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationInstanceMessage",
}) as any as S.Schema<DeleteReplicationInstanceMessage>;
export interface DeleteReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export const DeleteReplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstance: S.optional(ReplicationInstance) }).pipe(ns),
).annotate({
  identifier: "DeleteReplicationInstanceResponse",
}) as any as S.Schema<DeleteReplicationInstanceResponse>;
export interface DeleteReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
}
export const DeleteReplicationSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationSubnetGroupIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationSubnetGroupMessage",
}) as any as S.Schema<DeleteReplicationSubnetGroupMessage>;
export interface DeleteReplicationSubnetGroupResponse {}
export const DeleteReplicationSubnetGroupResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteReplicationSubnetGroupResponse",
}) as any as S.Schema<DeleteReplicationSubnetGroupResponse>;
export interface DeleteReplicationTaskMessage {
  ReplicationTaskArn: string;
}
export const DeleteReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTaskArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationTaskMessage",
}) as any as S.Schema<DeleteReplicationTaskMessage>;
export interface DeleteReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const DeleteReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "DeleteReplicationTaskResponse",
}) as any as S.Schema<DeleteReplicationTaskResponse>;
export interface DeleteReplicationTaskAssessmentRunMessage {
  ReplicationTaskAssessmentRunArn: string;
}
export const DeleteReplicationTaskAssessmentRunMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ReplicationTaskAssessmentRunArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteReplicationTaskAssessmentRunMessage",
  }) as any as S.Schema<DeleteReplicationTaskAssessmentRunMessage>;
export interface DeleteReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export const DeleteReplicationTaskAssessmentRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationTaskAssessmentRun: S.optional(ReplicationTaskAssessmentRun),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteReplicationTaskAssessmentRunResponse",
  }) as any as S.Schema<DeleteReplicationTaskAssessmentRunResponse>;
export interface DescribeAccountAttributesMessage {}
export const DescribeAccountAttributesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountAttributesMessage",
}) as any as S.Schema<DescribeAccountAttributesMessage>;
export interface AccountQuota {
  AccountQuotaName?: string;
  Used?: number;
  Max?: number;
}
export const AccountQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountQuotaName: S.optional(S.String),
    Used: S.optional(S.Number),
    Max: S.optional(S.Number),
  }),
).annotate({ identifier: "AccountQuota" }) as any as S.Schema<AccountQuota>;
export type AccountQuotaList = AccountQuota[];
export const AccountQuotaList = /*@__PURE__*/ S.Array(
  AccountQuota.pipe(T.XmlName("AccountQuota")).annotate({
    identifier: "AccountQuota",
  }),
);
export interface DescribeAccountAttributesResponse {
  AccountQuotas?: AccountQuota[];
  UniqueAccountIdentifier?: string;
}
export const DescribeAccountAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountQuotas: S.optional(AccountQuotaList),
    UniqueAccountIdentifier: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountAttributesResponse",
}) as any as S.Schema<DescribeAccountAttributesResponse>;
export interface DescribeApplicableIndividualAssessmentsMessage {
  ReplicationTaskArn?: string;
  ReplicationInstanceArn?: string;
  ReplicationConfigArn?: string;
  SourceEngineName?: string;
  TargetEngineName?: string;
  MigrationType?: MigrationTypeValue;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeApplicableIndividualAssessmentsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationTaskArn: S.optional(S.String),
      ReplicationInstanceArn: S.optional(S.String),
      ReplicationConfigArn: S.optional(S.String),
      SourceEngineName: S.optional(S.String),
      TargetEngineName: S.optional(S.String),
      MigrationType: S.optional(MigrationTypeValue),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeApplicableIndividualAssessmentsMessage",
  }) as any as S.Schema<DescribeApplicableIndividualAssessmentsMessage>;
export type IndividualAssessmentNameList = string[];
export const IndividualAssessmentNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeApplicableIndividualAssessmentsResponse {
  IndividualAssessmentNames?: string[];
  Marker?: string;
}
export const DescribeApplicableIndividualAssessmentsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndividualAssessmentNames: S.optional(IndividualAssessmentNameList),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeApplicableIndividualAssessmentsResponse",
  }) as any as S.Schema<DescribeApplicableIndividualAssessmentsResponse>;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Value")),
);
export interface Filter {
  Name: string;
  Values: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(
  Filter.pipe(T.XmlName("Filter")).annotate({ identifier: "Filter" }),
);
export interface DescribeCertificatesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCertificatesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCertificatesMessage",
}) as any as S.Schema<DescribeCertificatesMessage>;
export type CertificateList = Certificate[];
export const CertificateList = /*@__PURE__*/ S.Array(
  Certificate.pipe(T.XmlName("Certificate")).annotate({
    identifier: "Certificate",
  }),
);
export interface DescribeCertificatesResponse {
  Marker?: string;
  Certificates?: Certificate[];
}
export const DescribeCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Certificates: S.optional(CertificateList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCertificatesResponse",
}) as any as S.Schema<DescribeCertificatesResponse>;
export interface DescribeConnectionsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeConnectionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConnectionsMessage",
}) as any as S.Schema<DescribeConnectionsMessage>;
export type ConnectionList = Connection[];
export const ConnectionList = /*@__PURE__*/ S.Array(
  Connection.pipe(T.XmlName("Connection")).annotate({
    identifier: "Connection",
  }),
);
export interface DescribeConnectionsResponse {
  Marker?: string;
  Connections?: Connection[];
}
export const DescribeConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Connections: S.optional(ConnectionList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConnectionsResponse",
}) as any as S.Schema<DescribeConnectionsResponse>;
export interface DescribeConversionConfigurationMessage {
  MigrationProjectIdentifier: string;
}
export const DescribeConversionConfigurationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MigrationProjectIdentifier: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeConversionConfigurationMessage",
}) as any as S.Schema<DescribeConversionConfigurationMessage>;
export interface DescribeConversionConfigurationResponse {
  MigrationProjectIdentifier?: string;
  ConversionConfiguration?: string;
}
export const DescribeConversionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.optional(S.String),
      ConversionConfiguration: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeConversionConfigurationResponse",
}) as any as S.Schema<DescribeConversionConfigurationResponse>;
export type Marker = string;
export interface DescribeDataMigrationsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  WithoutSettings?: boolean;
  WithoutStatistics?: boolean;
}
export const DescribeDataMigrationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    WithoutSettings: S.optional(S.Boolean),
    WithoutStatistics: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDataMigrationsMessage",
}) as any as S.Schema<DescribeDataMigrationsMessage>;
export type DataMigrations = DataMigration[];
export const DataMigrations = /*@__PURE__*/ S.Array(DataMigration);
export interface DescribeDataMigrationsResponse {
  DataMigrations?: DataMigration[];
  Marker?: string;
}
export const DescribeDataMigrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataMigrations: S.optional(DataMigrations),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataMigrationsResponse",
}) as any as S.Schema<DescribeDataMigrationsResponse>;
export interface DescribeDataProvidersMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDataProvidersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDataProvidersMessage",
}) as any as S.Schema<DescribeDataProvidersMessage>;
export type DataProviderList = DataProvider[];
export const DataProviderList = /*@__PURE__*/ S.Array(
  DataProvider.pipe(T.XmlName("DataProvider")).annotate({
    identifier: "DataProvider",
  }),
);
export interface DescribeDataProvidersResponse {
  Marker?: string;
  DataProviders?: DataProvider[];
}
export const DescribeDataProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DataProviders: S.optional(DataProviderList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataProvidersResponse",
}) as any as S.Schema<DescribeDataProvidersResponse>;
export interface DescribeEndpointsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEndpointsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEndpointsMessage",
}) as any as S.Schema<DescribeEndpointsMessage>;
export type EndpointList = Endpoint[];
export const EndpointList = /*@__PURE__*/ S.Array(
  Endpoint.pipe(T.XmlName("Endpoint")).annotate({ identifier: "Endpoint" }),
);
export interface DescribeEndpointsResponse {
  Marker?: string;
  Endpoints?: Endpoint[];
}
export const DescribeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Endpoints: S.optional(EndpointList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEndpointsResponse",
}) as any as S.Schema<DescribeEndpointsResponse>;
export interface DescribeEndpointSettingsMessage {
  EngineName: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEndpointSettingsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineName: S.String,
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEndpointSettingsMessage",
}) as any as S.Schema<DescribeEndpointSettingsMessage>;
export type EndpointSettingTypeValue =
  | "string"
  | "boolean"
  | "integer"
  | "enum"
  | (string & {});
export const EndpointSettingTypeValue = /*@__PURE__*/ S.String;

export type EndpointSettingEnumValues = string[];
export const EndpointSettingEnumValues = /*@__PURE__*/ S.Array(S.String);
export interface EndpointSetting {
  Name?: string;
  Type?: EndpointSettingTypeValue;
  EnumValues?: string[];
  Sensitive?: boolean;
  Units?: string;
  Applicability?: string;
  IntValueMin?: number;
  IntValueMax?: number;
  DefaultValue?: string;
}
export const EndpointSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(EndpointSettingTypeValue),
    EnumValues: S.optional(EndpointSettingEnumValues),
    Sensitive: S.optional(S.Boolean),
    Units: S.optional(S.String),
    Applicability: S.optional(S.String),
    IntValueMin: S.optional(S.Number),
    IntValueMax: S.optional(S.Number),
    DefaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointSetting",
}) as any as S.Schema<EndpointSetting>;
export type EndpointSettingsList = EndpointSetting[];
export const EndpointSettingsList = /*@__PURE__*/ S.Array(EndpointSetting);
export interface DescribeEndpointSettingsResponse {
  Marker?: string;
  EndpointSettings?: EndpointSetting[];
}
export const DescribeEndpointSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    EndpointSettings: S.optional(EndpointSettingsList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEndpointSettingsResponse",
}) as any as S.Schema<DescribeEndpointSettingsResponse>;
export interface DescribeEndpointTypesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEndpointTypesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEndpointTypesMessage",
}) as any as S.Schema<DescribeEndpointTypesMessage>;
export interface SupportedEndpointType {
  EngineName?: string;
  SupportsCDC?: boolean;
  EndpointType?: ReplicationEndpointTypeValue;
  ReplicationInstanceEngineMinimumVersion?: string;
  EngineDisplayName?: string;
}
export const SupportedEndpointType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineName: S.optional(S.String),
    SupportsCDC: S.optional(S.Boolean),
    EndpointType: S.optional(ReplicationEndpointTypeValue),
    ReplicationInstanceEngineMinimumVersion: S.optional(S.String),
    EngineDisplayName: S.optional(S.String),
  }),
).annotate({
  identifier: "SupportedEndpointType",
}) as any as S.Schema<SupportedEndpointType>;
export type SupportedEndpointTypeList = SupportedEndpointType[];
export const SupportedEndpointTypeList = /*@__PURE__*/ S.Array(
  SupportedEndpointType.pipe(T.XmlName("SupportedEndpointType")).annotate({
    identifier: "SupportedEndpointType",
  }),
);
export interface DescribeEndpointTypesResponse {
  Marker?: string;
  SupportedEndpointTypes?: SupportedEndpointType[];
}
export const DescribeEndpointTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    SupportedEndpointTypes: S.optional(SupportedEndpointTypeList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEndpointTypesResponse",
}) as any as S.Schema<DescribeEndpointTypesResponse>;
export interface DescribeEngineVersionsMessage {
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEngineVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEngineVersionsMessage",
}) as any as S.Schema<DescribeEngineVersionsMessage>;
export type ReleaseStatusValues = "beta" | "prod" | (string & {});
export const ReleaseStatusValues = /*@__PURE__*/ S.String;

export type AvailableUpgradesList = string[];
export const AvailableUpgradesList = /*@__PURE__*/ S.Array(S.String);
export interface EngineVersion {
  Version?: string;
  Lifecycle?: string;
  ReleaseStatus?: ReleaseStatusValues;
  LaunchDate?: Date;
  AutoUpgradeDate?: Date;
  DeprecationDate?: Date;
  ForceUpgradeDate?: Date;
  AvailableUpgrades?: string[];
}
export const EngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.String),
    Lifecycle: S.optional(S.String),
    ReleaseStatus: S.optional(ReleaseStatusValues),
    LaunchDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AutoUpgradeDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ForceUpgradeDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AvailableUpgrades: S.optional(AvailableUpgradesList),
  }),
).annotate({ identifier: "EngineVersion" }) as any as S.Schema<EngineVersion>;
export type EngineVersionList = EngineVersion[];
export const EngineVersionList = /*@__PURE__*/ S.Array(
  EngineVersion.pipe(T.XmlName("EngineVersion")).annotate({
    identifier: "EngineVersion",
  }),
);
export interface DescribeEngineVersionsResponse {
  EngineVersions?: EngineVersion[];
  Marker?: string;
}
export const DescribeEngineVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineVersions: S.optional(EngineVersionList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEngineVersionsResponse",
}) as any as S.Schema<DescribeEngineVersionsResponse>;
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
  Filters?: Filter[];
}
export const DescribeEventCategoriesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventCategoriesMessage",
}) as any as S.Schema<DescribeEventCategoriesMessage>;
export interface EventCategoryGroup {
  SourceType?: string;
  EventCategories?: string[];
}
export const EventCategoryGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
  }),
).annotate({
  identifier: "EventCategoryGroup",
}) as any as S.Schema<EventCategoryGroup>;
export type EventCategoryGroupList = EventCategoryGroup[];
export const EventCategoryGroupList = /*@__PURE__*/ S.Array(
  EventCategoryGroup.pipe(T.XmlName("EventCategoryGroup")).annotate({
    identifier: "EventCategoryGroup",
  }),
);
export interface DescribeEventCategoriesResponse {
  EventCategoryGroupList?: EventCategoryGroup[];
}
export const DescribeEventCategoriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventCategoryGroupList: S.optional(EventCategoryGroupList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeEventCategoriesResponse",
}) as any as S.Schema<DescribeEventCategoriesResponse>;
export type SourceType = "replication-instance" | (string & {});
export const SourceType = /*@__PURE__*/ S.String;

export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  EventCategories?: string[];
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEventsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    EventCategories: S.optional(EventCategoriesList),
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventsMessage",
}) as any as S.Schema<DescribeEventsMessage>;
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Date?: Date;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(
  Event.pipe(T.XmlName("Event")).annotate({ identifier: "Event" }),
);
export interface DescribeEventsResponse {
  Marker?: string;
  Events?: Event[];
}
export const DescribeEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Events: S.optional(EventList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEventsResponse",
}) as any as S.Schema<DescribeEventsResponse>;
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEventSubscriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventSubscriptionsMessage",
}) as any as S.Schema<DescribeEventSubscriptionsMessage>;
export type EventSubscriptionsList = EventSubscription[];
export const EventSubscriptionsList = /*@__PURE__*/ S.Array(
  EventSubscription.pipe(T.XmlName("EventSubscription")).annotate({
    identifier: "EventSubscription",
  }),
);
export interface DescribeEventSubscriptionsResponse {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export const DescribeEventSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    EventSubscriptionsList: S.optional(EventSubscriptionsList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEventSubscriptionsResponse",
}) as any as S.Schema<DescribeEventSubscriptionsResponse>;
export interface DescribeExtensionPackAssociationsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeExtensionPackAssociationsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeExtensionPackAssociationsMessage",
}) as any as S.Schema<DescribeExtensionPackAssociationsMessage>;
export type SchemaConversionRequestList = SchemaConversionRequest[];
export const SchemaConversionRequestList = /*@__PURE__*/ S.Array(
  SchemaConversionRequest,
);
export interface DescribeExtensionPackAssociationsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeExtensionPackAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeExtensionPackAssociationsResponse",
  }) as any as S.Schema<DescribeExtensionPackAssociationsResponse>;
export interface DescribeFleetAdvisorCollectorsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeFleetAdvisorCollectorsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeFleetAdvisorCollectorsRequest",
}) as any as S.Schema<DescribeFleetAdvisorCollectorsRequest>;
export type VersionStatus =
  | "UP_TO_DATE"
  | "OUTDATED"
  | "UNSUPPORTED"
  | (string & {});
export const VersionStatus = /*@__PURE__*/ S.String;

export type CollectorStatus = "UNREGISTERED" | "ACTIVE" | (string & {});
export const CollectorStatus = /*@__PURE__*/ S.String;

export interface CollectorHealthCheck {
  CollectorStatus?: CollectorStatus;
  LocalCollectorS3Access?: boolean;
  WebCollectorS3Access?: boolean;
  WebCollectorGrantedRoleBasedAccess?: boolean;
}
export const CollectorHealthCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectorStatus: S.optional(CollectorStatus),
    LocalCollectorS3Access: S.optional(S.Boolean),
    WebCollectorS3Access: S.optional(S.Boolean),
    WebCollectorGrantedRoleBasedAccess: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CollectorHealthCheck",
}) as any as S.Schema<CollectorHealthCheck>;
export interface InventoryData {
  NumberOfDatabases?: number;
  NumberOfSchemas?: number;
}
export const InventoryData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfDatabases: S.optional(S.Number),
    NumberOfSchemas: S.optional(S.Number),
  }),
).annotate({ identifier: "InventoryData" }) as any as S.Schema<InventoryData>;
export interface CollectorResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
  CollectorVersion?: string;
  VersionStatus?: VersionStatus;
  Description?: string;
  S3BucketName?: string;
  ServiceAccessRoleArn?: string;
  CollectorHealthCheck?: CollectorHealthCheck;
  LastDataReceived?: string;
  RegisteredDate?: string;
  CreatedDate?: string;
  ModifiedDate?: string;
  InventoryData?: InventoryData;
}
export const CollectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectorReferencedId: S.optional(S.String),
    CollectorName: S.optional(S.String),
    CollectorVersion: S.optional(S.String),
    VersionStatus: S.optional(VersionStatus),
    Description: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    ServiceAccessRoleArn: S.optional(S.String),
    CollectorHealthCheck: S.optional(CollectorHealthCheck),
    LastDataReceived: S.optional(S.String),
    RegisteredDate: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    ModifiedDate: S.optional(S.String),
    InventoryData: S.optional(InventoryData),
  }),
).annotate({
  identifier: "CollectorResponse",
}) as any as S.Schema<CollectorResponse>;
export type CollectorResponses = CollectorResponse[];
export const CollectorResponses = /*@__PURE__*/ S.Array(CollectorResponse);
export interface DescribeFleetAdvisorCollectorsResponse {
  Collectors?: CollectorResponse[];
  NextToken?: string;
}
export const DescribeFleetAdvisorCollectorsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Collectors: S.optional(CollectorResponses),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeFleetAdvisorCollectorsResponse",
}) as any as S.Schema<DescribeFleetAdvisorCollectorsResponse>;
export interface DescribeFleetAdvisorDatabasesRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeFleetAdvisorDatabasesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeFleetAdvisorDatabasesRequest",
}) as any as S.Schema<DescribeFleetAdvisorDatabasesRequest>;
export interface ServerShortInfoResponse {
  ServerId?: string;
  IpAddress?: string;
  ServerName?: string;
}
export const ServerShortInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerId: S.optional(S.String),
    IpAddress: S.optional(S.String),
    ServerName: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerShortInfoResponse",
}) as any as S.Schema<ServerShortInfoResponse>;
export interface DatabaseInstanceSoftwareDetailsResponse {
  Engine?: string;
  EngineVersion?: string;
  EngineEdition?: string;
  ServicePack?: string;
  SupportLevel?: string;
  OsArchitecture?: number;
  Tooltip?: string;
}
export const DatabaseInstanceSoftwareDetailsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Engine: S.optional(S.String),
      EngineVersion: S.optional(S.String),
      EngineEdition: S.optional(S.String),
      ServicePack: S.optional(S.String),
      SupportLevel: S.optional(S.String),
      OsArchitecture: S.optional(S.Number),
      Tooltip: S.optional(S.String),
    }),
).annotate({
  identifier: "DatabaseInstanceSoftwareDetailsResponse",
}) as any as S.Schema<DatabaseInstanceSoftwareDetailsResponse>;
export interface CollectorShortInfoResponse {
  CollectorReferencedId?: string;
  CollectorName?: string;
}
export const CollectorShortInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectorReferencedId: S.optional(S.String),
    CollectorName: S.optional(S.String),
  }),
).annotate({
  identifier: "CollectorShortInfoResponse",
}) as any as S.Schema<CollectorShortInfoResponse>;
export type CollectorsList = CollectorShortInfoResponse[];
export const CollectorsList = /*@__PURE__*/ S.Array(CollectorShortInfoResponse);
export interface DatabaseResponse {
  DatabaseId?: string;
  DatabaseName?: string;
  IpAddress?: string;
  NumberOfSchemas?: number;
  Server?: ServerShortInfoResponse;
  SoftwareDetails?: DatabaseInstanceSoftwareDetailsResponse;
  Collectors?: CollectorShortInfoResponse[];
}
export const DatabaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    IpAddress: S.optional(S.String),
    NumberOfSchemas: S.optional(S.Number),
    Server: S.optional(ServerShortInfoResponse),
    SoftwareDetails: S.optional(DatabaseInstanceSoftwareDetailsResponse),
    Collectors: S.optional(CollectorsList),
  }),
).annotate({
  identifier: "DatabaseResponse",
}) as any as S.Schema<DatabaseResponse>;
export type DatabaseList = DatabaseResponse[];
export const DatabaseList = /*@__PURE__*/ S.Array(DatabaseResponse);
export interface DescribeFleetAdvisorDatabasesResponse {
  Databases?: DatabaseResponse[];
  NextToken?: string;
}
export const DescribeFleetAdvisorDatabasesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Databases: S.optional(DatabaseList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeFleetAdvisorDatabasesResponse",
}) as any as S.Schema<DescribeFleetAdvisorDatabasesResponse>;
export interface DescribeFleetAdvisorLsaAnalysisRequest {
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeFleetAdvisorLsaAnalysisRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxRecords: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeFleetAdvisorLsaAnalysisRequest",
}) as any as S.Schema<DescribeFleetAdvisorLsaAnalysisRequest>;
export interface FleetAdvisorLsaAnalysisResponse {
  LsaAnalysisId?: string;
  Status?: string;
}
export const FleetAdvisorLsaAnalysisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LsaAnalysisId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "FleetAdvisorLsaAnalysisResponse",
}) as any as S.Schema<FleetAdvisorLsaAnalysisResponse>;
export type FleetAdvisorLsaAnalysisResponseList =
  FleetAdvisorLsaAnalysisResponse[];
export const FleetAdvisorLsaAnalysisResponseList = /*@__PURE__*/ S.Array(
  FleetAdvisorLsaAnalysisResponse,
);
export interface DescribeFleetAdvisorLsaAnalysisResponse {
  Analysis?: FleetAdvisorLsaAnalysisResponse[];
  NextToken?: string;
}
export const DescribeFleetAdvisorLsaAnalysisResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Analysis: S.optional(FleetAdvisorLsaAnalysisResponseList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeFleetAdvisorLsaAnalysisResponse",
}) as any as S.Schema<DescribeFleetAdvisorLsaAnalysisResponse>;
export interface DescribeFleetAdvisorSchemaObjectSummaryRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeFleetAdvisorSchemaObjectSummaryRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeFleetAdvisorSchemaObjectSummaryRequest",
  }) as any as S.Schema<DescribeFleetAdvisorSchemaObjectSummaryRequest>;
export interface FleetAdvisorSchemaObjectResponse {
  SchemaId?: string;
  ObjectType?: string;
  NumberOfObjects?: number;
  CodeLineCount?: number;
  CodeSize?: number;
}
export const FleetAdvisorSchemaObjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(S.String),
    ObjectType: S.optional(S.String),
    NumberOfObjects: S.optional(S.Number),
    CodeLineCount: S.optional(S.Number),
    CodeSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "FleetAdvisorSchemaObjectResponse",
}) as any as S.Schema<FleetAdvisorSchemaObjectResponse>;
export type FleetAdvisorSchemaObjectList = FleetAdvisorSchemaObjectResponse[];
export const FleetAdvisorSchemaObjectList = /*@__PURE__*/ S.Array(
  FleetAdvisorSchemaObjectResponse,
);
export interface DescribeFleetAdvisorSchemaObjectSummaryResponse {
  FleetAdvisorSchemaObjects?: FleetAdvisorSchemaObjectResponse[];
  NextToken?: string;
}
export const DescribeFleetAdvisorSchemaObjectSummaryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FleetAdvisorSchemaObjects: S.optional(FleetAdvisorSchemaObjectList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeFleetAdvisorSchemaObjectSummaryResponse",
  }) as any as S.Schema<DescribeFleetAdvisorSchemaObjectSummaryResponse>;
export interface DescribeFleetAdvisorSchemasRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeFleetAdvisorSchemasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetAdvisorSchemasRequest",
}) as any as S.Schema<DescribeFleetAdvisorSchemasRequest>;
export interface DatabaseShortInfoResponse {
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseIpAddress?: string;
  DatabaseEngine?: string;
}
export const DatabaseShortInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    DatabaseIpAddress: S.optional(S.String),
    DatabaseEngine: S.optional(S.String),
  }),
).annotate({
  identifier: "DatabaseShortInfoResponse",
}) as any as S.Schema<DatabaseShortInfoResponse>;
export interface SchemaShortInfoResponse {
  SchemaId?: string;
  SchemaName?: string;
  DatabaseId?: string;
  DatabaseName?: string;
  DatabaseIpAddress?: string;
}
export const SchemaShortInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(S.String),
    SchemaName: S.optional(S.String),
    DatabaseId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    DatabaseIpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "SchemaShortInfoResponse",
}) as any as S.Schema<SchemaShortInfoResponse>;
export interface SchemaResponse {
  CodeLineCount?: number;
  CodeSize?: number;
  Complexity?: string;
  Server?: ServerShortInfoResponse;
  DatabaseInstance?: DatabaseShortInfoResponse;
  SchemaId?: string;
  SchemaName?: string;
  OriginalSchema?: SchemaShortInfoResponse;
  Similarity?: number;
}
export const SchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeLineCount: S.optional(S.Number),
    CodeSize: S.optional(S.Number),
    Complexity: S.optional(S.String),
    Server: S.optional(ServerShortInfoResponse),
    DatabaseInstance: S.optional(DatabaseShortInfoResponse),
    SchemaId: S.optional(S.String),
    SchemaName: S.optional(S.String),
    OriginalSchema: S.optional(SchemaShortInfoResponse),
    Similarity: S.optional(S.Number),
  }),
).annotate({ identifier: "SchemaResponse" }) as any as S.Schema<SchemaResponse>;
export type FleetAdvisorSchemaList = SchemaResponse[];
export const FleetAdvisorSchemaList = /*@__PURE__*/ S.Array(SchemaResponse);
export interface DescribeFleetAdvisorSchemasResponse {
  FleetAdvisorSchemas?: SchemaResponse[];
  NextToken?: string;
}
export const DescribeFleetAdvisorSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetAdvisorSchemas: S.optional(FleetAdvisorSchemaList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeFleetAdvisorSchemasResponse",
}) as any as S.Schema<DescribeFleetAdvisorSchemasResponse>;
export interface DescribeInstanceProfilesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeInstanceProfilesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInstanceProfilesMessage",
}) as any as S.Schema<DescribeInstanceProfilesMessage>;
export type InstanceProfileList = InstanceProfile[];
export const InstanceProfileList = /*@__PURE__*/ S.Array(
  InstanceProfile.pipe(T.XmlName("InstanceProfile")).annotate({
    identifier: "InstanceProfile",
  }),
);
export interface DescribeInstanceProfilesResponse {
  Marker?: string;
  InstanceProfiles?: InstanceProfile[];
}
export const DescribeInstanceProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    InstanceProfiles: S.optional(InstanceProfileList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstanceProfilesResponse",
}) as any as S.Schema<DescribeInstanceProfilesResponse>;
export type OriginTypeValue = "SOURCE" | "TARGET" | (string & {});
export const OriginTypeValue = /*@__PURE__*/ S.String;

export interface DescribeMetadataModelMessage {
  SelectionRules: string;
  MigrationProjectIdentifier: string;
  Origin: OriginTypeValue;
}
export const DescribeMetadataModelMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SelectionRules: S.String,
    MigrationProjectIdentifier: S.String,
    Origin: OriginTypeValue,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMetadataModelMessage",
}) as any as S.Schema<DescribeMetadataModelMessage>;
export interface MetadataModelReference {
  MetadataModelName?: string;
  SelectionRules?: string;
}
export const MetadataModelReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataModelName: S.optional(S.String),
    SelectionRules: S.optional(S.String),
  }),
).annotate({
  identifier: "MetadataModelReference",
}) as any as S.Schema<MetadataModelReference>;
export type MetadataModelReferenceList = MetadataModelReference[];
export const MetadataModelReferenceList = /*@__PURE__*/ S.Array(
  MetadataModelReference,
);
export interface DescribeMetadataModelResponse {
  MetadataModelName?: string;
  MetadataModelType?: string;
  TargetMetadataModels?: MetadataModelReference[];
  Definition?: string;
}
export const DescribeMetadataModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataModelName: S.optional(S.String),
    MetadataModelType: S.optional(S.String),
    TargetMetadataModels: S.optional(MetadataModelReferenceList),
    Definition: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelResponse",
}) as any as S.Schema<DescribeMetadataModelResponse>;
export interface DescribeMetadataModelAssessmentsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelAssessmentsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMetadataModelAssessmentsMessage",
}) as any as S.Schema<DescribeMetadataModelAssessmentsMessage>;
export interface DescribeMetadataModelAssessmentsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelAssessmentsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelAssessmentsResponse",
}) as any as S.Schema<DescribeMetadataModelAssessmentsResponse>;
export interface DescribeMetadataModelChildrenMessage {
  SelectionRules: string;
  MigrationProjectIdentifier: string;
  Origin: OriginTypeValue;
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelChildrenMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SelectionRules: S.String,
      MigrationProjectIdentifier: S.String,
      Origin: OriginTypeValue,
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMetadataModelChildrenMessage",
}) as any as S.Schema<DescribeMetadataModelChildrenMessage>;
export interface DescribeMetadataModelChildrenResponse {
  Marker?: string;
  MetadataModelChildren?: MetadataModelReference[];
}
export const DescribeMetadataModelChildrenResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      MetadataModelChildren: S.optional(MetadataModelReferenceList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelChildrenResponse",
}) as any as S.Schema<DescribeMetadataModelChildrenResponse>;
export interface DescribeMetadataModelConversionsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelConversionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMetadataModelConversionsMessage",
}) as any as S.Schema<DescribeMetadataModelConversionsMessage>;
export interface DescribeMetadataModelConversionsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelConversionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelConversionsResponse",
}) as any as S.Schema<DescribeMetadataModelConversionsResponse>;
export interface DescribeMetadataModelCreationsMessage {
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
  MigrationProjectIdentifier: string;
}
export const DescribeMetadataModelCreationsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      MigrationProjectIdentifier: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMetadataModelCreationsMessage",
}) as any as S.Schema<DescribeMetadataModelCreationsMessage>;
export interface DescribeMetadataModelCreationsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelCreationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelCreationsResponse",
}) as any as S.Schema<DescribeMetadataModelCreationsResponse>;
export interface DescribeMetadataModelExportsAsScriptMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelExportsAsScriptMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeMetadataModelExportsAsScriptMessage",
  }) as any as S.Schema<DescribeMetadataModelExportsAsScriptMessage>;
export interface DescribeMetadataModelExportsAsScriptResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelExportsAsScriptResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMetadataModelExportsAsScriptResponse",
  }) as any as S.Schema<DescribeMetadataModelExportsAsScriptResponse>;
export interface DescribeMetadataModelExportsToTargetMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelExportsToTargetMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeMetadataModelExportsToTargetMessage",
  }) as any as S.Schema<DescribeMetadataModelExportsToTargetMessage>;
export interface DescribeMetadataModelExportsToTargetResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelExportsToTargetResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMetadataModelExportsToTargetResponse",
  }) as any as S.Schema<DescribeMetadataModelExportsToTargetResponse>;
export interface DescribeMetadataModelImportsMessage {
  MigrationProjectIdentifier: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeMetadataModelImportsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    Filters: S.optional(FilterList),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMetadataModelImportsMessage",
}) as any as S.Schema<DescribeMetadataModelImportsMessage>;
export interface DescribeMetadataModelImportsResponse {
  Marker?: string;
  Requests?: SchemaConversionRequest[];
}
export const DescribeMetadataModelImportsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      Requests: S.optional(SchemaConversionRequestList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMetadataModelImportsResponse",
}) as any as S.Schema<DescribeMetadataModelImportsResponse>;
export interface DescribeMigrationProjectsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeMigrationProjectsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMigrationProjectsMessage",
}) as any as S.Schema<DescribeMigrationProjectsMessage>;
export type MigrationProjectList = MigrationProject[];
export const MigrationProjectList = /*@__PURE__*/ S.Array(
  MigrationProject.pipe(T.XmlName("MigrationProject")).annotate({
    identifier: "MigrationProject",
  }),
);
export interface DescribeMigrationProjectsResponse {
  Marker?: string;
  MigrationProjects?: MigrationProject[];
}
export const DescribeMigrationProjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    MigrationProjects: S.optional(MigrationProjectList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMigrationProjectsResponse",
}) as any as S.Schema<DescribeMigrationProjectsResponse>;
export interface DescribeOrderableReplicationInstancesMessage {
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeOrderableReplicationInstancesMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeOrderableReplicationInstancesMessage",
  }) as any as S.Schema<DescribeOrderableReplicationInstancesMessage>;
export type AvailabilityZonesList = string[];
export const AvailabilityZonesList = /*@__PURE__*/ S.Array(S.String);
export interface OrderableReplicationInstance {
  EngineVersion?: string;
  ReplicationInstanceClass?: string;
  StorageType?: string;
  MinAllocatedStorage?: number;
  MaxAllocatedStorage?: number;
  DefaultAllocatedStorage?: number;
  IncludedAllocatedStorage?: number;
  AvailabilityZones?: string[];
  ReleaseStatus?: ReleaseStatusValues;
}
export const OrderableReplicationInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineVersion: S.optional(S.String),
    ReplicationInstanceClass: S.optional(S.String),
    StorageType: S.optional(S.String),
    MinAllocatedStorage: S.optional(S.Number),
    MaxAllocatedStorage: S.optional(S.Number),
    DefaultAllocatedStorage: S.optional(S.Number),
    IncludedAllocatedStorage: S.optional(S.Number),
    AvailabilityZones: S.optional(AvailabilityZonesList),
    ReleaseStatus: S.optional(ReleaseStatusValues),
  }),
).annotate({
  identifier: "OrderableReplicationInstance",
}) as any as S.Schema<OrderableReplicationInstance>;
export type OrderableReplicationInstanceList = OrderableReplicationInstance[];
export const OrderableReplicationInstanceList = /*@__PURE__*/ S.Array(
  OrderableReplicationInstance.pipe(
    T.XmlName("OrderableReplicationInstance"),
  ).annotate({ identifier: "OrderableReplicationInstance" }),
);
export interface DescribeOrderableReplicationInstancesResponse {
  OrderableReplicationInstances?: OrderableReplicationInstance[];
  Marker?: string;
}
export const DescribeOrderableReplicationInstancesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      OrderableReplicationInstances: S.optional(
        OrderableReplicationInstanceList,
      ),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeOrderableReplicationInstancesResponse",
  }) as any as S.Schema<DescribeOrderableReplicationInstancesResponse>;
export interface DescribePendingMaintenanceActionsMessage {
  ReplicationInstanceArn?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribePendingMaintenanceActionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReplicationInstanceArn: S.optional(S.String),
      Filters: S.optional(FilterList),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribePendingMaintenanceActionsMessage",
}) as any as S.Schema<DescribePendingMaintenanceActionsMessage>;
export type PendingMaintenanceActions = ResourcePendingMaintenanceActions[];
export const PendingMaintenanceActions = /*@__PURE__*/ S.Array(
  ResourcePendingMaintenanceActions.pipe(
    T.XmlName("ResourcePendingMaintenanceActions"),
  ).annotate({ identifier: "ResourcePendingMaintenanceActions" }),
);
export interface DescribePendingMaintenanceActionsResponse {
  PendingMaintenanceActions?: ResourcePendingMaintenanceActions[];
  Marker?: string;
}
export const DescribePendingMaintenanceActionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PendingMaintenanceActions: S.optional(PendingMaintenanceActions),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribePendingMaintenanceActionsResponse",
  }) as any as S.Schema<DescribePendingMaintenanceActionsResponse>;
export interface DescribeRecommendationLimitationsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeRecommendationLimitationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeRecommendationLimitationsRequest",
}) as any as S.Schema<DescribeRecommendationLimitationsRequest>;
export interface Limitation {
  DatabaseId?: string;
  EngineName?: string;
  Name?: string;
  Description?: string;
  Impact?: string;
  Type?: string;
}
export const Limitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseId: S.optional(S.String),
    EngineName: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Impact: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "Limitation" }) as any as S.Schema<Limitation>;
export type LimitationList = Limitation[];
export const LimitationList = /*@__PURE__*/ S.Array(Limitation);
export interface DescribeRecommendationLimitationsResponse {
  NextToken?: string;
  Limitations?: Limitation[];
}
export const DescribeRecommendationLimitationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      Limitations: S.optional(LimitationList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeRecommendationLimitationsResponse",
  }) as any as S.Schema<DescribeRecommendationLimitationsResponse>;
export interface DescribeRecommendationsRequest {
  Filters?: Filter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRecommendationsRequest",
}) as any as S.Schema<DescribeRecommendationsRequest>;
export interface RdsRequirements {
  EngineEdition?: string;
  InstanceVcpu?: number;
  InstanceMemory?: number;
  StorageSize?: number;
  StorageIops?: number;
  DeploymentOption?: string;
  EngineVersion?: string;
}
export const RdsRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineEdition: S.optional(S.String),
    InstanceVcpu: S.optional(S.Number),
    InstanceMemory: S.optional(S.Number),
    StorageSize: S.optional(S.Number),
    StorageIops: S.optional(S.Number),
    DeploymentOption: S.optional(S.String),
    EngineVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "RdsRequirements",
}) as any as S.Schema<RdsRequirements>;
export interface RdsConfiguration {
  EngineEdition?: string;
  InstanceType?: string;
  InstanceVcpu?: number;
  InstanceMemory?: number;
  StorageType?: string;
  StorageSize?: number;
  StorageIops?: number;
  DeploymentOption?: string;
  EngineVersion?: string;
}
export const RdsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineEdition: S.optional(S.String),
    InstanceType: S.optional(S.String),
    InstanceVcpu: S.optional(S.Number),
    InstanceMemory: S.optional(S.Number),
    StorageType: S.optional(S.String),
    StorageSize: S.optional(S.Number),
    StorageIops: S.optional(S.Number),
    DeploymentOption: S.optional(S.String),
    EngineVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "RdsConfiguration",
}) as any as S.Schema<RdsConfiguration>;
export interface RdsRecommendation {
  RequirementsToTarget?: RdsRequirements;
  TargetConfiguration?: RdsConfiguration;
}
export const RdsRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequirementsToTarget: S.optional(RdsRequirements),
    TargetConfiguration: S.optional(RdsConfiguration),
  }),
).annotate({
  identifier: "RdsRecommendation",
}) as any as S.Schema<RdsRecommendation>;
export interface RecommendationData {
  RdsEngine?: RdsRecommendation;
}
export const RecommendationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RdsEngine: S.optional(RdsRecommendation) }),
).annotate({
  identifier: "RecommendationData",
}) as any as S.Schema<RecommendationData>;
export interface Recommendation {
  DatabaseId?: string;
  EngineName?: string;
  CreatedDate?: string;
  Status?: string;
  Preferred?: boolean;
  Settings?: RecommendationSettings;
  Data?: RecommendationData;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseId: S.optional(S.String),
    EngineName: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Status: S.optional(S.String),
    Preferred: S.optional(S.Boolean),
    Settings: S.optional(RecommendationSettings),
    Data: S.optional(RecommendationData),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationList = Recommendation[];
export const RecommendationList = /*@__PURE__*/ S.Array(Recommendation);
export interface DescribeRecommendationsResponse {
  NextToken?: string;
  Recommendations?: Recommendation[];
}
export const DescribeRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Recommendations: S.optional(RecommendationList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeRecommendationsResponse",
}) as any as S.Schema<DescribeRecommendationsResponse>;
export interface DescribeRefreshSchemasStatusMessage {
  EndpointArn: string;
}
export const DescribeRefreshSchemasStatusMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRefreshSchemasStatusMessage",
}) as any as S.Schema<DescribeRefreshSchemasStatusMessage>;
export type RefreshSchemasStatusTypeValue =
  | "successful"
  | "failed"
  | "refreshing"
  | (string & {});
export const RefreshSchemasStatusTypeValue = /*@__PURE__*/ S.String;

export interface RefreshSchemasStatus {
  EndpointArn?: string;
  ReplicationInstanceArn?: string;
  Status?: RefreshSchemasStatusTypeValue;
  LastRefreshDate?: Date;
  LastFailureMessage?: string;
}
export const RefreshSchemasStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointArn: S.optional(S.String),
    ReplicationInstanceArn: S.optional(S.String),
    Status: S.optional(RefreshSchemasStatusTypeValue),
    LastRefreshDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastFailureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RefreshSchemasStatus",
}) as any as S.Schema<RefreshSchemasStatus>;
export interface DescribeRefreshSchemasStatusResponse {
  RefreshSchemasStatus?: RefreshSchemasStatus;
}
export const DescribeRefreshSchemasStatusResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RefreshSchemasStatus: S.optional(RefreshSchemasStatus) }).pipe(
      ns,
    ),
).annotate({
  identifier: "DescribeRefreshSchemasStatusResponse",
}) as any as S.Schema<DescribeRefreshSchemasStatusResponse>;
export interface DescribeReplicationConfigsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationConfigsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicationConfigsMessage",
}) as any as S.Schema<DescribeReplicationConfigsMessage>;
export type ReplicationConfigList = ReplicationConfig[];
export const ReplicationConfigList = /*@__PURE__*/ S.Array(
  ReplicationConfig.pipe(T.XmlName("ReplicationConfig")).annotate({
    identifier: "ReplicationConfig",
  }),
);
export interface DescribeReplicationConfigsResponse {
  Marker?: string;
  ReplicationConfigs?: ReplicationConfig[];
}
export const DescribeReplicationConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReplicationConfigs: S.optional(ReplicationConfigList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReplicationConfigsResponse",
}) as any as S.Schema<DescribeReplicationConfigsResponse>;
export interface DescribeReplicationInstancesMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationInstancesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicationInstancesMessage",
}) as any as S.Schema<DescribeReplicationInstancesMessage>;
export type ReplicationInstanceList = ReplicationInstance[];
export const ReplicationInstanceList = /*@__PURE__*/ S.Array(
  ReplicationInstance.pipe(T.XmlName("ReplicationInstance")).annotate({
    identifier: "ReplicationInstance",
  }),
);
export interface DescribeReplicationInstancesResponse {
  Marker?: string;
  ReplicationInstances?: ReplicationInstance[];
}
export const DescribeReplicationInstancesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      ReplicationInstances: S.optional(ReplicationInstanceList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeReplicationInstancesResponse",
}) as any as S.Schema<DescribeReplicationInstancesResponse>;
export interface DescribeReplicationInstanceTaskLogsMessage {
  ReplicationInstanceArn: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationInstanceTaskLogsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationInstanceArn: S.String,
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationInstanceTaskLogsMessage",
  }) as any as S.Schema<DescribeReplicationInstanceTaskLogsMessage>;
export interface ReplicationInstanceTaskLog {
  ReplicationTaskName?: string;
  ReplicationTaskArn?: string;
  ReplicationInstanceTaskLogSize?: number;
}
export const ReplicationInstanceTaskLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskName: S.optional(S.String),
    ReplicationTaskArn: S.optional(S.String),
    ReplicationInstanceTaskLogSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReplicationInstanceTaskLog",
}) as any as S.Schema<ReplicationInstanceTaskLog>;
export type ReplicationInstanceTaskLogsList = ReplicationInstanceTaskLog[];
export const ReplicationInstanceTaskLogsList = /*@__PURE__*/ S.Array(
  ReplicationInstanceTaskLog,
);
export interface DescribeReplicationInstanceTaskLogsResponse {
  ReplicationInstanceArn?: string;
  ReplicationInstanceTaskLogs?: ReplicationInstanceTaskLog[];
  Marker?: string;
}
export const DescribeReplicationInstanceTaskLogsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationInstanceArn: S.optional(S.String),
      ReplicationInstanceTaskLogs: S.optional(ReplicationInstanceTaskLogsList),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReplicationInstanceTaskLogsResponse",
  }) as any as S.Schema<DescribeReplicationInstanceTaskLogsResponse>;
export interface DescribeReplicationsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicationsMessage",
}) as any as S.Schema<DescribeReplicationsMessage>;
export interface ProvisionData {
  ProvisionState?: string;
  ProvisionedCapacityUnits?: number;
  DateProvisioned?: Date;
  IsNewProvisioningAvailable?: boolean;
  DateNewProvisioningDataAvailable?: Date;
  ReasonForNewProvisioningData?: string;
}
export const ProvisionData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProvisionState: S.optional(S.String),
    ProvisionedCapacityUnits: S.optional(S.Number),
    DateProvisioned: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsNewProvisioningAvailable: S.optional(S.Boolean),
    DateNewProvisioningDataAvailable: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReasonForNewProvisioningData: S.optional(S.String),
  }),
).annotate({ identifier: "ProvisionData" }) as any as S.Schema<ProvisionData>;
export interface PremigrationAssessmentStatus {
  PremigrationAssessmentRunArn?: string;
  FailOnAssessmentFailure?: boolean;
  Status?: string;
  PremigrationAssessmentRunCreationDate?: Date;
  AssessmentProgress?: ReplicationTaskAssessmentRunProgress;
  LastFailureMessage?: string;
  ResultLocationBucket?: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  ResultStatistic?: ReplicationTaskAssessmentRunResultStatistic;
}
export const PremigrationAssessmentStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PremigrationAssessmentRunArn: S.optional(S.String),
    FailOnAssessmentFailure: S.optional(S.Boolean),
    Status: S.optional(S.String),
    PremigrationAssessmentRunCreationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssessmentProgress: S.optional(ReplicationTaskAssessmentRunProgress),
    LastFailureMessage: S.optional(S.String),
    ResultLocationBucket: S.optional(S.String),
    ResultLocationFolder: S.optional(S.String),
    ResultEncryptionMode: S.optional(S.String),
    ResultKmsKeyArn: S.optional(S.String),
    ResultStatistic: S.optional(ReplicationTaskAssessmentRunResultStatistic),
  }),
).annotate({
  identifier: "PremigrationAssessmentStatus",
}) as any as S.Schema<PremigrationAssessmentStatus>;
export type PremigrationAssessmentStatusList = PremigrationAssessmentStatus[];
export const PremigrationAssessmentStatusList = /*@__PURE__*/ S.Array(
  PremigrationAssessmentStatus,
);
export interface ReplicationStats {
  FullLoadProgressPercent?: number;
  ElapsedTimeMillis?: number;
  TablesLoaded?: number;
  TablesLoading?: number;
  TablesQueued?: number;
  TablesErrored?: number;
  FreshStartDate?: Date;
  StartDate?: Date;
  StopDate?: Date;
  FullLoadStartDate?: Date;
  FullLoadFinishDate?: Date;
}
export const ReplicationStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FullLoadProgressPercent: S.optional(S.Number),
    ElapsedTimeMillis: S.optional(S.Number),
    TablesLoaded: S.optional(S.Number),
    TablesLoading: S.optional(S.Number),
    TablesQueued: S.optional(S.Number),
    TablesErrored: S.optional(S.Number),
    FreshStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StopDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FullLoadStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FullLoadFinishDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReplicationStats",
}) as any as S.Schema<ReplicationStats>;
export interface Replication {
  ReplicationConfigIdentifier?: string;
  ReplicationConfigArn?: string;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
  ReplicationType?: MigrationTypeValue;
  Status?: string;
  ProvisionData?: ProvisionData;
  PremigrationAssessmentStatuses?: PremigrationAssessmentStatus[];
  StopReason?: string;
  FailureMessages?: string[];
  ReplicationStats?: ReplicationStats;
  StartReplicationType?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  RecoveryCheckpoint?: string;
  ReplicationCreateTime?: Date;
  ReplicationUpdateTime?: Date;
  ReplicationLastStopTime?: Date;
  ReplicationDeprovisionTime?: Date;
  IsReadOnly?: boolean;
}
export const Replication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigIdentifier: S.optional(S.String),
    ReplicationConfigArn: S.optional(S.String),
    SourceEndpointArn: S.optional(S.String),
    TargetEndpointArn: S.optional(S.String),
    ReplicationType: S.optional(MigrationTypeValue),
    Status: S.optional(S.String),
    ProvisionData: S.optional(ProvisionData),
    PremigrationAssessmentStatuses: S.optional(
      PremigrationAssessmentStatusList,
    ),
    StopReason: S.optional(S.String),
    FailureMessages: S.optional(StringList),
    ReplicationStats: S.optional(ReplicationStats),
    StartReplicationType: S.optional(S.String),
    CdcStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
    RecoveryCheckpoint: S.optional(S.String),
    ReplicationCreateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicationUpdateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicationLastStopTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicationDeprovisionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsReadOnly: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Replication" }) as any as S.Schema<Replication>;
export type ReplicationList = Replication[];
export const ReplicationList = /*@__PURE__*/ S.Array(
  Replication.pipe(T.XmlName("Replication")).annotate({
    identifier: "Replication",
  }),
);
export interface DescribeReplicationsResponse {
  Marker?: string;
  Replications?: Replication[];
}
export const DescribeReplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Replications: S.optional(ReplicationList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReplicationsResponse",
}) as any as S.Schema<DescribeReplicationsResponse>;
export interface DescribeReplicationSubnetGroupsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationSubnetGroupsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeReplicationSubnetGroupsMessage",
}) as any as S.Schema<DescribeReplicationSubnetGroupsMessage>;
export type ReplicationSubnetGroups = ReplicationSubnetGroup[];
export const ReplicationSubnetGroups = /*@__PURE__*/ S.Array(
  ReplicationSubnetGroup.pipe(T.XmlName("ReplicationSubnetGroup")).annotate({
    identifier: "ReplicationSubnetGroup",
  }),
);
export interface DescribeReplicationSubnetGroupsResponse {
  Marker?: string;
  ReplicationSubnetGroups?: ReplicationSubnetGroup[];
}
export const DescribeReplicationSubnetGroupsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      ReplicationSubnetGroups: S.optional(ReplicationSubnetGroups),
    }).pipe(ns),
).annotate({
  identifier: "DescribeReplicationSubnetGroupsResponse",
}) as any as S.Schema<DescribeReplicationSubnetGroupsResponse>;
export interface DescribeReplicationTableStatisticsMessage {
  ReplicationConfigArn: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: Filter[];
}
export const DescribeReplicationTableStatisticsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationConfigArn: S.String,
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
      Filters: S.optional(FilterList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationTableStatisticsMessage",
  }) as any as S.Schema<DescribeReplicationTableStatisticsMessage>;
export interface TableStatistics {
  SchemaName?: string;
  TableName?: string;
  Inserts?: number;
  Deletes?: number;
  Updates?: number;
  Ddls?: number;
  AppliedInserts?: number;
  AppliedDeletes?: number;
  AppliedUpdates?: number;
  AppliedDdls?: number;
  FullLoadRows?: number;
  FullLoadCondtnlChkFailedRows?: number;
  FullLoadErrorRows?: number;
  FullLoadStartTime?: Date;
  FullLoadEndTime?: Date;
  FullLoadReloaded?: boolean;
  LastUpdateTime?: Date;
  TableState?: string;
  ValidationPendingRecords?: number;
  ValidationFailedRecords?: number;
  ValidationSuspendedRecords?: number;
  ValidationState?: string;
  ValidationStateDetails?: string;
  ResyncState?: string;
  ResyncRowsAttempted?: number;
  ResyncRowsSucceeded?: number;
  ResyncRowsFailed?: number;
  ResyncProgress?: number;
}
export const TableStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaName: S.optional(S.String),
    TableName: S.optional(S.String),
    Inserts: S.optional(S.Number),
    Deletes: S.optional(S.Number),
    Updates: S.optional(S.Number),
    Ddls: S.optional(S.Number),
    AppliedInserts: S.optional(S.Number),
    AppliedDeletes: S.optional(S.Number),
    AppliedUpdates: S.optional(S.Number),
    AppliedDdls: S.optional(S.Number),
    FullLoadRows: S.optional(S.Number),
    FullLoadCondtnlChkFailedRows: S.optional(S.Number),
    FullLoadErrorRows: S.optional(S.Number),
    FullLoadStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FullLoadEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FullLoadReloaded: S.optional(S.Boolean),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TableState: S.optional(S.String),
    ValidationPendingRecords: S.optional(S.Number),
    ValidationFailedRecords: S.optional(S.Number),
    ValidationSuspendedRecords: S.optional(S.Number),
    ValidationState: S.optional(S.String),
    ValidationStateDetails: S.optional(S.String),
    ResyncState: S.optional(S.String),
    ResyncRowsAttempted: S.optional(S.Number),
    ResyncRowsSucceeded: S.optional(S.Number),
    ResyncRowsFailed: S.optional(S.Number),
    ResyncProgress: S.optional(S.Number),
  }),
).annotate({
  identifier: "TableStatistics",
}) as any as S.Schema<TableStatistics>;
export type ReplicationTableStatisticsList = TableStatistics[];
export const ReplicationTableStatisticsList =
  /*@__PURE__*/ S.Array(TableStatistics);
export interface DescribeReplicationTableStatisticsResponse {
  ReplicationConfigArn?: string;
  Marker?: string;
  ReplicationTableStatistics?: TableStatistics[];
}
export const DescribeReplicationTableStatisticsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationConfigArn: S.optional(S.String),
      Marker: S.optional(S.String),
      ReplicationTableStatistics: S.optional(ReplicationTableStatisticsList),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReplicationTableStatisticsResponse",
  }) as any as S.Schema<DescribeReplicationTableStatisticsResponse>;
export interface DescribeReplicationTaskAssessmentResultsMessage {
  ReplicationTaskArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationTaskAssessmentResultsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationTaskArn: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationTaskAssessmentResultsMessage",
  }) as any as S.Schema<DescribeReplicationTaskAssessmentResultsMessage>;
export interface ReplicationTaskAssessmentResult {
  ReplicationTaskIdentifier?: string;
  ReplicationTaskArn?: string;
  ReplicationTaskLastAssessmentDate?: Date;
  AssessmentStatus?: string;
  AssessmentResultsFile?: string;
  AssessmentResults?: string;
  S3ObjectUrl?: string | redacted.Redacted<string>;
}
export const ReplicationTaskAssessmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskIdentifier: S.optional(S.String),
    ReplicationTaskArn: S.optional(S.String),
    ReplicationTaskLastAssessmentDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssessmentStatus: S.optional(S.String),
    AssessmentResultsFile: S.optional(S.String),
    AssessmentResults: S.optional(S.String),
    S3ObjectUrl: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ReplicationTaskAssessmentResult",
}) as any as S.Schema<ReplicationTaskAssessmentResult>;
export type ReplicationTaskAssessmentResultList =
  ReplicationTaskAssessmentResult[];
export const ReplicationTaskAssessmentResultList = /*@__PURE__*/ S.Array(
  ReplicationTaskAssessmentResult.pipe(
    T.XmlName("ReplicationTaskAssessmentResult"),
  ).annotate({ identifier: "ReplicationTaskAssessmentResult" }),
);
export interface DescribeReplicationTaskAssessmentResultsResponse {
  Marker?: string;
  BucketName?: string;
  ReplicationTaskAssessmentResults?: ReplicationTaskAssessmentResult[];
}
export const DescribeReplicationTaskAssessmentResultsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      BucketName: S.optional(S.String),
      ReplicationTaskAssessmentResults: S.optional(
        ReplicationTaskAssessmentResultList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReplicationTaskAssessmentResultsResponse",
  }) as any as S.Schema<DescribeReplicationTaskAssessmentResultsResponse>;
export interface DescribeReplicationTaskAssessmentRunsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationTaskAssessmentRunsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationTaskAssessmentRunsMessage",
  }) as any as S.Schema<DescribeReplicationTaskAssessmentRunsMessage>;
export type ReplicationTaskAssessmentRunList = ReplicationTaskAssessmentRun[];
export const ReplicationTaskAssessmentRunList = /*@__PURE__*/ S.Array(
  ReplicationTaskAssessmentRun,
);
export interface DescribeReplicationTaskAssessmentRunsResponse {
  Marker?: string;
  ReplicationTaskAssessmentRuns?: ReplicationTaskAssessmentRun[];
}
export const DescribeReplicationTaskAssessmentRunsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      ReplicationTaskAssessmentRuns: S.optional(
        ReplicationTaskAssessmentRunList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReplicationTaskAssessmentRunsResponse",
  }) as any as S.Schema<DescribeReplicationTaskAssessmentRunsResponse>;
export interface DescribeReplicationTaskIndividualAssessmentsMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationTaskIndividualAssessmentsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeReplicationTaskIndividualAssessmentsMessage",
  }) as any as S.Schema<DescribeReplicationTaskIndividualAssessmentsMessage>;
export interface ReplicationTaskIndividualAssessment {
  ReplicationTaskIndividualAssessmentArn?: string;
  ReplicationTaskAssessmentRunArn?: string;
  IndividualAssessmentName?: string;
  Status?: string;
  ReplicationTaskIndividualAssessmentStartDate?: Date;
}
export const ReplicationTaskIndividualAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskIndividualAssessmentArn: S.optional(S.String),
    ReplicationTaskAssessmentRunArn: S.optional(S.String),
    IndividualAssessmentName: S.optional(S.String),
    Status: S.optional(S.String),
    ReplicationTaskIndividualAssessmentStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReplicationTaskIndividualAssessment",
}) as any as S.Schema<ReplicationTaskIndividualAssessment>;
export type ReplicationTaskIndividualAssessmentList =
  ReplicationTaskIndividualAssessment[];
export const ReplicationTaskIndividualAssessmentList = /*@__PURE__*/ S.Array(
  ReplicationTaskIndividualAssessment,
);
export interface DescribeReplicationTaskIndividualAssessmentsResponse {
  Marker?: string;
  ReplicationTaskIndividualAssessments?: ReplicationTaskIndividualAssessment[];
}
export const DescribeReplicationTaskIndividualAssessmentsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      ReplicationTaskIndividualAssessments: S.optional(
        ReplicationTaskIndividualAssessmentList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReplicationTaskIndividualAssessmentsResponse",
  }) as any as S.Schema<DescribeReplicationTaskIndividualAssessmentsResponse>;
export interface DescribeReplicationTasksMessage {
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  WithoutSettings?: boolean;
}
export const DescribeReplicationTasksMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    WithoutSettings: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReplicationTasksMessage",
}) as any as S.Schema<DescribeReplicationTasksMessage>;
export type ReplicationTaskList = ReplicationTask[];
export const ReplicationTaskList = /*@__PURE__*/ S.Array(
  ReplicationTask.pipe(T.XmlName("ReplicationTask")).annotate({
    identifier: "ReplicationTask",
  }),
);
export interface DescribeReplicationTasksResponse {
  Marker?: string;
  ReplicationTasks?: ReplicationTask[];
}
export const DescribeReplicationTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReplicationTasks: S.optional(ReplicationTaskList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReplicationTasksResponse",
}) as any as S.Schema<DescribeReplicationTasksResponse>;
export interface DescribeSchemasMessage {
  EndpointArn: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeSchemasMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointArn: S.String,
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSchemasMessage",
}) as any as S.Schema<DescribeSchemasMessage>;
export type SchemaList = string[];
export const SchemaList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeSchemasResponse {
  Marker?: string;
  Schemas?: string[];
}
export const DescribeSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Schemas: S.optional(SchemaList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSchemasResponse",
}) as any as S.Schema<DescribeSchemasResponse>;
export interface DescribeTableStatisticsMessage {
  ReplicationTaskArn: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: Filter[];
}
export const DescribeTableStatisticsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.String,
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    Filters: S.optional(FilterList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTableStatisticsMessage",
}) as any as S.Schema<DescribeTableStatisticsMessage>;
export type TableStatisticsList = TableStatistics[];
export const TableStatisticsList = /*@__PURE__*/ S.Array(TableStatistics);
export interface DescribeTableStatisticsResponse {
  ReplicationTaskArn?: string;
  TableStatistics?: TableStatistics[];
  Marker?: string;
}
export const DescribeTableStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.optional(S.String),
    TableStatistics: S.optional(TableStatisticsList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTableStatisticsResponse",
}) as any as S.Schema<DescribeTableStatisticsResponse>;
export type AssessmentReportType = "pdf" | "csv" | (string & {});
export const AssessmentReportType = /*@__PURE__*/ S.String;

export type AssessmentReportTypesList = AssessmentReportType[];
export const AssessmentReportTypesList =
  /*@__PURE__*/ S.Array(AssessmentReportType);
export interface ExportMetadataModelAssessmentMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  FileName?: string;
  AssessmentReportTypes?: AssessmentReportType[];
}
export const ExportMetadataModelAssessmentMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      SelectionRules: S.String,
      FileName: S.optional(S.String),
      AssessmentReportTypes: S.optional(AssessmentReportTypesList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExportMetadataModelAssessmentMessage",
}) as any as S.Schema<ExportMetadataModelAssessmentMessage>;
export interface ExportMetadataModelAssessmentResultEntry {
  S3ObjectKey?: string;
  ObjectURL?: string;
}
export const ExportMetadataModelAssessmentResultEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      S3ObjectKey: S.optional(S.String),
      ObjectURL: S.optional(S.String),
    }),
).annotate({
  identifier: "ExportMetadataModelAssessmentResultEntry",
}) as any as S.Schema<ExportMetadataModelAssessmentResultEntry>;
export interface ExportMetadataModelAssessmentResponse {
  PdfReport?: ExportMetadataModelAssessmentResultEntry;
  CsvReport?: ExportMetadataModelAssessmentResultEntry;
}
export const ExportMetadataModelAssessmentResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PdfReport: S.optional(ExportMetadataModelAssessmentResultEntry),
      CsvReport: S.optional(ExportMetadataModelAssessmentResultEntry),
    }).pipe(ns),
).annotate({
  identifier: "ExportMetadataModelAssessmentResponse",
}) as any as S.Schema<ExportMetadataModelAssessmentResponse>;
export interface GetTargetSelectionRulesMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export const GetTargetSelectionRulesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    SelectionRules: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTargetSelectionRulesMessage",
}) as any as S.Schema<GetTargetSelectionRulesMessage>;
export interface GetTargetSelectionRulesResponse {
  TargetSelectionRules?: string;
}
export const GetTargetSelectionRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetSelectionRules: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetTargetSelectionRulesResponse",
}) as any as S.Schema<GetTargetSelectionRulesResponse>;
export interface ImportCertificateMessage {
  CertificateIdentifier: string;
  CertificatePem?: string | redacted.Redacted<string>;
  CertificateWallet?: Uint8Array;
  Tags?: Tag[];
  KmsKeyId?: string;
}
export const ImportCertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateIdentifier: S.String,
    CertificatePem: S.optional(SensitiveString),
    CertificateWallet: S.optional(T.Blob),
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportCertificateMessage",
}) as any as S.Schema<ImportCertificateMessage>;
export interface ImportCertificateResponse {
  Certificate?: Certificate;
}
export const ImportCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Certificate: S.optional(Certificate) }).pipe(ns),
).annotate({
  identifier: "ImportCertificateResponse",
}) as any as S.Schema<ImportCertificateResponse>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListTagsForResourceMessage {
  ResourceArn?: string;
  ResourceArnList?: string[];
}
export const ListTagsForResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceArnList: S.optional(ArnList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceMessage",
}) as any as S.Schema<ListTagsForResourceMessage>;
export interface ListTagsForResourceResponse {
  TagList?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ModifyConversionConfigurationMessage {
  MigrationProjectIdentifier: string;
  ConversionConfiguration: string;
}
export const ModifyConversionConfigurationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      ConversionConfiguration: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ModifyConversionConfigurationMessage",
}) as any as S.Schema<ModifyConversionConfigurationMessage>;
export interface ModifyConversionConfigurationResponse {
  MigrationProjectIdentifier?: string;
}
export const ModifyConversionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MigrationProjectIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ModifyConversionConfigurationResponse",
}) as any as S.Schema<ModifyConversionConfigurationResponse>;
export interface ModifyDataMigrationMessage {
  DataMigrationIdentifier: string;
  DataMigrationName?: string;
  EnableCloudwatchLogs?: boolean;
  ServiceAccessRoleArn?: string;
  DataMigrationType?: MigrationTypeValue;
  SourceDataSettings?: SourceDataSetting[];
  TargetDataSettings?: TargetDataSetting[];
  NumberOfJobs?: number;
  SelectionRules?: string | redacted.Redacted<string>;
}
export const ModifyDataMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataMigrationIdentifier: S.String,
    DataMigrationName: S.optional(S.String),
    EnableCloudwatchLogs: S.optional(S.Boolean),
    ServiceAccessRoleArn: S.optional(S.String),
    DataMigrationType: S.optional(MigrationTypeValue),
    SourceDataSettings: S.optional(SourceDataSettings),
    TargetDataSettings: S.optional(TargetDataSettings),
    NumberOfJobs: S.optional(S.Number),
    SelectionRules: S.optional(SensitiveString),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyDataMigrationMessage",
}) as any as S.Schema<ModifyDataMigrationMessage>;
export interface ModifyDataMigrationResponse {
  DataMigration?: DataMigration;
}
export const ModifyDataMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigration: S.optional(DataMigration) }).pipe(ns),
).annotate({
  identifier: "ModifyDataMigrationResponse",
}) as any as S.Schema<ModifyDataMigrationResponse>;
export interface ModifyDataProviderMessage {
  DataProviderIdentifier: string;
  DataProviderName?: string;
  Description?: string;
  Engine?: string;
  Virtual?: boolean;
  ExactSettings?: boolean;
  Settings?: DataProviderSettings;
}
export const ModifyDataProviderMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataProviderIdentifier: S.String,
    DataProviderName: S.optional(S.String),
    Description: S.optional(S.String),
    Engine: S.optional(S.String),
    Virtual: S.optional(S.Boolean),
    ExactSettings: S.optional(S.Boolean),
    Settings: S.optional(DataProviderSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyDataProviderMessage",
}) as any as S.Schema<ModifyDataProviderMessage>;
export interface ModifyDataProviderResponse {
  DataProvider?: DataProvider;
}
export const ModifyDataProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataProvider: S.optional(DataProvider) }).pipe(ns),
).annotate({
  identifier: "ModifyDataProviderResponse",
}) as any as S.Schema<ModifyDataProviderResponse>;
export interface ModifyEndpointMessage {
  EndpointArn: string;
  EndpointIdentifier?: string;
  EndpointType?: ReplicationEndpointTypeValue;
  EngineName?: string;
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  ServerName?: string;
  Port?: number;
  DatabaseName?: string;
  ExtraConnectionAttributes?: string;
  CertificateArn?: string;
  SslMode?: DmsSslModeValue;
  ServiceAccessRoleArn?: string;
  ExternalTableDefinition?: string;
  DynamoDbSettings?: DynamoDbSettings;
  S3Settings?: S3Settings;
  DmsTransferSettings?: DmsTransferSettings;
  MongoDbSettings?: MongoDbSettings;
  KinesisSettings?: KinesisSettings;
  KafkaSettings?: KafkaSettings;
  ElasticsearchSettings?: ElasticsearchSettings;
  NeptuneSettings?: NeptuneSettings;
  RedshiftSettings?: RedshiftSettings;
  PostgreSQLSettings?: PostgreSQLSettings;
  MySQLSettings?: MySQLSettings;
  OracleSettings?: OracleSettings;
  SybaseSettings?: SybaseSettings;
  MicrosoftSQLServerSettings?: MicrosoftSQLServerSettings;
  IBMDb2Settings?: IBMDb2Settings;
  DocDbSettings?: DocDbSettings;
  RedisSettings?: RedisSettings;
  ExactSettings?: boolean;
  GcpMySQLSettings?: GcpMySQLSettings;
  TimestreamSettings?: TimestreamSettings;
}
export const ModifyEndpointMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointArn: S.String,
    EndpointIdentifier: S.optional(S.String),
    EndpointType: S.optional(ReplicationEndpointTypeValue),
    EngineName: S.optional(S.String),
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
    ServerName: S.optional(S.String),
    Port: S.optional(S.Number),
    DatabaseName: S.optional(S.String),
    ExtraConnectionAttributes: S.optional(S.String),
    CertificateArn: S.optional(S.String),
    SslMode: S.optional(DmsSslModeValue),
    ServiceAccessRoleArn: S.optional(S.String),
    ExternalTableDefinition: S.optional(S.String),
    DynamoDbSettings: S.optional(DynamoDbSettings),
    S3Settings: S.optional(S3Settings),
    DmsTransferSettings: S.optional(DmsTransferSettings),
    MongoDbSettings: S.optional(MongoDbSettings),
    KinesisSettings: S.optional(KinesisSettings),
    KafkaSettings: S.optional(KafkaSettings),
    ElasticsearchSettings: S.optional(ElasticsearchSettings),
    NeptuneSettings: S.optional(NeptuneSettings),
    RedshiftSettings: S.optional(RedshiftSettings),
    PostgreSQLSettings: S.optional(PostgreSQLSettings),
    MySQLSettings: S.optional(MySQLSettings),
    OracleSettings: S.optional(OracleSettings),
    SybaseSettings: S.optional(SybaseSettings),
    MicrosoftSQLServerSettings: S.optional(MicrosoftSQLServerSettings),
    IBMDb2Settings: S.optional(IBMDb2Settings),
    DocDbSettings: S.optional(DocDbSettings),
    RedisSettings: S.optional(RedisSettings),
    ExactSettings: S.optional(S.Boolean),
    GcpMySQLSettings: S.optional(GcpMySQLSettings),
    TimestreamSettings: S.optional(TimestreamSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyEndpointMessage",
}) as any as S.Schema<ModifyEndpointMessage>;
export interface ModifyEndpointResponse {
  Endpoint?: Endpoint;
}
export const ModifyEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(Endpoint) }).pipe(ns),
).annotate({
  identifier: "ModifyEndpointResponse",
}) as any as S.Schema<ModifyEndpointResponse>;
export interface ModifyEventSubscriptionMessage {
  SubscriptionName: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  Enabled?: boolean;
}
export const ModifyEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.String,
    SnsTopicArn: S.optional(S.String),
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    Enabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyEventSubscriptionMessage",
}) as any as S.Schema<ModifyEventSubscriptionMessage>;
export interface ModifyEventSubscriptionResponse {
  EventSubscription?: EventSubscription;
}
export const ModifyEventSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "ModifyEventSubscriptionResponse",
}) as any as S.Schema<ModifyEventSubscriptionResponse>;
export interface ModifyInstanceProfileMessage {
  InstanceProfileIdentifier: string;
  AvailabilityZone?: string;
  KmsKeyArn?: string;
  PubliclyAccessible?: boolean;
  NetworkType?: string;
  InstanceProfileName?: string;
  Description?: string;
  SubnetGroupIdentifier?: string;
  VpcSecurityGroups?: string[];
}
export const ModifyInstanceProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceProfileIdentifier: S.String,
    AvailabilityZone: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    NetworkType: S.optional(S.String),
    InstanceProfileName: S.optional(S.String),
    Description: S.optional(S.String),
    SubnetGroupIdentifier: S.optional(S.String),
    VpcSecurityGroups: S.optional(StringList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyInstanceProfileMessage",
}) as any as S.Schema<ModifyInstanceProfileMessage>;
export interface ModifyInstanceProfileResponse {
  InstanceProfile?: InstanceProfile;
}
export const ModifyInstanceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceProfile: S.optional(InstanceProfile) }).pipe(ns),
).annotate({
  identifier: "ModifyInstanceProfileResponse",
}) as any as S.Schema<ModifyInstanceProfileResponse>;
export interface ModifyMigrationProjectMessage {
  MigrationProjectIdentifier: string;
  MigrationProjectName?: string;
  SourceDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  TargetDataProviderDescriptors?: DataProviderDescriptorDefinition[];
  InstanceProfileIdentifier?: string;
  TransformationRules?: string;
  Description?: string;
  SchemaConversionApplicationAttributes?: SCApplicationAttributes;
}
export const ModifyMigrationProjectMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    MigrationProjectName: S.optional(S.String),
    SourceDataProviderDescriptors: S.optional(
      DataProviderDescriptorDefinitionList,
    ),
    TargetDataProviderDescriptors: S.optional(
      DataProviderDescriptorDefinitionList,
    ),
    InstanceProfileIdentifier: S.optional(S.String),
    TransformationRules: S.optional(S.String),
    Description: S.optional(S.String),
    SchemaConversionApplicationAttributes: S.optional(SCApplicationAttributes),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyMigrationProjectMessage",
}) as any as S.Schema<ModifyMigrationProjectMessage>;
export interface ModifyMigrationProjectResponse {
  MigrationProject?: MigrationProject;
}
export const ModifyMigrationProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MigrationProject: S.optional(MigrationProject) }).pipe(ns),
).annotate({
  identifier: "ModifyMigrationProjectResponse",
}) as any as S.Schema<ModifyMigrationProjectResponse>;
export interface ModifyReplicationConfigMessage {
  ReplicationConfigArn: string;
  ReplicationConfigIdentifier?: string;
  ReplicationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationSettings?: string;
  SupplementalSettings?: string;
  ComputeConfig?: ComputeConfig;
  SourceEndpointArn?: string;
  TargetEndpointArn?: string;
}
export const ModifyReplicationConfigMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigArn: S.String,
    ReplicationConfigIdentifier: S.optional(S.String),
    ReplicationType: S.optional(MigrationTypeValue),
    TableMappings: S.optional(S.String),
    ReplicationSettings: S.optional(S.String),
    SupplementalSettings: S.optional(S.String),
    ComputeConfig: S.optional(ComputeConfig),
    SourceEndpointArn: S.optional(S.String),
    TargetEndpointArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyReplicationConfigMessage",
}) as any as S.Schema<ModifyReplicationConfigMessage>;
export interface ModifyReplicationConfigResponse {
  ReplicationConfig?: ReplicationConfig;
}
export const ModifyReplicationConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfig: S.optional(ReplicationConfig) }).pipe(ns),
).annotate({
  identifier: "ModifyReplicationConfigResponse",
}) as any as S.Schema<ModifyReplicationConfigResponse>;
export interface ModifyReplicationInstanceMessage {
  ReplicationInstanceArn: string;
  AllocatedStorage?: number;
  ApplyImmediately?: boolean;
  ReplicationInstanceClass?: string;
  VpcSecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  MultiAZ?: boolean;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  AutoMinorVersionUpgrade?: boolean;
  ReplicationInstanceIdentifier?: string;
  NetworkType?: string;
  KerberosAuthenticationSettings?: KerberosAuthenticationSettings;
}
export const ModifyReplicationInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceArn: S.String,
    AllocatedStorage: S.optional(S.Number),
    ApplyImmediately: S.optional(S.Boolean),
    ReplicationInstanceClass: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    PreferredMaintenanceWindow: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    AllowMajorVersionUpgrade: S.optional(S.Boolean),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    ReplicationInstanceIdentifier: S.optional(S.String),
    NetworkType: S.optional(S.String),
    KerberosAuthenticationSettings: S.optional(KerberosAuthenticationSettings),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyReplicationInstanceMessage",
}) as any as S.Schema<ModifyReplicationInstanceMessage>;
export interface ModifyReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export const ModifyReplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstance: S.optional(ReplicationInstance) }).pipe(ns),
).annotate({
  identifier: "ModifyReplicationInstanceResponse",
}) as any as S.Schema<ModifyReplicationInstanceResponse>;
export interface ModifyReplicationSubnetGroupMessage {
  ReplicationSubnetGroupIdentifier: string;
  ReplicationSubnetGroupDescription?: string;
  SubnetIds: string[];
}
export const ModifyReplicationSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationSubnetGroupIdentifier: S.String,
    ReplicationSubnetGroupDescription: S.optional(S.String),
    SubnetIds: SubnetIdentifierList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyReplicationSubnetGroupMessage",
}) as any as S.Schema<ModifyReplicationSubnetGroupMessage>;
export interface ModifyReplicationSubnetGroupResponse {
  ReplicationSubnetGroup?: ReplicationSubnetGroup;
}
export const ModifyReplicationSubnetGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReplicationSubnetGroup: S.optional(ReplicationSubnetGroup),
    }).pipe(ns),
).annotate({
  identifier: "ModifyReplicationSubnetGroupResponse",
}) as any as S.Schema<ModifyReplicationSubnetGroupResponse>;
export interface ModifyReplicationTaskMessage {
  ReplicationTaskArn: string;
  ReplicationTaskIdentifier?: string;
  MigrationType?: MigrationTypeValue;
  TableMappings?: string;
  ReplicationTaskSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
  TaskData?: string;
}
export const ModifyReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.String,
    ReplicationTaskIdentifier: S.optional(S.String),
    MigrationType: S.optional(MigrationTypeValue),
    TableMappings: S.optional(S.String),
    ReplicationTaskSettings: S.optional(S.String),
    CdcStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
    TaskData: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyReplicationTaskMessage",
}) as any as S.Schema<ModifyReplicationTaskMessage>;
export interface ModifyReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const ModifyReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "ModifyReplicationTaskResponse",
}) as any as S.Schema<ModifyReplicationTaskResponse>;
export interface MoveReplicationTaskMessage {
  ReplicationTaskArn: string;
  TargetReplicationInstanceArn: string;
}
export const MoveReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.String,
    TargetReplicationInstanceArn: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "MoveReplicationTaskMessage",
}) as any as S.Schema<MoveReplicationTaskMessage>;
export interface MoveReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const MoveReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "MoveReplicationTaskResponse",
}) as any as S.Schema<MoveReplicationTaskResponse>;
export interface RebootReplicationInstanceMessage {
  ReplicationInstanceArn: string;
  ForceFailover?: boolean;
  ForcePlannedFailover?: boolean;
}
export const RebootReplicationInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationInstanceArn: S.String,
    ForceFailover: S.optional(S.Boolean),
    ForcePlannedFailover: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootReplicationInstanceMessage",
}) as any as S.Schema<RebootReplicationInstanceMessage>;
export interface RebootReplicationInstanceResponse {
  ReplicationInstance?: ReplicationInstance;
}
export const RebootReplicationInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstance: S.optional(ReplicationInstance) }).pipe(ns),
).annotate({
  identifier: "RebootReplicationInstanceResponse",
}) as any as S.Schema<RebootReplicationInstanceResponse>;
export interface RefreshSchemasMessage {
  EndpointArn: string;
  ReplicationInstanceArn: string;
}
export const RefreshSchemasMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointArn: S.String, ReplicationInstanceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RefreshSchemasMessage",
}) as any as S.Schema<RefreshSchemasMessage>;
export interface RefreshSchemasResponse {
  RefreshSchemasStatus?: RefreshSchemasStatus;
}
export const RefreshSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RefreshSchemasStatus: S.optional(RefreshSchemasStatus) }).pipe(ns),
).annotate({
  identifier: "RefreshSchemasResponse",
}) as any as S.Schema<RefreshSchemasResponse>;
export interface TableToReload {
  SchemaName: string;
  TableName: string;
}
export const TableToReload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaName: S.String, TableName: S.String }),
).annotate({ identifier: "TableToReload" }) as any as S.Schema<TableToReload>;
export type TableListToReload = TableToReload[];
export const TableListToReload = /*@__PURE__*/ S.Array(TableToReload);
export type ReloadOptionValue = "data-reload" | "validate-only" | (string & {});
export const ReloadOptionValue = /*@__PURE__*/ S.String;

export interface ReloadReplicationTablesMessage {
  ReplicationConfigArn: string;
  TablesToReload: TableToReload[];
  ReloadOption?: ReloadOptionValue;
}
export const ReloadReplicationTablesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigArn: S.String,
    TablesToReload: TableListToReload,
    ReloadOption: S.optional(ReloadOptionValue),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReloadReplicationTablesMessage",
}) as any as S.Schema<ReloadReplicationTablesMessage>;
export interface ReloadReplicationTablesResponse {
  ReplicationConfigArn?: string;
}
export const ReloadReplicationTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfigArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ReloadReplicationTablesResponse",
}) as any as S.Schema<ReloadReplicationTablesResponse>;
export interface ReloadTablesMessage {
  ReplicationTaskArn: string;
  TablesToReload: TableToReload[];
  ReloadOption?: ReloadOptionValue;
}
export const ReloadTablesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.String,
    TablesToReload: TableListToReload,
    ReloadOption: S.optional(ReloadOptionValue),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReloadTablesMessage",
}) as any as S.Schema<ReloadTablesMessage>;
export interface ReloadTablesResponse {
  ReplicationTaskArn?: string;
}
export const ReloadTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTaskArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ReloadTablesResponse",
}) as any as S.Schema<ReloadTablesResponse>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface RemoveTagsFromResourceMessage {
  ResourceArn: string;
  TagKeys: string[];
}
export const RemoveTagsFromResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: KeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveTagsFromResourceMessage",
}) as any as S.Schema<RemoveTagsFromResourceMessage>;
export interface RemoveTagsFromResourceResponse {}
export const RemoveTagsFromResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsFromResourceResponse",
}) as any as S.Schema<RemoveTagsFromResourceResponse>;
export interface RunFleetAdvisorLsaAnalysisRequest {}
export const RunFleetAdvisorLsaAnalysisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RunFleetAdvisorLsaAnalysisRequest",
}) as any as S.Schema<RunFleetAdvisorLsaAnalysisRequest>;
export interface RunFleetAdvisorLsaAnalysisResponse {
  LsaAnalysisId?: string;
  Status?: string;
}
export const RunFleetAdvisorLsaAnalysisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LsaAnalysisId: S.optional(S.String),
    Status: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "RunFleetAdvisorLsaAnalysisResponse",
}) as any as S.Schema<RunFleetAdvisorLsaAnalysisResponse>;
export type StartReplicationMigrationTypeValue =
  | "reload-target"
  | "resume-processing"
  | "start-replication"
  | (string & {});
export const StartReplicationMigrationTypeValue = /*@__PURE__*/ S.String;

export interface StartDataMigrationMessage {
  DataMigrationIdentifier: string;
  StartType: StartReplicationMigrationTypeValue;
}
export const StartDataMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataMigrationIdentifier: S.String,
    StartType: StartReplicationMigrationTypeValue,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDataMigrationMessage",
}) as any as S.Schema<StartDataMigrationMessage>;
export interface StartDataMigrationResponse {
  DataMigration?: DataMigration;
}
export const StartDataMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigration: S.optional(DataMigration) }).pipe(ns),
).annotate({
  identifier: "StartDataMigrationResponse",
}) as any as S.Schema<StartDataMigrationResponse>;
export interface StartExtensionPackAssociationMessage {
  MigrationProjectIdentifier: string;
}
export const StartExtensionPackAssociationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MigrationProjectIdentifier: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartExtensionPackAssociationMessage",
}) as any as S.Schema<StartExtensionPackAssociationMessage>;
export interface StartExtensionPackAssociationResponse {
  RequestIdentifier?: string;
}
export const StartExtensionPackAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartExtensionPackAssociationResponse",
}) as any as S.Schema<StartExtensionPackAssociationResponse>;
export interface StartMetadataModelAssessmentMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export const StartMetadataModelAssessmentMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    SelectionRules: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMetadataModelAssessmentMessage",
}) as any as S.Schema<StartMetadataModelAssessmentMessage>;
export interface StartMetadataModelAssessmentResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelAssessmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelAssessmentResponse",
}) as any as S.Schema<StartMetadataModelAssessmentResponse>;
export interface StartMetadataModelConversionMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
}
export const StartMetadataModelConversionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    SelectionRules: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMetadataModelConversionMessage",
}) as any as S.Schema<StartMetadataModelConversionMessage>;
export interface StartMetadataModelConversionResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelConversionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelConversionResponse",
}) as any as S.Schema<StartMetadataModelConversionResponse>;
export interface StatementProperties {
  Definition: string;
}
export const StatementProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Definition: S.String }),
).annotate({
  identifier: "StatementProperties",
}) as any as S.Schema<StatementProperties>;
export type MetadataModelProperties = {
  StatementProperties: StatementProperties;
};
export const MetadataModelProperties = /*@__PURE__*/ S.Union([
  S.Struct({ StatementProperties: StatementProperties }),
]);
export interface StartMetadataModelCreationMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  MetadataModelName: string;
  Properties: MetadataModelProperties;
}
export const StartMetadataModelCreationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    SelectionRules: S.String,
    MetadataModelName: S.String,
    Properties: MetadataModelProperties,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMetadataModelCreationMessage",
}) as any as S.Schema<StartMetadataModelCreationMessage>;
export interface StartMetadataModelCreationResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelCreationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelCreationResponse",
}) as any as S.Schema<StartMetadataModelCreationResponse>;
export interface StartMetadataModelExportAsScriptMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  Origin: OriginTypeValue;
  FileName?: string;
}
export const StartMetadataModelExportAsScriptMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      SelectionRules: S.String,
      Origin: OriginTypeValue,
      FileName: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMetadataModelExportAsScriptMessage",
}) as any as S.Schema<StartMetadataModelExportAsScriptMessage>;
export interface StartMetadataModelExportAsScriptResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelExportAsScriptResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelExportAsScriptResponse",
}) as any as S.Schema<StartMetadataModelExportAsScriptResponse>;
export interface StartMetadataModelExportToTargetMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  OverwriteExtensionPack?: boolean;
}
export const StartMetadataModelExportToTargetMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MigrationProjectIdentifier: S.String,
      SelectionRules: S.String,
      OverwriteExtensionPack: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMetadataModelExportToTargetMessage",
}) as any as S.Schema<StartMetadataModelExportToTargetMessage>;
export interface StartMetadataModelExportToTargetResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelExportToTargetResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelExportToTargetResponse",
}) as any as S.Schema<StartMetadataModelExportToTargetResponse>;
export interface StartMetadataModelImportMessage {
  MigrationProjectIdentifier: string;
  SelectionRules: string;
  Origin: OriginTypeValue;
  Refresh?: boolean;
}
export const StartMetadataModelImportMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MigrationProjectIdentifier: S.String,
    SelectionRules: S.String,
    Origin: OriginTypeValue,
    Refresh: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMetadataModelImportMessage",
}) as any as S.Schema<StartMetadataModelImportMessage>;
export interface StartMetadataModelImportResponse {
  RequestIdentifier?: string;
}
export const StartMetadataModelImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestIdentifier: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartMetadataModelImportResponse",
}) as any as S.Schema<StartMetadataModelImportResponse>;
export interface StartRecommendationsRequest {
  DatabaseId: string;
  Settings: RecommendationSettings;
}
export const StartRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseId: S.String, Settings: RecommendationSettings }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartRecommendationsRequest",
}) as any as S.Schema<StartRecommendationsRequest>;
export interface StartRecommendationsResponse {}
export const StartRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartRecommendationsResponse",
}) as any as S.Schema<StartRecommendationsResponse>;
export interface StartReplicationMessage {
  ReplicationConfigArn: string;
  StartReplicationType: string;
  PremigrationAssessmentSettings?: string;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
}
export const StartReplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfigArn: S.String,
    StartReplicationType: S.String,
    PremigrationAssessmentSettings: S.optional(S.String),
    CdcStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReplicationMessage",
}) as any as S.Schema<StartReplicationMessage>;
export interface StartReplicationResponse {
  Replication?: Replication;
}
export const StartReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Replication: S.optional(Replication) }).pipe(ns),
).annotate({
  identifier: "StartReplicationResponse",
}) as any as S.Schema<StartReplicationResponse>;
export type StartReplicationTaskTypeValue =
  | "start-replication"
  | "resume-processing"
  | "reload-target"
  | (string & {});
export const StartReplicationTaskTypeValue = /*@__PURE__*/ S.String;

export interface StartReplicationTaskMessage {
  ReplicationTaskArn: string;
  StartReplicationTaskType: StartReplicationTaskTypeValue;
  CdcStartTime?: Date;
  CdcStartPosition?: string;
  CdcStopPosition?: string;
}
export const StartReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationTaskArn: S.String,
    StartReplicationTaskType: StartReplicationTaskTypeValue,
    CdcStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CdcStartPosition: S.optional(S.String),
    CdcStopPosition: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartReplicationTaskMessage",
}) as any as S.Schema<StartReplicationTaskMessage>;
export interface StartReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const StartReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "StartReplicationTaskResponse",
}) as any as S.Schema<StartReplicationTaskResponse>;
export interface StartReplicationTaskAssessmentMessage {
  ReplicationTaskArn: string;
}
export const StartReplicationTaskAssessmentMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ReplicationTaskArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartReplicationTaskAssessmentMessage",
}) as any as S.Schema<StartReplicationTaskAssessmentMessage>;
export interface StartReplicationTaskAssessmentResponse {
  ReplicationTask?: ReplicationTask;
}
export const StartReplicationTaskAssessmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "StartReplicationTaskAssessmentResponse",
}) as any as S.Schema<StartReplicationTaskAssessmentResponse>;
export type IncludeTestList = string[];
export const IncludeTestList = /*@__PURE__*/ S.Array(S.String);
export type ExcludeTestList = string[];
export const ExcludeTestList = /*@__PURE__*/ S.Array(S.String);
export interface StartReplicationTaskAssessmentRunMessage {
  ReplicationTaskArn: string;
  ServiceAccessRoleArn: string;
  ResultLocationBucket: string;
  ResultLocationFolder?: string;
  ResultEncryptionMode?: string;
  ResultKmsKeyArn?: string;
  AssessmentRunName: string;
  IncludeOnly?: string[];
  Exclude?: string[];
  Tags?: Tag[];
}
export const StartReplicationTaskAssessmentRunMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReplicationTaskArn: S.String,
      ServiceAccessRoleArn: S.String,
      ResultLocationBucket: S.String,
      ResultLocationFolder: S.optional(S.String),
      ResultEncryptionMode: S.optional(S.String),
      ResultKmsKeyArn: S.optional(S.String),
      AssessmentRunName: S.String,
      IncludeOnly: S.optional(IncludeTestList),
      Exclude: S.optional(ExcludeTestList),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartReplicationTaskAssessmentRunMessage",
}) as any as S.Schema<StartReplicationTaskAssessmentRunMessage>;
export interface StartReplicationTaskAssessmentRunResponse {
  ReplicationTaskAssessmentRun?: ReplicationTaskAssessmentRun;
}
export const StartReplicationTaskAssessmentRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationTaskAssessmentRun: S.optional(ReplicationTaskAssessmentRun),
    }).pipe(ns),
  ).annotate({
    identifier: "StartReplicationTaskAssessmentRunResponse",
  }) as any as S.Schema<StartReplicationTaskAssessmentRunResponse>;
export interface StopDataMigrationMessage {
  DataMigrationIdentifier: string;
}
export const StopDataMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigrationIdentifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDataMigrationMessage",
}) as any as S.Schema<StopDataMigrationMessage>;
export interface StopDataMigrationResponse {
  DataMigration?: DataMigration;
}
export const StopDataMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataMigration: S.optional(DataMigration) }).pipe(ns),
).annotate({
  identifier: "StopDataMigrationResponse",
}) as any as S.Schema<StopDataMigrationResponse>;
export interface StopReplicationMessage {
  ReplicationConfigArn: string;
}
export const StopReplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationConfigArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopReplicationMessage",
}) as any as S.Schema<StopReplicationMessage>;
export interface StopReplicationResponse {
  Replication?: Replication;
}
export const StopReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Replication: S.optional(Replication) }).pipe(ns),
).annotate({
  identifier: "StopReplicationResponse",
}) as any as S.Schema<StopReplicationResponse>;
export interface StopReplicationTaskMessage {
  ReplicationTaskArn: string;
}
export const StopReplicationTaskMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTaskArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopReplicationTaskMessage",
}) as any as S.Schema<StopReplicationTaskMessage>;
export interface StopReplicationTaskResponse {
  ReplicationTask?: ReplicationTask;
}
export const StopReplicationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationTask: S.optional(ReplicationTask) }).pipe(ns),
).annotate({
  identifier: "StopReplicationTaskResponse",
}) as any as S.Schema<StopReplicationTaskResponse>;
export interface TestConnectionMessage {
  ReplicationInstanceArn: string;
  EndpointArn: string;
}
export const TestConnectionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationInstanceArn: S.String, EndpointArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestConnectionMessage",
}) as any as S.Schema<TestConnectionMessage>;
export interface TestConnectionResponse {
  Connection?: Connection;
}
export const TestConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(Connection) }).pipe(ns),
).annotate({
  identifier: "TestConnectionResponse",
}) as any as S.Schema<TestConnectionResponse>;
export interface UpdateSubscriptionsToEventBridgeMessage {
  ForceMove?: boolean;
}
export const UpdateSubscriptionsToEventBridgeMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ForceMove: S.optional(S.Boolean) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSubscriptionsToEventBridgeMessage",
}) as any as S.Schema<UpdateSubscriptionsToEventBridgeMessage>;
export interface UpdateSubscriptionsToEventBridgeResponse {
  Result?: string;
}
export const UpdateSubscriptionsToEventBridgeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Result: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateSubscriptionsToEventBridgeResponse",
}) as any as S.Schema<UpdateSubscriptionsToEventBridgeResponse>;
export type ExceptionMessage = string;
export type ResourceArn = string;
export type AddTagsToResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Adds metadata tags to an DMS resource, including replication instance, endpoint,
 * subnet group, and migration task. These tags can also be used with cost allocation
 * reporting to track cost associated with DMS resources, or used in a Condition statement in
 * an IAM policy for DMS. For more information, see
 * `Tag`
 * data type
 * description.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToResourceMessage,
  output: AddTagsToResourceResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type ApplyPendingMaintenanceActionError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies a pending maintenance action to a resource (for example, to a replication
 * instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResponse,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApplyPendingMaintenanceActionMessage,
  output: ApplyPendingMaintenanceActionResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
}));

export type BatchStartRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Starts the analysis of up to 20 source databases to recommend target engines for each
 * source database. This is a batch version of StartRecommendations.
 *
 * The result of analysis of each source database is reported individually in the
 * response. Because the batch request can result in a combination of successful and
 * unsuccessful actions, you should check for batch errors even when the call returns an
 * HTTP status code of `200`.
 */
export const batchStartRecommendations: API.OperationMethod<
  BatchStartRecommendationsRequest,
  BatchStartRecommendationsResponse,
  BatchStartRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchStartRecommendationsRequest,
  output: BatchStartRecommendationsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStartRecommendations",
}));

export type CancelMetadataModelConversionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single metadata model conversion operation that was started with `StartMetadataModelConversion`.
 */
export const cancelMetadataModelConversion: API.OperationMethod<
  CancelMetadataModelConversionMessage,
  CancelMetadataModelConversionResponse,
  CancelMetadataModelConversionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMetadataModelConversionMessage,
  output: CancelMetadataModelConversionResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMetadataModelConversion",
}));

export type CancelMetadataModelCreationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single metadata model creation operation that was started with `StartMetadataModelCreation`.
 */
export const cancelMetadataModelCreation: API.OperationMethod<
  CancelMetadataModelCreationMessage,
  CancelMetadataModelCreationResponse,
  CancelMetadataModelCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMetadataModelCreationMessage,
  output: CancelMetadataModelCreationResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMetadataModelCreation",
}));

export type CancelReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Cancels a single premigration assessment run.
 *
 * This operation prevents any individual assessments from running if they haven't started
 * running. It also attempts to cancel any individual assessments that are currently
 * running.
 */
export const cancelReplicationTaskAssessmentRun: API.OperationMethod<
  CancelReplicationTaskAssessmentRunMessage,
  CancelReplicationTaskAssessmentRunResponse,
  CancelReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelReplicationTaskAssessmentRunMessage,
  output: CancelReplicationTaskAssessmentRunResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelReplicationTaskAssessmentRun",
}));

export type CreateDataMigrationError =
  | FailedDependencyFault
  | InvalidOperationFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a data migration using the provided settings.
 */
export const createDataMigration: API.OperationMethod<
  CreateDataMigrationMessage,
  CreateDataMigrationResponse,
  CreateDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataMigrationMessage,
  output: CreateDataMigrationResponse,
  errors: [
    FailedDependencyFault,
    InvalidOperationFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataMigration",
}));

export type CreateDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceAlreadyExistsFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a data provider using the provided settings. A data provider stores a data store
 * type and location information about your database.
 */
export const createDataProvider: API.OperationMethod<
  CreateDataProviderMessage,
  CreateDataProviderResponse,
  CreateDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataProviderMessage,
  output: CreateDataProviderResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    ResourceAlreadyExistsFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProvider",
}));

export type CreateEndpointError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | CommonErrors;
/**
 * Creates an endpoint using the provided settings.
 *
 * For a MySQL source or target endpoint, don't explicitly specify the database using
 * the `DatabaseName` request parameter on the `CreateEndpoint` API
 * call. Specifying `DatabaseName` when you create a MySQL endpoint replicates
 * all the task tables to this single database. For MySQL endpoints, you specify the
 * database only when you specify the schema in the table-mapping rules of the DMS
 * task.
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointMessage,
  CreateEndpointResponse,
  CreateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEndpointMessage,
  output: CreateEndpointResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpoint",
}));

export type CreateEventSubscriptionError =
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSInvalidStateFault
  | KMSNotFoundFault
  | KMSThrottlingFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | CommonErrors;
/**
 * Creates an DMS event notification subscription.
 *
 * You can specify the type of source (`SourceType`) you want to be notified of,
 * provide a list of DMS source IDs (`SourceIds`) that triggers the events, and
 * provide a list of event categories (`EventCategories`) for events you want to be
 * notified of. If you specify both the `SourceType` and `SourceIds`,
 * such as `SourceType = replication-instance` and SourceIdentifier =
 * my-replinstance, you will be notified of all the replication instance events for
 * the specified source. If you specify a `SourceType` but don't specify a
 * `SourceIdentifier`, you receive notice of the events for that source type for
 * all your DMS sources. If you don't specify either `SourceType` nor
 * `SourceIdentifier`, you will be notified of events generated from all DMS
 * sources belonging to your customer account.
 *
 * For more information about DMS events, see Working with Events and
 * Notifications in the *Database Migration Service User Guide.*
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResponse,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventSubscriptionMessage,
  output: CreateEventSubscriptionResponse,
  errors: [
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSInvalidStateFault,
    KMSNotFoundFault,
    KMSThrottlingFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
}));

export type CreateFleetAdvisorCollectorError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Creates a Fleet Advisor collector using the specified parameters.
 */
export const createFleetAdvisorCollector: API.OperationMethod<
  CreateFleetAdvisorCollectorRequest,
  CreateFleetAdvisorCollectorResponse,
  CreateFleetAdvisorCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetAdvisorCollectorRequest,
  output: CreateFleetAdvisorCollectorResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetAdvisorCollector",
}));

export type CreateInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates the instance profile using the specified parameters.
 */
export const createInstanceProfile: API.OperationMethod<
  CreateInstanceProfileMessage,
  CreateInstanceProfileResponse,
  CreateInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstanceProfileMessage,
  output: CreateInstanceProfileResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceProfile",
}));

export type CreateMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates the migration project using the specified parameters.
 *
 * You can run this action only after you create an instance profile and data providers
 * using CreateInstanceProfile and CreateDataProvider.
 */
export const createMigrationProject: API.OperationMethod<
  CreateMigrationProjectMessage,
  CreateMigrationProjectResponse,
  CreateMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMigrationProjectMessage,
  output: CreateMigrationProjectResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMigrationProject",
}));

export type CreateReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a configuration that you can later provide to configure and start an DMS
 * Serverless replication. You can also provide options to validate the configuration inputs
 * before you start the replication.
 */
export const createReplicationConfig: API.OperationMethod<
  CreateReplicationConfigMessage,
  CreateReplicationConfigResponse,
  CreateReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationConfigMessage,
  output: CreateReplicationConfigResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfig",
}));

export type CreateReplicationInstanceError =
  | AccessDeniedFault
  | InsufficientResourceCapacityFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates the replication instance using the specified parameters.
 *
 * DMS requires that your account have certain roles with appropriate permissions before
 * you can create a replication instance. For information on the required roles, see Creating the IAM Roles to Use With the CLI and DMS API. For information on
 * the required permissions, see IAM
 * Permissions Needed to Use DMS.
 *
 * If you don't specify a version when creating a replication instance, DMS will
 * create the instance using the default engine version. For information about the default
 * engine version, see Release Notes.
 */
export const createReplicationInstance: API.OperationMethod<
  CreateReplicationInstanceMessage,
  CreateReplicationInstanceResponse,
  CreateReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationInstanceMessage,
  output: CreateReplicationInstanceResponse,
  errors: [
    AccessDeniedFault,
    InsufficientResourceCapacityFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationInstance",
}));

export type CreateReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidSubnet
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a replication subnet group given a list of the subnet IDs in a VPC.
 *
 * The VPC needs to have at least one subnet in at least two availability zones in the
 * Amazon Web Services Region, otherwise the service will throw a
 * `ReplicationSubnetGroupDoesNotCoverEnoughAZs` exception.
 *
 * If a replication subnet group exists in your Amazon Web Services account, the
 * CreateReplicationSubnetGroup action returns the following error message: The Replication
 * Subnet Group already exists. In this case, delete the existing replication subnet group. To
 * do so, use the DeleteReplicationSubnetGroup action. Optionally, choose Subnet groups in the
 * DMS console, then choose your subnet group. Next, choose Delete from Actions.
 */
export const createReplicationSubnetGroup: API.OperationMethod<
  CreateReplicationSubnetGroupMessage,
  CreateReplicationSubnetGroupResponse,
  CreateReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationSubnetGroupMessage,
  output: CreateReplicationSubnetGroupResponse,
  errors: [
    AccessDeniedFault,
    InvalidSubnet,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationSubnetGroup",
}));

export type CreateReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates a replication task using the specified parameters.
 */
export const createReplicationTask: API.OperationMethod<
  CreateReplicationTaskMessage,
  CreateReplicationTaskResponse,
  CreateReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationTaskMessage,
  output: CreateReplicationTaskResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationTask",
}));

export type DeleteCertificateError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified certificate.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateMessage,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCertificateMessage,
  output: DeleteCertificateResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
}));

export type DeleteConnectionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the connection between a replication instance and an endpoint.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionMessage,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionMessage,
  output: DeleteConnectionResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified data migration.
 */
export const deleteDataMigration: API.OperationMethod<
  DeleteDataMigrationMessage,
  DeleteDataMigrationResponse,
  DeleteDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataMigrationMessage,
  output: DeleteDataMigrationResponse,
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataMigration",
}));

export type DeleteDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified data provider.
 *
 * All migration projects associated with the data provider must be deleted or modified
 * before you can delete the data provider.
 */
export const deleteDataProvider: API.OperationMethod<
  DeleteDataProviderMessage,
  DeleteDataProviderResponse,
  DeleteDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataProviderMessage,
  output: DeleteDataProviderResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProvider",
}));

export type DeleteEndpointError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified endpoint.
 *
 * All tasks associated with the endpoint must be deleted before you can delete the
 * endpoint.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointMessage,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointMessage,
  output: DeleteEndpointResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
}));

export type DeleteEventSubscriptionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes an DMS event subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResponse,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventSubscriptionMessage,
  output: DeleteEventSubscriptionResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
}));

export type DeleteFleetAdvisorCollectorError =
  | AccessDeniedFault
  | CollectorNotFoundFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Deletes the specified Fleet Advisor collector.
 */
export const deleteFleetAdvisorCollector: API.OperationMethod<
  DeleteCollectorRequest,
  DeleteFleetAdvisorCollectorResponse,
  DeleteFleetAdvisorCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCollectorRequest,
  output: DeleteFleetAdvisorCollectorResponse,
  errors: [
    AccessDeniedFault,
    CollectorNotFoundFault,
    InvalidResourceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetAdvisorCollector",
}));

export type DeleteFleetAdvisorDatabasesError =
  | AccessDeniedFault
  | InvalidOperationFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Deletes the specified Fleet Advisor collector databases.
 */
export const deleteFleetAdvisorDatabases: API.OperationMethod<
  DeleteFleetAdvisorDatabasesRequest,
  DeleteFleetAdvisorDatabasesResponse,
  DeleteFleetAdvisorDatabasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetAdvisorDatabasesRequest,
  output: DeleteFleetAdvisorDatabasesResponse,
  errors: [AccessDeniedFault, InvalidOperationFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetAdvisorDatabases",
}));

export type DeleteInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified instance profile.
 *
 * All migration projects associated with the instance profile must be deleted or
 * modified before you can delete the instance profile.
 */
export const deleteInstanceProfile: API.OperationMethod<
  DeleteInstanceProfileMessage,
  DeleteInstanceProfileResponse,
  DeleteInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstanceProfileMessage,
  output: DeleteInstanceProfileResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceProfile",
}));

export type DeleteMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified migration project.
 *
 * The migration project must be closed before you can delete it.
 */
export const deleteMigrationProject: API.OperationMethod<
  DeleteMigrationProjectMessage,
  DeleteMigrationProjectResponse,
  DeleteMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMigrationProjectMessage,
  output: DeleteMigrationProjectResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMigrationProject",
}));

export type DeleteReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes an DMS Serverless replication configuration. This effectively deprovisions any
 * and all replications that use this configuration. You can't delete the configuration for an
 * DMS Serverless replication that is ongoing. You can delete the configuration when the
 * replication is in a non-RUNNING and non-STARTING state.
 */
export const deleteReplicationConfig: API.OperationMethod<
  DeleteReplicationConfigMessage,
  DeleteReplicationConfigResponse,
  DeleteReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationConfigMessage,
  output: DeleteReplicationConfigResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfig",
}));

export type DeleteReplicationInstanceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified replication instance.
 *
 * You must delete any migration tasks that are associated with the replication instance
 * before you can delete it.
 */
export const deleteReplicationInstance: API.OperationMethod<
  DeleteReplicationInstanceMessage,
  DeleteReplicationInstanceResponse,
  DeleteReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationInstanceMessage,
  output: DeleteReplicationInstanceResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationInstance",
}));

export type DeleteReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 */
export const deleteReplicationSubnetGroup: API.OperationMethod<
  DeleteReplicationSubnetGroupMessage,
  DeleteReplicationSubnetGroupResponse,
  DeleteReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationSubnetGroupMessage,
  output: DeleteReplicationSubnetGroupResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationSubnetGroup",
}));

export type DeleteReplicationTaskError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified replication task.
 */
export const deleteReplicationTask: API.OperationMethod<
  DeleteReplicationTaskMessage,
  DeleteReplicationTaskResponse,
  DeleteReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationTaskMessage,
  output: DeleteReplicationTaskResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationTask",
}));

export type DeleteReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes the record of a single premigration assessment run.
 *
 * This operation removes all metadata that DMS maintains about this assessment run.
 * However, the operation leaves untouched all information about this assessment run that is
 * stored in your Amazon S3 bucket.
 */
export const deleteReplicationTaskAssessmentRun: API.OperationMethod<
  DeleteReplicationTaskAssessmentRunMessage,
  DeleteReplicationTaskAssessmentRunResponse,
  DeleteReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationTaskAssessmentRunMessage,
  output: DeleteReplicationTaskAssessmentRunResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationTaskAssessmentRun",
}));

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Lists all of the DMS attributes for a customer account. These attributes include DMS
 * quotas for the account and a unique account identifier in a particular DMS region. DMS
 * quotas include a list of resource quotas supported by the account, such as the number of
 * replication instances allowed. The description for each resource quota, includes the quota
 * name, current usage toward that quota, and the quota's maximum value. DMS uses the unique
 * account identifier to name each artifact used by DMS in the given region.
 *
 * This command does not take any parameters.
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  DescribeAccountAttributesResponse,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountAttributesMessage,
  output: DescribeAccountAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
}));

export type DescribeApplicableIndividualAssessmentsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Provides a list of individual assessments that you can specify for a new premigration
 * assessment run, given one or more parameters.
 *
 * If you specify an existing migration task, this operation provides the default
 * individual assessments you can specify for that task. Otherwise, the specified parameters
 * model elements of a possible migration task on which to base a premigration assessment
 * run.
 *
 * To use these migration task modeling parameters, you must specify an existing
 * replication instance, a source database engine, a target database engine, and a migration
 * type. This combination of parameters potentially limits the default individual assessments
 * available for an assessment run created for a corresponding migration task.
 *
 * If you specify no parameters, this operation provides a list of all possible individual
 * assessments that you can specify for an assessment run. If you specify any one of the task
 * modeling parameters, you must specify all of them or the operation cannot provide a list of
 * individual assessments. The only parameter that you can specify alone is for an existing
 * migration task. The specified task definition then determines the default list of
 * individual assessments that you can specify in an assessment run for the task.
 */
export const describeApplicableIndividualAssessments: API.PaginatedOperationMethod<
  DescribeApplicableIndividualAssessmentsMessage,
  DescribeApplicableIndividualAssessmentsResponse,
  DescribeApplicableIndividualAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeApplicableIndividualAssessmentsMessage,
  output: DescribeApplicableIndividualAssessmentsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicableIndividualAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCertificatesError = ResourceNotFoundFault | CommonErrors;
/**
 * Provides a description of the certificate.
 */
export const describeCertificates: API.PaginatedOperationMethod<
  DescribeCertificatesMessage,
  DescribeCertificatesResponse,
  DescribeCertificatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCertificatesMessage,
  output: DescribeCertificatesResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeConnectionsError = ResourceNotFoundFault | CommonErrors;
/**
 * Describes the status of the connections that have been made between the replication
 * instance and an endpoint. Connections are created when you test an endpoint.
 */
export const describeConnections: API.PaginatedOperationMethod<
  DescribeConnectionsMessage,
  DescribeConnectionsResponse,
  DescribeConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeConnectionsMessage,
  output: DescribeConnectionsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnections",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeConversionConfigurationError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns configuration parameters for a schema conversion project.
 */
export const describeConversionConfiguration: API.OperationMethod<
  DescribeConversionConfigurationMessage,
  DescribeConversionConfigurationResponse,
  DescribeConversionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConversionConfigurationMessage,
  output: DescribeConversionConfigurationResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConversionConfiguration",
}));

export type DescribeDataMigrationsError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about data migrations.
 */
export const describeDataMigrations: API.PaginatedOperationMethod<
  DescribeDataMigrationsMessage,
  DescribeDataMigrationsResponse,
  DescribeDataMigrationsError,
  Credentials | HttpClient.HttpClient,
  DataMigration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataMigrationsMessage,
  output: DescribeDataMigrationsResponse,
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataMigrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataMigrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataProvidersError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of data providers for your account in the current
 * region.
 */
export const describeDataProviders: API.PaginatedOperationMethod<
  DescribeDataProvidersMessage,
  DescribeDataProvidersResponse,
  DescribeDataProvidersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataProvidersMessage,
  output: DescribeDataProvidersResponse,
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataProviders",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointsError = ResourceNotFoundFault | CommonErrors;
/**
 * Returns information about the endpoints for your account in the current region.
 */
export const describeEndpoints: API.PaginatedOperationMethod<
  DescribeEndpointsMessage,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointsMessage,
  output: DescribeEndpointsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointSettingsError = CommonErrors;
/**
 * Returns information about the possible endpoint settings available when you create an
 * endpoint for a specific database engine.
 */
export const describeEndpointSettings: API.PaginatedOperationMethod<
  DescribeEndpointSettingsMessage,
  DescribeEndpointSettingsResponse,
  DescribeEndpointSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointSettingsMessage,
  output: DescribeEndpointSettingsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointSettings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointTypesError = CommonErrors;
/**
 * Returns information about the type of endpoints available.
 */
export const describeEndpointTypes: API.PaginatedOperationMethod<
  DescribeEndpointTypesMessage,
  DescribeEndpointTypesResponse,
  DescribeEndpointTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointTypesMessage,
  output: DescribeEndpointTypesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointTypes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineVersionsError = CommonErrors;
/**
 * Returns information about the replication instance versions used in the project.
 */
export const describeEngineVersions: API.PaginatedOperationMethod<
  DescribeEngineVersionsMessage,
  DescribeEngineVersionsResponse,
  DescribeEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEngineVersionsMessage,
  output: DescribeEngineVersionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Lists categories for all event source types, or, if specified, for a specified source
 * type. You can see a list of the event categories and source types in Working with Events
 * and Notifications in the *Database Migration Service User Guide.*
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  DescribeEventCategoriesResponse,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEventCategoriesMessage,
  output: DescribeEventCategoriesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Lists events for a given source identifier and source type. You can also specify a
 * start and end time. For more information on DMS events, see Working with Events and
 * Notifications in the *Database Migration Service User Guide.*
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventsMessage,
  output: DescribeEventsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventSubscriptionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Lists all the event subscriptions for a customer account. The description of a
 * subscription includes `SubscriptionName`, `SNSTopicARN`,
 * `CustomerID`, `SourceType`, `SourceID`,
 * `CreationTime`, and `Status`.
 *
 * If you specify `SubscriptionName`, this action lists the description for that
 * subscription.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  DescribeEventSubscriptionsResponse,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventSubscriptionsMessage,
  output: DescribeEventSubscriptionsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeExtensionPackAssociationsError = CommonErrors;
/**
 * Returns a paginated list of extension pack associations for the specified migration
 * project. An extension pack is an add-on module that emulates functions present in a source
 * database that are required when converting objects to the target database.
 */
export const describeExtensionPackAssociations: API.PaginatedOperationMethod<
  DescribeExtensionPackAssociationsMessage,
  DescribeExtensionPackAssociationsResponse,
  DescribeExtensionPackAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeExtensionPackAssociationsMessage,
  output: DescribeExtensionPackAssociationsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExtensionPackAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorCollectorsError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of the Fleet Advisor collectors in your account.
 */
export const describeFleetAdvisorCollectors: API.PaginatedOperationMethod<
  DescribeFleetAdvisorCollectorsRequest,
  DescribeFleetAdvisorCollectorsResponse,
  DescribeFleetAdvisorCollectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAdvisorCollectorsRequest,
  output: DescribeFleetAdvisorCollectorsResponse,
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorCollectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorDatabasesError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of Fleet Advisor databases in your account.
 */
export const describeFleetAdvisorDatabases: API.PaginatedOperationMethod<
  DescribeFleetAdvisorDatabasesRequest,
  DescribeFleetAdvisorDatabasesResponse,
  DescribeFleetAdvisorDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAdvisorDatabasesRequest,
  output: DescribeFleetAdvisorDatabasesResponse,
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorLsaAnalysisError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Provides descriptions of large-scale assessment (LSA) analyses produced by your Fleet
 * Advisor collectors.
 */
export const describeFleetAdvisorLsaAnalysis: API.PaginatedOperationMethod<
  DescribeFleetAdvisorLsaAnalysisRequest,
  DescribeFleetAdvisorLsaAnalysisResponse,
  DescribeFleetAdvisorLsaAnalysisError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAdvisorLsaAnalysisRequest,
  output: DescribeFleetAdvisorLsaAnalysisResponse,
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorLsaAnalysis",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorSchemaObjectSummaryError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Provides descriptions of the schemas discovered by your Fleet Advisor
 * collectors.
 */
export const describeFleetAdvisorSchemaObjectSummary: API.PaginatedOperationMethod<
  DescribeFleetAdvisorSchemaObjectSummaryRequest,
  DescribeFleetAdvisorSchemaObjectSummaryResponse,
  DescribeFleetAdvisorSchemaObjectSummaryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAdvisorSchemaObjectSummaryRequest,
  output: DescribeFleetAdvisorSchemaObjectSummaryResponse,
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorSchemaObjectSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeFleetAdvisorSchemasError =
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a list of schemas detected by Fleet Advisor Collectors in your account.
 */
export const describeFleetAdvisorSchemas: API.PaginatedOperationMethod<
  DescribeFleetAdvisorSchemasRequest,
  DescribeFleetAdvisorSchemasResponse,
  DescribeFleetAdvisorSchemasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeFleetAdvisorSchemasRequest,
  output: DescribeFleetAdvisorSchemasResponse,
  errors: [InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAdvisorSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInstanceProfilesError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of instance profiles for your account in the current
 * region.
 */
export const describeInstanceProfiles: API.PaginatedOperationMethod<
  DescribeInstanceProfilesMessage,
  DescribeInstanceProfilesResponse,
  DescribeInstanceProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstanceProfilesMessage,
  output: DescribeInstanceProfilesResponse,
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceProfiles",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Gets detailed information about the specified metadata model, including its definition and corresponding converted objects in the target database if applicable.
 */
export const describeMetadataModel: API.OperationMethod<
  DescribeMetadataModelMessage,
  DescribeMetadataModelResponse,
  DescribeMetadataModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMetadataModelMessage,
  output: DescribeMetadataModelResponse,
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModel",
}));

export type DescribeMetadataModelAssessmentsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model assessments for your account in the current
 * region.
 */
export const describeMetadataModelAssessments: API.PaginatedOperationMethod<
  DescribeMetadataModelAssessmentsMessage,
  DescribeMetadataModelAssessmentsResponse,
  DescribeMetadataModelAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelAssessmentsMessage,
  output: DescribeMetadataModelAssessmentsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelChildrenError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Gets a list of child metadata models for the specified metadata model in the database hierarchy.
 */
export const describeMetadataModelChildren: API.PaginatedOperationMethod<
  DescribeMetadataModelChildrenMessage,
  DescribeMetadataModelChildrenResponse,
  DescribeMetadataModelChildrenError,
  Credentials | HttpClient.HttpClient,
  MetadataModelReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelChildrenMessage,
  output: DescribeMetadataModelChildrenResponse,
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelChildren",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MetadataModelChildren",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelConversionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model conversions for a migration project.
 */
export const describeMetadataModelConversions: API.PaginatedOperationMethod<
  DescribeMetadataModelConversionsMessage,
  DescribeMetadataModelConversionsResponse,
  DescribeMetadataModelConversionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelConversionsMessage,
  output: DescribeMetadataModelConversionsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelConversions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelCreationsError =
  | AccessDeniedFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model creation requests for a migration project.
 */
export const describeMetadataModelCreations: API.PaginatedOperationMethod<
  DescribeMetadataModelCreationsMessage,
  DescribeMetadataModelCreationsResponse,
  DescribeMetadataModelCreationsError,
  Credentials | HttpClient.HttpClient,
  SchemaConversionRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelCreationsMessage,
  output: DescribeMetadataModelCreationsResponse,
  errors: [AccessDeniedFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelCreations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Requests",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelExportsAsScriptError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model exports.
 */
export const describeMetadataModelExportsAsScript: API.PaginatedOperationMethod<
  DescribeMetadataModelExportsAsScriptMessage,
  DescribeMetadataModelExportsAsScriptResponse,
  DescribeMetadataModelExportsAsScriptError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelExportsAsScriptMessage,
  output: DescribeMetadataModelExportsAsScriptResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelExportsAsScript",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelExportsToTargetError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model exports.
 */
export const describeMetadataModelExportsToTarget: API.PaginatedOperationMethod<
  DescribeMetadataModelExportsToTargetMessage,
  DescribeMetadataModelExportsToTargetResponse,
  DescribeMetadataModelExportsToTargetError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelExportsToTargetMessage,
  output: DescribeMetadataModelExportsToTargetResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelExportsToTarget",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetadataModelImportsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of metadata model imports.
 */
export const describeMetadataModelImports: API.PaginatedOperationMethod<
  DescribeMetadataModelImportsMessage,
  DescribeMetadataModelImportsResponse,
  DescribeMetadataModelImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMetadataModelImportsMessage,
  output: DescribeMetadataModelImportsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetadataModelImports",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMigrationProjectsError =
  | AccessDeniedFault
  | FailedDependencyFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of migration projects for your account in the current
 * region.
 */
export const describeMigrationProjects: API.PaginatedOperationMethod<
  DescribeMigrationProjectsMessage,
  DescribeMigrationProjectsResponse,
  DescribeMigrationProjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMigrationProjectsMessage,
  output: DescribeMigrationProjectsResponse,
  errors: [AccessDeniedFault, FailedDependencyFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMigrationProjects",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableReplicationInstancesError = CommonErrors;
/**
 * Returns information about the replication instance types that can be created in the
 * specified region.
 */
export const describeOrderableReplicationInstances: API.PaginatedOperationMethod<
  DescribeOrderableReplicationInstancesMessage,
  DescribeOrderableReplicationInstancesResponse,
  DescribeOrderableReplicationInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOrderableReplicationInstancesMessage,
  output: DescribeOrderableReplicationInstancesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableReplicationInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePendingMaintenanceActionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a list of upcoming maintenance events for replication instances in your account
 * in the current Region.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsResponse,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePendingMaintenanceActionsMessage,
  output: DescribePendingMaintenanceActionsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePendingMaintenanceActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRecommendationLimitationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a paginated list of limitations for recommendations of target Amazon Web Services
 * engines.
 */
export const describeRecommendationLimitations: API.PaginatedOperationMethod<
  DescribeRecommendationLimitationsRequest,
  DescribeRecommendationLimitationsResponse,
  DescribeRecommendationLimitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRecommendationLimitationsRequest,
  output: DescribeRecommendationLimitationsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendationLimitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Returns a paginated list of target engine recommendations for your source
 * databases.
 */
export const describeRecommendations: API.PaginatedOperationMethod<
  DescribeRecommendationsRequest,
  DescribeRecommendationsResponse,
  DescribeRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRecommendationsRequest,
  output: DescribeRecommendationsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRefreshSchemasStatusError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns the status of the RefreshSchemas operation.
 */
export const describeRefreshSchemasStatus: API.OperationMethod<
  DescribeRefreshSchemasStatusMessage,
  DescribeRefreshSchemasStatusResponse,
  DescribeRefreshSchemasStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRefreshSchemasStatusMessage,
  output: DescribeRefreshSchemasStatusResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRefreshSchemasStatus",
}));

export type DescribeReplicationConfigsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns one or more existing DMS Serverless replication configurations as a list of
 * structures.
 */
export const describeReplicationConfigs: API.PaginatedOperationMethod<
  DescribeReplicationConfigsMessage,
  DescribeReplicationConfigsResponse,
  DescribeReplicationConfigsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationConfigsMessage,
  output: DescribeReplicationConfigsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationInstancesError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about replication instances for your account in the current
 * region.
 */
export const describeReplicationInstances: API.PaginatedOperationMethod<
  DescribeReplicationInstancesMessage,
  DescribeReplicationInstancesResponse,
  DescribeReplicationInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationInstancesMessage,
  output: DescribeReplicationInstancesResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationInstanceTaskLogsError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the task logs for the specified task.
 */
export const describeReplicationInstanceTaskLogs: API.PaginatedOperationMethod<
  DescribeReplicationInstanceTaskLogsMessage,
  DescribeReplicationInstanceTaskLogsResponse,
  DescribeReplicationInstanceTaskLogsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationInstanceTaskLogsMessage,
  output: DescribeReplicationInstanceTaskLogsResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationInstanceTaskLogs",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationsError = ResourceNotFoundFault | CommonErrors;
/**
 * Provides details on replication progress by returning status information for one or more
 * provisioned DMS Serverless replications.
 */
export const describeReplications: API.PaginatedOperationMethod<
  DescribeReplicationsMessage,
  DescribeReplicationsResponse,
  DescribeReplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationsMessage,
  output: DescribeReplicationsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationSubnetGroupsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the replication subnet groups.
 */
export const describeReplicationSubnetGroups: API.PaginatedOperationMethod<
  DescribeReplicationSubnetGroupsMessage,
  DescribeReplicationSubnetGroupsResponse,
  DescribeReplicationSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationSubnetGroupsMessage,
  output: DescribeReplicationSubnetGroupsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTableStatisticsError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns table and schema statistics for one or more provisioned replications that use a
 * given DMS Serverless replication configuration.
 */
export const describeReplicationTableStatistics: API.PaginatedOperationMethod<
  DescribeReplicationTableStatisticsMessage,
  DescribeReplicationTableStatisticsResponse,
  DescribeReplicationTableStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationTableStatisticsMessage,
  output: DescribeReplicationTableStatisticsResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTableStatistics",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskAssessmentResultsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns the task assessment results from the Amazon S3 bucket that DMS creates in your
 * Amazon Web Services account. This action always returns the latest results.
 *
 * For more information about DMS task assessments, see Creating a task assessment
 * report in the *Database Migration Service User Guide*.
 */
export const describeReplicationTaskAssessmentResults: API.PaginatedOperationMethod<
  DescribeReplicationTaskAssessmentResultsMessage,
  DescribeReplicationTaskAssessmentResultsResponse,
  DescribeReplicationTaskAssessmentResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationTaskAssessmentResultsMessage,
  output: DescribeReplicationTaskAssessmentResultsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskAssessmentResults",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskAssessmentRunsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of premigration assessment runs based on filter
 * settings.
 *
 * These filter settings can specify a combination of premigration assessment runs,
 * migration tasks, replication instances, and assessment run status values.
 *
 * This operation doesn't return information about individual assessments. For this
 * information, see the `DescribeReplicationTaskIndividualAssessments`
 * operation.
 */
export const describeReplicationTaskAssessmentRuns: API.PaginatedOperationMethod<
  DescribeReplicationTaskAssessmentRunsMessage,
  DescribeReplicationTaskAssessmentRunsResponse,
  DescribeReplicationTaskAssessmentRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationTaskAssessmentRunsMessage,
  output: DescribeReplicationTaskAssessmentRunsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskAssessmentRuns",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTaskIndividualAssessmentsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a paginated list of individual assessments based on filter settings.
 *
 * These filter settings can specify a combination of premigration assessment runs,
 * migration tasks, and assessment status values.
 */
export const describeReplicationTaskIndividualAssessments: API.PaginatedOperationMethod<
  DescribeReplicationTaskIndividualAssessmentsMessage,
  DescribeReplicationTaskIndividualAssessmentsResponse,
  DescribeReplicationTaskIndividualAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationTaskIndividualAssessmentsMessage,
  output: DescribeReplicationTaskIndividualAssessmentsResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTaskIndividualAssessments",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationTasksError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about replication tasks for your account in the current
 * region.
 */
export const describeReplicationTasks: API.PaginatedOperationMethod<
  DescribeReplicationTasksMessage,
  DescribeReplicationTasksResponse,
  DescribeReplicationTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationTasksMessage,
  output: DescribeReplicationTasksResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationTasks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSchemasError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns information about the schema for the specified endpoint.
 */
export const describeSchemas: API.PaginatedOperationMethod<
  DescribeSchemasMessage,
  DescribeSchemasResponse,
  DescribeSchemasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSchemasMessage,
  output: DescribeSchemasResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchemas",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTableStatisticsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns table statistics on the database migration task, including table name, rows
 * inserted, rows updated, and rows deleted.
 *
 * Note that the "last updated" column the DMS console only indicates the time that DMS
 * last updated the table statistics record for a table. It does not indicate the time of the
 * last update to the table.
 */
export const describeTableStatistics: API.PaginatedOperationMethod<
  DescribeTableStatisticsMessage,
  DescribeTableStatisticsResponse,
  DescribeTableStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTableStatisticsMessage,
  output: DescribeTableStatisticsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableStatistics",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ExportMetadataModelAssessmentError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Saves a copy of a database migration assessment report to your Amazon S3 bucket. DMS can
 * save your assessment report as a comma-separated value (CSV) or a PDF file.
 */
export const exportMetadataModelAssessment: API.OperationMethod<
  ExportMetadataModelAssessmentMessage,
  ExportMetadataModelAssessmentResponse,
  ExportMetadataModelAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportMetadataModelAssessmentMessage,
  output: ExportMetadataModelAssessmentResponse,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportMetadataModelAssessment",
}));

export type GetTargetSelectionRulesError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Converts source selection rules into their target counterparts for schema conversion operations.
 */
export const getTargetSelectionRules: API.OperationMethod<
  GetTargetSelectionRulesMessage,
  GetTargetSelectionRulesResponse,
  GetTargetSelectionRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTargetSelectionRulesMessage,
  output: GetTargetSelectionRulesResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTargetSelectionRules",
}));

export type ImportCertificateError =
  | InvalidCertificateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Uploads the specified certificate.
 */
export const importCertificate: API.OperationMethod<
  ImportCertificateMessage,
  ImportCertificateResponse,
  ImportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportCertificateMessage,
  output: ImportCertificateResponse,
  errors: [
    InvalidCertificateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
}));

export type ListTagsForResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Lists all metadata tags attached to an DMS resource, including replication instance,
 * endpoint, subnet group, and migration task. For more information, see
 * `Tag`
 *
 * data type description.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceMessage,
  output: ListTagsForResourceResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyConversionConfigurationError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified schema conversion configuration using the provided parameters.
 */
export const modifyConversionConfiguration: API.OperationMethod<
  ModifyConversionConfigurationMessage,
  ModifyConversionConfigurationResponse,
  ModifyConversionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyConversionConfigurationMessage,
  output: ModifyConversionConfigurationResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyConversionConfiguration",
}));

export type ModifyDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing DMS data migration.
 */
export const modifyDataMigration: API.OperationMethod<
  ModifyDataMigrationMessage,
  ModifyDataMigrationResponse,
  ModifyDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDataMigrationMessage,
  output: ModifyDataMigrationResponse,
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDataMigration",
}));

export type ModifyDataProviderError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified data provider using the provided settings.
 *
 * You must remove the data provider from all migration projects before you can modify
 * it.
 */
export const modifyDataProvider: API.OperationMethod<
  ModifyDataProviderMessage,
  ModifyDataProviderResponse,
  ModifyDataProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDataProviderMessage,
  output: ModifyDataProviderResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDataProvider",
}));

export type ModifyEndpointError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified endpoint.
 *
 * For a MySQL source or target endpoint, don't explicitly specify the database using
 * the `DatabaseName` request parameter on the `ModifyEndpoint` API
 * call. Specifying `DatabaseName` when you modify a MySQL endpoint replicates
 * all the task tables to this single database. For MySQL endpoints, you specify the
 * database only when you specify the schema in the table-mapping rules of the DMS
 * task.
 */
export const modifyEndpoint: API.OperationMethod<
  ModifyEndpointMessage,
  ModifyEndpointResponse,
  ModifyEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyEndpointMessage,
  output: ModifyEndpointResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpoint",
}));

export type ModifyEventSubscriptionError =
  | AccessDeniedFault
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSInvalidStateFault
  | KMSNotFoundFault
  | KMSThrottlingFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | CommonErrors;
/**
 * Modifies an existing DMS event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResponse,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyEventSubscriptionMessage,
  output: ModifyEventSubscriptionResponse,
  errors: [
    AccessDeniedFault,
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSInvalidStateFault,
    KMSNotFoundFault,
    KMSThrottlingFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
}));

export type ModifyInstanceProfileError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified instance profile using the provided parameters.
 *
 * All migration projects associated with the instance profile must be deleted or
 * modified before you can modify the instance profile.
 */
export const modifyInstanceProfile: API.OperationMethod<
  ModifyInstanceProfileMessage,
  ModifyInstanceProfileResponse,
  ModifyInstanceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyInstanceProfileMessage,
  output: ModifyInstanceProfileResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceProfile",
}));

export type ModifyMigrationProjectError =
  | AccessDeniedFault
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified migration project using the provided parameters.
 *
 * The migration project must be closed before you can modify it.
 */
export const modifyMigrationProject: API.OperationMethod<
  ModifyMigrationProjectMessage,
  ModifyMigrationProjectResponse,
  ModifyMigrationProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyMigrationProjectMessage,
  output: ModifyMigrationProjectResponse,
  errors: [
    AccessDeniedFault,
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyMigrationProject",
}));

export type ModifyReplicationConfigError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | InvalidSubnet
  | KMSKeyNotAccessibleFault
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing DMS Serverless replication configuration that you can use to
 * start a replication. This command includes input validation and logic to check the state of
 * any replication that uses this configuration. You can only modify a replication
 * configuration before any replication that uses it has started. As soon as you have
 * initially started a replication with a given configuiration, you can't modify that
 * configuration, even if you stop it.
 *
 * Other run statuses that allow you to run this command include FAILED and CREATED. A
 * provisioning state that allows you to run this command is FAILED_PROVISION.
 */
export const modifyReplicationConfig: API.OperationMethod<
  ModifyReplicationConfigMessage,
  ModifyReplicationConfigResponse,
  ModifyReplicationConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationConfigMessage,
  output: ModifyReplicationConfigResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    InvalidSubnet,
    KMSKeyNotAccessibleFault,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationConfig",
}));

export type ModifyReplicationInstanceError =
  | AccessDeniedFault
  | InsufficientResourceCapacityFault
  | InvalidResourceStateFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | StorageQuotaExceededFault
  | UpgradeDependencyFailureFault
  | CommonErrors;
/**
 * Modifies the replication instance to apply new settings. You can change one or more
 * parameters by specifying these parameters and the new values in the request.
 *
 * Some settings are applied during the maintenance window.
 */
export const modifyReplicationInstance: API.OperationMethod<
  ModifyReplicationInstanceMessage,
  ModifyReplicationInstanceResponse,
  ModifyReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationInstanceMessage,
  output: ModifyReplicationInstanceResponse,
  errors: [
    AccessDeniedFault,
    InsufficientResourceCapacityFault,
    InvalidResourceStateFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    StorageQuotaExceededFault,
    UpgradeDependencyFailureFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationInstance",
}));

export type ModifyReplicationSubnetGroupError =
  | AccessDeniedFault
  | InvalidSubnet
  | ReplicationSubnetGroupDoesNotCoverEnoughAZs
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies the settings for the specified replication subnet group.
 */
export const modifyReplicationSubnetGroup: API.OperationMethod<
  ModifyReplicationSubnetGroupMessage,
  ModifyReplicationSubnetGroupResponse,
  ModifyReplicationSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationSubnetGroupMessage,
  output: ModifyReplicationSubnetGroupResponse,
  errors: [
    AccessDeniedFault,
    InvalidSubnet,
    ReplicationSubnetGroupDoesNotCoverEnoughAZs,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    SubnetAlreadyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationSubnetGroup",
}));

export type ModifyReplicationTaskError =
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Modifies the specified replication task.
 *
 * You can't modify the task endpoints. The task must be stopped before you can modify it.
 *
 * For more information about DMS tasks, see Working with Migration Tasks in the
 * *Database Migration Service User Guide*.
 */
export const modifyReplicationTask: API.OperationMethod<
  ModifyReplicationTaskMessage,
  ModifyReplicationTaskResponse,
  ModifyReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationTaskMessage,
  output: ModifyReplicationTaskResponse,
  errors: [
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationTask",
}));

export type MoveReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Moves a replication task from its current replication instance to a different target
 * replication instance using the specified parameters. The target replication instance must
 * be created with the same or later DMS version as the current replication instance.
 */
export const moveReplicationTask: API.OperationMethod<
  MoveReplicationTaskMessage,
  MoveReplicationTaskResponse,
  MoveReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MoveReplicationTaskMessage,
  output: MoveReplicationTaskResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MoveReplicationTask",
}));

export type RebootReplicationInstanceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reboots a replication instance. Rebooting results in a momentary outage, until the
 * replication instance becomes available again.
 */
export const rebootReplicationInstance: API.OperationMethod<
  RebootReplicationInstanceMessage,
  RebootReplicationInstanceResponse,
  RebootReplicationInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootReplicationInstanceMessage,
  output: RebootReplicationInstanceResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootReplicationInstance",
}));

export type RefreshSchemasError =
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Populates the schema for the specified endpoint. This is an asynchronous operation and
 * can take several minutes. You can check the status of this operation by calling the
 * DescribeRefreshSchemasStatus operation.
 */
export const refreshSchemas: API.OperationMethod<
  RefreshSchemasMessage,
  RefreshSchemasResponse,
  RefreshSchemasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RefreshSchemasMessage,
  output: RefreshSchemasResponse,
  errors: [
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshSchemas",
}));

export type ReloadReplicationTablesError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reloads the target database table with the source data for a given DMS Serverless
 * replication configuration.
 *
 * You can only use this operation with a task in the RUNNING state, otherwise the service
 * will throw an `InvalidResourceStateFault` exception.
 */
export const reloadReplicationTables: API.OperationMethod<
  ReloadReplicationTablesMessage,
  ReloadReplicationTablesResponse,
  ReloadReplicationTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReloadReplicationTablesMessage,
  output: ReloadReplicationTablesResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReloadReplicationTables",
}));

export type ReloadTablesError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Reloads the target database table with the source data.
 *
 * You can only use this operation with a task in the `RUNNING` state, otherwise
 * the service will throw an `InvalidResourceStateFault` exception.
 */
export const reloadTables: API.OperationMethod<
  ReloadTablesMessage,
  ReloadTablesResponse,
  ReloadTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReloadTablesMessage,
  output: ReloadTablesResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReloadTables",
}));

export type RemoveTagsFromResourceError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Removes metadata tags from an DMS resource, including replication instance, endpoint,
 * subnet group, and migration task. For more information, see
 * `Tag`
 * data type
 * description.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromResourceMessage,
  output: RemoveTagsFromResourceResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type RunFleetAdvisorLsaAnalysisError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Runs large-scale assessment (LSA) analysis on every Fleet Advisor collector in your account.
 */
export const runFleetAdvisorLsaAnalysis: API.OperationMethod<
  RunFleetAdvisorLsaAnalysisRequest,
  RunFleetAdvisorLsaAnalysisResponse,
  RunFleetAdvisorLsaAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RunFleetAdvisorLsaAnalysisRequest,
  output: RunFleetAdvisorLsaAnalysisResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunFleetAdvisorLsaAnalysis",
}));

export type StartDataMigrationError =
  | FailedDependencyFault
  | InvalidOperationFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Starts the specified data migration.
 */
export const startDataMigration: API.OperationMethod<
  StartDataMigrationMessage,
  StartDataMigrationResponse,
  StartDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataMigrationMessage,
  output: StartDataMigrationResponse,
  errors: [
    FailedDependencyFault,
    InvalidOperationFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataMigration",
}));

export type StartExtensionPackAssociationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies the extension pack to your target database. An extension pack is an add-on
 * module that emulates functions present in a source database that are required when
 * converting objects to the target database.
 */
export const startExtensionPackAssociation: API.OperationMethod<
  StartExtensionPackAssociationMessage,
  StartExtensionPackAssociationResponse,
  StartExtensionPackAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExtensionPackAssociationMessage,
  output: StartExtensionPackAssociationResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExtensionPackAssociation",
}));

export type StartMetadataModelAssessmentError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Creates a database migration assessment report by assessing the migration complexity for
 * your source database. A database migration assessment report summarizes all of the schema
 * conversion tasks. It also details the action items for database objects that can't be
 * converted to the database engine of your target database instance.
 */
export const startMetadataModelAssessment: API.OperationMethod<
  StartMetadataModelAssessmentMessage,
  StartMetadataModelAssessmentResponse,
  StartMetadataModelAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelAssessmentMessage,
  output: StartMetadataModelAssessmentResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelAssessment",
}));

export type StartMetadataModelConversionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Converts your source database objects to a format compatible with the target database.
 */
export const startMetadataModelConversion: API.OperationMethod<
  StartMetadataModelConversionMessage,
  StartMetadataModelConversionResponse,
  StartMetadataModelConversionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelConversionMessage,
  output: StartMetadataModelConversionResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelConversion",
}));

export type StartMetadataModelCreationError =
  | AccessDeniedFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Creates source metadata model of the given type with the specified properties for schema conversion operations.
 *
 * This action supports only these directions: from SQL Server to Aurora PostgreSQL, or from SQL Server to RDS for PostgreSQL.
 */
export const startMetadataModelCreation: API.OperationMethod<
  StartMetadataModelCreationMessage,
  StartMetadataModelCreationResponse,
  StartMetadataModelCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelCreationMessage,
  output: StartMetadataModelCreationResponse,
  errors: [
    AccessDeniedFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelCreation",
}));

export type StartMetadataModelExportAsScriptError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Saves your converted code to a file as a SQL script, and stores this file on your Amazon S3
 * bucket.
 */
export const startMetadataModelExportAsScript: API.OperationMethod<
  StartMetadataModelExportAsScriptMessage,
  StartMetadataModelExportAsScriptResponse,
  StartMetadataModelExportAsScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelExportAsScriptMessage,
  output: StartMetadataModelExportAsScriptResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelExportAsScript",
}));

export type StartMetadataModelExportToTargetError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies converted database objects to your target database.
 */
export const startMetadataModelExportToTarget: API.OperationMethod<
  StartMetadataModelExportToTargetMessage,
  StartMetadataModelExportToTargetResponse,
  StartMetadataModelExportToTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelExportToTargetMessage,
  output: StartMetadataModelExportToTargetResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelExportToTarget",
}));

export type StartMetadataModelImportError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Loads the metadata for all the dependent database objects of the parent object.
 *
 * This operation uses your project's Amazon S3 bucket as a metadata cache to improve
 * performance.
 */
export const startMetadataModelImport: API.OperationMethod<
  StartMetadataModelImportMessage,
  StartMetadataModelImportResponse,
  StartMetadataModelImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetadataModelImportMessage,
  output: StartMetadataModelImportResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataModelImport",
}));

export type StartRecommendationsError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * End of support notice: On May 20, 2026, Amazon Web Services will end support for Amazon Web Services DMS Fleet Advisor;. After May 20, 2026, you will no longer be able to access the Amazon Web Services DMS Fleet Advisor; console or Amazon Web Services DMS Fleet Advisor; resources. For more information, see Amazon Web Services DMS Fleet Advisor end of support.
 *
 * Starts the analysis of your source database to provide recommendations of target
 * engines.
 *
 * You can create recommendations for multiple source databases using BatchStartRecommendations.
 */
export const startRecommendations: API.OperationMethod<
  StartRecommendationsRequest,
  StartRecommendationsResponse,
  StartRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartRecommendationsRequest,
  output: StartRecommendationsResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommendations",
}));

export type StartReplicationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * For a given DMS Serverless replication configuration, DMS connects to the source
 * endpoint and collects the metadata to analyze the replication workload. Using this
 * metadata, DMS then computes and provisions the required capacity and starts replicating
 * to the target endpoint using the server resources that DMS has provisioned for the DMS
 * Serverless replication.
 */
export const startReplication: API.OperationMethod<
  StartReplicationMessage,
  StartReplicationResponse,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationMessage,
  output: StartReplicationResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
}));

export type StartReplicationTaskError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts the replication task.
 *
 * For more information about DMS tasks, see Working with Migration Tasks in the
 * *Database Migration Service User Guide.*
 */
export const startReplicationTask: API.OperationMethod<
  StartReplicationTaskMessage,
  StartReplicationTaskResponse,
  StartReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationTaskMessage,
  output: StartReplicationTaskResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTask",
}));

export type StartReplicationTaskAssessmentError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts the replication task assessment for unsupported data types in the source
 * database.
 *
 * You can only use this operation for a task if the following conditions are true:
 *
 * - The task must be in the `stopped` state.
 *
 * - The task must have successful connections to the source and target.
 *
 * If either of these conditions are not met, an `InvalidResourceStateFault`
 * error will result.
 *
 * For information about DMS task assessments, see Creating a task assessment report in the Database Migration Service User
 * Guide.
 */
export const startReplicationTaskAssessment: API.OperationMethod<
  StartReplicationTaskAssessmentMessage,
  StartReplicationTaskAssessmentResponse,
  StartReplicationTaskAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationTaskAssessmentMessage,
  output: StartReplicationTaskAssessmentResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTaskAssessment",
}));

export type StartReplicationTaskAssessmentRunError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSAccessDeniedFault
  | KMSDisabledFault
  | KMSFault
  | KMSInvalidStateFault
  | KMSKeyNotAccessibleFault
  | KMSNotFoundFault
  | ResourceAlreadyExistsFault
  | ResourceNotFoundFault
  | S3AccessDeniedFault
  | S3ResourceNotFoundFault
  | CommonErrors;
/**
 * Starts a new premigration assessment run for one or more individual assessments of a
 * migration task.
 *
 * The assessments that you can specify depend on the source and target database engine and
 * the migration type defined for the given task. To run this operation, your migration task
 * must already be created. After you run this operation, you can review the status of each
 * individual assessment. You can also run the migration task manually after the assessment
 * run and its individual assessments complete.
 */
export const startReplicationTaskAssessmentRun: API.OperationMethod<
  StartReplicationTaskAssessmentRunMessage,
  StartReplicationTaskAssessmentRunResponse,
  StartReplicationTaskAssessmentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartReplicationTaskAssessmentRunMessage,
  output: StartReplicationTaskAssessmentRunResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSAccessDeniedFault,
    KMSDisabledFault,
    KMSFault,
    KMSInvalidStateFault,
    KMSKeyNotAccessibleFault,
    KMSNotFoundFault,
    ResourceAlreadyExistsFault,
    ResourceNotFoundFault,
    S3AccessDeniedFault,
    S3ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplicationTaskAssessmentRun",
}));

export type StopDataMigrationError =
  | FailedDependencyFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Stops the specified data migration.
 */
export const stopDataMigration: API.OperationMethod<
  StopDataMigrationMessage,
  StopDataMigrationResponse,
  StopDataMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDataMigrationMessage,
  output: StopDataMigrationResponse,
  errors: [
    FailedDependencyFault,
    InvalidResourceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDataMigration",
}));

export type StopReplicationError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * For a given DMS Serverless replication configuration, DMS stops any and all ongoing
 * DMS Serverless replications. This command doesn't deprovision the stopped
 * replications.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationMessage,
  StopReplicationResponse,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopReplicationMessage,
  output: StopReplicationResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
}));

export type StopReplicationTaskError =
  | InvalidResourceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Stops the replication task.
 */
export const stopReplicationTask: API.OperationMethod<
  StopReplicationTaskMessage,
  StopReplicationTaskResponse,
  StopReplicationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopReplicationTaskMessage,
  output: StopReplicationTaskResponse,
  errors: [InvalidResourceStateFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplicationTask",
}));

export type TestConnectionError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundFault
  | ResourceQuotaExceededFault
  | CommonErrors;
/**
 * Tests the connection between the replication instance and the endpoint.
 */
export const testConnection: API.OperationMethod<
  TestConnectionMessage,
  TestConnectionResponse,
  TestConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestConnectionMessage,
  output: TestConnectionResponse,
  errors: [
    AccessDeniedFault,
    InvalidResourceStateFault,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundFault,
    ResourceQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
}));

export type UpdateSubscriptionsToEventBridgeError =
  | AccessDeniedFault
  | InvalidResourceStateFault
  | CommonErrors;
/**
 * Migrates 10 active and enabled Amazon SNS subscriptions at a time and converts them to
 * corresponding Amazon EventBridge rules. By default, this operation migrates subscriptions
 * only when all your replication instance versions are 3.4.5 or higher. If any replication
 * instances are from versions earlier than 3.4.5, the operation raises an error and tells you
 * to upgrade these instances to version 3.4.5 or higher. To enable migration regardless of
 * version, set the `Force` option to true. However, if you don't upgrade instances
 * earlier than version 3.4.5, some types of events might not be available when you use Amazon
 * EventBridge.
 *
 * To call this operation, make sure that you have certain permissions added to your user
 * account. For more information, see Migrating event subscriptions to Amazon EventBridge in the
 * *Amazon Web Services Database Migration Service User Guide*.
 */
export const updateSubscriptionsToEventBridge: API.OperationMethod<
  UpdateSubscriptionsToEventBridgeMessage,
  UpdateSubscriptionsToEventBridgeResponse,
  UpdateSubscriptionsToEventBridgeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionsToEventBridgeMessage,
  output: UpdateSubscriptionsToEventBridgeResponse,
  errors: [AccessDeniedFault, InvalidResourceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionsToEventBridge",
}));
