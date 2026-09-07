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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({ sdkId: "odb", serviceShapeName: "Odb" });
const auth = T.AwsAuthSigv4({ name: "odb" });
const ver = T.ServiceVersion("2024-08-20");
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
              `https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://odb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://odb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://odb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AcceptMarketplaceRegistrationInput {
  marketplaceRegistrationToken: string;
}
export const AcceptMarketplaceRegistrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ marketplaceRegistrationToken: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptMarketplaceRegistrationInput",
}) as any as S.Schema<AcceptMarketplaceRegistrationInput>;
export interface AcceptMarketplaceRegistrationOutput {}
export const AcceptMarketplaceRegistrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptMarketplaceRegistrationOutput",
}) as any as S.Schema<AcceptMarketplaceRegistrationOutput>;
export type RoleArn = string;
export type SupportedAwsIntegration = "KmsTde" | (string & {});
export const SupportedAwsIntegration = S.String;

export type Arn = string;
export interface AssociateIamRoleToResourceInput {
  iamRoleArn: string;
  awsIntegration: SupportedAwsIntegration;
  resourceArn: string;
}
export const AssociateIamRoleToResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iamRoleArn: S.String,
    awsIntegration: SupportedAwsIntegration,
    resourceArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateIamRoleToResourceInput",
}) as any as S.Schema<AssociateIamRoleToResourceInput>;
export interface AssociateIamRoleToResourceOutput {}
export const AssociateIamRoleToResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateIamRoleToResourceOutput",
}) as any as S.Schema<AssociateIamRoleToResourceOutput>;
export type ResourceIdOrArn = string;
export interface AssociateVirtualMachinesToExadbVmClusterInput {
  exadbVmClusterId: string;
  desiredNodeCount: number;
}
export const AssociateVirtualMachinesToExadbVmClusterInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ exadbVmClusterId: S.String, desiredNodeCount: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AssociateVirtualMachinesToExadbVmClusterInput",
  }) as any as S.Schema<AssociateVirtualMachinesToExadbVmClusterInput>;
export type ResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "MAINTENANCE_IN_PROGRESS"
  | (string & {});
export const ResourceStatus = S.String;

export interface AssociateVirtualMachinesToExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export const AssociateVirtualMachinesToExadbVmClusterOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      exadbVmClusterId: S.String,
    }),
  ).annotate({
    identifier: "AssociateVirtualMachinesToExadbVmClusterOutput",
  }) as any as S.Schema<AssociateVirtualMachinesToExadbVmClusterOutput>;
export type ResourceDisplayName = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type DbWorkload = "OLTP" | "AJD" | "APEX" | "LH" | (string & {});
export const DbWorkload = S.String;

export type LicenseModel =
  | "BRING_YOUR_OWN_LICENSE"
  | "LICENSE_INCLUDED"
  | (string & {});
export const LicenseModel = S.String;

export type DatabaseEdition =
  | "STANDARD_EDITION"
  | "ENTERPRISE_EDITION"
  | (string & {});
export const DatabaseEdition = S.String;

export type StandbyAllowlistedIpsSource =
  | "PRIMARY"
  | "SEPARATE"
  | "NOT_APPLICABLE"
  | (string & {});
export const StandbyAllowlistedIpsSource = S.String;

export type AutonomousMaintenanceScheduleType =
  | "EARLY"
  | "REGULAR"
  | (string & {});
export const AutonomousMaintenanceScheduleType = S.String;

export interface CustomerContact {
  email?: string | redacted.Redacted<string>;
}
export const CustomerContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ email: S.optional(SensitiveString) }),
).annotate({
  identifier: "CustomerContact",
}) as any as S.Schema<CustomerContact>;
export type CustomerContacts = CustomerContact[];
export const CustomerContacts = /*@__PURE__*/ S.Array(CustomerContact);
export interface ResourcePoolSummary {
  isDisabled?: boolean;
  poolSize?: number;
  poolStorageSizeInTBs?: number;
  availableStorageCapacityInTBs?: number;
  totalComputeCapacity?: number;
  availableComputeCapacity?: number;
}
export const ResourcePoolSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isDisabled: S.optional(S.Boolean),
    poolSize: S.optional(S.Number),
    poolStorageSizeInTBs: S.optional(S.Number),
    availableStorageCapacityInTBs: S.optional(S.Number),
    totalComputeCapacity: S.optional(S.Number),
    availableComputeCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResourcePoolSummary",
}) as any as S.Schema<ResourcePoolSummary>;
export type DayOfWeekName =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const DayOfWeekName = S.String;

export interface DayOfWeek {
  name?: DayOfWeekName;
}
export const DayOfWeek = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(DayOfWeekName) }),
).annotate({ identifier: "DayOfWeek" }) as any as S.Schema<DayOfWeek>;
export interface ScheduledOperationDetails {
  dayOfWeek: DayOfWeek;
  scheduledStartTime?: string;
  scheduledStopTime?: string;
}
export const ScheduledOperationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dayOfWeek: DayOfWeek,
    scheduledStartTime: S.optional(S.String),
    scheduledStopTime: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledOperationDetails",
}) as any as S.Schema<ScheduledOperationDetails>;
export type ScheduledOperationDetailsList = ScheduledOperationDetails[];
export const ScheduledOperationDetailsList = /*@__PURE__*/ S.Array(
  ScheduledOperationDetails,
);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface TransportableTablespace {
  ttsBundleUrl?: string;
}
export const TransportableTablespace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ttsBundleUrl: S.optional(S.String) }),
).annotate({
  identifier: "TransportableTablespace",
}) as any as S.Schema<TransportableTablespace>;
export interface DatabaseTool {
  isEnabled?: boolean;
  name?: string;
  computeCount?: number;
  maxIdleTimeInMinutes?: number;
}
export const DatabaseTool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isEnabled: S.optional(S.Boolean),
    name: S.optional(S.String),
    computeCount: S.optional(S.Number),
    maxIdleTimeInMinutes: S.optional(S.Number),
  }),
).annotate({ identifier: "DatabaseTool" }) as any as S.Schema<DatabaseTool>;
export type DatabaseToolList = DatabaseTool[];
export const DatabaseToolList = /*@__PURE__*/ S.Array(DatabaseTool);
export type SourceType =
  | "NONE"
  | "DATABASE"
  | "BACKUP_FROM_ID"
  | "BACKUP_FROM_TIMESTAMP"
  | "CROSS_REGION_DATAGUARD"
  | "CROSS_REGION_DISASTER_RECOVERY"
  | "CLONE_TO_REFRESHABLE"
  | (string & {});
export const SourceType = S.String;

export type CloneType = "FULL" | "METADATA" | "PARTIAL" | (string & {});
export const CloneType = S.String;

export interface DatabaseCloneConfiguration {
  sourceAutonomousDatabaseId: string;
  cloneType: CloneType;
}
export const DatabaseCloneConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceAutonomousDatabaseId: S.String, cloneType: CloneType }),
).annotate({
  identifier: "DatabaseCloneConfiguration",
}) as any as S.Schema<DatabaseCloneConfiguration>;
export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export interface RestoreFromBackupConfiguration {
  autonomousDatabaseBackupId: string;
  cloneType: CloneType;
  cloneTableSpaceList?: number[];
}
export const RestoreFromBackupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.String,
    cloneType: CloneType,
    cloneTableSpaceList: S.optional(IntegerList),
  }),
).annotate({
  identifier: "RestoreFromBackupConfiguration",
}) as any as S.Schema<RestoreFromBackupConfiguration>;
export interface PointInTimeRestoreConfiguration {
  sourceAutonomousDatabaseId: string;
  cloneType: CloneType;
  timestamp?: Date;
  useLatestAvailableBackupTimestamp?: boolean;
  cloneTableSpaceList?: number[];
}
export const PointInTimeRestoreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceAutonomousDatabaseId: S.String,
    cloneType: CloneType,
    timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    useLatestAvailableBackupTimestamp: S.optional(S.Boolean),
    cloneTableSpaceList: S.optional(IntegerList),
  }),
).annotate({
  identifier: "PointInTimeRestoreConfiguration",
}) as any as S.Schema<PointInTimeRestoreConfiguration>;
export interface CrossRegionDataGuardConfiguration {
  sourceAutonomousDatabaseArn: string;
}
export const CrossRegionDataGuardConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceAutonomousDatabaseArn: S.String }),
).annotate({
  identifier: "CrossRegionDataGuardConfiguration",
}) as any as S.Schema<CrossRegionDataGuardConfiguration>;
export type DisasterRecoveryType = "ADG" | "BACKUP_BASED" | (string & {});
export const DisasterRecoveryType = S.String;

export interface CrossRegionDisasterRecoveryConfiguration {
  sourceAutonomousDatabaseArn: string;
  remoteDisasterRecoveryType: DisasterRecoveryType;
  isReplicateAutomaticBackups?: boolean;
}
export const CrossRegionDisasterRecoveryConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceAutonomousDatabaseArn: S.String,
      remoteDisasterRecoveryType: DisasterRecoveryType,
      isReplicateAutomaticBackups: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "CrossRegionDisasterRecoveryConfiguration",
}) as any as S.Schema<CrossRegionDisasterRecoveryConfiguration>;
export type RefreshableMode = "AUTOMATIC" | "MANUAL" | (string & {});
export const RefreshableMode = S.String;

export type OpenMode = "READ_ONLY" | "READ_WRITE" | (string & {});
export const OpenMode = S.String;

export interface CloneToRefreshableConfiguration {
  sourceAutonomousDatabaseId: string;
  refreshableMode?: RefreshableMode;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  timeOfAutoRefreshStart?: Date;
  openMode?: OpenMode;
  cloneType?: CloneType;
}
export const CloneToRefreshableConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceAutonomousDatabaseId: S.String,
    refreshableMode: S.optional(RefreshableMode),
    autoRefreshFrequencyInSeconds: S.optional(S.Number),
    autoRefreshPointLagInSeconds: S.optional(S.Number),
    timeOfAutoRefreshStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    openMode: S.optional(OpenMode),
    cloneType: S.optional(CloneType),
  }),
).annotate({
  identifier: "CloneToRefreshableConfiguration",
}) as any as S.Schema<CloneToRefreshableConfiguration>;
export type SourceConfiguration =
  | {
      databaseClone: DatabaseCloneConfiguration;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup: RestoreFromBackupConfiguration;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore: PointInTimeRestoreConfiguration;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard: CrossRegionDataGuardConfiguration;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery: CrossRegionDisasterRecoveryConfiguration;
      cloneToRefreshable?: never;
    }
  | {
      databaseClone?: never;
      restoreFromBackup?: never;
      pointInTimeRestore?: never;
      crossRegionDataGuard?: never;
      crossRegionDisasterRecovery?: never;
      cloneToRefreshable: CloneToRefreshableConfiguration;
    };
export const SourceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ databaseClone: DatabaseCloneConfiguration }),
  S.Struct({ restoreFromBackup: RestoreFromBackupConfiguration }),
  S.Struct({ pointInTimeRestore: PointInTimeRestoreConfiguration }),
  S.Struct({ crossRegionDataGuard: CrossRegionDataGuardConfiguration }),
  S.Struct({
    crossRegionDisasterRecovery: CrossRegionDisasterRecoveryConfiguration,
  }),
  S.Struct({ cloneToRefreshable: CloneToRefreshableConfiguration }),
]);
export type EncryptionKeyProviderInput =
  | "ORACLE_MANAGED"
  | "AWS_KMS"
  | (string & {});
export const EncryptionKeyProviderInput = S.String;

export type ExternalIdType =
  | "database_ocid"
  | "compartment_ocid"
  | "tenant_ocid"
  | (string & {});
export const ExternalIdType = S.String;

export type KmsKeyIdOrArn = string;
export interface AwsEncryptionKeyConfigurationInput {
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
  kmsKeyId?: string;
}
export const AwsEncryptionKeyConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iamRoleArn: S.optional(S.String),
    externalIdType: S.optional(ExternalIdType),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEncryptionKeyConfigurationInput",
}) as any as S.Schema<AwsEncryptionKeyConfigurationInput>;
export type EncryptionKeyConfigurationInput = {
  awsEncryptionKey: AwsEncryptionKeyConfigurationInput;
};
export const EncryptionKeyConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({ awsEncryptionKey: AwsEncryptionKeyConfigurationInput }),
]);
export type AdminPasswordSource =
  | "CUSTOMER_MANAGED_AWS_SECRET"
  | "API_REQUEST_PARAMETER"
  | (string & {});
export const AdminPasswordSource = S.String;

export type SecretIdOrArn = string;
export interface CustomerManagedAwsSecretConfigurationInput {
  secretId?: string;
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
}
export const CustomerManagedAwsSecretConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      secretId: S.optional(S.String),
      iamRoleArn: S.optional(S.String),
      externalIdType: S.optional(ExternalIdType),
    }),
  ).annotate({
    identifier: "CustomerManagedAwsSecretConfigurationInput",
  }) as any as S.Schema<CustomerManagedAwsSecretConfigurationInput>;
export type AdminPasswordSourceConfigurationInput = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput;
};
export const AdminPasswordSourceConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({
    customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput,
  }),
]);
export type GeneralInputString = string;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export const RequestTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAutonomousDatabaseInput {
  odbNetworkId?: string;
  displayName?: string;
  dbName?: string;
  adminPassword?: string | redacted.Redacted<string>;
  computeCount?: number;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  dbWorkload?: DbWorkload;
  isAutoScalingEnabled?: boolean;
  isAutoScalingForStorageEnabled?: boolean;
  licenseModel?: LicenseModel;
  characterSet?: string;
  ncharacterSet?: string;
  dbVersion?: string;
  databaseEdition?: DatabaseEdition;
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  backupRetentionPeriodInDays?: number;
  byolComputeCountLimit?: number;
  cpuCoreCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  resourcePoolLeaderId?: string;
  resourcePoolSummary?: ResourcePoolSummary;
  scheduledOperations?: ScheduledOperationDetails[];
  standbyAllowlistedIps?: string[];
  allowlistedIps?: string[];
  transportableTablespace?: TransportableTablespace;
  isBackupRetentionLocked?: boolean;
  isLocalDataGuardEnabled?: boolean;
  isMtlsConnectionRequired?: boolean;
  dbToolsDetails?: DatabaseTool[];
  source?: SourceType;
  sourceConfiguration?: SourceConfiguration;
  encryptionKeyProvider?: EncryptionKeyProviderInput;
  encryptionKeyConfiguration?: EncryptionKeyConfigurationInput;
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfigurationInput;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.optional(S.String),
    displayName: S.optional(S.String),
    dbName: S.optional(S.String),
    adminPassword: S.optional(SensitiveString),
    computeCount: S.optional(S.Number),
    dataStorageSizeInTBs: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    dbWorkload: S.optional(DbWorkload),
    isAutoScalingEnabled: S.optional(S.Boolean),
    isAutoScalingForStorageEnabled: S.optional(S.Boolean),
    licenseModel: S.optional(LicenseModel),
    characterSet: S.optional(S.String),
    ncharacterSet: S.optional(S.String),
    dbVersion: S.optional(S.String),
    databaseEdition: S.optional(DatabaseEdition),
    standbyAllowlistedIpsSource: S.optional(StandbyAllowlistedIpsSource),
    autonomousMaintenanceScheduleType: S.optional(
      AutonomousMaintenanceScheduleType,
    ),
    backupRetentionPeriodInDays: S.optional(S.Number),
    byolComputeCountLimit: S.optional(S.Number),
    cpuCoreCount: S.optional(S.Number),
    customerContactsToSendToOCI: S.optional(CustomerContacts),
    privateEndpointIp: S.optional(S.String),
    privateEndpointLabel: S.optional(S.String),
    resourcePoolLeaderId: S.optional(S.String),
    resourcePoolSummary: S.optional(ResourcePoolSummary),
    scheduledOperations: S.optional(ScheduledOperationDetailsList),
    standbyAllowlistedIps: S.optional(StringList),
    allowlistedIps: S.optional(StringList),
    transportableTablespace: S.optional(TransportableTablespace),
    isBackupRetentionLocked: S.optional(S.Boolean),
    isLocalDataGuardEnabled: S.optional(S.Boolean),
    isMtlsConnectionRequired: S.optional(S.Boolean),
    dbToolsDetails: S.optional(DatabaseToolList),
    source: S.optional(SourceType),
    sourceConfiguration: S.optional(SourceConfiguration),
    encryptionKeyProvider: S.optional(EncryptionKeyProviderInput),
    encryptionKeyConfiguration: S.optional(EncryptionKeyConfigurationInput),
    adminPasswordSource: S.optional(AdminPasswordSource),
    adminPasswordSourceConfiguration: S.optional(
      AdminPasswordSourceConfigurationInput,
    ),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAutonomousDatabaseInput",
}) as any as S.Schema<CreateAutonomousDatabaseInput>;
export type AutonomousDatabaseResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "MAINTENANCE_IN_PROGRESS"
  | "STOPPING"
  | "STOPPED"
  | "STARTING"
  | "UNAVAILABLE"
  | "RESTORE_IN_PROGRESS"
  | "RESTORE_FAILED"
  | "BACKUP_IN_PROGRESS"
  | "SCALE_IN_PROGRESS"
  | "AVAILABLE_NEEDS_ATTENTION"
  | "RESTARTING"
  | "RECREATING"
  | "ROLE_CHANGE_IN_PROGRESS"
  | "UPGRADING"
  | "INACCESSIBLE"
  | "STANDBY"
  | (string & {});
export const AutonomousDatabaseResourceStatus = S.String;

export interface CreateAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const CreateAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAutonomousDatabaseOutput",
}) as any as S.Schema<CreateAutonomousDatabaseOutput>;
export interface CreateAutonomousDatabaseBackupInput {
  autonomousDatabaseId: string;
  displayName?: string;
  retentionPeriodInDays?: number;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAutonomousDatabaseBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    retentionPeriodInDays: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAutonomousDatabaseBackupInput",
}) as any as S.Schema<CreateAutonomousDatabaseBackupInput>;
export interface CreateAutonomousDatabaseBackupOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  autonomousDatabaseBackupId: string;
}
export const CreateAutonomousDatabaseBackupOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      autonomousDatabaseBackupId: S.String,
    }),
).annotate({
  identifier: "CreateAutonomousDatabaseBackupOutput",
}) as any as S.Schema<CreateAutonomousDatabaseBackupOutput>;
export type WalletType = "REGIONAL" | "INSTANCE" | (string & {});
export const WalletType = S.String;

export type WalletPasswordSource =
  | "CUSTOMER_MANAGED_AWS_SECRET"
  | "API_REQUEST_PARAMETER"
  | (string & {});
export const WalletPasswordSource = S.String;

export type WalletPasswordSourceConfigurationInput = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput;
};
export const WalletPasswordSourceConfigurationInput = /*@__PURE__*/ S.Union([
  S.Struct({
    customerManagedAwsSecret: CustomerManagedAwsSecretConfigurationInput,
  }),
]);
export interface CreateAutonomousDatabaseWalletInput {
  autonomousDatabaseId: string;
  walletType?: WalletType;
  password?: string | redacted.Redacted<string>;
  passwordSource?: WalletPasswordSource;
  passwordSourceConfiguration?: WalletPasswordSourceConfigurationInput;
  clientToken?: string;
}
export const CreateAutonomousDatabaseWalletInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    walletType: S.optional(WalletType),
    password: S.optional(SensitiveString),
    passwordSource: S.optional(WalletPasswordSource),
    passwordSourceConfiguration: S.optional(
      WalletPasswordSourceConfigurationInput,
    ),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAutonomousDatabaseWalletInput",
}) as any as S.Schema<CreateAutonomousDatabaseWalletInput>;
export type AutonomousDatabaseWalletFile =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface CreateAutonomousDatabaseWalletOutput {
  autonomousDatabaseWalletFile: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const CreateAutonomousDatabaseWalletOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ autonomousDatabaseWalletFile: SensitiveBlob }),
).annotate({
  identifier: "CreateAutonomousDatabaseWalletOutput",
}) as any as S.Schema<CreateAutonomousDatabaseWalletOutput>;
export type DaysOfWeek = DayOfWeek[];
export const DaysOfWeek = /*@__PURE__*/ S.Array(DayOfWeek);
export type HoursOfDay = number[];
export const HoursOfDay = /*@__PURE__*/ S.Array(S.Number);
export type MonthName =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER"
  | (string & {});
export const MonthName = S.String;

export interface Month {
  name?: MonthName;
}
export const Month = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(MonthName) }),
).annotate({ identifier: "Month" }) as any as S.Schema<Month>;
export type Months = Month[];
export const Months = /*@__PURE__*/ S.Array(Month);
export type PatchingModeType = "ROLLING" | "NONROLLING" | (string & {});
export const PatchingModeType = S.String;

export type PreferenceType =
  | "NO_PREFERENCE"
  | "CUSTOM_PREFERENCE"
  | (string & {});
export const PreferenceType = S.String;

export type WeeksOfMonth = number[];
export const WeeksOfMonth = /*@__PURE__*/ S.Array(S.Number);
export interface MaintenanceWindow {
  customActionTimeoutInMins?: number;
  daysOfWeek?: DayOfWeek[];
  hoursOfDay?: number[];
  isCustomActionTimeoutEnabled?: boolean;
  leadTimeInWeeks?: number;
  months?: Month[];
  patchingMode?: PatchingModeType;
  preference?: PreferenceType;
  skipRu?: boolean;
  weeksOfMonth?: number[];
}
export const MaintenanceWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customActionTimeoutInMins: S.optional(S.Number),
    daysOfWeek: S.optional(DaysOfWeek),
    hoursOfDay: S.optional(HoursOfDay),
    isCustomActionTimeoutEnabled: S.optional(S.Boolean),
    leadTimeInWeeks: S.optional(S.Number),
    months: S.optional(Months),
    patchingMode: S.optional(PatchingModeType),
    preference: S.optional(PreferenceType),
    skipRu: S.optional(S.Boolean),
    weeksOfMonth: S.optional(WeeksOfMonth),
  }),
).annotate({
  identifier: "MaintenanceWindow",
}) as any as S.Schema<MaintenanceWindow>;
export interface CreateCloudAutonomousVmClusterInput {
  cloudExadataInfrastructureId: string;
  odbNetworkId: string;
  displayName: string;
  clientToken?: string;
  autonomousDataStorageSizeInTBs: number;
  cpuCoreCountPerNode: number;
  dbServers?: string[];
  description?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  memoryPerOracleComputeUnitInGBs: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  totalContainerDatabases: number;
}
export const CreateCloudAutonomousVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String,
    odbNetworkId: S.String,
    displayName: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    autonomousDataStorageSizeInTBs: S.Number,
    cpuCoreCountPerNode: S.Number,
    dbServers: S.optional(StringList),
    description: S.optional(S.String),
    isMtlsEnabledVmCluster: S.optional(S.Boolean),
    licenseModel: S.optional(LicenseModel),
    maintenanceWindow: S.optional(MaintenanceWindow),
    memoryPerOracleComputeUnitInGBs: S.Number,
    scanListenerPortNonTls: S.optional(S.Number),
    scanListenerPortTls: S.optional(S.Number),
    tags: S.optional(RequestTagMap),
    timeZone: S.optional(S.String),
    totalContainerDatabases: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCloudAutonomousVmClusterInput",
}) as any as S.Schema<CreateCloudAutonomousVmClusterInput>;
export interface CreateCloudAutonomousVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudAutonomousVmClusterId: string;
}
export const CreateCloudAutonomousVmClusterOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      cloudAutonomousVmClusterId: S.String,
    }),
).annotate({
  identifier: "CreateCloudAutonomousVmClusterOutput",
}) as any as S.Schema<CreateCloudAutonomousVmClusterOutput>;
export interface CreateCloudExadataInfrastructureInput {
  displayName: string;
  shape: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  tags?: { [key: string]: string | undefined };
  computeCount: number;
  customerContactsToSendToOCI?: CustomerContact[];
  maintenanceWindow?: MaintenanceWindow;
  storageCount: number;
  clientToken?: string;
  databaseServerType?: string;
  storageServerType?: string;
}
export const CreateCloudExadataInfrastructureInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.String,
      shape: S.String,
      availabilityZone: S.optional(S.String),
      availabilityZoneId: S.optional(S.String),
      tags: S.optional(RequestTagMap),
      computeCount: S.Number,
      customerContactsToSendToOCI: S.optional(CustomerContacts),
      maintenanceWindow: S.optional(MaintenanceWindow),
      storageCount: S.Number,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      databaseServerType: S.optional(S.String),
      storageServerType: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateCloudExadataInfrastructureInput",
}) as any as S.Schema<CreateCloudExadataInfrastructureInput>;
export interface CreateCloudExadataInfrastructureOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId: string;
}
export const CreateCloudExadataInfrastructureOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      cloudExadataInfrastructureId: S.String,
    }),
).annotate({
  identifier: "CreateCloudExadataInfrastructureOutput",
}) as any as S.Schema<CreateCloudExadataInfrastructureOutput>;
export type Hostname = string;
export type ClusterName = string;
export interface DataCollectionOptions {
  isDiagnosticsEventsEnabled?: boolean;
  isHealthMonitoringEnabled?: boolean;
  isIncidentLogsEnabled?: boolean;
}
export const DataCollectionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isDiagnosticsEventsEnabled: S.optional(S.Boolean),
    isHealthMonitoringEnabled: S.optional(S.Boolean),
    isIncidentLogsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DataCollectionOptions",
}) as any as S.Schema<DataCollectionOptions>;
export interface CreateCloudVmClusterInput {
  cloudExadataInfrastructureId: string;
  cpuCoreCount: number;
  displayName: string;
  giVersion: string;
  hostname: string;
  sshPublicKeys: string[];
  odbNetworkId: string;
  clusterName?: string;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  tags?: { [key: string]: string | undefined };
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  licenseModel?: LicenseModel;
  memorySizeInGBs?: number;
  systemVersion?: string;
  timeZone?: string;
  clientToken?: string;
  scanListenerPortTcp?: number;
}
export const CreateCloudVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String,
    cpuCoreCount: S.Number,
    displayName: S.String,
    giVersion: S.String,
    hostname: S.String,
    sshPublicKeys: StringList,
    odbNetworkId: S.String,
    clusterName: S.optional(S.String),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServers: S.optional(StringList),
    tags: S.optional(RequestTagMap),
    isLocalBackupEnabled: S.optional(S.Boolean),
    isSparseDiskgroupEnabled: S.optional(S.Boolean),
    licenseModel: S.optional(LicenseModel),
    memorySizeInGBs: S.optional(S.Number),
    systemVersion: S.optional(S.String),
    timeZone: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    scanListenerPortTcp: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCloudVmClusterInput",
}) as any as S.Schema<CreateCloudVmClusterInput>;
export interface CreateCloudVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterId: string;
}
export const CreateCloudVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudVmClusterId: S.String,
  }),
).annotate({
  identifier: "CreateCloudVmClusterOutput",
}) as any as S.Schema<CreateCloudVmClusterOutput>;
export type ShapeAttribute = "SMART_STORAGE" | "BLOCK_STORAGE" | (string & {});
export const ShapeAttribute = S.String;

export interface CreateExadbVmClusterInput {
  displayName: string;
  enabledEcpuCount: number;
  exascaleDbStorageVaultId: string;
  gridImageId: string;
  hostname: string;
  nodeCount: number;
  odbNetworkId: string;
  shape: string;
  sshPublicKeys: string[];
  totalEcpuCount: number;
  vmFileSystemStorageTotalSizeInGBs: number;
  clusterName?: string;
  dataCollectionOptions?: DataCollectionOptions;
  licenseModel?: LicenseModel;
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shapeAttribute?: ShapeAttribute;
  systemVersion?: string;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  clientToken?: string;
}
export const CreateExadbVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.String,
    enabledEcpuCount: S.Number,
    exascaleDbStorageVaultId: S.String,
    gridImageId: S.String,
    hostname: S.String,
    nodeCount: S.Number,
    odbNetworkId: S.String,
    shape: S.String,
    sshPublicKeys: StringList,
    totalEcpuCount: S.Number,
    vmFileSystemStorageTotalSizeInGBs: S.Number,
    clusterName: S.optional(S.String),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    licenseModel: S.optional(LicenseModel),
    scanListenerPortTcp: S.optional(S.Number),
    scanListenerPortTcpSsl: S.optional(S.Number),
    shapeAttribute: S.optional(ShapeAttribute),
    systemVersion: S.optional(S.String),
    tags: S.optional(RequestTagMap),
    timeZone: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExadbVmClusterInput",
}) as any as S.Schema<CreateExadbVmClusterInput>;
export interface CreateExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export const CreateExadbVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    exadbVmClusterId: S.String,
  }),
).annotate({
  identifier: "CreateExadbVmClusterOutput",
}) as any as S.Schema<CreateExadbVmClusterOutput>;
export interface CreateExascaleDbStorageVaultInput {
  displayName: string;
  highCapacityDatabaseStorageTotalSizeInGBs: number;
  additionalFlashCacheInPercent?: number;
  autoscaleLimitInGBs?: number;
  availabilityZoneId?: string;
  availabilityZone?: string;
  description?: string;
  isAutoscaleEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
  timeZone?: string;
  clientToken?: string;
}
export const CreateExascaleDbStorageVaultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.String,
    highCapacityDatabaseStorageTotalSizeInGBs: S.Number,
    additionalFlashCacheInPercent: S.optional(S.Number),
    autoscaleLimitInGBs: S.optional(S.Number),
    availabilityZoneId: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    description: S.optional(S.String),
    isAutoscaleEnabled: S.optional(S.Boolean),
    tags: S.optional(RequestTagMap),
    timeZone: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExascaleDbStorageVaultInput",
}) as any as S.Schema<CreateExascaleDbStorageVaultInput>;
export interface CreateExascaleDbStorageVaultOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exascaleDbStorageVaultId: string;
}
export const CreateExascaleDbStorageVaultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    exascaleDbStorageVaultId: S.String,
  }),
).annotate({
  identifier: "CreateExascaleDbStorageVaultOutput",
}) as any as S.Schema<CreateExascaleDbStorageVaultOutput>;
export type Access = "ENABLED" | "DISABLED" | (string & {});
export const Access = S.String;

export type PolicyDocument = string;
export interface CreateOdbNetworkInput {
  displayName: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  clientToken?: string;
  s3Access?: Access;
  zeroEtlAccess?: Access;
  stsAccess?: Access;
  kmsAccess?: Access;
  s3PolicyDocument?: string;
  stsPolicyDocument?: string;
  kmsPolicyDocument?: string;
  crossRegionS3RestoreSourcesToEnable?: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateOdbNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.String,
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    clientSubnetCidr: S.String,
    backupSubnetCidr: S.optional(S.String),
    customDomainName: S.optional(S.String),
    defaultDnsPrefix: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    s3Access: S.optional(Access),
    zeroEtlAccess: S.optional(Access),
    stsAccess: S.optional(Access),
    kmsAccess: S.optional(Access),
    s3PolicyDocument: S.optional(S.String),
    stsPolicyDocument: S.optional(S.String),
    kmsPolicyDocument: S.optional(S.String),
    crossRegionS3RestoreSourcesToEnable: S.optional(StringList),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateOdbNetworkInput",
}) as any as S.Schema<CreateOdbNetworkInput>;
export interface CreateOdbNetworkOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkId: string;
}
export const CreateOdbNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbNetworkId: S.String,
  }),
).annotate({
  identifier: "CreateOdbNetworkOutput",
}) as any as S.Schema<CreateOdbNetworkOutput>;
export type PeeredCidr = string;
export type PeeredCidrList = string[];
export const PeeredCidrList = /*@__PURE__*/ S.Array(S.String);
export type PeerNetworkRouteTableId = string;
export type PeerNetworkRouteTableIdList = string[];
export const PeerNetworkRouteTableIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateOdbPeeringConnectionInput {
  odbNetworkId: string;
  peerNetworkId: string;
  displayName?: string;
  peerNetworkCidrsToBeAdded?: string[];
  peerNetworkRouteTableIds?: string[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateOdbPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.String,
    peerNetworkId: S.String,
    displayName: S.optional(S.String),
    peerNetworkCidrsToBeAdded: S.optional(PeeredCidrList),
    peerNetworkRouteTableIds: S.optional(PeerNetworkRouteTableIdList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(RequestTagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateOdbPeeringConnectionInput",
}) as any as S.Schema<CreateOdbPeeringConnectionInput>;
export interface CreateOdbPeeringConnectionOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionId: string;
}
export const CreateOdbPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbPeeringConnectionId: S.String,
  }),
).annotate({
  identifier: "CreateOdbPeeringConnectionOutput",
}) as any as S.Schema<CreateOdbPeeringConnectionOutput>;
export interface DeleteAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export const DeleteAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAutonomousDatabaseInput",
}) as any as S.Schema<DeleteAutonomousDatabaseInput>;
export interface DeleteAutonomousDatabaseOutput {}
export const DeleteAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAutonomousDatabaseOutput",
}) as any as S.Schema<DeleteAutonomousDatabaseOutput>;
export type ResourceId = string;
export interface DeleteAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
}
export const DeleteAutonomousDatabaseBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.String.pipe(
      T.HttpLabel("autonomousDatabaseBackupId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAutonomousDatabaseBackupInput",
}) as any as S.Schema<DeleteAutonomousDatabaseBackupInput>;
export interface DeleteAutonomousDatabaseBackupOutput {}
export const DeleteAutonomousDatabaseBackupOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteAutonomousDatabaseBackupOutput",
}) as any as S.Schema<DeleteAutonomousDatabaseBackupOutput>;
export interface DeleteCloudAutonomousVmClusterInput {
  cloudAutonomousVmClusterId: string;
}
export const DeleteCloudAutonomousVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudAutonomousVmClusterId: S.String.pipe(
      T.HttpLabel("cloudAutonomousVmClusterId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCloudAutonomousVmClusterInput",
}) as any as S.Schema<DeleteCloudAutonomousVmClusterInput>;
export interface DeleteCloudAutonomousVmClusterOutput {}
export const DeleteCloudAutonomousVmClusterOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCloudAutonomousVmClusterOutput",
}) as any as S.Schema<DeleteCloudAutonomousVmClusterOutput>;
export interface DeleteCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
}
export const DeleteCloudExadataInfrastructureInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      cloudExadataInfrastructureId: S.String.pipe(
        T.HttpLabel("cloudExadataInfrastructureId"),
      ),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteCloudExadataInfrastructureInput",
}) as any as S.Schema<DeleteCloudExadataInfrastructureInput>;
export interface DeleteCloudExadataInfrastructureOutput {}
export const DeleteCloudExadataInfrastructureOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCloudExadataInfrastructureOutput",
}) as any as S.Schema<DeleteCloudExadataInfrastructureOutput>;
export interface DeleteCloudVmClusterInput {
  cloudVmClusterId: string;
}
export const DeleteCloudVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.String.pipe(T.HttpLabel("cloudVmClusterId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCloudVmClusterInput",
}) as any as S.Schema<DeleteCloudVmClusterInput>;
export interface DeleteCloudVmClusterOutput {}
export const DeleteCloudVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCloudVmClusterOutput",
}) as any as S.Schema<DeleteCloudVmClusterOutput>;
export interface DeleteExadbVmClusterInput {
  exadbVmClusterId: string;
}
export const DeleteExadbVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exadbVmClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteExadbVmClusterInput",
}) as any as S.Schema<DeleteExadbVmClusterInput>;
export interface DeleteExadbVmClusterOutput {}
export const DeleteExadbVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExadbVmClusterOutput",
}) as any as S.Schema<DeleteExadbVmClusterOutput>;
export interface DeleteExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
}
export const DeleteExascaleDbStorageVaultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exascaleDbStorageVaultId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteExascaleDbStorageVaultInput",
}) as any as S.Schema<DeleteExascaleDbStorageVaultInput>;
export interface DeleteExascaleDbStorageVaultOutput {}
export const DeleteExascaleDbStorageVaultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExascaleDbStorageVaultOutput",
}) as any as S.Schema<DeleteExascaleDbStorageVaultOutput>;
export interface DeleteOdbNetworkInput {
  odbNetworkId: string;
  deleteAssociatedResources: boolean;
}
export const DeleteOdbNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")),
    deleteAssociatedResources: S.Boolean,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOdbNetworkInput",
}) as any as S.Schema<DeleteOdbNetworkInput>;
export interface DeleteOdbNetworkOutput {}
export const DeleteOdbNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOdbNetworkOutput",
}) as any as S.Schema<DeleteOdbNetworkOutput>;
export interface DeleteOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
}
export const DeleteOdbPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbPeeringConnectionId: S.String.pipe(
      T.HttpLabel("odbPeeringConnectionId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOdbPeeringConnectionInput",
}) as any as S.Schema<DeleteOdbPeeringConnectionInput>;
export interface DeleteOdbPeeringConnectionOutput {}
export const DeleteOdbPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOdbPeeringConnectionOutput",
}) as any as S.Schema<DeleteOdbPeeringConnectionOutput>;
export interface DisassociateIamRoleFromResourceInput {
  iamRoleArn: string;
  awsIntegration: SupportedAwsIntegration;
  resourceArn: string;
}
export const DisassociateIamRoleFromResourceInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      iamRoleArn: S.String,
      awsIntegration: SupportedAwsIntegration,
      resourceArn: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateIamRoleFromResourceInput",
}) as any as S.Schema<DisassociateIamRoleFromResourceInput>;
export interface DisassociateIamRoleFromResourceOutput {}
export const DisassociateIamRoleFromResourceOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateIamRoleFromResourceOutput",
}) as any as S.Schema<DisassociateIamRoleFromResourceOutput>;
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export interface DisassociateVirtualMachinesFromExadbVmClusterInput {
  exadbVmClusterId: string;
  dbNodeIds: string[];
}
export const DisassociateVirtualMachinesFromExadbVmClusterInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ exadbVmClusterId: S.String, dbNodeIds: ResourceIdList }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateVirtualMachinesFromExadbVmClusterInput",
  }) as any as S.Schema<DisassociateVirtualMachinesFromExadbVmClusterInput>;
export interface DisassociateVirtualMachinesFromExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export const DisassociateVirtualMachinesFromExadbVmClusterOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      exadbVmClusterId: S.String,
    }),
  ).annotate({
    identifier: "DisassociateVirtualMachinesFromExadbVmClusterOutput",
  }) as any as S.Schema<DisassociateVirtualMachinesFromExadbVmClusterOutput>;
export type ResourceArn = string;
export interface FailoverAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  peerDbArn?: string;
}
export const FailoverAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    peerDbArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "FailoverAutonomousDatabaseInput",
}) as any as S.Schema<FailoverAutonomousDatabaseInput>;
export interface FailoverAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const FailoverAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "FailoverAutonomousDatabaseOutput",
}) as any as S.Schema<FailoverAutonomousDatabaseOutput>;
export interface GetAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export const GetAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAutonomousDatabaseInput",
}) as any as S.Schema<GetAutonomousDatabaseInput>;
export type DatabaseType = "REGULAR" | "CLONE" | (string & {});
export const DatabaseType = S.String;

export type PermissionLevel = "RESTRICTED" | "UNRESTRICTED" | (string & {});
export const PermissionLevel = S.String;

export type NetServicesArchitecture = "DEDICATED" | "SHARED" | (string & {});
export const NetServicesArchitecture = S.String;

export type DatabaseConnectionStringMap = { [key: string]: string | undefined };
export const DatabaseConnectionStringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DatabaseConnectionStringProfile {
  consumerGroup?: string;
  displayName?: string;
  hostFormat?: string;
  isRegional?: boolean;
  protocol?: string;
  sessionMode?: string;
  syntaxFormat?: string;
  tlsAuthentication?: string;
  value?: string;
}
export const DatabaseConnectionStringProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    consumerGroup: S.optional(S.String),
    displayName: S.optional(S.String),
    hostFormat: S.optional(S.String),
    isRegional: S.optional(S.Boolean),
    protocol: S.optional(S.String),
    sessionMode: S.optional(S.String),
    syntaxFormat: S.optional(S.String),
    tlsAuthentication: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "DatabaseConnectionStringProfile",
}) as any as S.Schema<DatabaseConnectionStringProfile>;
export type DatabaseConnectionStringProfileList =
  DatabaseConnectionStringProfile[];
export const DatabaseConnectionStringProfileList = /*@__PURE__*/ S.Array(
  DatabaseConnectionStringProfile,
);
export interface AutonomousDatabaseConnectionStrings {
  allConnectionStrings?: { [key: string]: string | undefined };
  dedicated?: string;
  high?: string;
  medium?: string;
  low?: string;
  profiles?: DatabaseConnectionStringProfile[];
}
export const AutonomousDatabaseConnectionStrings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allConnectionStrings: S.optional(DatabaseConnectionStringMap),
    dedicated: S.optional(S.String),
    high: S.optional(S.String),
    medium: S.optional(S.String),
    low: S.optional(S.String),
    profiles: S.optional(DatabaseConnectionStringProfileList),
  }),
).annotate({
  identifier: "AutonomousDatabaseConnectionStrings",
}) as any as S.Schema<AutonomousDatabaseConnectionStrings>;
export interface AutonomousDatabaseApex {
  apexVersion?: string;
  ordsVersion?: string;
}
export const AutonomousDatabaseApex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apexVersion: S.optional(S.String),
    ordsVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "AutonomousDatabaseApex",
}) as any as S.Schema<AutonomousDatabaseApex>;
export interface DatabaseStandbySummary {
  availabilityDomain?: string;
  lagTimeInSeconds?: number;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  maintenanceTargetComponent?: string;
  timeDataGuardRoleChanged?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
}
export const DatabaseStandbySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availabilityDomain: S.optional(S.String),
    lagTimeInSeconds: S.optional(S.Number),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
    maintenanceTargetComponent: S.optional(S.String),
    timeDataGuardRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDisasterRecoveryRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceBegin: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DatabaseStandbySummary",
}) as any as S.Schema<DatabaseStandbySummary>;
export type DataSafeStatus =
  | "REGISTERING"
  | "REGISTERED"
  | "DEREGISTERING"
  | "NOT_REGISTERED"
  | "FAILED"
  | (string & {});
export const DataSafeStatus = S.String;

export type DatabaseManagementStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "NOT_ENABLED"
  | "FAILED_ENABLING"
  | "FAILED_DISABLING"
  | (string & {});
export const DatabaseManagementStatus = S.String;

export type OperationsInsightsStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "NOT_ENABLED"
  | "FAILED_ENABLING"
  | "FAILED_DISABLING"
  | (string & {});
export const OperationsInsightsStatus = S.String;

export interface AutonomousDatabaseConnectionUrls {
  apexUrl?: string;
  databaseTransformsUrl?: string;
  graphStudioUrl?: string;
  machineLearningNotebookUrl?: string;
  machineLearningUserManagementUrl?: string;
  mongoDbUrl?: string;
  ordsUrl?: string;
  spatialStudioUrl?: string;
  sqlDevWebUrl?: string;
}
export const AutonomousDatabaseConnectionUrls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    apexUrl: S.optional(S.String),
    databaseTransformsUrl: S.optional(S.String),
    graphStudioUrl: S.optional(S.String),
    machineLearningNotebookUrl: S.optional(S.String),
    machineLearningUserManagementUrl: S.optional(S.String),
    mongoDbUrl: S.optional(S.String),
    ordsUrl: S.optional(S.String),
    spatialStudioUrl: S.optional(S.String),
    sqlDevWebUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "AutonomousDatabaseConnectionUrls",
}) as any as S.Schema<AutonomousDatabaseConnectionUrls>;
export type ComputeModel = "ECPU" | "OCPU" | (string & {});
export const ComputeModel = S.String;

export type DataGuardRole =
  | "PRIMARY"
  | "STANDBY"
  | "DISABLED_STANDBY"
  | "BACKUP_COPY"
  | "SNAPSHOT_STANDBY"
  | (string & {});
export const DataGuardRole = S.String;

export interface DisasterRecoveryConfiguration {
  disasterRecoveryType?: DisasterRecoveryType;
  isReplicateAutomaticBackups?: boolean;
  isSnapshotStandby?: boolean;
  timeSnapshotStandbyEnabledTill?: Date;
}
export const DisasterRecoveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    disasterRecoveryType: S.optional(DisasterRecoveryType),
    isReplicateAutomaticBackups: S.optional(S.Boolean),
    isSnapshotStandby: S.optional(S.Boolean),
    timeSnapshotStandbyEnabledTill: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DisasterRecoveryConfiguration",
}) as any as S.Schema<DisasterRecoveryConfiguration>;
export type RefreshableStatus = "REFRESHING" | "NOT_REFRESHING" | (string & {});
export const RefreshableStatus = S.String;

export type RepeatCadence =
  | "ONE_TIME"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | (string & {});
export const RepeatCadence = S.String;

export interface LongTermBackupSchedule {
  isDisabled?: boolean;
  repeatCadence?: RepeatCadence;
  retentionPeriodInDays?: number;
  timeOfBackup?: Date;
}
export const LongTermBackupSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isDisabled: S.optional(S.Boolean),
    repeatCadence: S.optional(RepeatCadence),
    retentionPeriodInDays: S.optional(S.Number),
    timeOfBackup: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "LongTermBackupSchedule",
}) as any as S.Schema<LongTermBackupSchedule>;
export type EncryptionKeyProvider =
  | "ORACLE_MANAGED"
  | "AWS_KMS"
  | "OKV"
  | "OCI"
  | (string & {});
export const EncryptionKeyProvider = S.String;

export interface AwsEncryptionKeyConfiguration {
  iamRoleArn?: string;
  externalIdType?: ExternalIdType;
  kmsKeyId?: string;
}
export const AwsEncryptionKeyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iamRoleArn: S.optional(S.String),
    externalIdType: S.optional(ExternalIdType),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEncryptionKeyConfiguration",
}) as any as S.Schema<AwsEncryptionKeyConfiguration>;
export interface OciEncryptionKeyConfiguration {
  kmsKeyId: string;
  vaultId: string;
}
export const OciEncryptionKeyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.String, vaultId: S.String }),
).annotate({
  identifier: "OciEncryptionKeyConfiguration",
}) as any as S.Schema<OciEncryptionKeyConfiguration>;
export interface OkvEncryptionKeyConfiguration {
  certificateDirectoryName: string;
  certificateId?: string;
  directoryName: string;
  okvKmsKey: string;
  okvUri: string;
}
export const OkvEncryptionKeyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateDirectoryName: S.String,
    certificateId: S.optional(S.String),
    directoryName: S.String,
    okvKmsKey: S.String,
    okvUri: S.String,
  }),
).annotate({
  identifier: "OkvEncryptionKeyConfiguration",
}) as any as S.Schema<OkvEncryptionKeyConfiguration>;
export type EncryptionKeyConfiguration =
  | {
      awsEncryptionKey: AwsEncryptionKeyConfiguration;
      ociEncryptionKey?: never;
      okvEncryptionKey?: never;
    }
  | {
      awsEncryptionKey?: never;
      ociEncryptionKey: OciEncryptionKeyConfiguration;
      okvEncryptionKey?: never;
    }
  | {
      awsEncryptionKey?: never;
      ociEncryptionKey?: never;
      okvEncryptionKey: OkvEncryptionKeyConfiguration;
    };
export const EncryptionKeyConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ awsEncryptionKey: AwsEncryptionKeyConfiguration }),
  S.Struct({ ociEncryptionKey: OciEncryptionKeyConfiguration }),
  S.Struct({ okvEncryptionKey: OkvEncryptionKeyConfiguration }),
]);
export interface EncryptionSummary {
  encryptionKeyProvider?: EncryptionKeyProvider;
  encryptionKeyConfiguration?: EncryptionKeyConfiguration;
}
export const EncryptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionKeyProvider: S.optional(EncryptionKeyProvider),
    encryptionKeyConfiguration: S.optional(EncryptionKeyConfiguration),
  }),
).annotate({
  identifier: "EncryptionSummary",
}) as any as S.Schema<EncryptionSummary>;
export interface CustomerManagedAwsSecretConfiguration {
  iamRoleArn?: string;
  secretId?: string;
  externalIdType?: ExternalIdType;
}
export const CustomerManagedAwsSecretConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      iamRoleArn: S.optional(S.String),
      secretId: S.optional(S.String),
      externalIdType: S.optional(ExternalIdType),
    }),
).annotate({
  identifier: "CustomerManagedAwsSecretConfiguration",
}) as any as S.Schema<CustomerManagedAwsSecretConfiguration>;
export type AdminPasswordSourceConfiguration = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration;
};
export const AdminPasswordSourceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration }),
]);
export interface AdminPasswordSourceSummary {
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfiguration;
}
export const AdminPasswordSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    adminPasswordSource: S.optional(AdminPasswordSource),
    adminPasswordSourceConfiguration: S.optional(
      AdminPasswordSourceConfiguration,
    ),
  }),
).annotate({
  identifier: "AdminPasswordSourceSummary",
}) as any as S.Schema<AdminPasswordSourceSummary>;
export interface AutonomousDatabase {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  ocid?: string;
  ociUrl?: string;
  displayName?: string;
  dbName?: string;
  sourceId?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  databaseType?: DatabaseType;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  characterSet?: string;
  ncharacterSet?: string;
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  isMtlsConnectionRequired?: boolean;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  netServicesArchitecture?: NetServicesArchitecture;
  availableUpgradeVersions?: string[];
  byolComputeCountLimit?: number;
  connectionStringDetails?: AutonomousDatabaseConnectionStrings;
  serviceConsoleUrl?: string;
  sqlWebDeveloperUrl?: string;
  customerContacts?: CustomerContact[];
  apexDetails?: AutonomousDatabaseApex;
  standbyDb?: DatabaseStandbySummary;
  localStandbyDb?: DatabaseStandbySummary;
  dataSafeStatus?: DataSafeStatus;
  databaseManagementStatus?: DatabaseManagementStatus;
  operationsInsightsStatus?: OperationsInsightsStatus;
  availabilityZone?: string;
  availabilityZoneId?: string;
  maintenanceTargetComponent?: string;
  connectionUrls?: AutonomousDatabaseConnectionUrls;
  dbToolsDetails?: DatabaseTool[];
  scheduledOperations?: ScheduledOperationDetails[];
  resourcePoolLeaderId?: string;
  computeCount?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  provisionableCpus?: number[];
  isAutoScalingEnabled?: boolean;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  usedDataStorageSizeInTBs?: number;
  usedDataStorageSizeInGBs?: number;
  actualUsedDataStorageSizeInTBs?: number;
  allocatedStorageSizeInTBs?: number;
  inMemoryAreaInGBs?: number;
  isAutoScalingForStorageEnabled?: boolean;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  privateEndpoint?: string;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  allowlistedIps?: string[];
  standbyAllowlistedIps?: string[];
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  isLocalDataGuardEnabled?: boolean;
  isRemoteDataGuardEnabled?: boolean;
  localDisasterRecoveryType?: DisasterRecoveryType;
  role?: DataGuardRole;
  peerDbIds?: string[];
  failedDataRecoveryInSeconds?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  remoteDisasterRecoveryConfiguration?: DisasterRecoveryConfiguration;
  isRefreshableClone?: boolean;
  refreshableMode?: RefreshableMode;
  refreshableStatus?: RefreshableStatus;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  isReconnectCloneEnabled?: boolean;
  cloneTableSpaceList?: number[];
  backupRetentionPeriodInDays?: number;
  longTermBackupSchedule?: LongTermBackupSchedule;
  isBackupRetentionLocked?: boolean;
  totalBackupStorageSizeInGBs?: number;
  resourcePoolSummary?: ResourcePoolSummary;
  encryptionSummary?: EncryptionSummary;
  createdAt?: Date;
  timeOfLastBackup?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
  timeLocalDataGuardEnabled?: Date;
  timeDataGuardRoleChanged?: Date;
  timeOfLastSwitchover?: Date;
  timeOfLastFailover?: Date;
  timeOfLastRefresh?: Date;
  timeOfLastRefreshPoint?: Date;
  timeOfNextRefresh?: Date;
  timeOfAutoRefreshStart?: Date;
  timeDeletionOfFreeAutonomousDatabase?: Date;
  timeReclamationOfFreeAutonomousDatabase?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeUntilReconnectCloneEnabled?: Date;
  nextLongTermBackupTimeStamp?: Date;
  timeUndeleted?: Date;
  adminPasswordSourceSummary?: AdminPasswordSourceSummary;
}
export const AutonomousDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.optional(S.String),
    autonomousDatabaseArn: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociUrl: S.optional(S.String),
    displayName: S.optional(S.String),
    dbName: S.optional(S.String),
    sourceId: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
    databaseType: S.optional(DatabaseType),
    dbVersion: S.optional(S.String),
    dbWorkload: S.optional(DbWorkload),
    characterSet: S.optional(S.String),
    ncharacterSet: S.optional(S.String),
    databaseEdition: S.optional(DatabaseEdition),
    licenseModel: S.optional(LicenseModel),
    openMode: S.optional(OpenMode),
    permissionLevel: S.optional(PermissionLevel),
    isMtlsConnectionRequired: S.optional(S.Boolean),
    autonomousMaintenanceScheduleType: S.optional(
      AutonomousMaintenanceScheduleType,
    ),
    netServicesArchitecture: S.optional(NetServicesArchitecture),
    availableUpgradeVersions: S.optional(StringList),
    byolComputeCountLimit: S.optional(S.Number),
    connectionStringDetails: S.optional(AutonomousDatabaseConnectionStrings),
    serviceConsoleUrl: S.optional(S.String),
    sqlWebDeveloperUrl: S.optional(S.String),
    customerContacts: S.optional(CustomerContacts),
    apexDetails: S.optional(AutonomousDatabaseApex),
    standbyDb: S.optional(DatabaseStandbySummary),
    localStandbyDb: S.optional(DatabaseStandbySummary),
    dataSafeStatus: S.optional(DataSafeStatus),
    databaseManagementStatus: S.optional(DatabaseManagementStatus),
    operationsInsightsStatus: S.optional(OperationsInsightsStatus),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    maintenanceTargetComponent: S.optional(S.String),
    connectionUrls: S.optional(AutonomousDatabaseConnectionUrls),
    dbToolsDetails: S.optional(DatabaseToolList),
    scheduledOperations: S.optional(ScheduledOperationDetailsList),
    resourcePoolLeaderId: S.optional(S.String),
    computeCount: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    cpuCoreCount: S.optional(S.Number),
    memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
    provisionableCpus: S.optional(IntegerList),
    isAutoScalingEnabled: S.optional(S.Boolean),
    dataStorageSizeInTBs: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    usedDataStorageSizeInTBs: S.optional(S.Number),
    usedDataStorageSizeInGBs: S.optional(S.Number),
    actualUsedDataStorageSizeInTBs: S.optional(S.Number),
    allocatedStorageSizeInTBs: S.optional(S.Number),
    inMemoryAreaInGBs: S.optional(S.Number),
    isAutoScalingForStorageEnabled: S.optional(S.Boolean),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    privateEndpoint: S.optional(S.String),
    privateEndpointIp: S.optional(S.String),
    privateEndpointLabel: S.optional(S.String),
    allowlistedIps: S.optional(StringList),
    standbyAllowlistedIps: S.optional(StringList),
    standbyAllowlistedIpsSource: S.optional(StandbyAllowlistedIpsSource),
    isLocalDataGuardEnabled: S.optional(S.Boolean),
    isRemoteDataGuardEnabled: S.optional(S.Boolean),
    localDisasterRecoveryType: S.optional(DisasterRecoveryType),
    role: S.optional(DataGuardRole),
    peerDbIds: S.optional(StringList),
    failedDataRecoveryInSeconds: S.optional(S.Number),
    localAdgAutoFailoverMaxDataLossLimit: S.optional(S.Number),
    remoteDisasterRecoveryConfiguration: S.optional(
      DisasterRecoveryConfiguration,
    ),
    isRefreshableClone: S.optional(S.Boolean),
    refreshableMode: S.optional(RefreshableMode),
    refreshableStatus: S.optional(RefreshableStatus),
    autoRefreshFrequencyInSeconds: S.optional(S.Number),
    autoRefreshPointLagInSeconds: S.optional(S.Number),
    isReconnectCloneEnabled: S.optional(S.Boolean),
    cloneTableSpaceList: S.optional(IntegerList),
    backupRetentionPeriodInDays: S.optional(S.Number),
    longTermBackupSchedule: S.optional(LongTermBackupSchedule),
    isBackupRetentionLocked: S.optional(S.Boolean),
    totalBackupStorageSizeInGBs: S.optional(S.Number),
    resourcePoolSummary: S.optional(ResourcePoolSummary),
    encryptionSummary: S.optional(EncryptionSummary),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastBackup: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceBegin: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeLocalDataGuardEnabled: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDataGuardRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastSwitchover: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastFailover: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastRefresh: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastRefreshPoint: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfNextRefresh: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfAutoRefreshStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDeletionOfFreeAutonomousDatabase: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeReclamationOfFreeAutonomousDatabase: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDisasterRecoveryRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeUntilReconnectCloneEnabled: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextLongTermBackupTimeStamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeUndeleted: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    adminPasswordSourceSummary: S.optional(AdminPasswordSourceSummary),
  }),
).annotate({
  identifier: "AutonomousDatabase",
}) as any as S.Schema<AutonomousDatabase>;
export interface GetAutonomousDatabaseOutput {
  autonomousDatabase: AutonomousDatabase;
}
export const GetAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autonomousDatabase: AutonomousDatabase }),
).annotate({
  identifier: "GetAutonomousDatabaseOutput",
}) as any as S.Schema<GetAutonomousDatabaseOutput>;
export interface GetAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
}
export const GetAutonomousDatabaseBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.String.pipe(
      T.HttpLabel("autonomousDatabaseBackupId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAutonomousDatabaseBackupInput",
}) as any as S.Schema<GetAutonomousDatabaseBackupInput>;
export type AutonomousDatabaseBackupStatus =
  | "ACTIVE"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const AutonomousDatabaseBackupStatus = S.String;

export type AutonomousDatabaseBackupType =
  | "INCREMENTAL"
  | "FULL"
  | "LONGTERM"
  | "VIRTUAL_FULL"
  | "CUMULATIVE_INCREMENTAL"
  | "ROLL_FORWARD_IMAGE_COPY"
  | (string & {});
export const AutonomousDatabaseBackupType = S.String;

export interface AutonomousDatabaseBackup {
  autonomousDatabaseBackupId?: string;
  autonomousDatabaseBackupArn?: string;
  autonomousDatabaseId?: string;
  ocid?: string;
  displayName?: string;
  dbVersion?: string;
  status?: AutonomousDatabaseBackupStatus;
  statusReason?: string;
  isAutomatic?: boolean;
  retentionPeriodInDays?: number;
  sizeInTBs?: number;
  timeAvailableTill?: Date;
  timeStarted?: Date;
  timeEnded?: Date;
  type?: AutonomousDatabaseBackupType;
}
export const AutonomousDatabaseBackup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.optional(S.String),
    autonomousDatabaseBackupArn: S.optional(S.String),
    autonomousDatabaseId: S.optional(S.String),
    ocid: S.optional(S.String),
    displayName: S.optional(S.String),
    dbVersion: S.optional(S.String),
    status: S.optional(AutonomousDatabaseBackupStatus),
    statusReason: S.optional(S.String),
    isAutomatic: S.optional(S.Boolean),
    retentionPeriodInDays: S.optional(S.Number),
    sizeInTBs: S.optional(S.Number),
    timeAvailableTill: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeStarted: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeEnded: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    type: S.optional(AutonomousDatabaseBackupType),
  }),
).annotate({
  identifier: "AutonomousDatabaseBackup",
}) as any as S.Schema<AutonomousDatabaseBackup>;
export interface GetAutonomousDatabaseBackupOutput {
  autonomousDatabaseBackup?: AutonomousDatabaseBackup;
}
export const GetAutonomousDatabaseBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autonomousDatabaseBackup: S.optional(AutonomousDatabaseBackup) }),
).annotate({
  identifier: "GetAutonomousDatabaseBackupOutput",
}) as any as S.Schema<GetAutonomousDatabaseBackupOutput>;
export interface GetAutonomousDatabaseWalletDetailsInput {
  autonomousDatabaseId: string;
}
export const GetAutonomousDatabaseWalletDetailsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ autonomousDatabaseId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetAutonomousDatabaseWalletDetailsInput",
}) as any as S.Schema<GetAutonomousDatabaseWalletDetailsInput>;
export type AutonomousDatabaseWalletStatus =
  | "ACTIVE"
  | "UPDATING"
  | (string & {});
export const AutonomousDatabaseWalletStatus = S.String;

export type WalletPasswordSourceConfiguration = {
  customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration;
};
export const WalletPasswordSourceConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ customerManagedAwsSecret: CustomerManagedAwsSecretConfiguration }),
]);
export interface WalletPasswordSourceSummary {
  passwordSource?: WalletPasswordSource;
  passwordSourceConfiguration?: WalletPasswordSourceConfiguration;
}
export const WalletPasswordSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    passwordSource: S.optional(WalletPasswordSource),
    passwordSourceConfiguration: S.optional(WalletPasswordSourceConfiguration),
  }),
).annotate({
  identifier: "WalletPasswordSourceSummary",
}) as any as S.Schema<WalletPasswordSourceSummary>;
export interface AutonomousDatabaseWalletDetails {
  status?: AutonomousDatabaseWalletStatus;
  timeRotated?: Date;
  passwordSourceSummary?: WalletPasswordSourceSummary;
}
export const AutonomousDatabaseWalletDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(AutonomousDatabaseWalletStatus),
    timeRotated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    passwordSourceSummary: S.optional(WalletPasswordSourceSummary),
  }),
).annotate({
  identifier: "AutonomousDatabaseWalletDetails",
}) as any as S.Schema<AutonomousDatabaseWalletDetails>;
export interface GetAutonomousDatabaseWalletDetailsOutput {
  autonomousDatabaseWalletDetails: AutonomousDatabaseWalletDetails;
}
export const GetAutonomousDatabaseWalletDetailsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      autonomousDatabaseWalletDetails: AutonomousDatabaseWalletDetails,
    }),
).annotate({
  identifier: "GetAutonomousDatabaseWalletDetailsOutput",
}) as any as S.Schema<GetAutonomousDatabaseWalletDetailsOutput>;
export interface GetCloudAutonomousVmClusterInput {
  cloudAutonomousVmClusterId: string;
}
export const GetCloudAutonomousVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudAutonomousVmClusterId: S.String.pipe(
      T.HttpLabel("cloudAutonomousVmClusterId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCloudAutonomousVmClusterInput",
}) as any as S.Schema<GetCloudAutonomousVmClusterInput>;
export type IamRoleStatus =
  | "ASSOCIATING"
  | "DISASSOCIATING"
  | "FAILED"
  | "CONNECTED"
  | "DISCONNECTED"
  | "PARTIALLY_CONNECTED"
  | "UNKNOWN"
  | (string & {});
export const IamRoleStatus = S.String;

export interface IamRole {
  iamRoleArn?: string;
  status?: IamRoleStatus;
  statusReason?: string;
  awsIntegration?: SupportedAwsIntegration;
}
export const IamRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iamRoleArn: S.optional(S.String),
    status: S.optional(IamRoleStatus),
    statusReason: S.optional(S.String),
    awsIntegration: S.optional(SupportedAwsIntegration),
  }),
).annotate({ identifier: "IamRole" }) as any as S.Schema<IamRole>;
export type IamRoleList = IamRole[];
export const IamRoleList = /*@__PURE__*/ S.Array(IamRole);
export interface CloudAutonomousVmCluster {
  cloudAutonomousVmClusterId: string;
  cloudAutonomousVmClusterArn?: string;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  autonomousDataStoragePercentage?: number;
  autonomousDataStorageSizeInTBs?: number;
  availableAutonomousDataStorageSizeInTBs?: number;
  availableContainerDatabases?: number;
  availableCpus?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  cpuCoreCountPerNode?: number;
  cpuPercentage?: number;
  dataStorageSizeInGBs?: number;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  description?: string;
  domain?: string;
  exadataStorageInTBsLowestScaledValue?: number;
  hostname?: string;
  ocid?: string;
  ociUrl?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  maxAcdsLowestScaledValue?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  nonProvisionableAutonomousContainerDatabases?: number;
  provisionableAutonomousContainerDatabases?: number;
  provisionedAutonomousContainerDatabases?: number;
  provisionedCpus?: number;
  reclaimableCpus?: number;
  reservedCpus?: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  shape?: string;
  createdAt?: Date;
  timeDatabaseSslCertificateExpires?: Date;
  timeOrdsCertificateExpires?: Date;
  timeZone?: string;
  totalContainerDatabases?: number;
  iamRoles?: IamRole[];
}
export const CloudAutonomousVmCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudAutonomousVmClusterId: S.String,
    cloudAutonomousVmClusterArn: S.optional(S.String),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudExadataInfrastructureId: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    autonomousDataStoragePercentage: S.optional(S.Number),
    autonomousDataStorageSizeInTBs: S.optional(S.Number),
    availableAutonomousDataStorageSizeInTBs: S.optional(S.Number),
    availableContainerDatabases: S.optional(S.Number),
    availableCpus: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    cpuCoreCount: S.optional(S.Number),
    cpuCoreCountPerNode: S.optional(S.Number),
    cpuPercentage: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServers: S.optional(StringList),
    description: S.optional(S.String),
    domain: S.optional(S.String),
    exadataStorageInTBsLowestScaledValue: S.optional(S.Number),
    hostname: S.optional(S.String),
    ocid: S.optional(S.String),
    ociUrl: S.optional(S.String),
    isMtlsEnabledVmCluster: S.optional(S.Boolean),
    licenseModel: S.optional(LicenseModel),
    maintenanceWindow: S.optional(MaintenanceWindow),
    maxAcdsLowestScaledValue: S.optional(S.Number),
    memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    nonProvisionableAutonomousContainerDatabases: S.optional(S.Number),
    provisionableAutonomousContainerDatabases: S.optional(S.Number),
    provisionedAutonomousContainerDatabases: S.optional(S.Number),
    provisionedCpus: S.optional(S.Number),
    reclaimableCpus: S.optional(S.Number),
    reservedCpus: S.optional(S.Number),
    scanListenerPortNonTls: S.optional(S.Number),
    scanListenerPortTls: S.optional(S.Number),
    shape: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDatabaseSslCertificateExpires: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOrdsCertificateExpires: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeZone: S.optional(S.String),
    totalContainerDatabases: S.optional(S.Number),
    iamRoles: S.optional(IamRoleList),
  }),
).annotate({
  identifier: "CloudAutonomousVmCluster",
}) as any as S.Schema<CloudAutonomousVmCluster>;
export interface GetCloudAutonomousVmClusterOutput {
  cloudAutonomousVmCluster?: CloudAutonomousVmCluster;
}
export const GetCloudAutonomousVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudAutonomousVmCluster: S.optional(CloudAutonomousVmCluster) }),
).annotate({
  identifier: "GetCloudAutonomousVmClusterOutput",
}) as any as S.Schema<GetCloudAutonomousVmClusterOutput>;
export interface GetCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
}
export const GetCloudExadataInfrastructureInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String.pipe(
      T.HttpLabel("cloudExadataInfrastructureId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCloudExadataInfrastructureInput",
}) as any as S.Schema<GetCloudExadataInfrastructureInput>;
export interface CloudExadataInfrastructure {
  cloudExadataInfrastructureId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureArn?: string;
  activatedStorageCount?: number;
  additionalStorageCount?: number;
  availableStorageSizeInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  computeCount?: number;
  cpuCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerVersion?: string;
  lastMaintenanceRunId?: string;
  maintenanceWindow?: MaintenanceWindow;
  maxCpuCount?: number;
  maxDataStorageInTBs?: number;
  maxDbNodeStorageSizeInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  monthlyDbServerVersion?: string;
  monthlyStorageServerVersion?: string;
  nextMaintenanceRunId?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  ocid?: string;
  shape?: string;
  storageCount?: number;
  storageServerVersion?: string;
  createdAt?: Date;
  totalStorageSizeInGBs?: number;
  percentProgress?: number;
  databaseServerType?: string;
  storageServerType?: string;
  computeModel?: ComputeModel;
}
export const CloudExadataInfrastructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    activatedStorageCount: S.optional(S.Number),
    additionalStorageCount: S.optional(S.Number),
    availableStorageSizeInGBs: S.optional(S.Number),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    computeCount: S.optional(S.Number),
    cpuCount: S.optional(S.Number),
    customerContactsToSendToOCI: S.optional(CustomerContacts),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerVersion: S.optional(S.String),
    lastMaintenanceRunId: S.optional(S.String),
    maintenanceWindow: S.optional(MaintenanceWindow),
    maxCpuCount: S.optional(S.Number),
    maxDataStorageInTBs: S.optional(S.Number),
    maxDbNodeStorageSizeInGBs: S.optional(S.Number),
    maxMemoryInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    monthlyDbServerVersion: S.optional(S.String),
    monthlyStorageServerVersion: S.optional(S.String),
    nextMaintenanceRunId: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    ocid: S.optional(S.String),
    shape: S.optional(S.String),
    storageCount: S.optional(S.Number),
    storageServerVersion: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    totalStorageSizeInGBs: S.optional(S.Number),
    percentProgress: S.optional(S.Number),
    databaseServerType: S.optional(S.String),
    storageServerType: S.optional(S.String),
    computeModel: S.optional(ComputeModel),
  }),
).annotate({
  identifier: "CloudExadataInfrastructure",
}) as any as S.Schema<CloudExadataInfrastructure>;
export interface GetCloudExadataInfrastructureOutput {
  cloudExadataInfrastructure?: CloudExadataInfrastructure;
}
export const GetCloudExadataInfrastructureOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructure: S.optional(CloudExadataInfrastructure),
  }),
).annotate({
  identifier: "GetCloudExadataInfrastructureOutput",
}) as any as S.Schema<GetCloudExadataInfrastructureOutput>;
export interface GetCloudExadataInfrastructureUnallocatedResourcesInput {
  cloudExadataInfrastructureId: string;
  dbServers?: string[];
}
export const GetCloudExadataInfrastructureUnallocatedResourcesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cloudExadataInfrastructureId: S.String.pipe(
        T.HttpLabel("cloudExadataInfrastructureId"),
      ),
      dbServers: S.optional(StringList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetCloudExadataInfrastructureUnallocatedResourcesInput",
  }) as any as S.Schema<GetCloudExadataInfrastructureUnallocatedResourcesInput>;
export interface CloudAutonomousVmClusterResourceDetails {
  cloudAutonomousVmClusterId?: string;
  unallocatedAdbStorageInTBs?: number;
}
export const CloudAutonomousVmClusterResourceDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      cloudAutonomousVmClusterId: S.optional(S.String),
      unallocatedAdbStorageInTBs: S.optional(S.Number),
    }),
).annotate({
  identifier: "CloudAutonomousVmClusterResourceDetails",
}) as any as S.Schema<CloudAutonomousVmClusterResourceDetails>;
export type CloudAutonomousVmClusterResourceDetailsList =
  CloudAutonomousVmClusterResourceDetails[];
export const CloudAutonomousVmClusterResourceDetailsList =
  /*@__PURE__*/ S.Array(CloudAutonomousVmClusterResourceDetails);
export interface CloudExadataInfrastructureUnallocatedResources {
  cloudAutonomousVmClusters?: CloudAutonomousVmClusterResourceDetails[];
  cloudExadataInfrastructureDisplayName?: string;
  exadataStorageInTBs?: number;
  cloudExadataInfrastructureId?: string;
  localStorageInGBs?: number;
  memoryInGBs?: number;
  ocpus?: number;
}
export const CloudExadataInfrastructureUnallocatedResources =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cloudAutonomousVmClusters: S.optional(
        CloudAutonomousVmClusterResourceDetailsList,
      ),
      cloudExadataInfrastructureDisplayName: S.optional(S.String),
      exadataStorageInTBs: S.optional(S.Number),
      cloudExadataInfrastructureId: S.optional(S.String),
      localStorageInGBs: S.optional(S.Number),
      memoryInGBs: S.optional(S.Number),
      ocpus: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "CloudExadataInfrastructureUnallocatedResources",
  }) as any as S.Schema<CloudExadataInfrastructureUnallocatedResources>;
export interface GetCloudExadataInfrastructureUnallocatedResourcesOutput {
  cloudExadataInfrastructureUnallocatedResources?: CloudExadataInfrastructureUnallocatedResources;
}
export const GetCloudExadataInfrastructureUnallocatedResourcesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      cloudExadataInfrastructureUnallocatedResources: S.optional(
        CloudExadataInfrastructureUnallocatedResources,
      ),
    }),
  ).annotate({
    identifier: "GetCloudExadataInfrastructureUnallocatedResourcesOutput",
  }) as any as S.Schema<GetCloudExadataInfrastructureUnallocatedResourcesOutput>;
export interface GetCloudVmClusterInput {
  cloudVmClusterId: string;
}
export const GetCloudVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.String.pipe(T.HttpLabel("cloudVmClusterId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCloudVmClusterInput",
}) as any as S.Schema<GetCloudVmClusterInput>;
export type DiskRedundancy = "HIGH" | "NORMAL" | (string & {});
export const DiskRedundancy = S.String;

export interface DbIormConfig {
  dbName?: string;
  flashCacheLimit?: string;
  share?: number;
}
export const DbIormConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbName: S.optional(S.String),
    flashCacheLimit: S.optional(S.String),
    share: S.optional(S.Number),
  }),
).annotate({ identifier: "DbIormConfig" }) as any as S.Schema<DbIormConfig>;
export type DbIormConfigList = DbIormConfig[];
export const DbIormConfigList = /*@__PURE__*/ S.Array(DbIormConfig);
export type IormLifecycleState =
  | "BOOTSTRAPPING"
  | "DISABLED"
  | "ENABLED"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export const IormLifecycleState = S.String;

export type Objective =
  | "AUTO"
  | "BALANCED"
  | "BASIC"
  | "HIGH_THROUGHPUT"
  | "LOW_LATENCY"
  | (string & {});
export const Objective = S.String;

export interface ExadataIormConfig {
  dbPlans?: DbIormConfig[];
  lifecycleDetails?: string;
  lifecycleState?: IormLifecycleState;
  objective?: Objective;
}
export const ExadataIormConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbPlans: S.optional(DbIormConfigList),
    lifecycleDetails: S.optional(S.String),
    lifecycleState: S.optional(IormLifecycleState),
    objective: S.optional(Objective),
  }),
).annotate({
  identifier: "ExadataIormConfig",
}) as any as S.Schema<ExadataIormConfig>;
export type SensitiveStringList = (string | redacted.Redacted<string>)[];
export const SensitiveStringList = /*@__PURE__*/ S.Array(SensitiveString);
export interface CloudVmCluster {
  cloudVmClusterId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterArn?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  clusterName?: string;
  cpuCoreCount?: number;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  diskRedundancy?: DiskRedundancy;
  giVersion?: string;
  hostname?: string;
  iormConfigCache?: ExadataIormConfig;
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  domain?: string;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  shape?: string;
  sshPublicKeys?: (string | redacted.Redacted<string>)[];
  storageSizeInGBs?: number;
  systemVersion?: string;
  createdAt?: Date;
  timeZone?: string;
  vipIds?: string[];
  odbNetworkId?: string;
  odbNetworkArn?: string;
  percentProgress?: number;
  computeModel?: ComputeModel;
  iamRoles?: IamRole[];
}
export const CloudVmCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudVmClusterArn: S.optional(S.String),
    cloudExadataInfrastructureId: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServers: S.optional(StringList),
    diskRedundancy: S.optional(DiskRedundancy),
    giVersion: S.optional(S.String),
    hostname: S.optional(S.String),
    iormConfigCache: S.optional(ExadataIormConfig),
    isLocalBackupEnabled: S.optional(S.Boolean),
    isSparseDiskgroupEnabled: S.optional(S.Boolean),
    lastUpdateHistoryEntryId: S.optional(S.String),
    licenseModel: S.optional(LicenseModel),
    listenerPort: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    domain: S.optional(S.String),
    scanDnsName: S.optional(S.String),
    scanDnsRecordId: S.optional(S.String),
    scanIpIds: S.optional(StringList),
    shape: S.optional(S.String),
    sshPublicKeys: S.optional(SensitiveStringList),
    storageSizeInGBs: S.optional(S.Number),
    systemVersion: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeZone: S.optional(S.String),
    vipIds: S.optional(StringList),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    iamRoles: S.optional(IamRoleList),
  }),
).annotate({ identifier: "CloudVmCluster" }) as any as S.Schema<CloudVmCluster>;
export interface GetCloudVmClusterOutput {
  cloudVmCluster?: CloudVmCluster;
}
export const GetCloudVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudVmCluster: S.optional(CloudVmCluster) }),
).annotate({
  identifier: "GetCloudVmClusterOutput",
}) as any as S.Schema<GetCloudVmClusterOutput>;
export interface GetDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export const GetDbNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.optional(S.String),
    exadbVmClusterId: S.optional(S.String),
    dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetDbNodeInput" }) as any as S.Schema<GetDbNodeInput>;
export type DbNodeResourceStatus =
  | "AVAILABLE"
  | "FAILED"
  | "PROVISIONING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | "STOPPING"
  | "STOPPED"
  | "STARTING"
  | (string & {});
export const DbNodeResourceStatus = S.String;

export type DbNodeMaintenanceType = "VMDB_REBOOT_MIGRATION" | (string & {});
export const DbNodeMaintenanceType = S.String;

export interface DbNode {
  dbNodeId?: string;
  dbNodeArn?: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
  additionalDetails?: string;
  backupIpId?: string;
  backupVnic2Id?: string;
  backupVnicId?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerId?: string;
  dbSystemId?: string;
  faultDomain?: string;
  hostIpId?: string;
  hostname?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maintenanceType?: DbNodeMaintenanceType;
  memorySizeInGBs?: number;
  softwareStorageSizeInGB?: number;
  createdAt?: Date;
  timeMaintenanceWindowEnd?: string;
  timeMaintenanceWindowStart?: string;
  totalCpuCoreCount?: number;
  vnic2Id?: string;
  vnicId?: string;
  privateIpAddress?: string;
  floatingIpAddress?: string;
}
export const DbNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbNodeId: S.optional(S.String),
    dbNodeArn: S.optional(S.String),
    status: S.optional(DbNodeResourceStatus),
    statusReason: S.optional(S.String),
    additionalDetails: S.optional(S.String),
    backupIpId: S.optional(S.String),
    backupVnic2Id: S.optional(S.String),
    backupVnicId: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerId: S.optional(S.String),
    dbSystemId: S.optional(S.String),
    faultDomain: S.optional(S.String),
    hostIpId: S.optional(S.String),
    hostname: S.optional(S.String),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    maintenanceType: S.optional(DbNodeMaintenanceType),
    memorySizeInGBs: S.optional(S.Number),
    softwareStorageSizeInGB: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceWindowEnd: S.optional(S.String),
    timeMaintenanceWindowStart: S.optional(S.String),
    totalCpuCoreCount: S.optional(S.Number),
    vnic2Id: S.optional(S.String),
    vnicId: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
    floatingIpAddress: S.optional(S.String),
  }),
).annotate({ identifier: "DbNode" }) as any as S.Schema<DbNode>;
export interface GetDbNodeOutput {
  dbNode?: DbNode;
}
export const GetDbNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbNode: S.optional(DbNode) }),
).annotate({
  identifier: "GetDbNodeOutput",
}) as any as S.Schema<GetDbNodeOutput>;
export interface GetDbServerInput {
  cloudExadataInfrastructureId: string;
  dbServerId: string;
}
export const GetDbServerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String.pipe(
      T.HttpLabel("cloudExadataInfrastructureId"),
    ),
    dbServerId: S.String.pipe(T.HttpLabel("dbServerId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDbServerInput",
}) as any as S.Schema<GetDbServerInput>;
export type DbServerPatchingStatus =
  | "COMPLETE"
  | "FAILED"
  | "MAINTENANCE_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export const DbServerPatchingStatus = S.String;

export interface DbServerPatchingDetails {
  estimatedPatchDuration?: number;
  patchingStatus?: DbServerPatchingStatus;
  timePatchingEnded?: string;
  timePatchingStarted?: string;
}
export const DbServerPatchingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    estimatedPatchDuration: S.optional(S.Number),
    patchingStatus: S.optional(DbServerPatchingStatus),
    timePatchingEnded: S.optional(S.String),
    timePatchingStarted: S.optional(S.String),
  }),
).annotate({
  identifier: "DbServerPatchingDetails",
}) as any as S.Schema<DbServerPatchingDetails>;
export interface DbServer {
  dbServerId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerPatchingDetails?: DbServerPatchingDetails;
  displayName?: string;
  exadataInfrastructureId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maxCpuCount?: number;
  maxDbNodeStorageInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  shape?: string;
  createdAt?: Date;
  vmClusterIds?: string[];
  computeModel?: ComputeModel;
  autonomousVmClusterIds?: string[];
  autonomousVirtualMachineIds?: string[];
}
export const DbServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbServerId: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerPatchingDetails: S.optional(DbServerPatchingDetails),
    displayName: S.optional(S.String),
    exadataInfrastructureId: S.optional(S.String),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    maxCpuCount: S.optional(S.Number),
    maxDbNodeStorageInGBs: S.optional(S.Number),
    maxMemoryInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    shape: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    vmClusterIds: S.optional(StringList),
    computeModel: S.optional(ComputeModel),
    autonomousVmClusterIds: S.optional(StringList),
    autonomousVirtualMachineIds: S.optional(StringList),
  }),
).annotate({ identifier: "DbServer" }) as any as S.Schema<DbServer>;
export interface GetDbServerOutput {
  dbServer?: DbServer;
}
export const GetDbServerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dbServer: S.optional(DbServer) }),
).annotate({
  identifier: "GetDbServerOutput",
}) as any as S.Schema<GetDbServerOutput>;
export interface GetExadbVmClusterInput {
  exadbVmClusterId: string;
}
export const GetExadbVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exadbVmClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExadbVmClusterInput",
}) as any as S.Schema<GetExadbVmClusterInput>;
export type GridImageType = "RELEASE_UPDATE" | "CUSTOM_IMAGE" | (string & {});
export const GridImageType = S.String;

export interface ExadbVmClusterStorageDetails {
  totalSizeInGBs?: number;
}
export const ExadbVmClusterStorageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ totalSizeInGBs: S.optional(S.Number) }),
).annotate({
  identifier: "ExadbVmClusterStorageDetails",
}) as any as S.Schema<ExadbVmClusterStorageDetails>;
export interface ExadbVmCluster {
  exadbVmClusterId: string;
  clusterName?: string;
  createdAt?: Date;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  domain?: string;
  enabledEcpuCount?: number;
  exadbVmClusterArn?: string;
  exascaleDbStorageVaultArn?: string;
  exascaleDbStorageVaultId?: string;
  giVersion?: string;
  gridImageId?: string;
  gridImageType?: GridImageType;
  hostname?: string;
  iamRoles?: IamRole[];
  iormConfigCache?: ExadataIormConfig;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  odbNetworkArn?: string;
  odbNetworkId?: string;
  percentProgress?: number;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shape?: string;
  shapeAttribute?: ShapeAttribute;
  snapshotFileSystemStorage?: ExadbVmClusterStorageDetails;
  sshPublicKeys?: string[];
  status?: ResourceStatus;
  statusReason?: string;
  systemVersion?: string;
  timeZone?: string;
  totalEcpuCount?: number;
  totalFileSystemStorage?: ExadbVmClusterStorageDetails;
  vipIds?: string[];
  vmFileSystemStorage?: ExadbVmClusterStorageDetails;
}
export const ExadbVmCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exadbVmClusterId: S.String,
    clusterName: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    displayName: S.optional(S.String),
    domain: S.optional(S.String),
    enabledEcpuCount: S.optional(S.Number),
    exadbVmClusterArn: S.optional(S.String),
    exascaleDbStorageVaultArn: S.optional(S.String),
    exascaleDbStorageVaultId: S.optional(S.String),
    giVersion: S.optional(S.String),
    gridImageId: S.optional(S.String),
    gridImageType: S.optional(GridImageType),
    hostname: S.optional(S.String),
    iamRoles: S.optional(IamRoleList),
    iormConfigCache: S.optional(ExadataIormConfig),
    lastUpdateHistoryEntryId: S.optional(S.String),
    licenseModel: S.optional(LicenseModel),
    listenerPort: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    odbNetworkId: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    scanDnsName: S.optional(S.String),
    scanDnsRecordId: S.optional(S.String),
    scanIpIds: S.optional(StringList),
    scanListenerPortTcp: S.optional(S.Number),
    scanListenerPortTcpSsl: S.optional(S.Number),
    shape: S.optional(S.String),
    shapeAttribute: S.optional(ShapeAttribute),
    snapshotFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
    sshPublicKeys: S.optional(StringList),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    systemVersion: S.optional(S.String),
    timeZone: S.optional(S.String),
    totalEcpuCount: S.optional(S.Number),
    totalFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
    vipIds: S.optional(StringList),
    vmFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
  }),
).annotate({ identifier: "ExadbVmCluster" }) as any as S.Schema<ExadbVmCluster>;
export interface GetExadbVmClusterOutput {
  exadbVmCluster: ExadbVmCluster;
}
export const GetExadbVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exadbVmCluster: ExadbVmCluster }),
).annotate({
  identifier: "GetExadbVmClusterOutput",
}) as any as S.Schema<GetExadbVmClusterOutput>;
export interface GetExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
}
export const GetExascaleDbStorageVaultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exascaleDbStorageVaultId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExascaleDbStorageVaultInput",
}) as any as S.Schema<GetExascaleDbStorageVaultInput>;
export type ShapeAttributeList = ShapeAttribute[];
export const ShapeAttributeList = /*@__PURE__*/ S.Array(ShapeAttribute);
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface ExascaleDbStorageDetails {
  availableSizeInGBs?: number;
  totalSizeInGBs?: number;
}
export const ExascaleDbStorageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availableSizeInGBs: S.optional(S.Number),
    totalSizeInGBs: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExascaleDbStorageDetails",
}) as any as S.Schema<ExascaleDbStorageDetails>;
export interface ExascaleDbStorageVault {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  attachedShapeAttributes?: ShapeAttribute[];
  autoscaleLimitInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  createdAt?: Date;
  description?: string;
  displayName?: string;
  vmClusterArns?: string[];
  vmClusterCount?: number;
  vmClusterIds?: string[];
  exascaleDbStorageVaultArn?: string;
  highCapacityDatabaseStorage?: ExascaleDbStorageDetails;
  isAutoscaleEnabled?: boolean;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  percentProgress?: number;
  status?: ResourceStatus;
  statusReason?: string;
  timeZone?: string;
}
export const ExascaleDbStorageVault = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exascaleDbStorageVaultId: S.String,
    additionalFlashCacheInPercent: S.optional(S.Number),
    attachedShapeAttributes: S.optional(ShapeAttributeList),
    autoscaleLimitInGBs: S.optional(S.Number),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    displayName: S.optional(S.String),
    vmClusterArns: S.optional(ResourceArnList),
    vmClusterCount: S.optional(S.Number),
    vmClusterIds: S.optional(ResourceIdList),
    exascaleDbStorageVaultArn: S.optional(S.String),
    highCapacityDatabaseStorage: S.optional(ExascaleDbStorageDetails),
    isAutoscaleEnabled: S.optional(S.Boolean),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    timeZone: S.optional(S.String),
  }),
).annotate({
  identifier: "ExascaleDbStorageVault",
}) as any as S.Schema<ExascaleDbStorageVault>;
export interface GetExascaleDbStorageVaultOutput {
  exascaleDbStorageVault: ExascaleDbStorageVault;
}
export const GetExascaleDbStorageVaultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exascaleDbStorageVault: ExascaleDbStorageVault }),
).annotate({
  identifier: "GetExascaleDbStorageVaultOutput",
}) as any as S.Schema<GetExascaleDbStorageVaultOutput>;
export interface GetOciOnboardingStatusInput {}
export const GetOciOnboardingStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetOciOnboardingStatusInput",
}) as any as S.Schema<GetOciOnboardingStatusInput>;
export type OciOnboardingStatus =
  | "NOT_STARTED"
  | "PENDING_LINK_GENERATION"
  | "PENDING_CUSTOMER_ACTION"
  | "PENDING_INITIALIZATION"
  | "ACTIVATING"
  | "ACTIVE_IN_HOME_REGION"
  | "ACTIVE"
  | "ACTIVE_LIMITED"
  | "FAILED"
  | "PUBLIC_OFFER_UNSUPPORTED"
  | "SUSPENDED"
  | "CANCELED"
  | (string & {});
export const OciOnboardingStatus = S.String;

export interface OciIdentityDomain {
  ociIdentityDomainId?: string;
  ociIdentityDomainResourceUrl?: string;
  ociIdentityDomainUrl?: string;
  status?: ResourceStatus;
  statusReason?: string;
  accountSetupCloudFormationUrl?: string;
}
export const OciIdentityDomain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ociIdentityDomainId: S.optional(S.String),
    ociIdentityDomainResourceUrl: S.optional(S.String),
    ociIdentityDomainUrl: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    accountSetupCloudFormationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "OciIdentityDomain",
}) as any as S.Schema<OciIdentityDomain>;
export type OciAwsIntegration = "KmsTde" | "SecretsManager" | (string & {});
export const OciAwsIntegration = S.String;

export type OciIamRoleStatus =
  | "PROVISIONING"
  | "AVAILABLE"
  | "PROVISION_FAILED"
  | "TERMINATING"
  | "TERMINATE_FAILED"
  | (string & {});
export const OciIamRoleStatus = S.String;

export interface OciIamRole {
  iamRoleArn?: string;
  awsIntegration?: OciAwsIntegration;
  status?: OciIamRoleStatus;
  statusReason?: string;
}
export const OciIamRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    iamRoleArn: S.optional(S.String),
    awsIntegration: S.optional(OciAwsIntegration),
    status: S.optional(OciIamRoleStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({ identifier: "OciIamRole" }) as any as S.Schema<OciIamRole>;
export type OciIamRoleList = OciIamRole[];
export const OciIamRoleList = /*@__PURE__*/ S.Array(OciIamRole);
export interface SubscriptionError {
  errorMessage?: string;
}
export const SubscriptionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorMessage: S.optional(S.String) }),
).annotate({
  identifier: "SubscriptionError",
}) as any as S.Schema<SubscriptionError>;
export type SubscriptionErrors = SubscriptionError[];
export const SubscriptionErrors = /*@__PURE__*/ S.Array(SubscriptionError);
export interface GetOciOnboardingStatusOutput {
  status?: OciOnboardingStatus;
  existingTenancyActivationLink?: string;
  newTenancyActivationLink?: string;
  ociIdentityDomain?: OciIdentityDomain;
  autonomousDatabaseOciIntegrationIamRoles?: OciIamRole[];
  linkedOciTenancyId?: string;
  linkedOciCompartmentId?: string;
  subscriptionErrors?: SubscriptionError[];
}
export const GetOciOnboardingStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(OciOnboardingStatus),
    existingTenancyActivationLink: S.optional(S.String),
    newTenancyActivationLink: S.optional(S.String),
    ociIdentityDomain: S.optional(OciIdentityDomain),
    autonomousDatabaseOciIntegrationIamRoles: S.optional(OciIamRoleList),
    linkedOciTenancyId: S.optional(S.String),
    linkedOciCompartmentId: S.optional(S.String),
    subscriptionErrors: S.optional(SubscriptionErrors),
  }),
).annotate({
  identifier: "GetOciOnboardingStatusOutput",
}) as any as S.Schema<GetOciOnboardingStatusOutput>;
export interface GetOdbNetworkInput {
  odbNetworkId: string;
}
export const GetOdbNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetOdbNetworkInput",
}) as any as S.Schema<GetOdbNetworkInput>;
export interface OciDnsForwardingConfig {
  domainName?: string;
  ociDnsListenerIp?: string;
}
export const OciDnsForwardingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    ociDnsListenerIp: S.optional(S.String),
  }),
).annotate({
  identifier: "OciDnsForwardingConfig",
}) as any as S.Schema<OciDnsForwardingConfig>;
export type OciDnsForwardingConfigList = OciDnsForwardingConfig[];
export const OciDnsForwardingConfigList = /*@__PURE__*/ S.Array(
  OciDnsForwardingConfig,
);
export type VpcEndpointType = "SERVICENETWORK" | (string & {});
export const VpcEndpointType = S.String;

export interface ServiceNetworkEndpoint {
  vpcEndpointId?: string;
  vpcEndpointType?: VpcEndpointType;
}
export const ServiceNetworkEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcEndpointId: S.optional(S.String),
    vpcEndpointType: S.optional(VpcEndpointType),
  }),
).annotate({
  identifier: "ServiceNetworkEndpoint",
}) as any as S.Schema<ServiceNetworkEndpoint>;
export type ManagedResourceStatus =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
export const ManagedResourceStatus = S.String;

export interface ManagedS3BackupAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
}
export const ManagedS3BackupAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedResourceStatus),
    ipv4Addresses: S.optional(StringList),
  }),
).annotate({
  identifier: "ManagedS3BackupAccess",
}) as any as S.Schema<ManagedS3BackupAccess>;
export interface ZeroEtlAccess {
  status?: ManagedResourceStatus;
  cidr?: string;
}
export const ZeroEtlAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedResourceStatus),
    cidr: S.optional(S.String),
  }),
).annotate({ identifier: "ZeroEtlAccess" }) as any as S.Schema<ZeroEtlAccess>;
export interface S3Access {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  s3PolicyDocument?: string;
}
export const S3Access = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedResourceStatus),
    ipv4Addresses: S.optional(StringList),
    domainName: S.optional(S.String),
    s3PolicyDocument: S.optional(S.String),
  }),
).annotate({ identifier: "S3Access" }) as any as S.Schema<S3Access>;
export interface StsAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  stsPolicyDocument?: string;
}
export const StsAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedResourceStatus),
    ipv4Addresses: S.optional(StringList),
    domainName: S.optional(S.String),
    stsPolicyDocument: S.optional(S.String),
  }),
).annotate({ identifier: "StsAccess" }) as any as S.Schema<StsAccess>;
export interface KmsAccess {
  status?: ManagedResourceStatus;
  ipv4Addresses?: string[];
  domainName?: string;
  kmsPolicyDocument?: string;
}
export const KmsAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(ManagedResourceStatus),
    ipv4Addresses: S.optional(StringList),
    domainName: S.optional(S.String),
    kmsPolicyDocument: S.optional(S.String),
  }),
).annotate({ identifier: "KmsAccess" }) as any as S.Schema<KmsAccess>;
export interface CrossRegionS3RestoreSourcesAccess {
  region?: string;
  ipv4Addresses?: string[];
  status?: ManagedResourceStatus;
}
export const CrossRegionS3RestoreSourcesAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(S.String),
    ipv4Addresses: S.optional(StringList),
    status: S.optional(ManagedResourceStatus),
  }),
).annotate({
  identifier: "CrossRegionS3RestoreSourcesAccess",
}) as any as S.Schema<CrossRegionS3RestoreSourcesAccess>;
export type CrossRegionS3RestoreSourcesAccessList =
  CrossRegionS3RestoreSourcesAccess[];
export const CrossRegionS3RestoreSourcesAccessList = /*@__PURE__*/ S.Array(
  CrossRegionS3RestoreSourcesAccess,
);
export interface ManagedServices {
  serviceNetworkArn?: string;
  resourceGatewayArn?: string;
  managedServicesIpv4Cidrs?: string[];
  serviceNetworkEndpoint?: ServiceNetworkEndpoint;
  managedS3BackupAccess?: ManagedS3BackupAccess;
  zeroEtlAccess?: ZeroEtlAccess;
  s3Access?: S3Access;
  stsAccess?: StsAccess;
  kmsAccess?: KmsAccess;
  crossRegionS3RestoreSourcesAccess?: CrossRegionS3RestoreSourcesAccess[];
}
export const ManagedServices = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceNetworkArn: S.optional(S.String),
    resourceGatewayArn: S.optional(S.String),
    managedServicesIpv4Cidrs: S.optional(StringList),
    serviceNetworkEndpoint: S.optional(ServiceNetworkEndpoint),
    managedS3BackupAccess: S.optional(ManagedS3BackupAccess),
    zeroEtlAccess: S.optional(ZeroEtlAccess),
    s3Access: S.optional(S3Access),
    stsAccess: S.optional(StsAccess),
    kmsAccess: S.optional(KmsAccess),
    crossRegionS3RestoreSourcesAccess: S.optional(
      CrossRegionS3RestoreSourcesAccessList,
    ),
  }),
).annotate({
  identifier: "ManagedServices",
}) as any as S.Schema<ManagedServices>;
export interface OdbNetwork {
  odbNetworkId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkArn?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr?: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  peeredCidrs?: string[];
  ociNetworkAnchorId?: string;
  ociNetworkAnchorUrl?: string;
  ociResourceAnchorName?: string;
  ociVcnId?: string;
  ociVcnUrl?: string;
  ociDnsForwardingConfigs?: OciDnsForwardingConfig[];
  createdAt?: Date;
  percentProgress?: number;
  managedServices?: ManagedServices;
  ec2PlacementGroupIds?: string[];
}
export const OdbNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    clientSubnetCidr: S.optional(S.String),
    backupSubnetCidr: S.optional(S.String),
    customDomainName: S.optional(S.String),
    defaultDnsPrefix: S.optional(S.String),
    peeredCidrs: S.optional(StringList),
    ociNetworkAnchorId: S.optional(S.String),
    ociNetworkAnchorUrl: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociVcnId: S.optional(S.String),
    ociVcnUrl: S.optional(S.String),
    ociDnsForwardingConfigs: S.optional(OciDnsForwardingConfigList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    percentProgress: S.optional(S.Number),
    managedServices: S.optional(ManagedServices),
    ec2PlacementGroupIds: S.optional(ResourceIdList),
  }),
).annotate({ identifier: "OdbNetwork" }) as any as S.Schema<OdbNetwork>;
export interface GetOdbNetworkOutput {
  odbNetwork?: OdbNetwork;
}
export const GetOdbNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ odbNetwork: S.optional(OdbNetwork) }),
).annotate({
  identifier: "GetOdbNetworkOutput",
}) as any as S.Schema<GetOdbNetworkOutput>;
export interface GetOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
}
export const GetOdbPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbPeeringConnectionId: S.String.pipe(
      T.HttpLabel("odbPeeringConnectionId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetOdbPeeringConnectionInput",
}) as any as S.Schema<GetOdbPeeringConnectionInput>;
export interface OdbPeeringConnection {
  odbPeeringConnectionId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionArn?: string;
  odbNetworkArn?: string;
  peerNetworkArn?: string;
  odbPeeringConnectionType?: string;
  peerNetworkCidrs?: string[];
  createdAt?: Date;
  percentProgress?: number;
}
export const OdbPeeringConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbPeeringConnectionId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbPeeringConnectionArn: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    peerNetworkArn: S.optional(S.String),
    odbPeeringConnectionType: S.optional(S.String),
    peerNetworkCidrs: S.optional(PeeredCidrList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    percentProgress: S.optional(S.Number),
  }),
).annotate({
  identifier: "OdbPeeringConnection",
}) as any as S.Schema<OdbPeeringConnection>;
export interface GetOdbPeeringConnectionOutput {
  odbPeeringConnection?: OdbPeeringConnection;
}
export const GetOdbPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ odbPeeringConnection: S.optional(OdbPeeringConnection) }),
).annotate({
  identifier: "GetOdbPeeringConnectionOutput",
}) as any as S.Schema<GetOdbPeeringConnectionOutput>;
export interface InitializeServiceInput {
  ociIdentityDomain?: boolean;
  autonomousDatabaseOciAwsSecretsManagerIntegration?: Access;
}
export const InitializeServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ociIdentityDomain: S.optional(S.Boolean),
    autonomousDatabaseOciAwsSecretsManagerIntegration: S.optional(Access),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InitializeServiceInput",
}) as any as S.Schema<InitializeServiceInput>;
export interface InitializeServiceOutput {}
export const InitializeServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "InitializeServiceOutput",
}) as any as S.Schema<InitializeServiceOutput>;
export interface ListAutonomousDatabaseBackupsInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
  status?: AutonomousDatabaseBackupStatus;
  type?: AutonomousDatabaseBackupType;
}
export const ListAutonomousDatabaseBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
    status: S.optional(AutonomousDatabaseBackupStatus),
    type: S.optional(AutonomousDatabaseBackupType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousDatabaseBackupsInput",
}) as any as S.Schema<ListAutonomousDatabaseBackupsInput>;
export interface AutonomousDatabaseBackupSummary {
  autonomousDatabaseBackupId?: string;
  autonomousDatabaseBackupArn?: string;
  autonomousDatabaseId?: string;
  ocid?: string;
  displayName?: string;
  dbVersion?: string;
  status?: AutonomousDatabaseBackupStatus;
  statusReason?: string;
  isAutomatic?: boolean;
  retentionPeriodInDays?: number;
  sizeInTBs?: number;
  timeAvailableTill?: Date;
  timeStarted?: Date;
  timeEnded?: Date;
  type?: AutonomousDatabaseBackupType;
}
export const AutonomousDatabaseBackupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.optional(S.String),
    autonomousDatabaseBackupArn: S.optional(S.String),
    autonomousDatabaseId: S.optional(S.String),
    ocid: S.optional(S.String),
    displayName: S.optional(S.String),
    dbVersion: S.optional(S.String),
    status: S.optional(AutonomousDatabaseBackupStatus),
    statusReason: S.optional(S.String),
    isAutomatic: S.optional(S.Boolean),
    retentionPeriodInDays: S.optional(S.Number),
    sizeInTBs: S.optional(S.Number),
    timeAvailableTill: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeStarted: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeEnded: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    type: S.optional(AutonomousDatabaseBackupType),
  }),
).annotate({
  identifier: "AutonomousDatabaseBackupSummary",
}) as any as S.Schema<AutonomousDatabaseBackupSummary>;
export type AutonomousDatabaseBackupList = AutonomousDatabaseBackupSummary[];
export const AutonomousDatabaseBackupList = /*@__PURE__*/ S.Array(
  AutonomousDatabaseBackupSummary,
);
export interface ListAutonomousDatabaseBackupsOutput {
  nextToken?: string;
  autonomousDatabaseBackups: AutonomousDatabaseBackupSummary[];
}
export const ListAutonomousDatabaseBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    autonomousDatabaseBackups: AutonomousDatabaseBackupList,
  }),
).annotate({
  identifier: "ListAutonomousDatabaseBackupsOutput",
}) as any as S.Schema<ListAutonomousDatabaseBackupsOutput>;
export type CharacterSetType = "DATABASE" | "NATIONAL" | (string & {});
export const CharacterSetType = S.String;

export interface ListAutonomousDatabaseCharacterSetsInput {
  maxResults?: number;
  nextToken?: string;
  characterSetType?: CharacterSetType;
}
export const ListAutonomousDatabaseCharacterSetsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      characterSetType: S.optional(CharacterSetType),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListAutonomousDatabaseCharacterSetsInput",
}) as any as S.Schema<ListAutonomousDatabaseCharacterSetsInput>;
export interface AutonomousDatabaseCharacterSetSummary {
  characterSet?: string;
}
export const AutonomousDatabaseCharacterSetSummary = /*@__PURE__*/ S.suspend(
  () => S.Struct({ characterSet: S.optional(S.String) }),
).annotate({
  identifier: "AutonomousDatabaseCharacterSetSummary",
}) as any as S.Schema<AutonomousDatabaseCharacterSetSummary>;
export type AutonomousDatabaseCharacterSetList =
  AutonomousDatabaseCharacterSetSummary[];
export const AutonomousDatabaseCharacterSetList = /*@__PURE__*/ S.Array(
  AutonomousDatabaseCharacterSetSummary,
);
export interface ListAutonomousDatabaseCharacterSetsOutput {
  nextToken?: string;
  autonomousDatabaseCharacterSets: AutonomousDatabaseCharacterSetSummary[];
}
export const ListAutonomousDatabaseCharacterSetsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      autonomousDatabaseCharacterSets: AutonomousDatabaseCharacterSetList,
    }),
  ).annotate({
    identifier: "ListAutonomousDatabaseCharacterSetsOutput",
  }) as any as S.Schema<ListAutonomousDatabaseCharacterSetsOutput>;
export interface ListAutonomousDatabaseClonesInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
}
export const ListAutonomousDatabaseClonesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousDatabaseClonesInput",
}) as any as S.Schema<ListAutonomousDatabaseClonesInput>;
export interface AutonomousDatabaseSummary {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  ocid?: string;
  ociUrl?: string;
  displayName?: string;
  dbName?: string;
  sourceId?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
  databaseType?: DatabaseType;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  characterSet?: string;
  ncharacterSet?: string;
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  isMtlsConnectionRequired?: boolean;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  netServicesArchitecture?: NetServicesArchitecture;
  availableUpgradeVersions?: string[];
  byolComputeCountLimit?: number;
  connectionStringDetails?: AutonomousDatabaseConnectionStrings;
  serviceConsoleUrl?: string;
  sqlWebDeveloperUrl?: string;
  customerContacts?: CustomerContact[];
  apexDetails?: AutonomousDatabaseApex;
  standbyDb?: DatabaseStandbySummary;
  localStandbyDb?: DatabaseStandbySummary;
  dataSafeStatus?: DataSafeStatus;
  databaseManagementStatus?: DatabaseManagementStatus;
  operationsInsightsStatus?: OperationsInsightsStatus;
  availabilityZone?: string;
  availabilityZoneId?: string;
  maintenanceTargetComponent?: string;
  connectionUrls?: AutonomousDatabaseConnectionUrls;
  dbToolsDetails?: DatabaseTool[];
  scheduledOperations?: ScheduledOperationDetails[];
  resourcePoolLeaderId?: string;
  computeCount?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  provisionableCpus?: number[];
  isAutoScalingEnabled?: boolean;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  usedDataStorageSizeInTBs?: number;
  usedDataStorageSizeInGBs?: number;
  actualUsedDataStorageSizeInTBs?: number;
  allocatedStorageSizeInTBs?: number;
  inMemoryAreaInGBs?: number;
  isAutoScalingForStorageEnabled?: boolean;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  privateEndpoint?: string;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  allowlistedIps?: string[];
  standbyAllowlistedIps?: string[];
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  isLocalDataGuardEnabled?: boolean;
  isRemoteDataGuardEnabled?: boolean;
  localDisasterRecoveryType?: DisasterRecoveryType;
  role?: DataGuardRole;
  peerDbIds?: string[];
  failedDataRecoveryInSeconds?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  remoteDisasterRecoveryConfiguration?: DisasterRecoveryConfiguration;
  isRefreshableClone?: boolean;
  refreshableMode?: RefreshableMode;
  refreshableStatus?: RefreshableStatus;
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  isReconnectCloneEnabled?: boolean;
  cloneTableSpaceList?: number[];
  backupRetentionPeriodInDays?: number;
  longTermBackupSchedule?: LongTermBackupSchedule;
  isBackupRetentionLocked?: boolean;
  totalBackupStorageSizeInGBs?: number;
  resourcePoolSummary?: ResourcePoolSummary;
  encryptionSummary?: EncryptionSummary;
  createdAt?: Date;
  timeOfLastBackup?: Date;
  timeMaintenanceBegin?: Date;
  timeMaintenanceEnd?: Date;
  timeLocalDataGuardEnabled?: Date;
  timeDataGuardRoleChanged?: Date;
  timeOfLastSwitchover?: Date;
  timeOfLastFailover?: Date;
  timeOfLastRefresh?: Date;
  timeOfLastRefreshPoint?: Date;
  timeOfNextRefresh?: Date;
  timeOfAutoRefreshStart?: Date;
  timeDeletionOfFreeAutonomousDatabase?: Date;
  timeReclamationOfFreeAutonomousDatabase?: Date;
  timeDisasterRecoveryRoleChanged?: Date;
  timeUntilReconnectCloneEnabled?: Date;
  nextLongTermBackupTimeStamp?: Date;
  timeUndeleted?: Date;
  adminPasswordSourceSummary?: AdminPasswordSourceSummary;
}
export const AutonomousDatabaseSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.optional(S.String),
    autonomousDatabaseArn: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociUrl: S.optional(S.String),
    displayName: S.optional(S.String),
    dbName: S.optional(S.String),
    sourceId: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
    databaseType: S.optional(DatabaseType),
    dbVersion: S.optional(S.String),
    dbWorkload: S.optional(DbWorkload),
    characterSet: S.optional(S.String),
    ncharacterSet: S.optional(S.String),
    databaseEdition: S.optional(DatabaseEdition),
    licenseModel: S.optional(LicenseModel),
    openMode: S.optional(OpenMode),
    permissionLevel: S.optional(PermissionLevel),
    isMtlsConnectionRequired: S.optional(S.Boolean),
    autonomousMaintenanceScheduleType: S.optional(
      AutonomousMaintenanceScheduleType,
    ),
    netServicesArchitecture: S.optional(NetServicesArchitecture),
    availableUpgradeVersions: S.optional(StringList),
    byolComputeCountLimit: S.optional(S.Number),
    connectionStringDetails: S.optional(AutonomousDatabaseConnectionStrings),
    serviceConsoleUrl: S.optional(S.String),
    sqlWebDeveloperUrl: S.optional(S.String),
    customerContacts: S.optional(CustomerContacts),
    apexDetails: S.optional(AutonomousDatabaseApex),
    standbyDb: S.optional(DatabaseStandbySummary),
    localStandbyDb: S.optional(DatabaseStandbySummary),
    dataSafeStatus: S.optional(DataSafeStatus),
    databaseManagementStatus: S.optional(DatabaseManagementStatus),
    operationsInsightsStatus: S.optional(OperationsInsightsStatus),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    maintenanceTargetComponent: S.optional(S.String),
    connectionUrls: S.optional(AutonomousDatabaseConnectionUrls),
    dbToolsDetails: S.optional(DatabaseToolList),
    scheduledOperations: S.optional(ScheduledOperationDetailsList),
    resourcePoolLeaderId: S.optional(S.String),
    computeCount: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    cpuCoreCount: S.optional(S.Number),
    memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
    provisionableCpus: S.optional(IntegerList),
    isAutoScalingEnabled: S.optional(S.Boolean),
    dataStorageSizeInTBs: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    usedDataStorageSizeInTBs: S.optional(S.Number),
    usedDataStorageSizeInGBs: S.optional(S.Number),
    actualUsedDataStorageSizeInTBs: S.optional(S.Number),
    allocatedStorageSizeInTBs: S.optional(S.Number),
    inMemoryAreaInGBs: S.optional(S.Number),
    isAutoScalingForStorageEnabled: S.optional(S.Boolean),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    privateEndpoint: S.optional(S.String),
    privateEndpointIp: S.optional(S.String),
    privateEndpointLabel: S.optional(S.String),
    allowlistedIps: S.optional(StringList),
    standbyAllowlistedIps: S.optional(StringList),
    standbyAllowlistedIpsSource: S.optional(StandbyAllowlistedIpsSource),
    isLocalDataGuardEnabled: S.optional(S.Boolean),
    isRemoteDataGuardEnabled: S.optional(S.Boolean),
    localDisasterRecoveryType: S.optional(DisasterRecoveryType),
    role: S.optional(DataGuardRole),
    peerDbIds: S.optional(StringList),
    failedDataRecoveryInSeconds: S.optional(S.Number),
    localAdgAutoFailoverMaxDataLossLimit: S.optional(S.Number),
    remoteDisasterRecoveryConfiguration: S.optional(
      DisasterRecoveryConfiguration,
    ),
    isRefreshableClone: S.optional(S.Boolean),
    refreshableMode: S.optional(RefreshableMode),
    refreshableStatus: S.optional(RefreshableStatus),
    autoRefreshFrequencyInSeconds: S.optional(S.Number),
    autoRefreshPointLagInSeconds: S.optional(S.Number),
    isReconnectCloneEnabled: S.optional(S.Boolean),
    cloneTableSpaceList: S.optional(IntegerList),
    backupRetentionPeriodInDays: S.optional(S.Number),
    longTermBackupSchedule: S.optional(LongTermBackupSchedule),
    isBackupRetentionLocked: S.optional(S.Boolean),
    totalBackupStorageSizeInGBs: S.optional(S.Number),
    resourcePoolSummary: S.optional(ResourcePoolSummary),
    encryptionSummary: S.optional(EncryptionSummary),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastBackup: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceBegin: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceEnd: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeLocalDataGuardEnabled: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDataGuardRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastSwitchover: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastFailover: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastRefresh: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfLastRefreshPoint: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfNextRefresh: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOfAutoRefreshStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDeletionOfFreeAutonomousDatabase: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeReclamationOfFreeAutonomousDatabase: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDisasterRecoveryRoleChanged: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeUntilReconnectCloneEnabled: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    nextLongTermBackupTimeStamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeUndeleted: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    adminPasswordSourceSummary: S.optional(AdminPasswordSourceSummary),
  }),
).annotate({
  identifier: "AutonomousDatabaseSummary",
}) as any as S.Schema<AutonomousDatabaseSummary>;
export type AutonomousDatabaseList = AutonomousDatabaseSummary[];
export const AutonomousDatabaseList = /*@__PURE__*/ S.Array(
  AutonomousDatabaseSummary,
);
export interface ListAutonomousDatabaseClonesOutput {
  nextToken?: string;
  autonomousDatabaseClones: AutonomousDatabaseSummary[];
}
export const ListAutonomousDatabaseClonesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    autonomousDatabaseClones: AutonomousDatabaseList,
  }),
).annotate({
  identifier: "ListAutonomousDatabaseClonesOutput",
}) as any as S.Schema<ListAutonomousDatabaseClonesOutput>;
export interface ListAutonomousDatabasePeersInput {
  maxResults?: number;
  nextToken?: string;
  autonomousDatabaseId: string;
}
export const ListAutonomousDatabasePeersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    autonomousDatabaseId: S.String.pipe(T.HttpLabel("autonomousDatabaseId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousDatabasePeersInput",
}) as any as S.Schema<ListAutonomousDatabasePeersInput>;
export interface AutonomousDatabasePeerSummary {
  autonomousDatabaseId?: string;
  autonomousDatabaseArn?: string;
  ocid?: string;
  region?: string;
}
export const AutonomousDatabasePeerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.optional(S.String),
    autonomousDatabaseArn: S.optional(S.String),
    ocid: S.optional(S.String),
    region: S.optional(S.String),
  }),
).annotate({
  identifier: "AutonomousDatabasePeerSummary",
}) as any as S.Schema<AutonomousDatabasePeerSummary>;
export type AutonomousDatabasePeerList = AutonomousDatabasePeerSummary[];
export const AutonomousDatabasePeerList = /*@__PURE__*/ S.Array(
  AutonomousDatabasePeerSummary,
);
export interface ListAutonomousDatabasePeersOutput {
  nextToken?: string;
  autonomousDatabasePeers: AutonomousDatabasePeerSummary[];
}
export const ListAutonomousDatabasePeersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    autonomousDatabasePeers: AutonomousDatabasePeerList,
  }),
).annotate({
  identifier: "ListAutonomousDatabasePeersOutput",
}) as any as S.Schema<ListAutonomousDatabasePeersOutput>;
export interface ListAutonomousDatabasesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListAutonomousDatabasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousDatabasesInput",
}) as any as S.Schema<ListAutonomousDatabasesInput>;
export interface ListAutonomousDatabasesOutput {
  nextToken?: string;
  autonomousDatabases: AutonomousDatabaseSummary[];
}
export const ListAutonomousDatabasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    autonomousDatabases: AutonomousDatabaseList,
  }),
).annotate({
  identifier: "ListAutonomousDatabasesOutput",
}) as any as S.Schema<ListAutonomousDatabasesOutput>;
export interface ListAutonomousDatabaseVersionsInput {
  maxResults?: number;
  nextToken?: string;
  dbWorkload?: DbWorkload;
}
export const ListAutonomousDatabaseVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    dbWorkload: S.optional(DbWorkload),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousDatabaseVersionsInput",
}) as any as S.Schema<ListAutonomousDatabaseVersionsInput>;
export interface AutonomousDatabaseVersionSummary {
  dbWorkload?: DbWorkload;
  details?: string;
  version?: string;
}
export const AutonomousDatabaseVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbWorkload: S.optional(DbWorkload),
    details: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "AutonomousDatabaseVersionSummary",
}) as any as S.Schema<AutonomousDatabaseVersionSummary>;
export type AutonomousDatabaseVersionList = AutonomousDatabaseVersionSummary[];
export const AutonomousDatabaseVersionList = /*@__PURE__*/ S.Array(
  AutonomousDatabaseVersionSummary,
);
export interface ListAutonomousDatabaseVersionsOutput {
  nextToken?: string;
  autonomousDatabaseVersions: AutonomousDatabaseVersionSummary[];
}
export const ListAutonomousDatabaseVersionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      autonomousDatabaseVersions: AutonomousDatabaseVersionList,
    }),
).annotate({
  identifier: "ListAutonomousDatabaseVersionsOutput",
}) as any as S.Schema<ListAutonomousDatabaseVersionsOutput>;
export interface ListAutonomousVirtualMachinesInput {
  maxResults?: number;
  nextToken?: string;
  cloudAutonomousVmClusterId: string;
}
export const ListAutonomousVirtualMachinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    cloudAutonomousVmClusterId: S.String.pipe(
      T.HttpLabel("cloudAutonomousVmClusterId"),
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutonomousVirtualMachinesInput",
}) as any as S.Schema<ListAutonomousVirtualMachinesInput>;
export interface AutonomousVirtualMachineSummary {
  autonomousVirtualMachineId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  vmName?: string;
  dbServerId?: string;
  dbServerDisplayName?: string;
  cpuCoreCount?: number;
  memorySizeInGBs?: number;
  dbNodeStorageSizeInGBs?: number;
  clientIpAddress?: string;
  cloudAutonomousVmClusterId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
}
export const AutonomousVirtualMachineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousVirtualMachineId: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    vmName: S.optional(S.String),
    dbServerId: S.optional(S.String),
    dbServerDisplayName: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    clientIpAddress: S.optional(S.String),
    cloudAutonomousVmClusterId: S.optional(S.String),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
  }),
).annotate({
  identifier: "AutonomousVirtualMachineSummary",
}) as any as S.Schema<AutonomousVirtualMachineSummary>;
export type AutonomousVirtualMachineList = AutonomousVirtualMachineSummary[];
export const AutonomousVirtualMachineList = /*@__PURE__*/ S.Array(
  AutonomousVirtualMachineSummary,
);
export interface ListAutonomousVirtualMachinesOutput {
  nextToken?: string;
  autonomousVirtualMachines: AutonomousVirtualMachineSummary[];
}
export const ListAutonomousVirtualMachinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    autonomousVirtualMachines: AutonomousVirtualMachineList,
  }),
).annotate({
  identifier: "ListAutonomousVirtualMachinesOutput",
}) as any as S.Schema<ListAutonomousVirtualMachinesOutput>;
export interface ListCloudAutonomousVmClustersInput {
  maxResults?: number;
  nextToken?: string;
  cloudExadataInfrastructureId?: string;
}
export const ListCloudAutonomousVmClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    cloudExadataInfrastructureId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCloudAutonomousVmClustersInput",
}) as any as S.Schema<ListCloudAutonomousVmClustersInput>;
export interface CloudAutonomousVmClusterSummary {
  cloudAutonomousVmClusterId: string;
  cloudAutonomousVmClusterArn?: string;
  odbNetworkId?: string;
  odbNetworkArn?: string;
  ociResourceAnchorName?: string;
  percentProgress?: number;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  autonomousDataStoragePercentage?: number;
  autonomousDataStorageSizeInTBs?: number;
  availableAutonomousDataStorageSizeInTBs?: number;
  availableContainerDatabases?: number;
  availableCpus?: number;
  computeModel?: ComputeModel;
  cpuCoreCount?: number;
  cpuCoreCountPerNode?: number;
  cpuPercentage?: number;
  dataStorageSizeInGBs?: number;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  description?: string;
  domain?: string;
  exadataStorageInTBsLowestScaledValue?: number;
  hostname?: string;
  ocid?: string;
  ociUrl?: string;
  isMtlsEnabledVmCluster?: boolean;
  licenseModel?: LicenseModel;
  maintenanceWindow?: MaintenanceWindow;
  maxAcdsLowestScaledValue?: number;
  memoryPerOracleComputeUnitInGBs?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  nonProvisionableAutonomousContainerDatabases?: number;
  provisionableAutonomousContainerDatabases?: number;
  provisionedAutonomousContainerDatabases?: number;
  provisionedCpus?: number;
  reclaimableCpus?: number;
  reservedCpus?: number;
  scanListenerPortNonTls?: number;
  scanListenerPortTls?: number;
  shape?: string;
  createdAt?: Date;
  timeDatabaseSslCertificateExpires?: Date;
  timeOrdsCertificateExpires?: Date;
  timeZone?: string;
  totalContainerDatabases?: number;
  iamRoles?: IamRole[];
}
export const CloudAutonomousVmClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudAutonomousVmClusterId: S.String,
    cloudAutonomousVmClusterArn: S.optional(S.String),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudExadataInfrastructureId: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    autonomousDataStoragePercentage: S.optional(S.Number),
    autonomousDataStorageSizeInTBs: S.optional(S.Number),
    availableAutonomousDataStorageSizeInTBs: S.optional(S.Number),
    availableContainerDatabases: S.optional(S.Number),
    availableCpus: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    cpuCoreCount: S.optional(S.Number),
    cpuCoreCountPerNode: S.optional(S.Number),
    cpuPercentage: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServers: S.optional(StringList),
    description: S.optional(S.String),
    domain: S.optional(S.String),
    exadataStorageInTBsLowestScaledValue: S.optional(S.Number),
    hostname: S.optional(S.String),
    ocid: S.optional(S.String),
    ociUrl: S.optional(S.String),
    isMtlsEnabledVmCluster: S.optional(S.Boolean),
    licenseModel: S.optional(LicenseModel),
    maintenanceWindow: S.optional(MaintenanceWindow),
    maxAcdsLowestScaledValue: S.optional(S.Number),
    memoryPerOracleComputeUnitInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    nonProvisionableAutonomousContainerDatabases: S.optional(S.Number),
    provisionableAutonomousContainerDatabases: S.optional(S.Number),
    provisionedAutonomousContainerDatabases: S.optional(S.Number),
    provisionedCpus: S.optional(S.Number),
    reclaimableCpus: S.optional(S.Number),
    reservedCpus: S.optional(S.Number),
    scanListenerPortNonTls: S.optional(S.Number),
    scanListenerPortTls: S.optional(S.Number),
    shape: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeDatabaseSslCertificateExpires: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeOrdsCertificateExpires: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeZone: S.optional(S.String),
    totalContainerDatabases: S.optional(S.Number),
    iamRoles: S.optional(IamRoleList),
  }),
).annotate({
  identifier: "CloudAutonomousVmClusterSummary",
}) as any as S.Schema<CloudAutonomousVmClusterSummary>;
export type CloudAutonomousVmClusterList = CloudAutonomousVmClusterSummary[];
export const CloudAutonomousVmClusterList = /*@__PURE__*/ S.Array(
  CloudAutonomousVmClusterSummary,
);
export interface ListCloudAutonomousVmClustersOutput {
  nextToken?: string;
  cloudAutonomousVmClusters: CloudAutonomousVmClusterSummary[];
}
export const ListCloudAutonomousVmClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    cloudAutonomousVmClusters: CloudAutonomousVmClusterList,
  }),
).annotate({
  identifier: "ListCloudAutonomousVmClustersOutput",
}) as any as S.Schema<ListCloudAutonomousVmClustersOutput>;
export interface ListCloudExadataInfrastructuresInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListCloudExadataInfrastructuresInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCloudExadataInfrastructuresInput",
}) as any as S.Schema<ListCloudExadataInfrastructuresInput>;
export interface CloudExadataInfrastructureSummary {
  cloudExadataInfrastructureId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureArn?: string;
  activatedStorageCount?: number;
  additionalStorageCount?: number;
  availableStorageSizeInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  computeCount?: number;
  cpuCount?: number;
  customerContactsToSendToOCI?: CustomerContact[];
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerVersion?: string;
  lastMaintenanceRunId?: string;
  maintenanceWindow?: MaintenanceWindow;
  maxCpuCount?: number;
  maxDataStorageInTBs?: number;
  maxDbNodeStorageSizeInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  monthlyDbServerVersion?: string;
  monthlyStorageServerVersion?: string;
  nextMaintenanceRunId?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  ocid?: string;
  shape?: string;
  storageCount?: number;
  storageServerVersion?: string;
  createdAt?: Date;
  totalStorageSizeInGBs?: number;
  percentProgress?: number;
  databaseServerType?: string;
  storageServerType?: string;
  computeModel?: ComputeModel;
}
export const CloudExadataInfrastructureSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    activatedStorageCount: S.optional(S.Number),
    additionalStorageCount: S.optional(S.Number),
    availableStorageSizeInGBs: S.optional(S.Number),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    computeCount: S.optional(S.Number),
    cpuCount: S.optional(S.Number),
    customerContactsToSendToOCI: S.optional(CustomerContacts),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerVersion: S.optional(S.String),
    lastMaintenanceRunId: S.optional(S.String),
    maintenanceWindow: S.optional(MaintenanceWindow),
    maxCpuCount: S.optional(S.Number),
    maxDataStorageInTBs: S.optional(S.Number),
    maxDbNodeStorageSizeInGBs: S.optional(S.Number),
    maxMemoryInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    monthlyDbServerVersion: S.optional(S.String),
    monthlyStorageServerVersion: S.optional(S.String),
    nextMaintenanceRunId: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    ocid: S.optional(S.String),
    shape: S.optional(S.String),
    storageCount: S.optional(S.Number),
    storageServerVersion: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    totalStorageSizeInGBs: S.optional(S.Number),
    percentProgress: S.optional(S.Number),
    databaseServerType: S.optional(S.String),
    storageServerType: S.optional(S.String),
    computeModel: S.optional(ComputeModel),
  }),
).annotate({
  identifier: "CloudExadataInfrastructureSummary",
}) as any as S.Schema<CloudExadataInfrastructureSummary>;
export type CloudExadataInfrastructureList =
  CloudExadataInfrastructureSummary[];
export const CloudExadataInfrastructureList = /*@__PURE__*/ S.Array(
  CloudExadataInfrastructureSummary,
);
export interface ListCloudExadataInfrastructuresOutput {
  nextToken?: string;
  cloudExadataInfrastructures: CloudExadataInfrastructureSummary[];
}
export const ListCloudExadataInfrastructuresOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      cloudExadataInfrastructures: CloudExadataInfrastructureList,
    }),
).annotate({
  identifier: "ListCloudExadataInfrastructuresOutput",
}) as any as S.Schema<ListCloudExadataInfrastructuresOutput>;
export interface ListCloudVmClustersInput {
  maxResults?: number;
  nextToken?: string;
  cloudExadataInfrastructureId?: string;
}
export const ListCloudVmClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    cloudExadataInfrastructureId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCloudVmClustersInput",
}) as any as S.Schema<ListCloudVmClustersInput>;
export interface CloudVmClusterSummary {
  cloudVmClusterId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudVmClusterArn?: string;
  cloudExadataInfrastructureId?: string;
  cloudExadataInfrastructureArn?: string;
  clusterName?: string;
  cpuCoreCount?: number;
  dataCollectionOptions?: DataCollectionOptions;
  dataStorageSizeInTBs?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServers?: string[];
  diskRedundancy?: DiskRedundancy;
  giVersion?: string;
  hostname?: string;
  iormConfigCache?: ExadataIormConfig;
  isLocalBackupEnabled?: boolean;
  isSparseDiskgroupEnabled?: boolean;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  domain?: string;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  shape?: string;
  sshPublicKeys?: (string | redacted.Redacted<string>)[];
  storageSizeInGBs?: number;
  systemVersion?: string;
  createdAt?: Date;
  timeZone?: string;
  vipIds?: string[];
  odbNetworkId?: string;
  odbNetworkArn?: string;
  percentProgress?: number;
  computeModel?: ComputeModel;
  iamRoles?: IamRole[];
}
export const CloudVmClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cloudVmClusterArn: S.optional(S.String),
    cloudExadataInfrastructureId: S.optional(S.String),
    cloudExadataInfrastructureArn: S.optional(S.String),
    clusterName: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    dataStorageSizeInTBs: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServers: S.optional(StringList),
    diskRedundancy: S.optional(DiskRedundancy),
    giVersion: S.optional(S.String),
    hostname: S.optional(S.String),
    iormConfigCache: S.optional(ExadataIormConfig),
    isLocalBackupEnabled: S.optional(S.Boolean),
    isSparseDiskgroupEnabled: S.optional(S.Boolean),
    lastUpdateHistoryEntryId: S.optional(S.String),
    licenseModel: S.optional(LicenseModel),
    listenerPort: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    domain: S.optional(S.String),
    scanDnsName: S.optional(S.String),
    scanDnsRecordId: S.optional(S.String),
    scanIpIds: S.optional(StringList),
    shape: S.optional(S.String),
    sshPublicKeys: S.optional(SensitiveStringList),
    storageSizeInGBs: S.optional(S.Number),
    systemVersion: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeZone: S.optional(S.String),
    vipIds: S.optional(StringList),
    odbNetworkId: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    computeModel: S.optional(ComputeModel),
    iamRoles: S.optional(IamRoleList),
  }),
).annotate({
  identifier: "CloudVmClusterSummary",
}) as any as S.Schema<CloudVmClusterSummary>;
export type CloudVmClusterList = CloudVmClusterSummary[];
export const CloudVmClusterList = /*@__PURE__*/ S.Array(CloudVmClusterSummary);
export interface ListCloudVmClustersOutput {
  nextToken?: string;
  cloudVmClusters: CloudVmClusterSummary[];
}
export const ListCloudVmClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    cloudVmClusters: CloudVmClusterList,
  }),
).annotate({
  identifier: "ListCloudVmClustersOutput",
}) as any as S.Schema<ListCloudVmClustersOutput>;
export interface ListDbNodesInput {
  maxResults?: number;
  nextToken?: string;
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
}
export const ListDbNodesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    cloudVmClusterId: S.optional(S.String),
    exadbVmClusterId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbNodesInput",
}) as any as S.Schema<ListDbNodesInput>;
export interface DbNodeSummary {
  dbNodeId?: string;
  dbNodeArn?: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
  additionalDetails?: string;
  backupIpId?: string;
  backupVnic2Id?: string;
  backupVnicId?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerId?: string;
  dbSystemId?: string;
  faultDomain?: string;
  hostIpId?: string;
  hostname?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maintenanceType?: DbNodeMaintenanceType;
  memorySizeInGBs?: number;
  softwareStorageSizeInGB?: number;
  createdAt?: Date;
  timeMaintenanceWindowEnd?: string;
  timeMaintenanceWindowStart?: string;
  totalCpuCoreCount?: number;
  vnic2Id?: string;
  vnicId?: string;
}
export const DbNodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbNodeId: S.optional(S.String),
    dbNodeArn: S.optional(S.String),
    status: S.optional(DbNodeResourceStatus),
    statusReason: S.optional(S.String),
    additionalDetails: S.optional(S.String),
    backupIpId: S.optional(S.String),
    backupVnic2Id: S.optional(S.String),
    backupVnicId: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerId: S.optional(S.String),
    dbSystemId: S.optional(S.String),
    faultDomain: S.optional(S.String),
    hostIpId: S.optional(S.String),
    hostname: S.optional(S.String),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    maintenanceType: S.optional(DbNodeMaintenanceType),
    memorySizeInGBs: S.optional(S.Number),
    softwareStorageSizeInGB: S.optional(S.Number),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    timeMaintenanceWindowEnd: S.optional(S.String),
    timeMaintenanceWindowStart: S.optional(S.String),
    totalCpuCoreCount: S.optional(S.Number),
    vnic2Id: S.optional(S.String),
    vnicId: S.optional(S.String),
  }),
).annotate({ identifier: "DbNodeSummary" }) as any as S.Schema<DbNodeSummary>;
export type DbNodeList = DbNodeSummary[];
export const DbNodeList = /*@__PURE__*/ S.Array(DbNodeSummary);
export interface ListDbNodesOutput {
  nextToken?: string;
  dbNodes: DbNodeSummary[];
}
export const ListDbNodesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), dbNodes: DbNodeList }),
).annotate({
  identifier: "ListDbNodesOutput",
}) as any as S.Schema<ListDbNodesOutput>;
export interface ListDbServersInput {
  cloudExadataInfrastructureId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDbServersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudExadataInfrastructureId: S.String.pipe(
      T.HttpLabel("cloudExadataInfrastructureId"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbServersInput",
}) as any as S.Schema<ListDbServersInput>;
export interface DbServerSummary {
  dbServerId?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cpuCoreCount?: number;
  dbNodeStorageSizeInGBs?: number;
  dbServerPatchingDetails?: DbServerPatchingDetails;
  displayName?: string;
  exadataInfrastructureId?: string;
  ocid?: string;
  ociResourceAnchorName?: string;
  maxCpuCount?: number;
  maxDbNodeStorageInGBs?: number;
  maxMemoryInGBs?: number;
  memorySizeInGBs?: number;
  shape?: string;
  createdAt?: Date;
  vmClusterIds?: string[];
  computeModel?: ComputeModel;
  autonomousVmClusterIds?: string[];
  autonomousVirtualMachineIds?: string[];
}
export const DbServerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbServerId: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    cpuCoreCount: S.optional(S.Number),
    dbNodeStorageSizeInGBs: S.optional(S.Number),
    dbServerPatchingDetails: S.optional(DbServerPatchingDetails),
    displayName: S.optional(S.String),
    exadataInfrastructureId: S.optional(S.String),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    maxCpuCount: S.optional(S.Number),
    maxDbNodeStorageInGBs: S.optional(S.Number),
    maxMemoryInGBs: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    shape: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    vmClusterIds: S.optional(StringList),
    computeModel: S.optional(ComputeModel),
    autonomousVmClusterIds: S.optional(StringList),
    autonomousVirtualMachineIds: S.optional(StringList),
  }),
).annotate({
  identifier: "DbServerSummary",
}) as any as S.Schema<DbServerSummary>;
export type DbServerList = DbServerSummary[];
export const DbServerList = /*@__PURE__*/ S.Array(DbServerSummary);
export interface ListDbServersOutput {
  nextToken?: string;
  dbServers: DbServerSummary[];
}
export const ListDbServersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), dbServers: DbServerList }),
).annotate({
  identifier: "ListDbServersOutput",
}) as any as S.Schema<ListDbServersOutput>;
export interface ListDbSystemShapesInput {
  maxResults?: number;
  nextToken?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  shapeFamily?: string;
}
export const ListDbSystemShapesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    shapeFamily: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDbSystemShapesInput",
}) as any as S.Schema<ListDbSystemShapesInput>;
export type ShapeType =
  | "AMD"
  | "INTEL"
  | "INTEL_FLEX_X9"
  | "AMPERE_FLEX_A1"
  | (string & {});
export const ShapeType = S.String;

export interface DbSystemShapeSummary {
  availableCoreCount?: number;
  availableCoreCountPerNode?: number;
  availableDataStorageInTBs?: number;
  availableDataStoragePerServerInTBs?: number;
  availableDbNodePerNodeInGBs?: number;
  availableDbNodeStorageInGBs?: number;
  availableMemoryInGBs?: number;
  availableMemoryPerNodeInGBs?: number;
  coreCountIncrement?: number;
  maxStorageCount?: number;
  maximumNodeCount?: number;
  minCoreCountPerNode?: number;
  minDataStorageInTBs?: number;
  minDbNodeStoragePerNodeInGBs?: number;
  minMemoryPerNodeInGBs?: number;
  minStorageCount?: number;
  minimumCoreCount?: number;
  minimumNodeCount?: number;
  runtimeMinimumCoreCount?: number;
  shapeFamily?: string;
  shapeType?: ShapeType;
  shapeAttributes?: ShapeAttribute[];
  name?: string;
  computeModel?: ComputeModel;
  areServerTypesSupported?: boolean;
}
export const DbSystemShapeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    availableCoreCount: S.optional(S.Number),
    availableCoreCountPerNode: S.optional(S.Number),
    availableDataStorageInTBs: S.optional(S.Number),
    availableDataStoragePerServerInTBs: S.optional(S.Number),
    availableDbNodePerNodeInGBs: S.optional(S.Number),
    availableDbNodeStorageInGBs: S.optional(S.Number),
    availableMemoryInGBs: S.optional(S.Number),
    availableMemoryPerNodeInGBs: S.optional(S.Number),
    coreCountIncrement: S.optional(S.Number),
    maxStorageCount: S.optional(S.Number),
    maximumNodeCount: S.optional(S.Number),
    minCoreCountPerNode: S.optional(S.Number),
    minDataStorageInTBs: S.optional(S.Number),
    minDbNodeStoragePerNodeInGBs: S.optional(S.Number),
    minMemoryPerNodeInGBs: S.optional(S.Number),
    minStorageCount: S.optional(S.Number),
    minimumCoreCount: S.optional(S.Number),
    minimumNodeCount: S.optional(S.Number),
    runtimeMinimumCoreCount: S.optional(S.Number),
    shapeFamily: S.optional(S.String),
    shapeType: S.optional(ShapeType),
    shapeAttributes: S.optional(ShapeAttributeList),
    name: S.optional(S.String),
    computeModel: S.optional(ComputeModel),
    areServerTypesSupported: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DbSystemShapeSummary",
}) as any as S.Schema<DbSystemShapeSummary>;
export type DbSystemShapeList = DbSystemShapeSummary[];
export const DbSystemShapeList = /*@__PURE__*/ S.Array(DbSystemShapeSummary);
export interface ListDbSystemShapesOutput {
  nextToken?: string;
  dbSystemShapes: DbSystemShapeSummary[];
}
export const ListDbSystemShapesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    dbSystemShapes: DbSystemShapeList,
  }),
).annotate({
  identifier: "ListDbSystemShapesOutput",
}) as any as S.Schema<ListDbSystemShapesOutput>;
export interface ListExadbVmClustersInput {
  exascaleDbStorageVaultId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExadbVmClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exascaleDbStorageVaultId: S.optional(S.String).pipe(
      T.HttpQuery("exascaleDbStorageVaultId"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExadbVmClustersInput",
}) as any as S.Schema<ListExadbVmClustersInput>;
export interface ExadbVmClusterSummary {
  exadbVmClusterId: string;
  clusterName?: string;
  createdAt?: Date;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  domain?: string;
  enabledEcpuCount?: number;
  exadbVmClusterArn?: string;
  exascaleDbStorageVaultArn?: string;
  exascaleDbStorageVaultId?: string;
  giVersion?: string;
  gridImageId?: string;
  gridImageType?: GridImageType;
  hostname?: string;
  iamRoles?: IamRole[];
  iormConfigCache?: ExadataIormConfig;
  lastUpdateHistoryEntryId?: string;
  licenseModel?: LicenseModel;
  listenerPort?: number;
  memorySizeInGBs?: number;
  nodeCount?: number;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  odbNetworkArn?: string;
  odbNetworkId?: string;
  percentProgress?: number;
  scanDnsName?: string;
  scanDnsRecordId?: string;
  scanIpIds?: string[];
  scanListenerPortTcp?: number;
  scanListenerPortTcpSsl?: number;
  shape?: string;
  shapeAttribute?: ShapeAttribute;
  snapshotFileSystemStorage?: ExadbVmClusterStorageDetails;
  sshPublicKeys?: string[];
  status?: ResourceStatus;
  statusReason?: string;
  systemVersion?: string;
  timeZone?: string;
  totalEcpuCount?: number;
  totalFileSystemStorage?: ExadbVmClusterStorageDetails;
  vipIds?: string[];
  vmFileSystemStorage?: ExadbVmClusterStorageDetails;
}
export const ExadbVmClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exadbVmClusterId: S.String,
    clusterName: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dataCollectionOptions: S.optional(DataCollectionOptions),
    displayName: S.optional(S.String),
    domain: S.optional(S.String),
    enabledEcpuCount: S.optional(S.Number),
    exadbVmClusterArn: S.optional(S.String),
    exascaleDbStorageVaultArn: S.optional(S.String),
    exascaleDbStorageVaultId: S.optional(S.String),
    giVersion: S.optional(S.String),
    gridImageId: S.optional(S.String),
    gridImageType: S.optional(GridImageType),
    hostname: S.optional(S.String),
    iamRoles: S.optional(IamRoleList),
    iormConfigCache: S.optional(ExadataIormConfig),
    lastUpdateHistoryEntryId: S.optional(S.String),
    licenseModel: S.optional(LicenseModel),
    listenerPort: S.optional(S.Number),
    memorySizeInGBs: S.optional(S.Number),
    nodeCount: S.optional(S.Number),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    odbNetworkId: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    scanDnsName: S.optional(S.String),
    scanDnsRecordId: S.optional(S.String),
    scanIpIds: S.optional(StringList),
    scanListenerPortTcp: S.optional(S.Number),
    scanListenerPortTcpSsl: S.optional(S.Number),
    shape: S.optional(S.String),
    shapeAttribute: S.optional(ShapeAttribute),
    snapshotFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
    sshPublicKeys: S.optional(StringList),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    systemVersion: S.optional(S.String),
    timeZone: S.optional(S.String),
    totalEcpuCount: S.optional(S.Number),
    totalFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
    vipIds: S.optional(StringList),
    vmFileSystemStorage: S.optional(ExadbVmClusterStorageDetails),
  }),
).annotate({
  identifier: "ExadbVmClusterSummary",
}) as any as S.Schema<ExadbVmClusterSummary>;
export type ExadbVmClusterList = ExadbVmClusterSummary[];
export const ExadbVmClusterList = /*@__PURE__*/ S.Array(ExadbVmClusterSummary);
export interface ListExadbVmClustersOutput {
  nextToken?: string;
  exadbVmClusters: ExadbVmClusterSummary[];
}
export const ListExadbVmClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    exadbVmClusters: ExadbVmClusterList,
  }),
).annotate({
  identifier: "ListExadbVmClustersOutput",
}) as any as S.Schema<ListExadbVmClustersOutput>;
export interface ListExascaleDbStorageVaultsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListExascaleDbStorageVaultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExascaleDbStorageVaultsInput",
}) as any as S.Schema<ListExascaleDbStorageVaultsInput>;
export interface ExascaleDbStorageVaultSummary {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  attachedShapeAttributes?: ShapeAttribute[];
  autoscaleLimitInGBs?: number;
  availabilityZone?: string;
  availabilityZoneId?: string;
  createdAt?: Date;
  description?: string;
  displayName?: string;
  vmClusterArns?: string[];
  vmClusterCount?: number;
  vmClusterIds?: string[];
  exascaleDbStorageVaultArn?: string;
  highCapacityDatabaseStorage?: ExascaleDbStorageDetails;
  isAutoscaleEnabled?: boolean;
  ocid?: string;
  ociResourceAnchorName?: string;
  ociUrl?: string;
  percentProgress?: number;
  status?: ResourceStatus;
  statusReason?: string;
  timeZone?: string;
}
export const ExascaleDbStorageVaultSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exascaleDbStorageVaultId: S.String,
    additionalFlashCacheInPercent: S.optional(S.Number),
    attachedShapeAttributes: S.optional(ShapeAttributeList),
    autoscaleLimitInGBs: S.optional(S.Number),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    displayName: S.optional(S.String),
    vmClusterArns: S.optional(ResourceArnList),
    vmClusterCount: S.optional(S.Number),
    vmClusterIds: S.optional(ResourceIdList),
    exascaleDbStorageVaultArn: S.optional(S.String),
    highCapacityDatabaseStorage: S.optional(ExascaleDbStorageDetails),
    isAutoscaleEnabled: S.optional(S.Boolean),
    ocid: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociUrl: S.optional(S.String),
    percentProgress: S.optional(S.Number),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    timeZone: S.optional(S.String),
  }),
).annotate({
  identifier: "ExascaleDbStorageVaultSummary",
}) as any as S.Schema<ExascaleDbStorageVaultSummary>;
export type ExascaleDbStorageVaultList = ExascaleDbStorageVaultSummary[];
export const ExascaleDbStorageVaultList = /*@__PURE__*/ S.Array(
  ExascaleDbStorageVaultSummary,
);
export interface ListExascaleDbStorageVaultsOutput {
  nextToken?: string;
  exascaleDbStorageVaults: ExascaleDbStorageVaultSummary[];
}
export const ListExascaleDbStorageVaultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    exascaleDbStorageVaults: ExascaleDbStorageVaultList,
  }),
).annotate({
  identifier: "ListExascaleDbStorageVaultsOutput",
}) as any as S.Schema<ListExascaleDbStorageVaultsOutput>;
export interface ListGiMinorVersionsInput {
  giVersion: string;
  maxResults?: number;
  nextToken?: string;
  shapeFamily?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
}
export const ListGiMinorVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    giVersion: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    shapeFamily: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGiMinorVersionsInput",
}) as any as S.Schema<ListGiMinorVersionsInput>;
export interface GiMinorVersionSummary {
  version: string;
  gridImageId?: string;
}
export const GiMinorVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.String, gridImageId: S.optional(S.String) }),
).annotate({
  identifier: "GiMinorVersionSummary",
}) as any as S.Schema<GiMinorVersionSummary>;
export type GiMinorVersionList = GiMinorVersionSummary[];
export const GiMinorVersionList = /*@__PURE__*/ S.Array(GiMinorVersionSummary);
export interface ListGiMinorVersionsOutput {
  nextToken?: string;
  giMinorVersions: GiMinorVersionSummary[];
}
export const ListGiMinorVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    giMinorVersions: GiMinorVersionList,
  }),
).annotate({
  identifier: "ListGiMinorVersionsOutput",
}) as any as S.Schema<ListGiMinorVersionsOutput>;
export interface ListGiVersionsInput {
  maxResults?: number;
  nextToken?: string;
  shape?: string;
}
export const ListGiVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    shape: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListGiVersionsInput",
}) as any as S.Schema<ListGiVersionsInput>;
export interface GiVersionSummary {
  version?: string;
}
export const GiVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.optional(S.String) }),
).annotate({
  identifier: "GiVersionSummary",
}) as any as S.Schema<GiVersionSummary>;
export type GiVersionList = GiVersionSummary[];
export const GiVersionList = /*@__PURE__*/ S.Array(GiVersionSummary);
export interface ListGiVersionsOutput {
  nextToken?: string;
  giVersions: GiVersionSummary[];
}
export const ListGiVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), giVersions: GiVersionList }),
).annotate({
  identifier: "ListGiVersionsOutput",
}) as any as S.Schema<ListGiVersionsOutput>;
export interface ListOdbNetworksInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListOdbNetworksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListOdbNetworksInput",
}) as any as S.Schema<ListOdbNetworksInput>;
export interface OdbNetworkSummary {
  odbNetworkId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkArn?: string;
  availabilityZone?: string;
  availabilityZoneId?: string;
  clientSubnetCidr?: string;
  backupSubnetCidr?: string;
  customDomainName?: string;
  defaultDnsPrefix?: string;
  peeredCidrs?: string[];
  ociNetworkAnchorId?: string;
  ociNetworkAnchorUrl?: string;
  ociResourceAnchorName?: string;
  ociVcnId?: string;
  ociVcnUrl?: string;
  ociDnsForwardingConfigs?: OciDnsForwardingConfig[];
  createdAt?: Date;
  percentProgress?: number;
  managedServices?: ManagedServices;
  ec2PlacementGroupIds?: string[];
}
export const OdbNetworkSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    clientSubnetCidr: S.optional(S.String),
    backupSubnetCidr: S.optional(S.String),
    customDomainName: S.optional(S.String),
    defaultDnsPrefix: S.optional(S.String),
    peeredCidrs: S.optional(StringList),
    ociNetworkAnchorId: S.optional(S.String),
    ociNetworkAnchorUrl: S.optional(S.String),
    ociResourceAnchorName: S.optional(S.String),
    ociVcnId: S.optional(S.String),
    ociVcnUrl: S.optional(S.String),
    ociDnsForwardingConfigs: S.optional(OciDnsForwardingConfigList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    percentProgress: S.optional(S.Number),
    managedServices: S.optional(ManagedServices),
    ec2PlacementGroupIds: S.optional(ResourceIdList),
  }),
).annotate({
  identifier: "OdbNetworkSummary",
}) as any as S.Schema<OdbNetworkSummary>;
export type OdbNetworkList = OdbNetworkSummary[];
export const OdbNetworkList = /*@__PURE__*/ S.Array(OdbNetworkSummary);
export interface ListOdbNetworksOutput {
  nextToken?: string;
  odbNetworks: OdbNetworkSummary[];
}
export const ListOdbNetworksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), odbNetworks: OdbNetworkList }),
).annotate({
  identifier: "ListOdbNetworksOutput",
}) as any as S.Schema<ListOdbNetworksOutput>;
export interface ListOdbPeeringConnectionsInput {
  maxResults?: number;
  nextToken?: string;
  odbNetworkId?: string;
}
export const ListOdbPeeringConnectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    odbNetworkId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListOdbPeeringConnectionsInput",
}) as any as S.Schema<ListOdbPeeringConnectionsInput>;
export interface OdbPeeringConnectionSummary {
  odbPeeringConnectionId: string;
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionArn?: string;
  odbNetworkArn?: string;
  peerNetworkArn?: string;
  odbPeeringConnectionType?: string;
  peerNetworkCidrs?: string[];
  createdAt?: Date;
  percentProgress?: number;
}
export const OdbPeeringConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbPeeringConnectionId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbPeeringConnectionArn: S.optional(S.String),
    odbNetworkArn: S.optional(S.String),
    peerNetworkArn: S.optional(S.String),
    odbPeeringConnectionType: S.optional(S.String),
    peerNetworkCidrs: S.optional(PeeredCidrList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    percentProgress: S.optional(S.Number),
  }),
).annotate({
  identifier: "OdbPeeringConnectionSummary",
}) as any as S.Schema<OdbPeeringConnectionSummary>;
export type OdbPeeringConnectionList = OdbPeeringConnectionSummary[];
export const OdbPeeringConnectionList = /*@__PURE__*/ S.Array(
  OdbPeeringConnectionSummary,
);
export interface ListOdbPeeringConnectionsOutput {
  nextToken?: string;
  odbPeeringConnections: OdbPeeringConnectionSummary[];
}
export const ListOdbPeeringConnectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    odbPeeringConnections: OdbPeeringConnectionList,
  }),
).annotate({
  identifier: "ListOdbPeeringConnectionsOutput",
}) as any as S.Schema<ListOdbPeeringConnectionsOutput>;
export interface ListSystemVersionsInput {
  maxResults?: number;
  nextToken?: string;
  giVersion: string;
  shape: string;
}
export const ListSystemVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    giVersion: S.String,
    shape: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSystemVersionsInput",
}) as any as S.Schema<ListSystemVersionsInput>;
export interface SystemVersionSummary {
  giVersion?: string;
  shape?: string;
  systemVersions?: string[];
}
export const SystemVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    giVersion: S.optional(S.String),
    shape: S.optional(S.String),
    systemVersions: S.optional(StringList),
  }),
).annotate({
  identifier: "SystemVersionSummary",
}) as any as S.Schema<SystemVersionSummary>;
export type SystemVersionList = SystemVersionSummary[];
export const SystemVersionList = /*@__PURE__*/ S.Array(SystemVersionSummary);
export interface ListSystemVersionsOutput {
  nextToken?: string;
  systemVersions: SystemVersionSummary[];
}
export const ListSystemVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    systemVersions: SystemVersionList,
  }),
).annotate({
  identifier: "ListSystemVersionsOutput",
}) as any as S.Schema<ListSystemVersionsOutput>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type ResponseTagMap = { [key: string]: string | undefined };
export const ResponseTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(ResponseTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RebootAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  isOnlineReboot?: boolean;
}
export const RebootAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    isOnlineReboot: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RebootAutonomousDatabaseInput",
}) as any as S.Schema<RebootAutonomousDatabaseInput>;
export interface RebootAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const RebootAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "RebootAutonomousDatabaseOutput",
}) as any as S.Schema<RebootAutonomousDatabaseOutput>;
export interface RebootDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export const RebootDbNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.optional(S.String),
    exadbVmClusterId: S.optional(S.String),
    dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RebootDbNodeInput",
}) as any as S.Schema<RebootDbNodeInput>;
export interface RebootDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export const RebootDbNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbNodeId: S.String,
    status: S.optional(DbNodeResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "RebootDbNodeOutput",
}) as any as S.Schema<RebootDbNodeOutput>;
export interface RestoreAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  timestamp: Date;
}
export const RestoreAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    timestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreAutonomousDatabaseInput",
}) as any as S.Schema<RestoreAutonomousDatabaseInput>;
export interface RestoreAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const RestoreAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "RestoreAutonomousDatabaseOutput",
}) as any as S.Schema<RestoreAutonomousDatabaseOutput>;
export interface ShrinkAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export const ShrinkAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autonomousDatabaseId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ShrinkAutonomousDatabaseInput",
}) as any as S.Schema<ShrinkAutonomousDatabaseInput>;
export interface ShrinkAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const ShrinkAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ShrinkAutonomousDatabaseOutput",
}) as any as S.Schema<ShrinkAutonomousDatabaseOutput>;
export interface StartAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export const StartAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autonomousDatabaseId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAutonomousDatabaseInput",
}) as any as S.Schema<StartAutonomousDatabaseInput>;
export interface StartAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const StartAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StartAutonomousDatabaseOutput",
}) as any as S.Schema<StartAutonomousDatabaseOutput>;
export interface StartDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export const StartDbNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.optional(S.String),
    exadbVmClusterId: S.optional(S.String),
    dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartDbNodeInput",
}) as any as S.Schema<StartDbNodeInput>;
export interface StartDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export const StartDbNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbNodeId: S.String,
    status: S.optional(DbNodeResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StartDbNodeOutput",
}) as any as S.Schema<StartDbNodeOutput>;
export interface StopAutonomousDatabaseInput {
  autonomousDatabaseId: string;
}
export const StopAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ autonomousDatabaseId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopAutonomousDatabaseInput",
}) as any as S.Schema<StopAutonomousDatabaseInput>;
export interface StopAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const StopAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StopAutonomousDatabaseOutput",
}) as any as S.Schema<StopAutonomousDatabaseOutput>;
export interface StopDbNodeInput {
  cloudVmClusterId?: string;
  exadbVmClusterId?: string;
  dbNodeId: string;
}
export const StopDbNodeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cloudVmClusterId: S.optional(S.String),
    exadbVmClusterId: S.optional(S.String),
    dbNodeId: S.String.pipe(T.HttpLabel("dbNodeId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopDbNodeInput",
}) as any as S.Schema<StopDbNodeInput>;
export interface StopDbNodeOutput {
  dbNodeId: string;
  status?: DbNodeResourceStatus;
  statusReason?: string;
}
export const StopDbNodeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbNodeId: S.String,
    status: S.optional(DbNodeResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StopDbNodeOutput",
}) as any as S.Schema<StopDbNodeOutput>;
export interface SwitchoverAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  peerDbArn?: string;
}
export const SwitchoverAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    peerDbArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SwitchoverAutonomousDatabaseInput",
}) as any as S.Schema<SwitchoverAutonomousDatabaseInput>;
export interface SwitchoverAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const SwitchoverAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SwitchoverAutonomousDatabaseOutput",
}) as any as S.Schema<SwitchoverAutonomousDatabaseOutput>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: RequestTagMap }).pipe(
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys,
  }).pipe(
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
export interface UpdateAutonomousDatabaseInput {
  autonomousDatabaseId: string;
  adminPassword?: string | redacted.Redacted<string>;
  computeCount?: number;
  cpuCoreCount?: number;
  dataStorageSizeInTBs?: number;
  dataStorageSizeInGBs?: number;
  displayName?: string;
  dbName?: string;
  dbVersion?: string;
  dbWorkload?: DbWorkload;
  dbToolsDetails?: DatabaseTool[];
  databaseEdition?: DatabaseEdition;
  licenseModel?: LicenseModel;
  isAutoScalingEnabled?: boolean;
  isAutoScalingForStorageEnabled?: boolean;
  isBackupRetentionLocked?: boolean;
  isLocalDataGuardEnabled?: boolean;
  isMtlsConnectionRequired?: boolean;
  isRefreshableClone?: boolean;
  isDisconnectPeer?: boolean;
  backupRetentionPeriodInDays?: number;
  byolComputeCountLimit?: number;
  localAdgAutoFailoverMaxDataLossLimit?: number;
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  customerContactsToSendToOCI?: CustomerContact[];
  scheduledOperations?: ScheduledOperationDetails[];
  longTermBackupSchedule?: LongTermBackupSchedule;
  openMode?: OpenMode;
  permissionLevel?: PermissionLevel;
  refreshableMode?: RefreshableMode;
  privateEndpointIp?: string;
  privateEndpointLabel?: string;
  peerDbId?: string;
  resourcePoolLeaderId?: string;
  resourcePoolSummary?: ResourcePoolSummary;
  standbyAllowlistedIpsSource?: StandbyAllowlistedIpsSource;
  standbyAllowlistedIps?: string[];
  allowlistedIps?: string[];
  autoRefreshFrequencyInSeconds?: number;
  autoRefreshPointLagInSeconds?: number;
  timeOfAutoRefreshStart?: Date;
  encryptionKeyProvider?: EncryptionKeyProviderInput;
  encryptionKeyConfiguration?: EncryptionKeyConfigurationInput;
  adminPasswordSource?: AdminPasswordSource;
  adminPasswordSourceConfiguration?: AdminPasswordSourceConfigurationInput;
}
export const UpdateAutonomousDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    adminPassword: S.optional(SensitiveString),
    computeCount: S.optional(S.Number),
    cpuCoreCount: S.optional(S.Number),
    dataStorageSizeInTBs: S.optional(S.Number),
    dataStorageSizeInGBs: S.optional(S.Number),
    displayName: S.optional(S.String),
    dbName: S.optional(S.String),
    dbVersion: S.optional(S.String),
    dbWorkload: S.optional(DbWorkload),
    dbToolsDetails: S.optional(DatabaseToolList),
    databaseEdition: S.optional(DatabaseEdition),
    licenseModel: S.optional(LicenseModel),
    isAutoScalingEnabled: S.optional(S.Boolean),
    isAutoScalingForStorageEnabled: S.optional(S.Boolean),
    isBackupRetentionLocked: S.optional(S.Boolean),
    isLocalDataGuardEnabled: S.optional(S.Boolean),
    isMtlsConnectionRequired: S.optional(S.Boolean),
    isRefreshableClone: S.optional(S.Boolean),
    isDisconnectPeer: S.optional(S.Boolean),
    backupRetentionPeriodInDays: S.optional(S.Number),
    byolComputeCountLimit: S.optional(S.Number),
    localAdgAutoFailoverMaxDataLossLimit: S.optional(S.Number),
    autonomousMaintenanceScheduleType: S.optional(
      AutonomousMaintenanceScheduleType,
    ),
    customerContactsToSendToOCI: S.optional(CustomerContacts),
    scheduledOperations: S.optional(ScheduledOperationDetailsList),
    longTermBackupSchedule: S.optional(LongTermBackupSchedule),
    openMode: S.optional(OpenMode),
    permissionLevel: S.optional(PermissionLevel),
    refreshableMode: S.optional(RefreshableMode),
    privateEndpointIp: S.optional(S.String),
    privateEndpointLabel: S.optional(S.String),
    peerDbId: S.optional(S.String),
    resourcePoolLeaderId: S.optional(S.String),
    resourcePoolSummary: S.optional(ResourcePoolSummary),
    standbyAllowlistedIpsSource: S.optional(StandbyAllowlistedIpsSource),
    standbyAllowlistedIps: S.optional(StringList),
    allowlistedIps: S.optional(StringList),
    autoRefreshFrequencyInSeconds: S.optional(S.Number),
    autoRefreshPointLagInSeconds: S.optional(S.Number),
    timeOfAutoRefreshStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    encryptionKeyProvider: S.optional(EncryptionKeyProviderInput),
    encryptionKeyConfiguration: S.optional(EncryptionKeyConfigurationInput),
    adminPasswordSource: S.optional(AdminPasswordSource),
    adminPasswordSourceConfiguration: S.optional(
      AdminPasswordSourceConfigurationInput,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAutonomousDatabaseInput",
}) as any as S.Schema<UpdateAutonomousDatabaseInput>;
export interface UpdateAutonomousDatabaseOutput {
  autonomousDatabaseId: string;
  displayName?: string;
  status?: AutonomousDatabaseResourceStatus;
  statusReason?: string;
}
export const UpdateAutonomousDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseId: S.String,
    displayName: S.optional(S.String),
    status: S.optional(AutonomousDatabaseResourceStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAutonomousDatabaseOutput",
}) as any as S.Schema<UpdateAutonomousDatabaseOutput>;
export interface UpdateAutonomousDatabaseBackupInput {
  autonomousDatabaseBackupId: string;
  retentionPeriodInDays?: number;
}
export const UpdateAutonomousDatabaseBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autonomousDatabaseBackupId: S.String.pipe(
      T.HttpLabel("autonomousDatabaseBackupId"),
    ),
    retentionPeriodInDays: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAutonomousDatabaseBackupInput",
}) as any as S.Schema<UpdateAutonomousDatabaseBackupInput>;
export interface UpdateAutonomousDatabaseBackupOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  autonomousDatabaseBackupId: string;
}
export const UpdateAutonomousDatabaseBackupOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      autonomousDatabaseBackupId: S.String,
    }),
).annotate({
  identifier: "UpdateAutonomousDatabaseBackupOutput",
}) as any as S.Schema<UpdateAutonomousDatabaseBackupOutput>;
export interface UpdateCloudExadataInfrastructureInput {
  cloudExadataInfrastructureId: string;
  maintenanceWindow?: MaintenanceWindow;
}
export const UpdateCloudExadataInfrastructureInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      cloudExadataInfrastructureId: S.String.pipe(
        T.HttpLabel("cloudExadataInfrastructureId"),
      ),
      maintenanceWindow: S.optional(MaintenanceWindow),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateCloudExadataInfrastructureInput",
}) as any as S.Schema<UpdateCloudExadataInfrastructureInput>;
export interface UpdateCloudExadataInfrastructureOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  cloudExadataInfrastructureId: string;
}
export const UpdateCloudExadataInfrastructureOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      displayName: S.optional(S.String),
      status: S.optional(ResourceStatus),
      statusReason: S.optional(S.String),
      cloudExadataInfrastructureId: S.String,
    }),
).annotate({
  identifier: "UpdateCloudExadataInfrastructureOutput",
}) as any as S.Schema<UpdateCloudExadataInfrastructureOutput>;
export type UpdateAction =
  | "ROLLING_APPLY"
  | "NON_ROLLING_APPLY"
  | "PRECHECK"
  | "ROLLBACK"
  | (string & {});
export const UpdateAction = S.String;

export interface UpdateExadbVmClusterInput {
  exadbVmClusterId: string;
  dataCollectionOptions?: DataCollectionOptions;
  displayName?: string;
  enabledEcpuCount?: number;
  gridImageId?: string;
  licenseModel?: LicenseModel;
  sshPublicKeys?: string[];
  systemVersion?: string;
  totalEcpuCount?: number;
  updateAction?: UpdateAction;
  vmFileSystemStorageTotalSizeInGBs?: number;
}
export const UpdateExadbVmClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exadbVmClusterId: S.String,
    dataCollectionOptions: S.optional(DataCollectionOptions),
    displayName: S.optional(S.String),
    enabledEcpuCount: S.optional(S.Number),
    gridImageId: S.optional(S.String),
    licenseModel: S.optional(LicenseModel),
    sshPublicKeys: S.optional(StringList),
    systemVersion: S.optional(S.String),
    totalEcpuCount: S.optional(S.Number),
    updateAction: S.optional(UpdateAction),
    vmFileSystemStorageTotalSizeInGBs: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateExadbVmClusterInput",
}) as any as S.Schema<UpdateExadbVmClusterInput>;
export interface UpdateExadbVmClusterOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exadbVmClusterId: string;
}
export const UpdateExadbVmClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    exadbVmClusterId: S.String,
  }),
).annotate({
  identifier: "UpdateExadbVmClusterOutput",
}) as any as S.Schema<UpdateExadbVmClusterOutput>;
export interface UpdateExascaleDbStorageVaultInput {
  exascaleDbStorageVaultId: string;
  additionalFlashCacheInPercent?: number;
  autoscaleLimitInGBs?: number;
  description?: string;
  displayName?: string;
  highCapacityDatabaseStorageTotalSizeInGBs?: number;
  isAutoscaleEnabled?: boolean;
}
export const UpdateExascaleDbStorageVaultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exascaleDbStorageVaultId: S.String,
    additionalFlashCacheInPercent: S.optional(S.Number),
    autoscaleLimitInGBs: S.optional(S.Number),
    description: S.optional(S.String),
    displayName: S.optional(S.String),
    highCapacityDatabaseStorageTotalSizeInGBs: S.optional(S.Number),
    isAutoscaleEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateExascaleDbStorageVaultInput",
}) as any as S.Schema<UpdateExascaleDbStorageVaultInput>;
export interface UpdateExascaleDbStorageVaultOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  exascaleDbStorageVaultId: string;
}
export const UpdateExascaleDbStorageVaultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    exascaleDbStorageVaultId: S.String,
  }),
).annotate({
  identifier: "UpdateExascaleDbStorageVaultOutput",
}) as any as S.Schema<UpdateExascaleDbStorageVaultOutput>;
export interface UpdateOdbNetworkInput {
  odbNetworkId: string;
  displayName?: string;
  peeredCidrsToBeAdded?: string[];
  peeredCidrsToBeRemoved?: string[];
  s3Access?: Access;
  zeroEtlAccess?: Access;
  stsAccess?: Access;
  kmsAccess?: Access;
  s3PolicyDocument?: string;
  stsPolicyDocument?: string;
  kmsPolicyDocument?: string;
  crossRegionS3RestoreSourcesToEnable?: string[];
  crossRegionS3RestoreSourcesToDisable?: string[];
}
export const UpdateOdbNetworkInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbNetworkId: S.String.pipe(T.HttpLabel("odbNetworkId")),
    displayName: S.optional(S.String),
    peeredCidrsToBeAdded: S.optional(StringList),
    peeredCidrsToBeRemoved: S.optional(StringList),
    s3Access: S.optional(Access),
    zeroEtlAccess: S.optional(Access),
    stsAccess: S.optional(Access),
    kmsAccess: S.optional(Access),
    s3PolicyDocument: S.optional(S.String),
    stsPolicyDocument: S.optional(S.String),
    kmsPolicyDocument: S.optional(S.String),
    crossRegionS3RestoreSourcesToEnable: S.optional(StringList),
    crossRegionS3RestoreSourcesToDisable: S.optional(StringList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateOdbNetworkInput",
}) as any as S.Schema<UpdateOdbNetworkInput>;
export interface UpdateOdbNetworkOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbNetworkId: string;
}
export const UpdateOdbNetworkOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbNetworkId: S.String,
  }),
).annotate({
  identifier: "UpdateOdbNetworkOutput",
}) as any as S.Schema<UpdateOdbNetworkOutput>;
export interface UpdateOdbPeeringConnectionInput {
  odbPeeringConnectionId: string;
  displayName?: string;
  peerNetworkCidrsToBeAdded?: string[];
  peerNetworkCidrsToBeRemoved?: string[];
}
export const UpdateOdbPeeringConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    odbPeeringConnectionId: S.String.pipe(
      T.HttpLabel("odbPeeringConnectionId"),
    ),
    displayName: S.optional(S.String),
    peerNetworkCidrsToBeAdded: S.optional(PeeredCidrList),
    peerNetworkCidrsToBeRemoved: S.optional(PeeredCidrList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateOdbPeeringConnectionInput",
}) as any as S.Schema<UpdateOdbPeeringConnectionInput>;
export interface UpdateOdbPeeringConnectionOutput {
  displayName?: string;
  status?: ResourceStatus;
  statusReason?: string;
  odbPeeringConnectionId: string;
}
export const UpdateOdbPeeringConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusReason: S.optional(S.String),
    odbPeeringConnectionId: S.String,
  }),
).annotate({
  identifier: "UpdateOdbPeeringConnectionOutput",
}) as any as S.Schema<UpdateOdbPeeringConnectionOutput>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
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
export type AcceptMarketplaceRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers the Amazon Web Services Marketplace token for your Amazon Web Services account to activate your Oracle Database@Amazon Web Services subscription.
 */
export const acceptMarketplaceRegistration: API.OperationMethod<
  AcceptMarketplaceRegistrationInput,
  AcceptMarketplaceRegistrationOutput,
  AcceptMarketplaceRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptMarketplaceRegistrationInput,
  output: AcceptMarketplaceRegistrationOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptMarketplaceRegistration",
}));

export type AssociateIamRoleToResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Amazon Web Services Identity and Access Management (IAM) service role with a specified resource to enable Amazon Web Services service integration.
 */
export const associateIamRoleToResource: API.OperationMethod<
  AssociateIamRoleToResourceInput,
  AssociateIamRoleToResourceOutput,
  AssociateIamRoleToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateIamRoleToResourceInput,
  output: AssociateIamRoleToResourceOutput,
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
  operationName: "AssociateIamRoleToResource",
}));

export type AssociateVirtualMachinesToExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds virtual machines to the specified Exascale VM cluster.
 */
export const associateVirtualMachinesToExadbVmCluster: API.OperationMethod<
  AssociateVirtualMachinesToExadbVmClusterInput,
  AssociateVirtualMachinesToExadbVmClusterOutput,
  AssociateVirtualMachinesToExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateVirtualMachinesToExadbVmClusterInput,
  output: AssociateVirtualMachinesToExadbVmClusterOutput,
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
  operationName: "AssociateVirtualMachinesToExadbVmCluster",
}));

export type CreateAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Autonomous Database.
 */
export const createAutonomousDatabase: API.OperationMethod<
  CreateAutonomousDatabaseInput,
  CreateAutonomousDatabaseOutput,
  CreateAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutonomousDatabaseInput,
  output: CreateAutonomousDatabaseOutput,
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
  operationName: "CreateAutonomousDatabase",
}));

export type CreateAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new backup of the specified Autonomous Database.
 */
export const createAutonomousDatabaseBackup: API.OperationMethod<
  CreateAutonomousDatabaseBackupInput,
  CreateAutonomousDatabaseBackupOutput,
  CreateAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutonomousDatabaseBackupInput,
  output: CreateAutonomousDatabaseBackupOutput,
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
  operationName: "CreateAutonomousDatabaseBackup",
}));

export type CreateAutonomousDatabaseWalletError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new wallet for the specified Autonomous Database.
 */
export const createAutonomousDatabaseWallet: API.OperationMethod<
  CreateAutonomousDatabaseWalletInput,
  CreateAutonomousDatabaseWalletOutput,
  CreateAutonomousDatabaseWalletError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutonomousDatabaseWalletInput,
  output: CreateAutonomousDatabaseWalletOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutonomousDatabaseWallet",
}));

export type CreateCloudAutonomousVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Autonomous VM cluster in the specified Exadata infrastructure.
 */
export const createCloudAutonomousVmCluster: API.OperationMethod<
  CreateCloudAutonomousVmClusterInput,
  CreateCloudAutonomousVmClusterOutput,
  CreateCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudAutonomousVmClusterInput,
  output: CreateCloudAutonomousVmClusterOutput,
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
  operationName: "CreateCloudAutonomousVmCluster",
}));

export type CreateCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exadata infrastructure.
 */
export const createCloudExadataInfrastructure: API.OperationMethod<
  CreateCloudExadataInfrastructureInput,
  CreateCloudExadataInfrastructureOutput,
  CreateCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudExadataInfrastructureInput,
  output: CreateCloudExadataInfrastructureOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudExadataInfrastructure",
}));

export type CreateCloudVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VM cluster on the specified Exadata infrastructure.
 */
export const createCloudVmCluster: API.OperationMethod<
  CreateCloudVmClusterInput,
  CreateCloudVmClusterOutput,
  CreateCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudVmClusterInput,
  output: CreateCloudVmClusterOutput,
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
  operationName: "CreateCloudVmCluster",
}));

export type CreateExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exascale VM cluster.
 */
export const createExadbVmCluster: API.OperationMethod<
  CreateExadbVmClusterInput,
  CreateExadbVmClusterOutput,
  CreateExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExadbVmClusterInput,
  output: CreateExadbVmClusterOutput,
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
  operationName: "CreateExadbVmCluster",
}));

export type CreateExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Exascale storage vault.
 */
export const createExascaleDbStorageVault: API.OperationMethod<
  CreateExascaleDbStorageVaultInput,
  CreateExascaleDbStorageVaultOutput,
  CreateExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExascaleDbStorageVaultInput,
  output: CreateExascaleDbStorageVaultOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExascaleDbStorageVault",
}));

export type CreateOdbNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ODB network.
 */
export const createOdbNetwork: API.OperationMethod<
  CreateOdbNetworkInput,
  CreateOdbNetworkOutput,
  CreateOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOdbNetworkInput,
  output: CreateOdbNetworkOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOdbNetwork",
}));

export type CreateOdbPeeringConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a peering connection between an ODB network and a VPC.
 *
 * A peering connection enables private connectivity between the networks for application-tier communication.
 */
export const createOdbPeeringConnection: API.OperationMethod<
  CreateOdbPeeringConnectionInput,
  CreateOdbPeeringConnectionOutput,
  CreateOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOdbPeeringConnectionInput,
  output: CreateOdbPeeringConnectionOutput,
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
  operationName: "CreateOdbPeeringConnection",
}));

export type DeleteAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Autonomous Database.
 */
export const deleteAutonomousDatabase: API.OperationMethod<
  DeleteAutonomousDatabaseInput,
  DeleteAutonomousDatabaseOutput,
  DeleteAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutonomousDatabaseInput,
  output: DeleteAutonomousDatabaseOutput,
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
  operationName: "DeleteAutonomousDatabase",
}));

export type DeleteAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Autonomous Database backup.
 */
export const deleteAutonomousDatabaseBackup: API.OperationMethod<
  DeleteAutonomousDatabaseBackupInput,
  DeleteAutonomousDatabaseBackupOutput,
  DeleteAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutonomousDatabaseBackupInput,
  output: DeleteAutonomousDatabaseBackupOutput,
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
  operationName: "DeleteAutonomousDatabaseBackup",
}));

export type DeleteCloudAutonomousVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Autonomous VM cluster.
 */
export const deleteCloudAutonomousVmCluster: API.OperationMethod<
  DeleteCloudAutonomousVmClusterInput,
  DeleteCloudAutonomousVmClusterOutput,
  DeleteCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudAutonomousVmClusterInput,
  output: DeleteCloudAutonomousVmClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudAutonomousVmCluster",
}));

export type DeleteCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exadata infrastructure. Before you use this operation, make sure to delete all of the VM clusters that are hosted on this Exadata infrastructure.
 */
export const deleteCloudExadataInfrastructure: API.OperationMethod<
  DeleteCloudExadataInfrastructureInput,
  DeleteCloudExadataInfrastructureOutput,
  DeleteCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudExadataInfrastructureInput,
  output: DeleteCloudExadataInfrastructureOutput,
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
  operationName: "DeleteCloudExadataInfrastructure",
}));

export type DeleteCloudVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified VM cluster.
 */
export const deleteCloudVmCluster: API.OperationMethod<
  DeleteCloudVmClusterInput,
  DeleteCloudVmClusterOutput,
  DeleteCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudVmClusterInput,
  output: DeleteCloudVmClusterOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudVmCluster",
}));

export type DeleteExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exascale VM cluster.
 */
export const deleteExadbVmCluster: API.OperationMethod<
  DeleteExadbVmClusterInput,
  DeleteExadbVmClusterOutput,
  DeleteExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExadbVmClusterInput,
  output: DeleteExadbVmClusterOutput,
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
  operationName: "DeleteExadbVmCluster",
}));

export type DeleteExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Exascale storage vault.
 */
export const deleteExascaleDbStorageVault: API.OperationMethod<
  DeleteExascaleDbStorageVaultInput,
  DeleteExascaleDbStorageVaultOutput,
  DeleteExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExascaleDbStorageVaultInput,
  output: DeleteExascaleDbStorageVaultOutput,
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
  operationName: "DeleteExascaleDbStorageVault",
}));

export type DeleteOdbNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified ODB network.
 */
export const deleteOdbNetwork: API.OperationMethod<
  DeleteOdbNetworkInput,
  DeleteOdbNetworkOutput,
  DeleteOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOdbNetworkInput,
  output: DeleteOdbNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOdbNetwork",
}));

export type DeleteOdbPeeringConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ODB peering connection.
 *
 * When you delete an ODB peering connection, the underlying VPC peering connection is also deleted.
 */
export const deleteOdbPeeringConnection: API.OperationMethod<
  DeleteOdbPeeringConnectionInput,
  DeleteOdbPeeringConnectionOutput,
  DeleteOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOdbPeeringConnectionInput,
  output: DeleteOdbPeeringConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOdbPeeringConnection",
}));

export type DisassociateIamRoleFromResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Amazon Web Services Identity and Access Management (IAM) service role from a specified resource to disable Amazon Web Services service integration.
 */
export const disassociateIamRoleFromResource: API.OperationMethod<
  DisassociateIamRoleFromResourceInput,
  DisassociateIamRoleFromResourceOutput,
  DisassociateIamRoleFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateIamRoleFromResourceInput,
  output: DisassociateIamRoleFromResourceOutput,
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
  operationName: "DisassociateIamRoleFromResource",
}));

export type DisassociateVirtualMachinesFromExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes virtual machines from the specified Exascale VM cluster.
 */
export const disassociateVirtualMachinesFromExadbVmCluster: API.OperationMethod<
  DisassociateVirtualMachinesFromExadbVmClusterInput,
  DisassociateVirtualMachinesFromExadbVmClusterOutput,
  DisassociateVirtualMachinesFromExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateVirtualMachinesFromExadbVmClusterInput,
  output: DisassociateVirtualMachinesFromExadbVmClusterOutput,
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
  operationName: "DisassociateVirtualMachinesFromExadbVmCluster",
}));

export type FailoverAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a failover of the specified Autonomous Database to a standby peer database.
 */
export const failoverAutonomousDatabase: API.OperationMethod<
  FailoverAutonomousDatabaseInput,
  FailoverAutonomousDatabaseOutput,
  FailoverAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FailoverAutonomousDatabaseInput,
  output: FailoverAutonomousDatabaseOutput,
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
  operationName: "FailoverAutonomousDatabase",
}));

export type GetAutonomousDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous Database.
 */
export const getAutonomousDatabase: API.OperationMethod<
  GetAutonomousDatabaseInput,
  GetAutonomousDatabaseOutput,
  GetAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutonomousDatabaseInput,
  output: GetAutonomousDatabaseOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabase",
}));

export type GetAutonomousDatabaseBackupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous Database backup.
 */
export const getAutonomousDatabaseBackup: API.OperationMethod<
  GetAutonomousDatabaseBackupInput,
  GetAutonomousDatabaseBackupOutput,
  GetAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutonomousDatabaseBackupInput,
  output: GetAutonomousDatabaseBackupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabaseBackup",
}));

export type GetAutonomousDatabaseWalletDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the wallet details for the specified Autonomous Database.
 */
export const getAutonomousDatabaseWalletDetails: API.OperationMethod<
  GetAutonomousDatabaseWalletDetailsInput,
  GetAutonomousDatabaseWalletDetailsOutput,
  GetAutonomousDatabaseWalletDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutonomousDatabaseWalletDetailsInput,
  output: GetAutonomousDatabaseWalletDetailsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutonomousDatabaseWalletDetails",
}));

export type GetCloudAutonomousVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific Autonomous VM cluster.
 */
export const getCloudAutonomousVmCluster: API.OperationMethod<
  GetCloudAutonomousVmClusterInput,
  GetCloudAutonomousVmClusterOutput,
  GetCloudAutonomousVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudAutonomousVmClusterInput,
  output: GetCloudAutonomousVmClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudAutonomousVmCluster",
}));

export type GetCloudExadataInfrastructureError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exadata infrastructure.
 */
export const getCloudExadataInfrastructure: API.OperationMethod<
  GetCloudExadataInfrastructureInput,
  GetCloudExadataInfrastructureOutput,
  GetCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudExadataInfrastructureInput,
  output: GetCloudExadataInfrastructureOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudExadataInfrastructure",
}));

export type GetCloudExadataInfrastructureUnallocatedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about unallocated resources in a specified Cloud Exadata Infrastructure.
 */
export const getCloudExadataInfrastructureUnallocatedResources: API.OperationMethod<
  GetCloudExadataInfrastructureUnallocatedResourcesInput,
  GetCloudExadataInfrastructureUnallocatedResourcesOutput,
  GetCloudExadataInfrastructureUnallocatedResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudExadataInfrastructureUnallocatedResourcesInput,
  output: GetCloudExadataInfrastructureUnallocatedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudExadataInfrastructureUnallocatedResources",
}));

export type GetCloudVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified VM cluster.
 */
export const getCloudVmCluster: API.OperationMethod<
  GetCloudVmClusterInput,
  GetCloudVmClusterOutput,
  GetCloudVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudVmClusterInput,
  output: GetCloudVmClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudVmCluster",
}));

export type GetDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified DB node.
 */
export const getDbNode: API.OperationMethod<
  GetDbNodeInput,
  GetDbNodeOutput,
  GetDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbNodeInput,
  output: GetDbNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbNode",
}));

export type GetDbServerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified database server.
 */
export const getDbServer: API.OperationMethod<
  GetDbServerInput,
  GetDbServerOutput,
  GetDbServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDbServerInput,
  output: GetDbServerOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDbServer",
}));

export type GetExadbVmClusterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exascale VM cluster.
 */
export const getExadbVmCluster: API.OperationMethod<
  GetExadbVmClusterInput,
  GetExadbVmClusterOutput,
  GetExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExadbVmClusterInput,
  output: GetExadbVmClusterOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExadbVmCluster",
}));

export type GetExascaleDbStorageVaultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified Exascale storage vault.
 */
export const getExascaleDbStorageVault: API.OperationMethod<
  GetExascaleDbStorageVaultInput,
  GetExascaleDbStorageVaultOutput,
  GetExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExascaleDbStorageVaultInput,
  output: GetExascaleDbStorageVaultOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExascaleDbStorageVault",
}));

export type GetOciOnboardingStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tenancy activation link and onboarding status for your Amazon Web Services account.
 */
export const getOciOnboardingStatus: API.OperationMethod<
  GetOciOnboardingStatusInput,
  GetOciOnboardingStatusOutput,
  GetOciOnboardingStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOciOnboardingStatusInput,
  output: GetOciOnboardingStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOciOnboardingStatus",
}));

export type GetOdbNetworkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the specified ODB network.
 */
export const getOdbNetwork: API.OperationMethod<
  GetOdbNetworkInput,
  GetOdbNetworkOutput,
  GetOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOdbNetworkInput,
  output: GetOdbNetworkOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOdbNetwork",
}));

export type GetOdbPeeringConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an ODB peering connection.
 */
export const getOdbPeeringConnection: API.OperationMethod<
  GetOdbPeeringConnectionInput,
  GetOdbPeeringConnectionOutput,
  GetOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOdbPeeringConnectionInput,
  output: GetOdbPeeringConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOdbPeeringConnection",
}));

export type InitializeServiceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initializes the ODB service for the first time in an account.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceInput,
  InitializeServiceOutput,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitializeServiceInput,
  output: InitializeServiceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
}));

export type ListAutonomousDatabaseBackupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the backups of the specified Autonomous Database.
 */
export const listAutonomousDatabaseBackups: API.PaginatedOperationMethod<
  ListAutonomousDatabaseBackupsInput,
  ListAutonomousDatabaseBackupsOutput,
  ListAutonomousDatabaseBackupsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseBackupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabaseBackupsInput,
  output: ListAutonomousDatabaseBackupsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseBackups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseBackups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseCharacterSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available character sets for Autonomous Databases.
 */
export const listAutonomousDatabaseCharacterSets: API.PaginatedOperationMethod<
  ListAutonomousDatabaseCharacterSetsInput,
  ListAutonomousDatabaseCharacterSetsOutput,
  ListAutonomousDatabaseCharacterSetsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseCharacterSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabaseCharacterSetsInput,
  output: ListAutonomousDatabaseCharacterSetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseCharacterSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseCharacterSets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseClonesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the clones of the specified Autonomous Database.
 */
export const listAutonomousDatabaseClones: API.PaginatedOperationMethod<
  ListAutonomousDatabaseClonesInput,
  ListAutonomousDatabaseClonesOutput,
  ListAutonomousDatabaseClonesError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabaseClonesInput,
  output: ListAutonomousDatabaseClonesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseClones",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseClones",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabasePeersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the peer databases of the specified Autonomous Database.
 */
export const listAutonomousDatabasePeers: API.PaginatedOperationMethod<
  ListAutonomousDatabasePeersInput,
  ListAutonomousDatabasePeersOutput,
  ListAutonomousDatabasePeersError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabasePeerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabasePeersInput,
  output: ListAutonomousDatabasePeersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabasePeers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabasePeers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabasesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Autonomous Databases owned by your Amazon Web Services account in the current Amazon Web Services Region.
 */
export const listAutonomousDatabases: API.PaginatedOperationMethod<
  ListAutonomousDatabasesInput,
  ListAutonomousDatabasesOutput,
  ListAutonomousDatabasesError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabasesInput,
  output: ListAutonomousDatabasesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousDatabaseVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available Oracle Database software versions for Autonomous Databases.
 */
export const listAutonomousDatabaseVersions: API.PaginatedOperationMethod<
  ListAutonomousDatabaseVersionsInput,
  ListAutonomousDatabaseVersionsOutput,
  ListAutonomousDatabaseVersionsError,
  Credentials | HttpClient.HttpClient,
  AutonomousDatabaseVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousDatabaseVersionsInput,
  output: ListAutonomousDatabaseVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousDatabaseVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousDatabaseVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutonomousVirtualMachinesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Autonomous VMs in an Autonomous VM cluster.
 */
export const listAutonomousVirtualMachines: API.PaginatedOperationMethod<
  ListAutonomousVirtualMachinesInput,
  ListAutonomousVirtualMachinesOutput,
  ListAutonomousVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  AutonomousVirtualMachineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutonomousVirtualMachinesInput,
  output: ListAutonomousVirtualMachinesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutonomousVirtualMachines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "autonomousVirtualMachines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudAutonomousVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Autonomous VM clusters in a specified Cloud Exadata infrastructure.
 */
export const listCloudAutonomousVmClusters: API.PaginatedOperationMethod<
  ListCloudAutonomousVmClustersInput,
  ListCloudAutonomousVmClustersOutput,
  ListCloudAutonomousVmClustersError,
  Credentials | HttpClient.HttpClient,
  CloudAutonomousVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudAutonomousVmClustersInput,
  output: ListCloudAutonomousVmClustersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudAutonomousVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudAutonomousVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudExadataInfrastructuresError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exadata infrastructures owned by your Amazon Web Services account.
 */
export const listCloudExadataInfrastructures: API.PaginatedOperationMethod<
  ListCloudExadataInfrastructuresInput,
  ListCloudExadataInfrastructuresOutput,
  ListCloudExadataInfrastructuresError,
  Credentials | HttpClient.HttpClient,
  CloudExadataInfrastructureSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudExadataInfrastructuresInput,
  output: ListCloudExadataInfrastructuresOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudExadataInfrastructures",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudExadataInfrastructures",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCloudVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the VM clusters owned by your Amazon Web Services account or only the ones on the specified Exadata infrastructure.
 */
export const listCloudVmClusters: API.PaginatedOperationMethod<
  ListCloudVmClustersInput,
  ListCloudVmClustersOutput,
  ListCloudVmClustersError,
  Credentials | HttpClient.HttpClient,
  CloudVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudVmClustersInput,
  output: ListCloudVmClustersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cloudVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbNodesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the DB nodes for the specified VM cluster.
 */
export const listDbNodes: API.PaginatedOperationMethod<
  ListDbNodesInput,
  ListDbNodesOutput,
  ListDbNodesError,
  Credentials | HttpClient.HttpClient,
  DbNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbNodesInput,
  output: ListDbNodesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbNodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbServersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the database servers that belong to the specified Exadata infrastructure.
 */
export const listDbServers: API.PaginatedOperationMethod<
  ListDbServersInput,
  ListDbServersOutput,
  ListDbServersError,
  Credentials | HttpClient.HttpClient,
  DbServerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbServersInput,
  output: ListDbServersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbServers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDbSystemShapesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the shapes that are available for an Exadata infrastructure.
 */
export const listDbSystemShapes: API.PaginatedOperationMethod<
  ListDbSystemShapesInput,
  ListDbSystemShapesOutput,
  ListDbSystemShapesError,
  Credentials | HttpClient.HttpClient,
  DbSystemShapeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDbSystemShapesInput,
  output: ListDbSystemShapesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDbSystemShapes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dbSystemShapes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExadbVmClustersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exascale VM clusters owned by your Amazon Web Services account.
 */
export const listExadbVmClusters: API.PaginatedOperationMethod<
  ListExadbVmClustersInput,
  ListExadbVmClustersOutput,
  ListExadbVmClustersError,
  Credentials | HttpClient.HttpClient,
  ExadbVmClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExadbVmClustersInput,
  output: ListExadbVmClustersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExadbVmClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exadbVmClusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExascaleDbStorageVaultsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Exascale storage vaults owned by your Amazon Web Services account.
 */
export const listExascaleDbStorageVaults: API.PaginatedOperationMethod<
  ListExascaleDbStorageVaultsInput,
  ListExascaleDbStorageVaultsOutput,
  ListExascaleDbStorageVaultsError,
  Credentials | HttpClient.HttpClient,
  ExascaleDbStorageVaultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExascaleDbStorageVaultsInput,
  output: ListExascaleDbStorageVaultsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExascaleDbStorageVaults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exascaleDbStorageVaults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGiMinorVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the Oracle Grid Infrastructure (GI) minor versions for the specified major version.
 */
export const listGiMinorVersions: API.PaginatedOperationMethod<
  ListGiMinorVersionsInput,
  ListGiMinorVersionsOutput,
  ListGiMinorVersionsError,
  Credentials | HttpClient.HttpClient,
  GiMinorVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGiMinorVersionsInput,
  output: ListGiMinorVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGiMinorVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "giMinorVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGiVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about Oracle Grid Infrastructure (GI) software versions that are available for a VM cluster for the specified shape.
 */
export const listGiVersions: API.PaginatedOperationMethod<
  ListGiVersionsInput,
  ListGiVersionsOutput,
  ListGiVersionsError,
  Credentials | HttpClient.HttpClient,
  GiVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGiVersionsInput,
  output: ListGiVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGiVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "giVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOdbNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the ODB networks owned by your Amazon Web Services account.
 */
export const listOdbNetworks: API.PaginatedOperationMethod<
  ListOdbNetworksInput,
  ListOdbNetworksOutput,
  ListOdbNetworksError,
  Credentials | HttpClient.HttpClient,
  OdbNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOdbNetworksInput,
  output: ListOdbNetworksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOdbNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "odbNetworks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOdbPeeringConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ODB peering connections or those associated with a specific ODB network.
 */
export const listOdbPeeringConnections: API.PaginatedOperationMethod<
  ListOdbPeeringConnectionsInput,
  ListOdbPeeringConnectionsOutput,
  ListOdbPeeringConnectionsError,
  Credentials | HttpClient.HttpClient,
  OdbPeeringConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOdbPeeringConnectionsInput,
  output: ListOdbPeeringConnectionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOdbPeeringConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "odbPeeringConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the system versions that are available for a VM cluster for the specified `giVersion` and `shape`.
 */
export const listSystemVersions: API.PaginatedOperationMethod<
  ListSystemVersionsInput,
  ListSystemVersionsOutput,
  ListSystemVersionsError,
  Credentials | HttpClient.HttpClient,
  SystemVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSystemVersionsInput,
  output: ListSystemVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystemVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "systemVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Returns information about the tags applied to this resource.
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

export type RebootAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots the specified Autonomous Database.
 */
export const rebootAutonomousDatabase: API.OperationMethod<
  RebootAutonomousDatabaseInput,
  RebootAutonomousDatabaseOutput,
  RebootAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootAutonomousDatabaseInput,
  output: RebootAutonomousDatabaseOutput,
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
  operationName: "RebootAutonomousDatabase",
}));

export type RebootDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reboots the specified DB node in a VM cluster.
 */
export const rebootDbNode: API.OperationMethod<
  RebootDbNodeInput,
  RebootDbNodeOutput,
  RebootDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootDbNodeInput,
  output: RebootDbNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDbNode",
}));

export type RestoreAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores the specified Autonomous Database to a point in time.
 */
export const restoreAutonomousDatabase: API.OperationMethod<
  RestoreAutonomousDatabaseInput,
  RestoreAutonomousDatabaseOutput,
  RestoreAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreAutonomousDatabaseInput,
  output: RestoreAutonomousDatabaseOutput,
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
  operationName: "RestoreAutonomousDatabase",
}));

export type ShrinkAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Shrinks the storage of the specified Autonomous Database to reclaim unused space.
 */
export const shrinkAutonomousDatabase: API.OperationMethod<
  ShrinkAutonomousDatabaseInput,
  ShrinkAutonomousDatabaseOutput,
  ShrinkAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ShrinkAutonomousDatabaseInput,
  output: ShrinkAutonomousDatabaseOutput,
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
  operationName: "ShrinkAutonomousDatabase",
}));

export type StartAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified Autonomous Database.
 */
export const startAutonomousDatabase: API.OperationMethod<
  StartAutonomousDatabaseInput,
  StartAutonomousDatabaseOutput,
  StartAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutonomousDatabaseInput,
  output: StartAutonomousDatabaseOutput,
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
  operationName: "StartAutonomousDatabase",
}));

export type StartDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified DB node in a VM cluster.
 */
export const startDbNode: API.OperationMethod<
  StartDbNodeInput,
  StartDbNodeOutput,
  StartDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDbNodeInput,
  output: StartDbNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDbNode",
}));

export type StopAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified Autonomous Database.
 */
export const stopAutonomousDatabase: API.OperationMethod<
  StopAutonomousDatabaseInput,
  StopAutonomousDatabaseOutput,
  StopAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAutonomousDatabaseInput,
  output: StopAutonomousDatabaseOutput,
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
  operationName: "StopAutonomousDatabase",
}));

export type StopDbNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified DB node in a VM cluster.
 */
export const stopDbNode: API.OperationMethod<
  StopDbNodeInput,
  StopDbNodeOutput,
  StopDbNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDbNodeInput,
  output: StopDbNodeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDbNode",
}));

export type SwitchoverAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Performs a switchover of the specified Autonomous Database to a standby peer database.
 */
export const switchoverAutonomousDatabase: API.OperationMethod<
  SwitchoverAutonomousDatabaseInput,
  SwitchoverAutonomousDatabaseOutput,
  SwitchoverAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SwitchoverAutonomousDatabaseInput,
  output: SwitchoverAutonomousDatabaseOutput,
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
  operationName: "SwitchoverAutonomousDatabase",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Applies tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAutonomousDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Autonomous Database.
 */
export const updateAutonomousDatabase: API.OperationMethod<
  UpdateAutonomousDatabaseInput,
  UpdateAutonomousDatabaseOutput,
  UpdateAutonomousDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutonomousDatabaseInput,
  output: UpdateAutonomousDatabaseOutput,
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
  operationName: "UpdateAutonomousDatabase",
}));

export type UpdateAutonomousDatabaseBackupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Autonomous Database backup.
 */
export const updateAutonomousDatabaseBackup: API.OperationMethod<
  UpdateAutonomousDatabaseBackupInput,
  UpdateAutonomousDatabaseBackupOutput,
  UpdateAutonomousDatabaseBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutonomousDatabaseBackupInput,
  output: UpdateAutonomousDatabaseBackupOutput,
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
  operationName: "UpdateAutonomousDatabaseBackup",
}));

export type UpdateCloudExadataInfrastructureError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the properties of an Exadata infrastructure resource.
 */
export const updateCloudExadataInfrastructure: API.OperationMethod<
  UpdateCloudExadataInfrastructureInput,
  UpdateCloudExadataInfrastructureOutput,
  UpdateCloudExadataInfrastructureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCloudExadataInfrastructureInput,
  output: UpdateCloudExadataInfrastructureOutput,
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
  operationName: "UpdateCloudExadataInfrastructure",
}));

export type UpdateExadbVmClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Exascale VM cluster.
 */
export const updateExadbVmCluster: API.OperationMethod<
  UpdateExadbVmClusterInput,
  UpdateExadbVmClusterOutput,
  UpdateExadbVmClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExadbVmClusterInput,
  output: UpdateExadbVmClusterOutput,
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
  operationName: "UpdateExadbVmCluster",
}));

export type UpdateExascaleDbStorageVaultError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Exascale storage vault.
 */
export const updateExascaleDbStorageVault: API.OperationMethod<
  UpdateExascaleDbStorageVaultInput,
  UpdateExascaleDbStorageVaultOutput,
  UpdateExascaleDbStorageVaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExascaleDbStorageVaultInput,
  output: UpdateExascaleDbStorageVaultOutput,
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
  operationName: "UpdateExascaleDbStorageVault",
}));

export type UpdateOdbNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates properties of a specified ODB network.
 */
export const updateOdbNetwork: API.OperationMethod<
  UpdateOdbNetworkInput,
  UpdateOdbNetworkOutput,
  UpdateOdbNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOdbNetworkInput,
  output: UpdateOdbNetworkOutput,
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
  operationName: "UpdateOdbNetwork",
}));

export type UpdateOdbPeeringConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the settings of an Oracle Database@Amazon Web Services peering connection. You can update the display name and add or remove CIDR blocks from the peering connection.
 */
export const updateOdbPeeringConnection: API.OperationMethod<
  UpdateOdbPeeringConnectionInput,
  UpdateOdbPeeringConnectionOutput,
  UpdateOdbPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOdbPeeringConnectionInput,
  output: UpdateOdbPeeringConnectionOutput,
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
  operationName: "UpdateOdbPeeringConnection",
}));
