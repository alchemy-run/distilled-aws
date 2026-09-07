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
  sdkId: "WorkSpaces Thin Client",
  serviceShapeName: "ThinClient",
});
const auth = T.AwsAuthSigv4({ name: "thinclient" });
const ver = T.ServiceVersion("2023-08-22");
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
              `https://thinclient-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://thinclient-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://thinclient.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://thinclient.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
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
export type EnvironmentName = string | redacted.Redacted<string>;
export type Arn = string;
export type DesktopEndpoint = string | redacted.Redacted<string>;
export type SoftwareSetUpdateSchedule =
  | "USE_MAINTENANCE_WINDOW"
  | "APPLY_IMMEDIATELY"
  | (string & {});
export const SoftwareSetUpdateSchedule = /*@__PURE__*/ S.String;

export type MaintenanceWindowType = "SYSTEM" | "CUSTOM" | (string & {});
export const MaintenanceWindowType = /*@__PURE__*/ S.String;

export type Hour = number;
export type Minute = number;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const DayOfWeek = /*@__PURE__*/ S.String;

export type DayOfWeekList = DayOfWeek[];
export const DayOfWeekList = /*@__PURE__*/ S.Array(DayOfWeek);
export type ApplyTimeOf = "UTC" | "DEVICE" | (string & {});
export const ApplyTimeOf = /*@__PURE__*/ S.String;

export interface MaintenanceWindow {
  type: MaintenanceWindowType;
  startTimeHour?: number;
  startTimeMinute?: number;
  endTimeHour?: number;
  endTimeMinute?: number;
  daysOfTheWeek?: DayOfWeek[];
  applyTimeOf?: ApplyTimeOf;
}
export const MaintenanceWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: MaintenanceWindowType,
    startTimeHour: S.optional(S.Number),
    startTimeMinute: S.optional(S.Number),
    endTimeHour: S.optional(S.Number),
    endTimeMinute: S.optional(S.Number),
    daysOfTheWeek: S.optional(DayOfWeekList),
    applyTimeOf: S.optional(ApplyTimeOf),
  }),
).annotate({
  identifier: "MaintenanceWindow",
}) as any as S.Schema<MaintenanceWindow>;
export type SoftwareSetUpdateMode =
  | "USE_LATEST"
  | "USE_DESIRED"
  | (string & {});
export const SoftwareSetUpdateMode = /*@__PURE__*/ S.String;

export type SoftwareSetId = string;
export type KmsKeyArn = string;
export type ClientToken = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DeviceCreationTagKey = string;
export type DeviceCreationTagValue = string;
export type DeviceCreationTagsMap = { [key: string]: string | undefined };
export const DeviceCreationTagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateEnvironmentRequest {
  name?: string | redacted.Redacted<string>;
  desktopArn: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  kmsKeyArn?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  deviceCreationTags?: { [key: string]: string | undefined };
}
export const CreateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SensitiveString),
    desktopArn: S.String,
    desktopEndpoint: S.optional(SensitiveString),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    maintenanceWindow: S.optional(MaintenanceWindow),
    softwareSetUpdateMode: S.optional(SoftwareSetUpdateMode),
    desiredSoftwareSetId: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagsMap),
    deviceCreationTags: S.optional(DeviceCreationTagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export type EnvironmentId = string;
export type DesktopType =
  | "workspaces"
  | "appstream"
  | "workspaces-web"
  | (string & {});
export const DesktopType = /*@__PURE__*/ S.String;

export type ActivationCode = string | redacted.Redacted<string>;
export interface EnvironmentSummary {
  id?: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  desktopType?: DesktopType;
  activationCode?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
}
export const EnvironmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(SensitiveString),
    desktopArn: S.optional(S.String),
    desktopEndpoint: S.optional(SensitiveString),
    desktopType: S.optional(DesktopType),
    activationCode: S.optional(SensitiveString),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    maintenanceWindow: S.optional(MaintenanceWindow),
    softwareSetUpdateMode: S.optional(SoftwareSetUpdateMode),
    desiredSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export interface CreateEnvironmentResponse {
  environment?: EnvironmentSummary;
}
export const CreateEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(EnvironmentSummary) }),
).annotate({
  identifier: "CreateEnvironmentResponse",
}) as any as S.Schema<CreateEnvironmentResponse>;
export type DeviceId = string;
export interface DeleteDeviceRequest {
  id: string;
  clientToken?: string;
}
export const DeleteDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/devices/{id}" }),
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
export interface DeleteDeviceResponse {}
export const DeleteDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeviceResponse",
}) as any as S.Schema<DeleteDeviceResponse>;
export interface DeleteEnvironmentRequest {
  id: string;
  clientToken?: string;
}
export const DeleteEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/environments/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export type TargetDeviceStatus = "DEREGISTERED" | "ARCHIVED" | (string & {});
export const TargetDeviceStatus = /*@__PURE__*/ S.String;

export interface DeregisterDeviceRequest {
  id: string;
  targetDeviceStatus?: TargetDeviceStatus;
  clientToken?: string;
}
export const DeregisterDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    targetDeviceStatus: S.optional(TargetDeviceStatus),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deregister-device/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterDeviceRequest",
}) as any as S.Schema<DeregisterDeviceRequest>;
export interface DeregisterDeviceResponse {}
export const DeregisterDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterDeviceResponse",
}) as any as S.Schema<DeregisterDeviceResponse>;
export interface GetDeviceRequest {
  id: string;
}
export const GetDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/devices/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceRequest",
}) as any as S.Schema<GetDeviceRequest>;
export type DeviceName = string | redacted.Redacted<string>;
export type DeviceStatus =
  | "REGISTERED"
  | "DEREGISTERING"
  | "DEREGISTERED"
  | "ARCHIVED"
  | (string & {});
export const DeviceStatus = /*@__PURE__*/ S.String;

export type DeviceSoftwareSetComplianceStatus =
  | "NONE"
  | "COMPLIANT"
  | "NOT_COMPLIANT"
  | (string & {});
export const DeviceSoftwareSetComplianceStatus = /*@__PURE__*/ S.String;

export type SoftwareSetUpdateStatus =
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "UP_TO_DATE"
  | (string & {});
export const SoftwareSetUpdateStatus = /*@__PURE__*/ S.String;

export type UserId = string | redacted.Redacted<string>;
export interface Device {
  id?: string;
  serialNumber?: string;
  name?: string | redacted.Redacted<string>;
  model?: string;
  environmentId?: string;
  status?: DeviceStatus;
  currentSoftwareSetId?: string;
  currentSoftwareSetVersion?: string;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  pendingSoftwareSetVersion?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  softwareSetComplianceStatus?: DeviceSoftwareSetComplianceStatus;
  softwareSetUpdateStatus?: SoftwareSetUpdateStatus;
  lastConnectedAt?: Date;
  lastPostureAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  kmsKeyArn?: string;
  lastUserId?: string | redacted.Redacted<string>;
}
export const Device = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    serialNumber: S.optional(S.String),
    name: S.optional(SensitiveString),
    model: S.optional(S.String),
    environmentId: S.optional(S.String),
    status: S.optional(DeviceStatus),
    currentSoftwareSetId: S.optional(S.String),
    currentSoftwareSetVersion: S.optional(S.String),
    desiredSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetVersion: S.optional(S.String),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    softwareSetComplianceStatus: S.optional(DeviceSoftwareSetComplianceStatus),
    softwareSetUpdateStatus: S.optional(SoftwareSetUpdateStatus),
    lastConnectedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastPostureAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    lastUserId: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Device" }) as any as S.Schema<Device>;
export interface GetDeviceResponse {
  device?: Device;
}
export const GetDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ device: S.optional(Device) }),
).annotate({
  identifier: "GetDeviceResponse",
}) as any as S.Schema<GetDeviceResponse>;
export interface GetEnvironmentRequest {
  id: string;
}
export const GetEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export type EnvironmentSoftwareSetComplianceStatus =
  | "NO_REGISTERED_DEVICES"
  | "COMPLIANT"
  | "NOT_COMPLIANT"
  | (string & {});
export const EnvironmentSoftwareSetComplianceStatus = /*@__PURE__*/ S.String;

export interface Environment {
  id?: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  desktopType?: DesktopType;
  activationCode?: string | redacted.Redacted<string>;
  registeredDevicesCount?: number;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  pendingSoftwareSetVersion?: string;
  softwareSetComplianceStatus?: EnvironmentSoftwareSetComplianceStatus;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  kmsKeyArn?: string;
  deviceCreationTags?: { [key: string]: string | undefined };
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(SensitiveString),
    desktopArn: S.optional(S.String),
    desktopEndpoint: S.optional(SensitiveString),
    desktopType: S.optional(DesktopType),
    activationCode: S.optional(SensitiveString),
    registeredDevicesCount: S.optional(S.Number),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    maintenanceWindow: S.optional(MaintenanceWindow),
    softwareSetUpdateMode: S.optional(SoftwareSetUpdateMode),
    desiredSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetVersion: S.optional(S.String),
    softwareSetComplianceStatus: S.optional(
      EnvironmentSoftwareSetComplianceStatus,
    ),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
    kmsKeyArn: S.optional(S.String),
    deviceCreationTags: S.optional(DeviceCreationTagsMap),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export const GetEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export interface GetSoftwareSetRequest {
  id: string;
}
export const GetSoftwareSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/softwaresets/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSoftwareSetRequest",
}) as any as S.Schema<GetSoftwareSetRequest>;
export type SoftwareSetValidationStatus =
  | "VALIDATED"
  | "NOT_VALIDATED"
  | (string & {});
export const SoftwareSetValidationStatus = /*@__PURE__*/ S.String;

export interface Software {
  name?: string;
  version?: string;
}
export const Software = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), version: S.optional(S.String) }),
).annotate({ identifier: "Software" }) as any as S.Schema<Software>;
export type SoftwareList = Software[];
export const SoftwareList = /*@__PURE__*/ S.Array(Software);
export interface SoftwareSet {
  id?: string;
  version?: string;
  releasedAt?: Date;
  supportedUntil?: Date;
  validationStatus?: SoftwareSetValidationStatus;
  software?: Software[];
  arn?: string;
}
export const SoftwareSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    version: S.optional(S.String),
    releasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    supportedUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    validationStatus: S.optional(SoftwareSetValidationStatus),
    software: S.optional(SoftwareList),
    arn: S.optional(S.String),
  }),
).annotate({ identifier: "SoftwareSet" }) as any as S.Schema<SoftwareSet>;
export interface GetSoftwareSetResponse {
  softwareSet?: SoftwareSet;
}
export const GetSoftwareSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ softwareSet: S.optional(SoftwareSet) }),
).annotate({
  identifier: "GetSoftwareSetResponse",
}) as any as S.Schema<GetSoftwareSetResponse>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListDevicesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
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
export interface DeviceSummary {
  id?: string;
  serialNumber?: string;
  name?: string | redacted.Redacted<string>;
  model?: string;
  environmentId?: string;
  status?: DeviceStatus;
  currentSoftwareSetId?: string;
  desiredSoftwareSetId?: string;
  pendingSoftwareSetId?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  lastConnectedAt?: Date;
  lastPostureAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  arn?: string;
  lastUserId?: string | redacted.Redacted<string>;
}
export const DeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    serialNumber: S.optional(S.String),
    name: S.optional(SensitiveString),
    model: S.optional(S.String),
    environmentId: S.optional(S.String),
    status: S.optional(DeviceStatus),
    currentSoftwareSetId: S.optional(S.String),
    desiredSoftwareSetId: S.optional(S.String),
    pendingSoftwareSetId: S.optional(S.String),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    lastConnectedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastPostureAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
    lastUserId: S.optional(SensitiveString),
  }),
).annotate({ identifier: "DeviceSummary" }) as any as S.Schema<DeviceSummary>;
export type DeviceList = DeviceSummary[];
export const DeviceList = /*@__PURE__*/ S.Array(DeviceSummary);
export interface ListDevicesResponse {
  devices?: DeviceSummary[];
  nextToken?: string;
}
export const ListDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    devices: S.optional(DeviceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevicesResponse",
}) as any as S.Schema<ListDevicesResponse>;
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export type EnvironmentList = EnvironmentSummary[];
export const EnvironmentList = /*@__PURE__*/ S.Array(EnvironmentSummary);
export interface ListEnvironmentsResponse {
  environments?: EnvironmentSummary[];
  nextToken?: string;
}
export const ListEnvironmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    environments: S.optional(EnvironmentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
export interface ListSoftwareSetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListSoftwareSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/softwaresets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSoftwareSetsRequest",
}) as any as S.Schema<ListSoftwareSetsRequest>;
export interface SoftwareSetSummary {
  id?: string;
  version?: string;
  releasedAt?: Date;
  supportedUntil?: Date;
  validationStatus?: SoftwareSetValidationStatus;
  arn?: string;
}
export const SoftwareSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    version: S.optional(S.String),
    releasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    supportedUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    validationStatus: S.optional(SoftwareSetValidationStatus),
    arn: S.optional(S.String),
  }),
).annotate({
  identifier: "SoftwareSetSummary",
}) as any as S.Schema<SoftwareSetSummary>;
export type SoftwareSetList = SoftwareSetSummary[];
export const SoftwareSetList = /*@__PURE__*/ S.Array(SoftwareSetSummary);
export interface ListSoftwareSetsResponse {
  softwareSets?: SoftwareSetSummary[];
  nextToken?: string;
}
export const ListSoftwareSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    softwareSets: S.optional(SoftwareSetList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSoftwareSetsResponse",
}) as any as S.Schema<ListSoftwareSetsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export interface UpdateDeviceRequest {
  id: string;
  name?: string | redacted.Redacted<string>;
  desiredSoftwareSetId?: string;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
}
export const UpdateDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(SensitiveString),
    desiredSoftwareSetId: S.optional(S.String),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/devices/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeviceRequest",
}) as any as S.Schema<UpdateDeviceRequest>;
export interface UpdateDeviceResponse {
  device?: DeviceSummary;
}
export const UpdateDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ device: S.optional(DeviceSummary) }),
).annotate({
  identifier: "UpdateDeviceResponse",
}) as any as S.Schema<UpdateDeviceResponse>;
export type SoftwareSetIdOrEmptyString = string;
export interface UpdateEnvironmentRequest {
  id: string;
  name?: string | redacted.Redacted<string>;
  desktopArn?: string;
  desktopEndpoint?: string | redacted.Redacted<string>;
  softwareSetUpdateSchedule?: SoftwareSetUpdateSchedule;
  maintenanceWindow?: MaintenanceWindow;
  softwareSetUpdateMode?: SoftwareSetUpdateMode;
  desiredSoftwareSetId?: string;
  deviceCreationTags?: { [key: string]: string | undefined };
}
export const UpdateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    name: S.optional(SensitiveString),
    desktopArn: S.optional(S.String),
    desktopEndpoint: S.optional(SensitiveString),
    softwareSetUpdateSchedule: S.optional(SoftwareSetUpdateSchedule),
    maintenanceWindow: S.optional(MaintenanceWindow),
    softwareSetUpdateMode: S.optional(SoftwareSetUpdateMode),
    desiredSoftwareSetId: S.optional(S.String),
    deviceCreationTags: S.optional(DeviceCreationTagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/environments/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentRequest",
}) as any as S.Schema<UpdateEnvironmentRequest>;
export interface UpdateEnvironmentResponse {
  environment?: EnvironmentSummary;
}
export const UpdateEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ environment: S.optional(EnvironmentSummary) }),
).annotate({
  identifier: "UpdateEnvironmentResponse",
}) as any as S.Schema<UpdateEnvironmentResponse>;
export interface UpdateSoftwareSetRequest {
  id: string;
  validationStatus: SoftwareSetValidationStatus;
}
export const UpdateSoftwareSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    validationStatus: SoftwareSetValidationStatus,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/softwaresets/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSoftwareSetRequest",
}) as any as S.Schema<UpdateSoftwareSetRequest>;
export interface UpdateSoftwareSetResponse {}
export const UpdateSoftwareSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSoftwareSetResponse",
}) as any as S.Schema<UpdateSoftwareSetResponse>;
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type RetryAfterSeconds = number;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type FieldName = string;
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
export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an environment for your thin client devices.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: CreateEnvironmentResponse,
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
  operationName: "CreateEnvironment",
  endpointHostPrefix: "api.",
}));

export type DeleteDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a thin client device.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevice",
  endpointHostPrefix: "api.",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
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
  operationName: "DeleteEnvironment",
  endpointHostPrefix: "api.",
}));

export type DeregisterDeviceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a thin client device.
 */
export const deregisterDevice: API.OperationMethod<
  DeregisterDeviceRequest,
  DeregisterDeviceResponse,
  DeregisterDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterDeviceRequest,
  output: DeregisterDeviceResponse,
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
  operationName: "DeregisterDevice",
  endpointHostPrefix: "api.",
}));

export type GetDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for a thin client device.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceRequest,
  output: GetDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
  endpointHostPrefix: "api.",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for an environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  endpointHostPrefix: "api.",
}));

export type GetSoftwareSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information for a software set.
 */
export const getSoftwareSet: API.OperationMethod<
  GetSoftwareSetRequest,
  GetSoftwareSetResponse,
  GetSoftwareSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSoftwareSetRequest,
  output: GetSoftwareSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareSet",
  endpointHostPrefix: "api.",
}));

export type ListDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of thin client devices.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSoftwareSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of software sets.
 */
export const listSoftwareSets: API.PaginatedOperationMethod<
  ListSoftwareSetsRequest,
  ListSoftwareSetsResponse,
  ListSoftwareSetsError,
  Credentials | HttpClient.HttpClient,
  SoftwareSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSoftwareSetsRequest,
  output: ListSoftwareSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSoftwareSets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "softwareSets",
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
}));

export type UpdateDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a thin client device.
 */
export const updateDevice: API.OperationMethod<
  UpdateDeviceRequest,
  UpdateDeviceResponse,
  UpdateDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeviceRequest,
  output: UpdateDeviceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevice",
  endpointHostPrefix: "api.",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentRequest,
  output: UpdateEnvironmentResponse,
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
  operationName: "UpdateEnvironment",
  endpointHostPrefix: "api.",
}));

export type UpdateSoftwareSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a software set.
 */
export const updateSoftwareSet: API.OperationMethod<
  UpdateSoftwareSetRequest,
  UpdateSoftwareSetResponse,
  UpdateSoftwareSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSoftwareSetRequest,
  output: UpdateSoftwareSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSoftwareSet",
  endpointHostPrefix: "api.",
}));
