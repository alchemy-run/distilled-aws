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
const svc = T.AwsApiService({
  sdkId: "Location",
  serviceShapeName: "LocationService",
});
const auth = T.AwsAuthSigv4({ name: "geo" });
const ver = T.ServiceVersion("2020-11-19");
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
              `https://geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.String,
      FieldList: S.suspend(() => ValidationExceptionFieldList).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type Arn = string;
export interface AssociateTrackerConsumerRequest {
  TrackerName: string;
  ConsumerArn: string;
}
export const AssociateTrackerConsumerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    ConsumerArn: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/consumers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateTrackerConsumerRequest",
}) as any as S.Schema<AssociateTrackerConsumerRequest>;
export interface AssociateTrackerConsumerResponse {}
export const AssociateTrackerConsumerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateTrackerConsumerResponse",
}) as any as S.Schema<AssociateTrackerConsumerResponse>;
export type Id = string;
export type DeviceIdsList = string[];
export const DeviceIdsList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteDevicePositionHistoryRequest {
  TrackerName: string;
  DeviceIds: string[];
}
export const BatchDeleteDevicePositionHistoryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
      DeviceIds: DeviceIdsList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/tracking/v0/trackers/{TrackerName}/delete-positions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDeleteDevicePositionHistoryRequest",
}) as any as S.Schema<BatchDeleteDevicePositionHistoryRequest>;
export type BatchItemErrorCode = string;
export interface BatchItemError {
  Code?: string;
  Message?: string;
}
export const BatchItemError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({ identifier: "BatchItemError" }) as any as S.Schema<BatchItemError>;
export interface BatchDeleteDevicePositionHistoryError_ {
  DeviceId: string;
  Error: BatchItemError;
}
export const BatchDeleteDevicePositionHistoryError_ = /*@__PURE__*/ S.suspend(
  () => S.Struct({ DeviceId: S.String, Error: BatchItemError }),
).annotate({
  identifier: "BatchDeleteDevicePositionHistoryError",
}) as any as S.Schema<BatchDeleteDevicePositionHistoryError_>;
export type BatchDeleteDevicePositionHistoryErrorList =
  BatchDeleteDevicePositionHistoryError_[];
export const BatchDeleteDevicePositionHistoryErrorList = /*@__PURE__*/ S.Array(
  BatchDeleteDevicePositionHistoryError_,
);
export interface BatchDeleteDevicePositionHistoryResponse {
  Errors: BatchDeleteDevicePositionHistoryError_[];
}
export const BatchDeleteDevicePositionHistoryResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Errors: BatchDeleteDevicePositionHistoryErrorList }),
).annotate({
  identifier: "BatchDeleteDevicePositionHistoryResponse",
}) as any as S.Schema<BatchDeleteDevicePositionHistoryResponse>;
export type IdList = string[];
export const IdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteGeofenceRequest {
  CollectionName: string;
  GeofenceIds: string[];
}
export const BatchDeleteGeofenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    GeofenceIds: IdList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/geofencing/v0/collections/{CollectionName}/delete-geofences",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteGeofenceRequest",
}) as any as S.Schema<BatchDeleteGeofenceRequest>;
export interface BatchDeleteGeofenceError_ {
  GeofenceId: string;
  Error: BatchItemError;
}
export const BatchDeleteGeofenceError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeofenceId: S.String, Error: BatchItemError }),
).annotate({
  identifier: "BatchDeleteGeofenceError",
}) as any as S.Schema<BatchDeleteGeofenceError_>;
export type BatchDeleteGeofenceErrorList = BatchDeleteGeofenceError_[];
export const BatchDeleteGeofenceErrorList = /*@__PURE__*/ S.Array(
  BatchDeleteGeofenceError_,
);
export interface BatchDeleteGeofenceResponse {
  Errors: BatchDeleteGeofenceError_[];
}
export const BatchDeleteGeofenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: BatchDeleteGeofenceErrorList }),
).annotate({
  identifier: "BatchDeleteGeofenceResponse",
}) as any as S.Schema<BatchDeleteGeofenceResponse>;
export type Position = number[];
export const Position = /*@__PURE__*/ S.Array(S.Number);
export type SensitiveDouble = number;
export interface PositionalAccuracy {
  Horizontal: number;
}
export const PositionalAccuracy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Horizontal: S.Number }),
).annotate({
  identifier: "PositionalAccuracy",
}) as any as S.Schema<PositionalAccuracy>;
export type PositionPropertyMap = { [key: string]: string | undefined };
export const PositionPropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DevicePositionUpdate {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export const DevicePositionUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Position: Position,
    Accuracy: S.optional(PositionalAccuracy),
    PositionProperties: S.optional(PositionPropertyMap),
  }),
).annotate({
  identifier: "DevicePositionUpdate",
}) as any as S.Schema<DevicePositionUpdate>;
export type DevicePositionUpdateList = DevicePositionUpdate[];
export const DevicePositionUpdateList =
  /*@__PURE__*/ S.Array(DevicePositionUpdate);
export interface BatchEvaluateGeofencesRequest {
  CollectionName: string;
  DevicePositionUpdates: DevicePositionUpdate[];
}
export const BatchEvaluateGeofencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    DevicePositionUpdates: DevicePositionUpdateList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/geofencing/v0/collections/{CollectionName}/positions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchEvaluateGeofencesRequest",
}) as any as S.Schema<BatchEvaluateGeofencesRequest>;
export interface BatchEvaluateGeofencesError_ {
  DeviceId: string;
  SampleTime: Date;
  Error: BatchItemError;
}
export const BatchEvaluateGeofencesError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Error: BatchItemError,
  }),
).annotate({
  identifier: "BatchEvaluateGeofencesError",
}) as any as S.Schema<BatchEvaluateGeofencesError_>;
export type BatchEvaluateGeofencesErrorList = BatchEvaluateGeofencesError_[];
export const BatchEvaluateGeofencesErrorList = /*@__PURE__*/ S.Array(
  BatchEvaluateGeofencesError_,
);
export interface BatchEvaluateGeofencesResponse {
  Errors?: BatchEvaluateGeofencesError_[];
}
export const BatchEvaluateGeofencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(BatchEvaluateGeofencesErrorList) }),
).annotate({
  identifier: "BatchEvaluateGeofencesResponse",
}) as any as S.Schema<BatchEvaluateGeofencesResponse>;
export interface BatchGetDevicePositionRequest {
  TrackerName: string;
  DeviceIds: string[];
}
export const BatchGetDevicePositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    DeviceIds: IdList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/get-positions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetDevicePositionRequest",
}) as any as S.Schema<BatchGetDevicePositionRequest>;
export interface BatchGetDevicePositionError_ {
  DeviceId: string;
  Error: BatchItemError;
}
export const BatchGetDevicePositionError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceId: S.String, Error: BatchItemError }),
).annotate({
  identifier: "BatchGetDevicePositionError",
}) as any as S.Schema<BatchGetDevicePositionError_>;
export type BatchGetDevicePositionErrorList = BatchGetDevicePositionError_[];
export const BatchGetDevicePositionErrorList = /*@__PURE__*/ S.Array(
  BatchGetDevicePositionError_,
);
export interface DevicePosition {
  DeviceId?: string;
  SampleTime: Date;
  ReceivedTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export const DevicePosition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String),
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ReceivedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Position: Position,
    Accuracy: S.optional(PositionalAccuracy),
    PositionProperties: S.optional(PositionPropertyMap),
  }),
).annotate({ identifier: "DevicePosition" }) as any as S.Schema<DevicePosition>;
export type DevicePositionList = DevicePosition[];
export const DevicePositionList = /*@__PURE__*/ S.Array(DevicePosition);
export interface BatchGetDevicePositionResponse {
  Errors: BatchGetDevicePositionError_[];
  DevicePositions: DevicePosition[];
}
export const BatchGetDevicePositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Errors: BatchGetDevicePositionErrorList,
    DevicePositions: DevicePositionList,
  }),
).annotate({
  identifier: "BatchGetDevicePositionResponse",
}) as any as S.Schema<BatchGetDevicePositionResponse>;
export type LinearRing = number[][];
export const LinearRing = /*@__PURE__*/ S.Array(Position);
export type LinearRings = number[][][];
export const LinearRings = /*@__PURE__*/ S.Array(LinearRing);
export interface Circle {
  Center: number[];
  Radius: number;
}
export const Circle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Center: Position, Radius: S.Number }),
).annotate({ identifier: "Circle" }) as any as S.Schema<Circle>;
export type Base64EncodedGeobuf = Uint8Array | redacted.Redacted<Uint8Array>;
export type MultiLinearRings = number[][][][];
export const MultiLinearRings = /*@__PURE__*/ S.Array(LinearRings);
export interface GeofenceGeometry {
  Polygon?: number[][][];
  Circle?: Circle;
  Geobuf?: Uint8Array | redacted.Redacted<Uint8Array>;
  MultiPolygon?: number[][][][];
}
export const GeofenceGeometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Polygon: S.optional(LinearRings),
    Circle: S.optional(Circle),
    Geobuf: S.optional(SensitiveBlob),
    MultiPolygon: S.optional(MultiLinearRings),
  }),
).annotate({
  identifier: "GeofenceGeometry",
}) as any as S.Schema<GeofenceGeometry>;
export type PropertyMap = { [key: string]: string | undefined };
export const PropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface BatchPutGeofenceRequestEntry {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export const BatchPutGeofenceRequestEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeofenceId: S.String,
    Geometry: GeofenceGeometry,
    GeofenceProperties: S.optional(PropertyMap),
  }),
).annotate({
  identifier: "BatchPutGeofenceRequestEntry",
}) as any as S.Schema<BatchPutGeofenceRequestEntry>;
export type BatchPutGeofenceRequestEntryList = BatchPutGeofenceRequestEntry[];
export const BatchPutGeofenceRequestEntryList = /*@__PURE__*/ S.Array(
  BatchPutGeofenceRequestEntry,
);
export interface BatchPutGeofenceRequest {
  CollectionName: string;
  Entries: BatchPutGeofenceRequestEntry[];
}
export const BatchPutGeofenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    Entries: BatchPutGeofenceRequestEntryList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/geofencing/v0/collections/{CollectionName}/put-geofences",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutGeofenceRequest",
}) as any as S.Schema<BatchPutGeofenceRequest>;
export interface BatchPutGeofenceSuccess {
  GeofenceId: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const BatchPutGeofenceSuccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeofenceId: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "BatchPutGeofenceSuccess",
}) as any as S.Schema<BatchPutGeofenceSuccess>;
export type BatchPutGeofenceSuccessList = BatchPutGeofenceSuccess[];
export const BatchPutGeofenceSuccessList = /*@__PURE__*/ S.Array(
  BatchPutGeofenceSuccess,
);
export interface BatchPutGeofenceError_ {
  GeofenceId: string;
  Error: BatchItemError;
}
export const BatchPutGeofenceError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeofenceId: S.String, Error: BatchItemError }),
).annotate({
  identifier: "BatchPutGeofenceError",
}) as any as S.Schema<BatchPutGeofenceError_>;
export type BatchPutGeofenceErrorList = BatchPutGeofenceError_[];
export const BatchPutGeofenceErrorList = /*@__PURE__*/ S.Array(
  BatchPutGeofenceError_,
);
export interface BatchPutGeofenceResponse {
  Successes: BatchPutGeofenceSuccess[];
  Errors: BatchPutGeofenceError_[];
}
export const BatchPutGeofenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Successes: BatchPutGeofenceSuccessList,
    Errors: BatchPutGeofenceErrorList,
  }),
).annotate({
  identifier: "BatchPutGeofenceResponse",
}) as any as S.Schema<BatchPutGeofenceResponse>;
export interface BatchUpdateDevicePositionRequest {
  TrackerName: string;
  Updates: DevicePositionUpdate[];
}
export const BatchUpdateDevicePositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    Updates: DevicePositionUpdateList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/positions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateDevicePositionRequest",
}) as any as S.Schema<BatchUpdateDevicePositionRequest>;
export interface BatchUpdateDevicePositionError_ {
  DeviceId: string;
  SampleTime: Date;
  Error: BatchItemError;
}
export const BatchUpdateDevicePositionError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Error: BatchItemError,
  }),
).annotate({
  identifier: "BatchUpdateDevicePositionError",
}) as any as S.Schema<BatchUpdateDevicePositionError_>;
export type BatchUpdateDevicePositionErrorList =
  BatchUpdateDevicePositionError_[];
export const BatchUpdateDevicePositionErrorList = /*@__PURE__*/ S.Array(
  BatchUpdateDevicePositionError_,
);
export interface BatchUpdateDevicePositionResponse {
  Errors: BatchUpdateDevicePositionError_[];
}
export const BatchUpdateDevicePositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: BatchUpdateDevicePositionErrorList }),
).annotate({
  identifier: "BatchUpdateDevicePositionResponse",
}) as any as S.Schema<BatchUpdateDevicePositionResponse>;
export type WaypointPositionList = number[][];
export const WaypointPositionList = /*@__PURE__*/ S.Array(Position);
export type TravelMode = string;
export type SensitiveBoolean = boolean;
export type DistanceUnit = string;
export interface CalculateRouteCarModeOptions {
  AvoidFerries?: boolean;
  AvoidTolls?: boolean;
}
export const CalculateRouteCarModeOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvoidFerries: S.optional(S.Boolean),
    AvoidTolls: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CalculateRouteCarModeOptions",
}) as any as S.Schema<CalculateRouteCarModeOptions>;
export type DimensionUnit = string;
export interface TruckDimensions {
  Length?: number;
  Height?: number;
  Width?: number;
  Unit?: string;
}
export const TruckDimensions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Length: S.optional(S.Number),
    Height: S.optional(S.Number),
    Width: S.optional(S.Number),
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "TruckDimensions",
}) as any as S.Schema<TruckDimensions>;
export type VehicleWeightUnit = string;
export interface TruckWeight {
  Total?: number;
  Unit?: string;
}
export const TruckWeight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Total: S.optional(S.Number), Unit: S.optional(S.String) }),
).annotate({ identifier: "TruckWeight" }) as any as S.Schema<TruckWeight>;
export interface CalculateRouteTruckModeOptions {
  AvoidFerries?: boolean;
  AvoidTolls?: boolean;
  Dimensions?: TruckDimensions;
  Weight?: TruckWeight;
}
export const CalculateRouteTruckModeOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvoidFerries: S.optional(S.Boolean),
    AvoidTolls: S.optional(S.Boolean),
    Dimensions: S.optional(TruckDimensions),
    Weight: S.optional(TruckWeight),
  }),
).annotate({
  identifier: "CalculateRouteTruckModeOptions",
}) as any as S.Schema<CalculateRouteTruckModeOptions>;
export type OptimizationMode = string;
export type ApiKey = string | redacted.Redacted<string>;
export interface CalculateRouteRequest {
  CalculatorName: string;
  DeparturePosition: number[];
  DestinationPosition: number[];
  WaypointPositions?: number[][];
  TravelMode?: string;
  DepartureTime?: Date;
  DepartNow?: boolean;
  DistanceUnit?: string;
  IncludeLegGeometry?: boolean;
  CarModeOptions?: CalculateRouteCarModeOptions;
  TruckModeOptions?: CalculateRouteTruckModeOptions;
  ArrivalTime?: Date;
  OptimizeFor?: string;
  Key?: string | redacted.Redacted<string>;
}
export const CalculateRouteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
    DeparturePosition: Position,
    DestinationPosition: Position,
    WaypointPositions: S.optional(WaypointPositionList),
    TravelMode: S.optional(S.String),
    DepartureTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DepartNow: S.optional(S.Boolean),
    DistanceUnit: S.optional(S.String),
    IncludeLegGeometry: S.optional(S.Boolean),
    CarModeOptions: S.optional(CalculateRouteCarModeOptions),
    TruckModeOptions: S.optional(CalculateRouteTruckModeOptions),
    ArrivalTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OptimizeFor: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/routes/v0/calculators/{CalculatorName}/calculate/route",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CalculateRouteRequest",
}) as any as S.Schema<CalculateRouteRequest>;
export type LineString = number[][];
export const LineString = /*@__PURE__*/ S.Array(Position);
export interface LegGeometry {
  LineString?: number[][];
}
export const LegGeometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LineString: S.optional(LineString) }),
).annotate({ identifier: "LegGeometry" }) as any as S.Schema<LegGeometry>;
export interface Step {
  StartPosition: number[];
  EndPosition: number[];
  Distance: number;
  DurationSeconds: number;
  GeometryOffset?: number;
}
export const Step = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartPosition: Position,
    EndPosition: Position,
    Distance: S.Number,
    DurationSeconds: S.Number,
    GeometryOffset: S.optional(S.Number),
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export type StepList = Step[];
export const StepList = /*@__PURE__*/ S.Array(Step);
export interface Leg {
  StartPosition: number[];
  EndPosition: number[];
  Distance: number;
  DurationSeconds: number;
  Geometry?: LegGeometry;
  Steps: Step[];
}
export const Leg = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartPosition: Position,
    EndPosition: Position,
    Distance: S.Number,
    DurationSeconds: S.Number,
    Geometry: S.optional(LegGeometry),
    Steps: StepList,
  }),
).annotate({ identifier: "Leg" }) as any as S.Schema<Leg>;
export type LegList = Leg[];
export const LegList = /*@__PURE__*/ S.Array(Leg);
export type BoundingBox = number[];
export const BoundingBox = /*@__PURE__*/ S.Array(S.Number);
export interface CalculateRouteSummary {
  RouteBBox: number[];
  DataSource: string;
  Distance: number;
  DurationSeconds: number;
  DistanceUnit: string;
}
export const CalculateRouteSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouteBBox: BoundingBox,
    DataSource: S.String,
    Distance: S.Number,
    DurationSeconds: S.Number,
    DistanceUnit: S.String,
  }),
).annotate({
  identifier: "CalculateRouteSummary",
}) as any as S.Schema<CalculateRouteSummary>;
export interface CalculateRouteResponse {
  Legs: Leg[];
  Summary: CalculateRouteSummary;
}
export const CalculateRouteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Legs: LegList, Summary: CalculateRouteSummary }),
).annotate({
  identifier: "CalculateRouteResponse",
}) as any as S.Schema<CalculateRouteResponse>;
export type PositionList = number[][];
export const PositionList = /*@__PURE__*/ S.Array(Position);
export interface CalculateRouteMatrixRequest {
  CalculatorName: string;
  DeparturePositions: number[][];
  DestinationPositions: number[][];
  TravelMode?: string;
  DepartureTime?: Date;
  DepartNow?: boolean;
  DistanceUnit?: string;
  CarModeOptions?: CalculateRouteCarModeOptions;
  TruckModeOptions?: CalculateRouteTruckModeOptions;
  Key?: string | redacted.Redacted<string>;
}
export const CalculateRouteMatrixRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
    DeparturePositions: PositionList,
    DestinationPositions: PositionList,
    TravelMode: S.optional(S.String),
    DepartureTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DepartNow: S.optional(S.Boolean),
    DistanceUnit: S.optional(S.String),
    CarModeOptions: S.optional(CalculateRouteCarModeOptions),
    TruckModeOptions: S.optional(CalculateRouteTruckModeOptions),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/routes/v0/calculators/{CalculatorName}/calculate/route-matrix",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CalculateRouteMatrixRequest",
}) as any as S.Schema<CalculateRouteMatrixRequest>;
export type RouteMatrixErrorCode = string;
export interface RouteMatrixEntryError {
  Code: string;
  Message?: string;
}
export const RouteMatrixEntryError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Message: S.optional(S.String) }),
).annotate({
  identifier: "RouteMatrixEntryError",
}) as any as S.Schema<RouteMatrixEntryError>;
export interface RouteMatrixEntry {
  Distance?: number;
  DurationSeconds?: number;
  Error?: RouteMatrixEntryError;
}
export const RouteMatrixEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Distance: S.optional(S.Number),
    DurationSeconds: S.optional(S.Number),
    Error: S.optional(RouteMatrixEntryError),
  }),
).annotate({
  identifier: "RouteMatrixEntry",
}) as any as S.Schema<RouteMatrixEntry>;
export type RouteMatrixRow = RouteMatrixEntry[];
export const RouteMatrixRow = /*@__PURE__*/ S.Array(RouteMatrixEntry);
export type RouteMatrix = RouteMatrixEntry[][];
export const RouteMatrix = /*@__PURE__*/ S.Array(RouteMatrixRow);
export interface CalculateRouteMatrixSummary {
  DataSource: string;
  RouteCount: number;
  ErrorCount: number;
  DistanceUnit: string;
}
export const CalculateRouteMatrixSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSource: S.String,
    RouteCount: S.Number,
    ErrorCount: S.Number,
    DistanceUnit: S.String,
  }),
).annotate({
  identifier: "CalculateRouteMatrixSummary",
}) as any as S.Schema<CalculateRouteMatrixSummary>;
export interface CalculateRouteMatrixResponse {
  RouteMatrix: RouteMatrixEntry[][];
  SnappedDeparturePositions?: number[][];
  SnappedDestinationPositions?: number[][];
  Summary: CalculateRouteMatrixSummary;
}
export const CalculateRouteMatrixResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RouteMatrix: RouteMatrix,
    SnappedDeparturePositions: S.optional(PositionList),
    SnappedDestinationPositions: S.optional(PositionList),
    Summary: CalculateRouteMatrixSummary,
  }),
).annotate({
  identifier: "CalculateRouteMatrixResponse",
}) as any as S.Schema<CalculateRouteMatrixResponse>;
export type JobId = string;
export interface CancelJobRequest {
  JobId: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata/v0/jobs/cancel-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobRequest",
}) as any as S.Schema<CancelJobRequest>;
export type GeoArn = string;
export type JobStatus = string;
export interface CancelJobResponse {
  JobArn: string;
  JobId: string;
  Status: string;
}
export const CancelJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobArn: S.String, JobId: S.String, Status: S.String }),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type PricingPlan = string;
export type ResourceDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type KmsKeyId = string;
export interface CreateGeofenceCollectionRequest {
  CollectionName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
}
export const CreateGeofenceCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String,
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    KmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/geofencing/v0/collections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGeofenceCollectionRequest",
}) as any as S.Schema<CreateGeofenceCollectionRequest>;
export interface CreateGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  CreateTime: Date;
}
export const CreateGeofenceCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String,
    CollectionArn: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateGeofenceCollectionResponse",
}) as any as S.Schema<CreateGeofenceCollectionResponse>;
export type ApiKeyAction = string;
export type ApiKeyActionList = string[];
export const ApiKeyActionList = /*@__PURE__*/ S.Array(S.String);
export type GeoArnV2 = string;
export type GeoArnList = string[];
export const GeoArnList = /*@__PURE__*/ S.Array(S.String);
export type RefererPattern = string | redacted.Redacted<string>;
export type RefererPatternList = (string | redacted.Redacted<string>)[];
export const RefererPatternList = /*@__PURE__*/ S.Array(SensitiveString);
export type AndroidPackageName = string;
export type Sha1CertificateFingerprint = string;
export interface AndroidApp {
  Package: string;
  CertificateFingerprint: string;
}
export const AndroidApp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Package: S.String, CertificateFingerprint: S.String }),
).annotate({ identifier: "AndroidApp" }) as any as S.Schema<AndroidApp>;
export type AndroidAppList = AndroidApp[];
export const AndroidAppList = /*@__PURE__*/ S.Array(AndroidApp);
export type AppleBundleId = string;
export interface AppleApp {
  BundleId: string;
}
export const AppleApp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BundleId: S.String }),
).annotate({ identifier: "AppleApp" }) as any as S.Schema<AppleApp>;
export type AppleAppList = AppleApp[];
export const AppleAppList = /*@__PURE__*/ S.Array(AppleApp);
export interface ApiKeyRestrictions {
  AllowActions: string[];
  AllowResources: string[];
  AllowReferers?: (string | redacted.Redacted<string>)[];
  AllowAndroidApps?: AndroidApp[];
  AllowAppleApps?: AppleApp[];
}
export const ApiKeyRestrictions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowActions: ApiKeyActionList,
    AllowResources: GeoArnList,
    AllowReferers: S.optional(RefererPatternList),
    AllowAndroidApps: S.optional(AndroidAppList),
    AllowAppleApps: S.optional(AppleAppList),
  }),
).annotate({
  identifier: "ApiKeyRestrictions",
}) as any as S.Schema<ApiKeyRestrictions>;
export interface CreateKeyRequest {
  KeyName: string;
  Restrictions: ApiKeyRestrictions;
  Description?: string;
  ExpireTime?: Date;
  NoExpiry?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export const CreateKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyName: S.String,
    Restrictions: ApiKeyRestrictions,
    Description: S.optional(S.String),
    ExpireTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NoExpiry: S.optional(S.Boolean),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata/v0/keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateKeyRequest",
}) as any as S.Schema<CreateKeyRequest>;
export interface CreateKeyResponse {
  Key: string | redacted.Redacted<string>;
  KeyArn: string;
  KeyName: string;
  CreateTime: Date;
}
export const CreateKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: SensitiveString,
    KeyArn: S.String,
    KeyName: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateKeyResponse",
}) as any as S.Schema<CreateKeyResponse>;
export type MapStyle = string;
export type CountryCode3 = string | redacted.Redacted<string>;
export type CustomLayer = string;
export type CustomLayerList = string[];
export const CustomLayerList = /*@__PURE__*/ S.Array(S.String);
export interface MapConfiguration {
  Style: string;
  PoliticalView?: string | redacted.Redacted<string>;
  CustomLayers?: string[];
}
export const MapConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Style: S.String,
    PoliticalView: S.optional(SensitiveString),
    CustomLayers: S.optional(CustomLayerList),
  }),
).annotate({
  identifier: "MapConfiguration",
}) as any as S.Schema<MapConfiguration>;
export interface CreateMapRequest {
  MapName: string;
  Configuration: MapConfiguration;
  PricingPlan?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String,
    Configuration: MapConfiguration,
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/maps/v0/maps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMapRequest",
}) as any as S.Schema<CreateMapRequest>;
export interface CreateMapResponse {
  MapName: string;
  MapArn: string;
  CreateTime: Date;
}
export const CreateMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String,
    MapArn: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateMapResponse",
}) as any as S.Schema<CreateMapResponse>;
export type IntendedUse = string;
export interface DataSourceConfiguration {
  IntendedUse?: string;
}
export const DataSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IntendedUse: S.optional(S.String) }),
).annotate({
  identifier: "DataSourceConfiguration",
}) as any as S.Schema<DataSourceConfiguration>;
export interface CreatePlaceIndexRequest {
  IndexName: string;
  DataSource: string;
  PricingPlan?: string;
  Description?: string;
  DataSourceConfiguration?: DataSourceConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePlaceIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    DataSource: S.String,
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    DataSourceConfiguration: S.optional(DataSourceConfiguration),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/places/v0/indexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePlaceIndexRequest",
}) as any as S.Schema<CreatePlaceIndexRequest>;
export interface CreatePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  CreateTime: Date;
}
export const CreatePlaceIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    IndexArn: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreatePlaceIndexResponse",
}) as any as S.Schema<CreatePlaceIndexResponse>;
export interface CreateRouteCalculatorRequest {
  CalculatorName: string;
  DataSource: string;
  PricingPlan?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRouteCalculatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String,
    DataSource: S.String,
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/routes/v0/calculators" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRouteCalculatorRequest",
}) as any as S.Schema<CreateRouteCalculatorRequest>;
export interface CreateRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  CreateTime: Date;
}
export const CreateRouteCalculatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String,
    CalculatorArn: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateRouteCalculatorResponse",
}) as any as S.Schema<CreateRouteCalculatorResponse>;
export type PositionFiltering = string;
export interface CreateTrackerRequest {
  TrackerName: string;
  PricingPlan?: string;
  KmsKeyId?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export const CreateTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String,
    PricingPlan: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    PositionFiltering: S.optional(S.String),
    EventBridgeEnabled: S.optional(S.Boolean),
    KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tracking/v0/trackers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTrackerRequest",
}) as any as S.Schema<CreateTrackerRequest>;
export interface CreateTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  CreateTime: Date;
}
export const CreateTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String,
    TrackerArn: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateTrackerResponse",
}) as any as S.Schema<CreateTrackerResponse>;
export interface DeleteGeofenceCollectionRequest {
  CollectionName: string;
}
export const DeleteGeofenceCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/geofencing/v0/collections/{CollectionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGeofenceCollectionRequest",
}) as any as S.Schema<DeleteGeofenceCollectionRequest>;
export interface DeleteGeofenceCollectionResponse {}
export const DeleteGeofenceCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGeofenceCollectionResponse",
}) as any as S.Schema<DeleteGeofenceCollectionResponse>;
export interface DeleteKeyRequest {
  KeyName: string;
  ForceDelete?: boolean;
}
export const DeleteKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyName: S.String.pipe(T.HttpLabel("KeyName")),
    ForceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/metadata/v0/keys/{KeyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteKeyRequest",
}) as any as S.Schema<DeleteKeyRequest>;
export interface DeleteKeyResponse {}
export const DeleteKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteKeyResponse",
}) as any as S.Schema<DeleteKeyResponse>;
export interface DeleteMapRequest {
  MapName: string;
}
export const DeleteMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MapName: S.String.pipe(T.HttpLabel("MapName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/maps/v0/maps/{MapName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMapRequest",
}) as any as S.Schema<DeleteMapRequest>;
export interface DeleteMapResponse {}
export const DeleteMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMapResponse",
}) as any as S.Schema<DeleteMapResponse>;
export interface DeletePlaceIndexRequest {
  IndexName: string;
}
export const DeletePlaceIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexName: S.String.pipe(T.HttpLabel("IndexName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/places/v0/indexes/{IndexName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePlaceIndexRequest",
}) as any as S.Schema<DeletePlaceIndexRequest>;
export interface DeletePlaceIndexResponse {}
export const DeletePlaceIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePlaceIndexResponse",
}) as any as S.Schema<DeletePlaceIndexResponse>;
export interface DeleteRouteCalculatorRequest {
  CalculatorName: string;
}
export const DeleteRouteCalculatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/routes/v0/calculators/{CalculatorName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteCalculatorRequest",
}) as any as S.Schema<DeleteRouteCalculatorRequest>;
export interface DeleteRouteCalculatorResponse {}
export const DeleteRouteCalculatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteCalculatorResponse",
}) as any as S.Schema<DeleteRouteCalculatorResponse>;
export interface DeleteTrackerRequest {
  TrackerName: string;
}
export const DeleteTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrackerName: S.String.pipe(T.HttpLabel("TrackerName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tracking/v0/trackers/{TrackerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTrackerRequest",
}) as any as S.Schema<DeleteTrackerRequest>;
export interface DeleteTrackerResponse {}
export const DeleteTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrackerResponse",
}) as any as S.Schema<DeleteTrackerResponse>;
export interface DescribeGeofenceCollectionRequest {
  CollectionName: string;
}
export const DescribeGeofenceCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/geofencing/v0/collections/{CollectionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGeofenceCollectionRequest",
}) as any as S.Schema<DescribeGeofenceCollectionRequest>;
export interface DescribeGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  KmsKeyId?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceCount?: number;
}
export const DescribeGeofenceCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String,
    CollectionArn: S.String,
    Description: S.optional(S.String),
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Tags: S.optional(TagMap),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    GeofenceCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DescribeGeofenceCollectionResponse",
}) as any as S.Schema<DescribeGeofenceCollectionResponse>;
export interface DescribeKeyRequest {
  KeyName: string;
}
export const DescribeKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyName: S.String.pipe(T.HttpLabel("KeyName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/metadata/v0/keys/{KeyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeKeyRequest",
}) as any as S.Schema<DescribeKeyRequest>;
export interface DescribeKeyResponse {
  Key: string | redacted.Redacted<string>;
  KeyArn: string;
  KeyName: string;
  Restrictions: ApiKeyRestrictions;
  CreateTime: Date;
  ExpireTime: Date;
  UpdateTime: Date;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: SensitiveString,
    KeyArn: S.String,
    KeyName: S.String,
    Restrictions: ApiKeyRestrictions,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExpireTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeKeyResponse",
}) as any as S.Schema<DescribeKeyResponse>;
export interface DescribeMapRequest {
  MapName: string;
}
export const DescribeMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MapName: S.String.pipe(T.HttpLabel("MapName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/maps/v0/maps/{MapName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMapRequest",
}) as any as S.Schema<DescribeMapRequest>;
export interface DescribeMapResponse {
  MapName: string;
  MapArn: string;
  PricingPlan?: string;
  DataSource: string;
  Configuration: MapConfiguration;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
}
export const DescribeMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String,
    MapArn: S.String,
    PricingPlan: S.optional(S.String),
    DataSource: S.String,
    Configuration: MapConfiguration,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DescribeMapResponse",
}) as any as S.Schema<DescribeMapResponse>;
export interface DescribePlaceIndexRequest {
  IndexName: string;
}
export const DescribePlaceIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexName: S.String.pipe(T.HttpLabel("IndexName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/places/v0/indexes/{IndexName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePlaceIndexRequest",
}) as any as S.Schema<DescribePlaceIndexRequest>;
export interface DescribePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  PricingPlan?: string;
  Description?: string;
  CreateTime: Date;
  UpdateTime: Date;
  DataSource: string;
  DataSourceConfiguration: DataSourceConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const DescribePlaceIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    IndexArn: S.String,
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DataSource: S.String,
    DataSourceConfiguration: DataSourceConfiguration,
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribePlaceIndexResponse",
}) as any as S.Schema<DescribePlaceIndexResponse>;
export interface DescribeRouteCalculatorRequest {
  CalculatorName: string;
}
export const DescribeRouteCalculatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/routes/v0/calculators/{CalculatorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRouteCalculatorRequest",
}) as any as S.Schema<DescribeRouteCalculatorRequest>;
export interface DescribeRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  PricingPlan?: string;
  Description?: string;
  CreateTime: Date;
  UpdateTime: Date;
  DataSource: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeRouteCalculatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String,
    CalculatorArn: S.String,
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DataSource: S.String,
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeRouteCalculatorResponse",
}) as any as S.Schema<DescribeRouteCalculatorResponse>;
export interface DescribeTrackerRequest {
  TrackerName: string;
}
export const DescribeTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrackerName: S.String.pipe(T.HttpLabel("TrackerName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tracking/v0/trackers/{TrackerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTrackerRequest",
}) as any as S.Schema<DescribeTrackerRequest>;
export interface DescribeTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Tags?: { [key: string]: string | undefined };
  CreateTime: Date;
  UpdateTime: Date;
  KmsKeyId?: string;
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export const DescribeTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String,
    TrackerArn: S.String,
    Description: S.optional(S.String),
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    Tags: S.optional(TagMap),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    KmsKeyId: S.optional(S.String),
    PositionFiltering: S.optional(S.String),
    EventBridgeEnabled: S.optional(S.Boolean),
    KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeTrackerResponse",
}) as any as S.Schema<DescribeTrackerResponse>;
export interface DisassociateTrackerConsumerRequest {
  TrackerName: string;
  ConsumerArn: string;
}
export const DisassociateTrackerConsumerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    ConsumerArn: S.String.pipe(T.HttpLabel("ConsumerArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/tracking/v0/trackers/{TrackerName}/consumers/{ConsumerArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateTrackerConsumerRequest",
}) as any as S.Schema<DisassociateTrackerConsumerRequest>;
export interface DisassociateTrackerConsumerResponse {}
export const DisassociateTrackerConsumerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateTrackerConsumerResponse",
}) as any as S.Schema<DisassociateTrackerConsumerResponse>;
export interface ForecastGeofenceEventsDeviceState {
  Position: number[];
  Speed?: number;
}
export const ForecastGeofenceEventsDeviceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Position: Position, Speed: S.optional(S.Number) }),
).annotate({
  identifier: "ForecastGeofenceEventsDeviceState",
}) as any as S.Schema<ForecastGeofenceEventsDeviceState>;
export type SpeedUnit = string;
export type LargeToken = string;
export interface ForecastGeofenceEventsRequest {
  CollectionName: string;
  DeviceState: ForecastGeofenceEventsDeviceState;
  TimeHorizonMinutes?: number;
  DistanceUnit?: string;
  SpeedUnit?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ForecastGeofenceEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    DeviceState: ForecastGeofenceEventsDeviceState,
    TimeHorizonMinutes: S.optional(S.Number),
    DistanceUnit: S.optional(S.String),
    SpeedUnit: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/geofencing/v0/collections/{CollectionName}/forecast-geofence-events",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ForecastGeofenceEventsRequest",
}) as any as S.Schema<ForecastGeofenceEventsRequest>;
export type Uuid = string;
export type NearestDistance = number;
export type ForecastedGeofenceEventType = string;
export interface ForecastedEvent {
  EventId: string;
  GeofenceId: string;
  IsDeviceInGeofence: boolean;
  NearestDistance: number;
  EventType: string;
  ForecastedBreachTime?: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export const ForecastedEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.String,
    GeofenceId: S.String,
    IsDeviceInGeofence: S.Boolean,
    NearestDistance: S.Number,
    EventType: S.String,
    ForecastedBreachTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    GeofenceProperties: S.optional(PropertyMap),
  }),
).annotate({
  identifier: "ForecastedEvent",
}) as any as S.Schema<ForecastedEvent>;
export type ForecastedEventsList = ForecastedEvent[];
export const ForecastedEventsList = /*@__PURE__*/ S.Array(ForecastedEvent);
export interface ForecastGeofenceEventsResponse {
  ForecastedEvents: ForecastedEvent[];
  NextToken?: string;
  DistanceUnit: string;
  SpeedUnit: string;
}
export const ForecastGeofenceEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastedEvents: ForecastedEventsList,
    NextToken: S.optional(S.String),
    DistanceUnit: S.String,
    SpeedUnit: S.String,
  }),
).annotate({
  identifier: "ForecastGeofenceEventsResponse",
}) as any as S.Schema<ForecastGeofenceEventsResponse>;
export interface GetDevicePositionRequest {
  TrackerName: string;
  DeviceId: string;
}
export const GetDevicePositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/positions/latest",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDevicePositionRequest",
}) as any as S.Schema<GetDevicePositionRequest>;
export interface GetDevicePositionResponse {
  DeviceId?: string;
  SampleTime: Date;
  ReceivedTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export const GetDevicePositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.optional(S.String),
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ReceivedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Position: Position,
    Accuracy: S.optional(PositionalAccuracy),
    PositionProperties: S.optional(PositionPropertyMap),
  }),
).annotate({
  identifier: "GetDevicePositionResponse",
}) as any as S.Schema<GetDevicePositionResponse>;
export type Token = string;
export interface GetDevicePositionHistoryRequest {
  TrackerName: string;
  DeviceId: string;
  NextToken?: string;
  StartTimeInclusive?: Date;
  EndTimeExclusive?: Date;
  MaxResults?: number;
}
export const GetDevicePositionHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    DeviceId: S.String.pipe(T.HttpLabel("DeviceId")),
    NextToken: S.optional(S.String),
    StartTimeInclusive: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTimeExclusive: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/devices/{DeviceId}/list-positions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDevicePositionHistoryRequest",
}) as any as S.Schema<GetDevicePositionHistoryRequest>;
export interface GetDevicePositionHistoryResponse {
  DevicePositions: DevicePosition[];
  NextToken?: string;
}
export const GetDevicePositionHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DevicePositions: DevicePositionList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDevicePositionHistoryResponse",
}) as any as S.Schema<GetDevicePositionHistoryResponse>;
export interface GetGeofenceRequest {
  CollectionName: string;
  GeofenceId: string;
}
export const GetGeofenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    GeofenceId: S.String.pipe(T.HttpLabel("GeofenceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGeofenceRequest",
}) as any as S.Schema<GetGeofenceRequest>;
export interface GetGeofenceResponse {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  Status: string;
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export const GetGeofenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeofenceId: S.String,
    Geometry: GeofenceGeometry,
    Status: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    GeofenceProperties: S.optional(PropertyMap),
  }),
).annotate({
  identifier: "GetGeofenceResponse",
}) as any as S.Schema<GetGeofenceResponse>;
export interface GetJobRequest {
  JobId: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/metadata/v0/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export type JobAction = string;
export type ValidateAddressAdditionalFeature = string;
export type ValidateAddressAdditionalFeatureList = string[];
export const ValidateAddressAdditionalFeatureList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ValidateAddressActionOptions {
  AdditionalFeatures?: string[];
}
export const ValidateAddressActionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalFeatures: S.optional(ValidateAddressAdditionalFeatureList),
  }),
).annotate({
  identifier: "ValidateAddressActionOptions",
}) as any as S.Schema<ValidateAddressActionOptions>;
export interface JobActionOptions {
  ValidateAddress?: ValidateAddressActionOptions;
}
export const JobActionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ValidateAddress: S.optional(ValidateAddressActionOptions) }),
).annotate({
  identifier: "JobActionOptions",
}) as any as S.Schema<JobActionOptions>;
export type JobErrorCode = string;
export type JobErrorMessage = string;
export type JobErrorMessagesList = string[];
export const JobErrorMessagesList = /*@__PURE__*/ S.Array(S.String);
export interface JobError {
  Code: string;
  Messages?: string[];
}
export const JobError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.String, Messages: S.optional(JobErrorMessagesList) }),
).annotate({ identifier: "JobError" }) as any as S.Schema<JobError>;
export type IamRoleArn = string;
export type JobInputLocation = string;
export type JobInputFormat = string;
export interface JobInputOptions {
  Location: string;
  Format: string;
}
export const JobInputOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Location: S.String, Format: S.String }),
).annotate({
  identifier: "JobInputOptions",
}) as any as S.Schema<JobInputOptions>;
export type JobOutputFormat = string;
export type JobOutputLocation = string;
export interface JobOutputOptions {
  Format: string;
  Location: string;
}
export const JobOutputOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Format: S.String, Location: S.String }),
).annotate({
  identifier: "JobOutputOptions",
}) as any as S.Schema<JobOutputOptions>;
export interface GetJobResponse {
  Action: string;
  ActionOptions?: JobActionOptions;
  CreatedAt: Date;
  EndedAt?: Date;
  Error?: JobError;
  ExecutionRoleArn: string;
  InputOptions: JobInputOptions;
  JobArn: string;
  JobId: string;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Status: string;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.String,
    ActionOptions: S.optional(JobActionOptions),
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Error: S.optional(JobError),
    ExecutionRoleArn: S.String,
    InputOptions: JobInputOptions,
    JobArn: S.String,
    JobId: S.String,
    Name: S.optional(S.String),
    OutputOptions: JobOutputOptions,
    Status: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Tags: S.optional(TagMap),
  }),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export interface GetMapGlyphsRequest {
  MapName: string;
  FontStack: string;
  FontUnicodeRange: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetMapGlyphsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String.pipe(T.HttpLabel("MapName")),
    FontStack: S.String.pipe(T.HttpLabel("FontStack")),
    FontUnicodeRange: S.String.pipe(T.HttpLabel("FontUnicodeRange")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/maps/v0/maps/{MapName}/glyphs/{FontStack}/{FontUnicodeRange}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMapGlyphsRequest",
}) as any as S.Schema<GetMapGlyphsRequest>;
export interface GetMapGlyphsResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export const GetMapGlyphsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
  }),
).annotate({
  identifier: "GetMapGlyphsResponse",
}) as any as S.Schema<GetMapGlyphsResponse>;
export interface GetMapSpritesRequest {
  MapName: string;
  FileName: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetMapSpritesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String.pipe(T.HttpLabel("MapName")),
    FileName: S.String.pipe(T.HttpLabel("FileName")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/maps/v0/maps/{MapName}/sprites/{FileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMapSpritesRequest",
}) as any as S.Schema<GetMapSpritesRequest>;
export interface GetMapSpritesResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export const GetMapSpritesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
  }),
).annotate({
  identifier: "GetMapSpritesResponse",
}) as any as S.Schema<GetMapSpritesResponse>;
export interface GetMapStyleDescriptorRequest {
  MapName: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetMapStyleDescriptorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String.pipe(T.HttpLabel("MapName")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/maps/v0/maps/{MapName}/style-descriptor",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMapStyleDescriptorRequest",
}) as any as S.Schema<GetMapStyleDescriptorRequest>;
export interface GetMapStyleDescriptorResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export const GetMapStyleDescriptorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
  }),
).annotate({
  identifier: "GetMapStyleDescriptorResponse",
}) as any as S.Schema<GetMapStyleDescriptorResponse>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetMapTileRequest {
  MapName: string;
  Z: string | redacted.Redacted<string>;
  X: string | redacted.Redacted<string>;
  Y: string | redacted.Redacted<string>;
  Key?: string | redacted.Redacted<string>;
}
export const GetMapTileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String.pipe(T.HttpLabel("MapName")),
    Z: SensitiveString.pipe(T.HttpLabel("Z")),
    X: SensitiveString.pipe(T.HttpLabel("X")),
    Y: SensitiveString.pipe(T.HttpLabel("Y")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/maps/v0/maps/{MapName}/tiles/{Z}/{X}/{Y}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMapTileRequest",
}) as any as S.Schema<GetMapTileRequest>;
export interface GetMapTileResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
}
export const GetMapTileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
  }),
).annotate({
  identifier: "GetMapTileResponse",
}) as any as S.Schema<GetMapTileResponse>;
export type PlaceId = string | redacted.Redacted<string>;
export type LanguageTag = string;
export interface GetPlaceRequest {
  IndexName: string;
  PlaceId: string | redacted.Redacted<string>;
  Language?: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetPlaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
    PlaceId: SensitiveString.pipe(T.HttpLabel("PlaceId")),
    Language: S.optional(S.String).pipe(T.HttpQuery("language")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/places/v0/indexes/{IndexName}/places/{PlaceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlaceRequest",
}) as any as S.Schema<GetPlaceRequest>;
export interface PlaceGeometry {
  Point?: number[];
}
export const PlaceGeometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Point: S.optional(Position) }),
).annotate({ identifier: "PlaceGeometry" }) as any as S.Schema<PlaceGeometry>;
export type SensitiveInteger = number;
export interface TimeZone {
  Name: string | redacted.Redacted<string>;
  Offset?: number;
}
export const TimeZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: SensitiveString, Offset: S.optional(S.Number) }),
).annotate({ identifier: "TimeZone" }) as any as S.Schema<TimeZone>;
export type PlaceCategory = string | redacted.Redacted<string>;
export type PlaceCategoryList = (string | redacted.Redacted<string>)[];
export const PlaceCategoryList = /*@__PURE__*/ S.Array(SensitiveString);
export type PlaceSupplementalCategory = string | redacted.Redacted<string>;
export type PlaceSupplementalCategoryList = (
  | string
  | redacted.Redacted<string>
)[];
export const PlaceSupplementalCategoryList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface Place {
  Label?: string | redacted.Redacted<string>;
  Geometry: PlaceGeometry;
  AddressNumber?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  Neighborhood?: string | redacted.Redacted<string>;
  Municipality?: string | redacted.Redacted<string>;
  SubRegion?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  Country?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Interpolated?: boolean;
  TimeZone?: TimeZone;
  UnitType?: string | redacted.Redacted<string>;
  UnitNumber?: string | redacted.Redacted<string>;
  Categories?: (string | redacted.Redacted<string>)[];
  SupplementalCategories?: (string | redacted.Redacted<string>)[];
  SubMunicipality?: string | redacted.Redacted<string>;
}
export const Place = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(SensitiveString),
    Geometry: PlaceGeometry,
    AddressNumber: S.optional(SensitiveString),
    Street: S.optional(SensitiveString),
    Neighborhood: S.optional(SensitiveString),
    Municipality: S.optional(SensitiveString),
    SubRegion: S.optional(SensitiveString),
    Region: S.optional(SensitiveString),
    Country: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
    Interpolated: S.optional(S.Boolean),
    TimeZone: S.optional(TimeZone),
    UnitType: S.optional(SensitiveString),
    UnitNumber: S.optional(SensitiveString),
    Categories: S.optional(PlaceCategoryList),
    SupplementalCategories: S.optional(PlaceSupplementalCategoryList),
    SubMunicipality: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Place" }) as any as S.Schema<Place>;
export interface GetPlaceResponse {
  Place: Place;
}
export const GetPlaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Place: Place }),
).annotate({
  identifier: "GetPlaceResponse",
}) as any as S.Schema<GetPlaceResponse>;
export interface TrackingFilterGeometry {
  Polygon?: number[][][];
}
export const TrackingFilterGeometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Polygon: S.optional(LinearRings) }),
).annotate({
  identifier: "TrackingFilterGeometry",
}) as any as S.Schema<TrackingFilterGeometry>;
export interface ListDevicePositionsRequest {
  TrackerName: string;
  MaxResults?: number;
  NextToken?: string;
  FilterGeometry?: TrackingFilterGeometry;
}
export const ListDevicePositionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    FilterGeometry: S.optional(TrackingFilterGeometry),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/list-positions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicePositionsRequest",
}) as any as S.Schema<ListDevicePositionsRequest>;
export interface ListDevicePositionsResponseEntry {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  PositionProperties?: { [key: string]: string | undefined };
}
export const ListDevicePositionsResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Position: Position,
    Accuracy: S.optional(PositionalAccuracy),
    PositionProperties: S.optional(PositionPropertyMap),
  }),
).annotate({
  identifier: "ListDevicePositionsResponseEntry",
}) as any as S.Schema<ListDevicePositionsResponseEntry>;
export type ListDevicePositionsResponseEntryList =
  ListDevicePositionsResponseEntry[];
export const ListDevicePositionsResponseEntryList = /*@__PURE__*/ S.Array(
  ListDevicePositionsResponseEntry,
);
export interface ListDevicePositionsResponse {
  Entries: ListDevicePositionsResponseEntry[];
  NextToken?: string;
}
export const ListDevicePositionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListDevicePositionsResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevicePositionsResponse",
}) as any as S.Schema<ListDevicePositionsResponse>;
export interface ListGeofenceCollectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListGeofenceCollectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/geofencing/v0/list-collections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGeofenceCollectionsRequest",
}) as any as S.Schema<ListGeofenceCollectionsRequest>;
export interface ListGeofenceCollectionsResponseEntry {
  CollectionName: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListGeofenceCollectionsResponseEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CollectionName: S.String,
      Description: S.optional(S.String),
      PricingPlan: S.optional(S.String),
      PricingPlanDataSource: S.optional(S.String),
      CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "ListGeofenceCollectionsResponseEntry",
}) as any as S.Schema<ListGeofenceCollectionsResponseEntry>;
export type ListGeofenceCollectionsResponseEntryList =
  ListGeofenceCollectionsResponseEntry[];
export const ListGeofenceCollectionsResponseEntryList = /*@__PURE__*/ S.Array(
  ListGeofenceCollectionsResponseEntry,
);
export interface ListGeofenceCollectionsResponse {
  Entries: ListGeofenceCollectionsResponseEntry[];
  NextToken?: string;
}
export const ListGeofenceCollectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListGeofenceCollectionsResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGeofenceCollectionsResponse",
}) as any as S.Schema<ListGeofenceCollectionsResponse>;
export interface ListGeofencesRequest {
  CollectionName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGeofencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/geofencing/v0/collections/{CollectionName}/list-geofences",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGeofencesRequest",
}) as any as S.Schema<ListGeofencesRequest>;
export interface ListGeofenceResponseEntry {
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  Status: string;
  CreateTime: Date;
  UpdateTime: Date;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export const ListGeofenceResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeofenceId: S.String,
    Geometry: GeofenceGeometry,
    Status: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    GeofenceProperties: S.optional(PropertyMap),
  }),
).annotate({
  identifier: "ListGeofenceResponseEntry",
}) as any as S.Schema<ListGeofenceResponseEntry>;
export type ListGeofenceResponseEntryList = ListGeofenceResponseEntry[];
export const ListGeofenceResponseEntryList = /*@__PURE__*/ S.Array(
  ListGeofenceResponseEntry,
);
export interface ListGeofencesResponse {
  Entries: ListGeofenceResponseEntry[];
  NextToken?: string;
}
export const ListGeofencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListGeofenceResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGeofencesResponse",
}) as any as S.Schema<ListGeofencesResponse>;
export interface JobsFilter {
  JobStatus?: string;
}
export const JobsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobStatus: S.optional(S.String) }),
).annotate({ identifier: "JobsFilter" }) as any as S.Schema<JobsFilter>;
export interface ListJobsRequest {
  Filter?: JobsFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(JobsFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata/v0/jobs/list-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface ListJobsResponseEntry {
  Action: string;
  ActionOptions?: JobActionOptions;
  CreatedAt: Date;
  ExecutionRoleArn: string;
  EndedAt?: Date;
  Error?: JobError;
  InputOptions: JobInputOptions;
  JobId: string;
  JobArn: string;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Status: string;
  UpdatedAt: Date;
}
export const ListJobsResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.String,
    ActionOptions: S.optional(JobActionOptions),
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExecutionRoleArn: S.String,
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Error: S.optional(JobError),
    InputOptions: JobInputOptions,
    JobId: S.String,
    JobArn: S.String,
    Name: S.optional(S.String),
    OutputOptions: JobOutputOptions,
    Status: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListJobsResponseEntry",
}) as any as S.Schema<ListJobsResponseEntry>;
export type ListJobsResponseEntryList = ListJobsResponseEntry[];
export const ListJobsResponseEntryList = /*@__PURE__*/ S.Array(
  ListJobsResponseEntry,
);
export interface ListJobsResponse {
  Entries: ListJobsResponseEntry[];
  NextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListJobsResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export type Status = string;
export interface ApiKeyFilter {
  KeyStatus?: string;
}
export const ApiKeyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyStatus: S.optional(S.String) }),
).annotate({ identifier: "ApiKeyFilter" }) as any as S.Schema<ApiKeyFilter>;
export interface ListKeysRequest {
  MaxResults?: number;
  NextToken?: string;
  Filter?: ApiKeyFilter;
}
export const ListKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filter: S.optional(ApiKeyFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata/v0/list-keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListKeysRequest",
}) as any as S.Schema<ListKeysRequest>;
export interface ListKeysResponseEntry {
  KeyName: string;
  ExpireTime: Date;
  Description?: string;
  Restrictions: ApiKeyRestrictions;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListKeysResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyName: S.String,
    ExpireTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Description: S.optional(S.String),
    Restrictions: ApiKeyRestrictions,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListKeysResponseEntry",
}) as any as S.Schema<ListKeysResponseEntry>;
export type ListKeysResponseEntryList = ListKeysResponseEntry[];
export const ListKeysResponseEntryList = /*@__PURE__*/ S.Array(
  ListKeysResponseEntry,
);
export interface ListKeysResponse {
  Entries: ListKeysResponseEntry[];
  NextToken?: string;
}
export const ListKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListKeysResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListKeysResponse",
}) as any as S.Schema<ListKeysResponse>;
export interface ListMapsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListMapsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/maps/v0/list-maps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMapsRequest",
}) as any as S.Schema<ListMapsRequest>;
export interface ListMapsResponseEntry {
  MapName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListMapsResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String,
    Description: S.optional(S.String),
    DataSource: S.String,
    PricingPlan: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListMapsResponseEntry",
}) as any as S.Schema<ListMapsResponseEntry>;
export type ListMapsResponseEntryList = ListMapsResponseEntry[];
export const ListMapsResponseEntryList = /*@__PURE__*/ S.Array(
  ListMapsResponseEntry,
);
export interface ListMapsResponse {
  Entries: ListMapsResponseEntry[];
  NextToken?: string;
}
export const ListMapsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListMapsResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMapsResponse",
}) as any as S.Schema<ListMapsResponse>;
export interface ListPlaceIndexesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPlaceIndexesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/places/v0/list-indexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlaceIndexesRequest",
}) as any as S.Schema<ListPlaceIndexesRequest>;
export interface ListPlaceIndexesResponseEntry {
  IndexName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListPlaceIndexesResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    Description: S.optional(S.String),
    DataSource: S.String,
    PricingPlan: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListPlaceIndexesResponseEntry",
}) as any as S.Schema<ListPlaceIndexesResponseEntry>;
export type ListPlaceIndexesResponseEntryList = ListPlaceIndexesResponseEntry[];
export const ListPlaceIndexesResponseEntryList = /*@__PURE__*/ S.Array(
  ListPlaceIndexesResponseEntry,
);
export interface ListPlaceIndexesResponse {
  Entries: ListPlaceIndexesResponseEntry[];
  NextToken?: string;
}
export const ListPlaceIndexesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListPlaceIndexesResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPlaceIndexesResponse",
}) as any as S.Schema<ListPlaceIndexesResponse>;
export interface ListRouteCalculatorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRouteCalculatorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/routes/v0/list-calculators" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRouteCalculatorsRequest",
}) as any as S.Schema<ListRouteCalculatorsRequest>;
export interface ListRouteCalculatorsResponseEntry {
  CalculatorName: string;
  Description?: string;
  DataSource: string;
  PricingPlan?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListRouteCalculatorsResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String,
    Description: S.optional(S.String),
    DataSource: S.String,
    PricingPlan: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListRouteCalculatorsResponseEntry",
}) as any as S.Schema<ListRouteCalculatorsResponseEntry>;
export type ListRouteCalculatorsResponseEntryList =
  ListRouteCalculatorsResponseEntry[];
export const ListRouteCalculatorsResponseEntryList = /*@__PURE__*/ S.Array(
  ListRouteCalculatorsResponseEntry,
);
export interface ListRouteCalculatorsResponse {
  Entries: ListRouteCalculatorsResponseEntry[];
  NextToken?: string;
}
export const ListRouteCalculatorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListRouteCalculatorsResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRouteCalculatorsResponse",
}) as any as S.Schema<ListRouteCalculatorsResponse>;
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
export interface ListTrackerConsumersRequest {
  TrackerName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTrackerConsumersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/list-consumers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrackerConsumersRequest",
}) as any as S.Schema<ListTrackerConsumersRequest>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListTrackerConsumersResponse {
  ConsumerArns: string[];
  NextToken?: string;
}
export const ListTrackerConsumersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConsumerArns: ArnList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTrackerConsumersResponse",
}) as any as S.Schema<ListTrackerConsumersResponse>;
export interface ListTrackersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListTrackersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tracking/v0/list-trackers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrackersRequest",
}) as any as S.Schema<ListTrackersRequest>;
export interface ListTrackersResponseEntry {
  TrackerName: string;
  Description?: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const ListTrackersResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String,
    Description: S.optional(S.String),
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListTrackersResponseEntry",
}) as any as S.Schema<ListTrackersResponseEntry>;
export type ListTrackersResponseEntryList = ListTrackersResponseEntry[];
export const ListTrackersResponseEntryList = /*@__PURE__*/ S.Array(
  ListTrackersResponseEntry,
);
export interface ListTrackersResponse {
  Entries: ListTrackersResponseEntry[];
  NextToken?: string;
}
export const ListTrackersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: ListTrackersResponseEntryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTrackersResponse",
}) as any as S.Schema<ListTrackersResponse>;
export interface PutGeofenceRequest {
  CollectionName: string;
  GeofenceId: string;
  Geometry: GeofenceGeometry;
  GeofenceProperties?: { [key: string]: string | undefined };
}
export const PutGeofenceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    GeofenceId: S.String.pipe(T.HttpLabel("GeofenceId")),
    Geometry: GeofenceGeometry,
    GeofenceProperties: S.optional(PropertyMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/geofencing/v0/collections/{CollectionName}/geofences/{GeofenceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGeofenceRequest",
}) as any as S.Schema<PutGeofenceRequest>;
export interface PutGeofenceResponse {
  GeofenceId: string;
  CreateTime: Date;
  UpdateTime: Date;
}
export const PutGeofenceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeofenceId: S.String,
    CreateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PutGeofenceResponse",
}) as any as S.Schema<PutGeofenceResponse>;
export type PlaceIndexSearchResultLimit = number;
export interface SearchPlaceIndexForPositionRequest {
  IndexName: string;
  Position: number[];
  MaxResults?: number;
  Language?: string;
  Key?: string | redacted.Redacted<string>;
}
export const SearchPlaceIndexForPositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
    Position: Position,
    MaxResults: S.optional(S.Number),
    Language: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/places/v0/indexes/{IndexName}/search/position",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchPlaceIndexForPositionRequest",
}) as any as S.Schema<SearchPlaceIndexForPositionRequest>;
export interface SearchPlaceIndexForPositionSummary {
  Position: number[];
  MaxResults?: number;
  DataSource: string;
  Language?: string;
}
export const SearchPlaceIndexForPositionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Position: Position,
    MaxResults: S.optional(S.Number),
    DataSource: S.String,
    Language: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchPlaceIndexForPositionSummary",
}) as any as S.Schema<SearchPlaceIndexForPositionSummary>;
export interface SearchForPositionResult {
  Place: Place;
  Distance: number;
  PlaceId?: string | redacted.Redacted<string>;
}
export const SearchForPositionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Place: Place,
    Distance: S.Number,
    PlaceId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "SearchForPositionResult",
}) as any as S.Schema<SearchForPositionResult>;
export type SearchForPositionResultList = SearchForPositionResult[];
export const SearchForPositionResultList = /*@__PURE__*/ S.Array(
  SearchForPositionResult,
);
export interface SearchPlaceIndexForPositionResponse {
  Summary: SearchPlaceIndexForPositionSummary;
  Results: SearchForPositionResult[];
}
export const SearchPlaceIndexForPositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summary: SearchPlaceIndexForPositionSummary,
    Results: SearchForPositionResultList,
  }),
).annotate({
  identifier: "SearchPlaceIndexForPositionResponse",
}) as any as S.Schema<SearchPlaceIndexForPositionResponse>;
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export const CountryCodeList = /*@__PURE__*/ S.Array(SensitiveString);
export type FilterPlaceCategoryList = (string | redacted.Redacted<string>)[];
export const FilterPlaceCategoryList = /*@__PURE__*/ S.Array(SensitiveString);
export interface SearchPlaceIndexForSuggestionsRequest {
  IndexName: string;
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
  Key?: string | redacted.Redacted<string>;
}
export const SearchPlaceIndexForSuggestionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IndexName: S.String.pipe(T.HttpLabel("IndexName")),
      Text: SensitiveString,
      BiasPosition: S.optional(Position),
      FilterBBox: S.optional(BoundingBox),
      FilterCountries: S.optional(CountryCodeList),
      MaxResults: S.optional(S.Number),
      Language: S.optional(S.String),
      FilterCategories: S.optional(FilterPlaceCategoryList),
      Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/places/v0/indexes/{IndexName}/search/suggestions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "SearchPlaceIndexForSuggestionsRequest",
}) as any as S.Schema<SearchPlaceIndexForSuggestionsRequest>;
export interface SearchPlaceIndexForSuggestionsSummary {
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  DataSource: string;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
}
export const SearchPlaceIndexForSuggestionsSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Text: SensitiveString,
      BiasPosition: S.optional(Position),
      FilterBBox: S.optional(BoundingBox),
      FilterCountries: S.optional(CountryCodeList),
      MaxResults: S.optional(S.Number),
      DataSource: S.String,
      Language: S.optional(S.String),
      FilterCategories: S.optional(FilterPlaceCategoryList),
    }),
).annotate({
  identifier: "SearchPlaceIndexForSuggestionsSummary",
}) as any as S.Schema<SearchPlaceIndexForSuggestionsSummary>;
export interface SearchForSuggestionsResult {
  Text: string | redacted.Redacted<string>;
  PlaceId?: string | redacted.Redacted<string>;
  Categories?: (string | redacted.Redacted<string>)[];
  SupplementalCategories?: (string | redacted.Redacted<string>)[];
}
export const SearchForSuggestionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: SensitiveString,
    PlaceId: S.optional(SensitiveString),
    Categories: S.optional(PlaceCategoryList),
    SupplementalCategories: S.optional(PlaceSupplementalCategoryList),
  }),
).annotate({
  identifier: "SearchForSuggestionsResult",
}) as any as S.Schema<SearchForSuggestionsResult>;
export type SearchForSuggestionsResultList = SearchForSuggestionsResult[];
export const SearchForSuggestionsResultList = /*@__PURE__*/ S.Array(
  SearchForSuggestionsResult,
);
export interface SearchPlaceIndexForSuggestionsResponse {
  Summary: SearchPlaceIndexForSuggestionsSummary;
  Results: SearchForSuggestionsResult[];
}
export const SearchPlaceIndexForSuggestionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Summary: SearchPlaceIndexForSuggestionsSummary,
      Results: SearchForSuggestionsResultList,
    }),
).annotate({
  identifier: "SearchPlaceIndexForSuggestionsResponse",
}) as any as S.Schema<SearchPlaceIndexForSuggestionsResponse>;
export interface SearchPlaceIndexForTextRequest {
  IndexName: string;
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
  Key?: string | redacted.Redacted<string>;
}
export const SearchPlaceIndexForTextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
    Text: SensitiveString,
    BiasPosition: S.optional(Position),
    FilterBBox: S.optional(BoundingBox),
    FilterCountries: S.optional(CountryCodeList),
    MaxResults: S.optional(S.Number),
    Language: S.optional(S.String),
    FilterCategories: S.optional(FilterPlaceCategoryList),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/places/v0/indexes/{IndexName}/search/text",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchPlaceIndexForTextRequest",
}) as any as S.Schema<SearchPlaceIndexForTextRequest>;
export interface SearchPlaceIndexForTextSummary {
  Text: string | redacted.Redacted<string>;
  BiasPosition?: number[];
  FilterBBox?: number[];
  FilterCountries?: (string | redacted.Redacted<string>)[];
  MaxResults?: number;
  ResultBBox?: number[];
  DataSource: string;
  Language?: string;
  FilterCategories?: (string | redacted.Redacted<string>)[];
}
export const SearchPlaceIndexForTextSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: SensitiveString,
    BiasPosition: S.optional(Position),
    FilterBBox: S.optional(BoundingBox),
    FilterCountries: S.optional(CountryCodeList),
    MaxResults: S.optional(S.Number),
    ResultBBox: S.optional(BoundingBox),
    DataSource: S.String,
    Language: S.optional(S.String),
    FilterCategories: S.optional(FilterPlaceCategoryList),
  }),
).annotate({
  identifier: "SearchPlaceIndexForTextSummary",
}) as any as S.Schema<SearchPlaceIndexForTextSummary>;
export interface SearchForTextResult {
  Place: Place;
  Distance?: number;
  Relevance?: number;
  PlaceId?: string | redacted.Redacted<string>;
}
export const SearchForTextResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Place: Place,
    Distance: S.optional(S.Number),
    Relevance: S.optional(S.Number),
    PlaceId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "SearchForTextResult",
}) as any as S.Schema<SearchForTextResult>;
export type SearchForTextResultList = SearchForTextResult[];
export const SearchForTextResultList =
  /*@__PURE__*/ S.Array(SearchForTextResult);
export interface SearchPlaceIndexForTextResponse {
  Summary: SearchPlaceIndexForTextSummary;
  Results: SearchForTextResult[];
}
export const SearchPlaceIndexForTextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summary: SearchPlaceIndexForTextSummary,
    Results: SearchForTextResultList,
  }),
).annotate({
  identifier: "SearchPlaceIndexForTextResponse",
}) as any as S.Schema<SearchPlaceIndexForTextResponse>;
export type ClientToken = string;
export interface StartJobRequest {
  ClientToken?: string;
  Action: string;
  ActionOptions?: JobActionOptions;
  ExecutionRoleArn: string;
  InputOptions: JobInputOptions;
  Name?: string;
  OutputOptions: JobOutputOptions;
  Tags?: { [key: string]: string | undefined };
}
export const StartJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Action: S.String,
    ActionOptions: S.optional(JobActionOptions),
    ExecutionRoleArn: S.String,
    InputOptions: JobInputOptions,
    Name: S.optional(S.String),
    OutputOptions: JobOutputOptions,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata/v0/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartJobRequest",
}) as any as S.Schema<StartJobRequest>;
export interface StartJobResponse {
  CreatedAt: Date;
  JobArn: string;
  JobId: string;
  Status: string;
}
export const StartJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    JobArn: S.String,
    JobId: S.String,
    Status: S.String,
  }),
).annotate({
  identifier: "StartJobResponse",
}) as any as S.Schema<StartJobResponse>;
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateGeofenceCollectionRequest {
  CollectionName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
}
export const UpdateGeofenceCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String.pipe(T.HttpLabel("CollectionName")),
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/geofencing/v0/collections/{CollectionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGeofenceCollectionRequest",
}) as any as S.Schema<UpdateGeofenceCollectionRequest>;
export interface UpdateGeofenceCollectionResponse {
  CollectionName: string;
  CollectionArn: string;
  UpdateTime: Date;
}
export const UpdateGeofenceCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionName: S.String,
    CollectionArn: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateGeofenceCollectionResponse",
}) as any as S.Schema<UpdateGeofenceCollectionResponse>;
export interface UpdateKeyRequest {
  KeyName: string;
  Description?: string;
  ExpireTime?: Date;
  NoExpiry?: boolean;
  ForceUpdate?: boolean;
  Restrictions?: ApiKeyRestrictions;
}
export const UpdateKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyName: S.String.pipe(T.HttpLabel("KeyName")),
    Description: S.optional(S.String),
    ExpireTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NoExpiry: S.optional(S.Boolean),
    ForceUpdate: S.optional(S.Boolean),
    Restrictions: S.optional(ApiKeyRestrictions),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/metadata/v0/keys/{KeyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateKeyRequest",
}) as any as S.Schema<UpdateKeyRequest>;
export interface UpdateKeyResponse {
  KeyArn: string;
  KeyName: string;
  UpdateTime: Date;
}
export const UpdateKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyArn: S.String,
    KeyName: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateKeyResponse",
}) as any as S.Schema<UpdateKeyResponse>;
export type CountryCode3OrEmpty = string | redacted.Redacted<string>;
export interface MapConfigurationUpdate {
  PoliticalView?: string | redacted.Redacted<string>;
  CustomLayers?: string[];
}
export const MapConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoliticalView: S.optional(SensitiveString),
    CustomLayers: S.optional(CustomLayerList),
  }),
).annotate({
  identifier: "MapConfigurationUpdate",
}) as any as S.Schema<MapConfigurationUpdate>;
export interface UpdateMapRequest {
  MapName: string;
  PricingPlan?: string;
  Description?: string;
  ConfigurationUpdate?: MapConfigurationUpdate;
}
export const UpdateMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String.pipe(T.HttpLabel("MapName")),
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    ConfigurationUpdate: S.optional(MapConfigurationUpdate),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/maps/v0/maps/{MapName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMapRequest",
}) as any as S.Schema<UpdateMapRequest>;
export interface UpdateMapResponse {
  MapName: string;
  MapArn: string;
  UpdateTime: Date;
}
export const UpdateMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MapName: S.String,
    MapArn: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateMapResponse",
}) as any as S.Schema<UpdateMapResponse>;
export interface UpdatePlaceIndexRequest {
  IndexName: string;
  PricingPlan?: string;
  Description?: string;
  DataSourceConfiguration?: DataSourceConfiguration;
}
export const UpdatePlaceIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String.pipe(T.HttpLabel("IndexName")),
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
    DataSourceConfiguration: S.optional(DataSourceConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/places/v0/indexes/{IndexName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePlaceIndexRequest",
}) as any as S.Schema<UpdatePlaceIndexRequest>;
export interface UpdatePlaceIndexResponse {
  IndexName: string;
  IndexArn: string;
  UpdateTime: Date;
}
export const UpdatePlaceIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    IndexArn: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdatePlaceIndexResponse",
}) as any as S.Schema<UpdatePlaceIndexResponse>;
export interface UpdateRouteCalculatorRequest {
  CalculatorName: string;
  PricingPlan?: string;
  Description?: string;
}
export const UpdateRouteCalculatorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String.pipe(T.HttpLabel("CalculatorName")),
    PricingPlan: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/routes/v0/calculators/{CalculatorName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRouteCalculatorRequest",
}) as any as S.Schema<UpdateRouteCalculatorRequest>;
export interface UpdateRouteCalculatorResponse {
  CalculatorName: string;
  CalculatorArn: string;
  UpdateTime: Date;
}
export const UpdateRouteCalculatorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculatorName: S.String,
    CalculatorArn: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateRouteCalculatorResponse",
}) as any as S.Schema<UpdateRouteCalculatorResponse>;
export interface UpdateTrackerRequest {
  TrackerName: string;
  PricingPlan?: string;
  PricingPlanDataSource?: string;
  Description?: string;
  PositionFiltering?: string;
  EventBridgeEnabled?: boolean;
  KmsKeyEnableGeospatialQueries?: boolean;
}
export const UpdateTrackerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    PricingPlan: S.optional(S.String),
    PricingPlanDataSource: S.optional(S.String),
    Description: S.optional(S.String),
    PositionFiltering: S.optional(S.String),
    EventBridgeEnabled: S.optional(S.Boolean),
    KmsKeyEnableGeospatialQueries: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/tracking/v0/trackers/{TrackerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTrackerRequest",
}) as any as S.Schema<UpdateTrackerRequest>;
export interface UpdateTrackerResponse {
  TrackerName: string;
  TrackerArn: string;
  UpdateTime: Date;
}
export const UpdateTrackerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String,
    TrackerArn: S.String,
    UpdateTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateTrackerResponse",
}) as any as S.Schema<UpdateTrackerResponse>;
export interface WiFiAccessPoint {
  MacAddress: string;
  Rss: number;
}
export const WiFiAccessPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MacAddress: S.String, Rss: S.Number }),
).annotate({
  identifier: "WiFiAccessPoint",
}) as any as S.Schema<WiFiAccessPoint>;
export type WiFiAccessPointList = WiFiAccessPoint[];
export const WiFiAccessPointList = /*@__PURE__*/ S.Array(WiFiAccessPoint);
export type EutranCellId = number;
export type Earfcn = number;
export type Pci = number;
export interface LteLocalId {
  Earfcn: number;
  Pci: number;
}
export const LteLocalId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Earfcn: S.Number, Pci: S.Number }),
).annotate({ identifier: "LteLocalId" }) as any as S.Schema<LteLocalId>;
export type Rsrp = number;
export type Rsrq = number;
export interface LteNetworkMeasurements {
  Earfcn: number;
  CellId: number;
  Pci: number;
  Rsrp?: number;
  Rsrq?: number;
}
export const LteNetworkMeasurements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Earfcn: S.Number,
    CellId: S.Number,
    Pci: S.Number,
    Rsrp: S.optional(S.Number),
    Rsrq: S.optional(S.Number),
  }),
).annotate({
  identifier: "LteNetworkMeasurements",
}) as any as S.Schema<LteNetworkMeasurements>;
export type LteNetworkMeasurementsList = LteNetworkMeasurements[];
export const LteNetworkMeasurementsList = /*@__PURE__*/ S.Array(
  LteNetworkMeasurements,
);
export interface LteCellDetails {
  CellId: number;
  Mcc: number;
  Mnc: number;
  LocalId?: LteLocalId;
  NetworkMeasurements?: LteNetworkMeasurements[];
  TimingAdvance?: number;
  NrCapable?: boolean;
  Rsrp?: number;
  Rsrq?: number;
  Tac?: number;
}
export const LteCellDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellId: S.Number,
    Mcc: S.Number,
    Mnc: S.Number,
    LocalId: S.optional(LteLocalId),
    NetworkMeasurements: S.optional(LteNetworkMeasurementsList),
    TimingAdvance: S.optional(S.Number),
    NrCapable: S.optional(S.Boolean),
    Rsrp: S.optional(S.Number),
    Rsrq: S.optional(S.Number),
    Tac: S.optional(S.Number),
  }),
).annotate({ identifier: "LteCellDetails" }) as any as S.Schema<LteCellDetails>;
export type LteCellDetailsList = LteCellDetails[];
export const LteCellDetailsList = /*@__PURE__*/ S.Array(LteCellDetails);
export interface CellSignals {
  LteCellDetails: LteCellDetails[];
}
export const CellSignals = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LteCellDetails: LteCellDetailsList }),
).annotate({ identifier: "CellSignals" }) as any as S.Schema<CellSignals>;
export interface DeviceState {
  DeviceId: string;
  SampleTime: Date;
  Position: number[];
  Accuracy?: PositionalAccuracy;
  Ipv4Address?: string;
  WiFiAccessPoints?: WiFiAccessPoint[];
  CellSignals?: CellSignals;
}
export const DeviceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Position: Position,
    Accuracy: S.optional(PositionalAccuracy),
    Ipv4Address: S.optional(S.String),
    WiFiAccessPoints: S.optional(WiFiAccessPointList),
    CellSignals: S.optional(CellSignals),
  }),
).annotate({ identifier: "DeviceState" }) as any as S.Schema<DeviceState>;
export interface VerifyDevicePositionRequest {
  TrackerName: string;
  DeviceState: DeviceState;
  DistanceUnit?: string;
}
export const VerifyDevicePositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrackerName: S.String.pipe(T.HttpLabel("TrackerName")),
    DeviceState: DeviceState,
    DistanceUnit: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/tracking/v0/trackers/{TrackerName}/positions/verify",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyDevicePositionRequest",
}) as any as S.Schema<VerifyDevicePositionRequest>;
export interface InferredState {
  Position?: number[];
  Accuracy?: PositionalAccuracy;
  DeviationDistance?: number;
  ProxyDetected: boolean;
}
export const InferredState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Position: S.optional(Position),
    Accuracy: S.optional(PositionalAccuracy),
    DeviationDistance: S.optional(S.Number),
    ProxyDetected: S.Boolean,
  }),
).annotate({ identifier: "InferredState" }) as any as S.Schema<InferredState>;
export interface VerifyDevicePositionResponse {
  InferredState: InferredState;
  DeviceId: string;
  SampleTime: Date;
  ReceivedTime: Date;
  DistanceUnit: string;
}
export const VerifyDevicePositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InferredState: InferredState,
    DeviceId: S.String,
    SampleTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ReceivedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DistanceUnit: S.String,
  }),
).annotate({
  identifier: "VerifyDevicePositionResponse",
}) as any as S.Schema<VerifyDevicePositionResponse>;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Name: "name", Message: "message" }),
  ),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateTrackerConsumerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a geofence collection and a tracker resource. This allows the tracker resource to communicate location data to the linked geofence collection.
 *
 * You can associate up to five geofence collections to each tracker resource.
 *
 * Currently not supported — Cross-account configurations, such as creating associations between a tracker resource in one account and a geofence collection in another account.
 */
export const associateTrackerConsumer: API.OperationMethod<
  AssociateTrackerConsumerRequest,
  AssociateTrackerConsumerResponse,
  AssociateTrackerConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateTrackerConsumerRequest,
  output: AssociateTrackerConsumerResponse,
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
  operationName: "AssociateTrackerConsumer",
  endpointHostPrefix: "cp.tracking.",
}));

export type BatchDeleteDevicePositionHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the position history of one or more devices from a tracker resource.
 */
export const batchDeleteDevicePositionHistory: API.OperationMethod<
  BatchDeleteDevicePositionHistoryRequest,
  BatchDeleteDevicePositionHistoryResponse,
  BatchDeleteDevicePositionHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteDevicePositionHistoryRequest,
  output: BatchDeleteDevicePositionHistoryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteDevicePositionHistory",
  endpointHostPrefix: "tracking.",
}));

export type BatchDeleteGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch of geofences from a geofence collection.
 *
 * This operation deletes the resource permanently.
 */
export const batchDeleteGeofence: API.OperationMethod<
  BatchDeleteGeofenceRequest,
  BatchDeleteGeofenceResponse,
  BatchDeleteGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteGeofenceRequest,
  output: BatchDeleteGeofenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteGeofence",
  endpointHostPrefix: "geofencing.",
}));

export type BatchEvaluateGeofencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates device positions against the geofence geometries from a given geofence collection.
 *
 * This operation always returns an empty response because geofences are asynchronously evaluated. The evaluation determines if the device has entered or exited a geofenced area, and then publishes one of the following events to Amazon EventBridge:
 *
 * - `ENTER` if Amazon Location determines that the tracked device has entered a geofenced area.
 *
 * - `EXIT` if Amazon Location determines that the tracked device has exited a geofenced area.
 *
 * The last geofence that a device was observed within is tracked for 30 days after the most recent device position update.
 *
 * Geofence evaluation uses the given device position. It does not account for the optional `Accuracy` of a `DevicePositionUpdate`.
 *
 * The `DeviceID` is used as a string to represent the device. You do not need to have a `Tracker` associated with the `DeviceID`.
 */
export const batchEvaluateGeofences: API.OperationMethod<
  BatchEvaluateGeofencesRequest,
  BatchEvaluateGeofencesResponse,
  BatchEvaluateGeofencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchEvaluateGeofencesRequest,
  output: BatchEvaluateGeofencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchEvaluateGeofences",
  endpointHostPrefix: "geofencing.",
}));

export type BatchGetDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the latest device positions for requested devices.
 */
export const batchGetDevicePosition: API.OperationMethod<
  BatchGetDevicePositionRequest,
  BatchGetDevicePositionResponse,
  BatchGetDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDevicePositionRequest,
  output: BatchGetDevicePositionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDevicePosition",
  endpointHostPrefix: "tracking.",
}));

export type BatchPutGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A batch request for storing geofence geometries into a given geofence collection, or updates the geometry of an existing geofence if a geofence ID is included in the request.
 */
export const batchPutGeofence: API.OperationMethod<
  BatchPutGeofenceRequest,
  BatchPutGeofenceResponse,
  BatchPutGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutGeofenceRequest,
  output: BatchPutGeofenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutGeofence",
  endpointHostPrefix: "geofencing.",
}));

export type BatchUpdateDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads position update data for one or more devices to a tracker resource (up to 10 devices per batch). Amazon Location uses the data when it reports the last known device position and position history. Amazon Location retains location data for 30 days.
 *
 * Position updates are handled based on the `PositionFiltering` property of the tracker. When `PositionFiltering` is set to `TimeBased`, updates are evaluated against linked geofence collections, and location data is stored at a maximum of one position per 30 second interval. If your update frequency is more often than every 30 seconds, only one update per 30 seconds is stored for each unique device ID.
 *
 * When `PositionFiltering` is set to `DistanceBased` filtering, location data is stored and evaluated against linked geofence collections only if the device has moved more than 30 m (98.4 ft).
 *
 * When `PositionFiltering` is set to `AccuracyBased` filtering, location data is stored and evaluated against linked geofence collections only if the device has moved more than the measured accuracy. For example, if two consecutive updates from a device have a horizontal accuracy of 5 m and 10 m, the second update is neither stored or evaluated if the device has moved less than 15 m. If `PositionFiltering` is set to `AccuracyBased` filtering, Amazon Location uses the default value `{ "Horizontal": 0}` when accuracy is not provided on a `DevicePositionUpdate`.
 */
export const batchUpdateDevicePosition: API.OperationMethod<
  BatchUpdateDevicePositionRequest,
  BatchUpdateDevicePositionResponse,
  BatchUpdateDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateDevicePositionRequest,
  output: BatchUpdateDevicePositionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateDevicePosition",
  endpointHostPrefix: "tracking.",
}));

export type CalculateRouteError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `CalculateRoutes` or `CalculateIsolines` unless you require Grab data.
 *
 * - `CalculateRoute` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `CalculateRoutes` operation gives better results for point-to-point routing, while the version 2 `CalculateIsolines` operation adds support for calculating service areas and travel time envelopes.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Calculates a route given the following required parameters: `DeparturePosition` and `DestinationPosition`. Requires that you first create a route calculator resource.
 *
 * By default, a request that doesn't specify a departure time uses the best time of day to travel with the best traffic conditions when calculating the route.
 *
 * Additional options include:
 *
 * - Specifying a departure time using either `DepartureTime` or `DepartNow`. This calculates a route based on predictive traffic data at the given time.
 *
 * You can't specify both `DepartureTime` and `DepartNow` in a single request. Specifying both parameters returns a validation error.
 *
 * - Specifying a travel mode using TravelMode sets the transportation mode used to calculate the routes. This also lets you specify additional route preferences in `CarModeOptions` if traveling by `Car`, or `TruckModeOptions` if traveling by `Truck`.
 *
 * If you specify `walking` for the travel mode and your data provider is Esri, the start and destination must be within 40km.
 */
export const calculateRoute: API.OperationMethod<
  CalculateRouteRequest,
  CalculateRouteResponse,
  CalculateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CalculateRouteRequest,
  output: CalculateRouteResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRoute",
  endpointHostPrefix: "routes.",
}));

export type CalculateRouteMatrixError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the V2 `CalculateRouteMatrix` unless you require Grab data.
 *
 * - This version of `CalculateRouteMatrix` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `CalculateRouteMatrix` operation gives better results for matrix routing calculations.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Calculates a route matrix given the following required parameters: `DeparturePositions` and `DestinationPositions`. `CalculateRouteMatrix` calculates routes and returns the travel time and travel distance from each departure position to each destination position in the request. For example, given departure positions A and B, and destination positions X and Y, `CalculateRouteMatrix` will return time and distance for routes from A to X, A to Y, B to X, and B to Y (in that order). The number of results returned (and routes calculated) will be the number of `DeparturePositions` times the number of `DestinationPositions`.
 *
 * Your account is charged for each route calculated, not the number of requests.
 *
 * Requires that you first create a route calculator resource.
 *
 * By default, a request that doesn't specify a departure time uses the best time of day to travel with the best traffic conditions when calculating routes.
 *
 * Additional options include:
 *
 * - Specifying a departure time using either `DepartureTime` or `DepartNow`. This calculates routes based on predictive traffic data at the given time.
 *
 * You can't specify both `DepartureTime` and `DepartNow` in a single request. Specifying both parameters returns a validation error.
 *
 * - Specifying a travel mode using TravelMode sets the transportation mode used to calculate the routes. This also lets you specify additional route preferences in `CarModeOptions` if traveling by `Car`, or `TruckModeOptions` if traveling by `Truck`.
 */
export const calculateRouteMatrix: API.OperationMethod<
  CalculateRouteMatrixRequest,
  CalculateRouteMatrixResponse,
  CalculateRouteMatrixError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CalculateRouteMatrixRequest,
  output: CalculateRouteMatrixResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CalculateRouteMatrix",
  endpointHostPrefix: "routes.",
}));

export type CancelJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * `CancelJob` cancels a job that is currently running or pending. If the job is already in a terminal state (`Completed`, `Failed`, or `Cancelled`), the operation returns successfully with the current status.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
  endpointHostPrefix: "metadata.",
}));

export type CreateGeofenceCollectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a geofence collection, which manages and stores geofences.
 */
export const createGeofenceCollection: API.OperationMethod<
  CreateGeofenceCollectionRequest,
  CreateGeofenceCollectionResponse,
  CreateGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGeofenceCollectionRequest,
  output: CreateGeofenceCollectionResponse,
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
  operationName: "CreateGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
}));

export type CreateKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an API key resource in your Amazon Web Services account, which lets you grant actions for Amazon Location resources to the API key bearer.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const createKey: API.OperationMethod<
  CreateKeyRequest,
  CreateKeyResponse,
  CreateKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateKeyRequest,
  output: CreateKeyResponse,
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
  operationName: "CreateKey",
  endpointHostPrefix: "cp.metadata.",
}));

export type CreateMapError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `CreateMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Creates a map resource in your Amazon Web Services account, which provides map tiles of different styles sourced from global location data providers.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createMap: API.OperationMethod<
  CreateMapRequest,
  CreateMapResponse,
  CreateMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMapRequest,
  output: CreateMapResponse,
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
  operationName: "CreateMap",
  endpointHostPrefix: "cp.maps.",
}));

export type CreatePlaceIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `CreatePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Creates a place index resource in your Amazon Web Services account. Use a place index resource to geocode addresses and other text queries by using the `SearchPlaceIndexForText` operation, and reverse geocode coordinates by using the `SearchPlaceIndexForPosition` operation, and enable autosuggestions by using the `SearchPlaceIndexForSuggestions` operation.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createPlaceIndex: API.OperationMethod<
  CreatePlaceIndexRequest,
  CreatePlaceIndexResponse,
  CreatePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePlaceIndexRequest,
  output: CreatePlaceIndexResponse,
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
  operationName: "CreatePlaceIndex",
  endpointHostPrefix: "cp.places.",
}));

export type CreateRouteCalculatorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `CreateRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Creates a route calculator resource in your Amazon Web Services account.
 *
 * You can send requests to a route calculator resource to estimate travel time, distance, and get directions. A route calculator sources traffic and road network data from your chosen data provider.
 *
 * If your application is tracking or routing assets you use in your business, such as delivery vehicles or employees, you must not use Esri as your geolocation provider. See section 82 of the Amazon Web Services service terms for more details.
 */
export const createRouteCalculator: API.OperationMethod<
  CreateRouteCalculatorRequest,
  CreateRouteCalculatorResponse,
  CreateRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouteCalculatorRequest,
  output: CreateRouteCalculatorResponse,
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
  operationName: "CreateRouteCalculator",
  endpointHostPrefix: "cp.routes.",
}));

export type CreateTrackerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a tracker resource in your Amazon Web Services account, which lets you retrieve current and historical location of devices.
 */
export const createTracker: API.OperationMethod<
  CreateTrackerRequest,
  CreateTrackerResponse,
  CreateTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrackerRequest,
  output: CreateTrackerResponse,
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
  operationName: "CreateTracker",
  endpointHostPrefix: "cp.tracking.",
}));

export type DeleteGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a geofence collection from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the geofence collection is the target of a tracker resource, the devices will no longer be monitored.
 */
export const deleteGeofenceCollection: API.OperationMethod<
  DeleteGeofenceCollectionRequest,
  DeleteGeofenceCollectionResponse,
  DeleteGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGeofenceCollectionRequest,
  output: DeleteGeofenceCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
}));

export type DeleteKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified API key. The API key must have been deactivated more than 90 days previously.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const deleteKey: API.OperationMethod<
  DeleteKeyRequest,
  DeleteKeyResponse,
  DeleteKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKeyRequest,
  output: DeleteKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKey",
  endpointHostPrefix: "cp.metadata.",
}));

export type DeleteMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `DeleteMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Deletes a map resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the map is being used in an application, the map may not render.
 */
export const deleteMap: API.OperationMethod<
  DeleteMapRequest,
  DeleteMapResponse,
  DeleteMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMapRequest,
  output: DeleteMapResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMap",
  endpointHostPrefix: "cp.maps.",
}));

export type DeletePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `DeletePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Deletes a place index resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently.
 */
export const deletePlaceIndex: API.OperationMethod<
  DeletePlaceIndexRequest,
  DeletePlaceIndexResponse,
  DeletePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePlaceIndexRequest,
  output: DeletePlaceIndexResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaceIndex",
  endpointHostPrefix: "cp.places.",
}));

export type DeleteRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `DeleteRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Deletes a route calculator resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently.
 */
export const deleteRouteCalculator: API.OperationMethod<
  DeleteRouteCalculatorRequest,
  DeleteRouteCalculatorResponse,
  DeleteRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteCalculatorRequest,
  output: DeleteRouteCalculatorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteCalculator",
  endpointHostPrefix: "cp.routes.",
}));

export type DeleteTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a tracker resource from your Amazon Web Services account.
 *
 * This operation deletes the resource permanently. If the tracker resource is in use, you may encounter an error. Make sure that the target resource isn't a dependency for your applications.
 */
export const deleteTracker: API.OperationMethod<
  DeleteTrackerRequest,
  DeleteTrackerResponse,
  DeleteTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrackerRequest,
  output: DeleteTrackerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTracker",
  endpointHostPrefix: "cp.tracking.",
}));

export type DescribeGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the geofence collection details.
 */
export const describeGeofenceCollection: API.OperationMethod<
  DescribeGeofenceCollectionRequest,
  DescribeGeofenceCollectionResponse,
  DescribeGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGeofenceCollectionRequest,
  output: DescribeGeofenceCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
}));

export type DescribeKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the API key resource details.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const describeKey: API.OperationMethod<
  DescribeKeyRequest,
  DescribeKeyResponse,
  DescribeKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeKeyRequest,
  output: DescribeKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKey",
  endpointHostPrefix: "cp.metadata.",
}));

export type DescribeMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `DescribeMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the map resource details.
 */
export const describeMap: API.OperationMethod<
  DescribeMapRequest,
  DescribeMapResponse,
  DescribeMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMapRequest,
  output: DescribeMapResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMap",
  endpointHostPrefix: "cp.maps.",
}));

export type DescribePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `DescribePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Retrieves the place index resource details.
 */
export const describePlaceIndex: API.OperationMethod<
  DescribePlaceIndexRequest,
  DescribePlaceIndexResponse,
  DescribePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePlaceIndexRequest,
  output: DescribePlaceIndexResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePlaceIndex",
  endpointHostPrefix: "cp.places.",
}));

export type DescribeRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `DescribeRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Retrieves the route calculator resource details.
 */
export const describeRouteCalculator: API.OperationMethod<
  DescribeRouteCalculatorRequest,
  DescribeRouteCalculatorResponse,
  DescribeRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRouteCalculatorRequest,
  output: DescribeRouteCalculatorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRouteCalculator",
  endpointHostPrefix: "cp.routes.",
}));

export type DescribeTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tracker resource details.
 */
export const describeTracker: API.OperationMethod<
  DescribeTrackerRequest,
  DescribeTrackerResponse,
  DescribeTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrackerRequest,
  output: DescribeTrackerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTracker",
  endpointHostPrefix: "cp.tracking.",
}));

export type DisassociateTrackerConsumerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between a tracker resource and a geofence collection.
 *
 * Once you unlink a tracker resource from a geofence collection, the tracker positions will no longer be automatically evaluated against geofences.
 */
export const disassociateTrackerConsumer: API.OperationMethod<
  DisassociateTrackerConsumerRequest,
  DisassociateTrackerConsumerResponse,
  DisassociateTrackerConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateTrackerConsumerRequest,
  output: DisassociateTrackerConsumerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTrackerConsumer",
  endpointHostPrefix: "cp.tracking.",
}));

export type ForecastGeofenceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action forecasts future geofence events that are likely to occur within a specified time horizon if a device continues moving at its current speed. Each forecasted event is associated with a geofence from a provided geofence collection. A forecast event can have one of the following states:
 *
 * `ENTER`: The device position is outside the referenced geofence, but the device may cross into the geofence during the forecasting time horizon if it maintains its current speed.
 *
 * `EXIT`: The device position is inside the referenced geofence, but the device may leave the geofence during the forecasted time horizon if the device maintains it's current speed.
 *
 * `IDLE`:The device is inside the geofence, and it will remain inside the geofence through the end of the time horizon if the device maintains it's current speed.
 *
 * Heading direction is not considered in the current version. The API takes a conservative approach and includes events that can occur for any heading.
 */
export const forecastGeofenceEvents: API.PaginatedOperationMethod<
  ForecastGeofenceEventsRequest,
  ForecastGeofenceEventsResponse,
  ForecastGeofenceEventsError,
  Credentials | HttpClient.HttpClient,
  ForecastedEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ForecastGeofenceEventsRequest,
  output: ForecastGeofenceEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ForecastGeofenceEvents",
  endpointHostPrefix: "geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ForecastedEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a device's most recent position according to its sample time.
 *
 * Device positions are deleted after 30 days.
 */
export const getDevicePosition: API.OperationMethod<
  GetDevicePositionRequest,
  GetDevicePositionResponse,
  GetDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDevicePositionRequest,
  output: GetDevicePositionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePosition",
  endpointHostPrefix: "tracking.",
}));

export type GetDevicePositionHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the device position history from a tracker resource within a specified range of time.
 *
 * Device positions are deleted after 30 days.
 */
export const getDevicePositionHistory: API.PaginatedOperationMethod<
  GetDevicePositionHistoryRequest,
  GetDevicePositionHistoryResponse,
  GetDevicePositionHistoryError,
  Credentials | HttpClient.HttpClient,
  DevicePosition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDevicePositionHistoryRequest,
  output: GetDevicePositionHistoryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevicePositionHistory",
  endpointHostPrefix: "tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DevicePositions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGeofenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the geofence details from a geofence collection.
 *
 * The returned geometry will always match the geometry format used when the geofence was created.
 */
export const getGeofence: API.OperationMethod<
  GetGeofenceRequest,
  GetGeofenceResponse,
  GetGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGeofenceRequest,
  output: GetGeofenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeofence",
  endpointHostPrefix: "geofencing.",
}));

export type GetJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetJob` retrieves detailed information about a specific job, including its current status, configuration, and error information if the job failed.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
  endpointHostPrefix: "metadata.",
}));

export type GetMapGlyphsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetGlyphs` unless you require `Grab` data.
 *
 * - `GetMapGlyphs` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetGlyphs` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves glyphs used to display labels on a map.
 */
export const getMapGlyphs: API.OperationMethod<
  GetMapGlyphsRequest,
  GetMapGlyphsResponse,
  GetMapGlyphsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMapGlyphsRequest,
  output: GetMapGlyphsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapGlyphs",
  endpointHostPrefix: "maps.",
}));

export type GetMapSpritesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetSprites` unless you require `Grab` data.
 *
 * - `GetMapSprites` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetSprites` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the sprite sheet corresponding to a map resource. The sprite sheet is a PNG image paired with a JSON document describing the offsets of individual icons that will be displayed on a rendered map.
 */
export const getMapSprites: API.OperationMethod<
  GetMapSpritesRequest,
  GetMapSpritesResponse,
  GetMapSpritesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMapSpritesRequest,
  output: GetMapSpritesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapSprites",
  endpointHostPrefix: "maps.",
}));

export type GetMapStyleDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetStyleDescriptor` unless you require `Grab` data.
 *
 * - `GetMapStyleDescriptor` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetStyleDescriptor` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves the map style descriptor from a map resource.
 *
 * The style descriptor contains speciﬁcations on how features render on a map. For example, what data to display, what order to display the data in, and the style for the data. Style descriptors follow the Mapbox Style Specification.
 */
export const getMapStyleDescriptor: API.OperationMethod<
  GetMapStyleDescriptorRequest,
  GetMapStyleDescriptorResponse,
  GetMapStyleDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMapStyleDescriptorRequest,
  output: GetMapStyleDescriptorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapStyleDescriptor",
  endpointHostPrefix: "maps.",
}));

export type GetMapTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to `GetTile` unless you require `Grab` data.
 *
 * - `GetMapTile` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `GetTile` operation gives a better user experience and is compatible with the remainder of the V2 Maps API.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Retrieves a vector data tile from the map resource. Map tiles are used by clients to render a map. they're addressed using a grid arrangement with an X coordinate, Y coordinate, and Z (zoom) level.
 *
 * The origin (0, 0) is the top left of the map. Increasing the zoom level by 1 doubles both the X and Y dimensions, so a tile containing data for the entire world at (0/0/0) will be split into 4 tiles at zoom 1 (1/0/0, 1/0/1, 1/1/0, 1/1/1).
 */
export const getMapTile: API.OperationMethod<
  GetMapTileRequest,
  GetMapTileResponse,
  GetMapTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMapTileRequest,
  output: GetMapTileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapTile",
  endpointHostPrefix: "maps.",
}));

export type GetPlaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the V2 `GetPlace` operation unless you require Grab data.
 *
 * - This version of `GetPlace` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - Version 2 of the `GetPlace` operation interoperates with the rest of the Places V2 API, while this version does not.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Finds a place by its unique ID. A `PlaceId` is returned by other search operations.
 *
 * A PlaceId is valid only if all of the following are the same in the original search request and the call to `GetPlace`.
 *
 * - Customer Amazon Web Services account
 *
 * - Amazon Web Services Region
 *
 * - Data provider specified in the place index resource
 *
 * If your Place index resource is configured with Grab as your geolocation provider and Storage as Intended use, the GetPlace operation is unavailable. For more information, see AWS service terms.
 */
export const getPlace: API.OperationMethod<
  GetPlaceRequest,
  GetPlaceResponse,
  GetPlaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlaceRequest,
  output: GetPlaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlace",
  endpointHostPrefix: "places.",
}));

export type ListDevicePositionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A batch request to retrieve all device positions.
 */
export const listDevicePositions: API.PaginatedOperationMethod<
  ListDevicePositionsRequest,
  ListDevicePositionsResponse,
  ListDevicePositionsError,
  Credentials | HttpClient.HttpClient,
  ListDevicePositionsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevicePositionsRequest,
  output: ListDevicePositionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevicePositions",
  endpointHostPrefix: "tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGeofenceCollectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofence collections in your Amazon Web Services account.
 */
export const listGeofenceCollections: API.PaginatedOperationMethod<
  ListGeofenceCollectionsRequest,
  ListGeofenceCollectionsResponse,
  ListGeofenceCollectionsError,
  Credentials | HttpClient.HttpClient,
  ListGeofenceCollectionsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGeofenceCollectionsRequest,
  output: ListGeofenceCollectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeofenceCollections",
  endpointHostPrefix: "cp.geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGeofencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofences stored in a given geofence collection.
 */
export const listGeofences: API.PaginatedOperationMethod<
  ListGeofencesRequest,
  ListGeofencesResponse,
  ListGeofencesError,
  Credentials | HttpClient.HttpClient,
  ListGeofenceResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGeofencesRequest,
  output: ListGeofencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeofences",
  endpointHostPrefix: "geofencing.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `ListJobs` retrieves a list of jobs with optional filtering and pagination support.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  ListJobsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  endpointHostPrefix: "metadata.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListKeysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists API key resources in your Amazon Web Services account.
 *
 * For more information, see Use API keys to authenticate in the *Amazon Location Service Developer Guide*.
 */
export const listKeys: API.PaginatedOperationMethod<
  ListKeysRequest,
  ListKeysResponse,
  ListKeysError,
  Credentials | HttpClient.HttpClient,
  ListKeysResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListKeysRequest,
  output: ListKeysResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeys",
  endpointHostPrefix: "cp.metadata.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMapsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `ListMaps` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Lists map resources in your Amazon Web Services account.
 */
export const listMaps: API.PaginatedOperationMethod<
  ListMapsRequest,
  ListMapsResponse,
  ListMapsError,
  Credentials | HttpClient.HttpClient,
  ListMapsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMapsRequest,
  output: ListMapsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMaps",
  endpointHostPrefix: "cp.maps.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPlaceIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `ListPlaceIndexes` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Lists place index resources in your Amazon Web Services account.
 */
export const listPlaceIndexes: API.PaginatedOperationMethod<
  ListPlaceIndexesRequest,
  ListPlaceIndexesResponse,
  ListPlaceIndexesError,
  Credentials | HttpClient.HttpClient,
  ListPlaceIndexesResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlaceIndexesRequest,
  output: ListPlaceIndexesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlaceIndexes",
  endpointHostPrefix: "cp.places.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRouteCalculatorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `ListRouteCalculators` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Lists route calculator resources in your Amazon Web Services account.
 */
export const listRouteCalculators: API.PaginatedOperationMethod<
  ListRouteCalculatorsRequest,
  ListRouteCalculatorsResponse,
  ListRouteCalculatorsError,
  Credentials | HttpClient.HttpClient,
  ListRouteCalculatorsResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRouteCalculatorsRequest,
  output: ListRouteCalculatorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRouteCalculators",
  endpointHostPrefix: "cp.routes.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
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
 * Returns a list of tags that are applied to the specified Amazon Location resource.
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
  endpointHostPrefix: "cp.metadata.",
}));

export type ListTrackerConsumersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists geofence collections currently associated to the given tracker resource.
 */
export const listTrackerConsumers: API.PaginatedOperationMethod<
  ListTrackerConsumersRequest,
  ListTrackerConsumersResponse,
  ListTrackerConsumersError,
  Credentials | HttpClient.HttpClient,
  Arn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrackerConsumersRequest,
  output: ListTrackerConsumersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrackerConsumers",
  endpointHostPrefix: "cp.tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConsumerArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrackersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tracker resources in your Amazon Web Services account.
 */
export const listTrackers: API.PaginatedOperationMethod<
  ListTrackersRequest,
  ListTrackersResponse,
  ListTrackersError,
  Credentials | HttpClient.HttpClient,
  ListTrackersResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrackersRequest,
  output: ListTrackersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrackers",
  endpointHostPrefix: "cp.tracking.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutGeofenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stores a geofence geometry in a given geofence collection, or updates the geometry of an existing geofence if a geofence ID is included in the request.
 */
export const putGeofence: API.OperationMethod<
  PutGeofenceRequest,
  PutGeofenceResponse,
  PutGeofenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGeofenceRequest,
  output: PutGeofenceResponse,
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
  operationName: "PutGeofence",
  endpointHostPrefix: "geofencing.",
}));

export type SearchPlaceIndexForPositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `ReverseGeocode` or `SearchNearby` unless you require Grab data.
 *
 * - `SearchPlaceIndexForPosition` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `ReverseGeocode` operation gives better results in the address reverse-geocoding use case, while the version 2 `SearchNearby` operation gives better results when searching for businesses and points of interest near a specific location.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Reverse geocodes a given coordinate and returns a legible address. Allows you to search for Places or points of interest near a given position.
 */
export const searchPlaceIndexForPosition: API.OperationMethod<
  SearchPlaceIndexForPositionRequest,
  SearchPlaceIndexForPositionResponse,
  SearchPlaceIndexForPositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchPlaceIndexForPositionRequest,
  output: SearchPlaceIndexForPositionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPlaceIndexForPosition",
  endpointHostPrefix: "places.",
}));

export type SearchPlaceIndexForSuggestionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `Suggest` or `Autocomplete` unless you require Grab data.
 *
 * - `SearchPlaceIndexForSuggestions` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `Suggest` operation gives better results for typeahead place search suggestions with fuzzy matching, while the version 2 `Autocomplete` operation gives better results for address completion based on partial input.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Generates suggestions for addresses and points of interest based on partial or misspelled free-form text. This operation is also known as autocomplete, autosuggest, or fuzzy matching.
 *
 * Optional parameters let you narrow your search results by bounding box or country, or bias your search toward a specific position on the globe.
 *
 * You can search for suggested place names near a specified position by using `BiasPosition`, or filter results within a bounding box by using `FilterBBox`. These parameters are mutually exclusive; using both `BiasPosition` and `FilterBBox` in the same command returns an error.
 */
export const searchPlaceIndexForSuggestions: API.OperationMethod<
  SearchPlaceIndexForSuggestionsRequest,
  SearchPlaceIndexForSuggestionsResponse,
  SearchPlaceIndexForSuggestionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchPlaceIndexForSuggestionsRequest,
  output: SearchPlaceIndexForSuggestionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPlaceIndexForSuggestions",
  endpointHostPrefix: "places.",
}));

export type SearchPlaceIndexForTextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to `Geocode` or `SearchText` unless you require Grab data.
 *
 * - `SearchPlaceIndexForText` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The version 2 `Geocode` operation gives better results in the address geocoding use case, while the version 2 `SearchText` operation gives better results when searching for businesses and points of interest.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * Geocodes free-form text, such as an address, name, city, or region to allow you to search for Places or points of interest.
 *
 * Optional parameters let you narrow your search results by bounding box or country, or bias your search toward a specific position on the globe.
 *
 * You can search for places near a given position using `BiasPosition`, or filter results within a bounding box using `FilterBBox`. Providing both parameters simultaneously returns an error.
 *
 * Search results are returned in order of highest to lowest relevance.
 */
export const searchPlaceIndexForText: API.OperationMethod<
  SearchPlaceIndexForTextRequest,
  SearchPlaceIndexForTextResponse,
  SearchPlaceIndexForTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchPlaceIndexForTextRequest,
  output: SearchPlaceIndexForTextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPlaceIndexForText",
  endpointHostPrefix: "places.",
}));

export type StartJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `StartJob` starts a new asynchronous bulk processing job. You specify the input data location in Amazon S3, the action to perform, and the output location where results are written.
 *
 * For more information, see Job concepts in the *Amazon Location Service Developer Guide*.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResponse,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRequest,
  output: StartJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJob",
  endpointHostPrefix: "metadata.",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Location Service resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with certain tag values.
 *
 * You can use the `TagResource` operation with an Amazon Location Service resource that already has tags. If you specify a new tag key for the resource, this tag is appended to the tags already associated with the resource. If you specify a tag key that's already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate up to 50 tags with a resource.
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
  endpointHostPrefix: "cp.metadata.",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Location resource.
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
  endpointHostPrefix: "cp.metadata.",
}));

export type UpdateGeofenceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given geofence collection.
 */
export const updateGeofenceCollection: API.OperationMethod<
  UpdateGeofenceCollectionRequest,
  UpdateGeofenceCollectionResponse,
  UpdateGeofenceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGeofenceCollectionRequest,
  output: UpdateGeofenceCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGeofenceCollection",
  endpointHostPrefix: "cp.geofencing.",
}));

export type UpdateKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given API key resource.
 */
export const updateKey: API.OperationMethod<
  UpdateKeyRequest,
  UpdateKeyResponse,
  UpdateKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateKeyRequest,
  output: UpdateKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKey",
  endpointHostPrefix: "cp.metadata.",
}));

export type UpdateMapError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend upgrading to the Maps API V2 unless you require `Grab` data.
 *
 * - `UpdateMap` is part of a previous Amazon Location Service Maps API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Maps API version 2 has a simplified interface that can be used without creating or managing map resources.
 *
 * - If you are using an AWS SDK or the AWS CLI, note that the Maps API version 2 is found under `geo-maps` or `geo_maps`, not under `location`.
 *
 * - Since `Grab` is not yet fully supported in Maps API version 2, we recommend you continue using API version 1 when using `Grab`.
 *
 * - Start your version 2 API journey with the Maps V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties of a given map resource.
 */
export const updateMap: API.OperationMethod<
  UpdateMapRequest,
  UpdateMapResponse,
  UpdateMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMapRequest,
  output: UpdateMapResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMap",
  endpointHostPrefix: "cp.maps.",
}));

export type UpdatePlaceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Places API V2 unless you require Grab data.
 *
 * - `UpdatePlaceIndex` is part of a previous Amazon Location Service Places API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Places API version 2 has a simplified interface that can be used without creating or managing place index resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Places API version 2 is found under `geo-places` or `geo_places`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Places API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Places V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties of a given place index resource.
 */
export const updatePlaceIndex: API.OperationMethod<
  UpdatePlaceIndexRequest,
  UpdatePlaceIndexResponse,
  UpdatePlaceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePlaceIndexRequest,
  output: UpdatePlaceIndexResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlaceIndex",
  endpointHostPrefix: "cp.places.",
}));

export type UpdateRouteCalculatorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is no longer current and may be deprecated in the future. We recommend you upgrade to the Routes API V2 unless you require Grab data.
 *
 * - `UpdateRouteCalculator` is part of a previous Amazon Location Service Routes API (version 1) which has been superseded by a more intuitive, powerful, and complete API (version 2).
 *
 * - The Routes API version 2 has a simplified interface that can be used without creating or managing route calculator resources.
 *
 * - If you are using an Amazon Web Services SDK or the Amazon Web Services CLI, note that the Routes API version 2 is found under `geo-routes` or `geo_routes`, not under `location`.
 *
 * - Since Grab is not yet fully supported in Routes API version 2, we recommend you continue using API version 1 when using Grab.
 *
 * - Start your version 2 API journey with the Routes V2 API Reference or the Developer Guide.
 *
 * Updates the specified properties for a given route calculator resource.
 */
export const updateRouteCalculator: API.OperationMethod<
  UpdateRouteCalculatorRequest,
  UpdateRouteCalculatorResponse,
  UpdateRouteCalculatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouteCalculatorRequest,
  output: UpdateRouteCalculatorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouteCalculator",
  endpointHostPrefix: "cp.routes.",
}));

export type UpdateTrackerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified properties of a given tracker resource.
 */
export const updateTracker: API.OperationMethod<
  UpdateTrackerRequest,
  UpdateTrackerResponse,
  UpdateTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrackerRequest,
  output: UpdateTrackerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTracker",
  endpointHostPrefix: "cp.tracking.",
}));

export type VerifyDevicePositionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Verifies the integrity of the device's position by determining if it was reported behind a proxy, and by comparing it to an inferred position estimated based on the device's state.
 *
 * The Location Integrity SDK provides enhanced features related to device verification, and it is available for use by request. To get access to the SDK, contact Sales Support.
 */
export const verifyDevicePosition: API.OperationMethod<
  VerifyDevicePositionRequest,
  VerifyDevicePositionResponse,
  VerifyDevicePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyDevicePositionRequest,
  output: VerifyDevicePositionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDevicePosition",
  endpointHostPrefix: "tracking.",
}));
