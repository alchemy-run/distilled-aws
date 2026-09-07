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
  sdkId: "Redshift Serverless",
  serviceShapeName: "RedshiftServerless",
});
const auth = T.AwsAuthSigv4({ name: "redshift-serverless" });
const ver = T.ServiceVersion("2021-04-21");
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
              `https://redshift-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://redshift-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://redshift-serverless.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DryRunException
  extends /*@__PURE__*/ S.TaggedError<DryRunException>()(
    "DryRunException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(400), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidPaginationException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationException>()(
    "InvalidPaginationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class Ipv6CidrBlockNotFoundException
  extends /*@__PURE__*/ S.TaggedError<Ipv6CidrBlockNotFoundException>()(
    "Ipv6CidrBlockNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
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
      code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ConvertRecoveryPointToSnapshotRequest {
  recoveryPointId: string;
  snapshotName: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export const ConvertRecoveryPointToSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recoveryPointId: S.String,
      snapshotName: S.String,
      retentionPeriod: S.optional(S.Number),
      tags: S.optional(TagList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ConvertRecoveryPointToSnapshotRequest",
}) as any as S.Schema<ConvertRecoveryPointToSnapshotRequest>;
export type SnapshotStatus = string;
export type KmsKeyId = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface Snapshot {
  namespaceName?: string;
  namespaceArn?: string;
  snapshotName?: string;
  snapshotCreateTime?: Date;
  adminUsername?: string;
  status?: string;
  kmsKeyId?: string;
  ownerAccount?: string;
  totalBackupSizeInMegaBytes?: number;
  actualIncrementalBackupSizeInMegaBytes?: number;
  backupProgressInMegaBytes?: number;
  currentBackupRateInMegaBytesPerSecond?: number;
  estimatedSecondsToCompletion?: number;
  elapsedTimeInSeconds?: number;
  snapshotRetentionPeriod?: number;
  snapshotRemainingDays?: number;
  snapshotRetentionStartTime?: Date;
  snapshotArn?: string;
  accountsWithRestoreAccess?: string[];
  accountsWithProvisionedRestoreAccess?: string[];
  adminPasswordSecretArn?: string;
  adminPasswordSecretKmsKeyId?: string;
}
export const Snapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.optional(S.String),
    namespaceArn: S.optional(S.String),
    snapshotName: S.optional(S.String),
    snapshotCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    adminUsername: S.optional(S.String),
    status: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    totalBackupSizeInMegaBytes: S.optional(S.Number),
    actualIncrementalBackupSizeInMegaBytes: S.optional(S.Number),
    backupProgressInMegaBytes: S.optional(S.Number),
    currentBackupRateInMegaBytesPerSecond: S.optional(S.Number),
    estimatedSecondsToCompletion: S.optional(S.Number),
    elapsedTimeInSeconds: S.optional(S.Number),
    snapshotRetentionPeriod: S.optional(S.Number),
    snapshotRemainingDays: S.optional(S.Number),
    snapshotRetentionStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    snapshotArn: S.optional(S.String),
    accountsWithRestoreAccess: S.optional(AccountIdList),
    accountsWithProvisionedRestoreAccess: S.optional(AccountIdList),
    adminPasswordSecretArn: S.optional(S.String),
    adminPasswordSecretKmsKeyId: S.optional(S.String),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export interface ConvertRecoveryPointToSnapshotResponse {
  snapshot?: Snapshot;
}
export const ConvertRecoveryPointToSnapshotResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "ConvertRecoveryPointToSnapshotResponse",
}) as any as S.Schema<ConvertRecoveryPointToSnapshotResponse>;
export type WorkgroupName = string;
export type CustomDomainName = string;
export type CustomDomainCertificateArnString = string;
export interface CreateCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
  customDomainCertificateArn: string;
}
export const CreateCustomDomainAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      workgroupName: S.String,
      customDomainName: S.String,
      customDomainCertificateArn: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateCustomDomainAssociationRequest",
}) as any as S.Schema<CreateCustomDomainAssociationRequest>;
export interface CreateCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export const CreateCustomDomainAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      customDomainName: S.optional(S.String),
      workgroupName: S.optional(S.String),
      customDomainCertificateArn: S.optional(S.String),
      customDomainCertificateExpiryTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "CreateCustomDomainAssociationResponse",
}) as any as S.Schema<CreateCustomDomainAssociationResponse>;
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type VpcSecurityGroupId = string;
export type VpcSecurityGroupIdList = string[];
export const VpcSecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type OwnerAccount = string;
export interface CreateEndpointAccessRequest {
  endpointName: string;
  subnetIds: string[];
  workgroupName: string;
  vpcSecurityGroupIds?: string[];
  ownerAccount?: string;
}
export const CreateEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointName: S.String,
    subnetIds: SubnetIdList,
    workgroupName: S.String,
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    ownerAccount: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEndpointAccessRequest",
}) as any as S.Schema<CreateEndpointAccessRequest>;
export interface VpcSecurityGroupMembership {
  vpcSecurityGroupId?: string;
  status?: string;
}
export const VpcSecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcSecurityGroupId: S.optional(S.String),
    status: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcSecurityGroupMembership",
}) as any as S.Schema<VpcSecurityGroupMembership>;
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export const VpcSecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  VpcSecurityGroupMembership,
);
export interface NetworkInterface {
  networkInterfaceId?: string;
  subnetId?: string;
  privateIpAddress?: string;
  availabilityZone?: string;
  ipv6Address?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkInterfaceId: S.optional(S.String),
    subnetId: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    ipv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaceList = NetworkInterface[];
export const NetworkInterfaceList = /*@__PURE__*/ S.Array(NetworkInterface);
export interface VpcEndpoint {
  vpcEndpointId?: string;
  vpcId?: string;
  networkInterfaces?: NetworkInterface[];
}
export const VpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcEndpointId: S.optional(S.String),
    vpcId: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({ identifier: "VpcEndpoint" }) as any as S.Schema<VpcEndpoint>;
export interface EndpointAccess {
  endpointName?: string;
  endpointStatus?: string;
  workgroupName?: string;
  endpointCreateTime?: Date;
  port?: number;
  address?: string;
  subnetIds?: string[];
  vpcSecurityGroups?: VpcSecurityGroupMembership[];
  vpcEndpoint?: VpcEndpoint;
  endpointArn?: string;
}
export const EndpointAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointName: S.optional(S.String),
    endpointStatus: S.optional(S.String),
    workgroupName: S.optional(S.String),
    endpointCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    port: S.optional(S.Number),
    address: S.optional(S.String),
    subnetIds: S.optional(SubnetIdList),
    vpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    vpcEndpoint: S.optional(VpcEndpoint),
    endpointArn: S.optional(S.String),
  }),
).annotate({ identifier: "EndpointAccess" }) as any as S.Schema<EndpointAccess>;
export interface CreateEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export const CreateEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.optional(EndpointAccess) }),
).annotate({
  identifier: "CreateEndpointAccessResponse",
}) as any as S.Schema<CreateEndpointAccessResponse>;
export type NamespaceName = string;
export type DbUser = string | redacted.Redacted<string>;
export type DbPassword = string | redacted.Redacted<string>;
export type IamRoleArn = string;
export type IamRoleArnList = string[];
export const IamRoleArnList = /*@__PURE__*/ S.Array(S.String);
export type LogExport = string;
export type LogExportList = string[];
export const LogExportList = /*@__PURE__*/ S.Array(S.String);
export type RedshiftIdcApplicationArn = string;
export interface CreateNamespaceRequest {
  namespaceName: string;
  adminUsername?: string | redacted.Redacted<string>;
  adminUserPassword?: string | redacted.Redacted<string>;
  dbName?: string;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  tags?: Tag[];
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  redshiftIdcApplicationArn?: string;
}
export const CreateNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    adminUsername: S.optional(SensitiveString),
    adminUserPassword: S.optional(SensitiveString),
    dbName: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    defaultIamRoleArn: S.optional(S.String),
    iamRoles: S.optional(IamRoleArnList),
    logExports: S.optional(LogExportList),
    tags: S.optional(TagList),
    manageAdminPassword: S.optional(S.Boolean),
    adminPasswordSecretKmsKeyId: S.optional(S.String),
    redshiftIdcApplicationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateNamespaceRequest",
}) as any as S.Schema<CreateNamespaceRequest>;
export type NamespaceStatus = string;
export type S3TableName = string;
export type S3TableNameList = string[];
export const S3TableNameList = /*@__PURE__*/ S.Array(S.String);
export type S3TableGranularity = string;
export type S3TableLastIngestionTimeMap = { [key: string]: string | undefined };
export const S3TableLastIngestionTimeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface S3TablePublishStatus {
  s3Tables?: string[];
  s3TableNamespace?: string;
  s3TableGranularity?: string;
  enabledAll?: boolean;
  lastIngestionTimes?: { [key: string]: string | undefined };
}
export const S3TablePublishStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Tables: S.optional(S3TableNameList),
    s3TableNamespace: S.optional(S.String),
    s3TableGranularity: S.optional(S.String),
    enabledAll: S.optional(S.Boolean),
    lastIngestionTimes: S.optional(S3TableLastIngestionTimeMap),
  }),
).annotate({
  identifier: "S3TablePublishStatus",
}) as any as S.Schema<S3TablePublishStatus>;
export interface Namespace {
  namespaceArn?: string;
  namespaceId?: string;
  namespaceName?: string;
  adminUsername?: string | redacted.Redacted<string>;
  dbName?: string;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  status?: string;
  creationDate?: Date;
  adminPasswordSecretArn?: string;
  adminPasswordSecretKmsKeyId?: string;
  lakehouseRegistrationStatus?: string;
  catalogArn?: string;
  s3TablePublishStatus?: S3TablePublishStatus;
}
export const Namespace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceArn: S.optional(S.String),
    namespaceId: S.optional(S.String),
    namespaceName: S.optional(S.String),
    adminUsername: S.optional(SensitiveString),
    dbName: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    defaultIamRoleArn: S.optional(S.String),
    iamRoles: S.optional(IamRoleArnList),
    logExports: S.optional(LogExportList),
    status: S.optional(S.String),
    creationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    adminPasswordSecretArn: S.optional(S.String),
    adminPasswordSecretKmsKeyId: S.optional(S.String),
    lakehouseRegistrationStatus: S.optional(S.String),
    catalogArn: S.optional(S.String),
    s3TablePublishStatus: S.optional(S3TablePublishStatus),
  }),
).annotate({ identifier: "Namespace" }) as any as S.Schema<Namespace>;
export interface CreateNamespaceResponse {
  namespace?: Namespace;
}
export const CreateNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.optional(Namespace) }),
).annotate({
  identifier: "CreateNamespaceResponse",
}) as any as S.Schema<CreateNamespaceResponse>;
export type Capacity = number;
export type OfferingId = string;
export interface CreateReservationRequest {
  capacity: number;
  offeringId: string;
  clientToken?: string;
}
export const CreateReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.Number,
    offeringId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateReservationRequest",
}) as any as S.Schema<CreateReservationRequest>;
export type ReservationId = string;
export type ReservationArn = string;
export type Duration = number;
export type Charge = number;
export type CurrencyCode = string;
export type OfferingType = string;
export interface ReservationOffering {
  offeringId?: string;
  duration?: number;
  upfrontCharge?: number;
  hourlyCharge?: number;
  currencyCode?: string;
  offeringType?: string;
}
export const ReservationOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringId: S.optional(S.String),
    duration: S.optional(S.Number),
    upfrontCharge: S.optional(S.Number),
    hourlyCharge: S.optional(S.Number),
    currencyCode: S.optional(S.String),
    offeringType: S.optional(S.String),
  }),
).annotate({
  identifier: "ReservationOffering",
}) as any as S.Schema<ReservationOffering>;
export type Status = string;
export interface Reservation {
  reservationId?: string;
  reservationArn?: string;
  startDate?: Date;
  endDate?: Date;
  capacity?: number;
  offering?: ReservationOffering;
  status?: string;
}
export const Reservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationId: S.optional(S.String),
    reservationArn: S.optional(S.String),
    startDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    capacity: S.optional(S.Number),
    offering: S.optional(ReservationOffering),
    status: S.optional(S.String),
  }),
).annotate({ identifier: "Reservation" }) as any as S.Schema<Reservation>;
export interface CreateReservationResponse {
  reservation?: Reservation;
}
export const CreateReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reservation: S.optional(Reservation) }),
).annotate({
  identifier: "CreateReservationResponse",
}) as any as S.Schema<CreateReservationResponse>;
export type ScheduledActionName = string;
export type SnapshotNamePrefix = string;
export interface CreateSnapshotScheduleActionParameters {
  namespaceName: string;
  snapshotNamePrefix: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export const CreateSnapshotScheduleActionParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaceName: S.String,
      snapshotNamePrefix: S.String,
      retentionPeriod: S.optional(S.Number),
      tags: S.optional(TagList),
    }),
).annotate({
  identifier: "CreateSnapshotScheduleActionParameters",
}) as any as S.Schema<CreateSnapshotScheduleActionParameters>;
export type TargetAction = {
  createSnapshot: CreateSnapshotScheduleActionParameters;
};
export const TargetAction = /*@__PURE__*/ S.Union([
  S.Struct({ createSnapshot: CreateSnapshotScheduleActionParameters }),
]);
export type Schedule =
  | { at: Date; cron?: never }
  | { at?: never; cron: string };
export const Schedule = /*@__PURE__*/ S.Union([
  S.Struct({ at: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
  S.Struct({ cron: S.String }),
]);
export interface CreateScheduledActionRequest {
  scheduledActionName: string;
  targetAction: TargetAction;
  schedule: Schedule;
  roleArn: string;
  namespaceName: string;
  enabled?: boolean;
  scheduledActionDescription?: string;
  startTime?: Date;
  endTime?: Date;
}
export const CreateScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledActionName: S.String,
    targetAction: TargetAction,
    schedule: Schedule,
    roleArn: S.String,
    namespaceName: S.String,
    enabled: S.optional(S.Boolean),
    scheduledActionDescription: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateScheduledActionRequest",
}) as any as S.Schema<CreateScheduledActionRequest>;
export type NextInvocationsList = Date[];
export const NextInvocationsList = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type State = string;
export interface ScheduledActionResponse {
  scheduledActionName?: string;
  schedule?: Schedule;
  scheduledActionDescription?: string;
  nextInvocations?: Date[];
  roleArn?: string;
  state?: string;
  startTime?: Date;
  endTime?: Date;
  targetAction?: TargetAction;
  namespaceName?: string;
  scheduledActionUuid?: string;
}
export const ScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledActionName: S.optional(S.String),
    schedule: S.optional(Schedule),
    scheduledActionDescription: S.optional(S.String),
    nextInvocations: S.optional(NextInvocationsList),
    roleArn: S.optional(S.String),
    state: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    targetAction: S.optional(TargetAction),
    namespaceName: S.optional(S.String),
    scheduledActionUuid: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledActionResponse",
}) as any as S.Schema<ScheduledActionResponse>;
export interface CreateScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export const CreateScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAction: S.optional(ScheduledActionResponse) }),
).annotate({
  identifier: "CreateScheduledActionResponse",
}) as any as S.Schema<CreateScheduledActionResponse>;
export interface CreateSnapshotRequest {
  namespaceName: string;
  snapshotName: string;
  retentionPeriod?: number;
  tags?: Tag[];
}
export const CreateSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    snapshotName: S.String,
    retentionPeriod: S.optional(S.Number),
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSnapshotRequest",
}) as any as S.Schema<CreateSnapshotRequest>;
export interface CreateSnapshotResponse {
  snapshot?: Snapshot;
}
export const CreateSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "CreateSnapshotResponse",
}) as any as S.Schema<CreateSnapshotResponse>;
export interface CreateSnapshotCopyConfigurationRequest {
  namespaceName: string;
  destinationRegion: string;
  snapshotRetentionPeriod?: number;
  destinationKmsKeyId?: string;
}
export const CreateSnapshotCopyConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaceName: S.String,
      destinationRegion: S.String,
      snapshotRetentionPeriod: S.optional(S.Number),
      destinationKmsKeyId: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateSnapshotCopyConfigurationRequest",
}) as any as S.Schema<CreateSnapshotCopyConfigurationRequest>;
export interface SnapshotCopyConfiguration {
  snapshotCopyConfigurationId?: string;
  snapshotCopyConfigurationArn?: string;
  namespaceName?: string;
  destinationRegion?: string;
  snapshotRetentionPeriod?: number;
  destinationKmsKeyId?: string;
}
export const SnapshotCopyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotCopyConfigurationId: S.optional(S.String),
    snapshotCopyConfigurationArn: S.optional(S.String),
    namespaceName: S.optional(S.String),
    destinationRegion: S.optional(S.String),
    snapshotRetentionPeriod: S.optional(S.Number),
    destinationKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "SnapshotCopyConfiguration",
}) as any as S.Schema<SnapshotCopyConfiguration>;
export interface CreateSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export const CreateSnapshotCopyConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ snapshotCopyConfiguration: SnapshotCopyConfiguration }),
).annotate({
  identifier: "CreateSnapshotCopyConfigurationResponse",
}) as any as S.Schema<CreateSnapshotCopyConfigurationResponse>;
export type UsageLimitUsageType = string;
export type UsageLimitPeriod = string;
export type UsageLimitBreachAction = string;
export interface CreateUsageLimitRequest {
  resourceArn: string;
  usageType: string;
  amount: number;
  period?: string;
  breachAction?: string;
}
export const CreateUsageLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    usageType: S.String,
    amount: S.Number,
    period: S.optional(S.String),
    breachAction: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUsageLimitRequest",
}) as any as S.Schema<CreateUsageLimitRequest>;
export interface UsageLimit {
  usageLimitId?: string;
  usageLimitArn?: string;
  resourceArn?: string;
  usageType?: string;
  amount?: number;
  period?: string;
  breachAction?: string;
}
export const UsageLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageLimitId: S.optional(S.String),
    usageLimitArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    usageType: S.optional(S.String),
    amount: S.optional(S.Number),
    period: S.optional(S.String),
    breachAction: S.optional(S.String),
  }),
).annotate({ identifier: "UsageLimit" }) as any as S.Schema<UsageLimit>;
export interface CreateUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export const CreateUsageLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimit: S.optional(UsageLimit) }),
).annotate({
  identifier: "CreateUsageLimitResponse",
}) as any as S.Schema<CreateUsageLimitResponse>;
export type ParameterKey = string;
export type ParameterValue = string;
export interface ConfigParameter {
  parameterKey?: string;
  parameterValue?: string;
}
export const ConfigParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parameterKey: S.optional(S.String),
    parameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigParameter",
}) as any as S.Schema<ConfigParameter>;
export type ConfigParameterList = ConfigParameter[];
export const ConfigParameterList = /*@__PURE__*/ S.Array(ConfigParameter);
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type PerformanceTargetStatus = string;
export interface PerformanceTarget {
  status?: string;
  level?: number;
}
export const PerformanceTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(S.String), level: S.optional(S.Number) }),
).annotate({
  identifier: "PerformanceTarget",
}) as any as S.Schema<PerformanceTarget>;
export type IpAddressType = string;
export type TrackName = string;
export interface CreateWorkgroupRequest {
  workgroupName: string;
  namespaceName: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  securityGroupIds?: string[];
  subnetIds?: string[];
  publiclyAccessible?: boolean;
  tags?: Tag[];
  port?: number;
  maxCapacity?: number;
  pricePerformanceTarget?: PerformanceTarget;
  ipAddressType?: string;
  trackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export const CreateWorkgroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workgroupName: S.String,
    namespaceName: S.String,
    baseCapacity: S.optional(S.Number),
    enhancedVpcRouting: S.optional(S.Boolean),
    configParameters: S.optional(ConfigParameterList),
    securityGroupIds: S.optional(SecurityGroupIdList),
    subnetIds: S.optional(SubnetIdList),
    publiclyAccessible: S.optional(S.Boolean),
    tags: S.optional(TagList),
    port: S.optional(S.Number),
    maxCapacity: S.optional(S.Number),
    pricePerformanceTarget: S.optional(PerformanceTarget),
    ipAddressType: S.optional(S.String),
    trackName: S.optional(S.String),
    extraComputeForAutomaticOptimization: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWorkgroupRequest",
}) as any as S.Schema<CreateWorkgroupRequest>;
export type WorkgroupStatus = string;
export type VpcEndpointList = VpcEndpoint[];
export const VpcEndpointList = /*@__PURE__*/ S.Array(VpcEndpoint);
export interface Endpoint {
  address?: string;
  port?: number;
  vpcEndpoints?: VpcEndpoint[];
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    address: S.optional(S.String),
    port: S.optional(S.Number),
    vpcEndpoints: S.optional(VpcEndpointList),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type VpcIds = string[];
export const VpcIds = /*@__PURE__*/ S.Array(S.String);
export interface Workgroup {
  workgroupId?: string;
  workgroupArn?: string;
  workgroupName?: string;
  namespaceName?: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  securityGroupIds?: string[];
  subnetIds?: string[];
  status?: string;
  endpoint?: Endpoint;
  publiclyAccessible?: boolean;
  creationDate?: Date;
  port?: number;
  customDomainName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
  workgroupVersion?: string;
  patchVersion?: string;
  maxCapacity?: number;
  crossAccountVpcs?: string[];
  ipAddressType?: string;
  pricePerformanceTarget?: PerformanceTarget;
  trackName?: string;
  pendingTrackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export const Workgroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workgroupId: S.optional(S.String),
    workgroupArn: S.optional(S.String),
    workgroupName: S.optional(S.String),
    namespaceName: S.optional(S.String),
    baseCapacity: S.optional(S.Number),
    enhancedVpcRouting: S.optional(S.Boolean),
    configParameters: S.optional(ConfigParameterList),
    securityGroupIds: S.optional(SecurityGroupIdList),
    subnetIds: S.optional(SubnetIdList),
    status: S.optional(S.String),
    endpoint: S.optional(Endpoint),
    publiclyAccessible: S.optional(S.Boolean),
    creationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    port: S.optional(S.Number),
    customDomainName: S.optional(S.String),
    customDomainCertificateArn: S.optional(S.String),
    customDomainCertificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    workgroupVersion: S.optional(S.String),
    patchVersion: S.optional(S.String),
    maxCapacity: S.optional(S.Number),
    crossAccountVpcs: S.optional(VpcIds),
    ipAddressType: S.optional(S.String),
    pricePerformanceTarget: S.optional(PerformanceTarget),
    trackName: S.optional(S.String),
    pendingTrackName: S.optional(S.String),
    extraComputeForAutomaticOptimization: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Workgroup" }) as any as S.Schema<Workgroup>;
export interface CreateWorkgroupResponse {
  workgroup?: Workgroup;
}
export const CreateWorkgroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroup: S.optional(Workgroup) }),
).annotate({
  identifier: "CreateWorkgroupResponse",
}) as any as S.Schema<CreateWorkgroupResponse>;
export interface DeleteCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
}
export const DeleteCustomDomainAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ workgroupName: S.String, customDomainName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteCustomDomainAssociationRequest",
}) as any as S.Schema<DeleteCustomDomainAssociationRequest>;
export interface DeleteCustomDomainAssociationResponse {}
export const DeleteCustomDomainAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCustomDomainAssociationResponse",
}) as any as S.Schema<DeleteCustomDomainAssociationResponse>;
export interface DeleteEndpointAccessRequest {
  endpointName: string;
}
export const DeleteEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEndpointAccessRequest",
}) as any as S.Schema<DeleteEndpointAccessRequest>;
export interface DeleteEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export const DeleteEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.optional(EndpointAccess) }),
).annotate({
  identifier: "DeleteEndpointAccessResponse",
}) as any as S.Schema<DeleteEndpointAccessResponse>;
export interface DeleteNamespaceRequest {
  namespaceName: string;
  finalSnapshotName?: string;
  finalSnapshotRetentionPeriod?: number;
}
export const DeleteNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    finalSnapshotName: S.optional(S.String),
    finalSnapshotRetentionPeriod: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNamespaceRequest",
}) as any as S.Schema<DeleteNamespaceRequest>;
export interface DeleteNamespaceResponse {
  namespace: Namespace;
}
export const DeleteNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: Namespace }),
).annotate({
  identifier: "DeleteNamespaceResponse",
}) as any as S.Schema<DeleteNamespaceResponse>;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteScheduledActionRequest {
  scheduledActionName: string;
}
export const DeleteScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledActionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteScheduledActionRequest",
}) as any as S.Schema<DeleteScheduledActionRequest>;
export interface DeleteScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export const DeleteScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAction: S.optional(ScheduledActionResponse) }),
).annotate({
  identifier: "DeleteScheduledActionResponse",
}) as any as S.Schema<DeleteScheduledActionResponse>;
export interface DeleteSnapshotRequest {
  snapshotName: string;
}
export const DeleteSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshotName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSnapshotRequest",
}) as any as S.Schema<DeleteSnapshotRequest>;
export interface DeleteSnapshotResponse {
  snapshot?: Snapshot;
}
export const DeleteSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "DeleteSnapshotResponse",
}) as any as S.Schema<DeleteSnapshotResponse>;
export interface DeleteSnapshotCopyConfigurationRequest {
  snapshotCopyConfigurationId: string;
}
export const DeleteSnapshotCopyConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ snapshotCopyConfigurationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteSnapshotCopyConfigurationRequest",
}) as any as S.Schema<DeleteSnapshotCopyConfigurationRequest>;
export interface DeleteSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export const DeleteSnapshotCopyConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ snapshotCopyConfiguration: SnapshotCopyConfiguration }),
).annotate({
  identifier: "DeleteSnapshotCopyConfigurationResponse",
}) as any as S.Schema<DeleteSnapshotCopyConfigurationResponse>;
export interface DeleteUsageLimitRequest {
  usageLimitId: string;
}
export const DeleteUsageLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimitId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUsageLimitRequest",
}) as any as S.Schema<DeleteUsageLimitRequest>;
export interface DeleteUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export const DeleteUsageLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimit: S.optional(UsageLimit) }),
).annotate({
  identifier: "DeleteUsageLimitResponse",
}) as any as S.Schema<DeleteUsageLimitResponse>;
export interface DeleteWorkgroupRequest {
  workgroupName: string;
}
export const DeleteWorkgroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWorkgroupRequest",
}) as any as S.Schema<DeleteWorkgroupRequest>;
export interface DeleteWorkgroupResponse {
  workgroup: Workgroup;
}
export const DeleteWorkgroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroup: Workgroup }),
).annotate({
  identifier: "DeleteWorkgroupResponse",
}) as any as S.Schema<DeleteWorkgroupResponse>;
export type DbName = string;
export interface GetCredentialsRequest {
  dbName?: string;
  durationSeconds?: number;
  workgroupName?: string;
  customDomainName?: string;
}
export const GetCredentialsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbName: S.optional(S.String),
    durationSeconds: S.optional(S.Number),
    workgroupName: S.optional(S.String),
    customDomainName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCredentialsRequest",
}) as any as S.Schema<GetCredentialsRequest>;
export interface GetCredentialsResponse {
  dbUser?: string | redacted.Redacted<string>;
  dbPassword?: string | redacted.Redacted<string>;
  expiration?: Date;
  nextRefreshTime?: Date;
}
export const GetCredentialsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbUser: S.optional(SensitiveString),
    dbPassword: S.optional(SensitiveString),
    expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    nextRefreshTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetCredentialsResponse",
}) as any as S.Schema<GetCredentialsResponse>;
export interface GetCustomDomainAssociationRequest {
  customDomainName: string;
  workgroupName: string;
}
export const GetCustomDomainAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customDomainName: S.String, workgroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCustomDomainAssociationRequest",
}) as any as S.Schema<GetCustomDomainAssociationRequest>;
export interface GetCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export const GetCustomDomainAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customDomainName: S.optional(S.String),
    workgroupName: S.optional(S.String),
    customDomainCertificateArn: S.optional(S.String),
    customDomainCertificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetCustomDomainAssociationResponse",
}) as any as S.Schema<GetCustomDomainAssociationResponse>;
export interface GetEndpointAccessRequest {
  endpointName: string;
}
export const GetEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEndpointAccessRequest",
}) as any as S.Schema<GetEndpointAccessRequest>;
export interface GetEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export const GetEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.optional(EndpointAccess) }),
).annotate({
  identifier: "GetEndpointAccessResponse",
}) as any as S.Schema<GetEndpointAccessResponse>;
export type WorkgroupNameList = string[];
export const WorkgroupNameList = /*@__PURE__*/ S.Array(S.String);
export interface GetIdentityCenterAuthTokenRequest {
  workgroupNames: string[];
}
export const GetIdentityCenterAuthTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupNames: WorkgroupNameList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetIdentityCenterAuthTokenRequest",
}) as any as S.Schema<GetIdentityCenterAuthTokenRequest>;
export interface GetIdentityCenterAuthTokenResponse {
  token?: string | redacted.Redacted<string>;
  expirationTime?: Date;
}
export const GetIdentityCenterAuthTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    token: S.optional(SensitiveString),
    expirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(S.encodeKeys({ token: "Token", expirationTime: "ExpirationTime" })),
).annotate({
  identifier: "GetIdentityCenterAuthTokenResponse",
}) as any as S.Schema<GetIdentityCenterAuthTokenResponse>;
export interface GetNamespaceRequest {
  namespaceName: string;
}
export const GetNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespaceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetNamespaceRequest",
}) as any as S.Schema<GetNamespaceRequest>;
export interface GetNamespaceResponse {
  namespace: Namespace;
}
export const GetNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: Namespace }),
).annotate({
  identifier: "GetNamespaceResponse",
}) as any as S.Schema<GetNamespaceResponse>;
export interface GetRecoveryPointRequest {
  recoveryPointId: string;
}
export const GetRecoveryPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryPointId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRecoveryPointRequest",
}) as any as S.Schema<GetRecoveryPointRequest>;
export interface RecoveryPoint {
  recoveryPointId?: string;
  recoveryPointCreateTime?: Date;
  totalSizeInMegaBytes?: number;
  namespaceName?: string;
  workgroupName?: string;
  namespaceArn?: string;
}
export const RecoveryPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryPointId: S.optional(S.String),
    recoveryPointCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    totalSizeInMegaBytes: S.optional(S.Number),
    namespaceName: S.optional(S.String),
    workgroupName: S.optional(S.String),
    namespaceArn: S.optional(S.String),
  }),
).annotate({ identifier: "RecoveryPoint" }) as any as S.Schema<RecoveryPoint>;
export interface GetRecoveryPointResponse {
  recoveryPoint?: RecoveryPoint;
}
export const GetRecoveryPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recoveryPoint: S.optional(RecoveryPoint) }),
).annotate({
  identifier: "GetRecoveryPointResponse",
}) as any as S.Schema<GetRecoveryPointResponse>;
export interface GetReservationRequest {
  reservationId: string;
}
export const GetReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reservationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetReservationRequest",
}) as any as S.Schema<GetReservationRequest>;
export interface GetReservationResponse {
  reservation: Reservation;
}
export const GetReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reservation: Reservation }),
).annotate({
  identifier: "GetReservationResponse",
}) as any as S.Schema<GetReservationResponse>;
export interface GetReservationOfferingRequest {
  offeringId: string;
}
export const GetReservationOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offeringId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetReservationOfferingRequest",
}) as any as S.Schema<GetReservationOfferingRequest>;
export interface GetReservationOfferingResponse {
  reservationOffering: ReservationOffering;
}
export const GetReservationOfferingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reservationOffering: ReservationOffering }),
).annotate({
  identifier: "GetReservationOfferingResponse",
}) as any as S.Schema<GetReservationOfferingResponse>;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface ResourcePolicy {
  resourceArn?: string;
  policy?: string;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.optional(S.String), policy: S.optional(S.String) }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export interface GetResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourcePolicy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetScheduledActionRequest {
  scheduledActionName: string;
}
export const GetScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledActionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetScheduledActionRequest",
}) as any as S.Schema<GetScheduledActionRequest>;
export interface GetScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export const GetScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAction: S.optional(ScheduledActionResponse) }),
).annotate({
  identifier: "GetScheduledActionResponse",
}) as any as S.Schema<GetScheduledActionResponse>;
export interface GetSnapshotRequest {
  snapshotName?: string;
  ownerAccount?: string;
  snapshotArn?: string;
}
export const GetSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotName: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    snapshotArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSnapshotRequest",
}) as any as S.Schema<GetSnapshotRequest>;
export interface GetSnapshotResponse {
  snapshot?: Snapshot;
}
export const GetSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "GetSnapshotResponse",
}) as any as S.Schema<GetSnapshotResponse>;
export interface GetTableRestoreStatusRequest {
  tableRestoreRequestId: string;
}
export const GetTableRestoreStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tableRestoreRequestId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableRestoreStatusRequest",
}) as any as S.Schema<GetTableRestoreStatusRequest>;
export interface TableRestoreStatus {
  tableRestoreRequestId?: string;
  status?: string;
  message?: string;
  requestTime?: Date;
  namespaceName?: string;
  workgroupName?: string;
  snapshotName?: string;
  progressInMegaBytes?: number;
  totalDataInMegaBytes?: number;
  sourceDatabaseName?: string;
  sourceSchemaName?: string;
  sourceTableName?: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName?: string;
  recoveryPointId?: string;
}
export const TableRestoreStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tableRestoreRequestId: S.optional(S.String),
    status: S.optional(S.String),
    message: S.optional(S.String),
    requestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    namespaceName: S.optional(S.String),
    workgroupName: S.optional(S.String),
    snapshotName: S.optional(S.String),
    progressInMegaBytes: S.optional(S.Number),
    totalDataInMegaBytes: S.optional(S.Number),
    sourceDatabaseName: S.optional(S.String),
    sourceSchemaName: S.optional(S.String),
    sourceTableName: S.optional(S.String),
    targetDatabaseName: S.optional(S.String),
    targetSchemaName: S.optional(S.String),
    newTableName: S.optional(S.String),
    recoveryPointId: S.optional(S.String),
  }),
).annotate({
  identifier: "TableRestoreStatus",
}) as any as S.Schema<TableRestoreStatus>;
export interface GetTableRestoreStatusResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export const GetTableRestoreStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tableRestoreStatus: S.optional(TableRestoreStatus) }),
).annotate({
  identifier: "GetTableRestoreStatusResponse",
}) as any as S.Schema<GetTableRestoreStatusResponse>;
export interface GetTrackRequest {
  trackName: string;
}
export const GetTrackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trackName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTrackRequest",
}) as any as S.Schema<GetTrackRequest>;
export interface UpdateTarget {
  trackName?: string;
  workgroupVersion?: string;
}
export const UpdateTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trackName: S.optional(S.String),
    workgroupVersion: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateTarget" }) as any as S.Schema<UpdateTarget>;
export type UpdateTargetsList = UpdateTarget[];
export const UpdateTargetsList = /*@__PURE__*/ S.Array(UpdateTarget);
export interface ServerlessTrack {
  trackName?: string;
  workgroupVersion?: string;
  updateTargets?: UpdateTarget[];
}
export const ServerlessTrack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trackName: S.optional(S.String),
    workgroupVersion: S.optional(S.String),
    updateTargets: S.optional(UpdateTargetsList),
  }),
).annotate({
  identifier: "ServerlessTrack",
}) as any as S.Schema<ServerlessTrack>;
export interface GetTrackResponse {
  track?: ServerlessTrack;
}
export const GetTrackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ track: S.optional(ServerlessTrack) }),
).annotate({
  identifier: "GetTrackResponse",
}) as any as S.Schema<GetTrackResponse>;
export interface GetUsageLimitRequest {
  usageLimitId: string;
}
export const GetUsageLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimitId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUsageLimitRequest",
}) as any as S.Schema<GetUsageLimitRequest>;
export interface GetUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export const GetUsageLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimit: S.optional(UsageLimit) }),
).annotate({
  identifier: "GetUsageLimitResponse",
}) as any as S.Schema<GetUsageLimitResponse>;
export interface GetWorkgroupRequest {
  workgroupName: string;
}
export const GetWorkgroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkgroupRequest",
}) as any as S.Schema<GetWorkgroupRequest>;
export interface GetWorkgroupResponse {
  workgroup: Workgroup;
}
export const GetWorkgroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroup: Workgroup }),
).annotate({
  identifier: "GetWorkgroupResponse",
}) as any as S.Schema<GetWorkgroupResponse>;
export type PaginationToken = string;
export interface ListCustomDomainAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  customDomainName?: string;
  customDomainCertificateArn?: string;
}
export const ListCustomDomainAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    customDomainName: S.optional(S.String),
    customDomainCertificateArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCustomDomainAssociationsRequest",
}) as any as S.Schema<ListCustomDomainAssociationsRequest>;
export interface Association {
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
  customDomainName?: string;
  workgroupName?: string;
}
export const Association = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customDomainCertificateArn: S.optional(S.String),
    customDomainCertificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    customDomainName: S.optional(S.String),
    workgroupName: S.optional(S.String),
  }),
).annotate({ identifier: "Association" }) as any as S.Schema<Association>;
export type AssociationList = Association[];
export const AssociationList = /*@__PURE__*/ S.Array(Association);
export interface ListCustomDomainAssociationsResponse {
  nextToken?: string;
  associations?: Association[];
}
export const ListCustomDomainAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      associations: S.optional(AssociationList),
    }),
).annotate({
  identifier: "ListCustomDomainAssociationsResponse",
}) as any as S.Schema<ListCustomDomainAssociationsResponse>;
export interface ListEndpointAccessRequest {
  nextToken?: string;
  maxResults?: number;
  workgroupName?: string;
  vpcId?: string;
  ownerAccount?: string;
}
export const ListEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    workgroupName: S.optional(S.String),
    vpcId: S.optional(S.String),
    ownerAccount: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEndpointAccessRequest",
}) as any as S.Schema<ListEndpointAccessRequest>;
export type EndpointAccessList = EndpointAccess[];
export const EndpointAccessList = /*@__PURE__*/ S.Array(EndpointAccess);
export interface ListEndpointAccessResponse {
  nextToken?: string;
  endpoints: EndpointAccess[];
}
export const ListEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), endpoints: EndpointAccessList }),
).annotate({
  identifier: "ListEndpointAccessResponse",
}) as any as S.Schema<ListEndpointAccessResponse>;
export type SourceArn = string;
export interface ListManagedWorkgroupsRequest {
  sourceArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListManagedWorkgroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceArn: S.optional(S.String),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListManagedWorkgroupsRequest",
}) as any as S.Schema<ListManagedWorkgroupsRequest>;
export type ManagedWorkgroupName = string;
export type ManagedWorkgroupStatus =
  | "CREATING"
  | "DELETING"
  | "MODIFYING"
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
export const ManagedWorkgroupStatus = S.String;

export interface ManagedWorkgroupListItem {
  managedWorkgroupName?: string;
  managedWorkgroupId?: string;
  sourceArn?: string;
  status?: ManagedWorkgroupStatus;
  creationDate?: Date;
}
export const ManagedWorkgroupListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedWorkgroupName: S.optional(S.String),
    managedWorkgroupId: S.optional(S.String),
    sourceArn: S.optional(S.String),
    status: S.optional(ManagedWorkgroupStatus),
    creationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ManagedWorkgroupListItem",
}) as any as S.Schema<ManagedWorkgroupListItem>;
export type ManagedWorkgroups = ManagedWorkgroupListItem[];
export const ManagedWorkgroups = /*@__PURE__*/ S.Array(
  ManagedWorkgroupListItem,
);
export interface ListManagedWorkgroupsResponse {
  nextToken?: string;
  managedWorkgroups?: ManagedWorkgroupListItem[];
}
export const ListManagedWorkgroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    managedWorkgroups: S.optional(ManagedWorkgroups),
  }),
).annotate({
  identifier: "ListManagedWorkgroupsResponse",
}) as any as S.Schema<ListManagedWorkgroupsResponse>;
export interface ListNamespacesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListNamespacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNamespacesRequest",
}) as any as S.Schema<ListNamespacesRequest>;
export type NamespaceList = Namespace[];
export const NamespaceList = /*@__PURE__*/ S.Array(Namespace);
export interface ListNamespacesResponse {
  nextToken?: string;
  namespaces: Namespace[];
}
export const ListNamespacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), namespaces: NamespaceList }),
).annotate({
  identifier: "ListNamespacesResponse",
}) as any as S.Schema<ListNamespacesResponse>;
export interface ListRecoveryPointsRequest {
  nextToken?: string;
  maxResults?: number;
  startTime?: Date;
  endTime?: Date;
  namespaceName?: string;
  namespaceArn?: string;
}
export const ListRecoveryPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    namespaceName: S.optional(S.String),
    namespaceArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecoveryPointsRequest",
}) as any as S.Schema<ListRecoveryPointsRequest>;
export type RecoveryPointList = RecoveryPoint[];
export const RecoveryPointList = /*@__PURE__*/ S.Array(RecoveryPoint);
export interface ListRecoveryPointsResponse {
  recoveryPoints?: RecoveryPoint[];
  nextToken?: string;
}
export const ListRecoveryPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryPoints: S.optional(RecoveryPointList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecoveryPointsResponse",
}) as any as S.Schema<ListRecoveryPointsResponse>;
export interface ListReservationOfferingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListReservationOfferingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListReservationOfferingsRequest",
}) as any as S.Schema<ListReservationOfferingsRequest>;
export type ReservationOfferingsList = ReservationOffering[];
export const ReservationOfferingsList =
  /*@__PURE__*/ S.Array(ReservationOffering);
export interface ListReservationOfferingsResponse {
  reservationOfferingsList: ReservationOffering[];
  nextToken?: string;
}
export const ListReservationOfferingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationOfferingsList: ReservationOfferingsList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReservationOfferingsResponse",
}) as any as S.Schema<ListReservationOfferingsResponse>;
export interface ListReservationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListReservationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListReservationsRequest",
}) as any as S.Schema<ListReservationsRequest>;
export type ReservationsList = Reservation[];
export const ReservationsList = /*@__PURE__*/ S.Array(Reservation);
export interface ListReservationsResponse {
  reservationsList: Reservation[];
  nextToken?: string;
}
export const ListReservationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reservationsList: ReservationsList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReservationsResponse",
}) as any as S.Schema<ListReservationsResponse>;
export interface ListScheduledActionsRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
}
export const ListScheduledActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    namespaceName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListScheduledActionsRequest",
}) as any as S.Schema<ListScheduledActionsRequest>;
export interface ScheduledActionAssociation {
  namespaceName?: string;
  scheduledActionName?: string;
}
export const ScheduledActionAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.optional(S.String),
    scheduledActionName: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledActionAssociation",
}) as any as S.Schema<ScheduledActionAssociation>;
export type ScheduledActionsList = ScheduledActionAssociation[];
export const ScheduledActionsList = /*@__PURE__*/ S.Array(
  ScheduledActionAssociation,
);
export interface ListScheduledActionsResponse {
  nextToken?: string;
  scheduledActions?: ScheduledActionAssociation[];
}
export const ListScheduledActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    scheduledActions: S.optional(ScheduledActionsList),
  }),
).annotate({
  identifier: "ListScheduledActionsResponse",
}) as any as S.Schema<ListScheduledActionsResponse>;
export interface ListSnapshotCopyConfigurationsRequest {
  namespaceName?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSnapshotCopyConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaceName: S.optional(S.String),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListSnapshotCopyConfigurationsRequest",
}) as any as S.Schema<ListSnapshotCopyConfigurationsRequest>;
export type SnapshotCopyConfigurations = SnapshotCopyConfiguration[];
export const SnapshotCopyConfigurations = /*@__PURE__*/ S.Array(
  SnapshotCopyConfiguration,
);
export interface ListSnapshotCopyConfigurationsResponse {
  nextToken?: string;
  snapshotCopyConfigurations: SnapshotCopyConfiguration[];
}
export const ListSnapshotCopyConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      snapshotCopyConfigurations: SnapshotCopyConfigurations,
    }),
).annotate({
  identifier: "ListSnapshotCopyConfigurationsResponse",
}) as any as S.Schema<ListSnapshotCopyConfigurationsResponse>;
export interface ListSnapshotsRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
  namespaceArn?: string;
  ownerAccount?: string;
  startTime?: Date;
  endTime?: Date;
}
export const ListSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    namespaceName: S.optional(S.String),
    namespaceArn: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSnapshotsRequest",
}) as any as S.Schema<ListSnapshotsRequest>;
export type SnapshotList = Snapshot[];
export const SnapshotList = /*@__PURE__*/ S.Array(Snapshot);
export interface ListSnapshotsResponse {
  nextToken?: string;
  snapshots?: Snapshot[];
}
export const ListSnapshotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    snapshots: S.optional(SnapshotList),
  }),
).annotate({
  identifier: "ListSnapshotsResponse",
}) as any as S.Schema<ListSnapshotsResponse>;
export interface ListTableRestoreStatusRequest {
  nextToken?: string;
  maxResults?: number;
  namespaceName?: string;
  workgroupName?: string;
}
export const ListTableRestoreStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    namespaceName: S.optional(S.String),
    workgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTableRestoreStatusRequest",
}) as any as S.Schema<ListTableRestoreStatusRequest>;
export type TableRestoreStatusList = TableRestoreStatus[];
export const TableRestoreStatusList = /*@__PURE__*/ S.Array(TableRestoreStatus);
export interface ListTableRestoreStatusResponse {
  nextToken?: string;
  tableRestoreStatuses?: TableRestoreStatus[];
}
export const ListTableRestoreStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    tableRestoreStatuses: S.optional(TableRestoreStatusList),
  }),
).annotate({
  identifier: "ListTableRestoreStatusResponse",
}) as any as S.Schema<ListTableRestoreStatusResponse>;
export type AmazonResourceName = string;
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
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTracksRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListTracksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTracksRequest",
}) as any as S.Schema<ListTracksRequest>;
export type TrackList = ServerlessTrack[];
export const TrackList = /*@__PURE__*/ S.Array(ServerlessTrack);
export interface ListTracksResponse {
  tracks?: ServerlessTrack[];
  nextToken?: string;
}
export const ListTracksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tracks: S.optional(TrackList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTracksResponse",
}) as any as S.Schema<ListTracksResponse>;
export interface ListUsageLimitsRequest {
  resourceArn?: string;
  usageType?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListUsageLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    usageType: S.optional(S.String),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListUsageLimitsRequest",
}) as any as S.Schema<ListUsageLimitsRequest>;
export type UsageLimits = UsageLimit[];
export const UsageLimits = /*@__PURE__*/ S.Array(UsageLimit);
export interface ListUsageLimitsResponse {
  usageLimits?: UsageLimit[];
  nextToken?: string;
}
export const ListUsageLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageLimits: S.optional(UsageLimits),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUsageLimitsResponse",
}) as any as S.Schema<ListUsageLimitsResponse>;
export interface ListWorkgroupsRequest {
  nextToken?: string;
  maxResults?: number;
  ownerAccount?: string;
}
export const ListWorkgroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ownerAccount: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWorkgroupsRequest",
}) as any as S.Schema<ListWorkgroupsRequest>;
export type WorkgroupList = Workgroup[];
export const WorkgroupList = /*@__PURE__*/ S.Array(Workgroup);
export interface ListWorkgroupsResponse {
  nextToken?: string;
  workgroups: Workgroup[];
}
export const ListWorkgroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), workgroups: WorkgroupList }),
).annotate({
  identifier: "ListWorkgroupsResponse",
}) as any as S.Schema<ListWorkgroupsResponse>;
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, policy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  resourcePolicy?: ResourcePolicy;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourcePolicy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RestoreFromRecoveryPointRequest {
  recoveryPointId: string;
  namespaceName: string;
  workgroupName: string;
  maintainIntegration?: boolean;
}
export const RestoreFromRecoveryPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryPointId: S.String,
    namespaceName: S.String,
    workgroupName: S.String,
    maintainIntegration: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreFromRecoveryPointRequest",
}) as any as S.Schema<RestoreFromRecoveryPointRequest>;
export interface RestoreFromRecoveryPointResponse {
  recoveryPointId?: string;
  namespace?: Namespace;
}
export const RestoreFromRecoveryPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recoveryPointId: S.optional(S.String),
    namespace: S.optional(Namespace),
  }),
).annotate({
  identifier: "RestoreFromRecoveryPointResponse",
}) as any as S.Schema<RestoreFromRecoveryPointResponse>;
export interface RestoreFromSnapshotRequest {
  namespaceName: string;
  workgroupName: string;
  snapshotName?: string;
  snapshotArn?: string;
  ownerAccount?: string;
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  maintainIntegration?: boolean;
}
export const RestoreFromSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    workgroupName: S.String,
    snapshotName: S.optional(S.String),
    snapshotArn: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    manageAdminPassword: S.optional(S.Boolean),
    adminPasswordSecretKmsKeyId: S.optional(S.String),
    maintainIntegration: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreFromSnapshotRequest",
}) as any as S.Schema<RestoreFromSnapshotRequest>;
export interface RestoreFromSnapshotResponse {
  snapshotName?: string;
  ownerAccount?: string;
  namespace?: Namespace;
}
export const RestoreFromSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotName: S.optional(S.String),
    ownerAccount: S.optional(S.String),
    namespace: S.optional(Namespace),
  }),
).annotate({
  identifier: "RestoreFromSnapshotResponse",
}) as any as S.Schema<RestoreFromSnapshotResponse>;
export interface RestoreTableFromRecoveryPointRequest {
  namespaceName: string;
  workgroupName: string;
  recoveryPointId: string;
  sourceDatabaseName: string;
  sourceSchemaName?: string;
  sourceTableName: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName: string;
  activateCaseSensitiveIdentifier?: boolean;
}
export const RestoreTableFromRecoveryPointRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaceName: S.String,
      workgroupName: S.String,
      recoveryPointId: S.String,
      sourceDatabaseName: S.String,
      sourceSchemaName: S.optional(S.String),
      sourceTableName: S.String,
      targetDatabaseName: S.optional(S.String),
      targetSchemaName: S.optional(S.String),
      newTableName: S.String,
      activateCaseSensitiveIdentifier: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "RestoreTableFromRecoveryPointRequest",
}) as any as S.Schema<RestoreTableFromRecoveryPointRequest>;
export interface RestoreTableFromRecoveryPointResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export const RestoreTableFromRecoveryPointResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ tableRestoreStatus: S.optional(TableRestoreStatus) }),
).annotate({
  identifier: "RestoreTableFromRecoveryPointResponse",
}) as any as S.Schema<RestoreTableFromRecoveryPointResponse>;
export interface RestoreTableFromSnapshotRequest {
  namespaceName: string;
  workgroupName: string;
  snapshotName: string;
  sourceDatabaseName: string;
  sourceSchemaName?: string;
  sourceTableName: string;
  targetDatabaseName?: string;
  targetSchemaName?: string;
  newTableName: string;
  activateCaseSensitiveIdentifier?: boolean;
}
export const RestoreTableFromSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    workgroupName: S.String,
    snapshotName: S.String,
    sourceDatabaseName: S.String,
    sourceSchemaName: S.optional(S.String),
    sourceTableName: S.String,
    targetDatabaseName: S.optional(S.String),
    targetSchemaName: S.optional(S.String),
    newTableName: S.String,
    activateCaseSensitiveIdentifier: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreTableFromSnapshotRequest",
}) as any as S.Schema<RestoreTableFromSnapshotRequest>;
export interface RestoreTableFromSnapshotResponse {
  tableRestoreStatus?: TableRestoreStatus;
}
export const RestoreTableFromSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tableRestoreStatus: S.optional(TableRestoreStatus) }),
).annotate({
  identifier: "RestoreTableFromSnapshotResponse",
}) as any as S.Schema<RestoreTableFromSnapshotResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
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
export interface UpdateCustomDomainAssociationRequest {
  workgroupName: string;
  customDomainName: string;
  customDomainCertificateArn: string;
}
export const UpdateCustomDomainAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      workgroupName: S.String,
      customDomainName: S.String,
      customDomainCertificateArn: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateCustomDomainAssociationRequest",
}) as any as S.Schema<UpdateCustomDomainAssociationRequest>;
export interface UpdateCustomDomainAssociationResponse {
  customDomainName?: string;
  workgroupName?: string;
  customDomainCertificateArn?: string;
  customDomainCertificateExpiryTime?: Date;
}
export const UpdateCustomDomainAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      customDomainName: S.optional(S.String),
      workgroupName: S.optional(S.String),
      customDomainCertificateArn: S.optional(S.String),
      customDomainCertificateExpiryTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "UpdateCustomDomainAssociationResponse",
}) as any as S.Schema<UpdateCustomDomainAssociationResponse>;
export interface UpdateEndpointAccessRequest {
  endpointName: string;
  vpcSecurityGroupIds?: string[];
}
export const UpdateEndpointAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointName: S.String,
    vpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEndpointAccessRequest",
}) as any as S.Schema<UpdateEndpointAccessRequest>;
export interface UpdateEndpointAccessResponse {
  endpoint?: EndpointAccess;
}
export const UpdateEndpointAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpoint: S.optional(EndpointAccess) }),
).annotate({
  identifier: "UpdateEndpointAccessResponse",
}) as any as S.Schema<UpdateEndpointAccessResponse>;
export type LakehouseRegistration = string;
export type CatalogNameString = string;
export type LakehouseIdcRegistration = string;
export interface UpdateLakehouseConfigurationRequest {
  namespaceName: string;
  lakehouseRegistration?: string;
  catalogName?: string;
  lakehouseIdcRegistration?: string;
  lakehouseIdcApplicationArn?: string;
  dryRun?: boolean;
}
export const UpdateLakehouseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    lakehouseRegistration: S.optional(S.String),
    catalogName: S.optional(S.String),
    lakehouseIdcRegistration: S.optional(S.String),
    lakehouseIdcApplicationArn: S.optional(S.String),
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLakehouseConfigurationRequest",
}) as any as S.Schema<UpdateLakehouseConfigurationRequest>;
export interface UpdateLakehouseConfigurationResponse {
  namespaceName?: string;
  lakehouseIdcApplicationArn?: string;
  lakehouseRegistrationStatus?: string;
  catalogArn?: string;
}
export const UpdateLakehouseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      namespaceName: S.optional(S.String),
      lakehouseIdcApplicationArn: S.optional(S.String),
      lakehouseRegistrationStatus: S.optional(S.String),
      catalogArn: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateLakehouseConfigurationResponse",
}) as any as S.Schema<UpdateLakehouseConfigurationResponse>;
export type LogDestinationType = string;
export type S3TableAction = string;
export interface UpdateNamespaceRequest {
  namespaceName: string;
  adminUserPassword?: string | redacted.Redacted<string>;
  adminUsername?: string | redacted.Redacted<string>;
  kmsKeyId?: string;
  defaultIamRoleArn?: string;
  iamRoles?: string[];
  logExports?: string[];
  manageAdminPassword?: boolean;
  adminPasswordSecretKmsKeyId?: string;
  logDestinationType?: string;
  s3TableAction?: string;
  s3TableNames?: string[];
  s3TableKmsKeyId?: string;
  s3TableGranularity?: string;
}
export const UpdateNamespaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    adminUserPassword: S.optional(SensitiveString),
    adminUsername: S.optional(SensitiveString),
    kmsKeyId: S.optional(S.String),
    defaultIamRoleArn: S.optional(S.String),
    iamRoles: S.optional(IamRoleArnList),
    logExports: S.optional(LogExportList),
    manageAdminPassword: S.optional(S.Boolean),
    adminPasswordSecretKmsKeyId: S.optional(S.String),
    logDestinationType: S.optional(S.String),
    s3TableAction: S.optional(S.String),
    s3TableNames: S.optional(S3TableNameList),
    s3TableKmsKeyId: S.optional(S.String),
    s3TableGranularity: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNamespaceRequest",
}) as any as S.Schema<UpdateNamespaceRequest>;
export interface UpdateNamespaceResponse {
  namespace: Namespace;
}
export const UpdateNamespaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: Namespace }),
).annotate({
  identifier: "UpdateNamespaceResponse",
}) as any as S.Schema<UpdateNamespaceResponse>;
export interface UpdateScheduledActionRequest {
  scheduledActionName: string;
  targetAction?: TargetAction;
  schedule?: Schedule;
  roleArn?: string;
  enabled?: boolean;
  scheduledActionDescription?: string;
  startTime?: Date;
  endTime?: Date;
}
export const UpdateScheduledActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledActionName: S.String,
    targetAction: S.optional(TargetAction),
    schedule: S.optional(Schedule),
    roleArn: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    scheduledActionDescription: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateScheduledActionRequest",
}) as any as S.Schema<UpdateScheduledActionRequest>;
export interface UpdateScheduledActionResponse {
  scheduledAction?: ScheduledActionResponse;
}
export const UpdateScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAction: S.optional(ScheduledActionResponse) }),
).annotate({
  identifier: "UpdateScheduledActionResponse",
}) as any as S.Schema<UpdateScheduledActionResponse>;
export interface UpdateSnapshotRequest {
  snapshotName: string;
  retentionPeriod?: number;
}
export const UpdateSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotName: S.String,
    retentionPeriod: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSnapshotRequest",
}) as any as S.Schema<UpdateSnapshotRequest>;
export interface UpdateSnapshotResponse {
  snapshot?: Snapshot;
}
export const UpdateSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ snapshot: S.optional(Snapshot) }),
).annotate({
  identifier: "UpdateSnapshotResponse",
}) as any as S.Schema<UpdateSnapshotResponse>;
export interface UpdateSnapshotCopyConfigurationRequest {
  snapshotCopyConfigurationId: string;
  snapshotRetentionPeriod?: number;
}
export const UpdateSnapshotCopyConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      snapshotCopyConfigurationId: S.String,
      snapshotRetentionPeriod: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateSnapshotCopyConfigurationRequest",
}) as any as S.Schema<UpdateSnapshotCopyConfigurationRequest>;
export interface UpdateSnapshotCopyConfigurationResponse {
  snapshotCopyConfiguration: SnapshotCopyConfiguration;
}
export const UpdateSnapshotCopyConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ snapshotCopyConfiguration: SnapshotCopyConfiguration }),
).annotate({
  identifier: "UpdateSnapshotCopyConfigurationResponse",
}) as any as S.Schema<UpdateSnapshotCopyConfigurationResponse>;
export interface UpdateUsageLimitRequest {
  usageLimitId: string;
  amount?: number;
  breachAction?: string;
}
export const UpdateUsageLimitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usageLimitId: S.String,
    amount: S.optional(S.Number),
    breachAction: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateUsageLimitRequest",
}) as any as S.Schema<UpdateUsageLimitRequest>;
export interface UpdateUsageLimitResponse {
  usageLimit?: UsageLimit;
}
export const UpdateUsageLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ usageLimit: S.optional(UsageLimit) }),
).annotate({
  identifier: "UpdateUsageLimitResponse",
}) as any as S.Schema<UpdateUsageLimitResponse>;
export interface UpdateWorkgroupRequest {
  workgroupName: string;
  baseCapacity?: number;
  enhancedVpcRouting?: boolean;
  configParameters?: ConfigParameter[];
  publiclyAccessible?: boolean;
  subnetIds?: string[];
  securityGroupIds?: string[];
  port?: number;
  maxCapacity?: number;
  ipAddressType?: string;
  pricePerformanceTarget?: PerformanceTarget;
  trackName?: string;
  extraComputeForAutomaticOptimization?: boolean;
}
export const UpdateWorkgroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workgroupName: S.String,
    baseCapacity: S.optional(S.Number),
    enhancedVpcRouting: S.optional(S.Boolean),
    configParameters: S.optional(ConfigParameterList),
    publiclyAccessible: S.optional(S.Boolean),
    subnetIds: S.optional(SubnetIdList),
    securityGroupIds: S.optional(SecurityGroupIdList),
    port: S.optional(S.Number),
    maxCapacity: S.optional(S.Number),
    ipAddressType: S.optional(S.String),
    pricePerformanceTarget: S.optional(PerformanceTarget),
    trackName: S.optional(S.String),
    extraComputeForAutomaticOptimization: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateWorkgroupRequest",
}) as any as S.Schema<UpdateWorkgroupRequest>;
export interface UpdateWorkgroupResponse {
  workgroup: Workgroup;
}
export const UpdateWorkgroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workgroup: Workgroup }),
).annotate({
  identifier: "UpdateWorkgroupResponse",
}) as any as S.Schema<UpdateWorkgroupResponse>;
export type ConvertRecoveryPointToSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Converts a recovery point to a snapshot. For more information about recovery points and snapshots, see Working with snapshots and recovery points.
 */
export const convertRecoveryPointToSnapshot: API.OperationMethod<
  ConvertRecoveryPointToSnapshotRequest,
  ConvertRecoveryPointToSnapshotResponse,
  ConvertRecoveryPointToSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConvertRecoveryPointToSnapshotRequest,
  output: ConvertRecoveryPointToSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConvertRecoveryPointToSnapshot",
}));

export type CreateCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom domain association for Amazon Redshift Serverless.
 */
export const createCustomDomainAssociation: API.OperationMethod<
  CreateCustomDomainAssociationRequest,
  CreateCustomDomainAssociationResponse,
  CreateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomDomainAssociationRequest,
  output: CreateCustomDomainAssociationResponse,
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
  operationName: "CreateCustomDomainAssociation",
}));

export type CreateEndpointAccessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Redshift Serverless managed VPC endpoint.
 */
export const createEndpointAccess: API.OperationMethod<
  CreateEndpointAccessRequest,
  CreateEndpointAccessResponse,
  CreateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEndpointAccessRequest,
  output: CreateEndpointAccessResponse,
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
  operationName: "CreateEndpointAccess",
}));

export type CreateNamespaceError =
  | ConflictException
  | InternalServerException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a namespace in Amazon Redshift Serverless.
 */
export const createNamespace: API.OperationMethod<
  CreateNamespaceRequest,
  CreateNamespaceResponse,
  CreateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNamespaceRequest,
  output: CreateNamespaceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamespace",
}));

export type CreateReservationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Redshift Serverless reservation, which gives you the option to commit to a specified number of Redshift Processing Units (RPUs) for a year at a discount from Serverless on-demand (OD) rates.
 */
export const createReservation: API.OperationMethod<
  CreateReservationRequest,
  CreateReservationResponse,
  CreateReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReservationRequest,
  output: CreateReservationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReservation",
}));

export type CreateScheduledActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action. For example, you can create a schedule of when to run the `CreateSnapshot` API operation.
 */
export const createScheduledAction: API.OperationMethod<
  CreateScheduledActionRequest,
  CreateScheduledActionResponse,
  CreateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScheduledActionRequest,
  output: CreateScheduledActionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
}));

export type CreateSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of all databases in a namespace. For more information about snapshots, see Working with snapshots and recovery points.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotRequest,
  output: CreateSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot copy configuration that lets you copy snapshots to another Amazon Web Services Region.
 */
export const createSnapshotCopyConfiguration: API.OperationMethod<
  CreateSnapshotCopyConfigurationRequest,
  CreateSnapshotCopyConfigurationResponse,
  CreateSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotCopyConfigurationRequest,
  output: CreateSnapshotCopyConfigurationResponse,
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
  operationName: "CreateSnapshotCopyConfiguration",
}));

export type CreateUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a usage limit for a specified Amazon Redshift Serverless usage type. The usage limit is identified by the returned usage limit identifier.
 */
export const createUsageLimit: API.OperationMethod<
  CreateUsageLimitRequest,
  CreateUsageLimitResponse,
  CreateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsageLimitRequest,
  output: CreateUsageLimitResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageLimit",
}));

export type CreateWorkgroupError =
  | ConflictException
  | InsufficientCapacityException
  | InternalServerException
  | Ipv6CidrBlockNotFoundException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an workgroup in Amazon Redshift Serverless.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that you own in a Region from reaching or being reached from the internet through internet gateways and egress-only internet gateways. If a workgroup is in an account with VPC BPA turned on, the following capabilities are blocked:
 *
 * - Creating a public access workgroup
 *
 * - Modifying a private workgroup to public
 *
 * - Adding a subnet with VPC BPA turned on to the workgroup when the workgroup is public
 *
 * For more information about VPC BPA, see Block public access to VPCs and subnets in the *Amazon VPC User Guide*.
 */
export const createWorkgroup: API.OperationMethod<
  CreateWorkgroupRequest,
  CreateWorkgroupResponse,
  CreateWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkgroupRequest,
  output: CreateWorkgroupResponse,
  errors: [
    ConflictException,
    InsufficientCapacityException,
    InternalServerException,
    Ipv6CidrBlockNotFoundException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkgroup",
}));

export type DeleteCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom domain association for Amazon Redshift Serverless.
 */
export const deleteCustomDomainAssociation: API.OperationMethod<
  DeleteCustomDomainAssociationRequest,
  DeleteCustomDomainAssociationResponse,
  DeleteCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomDomainAssociationRequest,
  output: DeleteCustomDomainAssociationResponse,
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
  operationName: "DeleteCustomDomainAssociation",
}));

export type DeleteEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Redshift Serverless managed VPC endpoint.
 */
export const deleteEndpointAccess: API.OperationMethod<
  DeleteEndpointAccessRequest,
  DeleteEndpointAccessResponse,
  DeleteEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointAccessRequest,
  output: DeleteEndpointAccessResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
}));

export type DeleteNamespaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a namespace from Amazon Redshift Serverless. Before you delete the namespace, you can create a final snapshot that has all of the data within the namespace.
 */
export const deleteNamespace: API.OperationMethod<
  DeleteNamespaceRequest,
  DeleteNamespaceResponse,
  DeleteNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNamespaceRequest,
  output: DeleteNamespaceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamespace",
}));

export type DeleteResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified resource policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteScheduledActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scheduled action.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeleteSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a snapshot from Amazon Redshift Serverless.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotRequest,
  output: DeleteSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

export type DeleteSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a snapshot copy configuration
 */
export const deleteSnapshotCopyConfiguration: API.OperationMethod<
  DeleteSnapshotCopyConfigurationRequest,
  DeleteSnapshotCopyConfigurationResponse,
  DeleteSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotCopyConfigurationRequest,
  output: DeleteSnapshotCopyConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotCopyConfiguration",
}));

export type DeleteUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a usage limit from Amazon Redshift Serverless.
 */
export const deleteUsageLimit: API.OperationMethod<
  DeleteUsageLimitRequest,
  DeleteUsageLimitResponse,
  DeleteUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsageLimitRequest,
  output: DeleteUsageLimitResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
}));

export type DeleteWorkgroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workgroup.
 */
export const deleteWorkgroup: API.OperationMethod<
  DeleteWorkgroupRequest,
  DeleteWorkgroupResponse,
  DeleteWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkgroupRequest,
  output: DeleteWorkgroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkgroup",
}));

export type GetCredentialsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to log in to Amazon Redshift Serverless.
 *
 * By default, the temporary credentials expire in 900 seconds. You can optionally specify a duration between 900 seconds (15 minutes) and 3600 seconds (60 minutes).
 *
 * The Identity and Access Management (IAM) user or role that runs GetCredentials must have an IAM policy attached that allows access to all necessary actions and resources.
 *
 * If the `DbName` parameter is specified, the IAM policy must allow access to the resource dbname for the specified database name.
 */
export const getCredentials: API.OperationMethod<
  GetCredentialsRequest,
  GetCredentialsResponse,
  GetCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCredentialsRequest,
  output: GetCredentialsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredentials",
}));

export type GetCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific custom domain association.
 */
export const getCustomDomainAssociation: API.OperationMethod<
  GetCustomDomainAssociationRequest,
  GetCustomDomainAssociationResponse,
  GetCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomDomainAssociationRequest,
  output: GetCustomDomainAssociationResponse,
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
  operationName: "GetCustomDomainAssociation",
}));

export type GetEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information, such as the name, about a VPC endpoint.
 */
export const getEndpointAccess: API.OperationMethod<
  GetEndpointAccessRequest,
  GetEndpointAccessResponse,
  GetEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEndpointAccessRequest,
  output: GetEndpointAccessResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpointAccess",
}));

export type GetIdentityCenterAuthTokenError =
  | AccessDeniedException
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an Identity Center authentication token for accessing Amazon Redshift Serverless workgroups.
 *
 * The token provides secure access to data within the specified workgroups using Identity Center identity propagation. The token expires after a specified duration and must be refreshed for continued access.
 *
 * The Identity and Access Management (IAM) user or role that runs GetIdentityCenterAuthToken must have appropriate permissions to access the specified workgroups and Identity Center integration must be configured for the workgroups.
 */
export const getIdentityCenterAuthToken: API.OperationMethod<
  GetIdentityCenterAuthTokenRequest,
  GetIdentityCenterAuthTokenResponse,
  GetIdentityCenterAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityCenterAuthTokenRequest,
  output: GetIdentityCenterAuthTokenResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityCenterAuthToken",
}));

export type GetNamespaceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a namespace in Amazon Redshift Serverless.
 */
export const getNamespace: API.OperationMethod<
  GetNamespaceRequest,
  GetNamespaceResponse,
  GetNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNamespaceRequest,
  output: GetNamespaceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamespace",
}));

export type GetRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a recovery point.
 */
export const getRecoveryPoint: API.OperationMethod<
  GetRecoveryPointRequest,
  GetRecoveryPointResponse,
  GetRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecoveryPointRequest,
  output: GetRecoveryPointResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPoint",
}));

export type GetReservationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Redshift Serverless reservation. A reservation gives you the option to commit to a specified number of Redshift Processing Units (RPUs) for a year at a discount from Serverless on-demand (OD) rates.
 */
export const getReservation: API.OperationMethod<
  GetReservationRequest,
  GetReservationResponse,
  GetReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReservationRequest,
  output: GetReservationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservation",
}));

export type GetReservationOfferingError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the reservation offering. The offering determines the payment schedule for the reservation.
 */
export const getReservationOffering: API.OperationMethod<
  GetReservationOfferingRequest,
  GetReservationOfferingResponse,
  GetReservationOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReservationOfferingRequest,
  output: GetReservationOfferingResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationOffering",
}));

export type GetResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a resource policy.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetScheduledActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a scheduled action.
 */
export const getScheduledAction: API.OperationMethod<
  GetScheduledActionRequest,
  GetScheduledActionResponse,
  GetScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetScheduledActionRequest,
  output: GetScheduledActionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduledAction",
}));

export type GetSnapshotError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific snapshot.
 */
export const getSnapshot: API.OperationMethod<
  GetSnapshotRequest,
  GetSnapshotResponse,
  GetSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSnapshotRequest,
  output: GetSnapshotResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshot",
}));

export type GetTableRestoreStatusError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a `TableRestoreStatus` object.
 */
export const getTableRestoreStatus: API.OperationMethod<
  GetTableRestoreStatusRequest,
  GetTableRestoreStatusResponse,
  GetTableRestoreStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableRestoreStatusRequest,
  output: GetTableRestoreStatusResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableRestoreStatus",
}));

export type GetTrackError =
  | AccessDeniedException
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the Redshift Serverless version for a specified track.
 */
export const getTrack: API.OperationMethod<
  GetTrackRequest,
  GetTrackResponse,
  GetTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrackRequest,
  output: GetTrackResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrack",
}));

export type GetUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a usage limit.
 */
export const getUsageLimit: API.OperationMethod<
  GetUsageLimitRequest,
  GetUsageLimitResponse,
  GetUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsageLimitRequest,
  output: GetUsageLimitResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageLimit",
}));

export type GetWorkgroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific workgroup.
 */
export const getWorkgroup: API.OperationMethod<
  GetWorkgroupRequest,
  GetWorkgroupResponse,
  GetWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkgroupRequest,
  output: GetWorkgroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkgroup",
}));

export type ListCustomDomainAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidPaginationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists custom domain associations for Amazon Redshift Serverless.
 */
export const listCustomDomainAssociations: API.PaginatedOperationMethod<
  ListCustomDomainAssociationsRequest,
  ListCustomDomainAssociationsResponse,
  ListCustomDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomDomainAssociationsRequest,
  output: ListCustomDomainAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidPaginationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomDomainAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEndpointAccessError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array of `EndpointAccess` objects and relevant information.
 */
export const listEndpointAccess: API.PaginatedOperationMethod<
  ListEndpointAccessRequest,
  ListEndpointAccessResponse,
  ListEndpointAccessError,
  Credentials | HttpClient.HttpClient,
  EndpointAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEndpointAccessRequest,
  output: ListEndpointAccessResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointAccess",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "endpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedWorkgroupsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Returns information about a list of specified managed workgroups in your account.
 */
export const listManagedWorkgroups: API.PaginatedOperationMethod<
  ListManagedWorkgroupsRequest,
  ListManagedWorkgroupsResponse,
  ListManagedWorkgroupsError,
  Credentials | HttpClient.HttpClient,
  ManagedWorkgroupListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedWorkgroupsRequest,
  output: ListManagedWorkgroupsResponse,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedWorkgroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedWorkgroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNamespacesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a list of specified namespaces.
 */
export const listNamespaces: API.PaginatedOperationMethod<
  ListNamespacesRequest,
  ListNamespacesResponse,
  ListNamespacesError,
  Credentials | HttpClient.HttpClient,
  Namespace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "namespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPointsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array of recovery points.
 */
export const listRecoveryPoints: API.PaginatedOperationMethod<
  ListRecoveryPointsRequest,
  ListRecoveryPointsResponse,
  ListRecoveryPointsError,
  Credentials | HttpClient.HttpClient,
  RecoveryPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryPointsRequest,
  output: ListRecoveryPointsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReservationOfferingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current reservation offerings in your account.
 */
export const listReservationOfferings: API.PaginatedOperationMethod<
  ListReservationOfferingsRequest,
  ListReservationOfferingsResponse,
  ListReservationOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservationOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReservationOfferingsRequest,
  output: ListReservationOfferingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservationOfferings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationOfferingsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReservationsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Reservation objects.
 */
export const listReservations: API.PaginatedOperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReservationsRequest,
  output: ListReservationsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reservationsList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledActionsError =
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of scheduled actions. You can use the flags to filter the list of returned scheduled actions.
 */
export const listScheduledActions: API.PaginatedOperationMethod<
  ListScheduledActionsRequest,
  ListScheduledActionsResponse,
  ListScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledActionAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScheduledActionsRequest,
  output: ListScheduledActionsResponse,
  errors: [
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSnapshotCopyConfigurationsError =
  | ConflictException
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of snapshot copy configurations.
 */
export const listSnapshotCopyConfigurations: API.PaginatedOperationMethod<
  ListSnapshotCopyConfigurationsRequest,
  ListSnapshotCopyConfigurationsResponse,
  ListSnapshotCopyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SnapshotCopyConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSnapshotCopyConfigurationsRequest,
  output: ListSnapshotCopyConfigurationsResponse,
  errors: [
    ConflictException,
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshotCopyConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshotCopyConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSnapshotsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of snapshots.
 */
export const listSnapshots: API.PaginatedOperationMethod<
  ListSnapshotsRequest,
  ListSnapshotsResponse,
  ListSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSnapshotsRequest,
  output: ListSnapshotsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTableRestoreStatusError =
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an array of `TableRestoreStatus` objects.
 */
export const listTableRestoreStatus: API.PaginatedOperationMethod<
  ListTableRestoreStatusRequest,
  ListTableRestoreStatusResponse,
  ListTableRestoreStatusError,
  Credentials | HttpClient.HttpClient,
  TableRestoreStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTableRestoreStatusRequest,
  output: ListTableRestoreStatusResponse,
  errors: [
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableRestoreStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tableRestoreStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to a resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTracksError =
  | AccessDeniedException
  | InternalServerException
  | InvalidPaginationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the Amazon Redshift Serverless versions.
 */
export const listTracks: API.PaginatedOperationMethod<
  ListTracksRequest,
  ListTracksResponse,
  ListTracksError,
  Credentials | HttpClient.HttpClient,
  ServerlessTrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTracksRequest,
  output: ListTracksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidPaginationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTracks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tracks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsageLimitsError =
  | ConflictException
  | InternalServerException
  | InvalidPaginationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all usage limits within Amazon Redshift Serverless.
 */
export const listUsageLimits: API.PaginatedOperationMethod<
  ListUsageLimitsRequest,
  ListUsageLimitsResponse,
  ListUsageLimitsError,
  Credentials | HttpClient.HttpClient,
  UsageLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsageLimitsRequest,
  output: ListUsageLimitsResponse,
  errors: [
    ConflictException,
    InternalServerException,
    InvalidPaginationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageLimits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "usageLimits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkgroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a list of specified workgroups.
 */
export const listWorkgroups: API.PaginatedOperationMethod<
  ListWorkgroupsRequest,
  ListWorkgroupsResponse,
  ListWorkgroupsError,
  Credentials | HttpClient.HttpClient,
  Workgroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkgroupsRequest,
  output: ListWorkgroupsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkgroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workgroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource policy. Currently, you can use policies to share snapshots across Amazon Web Services accounts.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RestoreFromRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restore the data from a recovery point.
 */
export const restoreFromRecoveryPoint: API.OperationMethod<
  RestoreFromRecoveryPointRequest,
  RestoreFromRecoveryPointResponse,
  RestoreFromRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreFromRecoveryPointRequest,
  output: RestoreFromRecoveryPointResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromRecoveryPoint",
}));

export type RestoreFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Restores a namespace from a snapshot.
 */
export const restoreFromSnapshot: API.OperationMethod<
  RestoreFromSnapshotRequest,
  RestoreFromSnapshotResponse,
  RestoreFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreFromSnapshotRequest,
  output: RestoreFromSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromSnapshot",
}));

export type RestoreTableFromRecoveryPointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restores a table from a recovery point to your Amazon Redshift Serverless instance. You can't use this operation to restore tables with interleaved sort keys.
 */
export const restoreTableFromRecoveryPoint: API.OperationMethod<
  RestoreTableFromRecoveryPointRequest,
  RestoreTableFromRecoveryPointResponse,
  RestoreTableFromRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableFromRecoveryPointRequest,
  output: RestoreTableFromRecoveryPointResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromRecoveryPoint",
}));

export type RestoreTableFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Restores a table from a snapshot to your Amazon Redshift Serverless instance. You can't use this operation to restore tables with interleaved sort keys.
 */
export const restoreTableFromSnapshot: API.OperationMethod<
  RestoreTableFromSnapshotRequest,
  RestoreTableFromSnapshotResponse,
  RestoreTableFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableFromSnapshotRequest,
  output: RestoreTableFromSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromSnapshot",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags to a resource.
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
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or set of tags from a resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCustomDomainAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Redshift Serverless certificate associated with a custom domain.
 */
export const updateCustomDomainAssociation: API.OperationMethod<
  UpdateCustomDomainAssociationRequest,
  UpdateCustomDomainAssociationResponse,
  UpdateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomDomainAssociationRequest,
  output: UpdateCustomDomainAssociationResponse,
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
  operationName: "UpdateCustomDomainAssociation",
}));

export type UpdateEndpointAccessError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Redshift Serverless managed endpoint.
 */
export const updateEndpointAccess: API.OperationMethod<
  UpdateEndpointAccessRequest,
  UpdateEndpointAccessResponse,
  UpdateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEndpointAccessRequest,
  output: UpdateEndpointAccessResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointAccess",
}));

export type UpdateLakehouseConfigurationError =
  | ConflictException
  | DryRunException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the lakehouse configuration for a namespace. This operation allows you to manage Amazon Redshift federated permissions and Amazon Web Services IAM Identity Center trusted identity propagation.
 */
export const updateLakehouseConfiguration: API.OperationMethod<
  UpdateLakehouseConfigurationRequest,
  UpdateLakehouseConfigurationResponse,
  UpdateLakehouseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLakehouseConfigurationRequest,
  output: UpdateLakehouseConfigurationResponse,
  errors: [
    ConflictException,
    DryRunException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLakehouseConfiguration",
}));

export type UpdateNamespaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a namespace with the specified settings. Unless required, you can't update multiple parameters in one request. For example, you must specify both `adminUsername` and `adminUserPassword` to update either field, but you can't update both `kmsKeyId` and `logExports` in a single request.
 *
 * Similarly, an S3 Tables log-publishing update (a request where `logDestinationType` is `s3table`) cannot be combined with any other namespace configuration change and must be submitted as its own request.
 */
export const updateNamespace: API.OperationMethod<
  UpdateNamespaceRequest,
  UpdateNamespaceResponse,
  UpdateNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNamespaceRequest,
  output: UpdateNamespaceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamespace",
}));

export type UpdateScheduledActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a scheduled action.
 */
export const updateScheduledAction: API.OperationMethod<
  UpdateScheduledActionRequest,
  UpdateScheduledActionResponse,
  UpdateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScheduledActionRequest,
  output: UpdateScheduledActionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAction",
}));

export type UpdateSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a snapshot.
 */
export const updateSnapshot: API.OperationMethod<
  UpdateSnapshotRequest,
  UpdateSnapshotResponse,
  UpdateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSnapshotRequest,
  output: UpdateSnapshotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
}));

export type UpdateSnapshotCopyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a snapshot copy configuration.
 */
export const updateSnapshotCopyConfiguration: API.OperationMethod<
  UpdateSnapshotCopyConfigurationRequest,
  UpdateSnapshotCopyConfigurationResponse,
  UpdateSnapshotCopyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSnapshotCopyConfigurationRequest,
  output: UpdateSnapshotCopyConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshotCopyConfiguration",
}));

export type UpdateUsageLimitError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update a usage limit in Amazon Redshift Serverless. You can't update the usage type or period of a usage limit.
 */
export const updateUsageLimit: API.OperationMethod<
  UpdateUsageLimitRequest,
  UpdateUsageLimitResponse,
  UpdateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUsageLimitRequest,
  output: UpdateUsageLimitResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsageLimit",
}));

export type UpdateWorkgroupError =
  | ConflictException
  | InsufficientCapacityException
  | InternalServerException
  | Ipv6CidrBlockNotFoundException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a workgroup with the specified configuration settings. You can't update multiple parameters in one request. For example, you can update `baseCapacity` or `port` in a single request, but you can't update both in the same request.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that you own in a Region from reaching or being reached from the internet through internet gateways and egress-only internet gateways. If a workgroup is in an account with VPC BPA turned on, the following capabilities are blocked:
 *
 * - Creating a public access workgroup
 *
 * - Modifying a private workgroup to public
 *
 * - Adding a subnet with VPC BPA turned on to the workgroup when the workgroup is public
 *
 * For more information about VPC BPA, see Block public access to VPCs and subnets in the *Amazon VPC User Guide*.
 */
export const updateWorkgroup: API.OperationMethod<
  UpdateWorkgroupRequest,
  UpdateWorkgroupResponse,
  UpdateWorkgroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkgroupRequest,
  output: UpdateWorkgroupResponse,
  errors: [
    ConflictException,
    InsufficientCapacityException,
    InternalServerException,
    Ipv6CidrBlockNotFoundException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkgroup",
}));
