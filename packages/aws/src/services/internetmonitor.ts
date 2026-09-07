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
  sdkId: "InternetMonitor",
  serviceShapeName: "InternetMonitor20210603",
});
const auth = T.AwsAuthSigv4({ name: "internetmonitor" });
const ver = T.ServiceVersion("2021-06-03");
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
              `https://internetmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://internetmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type Arn = string;
export type SetOfARNs = string[];
export const SetOfARNs = /*@__PURE__*/ S.Array(S.String);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type MaxCityNetworksToMonitor = number;
export type LogDeliveryStatus = string;
export interface S3Config {
  BucketName?: string;
  BucketPrefix?: string;
  LogDeliveryStatus?: string;
}
export const S3Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    BucketPrefix: S.optional(S.String),
    LogDeliveryStatus: S.optional(S.String),
  }),
).annotate({ identifier: "S3Config" }) as any as S.Schema<S3Config>;
export interface InternetMeasurementsLogDelivery {
  S3Config?: S3Config;
}
export const InternetMeasurementsLogDelivery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Config: S.optional(S3Config) }),
).annotate({
  identifier: "InternetMeasurementsLogDelivery",
}) as any as S.Schema<InternetMeasurementsLogDelivery>;
export type TrafficPercentageToMonitor = number;
export type Percentage = number;
export type LocalHealthEventsConfigStatus = string;
export interface LocalHealthEventsConfig {
  Status?: string;
  HealthScoreThreshold?: number;
  MinTrafficImpact?: number;
}
export const LocalHealthEventsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    HealthScoreThreshold: S.optional(S.Number),
    MinTrafficImpact: S.optional(S.Number),
  }),
).annotate({
  identifier: "LocalHealthEventsConfig",
}) as any as S.Schema<LocalHealthEventsConfig>;
export interface HealthEventsConfig {
  AvailabilityScoreThreshold?: number;
  PerformanceScoreThreshold?: number;
  AvailabilityLocalHealthEventsConfig?: LocalHealthEventsConfig;
  PerformanceLocalHealthEventsConfig?: LocalHealthEventsConfig;
}
export const HealthEventsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityScoreThreshold: S.optional(S.Number),
    PerformanceScoreThreshold: S.optional(S.Number),
    AvailabilityLocalHealthEventsConfig: S.optional(LocalHealthEventsConfig),
    PerformanceLocalHealthEventsConfig: S.optional(LocalHealthEventsConfig),
  }),
).annotate({
  identifier: "HealthEventsConfig",
}) as any as S.Schema<HealthEventsConfig>;
export interface CreateMonitorInput {
  MonitorName: string;
  Resources?: string[];
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export const CreateMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String,
    Resources: S.optional(SetOfARNs),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
    MaxCityNetworksToMonitor: S.optional(S.Number),
    InternetMeasurementsLogDelivery: S.optional(
      InternetMeasurementsLogDelivery,
    ),
    TrafficPercentageToMonitor: S.optional(S.Number),
    HealthEventsConfig: S.optional(HealthEventsConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v20210603/Monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMonitorInput",
}) as any as S.Schema<CreateMonitorInput>;
export type MonitorArn = string;
export type MonitorConfigState = string;
export interface CreateMonitorOutput {
  Arn: string;
  Status: string;
}
export const CreateMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Status: S.String }),
).annotate({
  identifier: "CreateMonitorOutput",
}) as any as S.Schema<CreateMonitorOutput>;
export interface DeleteMonitorInput {
  MonitorName: string;
}
export const DeleteMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorName: S.String.pipe(T.HttpLabel("MonitorName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v20210603/Monitors/{MonitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMonitorInput",
}) as any as S.Schema<DeleteMonitorInput>;
export interface DeleteMonitorOutput {}
export const DeleteMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMonitorOutput",
}) as any as S.Schema<DeleteMonitorOutput>;
export type HealthEventName = string;
export type AccountId = string;
export interface GetHealthEventInput {
  MonitorName: string;
  EventId: string;
  LinkedAccountId?: string;
}
export const GetHealthEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    EventId: S.String.pipe(T.HttpLabel("EventId")),
    LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20210603/Monitors/{MonitorName}/HealthEvents/{EventId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHealthEventInput",
}) as any as S.Schema<GetHealthEventInput>;
export type HealthEventStatus = string;
export interface Network {
  ASName: string;
  ASNumber: number;
}
export const Network = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ASName: S.String, ASNumber: S.Number }),
).annotate({ identifier: "Network" }) as any as S.Schema<Network>;
export type NetworkList = Network[];
export const NetworkList = /*@__PURE__*/ S.Array(Network);
export type TriangulationEventType = string;
export interface NetworkImpairment {
  Networks: Network[];
  AsPath: Network[];
  NetworkEventType: string;
}
export const NetworkImpairment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Networks: NetworkList,
    AsPath: NetworkList,
    NetworkEventType: S.String,
  }),
).annotate({
  identifier: "NetworkImpairment",
}) as any as S.Schema<NetworkImpairment>;
export interface AvailabilityMeasurement {
  ExperienceScore?: number;
  PercentOfTotalTrafficImpacted?: number;
  PercentOfClientLocationImpacted?: number;
}
export const AvailabilityMeasurement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExperienceScore: S.optional(S.Number),
    PercentOfTotalTrafficImpacted: S.optional(S.Number),
    PercentOfClientLocationImpacted: S.optional(S.Number),
  }),
).annotate({
  identifier: "AvailabilityMeasurement",
}) as any as S.Schema<AvailabilityMeasurement>;
export interface RoundTripTime {
  P50?: number;
  P90?: number;
  P95?: number;
}
export const RoundTripTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    P50: S.optional(S.Number),
    P90: S.optional(S.Number),
    P95: S.optional(S.Number),
  }),
).annotate({ identifier: "RoundTripTime" }) as any as S.Schema<RoundTripTime>;
export interface PerformanceMeasurement {
  ExperienceScore?: number;
  PercentOfTotalTrafficImpacted?: number;
  PercentOfClientLocationImpacted?: number;
  RoundTripTime?: RoundTripTime;
}
export const PerformanceMeasurement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExperienceScore: S.optional(S.Number),
    PercentOfTotalTrafficImpacted: S.optional(S.Number),
    PercentOfClientLocationImpacted: S.optional(S.Number),
    RoundTripTime: S.optional(RoundTripTime),
  }),
).annotate({
  identifier: "PerformanceMeasurement",
}) as any as S.Schema<PerformanceMeasurement>;
export interface InternetHealth {
  Availability?: AvailabilityMeasurement;
  Performance?: PerformanceMeasurement;
}
export const InternetHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Availability: S.optional(AvailabilityMeasurement),
    Performance: S.optional(PerformanceMeasurement),
  }),
).annotate({ identifier: "InternetHealth" }) as any as S.Schema<InternetHealth>;
export type Ipv4PrefixList = string[];
export const Ipv4PrefixList = /*@__PURE__*/ S.Array(S.String);
export interface ImpactedLocation {
  ASName: string;
  ASNumber: number;
  Country: string;
  Subdivision?: string;
  Metro?: string;
  City?: string;
  Latitude?: number;
  Longitude?: number;
  CountryCode?: string;
  SubdivisionCode?: string;
  ServiceLocation?: string;
  Status: string;
  CausedBy?: NetworkImpairment;
  InternetHealth?: InternetHealth;
  Ipv4Prefixes?: string[];
}
export const ImpactedLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ASName: S.String,
    ASNumber: S.Number,
    Country: S.String,
    Subdivision: S.optional(S.String),
    Metro: S.optional(S.String),
    City: S.optional(S.String),
    Latitude: S.optional(S.Number),
    Longitude: S.optional(S.Number),
    CountryCode: S.optional(S.String),
    SubdivisionCode: S.optional(S.String),
    ServiceLocation: S.optional(S.String),
    Status: S.String,
    CausedBy: S.optional(NetworkImpairment),
    InternetHealth: S.optional(InternetHealth),
    Ipv4Prefixes: S.optional(Ipv4PrefixList),
  }),
).annotate({
  identifier: "ImpactedLocation",
}) as any as S.Schema<ImpactedLocation>;
export type ImpactedLocationsList = ImpactedLocation[];
export const ImpactedLocationsList = /*@__PURE__*/ S.Array(ImpactedLocation);
export type HealthEventImpactType = string;
export interface GetHealthEventOutput {
  EventArn: string;
  EventId: string;
  StartedAt: Date;
  EndedAt?: Date;
  CreatedAt?: Date;
  LastUpdatedAt: Date;
  ImpactedLocations: ImpactedLocation[];
  Status: string;
  PercentOfTotalTrafficImpacted?: number;
  ImpactType: string;
  HealthScoreThreshold?: number;
}
export const GetHealthEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventArn: S.String,
    EventId: S.String,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ImpactedLocations: ImpactedLocationsList,
    Status: S.String,
    PercentOfTotalTrafficImpacted: S.optional(S.Number),
    ImpactType: S.String,
    HealthScoreThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetHealthEventOutput",
}) as any as S.Schema<GetHealthEventOutput>;
export type InternetEventId = string;
export interface GetInternetEventInput {
  EventId: string;
}
export const GetInternetEventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventId: S.String.pipe(T.HttpLabel("EventId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20210603/InternetEvents/{EventId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInternetEventInput",
}) as any as S.Schema<GetInternetEventInput>;
export interface ClientLocation {
  ASName: string;
  ASNumber: number;
  Country: string;
  Subdivision?: string;
  Metro?: string;
  City: string;
  Latitude: number;
  Longitude: number;
}
export const ClientLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ASName: S.String,
    ASNumber: S.Number,
    Country: S.String,
    Subdivision: S.optional(S.String),
    Metro: S.optional(S.String),
    City: S.String,
    Latitude: S.Number,
    Longitude: S.Number,
  }),
).annotate({ identifier: "ClientLocation" }) as any as S.Schema<ClientLocation>;
export type InternetEventType = string;
export type InternetEventStatus = string;
export interface GetInternetEventOutput {
  EventId: string;
  EventArn: string;
  StartedAt: Date;
  EndedAt?: Date;
  ClientLocation: ClientLocation;
  EventType: string;
  EventStatus: string;
}
export const GetInternetEventOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.String,
    EventArn: S.String,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ClientLocation: ClientLocation,
    EventType: S.String,
    EventStatus: S.String,
  }),
).annotate({
  identifier: "GetInternetEventOutput",
}) as any as S.Schema<GetInternetEventOutput>;
export interface GetMonitorInput {
  MonitorName: string;
  LinkedAccountId?: string;
}
export const GetMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20210603/Monitors/{MonitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMonitorInput",
}) as any as S.Schema<GetMonitorInput>;
export type MonitorProcessingStatusCode = string;
export interface GetMonitorOutput {
  MonitorName: string;
  MonitorArn: string;
  Resources: string[];
  Status: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ProcessingStatus?: string;
  ProcessingStatusInfo?: string;
  Tags?: { [key: string]: string | undefined };
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export const GetMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String,
    MonitorArn: S.String,
    Resources: SetOfARNs,
    Status: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ModifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ProcessingStatus: S.optional(S.String),
    ProcessingStatusInfo: S.optional(S.String),
    Tags: S.optional(TagMap),
    MaxCityNetworksToMonitor: S.optional(S.Number),
    InternetMeasurementsLogDelivery: S.optional(
      InternetMeasurementsLogDelivery,
    ),
    TrafficPercentageToMonitor: S.optional(S.Number),
    HealthEventsConfig: S.optional(HealthEventsConfig),
  }),
).annotate({
  identifier: "GetMonitorOutput",
}) as any as S.Schema<GetMonitorOutput>;
export type QueryMaxResults = number;
export interface GetQueryResultsInput {
  MonitorName: string;
  QueryId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetQueryResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    QueryId: S.String.pipe(T.HttpLabel("QueryId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Results",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueryResultsInput",
}) as any as S.Schema<GetQueryResultsInput>;
export interface QueryField {
  Name?: string;
  Type?: string;
}
export const QueryField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({ identifier: "QueryField" }) as any as S.Schema<QueryField>;
export type QueryFields = QueryField[];
export const QueryFields = /*@__PURE__*/ S.Array(QueryField);
export type QueryRow = string[];
export const QueryRow = /*@__PURE__*/ S.Array(S.String);
export type QueryData = string[][];
export const QueryData = /*@__PURE__*/ S.Array(QueryRow);
export interface GetQueryResultsOutput {
  Fields: QueryField[];
  Data?: string[][];
  NextToken?: string;
}
export const GetQueryResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fields: QueryFields,
    Data: S.optional(QueryData),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQueryResultsOutput",
}) as any as S.Schema<GetQueryResultsOutput>;
export interface GetQueryStatusInput {
  MonitorName: string;
  QueryId: string;
}
export const GetQueryStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    QueryId: S.String.pipe(T.HttpLabel("QueryId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueryStatusInput",
}) as any as S.Schema<GetQueryStatusInput>;
export type QueryStatus = string;
export interface GetQueryStatusOutput {
  Status: string;
}
export const GetQueryStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.String }),
).annotate({
  identifier: "GetQueryStatusOutput",
}) as any as S.Schema<GetQueryStatusOutput>;
export type MaxResults = number;
export interface ListHealthEventsInput {
  MonitorName: string;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
  EventStatus?: string;
  LinkedAccountId?: string;
}
export const ListHealthEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("StartTime")),
    EndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("EndTime")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    EventStatus: S.optional(S.String).pipe(T.HttpQuery("EventStatus")),
    LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20210603/Monitors/{MonitorName}/HealthEvents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHealthEventsInput",
}) as any as S.Schema<ListHealthEventsInput>;
export interface HealthEvent {
  EventArn: string;
  EventId: string;
  StartedAt: Date;
  EndedAt?: Date;
  CreatedAt?: Date;
  LastUpdatedAt: Date;
  ImpactedLocations: ImpactedLocation[];
  Status: string;
  PercentOfTotalTrafficImpacted?: number;
  ImpactType: string;
  HealthScoreThreshold?: number;
}
export const HealthEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventArn: S.String,
    EventId: S.String,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ImpactedLocations: ImpactedLocationsList,
    Status: S.String,
    PercentOfTotalTrafficImpacted: S.optional(S.Number),
    ImpactType: S.String,
    HealthScoreThreshold: S.optional(S.Number),
  }),
).annotate({ identifier: "HealthEvent" }) as any as S.Schema<HealthEvent>;
export type HealthEventList = HealthEvent[];
export const HealthEventList = /*@__PURE__*/ S.Array(HealthEvent);
export interface ListHealthEventsOutput {
  HealthEvents: HealthEvent[];
  NextToken?: string;
}
export const ListHealthEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HealthEvents: HealthEventList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListHealthEventsOutput",
}) as any as S.Schema<ListHealthEventsOutput>;
export type InternetEventMaxResults = number;
export interface ListInternetEventsInput {
  NextToken?: string;
  MaxResults?: number;
  StartTime?: Date;
  EndTime?: Date;
  EventStatus?: string;
  EventType?: string;
}
export const ListInternetEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(
      T.HttpQuery("InternetEventMaxResults"),
    ),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("StartTime")),
    EndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("EndTime")),
    EventStatus: S.optional(S.String).pipe(T.HttpQuery("EventStatus")),
    EventType: S.optional(S.String).pipe(T.HttpQuery("EventType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20210603/InternetEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInternetEventsInput",
}) as any as S.Schema<ListInternetEventsInput>;
export interface InternetEventSummary {
  EventId: string;
  EventArn: string;
  StartedAt: Date;
  EndedAt?: Date;
  ClientLocation: ClientLocation;
  EventType: string;
  EventStatus: string;
}
export const InternetEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.String,
    EventArn: S.String,
    StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ClientLocation: ClientLocation,
    EventType: S.String,
    EventStatus: S.String,
  }),
).annotate({
  identifier: "InternetEventSummary",
}) as any as S.Schema<InternetEventSummary>;
export type InternetEventsList = InternetEventSummary[];
export const InternetEventsList = /*@__PURE__*/ S.Array(InternetEventSummary);
export interface ListInternetEventsOutput {
  InternetEvents: InternetEventSummary[];
  NextToken?: string;
}
export const ListInternetEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InternetEvents: InternetEventsList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInternetEventsOutput",
}) as any as S.Schema<ListInternetEventsOutput>;
export interface ListMonitorsInput {
  NextToken?: string;
  MaxResults?: number;
  MonitorStatus?: string;
  IncludeLinkedAccounts?: boolean;
}
export const ListMonitorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    MonitorStatus: S.optional(S.String).pipe(T.HttpQuery("MonitorStatus")),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20210603/Monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMonitorsInput",
}) as any as S.Schema<ListMonitorsInput>;
export interface Monitor {
  MonitorName: string;
  MonitorArn: string;
  Status: string;
  ProcessingStatus?: string;
}
export const Monitor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String,
    MonitorArn: S.String,
    Status: S.String,
    ProcessingStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Monitor" }) as any as S.Schema<Monitor>;
export type MonitorList = Monitor[];
export const MonitorList = /*@__PURE__*/ S.Array(Monitor);
export interface ListMonitorsOutput {
  Monitors: Monitor[];
  NextToken?: string;
}
export const ListMonitorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Monitors: MonitorList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMonitorsOutput",
}) as any as S.Schema<ListMonitorsOutput>;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type QueryType = string;
export type Operator = string;
export type FilterList = string[];
export const FilterList = /*@__PURE__*/ S.Array(S.String);
export interface FilterParameter {
  Field?: string;
  Operator?: string;
  Values?: string[];
}
export const FilterParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.optional(S.String),
    Operator: S.optional(S.String),
    Values: S.optional(FilterList),
  }),
).annotate({
  identifier: "FilterParameter",
}) as any as S.Schema<FilterParameter>;
export type FilterParameters = FilterParameter[];
export const FilterParameters = /*@__PURE__*/ S.Array(FilterParameter);
export interface StartQueryInput {
  MonitorName: string;
  StartTime: Date;
  EndTime: Date;
  QueryType: string;
  FilterParameters?: FilterParameter[];
  LinkedAccountId?: string;
}
export const StartQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    QueryType: S.String,
    FilterParameters: S.optional(FilterParameters),
    LinkedAccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v20210603/Monitors/{MonitorName}/Queries",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartQueryInput",
}) as any as S.Schema<StartQueryInput>;
export interface StartQueryOutput {
  QueryId: string;
}
export const StartQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryId: S.String }),
).annotate({
  identifier: "StartQueryOutput",
}) as any as S.Schema<StartQueryOutput>;
export interface StopQueryInput {
  MonitorName: string;
  QueryId: string;
}
export const StopQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    QueryId: S.String.pipe(T.HttpLabel("QueryId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "StopQueryInput" }) as any as S.Schema<StopQueryInput>;
export interface StopQueryOutput {}
export const StopQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopQueryOutput",
}) as any as S.Schema<StopQueryOutput>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateMonitorInput {
  MonitorName: string;
  ResourcesToAdd?: string[];
  ResourcesToRemove?: string[];
  Status?: string;
  ClientToken?: string;
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export const UpdateMonitorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
    ResourcesToAdd: S.optional(SetOfARNs),
    ResourcesToRemove: S.optional(SetOfARNs),
    Status: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    MaxCityNetworksToMonitor: S.optional(S.Number),
    InternetMeasurementsLogDelivery: S.optional(
      InternetMeasurementsLogDelivery,
    ),
    TrafficPercentageToMonitor: S.optional(S.Number),
    HealthEventsConfig: S.optional(HealthEventsConfig),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v20210603/Monitors/{MonitorName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMonitorInput",
}) as any as S.Schema<UpdateMonitorInput>;
export interface UpdateMonitorOutput {
  MonitorArn: string;
  Status: string;
}
export const UpdateMonitorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String, Status: S.String }),
).annotate({
  identifier: "UpdateMonitorOutput",
}) as any as S.Schema<UpdateMonitorOutput>;
export type CreateMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a monitor in Amazon CloudWatch Internet Monitor. A monitor is built based on information from the application resources that you add: VPCs,
 * Network Load Balancers (NLBs), Amazon CloudFront distributions, and Amazon WorkSpaces directories. Internet Monitor then publishes internet measurements from Amazon Web Services
 * that are specific to the *city-networks*. That is, the locations and ASNs (typically internet service providers or ISPs),
 * where clients access your application. For more information, see Using Amazon CloudWatch Internet Monitor in the Amazon CloudWatch User
 * Guide.
 *
 * When you create a monitor, you choose the percentage of traffic that you want to monitor. You can also set a maximum limit for the
 * number of city-networks where client traffic is monitored, that caps the total traffic that Internet Monitor monitors. A city-network
 * maximum is the limit of city-networks, but you only pay for the number of city-networks that are actually monitored. You can update your monitor
 * at any time to change the percentage of traffic to monitor or the city-networks maximum. For more information, see Choosing a city-network maximum value in the *Amazon CloudWatch User Guide*.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMonitorInput,
  output: CreateMonitorOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
}));

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a monitor in Amazon CloudWatch Internet Monitor.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMonitorInput,
  output: DeleteMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
}));

export type GetHealthEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information that Amazon CloudWatch Internet Monitor has created and stored about a health event for a specified monitor. This information includes the impacted locations,
 * and all the information related to the event, by location.
 *
 * The information returned includes the impact on performance, availability, and round-trip time, information about the network providers (ASNs),
 * the event type, and so on.
 *
 * Information rolled up at the global traffic level is also returned, including the impact type and total traffic impact.
 */
export const getHealthEvent: API.OperationMethod<
  GetHealthEventInput,
  GetHealthEventOutput,
  GetHealthEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHealthEventInput,
  output: GetHealthEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthEvent",
}));

export type GetInternetEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information that Amazon CloudWatch Internet Monitor has generated about an internet event. Internet Monitor displays information about
 * recent global health events, called internet events, on a global outages map that is available to all Amazon Web Services
 * customers.
 *
 * The information returned here includes the impacted location,
 * when the event started and (if the event is over) ended, the type of event (`PERFORMANCE` or `AVAILABILITY`),
 * and the status (`ACTIVE` or `RESOLVED`).
 */
export const getInternetEvent: API.OperationMethod<
  GetInternetEventInput,
  GetInternetEventOutput,
  GetInternetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInternetEventInput,
  output: GetInternetEventOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInternetEvent",
}));

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about a monitor in Amazon CloudWatch Internet Monitor based on a monitor name. The information returned includes the Amazon Resource Name (ARN), create time,
 * modified time, resources included in the monitor, and status information.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMonitorInput,
  output: GetMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitor",
}));

export type GetQueryResultsError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Amazon CloudWatch Internet Monitor query interface. Specify the query that you want to return results for by providing
 * a `QueryId` and a monitor name.
 *
 * For more information about using the query interface, including examples, see
 * Using the Amazon CloudWatch Internet Monitor query interface
 * in the Amazon CloudWatch Internet Monitor User Guide.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsInput,
  GetQueryResultsOutput,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetQueryResultsInput,
  output: GetQueryResultsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetQueryStatusError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status of a query for the Amazon CloudWatch Internet Monitor query interface, for a specified query ID and monitor.
 * When you run a query, check the status to make sure that the query has `SUCCEEDED` before you review the results.
 *
 * - `QUEUED`: The query is scheduled to run.
 *
 * - `RUNNING`: The query is in progress but not complete.
 *
 * - `SUCCEEDED`: The query completed sucessfully.
 *
 * - `FAILED`: The query failed due to an error.
 *
 * - `CANCELED`: The query was canceled.
 */
export const getQueryStatus: API.OperationMethod<
  GetQueryStatusInput,
  GetQueryStatusOutput,
  GetQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryStatusInput,
  output: GetQueryStatusOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryStatus",
}));

export type ListHealthEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all health events for a monitor in Amazon CloudWatch Internet Monitor. Returns information for health events including the event start and end times, and
 * the status.
 *
 * Health events that have start times during the time frame that is requested are not included in the list of health events.
 */
export const listHealthEvents: API.PaginatedOperationMethod<
  ListHealthEventsInput,
  ListHealthEventsOutput,
  ListHealthEventsError,
  Credentials | HttpClient.HttpClient,
  HealthEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHealthEventsInput,
  output: ListHealthEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHealthEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HealthEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInternetEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists internet events that cause performance or availability issues for client locations. Amazon CloudWatch Internet Monitor displays information about
 * recent global health events, called internet events, on a global outages map that is available to all Amazon Web Services
 * customers.
 *
 * You can constrain the list of internet events returned by providing a start time and end time to define a total
 * time frame for events you want to list. Both start time and end time specify the time when an event started. End time
 * is optional. If you don't include it, the default end time is the current time.
 *
 * You can also limit the events returned to a specific status
 * (`ACTIVE` or `RESOLVED`) or type (`PERFORMANCE` or `AVAILABILITY`).
 */
export const listInternetEvents: API.PaginatedOperationMethod<
  ListInternetEventsInput,
  ListInternetEventsOutput,
  ListInternetEventsError,
  Credentials | HttpClient.HttpClient,
  InternetEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInternetEventsInput,
  output: ListInternetEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInternetEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InternetEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of your monitors for Amazon CloudWatch Internet Monitor and their statuses, along with the Amazon Resource Name (ARN) and name of each monitor.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  Monitor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsInput,
  output: ListMonitorsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Monitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags for a resource. Tags are supported only for monitors in Amazon CloudWatch Internet Monitor.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartQueryError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start a query to return data for a specific query type for the Amazon CloudWatch Internet Monitor query interface. Specify a time period
 * for the data that you want returned by using `StartTime` and `EndTime`. You filter the query
 * results to return by providing parameters that you specify with `FilterParameters`.
 *
 * For more information about using the query interface, including examples, see
 * Using the Amazon CloudWatch Internet Monitor query interface
 * in the Amazon CloudWatch Internet Monitor User Guide.
 */
export const startQuery: API.OperationMethod<
  StartQueryInput,
  StartQueryOutput,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQueryInput,
  output: StartQueryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
}));

export type StopQueryError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop a query that is progress for a specific monitor.
 */
export const stopQuery: API.OperationMethod<
  StopQueryInput,
  StopQueryOutput,
  StopQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopQueryInput,
  output: StopQueryOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQuery",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a tag to a resource. Tags are supported only for monitors in Amazon CloudWatch Internet Monitor. You can add a maximum of 50 tags in Internet Monitor.
 *
 * A minimum of one tag is required for this call. It returns an error if you use the `TagResource` request with 0 tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a monitor. You can update a monitor to change the percentage of traffic to monitor or the maximum number of city-networks
 * (locations and ASNs), to add or remove resources, or to change the status of the monitor. Note that you can't change the name of a monitor.
 *
 * The city-network maximum that you choose is the limit, but you only pay for the number of city-networks that are actually monitored.
 * For more information, see Choosing a city-network maximum value in the *Amazon CloudWatch User Guide*.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMonitorInput,
  output: UpdateMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitor",
}));
