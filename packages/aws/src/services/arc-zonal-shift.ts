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
  sdkId: "ARC Zonal Shift",
  serviceShapeName: "PercDataPlane",
});
const auth = T.AwsAuthSigv4({ name: "arc-zonal-shift" });
const ver = T.ServiceVersion("2022-10-30");
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
              `https://arc-zonal-shift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://arc-zonal-shift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://arc-zonal-shift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ConflictExceptionReason).annotate({
        identifier: "ConflictExceptionReason",
      }),
      zonalShiftId: S.optional(S.String),
    },
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
    { message: S.String.pipe(T.ErrorMessage()) },
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ZonalShiftId = string;
export interface CancelPracticeRunRequest {
  zonalShiftId: string;
}
export const CancelPracticeRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/practiceruns/{zonalShiftId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelPracticeRunRequest",
}) as any as S.Schema<CancelPracticeRunRequest>;
export type ResourceIdentifier = string;
export type AvailabilityZone = string;
export type ExpiryTime = Date;
export type StartTime = Date;
export type ZonalShiftStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELED"
  | (string & {});
export const ZonalShiftStatus = /*@__PURE__*/ S.String;

export type ZonalShiftComment = string;
export interface CancelPracticeRunResponse {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export const CancelPracticeRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    zonalShiftId: S.String,
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ZonalShiftStatus,
    comment: S.String,
  }),
).annotate({
  identifier: "CancelPracticeRunResponse",
}) as any as S.Schema<CancelPracticeRunResponse>;
export interface CancelZonalShiftRequest {
  zonalShiftId: string;
}
export const CancelZonalShiftRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/zonalshifts/{zonalShiftId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelZonalShiftRequest",
}) as any as S.Schema<CancelZonalShiftRequest>;
export interface ZonalShift {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export const ZonalShift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    zonalShiftId: S.String,
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ZonalShiftStatus,
    comment: S.String,
  }),
).annotate({ identifier: "ZonalShift" }) as any as S.Schema<ZonalShift>;
export type BlockedWindow = string;
export type BlockedWindows = string[];
export const BlockedWindows = /*@__PURE__*/ S.Array(S.String);
export type BlockedDate = string;
export type BlockedDates = string[];
export const BlockedDates = /*@__PURE__*/ S.Array(S.String);
export type ControlConditionType = "CLOUDWATCH" | (string & {});
export const ControlConditionType = /*@__PURE__*/ S.String;

export type MetricIdentifier = string;
export interface ControlCondition {
  type: ControlConditionType;
  alarmIdentifier: string;
}
export const ControlCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: ControlConditionType, alarmIdentifier: S.String }),
).annotate({
  identifier: "ControlCondition",
}) as any as S.Schema<ControlCondition>;
export type BlockingAlarms = ControlCondition[];
export const BlockingAlarms = /*@__PURE__*/ S.Array(ControlCondition);
export type AllowedWindow = string;
export type AllowedWindows = string[];
export const AllowedWindows = /*@__PURE__*/ S.Array(S.String);
export type OutcomeAlarms = ControlCondition[];
export const OutcomeAlarms = /*@__PURE__*/ S.Array(ControlCondition);
export interface CreatePracticeRunConfigurationRequest {
  resourceIdentifier: string;
  blockedWindows?: string[];
  blockedDates?: string[];
  blockingAlarms?: ControlCondition[];
  allowedWindows?: string[];
  outcomeAlarms: ControlCondition[];
}
export const CreatePracticeRunConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceIdentifier: S.String,
      blockedWindows: S.optional(BlockedWindows),
      blockedDates: S.optional(BlockedDates),
      blockingAlarms: S.optional(BlockingAlarms),
      allowedWindows: S.optional(AllowedWindows),
      outcomeAlarms: OutcomeAlarms,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePracticeRunConfigurationRequest",
}) as any as S.Schema<CreatePracticeRunConfigurationRequest>;
export type ResourceArn = string;
export type ResourceName = string;
export type ZonalAutoshiftStatus = "ENABLED" | "DISABLED" | (string & {});
export const ZonalAutoshiftStatus = /*@__PURE__*/ S.String;

export interface PracticeRunConfiguration {
  blockingAlarms?: ControlCondition[];
  outcomeAlarms: ControlCondition[];
  blockedWindows?: string[];
  allowedWindows?: string[];
  blockedDates?: string[];
}
export const PracticeRunConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blockingAlarms: S.optional(BlockingAlarms),
    outcomeAlarms: OutcomeAlarms,
    blockedWindows: S.optional(BlockedWindows),
    allowedWindows: S.optional(AllowedWindows),
    blockedDates: S.optional(BlockedDates),
  }),
).annotate({
  identifier: "PracticeRunConfiguration",
}) as any as S.Schema<PracticeRunConfiguration>;
export interface CreatePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
  practiceRunConfiguration: PracticeRunConfiguration;
}
export const CreatePracticeRunConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      name: S.String,
      zonalAutoshiftStatus: ZonalAutoshiftStatus,
      practiceRunConfiguration: PracticeRunConfiguration,
    }),
).annotate({
  identifier: "CreatePracticeRunConfigurationResponse",
}) as any as S.Schema<CreatePracticeRunConfigurationResponse>;
export interface DeletePracticeRunConfigurationRequest {
  resourceIdentifier: string;
}
export const DeletePracticeRunConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/configuration/{resourceIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeletePracticeRunConfigurationRequest",
}) as any as S.Schema<DeletePracticeRunConfigurationRequest>;
export interface DeletePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export const DeletePracticeRunConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      name: S.String,
      zonalAutoshiftStatus: ZonalAutoshiftStatus,
    }),
).annotate({
  identifier: "DeletePracticeRunConfigurationResponse",
}) as any as S.Schema<DeletePracticeRunConfigurationResponse>;
export interface GetAutoshiftObserverNotificationStatusRequest {}
export const GetAutoshiftObserverNotificationStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/autoshift-observer-notification" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAutoshiftObserverNotificationStatusRequest",
  }) as any as S.Schema<GetAutoshiftObserverNotificationStatusRequest>;
export type AutoshiftObserverNotificationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AutoshiftObserverNotificationStatus = /*@__PURE__*/ S.String;

export interface GetAutoshiftObserverNotificationStatusResponse {
  status: AutoshiftObserverNotificationStatus;
}
export const GetAutoshiftObserverNotificationStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ status: AutoshiftObserverNotificationStatus }),
  ).annotate({
    identifier: "GetAutoshiftObserverNotificationStatusResponse",
  }) as any as S.Schema<GetAutoshiftObserverNotificationStatusResponse>;
export interface GetManagedResourceRequest {
  resourceIdentifier: string;
}
export const GetManagedResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managedresources/{resourceIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedResourceRequest",
}) as any as S.Schema<GetManagedResourceRequest>;
export type Weight = number;
export type AppliedWeights = { [key: string]: number | undefined };
export const AppliedWeights = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type AppliedStatus = "APPLIED" | "NOT_APPLIED" | (string & {});
export const AppliedStatus = /*@__PURE__*/ S.String;

export type ShiftType =
  | "ZONAL_SHIFT"
  | "PRACTICE_RUN"
  | "FIS_EXPERIMENT"
  | "ZONAL_AUTOSHIFT"
  | (string & {});
export const ShiftType = /*@__PURE__*/ S.String;

export type PracticeRunOutcome =
  | "FAILED"
  | "INTERRUPTED"
  | "PENDING"
  | "SUCCEEDED"
  | "CAPACITY_CHECK_FAILED"
  | (string & {});
export const PracticeRunOutcome = /*@__PURE__*/ S.String;

export interface ZonalShiftInResource {
  appliedStatus: AppliedStatus;
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  comment: string;
  shiftType?: ShiftType;
  practiceRunOutcome?: PracticeRunOutcome;
}
export const ZonalShiftInResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appliedStatus: AppliedStatus,
    zonalShiftId: S.String,
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    comment: S.String,
    shiftType: S.optional(ShiftType),
    practiceRunOutcome: S.optional(PracticeRunOutcome),
  }),
).annotate({
  identifier: "ZonalShiftInResource",
}) as any as S.Schema<ZonalShiftInResource>;
export type ZonalShiftsInResource = ZonalShiftInResource[];
export const ZonalShiftsInResource =
  /*@__PURE__*/ S.Array(ZonalShiftInResource);
export type AutoshiftAppliedStatus = "APPLIED" | "NOT_APPLIED" | (string & {});
export const AutoshiftAppliedStatus = /*@__PURE__*/ S.String;

export interface AutoshiftInResource {
  appliedStatus: AutoshiftAppliedStatus;
  awayFrom: string;
  startTime: Date;
}
export const AutoshiftInResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appliedStatus: AutoshiftAppliedStatus,
    awayFrom: S.String,
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "AutoshiftInResource",
}) as any as S.Schema<AutoshiftInResource>;
export type AutoshiftsInResource = AutoshiftInResource[];
export const AutoshiftsInResource = /*@__PURE__*/ S.Array(AutoshiftInResource);
export interface GetManagedResourceResponse {
  arn?: string;
  name?: string;
  appliedWeights: { [key: string]: number | undefined };
  zonalShifts: ZonalShiftInResource[];
  autoshifts?: AutoshiftInResource[];
  practiceRunConfiguration?: PracticeRunConfiguration;
  zonalAutoshiftStatus?: ZonalAutoshiftStatus;
}
export const GetManagedResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    appliedWeights: AppliedWeights,
    zonalShifts: ZonalShiftsInResource,
    autoshifts: S.optional(AutoshiftsInResource),
    practiceRunConfiguration: S.optional(PracticeRunConfiguration),
    zonalAutoshiftStatus: S.optional(ZonalAutoshiftStatus),
  }),
).annotate({
  identifier: "GetManagedResourceResponse",
}) as any as S.Schema<GetManagedResourceResponse>;
export type AutoshiftExecutionStatus = "ACTIVE" | "COMPLETED" | (string & {});
export const AutoshiftExecutionStatus = /*@__PURE__*/ S.String;

export type MaxResults = number;
export interface ListAutoshiftsRequest {
  nextToken?: string;
  status?: AutoshiftExecutionStatus;
  maxResults?: number;
}
export const ListAutoshiftsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(AutoshiftExecutionStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/autoshifts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAutoshiftsRequest",
}) as any as S.Schema<ListAutoshiftsRequest>;
export interface AutoshiftSummary {
  awayFrom: string;
  endTime?: Date;
  startTime: Date;
  status: AutoshiftExecutionStatus;
}
export const AutoshiftSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awayFrom: S.String,
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: AutoshiftExecutionStatus,
  }),
).annotate({
  identifier: "AutoshiftSummary",
}) as any as S.Schema<AutoshiftSummary>;
export type AutoshiftSummaries = AutoshiftSummary[];
export const AutoshiftSummaries = /*@__PURE__*/ S.Array(AutoshiftSummary);
export interface ListAutoshiftsResponse {
  items?: AutoshiftSummary[];
  nextToken?: string;
}
export const ListAutoshiftsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(AutoshiftSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutoshiftsResponse",
}) as any as S.Schema<ListAutoshiftsResponse>;
export interface ListManagedResourcesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListManagedResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managedresources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedResourcesRequest",
}) as any as S.Schema<ListManagedResourcesRequest>;
export type AvailabilityZones = string[];
export const AvailabilityZones = /*@__PURE__*/ S.Array(S.String);
export interface ManagedResourceSummary {
  arn?: string;
  name?: string;
  availabilityZones: string[];
  appliedWeights?: { [key: string]: number | undefined };
  zonalShifts?: ZonalShiftInResource[];
  autoshifts?: AutoshiftInResource[];
  zonalAutoshiftStatus?: ZonalAutoshiftStatus;
  practiceRunStatus?: ZonalAutoshiftStatus;
}
export const ManagedResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    availabilityZones: AvailabilityZones,
    appliedWeights: S.optional(AppliedWeights),
    zonalShifts: S.optional(ZonalShiftsInResource),
    autoshifts: S.optional(AutoshiftsInResource),
    zonalAutoshiftStatus: S.optional(ZonalAutoshiftStatus),
    practiceRunStatus: S.optional(ZonalAutoshiftStatus),
  }),
).annotate({
  identifier: "ManagedResourceSummary",
}) as any as S.Schema<ManagedResourceSummary>;
export type ManagedResourceSummaries = ManagedResourceSummary[];
export const ManagedResourceSummaries = /*@__PURE__*/ S.Array(
  ManagedResourceSummary,
);
export interface ListManagedResourcesResponse {
  items: ManagedResourceSummary[];
  nextToken?: string;
}
export const ListManagedResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: ManagedResourceSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedResourcesResponse",
}) as any as S.Schema<ListManagedResourcesResponse>;
export interface ListZonalShiftsRequest {
  nextToken?: string;
  status?: ZonalShiftStatus;
  maxResults?: number;
  resourceIdentifier?: string;
}
export const ListZonalShiftsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(ZonalShiftStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    resourceIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resourceIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/zonalshifts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListZonalShiftsRequest",
}) as any as S.Schema<ListZonalShiftsRequest>;
export interface ZonalShiftSummary {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
  shiftType?: ShiftType;
  practiceRunOutcome?: PracticeRunOutcome;
}
export const ZonalShiftSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    zonalShiftId: S.String,
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ZonalShiftStatus,
    comment: S.String,
    shiftType: S.optional(ShiftType),
    practiceRunOutcome: S.optional(PracticeRunOutcome),
  }),
).annotate({
  identifier: "ZonalShiftSummary",
}) as any as S.Schema<ZonalShiftSummary>;
export type ZonalShiftSummaries = ZonalShiftSummary[];
export const ZonalShiftSummaries = /*@__PURE__*/ S.Array(ZonalShiftSummary);
export interface ListZonalShiftsResponse {
  items?: ZonalShiftSummary[];
  nextToken?: string;
}
export const ListZonalShiftsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    items: S.optional(ZonalShiftSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListZonalShiftsResponse",
}) as any as S.Schema<ListZonalShiftsResponse>;
export interface StartPracticeRunRequest {
  resourceIdentifier: string;
  awayFrom: string;
  comment: string;
}
export const StartPracticeRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String,
    awayFrom: S.String,
    comment: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/practiceruns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPracticeRunRequest",
}) as any as S.Schema<StartPracticeRunRequest>;
export interface StartPracticeRunResponse {
  zonalShiftId: string;
  resourceIdentifier: string;
  awayFrom: string;
  expiryTime: Date;
  startTime: Date;
  status: ZonalShiftStatus;
  comment: string;
}
export const StartPracticeRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    zonalShiftId: S.String,
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiryTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ZonalShiftStatus,
    comment: S.String,
  }),
).annotate({
  identifier: "StartPracticeRunResponse",
}) as any as S.Schema<StartPracticeRunResponse>;
export type ExpiresIn = string;
export interface StartZonalShiftRequest {
  resourceIdentifier: string;
  awayFrom: string;
  expiresIn: string;
  comment: string;
}
export const StartZonalShiftRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String,
    awayFrom: S.String,
    expiresIn: S.String,
    comment: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/zonalshifts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartZonalShiftRequest",
}) as any as S.Schema<StartZonalShiftRequest>;
export interface UpdateAutoshiftObserverNotificationStatusRequest {
  status: AutoshiftObserverNotificationStatus;
}
export const UpdateAutoshiftObserverNotificationStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ status: AutoshiftObserverNotificationStatus }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/autoshift-observer-notification" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateAutoshiftObserverNotificationStatusRequest",
  }) as any as S.Schema<UpdateAutoshiftObserverNotificationStatusRequest>;
export interface UpdateAutoshiftObserverNotificationStatusResponse {
  status: AutoshiftObserverNotificationStatus;
}
export const UpdateAutoshiftObserverNotificationStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ status: AutoshiftObserverNotificationStatus }),
  ).annotate({
    identifier: "UpdateAutoshiftObserverNotificationStatusResponse",
  }) as any as S.Schema<UpdateAutoshiftObserverNotificationStatusResponse>;
export interface UpdatePracticeRunConfigurationRequest {
  resourceIdentifier: string;
  blockedWindows?: string[];
  blockedDates?: string[];
  blockingAlarms?: ControlCondition[];
  allowedWindows?: string[];
  outcomeAlarms?: ControlCondition[];
}
export const UpdatePracticeRunConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
      blockedWindows: S.optional(BlockedWindows),
      blockedDates: S.optional(BlockedDates),
      blockingAlarms: S.optional(BlockingAlarms),
      allowedWindows: S.optional(AllowedWindows),
      outcomeAlarms: S.optional(OutcomeAlarms),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/configuration/{resourceIdentifier}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePracticeRunConfigurationRequest",
}) as any as S.Schema<UpdatePracticeRunConfigurationRequest>;
export interface UpdatePracticeRunConfigurationResponse {
  arn: string;
  name: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
  practiceRunConfiguration: PracticeRunConfiguration;
}
export const UpdatePracticeRunConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      name: S.String,
      zonalAutoshiftStatus: ZonalAutoshiftStatus,
      practiceRunConfiguration: PracticeRunConfiguration,
    }),
).annotate({
  identifier: "UpdatePracticeRunConfigurationResponse",
}) as any as S.Schema<UpdatePracticeRunConfigurationResponse>;
export interface UpdateZonalAutoshiftConfigurationRequest {
  resourceIdentifier: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export const UpdateZonalAutoshiftConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")),
      zonalAutoshiftStatus: ZonalAutoshiftStatus,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/managedresources/{resourceIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateZonalAutoshiftConfigurationRequest",
}) as any as S.Schema<UpdateZonalAutoshiftConfigurationRequest>;
export interface UpdateZonalAutoshiftConfigurationResponse {
  resourceIdentifier: string;
  zonalAutoshiftStatus: ZonalAutoshiftStatus;
}
export const UpdateZonalAutoshiftConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resourceIdentifier: S.String,
      zonalAutoshiftStatus: ZonalAutoshiftStatus,
    }),
  ).annotate({
    identifier: "UpdateZonalAutoshiftConfigurationResponse",
  }) as any as S.Schema<UpdateZonalAutoshiftConfigurationResponse>;
export interface UpdateZonalShiftRequest {
  zonalShiftId: string;
  comment?: string;
  expiresIn?: string;
}
export const UpdateZonalShiftRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    zonalShiftId: S.String.pipe(T.HttpLabel("zonalShiftId")),
    comment: S.optional(S.String),
    expiresIn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/zonalshifts/{zonalShiftId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateZonalShiftRequest",
}) as any as S.Schema<UpdateZonalShiftRequest>;
export type ConflictExceptionReason =
  | "ZonalShiftAlreadyExists"
  | "ZonalShiftStatusNotActive"
  | "SimultaneousZonalShiftsConflict"
  | "PracticeConfigurationAlreadyExists"
  | "AutoShiftEnabled"
  | "PracticeConfigurationDoesNotExist"
  | "ZonalAutoshiftActive"
  | "PracticeOutcomeAlarmsRed"
  | "PracticeBlockingAlarmsRed"
  | "PracticeInBlockedDates"
  | "PracticeInBlockedWindows"
  | "PracticeOutsideAllowedWindows"
  | (string & {});
export const ConflictExceptionReason = /*@__PURE__*/ S.String;

export type ValidationExceptionReason =
  | "InvalidExpiresIn"
  | "InvalidStatus"
  | "MissingValue"
  | "InvalidToken"
  | "InvalidResourceIdentifier"
  | "InvalidAz"
  | "UnsupportedAz"
  | "InvalidAlarmCondition"
  | "InvalidConditionType"
  | "InvalidPracticeBlocker"
  | "FISExperimentUpdateNotAllowed"
  | "AutoshiftUpdateNotAllowed"
  | "UnsupportedPracticeCancelShiftType"
  | "InvalidPracticeAllowedWindow"
  | "InvalidPracticeWindows"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type CancelPracticeRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel an in-progress practice run zonal shift in Amazon Application Recovery Controller.
 */
export const cancelPracticeRun: API.OperationMethod<
  CancelPracticeRunRequest,
  CancelPracticeRunResponse,
  CancelPracticeRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelPracticeRunRequest,
  output: CancelPracticeRunResponse,
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
  operationName: "CancelPracticeRun",
}));

export type CancelZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel a zonal shift in Amazon Application Recovery Controller. To cancel the zonal shift, specify the zonal shift ID.
 *
 * A zonal shift can be one that you've started for a resource in your Amazon Web Services account in an Amazon Web Services Region, or it can be a zonal shift started by a practice run with zonal autoshift.
 */
export const cancelZonalShift: API.OperationMethod<
  CancelZonalShiftRequest,
  ZonalShift,
  CancelZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelZonalShiftRequest,
  output: ZonalShift,
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
  operationName: "CancelZonalShift",
}));

export type CreatePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A practice run configuration for zonal autoshift is required when you enable zonal autoshift. A practice run configuration includes specifications for blocked dates and blocked time windows, and for Amazon CloudWatch alarms that you create to use with practice runs. The alarms that you specify are an *outcome alarm*, to monitor application health during practice runs and, optionally, a *blocking alarm*, to block practice runs from starting.
 *
 * When a resource has a practice run configuration, ARC starts zonal shifts for the resource weekly, to shift traffic for practice runs. Practice runs help you to ensure that shifting away traffic from an Availability Zone during an autoshift is safe for your application.
 *
 * For more information, see Considerations when you configure zonal autoshift in the Amazon Application Recovery Controller Developer Guide.
 */
export const createPracticeRunConfiguration: API.OperationMethod<
  CreatePracticeRunConfigurationRequest,
  CreatePracticeRunConfigurationResponse,
  CreatePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePracticeRunConfigurationRequest,
  output: CreatePracticeRunConfigurationResponse,
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
  operationName: "CreatePracticeRunConfiguration",
}));

export type DeletePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the practice run configuration for a resource. Before you can delete a practice run configuration for a resource., you must disable zonal autoshift for the resource. Practice runs must be configured for zonal autoshift to be enabled.
 */
export const deletePracticeRunConfiguration: API.OperationMethod<
  DeletePracticeRunConfigurationRequest,
  DeletePracticeRunConfigurationResponse,
  DeletePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePracticeRunConfigurationRequest,
  output: DeletePracticeRunConfigurationResponse,
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
  operationName: "DeletePracticeRunConfiguration",
}));

export type GetAutoshiftObserverNotificationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the status of the autoshift observer notification. Autoshift observer notifications notify you through Amazon EventBridge when there is an autoshift event for zonal autoshift. The status can be `ENABLED` or `DISABLED`. When `ENABLED`, a notification is sent when an autoshift is triggered. When `DISABLED`, notifications are not sent.
 */
export const getAutoshiftObserverNotificationStatus: API.OperationMethod<
  GetAutoshiftObserverNotificationStatusRequest,
  GetAutoshiftObserverNotificationStatusResponse,
  GetAutoshiftObserverNotificationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutoshiftObserverNotificationStatusRequest,
  output: GetAutoshiftObserverNotificationStatusResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoshiftObserverNotificationStatus",
}));

export type GetManagedResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a resource that's been registered for zonal shifts with Amazon Application Recovery Controller in this Amazon Web Services Region. Resources that are registered for zonal shifts are managed resources in ARC. You can start zonal shifts and configure zonal autoshift for managed resources.
 */
export const getManagedResource: API.OperationMethod<
  GetManagedResourceRequest,
  GetManagedResourceResponse,
  GetManagedResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedResourceRequest,
  output: GetManagedResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedResource",
}));

export type ListAutoshiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the autoshifts for an Amazon Web Services Region. By default, the call returns only `ACTIVE` autoshifts. Optionally, you can specify the `status` parameter to return `COMPLETED` autoshifts.
 */
export const listAutoshifts: API.PaginatedOperationMethod<
  ListAutoshiftsRequest,
  ListAutoshiftsResponse,
  ListAutoshiftsError,
  Credentials | HttpClient.HttpClient,
  AutoshiftSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutoshiftsRequest,
  output: ListAutoshiftsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutoshifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the resources in your Amazon Web Services account in this Amazon Web Services Region that are managed for zonal shifts in Amazon Application Recovery Controller, and information about them. The information includes the zonal autoshift status for the resource, as well as the Amazon Resource Name (ARN), the Availability Zones that each resource is deployed in, and the resource name.
 */
export const listManagedResources: API.PaginatedOperationMethod<
  ListManagedResourcesRequest,
  ListManagedResourcesResponse,
  ListManagedResourcesError,
  Credentials | HttpClient.HttpClient,
  ManagedResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedResourcesRequest,
  output: ListManagedResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListZonalShiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all active and completed zonal shifts in Amazon Application Recovery Controller in your Amazon Web Services account in this Amazon Web Services Region. `ListZonalShifts` returns customer-initiated zonal shifts, as well as practice run zonal shifts that ARC started on your behalf for zonal autoshift.
 *
 * For more information about listing autoshifts, see ">ListAutoshifts.
 */
export const listZonalShifts: API.PaginatedOperationMethod<
  ListZonalShiftsRequest,
  ListZonalShiftsResponse,
  ListZonalShiftsError,
  Credentials | HttpClient.HttpClient,
  ZonalShiftSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListZonalShiftsRequest,
  output: ListZonalShiftsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListZonalShifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartPracticeRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start an on-demand practice run zonal shift in Amazon Application Recovery Controller. With zonal autoshift enabled, you can start an on-demand practice run to verify preparedness at any time. Amazon Web Services also runs automated practice runs about weekly when you have enabled zonal autoshift.
 *
 * For more information, see Considerations when you configure zonal autoshift in the Amazon Application Recovery Controller Developer Guide.
 */
export const startPracticeRun: API.OperationMethod<
  StartPracticeRunRequest,
  StartPracticeRunResponse,
  StartPracticeRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPracticeRunRequest,
  output: StartPracticeRunResponse,
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
  operationName: "StartPracticeRun",
}));

export type StartZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You start a zonal shift to temporarily move load balancer traffic away from an Availability Zone in an Amazon Web Services Region, to help your application recover immediately, for example, from a developer's bad code deployment or from an Amazon Web Services infrastructure failure in a single Availability Zone. You can start a zonal shift in ARC only for managed resources in your Amazon Web Services account in an Amazon Web Services Region. Resources are automatically registered with ARC by Amazon Web Services services.
 *
 * Amazon Application Recovery Controller currently supports enabling the following resources for zonal shift and zonal autoshift:
 *
 * - Amazon EC2 Auto Scaling groups
 *
 * - Amazon Elastic Kubernetes Service
 *
 * - Application Load Balancer
 *
 * - Network Load Balancer
 *
 * When you start a zonal shift, traffic for the resource is no longer routed to the Availability Zone. The zonal shift is created immediately in ARC. However, it can take a short time, typically up to a few minutes, for existing, in-progress connections in the Availability Zone to complete.
 *
 * For more information, see Zonal shift in the Amazon Application Recovery Controller Developer Guide.
 */
export const startZonalShift: API.OperationMethod<
  StartZonalShiftRequest,
  ZonalShift,
  StartZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartZonalShiftRequest,
  output: ZonalShift,
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
  operationName: "StartZonalShift",
}));

export type UpdateAutoshiftObserverNotificationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the status of autoshift observer notification. Autoshift observer notification enables you to be notified, through Amazon EventBridge, when there is an autoshift event for zonal autoshift.
 *
 * If the status is `ENABLED`, ARC includes all autoshift events when you use the EventBridge pattern `Autoshift In Progress`. When the status is `DISABLED`, ARC includes only autoshift events for autoshifts when one or more of your resources is included in the autoshift.
 *
 * For more information, see Notifications for practice runs and autoshifts in the Amazon Application Recovery Controller Developer Guide.
 */
export const updateAutoshiftObserverNotificationStatus: API.OperationMethod<
  UpdateAutoshiftObserverNotificationStatusRequest,
  UpdateAutoshiftObserverNotificationStatusResponse,
  UpdateAutoshiftObserverNotificationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutoshiftObserverNotificationStatusRequest,
  output: UpdateAutoshiftObserverNotificationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoshiftObserverNotificationStatus",
}));

export type UpdatePracticeRunConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a practice run configuration to change one or more of the following: add, change, or remove the blocking alarm; change the outcome alarm; or add, change, or remove blocking dates or time windows.
 */
export const updatePracticeRunConfiguration: API.OperationMethod<
  UpdatePracticeRunConfigurationRequest,
  UpdatePracticeRunConfigurationResponse,
  UpdatePracticeRunConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePracticeRunConfigurationRequest,
  output: UpdatePracticeRunConfigurationResponse,
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
  operationName: "UpdatePracticeRunConfiguration",
}));

export type UpdateZonalAutoshiftConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The zonal autoshift configuration for a resource includes the practice run configuration and the status for running autoshifts, zonal autoshift status. When a resource has a practice run configuration, ARC starts weekly zonal shifts for the resource, to shift traffic away from an Availability Zone. Weekly practice runs help you to make sure that your application can continue to operate normally with the loss of one Availability Zone.
 *
 * You can update the zonal autoshift status to enable or disable zonal autoshift. When zonal autoshift is `ENABLED`, you authorize Amazon Web Services to shift away resource traffic for an application from an Availability Zone during events, on your behalf, to help reduce time to recovery. Traffic is also shifted away for the required weekly practice runs.
 */
export const updateZonalAutoshiftConfiguration: API.OperationMethod<
  UpdateZonalAutoshiftConfigurationRequest,
  UpdateZonalAutoshiftConfigurationResponse,
  UpdateZonalAutoshiftConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateZonalAutoshiftConfigurationRequest,
  output: UpdateZonalAutoshiftConfigurationResponse,
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
  operationName: "UpdateZonalAutoshiftConfiguration",
}));

export type UpdateZonalShiftError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an active zonal shift in Amazon Application Recovery Controller in your Amazon Web Services account. You can update a zonal shift to set a new expiration, or edit or replace the comment for the zonal shift.
 */
export const updateZonalShift: API.OperationMethod<
  UpdateZonalShiftRequest,
  ZonalShift,
  UpdateZonalShiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateZonalShiftRequest,
  output: ZonalShift,
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
  operationName: "UpdateZonalShift",
}));
